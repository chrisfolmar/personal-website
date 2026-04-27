import { useEffect } from "react";
import { Link, useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
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
  children: React.ReactNode;
}

function Section({ icon, title, children }: SectionProps) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">{icon}</div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {children}
      </div>
    </section>
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
      <div className="py-20 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  const otherStudies = caseStudies.filter((s) => s.slug !== study.slug).slice(0, 2);

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => setLocation("/case-studies")}
          className="mb-6 flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Case Studies
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <header className="mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
              {study.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              {study.summary}
            </p>
          </header>

          {/* Impact strip */}
          <div className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {study.impact.map((metric) => (
              <div
                key={metric.label}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 md:p-6 text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1 tabular-nums">
                  {metric.value}
                </div>
                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-snug">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          <Section icon={<AlertCircle className="h-5 w-5" />} title="Problem">
            <p>{study.problem}</p>
          </Section>

          <Section icon={<Compass className="h-5 w-5" />} title="Context">
            <p>{study.context}</p>
          </Section>

          <Section icon={<Wrench className="h-5 w-5" />} title="What I changed">
            <ul className="space-y-3 list-disc pl-5">
              {study.whatIChanged.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section icon={<Layers className="h-5 w-5" />} title="Systems introduced">
            <ul className="space-y-3 list-disc pl-5">
              {study.systemsIntroduced.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section icon={<TrendingUp className="h-5 w-5" />} title="Measurable impact">
            <ul className="space-y-3 list-disc pl-5">
              {study.impact.map((metric) => (
                <li key={metric.label}>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {metric.value}
                  </span>{" "}
                  — {metric.label}
                </li>
              ))}
            </ul>
          </Section>

          <Section icon={<Lightbulb className="h-5 w-5" />} title="Lessons learned">
            <ul className="space-y-3 list-disc pl-5">
              {study.lessonsLearned.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Section>

          {/* Tools */}
          <div className="mt-12 mb-12 bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
              Tools & systems
            </h3>
            <div className="flex flex-wrap gap-2">
              {study.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Other case studies */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold mb-6">More case studies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherStudies.map((other) => (
                <Link
                  key={other.slug}
                  href={`/case-studies/${other.slug}`}
                  className="group block bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md hover:border-primary/40 transition-all"
                >
                  <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {other.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {other.summary}
                  </p>
                  <div className="inline-flex items-center gap-1 text-primary text-sm font-medium">
                    Read more
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
