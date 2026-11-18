"use client";

import React, { useState } from "react";
import Link from "next/link";
import { STARTUP_SHOWCASE } from "@/lib/db/mockData";
import { Search, Rocket, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RevealLeft, RevealRight, ZoomIn, XYZCard } from "@/components/animations/LightAnimations";

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
    <section id="startups" className="py-20 sm:py-24 bg-white relative border-t border-slate-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <RevealLeft>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
              Section 06 — Innovation Portfolio
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-2 font-display">
              Incubated Startups & Cohort Ventures
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Transforming academic engineering prototypes into market-tested ventures.
            </p>
          </RevealLeft>
          <RevealRight>
            <Link href="/startups">
              <Button variant="outline" className="border-slate-300 hover:bg-slate-50 text-slate-800 gap-2 shadow-xs">
                <span>View Full Directory</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </RevealRight>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3.5 mb-8">
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
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {cat === "ALL" ? "All Tracks" : cat.replace(/_/g, " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Clean Startup Cards with ZoomIn & XYZCards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((st, idx) => (
            <ZoomIn key={st.id} delay={idx * 0.07}>
              <XYZCard depth={10}>
                <div className="h-full p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
                        <Rocket className="w-5 h-5 text-blue-600" />
                      </div>
                      <Badge variant="cyan" className="text-[10px]">
                        {st.stage.replace(/_/g, " ")}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-1">{st.name}</h3>
                    <div className="text-[11px] text-slate-500 mb-3 font-medium">
                      Founders: <span className="text-slate-800">{st.founders}</span> · {st.cohort}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {st.oneLiner}
                    </p>
                  </div>

                  <div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-800 mb-4">
                      <strong className="text-blue-700">Traction:</strong> {st.impactMetric}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {st.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </XYZCard>
            </ZoomIn>
          ))}
        </div>
      </div>
    </section>
  );
}
