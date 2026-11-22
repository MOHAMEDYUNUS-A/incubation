"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Building2,
  Users,
  Compass,
  ArrowRight,
  TrendingUp,
  Mail,
  Send,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Search,
} from "lucide-react";
import { AlumniProfile } from "@/lib/ecosystem/types";

export default function AlumniDirectoryPage() {
  const [alumni, setAlumni] = useState<AlumniProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  // Connection Request Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniProfile | null>(null);
  const [requesterName, setRequesterName] = useState("");
  const [requesterEmail, setRequesterEmail] = useState("");
  const [requesterOrg, setRequesterOrg] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    async function fetchAlumni() {
      try {
        const res = await fetch("/api/ecosystem/alumni");
        const json = await res.json();
        if (json.success) {
          setAlumni(json.data.alumni);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchAlumni();
  }, []);

  const handleOpenConnect = (item: AlumniProfile) => {
    setSelectedAlumni(item);
    setRequesterName("");
    setRequesterEmail("");
    setRequesterOrg("");
    setMessage("");
    setRequestSent(false);
    setModalOpen(true);
  };

  const handleSendConnection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlumni) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/ecosystem/alumni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alumniId: selectedAlumni.id,
          startupName: selectedAlumni.startupName,
          requesterName,
          requesterEmail,
          requesterOrg,
          message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setRequestSent(true);
        setTimeout(() => {
          setModalOpen(false);
          setRequestSent(false);
        }, 1800);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredAlumni = alumni.filter((item) => {
    const matchesSearch =
      item.startupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.graduationCohort.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "ALL" || item.growthStatus === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50/70 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Masthead */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-950 text-xs font-black uppercase tracking-widest border border-blue-200">
            <GraduationCap className="w-4 h-4 text-blue-900" />
            MIF Alumni Guild · Scaled Ventures
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Alumni Ecosystem & Guild
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Graduated startups and pioneering founders from MASTeR Incubation Foundation giving back through active mentorship, partnerships, and ecosystem capital.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search alumni, cohort, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-950"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {["ALL", "SCALING", "PROFITABLE", "ACTIVE"].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition whitespace-nowrap ${
                  selectedStatus === status
                    ? "bg-blue-950 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Alumni Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-900 border-t-orange-500 rounded-full animate-spin" />
          </div>
        ) : filteredAlumni.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 text-sm">
            No alumni profiles match your search criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAlumni.map((alum) => (
              <div
                key={alum.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-slate-300 transition flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  {/* Top Bar: Cohort + Growth Pill */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                      {alum.graduationCohort}
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      alum.growthStatus === "SCALING"
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                        : "bg-blue-100 text-blue-800 border-blue-300"
                    }`}>
                      {alum.growthStatus}
                    </span>
                  </div>

                  {/* Venture Name & HQ */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-950 transition">
                      {alum.startupName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{alum.headquarters}</p>
                  </div>

                  {/* Metrics Strip */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                    <div>
                      <span className="text-xs font-black text-slate-900 block">{alum.currentHeadcount}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Team Size</span>
                    </div>
                    <div>
                      <span className="text-xs font-black text-emerald-700 block">{alum.totalCapitalRaised}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Capital</span>
                    </div>
                    <div>
                      <span className="text-xs font-black text-blue-950 block">{alum.currentRevenueRange}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Revenue</span>
                    </div>
                  </div>

                  {/* Founders */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Leadership</span>
                    <div className="flex flex-wrap gap-2">
                      {alum.founders.map((f, i) => (
                        <div key={i} className="text-xs bg-slate-100 px-2.5 py-1 rounded-lg text-slate-800 font-medium">
                          <strong>{f.name}</strong> · <span className="text-slate-500">{f.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  {alum.tags && alum.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {alum.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-50 text-orange-800 border border-orange-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  {alum.willingToMentor ? (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-emerald-600" /> Open to Mentoring
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">Alumni Member</span>
                  )}

                  <button
                    onClick={() => handleOpenConnect(alum)}
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-blue-950 text-white hover:bg-blue-900 transition flex items-center gap-1.5 shadow-sm"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Connect Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =========================================================================
          CONNECT REQUEST MODAL
         ========================================================================= */}
      {modalOpen && selectedAlumni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">Alumni Guild Network</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  Connect with {selectedAlumni.startupName}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {requestSent ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Connection Request Dispatched!</h4>
                <p className="text-xs text-slate-600">
                  The alumni team has been notified via the MIF Guild messaging hub.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendConnection} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. S. Vignesh"
                    value={requesterName}
                    onChange={(e) => setRequesterName(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Your Official Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@startup.com or name@mamcet.edu.in"
                    value={requesterEmail}
                    onChange={(e) => setRequesterEmail(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Startup / Organization</label>
                  <input
                    type="text"
                    placeholder="e.g. Current MIF Cohort Venture or Partner Org"
                    value={requesterOrg}
                    onChange={(e) => setRequesterOrg(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Introduction & Purpose of Connection</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="State how you wish to collaborate, seek mentorship, or explore technical synergy..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div className="pt-3 flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 rounded-xl bg-blue-950 text-white font-bold hover:bg-blue-900 transition flex items-center gap-1.5"
                  >
                    {submitting ? "Sending..." : "Transmit Connection Request"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
