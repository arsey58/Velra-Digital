/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onSeeHowWeWork: () => void;
}

export default function Hero({ onGetStarted, onSeeHowWeWork }: HeroProps) {
  return (
    <div 
      id="home" 
      className="relative min-h-screen pt-24 pb-12 sm:pt-28 md:pt-32 flex flex-col justify-center items-center overflow-hidden bg-transparent transition-all animate-fade-in"
    >
      {/* Brand Violet-Teal Radial Glow center under text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#7B6CF6]/8 opacity-30 blur-[130px] pointer-events-none" />


      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center px-4 select-none">
        
        {/* Sub-badge: Karachi Presence in Neon Teal and Midnight Violet */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#7B6CF6]/30 bg-[#070707]/60 text-[#00D4AA] text-xs font-mono tracking-[0.2em] uppercase mb-6 backdrop-blur-md shadow-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4AA] animate-pulse" />
          Karachi Presence Established
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="font-bebas text-white leading-none tracking-wider select-none text-center flex flex-col"
        >
          <span className="text-[6rem] sm:text-[9rem] md:text-[11rem] lg:text-[13rem] xl:text-[16rem] font-bold bg-gradient-to-r from-[#7B6CF6] via-[#4d94ff] to-[#00D4AA] bg-clip-text text-transparent filter drop-shadow-[0_2px_24px_rgba(123,94,248,0.25)] leading-none select-none uppercase">
            VELRA
          </span>
        </motion.h1>

        {/* Elegant Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed text-center font-sans font-light tracking-wide"
        >
          Powering dominant digital presence for premium brands —{' '}
          <span className="text-white font-semibold">Seamlessly fusing Web Development, Social Marketing, and instant WhatsApp & Google Maps connectivity into one powerhouse strategy.</span>
        </motion.p>

        {/* Remapped CTAs with Luxury Purple and Teal Accents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md"
        >
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-10 py-4 rounded-xl text-xs font-bold font-mono tracking-[0.15em] uppercase bg-gradient-to-r from-[#7B6CF6] to-[#00D4AA] text-white hover:brightness-110 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] shadow-[0_8px_32px_rgba(123,94,248,0.35)] cursor-pointer outline-none"
          >
            Explore Services
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={onSeeHowWeWork}
            className="w-full sm:w-auto px-10 py-4 rounded-xl text-xs font-bold font-mono tracking-[0.15em] uppercase border border-[#7B6CF6]/40 text-[#7B6CF6] bg-transparent hover:bg-[#7b6cf6]/10 flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer outline-none hover:text-[#00D4AA] hover:border-[#00D4AA] hover:shadow-[0_4px_16px_rgba(0,212,170,0.1)]"
          >
            See How We Work
          </button>
        </motion.div>

        {/* Premium Minimalist Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-16 sm:mt-20 grid grid-cols-3 gap-6 max-w-sm md:max-w-2xl w-full border border-[rgba(123,94,248,0.25)] bg-[#070707]/80 backdrop-blur-md p-5 rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.8)]"
        >
          <div className="text-center p-1">
            <div className="text-2xl sm:text-3xl font-bebas font-bold text-white tracking-widest bg-gradient-to-r from-[#7B6CF6] to-[#9F94FC] bg-clip-text text-transparent">100%</div>
            <div className="text-[10px] text-neutral-400 mt-1 uppercase tracking-widest font-mono font-medium">Bespoke Design</div>
          </div>
          <div className="text-center border-x border-[rgba(123,94,248,0.18)] p-1">
            <div className="text-2xl sm:text-3xl font-bebas font-bold text-[#00D4AA] tracking-widest">5K+ PKR</div>
            <div className="text-[10px] text-neutral-400 mt-1 uppercase tracking-widest font-mono font-medium">Entry Baseline</div>
          </div>
          <div className="text-center p-1">
            <div className="text-2xl sm:text-3xl font-bebas font-bold text-white tracking-widest bg-gradient-to-r from-[#00D4AA] to-[#7B6CF6] bg-clip-text text-transparent">PRO LEVEL</div>
            <div className="text-[10px] text-neutral-400 mt-1 uppercase tracking-widest font-mono font-medium">Map Supremacy</div>
          </div>
        </motion.div>
      </div>

      {/* Bounce scroll helper */}
      <div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce text-neutral-400 hover:text-[#00D4AA] transition-colors cursor-pointer" 
        onClick={onGetStarted}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-mono">Our Offerings</span>
        <ChevronDown className="w-4 h-4 text-[#00D4AA]" />
      </div>
    </div>
  );
}
