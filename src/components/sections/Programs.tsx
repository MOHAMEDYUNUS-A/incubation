"use client";

import React, { useState } from "react";
import Link from "next/link";
import { INCUBATION_STAGES, INCUBATION_SERVICES } from "@/lib/db/mockData";
import { CheckCircle2, ArrowRight, Layers, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Programs() {
  const [selectedStep, setSelectedStep] = useState(0);

  return (
    <section id="programs" className="py-24 bg-[#050814] relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            Section 05 — Incubation Roadmap
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 font-display">
            The 4-Stage Incubation Pathway
          </h2>
          <p className="text-base text-slate-400 mt-4 leading-relaxed">
            From initial idea validation and benchtop hardware fabrication to statutory incorporation, seed grant readiness, and market deployment.
          </p>
        </div>

        {/* Interactive Step Switcher */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {INCUBATION_STAGES.map((st, i) => (
            <button
              key={st.step}
              onClick={() => setSelectedStep(i)}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 ${
                selectedStep === i
                  ? "bg-blue-600/15 border-blue-500 shadow-lg shadow-blue-500/10"
                  : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-cyan-400">
                  STAGE {st.step}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {st.duration}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white truncate">{st.title}</h4>
            </button>
          ))}
        </div>

        {/* Selected Stage Detail Card */}
        <div className="p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/30 text-xs font-semibold mb-4">
                Stage {INCUBATION_STAGES[selectedStep].step} · {INCUBATION_STAGES[selectedStep].duration}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {INCUBATION_STAGES[selectedStep].title}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {INCUBATION_STAGES[selectedStep].description}
              </p>

              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Target Milestones in this Stage:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {INCUBATION_STAGES[selectedStep].milestones.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center items-start lg:items-end">
              <div className="p-6 rounded-2xl bg-[#070c1d] border border-slate-800 w-full max-w-sm space-y-4">
                <div className="text-xs font-semibold text-slate-400 uppercase">
                  Incubation Support Provided
                </div>
                <div className="text-sm text-white font-medium">
                  Mentoring, IPR patent search assistance, co-working desks, and seed grant formulation.
                </div>
                <Link href="/apply" className="block w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold">
                    Apply for this Track
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Core Incubation Services Preview */}
        <div className="mt-20 pt-16 border-t border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Comprehensive Incubation Services
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              All 6 specialized services outlined in the official MIF ecosystem brochure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INCUBATION_SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <h4 className="text-base font-bold text-white mb-2">{srv.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{srv.description}</p>
                <ul className="space-y-1.5">
                  {srv.benefits.map((b, bi) => (
                    <li key={bi} className="flex items-center gap-2 text-[11px] text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
