/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
// @ts-expect-error - image asset loaded via Vite
import socialMediaPreview from '../assets/images/social_media_preview_1780085643634.png';
// @ts-expect-error - image asset loaded via Vite
import creativePreview from '../assets/images/creative_preview_1780085762850.png';

interface SubService {
  name: string;
}

interface ServiceItem {
  number: string;
  name: string;
  thumbnail: string;
  description: string;
  subServices: SubService[];
}

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const toggleService = (index: number) => {
    if (hoveredIndex === index) {
      setHoveredIndex(null);
    } else {
      setHoveredIndex(index);
    }
  };

  const services: ServiceItem[] = [
    {
      number: '01',
      name: 'Social Media',
      thumbnail: socialMediaPreview,
      description: 'Consistent, designed content for your business — posted regularly so your customers always see you active. We handle Instagram and Facebook for local businesses across Karachi.',
      subServices: [
        { name: 'Monthly content calendar & scheduling' },
        { name: 'Designed posts, stories & short Reels' },
        { name: 'Urdu-English captions written for you' },
        { name: 'Comment & message monitoring' }
      ]
    },
    {
      number: '02',
      name: 'Creative',
      thumbnail: creativePreview,
      description: 'Your brand\'s visuals — done professionally. From social media graphics to printed flyers, we make your business look the part online and on the street.',
      subServices: [
        { name: 'Canva-designed social media graphics' },
        { name: 'Product & service promotional creatives' },
        { name: 'Flyer & banner design for print' },
        { name: 'Brand colours, fonts & visual consistency' }
      ]
    },
    {
      number: '03',
      name: 'Paid Media',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=650&auto=format&fit=crop',
      description: 'Put your business in front of the right people in Karachi. We run targeted Facebook and Instagram ads that bring real enquiries — not just likes.',
      subServices: [
        { name: 'Facebook & Instagram ad campaigns' },
        { name: 'Local area & interest-based targeting' },
        { name: 'Ad copy & creative included' },
        { name: 'Monthly spend & results report' }
      ]
    },
    {
      number: '04',
      name: 'SEO',
      thumbnail: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=650&auto=format&fit=crop',
      description: 'When someone searches for your business type in Karachi, we make sure your name shows up. Local visibility — done right.',
      subServices: [
        { name: 'Google Business Profile setup & optimisation' },
        { name: 'Appear on Google Maps searches' },
        { name: 'Local keyword targeting for your area' },
        { name: 'Regular listing updates & photo uploads' }
      ]
    },
    {
      number: '05',
      name: 'Web & Tech',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=650&auto=format&fit=crop',
      description: 'A clean, mobile-friendly website built for your business — with your name, your photos, and your services. No templates that look like everyone else\'s.',
      subServices: [
        { name: 'Custom 5 to 12-page website' },
        { name: 'WhatsApp button & contact form built in' },
        { name: 'Google Maps & social media integrated' },
        { name: 'Delivered in 5–7 working days' }
      ]
    }
  ];

  return (
    <section 
      id="services" 
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent text-[#E8E8F0] overflow-hidden transition-colors duration-200"
    >
      {/* Ambient background glows matching theme */}
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] rounded-full bg-[#7B6CF6]/5 opacity-25 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[300px] h-[300px] rounded-full bg-[#00D4AA]/5 opacity-20 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header block with elegant brand accents */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-800 pb-12 mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold font-mono uppercase tracking-[0.2em] text-[#7B6CF6] block mb-3">
              Strategic Growth Capabilities
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white">
              Our Key <span className="bg-gradient-to-r from-[#7B6CF6] to-[#00D4AA] bg-clip-text text-transparent">Services.</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-sm sm:text-base text-neutral-400 font-sans font-light leading-relaxed">
              We leverage custom design, maps localization, and high-conversion paid structures to build maximum local brand authority.
            </p>
          </div>
        </div>

        {/* Elegant Vertical Cards Stack: Only one opens at custom cursor hover or click */}
        <div className="grid grid-cols-1 gap-3.5 relative z-10">
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;

            // Sleek corner glowing accent pairs matching our brand palette
            const glowAccent = index % 2 === 0 
              ? 'from-[#7B6CF6]/15 to-transparent' 
              : 'from-[#00D4AA]/15 to-transparent';

            return (
              <motion.div
                layout="position"
                key={service.number}
                className={`velra-glass-card group p-5 sm:p-6 relative overflow-hidden transition-[background-color,border-color,box-shadow] duration-500 hover:translate-y-[-2px] ${
                  isHovered ? 'border-[#7B6CF6]/40 shadow-[0_12px_36px_rgba(123,94,248,0.15)] bg-[rgba(22,16,47,0.55)]' : 'hover:border-[#7161ec]/30 hover:bg-[rgba(22,16,47,0.45)]'
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Corner radial glow pattern matching the How We Work card theme */}
                <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${glowAccent} opacity-30 rounded-bl-full pointer-events-none transition-opacity duration-300 group-hover:opacity-50`} />

                {/* Main Heading Row - Always Visible in the List */}
                <div 
                  onClick={() => toggleService(index)}
                  className="flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-6 sm:gap-12 grow">
                    {/* Number label */}
                    <span className="font-mono text-sm sm:text-base font-bold text-neutral-500 group-hover:text-[#7B6CF6] tracking-wider transition-colors duration-300">
                      {service.number}
                    </span>

                    {/* Service Name Display */}
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold tracking-tight text-neutral-300 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300">
                      {service.name}
                    </h3>
                  </div>

                  {/* Icon Indicator */}
                  <div className={`w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-500 transition-all duration-300 ${isHovered ? 'bg-[#7B6CF6] text-white border-[#7B6CF6]' : 'group-hover:border-[#7b6cf6] group-hover:text-[#7b6cf6]'}`}>
                    {isHovered ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>

                {/* Expanded Zone - smooth scale collapse */}
                <AnimatePresence initial={false}>
                  {isHovered && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
                        
                        {/* Left/Middle Column: Description & Image Preview */}
                        <div className="lg:col-span-7 flex flex-col md:flex-row gap-5 justify-between items-start">
                          <div className="flex-1">
                            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans font-light max-w-lg mb-4">
                              {service.description}
                            </p>
                          </div>
                          
                          {/* Image preview of creative work */}
                          <div className="relative w-full md:w-36 h-24 rounded-lg overflow-hidden shrink-0 border border-white/5 shadow-md shadow-black/60">
                            <img 
                              src={service.thumbnail} 
                              alt={service.name} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover grayscale-[30%] hover:scale-105 hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#070707]/60 to-transparent" />
                          </div>
                        </div>

                        {/* Right Column: Capabilities sub List with gold/neon teal indicators */}
                        <div className="lg:col-span-5 bg-[#0B0816]/50 rounded-xl p-4 border border-[rgba(123,94,248,0.15)] backdrop-blur-md">
                          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#00D4AA] block mb-2.5 font-semibold">
                            Capabilities Index
                          </span>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                            {service.subServices.map((sub, sIdx) => (
                              <div 
                                key={sIdx}
                                className="flex items-center gap-2 py-0.5"
                              >
                                <div className="w-4 h-4 rounded bg-[#00D4AA]/10 flex items-center justify-center shrink-0 text-[#00D4AA]">
                                  <ArrowUpRight className="w-2.5 h-2.5" />
                                </div>
                                <span className="text-xs text-neutral-300 font-medium font-sans truncate">
                                  {sub.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
