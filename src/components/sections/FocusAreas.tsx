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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealLeft, RevealRight, FadeUp } from "@/components/animations/LightAnimations";

interface FocusSector {
  id: string;
  number: string;
  title: string;
  image: string;
  tag: string;
  icon: React.ElementType;
}

const SECTORS: FocusSector[] = [
  {
    id: "ai-ds",
    number: "01",
    title: "AI & Edge Compute",
    image: "/images/focus-areas/ai-edge-compute.jpg",
    tag: "Computer Vision · Edge AI · NLP",
    icon: BrainCircuit,
  },
  {
    id: "iot-embedded",
    number: "02",
    title: "IoT & Telemetry Hardware",
    image: "/images/focus-areas/iot-telemetry.jpg",
    tag: "LoRaWAN Nodes · Custom PCBs · Sensors",
    icon: Radio,
  },
  {
    id: "clean-energy",
    number: "03",
    title: "Renewable Energy & CleanTech",
    image: "/images/focus-areas/renewable-energy-cleantech.jpg",
    tag: "Solar PV Fault AI · Microgrids · Battery",
    icon: Zap,
  },
  {
    id: "advanced-mfg",
    number: "04",
    title: "Robotics & Advanced Mfg",
    image: "/images/focus-areas/robotics-drones.jpg",
    tag: "3D Prototyping · Drones · CNC Tooling",
    icon: Cpu,
  },
  {
    id: "healthcare",
    number: "05",
    title: "Healthcare & MedTech",
    image: "/images/focus-areas/healthcare-medcare.jpg",
    tag: "Optical Biomarkers · Rural Telecare",
    icon: HeartPulse,
  },
  {
    id: "sustainability",
    number: "06",
    title: "AgriTech & Bio-Materials",
    image: "/images/focus-areas/agritech-biomaterial.jpg",
    tag: "Soil Telemetry · Bio-Filters · Water",
    icon: Building2,
  },
  {
    id: "digital-saas",
    number: "07",
    title: "Cloud SaaS & CyberSecurity",
    image: "/images/focus-areas/cloud-saas-cybersecurity.jpg",
    tag: "Enterprise Cloud · FinTech · Security",
    icon: Code2,
  },
];

export default function FocusAreas() {
  return (
    <section id="focus-areas" className="py-16 sm:py-24 bg-slate-50 relative border-t border-slate-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Minimal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <RevealLeft>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 font-display tracking-tight uppercase">
              7 Priority Focus Areas
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-normal">
              Specialized research bays, prototyping equipment, and mentorship tracks on campus.
            </p>
          </RevealLeft>

          <RevealRight>
            <Link href="/focus-areas">
              <Button
                variant="outline"
                className="border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-bold h-9 px-4 gap-1.5"
              >
                <span>View Full Roadmaps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </RevealRight>
        </div>

        {/* 7 Image Cards with Minimal Content (User Request: Image needed + less content) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SECTORS.map((sector, idx) => {
            const Icon = sector.icon;
            return (
              <FadeUp key={sector.id} delay={idx * 0.05}>
                <div className="group h-full rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    {/* Visual Photo Header */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                      <img
                        src={sector.image}
                        alt={sector.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                      {/* Floating Icon Pill */}
                      <div className="absolute top-2.5 left-2.5">
                        <div className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-md text-[#0f2c59] flex items-center justify-center shadow-md">
                          <Icon className="w-4 h-4 text-red-600" />
                        </div>
                      </div>

                      {/* Track Number */}
                      <div className="absolute top-2.5 right-2.5">
                        <span className="px-2 py-0.5 rounded-md bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-mono font-bold">
                          {sector.number}
                        </span>
                      </div>
                    </div>

                    {/* Minimal Content: Title Only */}
                    <div className="p-4 pb-2">
                      <h3 className="text-base font-bold text-slate-900 font-display group-hover:text-blue-700 transition-colors">
                        {sector.title}
                      </h3>
                    </div>
                  </div>

                  {/* Minimal 1-Line Tag */}
                  <div className="p-4 pt-0">
                    <p className="text-[11px] font-medium text-slate-500 pt-2 border-t border-slate-100">
                      {sector.tag}
                    </p>
                  </div>
                </div>
              </FadeUp>
            );
          })}

          {/* 8th Tile: Pitch Your Innovation */}
          <FadeUp delay={0.35}>
            <div className="h-full rounded-2xl bg-gradient-to-br from-[#0f2c59] to-[#071324] text-white p-5 flex flex-col justify-between shadow-md border border-blue-900/60 group">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-red-500 font-bold block mb-2">
                  Track 08 · Open Call
                </span>
                <h3 className="text-base sm:text-lg font-bold font-display text-white mb-2">
                  Building Another Deep-Tech Prototype?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  MIF accepts interdisciplinary innovations spanning mechatronics, biomedical, and aerospace.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 mt-4">
                <Link href="/apply">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-400 transition-colors">
                    <span>Submit Innovation Pitch</span>
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
