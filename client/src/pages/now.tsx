// Per the copy-redundancy pass, the Team GSD focus body avoids the
// operating-model framing (canonical home: AITransformationSummary)
// and the five-departments framing (canonical homes: Team GSD case
// study summary + résumé summary).
import { useEffect } from "react";
import { Sparkles, Briefcase, BookOpen, Heart, Calendar, Wrench, RotateCcw } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import FadeIn from "@/components/FadeIn";
import { NOW_METADATA } from "@/lib/metadata/routes";
import { usePageSeo } from "@/lib/metadata/usePageSeo";
import {
  DevOnly,
  PlaceholderBadge,
  devOnlyText,
  isDev,
  isPlaceholder,
} from "@/lib/placeholder";

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

interface MicroItem {
  title: string;
  body: string;
}

const currentlyReading: MicroItem[] = [
  { title: "[CHRIS: book/essay #1 — author]", body: "[CHRIS: one line on why you picked it up.]" },
  { title: "[CHRIS: book/essay #2 — author]", body: "[CHRIS: one line on why you picked it up.]" },
  { title: "[CHRIS: book/essay #3 — author, optional]", body: "[CHRIS: one line.]" },
  { title: "[CHRIS: book/essay #4 — author, optional]", body: "[CHRIS: one line.]" },
];

const currentlyUsing: MicroItem[] = [
  { title: "[CHRIS: tool #1]", body: "[CHRIS: one line — specific over generic, e.g. 'Cursor with the X workflow', 'n8n for Y'.]" },
  { title: "[CHRIS: tool #2]", body: "[CHRIS: one line.]" },
  { title: "[CHRIS: tool #3]", body: "[CHRIS: one line.]" },
  { title: "[CHRIS: tool #4]", body: "[CHRIS: one line.]" },
  { title: "[CHRIS: tool #5 — optional]", body: "[CHRIS: one line.]" },
  { title: "[CHRIS: tool #6 — optional]", body: "[CHRIS: one line.]" },
];

const recentlyChangedMyMind: MicroItem[] = [
  { title: "[CHRIS: short headline — the thing you used to think]", body: "[CHRIS: 1–3 sentences on what you think now and what changed.]" },
  { title: "[CHRIS: short headline #2 — optional]", body: "[CHRIS: 1–3 sentences.]" },
  { title: "[CHRIS: short headline #3 — optional]", body: "[CHRIS: 1–3 sentences.]" },
];

function MicroSection({
  eyebrow,
  title,
  blurb,
  icon,
  items,
  testId,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
  icon: React.ReactNode;
  items: MicroItem[];
  testId: string;
}) {
  const visible = items.filter((i) => isDev || !isPlaceholder(i.body));
  if (visible.length === 0 && !isDev) return null;

  return (
    <section className="mt-16 md:mt-20 max-w-5xl" data-testid={testId}>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={blurb}
        size="sub"
        icon={icon}
      />
      <DevOnly>
        <div className="mb-5">
          <PlaceholderBadge>awaiting Chris</PlaceholderBadge>
        </div>
      </DevOnly>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {visible.map((item, i) => (
          <FadeIn
            as="li"
            key={i}
            delay={i * 0.03}
            className="bg-card border border-border rounded-md p-5"
          >
            <div className="font-display text-base font-semibold text-foreground">
              {devOnlyText(item.title)}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {devOnlyText(item.body)}
            </p>
          </FadeIn>
        ))}
      </ul>
    </section>
  );
}

export default function NowPage() {
  usePageSeo(NOW_METADATA);

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
          description="A short, honest look at what I'm focused on right now — both at work and outside of it."
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

        <MicroSection
          eyebrow="Currently reading"
          title="What's on the nightstand."
          blurb="A short list of what I'm reading right now and why I picked it up."
          icon={<BookOpen className="h-4 w-4" />}
          items={currentlyReading}
          testId="now-reading"
        />

        <MicroSection
          eyebrow="Currently using"
          title="The tools I'm actually leaning on."
          blurb="Specific over generic — the workflows and tools I'm getting real leverage from right now."
          icon={<Wrench className="h-4 w-4" />}
          items={currentlyUsing}
          testId="now-using"
        />

        <MicroSection
          eyebrow="Recently changed my mind on"
          title="Where I've updated my priors."
          blurb="The thing operators almost never publish: positions I held that I no longer hold."
          icon={<RotateCcw className="h-4 w-4" />}
          items={recentlyChangedMyMind}
          testId="now-changed-mind"
        />

        <FadeIn className="mt-16 text-sm text-muted-foreground max-w-3xl">
          This page changes as my focus changes. If we've talked recently and
          something here looks stale, that's on me — feel free to nudge.
        </FadeIn>
      </div>
    </div>
  );
}
