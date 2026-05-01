import { useEffect } from "react";
import About from "@/components/About";
import Skills from "@/components/Skills";
import { buildProfilePageJsonLd } from "@/lib/metadata/seo";
import { usePageSeo } from "@/lib/metadata/usePageSeo";

const ABOUT_TITLE = "About | Chris Folmar";
const ABOUT_DESCRIPTION =
  "About Chris Folmar — software developer turned engineering leader at Fullscript, working on operating-model design, business systems, and AI-enabled workflows.";

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
