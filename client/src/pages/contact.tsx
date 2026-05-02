import { useEffect } from "react";
import Contact from "@/components/Contact";
import { CONTACT_METADATA } from "@/lib/metadata/routes";
import { usePageSeo } from "@/lib/metadata/usePageSeo";

export default function ContactPage() {
  usePageSeo(CONTACT_METADATA);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-12">
      <Contact />
    </div>
  );
}
