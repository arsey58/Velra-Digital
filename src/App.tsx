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

interface PreviewTheme {
  name: string;
  category: string;
  preview_url: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState('public');
  const [selectedPlanForContact, setSelectedPlanForContact] = useState('');
  const [previewTheme, setPreviewTheme] = useState<PreviewTheme | null>(null);

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
          setTimeout(() => {
            const el = document.getElementById(elementId);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  const handleSelectPlan = (planName: string) => {
    setSelectedPlanForContact(planName);
    setCurrentView('public');
    window.history.replaceState(null, '', ' ');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0B0816] text-[#E8E8F0] font-sans flex flex-col justify-between selection:bg-[#7B5EF8]/35 selection:text-white relative">

      {/* ── FULLSCREEN PREVIEW OVERLAY (renders above everything) ── */}
      {previewTheme && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 999999,
            background: '#0B0816',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Preview top bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 24px',
              background: '#0B0816',
              borderBottom: '1px solid rgba(123,94,248,0.25)',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>
                {previewTheme.name}
              </span>
              <span style={{ color: '#9090C0', fontSize: '11px' }}>
                {previewTheme.category}
              </span>
            </div>
            <button
              onClick={() => setPreviewTheme(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                background: 'rgba(123,94,248,0.2)',
                border: '1px solid rgba(123,94,248,0.4)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              ✕ Close Preview
            </button>
          </div>

          {/* iframe */}
          <iframe
            src={previewTheme.preview_url}
            style={{ flex: 1, width: '100%', border: 'none' }}
            title={previewTheme.name}
          />
        </div>
      )}

      <GlobalCanvas />
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

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
              <AdminPanel onPreviewOpen={setPreviewTheme} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

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