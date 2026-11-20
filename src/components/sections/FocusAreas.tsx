"use client";

import React from "react";
import Link from "next/link";
import {
  BrainCircuit,
  Zap,
  Code2,
  Cpu,
  Radio,
  Building2,
  HeartPulse,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealLeft, RevealRight, FadeUp } from "@/components/animations/LightAnimations";

interface MinimalFocusTrack {
  id: string;
  number: string;
  title: string;
  focusKey: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
}

const FOCUS_TRACKS: MinimalFocusTrack[] = [
  {
    id: "ai-ds",
    number: "01",
    title: "Artificial Intelligence & Edge Compute",
    focusKey: "Computer Vision · Edge AI · NLP Models",
    icon: BrainCircuit,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "hover:border-blue-300",
  },
  {
    id: "iot-embedded",
    number: "02",
    title: "IoT, Sensors & Telemetry Hardware",
    focusKey: "LoRaWAN Nodes · Custom PCBs · Embedded RTOS",
    icon: Radio,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "hover:border-indigo-300",
  },
  {
    id: "clean-energy",
    number: "03",
    title: "Renewable Energy & CleanTech",
    focusKey: "Solar PV Fault AI · Microgrids · Battery Tech",
    icon: Zap,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "hover:border-amber-300",
  },
  {
    id: "advanced-mfg",
    number: "04",
    title: "Advanced Manufacturing & Robotics",
    focusKey: "3D Rapid Prototyping · Drones · CNC Tooling",
    icon: Cpu,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "hover:border-purple-300",
  },
  {
    id: "healthcare",
    number: "05",
    title: "Healthcare Devices & Telecare",
    focusKey: "Optical Biomarkers · Rural Diagnostics · MedTech",
    icon: HeartPulse,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    borderColor: "hover:border-rose-300",
  },
  {
    id: "sustainability",
    number: "06",
    title: "Sustainable AgriTech & Bio-Materials",
    focusKey: "Soil Hydration Telemetry · Bio-Filtration · CleanWater",
    icon: Building2,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "hover:border-emerald-300",
  },
  {
    id: "digital-saas",
    number: "07",
    title: "Digital Software & Cloud Platforms",
    focusKey: "Enterprise Cloud SaaS · CyberSecurity · FinTech",
    icon: Code2,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "hover:border-teal-300",
  },
];

export default function FocusAreas() {
  return (
    <section id="focus-areas" className="py-16 sm:py-20 bg-slate-50 relative border-t border-slate-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Minimal, Sleek Header (Zero Clutter) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <RevealLeft>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Core Thrust Areas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 font-display tracking-tight">
              7 Priority Focus Areas
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
              Specialized research labs and seed grant tracks available at MAMCET campus.
            </p>
          </RevealLeft>

          <RevealRight>
            <Link href="/focus-areas">
              <Button
                variant="outline"
                className="border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-bold h-9 px-4 gap-1.5"
              >
                <span>Full Domain Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </RevealRight>
        </div>

        {/* Minimal Sector Tiles Grid (Redesigned: Clean, Uncluttered & Modern) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {FOCUS_TRACKS.map((track, idx) => {
            const Icon = track.icon;
            return (
              <FadeUp key={track.id} delay={idx * 0.05}>
                <div
                  className={`h-full p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md ${track.borderColor} transition-all duration-300 flex flex-col justify-between group`}
                >
                  <div>
                    {/* Top Icon and Track Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-11 h-11 rounded-xl ${track.bgColor} ${track.color} flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {track.number}
                      </span>
                    </div>

                    {/* Sector Title */}
                    <h3 className="text-base font-bold text-slate-900 font-display mb-2 group-hover:text-blue-700 transition-colors">
                      {track.title}
                    </h3>
                  </div>

                  {/* Concise Key Focus */}
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-[11px] font-medium text-slate-500 leading-snug">
                      {track.focusKey}
                    </p>
                  </div>
                </div>
              </FadeUp>
            );
          })}

          {/* 8th Card: Apply for Incubation in Any Track */}
          <FadeUp delay={0.35}>
            <div className="h-full p-5 rounded-2xl bg-gradient-to-br from-[#0f2c59] to-[#0a182e] text-white shadow-md flex flex-col justify-between border border-blue-900/60">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-orange-400 font-bold block mb-2">
                  Open Track
                </span>
                <h3 className="text-base font-bold font-display text-white mb-2">
                  Have an Innovation in Another Field?
                </h3>
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                  MIF also welcomes cross-disciplinary engineering and patentable prototypes.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 mt-3">
                <Link href="/apply">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors">
                    <span>Submit Your Pitch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
