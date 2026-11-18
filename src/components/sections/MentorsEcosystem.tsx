"use client";

import React from "react";
import { MENTORS_LIST } from "@/lib/db/mockData";
import { FadeUp, ZoomIn, XYZCard } from "@/components/animations/LightAnimations";

export default function MentorsEcosystem() {
  return (
    <section id="mentors" className="py-20 sm:py-24 bg-white relative border-t border-slate-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <FadeUp className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
            Section 08 — Advisory Network
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-2 font-display">
            Mentors & Startup Advisors
          </h2>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Guidance from academic researchers, corporate engineers, and incubation specialists helping you de-risk early-stage ventures.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MENTORS_LIST.map((mentor, idx) => (
            <ZoomIn key={mentor.id} delay={idx * 0.08}>
              <XYZCard depth={8}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-300 group">
                  <div>
                    <div className="w-16 h-16 rounded-2xl overflow-hidden mb-5 border border-slate-200 bg-slate-100 shadow-2xs">
                      <img
                        src={mentor.image}
                        alt={mentor.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-0.5">{mentor.name}</h3>
                    <div className="text-xs font-semibold text-blue-700 mb-1">{mentor.role}</div>
                    <div className="text-[11px] text-slate-500 mb-4">{mentor.organization}</div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-5">
                      {mentor.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <div className="text-[10px] font-bold uppercase text-slate-400 mb-2">
                      Areas of Expertise:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {mentor.expertise.map((exp, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
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
