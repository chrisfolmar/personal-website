// /services — the freelance landing surface.
//
// Positioning: secondary to the EM/Fullscript story. The home page,
// case studies, and Person schema still lead with engineering
// leadership. This page exists to give the freelance shop a single,
// indexable surface that Google can rank for region- and
// service-specific queries ("web designer portsmouth nh",
// "restaurant website southern maine", etc.).
//
// SEO notes:
// - Page metadata + Service JSON-LD + FAQPage JSON-LD are wired in
//   `client/src/lib/metadata/routes.ts` (SERVICES_METADATA) and
//   surfaced via `usePageSeo`.
// - The visible H1, eyebrow, and service-area list are deliberately
//   keyword-rich (region names, city names, who-it's-for) without
//   reading as keyword-stuffed marketing copy — the rest of the site
//   is editorial and this page has to match that voice.
// - There is no LocalBusiness schema anywhere on the site. See
//   getPersonSchema() in seo.ts for the reasoning.
import { useEffect } from "react";
import { Link } from "wouter";
import { MapPin, Sparkles, Code2, MessageSquare } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import FadeIn from "@/components/FadeIn";
import SignatureMotif from "@/components/SignatureMotif";
import { SERVICE_AREA_CITIES, SERVICE_AREA_REGIONS } from "@/lib/metadata/seo";
import { SERVICES_METADATA } from "@/lib/metadata/routes";
import { usePageSeo } from "@/lib/metadata/usePageSeo";

interface Offering {
  title: string;
  body: string;
}

const offerings: Offering[] = [
  {
    title: "A site that loads fast and reads clearly",
    body: "Built on modern, lightweight tooling — not a WordPress install with twelve plugins. Pages are fast on a phone over cellular, look correct on every screen size, and stay out of the way of the thing you actually sell.",
  },
  {
    title: "Designed around how customers actually decide",
    body: "For a restaurant, that's the menu, the hours, directions, and one tap to reserve. For a therapist, it's specialties, what a first session looks like, insurance, and a clear contact path. The site is structured for the question your visitor is really asking.",
  },
  {
    title: "Real local SEO, not just a sprinkle of keywords",
    body: "Proper schema markup, Google Business Profile setup help if you don't have one yet, and the on-page structure search engines actually reward — so people in your town can find you without paying for ads forever.",
  },
  {
    title: "Owned by you, handed off cleanly",
    body: "You get the keys when we're done — domain, hosting, content, everything. No vendor lock-in. I'm available for ongoing changes if you want them, but you're never trapped.",
  },
];

const faqs: Array<{ question: string; answer: string }> = [
  {
    question: "Where do you work? Do you take clients outside the Seacoast?",
    answer:
      "I'm based in Durham, NH and most engagements are in the Seacoast NH, Southern Maine, and North Shore Massachusetts region — close enough that we can meet in person at least once if it's useful. Outside that region I'll consider it case by case, but local is the default.",
  },
  {
    question: "What kinds of businesses do you build sites for?",
    answer:
      "Mostly small local businesses — restaurants, private-practice therapists, trades, and the occasional retail or service shop. The common thread is owners who want a website that genuinely helps them get customers, not a brochure that sits there.",
  },
  {
    question: "Do you build on WordPress?",
    answer:
      "No, not anymore. WordPress made sense ten years ago; today it's usually slower, less secure, and more expensive to maintain than the modern alternatives. I'll explain what I'd build on for your specific situation when we talk.",
  },
  {
    question: "What does an engagement usually look like?",
    answer:
      "A short discovery conversation (free), a written proposal with a fixed price and timeline, then a kickoff. Most small-business sites take three to six weeks end to end. I share progress as we go so there are no surprises at the launch meeting.",
  },
  {
    question: "Why hire you instead of Squarespace or a template?",
    answer:
      "If a template gets you 80% of the way there, use it — I'll tell you that on the call. You hire me when the template version isn't quite right: you need real local SEO, faster pages, a custom booking or menu flow, or you've tried the DIY route and it's not converting. I've been shipping production websites since 2014 and run engineering teams for a living, so the work is held to a real standard.",
  },
  {
    question: "How do I get started?",
    answer:
      "Email me through the contact page with a sentence or two about your business and what you want the site to do. I'll reply within a couple of business days to set up a short call.",
  },
];

const regionGrouped = SERVICE_AREA_REGIONS.map((region) => ({
  region,
  cities: SERVICE_AREA_CITIES.filter((c) => c.region === region).map((c) => c.name),
}));

