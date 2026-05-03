import { describe, it, expect } from "vitest";
import {
  buildBlogPostingJsonLd,
  buildCaseStudyArticleJsonLd,
  buildProfilePageJsonLd,
  getAbsoluteURL,
  getCanonicalURL,
  PRIMARY_DOMAIN,
} from "../../client/src/lib/metadata/seo";
import { renderSsrHead } from "../../client/src/lib/metadata/renderHead";
import type { BlogPost, CaseStudy } from "../../client/src/types";

const samplePost: BlogPost = {
  id: 42,
  title: "On <Operating> Models",
  excerpt: "What it really takes to run a team well.",
  content: "<p>body</p>",
  date: "2026-01-15",
  category: "Leadership",
  coverImage: "/cover.png",
  readTime: "5 min",
} as unknown as BlogPost;

const sampleStudy: CaseStudy = {
  slug: "team-gsd",
  title: "Team GSD",
  summary: "Standing up an AI transformation team.",
  tools: ["LangChain", "TypeScript"],
} as unknown as CaseStudy;

describe("seo url helpers", () => {
  it("builds canonical urls on the primary domain", () => {
    expect(getCanonicalURL("/about")).toBe(`${PRIMARY_DOMAIN}/about`);
    expect(getCanonicalURL("/")).toBe(`${PRIMARY_DOMAIN}/`);
  });

  it("getAbsoluteURL passes through absolute urls", () => {
    expect(getAbsoluteURL("https://other.example/foo")).toBe("https://other.example/foo");
  });
});

describe("buildBlogPostingJsonLd", () => {
  it("produces a BlogPosting node with the right shape", () => {
    const ld = buildBlogPostingJsonLd(samplePost);
    expect(ld["@type"]).toBe("BlogPosting");
    expect(ld.headline).toBe(samplePost.title);
    expect(ld.url).toBe(`${PRIMARY_DOMAIN}/blog/${samplePost.id}`);
    expect(ld.author["@type"]).toBe("Person");
    expect(ld.image).toContain("/cover.png");
  });
});

describe("buildCaseStudyArticleJsonLd", () => {
  it("produces an Article node with the right slug url", () => {
    const ld = buildCaseStudyArticleJsonLd(sampleStudy);
    expect(ld["@type"]).toBe("Article");
    expect(ld.url).toBe(`${PRIMARY_DOMAIN}/case-studies/team-gsd`);
    expect(ld.about).toEqual(sampleStudy.tools);
  });
});

describe("buildProfilePageJsonLd", () => {
  it("returns a ProfilePage with the correct path", () => {
    const ld = buildProfilePageJsonLd("/resume", "Resume", "desc");
    expect(ld["@type"]).toBe("ProfilePage");
    expect(ld.url).toBe(`${PRIMARY_DOMAIN}/resume`);
    expect(ld.mainEntity["@type"]).toBe("Person");
  });
});

describe("renderSsrHead html escaping", () => {
  it("escapes HTML in title and description", () => {
    const head = renderSsrHead({
      title: 'Hello <script>"x"</script>',
      description: "5 < 6 & 'safe'",
      path: "/",
    });
    expect(head).toContain("&lt;script&gt;");
    expect(head).not.toMatch(/<title>.*<script>/);
    expect(head).toContain("&amp;");
    expect(head).toContain("&#39;");
    expect(head).toContain("&quot;");
  });

  it("includes canonical, og, and twitter tags", () => {
    const head = renderSsrHead({
      title: "T",
      description: "D",
      path: "/about",
    });
    expect(head).toContain('<link rel="canonical"');
    expect(head).toMatch(/property="og:title"/);
    expect(head).toMatch(/name="twitter:card"/);
  });

  it("escapes JSON-LD < and > to avoid breaking the script tag", () => {
    const head = renderSsrHead({
      title: "T",
      description: "D",
      path: "/",
      jsonLd: { "@type": "Person", name: "<script>alert(1)</script>" },
    });
    expect(head).toContain('<script type="application/ld+json"');
    expect(head).not.toMatch(/<script>alert\(1\)<\/script>/);
    expect(head).toContain("\\u003cscript\\u003e");
  });
});
