"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import initialContent from "@/data/site-content.json";

export type SiteContent = typeof initialContent;

interface ContentContextType {
  content: SiteContent;
  updateSection: (section: keyof SiteContent, data: any) => Promise<boolean>;
  refreshContent: () => Promise<void>;
  loading: boolean;
}

const ContentContext = createContext<ContentContextType>({
  content: initialContent,
  updateSection: async () => false,
  refreshContent: async () => {},
  loading: false,
});

const STORAGE_KEY = "mif_site_content_v2";

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [loading, setLoading] = useState(false);

  // Load from localStorage on client mount as instant cache
  useEffect(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed === "object") {
          setContent((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/content");
      const json = await res.json();
      if (json.success && json.data) {
        setContent(json.data);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
        } catch (e) {}
      }
    } catch (err) {
      console.warn("Failed to fetch dynamic content, using bundled fallback:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();

    // Listen for cross-tab or cross-component updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setContent(JSON.parse(e.newValue));
        } catch (err) {}
      }
    };

    const handleCustomChange = (e: any) => {
      if (e.detail) {
        setContent(e.detail);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("mif_content_changed", handleCustomChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("mif_content_changed", handleCustomChange);
    };
  }, []);

  const updateSection = async (section: keyof SiteContent, data: any): Promise<boolean> => {
    // 1. Optimistically update local state immediately
    const updated = {
      ...content,
      [section]: data,
    };
    setContent(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("mif_content_changed", { detail: updated }));
    } catch (e) {}

    // 2. Persist to API
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, data }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setContent(json.data);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
        } catch (e) {}
        return true;
      }
      return true; // Return true as local state & localStorage are already updated
    } catch (err) {
      console.error("Failed to update section on server, kept in local storage:", err);
      return true;
    }
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateSection,
        refreshContent: fetchContent,
        loading,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(ContentContext);
}
