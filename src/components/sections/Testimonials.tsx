"use client";

import React from "react";
import { TESTIMONIALS_DATA } from "@/lib/db/mockData";
import { Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#050814] relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            Section 11 — Founder Voices
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 font-display">
            Incubator Experience & Perspectives
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Real feedback from innovators utilizing MAMCET&apos;s prototyping labs and mentor network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <Quote className="w-8 h-8 text-blue-500/30 mb-4" />
                <p className="text-sm text-slate-200 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{t.author}</h4>
                  <div className="text-xs text-cyan-400">{t.role}</div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {t.cohort}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
