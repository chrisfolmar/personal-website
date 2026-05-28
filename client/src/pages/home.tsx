import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import MetricStrip from "@/components/MetricStrip";
import WhatIDo from "@/components/WhatIDo";
import FeaturedCaseStudies from "@/components/FeaturedCaseStudies";
import AITransformationSummary from "@/components/AITransformationSummary";
import Writing from "@/components/Writing";
import CurrentFocus from "@/components/CurrentFocus";
import CtaBand from "@/components/CtaBand";
import { HOME_METADATA } from "@/lib/metadata/routes";
import { usePageSeo } from "@/lib/metadata/usePageSeo";

// Homepage rhythm (task #66, May 2026): Chris is positioned in the first
// line of the site overview as an "Engineering Manager and AI
// Transformation Leader," so the homepage now surfaces the AI story
// within the first scroll instead of burying it at position 6/7.
// Direction A from the task brief was chosen: AITransformationSummary
// is promoted directly under MetricStrip so the flow reads as
// signal (Hero) → proof (MetricStrip, AI metric leading) → the
// differentiated AI story (AITransformationSummary) → range
// (WhatIDo with AI leading, CurrentFocus rebalanced to the coaching
// half of the hero promise so it isn't a third AI restatement) →
// cases (FeaturedCaseStudies, Team GSD curated to lead) → writing
// → CTA. Manifesto renders consistently in dev and prod (its content
// is fully filled), so the ordering reads the same in both.
export default function HomePage() {
  usePageSeo(HOME_METADATA);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.slice(1);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      <Manifesto />
      <MetricStrip />
      <AITransformationSummary />
      <WhatIDo />
      <CurrentFocus />
      <FeaturedCaseStudies />
      <Writing />
      <CtaBand
        eyebrow="Let's talk"
        title="If any of this sounds like the problem in front of you, I'd love to compare notes."
      >
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Get in touch
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/resume"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-background/30 text-background hover:bg-background/10 transition-colors"
        >
          Read the résumé
        </Link>
      </CtaBand>
    </div>
  );
}
