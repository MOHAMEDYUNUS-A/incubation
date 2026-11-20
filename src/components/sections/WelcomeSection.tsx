"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  Sparkles,
  ArrowRight,
  Award,
  CheckCircle2,
  Lightbulb,
  FlaskConical,
  Handshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealLeft, RevealRight, RevealUp } from "@/components/animations/LightAnimations";

export default function WelcomeSection() {
  return (
    <section className="py-20 sm:py-28 bg-white relative border-b border-slate-200 overflow-hidden">
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl -z-10" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Accredited Institutional Logos Strip */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-2.5 rounded-full bg-slate-50 border border-slate-200/80 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
              Accredited Institutional Ecosystem:
            </span>
            <div className="flex items-center gap-1.5" title="M.A.M. College of Engineering and Technology">
              <img src="/logos/mamcet-logo.png" alt="MAMCET" className="h-6 sm:h-8 object-contain" />
            </div>
            <div className="h-3.5 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5" title="StartupTN Pre-Incubation Centre">
              <img src="/logos/startuptn.jpg" alt="StartupTN" className="h-5 sm:h-7 object-contain rounded" />
            </div>
            <div className="h-3.5 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5" title="All India Council for Technical Education">
              <img src="/logos/aicte-logo.png" alt="AICTE" className="h-5 sm:h-7 object-contain" />
            </div>
            <div className="h-3.5 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5" title="Institution's Innovation Council">
              <img src="/logos/iic-logo.png" alt="IIC" className="h-5 sm:h-7 object-contain" />
            </div>
            <div className="h-3.5 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5" title="National Board of Accreditation">
              <img src="/logos/nba-logo.png" alt="NBA" className="h-5 sm:h-7 object-contain" />
            </div>
          </div>
        </div>

        {/* Prestigious, Minimalist Welcome Content */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <RevealLeft>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Section 8 Not-For-Profit Company · StartupTN Centre</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight font-display uppercase leading-tight">
              WELCOME TO <br />
              <span className="text-[#0f2c59]">MASTeR INCUBATION FOUNDATION</span>
            </h2>

            <p className="text-xl sm:text-2xl font-bold text-[#ea580c] font-display mt-2">
              &ldquo;Launchpad for your Entrepreneurial Success&rdquo;
            </p>
          </RevealLeft>

          <RevealRight>
            <div className="space-y-4 max-w-3xl mx-auto text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              <p>
                <strong className="text-slate-900 font-bold">MASTeR Incubation Foundation (MIF)</strong> is an institutional technology business incubator incorporated as a <strong className="text-slate-900 font-bold">Section 8 Not-For-Profit Company</strong>, based on the green <strong className="text-slate-900 font-bold">M.A.M. College of Engineering and Technology (MAMCET)</strong> campus in Siruganur, Tiruchirappalli.
              </p>
              <p>
                Recognised by <strong className="text-blue-800 font-bold">StartupTN</strong> as an official Pre-Incubation Centre and the Ministry of MSME as an approved <strong className="text-slate-900 font-bold">Host Institution (HI)</strong>, MIF empowers student innovators, research faculty, and regional founders to build, protect, and scale deep-tech solutions through structured grant readiness and expert industrial mentorship.
              </p>
            </div>

            {/* 4 Clean Institutional Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Section 8 Non-Profit
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                StartupTN Pre-Incubation Centre
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Approved MSME Host Institution
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                IITMIC Partner Network
              </span>
            </div>
          </RevealRight>
        </div>

        {/* ================= Empowering Innovation and Entrepreneurship (Matching Reference Image 3) ================= */}
        <div className="max-w-6xl mx-auto pt-6 border-t border-slate-200">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f2c59] font-display tracking-tight">
              &ldquo;Empowering Innovation and Entrepreneurship&rdquo;
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Incubate Technological Ideas */}
            <RevealUp delay={0.1}>
              <div className="h-full p-6 sm:p-7 rounded-2xl bg-slate-100/90 border border-slate-300 text-slate-800 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3 text-[#0f2c59]">
                    <Lightbulb className="w-5 h-5 text-orange-600 shrink-0" />
                    <h4 className="text-lg font-bold font-display">Incubate Technological Ideas</h4>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    MASTeR Incubation Foundation is a dedicated facility to incubate technological ideas and engineering innovations, enabling early-stage start-ups to succeed in the competitive commercial marketplace.
                  </p>
                </div>
              </div>
            </RevealUp>

            {/* Card 2: Research And Development */}
            <RevealUp delay={0.2}>
              <div className="h-full p-6 sm:p-7 rounded-2xl bg-slate-100/90 border border-slate-300 text-slate-800 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3 text-[#0f2c59]">
                    <FlaskConical className="w-5 h-5 text-blue-600 shrink-0" />
                    <h4 className="text-lg font-bold font-display">Research And Development</h4>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    We bridge critical gaps across the innovation-entrepreneurship-investment ecosystem, ensuring full commercial and patent utilization of academic and departmental R&D breakthroughs.
                  </p>
                </div>
              </div>
            </RevealUp>

            {/* Card 3: Guide And Support */}
            <RevealUp delay={0.3}>
              <div className="h-full p-6 sm:p-7 rounded-2xl bg-slate-100/90 border border-slate-300 text-slate-800 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3 text-[#0f2c59]">
                    <Handshake className="w-5 h-5 text-indigo-600 shrink-0" />
                    <h4 className="text-lg font-bold font-display">Guide And Support</h4>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    To guide and support potent student and faculty entrepreneurs to avail non-dilutive seed funding (TANSEED, MSME, EDII-TN) for product realization, field validation, and marketing.
                  </p>
                </div>
              </div>
            </RevealUp>
          </div>

          {/* Clean Action CTAs */}
          <div className="pt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/about">
              <Button className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold text-sm h-12 px-8 rounded-xl shadow-md gap-2">
                <span>About Our Foundation</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/programs">
              <Button variant="outline" className="border-slate-300 text-slate-800 font-bold text-sm h-12 px-7 rounded-xl hover:bg-slate-50">
                View 4-Stage Pathway
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
