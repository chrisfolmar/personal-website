import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearch } from "wouter";
import SectionHeader from "@/components/SectionHeader";
import WritingCard from "@/components/WritingCard";
import { visibleBlogPosts } from "@/lib/data";
import {
  AUTHOR_NAME,
  getCanonicalURL,
  getSchemaData,
} from "@/lib/metadata/seo";
import { usePageSeo } from "@/lib/metadata/usePageSeo";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

const ALL_CATEGORIES = "All";

const WRITING_PATH = "/writing";
const WRITING_TITLE = "Writing | Chris Folmar";
const WRITING_DESCRIPTION =
  "Posts on AI-enabled operations, engineering leadership, business systems, and small-business web work.";

function buildBlogJsonLd(posts: BlogPost[]) {
  const pageUrl = getCanonicalURL(WRITING_PATH);
  const author = {
    "@type": "Person",
    name: AUTHOR_NAME,
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

export default function WritingIndex() {
  const posts = useMemo(
    () =>
      visibleBlogPosts
        .slice()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [],
  );

  const jsonLd = useMemo(() => buildBlogJsonLd(posts), [posts]);

  usePageSeo({
    title: WRITING_TITLE,
    description: WRITING_DESCRIPTION,
    path: WRITING_PATH,
    jsonLd,
    jsonLdId: "writing-index-jsonld",
  });

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
