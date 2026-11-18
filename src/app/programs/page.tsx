import React from "react";
import Link from "next/link";
import { INCUBATION_STAGES, INCUBATION_SERVICES } from "@/lib/db/mockData";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Programs | MASTeR Incubation Foundation (MIF)",
  description: "Discover our 4-stage incubation pathway and 6 core incubation services at MAMCET.",
};

export default function ProgramsPage() {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
            Incubation Lifecycle
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mt-2 font-display">
            Incubation Programs & Services
          </h1>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed">
            Tailored journeys providing the precise resources, maker labs, and seed guidance required at each inflection point of your startup venture.
          </p>
        </div>

        {/* 4 Stages Detailed Flow */}
        <div className="space-y-8 mb-24">
          {INCUBATION_STAGES.map((st) => (
            <div
              key={st.step}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-mono font-extrabold px-3 py-1 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
                    STAGE {st.step}
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900">{st.title}</h2>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  Typical Duration: {st.duration}
                </span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {st.description}
              </p>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Mandatory Phase Deliverables:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {st.milestones.map((mil, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{mil}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 6 Core Services Section */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-slate-900 font-display">
              6 Pillar Incubation Services
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Full-spectrum institutional backing from physical desks to patent registration and investor showcases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INCUBATION_SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{srv.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-1.5">
                  {srv.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-10 rounded-3xl bg-blue-50 border border-blue-200 text-center shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">Ready to Join the Next Incubation Cohort?</h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mb-6">
            Applications are reviewed on a rolling basis by our incubation evaluation panel.
          </p>
          <Link href="/apply">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 shadow-sm">
              <span>Submit Your Application</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
