"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Bot, ArrowRight, Sparkles } from "lucide-react";
import AIAssistantModal from "./AIAssistantModal";

export default function FloatingAIButton() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Do not show public floating assistant modal trigger on admin console
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* Floating Interactive AI Assistant Pill & Button (Simplified, Responsive & Clutter-Free) */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2.5">
        {/* Desktop Sleek Search Pill */}
        <div
          onClick={() => setIsOpen(true)}
          className="cursor-pointer hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/80 hover:bg-white backdrop-blur-xl border border-white/90 shadow-[0_8px_30px_rgba(15,44,89,0.12)] hover:shadow-xl transition-all duration-200 group"
        >
          <Sparkles className="w-4 h-4 text-[#dc2626]" />
          <span className="text-xs text-slate-700 font-semibold group-hover:text-slate-900 transition-colors">
            Ask MASTerAI about incubation, grants, labs...
          </span>
          <div className="w-5 h-5 rounded-full bg-[#0f2c59] flex items-center justify-center text-white group-hover:bg-[#dc2626] transition-colors shadow-2xs">
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Mobile Compact Trigger Pill */}
        <button
          onClick={() => setIsOpen(true)}
          className="sm:hidden flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#0f2c59] text-white shadow-xl border border-white/90 active:scale-95 transition-all"
          aria-label="Open MASTerAI"
        >
          <Sparkles className="w-3.5 h-3.5 text-red-500" />
          <span className="text-xs font-bold tracking-wide">MASTerAI</span>
        </button>

        {/* Desktop Single-Surface Avatar Button (No nested clutter or ping dots) */}
        <button
          onClick={() => setIsOpen(true)}
          className="hidden sm:flex w-12 h-12 rounded-full bg-[#0f2c59] hover:bg-[#1a3d75] text-white shadow-[0_8px_25px_rgba(15,44,89,0.3)] hover:scale-105 active:scale-95 transition-all duration-200 items-center justify-center border-2 border-white group"
          aria-label="Open MASTerAI Assistant"
        >
          <Bot className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>

      <AIAssistantModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
