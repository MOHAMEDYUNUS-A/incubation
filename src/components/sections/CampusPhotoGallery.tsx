"use client";

import React, { useState } from "react";
import {
  Camera,
  Layers,
  Sparkles,
  Maximize2,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2,
  Cpu,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp, ZoomIn, XYZCard, RevealLeft, RevealRight } from "@/components/animations/LightAnimations";
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

const GALLERY_PHOTOS: GalleryPhoto[] = [
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
    title: "MASTeR Incubation Core Committee",
    category: "team",
    categoryLabel: "Foundation Leadership",
    image: "/images/incubation/team-of-incubation.jpeg",
    caption: "Dedicated faculty mentors, innovation directors, and advisory committee advancing entrepreneurship.",
    location: "MAMCET Trichy",
  },
  {
    id: "g4",
    title: "Dr. Hemalatha Balakrishnan",
    category: "team",
    categoryLabel: "Incubation Coordinator",
    image: "/images/incubation/incubation-coordinator-hemalatha.jpeg",
    caption: "Incubation Coordinator driving interdisciplinary prototyping, grant mentoring, and student hackathons.",
    location: "MAMCET ECE & MIF",
  },
  {
    id: "g5",
    title: "Entrepreneurship & Bootcamp Flyer",
    category: "events",
    categoryLabel: "Events & Announcements",
    image: "/images/incubation/flyer.jpeg",
    caption: "Official notification for upcoming maker sprints, TANSEED workshops, and ideation hackathons.",
    location: "StartupTN Regional Calendar",
  },
  {
    id: "g6",
    title: "Hardware Prototyping & Test Benches",
    category: "labs",
    categoryLabel: "Hardware Labs",
    image: "/images/incubation/img-21.jpeg",
    caption: "Equipped with digital oscilloscopes, spectrum analyzers, and SMD soldering workbenches.",
    location: "Electronics Prototyping Bay",
  },
  {
    id: "g7",
    title: "Embedded Circuit Development Workstations",
    category: "labs",
    categoryLabel: "Hardware Labs",
    image: "/images/incubation/img-23.jpeg",
    caption: "Hands-on benchtop environments for IoT sensor integration, LoRa transceivers, and firmware debugging.",
    location: "Maker Space Station 2",
  },
  {
    id: "g8",
    title: "Collaborative Ideation & Meeting Pods",
    category: "facilities",
    categoryLabel: "Co-Working Hub",
    image: "/images/incubation/img-32.jpeg",
    caption: "Interactive breakout zones where student teams and corporate advisors review venture prototypes.",
    location: "Ideation Zone",
  },
  {
    id: "g9",
    title: "Resident Founder Collaborative Bay",
    category: "facilities",
    categoryLabel: "Co-Working Hub",
    image: "/images/incubation/img-33.jpeg",
    caption: "Dedicated working environment for early-stage incubated teams to collaborate across disciplines.",
    location: "Resident Cohort Floor",
  },
  {
    id: "g10",
    title: "Rapid 3D Fabrication & Testing Station",
    category: "labs",
    categoryLabel: "Fabrication Lab",
    image: "/images/incubation/img-43.jpeg",
    caption: "Industrial additive manufacturing tools for rapid product casing and mechanical PoC validation.",
    location: "Fabrication Unit",
  },
  {
    id: "g11",
    title: "Electronic Measurement & Telemetry Bay",
    category: "labs",
    categoryLabel: "Hardware Labs",
    image: "/images/incubation/img-54.jpeg",
    caption: "Dedicated electronics testing instruments for validating battery management and power circuits.",
    location: "CleanTech Test Lab",
  },
  {
    id: "g12",
    title: "Incubation Auditorium & Workshop Sessions",
    category: "events",
    categoryLabel: "Events & Workshops",
    image: "/images/incubation/image-3.jpeg",
    caption: "Packed auditorium of student founders, faculty researchers, and industry specialists at MAMCET.",
    location: "Main Innovation Hall",
  },
  {
    id: "g13",
    title: "Interactive Founder Masterclass",
    category: "events",
    categoryLabel: "Events & Workshops",
    image: "/images/incubation/image-43.jpeg",
    caption: "Live pitch evaluation, technology readiness assessment, and grant writing coaching.",
    location: "Seminar Wing",
  },
];

type CategoryFilter = "all" | "facilities" | "labs" | "team" | "events";

export default function CampusPhotoGallery() {
  const { content } = useSiteContent();
  const photos: GalleryPhoto[] = (content?.gallery as GalleryPhoto[]) || GALLERY_PHOTOS;

  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const filteredPhotos =
    activeFilter === "all"
      ? photos
      : photos.filter((p) => p.category === activeFilter);

  return (
    <section id="gallery" className="py-20 sm:py-24 bg-white relative border-t border-slate-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <RevealLeft className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
              On-Campus Innovation & Facilities
            </h2>
            <p className="text-base text-slate-600 mt-2 leading-relaxed">
              Authentic on-site photographs of the MASTeR Incubation Foundation centre, prototyping laboratories, co-working workstations, and mentoring sessions at MAMCET, Siruganur, Trichy.
            </p>
          </RevealLeft>

          {/* Filter Pills */}
          <RevealRight className="flex flex-wrap items-center gap-2">
            {[
              { key: "all", label: "All Photos", count: GALLERY_PHOTOS.length },
              { key: "facilities", label: "Incubation Centre", count: 4 },
              { key: "labs", label: "Labs & Fabrication", count: 4 },
              { key: "team", label: "Team & Leadership", count: 2 },
              { key: "events", label: "Events & Workshops", count: 3 },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key as CategoryFilter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                  activeFilter === tab.key
                    ? "bg-[#0f2c59] text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeFilter === tab.key ? "bg-white/20 text-white" : "bg-white text-slate-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </RevealRight>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <ZoomIn key={photo.id} delay={idx * 0.04}>
              <XYZCard depth={8}>
                <div
                  onClick={() => setSelectedPhoto(photo)}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-lg hover:border-blue-300 transition-all duration-300 group cursor-pointer flex flex-col justify-between h-full"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0f2c59] border border-white shadow-2xs">
                        {photo.categoryLabel}
                      </span>
                    </div>

                    {/* Zoom Icon Button */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-800 shadow-md">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Bottom Info on image */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-[11px] text-orange-300 font-semibold uppercase tracking-wider block">
                        {photo.location}
                      </span>
                      <h4 className="text-base font-bold line-clamp-1 mt-0.5">{photo.title}</h4>
                    </div>
                  </div>

                  <div className="p-4 bg-white">
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              </XYZCard>
            </ZoomIn>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-slate-900">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 sm:p-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
                <Building2 className="w-3.5 h-3.5" />
                <span>{selectedPhoto.categoryLabel}</span>
                <span className="mx-1">·</span>
                <span>{selectedPhoto.location}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 font-display">
                {selectedPhoto.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
