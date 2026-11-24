"use client";

import React from "react";
import Link from "next/link";
import { INCUBATION_STAGES, INCUBATION_SERVICES } from "@/lib/db/mockData";
import { CheckCircle2, ArrowRight, Sparkles, Layers, ShieldCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp, RevealLeft, RevealRight, XYZCard } from "@/components/animations/LightAnimations";

export default function ProgramsPage() {
  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-slate-50 min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with Smooth FadeUp */}
        <FadeUp className="max-w-3xl mb-16">
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight font-display">
            Incubation Programs & Services
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Tailored journeys providing the precise resources, prototyping maker labs, intellectual property guidance, and seed grants required at each inflection point of your startup venture.
          </p>
        </FadeUp>

        {/* 4 Stages Detailed Flow with Alternating Left/Right Reveals */}
        <div className="space-y-8 mb-24">
          {INCUBATION_STAGES.map((st, idx) => {
            const Wrapper = idx % 2 === 0 ? RevealLeft : RevealRight;
            return (
              <Wrapper key={st.step} delay={0.06 * idx}>
                <XYZCard depth={6}>
                  <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#772b38]/40 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono font-black px-3.5 py-1.5 rounded-xl bg-[#772b38]/10 text-[#772b38] border border-[#772b38]/20 shadow-2xs">
                          STAGE {st.step}
                        </span>
                        <h2 className="text-2xl font-bold text-slate-900 font-display">{st.title}</h2>
                      </div>
                      <span className="text-xs font-semibold px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 self-start sm:self-auto border border-slate-200/60">
                        Typical Duration: <strong className="text-slate-900 font-bold">{st.duration}</strong>
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-normal">
                      {st.description}
                    </p>

                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                        Mandatory Phase Deliverables:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {st.milestones.map((mil, mIdx) => (
                          <div
                            key={mIdx}
                            className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700 hover:bg-white hover:border-[#772b38]/30 transition-all"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#772b38] shrink-0 mt-0.5" />
                            <span className="font-medium">{mil}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </XYZCard>
              </Wrapper>
            );
          })}
        </div>

        {/* 6 Core Services Section */}
        <div className="mb-20">
          <FadeUp className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
              6 Pillar Incubation Services
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
              Institutional backing from physical desks to patent registration, testing benches, and investor showcases.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INCUBATION_SERVICES.map((srv, idx) => (
              <FadeUp key={srv.id} delay={0.07 * idx}>
                <XYZCard depth={8}>
                  <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between h-full group">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-bold font-mono text-sm mb-4 group-hover:scale-105 group-hover:bg-[#0f2c59] group-hover:text-white transition-all duration-200">
                        0{idx + 1}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 font-display group-hover:text-blue-900 transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                        {srv.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      {srv.benefits.map((b, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </XYZCard>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <FadeUp>
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0a182e] via-[#0f2c59] to-[#06101e] text-white text-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-rose-500/15 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-white/10 text-rose-200 border border-white/20 inline-block">
                ADMISSIONS OPEN
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold font-display">Ready to Join the Next Incubation Cohort?</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Applications are reviewed on a rolling basis by our incubation evaluation panel. Receive feedback within 7 business days.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Link href="/apply">
                  <Button size="lg" className="bg-[#772b38] hover:bg-[#5e212b] text-white font-extrabold px-8 h-12 rounded-xl shadow-lg ring-1 ring-white/20 gap-2">
                    <span>Submit Your Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/facilities">
                  <Button variant="outline" size="lg" className="bg-white/5 hover:bg-white/15 text-white font-bold px-6 h-12 rounded-xl border border-white/30 backdrop-blur-md">
                    <span>View Prototyping Labs</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
