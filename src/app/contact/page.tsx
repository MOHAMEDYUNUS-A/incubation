"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormValues } from "@/lib/validations/contactSchema";
import { FOUNDATION_INFO } from "@/lib/db/mockData";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
      setSubmitted(true);
      reset();
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[#050814] min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            Connect With MIF
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white mt-2 font-display">
            Contact & Campus Location
          </h1>
          <p className="text-lg text-slate-300 mt-4 leading-relaxed">
            Reach out to our incubation management team for cohort admissions, institutional partnerships, or campus lab visits in Siruganur, Trichy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">
              Verified Incubation Contacts
            </h3>

            {/* Incubation Manager */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                Incubation Operations & Screening
              </span>
              <h4 className="text-lg font-bold text-white">
                {FOUNDATION_INFO.manager.name}
              </h4>
              <div className="text-xs text-slate-300">
                {FOUNDATION_INFO.manager.role} · {FOUNDATION_INFO.name}
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{FOUNDATION_INFO.manager.phone}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{FOUNDATION_INFO.manager.email}</span>
                </div>
              </div>
            </div>

            {/* Incubation Coordinator */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                Academic Coordination & Hardware Labs
              </span>
              <h4 className="text-lg font-bold text-white">
                {FOUNDATION_INFO.coordinator.name}
              </h4>
              <div className="text-xs text-slate-300">
                {FOUNDATION_INFO.coordinator.role} · {FOUNDATION_INFO.name}
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{FOUNDATION_INFO.coordinator.phone}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{FOUNDATION_INFO.coordinator.email}</span>
                </div>
              </div>
            </div>

            {/* Campus Address */}
            <div className="p-6 rounded-2xl bg-[#070c1d] border border-slate-800">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Campus Address</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {FOUNDATION_INFO.institution} <br />
                    {FOUNDATION_INFO.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-slate-900/50 border border-slate-800 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-2">Send an Official Enquiry</h3>
            <p className="text-xs text-slate-400 mb-6">
              Inquire about cohort dates, maker lab access, or mentor allocations.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Message Dispatched!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Thank you for reaching out. Our coordinator will contact you shortly via email or phone.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  size="sm"
                  variant="outline"
                  className="mt-2 text-xs text-white border-slate-700"
                >
                  Send Another Note
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Your Name *
                    </label>
                    <Input {...register("name")} placeholder="e.g. Ramesh S." />
                    {errors.name && (
                      <span className="text-[11px] text-rose-400 mt-1 block">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      {...register("email")}
                      placeholder="e.g. ramesh@example.com"
                    />
                    {errors.email && (
                      <span className="text-[11px] text-rose-400 mt-1 block">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Phone Number (Optional)
                    </label>
                    <Input {...register("phone")} placeholder="+91 9876543210" />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Subject *
                    </label>
                    <Input
                      {...register("subject")}
                      placeholder="e.g. Inquiry regarding IoT Lab reservation"
                    />
                    {errors.subject && (
                      <span className="text-[11px] text-rose-400 mt-1 block">
                        {errors.subject.message}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Your Message *
                  </label>
                  <Textarea
                    {...register("message")}
                    rows={4}
                    placeholder="Provide details about your venture or query..."
                  />
                  {errors.message && (
                    <span className="text-[11px] text-rose-400 mt-1 block">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold h-11"
                >
                  {submitting ? "Sending Message..." : "Dispatch Message to MIF Office"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
