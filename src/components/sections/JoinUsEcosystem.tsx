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
    <section id="join-us" className="py-20 sm:py-28 bg-slate-50 relative border-b border-slate-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header (Matching Reference Image 6) */}
        <FadeUp className="max-w-3xl mb-16">
          <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block mb-2">
            ONBOARDING PATHWAYS
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight font-display">
            Join Us
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 mt-2 font-medium">
            Be Part of Our Growing Innovation Ecosystem
          </p>
        </FadeUp>

        {/* 8 Cards Grid with Alternating Left/Right Reveals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAKEHOLDERS.map((st, idx) => {
            const Icon = st.icon;
            const Wrapper = idx % 2 === 0 ? RevealLeft : RevealRight;
            return (
              <Wrapper key={st.role} delay={(idx % 4) * 0.08}>
                <XYZCard depth={10}>
                  <div className="h-full p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-orange-400 transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-blue-900 font-display">
                          {st.role}
                        </h3>
                        <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200/80 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform shadow-2xs">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed mb-6 font-normal">
                        {st.desc}
                      </p>
                    </div>

                    <div className="pt-2">
                      <Link href={`/apply?${st.applyQuery}`} className="block w-full">
                        <Button className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm h-11 rounded-xl shadow-sm gap-1.5 transition-all">
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
            <XYZCard depth={10}>
              <div className="h-full p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0f2c59] to-[#07132b] text-white shadow-xl flex flex-col justify-between border border-blue-900 group">
                <div>
                  <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-widest block mb-4">
                    ACCELERATE IMPACT
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 font-display leading-tight mb-3">
                    COLLABORATE, <br />
                    INNOVATE <br />
                    AND SCALE!
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Ready to take your idea or partnership to the next level? Our incubation doors at MAMCET are open.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800">
                  <Link href="/contact" className="block w-full">
                    <Button
                      variant="outline"
                      className="w-full border-orange-500/60 bg-orange-500/10 hover:bg-orange-500 text-white font-bold text-xs h-10 rounded-xl gap-2 transition-all"
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
