"use client";

import React from "react";
import { TESTIMONIALS_DATA } from "@/lib/db/mockData";
import { Quote } from "lucide-react";
import { FadeUp, ZoomIn, XYZCard, RevealLeft, RevealRight } from "@/components/animations/LightAnimations";

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50 relative border-t border-slate-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 font-display tracking-tight">
            Incubator Experience & Perspectives
          </h2>
          <p className="text-base sm:text-lg text-slate-700 mt-2 font-normal">
            Real feedback from innovators utilizing MAMCET&apos;s prototyping labs and mentor network.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {TESTIMONIALS_DATA.map((t, idx) => {
            const Wrapper = idx === 0 ? RevealLeft : RevealRight;
            return (
              <Wrapper key={idx} delay={idx * 0.1}>
                <XYZCard depth={8}>
                  <div className="h-full p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-xl hover:border-blue-300 transition-all duration-300">
                    <div>
                      <Quote className="w-9 h-9 text-blue-500/30 mb-5" />
                      <p className="text-base sm:text-lg text-slate-800 leading-relaxed italic mb-6 font-normal">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>

                    <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-bold text-slate-900 font-display">{t.author}</h4>
                        <div className="text-sm font-semibold text-blue-700">{t.role}</div>
                      </div>
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                        {t.cohort}
                      </span>
                    </div>
                  </div>
                </XYZCard>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
