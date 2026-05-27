import { useEffect } from "react";
import { Link, useLocation, useParams } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Compass,
  Wrench,
  Layers,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import { caseStudies } from "@/lib/data";
import { relatedPostsForCaseStudy } from "@/lib/relations";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";
import WritingCard from "@/components/WritingCard";
import {
  CASE_STUDIES_METADATA,
  caseStudyDetailFallback,
  caseStudyDetailMetadata,
} from "@/lib/metadata/routes";
import { usePageSeo } from "@/lib/metadata/usePageSeo";

export default function CaseStudyDetail() {
  const [, setLocation] = useLocation();
  const params = useParams();
  const slug = params?.slug || null;

  const study = caseStudies.find((s) => s.slug === slug);

  usePageSeo(
    study
      ? caseStudyDetailMetadata(study)
      : slug
        ? caseStudyDetailFallback(slug)
        : CASE_STUDIES_METADATA,
  );

  useEffect(() => {
    if (!slug || !study) {
      setLocation("/not-found");
      return;
    }
    window.scrollTo(0, 0);
  }, [slug, study, setLocation]);

  if (!study) {
    return (
      <div className="pt-28 md:pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 w-48 bg-muted rounded mx-auto mb-4" />
          <div className="h-4 w-32 bg-muted rounded mx-auto" />
        </div>
      </div>
    );
  }

  const otherStudies = caseStudies.filter((s) => s.slug !== study.slug).slice(0, 2);
  const relatedPosts = relatedPostsForCaseStudy(study, 3);

  return (
    <div className="pt-28 md:pt-32 pb-20 md:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => setLocation("/case-studies")}
          className="mb-8 flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to case studies
        </Button>

        <SectionHeader
          eyebrow="Case study"
          title={study.title}
          description={study.summary}
        />

        {study.slug === "team-gsd-ai-transformation" ? (
          <FadeIn className="-mt-4 mb-10">
            <a
              href="https://builders.fullscript.com/posts/team-gsd-year-1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-team-gsd-year-one-case-study"
            >
              Read the year-one retrospective
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </FadeIn>
        ) : null}

        <FadeIn className="mb-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {study.impact.map((metric) => (
              <div
                key={metric.label}
                className="bg-card border border-border rounded-md p-5 md:p-6"
              >
                <div className="font-display text-2xl md:text-3xl font-semibold text-primary tabular-nums leading-none">
                  {metric.value}
                </div>
                <div className="mt-2 text-xs md:text-sm text-muted-foreground leading-snug">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="max-w-3xl">
          <FadeIn as="section" className="mt-12 first:mt-0">
            <SectionHeader
              size="sub"
              icon={<AlertCircle className="h-4 w-4" />}
              title="Problem"
            />
            <div className="text-[0.975rem] leading-relaxed text-muted-foreground">
              <p>{study.problem}</p>
            </div>
          </FadeIn>

          <FadeIn as="section" delay={0.05} className="mt-12">
            <SectionHeader
              size="sub"
              icon={<Compass className="h-4 w-4" />}
              title="Context"
            />
            <div className="text-[0.975rem] leading-relaxed text-muted-foreground">
              <p>{study.context}</p>
            </div>
          </FadeIn>

          <FadeIn as="section" delay={0.05} className="mt-12">
            <SectionHeader
              size="sub"
              icon={<Wrench className="h-4 w-4" />}
              title="What changed"
            />
            <ul className="text-[0.975rem] leading-relaxed text-muted-foreground space-y-3 list-disc pl-5 marker:text-primary/60">
              {study.whatChanged.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn as="section" delay={0.05} className="mt-12">
            <SectionHeader
              size="sub"
              icon={<Layers className="h-4 w-4" />}
              title="Systems introduced"
            />
            <ul className="text-[0.975rem] leading-relaxed text-muted-foreground space-y-3 list-disc pl-5 marker:text-primary/60">
              {study.systemsIntroduced.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn as="section" delay={0.05} className="mt-12">
            <SectionHeader
              size="sub"
              icon={<TrendingUp className="h-4 w-4" />}
              title="Measurable impact"
            />
            <ul className="text-[0.975rem] leading-relaxed text-muted-foreground space-y-3 list-disc pl-5 marker:text-primary/60">
              {study.impact.map((metric) => (
                <li key={metric.label}>
                  <span className="font-semibold text-foreground">
                    {metric.value}
                  </span>{" "}
                  — {metric.label}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn as="section" delay={0.05} className="mt-12">
            <SectionHeader
              size="sub"
              icon={<Lightbulb className="h-4 w-4" />}
              title="Lessons learned"
            />
            <ul className="text-[0.975rem] leading-relaxed text-muted-foreground space-y-3 list-disc pl-5 marker:text-primary/60">
              {study.lessonsLearned.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn as="section" className="mt-14 bg-muted/40 border border-border rounded-md p-6">
            <SectionHeader size="sub" eyebrow="Tools & systems" />
            <div className="flex flex-wrap gap-2">
              {study.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 rounded-md bg-background border border-border text-sm text-foreground/80"
                >
                  {tool}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>

        {relatedPosts.length > 0 ? (
          <FadeIn as="section" className="mt-16 pt-10 border-t border-border">
            <SectionHeader size="sub" eyebrow="Related writing" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {relatedPosts.map((post, i) => (
                <WritingCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  readTime={post.readTime}
                  category={post.category}
                  delay={i * 0.05}
                />
              ))}
            </div>
          </FadeIn>
        ) : null}

        <FadeIn as="section" className="mt-16 pt-10 border-t border-border">
          <SectionHeader size="sub" eyebrow="More case studies" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {otherStudies.map((other) => (
              <Link
                key={other.slug}
                href={`/case-studies/${other.slug}`}
                className="group flex flex-col bg-card border border-border rounded-md p-6 hover:border-primary/40 transition-colors"
              >
                <h3 className="font-display text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {other.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {other.summary}
                </p>
                <div className="mt-auto inline-flex items-center gap-1 text-primary text-sm font-medium">
                  Read the case study
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
