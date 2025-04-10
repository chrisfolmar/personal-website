import { memo } from "react";
import { useIntersectionAnimation } from "@/hooks/use-intersection-animation";

interface SectionHeadingProps {
  title: string;
  description: string;
}

// Intersection Observer based animation
function SectionHeading({ title, description }: SectionHeadingProps) {
  const headingRef = useIntersectionAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    animationClass: 'animate-in',
    once: true
  });
  
  return (
    <div 
      ref={headingRef as React.RefObject<HTMLDivElement>}
      className="text-center mb-16 section-header"
      style={{ '--animation-delay': '0s' } as React.CSSProperties}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      <div className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        {description}
      </p>
    </div>
  );
}

// Export memoized component to prevent re-renders
export default memo(SectionHeading);
