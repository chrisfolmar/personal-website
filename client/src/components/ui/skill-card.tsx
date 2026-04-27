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
  const { ref: cardRef } = useIntersectionAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    animationClass: 'animate-in',
    once: true,
    disabled: false // handled globally via CSS now
  });
  
  // Calculate delay based on index
  const animationDelay = `${0.05 + (delay * 0.05)}s`;
  
  return (
    <div
      ref={cardRef as React.RefObject<HTMLDivElement>}
      className="flex items-center gap-3 bg-card rounded-md p-3 border border-border hover:border-primary/40 transition-colors group tool-item"
      style={{ '--animation-delay': animationDelay } as React.CSSProperties}
    >
      <span className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-primary/10 text-primary">
        <IconComponent className="h-4 w-4" />
      </span>
      <span className="font-medium text-sm text-foreground truncate">{name}</span>
    </div>
  );
}

// Export memoized component to prevent re-renders
const SkillCard = memo(SkillCardComponent);
export default SkillCard;
