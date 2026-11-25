"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { MENTORS_LIST, MentorProfileItem } from "@/lib/db/mockData";
import {
  Search,
  Rocket,
  ArrowRight,
  ExternalLink,
  Linkedin,
  Mail,
  Calendar,
  CheckCircle2,
  Users,
  Award,
  Sparkles,
  Layers,
  ChevronRight,
  Filter,
  Briefcase,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FadeUp, ZoomIn, XYZCard, RevealLeft, RevealRight } from "@/components/animations/LightAnimations";

const CATEGORIES = [
  "All Domains",
  "AI & Deep-Tech",
  "Hardware & IoT",
  "Incubation & Grants",
  "CleanTech & Energy",
  "Seed Funding",
  "IP & Patent Strategy",
];

export default function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Domains");
  const [mentorsList, setMentorsList] = useState<MentorProfileItem[]>(MENTORS_LIST);

  // Fetch dynamically added mentors from Admin Portal API
  useEffect(() => {
    async function loadDynamicMentors() {
      try {
        const res = await fetch("/api/ecosystem/mentors");
        const json = await res.json();
        if (json.success && Array.isArray(json.data?.mentors) && json.data.mentors.length > 0) {
          const dynamicMapped: MentorProfileItem[] = json.data.mentors.map((m: any) => ({
            id: m.id,
            name: m.name,
            role: m.designation,
            organization: m.organization,
            category: m.areasOfExpertise?.[0] || "Incubation & Grants",
            expertise: Array.isArray(m.areasOfExpertise) ? m.areasOfExpertise : [],
            bio: m.bio || "Empaneled mentor at MASTeR Incubation Foundation.",
            linkedIn: m.linkedInUrl || "https://in.linkedin.com/in/master-incubation-foundation-02301b446",
            image: m.avatarUrl || "/logos/official-mif-logo.png",
          }));

          const seen = new Set<string>();
          const combined = [...dynamicMapped, ...MENTORS_LIST].filter((item) => {
            const key = item.name.toLowerCase().trim();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });

          setMentorsList(combined);
        }
      } catch (err) {
        console.error("Failed to load mentors:", err);
      }
    }

    loadDynamicMentors();
  }, []);

  const filteredMentors = useMemo(() => {
    return mentorsList.filter((mentor) => {
      const matchesSearch =
        searchTerm === "" ||
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.expertise.some((e) => e.toLowerCase().includes(searchTerm.toLowerCase())) ||
        mentor.bio.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Domains" ||
        mentor.category === selectedCategory ||
        mentor.expertise.some((e) => e.toLowerCase().includes(selectedCategory.toLowerCase()));

      return matchesSearch && matchesCategory;
    });
  }, [mentorsList, searchTerm, selectedCategory]);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 text-slate-800">
      {/* =========================================================================
          HERO & MASTHEAD SECTION
         ========================================================================= */}
      <section className="relative py-14 sm:py-18 overflow-hidden bg-gradient-to-b from-white via-slate-50/80 to-slate-50 border-b border-slate-200/80">
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#772b38]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/startups" className="hover:text-slate-900 transition-colors">Startups</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#772b38] font-semibold">Our Mentors</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-display tracking-tight leading-tight">
              Our Mentors & Startup Advisors
            </h1>

            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
              Seasoned industry executives, university researchers, patent practitioners, and venture partners
              guiding student inventors and early-stage founders from ideation to prototype validation and venture-scale funding.
            </p>
          </div>

          {/* Impact Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-200/80">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-display">24+</div>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">Empaneled Mentors</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-[#772b38] font-display">100+</div>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">1-on-1 Clinic Hours</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-display">₹15L</div>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">TANSEED Grant Support</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-blue-700 font-display">8+</div>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">Bilateral Industry MoUs</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEARCH & FILTER CONTROLS
         ========================================================================= */}
      <section className="py-8 bg-white border-b border-slate-200/80 sticky top-[72px] z-30 shadow-xs backdrop-blur-md bg-white/95">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                placeholder="Search mentors by name, domain, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 text-sm bg-slate-50 border-slate-200 focus:bg-white rounded-xl h-11"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:inline" />
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      isSelected
                        ? "bg-[#772b38] text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MENTORS DIRECTORY GRID
         ========================================================================= */}
      <section className="py-12 sm:py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          {filteredMentors.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900">No mentors found</h3>
              <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                No mentor matches your current search or category filter. Try clearing filters to view all advisors.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All Domains");
                }}
                className="mt-4 rounded-xl text-xs"
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredMentors.map((mentor, idx) => {
                const Wrapper = idx % 2 === 0 ? RevealLeft : RevealRight;
                return (
                  <Wrapper key={mentor.id} delay={(idx % 3) * 0.08}>
                    <XYZCard depth={10}>
                      <div className="h-full rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-[#772b38]/40 transition-all duration-300 group">
                        <div>
                          {/* Photo & Availability Header */}
                          <div className="flex items-start justify-between gap-4 mb-5">
                            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs shrink-0">
                              <img
                                src={mentor.image}
                                alt={mentor.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "/logos/official-mif-logo.png";
                                }}
                              />
                            </div>
                            <div className="flex flex-col items-end gap-1.5">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10.5px] font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Available for Clinics
                              </span>
                              {mentor.category && (
                                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                                  {mentor.category}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Name, Role & Org */}
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#772b38] transition-colors font-display">
                            {mentor.name}
                          </h3>
                          <div className="text-xs sm:text-sm font-semibold text-[#772b38] mt-0.5">
                            {mentor.role}
                          </div>
                          <div className="text-xs text-slate-500 font-medium mt-0.5 mb-4">
                            {mentor.organization}
                          </div>

                          {/* Bio */}
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5 line-clamp-3">
                            {mentor.bio}
                          </p>
                        </div>

                        {/* Footer: Expertise Tags & Action */}
                        <div className="space-y-4 pt-4 border-t border-slate-100">
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                              Core Advisory Expertise
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {mentor.expertise.map((exp, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-50 text-slate-700 border border-slate-200/90 font-medium group-hover:border-slate-300 transition-colors"
                                >
                                  {exp}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-2">
                            <Link
                              href={`/contact?subject=Mentorship+Consultation+with+${encodeURIComponent(mentor.name)}`}
                              className="flex-1"
                            >
                              <Button
                                size="sm"
                                className="w-full bg-slate-900 hover:bg-[#772b38] text-white rounded-xl text-xs font-semibold h-9 transition-colors shadow-xs"
                              >
                                <span>Request Clinic</span>
                                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                              </Button>
                            </Link>
                            {mentor.linkedIn && (
                              <a
                                href={mentor.linkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#0077b5] hover:border-[#0077b5]/30 hover:bg-blue-50/50 transition-colors"
                                title="LinkedIn Profile"
                              >
                                <Linkedin className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </XYZCard>
                  </Wrapper>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          MIF MENTORSHIP FRAMEWORK (4 STRUCTURED PILLARS)
         ========================================================================= */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <FadeUp className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              How MIF Mentorship Accelerates Ventures
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal">
              A structured four-pillar advisory cadence engineered to transition lab proofs-of-concept into commercially viable technology ventures.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#772b38] border border-rose-200/80 flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display mb-2">
                Bi-Weekly Venture Diagnostics
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                1-on-1 problem-solution fit analysis, unit economics modeling, customer discovery interviews, and founder milestone tracking.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200/80 flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display mb-2">
                Hardware & Maker Labs Review
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Rapid prototyping guidance, multi-layer PCB layout inspection, 3D printing tolerances, and embedded IoT firmware optimization.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display mb-2">
                Grant Proposal Clinics
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Line-by-line review of grant dossiers for StartupTN TANSEED (₹10L-₹15L) and MSME Idea Hackathon (₹15L) seed funding.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center justify-center font-bold text-sm mb-4">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display mb-2">
                Investor Term Sheet Arena
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Mock pitching rounds, cap-table advisory, valuation structuring, and warm introductions to regional angel investor syndicates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          JOIN AS A MENTOR CTA BANNER
         ========================================================================= */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-[#1a0e12] to-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-2xl">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#772b38]/40 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight leading-tight">
                Are You an Industry Leader or Serial Entrepreneur?
              </h2>

              <p className="text-sm sm:text-base text-slate-300 mt-3 font-normal leading-relaxed">
                Join the MASTeR Incubation Foundation advisory council. Share your technical wisdom,
                review student prototypes, and mentor high-potential ventures across Central Tamil Nadu.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link href="/contact?subject=Mentor+Empanelment+Application">
                  <Button
                    size="lg"
                    className="bg-[#772b38] hover:bg-[#5e212b] text-white font-semibold rounded-2xl h-11 px-6 text-xs sm:text-sm shadow-lg shadow-[#772b38]/30 border border-[#772b38]"
                  >
                    <span>Apply to Join as a Mentor</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/startups">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-2xl h-11 px-6 text-xs sm:text-sm font-semibold"
                  >
                    <span>Browse Incubated Startups</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
