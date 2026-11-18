"use client";

import React from "react";
import Link from "next/link";
import { FACILITIES_DATA } from "@/lib/db/mockData";
import { Check, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Facilities() {
  return (
    <section id="facilities" className="py-24 bg-[#050814] relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
              Section 07 — Campus Infrastructure
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 font-display">
              World-Class Engineering & Prototyping Facilities
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Equipped with precision testing benches, rapid 3D fabrication printers, and collaborative ideation pods at MAMCET campus, Siruganur, Trichy.
            </p>
          </div>
          <Link href="/facilities">
            <Button variant="outline" className="border-slate-700 hover:bg-slate-800 text-white gap-2">
              <span>Explore All Labs</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FACILITIES_DATA.map((fac) => (
            <div
              key={fac.id}
              className="rounded-3xl border border-slate-800 bg-slate-900/40 overflow-hidden hover:border-slate-700 transition-all duration-300 group"
            >
              <div
                className="h-56 bg-cover bg-center relative transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${fac.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-cyan-300 border border-slate-700">
                    {fac.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs text-slate-300">Capacity: {fac.capacity}</span>
                  <h3 className="text-2xl font-bold text-white mt-0.5">{fac.name}</h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {fac.description}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-800/80">
                  {fac.specs.map((sp, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-400">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{sp}</span>
                    </div>
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
