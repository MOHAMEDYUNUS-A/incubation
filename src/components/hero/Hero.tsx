"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Cpu, ChevronDown, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&auto=format&fit=crop&q=85",
    caption: "Advanced Hardware & Additive Fabrication Lab",
  },
  {
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1920&auto=format&fit=crop&q=85",
    caption: "Interdisciplinary Ideation & Founder Masterminds",
  },
  {
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1920&auto=format&fit=crop&q=85",
    caption: "Electronics Prototyping & Telemetry Workbenches",
  },
];

export default function Hero({ onOpenAI }: { onOpenAI?: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Dynamic Background Image Carousel with Parallax Blur */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 0.32, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center filter saturate-75"
            style={{ backgroundImage: `url(${HERO_IMAGES[currentImageIndex].url})` }}
          />
        </AnimatePresence>

        {/* Multi-layered Vignette & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050814]/90 via-[#070c1d]/85 to-[#050814]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.25),rgba(255,255,255,0))]" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
      </div>

      {/* Hero Foreground Content */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10 my-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Institutional Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-md mb-8 shadow-xl"
          >
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
              StartupTN Recognised Pre-Incubation Centre
            </span>
            <span className="text-slate-500 text-xs">|</span>
            <span className="text-xs text-slate-300">MAMCET, Trichy</span>
          </motion.div>

          {/* Masked Headline Reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1] font-display"
          >
            Where Ideas Become <br className="hidden sm:inline" />
            <span className="gradient-text">Impact & Ventures.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg sm:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed"
          >
            Empowering innovators, nurturing technology startups, and translating engineering research into commercially viable, high-impact ventures.
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
                Explore Incubation Stages
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
                <span>AI Startup Diagnostic</span>
              </Button>
            )}
          </motion.div>

          {/* Verified Pillars Ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left w-full max-w-4xl"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">Section 8</div>
                <div className="text-[11px] text-slate-400">Companies Act 2013</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">StartupTN</div>
                <div className="text-[11px] text-slate-400">Pre-Incubation Hub</div>
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

      {/* Scroll Down Indicator */}
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
