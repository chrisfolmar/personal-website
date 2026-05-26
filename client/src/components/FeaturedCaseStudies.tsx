import { memo } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import CaseStudyCard from "./CaseStudyCard";
import { caseStudies } from "@/lib/data";

function FeaturedCaseStudies() {
  const featured = caseStudies.slice(0, 3);

  return (
    <section
      id="case-studies"
      className="py-20 md:py-28 bg-muted/30 border-y border-border"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Featured case studies"
          title="The work behind the headlines."
          description="The kind of work worth a real walkthrough — the problem, what changed, the systems that came out of it, and what I'd do differently next time."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {featured.map((study, i) => (
            <CaseStudyCard
              key={study.slug}
              slug={study.slug}
              title={study.title}
              summary={study.summary}
              impact={study.impact}
              delay={i * 0.05}
            />
          ))}
        </div>

        <div className="mt-10 md:mt-12">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
          >
            View all case studies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default memo(FeaturedCaseStudies);
