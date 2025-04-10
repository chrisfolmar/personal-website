import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  description: string;
}

export default function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <motion.div 
      className="text-center mb-16 section-transition"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        ease: "easeOut" 
      }}
      viewport={{ 
        once: true, 
        amount: 0.4 // Trigger when a significant part is visible
      }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      <div className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        {description}
      </p>
    </motion.div>
  );
}
