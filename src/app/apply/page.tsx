"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  User,
  Phone,
  Layers,
  FileText,
  DollarSign,
  Rocket,
  Compass,
  CheckCheck,
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

// TRL Stages Data
const TRL_STAGES = [
  {
    key: "IDEATION",
    title: "Ideation",
    trl: "TRL 1 – 2",
    desc: "Problem discovery, customer interviews & napkin sketches",
    badge: "Pre-Incubation",
  },
  {
    key: "PROOF_OF_CONCEPT",
    title: "Proof of Concept",
    trl: "TRL 3",
    desc: "Benchtop experiment & feasibility validation in college lab",
    badge: "Validation",
  },
  {
    key: "PROTOTYPE_MVP",
    title: "Working Prototype / MVP",
    trl: "TRL 4 – 5",
    desc: "Functional hardware or software testable by early adopters",
    badge: "Seed Ready",
  },
  {
    key: "EARLY_TRACTION",
    title: "Early Traction",
    trl: "TRL 6 – 7",
    desc: "Field-tested with customer letters of intent (LOI) & pilots",
    badge: "TANSEED Target",
  },
  {
    key: "SCALING",
    title: "Commercial Scaling",
    trl: "TRL 8 – 9",
    desc: "Incorporated Pvt Ltd generating paying commercial revenue",
    badge: "Market Scale",
  },
];

