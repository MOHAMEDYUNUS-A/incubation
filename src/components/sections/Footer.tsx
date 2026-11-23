"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FOUNDATION_INFO } from "@/lib/db/mockData";
import { MapPin, CheckCircle2, Mail, Phone, ExternalLink, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  const pathname = usePathname();

  const [newsEmail, setNewsEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsEmail) {
      setSubscribed(true);
    }
  };

  // Admin portal has its own dedicated administrative layout and sidebar
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer id="contact" className="bg-[#071426] text-slate-300 border-t border-slate-800 pt-16 sm:pt-20 pb-12">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-800">
          {/* Col 1: Brand & Institutional Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-14 h-14 rounded-2xl bg-white p-2 flex items-center justify-center border border-white/20 shadow-md group-hover:scale-105 transition-transform">
                <img
                  src="/logos/official-mif-logo.png"
                  alt="MASTeR Incubation Foundation Crest"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl sm:text-2xl tracking-tight text-white font-display">
                  MAST<span className="text-[#dc2626]">e</span>R
                </span>
                <span className="text-xs text-slate-200 font-bold">
                  Incubation Foundation (MIF)
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  MAMCET · StartupTN Pre-Incubation Centre
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-300 leading-relaxed pr-2">
              An institutional technology incubator incorporated as a <strong className="text-white">Section 8 Not-For-Profit Company</strong> at <strong className="text-white">M.A.M. College of Engineering & Technology (MAMCET)</strong>, Siruganur, Trichy. Approved as an official <strong className="text-red-400">StartupTN Pre-Incubation Centre</strong> and <strong className="text-cyan-400">MSME Host Institution</strong>.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-red-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
              <span>Launchpad for your Entrepreneurial Success</span>
            </div>

            {/* Direct Social Links & QR Codes */}
            <div className="pt-2">
              <div className="text-[11px] font-bold text-white uppercase tracking-wider mb-2.5">
                Official Social Communities:
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/master_incubation_foundation/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center hover:bg-white/10 hover:border-pink-500/50 transition-all group"
                  title="Follow MIF on Instagram"
                >
                  <img
                    src="/images/qr-instagram.png"
                    alt="Instagram QR"
                    className="w-14 h-14 object-contain rounded-lg group-hover:scale-105 transition-transform"
                  />
                  <span className="text-[10px] font-bold text-slate-300 group-hover:text-pink-400 mt-1 flex items-center gap-1">
                    Instagram <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </a>

                <a
                  href="https://in.linkedin.com/in/master-incubation-foundation-02301b446"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center hover:bg-white/10 hover:border-blue-500/50 transition-all group"
                  title="Connect with MIF on LinkedIn"
                >
                  <img
                    src="/images/qr-linkedin.png"
                    alt="LinkedIn QR"
                    className="w-14 h-14 object-contain rounded-lg group-hover:scale-105 transition-transform"
                  />
                  <span className="text-[10px] font-bold text-slate-300 group-hover:text-blue-400 mt-1 flex items-center gap-1">
                    LinkedIn <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Portals & Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-red-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-red-400 transition-colors">
                  About Foundation
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-red-400 transition-colors">
                  Ecosystem Impact
                </Link>
              </li>
              <li>
                <Link href="/focus-areas" className="hover:text-red-400 transition-colors">
                  7 Focus Areas
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-red-400 transition-colors">
                  4-Stage Pathway
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-red-400 transition-colors">
                  4,000 Sq. Ft. Facility
                </Link>
              </li>
              <li>
                <Link href="/startups" className="hover:text-red-400 transition-colors">
                  Startup Directory
                </Link>
              </li>
              <li>
                <Link href="/startup-passport/MASTER-SP-2026-0001" className="hover:text-red-400 transition-colors">
                  Startup Passport
                </Link>
              </li>
              <li>
                <Link href="/startup-passport/verify/MASTER-SP-2026-0001" className="hover:text-red-400 transition-colors">
                  Verify Credentials
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="hover:text-red-400 transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/alumni" className="hover:text-red-400 transition-colors">
                  Alumni Guild
                </Link>
              </li>
              <li>
                <Link href="/apply/status" className="hover:text-red-400 transition-colors">
                  Track Application
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-red-400 transition-colors">
                  Events & Bootcamps
                </Link>
              </li>
              <li>
                <Link href="/join-us" className="hover:text-red-400 transition-colors">
                  Join Us (Stakeholders)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Leadership & Direct Verified Contacts (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Incubation Leadership
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-400/50 transition-colors">
                <div className="font-bold text-white text-sm">{FOUNDATION_INFO.manager.name}</div>
                <div className="text-[11px] text-red-400 font-semibold">{FOUNDATION_INFO.manager.role}</div>
                <a
                  href={`tel:${FOUNDATION_INFO.manager.phone}`}
                  className="text-[11px] text-slate-300 hover:text-white mt-1.5 flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3 h-3 text-emerald-400" />
                  <span>{FOUNDATION_INFO.manager.phone}</span>
                </a>
                <a
                  href={`mailto:${FOUNDATION_INFO.manager.email}`}
                  className="text-[11px] text-slate-300 hover:text-white truncate flex items-center gap-1.5 mt-0.5 transition-colors"
                >
                  <Mail className="w-3 h-3 text-blue-400" />
                  <span>{FOUNDATION_INFO.manager.email}</span>
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/50 transition-colors">
                <div className="font-bold text-white text-sm">{FOUNDATION_INFO.coordinator.name}</div>
                <div className="text-[11px] text-emerald-400 font-semibold">{FOUNDATION_INFO.coordinator.role}</div>
                <a
                  href={`tel:${FOUNDATION_INFO.coordinator.phone}`}
                  className="text-[11px] text-slate-300 hover:text-white mt-1.5 flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3 h-3 text-emerald-400" />
                  <span>{FOUNDATION_INFO.coordinator.phone}</span>
                </a>
                <a
                  href={`mailto:${FOUNDATION_INFO.coordinator.email}`}
                  className="text-[11px] text-slate-300 hover:text-white truncate flex items-center gap-1.5 mt-0.5 transition-colors"
                >
                  <Mail className="w-3 h-3 text-blue-400" />
                  <span>{FOUNDATION_INFO.coordinator.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Campus Location & Grant Alerts (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Campus Location
            </h4>
            <a
              href="https://share.google/V18XLHgF6Rh85vNA0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 text-xs text-slate-300 hover:text-white transition-colors group p-3 rounded-2xl bg-white/5 border border-white/10"
              title="Open Location on Google Maps"
            >
              <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div>
                <span>{FOUNDATION_INFO.address}</span>
                <span className="text-red-400 font-bold block mt-1 flex items-center gap-1">
                  View on Google Maps <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>

            <div className="pt-2">
              <h5 className="text-[11px] font-bold text-white uppercase tracking-wider mb-2">
                Seed Grants & Cohort Alerts
              </h5>
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <Input
                    type="email"
                    required
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    placeholder="Enter email for grant alerts"
                    className="h-10 text-xs bg-white/10 border-white/20 text-white placeholder:text-slate-400 rounded-xl"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs h-10 font-bold rounded-xl shadow-md gap-1.5"
                  >
                    <span>Subscribe for TANSEED Alerts</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </form>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Subscribed! You will receive new grant and bootcamp notifications.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Institutional Accreditation Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            © {new Date().getFullYear()} {FOUNDATION_INFO.name} ({FOUNDATION_INFO.acronym}). Incorporated under the Companies Act, 2013.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="hover:text-red-400 transition-colors font-medium">
              Admin Portal
            </Link>
            <span className="text-white/20">|</span>
            <a
              href={FOUNDATION_INFO.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-400 transition-colors font-medium"
            >
              MAMCET Official Campus Portal ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
