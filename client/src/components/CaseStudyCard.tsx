import { memo } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import FadeIn from "./FadeIn";

interface CaseStudyCardProps {
  slug: string;
  title: string;
  summary: string;
  impact: { label: string; value: string }[];
  delay?: number;
}

function CaseStudyCard({
  slug,
  title,
  summary,
  impact,
  delay = 0,
}: CaseStudyCardProps) {
  const topImpact = impact.slice(0, 3);

  return (
    <FadeIn delay={delay} className="h-full">
      <Link
        href={`/case-studies/${slug}`}
        className="group flex h-full flex-col bg-card border border-border rounded-md p-7 md:p-8 transition-all hover:border-primary/40 hover:shadow-md"
      >
        <h3 className="font-display text-xl md:text-2xl font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="mt-3 text-[0.975rem] leading-relaxed text-muted-foreground">
          {summary}
        </p>

        {topImpact.length > 0 ? (
          <ul className="mt-6 space-y-2 border-t border-border pt-5">
            {topImpact.map((item) => (
              <li
                key={item.label}
                className="flex items-baseline gap-3 text-sm"
              >
                <span className="font-display tabular-nums font-semibold text-primary min-w-[3.5rem]">
                  {item.value}
                </span>
                <span className="text-muted-foreground leading-snug">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
          Read case study
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </Link>
    </FadeIn>
  );
}

export default memo(CaseStudyCard);
