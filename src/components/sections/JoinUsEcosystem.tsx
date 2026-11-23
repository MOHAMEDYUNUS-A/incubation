"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Rocket,
  Lightbulb,
  GraduationCap,
  Settings,
  TrendingUp,
  Handshake,
  Landmark,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp, ZoomIn, XYZCard, RevealLeft, RevealRight } from "@/components/animations/LightAnimations";

const STAKEHOLDERS = [
  {
    role: "Startups",
    icon: Rocket,
    desc: "Access mentorship, seed funding opportunities (MSME & TANSEED), industry partnerships, and accelerate your venture growth.",
    applyQuery: "role=startup",
  },
  {
    role: "Researchers",
    icon: Lightbulb,
    desc: "Collaborate with industry & startups, commercialize academic research, mentor student teams, and solve real-world challenges.",
    applyQuery: "role=researcher",
  },
  {
    role: "Student",
    icon: GraduationCap,
    desc: "Access structured mentorship, connect with startup founders & industry leaders to build prototypes and scale your ideas.",
    applyQuery: "role=student",
  },
  {
    role: "Industry",
    icon: Settings,
    desc: "Partner with startups & academic researchers, access deep-tech innovations, and solve business challenges collaboratively.",
    applyQuery: "role=industry",
  },
  {
    role: "Investors",
    icon: TrendingUp,
    desc: "Discover high-potential early-stage ventures, access curated deal flows, and co-invest in promising next-gen technology teams.",
    applyQuery: "role=investor",
  },
  {
    role: "Mentor",
    icon: Handshake,
    desc: "Guide ambitious startups, share industry expertise, expand your professional network, and empower the next generation of founders.",
    applyQuery: "role=mentor",
  },
  {
    role: "Government",
    icon: Landmark,
    desc: "Deploy state innovation policies, collaborate with research institutions and industries, and strengthen regional entrepreneurial clusters.",
    applyQuery: "role=government",
  },
];

export default function JoinUsEcosystem() {
  return (
    <section id="join-us" className="py-20 sm:py-28 bg-slate-50/70 relative border-b border-slate-200 overflow-hidden">
      {/* Subtle background glow accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-100/25 rounded-full blur-3xl -z-10" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <FadeUp className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase mb-3">
            <span>ONBOARDING PATHWAYS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight font-display">
            Join Us
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-2 font-medium">
            Be Part of Our Growing Multi-Stakeholder Innovation Ecosystem
          </p>
        </FadeUp>

        {/* 8 Cards Grid with Alternating Left/Right Reveals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAKEHOLDERS.map((st, idx) => {
            const Icon = st.icon;
            const Wrapper = idx % 2 === 0 ? RevealLeft : RevealRight;
            return (
              <Wrapper key={st.role} delay={(idx % 4) * 0.08}>
                <XYZCard depth={8}>
                  <div className="h-full p-6 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-red-500 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#0f2c59] font-display group-hover:text-[#dc2626] transition-colors">
                          {st.role}
                        </h3>
                        <div className="w-11 h-11 rounded-2xl bg-red-50 border border-red-200/80 flex items-center justify-center text-[#dc2626] group-hover:scale-110 group-hover:bg-[#dc2626] group-hover:text-white transition-all duration-300 shadow-2xs">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                        {st.desc}
                      </p>
                    </div>

                    <div className="pt-2">
                      <Link href={`/apply?${st.applyQuery}`} className="block w-full">
                        <Button className="w-full bg-[#0f2c59] hover:bg-[#dc2626] text-white font-extrabold text-xs sm:text-sm h-11 rounded-xl shadow-xs gap-1.5 transition-all duration-200 group-hover:shadow-md">
                          <span>Register</span>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </XYZCard>
              </Wrapper>
            );
          })}

          {/* 8th Callout Card: "COLLABORATE, INNOVATE AND SCALE!" */}
          <ZoomIn delay={0.32}>
            <XYZCard depth={8}>
              <div className="h-full p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#0f2c59] via-[#14376b] to-[#07132b] text-white shadow-xl flex flex-col justify-between border-2 border-red-500/30 group hover:border-red-600/60 hover:-translate-y-1 transition-all duration-300">
                <div>
                  <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest block mb-4">
                    ACCELERATE IMPACT
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-display leading-tight mb-3">
                    COLLABORATE, <br />
                    <span className="text-[#dc2626]">INNOVATE</span> <br />
                    AND SCALE!
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Ready to take your idea or partnership to the next level? Our incubation doors at MAMCET are open.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-700/60">
                  <Link href="/contact" className="block w-full">
                    <Button
                      className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-extrabold text-xs h-11 rounded-xl gap-2 shadow-md shadow-red-600/30 transition-all"
                    >
                      <span>Connect with Team</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </XYZCard>
          </ZoomIn>
        </div>
      </div>
    </section>
  );
}
