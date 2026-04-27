import { useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Briefcase, BookOpen, Heart, Calendar } from "lucide-react";

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

interface FocusItem {
  icon: React.ReactNode;
  title: string;
  body: string;
}

const focusAreas: FocusItem[] = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Team GSD & AI transformation",
    body: "Most of my work energy is going into Team GSD — building out the AI-first operating model across five departments at Fullscript. We're past the phase of proving the concept and into the phase of making it stick: standards, ownership, and the next generation of reworks.",
  },
  {
    icon: <Briefcase className="h-5 w-5" />,
    title: "Engineering leadership",
    body: "Three globally distributed teams, scaling throughput without scaling headcount, and growing more engineers into senior and lead roles. The thing I'm working hardest on right now is making the operating model so clear that I become less of a bottleneck.",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Sharpening how I lead",
    body: "Reading more about org design and how leaders think about leverage at scale. Trying to be more deliberate about what I'm modeling for the people I work with.",
  },
  {
    icon: <Heart className="h-5 w-5" />,
    title: "Husband and brand-new dad",
    body: "Newly a dad. The biggest change of my life and the most grounding one. Everything else gets prioritized around it.",
  },
];

export default function NowPage() {
  usePageMeta(
    "Now | Chris Folmar",
    "What Chris Folmar is focused on right now — Team GSD, AI-enabled workflows, engineering leadership, and life as a new dad."
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const lastUpdated = "April 2026";

  return (
    <div className="py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Now</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              A short, honest look at what I'm focused on right now — both at
              work and outside of it. Inspired by{" "}
              <a
                href="https://nownownow.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                the /now page movement
              </a>
              .
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="h-4 w-4" />
              Last updated: {lastUpdated}
            </div>
          </div>

          <div className="space-y-6">
            {focusAreas.map((item, index) => (
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
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {item.icon}
                  </div>
                  <h2 className="text-xl font-bold">{item.title}</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-sm text-gray-500 dark:text-gray-400 text-center">
            This page changes as my focus changes. If we've talked recently and
            something here looks stale, that's on me — feel free to nudge.
          </div>
        </div>
      </div>
    </div>
  );
}
