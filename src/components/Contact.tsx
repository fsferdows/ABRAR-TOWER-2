/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, Phone, Mail, FileText, CheckCircle2, Copy, 
  CreditCard, Landmark, Check, Download, AlertCircle, RefreshCw 
} from 'lucide-react';
import { Inquiry } from '../types';

interface ContactProps {
  onLeadSubmitted: () => void;
}

export default function Contact({ onLeadSubmitted }: ContactProps) {
  const officeAddress = 'House No.- 774/1, East Faydabad, Atipara, Dakshinkhan, Uttara, Dhaka-1230.';
  
  const hotlines = [
    '01715-030167',
    '01715-030168',
    '01681-056664',
    '01824-114760'
  ];

  const bankDetails = {
    bankName: 'Dutch Bangla Bank Limited',
    branch: 'Uttarkhan',
    accountName: 'Mohammed Abdul Momen',
    accountNo: '2141570457493',
    routingNo: '090264601',
    swiftCode: 'DBBLBDDH'
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    size: 'Type A: 1350 sq ft',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [submittedReceipt, setSubmittedReceipt] = useState<Inquiry | null>(null);

  const handleCopy = (field: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email';
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      tempErrors.phone = 'Please provide a valid phone number';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newInquiry: Inquiry = {
      id: `ABR2-FLAT-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      interestedSize: formData.size,
      message: formData.message,
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'new'
    };

    // Save submission to localStorage
    const existing: Inquiry[] = JSON.parse(localStorage.getItem('abrar_leads') || '[]');
    existing.unshift(newInquiry);
    localStorage.setItem('abrar_leads', JSON.stringify(existing));

    setSubmittedReceipt(newInquiry);
    onLeadSubmitted(); // Notify parent of changes to trigger list updates if needed

    // Clear form
    setFormData({
      name: '',
      email: '',
      phone: '',
      size: 'Type A: 1350 sq ft',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-neutral-900 text-white relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-neutral-800" />
      <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-gold-400/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-mono text-xs text-gold-400 tracking-[0.3em] uppercase block mb-3">
            RESERVATION HUB
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight leading-none mb-6">
            Secure Your Share
          </h2>
          <div className="w-12 h-[1px] bg-gold-400 mx-auto mb-6" />
          <p className="font-sans text-neutral-400 font-light text-sm md:text-base leading-relaxed">
            Acquire shares in Dutch Bangla Bank Limited bank accounts or consult our specialized project advisors. Secure corner layout positions before the official structural concrete framing commences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: DBBL Premium card & Hotline Guides */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="flex flex-col gap-8">
              <span className="font-mono text-[10px] tracking-widest text-[#999] uppercase pr-2">
                BANK WIRE BANKING DETAILS
              </span>

              {/* Embossed DBBL Gold Banking Card */}
              <div className="relative rounded-2xl bg-gradient-to-br from-gold-850 via-neutral-900 to-neutral-950 p-6 md:p-8 border border-gold-400/30 shadow-2xl overflow-hidden aspect-[1.586/1] w-full max-w-[420px] mx-auto group">
                {/* Visual texture rings */}
                <div className="absolute top-0 right-0 w-56 h-56 bg-gold-400/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="relative h-full flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-serif text-sm md:text-base font-semibold text-gold-100 block tracking-wider">
                        DUTCH BANGLA BANK
                      </span>
                      <span className="font-sans text-[8px] text-gold-400 tracking-widest uppercase block leading-none">
                        UTTARKHAN BRANCH • DHAKA
                      </span>
                    </div>
                    {/* Golden digital chip */}
                    <div className="w-10 h-7 rounded bg-gradient-to-r from-gold-300 to-gold-400 border border-gold-600/20 shadow flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-[1.5px] w-6 h-4">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="border-[0.5px] border-neutral-900/10 rounded-[1px] bg-transparent" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Account Numbers and Swift details */}
                  <div className="my-4">
                    <span className="font-sans text-[7px] text-neutral-400 tracking-widest uppercase block mb-1">
                      DIRECT TRANSMISSION NUMBER
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-lg md:text-xl font-semibold tracking-wider text-gold-300">
                        {bankDetails.accountNo}
                      </span>
                      <button
                        onClick={() => handleCopy('acc', bankDetails.accountNo)}
                        className="p-1 px-2 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-all duration-200 text-xs flex items-center gap-1.5 font-mono"
                        aria-label="Copy Account Number"
                      >
                        {copiedField === 'acc' ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                        <span className="text-[10px]">{copiedField === 'acc' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4 grid grid-cols-2 gap-3">
                    <div>
                      <span className="font-sans text-[7px] text-neutral-400 tracking-widest uppercase block mb-0.5">
                        SWIFT ROUTING CODE
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-xs text-white tracking-wider">{bankDetails.swiftCode}</span>
                        <button
                          onClick={() => handleCopy('swift', bankDetails.swiftCode)}
                          className="p-0.5 rounded text-neutral-500 hover:text-white"
                          title="Copy Swift Code"
                        >
                          <Copy size={10} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="font-sans text-[7px] text-neutral-400 tracking-widest uppercase block mb-0.5">
                        ROUTING CODE
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-xs text-white tracking-wider">{bankDetails.routingNo}</span>
                        <button
                          onClick={() => handleCopy('route', bankDetails.routingNo)}
                          className="p-0.5 rounded text-neutral-500 hover:text-white"
                          title="Copy Routing Number"
                        >
                          <Copy size={10} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Account Holder Card Signature line */}
                  <div className="mt-3 flex justify-between items-end border-t border-white/5 pt-2">
                    <div>
                      <span className="font-sans text-[6px] text-neutral-400 tracking-widest uppercase block leading-none mb-1">
                        PROPRIETARY ACCOUNT HOLDER
                      </span>
                      <span className="font-serif text-2xs md:text-xs text-gold-350 tracking-wider font-light leading-none block">
                        {bankDetails.accountName}
                      </span>
                    </div>
                    <span className="font-sans text-[8px] tracking-[0.2em] font-medium text-gold-500 uppercase leading-none">
                      Abrar-2
                    </span>
                  </div>
                </div>
              </div>

              {/* Hotline communication Hub */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[9px] text-[#999] tracking-widest uppercase block mb-1">
                  OFFICIAL HOTLINES (CLICK TO CALL)
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {hotlines.map((hl, i) => (
                    <a
                      key={i}
                      href={`tel:${hl.replace(/-/g, '')}`}
                      className="p-3 bg-neutral-950/40 border border-neutral-850 hover:border-gold-400/30 hover:bg-neutral-950 transition-all rounded flex items-center gap-3 group text-left"
                    >
                      <Phone size={12} className="text-gold-400 group-hover:scale-110 transition-transform" />
                      <span className="font-mono text-xs text-neutral-300 group-hover:text-white transition-colors">{hl}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Office physical HQ info */}
            <div className="mt-10 border-t border-neutral-800 pt-6">
              <div className="flex items-start gap-4 text-xs text-neutral-400">
                <Building size={16} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-[#999] uppercase block mb-1">
                    OFFICIAL HEADQUARTERS
                  </span>
                  <p className="font-sans text-neutral-300 leading-normal">
                    {officeAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Interactive Form OR Animated Receipt Preview */}
          <div className="lg:col-span-7 bg-neutral-950/40 border border-neutral-850 rounded-xl p-8 shadow-2xl flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {!submittedReceipt ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6 justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 border-b border-neutral-850 pb-4">
                      <span className="font-serif text-lg font-medium text-white flex items-center gap-2">
                        <FileText size={16} className="text-gold-400" />
                        Inquire Residence Position
                      </span>
                      <span className="text-xs text-gold-400 bg-gold-400/10 px-2 py-0.5 rounded border border-gold-400/25 font-mono">
                        Direct Lead Core
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Name input */}
                      <div>
                        <label className="font-mono text-[9px] text-[#999] uppercase block mb-2 tracking-widest leading-none">
                          Applicant Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Mohammed Abdul Momen"
                          className={`w-full bg-neutral-950 border p-3 rounded text-sm text-white font-sans focus:outline-none focus:border-gold-400 transition-colors ${
                            errors.name ? 'border-red-500' : 'border-neutral-800'
                          }`}
                        />
                        {errors.name && <span className="text-[10px] text-red-400 font-sans mt-1 block">{errors.name}</span>}
                      </div>

                      {/* Phone input */}
                      <div>
                        <label className="font-mono text-[9px] text-[#999] uppercase block mb-2 tracking-widest leading-none">
                          Mobile Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. 01715-XXXXXX"
                          className={`w-full bg-neutral-950 border p-3 rounded text-sm text-white font-mono focus:outline-none focus:border-gold-400 transition-colors ${
                            errors.phone ? 'border-red-500' : 'border-neutral-800'
                          }`}
                        />
                        {errors.phone && <span className="text-[10px] text-red-400 font-sans mt-1 block">{errors.phone}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Email input */}
                      <div>
                        <label className="font-mono text-[9px] text-[#999] uppercase block mb-2 tracking-widest leading-none">
                          Corporate/Personal Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. contact@domain.com"
                          className={`w-full bg-neutral-950 border p-3 rounded text-sm text-white font-sans focus:outline-none focus:border-gold-400 transition-colors ${
                            errors.email ? 'border-red-500' : 'border-neutral-800'
                          }`}
                        />
                        {errors.email && <span className="text-[10px] text-red-400 font-sans mt-1 block">{errors.email}</span>}
                      </div>

                      {/* Size select */}
                      <div>
                        <label className="font-mono text-[9px] text-[#999] uppercase block mb-2 tracking-widest leading-none">
                          Interested Apartment Size / Layout Type
                        </label>
                        <select
                          name="size"
                          value={formData.size}
                          onChange={handleInputChange}
                          className="w-full bg-neutral-950 border border-neutral-800 p-3 rounded text-sm text-white font-sans focus:outline-none focus:border-gold-400 transition-colors cursor-pointer"
                        >
                          <option value="Type A: 1350 sq ft">Type A: 1350 sq ft (4 Bed Grand)</option>
                          <option value="Type B: 1350 sq ft">Type B: 1350 sq ft (3 Bed Living Expand)</option>
                          <option value="Type C: 1100 sq ft">Type C: 1100 sq ft (3 Bed Corner Compact)</option>
                          <option value="Type D: 1100 sq ft">Type D: 1100 sq ft (3 Bed Compact Linear)</option>
                          <option value="Type E: 1050 sq ft">Type E: 1050 sq ft (3 Bed Executive)</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-6">
                      <label className="font-mono text-[9px] text-[#999] uppercase block mb-2 tracking-widest leading-none">
                        Accompanying Notes / Bespoke Requests
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Request specific floor levels, share structure payment options, or schedule site inspection times here."
                        className="w-full bg-neutral-950 border border-neutral-800 p-3 rounded text-sm text-white font-sans focus:outline-none focus:border-gold-400 transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded bg-gold-400 hover:bg-gold-500 text-neutral-950 text-xs font-semibold uppercase tracking-wider transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-gold-400/5 active:scale-98"
                  >
                    <span>Secure Reservation Submission</span>
                  </button>
                </motion.form>
              ) : (
                /* LUXURY RECEIPT AND COMMITTED TIMELINE PANEL */
                <motion.div
                  key="receipt"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col gap-6 justify-between h-full text-left"
                >
                  <div className="p-6 bg-neutral-950/60 rounded border border-gold-400/20 shadow-inner relative">
                    {/* Background seal watermark */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[44px] text-white/[0.01] tracking-[0.2em] font-bold select-none rotate-12 pointer-events-none">
                      APPROVED
                    </div>

                    <div className="flex justify-between items-start border-b border-neutral-850 pb-4 mb-4">
                      <div>
                        <span className="font-mono text-[8px] text-green-400 tracking-widest uppercase block mb-0.5">
                          SECURE SHARE RECEIPT INSTATED
                        </span>
                        <h3 className="font-serif text-lg font-medium text-white">
                          Inquiry Confirmed
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-[10px] text-gold-200 block">
                          {submittedReceipt.id}
                        </span>
                        <span className="text-[9px] text-neutral-400 font-sans block block italic">
                          {submittedReceipt.createdAt}
                        </span>
                      </div>
                    </div>

                    {/* Receipt Body specifications */}
                    <div className="flex flex-col gap-3 font-sans text-xs mb-6">
                      <div className="flex justify-between border-b border-neutral-850 pb-2">
                        <span className="text-neutral-500">Applicant:</span>
                        <span className="text-white font-medium">{submittedReceipt.name}</span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-850 pb-2">
                        <span className="text-neutral-500">Contact Number:</span>
                        <span className="text-gold-300 font-mono">{submittedReceipt.phone}</span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-850 pb-2">
                        <span className="text-neutral-500">Email Address:</span>
                        <span className="text-neutral-300">{submittedReceipt.email}</span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-850 pb-2">
                        <span className="text-neutral-500">Layout Choice:</span>
                        <span className="text-white font-mono font-medium">{submittedReceipt.interestedSize}</span>
                      </div>
                      {submittedReceipt.message && (
                        <div className="border-b border-neutral-850 pb-2">
                          <span className="text-neutral-500 block mb-1">Accompanying Memo:</span>
                          <span className="text-neutral-400 italic font-light text-2xs block">
                            "{submittedReceipt.message}"
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Realistic Processing Timeline Tracker */}
                    <span className="font-mono text-[8px] tracking-[0.2em] text-[#999] uppercase block mb-3 pl-1">
                      REAL-TIME REVENUE & DOCUMENT INDEX STATUS
                    </span>
                    <div className="grid grid-cols-4 gap-2 text-center relative pt-1 before:absolute before:top-[12px] before:left-[10%] before:right-[10%] before:h-[1px] before:bg-neutral-800">
                      <div className="relative z-10">
                        <div className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 border border-green-500 flex items-center justify-center mx-auto mb-1">
                          <Check size={10} />
                        </div>
                        <span className="text-[9px] text-white block font-mono font-medium">Logged</span>
                      </div>
                      <div className="relative z-10">
                        <div className="w-5 h-5 rounded-full bg-neutral-900 text-neutral-400 border border-neutral-800 flex items-center justify-center mx-auto mb-1 animate-pulse">
                          <RefreshCw size={10} className="text-gold-300 animate-spin" style={{ animationDuration: '4s' }} />
                        </div>
                        <span className="text-[9px] text-gold-300 block font-mono font-semibold">Validating</span>
                      </div>
                      <div className="relative z-10">
                        <div className="w-5 h-5 rounded-full bg-neutral-950 text-neutral-600 border border-neutral-900 flex items-center justify-center mx-auto mb-1">
                          <Check size={10} className="opacity-0" />
                        </div>
                        <span className="text-[9px] text-neutral-500 block font-mono">Assigned</span>
                      </div>
                      <div className="relative z-10">
                        <div className="w-5 h-5 rounded-full bg-neutral-950 text-neutral-600 border border-neutral-900 flex items-center justify-center mx-auto mb-1">
                          <Check size={10} className="opacity-0" />
                        </div>
                        <span className="text-[9px] text-neutral-500 block font-mono">Tour Site</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setSubmittedReceipt(null)}
                      className="px-5 py-3 rounded text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-500 text-xs font-mono uppercase tracking-wider flex-grow text-center flex items-center justify-center gap-2"
                    >
                      <span>New Inquiry</span>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-5 py-3 rounded bg-gold-400 hover:bg-gold-500 text-neutral-950 text-xs font-bold uppercase tracking-wider flex-grow text-center flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download size={13} />
                      <span>Print Share Slip</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>

      </div>
    </section>
  );
}
