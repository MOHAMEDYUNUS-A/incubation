"use client";

import React from "react";
import Link from "next/link";
import { FOCUS_AREAS } from "@/lib/db/mockData";
import {
  BrainCircuit,
  Zap,
  Code2,
  Cpu,
  Radio,
  Building2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp, RevealLeft, RevealRight, XYZCard } from "@/components/animations/LightAnimations";

const ICON_MAP: Record<string, React.ElementType> = {
  BrainCircuit,
  Zap,
  Code2,
  Cpu,
  Radio,
  Building2,
  Sparkles,
};

const TRACK_IMAGES: Record<string, string> = {
  "ai-ds": "/images/focus-areas/ai-edge-compute.jpg",
  "clean-energy": "/images/focus-areas/renewable-energy-cleantech.jpg",
  "digital-tech": "/images/focus-areas/cloud-saas-cybersecurity.jpg",
  "adv-mfg": "/images/focus-areas/robotics-drones.jpg",
  "iot-smart": "/images/focus-areas/iot-telemetry.jpg",
  "sustainable-infra": "/images/focus-areas/agritech-biomaterial.jpg",
  "other-eng": "/images/focus-areas/healthcare-medcare.jpg",
};

export default function FocusAreasPage() {
  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-slate-50 min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <FadeUp className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#772b38]/10 text-[#772b38] text-xs font-bold uppercase tracking-wider mb-3 border border-[#772b38]/20 shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-[#772b38]" />
            <span>DOMAIN ARCHITECTURE & SPECIALIZATIONS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight font-display">
            7 Core Engineering Focus Areas
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Our specialized infrastructure, rapid prototyping maker laboratories, and faculty mentors are purpose-built to accelerate engineering innovations across these 7 strategic domains.
          </p>
        </FadeUp>

        <div className="space-y-8">
          {FOCUS_AREAS.map((area, idx) => {
            const Icon = ICON_MAP[area.iconName] || Sparkles;
            const trackImage = TRACK_IMAGES[area.id] || "/images/incubation/incubation-workspace.jpeg";
            const Wrapper = idx % 2 === 0 ? RevealLeft : RevealRight;

            return (
              <Wrapper key={area.id} delay={0.05 * idx}>
                <XYZCard depth={6}>
                  <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#772b38]/40 transition-all duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      <div className="lg:col-span-8 space-y-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-[#772b38]/10 border border-[#772b38]/20 flex items-center justify-center text-[#772b38] shadow-xs">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-xs font-mono text-[#772b38] font-bold tracking-wider">
                              TRACK 0{idx + 1}
                            </span>
                            <h2 className="text-2xl font-bold text-slate-900 font-display">{area.title}</h2>
                          </div>
                        </div>

                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                          {area.description}
                        </p>

                        <div className="pt-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3 font-mono">
                            Specialized Sub-Tracks & Focus Domains:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {area.subtracks.map((sub, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2.5 text-xs text-slate-700 p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-rose-50/50 hover:border-[#772b38]/20 transition-all"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span className="font-medium">{sub}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-4 flex flex-col justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200/90 h-full group/card">
                        <div>
                          <div className="rounded-xl overflow-hidden mb-4 border border-slate-200 aspect-video bg-slate-100 relative">
                            <img
                              src={trackImage}
                              alt={area.title}
                              className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-950/75 backdrop-blur-xs text-[10px] font-mono font-bold text-white border border-white/20">
                              Track 0{idx + 1}
                            </div>
                          </div>
                          <span className="text-[10px] font-mono font-bold text-[#772b38] uppercase tracking-wider">
                            Dedicated Mentorship Bay
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 mt-1 mb-2 font-display">
                            Faculty Guidance & Maker Labs
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed mb-4 font-normal">
                            Access specialized departmental research labs, high-precision test benches, and provisional patent assistance.
                          </p>
                        </div>

                        <Link href={`/apply?track=${area.categoryKey}`}>
                          <Button className="w-full bg-[#772b38] hover:bg-[#5e212b] text-white font-bold text-xs h-10 gap-1.5 shadow-sm">
                            <span>Apply in this Track</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </XYZCard>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
}
