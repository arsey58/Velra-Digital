/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Search, Hammer, TrendingUp } from 'lucide-react';

export default function HowWeWork() {
  const steps = [
    {
      number: '01',
      title: 'We Find You',
      tagline: 'Spotting the Gaps',
      description: 'We identify local Karachi businesses that have no online records, dynamic websites, or look invisible in search engine results.',
      icon: <Search className="w-6 h-6 text-[#00F5C8]" />,
      color: 'from-[#00F5C8]/20 to-transparent'
    },
    {
      number: '02',
      title: 'We Build You',
      tagline: 'The Digital Backbone',
      description: 'We construct your digital presence by establishing a custom Google Business Profile, high-speed landing page, and a professional WhatsApp Business hub.',
      icon: <Hammer className="w-6 h-6 text-[#7B5EF8]" />,
      color: 'from-[#7B5EF8]/20 to-transparent'
    },
    {
      number: '03',
      title: 'We Grow You',
      tagline: 'Continuous Amplification',
      description: 'We provide monthly SMM, custom review facilitation systems, and continuous backend and content maintenance so your customer pipeline is automated.',
      icon: <TrendingUp className="w-6 h-6 text-pink-500" />,
      color: 'from-pink-500/20 to-transparent'
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
        delay: i * 0.15
      }
    })
  };

  return (
    <section id="how-we-work" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-[#7B5EF8] opacity-[0.08] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-sm font-bold text-[#00F5C8] uppercase tracking-wider font-mono">
            Structured Workflow
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            How We Work
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#9090C0]">
            We&#39;ve engineered a simple, high-impact three-step process designed specifically to take non-digital businesses in Pakistan and transform them into market favorites.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={cardVariants}
              className="velra-glass-card group p-8 lg:p-10 relative overflow-hidden transition-all duration-300 hover:translate-y-[-6px] hover:border-[#7B5EF8]/40"
            >
              {/* Corner radial glow pattern */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${step.color} opacity-40 rounded-bl-full pointer-events-none transition-opacity group-hover:opacity-60`} />

              <div className="flex items-center justify-between mb-8">
                {/* Visual Circle Container */}
                <div className="w-12 h-12 rounded-xl bg-[#0B0816] border border-[rgba(123,94,248,0.2)] flex items-center justify-center shadow-inner group-hover:border-[#00F5C8]/50 transition-colors">
                  {step.icon}
                </div>
                {/* Number identifier */}
                <span className="text-4xl lg:text-5xl font-display font-extrabold text-[#1B182B] group-hover:text-[#7B5EF8]/30 transition-colors duration-300 select-none">
                  {step.number}
                </span>
              </div>

              {/* Tagline */}
              <span className="text-xs uppercase tracking-widest font-mono text-[#00F5C8] font-semibold">
                {step.tagline}
              </span>

              {/* Step Title */}
              <h3 className="text-2xl font-display font-extrabold text-white mt-1.5 mb-4 group-hover:text-[#00F5C8] transition-colors">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-[#A5A5C7] font-sans group-hover:text-[#E8E8F0]/90 transition-colors duration-200">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
