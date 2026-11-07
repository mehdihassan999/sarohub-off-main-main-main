import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, Zap } from 'lucide-react';

interface AnimatedCompanyLogoProps {
  className?: string;
}

export default function AnimatedCompanyLogo({ className = '' }: AnimatedCompanyLogoProps) {
  const [animKey, setAnimKey] = useState(0);
  const [activeShape, setActiveShape] = useState<string | null>(null);
  const [isGlinting, setIsGlinting] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth mouse tilt parallax in 3D perspective
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: x * 14,
      y: -y * 14,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setActiveShape(null);
  };

  const replayAnimation = () => {
    setAnimKey((prev) => prev + 1);
    setIsGlinting(true);
    setTimeout(() => setIsGlinting(false), 2400);
  };

  const triggerPowerSurge = () => {
    setIsGlinting(true);
    setTimeout(() => setIsGlinting(false), 1800);
  };

  // Periodic automatic subtle shimmer sweep
  useEffect(() => {
    const timer = setInterval(() => {
      setIsGlinting(true);
      setTimeout(() => setIsGlinting(false), 1600);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-[620px] lg:max-w-[680px] flex flex-col items-center justify-center select-none py-4 sm:py-6 ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* 3D TILT CONTAINER */}
      <motion.div
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transition: 'transform 0.18s cubic-bezier(0.2, 0.8, 0.4, 1)',
          transformStyle: 'preserve-3d',
        }}
        className="w-full flex flex-col items-center justify-center relative"
      >
        {/* Soft Radial Ambient Backglow Behind Logo */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFE600]/10 via-[#FF5C00]/18 to-[#FF2A00]/12 blur-3xl rounded-full scale-125 pointer-events-none -z-10" />

        {/* PRIMARY ANIMATED LOGO CANVAS */}
        <div 
          key={animKey}
          onClick={replayAnimation}
          className="relative w-full aspect-[1100/360] max-h-[280px] flex items-center justify-center cursor-pointer group"
          title="Click to replay official logo drawing & assembly animation"
        >
          <svg
            viewBox="0 0 1100 320"
            className="w-full h-full filter drop-shadow-[0_12px_36px_rgba(255,92,0,0.32)] transition-all duration-300 group-hover:drop-shadow-[0_16px_48px_rgba(255,92,0,0.52)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="hero-gold-orange" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE600" />
                <stop offset="30%" stopColor="#FFA800" />
                <stop offset="65%" stopColor="#FF5C00" />
                <stop offset="100%" stopColor="#FF3800" />
              </linearGradient>
              <linearGradient id="emblem-shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#FFF2D6" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>

            {/* ========================================================
                OFFICIAL SAROHUB EMBLEM (LEFT LOCKUP)
               ======================================================== */}
            <g transform="translate(40, 20) scale(0.29)">
              {/* Shape 1: Top-Left Aerodynamic Blade / Wing */}
              <motion.path
                d="M 382 66
                   C 395 32 376 12 345 18
                   C 300 28 220 85 145 190
                   C 70 295 18 420 8 525
                   C 2 590 18 655 58 685
                   C 82 702 108 692 118 662
                   C 122 650 118 638 112 622
                   L 382 66 Z"
                fill="url(#emblem-shimmer)"
                initial={{ opacity: 0, x: -30, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActiveShape('blade')}
                onMouseLeave={() => setActiveShape(null)}
              />

              {/* Shape 2: Main S-Flourish Body with Crest, Beak, and Bottom Loop */}
              <motion.path
                d="M 432 58
                   C 455 24 485 18 512 36
                   C 548 60 575 118 588 200
                   C 600 280 588 380 560 460
                   C 545 500 535 525 595 558
                   C 602 562 600 572 590 575
                   C 560 585 470 595 442 590
                   C 432 588 428 596 432 606
                   C 458 665 480 735 465 810
                   C 445 905 370 955 275 958
                   C 185 960 115 905 92 825
                   C 70 750 85 660 145 580
                   C 178 535 220 480 258 430
                   L 432 58 Z"
                fill="url(#emblem-shimmer)"
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.25, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActiveShape('body')}
                onMouseLeave={() => setActiveShape(null)}
              />

              {/* Shape 3: Bottom Cradle Circle (Dot) */}
              <motion.circle
                cx="350"
                cy="855"
                r="65"
                fill="#FFFFFF"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.85,
                  type: 'spring',
                  stiffness: 320,
                  damping: 18,
                }}
                style={{ transformOrigin: '350px 855px' }}
              />
            </g>

            {/* ========================================================
                WORDMARK: SAROHUB TECHNOLOGIES (MATCHING IMAGE 1)
               ======================================================== */}
            <g transform="translate(280, 0)">
              {/* Primary Wordmark "SAROHUB" */}
              <motion.text
                x="0"
                y="180"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', 'Arial Black', sans-serif"
                fontSize="130"
                fontWeight="900"
                letterSpacing="3"
                fill="#FFFFFF"
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.95, delay: 0.65, ease: 'easeOut' }}
              >
                SAROHUB
              </motion.text>

              {/* Subtitle: TECHNOLOGIES in clean tracked caps */}
              <motion.text
                x="3"
                y="245"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
                fontSize="52"
                fontWeight="700"
                letterSpacing="16"
                fill="#FFFFFF"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.95, ease: 'easeOut' }}
              >
                TECHNOLOGIES
              </motion.text>
            </g>
          </svg>

          {/* Liquid Light Sweep Overlay */}
          <AnimatePresence>
            {isGlinting && (
              <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '200%', opacity: [0, 0.85, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
                className="absolute inset-y-0 w-36 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-25deg] pointer-events-none rounded-2xl"
              />
            )}
          </AnimatePresence>
        </div>

        {/* SUBTITLE: Autonomous Venture & AI Engineering Studio */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="mt-4 flex flex-col items-center gap-1.5"
        >
          <div className="flex items-center gap-3">
            <span className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#FF5C00]/70" />
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.38em] uppercase text-slate-300">
              SOFTWARE &amp; RESEARCH ORGANIZATION
            </span>
            <span className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#FF5C00]/70" />
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">Autonomous Venture &amp; AI Engineering Studio</span>
          </div>
        </motion.div>

        {/* INTERACTIVE CONTROLS BAR */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-5 flex items-center gap-2 bg-[#0E121E]/80 border border-white/[0.1] rounded-full p-1.5 shadow-xl backdrop-blur-md"
        >
          <button
            type="button"
            onClick={replayAnimation}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
            title="Replay full logo drawing sequence"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#FF5C00]" />
            <span>Replay Assembly</span>
          </button>

          <span className="w-[1px] h-3.5 bg-white/[0.12]" />

          <button
            type="button"
            onClick={triggerPowerSurge}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-[#FFA043] hover:text-white hover:bg-[#FF5C00]/20 transition-all cursor-pointer"
            title="Trigger light beam pulse"
          >
            <Zap className="w-3.5 h-3.5 text-[#FF5C00]" />
            <span>Power Pulse</span>
          </button>
        </motion.div>

        {/* PILLARS MINI-TAGS */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {['Venture Studio', 'AI Ecosystem', 'Enterprise Cloud'].map((pillar, i) => (
            <span
              key={i}
              className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-400"
            >
              {pillar}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
