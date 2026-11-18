"use client";

import React from "react";
import Image from "next/image";
import { FOUNDATION_INFO } from "@/lib/db/mockData";
import { ShieldCheck, Compass, Target, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Introduction() {
  return (
    <section id="about" className="py-24 bg-[#070c1d] relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/15 border border-blue-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Section 02 — Institutional Profile</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
            About MASTeR Incubation Foundation (MIF)
          </h2>
          <p className="text-sm text-cyan-400 font-semibold mt-2">
            M.A.M. College of Engineering and Technology (MAMCET) · StartupTN Pre-Incubation Centre
          </p>
        </div>

        {/* 2-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Column: Authentic Brochure About Us Copy & Vision */}
          <div className="lg:col-span-7 space-y-6 text-slate-300">
            <p className="text-base sm:text-lg leading-relaxed text-slate-200">
              <strong className="text-white">MASTeR Incubation Foundation (MIF)</strong> is a Section 8 not-for-profit organisation associated with <strong className="text-white">M.A.M. College of Engineering and Technology (MAMCET)</strong>, and recognised as a <strong className="text-cyan-400">StartupTN Pre-Incubation Centre</strong>.
            </p>

            <p className="leading-relaxed text-slate-300 text-sm sm:text-base">
              MIF focuses on cultivating an entrepreneurial mindset among students and entrepreneurs by transforming engineering knowledge, innovative ideas and research outcomes into practical solutions, products and viable startups. Through structured mentoring, incubation support, industry collaborations, technology development and access to relevant funding opportunities, MIF strives to nurture startups and promote sustainable, socially responsible entrepreneurship.
            </p>

            {/* Vision Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/50 to-slate-900/70 border border-blue-800/40 shadow-xl">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm tracking-wide uppercase mb-2">
                <Compass className="w-4 h-4" />
                <span>Our Vision</span>
              </div>
              <p className="text-white text-base leading-relaxed italic">
                &ldquo;To be a leading institutional hub for innovation and entrepreneurship, transforming engineering knowledge and creativity into pioneering solutions, products and successful startups that shape a brighter future.&rdquo;
              </p>
            </div>

            <div className="pt-2">
              <Link href="/about">
                <Button variant="outline" className="border-slate-700 hover:bg-slate-800 text-white gap-2">
                  <span>Explore Governance & Leadership</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Real Campus & Co-working Photos */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-slate-700 overflow-hidden shadow-2xl relative group">
              <img
                src="/images/mamcet-campus.png"
                alt="MAMCET Campus Trichy"
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-xs font-bold text-white block">MAMCET Engineering Campus</span>
                <span className="text-[11px] text-slate-300">Trichy - Chennai Trunk Road, Siruganur</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700 overflow-hidden shadow-2xl relative group">
              <img
                src="/images/coworking-space.jpg"
                alt="MIF Co-working and Maker Space"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-xs font-bold text-cyan-300 block">MIF Incubation & Co-working Space</span>
                <span className="text-[11px] text-slate-300">Dedicated Resident Startup Pods & Maker Bench</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Strengths from Official Brochure */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-8">
            <Target className="w-5 h-5 text-cyan-400" />
            <h3 className="text-2xl font-bold text-white tracking-wide font-display">
              Our 5 Core Strengths (From Official Ecosystem Charter)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                num: "01",
                title: "StartupTN Recognised Pre-Incubation Centre",
                desc: "Direct linkage to Tamil Nadu's startup ecosystem and entrepreneurial opportunities.",
                color: "text-blue-400",
              },
              {
                num: "02",
                title: "Strong Institutional Presence",
                desc: "Strong MAMCET's academic infrastructure, engineering expertise and institutional network.",
                color: "text-cyan-400",
              },
              {
                num: "03",
                title: "Expert Mentor Network",
                desc: "Access industry professionals, domain experts and experienced mentors for strategic business guidance.",
                color: "text-emerald-400",
              },
              {
                num: "04",
                title: "Industry & Ecosystem Linkages",
                desc: "Build connections with industries, investors, startups and research institutions.",
                color: "text-amber-400",
              },
              {
                num: "05",
                title: "End to End Startup Support",
                desc: "Comprehensive guidance from idea validation to product commercialisation and sustainable business growth.",
                color: "text-purple-400",
              },
            ].map((st) => (
              <div
                key={st.num}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <span className={`text-xs font-mono font-extrabold ${st.color} block mb-2`}>
                    STRENGTH {st.num}
                  </span>
                  <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                    {st.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Mission Objectives (M1 to M5) from LinkedIn Statement PDF */}
        <div className="pt-12 border-t border-slate-800">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-600/20 text-cyan-300 border border-blue-500/30">
              M1 – M5
            </span>
            <h3 className="text-xl font-bold text-white tracking-wide">
              Official Mission Statements
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {FOUNDATION_INFO.mission.map((m) => (
              <div
                key={m.code}
                className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 flex flex-col justify-between hover:border-blue-500/40 transition-colors"
              >
                <div>
                  <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-blue-600/20 text-cyan-300 border border-blue-500/30">
                    {m.code}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-3 mb-2">{m.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
