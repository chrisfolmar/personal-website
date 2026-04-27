import { memo, type ReactNode } from "react";
import FadeIn from "./FadeIn";

interface CtaBandProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}

function CtaBand({ eyebrow, title, description, children }: CtaBandProps) {
  return (
    <section className="py-20 md:py-24 bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-3xl">
          {eyebrow ? (
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
              {eyebrow}
            </div>
          ) : null}
          <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.1] tracking-tight">
            {title}
          </h2>
          {description ? (
            <p className="mt-5 text-lg text-background/70 leading-relaxed max-w-2xl">
              {description}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">{children}</div>
        </FadeIn>
      </div>
    </section>
  );
}

export default memo(CtaBand);
