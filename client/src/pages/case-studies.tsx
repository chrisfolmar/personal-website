import { useEffect, useMemo } from "react";
import { caseStudies } from "@/lib/data";
import SectionHeader from "@/components/SectionHeader";
import CaseStudyCard from "@/components/CaseStudyCard";
import { CASE_STUDIES_METADATA } from "@/lib/metadata/routes";
import { usePageSeo } from "@/lib/metadata/usePageSeo";

export default function CaseStudies() {
  usePageSeo(CASE_STUDIES_METADATA);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Surface-signal-early (task #69): featured studies (e.g. Team GSD
  // AI Transformation) lead, then the rest follow in source order.
  // Driven by `featured: true` in data.ts, not by hand-coded slugs
  // here.
  const orderedStudies = useMemo(() => {
    const featured = caseStudies.filter((s) => s.featured);
    const rest = caseStudies.filter((s) => !s.featured);
    return [...featured, ...rest];
  }, []);

  return (
    <div className="pt-28 md:pt-32 pb-20 md:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Case studies"
          title="The work I keep coming back to."
          description="Deep dives on the work I'm proudest of — the problem, the change, the systems that came out of it, and the measurable impact."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {orderedStudies.map((study, index) => (
            <CaseStudyCard
              key={study.slug}
              slug={study.slug}
              title={study.title}
              summary={study.summary}
              impact={study.impact}
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
