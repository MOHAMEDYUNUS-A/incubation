"use client";

import React, { useState, useEffect } from "react";
import {
  Rocket,
  CheckCircle2,
  Clock,
  Search,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function AdminPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("ALL");
  const [activeTab, setActiveTab] = useState<"applications" | "analytics">("applications");

  const fetchApps = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/applications");
      const data = await res.json();
      if (data.success) {
        setApplications(data.data || []);
      }
    } catch {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleUpdateStatus = (appId: string, newStatus: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
    );
  };

  const filteredApps = applications.filter((app) => {
    const matchSearch =
      app.startupName?.toLowerCase().includes(search.toLowerCase()) ||
      app.founderName?.toLowerCase().includes(search.toLowerCase()) ||
      app.category?.toLowerCase().includes(search.toLowerCase());

    const matchCat = filterCategory === "ALL" || app.category === filterCategory;

    return matchSearch && matchCat;
  });

  const totalSubmitted = applications.length;
  const totalIncubated = applications.filter((a) => a.status === "INCUBATED").length;
  const totalShortlisted = applications.filter((a) => a.status === "SHORTLISTED_FOR_PITCH").length;

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                ADMIN ACCESS
              </span>
              <span className="text-xs text-slate-500 font-medium">
                MASTeR Incubation Foundation
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-1 font-display">
              Incubation Operations Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={fetchApps}
              variant="outline"
              size="sm"
              className="text-xs border-slate-300 text-slate-700 hover:bg-white gap-1.5 shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh Pipeline</span>
            </Button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2 text-slate-500">
              <span className="text-xs font-bold uppercase">Total Applications</span>
              <Rocket className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{totalSubmitted}</div>
            <span className="text-[11px] text-slate-500 mt-1 block">Active screening pipeline</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2 text-slate-500">
              <span className="text-xs font-bold uppercase">Pitch Shortlisted</span>
              <Clock className="w-4 h-4 text-cyan-600" />
            </div>
            <div className="text-3xl font-extrabold text-blue-600">{totalShortlisted}</div>
            <span className="text-[11px] text-slate-500 mt-1 block">Scheduled for Boardroom Pitch</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2 text-slate-500">
              <span className="text-xs font-bold uppercase">Incubated Startups</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-600">{totalIncubated}</div>
            <span className="text-[11px] text-slate-500 mt-1 block">Resident cohort ventures</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2 text-slate-500">
              <span className="text-xs font-bold uppercase">Statutory Center</span>
              <ShieldCheck className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-sm font-bold text-slate-900 mt-1">StartupTN Pre-Incubator</div>
            <span className="text-[11px] text-slate-500 mt-1 block">MAMCET Siruganur</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-6">
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "applications"
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-white"
            }`}
          >
            Application Intake Pipeline ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "analytics"
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-white"
            }`}
          >
            Analytics & Domain Distribution
          </button>
        </div>

        {/* APPLICATIONS TAB */}
        {activeTab === "applications" && (
          <div className="space-y-4">
            {/* Filter and Search */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter by startup name, founder, or track..."
                  className="pl-10 h-10 text-xs"
                />
              </div>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-800 shadow-2xs"
              >
                <option value="ALL">All Focus Areas</option>
                <option value="ELECTRONICS_IOT_SMART">Electronics & IoT</option>
                <option value="RENEWABLE_ENERGY_CLEAN_TECH">Renewable Energy</option>
                <option value="AI_DATA_SCIENCE">AI & Data Science</option>
                <option value="ADVANCED_MANUFACTURING">Advanced Manufacturing</option>
              </select>
            </div>

            {/* Applications List */}
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100">
                {filteredApps.map((app) => (
                  <div key={app.id} className="p-5 sm:p-6 hover:bg-slate-50/70 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <h3 className="text-base font-bold text-slate-900">
                            {app.startupName}
                          </h3>
                          <Badge
                            variant={
                              app.status === "INCUBATED"
                                ? "emerald"
                                : app.status === "SHORTLISTED_FOR_PITCH"
                                ? "cyan"
                                : "outline"
                            }
                            className="text-[10px]"
                          >
                            {app.status}
                          </Badge>
                          <span className="text-[10px] text-slate-500 font-medium">
                            Stage: {app.stage}
                          </span>
                        </div>

                        <div className="text-xs text-slate-600">
                          Founder: <span className="text-slate-900 font-semibold">{app.founderName}</span> ({app.founderEmail} · {app.founderPhone})
                        </div>

                        <p className="text-xs text-slate-600 mt-2 line-clamp-2 max-w-3xl">
                          <strong>Problem:</strong> {app.problemStatement}
                        </p>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2 max-w-3xl">
                          <strong>Solution:</strong> {app.proposedSolution}
                        </p>
                      </div>

                      {/* Status Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <select
                          value={app.status}
                          onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                          className="h-9 rounded-lg border border-slate-300 bg-white px-2.5 text-xs text-slate-800 shadow-2xs"
                        >
                          <option value="SUBMITTED">SUBMITTED</option>
                          <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                          <option value="SHORTLISTED_FOR_PITCH">SHORTLISTED_FOR_PITCH</option>
                          <option value="INCUBATED">INCUBATED</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredApps.length === 0 && (
                  <div className="py-16 text-center text-slate-500 text-xs">
                    No matching applications found in the intake pipeline.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-4">
                Applications by Focus Domain
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-700 mb-1">
                    <span>Electronics & IoT Systems</span>
                    <span className="font-bold text-blue-600">40%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-blue-600 w-[40%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 mb-1">
                    <span>Renewable Energy & Clean Tech</span>
                    <span className="font-bold text-emerald-600">25%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-emerald-600 w-[25%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 mb-1">
                    <span>Artificial Intelligence & Software</span>
                    <span className="font-bold text-indigo-600">20%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-indigo-600 w-[20%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 mb-1">
                    <span>Advanced Manufacturing</span>
                    <span className="font-bold text-amber-600">15%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-amber-600 w-[15%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-4">
                Screening Funnel Conversion
              </h3>
              <div className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-700">1. Applications Submitted</span>
                  <span className="font-bold text-slate-900">{totalSubmitted}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-700">2. Technical Committee Review</span>
                  <span className="font-bold text-blue-700 font-mono">100% screened</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-700">3. Boardroom Pitch Shortlist</span>
                  <span className="font-bold text-amber-700 font-mono">{totalShortlisted}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-700">4. Formal Incubation Admission</span>
                  <span className="font-bold text-emerald-700 font-mono">{totalIncubated}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
