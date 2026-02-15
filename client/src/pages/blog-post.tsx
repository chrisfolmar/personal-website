import { useEffect, useCallback } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2, Link2, Check } from "lucide-react";
import { SiX, SiFacebook, SiLinkedin } from "react-icons/si";
import { blogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LazyImage from "@/components/LazyImage";
import DOMPurify from "dompurify";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const RelatedPost = ({ post, onClick }: { post: typeof blogPosts[0]; onClick: () => void }) => {
  return (
    <div 
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="mb-3 overflow-hidden rounded-lg" style={{ height: '200px' }}>
        <LazyImage 
          src={post.coverImage} 
          alt={post.title} 
          className="transition-transform duration-300 group-hover:scale-105"
          containerClassName="w-full h-full"
          objectFit="cover"
          aspectRatio="16/9"
        />
      </div>
      <h4 className="font-bold group-hover:text-primary transition-colors">
        {post.title}
      </h4>
    </div>
  );
};

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
  
  const post = blogPosts.find(post => post.id === postId);

  usePageMeta(
    post ? `${post.title} | Chris Folmar` : "Blog | Chris Folmar",
    post ? post.excerpt : "Blog articles by Chris Folmar"
  );
  
  const handleRelatedPostClick = useCallback((relatedPostId: number) => {
    window.scrollTo(0, 0);
    setLocation(`/blog/${relatedPostId}`);
  }, [setLocation]);

  const getShareUrl = () => {
    return `https://chrisfolmar.com/blog/${postId}`;
  };

  const handleShare = async (platform: string) => {
    const url = getShareUrl();
    const title = post?.title || "";
    const text = post?.excerpt || "";

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          "_blank",
          "noopener,noreferrer"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank",
          "noopener,noreferrer"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank",
          "noopener,noreferrer"
        );
        break;
      case "copy":
        try {
          await navigator.clipboard.writeText(url);
          setLinkCopied(true);
          toast({ title: "Link copied!", description: "The article link has been copied to your clipboard." });
          setTimeout(() => setLinkCopied(false), 2000);
        } catch {
          toast({ title: "Could not copy link", description: url, variant: "destructive" });
        }
        break;
      case "native":
        if (navigator.share) {
          try {
            await navigator.share({ title, text, url });
          } catch {}
        }
        break;
    }
  };
  
  useEffect(() => {
    if (!postId) {
      setLocation("/not-found");
      return;
    }
    
    if (!post) {
      setLocation("/not-found");
      return;
    }
    
    window.scrollTo(0, 0);
  }, [postId, post, setLocation]);
  
  if (!post) {
    return (
      <div className="py-20 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
        </div>
      </div>
    );
  }
  
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id)
    .slice(0, 2);

  const sanitizedContent = DOMPurify.sanitize(post.content || "", {
    ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'br', 'blockquote', 'code', 'pre', 'span', 'div', 'img'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'src', 'alt', 'width', 'height'],
  });
  
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          onClick={() => {
            setLocation("/");
            setTimeout(() => {
              const blogSection = document.getElementById("blog");
              if (blogSection) {
                blogSection.scrollIntoView({ behavior: "smooth" });
              }
            }, 100);
          }}
          className="mb-6 flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Articles
        </Button>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <LazyImage 
            src={post.coverImage} 
            alt={post.title}
            containerClassName="mb-8 rounded-xl overflow-hidden"
            containerStyle={{
              minHeight: '280px',
              maxHeight: '450px',
              width: '100%'
            }}
            objectFit="contain"
            aspectRatio="16/9"
          />
          
          <div className="mb-8">
            <Badge variant="secondary" className="bg-primary text-white hover:bg-primary/90 mb-4">
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="mr-4">{formatDate(post.date)}</span>
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readTime}</span>
              <div className="ml-auto">
                {"share" in navigator && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full p-2"
                    onClick={() => handleShare("native")}
                    aria-label="Share this article"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
          
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold mb-6">Share this article</h3>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full flex items-center gap-2"
                onClick={() => handleShare("twitter")}
                aria-label="Share on Twitter"
              >
                <SiX className="h-4 w-4" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full flex items-center gap-2"
                onClick={() => handleShare("facebook")}
                aria-label="Share on Facebook"
              >
                <SiFacebook className="h-4 w-4" />
                Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full flex items-center gap-2"
                onClick={() => handleShare("linkedin")}
                aria-label="Share on LinkedIn"
              >
                <SiLinkedin className="h-4 w-4" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full flex items-center gap-2"
                onClick={() => handleShare("copy")}
                aria-label="Copy link"
              >
                {linkCopied ? <Check className="h-4 w-4 text-green-500" /> : <Link2 className="h-4 w-4" />}
                {linkCopied ? "Copied!" : "Copy Link"}
              </Button>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold mb-6">More from the blog</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map(relatedPost => (
                <RelatedPost 
                  key={relatedPost.id}
                  post={relatedPost}
                  onClick={() => handleRelatedPostClick(relatedPost.id)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}