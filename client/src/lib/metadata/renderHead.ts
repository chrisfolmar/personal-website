import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  getAbsoluteURL,
  getCanonicalURL,
  SITE_NAME,
} from "./seo";
import type { PageSeoOptions } from "./routes";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeJsonLd(value: string): string {
  return value.replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
}

function metaTag(name: string, content: string, attr: "name" | "property" = "name"): string {
  return `<meta ${attr}="${escapeHtml(name)}" content="${escapeHtml(content)}" />`;
}

/**
 * Render the per-route portion of the document head as an HTML string, suitable
 * for injecting into the initial server response so JS-less crawlers see the
 * correct title, description, canonical, Open Graph, Twitter card, and
 * JSON-LD blocks.
 *
 * `nonce` is an optional CSP nonce. When set it is added to the inline
 * JSON-LD `<script>` tag so a strict `script-src` policy will allow the
 * inline content.
 */
export function renderSsrHead(options: PageSeoOptions, nonce?: string): string {
  const {
    title,
    description,
    path,
    type = "website",
    twitterCard = "summary_large_image",
    jsonLd,
    jsonLdId,
    siteName = SITE_NAME,
    image = DEFAULT_OG_IMAGE,
    imageAlt = DEFAULT_OG_IMAGE_ALT,
    imageWidth,
    imageHeight,
    preloadImage,
  } = options;

  const canonical = getCanonicalURL(path);
  const absoluteImage = getAbsoluteURL(image);
  const resolvedImageWidth =
    imageWidth ?? (image === DEFAULT_OG_IMAGE ? 1200 : undefined);
  const resolvedImageHeight =
    imageHeight ?? (image === DEFAULT_OG_IMAGE ? 630 : undefined);

  const lines: string[] = [
    `<title>${escapeHtml(title)}</title>`,
    metaTag("description", description),
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    metaTag("og:title", title, "property"),
    metaTag("og:description", description, "property"),
    metaTag("og:type", type, "property"),
    metaTag("og:url", canonical, "property"),
    metaTag("og:site_name", siteName, "property"),
    metaTag("og:image", absoluteImage, "property"),
    metaTag("og:image:alt", imageAlt, "property"),
    metaTag("twitter:card", twitterCard),
    metaTag("twitter:title", title),
    metaTag("twitter:description", description),
    metaTag("twitter:url", canonical),
    metaTag("twitter:image", absoluteImage),
    metaTag("twitter:image:alt", imageAlt),
  ];

  if (resolvedImageWidth && resolvedImageHeight) {
    lines.push(
      metaTag("og:image:width", String(resolvedImageWidth), "property"),
      metaTag("og:image:height", String(resolvedImageHeight), "property"),
    );
  }

  if (preloadImage) {
    const mediaAttr = preloadImage.media
      ? ` media="${escapeHtml(preloadImage.media)}"`
      : "";
    lines.push(
      `<link rel="preload" as="image" href="${escapeHtml(preloadImage.href)}" type="${escapeHtml(preloadImage.type)}"${mediaAttr} fetchpriority="high" />`,
    );
  }

  if (jsonLd) {
    const idAttr = jsonLdId ? ` id="${escapeHtml(jsonLdId)}"` : "";
    const nonceAttr = nonce ? ` nonce="${escapeHtml(nonce)}"` : "";
    const serialized = escapeJsonLd(JSON.stringify(jsonLd));
    lines.push(`<script type="application/ld+json"${idAttr}${nonceAttr}>${serialized}</script>`);
  }

  return lines.join("\n    ");
}
