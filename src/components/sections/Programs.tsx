"use client";

import React, { useState } from "react";
import Link from "next/link";
import { INCUBATION_STAGES, INCUBATION_SERVICES } from "@/lib/db/mockData";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealLeft, RevealRight, ZoomIn, FadeUp, XYZCard } from "@/components/animations/LightAnimations";

export default function Programs() {
  const [selectedStep, setSelectedStep] = useState(0);

  return (
    <section id="programs" className="py-20 sm:py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <RevealLeft className="max-w-3xl mb-14">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
            Section 05 — Incubation Roadmap
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-2 font-display">
            The 4-Stage Incubation Pathway
          </h2>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            From initial idea validation and benchtop hardware fabrication to statutory incorporation, seed grant readiness, and market deployment.
          </p>
        </RevealLeft>

        {/* Interactive Step Switcher */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-8">
          {INCUBATION_STAGES.map((st, i) => (
            <button
              key={st.step}
              onClick={() => setSelectedStep(i)}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 ${
                selectedStep === i
                  ? "bg-white border-blue-600 shadow-md ring-2 ring-blue-600/10"
                  : "bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-blue-600">
                  STAGE {st.step}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {st.duration}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 truncate">{st.title}</h4>
            </button>
          ))}
        </div>

        {/* Selected Stage Detail Card with ZoomIn & 3D Depth */}
        <ZoomIn delay={0.1}>
          <XYZCard depth={8}>
            <div className="p-8 md:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold mb-4">
                    Stage {INCUBATION_STAGES[selectedStep].step} · {INCUBATION_STAGES[selectedStep].duration}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                    {INCUBATION_STAGES[selectedStep].title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    {INCUBATION_STAGES[selectedStep].description}
                  </p>

                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Target Milestones in this Stage:
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {INCUBATION_STAGES[selectedStep].milestones.map((m, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-center items-start lg:items-end">
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 w-full max-w-sm space-y-4">
                    <div className="text-xs font-bold text-slate-500 uppercase">
                      Incubation Support Provided
                    </div>
                    <div className="text-sm text-slate-800 font-medium">
                      Mentoring, IPR patent search assistance, co-working desks, and seed grant formulation.
                    </div>
                    <Link href="/apply" className="block w-full">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs">
                        Apply for this Track
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </XYZCard>
        </ZoomIn>

        {/* 6 Core Incubation Services Preview with ZoomIn & XYZCards */}
        <div className="pt-10 border-t border-slate-200">
          <FadeUp className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Comprehensive Incubation Services
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              All 6 specialized services outlined in the official MIF ecosystem brochure.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INCUBATION_SERVICES.map((srv, idx) => (
              <ZoomIn key={srv.id} delay={idx * 0.07}>
                <XYZCard depth={10}>
                  <div className="h-full p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-2">{srv.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">{srv.description}</p>
                    </div>
                    <ul className="space-y-1.5 pt-3 border-t border-slate-100">
                      {srv.benefits.map((b, bi) => (
                        <li key={bi} className="flex items-center gap-2 text-[11px] text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </XYZCard>
              </ZoomIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
