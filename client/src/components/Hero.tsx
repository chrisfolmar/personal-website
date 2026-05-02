// Canonical home (per copy-redundancy pass) for the discipline-triplet
// eyebrow, the role-at-Fullscript line, and the modernize-the-work
// headline. Other surfaces must reword these ideas rather than repeat
// the exact phrasings used here.
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

function SystemsMap() {
  // A subtle systems-map illustration: nodes for Teams / Workflows /
  // Systems / AI / Operations connected by light lines. Inline SVG keeps
  // it crisp on every screen and easy to recolor with the accent token.
  const reduce = useReducedMotion();

  type Node = { id: string; label: string; x: number; y: number };
  const nodes: Node[] = [
    { id: "teams", label: "Teams", x: 70, y: 90 },
    { id: "workflows", label: "Workflows", x: 230, y: 50 },
    { id: "systems", label: "Systems", x: 320, y: 200 },
    { id: "ai", label: "AI", x: 200, y: 320 },
    { id: "ops", label: "Operations", x: 50, y: 260 },
  ];
  const edges: [string, string][] = [
    ["teams", "workflows"],
    ["teams", "ops"],
    ["workflows", "systems"],
    ["systems", "ai"],
    ["ai", "ops"],
    ["workflows", "ai"],
    ["teams", "systems"],
  ];

  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg
      role="img"
      aria-label="A small systems map: Teams, Workflows, Systems, AI, and Operations connected by lightweight lines."
      viewBox="0 0 400 400"
      className="w-full h-auto max-w-[440px]"
    >
      <defs>
        <radialGradient id="hero-node-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.18" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* faint dotted grid */}
      <g opacity="0.35">
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 50}
            y1={0}
            x2={i * 50}
            y2={400}
            stroke="hsl(var(--border))"
            strokeDasharray="2 6"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={i * 50}
            x2={400}
            y2={i * 50}
            stroke="hsl(var(--border))"
            strokeDasharray="2 6"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* edges */}
      <g
        stroke="hsl(var(--primary))"
        strokeOpacity="0.45"
        strokeWidth="1.25"
        strokeLinecap="round"
      >
        {edges.map(([a, b], i) => {
          const A = byId[a];
          const B = byId[b];
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={
                reduce
                  ? undefined
                  : { pathLength: 1, opacity: 0.45 }
              }
              transition={{
                duration: 0.9,
                delay: 0.25 + i * 0.06,
                ease: "easeOut",
              }}
            />
          );
        })}
      </g>

      {/* nodes */}
      <g>
        {nodes.map((n, i) => (
          <motion.g
            key={n.id}
            initial={reduce ? false : { opacity: 0, scale: 0.8 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.15 + i * 0.06,
              ease: "easeOut",
            }}
          >
            <circle
              cx={n.x}
              cy={n.y}
              r="36"
              fill="url(#hero-node-bg)"
            />
            <circle
              cx={n.x}
              cy={n.y}
              r="6"
              fill="hsl(var(--primary))"
            />
            <text
              x={n.x}
              y={n.y + 24}
              textAnchor="middle"
              className="font-display"
              fontSize="11"
              fontWeight="600"
              fill="hsl(var(--foreground))"
              style={{ letterSpacing: "0.04em" }}
            >
              {n.label}
            </text>
          </motion.g>
        ))}
      </g>
    </svg>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  const copyAnim = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: "easeOut" },
      };

  return (
    <section
      id="home"
      className="relative pt-28 md:pt-32 pb-20 md:pb-28 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          <motion.div className="lg:col-span-7" {...copyAnim}>
            <div className="text-eyebrow mb-6">
              Engineering Leadership · Business Systems · AI-Enabled Operations
            </div>
            <h1 className="text-display text-foreground">
              Helping teams modernize{" "}
              <span className="text-primary">how the work gets done</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lead">
              I'm Chris Folmar — engineering leader at Fullscript. I run
              globally distributed teams, modernize the business systems
              behind the company, and build AI-first workflows that quietly
              do the busywork.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-primary text-primary-foreground font-medium shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background transition-colors"
              >
                View Case Studies
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/writing"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border bg-background text-foreground font-medium hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background transition-colors"
              >
                Read recent posts
              </Link>
            </div>
          </motion.div>

          <div className="hidden lg:flex lg:col-span-5 justify-end">
            <SystemsMap />
          </div>
        </div>
      </div>
    </section>
  );
}
