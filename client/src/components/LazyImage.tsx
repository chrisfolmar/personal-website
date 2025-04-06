import { useState, useRef } from "react";

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
  isHoverable = false
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const handleLoad = () => {
    setIsLoaded(true);
    setError(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error(`Failed to load image: ${src}`);
    // Try with cache-busting
    setError(true);
    e.currentTarget.src = src + `?v=${Date.now()}`;
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
      className={`${containerClassName} ${!isLoaded || error ? 'animate-pulse' : ''} flex items-center justify-center w-full`} 
      style={containerStyles}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${className} transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${isHoverable ? 'group-hover:scale-105' : ''}`}
        onLoad={handleLoad}
        onError={handleError}
        style={imageStyles}
      />
    </div>
  );
}