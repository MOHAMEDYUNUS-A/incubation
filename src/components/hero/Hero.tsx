"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteContent } from "@/context/ContentContext";
import { Sparkles, ArrowRight } from "lucide-react";

interface HeroSlide {
  image: string;
  rotatingFocus: string;
  narrative: string;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    image: "/images/incubation/main-hero-section.jpeg",
    rotatingFocus: "Deep-Tech Prototyping",
    narrative:
      "Empowering student creators and engineering researchers with 4,000 sq. ft. of dedicated prototyping bays, 15+ resident desks, a 15-seater boardroom, and additive 3D printing.",
  },
  {
    image: "/images/incubation/hero-section-main.jpeg",
    rotatingFocus: "Incubation Cohorts",
    narrative:
      "Nurturing early-stage founders with 15+ plug-and-play ergonomic innovator desks, high-speed gigabit fiber connectivity, and 24/7 dedicated incubation access at MAMCET campus.",
  },
  {
    image: "/images/incubation/main-student-hero-section.jpeg",
    rotatingFocus: "Student Innovators",
    narrative:
      "Transforming ambitious engineering students from passive job seekers into impactful job creators through experiential venture development and expert mentorship.",
  },
  {
    image: "/images/incubation/startup-main.jpeg",
    rotatingFocus: "Hardware Fabrication",
    narrative:
      "Equipped with multi-axis CNC machines, laser cutters, embedded electronics test benches, and precision calibration tools for production-grade physical prototypes.",
  },
  {
    image: "/images/incubation/startup-1.jpeg",
    rotatingFocus: "Seed Grants & TANSEED",
    narrative:
      "Unlocking direct pathways to non-dilutive seed funding through StartupTN TANSEED and Ministry of MSME Idea Hackathons.",
  },
  {
    image: "/images/incubation/ragupathy.jpeg",
    rotatingFocus: "Regional Enterprises",
    narrative:
      "Formally inaugurated by Hon'ble Minister Thiru S. Regupathy, Government of Tamil Nadu, as a flagship institutional incubator driving regional entrepreneurial growth.",
  },
];

