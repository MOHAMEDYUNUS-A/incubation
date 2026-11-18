"use client";

import React from "react";
import { Cpu, Award, Rocket, Users2, Landmark, ShieldCheck } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    label: "Accredited Centre",
    value: "StartupTN",
    description: "Official pre-incubation hub under Tamil Nadu Startup and Innovation Mission.",
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    icon: Landmark,
    label: "Corporate Structure",
    value: "Section 8",
    description: "Not-for-profit company registered under Companies Act, 2013.",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    icon: Cpu,
    label: "Specialized Labs",
    value: "7 Tracks",
    description: "Dedicated focus on AI, Clean Energy, IoT, and Advanced Manufacturing.",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    icon: Rocket,
    label: "Incubation Pipeline",
    value: "4 Stages",
    description: "Structured journey from Ideation and PoC to Incorporation and Seed Pitching.",
    color: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
];

export default function Metrics() {
  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200 relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
            Section 03 — Institutional Footprint
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-display">
            Built for Tangible Engineering Translation
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Providing verifiable ecosystem linkages, accredited infrastructure, and structured mentor access.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HIGHLIGHTS.map((h, i) => {
            const Icon = h.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${h.color} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight font-display mb-1">
                  {h.value}
                </div>
                <div className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
                  {h.label}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
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
