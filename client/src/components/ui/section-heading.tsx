import { motion, useInView } from "framer-motion";
import { memo, useRef, useEffect, useState } from "react";

interface SectionHeadingProps {
  title: string;
  description: string;
}

// Using function declaration for better debugging
function SectionHeading({ title, description }: SectionHeadingProps) {
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
      className="text-center mb-16 section-transition"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView || hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.3, 
        ease: "easeOut",
        type: "tween"
      }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      <div className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        {description}
      </p>
    </motion.div>
  );
}

// Export memoized component to prevent re-renders
export default memo(SectionHeading);
