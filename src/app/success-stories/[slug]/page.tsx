"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Award,
  ArrowLeft,
  ChevronRight,
  PlayCircle,
  Video,
  Clock,
  ShieldCheck,
  Quote,
  CheckCircle2,
  ExternalLink,
  Share2,
} from "lucide-react";
import { SuccessStory } from "@/lib/ecosystem/types";

export default function SingleSuccessStoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const [story, setStory] = useState<SuccessStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTimestamp, setActiveTimestamp] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStory() {
      try {
        const res = await fetch(`/api/ecosystem/stories?slug=${slug}`);
        const json = await res.json();
        if (json.success) {
          setStory(json.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchStory();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24 pb-16">
        <div className="w-12 h-12 border-4 border-blue-900 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24 pb-16 px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md text-center shadow-lg space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Story Not Found</h2>
          <p className="text-xs text-slate-600">The requested success story chronicle could not be located.</p>
          <Link
            href="/success-stories"
            className="inline-block px-4 py-2 text-xs font-bold rounded-xl bg-blue-950 text-white"
          >
            Back to Stories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 pt-24 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/success-stories"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Chronicles
          </Link>
          <span className="text-xs text-slate-400">
            Published: {new Date(story.publishedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>

        {/* Hero Editorial Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-950 border border-blue-200">
              {story.startupName}
            </span>
            <span className="text-xs text-slate-500 font-medium">Case Study</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {story.title}
          </h1>
        </div>

        {/* Feature Image Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 max-h-[480px]">
          <img
            src={story.heroImage}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Key Impact Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {story.impactMetrics.map((metric, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center space-y-1">
              <span className="text-2xl font-black text-blue-950 block">{metric.value}</span>
              <span className="text-xs font-bold text-slate-800 block">{metric.label}</span>
              <span className="text-[10px] text-slate-500 block">{metric.detail}</span>
            </div>
          ))}
        </div>

        {/* Main Narrative Articles */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          {/* 1. Problem Statement */}
          <div className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-red-100 text-red-700 font-black text-xs flex items-center justify-center">01</span>
              The Challenge & Problem Identified
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {story.problemStatement}
            </p>
          </div>

          {/* 2. The Technological Breakthrough */}
          <div className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-orange-100 text-orange-700 font-black text-xs flex items-center justify-center">02</span>
              The Breakthrough Solution
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {story.theBreakthrough}
            </p>
          </div>

          {/* 3. Incubation Journey at MIF */}
          <div className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center">03</span>
              Incubation at MASTeR Incubation Foundation
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {story.mifJourney}
            </p>
          </div>

          {/* Pull Quote */}
          {story.founderQuote && (
            <div className="bg-gradient-to-br from-blue-950 to-blue-900 text-white p-6 sm:p-8 rounded-2xl space-y-3 shadow-md">
              <Quote className="w-8 h-8 text-orange-400" />
              <p className="text-sm sm:text-base italic leading-relaxed text-blue-50">
                "{story.founderQuote}"
              </p>
              <p className="text-xs font-bold text-orange-300">
                — {story.quoteAuthor}
              </p>
            </div>
          )}
        </div>

        {/* =========================================================================
            MULTIMEDIA FOUNDER INTERVIEW & INTERACTIVE TRANSCRIPT
           ========================================================================= */}
        {story.interview && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Multimedia Interview</span>
                <h3 className="text-xl font-black text-slate-900">{story.interview.interviewTitle}</h3>
              </div>
            </div>

            {/* Video Player Embed */}
            {story.interview.videoUrl && (
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg">
                <iframe
                  src={story.interview.videoUrl}
                  title={story.interview.interviewTitle}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* Key Takeaways */}
            {story.interview.keyTakeaways && story.interview.keyTakeaways.length > 0 && (
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
                <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">Key Founder Takeaways</h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {story.interview.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Synchronized Transcript */}
            {story.interview.transcript && story.interview.transcript.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h4 className="text-sm font-bold text-slate-900">Synchronized Interview Transcript</h4>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {story.interview.transcript.map((item, i) => (
                    <div
                      key={i}
                      className={`p-3.5 rounded-xl border transition ${
                        activeTimestamp === item.time
                          ? "bg-blue-50 border-blue-300"
                          : "bg-slate-50/60 border-slate-200 hover:bg-slate-100/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <button
                          onClick={() => setActiveTimestamp(item.time)}
                          className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-950 text-white"
                        >
                          {item.time}
                        </button>
                        <span className="text-xs font-bold text-slate-800">{item.speaker}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer Link to Passport */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <span className="text-xs text-orange-400 font-bold uppercase tracking-wider block">Official Credential</span>
            <h4 className="text-xl font-bold mt-0.5">Explore {story.startupName}'s Startup Passport</h4>
            <p className="text-xs text-blue-200 mt-1">Review verified milestones, mentor evaluations, and institutional achievements.</p>
          </div>
          <Link
            href={`/startup-passport/MASTER-SP-2026-0001`}
            className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition shadow-sm whitespace-nowrap"
          >
            View Official Passport
          </Link>
        </div>
      </div>
    </div>
  );
}
