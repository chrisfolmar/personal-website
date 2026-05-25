// Per the copy-redundancy pass, WRITING_DESCRIPTION (page meta) is
// SEO-framed and must read distinctly from the visible page header
// and from the homepage Writing section description.
import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearch } from "wouter";
import SectionHeader from "@/components/SectionHeader";
import WritingCard from "@/components/WritingCard";
import { visibleBlogPosts } from "@/lib/data";
import { WRITING_METADATA, WRITING_PATH } from "@/lib/metadata/routes";
import { usePageSeo } from "@/lib/metadata/usePageSeo";
import { cn } from "@/lib/utils";
import { devOnlyText, isDev, isPlaceholder } from "@/lib/placeholder";

const ALL_CATEGORIES = "All";

export default function WritingIndex() {
  const posts = useMemo(
    () =>
      visibleBlogPosts
        .slice()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [],
  );

  usePageSeo(WRITING_METADATA);

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

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    counts.set(ALL_CATEGORIES, posts.length);
    for (const post of posts) {
      counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
    }
    return counts;
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
        >
          {(() => {
            const addendum =
              "[CHRIS: one-line voice addendum — e.g. 'Working theories, not hot takes. Disagree loudly.']";
            if (!isDev && isPlaceholder(addendum)) return null;
            return (
              <p
                className="font-mono text-[0.78rem] uppercase tracking-[0.14em] text-foreground/70 border-l-2 pl-3"
                style={{ borderColor: "hsl(var(--marker))" }}
                data-testid="writing-voice-addendum"
              >
                {devOnlyText(addendum)}
              </p>
            );
          })()}
        </SectionHeader>

        <div
          className="mb-8 md:mb-10 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter posts by category"
          data-testid="writing-category-filters"
        >
          {categories.map((category) => {
            const isActive = category === activeCategory;
            const count = categoryCounts.get(category) ?? 0;
            const slug = category
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "");
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                aria-pressed={isActive}
                aria-label={`${category} (${count} ${count === 1 ? "post" : "posts"})`}
                data-testid={`category-chip-${slug}`}
                className={cn(
                  "inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs md:text-sm font-medium transition-colors",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                <span>{category}</span>
                <span
                  aria-hidden="true"
                  data-testid={`category-chip-count-${slug}`}
                  className={cn(
                    "ml-2 text-[0.7rem] md:text-xs tabular-nums",
                    isActive ? "opacity-90" : "opacity-70",
                  )}
                >
                  {count}
                </span>
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
