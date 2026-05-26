/**
 * SEO and metadata helper functions
 * Provides utilities for generating metadata for the website
 */

import type { BlogPost, CaseStudy, Project } from "@/types";

export const PRIMARY_DOMAIN = 'https://chrisfolmar.com';
export const ALTERNATE_DOMAIN = 'https://cfolmar.com';
export const SITE_NAME = 'Chris Folmar';
export const TWITTER_HANDLE = '@fomy';
export const AUTHOR_NAME = 'Chris Folmar';

/**
 * Default Open Graph / Twitter card image used when a page does not
 * supply its own. 1200x630, branded with the site identity.
 */
export const DEFAULT_OG_IMAGE = '/og-default.png';
export const DEFAULT_OG_IMAGE_ALT =
  'Chris Folmar — Engineering Manager and AI Transformation Leader';

/**
 * Map of case study slug -> social preview image. Optional; case study
 * pages fall back to the site default when no image is present.
 */
export const CASE_STUDY_IMAGES: Record<string, { src: string; alt: string }> = {
  "scaling-bse-throughput": {
    src: "/og/case-studies/scaling-bse-throughput.png",
    alt: "Case study — Scaling BSE Project Throughput by ~300%",
  },
  "asana-async-information-flow": {
    src: "/og/case-studies/asana-async-information-flow.png",
    alt: "Case study — Building Asynchronous Information Flow with Asana",
  },
  "erp-wms-modernization": {
    src: "/og/case-studies/erp-wms-modernization.png",
    alt: "Case study — Business Systems & ERP/WMS Modernization",
  },
  "team-gsd-ai-transformation": {
    src: "/og/case-studies/team-gsd-ai-transformation.png",
    alt: "Case study — Team GSD AI Transformation",
  },
};

/**
 * Map of blog-post id -> social preview image. Optional; blog post pages
 * fall back to the post's cover image (or site default) when no entry
 * is present.
 */
export const BLOG_IMAGES: Record<number, { src: string; alt: string }> = {
  5: {
    src: "/og/blog/5.png",
    alt: "Article — Embedding AI into How an Org Actually Operates",
  },
  6: {
    src: "/og/blog/6.png",
    alt: "Article — Systems Thinking for Engineering Leaders",
  },
  8: {
    src: "/og/blog/8.png",
    alt: "Article — Why I Stopped Recommending WordPress",
  },
};

/**
 * List of all domains associated with this website
 */
export const ALL_DOMAINS = [
  PRIMARY_DOMAIN,
  ALTERNATE_DOMAIN,
];

/**
 * Generate an absolute URL for use in meta tags
 * @param path - The path to transform to an absolute URL
 * @param domain - Optional specific domain to use (defaults to PRIMARY_DOMAIN)
 * @returns The absolute URL
 */
export function getAbsoluteURL(path: string, domain: string = PRIMARY_DOMAIN): string {
  if (path.startsWith('http')) {
    return path;
  }
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${domain}/${cleanPath}`;
}

/**
 * Generate a canonical URL for a page
 * @param path - The path for which to generate a canonical URL
 * @returns The canonical URL
 */
export function getCanonicalURL(path: string = ''): string {
  return getAbsoluteURL(path, PRIMARY_DOMAIN);
}

/**
 * Generate alternate URLs for all domains
 * @param path - The path for which to generate alternate URLs
 * @returns Array of alternate URLs
 */
export function getAlternateURLs(path: string = ''): string[] {
  return ALL_DOMAINS.map(domain => getAbsoluteURL(path, domain));
}

/**
 * Get structured schema.org data for the website
 * @param type - The schema.org type
 * @param data - The data to include in the schema
 * @returns The JSON-LD schema object
 */
export function getSchemaData(type: string, data: Record<string, any>) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };
}

/**
 * Reusable Person schema for Chris Folmar
 */
export function getPersonSchema() {
  return {
    "@type": "Person",
    "@id": `${PRIMARY_DOMAIN}/#person`,
    name: AUTHOR_NAME,
    url: getCanonicalURL("/"),
    jobTitle: "Engineering Manager · AI Transformation Leader",
    worksFor: {
      "@type": "Organization",
      name: "Fullscript",
    },
    sameAs: [
      "https://www.linkedin.com/in/clfolmar",
      "https://github.com/chrisfolmar",
      "https://x.com/fomy",
      "https://medium.com/@c.folmar",
      "https://www.instagram.com/fomy",
    ],
  };
}

/**
 * Reusable WebSite schema
 */
export function getWebsiteSchema() {
  const url = getCanonicalURL("/");
  return {
    "@type": "WebSite",
    "@id": `${PRIMARY_DOMAIN}/#website`,
    url,
    name: SITE_NAME,
    inLanguage: "en-US",
    publisher: { "@id": `${PRIMARY_DOMAIN}/#person` },
  };
}

/**
 * Lightweight reference to the canonical Person entity. Lets every
 * BlogPosting/Article/etc. point at the same `@id` so Google can fold
 * them into one author graph instead of inferring N separate authors.
 */
