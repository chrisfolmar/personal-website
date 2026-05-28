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
  const entries: UrlEntry[] = [
    // Static pages — lastmod reflects the last meaningful content change,
    // not today's date. Update these when the page content is significantly
    // revised. Using today's date for every crawl would signal false freshness
    // to Google and dilute crawl budget on unchanged pages.
    { loc: `${SITE}/`, lastmod: "2026-05-27", changefreq: "weekly", priority: "1.0" },
    { loc: `${SITE}/about`, lastmod: "2026-05-01", changefreq: "monthly", priority: "0.8" },
    { loc: `${SITE}/resume`, lastmod: "2026-04-01", changefreq: "monthly", priority: "0.8" },
    { loc: `${SITE}/now`, lastmod: "2026-05-01", changefreq: "monthly", priority: "0.7" },
    { loc: `${SITE}/contact`, lastmod: "2026-04-01", changefreq: "yearly", priority: "0.6" },
    { loc: `${SITE}/writing`, lastmod: "2026-05-01", changefreq: "weekly", priority: "0.9" },
    { loc: `${SITE}/beliefs`, lastmod: "2026-05-01", changefreq: "monthly", priority: "0.6" },
    { loc: `${SITE}/case-studies`, lastmod: "2026-05-01", changefreq: "monthly", priority: "0.9" },
    // /services is the freelance landing page — priority 0.9 because it's
    // the primary surface for local SEO discovery (Seacoast NH, Southern
    // ME, North Shore MA). Without an XML sitemap entry, Google would
    // discover it only via internal links, which slows indexing.
    { loc: `${SITE}/services`, lastmod: "2026-05-01", changefreq: "monthly", priority: "0.9" },
  ];

  // Intentionally excluded routes (not in this sitemap):
  //   /sitemap       — HTML sitemap page; a navigational utility, not content.
  //                    Including it would be redundant with sitemap.xml itself.
  //   /not-found     — 404 handler; should never be indexed.
  //   /blog/:id      — External posts (externalUrl set) are excluded below;
  //                    their canonical home is the third-party publication.
  //                    The /blog/:id route for external posts just redirects,
  //                    so there is no indexable content there.
  //
  // Low-priority inclusions (included below, not excluded):
  //   /project/:id   — Legacy project detail pages are orphaned (no nav links).
  //                    Kept at priority 0.5 for passive discoverability;
  //                    remove the loop below if these pages are retired.

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

  // Case studies — lastmod reflects when each study was written/published.
  // Update these when a study's content is significantly revised.
  const caseStudyDates: Record<string, string> = {
    "scaling-bse-throughput": "2026-05-01",
    "asana-async-information-flow": "2026-05-01",
    "erp-wms-modernization": "2026-05-01",
    "team-gsd-ai-transformation": "2026-05-01",
  };
  for (const study of caseStudies) {
    entries.push({
      loc: `${SITE}/case-studies/${study.slug}`,
      lastmod: caseStudyDates[study.slug] ?? "2026-05-01",
      changefreq: "monthly",
      priority: "0.8",
    });
  }

  // Project detail pages — legacy pages kept for SEO discoverability;
  // no nav links point here. Low priority. See exclusions note above.
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
