"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { STARTUP_SHOWCASE } from "@/lib/db/mockData";
import {
  Search,
  Rocket,
  ArrowUpRight,
  Globe,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  RotateCcw,
  Layers,
  LayoutGrid,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Users,
  TrendingUp,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  RevealLeft,
  RevealRight,
  FadeUp,
  ZoomIn,
} from "@/components/animations/LightAnimations";
import { useSiteContent } from "@/context/ContentContext";

const CATEGORY_NAMES: Record<string, string> = {
  ELECTRONICS_IOT_SMART: "Electronics, IoT & Hardware",
  RENEWABLE_ENERGY_CLEAN_TECH: "Renewable Energy & CleanTech",
  ADVANCED_MANUFACTURING: "Advanced Manufacturing & Robotics",
  SUSTAINABLE_INFRASTRUCTURE: "Sustainable AgriTech & Infra",
  AI_DATA_SCIENCE: "Artificial Intelligence & Software",
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  ELECTRONICS_IOT_SMART: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
    border: "border-blue-200/80",
  },
  RENEWABLE_ENERGY_CLEAN_TECH: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    border: "border-emerald-200/80",
  },
  ADVANCED_MANUFACTURING: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
    border: "border-amber-200/80",
  },
  SUSTAINABLE_INFRASTRUCTURE: {
    bg: "bg-teal-50",
    text: "text-teal-700",
    dot: "bg-teal-500",
    border: "border-teal-200/80",
  },
  AI_DATA_SCIENCE: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    dot: "bg-purple-500",
    border: "border-purple-200/80",
  },
};

