import { useState, useEffect } from 'react';

interface ImageOptimizationOptions {
  enableWebP?: boolean;
  enableLazyLoading?: boolean;
  quality?: number;
  sizes?: string;
}

export const useImageOptimization = (options: ImageOptimizationOptions = {}) => {
  const {
    enableWebP = true,
    enableLazyLoading = true,
    quality = 75,
    sizes = '100vw'
  } = options;

  const [supportsWebP, setSupportsWebP] = useState(false);
  const [supportsAvif, setSupportsAvif] = useState(false);

  // Check for modern image format support
  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('webp') > 0;
    };

    const checkAvifSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      try {
        return canvas.toDataURL('image/avif').indexOf('avif') > 0;
      } catch {
        return false;
      }
    };

    setSupportsWebP(checkWebPSupport());
    setSupportsAvif(checkAvifSupport());
  }, []);

  const getOptimizedSrc = (originalSrc: string): string => {
    if (!originalSrc) return originalSrc;

    // If it's already an optimized format, return as-is
    if (originalSrc.includes('.webp') || originalSrc.includes('.avif')) {
      return originalSrc;
    }

    const url = new URL(originalSrc, window.location.origin);
    
    // Add quality parameter
    url.searchParams.set('q', quality.toString());
    
    // Add format parameter based on support
    if (enableWebP) {
      if (supportsAvif) {
        url.searchParams.set('f', 'avif');
      } else if (supportsWebP) {
        url.searchParams.set('f', 'webp');
      }
    }

    return url.toString();
  };

  const generateSrcSet = (baseSrc: string): string => {
    const densities = [1, 1.5, 2];
    return densities
      .map(density => {
        const url = new URL(getOptimizedSrc(baseSrc), window.location.origin);
        url.searchParams.set('dpr', density.toString());
        return `${url.toString()} ${density}x`;
      })
      .join(', ');
  };

  const getImageProps = (src: string, alt: string) => ({
    src: getOptimizedSrc(src),
    srcSet: generateSrcSet(src),
    sizes,
    alt,
    loading: enableLazyLoading ? ('lazy' as const) : ('eager' as const),
    decoding: 'async' as const,
  });

  return {
    supportsWebP,
    supportsAvif,
    getOptimizedSrc,
    generateSrcSet,
    getImageProps,
  };
};