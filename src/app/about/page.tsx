import React from "react";
import Link from "next/link";
import { FOUNDATION_INFO } from "@/lib/db/mockData";
import { Shield, Target, Compass, Award, Building, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Us | MASTeR Incubation Foundation (MIF)",
  description: "Learn about the Section 8 not-for-profit company, StartupTN Pre-Incubation Centre accreditation, and governance at MAMCET.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-[#050814] min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Hero */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 text-cyan-300 text-xs font-semibold mb-4 border border-blue-500/30">
            <Shield className="w-3.5 h-3.5" />
            <span>Governance & Institutional Framework</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-display">
            About MASTeR Incubation Foundation
          </h1>
          <p className="text-lg text-slate-300 mt-4 leading-relaxed">
            Registered as a Section 8 not-for-profit company under the Companies Act, 2013, associated with M.A.M. College of Engineering and Technology (MAMCET), and recognised as a StartupTN Pre-Incubation Centre.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-300 mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-slate-300 text-base leading-relaxed italic">
                &ldquo;{FOUNDATION_INFO.vision}&rdquo;
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
              Institutional commitment to high-impact technology commercialization.
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Institutional Mandate</h3>
              <p className="text-slate-300 text-base leading-relaxed">
                MIF functions as a single-window launchpad connecting student innovators, faculty researchers, and regional entrepreneurs with laboratory infrastructure, corporate partnerships, and venture capital syndicates.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
              Approved by AICTE and Tamil Nadu Startup Mission frameworks.
            </div>
          </div>
        </div>

        {/* Detailed 5 Mission Objectives */}
        <div className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 font-display">
            Strategic Mission Objectives (M1 to M5)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FOUNDATION_INFO.mission.map((m) => (
              <div key={m.code} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-600/20 text-cyan-300 border border-blue-500/30">
                  {m.code}
                </span>
                <h4 className="text-base font-bold text-white mt-3 mb-2">{m.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="p-10 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Incubation Leadership & Operational Team
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Reach out to our leadership for incubation screening, partnership MoUs, and lab visits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#070c1d] border border-slate-800">
              <span className="text-[11px] font-semibold text-cyan-400 uppercase">Head of Incubation</span>
              <h3 className="text-xl font-bold text-white mt-1">{FOUNDATION_INFO.manager.name}</h3>
              <div className="text-xs text-slate-300 mt-0.5">{FOUNDATION_INFO.manager.role}</div>
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-1 text-xs text-slate-400">
                <div>Email: <span className="text-white">{FOUNDATION_INFO.manager.email}</span></div>
                <div>Phone: <span className="text-white">{FOUNDATION_INFO.manager.phone}</span></div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#070c1d] border border-slate-800">
              <span className="text-[11px] font-semibold text-cyan-400 uppercase">Ecosystem Coordinator</span>
              <h3 className="text-xl font-bold text-white mt-1">{FOUNDATION_INFO.coordinator.name}</h3>
              <div className="text-xs text-slate-300 mt-0.5">{FOUNDATION_INFO.coordinator.role}</div>
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-1 text-xs text-slate-400">
                <div>Email: <span className="text-white">{FOUNDATION_INFO.coordinator.email}</span></div>
                <div>Phone: <span className="text-white">{FOUNDATION_INFO.coordinator.phone}</span></div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/apply">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8">
                <span>Submit Startup Application</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
