import { motion } from "framer-motion";
import { 
  Code, 
  Database, 
  GitBranch, 
  LayoutGrid, 
  LineChart, 
  Package,
  Server,
  FileCode,
  Monitor,
  Box,
  Cog,
  Cloud,
  Clipboard,
  PenTool,
  Users,
  Briefcase,
  BarChart,
  LucideIcon,
  Settings,
  Globe,
  Terminal,
  Brain,
  Sparkles,
  Bot,
  Workflow,
  Zap,
  CheckCircle,
  Github,
  Gitlab,
  FolderGit,
  FlaskConical,
  Coins,
  CircleDashed,
  Gem,
  Blocks,
  Share2,
  AlertCircle,
  PuzzleIcon,
  CircleIcon,
  Hash,
  Clock,
  BookOpen,
  File,
  Coffee
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
  server: Server,
  fileCode: FileCode,
  monitor: Monitor,
  box: Box,
  cog: Cog,
  cloud: Cloud,
  clipboard: Clipboard,
  penTool: PenTool,
  users: Users,
  briefcase: Briefcase,
  barChart: BarChart,
  settings: Settings,
  globe: Globe,
  terminal: Terminal,
  brain: Brain,
  sparkles: Sparkles,
  bot: Bot,
  workflow: Workflow,
  zap: Zap,
  checkCircle: CheckCircle,
  github: Github,
  gitlab: Gitlab,
  folderGit: FolderGit,
  flaskConical: FlaskConical,
  coins: Coins,
  circleDashed: CircleDashed,
  gem: Gem,
  blocks: Blocks,
  share2: Share2,
  alertCircle: AlertCircle,
  puzzle: PuzzleIcon,
  circle: CircleIcon,
  hash: Hash,
  clock: Clock,
  bookOpen: BookOpen,
  file: File,
  coffee: Coffee
};

export default function SkillCard({ name, icon, delay = 0 }: SkillCardProps) {
  // Get the icon component from our map, or default to Code
  const IconComponent = iconComponents[icon] || Code;
  
  return (
    <motion.div 
      className="bg-white dark:bg-gray-700 rounded-lg p-5 text-center hover:shadow-md transition-all duration-300 section-transition border border-gray-100 dark:border-gray-600 hover:border-primary/30 dark:hover:border-primary/30 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="text-primary mb-3 bg-primary/5 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto group-hover:bg-primary/10 transition-colors duration-300">
        <IconComponent className="h-8 w-8 mx-auto" />
      </div>
      <h4 className="font-medium text-gray-800 dark:text-gray-200 text-sm sm:text-base">{name}</h4>
    </motion.div>
  );
}
