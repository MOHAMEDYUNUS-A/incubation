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

export const metadata = {
  title: "Leadership & Committee | MASTeR Incubation Foundation (MIF)",
  description:
    "Meet the board of directors, incubation managers, technical coordinators, and faculty advisors leading MASTeR Incubation Foundation at MAMCET Siruganur.",
};

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

const EXECUTIVE_OFFICERS: LeaderProfile[] = [
  {
    name: "Mr. M. Santhosh Kumar",
    role: "Incubation Manager",
    affiliation: "MASTeR Incubation Foundation · StartupTN Hub",
    bio: "Drives day-to-day incubation operations, founder cohort selection, TANSEED / MSME grant applications, and strategic industry collaboration for resident ventures.",
    image: "/images/incubation/team-of-incubation.jpeg",
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
    email: "incubationmanager@mamcet.com",
    tags: ["Hardware Prototyping", "IPR Filing", "Student Mentorship"],
  },
];

const ADVISORY_COMMITTEE = [
  {
    category: "Institutional Governance",
    members: [
      {
        name: "Governing Board of Trustees",
        role: "Section 8 Non-Profit Management Council",
        institution: "MASTeR Incubation Foundation",
        focus: "Long-term vision, institutional funding allocations, compliance, and policy governance.",
      },
      {
        name: "Academic Steering Committee",
        role: "Interdisciplinary Deans & Department Heads",
        institution: "M.A.M. College of Engineering & Technology",
        focus: "Bridging classroom curriculum, student capstone prototypes, and incubation laboratory infrastructure.",
      },
    ],
  },
  {
    category: "Technical Advisory & Mentors",
    members: [
      {
        name: "Dr. Deep-Tech Faculty Mentors",
        role: "Domain Research Mentors (AI, IoT, CleanTech)",
        institution: "MAMCET Center of Excellence",
        focus: "Algorithm architecture, circuit optimization, firmware development, and rapid 3D prototyping.",
      },
      {
        name: "IPR & Patent Cell Advisory",
        role: "Patent Attorneys & Prior-Art Analysts",
        institution: "MIF Legal & Innovation Cell",
        focus: "Patent specification drafting, claims structuring, copyright, and trademark protection.",
      },
    ],
  },
];

export default function LeadershipPage() {
  return (
    <div className="pt-28 sm:pt-32 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200 py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-100/25 rounded-full blur-3xl -z-10" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 text-[#ea580c] border border-orange-200/80 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-orange-600" />
              <span>FOUNDATION GOVERNANCE & TEAM</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 font-display tracking-tight leading-tight">
              Incubation Leadership & Advisory Committee
            </h1>
            <p className="text-base sm:text-lg text-slate-700 mt-4 leading-relaxed font-normal">
              Meet the executive leaders, technical directors, and faculty mentors dedicated to converting student research and regional innovation into high-growth, venture-backed enterprises at <strong className="text-slate-900 font-bold">MAMCET campus</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Core Executive Leadership Cards */}
      <section className="py-16 sm:py-24 container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block mb-2">
            EXECUTIVE OFFICERS
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-display">
            Incubation Management Team
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EXECUTIVE_OFFICERS.map((exec, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-orange-400 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={exec.image}
                    alt={exec.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 text-white z-10">
                    <span className="px-2.5 py-1 rounded-full bg-[#ea580c] text-white text-[11px] font-bold uppercase tracking-wider shadow-xs inline-block mb-1">
                      {exec.role}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-display !text-white text-white drop-shadow-md">
                      {exec.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <div className="text-xs font-semibold text-blue-900 mb-3 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
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
                    className="flex items-center gap-1.5 hover:text-orange-600 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-orange-500" />
                    <span>{exec.phone}</span>
                  </a>
                )}
                {exec.email && (
                  <a
                    href={`mailto:${exec.email}`}
                    className="flex items-center gap-1.5 hover:text-orange-600 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span className="truncate">{exec.email}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advisory & Governance Matrix */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-widest block mb-2">
              ECOSYSTEM GOVERNANCE
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-display">
              Advisory Board & Technical Steering Council
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
              Structured multi-tier mentorship ensuring institutional accountability, grant compliance, and high technology readiness levels (TRL 4–9).
            </p>
          </div>

          <div className="space-y-10">
            {ADVISORY_COMMITTEE.map((cat, idx) => (
              <div key={idx}>
                <h3 className="text-lg sm:text-xl font-bold text-[#0f2c59] font-display mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#ea580c]" />
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
                        <span className="text-[11px] font-bold text-[#ea580c] px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200">
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
              </div>
            ))}
          </div>

          {/* Connect Action Callout */}
          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0f2c59] to-[#163e7a] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-wider block mb-2">
                JOIN OUR MENTOR NETWORK
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display !text-white text-white">
                Interested in Mentoring or Advisory?
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl font-normal">
                Guide high-potential innovators, evaluate student seed cohorts, and join our expert advisory board at MAMCET campus.
              </p>
            </div>
            <Link href="/contact?subject=mentor" className="shrink-0">
              <Button className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold text-xs sm:text-sm h-12 px-7 rounded-xl shadow-md gap-2">
                <span>Connect with Leadership</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
