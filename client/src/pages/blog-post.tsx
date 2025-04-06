import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Component for image loading
const LazyImage = ({ src, alt, className, isHoverable = false }: { 
  src: string; 
  alt: string; 
  className: string; 
  isHoverable?: boolean;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Simplified image loading approach
  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error(`Failed to load image: ${src}`);
    // Try with cache-busting
    e.currentTarget.src = src + `?v=${Date.now()}`;
  };

  return (
    <div className={`${className} ${!isLoaded ? 'bg-gray-200 dark:bg-gray-700 animate-pulse' : ''}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${isHoverable ? 'group-hover:scale-105' : ''}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

// Related post component 
const RelatedPost = ({ post, onClick }: { post: typeof blogPosts[0]; onClick: () => void }) => {
  return (
    <div 
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="mb-3 overflow-hidden rounded-lg">
        <LazyImage 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-48" 
          isHoverable={true}
        />
      </div>
      <h4 className="font-bold group-hover:text-primary transition-colors">
        {post.title}
      </h4>
    </div>
  );
};

export default function BlogPost() {
  const [, setLocation] = useLocation();
  const params = useParams();
  const postId = params?.id ? parseInt(params.id) : null;
  
  const post = blogPosts.find(post => post.id === postId);
  
  // Handle navigation to related post
  const handleRelatedPostClick = useCallback((relatedPostId: number) => {
    window.scrollTo(0, 0);
    setLocation(`/blog/${relatedPostId}`);
  }, [setLocation]);
  
  useEffect(() => {
    if (!postId) {
      // No post ID provided, redirect to not-found
      setLocation("/not-found");
      return;
    }
    
    if (!post) {
      // Post not found, redirect to not-found
      setLocation("/not-found");
      return;
    }
    
    // Scroll to top when component mounts or updates
    window.scrollTo(0, 0);
  }, [postId, post, setLocation]);
  
  if (!post) {
    return null;
  }
  
  // Filter related posts
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id)
    .slice(0, 2);
  
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          onClick={() => setLocation("/")}
          className="mb-6 flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Featured Image at the top */}
          <div className="mb-8 rounded-xl overflow-hidden">
            <LazyImage 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-[400px]" 
            />
          </div>
          
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
                <Button variant="ghost" size="sm" className="rounded-full p-2">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />
          
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold mb-6">Share this article</h3>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" className="rounded-full">
                Twitter
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Facebook
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                LinkedIn
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