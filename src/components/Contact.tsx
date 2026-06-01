/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Clock, Send } from 'lucide-react';

interface ContactProps {
  selectedPlan: string;
}

export default function Contact({ selectedPlan }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    serviceInterest: 'Growth Package (PKR 15K-20K)',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync service interest dynamically if a pricing plan is chosen by the user in the parent applet
  useEffect(() => {
    if (selectedPlan) {
      if (selectedPlan.toLowerCase() === 'starter') {
        setFormData((prev) => ({ ...prev, serviceInterest: 'Starter Package (PKR 5K-8K)' }));
      } else if (selectedPlan.toLowerCase() === 'growth') {
        setFormData((prev) => ({ ...prev, serviceInterest: 'Growth Package (PKR 15K-20K)' }));
      } else if (selectedPlan.toLowerCase() === 'pro') {
        setFormData((prev) => ({ ...prev, serviceInterest: 'Pro Package (PKR 30K-40K)' }));
      }
    }
  }, [selectedPlan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.businessName || !formData.phone) return;

    setIsSubmitting(true);
    
    // Simulate API pipeline submit
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Save submission locally for simulation visual or debugging
      const submissions = JSON.parse(localStorage.getItem('velra_submissions') || '[]');
      submissions.push({
        ...formData,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('velra_submissions', JSON.stringify(submissions));
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      businessName: '',
      phone: '',
      serviceInterest: 'Growth Package (PKR 15K-20K)',
    });
    setIsSuccess(false);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent">
      {/* Absolute background visual blobs */}
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#7B5EF8] opacity-[0.08] blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          
          {/* Left panel: Info & Karachi Focus */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-sm font-bold text-[#00F5C8] uppercase tracking-wider font-mono">
                Launch Your Presence
              </span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-none">
                Start Growing <br />Your Business.
              </h2>
              <p className="mt-6 text-base text-[#A5A5C7] leading-relaxed max-w-lg font-sans font-light">
                Are you an established local brand in Karachi seeking automation and high conversion visibility? Leave your contact coordinates below. Our local business development managers (BDM) will consult you directly on WhatsApp.
              </p>
            </div>

            {/* Local Information Cards */}
            <div className="mt-12 space-y-6">
              
              {/* Location Widget */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0B0816] border border-[rgba(123,94,248,0.2)] flex items-center justify-center shrink-0 shadow-md">
                  <MapPin className="w-5 h-5 text-[#7B5EF8]" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base">Karachi Headquarters</h4>
                  <p className="text-sm text-[#A5A5C7] mt-0.5 font-sans font-light">PECHS Block 2, Shahrah-e-Faisal Road, Karachi, Pakistan</p>
                </div>
              </div>

              {/* Response Time Widget */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0B0816] border border-[rgba(123,94,248,0.2)] flex items-center justify-center shrink-0 shadow-md">
                  <Clock className="w-5 h-5 text-[#00F5C8]" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base">WhatsApp Response Time</h4>
                  <p className="text-sm text-[#A5A5C7] mt-0.5 font-sans font-light">Under 2 hours (Mon–Sat, 10:00 AM – 8:00 PM PKT)</p>
                </div>
              </div>

              {/* Direct Mail Widget */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0B0816] border border-[rgba(123,94,248,0.2)] flex items-center justify-center shrink-0 shadow-md">
                  <Mail className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base">Email Relations</h4>
                  <p className="text-sm text-[#A5A5C7] mt-0.5 font-sans font-light">team@govelra.com · HR@govelra.com</p>
                </div>
              </div>

            </div>

            {/* Small Footer Signature Note inside left panel */}
            <div className="mt-12 border-t border-[rgba(123,94,248,0.2)] pt-6 hidden lg:block">
              <span className="text-xs text-[#9090C0]/60 font-mono">
                Velra Digital (Private) Ltd. · Karachi Registration Authority 081290
              </span>
            </div>
          </div>

          {/* Right panel: Glassmorphism Contact Form Card as explicitly specified */}
          <div className="velra-glass-card p-8 sm:p-10 relative overflow-hidden flex flex-col justify-center">
            
            {/* Corner glowing overlay */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#7B5EF8]/20 rounded-full blur-2xl pointer-events-none" />

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10 bg-transparent">
                
                {/* Form Title */}
                <div>
                  <h3 className="text-2xl font-display font-extrabold text-white">Inquire Right Now</h3>
                  <p className="text-xs text-[#9090C0] mt-1">Fill the details below to initialize verification.</p>
                </div>

                {/* Input Name */}
                <div className="space-y-2 bg-transparent">
                  <label htmlFor="name-input" className="block text-xs font-bold text-[#E8E8F0] uppercase tracking-wider font-mono">
                    Your Name
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    placeholder="e.g. Muhammad Kashif"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0B0816] border border-[rgba(123,94,248,0.2)] rounded-xl text-white placeholder-[#7070A0]/50 text-sm focus:border-[#7B5EF8] focus:outline-none focus:ring-1 focus:ring-[#7B5EF8]/30 transition-all font-sans"
                  />
                </div>

                {/* Input Business Name */}
                <div className="space-y-2 bg-transparent">
                  <label htmlFor="business-input" className="block text-xs font-bold text-[#E8E8F0] uppercase tracking-wider font-mono">
                    Business Name
                  </label>
                  <input
                    id="business-input"
                    type="text"
                    required
                    placeholder="e.g. Javed General Store & Supermarket"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0B0816] border border-[rgba(123,94,248,0.2)] rounded-xl text-white placeholder-[#7070A0]/50 text-sm focus:border-[#7B5EF8] focus:outline-none focus:ring-1 focus:ring-[#7B5EF8]/30 transition-all font-sans"
                  />
                </div>

                {/* Input Phone */}
                <div className="space-y-2 bg-transparent">
                  <label htmlFor="phone-input" className="block text-xs font-bold text-[#E8E8F0] uppercase tracking-wider font-mono flex items-center justify-between">
                    <span>Phone / WhatsApp</span>
                    <span className="text-[10px] text-[#00F5C8] font-semibold">Active Code Required</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#9090C0] font-mono select-none">
                      +92
                    </span>
                    <input
                      id="phone-input"
                      type="tel"
                      required
                      placeholder="300 1234567"
                      value={formData.phone}
                      onChange={(e) => {
                        // strip any non-digit character to sanitize phone input
                        const val = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, phone: val });
                      }}
                      className="w-full pl-14 pr-4 py-3 bg-[#0B0816] border border-[rgba(123,94,248,0.2)] rounded-xl text-white placeholder-[#7070A0]/50 text-sm focus:border-[#7B5EF8] focus:outline-none focus:ring-1 focus:ring-[#7B5EF8]/30 transition-all font-mono"
                    />
                  </div>
                  <p className="text-[10px] text-[#9090C0]/70 mt-1">We require a valid Whatsapp number to establish contact and drop catalog designs.</p>
                </div>

                {/* Service Dropdown Selection */}
                <div className="space-y-2">
                  <label htmlFor="service-select" className="block text-xs font-bold text-[#E8E8F0] uppercase tracking-wider font-mono">
                    Service Interest
                  </label>
                  <select
                    id="service-select"
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0B0816] border border-[rgba(123,94,248,0.2)] rounded-xl text-[#E8E8F0] text-sm focus:border-[#7B5EF8] focus:outline-none cursor-pointer"
                  >
                    <option value="Starter Package (PKR 5K-8K)">Starter Package (PKR 5K-8K) — GBP + WhatsApp Only</option>
                    <option value="Growth Package (PKR 15K-20K)">Growth Package (PKR 15K-20K) — + Landing Page + SMM</option>
                    <option value="Pro Package (PKR 30K-40K)">Pro Package (PKR 30K-40K) — + Review System + Ads</option>
                    <option value="Custom API / Enterprise Consultation">Custom Enterprise Consultation</option>
                  </select>
                </div>

                {/* Submit Trigger with neon glow hover */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-bold bg-[#7B5EF8] hover:bg-[#8B70FA] text-white flex items-center justify-center gap-2 transition-all duration-300 transform select-none cursor-pointer neon-glow-hover outline-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Dispatching to BDM...
                    </>
                  ) : (
                    <>
                      Submit Inquiry
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Success micro iteration display screen */
              <div className="text-center py-8 px-4 flex flex-col items-center justify-center relative z-10 animate-scaleUp bg-transparent">
                <div className="w-16 h-16 rounded-full bg-[#00F5C8]/10 border border-[#00F5C8]/40 flex items-center justify-center text-[#00F5C8] mb-6">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-display font-extrabold text-white">Inquiry Received!</h3>
                <p className="text-sm text-[#9090C0] mt-3 leading-relaxed max-w-sm">
                  Salam, <span className="text-[#E8E8F0] font-bold">{formData.name}</span>. We successfully cataloged your request for <span className="text-[#00F5C8] font-bold">{formData.businessName}</span>.
                </p>
                <div className="mt-6 p-4 rounded-xl bg-[#0B0816] border border-[rgba(123,94,248,0.2)] text-xs text-[#9090C0] max-w-sm text-left family-sans space-y-1.5 shadow-inner">
                  <span className="font-bold text-[#E8E8F0] uppercase tracking-wide block mb-1 font-mono">Queue Status: Active</span>
                  <p>● assigned BDM: <span className="text-[#7B5EF8] font-medium">Pakistani-Support-Desk</span></p>
                  <p>● callback window: <span className="text-[#00F5C8] font-medium">Under 2 hours</span></p>
                  <p>● channel: <span className="text-[#E8E8F0] font-medium">Direct WhatsApp (+92 {formData.phone})</span></p>
                </div>
                
                <button
                  onClick={handleReset}
                  className="mt-8 text-xs font-mono font-bold text-[#9090C0] hover:text-[#00F5C8] transition-colors border-b border-transparent hover:border-[#00F5C8] cursor-pointer"
                >
                  Submit Another Inquire
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
