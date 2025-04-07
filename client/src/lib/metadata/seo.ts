/**
 * SEO and metadata helper functions
 * Provides utilities for generating metadata for the website
 */

export const BASE_URL = 'https://chrisfolmar.com';

/**
 * Generate an absolute URL for use in meta tags
 * @param path - The path to transform to an absolute URL
 * @returns The absolute URL
 */
export function getAbsoluteURL(path: string): string {
  if (path.startsWith('http')) {
    return path;
  }
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE_URL}/${cleanPath}`;
}

/**
 * Generate a canonical URL for a page
 * @param path - The path for which to generate a canonical URL
 * @returns The canonical URL
 */
export function getCanonicalURL(path: string = ''): string {
  return getAbsoluteURL(path);
}

/**
 * Default metadata for the website
 */
export const DEFAULT_METADATA = {
  title: 'Chris Folmar – Technologist | Leadership, Insights & Real-World Solutions',
  description: 'Explore the personal portfolio of Chris Folmar, Software Engineering Manager and AI-first tech leader. Showcasing real-world client projects, system integrations, scalable team frameworks, and a passion for web development, automation, and authenticity.',
  image: '/cf-favicon.png',
  twitterHandle: '@fomy'
};