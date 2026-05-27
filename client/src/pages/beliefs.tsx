// "Reflection of me" surface (task 36).
// "Things I believe" — short, opinionated statements with dates.
// Every belief body is currently a [CHRIS: ...] placeholder. In dev all
// beliefs render so the page shape is visible; in production only
// filled beliefs render, and the page itself is hidden entirely if
// none have been filled yet.
import { useEffect, useMemo } from "react";
import SectionHeader from "@/components/SectionHeader";
import FadeIn from "@/components/FadeIn";
import { BELIEFS_METADATA } from "@/lib/metadata/routes";
import { usePageSeo } from "@/lib/metadata/usePageSeo";
import { isDev, isPlaceholder } from "@/lib/placeholder";

interface Belief {
  title: string;
  body: string;
}

// Page-level "last updated" stamp. When individual beliefs start
// diverging in date, switch to a per-belief `updated` field and only
// render the badge on entries whose date differs from this value.
const beliefsLastUpdated = "May 2026";

const beliefs: Belief[] = [
  {
    title: "Useful beats impressive.",
    body: "I'm more interested in work that quietly helps people every day than work that only looks good in a presentation. The best systems are usually the ones people trust enough to stop thinking about.",
  },
  {
    title: "Clarity is underrated.",
    body: "Clear ownership, clear writing, clear priorities, and clear systems make a real difference. A lot of stress at work comes from people not knowing where something stands, who owns it, or what happens next.",
  },
  {
    title: "Technology should reduce friction, not create theater.",
    body: "I like new tools, but I don't want to use something just because it sounds modern. AI, automation, dashboards, integrations, and process changes only matter if they make the work better.",
  },
  {
    title: "Leadership is mostly about creating the conditions for good work.",
    body: "People do their best work when expectations are clear, trust is real, feedback is honest, and the system around them is not constantly fighting them.",
  },
  {
    title: "People-first does not mean soft.",
    body: "I care a lot about empathy and sustainability. I also care about follow-through, ownership, and doing hard things well. Those ideas should support each other, not compete.",
  },
  {
    title: "Documentation is part of the system.",
    body: "I used to think of documentation as something that came after the real work. I now see it as one of the ways teams scale context, reduce confusion, and make better decisions.",
  },
  {
    title: "The best technical work changes behavior.",
    body: "A tool or process isn't done just because it works technically. It's successful when people use it, trust it, and make better decisions because of it.",
  },
  {
    title: "Life outside work matters.",
    body: "I care about doing meaningful work, but I'm also a husband, dad, friend, Arsenal fan, rower, and person trying to be present in a full season of life. The goal isn't just to build better systems at work — it's to build a better life around the work, too.",
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
          title="Working theories about how the work actually gets done."
          description="Opinions I currently hold about engineering, operations, leadership, and life around the work. Dated, updatable, and open to disagreement."
        />

        {!showStub && visibleBeliefs.length > 0 ? (
          <FadeIn className="max-w-3xl -mt-4 mb-10 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground">
            Updated {beliefsLastUpdated}
          </FadeIn>
        ) : null}

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
              </FadeIn>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
