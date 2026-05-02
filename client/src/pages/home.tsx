import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import MetricStrip from "@/components/MetricStrip";
import WhatIDo from "@/components/WhatIDo";
import FeaturedCaseStudies from "@/components/FeaturedCaseStudies";
import AITransformationSummary from "@/components/AITransformationSummary";
import Writing from "@/components/Writing";
import CurrentFocus from "@/components/CurrentFocus";
import CtaBand from "@/components/CtaBand";
import { HOME_METADATA } from "@/lib/metadata/routes";
import { usePageSeo } from "@/lib/metadata/usePageSeo";

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
      <MetricStrip />
      <WhatIDo />
      <CurrentFocus />
      <FeaturedCaseStudies />
      <AITransformationSummary />
      <Writing />
      <CtaBand
        eyebrow="Let's talk"
        title="If you're rebuilding how your org actually operates, I'd love to compare notes."
        description="Whether it's scaling a team, modernizing systems, or rolling out AI without losing the people who run the work — happy to trade ideas."
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
