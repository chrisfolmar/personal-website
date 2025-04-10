import { motion } from "framer-motion";
import { memo } from "react";

interface ProgressBarProps {
  percentage: number;
}

// Memoized version to prevent re-renders
const ProgressBar = memo(({ percentage }: ProgressBarProps) => {
  // Determine color class based on percentage - now memoized with the component
  let colorClass = "bg-gradient-to-r from-primary/70 to-primary/50";
  if (percentage >= 90) colorClass = "bg-gradient-to-r from-primary to-primary/80";
  else if (percentage >= 80) colorClass = "bg-gradient-to-r from-primary/90 to-primary/70";
  else if (percentage >= 70) colorClass = "bg-gradient-to-r from-primary/80 to-primary/60";

  return (
    <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden w-full shadow-inner">
      <motion.div 
        className={`h-full ${colorClass} rounded-full relative`}
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          type: "tween" // Use tween instead of spring to avoid bouncing
        }}
        viewport={{ 
          once: true,
          amount: 0.8 // Only trigger when most of it is visible 
        }}
      >
        <div className="absolute inset-0 bg-white/10 opacity-50 overflow-hidden flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-full w-3 bg-white/10 mx-2 skew-x-[20deg]" />
          ))}
        </div>
      </motion.div>
    </div>
  );
});

// Keep default export
export default ProgressBar;
