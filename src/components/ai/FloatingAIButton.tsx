"use client";

import React, { useState } from "react";
import { Bot, ArrowRight, Sparkles } from "lucide-react";
import AIAssistantModal from "./AIAssistantModal";

export default function FloatingAIButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Interactive AI Assistant Pill with Glassmorphism */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Floating Input Pill Bar (Frosted Glassmorphism) */}
        <div
          onClick={() => setIsOpen(true)}
          className="cursor-pointer hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/70 hover:bg-white/90 backdrop-blur-2xl border border-white/80 shadow-[0_12px_36px_rgba(15,44,89,0.15)] ring-1 ring-slate-900/5 transition-all duration-300 group hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="w-5 h-5 rounded-full bg-orange-50 border border-orange-200/80 flex items-center justify-center text-[#ea580c]">
            <Sparkles className="w-3 h-3" />
          </div>
          <span className="text-xs text-slate-700 font-semibold group-hover:text-slate-900 transition-colors">
            Ask me about incubation, funding, labs...
          </span>
          <div className="w-5 h-5 rounded-full bg-[#0f2c59] flex items-center justify-center text-white group-hover:bg-[#ea580c] transition-colors shadow-2xs">
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Institutional AI Assistant Avatar Button (Frosted Glassmorphism & Subtle Glow) */}
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#0f2c59] to-[#1e40af] backdrop-blur-xl p-0.5 shadow-[0_10px_30px_rgba(15,44,89,0.35)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-white/90 group"
          aria-label="Open AI Incubation Assistant"
        >
          <div className="w-full h-full rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-blue-50/80 flex items-center justify-center text-[#0f2c59]">
              <Bot className="w-6 h-6 text-[#0f2c59] group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          {/* Active Ping Glow */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
          </span>
        </button>
      </div>

      <AIAssistantModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
