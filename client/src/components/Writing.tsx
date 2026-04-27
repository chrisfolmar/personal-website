import { memo } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import WritingCard from "./WritingCard";
import { visibleBlogPosts } from "@/lib/data";

function Writing() {
  const latest = visibleBlogPosts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section
      id="writing"
      className="py-20 md:py-28 bg-muted/30 border-y border-border"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Writing"
          title="Recent posts."
          description="Notes on AI-enabled operations, engineering leadership, and the systems that help teams ship. If something here is useful, take it. If you disagree, even better — I'd love to hear why."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {latest.map((post, i) => (
            <WritingCard
              key={post.id}
              id={post.id}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              readTime={post.readTime}
              category={post.category}
              delay={i * 0.05}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <Link
            href="/writing"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            All writing
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default memo(Writing);
