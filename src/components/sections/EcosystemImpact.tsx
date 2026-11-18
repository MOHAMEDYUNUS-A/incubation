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
    color: "text-blue-600 bg-blue-50 border-blue-200",
  },
  {
    value: "8",
    label: "Strategic Industry MoUs",
    sub: "Executed for technology transfer",
    icon: Handshake,
    color: "text-orange-600 bg-orange-50 border-orange-200",
  },
  {
    value: "IITMIC",
    label: "Strategic Incubation Alliance",
    sub: "IIT Madras Incubation Cell partner",
    icon: Award,
    color: "text-indigo-600 bg-indigo-50 border-indigo-200",
  },
  {
    value: "₹15 L",
    label: "MSME Grant Eligibility",
    sub: "Non-dilutive seed funding per idea",
    icon: Sparkles,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
  {
    value: "500+",
    label: "Students & Innovators Benefited",
    sub: "Through bootcamps & hackathons",
    icon: Users2,
    color: "text-purple-600 bg-purple-50 border-purple-200",
  },
  {
    value: "7",
    label: "Priority Engineering Labs",
    sub: "AI, IoT, CleanTech, Robotics, Mfg",
    icon: Building,
    color: "text-cyan-600 bg-cyan-50 border-cyan-200",
  },
  {
    value: "StartupTN",
    label: "State Recognised Hub",
    sub: "Direct pre-seed TANSEED pipeline",
    icon: FileCheck,
    color: "text-blue-600 bg-blue-50 border-blue-200",
  },
  {
    value: "10+",
    label: "Patents & PoC Prototypes",
    sub: "Under IP commercialization review",
    icon: GraduationCap,
    color: "text-amber-600 bg-amber-50 border-amber-200",
  },
];

export default function EcosystemImpact() {
  return (
    <section className="py-20 sm:py-28 bg-slate-50 relative border-b border-slate-200 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-widest block mb-2">
            MEASURABLE TRANSLATION FOOTPRINT
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 font-display tracking-tight">
            MIF Ecosystem Impact
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 font-medium">
            Transforming academic potential into measurable entrepreneurial capacity across Central Tamil Nadu.
          </p>
        </FadeUp>

        {/* Constellation Metrics Grid in Clean Light Theme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10" data-gsap-group="stagger">
          {IMPACT_METRICS.map((m, idx) => {
            const Icon = m.icon;
            return (
              <ZoomIn key={m.label} delay={idx * 0.07}>
                <XYZCard depth={8}>
                  <div
                    data-gsap-item="card"
                    className="p-7 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-blue-400 transition-all duration-300 relative group flex flex-col justify-between h-full"
                  >
                    {/* Top Corner Orange Accent Notch */}
                    <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden rounded-tr-2xl pointer-events-none">
                      <div className="absolute transform rotate-45 bg-orange-500 w-12 h-2.5 -top-1 -right-4" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl sm:text-4xl font-black text-slate-900 font-display group-hover:text-blue-600 transition-colors">
                          {m.value}
                        </span>
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${m.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                        {m.label}
                      </h4>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-slate-500">
                      {m.sub}
                    </div>
                  </div>
                </XYZCard>
              </ZoomIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
