"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Coins,
  ShieldCheck,
  MapPin,
  Phone,
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
    <section className="relative w-full overflow-hidden pt-24 sm:pt-28 pb-10 sm:pb-14 bg-slate-900 flex flex-col justify-center">
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

        {/* Carousel Slider Controls (Matching Reference Image 5) */}
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

        {/* Carousel Slide Indicators with Orange Active Pill (Matching Reference Image 6) */}
        <div className="absolute bottom-4 sm:bottom-5 right-4 sm:right-8 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
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

      {/* Main Foreground Content: Clean Frosted Glass Card for High Contrast & Sleek Typography */}
      <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 my-auto">
        <div className="max-w-xl sm:max-w-2xl bg-slate-950/80 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-white/20 shadow-2xl text-white mb-6">
          {/* Institutional Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-white/20 text-white text-xs font-semibold mb-3.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-orange-400 font-extrabold uppercase tracking-wider text-[10px] sm:text-[11px]">
              {badgeText}
            </span>
          </div>

          {/* Minimized Headline (User Request: Font Minimize) */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight font-display leading-[1.2] mb-3 drop-shadow-sm">
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

          {/* Editorial Narrative with Compact Sizing */}
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-5 font-normal">
            {narrativeText || (
              <>
                <strong className="text-white font-bold">MASTeR Incubation Foundation (MIF)</strong> empowers student creators, researchers, and regional founders with 6,000+ sq. ft. of prototyping labs, patent filing mentorship, and direct access to TANSEED and MSME seed grants.
              </>
            )}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link href="/about">
              <Button
                size="sm"
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs px-5 h-10 rounded-xl shadow-md gap-1.5 transition-all"
              >
                <span>About Our Foundation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>

            <Link href="/apply">
              <Button
                size="sm"
                variant="outline"
                className="border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 h-10 rounded-xl backdrop-blur-md transition-all shadow-2xs"
              >
                Apply For Pre-Incubation
              </Button>
            </Link>

            <Link href="/programs">
              <Button
                size="sm"
                variant="outline"
                className="border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 h-10 rounded-xl backdrop-blur-md transition-all shadow-2xs"
              >
                4-Stage Pathway
              </Button>
            </Link>

            {onOpenAI && (
              <Button
                onClick={onOpenAI}
                size="sm"
                variant="ghost"
                className="text-cyan-300 hover:text-white hover:bg-white/10 text-xs px-3 h-10 rounded-xl gap-1.5 backdrop-blur-xs hidden sm:flex border border-cyan-400/30"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>AI Diagnostic</span>
              </Button>
            )}
          </div>
        </div>

        {/* 3 Prototyping & Grant Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-4">
          {/* Card 1: 6,000+ Sq. Ft. Prototyping Labs */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/15 text-white shadow-lg hover:border-blue-400 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white font-display mb-1">
              6,000+ Sq. Ft. Prototyping Labs
            </h3>
            <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
              Equipped with additive 3D printers, digital storage oscilloscopes, RF telemetry benches, and plug-and-play co-working pods.
            </p>
          </div>

          {/* Card 2: Seed Grants up to ₹25 Lakhs */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/15 text-white shadow-lg hover:border-orange-400 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center mb-2">
              <Coins className="w-4 h-4" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white font-display mb-1">
              Seed Grants up to ₹25 Lakhs
            </h3>
            <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
              Direct application guidance for non-dilutive funding via StartupTN TANSEED (up to ₹10L) and MSME Idea Hackathons (up to ₹15L).
            </p>
          </div>

          {/* Card 3: IPR & Patent Support */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/15 text-white shadow-lg hover:border-emerald-400 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white font-display mb-1">
              IPR Support & Incubation Advisory
            </h3>
            <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
              Hands-on prior-art patent search, provisional patent drafting, and corporate registration under Startup India.
            </p>
          </div>
        </div>

        {/* Campus Location & Phone Strip */}
        <div className="p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs text-slate-300 mb-5">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span>
              <strong className="text-white">Campus:</strong> Trichy–Chennai Trunk Road, Siruganur, Tiruchirappalli, TN – 621105
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+919361697702"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>+91 9361697702 (Manager)</span>
            </a>
            <span className="text-white/20 hidden sm:inline">|</span>
            <a
              href="tel:+916381945574"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors hidden sm:flex"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>+91 6381945574 (Coordinator)</span>
            </a>
          </div>
        </div>

        {/* Minimal Stats Strip at the bottom of the Hero (Matching Reference Image 1) */}
        <div className="pt-3 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300">
          <div>
            <span className="block text-lg sm:text-xl font-black text-white font-display">₹25L+</span>
            <span className="text-slate-400 text-[11px] font-medium">Seed Grant Pathways</span>
          </div>
          <div>
            <span className="block text-lg sm:text-xl font-black text-white font-display">6,000+</span>
            <span className="text-slate-400 text-[11px] font-medium">Sq. Ft. Prototyping Space</span>
          </div>
          <div>
            <span className="block text-lg sm:text-xl font-black text-white font-display">7 Priority</span>
            <span className="text-slate-400 text-[11px] font-medium">Tech Focus Sectors</span>
          </div>
          <div>
            <span className="block text-lg sm:text-xl font-black text-white font-display">Section 8</span>
            <span className="text-slate-400 text-[11px] font-medium">Not-For-Profit Trust</span>
          </div>
        </div>
      </div>
    </section>
  );
}
