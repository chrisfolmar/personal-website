import { describe, expect, it } from "vitest";
import { blogPosts, visibleBlogPosts } from "../../client/src/lib/data";
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