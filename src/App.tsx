/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Vision from './components/Vision';
import Residences from './components/Residences';
import FloorPlan from './components/FloorPlan';
import Location from './components/Location';
import Contact from './components/Contact';
import LeadCenter from './components/LeadCenter';
import PhoneChatbot from './components/PhoneChatbot';
import BuilderConsole from './components/BuilderConsole';
import { ShieldCheck, Compass, ArrowUpRight, ShieldAlert, Award } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLeadCenterOpen, setIsLeadCenterOpen] = useState(false);
  const [leadUpdateCounter, setLeadUpdateCounter] = useState(0);

  // Dynamic automatic active section tracking via scroll offsets
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'vision', 'residences', 'floorplan', 'builder', 'location', 'contact'];
      const scrollPos = window.scrollY + 160; // Offset for header

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80; // Header size
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  };

  const triggerLeadUpdate = () => {
    setLeadUpdateCounter(prev => prev + 1);
  };

  return (
    <div className="relative min-h-screen bg-neutral-900 overflow-x-hidden selection:bg-gold-450 selection:text-neutral-900 antialiased font-sans">
      
      {/* Stick Header Module */}
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Pages flow */}
      <main>
        {/* Section 1: Hero */}
        <Hero onDiscover={() => handleNavigate('residences')} />

        {/* Section 2: Vision & Philosophy */}
        <Vision />

        {/* Section 3: Residences Catalog & Structural blueprints */}
        <Residences />

        {/* Section 3.5: Entire Interactive Layer Floor Explorer with Elevator simulation */}
        <FloorPlan />

        {/* Section 3.8: Builder & Joint Venture Console with Real FAR calculators */}
        <BuilderConsole />

        {/* Section 4: Physical Address & Bespoke Cartography Map */}
        <Location />

        {/* Section 5: Secure Reservation Forms & Bank transfers */}
        <Contact onLeadSubmitted={triggerLeadUpdate} />
      </main>

      {/* Luxury Footer Gating Core elements */}
      <footer className="bg-neutral-950 text-neutral-400 py-16 px-6 md:px-12 border-t border-neutral-850">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <span className="font-serif text-lg tracking-widest text-white leading-none font-bold">ABRAR</span>
              <span className="font-sans text-[10px] tracking-widest text-gold-300 font-medium uppercase leading-none">Tower-2</span>
            </div>
            <p className="text-2xs text-neutral-500 max-w-sm font-sans">
              Completely custom-reimagined 10-storied residential tower in East Faydabad, Dakshinkhan, Uttara, Dhaka. Engineered for privacy and maximum daylight index.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-2xs uppercase tracking-widest font-mono font-medium">
            <button
              onClick={() => handleNavigate('home')}
              className="hover:text-gold-300 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigate('vision')}
              className="hover:text-gold-300 transition-colors cursor-pointer"
            >
              The Vision
            </button>
            <button
              onClick={() => handleNavigate('residences')}
              className="hover:text-gold-300 transition-colors cursor-pointer"
            >
              Residences
            </button>
            <button
              onClick={() => handleNavigate('builder')}
              className="hover:text-gold-300 transition-colors cursor-pointer"
            >
              Builder Spec
            </button>
            <button
              onClick={() => handleNavigate('location')}
              className="hover:text-gold-300 transition-colors cursor-pointer"
            >
              Location
            </button>
            <button
              onClick={() => setIsLeadCenterOpen(true)}
              className="text-gold-400 hover:text-gold-300 transition-colors flex items-center gap-1.5 cursor-pointer bg-neutral-900/60 px-3 py-1.5 rounded border border-gold-400/10 hover:border-gold-400/30"
            >
              <Award size={11} className="text-gold-400" />
              <span>Investor Lead Center</span>
            </button>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-neutral-850/40 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-[10px] font-mono tracking-wide text-neutral-600">
            © 2026 Abrar Tower-2. All rights reserved. Registered Real Estate Venture.
          </span>
          
          <div className="flex gap-4 text-[10px] font-mono text-neutral-600">
            <a href="#contact" className="hover:text-neutral-400">Privacy Policy</a>
            <span>•</span>
            <a href="#contact" className="hover:text-neutral-400">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Secret Admin panel dialog */}
      <LeadCenter 
        isOpen={isLeadCenterOpen} 
        onClose={() => setIsLeadCenterOpen(false)} 
        updateTrigger={leadUpdateCounter}
      />
      
      {/* Interactive Phone Chatbot Hotbar */}
      <PhoneChatbot />
      
    </div>
  );
}
