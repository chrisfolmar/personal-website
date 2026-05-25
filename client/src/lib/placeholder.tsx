/**
 * Placeholder utility for the "Reflection of me" content surfaces.
 *
 * The Manifesto, Beliefs page, /now sub-sections, footer sign-off, human
 * metric card, work photo slot, and /writing addendum are all scaffolded
 * with placeholders that read `[CHRIS: ...]`. Until Chris fills those in
 * with his own words, the surfaces are visible in dev (so we can see the
 * shape of the content) and hidden in production (so visitors never see
 * raw `[CHRIS: ...]` strings).
 *
 * Usage:
 *   import { isDev, isPlaceholder, devOnlyText, DevOnly } from "@/lib/placeholder";
 *
 *   // Inline text — returns the string in dev, "" in prod
 *   <p>{devOnlyText("[CHRIS: one-line sign-off]")}</p>
 *
 *   // Whole surface — renders children only in dev
 *   <DevOnly><Manifesto /></DevOnly>
 *
 *   // For arrays of "partially filled" content, filter with isPlaceholder
 *   beliefs.filter((b) => isDev || !isPlaceholder(b.body))
 */

export const isDev = import.meta.env.DEV;

const PLACEHOLDER_RE = /\[CHRIS:[^\]]*\]/;

export function isPlaceholder(value: string | undefined | null): boolean {
  if (!value) return true;
  return PLACEHOLDER_RE.test(value);
}

/**
 * Wrap a string that is still a `[CHRIS: ...]` placeholder. In dev, the
 * raw string is returned (visibly marked). In production, returns "".
 */
export function devOnlyText(value: string): string {
  if (isDev) return value;
  return isPlaceholder(value) ? "" : value;
}

/**
 * In dev, returns the raw value (placeholder visible). In production,
 * returns `fallback` when the value is still a placeholder, otherwise
 * the value itself.
 */
export function fillOr<T>(value: string, fallback: T): string | T {
  if (isDev) return value;
  return isPlaceholder(value) ? fallback : value;
}

interface DevOnlyProps {
  children: React.ReactNode;
}

/**
 * Render children only in development. Use to wrap whole scaffolded
 * surfaces (Manifesto, Beliefs page sections, /now sub-sections, etc.)
 * until Chris fills in the real content.
 */
export function DevOnly({ children }: DevOnlyProps) {
  if (!isDev) return null;
  return <>{children}</>;
}

interface PlaceholderBadgeProps {
  children: React.ReactNode;
  inline?: boolean;
}

/**
 * Visible-in-dev badge that wraps a `[CHRIS: ...]` string so it's
 * obvious in the dev preview which copy is still awaiting Chris's
 * input. In production this renders nothing.
 */
export function PlaceholderBadge({ children, inline = false }: PlaceholderBadgeProps) {
  if (!isDev) return null;
  const base =
    "font-mono text-[0.7rem] uppercase tracking-[0.14em] " +
    "border border-dashed border-amber-500/60 bg-amber-500/10 " +
    "text-amber-700 dark:text-amber-300 rounded-sm px-2 py-0.5";
  return inline ? (
    <span className={base}>{children}</span>
  ) : (
    <div className={base + " inline-block"}>{children}</div>
  );
}
