"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/context/ContentContext";

const ROTATING_TEXTS = [
  "Deep-Tech Startups",
  "Student Innovators",
  "Hardware Prototypes",
  "TANSEED Seed Grants",
  "Engineering Ventures",
];

const HERO_IMAGES = [
  "/images/incubation/incubation-centre.jpeg",
  "/images/incubation/incubation-workspace.jpeg",
  "/images/incubation/img-54.jpeg",
  "/images/incubation/team-of-incubation.jpeg",
  "/images/incubation/image-3.jpeg",
];

export default function Hero({ onOpenAI }: { onOpenAI?: () => void }) {
  const { content } = useSiteContent();
  const heroImages = content?.hero?.images && content.hero.images.length > 0 ? content.hero.images : HERO_IMAGES;
  const rotatingTexts = content?.hero?.rotatingTexts && content.hero.rotatingTexts.length > 0 ? content.hero.rotatingTexts : ROTATING_TEXTS;
  const badgeText = content?.hero?.badge || "StartupTN Pre-Incubation Centre · MAMCET Siruganur";
  const narrativeText = content?.hero?.narrative;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Smooth text rotation every 3.2 seconds
  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3200);
    return () => clearInterval(textInterval);
  }, [rotatingTexts.length]);

  // Subtle background transition every 7 seconds
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 7000);
    return () => clearInterval(imageInterval);
  }, [heroImages.length]);

  return (
    <section className="relative w-full min-h-[640px] sm:min-h-[700px] lg:min-h-[760px] overflow-hidden pt-[110px] sm:pt-[130px] pb-16 bg-slate-950 flex flex-col justify-center">
      {/* Background Slides with Smooth Cross-Fade (No Arrows, No Clutter) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
        >
          {/* Institutional Gradient Overlays for High-Contrast Clean Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-blue-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
        </motion.div>
      </AnimatePresence>

      {/* Main Hero Foreground Content */}
      <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 my-auto">
        <div className="max-w-3xl sm:max-w-4xl">
          {/* Institutional Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-xs font-semibold mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-orange-400 font-extrabold uppercase tracking-wider text-[11px] sm:text-xs">
              {badgeText}
            </span>
          </motion.div>

          {/* Main Headline with Dynamic Animated Text Rotation (Zero Box Clutter) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight font-display leading-[1.08] mb-6 drop-shadow-md"
          >
            Catalyzing <br className="hidden sm:inline" />
            <span className="inline-block relative overflow-hidden align-baseline">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTextIndex}
                  initial={{ y: 35, opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -35, opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 font-black"
                >
                  {rotatingTexts[currentTextIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            Into Scalable Reality.
          </motion.h1>

          {/* Minimal, High-Impact Editorial Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-200 leading-relaxed max-w-2xl mb-8 font-normal drop-shadow-sm"
          >
            {narrativeText || (
              <>
                <strong className="text-white font-bold">MASTeR Incubation Foundation (MIF)</strong> empowers student creators, engineering researchers, and regional founders with 6,000+ sq. ft. of prototyping bays, patent filing mentorship, and direct access to TANSEED and MSME seed grants.
              </>
            )}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3.5 mb-10"
          >
            <Link href="/apply">
              <Button
                size="lg"
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold text-xs sm:text-sm px-7 sm:px-9 h-12 sm:h-14 rounded-2xl shadow-xl shadow-orange-600/30 gap-2.5 uppercase tracking-wide group transition-all"
              >
                <span>Apply For Pre-Incubation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Button>
            </Link>

            <Link href="/#focus-areas">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-6 sm:px-8 h-12 sm:h-14 rounded-2xl backdrop-blur-md transition-all shadow-md"
              >
                Explore 7 Focus Areas
              </Button>
            </Link>

            {onOpenAI && (
              <Button
                onClick={onOpenAI}
                size="lg"
                variant="ghost"
                className="text-cyan-300 hover:text-white hover:bg-white/10 text-xs sm:text-sm px-4 h-12 sm:h-14 rounded-2xl gap-2 backdrop-blur-xs hidden sm:flex border border-cyan-400/30"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>AI Idea Diagnostic</span>
              </Button>
            )}
          </motion.div>

          {/* Minimal Stats Strip at the bottom of the Hero */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-slate-300"
          >
            <div>
              <span className="block text-2xl sm:text-3xl font-black text-white font-display">₹25L+</span>
              <span className="text-slate-400 text-xs font-medium">Seed Grant Pathways</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-black text-white font-display">6,000+</span>
              <span className="text-slate-400 text-xs font-medium">Sq. Ft. Prototyping Space</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-black text-white font-display">7 Priority</span>
              <span className="text-slate-400 text-xs font-medium">Tech Focus Sectors</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-black text-white font-display">Section 8</span>
              <span className="text-slate-400 text-xs font-medium">Not-For-Profit Trust</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
