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

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [loading, setLoading] = useState(false);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/content");
      const json = await res.json();
      if (json.success && json.data) {
        setContent(json.data);
      }
    } catch (err) {
      console.warn("Failed to fetch dynamic content, using bundled fallback:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const updateSection = async (section: keyof SiteContent, data: any): Promise<boolean> => {
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, data }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setContent(json.data);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to update section:", err);
      return false;
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
