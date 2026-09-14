import { describe, expect, it } from "vitest";
import { blogPosts } from "../../client/src/lib/data";
import { renderSitemapXml } from "../../server/sitemap";
// The production audit intentionally stays dependency-free JavaScript.
// @ts-expect-error The .mjs command does not ship a TypeScript declaration.
import {
  REQUIRED_ROUTES,
  discoverRoutesFromSitemap,
} from "../../scripts/audit-social-cards.mjs";

const LOCAL_SITE = "http://127.0.0.1:5000";

describe("social card audit route discovery", () => {
  it("adds same-site sitemap routes while excluding external and duplicate URLs", () => {
    const xml = `<?xml version="1.0"?>
      <urlset>
        <url><loc>https://chrisfolmar.com/blog/5</loc></url>
        <url><loc>https://chrisfolmar.com/blog/5</loc></url>
        <url><loc>https://example.com/not-this-site</loc></url>
      </urlset>`;

    const result = discoverRoutesFromSitemap(xml, LOCAL_SITE);

    expect(result.failures).toEqual([]);
    expect(result.routes).toContain("/blog/5");
    expect(result.routes).not.toContain("/not-this-site");
    expect(result.routes.filter((route: string) => route === "/blog/5")).toHaveLength(
      1,
    );
    expect(result.routes).toEqual(expect.arrayContaining(REQUIRED_ROUTES));
  });

  it("keeps every required route when the sitemap is malformed", () => {
    const result = discoverRoutesFromSitemap(
      "<urlset><url><loc>https://chrisfolmar.com/blog/5</loc></url>",
      LOCAL_SITE,
    );

    expect(result.routes).toEqual(REQUIRED_ROUTES);
    expect(result.failures).toEqual([
      expect.stringContaining("malformed sitemap.xml"),
    ]);
  });

  it("inherits the sitemap's exclusions for external and hidden articles", () => {
    const result = discoverRoutesFromSitemap(renderSitemapXml(), LOCAL_SITE);
    const externalOrHiddenPosts = blogPosts.filter(
      (post) => post.externalUrl || post.hidden,
    );

    expect(result.failures).toEqual([]);
    for (const post of externalOrHiddenPosts) {
      expect(result.routes).not.toContain(`/blog/${post.id}`);
      if (post.externalUrl) {
        expect(result.routes).not.toContain(post.externalUrl);
      }
    }
  });
});