"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeUp } from "@/components/animations/LightAnimations";

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<StartupApplicationFormValues>({
    resolver: zodResolver(startupApplicationSchema),
    defaultValues: {
      collegeOrEntity: "MAMCET",
      coFoundersCount: 1,
      stage: "IDEATION",
      category: "AI_DATA_SCIENCE",
    },
  });

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

      setSubmittedData(result.data);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        {/* Page Title & Status Link */}
        <FadeUp className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-[#772b38] uppercase tracking-widest">
              Cohort Application Portal
            </span>
            <span className="text-slate-300">·</span>
            <Link
              href="/apply/status"
              className="text-xs font-bold text-[#772b38] hover:text-[#5e212b] hover:underline flex items-center gap-1"
            >
              <Search className="w-3 h-3" />
              <span>Track Existing Application Status →</span>
            </Link>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-1 font-display tracking-tight">
            Apply for Incubation at MIF
          </h1>
          <p className="text-sm text-slate-600 mt-2 font-normal">
            MASTeR Incubation Foundation · StartupTN Recognised Pre-Incubation Centre · MAMCET Trichy
          </p>
        </FadeUp>

        {submittedData ? (
          /* Submission Confirmation Card */
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-emerald-300 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                Application Received Successfully
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Welcome to the Screening Pipeline, {submittedData.founderName}!
              </h2>
              <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Your application for <strong>{submittedData.startupName}</strong> has been registered with ID:{" "}
                <span className="font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {submittedData.id}
                </span>.
              </p>
            </div>

            {/* Email Confirmation Notice */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-center gap-2 max-w-lg mx-auto font-medium">
              <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                An automated confirmation receipt has been dispatched to <strong>{submittedData.founderEmail}</strong>.
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-700 space-y-2 max-w-lg mx-auto">
              <div className="font-bold text-slate-900 uppercase text-[11px] mb-2">
                What happens next?
              </div>
              <p>
                1. Our Incubation Manager <strong>Mr. M. Santhosh Kumar</strong> and the Technical Committee will screen your problem-solution fit within 5 working days.
              </p>
              <p>
                2. Shortlisted applicants will receive an invitation to pitch at the MIF Conference Boardroom (or virtually).
              </p>
              <p>
                3. You can track your application review live anytime using your Application ID.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={`/apply/status?id=${encodeURIComponent(submittedData.id)}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-11 px-6 rounded-xl text-xs shadow-sm"
              >
                <Search className="w-4 h-4" />
                <span>Track Application Live Status</span>
              </Link>
              <Button
                onClick={() => {
                  setSubmittedData(null);
                  setStep(1);
                }}
                variant="outline"
                className="w-full sm:w-auto border-slate-300 text-slate-700 font-semibold h-11 px-6 rounded-xl text-xs"
              >
                Submit Another Application
              </Button>
            </div>
          </div>
        ) : (
          /* Clean Multi-Step Application Form */
          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm">
            {/* Step Indicators */}
            <div className="grid grid-cols-4 gap-2 mb-10 pb-6 border-b border-slate-100">
              {[
                { s: 1, title: "Founder" },
                { s: 2, title: "Venture" },
                { s: 3, title: "Problem & Solution" },
                { s: 4, title: "Needs & Review" },
              ].map((item) => (
                <div
                  key={item.s}
                  className={`text-center pb-2 border-b-2 transition-colors ${
                    step >= item.s
                      ? "border-blue-600 text-blue-700 font-bold"
                      : "border-slate-200 text-slate-400 font-normal"
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
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Step 1: Founder & Team Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Primary Founder / Innovator Name *
                      </label>
                      <Input
                        {...register("founderName")}
                        placeholder="e.g. Anand Kumar"
                      />
                      {errors.founderName && (
                        <span className="text-[11px] text-rose-600 mt-1 block">
                          {errors.founderName.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        {...register("founderEmail")}
                        placeholder="e.g. anand@mamcet.edu.in"
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
                        Contact Phone Number *
                      </label>
                      <Input
                        {...register("founderPhone")}
                        placeholder="+91 9876543210"
                      />
                      {errors.founderPhone && (
                        <span className="text-[11px] text-rose-600 mt-1 block">
                          {errors.founderPhone.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Co-Founders / Team Size
                      </label>
                      <Input
                        type="number"
                        min={1}
                        max={10}
                        {...register("coFoundersCount")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      College / Institution / Organization *
                    </label>
                    <Input
                      {...register("collegeOrEntity")}
                      placeholder="e.g. MAMCET Trichy (ECE Department)"
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
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Step 2: Startup & Technology Profile
                  </h3>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Startup / Project Name *
                    </label>
                    <Input
                      {...register("startupName")}
                      placeholder="e.g. AgroSens Telemetry"
                    />
                    {errors.startupName && (
                      <span className="text-[11px] text-rose-600 mt-1 block">
                        {errors.startupName.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Select MIF Focus Track *
                    </label>
                    <select
                      {...register("category")}
                      className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 shadow-xs"
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
                      Current Maturity Stage *
                    </label>
                    <select
                      {...register("stage")}
                      className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 shadow-xs"
                    >
                      <option value="IDEATION">Ideation (Structured concept & initial research)</option>
                      <option value="PROOF_OF_CONCEPT">Proof of Concept (Benchtop lab experiment)</option>
                      <option value="PROTOTYPE_MVP">Prototype / MVP (Working hardware or software release)</option>
                      <option value="EARLY_TRACTION">Early Traction (Tested with pilot clients / LOIs)</option>
                      <option value="SCALING">Scaling (Incorporated entity with active revenue)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 3: Problem & Solution */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Step 3: Engineering Innovation & Market Validation
                  </h3>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Problem Statement * (Minimum 30 characters)
                    </label>
                    <Textarea
                      {...register("problemStatement")}
                      rows={3}
                      placeholder="What friction, inefficiency, or societal pain point are you solving?"
                    />
                    {errors.problemStatement && (
                      <span className="text-[11px] text-rose-600 mt-1 block">
                        {errors.problemStatement.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Proposed Solution & Technical Innovation * (Minimum 30 characters)
                    </label>
                    <Textarea
                      {...register("proposedSolution")}
                      rows={3}
                      placeholder="Describe your technology, hardware architecture, or algorithm..."
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
                      placeholder="Who are your initial paying customers or industrial beneficiaries?"
                    />
                    {errors.targetMarket && (
                      <span className="text-[11px] text-rose-600 mt-1 block">
                        {errors.targetMarket.message}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 4: Facility Needs & Final Review */}
              {step === 4 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Step 4: Incubation Support Needed & Pitch Link
                  </h3>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Specific MAMCET Lab or Equipment Required (Optional)
                    </label>
                    <Input
                      {...register("labRequirement")}
                      placeholder="e.g. 3D printer access, PCB soldering station, GPU credits"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Seed Funding Requirement (Optional)
                      </label>
                      <Input
                        {...register("fundingNeeded")}
                        placeholder="e.g. ₹5,00,000 (TANSEED grant)"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Pitch Deck URL / Drive Link (Optional)
                      </label>
                      <Input
                        {...register("pitchDeckUrl")}
                        placeholder="https://drive.google.com/..."
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-slate-700">
                    <span className="text-blue-900 font-bold block mb-1">
                      Application Integrity Statement:
                    </span>
                    By submitting this application to MASTeR Incubation Foundation (MIF), you confirm that the technical disclosures are non-confidential and eligible for review by the institutional screening panel.
                  </div>
                </div>
              )}

              {/* Form Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="border-slate-300 text-slate-700 text-xs gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </Button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs gap-1.5 shadow-sm"
                  >
                    <span>Continue to Step 0{step + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-8 h-11 shadow-sm"
                  >
                    {isSubmitting ? "Submitting Application..." : "Submit Formal Application"}
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
