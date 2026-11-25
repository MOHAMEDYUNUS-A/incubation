"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  startupApplicationSchema,
  StartupApplicationFormValues,
} from "@/lib/validations/applicationSchema";
import { FOCUS_AREAS } from "@/lib/db/mockData";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Mail,
  Search,
  Sparkles,
  ShieldCheck,
  Cpu,
  Zap,
  Leaf,
  Wrench,
  Clock,
  RotateCcw,
  HelpCircle,
  X,
  ExternalLink,
  Award,
  Info,
  Check,
  ChevronDown,
  Building2,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeUp, XYZCard } from "@/components/animations/LightAnimations";

// Background Running Imagery (Authentic MAMCET Campus, Prototyping Labs & Cohort Sessions)
const MARQUEE_ROW_1 = [
  { img: "/images/incubation/main-hero-section.jpeg", label: "Prototyping Bay" },
  { img: "/images/incubation/startup-main.jpeg", label: "IoT & Hardware Bench" },
  { img: "/images/incubation/mamcet-main-campus.jpg", label: "MAMCET Institutional Campus" },
  { img: "/images/incubation/incubation-workspace.jpeg", label: "Resident Desks" },
  { img: "/images/incubation/main-student-hero-section.jpeg", label: "Student Creators" },
  { img: "/images/incubation/img-43.jpeg", label: "Industry MoU Execution" },
  { img: "/images/incubation/infrastructure.jpeg", label: "FabLab Facilities" },
  { img: "/images/incubation/startup-1.jpeg", label: "Seed Pitch Arena" },
];

const MARQUEE_ROW_2 = [
  { img: "/images/incubation/incubation-centre.jpeg", label: "Innovation Centre" },
  { img: "/images/incubation/hero-section-main.jpeg", label: "Resident Startups" },
  { img: "/images/incubation/img-21.jpeg", label: "Hardware Validation" },
  { img: "/images/incubation/team-of-incubation.jpeg", label: "MIF Mentorship Desk" },
  { img: "/images/incubation/img-32.jpeg", label: "Electronics Calibration" },
  { img: "/images/incubation/img-33.jpeg", label: "Additive 3D Bay" },
  { img: "/images/incubation/img-54.jpeg", label: "Hackathon Assembly" },
  { img: "/images/incubation/ragupathy.jpeg", label: "State Ministerial Dedication" },
];

// Interactive Track Highlights
const TRACK_BENEFITS: Record<string, { grant: string; labs: string; mentor: string }> = {
  AI_DATA_SCIENCE: {
    grant: "TANSEED ₹10L & IVP-A ₹2L",
    labs: "High-Throughput Computing & AI Lab",
    mentor: "Dr. P. Lilly Florence (AI Architecture)",
  },
  ELECTRONICS_IOT_SMART: {
    grant: "TANSEED ₹10L & MSME Hackathon ₹15L",
    labs: "LoRaWAN Gateway & Multi-Layer PCB Station",
    mentor: "Ms. Hemalatha Balakrishnan (IoT Hardware)",
  },
  RENEWABLE_ENERGY_CLEAN_TECH: {
    grant: "MSME Idea Hackathon ₹15L",
    labs: "Battery Testing Bays & Solar Telemetry",
    mentor: "CleanTech Advisory Council",
  },
  ADVANCED_MANUFACTURING: {
    grant: "MSME Seed Support ₹15L",
    labs: "Additive 3D Printers & CNC Machining",
    mentor: "Dr. S. Ravimaran (Rapid Tooling)",
  },
  DIGITAL_TECH_SOFTWARE: {
    grant: "StartupTN TANSEED 4.0 (₹10L)",
    labs: "Cloud DevSecOps & Software Lab",
    mentor: "IITMIC Enterprise Software Network",
  },
  SUSTAINABLE_INFRASTRUCTURE: {
    grant: "EDII-TN IVP-B & Seed Syndicate",
    labs: "Materials Testing & Smart Sensors",
    mentor: "Civil & Environmental Advisory",
  },
  OTHER_ENGINEERING_INNOVATION: {
    grant: "TANSEED Pre-Seed ₹10L",
    labs: "Multi-Disciplinary Prototyping Bay",
    mentor: "Incubation Directorate Panel",
  },
};

