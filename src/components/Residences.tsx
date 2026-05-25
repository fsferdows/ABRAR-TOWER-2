/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Bed, ShowerHead, Square, Shield, Eye, GlassWater, ArrowUpRight } from 'lucide-react';
import { ApartmentType } from '../types';
import { useLanguage } from '../context/LanguageContext';

export default function Residences() {
  const { t, language } = useLanguage();

  const apartmentTypes: ApartmentType[] = [
    {
      id: 'A',
      name: language === 'bn' ? 'রেসিডেন্স ইউনিট এ (Flat A)' : 'Residence Unit A',
      sizeSqFt: 920,
      bedrooms: 2,
      bathrooms: 2,
      verandas: 2,
      isCorner: true,
      idealFor: language === 'bn' ? 'সম্মুখভাগের আলো এবং আরামদায়ক বাতাসপ্রবাহ পিয়াসী পরিবার' : 'Symmetrical suites desiring fluid front-exposure daylight',
      description: language === 'bn'
        ? 'দক্ষিণ-পশ্চিম মুখী (সম্মুখভাগ)। এতে রয়েছে চমৎকার উন্মুক্ত ড্রয়িং-ডাইনিং, যা দিনের আলোর সর্বোচ্চ ব্যবহার এবং দক্ষিণ গোলার্ধের চমৎকার বাতাস নিশ্চিত করে।'
        : 'Facing South-West (Front). Highlights an open-plan social spine designed with a fluid entry, living, and dining connection. Provides maximum daylight index and south-exposure cross vent drafts.',
      highlights: language === 'bn' ? [
        'মাস্টার বেডরুম (১২\'-০" x ১৩\'-০") সংযুক্ত বাথরুম সহ',
        'চাইল্ড বেডরুম (১১\'-০" x ১২\'-০")',
        'প্যানোরামিক দক্ষিণ বারান্দা (৪\'-০" x ১১\'-০")',
        'ইউটিলিটি ও ওয়াশ ব্যালকনি (৩\'-৬" x ৫\'-০")'
      ] : [
        'Master Bedroom (12\'-0" x 13\'-0") with attached bathroom',
        'Child Bedroom (11\'-0" x 12\'-0")',
        'Panoramic South Verandah (4\'-0" x 11\'-0")',
        'Dry utility balcony behind structural louvers (3\'-6" x 5\'-0")'
      ]
    },
    {
      id: 'B',
      name: language === 'bn' ? 'রেসিডেন্স ইউনিট বি (Flat B)' : 'Residence Unit B',
      sizeSqFt: 920,
      bedrooms: 2,
      bathrooms: 2,
      verandas: 2,
      isCorner: true,
      idealFor: language === 'bn' ? 'সকালের মিষ্টি রোদ ও সূর্যোদয়প্রেমী পরিবারদের জন্য' : 'Families holding high value for front early sunrise aspects',
      description: language === 'bn'
        ? 'দক্ষিণ-পূর্ব মুখী (সম্মুখভাগ)। ইউনিট এ এর একদম প্রতিসাম্য নকশা, সুবিশাল লিভিং লাউঞ্জ এবং সকালের স্নিগ্ধ রোদের প্রাচুর্যতা সমৃদ্ধ।'
        : 'Facing South-East (Front). A symmetrical master mirror to Unit A, designed with a spacious social core and large double glazed openings prioritizing morning daylight and cross-ventilation.',
      highlights: language === 'bn' ? [
        'মাস্টার বেডরুম (১২\'-০" x ১৩\'-০") সংযুক্ত বাথরুম সহ',
        'চাইল্ড বেডরুম (১১\'-০" x ১২\'-০")',
        'সুসজ্জিত ড্রয়িং ও ডাইনিং স্পেস (১৪\'-০" x ১৮\'-৬")',
        'আলাদা কমন বাথরুম করিডোর (৫\'-০" x ৭\'-০")'
      ] : [
        'Master Bedroom (12\'-0" x 13\'-0") with attached bathroom',
        'Child Bedroom (11\'-0" x 12\'-0")',
        'Integrated Living-Dining Core (14\'-0" x 18\'-6")',
        'Isolated Common Bathroom (5\'-0" x 7\'-0")'
      ]
    },
    {
      id: 'C',
      name: language === 'bn' ? 'রেসিডেন্স ইউনিট সি (Flat C)' : 'Residence Unit C',
      sizeSqFt: 880,
      bedrooms: 2,
      bathrooms: 2,
      verandas: 1,
      isCorner: true,
      idealFor: language === 'bn' ? 'শান্তি ও একাকীত্বপ্রিয় নিরিবিলি বাসিন্দা' : 'Privacy-oriented dwellers wanting acoustic isolation',
      description: language === 'bn'
        ? 'উত্তর-পশ্চিম মুখী (পেছনভাগ)। লিফট লবি ও মেইন করিডোর থেকে নিরাপদ দূরত্বে শোবার ঘরগুলোর অবস্থান যা সর্বোচ্চ সুরক্ষা ও নিস্তব্ধতা প্রদান করে।'
        : 'Facing North-West (Rear). Conceptualized with isolated private sleeping quarters for absolute quietude. Intentionally zones bedrooms away from lift lobbies and main corridor doors.',
      highlights: language === 'bn' ? [
        'মাস্টার বেডরুম (১১\'-৬" x ১৩\'-০") সংযুক্ত বাথরুম সহ',
        'ব্যক্তিগত নিরিবিলি বারান্দা বাগান',
        'প্রশস্ত গেস্ট বা চিলড্রেন বেডরুম (১১\'-০" x ১১\'-০")',
        'এল-আকৃতির শৌখিন রন্ধনশালা বা কিচেন (৬\'-৬" x ৯\'-০")'
      ] : [
        'Master Bedroom (11\'-6" x 13\'-0") with attached bath',
        'Private detached master balcony for quiet vistas_C',
        'Spacious Guest Bedroom (11\'-0" x 11\'-0")',
        'L-shaped chef kitchen (6\'-6" x 9\'-0")'
      ]
    },
    {
      id: 'D',
      name: language === 'bn' ? 'রেসিডেন্স ইউনিট ডি (Flat D)' : 'Residence Unit D',
      sizeSqFt: 880,
      bedrooms: 2,
      bathrooms: 2,
      verandas: 1,
      isCorner: true,
      idealFor: language === 'bn' ? 'উত্তরের স্নিগ্ধ আলো ও মনোরম আবহাওয়া প্রিয় পেশাদারগণ' : 'Professionals seeking serene northern skylights',
      description: language === 'bn'
        ? 'উত্তর-পূর্ব মুখী (পেছনভাগ)। ইউনিট সি এর নিখুঁত প্রতিফলন। চমৎকার বাতাস নিষ্কাশন এবং সর্বোচ্চ ব্যক্তিগত সুরক্ষাসম্পন্ন আধুনিক বিন্যাস।'
        : 'Facing North-East (Rear). Symmetrical mirror of Unit C, delivering outstanding privacy and draft corridors. Keeps guest wings completely detached from main entertainment slots.',
      highlights: language === 'bn' ? [
        'কেন্দ্রীয় ড্রয়িং সেলুন এরিয়া (১২\'-০" x ১৪\'-০")',
        'কম্প্যাক্ট ডাইনিং জোন (১০\'-০" x ১১\'-০")',
        'রিয়ার ব্যালকনি সহ বিলাসবহুল মাস্টার বেড',
        'লো-ই থার্মাল ডাবল প্রটেকশন গ্লাস উইন্ডো'
      ] : [
        'Central Living Salon (12\'-0" x 14\'-0")',
        'Compact Dining Room (10\'-0" x 11\'-0")',
        'Master bed with attached bath & rear balcony',
        'Low-E tint double thermal glass window system'
      ]
    }
  ];

  const [selectedType, setSelectedType] = useState<string>('A');
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  
  // Comparative matrix states for side-by-side matching
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [compareUnitA, setCompareUnitA] = useState<string>('A');
  const [compareUnitB, setCompareUnitB] = useState<string>('C');

  const activeApartment = apartmentTypes.find(a => a.id === selectedType) || apartmentTypes[0];

  // Dynamic rooms list for high accuracy based on front (A/B) vs rear (C/D) selected properties
  const getVisibleRooms = (typeId: string) => {
    if (typeId === 'A' || typeId === 'B') {
      return [
        { id: 'master_bed', label: language === 'bn' ? 'মাস্টার বেডরুম' : 'Master Bedroom', x: 15, y: 15, w: 125, h: 105, tag: '12\'-0" x 13\'-0"' },
        { id: 'master_bath', label: language === 'bn' ? 'সংযুক্ত বাথ' : 'Attached Bath', x: 155, y: 15, w: 75, h: 50, tag: '8\'-0" x 5\'-0"' },
        { id: 'panoramic_verandah', label: language === 'bn' ? 'দক্ষিণ বারান্দা' : 'South Verandah', x: 15, y: 130, w: 125, h: 30, tag: '4\'-0" x 11\'-0"' },
        { id: 'living_dining', label: language === 'bn' ? 'সোশ্যাল ড্রয়িং/ডাইনিং' : 'Social Living/Dining', x: 245, y: 15, w: 180, h: 180, tag: '14\'-0" x 18\'-6"' },
        { id: 'linear_kitchen', label: language === 'bn' ? 'রান্নাঘর' : 'Linear Kitchen', x: 245, y: 205, w: 85, h: 115, tag: '7\'-0" x 9\'-0"' },
        { id: 'child_bed', label: language === 'bn' ? 'চাইল্ড বেডরুম' : 'Child Bedroom', x: 15, y: 175, w: 125, h: 110, tag: '11\'-0" x 12\'-0"' },
        { id: 'common_bath', label: language === 'bn' ? 'সাধারণ বাথরুম' : 'Common Bath', x: 155, y: 250, w: 75, h: 70, tag: '5\'-0" x 7\'-0"' },
        { id: 'utility_balcony', label: language === 'bn' ? 'ইউটিলিটি বেলকনি' : 'Utility Balcony', x: 345, y: 205, w: 80, h: 45, tag: '3\'-6" x 5\'-0"' }
      ];
    } else {
      return [
        { id: 'master_bed2', label: language === 'bn' ? 'মাস্টার বেডরুম' : 'Master Bedroom', x: 15, y: 15, w: 125, h: 115, tag: '11\'-6" x 13\'-0"' },
        { id: 'master_bath2', label: language === 'bn' ? 'সংযুক্ত বাথ' : 'Attached Bath', x: 155, y: 15, w: 75, h: 55, tag: '8\'-0" x 5\'-0"' },
        { id: 'private_balcony2', label: language === 'bn' ? 'মাস্টার ব্যালকনি' : 'Master Balcony', x: 15, y: 140, w: 125, h: 25, tag: language === 'bn' ? 'ব্যক্তিগত বারান্দা' : 'Private Space' },
        { id: 'guest_bed2', label: language === 'bn' ? 'গেস্ট বেডরুম' : 'Guest Bedroom', x: 15, y: 175, w: 125, h: 110, tag: '11\'-0" x 11\'-0"' },
        { id: 'living_salon2', label: language === 'bn' ? 'লিভিং সেলুন' : 'Living Salon', x: 245, y: 15, w: 180, h: 140, tag: '12\'-0" x 14\'-0"' },
        { id: 'dining_area2', label: language === 'bn' ? 'ডাইনিং স্পেস' : 'Compact Dining', x: 245, y: 165, w: 100, h: 115, tag: '10\'-0" x 11\'-0"' },
        { id: 'chef_kitchen2', label: language === 'bn' ? 'এল রান্নাঘর' : 'L-Chef Kitchen', x: 355, y: 165, w: 70, h: 115, tag: '6\'-6" x 9\'-0"' },
        { id: 'common_bath2', label: language === 'bn' ? 'সাধারণ বাথরুম' : 'Common Bath', x: 155, y: 200, w: 75, h: 85, tag: '5\'-0" x 7\'-0"' }
      ];
    }
  };

  const visibleRooms = getVisibleRooms(selectedType);

  return (
    <section id="residences" className="py-24 md:py-32 bg-neutral-900 text-white relative overflow-hidden">
      {/* Abstract dark graphics */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#33221110,transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-800" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title & Highlights Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end">
          <div className="lg:col-span-6">
            <span className="font-mono text-xs text-gold-400 tracking-[0.3em] uppercase block mb-3">
              {language === 'bn' ? 'আবাসিক পোর্টফোলিও' : 'THE PORTFOLIO'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight leading-none mb-6">
              {language === 'bn' ? 'বিলাসবহুল ফ্ল্যাটের শ্রেণীবিভাগ' : 'Luxurious Living Spaces'}
            </h2>
            <div className="w-16 h-[1px] bg-gold-400" />
          </div>
          <div className="lg:col-span-6">
            <p className="font-sans text-neutral-400 font-light text-sm md:text-base leading-relaxed">
              {language === 'bn' 
                ? 'আবরার টাওয়ার-২ এর প্রতিটি ইউনিটকে ভেতর থেকে বাইরে নিখুঁতভাবে বিশ্লেষণ করে প্ল্যান করা হয়েছে। সুদীর্ঘ খালি স্পেস বর্জন, দক্ষিণমুখী বাতাস এবং কাস্টমাইজড বারান্দার সুবিধা নিশ্চিত করাই আমাদের কাম্য।'
                : 'Every apartment within Abrar Tower-2 was drafted starting from inside-out. We prioritized maximizing uninhibited lines of sight, deleting long empty corridors, and wrapping rooms around double-glazed private outdoor verandas.'}
            </p>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
          <div className="p-6 rounded bg-neutral-950/40 border border-neutral-850 hover:border-gold-400/25 transition-all duration-300">
            <span className="font-mono text-gold-400 text-xs block mb-3 font-semibold">01 / {language === 'bn' ? 'ফ্ল্যাট বিন্যাস' : 'LAYOUTS'}</span>
            <span className="font-serif text-md md:text-lg block mb-2 text-neutral-100">{language === 'bn' ? '৩টি বেডরুম ও বারান্দা' : '3 to 4 Bedrooms'}</span>
            <p className="text-xs text-neutral-500 leading-normal">
              {language === 'bn' ? 'যুগোপযোগী এবং সুদূরপ্রসারী যৌথ পরিবার পরিকল্পনার অভিজাত সজ্জা।' : 'Spacious configurations customizable to multi-generational requirements.'}
            </p>
          </div>
          <div className="p-6 rounded bg-neutral-950/40 border border-neutral-850 hover:border-gold-400/25 transition-all duration-300">
            <span className="font-mono text-gold-400 text-xs block mb-3 font-semibold">02 / {language === 'bn' ? 'রান্নাঘর নকশা' : 'KITCHENS'}</span>
            <span className="font-serif text-md md:text-lg block mb-2 text-neutral-100">{language === 'bn' ? 'উন্মুক্ত এল-কনসেপ্ট' : 'Open-Concept Frame'}</span>
            <p className="text-xs text-neutral-500 leading-normal">
              {language === 'bn' ? 'প্রাকৃতিক উচ্চচাপ গ্যাস সংযোগ এবং গন্ধ নিষ্কাশন ভেন্টিলেশন সিস্টেম।' : 'Integrated with state-of-the-art ventilation points and high-pressure gas.'}
            </p>
          </div>
          <div className="p-6 rounded bg-neutral-950/40 border border-neutral-850 hover:border-gold-400/25 transition-all duration-300">
            <span className="font-mono text-gold-400 text-xs block mb-3 font-semibold">03 / {language === 'bn' ? 'আলোক বারান্দা' : 'BALCONIES'}</span>
            <span className="font-serif text-md md:text-lg block mb-2 text-neutral-100">{language === 'bn' ? 'বিলাসবহুল মাস্টার ভিউ' : 'Private Verandas'}</span>
            <p className="text-xs text-neutral-500 leading-normal">
              {language === 'bn' ? 'মাস্টার বেড সংলগ্ন প্রশস্ত বারান্দা যা অবসরের ক্লান্তি দূর করতে সাহায্য করবে।' : 'Large exterior verandas attached directly to master suites for visual retreat.'}
            </p>
          </div>
          <div className="p-6 rounded bg-neutral-950/40 border border-neutral-850 hover:border-gold-400/25 transition-all duration-300">
            <span className="font-mono text-gold-400 text-xs block mb-3 font-semibold">04 / {language === 'bn' ? 'গ্লাস ফিটিং' : 'GLASS WORK'}</span>
            <span className="font-serif text-md md:text-lg block mb-2 text-neutral-100">{language === 'bn' ? 'ডবল থার্মাল কোটিং' : 'Performance Glazing'}</span>
            <p className="text-xs text-neutral-500 leading-normal">
              {language === 'bn' ? 'ক্ষতিকর আল্ট্রাভায়োলেট ও অতিরিক্ত রোদ প্রতিরোধক আধুনিক ডবল গ্লেজ টেম্পারড গ্লাস।' : 'High-performance double panels to absorb solar radiation and block heat.'}
            </p>
          </div>
        </div>

        {/* Main Floor Plan Blueprint Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Layout Unit Info & Type Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-gold-400 uppercase block mb-4">
                {language === 'bn' ? 'ইন্টারেক্টিভ ইউনিট ব্লুপ্রিন্ট' : 'Interactive Unit Blueprint'}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-normal text-white leading-tight mb-6">
                {language === 'bn' ? 'আপনার রুচিসম্মত অভিজাত জীবনধারা' : 'Tailored Spaces for Modern Lifestyles'}
              </h3>

              {/* Floor Plan Selectors */}
              <div className="flex flex-wrap gap-2 mb-8">
                {apartmentTypes.map(apt => (
                  <button
                    key={apt.id}
                    onClick={() => {
                      setSelectedType(apt.id);
                      setHoveredRoom(null);
                    }}
                    className={`px-4 py-3 rounded text-center min-w-[70px] flex-grow font-mono text-xs transition-all duration-300 cursor-pointer ${
                      selectedType === apt.id
                        ? 'bg-gold-400 text-neutral-950 font-semibold shadow-lg shadow-gold-400/10'
                        : 'bg-neutral-950/60 text-neutral-400 border border-neutral-800 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    Type {apt.id}
                    <span className="block text-[9px] opacity-80 font-sans mt-0.5">
                      {language === 'bn' ? `${apt.sizeSqFt} বর্গফুট` : `${apt.sizeSqFt} sq ft`}
                    </span>
                  </button>
                ))}
              </div>

              {/* Apartment description */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedType}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="bg-neutral-950/30 p-6 rounded-lg border border-neutral-850"
                >
                  <h4 className="font-serif text-xl font-medium text-gold-200 mb-2">
                    {activeApartment.name}
                  </h4>
                  <span className="inline-flex gap-1 items-center px-2 py-1 rounded bg-neutral-900 text-gold-300 text-[10px] font-mono uppercase tracking-wider mb-4 border border-gold-400/10">
                    {language === 'bn' ? '১০০% কর্নার ইউনিট গ্যারান্টি' : 'Corner Position Guaranteed'}
                  </span>
                  <p className="font-sans text-neutral-400 text-sm leading-relaxed mb-6">
                    {activeApartment.description}
                  </p>

                  {/* Highlights Grid */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {activeApartment.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-300 font-sans">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Configurations Bar */}
                  <div className="grid grid-cols-3 gap-3 border-t border-neutral-800/80 pt-5 text-center">
                    <div>
                      <Bed size={14} className="mx-auto text-gold-400 mb-1" />
                      <span className="font-mono text-xs font-semibold text-white block">
                        {language === 'bn' ? `${activeApartment.bedrooms} বেড` : `${activeApartment.bedrooms} Beds`}
                      </span>
                    </div>
                    <div>
                      <ShowerHead size={14} className="mx-auto text-gold-400 mb-1" />
                      <span className="font-mono text-xs font-semibold text-white block">
                        {language === 'bn' ? `${activeApartment.bathrooms} বাথ` : `${activeApartment.bathrooms} Baths`}
                      </span>
                    </div>
                    <div>
                      <LayoutGrid size={14} className="mx-auto text-gold-400 mb-1" />
                      <span className="font-mono text-xs font-semibold text-white block">
                        {language === 'bn' ? `${activeApartment.verandas} বারান্দা` : `${activeApartment.verandas} Verandas`}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 border-t border-neutral-850 pt-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
              <div>
                <span className="text-xs text-neutral-500 font-sans block mb-1">
                  {language === 'bn' ? 'গ্রাহক প্রোফাইল নির্দেশিকা' : 'Target Client Profile'}
                </span>
                <p className="text-xs text-gold-300 font-mono font-medium tracking-wide">
                  {language === 'bn' ? '→ যার জন্য আদর্শ: ' : '→ Recommended for: '} {activeApartment.idealFor}
                </p>
              </div>
              <button
                onClick={() => setIsCompareOpen(true)}
                className="px-4 py-2 bg-neutral-950 text-gold-400 font-mono text-[10px] uppercase tracking-widest rounded border border-gold-400/25 hover:border-gold-400 hover:bg-neutral-900 transition-all font-semibold cursor-pointer"
              >
                {language === 'bn' ? 'তুলনা করুন' : 'COMPARE TYPES'}
              </button>
            </div>
          </div>

          {/* Right: SVG Interactive Blueprint Canvas */}
          <div className="lg:col-span-7 bg-neutral-950/70 border border-neutral-850 rounded-xl p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] tracking-widest text-[#999] uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {language === 'bn' ? 'ক্যাড ব্লুপ্রিন্ট নকশা' : 'CAD Blueprint View'}
                </span>
                <span className="text-xs text-neutral-400 font-sans italic text-right">
                  {language === 'bn' ? 'ফ্ল্যাটের নকশা দেখতে মাউস বা আঙুল রাখুন' : 'Hover rooms to examine dimension blueprints'}
                </span>
              </div>

              {/* SVG Map Representation */}
              <div className="relative border border-neutral-800 rounded bg-neutral-900/60 p-4 aspect-square max-w-[450px] mx-auto flex items-center justify-center overflow-hidden">
                <svg
                  viewBox="0 0 440 345"
                  className="w-full h-auto text-neutral-300 selection:bg-transparent"
                  style={{ maxHeight: '100%', maxWidth: '100%' }}
                >
                  {/* Grid Lines */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#222" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* Room Containers */}
                  {visibleRooms.map(room => {
                    const isHovered = hoveredRoom === room.id;
                    return (
                      <g
                        key={room.id}
                        onMouseEnter={() => setHoveredRoom(room.id)}
                        onMouseLeave={() => setHoveredRoom(null)}
                        className="cursor-pointer transition-all duration-300"
                      >
                        {/* Interactive Room Area */}
                        <motion.rect
                          x={room.x}
                          y={room.y}
                          width={room.w}
                          height={room.h}
                          rx={2}
                          fill={isHovered ? 'rgba(194, 136, 45, 0.12)' : 'rgba(23, 23, 23, 0.7)'}
                          stroke={isHovered ? '#b8946f' : '#333'}
                          strokeWidth={isHovered ? '1.5' : '1'}
                          className="transition-colors duration-200"
                        />
                        {/* Room Label */}
                        <text
                          x={room.x + room.w / 2}
                          y={room.y + room.h / 2 - 1.5}
                          textAnchor="middle"
                          fill={isHovered ? '#ffd19a' : '#ddd'}
                          className="font-serif text-[10px] tracking-wide"
                        >
                          {room.label}
                        </text>
                        {/* Room dimensions / tag */}
                        <text
                          x={room.x + room.w / 2}
                          y={room.y + room.h / 2 + 12}
                          textAnchor="middle"
                          fill={isHovered ? '#b8946f' : '#666'}
                          className="font-mono text-[8px]"
                        >
                          {room.tag}
                        </text>

                        {/* Special luxury element symbols e.g. cross vents or sun symbol on focus */}
                        {isHovered && (
                          <circle
                            cx={room.x + 8}
                            cy={room.y + 8}
                            r={3}
                             fill="#b8946f"
                            className="animate-pulse"
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Active hover stats banner */}
            <div className="mt-6 p-4 rounded bg-neutral-900 border border-neutral-850 flex items-center justify-between min-h-[60px]">
              {hoveredRoom ? (
                <div>
                  <span className="font-mono text-[9px] text-gold-400 block uppercase tracking-wider">
                    {language === 'bn' ? 'সরাসরি ঘর বা ছক সিলেক্টেড' : 'CURRENT SELECTION ACTIVE'}
                  </span>
                  <span className="font-serif text-sm font-semibold text-white">
                    {visibleRooms.find(r => r.id === hoveredRoom)?.label}
                  </span>
                  <span className="font-sans text-xs text-neutral-400 ml-3">
                    ({visibleRooms.find(r => r.id === hoveredRoom)?.tag})
                  </span>
                </div>
              ) : (
                <div className="text-neutral-500 text-xs font-sans">
                  {language === 'bn' ? 'রুমে মাউস রেখে নির্দিষ্ট পরিমাপ ও থার্মাল চ্যানেল ক্যাড ব্লুপ্রিন্ট দেখুন।' : 'Hover over the architectural CAD blueprint above to examine structural sections.'}
                </div>
              )}
              {hoveredRoom && (
                <div className="flex gap-2 text-[9px] text-gold-300 font-mono tracking-wider items-center bg-gold-500/10 px-2 py-1 rounded border border-gold-500/20">
                  <ArrowUpRight size={10} className="text-gold-400" />
                  <span>{language === 'bn' ? 'প্রাকৃতিক আলো-বাতাস' : 'PREMIUM INSULATION'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparative Modal overlay */}
      <AnimatePresence>
        {isCompareOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-neutral-900 border border-neutral-800 rounded-xl max-w-4xl w-full p-6 md:p-8 shadow-2xl relative my-8"
            >
              <button
                onClick={() => setIsCompareOpen(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white font-mono text-[10px] uppercase tracking-widest cursor-pointer hover:bg-neutral-850 px-2.5 py-1 rounded"
              >
                [ {language === 'bn' ? 'বন্ধ করুন' : 'Close'} ]
              </button>

              <div className="mb-6">
                <span className="font-mono text-[9px] text-gold-400 uppercase tracking-widest block mb-1">
                  {language === 'bn' ? 'ফ্ল্যাট মূল্যায়ন বিস্তারিত ছক' : 'UNIT EVALUATION MATRIX'}
                </span>
                <h3 className="font-serif text-2xl text-white font-normal">
                  {language === 'bn' ? 'পাশাপাশি ফ্লোর প্ল্যান তুলনা' : 'Side-by-Side Comparison'}
                </h3>
                <div className="w-12 h-[1px] bg-gold-400 mt-2" />
              </div>

              {/* Dynamic Pickers for comparison */}
              <div className="grid grid-cols-2 gap-4 mb-6 bg-neutral-950/40 p-4 rounded border border-neutral-850/60 w-full">
                <div>
                  <label className="block text-[9px] font-mono text-neutral-500 uppercase mb-1.5">
                    {language === 'bn' ? 'প্রথম রেসিডেন্স ইউনিট কোড' : 'UNIT REPRESENTATIVE I'}
                  </label>
                  <select
                    value={compareUnitA}
                    onChange={(e) => setCompareUnitA(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 text-gold-300 font-mono text-xs rounded p-2 focus:outline-none focus:border-gold-400 cursor-pointer"
                  >
                    {apartmentTypes.map(apt => (
                      <option key={apt.id} value={apt.id} className="text-white bg-neutral-900">
                        {apt.name} ({apt.sizeSqFt} {language === 'bn' ? 'বর্গফুট' : 'sq ft'})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-mono text-neutral-500 uppercase mb-1.5">
                    {language === 'bn' ? 'দ্বিতীয় রেসিডেন্স ইউনিট কোড' : 'UNIT REPRESENTATIVE II'}
                  </label>
                  <select
                    value={compareUnitB}
                    onChange={(e) => setCompareUnitB(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 text-gold-300 font-mono text-xs rounded p-2 focus:outline-none focus:border-gold-400 cursor-pointer"
                  >
                    {apartmentTypes.map(apt => (
                      <option key={apt.id} value={apt.id} className="text-white bg-neutral-900">
                        {apt.name} ({apt.sizeSqFt} {language === 'bn' ? 'বর্গফুট' : 'sq ft'})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Comparative Spreadsheet table */}
              {(() => {
                const u1 = apartmentTypes.find(x => x.id === compareUnitA) || apartmentTypes[0];
                const u2 = apartmentTypes.find(x => x.id === compareUnitB) || apartmentTypes[1];

                const getFacing = (id: string) => {
                  if (id === 'A') return language === 'bn' ? 'দক্ষিণ-পশ্চিম (সম্মুখভাগ, পূর্ণ রোদ)' : 'SOUTH-WEST (Front, Solar Max)';
                  if (id === 'B') return language === 'bn' ? 'দক্ষিণ-পূর্ব (সম্মুখভাগ, ভোরের মিষ্টি রোদ)' : 'SOUTH-EAST (Front, Morning Light)';
                  if (id === 'C') return language === 'bn' ? 'উত্তর-পশ্চিম (পেছনভাগ, শান্ত বাতাস)' : 'NORTH-WEST (Rear, Thermal Calm)';
                  return language === 'bn' ? 'উত্তর-পূর্ব (পেছনভাগ, নির্মল ধোয়া আলো)' : 'NORTH-EAST (Rear, Serene Sky)';
                };

                const getPrice = (id: string) => {
                  if (id === 'A' || id === 'B') return language === 'bn' ? 'মূল্য অনুসন্ধানে যোগাযোগ করতে পারেন' : '~ 1.38 Crore BDT';
                  return language === 'bn' ? 'মূল্য অনুসন্ধানে যোগাযোগ করতে পারেন' : '~ 1.25 Crore BDT';
                };

                const getFlatStatus = (floor: number, unitCode: string): 'Available' | 'Reserved' | 'Sold' => {
                  const sum = floor * 3 + unitCode.charCodeAt(0);
                  const hash = sum % 7;
                  if (hash === 1 || hash === 4) return 'Reserved';
                  if (hash === 0 || hash === 3 || hash === 5) return 'Sold';
                  return 'Available';
                };

                const getTranslatedStatus = (status: string) => {
                  if (language !== 'bn') return status;
                  if (status === 'Available') return 'সংরক্ষণযোগ্য';
                  if (status === 'Reserved') return 'বুকিংকৃত';
                  return 'বিক্রিত';
                };

                const getFlatReservedDates = (floor: number, unitCode: string): string[] => {
                  const status = getFlatStatus(floor, unitCode);
                  if (status === 'Available') return [];
                  const day = ((floor * 7 + unitCode.charCodeAt(0)) % 20) + 5;
                  const month = ((floor + unitCode.charCodeAt(0)) % 3) + 6; // June, July, August 2026
                  return [
                    `2026-0${month}-${day < 10 ? '0' + day : day}`,
                    `2026-0${month}-${(day + 1) < 10 ? '0' + (day + 1) : (day + 1)}`,
                    `2026-0${month}-${(day + 2) < 10 ? '0' + (day + 2) : (day + 2)}`
                  ];
                };

                return (
                  <div className="overflow-x-auto border border-neutral-800 rounded-lg w-full">
                    <table className="w-full text-left font-sans text-xs border-collapse text-neutral-300 min-w-[600px]">
                      <thead>
                        <tr className="bg-neutral-950/80 border-b border-neutral-800 font-mono text-[10px] text-neutral-400">
                          <th className="p-3 w-[250px]">{language === 'bn' ? 'স্পেসিফিকেশন পরিমাপ তালিকা' : 'SPECIFICATION MATRIX'}</th>
                          <th className="p-3 text-gold-300 bg-gold-400/5">{u1.name}</th>
                          <th className="p-3 text-gold-300 bg-neutral-950/20">{u2.name}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-850">
                        <tr>
                          <td className="p-3 font-mono text-neutral-500">{language === 'bn' ? 'নেট আয়তন' : 'NET FLOOR PLOT SIZE'}</td>
                          <td className="p-3 font-semibold text-white bg-gold-400/5">
                            {u1.sizeSqFt} {language === 'bn' ? 'বর্গফুট' : 'SQ FT'}
                          </td>
                          <td className="p-3 font-semibold text-white">
                            {u2.sizeSqFt} {language === 'bn' ? 'বর্গফুট' : 'SQ FT'}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono text-neutral-500">{language === 'bn' ? 'বেডরুমের সংখ্যা' : 'BEDROOMS CONFIG'}</td>
                          <td className="p-3 bg-gold-400/5">
                            {u1.bedrooms} {language === 'bn' ? 'টি চমৎকার বেড' : 'Bed Tiers'}
                          </td>
                          <td className="p-3">
                            {u2.bedrooms} {language === 'bn' ? 'টি চমৎকার বেড' : 'Bed Tiers'}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono text-neutral-500">{language === 'bn' ? 'বাথরুম সংখ্যা' : 'BATHROOMS LOBBY'}</td>
                          <td className="p-3 bg-gold-400/5">
                            {u1.bathrooms} {language === 'bn' ? 'টি লাক্স বাথ' : 'Luxe Baths'}
                          </td>
                          <td className="p-3">
                            {u2.bathrooms} {language === 'bn' ? 'টি লাক্স বাথ' : 'Luxe Baths'}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono text-neutral-500">{language === 'bn' ? 'বারান্দার পরিমাণ' : 'VERANDAS & BALCONIES'}</td>
                          <td className="p-3 bg-gold-400/5">
                            {u1.verandas} {language === 'bn' ? 'টি খোলা বারান্দা' : 'Attached Bays'}
                          </td>
                          <td className="p-3">
                            {u2.verandas} {language === 'bn' ? 'টি খোলা বারান্দা' : 'Attached Bays'}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono text-neutral-500">{language === 'bn' ? 'দিক ও ভেন্টিলেশন মুখ' : 'ORIENTATION & WINDFLOW'}</td>
                          <td className="p-3 text-neutral-100 font-mono text-[10px] bg-gold-400/5">{getFacing(u1.id)}</td>
                          <td className="p-3 text-neutral-100 font-mono text-[10px]">{getFacing(u2.id)}</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono text-neutral-500">{language === 'bn' ? 'কর্নার অবস্থান' : 'CORNER STATUS'}</td>
                          <td className="p-3 text-emerald-400 font-semibold bg-gold-400/5">
                            {language === 'bn' ? '১০০% কর্নার সুরক্ষিত' : '100% Corner Secured'}
                          </td>
                          <td className="p-3 text-emerald-400 font-semibold">
                            {language === 'bn' ? '১০০% কর্নার সুরক্ষিত' : '100% Corner Secured'}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono text-neutral-500">{language === 'bn' ? 'যার জন্য উপযুক্ত' : 'IDEAL FOR'}</td>
                          <td className="p-3 text-neutral-400 bg-gold-400/5">{u1.idealFor}</td>
                          <td className="p-3 text-neutral-400">{u2.idealFor}</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono text-neutral-500">{language === 'bn' ? 'বুকিং স্থিতি ও তলাভিত্তিক তথ্য' : 'BOOKED APARTMENTS & RESERVED DATES'}</td>
                          <td className="p-3 bg-gold-400/5 font-mono text-[10px] text-neutral-400">
                            <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                              {Array.from({ length: 9 }, (_, idx) => {
                                const floor = idx + 1;
                                const status = getFlatStatus(floor, u1.id);
                                if (status === 'Available') return null;
                                const flatId = `${floor}0${['A', 'B', 'C', 'D'].indexOf(u1.id) + 1}`;
                                const dates = getFlatReservedDates(floor, u1.id);
                                return (
                                  <div key={flatId} className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-neutral-800/40 pb-1.5 pt-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold text-white"># {flatId}</span>
                                      <span className={`px-1 rounded text-[7.5px] font-bold tracking-wider uppercase ${status === 'Reserved' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                        {getTranslatedStatus(status)}
                                      </span>
                                    </div>
                                    <span className="text-neutral-500 text-[8.5px] font-mono mt-0.5 sm:mt-0">
                                      {dates.join(' // ')}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                          <td className="p-3 font-mono text-[10px] text-neutral-400">
                            <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                              {Array.from({ length: 9 }, (_, idx) => {
                                const floor = idx + 1;
                                const status = getFlatStatus(floor, u2.id);
                                if (status === 'Available') return null;
                                const flatId = `${floor}0${['A', 'B', 'C', 'D'].indexOf(u2.id) + 1}`;
                                const dates = getFlatReservedDates(floor, u2.id);
                                return (
                                  <div key={flatId} className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-neutral-800/40 pb-1.5 pt-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold text-white"># {flatId}</span>
                                      <span className={`px-1 rounded text-[7.5px] font-bold tracking-wider uppercase ${status === 'Reserved' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                        {getTranslatedStatus(status)}
                                      </span>
                                    </div>
                                    <span className="text-neutral-500 text-[8.5px] font-mono mt-0.5 sm:mt-0">
                                      {dates.join(' // ')}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                        </tr>
                        <tr className="bg-neutral-950/40">
                          <td className="p-3 font-mono text-gold-400 font-bold">{language === 'bn' ? 'মূল্যসীমা প্রাক্কলন' : 'ESTIMATION RANGE'}</td>
                          <td className="p-3 font-serif text-sm text-gold-300 font-semibold bg-gold-400/10 border-t border-gold-400/20">{getPrice(u1.id)}</td>
                          <td className="p-3 font-serif text-sm text-gold-300 font-semibold border-t border-neutral-800">{getPrice(u2.id)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })()}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsCompareOpen(false)}
                  className="px-5 py-2.5 bg-gold-400 hover:bg-gold-500 text-neutral-950 rounded font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all"
                >
                  {language === 'bn' ? 'ব্লুপ্রিন্টে ফিরে যান' : 'Return to Blueprints'}
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
