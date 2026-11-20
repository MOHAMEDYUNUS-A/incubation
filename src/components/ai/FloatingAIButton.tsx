"use client";

import React, { useState } from "react";
import { Sparkles, Bot, Send, ArrowRight } from "lucide-react";
import AIAssistantModal from "./AIAssistantModal";

export default function FloatingAIButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Interactive AI Assistant Pill (Matching Reference Image 1) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Floating Input Pill Bar (Matching Image 1) */}
        <div
          onClick={() => setIsOpen(true)}
          className="cursor-pointer hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl hover:shadow-2xl hover:border-blue-400 transition-all duration-300 group"
        >
          <span className="text-xs text-slate-500 font-medium group-hover:text-slate-800 transition-colors">
            Ask me about incubation, funding, labs...
          </span>
          <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Institutional AI Assistant Avatar Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-14 h-14 rounded-full bg-[#0f2c59] hover:bg-[#1a3d75] p-0.5 shadow-xl shadow-blue-900/25 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-white group"
          aria-label="Open AI Incubation Assistant"
        >
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#0f2c59]">
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
