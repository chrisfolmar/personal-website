// Per the copy-redundancy pass, the AI Transformation Leader paragraph
// avoids the work-people-shouldnt-do framing (canonical home:
// AITransformationSummary) and the time-back family (canonical homes:
// AITransformationSummary + résumé bullet). Use a different framing
// for the same idea here.
import { memo } from "react";
import { ArrowRight } from "lucide-react";
import { experiences } from "@/lib/data";
import SectionHeader from "@/components/SectionHeader";
import FadeIn from "@/components/FadeIn";
import LazyImage from "@/components/LazyImage";

interface TimelineItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
  isLast?: boolean;
  delay?: number;
}

const EditorialTimelineItem = memo(({
  title,
  company,
  period,
  description,
  isLast = false,
  delay = 0,
}: TimelineItemProps) => (
  <FadeIn
    delay={delay}
    className={`relative pl-8 ${isLast ? "" : "pb-10"}`}
  >
    {!isLast ? (
      <span
        aria-hidden
        className="absolute left-[7px] top-3 bottom-0 w-px bg-border"
      />
    ) : null}
    <span
      aria-hidden
      className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background"
    />
    <div className="text-eyebrow mb-1">{period}</div>
    <h4 className="font-display text-xl font-semibold text-foreground">
      {title}
    </h4>
    <div className="text-sm font-medium text-primary mb-3">{company}</div>
    <p className="text-[0.975rem] leading-relaxed text-muted-foreground">
      {description}
    </p>
  </FadeIn>
));
EditorialTimelineItem.displayName = "EditorialTimelineItem";

function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="About"
          title="From developer to manager modernizing how Fullscript operates — and a husband and dad keeping the rest in balance."
          description="The career arc — and the operating instincts I've built along the way."
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <FadeIn className="lg:col-span-5">
            <div className="overflow-hidden rounded-md border border-border">
              <picture>
                <source
                  type="image/avif"
                  srcSet="/assets/images/about-800.avif 800w, /assets/images/about-1200.avif 1200w"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                <source
                  type="image/webp"
                  srcSet="/assets/images/about-800.webp 800w, /assets/images/about-1200.webp 1200w"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                <img
                  src="/assets/images/about.jpg"
                  srcSet="/assets/images/about-800.jpg 800w, /assets/images/about-1200.jpg 1200w"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  alt="Chris Folmar with his wife"
                  className="w-full h-auto object-cover"
                  width={1200}
                  height={900}
                  loading="eager"
                  decoding="async"
                  {...({ fetchpriority: "high" } as Record<string, string>)}
                />
              </picture>
            </div>

            <div
              className="mt-4 overflow-hidden rounded-md border border-border"
              data-testid="about-work-photo"
            >
              <LazyImage
                src="/assets/images/about-work-1200.jpg"
                alt="Christopher Folmar working in his home office."
                width={1024}
                height={1536}
                objectFit="cover"
                aspectRatio="1024 / 1536"
                className="w-full h-auto"
              />
            </div>

            <div className="mt-8 space-y-5 text-[0.975rem] leading-relaxed text-muted-foreground">
              <p className="pb-4 border-b border-border">
                Outside the work: husband to Lauren, brand-new dad,
                dog-dad to Penny and Belle, lifelong Arsenal fan, on the
                water when I can be. An instinctive systems thinker who
                can't help looking for the leverage point in any process —
                including the ones I run at home.
              </p>
              <p>
                <strong className="text-foreground">Software Developer.</strong>{" "}
                I studied Computer Science at the University of Southern Maine
                and started my career in 2014 as a Junior Software Developer
                at Freeport Metrics in Portland, Maine — shipping production
                code for real customers from day one. From there I worked
                across a handful of engineering roles before settling into
                business systems and leadership work, and I've kept a small
                freelance shop on the side that whole time, mostly serving
                therapists, restaurants, and other small local businesses.
                Shipping end-to-end for real people is still how I think
                about software.
              </p>
              <p>
                <strong className="text-foreground">Technical Lead.</strong>{" "}
                At Emerson Ecologics and then Fullscript the work shifted from
                writing all the code to helping a group of engineers ship
                reliably and own their systems. The operating model was
                always the thing that broke first.
              </p>
              <p>
                <strong className="text-foreground">Engineering Manager.</strong>{" "}
                Today I run three globally distributed teams at Fullscript.
                Less code, more leverage: hiring, coaching, performance,
                prioritization, and the unglamorous work of making sure the
                right things get done.
              </p>
              <p>
                <strong className="text-foreground">
                  Business Systems Leader.
                </strong>{" "}
                My remit has expanded from product engineering into the systems
                behind Fullscript — ERP, WMS, fulfillment, finance, and
                catalog.
              </p>
              <p>
                <strong className="text-foreground">
                  AI Transformation Leader.
                </strong>{" "}
                Most of my recent energy has gone into AI-enabled workflows —
                designing the systems that absorb the repetitive operational
                drag so the people doing the work can stay on the parts that
                actually need them.
              </p>
            </div>
          </FadeIn>

          <div className="lg:col-span-7">
            <FadeIn className="text-eyebrow mb-6">Experience</FadeIn>
            <div>
              {experiences.map((exp, index) => (
                <EditorialTimelineItem
                  key={`${exp.company}-${exp.period}`}
                  title={exp.title}
                  company={exp.company}
                  period={exp.period}
                  description={exp.description}
                  isLast={index === experiences.length - 1}
                  delay={index * 0.04}
                />
              ))}
            </div>
            <FadeIn className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="https://www.linkedin.com/in/clfolmar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
              >
                View full LinkedIn
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/beliefs"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
              >
                Things I believe
                <ArrowRight className="h-4 w-4" />
              </a>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(About);
