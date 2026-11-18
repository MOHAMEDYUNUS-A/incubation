"use client";

import React from "react";
import { Cpu, Rocket, Landmark, ShieldCheck } from "lucide-react";
import { FadeUp, ZoomIn, XYZCard } from "@/components/animations/LightAnimations";

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
        <FadeUp className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Built for Tangible Engineering Translation
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Providing verifiable ecosystem linkages, accredited infrastructure, and structured mentor access.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HIGHLIGHTS.map((h, i) => {
            const Icon = h.icon;
            return (
              <ZoomIn key={i} delay={i * 0.08}>
                <XYZCard depth={8}>
                  <div className="h-full p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-300 group flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:scale-105 transition-transform">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${h.color}`}>
                          {h.label}
                        </span>
                      </div>
                      <div className="text-2xl font-extrabold text-slate-900 mb-1 font-display">
                        {h.value}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {h.description}
                      </p>
                    </div>
                  </div>
                </XYZCard>
              </ZoomIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
