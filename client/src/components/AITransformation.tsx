import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Sparkles,
  Zap,
  Rocket,
  Layers,
  Users,
  Workflow,
  ArrowRight,
} from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";

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
    icon: <Zap className="h-6 w-6" />,
  },
  {
    title: "Initiatives",
    tagline: "Ship in weeks",
    description:
      "Cross-team workflows that connect systems and replace recurring manual work. Scoped, measured, and rolled out with the partners who depend on them.",
    icon: <Rocket className="h-6 w-6" />,
  },
  {
    title: "Reworks",
    tagline: "Rethink end-to-end",
    description:
      "Workflows worth redesigning from scratch with AI as a first-class participant. The bigger bets, taken once we've earned the credibility with the easy wins.",
    icon: <Layers className="h-6 w-6" />,
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
    <section
      id="ai-transformation"
      className="py-24 bg-white dark:bg-gray-950"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Team GSD
          </span>
        </div>
        <SectionHeading
          title="AI Transformation"
          description="The current center of gravity in my work — building an AI-first operating model across five departments without losing the people who make it run."
        />

        {/* Mission + Philosophy */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Workflow className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold">Mission</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Team GSD exists to take the work people shouldn't have to do — the
              copy/paste, the reconciliation, the one-hundredth version of the
              same email — and turn it into systems that just run. The goal isn't
              to replace anyone. It's to give every team back the time and the
              focus to do the work that actually moves Fullscript forward.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
            className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold">People First, AI Empowered</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The philosophy under everything we ship. AI is leverage for the
              humans doing the work, not a substitute for them. If a workflow
              makes the team faster, sharper, or less burned out, it's working.
              If it makes them feel surveilled or sidelined, we built the wrong
              thing.
            </p>
          </motion.div>
        </div>

        {/* Operating model */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            How the work gets sorted
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {operatingModel.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary inline-flex mb-4">
                  {item.icon}
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <h4 className="text-xl font-bold">{item.title}</h4>
                  <span className="text-sm text-primary font-medium">
                    {item.tagline}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            The tooling stack
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.04,
                  ease: "easeOut",
                }}
                className="bg-gray-50 dark:bg-gray-900 rounded-lg p-5 border border-gray-100 dark:border-gray-800 text-center"
              >
                <div className="font-bold text-gray-900 dark:text-white mb-1">
                  {tool.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 leading-snug">
                  {tool.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Where this is going */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Where this is going</h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            The next chapter is less about individual automations and more about
            making AI a default, native part of how every team operates. The
            org that builds that muscle now is the one that compounds the
            advantage for years.
          </p>
          <Link
            href="/case-studies/team-gsd-ai-transformation"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium"
          >
            Read the full case study
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(AITransformation);
