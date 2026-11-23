"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Calendar,
  Clock,
  Printer,
  Share2,
  ExternalLink,
  ChevronRight,
  Award,
  Layers,
  FileCheck,
  Lock,
} from "lucide-react";

interface VerificationResponse {
  success: boolean;
  verified: boolean;
  status: string;
  issuer: string;
  hostInstitution: string;
  accreditation: string;
  campusLocation: string;
  passport: {
    passportId: string;
    startupName: string;
    slug: string;
    issuedAt: string;
    activationDate: string;
    lastVerifiedAt: string;
    totalVerifications: number;
    securityHash: string;
    status: string;
    remarks?: string;
    qrCodeData?: string;
  };
  founders: Array<{
    fullName: string;
    role: string;
    avatarUrl: string;
    linkedInUrl?: string;
  }>;
  journeySummary: {
    completionPercentage: number;
    completedStages: number;
    totalStages: number;
    currentStage: string;
  };
  verifiedAchievements: Array<{
    title: string;
    type: string;
    issuer: string;
    awardDate: string;
    grantAmount?: string;
  }>;
  verificationSeal: {
    authority: string;
    digitalTimestamp: string;
    tamperProofHash: string;
  };
}

export default function StartupPassportVerifyPage({
  params,
}: {
  params: { passportId: string };
}) {
  const { passportId } = params;
  const [data, setData] = useState<VerificationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function verify() {
      try {
        const res = await fetch(`/api/ecosystem/passports/verify/${passportId}`);
        const result = await res.json();
        if (result.success && result.verified) {
          setData(result);
        } else {
          setError(result.message || "This credential could not be verified in the active registry.");
        }
      } catch (err: any) {
        setError("Network error performing cryptographic registry lookup.");
      } finally {
        setLoading(false);
      }
    }
    verify();
  }, [passportId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24 pb-16 px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-blue-950 rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800">Verifying Cryptographic Credentials...</h2>
          <p className="text-sm text-slate-500 mt-1">Executing public verification check with MASTeR Incubation Foundation repository.</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24 pb-16 px-4">
        <div className="bg-white border-2 border-red-200 rounded-3xl p-8 max-w-lg text-center shadow-xl space-y-4">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Credential Verification Failed</h2>
          <p className="text-sm text-slate-600">
            {error || `Passport ID "${passportId}" is not currently recognized as an active incubated venture.`}
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/startups"
              className="px-5 py-2.5 rounded-xl bg-blue-950 text-white font-medium hover:bg-blue-900 text-sm transition"
            >
              Search Official Directory
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

  const { passport, founders, journeySummary, verifiedAchievements, verificationSeal } = data;

  return (
    <div className="min-h-screen bg-slate-50/70 pt-36 sm:pt-40 md:pt-44 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Print stylesheet */}
      <style jsx global>{`
        @media print {
          nav, footer, .no-print {
            display: none !important;
          }
          body {
            background: white !important;
          }
          .certificate-container {
            border: 4px double #091b34 !important;
            box-shadow: none !important;
            padding: 30px !important;
          }
        }
      `}</style>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Breadcrumb & Print */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 no-print">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition">MIF Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href={`/startup-passport/${passport.passportId}`} className="hover:text-slate-900 transition">
              Passport
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-emerald-700 font-bold">Public Verification</span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap self-stretch sm:self-auto">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 transition shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Print Verification Certificate</span>
            </button>
            <Link
              href={`/startup-passport/${passport.passportId}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-[#0f2c59] text-white hover:bg-blue-900 transition shadow-xs"
            >
              <span>View Full Passport Card</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* =========================================================================
            OFFICIAL CERTIFICATE OF VERIFICATION (Tamper-Evident Layout)
           ========================================================================= */}
        <div className="certificate-container relative bg-white border-4 border-double border-blue-950/20 rounded-3xl p-6 sm:p-12 shadow-2xl shadow-blue-950/5 space-y-8 overflow-hidden">
          {/* Institutional Crest & Seal Header */}
          <div className="text-center space-y-2 border-b-2 border-slate-200 pb-8 relative">
            <div className="flex justify-center mb-3">
              <img
                src="/logos/official-mif-logo.png"
                alt="MASTeR Incubation Foundation Crest"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-xs"
              />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-black uppercase tracking-widest mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Officially Verified Credential
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
              MASTeR Incubation Foundation
            </h1>
            <p className="text-sm font-bold text-[#0f2c59]">
              M.A.M. College of Engineering & Technology (MAMCET)
            </p>
            <p className="text-xs text-slate-500 max-w-xl mx-auto font-medium">
              StartupTN Pre-Incubation Centre · MSME Recognized Host Institute · Siruganur, Trichy, Tamil Nadu
            </p>
          </div>

          {/* Verification Statement */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Institutional Attestation</p>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              This document officially certifies that the technology venture named below has been thoroughly vetted, admitted, and maintained as an accredited incubated startup in good standing under the MASTeR Incubation Foundation.
            </p>
          </div>

          {/* Venture Title & Passport ID Plaque */}
          <div className="bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-50 border-2 border-blue-900/15 rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-xs">
            <div className="flex items-center justify-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-700 bg-red-100/90 px-3 py-0.5 rounded-full border border-red-200">
                Attested Incubated Venture
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
              {passport.startupName}
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400">Passport Number:</span>
                <span className="text-lg sm:text-xl font-mono font-black text-[#0f2c59] tracking-wider">
                  {passport.passportId}
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Status: {passport.status}</span>
              </div>
            </div>
          </div>

          {/* Verification Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Passport Status</span>
              <span className="text-sm font-extrabold text-emerald-700 flex items-center gap-1.5 mt-1">
                <CheckCircle2 className="w-4 h-4" /> {passport.status}
              </span>
            </div>
            <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Activation Date</span>
              <span className="text-sm font-bold text-slate-800 mt-1 block">
                {new Date(passport.activationDate).toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Roadmap Score</span>
              <span className="text-sm font-bold text-[#0f2c59] mt-1 block">
                {journeySummary.completionPercentage}% ({journeySummary.completedStages}/{journeySummary.totalStages} Stages)
              </span>
            </div>
            <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Audit Verifications</span>
              <span className="text-sm font-bold text-slate-800 mt-1 block">
                {passport.totalVerifications} inspections
              </span>
            </div>
          </div>

          {/* Verified Achievements */}
          {verifiedAchievements.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Validated Institutional Grants & Recognitions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {verifiedAchievements.map((ach, i) => (
                  <div key={i} className="border border-slate-200 rounded-xl p-3.5 bg-white flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{ach.title}</p>
                      <p className="text-[11px] text-slate-500">
                        {ach.issuer} {ach.grantAmount ? `· ${ach.grantAmount}` : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Founders (Privacy-Sanitized) */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Attested Core Innovators
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {founders.map((f, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-3 bg-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                    <img src={f.avatarUrl} alt={f.fullName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{f.fullName}</p>
                    <p className="text-[11px] font-semibold text-red-600">{f.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cryptographic Seal, Live QR & Signatures */}
          <div className="border-t-2 border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Tamper-proof hash */}
            <div className="space-y-1 text-center md:text-left flex-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Cryptographic Fingerprint</span>
              <p className="font-mono text-xs text-slate-700 break-all bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 inline-block">
                {verificationSeal.tamperProofHash}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                Verified at: {new Date(verificationSeal.digitalTimestamp).toUTCString()}
              </p>
            </div>

            {/* Center: Real QR Code */}
            {passport.qrCodeData && (
              <div className="text-center shrink-0">
                <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-xs inline-block">
                  <img
                    src={passport.qrCodeData}
                    alt="Certificate QR Verification"
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block mt-1">Scan to Verify</span>
              </div>
            )}

            {/* Right: Institutional Signature */}
            <div className="text-center md:text-right space-y-1 shrink-0">
              <div className="w-40 border-b border-slate-900 mx-auto md:ml-auto mb-1" />
              <p className="text-xs font-black text-slate-900">Dr. R. Rajavel</p>
              <p className="text-[10.5px] font-medium text-slate-600">Director of Incubation & Innovation</p>
              <p className="text-[10px] font-bold text-slate-400">MASTeR Incubation Foundation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
