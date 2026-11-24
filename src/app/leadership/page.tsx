"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Users2,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  Building2,
  Briefcase,
  GraduationCap,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp, RevealLeft, RevealRight, XYZCard } from "@/components/animations/LightAnimations";

interface LeaderProfile {
  name: string;
  role: string;
  affiliation: string;
  bio: string;
  image: string;
  phone?: string;
  email?: string;
  tags: string[];
}

// 1. Core Governing Directors & Executive Leadership (from official banner)
const EXECUTIVE_DIRECTORS: LeaderProfile[] = [
  {
    name: "Dr. X. Susan Christina",
    role: "Principal & Director, MASTeR Incubation Foundation",
    affiliation: "M.A.M. College of Engineering and Technology (MAMCET) & MIF",
    bio: "Principal of MAMCET and Director of MASTeR Incubation Foundation. Spearheads institutional strategy, academic research commercialization, advanced laboratory provisioning, and high-impact ecosystem alliances.",
    image: "/images/leadership/susan-christina.jpg",
    tags: ["Director MIF", "Principal MAMCET", "Institutional Strategy", "Research Commercialization"],
  },
  {
    name: "Dr. B. Muruganantham",
    role: "Registrar & Assistant Director, MASTeR Incubation Foundation",
    affiliation: "M.A.M. College of Engineering and Technology (MAMCET) & MIF",
    bio: "Registrar of MAMCET and Assistant Director of MASTeR Incubation Foundation. Oversees statutory governance, regulatory approvals, academic credit integration, and interdisciplinary engineering research coordination.",
    image: "/images/leadership/muruganantham.jpg",
    tags: ["Assistant Director MIF", "Registrar MAMCET", "Regulatory Governance", "Academic Integration"],
  },
  {
    name: "Dr. S. Rajasekaran",
    role: "Dean, MASTeR Group of Institutions & CEO, MASTeR Incubation Foundation",
    affiliation: "Dean, MASTeR Group of Institutions & CEO, MIF",
    bio: "Dean of MASTeR Group of Institutions and Chief Executive Officer of MASTeR Incubation Foundation. Drives venture scaling, seed funding syndication (TANSEED / MSME), accelerator programs, and enterprise investor partnerships.",
    image: "/images/leadership/rajasekaran.jpg",
    tags: ["CEO MIF", "Dean MASTeR Group", "Venture Acceleration", "Seed Grants (TANSEED/MSME)"],
  },
];

// 2. Incubation Operations & Program Coordination Team
const OPERATIONS_TEAM: LeaderProfile[] = [
  {
    name: "Mr. M. Santhosh Kumar",
    role: "Incubation Manager",
    affiliation: "MASTeR Incubation Foundation · StartupTN Hub",
    bio: "Drives day-to-day incubation operations, founder cohort selection, TANSEED / MSME grant applications, and strategic industry collaboration for resident ventures.",
    image: "/images/incubation/santhosh.jpeg",
    phone: "+91 9361697702",
    email: "incubationmanager@mamcet.com",
    tags: ["Grant Approvals", "Operations", "Founder Intake"],
  },
  {
    name: "Dr. Hemalatha Balakrishnan",
    role: "Incubation Coordinator",
    affiliation: "Department of ECE, MAMCET & MIF",
    bio: "Spearheads student ideation, hardware & IoT prototyping benches, patent prior-art review, design hackathons, and interdisciplinary engineering research translation.",
    image: "/images/incubation/incubation-coordinator-hemalatha.jpeg",
    phone: "+91 6381945574",
    email: "hemalathabalakrishnan.ece@mamcet.com",
    tags: ["Student Cohorts", "Hardware Labs", "Patent Filing"],
  },
];

// 3. Multi-Disciplinary Advisory Board & Technical Steering Council
const ADVISORY_COMMITTEE = [
  {
    category: "Academic & Institutional Governance",
    members: [
      {
        name: "Dr. M.A. Maluk Mohamed",
        role: "Chairman & Managing Trustee, MASTeR Group",
        institution: "MAMCET / MIF Board",
        focus: "Institutional governance, higher education policy, and state-wide innovation infrastructure.",
      },
      {
        name: "Mrs. Fathima Bathool Maluk",
        role: "Secretary & CEO, MASTeR Group",
        institution: "MAMCET / MIF Board",
        focus: "Operational excellence, faculty empowerment, and corporate social entrepreneurship.",
      },
    ],
  },
  {
    category: "Technical Advisory & Research Commercialization",
    members: [
      {
        name: "Dr. P. Lilly Florence",
        role: "Professor & Head, Dept of CSE",
        institution: "MAMCET Campus",
        focus: "Artificial intelligence, distributed cloud computing, and algorithmic patent validation.",
      },
      {
        name: "Dr. S. Ravimaran",
        role: "Professor, Dept of Mechanical Engineering",
        institution: "MAMCET Campus",
        focus: "Additive manufacturing, CNC rapid prototyping, and CAD/CAM mechanical tooling.",
      },
    ],
  },
  {
    category: "Industry Linkages & Seed Grant Evaluation",
    members: [
      {
        name: "Er. K. Vigneshwaran",
        role: "Senior Consultant, Deep-Tech Ventures",
        institution: "Ecosystem Partner",
        focus: "Hardware product design, MSME scheme screening, and seed investment syndication.",
      },
      {
        name: "Adv. R. Senthil Kumar",
        role: "Senior IP Attorney & Patent Agent",
        institution: "Legal Advisory Cell",
        focus: "Prior-art search, patent drafting, provisional filings, and trademark portfolio management.",
      },
    ],
  },
];

