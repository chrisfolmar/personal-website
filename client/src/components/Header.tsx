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
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "AI Transformation", section: "ai-transformation" },
  { label: "Writing", href: "/writing" },
  { label: "Services", href: "/services" },
  { label: "Now", href: "/now" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

const desktopLinkClasses =
  "text-sm font-medium text-foreground/70 hover:text-primary transition-colors";
const mobileLinkClasses =
  "block px-4 py-2 text-foreground/80 hover:bg-muted rounded-md text-sm font-medium";

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
    <header className="fixed top-0 w-full z-50 bg-background/85 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight"
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <span className="text-foreground">Chris</span>
            <span className="text-foreground/60">Folmar</span>
            <span className="text-primary">.</span>
          </Link>

          <button
            id="menu-toggle"
            className="lg:hidden text-foreground/70 focus:outline-none"
            aria-label="Toggle navigation menu"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-5 w-5" />
          </button>

          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navItems.map((item) => renderNavItem(item, false))}
            <ThemeToggle />
          </nav>
        </div>
      </div>

      <nav
        id="mobile-menu"
        className={cn(
          "lg:hidden bg-background border-t border-border py-3",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-1">
          {navItems.map((item) => renderNavItem(item, true))}
          <div className="px-4 py-3 flex items-center justify-between border-t border-border mt-2">
            <span className="text-sm text-foreground/70">Dark mode</span>
            <ThemeToggle isMobile />
          </div>
        </div>
      </nav>
    </header>
  );
}
