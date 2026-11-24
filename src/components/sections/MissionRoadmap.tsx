"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Rocket,
  Lightbulb,
  Microscope,
  Handshake,
  TrendingUp,
  Globe2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-react";
import { FadeUp, ZoomIn, XYZCard } from "@/components/animations/LightAnimations";

interface ProcessStep {
  step: string;
  code: string;
  phase: string;
  duration: string;
  title: string;
  headline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  glowShadow: string;
  deliverables: string[];
  exitGate: string;
  metric: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    code: "M1",
    phase: "Phase 01 · Ideation & Design Thinking",
    duration: "Month 0 – 2",
    title: "Cultivate Mindset & Research",
    headline: "Problem Discovery & Interdisciplinary Ideation",
    description:
      "We begin by understanding user pain points, real-world industry friction, and technology constraints. Through design thinking hackathons and problem dossiers, engineering concepts are validated for genuine desirability before fabrication starts.",
    icon: Lightbulb,
    gradient: "from-[#772b38] via-[#8c3243] to-[#45151e]",
    glowShadow: "shadow-[0_20px_50px_rgba(119,43,56,0.3)]",
    deliverables: [
      "Design Thinking & Problem Discovery Bootcamps",
      "Interdisciplinary Student-Faculty Ideathons",
      "Problem-Solution Fit Validation Dossier",
    ],
    exitGate: "Problem-Solution Fit & Ideation Dossier Approved",
    metric: "100+ Student Creators Screened per Cohort",
  },
  {
    step: "02",
    code: "M2",
    phase: "Phase 02 · Lab to Proof-of-Concept",
    duration: "Month 2 – 4",
    title: "Research Translation",
    headline: "Hardware Prototyping & TRL-4 Fabrication",
    description:
      "Transforming laboratory breakthroughs into benchtop working prototypes. Startups leverage MAMCET's rapid 3D printing equipment, multi-layer PCB design workbenches, and IoT telemetry testing to reach TRL-4 functional maturity.",
    icon: Microscope,
    gradient: "from-[#0f2c59] via-[#16437e] to-[#081d3c]",
    glowShadow: "shadow-[0_20px_50px_rgba(15,44,89,0.3)]",
    deliverables: [
      "Additive 3D Prototyping & PCB Milling Labs",
      "Institutional Patent Disclosures & Prior-Art Search",
      "TRL-4 Working Prototype Demonstration",
    ],
    exitGate: "TRL-4 Benchtop Functional Prototype Verified",
    metric: "15+ Hardware Prototyping Bays & Maker Labs",
  },
  {
    step: "03",
    code: "M3",
    phase: "Phase 03 · Industrial Alliances & MoUs",
    duration: "Month 4 – 6",
    title: "Industry Collaboration",
    headline: "Corporate Sandboxes & Bilateral Pilots",
    description:
      "Collaborating with manufacturing corporations, technology enterprises, and research bodies. Founders gain direct access to operational factory lines, live testing environments, and customer pilot agreements.",
    icon: Handshake,
    gradient: "from-[#b45309] via-[#d97706] to-[#78350f]",
    glowShadow: "shadow-[0_20px_50px_rgba(217,119,6,0.3)]",
    deliverables: [
      "8+ Bilateral Strategic MoUs with Industrial Partners",
      "Corporate Sandbox Access & Field Telemetry Testing",
      "Customer Letters of Intent (LOI) & Pilot Trials",
    ],
    exitGate: "Signed Letter of Intent / Corporate Sandbox Pilot",
    metric: "8+ Active Industry MoUs & Enterprise Sandboxes",
  },
  {
    step: "04",
    code: "M4",
    phase: "Phase 04 · Seed Grants & Term Sheets",
    duration: "Month 6 – 9",
    title: "Mentoring & Funding",
    headline: "TANSEED & Non-Dilutive Grant Deployment",
    description:
      "Equipping high-potential ventures with financial runway, cap-table governance, and investor readiness. Founders receive line-by-line grant proposal clinics for StartupTN TANSEED and MSME Idea Hackathon capital.",
    icon: TrendingUp,
    gradient: "from-[#047857] via-[#059669] to-[#064e3b]",
    glowShadow: "shadow-[0_20px_50px_rgba(5,150,105,0.3)]",
    deliverables: [
      "StartupTN TANSEED (₹10L-₹15L) Dossier Submission",
      "Ministry of MSME Idea Hackathon (₹15L) Sanctions",
      "Pitch Arena Rounds with Angel Investor Syndicates",
    ],
    exitGate: "Seed Grant Disbursed / Angel Syndicate Term Sheet",
    metric: "Up to ₹15 Lakhs Seed Capital Support",
  },
  {
    step: "05",
    code: "M5",
    phase: "Phase 05 · Venture Scale & UN SDGs",
    duration: "Month 9 – 12+",
    title: "Sustainable Impact",
    headline: "Commercial Scale & UN SDG Alignment",
    description:
      "Promoting ethical, scalable, and socially responsible businesses that drive job creation across Central Tamil Nadu. Ventures embed circular economy principles aligned with the United Nations Sustainable Development Goals.",
    icon: Globe2,
    gradient: "from-[#6b21a8] via-[#7c3aed] to-[#3b0764]",
    glowShadow: "shadow-[0_20px_50px_rgba(124,58,237,0.3)]",
    deliverables: [
      "UN SDG Metric Auditing & Green Tech Certification",
      "Regional Job Creation & Industrial Spillover",
      "Commercial Revenue Generation & Series-A Pipeline",
    ],
    exitGate: "Audited Commercial Revenue & SDG Impact Audit",
    metric: "UN SDGs 7, 8, 9 & 12 Institutional Alignment",
  },
];

