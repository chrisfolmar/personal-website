import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between md:items-center">
          <div className="mb-8 md:mb-0">
            <a href="#home" className="text-2xl font-bold tracking-tight">
              <span className="text-white">Chris</span>Folmar<span className="text-primary">.</span>
            </a>
            <p className="mt-3 text-gray-400 max-w-md">
              Creating professional websites that clients can easily maintain themselves. Committed to a "minimum cost, maximum support" model for small businesses and individuals.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-primary transition-colors">About</a></li>
              <li><a href="#skills" className="text-gray-400 hover:text-primary transition-colors">Skills</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Chris Folmar. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-4 sm:mt-0">
            Designed and built with passion
          </p>
        </div>
      </div>
    </footer>
  );
}
