"use client";

import React from "react";
import Link from "next/link";
import { FOUNDATION_INFO } from "@/lib/db/mockData";
import {
  ShieldCheck,
  Building2,
  Award,
  Sparkles,
  ArrowRight,
  Target,
  Users,
  Compass,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealLeft, RevealRight, ZoomIn, XYZCard } from "@/components/animations/LightAnimations";

export default function WelcomeSection() {
  return (
    <section className="py-20 sm:py-24 bg-white relative border-b border-slate-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Accredited Institutional Logos Banner Strip */}
        <div data-gsap="fade-up" className="flex justify-center mb-12">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-6 py-3 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:inline">
              Accredited Institutional Ecosystem:
            </span>
            <div className="flex items-center gap-1.5" title="M.A.M. College of Engineering and Technology">
              <img src="/logos/mamcet-logo.png" alt="MAMCET" className="h-7 sm:h-9 object-contain" />
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5" title="StartupTN Pre-Incubation Centre">
              <img src="/logos/startuptn.jpg" alt="StartupTN" className="h-6 sm:h-8 object-contain rounded" />
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5" title="All India Council for Technical Education">
              <img src="/logos/aicte-logo.png" alt="AICTE" className="h-6 sm:h-8 object-contain" />
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5" title="Institution's Innovation Council">
              <img src="/logos/iic-logo.png" alt="IIC" className="h-6 sm:h-8 object-contain" />
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5" title="National Board of Accreditation">
              <img src="/logos/nba-logo.png" alt="NBA" className="h-6 sm:h-8 object-contain" />
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5" title="MASTeR Incubation Foundation">
              <img src="/logos/master-incubation-logo.png" alt="MIF" className="h-7 sm:h-9 object-contain" />
            </div>
          </div>
        </div>

        {/* 2-Column Section: Welcome Copy on Left, Official Institutional Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Official Welcome Heading & Narrative (RevealLeft) */}
          <RevealLeft className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Section 8 Not-For-Profit Company · StartupTN Centre</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight font-display">
              WELCOME TO <br />
              <span className="text-[#0f2c59]">MASTeR INCUBATION FOUNDATION</span>
            </h2>

            <div className="text-lg sm:text-xl font-bold text-blue-800 leading-snug">
              &ldquo;Launchpad for your Entrepreneurial Success&rdquo;
            </div>

            <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal">
              <strong className="text-slate-900 font-bold">MASTeR Incubation Foundation (MIF)</strong> is an institutional technology business incubator incorporated as a <strong className="text-slate-900 font-bold">Section 8 Company under the Companies Act, 2013</strong>, based at the lush <strong className="text-slate-900 font-bold">M.A.M. College of Engineering and Technology (MAMCET)</strong> campus in Siruganur, Trichy.
            </p>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Formally recognised as a <strong className="text-blue-700 font-bold">StartupTN Pre-Incubation Centre</strong> by the Government of Tamil Nadu, MIF is dedicated to cultivating an entrepreneurial mindset among student innovators, research scholars, faculty, and local entrepreneurs. By bridging academic engineering knowledge with industry-grade prototyping facilities, seed funding mentorship (TANSEED), and intellectual property protection, MIF translates bold scientific ideas into sustainable, market-viable commercial enterprises.
            </p>

            {/* Overview & Location Institutional Card (Reference Design) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs space-y-3">
              <h3 className="text-lg font-black text-slate-900 font-display flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-600" />
                <span>Overview & Location</span>
              </h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="font-bold text-slate-900 shrink-0">• Address:</span>
                  <span className="leading-relaxed">
                    Trichy–Chennai Trunk Road, Siruganur, Tiruchirappalli, Tamil Nadu – 621105
                    <span className="inline-flex items-center gap-1 ml-2 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                      MAMCET
                    </span>
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="font-bold text-slate-900 shrink-0">• Focus:</span>
                  <span className="leading-relaxed">
                    Supporting student innovators, aspiring entrepreneurs, and early-stage startups through mentorship, ideation, and venture development.
                    <a
                      href="https://www.instagram.com/master_incubation_foundation/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 ml-2 px-2.5 py-0.5 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-semibold hover:bg-pink-100 transition-colors"
                    >
                      Instagram · master_incubation_foundation
                    </a>
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="font-bold text-slate-900 shrink-0">• Ecosystem Ties:</span>
                  <span className="leading-relaxed">
                    Connected with MAMCET&apos;s broader innovation setup, including MSME host institution recognition and StartupTN pre-incubation support.
                    <span className="inline-flex items-center gap-1 ml-2 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                      MSME HI + StartupTN
                    </span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Core Pillars Bullet Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-sm text-slate-800">
                  <strong className="block text-slate-900 font-bold mb-0.5">Ideation to Prototyping</strong>
                  Hands-on rapid 3D printing & hardware testing benches.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-sm text-slate-800">
                  <strong className="block text-slate-900 font-bold mb-0.5">StartupTN & TANSEED Link</strong>
                  Direct pipeline to government pre-seed grant opportunities.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-sm text-slate-800">
                  <strong className="block text-slate-900 font-bold mb-0.5">IPR & Legal Incorporation</strong>
                  Patent search assistance and corporate company registration.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-sm text-slate-800">
                  <strong className="block text-slate-900 font-bold mb-0.5">Expert Mentor Network</strong>
                  Guidance from seasoned corporate CTOs, VCs, and domain mentors.
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link href="/about">
                <Button className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold text-sm h-12 px-7 rounded-xl shadow-md gap-2">
                  <span>About Our Foundation</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/programs">
                <Button variant="outline" className="border-slate-300 text-slate-800 font-bold text-sm h-12 px-6 rounded-xl hover:bg-slate-50">
                  View 4-Stage Pathway
                </Button>
              </Link>
            </div>
          </RevealLeft>

          {/* Right Column: Institutional Identity Card with Official Crest (RevealRight) */}
          <RevealRight className="lg:col-span-5">
            <XYZCard depth={12}>
              <div className="p-8 rounded-3xl bg-gradient-to-b from-blue-50/80 via-white to-slate-50 border border-slate-200 shadow-xl relative overflow-hidden">
                <div className="flex flex-col items-center text-center pb-6 border-b border-slate-200">
                  <div className="w-24 h-24 rounded-2xl bg-white p-3 flex items-center justify-center border border-slate-200 shadow-md mb-4">
                    <img
                      src="/logos/master-incubation-logo.png"
                      alt="MASTeR Incubation Foundation Emblem"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 font-display">
                    MAST<span className="text-blue-600">e</span>R Incubation Foundation
                  </h3>
                  <span className="text-xs text-blue-700 font-bold mt-1">
                    StartupTN Recognised Pre-Incubation Centre
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5">
                    M.A.M. College of Engineering & Technology, Trichy
                  </span>
                </div>

                <div className="py-6 space-y-3.5 text-xs text-slate-700">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80">
                    <span className="text-slate-500 font-semibold">Legal Identity:</span>
                    <span className="font-bold text-slate-900">Section 8 Not-For-Profit</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80">
                    <span className="text-slate-500 font-semibold">Affiliated College:</span>
                    <span className="font-bold text-slate-900">MAMCET, Siruganur</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80">
                    <span className="text-slate-500 font-semibold">Government Recognition:</span>
                    <span className="font-bold text-blue-700">StartupTN / TANSIM</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80">
                    <span className="text-slate-500 font-semibold">Incubation Manager:</span>
                    <span className="font-bold text-slate-900">Mr. M. Santhosh Kumar</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80">
                    <span className="text-slate-500 font-semibold">Helpline Contact:</span>
                    <a href="tel:+919361697702" className="font-bold text-orange-600 hover:underline">
                      +91 9361697702
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/apply" className="block w-full">
                    <Button className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold h-11 text-xs uppercase tracking-wider rounded-xl shadow-md">
                      Apply For Pre-Incubation Today
                    </Button>
                  </Link>
                </div>
              </div>
            </XYZCard>
          </RevealRight>
        </div>
      </div>
    </section>
  );
}
