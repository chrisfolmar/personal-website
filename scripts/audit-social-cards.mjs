#!/usr/bin/env node

import { pathToFileURL } from "node:url";

const DEFAULT_BASE_URL = "https://chrisfolmar.com";
const CANONICAL_ORIGIN = new URL(DEFAULT_BASE_URL).origin;

const REQUIRED_ROUTES = [
  "/",
  "/case-studies",
  "/case-studies/team-gsd-ai-transformation",
  "/writing",
  "/about",
  "/resume",
  "/contact",
  "/now",
];

const CRAWLERS = {
  Facebook: "facebookexternalhit/1.1 (+https://www.facebook.com/externalhit_uatext.php)",
  LinkedIn: "LinkedInBot/1.0",
  "Twitter/X": "Twitterbot/1.0",
};

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function parseMetaTags(html) {
  const metadata = new Map();
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attributes = {};
    for (const attribute of match[0].matchAll(
      /([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g,
    )) {
      attributes[attribute[1].toLowerCase()] = decodeHtml(
        attribute[2] ?? attribute[3] ?? "",
      );
    }
    const key = attributes.property ?? attributes.name;
    if (key && attributes.content !== undefined) {
      metadata.set(key.toLowerCase(), attributes.content.trim());
    }
  }
  return metadata;
}

function discoverRoutesFromSitemap(xml, baseUrl) {
  const routes = new Set(REQUIRED_ROUTES);
  const failures = [];
  const base = new URL(baseUrl);

  if (!/<urlset\b[^>]*>[\s\S]*<\/urlset>/i.test(xml)) {
    failures.push(
      "Sitemap discovery: malformed sitemap.xml (missing a complete urlset)",
    );
    return { routes: [...routes], failures };
  }

  const locations = [...xml.matchAll(/<loc\b[^>]*>([\s\S]*?)<\/loc>/gi)];
  if (locations.length === 0) {
    failures.push("Sitemap discovery: sitemap.xml contains no loc entries");
    return { routes: [...routes], failures };
  }

  for (const match of locations) {
    const location = decodeHtml(match[1].trim());
    let url;
    try {
      url = new URL(location);
    } catch {
      failures.push(`Sitemap discovery: invalid loc URL ${location}`);
      continue;
    }

    if (
      !["http:", "https:"].includes(url.protocol) ||
      ![base.origin, CANONICAL_ORIGIN].includes(url.origin)
    ) {
      continue;
    }

    routes.add(`${url.pathname}${url.search}`);
  }

  return { routes: [...routes], failures };
}

function requireMetadata(metadata, key, context, failures) {
  const value = metadata.get(key);
  if (!value) failures.push(`${context}: missing or empty ${key}`);
  return value;
}

function usesStandardSocialImage(image, pageUrl) {
  if (!image) return false;
  try {
    const pathname = new URL(image, pageUrl).pathname;
    return pathname === "/og-default.png" || pathname.startsWith("/og/");
  } catch {
    return false;
  }
}

async function fetchWithTimeout(url, options = {}) {
  return fetch(url, {
    ...options,
    signal: AbortSignal.timeout(15_000),
  });
}

async function discoverRoutes(base) {
  const sitemapUrl = new URL("/sitemap.xml", base);
  try {
    const response = await fetchWithTimeout(sitemapUrl, {
      headers: {
        "user-agent": "ChrisFolmarSocialCardAudit/1.0",
        accept: "application/xml,text/xml",
      },
    });
    if (response.status !== 200) {
      return {
        routes: [...REQUIRED_ROUTES],
        failures: [
          `Sitemap discovery: expected HTTP 200 from ${sitemapUrl}, received ${response.status}`,
        ],
      };
    }
    return discoverRoutesFromSitemap(await response.text(), base);
  } catch (error) {
    return {
      routes: [...REQUIRED_ROUTES],
      failures: [
        `Sitemap discovery: request failed for ${sitemapUrl} (${error.message})`,
      ],
    };
  }
}

async function auditSocialCards(baseUrl) {
  const base = new URL(baseUrl);
  const discovery = await discoverRoutes(base);
  const failures = [...discovery.failures];
  const imageChecks = new Map();
  let routeChecks = 0;

  for (const [crawler, userAgent] of Object.entries(CRAWLERS)) {
    const seenTitles = new Map();
    const seenDescriptions = new Map();

    for (const route of discovery.routes) {
      const pageUrl = new URL(route, base);
      const context = `${crawler} ${route}`;
      let response;
      try {
        response = await fetchWithTimeout(pageUrl, {
          headers: {
            "user-agent": userAgent,
            accept: "text/html,application/xhtml+xml",
          },
        });
      } catch (error) {
        failures.push(`${context}: request failed (${error.message})`);
        continue;
      }

      if (response.status !== 200) {
        failures.push(`${context}: expected HTTP 200, received ${response.status}`);
        continue;
      }

      const metadata = parseMetaTags(await response.text());
      const title = requireMetadata(metadata, "og:title", context, failures);
      const description = requireMetadata(
        metadata,
        "og:description",
        context,
        failures,
      );
      const image = requireMetadata(metadata, "og:image", context, failures);
      requireMetadata(metadata, "og:image:alt", context, failures);
      const standardSocialImage = usesStandardSocialImage(image, pageUrl);
      const width = standardSocialImage
        ? requireMetadata(metadata, "og:image:width", context, failures)
        : metadata.get("og:image:width");
      const height = standardSocialImage
        ? requireMetadata(metadata, "og:image:height", context, failures)
        : metadata.get("og:image:height");
      requireMetadata(metadata, "twitter:title", context, failures);
      requireMetadata(metadata, "twitter:description", context, failures);
      requireMetadata(metadata, "twitter:image", context, failures);
      requireMetadata(metadata, "twitter:image:alt", context, failures);

      if (width && width !== "1200") {
        failures.push(`${context}: expected og:image:width 1200, received ${width}`);
      }
      if (height && height !== "630") {
        failures.push(`${context}: expected og:image:height 630, received ${height}`);
      }

      for (const [value, seen, field] of [
        [title, seenTitles, "og:title"],
        [description, seenDescriptions, "og:description"],
      ]) {
        if (!value) continue;
        const priorRoute = seen.get(value);
        if (priorRoute) {
          failures.push(
            `${context}: duplicate ${field} also used by ${priorRoute}`,
          );
        } else {
          seen.set(value, route);
        }
      }

      if (image) {
        let imageUrl;
        try {
          imageUrl = new URL(image, pageUrl);
        } catch {
          failures.push(`${context}: invalid og:image URL ${image}`);
        }
        if (imageUrl) {
          imageChecks.set(`${crawler} ${imageUrl}`, {
            crawler,
            userAgent,
            url: imageUrl,
          });
        }
      }

      routeChecks += 1;
    }
  }

  for (const { crawler, userAgent, url } of imageChecks.values()) {
    const context = `${crawler} image ${url}`;
    try {
      const response = await fetchWithTimeout(url, {
        headers: { "user-agent": userAgent, accept: "image/*" },
      });
      if (response.status !== 200) {
        failures.push(`${context}: expected HTTP 200, received ${response.status}`);
        continue;
      }
      const contentType = response.headers.get("content-type") ?? "";
      if (!contentType.toLowerCase().startsWith("image/")) {
        failures.push(`${context}: expected image content-type, received ${contentType || "none"}`);
      }
    } catch (error) {
      failures.push(`${context}: request failed (${error.message})`);
    }
  }

  return {
    baseUrl: base.origin,
    routeChecks,
    routes: discovery.routes.length,
    imageChecks: imageChecks.size,
    failures,
  };
}

function printUsage() {
  console.log(
    "Usage: npm run audit:social -- [base-url]\n" +
      `Defaults to ${DEFAULT_BASE_URL}. The audit is read-only.`,
  );
}

async function main() {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    printUsage();
    return;
  }

  const baseUrl =
    process.argv[2] || process.env.SOCIAL_AUDIT_BASE_URL || DEFAULT_BASE_URL;
  const result = await auditSocialCards(baseUrl);

  if (result.failures.length > 0) {
    console.error(
      `Social card audit failed for ${result.baseUrl} with ${result.failures.length} issue(s):`,
    );
    for (const failure of result.failures) console.error(`- ${failure}`);
    process.exitCode = 1;
    return;
  }

  console.log(
    `Social card audit passed for ${result.baseUrl}: ` +
      `${result.routeChecks} crawler-route checks across ${result.routes} routes and ` +
      `${result.imageChecks} crawler-image checks.`,
  );
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  await main();
}

export { REQUIRED_ROUTES, auditSocialCards, discoverRoutesFromSitemap };
