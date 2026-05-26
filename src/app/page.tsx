import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500 selection:text-white">
      <header className="px-6 h-16 flex items-center border-b border-slate-900 justify-between max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
          <Zap className="h-5 w-5 text-blue-500 fill-blue-500" />
          <span>BurnRate <span className="text-blue-500">AI</span></span>
        </div>
        <nav className="flex gap-6 text-sm font-medium text-slate-400">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
        </nav>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 flex flex-col justify-center items-center py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-medium text-blue-400 mb-6">
          <span>Stop wasting capital on ghost seats</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-3xl mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
          Audit Your Startup’s AI Tooling Spend Instantly.
        </h1>
        
        <p className="text-base sm:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Uncover hidden pricing leaks, over-allocated developer licenses, and sub-optimal enterprise tiers. Get a deterministic savings report in 60 seconds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
          <Link href="/audit" passHref className="w-full">
            <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-600/20 group">
              Start Free AI Audit 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-24 text-left">
          <div className="p-6 rounded-xl border border-slate-900 bg-slate-900/40 backdrop-blur-sm">
            <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Deterministic Calculations</h3>
            <p className="text-sm text-slate-400 leading-relaxed">No AI guesswork. Our engine matches your exact usage numbers against actual live vendor pricing models.</p>
          </div>

          <div className="p-6 rounded-xl border border-slate-900 bg-slate-900/40 backdrop-blur-sm">
            <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Enterprise Privacy</h3>
            <p className="text-sm text-slate-400 leading-relaxed">We require zero production credentials or read-access keys to evaluate your configurations. Safe and secure.</p>
          </div>

          <div className="p-6 rounded-xl border border-slate-900 bg-slate-900/40 backdrop-blur-sm">
            <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 mb-4">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Actionable Summary</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Get an instant, customized executive breakdown outlining how to reduce costs without impacting team velocity.</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-900 py-6 px-6 text-center text-xs text-slate-500 max-w-7xl w-full mx-auto">
        <p>&copy; {new Date().getFullYear()} BurnRate AI. Ready for production launch.</p>
      </footer>
    </div>
  );
}