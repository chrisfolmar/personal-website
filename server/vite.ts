import express, { type Express, type Request, type Response, type NextFunction } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";
import { resolvePageMetadata } from "../client/src/lib/metadata/routes";
import { renderSsrHead } from "../client/src/lib/metadata/renderHead";

const SSR_HEAD_PLACEHOLDER = "<!--ssr-head-->";

export function injectSsrHead(template: string, url: string): string {
  const pathname = url.split("?")[0].split("#")[0] || "/";
  const metadata = resolvePageMetadata(pathname);
  const head = renderSsrHead(metadata);
  return template.includes(SSR_HEAD_PLACEHOLDER)
    ? template.replace(SSR_HEAD_PLACEHOLDER, head)
    : template.replace("</head>", `    ${head}\n  </head>`);
}

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      template = injectSsrHead(template, url);
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Don't let express.static serve `index.html` directly — that would skip the
  // per-route SEO head injection below. All HTML responses must flow through
  // the catch-all so JS-less crawlers see the right preview.
  app.use(express.static(distPath, { index: false }));

  const indexPath = path.resolve(distPath, "index.html");
  let cachedTemplate: string | null = null;
  const getTemplate = () => {
    if (cachedTemplate === null) {
      cachedTemplate = fs.readFileSync(indexPath, "utf-8");
    }
    return cachedTemplate;
  };

  // fall through to index.html if the file doesn't exist; inject per-route SEO
  // metadata so JS-less crawlers see the correct preview for every URL.
  app.use("*", (req: Request, res: Response, next: NextFunction) => {
    try {
      const template = getTemplate();
      const html = injectSsrHead(template, req.originalUrl || req.url);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (err) {
      next(err);
    }
  });
}
