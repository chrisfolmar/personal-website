import { Link } from "wouter";
import {
  ArrowLeft,
  Home,
  Briefcase,
  Sparkles,
  FileText,
  BarChart3,
  User,
  Send,
  BookOpen,
  Calendar,
  Layers,
  MapPin,
} from "lucide-react";
import { visibleBlogPosts, caseStudies } from "@/lib/data";
import { DEFAULT_METADATA } from "@/lib/metadata/seo";
import { SITEMAP_METADATA } from "@/lib/metadata/routes";
import { usePageSeo } from "@/lib/metadata/usePageSeo";
import SectionHeader from "@/components/SectionHeader";
import FadeIn from "@/components/FadeIn";

export default function Sitemap() {
  usePageSeo(SITEMAP_METADATA);

  const mainSections = [
    { id: "home", label: "Home", icon: Home },
    { id: "impact", label: "Impact", icon: BarChart3 },
    { id: "what-i-do", label: "What I'm useful for", icon: Briefcase },
    { id: "case-studies", label: "Featured case studies", icon: Layers },
    { id: "ai-transformation", label: "AI transformation", icon: Sparkles },
    { id: "writing", label: "Writing", icon: FileText },
  ];

  const standalonePages = [
    { href: "/about", label: "About", icon: User },
    { href: "/contact", label: "Contact", icon: Send },
    { href: "/services", label: "Services (freelance web design)", icon: MapPin },
    { href: "/case-studies", label: "Case studies", icon: Layers },
    { href: "/writing", label: "Writing", icon: FileText },
    { href: "/resume", label: "Resume", icon: BookOpen },
    { href: "/now", label: "Now", icon: Calendar },
    { href: "/beliefs", label: "Things I believe", icon: BookOpen },
  ];

  return (
    <div className="pt-28 md:pt-32 pb-20 md:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </FadeIn>

        <SectionHeader
          eyebrow="Sitemap"
          title="Everything on the site, in one place."
          description="A quick index of the pages, case studies, and posts here — useful if you landed on something specific and want to see what else is around."
        />

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl">
          <FadeIn className="bg-card border border-border rounded-md p-6 md:p-7">
            <div className="text-eyebrow mb-5">Home sections</div>
            <ul className="space-y-1">
              {mainSections.map((section) => {
                const Icon = section.icon;
                return (
                  <li key={section.id}>
                    <a
                      href={`/#${section.id}`}
                      className="flex items-center gap-3 px-2 py-2 rounded-md text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      {section.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </FadeIn>

          <FadeIn delay={0.04} className="bg-card border border-border rounded-md p-6 md:p-7">
            <div className="text-eyebrow mb-5">Pages</div>
            <ul className="space-y-1">
              {standalonePages.map((page) => {
                const Icon = page.icon;
                return (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="flex items-center gap-3 px-2 py-2 rounded-md text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      {page.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </FadeIn>

          <FadeIn delay={0.08} className="bg-card border border-border rounded-md p-6 md:p-7">
            <div className="text-eyebrow mb-5">Case studies</div>
            <ul className="space-y-1">
              {caseStudies.map((study) => (
                <li key={study.slug}>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="block px-2 py-2 rounded-md text-foreground hover:bg-muted transition-colors"
                  >
                    {study.title}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.12} className="bg-card border border-border rounded-md p-6 md:p-7">
            <div className="text-eyebrow mb-5">Writing</div>
            <ul className="space-y-1">
              {visibleBlogPosts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.id}`}
                    className="block px-2 py-2 rounded-md text-foreground hover:bg-muted transition-colors"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <FadeIn
          delay={0.16}
          className="mt-10 bg-card border border-border rounded-md p-6 md:p-7 max-w-5xl"
        >
          <div className="text-eyebrow mb-4">About this site</div>
          <p className="text-[0.975rem] leading-relaxed text-muted-foreground">
            {DEFAULT_METADATA.description}
          </p>
          <p className="mt-4 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-muted-foreground">
            © {new Date().getFullYear()} Chris Folmar · Last loaded{" "}
            {new Date().toLocaleDateString()}
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
