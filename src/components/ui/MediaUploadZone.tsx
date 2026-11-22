"use client";

import React, { useState, useRef, useCallback } from "react";
import { UploadCloud, Image as ImageIcon, Video, X, Check, Link as LinkIcon, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MediaUploadZoneProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  accept?: string;
  helperText?: string;
  aspectRatio?: string;
  required?: boolean;
}

export default function MediaUploadZone({
  value,
  onChange,
  label = "Upload Image or Video",
  accept = "image/*,video/*",
  helperText = "Supports PNG, JPG, WebP, MP4, WebM (up to 25MB)",
  aspectRatio = "aspect-[16/10]",
  required = false,
}: MediaUploadZoneProps) {
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Detect whether the current value is a video
  const isVideo =
    value?.startsWith("data:video/") ||
    value?.endsWith(".mp4") ||
    value?.endsWith(".webm") ||
    value?.endsWith(".ogg") ||
    value?.includes("/videos/");

  const processFile = useCallback(
    (file: File) => {
      if (!file) return;

      // File size formatting
      const sizeKb = file.size / 1024;
      const sizeStr = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${Math.round(sizeKb)} KB`;
      setFileName(file.name);
      setFileSize(sizeStr);

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          onChange(result);
        }
      };
      reader.readAsDataURL(file);
    },
    [onChange]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleClear = () => {
    onChange("");
    setFileName("");
    setFileSize("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {/* Label and Source Mode Toggle */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
              mode === "upload"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <UploadCloud className="w-3 h-3 text-[#ea580c]" />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
              mode === "url"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <LinkIcon className="w-3 h-3 text-blue-600" />
            <span>Path / URL</span>
          </button>
        </div>
      </div>

      {/* Hidden Native File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Mode A: Drag & Drop Upload Zone */}
      {mode === "upload" && (
        <>
          {value ? (
            /* Media Preview Card with Controls */
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-900 group shadow-sm">
              <div className={`w-full ${aspectRatio} flex items-center justify-center bg-slate-950 overflow-hidden`}>
                {isVideo ? (
                  <video
                    src={value}
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={value}
                    alt="Media preview"
                    className="w-full h-full object-contain bg-slate-900/40"
                  />
                )}
              </div>

              {/* Media Info Overlay */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                  {isVideo ? <Video className="w-3 h-3 text-cyan-400" /> : <ImageIcon className="w-3 h-3 text-orange-400" />}
                  <span>{isVideo ? "Video File" : "Image File"}</span>
                </span>
                {fileSize && (
                  <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-mono">
                    {fileSize}
                  </span>
                )}
              </div>

              {/* Actions Toolbar */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 rounded-xl bg-white/90 hover:bg-white text-slate-800 text-xs font-bold shadow-md hover:shadow-lg transition-all"
                  title="Replace file"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-md transition-colors"
                  title="Remove file"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {fileName && (
                <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-black/80 to-transparent text-white text-[11px] font-mono truncate px-3">
                  {fileName}
                </div>
              )}
            </div>
          ) : (
            /* Empty Drag-and-Drop Dropzone */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 ${
                isDragging
                  ? "border-[#ea580c] bg-orange-50/80 scale-[0.99] ring-4 ring-orange-500/10"
                  : "border-slate-300 hover:border-blue-500 hover:bg-blue-50/40 bg-slate-50/70"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform ${
                  isDragging ? "bg-orange-600 text-white scale-110" : "bg-white text-slate-600 border border-slate-200 shadow-xs"
                }`}
              >
                <UploadCloud className="w-6 h-6" />
              </div>

              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  <span className="text-[#ea580c] hover:underline">Click to upload</span> or drag & drop
                </p>
                <p className="text-[11px] text-slate-500 mt-1 font-normal">
                  {helperText}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1 text-[10px] font-bold text-slate-400">
                <span className="flex items-center gap-1">
                  <ImageIcon className="w-3 h-3 text-orange-500" /> Images (JPG, PNG, WebP)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Video className="w-3 h-3 text-blue-600" /> Videos (MP4, WebM)
                </span>
              </div>
            </div>
          )}
        </>
      )}

      {/* Mode B: Manual URL / Relative Path Input */}
      {mode === "url" && (
        <div className="space-y-2">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g. /images/incubation/img-54.jpeg or https://..."
            className="h-10 text-xs font-mono bg-white"
          />
          {value && (
            <div className={`mt-2 rounded-xl overflow-hidden ${aspectRatio} border border-slate-200 bg-slate-100 flex items-center justify-center relative`}>
              {isVideo ? (
                <video src={value} controls playsInline className="w-full h-full object-cover" />
              ) : (
                <img src={value} alt="Preview" className="w-full h-full object-cover" />
              )}
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-2 right-2 p-1 rounded-full bg-slate-900/70 text-white hover:bg-red-600 transition-colors"
                title="Clear"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          <p className="text-[10px] text-slate-400">
            Tip: You can paste a public URL or local file path from <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">/public/images/</code>.
          </p>
        </div>
      )}
    </div>
  );
}
