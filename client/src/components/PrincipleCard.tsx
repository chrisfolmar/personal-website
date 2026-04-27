import { memo, type ReactNode } from "react";
import FadeIn from "./FadeIn";

interface PrincipleCardProps {
  number: string;
  title: string;
  description: string;
  icon?: ReactNode;
  delay?: number;
}

function PrincipleCard({
  number,
  title,
  description,
  icon,
  delay = 0,
}: PrincipleCardProps) {
  return (
    <FadeIn
      delay={delay}
      className="group relative h-full bg-card border border-border rounded-md p-7 md:p-8 transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-3 mb-5">
        {icon ? (
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
            {icon}
          </span>
        ) : null}
        <span className="font-display text-sm font-semibold text-muted-foreground tracking-widest">
          {number}
        </span>
      </div>
      <h3 className="font-display text-xl md:text-2xl font-semibold mb-3 text-foreground">
        {title}
      </h3>
      <p className="text-[0.975rem] leading-relaxed text-muted-foreground">
        {description}
      </p>
    </FadeIn>
  );
}

export default memo(PrincipleCard);
