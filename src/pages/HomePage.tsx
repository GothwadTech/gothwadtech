import React from 'react';
import { ArrowRight, ArrowUpRight, ShieldCheck, Zap, Users, Globe, Building2, GraduationCap, CheckCircle2, Sparkles, Mail, Play, MessageCircle, Video, HardDrive } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { Logo } from '../components/Logo';
import { PortalBar } from '../components/PortalBar';
import { AppShortcuts } from '../components/AppShortcuts';
import { ECOSYSTEM_APPS } from '../data/ecosystem';

export const HomePage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="min-h-[calc(100vh-56px)] bg-white dark:bg-zinc-950">
      <PortalBar />

      {/* ——— Hero ——— */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-gradient-to-b from-[#0494f4]/12 via-[#0494f4]/6 to-transparent rounded-full blur-2xl" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-px bg-gradient-to-r from-transparent via-[#0494f4]/20 to-transparent" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-8">
          <div className="flex flex-col items-center text-center gap-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Official Website • gothwadtech.com</span>
              <span className="hidden sm:inline-flex items-center gap-1 ml-1 px-2 py-0.5 rounded-full bg-[#0494f4] text-white text-[10px] font-bold">AATMANIRBHAR BHARAT</span>
            </div>

            <Logo size="xl" imageSrc="/assets/logo.png" className="justify-center" />

            <div className="max-w-3xl space-y-3">
              <h1 className="text-[28px] sm:text-5xl md:text-[52px] font-black tracking-tight leading-[1.08] text-zinc-900 dark:text-white">
                Everything Gothwad,
                <br />
                <span className="text-[#0494f4]">in one place.</span>
              </h1>
              <p className="text-[13px] sm:text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                {COMPANY_INFO.shortDescription}
                <br className="hidden sm:block" />
                One Gothwad Account unlocks Mail, Drive, Meet, Store, Tube, GrixChat, Indogram, Browser, Education, AI Studio — with public docs and source on GitHub.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1">
              <a
                href="https://accounts.gothwadtech.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white font-bold text-sm shadow-sm transition-colors"
              >
                <span>Enter with Gothwad Account</span> <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => onNavigate('ecosystem')}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-bold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <span>Browse all products</span> <ArrowRight className="w-4 h-4 text-[#0494f4]" />
              </button>
              <a
                href="https://docs.gothwadtech.com"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-100"
              >
                <span>Read Docs</span> <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Quick stats pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full max-w-3xl pt-2">
              {COMPANY_INFO.stats.map((s) => (
                <div key={s.label} className="px-3 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
                  <div className="text-sm font-black text-zinc-900 dark:text-white">{s.value}</div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mt-0.5">{s.label}</div>
                  <div className="text-[10px] text-zinc-500 dark:text-zinc-500">{s.helper}</div>
                </div>
              ))}
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] text-zinc-600 dark:text-zinc-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> Zero-trust & secure
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <Zap className="w-3 h-3 text-[#0494f4]" /> Edge on Cloudflare
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <Users className="w-3 h-3 text-violet-600" /> One Account
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <Globe className="w-3 h-3 text-sky-600" /> Open source on GitHub
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Quick access ——— */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-10">
        <div className="rounded-[20px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50/60 dark:bg-zinc-900/60">
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0494f4]" /> Quick access
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Most used Gothwad products — click any tile to open. Search and filter the full catalog below.</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => onNavigate('products')} className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold cursor-pointer">
                View all products <ArrowUpRight className="w-3 h-3" />
              </button>
              <a href="https://accounts.gothwadtech.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0494f4] text-white text-xs font-bold">
                My Account
              </a>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            {/* Top 8 shortcuts as small tiles — always visible, no filtering here for fast access */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
              {ECOSYSTEM_APPS.filter((a) => ['accounts','mail','drive','meet','tube','grixchat','browser','docs'].includes(a.id)).map((app) => {
                const Icon = app.icon;
                return (
                  <a key={app.id} href={app.href} target="_blank" rel="noreferrer" className="group flex items-center gap-3 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-[#0494f4]/40 hover:bg-white dark:hover:bg-zinc-900 transition-colors">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${app.iconBg} ${app.iconText}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-zinc-900 dark:text-white truncate flex items-center gap-1">{app.name} <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-[#0494f4]" /></div>
                      <div className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">{app.host}.gothwadtech.com</div>
                    </div>
                  </a>
                );
              })}
            </div>
            <AppShortcuts />
          </div>
        </div>
      </section>

      {/* ——— Feature triptych ——— */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="w-10 h-10 rounded-xl bg-[#0494f4]/10 border border-[#0494f4]/20 flex items-center justify-center text-[#0494f4] mb-3">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Built for Bharat</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">School ERP, Restaurant POS, Shop billing & custom enterprise platforms — with sovereign consumer apps (Browser, GrixChat, Indogram) shipped as source.</p>
            <button onClick={() => onNavigate('solutions')} className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#0494f4] hover:underline cursor-pointer">Explore solutions <ArrowRight className="w-3 h-3" /></button>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Documented & open</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">Every product cites its source repo, setup docs and MDX guides. Clone, run locally and contribute — same content powers docs.gothwadtech.com.</p>
            <a href="https://docs.gothwadtech.com" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:underline">Open docs <ArrowUpRight className="w-3 h-3" /></a>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-3">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">From education to AI</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">Education suite (admin/teacher/student/parent), AI Studio, Remote Desktop, Store and more — all reachable from your Gothwad Account.</p>
            <button onClick={() => onNavigate('company')} className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:underline cursor-pointer">Meet the team <ArrowRight className="w-3 h-3" /></button>
          </div>
        </div>
      </section>
    </div>
  );
};
