import { motion } from "framer-motion";
import { experiences } from "@/lib/data";
import SectionHeading from "@/components/ui/section-heading";
import TimelineItem from "@/components/ui/timeline-item";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About Me"
          description="Here's a brief introduction about me and my professional journey."
        />
        
        <div className="lg:flex lg:items-center lg:justify-between section-transition">
          <motion.div 
            className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Who I Am</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              I'm a passionate software engineer with expertise in modern web technologies, focused on building elegant solutions to complex problems. With a strong foundation in computer science and a keen eye for detail, I strive to create software that not only functions flawlessly but also delivers exceptional user experiences.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              My journey began with a fascination for how software can transform lives and businesses. Since then, I've dedicated myself to continuously learning and mastering new technologies, staying at the forefront of industry innovations.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              When I'm not coding, you'll find me exploring the latest tech trends, contributing to open-source projects, or engaging with the developer community through meetups and conferences.
            </p>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 lg:pl-12"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 section-transition">
              <h3 className="text-2xl font-bold mb-6">Professional Experience</h3>
              
              {experiences.map((experience, index) => (
                <TimelineItem
                  key={index}
                  title={experience.title}
                  company={experience.company}
                  period={experience.period}
                  description={experience.description}
                  isLast={index === experiences.length - 1}
                />
              ))}
              
              <div className="flex justify-center mt-8">
                <a href="#" className="inline-flex items-center text-primary hover:text-primary-dark transition-colors font-medium">
                  <span>View Full Resume</span>
                  <ArrowRight className="h-5 w-5 ml-1" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
