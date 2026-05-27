// Canonical home (per copy-redundancy pass) for the operating-model
// framing in the section title, the work-people-shouldnt-do framing in
// the description, the not-replacing-anyone framing, and the
// human-voice variant of the time-back idea. The operator-voice
// variant of the time-back idea lives in the résumé bullet. All other
// surfaces must reword these ideas instead of repeating the phrasings.
//
// Pillar decision (task #68): kept the three-tier Easy Wins / Initiatives
// / Reworks model — it's the real triage model from the Team GSD case
// study, not a marketing scaffold, so a fourth pillar would have been
// invented to fill space. Rewrote each body to name the actual tooling
// stack (n8n, ChatGPT Enterprise, NotebookLM) and, in the Easy Wins
// pillar, to back the claim with the case study's 40%+ across five
// departments / zero added headcount numbers instead of a generic
// "removes friction" line.
import { memo } from "react";
import { Link } from "wouter";
import { ArrowRight, Sparkles } from "lucide-react";
import SectionHeader from "./SectionHeader";
import FadeIn from "./FadeIn";
import SignatureMotif from "./SignatureMotif";
import SystemsMap from "./SystemsMap";

const pillars = [
  {
    label: "Easy Wins",
    body: "Small n8n and ChatGPT Enterprise automations shipped in days — the weekly reconciliation, the support-triage backlog, the recurring report nobody wants to draft. They compound: this is how five departments got back 40%+ of their operational time with zero added headcount.",
  },
  {
    label: "Initiatives",
    body: "Cross-team workflows shipped in weeks that connect NetSuite, the warehouse, the helpdesk, and the catalog so the same fact stops being entered four times. Sized to ship inside a quarter — not to live on a roadmap forever.",
  },
  {
    label: "Reworks",
    body: "Workflows worth redesigning end-to-end with AI as a first-class participant — institutional knowledge stitched together in NotebookLM, intake reshaped so the model drafts and a human decides.",
  },
];

function AITransformationSummary() {
  return (
    <section id="ai-transformation" className="relative py-20 md:py-28">
      <SignatureMotif soft />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop (lg+): the operating-model diagram sits to the left of
            the section header — it literally illustrates the "operating
            model around AI" idea the title talks about. Below lg the map
            is hidden so the header keeps its tighter, more readable
            single-column rhythm on tablet and phone. */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center mb-12 md:mb-14">
          <FadeIn className="hidden lg:flex lg:col-span-5 justify-start">
            <SystemsMap />
          </FadeIn>
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="AI Transformation · Team GSD"
              title="Most AI projects fail because the operating model around them is wrong. Team GSD is the part I work on."
              description="Team GSD takes the work people shouldn't have to do — the copy/paste, the reconciliation, the one-hundredth version of the same email — and turns it into systems that just run. The goal isn't to replace anyone. It's to give every team back the time to do work that moves the business forward."
              className="mb-0"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {pillars.map((p, i) => (
            <FadeIn
              key={p.label}
              delay={i * 0.05}
              className="bg-card border border-border rounded-md p-7 shadow-[3px_3px_0_hsl(var(--marker)/0.6)]"
            >
              <div className="flex items-center gap-2 text-eyebrow mb-3">
                <Sparkles className="h-3 w-3" />
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
