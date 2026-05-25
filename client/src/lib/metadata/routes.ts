import type { BlogPost, CaseStudy, Project } from "@/types";
import { blogPosts, caseStudies, projects, visibleBlogPosts } from "@/lib/data";
import {
  AUTHOR_NAME,
  BLOG_IMAGES,
  CASE_STUDY_IMAGES,
  DEFAULT_METADATA,
  PRIMARY_DOMAIN,
  buildBlogPostingJsonLd,
  buildCaseStudyArticleJsonLd,
  buildCaseStudyListJsonLd,
  buildContactPageJsonLd,
  buildProfilePageJsonLd,
  buildProjectJsonLd,
  buildWebPageJsonLd,
  getCanonicalURL,
  getPersonSchema,
  getSchemaData,
  getWebsiteSchema,
  SITE_NAME,
} from "./seo";

export type JsonLd = Record<string, any>;

export interface PageSeoOptions {
  title: string;
  description: string;
  path: string;
  type?: string;
  twitterCard?: "summary" | "summary_large_image";
  jsonLd?: JsonLd | JsonLd[];
  jsonLdId?: string;
  siteName?: string;
  image?: string;
  imageAlt?: string;
}

export const HOME_JSON_LD: JsonLd = {
  "@context": "https://schema.org",
  "@graph": [getPersonSchema(), getWebsiteSchema()],
};

export const HOME_METADATA: PageSeoOptions = {
  title: DEFAULT_METADATA.title,
  description: DEFAULT_METADATA.description,
  path: "/",
  jsonLd: HOME_JSON_LD,
  jsonLdId: "home-jsonld",
};

export const ABOUT_TITLE = "About | Chris Folmar";
export const ABOUT_DESCRIPTION =
  "About Chris Folmar — career arc from software developer to engineering manager, with a focus on operating-model design, business systems, and AI-enabled workflows.";
export const ABOUT_METADATA: PageSeoOptions = {
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  path: "/about",
  type: "profile",
  jsonLd: buildProfilePageJsonLd("/about", ABOUT_TITLE, ABOUT_DESCRIPTION),
  jsonLdId: "about-jsonld",
};

export const CONTACT_TITLE = "Contact | Chris Folmar";
export const CONTACT_DESCRIPTION =
  "Get in touch with Chris Folmar — engineering leadership, AI transformation, business systems, or anything in between.";
export const CONTACT_METADATA: PageSeoOptions = {
  title: CONTACT_TITLE,
  description: CONTACT_DESCRIPTION,
  path: "/contact",
  jsonLd: buildContactPageJsonLd(CONTACT_DESCRIPTION),
  jsonLdId: "contact-jsonld",
};

export const NOW_TITLE = "Now | Chris Folmar";
export const NOW_DESCRIPTION =
  "What Chris Folmar is focused on right now — Team GSD, AI-enabled workflows, engineering leadership, and life as a new dad.";
export const NOW_METADATA: PageSeoOptions = {
  title: NOW_TITLE,
  description: NOW_DESCRIPTION,
  path: "/now",
  jsonLd: buildWebPageJsonLd("/now", NOW_TITLE, NOW_DESCRIPTION),
  jsonLdId: "now-jsonld",
};

export const RESUME_TITLE = "Resume | Chris Folmar";
export const RESUME_DESCRIPTION =
  "Chris Folmar's resume — Engineering Manager, AI Transformation Leader, and Business Systems Engineering Lead.";
export const RESUME_METADATA: PageSeoOptions = {
  title: RESUME_TITLE,
  description: RESUME_DESCRIPTION,
  path: "/resume",
  type: "profile",
  jsonLd: buildProfilePageJsonLd("/resume", RESUME_TITLE, RESUME_DESCRIPTION),
  jsonLdId: "resume-jsonld",
};

export const WRITING_PATH = "/writing";
export const WRITING_TITLE = "Writing | Chris Folmar";
export const WRITING_DESCRIPTION =
  "Field notes from Chris Folmar on running engineering teams, modernizing business systems, and embedding AI into how an org actually operates.";

export function buildWritingIndexJsonLd(posts: BlogPost[]): JsonLd {
  const pageUrl = getCanonicalURL(WRITING_PATH);
  // Reference the canonical Person @id (declared in the home Person
  // schema) instead of inlining a separate Person on every page — so
  // crawlers fold every author back into a single entity.
  const author = { "@id": `${PRIMARY_DOMAIN}/#person` };
  void AUTHOR_NAME;

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
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
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
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: posts.length,
      itemListElement,
    },
  });
}

export const WRITING_METADATA: PageSeoOptions = {
  title: WRITING_TITLE,
  description: WRITING_DESCRIPTION,
  path: WRITING_PATH,
  jsonLd: buildWritingIndexJsonLd(
    visibleBlogPosts
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  ),
  jsonLdId: "writing-index-jsonld",
};

