"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  Clock,
  Rocket,
  ShieldCheck,
  Building2,
  ArrowRight,
  ArrowLeft,
  Mail,
  Phone,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function StatusTrackerContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "";

  const [query, setQuery] = useState(initialId);
  const [loading, setLoading] = useState(false);
  const [appData, setAppData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = async (lookupQuery: string) => {
    if (!lookupQuery.trim()) return;
    setLoading(true);
    setErrorMsg(null);
    setAppData(null);

    try {
      const isEmail = lookupQuery.includes("@");
      const param = isEmail
        ? `email=${encodeURIComponent(lookupQuery.trim())}`
        : `id=${encodeURIComponent(lookupQuery.trim())}`;

      const res = await fetch(`/api/applications?${param}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(
          json.error || "No active application found matching this identifier."
        );
      }

      setAppData(json.data);
    } catch (err: any) {
      setErrorMsg(
        err.message || "Failed to find application. Please check your tracking ID or email."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialId) {
      handleSearch(initialId);
    }
  }, [initialId]);

  // Stepper Calculation
  const getStageStep = (status: string) => {
    switch (status) {
      case "SUBMITTED":
        return 1;
      case "UNDER_REVIEW":
        return 2;
      case "SHORTLISTED_FOR_PITCH":
        return 3;
      case "INCUBATED":
        return 4;
      case "REJECTED":
        return -1;
      default:
        return 1;
    }
  };

  const currentStep = appData ? getStageStep(appData.status) : 1;

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Incubation Application Portal</span>
          </Link>
        </div>

        {/* Title Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-[11px] font-mono font-bold border border-orange-200 uppercase tracking-widest inline-block mb-2">
            MIF Founder Tracker
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 font-display">
            Track Incubation Application Status
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Real-time screening progress for applicant ventures at MASTeR Incubation Foundation (MIF), MAMCET Siruganur.
          </p>
        </div>

        {/* Search Bar Box */}
        <div className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Application ID (e.g. app-101) or Founder Email..."
                className="pl-10 h-11 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold h-11 px-6 rounded-xl text-xs gap-2 shrink-0 shadow-sm"
            >
              {loading ? (
                <span>Checking...</span>
              ) : (
                <>
                  <span>Track Status</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <p className="text-[11px] text-slate-500 mt-2 px-1">
            Tip: Your Application ID was emailed to you upon form submission (e.g. <span className="font-mono font-bold text-slate-700">app-101</span>).
          </p>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3 mb-8 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <div className="flex-1 font-medium">{errorMsg}</div>
          </div>
        )}

        {/* Live Application Status Result Card */}
        {appData && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-300">
            {/* Top Bar with Venture Name & Current Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] font-bold text-slate-400">
                    ID: {appData.id}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-[10px] font-mono text-slate-500">
                    Submitted: {new Date(appData.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 font-display">
                  {appData.startupName}
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Founder: <strong className="text-slate-800">{appData.founderName}</strong> · Track: {appData.category ? appData.category.replace(/_/g, " ") : "Technology"}
                </p>
              </div>

              <div>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border shadow-2xs ${
                    appData.status === "INCUBATED"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                      : appData.status === "SHORTLISTED_FOR_PITCH"
                      ? "bg-blue-50 text-blue-700 border-blue-300"
                      : appData.status === "UNDER_REVIEW"
                      ? "bg-amber-50 text-amber-700 border-amber-300"
                      : appData.status === "REJECTED"
                      ? "bg-rose-50 text-rose-700 border-rose-300"
                      : "bg-purple-50 text-purple-700 border-purple-300"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                  <span>{appData.status.replace(/_/g, " ")}</span>
                </span>
              </div>
            </div>

            {/* Visual Step-by-Step Pipeline Progress Tracker */}
            {appData.status !== "REJECTED" ? (
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                  Incubation Screening Roadmap
                </h3>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                  {/* Step 1: Submission */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">1. Intake Submission Logged</h4>
                      <p className="text-xs text-slate-500">
                        Proposal recorded in MIF screening pipeline and automated confirmation email dispatched.
                      </p>
                    </div>
                  </div>

                  {/* Step 2: Technical Committee Screening */}
                  <div className="relative">
                    <div
                      className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shadow-xs ${
                        currentStep >= 2
                          ? "bg-emerald-500 text-white"
                          : currentStep === 1
                          ? "bg-amber-500 text-white animate-pulse"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {currentStep > 2 ? "✓" : "2"}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">2. Technical & Commercial Viability Review</h4>
                      <p className="text-xs text-slate-500">
                        Evaluated by Incubation Manager and Faculty Technical Committee for problem-solution fit and prototyping needs.
                      </p>
                    </div>
                  </div>

                  {/* Step 3: Pitch Shortlist */}
                  <div className="relative">
                    <div
                      className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shadow-xs ${
                        currentStep >= 3
                          ? "bg-emerald-500 text-white"
                          : currentStep === 2
                          ? "bg-blue-500 text-white animate-pulse"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {currentStep > 3 ? "✓" : "3"}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">3. Pitch Presentation Committee</h4>
                      <p className="text-xs text-slate-500">
                        Formal presentation before the MIF Advisory Board for incubation selection and seed grant endorsement.
                      </p>
                    </div>
                  </div>

                  {/* Step 4: Final Induction */}
                  <div className="relative">
                    <div
                      className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shadow-xs ${
                        currentStep === 4
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {currentStep === 4 ? "✓" : "4"}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">4. Incubation Induction & Seed Facilitation</h4>
                      <p className="text-xs text-slate-500">
                        Execution of Incubation Agreement, workstation & fabrication lab allocation, and TANSEED / MSME grant sponsorship.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-900">Application Archived</div>
                <p>
                  This application was reviewed by the committee and not selected for this cohort intake. You are encouraged to iterate and re-apply in future intake cycles.
                </p>
              </div>
            )}

            {/* Institutional Help Desk Strip */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900">Have questions about your screening status?</div>
                <div className="text-[11px] text-slate-500">
                  Coordinator: Ms. Hemalatha Balakrishnan · Manager: Mr. M. Santhosh Kumar
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="tel:+919361697702"
                  className="font-mono text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>+91 9361697702</span>
                </a>
                <a
                  href="mailto:contact@masterincubation.org"
                  className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5 text-orange-600" />
                  <span>Email Desk</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function ApplicationStatusPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-xs text-slate-500">Loading tracking portal...</div>}>
      <StatusTrackerContent />
    </Suspense>
  );
}
