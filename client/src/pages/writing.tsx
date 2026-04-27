import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearch } from "wouter";
import SectionHeader from "@/components/SectionHeader";
import WritingCard from "@/components/WritingCard";
import { blogPosts } from "@/lib/data";
import { getCanonicalURL, getSchemaData } from "@/lib/metadata/seo";
import { cn } from "@/lib/utils";

const ALL_CATEGORIES = "All";

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

  const categories = useMemo(() => {
    const seen = new Set<string>();
    const ordered: string[] = [];
    for (const post of posts) {
      if (!seen.has(post.category)) {
        seen.add(post.category);
        ordered.push(post.category);
      }
    }
    return [ALL_CATEGORIES, ...ordered];
  }, [posts]);

  const search = useSearch();
  const [, setLocation] = useLocation();

  const initialCategory = useMemo(() => {
    const params = new URLSearchParams(search);
    const fromUrl = params.get("category");
    if (fromUrl && categories.includes(fromUrl)) {
      return fromUrl;
    }
    return ALL_CATEGORIES;
  }, [search, categories]);

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const params = new URLSearchParams(search);
    if (category === ALL_CATEGORIES) {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const queryString = params.toString();
    setLocation(queryString ? `${WRITING_PATH}?${queryString}` : WRITING_PATH, {
      replace: true,
    });
  };

  const filteredPosts = useMemo(
    () =>
      activeCategory === ALL_CATEGORIES
        ? posts
        : posts.filter((post) => post.category === activeCategory),
    [posts, activeCategory],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 md:pt-32 pb-20 md:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Writing"
          title="Field notes from the work."
          description="On AI-enabled operations, engineering leadership, business systems, and the small-business web work I keep on the side."
        />

        <div
          className="mb-8 md:mb-10 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter posts by category"
          data-testid="writing-category-filters"
        >
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                aria-pressed={isActive}
                data-testid={`category-chip-${category
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-|-$/g, "")}`}
                className={cn(
                  "inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs md:text-sm font-medium transition-colors",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        {filteredPosts.length === 0 ? (
          <p
            className="text-sm text-muted-foreground"
            data-testid="writing-empty-state"
          >
            No posts in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filteredPosts.map((post, i) => (
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
        )}
      </div>
    </div>
  );
}
