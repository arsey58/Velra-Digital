/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Check, Info, Sparkles, X } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (planName: string) => void;
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  const plans = [
    {
      name: 'Starter',
      priceRange: 'PKR 15,000',
      period: 'project',
      badge: 'Starter Package',
      description: 'Establish a powerful, responsive five-page platform tailored to drive basic local conversions for local shops and coaching centers.',
      features: [
        '5 Custom Web Pages',
        '1 Round of Design Revisions',
        'Fully Mobile Responsive',
        'Integrated Contact Form',
        'Custom Domain Setup',
        '30 Days Post-launch Support'
      ],
      notIncluded: [
        'WhatsApp chat button',
        'Google Maps embed',
        'Photo gallery / portfolio',
        'Basic SEO setup',
        'Google Business setup & Blog',
      ],
      bestFor: 'Coaching centers, small shops',
      color: 'bg-[rgba(15,11,36,0.22)] border-[#7B6CF6]/75 shadow-[0_8px_32px_rgba(123,94,248,0.15)] hover:border-[#7B6CF6] hover:shadow-[0_16px_45px_rgba(123,94,248,0.45)] backdrop-blur-md'
    },
    {
      name: 'Standard',
      priceRange: 'PKR 25,000',
      period: 'project',
      badge: 'Most Popular Choice',
      isPopular: true,
      description: 'The sweet spot. Expand into complete catalog support, local mapping embeds, basic SEO, and WhatsApp chat setups.',
      features: [
        '8 Custom Web Pages',
        '2 Rounds of Design Revisions',
        'Fully Mobile Responsive',
        'Integrated Contact Form',
        'WhatsApp Chat Button Integration',
        'Google Maps Embed',
        'Photo Gallery / Portfolio',
        'Basic SEO Setup',
        'Custom Domain Setup',
        '60 Days Post-launch Support'
      ],
      notIncluded: [
        'Google Business setup',
        'Blog / news section',
        'Online menu / catalogue'
      ],
      bestFor: 'Restaurants, boutiques',
      color: 'border-2 border-[#9B82FA] shadow-[0_12px_45px_rgba(123,94,248,0.55)] relative ring-2 ring-[#7B5EF8]/50 bg-[rgba(22,16,47,0.32)] hover:border-[#00D4AA] hover:shadow-[0_20px_55px_rgba(0,212,170,0.4)] backdrop-blur-md'
    },
    {
      name: 'Premium',
      priceRange: 'PKR 50,000',
      period: 'project',
      badge: 'Premium Plan',
      description: 'Ultimate regional dominion. Fully-loaded enterprise solution with integrated blogs, custom digital catalogue, GMB setup, and maximum post-launch support.',
      features: [
        '12+ Custom Web Pages',
        '3 Rounds of Design Revisions',
        'Fully Mobile Responsive',
        'Integrated Contact Form',
        'WhatsApp Chat Button Integration',
        'Google Maps Embed',
        'Photo Gallery / Portfolio',
        'Basic SEO Setup',
        'Google Business Setup',
        'Blog / News Section Integration',
        'Online Menu / Catalogue Support',
        'Custom Domain Setup',
        '90 Days Post-launch Support'
      ],
      notIncluded: [],
      bestFor: 'Schools, real estate, rental agencies',
      color: 'bg-[rgba(15,11,36,0.22)] border-[#00D4AA]/80 shadow-[0_12px_45px_rgba(0,212,170,0.2)] hover:border-[#00F5C8] hover:shadow-[0_20px_55px_rgba(0,245,200,0.6)] backdrop-blur-md'
    }
  ];

  const comparisonFeatures = [
    { name: 'Pages', starter: '5 pages', standard: '8 pages', premium: '12+ pages' },
    { name: 'Design revisions', starter: '1 round', standard: '2 rounds', premium: '3 rounds' },
    { name: 'Mobile responsive', starter: true, standard: true, premium: true },
    { name: 'Contact form', starter: true, standard: true, premium: true },
    { name: 'WhatsApp chat button', starter: false, standard: true, premium: true },
    { name: 'Google Maps embed', starter: false, standard: true, premium: true },
    { name: 'Photo gallery / portfolio', starter: false, standard: true, premium: true },
    { name: 'Basic SEO setup', starter: false, standard: true, premium: true },
    { name: 'Google Business setup', starter: false, standard: false, premium: true },
    { name: 'Blog / news section', starter: false, standard: false, premium: true },
    { name: 'Online menu / catalogue', starter: false, standard: false, premium: true },
    { name: 'Custom domain setup', starter: true, standard: true, premium: true },
    { name: 'Post-launch support', starter: '30 days', standard: '60 days', premium: '90 days' },
    { name: 'Best for', starter: 'Coaching centers, small shops', standard: 'Restaurants, boutiques', premium: 'Schools, real estate, rental agencies' },
  ];

  return (
    <section id="pricing" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent">
      {/* Background blur gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#7B5EF8] opacity-[0.09] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fadeIn bg-transparent">
          <span className="text-sm font-bold text-[#00F5C8] uppercase tracking-wider font-mono">
            Transparent Pricing
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Digital Transformation Packages
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#9090C0]">
            Flat pricing tiers custom-aligned to Karachi's top growing digital business models. Find your perfect package below.
          </p>
        </div>

        {/* Pricing Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
          {plans.map((pl, idx) => (
            <div
              key={idx}
              className={`velra-glass-card p-8 flex flex-col justify-between transition-all duration-300 hover:translate-y-[-6px] hover:shadow-[0_20px_50px_rgba(123,94,248,0.2)] ${pl.color}`}
            >
              {pl.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#7B5EF8] to-[#9B82FA] text-white font-mono font-bold text-xs tracking-wider uppercase shadow-md flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  Most Popular
                </span>
              )}

              <div>
                <div className="flex flex-col mb-6">
                  <span className="text-xs uppercase tracking-wider font-mono text-[#00F5C8] font-bold">
                    {pl.badge}
                  </span>
                  <h3 className="text-2xl font-display font-extrabold text-white mt-1">
                    {pl.name}
                  </h3>
                </div>

                {/* Pricing amount */}
                <div className="mb-6 flex flex-col justify-items-end">
                  <span className="text-3xl md:text-4xl font-display font-black text-white tracking-tight">
                    {pl.priceRange}
                  </span>
                  <span className="text-xs text-[#9090C0] mt-1 tracking-wide uppercase font-mono">
                    Project Setup · One-Time Investment
                  </span>
                </div>

                <p className="text-sm text-[#A5A5C7] mb-8 leading-relaxed font-sans min-h-[48px]">
                  {pl.description}
                </p>

                <div className="mb-4 bg-white/[0.03] border border-white/5 rounded-lg p-3 text-xs">
                  <span className="font-semibold text-[#00F5C8] uppercase font-mono block mb-1">Target Match:</span>
                  <p className="text-neutral-300 italic">Best for {pl.bestFor}</p>
                </div>

                {/* Features divider */}
                <div className="border-t border-[rgba(123,94,248,0.2)] pt-6 mb-8">
                  <span className="text-xs font-bold text-[#E8E8F0] uppercase tracking-widest block mb-4 font-mono">
                    Key Deliverables:
                  </span>
                  <ul className="space-y-3">
                    {/* Active features */}
                    {pl.features.slice(0, 7).map((feat, f_idx) => (
                      <li key={f_idx} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#00F5C8] shrink-0 mt-0.5" />
                        <span className="text-sm text-[#E8E8F0] select-none font-sans">{feat}</span>
                      </li>
                    ))}

                    {/* Excluded features mapped in red/cross with lower opacity for full transparent awareness */}
                    {pl.notIncluded.slice(0, 3).map((feat, fe_idx) => (
                      <li key={fe_idx} className="flex items-start gap-3 opacity-30 select-none">
                        <span className="w-4 h-4 text-[#7070A0] shrink-0 font-bold leading-none text-center select-none">×</span>
                        <span className="text-sm text-[#7070A0] line-through font-sans">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Request CTA Button */}
              <button
                onClick={() => onSelectPlan(pl.name)}
                className={`w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 transform active:translate-y-0.5 cursor-pointer md:tracking-wide font-sans ${
                  pl.isPopular
                    ? 'bg-[#7B5EF8] hover:bg-[#8B70FA] text-white primary-glow'
                    : 'bg-[rgba(22,16,47,0.5)] hover:bg-[rgba(22,16,47,0.8)] text-[#E8E8F0] border border-[rgba(123,94,248,0.3)]'
                }`}
              >
                Inquire For {pl.name}
              </button>
            </div>
          ))}
        </div>

        {/* Feature Comparison Matrix Table */}
        <div className="mt-28 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Detailed Package Comparison Matrix
            </h3>
            <p className="mt-2 text-[#9090C0] text-sm sm:text-base">
              Explore the exhaustive list of deliverables mapping directly to your digital scaling plans.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#7B6CF6]/45 bg-[#090614]/35 backdrop-blur-md shadow-[0_20px_50px_rgba(11,8,22,0.5)]">
            <table className="w-full min-w-[850px] border-collapse text-left text-sm text-[#E8E8F0]">
              <thead>
                <tr className="border-b border-neutral-800 bg-[#16102F]/60">
                  <th className="py-6 px-6 font-display font-bold text-neutral-300 w-1/4 select-none">Deliverables</th>
                  <th className="py-6 px-6 text-center font-display font-semibold w-1/4">
                    <span className="text-[#9B82FA] text-xs uppercase tracking-widest font-mono block">Starter</span>
                    <span className="text-xl text-white font-extrabold mt-1 block">PKR 15,000</span>
                  </th>
                  <th className="py-6 px-6 text-center font-display font-semibold w-1/4 bg-[#16102F]/40 border-x border-neutral-800/40">
                    <span className="text-[#7B6CF6] text-xs uppercase tracking-widest font-mono flex items-center justify-center gap-1 font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-[#7B6CF6]" />
                      Standard
                    </span>
                    <span className="text-xl text-white font-extrabold mt-1 block">PKR 25,000</span>
                  </th>
                  <th className="py-6 px-6 text-center font-display font-semibold w-1/4">
                    <span className="text-[#00D4AA] text-xs uppercase tracking-widest font-mono block">Premium</span>
                    <span className="text-xl text-white font-extrabold mt-1 block">PKR 50,000</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/50">
                {comparisonFeatures.map((row, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-white/[0.02] transition-colors duration-150"
                  >
                    <td className="py-4.5 px-6 font-medium text-neutral-300 select-none">{row.name}</td>
                    
                    {/* Starter Values */}
                    <td className="py-4.5 px-6 text-center select-none">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? (
                          <Check className="w-5 h-5 text-[#00D4AA] mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-neutral-600/50 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-neutral-300 font-sans">{row.starter}</span>
                      )}
                    </td>

                    {/* Standard Values */}
                    <td className="py-4.5 px-6 text-center bg-[#16102F]/20 border-x border-neutral-800/40 select-none">
                      {typeof row.standard === 'boolean' ? (
                        row.standard ? (
                          <Check className="w-5 h-5 text-[#7B6CF6] mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-neutral-600/50 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-[#7B6CF6] font-semibold font-sans">{row.standard}</span>
                      )}
                    </td>

                    {/* Premium Values */}
                    <td className="py-4.5 px-6 text-center select-none">
                      {typeof row.premium === 'boolean' ? (
                        row.premium ? (
                          <Check className="w-5 h-5 text-[#00D4AA] mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-neutral-600/50 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-neutral-300 font-sans">{row.premium}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 text-center md:hidden">
            <span className="text-[10px] text-neutral-500 tracking-wider uppercase font-mono">
              ← Swipe horizontally to see complete package breakdown →
            </span>
          </div>
        </div>

        {/* Footnote information panel */}
        <div className="mt-20 text-center max-w-xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-xs text-[#9090C0] px-4 py-2 border border-[rgba(123,94,248,0.2)] bg-[rgba(22,16,47,0.4)] backdrop-blur-md rounded-xl font-mono">
            <Info className="w-4 h-4 text-[#7B5EF8]" />
            <span>All pricing accommodates local cash-on-delivery or JazzCash bank transitions.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

