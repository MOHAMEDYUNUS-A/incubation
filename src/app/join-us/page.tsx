import React from "react";
import Link from "next/link";
import JoinUsEcosystem from "@/components/sections/JoinUsEcosystem";
import DisruptiveEpicenter from "@/components/sections/DisruptiveEpicenter";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Join Us | Stakeholder Onboarding | MASTeR Incubation Foundation",
  description: "Register as a Startup, Researcher, Student, Industry Partner, Investor, or Mentor at MASTeR Incubation Foundation, MAMCET Trichy.",
};

export default function JoinUsPage() {
  return (
    <div className="pt-28 min-h-screen bg-slate-50">
      {/* Page Hero */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-orange-200">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span>STAKEHOLDER ENGAGEMENT PORTAL</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight font-display text-slate-900">
            Join Our Innovation Ecosystem
          </h1>
          <p className="text-base sm:text-xl text-slate-600 mt-4 leading-relaxed font-normal">
            Whether you are an aspiring student inventor, deep-tech startup, faculty researcher, corporate industry partner, or venture investor, MIF provides tailored collaboration channels to accelerate your impact.
          </p>
        </div>
      </div>

      {/* Main Stakeholder Cards Grid */}
      <JoinUsEcosystem />

      {/* Interactive Personalized Search Widget */}
      <DisruptiveEpicenter />
    </div>
  );
}
