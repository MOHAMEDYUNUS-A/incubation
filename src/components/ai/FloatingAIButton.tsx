"use client";

import React, { useState } from "react";
import { Sparkles, MessageSquare } from "lucide-react";
import AIAssistantModal from "./AIAssistantModal";

export default function FloatingAIButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-semibold text-xs shadow-2xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
          aria-label="Open AI Incubation Assistant"
        >
          <span className="flex h-2 w-2 rounded-full bg-cyan-300 animate-ping" />
          <Sparkles className="w-4 h-4 text-cyan-200" />
          <span className="tracking-wide hidden sm:inline">MASTeR AI Copilot</span>
        </button>
      </div>

      <AIAssistantModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
