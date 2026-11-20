import React from "react";
import Link from "next/link";
import { FOUNDATION_INFO } from "@/lib/db/mockData";
import { Shield, Target, Compass, ArrowRight, ExternalLink, Award, Users, Landmark, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import CampusPhotoGallery from "@/components/sections/CampusPhotoGallery";
import InauguralMomentsGallery from "@/components/sections/InauguralMomentsGallery";

export const metadata = {
  title: "About Us | MASTeR Incubation Foundation (MIF)",
  description: "Learn about the Section 8 not-for-profit company, StartupTN Pre-Incubation Centre accreditation, and governance at MAMCET.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Hero */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4 border border-blue-200">
            <Shield className="w-3.5 h-3.5" />
            <span>Governance & Institutional Framework</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight font-display">
            About MASTeR Incubation Foundation
          </h1>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed">
            Registered as a Section 8 not-for-profit company under the Companies Act, 2013, associated with M.A.M. College of Engineering and Technology (MAMCET), and recognised as a StartupTN Pre-Incubation Centre and Ministry of MSME Host Institution.
          </p>
        </div>

        {/* Inauguration & Key Milestones Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl mb-16 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-500/30">
              <Award className="w-4 h-4" />
              <span>Official Inaugural Milestone · March 3, 2026</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 font-display">
              Inaugurated by Hon&apos;ble Minister Thiru S. Regupathy
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-6">
              The MASTeR Incubation Centre was formally inaugurated at MAMCET campus by <strong>Thiru S. Regupathy</strong>, Hon&apos;ble Minister for Minerals and Mines, Government of Tamil Nadu, praising it as a &ldquo;sacred space for ideas&rdquo; designed to transition students from job seekers to job creators. On the launch day, MIF onboarded 25 startups and executed 8 industry MoUs.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs">
              <div>
                <span className="text-cyan-300 font-bold block text-lg">25+</span>
                <span className="text-slate-300">Startups Onboarded</span>
              </div>
              <div>
                <span className="text-cyan-300 font-bold block text-lg">8 MoUs</span>
                <span className="text-slate-300">Industry Partnerships</span>
              </div>
              <div>
                <span className="text-cyan-300 font-bold block text-lg">IITMIC</span>
                <span className="text-slate-300">Incubation Partner</span>
              </div>
              <div>
                <span className="text-cyan-300 font-bold block text-lg">₹15 Lakhs</span>
                <span className="text-slate-300">MSME Grant Cap</span>
              </div>
            </div>
          </div>
        </div>

        {/* Official Inaugural Moments Photo Showcase */}
        <InauguralMomentsGallery />

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display">Our Vision</h3>
              <p className="text-slate-700 text-base leading-relaxed italic">
                &ldquo;{FOUNDATION_INFO.vision}&rdquo;
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
              Institutional commitment to high-impact technology commercialization.
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display">Institutional Mandate</h3>
              <p className="text-slate-700 text-base leading-relaxed">
                MIF functions as a single-window launchpad connecting student innovators, faculty researchers, and regional entrepreneurs with laboratory infrastructure, corporate partnerships, and venture capital syndicates.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
              Approved by AICTE and Tamil Nadu Startup Mission (StartupTN) frameworks.
            </div>
          </div>
        </div>

        {/* Detailed 5 Mission Objectives */}
        <div className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 font-display">
            Strategic Mission Objectives (M1 to M5)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FOUNDATION_INFO.mission.map((m) => (
              <div key={m.code} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {m.code}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-3 mb-2">{m.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Governing Trust & Executive Leadership */}
        <div id="governance" className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm mb-20">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Institutional Governance
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-1">
              Governing Trust & Executive Leadership
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              Guided by the leadership of the MASTeR Group of Institutions (Maluk Educational, Health & Charitable Trust).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-blue-700 uppercase">Patron / Chairman</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">{FOUNDATION_INFO.governance.chairman.name}</h3>
              <div className="text-xs text-slate-600 mt-0.5">{FOUNDATION_INFO.governance.chairman.organization}</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-blue-700 uppercase">Secretary & CEO</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">{FOUNDATION_INFO.governance.ceo.name}</h3>
              <div className="text-xs text-slate-600 mt-0.5">{FOUNDATION_INFO.governance.ceo.organization}</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-blue-700 uppercase">Incubation Manager</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">{FOUNDATION_INFO.manager.name}</h3>
              <div className="text-xs text-slate-600 mt-0.5">{FOUNDATION_INFO.manager.phone}</div>
              <div className="text-[11px] text-slate-500 truncate mt-1">{FOUNDATION_INFO.manager.email}</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 bg-white shrink-0 shadow-2xs">
                  <img
                    src="/images/incubation/incubation-coordinator-hemalatha.jpeg"
                    alt={FOUNDATION_INFO.coordinator.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-blue-700 uppercase">Incubation Coordinator</span>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5">{FOUNDATION_INFO.coordinator.name}</h3>
                </div>
              </div>
              <div className="text-xs text-slate-600 mt-0.5">{FOUNDATION_INFO.coordinator.phone}</div>
              <div className="text-[11px] text-slate-500 truncate mt-1">{FOUNDATION_INFO.coordinator.email}</div>
            </div>
          </div>
        </div>

        {/* Real Campus Photos Gallery */}
        <div className="mb-20">
          <CampusPhotoGallery />
        </div>

        {/* Leadership & Advisory Committee Direct Section */}
        <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-orange-400 transition-all">
          <div>
            <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-widest block mb-2">
              FOUNDATION GOVERNANCE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Leadership & Advisory Committee
            </h3>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Meet our Incubation Manager, Technical Coordinator, domain faculty mentors, and institutional board members advancing regional innovation.
            </p>
          </div>
          <Link href="/leadership">
            <Button className="bg-[#0f2c59] hover:bg-[#ea580c] text-white font-extrabold text-xs sm:text-sm h-11 px-6 rounded-xl shadow-xs gap-2 transition-all shrink-0">
              <span>View Leadership Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Social Connect Callout */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Connect With Our Active Social Channels
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Follow our verified updates on Instagram and LinkedIn for hackathons, workshops, and startup announcements.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.instagram.com/master_incubation_foundation/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs gap-1.5 h-10 px-5">
                <span>Instagram Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </a>

            <a
              href="https://in.linkedin.com/in/master-incubation-foundation-02301b446"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="border-slate-300 text-xs font-bold gap-1.5 h-10 px-5">
                <span>LinkedIn Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </a>

            <a
              href="https://share.google/V18XLHgF6Rh85vNA0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="border-slate-300 text-xs font-bold gap-1.5 h-10 px-5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Google Profile</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
