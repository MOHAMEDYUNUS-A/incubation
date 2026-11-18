"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ApplicationCTA() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <div className="p-8 sm:p-14 rounded-3xl bg-white border border-slate-200/80 shadow-xl shadow-slate-200/50 relative overflow-hidden text-center">
          {/* Subtle Accent Glows */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-5 font-display tracking-tight leading-tight">
              Have an idea worth building? <br />
              <span className="text-[#0f2c59]">Let&apos;s build it together.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-9 leading-relaxed">
              Take the next step towards turning your engineering innovation into a viable venture. Access our fabrication labs, grant mentoring, seed funding assistance, and the StartupTN network.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link href="/apply">
                <Button
                  size="lg"
                  className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold px-8 h-12 rounded-xl shadow-lg shadow-orange-500/25 gap-2 text-base transition-all hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4 text-orange-200" />
                  <span>Apply for Incubation</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-300 bg-white hover:bg-slate-50 text-slate-700 px-7 h-12 rounded-xl text-base gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-[#0f2c59]" />
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
