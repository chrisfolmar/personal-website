/**
 * SEO and metadata helper functions
 * Provides utilities for generating metadata for the website
 */

export const PRIMARY_DOMAIN = 'https://chrisfolmar.com';
export const ALTERNATE_DOMAIN = 'https://cfolmar.com';

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
 * Default metadata for the website
 */
export const DEFAULT_METADATA = {
  title: 'Chris Folmar – Technologist | Leadership, Insights & Real-World Solutions',
  description: 'Explore the personal portfolio of Chris Folmar, Software Engineering Manager and AI-first tech leader. Showcasing real-world client projects, system integrations, scalable team frameworks, and a passion for web development, automation, and authenticity.',
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