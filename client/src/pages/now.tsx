// Per the copy-redundancy pass, the Team GSD focus body avoids the
// operating-model framing (canonical home: AITransformationSummary)
// and the five-departments framing (canonical homes: Team GSD case
// study summary + résumé summary).
import { useEffect } from "react";
import { Sparkles, Briefcase, BookOpen, Heart, Calendar } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import FadeIn from "@/components/FadeIn";
import { buildWebPageJsonLd } from "@/lib/metadata/seo";
import { usePageSeo } from "@/lib/metadata/usePageSeo";

interface FocusItem {
  icon: React.ReactNode;
  title: string;
  body: string;
}

const focusAreas: FocusItem[] = [
  {
    icon: <Sparkles className="h-4 w-4" />,
    title: "Team GSD & AI transformation",
    body: "Most of my work energy is going into Team GSD — the cross-functional effort embedding AI into how Fullscript actually runs. We're past the phase of proving the concept and into the phase of making it stick: standards, ownership, and the next generation of reworks.",
  },
  {
    icon: <Briefcase className="h-4 w-4" />,
    title: "Engineering leadership",
    body: "Three globally distributed teams, scaling throughput without scaling headcount, and growing more engineers into senior and lead roles. The thing I'm working hardest on right now is making the operating model so clear that I become less of a bottleneck.",
  },
  {
    icon: <BookOpen className="h-4 w-4" />,
    title: "Sharpening how I lead",
    body: "Reading more about org design and how leaders think about leverage at scale. Trying to be more deliberate about what I'm modeling for the people I work with.",
  },
  {
    icon: <Heart className="h-4 w-4" />,
    title: "Husband and brand-new dad",
    body: "Newly a dad. The biggest change of my life and the most grounding one. Everything else gets prioritized around it.",
  },
];

const NOW_TITLE = "Now | Chris Folmar";
const NOW_DESCRIPTION =
  "What Chris Folmar is focused on right now — Team GSD, AI-enabled workflows, engineering leadership, and life as a new dad.";

export default function NowPage() {
  usePageSeo({
    title: NOW_TITLE,
    description: NOW_DESCRIPTION,
    path: "/now",
    jsonLd: buildWebPageJsonLd("/now", NOW_TITLE, NOW_DESCRIPTION),
    jsonLdId: "now-jsonld",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const lastUpdated = "April 2026";

  return (
    <div className="pt-28 md:pt-32 pb-20 md:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Now"
          title="What I'm focused on, this season."
          description={
            <>
              A short, honest look at what I'm focused on right now — both at
              work and outside of it. Inspired by{" "}
              <a
                href="https://nownownow.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                the /now page movement
              </a>
              .
            </>
          }
        />

        <FadeIn className="-mt-4 mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          Last updated: {lastUpdated}
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl">
          {focusAreas.map((item, index) => (
            <FadeIn
              key={item.title}
              delay={index * 0.05}
              className="bg-card border border-border rounded-md p-7"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  {item.icon}
                </span>
                <h2 className="font-display text-lg font-semibold text-foreground">
                  {item.title}
                </h2>
              </div>
              <p className="text-[0.975rem] leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12 text-sm text-muted-foreground max-w-3xl">
          This page changes as my focus changes. If we've talked recently and
          something here looks stale, that's on me — feel free to nudge.
        </FadeIn>
      </div>
    </div>
  );
}
