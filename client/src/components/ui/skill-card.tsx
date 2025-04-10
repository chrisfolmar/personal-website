import { memo, useMemo } from "react";
import { useIntersectionAnimation } from "@/hooks/use-intersection-animation";
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

function SkillCardComponent({ name, icon, delay = 0 }: SkillCardProps) {
  // Get the icon component from our map, or default to Code
  const IconComponent = useMemo(() => iconComponents[icon] || Code, [icon]);
  
  // Use intersection observer animation
  const cardRef = useIntersectionAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    animationClass: 'animate-in',
    once: true
  });
  
  // Calculate delay based on index
  const animationDelay = `${0.05 + (delay * 0.05)}s`;
  
  return (
    <div 
      ref={cardRef as React.RefObject<HTMLDivElement>}
      className="bg-white dark:bg-gray-700 rounded-lg p-5 text-center hover:shadow-md transition-all duration-300
                border border-gray-100 dark:border-gray-600 hover:border-primary/30 dark:hover:border-primary/30 group
                tool-item hover:-translate-y-1" 
      style={{ '--animation-delay': animationDelay } as React.CSSProperties}
    >
      <div className="text-primary mb-3 bg-primary/5 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto group-hover:bg-primary/10 transition-colors duration-300">
        <IconComponent className="h-8 w-8 mx-auto" />
      </div>
      <h4 className="font-medium text-gray-800 dark:text-gray-200 text-sm sm:text-base">{name}</h4>
    </div>
  );
}

// Export memoized component to prevent re-renders
const SkillCard = memo(SkillCardComponent);
export default SkillCard;
