import { memo } from "react";
import { useIntersectionAnimation } from "@/hooks/use-intersection-animation";

interface TimelineItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
  isLast?: boolean;
  index?: number;
}

function TimelineItem({ 
  title, 
  company, 
  period, 
  description,
  isLast = false,
  index = 0
}: TimelineItemProps) {
  const { ref: itemRef } = useIntersectionAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    animationClass: 'animate-in',
    once: true,
    disabled: false // handled globally via CSS now
  });
  
  // Calculate delay based on index
  const animationDelay = `${0.1 + (index * 0.1)}s`;
  
  return (
    <div 
      ref={itemRef as React.RefObject<HTMLDivElement>}
      className={`border-l-4 border-primary pl-6 relative slide-in ${isLast ? '' : 'mb-8'}`}
      style={{ '--animation-delay': animationDelay } as React.CSSProperties}
    >
      <div className="absolute -left-2.5 top-1 w-5 h-5 rounded-full bg-primary"></div>
      <h4 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h4>
      <p className="text-primary mb-1">{company}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{period}</p>
      <p className="text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}

// Export memoized component to prevent re-renders
export default memo(TimelineItem);