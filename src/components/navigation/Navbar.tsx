"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/context/ContentContext";

export default function Navbar() {
  const pathname = usePathname();
  const { content } = useSiteContent();

  const flags = content?.featureFlags || {
    enableEcosystem: false,
    enableDigitalPassport: false,
    enableFounderDashboard: false,
    enablePassportVerification: false,
  };

  const navLinks = React.useMemo(() => {
    const startupsSubmenu: { name: string; href: string }[] = [
      { name: "Startup Directory", href: "/startups" },
      { name: "Our Mentors", href: "/mentors" },
    ];
    if (flags.enableDigitalPassport) {
      startupsSubmenu.push({ name: "Digital Startup Passport", href: "/startup-passport/MASTER-SP-2026-0001" });
    }
    if (flags.enablePassportVerification) {
      startupsSubmenu.push({ name: "Passport Verification", href: "/startup-passport/verify/MASTER-SP-2026-0001" });
    }
    if (flags.enableFounderDashboard) {
      startupsSubmenu.push({ name: "Founder Dashboard", href: "/dashboard/startup-passport" });
    }

    const links = [
      { name: "Home", href: "/" },
      {
        name: "About Us",
        href: "/about",
        submenu: [
          { name: "About Foundation", href: "/about" },
          { name: "Leadership & Committee", href: "/leadership" },
          { name: "Governance & Trust", href: "/about#governance" },
          { name: "Mission M1-M5", href: "/about#mission-roadmap" },
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
      {
        name: "Startups",
        href: "/startups",
        submenu: startupsSubmenu,
      },
    ];

    if (flags.enableEcosystem) {
      links.push({
        name: "Ecosystem",
        href: "/success-stories",
        submenu: [
          { name: "Success Stories", href: "/success-stories" },
          { name: "Alumni Guild", href: "/alumni" },
          { name: "Track Application", href: "/apply/status" },
        ],
      });
    }

    links.push({
      name: "Facilities",
      href: "/facilities",
      submenu: [
        { name: "All Labs & Workbenches", href: "/facilities" },
        { name: "Campus Photo Gallery", href: "/#gallery" },
      ],
    });

    links.push({ name: "Contact", href: "/contact" });

    return links;
  }, [flags]);

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  const toggleMobileDropdown = (name: string) => {
    setOpenMobileDropdown((prev) => (prev === name ? null : name));
  };

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
    setOpenMobileDropdown(null);
  }, [pathname]);

  // Admin portal has its own dedicated administrative layout and sidebar
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Institutional Top Bar (as in reference site EDII-ABIRF) */}
        <div
          className={`bg-slate-950 text-slate-300 text-[11px] transition-all duration-300 border-b border-slate-800/80 ${
            scrolled ? "hidden md:block py-1 opacity-90" : "py-1.5 opacity-100"
          }`}
        >
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-6 font-normal">
              <span className="flex items-center gap-1.5 text-slate-400">
                <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="hidden sm:inline">MAMCET Campus, Siruganur, Trichy</span>
                <span className="sm:hidden">Trichy</span>
              </span>
              <a
                href="tel:+919361697702"
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-3 h-3 text-cyan-400 shrink-0" />
                <span>+91 9361697702</span>
              </a>
              <a
                href="mailto:incubationmanager@mamcet.com"
                className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-3 h-3 text-cyan-400 shrink-0" />
                <span>incubationmanager@mamcet.com</span>
              </a>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold text-cyan-300 hidden md:inline tracking-wide">
                Recognised Technology Business Incubator · MAMCET Campus
              </span>
              <span className="h-3 w-px bg-slate-800 hidden md:inline" />
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 hover:text-white font-medium transition-all text-[10px] px-2.5 py-0.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar (Clean White Institutional Style with Symmetrical Alignment) */}
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-md shadow-sm py-2 border-b border-slate-200/80"
              : "bg-white py-2.5 sm:py-3 border-b border-slate-200/70 shadow-2xs"
          }`}
        >
          <div className="container max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-2 xl:gap-6">
            {/* Logo on Left */}
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/logos/official-mif-logo.png"
                  alt="MASTeR Incubation Foundation Logo"
                  className="w-full h-full object-contain drop-shadow-xs"
                />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <div className="flex items-center">
                  <span className="font-black text-lg sm:text-xl md:text-[21px] tracking-tight text-[#0f2c59] font-display leading-none whitespace-nowrap">
                    MAST<span className="text-[#772b38]">e</span>R
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 tracking-tight leading-none mt-1 whitespace-nowrap">
                  Incubation Foundation
                </span>
                <span className="text-[9.5px] text-slate-500 font-medium tracking-normal hidden xl:inline mt-0.5 whitespace-nowrap">
                  Technology Business Incubator · MAMCET Campus
                </span>
              </div>
            </Link>

            {/* Symmetrically Centered Navigation Links */}
            <nav className="hidden lg:flex items-center justify-center gap-0 xl:gap-1 flex-1 min-w-0">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

                return (
                  <div
                    key={link.name}
                    className="relative group shrink-0"
                    onMouseEnter={() => link.submenu && setActiveDropdown(link.name)}
                    onMouseLeave={() => link.submenu && setActiveDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className={`px-1.5 xl:px-3 py-1.5 text-[12px] xl:text-[13.5px] tracking-tight transition-all flex items-center gap-1 rounded-lg whitespace-nowrap ${
                        isActive
                          ? "text-[#772b38] font-semibold bg-[#772b38]/10 shadow-2xs shadow-[#772b38]/10"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 font-medium"
                      }`}
                    >
                      <span>{link.name}</span>
                      {link.submenu && (
                        <ChevronDown
                          className={`w-3 h-3 text-slate-400 transition-transform duration-200 group-hover:rotate-180 ${
                            isActive ? "text-[#772b38]" : "group-hover:text-slate-600"
                          }`}
                        />
                      )}
                    </Link>

                    {/* Submenu Dropdown */}
                    {link.submenu && (
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 transition-all duration-150 ${
                          activeDropdown === link.name
                            ? "opacity-100 translate-y-0 pointer-events-auto visible"
                            : "opacity-0 translate-y-1 pointer-events-none invisible"
                        }`}
                      >
                        <div className="w-56 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl shadow-slate-900/10 p-1.5 overflow-hidden">
                          {link.submenu.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-[#772b38]/10 hover:text-[#772b38] transition-colors group/sub"
                            >
                              <span>{sub.name}</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover/sub:bg-[#772b38] transition-colors shrink-0" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right Action: Prominent Secondary #772b38 CTA Button */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Link href="/apply" className="shrink-0">
                <Button
                  size="sm"
                  className="bg-[#772b38] hover:bg-[#5e212b] text-white font-semibold shadow-sm shadow-[#772b38]/25 rounded-xl text-xs gap-1.5 h-9 px-3 xl:px-4.5 group transition-all shrink-0 whitespace-nowrap border border-[#772b38]"
                >
                  <span className="hidden xl:inline">Apply for Incubation</span>
                  <span className="xl:hidden">Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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

      {/* Mobile Drawer Menu & Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[75px] z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 top-[75px] z-50 bg-white border-b border-slate-200 shadow-2xl lg:hidden overflow-hidden max-h-[calc(100vh-85px)] flex flex-col"
            >
              <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
              <div className="space-y-1 divide-y divide-slate-100">
                {navLinks.map((link) => {
                  const hasSubmenu = Boolean(link.submenu && link.submenu.length > 0);
                  const isOpen = openMobileDropdown === link.name;

                  return (
                    <div key={link.name} className="py-1 first:pt-0">
                      {hasSubmenu ? (
                        <>
                          <button
                            type="button"
                            onClick={() => toggleMobileDropdown(link.name)}
                            className="flex items-center justify-between w-full py-2.5 text-sm font-bold text-slate-800 hover:text-[#772b38] transition-colors text-left"
                            aria-expanded={isOpen}
                          >
                            <span>{link.name}</span>
                            <ChevronDown
                              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                                isOpen ? "rotate-180 text-[#772b38]" : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                key={`mobile-sub-${link.name}`}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden ml-2 pl-3 border-l-2 border-[#772b38] space-y-1 py-1.5 my-1"
                              >
                                {link.submenu!.map((sub) => (
                                  <Link
                                    key={sub.name}
                                    href={sub.href}
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      setOpenMobileDropdown(null);
                                    }}
                                    className="flex items-center gap-2.5 py-2 px-3 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#772b38] hover:bg-[#772b38]/10 transition-colors"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#772b38] shrink-0" />
                                    <span>{sub.name}</span>
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setOpenMobileDropdown(null);
                          }}
                          className="block py-2.5 text-sm font-bold text-slate-800 hover:text-[#772b38] transition-colors"
                        >
                          {link.name}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-2">
                <Link href="/apply" onClick={() => setMobileMenuOpen(false)} className="block">
                  <Button className="w-full bg-[#772b38] hover:bg-[#5e212b] text-white font-bold h-11 text-xs gap-2">
                    <span>Apply for Incubation</span>
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
        </>
      )}
    </AnimatePresence>
    </>
  );
}
