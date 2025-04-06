import { useState } from "react";
import { Link } from "wouter";
import { useTheme } from "@/hooks/use-theme";
import ThemeToggle from "./ThemeToggle";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 z-50 backdrop-blur-sm shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <a href="#home" className="text-xl font-bold tracking-tight text-primary hover:text-primary-dark transition-colors">
            <span className="text-gray-900 dark:text-white">Your</span>Name<span className="text-primary dark:text-primary">.</span>
          </a>
          
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
            <a href="#home" className="nav-link text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Home</a>
            <a href="#about" className="nav-link text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">About</a>
            <a href="#skills" className="nav-link text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Skills</a>
            <a href="#projects" className="nav-link text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Projects</a>
            <a href="#testimonials" className="nav-link text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Testimonials</a>
            <a href="#blog" className="nav-link text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Blog</a>
            <a href="#contact" className="nav-link text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Contact</a>
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
          <a href="#home" onClick={closeMobileMenu} className="nav-link block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">Home</a>
          <a href="#about" onClick={closeMobileMenu} className="nav-link block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">About</a>
          <a href="#skills" onClick={closeMobileMenu} className="nav-link block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">Skills</a>
          <a href="#projects" onClick={closeMobileMenu} className="nav-link block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">Projects</a>
          <a href="#testimonials" onClick={closeMobileMenu} className="nav-link block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">Testimonials</a>
          <a href="#blog" onClick={closeMobileMenu} className="nav-link block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">Blog</a>
          <a href="#contact" onClick={closeMobileMenu} className="nav-link block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">Contact</a>
          <div className="px-4 py-2 flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
            <ThemeToggle isMobile />
          </div>
        </div>
      </nav>
    </header>
  );
}
