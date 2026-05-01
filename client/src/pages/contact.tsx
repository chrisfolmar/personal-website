import { useEffect } from "react";
import Contact from "@/components/Contact";
import { buildContactPageJsonLd } from "@/lib/metadata/seo";
import { usePageSeo } from "@/lib/metadata/usePageSeo";

const CONTACT_TITLE = "Contact | Chris Folmar";
const CONTACT_DESCRIPTION =
  "Get in touch with Chris Folmar — engineering leadership, AI transformation, business systems, or anything in between.";

export default function ContactPage() {
  usePageSeo({
    title: CONTACT_TITLE,
    description: CONTACT_DESCRIPTION,
    path: "/contact",
    jsonLd: buildContactPageJsonLd(CONTACT_DESCRIPTION),
    jsonLdId: "contact-jsonld",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-12">
      <Contact />
    </div>
  );
}
