"use client";

import React from "react";
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
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section id="join-us" className="py-20 sm:py-28 bg-slate-950 relative border-b border-slate-800 overflow-hidden">
      {/* Background Video with Clearly Visible Playback & Protective Vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-80 sm:opacity-85 filter brightness-100 contrast-105"
        >
          <source src="/videos/join-us.mp4" type="video/mp4" />
          <source src="/videos/join-us-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/45 to-slate-950/80" />
        <div className="absolute inset-0 bg-[#772b38]/12 mix-blend-overlay" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <FadeUp className="max-w-3xl mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-display">
            Join Us
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-2 font-medium">
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
                  <div className="h-full p-6 sm:p-7 rounded-3xl bg-slate-900/80 backdrop-blur-md border border-slate-700/70 hover:border-[#772b38] shadow-lg hover:shadow-2xl hover:shadow-[#772b38]/20 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-white font-display group-hover:text-rose-200 transition-colors">
                          {st.role}
                        </h3>
                        <div className="w-11 h-11 rounded-2xl bg-[#772b38]/20 border border-[#772b38]/40 flex items-center justify-center text-[#ff8097] group-hover:scale-110 group-hover:bg-[#772b38] group-hover:text-white transition-all duration-300 shadow-xs">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                        {st.desc}
                      </p>
                    </div>

                    <div className="pt-2">
                      <Link href={`/apply?${st.applyQuery}`} className="block w-full">
                        <Button className="w-full bg-[#772b38] hover:bg-[#5e212b] text-white font-extrabold text-xs sm:text-sm h-11 rounded-xl shadow-md shadow-[#772b38]/30 gap-1.5 transition-all duration-200 group-hover:shadow-lg ring-1 ring-white/15">
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
              <div className="h-full p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#1e070c] via-[#140508] to-slate-950 text-white shadow-xl flex flex-col justify-between border-2 border-[#772b38]/60 group hover:border-[#772b38] hover:-translate-y-1 transition-all duration-300">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#ff8097] uppercase tracking-widest block mb-4">
                    ACCELERATE IMPACT
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-display leading-tight mb-3">
                    COLLABORATE, <br />
                    <span className="text-[#ff7b90]">INNOVATE</span> <br />
                    AND SCALE!
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Ready to take your idea or partnership to the next level? Our incubation doors at MAMCET are open.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-700/60">
                  <Link href="/contact" className="block w-full">
                    <Button
                      className="w-full bg-[#772b38] hover:bg-[#5e212b] text-white font-extrabold text-xs h-11 rounded-xl gap-2 shadow-lg shadow-[#772b38]/40 ring-1 ring-white/20 transition-all"
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
