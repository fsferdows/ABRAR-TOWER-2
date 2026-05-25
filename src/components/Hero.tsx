/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onDiscover: () => void;
}

export default function Hero({ onDiscover }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950 text-white"
    >
      {/* Background Image Container with Cinematic Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.05, 1.02] }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&h=900&q=80"
            alt="Abrar Tower-2 Modern Architectural Rendering"
            className="w-full h-full object-cover filter brightness-[0.42] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        {/* Subtle Luxury Gradient Overlay (Deep dark to golden ambient aura) */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-500/5 z-10" />
        <div className="absolute right-0 bottom-0 w-[40%] h-[50%] bg-amber-500/5 blur-[120px] rounded-full filter pointer-events-none z-10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-16 z-20 w-full flex flex-col justify-between min-h-screen">
        <div className="flex-grow flex flex-col justify-center">
          <div className="max-w-4xl">
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-gold-400/20 text-gold-300 text-[10px] md:text-xs font-mono uppercase tracking-[0.18em] mb-8 shadow-inner"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span>{t('hero.badge')}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.3 }}
              className="font-serif text-3xl sm:text-5xl md:text-7xl font-sans tracking-tight text-white leading-[1.15] mb-6"
            >
              <span className="text-white block sm:inline">{t('hero.title.part1')} </span>
              <span className="text-white/90 block sm:inline">{t('hero.title.part2')} </span> <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gold-200 to-gold-400 font-medium block sm:inline">
                {t('hero.title.part3')}
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-sans text-neutral-300 text-base md:text-xl font-light tracking-wide leading-relaxed max-w-2xl mb-12"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Call To Action Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:gap-6"
            >
              <button
                onClick={onDiscover}
                className="group relative px-8 py-4 bg-gold-400 hover:bg-gold-500 text-neutral-950 text-sm font-semibold uppercase tracking-wider rounded overflow-hidden shadow-2xl hover:shadow-gold-400/10 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>{t('hero.cta.discover')}</span>
                <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/50 text-sm font-semibold uppercase tracking-wider rounded transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t('hero.cta.contact')}</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Hero Bottom Info Grid - Luxury Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 border-t border-white/10 pt-8"
        >
          <div>
            <span className="font-mono text-[10px] text-gold-400 tracking-widest uppercase block mb-1">Architecture</span>
            <span className="font-serif text-xl md:text-3xl text-neutral-100 font-medium block">{t('hero.spec.stories')}</span>
            <span className="text-[10px] text-neutral-400 font-sans tracking-wide">Premium Heights</span>
          </div>
          <div>
            <span className="font-mono text-[10px] text-gold-400 tracking-widest uppercase block mb-1">Exclusivity</span>
            <span className="font-serif text-xl md:text-3xl text-neutral-100 font-medium block">{t('hero.spec.units')}</span>
            <span className="text-[10px] text-neutral-400 font-sans tracking-wide">Detached Design</span>
          </div>
          <div>
            <span className="font-mono text-[10px] text-gold-400 tracking-widest uppercase block mb-1">Total Scale</span>
            <span className="font-serif text-xl md:text-3xl text-neutral-100 font-medium block">36 Apartments</span>
            <span className="text-[10px] text-neutral-400 font-sans tracking-wide">Elite Community</span>
          </div>
          <div>
            <span className="font-mono text-[10px] text-gold-400 tracking-widest uppercase block mb-1">Daylight</span>
            <span className="font-serif text-xl md:text-3xl text-neutral-100 font-medium block">{t('hero.spec.daylight')}</span>
            <span className="text-[10px] text-neutral-400 font-sans tracking-wide">{t('hero.spec.privacy')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
