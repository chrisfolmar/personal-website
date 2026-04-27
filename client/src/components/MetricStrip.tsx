import { memo } from "react";
import FadeIn from "./FadeIn";

interface Metric {
  value: string;
  label: string;
}

const defaultMetrics: Metric[] = [
  { value: "300%+", label: "Project throughput increase" },
  { value: "<1%", label: "MR rollback rate" },
  { value: "43%", label: "NetSuite transaction reduction" },
  { value: "95%", label: "Invoicing ownership migration" },
  { value: "90%", label: "Reduction in reporting overhead" },
];

interface MetricStripProps {
  metrics?: Metric[];
  eyebrow?: string;
}

function MetricStrip({
  metrics = defaultMetrics,
  eyebrow = "Impact at a glance",
}: MetricStripProps) {
  return (
    <section
      id="impact"
      aria-label="Impact metrics"
      className="py-14 md:py-20 bg-muted/30 border-y border-border"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-10 md:mb-12 max-w-2xl">
          <div className="text-eyebrow mb-3">{eyebrow}</div>
          <p className="text-h3 text-foreground/90 leading-snug">
            A few proof points from the last few years of leading teams and
            modernizing how Fullscript runs.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-border rounded-md overflow-hidden border border-border">
          {metrics.map((metric, index) => (
            <FadeIn
              key={metric.label}
              delay={index * 0.04}
              className="bg-background p-6 md:p-7 flex flex-col justify-between"
            >
              <div className="font-display text-3xl md:text-4xl font-semibold text-primary tabular-nums tracking-tight">
                {metric.value}
              </div>
              <div className="mt-3 text-sm md:text-[0.95rem] text-muted-foreground leading-snug">
                {metric.label}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(MetricStrip);
