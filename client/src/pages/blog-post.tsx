import { useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function BlogPost() {
  const [location, setLocation] = useLocation();
  const params = useParams();
  const postId = params?.id ? parseInt(params.id) : null;
  
  const post = blogPosts.find(post => post.id === postId);
  
  useEffect(() => {
    if (!post) {
      setLocation("/not-found");
    }
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [post, setLocation]);
  
  if (!post) {
    return null;
  }
  
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          onClick={() => setLocation("/blog")}
          className="mb-6 flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
          
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 rounded-xl overflow-hidden">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-auto object-cover"
              />
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
                {blogPosts
                  .filter(p => p.id !== post.id)
                  .slice(0, 2)
                  .map(relatedPost => (
                    <div 
                      key={relatedPost.id} 
                      className="group cursor-pointer"
                      onClick={() => setLocation(`/blog/${relatedPost.id}`)}
                    >
                      <div className="mb-3 overflow-hidden rounded-lg">
                        <img 
                          src={relatedPost.coverImage} 
                          alt={relatedPost.title} 
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h4 className="font-bold group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h4>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}