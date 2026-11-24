"use client";

import React from "react";
import Link from "next/link";
import { Download, Sparkles, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp, XYZCard } from "@/components/animations/LightAnimations";

const RESOURCES = [
  {
    title: "MIF Standard 10-Slide Pitch Deck Template",
    category: "Pitch & Presentation",
    format: "PPTX / PDF",
    desc: "The standardized structure required for MIF screening, angel syndicate pitches, and regional investor demo days.",
  },
  {
    title: "StartupTN TANSEED Seed Grant Application Guide",
    category: "Government Schemes",
    format: "PDF Document",
    desc: "Complete checklist for the Tamil Nadu Startup Seed Grant Fund (TANSEED up to ₹10 Lakhs non-dilutive grant).",
  },
  {
    title: "Provisional Patent Drafting & Prior-Art Search Protocol",
    category: "IPR & Patents",
    format: "PDF Protocol",
    desc: "Guidelines for conducting novelty searches on Indian Patent Office (IPO) and USPTO databases before filing.",
  },
  {
    title: "MIF Incubation Agreement & Resident Founder Code",
    category: "Legal & Compliance",
    format: "PDF Form",
    desc: "Section 8 governance policy, prototyping facility usage norms, and intellectual property protection terms.",
  },
];

export default function ResourcesPage() {
  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-slate-50 min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <FadeUp className="max-w-3xl mb-16">
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight font-display">
            Incubation Resources & Guidelines
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Essential templates, legal agreements, grant application protocols, and IPR filing guidance curated by the MIF Incubation Cell for student and regional founders.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {RESOURCES.map((res, idx) => (
            <FadeUp key={idx} delay={0.08 * idx}>
              <XYZCard depth={6}>
                <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#772b38]/40 transition-all duration-300 flex flex-col justify-between h-full group">
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#772b38]/10 text-[#772b38] border border-[#772b38]/20">
                        {res.category}
                      </span>
                      <span className="text-xs font-medium text-slate-500 font-mono">{res.format}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 font-display group-hover:text-[#0f2c59] transition-colors">
                      {res.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                      {res.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Available to all applicants</span>
                    <Link href="/apply">
                      <Button size="sm" variant="outline" className="text-xs border-slate-300 text-slate-800 hover:bg-[#772b38] hover:text-white hover:border-[#772b38] font-bold transition-all shadow-2xs gap-1.5 rounded-xl">
                        <Download className="w-3.5 h-3.5" />
                        <span>Request Kit</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </XYZCard>
            </FadeUp>
          ))}
        </div>

        <FadeUp>
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">Need One-on-One IPR & Patent Assistance?</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal">
                Schedule a patent prior-art consultation with MIF Academic Coordinator Dr. Hemalatha Balakrishnan.
              </p>
            </div>
            <Link href="/contact" className="shrink-0">
              <Button className="bg-[#772b38] hover:bg-[#5e212b] text-white font-bold text-xs sm:text-sm h-11 px-6 rounded-xl shadow-md gap-2 ring-1 ring-white/20">
                <span>Contact IPR Cell</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
