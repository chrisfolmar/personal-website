import { describe, expect, it } from "vitest";
import {
  blogPosts,
  caseStudies,
  visibleBlogPosts,
} from "../../client/src/lib/data";
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
} from "../../client/src/lib/metadata/routes";
import {
  buildSitemapEntries,
  renderSitemapXml,
} from "../../server/sitemap";

const SITE = "https://chrisfolmar.com";

describe("writing entries in the XML sitemap", () => {
  it("includes visible local articles", () => {
    const localPosts = visibleBlogPosts.filter((post) => !post.externalUrl);
    const locations = new Set(buildSitemapEntries().map((entry) => entry.loc));

    expect(localPosts.length).toBeGreaterThan(0);
    for (const post of localPosts) {
      expect(locations).toContain(`${SITE}/blog/${post.id}`);
    }
  });

  it("excludes the 2024, 2025, and 2026 external Fullscript articles", () => {
    const externalPosts = blogPosts.filter((post) => post.externalUrl);
    const locations = new Set(buildSitemapEntries().map((entry) => entry.loc));
    const xml = renderSitemapXml();

    expect(externalPosts.map((post) => post.date.slice(0, 4)).sort()).toEqual([
      "2024",
      "2025",
      "2026",
    ]);

    for (const post of externalPosts) {
      expect(locations).not.toContain(`${SITE}/blog/${post.id}`);
      expect(locations).not.toContain(post.externalUrl);
      expect(xml).not.toContain(post.externalUrl);
    }
  });

  it("continues to exclude hidden articles", () => {
    const hiddenPosts = blogPosts.filter((post) => post.hidden);
    const locations = new Set(buildSitemapEntries().map((entry) => entry.loc));

    expect(hiddenPosts.length).toBeGreaterThan(0);
    for (const post of hiddenPosts) {
      expect(locations).not.toContain(`${SITE}/blog/${post.id}`);
    }
  });
});

describe("sitemap freshness dates", () => {
  it("uses each page metadata record as the static route source of truth", () => {
    const entries = buildSitemapEntries();
    const staticPages = [
      HOME_METADATA,
      ABOUT_METADATA,
      RESUME_METADATA,
      NOW_METADATA,
      CONTACT_METADATA,
      WRITING_METADATA,
      BELIEFS_METADATA,
      CASE_STUDIES_METADATA,
      SERVICES_METADATA,
    ];

    for (const page of staticPages) {
      const loc = page.path === "/" ? `${SITE}/` : `${SITE}${page.path}`;
      expect(entries.find((entry) => entry.loc === loc)?.lastmod).toBe(
        page.lastModified,
      );
    }
  });

  it("uses each case study's own last-modified date", () => {
    const entries = buildSitemapEntries();

    for (const study of caseStudies) {
      expect(
        entries.find(
          (entry) => entry.loc === `${SITE}/case-studies/${study.slug}`,
        )?.lastmod,
      ).toBe(study.lastModified);
    }
  });

  it("only emits real ISO calendar dates without current-date fallbacks", () => {
    const entries = buildSitemapEntries();

    for (const entry of entries) {
      expect(entry.lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(
        new Date(`${entry.lastmod}T00:00:00.000Z`).toISOString().slice(0, 10),
      ).toBe(entry.lastmod);
    }
  });
});