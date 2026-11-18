"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Cpu, ChevronDown, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const REAL_HERO_SLIDES = [
  {
    url: "/images/mamcet-campus.png",
    caption: "M.A.M. College of Engineering and Technology Campus, Siruganur, Trichy",
  },
  {
    url: "/images/coworking-space.jpg",
    caption: "MASTeR Incubation Foundation Dedicated Workspaces & Maker Lab",
  },
  {
    url: "/images/mentoring-session.png",
    caption: "Mentoring, Ideation & Technology Capacity Building at MIF",
  },
];

export default function Hero({ onOpenAI }: { onOpenAI?: () => void }) {
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % REAL_HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 bg-gradient-to-b from-blue-50/60 via-white to-slate-50">
      {/* Background Ambience with Soft Visual Presence */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.08),transparent)]" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10 my-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Institutional Partner Logos Banner Strip (From Banner PDF) */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-5 py-2.5 rounded-2xl bg-white shadow-sm mb-7 border border-slate-200/90"
          >
            <div className="flex items-center gap-1.5" title="M.A.M. College of Engineering and Technology">
              <img src="/logos/mamcet-logo.png" alt="MAMCET" className="h-8 sm:h-10 object-contain" />
            </div>
            <div className="h-5 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5" title="AICTE">
              <img src="/logos/aicte-logo.png" alt="AICTE" className="h-7 sm:h-9 object-contain" />
            </div>
            <div className="h-5 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5" title="Institution's Innovation Council">
              <img src="/logos/iic-logo.png" alt="IIC" className="h-7 sm:h-9 object-contain" />
            </div>
            <div className="h-5 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5" title="NBA">
              <img src="/logos/nba-logo.png" alt="NBA" className="h-6 sm:h-8 object-contain" />
            </div>
            <div className="h-5 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5" title="MASTeR Incubation Foundation">
              <img src="/logos/master-incubation-logo.png" alt="MIF" className="h-8 sm:h-10 object-contain" />
            </div>
            <div className="h-5 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5" title="StartupTN">
              <img src="/logos/startuptn.jpg" alt="StartupTN" className="h-6 sm:h-8 object-contain rounded" />
            </div>
          </motion.div>

          {/* Section 8 & Pre-Incubation Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-5 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping" />
            <span>A Section 8 Company Registered Under Companies Act, 2013</span>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-4 leading-[1.1] font-display"
          >
            MASTeR Incubation <br className="hidden sm:inline" />
            <span className="text-blue-600">Foundation (MIF)</span>
          </motion.h1>

          {/* Tagline from Official Banner PDF */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-xl sm:text-2xl font-bold text-slate-700 mb-5 font-display italic"
          >
            &ldquo;Launchpad for your Entrepreneurial Success&rdquo;
          </motion.div>

          {/* Address & College Label */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-sm sm:text-base text-slate-600 max-w-2xl mb-9 leading-relaxed"
          >
            <strong className="text-slate-900">M.A.M. College of Engineering and Technology (MAMCET)</strong> <br />
            Trichy - Chennai Trunk Road, Siruganur, Trichy, Tamil Nadu - 621 105. <br />
            <span className="text-blue-700 font-semibold">StartupTN Recognised Pre-Incubation Centre</span>
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto"
          >
            <Link href="/apply" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 h-12 rounded-xl shadow-md shadow-blue-500/20 gap-2 text-base group"
              >
                <span>Apply for Incubation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/programs" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-slate-300 bg-white hover:bg-slate-50 text-slate-800 px-7 h-12 rounded-xl text-base shadow-sm"
              >
                Explore 4-Stage Pathway
              </Button>
            </Link>

            {onOpenAI && (
              <Button
                onClick={onOpenAI}
                size="lg"
                variant="ghost"
                className="w-full sm:w-auto text-blue-700 hover:text-blue-800 hover:bg-blue-50 px-5 h-12 rounded-xl text-sm gap-2 border border-blue-200"
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>AI Idea Diagnostic</span>
              </Button>
            )}
          </motion.div>

          {/* Verified Pillars Ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-left w-full max-w-4xl"
          >
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 uppercase">StartupTN</div>
                <div className="text-[11px] text-slate-500">Pre-Incubation Hub</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 uppercase">Section 8</div>
                <div className="text-[11px] text-slate-500">Not-for-Profit Co.</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 uppercase">7 Focus Tracks</div>
                <div className="text-[11px] text-slate-500">AI, IoT & Mfg</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 uppercase">Seed Grants</div>
                <div className="text-[11px] text-slate-500">TANSEED Guidance</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 cursor-pointer hidden md:flex"
      >
        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Scroll to Explore</span>
        <ChevronDown className="w-4 h-4 text-blue-600" />
      </motion.div>
    </section>
  );
}
