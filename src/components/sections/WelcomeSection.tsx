"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  Sparkles,
  ArrowRight,
  Cpu,
  Coins,
  FileCheck2,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealLeft, RevealRight } from "@/components/animations/LightAnimations";

export default function WelcomeSection() {
  return (
    <section className="py-20 sm:py-28 bg-white relative border-b border-slate-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Subtle Institutional Accreditation Strip */}
        <div className="flex justify-center mb-14">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-2.5 rounded-full bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
              Institutional Ecosystem:
            </span>
            <div className="flex items-center gap-1.5" title="MAMCET">
              <img src="/logos/mamcet-logo.png" alt="MAMCET" className="h-6 sm:h-8 object-contain" />
            </div>
            <div className="h-3 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5" title="StartupTN">
              <img src="/logos/startuptn.jpg" alt="StartupTN" className="h-5 sm:h-7 object-contain rounded" />
            </div>
            <div className="h-3 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5" title="AICTE">
              <img src="/logos/aicte-logo.png" alt="AICTE" className="h-5 sm:h-7 object-contain" />
            </div>
            <div className="h-3 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5" title="IIC">
              <img src="/logos/iic-logo.png" alt="IIC" className="h-5 sm:h-7 object-contain" />
            </div>
            <div className="h-3 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5" title="NBA">
              <img src="/logos/nba-logo.png" alt="NBA" className="h-5 sm:h-7 object-contain" />
            </div>
          </div>
        </div>

        {/* Minimalist Editorial Layout (Zero Heavy Box Clutter) */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <RevealLeft>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Section 8 Not-For-Profit Company · StartupTN Centre</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight font-display uppercase leading-tight">
              WELCOME TO <br />
              <span className="text-[#0f2c59]">MASTeR INCUBATION FOUNDATION</span>
            </h2>

            <p className="text-lg sm:text-2xl font-bold text-[#ea580c] font-display mt-2">
              &ldquo;Launchpad for your Entrepreneurial Success&rdquo;
            </p>
          </RevealLeft>

          <RevealRight>
            <div className="space-y-4 max-w-3xl mx-auto text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              <p>
                <strong className="text-slate-900 font-bold">MASTeR Incubation Foundation (MIF)</strong> is an institutional technology business incubator incorporated as a <strong className="text-slate-900 font-bold">Section 8 Not-For-Profit Company</strong>, housed on the sprawling <strong className="text-slate-900 font-bold">M.A.M. College of Engineering and Technology (MAMCET)</strong> campus in Siruganur, Tiruchirappalli.
              </p>
              <p>
                Formally recognised as a <strong className="text-blue-800 font-bold">StartupTN Pre-Incubation Centre</strong> by the Government of Tamil Nadu and an approved <strong className="text-slate-900 font-bold">MSME Host Institution</strong>, MIF bridges engineering talent with world-class prototyping labs, patent drafting support, and direct pipelines to state and national seed grants.
              </p>
            </div>
          </RevealRight>
        </div>

        {/* 3 Clean Minimal Feature Columns (No Clunky Boxes) */}
        <div className="mt-16 pt-12 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          <RevealLeft delay={0}>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0f2c59] flex items-center justify-center font-bold">
                <Cpu className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                6,000+ Sq. Ft. Prototyping Labs
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Equipped with additive 3D printers, digital storage oscilloscopes, RF telemetry benches, and plug-and-play co-working pods for rapid hardware prototyping.
              </p>
            </div>
          </RevealLeft>

          <RevealLeft delay={0.1}>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#ea580c] flex items-center justify-center font-bold">
                <Coins className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Seed Grants up to ₹25 Lakhs
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Direct application guidance for non-dilutive funding via StartupTN TANSEED (up to ₹10L), MSME Idea Hackathons (up to ₹15L), and EDII-TN IVP vouchers.
              </p>
            </div>
          </RevealLeft>

          <RevealLeft delay={0.2}>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <FileCheck2 className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                IPR, Legal & Mentor Ecosystem
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Hands-on facilitation for patent prior-art searches, corporate legal incorporation, and 1-on-1 advisory from corporate CTOs and angel investors.
              </p>
            </div>
          </RevealLeft>
        </div>

        {/* Minimal Institutional Location & Contact Strip */}
        <div className="mt-12 py-5 px-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-700">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#ea580c] shrink-0" />
            <span className="font-medium">
              <strong className="text-slate-900">Campus:</strong> Trichy–Chennai Trunk Road, Siruganur, Tiruchirappalli, TN – 621105
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a href="tel:+919361697702" className="flex items-center gap-1.5 font-bold text-[#0f2c59] hover:text-[#ea580c] transition-colors">
              <Phone className="w-3.5 h-3.5 text-orange-600" />
              <span>+91 9361697702</span>
            </a>
            <span className="text-slate-300">|</span>
            <a href="mailto:incubationmanager@mamcet.com" className="flex items-center gap-1.5 font-bold text-[#0f2c59] hover:text-[#ea580c] transition-colors">
              <Mail className="w-3.5 h-3.5 text-orange-600" />
              <span className="hidden sm:inline">incubationmanager@mamcet.com</span>
              <span className="sm:hidden">Email</span>
            </a>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/about">
            <Button className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold text-sm h-12 px-8 rounded-xl shadow-md gap-2">
              <span>About Our Foundation</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/programs">
            <Button variant="outline" className="border-slate-300 text-slate-800 font-bold text-sm h-12 px-7 rounded-xl hover:bg-slate-50">
              View 4-Stage Pathway
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
