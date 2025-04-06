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
              I'm a WordPress developer based in Durham, NH, specializing in creating professional, custom websites for small businesses and individuals. With years of experience in web development, I focus on building sites that not only look great but are also easy for clients to manage themselves.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              I believe in a "minimum cost, maximum support" model, ensuring that my clients receive exceptional value and ongoing assistance. Recently married in June 2024, I'm an Arsenal fan and proud dog dad to two wonderful pups.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              When I'm not designing websites, you'll find me cheering for Arsenal, spending time with my dogs, exploring New Hampshire's beautiful outdoors, or staying updated on the latest WordPress developments and web design trends.
            </p>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 lg:pl-12"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mb-8 overflow-hidden rounded-xl shadow-md">
              <img 
                src="/assets/images/about.jpg" 
                alt="Chris Folmar with his wife" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
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
