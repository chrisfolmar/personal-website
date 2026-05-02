// Per the copy-redundancy pass, ABOUT_DESCRIPTION (page meta) avoids
// the role-at-Fullscript framing (canonical home: Hero) and reads
// distinctly from the visible About section header.
import { useEffect } from "react";
import About from "@/components/About";
import Skills from "@/components/Skills";
import { ABOUT_METADATA } from "@/lib/metadata/routes";
import { usePageSeo } from "@/lib/metadata/usePageSeo";

export default function AboutPage() {
  usePageSeo(ABOUT_METADATA);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-12">
      <About />
      <Skills />
    </div>
  );
}