// FAQ Items
const APPLICATION_FAQS = [
  {
    q: "Who is eligible to apply for incubation at MIF?",
    a: "Undergraduate and postgraduate engineering students, faculty researchers, alumni, and independent regional entrepreneurs across Tamil Nadu with innovative hardware or software concepts are eligible.",
  },
  {
    q: "Do I need an already incorporated company before applying?",
    a: "No. You can apply at the Ideation or Proof-of-Concept stage. Once accepted into our pre-incubation cohort, MIF assists you with formal Private Limited incorporation, StartupTN portal registration, and DPIIT recognition.",
  },
  {
    q: "What non-dilutive seed funding can my startup access?",
    a: "Eligible cohort startups receive direct institutional sponsorship and line-by-line grant proposal review for StartupTN TANSEED (₹10 Lakhs to ₹15 Lakhs), Ministry of MSME Idea Hackathon (up to ₹15 Lakhs), and EDII-TN IVP-A/B vouchers.",
  },
  {
    q: "What physical facilities are provided at MAMCET campus?",
    a: "Selected ventures receive dedicated plug-and-play desks in our 4,000 sq.ft. facility, high-speed gigabit networking, 3D printing, PCB milling, electronic test instruments, 15-seater conference boardroom, and access to all 7 departmental testing laboratories.",
  },
];

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // New Feature States
  const [activeTrackTab, setActiveTrackTab] = useState<string>("ELECTRONICS_IOT_SMART");
  const [draftSavedTime, setDraftSavedTime] = useState<string | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showCriteriaModal, setShowCriteriaModal] = useState(false);
  const [statusLookupQuery, setStatusLookupQuery] = useState("");
  const [statusLookupResult, setStatusLookupResult] = useState<any>(null);
  const [statusLookupLoading, setStatusLookupLoading] = useState(false);
  const [statusLookupError, setStatusLookupError] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<StartupApplicationFormValues>({
    resolver: zodResolver(startupApplicationSchema),
    defaultValues: {
      collegeOrEntity: "MAMCET",
      coFoundersCount: 1,
      stage: "IDEATION",
      category: "ELECTRONICS_IOT_SMART",
    },
  });

  const formValues = watch();

  // Feature: Auto-Save Draft to Local Storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mif_incubation_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.data && !submittedData) {
          reset(parsed.data);
          setDraftSavedTime(parsed.time || "Recently");
        }
      }
    } catch {
      // LocalStorage access failsafe
    }
  }, [reset, submittedData]);

  const handleSaveDraft = () => {
    try {
      const draftPayload = {
        data: formValues,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      localStorage.setItem("mif_incubation_draft", JSON.stringify(draftPayload));
      setDraftSavedTime(draftPayload.time);
    } catch {
      // ignore storage error
    }
  };

  const handleClearDraft = () => {
    try {
      localStorage.removeItem("mif_incubation_draft");
      setDraftSavedTime(null);
      reset({
        collegeOrEntity: "MAMCET",
        coFoundersCount: 1,
        stage: "IDEATION",
        category: "ELECTRONICS_IOT_SMART",
      });
    } catch {
      // ignore
    }
  };

  // Feature: Real-time Application Strength Score (0 - 100%)
  const applicationStrength = useMemo(() => {
    let score = 0;
    if (formValues.founderName && formValues.founderName.length > 2) score += 15;
    if (formValues.founderEmail && formValues.founderEmail.includes("@")) score += 10;
    if (formValues.founderPhone && formValues.founderPhone.length >= 10) score += 10;
    if (formValues.startupName && formValues.startupName.length > 2) score += 15;
    if (formValues.category) score += 10;
    if (formValues.problemStatement && formValues.problemStatement.length >= 30) score += 15;
    if (formValues.proposedSolution && formValues.proposedSolution.length >= 30) score += 15;
    if (formValues.targetMarket && formValues.targetMarket.length >= 20) score += 10;
    if (formValues.pitchDeckUrl && formValues.pitchDeckUrl.length > 5) score += 5;
    return Math.min(score, 100);
  }, [formValues]);

  // Feature: Quick Status Lookup
  const handleQuickStatusLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusLookupQuery.trim()) return;

    setStatusLookupLoading(true);
    setStatusLookupError(null);
    setStatusLookupResult(null);

    try {
      const isEmail = statusLookupQuery.includes("@");
      const param = isEmail
        ? `email=${encodeURIComponent(statusLookupQuery.trim())}`
        : `id=${encodeURIComponent(statusLookupQuery.trim())}`;

      const res = await fetch(`/api/applications?${param}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "No application record found for this identifier.");
      }

      setStatusLookupResult(json.data);
    } catch (err: any) {
      setStatusLookupError(err.message || "Failed to locate application.");
    } finally {
      setStatusLookupLoading(false);
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) {
      fieldsToValidate = [
        "founderName",
        "founderEmail",
        "founderPhone",
        "collegeOrEntity",
      ];
    } else if (step === 2) {
      fieldsToValidate = ["startupName", "category", "stage"];
    } else if (step === 3) {
      fieldsToValidate = ["problemStatement", "proposedSolution", "targetMarket"];
    }

    const valid = await trigger(fieldsToValidate);
    if (valid) {
      handleSaveDraft();
      setStep((prev) => prev + 1);
      setErrorMsg(null);
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const onSubmit = async (data: StartupApplicationFormValues) => {
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(
          typeof result.error === "string"
            ? result.error
            : "Failed to submit application. Please review fields."
        );
      }

      try {
        localStorage.removeItem("mif_incubation_draft");
      } catch {
        // ignore
      }

      setSubmittedData(result.data);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden pt-28 sm:pt-32 pb-24">
      {/* =========================================================================
          CONTINUOUS RUNNING BACKGROUND IMAGERY (PROFESSIONAL MULTI-ROW MARQUEE REEL)
         ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-25">
        <div className="space-y-6 sm:space-y-8 -rotate-1 scale-105 transform origin-center">
          {/* Row 1: Flowing Left-to-Right */}
          <div className="flex w-max gap-6 animate-marquee-ltr">
            {[...MARQUEE_ROW_1, ...MARQUEE_ROW_1, ...MARQUEE_ROW_1].map((item, idx) => (
              <div
                key={`bg-r1-${idx}`}
                className="relative w-72 sm:w-88 md:w-96 aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shrink-0 bg-slate-900"
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-full object-cover filter brightness-90 contrast-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[10px] font-mono text-white/80 font-bold uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Flowing Right-to-Left */}
          <div className="flex w-max gap-6 animate-marquee-rtl">
            {[...MARQUEE_ROW_2, ...MARQUEE_ROW_2, ...MARQUEE_ROW_2].map((item, idx) => (
              <div
                key={`bg-r2-${idx}`}
                className="relative w-72 sm:w-88 md:w-96 aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shrink-0 bg-slate-900"
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-full object-cover filter brightness-90 contrast-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[10px] font-mono text-white/80 font-bold uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Row 3: Gentle Slow Flow */}
          <div className="flex w-max gap-6 animate-marquee-ltr-slow hidden lg:flex">
            {[...MARQUEE_ROW_1, ...MARQUEE_ROW_2].map((item, idx) => (
              <div
                key={`bg-r3-${idx}`}
                className="relative w-80 aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shrink-0 bg-slate-900"
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-full object-cover filter brightness-85"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Ambient Dark-Blue & Burgundy Atmospheric Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#061224]/92 via-[#091b34]/85 to-[#040c18]/94 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#772b38]/25 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* =========================================================================
          FOREGROUND CONTENT: HERO MASTHEAD, APPLICATION FORM & FEATURES
         ========================================================================= */}
      <div className="relative z-10 container max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Masthead */}
        <FadeUp className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          {/* Institutional Accreditation Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-white tracking-wide">
              StartupTN Recognized Pre-Incubation Centre · MAMCET Campus, Siruganur
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white font-display tracking-tight leading-[1.1] [text-shadow:_0_2px_14px_rgba(0,0,0,0.9)]">
            Apply for Incubation at{" "}
            <span className="text-[#ff8097]">MIF</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-2xl mx-auto [text-shadow:_0_1px_6px_rgba(0,0,0,0.8)]">
            Convert benchtop engineering prototypes and bold research into venture-funded enterprises with 4,000 sq.ft. of prototyping bays, TANSEED seed grants, and 1-on-1 industry mentorship.
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setShowStatusModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-xs font-bold text-white transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#ff8097]" />
              <span>Track Application Status</span>
            </button>

            <button
              onClick={() => setShowCriteriaModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-xs font-bold text-white transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Review Screening Criteria</span>
            </button>
          </div>

          {/* 4 Pillars Trust Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/15 text-left">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-base sm:text-lg font-black text-[#ff8097] block font-display">Up to ₹15L</span>
              <span className="text-[11px] text-slate-300 font-medium leading-tight block">MSME & TANSEED Grants</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-base sm:text-lg font-black text-cyan-300 block font-display">4,000 Sq.Ft.</span>
              <span className="text-[11px] text-slate-300 font-medium leading-tight block">Hardware Prototyping Labs</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-base sm:text-lg font-black text-emerald-300 block font-display">15+ Desks</span>
              <span className="text-[11px] text-slate-300 font-medium leading-tight block">24/7 Dedicated Coworking</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-base sm:text-lg font-black text-amber-300 block font-display">5 Working Days</span>
              <span className="text-[11px] text-slate-300 font-medium leading-tight block">Expedited Screening SLA</span>
            </div>
          </div>
        </FadeUp>

        {submittedData ? (
          /* =========================================================================
              SUBMISSION CONFIRMATION CARD
             ========================================================================= */
          <div className="p-8 sm:p-12 rounded-3xl bg-white text-slate-900 border-2 border-emerald-500 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Application Registered Successfully
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
                Welcome to the MIF Screening Pipeline, {submittedData.founderName}!
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
                Your application for <strong>{submittedData.startupName}</strong> has been logged with Official Application ID:
              </p>
              <div className="inline-block font-mono text-base sm:text-lg font-bold text-blue-900 bg-blue-50 px-4 py-1.5 rounded-xl border border-blue-200 shadow-inner">
                {submittedData.id}
              </div>
            </div>

            {/* Email Confirmation Notice */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center justify-center gap-2 max-w-lg mx-auto font-medium">
              <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                An official receipt with tracking credentials has been sent to <strong>{submittedData.founderEmail}</strong>.
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-700 space-y-2.5 max-w-lg mx-auto">
              <div className="font-bold text-slate-900 uppercase text-[11px] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#772b38]" />
                <span>Next Steps in the Incubation Workflow:</span>
              </div>
              <p>
                <strong>1. Technical Dossier Review:</strong> Incubation Manager Mr. M. Santhosh Kumar and the faculty advisory board will review technical viability within 5 working days.
              </p>
              <p>
                <strong>2. Pitch Presentation:</strong> Shortlisted founders will receive an invitation to pitch at the MIF Conference Boardroom (or virtually via video).
              </p>
              <p>
                <strong>3. Cohort Induction:</strong> Approved ventures are assigned dedicated desks, maker lab workbenches, and TANSEED / MSME grant proposal clinics.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={`/apply/status?id=${encodeURIComponent(submittedData.id)}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#772b38] hover:bg-[#5e212b] text-white font-bold h-12 px-7 rounded-xl text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02]"
              >
                <Search className="w-4 h-4" />
                <span>Track Live Application Status</span>
              </Link>
              <Button
                onClick={() => {
                  setSubmittedData(null);
                  setStep(1);
                }}
                variant="outline"
                className="w-full sm:w-auto border-slate-300 text-slate-700 font-semibold h-12 px-6 rounded-xl text-xs sm:text-sm"
              >
                Submit Another Application
              </Button>
            </div>
          </div>
        ) : (
          /* =========================================================================
              CLEAN MULTI-STEP APPLICATION FORM WITH LIVE STRENGTH METER & FEATURES
             ========================================================================= */
          <div className="space-y-6">
            {/* Top Interactive Feature: Track Benefits Inspector */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#ff8097]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Explore Support by Innovation Track
                  </span>
                </div>
                <span className="text-[11px] text-slate-300">
                  Select your sector to view allocated funding & labs:
                </span>
              </div>

              {/* Track Pills */}
              <div className="flex flex-wrap gap-2 mb-3">
                {FOCUS_AREAS.map((fa) => (
                  <button
                    key={fa.categoryKey}
                    type="button"
                    onClick={() => {
                      setActiveTrackTab(fa.categoryKey);
                      setValue("category", fa.categoryKey as any);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTrackTab === fa.categoryKey
                      ? "bg-[#772b38] text-white shadow-md border border-[#ff8097]/40 scale-105"
                      : "bg-white/5 text-slate-300 hover:bg-white/15 border border-white/10"
                      }`}
                  >
                    {fa.title}
                  </button>
                ))}
              </div>

              {/* Active Track Benefits Box */}
              {TRACK_BENEFITS[activeTrackTab] && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-amber-300 block">Eligible Grant Pipeline</span>
                    <span className="font-semibold text-white">{TRACK_BENEFITS[activeTrackTab].grant}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-cyan-300 block">Dedicated Facilities</span>
                    <span className="font-semibold text-white">{TRACK_BENEFITS[activeTrackTab].labs}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-[#ff8097] block">Empaneled Advisor</span>
                    <span className="font-semibold text-white">{TRACK_BENEFITS[activeTrackTab].mentor}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Main Form Container Card */}
            <div className="p-6 sm:p-10 rounded-3xl bg-white text-slate-900 border border-slate-200/90 shadow-2xl relative">
              {/* Application Readiness Score Header Bar */}
              <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-slate-50 via-slate-100/80 to-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800">
                      Application Quality Score:
                    </span>
                    <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${applicationStrength >= 80
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : applicationStrength >= 50
                        ? "bg-amber-100 text-amber-800 border border-amber-300"
                        : "bg-slate-200 text-slate-700"
                      }`}>
                      {applicationStrength}% · {applicationStrength >= 80 ? "Investor Ready" : applicationStrength >= 50 ? "Good Progress" : "Initial Draft"}
                    </span>
                  </div>
                  <div className="w-48 sm:w-64 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${applicationStrength >= 80 ? "bg-emerald-500" : applicationStrength >= 50 ? "bg-amber-500" : "bg-[#772b38]"
                        }`}
                      style={{ width: `${applicationStrength}%` }}
                    />
                  </div>
                </div>

                {/* Draft auto-save status & action */}
                <div className="flex items-center gap-2 text-xs">
                  {draftSavedTime ? (
                    <span className="text-emerald-700 flex items-center gap-1 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      Draft saved ({draftSavedTime})
                    </span>
                  ) : (
                    <span className="text-slate-400">Auto-saves as you type</span>
                  )}
                  {draftSavedTime && (
                    <button
                      type="button"
                      onClick={handleClearDraft}
                      className="text-slate-400 hover:text-red-600 transition-colors underline font-medium"
                      title="Clear saved draft from browser"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Step Navigation Tabs */}
              <div className="grid grid-cols-4 gap-2 mb-8 pb-4 border-b border-slate-200">
                {[
                  { s: 1, title: "Founder & Team" },
                  { s: 2, title: "Venture Profile" },
                  { s: 3, title: "Tech & Market" },
                  { s: 4, title: "Facilities & Submit" },
                ].map((item) => (
                  <div
                    key={item.s}
                    onClick={() => {
                      if (item.s < step) setStep(item.s);
                    }}
                    className={`text-center pb-2.5 border-b-2 transition-all cursor-pointer ${step === item.s
                      ? "border-[#772b38] text-[#772b38] font-bold"
                      : step > item.s
                        ? "border-emerald-500 text-emerald-700 font-semibold"
                        : "border-slate-200 text-slate-400 font-normal cursor-not-allowed"
                      }`}
                  >
                    <span className="text-[10px] uppercase tracking-wider block">
                      Step 0{item.s}
                    </span>
                    <span className="text-xs truncate hidden sm:inline">{item.title}</span>
                  </div>
                ))}
              </div>

              {errorMsg && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 mb-6">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* STEP 1: Founder & Team Info */}
                {step === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-900">
                        Step 1: Founder & Innovator Details
                      </h3>
                      <span className="text-xs text-slate-500 font-medium">* Required fields</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Primary Founder / Lead Innovator *
                        </label>
                        <Input
                          {...register("founderName")}
                          placeholder="e.g. Arun Kumar"
                          className="h-11 rounded-xl text-xs"
                        />
                        {errors.founderName && (
                          <span className="text-[11px] text-rose-600 mt-1 block">
                            {errors.founderName.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Official Email Address *
                        </label>
                        <Input
                          type="email"
                          {...register("founderEmail")}
                          placeholder="e.g. arun.ece@mamcet.edu.in"
                          className="h-11 rounded-xl text-xs"
                        />
                        {errors.founderEmail && (
                          <span className="text-[11px] text-rose-600 mt-1 block">
                            {errors.founderEmail.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Contact WhatsApp / Phone Number *
                        </label>
                        <Input
                          {...register("founderPhone")}
                          placeholder="+91 9842100000"
                          className="h-11 rounded-xl text-xs"
                        />
                        {errors.founderPhone && (
                          <span className="text-[11px] text-rose-600 mt-1 block">
                            {errors.founderPhone.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Total Co-Founders / Core Team Size
                        </label>
                        <Input
                          type="number"
                          min={1}
                          max={10}
                          {...register("coFoundersCount")}
                          className="h-11 rounded-xl text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        College / Department / Organization *
                      </label>
                      <Input
                        {...register("collegeOrEntity")}
                        placeholder="e.g. M.A.M. College of Engineering & Technology (ECE Dept)"
                        className="h-11 rounded-xl text-xs"
                      />
                      {errors.collegeOrEntity && (
                        <span className="text-[11px] text-rose-600 mt-1 block">
                          {errors.collegeOrEntity.message}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 2: Venture Profile */}
                {step === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-900">
                        Step 2: Startup & Technology Profile
                      </h3>
                      <span className="text-xs text-slate-500 font-medium">Domain Track & TRL</span>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Startup / Project Name *
                      </label>
                      <Input
                        {...register("startupName")}
                        placeholder="e.g. AgroSens Telemetry"
                        className="h-11 rounded-xl text-xs"
                      />
                      {errors.startupName && (
                        <span className="text-[11px] text-rose-600 mt-1 block">
                          {errors.startupName.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Select MIF Focus Area / Track *
                      </label>
                      <select
                        {...register("category")}
                        className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 shadow-xs focus:ring-2 focus:ring-[#772b38]"
                      >
                        {FOCUS_AREAS.map((fa) => (
                          <option key={fa.categoryKey} value={fa.categoryKey}>
                            {fa.title}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <span className="text-[11px] text-rose-600 mt-1 block">
                          {errors.category.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Current Technology Readiness Level (TRL) / Stage *
                      </label>
                      <select
                        {...register("stage")}
                        className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 shadow-xs focus:ring-2 focus:ring-[#772b38]"
                      >
                        <option value="IDEATION">Ideation (Structured concept & napkin sketch)</option>
                        <option value="PROOF_OF_CONCEPT">Proof of Concept (TRL-3 benchtop experiment)</option>
                        <option value="PROTOTYPE_MVP">Prototype / MVP (TRL-4 to TRL-5 working model)</option>
                        <option value="EARLY_TRACTION">Early Traction (Pilot client trials & LOIs signed)</option>
                        <option value="SCALING">Scaling (Incorporated Private Limited with active revenue)</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* STEP 3: Problem & Solution */}
                {step === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-900">
                        Step 3: Engineering Innovation & Problem Fit
                      </h3>
                      <button
                        type="button"
                        onClick={() => setShowCriteriaModal(true)}
                        className="text-xs text-[#772b38] hover:underline font-bold flex items-center gap-1"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>View Review Rubric</span>
                      </button>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Problem Statement * (Minimum 30 characters)
                      </label>
                      <Textarea
                        {...register("problemStatement")}
                        rows={3}
                        placeholder="What friction, agricultural challenge, or industrial inefficiency are you solving?"
                        className="rounded-xl text-xs"
                      />
                      {errors.problemStatement && (
                        <span className="text-[11px] text-rose-600 mt-1 block">
                          {errors.problemStatement.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Proposed Technical Solution & Architecture * (Minimum 30 characters)
                      </label>
                      <Textarea
                        {...register("proposedSolution")}
                        rows={3}
                        placeholder="Describe your hardware architecture, sensor mesh, microcontroller, or ML algorithm..."
                        className="rounded-xl text-xs"
                      />
                      {errors.proposedSolution && (
                        <span className="text-[11px] text-rose-600 mt-1 block">
                          {errors.proposedSolution.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Target Market & Beneficiaries * (Minimum 20 characters)
                      </label>
                      <Textarea
                        {...register("targetMarket")}
                        rows={2}
                        placeholder="Who are your initial paying customers or industrial beneficiaries in Tamil Nadu?"
                        className="rounded-xl text-xs"
                      />
                      {errors.targetMarket && (
                        <span className="text-[11px] text-rose-600 mt-1 block">
                          {errors.targetMarket.message}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 4: Facility Needs & Pitch Link */}
                {step === 4 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h3 className="text-lg font-bold text-slate-900">
                      Step 4: Prototyping Bay Needs & Pitch Deck
                    </h3>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Specific MAMCET Lab or Testing Facility Needed (Optional)
                      </label>
                      <Input
                        {...register("labRequirement")}
                        placeholder="e.g. 3D printer access, PCB soldering bay, spectrum analyzer"
                        className="h-11 rounded-xl text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Seed Funding Target (Optional)
                        </label>
                        <Input
                          {...register("fundingNeeded")}
                          placeholder="e.g. ₹5,00,000 (TANSEED grant)"
                          className="h-11 rounded-xl text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Pitch Deck Google Drive / PDF Link (Optional)
                        </label>
                        <Input
                          {...register("pitchDeckUrl")}
                          placeholder="https://drive.google.com/file/d/..."
                          className="h-11 rounded-xl text-xs"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                      <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                        <ShieldCheck className="w-4 h-4 text-[#772b38]" />
                        <span>Institutional Integrity & Intellectual Property Undertaking:</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed font-normal">
                        By submitting this application, you declare that the submission represents original technical ideation. MIF maintains a strict policy of non-disclosure and institutional guidance toward university and MSME patent protection prior to public commercialization.
                      </p>
                    </div>
                  </div>
                )}

                {/* Form Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="border-slate-300 text-slate-700 text-xs gap-1.5 h-11 px-5 rounded-xl cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Step 0{step - 1}</span>
                    </Button>
                  ) : (
                    <div />
                  )}

                  {step < 4 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-[#772b38] hover:bg-[#5e212b] text-white font-bold text-xs gap-1.5 h-11 px-6 rounded-xl shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      <span>Continue to Step 0{step + 1}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#772b38] hover:bg-[#5e212b] text-white font-black text-xs sm:text-sm px-8 h-12 rounded-xl shadow-xl transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? "Registering Application..." : "Submit Formal Application"}
                    </Button>
                  )}
                </div>
              </form>
            </div>

            {/* Application FAQ Accordion Section */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#ff8097]" />
                <h3 className="text-lg font-bold text-white font-display">
                  Frequently Asked Questions About MIF Incubation
                </h3>
              </div>

              <div className="space-y-3 pt-2">
                {APPLICATION_FAQS.map((faq, fIdx) => {
                  const isOpen = openFaqIndex === fIdx;
                  return (
                    <div
                      key={fIdx}
                      className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-white cursor-pointer hover:text-rose-200 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180 text-white" : ""}`} />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed font-normal border-t border-white/10 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          FEATURE MODAL 1: QUICK APPLICATION STATUS TRACKER MODAL
         ========================================================================= */}
      {showStatusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#772b38]">Real-Time Tracking</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">Track Incubation Status</h3>
                <p className="text-xs text-slate-500">Enter your Application ID (e.g. app-101) or registered founder email.</p>
              </div>
              <button onClick={() => setShowStatusModal(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <form onSubmit={handleQuickStatusLookup} className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="text"
                  required
                  placeholder="e.g. app-101 or founder@mamcet.edu.in"
                  value={statusLookupQuery}
                  onChange={(e) => setStatusLookupQuery(e.target.value)}
                  className="h-11 rounded-xl text-xs"
                />
                <Button
                  type="submit"
                  disabled={statusLookupLoading}
                  className="bg-[#772b38] hover:bg-[#5e212b] text-white text-xs font-bold px-5 h-11 rounded-xl"
                >
                  {statusLookupLoading ? "Checking..." : "Track"}
                </Button>
              </div>
            </form>

            {statusLookupError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {statusLookupError}
              </div>
            )}

            {statusLookupResult && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{statusLookupResult.startupName}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    {statusLookupResult.status || "UNDER_REVIEW"}
                  </span>
                </div>
                <p className="text-slate-600">Founder: {statusLookupResult.founderName}</p>
                <p className="text-slate-500">Track: {statusLookupResult.category}</p>
                <div className="pt-2">
                  <Link
                    href={`/apply/status?id=${encodeURIComponent(statusLookupResult.id)}`}
                    className="text-[#772b38] font-bold underline flex items-center gap-1"
                  >
                    <span>Open Full Progress Timeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          FEATURE MODAL 2: SCREENING CRITERIA & PITCH BLUEPRINT MODAL
         ========================================================================= */}
      {showCriteriaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4 border border-slate-200 max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#772b38]">Evaluation Rubric</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">What Makes a Winning Application?</h3>
                <p className="text-xs text-slate-500">How the MAMCET & StartupTN Screening Committee reviews proposals.</p>
              </div>
              <button onClick={() => setShowCriteriaModal(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-0.5">1. Problem Friction (25%)</span>
                <span>Clear evidence of real-world inefficiency or industrial pain points in Tamil Nadu or global markets.</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-0.5">2. Technical Feasibility & TRL (30%)</span>
                <span>Feasible hardware/software architecture, component roadmap, and readiness to build in MAMCET labs.</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-0.5">3. Addressable Market (20%)</span>
                <span>Defined target customer profile, willingness to pay, and regional/export scalability.</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-0.5">4. Founder & Team Capability (25%)</span>
                <span>Technical execution ability, student grit, and multidisciplinary engineering collaboration.</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                type="button"
                onClick={() => setShowCriteriaModal(false)}
                className="bg-[#772b38] hover:bg-[#5e212b] text-white text-xs font-bold px-6 h-10 rounded-xl"
              >
                Understood, Return to Form
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
