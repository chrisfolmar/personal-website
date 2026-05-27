// SystemsMap — the small interactive operating-model diagram.
// Originally lived in the Hero (May 2026). Task #59 replaced the
// hero illustration with a portrait of Chris; the map was preserved
// as a reusable component for sections that benefit from a visual
// of the operating model itself. It is currently mounted in
// AITransformationSummary, which is the section the diagram most
// literally describes ("the operating model around AI").
//
// Hovering or focusing a node lights its connected edges in brass
// and surfaces a one-line note. Nodes are real focusable elements
// so the notes are exposed to assistive tech. Reduced-motion is
// honored — the entrance + pulse animations are skipped; the
// hover/focus highlight is a colour change only.
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type NodeId = "teams" | "workflows" | "systems" | "ai" | "ops";

type Node = { id: NodeId; label: string; x: number; y: number; note: string };

const nodes: Node[] = [
  { id: "teams", label: "Teams", x: 70, y: 90, note: "3 globally distributed squads" },
  { id: "workflows", label: "Workflows", x: 230, y: 50, note: "Connected end-to-end" },
  { id: "systems", label: "Systems", x: 320, y: 200, note: "Modernized the business stack" },
  { id: "ai", label: "AI", x: 200, y: 320, note: "First-class participant, not a bolt-on" },
  { id: "ops", label: "Operations", x: 50, y: 260, note: "Quietly doing the busywork" },
];

const edges: [NodeId, NodeId][] = [
  ["teams", "workflows"],
  ["teams", "ops"],
  ["workflows", "systems"],
  ["systems", "ai"],
  ["ai", "ops"],
  ["workflows", "ai"],
  ["teams", "systems"],
];

const byId: Record<NodeId, Node> = Object.fromEntries(
  nodes.map((n) => [n.id, n]),
) as Record<NodeId, Node>;

export default function SystemsMap() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<NodeId | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Trigger the "operating model is alive" pulse the first time the map
  // scrolls into view — not on mount. The diagram lives mid-page, so
  // firing on mount means the pulse finishes before the user ever sees
  // it. We fire once per page load to avoid being annoying on
  // re-scrolls. Reduced-motion skips this entirely.
  const [hasFiredPulse, setHasFiredPulse] = useState(false);
  useEffect(() => {
    if (reduce) return;
    if (hasFiredPulse) return;
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setHasFiredPulse(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHasFiredPulse(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce, hasFiredPulse]);

  // Subtle pulse: once triggered, walk a single brass highlight along
  // the edges in sequence for two cycles, then go quiet.
  const [pulseEdgeIdx, setPulseEdgeIdx] = useState<number>(-1);
  useEffect(() => {
    if (reduce) return;
    if (!hasFiredPulse) return;
    const startDelay = 250;
    const stepMs = 180;
    const gapMs = 600;
    const cycles = 2;
    const total = edges.length;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let c = 0; c < cycles; c++) {
      for (let i = 0; i < total; i++) {
        timers.push(
          setTimeout(
            () => setPulseEdgeIdx(i),
            startDelay + c * (total * stepMs + gapMs) + i * stepMs,
          ),
        );
      }
    }
    timers.push(
      setTimeout(
        () => setPulseEdgeIdx(-1),
        startDelay + cycles * (total * stepMs + gapMs),
      ),
    );
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [reduce, hasFiredPulse]);

  const isEdgeActive = (a: NodeId, b: NodeId) =>
    active !== null && (a === active || b === active);

  const activeNode = active ? byId[active] : null;

  return (
    <div ref={containerRef} className="relative w-full max-w-[440px]">
      <svg
        role="img"
        aria-label="A small systems map: Teams, Workflows, Systems, AI, and Operations connected by lightweight lines. Hover or focus a node to see how each part contributes."
        viewBox="0 0 400 400"
        className="w-full h-auto"
      >
        <defs>
          <radialGradient id="systems-map-node-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--marker))" stopOpacity="0.22" />
            <stop offset="100%" stopColor="hsl(var(--marker))" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* faint dotted grid — echoes the SignatureMotif */}
        <g opacity="0.5">
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
        <g strokeWidth="1.25" strokeLinecap="round">
          {edges.map(([a, b], i) => {
            const A = byId[a];
            const B = byId[b];
            const lit = isEdgeActive(a, b);
            const pulsed = pulseEdgeIdx === i;
            const highlighted = lit || pulsed;
            return (
              <motion.line
                key={`${a}-${b}`}
                x1={A.x}
                y1={A.y}
                x2={B.x}
                y2={B.y}
                stroke={highlighted ? "hsl(var(--marker))" : "hsl(var(--primary))"}
                strokeOpacity={highlighted ? 0.9 : 0.4}
                style={{ transition: "stroke 0.35s ease, stroke-opacity 0.35s ease" }}
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={reduce ? undefined : { pathLength: 1, opacity: highlighted ? 0.9 : 0.4 }}
                transition={{
                  duration: 0.9,
                  delay: 0.25 + i * 0.06,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </g>

        {/* nodes — each is an interactive button (keyboard + SR) */}
        <g>
          {nodes.map((n, i) => {
            const isActive = active === n.id;
            return (
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
                <g
                  tabIndex={0}
                  role="img"
                  aria-label={`${n.label}: ${n.note}`}
                  onMouseEnter={() => setActive(n.id)}
                  onMouseLeave={() => setActive((cur) => (cur === n.id ? null : cur))}
                  onFocus={() => setActive(n.id)}
                  onBlur={() => setActive((cur) => (cur === n.id ? null : cur))}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setActive(null);
                      (e.currentTarget as SVGGElement).blur?.();
                    }
                  }}
                  className="cursor-default outline-none"
                  style={{ transition: "transform 0.2s ease" }}
                >
                  {/* invisible larger hit area */}
                  <circle cx={n.x} cy={n.y} r="40" fill="transparent" />
                  <circle cx={n.x} cy={n.y} r="36" fill="url(#systems-map-node-bg)" />
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={isActive ? 8 : 6}
                    fill={isActive ? "hsl(var(--marker))" : "hsl(var(--primary))"}
                    style={{
                      transition: "r 0.2s ease, fill 0.2s ease",
                    }}
                  />
                  <text
                    x={n.x}
                    y={n.y + 24}
                    textAnchor="middle"
                    className="font-mono"
                    fontSize="10.5"
                    fontWeight="500"
                    fill="hsl(var(--foreground))"
                    style={{ letterSpacing: "0.06em", textTransform: "uppercase" }}
                  >
                    {n.label}
                  </text>
                </g>
              </motion.g>
            );
          })}
        </g>
      </svg>

      {/* Hover/focus tooltip — sits under the map, fades in via opacity
          (no motion), always reserves vertical space so layout doesn't jump. */}
      <div
        aria-live="polite"
        className="mt-3 h-10 px-3 flex items-center font-mono text-[0.72rem] uppercase tracking-[0.16em] border-l-2"
        style={{
          borderColor: activeNode ? "hsl(var(--marker))" : "transparent",
          color: activeNode ? "hsl(var(--foreground))" : "transparent",
          transition: "color 0.25s ease, border-color 0.25s ease",
        }}
      >
        {activeNode ? (
          <span>
            <span style={{ color: "hsl(var(--marker))" }}>
              /{activeNode.label.toLowerCase()}
            </span>{" "}
            · {activeNode.note}
          </span>
        ) : (
          <span aria-hidden>placeholder</span>
        )}
      </div>
    </div>
  );
}