export default function Hero({ onOpenAI }: { onOpenAI?: () => void }) {
  const { content } = useSiteContent();
  const flags = content?.featureFlags || {
    enableEcosystem: false,
    enableDigitalPassport: false,
    enableFounderDashboard: false,
    enablePassportVerification: false,
  };
  const slides: HeroSlide[] = DEFAULT_SLIDES;

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Synchronized Slide Transition: Image and Content Change Together every 6 seconds
  useEffect(() => {
    if (isPaused) return;
    const slideInterval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, [slides.length, isPaused]);

  const activeSlide = slides[currentSlideIndex];

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full overflow-hidden mt-[74px] sm:mt-[82px] pt-8 sm:pt-10 pb-10 sm:pb-12 bg-slate-950 flex flex-col justify-center min-h-[580px] sm:min-h-[640px] lg:min-h-[700px]"
    >
      {/* ================= Campus Photo Slider with Optimized Hardware-Accelerated Top-Framing (Start from Beginning) ================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {slides.map((slide, idx) => {
          const isActive = currentSlideIndex === idx;
          return (
            <motion.div
              key={slide.image}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.03 : 1.0,
              }}
              transition={{
                opacity: { duration: 0.9, ease: "easeInOut" },
                scale: { duration: 6, ease: "easeOut" },
              }}
              className="absolute inset-0 bg-cover bg-no-repeat will-change-transform brightness-[0.98] contrast-[1.04]"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundPosition: "center top",
                transformOrigin: "center top",
              }}
            />
          );
        })}

        {/* Directional gradient: deep contrast shield on left text while keeping dignitaries and faces bright & clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/98 via-slate-950/85 via-42% to-slate-950/15 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-slate-950/40 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full sm:w-2/3 h-full bg-[radial-gradient(ellipse_at_top_left,rgba(2,6,23,0.92)_0%,rgba(2,6,23,0.65)_50%,transparent_100%)] pointer-events-none" />
      </div>

      {/* Main Foreground Content: Synchronously Transitions with the Active Slide */}
      <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 my-auto">
        <div className="max-w-xl lg:max-w-2xl xl:max-w-3xl text-white">
          {/* Visionary Headline: Synchronized Rotating Focus with High-Contrast Typography Shadow */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] xl:text-[54px] font-black text-white tracking-tight font-display leading-[1.12] mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,1)] [text-shadow:_0_2px_12px_rgba(0,0,0,0.95),_0_4px_28px_rgba(0,0,0,0.9),_0_1px_3px_rgba(0,0,0,1)]"
          >
            TRANSFORMING <br />
            BOLD IDEAS INTO{" "}
            <span className="inline-block relative overflow-hidden align-baseline h-[1.25em] min-w-[240px] sm:min-w-[320px] md:min-w-[380px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSlideIndex}
                  initial={{ y: 16, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -16, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block text-[#ff8097] font-black drop-shadow-[0_4px_20px_rgba(0,0,0,1)] [text-shadow:_0_2px_14px_rgba(0,0,0,0.95),_0_6px_30px_rgba(0,0,0,0.9)] whitespace-nowrap"
                >
                  {activeSlide.rotatingFocus}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            AT MAMCET CAMPUS.
          </motion.h1>

          {/* Editorial Narrative: High-Contrast Drop Shadow for Optimal Legibility */}
          <div className="min-h-[52px] sm:min-h-[60px] mb-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlideIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-xs sm:text-sm md:text-base text-slate-100 leading-relaxed font-medium max-w-2xl drop-shadow-[0_4px_16px_rgba(0,0,0,1)] [text-shadow:_0_2px_8px_rgba(0,0,0,0.95),_0_4px_16px_rgba(0,0,0,0.8)]"
              >
                <strong className="text-white font-bold [text-shadow:_0_2px_8px_rgba(0,0,0,1)]">MASTeR Incubation Foundation (MIF):</strong>{" "}
                {activeSlide.narrative}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Action CTAs: Matching Exact Pill Layout (Image 6: #772b38 Secondary Color, Solid White & Outlined Pills) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1"
          >
            {/* Button 1: Explore MIF Ecosystem -> (#772b38 Secondary Burgundy Pill) */}
            <Link href="#join-us" className="group">
              <button
                className="bg-[#772b38] hover:bg-[#5e212b] text-white font-extrabold text-sm sm:text-base px-6 sm:px-7 h-12 sm:h-13 rounded-full shadow-xl shadow-[#772b38]/45 ring-1 ring-white/20 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore MIF Ecosystem</span>
                <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            {/* Button 2: Apply For Incubation (Solid Crisp White Pill with Deep Navy Text) */}
            <Link href="/apply" className="group">
              <button
                className="bg-white hover:bg-slate-100 text-[#0f2c59] font-black text-sm sm:text-base px-6 sm:px-7 h-12 sm:h-13 rounded-full shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 flex items-center justify-center cursor-pointer"
              >
                <span>Apply For Incubation</span>
              </button>
            </Link>

            {/* Button 3: Incubation Pathways (Crisp White Outline Pill) */}
            <Link href="/programs">
              <button
                className="bg-white/5 hover:bg-white/20 text-white font-bold text-sm sm:text-base px-6 sm:px-7 h-12 sm:h-13 rounded-full border-2 border-white/85 hover:border-white backdrop-blur-md shadow-md hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 flex items-center justify-center cursor-pointer"
              >
                <span>Incubation Pathways</span>
              </button>
            </Link>

            {onOpenAI && (
              <button
                onClick={onOpenAI}
                className="bg-slate-900/80 hover:bg-slate-900 text-cyan-300 hover:text-cyan-200 font-bold text-xs sm:text-sm px-5 h-12 sm:h-13 rounded-full border border-cyan-400/40 hover:border-cyan-400 backdrop-blur-md shadow-md hidden sm:inline-flex items-center gap-2 transition-all duration-200 hover:scale-[1.03] cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>AI Diagnostic</span>
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
