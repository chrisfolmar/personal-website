import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import SectionHeading from "@/components/ui/section-heading";
import ProjectCard from "@/components/ui/project-card";
import { ArrowRight, Star } from "lucide-react";
import { useLocation } from "wouter";

// Sort projects by date (most recent first)
const sortedProjects = [...projects].sort((a, b) => 
  new Date(b.date).getTime() - new Date(a.date).getTime()
);

// Featured projects are the first 5 (most recent)
const featuredProjects = sortedProjects.slice(0, 5);

// Function to create URL-friendly project slugs
const getProjectSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
};

export default function Projects() {
  const [, setLocation] = useLocation();
  
  const handleViewAllClick = () => {
    // For now, we're just linking to the first project as a showcase
    const slug = getProjectSlug(featuredProjects[0].title);
    setLocation(`/project/${slug}`);
  };
  
  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 max-w-3xl mx-auto text-center"
        >
          <div className="inline-block mb-4 bg-primary/10 p-2 rounded-full">
            <Star className="h-6 w-6 text-primary" />
          </div>
          <SectionHeading
            title="Featured Projects"
            description="From enterprise healthcare platforms to small business websites, here's a selection of my most impactful work."
          />
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 section-transition">
          {featuredProjects.map((project, index) => (
            <ProjectCard 
              key={index}
              project={project}
              delay={index * 0.1}
            />
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <button 
            onClick={handleViewAllClick}
            className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform hover:-translate-y-1 active:translate-y-0 duration-200"
          >
            <span className="text-base">View Project Details</span>
            <ArrowRight className="h-5 w-5 ml-2" />
          </button>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            Click on any project card to explore detailed case studies, technical implementations, and design decisions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
