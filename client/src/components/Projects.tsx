import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import SectionHeading from "@/components/ui/section-heading";
import ProjectCard from "@/components/ui/project-card";
import { ArrowRight } from "lucide-react";

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Featured Projects"
          description="Here are some of my recent projects that showcase my skills and expertise."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 section-transition">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              project={project}
              delay={index * 0.1}
            />
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <a 
            href="#" 
            className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <span>View All Projects</span>
            <ArrowRight className="h-5 w-5 ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
