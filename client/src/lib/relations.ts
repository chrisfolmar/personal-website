import { blogPosts, caseStudies, visibleBlogPosts } from "./data";
import type { BlogPost, CaseStudy } from "@/types";

// Hand-curated bridge from blog category → case study slugs. Keeps the
// related-content rails meaningful without needing a real tag taxonomy.
const CATEGORY_TO_CASE_STUDIES: Record<string, string[]> = {
  "AI-Enabled Operations": [
    "team-gsd-ai-transformation",
    "scaling-bse-throughput",
  ],
  "Engineering Leadership": [
    "scaling-bse-throughput",
    "asana-async-information-flow",
  ],
  "Business Systems": [
    "erp-wms-modernization",
    "asana-async-information-flow",
  ],
  "Career / Reflection": [
    "scaling-bse-throughput",
    "team-gsd-ai-transformation",
  ],
};

const CASE_STUDY_TO_CATEGORIES: Record<string, string[]> = {
  "scaling-bse-throughput": ["Engineering Leadership", "AI-Enabled Operations"],
  "asana-async-information-flow": ["Business Systems", "Engineering Leadership"],
  "erp-wms-modernization": ["Business Systems"],
  "team-gsd-ai-transformation": ["AI-Enabled Operations", "Engineering Leadership"],
};

export function relatedCaseStudiesForPost(post: BlogPost, limit = 2): CaseStudy[] {
  const slugs = CATEGORY_TO_CASE_STUDIES[post.category] ?? [];
  const matched = slugs
    .map((slug) => caseStudies.find((c) => c.slug === slug))
    .filter((c): c is CaseStudy => Boolean(c));
  if (matched.length >= limit) return matched.slice(0, limit);
  // Fall back to recency-stable order from the data file.
  const fill = caseStudies.filter((c) => !matched.includes(c));
  return [...matched, ...fill].slice(0, limit);
}

export function relatedPostsForCaseStudy(
  study: CaseStudy,
  limit = 3,
): BlogPost[] {
  const cats = CASE_STUDY_TO_CATEGORIES[study.slug] ?? [];
  const matched = visibleBlogPosts.filter((p) => cats.includes(p.category));
  const sorted = matched
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  if (sorted.length >= limit) return sorted.slice(0, limit);
  const fill = visibleBlogPosts
    .filter((p) => !sorted.includes(p))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return [...sorted, ...fill].slice(0, limit);
}

export function relatedPostsForPost(post: BlogPost, limit = 3): BlogPost[] {
  const sameCat = visibleBlogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  if (sameCat.length >= limit) return sameCat.slice(0, limit);
  const fill = visibleBlogPosts
    .filter((p) => p.id !== post.id && !sameCat.includes(p))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return [...sameCat, ...fill].slice(0, limit);
}

// Re-export so consumers can stay in one module.
export { blogPosts, caseStudies, visibleBlogPosts };
