import { motion } from "framer-motion";
import { ArrowRight, Code } from "lucide-react";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

export default function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  return (
    <motion.div 
      className="project-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl section-transition"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="relative overflow-hidden h-52">
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">Project Image</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-4 text-white">
            {project.tags.map((tag, index) => (
              <span 
                key={index} 
                className={cn(
                  "text-xs font-semibold px-2 py-1 rounded-full",
                  index === 0 
                    ? "bg-primary text-white" 
                    : "bg-gray-800 text-white ml-2"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {project.description}
        </p>
        <div className="flex justify-between items-center">
          <a href={project.demoLink} className="text-primary hover:text-primary-dark transition-colors font-medium flex items-center">
            <span>View Details</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </a>
          <a href={project.codeLink} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors" aria-label="View source code">
            <Code className="h-5 w-5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
