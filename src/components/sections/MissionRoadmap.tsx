"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Lightbulb,
  Microscope,
  Handshake,
  TrendingUp,
  Globe2,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  Layers,
  ShieldCheck,
  Target,
  Clock,
  Compass,
} from "lucide-react";
import { XYZCard, FadeUp } from "@/components/animations/LightAnimations";

interface MilestoneItem {
  id: string;
  code: string;
  phase: string;
  duration: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  borderHover: string;
  glowColor: string;
  deliverables: string[];
  validationGate: string;
  metric: string;
  subtrack: string;
}

const MILESTONES: MilestoneItem[] = [
  {
    id: "m1",
    code: "M1",
    phase: "Phase 01 · Ideation & Design Thinking",
    duration: "Month 0 – 2",
    title: "Cultivate Mindset",
    shortDesc: "Cultivate an entrepreneurial mindset among students and faculty through design thinking and creative problem-solving.",
    fullDesc: "To cultivate an entrepreneurial mindset among students and faculty through design thinking, creative problem-solving and interdisciplinary engagement. Early-stage ideas are tested against user desirability and real-world friction before code or hardware tooling begins.",
    icon: Lightbulb,
    accentColor: "#772b38",
    badgeBg: "bg-rose-50",
    badgeText: "text-[#772b38]",
    borderHover: "hover:border-[#772b38]/40",
    glowColor: "rgba(119, 43, 56, 0.15)",
    deliverables: [
      "Design Thinking & Problem Discovery Bootcamps",
      "Interdisciplinary Student-Faculty Hackathons",
      "Customer Empathy Interviews & Problem Dossier",
    ],
    validationGate: "Problem-Solution Fit & Ideation Dossier Approved",
    metric: "100+ Student Creators Screened per Cohort",
    subtrack: "Design Thinking & Ideation",
  },
  {
    id: "m2",
    code: "M2",
    phase: "Phase 02 · Lab to Proof of Concept",
    duration: "Month 2 – 4",
    title: "Research Translation",
    shortDesc: "Transform engineering research and innovative ideas into tangible prototypes, patentable designs, and viable products.",
    fullDesc: "To facilitate the transformation of engineering knowledge, innovative ideas and research outcomes into practical solutions, products and viable startups. Leveraging MAMCET's rapid prototyping bays, 3D printing equipment, and IoT spectrum testing workbenches.",
    icon: Microscope,
    accentColor: "#0284c7",
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-700",
    borderHover: "hover:border-sky-400",
    glowColor: "rgba(2, 132, 199, 0.15)",
    deliverables: [
      "Rapid 3D Prototyping & Multi-layer PCB Fabrication",
      "Institutional Patent Prior-Art Search & Disclosures",
      "TRL-4 Working Benchtop Hardware Demonstration",
    ],
    validationGate: "TRL-4 Functional Hardware / Software Prototype",
    metric: "15+ Prototyping Workbenches & Maker Bays",
    subtrack: "Lab to Market Commercialization",
  },
  {
    id: "m3",
    code: "M3",
    phase: "Phase 03 · Industrial Alliances & MoUs",
    duration: "Month 4 – 6",
    title: "Industry Collaboration",
    shortDesc: "Partner with regional industries, corporate sandboxes, and research bodies for co-development, pilots, and field testing.",
    fullDesc: "To collaborate with industries, startups, and research institutions to provide practical exposure and support technology development, market access and commercialisation. Founders gain direct access to operational manufacturing lines and enterprise testbeds.",
    icon: Handshake,
    accentColor: "#d97706",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    borderHover: "hover:border-amber-400",
    glowColor: "rgba(217, 119, 6, 0.15)",
    deliverables: [
      "8+ Bilateral Strategic MoUs with Corporate Partners",
      "Industrial Sandbox Pilots & Field Telemetry Testing",
      "Corporate Mentorship & Joint Engineering Reviews",
    ],
    validationGate: "Signed Letter of Intent (LOI) / Industrial Pilot Trial",
    metric: "8+ Active Industry MoUs & Enterprise Sandboxes",
    subtrack: "Corporate & Bilateral MoUs",
  },
  {
    id: "m4",
    code: "M4",
    phase: "Phase 04 · Seed Grants & Term Sheets",
    duration: "Month 6 – 9",
    title: "Mentoring & Funding",
    shortDesc: "Equip aspiring founders with business skills, 1-on-1 venture clinics, and non-dilutive government grant funding (TANSEED/MSME).",
    fullDesc: "To equip aspiring entrepreneurs with business skills, mentoring, incubation support and access to relevant funding opportunities. Providing line-by-line grant proposal clinics, pitch deck de-risking, and warm introductions to regional angel syndicates.",
    icon: TrendingUp,
    accentColor: "#059669",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    borderHover: "hover:border-emerald-400",
    glowColor: "rgba(5, 150, 105, 0.15)",
    deliverables: [
      "StartupTN TANSEED (₹10L-₹15L) Grant Dossier Preparation",
      "Ministry of MSME Idea Hackathon (₹15L) Pitch Submissions",
      "Term Sheet Clinics with Regional Angel Syndicates",
    ],
    validationGate: "Seed Grant Sanctioned / Angel Syndicate Term Sheet",
    metric: "Up to ₹15 Lakhs Seed Capital Support",
    subtrack: "TANSEED & MSME Seed Grants",
  },
  {
    id: "m5",
    code: "M5",
    phase: "Phase 05 · Venture Scale & UN SDGs",
    duration: "Month 9 – 12+",
    title: "Sustainable Impact",
    shortDesc: "Scale ethical, sustainable ventures contributing to industrial growth and societal well-being aligned with UN SDGs.",
    fullDesc: "To promote ethical, sustainable and socially responsible entrepreneurship that contributes to industrial growth and societal well-being, in alignment with the Sustainable Development Goals (SDGs). Driving regional wealth generation and green technology deployment across Central Tamil Nadu.",
    icon: Globe2,
    accentColor: "#7c3aed",
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-700",
    borderHover: "hover:border-purple-400",
    glowColor: "rgba(124, 58, 237, 0.15)",
    deliverables: [
      "UN SDG Metric Auditing & Green CleanTech Certification",
      "Regional Job Creation & Tier-2/3 Industrial Spillover",
      "Commercial Traction, Recurring Revenue & Series-A Pipeline",
    ],
    validationGate: "Commercial Revenue & Audited ESG/SDG Footprint",
    metric: "UN SDGs 7, 8, 9 & 12 Alignment",
    subtrack: "UN SDGs & Ethical Tech Scale",
  },
];

