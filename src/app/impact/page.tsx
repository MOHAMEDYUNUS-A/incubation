import React from "react";
import Link from "next/link";
import EcosystemImpact from "@/components/sections/EcosystemImpact";
import Partners from "@/components/sections/Partners";
import { ArrowRight, Download, Award, ShieldCheck, Building2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Ecosystem Impact | MASTeR Incubation Foundation (MIF)",
  description: "Explore the verified milestones, startups onboarded, industry MoUs, and MSME grants at MASTeR Incubation Foundation, MAMCET Trichy.",
};

export default function ImpactPage() {
  return (
    <div className="pt-28 bg-white min-h-screen">
      {/* Page Hero */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-orange-200">
            <Award className="w-4 h-4 text-orange-600" />
            <span>MEASURABLE TRANSLATION FOOTPRINT</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight font-display text-slate-900">
            Ecosystem Impact & Network Reach
          </h1>
          <p className="text-base sm:text-xl text-slate-600 mt-4 leading-relaxed font-normal">
            From official ministerial inauguration with 25 startups onboarded to strategic deep-tech alliances with IITMIC and MSME Host Institution recognition, MIF is driving regional entrepreneurial transformation.
          </p>
        </div>
      </div>

      {/* Main Impact Graphic Component */}
      <EcosystemImpact />

      {/* Institutional Affiliations Component */}
      <Partners />

      {/* Bottom Action Section */}
      <div className="py-20 bg-slate-50 border-t border-slate-200 text-center">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display mb-4">
            Be Part of Our Growing Milestones
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-8">
            Apply today to access incubation workspaces, ₹15 Lakhs MSME Idea Hackathon seed grants, and direct mentor connections.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/apply">
              <Button className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold text-xs sm:text-sm h-12 px-8 rounded-xl shadow-md gap-2">
                <span>Apply For Incubation</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-slate-300 text-slate-800 font-bold text-xs sm:text-sm h-12 px-6 rounded-xl hover:bg-white shadow-2xs">
                Contact Management
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