export default function StartupPortfolio() {
  const { content } = useSiteContent();

  const startups =
    content?.startups !== undefined && Array.isArray(content.startups)
      ? content.startups
      : STARTUP_SHOWCASE;

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [viewGrouped, setViewGrouped] = useState(false);

  const filtered = startups.filter((st: any) => {
    if (!st || !st.name) return false;
    const s = search.toLowerCase();
    const matchesSearch =
      (st.name && st.name.toLowerCase().includes(s)) ||
      (st.oneLiner && st.oneLiner.toLowerCase().includes(s)) ||
      (st.founders && st.founders.toLowerCase().includes(s)) ||
      (Array.isArray(st.tags) &&
        st.tags.some((t: string) => typeof t === "string" && t.toLowerCase().includes(s)));

    const matchesCategory =
      selectedCategory === "ALL" || st.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categoriesPresent = Array.from(
    new Set(startups.map((st: any) => st.category))
  ) as string[];

  return (
    <section id="startups" className="py-10 sm:py-16 lg:py-20 bg-slate-50/60 relative border-t border-slate-200/80">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-5">
          <RevealLeft className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-bold uppercase tracking-wider text-[#772b38] shadow-2xs">
              <Rocket className="w-3.5 h-3.5" />
              MIF Venture Portfolio
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 font-display tracking-tight leading-tight">
              Incubated Startups &amp; Deep-Tech Ventures
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Explore hardware prototypes, AI platforms, clean-tech systems, and student-led enterprises nurtured at MASTeR Incubation Foundation.
            </p>
          </RevealLeft>

          <RevealRight className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* View Mode Toggle (Accessible on both Mobile and Desktop) */}
            <div className="inline-flex items-center p-1 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <button
                type="button"
                onClick={() => setViewGrouped(false)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-150 ${
                  !viewGrouped
                    ? "bg-[#0f2c59] text-white shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900 font-medium"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
                <span>Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewGrouped(true)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-150 ${
                  viewGrouped
                    ? "bg-[#0f2c59] text-white shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900 font-medium"
                }`}
              >
                <Layers className="w-3.5 h-3.5 shrink-0" />
                <span>By Track</span>
              </button>
            </div>

            <Link
              href="/mentors"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:border-[#772b38]/40 hover:text-[#772b38] text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
            >
              <Users className="w-3.5 h-3.5 text-[#772b38]" />
              <span>Mentors</span>
            </Link>

            <Link href="/apply">
              <Button className="bg-[#772b38] hover:bg-[#5e212b] text-white font-bold text-xs h-9 px-4 rounded-xl shadow-xs gap-1.5">
                <span>Apply for Incubation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </RevealRight>
        </div>

        {/* Filter & Search Bar */}
        <FadeUp className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs mb-8 space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search startup name, founder, or technology..."
              className="pl-10 pr-9 h-10 text-xs sm:text-sm bg-slate-50/70 border-slate-200 rounded-xl focus-visible:ring-[#0f2c59]"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Horizontal Scrollable Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              "ALL",
              "ELECTRONICS_IOT_SMART",
              "RENEWABLE_ENERGY_CLEAN_TECH",
              "ADVANCED_MANUFACTURING",
              "SUSTAINABLE_INFRASTRUCTURE",
              "AI_DATA_SCIENCE",
            ].map((cat) => {
              const count =
                cat === "ALL"
                  ? startups.length
                  : startups.filter((st: any) => st.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                    selectedCategory === cat
                      ? "bg-[#0f2c59] text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200/80"
                  }`}
                >
                  <span>{cat === "ALL" ? "All Sectors" : CATEGORY_NAMES[cat] || cat.replace(/_/g, " ")}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      selectedCategory === cat ? "bg-white/20 text-white" : "bg-white text-slate-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </FadeUp>

        {/* Empty State */}
        {filtered.length === 0 && (
          <ZoomIn>
            <div className="text-center py-14 px-5 rounded-3xl bg-white border border-dashed border-slate-300 max-w-md mx-auto my-8 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-[#772b38]/10 text-[#772b38] flex items-center justify-center mx-auto mb-3">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">No Startups Found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                No incubated ventures match your current search criteria. Try clearing your filters.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("ALL");
                }}
                className="mt-4 text-xs h-9 px-4 rounded-xl border-slate-300 font-semibold"
              >
                Reset Filters
              </Button>
            </div>
          </ZoomIn>
        )}

        {/* VIEW 1: FLAT GRID VIEW */}
        {!viewGrouped && filtered.length > 0 && (
          <>
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((st: any, idx: number) => (
                <StartupFlipCard key={st.id} st={st} delay={(idx % 3) * 0.06} />
              ))}
            </div>

            <div className="grid md:hidden grid-cols-1 gap-4">
              {filtered.map((st: any, idx: number) => (
                <StartupMobileCard key={st.id} st={st} delay={(idx % 4) * 0.04} />
              ))}
            </div>
          </>
        )}

        {/* VIEW 2: SECTION-WISE GROUPED TRACKS */}
        {viewGrouped && filtered.length > 0 && (
          <div className="space-y-10">
            {categoriesPresent.map((catKey) => {
              const catStartups = filtered.filter((st: any) => st.category === catKey);
              if (catStartups.length === 0) return null;
              const catStyle = CATEGORY_COLORS[catKey] || {
                bg: "bg-blue-50",
                text: "text-blue-700",
                dot: "bg-blue-500",
                border: "border-blue-200",
              };

              return (
                <div key={catKey} className="pt-6 border-t border-slate-200 first:border-0 first:pt-0">
                  <RevealLeft className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${catStyle.dot}`} />
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                        {CATEGORY_NAMES[catKey] || catKey.replace(/_/g, " ")}
                      </h2>
                      <span className="text-xs font-mono font-bold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                        {catStartups.length}
                      </span>
                    </div>
                  </RevealLeft>

                  <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {catStartups.map((st: any, idx: number) => (
                      <StartupFlipCard key={st.id} st={st} delay={(idx % 3) * 0.06} />
                    ))}
                  </div>

                  <div className="grid md:hidden grid-cols-1 gap-4">
                    {catStartups.map((st: any, idx: number) => (
                      <StartupMobileCard key={st.id} st={st} delay={(idx % 4) * 0.04} />
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

// =========================================================================
// COMPONENT 1: DESKTOP 3D FLIP CARD (CLEAN EDITORIAL DESIGN)
// =========================================================================
function StartupFlipCard({ st, delay }: { st: any; delay: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const catColor = CATEGORY_COLORS[st.category] || {
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
    border: "border-blue-200/80",
  };
  const slug = st.slug || st.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <FadeUp delay={delay}>
      <div className="perspective-1000 w-full h-[390px]">
        <div
          className={`relative w-full h-full duration-700 preserve-3d transition-transform ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* FRONT FACE */}
          <div className="group absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#0f2c59]/40 hover:-translate-y-1 p-6 flex flex-col justify-between transition-all duration-300">
            {/* Top Sector & Stage Strip */}
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${catColor.bg} ${catColor.text} border ${catColor.border} text-[10px] font-bold truncate max-w-[180px]`}>
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${catColor.dot}`} />
                <span className="truncate">{CATEGORY_NAMES[st.category] || st.category?.replace(/_/g, " ")}</span>
              </span>
              <Badge variant="cyan" className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 shrink-0">
                {st.stage ? st.stage.replace(/_/g, " ") : "INCUBATED"}
              </Badge>
            </div>

            {/* Center Brand Identity & Summary */}
            <div className="flex flex-col items-center text-center my-auto py-2">
              <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-200/80 p-3 flex items-center justify-center shadow-inner mb-3.5 group-hover:scale-105 group-hover:border-[#772b38]/40 transition-all duration-300">
                {st.logo ? (
                  <img
                    src={st.logo}
                    alt={`${st.name} logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <Rocket className="w-9 h-9 text-[#772b38]" />
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900 font-display tracking-tight leading-snug mb-1.5 line-clamp-1">
                {st.name}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3 max-w-xs">
                {st.oneLiner}
              </p>

              {/* Founders & Traction Pill */}
              <div className="w-full space-y-1.5 text-[11px]">
                <div className="text-slate-500 truncate">
                  <span className="font-semibold text-slate-800">Founders:</span> {st.founders}
                </div>
                {st.impactMetric && (
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50/80 border border-rose-200/70 text-[#772b38] font-semibold max-w-full truncate">
                    <TrendingUp className="w-3 h-3 shrink-0" />
                    <span className="truncate">{st.impactMetric}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
              <Link
                href={`/startups/${slug}`}
                className="py-2 px-3 rounded-xl bg-[#0f2c59] hover:bg-[#1a3e78] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Profile</span>
              </Link>

              <button
                type="button"
                onClick={() => setIsFlipped(true)}
                className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-[#772b38] text-slate-800 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Contacts</span>
              </button>
            </div>
          </div>

          {/* BACK FACE (DIRECT CONTACTS) */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl bg-gradient-to-br from-[#0a182e] via-[#0f2c59] to-[#06101e] text-white p-6 flex flex-col justify-between shadow-2xl border border-blue-800/60">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/15 mb-4">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-white/10 p-1.5 flex items-center justify-center shrink-0 border border-white/20">
                    {st.logo ? (
                      <img src={st.logo} alt={st.name} className="max-h-full max-w-full object-contain" />
                    ) : (
                      <Rocket className="w-5 h-5 text-rose-400" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white font-display truncate">{st.name}</h4>
                    <span className="text-[10px] text-slate-300">Direct Contact Channels</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsFlipped(false)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors border border-white/15 shrink-0"
                  aria-label="Flip back"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5 mb-5 text-xs">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                  Founding Team
                </span>
                <p className="text-white font-semibold leading-snug">{st.founders}</p>
                {st.funding && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-bold mt-1">
                    {st.funding}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-4 gap-2">
                <ContactTile href={st.website} icon={Globe} label="Web" external color="hover:bg-[#772b38]" />
                <ContactTile href={st.linkedin} icon={Linkedin} label="LinkedIn" external color="hover:bg-[#0077b5]" />
                <ContactTile href={st.email ? `mailto:${st.email}` : undefined} icon={Mail} label="Email" color="hover:bg-amber-600" />
                <ContactTile href={st.phone ? `tel:${st.phone}` : undefined} icon={Phone} label="Call" color="hover:bg-emerald-600" />
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-white/10">
              {st.website && (
                <a
                  href={st.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-[#772b38] hover:bg-[#5e212b] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all"
                >
                  <span>Visit Official Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                type="button"
                onClick={() => setIsFlipped(false)}
                className="w-full py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-white/10"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Back to Overview</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

function ContactTile({
  href,
  icon: Icon,
  label,
  external,
  color,
}: {
  href?: string;
  icon: React.ElementType;
  label: string;
  external?: boolean;
  color: string;
}) {
  if (!href) {
    return (
      <div className="p-2.5 rounded-xl bg-white/5 text-slate-500 flex flex-col items-center justify-center gap-1 border border-white/5 opacity-40">
        <Icon className="w-4 h-4" />
        <span className="text-[10px]">{label}</span>
      </div>
    );
  }
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`p-2.5 rounded-xl bg-white/10 ${color} text-white flex flex-col items-center justify-center gap-1 transition-all border border-white/10 shadow-xs`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-[10px] font-bold">{label}</span>
    </a>
  );
}

// =========================================================================
// COMPONENT 2: MOBILE TOUCH-OPTIMIZED CARD WITH SMOOTH ANIMATED DRAWER
// =========================================================================
function StartupMobileCard({ st, delay }: { st: any; delay: number }) {
  const [expanded, setExpanded] = useState(false);
  const catColor = CATEGORY_COLORS[st.category] || {
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
    border: "border-blue-200/80",
  };
  const slug = st.slug || st.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <FadeUp delay={delay}>
      <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-4 flex flex-col gap-3">
        {/* Header: Logo + Name + Stage + Category */}
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 p-2 flex items-center justify-center shrink-0">
            {st.logo ? (
              <img src={st.logo} alt={`${st.name} logo`} className="max-h-full max-w-full object-contain" />
            ) : (
              <Rocket className="w-6 h-6 text-[#772b38]" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${catColor.dot}`} />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide truncate">
                  {CATEGORY_NAMES[st.category] || st.category?.replace(/_/g, " ")}
                </span>
              </div>
              <Badge variant="cyan" className="text-[9px] font-extrabold uppercase px-2 py-0.5 shrink-0">
                {st.stage ? st.stage.replace(/_/g, " ") : "INCUBATED"}
              </Badge>
            </div>

            <h3 className="text-base font-black text-slate-900 font-display leading-tight truncate">
              {st.name}
            </h3>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              <span className="font-semibold text-slate-700">Founders:</span> {st.founders}
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed">{st.oneLiner}</p>

        {/* Smooth Expandable Details */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                {st.impactMetric && (
                  <div className="text-[11px] text-slate-700">
                    <strong className="text-[#772b38]">Traction:</strong> {st.impactMetric}
                  </div>
                )}
                {st.funding && (
                  <div className="text-[11px] text-slate-700">
                    <strong className="text-emerald-700">Funding:</strong> {st.funding}
                  </div>
                )}
                {st.tags && st.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {st.tags.map((t: string) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
                <Link
                  href={`/startups/${slug}`}
                  className="w-full py-2 px-3 rounded-xl bg-[#0f2c59] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>View Profile &amp; Passport</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Ribbon */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
          <div className="flex items-center gap-1.5">
            {st.website && (
              <a
                href={st.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-rose-50 hover:bg-rose-100 text-[#772b38] flex items-center justify-center border border-rose-200 transition-colors"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
            {st.linkedin && (
              <a
                href={st.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center justify-center border border-blue-200 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {st.email && (
              <a
                href={`mailto:${st.email}`}
                className="w-9 h-9 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 flex items-center justify-center border border-amber-200 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
            {st.phone && (
              <a
                href={`tel:${st.phone}`}
                className="w-9 h-9 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-200 transition-colors"
                aria-label="Call"
              >
                <Phone className="w-4 h-4" />
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            <span>{expanded ? "Less" : "Details"}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </FadeUp>
  );
}
