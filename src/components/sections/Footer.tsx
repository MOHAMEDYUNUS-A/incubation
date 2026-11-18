"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FOUNDATION_INFO } from "@/lib/db/mockData";
import { Rocket, Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
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
    <footer id="contact" className="bg-[#030611] text-slate-400 border-t border-slate-800/80 pt-20 pb-12">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800/80">
          {/* Col 1: Brand & Institutional Identity */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 flex items-center justify-center border border-blue-400/30">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-wider text-white">
                  MAST<span className="text-blue-400">e</span>R
                </span>
                <span className="text-[10px] text-slate-400">
                  Incubation Foundation (MIF)
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              {FOUNDATION_INFO.legalType}. Associated with {FOUNDATION_INFO.institution}, recognized as a {FOUNDATION_INFO.recognition}.
            </p>

            <div className="pt-2 text-xs text-cyan-300 font-medium">
              &ldquo;{FOUNDATION_INFO.tagline}&rdquo;
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Explore Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/focus-areas" className="hover:text-white transition-colors">7 Focus Tracks</Link></li>
              <li><Link href="/programs" className="hover:text-white transition-colors">Incubation Programs</Link></li>
              <li><Link href="/startups" className="hover:text-white transition-colors">Startup Directory</Link></li>
              <li><Link href="/facilities" className="hover:text-white transition-colors">Campus Labs</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Events & Bootcamps</Link></li>
            </ul>
          </div>

          {/* Col 3: Verified Contacts from Official Brochure */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Leadership & Enquiries
            </h4>
            <div className="space-y-3 text-xs">
              {/* Manager */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="font-bold text-white">{FOUNDATION_INFO.manager.name}</div>
                <div className="text-[11px] text-cyan-400">{FOUNDATION_INFO.manager.role}</div>
                <div className="text-[11px] text-slate-400 mt-1">{FOUNDATION_INFO.manager.phone}</div>
                <div className="text-[11px] text-slate-400 truncate">{FOUNDATION_INFO.manager.email}</div>
              </div>

              {/* Coordinator */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="font-bold text-white">{FOUNDATION_INFO.coordinator.name}</div>
                <div className="text-[11px] text-cyan-400">{FOUNDATION_INFO.coordinator.role}</div>
                <div className="text-[11px] text-slate-400 mt-1">{FOUNDATION_INFO.coordinator.phone}</div>
                <div className="text-[11px] text-slate-400 truncate">{FOUNDATION_INFO.coordinator.email}</div>
              </div>
            </div>
          </div>

          {/* Col 4: Campus Address & Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Campus Location
            </h4>
            <div className="flex items-start gap-2 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>{FOUNDATION_INFO.address}</span>
            </div>

            <div className="pt-2">
              <h5 className="text-[11px] font-bold text-white uppercase tracking-wider mb-2">
                Innovation Updates
              </h5>
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <Input
                    type="email"
                    required
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    placeholder="Enter email for grant alerts"
                    className="h-9 text-xs"
                  />
                  <Button type="submit" size="sm" className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs h-9">
                    Subscribe to Bulletins
                  </Button>
                </form>
              ) : (
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed successfully!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            © {new Date().getFullYear()} {FOUNDATION_INFO.name} ({FOUNDATION_INFO.acronym}). All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="hover:text-white transition-colors">
              Admin Portal
            </Link>
            <a
              href={FOUNDATION_INFO.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              MAMCET Official Website
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