export default function MissionRoadmap() {
  return (
    <div id="mission-roadmap" className="space-y-12 scroll-mt-24">
      {/* =========================================================================
          TOP PROCESS HEADER (Modeled after Reference Image 4)
         ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-3xl space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-display tracking-tight leading-[1.15]">
            Here&apos;s how we turn ideas into{" "}
            <span className="text-[#772b38]">real-world</span> deep-tech products
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl">
            We follow a structured, practical, and business-focused development process to convert engineering
            breakthroughs into patentable prototypes, funded ventures, and commercial scale.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-[#772b38] hover:border-[#772b38]/40 transition-colors shadow-2xs"
          >
            <span>View 4-Stage Incubation Pathway</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* =========================================================================
          PROCESS ROADMAP SECTION WITH GLOWING 3D CARDS & CONNECTING DASHED PATH
         ========================================================================= */}
      <div className="relative py-6 sm:py-10">
        {/* Ambient Subtle Grid Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none rounded-3xl" />

        <div className="relative z-10 space-y-10 sm:space-y-14">
          {PROCESS_STEPS.map((step, idx) => {
            const StepIcon = step.icon;
            const isEven = idx % 2 === 1;

            return (
              <div key={step.step} className="relative">
                {/* Responsive Layout: Alternating left/right offset on lg screens */}
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-6 items-center ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Step Description / Meta Sidebar on opposite side */}
                  <div
                    className={`space-y-3 lg:col-span-5 ${
                      isEven ? "lg:order-2 lg:pl-6" : "lg:order-1 lg:pr-6"
                    }`}
                  >
                    <span className="text-xs font-mono font-bold text-[#772b38] uppercase tracking-wider block">
                      {step.phase}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                      {step.headline}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {step.description}
                    </p>

                    <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-slate-600">
                      <span className="flex items-center gap-1.5 text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-[#772b38]" />
                        <span>Duration: {step.duration}</span>
                      </span>
                      <span>·</span>
                      <span className="text-[#772b38] font-bold">{step.metric}</span>
                    </div>
                  </div>

                  {/* 3D Glowing Process Card (Modeled Directly after Image 4) */}
                  <div
                    className={`lg:col-span-7 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <XYZCard depth={12}>
                      <div
                        className={`relative rounded-3xl p-7 sm:p-9 text-white bg-gradient-to-br ${step.gradient} ${step.glowShadow} transition-all duration-300 hover:scale-[1.015] border border-white/20 overflow-hidden group`}
                      >
                        {/* Top-center hardware camera/pin dot (Exact design element from reference image 4) */}
                        <div className="flex justify-center mb-6">
                          <div className="w-3.5 h-3.5 rounded-full bg-white/30 border-2 border-white/80 shadow-inner" />
                        </div>

                        {/* Top Header: Step Number & Icon */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white/90 block">
                              {step.step}
                            </span>
                            <h4 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight mt-1">
                              {step.title}
                            </h4>
                          </div>

                          <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-white shrink-0 backdrop-blur-xs group-hover:scale-110 transition-transform">
                            <StepIcon className="w-6 h-6" />
                          </div>
                        </div>

                        {/* Card Description */}
                        <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal mb-6">
                          {step.description}
                        </p>

                        {/* Deliverables Pills */}
                        <div className="space-y-2 mb-6">
                          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/70">
                            Key Deliverables & Milestones:
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {step.deliverables.map((deliv, dIdx) => (
                              <div
                                key={dIdx}
                                className="flex items-start gap-2 p-2 rounded-xl bg-white/10 border border-white/15 text-xs text-white/95 font-medium backdrop-blur-2xs"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-white" />
                                <span>{deliv}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Exit Gate Banner */}
                        <div className="pt-4 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-white/90 shrink-0" />
                            <span className="text-white/80 font-medium">Exit Gate:</span>
                            <span className="font-bold text-white">{step.exitGate}</span>
                          </div>

                          <span className="font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] self-start sm:self-auto">
                            {step.code} Milestone
                          </span>
                        </div>
                      </div>
                    </XYZCard>
                  </div>
                </div>

                {/* Animated Connecting Dashed Flow Line & Arrow between steps (except last) */}
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="flex items-center justify-center my-6 sm:my-8 pointer-events-none">
                    <div className="flex flex-col items-center gap-1 text-[#772b38]">
                      {/* Dashed vertical connector line */}
                      <div className="w-0.5 h-10 border-l-2 border-dashed border-[#772b38]/50" />
                      <div className="w-8 h-8 rounded-full bg-[#772b38]/10 border border-[#772b38]/30 flex items-center justify-center text-xs font-bold text-[#772b38] shadow-2xs">
                        ↓
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
