import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/hooks/use-theme";
import ThemeToggle from "./ThemeToggle";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const isHomePage = location === "/";
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  // Function to create navigation links that work correctly on all pages
  const getNavLink = (section: string, label: string) => {
    // Special case for Home to scroll to top
    if (section === "home") {
      if (isHomePage) {
        return (
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="nav-link text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
          >
            {label}
          </a>
        );
      } else {
        return (
          <Link 
            href="/" 
            className="nav-link text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
          >
            {label}
          </Link>
        );
      }
    }

    // Other navigation links
    // If we're on the homepage, use hash links
    if (isHomePage) {
      return (
        <a 
          href={`#${section}`} 
          className="nav-link text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
        >
          {label}
        </a>
      );
    }
    
    // If we're on another page, link back to homepage with hash
    return (
      <Link 
        href={`/#${section}`} 
        className="nav-link text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
      >
        {label}
      </Link>
    );
  };
  
  // Function for mobile navigation links
  const getMobileNavLink = (section: string, label: string) => {
    // Special case for Home to scroll to top
    if (section === "home") {
      if (isHomePage) {
        return (
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              closeMobileMenu();
            }}
            className="nav-link block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
          >
            {label}
          </a>
        );
      } else {
        return (
          <Link 
            href="/" 
            onClick={closeMobileMenu}
            className="nav-link block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
          >
            {label}
          </Link>
        );
      }
    }

    // Other navigation links
    if (isHomePage) {
      return (
        <a 
          href={`#${section}`} 
          onClick={closeMobileMenu} 
          className="nav-link block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
        >
          {label}
        </a>
      );
    }
    
    return (
      <Link 
        href={`/#${section}`} 
        onClick={closeMobileMenu} 
        className="nav-link block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
      >
        {label}
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
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <span className="text-gray-900 dark:text-white">Chris</span>Folmar<span className="text-primary dark:text-primary">.</span>
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
          <nav className="hidden lg:flex items-center space-x-8">
            {getNavLink("home", "Home")}
            {getNavLink("about", "About")}
            {getNavLink("skills", "Skills")}
            {getNavLink("projects", "Projects")}
            {getNavLink("testimonials", "Testimonials")}
            {getNavLink("blog", "Blog")}
            {getNavLink("contact", "Contact")}
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
          {getMobileNavLink("home", "Home")}
          {getMobileNavLink("about", "About")}
          {getMobileNavLink("skills", "Skills")}
          {getMobileNavLink("projects", "Projects")}
          {getMobileNavLink("testimonials", "Testimonials")}
          {getMobileNavLink("blog", "Blog")}
          {getMobileNavLink("contact", "Contact")}
          <div className="px-4 py-2 flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
            <ThemeToggle isMobile />
          </div>
        </div>
      </nav>
    </header>
  );
}
