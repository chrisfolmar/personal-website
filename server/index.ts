import crypto from "node:crypto";
import express, { type Request, type Response, type NextFunction } from "express";
import type { IncomingMessage, ServerResponse } from "node:http";
import helmet from "helmet";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Per-request CSP nonce. Stored on res.locals so it can be used both by
// helmet's CSP directive and by the SSR head injector when emitting the
// inline JSON-LD script tag. Without this, we'd have to fall back to
// `'unsafe-inline'` for scripts.
app.use((_req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(16).toString("base64");
  next();
});

const isDev = process.env.NODE_ENV !== "production";

// Security headers via helmet. CSP allows Google Fonts (used for Inter
// Tight / Inter), inline styles required by Tailwind + Radix runtime
// styles, and inline JSON-LD scripts via per-request nonce. Vite's dev
// server injects some module-shim helpers inline, so in dev we add
// `'unsafe-inline'` to script-src as a fallback alongside the nonce;
// production keeps the nonce-only policy.
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        // In production: nonce-only — strict, no 'unsafe-inline'.
        // In dev: 'unsafe-inline' so Vite's HMR preamble (an inline
        // script injected by @vitejs/plugin-react) can run. Browsers
        // ignore 'unsafe-inline' when a nonce is also present, so the
        // two are mutually exclusive.
        scriptSrc: isDev
          ? ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com"]
          : [
              "'self'",
              "https://www.googletagmanager.com",
              (_req: IncomingMessage, res: ServerResponse) =>
                `'nonce-${(res as ServerResponse & { locals: { cspNonce: string } }).locals.cspNonce}'`,
            ],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        styleSrcElem: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        imgSrc: ["'self'", "data:", "blob:", "https:"],
        connectSrc: [
          "'self'",
          "https:",
          "wss:",
          "ws:",
          "https://www.google-analytics.com",
          "https://analytics.google.com",
          "https://www.googletagmanager.com",
        ],
        frameAncestors: ["'none'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: isDev ? null : [],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    frameguard: { action: "deny" },
    strictTransportSecurity: {
      maxAge: 60 * 60 * 24 * 365,
      includeSubDomains: true,
      preload: true,
    },
  }),
);

// The contact form is a tiny text payload — cap body size to keep abuse cheap.
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: false, limit: "32kb" }));

// Serve static files from the public directory
app.use(express.static("public"));

// Add logging middleware for image requests
app.use((req, _res, next) => {
  if (req.path.match(/\.(png|jpg|jpeg|gif|svg)$/i)) {
    log(`Image request: ${req.path}`, "image-debug");
  }
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Error middleware: respond once, then log. Previously this re-threw
  // after sending the response, which crashed the process and produced
  // misleading "headers already sent" errors downstream.
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    if (!res.headersSent) {
      res.status(status).json({ message });
    }

    log(`error handling ${req.method} ${req.path}: ${message}`, "error");
    if (err?.stack) {
      log(err.stack.split("\n").slice(0, 5).join(" | "), "error");
    }
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
