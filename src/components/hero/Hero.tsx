"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
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
  const heroImages =
    content?.hero?.images && content.hero.images.length > 0
      ? content.hero.images
      : HERO_IMAGES;
  const rotatingTexts =
    content?.hero?.rotatingTexts && content.hero.rotatingTexts.length > 0
      ? content.hero.rotatingTexts
      : ROTATING_TEXTS;
  const badgeText =
    content?.hero?.badge || "StartupTN Pre-Incubation Centre · MAMCET Siruganur";
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

  // Background transition every 6 seconds
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(imageInterval);
  }, [heroImages.length]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <section className="relative w-full overflow-hidden pt-28 sm:pt-36 pb-12 sm:pb-16 bg-slate-950 flex flex-col justify-center min-h-[580px] sm:min-h-[640px]">
      {/* ================= Campus Photo Slider: 100% Bright & Crisp, ZERO DARK OPACITY OVERLAY ================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0.85, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.85 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center brightness-100 contrast-100"
            style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
          />
        </AnimatePresence>

        {/* Carousel Slider Controls */}
        <button
          onClick={handlePrevImage}
          aria-label="Previous Campus Photo"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNextImage}
          aria-label="Next Campus Photo"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Slide Indicators with Orange Active Pill */}
        <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-8 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 ${
                currentImageIndex === idx
                  ? "w-6 h-2 rounded-full bg-[#ea580c]"
                  : "w-2 h-2 rounded-full bg-white/60 hover:bg-white/90"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Foreground Content: Clean Typography Directly on Hero (Zero Bounding Box BG) */}
      <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 my-auto">
        <div className="max-w-xl sm:max-w-2xl text-white">
          {/* Institutional Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/30 text-white text-xs font-semibold mb-4 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-orange-400 font-extrabold uppercase tracking-wider text-[10px] sm:text-[11px]">
              {badgeText}
            </span>
          </div>

          {/* Minimized Headline (Zero Box Background) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight font-display leading-[1.15] mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Catalyzing{" "}
            <span className="inline-block relative overflow-hidden align-baseline">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTextIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 font-black"
                >
                  {rotatingTexts[currentTextIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            Into Scalable Reality.
          </h1>

          {/* Editorial Narrative with Drop-shadow */}
          <p className="text-xs sm:text-sm md:text-base text-slate-100 leading-relaxed mb-6 font-medium max-w-xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            {narrativeText || (
              <>
                <strong className="text-white font-bold">MASTeR Incubation Foundation (MIF)</strong> empowers student creators, researchers, and regional founders with 6,000+ sq. ft. of prototyping labs, patent filing mentorship, and direct access to TANSEED and MSME seed grants.
              </>
            )}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <Link href="/about">
              <Button
                size="sm"
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm px-6 h-11 rounded-xl shadow-xl shadow-orange-600/30 gap-2 transition-all"
              >
                <span>About Our Foundation</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/apply">
              <Button
                size="sm"
                variant="outline"
                className="border-white/50 bg-slate-900/60 hover:bg-slate-900/90 text-white font-bold text-xs sm:text-sm px-5 h-11 rounded-xl backdrop-blur-md transition-all shadow-md"
              >
                Apply For Pre-Incubation
              </Button>
            </Link>

            <Link href="/programs">
              <Button
                size="sm"
                variant="outline"
                className="border-white/50 bg-slate-900/60 hover:bg-slate-900/90 text-white font-bold text-xs sm:text-sm px-5 h-11 rounded-xl backdrop-blur-md transition-all shadow-md"
              >
                4-Stage Pathway
              </Button>
            </Link>

            {onOpenAI && (
              <Button
                onClick={onOpenAI}
                size="sm"
                variant="ghost"
                className="text-cyan-300 hover:text-white hover:bg-slate-900/60 text-xs px-3.5 h-11 rounded-xl gap-1.5 backdrop-blur-md hidden sm:flex border border-cyan-400/40"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>AI Diagnostic</span>
              </Button>
            )}
          </div>
        </div>

        {/* Minimal Stats Strip at the bottom of the Hero (Matching Reference Image 1) */}
        <div className="pt-4 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
          <div>
            <span className="block text-xl sm:text-2xl font-black text-white font-display">₹25L+</span>
            <span className="text-slate-200 text-xs font-semibold">Seed Grant Pathways</span>
          </div>
          <div>
            <span className="block text-lg sm:text-2xl font-black text-white font-display">6,000+</span>
            <span className="text-slate-200 text-xs font-semibold">Sq. Ft. Prototyping Space</span>
          </div>
          <div>
            <span className="block text-lg sm:text-2xl font-black text-white font-display">7 Priority</span>
            <span className="text-slate-200 text-xs font-semibold">Tech Focus Sectors</span>
          </div>
          <div>
            <span className="block text-lg sm:text-2xl font-black text-white font-display">Section 8</span>
            <span className="text-slate-200 text-xs font-semibold">Not-For-Profit Trust</span>
          </div>
        </div>
      </div>
    </section>
  );
}
