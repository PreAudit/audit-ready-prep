import React, { useState, useRef, useEffect, ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  webpSrc?: string;
  priority?: boolean;
  fallbackSrc?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
}

export const OptimizedImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({
    src,
    alt,
    webpSrc,
    priority = false,
    fallbackSrc,
    placeholder = 'empty',
    blurDataURL,
    className,
    onLoad,
    onError,
    sizes,
    quality = 75,
    ...props
  }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const imgRef = useRef<HTMLImageElement>(null);

    // Intersection Observer for lazy loading
    useEffect(() => {
      if (priority || isInView) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.disconnect();
            }
          });
        },
        { 
          rootMargin: '50px',
          threshold: 0.1
        }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    }, [priority, isInView]);

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setIsLoaded(true);
      onLoad?.(e);
    };

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setHasError(true);
      onError?.(e);
    };

    // Generate srcset for responsive images
    const generateSrcSet = (baseSrc: string) => {
      const extensions = ['.jpg', '.jpeg', '.png', '.webp'];
      const extension = extensions.find(ext => baseSrc.toLowerCase().endsWith(ext));
      
      if (!extension) return baseSrc;
      
      const baseName = baseSrc.slice(0, -extension.length);
      return [
        `${baseName}@0.5x${extension} 0.5x`,
        `${baseName}@1x${extension} 1x`,
        `${baseName}@2x${extension} 2x`
      ].join(', ');
    };

    const imageSrc = hasError && fallbackSrc ? fallbackSrc : src;
    const shouldLoad = priority || isInView;

    return (
      <div 
        ref={imgRef}
        className={cn(
          'relative overflow-hidden',
          className
        )}
      >
        {/* Placeholder */}
        {placeholder === 'blur' && blurDataURL && !isLoaded && (
          <img
            src={blurDataURL}
            alt=""
            className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
            aria-hidden="true"
          />
        )}

        {/* Skeleton placeholder */}
        {!isLoaded && placeholder === 'empty' && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}

        {/* Main image */}
        {shouldLoad && (
          <picture>
            {/* WebP source */}
            {webpSrc && (
              <source
                srcSet={generateSrcSet(webpSrc)}
                type="image/webp"
                sizes={sizes}
              />
            )}
            
            {/* Fallback image */}
            <img
              ref={ref}
              src={imageSrc}
              alt={alt}
              srcSet={generateSrcSet(imageSrc)}
              sizes={sizes}
              onLoad={handleLoad}
              onError={handleError}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              className={cn(
                'w-full h-full object-cover transition-opacity duration-300',
                isLoaded ? 'opacity-100' : 'opacity-0',
                hasError && 'opacity-50'
              )}
              {...props}
            />
          </picture>
        )}

        {/* Loading indicator */}
        {!isLoaded && shouldLoad && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/50 text-muted-foreground">
            <svg
              className="w-8 h-8 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <span className="text-xs">Failed to load</span>
          </div>
        )}
      </div>
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';