"use client";

import React from "react";
import { RevealLeft, ZoomIn, XYZCard } from "@/components/animations/LightAnimations";

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
    <section className="py-20 bg-white border-t border-slate-200 relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <RevealLeft className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Institutional Ecosystem Network
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Recognized and accredited under apex national and state innovation frameworks.
          </p>
        </RevealLeft>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {PARTNER_LOGOS.map((item, idx) => (
            <ZoomIn key={idx} delay={idx * 0.06}>
              <XYZCard depth={8}>
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col items-center text-center justify-between min-h-[140px] hover:shadow-md hover:border-blue-300 transition-all duration-300 group">
                  <div className="h-14 w-full flex items-center justify-center p-1">
                    <img
                      src={item.src}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="pt-2 border-t border-slate-100 w-full">
                    <div className="text-xs font-bold text-slate-900 truncate">{item.name}</div>
                    <div className="text-[10px] text-slate-500 truncate" title={item.title}>
                      {item.title}
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
