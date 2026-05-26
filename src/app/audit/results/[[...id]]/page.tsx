import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Zap, TrendingDown, Calendar, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultsPageProps { params: Promise<{ id?: string[] }>; }
export const dynamic = "force-dynamic";

export default async function AuditResultsPage({ params }: ResultsPageProps) {
  const resolvedParams = await params;
  const reportId = resolvedParams.id?.[0];
  if (!reportId) return notFound();

  const { data: audit, error } = await supabase.from("audits").select("*").eq("id", reportId).single();
  if (error || !audit) return <div className="text-white text-center py-20 font-mono text-sm">Processing calculation records... Refresh page to render.</div>;

  const fmt = (num: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-slate-900 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-bold text-xl text-white"><Zap className="h-5 w-5 text-blue-500 fill-blue-500" /><span>BurnRate <span className="text-blue-500">AI</span></span></div>
            <p className="text-xs font-mono text-slate-500">ID: {audit.id}</p>
          </div>
          <Link href="/"><Button variant="outline" size="sm" className="border-slate-800 text-slate-300 hover:bg-slate-900"><ArrowLeft className="mr-2 h-4 w-4" /> Home</Button></Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/40 border border-slate-900 p-6 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Company Inspected</p>
            <p className="text-2xl font-extrabold text-white mt-2 truncate">{audit.company_name}</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-900 p-6 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Optimized Monthly Spend</p>
            <p className="text-3xl font-black text-white mt-2">{fmt(audit.total_monthly_optimized_spend)}</p>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-900/40 p-6 rounded-xl">
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Annual Runway Secured</p>
            <p className="text-3xl font-black text-emerald-400 mt-2">{fmt(audit.calculated_annual_savings)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}