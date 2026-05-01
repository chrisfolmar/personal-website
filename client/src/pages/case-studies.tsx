import { useEffect } from "react";
import { caseStudies } from "@/lib/data";
import SectionHeader from "@/components/SectionHeader";
import CaseStudyCard from "@/components/CaseStudyCard";
import { buildCaseStudyListJsonLd } from "@/lib/metadata/seo";
import { usePageSeo } from "@/lib/metadata/usePageSeo";

const CASE_STUDIES_TITLE = "Case Studies | Chris Folmar";
const CASE_STUDIES_DESCRIPTION =
  "Detailed case studies on scaling engineering throughput, AI-enabled workflow transformation, ERP/WMS modernization, and async information flow.";

export default function CaseStudies() {
  usePageSeo({
    title: CASE_STUDIES_TITLE,
    description: CASE_STUDIES_DESCRIPTION,
    path: "/case-studies",
    jsonLd: buildCaseStudyListJsonLd(caseStudies),
    jsonLdId: "case-studies-index-jsonld",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 md:pt-32 pb-20 md:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Case studies"
          title="Proof, not just a portfolio."
          description="Deep dives on the work I'm proudest of — the problem, the change, the systems, and the measurable impact. Written for executives, engineering leaders, and anyone evaluating how I actually operate."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {caseStudies.map((study, index) => (
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
