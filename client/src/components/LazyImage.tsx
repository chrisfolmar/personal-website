import { useState, useRef, useEffect } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  aspectRatio?: string;
  isHoverable?: boolean;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
}

/**
 * LazyImage component for consistent image loading behavior across the site
 * Provides loading states, error handling, and responsive behavior
 */
export default function LazyImage({ 
  src, 
  alt, 
  className = "", 
  containerClassName = "",
  style = {}, 
  containerStyle = {},
  objectFit = "contain",
  aspectRatio,
  isHoverable = false,
  loading = "lazy",
  width,
  height
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use Intersection Observer for improved lazy loading
  useEffect(() => {
    if (!containerRef.current || loading === 'eager') {
      setShouldLoad(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Start loading when within 200px of viewport
        threshold: 0.01
      }
    );
    
    observer.observe(containerRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [loading]);
  
  const handleLoad = () => {
    setIsLoaded(true);
    setError(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setError(true);
    if (!e.currentTarget.src.includes('?v=')) {
      e.currentTarget.src = src + `?v=${Date.now()}`;
    }
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    ...containerStyle,
    ...(aspectRatio && { aspectRatio }),
  };

  const imageStyles: React.CSSProperties = {
    objectFit,
    maxHeight: '100%',
    height: 'auto',
    ...style,
  };

  return (
    <div 
      ref={containerRef}
      className={`${containerClassName} ${!isLoaded || error ? 'bg-gray-200 dark:bg-gray-700' : ''} flex items-center justify-center w-full overflow-hidden`} 
      style={containerStyles}
    >
      {shouldLoad && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding="async"
          className={`${className} transition-opacity duration-300 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${isHoverable ? 'group-hover:scale-105 transition-transform duration-300' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          style={imageStyles}
        />
      )}
    </div>
  );
}