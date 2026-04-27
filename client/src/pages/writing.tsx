import { useEffect } from "react";
import SectionHeader from "@/components/SectionHeader";
import WritingCard from "@/components/WritingCard";
import { blogPosts } from "@/lib/data";

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

export default function WritingIndex() {
  usePageMeta(
    "Writing | Chris Folmar",
    "Posts on AI-enabled operations, engineering leadership, business systems, and small-business web work."
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const posts = blogPosts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="pt-28 md:pt-32 pb-20 md:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Writing"
          title="Posts, in order."
          description="Notes on AI-enabled operations, engineering leadership, business systems, and the small-business web work I keep on the side. Newest first."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {posts.map((post, i) => (
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
      </div>
    </div>
  );
}
