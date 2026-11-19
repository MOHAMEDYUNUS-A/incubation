"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Shield, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_SLIDES = [
  {
    image: "/images/incubation/incubation-centre.jpeg",
    titleBadge: "MASTeR INCUBATION CENTRE",
    headline: "M.A.M. College of Engineering & Technology",
    description:
      "Leading Technology Pre-Incubation Centre focused on incubating engineering ideas, nurturing student and faculty innovations, and helping early-stage startups thrive in the marketplace.",
    accent: "StartupTN Recognised Hub",
  },
  {
    image: "/images/incubation/incubation-workspace.jpeg",
    titleBadge: "MASTeR WORKSPACE",
    headline: "State-of-the-Art Incubation & Co-Working Space",
    description:
      "Furnished ergonomic co-working pods, high-speed connectivity, hardware benches, and collaborative ideation facilities on the MAMCET Siruganur campus.",
    accent: "Plug-and-Play Workstations",
  },
  {
    image: "/images/incubation/img-54.jpeg",
    titleBadge: "MASTeR PROTOTYPING LABS",
    headline: "Hands-on Engineering & IoT Testing Labs",
    description:
      "Dedicated test benches equipped with digital storage oscilloscopes, 3D printers, and RF telemetry development tools for rapid PoC fabrication.",
    accent: "Rapid 3D & Electronics Fabrication",
  },
  {
    image: "/images/incubation/team-of-incubation.jpeg",
    titleBadge: "MASTeR TEAM & ECOSYSTEM",
    headline: "Seed Grants & Ecosystem Mentorship",
    description:
      "Direct guidance for TANSEED grant applications, MSME Idea Hackathon funding, venture investor access, and patent filing assistance from industry practitioners.",
    accent: "TANSEED & Investor Pitching",
  },
  {
    image: "/images/incubation/image-3.jpeg",
    titleBadge: "CAMPUS INNOVATION HUB",
    headline: "Empowering Next-Gen Student Innovators",
    description:
      "Host institution with 6,000+ sq. ft. of dedicated incubation space, fostering entrepreneurship through interdisciplinary engineering teams and hackathons.",
    accent: "MAMCET Siruganur, Trichy",
  },
];

export default function Hero({ onOpenAI }: { onOpenAI?: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full h-[620px] sm:h-[680px] lg:h-[720px] overflow-hidden pt-[90px] sm:pt-[100px] bg-slate-900">
      {/* Background Slides with Ken Burns Smooth Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          {/* Subtle Contrast Overlays (Preserves Photo Clarity while Ensuring High Legibility) */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-slate-900/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30" />
        </motion.div>
      </AnimatePresence>

      {/* Main Hero Foreground Content */}
      <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center">
        <div className="max-w-2xl sm:max-w-3xl">
          {/* Prominent Frosted Card Title (As per Reference Image 1 "EDII - ABIRF") */}
          <motion.div
            key={`badge-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <div className="px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-xl bg-white/95 backdrop-blur-md shadow-2xl border border-white/90">
              <span className="text-2xl sm:text-4xl md:text-5xl font-black text-[#0f2c59] tracking-wider font-display uppercase">
                {slide.titleBadge}
              </span>
            </div>
          </motion.div>

          {/* Sub-headline */}
          <motion.h2
            key={`headline-${currentSlide}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-4 drop-shadow-md font-display leading-snug"
          >
            {slide.headline}
          </motion.h2>

          {/* Descriptive Text Matching Reference */}
          <motion.p
            key={`desc-${currentSlide}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-slate-100/95 leading-relaxed mb-8 max-w-2xl drop-shadow-sm font-medium"
          >
            {slide.description}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3.5"
          >
            <Link href="/apply">
              <Button
                size="lg"
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold text-xs sm:text-sm px-6 sm:px-8 h-12 rounded-xl shadow-lg shadow-orange-600/30 gap-2 uppercase tracking-wide group transition-all"
              >
                <span>Apply For Incubation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/#focus-areas">
              <Button
                size="lg"
                variant="outline"
                className="border-white/70 bg-white/15 hover:bg-white/30 text-white font-bold text-xs sm:text-sm px-6 h-12 rounded-xl backdrop-blur-md shadow-md"
              >
                Explore Focus Areas
              </Button>
            </Link>

            {onOpenAI && (
              <Button
                onClick={onOpenAI}
                size="lg"
                variant="ghost"
                className="text-cyan-300 hover:text-white hover:bg-white/10 text-xs sm:text-sm px-4 h-12 rounded-xl gap-2 backdrop-blur-xs hidden sm:flex border border-cyan-400/30"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>AI Idea Diagnostic</span>
              </Button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Slider Left and Right Navigation Buttons (Matching Reference Image 1) */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/60 text-white border border-white/30 flex items-center justify-center backdrop-blur-md transition-all hover:scale-105"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/60 text-white border border-white/30 flex items-center justify-center backdrop-blur-md transition-all hover:scale-105"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Pagination Dots at Bottom Center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide
                ? "w-8 h-2.5 bg-orange-500 shadow-sm"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
