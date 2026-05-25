/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Landmark, PhoneCall } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'The Vision', id: 'vision' },
    { label: 'Residences', id: 'residences' },
    { label: 'Floor Plan', id: 'floorplan' },
    { label: 'Location', id: 'location' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? 'bg-neutral-900/90 hover:bg-neutral-900/95 text-white shadow-lg backdrop-blur-md py-3 border-b border-white/5'
          : 'bg-transparent text-white py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleLinkClick('home')}
          className="group flex items-center gap-2 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-300 rounded"
          aria-label="Abrar Tower-2 Home"
        >
          <div className="relative w-8 h-8 rounded border border-gold-300 flex items-center justify-center bg-gold-950/20 group-hover:bg-gold-500 transition-all duration-300">
            <span className="font-serif text-sm font-semibold text-gold-300 group-hover:text-black transition-colors">
              A
            </span>
            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-gold-400 rounded-full animate-ping" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-wider font-medium leading-none text-white">
              ABRAR
            </span>
            <span className="font-sans text-[9px] tracking-[0.25em] font-medium text-gold-300 uppercase mt-0.5 leading-none">
              Tower-2
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8 text-sm font-medium tracking-wide">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id} className="relative">
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className={`relative py-1 text-sm font-sans tracking-widest text-[#dfdfdf] hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-300 rounded px-1`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gold-400"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="h-4 w-[1px] bg-neutral-700" />

          {/* Contact Action Button */}
          <button
            onClick={() => handleLinkClick('contact')}
            className="flex items-center gap-2 px-5 py-2 rounded border border-gold-400/40 text-gold-300 text-xs font-mono uppercase tracking-widest hover:bg-gold-400 hover:text-neutral-900 hover:border-gold-400 active:scale-95 transition-all duration-300"
          >
            <PhoneCall size={12} />
            <span>Secure Share</span>
          </button>
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => handleLinkClick('contact')}
            className="p-2 rounded border border-gold-400/20 text-gold-300 hover:bg-gold-950/20 active:scale-95"
            aria-label="Direct Contact"
          >
            <PhoneCall size={16} />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-300"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Glass overlay panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-b border-neutral-800 bg-neutral-950/98 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <ul className="flex flex-col gap-4 text-base font-medium">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <li key={link.id}>
                      <button
                        onClick={() => handleLinkClick(link.id)}
                        className={`w-full text-left py-2 font-serif text-lg tracking-wider flex items-center justify-between ${
                          isActive ? 'text-gold-200 pl-2 border-l border-gold-400' : 'text-neutral-400'
                        }`}
                      >
                        <span>{link.label}</span>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="border-t border-neutral-800 pt-6">
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="w-full py-3 rounded bg-gold-500 hover:bg-gold-600 text-neutral-950 font-bold text-center flex items-center justify-center gap-2 font-sans tracking-wide"
                >
                  <PhoneCall size={14} />
                  <span>Discover residences</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