export function getPersonRef() {
  return { "@id": `${PRIMARY_DOMAIN}/#person` };
}

/**
 * Build a BlogPosting JSON-LD block for an individual blog post
 */
export function buildBlogPostingJsonLd(post: BlogPost) {
  const url = getCanonicalURL(`/blog/${post.id}`);
  const ogImage = BLOG_IMAGES[post.id]?.src ?? post.coverImage ?? DEFAULT_OG_IMAGE;
  return getSchemaData("BlogPosting", {
    "@id": url,
    url,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: getAbsoluteURL(ogImage),
    articleSection: post.category,
    inLanguage: "en-US",
    author: getPersonRef(),
    publisher: getPersonRef(),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  });
}

/**
 * Build an Article JSON-LD block for a case study detail page
 */
export function buildCaseStudyArticleJsonLd(study: CaseStudy) {
  const url = getCanonicalURL(`/case-studies/${study.slug}`);
  const image = CASE_STUDY_IMAGES[study.slug]?.src ?? DEFAULT_OG_IMAGE;
  return getSchemaData("Article", {
    "@id": url,
    url,
    headline: study.title,
    description: study.summary,
    image: getAbsoluteURL(image),
    inLanguage: "en-US",
    author: getPersonRef(),
    publisher: getPersonRef(),
    about: study.tools,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  });
}

/**
 * Build a CollectionPage + ItemList JSON-LD block for the case studies index
 */
export function buildCaseStudyListJsonLd(studies: CaseStudy[]) {
  const pageUrl = getCanonicalURL("/case-studies");
  const itemListElement = studies.map((study, index) => {
    const url = getCanonicalURL(`/case-studies/${study.slug}`);
    return {
      "@type": "ListItem",
      position: index + 1,
      url,
      item: {
        "@type": "Article",
        "@id": url,
        url,
        headline: study.title,
        description: study.summary,
      },
    };
  });

  return getSchemaData("CollectionPage", {
    "@id": pageUrl,
    url: pageUrl,
    name: "Case Studies | Chris Folmar",
    inLanguage: "en-US",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: studies.length,
      itemListElement,
    },
  });
}

/**
 * Build a ProfilePage JSON-LD block (used by /about and /resume)
 */
export function buildProfilePageJsonLd(path: string, name: string, description: string) {
  const url = getCanonicalURL(path);
  return getSchemaData("ProfilePage", {
    "@id": url,
    url,
    name,
    description,
    inLanguage: "en-US",
    mainEntity: getPersonSchema(),
  });
}

/**
 * Build a ContactPage JSON-LD block
 */
export function buildContactPageJsonLd(description: string) {
  const url = getCanonicalURL("/contact");
  return getSchemaData("ContactPage", {
    "@id": url,
    url,
    name: "Contact | Chris Folmar",
    description,
    inLanguage: "en-US",
    mainEntity: getPersonSchema(),
  });
}

/**
 * Build a generic WebPage JSON-LD block (used by /now)
 */
export function buildWebPageJsonLd(path: string, name: string, description: string) {
  const url = getCanonicalURL(path);
  return getSchemaData("WebPage", {
    "@id": url,
    url,
    name,
    description,
    inLanguage: "en-US",
    isPartOf: { "@id": `${PRIMARY_DOMAIN}/#website` },
    about: getPersonSchema(),
  });
}

/**
 * Build a CreativeWork JSON-LD block for an individual project page
 */
export function buildProjectJsonLd(path: string, project: Project) {
  const url = getCanonicalURL(path);
  return getSchemaData("CreativeWork", {
    "@id": url,
    url,
    name: project.title,
    description: project.description,
    image: project.image ? getAbsoluteURL(project.image) : undefined,
    keywords: project.tags,
    dateCreated: project.date,
    inLanguage: "en-US",
    creator: getPersonSchema(),
  });
}

/**
 * Default metadata for the website
 *
 * Per the copy-redundancy pass, this default description avoids the
 * Hero-canonical phrasings (the discipline-triplet eyebrow, the
 * role-at-Fullscript line, and the modernize-the-work headline) and
 * the AITransformationSummary-canonical operating-model framing.
 * Reword instead of recycling those lines.
 */
export const DEFAULT_METADATA = {
  title: 'Chris Folmar – Technologist | Leadership, Insights & Real-World Solutions',
  description: 'Personal site of Chris Folmar — leading engineering teams, rebuilding the systems behind a healthcare business, and putting AI to work on the boring problems first. Case studies, writing, and a working notebook from the field.',
  image: '/cf-favicon.png',
  twitterHandle: '@fomy',
  keywords: [
    'Chris Folmar', 
    'Software Engineering Manager', 
    'Technical Leader', 
    'Full Stack Developer',
    'JavaScript Developer',
    'TypeScript Developer',
    'React Developer',
    'Angular Developer',
    'Web Developer',
    'Team Leadership',
    'Engineering Management',
    'AI Implementation',
    'System Architecture',
    'Project Management'
  ]
};