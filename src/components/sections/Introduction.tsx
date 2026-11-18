"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
            A Catalyst for Regional Innovation & Technology Commercialisation
          </h2>
        </div>

        {/* 2-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: About Text & Foundation History */}
          <div className="lg:col-span-7 space-y-6 text-slate-300">
            <p className="text-lg leading-relaxed text-slate-200">
              <strong className="text-white">{FOUNDATION_INFO.name} ({FOUNDATION_INFO.acronym})</strong> is {FOUNDATION_INFO.legalType.toLowerCase()} associated with <strong className="text-white">{FOUNDATION_INFO.institution}</strong> and recognized as a <strong className="text-cyan-400">{FOUNDATION_INFO.recognition}</strong>.
            </p>

            <p className="leading-relaxed text-slate-400">
              MIF focuses on cultivating an entrepreneurial mindset among students, researchers, and regional founders by transforming engineering knowledge, innovative ideas, and research outcomes into practical solutions, products, and scalable startups.
            </p>

            {/* Vision Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/40 to-slate-900/60 border border-blue-800/40 shadow-xl">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm tracking-wide uppercase mb-2">
                <Compass className="w-4 h-4" />
                <span>Our Vision</span>
              </div>
              <p className="text-white text-base leading-relaxed italic">
                &ldquo;{FOUNDATION_INFO.vision}&rdquo;
              </p>
            </div>

            <div className="pt-2">
              <Link href="/about">
                <Button variant="outline" className="border-slate-700 hover:bg-slate-800 text-white gap-2">
                  <span>Learn More About Governance & Ecosystem</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Institutional Strengths Card Grid */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="text-xs font-bold text-blue-400 mb-1">STRENGTH 01</div>
              <h4 className="text-white font-bold text-base mb-1">StartupTN Recognised Pre-Incubation Centre</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct institutional linkage to Tamil Nadu&apos;s government startup ecosystem, grant schemes, and state-wide entrepreneurial initiatives.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="text-xs font-bold text-cyan-400 mb-1">STRENGTH 02</div>
              <h4 className="text-white font-bold text-base mb-1">Strong Institutional Infrastructure</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Backed by MAMCET&apos;s comprehensive academic engineering laboratories, maker facilities, and expert faculty mentors.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="text-xs font-bold text-emerald-400 mb-1">STRENGTH 03</div>
              <h4 className="text-white font-bold text-base mb-1">End-to-End Startup Support Pipeline</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Structured journey from problem discovery and benchtop prototyping to provisional patent filing and seed investment readiness.
              </p>
            </div>
          </div>
        </div>

        {/* 5 Mission Pillars (M1 - M5) */}
        <div className="mt-20 pt-12 border-t border-slate-800">
          <div className="flex items-center gap-2 mb-8">
            <Target className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-bold text-white tracking-wide">
              Strategic Mission Pillars (M1 – M5)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {FOUNDATION_INFO.mission.map((m) => (
              <div
                key={m.code}
                className="p-5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex flex-col justify-between hover:border-blue-500/40 transition-colors"
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
