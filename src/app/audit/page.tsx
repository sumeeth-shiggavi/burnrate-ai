"use client";
export const dynamic = "force-dynamic";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { Zap, Building2, Cpu, BarChart } from "lucide-react";

function AuditWizardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentStep = parseInt(searchParams.get("step") || "1", 10);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ companyName: "", companySize: "1-10", industry: "", tools: [] as any[] });

  const updateStep = (nextStep: number) => router.push(`/audit?step=${nextStep}`);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-slate-900 pb-6">
          <div className="flex items-center gap-2 font-bold text-xl text-white">
            <Zap className="h-5 w-5 text-blue-500 fill-blue-500" />
            <span>BurnRate <span className="text-blue-500">AI</span></span>
          </div>
          <div className="text-xs font-mono text-slate-500">STEP {currentStep} OF 3</div>
        </div>

        {currentStep === 1 && (
          <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-6 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-white"><Building2 className="h-5 w-5 text-blue-500" />Company Configuration</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Company Name" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white" />
              <input type="text" placeholder="Industry" value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white" />
              <button disabled={!formData.companyName || !formData.industry} onClick={() => updateStep(2)} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold">Continue</button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-6 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-white"><Cpu className="h-5 w-5 text-blue-500" />Select Stack Footprint</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[{ id: "openai", name: "OpenAI ChatGPT" }, { id: "claude", name: "Anthropic Claude" }].map((tool) => {
                const isSelected = formData.tools.some(t => t.toolId === tool.id);
                return (
                  <div key={tool.id} onClick={() => {
                    const exists = formData.tools.find(t => t.toolId === tool.id);
                    const updated = exists ? formData.tools.filter(t => t.toolId !== tool.id) : [...formData.tools, { toolId: tool.id, currentPlan: "team", seats: 2, monthlySpend: 60 }];
                    setFormData({ ...formData, tools: updated });
                  }} className={`p-4 rounded-xl border cursor-pointer ${isSelected ? "border-blue-500 bg-blue-500/10" : "border-slate-800"}`}>{tool.name}</div>
                );
              })}
            </div>
            <div className="flex gap-4"><button onClick={() => updateStep(1)} className="w-full border border-slate-800 text-slate-300 py-2.5 rounded-lg">Back</button>
            <button disabled={formData.tools.length === 0} onClick={() => updateStep(3)} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold">Next</button></div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-6 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-white"><BarChart className="h-5 w-5 text-blue-500" />Refine Usage</h2>
            <div className="space-y-4 max-h-[380px] overflow-y-auto">
              {formData.tools.map((tool, idx) => (
                <div key={tool.toolId} className="p-4 rounded-xl border border-slate-900 bg-slate-950 space-y-4">
                  <p className="font-bold text-xs text-blue-400 uppercase">{tool.toolId} Setup</p>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" min="1" value={tool.seats} onChange={(e) => { const updated = [...formData.tools]; updated[idx].seats = parseInt(e.target.value, 10) || 1; setFormData({ ...formData, tools: updated }); }} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white text-sm" />
                    <input type="number" min="0" value={tool.monthlySpend} onChange={(e) => { const updated = [...formData.tools]; updated[idx].monthlySpend = parseFloat(e.target.value) || 0; setFormData({ ...formData, tools: updated }); }} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white text-sm" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <button disabled={isSubmitting} onClick={() => updateStep(2)} className="w-full border border-slate-800 text-slate-300 py-2.5 rounded-lg">Back</button>
              <button disabled={isSubmitting} onClick={async () => {
                try {
                  setIsSubmitting(true);
                  const response = await fetch("/api/audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
                  const outcome = await response.json();
                  if (!response.ok) throw new Error(outcome.error || "Submission failed");
                  router.push(`/audit/results/${outcome.reportId}`);
                } catch (err: any) { alert(`Error: ${err.message}`); } finally { setIsSubmitting(false); }
              }} className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-lg">{isSubmitting ? "Processing..." : "Generate Audit Report"}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AuditWizardPage() {
  return <Suspense fallback={<div className="text-white text-center py-20">Loading...</div>}><AuditWizardContent /></Suspense>;
}