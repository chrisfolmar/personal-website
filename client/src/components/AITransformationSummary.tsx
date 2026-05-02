// Canonical home (per copy-redundancy pass) for the operating-model
// framing in the section title, the work-people-shouldnt-do framing in
// the description, the not-replacing-anyone framing, and the
// human-voice variant of the time-back idea. The operator-voice
// variant of the time-back idea lives in the résumé bullet. All other
// surfaces must reword these ideas instead of repeating the phrasings.
import { memo } from "react";
import { Link } from "wouter";
import { ArrowRight, Sparkles } from "lucide-react";
import SectionHeader from "./SectionHeader";
import FadeIn from "./FadeIn";

const pillars = [
  {
    label: "Easy Wins",
    body: "Small, high-leverage automations shipped in days that remove friction this week.",
  },
  {
    label: "Initiatives",
    body: "Cross-team workflows shipped in weeks that connect systems and replace recurring manual work.",
  },
  {
    label: "Reworks",
    body: "Workflows worth redesigning end-to-end with AI as a first-class participant.",
  },
];

function AITransformationSummary() {
  return (
    <section id="ai-transformation" className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="AI Transformation · Team GSD"
          title="An AI-first operating model, not another pile of demos."
          description="Team GSD exists to take the work people shouldn't have to do — the copy/paste, the reconciliation, the one-hundredth version of the same email — and turn it into systems that just run. The goal isn't to replace anyone. It's to give every team back the time to do work that actually moves the business forward."
        />

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {pillars.map((p, i) => (
            <FadeIn
              key={p.label}
              delay={i * 0.05}
              className="bg-card border border-border rounded-md p-7"
            >
              <div className="flex items-center gap-2 text-eyebrow mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                {p.label}
              </div>
              <p className="text-[0.975rem] leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10 md:mt-12">
          <Link
            href="/case-studies/team-gsd-ai-transformation"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
          >
            Read the full Team GSD case study
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

export default memo(AITransformationSummary);
