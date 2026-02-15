import * as React from "react"

const MOBILE_BREAKPOINT = 480
const TABLET_BREAKPOINT = 1024

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

const updateAnimationClass = (deviceType: DeviceType) => {
  const htmlEl = document.documentElement;
  
  htmlEl.classList.remove('loading');
  htmlEl.classList.remove('mobile-device', 'tablet-device', 'desktop-device');
  htmlEl.classList.add(`${deviceType}-device`);
};

if (typeof window !== 'undefined') {
  document.documentElement.classList.add('loading');
}

function detectDeviceType(): DeviceType {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < MOBILE_BREAKPOINT) return 'mobile';
  if (width < TABLET_BREAKPOINT) return 'tablet';
  return 'desktop';
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    const checkMobile = () => {
      const deviceType = detectDeviceType();
      setIsMobile(deviceType === 'mobile');
    };
    
    checkMobile();
    
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobile, 150);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);
  
  return isMobile;
}

export function useDeviceType() {
  const [deviceType, setDeviceType] = React.useState<DeviceType>(() => {
    if (typeof window !== 'undefined') return detectDeviceType();
    return 'desktop';
  });
  const firstRenderRef = React.useRef(true);
  
  React.useEffect(() => {
    const initialDeviceType = detectDeviceType();
    setDeviceType(initialDeviceType);
    
    let resizeTimer: ReturnType<typeof setTimeout>;
    const checkDeviceType = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newDeviceType = detectDeviceType();
        setDeviceType(newDeviceType);
        updateAnimationClass(newDeviceType);
      }, 150);
    };
    
    window.addEventListener('resize', checkDeviceType);
    
    const enableAnimationsTimeout = setTimeout(() => {
      updateAnimationClass(initialDeviceType);
      firstRenderRef.current = false;
    }, 500);
    
    return () => {
      window.removeEventListener('resize', checkDeviceType);
      clearTimeout(enableAnimationsTimeout);
      clearTimeout(resizeTimer);
    };
  }, []);
  
  return deviceType;
}