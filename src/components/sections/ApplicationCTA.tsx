"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ApplicationCTA() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#070c1d] via-blue-950/20 to-[#050814] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(37,99,235,0.15),transparent)]" />

      <div className="container max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
          Section 13 — Startup Intake Open
        </span>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mt-3 mb-6 font-display tracking-tight">
          Have an idea worth building? <br />
          <span className="gradient-text">Let&apos;s build it together!</span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Take the next step towards turning your engineering innovation into a viable venture. Access our fabrication labs, grant mentoring, and the StartupTN network.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/apply">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 h-13 rounded-xl shadow-xl shadow-blue-600/30 gap-2 text-base"
            >
              <Sparkles className="w-4 h-4" />
              <span>Apply for Incubation</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 px-7 h-13 rounded-xl text-base gap-2"
            >
              <PhoneCall className="w-4 h-4 text-cyan-400" />
              <span>Speak to Our Team</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
