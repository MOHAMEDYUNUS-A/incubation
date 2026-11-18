"use client";

import React, { useState } from "react";
import Link from "next/link";
import { STARTUP_SHOWCASE } from "@/lib/db/mockData";
import { Search, Rocket, Filter, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function StartupPortfolio() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filtered = STARTUP_SHOWCASE.filter((st) => {
    const matchesSearch =
      st.name.toLowerCase().includes(search.toLowerCase()) ||
      st.oneLiner.toLowerCase().includes(search.toLowerCase()) ||
      st.founders.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "ALL" || st.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="startups" className="py-24 bg-[#070c1d] relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
              Section 06 — Innovation Portfolio
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 font-display">
              Incubated Startups & Cohort Ventures
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Transforming academic engineering prototypes into market-tested ventures.
            </p>
          </div>
          <Link href="/startups">
            <Button variant="outline" className="border-slate-700 hover:bg-slate-800 text-white gap-2">
              <span>View Full Directory</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search startup, founder name, or technology keyword..."
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {["ALL", "ELECTRONICS_IOT_SMART", "RENEWABLE_ENERGY_CLEAN_TECH", "ADVANCED_MANUFACTURING", "SUSTAINABLE_INFRASTRUCTURE"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {cat === "ALL" ? "All Tracks" : cat.replace(/_/g, " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Startup Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((st) => (
            <div
              key={st.id}
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-cyan-300 font-bold">
                    <Rocket className="w-5 h-5 text-cyan-400" />
                  </div>
                  <Badge variant="cyan" className="text-[10px]">
                    {st.stage.replace(/_/g, " ")}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{st.name}</h3>
                <div className="text-[11px] text-slate-400 mb-3">
                  Founders: <span className="text-slate-300">{st.founders}</span> · {st.cohort}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {st.oneLiner}
                </p>
              </div>

              <div>
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-[11px] text-cyan-300 mb-4">
                  <strong>Traction:</strong> {st.impactMetric}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {st.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
