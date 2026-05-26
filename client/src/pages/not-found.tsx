import { Link } from "wouter";
import { ArrowRight, Home, FileText, Layers } from "lucide-react";
import { NOT_FOUND_METADATA } from "@/lib/metadata/routes";
import { usePageSeo } from "@/lib/metadata/usePageSeo";
import SectionHeader from "@/components/SectionHeader";
import FadeIn from "@/components/FadeIn";
import SignatureMotif from "@/components/SignatureMotif";

export default function NotFound() {
  usePageSeo(NOT_FOUND_METADATA);

  return (
    <section className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden">
      <SignatureMotif soft />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <FadeIn className="mb-6 font-mono text-[0.78rem] uppercase tracking-[0.16em] text-muted-foreground">
            404 · page not found
          </FadeIn>
          <SectionHeader
            title="That page isn't here."
            description="Either I moved it, never wrote it, or you followed a link from an older version of the site. The work that is here is just a click away."
          />

          <FadeIn delay={0.08} className="mt-2 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-primary text-primary-foreground font-medium shadow-[3px_3px_0_hsl(var(--marker))] hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background transition-colors"
            >
              <Home className="h-4 w-4" />
              Back to home
            </Link>
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md border-2 border-primary bg-background text-foreground font-medium hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background transition-colors"
            >
              <FileText className="h-4 w-4" />
              Read recent writing
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md border-2 border-primary bg-background text-foreground font-medium hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background transition-colors"
            >
              <Layers className="h-4 w-4" />
              Browse case studies
            </Link>
          </FadeIn>

          <FadeIn delay={0.14} className="mt-10">
            <Link
              href="/sitemap"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
            >
              Or see the full sitemap
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