export default function ServicesPage() {
  usePageSeo(SERVICES_METADATA);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 md:pt-32 pb-20 md:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Freelance · Seacoast NH · Southern ME · North Shore MA"
          title={
            <>
              Modern websites for small local businesses on the{" "}
              <span className="marker-highlight">Seacoast and Southern Maine</span>.
            </>
          }
          description="I run a small freelance shop in Durham, NH, building thoughtful, fast websites for restaurants, therapists, and other independent businesses across the Seacoast, Southern Maine, and the North Shore. Not WordPress. Not a template a competitor also uses. Built for the way your customers actually decide."
        />

        <FadeIn className="-mt-6 mb-12 max-w-2xl">
          <SignatureMotif variant="rule" />
        </FadeIn>

        {/* Offerings */}
        <section aria-labelledby="services-what-you-get" className="max-w-5xl">
          <SectionHeader
            eyebrow="What you get"
            title="A website that earns its keep."
            description="Every engagement is scoped to the business — but the underlying standard is the same."
            size="sub"
            icon={<Sparkles className="h-4 w-4" />}
          />
          <h3 id="services-what-you-get" className="sr-only">
            What you get
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {offerings.map((o, i) => (
              <FadeIn
                as="li"
                key={o.title}
                delay={i * 0.04}
                className="bg-card border border-border rounded-md p-6 md:p-7"
              >
                <div className="font-display text-lg font-semibold text-foreground">
                  {o.title}
                </div>
                <p className="mt-3 text-[0.975rem] leading-relaxed text-muted-foreground">
                  {o.body}
                </p>
              </FadeIn>
            ))}
          </ul>
        </section>

        {/* Who it's for */}
        <section aria-labelledby="services-who" className="mt-16 md:mt-20 max-w-5xl">
          <SectionHeader
            eyebrow="Who I work with"
            title="Two kinds of businesses I'm especially useful for."
            size="sub"
            icon={<Code2 className="h-4 w-4" />}
          />
          <h3 id="services-who" className="sr-only">
            Who I work with
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <FadeIn className="bg-card border border-border rounded-md p-6 md:p-7">
              <div className="text-eyebrow mb-3">Restaurants</div>
              <h4 className="font-display text-lg font-semibold text-foreground">
                Independent restaurants and cafés.
              </h4>
              <p className="mt-3 text-[0.975rem] leading-relaxed text-muted-foreground">
                Menu changes without a developer. Real reservation, ordering,
                and gift-card flows that don't dump people onto a third-party
                site that hides your brand. Hours, location, and parking
                surfaced where new customers actually look. Built for the
                Friday-night phone search, not for a desktop in 2009.
              </p>
            </FadeIn>
            <FadeIn delay={0.04} className="bg-card border border-border rounded-md p-6 md:p-7">
              <div className="text-eyebrow mb-3">Therapists &amp; private practices</div>
              <h4 className="font-display text-lg font-semibold text-foreground">
                Therapists and small private practices.
              </h4>
              <p className="mt-3 text-[0.975rem] leading-relaxed text-muted-foreground">
                A site that helps a person in a hard moment decide whether to
                reach out — clear specialties, what a first session looks
                like, insurance, fees, and a quiet, low-friction contact path.
                Accessible by default. Built to read as calm and trustworthy,
                because that's the work.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Service area */}
        <section
          aria-labelledby="services-area"
          className="mt-16 md:mt-20 max-w-5xl"
        >
          <SectionHeader
            eyebrow="Service area"
            title="Where I work."
            description="Based in Durham, NH. Local-first across three regions — and happy to come meet you in person at least once if it helps."
            size="sub"
            icon={<MapPin className="h-4 w-4" />}
          />
          <h3 id="services-area" className="sr-only">
            Service area
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {regionGrouped.map((group, i) => (
              <FadeIn
                key={group.region}
                delay={i * 0.04}
                className="bg-card border border-border rounded-md p-6"
              >
                <div className="font-display text-base font-semibold text-foreground">
                  {group.region}
                </div>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {group.cities.map((city) => (
                    <li key={city}>{city}</li>
                  ))}
                </ul>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.16} className="mt-5 text-sm text-muted-foreground max-w-3xl">
            Don't see your town? The list is representative, not exclusive —
            if you're in the broader Seacoast NH, Southern Maine, or North
            Shore Massachusetts region, get in touch.
          </FadeIn>
        </section>

        {/* FAQ */}
        <section
          aria-labelledby="services-faq"
          className="mt-16 md:mt-20 max-w-4xl"
        >
          <SectionHeader
            eyebrow="Common questions"
            title="What people usually ask first."
            size="sub"
            icon={<MessageSquare className="h-4 w-4" />}
          />
          <h3 id="services-faq" className="sr-only">
            Frequently asked questions
          </h3>
          <ul className="divide-y divide-border border border-border rounded-md bg-card">
            {faqs.map((faq, i) => (
              <FadeIn
                as="li"
                key={faq.question}
                delay={i * 0.03}
                className="p-6 md:p-7"
              >
                <div className="font-display text-base md:text-lg font-semibold text-foreground">
                  {faq.question}
                </div>
                <p className="mt-3 text-[0.975rem] leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </FadeIn>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <FadeIn className="mt-16 md:mt-20 max-w-3xl">
          <div className="rounded-md border border-border bg-card p-7 md:p-9">
            <div className="text-eyebrow mb-3">Start a conversation</div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
              Have a small business that needs a real website?
            </h2>
            <p className="mt-4 text-[0.975rem] leading-relaxed text-muted-foreground">
              Tell me a sentence or two about your business and what you want
              the site to do. I'll reply within a couple of business days to
              set up a short, no-pressure call.
            </p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[3px_3px_0_hsl(var(--marker))] hover:shadow-[2px_2px_0_hsl(var(--marker))] transition-shadow"
                data-testid="services-cta-contact"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
