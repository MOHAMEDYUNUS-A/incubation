"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  Upload,
  Award,
  Rocket,
  Lock,
  ChevronRight,
  ExternalLink,
  Info,
  Calendar,
  AlertCircle,
  Eye,
  Check,
  Plus,
  QrCode,
} from "lucide-react";
import {
  StartupPassport,
  StartupFounder,
  JourneyMilestone,
  StartupAchievement,
  ProductLaunch,
  MentoringSession,
} from "@/lib/ecosystem/types";

export default function FounderPassportDashboardPage() {
  const [passports, setPassports] = useState<StartupPassport[]>([]);
  const [selectedPassportId, setSelectedPassportId] = useState<string>("MASTER-SP-2026-0001");
  const [dossier, setDossier] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "milestones" | "mentors" | "achievements" | "privacy">("overview");

  // Evidence submission modal state
  const [evidenceModalOpen, setEvidenceModalOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<JourneyMilestone | null>(null);
  const [evidenceTitle, setEvidenceTitle] = useState("");
  const [evidenceDesc, setEvidenceDesc] = useState("");
  const [evidenceUrl, setEvidenceUrl] = useState("");
  const [evidenceType, setEvidenceType] = useState<"pdf" | "image" | "link">("pdf");
  const [founderRemarks, setFounderRemarks] = useState("");
  const [submittingEvidence, setSubmittingEvidence] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Privacy settings state
  const [publicContactConsent, setPublicContactConsent] = useState(false);
  const [savingPrivacy, setSavingPrivacy] = useState(false);

  // Fetch available passports list
  useEffect(() => {
    async function loadPassports() {
      try {
        const res = await fetch("/api/ecosystem/passports");
        const json = await res.json();
        if (json.success && json.data.length > 0) {
          setPassports(json.data);
          setSelectedPassportId((prev) => prev || json.data[0].passportId);
        }
      } catch (e) {
        console.error(e);
      }
    }
    loadPassports();
  }, []);

  // Fetch selected passport details
  useEffect(() => {
    if (!selectedPassportId) return;
    async function loadDossier() {
      setLoading(true);
      try {
        const res = await fetch(`/api/ecosystem/passports/${selectedPassportId}`);
        const json = await res.json();
        if (json.success) {
          setDossier(json.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadDossier();
  }, [selectedPassportId]);

  const handleOpenEvidenceModal = (m: JourneyMilestone) => {
    setSelectedMilestone(m);
    setEvidenceTitle("");
    setEvidenceDesc("");
    setEvidenceUrl("");
    setEvidenceType("pdf");
    setFounderRemarks("");
    setSubmissionSuccess(false);
    setEvidenceModalOpen(true);
  };

  const handleSubmitEvidence = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMilestone || !evidenceTitle || !evidenceUrl) return;

    setSubmittingEvidence(true);
    try {
      const res = await fetch("/api/ecosystem/milestones/evidence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          milestoneId: selectedMilestone.id,
          title: evidenceTitle,
          description: evidenceDesc,
          fileUrl: evidenceUrl,
          fileType: evidenceType,
          founderRemarks,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmissionSuccess(true);
        // Refresh dossier
        const refreshed = await fetch(`/api/ecosystem/passports/${selectedPassportId}`).then((r) => r.json());
        if (refreshed.success) setDossier(refreshed.data);
        setTimeout(() => {
          setEvidenceModalOpen(false);
          setSubmissionSuccess(false);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingEvidence(false);
    }
  };

  if (loading && !dossier) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24 pb-16">
        <div className="w-12 h-12 border-4 border-blue-900 border-t-red-600 rounded-full animate-spin" />
      </div>
    );
  }

  const { passport, founders, milestones, progress, achievements, launches, mentoringSessions } = dossier || {};

  return (
    <div className="min-h-screen bg-slate-50/70 pt-32 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header & Venture Selector */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Startup Emblem */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#0f2c59] via-[#091b34] to-slate-900 p-1 flex items-center justify-center shadow-md shadow-blue-950/15 text-white shrink-0 border-2 border-red-500/30">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#0f2c59] to-[#091b34] flex items-center justify-center font-black text-xl sm:text-2xl tracking-tight text-white font-display">
                {(passport?.startupName || "Venture").split(" ").map((w: string) => w[0]).slice(0, 2).join("")}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-xs">
                <CheckCircle2 className="w-3 h-3" />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-100 text-[#0f2c59] border border-blue-200">
                  Founder Workspace
                </span>
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {passport?.status || "ACTIVE"}
                </span>
                <span className="text-xs text-slate-400 font-medium">Cohort 2026</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
                {passport?.startupName || "Venture Dashboard"}
              </h1>
              <p className="text-xs text-slate-500 font-mono mt-0.5 flex items-center gap-2">
                <span>Passport ID: <strong className="text-[#0f2c59]">{passport?.passportId}</strong></span>
                <span className="text-slate-300">|</span>
                <span>Registry: <strong className="text-slate-700">MIF · MAMCET</strong></span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-stretch sm:self-auto">
            {passports.length > 1 && (
              <select
                value={selectedPassportId}
                onChange={(e) => setSelectedPassportId(e.target.value)}
                className="text-xs font-semibold px-3 py-2 border border-slate-300 rounded-xl bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900"
              >
                {passports.map((p) => (
                  <option key={p.id} value={p.passportId}>
                    {p.startupName} ({p.passportId})
                  </option>
                ))}
              </select>
            )}

            <Link
              href={`/startup-passport/${passport?.passportId}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition shadow-2xs"
            >
              <Eye className="w-3.5 h-3.5" />
              Public Passport Card
            </Link>

            <Link
              href={`/startup-passport/verify/${passport?.passportId}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-blue-950 text-white hover:bg-blue-900 transition shadow-2xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verification Seal
            </Link>
          </div>
        </div>

        {/* =========================================================================
            FOUNDER DASHBOARD OVERVIEW METRICS
           ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Overall Progress</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-slate-900">{progress?.percentage}%</span>
              <span className="text-xs font-semibold text-slate-500">{progress?.completedCount}/{progress?.totalCount} Stages</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-900 to-red-600 rounded-full"
                style={{ width: `${progress?.percentage}%` }}
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Current Milestone</span>
            <p className="text-base font-bold text-blue-950 line-clamp-1">
              {progress?.currentMilestone?.stageName || "All Milestones Completed"}
            </p>
            <p className="text-xs text-slate-500 line-clamp-1">
              {progress?.currentMilestone?.title || "Ready for graduation to alumni guild."}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Assigned Mentors</span>
            <p className="text-2xl font-black text-slate-900">{mentoringSessions?.length || 2} Sessions</p>
            <p className="text-xs text-slate-500">Board guidance & technical reviews</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Verified Honors</span>
            <p className="text-2xl font-black text-slate-900">{achievements?.length || 0} Awards</p>
            <p className="text-xs text-slate-500">Government grants & credentials</p>
          </div>
        </div>

        {/* =========================================================================
            TABS NAVIGATION
           ========================================================================= */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex border-b border-slate-200 gap-2 sm:gap-6 overflow-x-auto pb-2">
            {[
              { id: "overview", label: "Dashboard Overview" },
              { id: "milestones", label: `Milestones (${milestones?.length || 14})` },
              { id: "mentors", label: "Mentors & Guidance" },
              { id: "achievements", label: "Honors & Demos" },
              { id: "privacy", label: "Privacy Settings" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-3 text-xs sm:text-sm font-bold tracking-tight rounded-lg transition whitespace-nowrap ${activeTab === tab.id
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
            <div className="mt-8 space-y-6">
              {/* Notice Banner */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-start gap-4">
                <Info className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-blue-950">Milestone Review Guidelines</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    As an incubated founder, you can upload evidence files (reports, test videos, pitch decks, customer LoIs) for any stage. Milestones remain in <em>Submitted for Review</em> until formally approved by the MIF Evaluation Committee. Progress percentages update automatically upon approved verification.
                  </p>
                </div>
              </div>

              {/* Startup Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-slate-200 rounded-xl p-5 space-y-3 bg-slate-50/50">
                  <h3 className="text-sm font-bold text-slate-900">Incubation Information</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Venture Name:</span>
                      <strong className="text-slate-900">{passport?.startupName}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Passport Status:</span>
                      <span className="text-emerald-700 font-bold">{passport?.status}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Activated On:</span>
                      <span className="text-slate-900">{new Date(passport?.activationDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Public Verifications:</span>
                      <span className="text-slate-900 font-bold">{passport?.verificationCount}</span>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-5 space-y-3 bg-slate-50/50">
                  <h3 className="text-sm font-bold text-slate-900">Founding Team Members</h3>
                  <div className="space-y-3">
                    {founders?.map((f: StartupFounder) => (
                      <div key={f.id} className="flex items-center gap-3">
                        <img src={f.avatarUrl} alt={f.fullName} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{f.fullName}</p>
                          <p className="text-[11px] text-red-600 font-semibold">{f.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MILESTONES WITH EVIDENCE SUBMISSION */}
          {activeTab === "milestones" && (
            <div className="mt-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Incubation Milestones (14 Stages)</h3>
                  <p className="text-xs text-slate-500">Submit validation evidence to unlock the next phase of institutional acceleration.</p>
                </div>
                <span className="text-xs text-slate-500">
                  Weighted Progress: <strong className="text-blue-950 font-bold">{progress?.percentage}%</strong>
                </span>
              </div>

              <div className="space-y-4">
                {milestones?.map((m: JourneyMilestone) => {
                  const isCompleted = m.status === "COMPLETED";
                  const isUnderReview = m.status === "SUBMITTED_FOR_REVIEW" || m.status === "UNDER_REVIEW";

                  return (
                    <div
                      key={m.id}
                      className="border border-slate-200 rounded-2xl p-5 bg-white hover:border-slate-300 transition space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400">Stage {m.stageOrder}:</span>
                          <span className="text-sm font-bold text-slate-900">{m.title}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isCompleted
                            ? "bg-emerald-100 text-emerald-800"
                            : isUnderReview
                              ? "bg-amber-100 text-amber-800"
                              : "bg-slate-100 text-slate-600"
                            }`}>
                            {m.status.replace(/_/g, " ")}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 font-medium">Weight: {m.weight}%</span>
                          {!isCompleted && (
                            <button
                              onClick={() => handleOpenEvidenceModal(m)}
                              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-red-600 text-white hover:bg-red-700 transition inline-flex items-center gap-1 shadow-sm"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              Submit Evidence
                            </button>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-slate-600">{m.description}</p>

                      {/* Display evidence list if submitted */}
                      {m.evidence && m.evidence.length > 0 && (
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Submitted Evidence</span>
                          <div className="flex flex-wrap gap-2">
                            {m.evidence.map((ev) => (
                              <a
                                key={ev.id}
                                href={ev.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded bg-white border border-slate-200 text-blue-950 font-medium hover:bg-slate-50"
                              >
                                <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                                {ev.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {m.adminRemarks && (
                        <div className="bg-blue-50/60 border border-blue-100 p-3 rounded-xl text-xs text-slate-700">
                          <strong className="text-blue-950 font-bold">MIF Reviewer: </strong>
                          {m.adminRemarks}
                          {m.reviewedBy && <span className="text-slate-400 block mt-0.5">— {m.reviewedBy}</span>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: MENTORS & SESSIONS */}
          {activeTab === "mentors" && (
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Mentoring Sessions & Guidance</h3>
                <p className="text-xs text-slate-500">Confidential log of advisory meetings and mentor recommendations.</p>
              </div>

              <div className="space-y-4">
                {mentoringSessions?.map((sess: MentoringSession) => (
                  <div key={sess.id} className="border border-slate-200 rounded-2xl p-5 bg-white space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-blue-950">{sess.mentorName}</span>
                        <h4 className="text-base font-bold text-slate-900 mt-0.5">{sess.topic}</h4>
                      </div>
                      <span className="text-xs text-slate-400">
                        {new Date(sess.date).toLocaleDateString()} · {sess.durationMinutes} mins
                      </span>
                    </div>

                    {sess.mentorFeedback && (
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700">
                        <strong className="text-slate-900 block mb-0.5">Mentor Recommendations:</strong>
                        {sess.mentorFeedback}
                      </div>
                    )}

                    {sess.actionItems && (
                      <div className="bg-red-50/50 p-3 rounded-xl border border-red-100 text-xs text-slate-800">
                        <strong className="text-red-900 block mb-0.5">Next Action Items:</strong>
                        {sess.actionItems}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ACHIEVEMENTS & LAUNCHES */}
          {activeTab === "achievements" && (
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Institutional Honors & Launches</h3>
                <p className="text-xs text-slate-500">Verified awards and active product showcases.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements?.map((ach: StartupAchievement) => (
                  <div key={ach.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{ach.type}</span>
                      <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{ach.title}</h4>
                    <p className="text-xs text-slate-600">{ach.description}</p>
                    {ach.grantAmount && (
                      <span className="inline-block text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {ach.grantAmount}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PRIVACY SETTINGS */}
          {activeTab === "privacy" && (
            <div className="mt-8 space-y-6 max-w-2xl">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Founder Privacy & Disclosure Settings</h3>
                <p className="text-xs text-slate-500">
                  Control how founder contact information is presented across public directory listings and digital passport verification endpoints.
                </p>
              </div>

              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">Public Contact Exposure</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      By default, MASTeR Incubation Foundation masks all founder mobile numbers and direct emails to prevent unsolicited communications. Enabling this setting permits institutional partners and verified investors to view direct contact details.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={publicContactConsent}
                      onChange={(e) => setPublicContactConsent(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-950"></div>
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Current policy: <strong className="text-slate-800">{publicContactConsent ? "Publicly Visible" : "Masked (Recommended)"}</strong>
                  </span>
                  <button
                    onClick={() => {
                      setSavingPrivacy(true);
                      setTimeout(() => setSavingPrivacy(false), 800);
                    }}
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-blue-950 text-white hover:bg-blue-900 transition shadow-sm"
                  >
                    {savingPrivacy ? "Saving..." : "Save Privacy Preferences"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          EVIDENCE SUBMISSION MODAL
         ========================================================================= */}
      {evidenceModalOpen && selectedMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-600">
                  Stage {selectedMilestone.stageOrder} Evidence
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">{selectedMilestone.title}</h3>
              </div>
              <button
                onClick={() => setEvidenceModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {submissionSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Evidence Submitted for Review!</h4>
                <p className="text-xs text-slate-600">
                  Your documentation has been queued for evaluation by the MIF Evaluation Committee.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitEvidence} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Evidence Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Field Validation Test Report or LoI Agreement"
                    value={evidenceTitle}
                    onChange={(e) => setEvidenceTitle(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Evidence Document / Media URL</label>
                  <input
                    type="url"
                    required
                    placeholder="https://drive.google.com/... or hosted PDF link"
                    value={evidenceUrl}
                    onChange={(e) => setEvidenceUrl(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">File Type</label>
                    <select
                      value={evidenceType}
                      onChange={(e) => setEvidenceType(e.target.value as any)}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
                    >
                      <option value="pdf">PDF Document</option>
                      <option value="image">Image / Prototype Photo</option>
                      <option value="link">Video / Live Dashboard Link</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Description</label>
                    <input
                      type="text"
                      placeholder="Brief note on contents"
                      value={evidenceDesc}
                      onChange={(e) => setEvidenceDesc(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Founder Remarks for Reviewer</label>
                  <textarea
                    rows={3}
                    placeholder="Explain key findings, metrics achieved, or testing parameters..."
                    value={founderRemarks}
                    onChange={(e) => setFounderRemarks(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div className="pt-3 flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setEvidenceModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingEvidence}
                    className="px-5 py-2 rounded-xl bg-blue-950 text-white font-bold hover:bg-blue-900 transition flex items-center gap-1.5"
                  >
                    {submittingEvidence ? "Uploading..." : "Submit to Evaluation Committee"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
