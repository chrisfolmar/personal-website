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
    icon: <Heart className="h-4 w-4" />,
    title: "Husband and brand-new dad",
    body: "Newly a dad. The biggest change of my life and the most grounding one. Everything else gets prioritized around it.",
  },
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
];

interface MicroItem {
  title: string;
  body: string;
}

const currentlyReading: MicroItem[] = [
  {
    title: "The Obstacle is the Way — Ryan Holiday",
    body: "Recommended by a previous boss, it's become a go-to for processing the challenges life throws at you. It carries new meaning now that the every-day obstacles look different.",
  },
  {
    title: "The Motivation Manifesto — Brendon Burchard",
    body: "Continuing to sharpen my ability to foster and manifest intrinsic motivation — in myself and in the people I lead.",
  },
  {
    title: "An Elegant Puzzle — Systems of Engineering Management — Will Larson",
    body: "Career-oriented learning around the craft of engineering leadership — the structural problems that come with scale.",
  },
  {
    title: "The Overthinker's Guide to Making Decisions — Joseph Nguyen",
    body: "I overthink decisions at work and in life. This is a deliberate attempt to get better at moving through that as I keep growing as a leader.",
  },
];

const currentlyUsing: MicroItem[] = [
  {
    title: "Ruby on Rails, React, GraphQL",
    body: "The Fullscript engineering ecosystem — still close enough to the stack to make grounded decisions.",
  },
  {
    title: "Asana",
    body: "Making work visible, reducing status-update friction, and helping teams communicate asynchronously.",
  },
  {
    title: "ChatGPT, Cursor, n8n, Browser Use",
    body: "AI-enabled tools for automation, workflow design, and the internal tooling Team GSD ships.",
  },
  {
    title: "Metabase",
    body: "Turning operational behavior into something teams can actually see and act on.",
  },
  {
    title: "Google Docs and lightweight diagrams",
    body: "Frameworks and one-pagers that make complicated work easier to explain.",
  },
];

const recentlyChangedMyMind: MicroItem[] = [
  {
    title: "Strong leadership ≠ staying close to every detail",
    body: "I used to think strong leadership meant staying close to every detail. I now think it means creating enough clarity and trust that the right people can own the right details.",
  },
  {
    title: "Documentation isn't a support artifact",
    body: "I used to think documentation was mostly a support artifact. I now think it's part of the system — one of the main ways teams scale context and make better decisions.",
  },
  {
    title: "Technical leverage isn't only about better code",
    body: "I used to think technical leverage mostly came from better code. I now think some of the highest leverage comes from better information flow.",
  },
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

  // NOTE: bump this whenever /now content above (focusAreas, currentlyReading,
  // currentlyUsing, recentlyChangedMyMind) changes. A visibly stale /now page
  // undermines the whole point of having one. See replit.md "Engineering"
  // → "/now freshness" for the checklist.
  const lastUpdated = "May 2026";

  return (
    <div className="pt-28 md:pt-32 pb-20 md:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Now"
          title="What I'm focused on, this season."
          description="A short, honest look at what I'm focused on right now — at Fullscript, at home in Durham with Lauren and a brand-new baby, and in whatever quiet hours are left over."
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
