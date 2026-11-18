"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Focus Areas", href: "/focus-areas" },
  { name: "Programs", href: "/programs" },
  { name: "Startups", href: "/startups" },
  { name: "Facilities", href: "/facilities" },
  { name: "Events", href: "/events" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <nav
            className={`transition-all duration-500 rounded-2xl flex items-center justify-between px-5 py-3 ${
              scrolled
                ? "glass-nav shadow-2xl shadow-black/40 border border-slate-700/60"
                : "bg-transparent border border-transparent"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300 border border-blue-400/30">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-wider text-white">
                    MAST<span className="text-blue-400">e</span>R
                  </span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                    MIF
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 tracking-tight hidden sm:inline">
                  MAMCET · StartupTN Centre
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-blue-600/20 rounded-lg border border-blue-500/30 -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="text-xs text-slate-400 hover:text-white">
                  Admin Portal
                </Button>
              </Link>
              <Link href="/apply">
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-600/25 rounded-xl text-xs gap-1.5 group"
                >
                  <span>Apply for Incubation</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link href="/apply">
                <Button size="sm" className="h-8 px-3 text-xs bg-blue-600 text-white">
                  Apply
                </Button>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-200 hover:text-white"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-2 my-auto">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                >
                  <Link
                    href={link.href}
                    className={`block py-3 px-4 rounded-xl text-lg font-semibold transition-all ${
                      pathname === link.href
                        ? "bg-blue-600/20 text-cyan-300 border border-blue-500/30"
                        : "text-slate-300 hover:text-white hover:bg-slate-900"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-800 flex flex-col gap-3 mt-6">
              <Link href="/apply" className="w-full">
                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base gap-2 rounded-xl">
                  <Sparkles className="w-4 h-4" />
                  <span>Apply for Incubation</span>
                </Button>
              </Link>
              <Link href="/admin" className="w-full">
                <Button variant="outline" className="w-full h-11 text-slate-300 text-sm">
                  Incubation Admin Portal
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
