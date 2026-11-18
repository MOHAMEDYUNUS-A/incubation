"use client";

import React from "react";
import { FOUNDATION_INFO } from "@/lib/db/mockData";
import { ShieldCheck, Compass, Target, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RevealLeft, RevealRight, ZoomIn, FadeUp, XYZCard } from "@/components/animations/LightAnimations";

export default function Introduction() {
  return (
    <section id="about" className="py-20 sm:py-24 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <FadeUp className="flex flex-col items-start max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Section 02 — Institutional Profile</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
            About MASTeR Incubation Foundation (MIF)
          </h2>
          <p className="text-sm sm:text-base text-blue-700 font-semibold mt-2">
            M.A.M. College of Engineering and Technology (MAMCET) · StartupTN Pre-Incubation Centre
          </p>
        </FadeUp>

        {/* 2-Column Editorial Layout with Left-Right Reveals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Column: Authentic Brochure Copy & Vision (RevealLeft) */}
          <RevealLeft delay={0.1} className="lg:col-span-7 space-y-6 text-slate-600">
            <p className="text-base sm:text-lg leading-relaxed text-slate-800">
              <strong className="text-slate-900">MASTeR Incubation Foundation (MIF)</strong> is a Section 8 not-for-profit organisation associated with <strong className="text-slate-900">M.A.M. College of Engineering and Technology (MAMCET)</strong>, and recognised as a <strong className="text-blue-700">StartupTN Pre-Incubation Centre</strong>.
            </p>

            <p className="leading-relaxed text-slate-600 text-sm sm:text-base">
              MIF focuses on cultivating an entrepreneurial mindset among students and entrepreneurs by transforming engineering knowledge, innovative ideas and research outcomes into practical solutions, products and viable startups. Through structured mentoring, incubation support, industry collaborations, technology development and access to relevant funding opportunities, MIF strives to nurture startups and promote sustainable, socially responsible entrepreneurship.
            </p>

            {/* Vision Card with 3D XYZ depth */}
            <XYZCard depth={10}>
              <div className="p-6 sm:p-7 rounded-2xl bg-blue-50/70 border border-blue-200 shadow-sm">
                <div className="flex items-center gap-2 text-blue-800 font-bold text-xs sm:text-sm tracking-wide uppercase mb-2">
                  <Compass className="w-4 h-4 text-blue-600" />
                  <span>Our Vision</span>
                </div>
                <p className="text-slate-800 text-sm sm:text-base leading-relaxed italic">
                  &ldquo;To be a leading institutional hub for innovation and entrepreneurship, transforming engineering knowledge and creativity into pioneering solutions, products and successful startups that shape a brighter future.&rdquo;
                </p>
              </div>
            </XYZCard>

            <div className="pt-1">
              <Link href="/about">
                <Button variant="outline" className="border-slate-300 hover:bg-slate-50 text-slate-800 gap-2 shadow-xs">
                  <span>Explore Governance & Leadership</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </RevealLeft>

          {/* Right Column: Campus & Co-working Photos (RevealRight) */}
          <RevealRight delay={0.15} className="lg:col-span-5 space-y-4">
            <XYZCard depth={10}>
              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm relative group bg-white">
                <img
                  src="/images/mamcet-campus.png"
                  alt="MAMCET Campus Trichy"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-xs font-bold block">MAMCET Engineering Campus</span>
                  <span className="text-[11px] text-slate-200">Trichy - Chennai Trunk Road, Siruganur</span>
                </div>
              </div>
            </XYZCard>

            <XYZCard depth={10}>
              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm relative group bg-white">
                <img
                  src="/images/coworking-space.jpg"
                  alt="MIF Co-working and Maker Space"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-xs font-bold block">MIF Incubation & Co-working Space</span>
                  <span className="text-[11px] text-slate-200">Dedicated Resident Startup Pods & Maker Bench</span>
                </div>
              </div>
            </XYZCard>
          </RevealRight>
        </div>

        {/* 5 Strengths with ZoomIn & XYZCards */}
        <div className="mb-20">
          <FadeUp className="flex items-center gap-2 mb-8">
            <Target className="w-5 h-5 text-blue-600" />
            <h3 className="text-2xl font-bold text-slate-900 tracking-wide font-display">
              Our 5 Core Strengths (From Official Ecosystem Charter)
            </h3>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                num: "01",
                title: "StartupTN Recognised Pre-Incubation Centre",
                desc: "Direct linkage to Tamil Nadu's startup ecosystem and entrepreneurial opportunities.",
                badge: "bg-blue-50 text-blue-700 border-blue-200",
              },
              {
                num: "02",
                title: "Strong Institutional Presence",
                desc: "Strong MAMCET's academic infrastructure, engineering expertise and institutional network.",
                badge: "bg-cyan-50 text-cyan-700 border-cyan-200",
              },
              {
                num: "03",
                title: "Expert Mentor Network",
                desc: "Access industry professionals, domain experts and experienced mentors for strategic business guidance.",
                badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
              },
              {
                num: "04",
                title: "Industry & Ecosystem Linkages",
                desc: "Build connections with industries, investors, startups and research institutions.",
                badge: "bg-amber-50 text-amber-700 border-amber-200",
              },
              {
                num: "05",
                title: "End to End Startup Support",
                desc: "Comprehensive guidance from idea validation to product commercialisation and sustainable business growth.",
                badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
              },
            ].map((st, idx) => (
              <ZoomIn key={st.num} delay={idx * 0.08}>
                <XYZCard depth={12}>
                  <div className="p-5 h-full rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-blue-300 transition-all duration-300">
                    <div>
                      <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${st.badge} inline-block mb-3`}>
                        STRENGTH {st.num}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                        {st.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                </XYZCard>
              </ZoomIn>
            ))}
          </div>
        </div>

        {/* 5 Mission Objectives (M1 to M5) with ZoomIn & XYZCards */}
        <div className="pt-12 border-t border-slate-200">
          <FadeUp className="flex items-center gap-2 mb-8">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              M1 – M5
            </span>
            <h3 className="text-xl font-bold text-slate-900 tracking-wide font-display">
              Official Mission Statements
            </h3>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {FOUNDATION_INFO.mission.map((m, idx) => (
              <ZoomIn key={m.code} delay={idx * 0.07}>
                <XYZCard depth={10}>
                  <div className="p-5 h-full rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between hover:bg-white hover:shadow-xs hover:border-blue-200 transition-all">
                    <div>
                      <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        {m.code}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-3 mb-2">{m.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{m.text}</p>
                    </div>
                  </div>
                </XYZCard>
              </ZoomIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