export default function LeadershipPage() {
  return (
    <div className="pt-28 sm:pt-32 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-rose-100/20 rounded-full blur-3xl -z-10" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <FadeUp className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 font-display tracking-tight leading-tight">
              Incubation Leadership & Advisory Committee
            </h1>
            <p className="text-base sm:text-lg text-slate-700 mt-4 leading-relaxed font-normal">
              Meet the executive leaders, technical directors, and faculty mentors dedicated to converting student research and regional innovation into high-growth, venture-backed enterprises at <strong className="text-slate-900 font-bold">MAMCET campus</strong>.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* 01. MEET OUR LEADERSHIP TEAM (Official Banner Board & Executive Directors) */}
      <section className="py-16 sm:py-20 container max-w-7xl mx-auto px-4 sm:px-6">
        <FadeUp className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f2c59] font-display tracking-tight">
            Meet Our Leadership Team
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl font-normal">
            Distinguished academic and executive leadership steering institutional governance, research commercialization, and venture growth.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EXECUTIVE_DIRECTORS.map((leader, idx) => (
            <FadeUp key={idx} delay={0.08 * idx}>
              <XYZCard depth={8}>
                <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#772b38]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between group h-full">
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                      <div className="absolute bottom-4 left-5 right-5 text-white z-10">
                        <span className="px-2.5 py-1 rounded-full bg-[#772b38] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs inline-block mb-1.5 border border-white/20">
                          {leader.role.split(",")[0]}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold font-display !text-white text-white drop-shadow-md">
                          {leader.name}
                        </h3>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7">
                      <div className="text-xs font-semibold text-blue-900 mb-3 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{leader.role}</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                        {leader.bio}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-2">
                        {leader.tags.map((t, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Governing Leadership</span>
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">MIF · MAMCET</span>
                  </div>
                </div>
              </XYZCard>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* 02. Incubation Operations & Program Coordination */}
      <section className="py-16 sm:py-20 bg-slate-100/60">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <FadeUp className="mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-display">
              Incubation Management & Operations
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl font-normal">
              Direct contacts for resident startup onboarding, seed grant processing (TANSEED / MSME), and hardware lab provisioning.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {OPERATIONS_TEAM.map((exec, idx) => (
              <FadeUp key={idx} delay={0.1 * idx}>
                <XYZCard depth={8}>
                  <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 overflow-hidden flex flex-col justify-between group h-full">
                    <div>
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                        <img
                          src={exec.image}
                          alt={exec.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                        <div className="absolute bottom-4 left-5 right-5 text-white z-10">
                          <span className="px-2.5 py-1 rounded-full bg-[#0f2c59] text-white text-[11px] font-bold uppercase tracking-wider shadow-xs inline-block mb-1 border border-white/20">
                            {exec.role}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold font-display !text-white text-white drop-shadow-md">
                            {exec.name}
                          </h3>
                        </div>
                      </div>

                      <div className="p-6 sm:p-7">
                        <div className="text-xs font-semibold text-blue-900 mb-3 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{exec.affiliation}</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                          {exec.bio}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {exec.tags.map((t, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Direct Contact Footer */}
                    <div className="p-6 sm:p-7 pt-0 border-t border-slate-100 mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-700 font-semibold">
                      {exec.phone && (
                        <a
                          href={`tel:${exec.phone}`}
                          className="flex items-center gap-1.5 hover:text-[#772b38] transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#772b38]" />
                          <span>{exec.phone}</span>
                        </a>
                      )}
                      {exec.email && (
                        <a
                          href={`mailto:${exec.email}`}
                          className="flex items-center gap-1.5 hover:text-blue-700 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-blue-600" />
                          <span className="truncate">{exec.email}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </XYZCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 03. Advisory & Governance Matrix */}
      <section className="py-16 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <FadeUp className="max-w-3xl mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-display">
              Advisory Board & Technical Steering Council
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
              Structured multi-tier mentorship ensuring institutional accountability, grant compliance, and high technology readiness levels (TRL 4–9).
            </p>
          </FadeUp>

          <div className="space-y-10">
            {ADVISORY_COMMITTEE.map((cat, idx) => (
              <FadeUp key={idx} delay={0.06 * idx}>
                <h3 className="text-lg sm:text-xl font-bold text-[#0f2c59] font-display mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#772b38]" />
                  <span>{cat.category}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cat.members.map((m, i) => (
                    <div
                      key={i}
                      className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                          {m.name}
                        </h4>
                        <span className="text-[11px] font-bold text-[#772b38] px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200/60">
                          {m.institution}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-blue-800 mb-2">
                        {m.role}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {m.focus}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Connect Action Callout */}
          <FadeUp>
            <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0a182e] via-[#0f2c59] to-[#06101e] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-rose-500/15 via-transparent to-transparent pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-black font-display !text-white text-white">
                  Interested in Mentoring or Advisory?
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl font-normal">
                  Guide high-potential innovators, evaluate student seed cohorts, and join our expert advisory board at MAMCET campus.
                </p>
              </div>
              <Link href="/contact?subject=mentor" className="shrink-0 relative z-10">
                <Button className="bg-[#772b38] hover:bg-[#5e212b] text-white font-extrabold text-xs sm:text-sm h-12 px-7 rounded-xl shadow-md gap-2 ring-1 ring-white/20">
                  <span>Connect with Leadership</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
