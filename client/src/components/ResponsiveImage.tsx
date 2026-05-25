import { useEffect, useRef, useState } from "react";

export interface ResponsiveImageSource {
  type: string;
  srcSet: string;
}

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  sources?: ResponsiveImageSource[];
  srcSet?: string;
  sizes?: string;
  className?: string;
  containerClassName?: string;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  aspectRatio?: string;
  isHoverable?: boolean;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
}

/**
 * ResponsiveImage — modern replacement for `LazyImage`.
 *
 * - Renders a `<picture>` element when `sources` (e.g. AVIF, WebP) are
 *   supplied so browsers can pick the best-supported format.
 * - Supports `srcSet` + `sizes` for resolution switching.
 * - Always requires explicit `width` + `height` to reserve layout box
 *   (CLS prevention).
 * - Defaults to `loading="lazy"`. Pass `loading="eager"` +
 *   `fetchPriority="high"` for the LCP image.
 */
export default function ResponsiveImage({
  src,
  alt,
  width,
  height,
  sources,
  srcSet,
  sizes,
  className = "",
  containerClassName = "",
  style = {},
  containerStyle = {},
  objectFit = "cover",
  aspectRatio,
  isHoverable = false,
  loading = "lazy",
  fetchPriority,
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(loading === "eager");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading === "eager" || !containerRef.current) {
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
      { rootMargin: "200px", threshold: 0.01 },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [loading]);

  const containerStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    ...containerStyle,
    ...(aspectRatio && { aspectRatio }),
  };

  const imageStyles: React.CSSProperties = {
    objectFit,
    maxHeight: "100%",
    height: "auto",
    ...style,
  };

  const imgEl = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      {...(fetchPriority ? { fetchpriority: fetchPriority } : {})}
      srcSet={srcSet}
      sizes={sizes}
      className={`${className} transition-opacity duration-300 ease-in-out ${
        isLoaded ? "opacity-100" : "opacity-0"
      } ${isHoverable ? "group-hover:scale-105 transition-transform duration-300" : ""}`}
      onLoad={() => setIsLoaded(true)}
      style={imageStyles}
    />
  );

  return (
    <div
      ref={containerRef}
      className={`${containerClassName} ${
        !isLoaded ? "bg-gray-200 dark:bg-gray-700" : ""
      } flex items-center justify-center w-full overflow-hidden`}
      style={containerStyles}
    >
      {shouldLoad &&
        (sources && sources.length > 0 ? (
          <picture>
            {sources.map((s) => (
              <source key={s.type} type={s.type} srcSet={s.srcSet} sizes={sizes} />
            ))}
            {imgEl}
          </picture>
        ) : (
          imgEl
        ))}
    </div>
  );
}
