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
  TrendingUp,
  Cpu,
  Globe2,
} from "lucide-react";
import { FadeUp, ZoomIn, XYZCard, RevealLeft, RevealRight } from "@/components/animations/LightAnimations";
import RunningCount from "@/components/ui/RunningCount";

interface ImpactItem {
  count: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sub: string;
  icon: React.ElementType;
  color: string;
}

const RUNNING_IMPACT_METRICS: ImpactItem[] = [
  {
    count: 10,
    suffix: "+",
    label: "Entrepreneurs Benefited",
    sub: "Aspiring student & regional founders nurtured through incubation cohorts",
    icon: Users2,
    color: "text-red-600 bg-red-50 border-red-200",
  },
  {
    count: 25,
    suffix: "+",
    label: "Research Innovations",
    sub: "Translational engineering & deep-tech applied research projects",
    icon: GraduationCap,
    color: "text-blue-600 bg-blue-50 border-blue-200",
  },
  {
    count: 8,
    suffix: "+",
    label: "Startups Incubated",
    sub: "Formal pre-incubation cohorts and resident technology ventures",
    icon: Rocket,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
  {
    count: 10,
    suffix: "+",
    label: "Prototypes Fabricated",
    sub: "Functional hardware benchtop PoCs, IoT devices & embedded systems",
    icon: Cpu,
    color: "text-cyan-600 bg-cyan-50 border-cyan-200",
  },
  {
    count: 10,
    suffix: "+",
    label: "Bilateral MoUs Signed",
    sub: "Strategic partnerships with industry leaders & ecosystem partners",
    icon: Handshake,
    color: "text-amber-600 bg-amber-50 border-amber-200",
  },
  {
    count: 15,
    suffix: "+",
    label: "StartupTN Initiatives",
    sub: "Active linkages with StartupTN hubs, TANSEED & EDII-TN grants",
    icon: TrendingUp,
    color: "text-purple-600 bg-purple-50 border-purple-200",
  },
  {
    count: 5,
    suffix: "+",
    label: "Investors & Angels on Network",
    sub: "Active angel syndicates, venture funds & seed mentors",
    icon: Sparkles,
    color: "text-rose-600 bg-rose-50 border-rose-200",
  },
  {
    count: 10,
    suffix: "+",
    label: "Commercial Products Launched",
    sub: "Market-ready hardware & software solutions deployed commercially",
    icon: Globe2,
    color: "text-indigo-600 bg-indigo-50 border-indigo-200",
  },
];

export default function EcosystemImpact() {
  return (
    <section className="py-20 sm:py-28 bg-slate-100/70 relative border-b border-slate-200 overflow-hidden">
      {/* Background Video with Clear Cinematic Visibility */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-65 sm:opacity-75"
        >
          <source src="/videos/impact-bg-video.mp4" type="video/mp4" />
        </video>
        {/* Soft edge gradients so video content remains vividly visible while smoothly connecting sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 via-transparent to-slate-50/75 pointer-events-none" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-red-200 text-[#dc2626] text-xs font-bold tracking-wider uppercase mb-3 shadow-xs">
            <span>MEASURABLE TRANSLATION FOOTPRINT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 font-display tracking-tight drop-shadow-sm">
            MIF Ecosystem Impact
          </h2>
          <p className="text-base sm:text-lg text-slate-800 mt-3 font-semibold drop-shadow-xs max-w-2xl mx-auto">
            Transforming academic research into measurable entrepreneurial capacity across Central Tamil Nadu.
          </p>
        </FadeUp>

        {/* Constellation Metrics Grid with Dynamic Running Counters on Scroll (High-Contrast White Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {RUNNING_IMPACT_METRICS.map((m, idx) => {
            const Icon = m.icon;
            const Wrapper = idx % 2 === 0 ? RevealLeft : RevealRight;
            return (
              <Wrapper key={m.label} delay={(idx % 4) * 0.08}>
                <XYZCard depth={8}>
                  <div className="p-7 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-red-500 hover:bg-white hover:-translate-y-1.5 transition-all duration-300 relative group flex flex-col justify-between h-full">
                    {/* Top Corner Orange Accent Notch */}
                    <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden rounded-tr-3xl pointer-events-none">
                      <div className="absolute transform rotate-45 bg-[#dc2626] w-12 h-2.5 -top-1 -right-4" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl sm:text-4xl font-black text-slate-900 font-display group-hover:text-blue-600 transition-colors">
                          <RunningCount
                            to={m.count}
                            duration={2200}
                            suffix={m.suffix || ""}
                            prefix={m.prefix || ""}
                          />
                        </span>
                        <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 ${m.color} shadow-2xs group-hover:scale-105 transition-transform`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1 leading-snug">
                        {m.label}
                      </h4>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100/90 text-xs sm:text-sm text-slate-600 font-medium">
                      {m.sub}
                    </div>
                  </div>
                </XYZCard>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
