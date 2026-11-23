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
    rotatingFocus: "Deep-Tech & IoT Prototyping Hub",
    narrative:
      "Empowering student creators and engineering researchers with 4,000 sq. ft. of dedicated prototyping bays, 15+ resident desks, a 15-seater boardroom, and additive 3D printing.",
  },
  {
    image: "/images/incubation/hero-section-main.jpeg",
    rotatingFocus: "Incubation Cohort & Makerspace",
    narrative:
      "Nurturing early-stage founders with 15+ plug-and-play ergonomic innovator desks, high-speed gigabit fiber connectivity, and 24/7 dedicated incubation access at MAMCET campus.",
  },
  {
    image: "/images/incubation/main-student-hero-section.jpeg",
    rotatingFocus: "Student Innovators & Future Founders",
    narrative:
      "Transforming ambitious engineering students from passive job seekers into impactful job creators through experiential venture development and expert mentorship.",
  },
  {
    image: "/images/incubation/startup-main.jpeg",
    rotatingFocus: "Hardware Labs & Rapid Fabrication",
    narrative:
      "Equipped with multi-axis CNC machines, laser cutters, embedded electronics test benches, and precision calibration tools for production-grade physical prototypes.",
  },
  {
    image: "/images/incubation/startup-1.jpeg",
    rotatingFocus: "TANSEED & MSME Seed Grants",
    narrative:
      "Unlocking direct pathways to non-dilutive seed funding through StartupTN TANSEED and Ministry of MSME Idea Hackathons.",
  },
  {
    image: "/images/incubation/ragupathy.jpeg",
    rotatingFocus: "Ministerial Dedication & State Support",
    narrative:
      "Formally inaugurated by Hon'ble Minister Thiru S. Regupathy, Government of Tamil Nadu, as a flagship institutional incubator driving regional entrepreneurial growth.",
  },
];

export default function Hero({ onOpenAI }: { onOpenAI?: () => void }) {
  const { content } = useSiteContent();
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
      className="relative w-full overflow-hidden mt-[74px] sm:mt-[82px] pt-8 sm:pt-12 pb-12 sm:pb-16 bg-slate-950 flex flex-col justify-center min-h-[540px] sm:min-h-[600px] lg:min-h-[640px]"
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
                scale: isActive ? 1.02 : 1.0,
              }}
              transition={{
                opacity: { duration: 0.9, ease: "easeInOut" },
                scale: { duration: 6, ease: "easeOut" },
              }}
              className="absolute inset-0 bg-cover bg-no-repeat will-change-transform brightness-[0.93] contrast-[1.03]"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundPosition: "center top",
                transformOrigin: "center top",
              }}
            />
          );
        })}

        {/* Directional gradient: deep contrast shield on left text while keeping dignitaries and faces bright & clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 via-45% to-slate-950/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Main Foreground Content: Synchronously Transitions with the Active Slide */}
      <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 my-auto">
        <div className="max-w-xl lg:max-w-2xl text-white">
          {/* Institutional Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#772b38]/40 border border-[#772b38]/70 text-rose-200 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#772b38] animate-ping inline-block" />
            <Sparkles className="w-3 h-3 text-[#ff7b90]" />
            <span>MAMCET · StartupTN Pre-Incubation Centre</span>
          </motion.div>

          {/* Visionary Headline: Synchronized Rotating Focus with Slide */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-black text-white tracking-tight font-display leading-[1.14] mb-3.5 drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]"
          >
            TRANSFORMING <br />
            BOLD IDEAS INTO{" "}
            <span className="inline-block relative overflow-hidden align-baseline">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSlideIndex}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="inline-block text-[#ff7b90] font-black drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                >
                  {activeSlide.rotatingFocus}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            AT MAMCET CAMPUS.
          </motion.h1>

          {/* Editorial Narrative: Synchronously Transitions with the Active Slide */}
          <div className="min-h-[56px] sm:min-h-[64px] mb-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlideIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)]"
              >
                <strong className="text-white font-bold">MASTeR Incubation Foundation (MIF):</strong>{" "}
                {activeSlide.narrative}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Action CTAs (#772b38 Secondary Color, High Contrast, Enhanced Hover UI) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link href="/about">
              <button
                className="bg-[#772b38] hover:bg-[#5e212b] text-white font-black text-xs sm:text-sm px-5.5 h-10.5 rounded-xl shadow-lg shadow-[#772b38]/35 hover:shadow-[#772b38]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-rose-300/30 flex items-center gap-1.5"
              >
                <span>Explore MIF Ecosystem</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>

            <Link href="/apply">
              <button
                className="bg-white hover:bg-slate-100 text-[#0f2c59] hover:text-[#772b38] font-black text-xs sm:text-sm px-5.5 h-10.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border-2 border-white"
              >
                Apply For Incubation
              </button>
            </Link>

            <Link href="/programs">
              <button
                className="bg-slate-900/80 hover:bg-slate-900 text-white hover:text-white font-black text-xs sm:text-sm px-4.5 h-10.5 rounded-xl border-2 border-white/80 hover:border-white backdrop-blur-md shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Incubation Pathways
              </button>
            </Link>

            {onOpenAI && (
              <button
                onClick={onOpenAI}
                className="bg-slate-900/80 hover:bg-slate-900 text-cyan-300 hover:text-cyan-200 font-bold text-xs px-3.5 h-10.5 rounded-xl border border-cyan-400/50 backdrop-blur-md shadow-md hidden sm:flex items-center transition-all duration-200 hover:scale-[1.02]"
              >
                AI Diagnostic
              </button>
            )}
          </motion.div>

          {/* Slide Indicator Navigation Dots */}
          <div className="flex items-center gap-2 mt-6 z-10">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlideIndex === idx
                    ? "w-8 bg-[#772b38] shadow-md shadow-[#772b38]/50"
                    : "w-2 bg-white/40 hover:bg-white/75"
                }`}
              />
            ))}
            <span className="text-[11px] font-mono text-slate-300 ml-2">
              0{currentSlideIndex + 1} / 0{slides.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
