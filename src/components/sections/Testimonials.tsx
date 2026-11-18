"use client";

import React from "react";
import { TESTIMONIALS_DATA } from "@/lib/db/mockData";
import { Quote } from "lucide-react";
import { FadeUp, ZoomIn, XYZCard } from "@/components/animations/LightAnimations";

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50 relative border-t border-slate-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <FadeUp className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
            Section 11 — Founder Voices
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-2 font-display">
            Incubator Experience & Perspectives
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Real feedback from innovators utilizing MAMCET&apos;s prototyping labs and mentor network.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <ZoomIn key={idx} delay={idx * 0.1}>
              <XYZCard depth={8}>
                <div className="h-full p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-blue-300 transition-all duration-300">
                  <div>
                    <Quote className="w-8 h-8 text-blue-500/30 mb-4" />
                    <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{t.author}</h4>
                      <div className="text-xs font-semibold text-blue-700">{t.role}</div>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold border border-slate-200">
                      {t.cohort}
                    </span>
                  </div>
                </div>
              </XYZCard>
            </ZoomIn>
          ))}
        </div>
      </div>
    </section>
  );
}
