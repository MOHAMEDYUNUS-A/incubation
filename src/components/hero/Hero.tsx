"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteContent } from "@/context/ContentContext";

const ROTATING_TEXTS = [
  "Deep-Tech & IoT Hardware",
  "Student & Faculty Ventures",
  "Non-Dilutive Seed Grants",
  "Patented Innovations",
  "Scalable Regional Startups",
];

const HERO_IMAGES = [
  "/images/incubation/hero-1.jpeg",
  "/images/incubation/hero-2.jpeg",
  "/images/incubation/hero-3.jpeg",
  "/images/incubation/incubation-centre.jpeg",
  "/images/incubation/incubation-workspace.jpeg",
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

  // Seamless continuous background transition every 6.5 seconds
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6500);
    return () => clearInterval(imageInterval);
  }, [heroImages.length]);

  return (
    <section className="relative w-full overflow-hidden pt-32 sm:pt-40 pb-20 sm:pb-28 bg-slate-950 flex flex-col justify-center min-h-[620px] sm:min-h-[700px]">
      {/* ================= Campus Photo Slider with Continuous Free Ken Burns Zoom Transitions (Never Flashes Black) ================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroImages.map((img, idx) => {
          const isActive = currentImageIndex === idx;
          return (
            <motion.div
              key={img}
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
              style={{ backgroundImage: `url(${img})` }}
            />
          );
        })}

        {/* Directional gradient from left so text is 100% crisp while keeping photo bright and vivid */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent pointer-events-none" />
      </div>

      {/* Main Foreground Content: Clean Typography Directly on Hero with Staggered Transitions */}
      <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 my-auto">
        <div className="max-w-xl sm:max-w-2xl text-white">
          {/* Visionary Headline with Dynamic Text Rotation & Transition */}
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
                  key={currentTextIndex}
                  initial={{ y: 22, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -22, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="inline-block text-[#ea580c] font-black drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
                >
                  {rotatingTexts[currentTextIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            AT MAMCET CAMPUS.
          </motion.h1>

          {/* Editorial Narrative with Drop-shadow & Transition */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-xs sm:text-sm md:text-base text-slate-100 leading-relaxed mb-8 font-medium max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)]"
          >
            {narrativeText || (
              <>
                <strong className="text-white font-bold">MASTeR Incubation Foundation (MIF)</strong> is the premier institutional technology business incubator of Central Tamil Nadu. Providing 6,000+ sq. ft. of dedicated prototyping labs, one-on-one founder mentorship, and direct pathways to TANSEED and MSME grant funding to convert college research into scalable market enterprises.
              </>
            )}
          </motion.p>

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
