import { useRef, useEffect, useState } from 'react';

/**
 * Check if we're running in a browser environment
 */
const isBrowser = typeof window !== 'undefined';

/**
 * Check if reduced motion is preferred by the user
 */
const prefersReducedMotion = isBrowser ? 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

/**
 * Custom hook to handle intersection-based animations with improved performance
 * 
 * @param options Configuration options for the Intersection Observer
 * @returns A ref to attach to the element you want to observe
 */
export function useIntersectionAnimation(options = {
  threshold: 0.1,
  rootMargin: '0px',
  animationClass: 'animate-in',
  once: true,
  // New: Allow forcing animation state on or off
  disabled: false
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Handle the case where animations should be disabled for performance reasons
  const shouldDisableAnimation = options.disabled || prefersReducedMotion;

  useEffect(() => {
    // If animations are disabled or we're not in a browser, don't set up observers
    if (shouldDisableAnimation || !isBrowser) {
      setIsVisible(true);
      return;
    }
    
    const currentRef = ref.current;
    if (!currentRef) return;

    // Optimization: Apply animate-in class directly for elements above the fold
    // This helps with initial render flashing on mobile
    const rect = currentRef.getBoundingClientRect();
    const isAboveTheFold = rect.top < window.innerHeight;
    
    if (isAboveTheFold) {
      // Small delay to ensure proper rendering
      const timer = setTimeout(() => {
        currentRef.classList.add(options.animationClass);
        setIsVisible(true);
      }, 50);
      
      return () => clearTimeout(timer);
    }

    // For elements below the fold, use intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // When element enters the viewport
        if (entry.isIntersecting) {
          // Apply animation class after a minimal delay to ensure smooth transition
          requestAnimationFrame(() => {
            entry.target.classList.add(options.animationClass);
            setIsVisible(true);
          });
          
          // If once is true, stop observing after animation is triggered
          if (options.once) {
            observer.unobserve(entry.target);
          }
        } else if (!options.once) {
          // If not "once" mode, remove the class when element leaves viewport
          requestAnimationFrame(() => {
            entry.target.classList.remove(options.animationClass);
            setIsVisible(false);
          });
        }
      });
    }, {
      threshold: options.threshold,
      rootMargin: options.rootMargin
    });

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [
    options.threshold, 
    options.rootMargin, 
    options.animationClass, 
    options.once, 
    options.disabled, 
    shouldDisableAnimation
  ]);

  // If animations are disabled, add the animation class immediately
  useEffect(() => {
    if (shouldDisableAnimation && ref.current) {
      ref.current.classList.add(options.animationClass);
      setIsVisible(true);
    }
  }, [options.animationClass, shouldDisableAnimation]);

  return { ref, isVisible };
}