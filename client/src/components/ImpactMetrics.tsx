import { memo } from "react";
import { motion } from "framer-motion";

interface Metric {
  value: string;
  label: string;
}

const metrics: Metric[] = [
  { value: "300%+", label: "Project throughput increase" },
  { value: "<1%", label: "MR rollback rate" },
  { value: "43%", label: "NetSuite transaction reduction" },
  { value: "95%", label: "Invoicing ownership migration" },
  { value: "90%", label: "Reduction in reporting overhead" },
];

const MetricCard = memo(({ metric, index }: { metric: Metric; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 text-center hover:shadow-md transition-shadow"
    >
      <div className="text-3xl md:text-4xl font-bold text-primary mb-2 tabular-nums">
        {metric.value}
      </div>
      <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-snug">
        {metric.label}
      </div>
    </motion.div>
  );
});

MetricCard.displayName = "MetricCard";

function ImpactMetrics() {
  return (
    <section
      id="impact"
      aria-label="Impact metrics"
      className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-primary">
            Impact at a Glance
          </h2>
          <p className="mt-2 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A few proof points from the last few years of leading teams and modernizing how Fullscript runs.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(ImpactMetrics);
