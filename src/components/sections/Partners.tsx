"use client";

import React from "react";
import Image from "next/image";

const PARTNER_LOGOS = [
  {
    name: "MAMCET",
    title: "M.A.M. College of Engineering & Technology",
    src: "/logos/mamcet-logo.png",
  },
  {
    name: "AICTE",
    title: "All India Council for Technical Education",
    src: "/logos/aicte-logo.png",
  },
  {
    name: "IIC",
    title: "Institution's Innovation Council (MoE)",
    src: "/logos/iic-logo.png",
  },
  {
    name: "NBA",
    title: "National Board of Accreditation",
    src: "/logos/nba-logo.png",
  },
  {
    name: "StartupTN",
    title: "Government of Tamil Nadu",
    src: "/logos/startuptn.jpg",
  },
  {
    name: "MASTeR MIF",
    title: "MASTeR Incubation Foundation",
    src: "/logos/master-incubation-logo.png",
  },
];

export default function Partners() {
  return (
    <section className="py-20 bg-[#070c1d] border-t border-slate-800/80 relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            Section 12 — Statutory & Ecosystem Affiliations
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 font-display">
            Institutional Ecosystem Network
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Recognized and accredited under apex national and state innovation frameworks.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {PARTNER_LOGOS.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/95 border border-white shadow-xl flex flex-col items-center text-center justify-between min-h-[140px] hover:scale-105 transition-all duration-300 group"
            >
              <div className="h-14 w-full flex items-center justify-center p-1">
                <img
                  src={item.src}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="pt-2 border-t border-slate-200 w-full">
                <div className="text-xs font-bold text-slate-900 truncate">{item.name}</div>
                <div className="text-[10px] text-slate-500 truncate" title={item.title}>
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
