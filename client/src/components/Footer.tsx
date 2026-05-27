// Footer paragraph is intentionally NOT a copy of the Hero — per the
// copy-redundancy pass, the role-at-Fullscript line and the
// modernize-the-work headline live in the Hero only.
import { Link, useLocation } from "wouter";

interface FooterLink {
  label: string;
  /** Anchor on the homepage */
  section?: string;
  /** Route */
  href?: string;
  /** External URL */
  external?: string;
}

const exploreLinks: FooterLink[] = [
  { label: "About", href: "/about" },
  { label: "AI Transformation", section: "ai-transformation" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Writing", href: "/writing" },
];

const moreLinks: FooterLink[] = [
  { label: "Services", href: "/services" },
  { label: "Resume", href: "/resume" },
  { label: "Now", href: "/now" },
  { label: "Contact", href: "/contact" },
  { label: "Sitemap", href: "/sitemap" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [location, setLocation] = useLocation();
  const isHomePage = location === "/";

  const navigateToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHomePage) {
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      setLocation("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const renderLink = (link: FooterLink) => {
    const className =
      "text-sm text-muted-foreground hover:text-primary transition-colors";

    if (link.section) {
      return isHomePage ? (
        <a
          key={link.label}
          href={`#${link.section}`}
          onClick={navigateToSection(link.section)}
          className={className}
        >
          {link.label}
        </a>
      ) : (
        <Link key={link.label} href={`/#${link.section}`} className={className}>
          {link.label}
        </Link>
      );
    }
    if (link.external) {
      return (
        <a
          key={link.label}
          href={link.external}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {link.label}
        </a>
      );
    }
    return (
      <Link key={link.label} href={link.href ?? "/"} className={className}>
        {link.label}
      </Link>
    );
  };

  return (
    <footer className="bg-background border-t border-border py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="font-display text-lg font-semibold tracking-tight inline-block"
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
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Engineering manager at Fullscript. I lead three teams,
              modernize the systems behind the business, and write
              about it in the quiet hours.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-8">
            <div>
              <div className="text-eyebrow mb-4">Explore</div>
              <ul className="space-y-2.5">
                {exploreLinks.map((l) => (
                  <li key={l.label}>{renderLink(l)}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-eyebrow mb-4">More</div>
              <ul className="space-y-2.5">
                {moreLinks.map((l) => (
                  <li key={l.label}>{renderLink(l)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Chris Folmar. All rights reserved.
          </p>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
            Durham, NH
          </p>
        </div>
      </div>
    </footer>
  );
}