// Common Prototyping Lab Options at MAMCET
const LAB_EQUIPMENT_OPTIONS = [
  "Rapid Additive 3D Printing & Slicing",
  "Multi-Layer PCB Milling & Soldering Bay",
  "LoRaWAN & IoT Telemetry Gateway",
  "Embedded Systems & Microcontroller Bench",
  "High-Performance AI / GPU Workstation",
  "Mechanical CNC & Lathe Rapid Tooling",
  "Solar Cell & Battery Testing Lab",
  "Dedicated 24/7 Coworking Hotdesk",
];

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
  {
    q: "Does MASTeR Incubation Foundation take equity from student startups?",
    a: "No. Pre-incubation at MIF is 100% equity-free. Student creators and founders retain complete intellectual property and equity ownership of their inventions.",
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
  const [selectedLabs, setSelectedLabs] = useState<string[]>([]);

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
      category: "ELECTRONICS_IOT_SMART",
      stage: "PROOF_OF_CONCEPT",
      coFoundersCount: 1,
      collegeOrEntity: "MAMCET",
    },
    mode: "onChange",
  });

  const formValues = watch();

  // Calculate Real-time Application Strength (0% to 100%)
  const applicationStrength = useMemo(() => {
    let score = 0;
    if (formValues.founderName && formValues.founderName.length >= 2) score += 10;
    if (formValues.founderEmail && formValues.founderEmail.includes("@")) score += 10;
    if (formValues.founderPhone && formValues.founderPhone.length >= 10) score += 10;
    if (formValues.collegeOrEntity && formValues.collegeOrEntity.length >= 3) score += 10;
    if (formValues.startupName && formValues.startupName.length >= 2) score += 10;
    if (formValues.category) score += 10;
    if (formValues.stage) score += 10;
    if (formValues.problemStatement && formValues.problemStatement.length >= 30) score += 10;
    if (formValues.proposedSolution && formValues.proposedSolution.length >= 30) score += 10;
    if (formValues.targetMarket && formValues.targetMarket.length >= 20) score += 10;
    return Math.min(100, score);
  }, [formValues]);

  // Load Saved Draft on Mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mif_incubation_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        reset(parsed.values);
        if (parsed.values?.category) {
          setActiveTrackTab(parsed.values.category);
        }
        if (parsed.savedAt) {
          setDraftSavedTime(parsed.savedAt);
        }
      }
    } catch {
      // Ignore if localStorage unavailable
    }
  }, [reset]);

  // Auto-Save Draft to LocalStorage Debounced
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (formValues.founderName || formValues.startupName || formValues.problemStatement) {
          const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          localStorage.setItem(
            "mif_incubation_draft",
            JSON.stringify({ values: formValues, savedAt: nowStr })
          );
          setDraftSavedTime(nowStr);
        }
      } catch {
        // ignore
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [formValues]);

  const handleClearDraft = () => {
    try {
      localStorage.removeItem("mif_incubation_draft");
      reset({
        category: "ELECTRONICS_IOT_SMART",
        stage: "PROOF_OF_CONCEPT",
        coFoundersCount: 1,
        collegeOrEntity: "MAMCET",
      });
      setDraftSavedTime(null);
    } catch {
      // ignore
    }
  };

  // Quick Status Lookup Handler
  const handleQuickStatusLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusLookupQuery.trim()) return;

    setStatusLookupLoading(true);
    setStatusLookupError(null);
    setStatusLookupResult(null);

    try {
      const res = await fetch(
        `/api/applications?search=${encodeURIComponent(statusLookupQuery.trim())}`
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Application not found.");
      }
      if (data.data && data.data.length > 0) {
        setStatusLookupResult(data.data[0]);
      } else {
        setStatusLookupError("No application found matching that ID or email.");
      }
    } catch (err: any) {
      setStatusLookupError(err.message || "Failed to query status.");
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
      setStep((prev) => prev + 1);
      setErrorMsg(null);
      // Smooth scroll back up to form top
      const formEl = document.getElementById("incubation-form-card");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const toggleLabOption = (lab: string) => {
    let updated: string[];
    if (selectedLabs.includes(lab)) {
      updated = selectedLabs.filter((l) => l !== lab);
    } else {
      updated = [...selectedLabs, lab];
    }
    setSelectedLabs(updated);
    setValue("labRequirement", updated.join(", "));
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
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
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
        </div>

        {/* Ambient Dark-Blue & Burgundy Atmospheric Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#061224]/92 via-[#091b34]/85 to-[#040c18]/94 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#772b38]/25 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* =========================================================================
          FOREGROUND CONTENT: HERO MASTHEAD, 2-COLUMN SPLIT PORTAL & FEATURES
         ========================================================================= */}
      <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Masthead */}
        <FadeUp className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          {/* Institutional Accreditation Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-white tracking-wide">
              StartupTN Recognized Pre-Incubation Centre · Ministry of MSME Host Institution (HI)
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white font-display tracking-tight leading-[1.1] [text-shadow:_0_2px_14px_rgba(0,0,0,0.9)]">
            Apply for Incubation & <br />
            <span className="text-[#ff8097]">Seed Capital</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-2xl mx-auto [text-shadow:_0_1px_6px_rgba(0,0,0,0.8)]">
            Convert benchtop engineering prototypes and bold research into venture-funded enterprises with 4,000 sq.ft. of prototyping bays, TANSEED seed grants, and 1-on-1 industry mentorship at MAMCET.
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
              <span>Review 4-Pillar Screening Rubric</span>
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
          <div className="max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-white text-slate-900 border border-slate-200/90 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Application Successfully Lodged
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                Welcome to the MIF Incubation Pipeline!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your proposal has been logged under official tracking reference:
              </p>
              <div className="inline-block px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-sm font-mono font-bold text-slate-900 shadow-2xs">
                ID: {submittedData.id || "APP-PENDING"}
              </div>
            </div>

            {/* Workflow steps */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-700 space-y-2.5 max-w-lg mx-auto">
              <div className="font-bold text-slate-900 uppercase text-[11px] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#772b38]" />
                <span>Next Steps in the Incubation Workflow:</span>
              </div>
              <p>
                <strong>1. Technical Dossier Review:</strong> Incubation Manager Mr. M. Santhosh Kumar and the faculty advisory board review technical viability within 5 working days.
              </p>
              <p>
                <strong>2. Pitch Presentation:</strong> Shortlisted founders receive an invitation to pitch at the MIF Conference Boardroom (or virtually via video).
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
              PREMIER 2-COLUMN INSTITUTIONAL ADMISSIONS PORTAL
             ========================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* =========================================================================
                LEFT SIDEBAR: COHORT OVERVIEW, SECTOR ADVISOR & LIVE STRENGTH CHECKLIST
               ========================================================================= */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
              {/* Feature 1: Interactive Sector Track Advisor */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#ff8097]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      Track Pathways & Grants
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Active Cohort
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                  Select your innovation track to preview assigned funding schemes, hardware testing bays, and lead research advisors:
                </p>

                {/* Track Selector Buttons */}
                <div className="grid grid-cols-1 gap-1.5">
                  {FOCUS_AREAS.map((fa) => {
                    const isSelected = activeTrackTab === fa.categoryKey;
                    return (
                      <button
                        key={fa.categoryKey}
                        type="button"
                        onClick={() => {
                          setActiveTrackTab(fa.categoryKey);
                          setValue("category", fa.categoryKey as any);
                        }}
                        className={`w-full p-2.5 rounded-xl text-left text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-[#772b38] text-white shadow-md border border-[#ff8097]/50 font-bold"
                            : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
                        }`}
                      >
                        <span className="truncate pr-2">{fa.title}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Active Track Highlight Box */}
                {TRACK_BENEFITS[activeTrackTab] && (
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/15 space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-300 block">
                        Eligible Non-Dilutive Grant:
                      </span>
                      <span className="font-bold text-white text-xs">
                        {TRACK_BENEFITS[activeTrackTab].grant}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-cyan-300 block">
                        Dedicated Testing Facility:
                      </span>
                      <span className="text-slate-200 text-[11px]">
                        {TRACK_BENEFITS[activeTrackTab].labs}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#ff8097] block">
                        Lead Institutional Advisor:
                      </span>
                      <span className="text-slate-200 text-[11px]">
                        {TRACK_BENEFITS[activeTrackTab].mentor}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Feature 2: Real-time Application Strength Checklist */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      Readiness Score
                    </span>
                  </div>
                  <span
                    className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                      applicationStrength >= 80
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                        : applicationStrength >= 50
                        ? "bg-amber-500/20 text-amber-300 border border-amber-400/40"
                        : "bg-white/10 text-slate-300"
                    }`}
                  >
                    {applicationStrength}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      applicationStrength >= 80
                        ? "bg-emerald-400"
                        : applicationStrength >= 50
                        ? "bg-amber-400"
                        : "bg-[#ff8097]"
                    }`}
                    style={{ width: `${applicationStrength}%` }}
                  />
                </div>

                {/* Checklist items */}
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    {formValues.founderName && formValues.founderEmail && formValues.founderPhone ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0" />
                    )}
                    <span className={formValues.founderName ? "text-white font-medium" : ""}>
                      Founder Credentials & Contact
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {formValues.startupName && formValues.category ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0" />
                    )}
                    <span className={formValues.startupName ? "text-white font-medium" : ""}>
                      Venture Profile & Domain Track
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {formValues.problemStatement && formValues.problemStatement.length >= 30 ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0" />
                    )}
                    <span className={formValues.problemStatement ? "text-white font-medium" : ""}>
                      Problem Friction Defined (&ge;30 chars)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {formValues.proposedSolution && formValues.proposedSolution.length >= 30 ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0" />
                    )}
                    <span className={formValues.proposedSolution ? "text-white font-medium" : ""}>
                      Technical Architecture (&ge;30 chars)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {formValues.targetMarket && formValues.targetMarket.length >= 20 ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0" />
                    )}
                    <span className={formValues.targetMarket ? "text-white font-medium" : ""}>
                      Target Market & Beneficiaries
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 text-[11px] text-slate-300">
                  <span className="font-semibold text-white">Higher scores</span> receive expedited screening and direct board review.
                </div>
              </div>

              {/* Feature 3: Institutional Assurances */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Institutional Protections:</span>
                </div>
                <p className="leading-relaxed">
                  • <strong>100% Equity-Free Pre-Incubation</strong> for student and faculty inventors.
                </p>
                <p className="leading-relaxed">
                  • <strong>IP Non-Disclosure:</strong> Confidential proposal screening protects patent disclosures.
                </p>
                <p className="leading-relaxed">
                  • <strong>Inquiries:</strong> Email <a href="mailto:incubation@mamcet.edu.in" className="text-[#ff8097] underline">incubation@mamcet.edu.in</a>.
                </p>
              </div>
            </div>

            {/* =========================================================================
                RIGHT COLUMN: 4-STEP STREAMLINED APPLICATION FORM
               ========================================================================= */}
            <div className="lg:col-span-8 space-y-6">
              <div
                id="incubation-form-card"
                className="p-6 sm:p-10 rounded-3xl bg-white text-slate-900 border border-slate-200/90 shadow-2xl relative scroll-mt-24"
              >
                {/* Header: Progress Stepper */}
                <div className="mb-8">
                  {/* Step indicators */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {[
                      { s: 1, title: "Founder & Team", icon: User },
                      { s: 2, title: "Venture Profile", icon: Rocket },
                      { s: 3, title: "Tech & Market", icon: Cpu },
                      { s: 4, title: "Labs & Submit", icon: Wrench },
                    ].map((item) => {
                      const isPassed = step > item.s;
                      const isCurrent = step === item.s;
                      const ItemIcon = item.icon;

                      return (
                        <div
                          key={item.s}
                          onClick={() => {
                            if (item.s < step) setStep(item.s);
                          }}
                          className={`flex flex-col items-center text-center group transition-all ${
                            item.s < step ? "cursor-pointer" : ""
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-bold transition-all mb-2 ${
                              isCurrent
                                ? "bg-[#772b38] text-white shadow-md shadow-[#772b38]/30 scale-105 ring-2 ring-[#772b38]/40"
                                : isPassed
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : "bg-slate-100 text-slate-400 border border-slate-200"
                            }`}
                          >
                            {isPassed ? <Check className="w-5 h-5 text-emerald-700" /> : <ItemIcon className="w-4 h-4" />}
                          </div>

                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider block ${
                              isCurrent ? "text-[#772b38]" : isPassed ? "text-emerald-700" : "text-slate-400"
                            }`}
                          >
                            Step 0{item.s}
                          </span>
                          <span
                            className={`text-xs truncate max-w-full hidden sm:inline ${
                              isCurrent ? "text-slate-900 font-bold" : "text-slate-500 font-normal"
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Horizontal progress bar connecting steps */}
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#772b38] transition-all duration-300 rounded-full"
                      style={{ width: `${((step - 1) / 3) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Draft auto-save status bar */}
                <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>
                      {draftSavedTime ? (
                        <span className="text-emerald-700 font-medium">
                          Auto-saved locally ({draftSavedTime})
                        </span>
                      ) : (
                        "Auto-saves as you type"
                      )}
                    </span>
                  </div>

                  {draftSavedTime && (
                    <button
                      type="button"
                      onClick={handleClearDraft}
                      className="text-slate-400 hover:text-rose-600 transition-colors text-xs font-medium cursor-pointer underline"
                      title="Clear draft data"
                    >
                      Reset Draft
                    </button>
                  )}
                </div>

                {errorMsg && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 mb-6">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* =========================================================================
                      STEP 1: FOUNDER & TEAM
                     ========================================================================= */}
                  {step === 1 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 font-display">
                            Step 1: Founder & Innovator Details
                          </h3>
                          <p className="text-xs text-slate-500">
                            Primary contact details for proposal correspondence and interview invites.
                          </p>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">* Required fields</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div>
                          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
                            <User className="w-3.5 h-3.5 text-[#772b38]" />
                            <span>Primary Founder / Lead Innovator *</span>
                          </label>
                          <Input
                            {...register("founderName")}
                            placeholder="e.g. Arun Kumar"
                            className="h-11 rounded-xl text-xs focus:ring-[#772b38]"
                          />
                          {errors.founderName && (
                            <span className="text-[11px] text-rose-600 mt-1 block font-medium">
                              {errors.founderName.message}
                            </span>
                          )}
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
                            <Mail className="w-3.5 h-3.5 text-[#772b38]" />
                            <span>Official Email Address *</span>
                          </label>
                          <Input
                            type="email"
                            {...register("founderEmail")}
                            placeholder="e.g. arun.innovator@mamcet.edu.in"
                            className="h-11 rounded-xl text-xs focus:ring-[#772b38]"
                          />
                          {errors.founderEmail && (
                            <span className="text-[11px] text-rose-600 mt-1 block font-medium">
                              {errors.founderEmail.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
                            <Phone className="w-3.5 h-3.5 text-[#772b38]" />
                            <span>Contact WhatsApp / Phone Number *</span>
                          </label>
                          <Input
                            {...register("founderPhone")}
                            placeholder="+91 98421 00000"
                            className="h-11 rounded-xl text-xs focus:ring-[#772b38]"
                          />
                          {errors.founderPhone && (
                            <span className="text-[11px] text-rose-600 mt-1 block font-medium">
                              {errors.founderPhone.message}
                            </span>
                          )}
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1.5">
                            Total Core Team Size
                          </label>
                          <div className="grid grid-cols-4 gap-2">
                            {[1, 2, 3, 4].map((num) => (
                              <button
                                key={num}
                                type="button"
                                onClick={() => setValue("coFoundersCount", num)}
                                className={`h-11 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                  formValues.coFoundersCount === num
                                    ? "bg-[#772b38] text-white border-[#772b38] shadow-xs"
                                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                                }`}
                              >
                                {num === 1 ? "Solo" : `${num} Team`}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
                          <Building2 className="w-3.5 h-3.5 text-[#772b38]" />
                          <span>College / Department / Organization *</span>
                        </label>
                        <Input
                          {...register("collegeOrEntity")}
                          placeholder="e.g. M.A.M. College of Engineering & Technology (Dept of ECE / Mechanical)"
                          className="h-11 rounded-xl text-xs focus:ring-[#772b38]"
                        />
                        {errors.collegeOrEntity && (
                          <span className="text-[11px] text-rose-600 mt-1 block font-medium">
                            {errors.collegeOrEntity.message}
                          </span>
                        )}
                        <p className="text-[11px] text-slate-500 mt-1">
                          MIF welcomes students, faculty researchers, alumni, and regional engineering founders.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* =========================================================================
                      STEP 2: VENTURE PROFILE & TRL MATURITY
                     ========================================================================= */}
                  {step === 2 && (
                    <div className="space-y-5 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 font-display">
                            Step 2: Startup & Technology Profile
                          </h3>
                          <p className="text-xs text-slate-500">
                            Classify your domain track and current technology readiness maturity level.
                          </p>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">TRL Classification</span>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
                          <Rocket className="w-3.5 h-3.5 text-[#772b38]" />
                          <span>Startup / Project Working Title *</span>
                        </label>
                        <Input
                          {...register("startupName")}
                          placeholder="e.g. AgroSens Telemetry / NeuroRobotics Kit"
                          className="h-11 rounded-xl text-xs focus:ring-[#772b38]"
                        />
                        {errors.startupName && (
                          <span className="text-[11px] text-rose-600 mt-1 block font-medium">
                            {errors.startupName.message}
                          </span>
                        )}
                      </div>

                      {/* Visual Sector Selection Grid */}
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-2">
                          Select MIF Focus Area / Track *
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {FOCUS_AREAS.map((fa) => {
                            const isChosen = formValues.category === fa.categoryKey;
                            return (
                              <button
                                key={fa.categoryKey}
                                type="button"
                                onClick={() => {
                                  setValue("category", fa.categoryKey as any);
                                  setActiveTrackTab(fa.categoryKey);
                                }}
                                className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                                  isChosen
                                    ? "bg-[#772b38]/10 border-[#772b38] text-[#772b38] font-bold shadow-2xs"
                                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                <span>{fa.title}</span>
                                {isChosen && <Check className="w-4 h-4 text-[#772b38] shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                        {errors.category && (
                          <span className="text-[11px] text-rose-600 mt-1 block font-medium">
                            {errors.category.message}
                          </span>
                        )}
                      </div>

                      {/* Visual TRL Maturity Selector */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-bold text-slate-700 block">
                            Technology Readiness Level (TRL) *
                          </label>
                          <span className="text-[11px] text-slate-400">Select where your prototype stands today</span>
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                          {TRL_STAGES.map((t) => {
                            const isChosen = formValues.stage === t.key;
                            return (
                              <div
                                key={t.key}
                                onClick={() => setValue("stage", t.key as any)}
                                className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                                  isChosen
                                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`text-xs font-bold ${
                                        isChosen ? "text-white" : "text-slate-900"
                                      }`}
                                    >
                                      {t.title}
                                    </span>
                                    <span
                                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold ${
                                        isChosen
                                          ? "bg-white/20 text-white"
                                          : "bg-slate-200 text-slate-700"
                                      }`}
                                    >
                                      {t.trl}
                                    </span>
                                  </div>
                                  <p
                                    className={`text-[11px] mt-0.5 ${
                                      isChosen ? "text-slate-300" : "text-slate-500"
                                    }`}
                                  >
                                    {t.desc}
                                  </p>
                                </div>

                                <span
                                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md self-start sm:self-auto shrink-0 ${
                                    isChosen
                                      ? "bg-[#ff8097] text-slate-950 font-black"
                                      : "bg-slate-200 text-slate-600"
                                  }`}
                                >
                                  {t.badge}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* =========================================================================
                      STEP 3: PROBLEM STATEMENT & ENGINEERING ARCHITECTURE
                     ========================================================================= */}
                  {step === 3 && (
                    <div className="space-y-5 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 font-display">
                            Step 3: Engineering Innovation & Problem Fit
                          </h3>
                          <p className="text-xs text-slate-500">
                            Clear technical dossiers accelerate admission and grant allocation.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowCriteriaModal(true)}
                          className="text-xs text-[#772b38] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Info className="w-3.5 h-3.5" />
                          <span>View Review Rubric</span>
                        </button>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-bold text-slate-700">
                            Problem Statement * (Friction / Inefficiency / Unmet Need)
                          </label>
                          <span
                            className={`text-[11px] font-mono font-bold ${
                              (formValues.problemStatement?.length || 0) >= 30
                                ? "text-emerald-700"
                                : "text-slate-400"
                            }`}
                          >
                            {formValues.problemStatement?.length || 0} / 30 chars min
                          </span>
                        </div>
                        <Textarea
                          {...register("problemStatement")}
                          rows={3}
                          placeholder="What specific agricultural, industrial, or healthcare friction are you solving? Who suffers from this problem?"
                          className="rounded-xl text-xs focus:ring-[#772b38]"
                        />
                        {errors.problemStatement && (
                          <span className="text-[11px] text-rose-600 mt-1 block font-medium">
                            {errors.problemStatement.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-bold text-slate-700">
                            Proposed Technical Solution & Architecture *
                          </label>
                          <span
                            className={`text-[11px] font-mono font-bold ${
                              (formValues.proposedSolution?.length || 0) >= 30
                                ? "text-emerald-700"
                                : "text-slate-400"
                            }`}
                          >
                            {formValues.proposedSolution?.length || 0} / 30 chars min
                          </span>
                        </div>
                        <Textarea
                          {...register("proposedSolution")}
                          rows={3}
                          placeholder="Describe your working engineering concept: microcontroller, circuit sensors, ML algorithm, novel materials, or software stack..."
                          className="rounded-xl text-xs focus:ring-[#772b38]"
                        />
                        {errors.proposedSolution && (
                          <span className="text-[11px] text-rose-600 mt-1 block font-medium">
                            {errors.proposedSolution.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-bold text-slate-700">
                            Target Market & Commercial Beneficiaries *
                          </label>
                          <span
                            className={`text-[11px] font-mono font-bold ${
                              (formValues.targetMarket?.length || 0) >= 20
                                ? "text-emerald-700"
                                : "text-slate-400"
                            }`}
                          >
                            {formValues.targetMarket?.length || 0} / 20 chars min
                          </span>
                        </div>
                        <Textarea
                          {...register("targetMarket")}
                          rows={2}
                          placeholder="Who are your initial target clients in Tamil Nadu or India? (e.g. MSME textile factories, local farmers, tier-2 hospitals)"
                          className="rounded-xl text-xs focus:ring-[#772b38]"
                        />
                        {errors.targetMarket && (
                          <span className="text-[11px] text-rose-600 mt-1 block font-medium">
                            {errors.targetMarket.message}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* =========================================================================
                      STEP 4: PROTOTYPING LAB NEEDS, SEED CAPITAL & SUBMIT
                     ========================================================================= */}
                  {step === 4 && (
                    <div className="space-y-5 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 font-display">
                            Step 4: Prototyping Bay Needs & Pitch Deck
                          </h3>
                          <p className="text-xs text-slate-500">
                            Specify lab equipment access and seed funding targets.
                          </p>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">Final Step</span>
                      </div>

                      {/* Equipment Checklist */}
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-2">
                          MAMCET Prototyping Facilities Required (Select all that apply)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {LAB_EQUIPMENT_OPTIONS.map((lab) => {
                            const isSelected = selectedLabs.includes(lab);
                            return (
                              <button
                                key={lab}
                                type="button"
                                onClick={() => toggleLabOption(lab)}
                                className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                                  isSelected
                                    ? "bg-[#772b38]/10 border-[#772b38] text-[#772b38] font-bold"
                                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                <span>{lab}</span>
                                {isSelected ? (
                                  <Check className="w-3.5 h-3.5 text-[#772b38] shrink-0" />
                                ) : (
                                  <div className="w-3.5 h-3.5 rounded border border-slate-300 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
                            <DollarSign className="w-3.5 h-3.5 text-[#772b38]" />
                            <span>Seed Funding Target (Optional)</span>
                          </label>
                          <Input
                            {...register("fundingNeeded")}
                            placeholder="e.g. ₹10,00,000 (TANSEED grant)"
                            className="h-11 rounded-xl text-xs focus:ring-[#772b38]"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
                            <FileText className="w-3.5 h-3.5 text-[#772b38]" />
                            <span>Pitch Deck Google Drive Link (Optional)</span>
                          </label>
                          <Input
                            {...register("pitchDeckUrl")}
                            placeholder="https://drive.google.com/file/d/..."
                            className="h-11 rounded-xl text-xs focus:ring-[#772b38]"
                          />
                        </div>
                      </div>

                      {/* Legal Undertaking */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                        <div className="flex items-center gap-2 text-slate-900 font-bold">
                          <ShieldCheck className="w-4 h-4 text-[#772b38]" />
                          <span>Institutional Integrity & Intellectual Property Undertaking:</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed font-normal">
                          By submitting this proposal, you confirm that this work represents original technical ideation. MIF operates under a strict Non-Disclosure Policy and provides direct guidance for Indian Patent Office (IPO) and MSME patent filing prior to any public disclosure.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* =========================================================================
                      FORM STEP NAVIGATION BUTTONS
                     ========================================================================= */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    {step > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="border-slate-300 text-slate-700 text-xs gap-1.5 h-11 px-5 rounded-xl cursor-pointer hover:bg-slate-50"
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

              {/* =========================================================================
                  APPLICATION FAQ ACCORDION
                 ========================================================================= */}
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
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform ${
                              isOpen ? "rotate-180 text-white" : ""
                            }`}
                          />
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
              <button onClick={() => setShowStatusModal(false)} className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer">✕</button>
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
                  className="bg-[#772b38] hover:bg-[#5e212b] text-white text-xs font-bold px-5 h-11 rounded-xl cursor-pointer"
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
              <button onClick={() => setShowCriteriaModal(false)} className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer">✕</button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-0.5">1. Problem Friction (25%)</span>
                <span>Clear evidence of real-world inefficiency or industrial pain points in Tamil Nadu or global markets.</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-0.5">2. Technical Feasibility & TRL (30%)</span>
                <span>Feasible hardware/software architecture, component roadmap, and readiness to build in MAMCET labs.</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-0.5">3. Addressable Market (20%)</span>
                <span>Defined target customer profile, willingness to pay, and regional/export scalability.</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-0.5">4. Founder & Team Capability (25%)</span>
                <span>Technical execution ability, student grit, and multidisciplinary engineering collaboration.</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                type="button"
                onClick={() => setShowCriteriaModal(false)}
                className="bg-[#772b38] hover:bg-[#5e212b] text-white text-xs font-bold px-6 h-10 rounded-xl cursor-pointer"
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
