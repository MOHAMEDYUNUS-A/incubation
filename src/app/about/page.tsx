import React from "react";
import Link from "next/link";
import { FOUNDATION_INFO } from "@/lib/db/mockData";
import {
  Shield,
  Target,
  Compass,
  ArrowRight,
  ExternalLink,
  Award,
  Users,
  Landmark,
  MapPin,
  Building2,
  Sparkles,
  Phone,
  Mail,
  CheckCircle2,
  Quote,
  Rocket,
  Lightbulb,
  Microscope,
  Handshake,
  TrendingUp,
  Globe2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CampusPhotoGallery from "@/components/sections/CampusPhotoGallery";
import InauguralMomentsGallery from "@/components/sections/InauguralMomentsGallery";
import MissionRoadmap from "@/components/sections/MissionRoadmap";

export const metadata = {
  title: "About Us | MASTeR Incubation Foundation (MIF)",
  description:
    "Learn about the Section 8 not-for-profit company, StartupTN Pre-Incubation Centre accreditation, infrastructure facilities, and governance at MAMCET Siruganur, Trichy.",
  openGraph: {
    title: "About Us | MASTeR Incubation Foundation (MIF)",
    description:
      "Premier Technology Business Incubator & StartupTN Pre-Incubation Centre at MAMCET Campus, Siruganur, Trichy.",
    url: "https://master-incubation.vercel.app/about",
    siteName: "MASTeR Incubation Foundation",
    images: [
      {
        url: "/images/incubation/incubation-centre.jpeg",
        width: 1200,
        height: 630,
        alt: "MASTeR Incubation Foundation Campus Facility at MAMCET",
      },
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "MASTeR Incubation Foundation Official Digital Crest",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | MASTeR Incubation Foundation (MIF)",
    description:
      "Premier Technology Business Incubator & StartupTN Pre-Incubation Centre at MAMCET Campus, Siruganur, Trichy.",
    images: ["/images/incubation/incubation-centre.jpeg"],
  },
};

const LEADERSHIP_TEAM = [
  {
    name: "Dr. X. Susan Christina",
    role: "Principal, MAMCET & Director, MIF",
    organization: "M.A.M. College of Engineering and Technology",
    image: "/images/leadership/susan-christina.jpg",
    badge: "Director MIF",
    specialty: "Institutional Strategy & Research Alliances",
  },
  {
    name: "Dr. B. Muruganantham",
    role: "Registrar, MAMCET & Assistant Director, MIF",
    organization: "M.A.M. College of Engineering and Technology",
    image: "/images/leadership/muruganantham.jpg",
    badge: "Assistant Director",
    specialty: "Academic Credit Integration & Regulatory Compliance",
  },
  {
    name: "Dr. S. Rajasekaran",
    role: "Dean, MASTeR Group & CEO, MIF",
    organization: "MASTeR Group of Institutions",
    image: "/images/leadership/rajasekaran.jpg",
    badge: "CEO MIF",
    specialty: "Venture Scaling & TANSEED/MSME Seed Syndication",
  },
  {
    name: "Mr. M. Santhosh Kumar",
    role: "Incubation Manager",
    organization: "MASTeR Incubation Foundation",
    image: "/images/incubation/santhosh.jpeg",
    badge: "Operations Lead",
    phone: "+91 9361697702",
    email: "incubationmanager@mamcet.com",
    specialty: "Cohort Admissions, Prototyping Labs & Startup Passport",
  },
  {
    name: "Ms. Hemalatha Balakrishnan",
    role: "Incubation Coordinator",
    organization: "Department of ECE, MAMCET",
    image: "/images/incubation/incubation-coordinator-hemalatha.jpeg",
    badge: "Academic Coordinator",
    phone: "+91 6381945574",
    email: "hemalathabalakrishnan.ece@mamcet.com",
    specialty: "Student Venture Screening & Ideation Bootcamps",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-slate-50 min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* =========================================================================
            SECTION 1: HERO & INSTITUTIONAL PROFILE WITH CAMPUS SHOWCASE
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-900 text-xs font-bold border border-blue-200">
              <Shield className="w-3.5 h-3.5 text-blue-700" />
              <span>Section 8 Not-For-Profit Company · Companies Act, 2013</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-display leading-[1.1]">
              About MAST<span className="text-[#772b38]">e</span>R Incubation Foundation
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              MASTeR Incubation Foundation (MIF) is the premier technology business incubator and official{" "}
              <strong className="text-slate-900 font-semibold">StartupTN Recognized Pre-Incubation Centre</strong> established
              at <strong className="text-slate-900 font-semibold">M.A.M. College of Engineering and Technology (MAMCET)</strong>,
              Siruganur, Tiruchirappalli.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              We empower student engineers, faculty researchers, and regional founders to convert breakthrough innovations into
              commercially viable deep-tech enterprises through hardware prototyping makerspaces, TANSEED seed grants, and verified
              digital credentials.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <span className="text-xl sm:text-2xl font-black text-[#0f2c59] block">StartupTN</span>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Recognised Centre</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <span className="text-xl sm:text-2xl font-black text-[#772b38] block">15+ Desks</span>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Resident Workstations</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs col-span-2 sm:col-span-1">
                <span className="text-xl sm:text-2xl font-black text-emerald-700 block">4,000</span>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Sq.Ft. Space</span>
              </div>
            </div>
          </div>

          {/* Right Campus Imagery Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-900 group">
              <img
                src="/images/incubation/incubation-centre.jpeg"
                alt="MASTeR Incubation Foundation Innovation Facility at MAMCET Campus, Siruganur, Trichy"
                className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Siruganur, Tiruchirappalli (NH 45)</span>
                </div>
                <h3 className="text-lg font-bold">MAMCET Institutional Campus</h3>
                <p className="text-xs text-slate-300">
                  Home of MASTeR Incubation Foundation, hosting IoT labs, hardware workbenches, and resident ventures.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 2: OFFICIAL INAUGURATION BY HON'BLE MINISTER THIRU S. REGUPATHY
           ========================================================================= */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0f2c59] via-[#091b34] to-slate-900 text-white shadow-xl overflow-hidden border border-blue-900/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold uppercase tracking-wider border border-red-500/30">
                <Award className="w-4 h-4 text-red-400" />
                <span>Historic Milestone · Grand Inauguration Ceremony</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white leading-tight">
                Inaugurated by Hon&apos;ble Minister Thiru S. Regupathy
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                The MASTeR Incubation Foundation was formally dedicated to the nation by{" "}
                <strong className="text-red-300 font-bold">Thiru S. Regupathy</strong>, Hon&apos;ble Minister for Law, Courts,
                Prisons and Prevention of Corruption, Government of Tamil Nadu.
              </p>
              <blockquote className="p-4 rounded-2xl bg-white/5 border-l-4 border-red-500 text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                &ldquo;This centre serves as a sacred cradle of innovation, engineered to transform ambitious engineering students
                from passive job seekers into impactful job creators who power Tamil Nadu&apos;s trillion-dollar economy.&rdquo;
              </blockquote>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs">
                <div>
                  <span className="text-cyan-300 font-black block text-xl sm:text-2xl">25+</span>
                  <span className="text-slate-300 font-medium">Startups Onboarded</span>
                </div>
                <div>
                  <span className="text-cyan-300 font-black block text-xl sm:text-2xl">8 MoUs</span>
                  <span className="text-slate-300 font-medium">Industry Partnerships</span>
                </div>
                <div>
                  <span className="text-cyan-300 font-black block text-xl sm:text-2xl">IITMIC</span>
                  <span className="text-slate-300 font-medium">Incubation Partner</span>
                </div>
                <div>
                  <span className="text-cyan-300 font-black block text-xl sm:text-2xl">MSME</span>
                  <span className="text-slate-300 font-medium">Recognised HI</span>
                </div>
              </div>
            </div>

            {/* Split Inaugural Photo Frames */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-lg group">
                <img
                  src="/images/incubation/ragupathy.jpeg"
                  alt="Hon'ble Minister Thiru S. Regupathy dedicating MASTeR Incubation Foundation at MAMCET Main Auditorium"
                  className="w-full h-48 sm:h-52 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[11px] font-semibold text-white">Ministerial Keynote Address</span>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-lg group">
                <img
                  src="/images/incubation/img-43.jpeg"
                  alt="Execution of formal Industry and Ecosystem MoUs at MIF"
                  className="w-full h-48 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[11px] font-semibold text-white">Signing of 8 Bilateral Industry MoUs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 3: STRATEGIC VISION & INSTITUTIONAL MANDATE
           ========================================================================= */}
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#772b38]/10 text-[#772b38] border border-[#772b38]/20 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>FOUNDATIONAL PURPOSE & HORIZONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-display tracking-tight">
              Vision, Mandate & Strategic Roadmap
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Guiding transformative engineering research, pre-incubation cohorts, and venture acceleration across Central Tamil Nadu.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Our Vision Card - 6 Columns */}
            <div className="lg:col-span-6 rounded-3xl bg-gradient-to-br from-white via-white to-rose-50/40 border border-slate-200/90 p-8 sm:p-10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#772b38]/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110 duration-500" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#772b38]/10 border border-[#772b38]/25 flex items-center justify-center text-[#772b38] shadow-xs">
                    <Compass className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#772b38] px-3 py-1 rounded-full bg-[#772b38]/10 border border-[#772b38]/20">
                    Flagship Vision
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                    Our Vision
                  </h3>
                  <div className="relative pl-6 border-l-4 border-[#772b38] py-1">
                    <Quote className="w-8 h-8 text-[#772b38]/20 absolute -top-3 -left-2 -z-10" />
                    <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-serif italic font-medium">
                      &ldquo;{FOUNDATION_INFO.vision}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/70">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>NISP Aligned Policy</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/70">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Higher Education Innovation</span>
                </div>
              </div>
            </div>

            {/* Institutional Mandate Card - 6 Columns */}
            <div className="lg:col-span-6 rounded-3xl bg-gradient-to-br from-[#0a182e] via-[#0f2c59] to-[#06101e] text-white p-8 sm:p-10 shadow-xl shadow-blue-950/20 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-rose-500/10 via-transparent to-transparent pointer-events-none" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-rose-300 shadow-xs backdrop-blur-xs">
                    <Target className="w-7 h-7 text-[#ff8097]" />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-rose-200 px-3 py-1 rounded-full bg-white/10 border border-white/15">
                    Section 8 Non-Profit
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                    Institutional Mandate
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                    MIF functions as a single-window technology launchpad connecting student innovators, faculty researchers, and regional founders with prototyping makerspaces, intellectual property advisory, corporate mentors, and venture capital syndicates.
                  </p>
                </div>

                {/* 4 Pillars of the Mandate */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-[#ff8097] text-xs font-bold uppercase tracking-wider mb-0.5">4,000 Sq. Ft.</div>
                    <div className="text-[11px] text-slate-300 font-medium">Prototyping & Testing Bays</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-0.5">StartupTN & MSME</div>
                    <div className="text-[11px] text-slate-300 font-medium">Pre-Incubation & HI Approved</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-0.5">Up to ₹15 Lakhs</div>
                    <div className="text-[11px] text-slate-300 font-medium">MSME & TANSEED Grant Support</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-0.5">1-on-1 Mentorship</div>
                    <div className="text-[11px] text-slate-300 font-medium">IITMIC & Industry Leaders</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5 text-rose-200 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ff8097]" />
                  <span>Ministry of MSME & StartupTN Endorsed</span>
                </span>
                <Link href="/facilities" className="hover:text-white transition-colors underline font-medium flex items-center gap-1">
                  <span>View Facilities</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 4: 5 STRATEGIC MISSION OBJECTIVES (M1 TO M5) ANIMATED ROADMAP
           ========================================================================= */}
        <MissionRoadmap />

        {/* =========================================================================
            SECTION 6: INAUGURAL MOMENTS INTERACTIVE GALLERY
           ========================================================================= */}
        <InauguralMomentsGallery />

        {/* =========================================================================
            SECTION 7: EXECUTIVE LEADERSHIP TEAM WITH AUTHENTIC PHOTOGRAPHS
           ========================================================================= */}
        <div id="governance" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest block mb-1">
                INSTITUTIONAL GOVERNANCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
                Executive Leadership & Operations Council
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl font-normal">
                Led by academic visionaries, research directors, and startup mentors committed to regional deep-tech empowerment.
              </p>
            </div>
            <Link href="/leadership">
              <Button className="bg-[#0f2c59] hover:bg-blue-900 text-white font-bold text-xs gap-1.5 self-start md:self-auto">
                <span>Full Leadership Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {LEADERSHIP_TEAM.map((leader, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-56 bg-slate-100 overflow-hidden">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-blue-950/80 backdrop-blur-xs text-[10px] font-bold text-cyan-300 border border-cyan-400/30">
                      {leader.badge}
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                      {leader.name}
                    </h3>
                    <div className="text-[11px] font-semibold text-red-600 line-clamp-1">{leader.role}</div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-normal pt-1">
                      {leader.specialty}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-slate-100 mt-2 space-y-1 text-[10px] text-slate-500">
                  {leader.phone && (
                    <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <Phone className="w-3 h-3 text-cyan-600" />
                      <span>{leader.phone}</span>
                    </div>
                  )}
                  {leader.email && (
                    <div className="flex items-center gap-1.5 text-slate-500 truncate">
                      <Mail className="w-3 h-3 text-cyan-600 shrink-0" />
                      <span className="truncate">{leader.email}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            SECTION 8: CAMPUS PHOTO GALLERY
           ========================================================================= */}
        <CampusPhotoGallery />

        {/* =========================================================================
            SECTION 9: ECOSYSTEM ALLIANCES & SOCIAL CONNECT
           ========================================================================= */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl text-center md:text-left">
            <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
              ENGAGE WITH THE ECOSYSTEM
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Connect With Our Active Channels
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Follow our official feeds on Instagram, LinkedIn, and Google Maps for upcoming hackathons, TANSEED grant announcements, and resident startup news.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.instagram.com/master_incubation_foundation/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-xs gap-1.5 h-10 px-5 shadow-xs">
                <span>Instagram Feed</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </a>

            <a
              href="https://in.linkedin.com/in/master-incubation-foundation-02301b446"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="border-slate-300 text-xs font-bold gap-1.5 h-10 px-5">
                <span>LinkedIn Updates</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </a>

            <a
              href="https://share.google/V18XLHgF6Rh85vNA0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="border-slate-300 text-xs font-bold gap-1.5 h-10 px-5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Google Campus Pin</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
