/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Compass, Calendar, Plane, Store, Building, FlameKindling } from 'lucide-react';
import { Landmark } from '../types';

export default function Location() {
  const landmarks: Landmark[] = [
    { name: 'British Masjid', distance: '2 Mins Walk (Near)', type: 'religion' },
    { name: 'APS Group Garments', distance: 'Adjacent (1 Min)', type: 'commerce' },
    { name: 'Atipara Bazar', distance: '4 Mins Walk', type: 'commerce' },
    { name: 'Hazrat Shahjalal Airport', distance: '12 Mins Drive', type: 'transport' }
  ];

  const [hoveredLandmark, setHoveredLandmark] = useState<string | null>(null);

  // SVG coordinates for landmarks
  const mapLandmarks = [
    { id: 'British Masjid', name: 'British Masjid', x: 280, y: 150, cxClass: 'bg-green-500', color: '#10b981', detail: 'Historic local Mosque for secure prayer congregations.' },
    { id: 'APS Group Garments', name: 'APS Group', x: 140, y: 110, cxClass: 'bg-amber-500', color: '#f59e0b', detail: 'Key corporate industrial landmark directly North.' },
    { id: 'Atipara Bazar', name: 'Atipara Bazar', x: 320, y: 240, cxClass: 'bg-blue-500', color: '#3b82f6', detail: 'Primary commercial hub, wet market, and grocery center.' },
    { id: 'Hazrat Shahjalal Airport', name: 'Hazrat Shahjalal Int\'l Airport', x: 80, y: 280, cxClass: 'bg-purple-500', color: '#8b5cf6', detail: 'Dhaka\'s gateway connection. Absolute transit priority.' }
  ];

  return (
    <section id="location" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-neutral-100" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Interactive Address Card & Timeline */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-gold-600 tracking-[0.3em] uppercase block mb-3">
                THE LOCATION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-neutral-900 tracking-tight leading-none mb-6">
                A Prime Address
              </h2>
              <div className="w-12 h-[1px] bg-gold-400 mb-8" />
              
              {/* Main Physical Address Card */}
              <div className="p-6 rounded-lg bg-neutral-50 border border-neutral-100/80 mb-8 shadow-sm">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-neutral-900 text-gold-300 rounded shadow">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-[#999] tracking-widest uppercase block mb-1">
                      PROJECT SITE ADDRESS
                    </span>
                    <p className="font-serif text-md font-medium text-neutral-900 leading-snug mb-2">
                      Abrar Tower-2
                    </p>
                    <p className="font-sans text-neutral-500 text-sm leading-relaxed">
                      South of APS Garments, Near British Masjid, East Faydabad, Dakshinkhan, Uttara, Dhaka-1230.
                    </p>
                  </div>
                </div>
              </div>

              {/* Commute and Proximity Timeline */}
              <span className="font-mono text-[10px] tracking-widest text-[#999] uppercase block mb-4">
                COMMUTE PROXIMITY INDEX
              </span>
              <ul className="flex flex-col gap-4">
                {landmarks.map((l, index) => {
                  const isHovered = hoveredLandmark === l.name;
                  return (
                    <li
                      key={index}
                      onMouseEnter={() => setHoveredLandmark(l.name)}
                      onMouseLeave={() => setHoveredLandmark(null)}
                      className={`p-3 rounded border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        isHovered
                          ? 'bg-neutral-900 text-white border-neutral-900 shadow-md translate-x-1'
                          : 'bg-neutral-50/50 hover:bg-neutral-50 border-neutral-100/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            l.type === 'religion'
                              ? 'bg-green-500'
                              : l.type === 'transport'
                              ? 'bg-purple-500'
                              : 'bg-gold-500'
                          }`}
                        />
                        <span className="font-serif text-sm font-medium tracking-wide">
                          {l.name}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[#999]">
                        {l.distance}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center gap-3 text-xs text-neutral-400">
              <Compass size={14} className="text-gold-500 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Dakshinkhan sits directly adjacent to Uttara, offering immediate connection to Airport bypass roads.</span>
            </div>
          </div>

          {/* Right: Custom Vector GIS Map Box */}
          <div className="lg:col-span-7 bg-neutral-950/20 md:bg-neutral-50 border border-neutral-100 rounded-xl p-6 md:p-8 flex flex-col h-full min-h-[480px] justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                  <Navigation size={12} className="text-gold-500" />
                  BESPOKE CARTOGRAPHY BLUEPRINT
                </span>
                <span className="text-xs text-neutral-500 font-sans italic">
                  Interactive Landmark Overlay
                </span>
              </div>

              {/* Custom SVG Map Canvas */}
              <div className="relative aspect-[4/3] w-full max-w-[500px] mx-auto border border-neutral-205 bg-[#fff] rounded-lg shadow-inner overflow-hidden flex items-center justify-center p-2">
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-auto text-neutral-300 pointer-events-auto"
                >
                  {/* Background grid */}
                  <rect width="100%" height="100%" fill="#fafafa" />
                  <defs>
                    <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <rect width="40" height="40" fill="none" stroke="#f0f0f0" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#mapGrid)" />

                  {/* Main Arterial Roadways */}
                  <path d="M 0,150 L 400,150" fill="none" stroke="#e4e4e7" strokeWidth="22" strokeLinecap="round" />
                  <path d="M 0,150 L 400,150" fill="none" stroke="#ffffff" strokeWidth="18" strokeLinecap="round" />
                  <text x="50" y="154" fill="#666" className="font-mono text-[7px] uppercase tracking-wider">East Faydabad Road</text>

                  {/* Highway connector */}
                  <path d="M 120,0 L 120,300" fill="none" stroke="#e4e4e7" strokeWidth="16" strokeLinecap="round" />
                  <path d="M 120,0 L 120,300" fill="none" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" />
                  <text x="124" y="20" fill="#666" className="font-mono text-[7px] rotate-90 transform origin-left uppercase tracking-wider">Dakshinkhan Bypass</text>

                  {/* Minor feeder roads */}
                  <path d="M 280,0 L 280,300" fill="none" stroke="#f4f4f5" strokeWidth="10" />
                  <path d="M 0,260 L 400,260" fill="none" stroke="#f4f4f5" strokeWidth="10" />

                  {/* Connection lines from project tower when hovered */}
                  {mapLandmarks.map((l) => {
                    const isActive = hoveredLandmark === l.id;
                    if (!isActive) return null;
                    return (
                      <g key={'line' + l.id}>
                        <line
                          x1={220} // Abrar Tower core
                          y1={150}
                          x2={l.x}
                          y2={l.y}
                          stroke="#a17950"
                          strokeWidth="1.5"
                          strokeDasharray="4,4"
                          className="animate-pulse"
                        />
                        <circle cx={l.x} cy={l.y} r={18} fill="none" stroke="#a17950" strokeWidth="0.5" className="animate-ping" style={{ animationDuration: '3s' }} />
                      </g>
                    );
                  })}

                  {/* PROJECT CORE PIN (Abrar Tower-2) */}
                  <g className="cursor-pointer">
                    <circle cx={220} cy={150} r={12} fill="rgba(161, 121, 80, 0.2)" />
                    <circle cx={220} cy={150} r={5} fill="#a17950" />
                    <text x="220" y="132" textAnchor="middle" fill="#111" className="font-serif text-[9px] font-bold uppercase tracking-wider">
                      ABRAR TOWER-2
                    </text>
                    <text x="220" y="141" textAnchor="middle" fill="#a17950" className="font-mono text-[6px] tracking-wide font-semibold">
                      SITE SITE
                    </text>
                  </g>

                  {/* LANDMARKS PINS */}
                  {mapLandmarks.map((l) => {
                    const isHovered = hoveredLandmark === l.id;
                    return (
                      <g
                        key={l.id}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredLandmark(l.id)}
                        onMouseLeave={() => setHoveredLandmark(null)}
                      >
                        <circle
                          cx={l.x}
                          cy={l.y}
                          r={isHovered ? 8 : 6}
                          fill={isHovered ? l.color : '#e4e4e4'}
                          stroke={isHovered ? '#fff' : '#888'}
                          strokeWidth="1.5"
                          className="transition-all duration-300"
                        />
                        <text
                          x={l.x}
                          y={l.y - 12}
                          textAnchor="middle"
                          fill={isHovered ? '#111' : '#666'}
                          className={`font-serif text-[8px] transition-all ${isHovered ? 'font-bold text-[9px]' : ''}`}
                        >
                          {l.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Dynamic Card Display of Active Selection */}
            <div className="mt-6 p-4 rounded bg-neutral-900 border border-neutral-850 text-white min-h-[80px]">
              <AnimatePresence mode="wait">
                {hoveredLandmark ? (
                  <motion.div
                    key={hoveredLandmark}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <span className="font-mono text-[9px] text-gold-400 uppercase tracking-widest block mb-0.5">
                        LANDMARK FOCUS ACTIVE
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-white">
                        {hoveredLandmark}
                      </h4>
                      <p className="font-sans text-xs text-neutral-400 mt-1 max-w-lg leading-normal">
                        {mapLandmarks.find(m => m.id === hoveredLandmark)?.detail || 'Nearby accessible utility node.'}
                      </p>
                    </div>
                    <div className="font-mono text-xs text-gold-300 bg-gold-400/10 px-2 py-1.5 rounded border border-gold-400/20 flex-shrink-0">
                      → {landmarks.find(l => l.name === hoveredLandmark)?.distance || 'Immediate'}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-500 text-xs font-sans leading-relaxed"
                  >
                    Select any landmark on the timeline list or hover over pins on our bespoke GIS cartography matrix to trace directions and proximities.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
