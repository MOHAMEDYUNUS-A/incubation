"use client";

import React from "react";
import { FOUNDATION_INFO } from "@/lib/db/mockData";
import { ShieldCheck } from "lucide-react";

export default function Partners() {
  return (
    <section className="py-20 bg-[#070c1d] border-t border-slate-800/80 relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            Section 12 — Statutory & Ecosystem Affiliations
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 font-display">
            Institutional Ecosystem Network
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            Recognized and accredited under apex state and national innovation frameworks.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
          {FOUNDATION_INFO.affiliations.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex flex-col items-center text-center justify-center min-h-[120px] hover:border-slate-700 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-cyan-300 mb-2 font-bold text-sm">
                {item.name}
              </div>
              <span className="text-xs font-bold text-white">{item.name}</span>
              <span className="text-[10px] text-slate-400 mt-0.5 leading-tight line-clamp-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
