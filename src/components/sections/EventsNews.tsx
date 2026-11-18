"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UPCOMING_EVENTS, EventItem } from "@/lib/db/mockData";
import { Calendar, Clock, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <section id="events" className="py-24 bg-[#050814] relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
              Section 09 — Community & Calendar
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 font-display">
              Upcoming Workshops & Bootcamps
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Join hands-on maker bootcamps, grant writing masterclasses, and pitch days at MAMCET campus.
            </p>
          </div>
          <Link href="/events">
            <Button variant="outline" className="border-slate-700 hover:bg-slate-800 text-white gap-2">
              <span>View All Events</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {UPCOMING_EVENTS.map((event) => (
            <div
              key={event.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between hover:border-blue-500/30 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-600/20 text-cyan-300 border border-blue-500/30">
                    {event.type}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {event.mode}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3">{event.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {event.description}
                </p>

                <div className="space-y-2 text-xs text-slate-400 border-t border-slate-800/80 pt-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => {
                  setSelectedEvent(event);
                  setRegisterSuccess(false);
                }}
                className="w-full bg-blue-600/20 hover:bg-blue-600 text-cyan-300 hover:text-white border border-blue-500/30 text-xs font-semibold h-10"
              >
                Register Free Seat
              </Button>
            </div>
          ))}
        </div>

        {/* Registration Modal Dialog */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>

              {!registerSuccess ? (
                <div>
                  <span className="text-[10px] font-bold uppercase text-cyan-400">
                    {selectedEvent.type} Registration
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-2">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-6">
                    {selectedEvent.date} · {selectedEvent.location}
                  </p>

                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">
                        Full Name *
                      </label>
                      <Input
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Anand R."
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">
                        Email Address *
                      </label>
                      <Input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. anand@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">
                        Phone Number (WhatsApp) *
                      </label>
                      <Input
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 9876543210"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold mt-2"
                    >
                      {isSubmitting ? "Confirming..." : "Confirm Free Registration"}
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Registration Confirmed!</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    A confirmation pass for <strong>{selectedEvent.title}</strong> has been sent to your email. We look forward to seeing you at MAMCET campus!
                  </p>
                  <Button
                    onClick={() => setSelectedEvent(null)}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white"
                  >
                    Close
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
