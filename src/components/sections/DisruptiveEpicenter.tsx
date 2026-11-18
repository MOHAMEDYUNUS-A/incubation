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
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp, XYZCard } from "@/components/animations/LightAnimations";

const PERSONAS = [
  {
    id: "startup",
    label: "Startup",
    icon: Rocket,
    tagline: "Seed funding, prototyping labs, patent filing assistance, and pilot market deployments.",
    ctaText: "Apply For Pre-Incubation",
    href: "/apply?role=startup",
  },
  {
    id: "researcher",
    label: "Researcher",
    icon: Lightbulb,
    tagline: "Commercialize academic R&D, license intellectual property, and translate lab prototypes into commercial ventures.",
    ctaText: "Partner on Research Commercialization",
    href: "/apply?role=researcher",
  },
  {
    id: "investor",
    label: "Investor",
    icon: TrendingUp,
    tagline: "Discover pre-vetted deep-tech student and faculty ventures across Central Tamil Nadu.",
    ctaText: "Access Curated Deal Flow",
    href: "/contact?subject=investor",
  },
  {
    id: "industry",
    label: "Industry",
    icon: Settings,
    tagline: "Co-create engineering solutions, sponsor innovation challenges, and tap into college engineering talent.",
    ctaText: "Explore Industry Partnerships",
    href: "/contact?subject=industry",
  },
  {
    id: "student",
    label: "Student",
    icon: GraduationCap,
    tagline: "Transform final-year projects and hardware prototypes into funded startups with mentor backing.",
    ctaText: "Join Student Ideation Cohort",
    href: "/apply?role=student",
  },
  {
    id: "mentor",
    label: "Mentor",
    icon: Handshake,
    tagline: "Guide high-potential innovators, conduct masterclasses, and join our expert advisory board.",
    ctaText: "Join Mentorship Panel",
    href: "/contact?subject=mentor",
  },
  {
    id: "government",
    label: "Government",
    icon: Scale,
    tagline: "Deploy state innovation missions, TANSEED schemes, and regional MSME technology clusters.",
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
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden border-b border-slate-200">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-10 w-96 h-96 bg-blue-50/80 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-orange-50/60 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Purpose */}
          <div data-gsap="reveal-left" className="lg:col-span-7 space-y-6">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] font-display text-slate-900">
              The Epicenter of <br />
              <span className="text-[#ea580c] italic font-serif">
                Disruptive Breakthroughs
              </span>
            </h2>

            <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-normal max-w-2xl">
              <strong className="text-slate-900 font-bold">MASTeR Incubation Foundation</strong> harnesses the synergistic power of startups, industry, academia, Government (<strong className="text-blue-700 font-bold">StartupTN</strong> & <strong className="text-blue-700 font-bold">Ministry of MSME</strong>), and apex partners to enrich Deep Tech & Emerging Tech in Tamil Nadu and build the future by nurturing a conducive R&D&I ecosystem.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link href="/about">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm px-8 h-12 rounded-xl shadow-md shadow-blue-600/20 gap-2"
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
                  className="border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-sm px-7 h-12 rounded-xl shadow-xs gap-2"
                >
                  <Download className="w-4 h-4 text-slate-600" />
                  <span>Download Overview</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive "Personalized for Your Search" Light Card */}
          <div data-gsap="reveal-right" className="lg:col-span-5">
            <XYZCard depth={10}>
              <div className="p-7 sm:p-9 rounded-3xl bg-slate-50 border border-slate-200 shadow-xl relative">
                {/* Header */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mb-1">
                  Personalized for Your Search
                </h3>

                {/* "I AM A..." Pill Accent */}
                <div className="mt-4 mb-3">
                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-mono font-bold tracking-wider uppercase inline-block border border-orange-200">
                    I AM A...
                  </span>
                </div>

                {/* 8 Persona Pills with Clean Lucide SVGs (No Raw Emojis) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                  {PERSONAS.map((p) => {
                    const Icon = p.icon;
                    const isSelected = selectedPersona.id === p.id;

                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPersona(p)}
                        className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                          isSelected
                            ? "bg-[#ea580c] border-[#ea580c] text-white shadow-md shadow-orange-500/25 scale-105"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-blue-600"}`} />
                        <span className="truncate">{p.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Tailored Guidance Box */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs mb-6">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1.5 font-bold">
                    I&apos;M LOOKING FOR...
                  </div>
                  <div className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span>{selectedPersona.tagline}</span>
                  </div>
                </div>

                {/* Dynamic Explore CTA Button */}
                <Link href={selectedPersona.href} className="block w-full">
                  <Button className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold text-sm h-12 rounded-xl shadow-md shadow-orange-600/25 gap-2 uppercase tracking-wide group transition-all">
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
