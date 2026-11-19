"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BrainCircuit,
  Zap,
  Code2,
  Cpu,
  Radio,
  Building2,
  HeartPulse,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealLeft, RevealRight, ZoomIn, XYZCard } from "@/components/animations/LightAnimations";

interface VisualFocusArea {
  id: string;
  title: string;
  oneLiner: string;
  icon: React.ElementType;
  badge: string;
  image: string;
  tags: string[];
}

const VISUAL_FOCUS_AREAS: VisualFocusArea[] = [
  {
    id: "ai-ds",
    title: "Artificial Intelligence & Edge Compute",
    oneLiner: "Applied computer vision, predictive analytics, and edge inference engines.",
    icon: BrainCircuit,
    badge: "Core Track 01",
    image: "/images/incubation/img-23.jpeg",
    tags: ["Computer Vision", "Edge AI", "NLP"],
  },
  {
    id: "iot-embedded",
    title: "IoT, Sensors & Telemetry Hardware",
    oneLiner: "Benchtop circuit fabrication, LoRa telemetry, and custom sensor nodes.",
    icon: Radio,
    badge: "Core Track 02",
    image: "/images/incubation/img-54.jpeg",
    tags: ["LoRaWAN", "Custom PCBs", "Sensors"],
  },
  {
    id: "clean-energy",
    title: "Renewable Energy & Clean Technologies",
    oneLiner: "Solar-thermal optimization, battery management, and smart microgrids.",
    icon: Zap,
    badge: "Core Track 03",
    image: "/images/incubation/img-21.jpeg",
    tags: ["Battery Thermal", "Solar IoT", "EV Charging"],
  },
  {
    id: "advanced-mfg",
    title: "Advanced Manufacturing & Robotics",
    oneLiner: "Precision additive 3D fabrication, autonomous quadcopters, and CNC tooling.",
    icon: Cpu,
    badge: "Core Track 04",
    image: "/images/incubation/image43.jpeg",
    tags: ["3D Printing", "Robotics", "Drones"],
  },
  {
    id: "healthcare",
    title: "Healthcare Devices & Telecare",
    oneLiner: "Non-invasive biomarker sensors, optical transit devices, and rural diagnostics.",
    icon: HeartPulse,
    badge: "Core Track 05",
    image: "/images/incubation/img-32.jpeg",
    tags: ["Point-of-Care", "Diagnostics", "Bio-Sensors"],
  },
  {
    id: "sustainability",
    title: "Sustainable Infrastructure & Agritech",
    oneLiner: "Precision agricultural monitoring, activated bio-filters, and clean water systems.",
    icon: Building2,
    badge: "Core Track 06",
    image: "/images/incubation/img-33.jpeg",
    tags: ["Soil Telemetry", "Bio-Materials", "CleanWater"],
  },
  {
    id: "digital-saas",
    title: "Digital Software & Cloud Platforms",
    oneLiner: "Enterprise cloud platforms, cybersecurity architectures, and logistics SaaS.",
    icon: Code2,
    badge: "Core Track 07",
    image: "/images/incubation/incubation-workspace.jpeg",
    tags: ["Cloud-Native", "Cybersecurity", "Fintech"],
  },
];

export default function FocusAreas() {
  const [activeArea, setActiveArea] = useState<string | null>(null);

  return (
    <section id="focus-areas" className="py-20 sm:py-28 bg-slate-50 relative border-t border-slate-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <RevealLeft className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Technology Thrust Sectors</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 font-display tracking-tight">
              Priority Focus Areas
            </h2>
            <p className="text-base sm:text-lg text-slate-700 mt-2 font-normal leading-relaxed">
              Designed around MAMCET&apos;s interdisciplinary research laboratories and Tamil Nadu&apos;s strategic industrial growth sectors.
            </p>
          </RevealLeft>
          <RevealRight>
            <Link href="/focus-areas">
              <Button variant="outline" className="border-slate-300 hover:bg-white text-slate-800 font-bold text-sm h-11 px-5 gap-2 shadow-xs">
                <span>View Domain Roadmaps</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </RevealRight>
        </div>

        {/* Visual Animated Cards Grid (Images, Badges, Light Animations - No Walls of Text) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VISUAL_FOCUS_AREAS.map((area, idx) => {
            const Icon = area.icon;
            const isHovered = activeArea === area.id;
            const Wrapper = idx % 2 === 0 ? RevealLeft : RevealRight;

            return (
              <Wrapper key={area.id} delay={(idx % 3) * 0.08}>
                <XYZCard depth={10}>
                  <div
                    onMouseEnter={() => setActiveArea(area.id)}
                    onMouseLeave={() => setActiveArea(null)}
                    className="group relative h-full rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Visual Header Image Banner */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                        <img
                          src={area.image}
                          alt={area.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                        {/* Floating Icon Pill */}
                        <div className="absolute top-3 left-3">
                          <div className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md border border-white text-blue-600 flex items-center justify-center shadow-md">
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>

                        {/* Top Track Badge */}
                        <div className="absolute top-3 right-3">
                          <span className="px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-mono font-bold">
                            {area.badge}
                          </span>
                        </div>
                      </div>

                      {/* Content Card Body */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 font-display group-hover:text-blue-700 transition-colors">
                          {area.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                          {area.oneLiner}
                        </p>
                      </div>
                    </div>

                    {/* Tags Strip */}
                    <div className="p-6 pt-0">
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                        {area.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-50 text-slate-700 border border-slate-200/80 font-medium"
                          >
                            {tag}
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
