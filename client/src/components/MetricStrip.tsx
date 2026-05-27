import { memo } from "react";
import FadeIn from "./FadeIn";
import { isDev, isPlaceholder, devOnlyText } from "@/lib/placeholder";

interface Metric {
  value: string;
  label: string;
  /** When true, this is a "human" metric (e.g. new dad since X). */
  human?: boolean;
}

// One human metric sits next to the work numbers. The value is a
// [CHRIS: ...] placeholder until he picks one — in production the
// human card is dropped from the strip if still unfilled.
const humanMetric: Metric = {
  value: "1",
  label: "New dad. Learning daily.",
  human: true,
};

// Order (task #66): the real AI proof point — Team GSD's operational
// time reduction across 5 departments — leads so the strip backs the
// AI Transformation section directly above it. Systems-modernization
// and throughput metrics follow as broader operator credibility.
const workMetrics: Metric[] = [
  { value: "40%+", label: "AI-driven operational time saved across 5 depts" },
  { value: "43%", label: "NetSuite transaction reduction" },
  { value: "95%", label: "Invoicing ownership migration" },
  { value: "300%+", label: "Project throughput increase" },
  { value: "<1%", label: "MR rollback rate" },
];

const defaultMetrics: Metric[] = (() => {
  const humanFilled = !isPlaceholder(humanMetric.value) && !isPlaceholder(humanMetric.label);
  if (isDev || humanFilled) {
    // Slot the human metric just before the last work metric so it
    // sits inside the strip rather than at either end.
    return [...workMetrics.slice(0, 4), humanMetric, ...workMetrics.slice(4)];
  }
  return workMetrics;
})();

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
            A few proof points from the last few years of scaling teams,
            rebuilding business systems, and shipping AI-enabled workflows.
          </p>
        </FadeIn>

        <div
          className={`grid grid-cols-2 md:grid-cols-3 gap-px bg-border rounded-md overflow-hidden border border-border ${
            metrics.length >= 6 ? "lg:grid-cols-6" : "lg:grid-cols-5"
          }`}
        >
          {metrics.map((metric, index) => (
            <FadeIn
              key={metric.label}
              delay={index * 0.04}
              className={`p-6 md:p-7 flex flex-col justify-between ${
                metric.human ? "bg-muted/60" : "bg-background"
              }`}
            >
              <div
                className={`font-display text-3xl md:text-4xl font-semibold tabular-nums tracking-tight ${
                  metric.human ? "text-foreground" : "text-primary"
                }`}
                style={
                  metric.human
                    ? { color: "hsl(var(--marker))" }
                    : undefined
                }
              >
                {devOnlyText(metric.value)}
              </div>
              <div className="mt-3 text-sm md:text-[0.95rem] text-muted-foreground leading-snug">
                {devOnlyText(metric.label)}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(MetricStrip);
