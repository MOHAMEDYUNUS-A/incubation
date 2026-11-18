"use client";

import React from "react";
import { SOCIAL_FEED_POSTS } from "@/lib/db/mockData";
import {
  ArrowUpRight,
  Heart,
  ThumbsUp,
  Share2,
  ExternalLink,
  Sparkles,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ZoomIn, XYZCard, FadeUp } from "@/components/animations/LightAnimations";

export default function SocialFeedSection() {
  return (
    <section className="py-20 sm:py-24 bg-white relative border-t border-slate-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div data-gsap="reveal-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Community & Real-Time Pulse</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
              Latest from Instagram & LinkedIn
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Real-time updates, ministerial inaugurations, IITMIC partnerships, and MSME Idea Hackathon announcements directly from our official channels.
            </p>
          </div>

          {/* Social Quick-Access Buttons */}
          <div data-gsap="reveal-right" className="flex flex-wrap items-center gap-2.5">
            <a
              href="https://www.instagram.com/master_incubation_foundation/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 hover:bg-pink-50 hover:text-pink-700 hover:border-pink-300 text-xs font-bold gap-1.5 h-10 px-4 shadow-2xs"
              >
                <span>Instagram Feed</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </a>

            <a
              href="https://in.linkedin.com/in/master-incubation-foundation-02301b446"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 text-xs font-bold gap-1.5 h-10 px-4 shadow-2xs"
              >
                <span>LinkedIn Community</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </a>

            <a
              href="https://share.google/V18XLHgF6Rh85vNA0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 text-xs font-bold gap-1.5 h-10 px-4 shadow-2xs"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Google Profile</span>
              </Button>
            </a>
          </div>
        </div>

        {/* 4 Social Cards Grid with GSAP and 3D XYZ Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-gsap-group="stagger">
          {SOCIAL_FEED_POSTS.map((item, idx) => {
            const isInstagram = item.platform === "instagram";

            return (
              <ZoomIn key={item.id} delay={idx * 0.08}>
                <XYZCard depth={10}>
                  <div
                    data-gsap-item="card"
                    className="h-full rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Thumbnail Media */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />

                        {/* Platform Badge */}
                        <div className="absolute top-3 left-3">
                          <span
                            className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full text-white shadow-md flex items-center gap-1 ${
                              isInstagram
                                ? "bg-gradient-to-r from-purple-600 to-pink-600"
                                : "bg-[#0a66c2]"
                            }`}
                          >
                            <span>{isInstagram ? "Instagram" : "LinkedIn"}</span>
                          </span>
                        </div>

                        {/* Date Tag */}
                        <div className="absolute bottom-2.5 left-3 text-[10px] text-white/90 font-medium">
                          {item.date}
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-5">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2 font-medium">
                          <span className="font-bold text-slate-800">{item.handle}</span>
                          <span className="flex items-center gap-1 text-slate-600">
                            {isInstagram ? (
                              <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
                            ) : (
                              <ThumbsUp className="w-3 h-3 text-blue-600 fill-blue-600" />
                            )}
                            <span className="text-[10px] font-semibold">{item.likes}</span>
                          </span>
                        </div>

                        <h3 className="font-bold text-slate-900 text-sm leading-snug mb-2 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-4 mb-4">
                          {item.content}
                        </p>

                        {/* Hashtags */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {item.tags.slice(0, 3).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Link */}
                    <div className="p-4 pt-2 border-t border-slate-100">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-50 hover:bg-blue-600 text-slate-700 hover:text-white text-xs font-bold transition-all border border-slate-200 hover:border-transparent group/link"
                      >
                        <span>View Original Post</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </XYZCard>
              </ZoomIn>
            );
          })}
        </div>

        {/* Live Social Banner Callout at Bottom */}
        <FadeUp className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50/50 to-orange-50/40 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-1 shadow-2xs shrink-0">
              <img
                src="/logos/master-incubation-logo.png"
                alt="MIF"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                Follow @master_incubation_foundation & Connect on LinkedIn
              </h4>
              <p className="text-xs text-slate-600">
                Get weekly announcements on TANSEED grants, MSME Idea Hackathon deadlines, and student startup showcases.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://www.instagram.com/master_incubation_foundation/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm" className="bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold h-9">
                Follow on Instagram
              </Button>
            </a>
            <a
              href="https://in.linkedin.com/in/master-incubation-foundation-02301b446"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm" variant="outline" className="border-slate-300 text-xs font-bold h-9">
                LinkedIn Profile
              </Button>
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
