"use client";

import React from "react";
import Image from "next/image";
import { MENTORS_LIST } from "@/lib/db/mockData";
import { Linkedin, Mail, ExternalLink } from "lucide-react";

export default function MentorsEcosystem() {
  return (
    <section id="mentors" className="py-24 bg-[#070c1d] relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            Section 08 — Advisory Network
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 font-display">
            Mentors & Startup Advisors
          </h2>
          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            Guidance from academic researchers, corporate engineers, and incubation specialists helping you de-risk early-stage ventures.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MENTORS_LIST.map((mentor) => (
            <div
              key={mentor.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between hover:border-blue-500/30 transition-all duration-300 group"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl overflow-hidden mb-5 border border-slate-700 bg-slate-800">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <h3 className="text-base font-bold text-white mb-0.5">{mentor.name}</h3>
                <div className="text-xs font-medium text-cyan-300 mb-1">{mentor.role}</div>
                <div className="text-[11px] text-slate-400 mb-4">{mentor.organization}</div>

                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  {mentor.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="text-[10px] font-semibold uppercase text-slate-400 mb-2">
                  Areas of Expertise:
                </div>
                <div className="flex flex-wrap gap-1">
                  {mentor.expertise.map((exp, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/50"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
