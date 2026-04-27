import { memo, type ReactNode } from "react";
import FadeIn from "./FadeIn";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  children?: ReactNode;
}

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  children,
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <FadeIn
      as="header"
      className={`${alignment} max-w-3xl mb-12 md:mb-14`}
    >
      {eyebrow ? (
        <div className="text-eyebrow mb-4">{eyebrow}</div>
      ) : null}
      <h2 className="text-h1 text-foreground">{title}</h2>
      {description ? (
        <p className="mt-4 text-lead">
          {description}
        </p>
      ) : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </FadeIn>
  );
}

export default memo(SectionHeader);
