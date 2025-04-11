import * as React from "react"

const MOBILE_BREAKPOINT = 768

// Apply/remove the no-animate class to the html element based on mobile state
const updateAnimationClass = (isMobile: boolean) => {
  const htmlEl = document.documentElement;
  if (isMobile) {
    htmlEl.classList.add('no-animate');
  } else {
    // Small delay to allow the DOM to stabilize before enabling animations
    setTimeout(() => {
      htmlEl.classList.remove('no-animate');
    }, 100);
  }
};

// Initial setup - disable animations initially to prevent flashing
if (typeof window !== 'undefined') {
  document.documentElement.classList.add('no-animate');
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  const firstRenderRef = React.useRef(true);

  React.useEffect(() => {
    // Set initial state immediately to prevent layout shift
    const initialMobile = window.innerWidth < MOBILE_BREAKPOINT;
    setIsMobile(initialMobile);
    
    // Always disable animations initially
    document.documentElement.classList.add('no-animate');
    
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
