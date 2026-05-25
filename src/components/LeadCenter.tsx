/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Trash2, CheckCircle2, Phone, Mail, FileSpreadsheet, 
  BadgeCheck, Users2, ShieldAlert, BarChart3, Clock, TrendingUp 
} from 'lucide-react';
import { Inquiry } from '../types';

interface LeadCenterProps {
  isOpen: boolean;
  onClose: () => void;
  updateTrigger: number; // Trigger reload when updated elsewhere
}

export default function LeadCenter({ isOpen, onClose, updateTrigger }: LeadCenterProps) {
  const [leads, setLeads] = useState<Inquiry[]>([]);

  // Reload leads from local storage
  const loadLeads = () => {
    const stored = localStorage.getItem('abrar_leads');
    if (stored) {
      setLeads(JSON.parse(stored));
    } else {
      // Seed some premium default entries for immediate developer evaluation
      const sampleLeads: Inquiry[] = [
        {
          id: 'ABR2-FLAT-5021',
          name: 'Hasan Al-Mahmud',
          email: 'hasan.mahmud@techholdings.bd',
          phone: '01711-591024',
          interestedSize: 'Type A: 1350 sq ft',
          message: 'Interested in level 5 or 6, corner flat facing south near British Masjid. Ready for booking transfer.',
          createdAt: 'May 20, 2026, 04:12 PM',
          status: 'reserved'
        },
        {
          id: 'ABR2-FLAT-8812',
          name: 'Dr. Yasmin Chowdhury',
          email: 'yasmin.ch@dhaka-med.edu',
          phone: '01819-204125',
          interestedSize: 'Type C: 1100 sq ft',
          message: 'Would like to schedule private site tour this coming Saturday morning.',
          createdAt: 'May 24, 2026, 11:45 AM',
          status: 'new'
        }
      ];
      localStorage.setItem('abrar_leads', JSON.stringify(sampleLeads));
      setLeads(sampleLeads);
    }
  };

  useEffect(() => {
    loadLeads();
  }, [isOpen, updateTrigger]);

  const handleUpdateStatus = (id: string, newStatus: 'new' | 'contacted' | 'reserved') => {
    const updated = leads.map(l => (l.id === id ? { ...l, status: newStatus } : l));
    localStorage.setItem('abrar_leads', JSON.stringify(updated));
    setLeads(updated);
  };

  const handleDeleteLead = (id: string) => {
    const filtered = leads.filter(l => l.id !== id);
    localStorage.setItem('abrar_leads', JSON.stringify(filtered));
    setLeads(filtered);
  };

  const handleClearAll = () => {
    if (window.confirm('Confirm purging all local reservation logs?')) {
      localStorage.removeItem('abrar_leads');
      setLeads([]);
    }
  };

  // Compute metrics
  const totalLeads = leads.length;
  const reservedCount = leads.filter(l => l.status === 'reserved').length;
  const newCount = leads.filter(l => l.status === 'new').length;

  // Compute layout type demands
  const sizeDemands = leads.reduce((acc, lead) => {
    const key = lead.interestedSize.split(':')[0] || 'Type A';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
          />

          {/* Drawered Control Board */}
          <motion.div
            initial={{ x: '100%', opacity: 0.9 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl h-full bg-neutral-900 border-l border-neutral-800 text-white shadow-2xl flex flex-col justify-between z-10"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-gold-400/10 flex items-center justify-center border border-gold-400/20 text-gold-300">
                  <Users2 size={16} />
                </div>
                <div>
                  <h3 className="font-serif text-lg tracking-wide uppercase font-semibold">
                    Investor Ledger
                  </h3>
                  <span className="text-[10px] font-mono text-neutral-400 tracking-wider">
                    ABRAR TOWER-2 INTEL DESK
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded bg-neutral-950/60 text-neutral-400 hover:text-white hover:bg-neutral-800/80 transition-all cursor-pointer"
                aria-label="Close Admin LEDGER"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Center Pane */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8">
              
              {/* Executive stats summary */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded bg-neutral-950/30 border border-neutral-850">
                  <span className="font-mono text-[9px] text-[#888] tracking-widest uppercase block mb-1">
                    TOTAL LEADS
                  </span>
                  <span className="font-serif text-2xl font-semibold text-gold-200">
                    {totalLeads}
                  </span>
                </div>
                <div className="p-4 rounded bg-neutral-950/30 border border-neutral-850">
                  <span className="font-mono text-[9px] text-green-400 tracking-widest uppercase block mb-1">
                    RESERVED
                  </span>
                  <span className="font-serif text-2xl font-semibold text-green-300">
                    {reservedCount}
                  </span>
                </div>
                <div className="p-4 rounded bg-neutral-950/30 border border-neutral-850">
                  <span className="font-mono text-[9px] text-[#999] tracking-widest uppercase block mb-1">
                    NEW INQUIRY
                  </span>
                  <span className="font-serif text-2xl font-semibold text-blue-300">
                    {newCount}
                  </span>
                </div>
              </div>

              {/* Demand Charts */}
              {totalLeads > 0 && (
                <div className="p-6 rounded-lg bg-neutral-950/20 border border-neutral-850">
                  <span className="font-mono text-[9px] text-[#999] tracking-widest uppercase flex items-center gap-2 mb-4">
                    <BarChart3 size={11} className="text-gold-400" />
                    APARTMENT DEMAND DISTRIBUTION
                  </span>
                  <div className="space-y-3">
                    {(Object.keys(sizeDemands) as string[]).map((type) => {
                      const val = sizeDemands[type] || 0;
                      const percentage = Math.round((val / totalLeads) * 100);
                      return (
                        <div key={type} className="flex flex-col gap-1 text-xs">
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-neutral-300 font-medium">{type} layout</span>
                            <span className="text-gold-300 font-mono">
                              {val} lead{val > 1 ? 's' : ''} ({percentage}%)
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-neutral-900 overflow-hidden">
                            <div
                              className="h-full bg-gold-400 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Inquiries Ledger Grid list */}
              <div>
                <div className="flex justify-between items-center mb-4 pl-1">
                  <span className="font-mono text-[9px] text-[#999] tracking-widest uppercase">
                    ACTIVE APPLICANT LEDGER
                  </span>
                  {leads.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="text-[10px] text-red-400 hover:text-red-300 font-mono uppercase"
                    >
                      Purge All
                    </button>
                  )}
                </div>

                {leads.length === 0 ? (
                  <div className="text-center p-12 border border-dashed border-neutral-800 rounded text-neutral-55px">
                    <ShieldAlert size={24} className="mx-auto mb-3 text-neutral-600" />
                    <p className="font-sans text-xs">No customer inquiries archived in localStorage.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {leads.map((l) => (
                      <div
                        key={l.id}
                        className="p-5 bg-neutral-950/40 rounded-lg border border-neutral-850 flex flex-col justify-between gap-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-mono text-[9px] text-[#888] uppercase block">
                              REFERENCE ID: {l.id}
                            </span>
                            <h4 className="font-serif text-md font-medium text-white">{l.name}</h4>
                            <span className="text-[10px] bg-neutral-900 border border-neutral-800 text-gold-300 font-mono px-2 py-0.5 rounded inline-block mt-1">
                              {l.interestedSize}
                            </span>
                          </div>

                          <div className="flex flex-col items-end gap-1.5">
                            <span className="text-[9px] text-neutral-500 font-sans">{l.createdAt}</span>
                            
                            {/* Status Change control */}
                            <select
                              value={l.status}
                              onChange={(e) => handleUpdateStatus(l.id, e.target.value as any)}
                              className={`p-1 px-2 border rounded text-[9px] font-mono tracking-widest uppercase cursor-pointer ${
                                l.status === 'reserved'
                                  ? 'bg-green-500/15 text-green-300 border-green-500/30'
                                  : l.status === 'contacted'
                                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                  : 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                              }`}
                            >
                              <option value="new" className="bg-neutral-900 text-white">New</option>
                              <option value="contacted" className="bg-neutral-900 text-white">Contacted</option>
                              <option value="reserved" className="bg-neutral-900 text-white">Reserved</option>
                            </select>
                          </div>
                        </div>

                        {l.message && (
                          <p className="text-xs text-neutral-400 font-sans italic bg-neutral-900/40 p-3 rounded">
                            "{l.message}"
                          </p>
                        )}

                        {/* Interactive triggers to call/mail client */}
                        <div className="flex justify-between items-center border-t border-neutral-800/80 pt-3">
                          <div className="flex gap-4">
                            <a
                              href={`tel:${l.phone}`}
                              className="text-neutral-400 hover:text-white text-2xs flex items-center gap-1 font-mono transition-colors"
                            >
                              <Phone size={10} />
                              {l.phone}
                            </a>
                            <a
                              href={`mailto:${l.email}`}
                              className="text-neutral-400 hover:text-white text-2xs flex items-center gap-1 font-mono transition-colors"
                            >
                              <Mail size={10} />
                              {l.email}
                            </a>
                          </div>

                          <button
                            onClick={() => handleDeleteLead(l.id)}
                            className="p-1 px-1.5 rounded hover:bg-neutral-900 border border-transparent hover:border-red-500/20 text-neutral-500 hover:text-red-400 transition-all cursor-pointer"
                            title="Delete Log"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer control panel */}
            <div className="p-6 md:p-8 border-t border-neutral-850 flex items-center justify-between text-xs text-neutral-400 bg-neutral-950/20">
              <span className="font-mono text-[9px]">Abrar Tower-2 Lead Ops v1.0</span>
              <span className="text-[10px] text-gold-300 font-serif font-light">
                Secure Client-Side Sandboxed Database
              </span>
            </div>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
