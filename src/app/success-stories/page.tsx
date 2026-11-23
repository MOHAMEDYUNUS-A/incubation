"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Award,
  ArrowRight,
  TrendingUp,
  Quote,
  ShieldCheck,
  PlayCircle,
  Clock,
  Layers,
  ChevronRight,
} from "lucide-react";
import { SuccessStory } from "@/lib/ecosystem/types";
import { useSiteContent } from "@/context/ContentContext";

export default function SuccessStoriesIndexPage() {
  const { content } = useSiteContent();
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  useEffect(() => {
    async function fetchStories() {
      try {
        const res = await fetch("/api/ecosystem/stories");
        const json = await res.json();
        if (json.success) {
          setStories(json.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchStories();
  }, []);

  const editorialPick = stories.find((s) => s.isEditorialPick) || stories[0];
  const regularStories = stories.filter((s) => s.id !== editorialPick?.id);

  if (content?.featureFlags && content.featureFlags.enableEcosystem === false) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 pt-28">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-lg text-center shadow-xl space-y-4">
          <div className="w-16 h-16 bg-purple-50 text-purple-700 rounded-2xl flex items-center justify-center mx-auto border border-purple-100">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-display">Ecosystem Portal Under Maintenance</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            The Ecosystem community portal is temporarily disabled by MIF Administrators for editorial revisions. It can be re-enabled anytime from the Admin Portal.
          </p>
          <div className="pt-3 flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-xl bg-[#0f2c59] text-white font-bold hover:bg-slate-800 text-xs transition"
            >
              Return to MIF Home
            </Link>
            <Link
              href="/admin"
              className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 text-xs transition"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 pt-32 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Editorial Masthead */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-950 text-xs font-black uppercase tracking-widest border border-red-200">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            Editorial Showcase · MIF Chronicles
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            From Ideas to Impact
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            In-depth case studies, breakthroughs, and field journeys of startups incubated at MASTeR Incubation Foundation, MAMCET Siruganur.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-900 border-t-red-600 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* =========================================================================
                EDITORIAL PICK / FEATURED STORY
               ========================================================================= */}
            {editorialPick && (
              <div className="relative overflow-hidden bg-white border border-slate-200/90 rounded-3xl shadow-xl shadow-blue-950/5 group hover:border-slate-300 transition">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-950 border border-blue-200">
                          Editorial Highlight
                        </span>
                        <span className="text-xs font-bold text-red-600">
                          {editorialPick.startupName}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-blue-950 transition">
                        <Link href={`/success-stories/${editorialPick.slug}`}>
                          {editorialPick.title}
                        </Link>
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {editorialPick.theBreakthrough}
                      </p>
                    </div>

                    {/* Impact Metrics Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-slate-100">
                      {editorialPick.impactMetrics.slice(0, 4).map((metric, i) => (
                        <div key={i} className="space-y-0.5">
                          <span className="text-lg sm:text-xl font-black text-blue-950">{metric.value}</span>
                          <p className="text-[10px] uppercase font-bold text-slate-400 line-clamp-1">{metric.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Founder Quote */}
                    {editorialPick.founderQuote && (
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                        <p className="text-xs text-slate-700 italic line-clamp-2">
                          &ldquo;{editorialPick.founderQuote}&rdquo;
                        </p>
                        <p className="text-[11px] font-bold text-slate-900">— {editorialPick.quoteAuthor}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <Link
                        href={`/success-stories/${editorialPick.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-950 text-white font-bold text-xs hover:bg-blue-900 transition shadow-sm"
                      >
                        Read Full Story <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      {editorialPick.interview && (
                        <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                          <PlayCircle className="w-4 h-4 text-red-600" /> Video Interview Included
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden bg-slate-900">
                    <img
                      src={editorialPick.heroImage}
                      alt={editorialPick.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent lg:hidden" />
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                ADDITIONAL SUCCESS STORIES GRID
               ========================================================================= */}
            {regularStories.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <h3 className="text-xl font-black text-slate-900">More Incubated Impact Stories</h3>
                  <span className="text-xs font-semibold text-slate-500">{regularStories.length} Published Case Studies</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {regularStories.map((story) => (
                    <div
                      key={story.id}
                      className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition flex flex-col justify-between group"
                    >
                      <div className="relative h-56 overflow-hidden bg-slate-100">
                        <img
                          src={story.heroImage}
                          alt={story.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase text-blue-950 border border-slate-200">
                          {story.startupName}
                        </div>
                      </div>

                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h4 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-blue-950 transition line-clamp-2">
                            <Link href={`/success-stories/${story.slug}`}>
                              {story.title}
                            </Link>
                          </h4>
                          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                            {story.theBreakthrough}
                          </p>
                        </div>

                        {/* Metrics Badges */}
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                          {story.impactMetrics.slice(0, 2).map((metric, i) => (
                            <div key={i} className="bg-slate-50 p-2 rounded-xl text-center border border-slate-100">
                              <span className="text-sm font-black text-blue-950 block">{metric.value}</span>
                              <span className="text-[10px] text-slate-400 font-bold uppercase">{metric.label}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                          <Link
                            href={`/success-stories/${story.slug}`}
                            className="text-xs font-bold text-blue-950 hover:text-red-600 transition inline-flex items-center gap-1"
                          >
                            Explore Impact Story <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <span className="text-[11px] text-slate-400">
                            {new Date(story.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
