"use client";

import React, { useState } from "react";
import {
  Camera,
  Sparkles,
  Maximize2,
  X,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Eye,
  LayoutGrid,
  Film,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/context/ContentContext";

export interface GalleryPhoto {
  id: string;
  title: string;
  category: "facilities" | "labs" | "team" | "events";
  categoryLabel: string;
  image: string;
  caption: string;
  location: string;
}

const DEFAULT_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "g1",
    title: "MASTeR Incubation Centre Facility",
    category: "facilities",
    categoryLabel: "Incubation Facility",
    image: "/images/incubation/incubation-centre.jpeg",
    caption: "Official institutional incubator hub at MAMCET campus, recognised under StartupTN and MSME.",
    location: "Campus Central Wing, Siruganur",
  },
  {
    id: "g2",
    title: "Plug-and-Play Startup Workspace",
    category: "facilities",
    categoryLabel: "Co-Working Hub",
    image: "/images/incubation/incubation-workspace.jpeg",
    caption: "Fully furnished ergonomic founder desks with gigabit Wi-Fi and collaboration marker pods.",
    location: "MIF Workstation Floor",
  },
  {
    id: "g3",
    title: "Multidisciplinary Seminar & Mentoring Auditorium",
    category: "events",
    categoryLabel: "Seminar Auditorium",
    image: "/images/incubation/image-3.jpeg",
    caption: "Allotted 6,000+ sq. ft. facility hosting startup pitch cohorts, investor roundtables, and masterclasses.",
    location: "Host Institution Incubation Wing",
  },
  {
    id: "g4",
    title: "Hands-on IoT & Sensor Test Bench",
    category: "labs",
    categoryLabel: "Hardware Makerspace",
    image: "/images/incubation/img-54.jpeg",
    caption: "Precision benchtop oscilloscopes, signal generators, and embedded test jigs for IoT validation.",
    location: "MIF Prototyping Lab",
  },
  {
    id: "g5",
    title: "MASTeR Incubation Core Committee",
    category: "team",
    categoryLabel: "Foundation Leadership",
    image: "/images/incubation/team-of-incubation.jpeg",
    caption: "Dedicated faculty mentors, innovation directors, and advisory committee advancing entrepreneurship.",
    location: "MAMCET Trichy",
  },
  {
    id: "g6",
    title: "Electronic Telemetry & Circuit Prototyping",
    category: "labs",
    categoryLabel: "Electronics Lab",
    image: "/images/incubation/img-21.jpeg",
    caption: "Hardware workstations for custom PCB design, SMD assembly, and power supply calibration.",
    location: "Hardware Testing Bay 2",
  },
  {
    id: "g7",
    title: "Microcontroller Slicing & Firmware Debug",
    category: "labs",
    categoryLabel: "Firmware Station",
    image: "/images/incubation/img-23.jpeg",
    caption: "High-performance workstations for firmware compilation, logic analysis, and wireless telemetry.",
    location: "IoT Workbench",
  },
  {
    id: "g8",
    title: "Dr. Hemalatha Balakrishnan",
    category: "team",
    categoryLabel: "Incubation Coordinator",
    image: "/images/incubation/incubation-coordinator-hemalatha.jpeg",
    caption: "Incubation Coordinator driving interdisciplinary prototyping, grant mentoring, and student hackathons.",
    location: "MAMCET ECE & MIF",
  },
  {
    id: "g9",
    title: "Startup Orientation & Ideation Workshop",
    category: "events",
    categoryLabel: "Ecosystem Event",
    image: "/images/incubation/img-32.jpeg",
    caption: "Interactive founder sprint introducing lean canvas modeling and design thinking to students.",
    location: "Auditorium Hall B",
  },
  {
    id: "g10",
    title: "Collaborative Cohort Ideation Session",
    category: "events",
    categoryLabel: "Ideation Bootcamp",
    image: "/images/incubation/img-33.jpeg",
    caption: "Interdisciplinary team brainstorming solving Tier-2/3 agricultural, energy, and medical problems.",
    location: "Seminar Room 3",
  },
  {
    id: "g11",
    title: "Founder Mentorship & Technical Review",
    category: "events",
    categoryLabel: "Mentoring Session",
    image: "/images/incubation/img-43.jpeg",
    caption: "One-on-one technology readiness level (TRL) evaluation with senior academic and industry advisors.",
    location: "Conference Boardroom",
  },
  {
    id: "g12",
    title: "Hardware Prototyping Showcase",
    category: "labs",
    categoryLabel: "Demo Bay",
    image: "/images/incubation/image43.jpeg",
    caption: "Student and faculty innovators demonstrating functional prototypes to institutional evaluators.",
    location: "Demo Laboratory",
  },
];

