import { motion } from "framer-motion";
import { skills, tools } from "@/lib/data";
import SectionHeading from "@/components/ui/section-heading";
import ProgressBar from "@/components/ProgressBar";
import SkillCard from "@/components/ui/skill-card";

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="My Skills"
          description="Here's an overview of my technical expertise and capabilities."
        />
        
        <div className="grid md:grid-cols-2 gap-12 section-transition">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8">Technical Skills</h3>
            
            {skills.map((skill, index) => (
              <motion.div 
                key={index} 
                className="mb-6"
                initial={{ opacity: 0, width: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-800 dark:text-gray-200 flex-1 mr-4">{skill.name}</span>
                  <span className="text-gray-600 dark:text-gray-400 min-w-[50px] text-right">{skill.percentage}%</span>
                </div>
                <ProgressBar percentage={skill.percentage} />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8">Tools & Frameworks</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <SkillCard
                  key={index}
                  name={tool.name}
                  icon={tool.icon}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
