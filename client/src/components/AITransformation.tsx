import { memo } from "react";
import { Link } from "wouter";
import {
  Zap,
  Rocket,
  Layers,
  Users,
  Workflow,
  ArrowRight,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import FadeIn from "@/components/FadeIn";

interface OperatingModelItem {
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
}

const operatingModel: OperatingModelItem[] = [
  {
    title: "Easy Wins",
    tagline: "Ship in days",
    description:
      "Small, high-leverage automations that remove friction from someone's day this week. Built fast, owned by the team that uses them.",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    title: "Initiatives",
    tagline: "Ship in weeks",
    description:
      "Cross-team workflows that connect systems and replace recurring manual work. Scoped, measured, and rolled out with the partners who depend on them.",
    icon: <Rocket className="h-5 w-5" />,
  },
  {
    title: "Reworks",
    tagline: "Rethink end-to-end",
    description:
      "Workflows worth redesigning from scratch with AI as a first-class participant. The bigger bets, taken once we've earned credibility with the easy wins.",
    icon: <Layers className="h-5 w-5" />,
  },
];

const tools = [
  { name: "n8n", description: "Workflow automation for non-engineers" },
  { name: "Cursor", description: "AI-assisted engineering" },
  { name: "ChatGPT Enterprise", description: "Org-wide LLM access with governance" },
  { name: "NotebookLM", description: "Institutional knowledge surfaces" },
];

function AITransformation() {
  return (
    <section id="ai-transformation" className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="AI Transformation · Team GSD"
          title="An AI-first operating model across five departments — without losing the people who run the work."
          description="The current center of gravity in my work. The goal isn't to replace anyone; it's to give every team back the time and the focus to do the work that actually moves the business forward."
        />

        <div className="grid lg:grid-cols-2 gap-5 md:gap-6 mb-10">
          <FadeIn className="bg-card border border-border rounded-md p-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Workflow className="h-4 w-4" />
              </span>
              <h3 className="font-display text-lg font-semibold">Mission</h3>
            </div>
            <p className="text-[0.975rem] leading-relaxed text-muted-foreground">
              Team GSD exists to take the work people shouldn't have to do — the
              copy/paste, the reconciliation, the one-hundredth version of the
              same email — and turn it into systems that just run.
            </p>
          </FadeIn>

          <FadeIn delay={0.05} className="bg-card border border-border rounded-md p-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Users className="h-4 w-4" />
              </span>
              <h3 className="font-display text-lg font-semibold">People-first, AI-empowered</h3>
            </div>
            <p className="text-[0.975rem] leading-relaxed text-muted-foreground">
              AI is leverage for the humans doing the work, not a substitute
              for them. If a workflow makes a team faster, sharper, or less
              burned out, it's working. If it makes them feel surveilled or
              sidelined, we built the wrong thing.
            </p>
          </FadeIn>
        </div>

        <FadeIn className="text-eyebrow mb-4">How the work gets sorted</FadeIn>
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-12">
          {operatingModel.map((item, index) => (
            <FadeIn
              key={item.title}
              delay={index * 0.05}
              className="bg-card border border-border rounded-md p-7"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary mb-4">
                {item.icon}
              </span>
              <div className="flex items-baseline gap-2 mb-3">
                <h4 className="font-display text-lg font-semibold">{item.title}</h4>
                <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                  {item.tagline}
                </span>
              </div>
              <p className="text-[0.975rem] leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-eyebrow mb-4">Tooling stack</FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {tools.map((tool, index) => (
            <FadeIn
              key={tool.name}
              delay={index * 0.04}
              className="bg-card border border-border rounded-md p-5"
            >
              <div className="font-display font-semibold text-foreground mb-1">
                {tool.name}
              </div>
              <div className="text-sm text-muted-foreground leading-snug">
                {tool.description}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="max-w-3xl">
          <h3 className="font-display text-2xl font-semibold mb-3">Where this is going</h3>
          <p className="text-lead">
            The next chapter is less about individual automations and more
            about making AI a default, native part of how every team operates.
            The org that builds that muscle now is the one that compounds the
            advantage for years.
          </p>
          <Link
            href="/case-studies/team-gsd-ai-transformation"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
          >
            Read the full case study
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

export default memo(AITransformation);
