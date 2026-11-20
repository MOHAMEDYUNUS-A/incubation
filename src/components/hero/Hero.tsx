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
    <section className="relative w-full overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16 bg-slate-900 flex flex-col justify-center">
      {/* Background Campus Image Slider with Clean, Vivid Visibility (NO Heavy Dark Opacity) */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0.3, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.2 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
          />
        </AnimatePresence>
        {/* Soft, crisp gradient to keep text readable without darkening or washing out the campus photos */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

        {/* Carousel Slider Controls (Matching Reference Images 5 & 6) */}
        <button
          onClick={handlePrevImage}
          aria-label="Previous Campus Photo"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={handleNextImage}
          aria-label="Next Campus Photo"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Carousel Slide Indicators with Orange Active Pill (Matching Reference Image 6) */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 ${
                currentImageIndex === idx
                  ? "w-7 h-2.5 rounded-full bg-[#ea580c]"
                  : "w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Foreground Content */}
      <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 my-auto">
        <div className="max-w-2xl sm:max-w-3xl">
          {/* Institutional Top Badge (Matching Reference Image 10) */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-white text-xs font-semibold mb-5 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-orange-400 font-extrabold uppercase tracking-wider text-[10px] sm:text-xs">
              {badgeText}
            </span>
          </motion.div>

          {/* Minimized Font Headline with Animated Text Rotation (User Request: Font Minimize) */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight font-display leading-[1.15] mb-4 drop-shadow-md"
          >
            Catalyzing{" "}
            <span className="inline-block relative overflow-hidden align-baseline">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTextIndex}
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -25, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 font-black"
                >
                  {rotatingTexts[currentTextIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            Into Scalable Reality.
          </motion.h1>

          {/* Editorial Narrative with Optimized Size */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed max-w-2xl mb-6 font-normal drop-shadow-sm"
          >
            {narrativeText || (
              <>
                <strong className="text-white font-bold">MASTeR Incubation Foundation (MIF)</strong> empowers student creators, engineering researchers, and regional founders with 6,000+ sq. ft. of prototyping bays, patent filing mentorship, and direct access to TANSEED and MSME seed grants.
              </>
            )}
          </motion.p>

          {/* Action CTAs (Matching Reference Image 8) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <Link href="/about">
              <Button
                size="lg"
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold text-xs sm:text-sm px-6 h-11 sm:h-12 rounded-xl shadow-lg shadow-orange-600/30 gap-2 group transition-all"
              >
                <span>About Our Foundation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/apply">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-5 h-11 sm:h-12 rounded-xl backdrop-blur-md transition-all shadow-sm"
              >
                Apply For Pre-Incubation
              </Button>
            </Link>

            <Link href="/programs">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-5 h-11 sm:h-12 rounded-xl backdrop-blur-md transition-all shadow-sm"
              >
                View 4-Stage Pathway
              </Button>
            </Link>

            {onOpenAI && (
              <Button
                onClick={onOpenAI}
                size="lg"
                variant="ghost"
                className="text-cyan-300 hover:text-white hover:bg-white/10 text-xs sm:text-sm px-4 h-11 sm:h-12 rounded-xl gap-2 backdrop-blur-xs hidden sm:flex border border-cyan-400/30"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>AI Diagnostic</span>
              </Button>
            )}
          </motion.div>
        </div>

        {/* 3 Prototyping & Grant Feature Cards (Matching Reference Image 8) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5"
        >
          {/* Card 1: 6,000+ Sq. Ft. Prototyping Labs */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-white/15 text-white shadow-xl hover:border-blue-400 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white font-display mb-1.5">
              6,000+ Sq. Ft. Prototyping Labs
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Equipped with additive 3D printers, digital storage oscilloscopes, RF telemetry benches, and plug-and-play co-working pods for rapid hardware prototyping.
            </p>
          </div>

          {/* Card 2: Seed Grants up to ₹25 Lakhs */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-white/15 text-white shadow-xl hover:border-orange-400 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-3">
              <Coins className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white font-display mb-1.5">
              Seed Grants up to ₹25 Lakhs
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Direct application guidance for non-dilutive funding via StartupTN TANSEED (up to ₹10L), MSME Idea Hackathons (up to ₹15L), and EDII-TN IVP vouchers.
            </p>
          </div>

          {/* Card 3: IPR & Patent Support */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-white/15 text-white shadow-xl hover:border-emerald-400 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white font-display mb-1.5">
              IPR Support & Incubation Advisory
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Hands-on prior-art patent search, provisional patent drafting, corporate registration under Startup India, and institutional compliance.
            </p>
          </div>
        </motion.div>

        {/* Campus Location & Phone Strip (Matching Reference Image 1 & 8) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-3.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300 mb-6"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
            <span>
              <strong className="text-white">Campus:</strong> Trichy–Chennai Trunk Road, Siruganur, Tiruchirappalli, TN – 621105
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+919361697702"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+91 9361697702 (Manager)</span>
            </a>
            <span className="text-white/20 hidden sm:inline">|</span>
            <a
              href="tel:+916381945574"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors hidden sm:flex"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+91 6381945574 (Coordinator)</span>
            </a>
          </div>
        </motion.div>

        {/* Minimal Stats Strip at the bottom of the Hero (Matching Reference Image 9) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="pt-4 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-300"
        >
          <div>
            <span className="block text-xl sm:text-2xl font-black text-white font-display">₹25L+</span>
            <span className="text-slate-400 text-xs font-medium">Seed Grant Pathways</span>
          </div>
          <div>
            <span className="block text-xl sm:text-2xl font-black text-white font-display">6,000+</span>
            <span className="text-slate-400 text-xs font-medium">Sq. Ft. Prototyping Space</span>
          </div>
          <div>
            <span className="block text-xl sm:text-2xl font-black text-white font-display">7 Priority</span>
            <span className="text-slate-400 text-xs font-medium">Tech Focus Sectors</span>
          </div>
          <div>
            <span className="block text-xl sm:text-2xl font-black text-white font-display">Section 8</span>
            <span className="text-slate-400 text-xs font-medium">Not-For-Profit Trust</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