export const CASE_STUDIES_TITLE = "Case Studies | Chris Folmar";
export const CASE_STUDIES_DESCRIPTION =
  "Detailed case studies on scaling engineering throughput, AI-enabled workflow transformation, ERP/WMS modernization, and async information flow.";
export const CASE_STUDIES_METADATA: PageSeoOptions = {
  title: CASE_STUDIES_TITLE,
  description: CASE_STUDIES_DESCRIPTION,
  path: "/case-studies",
  jsonLd: buildCaseStudyListJsonLd(caseStudies),
  jsonLdId: "case-studies-index-jsonld",
};

export const SITEMAP_METADATA: PageSeoOptions = {
  title: "Sitemap | Chris Folmar",
  description: DEFAULT_METADATA.description,
  path: "/sitemap",
};

export const NOT_FOUND_METADATA: PageSeoOptions = {
  title: "Page Not Found | Chris Folmar",
  description: DEFAULT_METADATA.description,
  path: "/404",
};

export function caseStudyDetailMetadata(study: CaseStudy): PageSeoOptions {
  const studyImage = CASE_STUDY_IMAGES[study.slug];
  return {
    title: `${study.title} | Case Study | Chris Folmar`,
    description: study.summary,
    path: `/case-studies/${study.slug}`,
    type: "article",
    image: studyImage?.src,
    imageAlt: studyImage?.alt,
    jsonLd: buildCaseStudyArticleJsonLd(study),
    jsonLdId: "case-study-detail-jsonld",
  };
}

export function blogPostMetadata(post: BlogPost): PageSeoOptions {
  const ogImage = BLOG_IMAGES[post.id];
  return {
    title: `${post.title} | Chris Folmar`,
    description: post.excerpt,
    path: `/blog/${post.id}`,
    type: "article",
    image: ogImage?.src ?? post.coverImage,
    imageAlt: ogImage?.alt ?? `Cover image for "${post.title}"`,
    jsonLd: buildBlogPostingJsonLd(post),
    jsonLdId: "blog-post-jsonld",
  };
}

export function projectIdSegment(project: Project): string {
  return project.title
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "-");
}

export function findProjectByIdSegment(idSegment: string): Project | undefined {
  return projects.find((project) => projectIdSegment(project) === idSegment);
}

export function projectDetailMetadata(
  idSegment: string,
  project: Project,
): PageSeoOptions {
  const path = `/project/${idSegment}`;
  return {
    title: `${project.title} | Chris Folmar`,
    description: project.description,
    path,
    type: "article",
    image: project.image,
    imageAlt: `${project.title} project preview`,
    jsonLd: buildProjectJsonLd(path, project),
    jsonLdId: "project-detail-jsonld",
  };
}

export function caseStudyDetailFallback(slug: string): PageSeoOptions {
  return { ...CASE_STUDIES_METADATA, path: `/case-studies/${slug}` };
}

export function blogPostFallback(idSegment: string): PageSeoOptions {
  return { ...WRITING_METADATA, path: `/blog/${idSegment}` };
}

export function projectDetailFallback(idSegment: string): PageSeoOptions {
  return { ...HOME_METADATA, path: `/project/${idSegment}` };
}

/**
 * Resolve per-route SEO metadata for a given URL path. Used both server-side
 * (to inject metadata into the initial HTML response) and client-side (to keep
 * a single source of truth across the two contexts).
 */
export function resolvePageMetadata(rawPath: string): PageSeoOptions {
  const noQuery = rawPath.split("?")[0].split("#")[0];
  const trimmed = noQuery.length > 1 ? noQuery.replace(/\/+$/, "") : noQuery;
  const path = trimmed || "/";

  switch (path) {
    case "/":
      return HOME_METADATA;
    case "/about":
      return ABOUT_METADATA;
    case "/contact":
      return CONTACT_METADATA;
    case "/now":
      return NOW_METADATA;
    case "/resume":
      return RESUME_METADATA;
    case "/writing":
      return WRITING_METADATA;
    case "/case-studies":
      return CASE_STUDIES_METADATA;
    case "/sitemap":
      return SITEMAP_METADATA;
  }

  const csMatch = path.match(/^\/case-studies\/([^/]+)$/);
  if (csMatch) {
    const study = caseStudies.find((s) => s.slug === csMatch[1]);
    return study ? caseStudyDetailMetadata(study) : caseStudyDetailFallback(csMatch[1]);
  }

  const blogMatch = path.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const id = Number.parseInt(blogMatch[1], 10);
    const post = Number.isFinite(id) ? blogPosts.find((p) => p.id === id) : undefined;
    return post ? blogPostMetadata(post) : blogPostFallback(blogMatch[1]);
  }

  const projectMatch = path.match(/^\/project\/([^/]+)$/);
  if (projectMatch) {
    const project = findProjectByIdSegment(projectMatch[1]);
    return project
      ? projectDetailMetadata(projectMatch[1], project)
      : projectDetailFallback(projectMatch[1]);
  }

  return { ...NOT_FOUND_METADATA, path };
}

export { SITE_NAME };
