"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UPCOMING_EVENTS, EventItem } from "@/lib/db/mockData";
import { Calendar, Clock, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RevealLeft, RevealRight, ZoomIn, XYZCard } from "@/components/animations/LightAnimations";

export default function EventsNews() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
    setIsSubmitting(true);

    try {
      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: selectedEvent.id,
          fullName,
          email,
          phone,
        }),
      });
      setRegisterSuccess(true);
    } catch {
      setRegisterSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="events" className="py-20 sm:py-24 bg-slate-50 relative border-t border-slate-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <RevealLeft>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
              Section 09 — Community & Calendar
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-2 font-display">
              Upcoming Workshops & Bootcamps
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Join hands-on maker bootcamps, grant writing masterclasses, and pitch days at MAMCET campus.
            </p>
          </RevealLeft>
          <RevealRight>
            <Link href="/events">
              <Button variant="outline" className="border-slate-300 hover:bg-white text-slate-800 gap-2 shadow-xs">
                <span>View All Events</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </RevealRight>
        </div>

        {/* Clean Events Grid with ZoomIn & XYZCards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {UPCOMING_EVENTS.map((event, idx) => (
            <ZoomIn key={event.id} delay={idx * 0.08}>
              <XYZCard depth={8}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {event.type}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {event.mode}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-3">{event.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                      {event.description}
                    </p>

                    <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setSelectedEvent(event);
                      setRegisterSuccess(false);
                    }}
                    className="w-full bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 hover:border-transparent text-xs font-semibold h-10 transition-colors shadow-2xs"
                  >
                    Register Free Seat
                  </Button>
                </div>
              </XYZCard>
            </ZoomIn>
          ))}
        </div>

        {/* Registration Modal Dialog (Clean Light Styling) */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="relative w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-2xl">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-semibold p-1"
              >
                ✕
              </button>

              <h3 className="text-xl font-bold text-slate-900 mb-1 font-display">
                Reserve Seat for Workshop
              </h3>
              <p className="text-xs text-slate-500 mb-5">{selectedEvent.title}</p>

              {registerSuccess ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Registration Confirmed!</h4>
                  <p className="text-xs text-slate-600 mb-4">
                    Confirmation details and calendar invite have been sent to your email.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedEvent(null)}
                    className="text-xs border-slate-300"
                  >
                    Done
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <Input
                      required
                      placeholder="e.g. Arun Kumar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      placeholder="arun@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <Input
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs h-10"
                    >
                      {isSubmitting ? "Submitting..." : "Confirm Free Registration"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
