import { motion } from "framer-motion";

interface ProgressBarProps {
  percentage: number;
}

export default function ProgressBar({ percentage }: ProgressBarProps) {
  // Determine color class based on percentage
  const getColorClass = () => {
    if (percentage >= 90) return "bg-gradient-to-r from-primary to-primary/80";
    if (percentage >= 80) return "bg-gradient-to-r from-primary/90 to-primary/70";
    if (percentage >= 70) return "bg-gradient-to-r from-primary/80 to-primary/60";
    return "bg-gradient-to-r from-primary/70 to-primary/50";
  };

  return (
    <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden w-full shadow-inner">
      <motion.div 
        className={`h-full ${getColorClass()} rounded-full relative`}
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-white/10 opacity-50 overflow-hidden flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-full w-3 bg-white/10 mx-2 skew-x-[20deg]" />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
