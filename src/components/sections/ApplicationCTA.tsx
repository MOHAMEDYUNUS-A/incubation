"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ApplicationCTA() {
  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
          {/* Subtle Glow Mesh */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <span className="text-xs font-semibold text-cyan-300 uppercase tracking-widest block mb-2">
              Section 13 — Startup Intake Open
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-5 font-display tracking-tight">
              Have an idea worth building? <br />
              <span className="text-cyan-300">Let&apos;s build it together!</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto mb-9 leading-relaxed">
              Take the next step towards turning your engineering innovation into a viable venture. Access our fabrication labs, grant mentoring, and the StartupTN network.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link href="/apply">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 h-12 rounded-xl shadow-lg shadow-blue-500/30 gap-2 text-base"
                >
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span>Apply for Incubation</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/10 hover:bg-white/20 text-white px-7 h-12 rounded-xl text-base gap-2 backdrop-blur-xs"
                >
                  <PhoneCall className="w-4 h-4 text-cyan-300" />
                  <span>Speak to Our Team</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
