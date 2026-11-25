"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Users,
  TrendingUp,
  X,
  Bookmark,
  Eye,
  SlidersHorizontal,
  Award,
  Cpu,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
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

const STAGE_OPTIONS = [
  { value: "ALL", label: "All Stages" },
  { value: "IDEATION", label: "Ideation" },
  { value: "PROTOTYPE_MVP", label: "Prototype & MVP" },
  { value: "EARLY_TRACTION", label: "Early Traction" },
  { value: "REVENUE_GROWTH", label: "Growth & Scale" },
];

export default function StartupPortfolio() {
  const { content } = useSiteContent();

  const startups = useMemo(
    () =>
      content?.startups !== undefined && Array.isArray(content.startups)
        ? content.startups
        : STARTUP_SHOWCASE,
    [content?.startups]
  );

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedStage, setSelectedStage] = useState("ALL");
  const [sortBy, setSortBy] = useState<"default" | "az">("default");
  const [onlyShortlisted, setOnlyShortlisted] = useState(false);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);
  const [quickViewStartup, setQuickViewStartup] = useState<any | null>(null);

  // Load shortlisted startups from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mif_shortlisted_startups");
      if (saved) setShortlistedIds(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  const toggleShortlist = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setShortlistedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("mif_shortlisted_startups", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Filtered & sorted ventures
  const filtered = useMemo(() => {
    const list = startups.filter((st: any) => {
      if (!st || !st.name) return false;
      const s = search.toLowerCase();
      const matchesSearch =
        !s ||
        (st.name && st.name.toLowerCase().includes(s)) ||
        (st.oneLiner && st.oneLiner.toLowerCase().includes(s)) ||
        (st.founders && st.founders.toLowerCase().includes(s)) ||
        (Array.isArray(st.tags) &&
          st.tags.some((t: string) => typeof t === "string" && t.toLowerCase().includes(s)));

      const matchesCategory =
        selectedCategory === "ALL" || st.category === selectedCategory;

      const matchesStage =
        selectedStage === "ALL" ||
        (st.stage && st.stage.toUpperCase() === selectedStage);

      const matchesShortlist = !onlyShortlisted || shortlistedIds.includes(st.id);

      return matchesSearch && matchesCategory && matchesStage && matchesShortlist;
    });

    if (sortBy === "az") {
      return [...list].sort((a: any, b: any) => a.name.localeCompare(b.name));
    }
    return list;
  }, [startups, search, selectedCategory, selectedStage, onlyShortlisted, shortlistedIds, sortBy]);

  // Dynamic Portfolio Metrics
  const uniqueTracksCount = useMemo(
    () => new Set(startups.map((st: any) => st.category).filter(Boolean)).size,
    [startups]
  );
  const fundedCount = useMemo(
    () => startups.filter((st: any) => Boolean(st.funding)).length,
    [startups]
  );

  return (
    <section id="startups" className="py-10 sm:py-16 lg:py-20 bg-slate-50/60 relative border-t border-slate-200/80">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Clean Editorial Header (No unwanted pill badge or Grid/Track toggle) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-5">
          <RevealLeft className="space-y-2 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 font-display tracking-tight leading-tight">
              Incubated Startups &amp; Deep-Tech Ventures
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Explore hardware prototypes, AI platforms, clean-tech systems, and student-led enterprises nurtured at MASTeR Incubation Foundation.
            </p>
          </RevealLeft>

          <RevealRight className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Link
              href="/mentors"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:border-[#772b38]/40 hover:text-[#772b38] text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
            >
              <Users className="w-3.5 h-3.5 text-[#772b38]" />
              <span>Our Mentors</span>
            </Link>

            <Link href="/apply">
              <Button className="bg-[#772b38] hover:bg-[#5e212b] text-white font-bold text-xs h-9 px-4 rounded-xl shadow-xs gap-1.5">
                <span>Apply for Incubation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </RevealRight>
        </div>

        {/* Live Portfolio Telemetry Strip */}
        <FadeUp className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 flex items-center gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0f2c59] flex items-center justify-center shrink-0">
              <Rocket className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-slate-900 font-display leading-none">
                {startups.length}
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">Active Ventures</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 flex items-center gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#772b38] flex items-center justify-center shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-slate-900 font-display leading-none">
                {uniqueTracksCount}
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">Tech Sectors</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 flex items-center gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-slate-900 font-display leading-none">
                {fundedCount > 0 ? fundedCount : "5+"}
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">Grant &amp; Seed Backed</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 flex items-center gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-slate-900 font-display leading-none">
                {shortlistedIds.length}
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">Shortlisted</div>
            </div>
          </div>
        </FadeUp>

        {/* Advanced Filter, Stage & Search Bar */}
        <FadeUp className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs mb-8 space-y-3">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
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

            {/* Stage Filter + Sort + Shortlist Toggle */}
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5 sm:pb-0 scrollbar-none shrink-0">
              <div className="relative flex items-center">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  aria-label="Filter by venture stage"
                  className="h-10 pl-8 pr-7 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0f2c59]"
                >
                  {STAGE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => setSortBy((prev) => (prev === "default" ? "az" : "default"))}
                className={`h-10 px-3 rounded-xl border text-xs font-semibold whitespace-nowrap transition-colors ${
                  sortBy === "az"
                    ? "bg-[#0f2c59] text-white border-[#0f2c59]"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {sortBy === "az" ? "Sorted: A–Z" : "Sort: A–Z"}
              </button>

              <button
                type="button"
                onClick={() => setOnlyShortlisted((prev) => !prev)}
                className={`h-10 px-3 rounded-xl border text-xs font-semibold whitespace-nowrap inline-flex items-center gap-1.5 transition-colors ${
                  onlyShortlisted
                    ? "bg-[#772b38] text-white border-[#772b38]"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Saved ({shortlistedIds.length})</span>
              </button>
            </div>
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
                No incubated ventures match your current filters. Try clearing your search or stage filter.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("ALL");
                  setSelectedStage("ALL");
                  setOnlyShortlisted(false);
                }}
                className="mt-4 text-xs h-9 px-4 rounded-xl border-slate-300 font-semibold"
              >
                Reset All Filters
              </Button>
            </div>
          </ZoomIn>
        )}

        {/* DESKTOP GRID VIEW */}
        {filtered.length > 0 && (
          <>
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((st: any, idx: number) => (
                <StartupFlipCard
                  key={st.id}
                  st={st}
                  delay={(idx % 3) * 0.06}
                  isShortlisted={shortlistedIds.includes(st.id)}
                  onToggleShortlist={(e) => toggleShortlist(st.id, e)}
                  onQuickView={() => setQuickViewStartup(st)}
                />
              ))}
            </div>

            {/* MOBILE RESPONSIVE VIEW */}
            <div className="grid md:hidden grid-cols-1 gap-4">
              {filtered.map((st: any, idx: number) => (
                <StartupMobileCard
                  key={st.id}
                  st={st}
                  delay={(idx % 4) * 0.04}
                  isShortlisted={shortlistedIds.includes(st.id)}
                  onToggleShortlist={(e) => toggleShortlist(st.id, e)}
                  onQuickView={() => setQuickViewStartup(st)}
                />
              ))}
            </div>
          </>
        )}

        {/* Bottom Venture Acceleration CTA Banner */}
        <FadeUp className="mt-14">
          <div className="rounded-3xl bg-gradient-to-br from-[#0a182e] via-[#0f2c59] to-[#173970] text-white p-6 sm:p-10 shadow-xl border border-blue-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-300">
                <Sparkles className="w-4 h-4" />
                <span>Build Your Deep-Tech Venture at MAMCET</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight">
                Have a Prototype or Research Innovation Ready to Scale?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Gain access to 4,000+ sq. ft. of prototyping bays, IP &amp; patent filing mentorship, and direct TANSEED / MSME seed grant evaluation.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link href="/facilities">
                <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/25 text-xs h-10 px-4 rounded-xl font-semibold">
                  Explore Labs
                </Button>
              </Link>
              <Link href="/apply">
                <Button className="bg-[#772b38] hover:bg-[#5e212b] text-white text-xs h-10 px-5 rounded-xl font-bold shadow-md gap-1.5">
                  <span>Submit Pitch</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* ========================================================================= */}
      {/* VENTURE SPOTLIGHT QUICK-VIEW MODAL                                        */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {quickViewStartup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickViewStartup(null)}
            className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 p-2.5 flex items-center justify-center shrink-0">
                    {quickViewStartup.logo ? (
                      <img
                        src={quickViewStartup.logo}
                        alt={quickViewStartup.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <Rocket className="w-7 h-7 text-[#772b38]" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-black text-slate-900 font-display leading-tight">
                      {quickViewStartup.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      {CATEGORY_NAMES[quickViewStartup.category] || quickViewStartup.category?.replace(/_/g, " ")}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setQuickViewStartup(null)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                {quickViewStartup.oneLiner}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Founding Team
                  </span>
                  <span className="font-bold text-slate-900">{quickViewStartup.founders}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Maturity Stage
                  </span>
                  <span className="font-bold text-[#0f2c59]">
                    {quickViewStartup.stage ? quickViewStartup.stage.replace(/_/g, " ") : "Incubated"}
                  </span>
                </div>
              </div>

              {quickViewStartup.impactMetric && (
                <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/70 text-xs text-slate-800 flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-[#772b38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#772b38] block text-[11px] uppercase tracking-wider">
                      Traction &amp; Impact
                    </strong>
                    <span>{quickViewStartup.impactMetric}</span>
                  </div>
                </div>
              )}

              {quickViewStartup.funding && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{quickViewStartup.funding}</span>
                </div>
              )}

              {Array.isArray(quickViewStartup.tags) && quickViewStartup.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {quickViewStartup.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  {quickViewStartup.website && (
                    <a
                      href={quickViewStartup.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-rose-50 text-[#772b38] hover:bg-rose-100 flex items-center justify-center border border-rose-200"
                      title="Website"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                  {quickViewStartup.linkedin && (
                    <a
                      href={quickViewStartup.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center justify-center border border-blue-200"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {quickViewStartup.email && (
                    <a
                      href={`mailto:${quickViewStartup.email}`}
                      className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 flex items-center justify-center border border-amber-200"
                      title="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                  {quickViewStartup.phone && (
                    <a
                      href={`tel:${quickViewStartup.phone}`}
                      className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 flex items-center justify-center border border-emerald-200"
                      title="Call"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <Link
                  href={`/startups/${quickViewStartup.slug || quickViewStartup.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="px-4 py-2 rounded-xl bg-[#0f2c59] hover:bg-[#1a3e78] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Full Profile &amp; Passport</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// =========================================================================
// COMPONENT 1: DESKTOP 3D FLIP CARD (CLEAN, NO TOP BADGE CLUTTER)
// =========================================================================
function StartupFlipCard({
  st,
  delay,
  isShortlisted,
  onToggleShortlist,
  onQuickView,
}: {
  st: any;
  delay: number;
  isShortlisted: boolean;
  onToggleShortlist: (e: React.MouseEvent) => void;
  onQuickView: () => void;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const slug = st.slug || st.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <FadeUp delay={delay}>
      <div className="perspective-1000 w-full h-[380px]">
        <div
          className={`relative w-full h-full duration-700 preserve-3d transition-transform ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* FRONT FACE */}
          <div className="group absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#0f2c59]/40 p-6 flex flex-col justify-between transition-all duration-300">
            {/* Subtle Top Action Row (Quick View & Shortlist Bookmark only — zero badge clutter) */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={onQuickView}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-[#0f2c59] transition-colors"
                title="Quick View Venture"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Quick View</span>
              </button>

              <button
                type="button"
                onClick={onToggleShortlist}
                aria-label={isShortlisted ? "Remove from saved" : "Save startup"}
                className={`p-1.5 rounded-lg transition-colors ${
                  isShortlisted
                    ? "bg-rose-50 text-[#772b38]"
                    : "text-slate-400 hover:text-[#772b38] hover:bg-slate-100"
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isShortlisted ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Center Brand Identity & Summary */}
            <div className="flex flex-col items-center text-center my-auto py-1">
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

              <h3 className="text-lg sm:text-xl font-black text-slate-900 font-display tracking-tight leading-snug mb-1 line-clamp-1">
                {st.name}
              </h3>

              <span className="text-[11px] font-semibold text-slate-400 mb-2.5 line-clamp-1">
                {CATEGORY_NAMES[st.category] || st.category?.replace(/_/g, " ")}
              </span>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3 max-w-xs">
                {st.oneLiner}
              </p>

              {/* Founders & Traction */}
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
// COMPONENT 2: MOBILE TOUCH-OPTIMIZED CARD WITH CLEAN HEADER & DRAWER
// =========================================================================
function StartupMobileCard({
  st,
  delay,
  isShortlisted,
  onToggleShortlist,
  onQuickView,
}: {
  st: any;
  delay: number;
  isShortlisted: boolean;
  onToggleShortlist: (e: React.MouseEvent) => void;
  onQuickView: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const slug = st.slug || st.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <FadeUp delay={delay}>
      <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-4 flex flex-col gap-3">
        {/* Clean Header: Logo + Name + Sector + Bookmark */}
        <div className="flex items-start gap-3">
          <div
            onClick={onQuickView}
            className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 p-2 flex items-center justify-center shrink-0 cursor-pointer"
          >
            {st.logo ? (
              <img src={st.logo} alt={`${st.name} logo`} className="max-h-full max-w-full object-contain" />
            ) : (
              <Rocket className="w-6 h-6 text-[#772b38]" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3
                onClick={onQuickView}
                className="text-base font-black text-slate-900 font-display leading-tight truncate cursor-pointer"
              >
                {st.name}
              </h3>
              <button
                type="button"
                onClick={onToggleShortlist}
                aria-label={isShortlisted ? "Remove from saved" : "Save startup"}
                className={`p-1 rounded-lg shrink-0 ${
                  isShortlisted ? "text-[#772b38] bg-rose-50" : "text-slate-400"
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isShortlisted ? "fill-current" : ""}`} />
              </button>
            </div>
            <span className="text-[11px] font-medium text-slate-400 block truncate">
              {CATEGORY_NAMES[st.category] || st.category?.replace(/_/g, " ")}
            </span>
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
