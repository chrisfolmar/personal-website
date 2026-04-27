import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { ArrowLeft, Calendar, Clock, Share2, Link2, Check } from "lucide-react";
import { SiX, SiFacebook, SiLinkedin } from "react-icons/si";
import { blogPosts, visibleBlogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LazyImage from "@/components/LazyImage";
import DOMPurify from "dompurify";
import { useToast } from "@/hooks/use-toast";
import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";
import WritingCard from "@/components/WritingCard";

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
    setMeta("twitter:title", title, "property");
    setMeta("twitter:description", description, "property");

    return () => {
      document.title = prevTitle;
    };
  }, [title, description]);
}

export default function BlogPost() {
  const [, setLocation] = useLocation();
  const params = useParams();
  const postId = params?.id ? parseInt(params.id) : null;
  const { toast } = useToast();
  const [linkCopied, setLinkCopied] = useState(false);

  const post = blogPosts.find((p) => p.id === postId);

  usePageMeta(
    post ? `${post.title} | Chris Folmar` : "Writing | Chris Folmar",
    post ? post.excerpt : "Writing by Chris Folmar"
  );

  const getShareUrl = () => `https://chrisfolmar.com/blog/${postId}`;

  const handleShare = async (platform: string) => {
    const url = getShareUrl();
    const title = post?.title || "";
    const text = post?.excerpt || "";

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          "_blank",
          "noopener,noreferrer",
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank",
          "noopener,noreferrer",
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank",
          "noopener,noreferrer",
        );
        break;
      case "copy":
        try {
          await navigator.clipboard.writeText(url);
          setLinkCopied(true);
          toast({
            title: "Link copied",
            description: "The article link has been copied to your clipboard.",
          });
          setTimeout(() => setLinkCopied(false), 2000);
        } catch {
          toast({
            title: "Could not copy link",
            description: url,
            variant: "destructive",
          });
        }
        break;
      case "native":
        if ("share" in navigator) {
          try {
            await navigator.share({ title, text, url });
          } catch {}
        }
        break;
    }
  };

  useEffect(() => {
    if (!postId || !post) {
      setLocation("/not-found");
      return;
    }
    window.scrollTo(0, 0);
  }, [postId, post, setLocation]);

  if (!post) {
    return (
      <div className="pt-28 md:pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 w-48 bg-muted rounded mx-auto mb-4" />
          <div className="h-4 w-32 bg-muted rounded mx-auto" />
        </div>
      </div>
    );
  }

  const relatedPosts = visibleBlogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  const sanitizedContent = DOMPurify.sanitize(post.content || "", {
    ALLOWED_TAGS: [
      "h1", "h2", "h3", "h4", "h5", "h6", "p", "ul", "ol", "li", "a",
      "strong", "em", "br", "blockquote", "code", "pre", "span", "div", "img",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "class", "src", "alt", "width", "height"],
  });

  const hasNativeShare = typeof navigator !== "undefined" && "share" in navigator;

  return (
    <article className="pt-28 md:pt-32 pb-20 md:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => setLocation("/writing")}
          className="mb-8 flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to writing
        </Button>

        <SectionHeader eyebrow={post.category} title={post.title}>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
            {hasNativeShare ? (
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto rounded-full p-2 h-auto"
                onClick={() => handleShare("native")}
                aria-label="Share this article"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
        </SectionHeader>

        <div className="max-w-3xl">
          <FadeIn className="mb-10">
            <LazyImage
              src={post.coverImage}
              alt={post.title}
              containerClassName="rounded-md overflow-hidden border border-border"
              containerStyle={{
                minHeight: "240px",
                maxHeight: "440px",
                width: "100%",
              }}
              objectFit="cover"
              aspectRatio="16/9"
            />
          </FadeIn>

          <FadeIn delay={0.05}>
            <div
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </FadeIn>

          <FadeIn as="section" className="mt-14 pt-8 border-t border-border">
            <SectionHeader size="sub" eyebrow="Share this article" />
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-md flex items-center gap-2"
                onClick={() => handleShare("twitter")}
                aria-label="Share on Twitter"
              >
                <SiX className="h-4 w-4" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-md flex items-center gap-2"
                onClick={() => handleShare("facebook")}
                aria-label="Share on Facebook"
              >
                <SiFacebook className="h-4 w-4" />
                Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-md flex items-center gap-2"
                onClick={() => handleShare("linkedin")}
                aria-label="Share on LinkedIn"
              >
                <SiLinkedin className="h-4 w-4" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-md flex items-center gap-2"
                onClick={() => handleShare("copy")}
                aria-label="Copy link"
              >
                {linkCopied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
                {linkCopied ? "Copied" : "Copy link"}
              </Button>
            </div>
          </FadeIn>
        </div>

        <FadeIn as="section" className="mt-16 pt-10 border-t border-border">
          <SectionHeader size="sub" eyebrow="More writing" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {relatedPosts.map((rp, i) => (
              <WritingCard
                key={rp.id}
                id={rp.id}
                title={rp.title}
                excerpt={rp.excerpt}
                date={rp.date}
                readTime={rp.readTime}
                category={rp.category}
                delay={i * 0.05}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
