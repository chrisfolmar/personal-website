// Per the copy-redundancy pass:
//   - the headline-achievement bullet is the canonical home for the
//     operator-voice variant of the time-back family
//   - the Summary section keeps the five-departments framing (one of
//     two allowed homes; the other is the Team GSD case study summary)
//   - the operating-model framing is intentionally not used here
import { useEffect } from "react";
import {
  ExternalLink,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { experiences, skills, contact } from "@/lib/data";
import FadeIn from "@/components/FadeIn";
import { RESUME_METADATA } from "@/lib/metadata/routes";
import { usePageSeo } from "@/lib/metadata/usePageSeo";

const headlineAchievements: string[] = [
  "Led a 300%+ increase in engineering project throughput across three globally distributed teams without adding headcount.",
  "Spearheaded the AI transformation effort (Team GSD), freeing teams to focus on higher-leverage work.",
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

interface SectionShellProps {
  icon?: React.ReactNode;
  title: string;
  delay?: number;
  children: React.ReactNode;
}

function SectionShell({ icon, title, delay = 0, children }: SectionShellProps) {
  return (
    <FadeIn as="section" delay={delay} className="mt-12 first:mt-0">
      <div className="flex items-center gap-3 mb-5">
        {icon ? (
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
            {icon}
          </span>
        ) : null}
        <h2 className="font-display text-2xl font-semibold text-foreground">
          {title}
        </h2>
      </div>
      {children}
    </FadeIn>
  );
}

export default function Resume() {
  usePageSeo(RESUME_METADATA);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 md:pt-32 pb-20 md:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Header */}
          <FadeIn className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-8 border-b border-border">
            <div>
              <div className="text-eyebrow mb-3">Résumé</div>
              <h1 className="text-display text-foreground">Chris Folmar</h1>
              <p className="mt-3 text-primary font-medium font-display text-lg">
                Engineering Manager at Fullscript — business systems,
                AI-enabled operations, three globally distributed teams.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {contact.location}
                </span>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </a>
                <a
                  href="https://www.linkedin.com/in/clfolmar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:items-end">
              <Button asChild size="lg" className="inline-flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/clfolmar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  View on LinkedIn
                </a>
              </Button>
              <p className="font-mono text-xs text-muted-foreground md:text-right max-w-[220px] tracking-wide">
                Downloadable PDF coming soon.
              </p>
            </div>
          </FadeIn>

          <SectionShell icon={<Award className="h-4 w-4" />} title="Summary">
            <p className="text-[0.975rem] leading-relaxed text-muted-foreground">
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
          </SectionShell>

          <SectionShell title="Headline achievements" delay={0.05}>
            <ul className="space-y-2.5">
              {headlineAchievements.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-[0.975rem] leading-relaxed text-muted-foreground"
                >
                  <span className="text-primary mt-1">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </SectionShell>

          <SectionShell icon={<Briefcase className="h-4 w-4" />} title="Experience" delay={0.05}>
            <div className="space-y-5">
              {experiences.map((exp, i) => (
                <div
                  key={`${exp.company}-${exp.period}`}
                  className="bg-card border border-border rounded-md p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {exp.title}
                    </h3>
                    <span className="text-eyebrow">{exp.period}</span>
                  </div>
                  <p className="text-sm text-primary font-medium mb-3">
                    {exp.company}
                  </p>
                  <p className="text-[0.975rem] leading-relaxed text-muted-foreground">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell title="Key skills" delay={0.05}>
            <div className="grid md:grid-cols-2 gap-3">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="bg-card border border-border rounded-md p-5"
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-display font-semibold text-foreground">
                      {skill.name}
                    </h3>
                    {skill.years ? (
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {skill.years}+ yr
                      </span>
                    ) : null}
                  </div>
                  {skill.description ? (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {skill.description}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell title="Core competencies" delay={0.05}>
            <div className="flex flex-wrap gap-2">
              {coreCompetencies.map((c) => (
                <span
                  key={c}
                  className="px-3 py-1 rounded-md bg-primary/10 text-primary text-sm font-medium"
                >
                  {c}
                </span>
              ))}
            </div>
          </SectionShell>

          <SectionShell
            icon={<GraduationCap className="h-4 w-4" />}
            title="Education & background"
            delay={0.05}
          >
            <div className="bg-card border border-border rounded-md p-6 space-y-5">
              <div>
                <h3 className="font-display font-semibold text-foreground">
                  B.S. Computer Science
                </h3>
                <p className="text-sm font-medium text-primary">
                  University of Southern Maine
                </p>
              </div>
              <p className="text-[0.975rem] leading-relaxed text-muted-foreground">
                Started my career in 2014 as a Junior Software Developer at
                Freeport Metrics in Portland, Maine. After Freeport, I worked
                across several engineering roles before joining Emerson
                Ecologics in 2020 and then Fullscript, where I've grown
                through IC, technical lead, and engineering management roles.
                I continue to keep a small freelance shop on the side,
                primarily serving healthcare professionals and small
                businesses.
              </p>
            </div>
          </SectionShell>

          <FadeIn className="mt-16 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground mb-4">
              Want to talk about engineering leadership, AI transformation, or
              just trade notes?
            </p>
            <Button asChild size="lg">
              <a href={`mailto:${contact.email}`}>Get in touch</a>
            </Button>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