export default function CampusPhotoGallery() {
  const { content } = useSiteContent();
  const photos: GalleryPhoto[] = (content?.gallery as GalleryPhoto[]) || DEFAULT_GALLERY_PHOTOS;

  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [viewMode, setViewMode] = useState<"reel" | "grid">("reel");

  // Divide photos into two rows for the dual-running continuous marquee effect
  const row1 = photos.slice(0, Math.ceil(photos.length / 2));
  const row2 = photos.slice(Math.ceil(photos.length / 2));

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        {/* Header - Matching Image 7 "Moments That Matter" */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Camera className="w-3.5 h-3.5 text-orange-600" />
              <span>Campus Innovation Visuals</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 font-display tracking-tight">
              Moments That Matter
            </h2>
            <p className="text-base sm:text-lg text-slate-700 mt-2 font-normal leading-relaxed">
              Snapshots of student breakthroughs, prototype fabrication, hackathons, and seed grant mentoring on the MAMCET Siruganur campus.
            </p>
          </div>

          {/* View Mode Toggle: Running Reel vs 4-Column Grid (Matching Reference Image 7) */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shrink-0">
            <button
              onClick={() => setViewMode("reel")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === "reel"
                  ? "bg-[#0f2c59] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Running Reel (L → R)</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === "grid"
                  ? "bg-[#0f2c59] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Photo Grid (4 Columns)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mode 1: Running Left to Right Marquee Reel */}
      {viewMode === "reel" && (
        <div className="relative w-full space-y-6 overflow-hidden">
          {/* Soft edge gradient fades */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Row 1: Flowing Left to Right */}
          <div className="flex w-max gap-6 animate-marquee-ltr hover:[animation-play-state:paused]">
            {[...row1, ...row1, ...row1].map((photo, idx) => (
              <div
                key={`r1-${idx}`}
                onClick={() => setSelectedPhoto(photo)}
                className="cursor-pointer group relative w-72 sm:w-80 md:w-96 aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-orange-400 transition-all duration-300 shrink-0 bg-slate-100"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#0f2c59] text-[10px] font-bold shadow-xs">
                    {photo.categoryLabel}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h4 className="font-bold text-sm sm:text-base font-display line-clamp-1 group-hover:text-orange-300 transition-colors">
                    {photo.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-1 font-normal mt-0.5">
                    {photo.caption}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-orange-400 mt-1 font-semibold">
                    <MapPin className="w-3 h-3" />
                    <span>{photo.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Flowing Left to Right at Gentle Pace */}
          <div className="flex w-max gap-6 animate-marquee-ltr-slow hover:[animation-play-state:paused]">
            {[...row2, ...row2, ...row2].map((photo, idx) => (
              <div
                key={`r2-${idx}`}
                onClick={() => setSelectedPhoto(photo)}
                className="cursor-pointer group relative w-72 sm:w-80 md:w-96 aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-orange-400 transition-all duration-300 shrink-0 bg-slate-100"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#0f2c59] text-[10px] font-bold shadow-xs">
                    {photo.categoryLabel}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h4 className="font-bold text-sm sm:text-base font-display line-clamp-1 group-hover:text-orange-300 transition-colors">
                    {photo.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-1 font-normal mt-0.5">
                    {photo.caption}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-orange-400 mt-1 font-semibold">
                    <MapPin className="w-3 h-3" />
                    <span>{photo.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mode 2: Curated 4-Column Photo Grid (Matching Reference Image 7 Exactly) */}
      {viewMode === "grid" && (
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="cursor-pointer group relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-400 transition-all duration-300 bg-slate-100"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[#0f2c59] text-[9px] sm:text-[10px] font-bold mb-1 shadow-2xs">
                    {photo.categoryLabel}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm font-display line-clamp-1 text-white group-hover:text-orange-300 transition-colors">
                    {photo.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox High-Resolution Full Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 flex items-center justify-center transition-colors shadow-lg"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-black">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 sm:p-8 bg-white border-t border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200 text-xs font-bold uppercase tracking-wider">
                  {selectedPhoto.categoryLabel}
                </span>
                <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-600" />
                  {selectedPhoto.location}
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 font-display mb-2">
                {selectedPhoto.title}
              </h3>
              <p className="text-base text-slate-700 leading-relaxed font-normal">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
