import { useRef, useEffect } from 'react';

/**
 * Custom hook to handle intersection-based animations
 * 
 * @param options Configuration options for the Intersection Observer
 * @returns A ref to attach to the element you want to observe
 */
export function useIntersectionAnimation(options = {
  threshold: 0.1,
  rootMargin: '0px',
  animationClass: 'animate-in',
  once: true
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // When element enters the viewport
        if (entry.isIntersecting) {
          entry.target.classList.add(options.animationClass);
          
          // If once is true, stop observing after animation is triggered
          if (options.once) {
            observer.unobserve(entry.target);
          }
        } else if (!options.once) {
          // If not "once" mode, remove the class when element leaves viewport
          entry.target.classList.remove(options.animationClass);
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
  }, [options.threshold, options.rootMargin, options.animationClass, options.once]);

  return ref;
}