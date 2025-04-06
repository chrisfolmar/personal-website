import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  isMobile?: boolean;
}

export default function ThemeToggle({ isMobile = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const id = isMobile ? "mobile-theme-toggle" : "theme-toggle";
  
  return (
    <button
      id={id}
      onClick={toggleTheme}
      className="bg-gray-200 dark:bg-gray-700 rounded-full w-12 h-6 flex items-center p-1 focus:outline-none"
      aria-label="Toggle dark mode"
    >
      <span 
        className={cn(
          "toggle-circle bg-white rounded-full w-4 h-4 shadow-md transition-transform duration-300",
          theme === "dark" && "transform translate-x-6"
        )}
      />
    </button>
  );
}
