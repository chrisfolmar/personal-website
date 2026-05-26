import { memo } from "react";
import { skills, tools } from "@/lib/data";
import SectionHeader from "@/components/SectionHeader";
import FadeIn from "@/components/FadeIn";
import SkillCard from "@/components/ui/skill-card";

const SkillRow = memo(
  ({ skill, index }: { skill: typeof skills[0]; index: number }) => (
    <FadeIn delay={index * 0.03} className="border-b border-border last:border-b-0 py-5">
      <div className="flex items-baseline justify-between gap-4">
        <h4 className="font-display font-semibold text-foreground">
          {skill.name}
        </h4>
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground tabular-nums whitespace-nowrap">
          {skill.years} yr
        </span>
      </div>
      {skill.description ? (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {skill.description}
        </p>
      ) : null}
    </FadeIn>
  ),
);
SkillRow.displayName = "SkillRow";

function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Skills & tools"
          title="The mix of leadership, systems, and engineering muscle I lean on."
          description="Day-to-day, the work cuts across operating-model design, business-systems integration, and the practical engineering it takes to keep both honest."
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="text-eyebrow mb-4">Leadership & technical</div>
            <div>
              {skills.map((skill, index) => (
                <SkillRow key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="text-eyebrow mb-4">Tools I reach for</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
              {tools.map((tool, index) => (
                <SkillCard
                  key={tool.name}
                  name={tool.name}
                  icon={tool.icon}
                  delay={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Skills);
