import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { sendContactFormEmail } from "./mail-service";

// Simple in-memory rate limiter
const rateLimiter = {
  windowMs: 60 * 60 * 1000, // 1 hour window
  maxRequests: 5, // limit each IP to 5 requests per windowMs
  requests: new Map<string, { count: number, resetTime: number }>()
};

// Check for common spam patterns in message content
function isSpamContent(text: string): boolean {
  // Convert to lowercase for case-insensitive matching
  const lowerText = text.toLowerCase();
  
  // Common spam triggers - update this list as needed
  const spamPatterns = [
    'buy viagra',
    'buy cialis',
    'free casino',
    'free money',
    'get rich',
    'earn money fast',
    'lottery winner',
    'seo services',
    '\\[url=',
    'https://bit.ly'
  ];
  
  return spamPatterns.some(pattern => lowerText.includes(pattern));
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Rate limiter middleware
  const rateLimit = (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    
    if (!rateLimiter.requests.has(ip)) {
      // First request from this IP
      rateLimiter.requests.set(ip, {
        count: 1,
        resetTime: now + rateLimiter.windowMs
      });
      return next();
    }
    
    const requestRecord = rateLimiter.requests.get(ip)!;
    
    // Reset count if the window has passed
    if (now > requestRecord.resetTime) {
      requestRecord.count = 1;
      requestRecord.resetTime = now + rateLimiter.windowMs;
      return next();
    }
    
    // Check if max requests reached
    if (requestRecord.count >= rateLimiter.maxRequests) {
      return res.status(429).json({
        success: false,
        message: "Too many requests, please try again later"
      });
    }
    
    // Increment count and proceed
    requestRecord.count++;
    next();
  };

  // Handle contact form submissions
  app.post("/api/contact", rateLimit, async (req: Request, res: Response) => {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          success: false,
          message: "Empty request body"
        });
      }
      
      const validatedData = insertMessageSchema.parse(req.body);
      
      if (isSpamContent(validatedData.message) || isSpamContent(validatedData.subject)) {
        return res.status(400).json({
          success: false,
          message: "Your message appears to contain content that is not allowed"
        });
      }
      
      // Check for suspicious patterns in email
      const suspiciousEmailPatterns = [
        /@example\.com$/,
        /@test\.com$/,
        /^admin@/,
        /^root@/,
        /^postmaster@/
      ];
      
      if (suspiciousEmailPatterns.some(pattern => pattern.test(validatedData.email))) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid email address"
        });
      }
      
      const message = await storage.createMessage(validatedData);
      const emailSent = await sendContactFormEmail(message);
      
      // Return success but don't send back the full message data for security
      res.status(201).json({ 
        success: true, 
        message: emailSent 
          ? "Message received successfully and email notification sent" 
          : "Message received successfully, but email notification could not be sent",
        id: message.id
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
        return;
      }
      
      // Handle other errors
      console.error("Error processing contact form submission:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while processing your message" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
