// Per the copy-redundancy pass, this section deliberately avoids the
// operating-model framing (canonical home: AITransformationSummary)
// and the five-departments framing (canonical homes: Team GSD case
// study summary + résumé summary). Keep the framing fresh here.
import { memo } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import FadeIn from "./FadeIn";

function CurrentFocus() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-3xl">
          <div className="text-eyebrow mb-4">Current focus</div>
          <p className="font-display text-2xl md:text-3xl leading-snug text-foreground">
            Threading AI into the way Fullscript actually runs — and growing
            more engineers into senior and lead roles while doing it.
          </p>
          <Link
            href="/now"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
          >
            What I'm working on now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

export default memo(CurrentFocus);
