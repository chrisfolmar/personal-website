import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar = memo(({ percentage }: ProgressBarProps) => {
  const reduce = useReducedMotion();
  const clamped = Math.max(0, Math.min(100, percentage));

  return (
    <div className="h-1.5 bg-muted rounded-full overflow-hidden w-full">
      <motion.div
        className="h-full bg-primary rounded-full"
        initial={reduce ? false : { width: 0 }}
        whileInView={
          reduce ? undefined : { width: `${clamped}%` }
        }
        animate={reduce ? { width: `${clamped}%` } : undefined}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.6 }}
      />
    </div>
  );
});

ProgressBar.displayName = "ProgressBar";
export default ProgressBar;
