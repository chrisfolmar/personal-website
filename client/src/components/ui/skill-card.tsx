import { motion } from "framer-motion";
import { 
  Code, 
  Database, 
  GitBranch, 
  LayoutGrid, 
  LineChart, 
  Package,
  LucideIcon
} from "lucide-react";

interface SkillCardProps {
  name: string;
  icon: string;
  delay?: number;
}

// Map icon names to actual components
const iconComponents: Record<string, LucideIcon> = {
  code: Code,
  database: Database,
  gitBranch: GitBranch,
  layoutGrid: LayoutGrid,
  lineChart: LineChart,
  package: Package,
};

export default function SkillCard({ name, icon, delay = 0 }: SkillCardProps) {
  // Get the icon component from our map, or default to Code
  const IconComponent = iconComponents[icon] || Code;
  
  return (
    <motion.div 
      className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center hover:shadow-md transition-shadow section-transition"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="text-primary mb-3">
        <IconComponent className="h-10 w-10 mx-auto" />
      </div>
      <h4 className="font-medium text-gray-800 dark:text-gray-200">{name}</h4>
    </motion.div>
  );
}