export default function MissionRoadmap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const activeMilestone = MILESTONES[activeIndex];
  const ActiveIcon = activeMilestone.icon;

  // Auto-play timer (cycles through M1 -> M5 smoothly every 5.5 seconds)
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % MILESTONES.length);
      }, 5500);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying]);

  const handleManualSelect = (idx: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(idx);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % MILESTONES.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + MILESTONES.length) % MILESTONES.length);
  };

  return (
    <div id="mission-roadmap" className="space-y-10 scroll-mt-24">
      {/* Header with Title & Operational Tag */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#772b38] uppercase tracking-widest mb-1.5">
            <Rocket className="w-3.5 h-3.5" />
            <span>OPERATIONAL EXCELLENCE ROADMAP</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 font-display tracking-tight">
            Strategic Mission Objectives (M1 to M5)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-normal leading-relaxed">
            Structured operational objectives guiding every venture cohort from napkin sketch ideation to prototype validation and market scale.
          </p>
        </div>

        {/* Auto-play and Step Counter Indicator */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              isAutoPlaying
                ? "bg-[#772b38]/10 text-[#772b38] border-[#772b38]/30 shadow-2xs"
                : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200/80"
            }`}
            title={isAutoPlaying ? "Pause Auto-Tour" : "Resume Auto-Tour"}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3 h-3 text-[#772b38]" />
                <span>Auto-Tour Active</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-slate-600" />
                <span>Play Tour</span>
              </>
            )}
          </button>
          <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold border border-slate-200">
            Phase 0{activeIndex + 1} / 05
          </span>
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE ROADMAP CONNECTING TRACK (SVG Flow Track with Traveling Beam)
         ========================================================================= */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden">
        {/* Subtle Background Circuit Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        {/* Track Nodes (M1 to M5) */}
        <div className="relative z-10">
          <div className="grid grid-cols-5 gap-2 sm:gap-4 relative">
            {/* Connecting Baseline Track Line */}
            <div className="absolute top-6 left-[10%] right-[10%] h-1 bg-slate-100 rounded-full z-0 hidden sm:block">
              {/* Animated Progress Bar Fill */}
              <motion.div
                className="h-full bg-gradient-to-r from-[#772b38] via-sky-600 to-purple-600 rounded-full"
                initial={false}
                animate={{ width: `${(activeIndex / 4) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {MILESTONES.map((m, idx) => {
              const isActive = idx === activeIndex;
              const isPassed = idx < activeIndex;
              const StepIcon = m.icon;

              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleManualSelect(idx)}
                  className="flex flex-col items-center text-center group cursor-pointer relative z-10 focus:outline-none"
                >
                  {/* Milestone Node Circle */}
                  <div className="relative mb-2">
                    {/* Concentric Radar Ping when Active */}
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-2xl animate-ping opacity-35"
                        style={{ backgroundColor: m.accentColor }}
                      />
                    )}

                    <div
                      className={`w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center font-display font-black text-xs sm:text-sm transition-all duration-300 border-2 shadow-xs ${
                        isActive
                          ? "scale-110 text-white shadow-lg"
                          : isPassed
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-white text-slate-600 border-slate-200 group-hover:border-slate-400 group-hover:scale-105"
                      }`}
                      style={{
                        backgroundColor: isActive ? m.accentColor : undefined,
                        borderColor: isActive ? m.accentColor : undefined,
                        boxShadow: isActive ? `0 10px 25px -5px ${m.glowColor}` : undefined,
                      }}
                    >
                      <StepIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                    </div>

                    {/* Milestone Code Badge */}
                    <span
                      className={`absolute -bottom-1 -right-1 text-[9px] font-mono font-black px-1.5 py-0.2 rounded-md border shadow-2xs ${
                        isActive
                          ? "bg-white text-slate-900 border-slate-300"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {m.code}
                    </span>
                  </div>

                  {/* Title & Phase Label */}
                  <div className="mt-1">
                    <div
                      className={`text-[11px] sm:text-xs font-bold leading-tight transition-colors line-clamp-1 ${
                        isActive ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"
                      }`}
                    >
                      {m.title}
                    </div>
                    <div className="text-[10px] text-slate-600 font-mono mt-0.5 hidden md:block">
                      {m.duration}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            FEATURED ACTIVE MILESTONE SHOWCASE CARD (Animated Stage Presentation)
           ========================================================================= */}
        <div className="mt-8 pt-6 border-t border-slate-100 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMilestone.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "transform, opacity" }}
              className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-slate-50/90 via-white to-slate-50/50 border border-slate-200/90 shadow-xs relative overflow-hidden"
            >
              {/* Dynamic Glow Accent */}
              <div
                className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
                style={{ backgroundColor: activeMilestone.accentColor }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start relative z-10">
                {/* Left Column: Milestone Header & Core Narrative */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-mono font-black border uppercase tracking-wider"
                      style={{
                        backgroundColor: `${activeMilestone.accentColor}15`,
                        color: activeMilestone.accentColor,
                        borderColor: `${activeMilestone.accentColor}30`,
                      }}
                    >
                      {activeMilestone.code} · {activeMilestone.phase}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-semibold border border-slate-200">
                      <Clock className="w-3 h-3 text-slate-600" />
                      <span>{activeMilestone.duration}</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 font-display tracking-tight">
                    {activeMilestone.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {activeMilestone.fullDesc}
                  </p>

                  {/* Concrete Deliverables & Checkpoints */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 font-mono">
                      Milestone Key Deliverables:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeMilestone.deliverables.map((item, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-700 font-medium shadow-2xs"
                        >
                          <CheckCircle2
                            className="w-3.5 h-3.5 shrink-0 mt-0.5"
                            style={{ color: activeMilestone.accentColor }}
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Validation Gate Card & Navigation Controls */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                  {/* Validation Gate Callout Box */}
                  <div
                    className="p-5 rounded-2xl border bg-white shadow-xs space-y-3"
                    style={{ borderColor: `${activeMilestone.accentColor}35` }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                        style={{ backgroundColor: activeMilestone.accentColor }}
                      >
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                        Milestone Exit Gate
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm font-bold text-slate-900">
                      {activeMilestone.validationGate}
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                      <span>Cohort Benchmark</span>
                      <span
                        className="font-bold font-mono"
                        style={{ color: activeMilestone.accentColor }}
                      >
                        {activeMilestone.metric}
                      </span>
                    </div>
                  </div>

                  {/* Interactive Stepper Navigation Controls */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-colors shadow-2xs active:scale-95"
                        title="Previous Milestone"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-colors shadow-2xs active:scale-95"
                        title="Next Milestone"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <Link
                      href="/programs"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#772b38] hover:text-[#5e212b] transition-colors"
                    >
                      <span>Explore 4-Stage Pathway</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* =========================================================================
          CONNECTED 5-MILESTONE ROADMAP CARDS (Interactive Visual Journey Flow)
         ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {MILESTONES.map((milestone, idx) => {
          const isActive = idx === activeIndex;
          const CardIcon = milestone.icon;

          return (
            <div
              key={milestone.id}
              onClick={() => handleManualSelect(idx)}
              className="cursor-pointer h-full"
            >
              <XYZCard depth={8}>
                <div
                  className={`p-5 rounded-2xl bg-white border transition-all duration-300 flex flex-col justify-between h-full group ${
                    isActive
                      ? "shadow-lg border-2"
                      : "border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300"
                  }`}
                  style={{
                    borderColor: isActive ? milestone.accentColor : undefined,
                    boxShadow: isActive ? `0 10px 25px -5px ${milestone.glowColor}` : undefined,
                  }}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-105"
                        style={{ backgroundColor: milestone.accentColor }}
                      >
                        <CardIcon className="w-5 h-5" />
                      </div>
                      <span
                        className="text-xs font-mono font-black px-2.5 py-0.5 rounded-full border"
                        style={{
                          backgroundColor: `${milestone.accentColor}15`,
                          color: milestone.accentColor,
                          borderColor: `${milestone.accentColor}30`,
                        }}
                      >
                        {milestone.code}
                      </span>
                    </div>

                    <div>
                      <div className="text-[10px] font-mono font-semibold text-slate-600 uppercase tracking-wide">
                        {milestone.duration}
                      </div>
                      <h4
                        className="text-sm font-bold text-slate-900 group-hover:text-[#772b38] transition-colors mt-0.5"
                      >
                        {milestone.title}
                      </h4>
                      <p className="text-[11.5px] text-slate-600 mt-1 leading-snug line-clamp-3 font-normal">
                        {milestone.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-medium text-slate-600">
                    <span className="truncate mr-1">{milestone.subtrack}</span>
                    <span
                      className="font-bold shrink-0"
                      style={{ color: milestone.accentColor }}
                    >
                      {isActive ? "Active Phase" : "Select"}
                    </span>
                  </div>
                </div>
              </XYZCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
