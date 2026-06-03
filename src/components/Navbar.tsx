/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isNavigating, setIsNavigating] = useState(false);

  // Monitor scrolling for glassmorphic effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll spy
  useEffect(() => {
    if (currentView !== 'public') return;

    const sections = ['home', 'how-we-work', 'services', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        if (isNavigating) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentView, isNavigating]);

  const navLinks = [
    { key: 'home', label: 'Home', isSegment: true },
    { key: 'how-we-work', label: 'How We Work', isSegment: true },
    { key: 'services', label: 'Services', isSegment: true },
    { key: 'pricing', label: 'Pricing', isSegment: false },
    { key: 'contact', label: 'Contact', isSegment: true },
    { key: 'ai-students', label: 'AI for Students', isSegment: false }
  ];

  const handleLinkClick = (key: string, isSegment: boolean) => {
    setIsOpen(false);
    if (isSegment) {
      if (currentView !== 'public') {
        setIsNavigating(true);
        setActiveSection(key);
        onNavigate('public');
        setTimeout(() => {
          const element = document.getElementById(key);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => setIsNavigating(false), 600);
        }, 450);
      } else {
        setActiveSection(key);
        const element = document.getElementById(key);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate(key);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isLinkActive = (key: string) => {
    if (key === 'ai-students') return currentView === 'ai-students';
    if (key === 'pricing') return currentView === 'pricing';
    if (currentView === 'public') return activeSection === key;
    return false;
  };

  return (
    <nav
      id="velra-main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0816d9] backdrop-blur-md border-b border-[rgba(123,94,248,0.2)] py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div
            onClick={() => handleLinkClick('home', true)}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7B6CF6] to-[#00D4AA] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105">
              <span className="text-white text-2xl font-black font-display antialiased">V</span>
            </div>
            <span className="text-white font-display font-extrabold text-xl tracking-tight select-none">
              Velra <span className="text-white font-light">Digital</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.key);
              return (
                <button
                  key={link.key}
                  onClick={() => handleLinkClick(link.key, link.isSegment)}
                  className={`relative font-medium text-sm transition-colors duration-200 cursor-pointer py-1 ${
                    isActive ? 'text-white font-semibold' : 'text-[#7070A0] hover:text-[#E8E8F0]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#7B5EF8] to-[#00F5C8] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Admin Button Desktop */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => {
                onNavigate('admin');
                window.scrollTo({ top: 0 });
              }}
              title="Admin Portal"
              className={`p-2 rounded-lg border transition-all duration-200 cursor-pointer ${
                currentView === 'admin'
                  ? 'bg-[rgba(22,16,47,0.4)] border-[#00F5C8] text-[#00F5C8]'
                  : 'bg-[rgba(22,16,47,0.4)] border-[rgba(123,94,248,0.2)] text-[#7070A0] hover:text-[#E8E8F0] hover:border-[#7B5EF8]/50'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => {
                onNavigate('admin');
                window.scrollTo({ top: 0 });
              }}
              className="p-2 text-[#7070A0] hover:text-[#E8E8F0] border border-[rgba(123,94,248,0.2)] rounded-lg bg-[rgba(22,16,47,0.4)]"
            >
              <ShieldAlert className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-[#7070A0] hover:text-[#E8E8F0] hover:bg-[rgba(22,16,47,0.4)] transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0B0816ed] backdrop-blur-lg border-b border-[rgba(123,94,248,0.2)] py-4 px-6 shadow-xl flex flex-col gap-4 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = isLinkActive(link.key);
            return (
              <button
                key={link.key}
                onClick={() => handleLinkClick(link.key, link.isSegment)}
                className={`py-2 text-left font-medium text-base transition-colors ${
                  isActive ? 'text-[#00F5C8]' : 'text-[#7070A0] hover:text-[#E8E8F0]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}