/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sun, Wind, ShieldCheck, TreePine, Sparkles, Building2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Vision() {
  const [activeTab, setActiveTab] = useState<'ventilation' | 'lobby' | 'rooftop' | 'structure'>('ventilation');
  const { t, language } = useLanguage();

  const visionTabs = [
    {
      id: 'ventilation',
      title: language === 'bn' ? 'আলো এবং বাতাস' : 'Daylight & Ventilation',
      subtitle: language === 'bn' ? 'ডুয়াল উইন্ডো করিডোর' : 'Dual ventilation corridors',
      icon: Wind,
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
      description: language === 'bn'
        ? 'প্রতি ফ্লোরে মাত্র ৪টি ফ্ল্যাট থাকার মাধ্যমে প্রতিটি ঘরই কর্নার ইউনিটের সুবিধা পায়। এর ফলে ৩টি পাশ উন্মুক্ত বাতাস ও আলো প্রবেশ করতে দেয় এবং শোবার ঘরে চমৎকার ভেন্টিলেশন পাওয়া যায়।'
        : 'With exactly four flats per floor, every home takes a corner slot. This ingenious design secures 3-side exposure, bathing rooms in morning daylight while generating persistent high-velocity cross-wind drafts across all bedrooms.',
      stats: [
        { label: language === 'bn' ? 'খোলা জানালা' : 'Exposed Corners', value: language === 'bn' ? 'প্রতি ফ্ল্যাটে ৪টি' : '4 per flat' },
        { label: language === 'bn' ? 'আলোর ব্যবস্থা' : 'Daylight Coverage', value: language === 'bn' ? '১০০% সকল রুম' : '100% Rooms' },
      ],
      bullets: language === 'bn' ? [
        'দ্বিমুখী আলোযুক্ত চমৎকার মাস্টার বারান্দা।',
        'উষ্ণ বায়ু নিষ্কাশনের জন্য চমৎকার বাতাস প্রবাহ ও ড্যাম্প সুরক্ষাকার চ্যানেল।',
        'উন্নত মানের ডাবল ক্রোম-গ্লেজড স্লাইডিং গ্লাস উইন্ডো।'
      ] : [
        'Naturally lit dual-exposure master verandas.',
        'Prevents hot-spots through persistent convective air currents.',
        'High-performance glazed sliding windows for optimal seals.',
      ],
    },
    {
      id: 'lobby',
      title: language === 'bn' ? 'গ্র্যান্ড সেন্ট্রাল লবি' : 'Grand Central Lobby',
      subtitle: language === 'bn' ? 'সুসজ্জিত অভ্যর্থনা স্পেস' : 'Refined transitional space',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      description: language === 'bn'
        ? 'গভীর চারকোল গ্রানাইট এবং ব্রাশড গোল্ড প্যানেল দিয়ে সুসজ্জিত একটি সেন্ট্রাল অভ্যর্থনা ডেস্ক যা আপনার আগমনকারী বিশিষ্ট অতিথি এবং বাসিন্দাদের স্বাগত জানাবে রাজকীয় আভিজাত্যে।'
        : 'A towering main reception desk finished in deep charcoal granite and brushed gold panels sets a powerful, dignified welcoming tone for both residents and distinguished corporate and personal visitors.',
      stats: [
        { label: language === 'bn' ? 'সিলিং হাইট' : 'Ceiling Height', value: language === 'bn' ? 'ডবল ভলিউম' : 'Double Volume' },
        { label: language === 'bn' ? 'নিরাপত্তা কভার' : 'Security Cover', value: language === 'bn' ? '২৪/৭ গার্ড অ্যাক্সেস' : '24/7 Gate Guard' },
      ],
      bullets: language === 'bn' ? [
        'ইতালিয়ান মার্বেল পাথর দিয়ে নির্মিত দৃষ্টিনন্দন ফ্লোরিং।',
        'মহামান্য দর্শক ও নিরাপত্তা কর্মীদের জন্য আরামদায়ক বিলাসবহুল ব্যাকরেস্ট লাউঞ্জ।',
        'বাসিন্দাদের সুরক্ষায় ডিজিটাল বায়োমেট্রিক গেট প্রবেশদ্বার।'
      ] : [
        'Italian stone tiles with subtle gold-accented grouts.',
        'Luxurious seating lounge for visitors and security staff.',
        'Secured biometric passage access points for residents.',
      ],
    },
    {
      id: 'rooftop',
      title: language === 'bn' ? 'ছাদ বাগান ও সামাজিক ছাদ' : 'Rooftop Community Haven',
      subtitle: language === 'bn' ? 'পরিকল্পিত অবসর ডেক' : 'Landscaped leisure deck',
      icon: TreePine,
      image: 'https://images.unsplash.com/photo-1531971589569-0d93700db184?auto=format&fit=crop&w=1000&q=80',
      description: language === 'bn'
        ? 'ব্যস্ত নগর জীবনের কোলাহল থেকে মুক্ত আমাদের সুন্দর রুফটপ জোন। যেখানে রয়েছে সবুজ ল্যান্ডস্কেপ করা পাথরের বেড, মনোরম আলো এবং ঢাকার প্যানোরামিক বিউ।'
        : 'Escape above standard metropolitan noise to our beautifully curated penthouse-level community zone. Enjoy landscaped stone flower beds, soft accent solar lights, and panoramic vistas of Dhaka.',
      stats: [
        { label: language === 'bn' ? 'সুযোগ সুবিধা এলাকা' : 'Amenity Area', value: language === 'bn' ? '২,৫০০ বর্গফুট' : '2,500 sq ft' },
        { label: language === 'bn' ? 'লশ গার্ডেন' : 'Lush Gardens', value: language === 'bn' ? 'ছাদের চারপাশে' : 'Rooftop Periphery' },
      ],
      bullets: language === 'bn' ? [
        'পারিবারিক আচার অনুষ্ঠান ও গেট-টুগেদার করার জন্য আদর্শ ও সুরক্ষিত স্পেস।',
        'উচ্চ মানের গ্লাস সিকিউরিটি বেরিয়ার সহ নিরাপদ আবহাওয়া-প্রতিরোধী মেকআপ।',
        'ল্যান্ডস্কেপ স্থপতিদের দ্বারা পরিকল্পিত বিরল প্রজাতির বাহারি বৃক্ষ রোপন ব্যবস্থা।'
      ] : [
        'Dedicated secure space for familial community events.',
        'Weather-proof design with safe glass safety barriers.',
        'Lush endemic flora designed by landscape architects.',
      ],
    },
    {
      id: 'structure',
      title: language === 'bn' ? 'কাঠামোগত আধুনিকতা' : 'Structural Sophistication',
      subtitle: language === 'bn' ? 'সর্বোচ্চ বুনিয়াদ মানদণ্ড' : 'Engineered safety standards',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      description: language === 'bn'
        ? 'অতি কঠোর রাজুক (RAJUK) বিল্ডিং কোড মেনে নির্মিত। বহুতল ভবনটির স্থায়ী সুরক্ষায় গভীর কাস্ট-ইন-সিটু পাইলিং ও ভূমিকম্প প্রতিরোধী ডিজাইনের নিখুঁত রূপায়ন করা হয়েছে।'
        : 'Engineered to meet rigorous RAJUK National Building Code standards. The tower is anchored by a Reinforced Concrete Raft over deep Cast-in-Situ piles, utilizing multi-layer elastomeric polymer waterproofing membranes.',
      stats: [
        { label: language === 'bn' ? 'কংক্রিট শক্তি (ফ\'সি)' : 'Concrete Strength f\'c', value: language === 'bn' ? '৪,০০০ পিএসআই কাস্ট' : '4,000 PSI Cast' },
        { label: language === 'bn' ? 'স্টিল রিইনফোর্সমেন্ট' : 'Steel Reinforcement', value: language === 'bn' ? 'বিএসআরএম ৭২.৫ প্রিমিয়াম গ্রেড' : 'Grade 60/72 High-Yield' },
      ],
      bullets: language === 'bn' ? [
        'বিশাল আকারের কংক্রিট বেস কলাম নেটওয়ার্ক (১৬" x ২৪") যা সর্বোচ্চ নিরাপত্তা ধরে রাখে।',
        'ভূমিকম্পর সহনশীলতা বাড়াতে ভারী ডিফর্মড রিবার স্টিল জাল সংযোগ।',
        'ড্যাম্প প্রতিরোধের জন্য মাল্টি-লেয়ার ওয়াটারপ্রুফিং মেমব্রেন পদ্ধতি।'
      ] : [
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
            {t('vision.badge')}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-neutral-900 tracking-tight leading-none mb-6">
            {t('vision.title')}
          </h2>
          <div className="w-12 h-[1px] bg-gold-400 mx-auto mb-6" />
          <p className="font-sans text-neutral-500 font-light text-base md:text-lg leading-relaxed">
            {t('vision.subtitle')}
          </p>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Tab Selectors (Compact desktop-first listing) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-[10px] tracking-widest text-[#999] uppercase pr-2 pl-1 mb-2">
              {language === 'bn' ? 'স্থাপত্যের বিভিন্ন দিকগুলি দেখুন' : 'Explore Architectural Facets'}
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
                {language === 'bn' ? 'সিভিল জরিপ এবং নিয়ন্ত্রণ পরিমাপ' : 'CIVIL SURVEY & REGULATORY METRICS'}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-normal text-[#111] tracking-tight">
                {language === 'bn' ? 'রাজুক বিল্ডিং কোড শিট' : 'RAJUK Building Code Sheet'}
              </h3>
            </div>
            <span className="text-2xs font-mono bg-neutral-100 text-neutral-600 px-3 py-1.5 rounded border border-neutral-200 uppercase tracking-widest">
              {language === 'bn' ? 'যাচাইকৃত নকশা • পূর্ব ফায়দাবাদ জি+৯' : 'Verified Executive Plan • East Faydabad G+9'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Box 1: Site Geometry */}
            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-150 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-3">
                  {language === 'bn' ? '০১ // জমির পরিমাণ ও আকার' : '01 // PLOT LAND GEOMETRY'}
                </span>
                <span className="font-serif text-2xl font-normal text-neutral-900 block leading-none mb-1">
                  {language === 'bn' ? '১০.০ কাঠা' : '10.0 Katha'}
                </span>
                <span className="text-xs text-neutral-500 font-sans">
                  {language === 'bn' ? 'মোট আয়তন: ৭,২০০ বর্গফুট (৬৬৮.৯ মি²)' : 'Total area: 7,200 sq ft (668.9 m²)'}
                </span>
              </div>
              <div className="border-t border-neutral-200/60 mt-4 pt-3 text-[10px] font-mono text-neutral-500 flex justify-between">
                <span>{language === 'bn' ? 'সামনের রাস্তা:' : 'FRONTAGE ACCESS:'}</span>
                <span className="text-neutral-800 font-bold">{language === 'bn' ? '৬০.০ ফুট চওড়া' : '60.0 FT ROAD'}</span>
              </div>
            </div>

            {/* Box 2: Footprint Coverage */}
            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-150 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-3">
                  {language === 'bn' ? '০২ // গ্রাউন্ড কভারেজ' : '02 // FOOTPRINT COVERAGE'}
                </span>
                <span className="font-serif text-2xl font-normal text-neutral-900 block leading-none mb-1">
                  {language === 'bn' ? '৬০.০% এমজিসি' : '60.0% MGC'}
                </span>
                <span className="text-xs text-neutral-500 font-sans">
                  {language === 'bn' ? 'সর্বোচ্চ গ্রাউন্ড কভারেজ কোড সম্মত' : 'Max Ground Coverage compliant'}
                </span>
              </div>
              <div className="border-t border-neutral-200/60 mt-4 pt-3 text-[10px] font-mono text-neutral-500 flex justify-between">
                <span>{language === 'bn' ? 'অনুমোদিত কোর তলা:' : 'ALLOWABLE CORE:'}</span>
                <span className="text-neutral-800 font-bold">{language === 'bn' ? '৪,৩২০ বর্গফুট' : '4,320 SQ FT'}</span>
              </div>
            </div>

            {/* Box 3: Regulated Setbacks */}
            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-150 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-3">
                  {language === 'bn' ? '০৩ // বাউন্ডারি চারপাশ ক্লিয়ারেন্স' : '03 // CLEAR BOUNDARY SETBACKS'}
                </span>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-1 font-mono text-xs">
                  <div className="flex justify-between border-b border-neutral-200/50 pb-0.5">
                    <span className="text-neutral-400 text-2xs">{language === 'bn' ? 'সামনে (দক্ষিণ)' : 'FRONT (S)'}</span>
                    <span className="text-neutral-800 font-semibold">৫'-০"</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200/50 pb-0.5">
                    <span className="text-neutral-400 text-2xs">{language === 'bn' ? 'পেছনে (উত্তর)' : 'REAR (N)'}</span>
                    <span className="text-neutral-800 font-semibold">১০'-০"</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400 text-2xs">{language === 'bn' ? 'পূর্ব' : 'EAST'}</span>
                    <span className="text-neutral-800 font-semibold">৪'-০"</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400 text-2xs">{language === 'bn' ? 'পশ্চিম' : 'WEST'}</span>
                    <span className="text-neutral-800 font-semibold">৪'-০"</span>
                  </div>
                </div>
              </div>
              <p className="text-[9px] text-neutral-400 font-sans mt-3">
                {language === 'bn' ? 'কোড মেনে বাউন্ডারি ছাড়ার ফলে মনোরম বাতাস স্বাভাবিক উপায়ে প্রবাহিত হবে।' : 'Full setbacks compliance keeps ambient airflow corridor free.'}
              </p>
            </div>

            {/* Box 4: Vertical Circulation Core */}
            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-150 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-3">
                  {language === 'bn' ? '০৪ // যাতায়াত কোর নেটওয়ার্ক' : '04 // CIRCULATION CORE'}
                </span>
                <span className="font-serif text-2xl font-normal text-neutral-900 block leading-none mb-1">
                  {language === 'bn' ? 'ডবল কোর লিফ্ট' : 'Double Core'}
                </span>
                <span className="text-xs text-neutral-500 font-sans">
                  {language === 'bn' ? '২টি হাই স্পিড লিফট, ২জোড়া সিঁড়ি' : '2 high-speed lifts, 2 stairwells'}
                </span>
              </div>
              <div className="border-t border-neutral-200/60 mt-4 pt-3 text-[10px] font-mono text-neutral-500 flex justify-between">
                <span>{language === 'bn' ? 'এমইপি শ্যাফ্ট সিস্টেম:' : 'MEP SHAFT SYSTEM:'}</span>
                <span className="text-neutral-800 font-bold">{language === 'bn' ? '২টি ডেডিকেটেড' : '2 DEDICATED'}</span>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
}
