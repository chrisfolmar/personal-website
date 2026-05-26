import { memo } from "react";
import { Users, Workflow, Server, Sparkles } from "lucide-react";
import SectionHeader from "./SectionHeader";
import PrincipleCard from "./PrincipleCard";

const principles = [
  {
    number: "01",
    title: "Scale teams",
    description:
      "Help globally distributed engineering teams ship more without adding headcount — by fixing the operating model, not the people.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    number: "02",
    title: "Modernize systems",
    description:
      "Lead the unglamorous work behind ERP, WMS, finance, and catalog so the systems running the business keep up with where the business is going.",
    icon: <Server className="h-5 w-5" />,
  },
  {
    number: "03",
    title: "Automate workflows",
    description:
      "Take the copy/paste, reconciliation, and one-hundredth-version-of-the-same-email and turn it into systems that just run.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    number: "04",
    title: "Create clarity",
    description:
      "Build the cadences, dashboards, and writing that let everyone answer 'what's in flight, what's blocked, what's done' without another meeting.",
    icon: <Sparkles className="h-5 w-5" />,
  },
];

function WhatIDo() {
  return (
    <section id="what-i-do" className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="What I do"
          title="What I'm useful for."
          description="Every team I've led, every system I've rebuilt, and every AI workflow I've shipped has come back to one of these."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {principles.map((p, i) => (
            <PrincipleCard
              key={p.number}
              number={p.number}
              title={p.title}
              description={p.description}
              icon={p.icon}
              delay={i * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(WhatIDo);
