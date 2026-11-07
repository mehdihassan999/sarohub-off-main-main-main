import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import RollText from '../common/RollText';
import DiagonalArrow from '../common/DiagonalArrow';
import HeroPlatformVisual from './HeroPlatformVisual';

const DEFAULT_TYPED_PHRASES = [
  'Where Ideas Become Technology.',
  'Software & Research Organization',
  'Websites, Mobile Apps & Online Tools',
  'Smart AI & Helpful Automation',
  'Building Helpful Products for Everyday People',
  'From Gilgit-Baltistan to the World',
];

interface HeroSectionProps {
  settings?: { [key: string]: string };
}

export default function HeroSection({ settings = {} }: HeroSectionProps) {
  const typedPhrases = useMemo(() => {
    if (settings.hero_typed_phrases) {
      const raw = settings.hero_typed_phrases.trim();
      if (raw.startsWith('[') && raw.endsWith(']')) {
        try {
          const parsed: unknown = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            const phrases = parsed.filter((phrase): phrase is string => typeof phrase === 'string' && Boolean(phrase.trim()));
            if (phrases.length > 0) return phrases;
          }
        } catch {
          // Fall back to the configured line-based format.
        }
      }
      const lines = raw.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
      if (lines.length > 0) return lines;
    }
    return DEFAULT_TYPED_PHRASES;
  }, [settings.hero_typed_phrases]);

  const heroBadge = settings.hero_badge || 'SAROHUB • SOFTWARE & RESEARCH';
  const heroHeading = settings.hero_heading || 'Where Ideas Become';
  const heroHeadingAccent = settings.hero_heading_accent || 'Technology.';
  const heroDescription = settings.hero_description ||
    'We design, build, and launch easy-to-use software that solves real everyday problems — from custom websites and mobile apps to our own technology products.';
  const primaryCtaText = settings.hero_primary_cta_text || 'Start Your Project';
  const primaryCtaLink = settings.hero_primary_cta_link || '/contact';
  const secondaryCtaText = settings.hero_secondary_cta_text || 'See Our Products';
  const secondaryCtaLink = settings.hero_secondary_cta_link || '/ventures';
  const pillar1Title = settings.hero_pillar1_title || 'Software & Apps';
  const pillar1Sub = settings.hero_pillar1_sub || 'Websites, Mobile Apps & Business Tools';
  const pillar2Title = settings.hero_pillar2_title || 'Our Own Products';
  const pillar2Sub = settings.hero_pillar2_sub || 'Learning Apps, Real Estate, Health & Sales Tools';
  const pillar3Title = settings.hero_pillar3_title || 'Research & Vision';
  const pillar3Sub = settings.hero_pillar3_sub || 'Built in the Mountains, Serving the World';

  const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = typedPhrases[currentPhraseIdx];
    const delay = isDeleting ? 28 : 62;
    let pauseTimer: ReturnType<typeof setTimeout>;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < phrase.length) {
          setCurrentText(phrase.slice(0, currentText.length + 1));
        } else {
          pauseTimer = setTimeout(() => setIsDeleting(true), 2200);
        }
      } else if (currentText.length > 0) {
        setCurrentText(phrase.slice(0, currentText.length - 1));
      } else {
        setIsDeleting(false);
        setCurrentPhraseIdx((index) => (index + 1) % typedPhrases.length);
      }
    }, delay);
    return () => {
      clearTimeout(timer);
      clearTimeout(pauseTimer);
    };
  }, [currentText, currentPhraseIdx, isDeleting, typedPhrases]);

  return (
    <section id="hero" className="site-hero relative overflow-hidden">
      <div className="hero-ambient-glow" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="hero-layout">
          <div className="hero-content flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-7"
            >
              <span className="hero-eyebrow">
                <span className="hero-eyebrow-dot" />
                {heroBadge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="hero-heading mb-6"
            >
              {heroHeading}{' '}
              <span className="hero-heading-accent">{heroHeadingAccent}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="hero-description mb-5"
            >
              {heroDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="hero-typed-line mb-8"
            >
              <span>{currentText}</span>
              <span className="hero-typing-cursor" aria-hidden="true" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="mb-8 flex flex-wrap items-center justify-start gap-3"
            >
              <Link
                to={primaryCtaLink}
                id="hero-primary-cta"
                className="hero-primary-cta group"
              >
                <RollText>{primaryCtaText.toUpperCase()}</RollText>
                <DiagonalArrow size={18} />
              </Link>
              <Link to={secondaryCtaLink} id="hero-secondary-cta" className="hero-secondary-cta">
                <RollText>{secondaryCtaText.toUpperCase()}</RollText>
              </Link>
            </motion.div>

            <div className="hero-venture-caption">
              <span className="hero-venture-caption-line" />
              <span>Ideas with the ambition to become real ventures.</span>
            </div>
          </div>

          <div className="hero-visual-wrap">
            <HeroPlatformVisual />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.42 }}
          className="hero-capabilities"
        >
          <div className="hero-capability">
            <span className="hero-capability-index">01</span>
            <div>
              <h2>{pillar1Title}</h2>
              <p>{pillar1Sub}</p>
            </div>
          </div>
          <div className="hero-capability">
            <span className="hero-capability-index">02</span>
            <div>
              <h2>{pillar2Title}</h2>
              <p>{pillar2Sub}</p>
            </div>
          </div>
          <div className="hero-capability">
            <span className="hero-capability-index">03</span>
            <div>
              <h2>{pillar3Title}</h2>
              <p>{pillar3Sub}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
