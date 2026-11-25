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
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp, RevealLeft, RevealRight, XYZCard } from "@/components/animations/LightAnimations";
import { useSiteContent } from "@/context/ContentContext";

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

// 3. Institutional Trustees & Founding Patrons
const TRUSTEE_PATRONS = [
  {
    name: "Dr. M.A. Maluk Mohamed",
    role: "Chairman & Managing Trustee",
    affiliation: "MASTeR Group of Educational Institutions",
    badge: "Founding Trustee",
  },
  {
    name: "Mrs. Fathima Bathool Maluk",
    role: "Secretary & CEO",
    affiliation: "MASTeR Group of Educational Institutions",
    badge: "Managing Secretary",
  },
];

export default function LeadershipPage() {
  const { content } = useSiteContent();

  const operationsTeam = React.useMemo(() => {
    const contact = content?.contact || {};
    return [
      {
        ...OPERATIONS_TEAM[0],
        phone: contact.managerPhone || contact.phone || OPERATIONS_TEAM[0].phone,
        email: contact.managerEmail || contact.email || OPERATIONS_TEAM[0].email,
        name: contact.managerName || OPERATIONS_TEAM[0].name,
      },
      {
        ...OPERATIONS_TEAM[1],
        phone: contact.coordinatorPhone || OPERATIONS_TEAM[1].phone,
        email: contact.coordinatorEmail || OPERATIONS_TEAM[1].email,
        name: contact.coordinatorName || OPERATIONS_TEAM[1].name,
      },
    ];
  }, [content?.contact]);
  return (
    <div className="pt-20 sm:pt-24 bg-slate-50 min-h-screen">
      {/* =========================================================================
          HERO SECTION: VISIONARY & ATTRACTIVE CINEMATIC ARCHITECTURE
         ========================================================================= */}
      <section className="relative bg-gradient-to-br from-[#061224] via-[#0f2c59] to-[#040c18] text-white py-16 sm:py-24 overflow-hidden border-b border-blue-900/40">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#772b38]/20 rounded-full blur-[100px] -z-10" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[100px] -z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Visionary Headline & Value Pillars */}
            <FadeUp className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-mono font-bold text-rose-200 shadow-xs">
                <span>Foundation Governance & Stewardship</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-[1.12] drop-shadow-md">
                Steering Innovation into{" "}
                <span className="text-[#ff8097]">High-Growth</span> Deep-Tech Ventures
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Anchored by distinguished academic visionaries, research directors, and startup ecosystem leaders, the{" "}
                <strong className="text-white font-bold">MASTeR Incubation Foundation (MIF)</strong> governance council drives regional deep-tech innovation, university IP commercialization, and founder empowerment at the <strong className="text-cyan-300 font-bold">MAMCET campus</strong>.
              </p>

              {/* Verified Institutional Quick Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xs">
                  <span className="text-cyan-300 font-mono font-bold text-xs uppercase tracking-wider block">Section 8</span>
                  <span className="text-sm font-bold text-white">Not-For-Profit</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xs">
                  <span className="text-[#ff8097] font-mono font-bold text-xs uppercase tracking-wider block">StartupTN</span>
                  <span className="text-sm font-bold text-white">Recognised Hub</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xs col-span-2 sm:col-span-1">
                  <span className="text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider block">MSME Approved</span>
                  <span className="text-sm font-bold text-white">Host Institution</span>
                </div>
              </div>
            </FadeUp>

            {/* Right Column: High-Impact Institutional Campus Visual Showcase */}
            <FadeUp delay={0.15} className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-slate-900 group">
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-800">
                  <img
                    src="/images/incubation/mamcet-main-campus.jpg"
                    alt="MAMCET Main Institutional Campus, Siruganur, Trichy - Home of MASTeR Incubation Foundation"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061224] via-slate-950/40 to-transparent" />
                  
                  {/* Floating Top Badge */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-[11px] font-bold text-white">
                    <MapPin className="w-3 h-3 text-[#ff8097]" />
                    <span>MAMCET Campus, Siruganur (NH 45)</span>
                  </div>

                  {/* Bottom Caption */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-base sm:text-lg font-bold font-display">
                      Institutional Technology Launchpad
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5 line-clamp-2">
                      4,000 sq. ft. dedicated prototyping makerspaces, 15+ resident desks, and interdisciplinary research laboratories.
                    </p>
                  </div>
                </div>

                {/* Bottom Matrix Strip */}
                <div className="grid grid-cols-3 divide-x divide-white/10 bg-slate-950/90 backdrop-blur-md text-center p-3 text-xs">
                  <div>
                    <div className="text-cyan-300 font-black text-sm sm:text-base">3-Tier</div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Governance</div>
                  </div>
                  <div>
                    <div className="text-white font-black text-sm sm:text-base">4,000 Sq.Ft</div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Makerspace</div>
                  </div>
                  <div>
                    <div className="text-emerald-400 font-black text-sm sm:text-base">100%</div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Non-Dilutive</div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* =========================================================================
          01. EXECUTIVE DIRECTORS & GOVERNING LEADERSHIP
         ========================================================================= */}
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

      {/* =========================================================================
          02. INCUBATION OPERATIONS & PROGRAM COORDINATION
         ========================================================================= */}
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
            {operationsTeam.map((exec, idx) => (
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

      {/* =========================================================================
          03. INSTITUTIONAL PATRONS & TRUSTEE GOVERNANCE (Image 3 Speculative Content Removed)
         ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <FadeUp className="max-w-3xl mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-display">
              Trustee Governance & Institutional Patrons
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
              Visionary stewardship providing foundational endowment, physical campus infrastructure, and state-wide innovation policy alignment.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TRUSTEE_PATRONS.map((patron, idx) => (
              <FadeUp key={idx} delay={0.08 * idx}>
                <div className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-[#772b38]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#772b38] uppercase tracking-wider px-3 py-1 rounded-full bg-rose-50 border border-rose-200/60">
                        {patron.badge}
                      </span>
                      <Building2 className="w-5 h-5 text-slate-400 group-hover:text-[#772b38] transition-colors" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display group-hover:text-[#0f2c59] transition-colors">
                      {patron.name}
                    </h3>

                    <div className="text-sm font-semibold text-blue-900">
                      {patron.role}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 font-medium">
                      {patron.affiliation}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* =========================================================================
              04. CONNECT WITH LEADERSHIP ACTION CALLOUT
             ========================================================================= */}
          <FadeUp>
            <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#061224] via-[#0f2c59] to-[#040c18] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden border border-blue-900/40">
              <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-rose-500/20 via-transparent to-transparent pointer-events-none" />
              <div className="relative z-10 max-w-xl">
                <h3 className="text-2xl sm:text-3xl font-black font-display !text-white text-white">
                  Interested in Partnering with MIF Leadership?
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 mt-2 font-normal leading-relaxed">
                  Connect directly with the incubation directorate for corporate MoUs, angel syndication, research commercialization, or student cohort admissions at MAMCET campus.
                </p>
              </div>
              <Link href="/contact" className="shrink-0 relative z-10">
                <Button className="bg-[#772b38] hover:bg-[#5e212b] text-white font-extrabold text-xs sm:text-sm h-12 px-7 rounded-xl shadow-md gap-2 ring-1 ring-white/20 transition-all hover:scale-[1.02]">
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
