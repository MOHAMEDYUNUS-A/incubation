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
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 font-display tracking-tight">
              Incubated Startups & Cohort Ventures
            </h2>
            <p className="text-base sm:text-lg text-slate-700 mt-2 font-normal">
              Transforming academic engineering prototypes into market-tested ventures.
            </p>
          </RevealLeft>
          <RevealRight>
            <Link href="/startups">
              <Button variant="outline" className="border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-sm h-11 px-5 gap-2 shadow-xs">
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
              className="pl-10 h-11 text-sm bg-slate-50 border-slate-300 rounded-xl"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {["ALL", "ELECTRONICS_IOT_SMART", "RENEWABLE_ENERGY_CLEAN_TECH", "ADVANCED_MANUFACTURING", "SUSTAINABLE_INFRASTRUCTURE"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${selectedCategory === cat
                  ? "bg-[#0f2c59] text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                  }`}
              >
                {cat === "ALL" ? "All Tracks" : cat.replace(/_/g, " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Clean Startup Cards with Alternating Left/Right Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((st, idx) => {
            const Wrapper = idx % 2 === 0 ? RevealLeft : RevealRight;
            return (
              <Wrapper key={st.id} delay={(idx % 3) * 0.08}>
                <XYZCard depth={10}>
                  <div className="h-full p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold shadow-2xs">
                          <Rocket className="w-6 h-6 text-blue-600" />
                        </div>
                        <Badge variant="cyan" className="text-xs font-bold px-2.5 py-0.5">
                          {st.stage.replace(/_/g, " ")}
                        </Badge>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-1 font-display">{st.name}</h3>
                      <div className="text-xs text-slate-500 mb-3 font-medium">
                        Founders: <span className="text-slate-800 font-semibold">{st.founders}</span> · {st.cohort}
                      </div>

                      <p className="text-sm text-slate-700 leading-relaxed mb-4 font-normal">
                        {st.oneLiner}
                      </p>
                    </div>

                    <div>
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 mb-4">
                        <strong className="text-blue-700 font-bold">Traction:</strong> {st.impactMetric}
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {st.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium border border-slate-200/60"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </XYZCard>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
