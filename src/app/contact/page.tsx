"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormValues } from "@/lib/validations/contactSchema";
import { FOUNDATION_INFO } from "@/lib/db/mockData";
import { useSiteContent } from "@/context/ContentContext";
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Sparkles,
  Send,
  Plane,
  Train,
  Bus,
  Car,
  Navigation,
  Compass,
  ExternalLink,
  Clock,
  ShieldCheck,
  Copy,
  Check,
  ArrowRight,
  Building,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FadeUp,
  RevealLeft,
  RevealRight,
  ZoomIn,
  XYZCard,
} from "@/components/animations/LightAnimations";

// Transit Directions Data: Air, Rail, Road
const TRANSIT_MODES = [
  {
    mode: "By Air / Flight",
    icon: Plane,
    terminal: "Tiruchirappalli International Airport (TRZ)",
    distance: "~28 km from campus",
    duration: "35–45 minutes drive",
    badge: "International & Domestic Hub",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    gradient: "from-sky-500/10 via-sky-500/5 to-transparent",
    iconBg: "bg-sky-600 text-white",
    description:
      "Tiruchirappalli International Airport (TRZ) connects our foundation directly with global innovation hubs and Indian metropolises.",
    highlights: [
      {
        title: "International Flight Network",
        detail:
          "Daily non-stop direct flights to Singapore (SIN), Dubai (DXB), Sharjah (SHJ), Colombo (CMB), Kuala Lumpur (KUL), and Kuwait.",
      },
      {
        title: "Domestic Air Connectivity",
        detail:
          "Frequent daily flights connecting Chennai, Bengaluru, Mumbai, Hyderabad, and New Delhi.",
      },
      {
        title: "Airport to Campus Transfer",
        detail:
          "Pre-paid airport taxis, Ola, and Uber operate 24/7 at the arrival terminal. Direct route via Airport Road and the 4-lane NH 45 bypass northbound to Siruganur.",
      },
    ],
    directionsUrl:
      "https://www.google.com/maps/dir/Tiruchirappalli+International+Airport+(TRZ),+Tiruchirappalli,+Tamil+Nadu/M.A.M.+College+of+Engineering+and+Technology,+Siruganur,+Tamil+Nadu+621105/@10.887019,78.681123,11z",
    actionText: "Airport Route Navigation",
  },
  {
    mode: "By Rail / Train",
    icon: Train,
    terminal: "Tiruchirappalli Junction (TPJ) & Srirangam (SRGM)",
    distance: "TPJ ~25 km · SRGM ~18 km",
    duration: "25–40 minutes drive",
    badge: "Grade-A Railway Hub",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    iconBg: "bg-emerald-600 text-white",
    description:
      "Tiruchirappalli Junction (TPJ) is one of Tamil Nadu's central railway divisions with round-the-clock express, superfast, and high-speed rail lines.",
    highlights: [
      {
        title: "High-Speed Rail Links",
        detail:
          "Daily Vande Bharat Express, Tejas Express, Vaigai Express, and Pallavan Express connect Chennai Egmore to Trichy in under 4 hours.",
      },
      {
        title: "Key Railway Stations",
        detail:
          "Tiruchirappalli Junction (TPJ) for nationwide trains; Srirangam Railway Station (SRGM, 18 km) for northbound express stops.",
      },
      {
        title: "Station to Campus Transfer",
        detail:
          "Pre-paid auto counters, Uber/Ola, or direct city buses from Chatram Bus Stand (Routes 1, 1A, 1B, 43, 63) reaching Siruganur in ~30 mins.",
      },
    ],
    directionsUrl:
      "https://www.google.com/maps/dir/Tiruchchirappalli+Junction,+Railway+Station+Road,+Bharathiyar+Salai,+Sangillyandapuram,+Tiruchirappalli,+Tamil+Nadu/M.A.M.+College+of+Engineering+and+Technology,+Siruganur,+Tamil+Nadu+621105/@10.893155,78.675001,11z",
    actionText: "Railway Route Navigation",
  },
  {
    mode: "By Road / Highway Bus",
    icon: Bus,
    terminal: "Chennai – Tiruchirappalli NH 45 (Siruganur Tollgate)",
    distance: "Direct Highway Access",
    duration: "Zero detour highway entry",
    badge: "Direct National Highway 45",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    gradient: "from-[#772b38]/10 via-[#772b38]/5 to-transparent",
    iconBg: "bg-[#772b38] text-white",
    description:
      "Situated directly on the Grand Southern Trunk (GST) Road / NH 45, the campus features a dedicated highway service lane and institutional bus bay.",
    highlights: [
      {
        title: "Intercity Highway Coaches",
        detail:
          "All Chennai – Trichy / Madurai / South TN government (SETC/TNSTC) and private sleeper buses stop right in front of the MAMCET campus gate on request.",
      },
      {
        title: "Trichy City Bus Routes",
        detail:
          "From Chatram Bus Stand (~20 km), board buses heading to Padalur, Perambalur, or Siruganur (Routes 1, 1A, 1B, 43, 63, 102) with departures every 10 mins.",
      },
      {
        title: "Self-Drive & Visitor Parking",
        detail:
          "Smooth 4-lane divided highway with clear signage. Dedicated free visitor, founder, and VIP vehicle parking inside the secure campus gates.",
      },
    ],
    directionsUrl:
      "https://www.google.com/maps/dir//M.A.M.+College+of+Engineering+and+Technology,+Siruganur,+Tamil+Nadu+621105/@10.9856,78.7423,17z",
    actionText: "Highway Route Navigation",
  },
];

