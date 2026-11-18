"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Rocket,
  Lightbulb,
  TrendingUp,
  Settings,
  GraduationCap,
  Handshake,
  Scale,
  BookOpen,
  ArrowRight,
  Download,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp, XYZCard } from "@/components/animations/LightAnimations";

const PERSONAS = [
  {
    id: "startup",
    label: "Startup",
    icon: Rocket,
    tagline: "Seed funding, prototyping labs, patent filing & market pilots.",
    ctaText: "Apply For Pre-Incubation",
    href: "/apply?role=startup",
  },
  {
    id: "researcher",
    label: "Researcher",
    icon: Lightbulb,
    tagline: "Commercialize R&D, license IP, and translate lab prototypes into ventures.",
    ctaText: "Partner on Research Commercialization",
    href: "/apply?role=researcher",
  },
  {
    id: "investor",
    label: "Investor",
    icon: TrendingUp,
    tagline: "Discover pre-vetted deep-tech student & faculty ventures in Central Tamil Nadu.",
    ctaText: "Access Curated Deal Flow",
    href: "/contact?subject=investor",
  },
  {
    id: "industry",
    label: "Industry",
    icon: Settings,
    tagline: "Co-create solutions, sponsor hackathons, and tap into college engineering talent.",
    ctaText: "Explore Industry Partnerships",
    href: "/contact?subject=industry",
  },
  {
    id: "student",
    label: "Student",
    icon: GraduationCap,
    tagline: "Transform final-year projects into funded startups with mentor backing.",
    ctaText: "Join Student Ideation Cohort",
    href: "/apply?role=student",
  },
  {
    id: "mentor",
    label: "Mentor",
    icon: Handshake,
    tagline: "Guide high-potential innovators, conduct masterclasses, and join our advisory board.",
    ctaText: "Join Mentorship Panel",
    href: "/contact?subject=mentor",
  },
  {
    id: "government",
    label: "Government",
    icon: Scale,
    tagline: "Deploy state innovation missions, TANSEED schemes, and MSME clusters.",
    ctaText: "Review Ecosystem Impact",
    href: "/impact",
  },
  {
    id: "academia",
    label: "Academia",
    icon: BookOpen,
    tagline: "Interdisciplinary research, institutional IIC collaboration, and faculty entrepreneurship.",
    ctaText: "Connect with Academic Cell",
    href: "/about#governance",
  },
];

export default function DisruptiveEpicenter() {
  const [selectedPersona, setSelectedPersona] = useState(PERSONAS[0]);

  return (
    <section className="py-20 sm:py-28 bg-[#070d1e] text-white relative overflow-hidden border-b border-slate-800">
      {/* Ambient Visual Glow Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(37,99,235,0.08),transparent)]" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Institutional Purpose (Matching Reference Image 4) */}
          <div data-gsap="reveal-left" className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider">
              <span>MIF INNOVATION CATALYST</span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] font-display">
              The Epicenter of <br />
              <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
                Disruptive Breakthroughs
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
              <strong className="text-white font-bold">MASTeR Incubation Foundation</strong> is harnessing the synergistic power of startups, industry, academia, Government (<strong className="text-cyan-300 font-bold">StartupTN</strong> & <strong className="text-cyan-300 font-bold">Ministry of MSME</strong>), and apex collaborators to enrich Deep Tech and Emerging Tech in Tamil Nadu & build the future by nurturing a conducive R&D&I ecosystem.
            </p>

            {/* Action Buttons (Matching Image 4) */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link href="/about">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm px-8 h-12 rounded-xl shadow-lg shadow-blue-600/30 gap-2"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <a
                href="/logos/master-incubation-logo.png"
                download="MASTeR-Incubation-Foundation-Ecosystem.png"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/5 hover:bg-white/15 text-white font-bold text-sm px-7 h-12 rounded-xl backdrop-blur-md gap-2"
                >
                  <Download className="w-4 h-4 text-cyan-300" />
                  <span>Download Overview</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive "Personalized for Your Search" Widget (Matching Reference Image 4) */}
          <div data-gsap="reveal-right" className="lg:col-span-5">
            <XYZCard depth={12}>
              <div className="p-7 sm:p-9 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl relative">
                {/* Header */}
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-1">
                  Personalized for Your Search
                </h3>
                
                {/* "I AM A..." Header with Yellow Oval Ring Accent */}
                <div className="mt-4 mb-3 flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full border-2 border-amber-400 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase inline-block">
                    I AM A...
                  </div>
                </div>

                {/* 8 Persona Pills Grid (Matching Image 4) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                  {PERSONAS.map((p) => {
                    const Icon = p.icon;
                    const isSelected = selectedPersona.id === p.id;

                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPersona(p)}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all duration-200 ${
                          isSelected
                            ? "bg-gradient-to-r from-orange-600 to-amber-600 border-orange-400 text-white shadow-lg shadow-orange-600/30 scale-105"
                            : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-slate-400"}`} />
                        <span className="truncate">{p.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* "I'M LOOKING FOR..." Dynamic Guidance Container */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 mb-6">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <span>I&apos;M LOOKING FOR...</span>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <span>{selectedPersona.tagline}</span>
                  </div>
                </div>

                {/* Dynamic Explore CTA Button (Matching Image 4) */}
                <Link href={selectedPersona.href} className="block w-full">
                  <Button className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold text-sm h-12 rounded-xl shadow-lg shadow-orange-600/30 gap-2 uppercase tracking-wide group transition-all">
                    <span>{selectedPersona.ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </XYZCard>
          </div>
        </div>
      </div>
    </section>
  );
}
