"use client";

import React from "react";
import { MENTORS_LIST } from "@/lib/db/mockData";
import { FadeUp, ZoomIn, XYZCard, RevealLeft, RevealRight } from "@/components/animations/LightAnimations";

export default function MentorsEcosystem() {
  return (
    <section id="mentors" className="py-20 sm:py-24 bg-white relative border-t border-slate-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 font-display tracking-tight">
            Mentors & Startup Advisors
          </h2>
          <p className="text-base sm:text-lg text-slate-700 mt-3 leading-relaxed font-normal">
            Guidance from academic researchers, corporate engineers, and incubation specialists helping you de-risk early-stage ventures.
          </p>
        </FadeUp>

        {/* Mentor Cards with Alternating Left/Right Reveals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MENTORS_LIST.map((mentor, idx) => {
            const Wrapper = idx % 2 === 0 ? RevealLeft : RevealRight;
            return (
              <Wrapper key={mentor.id} delay={(idx % 4) * 0.08}>
                <XYZCard depth={8}>
                  <div className="h-full rounded-3xl border border-slate-200/90 bg-white p-7 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 group">
                    <div>
                      <div className="w-20 h-20 rounded-2xl overflow-hidden mb-5 border border-slate-200 bg-slate-100 shadow-2xs">
                        <img
                          src={mentor.image}
                          alt={mentor.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mb-0.5 font-display">{mentor.name}</h3>
                      <div className="text-sm font-semibold text-blue-700 mb-1">{mentor.role}</div>
                      <div className="text-xs text-slate-500 mb-4">{mentor.organization}</div>

                      <p className="text-sm text-slate-700 leading-relaxed mb-5 font-normal">
                        {mentor.bio}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <div className="text-[11px] font-bold uppercase text-slate-400 mb-2">
                        Areas of Expertise:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {mentor.expertise.map((exp, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80 font-medium"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
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
