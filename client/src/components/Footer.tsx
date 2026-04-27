import { Link, useLocation } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [location, setLocation] = useLocation();

  const isHomePage = location === "/";

  const navigateToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    if (isHomePage) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setLocation("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between md:items-start gap-8">
          <div className="mb-8 md:mb-0 md:max-w-md">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight inline-block"
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <span className="text-white">Chris</span>Folmar
              <span className="text-primary">.</span>
            </Link>
            <p className="mt-3 text-gray-400">
              Engineering Manager and technologist building high-performing
              teams and impactful solutions. Passionate about leveraging modern
              tools and AI to create better software.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Explore</h3>
              <ul className="space-y-2">
                <li>
                  {isHomePage ? (
                    <a
                      href="#about"
                      onClick={navigateToSection("about")}
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      About
                    </a>
                  ) : (
                    <Link
                      to="/#about"
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      About
                    </Link>
                  )}
                </li>
                <li>
                  {isHomePage ? (
                    <a
                      href="#ai-transformation"
                      onClick={navigateToSection("ai-transformation")}
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      AI Transformation
                    </a>
                  ) : (
                    <Link
                      to="/#ai-transformation"
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      AI Transformation
                    </Link>
                  )}
                </li>
                <li>
                  <Link
                    to="/case-studies"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    Case Studies
                  </Link>
                </li>
                <li>
                  {isHomePage ? (
                    <a
                      href="#blog"
                      onClick={navigateToSection("blog")}
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      Blog
                    </a>
                  ) : (
                    <Link
                      to="/#blog"
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      Blog
                    </Link>
                  )}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">More</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/resume"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    Resume
                  </Link>
                </li>
                <li>
                  <Link
                    to="/now"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    Now
                  </Link>
                </li>
                <li>
                  {isHomePage ? (
                    <a
                      href="#contact"
                      onClick={navigateToSection("contact")}
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      Contact
                    </a>
                  ) : (
                    <Link
                      to="/#contact"
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      Contact
                    </Link>
                  )}
                </li>
                <li>
                  <Link
                    to="/sitemap"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Chris Folmar. All rights reserved.
          </p>
          <div className="text-gray-400 text-sm mt-4 sm:mt-0 flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>Designed and built with passion</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
