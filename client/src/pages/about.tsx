// Per the copy-redundancy pass, ABOUT_DESCRIPTION (page meta) avoids
// the role-at-Fullscript framing (canonical home: Hero) and reads
// distinctly from the visible About section header.
import { useEffect } from "react";
import About from "@/components/About";
import Skills from "@/components/Skills";
import { buildProfilePageJsonLd } from "@/lib/metadata/seo";
import { usePageSeo } from "@/lib/metadata/usePageSeo";

const ABOUT_TITLE = "About | Chris Folmar";
const ABOUT_DESCRIPTION =
  "About Chris Folmar — career arc from software developer to engineering manager, with a focus on operating-model design, business systems, and AI-enabled workflows.";

export default function AboutPage() {
  usePageSeo({
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    path: "/about",
    type: "profile",
    jsonLd: buildProfilePageJsonLd("/about", ABOUT_TITLE, ABOUT_DESCRIPTION),
    jsonLdId: "about-jsonld",
  });

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
