// "Reflection of me" surface (task 36).
// A pinned, letter-style manifesto in Chris's first-person voice.
// The body copy is currently scaffolded as [CHRIS: ...] placeholders
// and the whole component is wrapped in <DevOnly> so it doesn't render
// in production until Chris fills in his actual words via
// .local/reflection-questionnaire.md.
import { memo } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import FadeIn from "./FadeIn";
import SignatureMotif from "./SignatureMotif";
import { DevOnly, PlaceholderBadge, devOnlyText } from "@/lib/placeholder";

function Manifesto() {
  return (
    <DevOnly>
      <section
        id="manifesto"
        aria-label="A short manifesto from Chris"
        className="py-16 md:py-24 border-y border-border bg-background relative overflow-hidden"
      >
        <SignatureMotif soft />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-3xl mx-auto">
            <div className="mb-4 flex items-center gap-3">
              <div className="text-eyebrow">A short letter</div>
              <PlaceholderBadge inline>awaiting Chris</PlaceholderBadge>
            </div>
            <article className="space-y-5 text-[1.05rem] md:text-[1.125rem] leading-relaxed text-foreground/90 font-display">
              <p>
                {devOnlyText(
                  "[CHRIS: Opening line — a single, declarative sentence about why this site exists or what you want a reader to walk away believing about the work. 1 sentence.]",
                )}
              </p>
              <p>
                {devOnlyText(
                  "[CHRIS: Middle paragraph — where you came from, where you are now, and what specifically you're trying to do with the years still ahead. Concrete, not abstract. 80–120 words.]",
                )}
              </p>
              <p>
                {devOnlyText(
                  "[CHRIS: Closing — a line that lands. The thing you'd want printed on the back of the book. 1–2 sentences.]",
                )}
              </p>
            </article>
            <div className="mt-8 flex items-center gap-3">
              <span
                aria-hidden
                className="h-px w-12"
                style={{ background: "hsl(var(--marker))" }}
              />
              <span className="font-mono text-[0.78rem] uppercase tracking-[0.16em] text-muted-foreground">
                Chris Folmar · {devOnlyText("[CHRIS: city, season]")}
              </span>
            </div>
            <div className="mt-6">
              <Link
                href="/beliefs"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
              >
                Read what I currently believe
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </DevOnly>
  );
}

export default memo(Manifesto);
