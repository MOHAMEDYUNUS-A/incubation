"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FOCUS_AREAS } from "@/lib/db/mockData";
import {
  BrainCircuit,
  Zap,
  Code2,
  Cpu,
  Radio,
  Building2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ICON_MAP: Record<string, React.ElementType> = {
  BrainCircuit,
  Zap,
  Code2,
  Cpu,
  Radio,
  Building2,
  Sparkles,
};

export default function FocusAreas() {
  const [activeArea, setActiveArea] = useState<string | null>(null);

  return (
    <section id="focus-areas" className="py-20 sm:py-24 bg-white relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
              Section 04 — Core Engineering Domains
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-2 font-display">
              7 Priority Technology Focus Areas
            </h2>
            <p className="text-base text-slate-600 mt-3 leading-relaxed">
              Designed around MAMCET&apos;s interdisciplinary research laboratories and Tamil Nadu&apos;s strategic industrial growth sectors.
            </p>
          </div>
          <Link href="/focus-areas">
            <Button variant="outline" className="border-slate-300 hover:bg-slate-50 text-slate-800 gap-2 shadow-sm">
              <span>View All Domain Roadmaps</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Dynamic Clean Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FOCUS_AREAS.map((area, idx) => {
            const Icon = ICON_MAP[area.iconName] || Sparkles;
            const isHovered = activeArea === area.id;

            return (
              <div
                key={area.id}
                onMouseEnter={() => setActiveArea(area.id)}
                onMouseLeave={() => setActiveArea(null)}
                className={`group relative p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isHovered
                    ? "bg-white border-blue-400 shadow-xl -translate-y-1"
                    : "bg-slate-50/70 border-slate-200/90 hover:bg-white hover:border-slate-300 hover:shadow-md"
                }`}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {area.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {area.shortDesc}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-slate-200">
                  <div className="text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider">
                    Core Subtracks:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {area.subtracks.slice(0, 3).map((sub, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 font-medium shadow-2xs"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
