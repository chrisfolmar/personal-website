import { memo, createElement, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type FadeInTag =
  | "div"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "aside"
  | "nav"
  | "main"
  | "ul"
  | "ol"
  | "li";

interface FadeInProps {
  as?: FadeInTag;
  className?: string;
  delay?: number;
  children: ReactNode;
}

function FadeIn({ as = "div", className, delay = 0, children }: FadeInProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return createElement(as, { className }, children);
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
    >
      {children}
    </MotionTag>
  );
}

export default memo(FadeIn);
