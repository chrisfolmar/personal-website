// "Reflection of me" surface (task 36/37).
// A pinned, letter-style manifesto in Chris's first-person voice.
import { memo } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import FadeIn from "./FadeIn";
import SignatureMotif from "./SignatureMotif";

function Manifesto() {
  return (
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
          </div>
          <article className="space-y-5 text-[1.05rem] md:text-[1.125rem] leading-relaxed text-foreground/90 font-display">
            <p>
              I've always been drawn to the space between the work people are
              trying to do and the systems that either help them or get in
              their way.
            </p>
            <p>
              Sometimes that means software. Sometimes it means an internal
              tool, a clearer process, a better handoff, or simply making
              information easier to find and trust.
            </p>
            <p>
              The work I care about usually starts with a simple question:{" "}
              <em>Why does this feel harder than it needs to?</em>
            </p>
            <p>
              My career has grown from hands-on technical work into engineering
              leadership, but I still feel most connected to the work when I'm
              close enough to understand the real friction. Where are people
              losing time? Where is ownership unclear? Where are teams relying
              on memory, follow-up, or manual effort? Where could better
              tooling or clearer communication make the day feel less chaotic?
            </p>
            <p>
              At Fullscript, I've worked across business systems, post-order
              operations, internal tooling, Customer Success workflows,
              finance and operations processes, AI-enabled automation, and
              team operating models. The common thread is not a specific
              technology stack. It's trying to make work clearer, more
              reliable, and more useful for the people depending on it.
            </p>
            <p>
              I like practical systems. The kind that reduce noise. The kind
              that help teams move. The kind that make someone's job a little
              less frustrating. I'm excited about AI and automation, but only
              when they're pointed at real problems — the goal isn't to
              replace judgment, it's to give people more time and space to use
              it.
            </p>
            <p>
              I'm trying to build a career and a body of work around that
              idea: useful systems, thoughtful leadership, strong execution,
              and a bias toward leaving things clearer than I found them.
            </p>
          </article>
          <div className="mt-8 flex items-center gap-3">
            <span
              aria-hidden
              className="h-px w-12"
              style={{ background: "hsl(var(--marker))" }}
            />
            <span className="font-mono text-[0.78rem] uppercase tracking-[0.16em] text-muted-foreground">
              Chris Folmar · Durham, NH · between standups and bedtime stories
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
  );
}

export default memo(Manifesto);
