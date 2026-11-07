import React, { useState, useEffect } from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'light' | 'dark' | 'adaptive';
  height?: number;
  imageUrl?: string;
  alt?: string;
}

// =========================================================================
// SaroHub Official Emblem Vector Component (Image 2: Standalone Emblem Mark)
// Precise reproduction of the user's uploaded official emblem mark
// =========================================================================
export function SaroHubEmblem({
  height = 48,
  className = "",
  fill = "#FFFFFF"
}: {
  height?: number;
  className?: string;
  fill?: string;
}) {
  const width = Math.round(height * (520 / 840));

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 520 840"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="SaroHub Emblem"
    >
      <g fill={fill}>
        {/* Shape 1: Top-Left Aerodynamic Blade / Wing */}
        <path d="M 365 8
                 C 374 15 370 26 356 38
                 L 74 554
                 C 52 588 22 576 10 538
                 C 0 495 2 410 45 295
                 C 95 165 210 60 330 14
                 C 345 8 358 4 365 8 Z" />

        {/* Shape 2: Main Body with Crest, Wing/Beak, and Bottom Loop */}
        <path d="M 390 66
                 C 418 20 454 14 485 44
                 C 516 75 520 180 500 320
                 C 488 400 482 432 518 456
                 C 524 460 520 466 508 468
                 C 475 474 412 470 386 460
                 C 374 455 368 466 376 476
                 C 420 535 464 610 445 710
                 C 420 810 325 835 240 825
                 C 155 815 118 730 115 650
                 C 112 580 156 540 215 540
                 L 390 66 Z" />

        {/* Shape 3: Nestled Circular Dot */}
        <circle cx="302" cy="744" r="54" />
      </g>
    </svg>
  );
}

// =========================================================================
// LogoIcon: Exact reproduction of Image 1 ("final company logo dodne.png")
// Cropped to tight 1440x840 bounding box (zero wasted margins) for maximum size
// =========================================================================
export function LogoIcon({
  className = "",
  height = 54,
  showText = true,
  fill = "#FFFFFF"
}: {
  className?: string;
  height?: number;
  showText?: boolean;
  fill?: string;
}) {
  const width = Math.round(height * (showText ? 1.714 : 0.619));

  if (!showText) {
    return <SaroHubEmblem height={height} className={className} />;
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1440 840"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-200 select-none ${className}`}
      style={{ height: `${height}px`, width: `${width}px` }}
      aria-label="SAROHUB TECHNOLOGIES"
    >
      {/* Left: Official SaroHub Emblem Mark */}
      <g transform="translate(10, 0)" fill={fill}>
        <path d="M 365 8
                 C 374 15 370 26 356 38
                 L 74 554
                 C 52 588 22 576 10 538
                 C 0 495 2 410 45 295
                 C 95 165 210 60 330 14
                 C 345 8 358 4 365 8 Z" />

        <path d="M 390 66
                 C 418 20 454 14 485 44
                 C 516 75 520 180 500 320
                 C 488 400 482 432 518 456
                 C 524 460 520 466 508 468
                 C 475 474 412 470 386 460
                 C 374 455 368 466 376 476
                 C 420 535 464 610 445 710
                 C 420 810 325 835 240 825
                 C 155 815 118 730 115 650
                 C 112 580 156 540 215 540
                 L 390 66 Z" />

        <circle cx="302" cy="744" r="54" />
      </g>

      {/* Right: Authentic Brand Typography (Image 1: Pure White, Big, Bold) */}
      <g transform="translate(560, 0)">
        <text
          x="0"
          y="520"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', 'Arial Black', sans-serif"
          fontSize="240"
          fontWeight="900"
          letterSpacing="5"
          fill={fill}
        >
          SAROHUB
        </text>
        <text
          x="6"
          y="685"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
          fontSize="96"
          fontWeight="700"
          letterSpacing="24"
          fill={fill}
        >
          TECHNOLOGIES
        </text>
      </g>
    </svg>
  );
}

export default function Logo({
  className = "",
  showText = true,
  variant = "adaptive",
  height = 54,
  imageUrl,
  alt = "SAROHUB TECHNOLOGIES"
}: LogoProps) {
  const getGlobalLogo = (): string => {
    if (typeof window !== 'undefined' && (window as any).__SAROHUB_LOGO__) {
      return (window as any).__SAROHUB_LOGO__;
    }
    return '';
  };

  const [currentSrc, setCurrentSrc] = useState<string>(() => {
    return imageUrl || getGlobalLogo() || '/assets/sarohub-logo.png';
  });
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setLoadError(false);
    if (imageUrl) {
      setCurrentSrc(imageUrl);
      return;
    }
    const globalLogo = getGlobalLogo();
    if (globalLogo) {
      setCurrentSrc(globalLogo);
    }
    const handleUpdate = () => {
      const updated = getGlobalLogo();
      if (updated) {
        setCurrentSrc(updated);
        setLoadError(false);
      }
    };
    window.addEventListener('sarohub-data-updated', handleUpdate);
    return () => window.removeEventListener('sarohub-data-updated', handleUpdate);
  }, [imageUrl]);

  // Determine if this is a custom external override image (e.g. from an external CMS or custom upload)
  const isCustomUploadedImage = Boolean(
    currentSrc &&
    !currentSrc.includes('/assets/sarohub-logo') &&
    !currentSrc.includes('/assets/sarohub-emblem') &&
    !currentSrc.endsWith('sarohub-logo.png') &&
    !currentSrc.endsWith('sarohub-logo.svg')
  );

  // If load error or default official logo is requested, render pristine vector SVG directly
  if (loadError || !isCustomUploadedImage) {
    return (
      <div className={`flex items-center select-none ${className}`} style={{ height: `${height}px` }}>
        <LogoIcon height={height} showText={showText} fill={variant === 'light' ? '#12202A' : '#F3F8FA'} />
      </div>
    );
  }

  return (
    <div className={`flex items-center select-none ${className}`} style={{ height: `${height}px` }}>
      <img
        src={isCustomUploadedImage ? `${currentSrc}${currentSrc.includes('?') ? '&' : '?'}v=${Date.now()}` : currentSrc}
        alt={alt}
        className="h-full w-auto object-contain max-w-90"
        style={{
          height: `${height}px`,
          maxHeight: `${height}px`,
          filter: variant === 'dark' ? 'brightness(0) invert(1)' : undefined,
        }}
        onError={() => {
          setLoadError(true);
        }}
      />
    </div>
  );
}
