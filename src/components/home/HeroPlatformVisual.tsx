import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Code2, Sparkles } from 'lucide-react';

export default function HeroPlatformVisual() {
  return (
    <div className="hero-venture-visual">
      <div className="hero-venture-orbit hero-venture-orbit-outer" aria-hidden="true" />
      <div className="hero-venture-orbit hero-venture-orbit-inner" aria-hidden="true" />
      <div className="hero-laptop-orb" aria-hidden="true" />
      <div className="hero-circuit-map" aria-hidden="true">
        <span className="hero-circuit-trace hero-circuit-trace-top" />
        <span className="hero-circuit-trace hero-circuit-trace-bottom" />
        <span className="hero-circuit-node hero-circuit-node-top" />
        <span className="hero-circuit-node hero-circuit-node-bottom" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 22, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        className="hero-laptop"
      >
        <div className="hero-laptop-screen">
          <div className="hero-browser-bar">
            <span className="hero-browser-dots"><i /><i /><i /></span>
            <span className="hero-browser-address">sarohub.com / ventures</span>
            <span className="hero-browser-menu">...</span>
          </div>
          <div className="hero-screen-nav">
            <span className="hero-screen-brand"><span>SH</span> SAROHUB</span>
            <span>VENTURES</span><span>STUDIO</span><span>ABOUT</span>
            <span className="hero-screen-nav-cta">LET'S BUILD <ArrowUpRight size={11} /></span>
          </div>
          <div className="hero-screen-content">
            <div className="hero-screen-copy">
              <span className="hero-screen-kicker"><Code2 size={12} /> IDEAS, ENGINEERED</span>
              <h2>Build what's<br /><span>next.</span></h2>
              <p>Thoughtful software and bold new ventures, made for the real world.</p>
              <span className="hero-screen-link">EXPLORE OUR WORK <ArrowUpRight size={12} /></span>
              <div className="hero-screen-proof"><span>01</span> Research <i /> Design <i /> Build</div>
            </div>
            <div className="hero-screen-art" aria-hidden="true">
              <div className="hero-screen-art-orbit" />
              <div className="hero-screen-art-card">
                <span className="hero-screen-art-icon"><Sparkles size={16} /></span>
                <span className="hero-screen-art-label">NEW VENTURE</span>
                <span className="hero-screen-art-line" />
                <span className="hero-screen-art-line short" />
                <span className="hero-screen-art-foot"><i /> IN DEVELOPMENT</span>
              </div>
              <span className="hero-screen-art-dot hero-screen-art-dot-one" />
              <span className="hero-screen-art-dot hero-screen-art-dot-two" />
            </div>
          </div>
        </div>
        <div className="hero-laptop-base"><span /></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="hero-visual-note"
      >
        <span><Sparkles size={13} /></span>
        <span>BUILT FOR WHAT'S NEXT</span>
      </motion.div>
    </div>
  );
}
