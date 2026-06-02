/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowWeWork from './components/HowWeWork';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import AIStudents from './components/AIStudents';
import AdminPanel from './components/AdminPanel';
import GlobalCanvas from './components/GlobalCanvas';

export default function App() {
  const [currentView, setCurrentView] = useState('public'); // views: 'public', 'pricing', 'ai-students', 'admin'
  const [selectedPlanForContact, setSelectedPlanForContact] = useState('');

  // Listen to browser hash coordinates to provide direct link bookmarking
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash || '#home';
      if (hash === '#ai-students') {
        setCurrentView('ai-students');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#admin') {
        setCurrentView('admin');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#pricing') {
        setCurrentView('pricing');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setCurrentView('public');
        const elementId = hash.substring(1);
        if (elementId && elementId !== 'home') {
          // slight delay to wait for view rendering to finalize before scroll
          setTimeout(() => {
            const el = document.getElementById(elementId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 150);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (view: string) => {
    if (view === 'public') {
      window.location.hash = '#home';
    } else if (view === 'pricing') {
      window.location.hash = '#pricing';
    } else if (view === 'ai-students') {
      window.location.hash = '#ai-students';
    } else if (view === 'admin') {
      window.location.hash = '#admin';
    }
  };

  // Callback to support choosing a price tier and auto scrolling down to populate the contact selection dropdown!
  const handleSelectPlan = (planName: string) => {
  setSelectedPlanForContact(planName);
  setCurrentView('public');
  setTimeout(() => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 500);
};

  return (
    <div className="min-h-screen bg-[#0B0816] text-[#E8E8F0] font-sans flex flex-col justify-between selection:bg-[#7B5EF8]/35 selection:text-white relative">
      {/* Global Canvas particle animation background */}
      <GlobalCanvas />

      {/* 1. Header Navigation */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* 2. Main Content Screens with animated entries */}
      <main className="flex-grow z-10 relative">
        <AnimatePresence mode="wait">
          {currentView === 'public' && (
            <motion.div
              key="public-landing-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* SECTION 1 — PUBLIC LANDING PAGE */}
              <Hero 
                onGetStarted={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }} 
                onSeeHowWeWork={() => {
                  const el = document.getElementById('how-we-work');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }} 
                
              />
              <HowWeWork />
              <Services />
              <Contact selectedPlan={selectedPlanForContact} />
            </motion.div>
          )}

          {currentView === 'pricing' && (
            <motion.div
              key="pricing-page-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="pt-24 lg:pt-32"
            >
              {/* SECTION — STANDALONE PRICING PAGE */}
              <Pricing onSelectPlan={handleSelectPlan} />
            </motion.div>
          )}

          {currentView === 'ai-students' && (
            <motion.div
              key="ai-students-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {/* SECTION 2 — WELFARE / EDUCATION PAGE */}
              <AIStudents />
            </motion.div>
          )}

          {currentView === 'admin' && (
            <motion.div
              key="admin-dashboard-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
            >
              {/* SECTION 3 — ADMIN DASHBOARD PROSPECTING PLATFORM */}
              <AdminPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. Footer Block exactly as requested */}
      <footer className="border-t border-[rgba(123,94,248,0.2)] bg-[#0B0816] py-8 px-4 text-center select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-[#7B6CF6] to-[#00D4AA] flex items-center justify-center font-bold text-white text-[10px] font-display select-none animate-pulse">
              V
            </div>
            <span className="text-sm font-display font-extrabold text-white">Velra Digital</span>
          </div>
          
          <span className="text-xs text-[#9090C0] font-sans font-medium hover:text-[#E8E8F0] transition-colors">
            Velra Digital · Build the Future. Today. · Karachi, Pakistan · 2025
          </span>

          <div className="flex gap-4 text-[10px] text-[#9090C0] font-mono">
            <span>v1.4.2 PROD</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
