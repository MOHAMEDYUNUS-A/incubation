import React from "react";
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
  CheckCircle2,
  ArrowRight,
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

export const metadata = {
  title: "Focus Areas | MASTeR Incubation Foundation (MIF)",
  description: "Explore the 7 engineering technology tracks supported by MASTeR Incubation Foundation at MAMCET.",
};

export default function FocusAreasPage() {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
            Domain Architecture
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mt-2 font-display">
            7 Core Engineering Focus Areas
          </h1>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed">
            Our specialized infrastructure and academic laboratories are purpose-built to accelerate engineering innovations across these 7 strategic domains.
          </p>
        </div>

        <div className="space-y-8">
          {FOCUS_AREAS.map((area, idx) => {
            const Icon = ICON_MAP[area.iconName] || Sparkles;
            return (
              <div
                key={area.id}
                className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-blue-600 font-bold">
                          TRACK 0{idx + 1}
                        </span>
                        <h2 className="text-2xl font-bold text-slate-900">{area.title}</h2>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {area.description}
                    </p>

                    <div className="pt-2">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Specialized Subtracks & Engineering Scopes:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {area.subtracks.map((sub, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{sub}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col justify-between p-6 rounded-2xl bg-slate-50 border border-slate-200 h-full">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Incubation Track
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1 mb-2">
                        Dedicated Mentorship & Lab
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        Access specialized faculty advisors, high-spec workbenches, and provisional patent assistance.
                      </p>
                    </div>

                    <Link href={`/apply?track=${area.categoryKey}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs h-10 gap-1.5 shadow-sm">
                        <span>Apply in this Track</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
