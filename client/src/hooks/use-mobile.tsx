import * as React from "react"

const MOBILE_BREAKPOINT = 768

// Apply/remove animation classes to the html element based on mobile state
const updateAnimationClass = (isMobile: boolean) => {
  const htmlEl = document.documentElement;
  
  // Always remove the temporary loading state
  htmlEl.classList.remove('loading');
  
  if (isMobile) {
    // For mobile, add a mobile-optimized class instead of disabling animations entirely
    htmlEl.classList.add('mobile-animations');
    htmlEl.classList.remove('desktop-animations');
  } else {
    // For desktop, ensure full animations are enabled
    htmlEl.classList.add('desktop-animations');
    htmlEl.classList.remove('mobile-animations');
  }
};

// Initial setup - add loading class to prevent flashing during initial render
if (typeof window !== 'undefined') {
  document.documentElement.classList.add('loading');
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  const firstRenderRef = React.useRef(true);

  React.useEffect(() => {
    // Set initial state immediately to prevent layout shift
    const initialMobile = window.innerWidth < MOBILE_BREAKPOINT;
    setIsMobile(initialMobile);
    
    // Create the media query list
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Handler for changes to the media query
    const onChange = () => {
      const newIsMobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(newIsMobile);
      updateAnimationClass(newIsMobile);
    }
    
    // Add listener
    mql.addEventListener("change", onChange)
    
    // Enable animations after a delay to allow initial rendering to complete
    const enableAnimationsTimeout = setTimeout(() => {
      updateAnimationClass(initialMobile);
      firstRenderRef.current = false;
    }, 500);
    
    // Cleanup
    return () => {
      mql.removeEventListener("change", onChange);
      clearTimeout(enableAnimationsTimeout);
    }
  }, [])

  return !!isMobile
}
