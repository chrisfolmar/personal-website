#!/usr/bin/env node

const DEFAULT_BASE_URL = "https://chrisfolmar.com";

const ROUTES = [
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

function requireMetadata(metadata, key, context, failures) {
  const value = metadata.get(key);
  if (!value) failures.push(`${context}: missing or empty ${key}`);
  return value;
}

async function fetchWithTimeout(url, options = {}) {
  return fetch(url, {
    ...options,
    signal: AbortSignal.timeout(15_000),
  });
}

async function auditSocialCards(baseUrl) {
  const base = new URL(baseUrl);
  const failures = [];
  const imageChecks = new Map();
  let routeChecks = 0;

  for (const [crawler, userAgent] of Object.entries(CRAWLERS)) {
    const seenTitles = new Map();
    const seenDescriptions = new Map();

    for (const route of ROUTES) {
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
      const width = requireMetadata(metadata, "og:image:width", context, failures);
      const height = requireMetadata(
        metadata,
        "og:image:height",
        context,
        failures,
      );
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
      `${result.routeChecks} crawler-route checks and ` +
      `${result.imageChecks} crawler-image checks.`,
  );
}

await main();
