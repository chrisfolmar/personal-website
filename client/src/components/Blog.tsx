import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useLocation } from 'wouter';
import { blogPosts } from '@/lib/data';
import type { BlogPost } from '@/types';
import SectionHeading from '@/components/ui/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

// Sort blog posts by date (most recent first)
const sortedBlogPosts = [...blogPosts].sort((a, b) => 
  new Date(b.date).getTime() - new Date(a.date).getTime()
);

// Component for lazy loading images
const LazyImage = ({ src, alt, className, index = 0 }: { src: string; alt: string; className: string; index?: number }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Use Intersection Observer to determine when image is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading image when it's 200px from entering the viewport
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error(`Failed to load blog image: ${src}`);
    // Keep trying the original source
    e.currentTarget.src = src;
  };

  return (
    <div className={`${className} ${!isLoaded && isInView ? 'bg-gray-200 dark:bg-gray-700 animate-pulse' : ''}`}>
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${index === 0 ? '' : 'hover:scale-110'}`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      )}
      {!isInView && (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
      )}
    </div>
  );
};

// Blog post card component (memoized to prevent unnecessary re-renders)
const BlogCard = ({ post, index, onClick }: { post: BlogPost; index: number; onClick: () => void }) => {
  return (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }} // Reduced delay between animations
      viewport={{ once: true, margin: '-50px' }}
    >
      <Card 
        className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-pointer"
        onClick={onClick}
      >
        <div className="relative h-48 overflow-hidden">
          <LazyImage 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full" 
            index={index}
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-primary text-white hover:bg-primary/90">
              {post.category}
            </Badge>
          </div>
        </div>
        <CardHeader className="pb-2">
          <h3 className="text-xl font-bold line-clamp-2 hover:text-primary transition-colors">
            {post.title}
          </h3>
        </CardHeader>
        <CardContent className="pb-4 flex-grow">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="mr-4">{formatDate(post.date)}</span>
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.readTime}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
            {post.excerpt}
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="p-0 hover:bg-transparent hover:text-primary">
            Read More 
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default function Blog() {
  const [, setLocation] = useLocation();
  
  // Handle blog post click - memoized to prevent recreation on each render
  const handlePostClick = useCallback((postId: number, title: string) => {
    console.log(`Navigating to blog post: ${postId} - ${title}`);
    setLocation(`/blog/${postId}`);
  }, [setLocation]);

  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Latest Articles" 
          description="Insights and thoughts on web development, design, and technology"
        />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedBlogPosts.map((post: BlogPost, index: number) => (
            <BlogCard 
              key={post.id}
              post={post}
              index={index}
              onClick={() => handlePostClick(post.id, post.title)}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="mt-8"
            onClick={() => {
              // Scroll to the blog section
              const blogSection = document.getElementById('blog');
              if (blogSection) {
                blogSection.scrollIntoView({ behavior: 'smooth' });
                console.log("Scrolled to blog section");
              }
            }}
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
}