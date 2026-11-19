"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowRight, Building, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealLeft, RevealRight, XYZCard } from "@/components/animations/LightAnimations";

export default function InfrastructureDetails() {
  return (
    <section className="py-20 sm:py-28 bg-white relative border-b border-slate-200 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Real Seminar & Lab Showcase Photo (RevealLeft) */}
          <RevealLeft className="lg:col-span-6">
            <XYZCard depth={10}>
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl bg-white group">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src="/images/incubation/image-3.jpeg"
                    alt="MAMCET Training and Incubation Seminar Hall"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Floating Status Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#0f2c59] text-xs font-bold border border-white shadow-md flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>Active Innovation Facility</span>
                    </span>
                  </div>

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

                {/* Sub-strip with campus preview */}
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-700">
                  <span className="font-semibold text-slate-800">
                    Host Institution Allotted Incubation Block
                  </span>
                  <span className="font-mono text-orange-600 font-bold text-sm">6,000+ Sq. Ft.</span>
                </div>
              </div>
            </XYZCard>
          </RevealLeft>

          {/* Right Column: Narrative & Checklist (RevealRight) */}
          <RevealRight className="lg:col-span-6 space-y-6">
            {/* Heading with Orange Underline and Yellow Accent */}
            <div className="relative inline-block">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 font-display tracking-tight uppercase leading-tight">
                INFRASTRUCTURE <br />
                <span className="text-[#0f2c59]">DETAILS</span>
              </h2>
              {/* Orange decorative brush stroke */}
              <div className="h-2 w-36 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mt-2" />
              {/* Yellow decorative accent ring */}
              <div className="absolute -top-4 -right-12 w-12 h-12 rounded-full border-4 border-amber-400/40 pointer-events-none hidden sm:block" />
            </div>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              The host institution <strong className="text-slate-900 font-bold">M.A.M. College of Engineering & Technology (MAMCET)</strong>, Siruganur, Trichy has allotted an expansive dedicated area with comprehensive state-of-the-art facilities for the operation of <strong className="text-blue-800 font-bold">MASTeR Incubation Foundation</strong>, specialized laboratories for new product research & development, and collaborative co-working spaces for resident startup companies.
            </p>

            {/* Checklist with Orange Checks (Matching Image 3) */}
            <div className="space-y-3.5 pt-2">
              {[
                "MASTeR-MIF Dedicated Physical Space & Prototyping Bays.",
                "Plug-&-Play Incubation Seats with Ergonomic Workstations.",
                "Fully Furnished Office Suites & Meeting Rooms with AV Setup.",
                "Precision Hardware Testing Equipment (Oscilloscopes & Logic Analyzers).",
                "Additive 3D Printing & Rapid Prototyping Maker Lab.",
                "High-Speed Gigabit Fiber Internet & 24/7 Power Redundancy.",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm sm:text-base text-slate-800 font-semibold">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0 border border-orange-200">
                    <Check className="w-4 h-4 text-orange-600 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Action CTA */}
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
