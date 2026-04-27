import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { caseStudies } from "@/lib/data";

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
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

    return () => {
      document.title = prevTitle;
    };
  }, [title, description]);
}

export default function CaseStudies() {
  usePageMeta(
    "Case Studies | Chris Folmar",
    "Detailed case studies on scaling engineering throughput, AI-enabled workflow transformation, ERP/WMS modernization, and async information flow."
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <FileText className="h-4 w-4" />
            Case Studies
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Proof, not just a portfolio
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Deep dives on the work I'm proudest of — the problem, the change,
            the systems, and the measurable impact. Written for executives,
            engineering leaders, and anyone evaluating how I actually operate.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
            >
              <Link
                href={`/case-studies/${study.slug}`}
                className="group block h-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all"
              >
                <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {study.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {study.summary}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {study.impact.slice(0, 2).map((metric) => (
                    <div
                      key={metric.label}
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center"
                    >
                      <div className="text-xl md:text-2xl font-bold text-primary tabular-nums">
                        {metric.value}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-tight">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="inline-flex items-center gap-1 text-primary font-medium text-sm">
                  Read the case study
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
