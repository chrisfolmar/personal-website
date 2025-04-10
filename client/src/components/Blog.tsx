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
import LazyImage from "./LazyImage";

// Sort blog posts by date (most recent first)
const sortedBlogPosts = [...blogPosts].sort((a, b) => 
  new Date(b.date).getTime() - new Date(a.date).getTime()
);

// Blog post card component
const BlogCard = ({ post, index, onClick }: { post: BlogPost; index: number; onClick: () => void }) => {
  return (
    <Card 
      className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <LazyImage
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full" 
          objectFit="cover"
          isHoverable={true}
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
  );
};

export default function Blog() {
  const [, setLocation] = useLocation();
  
  // Handle blog post click - memoized to prevent recreation on each render
  const handlePostClick = useCallback((postId: number) => {
    setLocation(`/blog/${postId}`);
  }, [setLocation]);

  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Latest Articles" 
          description="Insights and thoughts on web development, leadership, and technology"
        />
        
        <div className="max-w-3xl mx-auto text-center mt-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-md">
            I believe in the power of sharing knowledge and learning from others. In this blog, I write about my experiences in software engineering, leadership, team building, AI-driven optimization, and anything else that I find thought-provoking or insightful. Whether you're here to learn from my technical posts or gain perspective on my leadership journey, I hope you find something valuable that sparks new ideas.
          </p>
        </div>
        
        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut"
          }}
          viewport={{ 
            once: true,
            amount: 0.1
          }}
        >
          {sortedBlogPosts.map((post: BlogPost, index: number) => (
            <BlogCard 
              key={post.id}
              post={post}
              index={index}
              onClick={() => handlePostClick(post.id)}
            />
          ))}
        </motion.div>
        
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