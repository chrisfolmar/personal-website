import type { Request, Response } from "express";
import { blogPosts, caseStudies, projects, visibleBlogPosts } from "../client/src/lib/data";
import { projectIdSegment } from "../client/src/lib/metadata/routes";

const SITE = "https://chrisfolmar.com";

interface UrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function isoDate(input?: string): string {
  if (input) {
    const d = new Date(input);
    if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }
  return new Date().toISOString().slice(0, 10);
}

export function buildSitemapEntries(): UrlEntry[] {
  const today = isoDate();
  const entries: UrlEntry[] = [
    { loc: `${SITE}/`, lastmod: today, changefreq: "weekly", priority: "1.0" },
    { loc: `${SITE}/about`, lastmod: today, changefreq: "monthly", priority: "0.8" },
    { loc: `${SITE}/resume`, lastmod: today, changefreq: "monthly", priority: "0.8" },
    { loc: `${SITE}/now`, lastmod: today, changefreq: "monthly", priority: "0.7" },
    { loc: `${SITE}/contact`, lastmod: today, changefreq: "yearly", priority: "0.6" },
    { loc: `${SITE}/writing`, lastmod: today, changefreq: "weekly", priority: "0.9" },
    { loc: `${SITE}/beliefs`, lastmod: today, changefreq: "monthly", priority: "0.6" },
    { loc: `${SITE}/case-studies`, lastmod: today, changefreq: "monthly", priority: "0.9" },
    // /services is the freelance landing page — priority 0.9 because it's
    // the primary surface for local SEO discovery (Seacoast NH, Southern
    // ME, North Shore MA). Without an XML sitemap entry, Google would
    // discover it only via internal links, which slows indexing.
    { loc: `${SITE}/services`, lastmod: today, changefreq: "monthly", priority: "0.9" },
  ];

  // Visible blog posts (excludes hidden: true and external posts whose
  // canonical home is elsewhere — see BlogPost.externalUrl).
  const sortedPosts = visibleBlogPosts
    .filter((p) => !p.externalUrl)
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  for (const post of sortedPosts) {
    entries.push({
      loc: `${SITE}/blog/${post.id}`,
      lastmod: isoDate(post.date),
      changefreq: "monthly",
      priority: "0.7",
    });
  }

  // Case studies
  for (const study of caseStudies) {
    entries.push({
      loc: `${SITE}/case-studies/${study.slug}`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.8",
    });
  }

  // Project detail pages
  for (const project of projects) {
    entries.push({
      loc: `${SITE}/project/${projectIdSegment(project)}`,
      lastmod: isoDate(project.date),
      changefreq: "yearly",
      priority: "0.5",
    });
  }

  // Reference the full list (not just visible) so the count above matches data
  void blogPosts;

  return entries;
}

export function renderSitemapXml(entries: UrlEntry[] = buildSitemapEntries()): string {
  const body = entries
    .map((e) => {
      const parts = [`    <loc>${escapeXml(e.loc)}</loc>`];
      if (e.lastmod) parts.push(`    <lastmod>${e.lastmod}</lastmod>`);
      if (e.changefreq) parts.push(`    <changefreq>${e.changefreq}</changefreq>`);
      if (e.priority) parts.push(`    <priority>${e.priority}</priority>`);
      return `  <url>\n${parts.join("\n")}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function sitemapHandler(_req: Request, res: Response) {
  const xml = renderSitemapXml();
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.send(xml);
}
