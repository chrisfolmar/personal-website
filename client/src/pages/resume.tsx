import { useEffect } from "react";
import { Download, ExternalLink, Mail, MapPin, Briefcase, GraduationCap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { experiences, skills, contact } from "@/lib/data";

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

const headlineAchievements: string[] = [
  "Led a 300%+ increase in engineering project throughput across three globally distributed teams without adding headcount.",
  "Spearheaded an AI-first operating model (Team GSD) saving 1,600+ hours annually across five departments.",
  "Reduced NetSuite transaction load by 43% through ERP/WMS integration redesign.",
  "Cut invoicing maintenance overhead by 95% by leveraging native NetSuite capabilities.",
  "Mentored three engineers into senior roles and launched a Project Lead framework for mid-level growth.",
  "Saved $3M+ in carrier costs over two years through carrier-API rate-shopping strategy.",
];

const coreCompetencies: string[] = [
  "Engineering Management",
  "AI Transformation",
  "Operating Model Design",
  "ERP / WMS / Fulfillment Systems",
  "Cross-functional Leadership",
  "Architecture & Integration",
  "Coaching & Talent Development",
  "Async Communication Systems",
];

export default function Resume() {
  usePageMeta(
    "Resume | Chris Folmar",
    "Chris Folmar's resume — Engineering Manager, AI Transformation Leader, and Business Systems Engineering Lead."
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10 pb-8 border-b border-gray-200 dark:border-gray-800">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Chris Folmar
              </h1>
              <p className="text-xl text-primary font-medium mb-4">
                Engineering Manager · AI Transformation Leader
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {contact.location}
                </span>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </a>
                <a
                  href="https://www.linkedin.com/in/clfolmar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                asChild
                size="lg"
                className="inline-flex items-center gap-2"
              >
                <a
                  href="https://www.linkedin.com/in/clfolmar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-5 w-5" />
                  Download PDF
                </a>
              </Button>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-right max-w-[200px]">
                PDF coming soon — link routes to LinkedIn for now.
              </p>
            </div>
          </div>

          {/* Summary */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Summary
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Engineering Manager with 11+ years of experience scaling teams,
              modernizing business systems, and embedding AI as a first-class
              part of how operations run. Currently leads three globally
              distributed teams at Fullscript supporting Finance, Fulfillment,
              Customer Support, and Catalog — and owns the AI transformation
              effort (Team GSD) across five departments. Track record of
              tripling delivery throughput without adding headcount, cutting
              system overhead by 40–95%, and growing engineers into senior
              leadership roles.
            </p>
          </section>

          {/* Headline achievements */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Headline Achievements</h2>
            <ul className="space-y-2">
              {headlineAchievements.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-gray-700 dark:text-gray-300 leading-relaxed"
                >
                  <span className="text-primary font-bold mt-1">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Experience */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2">
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-primary font-medium mb-3">{exp.company}</p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Key Skills</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4"
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-bold">{skill.name}</h3>
                    {skill.years && (
                      <span className="text-sm text-primary font-medium">
                        {skill.years}+ yrs
                      </span>
                    )}
                  </div>
                  {skill.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">
                      {skill.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Core competencies */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Core Competencies</h2>
            <div className="flex flex-wrap gap-2">
              {coreCompetencies.map((c) => (
                <span
                  key={c}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {c}
                </span>
              ))}
            </div>
          </section>

          {/* Education / context */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Education & Background
            </h2>
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Self-taught engineer turned engineering leader. Started building
                WordPress sites for local businesses in 2016 and grew through
                IC, technical lead, and engineering management roles at
                Emerson Ecologics and Fullscript. Continuing freelance practice
                serving healthcare professionals and small businesses on the
                side.
              </p>
            </div>
          </section>

          {/* Footer CTA */}
          <div className="text-center pt-8 border-t border-gray-200 dark:border-gray-800">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Want to talk about engineering leadership, AI transformation, or
              just trade notes?
            </p>
            <Button asChild size="lg">
              <a href={`mailto:${contact.email}`}>Get in touch</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
