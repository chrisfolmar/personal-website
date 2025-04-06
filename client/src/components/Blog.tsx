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

export default function Blog() {
  const [, setLocation] = useLocation();
  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Latest Articles" 
          description="Insights and thoughts on web development, design, and technology"
        />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedBlogPosts.map((post: BlogPost, index: number) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-pointer"
                onClick={() => setLocation(`/blog/${post.id}`)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
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
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="mt-8">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
}