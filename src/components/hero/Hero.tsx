"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Cpu, ChevronDown, CheckCircle2, Award, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealLeft, RevealRight, ZoomIn, ZoomOut, FadeIn, XYZCard } from "@/components/animations/LightAnimations";

const REAL_HERO_SLIDES = [
  {
    url: "/images/hero-image.jpg",
    title: "Incubation Workspace & Innovation Hub",
    subtitle: "State-of-the-art incubation facilities supporting student & faculty entrepreneurs",
  },
  {
    url: "/images/hero-image-1.jpg",
    title: "Collaborative Ideation & Prototyping",
    subtitle: "Hands-on maker space, IoT labs and dedicated startup workstations",
  },
  {
    url: "/images/hero-image-2.jpg",
    title: "Startup Pitch & Mentoring Forums",
    subtitle: "Direct access to industry mentors, investors and ecosystem leaders",
  },
  {
    url: "/images/mamcet-campus.png",
    title: "MAMCET Trichy Institutional Campus",
    subtitle: "Sprawling engineering campus on Trichy-Chennai Trunk Road, Siruganur",
  },
];

export default function Hero({ onOpenAI }: { onOpenAI?: () => void }) {
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % REAL_HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 bg-gradient-to-b from-blue-50/50 via-white to-slate-50">
      {/* Background Ambience with Soft Natural Visual Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.07),transparent)]" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-200/25 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-200/25 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10 my-auto">
        {/* Top Prominent Official Logo Badge (Requested: Logo Above Hero Text) */}
        <ZoomIn delay={0.05} className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-4 px-5 py-3 rounded-2xl bg-white shadow-md border border-slate-200/90 hover:border-blue-300 transition-all">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 border border-slate-100 shadow-sm">
              <img
                src="/logos/master-incubation-logo.png"
                alt="MASTeR Incubation Foundation Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-left border-l border-slate-200 pl-4">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-wide font-display">
                  MAST<span className="text-blue-600">e</span>R INCUBATION FOUNDATION
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Section 8
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                MAMCET Campus · StartupTN Recognised Pre-Incubation Centre
              </p>
            </div>
          </div>
        </ZoomIn>

        {/* Accredited Institutional Partner Strip */}
        <FadeIn delay={0.15} className="flex justify-center mb-8">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-5 py-2 rounded-xl bg-white/90 backdrop-blur-sm shadow-xs border border-slate-200/80">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider hidden sm:inline">
              Accredited by:
            </span>
            <div className="flex items-center gap-1.5" title="M.A.M. College of Engineering and Technology">
              <img src="/logos/mamcet-logo.png" alt="MAMCET" className="h-7 sm:h-8 object-contain" />
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5" title="AICTE Approval">
              <img src="/logos/aicte-logo.png" alt="AICTE" className="h-6 sm:h-7 object-contain" />
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5" title="Institution's Innovation Council">
              <img src="/logos/iic-logo.png" alt="IIC" className="h-6 sm:h-7 object-contain" />
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5" title="National Board of Accreditation">
              <img src="/logos/nba-logo.png" alt="NBA" className="h-6 sm:h-7 object-contain" />
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5" title="StartupTN Pre-Incubation Hub">
              <img src="/logos/startuptn.jpg" alt="StartupTN" className="h-5 sm:h-6 object-contain rounded" />
            </div>
          </div>
        </FadeIn>

        {/* 2-Column Hero Layout: Left Content (RevealLeft) & Right Media Carousel (RevealRight) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column with Left-to-Right Reveal Animation */}
          <RevealLeft delay={0.2} className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping" />
              <span>Launchpad for your Entrepreneurial Success</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-4 leading-[1.1] font-display">
              Where Bold Ideas Turn Into <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                Thriving Ventures.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 mb-7 leading-relaxed">
              Empowering student and faculty innovators, nurturing deep-tech startups, and fostering sustainable 
              enterprises through seed-funding, world-class labs, and StartupTN mentorship.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 mb-8">
              <Link href="/apply" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 h-12 rounded-xl shadow-md shadow-blue-500/20 gap-2 text-sm group"
                >
                  <span>Apply for Incubation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link href="/programs" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-slate-300 bg-white hover:bg-slate-50 text-slate-800 px-6 h-12 rounded-xl text-sm shadow-2xs"
                >
                  Explore 4-Stage Pathway
                </Button>
              </Link>

              {onOpenAI && (
                <Button
                  onClick={onOpenAI}
                  size="lg"
                  variant="ghost"
                  className="w-full sm:w-auto text-blue-700 hover:text-blue-800 hover:bg-blue-50 px-4 h-12 rounded-xl text-xs gap-1.5 border border-blue-200"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>AI Readiness Diagnostic</span>
                </Button>
              )}
            </div>

            {/* Institutional Summary Tags */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
              <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="text-[11px] font-bold text-slate-900 uppercase">Section 8 Company</div>
                <div className="text-[10px] text-slate-500">Companies Act, 2013</div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="text-[11px] font-bold text-slate-900 uppercase">StartupTN Hub</div>
                <div className="text-[10px] text-slate-500">Government Recognised</div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs col-span-2 sm:col-span-1">
                <div className="text-[11px] font-bold text-slate-900 uppercase">Seed Grant Pathways</div>
                <div className="text-[10px] text-slate-500">TANSEED & Govt Schemes</div>
              </div>
            </div>
          </RevealLeft>

          {/* Right Visual Carousel Column with Right-to-Left Reveal & X-Y-Z 3D Interactive Card */}
          <RevealRight delay={0.25} className="lg:col-span-5">
            <XYZCard depth={12}>
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl group">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={slideIdx}
                      src={REAL_HERO_SLIDES[slideIdx].url}
                      alt={REAL_HERO_SLIDES[slideIdx].title}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Slide Indicators */}
                  <div className="absolute top-4 right-4 flex gap-1.5 z-10">
                    {REAL_HERO_SLIDES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSlideIdx(i)}
                        className={`h-1.5 rounded-full transition-all ${
                          i === slideIdx ? "w-6 bg-white" : "w-2 bg-white/40"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>

                  {/* Caption & Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-left text-white z-10">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-600/90 text-[10px] font-semibold uppercase tracking-wider mb-1.5">
                      <Building2 className="w-3 h-3" />
                      <span>MIF Infrastructure Showcase</span>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base leading-snug drop-shadow-sm">
                      {REAL_HERO_SLIDES[slideIdx].title}
                    </h3>
                    <p className="text-xs text-slate-200/90 mt-0.5 line-clamp-2">
                      {REAL_HERO_SLIDES[slideIdx].subtitle}
                    </p>
                  </div>
                </div>

                {/* Sub-strip with real photos thumbnail preview */}
                <div className="grid grid-cols-4 p-2 gap-2 bg-slate-50 border-t border-slate-100">
                  {REAL_HERO_SLIDES.map((slide, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideIdx(i)}
                      className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                        i === slideIdx ? "border-blue-600 shadow-sm" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={slide.url} alt={slide.title} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </XYZCard>
          </RevealRight>
        </div>
      </div>

      {/* Natural Browser Scroll Down Hint (No Artificial Hijacking) */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 cursor-pointer hidden md:flex"
      >
        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Scroll to Explore</span>
        <ChevronDown className="w-4 h-4 text-blue-600" />
      </motion.div>
    </section>
  );
}
