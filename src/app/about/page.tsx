import React from "react";
import Link from "next/link";
import { FOUNDATION_INFO } from "@/lib/db/mockData";
import { Shield, Target, Compass, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Us | MASTeR Incubation Foundation (MIF)",
  description: "Learn about the Section 8 not-for-profit company, StartupTN Pre-Incubation Centre accreditation, and governance at MAMCET.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Hero */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4 border border-blue-200">
            <Shield className="w-3.5 h-3.5" />
            <span>Governance & Institutional Framework</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight font-display">
            About MASTeR Incubation Foundation
          </h1>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed">
            Registered as a Section 8 not-for-profit company under the Companies Act, 2013, associated with M.A.M. College of Engineering and Technology (MAMCET), and recognised as a StartupTN Pre-Incubation Centre.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-700 text-base leading-relaxed italic">
                &ldquo;{FOUNDATION_INFO.vision}&rdquo;
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
              Institutional commitment to high-impact technology commercialization.
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Institutional Mandate</h3>
              <p className="text-slate-700 text-base leading-relaxed">
                MIF functions as a single-window launchpad connecting student innovators, faculty researchers, and regional entrepreneurs with laboratory infrastructure, corporate partnerships, and venture capital syndicates.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
              Approved by AICTE and Tamil Nadu Startup Mission frameworks.
            </div>
          </div>
        </div>

        {/* Detailed 5 Mission Objectives */}
        <div className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 font-display">
            Strategic Mission Objectives (M1 to M5)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FOUNDATION_INFO.mission.map((m) => (
              <div key={m.code} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  {m.code}
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-3 mb-2">{m.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Incubation Leadership & Operational Team
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              Reach out to our leadership for incubation screening, partnership MoUs, and lab visits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-blue-700 uppercase">Head of Incubation</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">{FOUNDATION_INFO.manager.name}</h3>
              <div className="text-xs text-slate-600 mt-0.5">{FOUNDATION_INFO.manager.role}</div>
              <div className="mt-4 pt-4 border-t border-slate-200 space-y-1 text-xs text-slate-600">
                <div>Email: <span className="text-slate-900 font-semibold">{FOUNDATION_INFO.manager.email}</span></div>
                <div>Phone: <span className="text-slate-900 font-semibold">{FOUNDATION_INFO.manager.phone}</span></div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-blue-700 uppercase">Ecosystem Coordinator</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">{FOUNDATION_INFO.coordinator.name}</h3>
              <div className="text-xs text-slate-600 mt-0.5">{FOUNDATION_INFO.coordinator.role}</div>
              <div className="mt-4 pt-4 border-t border-slate-200 space-y-1 text-xs text-slate-600">
                <div>Email: <span className="text-slate-900 font-semibold">{FOUNDATION_INFO.coordinator.email}</span></div>
                <div>Phone: <span className="text-slate-900 font-semibold">{FOUNDATION_INFO.coordinator.phone}</span></div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/apply">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 h-11">
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
