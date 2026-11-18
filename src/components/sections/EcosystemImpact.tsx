"use client";

import React from "react";
import {
  Rocket,
  Users2,
  Handshake,
  Award,
  Sparkles,
  FileCheck,
  Building,
  GraduationCap,
} from "lucide-react";
import { FadeUp, ZoomIn, XYZCard } from "@/components/animations/LightAnimations";

const IMPACT_METRICS = [
  {
    value: "25+",
    label: "Startups Incubated & Accelerated",
    sub: "Onboarded during official launch",
    icon: Rocket,
    pos: "top-left",
  },
  {
    value: "8",
    label: "Strategic Industry MoUs",
    sub: "Executed for technology transfer",
    icon: Handshake,
    pos: "top-center",
  },
  {
    value: "IITMIC",
    label: "Strategic Incubation Alliance",
    sub: "IIT Madras Incubation Cell partner",
    icon: Award,
    pos: "top-right",
  },
  {
    value: "₹15 L",
    label: "MSME Grant Eligibility",
    sub: "Non-dilutive seed funding per idea",
    icon: Sparkles,
    pos: "mid-left",
  },
  {
    value: "500+",
    label: "Students & Innovators Benefited",
    sub: "Through bootcamps & hackathons",
    icon: Users2,
    pos: "mid-right",
  },
  {
    value: "7",
    label: "Priority Engineering Labs",
    sub: "AI, IoT, CleanTech, Robotics, Mfg",
    icon: Building,
    pos: "bottom-left",
  },
  {
    value: "StartupTN",
    label: "State Recognised Hub",
    sub: "Direct pre-seed TANSEED pipeline",
    icon: FileCheck,
    pos: "bottom-center",
  },
  {
    value: "10+",
    label: "Patents & PoC Prototypes",
    sub: "Under IP commercialization review",
    icon: GraduationCap,
    pos: "bottom-right",
  },
];

export default function EcosystemImpact() {
  return (
    <section className="py-20 sm:py-28 bg-[#040816] text-white relative overflow-hidden border-b border-slate-800">
      {/* Background Starfield / Constellation Ambient Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,88,12,0.06),transparent_65%)]" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header (Matching Reference Image 5 "iTNT Impact") */}
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest block mb-2">
            MEASURABLE TRANSLATION FOOTPRINT
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white font-display tracking-tight">
            MIF Ecosystem Impact
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 font-medium">
            Transforming academic potential into measurable entrepreneurial capacity across Central Tamil Nadu.
          </p>
        </FadeUp>

        {/* Central Constellation Graphic & Connected Metrics Grid (Matching Image 5) */}
        <div className="relative py-6">
          {/* Central Hexagonal Innovation Core */}
          <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-orange-500/30 items-center justify-center pointer-events-none z-0">
            <div className="w-36 h-36 rounded-full border border-cyan-400/30 flex items-center justify-center animate-spin" style={{ animationDuration: "35s" }}>
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-orange-400/40" />
            </div>
            <div className="absolute w-20 h-20 rounded-2xl bg-slate-900 border border-slate-700 flex flex-col items-center justify-center text-center p-2 shadow-xl shadow-blue-500/10">
              <span className="text-[10px] font-mono text-orange-400 font-bold">MIF</span>
              <span className="text-[9px] text-slate-300 font-medium">CENTRE</span>
            </div>
          </div>

          {/* Responsive Metrics Cards Grid (Matching Image 5 layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10" data-gsap-group="stagger">
            {IMPACT_METRICS.map((m, idx) => {
              const Icon = m.icon;
              return (
                <ZoomIn key={m.label} delay={idx * 0.07}>
                  <XYZCard depth={8}>
                    <div
                      data-gsap-item="card"
                      className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-orange-500/70 shadow-lg hover:shadow-orange-500/10 transition-all duration-300 backdrop-blur-md relative group flex flex-col justify-between h-full"
                    >
                      {/* Top Corner Orange Accent Notch (As in Image 5) */}
                      <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden rounded-tr-2xl pointer-events-none">
                        <div className="absolute transform rotate-45 bg-orange-500/40 w-12 h-2.5 -top-1 -right-4 group-hover:bg-orange-500 transition-colors" />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl sm:text-3xl font-black text-white font-display group-hover:text-orange-400 transition-colors">
                            {m.value}
                          </span>
                          <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>

                        <h4 className="text-sm font-bold text-slate-100 mb-1 leading-snug">
                          {m.label}
                        </h4>
                      </div>

                      <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                        {m.sub}
                      </div>
                    </div>
                  </XYZCard>
                </ZoomIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
