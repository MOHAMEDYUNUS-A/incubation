"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  {
    name: "About Us",
    href: "/about",
    submenu: [
      { name: "About Foundation", href: "/about" },
      { name: "Leadership & Committee", href: "/leadership" },
      { name: "Governance & Trust", href: "/about#governance" },
      { name: "Mission M1-M5", href: "/about#governance" },
    ],
  },
  { name: "Focus Area", href: "/focus-areas" },
  {
    name: "Programs",
    href: "/programs",
    submenu: [
      { name: "4-Stage Pathway", href: "/programs" },
      { name: "Incubation Services", href: "/programs#services" },
      { name: "MSME & TANSEED Grants", href: "/programs#services" },
    ],
  },
  { name: "Join Us", href: "/join-us" },
  {
    name: "Facilities",
    href: "/facilities",
    submenu: [
      { name: "All Labs & Workbenches", href: "/facilities" },
      { name: "Campus Photo Gallery", href: "/#gallery" },
    ],
  },
  { name: "Startups", href: "/startups" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Institutional Top Bar (as in reference site EDII-ABIRF) */}
        <div
          className={`bg-slate-900 text-slate-300 text-[11px] transition-all duration-300 border-b border-slate-800 ${
            scrolled ? "hidden md:block py-1 opacity-90" : "py-1.5 opacity-100"
          }`}
        >
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-cyan-400" />
                <span className="hidden sm:inline">MAMCET Campus, Siruganur, Trichy</span>
                <span className="sm:hidden">Trichy</span>
              </span>
              <a
                href="tel:+919361697702"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone className="w-3 h-3 text-cyan-400" />
                <span>+91 9361697702</span>
              </a>
              <a
                href="mailto:incubationmanager@mamcet.com"
                className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-3 h-3 text-cyan-400" />
                <span>incubationmanager@mamcet.com</span>
              </a>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold text-cyan-300 hidden md:inline">
                StartupTN Recognised Pre-Incubation Centre
              </span>
              <span className="h-3 w-px bg-slate-700 hidden md:inline" />
              <Link
                href="/admin"
                className="hover:text-white font-medium transition-colors text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar (Clean White Institutional Style with Symmetrical Alignment) */}
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-slate-200"
              : "bg-white py-3 border-b border-slate-200/80 shadow-2xs"
          }`}
        >
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
            {/* Logo on Left */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/logos/official-mif-logo.png"
                  alt="MASTeR Incubation Foundation Logo"
                  className="w-full h-full object-contain drop-shadow-xs"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center">
                  <span className="font-black text-xl sm:text-2xl md:text-[26px] tracking-tight text-[#0f2c59] font-display leading-none">
                    MAST<span className="text-[#ea580c]">e</span>R
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs font-extrabold text-slate-800 tracking-tight leading-none mt-1">
                  Incubation Foundation
                </span>
                <span className="text-[10px] text-slate-500 font-semibold tracking-normal hidden xl:inline mt-0.5">
                  MAMCET · StartupTN Pre-Incubation Centre
                </span>
              </div>
            </Link>

            {/* Symmetrically Centered Navigation Links */}
            <nav className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1.5 flex-1 mx-2">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.submenu && setActiveDropdown(link.name)}
                  onMouseLeave={() => link.submenu && setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`px-3 py-2 text-sm font-bold transition-all flex items-center gap-1 rounded-xl whitespace-nowrap ${
                      pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                        ? "text-[#ea580c] font-black bg-orange-50/60"
                        : "text-slate-700 hover:text-[#ea580c] hover:bg-slate-50"
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.submenu && (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
                    )}
                  </Link>

                  {/* Submenu Dropdown */}
                  {link.submenu && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-56 rounded-2xl bg-white border border-slate-200/90 shadow-xl py-2 z-50 overflow-hidden"
                    >
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-4 py-2.5 text-xs text-slate-700 hover:bg-orange-50 hover:text-[#ea580c] font-semibold transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Action: Prominent Orange CTA Button */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Link href="/apply">
                <Button
                  size="sm"
                  className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold shadow-md shadow-orange-500/25 rounded-xl text-xs gap-1.5 h-10 px-4 sm:px-5 group transition-all"
                >
                  <span className="hidden sm:inline">Apply For Pre Incubation</span>
                  <span className="sm:hidden">Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-0 top-[100px] z-40 bg-white border-b border-slate-200 shadow-2xl lg:hidden overflow-hidden"
          >
            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <div key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2.5 text-sm font-bold text-slate-800 hover:text-orange-600"
                    >
                      {link.name}
                    </Link>
                    {link.submenu && (
                      <div className="pl-4 space-y-1 pb-1">
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-1.5 text-xs text-slate-500 hover:text-orange-600"
                          >
                            ↳ {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-2">
                <Link href="/apply" onClick={() => setMobileMenuOpen(false)} className="block">
                  <Button className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold h-11 text-xs gap-2">
                    <span>Apply For Pre Incubation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="block">
                  <Button variant="outline" className="w-full text-xs h-10 border-slate-300">
                    Admin Portal
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
