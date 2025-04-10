import { Link, useLocation } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [location] = useLocation();
  
  // Check if we're on the home page
  const isHomePage = location === "/";

  // Function to handle navigation that works on all pages
  const navigateToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isHomePage) {
      // If on home page, scroll to the section
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If on another page, navigate to homepage + section
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between md:items-center">
          <div className="mb-8 md:mb-0">
            <Link 
              to="/"  
              className="text-2xl font-bold tracking-tight inline-block"
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <span className="text-white">Chris</span>Folmar<span className="text-primary">.</span>
            </Link>
            <p className="mt-3 text-gray-400 max-w-md">
              Creating professional websites that clients can easily maintain themselves. Committed to a "minimum cost, maximum support" model for small businesses and individuals.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                {isHomePage ? (
                  <a href="#home" onClick={navigateToSection("home")} className="text-gray-400 hover:text-primary transition-colors">Home</a>
                ) : (
                  <Link to="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link>
                )}
              </li>
              <li>
                {isHomePage ? (
                  <a href="#about" onClick={navigateToSection("about")} className="text-gray-400 hover:text-primary transition-colors">About</a>
                ) : (
                  <Link to="/#about" className="text-gray-400 hover:text-primary transition-colors">About</Link>
                )}
              </li>
              <li>
                {isHomePage ? (
                  <a href="#skills" onClick={navigateToSection("skills")} className="text-gray-400 hover:text-primary transition-colors">Skills</a>
                ) : (
                  <Link to="/#skills" className="text-gray-400 hover:text-primary transition-colors">Skills</Link>
                )}
              </li>
              <li>
                {isHomePage ? (
                  <a href="#projects" onClick={navigateToSection("projects")} className="text-gray-400 hover:text-primary transition-colors">Projects</a>
                ) : (
                  <Link to="/#projects" className="text-gray-400 hover:text-primary transition-colors">Projects</Link>
                )}
              </li>
              <li>
                {isHomePage ? (
                  <a href="#contact" onClick={navigateToSection("contact")} className="text-gray-400 hover:text-primary transition-colors">Contact</a>
                ) : (
                  <Link to="/#contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link>
                )}
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Chris Folmar. All rights reserved.
          </p>
          <div className="text-gray-400 text-sm mt-4 sm:mt-0 flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>Designed and built with passion</p>
            <span className="hidden sm:inline">•</span>
            <a href="/sitemap" className="hover:text-primary transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
