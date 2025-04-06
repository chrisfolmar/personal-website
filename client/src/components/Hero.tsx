import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import ParticleBackground from "./ParticleBackground";

export default function Hero() {
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
              Software Engineer
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Hi, I'm <span className="text-primary">Your Name</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              I build exceptional digital experiences with modern technologies.
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
                {/* Profile image placeholder */}
                <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-600 text-xl font-medium">Your Profile Image</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ y: 3 }}
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
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
