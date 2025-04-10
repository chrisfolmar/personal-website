import { motion, useInView } from "framer-motion";
import { memo, useRef, useEffect, useState } from "react";

interface TimelineItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
  isLast?: boolean;
}

function TimelineItem({ 
  title, 
  company, 
  period, 
  description,
  isLast = false
}: TimelineItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);
  
  return (
    <motion.div 
      ref={ref}
      className={`border-l-4 border-primary pl-6 relative section-transition ${isLast ? '' : 'mb-8'}`}
      initial={{ opacity: 0, x: 20 }}
      animate={isInView || hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
      transition={{ 
        duration: 0.3,
        ease: "easeOut",
        type: "tween"
      }}
    >
      <div className="absolute -left-2.5 top-1 w-5 h-5 rounded-full bg-primary"></div>
      <h4 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h4>
      <p className="text-primary mb-1">{company}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{period}</p>
      <p className="text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </motion.div>
  );
}

// Export memoized component to prevent re-renders
export default memo(TimelineItem);
