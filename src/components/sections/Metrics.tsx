"use client";

import React from "react";
import { Cpu, Award, Rocket, Users2, Landmark, ShieldCheck } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    label: "Accredited Centre",
    value: "StartupTN",
    description: "Official pre-incubation hub under Tamil Nadu Startup and Innovation Mission.",
  },
  {
    icon: Landmark,
    label: "Corporate Structure",
    value: "Section 8",
    description: "Not-for-profit company registered under Companies Act, 2013.",
  },
  {
    icon: Cpu,
    label: "Specialized Labs",
    value: "7 Tracks",
    description: "Dedicated focus on AI, Clean Energy, IoT, and Advanced Manufacturing.",
  },
  {
    icon: Rocket,
    label: "Incubation Pipeline",
    value: "4 Stages",
    description: "Structured journey from Ideation and PoC to Incorporation and Seed Pitching.",
  },
];

export default function Metrics() {
  return (
    <section className="py-20 bg-[#050814] border-y border-slate-800/80 relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            Section 03 — Institutional Footprint
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 font-display">
            Built for Tangible Engineering Translation
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Providing verifiable ecosystem linkages, accredited infrastructure, and structured mentor access.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HIGHLIGHTS.map((h, i) => {
            const Icon = h.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 border border-slate-800/80 hover:border-blue-500/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-extrabold text-white tracking-tight font-display mb-1">
                  {h.value}
                </div>
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
                  {h.label}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {h.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
