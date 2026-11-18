"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Streamlined, professional navigation items (reduced from 9 to 5 high-impact links)
const STREAMLINED_NAV_LINKS = [
  { name: "About", href: "/#about" },
  { name: "Focus Areas", href: "/#focus-areas" },
  { name: "Programs", href: "/#programs" },
  { name: "Startups & Labs", href: "/#facilities" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2.5" : "py-4 sm:py-5"
        }`}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <nav
            className={`transition-all duration-300 rounded-2xl flex items-center justify-between px-4 sm:px-6 py-2.5 ${
              scrolled
                ? "bg-white/95 backdrop-blur-md shadow-md border border-slate-200/90"
                : "bg-white/85 backdrop-blur-sm border border-slate-200/70 shadow-xs"
            }`}
          >
            {/* Prominent Official Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center border border-slate-200 shadow-sm group-hover:scale-105 transition-transform duration-200">
                <img
                  src="/logos/master-incubation-logo.png"
                  alt="MASTeR Incubation Foundation"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-wider text-slate-900 font-display">
                    MAST<span className="text-blue-600">e</span>R
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    MIF
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium tracking-tight hidden sm:inline">
                  MAMCET · StartupTN Centre
                </span>
              </div>
            </Link>

            {/* Clean, Focused Professional Navigation (No Clutter) */}
            <div className="hidden md:flex items-center gap-1 sm:gap-2">
              {STREAMLINED_NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="text-xs text-slate-600 hover:text-slate-900 h-9">
                  Admin
                </Button>
              </Link>
              <Link href="/apply">
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm rounded-xl text-xs gap-1.5 h-9 group"
                >
                  <span>Apply for Incubation</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 md:hidden">
              <Link href="/apply">
                <Button size="sm" className="h-8 px-3 text-xs bg-blue-600 text-white">
                  Apply
                </Button>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Streamlined Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-2 my-auto">
              {STREAMLINED_NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 px-4 rounded-xl text-lg font-bold text-slate-800 hover:text-blue-600 hover:bg-slate-50 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-200 flex flex-col gap-3 mt-6">
              <Link href="/apply" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-sm">
                  Apply for Incubation
                </Button>
              </Link>
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full h-10 text-slate-700 text-xs border-slate-300">
                  Admin Operations Portal
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
