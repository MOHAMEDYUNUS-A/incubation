"use client";

import React, { useState } from "react";
import Link from "next/link";
import { STARTUP_SHOWCASE } from "@/lib/db/mockData";
import {
  Search,
  Rocket,
  ArrowUpRight,
  Globe,
  Linkedin,
  Mail,
  Phone,
  Coins,
  ExternalLink,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RevealLeft, RevealRight } from "@/components/animations/LightAnimations";
import { useSiteContent } from "@/context/ContentContext";

export default function StartupPortfolio() {
  const { content } = useSiteContent();
  const startups =
    content?.startups && content.startups.length > 0
      ? content.startups
      : STARTUP_SHOWCASE;

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filtered = startups.filter((st: any) => {
    const matchesSearch =
      st.name.toLowerCase().includes(search.toLowerCase()) ||
      st.oneLiner.toLowerCase().includes(search.toLowerCase()) ||
      st.founders.toLowerCase().includes(search.toLowerCase()) ||
      (st.tags &&
        st.tags.some((t: string) => t.toLowerCase().includes(search.toLowerCase())));

    const matchesCategory =
      selectedCategory === "ALL" || st.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="startups" className="py-20 sm:py-24 bg-slate-50 relative border-t border-slate-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <RevealLeft>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/70 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Interactive 3D Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-display tracking-tight">
              Incubated Startups & Cohorts
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
              Hover over any startup card to rotate in 3D and reveal live website links, LinkedIn, traction, and founder contacts.
            </p>
          </RevealLeft>
          <RevealRight>
            <Link href="/apply">
              <Button className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm h-11 px-6 rounded-xl shadow-md gap-2">
                <span>Join Next Cohort</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </RevealRight>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3.5 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search startup name, founder, or keyword..."
              className="pl-10 h-11 text-sm bg-white border-slate-300 rounded-xl shadow-2xs"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {[
              "ALL",
              "ELECTRONICS_IOT_SMART",
              "RENEWABLE_ENERGY_CLEAN_TECH",
              "ADVANCED_MANUFACTURING",
              "SUSTAINABLE_INFRASTRUCTURE",
              "AI_DATA_SCIENCE",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-[#0f2c59] text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat === "ALL" ? "All Tracks" : cat.replace(/_/g, " ")}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Flipping Card Grid: Default shows ONLY logo & name, hover rotates to reveal links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((st: any, idx: number) => {
            const Wrapper = idx % 2 === 0 ? RevealLeft : RevealRight;
            return (
              <Wrapper key={st.id} delay={(idx % 3) * 0.08}>
                {/* 3D Perspective Container */}
                <div className="perspective-1000 group w-full h-[340px]">
                  {/* Rotating Card Body */}
                  <div className="relative w-full h-full duration-700 preserve-3d group-hover:rotate-y-180 transition-transform">
                    {/* ================= FRONT FACE (DEFAULT): Shows ONLY Logo, Name, Track & Cohort ================= */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-7 flex flex-col items-center justify-between text-center select-none">
                      {/* Top Track & Cohort Strip */}
                      <div className="w-full flex items-center justify-between text-xs">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[11px] border border-slate-200/70">
                          {st.cohort || "Cohort 2026"}
                        </span>
                        <Badge variant="cyan" className="text-[10px] font-extrabold uppercase px-2 py-0.5">
                          {st.stage ? st.stage.replace(/_/g, " ") : "INCUBATED"}
                        </Badge>
                      </div>

                      {/* Center: Startup Logo & Name Only */}
                      <div className="my-auto flex flex-col items-center">
                        {st.logo ? (
                          <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-200 p-2 flex items-center justify-center shadow-inner mb-3">
                            <img
                              src={st.logo}
                              alt={st.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-50 to-orange-50 border-2 border-orange-200/60 flex items-center justify-center text-[#0f2c59] shadow-inner mb-3 group-hover:scale-105 transition-transform">
                            <Rocket className="w-10 h-10 text-orange-600" />
                          </div>
                        )}

                        <h3 className="text-2xl font-black text-slate-900 font-display tracking-tight mb-1">
                          {st.name}
                        </h3>

                        <span className="text-xs font-semibold text-slate-500 max-w-[240px] truncate">
                          {st.category ? st.category.replace(/_/g, " ") : "Engineering Venture"}
                        </span>
                      </div>

                      {/* Bottom Prompt: Hover to Rotate */}
                      <div className="w-full pt-3 border-t border-slate-100 flex items-center justify-center">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-[#ea580c] bg-orange-50 border border-orange-200/70 px-3.5 py-1.5 rounded-full shadow-2xs">
                          <RotateCcw className="w-3 h-3 text-orange-600" />
                          <span>Hover to View Links & Details</span>
                        </span>
                      </div>
                    </div>

                    {/* ================= BACK FACE (ON HOVER): Shows Links, LinkedIn, Traction & Founder Info ================= */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl bg-gradient-to-br from-[#0a182e] via-[#0f2c59] to-[#071324] text-white p-6 flex flex-col justify-between shadow-2xl border border-blue-900/60">
                      <div>
                        {/* Header: Name and Stage */}
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-lg font-black text-white font-display">
                              {st.name}
                            </h4>
                            <p className="text-xs text-slate-300">
                              Founders: <span className="text-white font-semibold">{st.founders}</span>
                            </p>
                          </div>
                          {st.funding && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold shrink-0">
                              {st.funding}
                            </span>
                          )}
                        </div>

                        {/* One-Liner Description */}
                        <p className="text-xs text-slate-200 leading-relaxed mb-3 line-clamp-3">
                          {st.oneLiner}
                        </p>

                        {/* Traction Metric */}
                        <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 text-xs text-slate-200 mb-3">
                          <span className="text-orange-400 font-bold">Traction:</span> {st.impactMetric}
                        </div>
                      </div>

                      {/* Interactive Links Strip */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          {st.website && (
                            <a
                              href={st.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold transition-all shadow-md group/btn"
                            >
                              <span>Website</span>
                              <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                            </a>
                          )}

                          {st.linkedin && (
                            <a
                              href={st.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-xl bg-blue-600/40 hover:bg-blue-600 text-white border border-blue-400/40 transition-colors"
                              title="LinkedIn Profile"
                            >
                              <Linkedin className="w-4 h-4" />
                            </a>
                          )}

                          {st.email && (
                            <a
                              href={`mailto:${st.email}`}
                              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/20 transition-colors"
                              title={`Email: ${st.email}`}
                            >
                              <Mail className="w-4 h-4" />
                            </a>
                          )}

                          {st.phone && (
                            <a
                              href={`tel:${st.phone}`}
                              className="p-2 rounded-xl bg-emerald-600/40 hover:bg-emerald-600 text-white border border-emerald-400/40 transition-colors"
                              title={`Call: ${st.phone}`}
                            >
                              <Phone className="w-4 h-4" />
                            </a>
                          )}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {st.tags &&
                            st.tags.slice(0, 3).map((tag: string, i: number) => (
                              <span
                                key={i}
                                className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-medium"
                              >
                                #{tag}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
