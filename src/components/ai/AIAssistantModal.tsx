"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Send,
  Bot,
  RefreshCw,
  Copy,
  Check,
  ArrowRight,
  PhoneCall,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

function FormattedContent({ content, isUser }: { content: string; isUser: boolean }) {
  if (isUser) {
    return <div className="whitespace-pre-line">{content}</div>;
  }

  // Parse lines for assistant message, stripping any raw asterisks and converting **text** to strong
  const lines = content.split("\n");

  return (
    <div className="space-y-1.5 leading-relaxed">
      {lines.map((line, lIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lIdx} className="h-1.5" />;
        }

        // Bullet point check (- or * or numbered)
        const isBullet = /^[*-]\s+/.test(trimmed);
        const textContent = isBullet ? trimmed.replace(/^[*-]\s+/, "") : line;

        // Split by **bold**
        const parts = textContent.split(/(\*\*[^*]+\*\*)/g);

        const renderedLine = parts.map((part, pIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={pIdx} className="font-bold text-slate-900">
                {part.slice(2, -2)}
              </strong>
            );
          }
          // Remove stray single asterisks
          return <span key={pIdx}>{part.replace(/\*/g, "")}</span>;
        });

        if (isBullet) {
          return (
            <div key={lIdx} className="flex items-start gap-2 pl-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-1.5" />
              <span>{renderedLine}</span>
            </div>
          );
        }

        return <div key={lIdx}>{renderedLine}</div>;
      })}
    </div>
  );
}

const PROMPT_CHIPS = [
  "How do I apply for incubation?",
  "What seed grants are available?",
  "What prototyping equipment is in labs?",
  "Who can I contact for mentoring?",
  "10-slide pitch deck format",
  "Tell me about the 7 focus areas",
];

export default function AIAssistantModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      content:
        "👋 Hello! I am **MASTerAI**, your guide for incubation at MAMCET & StartupTN Centre.\n\nHow can I help you today? You can ask me about **applying for incubation**, **seed grants (TANSEED / MSME)**, **our labs & prototyping equipment**, or **connecting with mentors**.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { id: `a-${Date.now()}`, role: "assistant", content: data.reply },
        ]);
      } else {
        throw new Error(data.error);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content:
            "I could not reach the server right now. For immediate assistance, please reach out directly:\n- **Incubation Manager**: Mr. M. Santhosh Kumar (+91 9361697702)\n- **Incubation Coordinator**: Ms. Hemalatha Balakrishnan (+91 6381945574)\n- Email: incubationmanager@mamcet.com",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-full sm:max-w-md md:max-w-lg h-[580px] sm:h-[620px] max-h-[85vh] rounded-3xl bg-white/90 backdrop-blur-2xl border border-white/80 shadow-[0_25px_70px_rgba(15,44,89,0.25)] ring-1 ring-slate-900/10 flex flex-col overflow-hidden"
        >
          {/* Header (Clean MASTerAI without Copilot or Online pill) */}
          <div className="p-4 px-5 bg-white/75 backdrop-blur-xl border-b border-slate-200/70 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0f2c59] flex items-center justify-center text-white shadow-md border border-white/40">
                <Sparkles className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 font-display">
                  MASTerAI
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  MIF Incubation & Grants Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  setMessages([
                    {
                      id: "init",
                      role: "assistant",
                      content:
                        "Chat refreshed! How can MASTerAI assist your startup or research project today?",
                    },
                  ])
                }
                className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-white/80 transition-colors"
                title="Clear conversation"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-white/80 transition-colors"
                title="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Feed with Translucent Frosted Ambiance */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-xs bg-slate-50/40 backdrop-blur-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.role === "assistant" && (
                  <div className="w-7 h-7 rounded-xl bg-blue-100/90 border border-blue-200/90 flex items-center justify-center text-[#0f2c59] shrink-0 mt-0.5 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`p-4 rounded-2xl max-w-[85%] leading-relaxed relative group ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-[#0f2c59] to-[#1e40af] text-white rounded-br-xs shadow-md text-xs sm:text-sm font-medium border border-blue-800/40"
                      : "bg-white/90 backdrop-blur-md border border-white/80 text-slate-800 rounded-bl-xs shadow-sm text-xs sm:text-[13px]"
                  }`}
                >
                  <FormattedContent content={m.content} isUser={m.role === "user"} />

                  {m.role === "assistant" && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-400">
                      <span>MASTerAI Verified</span>
                      <button
                        onClick={() => handleCopy(m.id, m.content)}
                        className="hover:text-slate-700 p-1 flex items-center gap-1 transition-colors"
                        title="Copy answer"
                      >
                        {copiedId === m.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600 text-[10px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="text-[10px]">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="w-7 h-7 rounded-xl bg-blue-100/90 border border-blue-200/90 flex items-center justify-center text-[#0f2c59] shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/80 text-slate-500 flex items-center gap-1.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips (Frosted Glassmorphism) */}
          <div className="px-4 py-2.5 bg-white/60 backdrop-blur-md border-t border-slate-200/70 flex gap-2 overflow-x-auto scrollbar-none">
            {PROMPT_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="text-[11px] px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-red-700 hover:border-red-400 whitespace-nowrap transition-all border border-slate-200/80 shadow-2xs font-semibold backdrop-blur-sm"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Action Callout bar */}
          <div className="px-4 py-2 bg-blue-50/50 backdrop-blur-md border-t border-blue-100/60 flex items-center justify-between text-xs">
            <span className="text-blue-900 font-medium">Ready to take the next step?</span>
            <Link
              href="/apply"
              onClick={onClose}
              className="text-[#dc2626] hover:underline font-bold flex items-center gap-1"
            >
              <span>Apply for Incubation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Input Footer (Frosted Glassmorphism) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white/75 backdrop-blur-xl border-t border-slate-200/70 flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about incubation, grants, labs, mentoring..."
              className="h-11 text-xs sm:text-sm bg-white/90 backdrop-blur-md border-slate-300/80 rounded-xl px-3.5 focus-visible:ring-red-600 shadow-2xs"
            />
            <Button
              type="submit"
              disabled={loading || !input.trim()}
              size="sm"
              className="bg-[#dc2626] hover:bg-[#b91c1c] text-white shrink-0 h-11 px-4 rounded-xl shadow-md shadow-red-600/25 transition-all"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