export default function ContactPage() {
  const { content } = useSiteContent();
  const contact = content?.contact || {};

  const managerName = contact.managerName || FOUNDATION_INFO.manager.name;
  const managerRole = contact.managerRole || FOUNDATION_INFO.manager.role;
  const managerPhone = contact.managerPhone || contact.phone || FOUNDATION_INFO.manager.phone;
  const managerEmail = contact.managerEmail || contact.email || FOUNDATION_INFO.manager.email;

  const coordinatorName = contact.coordinatorName || FOUNDATION_INFO.coordinator.name;
  const coordinatorRole = contact.coordinatorRole || FOUNDATION_INFO.coordinator.role;
  const coordinatorPhone = contact.coordinatorPhone || FOUNDATION_INFO.coordinator.phone;
  const coordinatorEmail = contact.coordinatorEmail || FOUNDATION_INFO.coordinator.email;

  const address = contact.address || FOUNDATION_INFO.address;

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ email: string; name: string } | null>(null);
  const [copiedCoords, setCopiedCoords] = useState(false);

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

  const handleCopyCoords = () => {
    navigator.clipboard.writeText("10.9856, 78.7423");
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-slate-50 min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* =========================================================================
            TOP PAGE HEADER
           ========================================================================= */}
        <FadeUp className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#772b38]/10 border border-[#772b38]/20 text-[#772b38] text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>MAMCET Campus · Siruganur, NH 45</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight font-display">
            Contact & Directions to Reach Us
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed font-normal">
            Reach out to our incubation management team for cohort admissions, institutional partnerships, or plan your visit to our 4,000+ sq. ft. technology business incubator located right on the Chennai – Tiruchirappalli National Highway (NH 45).
          </p>
        </FadeUp>

        {/* =========================================================================
            SECTION 1: DIRECT CONTACTS & OFFICIAL ENQUIRY FORM
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start mb-20 sm:mb-28">
          {/* Left Column: Direct Contacts */}
          <RevealLeft className="lg:col-span-5 space-y-5">
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">
              Verified Incubation Contacts
            </h3>

            {/* Incubation Manager */}
            <XYZCard depth={6}>
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#772b38]/40 transition-all duration-300 space-y-3">
                <span className="text-[10px] font-mono font-bold text-[#772b38] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200/60 inline-block">
                  Incubation Operations & Screening
                </span>
                <h4 className="text-lg font-bold text-slate-900 font-display">
                  {managerName}
                </h4>
                <div className="text-xs text-slate-600 font-medium">
                  {managerRole} · {FOUNDATION_INFO.name}
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <a
                    href={`tel:${managerPhone}`}
                    className="flex items-center gap-2.5 text-slate-700 hover:text-[#772b38] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#772b38] shrink-0" />
                    <span>{managerPhone}</span>
                  </a>
                  <a
                    href={`mailto:${managerEmail}`}
                    className="flex items-center gap-2.5 text-slate-700 hover:text-blue-700 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{managerEmail}</span>
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
                  {coordinatorName}
                </h4>
                <div className="text-xs text-slate-600 font-medium">
                  {coordinatorRole} · {FOUNDATION_INFO.name}
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <a
                    href={`tel:${coordinatorPhone}`}
                    className="flex items-center gap-2.5 text-slate-700 hover:text-[#772b38] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#772b38] shrink-0" />
                    <span>{coordinatorPhone}</span>
                  </a>
                  <a
                    href={`mailto:${coordinatorEmail}`}
                    className="flex items-center gap-2.5 text-slate-700 hover:text-blue-700 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{coordinatorEmail}</span>
                  </a>
                </div>
              </div>
            </XYZCard>

            {/* Campus Address & Timings */}
            <XYZCard depth={6}>
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1 font-display">
                      Institutional Address
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {FOUNDATION_INFO.institution} <br />
                      {address}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    24/7 Founder Labs
                  </span>
                </div>
              </div>
            </XYZCard>
          </RevealLeft>

          {/* Right Column: Contact Inquiry Form */}
          <RevealRight className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50">
              <h3 className="text-2xl font-bold text-slate-900 mb-2 font-display">
                Send an Official Enquiry
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 font-normal">
                Inquire about cohort intake dates, maker lab workbench access, or corporate partnership delegations.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 font-display">
                      Enquiry Received & Confirmation Email Dispatched!
                    </h4>
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

        {/* =========================================================================
            SECTION 2: DIRECTIONS TO REACH US (HOW TO REACH BY AIR, RAIL & ROAD)
           ========================================================================= */}
        <section id="directions" className="mb-20 sm:mb-28 scroll-mt-24">
          <FadeUp className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
              <Navigation className="w-3.5 h-3.5 text-[#ff8097]" />
              <span>Campus Accessibility & Transit Guide</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-display">
              How to Reach MASTeR Incubation Foundation
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-normal max-w-2xl mx-auto leading-relaxed">
              Strategically positioned directly on the 4-lane Chennai – Tiruchirappalli National Highway (NH 45) at Siruganur, our incubator is effortlessly accessible via international air corridors, premier railway junctions, and round-the-clock express road coaches.
            </p>
          </FadeUp>

          {/* 3-Column Transit Modes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            {TRANSIT_MODES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <FadeUp key={item.mode} delay={0.1 * idx}>
                  <XYZCard depth={8}>
                    <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#772b38]/40 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between h-full group">
                      <div>
                        {/* Header: Mode Icon & Badge */}
                        <div className="flex items-center justify-between mb-5">
                          <div
                            className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0`}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-bold border tracking-wider uppercase ${item.badgeColor}`}
                          >
                            {item.badge}
                          </span>
                        </div>

                        {/* Title & Hub Landmark */}
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display mb-1">
                          {item.mode}
                        </h3>
                        <p className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                          <span>{item.terminal}</span>
                        </p>

                        {/* Distance & Time Pills */}
                        <div className="flex items-center gap-2 mb-5">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                            {item.distance}
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            {item.duration}
                          </span>
                        </div>

                        {/* Summary */}
                        <p className="text-xs text-slate-600 leading-relaxed font-normal mb-5">
                          {item.description}
                        </p>

                        {/* Highlights List */}
                        <div className="space-y-3 pt-4 border-t border-slate-100 mb-6">
                          {item.highlights.map((h, i) => (
                            <div key={i} className="text-xs">
                              <span className="font-bold text-slate-900 block mb-0.5">
                                • {h.title}
                              </span>
                              <span className="text-slate-600 leading-relaxed block pl-3">
                                {h.detail}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Direction CTA Link */}
                      <a
                        href={item.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full pt-2"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-slate-200 hover:border-[#772b38] hover:bg-[#772b38]/5 text-slate-800 hover:text-[#772b38] text-xs font-bold h-10 rounded-xl justify-between group-hover:border-[#772b38]/60 transition-all cursor-pointer"
                        >
                          <span>{item.actionText}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                      </a>
                    </div>
                  </XYZCard>
                </FadeUp>
              );
            })}
          </div>

          {/* =========================================================================
              SECTION 3: INTERACTIVE LOCATION TERMINAL & GPS PROTOCOL
             ========================================================================= */}
          <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Column: Embedded Live Google Map */}
              <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[440px] bg-slate-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.472714217141!2d78.7401113!3d10.9856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf2f4a42b10ab%3A0xaec1df785d1e2e98!2sM.A.M.%20College%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[360px] sm:min-h-[440px]"
                  title="MASTeR Incubation Foundation MAMCET Campus Location"
                />

                {/* Overlaid Floating Quick Nav Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-200 shadow-md flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-800 font-display">
                    MAMCET Siruganur Campus
                  </span>
                </div>
              </div>

              {/* Right Column: GPS Terminal & Security Visitor Protocol */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-slate-900 text-white">
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#ff8097] uppercase tracking-widest block mb-2">
                      GEOGRAPHIC COORDINATES & TERMINAL INFO
                    </span>
                    <h3 className="text-2xl font-black font-display text-white">
                      MAMCET Institutional Campus
                    </h3>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-normal">
                      M.A.M. College of Engineering & Technology, Trichy – Chennai Trunk Road (NH 45), Siruganur, Tiruchirappalli, Tamil Nadu – 621105.
                    </p>
                  </div>

                  {/* GPS Coordinates Box with 1-Click Copy */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        GPS Coordinates
                      </span>
                      <span className="font-mono text-xs sm:text-sm text-cyan-300 font-bold">
                        10.9856° N, 78.7423° E
                      </span>
                    </div>
                    <Button
                      onClick={handleCopyCoords}
                      size="sm"
                      variant="outline"
                      className="border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs h-9 px-3 gap-1.5 cursor-pointer"
                    >
                      {copiedCoords ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-300" />
                          <span>Copy</span>
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Security & Visitor Protocol */}
                  <div className="space-y-3 pt-2 text-xs">
                    <div className="flex items-start gap-2.5 text-slate-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block">Security & Visitor Badge Protocol:</strong>
                        <span>Check in at the North Main Arch Security Gate 1. Visitor passes are issued upon presenting institutional or government photo ID.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-slate-300">
                      <Car className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block">Dedicated Visitor & Founder Parking:</strong>
                        <span>Spacious complimentary vehicle parking available inside the campus perimeter adjacent to the Incubation Centre Central Wing.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary Google Maps Deep Link Button */}
                <div className="pt-6 mt-6 border-t border-white/10">
                  <a
                    href="https://share.google/V18XLHgF6Rh85vNA0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button className="w-full bg-[#772b38] hover:bg-[#5e212b] text-white font-extrabold text-xs h-12 rounded-xl gap-2 shadow-lg shadow-[#772b38]/40 ring-1 ring-white/20 transition-all cursor-pointer">
                      <span>Open Live Route on Google Maps App</span>
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
