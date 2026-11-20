"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteContent } from "@/context/ContentContext";

interface HeroSlide {
  image: string;
  rotatingFocus: string;
  narrative: string;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    image: "/images/incubation/hero-1.jpeg",
    rotatingFocus: "Deep-Tech & IoT Hardware",
    narrative:
      "Empowering student creators and engineering researchers with 6,000+ sq. ft. of dedicated prototyping bays, digital storage oscilloscopes, RF telemetry benches, and additive 3D printing.",
  },
  {
    image: "/images/incubation/hero-2.jpeg",
    rotatingFocus: "Scalable Regional Startups",
    narrative:
      "Accelerating student and faculty ventures from laboratory bench to commercial market deployment with one-on-one founder mentorship and regional industry pilots.",
  },
  {
    image: "/images/incubation/hero-3.jpeg",
    rotatingFocus: "TANSEED Seed Grants",
    narrative:
      "Unlocking direct pathways to non-dilutive seed grant funding through StartupTN TANSEED (up to ₹10L) and Ministry of MSME Idea Hackathons (up to ₹15L).",
  },
  {
    image: "/images/incubation/incubation-centre.jpeg",
    rotatingFocus: "Patented Innovations",
    narrative:
      "Providing institutional backing, prior-art patent search, provisional patent drafting, and corporate registration under Startup India for campus innovators.",
  },
  {
    image: "/images/incubation/incubation-workspace.jpeg",
    rotatingFocus: "Student & Faculty Ventures",
    narrative:
      "Nurturing early-stage founders with plug-and-play ergonomic co-working desks, high-speed gigabit fiber connectivity, and 24/7 dedicated incubation access at MAMCET campus.",
  },
];

export default function Hero({ onOpenAI }: { onOpenAI?: () => void }) {
  const { content } = useSiteContent();
  const slides: HeroSlide[] = DEFAULT_SLIDES;

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Synchronized Slide Transition: Image and Content Change Together every 6 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const activeSlide = slides[currentSlideIndex];

  return (
    <section className="relative w-full overflow-hidden pt-32 sm:pt-40 pb-20 sm:pb-28 bg-slate-950 flex flex-col justify-center min-h-[620px] sm:min-h-[700px]">
      {/* ================= Campus Photo Slider with Continuous Free Ken Burns Zoom Transitions (Never Flashes Black) ================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((slide, idx) => {
          const isActive = currentSlideIndex === idx;
          return (
            <motion.div
              key={slide.image}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? (idx % 2 === 0 ? 1.08 : 1.0) : 1.04,
              }}
              transition={{
                opacity: { duration: 1.6, ease: "easeInOut" },
                scale: { duration: 7, ease: "linear" },
              }}
              className="absolute inset-0 bg-cover bg-center will-change-transform brightness-95 contrast-[1.02]"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          );
        })}

        {/* Directional gradient from left so text is 100% crisp while keeping photo bright and vivid */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent pointer-events-none" />
      </div>

      {/* Main Foreground Content: Synchronously Transitions with the Active Slide */}
      <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 my-auto">
        <div className="max-w-xl sm:max-w-2xl text-white">
          {/* Visionary Headline: Synchronized Rotating Focus with Slide */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight font-display leading-[1.12] mb-5 drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]"
          >
            TRANSFORMING <br />
            BOLD IDEAS INTO{" "}
            <span className="inline-block relative overflow-hidden align-baseline">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSlideIndex}
                  initial={{ y: 22, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -22, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="inline-block text-[#ea580c] font-black drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
                >
                  {activeSlide.rotatingFocus}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            AT MAMCET CAMPUS.
          </motion.h1>

          {/* Editorial Narrative: Synchronously Transitions with the Active Slide */}
          <div className="min-h-[72px] sm:min-h-[80px] mb-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlideIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-xs sm:text-sm md:text-base text-slate-100 leading-relaxed font-medium max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)]"
              >
                <strong className="text-white font-bold">MASTeR Incubation Foundation (MIF):</strong>{" "}
                {activeSlide.narrative}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Action CTAs (High Contrast, Enhanced Hover UI, Zero SVGs) */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-3.5"
          >
            <Link href="/about">
              <button
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-black text-xs sm:text-sm px-6 h-11 rounded-xl shadow-xl shadow-orange-600/35 hover:shadow-orange-600/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 border border-orange-400/40"
              >
                Explore MIF Ecosystem
              </button>
            </Link>

            <Link href="/apply">
              <button
                className="bg-white hover:bg-slate-100 text-[#0f2c59] hover:text-[#ea580c] font-black text-xs sm:text-sm px-6 h-11 rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 border-2 border-white"
              >
                Apply For Incubation
              </button>
            </Link>

            <Link href="/programs">
              <button
                className="bg-slate-900/80 hover:bg-slate-900 text-white hover:text-white font-black text-xs sm:text-sm px-5 h-11 rounded-xl border-2 border-white/80 hover:border-white backdrop-blur-md shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
              >
                Incubation Pathways
              </button>
            </Link>

            {onOpenAI && (
              <button
                onClick={onOpenAI}
                className="bg-slate-900/80 hover:bg-slate-900 text-cyan-300 hover:text-cyan-200 font-bold text-xs px-4 h-11 rounded-xl border border-cyan-400/50 backdrop-blur-md shadow-md hidden sm:flex items-center transition-all duration-200 hover:scale-[1.03]"
              >
                AI Diagnostic
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
