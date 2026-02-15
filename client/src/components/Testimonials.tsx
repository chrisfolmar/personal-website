import { useState, useRef, useEffect, memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '@/lib/data';
import type { Testimonial } from '@/types';
import SectionHeading from '@/components/ui/section-heading';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Lazy loading avatar component
const LazyAvatar = memo(({ testimonial, getInitials }: { 
  testimonial: Testimonial; 
  getInitials: (name: string) => string;
}) => {
  const [isInView, setIsInView] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Set a timeout to load the image after a small delay to prevent flashing
    const timer = setTimeout(() => {
      setIsInView(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleImageError = () => {};

  return (
    <Avatar className="h-12 w-12 border-2 border-primary" ref={avatarRef}>
      {isInView ? (
        <AvatarImage 
          src={testimonial.avatar} 
          alt={testimonial.name} 
          onError={handleImageError}
          loading="lazy"
        />
      ) : null}
      <AvatarFallback>{getInitials(testimonial.name)}</AvatarFallback>
    </Avatar>
  );
});

// Testimonial card component
const TestimonialCard = memo(({ testimonial, index }: { 
  testimonial: Testimonial; 
  index: number;
}) => {
  // Memoize the getInitials function to avoid recalculation
  const getInitials = useMemo(() => {
    return (name: string) => {
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        ease: "easeOut",
        delay: index * 0.03  // Even shorter delay
      }}
      viewport={{ 
        once: true, 
        margin: '0px',
        amount: 0.1 // Trigger animation when just 10% is visible
      }}
    >
      <Card className="h-full bg-white dark:bg-gray-800 border-none shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <LazyAvatar testimonial={testimonial} getInitials={getInitials} />
            <div className="ml-4">
              <h4 className="text-lg font-semibold">{testimonial.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.position}</p>
            </div>
          </div>
          <div className="relative">
            <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary opacity-20" />
            <p className="text-gray-700 dark:text-gray-300 pt-2 pl-4">
              "{testimonial.content}"
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

export default function Testimonials() {
  // Use useMemo to prevent unnecessary re-renders of the carousel items
  const testimonialItems = useMemo(() => {
    return testimonials.map((testimonial: Testimonial, index: number) => (
      <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2 pl-4">
        <TestimonialCard testimonial={testimonial} index={index} />
      </CarouselItem>
    ));
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Testimonials" 
          description="What people say about my work and collaboration"
        />
        
        <div className="mt-16">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {testimonialItems}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="relative static" />
              <CarouselNext className="relative static" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}