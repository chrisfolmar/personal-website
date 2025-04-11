import { memo, useMemo } from "react";
import { skills, tools } from "@/lib/data";
import SectionHeading from "@/components/ui/section-heading";
import ProgressBar from "@/components/ProgressBar";
import SkillCard from "@/components/ui/skill-card";
import { useIsMobile } from "@/hooks/use-mobile";

// CSS-only animated skill item
const SkillItem = memo(({ skill, index }: { skill: typeof skills[0], index: number }) => {
  // Calculate animation delay based on index
  const animationDelay = `${index * 0.05}s`;
  
  return (
    <div 
      key={index} 
      className="mb-4 animated-fade-in"
      style={{ animationDelay }}
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-gray-800 dark:text-gray-200 text-base">{skill.name}</h4>
        <span className="text-gray-600 dark:text-gray-400 min-w-[50px] text-right font-semibold">{skill.years} years</span>
      </div>
      <ProgressBar percentage={skill.percentage} />
      {skill.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed break-words">
          {skill.description}
        </p>
      )}
    </div>
  );
});

// Memoized tool grid with CSS animations
const ToolsGrid = memo(() => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {tools.map((tool, index) => (
        <SkillCard
          key={index}
          name={tool.name}
          icon={tool.icon}
          delay={index}
        />
      ))}
    </div>
  );
});

// Non-animated version of a tool card for mobile
const StaticToolCard = memo(({ name, icon }: { name: string, icon: string }) => {
  const IconComponent = useMemo(() => {
    // Get all the icons from the SkillCard component
    const iconComponents: Record<string, any> = {
      code: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
      database: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
      ),
      // Default icon
      default: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      )
    };
    
    return iconComponents[icon] || iconComponents.default;
  }, [icon]);
  
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg p-5 text-center hover:shadow-md border border-gray-100 dark:border-gray-600 group">
      <div className="text-primary mb-3 bg-primary/5 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
        <IconComponent className="h-8 w-8 mx-auto" />
      </div>
      <h4 className="font-medium text-gray-800 dark:text-gray-200 text-sm sm:text-base">{name}</h4>
    </div>
  );
});

// Static tools grid for mobile (no animations)
const StaticToolsGrid = memo(() => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {tools.map((tool, index) => (
        <StaticToolCard
          key={index}
          name={tool.name}
          icon={tool.icon}
        />
      ))}
    </div>
  );
});

// Main Skills component with CSS animations
const Skills = () => {
  const isMobile = useIsMobile();
  
  // Memoize the skills list to prevent unnecessary re-renders
  const skillsList = useMemo(() => {
    return skills.map((skill, index) => (
      <SkillItem key={index} skill={skill} index={index} />
    ));
  }, []);

  return (
    <section id="skills" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="My Skills & Tools"
          description="As an Engineering Manager, I leverage both technical expertise and leadership capabilities to deliver successful projects and build high-performing teams."
        />
        
        <div className="grid md:grid-cols-2 gap-8 section-transition">
          {/* Leadership & Technical Skills Section */}
          <div
            className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm"
          >
            <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-100">
              <div className="flex items-center flex-wrap">
                <span className="bg-primary/10 p-2 rounded-full mr-3 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" />
                  </svg>
                </span>
                <span className="mr-2">Leadership & Technical Skills</span>
                <span className="text-sm italic font-normal text-gray-500 dark:text-gray-400">(Years of Experience)</span>
              </div>
            </h3>
            
            <div className="space-y-3">
              {skillsList}
            </div>
          </div>
          
          {/* Technologies & Tools Section */}
          <div
            className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm"
          >
            <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-100">
              <div className="flex items-center flex-wrap">
                <span className="bg-primary/10 p-2 rounded-full mr-3 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 8h14" /><path d="M5 12h14" /><path d="M5 16h14" />
                    <path d="M3 21h18" /><path d="M3 3h18" />
                  </svg>
                </span>
                <span>Technologies & Tools</span>
              </div>
            </h3>
            
            {/* Use different components for mobile and desktop */}
            {isMobile ? (
              <StaticToolsGrid />
            ) : (
              <ToolsGrid />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Export as memoized component to prevent re-renders
export default memo(Skills);
