import { motion } from "framer-motion";
import { ArrowRight, Code, Calendar, ExternalLink } from "lucide-react";
import { useLocation } from "wouter";
import { Project } from "@/types";
import { cn, formatDate } from "@/lib/utils";
import { memo, useMemo } from "react";

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

// Using useMemo internally and memo on the component to prevent re-rendering
function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  const [, setLocation] = useLocation();
  
  // Function to create URL-friendly project slugs
  const getProjectSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
  };
  
  const handleViewDetails = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Prevent double navigation
    const slug = getProjectSlug(project.title);
    setLocation(`/project/${slug}`);
  };
  
  const truncateDescription = (description: string, maxLength = 120) => {
    if (description.length <= maxLength) return description;
    return `${description.slice(0, maxLength)}...`;
  };
  
  return (
    <motion.div 
      className="project-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        ease: "easeOut",
        delay: delay * 0.1  // Reduced delay multiplier
      }}
      viewport={{ 
        once: true,
        amount: 0.2  // Only trigger when 20% is visible
      }}
      onClick={handleViewDetails}
    >
      <div className="relative overflow-hidden h-56">
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
            onError={(e) => {
              // Try reloading with cache bust if image fails to load
              e.currentTarget.src = `${project.image}?v=${new Date().getTime()}`;
            }}
          />
        </div>
        
        {/* Tag overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent flex items-end">
          <div className="p-4 text-white flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className={cn(
                  "text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm",
                  index === 0 
                    ? "bg-primary/90 text-white" 
                    : "bg-gray-800/80 text-white"
                )}
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-700/80 text-white backdrop-blur-sm">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Calendar className="h-4 w-4 mr-1.5" />
          <span>{formatDate(project.date)}</span>
        </div>
        
        <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight" 
          onClick={handleViewDetails}
        >
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 line-clamp-3">
          {truncateDescription(project.description)}
        </p>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
          <button 
            onClick={handleViewDetails}
            className="text-primary hover:text-primary-dark transition-colors font-medium flex items-center cursor-pointer bg-transparent border-none p-0 text-sm"
          >
            <span>Details</span>
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </button>
          
          <div className="flex space-x-2">
            <a 
              href={project.demoLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" 
              aria-label="Visit live site"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            
            {project.codeLink && project.codeLink !== "https://github.com/chrisfolmar" && (
              <a 
                href={project.codeLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" 
                aria-label="View source code"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Code className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Export as memoized component to prevent re-renders
export default memo(ProjectCard);
