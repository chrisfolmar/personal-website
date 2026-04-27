import { useState } from "react";
import { Link, useLocation } from "wouter";
import ThemeToggle from "./ThemeToggle";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  /** Section id on the homepage. */
  section?: string;
  /** Standalone route. Mutually exclusive with `section`. */
  href?: string;
}

const navItems: NavItem[] = [
  { label: "About", section: "about" },
  { label: "Skills", section: "skills" },
  { label: "AI Transformation", section: "ai-transformation" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", section: "blog" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", section: "contact" },
];

const desktopLinkClasses =
  "nav-link text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors";
const mobileLinkClasses =
  "nav-link block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const isHomePage = location === "/";

  const toggleMobileMenu = () => setMobileMenuOpen((v) => !v);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const renderNavItem = (item: NavItem, isMobile: boolean) => {
    const className = isMobile ? mobileLinkClasses : desktopLinkClasses;
    const onClick = isMobile ? closeMobileMenu : undefined;

    if (item.href) {
      return (
        <Link
          key={item.label}
          href={item.href}
          onClick={onClick}
          className={className}
        >
          {item.label}
        </Link>
      );
    }

    if (!item.section) return null;

    if (isHomePage) {
      return (
        <a
          key={item.label}
          href={`#${item.section}`}
          onClick={onClick}
          className={className}
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link
        key={item.label}
        href={`/#${item.section}`}
        onClick={onClick}
        className={className}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 w-full bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 z-50 backdrop-blur-sm shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-primary hover:text-primary-dark transition-colors"
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <span className="text-gray-900 dark:text-white">Chris</span>Folmar
            <span className="text-primary dark:text-primary">.</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            id="menu-toggle"
            className="lg:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
            aria-label="Toggle navigation menu"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => renderNavItem(item, false))}
            <ThemeToggle />
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <nav
        id="mobile-menu"
        className={cn(
          "lg:hidden bg-white dark:bg-gray-900 shadow-lg py-4 transition-all duration-300 animate-fade-in",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          {navItems.map((item) => renderNavItem(item, true))}
          <div className="px-4 py-2 flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
            <ThemeToggle isMobile />
          </div>
        </div>
      </nav>
    </header>
  );
}
