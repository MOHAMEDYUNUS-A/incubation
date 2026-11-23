"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Globe,
  Linkedin,
  MapPin,
  Award,
  Users,
  Compass,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Rocket,
  Video,
  FileCheck,
  Sparkles,
} from "lucide-react";
import {
  StartupPassport,
  StartupFounder,
  JourneyMilestone,
  StartupAchievement,
  ProductLaunch,
  MentorProfile,
  SuccessStory,
} from "@/lib/ecosystem/types";

export default function StartupProfileSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const [passport, setPassport] = useState<StartupPassport | null>(null);
  const [dossier, setDossier] = useState<any>(null);
  const [story, setStory] = useState<SuccessStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "milestones" | "founders" | "achievements" | "launches">("overview");

  useEffect(() => {
    async function loadData() {
      try {
        // Find matching passport by slug or lookup
        const pRes = await fetch("/api/ecosystem/passports");
        const pJson = await pRes.json();
        if (pJson.success) {
          const match = pJson.data.find(
            (p: StartupPassport) =>
              p.slug.toLowerCase() === slug.toLowerCase() ||
              p.startupName.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug.toLowerCase()
          );
          if (match) {
            setPassport(match);
            const dRes = await fetch(`/api/ecosystem/passports/${match.passportId}`);
            const dJson = await dRes.json();
            if (dJson.success) {
              setDossier(dJson.data);
            }
          }
        }

        // Check for success story
        const sRes = await fetch(`/api/ecosystem/stories`);
        const sJson = await sRes.json();
        if (sJson.success) {
          const matchedStory = sJson.data.find(
            (s: SuccessStory) =>
              s.slug.toLowerCase().includes(slug.toLowerCase()) ||
              s.startupName.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug.toLowerCase()
          );
          if (matchedStory) setStory(matchedStory);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-32 sm:pt-36 pb-16">
        <div className="w-12 h-12 border-4 border-blue-900 border-t-red-600 rounded-full animate-spin" />
      </div>
    );
  }

  const { founders = [], milestones = [], progress = {}, achievements = [], launches = [] } = dossier || {};
  const startupName = passport?.startupName || slug.replace(/-/g, " ").toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50/70 pt-32 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/startups" className="hover:text-slate-900 transition">Startups Directory</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-blue-950 font-bold">{startupName}</span>
        </div>

        {/* Hero Banner Header with Passport Seal */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-950 to-blue-900 text-white font-black text-2xl flex items-center justify-center shadow-md">
                {startupName.charAt(0)}
              </div>
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {startupName}
                  </h1>
                  {passport && (
                    <Link
                      href={`/startup-passport/${passport.passportId}`}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200 transition"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Verified Passport: {passport.passportId}
                    </Link>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                  {passport?.remarks || "Incubated at MASTeR Incubation Foundation, MAMCET Campus, Siruganur."}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> Siruganur, Trichy
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Cohort 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Passport Action */}
            {passport && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center shrink-0 w-full md:w-auto">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Roadmap Progress</span>
                <span className="text-2xl font-black text-blue-950 mt-0.5 block">{progress.percentage || 80}%</span>
                <Link
                  href={`/startup-passport/verify/${passport.passportId}`}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Verify Official ID
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Tabbed Navigation */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex border-b border-slate-200 gap-2 sm:gap-6 overflow-x-auto pb-2">
            {[
              { id: "overview", label: "Overview & Story" },
              { id: "milestones", label: `Roadmap (${milestones.length || 14})` },
              { id: "founders", label: `Founders (${founders.length})` },
              { id: "achievements", label: `Honors (${achievements.length})` },
              { id: "launches", label: `Product Launches (${launches.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-3 text-xs sm:text-sm font-bold tracking-tight rounded-lg transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-blue-950 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="mt-8 space-y-8">
              {story && (
                <div className="bg-gradient-to-br from-blue-950 to-blue-900 text-white p-6 sm:p-8 rounded-3xl space-y-4 shadow-md">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-red-500" />
                    <span className="text-xs uppercase font-extrabold tracking-widest text-red-500">Featured Case Study</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black">{story.title}</h3>
                  <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-3xl">
                    {story.theBreakthrough}
                  </p>
                  <Link
                    href={`/success-stories/${story.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition shadow-sm"
                  >
                    Read Full Editorial Chronicle <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {/* Core Attributes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-slate-200 rounded-2xl p-5 space-y-3 bg-slate-50/50">
                  <h4 className="text-sm font-bold text-slate-900">Venture Profile</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Supported by the incubation facilities at MAMCET Siruganur with comprehensive access to IoT labs, additive manufacturing, and mentorship networks.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-2xl p-5 space-y-3 bg-slate-50/50">
                  <h4 className="text-sm font-bold text-slate-900">Institutional Standing</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Passport Number:</span>
                      <strong className="text-blue-950 font-mono">{passport?.passportId || "Pending Verification"}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Accredited Centre:</span>
                      <span className="text-slate-900">StartupTN Node, Trichy</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Host Institute:</span>
                      <span className="text-slate-900">MSME Recognized (MAMCET)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ROADMAP */}
          {activeTab === "milestones" && (
            <div className="mt-8 space-y-4">
              <h3 className="text-base font-bold text-slate-900">14-Stage Incubation Roadmap</h3>
              <div className="space-y-3">
                {milestones.map((m: JourneyMilestone) => (
                  <div key={m.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Stage {m.stageOrder}</span>
                      <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                      <p className="text-xs text-slate-500">{m.description}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      m.status === "COMPLETED" ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"
                    }`}>
                      {m.status.replace(/_/g, " ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FOUNDERS */}
          {activeTab === "founders" && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {founders.map((f: StartupFounder) => (
                <div key={f.id} className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={f.avatarUrl} alt={f.fullName} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{f.fullName}</h4>
                      <p className="text-xs font-semibold text-red-600">{f.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600">{f.bio}</p>
                  {f.linkedInUrl && (
                    <a
                      href={f.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-blue-950 inline-flex items-center gap-1 hover:text-red-600"
                    >
                      LinkedIn Profile <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: ACHIEVEMENTS */}
          {activeTab === "achievements" && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((ach: StartupAchievement) => (
                <div key={ach.id} className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400">{ach.type}</span>
                  <h4 className="text-sm font-bold text-slate-900">{ach.title}</h4>
                  <p className="text-xs text-slate-600">{ach.description}</p>
                  <p className="text-xs font-bold text-emerald-700">{ach.grantAmount}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: LAUNCHES */}
          {activeTab === "launches" && (
            <div className="mt-8 space-y-4">
              {launches.map((l: ProductLaunch) => (
                <div key={l.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-base font-bold text-slate-900">{l.productName}</h4>
                    <span className="text-xs text-red-600 font-mono font-bold">{l.version}</span>
                  </div>
                  <p className="text-xs text-slate-600">{l.description}</p>
                  {l.demoUrl && (
                    <a
                      href={l.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-blue-950 inline-flex items-center gap-1"
                    >
                      Live Demo <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
