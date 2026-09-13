import type { Request, Response } from "express";
import { blogPosts, caseStudies, projects, visibleBlogPosts } from "../client/src/lib/data";
import {
  ABOUT_METADATA,
  BELIEFS_METADATA,
  CASE_STUDIES_METADATA,
  CONTACT_METADATA,
  HOME_METADATA,
  NOW_METADATA,
  RESUME_METADATA,
  SERVICES_METADATA,
  WRITING_METADATA,
  projectIdSegment,
  type SitemapPageSeoOptions,
} from "../client/src/lib/metadata/routes";

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

function isoDate(input: string | undefined, source: string): string {
  if (!input || !/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    throw new Error(`Invalid or missing sitemap date for ${source}`);
  }
  const parsed = new Date(`${input}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== input) {
    throw new Error(`Invalid or missing sitemap date for ${source}`);
  }
  return input;
}

function staticPageEntry(
  metadata: SitemapPageSeoOptions,
  changefreq: string,
  priority: string,
): UrlEntry {
  return {
    loc: metadata.path === "/" ? `${SITE}/` : `${SITE}${metadata.path}`,
    lastmod: isoDate(metadata.lastModified, metadata.path),
    changefreq,
    priority,
  };
}

export function buildSitemapEntries(): UrlEntry[] {
  const entries: UrlEntry[] = [
    staticPageEntry(HOME_METADATA, "weekly", "1.0"),
    staticPageEntry(ABOUT_METADATA, "monthly", "0.8"),
    staticPageEntry(RESUME_METADATA, "monthly", "0.8"),
    staticPageEntry(NOW_METADATA, "monthly", "0.7"),
    staticPageEntry(CONTACT_METADATA, "yearly", "0.6"),
    staticPageEntry(WRITING_METADATA, "weekly", "0.9"),
    staticPageEntry(BELIEFS_METADATA, "monthly", "0.6"),
    staticPageEntry(CASE_STUDIES_METADATA, "monthly", "0.9"),
    staticPageEntry(SERVICES_METADATA, "monthly", "0.9"),
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
      lastmod: isoDate(post.date, `blog post ${post.id}`),
      changefreq: "monthly",
      priority: "0.7",
    });
  }

  for (const study of caseStudies) {
    entries.push({
      loc: `${SITE}/case-studies/${study.slug}`,
      lastmod: isoDate(study.lastModified, `case study ${study.slug}`),
      changefreq: "monthly",
      priority: "0.8",
    });
  }

  // Project detail pages — legacy pages kept for SEO discoverability;
  // no nav links point here. Low priority. See exclusions note above.
  for (const project of projects) {
    entries.push({
      loc: `${SITE}/project/${projectIdSegment(project)}`,
      lastmod: isoDate(project.date, `project ${project.title}`),
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
