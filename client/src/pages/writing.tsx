import { useEffect, useMemo } from "react";
import SectionHeader from "@/components/SectionHeader";
import WritingCard from "@/components/WritingCard";
import { blogPosts } from "@/lib/data";
import { getCanonicalURL, getSchemaData } from "@/lib/metadata/seo";

const WRITING_PATH = "/writing";
const WRITING_TITLE = "Writing | Chris Folmar";
const WRITING_DESCRIPTION =
  "Posts on AI-enabled operations, engineering leadership, business systems, and small-business web work.";
const JSON_LD_SCRIPT_ID = "writing-index-jsonld";

type BlogPost = (typeof blogPosts)[number];

function setMetaTag(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.head.querySelector(
    `meta[${attr}="${name}"]`,
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
  return el;
}

function setCanonicalLink(href: string) {
  let el = document.head.querySelector(
    'link[rel="canonical"]',
  ) as HTMLLinkElement | null;
  const created = !el;
  const previousHref = el?.getAttribute("href") ?? null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  return { el, created, previousHref };
}

function buildBlogJsonLd(posts: BlogPost[]) {
  const pageUrl = getCanonicalURL(WRITING_PATH);
  const author = {
    "@type": "Person",
    name: "Chris Folmar",
    url: getCanonicalURL("/"),
  };

  const itemListElement = posts.map((post, index) => {
    const url = getCanonicalURL(`/blog/${post.id}`);
    return {
      "@type": "ListItem",
      position: index + 1,
      url,
      item: {
        "@type": "BlogPosting",
        "@id": url,
        url,
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author,
        articleSection: post.category,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
      },
    };
  });

  return getSchemaData("Blog", {
    "@id": pageUrl,
    url: pageUrl,
    name: WRITING_TITLE,
    description: WRITING_DESCRIPTION,
    inLanguage: "en-US",
    author,
    publisher: author,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: posts.length,
      itemListElement,
    },
  });
}

function useWritingIndexMeta(posts: BlogPost[]) {
  const jsonLd = useMemo(() => buildBlogJsonLd(posts), [posts]);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = WRITING_TITLE;

    const pageUrl = getCanonicalURL(WRITING_PATH);

    setMetaTag("description", WRITING_DESCRIPTION);
    setMetaTag("og:title", WRITING_TITLE, "property");
    setMetaTag("og:description", WRITING_DESCRIPTION, "property");
    setMetaTag("og:type", "website", "property");
    setMetaTag("og:url", pageUrl, "property");
    setMetaTag("og:site_name", "Chris Folmar", "property");
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", WRITING_TITLE);
    setMetaTag("twitter:description", WRITING_DESCRIPTION);
    setMetaTag("twitter:url", pageUrl);

    const {
      el: canonicalEl,
      created: canonicalCreated,
      previousHref: canonicalPreviousHref,
    } = setCanonicalLink(pageUrl);

    let script = document.getElementById(
      JSON_LD_SCRIPT_ID,
    ) as HTMLScriptElement | null;
    const scriptCreated = !script;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = JSON_LD_SCRIPT_ID;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);

    return () => {
      document.title = prevTitle;
      if (scriptCreated && script?.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (canonicalCreated && canonicalEl?.parentNode) {
        canonicalEl.parentNode.removeChild(canonicalEl);
      } else if (canonicalEl && canonicalPreviousHref !== null) {
        canonicalEl.setAttribute("href", canonicalPreviousHref);
      }
    };
  }, [jsonLd]);
}

export default function WritingIndex() {
  const posts = useMemo(
    () =>
      blogPosts
        .slice()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [],
  );

  useWritingIndexMeta(posts);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 md:pt-32 pb-20 md:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Writing"
          title="Posts, in order."
          description="Notes on AI-enabled operations, engineering leadership, business systems, and the small-business web work I keep on the side. Newest first."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {posts.map((post, i) => (
            <WritingCard
              key={post.id}
              id={post.id}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              readTime={post.readTime}
              category={post.category}
              delay={i * 0.05}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
