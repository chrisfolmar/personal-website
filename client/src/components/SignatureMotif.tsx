// SignatureMotif — the recurring "engineer's notebook" texture.
//
// This component is the visual through-line that ties the Hero, Section
// dividers, and major surfaces together. It renders a faint dotted grid
// (echoing the lines on a Plex-style engineering notebook) and an
// optional brass corner-mark in the top-left, like a margin notation.
//
// Use it as:
//   <SignatureMotif />                    — absolute-positioned background
//   <SignatureMotif variant="rule" />     — thin brass + dotted hairline
//   <SignatureMotif variant="band" />     — full-width banded divider
//
// All variants are decorative — aria-hidden — so they don't add noise
// for assistive tech.
import { memo } from "react";

type Variant = "background" | "rule" | "band";

interface SignatureMotifProps {
  variant?: Variant;
  soft?: boolean;
  className?: string;
}

function SignatureMotif({
  variant = "background",
  soft = false,
  className = "",
}: SignatureMotifProps) {
  if (variant === "rule") {
    return (
      <div
        aria-hidden
        className={`flex items-center gap-3 ${className}`.trim()}
      >
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ background: "hsl(var(--marker))" }}
        />
        <span
          className="flex-1 border-t border-dashed"
          style={{ borderColor: "hsl(var(--marker) / 0.55)" }}
        />
      </div>
    );
  }

  if (variant === "band") {
    return (
      <div
        aria-hidden
        className={`relative h-12 w-full overflow-hidden ${className}`.trim()}
      >
        <div className="absolute inset-0 signature-grid-soft opacity-70" />
        <div
          className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2"
          style={{
            background:
              "linear-gradient(to right, transparent, hsl(var(--marker) / 0.45) 18%, hsl(var(--marker) / 0.45) 82%, transparent)",
          }}
        />
      </div>
    );
  }

  // Default: a softly tiled dotted grid that fills its parent.
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${
        soft ? "signature-grid-soft" : "signature-grid"
      } ${className}`.trim()}
    />
  );
}

export default memo(SignatureMotif);
