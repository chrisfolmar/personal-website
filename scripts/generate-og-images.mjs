#!/usr/bin/env node
/**
 * Generate 1200x630 Open Graph images for case studies and selected
 * blog posts. Uses sharp + an SVG template — no external service.
 *
 * Output:
 *   client/public/og/case-studies/<slug>.png
 *   client/public/og/blog/<id>.png
 *
 * Re-run after editing case-study / blog-post copy:
 *   node scripts/generate-og-images.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Palette mirrors theme.json + index.css (Engineer's notebook).
const CREAM = "#F5EFD9";
const NAVY = "#103251";
const BRASS = "#D6A647";
const BRASS_SOFT = "rgba(214, 166, 71, 0.18)";
const INK_SOFT = "#5A6B7C";

// Source-of-truth shaped to avoid pulling the full client data file
// into a build script.
const CASE_STUDIES = [
  {
    slug: "scaling-bse-throughput",
    eyebrow: "Case study",
    title: "Scaling BSE Project Throughput by ~300%",
  },
  {
    slug: "asana-async-information-flow",
    eyebrow: "Case study",
    title: "Building Asynchronous Information Flow with Asana",
  },
  {
    slug: "erp-wms-modernization",
    eyebrow: "Case study",
    title: "Business Systems & ERP/WMS Modernization",
  },
  {
    slug: "team-gsd-ai-transformation",
    eyebrow: "Case study",
    title: "AI Transformation with Team GSD",
  },
];

const BLOG_POSTS = [
  {
    id: 8,
    eyebrow: "AI-Enabled Operations",
    title: "Why I Stopped Recommending WordPress",
  },
  {
    id: 5,
    eyebrow: "AI-Enabled Operations",
    title: "Embedding AI into How an Org Actually Operates",
  },
  {
    id: 6,
    eyebrow: "Engineering Leadership",
    title: "Systems Thinking for Engineering Leaders",
  },
];

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Word-wrap `text` so each line stays under ~`maxChars` characters.
 * Returns an array of lines. We render the lines as `<tspan>`s so the
 * SVG renderer (resvg via sharp) doesn't need font-metrics-aware
 * shaping.
 */
function wrap(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    if (!line) {
      line = w;
      continue;
    }
    if ((line + " " + w).length > maxChars) {
      lines.push(line);
      line = w;
    } else {
      line += " " + w;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 4); // cap so we never overflow the card
}

function buildSvg({ eyebrow, title }) {
  const lines = wrap(title, 26);
  const lineHeight = 88;
  const totalHeight = lines.length * lineHeight;
  const startY = 315 - totalHeight / 2 + 70;

  const tspans = lines
    .map(
      (l, i) =>
        `<tspan x="80" dy="${i === 0 ? 0 : lineHeight}">${escapeXml(l)}</tspan>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.2" fill="${BRASS}" fill-opacity="0.18" />
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="${CREAM}" />
  <rect width="1200" height="630" fill="url(#dots)" />
  <rect x="0" y="0" width="14" height="630" fill="${NAVY}" />
  <rect x="80" y="80" width="80" height="6" fill="${BRASS}" />
  <text x="80" y="120" font-family="'IBM Plex Mono','Menlo','Courier New',monospace"
        font-size="22" fill="${BRASS}" letter-spacing="3"
        font-weight="600">${escapeXml(eyebrow.toUpperCase())}</text>

  <text x="80" y="${startY}" font-family="'Inter Tight','Inter','Helvetica Neue',Arial,sans-serif"
        font-size="74" font-weight="700" fill="${NAVY}">
    ${tspans}
  </text>

  <rect x="80" y="510" width="1040" height="1" fill="${INK_SOFT}" fill-opacity="0.3" />
  <text x="80" y="560" font-family="'Inter Tight','Inter',sans-serif"
        font-size="28" font-weight="600" fill="${NAVY}">Chris Folmar</text>
  <text x="80" y="595" font-family="'IBM Plex Mono','Menlo','Courier New',monospace"
        font-size="20" fill="${INK_SOFT}">Engineering Manager · AI Transformation</text>

  <rect x="1080" y="540" width="40" height="40" fill="${BRASS_SOFT}" />
  <rect x="1080" y="540" width="40" height="6" fill="${BRASS}" />
</svg>`;
}

async function renderOne(svg, outPath) {
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9 })
    .toFile(outPath);
}

async function main() {
  const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
  const csOutDir = path.join(root, "client", "public", "og", "case-studies");
  const blogOutDir = path.join(root, "client", "public", "og", "blog");

  for (const cs of CASE_STUDIES) {
    const out = path.join(csOutDir, `${cs.slug}.png`);
    await renderOne(buildSvg(cs), out);
    console.log("wrote", path.relative(root, out));
  }
  for (const bp of BLOG_POSTS) {
    const out = path.join(blogOutDir, `${bp.id}.png`);
    await renderOne(buildSvg(bp), out);
    console.log("wrote", path.relative(root, out));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
