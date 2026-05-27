import { memo } from "react";
import { Link } from "wouter";
import { Calendar, Clock, ArrowRight, ExternalLink } from "lucide-react";
import FadeIn from "./FadeIn";
import { formatDate } from "@/lib/utils";

interface WritingCardProps {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  delay?: number;
  // When set, the card links to an external canonical URL (e.g. a
  // Fullscript Builders Corner post) and opens in a new tab. A small mono
  // prefix on the eyebrow signals the outbound destination so the
  // visitor knows they're leaving the site before clicking.
  externalUrl?: string;
  externalSource?: string;
}

function WritingCard({
  id,
  title,
  excerpt,
  date,
  readTime,
  category,
  delay = 0,
  externalUrl,
  externalSource,
}: WritingCardProps) {
  const cardClassName =
    "group flex h-full flex-col bg-card border border-border rounded-md p-7 transition-all hover:border-primary/40 hover:shadow-md";

  const body = (
    <>
      <div className="flex items-center gap-3 mb-4 text-eyebrow">
        {externalUrl && externalSource ? (
          <span>
            <span className="text-foreground/80">{externalSource}</span>
            <span aria-hidden> · </span>
            {category}
          </span>
        ) : (
          <span>{category}</span>
        )}
        <span className="h-px flex-1 bg-border" aria-hidden />
      </div>
      <h3 className="font-display text-lg md:text-xl font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="mt-3 text-sm md:text-[0.95rem] leading-relaxed text-muted-foreground line-clamp-3">
        {excerpt}
      </p>

      <div className="mt-auto pt-6 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(date)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {readTime}
          </span>
        </div>
        {externalUrl ? (
          <ExternalLink className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" />
        ) : (
          <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" />
        )}
      </div>
    </>
  );

  return (
    <FadeIn delay={delay} className="h-full">
      {externalUrl ? (
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClassName}
          data-testid={`writing-card-external-${id}`}
          aria-label={`${title} (opens on ${externalSource ?? "external site"})`}
        >
          {body}
        </a>
      ) : (
        <Link href={`/blog/${id}`} className={cardClassName}>
          {body}
        </Link>
      )}
    </FadeIn>
  );
}

export default memo(WritingCard);
