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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16">
      {/* Background Carousel with Real Photos from MIF PDF Brochure */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${REAL_HERO_SLIDES[slideIdx].url})` }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-[#050814]/90 via-[#070c1d]/85 to-[#050814]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.25),rgba(255,255,255,0))]" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10 my-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Institutional Partner Logos Banner Strip (From Banner PDF) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-6 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl mb-8 border border-white"
          >
            <div className="flex items-center gap-1.5" title="M.A.M. College of Engineering and Technology">
              <img src="/logos/mamcet-logo.png" alt="MAMCET" className="h-9 sm:h-11 object-contain" />
            </div>
            <div className="h-6 w-px bg-slate-300" />
            <div className="flex items-center gap-1.5" title="AICTE">
              <img src="/logos/aicte-logo.png" alt="AICTE" className="h-8 sm:h-10 object-contain" />
            </div>
            <div className="h-6 w-px bg-slate-300" />
            <div className="flex items-center gap-1.5" title="Institution's Innovation Council">
              <img src="/logos/iic-logo.png" alt="IIC" className="h-8 sm:h-10 object-contain" />
            </div>
            <div className="h-6 w-px bg-slate-300" />
            <div className="flex items-center gap-1.5" title="NBA">
              <img src="/logos/nba-logo.png" alt="NBA" className="h-7 sm:h-9 object-contain" />
            </div>
            <div className="h-6 w-px bg-slate-300" />
            <div className="flex items-center gap-1.5" title="MASTeR Incubation Foundation">
              <img src="/logos/master-incubation-logo.png" alt="MIF" className="h-9 sm:h-11 object-contain" />
            </div>
            <div className="h-6 w-px bg-slate-300" />
            <div className="flex items-center gap-1.5" title="StartupTN">
              <img src="/logos/startuptn.jpg" alt="StartupTN" className="h-7 sm:h-9 object-contain rounded" />
            </div>
          </motion.div>

          {/* Section 8 & Pre-Incubation Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-md mb-6 shadow-xl"
          >
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
              A Section 8 Company Registered Under Companies Act, 2013
            </span>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 leading-[1.1] font-display"
          >
            MASTeR Incubation <br className="hidden sm:inline" />
            <span className="gradient-text">Foundation (MIF)</span>
          </motion.h1>

          {/* Tagline from Official Banner PDF */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl sm:text-2xl font-bold text-cyan-300 mb-6 font-display italic"
          >
            &ldquo;Launchpad for your Entrepreneurial Success&rdquo;
          </motion.div>

          {/* Address & College Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-sm sm:text-base text-slate-300 max-w-2xl mb-10 leading-relaxed"
          >
            <strong>M.A.M. College of Engineering and Technology (MAMCET)</strong> <br />
            Trichy - Chennai Trunk Road, Siruganur, Trichy, Tamil Nadu - 621 105. <br />
            <span className="text-cyan-400 font-medium">StartupTN Recognised Pre-Incubation Centre</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link href="/apply" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 h-13 rounded-xl shadow-xl shadow-blue-600/30 gap-2 text-base group"
              >
                <span>Apply for Incubation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/programs" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 px-7 h-13 rounded-xl text-base"
              >
                Explore 4-Stage Pathway
              </Button>
            </Link>

            {onOpenAI && (
              <Button
                onClick={onOpenAI}
                size="lg"
                variant="ghost"
                className="w-full sm:w-auto text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 px-5 h-13 rounded-xl text-sm gap-2 border border-cyan-500/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI Idea Diagnostic</span>
              </Button>
            )}
          </motion.div>

          {/* Ticker from PDF Brochure */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left w-full max-w-4xl"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">StartupTN</div>
                <div className="text-[11px] text-slate-400">Pre-Incubation Hub</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">Section 8</div>
                <div className="text-[11px] text-slate-400">Not-for-Profit Co.</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Cpu className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">7 Focus Tracks</div>
                <div className="text-[11px] text-slate-400">AI, IoT, CleanTech & Mfg</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">Seed Grants</div>
                <div className="text-[11px] text-slate-400">TANSEED Facilitation</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Caption Indicator */}
      <div className="absolute bottom-6 right-6 hidden md:block text-right">
        <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
          Facility Snapshot
        </span>
        <span className="text-xs text-slate-300 font-medium">
          {REAL_HERO_SLIDES[slideIdx].caption}
        </span>
      </div>

      {/* Scroll Down */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 cursor-pointer hidden md:flex"
      >
        <span className="text-[10px] uppercase tracking-widest text-slate-400">Scroll to Explore</span>
        <ChevronDown className="w-4 h-4 text-cyan-400" />
      </motion.div>
    </section>
  );
}
