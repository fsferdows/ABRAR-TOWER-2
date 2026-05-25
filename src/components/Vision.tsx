/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sun, Wind, ShieldCheck, TreePine, Sparkles, Building2 } from 'lucide-react';

export default function Vision() {
  const [activeTab, setActiveTab] = useState<'ventilation' | 'lobby' | 'rooftop' | 'structure'>('ventilation');

  const visionTabs = [
    {
      id: 'ventilation',
      title: 'Daylight & Ventilation',
      subtitle: 'Dual ventilation corridors',
      icon: Wind,
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
      description:
        'With exactly four flats per floor, every home takes a corner slot. This ingenious design secures 3-side exposure, bathing rooms in morning daylight while generating persistent high-velocity cross-wind drafts across all bedrooms.',
      stats: [
        { label: 'Exposed Corners', value: '4 per flat' },
        { label: 'Daylight Coverage', value: '100% Rooms' },
      ],
      bullets: [
        'Naturally lit dual-exposure master verandas.',
        'Prevents hot-spots through persistent convective air currents.',
        'High-performance glazed sliding windows for optimal seals.',
      ],
    },
    {
      id: 'lobby',
      title: 'Grand Central Lobby',
      subtitle: 'Refined transitional space',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      description:
        'A towering main reception desk finished in deep charcoal granite and brushed gold panels sets a powerful, dignified welcoming tone for both residents and distinguished corporate and personal visitors.',
      stats: [
        { label: 'Ceiling Height', value: 'Double Volume' },
        { label: 'Security Cover', value: '24/7 Gate Guard' },
      ],
      bullets: [
        'Italian stone tiles with subtle gold-accented grouts.',
        'Luxurious seating lounge for visitors and security staff.',
        'Secured biometric passage access points for residents.',
      ],
    },
    {
      id: 'rooftop',
      title: 'Rooftop Community Haven',
      subtitle: 'Landscaped leisure deck',
      icon: TreePine,
      image: 'https://images.unsplash.com/photo-1531971589569-0d93700db184?auto=format&fit=crop&w=1000&q=80',
      description:
        'Escape above standard metropolitan noise to our beautifully curated penthouse-level community zone. Enjoy landscaped stone flower beds, soft accent solar lights, and panoramic vistas of Dhaka.',
      stats: [
        { label: 'Amenity Area', value: '2,500 sq ft' },
        { label: 'Lush Gardens', value: 'Rooftop Periphery' },
      ],
      bullets: [
        'Dedicated secure space for familial community events.',
        'Weather-proof design with safe glass safety barriers.',
        'Lush endemic flora designed by landscape architects.',
      ],
    },
    {
      id: 'structure',
      title: 'Structural Sophistication',
      subtitle: 'Engineered safety standards',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      description:
        'Engineered to meet rigorous RAJUK National Building Code standards. The tower is anchored by a Reinforced Concrete Raft over deep Cast-in-Situ piles, utilizing multi-layer elastomeric polymer waterproofing membranes.',
      stats: [
        { label: 'Concrete Strength f\'c', value: '4,000 PSI Cast' },
        { label: 'Steel Reinforcement', value: 'Grade 60/72 High-Yield' },
      ],
      bullets: [
        'Massive base columns (16" x 24") tapering in stages down to 12" x 16" on upper residential floors.',
        'High-performance deformed rebar networks for maximal seismic dissipation.',
        'Sought-after waterproofing system protecting the subterranean levels and service shafts.',
      ],
    },
  ];

  const currentTab = visionTabs.find((t) => t.id === activeTab) || visionTabs[0];

  return (
    <section id="vision" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative luxury abstract lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-neutral-100" />
      <div className="absolute right-0 top-1/2 w-48 h-48 bg-gold-50/50 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-mono text-xs text-gold-600 tracking-[0.3em] uppercase block mb-3">
            THE PROJECT PHILOSOPHY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-neutral-900 tracking-tight leading-none mb-6">
            Modern Luxury Meets Thoughtful Design
          </h2>
          <div className="w-12 h-[1px] bg-gold-400 mx-auto mb-6" />
          <p className="font-sans text-neutral-500 font-light text-base md:text-lg leading-relaxed">
            Abrar Tower-2 completely reinterprets urban housing in Uttara, Dhaka. Combining exclusive structural privacy with a luxurious transition from public lounge areas to private verandas.
          </p>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Tab Selectors (Compact desktop-first listing) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-[10px] tracking-widest text-[#999] uppercase pr-2 pl-1 mb-2">
              Explore Architectural Facets
            </span>
            {visionTabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`group relative text-left p-5 rounded-lg border transition-all duration-300 flex items-center gap-4 ${
                    isSelected
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-md'
                      : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-100/80 text-neutral-800'
                  }`}
                >
                  <div
                    className={`p-2.5 rounded transition-all duration-300 ${
                      isSelected ? 'bg-gold-500/10 text-gold-300' : 'bg-neutral-200/50 text-neutral-600 group-hover:text-neutral-900'
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <span className="font-serif text-sm md:text-md uppercase tracking-wider block font-semibold leading-tight">
                      {tab.title}
                    </span>
                    <span
                      className={`text-xs block font-sans mt-0.5 ${
                        isSelected ? 'text-gold-200/70' : 'text-neutral-400'
                      }`}
                    >
                      {tab.subtitle}
                    </span>
                  </div>
                  {isSelected && (
                    <motion.div
                      layoutId="activeVisionBorder"
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-l bg-gold-400"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Tab Display Panels (Animated transition) */}
          <div className="lg:col-span-8 bg-neutral-50 border border-neutral-100 rounded-xl p-8 md:p-12 shadow-sm min-h-[480px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
              >
                
                {/* Text and stats */}
                <div className="order-2 md:order-1 flex flex-col gap-6">
                  <div>
                    <span className="font-mono text-xs text-gold-600 font-medium uppercase tracking-widest block mb-2">
                      {currentTab.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl font-normal text-neutral-900 mb-4">
                      {currentTab.title}
                    </h3>
                    <p className="font-sans text-neutral-500 text-sm md:text-md leading-relaxed">
                      {currentTab.description}
                    </p>
                  </div>

                  {/* Bullet points detailing value */}
                  <ul className="flex flex-col gap-2.5 text-xs text-neutral-700 font-sans">
                    {currentTab.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Fine micro-stats */}
                  <div className="grid grid-cols-2 gap-4 border-t border-neutral-200/80 pt-6">
                    {currentTab.stats.map((stat, idx) => (
                      <div key={idx}>
                        <span className="font-sans text-[10px] text-neutral-400 block tracking-wider uppercase">
                          {stat.label}
                        </span>
                        <span className="font-mono text-sm md:text-md font-semibold text-neutral-900 block mt-0.5">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Imagery representing choice */}
                <div className="order-1 md:order-2">
                  <div className="relative rounded overflow-hidden shadow-xl aspect-video md:aspect-[4/3] group border border-neutral-200">
                    <img
                      src={currentTab.image}
                      alt={currentTab.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.02]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Executive Planning Site Analytics & Setbacks Dashboard */}
        <div className="mt-20 border-t border-neutral-150 pt-16">
          <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-10">
            <div>
              <span className="font-mono text-[10px] text-gold-600 tracking-[0.2em] uppercase block mb-2">
                CIVIL SURVEY & REGULATORY METRICS
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-normal text-[#111] tracking-tight">
                RAJUK Building Code Sheet
              </h3>
            </div>
            <span className="text-2xs font-mono bg-neutral-100 text-neutral-600 px-3 py-1.5 rounded border border-neutral-200 uppercase tracking-widest">
              Verified Executive Plan • East Faydabad G+9
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Box 1: Site Geometry */}
            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-150 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-3">01 // PLOT LAND GEOMETRY</span>
                <span className="font-serif text-2xl font-normal text-neutral-900 block leading-none mb-1">10.0 Katha</span>
                <span className="text-xs text-neutral-500 font-sans">
                  Total area: 7,200 sq ft (668.9 m²)
                </span>
              </div>
              <div className="border-t border-neutral-200/60 mt-4 pt-3 text-[10px] font-mono text-neutral-500 flex justify-between">
                <span>FRONTAGE ACCESS:</span>
                <span className="text-neutral-800 font-bold">60.0 FT ROAD</span>
              </div>
            </div>

            {/* Box 2: Footprint Coverage */}
            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-150 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-3">02 // FOOTPRINT COVERAGE</span>
                <span className="font-serif text-2xl font-normal text-neutral-900 block leading-none mb-1">60.0% MGC</span>
                <span className="text-xs text-neutral-500 font-sans">
                  Max Ground Coverage compliant
                </span>
              </div>
              <div className="border-t border-neutral-200/60 mt-4 pt-3 text-[10px] font-mono text-neutral-500 flex justify-between">
                <span>ALLOWABLE CORE:</span>
                <span className="text-neutral-800 font-bold">4,320 SQ FT</span>
              </div>
            </div>

            {/* Box 3: Regulated Setbacks */}
            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-150 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-3">03 // CLEAR BOUNDARY SETBACKS</span>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-1 font-mono text-xs">
                  <div className="flex justify-between border-b border-neutral-200/50 pb-0.5">
                    <span className="text-neutral-400 text-2xs">FRONT (S)</span>
                    <span className="text-neutral-800 font-semibold">5'-0"</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200/50 pb-0.5">
                    <span className="text-neutral-400 text-2xs">REAR (N)</span>
                    <span className="text-neutral-800 font-semibold">10'-0"</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400 text-2xs">EAST</span>
                    <span className="text-neutral-800 font-semibold">4'-0"</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400 text-2xs">WEST</span>
                    <span className="text-neutral-800 font-semibold">4'-0"</span>
                  </div>
                </div>
              </div>
              <p className="text-[9px] text-neutral-400 font-sans mt-3">
                Full setbacks compliance keeps ambient airflow corridor free.
              </p>
            </div>

            {/* Box 4: Vertical Circulation Core */}
            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-150 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-3">04 // CIRCULATION CORE</span>
                <span className="font-serif text-2xl font-normal text-neutral-900 block leading-none mb-1">Double Core</span>
                <span className="text-xs text-neutral-500 font-sans">
                  2 high-speed lifts, 2 stairwells
                </span>
              </div>
              <div className="border-t border-neutral-200/60 mt-4 pt-3 text-[10px] font-mono text-neutral-500 flex justify-between">
                <span>MEP SHAFT SYSTEM:</span>
                <span className="text-neutral-800 font-bold">2 DEDICATED</span>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
}
