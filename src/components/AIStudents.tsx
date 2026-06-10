/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, BookOpen, Layers, CheckSquare, GraduationCap, Award, HelpCircle, Check } from 'lucide-react';

export default function AIStudents() {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    schoolOrUniversity: '',
    city: 'Karachi',
    foundationAffiliation: 'Secondary High Student',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.schoolOrUniversity) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const features = [
    {
      title: 'Learn AI Tools',
      description: 'Master prompt engineering, ChatGPT, Gemini API, high-speed automated copywriters, and vector design models to speed up study tasks. You will learn 30+ AI Tools across content, design, coding, and productivity.',
      icon: <BookOpen className="w-6 h-6 text-[#7B5EF8]" />,
      detail: 'Learn 30+ AI Tools · 12 structured video classes + live lab sessions'
    },
    {
      title: 'Build Real Projects',
      description: 'Apply learnings to build actual websites, local student-aid web pipelines, automatic flashcard generators, and interactive study planners.',
      icon: <Layers className="w-6 h-6 text-[#00F5C8]" />,
      detail: 'Fully hands-on practice. Build 3 core portfolio projects'
    },
    {
      title: 'Get Certified',
      description: 'Receive a professional curriculum certification verified jointly by Fauji Foundation and Velra Digital. Perfect for linking on LinkedIn profile tags.',
      icon: <Award className="w-6 h-6 text-pink-500" />,
      detail: 'Jointly co-branded digital verification credentials'
    }
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-[#0B0816] overflow-hidden">

      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#7B5EF8] opacity-[0.16] blur-[150px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#00F5C8] opacity-[0.06] blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="text-center max-w-4xl mx-auto flex flex-col items-center">

          <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full border border-[rgba(123,94,248,0.3)] bg-[rgba(22,16,47,0.6)] text-sm select-none mb-8 shadow-sm backdrop-blur-md">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-[#7B6CF6] to-[#00D4AA] flex items-center justify-center font-bold text-white text-[10px] font-display shrink-0">
              V
            </div>
            <span className="text-xs font-bold text-[#E8E8F0] tracking-wide uppercase font-mono">
              Velra Digital <span className="text-[#00F5C8] font-bold">×</span> Fauji Foundation
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight leading-none">
            AI Skills for <br />Every Student.
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-[#A5A5C7] max-w-2xl leading-relaxed font-sans font-light">
            In collaboration with <span className="text-white font-semibold">Fauji Foundation</span>, Velra Digital offers affordable AI training for students across Pakistan.
          </p>

          <p className="text-xs font-semibold text-[#00F5C8] font-mono mt-3 uppercase tracking-wider">
            Sponsored Program Initiative · Live in Karachi, Rawalpindi & Lahore
          </p>

          <div className="mt-10 max-w-2xl p-6 rounded-2xl border border-[rgba(123,94,248,0.25)] bg-[rgba(22,16,47,0.45)] backdrop-blur-md relative overflow-hidden">
            <div className="absolute left-0 top-0 w-1.5 h-full bg-[#00F5C8]" />
            <h4 className="font-display font-bold text-white text-base text-left flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00F5C8]" />
              Sponsorship & Accessibility Angle
            </h4>
            <p className="text-sm text-[#A5A5C7] text-left mt-2 leading-relaxed">
              We believe financial limits should never compromise future skills. Standard registrations are heavily subsidized, costing only <span className="text-white font-bold">PKR 3,000</span> for the entire course, with <span className="text-[#00F5C8] font-extrabold">100% full fee waivers</span> automatic for all Fauji School networks, military families, and students presenting merit scholarships.
            </p>
          </div>

          <div className="mt-8 flex gap-4 w-full justify-center">
            <button
              onClick={() => setShowApplyModal(true)}
              className="px-8 py-4 rounded-xl font-bold bg-[#7B5EF8] hover:bg-[#8B70FA] text-white transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2 cursor-pointer outline-none font-sans"
            >
              Enroll Now
            </button>
            <a
              href="#learn-curriculum"
              className="px-8 py-4 rounded-xl font-bold border border-[rgba(123,94,248,0.25)] hover:border-[#7B5EF8]/50 text-[#E8E8F0] bg-[rgba(22,16,47,0.3)] hover:bg-[rgba(22,16,47,0.6)] transition-all flex items-center gap-2 backdrop-blur-md"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Feature Cards */}
        <div id="learn-curriculum" className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, index) => (
            <div key={index} className="velra-glass-card p-8 flex flex-col justify-between hover:border-[#7B5EF8]/30 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#0B0816] border border-[rgba(123,94,248,0.2)] flex items-center justify-center mb-6">
                  {feat.icon}
                </div>
                <h3 className="text-2xl font-display font-extrabold text-white mb-3">{feat.title}</h3>
                <p className="text-sm text-[#A5A5C7] leading-relaxed mb-6 font-sans">{feat.description}</p>
              </div>
              <div className="border-t border-[rgba(123,94,248,0.2)] pt-4 text-xs text-[#00F5C8] font-mono flex items-center gap-1.5 select-none font-medium">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>{feat.detail}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <span className="text-3xl md:text-4xl font-display font-black text-white/35 italic select-none">
            "AI Skills for Real Life."
          </span>
        </div>

      </div>

      {/* Application Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0816]/90 backdrop-blur-md p-4 overflow-y-auto">
          <div className="velra-glass-card w-full max-w-lg p-8 relative animate-scaleUp border border-[#7B5EF8]/40 shadow-[0_24px_60px_rgba(11,8,22,0.9)]">

            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-bold text-[#00F5C8] tracking-widest uppercase font-mono block">
                  Joint Educational Admission
                </span>
                <h3 className="text-2xl font-display font-extrabold text-white mt-1">Enroll For AI Training</h3>
              </div>
              <button
                onClick={() => { setShowApplyModal(false); setIsSuccess(false); }}
                className="p-1 px-2.5 rounded-lg border border-[rgba(123,94,248,0.2)] text-[#9090C0] hover:text-white hover:bg-[rgba(22,16,47,0.6)] cursor-pointer"
              >
                ×
              </button>
            </div>

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="student-name" className="block text-xs font-bold text-[#E8E8F0] uppercase tracking-wider font-mono">Full Student Name</label>
                  <input id="student-name" type="text" required placeholder="e.g. Ayesha Siddiqua" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0B0816] border border-[rgba(123,94,248,0.2)] rounded-xl text-white placeholder-[#7070A0]/50 text-xs focus:border-[#7B5EF8] focus:outline-none focus:ring-1 focus:ring-[#7B5EF8]" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="student-email" className="block text-xs font-bold text-[#E8E8F0] uppercase tracking-wider font-mono">
                    Email Address <span className="text-[10px] text-[#7070a0] lowercase font-normal ml-2">(for classroom access)</span>
                  </label>
                  <input id="student-email" type="email" required placeholder="e.g. ayesha@student.com" value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0B0816] border border-[rgba(123,94,248,0.2)] rounded-xl text-white placeholder-[#7070A0]/50 text-xs focus:border-[#7B5EF8] focus:outline-none focus:ring-1 focus:ring-[#7B5EF8]" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="student-phone" className="block text-xs font-bold text-[#E8E8F0] uppercase tracking-wider font-mono">WhatsApp Contact Number</label>
                  <input id="student-phone" type="tel" required placeholder="e.g. 0300 9876543" value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0B0816] border border-[rgba(123,94,248,0.2)] rounded-xl text-white placeholder-[#7070A0]/50 text-xs focus:border-[#7B5EF8] focus:outline-none focus:ring-1 focus:ring-[#7B5EF8]" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="student-school" className="block text-xs font-bold text-[#E8E8F0] uppercase tracking-wider font-mono">School / College / University Name</label>
                  <input id="student-school" type="text" required placeholder="e.g. Fauji Foundation Model School, PECHS" value={formData.schoolOrUniversity}
                    onChange={(e) => setFormData({ ...formData, schoolOrUniversity: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0B0816] border border-[rgba(123,94,248,0.2)] rounded-xl text-white placeholder-[#7070A0]/50 text-xs focus:border-[#7B5EF8] focus:outline-none focus:ring-1 focus:ring-[#7B5EF8]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="student-city" className="block text-xs font-bold text-[#E8E8F0] uppercase tracking-wider font-mono">City Campus</label>
                    <select id="student-city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0B0816] border border-[rgba(123,94,248,0.2)] rounded-xl text-xs text-white focus:outline-none focus:border-[#7B5EF8]">
                      <option value="Karachi">Karachi</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Faisalabad">Faisalabad</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="student-level" className="block text-xs font-bold text-[#E8E8F0] uppercase tracking-wider font-mono">Affiliation Type</label>
                    <select id="student-level" value={formData.foundationAffiliation} onChange={(e) => setFormData({ ...formData, foundationAffiliation: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0B0816] border border-[rgba(123,94,248,0.2)] rounded-xl text-xs text-white focus:outline-none focus:border-[#7B5EF8]">
                      <option value="Fauji Foundation Candidate">Fauji School Student</option>
                      <option value="Secondary High Student">High School / Matric</option>
                      <option value="Undergrad University">University Undergraduate</option>
                      <option value="Orphan / Sponsored Request">Special Sponsorship Option</option>
                    </select>
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-[#7B6CF6] to-[#00D4AA] text-black font-extrabold rounded-xl text-sm transition-opacity hover:opacity-90 cursor-pointer">
                  {isSubmitting ? 'Registering Admission Seat...' : 'Submit Scholarship Application'}
                </button>
              </form>
            ) : (
              <div className="text-center py-6 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#00F5C8]/10 border border-[#00F5C8]/40 flex items-center justify-center text-[#00F5C8] mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-display font-extrabold text-white">Application Dispatched!</h4>
                <p className="text-xs text-[#9090C0] mt-3 leading-relaxed max-w-sm">
                  Salam! Your application code is <span className="text-[#00F5C8]">#AI-SCHOLAR-{Math.floor(Math.random()*9000)+1000}</span>.
                </p>
                <div className="mt-4 p-4 rounded-xl bg-[#0B0816] border border-[rgba(123,94,248,0.2)] text-left text-xs text-[#9090C0] space-y-1.5 w-full max-w-sm">
                  <span className="font-bold text-white uppercase block mb-1">Assigned Verification:</span>
                  <p>● Student: <span className="text-[#E8E8F0]">{formData.name}</span></p>
                  <p>● Affiliation: <span className="text-[#E8E8F0]">{formData.foundationAffiliation}</span></p>
                  <p>● Subsidized Fee Status: <span className="text-[#00F5C8]">Pending Review (PKR 3,000 / Free for eligible)</span></p>
                </div>
                <p className="text-[10px] text-[#9090C0] mt-4">We will verify your student identity badge and drop raw portal access to {formData.email}.</p>
                <button onClick={() => { setShowApplyModal(false); setIsSuccess(false); }}
                  className="mt-6 px-4 py-2 text-xs font-mono font-bold text-black bg-white rounded-lg hover:bg-[#E8E8F0] cursor-pointer">
                  Return to Portal
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}