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
              Hi, I'm Chris Folmar. I'm a Software Engineering Manager with a passion for technology, leadership, and building teams that thrive. Over the years, I've had the privilege of working with amazing teams to drive technical innovations and deliver high-quality, scalable software solutions. My current role at Fullscript allows me to lead high-performing teams, work on challenging projects, and empower others to grow in their careers.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              I believe in continuous improvement, whether it's refining systems, optimizing processes, or expanding my own skill set. I'm a firm believer in leading by example, creating environments where people feel supported, challenged, and empowered to make an impact. Whether leading the design of a new system or coaching a team through a technical challenge, I'm always focused on building solutions that matter.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Beyond my professional life, I'm an avid Arsenal fan, and I love spending time outdoors. Whether I'm hiking with my two amazing dogs, Penny and Belle, or enjoying a quiet weekend with my wife, Lauren, I find balance in nature and in the company of those I care about. Family and friends are everything to me, and I'm committed to nurturing the connections that make life richer.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              As I continue to grow in my career, I aim to stay grounded, adaptable, and driven by a genuine passion for building high-performing teams and solving real-world problems through technology. If you'd like to connect or learn more about how I can help solve your organization's challenges, let's talk!
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
