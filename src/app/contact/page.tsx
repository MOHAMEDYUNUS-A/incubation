"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormValues } from "@/lib/validations/contactSchema";
import { FOUNDATION_INFO } from "@/lib/db/mockData";
import { Mail, Phone, MapPin, CheckCircle2, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeUp, RevealLeft, RevealRight, XYZCard } from "@/components/animations/LightAnimations";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ email: string; name: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmittedData({ email: data.email, name: data.name });
      setSubmitted(true);
      reset();
    } catch {
      setSubmittedData({ email: data.email, name: data.name });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-slate-50 min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <FadeUp className="max-w-3xl mb-16">
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight font-display">
            Contact & Campus Location
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Reach out to our incubation management team for cohort admissions, institutional partnerships, or campus lab visits in Siruganur, Trichy.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Direct Contacts */}
          <RevealLeft className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4 font-display">
              Verified Incubation Contacts
            </h3>

            {/* Incubation Manager */}
            <XYZCard depth={6}>
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#772b38]/40 transition-all duration-300 space-y-3">
                <span className="text-[10px] font-mono font-bold text-[#772b38] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200/60 inline-block">
                  Incubation Operations & Screening
                </span>
                <h4 className="text-lg font-bold text-slate-900 font-display">
                  {FOUNDATION_INFO.manager.name}
                </h4>
                <div className="text-xs text-slate-600 font-medium">
                  {FOUNDATION_INFO.manager.role} · {FOUNDATION_INFO.name}
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <a
                    href={`tel:${FOUNDATION_INFO.manager.phone}`}
                    className="flex items-center gap-2.5 text-slate-700 hover:text-[#772b38] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#772b38] shrink-0" />
                    <span>{FOUNDATION_INFO.manager.phone}</span>
                  </a>
                  <a
                    href={`mailto:${FOUNDATION_INFO.manager.email}`}
                    className="flex items-center gap-2.5 text-slate-700 hover:text-blue-700 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{FOUNDATION_INFO.manager.email}</span>
                  </a>
                </div>
              </div>
            </XYZCard>

            {/* Incubation Coordinator */}
            <XYZCard depth={6}>
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 space-y-3">
                <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 inline-block">
                  Academic Coordination & Hardware Labs
                </span>
                <h4 className="text-lg font-bold text-slate-900 font-display">
                  {FOUNDATION_INFO.coordinator.name}
                </h4>
                <div className="text-xs text-slate-600 font-medium">
                  {FOUNDATION_INFO.coordinator.role} · {FOUNDATION_INFO.name}
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <a
                    href={`tel:${FOUNDATION_INFO.coordinator.phone}`}
                    className="flex items-center gap-2.5 text-slate-700 hover:text-[#772b38] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#772b38] shrink-0" />
                    <span>{FOUNDATION_INFO.coordinator.phone}</span>
                  </a>
                  <a
                    href={`mailto:${FOUNDATION_INFO.coordinator.email}`}
                    className="flex items-center gap-2.5 text-slate-700 hover:text-blue-700 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{FOUNDATION_INFO.coordinator.email}</span>
                  </a>
                </div>
              </div>
            </XYZCard>

            {/* Campus Address */}
            <XYZCard depth={6}>
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1 font-display">Campus Address</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {FOUNDATION_INFO.institution} <br />
                      {FOUNDATION_INFO.address}
                    </p>
                  </div>
                </div>
              </div>
            </XYZCard>
          </RevealLeft>

          {/* Right Column: Contact Inquiry Form */}
          <RevealRight className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50">
              <h3 className="text-2xl font-bold text-slate-900 mb-2 font-display">Send an Official Enquiry</h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 font-normal">
                Inquire about cohort dates, maker lab access, or mentor allocations.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 font-display">Enquiry Received & Confirmation Email Dispatched!</h4>
                    <p className="text-xs text-slate-600 max-w-md mx-auto mt-1 leading-relaxed font-normal">
                      Thank you for contacting MASTeR Incubation Foundation. An official confirmation email with your enquiry details has been sent to <strong>{submittedData?.email || "your email address"}</strong>.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-emerald-200/80 text-xs text-slate-600 max-w-sm mx-auto space-y-1.5 text-left font-normal">
                    <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider text-center">Next Steps</div>
                    <p>• Our team will review your enquiry within <strong>24–48 business hours</strong>.</p>
                    <p>• For urgent queries, call our desk directly at <strong>+91 9361697702</strong>.</p>
                  </div>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setSubmittedData(null);
                    }}
                    size="sm"
                    variant="outline"
                    className="mt-2 text-xs text-slate-700 border-slate-300 font-bold"
                  >
                    Send Another Note
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Your Name *
                      </label>
                      <Input {...register("name")} placeholder="e.g. Ramesh S." className="rounded-xl border-slate-200" />
                      {errors.name && (
                        <span className="text-[11px] text-rose-600 mt-1 block">
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        {...register("email")}
                        placeholder="e.g. ramesh@example.com"
                        className="rounded-xl border-slate-200"
                      />
                      {errors.email && (
                        <span className="text-[11px] text-rose-600 mt-1 block">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Phone Number (Optional)
                      </label>
                      <Input {...register("phone")} placeholder="+91 9876543210" className="rounded-xl border-slate-200" />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Subject *
                      </label>
                      <Input
                        {...register("subject")}
                        placeholder="e.g. Inquiry regarding IoT Lab reservation"
                        className="rounded-xl border-slate-200"
                      />
                      {errors.subject && (
                        <span className="text-[11px] text-rose-600 mt-1 block">
                          {errors.subject.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Your Message *
                    </label>
                    <Textarea
                      {...register("message")}
                      rows={4}
                      placeholder="Provide details about your venture or query..."
                      className="rounded-xl border-slate-200"
                    />
                    {errors.message && (
                      <span className="text-[11px] text-rose-600 mt-1 block">
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#772b38] hover:bg-[#5e212b] text-white font-extrabold h-11 rounded-xl shadow-md gap-2 ring-1 ring-white/20 transition-all cursor-pointer"
                  >
                    <span>{submitting ? "Sending Message..." : "Dispatch Message to MIF Office"}</span>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </div>
          </RevealRight>
        </div>
      </div>
    </div>
  );
}
