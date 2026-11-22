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
  Sparkles,
  Users,
  GraduationCap,
  MessageSquare,
  Search,
  RefreshCw,
  Printer,
  X,
  FileText,
  Video,
} from "lucide-react";
import {
  StartupPassport,
  JourneyMilestone,
  MentorProfile,
  MentoringSession,
  StartupAchievement,
  ProductLaunch,
  SuccessStory,
  AlumniProfile,
  AlumniConnection,
  PassportStatus,
} from "@/lib/ecosystem/types";

interface Props {
  tab: "passports" | "milestones" | "mentors" | "stories" | "alumni";
  showToast: (msg: string) => void;
}

export default function EcosystemAdminTabs({ tab, showToast }: Props) {
  // Passports state
  const [passports, setPassports] = useState<StartupPassport[]>([]);
  const [passportsLoading, setPassportsLoading] = useState(false);
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const [issueStartupName, setIssueStartupName] = useState("");
  const [issueStartupSlug, setIssueStartupSlug] = useState("");
  const [issueRemarks, setIssueRemarks] = useState("");
  const [issuing, setIssuing] = useState(false);

  // Milestones state
  const [milestonesStartupId, setMilestonesStartupId] = useState<string>("s_1795332004112");
  const [milestones, setMilestones] = useState<JourneyMilestone[]>([]);
  const [milestonesLoading, setMilestonesLoading] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<JourneyMilestone | null>(null);
  const [reviewRemarks, setReviewRemarks] = useState("");
  const [reviewing, setReviewing] = useState(false);

  // Mentors state
  const [mentors, setMentors] = useState<MentorProfile[]>([]);
  const [sessions, setSessions] = useState<MentoringSession[]>([]);
  const [mentorsLoading, setMentorsLoading] = useState(false);
  const [sessionModalOpen, setSessionModalOpen] = useState(false);
  const [sessionTopic, setSessionTopic] = useState("");
  const [sessionMentorId, setSessionMentorId] = useState("");
  const [sessionMentorName, setSessionMentorName] = useState("");
  const [sessionNotes, setSessionNotes] = useState("");
  const [sessionFeedback, setSessionFeedback] = useState("");
  const [sessionActionItems, setSessionActionItems] = useState("");
  const [loggingSession, setLoggingSession] = useState(false);

  // Stories & AI Assistant state
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [storiesLoading, setStoriesLoading] = useState(false);
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiStartupId, setAiStartupId] = useState("s_1795332004112");
  const [aiNotes, setAiNotes] = useState("");
  const [generatingAiStory, setGeneratingAiStory] = useState(false);

  // Story Form State
  const [storyTitle, setStoryTitle] = useState("");
  const [storySlug, setStorySlug] = useState("");
  const [storyHeroImage, setStoryHeroImage] = useState("");
  const [storyProblem, setStoryProblem] = useState("");
  const [storyBreakthrough, setStoryBreakthrough] = useState("");
  const [storyJourney, setStoryJourney] = useState("");
  const [storyQuote, setStoryQuote] = useState("");
  const [storyQuoteAuthor, setStoryQuoteAuthor] = useState("");
  const [storyStatus, setStoryStatus] = useState<"DRAFT" | "PUBLISHED">("PUBLISHED");
  const [savingStory, setSavingStory] = useState(false);

  // Alumni state
  const [alumniList, setAlumniList] = useState<AlumniProfile[]>([]);
  const [connectionsList, setConnectionsList] = useState<AlumniConnection[]>([]);
  const [alumniLoading, setAlumniLoading] = useState(false);

  // Initial Loaders
  useEffect(() => {
    if (tab === "passports") fetchPassports();
    if (tab === "milestones") fetchMilestones(milestonesStartupId);
    if (tab === "mentors") fetchMentors();
    if (tab === "stories") fetchStories();
    if (tab === "alumni") fetchAlumni();
  }, [tab, milestonesStartupId]);

  // 1. Passports API
  const fetchPassports = async () => {
    setPassportsLoading(true);
    try {
      const res = await fetch("/api/ecosystem/passports");
      const json = await res.json();
      if (json.success) setPassports(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setPassportsLoading(false);
    }
  };

  const handleIssuePassport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueStartupName || !issueStartupSlug) return;
    setIssuing(true);
    try {
      const res = await fetch("/api/ecosystem/passports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startupId: `s_${Date.now()}`,
          startupName: issueStartupName,
          slug: issueStartupSlug.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          remarks: issueRemarks,
          issuedBy: "MIF Governing Council",
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Startup Passport ${data.data.passportId} issued successfully!`);
        setIssueModalOpen(false);
        setIssueStartupName("");
        setIssueStartupSlug("");
        setIssueRemarks("");
        fetchPassports();
      } else {
        showToast(data.error || "Failed to issue passport.");
      }
    } catch (e: any) {
      showToast("Error issuing passport.");
    } finally {
      setIssuing(false);
    }
  };

  const handleUpdatePassportStatus = async (passportId: string, status: PassportStatus) => {
    try {
      const res = await fetch("/api/ecosystem/passports", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passportId,
          status,
          remarks: `Status updated to ${status} via Admin Operations Console.`,
          updatedBy: "Admin Secretariat",
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Passport ${passportId} status set to ${status}.`);
        fetchPassports();
      }
    } catch (e) {
      showToast("Failed to update status.");
    }
  };

  // 2. Milestones API
  const fetchMilestones = async (sId: string) => {
    setMilestonesLoading(true);
    try {
      const res = await fetch(`/api/ecosystem/milestones?startupId=${sId}`);
      const json = await res.json();
      if (json.success) setMilestones(json.data.milestones);
    } catch (e) {
      console.error(e);
    } finally {
      setMilestonesLoading(false);
    }
  };

  const handleReviewMilestone = async (approved: boolean) => {
    if (!selectedMilestone) return;
    setReviewing(true);
    try {
      const res = await fetch("/api/ecosystem/milestones", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          milestoneId: selectedMilestone.id,
          approved,
          adminRemarks: reviewRemarks,
          reviewerName: "Dr. R. Rajavel, Head of Incubation",
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Milestone ${approved ? "approved" : "rejected"}. Progress recalculated.`);
        setReviewModalOpen(false);
        fetchMilestones(milestonesStartupId);
      }
    } catch (e) {
      showToast("Review failed.");
    } finally {
      setReviewing(false);
    }
  };

  // 3. Mentors API
  const fetchMentors = async () => {
    setMentorsLoading(true);
    try {
      const res = await fetch("/api/ecosystem/mentors");
      const json = await res.json();
      if (json.success) {
        setMentors(json.data.mentors);
        setSessions(json.data.sessions);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setMentorsLoading(false);
    }
  };

  const handleLogSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionTopic || !sessionMentorId) return;
    setLoggingSession(true);
    try {
      const mentorObj = mentors.find((m) => m.id === sessionMentorId);
      const res = await fetch("/api/ecosystem/mentors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startupId: milestonesStartupId,
          startupName: "AeroDrone AI Labs",
          mentorId: sessionMentorId,
          mentorName: mentorObj?.name || "Assigned Mentor",
          topic: sessionTopic,
          notes: sessionNotes,
          mentorFeedback: sessionFeedback,
          actionItems: sessionActionItems,
          loggedBy: "Incubation Directorate",
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Mentoring session recorded!");
        setSessionModalOpen(false);
        setSessionTopic("");
        setSessionNotes("");
        setSessionFeedback("");
        setSessionActionItems("");
        fetchMentors();
      }
    } catch (e) {
      showToast("Failed to log session.");
    } finally {
      setLoggingSession(false);
    }
  };

  // 4. Stories & AI Assistant API
  const fetchStories = async () => {
    setStoriesLoading(true);
    try {
      const res = await fetch("/api/ecosystem/stories?all=true");
      const json = await res.json();
      if (json.success) setStories(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setStoriesLoading(false);
    }
  };

  const handleGenerateAiStory = async () => {
    setGeneratingAiStory(true);
    try {
      const res = await fetch("/api/ecosystem/ai-story-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startupId: aiStartupId,
          rawNotes: {
            problem: aiNotes,
          },
          saveAsDraft: true,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("AI Success Story Draft synthesized and saved!");
        setAiModalOpen(false);
        setAiNotes("");
        fetchStories();
      }
    } catch (e) {
      showToast("AI Story Assistant encountered an issue.");
    } finally {
      setGeneratingAiStory(false);
    }
  };

  const handleSaveStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyTitle || !storySlug) return;
    setSavingStory(true);
    try {
      const res = await fetch("/api/ecosystem/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startupId: milestonesStartupId,
          startupName: "AeroDrone AI Labs",
          title: storyTitle,
          slug: storySlug.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          heroImage: storyHeroImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
          problemStatement: storyProblem,
          theBreakthrough: storyBreakthrough,
          mifJourney: storyJourney,
          impactMetrics: [
            { label: "Status", value: "Verified", detail: "MIF Pre-Incubation" },
            { label: "Milestones", value: "Stage 11", detail: "Market Validation" },
          ],
          founderQuote: storyQuote,
          quoteAuthor: storyQuoteAuthor || "Founding Team",
          status: storyStatus,
          isEditorialPick: false,
          authorName: "Admin Operations",
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Story "${storyTitle}" saved successfully!`);
        setStoryModalOpen(false);
        fetchStories();
      }
    } catch (e) {
      showToast("Failed to save story.");
    } finally {
      setSavingStory(false);
    }
  };

  // 5. Alumni API
  const fetchAlumni = async () => {
    setAlumniLoading(true);
    try {
      const res = await fetch("/api/ecosystem/alumni?admin=true");
      const json = await res.json();
      if (json.success) {
        setAlumniList(json.data.alumni);
        setConnectionsList(json.data.connections);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAlumniLoading(false);
    }
  };

  // =========================================================================
  // TAB 1: STARTUP PASSPORTS
  // =========================================================================
  if (tab === "passports") {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-950 border border-blue-200">
                Institutional Credentials
              </span>
              <span className="text-xs text-slate-500 font-medium">Digital Identity System</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">Startup Passport Registry</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Issue, activate, suspend, and print verified Startup Passports with cryptographically unique IDs.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchPassports}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition shadow-sm"
              title="Refresh Passports"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIssueModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Issue Startup Passport
            </button>
          </div>
        </div>

        {/* Passports Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Passport ID</th>
                  <th className="py-3 px-4">Startup Venture</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Activation Date</th>
                  <th className="py-3 px-4">Verifications</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {passportsLoading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      Loading registry passports...
                    </td>
                  </tr>
                ) : passports.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      No startup passports issued yet. Click &quot;Issue Startup Passport&quot; to begin.
                    </td>
                  </tr>
                ) : (
                  passports.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-950">
                        {p.passportId}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 block">{p.startupName}</span>
                        <span className="text-[11px] text-slate-400 font-mono">/{p.slug}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                          p.status === "ACTIVE"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : p.status === "SUSPENDED"
                            ? "bg-red-100 text-red-800 border-red-300"
                            : "bg-slate-100 text-slate-700 border-slate-300"
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {new Date(p.activationDate).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                        {p.verificationCount}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                        <Link
                          href={`/startup-passport/${p.passportId}`}
                          target="_blank"
                          className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-950 font-bold hover:bg-blue-100 transition inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" /> Digital Card
                        </Link>
                        <Link
                          href={`/startup-passport/verify/${p.passportId}`}
                          target="_blank"
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold hover:bg-emerald-100 transition inline-flex items-center gap-1"
                        >
                          <ShieldCheck className="w-3 h-3" /> Verify
                        </Link>
                        {p.status === "ACTIVE" ? (
                          <button
                            onClick={() => handleUpdatePassportStatus(p.passportId, "SUSPENDED")}
                            className="px-2 py-1 rounded-lg bg-red-50 text-red-700 font-bold hover:bg-red-100 transition"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUpdatePassportStatus(p.passportId, "ACTIVE")}
                            className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-100 transition"
                          >
                            Activate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ISSUE PASSPORT MODAL */}
        {issueModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">Official Certification</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">Issue New Startup Passport</h3>
                </div>
                <button onClick={() => setIssueModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
              </div>

              <form onSubmit={handleIssuePassport} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Venture Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NextGen BioSensors"
                    value={issueStartupName}
                    onChange={(e) => {
                      setIssueStartupName(e.target.value);
                      setIssueStartupSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Unique Slug Identifier</label>
                  <input
                    type="text"
                    required
                    placeholder="nextgen-biosensors"
                    value={issueStartupSlug}
                    onChange={(e) => setIssueStartupSlug(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Governing Council Remarks</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Approved under MSME Pre-Incubation Cohort 2026."
                    value={issueRemarks}
                    onChange={(e) => setIssueRemarks(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div className="pt-3 flex gap-2.5 justify-end">
                  <button
                    type="button"
                    onClick={() => setIssueModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={issuing}
                    className="px-5 py-2 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 transition"
                  >
                    {issuing ? "Generating..." : "Generate & Activate Passport"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // TAB 2: MILESTONES REVIEW & ROADMAP
  // =========================================================================
  if (tab === "milestones") {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-950 border border-blue-200">
                14-Stage Incubation Roadmap
              </span>
              <span className="text-xs text-slate-500 font-medium">Evaluation Desk</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">Milestone Evidence Review</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review submitted evidence, validate testing telemetry, and calculate weighted progress scores.
            </p>
          </div>

          <button
            onClick={() => fetchMilestones(milestonesStartupId)}
            className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Milestones List */}
        <div className="space-y-3">
          {milestonesLoading ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 text-sm">
              Loading incubation stages...
            </div>
          ) : (
            milestones.map((m) => {
              const isCompleted = m.status === "COMPLETED";
              const isPending = m.status === "SUBMITTED_FOR_REVIEW" || m.status === "UNDER_REVIEW";

              return (
                <div
                  key={m.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        Stage {m.stageOrder}: {m.stageName}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isCompleted
                          ? "bg-emerald-100 text-emerald-800"
                          : isPending
                          ? "bg-amber-100 text-amber-800 animate-pulse"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {m.status.replace(/_/g, " ")}
                      </span>
                      <span className="text-xs text-slate-400">Weight: {m.weight}%</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                    <p className="text-xs text-slate-600">{m.description}</p>

                    {m.evidence && m.evidence.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {m.evidence.map((ev) => (
                          <a
                            key={ev.id}
                            href={ev.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-950 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded hover:bg-slate-100"
                          >
                            <FileCheck className="w-3 h-3 text-emerald-600" />
                            {ev.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setSelectedMilestone(m);
                        setReviewRemarks("");
                        setReviewModalOpen(true);
                      }}
                      className="px-3.5 py-2 text-xs font-bold rounded-xl bg-blue-950 text-white hover:bg-blue-900 transition flex items-center gap-1 shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Evaluate Stage
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* REVIEW MODAL */}
        {reviewModalOpen && selectedMilestone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                    Stage {selectedMilestone.stageOrder} Evaluation
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">{selectedMilestone.title}</h3>
                </div>
                <button onClick={() => setReviewModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">MIF Evaluation Committee Remarks</label>
                  <textarea
                    rows={4}
                    placeholder="Enter formal evaluation notes, technical recommendations, or approval rationale..."
                    value={reviewRemarks}
                    onChange={(e) => setReviewRemarks(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div className="pt-3 flex gap-2.5 justify-end">
                  <button
                    type="button"
                    onClick={() => handleReviewMilestone(false)}
                    disabled={reviewing}
                    className="px-4 py-2 rounded-xl bg-red-50 text-red-700 font-bold hover:bg-red-100 transition"
                  >
                    Reject / Request Revision
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReviewMilestone(true)}
                    disabled={reviewing}
                    className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
                  >
                    Approve Stage & Award Weight ({selectedMilestone.weight}%)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // TAB 3: MENTORS & SESSIONS
  // =========================================================================
  if (tab === "mentors") {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-950 border border-blue-200">
                Institutional Advisory
              </span>
              <span className="text-xs text-slate-500 font-medium">Board & Domain Mentors</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">Mentors & Advisory Sessions</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Track advisory engagements, log confidential meeting notes, and monitor action items.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSessionModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Log Mentoring Session
            </button>
          </div>
        </div>

        {/* Mentors Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mentors.map((m) => (
            <div key={m.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <img src={m.avatarUrl} alt={m.name} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{m.name}</h4>
                  <p className="text-xs text-slate-500">{m.designation}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2">{m.bio}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {m.areasOfExpertise.map((exp, i) => (
                  <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {exp}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sessions Log Table */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Historical Mentoring Sessions</h3>
          <div className="space-y-3">
            {sessions.map((sess) => (
              <div key={sess.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-950">{sess.mentorName} → {sess.startupName}</span>
                  <span className="text-slate-400">{new Date(sess.date).toLocaleDateString()}</span>
                </div>
                <p className="font-semibold text-slate-800">{sess.topic}</p>
                {sess.mentorFeedback && (
                  <p className="text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200 italic">
                    &ldquo;{sess.mentorFeedback}&rdquo;
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SESSION LOG MODAL */}
        {sessionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">Session Documentation</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">Record Mentoring Session</h3>
                </div>
                <button onClick={() => setSessionModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
              </div>

              <form onSubmit={handleLogSession} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Select Mentor</label>
                  <select
                    required
                    value={sessionMentorId}
                    onChange={(e) => setSessionMentorId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="">Choose mentor...</option>
                    {mentors.map((m) => (
                      <option key={m.id} value={m.id}>{m.name} ({m.organization})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Session Topic</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Flight Safety Compliance & RTH Algorithms"
                    value={sessionTopic}
                    onChange={(e) => setSessionTopic(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Internal Confidential Notes</label>
                  <textarea
                    rows={2}
                    placeholder="Notes visible only to administrators and mentors..."
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Mentor Feedback for Founder</label>
                  <textarea
                    rows={2}
                    placeholder="Recommendations shared with the startup..."
                    value={sessionFeedback}
                    onChange={(e) => setSessionFeedback(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div className="pt-3 flex gap-2.5 justify-end">
                  <button
                    type="button"
                    onClick={() => setSessionModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loggingSession}
                    className="px-5 py-2 rounded-xl bg-blue-950 text-white font-bold hover:bg-blue-900 transition"
                  >
                    {loggingSession ? "Saving..." : "Save Session"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // TAB 4: STORIES CMS & AI ASSISTANT
  // =========================================================================
  if (tab === "stories") {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-950 border border-orange-200">
                Editorial Showcase
              </span>
              <span className="text-xs text-slate-500 font-medium">Stories & Founder Interviews</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">From Ideas to Impact CMS</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Author and publish in-depth case studies with integrated AI drafting based on verified milestones.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAiModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              AI Story Assistant
            </button>
            <button
              onClick={() => setStoryModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Create Story
            </button>
          </div>
        </div>

        {/* Stories List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((s) => (
            <div key={s.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-950">{s.startupName}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  s.status === "PUBLISHED" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                }`}>
                  {s.status}
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900">{s.title}</h4>
              <p className="text-xs text-slate-600 line-clamp-2">{s.theBreakthrough}</p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/success-stories/${s.slug}`}
                  target="_blank"
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1"
                >
                  View Live Story <ExternalLink className="w-3 h-3" />
                </Link>
                <span className="text-[11px] text-slate-400">{new Date(s.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* AI STORY ASSISTANT MODAL */}
        {aiModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Non-Hallucinatory Synthesis
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">AI Success Story Assistant</h3>
                </div>
                <button onClick={() => setAiModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
              </div>

              <div className="space-y-4 text-xs">
                <p className="text-slate-600 leading-relaxed">
                  The AI Story Assistant analyzes the venture&apos;s verified milestones, official StartupTN grants, and mentor sessions to draft a factual case study adhering strictly to verified institutional evidence.
                </p>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Select Incubated Venture</label>
                  <select
                    value={aiStartupId}
                    onChange={(e) => setAiStartupId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="s_1795332004112">AeroDrone AI Labs (MASTER-SP-2026-0001)</option>
                    <option value="s_1795332004113">AgroSens Telemetry (MASTER-SP-2026-0002)</option>
                    <option value="s_1795332004114">ThermaGrid Analytics (MASTER-SP-2025-0001)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Founder Notes or Field Anecdotes (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Paste raw notes on field trials, farmer feedback, or technological hurdles..."
                    value={aiNotes}
                    onChange={(e) => setAiNotes(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div className="pt-3 flex gap-2.5 justify-end">
                  <button
                    type="button"
                    onClick={() => setAiModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleGenerateAiStory}
                    disabled={generatingAiStory}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold hover:from-orange-700 hover:to-amber-700 transition flex items-center gap-1.5"
                  >
                    {generatingAiStory ? "Drafting with AI..." : "Generate & Save to Drafts"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CREATE STORY MODAL */}
        {storyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">Editorial Publishing</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">Author Success Story</h3>
                </div>
                <button onClick={() => setStoryModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
              </div>

              <form onSubmit={handleSaveStory} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Story Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. From Campus Drone Club to Statewide AgriTech Trailblazer"
                    value={storyTitle}
                    onChange={(e) => {
                      setStoryTitle(e.target.value);
                      setStorySlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={storySlug}
                    onChange={(e) => setStorySlug(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">The Problem Identified</label>
                  <textarea
                    rows={2}
                    value={storyProblem}
                    onChange={(e) => setStoryProblem(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">The Breakthrough Solution</label>
                  <textarea
                    rows={2}
                    value={storyBreakthrough}
                    onChange={(e) => setStoryBreakthrough(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">MIF Incubation Journey</label>
                  <textarea
                    rows={2}
                    value={storyJourney}
                    onChange={(e) => setStoryJourney(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Founder Pull Quote</label>
                  <input
                    type="text"
                    value={storyQuote}
                    onChange={(e) => setStoryQuote(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>

                <div className="pt-3 flex gap-2.5 justify-end">
                  <button
                    type="button"
                    onClick={() => setStoryModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingStory}
                    className="px-5 py-2 rounded-xl bg-blue-950 text-white font-bold hover:bg-blue-900"
                  >
                    {savingStory ? "Publishing..." : "Publish Chronicle"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // TAB 5: ALUMNI GUILD
  // =========================================================================
  if (tab === "alumni") {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-950 border border-blue-200">
                Alumni Guild
              </span>
              <span className="text-xs text-slate-500 font-medium">Graduated Ventures & Network</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">Alumni Network & Connection Requests</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review graduated startups and monitor peer-to-peer connection requests.
            </p>
          </div>

          <button
            onClick={fetchAlumni}
            className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Alumni Profiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {alumniList.map((a) => (
            <div key={a.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">{a.graduationCohort}</span>
                <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {a.growthStatus}
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">{a.startupName}</h4>
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl text-center text-xs">
                <div>
                  <span className="font-bold text-slate-800 block">{a.currentHeadcount}</span>
                  <span className="text-[10px] text-slate-400">Team</span>
                </div>
                <div>
                  <span className="font-bold text-emerald-700 block">{a.totalCapitalRaised}</span>
                  <span className="text-[10px] text-slate-400">Capital</span>
                </div>
                <div>
                  <span className="font-bold text-blue-950 block">{a.currentRevenueRange}</span>
                  <span className="text-[10px] text-slate-400">ARR</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Incoming Connection Requests */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Incoming Connection Requests</h3>
          {connectionsList.length === 0 ? (
            <p className="text-xs text-slate-400">No active connection requests in inbox.</p>
          ) : (
            <div className="space-y-3">
              {connectionsList.map((c) => (
                <div key={c.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-950">{c.requesterName} ({c.requesterEmail}) → {c.startupName}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {c.status}
                    </span>
                  </div>
                  <p className="text-slate-600">{c.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
