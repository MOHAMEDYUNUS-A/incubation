"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FOUNDATION_INFO } from "@/lib/db/mockData";
import { MapPin, CheckCircle2, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  const [newsEmail, setNewsEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsEmail) {
      setSubscribed(true);
    }
  };

  return (
    <footer id="contact" className="bg-slate-50 text-slate-600 border-t border-slate-200 pt-20 pb-12">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-slate-200">
          {/* Col 1: Brand & Institutional Identity */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center border border-slate-200 shadow-xs">
                <img
                  src="/logos/master-incubation-logo.png"
                  alt="MASTeR Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-wider text-slate-900 font-display">
                  MAST<span className="text-blue-600">e</span>R
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  Incubation Foundation (MIF)
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-600 leading-relaxed pr-4">
              {FOUNDATION_INFO.legalType}. Associated with {FOUNDATION_INFO.institution}, recognized as a {FOUNDATION_INFO.recognition}.
            </p>

            <div className="text-xs text-blue-700 font-semibold italic">
              &ldquo;{FOUNDATION_INFO.tagline}&rdquo;
            </div>

            {/* QR Codes from Official Brochure */}
            <div className="pt-2">
              <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-2">
                Connect with our Community:
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-white border border-slate-200 flex flex-col items-center shadow-2xs">
                  <img
                    src="/images/qr-instagram.png"
                    alt="Instagram QR"
                    className="w-14 h-14 object-contain"
                  />
                  <span className="text-[9px] font-bold text-slate-800 mt-1">Instagram</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200 flex flex-col items-center shadow-2xs">
                  <img
                    src="/images/qr-linkedin.png"
                    alt="LinkedIn QR"
                    className="w-14 h-14 object-contain"
                  />
                  <span className="text-[9px] font-bold text-slate-800 mt-1">LinkedIn</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Explore Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link href="/focus-areas" className="hover:text-blue-600 transition-colors">7 Focus Tracks</Link></li>
              <li><Link href="/programs" className="hover:text-blue-600 transition-colors">Incubation Programs</Link></li>
              <li><Link href="/startups" className="hover:text-blue-600 transition-colors">Startup Directory</Link></li>
              <li><Link href="/facilities" className="hover:text-blue-600 transition-colors">Campus Labs</Link></li>
              <li><Link href="/events" className="hover:text-blue-600 transition-colors">Events & Bootcamps</Link></li>
            </ul>
          </div>

          {/* Col 3: Verified Contacts from Official Brochure */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Leadership & Contacts
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="font-bold text-slate-900 text-sm">{FOUNDATION_INFO.manager.name}</div>
                <div className="text-[11px] text-blue-700 font-semibold">{FOUNDATION_INFO.manager.role}</div>
                <div className="text-[11px] text-slate-600 mt-1.5 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{FOUNDATION_INFO.manager.phone}</span>
                </div>
                <div className="text-[11px] text-slate-600 truncate flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3 h-3 text-slate-400" />
                  <span>{FOUNDATION_INFO.manager.email}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="font-bold text-slate-900 text-sm">{FOUNDATION_INFO.coordinator.name}</div>
                <div className="text-[11px] text-blue-700 font-semibold">{FOUNDATION_INFO.coordinator.role}</div>
                <div className="text-[11px] text-slate-600 mt-1.5 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{FOUNDATION_INFO.coordinator.phone}</span>
                </div>
                <div className="text-[11px] text-slate-600 truncate flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3 h-3 text-slate-400" />
                  <span>{FOUNDATION_INFO.coordinator.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Campus Address & Bulletins */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Campus Location
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-600">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>{FOUNDATION_INFO.address}</span>
            </div>

            <div className="pt-2">
              <h5 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-2">
                Innovation Updates & Seed Grants
              </h5>
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <Input
                    type="email"
                    required
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    placeholder="Enter email for grant alerts"
                    className="h-9 text-xs bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
                  />
                  <Button type="submit" size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs h-9 font-semibold shadow-xs">
                    Subscribe
                  </Button>
                </form>
              ) : (
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Subscribed successfully!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} {FOUNDATION_INFO.name} ({FOUNDATION_INFO.acronym}). A Section 8 Company.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="hover:text-blue-600 transition-colors">
              Admin Portal
            </Link>
            <a
              href={FOUNDATION_INFO.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              MAMCET Official Website
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
