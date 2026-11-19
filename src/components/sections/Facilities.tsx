"use client";

import React from "react";
import Link from "next/link";
import { FACILITIES_DATA } from "@/lib/db/mockData";
import { Check, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealLeft, RevealRight, ZoomIn, XYZCard } from "@/components/animations/LightAnimations";

export default function Facilities() {
  return (
    <section id="facilities" className="py-20 sm:py-24 bg-slate-50 relative border-t border-slate-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <RevealLeft>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 font-display tracking-tight">
              World-Class Engineering & Prototyping Facilities
            </h2>
            <p className="text-base sm:text-lg text-slate-700 mt-2 max-w-2xl font-normal">
              Equipped with precision testing benches, rapid 3D fabrication printers, and collaborative ideation pods at MAMCET campus, Siruganur, Trichy.
            </p>
          </RevealLeft>
          <RevealRight>
            <Link href="/facilities">
              <Button variant="outline" className="border-slate-300 hover:bg-white text-slate-800 font-bold text-sm h-11 px-5 gap-2 shadow-xs">
                <span>Explore All Labs</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </RevealRight>
        </div>

        {/* 6 Facility Cards with Alternating Left/Right Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FACILITIES_DATA.map((fac, idx) => {
            const Wrapper = idx % 2 === 0 ? RevealLeft : RevealRight;
            return (
              <Wrapper key={fac.id} delay={(idx % 2) * 0.1}>
                <XYZCard depth={10}>
                  <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between h-full">
                    <div>
                      <div
                        className="h-64 bg-cover bg-center relative transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${fac.image})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="text-xs font-bold px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-blue-900 border border-white shadow-xs">
                            {fac.category}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-5 right-5 text-white">
                          <span className="text-xs text-orange-300 font-semibold uppercase tracking-wider block">Capacity: {fac.capacity}</span>
                          <h3 className="text-2xl sm:text-3xl font-bold font-display mt-0.5">{fac.name}</h3>
                        </div>
                      </div>

                      <div className="p-7">
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 font-normal">
                          {fac.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-7 pb-7 pt-4 border-t border-slate-100 bg-slate-50/50">
                      <div className="grid grid-cols-2 gap-2.5">
                        {fac.specs.map((sp, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span className="truncate">{sp}</span>
                          </div>
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
