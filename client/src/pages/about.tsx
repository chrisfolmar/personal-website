import { useEffect } from "react";
import About from "@/components/About";
import Skills from "@/components/Skills";

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    return () => { document.title = prev; };
  }, [title, description]);
}

export default function AboutPage() {
  usePageMeta(
    "About | Chris Folmar",
    "About Chris Folmar — software developer turned engineering leader at Fullscript, working on operating-model design, business systems, and AI-enabled workflows."
  );

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
