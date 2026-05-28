import { memo } from "react";
import { Users, Workflow, Server, Sparkles } from "lucide-react";
import SectionHeader from "./SectionHeader";
import PrincipleCard from "./PrincipleCard";

// Order (task #66): the AI/automation card leads so AI is named
// explicitly in the "What I do" range, not just implied behind a
// workflow framing. The other three cards keep their existing copy.
const principles = [
  {
    key: "workflows",
    title: "Pointing AI at the boring problems",
    description:
      "Pick the workflows where AI does real work — not demos — and ship them in days, not quarters, so people get an hour of their day back.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    key: "teams",
    title: "Scaling engineering teams",
    description:
      "Help globally distributed engineering teams ship more without adding headcount — by fixing the operating model, not the people.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    key: "systems",
    title: "The systems behind the business",
    description:
      "Lead the unglamorous work behind ERP, WMS, finance, and catalog so the tools running the business keep up with where the business is going.",
    icon: <Server className="h-5 w-5" />,
  },
  {
    key: "clarity",
    title: "Keeping everyone honest",
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
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {principles.map((p, i) => (
            <PrincipleCard
              key={p.key}
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
