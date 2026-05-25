// "Reflection of me" surface (task 36).
// "Things I believe" — short, opinionated statements with dates.
// Every belief body is currently a [CHRIS: ...] placeholder. In dev all
// beliefs render so the page shape is visible; in production only
// filled beliefs render, and the page itself is hidden entirely if
// none have been filled yet.
import { useEffect, useMemo } from "react";
import { Calendar } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import FadeIn from "@/components/FadeIn";
import { BELIEFS_METADATA } from "@/lib/metadata/routes";
import { usePageSeo } from "@/lib/metadata/usePageSeo";
import {
  DevOnly,
  PlaceholderBadge,
  devOnlyText,
  isDev,
  isPlaceholder,
} from "@/lib/placeholder";

interface Belief {
  title: string;
  body: string;
  updated: string;
}

const beliefs: Belief[] = [
  {
    title: "[CHRIS: short, opinionated headline #1 — a noun phrase]",
    body: "[CHRIS: 1 sentence to 1 short paragraph. Concrete enough that a thoughtful peer could disagree. Avoid platitudes like 'people matter.']",
    updated: "April 2026",
  },
  {
    title: "[CHRIS: headline #2]",
    body: "[CHRIS: 1 sentence to 1 short paragraph.]",
    updated: "April 2026",
  },
  {
    title: "[CHRIS: headline #3]",
    body: "[CHRIS: 1 sentence to 1 short paragraph.]",
    updated: "April 2026",
  },
  {
    title: "[CHRIS: headline #4]",
    body: "[CHRIS: 1 sentence to 1 short paragraph.]",
    updated: "April 2026",
  },
  {
    title: "[CHRIS: headline #5]",
    body: "[CHRIS: 1 sentence to 1 short paragraph.]",
    updated: "April 2026",
  },
  {
    title: "[CHRIS: headline #6 — optional, target 5–8 total]",
    body: "[CHRIS: 1 sentence to 1 short paragraph.]",
    updated: "April 2026",
  },
];

export default function BeliefsPage() {
  usePageSeo(BELIEFS_METADATA);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const visibleBeliefs = useMemo(
    () => beliefs.filter((b) => isDev || !isPlaceholder(b.body)),
    [],
  );

  // In production, if no beliefs are filled in yet, render a quiet
  // "coming soon" stub rather than an empty page — the route still
  // resolves with SEO metadata for crawlers.
  const showStub = !isDev && visibleBeliefs.length === 0;

  return (
    <div className="pt-28 md:pt-32 pb-20 md:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Things I believe"
          title={devOnlyText(
            "[CHRIS: page headline — e.g. 'Working theories about how the work actually gets done.']",
          ) || "Working theories about how the work actually gets done."}
          description={
            devOnlyText(
              "[CHRIS: 1–2 sentence intro. Frame these as opinions you currently hold, datable and updatable, not laws.]",
            ) ||
            "Opinions I currently hold about engineering, operations, and how teams ship. Dated, updatable, and open to disagreement."
          }
        />

        <DevOnly>
          <div className="mb-8">
            <PlaceholderBadge>
              Beliefs page — fill in via .local/reflection-questionnaire.md
            </PlaceholderBadge>
          </div>
        </DevOnly>

        {showStub ? (
          <FadeIn className="max-w-2xl text-[0.975rem] leading-relaxed text-muted-foreground">
            <p>This page is being written. Come back soon.</p>
          </FadeIn>
        ) : (
          <ol className="space-y-8 md:space-y-10 max-w-3xl list-none">
            {visibleBeliefs.map((b, i) => (
              <FadeIn
                as="li"
                key={i}
                delay={i * 0.04}
                className="relative pl-10 md:pl-12"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-1 font-display text-2xl font-semibold text-muted-foreground tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground leading-snug">
                  {b.title}
                </h2>
                <p className="mt-3 text-[1.0rem] leading-relaxed text-foreground/85">
                  {b.body}
                </p>
                <div className="mt-3 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  Updated {b.updated}
                </div>
              </FadeIn>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
