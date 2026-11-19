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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSiteContent, SiteContent } from "@/context/ContentContext";

export default function AdminPage() {
  const { content, updateSection, refreshContent, loading: contentLoading } = useSiteContent();

  const [activeTab, setActiveTab] = useState<
    "dashboard" | "startups" | "gallery" | "hero" | "events" | "contact" | "applications"
  >("dashboard");

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Applications Pipeline State
  const [applications, setApplications] = useState<any[]>([]);
  const [appsLoading, setAppsLoading] = useState(false);
  const [appSearch, setAppSearch] = useState("");

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

  const handleUpdateAppStatus = (appId: string, newStatus: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
    );
    showToast(`Application status updated to ${newStatus}`);
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
    <div className="pt-28 pb-24 bg-slate-50 min-h-screen">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Header & Fast Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                ADMIN CONSOLE
              </span>
              <span className="text-xs text-slate-500 font-medium">
                MASTeR Incubation Foundation (MIF)
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1 font-display tracking-tight">
              Platform Content & Operations Manager
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 text-slate-700 hover:bg-white text-xs h-10 px-4 gap-2 shadow-xs"
              >
                <Eye className="w-4 h-4 text-slate-500" />
                <span>Preview Site</span>
              </Button>
            </Link>
            <Button
              onClick={refreshContent}
              variant="outline"
              size="sm"
              className="border-slate-300 text-slate-700 hover:bg-white text-xs h-10 px-3 gap-1.5 shadow-xs"
              title="Reload live content"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${contentLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Tab Navigation Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-200 scrollbar-none">
          {[
            { id: "dashboard", label: "Dashboard Overview", icon: Sliders },
            { id: "startups", label: "Startups Directory", icon: Rocket, count: startupsList.length },
            { id: "gallery", label: "Gallery Photos", icon: ImageIcon, count: galleryList.length },
            { id: "hero", label: "Hero Studio", icon: Sparkles },
            { id: "events", label: "News & Events", icon: Calendar, count: eventsList.length },
            { id: "contact", label: "Contact & Leadership", icon: Phone },
            { id: "applications", label: "Intake Applications", icon: Layers, count: applications.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[#0f2c59] text-white shadow-md"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.2 rounded-full font-mono ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {/* ========================================================================= */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                onClick={() => setActiveTab("startups")}
                className="cursor-pointer p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Incubated Startups
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Rocket className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900 font-display">
                  {startupsList.length}
                </div>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1 text-blue-600 font-semibold">
                  <span>Manage ventures & links</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </p>
              </div>

              <div
                onClick={() => setActiveTab("gallery")}
                className="cursor-pointer p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Gallery Photos
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900 font-display">
                  {galleryList.length}
                </div>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1 text-orange-600 font-semibold">
                  <span>Add/delete campus images</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </p>
              </div>

              <div
                onClick={() => setActiveTab("events")}
                className="cursor-pointer p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Workshops & Events
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calendar className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900 font-display">
                  {eventsList.length}
                </div>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1 text-emerald-600 font-semibold">
                  <span>Schedule & publish news</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </p>
              </div>

              <div
                onClick={() => setActiveTab("applications")}
                className="cursor-pointer p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Intake Applications
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Layers className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900 font-display">
                  {applications.length}
                </div>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1 text-purple-600 font-semibold">
                  <span>Review screening pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </p>
              </div>
            </div>

            {/* Quick Actions Strip */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-2 font-display">
                Quick Action Shortcuts
              </h2>
              <p className="text-sm text-slate-600 mb-6 font-normal">
                Quickly add new content to the live MASTeR Incubation website.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  onClick={() => {
                    setActiveTab("startups");
                    handleOpenAddStartup();
                  }}
                  className="bg-[#0f2c59] hover:bg-blue-900 text-white font-bold h-12 rounded-xl text-xs gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Startup</span>
                </Button>

                <Button
                  onClick={() => {
                    setActiveTab("gallery");
                    handleOpenAddPhoto();
                  }}
                  className="bg-[#ea580c] hover:bg-orange-700 text-white font-bold h-12 rounded-xl text-xs gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Gallery Image</span>
                </Button>

                <Button
                  onClick={() => {
                    setActiveTab("events");
                    handleOpenAddEvent();
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl text-xs gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Schedule Event</span>
                </Button>

                <Button
                  onClick={() => setActiveTab("hero")}
                  variant="outline"
                  className="border-slate-300 text-slate-800 hover:bg-slate-50 font-bold h-12 rounded-xl text-xs gap-2"
                >
                  <Sparkles className="w-4 h-4 text-orange-600" />
                  <span>Configure Hero Studio</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: STARTUPS DIRECTORY ("startup adder and links") */}
        {/* ========================================================================= */}
        {activeTab === "startups" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200">
              <div>
                <h2 className="text-2xl font-black text-slate-900 font-display">
                  Startup Portfolio & Venture Adder
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                  Add, update, or remove incubated ventures, website URLs, LinkedIn handles, and founder contacts.
                </p>
              </div>
              <Button
                onClick={handleOpenAddStartup}
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold h-11 px-5 rounded-xl text-xs gap-2 shrink-0 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Startup</span>
              </Button>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <Input
                  value={startupSearch}
                  onChange={(e) => setStartupSearch(e.target.value)}
                  placeholder="Search startup by name, founders, or tags..."
                  className="pl-10 h-11 text-xs sm:text-sm bg-white border-slate-300 rounded-xl"
                />
              </div>
              <select
                value={startupCategoryFilter}
                onChange={(e) => setStartupCategoryFilter(e.target.value)}
                className="h-11 px-4 text-xs font-semibold bg-white border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Categories</option>
                <option value="ELECTRONICS_IOT_SMART">Electronics & IoT</option>
                <option value="RENEWABLE_ENERGY_CLEAN_TECH">Renewable Energy</option>
                <option value="ADVANCED_MANUFACTURING">Advanced Manufacturing</option>
                <option value="SUSTAINABLE_INFRASTRUCTURE">Sustainable Infrastructure</option>
                <option value="AI_DATA_SCIENCE">AI & Data Science</option>
              </select>
            </div>

            {/* Startups Table / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {startupsList
                .filter((st: any) => {
                  const matchSearch =
                    st.name.toLowerCase().includes(startupSearch.toLowerCase()) ||
                    st.founders.toLowerCase().includes(startupSearch.toLowerCase());
                  const matchCat =
                    startupCategoryFilter === "ALL" || st.category === startupCategoryFilter;
                  return matchSearch && matchCat;
                })
                .map((st: any) => (
                  <div
                    key={st.id}
                    className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-blue-400 transition-colors"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <Badge variant="cyan" className="text-[10px] font-bold px-2 py-0.5 mb-2">
                            {st.stage ? st.stage.replace(/_/g, " ") : "INCUBATED"}
                          </Badge>
                          <h3 className="text-xl font-bold text-slate-900 font-display">
                            {st.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenEditStartup(st)}
                            className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Edit Startup"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteStartup(st.id)}
                            className="p-2 rounded-xl text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Startup"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="text-xs text-slate-500 mb-2">
                        <strong className="text-slate-800">Founders:</strong> {st.founders} ·{" "}
                        <span className="font-semibold text-blue-700">{st.cohort}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                        {st.oneLiner}
                      </p>

                      {/* Contact & Social Links Strip */}
                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 mb-4 text-xs">
                        <div className="flex items-center gap-2">
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

                        <div className="flex items-center gap-2">
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

                        {(st.email || st.phone) && (
                          <div className="flex items-center gap-4 pt-1 border-t border-slate-200/60 text-[11px] text-slate-600">
                            {st.email && (
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3 text-orange-600" />
                                {st.email}
                              </span>
                            )}
                            {st.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3 text-emerald-600" />
                                {st.phone}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {st.funding || "Grant Eligible"}
                      </span>
                      <span className="font-mono text-slate-400 text-[11px]">{st.impactMetric}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: GALLERY MANAGER ("gallery image updation deletion") */}
        {/* ========================================================================= */}
        {activeTab === "gallery" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200">
              <div>
                <h2 className="text-2xl font-black text-slate-900 font-display">
                  Campus Photo Gallery Manager
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                  Add new high-resolution photographs, update descriptions, and remove obsolete media.
                </p>
              </div>
              <Button
                onClick={handleOpenAddPhoto}
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold h-11 px-5 rounded-xl text-xs gap-2 shrink-0 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add Gallery Photo</span>
              </Button>
            </div>

            {/* Filter by Category */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {["all", "facilities", "labs", "team", "events"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                    galleryCategoryFilter === cat
                      ? "bg-[#0f2c59] text-white"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryList
                .filter(
                  (p: any) =>
                    galleryCategoryFilter === "all" || p.category === galleryCategoryFilter
                )
                .map((p: any) => (
                  <div
                    key={p.id}
                    className="rounded-3xl bg-white border border-slate-200/90 shadow-xs overflow-hidden flex flex-col justify-between group hover:border-orange-400 transition-all"
                  >
                    <div>
                      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold">
                            {p.categoryLabel || p.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <h4 className="font-bold text-slate-900 text-base mb-1 font-display">
                          {p.title}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                          {p.caption}
                        </p>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-orange-600" />
                          <span>{p.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400">{p.id}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditPhoto(p)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit Photo"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePhoto(p.id)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: HERO STUDIO ("hero section image section") */}
        {/* ========================================================================= */}
        {activeTab === "hero" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* 1. Hero Background Images Studio */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                    Hero Backdrop Images Carousel
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                    Add or remove authentic campus images used in the main hero background transition.
                  </p>
                </div>
              </div>

              {/* Add New Hero Image Bar */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <Input
                  value={newHeroImageUrl}
                  onChange={(e) => setNewHeroImageUrl(e.target.value)}
                  placeholder="Enter image URL or local path (e.g. /images/incubation/image-3.jpeg)..."
                  className="flex-1 h-11 text-xs sm:text-sm bg-white"
                />
                <Button
                  onClick={handleAddHeroImage}
                  className="bg-[#0f2c59] hover:bg-blue-900 text-white font-bold h-11 px-5 rounded-xl text-xs gap-2 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Image</span>
                </Button>
              </div>

              {/* Images Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {heroForm.images.map((img: string, idx: number) => (
                  <div
                    key={idx}
                    className="relative rounded-2xl overflow-hidden border border-slate-200 group bg-slate-100 aspect-video flex flex-col justify-end"
                  >
                    <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleDeleteHeroImage(idx)}
                        className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg"
                        title="Delete Hero Slide"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono">
                      #{idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Rotating Text Phrases Studio */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display mb-1">
                Dynamic Text Rotation Phrases
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 font-normal">
                These phrases rotate seamlessly in the Hero headline with vertical sliding and fading animations.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <Input
                  value={newRotatingPhrase}
                  onChange={(e) => setNewRotatingPhrase(e.target.value)}
                  placeholder="Enter new rotating keyword (e.g. CleanTech Innovations)..."
                  className="flex-1 h-11 text-xs sm:text-sm bg-white"
                />
                <Button
                  onClick={handleAddRotatingPhrase}
                  className="bg-[#ea580c] hover:bg-orange-700 text-white font-bold h-11 px-5 rounded-xl text-xs gap-2 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Phrase</span>
                </Button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {heroForm.rotatingTexts.map((phrase: string, idx: number) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-300/80 text-xs font-bold text-slate-800"
                  >
                    <span>{phrase}</span>
                    <button
                      onClick={() => handleDeleteRotatingPhrase(idx)}
                      className="p-1 rounded-full hover:bg-slate-200 text-slate-500 hover:text-red-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Hero Badge & Tagline Settings */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
              <h2 className="text-xl font-black text-slate-900 font-display">
                Hero Top Badge & Tagline
              </h2>

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
                  className="bg-[#0f2c59] hover:bg-blue-900 text-white font-bold h-11 px-6 rounded-xl text-xs gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Hero Settings</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: NEWS & EVENTS UPDATION ("newses and events updation") */}
        {/* ========================================================================= */}
        {activeTab === "events" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200">
              <div>
                <h2 className="text-2xl font-black text-slate-900 font-display">
                  Workshops, Hackathons & News Events
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                  Publish upcoming incubator events, hackathon dates, and grant masterclasses.
                </p>
              </div>
              <Button
                onClick={handleOpenAddEvent}
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold h-11 px-5 rounded-xl text-xs gap-2 shrink-0 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Schedule New Event</span>
              </Button>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventsList.map((ev: any) => (
                <div
                  key={ev.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-blue-400 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {ev.type}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditEvent(ev)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                          title="Edit Event"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(ev.id)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50"
                          title="Delete Event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 font-display mb-2">{ev.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                      {ev.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-700 pt-3 border-t border-slate-100 mb-4 font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{ev.date}</span>
                      </div>
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

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <span
                      className={`font-semibold ${
                        ev.registrationOpen ? "text-emerald-600" : "text-slate-400"
                      }`}
                    >
                      {ev.registrationOpen ? "● Open for Registrations" : "Closed"}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">{ev.mode}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: CONTACT & LEADERSHIP ("any other contact details") */}
        {/* ========================================================================= */}
        {activeTab === "contact" && (
          <div className="max-w-4xl space-y-6 animate-in fade-in duration-300">
            <div className="p-6 rounded-3xl bg-white border border-slate-200">
              <h2 className="text-2xl font-black text-slate-900 font-display">
                Institutional Contact & Leadership Profiles
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                Update foundation managers, coordinator direct hotlines, campus address, and official social media handles.
              </p>
            </div>

            <form onSubmit={handleSaveContact} className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6">
              {/* Campus Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Official Campus Address
                </label>
                <Input
                  value={contactForm.address}
                  onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                  className="h-11 text-xs sm:text-sm bg-slate-50"
                  required
                />
              </div>

              {/* Incubation Manager */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Incubation Manager Name
                  </label>
                  <Input
                    value={contactForm.managerName}
                    onChange={(e) => setContactForm({ ...contactForm, managerName: e.target.value })}
                    className="h-11 text-xs sm:text-sm bg-slate-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Manager Phone / Direct Hotline
                  </label>
                  <Input
                    value={contactForm.managerPhone}
                    onChange={(e) => setContactForm({ ...contactForm, managerPhone: e.target.value })}
                    className="h-11 text-xs sm:text-sm bg-slate-50"
                    required
                  />
                </div>
              </div>

              {/* Incubation Coordinator */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Incubation Coordinator Name
                  </label>
                  <Input
                    value={contactForm.coordinatorName}
                    onChange={(e) => setContactForm({ ...contactForm, coordinatorName: e.target.value })}
                    className="h-11 text-xs sm:text-sm bg-slate-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Coordinator Direct Contact
                  </label>
                  <Input
                    value={contactForm.coordinatorPhone}
                    onChange={(e) => setContactForm({ ...contactForm, coordinatorPhone: e.target.value })}
                    className="h-11 text-xs sm:text-sm bg-slate-50"
                    required
                  />
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Official Channels & Social Links
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      className="h-11 text-xs bg-slate-50"
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
                      className="h-11 text-xs bg-slate-50"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="bg-[#0f2c59] hover:bg-blue-900 text-white font-bold h-12 px-8 rounded-xl text-xs gap-2 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Contact Details</span>
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: INTAKE APPLICATIONS REVIEW */}
        {/* ========================================================================= */}
        {activeTab === "applications" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900 font-display">
                  Startup Incubation Intake Pipeline
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                  Review student, faculty, and external applications submitted through the /apply portal.
                </p>
              </div>
              <Button
                onClick={fetchApps}
                variant="outline"
                size="sm"
                className="text-xs border-slate-300 text-slate-700 hover:bg-slate-50 gap-2 h-10 px-4"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${appsLoading ? "animate-spin" : ""}`} />
                <span>Refresh Queue</span>
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <Input
                value={appSearch}
                onChange={(e) => setAppSearch(e.target.value)}
                placeholder="Search applicant name, venture title, or category..."
                className="pl-10 h-11 text-xs sm:text-sm bg-white border-slate-300 rounded-xl"
              />
            </div>

            <div className="space-y-4">
              {applications
                .filter((app) => {
                  return (
                    app.startupName?.toLowerCase().includes(appSearch.toLowerCase()) ||
                    app.founderName?.toLowerCase().includes(appSearch.toLowerCase()) ||
                    app.category?.toLowerCase().includes(appSearch.toLowerCase())
                  );
                })
                .map((app) => (
                  <div
                    key={app.id}
                    className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2.5">
                        <h4 className="text-lg font-bold text-slate-900 font-display">
                          {app.startupName}
                        </h4>
                        <Badge
                          variant={
                            app.status === "INCUBATED"
                              ? "emerald"
                              : app.status === "SHORTLISTED_FOR_PITCH"
                              ? "cyan"
                              : "secondary"
                          }
                          className="text-[10px] font-bold"
                        >
                          {app.status}
                        </Badge>
                      </div>

                      <div className="text-xs text-slate-600">
                        <strong className="text-slate-900">Founder:</strong> {app.founderName} (
                        {app.founderEmail} · {app.founderPhone})
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed font-normal">
                        {app.problemStatement || app.solutionDescription || "Application review in progress."}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={app.status}
                        onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                        className="h-10 px-3 text-xs font-bold rounded-xl border border-slate-300 bg-slate-50 text-slate-800"
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
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: ADD / EDIT STARTUP MODAL */}
      {/* ========================================================================= */}
      {isStartupModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 font-display">
                {editingStartup ? "Edit Startup Profile" : "Add New Incubated Startup"}
              </h3>
              <button
                onClick={() => setIsStartupModalOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStartup} className="space-y-4 text-xs sm:text-sm">
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

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsStartupModalOpen(false)}
                  className="h-10 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold h-10 px-6 text-xs"
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
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 my-8">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 font-display">
                {editingPhoto ? "Edit Gallery Image" : "Add New Gallery Photo"}
              </h3>
              <button
                onClick={() => setIsGalleryModalOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePhoto} className="space-y-4 text-xs sm:text-sm">
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

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Image Path / URL *
                </label>
                <Input
                  required
                  value={photoForm.image}
                  onChange={(e) => setPhotoForm({ ...photoForm, image: e.target.value })}
                  placeholder="e.g. /images/incubation/img-54.jpeg"
                  className="h-10 text-xs font-mono"
                />
                {photoForm.image && (
                  <div className="mt-2 rounded-xl overflow-hidden aspect-[16/9] border border-slate-200 bg-slate-100">
                    <img src={photoForm.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

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

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="h-10 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold h-10 px-6 text-xs"
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
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 my-8">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 font-display">
                {editingEvent ? "Edit Workshop / Event" : "Schedule New Event"}
              </h3>
              <button
                onClick={() => setIsEventModalOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4 text-xs sm:text-sm">
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

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={eventForm.registrationOpen}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, registrationOpen: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    Registration Open
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEventModalOpen(false)}
                  className="h-10 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold h-10 px-6 text-xs"
                >
                  {editingEvent ? "Save Event" : "Schedule Event"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
