import { memo, type ReactNode } from "react";
import FadeIn from "./FadeIn";

interface SectionHeaderProps {
  eyebrow?: string;
  title?: string;
  description?: ReactNode;
  align?: "left" | "center";
  size?: "page" | "sub";
  icon?: ReactNode;
  delay?: number;
  className?: string;
  children?: ReactNode;
}

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  size = "page",
  icon,
  delay = 0,
  className,
  children,
}: SectionHeaderProps) {
  const isSub = size === "sub";
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const defaultSpacing = isSub ? "mb-4" : "max-w-3xl mb-12 md:mb-14";
  const wrapperClass = [alignment, defaultSpacing, className]
    .filter(Boolean)
    .join(" ");

  const titleClass = isSub
    ? "text-h3 text-foreground"
    : "text-h1 text-foreground";

  const eyebrowSpacing = title || icon ? "mb-4" : "";

  const titleRow =
    title || icon ? (
      icon ? (
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
            {icon}
          </span>
          {title ? <h2 className={titleClass}>{title}</h2> : null}
        </div>
      ) : (
        <h2 className={titleClass}>{title}</h2>
      )
    ) : null;

  return (
    <FadeIn as="header" delay={delay} className={wrapperClass}>
      {eyebrow ? (
        <div className={`text-eyebrow ${eyebrowSpacing}`.trim()}>{eyebrow}</div>
      ) : null}
      {titleRow}
      {description ? <p className="mt-4 text-lead">{description}</p> : null}
      {children ? (
        <div className={isSub ? "mt-3" : "mt-6"}>{children}</div>
      ) : null}
    </FadeIn>
  );
}

export default memo(SectionHeader);
