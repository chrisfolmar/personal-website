import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";
import ParticleBackground from "./ParticleBackground";

export default function Hero() {
  // Using optimized images that are much smaller in file size
  const profileImages = [
    "/assets/images/optimized/profile.jpg",
    "/assets/images/optimized/profile/profile1.jpg",
    "/assets/images/optimized/profile/profile2.jpg",
    "/assets/images/optimized/profile/profile3.jpg", 
    "/assets/images/optimized/profile/profile4.jpg",
    "/assets/images/optimized/profile/profile5.jpg"
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  
  // Preload images to prevent jank during rotation
  useEffect(() => {
    const preloadImages = async () => {
      const promises = profileImages.map(
        (src) => 
          new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          })
      );
      
      try {
        await Promise.all(promises);
        setImagesPreloaded(true);
      } catch {
        setImagesPreloaded(true);
      }
    };
    
    preloadImages();
  }, []);
  
  // Rotate through profile images, but only after preloading
  useEffect(() => {
    if (!imagesPreloaded) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % profileImages.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, [profileImages.length, imagesPreloaded]);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      <ParticleBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="lg:flex lg:items-center lg:justify-between">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-primary dark:text-primary mb-2 px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 dark:bg-opacity-30 rounded-full">
              Technologist | Building High-Performing Teams | Problem Solver
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Hi, I'm <span className="text-primary">Chris Folmar</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Leveraging technology and leadership to deliver impactful solutions and grow teams with purpose.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#projects" 
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                View My Work
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-300 dark:border-gray-700 transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="hidden lg:block flex-shrink-0 mt-12 lg:mt-0 lg:ml-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-72 h-72 rounded-full bg-gradient-to-r from-primary to-accent p-1 shadow-lg">
              <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center overflow-hidden">
                {/* Optimized profile image with fade transition */}
                <div className="w-full h-full relative">
                  <img 
                    src={profileImages[currentImageIndex]} 
                    alt="Chris Folmar" 
                    className="w-full h-full object-cover"
                    width="400"
                    height="400"
                    loading="eager" 
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.src = profileImages[0];
                    }}
                    style={{
                      transition: 'opacity 0.5s ease-in-out',
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            y: [0, 5, 0]
          }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
          whileHover={{ y: 3 }}
        >
          <a 
            href="#about" 
            aria-label="Scroll to About section" 
            className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
          >
            <ArrowDown className="h-6 w-6" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
