"use client";

import React, { useState } from "react";
import { Award, Sparkles, X, MapPin, ZoomIn, Calendar } from "lucide-react";

interface InauguralPhoto {
  id: string;
  title: string;
  tag: string;
  image: string;
  caption: string;
  date: string;
  location: string;
}

const INAUGURAL_PHOTOS: InauguralPhoto[] = [
  {
    id: "inaug-1",
    title: "Minister Keynote & Dignitary Stage Address",
    tag: "Ministerial Keynote",
    image: "/images/incubation/image-3.jpeg",
    caption:
      "Hon'ble Minister Thiru S. Regupathy, Minister for Minerals and Mines, Government of Tamil Nadu, formally declaring MASTeR Incubation Centre open at MAMCET campus.",
    date: "March 3, 2026",
    location: "Main Auditorium, MAMCET Trichy",
  },
  {
    id: "inaug-2",
    title: "Foundation Board & Executive Steering Council",
    tag: "Leadership Launch",
    image: "/images/incubation/team-of-incubation.jpeg",
    caption:
      "MASTeR Incubation Foundation directors, MAMCET management trustees, and senior faculty directors at the inaugural ceremony.",
    date: "March 3, 2026",
    location: "Campus Central Wing",
  },
  {
    id: "inaug-3",
    title: "Execution of 8 Industry & Ecosystem MoUs",
    tag: "Industry MoUs",
    image: "/images/incubation/img-43.jpeg",
    caption:
      "Signing formal bilateral MoUs with corporate partners, angel networks, and IITMIC incubation mentors to accelerate resident student ventures.",
    date: "March 3, 2026",
    location: "Executive Boardroom",
  },
  {
    id: "inaug-4",
    title: "Official Inauguration Ceremony Invitation & Program",
    tag: "Official Schedule",
    image: "/images/incubation/flyer.jpeg",
    caption:
      "Formal invitation flyer for the grand opening ceremony of MASTeR Incubation Foundation with ministerial and academic dignitaries.",
    date: "March 3, 2026",
    location: "Siruganur Campus",
  },
  {
    id: "inaug-5",
    title: "MIF Physical Incubation Hub & Dedicated Wing",
    tag: "Facility Dedication",
    image: "/images/incubation/incubation-centre.jpeg",
    caption:
      "Unveiling of the dedicated 4,000 sq. ft. physical pre-incubation facility with 15+ resident desks and 15-seater boardroom recognised under StartupTN and MSME frameworks.",
    date: "March 3, 2026",
    location: "Incubation Centre Wing",
  },
  {
    id: "inaug-6",
    title: "Orientation of First 25 Incubated Startup Founders",
    tag: "Cohort Intake",
    image: "/images/incubation/img-32.jpeg",
    caption:
      "Onboarding the inaugural cohort of 25 student and faculty-led early-stage ventures into the structured MIF milestone tracking program.",
    date: "March 3, 2026",
    location: "Seminar Hall B",
  },
];

export default function InauguralMomentsGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<InauguralPhoto | null>(null);

  return (
    <div className="mb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200/80 text-[#dc2626] text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5 text-red-600" />
            <span>HISTORIC LAUNCH ARCHIVE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
            Inaugural Moments & Ceremony Highlights
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
            Photographs documenting the official launch by Hon&apos;ble Minister Thiru S. Regupathy, the signing of 8 industry MoUs, and the onboarding of our initial 25 resident startups.
          </p>
        </div>
      </div>

      {/* Responsive Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {INAUGURAL_PHOTOS.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="group cursor-pointer rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-red-500 transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Image Container */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Tag Badge */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0f2c59] text-[10px] font-extrabold shadow-xs">
                    {photo.tag}
                  </span>
                </div>

                {/* Magnify Indicator */}
                <div className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>

                {/* Overlaid Title */}
                <div className="absolute bottom-3 left-4 right-4 z-10 text-white">
                  <h3 className="font-bold text-sm sm:text-base font-display line-clamp-1 !text-white text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] group-hover:text-red-400 transition-colors">
                    {photo.title}
                  </h3>
                </div>
              </div>

              {/* Caption Description */}
              <div className="p-5">
                <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-3 mb-4">
                  {photo.caption}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1 text-[#dc2626] font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    {photo.date}
                  </span>
                  <span className="flex items-center gap-1 truncate max-w-[170px]">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    {photo.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
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
                <span className="px-3 py-1 rounded-full bg-red-50 text-[#dc2626] border border-red-200 text-xs font-bold uppercase tracking-wider">
                  {selectedPhoto.tag}
                </span>
                <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-red-600" />
                  {selectedPhoto.date}
                </span>
                <span className="text-xs text-slate-500 font-semibold flex items-center gap-1 ml-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
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
    </div>
  );
}
