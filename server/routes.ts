import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage as defaultStorage, type IStorage } from "./storage";
import { insertMessageSchema, type Message } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { sendContactFormEmail } from "./mail-service";
import { sitemapHandler } from "./sitemap";
import { log } from "./vite";

// Simple in-memory rate limiter.
// NOTE: in-memory state means each process has its own counters; not
// suitable for multi-instance deploys. Replace with a shared store
// (Redis) before scaling horizontally.
export interface RateLimiterState {
  windowMs: number;
  maxRequests: number;
  requests: Map<string, { count: number; resetTime: number }>;
}

export function createRateLimiterState(
  windowMs: number = 60 * 60 * 1000,
  maxRequests: number = 5,
): RateLimiterState {
  return { windowMs, maxRequests, requests: new Map() };
}

export function makeRateLimiter(state: RateLimiterState) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();

    const record = state.requests.get(ip);
    if (!record) {
      state.requests.set(ip, { count: 1, resetTime: now + state.windowMs });
      return next();
    }

    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + state.windowMs;
      return next();
    }

    if (record.count >= state.maxRequests) {
      return res.status(429).json({
        success: false,
        message: "Too many requests, please try again later",
      });
    }

    record.count++;
    next();
  };
}

// Default shared rate limiter state for production middleware mount.
const defaultRateLimiterState = createRateLimiterState();

// Check for common spam patterns in message content
export function isSpamContent(text: string): boolean {
  const lowerText = text.toLowerCase();
  const spamPatterns = [
    "buy viagra",
    "buy cialis",
    "free casino",
    "free money",
    "get rich",
    "earn money fast",
    "lottery winner",
    "seo services",
    "\\[url=",
    "https://bit.ly",
  ];
  return spamPatterns.some((pattern) => lowerText.includes(pattern));
}

const SUSPICIOUS_EMAIL_PATTERNS = [
  /@example\.com$/,
  /@test\.com$/,
  /^admin@/,
  /^root@/,
  /^postmaster@/,
];

export interface ContactRouteOptions {
  storage?: IStorage;
  rateLimiterState?: RateLimiterState;
  sendEmail?: (message: Message) => Promise<boolean>;
}

export function buildContactHandler(opts: ContactRouteOptions = {}) {
  const storage = opts.storage ?? defaultStorage;
  const sendEmail = opts.sendEmail ?? sendContactFormEmail;

  return async (req: Request, res: Response) => {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ success: false, message: "Empty request body" });
      }

      // Honeypot: silently accept submissions that filled the hidden
      // `website` field (bots auto-complete every input). Return 200 so
      // they don't learn that the field is a trap. The real form's
      // honeypot lives in client/src/components/Contact.tsx.
      if (typeof req.body.website === "string" && req.body.website.trim().length > 0) {
        return res.status(200).json({ success: true, message: "Message received" });
      }

      const { website: _hp, formTime: _ft, ...rest } = req.body;
      const validatedData = insertMessageSchema.parse(rest);

      if (isSpamContent(validatedData.message) || isSpamContent(validatedData.subject)) {
        return res.status(400).json({
          success: false,
          message: "Your message appears to contain content that is not allowed",
        });
      }

      if (SUSPICIOUS_EMAIL_PATTERNS.some((p) => p.test(validatedData.email))) {
        return res
          .status(400)
          .json({ success: false, message: "Please provide a valid email address" });
      }

      const message = await storage.createMessage(validatedData);
      const emailSent = await sendEmail(message);

      res.status(201).json({
        success: true,
        message: emailSent
          ? "Message received successfully and email notification sent"
          : "Message received successfully, but email notification could not be sent",
        id: message.id,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ success: false, message: validationError.message });
      }
      log(`contact form error: ${(error as Error).message}`, "error");
      res
        .status(500)
        .json({ success: false, message: "An error occurred while processing your message" });
    }
  };
}

// Lightweight web-vitals reporter endpoint. Logs entries server-side so they
// can be tailed in deployment logs; intentionally not persisted to storage.
const vitalsRateLimiterState = createRateLimiterState(60 * 1000, 60);

export function buildVitalsHandler() {
  return (req: Request, res: Response) => {
    try {
      const body = (req.body ?? {}) as Record<string, unknown>;
      const name = typeof body.name === "string" ? body.name : "unknown";
      const value = typeof body.value === "number" ? body.value : NaN;
      const rating = typeof body.rating === "string" ? body.rating : "n/a";
      const path = typeof body.path === "string" ? body.path : "";
      const id = typeof body.id === "string" ? body.id : "";
      if (Number.isFinite(value)) {
        log(
          `vitals ${name}=${value.toFixed(1)} rating=${rating} path=${path} id=${id}`,
          "vitals",
        );
      }
      res.status(204).end();
    } catch {
      res.status(204).end();
    }
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  const rateLimit = makeRateLimiter(defaultRateLimiterState);
  app.post("/api/contact", rateLimit, buildContactHandler());

  const vitalsLimit = makeRateLimiter(vitalsRateLimiterState);
  app.post("/api/vitals", vitalsLimit, buildVitalsHandler());

  app.get("/sitemap.xml", sitemapHandler);

  return createServer(app);
}
