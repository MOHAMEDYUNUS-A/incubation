import React from "react";
import Link from "next/link";
import { Download } from "lucide-react";
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
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
            Founder Toolkit
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mt-2 font-display">
            Incubation Resources & Guidelines
          </h1>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed">
            Essential templates, legal agreements, grant application protocols, and IPR filing guidance curated by the MIF Incubation Cell.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {RESOURCES.map((res, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {res.category}
                  </span>
                  <span className="text-xs text-slate-500">{res.format}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{res.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">{res.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Available to all applicants</span>
                <Link href="/apply">
                  <Button size="sm" variant="outline" className="text-xs border-slate-300 text-slate-700 hover:bg-slate-50">
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    <span>Request Kit</span>
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Need One-on-One IPR Assistance?</h3>
            <p className="text-xs text-slate-600">
              Schedule a patent consultation with MIF Coordinator Ms. Hemalatha Balakrishnan.
            </p>
          </div>
          <Link href="/contact">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              Contact IPR Cell
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
