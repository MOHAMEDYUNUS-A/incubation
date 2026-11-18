"use client";

import React, { useState } from "react";
import { Sparkles, Brain, Gauge, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RevealLeft, RevealRight, ZoomIn, XYZCard } from "@/components/animations/LightAnimations";

export default function AIHub({ onOpenChat }: { onOpenChat?: () => void }) {
  const [activeTab, setActiveTab] = useState<"analyzer" | "readiness" | "pitch">("analyzer");

  // Idea Analyzer State
  const [title, setTitle] = useState("");
  const [problem, setProblem] = useState("");
  const [category, setCategory] = useState("AI_DATA_SCIENCE");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleRunAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);
    setAnalysisResult(null);

    try {
      const res = await fetch("/api/ai/evaluate-idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title || "Smart Agriculture Node",
          category,
          problem: problem || "Excessive water consumption in paddy farming due to lack of real-time soil moisture sensors.",
          solution: "Deploying solar-powered LoRa telemetry nodes across delta irrigation channels.",
          targetUser: "Delta agricultural farmers and irrigation cooperatives",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAnalysisResult(data.data);
      }
    } catch {
      // Fallback
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <section id="ai-hub" className="py-20 sm:py-24 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <RevealLeft>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
              MASTeR AI Incubation Assistant
            </h2>
            <p className="text-base text-slate-600 mt-3 max-w-2xl leading-relaxed">
              Algorithmic diagnostic tools for early-stage founders to test assumptions, benchmark technology readiness, and structure grant applications.
            </p>
          </RevealLeft>

          {onOpenChat && (
            <RevealRight>
              <Button
                onClick={onOpenChat}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2 shadow-xs"
              >
                <Brain className="w-4 h-4" />
                <span>Launch 24/7 AI Copilot</span>
              </Button>
            </RevealRight>
          )}
        </div>

        {/* Clean Light Interactive Feature Tabs */}
        <div className="flex gap-2 border-b border-slate-200 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab("analyzer")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === "analyzer"
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>Startup Idea Analyzer</span>
          </button>
          <button
            onClick={() => setActiveTab("readiness")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === "readiness"
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>Incubation Readiness Scorecard</span>
          </button>
          <button
            onClick={() => setActiveTab("pitch")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === "pitch"
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Pitch Structure Assistant</span>
          </button>
        </div>

        {/* Tab 1: Startup Idea Analyzer */}
        {activeTab === "analyzer" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Evaluate Your Technical Concept
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Receive instant algorithmic feedback on problem urgency, lab requirements, and potential StartupTN funding paths.
              </p>

              <form onSubmit={handleRunAnalysis} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Venture / Solution Name *
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. OptiGrid Solar Telemetry"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Primary Focus Track *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 shadow-xs"
                  >
                    <option value="AI_DATA_SCIENCE">Artificial Intelligence & Data Science</option>
                    <option value="ELECTRONICS_IOT_SMART">Electronics, IoT & Smart Systems</option>
                    <option value="RENEWABLE_ENERGY_CLEAN_TECH">Renewable Energy & Clean Tech</option>
                    <option value="ADVANCED_MANUFACTURING">Advanced Manufacturing</option>
                    <option value="SUSTAINABLE_INFRASTRUCTURE">Sustainable Infrastructure</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Core Problem Statement *
                  </label>
                  <Textarea
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="Describe the real-world friction or engineering challenge..."
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={analyzing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  {analyzing ? "Analyzing Concept..." : "Run Instant AI Diagnostic"}
                </Button>
              </form>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm min-h-[400px]">
              {analysisResult ? (
                <div className="space-y-5 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{analysisResult.title}</h4>
                      <span className="text-xs font-semibold text-blue-600">{analysisResult.category}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-extrabold text-emerald-600">
                        {analysisResult.overallScore}/100
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">
                        Feasibility Index
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-xs font-bold text-blue-700 mb-1">Recommended MAMCET Lab</div>
                      <div className="text-xs text-slate-800 font-medium">
                        {analysisResult.technologyFeasibility.recommendedMAMCETLab}
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-xs font-bold text-cyan-700 mb-1">Recommended Pathway</div>
                      <div className="text-xs text-slate-800 font-medium">
                        {analysisResult.recommendedMIFPath.recommendedStage}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-700 uppercase">Suggested Immediate Action Items:</div>
                    <ul className="space-y-1.5">
                      {analysisResult.recommendedMIFPath.actionItems.map((act: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800">
                    {analysisResult.disclaimer}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center text-slate-400 space-y-3">
                  <Brain className="w-12 h-12 text-slate-300" />
                  <div className="text-sm text-slate-600 font-medium">No Analysis Generated Yet</div>
                  <p className="text-xs text-slate-500 max-w-sm">
                    Enter your startup details on the left and click &ldquo;Run Instant AI Diagnostic&rdquo; to benchmark your concept.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Incubation Readiness Scorecard */}
        {activeTab === "readiness" && (
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-3xl mx-auto space-y-6">
            <h3 className="text-xl font-bold text-slate-900 text-center font-display">
              Incubation Readiness Self-Audit
            </h3>
            <p className="text-xs text-slate-600 text-center max-w-lg mx-auto">
              Answer 4 strategic questions to find out whether your project qualifies for Pre-Incubation, Full Incubation, or Grant Seed Acceleration.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-blue-700">1. Prototype Status</span>
                <p className="text-xs text-slate-600 mt-1">
                  Benchtop PoC or breadboard prototype completed with measurable output.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-cyan-700">2. Customer Interviews</span>
                <p className="text-xs text-slate-600 mt-1">
                  At least 15 verified interviews conducted with prospective end-users.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-emerald-700">3. Interdisciplinary Team</span>
                <p className="text-xs text-slate-600 mt-1">
                  At least 2 dedicated co-founders with complementary technical and execution roles.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-amber-700">4. IPR Awareness</span>
                <p className="text-xs text-slate-600 mt-1">
                  Preliminary prior-art patent search performed with MIF IPR Cell.
                </p>
              </div>
            </div>

            <div className="text-center pt-2">
              <Button
                onClick={onOpenChat}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Run Interactive Audit with AI Copilot
              </Button>
            </div>
          </div>
        )}

        {/* Tab 3: Pitch Structure Assistant */}
        {activeTab === "pitch" && (
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">
              MIF Standard 10-Slide Investor & Grant Pitch Deck
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              The exact format required for MIF Pre-Incubation screening and TANSEED state grant submissions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { n: "01", t: "Problem Statement", d: "Quantified pain point in Indian industry/society." },
                { n: "02", t: "Proposed Innovation", d: "Technical solution & proprietary engineering edge." },
                { n: "03", t: "Market Size (TAM/SAM)", d: "Market opportunity in Tamil Nadu & national scale." },
                { n: "04", t: "Prototype Benchmark", d: "Photos and lab test performance metrics." },
                { n: "05", t: "Business Model", d: "Unit economics, pricing, and revenue flow." },
                { n: "06", t: "Competitive Moat", d: "Why incumbents or alternatives cannot replicate easily." },
                { n: "07", t: "Traction & Pilots", d: "Letters of Intent (LOI) or field trial numbers." },
                { n: "08", t: "Founding Team", d: "Student/faculty roles and advisory backing." },
                { n: "09", t: "MIF Support Requested", d: "Lab usage, 3D printing hours, and grant needs." },
                { n: "10", t: "18-Month Milestones", d: "Timeline to first commercial revenue." },
              ].map((s) => (
                <div key={s.n} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex gap-3">
                  <span className="font-mono font-bold text-blue-600">{s.n}</span>
                  <div>
                    <strong className="text-slate-900 block">{s.t}</strong>
                    <span className="text-slate-500 text-[11px]">{s.d}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
