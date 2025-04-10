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
            description="Over the years, I've had the privilege of working with several amazing clients to create custom WordPress websites that meet their unique needs."
          />
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Below are a few selected projects that demonstrate my approach to web development, focusing on high-quality design, user experience, and long-term usability.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 section-transition"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut"
          }}
          viewport={{ 
            once: true,
            amount: 0.1
          }}
        >
          {featuredProjects.map((project, index) => (
            <ProjectCard 
              key={index}
              project={project}
            />
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
              These projects reflect my ability to create meaningful, high-quality web experiences that not only look great but are easy to manage for my clients. Whether you're looking for a simple, functional site or something more dynamic, I focus on delivering tailored solutions that meet each client's needs.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
              If you're interested in working together or would like to discuss a project, please feel free to reach out!
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center px-6 py-3 mt-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform hover:-translate-y-1 active:translate-y-0 duration-200"
            >
              <span className="text-base">Get in Touch</span>
              <ArrowRight className="h-5 w-5 ml-2" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
