/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Send, 
  Signal, 
  Clock, 
  HelpCircle,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  Key
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export default function PhoneChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<'speak' | 'keypad'>('speak');
  const [synthActive, setSynthActive] = useState(true);
  const [speechError, setSpeechError] = useState<string | null>(null);
  
  // Microphone Speech Recognition states
  const [isListening, setIsListening] = useState(false);

  // References
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize Speech Services on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;

      // Check for SpeechRecognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = 'en-US';

        rec.onstart = () => {
          setIsListening(true);
        };

        rec.onend = () => {
          setIsListening(false);
        };

        rec.onerror = (e: any) => {
          console.error("Speech Recognition error:", e);
          setSpeechError("Microphone connection failed.");
          setIsListening(false);
        };

        rec.onresult = (event: any) => {
          const resultText = event.results[0][0].transcript;
          if (resultText) {
            setInputText(resultText);
            // Auto submit speech results
            handleSendMessage(resultText);
          }
        };

        recognitionRef.current = rec;
      }
    }

    return () => {
      stopCallTimer();
      stopVoiceSpeaking();
    };
  }, []);

  // Handle auto scroll of transcription window
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Ticking Call Timer
  const startCallTimer = () => {
    setCallDuration(0);
    timerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
  };

  const stopCallTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatCallTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Speaks out loud using TTS browser API
  const speakVoice = (text: string) => {
    if (!synthActive || !synthRef.current) return;

    try {
      // Cancel outstanding speaking
      stopVoiceSpeaking();

      // Clean the text from markdown characters for speech friendliness
      const cleanText = text
        .replace(/\*/g, '')
        .replace(/৳/g, 'Taka ')
        .replace(/#/g, '');

      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      // Attempt to load a beautiful English voice
      const voices = synthRef.current.getVoices();
      const idealVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha')));
      if (idealVoice) utterance.voice = idealVoice;

      utterance.rate = 0.95; // Slightly slower for prestige front-desk feel
      utterance.pitch = 1.0;

      utterance.onerror = (e) => {
        console.error("Speech synthesis failure:", e);
      };

      currentUtteranceRef.current = utterance;
      synthRef.current.speak(utterance);
    } catch (e) {
      console.error("Failed to speak text:", e);
    }
  };

  const stopVoiceSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
  };

  // Initiate call
  const startCall = () => {
    setIsCalling(true);
    startCallTimer();
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: "Thank you for dialing Abrar Tower Executive hotline. My name is Yasmin, your AI telephone concierge. Please press any digit on your pad, or describe what information you are seeking about our Uttara residences, layouts, elevator cores, or floor pricing.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    speakVoice("Thank you for dialing Abrar Tower Executive hotline. My name is Yasmin, your AI telephone concierge.");
  };

  // End call
  const endCall = () => {
    stopCallTimer();
    stopVoiceSpeaking();
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsCalling(false);
    setCallDuration(0);
  };

  // Toggle microphone dictation
  const toggleListening = () => {
    if (!recognitionRef.current) {
      setSpeechError("Voice input is not supported in this browser. Please type below.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      stopVoiceSpeaking();
      setSpeechError(null);
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Submits data to backend api "/api/chat"
  const handleSendMessage = async (textToSend: string) => {
    const rawText = textToSend || inputText;
    if (!rawText.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: 'user',
      text: rawText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const chatHistory = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: rawText, history: chatHistory })
      });
      const data = await res.json();

      setIsTyping(false);
      const hostReply = data.reply || "Thank you for your telephone call. To continue our reservation procedures, please fill out the Contact Form below.";
      
      const modelMsg: ChatMessage = {
        id: Math.random().toString(),
        role: 'model',
        text: hostReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, modelMsg]);
      speakVoice(hostReply);

    } catch (err) {
      setIsTyping(false);
      const fallbackText = "Our satellite telephone link is carrying high traffic. Our executive MRL lift lobbies, 36 corner suites, and ground-floor parking areas are open for reservations. Please submit your details in the contact tab below and our manager will call you back.";
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        role: 'model',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      speakVoice(fallbackText);
    }
  };

  // DTMF Pad Key clicks (Simulate dial options)
  const handleKeypadClick = (digit: string) => {
    // Play subtle audio signal (synthetic tone bip) if synthesis is active
    if (typeof window !== 'undefined' && synthRef.current) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.12);
      } catch (e) {}
    }

    let requestMsg = "";
    switch(digit) {
      case '1':
        requestMsg = "Pressed 1: Residential Suites Configurations";
        break;
      case '2':
        requestMsg = "Pressed 2: Project Map & Location Directions";
        break;
      case '3':
        requestMsg = "Pressed 3: Investment Portfolios & Price Estimates";
        break;
      case '4':
        requestMsg = "Pressed 4: Building facilities (Lifts, Flooring rules)";
        break;
      case '0':
        requestMsg = "Pressed 0: Direct dialogue connection to Reception Pool";
        break;
      default:
        requestMsg = `Pressed DTMF Pad: [${digit}]`;
    }

    handleSendMessage(requestMsg);
    setActiveTab('speak'); // Return to transcription text log
  };

  return (
    <>
      {/* Floating Quiet Luxury Calling Hotbar */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => {
            setIsOpen(true);
            if (!isCalling) startCall();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 bg-gradient-to-r from-gold-500 to-amber-600 text-neutral-950 px-5 py-3.5 rounded-full font-mono text-xs font-semibold tracking-widest shadow-2xl hover:shadow-gold-500/10 hover:border-gold-300 border border-gold-400/20 cursor-pointer"
        >
          <div className="relative">
            <Phone size={14} className="animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping" />
          </div>
          <span className="uppercase">Executive Concierge Hotline</span>
        </motion.button>
      </div>

      {/* FULL DETAILED PHONE INTERACTIVE CONCIERGE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#111] max-w-md w-full rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl flex flex-col justify-between"
              style={{ maxHeight: '90vh' }}
            >
              
              {/* Telephone HUD Card Header */}
              <div className="bg-neutral-900 px-6 py-5 border-b border-neutral-805 text-white relative">
                <div className="absolute top-2 right-4 flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-[8px] font-mono tracking-widest text-[#999] uppercase">SECURE LINK</span>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-neutral-950 border border-gold-500/20 flex items-center justify-center relative">
                      <Phone size={15} className="text-gold-400" />
                      {isCalling && (
                        <span className="absolute inset-0 rounded-full border border-gold-400/50 animate-ping" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif text-sm font-semibold tracking-wider block">ABRAR RECEPTION</span>
                        <div className="flex gap-0.5 items-end h-2">
                          <div className="w-0.75 h-1 bg-gold-400" />
                          <div className="w-0.75 h-2 bg-gold-400" />
                          <div className="w-0.75 h-3 bg-gold-400" />
                          <div className="w-0.75 h-4 bg-gold-400" />
                        </div>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono tracking-wide">Dialing: (Simulated Voice) // +880 18108 ABRAR</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      endCall();
                      setIsOpen(false);
                    }}
                    className="p-1 px-2.5 rounded bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800 text-[10px] font-mono hover:border-neutral-700 cursor-pointer"
                  >
                    CLOSE [X]
                  </button>
                </div>

                {/* Satellite Connected Timer HUD */}
                <div className="mt-4 flex items-center justify-between border-t border-neutral-850/60 pt-3 text-[10px] font-mono text-neutral-400">
                  <div className="flex items-center gap-1">
                    <Clock size={10} className="text-gold-400" />
                    <span>DURATION: {formatCallTime(callDuration)}</span>
                  </div>
                  <div className="flex gap-2.5">
                    <button 
                      onClick={() => setSynthActive(!synthActive)} 
                      title="Toggle speech synthesis voice output"
                      className={`flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded border ${
                        synthActive ? 'text-gold-300 border-gold-500/30 bg-gold-500/5' : 'text-neutral-500 border-neutral-800'
                      }`}
                    >
                      {synthActive ? <Volume2 size={10} /> : <VolumeX size={10} />}
                      <span>VOICE {synthActive ? 'ON' : 'MUTED'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* TABS SELECTOR - DTMF Keypad vs Transcription dialog */}
              <div className="grid grid-cols-2 text-center border-b border-neutral-850 font-mono text-[10px] bg-neutral-900/40">
                <button
                  onClick={() => setActiveTab('speak')}
                  className={`py-3 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider transition-colors ${
                    activeTab === 'speak' ? 'border-b-2 border-gold-400 text-white font-semibold' : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  <MessageSquare size={11} />
                  <span>Call Transcript</span>
                </button>
                <button
                  onClick={() => setActiveTab('keypad')}
                  className={`py-3 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider transition-colors ${
                    activeTab === 'keypad' ? 'border-b-2 border-gold-400 text-white font-semibold' : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  <Key size={11} />
                  <span>Interactive Dialpad</span>
                </button>
              </div>

              {/* MIDDLE BODY CONTENT */}
              <div className="flex-grow p-6 h-[280px] overflow-y-auto flex flex-col justify-between">
                
                {/* 1. TRANSCRIPT DIALOGUE VIEW */}
                {activeTab === 'speak' && (
                  <div className="space-y-4 w-full h-full overflow-y-auto pr-1">
                    {messages.map((msg) => {
                      const isModel = msg.role === 'model';
                      return (
                        <div 
                          key={msg.id}
                          className={`flex flex-col max-w-[85%] ${isModel ? 'mr-auto items-start' : 'ml-auto items-end'}`}
                        >
                          <div
                            className={`p-3.5 rounded-2xl text-xs font-sans leading-relaxed ${
                              isModel 
                                ? 'bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-tl-none' 
                                : 'bg-gold-400 text-neutral-950 font-medium rounded-tr-none'
                            }`}
                          >
                            {msg.text}
                          </div>
                          <span className="text-[8px] font-mono text-neutral-600 mt-1 uppercase tracking-wide">
                            {isModel ? 'Reception Concierge' : 'You (Caller)'} • {msg.timestamp}
                          </span>
                        </div>
                      );
                    })}

                    {/* Animated Speech waves if model is answering */}
                    {isTyping && (
                      <div className="mr-auto max-w-[80%] flex items-start gap-1.5 p-3 rounded-xl bg-neutral-900 border border-neutral-850">
                        <div className="flex gap-1 items-end h-3 my-0.5">
                          <div className="w-1 bg-gold-400 rounded-full animate-bounce h-2" style={{ animationDelay: '0s' }} />
                          <div className="w-1 bg-gold-400 rounded-full animate-bounce h-3" style={{ animationDelay: '0.15s' }} />
                          <div className="w-1 bg-gold-400 rounded-full animate-bounce h-1" style={{ animationDelay: '0.3s' }} />
                        </div>
                        <span className="text-2xs text-neutral-500 font-mono italic">Speaking...</span>
                      </div>
                    )}
                    <div ref={chatBottomRef} />
                  </div>
                )}

                {/* 2. PHYSICAL PHONE DIAL PAD OPTIONS (DTMF Dialing System) */}
                {activeTab === 'keypad' && (
                  <div className="flex flex-col items-center justify-center h-full gap-4">
                    <span className="text-[9px] font-mono tracking-widest text-[#999] bg-neutral-950 border border-neutral-850 px-3 py-1 rounded max-w-xs text-center uppercase">
                      DIAL MENU: DTMF SELECTION BOARD
                    </span>

                    {/* Dialer Pad Grid */}
                    <div className="grid grid-cols-3 gap-3 w-56">
                      {[
                        { num: '1', sub: 'SUITES' },
                        { num: '2', sub: 'MAP' },
                        { num: '3', sub: 'PRICING' },
                        { num: '4', sub: 'LIFT/FLR' },
                        { num: '5', sub: 'AMENITY' },
                        { num: '6', sub: 'ROOF' },
                        { num: '7', sub: 'TERMS' },
                        { num: '8', sub: 'RECEPT' },
                        { num: '9', sub: 'RESERV' },
                        { num: '*', sub: 'TONE' },
                        { num: '0', sub: 'RAW AI' },
                        { num: '#', sub: 'CLEAR' },
                      ].map((item) => (
                        <button
                          key={item.num}
                          onClick={() => handleKeypadClick(item.num)}
                          className="w-16 h-16 rounded-full bg-neutral-900 hover:bg-neutral-850 text-white border border-neutral-800 hover:border-gold-400/30 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-gold-500/5 active:scale-95"
                        >
                          <span className="text-lg font-serif font-extrabold leading-none">{item.num}</span>
                          <span className="text-[7px] font-mono text-neutral-500 tracking-wider font-semibold mt-0.5 leading-none">{item.sub}</span>
                        </button>
                      ))}
                    </div>

                    <p className="text-[9px] font-sans text-neutral-500 text-center max-w-xs leading-normal italic">
                      Click digit pads to trigger automated phone menus on suites, locations, lifts, & prices.
                    </p>
                  </div>
                )}

              </div>

              {/* FOOTER CALL ACTIONS BAR */}
              <div className="bg-neutral-900 p-5 border-t border-neutral-850 font-mono">
                
                {/* Speech recognition error banners */}
                {speechError && (
                  <div className="mb-3 p-2 bg-red-950/40 rounded border border-red-500/20 text-[9px] text-red-300 flex items-center gap-1.5">
                    <ShieldAlert size={10} className="text-red-400" />
                    <span>{speechError}</span>
                  </div>
                )}

                {/* Simulated vocal waveform visualization showing ongoing voice activity if calling */}
                {isCalling && (
                  <div className="flex items-center justify-center h-4 gap-1 mb-4 select-none">
                    <span className="text-[8px] text-neutral-600 uppercase tracking-widest mr-2">Line Monitor:</span>
                    {synthActive && !isMuted ? (
                      Array.from({ length: 18 }).map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            height: isTyping ? [2, 16, 2] : [2, 6, 2]
                          }}
                          transition={{
                            duration: 0.6 + (i % 3) * 0.15,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                          className={`w-0.75 bg-gold-400 rounded-full`}
                        />
                      ))
                    ) : (
                      <div className="w-full h-0.5 bg-neutral-850 rounded" />
                    )}
                  </div>
                )}

                {/* Form entries for text question */}
                <div className="flex items-center gap-2 mb-4 bg-neutral-950 p-1.5 rounded-lg border border-neutral-850">
                  {/* Web Speech Dictation button */}
                  <button
                    onClick={toggleListening}
                    title="Speak using microphone"
                    className={`p-2 rounded-full cursor-pointer transition-colors ${
                      isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {isListening ? <Mic size={14} /> : <MicOff size={14} />}
                  </button>

                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendMessage('');
                    }}
                    placeholder={isListening ? "Listening to voice..." : "Type text message or press keypad digits..."}
                    className="flex-grow bg-transparent border-none text-xs text-white focus:outline-none focus:ring-0 placeholder-neutral-600 font-sans"
                    disabled={isListening}
                  />

                  <button
                    onClick={() => handleSendMessage('')}
                    disabled={!inputText.trim() || isListening}
                    className="p-2 bg-gold-400 hover:bg-gold-500 text-neutral-950 rounded cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={12} />
                  </button>
                </div>

                {/* Dial Controls (Mute / Speaker / End Call) */}
                <div className="flex items-center justify-between gap-4">
                  
                  {/* Mute button */}
                  <button
                    onClick={() => {
                      setIsMuted(!isMuted);
                      if (!isMuted) stopVoiceSpeaking();
                    }}
                    className={`p-2.5 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                      isMuted ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                    }`}
                    title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                  >
                    {isMuted ? <MicOff size={14} /> : <Mic size={14} />}
                  </button>
                  
                  {/* RED DISCONNECT BUTTON */}
                  <button
                    onClick={() => {
                      endCall();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full font-sans text-xs font-semibold tracking-wider cursor-pointer active:scale-95 transition-all shadow-lg shadow-red-600/10"
                  >
                    <PhoneOff size={13} />
                    <span>Disconnect</span>
                  </button>

                  {/* Speakerphone toggler */}
                  <button
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    className={`p-2.5 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                      isSpeakerOn ? 'bg-gold-500/10 text-gold-400 border-gold-400/30' : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                    }`}
                    title={isSpeakerOn ? 'Turn off speakerphone' : 'Turn on speakerphone'}
                  >
                    {isSpeakerOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
                  </button>

                </div>

              </div>
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
