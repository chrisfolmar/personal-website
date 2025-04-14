import * as React from "react"

// Define breakpoints for different device sizes
const MOBILE_BREAKPOINT = 480
const TABLET_BREAKPOINT = 1024

// Device type enum for better type safety
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

// Apply animation classes based on device type
const updateAnimationClass = (deviceType: DeviceType) => {
  const htmlEl = document.documentElement;
  
  // Always remove the temporary loading state
  htmlEl.classList.remove('loading');
  
  // Remove all device-specific classes first
  htmlEl.classList.remove('mobile-device', 'tablet-device', 'desktop-device');
  
  // Add the appropriate class for the current device
  htmlEl.classList.add(`${deviceType}-device`);
};

// Initial setup - add loading class to prevent flashing during initial render
if (typeof window !== 'undefined') {
  document.documentElement.classList.add('loading');
}

// Detect current device type based on window width
function detectDeviceType(): DeviceType {
  if (typeof window === 'undefined') return 'desktop'; // SSR fallback
  
  const width = window.innerWidth;
  if (width < MOBILE_BREAKPOINT) return 'mobile';
  if (width < TABLET_BREAKPOINT) return 'tablet';
  return 'desktop';
}

// Hook to check if the current device is mobile
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    const checkMobile = () => {
      const deviceType = detectDeviceType();
      setIsMobile(deviceType === 'mobile');
    };
    
    // Check immediately
    checkMobile();
    
    // Set up listener for window resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
}

// Hook to get the current device type (mobile, tablet, desktop)
export function useDeviceType() {
  const [deviceType, setDeviceType] = React.useState<DeviceType>('desktop');
  const firstRenderRef = React.useRef(true);
  
  React.useEffect(() => {
    const initialDeviceType = detectDeviceType();
    setDeviceType(initialDeviceType);
    
    const checkDeviceType = () => {
      const newDeviceType = detectDeviceType();
      setDeviceType(newDeviceType);
      updateAnimationClass(newDeviceType);
    };
    
    // Set up listener for window resize
    window.addEventListener('resize', checkDeviceType);
    
    // Enable animations after a delay to allow initial rendering to complete
    const enableAnimationsTimeout = setTimeout(() => {
      updateAnimationClass(initialDeviceType);
      firstRenderRef.current = false;
    }, 500);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkDeviceType);
      clearTimeout(enableAnimationsTimeout);
    };
  }, []);
  
  return deviceType;
}
