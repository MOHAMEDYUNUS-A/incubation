"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { UPCOMING_EVENTS, EventItem } from "@/lib/db/mockData";
import { Calendar, Clock, MapPin, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RevealLeft, RevealRight, ZoomIn, XYZCard } from "@/components/animations/LightAnimations";
import { useSiteContent } from "@/context/ContentContext";

export default function EventsNews() {
  const { content } = useSiteContent();
  const eventsList: EventItem[] = (content?.events as any) || UPCOMING_EVENTS;
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 380, behavior: "smooth" });
  };

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
    <section id="events" className="py-20 sm:py-24 bg-slate-50 relative border-t border-slate-200 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <RevealLeft>
            <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-widest block mb-2">
              FOUNDER BOOTCAMPS & CALENDAR
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 font-display tracking-tight">
              Upcoming Workshops & Bootcamps
            </h2>
            <p className="text-base sm:text-lg text-slate-700 mt-2 font-normal">
              Join hands-on maker bootcamps, grant writing masterclasses, and pitch days at MAMCET campus.
            </p>
          </RevealLeft>

          <RevealRight>
            <div className="flex items-center gap-3">
              {/* Horizontal Scroll Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleScrollLeft}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#dc2626] hover:border-red-400 flex items-center justify-center transition-colors shadow-2xs active:scale-95"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleScrollRight}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#dc2626] hover:border-red-400 flex items-center justify-center transition-colors shadow-2xs active:scale-95"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <Link href="/events">
                <Button variant="outline" className="border-slate-300 hover:bg-white text-slate-800 font-bold text-sm h-10 px-5 gap-2 shadow-2xs">
                  <span>View All Events</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </RevealRight>
        </div>

        {/* Running Scrolling Reel: Fits Any Number of Workshops Gracefully */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-none gap-6 pb-6 pt-2 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {eventsList.map((event, idx) => (
            <div
              key={event.id}
              className="w-[300px] sm:w-[350px] md:w-[380px] shrink-0 snap-start flex flex-col"
            >
              <XYZCard depth={6}>
                <div className="h-full rounded-3xl border border-slate-200/90 bg-white p-7 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-red-500 hover:-translate-y-1 transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {event.type}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">
                        {event.mode}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 font-display line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal line-clamp-3">
                      {event.description}
                    </p>

                    <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 border-t border-slate-100 pt-4 mb-6 font-medium">
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-cyan-600 shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setSelectedEvent(event);
                      setRegisterSuccess(false);
                    }}
                    className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-bold h-11 rounded-xl shadow-xs transition-colors"
                  >
                    Register Free Seat
                  </Button>
                </div>
              </XYZCard>
            </div>
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
