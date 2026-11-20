"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealLeft, RevealRight } from "@/components/animations/LightAnimations";

export default function InfrastructureDetails() {
  return (
    <section className="py-20 sm:py-28 bg-white relative border-b border-slate-200 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Floating in Air 3D Facility Photo (User Request: floating in air) */}
          <RevealLeft className="lg:col-span-6">
            <div className="relative">
              {/* Main Floating in Air Card */}
              <div className="animate-float hover:[animation-play-state:paused] relative rounded-3xl overflow-hidden border-2 border-slate-200/90 shadow-[0_25px_60px_rgba(15,44,89,0.18)] bg-white group transition-all duration-300">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src="/images/incubation/infrastructure.jpeg"
                    alt="MAMCET State-of-the-Art Prototyping Infrastructure & Incubation Centre"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* High Contrast Gradient Overlay for 100% Crisp Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />

                  {/* Caption Overlay with Explicit White Typography */}
                  <div className="absolute bottom-5 left-5 right-5 text-white z-10">
                    <div className="text-xs text-orange-400 font-extrabold uppercase tracking-wider mb-1 drop-shadow-md">
                      MAMCET Engineering Campus, Siruganur
                    </div>
                    <h4 className="text-base sm:text-xl font-bold font-display !text-white text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                      Dedicated Incubation Centre & Advanced Maker Labs
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </RevealLeft>

          {/* Right Column: Narrative & Checklist */}
          <RevealRight className="lg:col-span-6 space-y-6">
            {/* Heading with Orange Underline */}
            <div className="relative inline-block">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 font-display tracking-tight uppercase leading-tight">
                INFRASTRUCTURE <br />
                <span className="text-[#0f2c59]">DETAILS</span>
              </h2>
              <div className="h-2 w-36 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mt-2" />
            </div>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              The host institution <strong className="text-slate-900 font-bold">M.A.M. College of Engineering & Technology (MAMCET)</strong>, Siruganur, Trichy has allotted an expansive dedicated area with comprehensive state-of-the-art facilities for the operation of <strong className="text-blue-800 font-bold">MASTeR Incubation Foundation</strong>, specialized laboratories for new product research & development, and collaborative co-working spaces for resident startup companies.
            </p>

            {/* Checklist with Orange Checks (Matching Image 2 from earlier prompt) */}
            <div className="space-y-3.5 pt-2">
              {[
                "MASTeR–MIF Dedicated Physical Space & Prototyping Bays.",
                "Plug-&-Play Incubation Seats with Ergonomic Workstations.",
                "Fully Furnished Office Suites & Meeting Rooms with AV Setup.",
                "Precision Hardware Testing Equipment (Oscilloscopes & Logic Analyzers).",
                "Additive 3D Printing & Rapid Prototyping Maker Lab.",
                "High-Speed Gigabit Fiber Internet & 24/7 Power Redundancy.",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm sm:text-base text-slate-800 font-semibold">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0 border border-orange-200 shadow-2xs">
                    <Check className="w-4 h-4 text-orange-600 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link href="/facilities">
                <Button className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold text-sm h-12 px-7 rounded-xl shadow-md shadow-orange-600/20 gap-2">
                  <span>Explore Complete Lab Specs</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/apply">
                <Button variant="outline" className="border-slate-300 text-slate-800 font-bold text-sm h-12 px-6 rounded-xl hover:bg-slate-50">
                  Book a Desk / Lab Visit
                </Button>
              </Link>
            </div>
          </RevealRight>
        </div>
      </div>
    </section>
  );
}
