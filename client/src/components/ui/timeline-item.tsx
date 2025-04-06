import { motion } from "framer-motion";

interface TimelineItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
  isLast?: boolean;
}

export default function TimelineItem({ 
  title, 
  company, 
  period, 
  description,
  isLast = false
}: TimelineItemProps) {
  return (
    <motion.div 
      className={`border-l-4 border-primary pl-6 relative section-transition ${isLast ? '' : 'mb-8'}`}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="absolute -left-2.5 top-1 w-5 h-5 rounded-full bg-primary"></div>
      <h4 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h4>
      <p className="text-primary mb-1">{company}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{period}</p>
      <p className="text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </motion.div>
  );
}
