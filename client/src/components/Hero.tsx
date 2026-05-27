// Canonical home (per copy-redundancy pass) for the Hero eyebrow
// (location + time-of-life signal), the role-at-Fullscript line, and
// the ship-more-without-breaking-the-people headline. Other surfaces
// must reword these ideas rather than repeat the exact phrasings used
// here.
//
// May 2026 visual-weight pass (task #59): the right-column SystemsMap
// was replaced with a notebook-framed portrait of Chris so the hero
// reads with human warmth above the fold on both mobile and desktop.
// The portrait is wrapped in the Engineer's Notebook chrome: brass
// corner ticks, a stamped offset shadow, and the dotted-grid motif
// behind it. The SystemsMap component is preserved in the file for
// potential reuse but is no longer mounted in the hero.
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import SignatureMotif from "./SignatureMotif";

function PortraitFrame() {
  return (
    <div className="relative w-full max-w-[460px] mx-auto lg:ml-auto lg:mr-0">
      {/* Soft dotted-grid backdrop, offset from the portrait so it
          reads as paper showing through behind the photo. */}
      <div
        aria-hidden
        className="absolute -inset-4 sm:-inset-6 -z-10 signature-grid-soft opacity-80 rounded-md"
      />

      {/* Stamped offset shadow + bordered frame */}
      <div className="relative rounded-md border-2 border-primary bg-card overflow-hidden shadow-[6px_6px_0_hsl(var(--marker))]">
        <picture>
          <source
            type="image/avif"
            srcSet="/assets/images/about-work-800.avif 800w, /assets/images/about-work-1200.avif 1200w"
            sizes="(min-width: 1024px) 38vw, (min-width: 640px) 70vw, 90vw"
          />
          <source
            type="image/webp"
            srcSet="/assets/images/about-work-800.webp 800w, /assets/images/about-work-1200.webp 1200w"
            sizes="(min-width: 1024px) 38vw, (min-width: 640px) 70vw, 90vw"
          />
          <img
            src="/assets/images/about-work-1200.jpg"
            srcSet="/assets/images/about-work-800.jpg 800w, /assets/images/about-work-1200.jpg 1200w"
            sizes="(min-width: 1024px) 38vw, (min-width: 640px) 70vw, 90vw"
            alt="Christopher Folmar, Engineering Manager at Fullscript."
            className="block w-full h-auto object-cover"
            width={1024}
            height={1536}
            loading="eager"
            decoding="async"
            {...({ fetchpriority: "high" } as Record<string, string>)}
          />
        </picture>
      </div>

      {/* Brass corner ticks — notebook margin notations */}
      <span
        aria-hidden
        className="absolute -top-1 -left-1 h-4 w-4 border-t-2 border-l-2"
        style={{ borderColor: "hsl(var(--marker))" }}
      />
      <span
        aria-hidden
        className="absolute -top-1 -right-1 h-4 w-4 border-t-2 border-r-2"
        style={{ borderColor: "hsl(var(--marker))" }}
      />
      <span
        aria-hidden
        className="absolute -bottom-1 -left-1 h-4 w-4 border-b-2 border-l-2"
        style={{ borderColor: "hsl(var(--marker))" }}
      />
      <span
        aria-hidden
        className="absolute -bottom-1 -right-1 h-4 w-4 border-b-2 border-r-2"
        style={{ borderColor: "hsl(var(--marker))" }}
      />

      {/* Mono caption strip — a /path-style label, in the spirit of the
          systems-map node labels it replaces. */}
      <div className="mt-4 flex items-center gap-3">
        <span
          aria-hidden
          className="inline-block h-2 w-2 rounded-full"
          style={{ background: "hsl(var(--marker))" }}
        />
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
          /chris · durham, nh · 2026
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  const copyAnim = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: "easeOut" },
      };

  const portraitAnim = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut", delay: 0.1 },
      };

  return (
    <section
      id="home"
      className="relative pt-24 md:pt-32 pb-20 md:pb-28 overflow-hidden"
    >
      {/* Signature dotted-grid motif quietly threads through the hero */}
      <SignatureMotif soft />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          {/* Portrait — appears first on mobile for immediate human warmth,
              repositioned to the right column on desktop. */}
          <motion.div
            className="lg:hidden mb-10 max-w-[320px] mx-auto"
            {...portraitAnim}
          >
            <PortraitFrame />
          </motion.div>

          <motion.div className="lg:col-span-7" {...copyAnim}>
            <SignatureMotif variant="rule" className="mb-5 max-w-[10rem]" />
            <div className="text-eyebrow mb-6">
              Engineering manager at Fullscript · New dad at home
            </div>
            <h1 className="text-display text-foreground">
              I help engineering teams achieve more, and the engineers doing the work grow.
            </h1>
            <p className="mt-6 max-w-2xl text-lead">
              I'm Chris Folmar. I run three engineering teams at Fullscript,
              modernize the systems behind the business, and put most of my
              AI energy on the boring problems — so people can get back to
              the work that actually needs their judgment.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-primary text-primary-foreground font-medium shadow-[3px_3px_0_hsl(var(--marker))] hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background transition-colors"
              >
                View Case Studies
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/writing"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md border-2 border-primary bg-background text-foreground font-medium hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background transition-colors"
              >
                Read recent posts
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="hidden lg:block lg:col-span-5"
            {...portraitAnim}
          >
            <PortraitFrame />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
