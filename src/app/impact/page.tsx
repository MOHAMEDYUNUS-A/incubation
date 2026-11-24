"use client";

import React from "react";
import Link from "next/link";
import EcosystemImpact from "@/components/sections/EcosystemImpact";
import Partners from "@/components/sections/Partners";
import {
  ArrowRight,
  Award,
  ShieldCheck,
  Building2,
  Rocket,
  Globe2,
  CheckCircle2,
  TrendingUp,
  FileCheck2,
  Handshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RunningCount from "@/components/ui/RunningCount";
import { FadeUp, RevealLeft, RevealRight, XYZCard } from "@/components/animations/LightAnimations";

const ADDITIONAL_STATS = [
  {
    count: 25,
    suffix: "+",
    label: "Research Innovations",
    desc: "Translational engineering & patent-backed research prototypes.",
  },
  {
    count: 10,
    suffix: "+",
    label: "Bilateral MoUs Executed",
    desc: "Active partnerships with industrial leaders & IITMIC mentors.",
  },
  {
    count: 10,
    suffix: "+",
    label: "Commercial Product Launches",
    desc: "Hardware prototypes and software products successfully deployed in market.",
  },
  {
    count: 15,
    suffix: "+",
    label: "StartupTN & Grant Linkages",
    desc: "Direct access to TANSEED 4.0/5.0 and MSME Idea Hackathon seed grants.",
  },
];

export default function ImpactPage() {
  return (
    <div className="pt-28 bg-white min-h-screen">
      {/* Page Hero */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-14">
        <FadeUp className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight font-display text-slate-900 leading-tight">
            Ecosystem Impact & Translation Reach
          </h1>
          <p className="text-base sm:text-xl text-slate-700 mt-4 leading-relaxed font-normal">
            From ministerial recognition and 8+ incubated startups to deep-tech alliances with IITMIC and MSME Host Institution credentials, MIF is accelerating the regional deep-tech innovation ecosystem.
          </p>
        </FadeUp>
      </div>

      {/* Main Impact Graphic Component with Live Running Counters on Scroll */}
      <EcosystemImpact />

      {/* Secondary Running Count Milestones Grid */}
      <div className="py-20 bg-slate-50/50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <FadeUp className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-display">
              Ecosystem Collaborations & Outreaches
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
              Expanding innovation linkages across academia, industry consortia, and government missions.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADDITIONAL_STATS.map((stat, idx) => (
              <FadeUp key={idx} delay={0.08 * idx}>
                <XYZCard depth={8}>
                  <div className="p-7 rounded-3xl bg-white border border-slate-200/90 hover:border-[#772b38]/40 hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between">
                    <div>
                      <div className="text-3xl sm:text-4xl font-black text-[#0f2c59] font-display mb-2">
                        <RunningCount to={stat.count} duration={2000} suffix={stat.suffix} />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-1 font-display">
                        {stat.label}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {stat.desc}
                      </p>
                    </div>
                  </div>
                </XYZCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* Institutional Affiliations Component */}
      <Partners />

      {/* Bottom Action CTA */}
      <div className="py-20 bg-slate-50 text-center">
        <FadeUp className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display mb-4">
            Be Part of Our Growing Milestones
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-8 font-normal">
            Apply today to access incubation workspaces, ₹15 Lakhs MSME Idea Hackathon seed grants, and direct mentor connections.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/apply">
              <Button className="bg-[#772b38] hover:bg-[#5e212b] text-white font-extrabold text-xs sm:text-sm h-12 px-8 rounded-full shadow-md gap-2 ring-1 ring-white/20">
                <span>Apply For Pre-Incubation</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-slate-300 text-slate-800 font-bold text-xs sm:text-sm h-12 px-6 rounded-full hover:bg-white shadow-2xs"
              >
                Contact Management
              </Button>
            </Link>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
