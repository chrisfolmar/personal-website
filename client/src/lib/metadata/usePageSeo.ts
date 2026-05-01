import { useEffect, useMemo } from "react";
import { getCanonicalURL, SITE_NAME } from "./seo";

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
}

function setMetaTag(
  name: string,
  content: string,
  attr: "name" | "property" = "name",
) {
  let el = document.head.querySelector(
    `meta[${attr}="${name}"]`,
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
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

/**
 * Set per-page SEO metadata: title, description, canonical, Open Graph,
 * Twitter card, and (optionally) a JSON-LD block. Cleans up the title,
 * canonical link, and JSON-LD script when the component unmounts.
 */
export function usePageSeo(options: PageSeoOptions) {
  const {
    title,
    description,
    path,
    type = "website",
    twitterCard = "summary_large_image",
    jsonLd,
    jsonLdId,
    siteName = SITE_NAME,
  } = options;

  const serializedJsonLd = useMemo(
    () => (jsonLd ? JSON.stringify(jsonLd) : null),
    [jsonLd],
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const pageUrl = getCanonicalURL(path);

    setMetaTag("description", description);
    setMetaTag("og:title", title, "property");
    setMetaTag("og:description", description, "property");
    setMetaTag("og:type", type, "property");
    setMetaTag("og:url", pageUrl, "property");
    setMetaTag("og:site_name", siteName, "property");
    setMetaTag("twitter:card", twitterCard);
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:url", pageUrl);

    const canonical = setCanonicalLink(pageUrl);

    let script: HTMLScriptElement | null = null;
    let scriptCreated = false;
    let previousScriptContent: string | null = null;
    if (serializedJsonLd && jsonLdId) {
      script = document.getElementById(jsonLdId) as HTMLScriptElement | null;
      scriptCreated = !script;
      previousScriptContent = script?.textContent ?? null;
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = jsonLdId;
        document.head.appendChild(script);
      }
      script.textContent = serializedJsonLd;
    }

    return () => {
      document.title = prevTitle;

      if (script) {
        if (scriptCreated && script.parentNode) {
          script.parentNode.removeChild(script);
        } else if (previousScriptContent !== null) {
          script.textContent = previousScriptContent;
        }
      }

      if (canonical.created && canonical.el?.parentNode) {
        canonical.el.parentNode.removeChild(canonical.el);
      } else if (canonical.el && canonical.previousHref !== null) {
        canonical.el.setAttribute("href", canonical.previousHref);
      }
    };
  }, [
    title,
    description,
    path,
    type,
    twitterCard,
    serializedJsonLd,
    jsonLdId,
    siteName,
  ]);
}
