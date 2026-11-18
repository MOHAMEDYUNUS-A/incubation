import React from "react";
import Link from "next/link";
import { FileText, Download, ShieldAlert, Sparkles, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Founder Resources & Grant Guides | MASTeR Incubation Foundation",
  description: "Access pitch deck templates, TANSEED funding guides, patent search methodologies, and startup policy circulars.",
};

const RESOURCES = [
  {
    title: "MIF Standard 10-Slide Pitch Deck Template",
    category: "Pitch & Presentation",
    format: "PPTX / PDF",
    desc: "The standardized structure required for MIF screening and regional investor demo days.",
  },
  {
    title: "StartupTN TANSEED Seed Grant Application Guide",
    category: "Government Schemes",
    format: "PDF Document",
    desc: "Complete checklist for the Tamil Nadu Startup Seed Grant Fund (TANSEED up to ₹10 Lakhs).",
  },
  {
    title: "Provisional Patent Drafting & Prior-Art Search Protocol",
    category: "IPR & Patents",
    format: "PDF Protocol",
    desc: "Guidelines for conducting novelty searches on Indian Patent Office (IPO) and USPTO databases.",
  },
  {
    title: "MIF Incubation Agreement & Resident Founder Code",
    category: "Legal & Compliance",
    format: "PDF Form",
    desc: "Section 8 governance policy, facility usage norms, and intellectual property terms.",
  },
];

export default function ResourcesPage() {
  return (
    <div className="pt-32 pb-24 bg-[#050814] min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            Founder Toolkit
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white mt-2 font-display">
            Incubation Resources & Guidelines
          </h1>
          <p className="text-lg text-slate-300 mt-4 leading-relaxed">
            Essential templates, legal agreements, grant application protocols, and IPR filing guidance curated by the MIF Incubation Cell.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {RESOURCES.map((res, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600/20 text-cyan-300">
                    {res.category}
                  </span>
                  <span className="text-xs text-slate-400">{res.format}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{res.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">{res.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Available to all applicants</span>
                <Link href="/apply">
                  <Button size="sm" variant="outline" className="text-xs border-slate-700 text-slate-200">
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    <span>Request Kit</span>
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Need One-on-One IPR Assistance?</h3>
            <p className="text-xs text-slate-400">
              Schedule a patent consultation with MIF Coordinator Ms. Hemalatha Balakrishnan.
            </p>
          </div>
          <Link href="/contact">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold">
              Contact IPR Cell
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
