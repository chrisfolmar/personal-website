import { memo } from "react";
import SectionHeader from "@/components/SectionHeader";

interface SectionHeadingProps {
  title: string;
  description: string;
  eyebrow?: string;
}

function SectionHeading({ title, description, eyebrow }: SectionHeadingProps) {
  return (
    <SectionHeader
      eyebrow={eyebrow}
      title={title}
      description={description}
      align="center"
    />
  );
}

export default memo(SectionHeading);
