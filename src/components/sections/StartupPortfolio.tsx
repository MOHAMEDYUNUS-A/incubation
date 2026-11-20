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
  Layers,
  LayoutGrid,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RevealLeft, RevealRight, FadeUp } from "@/components/animations/LightAnimations";
import { useSiteContent } from "@/context/ContentContext";

const CATEGORY_NAMES: Record<string, string> = {
  ELECTRONICS_IOT_SMART: "Electronics, IoT & Hardware",
  RENEWABLE_ENERGY_CLEAN_TECH: "Renewable Energy & CleanTech",
  ADVANCED_MANUFACTURING: "Advanced Manufacturing & Robotics",
  SUSTAINABLE_INFRASTRUCTURE: "Sustainable AgriTech & Infra",
  AI_DATA_SCIENCE: "Artificial Intelligence & Software",
};

export default function StartupPortfolio() {
  const { content } = useSiteContent();
  const startups =
    content?.startups && content.startups.length > 0
      ? content.startups
      : STARTUP_SHOWCASE;

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [viewGrouped, setViewGrouped] = useState(false);

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

  // Group startups section-wise
  const categoriesPresent = Array.from(
    new Set(startups.map((st: any) => st.category))
  ) as string[];

  return (
    <section id="startups" className="py-16 sm:py-24 bg-white relative border-t border-slate-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <RevealLeft>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/70 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Incubated Startups Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 font-display tracking-tight">
              Incubated Startups & Cohort Ventures
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
              Hover over any startup card to view details · Touch or click to rotate in 3D and access direct contact icons.
            </p>
          </RevealLeft>

          <RevealRight className="flex items-center gap-3">
            {/* View Mode Toggle: Section-Wise vs Grid */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200">
              <button
                onClick={() => setViewGrouped(false)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  !viewGrouped
                    ? "bg-[#0f2c59] text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Card Grid</span>
              </button>
              <button
                onClick={() => setViewGrouped(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewGrouped
                    ? "bg-[#0f2c59] text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Section-Wise</span>
              </button>
            </div>

            <Link href="/apply">
              <Button className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs h-9 px-4 rounded-xl shadow-xs gap-1.5">
                <span>Join Cohort</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </RevealRight>
        </div>

        {/* Filter & Search Bar (Only shown in Grid View) */}
        {!viewGrouped && (
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search startup name, founder, or keyword..."
                className="pl-10 h-10 text-xs sm:text-sm bg-slate-50 border-slate-300 rounded-xl"
              />
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
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
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? "bg-[#0f2c59] text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  {cat === "ALL" ? "All Tracks" : CATEGORY_NAMES[cat] || cat.replace(/_/g, " ")}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ================= VIEW 1: FLAT 3D ROTATION GRID ================= */}
        {!viewGrouped && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filtered.map((st: any, idx: number) => (
              <StartupFlipCard key={st.id} st={st} delay={(idx % 3) * 0.08} />
            ))}
          </div>
        )}

        {/* ================= VIEW 2: SECTION-WISE GROUPED TRACKS ================= */}
        {viewGrouped && (
          <div className="space-y-12">
            {categoriesPresent.map((catKey) => {
              const catStartups = startups.filter((st: any) => st.category === catKey);
              if (catStartups.length === 0) return null;

              return (
                <div key={catKey} className="pt-4 border-t border-slate-200 first:border-0 first:pt-0">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ea580c]" />
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                        {CATEGORY_NAMES[catKey] || catKey.replace(/_/g, " ")}
                      </h3>
                      <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {catStartups.length} {catStartups.length === 1 ? "Startup" : "Startups"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                    {catStartups.map((st: any, idx: number) => (
                      <StartupFlipCard key={st.id} st={st} delay={idx * 0.08} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

// Subcomponent: 3D Interactive Card with Authentic SVG Logo, Hover Details, and Touch-to-Rotate Contact Icons
function StartupFlipCard({ st, delay }: { st: any; delay: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <FadeUp delay={delay}>
      <div className="perspective-1000 w-full h-[400px]">
        {/* Rotating 3D Body */}
        <div
          className={`relative w-full h-full duration-700 preserve-3d transition-transform ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* ================= FRONT FACE: Shows Authentic Logo, Name, Sector + Expands Details on Hover ================= */}
          <div
            onClick={() => setIsFlipped(true)}
            className="group absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-orange-300 p-6 flex flex-col justify-between transition-all duration-300 overflow-hidden cursor-pointer select-none"
          >
            {/* Top Cohort & Stage Strip */}
            <div className="w-full flex items-center justify-between text-xs z-10 shrink-0">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] border border-slate-200/80">
                {st.cohort || "Cohort 2026"}
              </span>
              <Badge variant="cyan" className="text-[10px] font-extrabold uppercase px-2.5 py-0.5">
                {st.stage ? st.stage.replace(/_/g, " ") : "INCUBATED"}
              </Badge>
            </div>

            {/* Center Area: Big Prominent Startup Logo */}
            <div className="flex flex-col items-center justify-center my-auto text-center transition-all duration-300 group-hover:scale-95 shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-blue-50/40 border-2 border-slate-200/90 p-4 flex items-center justify-center shadow-inner mb-3.5 group-hover:border-orange-400 group-hover:shadow-md transition-all duration-300">
                {st.logo ? (
                  <img
                    src={st.logo}
                    alt={`${st.name} logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <Rocket className="w-12 h-12 text-orange-600" />
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight mb-1">
                {st.name}
              </h3>

              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {CATEGORY_NAMES[st.category] || st.category.replace(/_/g, " ")}
              </span>
            </div>

            {/* Details Drawer: Revealed on Hover with Full Description, Founders & Traction */}
            <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-md p-5 sm:p-6 border-t border-slate-200/90 rounded-b-3xl transition-all duration-300 translate-y-[calc(100%-54px)] group-hover:translate-y-0 shadow-lg z-20">
              {/* Peek Header */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#ea580c] flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  <span>Startup Overview</span>
                </span>
                <span className="text-[10px] text-slate-500 font-semibold group-hover:hidden flex items-center gap-1">
                  <span>Hover for details</span>
                  <span className="text-orange-500 font-bold">↑</span>
                </span>
              </div>

              {/* Expanded Details on Hover */}
              <div className="space-y-2 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs text-slate-700 leading-relaxed font-normal line-clamp-2">
                  {st.oneLiner}
                </p>

                <div className="text-[11px] text-slate-600 font-medium flex items-center gap-1.5">
                  <span className="font-bold text-slate-900">Founders:</span>
                  <span className="truncate">{st.founders}</span>
                </div>

                <div className="p-2 rounded-xl bg-orange-50/90 border border-orange-200/80 text-[11px] text-slate-800">
                  <span className="font-bold text-[#ea580c]">Traction:</span> {st.impactMetric}
                </div>

                {st.funding && (
                  <div className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {st.funding}
                  </div>
                )}
              </div>

              {/* Bottom Touch to Rotate Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(true);
                }}
                className="w-full mt-3 py-2 px-3 rounded-xl bg-[#0f2c59] hover:bg-[#ea580c] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Touch / Click to Rotate for Contacts</span>
              </button>
            </div>
          </div>

          {/* ================= BACK FACE (ROTATED 180°): Shows All Contact Icons & Channels ================= */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl bg-gradient-to-br from-[#0a182e] via-[#0f2c59] to-[#06101e] text-white p-6 flex flex-col justify-between shadow-2xl border border-blue-800/60 select-none"
          >
            <div>
              {/* Header: Logo, Name & Flip Back Button */}
              <div className="flex items-center justify-between pb-3 border-b border-white/15 mb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 p-1.5 flex items-center justify-center shrink-0 border border-white/20">
                    {st.logo ? (
                      <img
                        src={st.logo}
                        alt={st.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <Rocket className="w-5 h-5 text-orange-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white font-display leading-tight">
                      {st.name}
                    </h4>
                    <span className="text-[10px] text-slate-300">
                      Official Contact Channels
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsFlipped(false)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors border border-white/15"
                  title="Flip back to overview"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Founders & Funding */}
              <div className="space-y-1.5 mb-4 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                    Founding Team
                  </span>
                  <span className="text-white font-semibold">{st.founders}</span>
                </div>
                {st.funding && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-bold">
                    {st.funding}
                  </span>
                )}
              </div>

              {/* 4 Dedicated Contact Channel Icons */}
              <div className="space-y-2 mb-3">
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block">
                  Direct Contact Icons
                </span>

                <div className="grid grid-cols-4 gap-2">
                  {/* Website Icon */}
                  {st.website ? (
                    <a
                      href={st.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2.5 rounded-xl bg-white/10 hover:bg-[#ea580c] text-white flex flex-col items-center justify-center gap-1 transition-all border border-white/10 hover:border-orange-500 shadow-xs group/icon"
                      title={`Visit ${st.name} Website`}
                    >
                      <Globe className="w-5 h-5 text-orange-300 group-hover/icon:text-white" />
                      <span className="text-[10px] font-bold">Web</span>
                    </a>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-white/5 text-slate-500 flex flex-col items-center justify-center gap-1 border border-white/5 opacity-40">
                      <Globe className="w-5 h-5" />
                      <span className="text-[10px]">Web</span>
                    </div>
                  )}

                  {/* LinkedIn Icon */}
                  {st.linkedin ? (
                    <a
                      href={st.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2.5 rounded-xl bg-[#0077b5]/30 hover:bg-[#0077b5] text-white flex flex-col items-center justify-center gap-1 transition-all border border-blue-400/30 hover:border-blue-400 shadow-xs group/icon"
                      title="LinkedIn Company Page"
                    >
                      <Linkedin className="w-5 h-5 text-blue-300 group-hover/icon:text-white" />
                      <span className="text-[10px] font-bold">LinkedIn</span>
                    </a>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-white/5 text-slate-500 flex flex-col items-center justify-center gap-1 border border-white/5 opacity-40">
                      <Linkedin className="w-5 h-5" />
                      <span className="text-[10px]">LinkedIn</span>
                    </div>
                  )}

                  {/* Email Icon */}
                  {st.email ? (
                    <a
                      href={`mailto:${st.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-600 text-white flex flex-col items-center justify-center gap-1 transition-all border border-amber-400/30 hover:border-amber-400 shadow-xs group/icon"
                      title={`Email: ${st.email}`}
                    >
                      <Mail className="w-5 h-5 text-amber-300 group-hover/icon:text-white" />
                      <span className="text-[10px] font-bold">Email</span>
                    </a>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-white/5 text-slate-500 flex flex-col items-center justify-center gap-1 border border-white/5 opacity-40">
                      <Mail className="w-5 h-5" />
                      <span className="text-[10px]">Email</span>
                    </div>
                  )}

                  {/* Phone Call Icon */}
                  {st.phone ? (
                    <a
                      href={`tel:${st.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-600 text-white flex flex-col items-center justify-center gap-1 transition-all border border-emerald-400/30 hover:border-emerald-400 shadow-xs group/icon"
                      title={`Call: ${st.phone}`}
                    >
                      <Phone className="w-5 h-5 text-emerald-300 group-hover/icon:text-white" />
                      <span className="text-[10px] font-bold">Call</span>
                    </a>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-white/5 text-slate-500 flex flex-col items-center justify-center gap-1 border border-white/5 opacity-40">
                      <Phone className="w-5 h-5" />
                      <span className="text-[10px]">Call</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Direct Connect Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              {st.website && (
                <a
                  href={st.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-full py-2 px-3 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all group/btn"
                >
                  <span>Launch Official Website</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
              )}

              <button
                type="button"
                onClick={() => setIsFlipped(false)}
                className="w-full py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-white/10"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Rotate Back to Details</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}
