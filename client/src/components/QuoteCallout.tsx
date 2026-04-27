import { memo } from "react";
import FadeIn from "./FadeIn";

interface QuoteCalloutProps {
  quote: string;
  attribution: string;
  role?: string;
}

function QuoteCallout({ quote, attribution, role }: QuoteCalloutProps) {
  return (
    <FadeIn className="border-l-2 border-primary pl-6 md:pl-8 py-2 max-w-3xl">
      <p className="font-display text-xl md:text-2xl leading-snug text-foreground">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-4 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{attribution}</span>
        {role ? <span> — {role}</span> : null}
      </div>
    </FadeIn>
  );
}

export default memo(QuoteCallout);
