"use client";

import React from "react";
import { Lightbulb, FlaskConical, Handshake, ArrowRight } from "lucide-react";
import { RevealLeft, RevealRight, ZoomIn, XYZCard, FadeUp } from "@/components/animations/LightAnimations";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const PILLARS = [
  {
    icon: Lightbulb,
    title: "Incubate Technological Ideas",
    description:
      "MASTeR - MIF is an institutional facility to incubate technological ideas and engineering innovations to enable student and faculty start-ups to succeed in the marketplace.",
    color: "text-blue-700 bg-blue-50 border-blue-200",
  },
  {
    icon: FlaskConical,
    title: "Research And Development",
    description:
      "We believe that bridging gaps in the innovation-entrepreneurship-investment ecosystem unlocks the full commercial utilization of academic engineering research and patentable work.",
    color: "text-indigo-700 bg-indigo-50 border-indigo-200",
  },
  {
    icon: Handshake,
    title: "Guide And Support",
    description:
      "To guide and support potential entrepreneurs to avail seed funding from apex agencies (StartupTN, MSME, TANSEED) for rapid product realization, pilot validation and commercialization.",
    color: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
];

export default function EmpoweringInnovation() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50 relative border-b border-slate-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Large Prominent Title (As in Reference Image 2) */}
        <FadeUp className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-extrabold text-blue-600 uppercase tracking-widest block mb-3 font-mono">
            CORE INSTITUTIONAL PURPOSE
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0f2c59] tracking-tight font-display leading-tight">
            &ldquo;Empowering Innovation and Entrepreneurship&rdquo;
          </h2>
          <p className="text-base sm:text-xl text-slate-600 mt-4 max-w-2xl mx-auto leading-relaxed font-medium">
            Bridging academia, research labs, and regional industries to cultivate self-reliant technology enterprises in Central Tamil Nadu.
          </p>
        </FadeUp>

        {/* 3 Pillar Cards with Left-Center-Right Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map((p, idx) => {
            const Icon = p.icon;
            const Wrapper = idx === 0 ? RevealLeft : idx === 1 ? ZoomIn : RevealRight;
            return (
              <Wrapper key={p.title} delay={idx * 0.1}>
                <XYZCard depth={12}>
                  <div className="h-full p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      {/* Icon & Title Header */}
                      <div className="flex items-center gap-3.5 mb-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${p.color} shadow-2xs`}>
                          <Icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#0f2c59] font-display leading-snug">
                          {p.title}
                        </h3>
                      </div>

                      {/* Descriptive Narrative with Increased Readability Font */}
                      <p className="text-base text-slate-700 leading-relaxed font-normal">
                        {p.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
                        PILLAR 0{idx + 1}
                      </span>
                      <Link
                        href="/programs"
                        className="text-sm font-bold text-blue-600 hover:text-red-600 flex items-center gap-1 group-hover:translate-x-1 transition-all"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
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
