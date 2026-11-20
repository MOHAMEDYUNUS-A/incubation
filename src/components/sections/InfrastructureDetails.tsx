"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowRight, Building, Sparkles, Cpu, Layers } from "lucide-react";
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
              {/* Floating Pill 1 */}
              <div className="absolute -top-4 -left-3 z-20 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#0f2c59] text-xs font-bold border border-slate-200 shadow-xl flex items-center gap-1.5 animate-float-delayed">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>6,000+ Sq. Ft. Prototyping Space</span>
              </div>

              {/* Floating Pill 2 */}
              <div className="absolute -bottom-4 -right-3 z-20 px-3.5 py-1.5 rounded-full bg-[#0f2c59] text-white text-xs font-bold shadow-xl flex items-center gap-1.5 animate-float-reverse">
                <Cpu className="w-3.5 h-3.5 text-cyan-300" />
                <span>Additive 3D & IoT Test Benches</span>
              </div>

              {/* Main Floating in Air Card */}
              <div className="animate-float hover:[animation-play-state:paused] relative rounded-3xl overflow-hidden border-2 border-slate-200/90 shadow-[0_25px_60px_rgba(15,44,89,0.18)] bg-white group transition-all duration-300">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src="/images/incubation/image-3.jpeg"
                    alt="MAMCET Training and Incubation Seminar Hall"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Caption Overlay */}
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <div className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-1">
                      MAMCET Engineering Campus, Siruganur
                    </div>
                    <h4 className="text-base sm:text-xl font-bold font-display">
                      Multidisciplinary Incubation & Mentoring Auditorium
                    </h4>
                  </div>
                </div>

                {/* Sub-strip with facility details */}
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-700">
                  <span className="font-semibold text-slate-800">
                    Host Institution Allotted Incubation Block
                  </span>
                  <span className="font-mono text-orange-600 font-bold text-sm">6,000+ Sq. Ft.</span>
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
