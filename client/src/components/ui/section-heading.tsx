import { memo } from "react";

interface SectionHeadingProps {
  title: string;
  description: string;
}

// Pure CSS animations approach with No JavaScript for more stable rendering
function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="text-center mb-16 animated-fade-in">
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
