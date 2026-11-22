"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Award,
  Users,
  Compass,
  QrCode,
  Download,
  Share2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Lock,
  Building2,
  Printer,
  FileCheck,
  Rocket,
  Info,
  Clock,
  ArrowRight,
} from "lucide-react";
import {
  StartupPassport,
  StartupFounder,
  JourneyMilestone,
  StartupAchievement,
  ProductLaunch,
  MentoringSession,
} from "@/lib/ecosystem/types";

interface PassportDossier {
  passport: StartupPassport;
  founders: StartupFounder[];
  milestones: JourneyMilestone[];
  progress: {
    percentage: number;
    completedCount: number;
    totalCount: number;
    completedWeight: number;
    totalWeight: number;
    currentMilestone?: JourneyMilestone;
  };
  achievements: StartupAchievement[];
  launches: ProductLaunch[];
  mentoringSessions: MentoringSession[];
}

export default function StartupPassportViewPage({
  params,
}: {
  params: { passportId: string };
}) {
  const { passportId } = params;
  const [dossier, setDossier] = useState<PassportDossier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "milestones" | "founders" | "achievements">("overview");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchDossier() {
      try {
        const res = await fetch(`/api/ecosystem/passports/${passportId}`);
        const data = await res.json();
        if (data.success) {
          setDossier(data.data);
        } else {
          setError(data.error || "Failed to load passport.");
        }
      } catch (err: any) {
        setError("Network error fetching startup passport.");
      } finally {
        setLoading(false);
      }
    }
    fetchDossier();
  }, [passportId]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24 pb-16 px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 border-4 border-blue-900 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800">Verifying Digital Credentials...</h2>
          <p className="text-sm text-slate-500 mt-1">Retrieving official Startup Passport records from MASTeR Incubation Foundation registry.</p>
        </div>
      </div>
    );
  }

  if (error || !dossier) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24 pb-16 px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-lg text-center shadow-lg">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Info className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Passport Record Not Found</h2>
          <p className="text-slate-600 mt-2 text-sm">
            {error || `No registered Startup Passport corresponds to ID "${passportId}".`}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/startups"
              className="px-5 py-2.5 rounded-xl bg-blue-950 text-white font-medium hover:bg-blue-900 text-sm transition"
            >
              Browse Startup Directory
            </Link>
            <Link
              href="/"
              className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 text-sm transition"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { passport, founders, milestones, progress, achievements, launches } = dossier;
  const isPassportActive = passport.status === "ACTIVE";

  return (
    <div className="min-h-screen bg-slate-50/60 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          nav, footer, .no-print {
            display: none !important;
          }
          .print-card {
            border: 2px solid #091b34 !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 no-print">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/startups" className="hover:text-slate-900 transition">Startups</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-blue-950">Startup Passport: {passport.passportId}</span>
          </div>

          <div className="flex items-center gap-2.5 self-stretch sm:self-auto">
            <button
              onClick={handleShare}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copied ? "Link Copied!" : "Share"}
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Dossier
            </button>
            <Link
              href={`/startup-passport/verify/${passport.passportId}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Official Verification
            </Link>
          </div>
        </div>

        {/* =========================================================================
            DIGITAL STARTUP PASSPORT CARD (Institutional Credentials)
           ========================================================================= */}
        <div className="print-card relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50/40 border-2 border-blue-900/15 rounded-3xl p-6 sm:p-10 shadow-xl shadow-blue-950/5">
          {/* Subtle Security Guilloche Watermark */}
          <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-blue-900/5 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-orange-500/5 blur-2xl pointer-events-none" />

          {/* 1. Institutional Accreditation Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <img
                src="/logos/official-mif-logo.png"
                alt="MASTeR Incubation Foundation Crest"
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0 drop-shadow-xs"
              />
              <div>
                <span className="text-[11px] sm:text-xs font-black text-[#0f2c59] tracking-tight uppercase">
                  MASTeR Incubation Foundation
                </span>
                <span className="text-[10px] text-slate-400 font-medium hidden sm:inline ml-2">
                  · MAMCET · StartupTN Pre-Incubation Centre
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-[10.5px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200">
                Official Digital Credential
              </span>
              <span className={`text-[10px] sm:text-[10.5px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${
                isPassportActive 
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                  : "bg-amber-50 text-amber-800 border-amber-300"
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {passport.status}
              </span>
            </div>
          </div>

          {/* 2. Startup Identity Hero (Front and Center) */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-200/80 pb-6 mb-8">
            <div className="flex items-start sm:items-center gap-4 sm:gap-5">
              {/* Dynamic Venture Emblem */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#0f2c59] via-[#091b34] to-slate-900 p-1 flex items-center justify-center shadow-lg shadow-blue-950/20 text-white shrink-0 border-2 border-orange-500/40">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#0f2c59] to-[#091b34] flex items-center justify-center font-black text-2xl sm:text-3xl tracking-tight text-white font-display">
                  {passport.startupName.split(" ").map(w => w[0]).slice(0, 2).join("")}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-xs" title="Formally Approved & Verified">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-orange-700 bg-orange-100/80 px-2.5 py-0.5 rounded-md border border-orange-200">
                    Incubated Venture
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">
                    Cohort 2026 · Pre-Seed
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-display">
                  {passport.startupName}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5 max-w-xl leading-relaxed">
                  {passport.remarks}
                </p>
              </div>
            </div>

            {/* Official Passport ID Plaque */}
            <div className="bg-white/95 backdrop-blur border border-slate-200 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-sm w-full md:w-auto shrink-0">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-mono font-bold text-lg border border-orange-200/70 shrink-0">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Startup Passport ID</p>
                <p className="text-lg sm:text-xl font-mono font-black text-[#0f2c59] tracking-tight">
                  {passport.passportId}
                </p>
                <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3 h-3 text-slate-400" />
                  Activated: {new Date(passport.activationDate).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
            </div>
          </div>

          {/* 3. Main Passport Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Progress Summary & Institutional Badges */}
            <div className="lg:col-span-8 space-y-6">
              {/* Progress Summary Card */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400">Incubation Milestone Completion</span>
                    <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                      {progress.percentage}% <span className="text-xs font-normal text-slate-500">weighted roadmap score</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400">Stages Passed</span>
                    <p className="text-base sm:text-lg font-bold text-[#0f2c59] mt-0.5">
                      {progress.completedCount} / {progress.totalCount} Stages
                    </p>
                  </div>
                </div>

                {/* Weighted Progress Bar */}
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-blue-900 via-blue-700 to-orange-500 transition-all duration-700 rounded-full"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>Current: <strong className="text-slate-800">{progress.currentMilestone?.stageName || "All Stages Completed"}</strong></span>
                  <span>Institutional Weight: {progress.completedWeight}/{progress.totalWeight} pts</span>
                </div>
              </div>

              {/* Institutional Accreditation Pill Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white/90 border border-slate-200 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center font-extrabold text-xs shrink-0">TN</div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Ecosystem Node</p>
                    <p className="text-xs font-bold text-slate-800">StartupTN Hub</p>
                  </div>
                </div>
                <div className="bg-white/90 border border-slate-200 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-800 flex items-center justify-center font-extrabold text-xs shrink-0">HI</div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Host Institute</p>
                    <p className="text-xs font-bold text-slate-800">MSME Recognized</p>
                  </div>
                </div>
                <div className="bg-white/90 border border-slate-200 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-extrabold text-xs shrink-0">SEC</div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Verification</p>
                    <p className="text-xs font-bold text-slate-800">{passport.verificationCount} Audited Checks</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Live Verification QR Code & Official Seal */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm flex flex-col items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Real-Time Verification</span>
                <p className="text-xs text-slate-600 mt-1">
                  Scan QR code with any mobile camera to verify this digital passport on the official portal.
                </p>
              </div>

              {/* QR Image */}
              <div className="my-4 p-3 bg-slate-50 border border-slate-200/90 rounded-2xl inline-block shadow-inner">
                {passport.qrCodeData ? (
                  <img
                    src={passport.qrCodeData}
                    alt={`Startup Passport QR Code for ${passport.passportId}`}
                    className="w-48 h-48 rounded-xl object-contain"
                  />
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center bg-slate-100 rounded-xl text-slate-400 font-mono text-xs">
                    Generating QR...
                  </div>
                )}
              </div>

              <div className="w-full space-y-2">
                <div className="text-[10px] font-mono text-slate-400 break-all bg-slate-50 px-2 py-1 rounded border border-slate-100">
                  {passport.securityHash}
                </div>
                <Link
                  href={`/startup-passport/verify/${passport.passportId}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-bold rounded-xl bg-blue-950 text-white hover:bg-blue-900 transition shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Inspect Cryptographic Record
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            DETAILED TABS: OVERVIEW, MILESTONES ROADMAP, FOUNDERS, ACHIEVEMENTS
           ========================================================================= */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* Tab Selector */}
          <div className="flex border-b border-slate-200 gap-2 sm:gap-6 overflow-x-auto no-print pb-2">
            {[
              { id: "overview", label: "Overview & Impact", count: null },
              { id: "milestones", label: "14-Stage Roadmap", count: milestones.length },
              { id: "founders", label: "Founding Team", count: founders.length },
              { id: "achievements", label: "Verified Honors", count: achievements.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-3 text-sm font-bold tracking-tight rounded-lg transition whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-blue-950 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="mt-8 space-y-8">
              {/* Product Launches */}
              {launches.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-orange-600" />
                    Product Launches & Active Showcases
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {launches.map((launch) => (
                      <div
                        key={launch.id}
                        className="border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition bg-slate-50/50 space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                              {launch.version}
                            </span>
                            <h4 className="text-lg font-bold text-slate-900 mt-1">{launch.productName}</h4>
                          </div>
                          <span className="text-xs text-slate-400">
                            {new Date(launch.launchDate).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{launch.description}</p>
                        {launch.demoUrl && (
                          <a
                            href={launch.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-950 hover:text-orange-600 transition"
                          >
                            Live Product Demo <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Assigned Mentors Overview */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-blue-900" />
                  Institutional Mentorship & Board Guidance
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {dossier.mentoringSessions.map((sess) => (
                    <div key={sess.id} className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-semibold text-blue-950">{sess.mentorName}</span>
                        <span>{new Date(sess.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm font-bold text-slate-800">{sess.topic}</p>
                      {sess.mentorFeedback && (
                        <p className="text-xs text-slate-600 italic bg-blue-50/50 p-2.5 rounded-lg border border-blue-100">
                          &ldquo;{sess.mentorFeedback}&rdquo;
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 14-STAGE MILESTONE ROADMAP */}
          {activeTab === "milestones" && (
            <div className="mt-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Incubation Journey Timeline</h3>
                  <p className="text-xs text-slate-500">14 structured milestones with rigorous institutional evidence verification.</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-700">Completion Score: </span>
                  <span className="text-base font-extrabold text-blue-950">{progress.percentage}%</span>
                </div>
              </div>

              <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 space-y-6 pl-6 sm:pl-8 py-2">
                {milestones.map((m) => {
                  const isCompleted = m.status === "COMPLETED";
                  const isReview = m.status === "SUBMITTED_FOR_REVIEW" || m.status === "UNDER_REVIEW";
                  const isInProgress = m.status === "IN_PROGRESS";

                  return (
                    <div key={m.id} className="relative group">
                      {/* Status Icon Marker */}
                      <div className={`absolute -left-[35px] sm:-left-[43px] top-1 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 ${
                        isCompleted
                          ? "bg-emerald-500 border-emerald-600 text-white shadow-sm"
                          : isReview
                          ? "bg-amber-400 border-amber-500 text-amber-950 animate-pulse"
                          : isInProgress
                          ? "bg-blue-600 border-blue-700 text-white"
                          : "bg-slate-100 border-slate-300 text-slate-400"
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : m.stageOrder}
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 hover:border-slate-300 transition space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              Stage {m.stageOrder} · {m.stageName}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isCompleted
                                ? "bg-emerald-100 text-emerald-800"
                                : isReview
                                ? "bg-amber-100 text-amber-800"
                                : isInProgress
                                ? "bg-blue-100 text-blue-800"
                                : "bg-slate-200 text-slate-600"
                            }`}>
                              {m.status.replace(/_/g, " ")}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 font-medium">
                            Weight: {m.weight}%
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-slate-900">{m.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{m.description}</p>

                        {/* Evidence & Remarks */}
                        {m.evidence && m.evidence.length > 0 && (
                          <div className="pt-2 border-t border-slate-200/80 mt-2 space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Verified Evidence</span>
                            <div className="flex flex-wrap gap-2">
                              {m.evidence.map((ev) => (
                                <a
                                  key={ev.id}
                                  href={ev.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded bg-white border border-slate-200 text-blue-950 font-medium hover:bg-slate-50 transition"
                                >
                                  <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                                  {ev.title}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {m.adminRemarks && (
                          <div className="text-xs text-slate-600 bg-white/80 p-2.5 rounded-lg border border-slate-200/60 flex items-start gap-2">
                            <ShieldCheck className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-slate-800">MIF Board Note:</strong> {m.adminRemarks}
                              {m.reviewedBy && <span className="text-slate-400 block mt-0.5">— {m.reviewedBy}</span>}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: FOUNDING TEAM (Privacy Protected) */}
          {activeTab === "founders" && (
            <div className="mt-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Founders & Core Innovators</h3>
                  <p className="text-xs text-slate-500">Verified identity records under institutional privacy protection guidelines.</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  Direct phone & email masked per privacy consent
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {founders.map((founder) => (
                  <div
                    key={founder.id}
                    className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50 space-y-4 hover:border-slate-300 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-200 relative border border-slate-300">
                        <img
                          src={founder.avatarUrl}
                          alt={founder.fullName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">{founder.fullName}</h4>
                        <p className="text-xs font-semibold text-orange-600">{founder.role}</p>
                        {founder.education && (
                          <p className="text-[11px] text-slate-500 mt-0.5">{founder.education}</p>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{founder.bio}</p>

                    {founder.skills && founder.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {founder.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-medium px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                      {founder.linkedInUrl && (
                        <a
                          href={founder.linkedInUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-blue-950 hover:text-orange-600 transition inline-flex items-center gap-1"
                        >
                          LinkedIn Profile <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified MIF Identity
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: VERIFIED ACHIEVEMENTS */}
          {activeTab === "achievements" && (
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Verified Institutional Honors & Grants</h3>
                <p className="text-xs text-slate-500">Government grants, innovation awards, and competitive honors validated by MIF.</p>
              </div>

              {achievements.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-sm">
                  No verified achievements recorded yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((ach) => (
                    <div
                      key={ach.id}
                      className="border border-slate-200 rounded-2xl p-5 bg-white space-y-3 hover:border-slate-300 transition"
                    >
                      <div className="flex items-start justify-between">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                          <Award className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{ach.type.replace(/_/g, " ")}</span>
                        <h4 className="text-base font-bold text-slate-900 mt-0.5">{ach.title}</h4>
                        <p className="text-xs font-semibold text-blue-950 mt-0.5">Issuer: {ach.issuer}</p>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{ach.description}</p>
                      {ach.grantAmount && (
                        <div className="bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 flex items-center justify-between">
                          <span>Grant Amount:</span>
                          <span className="text-emerald-700 font-mono text-sm">{ach.grantAmount}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
