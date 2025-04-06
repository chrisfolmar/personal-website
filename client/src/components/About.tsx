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
              I'm a WordPress developer based in Durham, NH, specializing in creating professional, custom websites for small businesses and healthcare professionals. With over five years of experience, I've developed a unique approach that prioritizes client autonomy while providing exceptional value with my "minimum cost, maximum support" model.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              My portfolio includes therapy practice websites, restaurant sites with online ordering systems, and various small business platforms. I take pride in building websites that not only look professional but function intuitively for both site owners and their visitors. My clients appreciate how easy their sites are to maintain while still having my support when needed.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Recently married in June 2024, I'm settling into our new home in New Hampshire's beautiful seacoast region. I'm passionate about creating digital experiences that reflect the unique personality of each business I work with, just as I've done for Jennifer Mello LICSW, Locos Cocos Tacos, and Amy Cousineau LICSW.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              When I'm not coding, you'll find me cheering for Arsenal FC, hiking with my two dogs in the White Mountains, exploring New England's coastal towns, or keeping up with the latest WordPress developments. I believe in maintaining a healthy work-life balance, which helps me bring fresh creativity to each project.
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
                src="/assets/profile/KP_20240608_0229_3672 (1).jpg" 
                alt="Chris Folmar with his wife at their wedding" 
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
