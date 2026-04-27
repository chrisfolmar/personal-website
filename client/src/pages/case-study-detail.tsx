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
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/FadeIn";

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");

    return () => {
      document.title = prevTitle;
    };
  }, [title, description]);
}

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  delay?: number;
  children: React.ReactNode;
}

function Section({ icon, title, delay = 0, children }: SectionProps) {
  return (
    <FadeIn as="section" delay={delay} className="mt-12 first:mt-0">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
          {icon}
        </span>
        <h2 className="font-display text-2xl font-semibold text-foreground">
          {title}
        </h2>
      </div>
      <div className="text-[0.975rem] leading-relaxed text-muted-foreground">
        {children}
      </div>
    </FadeIn>
  );
}

export default function CaseStudyDetail() {
  const [, setLocation] = useLocation();
  const params = useParams();
  const slug = params?.slug || null;

  const study = caseStudies.find((s) => s.slug === slug);

  usePageMeta(
    study ? `${study.title} | Case Study | Chris Folmar` : "Case Study | Chris Folmar",
    study ? study.summary : "Case study by Chris Folmar"
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

        <FadeIn className="max-w-3xl mb-12">
          <div className="text-eyebrow mb-4">Case study</div>
          <h1 className="text-h1 text-foreground">{study.title}</h1>
          <p className="mt-4 text-lead">{study.summary}</p>
        </FadeIn>

        <FadeIn delay={0.05} className="mb-14">
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
          <Section icon={<AlertCircle className="h-4 w-4" />} title="Problem">
            <p>{study.problem}</p>
          </Section>

          <Section icon={<Compass className="h-4 w-4" />} title="Context" delay={0.05}>
            <p>{study.context}</p>
          </Section>

          <Section icon={<Wrench className="h-4 w-4" />} title="What I changed" delay={0.05}>
            <ul className="space-y-3 list-disc pl-5 marker:text-primary/60">
              {study.whatIChanged.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section icon={<Layers className="h-4 w-4" />} title="Systems introduced" delay={0.05}>
            <ul className="space-y-3 list-disc pl-5 marker:text-primary/60">
              {study.systemsIntroduced.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section icon={<TrendingUp className="h-4 w-4" />} title="Measurable impact" delay={0.05}>
            <ul className="space-y-3 list-disc pl-5 marker:text-primary/60">
              {study.impact.map((metric) => (
                <li key={metric.label}>
                  <span className="font-semibold text-foreground">
                    {metric.value}
                  </span>{" "}
                  — {metric.label}
                </li>
              ))}
            </ul>
          </Section>

          <Section icon={<Lightbulb className="h-4 w-4" />} title="Lessons learned" delay={0.05}>
            <ul className="space-y-3 list-disc pl-5 marker:text-primary/60">
              {study.lessonsLearned.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Section>

          <FadeIn className="mt-14 bg-muted/40 border border-border rounded-md p-6">
            <div className="text-eyebrow mb-3">Tools & systems</div>
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

        <FadeIn className="mt-16 pt-10 border-t border-border">
          <div className="text-eyebrow mb-6">More case studies</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {otherStudies.map((other) => (
              <Link
                key={other.slug}
                href={`/case-studies/${other.slug}`}
                className="group block bg-card border border-border rounded-md p-6 hover:border-primary/40 transition-colors"
              >
                <h4 className="font-display text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {other.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {other.summary}
                </p>
                <div className="inline-flex items-center gap-1 text-primary text-sm font-medium">
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
