"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Rocket,
  CheckCircle2,
  Clock,
  Search,
  ShieldCheck,
  RefreshCw,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Image as ImageIcon,
  Calendar,
  Globe,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Save,
  Check,
  X,
  Layers,
  ArrowRight,
  Eye,
  Sliders,
  AlertCircle,
  Video,
  RotateCcw,
  Menu,
  ChevronRight,
  Home,
  Building2,
  GraduationCap,
  LayoutDashboard,
  Filter,
  Server,
  Activity,
  FileText,
  UserCheck,
  Hash,
  Tag,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import MediaUploadZone from "@/components/ui/MediaUploadZone";
import { useSiteContent, SiteContent } from "@/context/ContentContext";
import EcosystemAdminTabs from "@/components/admin/EcosystemAdminTabs";

export default function AdminPage() {
  const { content, updateSection, refreshContent, loading: contentLoading } = useSiteContent();

  const [activeTab, setActiveTab] = useState<
    | "dashboard"
    | "startups"
    | "gallery"
    | "hero"
    | "events"
    | "contact"
    | "applications"
    | "passports"
    | "milestones"
    | "mentors"
    | "stories"
    | "alumni"
  >("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleResetToDefaults = async () => {
    if (confirm("Reset dynamic catalog to official baseline? This clears custom edits made in this browser.")) {
      try {
        localStorage.removeItem("mif_site_content_v3");
        localStorage.removeItem("mif_site_content_updated_at_v3");
        localStorage.removeItem("mif_site_content_v2");
        localStorage.removeItem("mif_site_content_updated_at_v2");
        window.location.reload();
      } catch (e) {}
    }
  };

  // Applications Pipeline State
  const [applications, setApplications] = useState<any[]>([]);
  const [appsLoading, setAppsLoading] = useState(false);
  const [appSearch, setAppSearch] = useState("");
  const [appStatusFilter, setAppStatusFilter] = useState("ALL");

  const fetchApps = async () => {
    setAppsLoading(true);
    try {
      const res = await fetch("/api/applications");
      const data = await res.json();
      if (data.success) {
        setApplications(data.data || []);
      }
    } catch {
      //
    } finally {
      setAppsLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const [selectedAppDossier, setSelectedAppDossier] = useState<any | null>(null);
  const [notifyFounderOnUpdate, setNotifyFounderOnUpdate] = useState(true);

  const handleUpdateAppStatus = async (
    appId: string,
    newStatus: string,
    notifyApplicant: boolean = false
  ) => {
    try {
      const res = await fetch("/api/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: appId, status: newStatus, notifyApplicant }),
      });
      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
        );
        showToast(
          notifyApplicant
            ? `Status updated to ${newStatus} & email sent to founder!`
            : `Application status updated to ${newStatus}`
        );
      }
    } catch {
      setApplications((prev) =>
        prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
      );
      showToast(`Application status updated to ${newStatus}`);
    }
  };

  const exportApplicationsToCSV = () => {
    if (!applications || applications.length === 0) {
      showToast("No intake applications to export.");
      return;
    }
    const headers = [
      "Application ID",
      "Startup Name",
      "Founder Name",
      "Email",
      "Phone",
      "Institution",
      "Category Track",
      "TRL Stage",
      "Pipeline Status",
      "Submitted Date",
      "Problem Statement",
    ];
    const rows = applications.map((app) => [
      `"${app.id || ""}"`,
      `"${(app.startupName || "").replace(/"/g, '""')}"`,
      `"${(app.founderName || "").replace(/"/g, '""')}"`,
      `"${app.founderEmail || ""}"`,
      `"${app.founderPhone || ""}"`,
      `"${(app.collegeOrEntity || "").replace(/"/g, '""')}"`,
      `"${app.category || ""}"`,
      `"${app.stage || ""}"`,
      `"${app.status || ""}"`,
      `"${app.createdAt || ""}"`,
      `"${(app.problemStatement || "").replace(/"/g, '""').replace(/\r?\n|\r/g, " ")}"`,
    ]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `mif_intake_applications_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Downloaded applications CSV roster!");
  };

  const exportStartupsToCSV = () => {
    if (!startupsList || startupsList.length === 0) {
      showToast("No startups to export.");
      return;
    }
    const headers = [
      "Startup ID",
      "Company Name",
      "Founders & Department",
      "Category",
      "TRL Stage",
      "Cohort",
      "Website",
      "LinkedIn",
      "Email",
      "Funding Support",
      "Milestone Progress",
    ];
    const rows = startupsList.map((st: any) => [
      `"${st.id || ""}"`,
      `"${(st.name || "").replace(/"/g, '""')}"`,
      `"${(st.founders || "").replace(/"/g, '""')}"`,
      `"${st.category || ""}"`,
      `"${st.stage || ""}"`,
      `"${st.cohort || ""}"`,
      `"${st.website || ""}"`,
      `"${st.linkedin || ""}"`,
      `"${st.email || ""}"`,
      `"${st.fundingStatus || ""}"`,
      `"${(st.metrics || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `mif_startups_portfolio_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Downloaded startups portfolio CSV!");
  };

  // ==========================================
  // 1. GALLERY STATE & HANDLERS
  // ==========================================
  const [galleryList, setGalleryList] = useState(content?.gallery || []);
  const [gallerySearch, setGallerySearch] = useState("");
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState("all");
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<any | null>(null);

  const [photoForm, setPhotoForm] = useState({
    title: "",
    category: "facilities" as "facilities" | "labs" | "team" | "events",
    categoryLabel: "Incubation Facility",
    image: "",
    caption: "",
    location: "MAMCET Campus, Siruganur",
  });

  useEffect(() => {
    if (content?.gallery) {
      setGalleryList(content.gallery);
    }
  }, [content?.gallery]);

  const handleOpenAddPhoto = () => {
    setEditingPhoto(null);
    setPhotoForm({
      title: "",
      category: "facilities",
      categoryLabel: "Incubation Facility",
      image: "/images/incubation/incubation-centre.jpeg",
      caption: "",
      location: "MAMCET Campus, Siruganur",
    });
    setIsGalleryModalOpen(true);
  };

  const handleOpenEditPhoto = (photo: any) => {
    setEditingPhoto(photo);
    setPhotoForm({ ...photo });
    setIsGalleryModalOpen(true);
  };

  const handleSavePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoForm.title || !photoForm.image) {
      alert("Please provide a title and image path.");
      return;
    }

    let updated: any[];
    if (editingPhoto) {
      updated = galleryList.map((p) => (p.id === editingPhoto.id ? { ...photoForm, id: p.id } : p));
      showToast("Gallery image updated successfully!");
    } else {
      const newPhoto = {
        ...photoForm,
        id: `g_${Date.now()}`,
      };
      updated = [newPhoto, ...galleryList];
      showToast("New gallery image added successfully!");
    }

    setGalleryList(updated);
    setIsGalleryModalOpen(false);
    await updateSection("gallery", updated);
  };

  const handleDeletePhoto = async (id: string) => {
    if (confirm("Are you sure you want to delete this gallery photo?")) {
      const updated = galleryList.filter((p) => p.id !== id);
      setGalleryList(updated);
      await updateSection("gallery", updated);
      showToast("Gallery image deleted.");
    }
  };

  // ==========================================
  // 2. HERO SECTION STATE & HANDLERS
  // ==========================================
  const [heroForm, setHeroForm] = useState({
    images: content?.hero?.images || [],
    rotatingTexts: content?.hero?.rotatingTexts || [],
    badge: content?.hero?.badge || "StartupTN Pre-Incubation Centre · MAMCET Siruganur",
    narrative: content?.hero?.narrative || "",
  });

  const [newHeroImageUrl, setNewHeroImageUrl] = useState("");
  const [newRotatingPhrase, setNewRotatingPhrase] = useState("");

  useEffect(() => {
    if (content?.hero) {
      setHeroForm({
        images: content.hero.images || [],
        rotatingTexts: content.hero.rotatingTexts || [],
        badge: content.hero.badge || "StartupTN Pre-Incubation Centre · MAMCET Siruganur",
        narrative: content.hero.narrative || "",
      });
    }
  }, [content?.hero]);

  const handleAddHeroImage = async () => {
    if (!newHeroImageUrl.trim()) return;
    const updatedImages = [...heroForm.images, newHeroImageUrl.trim()];
    const updatedHero = { ...heroForm, images: updatedImages };
    setHeroForm(updatedHero);
    setNewHeroImageUrl("");
    await updateSection("hero", updatedHero);
    showToast("Hero backdrop image added!");
  };

  const handleDeleteHeroImage = async (idx: number) => {
    if (heroForm.images.length <= 1) {
      alert("At least one hero background image is required.");
      return;
    }
    const updatedImages = heroForm.images.filter((_, i) => i !== idx);
    const updatedHero = { ...heroForm, images: updatedImages };
    setHeroForm(updatedHero);
    await updateSection("hero", updatedHero);
    showToast("Hero image removed.");
  };

  const handleAddRotatingPhrase = async () => {
    if (!newRotatingPhrase.trim()) return;
    const updated = [...heroForm.rotatingTexts, newRotatingPhrase.trim()];
    const updatedHero = { ...heroForm, rotatingTexts: updated };
    setHeroForm(updatedHero);
    setNewRotatingPhrase("");
    await updateSection("hero", updatedHero);
    showToast("Rotating phrase added!");
  };

  const handleDeleteRotatingPhrase = async (idx: number) => {
    if (heroForm.rotatingTexts.length <= 1) {
      alert("At least one rotating phrase is required.");
      return;
    }
    const updated = heroForm.rotatingTexts.filter((_, i) => i !== idx);
    const updatedHero = { ...heroForm, rotatingTexts: updated };
    setHeroForm(updatedHero);
    await updateSection("hero", updatedHero);
    showToast("Rotating phrase removed.");
  };

  const handleSaveHeroMeta = async () => {
    await updateSection("hero", heroForm);
    showToast("Hero headlines and badge saved!");
  };

  // ==========================================
  // 3. STARTUPS STATE & HANDLERS
  // ==========================================
  const [startupsList, setStartupsList] = useState(content?.startups || []);
  const [startupSearch, setStartupSearch] = useState("");
  const [startupCategoryFilter, setStartupCategoryFilter] = useState("ALL");
  const [isStartupModalOpen, setIsStartupModalOpen] = useState(false);
  const [editingStartup, setEditingStartup] = useState<any | null>(null);

  const [startupForm, setStartupForm] = useState({
    name: "",
    category: "ELECTRONICS_IOT_SMART",
    stage: "PROTOTYPE_MVP",
    oneLiner: "",
    founders: "",
    cohort: "Cohort 2026",
    logo: "",
    website: "",
    linkedin: "",
    email: "",
    phone: "",
    funding: "TANSEED / MSME Applicant",
    impactMetric: "",
    tagsInput: "IoT, Hardware, Innovation",
  });

  useEffect(() => {
    if (content?.startups) {
      setStartupsList(content.startups);
    }
  }, [content?.startups]);

  const handleOpenAddStartup = () => {
    setEditingStartup(null);
    setStartupForm({
      name: "",
      category: "ELECTRONICS_IOT_SMART",
      stage: "PROTOTYPE_MVP",
      oneLiner: "",
      founders: "",
      cohort: "Cohort 2026",
      logo: "",
      website: "https://",
      linkedin: "https://linkedin.com/company/",
      email: "",
      phone: "+91 ",
      funding: "TANSEED / MSME Applicant",
      impactMetric: "",
      tagsInput: "Hardware, IoT, DeepTech",
    });
    setIsStartupModalOpen(true);
  };

  const handleOpenEditStartup = (st: any) => {
    setEditingStartup(st);
    setStartupForm({
      ...st,
      logo: st.logo || "",
      tagsInput: st.tags ? st.tags.join(", ") : "",
    });
    setIsStartupModalOpen(true);
  };

  const handleSaveStartup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startupForm.name || !startupForm.founders) {
      alert("Please provide the startup name and founders.");
      return;
    }

    const tags = startupForm.tagsInput
      ? startupForm.tagsInput.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const startupRecord = {
      ...startupForm,
      tags,
    };

    let updated: any[];
    if (editingStartup) {
      updated = startupsList.map((st) =>
        st.id === editingStartup.id ? { ...startupRecord, id: st.id } : st
      );
      showToast("Startup venture updated successfully!");
    } else {
      const newStartup = {
        ...startupRecord,
        id: `s_${Date.now()}`,
      };
      updated = [newStartup, ...startupsList];
      showToast("New startup added to directory!");
    }

    setStartupsList(updated);
    setIsStartupModalOpen(false);
    await updateSection("startups", updated);
  };

  const handleDeleteStartup = async (id: string) => {
    if (confirm("Are you sure you want to remove this startup from the directory?")) {
      const updated = startupsList.filter((st) => st.id !== id);
      setStartupsList(updated);
      await updateSection("startups", updated);
      showToast("Startup removed from directory.");
    }
  };

  // ==========================================
  // 4. EVENTS & NEWS STATE & HANDLERS
  // ==========================================
  const [eventsList, setEventsList] = useState(content?.events || []);
  const [eventSearch, setEventSearch] = useState("");
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);

  const [eventForm, setEventForm] = useState({
    title: "",
    type: "Workshop",
    date: "",
    time: "10:00 AM - 04:00 PM IST",
    location: "MAMCET Campus, Siruganur",
    mode: "In-Person",
    description: "",
    registrationOpen: true,
    registrationLink: "/apply",
    flyerImage: "/images/incubation/image-3.jpeg",
  });

  useEffect(() => {
    if (content?.events) {
      setEventsList(content.events);
    }
  }, [content?.events]);

  const handleOpenAddEvent = () => {
    setEditingEvent(null);
    setEventForm({
      title: "",
      type: "Workshop",
      date: "Dec 28, 2026",
      time: "10:00 AM - 04:00 PM IST",
      location: "Auditorium & Innovation Labs, MAMCET Campus, Siruganur",
      mode: "In-Person",
      description: "",
      registrationOpen: true,
      registrationLink: "/apply",
      flyerImage: "/images/incubation/image-3.jpeg",
    });
    setIsEventModalOpen(true);
  };

  const handleOpenEditEvent = (ev: any) => {
    setEditingEvent(ev);
    setEventForm({ ...ev });
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.date) {
      alert("Please provide event title and date.");
      return;
    }

    let updated: any[];
    if (editingEvent) {
      updated = eventsList.map((ev) =>
        ev.id === editingEvent.id ? { ...eventForm, id: ev.id } : ev
      );
      showToast("Event updated successfully!");
    } else {
      const newEv = {
        ...eventForm,
        id: `e_${Date.now()}`,
      };
      updated = [newEv, ...eventsList];
      showToast("New event scheduled successfully!");
    }

    setEventsList(updated);
    setIsEventModalOpen(false);
    await updateSection("events", updated);
  };

  const handleDeleteEvent = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      const updated = eventsList.filter((ev) => ev.id !== id);
      setEventsList(updated);
      await updateSection("events", updated);
      showToast("Event deleted.");
    }
  };

  const handleToggleEventRegistration = async (id: string) => {
    const updated = eventsList.map((ev) =>
      ev.id === id ? { ...ev, registrationOpen: !ev.registrationOpen } : ev
    );
    setEventsList(updated);
    await updateSection("events", updated);
    showToast("Event registration status updated!");
  };

  // Preview cycle for Hero Studio
  const [previewPhraseIndex, setPreviewPhraseIndex] = useState(0);

  useEffect(() => {
    if (!heroForm.rotatingTexts || heroForm.rotatingTexts.length === 0) return;
    const timer = setInterval(() => {
      setPreviewPhraseIndex((prev) => (prev + 1) % heroForm.rotatingTexts.length);
    }, 2600);
    return () => clearInterval(timer);
  }, [heroForm.rotatingTexts]);

  // ==========================================
  // 5. CONTACT & LEADERSHIP STATE & HANDLERS
  // ==========================================
  const [contactForm, setContactForm] = useState(
    content?.contact || {
      address: "Trichy - Chennai Trunk Road, Siruganur, Tiruchirappalli, Tamil Nadu - 621 105",
      phone: "+91 9361697702",
      email: "incubationmanager@mamcet.com",
      managerName: "Mr. M. Santhosh Kumar",
      managerRole: "Incubation Manager",
      managerPhone: "+91 9361697702",
      managerEmail: "incubationmanager@mamcet.com",
      coordinatorName: "Ms. Hemalatha Balakrishnan",
      coordinatorRole: "Incubation Coordinator & Faculty",
      coordinatorPhone: "+91 6381945574",
      coordinatorEmail: "hemalathabalakrishnan.ece@mamcet.com",
      socialLinks: {
        linkedin: "https://in.linkedin.com/in/master-incubation-foundation-02301b446",
        instagram: "https://www.instagram.com/master_incubation_foundation/",
        googleShare: "https://share.google/V18XLHgF6Rh85vNA0",
        website: "https://mamcet.edu.in/",
      },
    }
  );

  useEffect(() => {
    if (content?.contact) {
      setContactForm(content.contact);
    }
  }, [content?.contact]);

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSection("contact", contactForm);
    showToast("Contact details & leadership info saved!");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row text-slate-900 antialiased font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[200] bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DESKTOP ADMIN SIDEBAR */}
      {/* ========================================================================= */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#091b34] text-slate-200 border-r border-slate-800 shrink-0 sticky top-0 h-screen select-none z-40">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 bg-[#07152a] flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white p-1.5 flex items-center justify-center border border-white/20 shadow-md shrink-0">
            <img
              src="/logos/official-mif-logo.png"
              alt="MIF Emblem"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base tracking-tight text-white font-display">
                MAST<span className="text-[#dc2626]">e</span>R
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-red-600/20 text-red-300 border border-red-500/30 uppercase tracking-wider">
                ADMIN
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium truncate">
              Operations & Catalog Hub
            </p>
          </div>
        </div>

        {/* Live Status Indicator Pill */}
        <div className="px-5 py-2.5 bg-blue-950/40 border-b border-slate-800/60 flex items-center justify-between text-[11px]">
          <span className="text-slate-400 font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Production Node
          </span>
          <span className="font-bold text-emerald-400">MAMCET</span>
        </div>

        {/* Sidebar Nav Items Container */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6 scrollbar-thin">
          {/* Group 1: Core Operations */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Core Operations
            </div>
            <div className="space-y-1">
              {[
                { id: "dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
                { id: "startups", label: "Startups Directory", icon: Rocket, count: startupsList.length },
                { id: "gallery", label: "Gallery Photos", icon: ImageIcon, count: galleryList.length },
                { id: "events", label: "News & Events", icon: Calendar, count: eventsList.length },
                { id: "applications", label: "Intake Applications", icon: Layers, count: applications.length },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#dc2626] text-white shadow-md shadow-red-950/30 font-bold"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-800/90 text-slate-300 border border-slate-700/60"
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 2: Startup Passport & Ecosystem */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Passport & Ecosystem
            </div>
            <div className="space-y-1">
              {[
                { id: "passports", label: "Startup Passports", icon: ShieldCheck },
                { id: "milestones", label: "Milestones Review", icon: CheckCircle2 },
                { id: "mentors", label: "Mentors & Guidance", icon: UserCheck },
                { id: "stories", label: "Success Stories CMS", icon: Sparkles },
                { id: "alumni", label: "Alumni Guild", icon: GraduationCap },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#dc2626] text-white shadow-md shadow-red-950/30 font-bold"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 3: Content & Identity */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Identity & Configuration
            </div>
            <div className="space-y-1">
              {[
                { id: "hero", label: "Hero Studio", icon: Sparkles },
                { id: "contact", label: "Contact & Leadership", icon: Phone },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#dc2626] text-white shadow-md shadow-red-950/30 font-bold"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 3: Quick Portals & Extra Links */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Extra Links & Portals
            </div>
            <div className="space-y-1">
              <Link
                href="/"
                target="_blank"
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Home className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span>Public Website Home</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300" />
              </Link>

              <Link
                href="/startups"
                target="_blank"
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Rocket className="w-3.5 h-3.5 text-red-500 group-hover:scale-110 transition-transform" />
                  <span>Public Startups Page</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300" />
              </Link>

              <Link
                href="/apply"
                target="_blank"
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span>Incubation Pitch Form</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300" />
              </Link>

              <a
                href="https://mamcet.edu.in"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>MAMCET Campus Portal</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300" />
              </a>

              <a
                href="https://startuptn.in"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span>StartupTN State Hub</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-3.5 border-t border-slate-800/80 bg-[#07152a] space-y-2 shrink-0">
          <div className="flex items-center gap-2">
            <Button
              onClick={refreshContent}
              variant="outline"
              size="sm"
              className="flex-1 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border-slate-700 text-[11px] h-8 gap-1.5"
              title="Reload live content"
            >
              <RefreshCw className={`w-3 h-3 ${contentLoading ? "animate-spin" : ""}`} />
              <span>Reload Live</span>
            </Button>
            <Button
              onClick={handleResetToDefaults}
              variant="outline"
              size="sm"
              className="bg-slate-800/80 hover:bg-rose-950/60 hover:text-rose-300 text-slate-300 border-slate-700 text-[11px] h-8 px-2.5"
              title="Reset baseline"
            >
              <RotateCcw className="w-3 h-3" />
            </Button>
          </div>
          <div className="text-[10px] text-slate-400 text-center font-mono">
            MASTeR Incubation Foundation · v2.4
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MOBILE DRAWER SIDEBAR */}
      {/* ========================================================================= */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setMobileSidebarOpen(false)}
          />

          {/* Slideover Panel */}
          <div className="relative w-72 max-w-[85vw] bg-[#091b34] text-slate-200 flex flex-col h-full shadow-2xl z-10 animate-in slide-in-from-left duration-300">
            <div className="p-4 border-b border-slate-800 bg-[#07152a] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center border border-white/20">
                  <img src="/logos/official-mif-logo.png" alt="MIF" className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="font-black text-sm text-white font-display">
                    MAST<span className="text-[#dc2626]">e</span>R Admin
                  </span>
                  <p className="text-[10px] text-slate-400">Sidebar Menu</p>
                </div>
              </div>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-5">
              <div>
                <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Operations</div>
                <div className="space-y-1">
                  {[
                    { id: "dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
                    { id: "startups", label: "Startups Directory", icon: Rocket, count: startupsList.length },
                    { id: "gallery", label: "Gallery Photos", icon: ImageIcon, count: galleryList.length },
                    { id: "events", label: "News & Events", icon: Calendar, count: eventsList.length },
                    { id: "applications", label: "Intake Applications", icon: Layers, count: applications.length },
                    { id: "passports", label: "Startup Passports", icon: ShieldCheck },
                    { id: "milestones", label: "Milestones Review", icon: CheckCircle2 },
                    { id: "mentors", label: "Mentors & Guidance", icon: UserCheck },
                    { id: "stories", label: "Success Stories CMS", icon: Sparkles },
                    { id: "alumni", label: "Alumni Guild", icon: GraduationCap },
                    { id: "hero", label: "Hero Studio", icon: Sparkles },
                    { id: "contact", label: "Contact & Leadership", icon: Phone },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id as any);
                          setMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                          isActive ? "bg-[#dc2626] text-white font-bold shadow-md shadow-red-950/40" : "text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.count !== undefined && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isActive ? "bg-white/25 text-white" : "bg-slate-800 text-slate-400"}`}>
                            {item.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Extra Links</div>
                <div className="space-y-1">
                  <Link href="/" target="_blank" onClick={() => setMobileSidebarOpen(false)} className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800">
                    <span className="flex items-center gap-2"><Home className="w-3.5 h-3.5 text-blue-400" /> Public Website</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </Link>
                  <Link href="/startups" target="_blank" onClick={() => setMobileSidebarOpen(false)} className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800">
                    <span className="flex items-center gap-2"><Rocket className="w-3.5 h-3.5 text-red-500" /> Startups Page</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </Link>
                  <Link href="/apply" target="_blank" onClick={() => setMobileSidebarOpen(false)} className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800">
                    <span className="flex items-center gap-2"><Layers className="w-3.5 h-3.5 text-purple-400" /> Application Form</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </Link>
                  <Link href="/apply/status" target="_blank" onClick={() => setMobileSidebarOpen(false)} className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800">
                    <span className="flex items-center gap-2"><Search className="w-3.5 h-3.5 text-amber-400" /> Applicant Tracker</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </Link>
                  <a href="https://mamcet.edu.in" target="_blank" rel="noreferrer" onClick={() => setMobileSidebarOpen(false)} className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800">
                    <span className="flex items-center gap-2"><Building2 className="w-3.5 h-3.5 text-emerald-400" /> MAMCET Portal</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-slate-100">
        {/* Dedicated Admin Topbar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-3 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 touch-manipulation shrink-0"
              aria-label="Toggle Sidebar Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-0.5">
                <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">
                  MIF Operations
                </span>
                <span className="text-slate-300">/</span>
                <span className="text-[11px] font-bold text-slate-600 capitalize">
                  {activeTab === "dashboard" ? "Overview" : activeTab}
                </span>
              </div>
              <h1 className="text-sm sm:text-xl font-black text-slate-900 font-display truncate">
                {activeTab === "dashboard" && (
                  <>
                    <span className="sm:hidden">Operations Hub</span>
                    <span className="hidden sm:inline">Platform Operations & Metrics</span>
                  </>
                )}
                {activeTab === "startups" && (
                  <>
                    <span className="sm:hidden">Startups Portfolio</span>
                    <span className="hidden sm:inline">Incubated Startups Directory</span>
                  </>
                )}
                {activeTab === "gallery" && (
                  <>
                    <span className="sm:hidden">Campus Gallery</span>
                    <span className="hidden sm:inline">Campus Media & Gallery Hub</span>
                  </>
                )}
                {activeTab === "hero" && (
                  <>
                    <span className="sm:hidden">Hero Studio</span>
                    <span className="hidden sm:inline">Hero Studio & Visual Identity</span>
                  </>
                )}
                {activeTab === "events" && (
                  <>
                    <span className="sm:hidden">Events Calendar</span>
                    <span className="hidden sm:inline">Foundation Calendar & Events</span>
                  </>
                )}
                {activeTab === "contact" && (
                  <>
                    <span className="sm:hidden">Desk Operations</span>
                    <span className="hidden sm:inline">Campus Contact & Desk Settings</span>
                  </>
                )}
                {activeTab === "applications" && (
                  <>
                    <span className="sm:hidden">Intake Pipeline</span>
                    <span className="hidden sm:inline">Startup Intake Application Pipeline</span>
                  </>
                )}
                {activeTab === "passports" && (
                  <>
                    <span className="sm:hidden">Passports</span>
                    <span className="hidden sm:inline">Startup Passport Digital Identity Registry</span>
                  </>
                )}
                {activeTab === "milestones" && (
                  <>
                    <span className="sm:hidden">Milestones</span>
                    <span className="hidden sm:inline">14-Stage Incubation Roadmap & Evidence Review</span>
                  </>
                )}
                {activeTab === "mentors" && (
                  <>
                    <span className="sm:hidden">Mentors</span>
                    <span className="hidden sm:inline">Mentors Directory & Advisory Session Logs</span>
                  </>
                )}
                {activeTab === "stories" && (
                  <>
                    <span className="sm:hidden">Success Stories</span>
                    <span className="hidden sm:inline">From Ideas to Impact Stories & AI Assistant</span>
                  </>
                )}
                {activeTab === "alumni" && (
                  <>
                    <span className="sm:hidden">Alumni Guild</span>
                    <span className="hidden sm:inline">Alumni Network & Connection Requests</span>
                  </>
                )}
              </h1>
            </div>
          </div>

          {/* Right Header Extra Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Link href="/" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 text-xs h-8 sm:h-9 px-2 sm:px-3 gap-1.5 shadow-xs font-semibold"
                title="View Public Website"
              >
                <Eye className="w-3.5 h-3.5 text-red-600" />
                <span className="hidden md:inline">View Public Website</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </Button>
            </Link>

            <Button
              onClick={refreshContent}
              variant="outline"
              size="sm"
              className="border-slate-300 text-slate-700 hover:bg-slate-50 text-xs h-8 sm:h-9 px-2.5 shadow-xs"
              title="Reload live content"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${contentLoading ? "animate-spin" : ""}`} />
            </Button>

            {/* Contextual Action Button */}
            {activeTab === "startups" && (
              <Button
                onClick={handleOpenAddStartup}
                size="sm"
                className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-8 sm:h-9 px-2.5 sm:px-3.5 text-xs gap-1 sm:gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add Startup</span>
              </Button>
            )}
            {activeTab === "gallery" && (
              <Button
                onClick={handleOpenAddPhoto}
                size="sm"
                className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-8 sm:h-9 px-2.5 sm:px-3.5 text-xs gap-1 sm:gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add Image</span>
              </Button>
            )}
            {activeTab === "events" && (
              <Button
                onClick={handleOpenAddEvent}
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-8 sm:h-9 px-2.5 sm:px-3.5 text-xs gap-1 sm:gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Schedule Event</span>
              </Button>
            )}
          </div>
        </header>

        {/* Tab Viewport Main Content */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-4 sm:space-y-6">

        {/* ========================================================================= */}
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {/* ========================================================================= */}
        {activeTab === "dashboard" && (
          <div className="space-y-5 sm:space-y-8 animate-in fade-in duration-300">
            {/* Executive Institutional Welcome & Overview Card */}
            <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-4 sm:p-7 shadow-xs">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
                <div className="space-y-1.5 sm:space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-bold uppercase tracking-wider border border-blue-200">
                      StartupTN Pre-Incubation Centre
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                      MSME Recognized HI
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider border border-emerald-200 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-emerald-600" />
                      <span>Automated No-Reply: Active</span>
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-900 font-display tracking-tight">
                    MASTeR Incubation Platform Operations
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Central operations console for MAMCET Siruganur. Manage portfolio ventures, review incoming intake applications, curate campus media, and maintain official leadership hotlines.
                  </p>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
                  <Button
                    onClick={handleOpenAddStartup}
                    className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-10 sm:h-11 px-5 rounded-xl text-xs gap-2 shadow-sm touch-manipulation flex-1 sm:flex-none justify-center"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Startup</span>
                  </Button>
                  <Button
                    onClick={exportApplicationsToCSV}
                    variant="outline"
                    className="border-slate-300 text-slate-700 hover:bg-slate-50 font-bold h-10 sm:h-11 px-4 rounded-xl text-xs gap-2 shadow-2xs touch-manipulation flex-1 sm:flex-none justify-center"
                  >
                    <Download className="w-4 h-4 text-purple-600" />
                    <span>Export Intake CSV</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Metrics Cards - 2x2 Grid on Mobile for Instant Scannability */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div
                onClick={() => setActiveTab("startups")}
                className="cursor-pointer p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-400 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider truncate">
                    Startups
                  </span>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
                <div className="text-2xl sm:text-4xl font-black text-slate-900 font-display">
                  {startupsList.length}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 mt-1.5 sm:mt-2 flex items-center justify-between">
                  <span className="hidden sm:inline">5 Tech Tracks</span>
                  <span className="text-blue-600 font-bold flex items-center gap-0.5 sm:gap-1 group-hover:translate-x-0.5 transition-transform text-[11px] sm:text-xs">
                    Manage <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </span>
                </div>
              </div>

              <div
                onClick={() => setActiveTab("gallery")}
                className="cursor-pointer p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-red-500 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-amber-600" />
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider truncate">
                    Gallery
                  </span>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
                <div className="text-2xl sm:text-4xl font-black text-slate-900 font-display">
                  {galleryList.length}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 mt-1.5 sm:mt-2 flex items-center justify-between">
                  <span className="hidden sm:inline">Photos & Videos</span>
                  <span className="text-red-600 font-bold flex items-center gap-0.5 sm:gap-1 group-hover:translate-x-0.5 transition-transform text-[11px] sm:text-xs">
                    Curate <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </span>
                </div>
              </div>

              <div
                onClick={() => setActiveTab("events")}
                className="cursor-pointer p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-600" />
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider truncate">
                    Events
                  </span>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
                <div className="text-2xl sm:text-4xl font-black text-slate-900 font-display">
                  {eventsList.length}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 mt-1.5 sm:mt-2 flex items-center justify-between">
                  <span className="hidden sm:inline">Schedule</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-0.5 sm:gap-1 group-hover:translate-x-0.5 transition-transform text-[11px] sm:text-xs">
                    Schedule <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </span>
                </div>
              </div>

              <div
                onClick={() => setActiveTab("applications")}
                className="cursor-pointer p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-purple-400 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-fuchsia-600" />
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider truncate">
                    Intake
                  </span>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
                <div className="text-2xl sm:text-4xl font-black text-slate-900 font-display">
                  {applications.length}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 mt-1.5 sm:mt-2 flex items-center justify-between">
                  <span className="hidden sm:inline">Queue</span>
                  <span className="text-purple-600 font-bold flex items-center gap-0.5 sm:gap-1 group-hover:translate-x-0.5 transition-transform text-[11px] sm:text-xs">
                    Screen <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Strip */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    Quick Operational Shortcuts
                  </h3>
                  <p className="text-xs text-slate-500">
                    One-tap actions to publish new content and update foundation directories
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                <Button
                  onClick={() => {
                    setActiveTab("startups");
                    handleOpenAddStartup();
                  }}
                  className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-11 rounded-xl text-xs gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Startup</span>
                </Button>

                <Button
                  onClick={() => {
                    setActiveTab("gallery");
                    handleOpenAddPhoto();
                  }}
                  className="bg-[#0f2c59] hover:bg-blue-900 text-white font-bold h-11 rounded-xl text-xs gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Media</span>
                </Button>

                <Button
                  onClick={() => {
                    setActiveTab("events");
                    handleOpenAddEvent();
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 rounded-xl text-xs gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Schedule Event</span>
                </Button>

                <Button
                  onClick={() => setActiveTab("hero")}
                  variant="outline"
                  className="border-slate-300 text-slate-800 hover:bg-slate-50 font-bold h-11 rounded-xl text-xs gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-red-600" />
                  <span>Hero Studio</span>
                </Button>

                <Button
                  onClick={() => setActiveTab("applications")}
                  variant="outline"
                  className="border-slate-300 text-slate-800 hover:bg-slate-50 font-bold h-11 rounded-xl text-xs gap-1.5"
                >
                  <Layers className="w-4 h-4 text-purple-600" />
                  <span>Review Queue</span>
                </Button>
              </div>
            </div>

            {/* Architecture Telemetry & Campus Desk Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Architecture & Endpoints Card */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Server className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        System Architecture & Health
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                      ALL GREEN
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-mono font-medium text-slate-700">/api/content</span>
                      </div>
                      <span className="font-mono text-emerald-600 font-bold text-[11px]">200 OK · In-Memory Seed</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-mono font-medium text-slate-700">/api/applications</span>
                      </div>
                      <span className="font-mono text-emerald-600 font-bold text-[11px]">200 OK · Dynamic Intake</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-mono font-medium text-slate-700">Client-Side Cache</span>
                      </div>
                      <span className="font-mono text-blue-600 font-bold text-[11px]">LocalStorage Synced</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Engine: Next.js 16 App Router</span>
                  <button onClick={refreshContent} className="text-blue-600 font-bold hover:underline flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" /> Refresh Telemetry
                  </button>
                </div>
              </div>

              {/* Campus Desk Key Contacts Card */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                        <Phone className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        Campus Desk Direct Operations
                      </h4>
                    </div>
                    <button
                      onClick={() => setActiveTab("contact")}
                      className="text-xs text-red-600 font-bold hover:underline"
                    >
                      Edit Contacts →
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-start justify-between">
                      <div>
                        <div className="font-bold text-slate-900">Mr. M. Santhosh Kumar</div>
                        <div className="text-[11px] text-slate-500">Incubation Manager</div>
                      </div>
                      <a
                        href={`tel:${contactForm.managerPhone}`}
                        className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 font-mono text-[11px] font-bold text-blue-700 hover:bg-blue-50"
                      >
                        {contactForm.managerPhone}
                      </a>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-start justify-between">
                      <div>
                        <div className="font-bold text-slate-900">Ms. Hemalatha Balakrishnan</div>
                        <div className="text-[11px] text-slate-500">Incubation Coordinator & Faculty</div>
                      </div>
                      <a
                        href={`tel:${contactForm.coordinatorPhone}`}
                        className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 font-mono text-[11px] font-bold text-blue-700 hover:bg-blue-50"
                      >
                        {contactForm.coordinatorPhone}
                      </a>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center gap-2 text-slate-600">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="truncate">Trichy - Chennai Trunk Road, Siruganur, Trichy - 621 105</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Hub: StartupTN Pre-Incubation Centre</span>
                  <a href="https://mamcet.edu.in" target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline">
                    mamcet.edu.in ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: STARTUPS DIRECTORY */}
        {/* ========================================================================= */}
        {activeTab === "startups" && (
          <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
            {/* Header Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 font-mono text-[9px] sm:text-[10px] font-bold border border-red-200">
                    PORTFOLIO MANAGEMENT
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-400 font-mono">
                    Total: {startupsList.length} ventures
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                  Startup Portfolio & Venture Adder
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 sm:mt-1 font-normal line-clamp-2 sm:line-clamp-none">
                  Add, update, or remove incubated ventures, founder contacts, funding status, and external portfolio links.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0 w-full sm:w-auto">
                <Button
                  onClick={exportStartupsToCSV}
                  variant="outline"
                  className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-50 font-bold h-10 sm:h-11 px-4 rounded-xl text-xs gap-2 shadow-2xs justify-center touch-manipulation"
                >
                  <Download className="w-4 h-4 text-blue-600" />
                  <span>Export Portfolio (CSV)</span>
                </Button>
                <Button
                  onClick={handleOpenAddStartup}
                  className="w-full sm:w-auto bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-10 sm:h-11 px-4 sm:px-5 rounded-xl text-xs gap-2 shadow-sm justify-center touch-manipulation"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Startup</span>
                </Button>
              </div>
            </div>

            {/* Search Input with Instant Clear Button & 1-Tap Category Filter Pills */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <Input
                  value={startupSearch}
                  onChange={(e) => setStartupSearch(e.target.value)}
                  placeholder="Search venture name, founder names, or tags..."
                  className="pl-10 pr-10 h-11 text-xs sm:text-sm bg-white border-slate-300 rounded-xl shadow-2xs"
                />
                {startupSearch && (
                  <button
                    onClick={() => setStartupSearch("")}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 touch-manipulation"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* 1-Tap Category Filter Pills with Touch-Pan-X & Live Counters */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none touch-pan-x select-none">
                {[
                  { id: "ALL", label: "All Ventures", count: startupsList.length },
                  {
                    id: "ELECTRONICS_IOT_SMART",
                    label: "Electronics & IoT",
                    count: startupsList.filter((s: any) => s.category === "ELECTRONICS_IOT_SMART").length,
                  },
                  {
                    id: "RENEWABLE_ENERGY_CLEAN_TECH",
                    label: "Renewable Energy",
                    count: startupsList.filter((s: any) => s.category === "RENEWABLE_ENERGY_CLEAN_TECH").length,
                  },
                  {
                    id: "ADVANCED_MANUFACTURING",
                    label: "Adv. Manufacturing",
                    count: startupsList.filter((s: any) => s.category === "ADVANCED_MANUFACTURING").length,
                  },
                  {
                    id: "SUSTAINABLE_INFRASTRUCTURE",
                    label: "Sustainable Infra",
                    count: startupsList.filter((s: any) => s.category === "SUSTAINABLE_INFRASTRUCTURE").length,
                  },
                  {
                    id: "AI_DATA_SCIENCE",
                    label: "AI & DeepTech",
                    count: startupsList.filter((s: any) => s.category === "AI_DATA_SCIENCE").length,
                  },
                ].map((cat) => {
                  const isActive = startupCategoryFilter === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setStartupCategoryFilter(cat.id)}
                      className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all touch-manipulation ${
                        isActive
                          ? "bg-[#091b34] text-white shadow-sm font-black"
                          : "bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                          isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Startups Directory Grid */}
            {(() => {
              const filteredStartups = startupsList.filter((st: any) => {
                if (!st || !st.name) return false;
                const q = startupSearch.toLowerCase();
                const matchSearch =
                  (st.name && st.name.toLowerCase().includes(q)) ||
                  (st.founders && st.founders.toLowerCase().includes(q)) ||
                  (st.tags && st.tags.some((t: string) => t.toLowerCase().includes(q)));
                const matchCat =
                  startupCategoryFilter === "ALL" || st.category === startupCategoryFilter;
                return matchSearch && matchCat;
              });

              if (filteredStartups.length === 0) {
                return (
                  <div className="p-8 sm:p-12 text-center rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                      <Search className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base font-display">
                      No matching startups found
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      No ventures matched your search query or category filter. Try clearing your filters.
                    </p>
                    <Button
                      onClick={() => {
                        setStartupSearch("");
                        setStartupCategoryFilter("ALL");
                      }}
                      variant="outline"
                      size="sm"
                      className="text-xs border-slate-300"
                    >
                      Reset All Filters
                    </Button>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {filteredStartups.map((st: any) => (
                    <div
                      key={st.id}
                      className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-red-500 hover:shadow-md transition-all group"
                    >
                      <div>
                        {/* Top Card Row */}
                        <div className="flex items-start justify-between mb-2.5 sm:mb-3 gap-2.5 sm:gap-3">
                          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200/90 p-1.5 sm:p-2 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                              {st.logo ? (
                                <img
                                  src={st.logo}
                                  alt={st.name}
                                  className="max-h-full max-w-full object-contain"
                                />
                              ) : (
                                <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap mb-1">
                                <Badge
                                  variant={
                                    st.stage === "EARLY_TRACTION"
                                      ? "emerald"
                                      : st.stage === "GROWTH_SCALE"
                                      ? "default"
                                      : "cyan"
                                  }
                                  className="text-[9px] font-bold px-1.5 sm:px-2 py-0.2"
                                >
                                  {st.stage ? st.stage.replace(/_/g, " ") : "INCUBATED"}
                                </Badge>
                                <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 sm:px-2 py-0.2 rounded-full border border-slate-200">
                                  {st.cohort || "Cohort 2026"}
                                </span>
                              </div>
                              <h3 className="text-base sm:text-xl font-bold text-slate-900 font-display leading-tight truncate">
                                {st.name}
                              </h3>
                            </div>
                          </div>

                          {/* Quick Actions (Edit / Delete) */}
                          <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
                            <button
                              onClick={() => handleOpenEditStartup(st)}
                              className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors touch-manipulation"
                              title="Edit Startup Profile"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteStartup(st.id)}
                              className="p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors touch-manipulation"
                              title="Delete Startup"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Founder Subtext */}
                        <div className="text-xs text-slate-600 mb-2">
                          <strong className="text-slate-800">Founders:</strong> {st.founders}
                        </div>

                        {/* One-Liner Description */}
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3 sm:mb-4 font-normal line-clamp-2">
                          {st.oneLiner}
                        </p>

                        {/* Direct Contact & Social Links Strip */}
                        <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 text-xs">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              <span className="text-slate-500 font-medium shrink-0">Website:</span>
                              {st.website ? (
                                <a
                                  href={st.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 font-semibold truncate hover:underline"
                                >
                                  {st.website}
                                </a>
                              ) : (
                                <span className="text-slate-400 italic">None added</span>
                              )}
                            </div>
                            {st.website && (
                              <a href={st.website} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3 h-3 text-slate-400 hover:text-blue-600 shrink-0" />
                              </a>
                            )}
                          </div>

                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <Linkedin className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                              <span className="text-slate-500 font-medium shrink-0">LinkedIn:</span>
                              {st.linkedin ? (
                                <a
                                  href={st.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 font-semibold truncate hover:underline"
                                >
                                  {st.linkedin}
                                </a>
                              ) : (
                                <span className="text-slate-400 italic">None added</span>
                              )}
                            </div>
                            {st.linkedin && (
                              <a href={st.linkedin} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3 h-3 text-slate-400 hover:text-cyan-600 shrink-0" />
                              </a>
                            )}
                          </div>

                          {(st.email || st.phone) && (
                            <div className="flex items-center gap-3 sm:gap-4 pt-1.5 border-t border-slate-200/60 text-[11px] text-slate-600 flex-wrap">
                              {st.email && (
                                <a
                                  href={`mailto:${st.email}`}
                                  className="flex items-center gap-1 hover:text-red-600 transition-colors truncate"
                                >
                                  <Mail className="w-3 h-3 text-red-600 shrink-0" />
                                  <span className="truncate">{st.email}</span>
                                </a>
                              )}
                              {st.phone && (
                                <a
                                  href={`tel:${st.phone}`}
                                  className="flex items-center gap-1 hover:text-emerald-600 transition-colors shrink-0 font-mono"
                                >
                                  <Phone className="w-3 h-3 text-emerald-600 shrink-0" />
                                  <span>{st.phone}</span>
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Bottom Metrics & Funding Status */}
                      <div className="flex items-center justify-between text-xs text-slate-600 pt-2.5 sm:pt-3 border-t border-slate-100 flex-wrap gap-1">
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 sm:px-2.5 py-0.5 rounded-full border border-emerald-200 text-[10px] sm:text-[11px]">
                          {st.funding || "Grant Eligible"}
                        </span>
                        {st.impactMetric && (
                          <span className="font-mono text-slate-500 text-[10px] sm:text-[11px] font-medium truncate">
                            {st.impactMetric}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: GALLERY MANAGER */}
        {/* ========================================================================= */}
        {activeTab === "gallery" && (
          <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
            {/* Header Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 font-mono text-[9px] sm:text-[10px] font-bold border border-red-200">
                    CAMPUS MEDIA & LABS
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-400 font-mono">
                    Total: {galleryList.length} media items
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                  Campus Photo Gallery Manager
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 sm:mt-1 font-normal line-clamp-2 sm:line-clamp-none">
                  Curate high-resolution campus photography, lab infrastructure, student co-working facilities, and video tours.
                </p>
              </div>
              <Button
                onClick={handleOpenAddPhoto}
                className="w-full sm:w-auto bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-10 sm:h-11 px-4 sm:px-5 rounded-xl text-xs gap-2 shrink-0 shadow-sm justify-center"
              >
                <Plus className="w-4 h-4" />
                <span>Add Gallery Photo</span>
              </Button>
            </div>

            {/* Filter by Category & Search with Live Counters */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <Input
                  value={gallerySearch}
                  onChange={(e) => setGallerySearch(e.target.value)}
                  placeholder="Search media by title, caption, or location..."
                  className="pl-10 pr-10 h-11 text-xs sm:text-sm bg-white border-slate-300 rounded-xl shadow-2xs"
                />
                {gallerySearch && (
                  <button
                    onClick={() => setGallerySearch("")}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 touch-manipulation"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none touch-pan-x select-none">
                {[
                  { id: "all", label: "All Media", count: galleryList.length },
                  {
                    id: "facilities",
                    label: "Facilities & Workbenches",
                    count: galleryList.filter((p: any) => p.category === "facilities").length,
                  },
                  {
                    id: "labs",
                    label: "Maker Labs & 3D Print",
                    count: galleryList.filter((p: any) => p.category === "labs").length,
                  },
                  {
                    id: "team",
                    label: "Mentors & Leadership",
                    count: galleryList.filter((p: any) => p.category === "team").length,
                  },
                  {
                    id: "events",
                    label: "Demo Days & Workshops",
                    count: galleryList.filter((p: any) => p.category === "events").length,
                  },
                ].map((cat) => {
                  const isActive = galleryCategoryFilter === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setGalleryCategoryFilter(cat.id)}
                      className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all touch-manipulation ${
                        isActive
                          ? "bg-[#091b34] text-white shadow-sm font-black"
                          : "bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                          isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Photos & Videos Grid */}
            {(() => {
              const filteredGallery = galleryList.filter((p: any) => {
                if (!p || !p.title) return false;
                const q = gallerySearch.toLowerCase();
                const matchSearch =
                  !q ||
                  p.title.toLowerCase().includes(q) ||
                  (p.caption && p.caption.toLowerCase().includes(q)) ||
                  (p.location && p.location.toLowerCase().includes(q));
                const matchCat =
                  galleryCategoryFilter === "all" || p.category === galleryCategoryFilter;
                return matchSearch && matchCat;
              });

              if (filteredGallery.length === 0) {
                return (
                  <div className="p-8 sm:p-12 text-center rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base font-display">
                      No media assets found
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      No photographs or videos match your current category and search query.
                    </p>
                    <Button
                      onClick={() => {
                        setGallerySearch("");
                        setGalleryCategoryFilter("all");
                      }}
                      variant="outline"
                      size="sm"
                      className="text-xs border-slate-300"
                    >
                      Reset All Filters
                    </Button>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                  {filteredGallery.map((p: any) => {
                    const isVideo =
                      p.image?.startsWith("data:video/") ||
                      p.image?.endsWith(".mp4") ||
                      p.image?.endsWith(".webm");

                    return (
                      <div
                        key={p.id}
                        className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs overflow-hidden flex flex-col justify-between group hover:border-red-500 hover:shadow-md transition-all"
                      >
                        <div>
                          <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                            {isVideo ? (
                              <video
                                src={p.image}
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <img
                                src={p.image}
                                alt={p.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            )}
                            <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex items-center gap-1.5">
                              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold shadow-xs border border-white/10">
                                {p.categoryLabel || p.category}
                              </span>
                              {isVideo && (
                                <span className="px-2 py-0.5 rounded-full bg-cyan-600/95 text-white text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs">
                                  <Video className="w-2.5 h-2.5" /> Video
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="p-4 sm:p-5">
                            <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-1 font-display">
                              {p.title}
                            </h4>
                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2.5 sm:mb-3">
                              {p.caption}
                            </p>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                              <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                              <span className="truncate">{p.location}</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 sm:p-4 bg-slate-50/80 border-t border-slate-200/80 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-slate-400">{p.id}</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenEditPhoto(p)}
                              className="p-1.5 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors touch-manipulation"
                              title="Edit Media Details"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePhoto(p.id)}
                              className="p-1.5 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors touch-manipulation"
                              title="Delete Photo/Video"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: HERO STUDIO */}
        {/* ========================================================================= */}
        {activeTab === "hero" && (
          <div className="space-y-5 sm:space-y-8 animate-in fade-in duration-300">
            {/* Header Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-mono text-[9px] sm:text-[10px] font-bold border border-blue-200">
                    HERO STUDIO & BRANDING
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-400 font-mono">
                    {heroForm.images.length} Backdrops · {heroForm.rotatingTexts.length} Keywords
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                  Hero Studio & Visual Identity
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 sm:mt-1 font-normal line-clamp-2 sm:line-clamp-none">
                  Control the main landing hero backdrops, rotating animated keywords, institutional badges, and narrative.
                </p>
              </div>
            </div>

            {/* INTERACTIVE LIVE HERO PREVIEW CARD */}
            <div className="rounded-2xl sm:rounded-3xl bg-slate-900 border border-slate-800 text-white overflow-hidden shadow-lg relative">
              <div className="p-3 sm:p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
                    Interactive Live Hero Simulation
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono text-slate-400">
                  {previewPhraseIndex + 1} / {heroForm.rotatingTexts.length}
                </span>
              </div>

              {/* Simulated Hero Viewport */}
              <div className="relative p-5 sm:p-12 min-h-[220px] sm:min-h-[360px] flex flex-col justify-center items-center text-center overflow-hidden">
                {/* Backdrop Image */}
                {heroForm.images.length > 0 && (
                  <img
                    src={heroForm.images[previewPhraseIndex % heroForm.images.length] || heroForm.images[0]}
                    alt="Hero Preview Backdrop"
                    className="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-xs"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />

                <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
                  {/* Top Badge */}
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] font-semibold text-red-400">
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500" />
                    <span className="truncate max-w-[260px] sm:max-w-none">{heroForm.badge}</span>
                  </div>

                  {/* Dynamic Headline */}
                  <h1 className="text-xl sm:text-3xl lg:text-5xl font-black text-white font-display tracking-tight leading-tight">
                    Accelerating Innovators into{" "}
                    <span className="text-[#dc2626] underline decoration-red-600/60 underline-offset-4 animate-in fade-in duration-300">
                      {heroForm.rotatingTexts[previewPhraseIndex] || "DeepTech Ventures"}
                    </span>
                  </h1>

                  {/* Narrative Subtitle */}
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {heroForm.narrative ||
                      "MAMCET's ecosystem bridge empowering Tamil Nadu innovators from prototype validation to funding readiness."}
                  </p>

                  {/* Sample Mock CTA Buttons */}
                  <div className="flex items-center justify-center gap-2 sm:gap-3 pt-1 sm:pt-2">
                    <div className="px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#dc2626] text-white text-[11px] sm:text-xs font-bold shadow-md cursor-default">
                      Apply for Incubation →
                    </div>
                    <div className="px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-bold cursor-default">
                      Explore Startups
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 1. Backdrop Images Carousel Studio */}
            <div className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4 sm:space-y-5">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 font-display">
                  Hero Backdrop Images Carousel
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Add or remove authentic campus images used in the main hero background transition.
                </p>
              </div>

              {/* Upload New Backdrop Bar */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <MediaUploadZone
                  value={newHeroImageUrl}
                  onChange={(val) => setNewHeroImageUrl(val)}
                  label="Upload New Backdrop Slide or Video"
                  helperText="Upload campus photography, lab facilities, or background video clip"
                  aspectRatio="aspect-video"
                />
                {newHeroImageUrl && (
                  <div className="flex justify-end pt-1">
                    <Button
                      onClick={handleAddHeroImage}
                      className="w-full sm:w-auto bg-[#0f2c59] hover:bg-blue-900 text-white font-bold h-10 px-5 rounded-xl text-xs gap-2 shadow-sm justify-center"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Hero Carousel</span>
                    </Button>
                  </div>
                )}
              </div>

              {/* Existing Images Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
                {heroForm.images.map((img: string, idx: number) => (
                  <div
                    key={idx}
                    className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 group bg-slate-100 aspect-video flex flex-col justify-end shadow-2xs"
                  >
                    <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleDeleteHeroImage(idx)}
                        className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg touch-manipulation"
                        title="Delete Hero Slide"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] sm:text-[10px] font-mono">
                      #{idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Dynamic Rotating Keywords Studio */}
            <div className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 font-display">
                  Dynamic Text Rotation Phrases
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  These keywords cycle seamlessly in the Hero headline with live fading animations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <Input
                  value={newRotatingPhrase}
                  onChange={(e) => setNewRotatingPhrase(e.target.value)}
                  placeholder="Enter new rotating keyword (e.g. Agritech Robotics)..."
                  className="flex-1 h-11 text-xs sm:text-sm bg-white"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddRotatingPhrase();
                    }
                  }}
                />
                <Button
                  onClick={handleAddRotatingPhrase}
                  className="w-full sm:w-auto bg-[#dc2626] hover:bg-red-700 text-white font-bold h-11 px-5 rounded-xl text-xs gap-2 shrink-0 justify-center"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Phrase</span>
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {heroForm.rotatingTexts.map((phrase: string, idx: number) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-100 border border-slate-300/80 text-xs font-bold text-slate-800 shadow-2xs"
                  >
                    <span>{phrase}</span>
                    <button
                      onClick={() => handleDeleteRotatingPhrase(idx)}
                      className="p-1 rounded-full hover:bg-slate-200 text-slate-500 hover:text-red-600 transition-colors touch-manipulation"
                      title="Remove phrase"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Hero Badge & Tagline Configuration */}
            <div className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 font-display">
                  Hero Top Badge & Narrative Tagline
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Configure institutional badge text and headline narrative copy.
                </p>
              </div>

              <div className="space-y-4 max-w-2xl">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Top Institutional Badge Text
                  </label>
                  <Input
                    value={heroForm.badge}
                    onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                    className="h-11 text-xs sm:text-sm bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Hero Narrative Description
                  </label>
                  <textarea
                    rows={3}
                    value={heroForm.narrative}
                    onChange={(e) => setHeroForm({ ...heroForm, narrative: e.target.value })}
                    className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <Button
                  onClick={handleSaveHeroMeta}
                  className="w-full sm:w-auto bg-[#0f2c59] hover:bg-blue-900 text-white font-bold h-11 px-6 rounded-xl text-xs gap-2 shadow-sm justify-center"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Hero Settings</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: NEWS & EVENTS */}
        {/* ========================================================================= */}
        {activeTab === "events" && (
          <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
            {/* Header Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold border border-emerald-200">
                    CAMPUS CALENDAR
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Total: {eventsList.length} scheduled events
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                  Workshops, Hackathons & News Events
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                  Publish upcoming incubator events, hackathon dates, and grant masterclasses with 1-tap registration toggling.
                </p>
              </div>
              <Button
                onClick={handleOpenAddEvent}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-10 sm:h-11 px-5 rounded-xl text-xs gap-2 shrink-0 shadow-sm touch-manipulation justify-center"
              >
                <Plus className="w-4 h-4" />
                <span>Schedule New Event</span>
              </Button>
            </div>

            {/* Events Grid with Split-Date Tile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {eventsList.map((ev: any) => {
                // Parse date for split tile (e.g. "Dec 28, 2026")
                const parts = (ev.date || "").split(" ");
                const monthStr = parts[0] ? parts[0].slice(0, 3).toUpperCase() : "DATE";
                const dayStr = parts[1] ? parts[1].replace(/,/g, "") : "·";

                return (
                  <div
                    key={ev.id}
                    className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-emerald-400 hover:shadow-md transition-all group"
                  >
                    <div>
                      {/* Top Row with Split Date & Action Buttons */}
                      <div className="flex items-start justify-between mb-4 gap-3">
                        <div className="flex items-center gap-3">
                          {/* Executive Split Date Box */}
                          <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-200/90 flex flex-col items-center justify-center shrink-0 shadow-2xs">
                            <span className="text-[10px] font-black text-emerald-800 font-mono leading-none uppercase">
                              {monthStr}
                            </span>
                            <span className="text-base sm:text-lg font-black text-slate-900 font-display leading-tight">
                              {dayStr}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                              {ev.type}
                            </span>
                            <span className="ml-1.5 text-[10px] font-mono text-slate-400">
                              {ev.mode}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleOpenEditEvent(ev)}
                            className="p-2 sm:p-1.5 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors touch-manipulation"
                            title="Edit Event"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(ev.id)}
                            className="p-2 sm:p-1.5 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors touch-manipulation"
                            title="Delete Event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display mb-2 line-clamp-1">
                        {ev.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                        {ev.description}
                      </p>

                      <div className="space-y-1.5 text-xs text-slate-700 pt-3 border-t border-slate-100 mb-4 font-medium">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                          <span>{ev.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{ev.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* 1-Tap Registration Toggle Button */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-3 border-t border-slate-100 text-xs">
                      <button
                        onClick={() => handleToggleEventRegistration(ev.id)}
                        className={`w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl text-xs font-bold transition-all min-h-[38px] touch-manipulation ${
                          ev.registrationOpen
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200"
                        }`}
                        title="Click to toggle registration status"
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            ev.registrationOpen ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                          }`}
                        />
                        <span>{ev.registrationOpen ? "Registrations Open" : "Registrations Closed"}</span>
                      </button>
                      <span className="text-slate-400 font-mono text-[10px] self-end sm:self-auto">{ev.id}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: CONTACT & LEADERSHIP */}
        {/* ========================================================================= */}
        {activeTab === "contact" && (
          <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
            {/* Header Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-mono text-[10px] font-bold border border-blue-200">
                    DESK OPERATIONS & ROSTER
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                  Campus Contact & Leadership Profiles
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                  Configure foundation managers, direct hotlines, campus address, and official social media presence.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveContact} className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Left Column: Campus Hotlines & Address */}
              <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-5 sm:space-y-6">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wider mb-1 font-display">
                    Campus Desk Operations
                  </h3>
                  <p className="text-xs text-slate-500">Official location & management hotlines</p>
                </div>

                {/* Campus Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Official Campus Address
                  </label>
                  <Input
                    value={contactForm.address}
                    onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                    className="h-10 sm:h-11 text-xs sm:text-sm bg-slate-50"
                    required
                  />
                </div>

                {/* Incubation Manager */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                    Incubation Manager Profile
                  </span>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Full Name</label>
                    <Input
                      value={contactForm.managerName}
                      onChange={(e) => setContactForm({ ...contactForm, managerName: e.target.value })}
                      className="h-10 text-xs bg-slate-50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Direct Hotline / Phone</label>
                    <Input
                      value={contactForm.managerPhone}
                      onChange={(e) => setContactForm({ ...contactForm, managerPhone: e.target.value })}
                      className="h-10 text-xs bg-slate-50 font-mono"
                      required
                    />
                  </div>
                </div>

                {/* Incubation Coordinator */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                    Incubation Coordinator Profile
                  </span>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Full Name</label>
                    <Input
                      value={contactForm.coordinatorName}
                      onChange={(e) => setContactForm({ ...contactForm, coordinatorName: e.target.value })}
                      className="h-10 text-xs bg-slate-50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Direct Phone</label>
                    <Input
                      value={contactForm.coordinatorPhone}
                      onChange={(e) => setContactForm({ ...contactForm, coordinatorPhone: e.target.value })}
                      className="h-10 text-xs bg-slate-50 font-mono"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Social Channels & Public Preview */}
              <div className="space-y-4 sm:space-y-6">
                <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wider mb-1 font-display">
                      Official Channels & Social Links
                    </h3>
                    <p className="text-xs text-slate-500">Public links displayed across footer and headers</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      LinkedIn Page URL
                    </label>
                    <Input
                      value={contactForm.socialLinks?.linkedin || ""}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          socialLinks: { ...contactForm.socialLinks, linkedin: e.target.value },
                        })
                      }
                      className="h-10 text-xs bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Instagram Profile URL
                    </label>
                    <Input
                      value={contactForm.socialLinks?.instagram || ""}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          socialLinks: { ...contactForm.socialLinks, instagram: e.target.value },
                        })
                      }
                      className="h-10 text-xs bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Google Maps Share Link
                    </label>
                    <Input
                      value={contactForm.socialLinks?.googleShare || ""}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          socialLinks: { ...contactForm.socialLinks, googleShare: e.target.value },
                        })
                      }
                      className="h-10 text-xs bg-slate-50"
                    />
                  </div>
                </div>

                {/* Save Button Card */}
                <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 to-[#0f2c59] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
                  <div>
                    <div className="font-bold text-sm">Commit Changes to Production</div>
                    <div className="text-[11px] text-slate-300">Instantly syncs with public website footer</div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto justify-center bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-11 px-6 rounded-xl text-xs gap-2 shadow-sm touch-manipulation"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Contact Details</span>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: INTAKE APPLICATIONS REVIEW */}
        {/* ========================================================================= */}
        {activeTab === "applications" && (
          <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
            {/* Header Strip */}
            <div className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 font-mono text-[10px] font-bold border border-purple-200">
                    INTAKE SCREENING PIPELINE
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Total: {applications.length} inbound applications
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                  Startup Incubation Intake Pipeline
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                  Review student, faculty, and external applications submitted through the /apply portal.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto shrink-0">
                <Button
                  onClick={exportApplicationsToCSV}
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto justify-center text-xs border-slate-300 text-slate-700 hover:bg-slate-50 gap-2 h-10 px-4 shadow-2xs font-bold touch-manipulation"
                >
                  <Download className="w-3.5 h-3.5 text-purple-600" />
                  <span>Export to CSV</span>
                </Button>
                <Button
                  onClick={fetchApps}
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto justify-center text-xs border-slate-300 text-slate-700 hover:bg-slate-50 gap-2 h-10 px-4 shadow-2xs font-bold touch-manipulation"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${appsLoading ? "animate-spin" : ""}`} />
                  <span>Refresh Queue</span>
                </Button>
              </div>
            </div>

            {/* Search Input with Instant Clear & Stage Filter Pills */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <Input
                  value={appSearch}
                  onChange={(e) => setAppSearch(e.target.value)}
                  placeholder="Search applicant name, venture title, problem statement, or email..."
                  className="pl-10 pr-10 h-11 text-xs sm:text-sm bg-white border-slate-300 rounded-xl shadow-2xs"
                />
                {appSearch && (
                  <button
                    onClick={() => setAppSearch("")}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 touch-manipulation"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* 1-Tap Pipeline Stage Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none touch-pan-x select-none">
                {[
                  { id: "ALL", label: "All Inbound", count: applications.length },
                  {
                    id: "SUBMITTED",
                    label: "Submitted",
                    count: applications.filter((a) => a.status === "SUBMITTED").length,
                  },
                  {
                    id: "UNDER_REVIEW",
                    label: "Under Review",
                    count: applications.filter((a) => a.status === "UNDER_REVIEW").length,
                  },
                  {
                    id: "SHORTLISTED_FOR_PITCH",
                    label: "Pitch Shortlist",
                    count: applications.filter((a) => a.status === "SHORTLISTED_FOR_PITCH").length,
                  },
                  {
                    id: "INCUBATED",
                    label: "Incubated",
                    count: applications.filter((a) => a.status === "INCUBATED").length,
                  },
                  {
                    id: "REJECTED",
                    label: "Archived / Rejected",
                    count: applications.filter((a) => a.status === "REJECTED").length,
                  },
                ].map((stg) => {
                  const isActive = appStatusFilter === stg.id;
                  return (
                    <button
                      key={stg.id}
                      onClick={() => setAppStatusFilter(stg.id)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all touch-manipulation ${
                        isActive
                          ? "bg-[#091b34] text-white shadow-sm font-black"
                          : "bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50"
                      }`}
                    >
                      <span>{stg.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                          isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {stg.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Applications List */}
            {(() => {
              const filteredApps = applications.filter((app) => {
                const q = appSearch.toLowerCase();
                const matchSearch =
                  !q ||
                  app.startupName?.toLowerCase().includes(q) ||
                  app.founderName?.toLowerCase().includes(q) ||
                  app.founderEmail?.toLowerCase().includes(q) ||
                  app.problemStatement?.toLowerCase().includes(q) ||
                  app.category?.toLowerCase().includes(q);
                const matchStatus =
                  appStatusFilter === "ALL" || app.status === appStatusFilter;
                return matchSearch && matchStatus;
              });

              if (filteredApps.length === 0) {
                return (
                  <div className="p-8 sm:p-12 text-center rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                      <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base font-display">
                      No applications match criteria
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      {applications.length === 0
                        ? "No intake applications have been submitted yet. Applicants can apply via /apply."
                        : "Try selecting another stage pill or clearing your search query."}
                    </p>
                    {applications.length > 0 && (
                      <Button
                        onClick={() => {
                          setAppSearch("");
                          setAppStatusFilter("ALL");
                        }}
                        variant="outline"
                        size="sm"
                        className="text-xs border-slate-300 touch-manipulation"
                      >
                        Reset All Filters
                      </Button>
                    )}
                  </div>
                );
              }

              return (
                <div className="space-y-4">
                  {filteredApps.map((app) => (
                    <div
                      key={app.id}
                      className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 hover:border-purple-300 hover:shadow-md transition-all"
                    >
                      <div className="space-y-2.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h4 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                            {app.startupName}
                          </h4>
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                              app.status === "INCUBATED"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : app.status === "SHORTLISTED_FOR_PITCH"
                                ? "bg-cyan-50 text-cyan-700 border-cyan-200"
                                : app.status === "UNDER_REVIEW"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : app.status === "REJECTED"
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : "bg-blue-50 text-blue-700 border-blue-200"
                            }`}
                          >
                            {app.status ? app.status.replace(/_/g, " ") : "SUBMITTED"}
                          </span>
                          {app.category && (
                            <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                              {app.category}
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-slate-600 flex items-center gap-3 flex-wrap">
                          <span className="font-semibold text-slate-900">
                            Founder: {app.founderName}
                          </span>
                          {app.founderEmail && (
                            <a
                              href={`mailto:${app.founderEmail}`}
                              className="text-blue-600 hover:underline flex items-center gap-1"
                            >
                              <Mail className="w-3 h-3 text-red-600" />
                              <span>{app.founderEmail}</span>
                            </a>
                          )}
                          {app.founderPhone && (
                            <a
                              href={`tel:${app.founderPhone}`}
                              className="text-slate-600 hover:text-emerald-600 flex items-center gap-1 font-mono"
                            >
                              <Phone className="w-3 h-3 text-emerald-600" />
                              <span>{app.founderPhone}</span>
                            </a>
                          )}
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed font-normal bg-slate-50/60 p-3 rounded-2xl border border-slate-100">
                          {app.problemStatement || app.solutionDescription || "Application submission received. Intake screening pending."}
                        </p>

                        <div className="flex items-center justify-between pt-0.5">
                          <button
                            type="button"
                            onClick={() => setSelectedAppDossier(app)}
                            className="text-xs font-bold text-purple-700 hover:text-purple-900 hover:underline flex items-center gap-1.5 touch-manipulation"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>View Full Dossier & Pitch Deck →</span>
                          </button>
                        </div>
                      </div>

                      {/* Pipeline Stage Selector Control */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 bg-slate-50 p-2 sm:p-2.5 rounded-2xl border border-slate-200 w-full md:w-auto">
                        <span className="text-[11px] font-bold text-slate-600 px-1">Pipeline Stage:</span>
                        <select
                          value={app.status}
                          onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                          className="h-10 sm:h-9 px-3 text-xs font-bold rounded-xl border border-slate-300 bg-white text-slate-800 shadow-2xs focus:ring-2 focus:ring-purple-500 focus:outline-none w-full sm:w-auto touch-manipulation"
                        >
                          <option value="SUBMITTED">SUBMITTED</option>
                          <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                          <option value="SHORTLISTED_FOR_PITCH">SHORTLISTED_FOR_PITCH</option>
                          <option value="INCUBATED">INCUBATED</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}

        {/* ECOSYSTEM EXTENSION TABS: PASSPORTS, MILESTONES, MENTORS, STORIES, ALUMNI */}
        {(activeTab === "passports" ||
          activeTab === "milestones" ||
          activeTab === "mentors" ||
          activeTab === "stories" ||
          activeTab === "alumni") && (
          <EcosystemAdminTabs tab={activeTab} showToast={showToast} />
        )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: ADD / EDIT STARTUP MODAL */}
      {/* ========================================================================= */}
      {isStartupModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          <div className="relative w-full max-w-2xl max-h-[90vh] sm:max-h-[86vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Pinned Sticky Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100 shrink-0">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                    {editingStartup ? "Edit Startup Profile" : "Add New Incubated Startup"}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Configure company details, founder contacts, links & traction metrics
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsStartupModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Interior Form Body */}
            <form onSubmit={handleSaveStartup} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm">
                {/* Startup Brand Logo Upload Zone */}
                <MediaUploadZone
                  value={startupForm.logo}
                  onChange={(val) => setStartupForm({ ...startupForm, logo: val })}
                  label="Startup Brand Logo (PNG, SVG, JPG, WebP)"
                  helperText="Upload official brand logo or emblem (transparent PNG or SVG recommended)"
                  aspectRatio="aspect-square max-h-32 sm:max-h-36"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Startup Name *
                    </label>
                    <Input
                      required
                      value={startupForm.name}
                      onChange={(e) => setStartupForm({ ...startupForm, name: e.target.value })}
                      placeholder="e.g. AgroSens Telemetry"
                      className="h-10 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Founders & Dept *
                    </label>
                    <Input
                      required
                      value={startupForm.founders}
                      onChange={(e) => setStartupForm({ ...startupForm, founders: e.target.value })}
                      placeholder="e.g. Arun K. (ECE Dept)"
                      className="h-10 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Category Track
                    </label>
                    <select
                      value={startupForm.category}
                      onChange={(e) => setStartupForm({ ...startupForm, category: e.target.value })}
                      className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                    >
                      <option value="ELECTRONICS_IOT_SMART">Electronics & IoT</option>
                      <option value="RENEWABLE_ENERGY_CLEAN_TECH">Renewable Energy</option>
                      <option value="ADVANCED_MANUFACTURING">Advanced Manufacturing</option>
                      <option value="SUSTAINABLE_INFRASTRUCTURE">Sustainable Infrastructure</option>
                      <option value="AI_DATA_SCIENCE">AI & Data Science</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      TRL / Stage
                    </label>
                    <select
                      value={startupForm.stage}
                      onChange={(e) => setStartupForm({ ...startupForm, stage: e.target.value })}
                      className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                    >
                      <option value="IDEATION">Ideation</option>
                      <option value="PROOF_OF_CONCEPT">Proof of Concept</option>
                      <option value="PROTOTYPE_MVP">Prototype / MVP</option>
                      <option value="EARLY_TRACTION">Early Traction</option>
                      <option value="GROWTH_SCALE">Growth & Scale</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Cohort Year
                    </label>
                    <Input
                      value={startupForm.cohort}
                      onChange={(e) => setStartupForm({ ...startupForm, cohort: e.target.value })}
                      placeholder="Cohort 2026"
                      className="h-10 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    One-Liner Problem / Solution Summary *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={startupForm.oneLiner}
                    onChange={(e) => setStartupForm({ ...startupForm, oneLiner: e.target.value })}
                    placeholder="Concise description of the hardware/software prototype..."
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Startup Website Link & LinkedIn Link */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-200">
                  <div>
                    <label className="block text-xs font-bold text-blue-900 uppercase mb-1 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-blue-600" />
                      <span>Startup Website Link</span>
                    </label>
                    <Input
                      value={startupForm.website}
                      onChange={(e) => setStartupForm({ ...startupForm, website: e.target.value })}
                      placeholder="https://yourstartup.com"
                      className="h-10 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-blue-900 uppercase mb-1 flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                      <span>Startup LinkedIn Link</span>
                    </label>
                    <Input
                      value={startupForm.linkedin}
                      onChange={(e) => setStartupForm({ ...startupForm, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/company/yourstartup"
                      className="h-10 text-xs bg-white"
                    />
                  </div>
                </div>

                {/* Founder Direct Contacts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Founder Contact Email
                    </label>
                    <Input
                      type="email"
                      value={startupForm.email}
                      onChange={(e) => setStartupForm({ ...startupForm, email: e.target.value })}
                      placeholder="founder@venture.com"
                      className="h-10 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Founder Phone Number
                    </label>
                    <Input
                      value={startupForm.phone}
                      onChange={(e) => setStartupForm({ ...startupForm, phone: e.target.value })}
                      placeholder="+91 98421 00000"
                      className="h-10 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Funding / Grant Status
                    </label>
                    <Input
                      value={startupForm.funding}
                      onChange={(e) => setStartupForm({ ...startupForm, funding: e.target.value })}
                      placeholder="e.g. TANSEED ₹10L Shortlisted"
                      className="h-10 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Traction / Impact Metric
                    </label>
                    <Input
                      value={startupForm.impactMetric}
                      onChange={(e) => setStartupForm({ ...startupForm, impactMetric: e.target.value })}
                      placeholder="e.g. 8 Field Pilots in Trichy"
                      className="h-10 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Tags (Comma separated)
                  </label>
                  <Input
                    value={startupForm.tagsInput}
                    onChange={(e) => setStartupForm({ ...startupForm, tagsInput: e.target.value })}
                    placeholder="IoT, Hardware, Agriculture"
                    className="h-10 text-xs"
                  />
                </div>
              </div>

              {/* Pinned Sticky Footer */}
              <div className="px-6 py-4 bg-slate-50/90 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsStartupModalOpen(false)}
                  className="h-10 text-xs px-5 border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-10 px-6 text-xs shadow-sm hover:shadow"
                >
                  {editingStartup ? "Update Startup" : "Add Startup"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADD / EDIT GALLERY PHOTO MODAL */}
      {/* ========================================================================= */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          <div className="relative w-full max-w-xl max-h-[90vh] sm:max-h-[86vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Pinned Sticky Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100 shrink-0">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                    {editingPhoto ? "Edit Gallery Image" : "Add New Gallery Photo"}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Upload high-res campus media, assign category track & captions
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsGalleryModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Interior Form Body */}
            <form onSubmit={handleSavePhoto} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Photo Title *
                  </label>
                  <Input
                    required
                    value={photoForm.title}
                    onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                    placeholder="e.g. 3D Printing & Fabrication Lab"
                    className="h-10 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Category Track
                    </label>
                    <select
                      value={photoForm.category}
                      onChange={(e) =>
                        setPhotoForm({
                          ...photoForm,
                          category: e.target.value as any,
                          categoryLabel:
                            e.target.value === "facilities"
                              ? "Incubation Facility"
                              : e.target.value === "labs"
                                ? "Hardware Labs"
                                : e.target.value === "team"
                                  ? "Foundation Leadership"
                                  : "Events & Workshops",
                        })
                      }
                      className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                    >
                      <option value="facilities">Facilities</option>
                      <option value="labs">Labs</option>
                      <option value="team">Team / Mentors</option>
                      <option value="events">Events & Workshops</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Display Label
                    </label>
                    <Input
                      value={photoForm.categoryLabel}
                      onChange={(e) => setPhotoForm({ ...photoForm, categoryLabel: e.target.value })}
                      placeholder="e.g. Makerspace"
                      className="h-10 text-xs"
                    />
                  </div>
                </div>

                <MediaUploadZone
                  value={photoForm.image}
                  onChange={(val) => setPhotoForm({ ...photoForm, image: val })}
                  label="Gallery Photograph or Video Asset"
                  helperText="Upload JPG, PNG, WebP image or MP4/WebM video from your device"
                  aspectRatio="aspect-video"
                  required
                />

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Caption / Description
                  </label>
                  <textarea
                    rows={2}
                    value={photoForm.caption}
                    onChange={(e) => setPhotoForm({ ...photoForm, caption: e.target.value })}
                    placeholder="Brief description of the facility or session..."
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    On-Campus Location
                  </label>
                  <Input
                    value={photoForm.location}
                    onChange={(e) => setPhotoForm({ ...photoForm, location: e.target.value })}
                    placeholder="e.g. MAMCET Central Wing, Siruganur"
                    className="h-10 text-xs"
                  />
                </div>
              </div>

              {/* Pinned Sticky Footer */}
              <div className="px-6 py-4 bg-slate-50/90 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="h-10 text-xs px-5 border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-10 px-6 text-xs shadow-sm hover:shadow"
                >
                  {editingPhoto ? "Save Changes" : "Add Image"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ADD / EDIT EVENT MODAL */}
      {/* ========================================================================= */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          <div className="relative w-full max-w-xl max-h-[90vh] sm:max-h-[86vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Pinned Sticky Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                    {editingEvent ? "Edit Workshop / Event" : "Schedule New Event"}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Schedule workshops, bootcamps, and upload promotional flyers
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEventModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Interior Form Body */}
            <form onSubmit={handleSaveEvent} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Event Title *
                  </label>
                  <Input
                    required
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    placeholder="e.g. TANSEED Grant Proposal Bootcamp"
                    className="h-10 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Event Type
                    </label>
                    <select
                      value={eventForm.type}
                      onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
                      className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                    >
                      <option value="Workshop">Workshop</option>
                      <option value="Hackathon">Hackathon</option>
                      <option value="Bootcamp">Bootcamp</option>
                      <option value="Pitch Day">Pitch Day</option>
                      <option value="Masterclass">Masterclass</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Delivery Mode
                    </label>
                    <select
                      value={eventForm.mode}
                      onChange={(e) => setEventForm({ ...eventForm, mode: e.target.value })}
                      className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                    >
                      <option value="In-Person">In-Person</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Virtual">Virtual</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Date *
                    </label>
                    <Input
                      required
                      value={eventForm.date}
                      onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                      placeholder="e.g. Jan 15, 2027"
                      className="h-10 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Time
                    </label>
                    <Input
                      value={eventForm.time}
                      onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                      placeholder="10:00 AM - 04:00 PM IST"
                      className="h-10 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Location / Venue
                  </label>
                  <Input
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    placeholder="Auditorium, MAMCET Campus, Siruganur"
                    className="h-10 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    placeholder="Outline topics covered and target audience..."
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <MediaUploadZone
                  value={eventForm.flyerImage}
                  onChange={(val) => setEventForm({ ...eventForm, flyerImage: val })}
                  label="Event Poster / Video Teaser"
                  helperText="Upload event poster graphic (JPG, PNG) or promotional video clip"
                  aspectRatio="aspect-video"
                />

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={eventForm.registrationOpen}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, registrationOpen: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-red-600 focus:ring-red-600"
                    />
                    <span className="text-xs font-bold text-slate-800">
                      Registration Open
                    </span>
                  </label>
                </div>
              </div>

              {/* Pinned Sticky Footer */}
              <div className="px-6 py-4 bg-slate-50/90 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEventModalOpen(false)}
                  className="h-10 text-xs px-5 border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-10 px-6 text-xs shadow-sm hover:shadow"
                >
                  {editingEvent ? "Save Event" : "Schedule Event"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: INTAKE APPLICATION DOSSIER & EVALUATION MODAL */}
      {/* ========================================================================= */}
      {selectedAppDossier && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Pinned Sticky Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100 shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                    {selectedAppDossier.startupName}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Application Dossier · ID: <span className="font-mono text-slate-700 font-bold">{selectedAppDossier.id}</span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAppDossier(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close dossier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Dossier Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-5 text-xs sm:text-sm">
              {/* Founder & Contact Strip */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 text-[11px] block">Lead Founder:</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedAppDossier.founderName}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">College / Institution:</span>
                  <span className="font-bold text-slate-800">{selectedAppDossier.collegeOrEntity || "MAMCET Siruganur"}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Email:</span>
                  <a href={`mailto:${selectedAppDossier.founderEmail}`} className="text-blue-600 hover:underline font-mono">
                    {selectedAppDossier.founderEmail}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Phone / Hotline:</span>
                  <a href={`tel:${selectedAppDossier.founderPhone}`} className="text-emerald-700 font-mono font-bold">
                    {selectedAppDossier.founderPhone || "Not provided"}
                  </a>
                </div>
              </div>

              {/* Problem Statement */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Problem Statement
                </label>
                <p className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs leading-relaxed">
                  {selectedAppDossier.problemStatement || "No problem statement submitted."}
                </p>
              </div>

              {/* Proposed Solution */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Proposed Technical Solution
                </label>
                <p className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs leading-relaxed">
                  {selectedAppDossier.proposedSolution || "No solution description provided."}
                </p>
              </div>

              {/* Market & Revenue Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[11px] font-bold text-slate-600 uppercase block">Target Market</span>
                  <p className="text-xs text-slate-700">{selectedAppDossier.targetMarket || "General"}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[11px] font-bold text-slate-600 uppercase block">Funding Needed</span>
                  <p className="text-xs text-slate-700">{selectedAppDossier.fundingNeeded || "Not specified"}</p>
                </div>
              </div>

              {/* Pitch Deck Link */}
              {selectedAppDossier.pitchDeckUrl && (
                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-900">Pitch Deck / Presentation:</span>
                  <a
                    href={selectedAppDossier.pitchDeckUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1"
                  >
                    <span>View Document</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Status Decision Controls */}
              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-300 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900 uppercase">
                    Update Screening Pipeline Status:
                  </label>
                  <span className="text-[11px] font-mono text-slate-500">Current: {selectedAppDossier.status}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: "SUBMITTED", label: "Submitted" },
                    { id: "UNDER_REVIEW", label: "Under Review" },
                    { id: "SHORTLISTED_FOR_PITCH", label: "Pitch Shortlist" },
                    { id: "INCUBATED", label: "Accept / Incubate" },
                    { id: "REJECTED", label: "Reject / Archive" },
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => {
                        handleUpdateAppStatus(selectedAppDossier.id, st.id, notifyFounderOnUpdate);
                        setSelectedAppDossier({ ...selectedAppDossier, status: st.id });
                      }}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        selectedAppDossier.status === st.id
                          ? "bg-[#091b34] text-white shadow-sm"
                          : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>

                {/* Email Notification Checkbox */}
                <label className="flex items-center gap-2 pt-1 text-xs text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={notifyFounderOnUpdate}
                    onChange={(e) => setNotifyFounderOnUpdate(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Send automated email notification to founder ({selectedAppDossier.founderEmail}) upon status change</span>
                </label>
              </div>
            </div>

            {/* Pinned Sticky Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end shrink-0">
              <Button
                onClick={() => setSelectedAppDossier(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-10 px-5 rounded-xl text-xs"
              >
                Close Dossier
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
