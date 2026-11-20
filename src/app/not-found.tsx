import React from "react";
import Link from "next/link";
import { Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-6 shadow-xs">
        <Sparkles className="w-8 h-8" />
      </div>
      <span className="text-xs font-mono font-bold text-[#ea580c] uppercase tracking-widest block mb-2">
        404 · PAGE NOT FOUND
      </span>
      <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-display mb-4">
        Page Not Found
      </h1>
      <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto mb-8 leading-relaxed">
        The page you are looking for does not exist or has been moved within the MASTeR Incubation Foundation portal.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/">
          <Button className="bg-[#0f2c59] hover:bg-[#0a182e] text-white font-bold h-11 px-6 rounded-xl gap-2">
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
