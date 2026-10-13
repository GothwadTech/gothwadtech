import React, { useState } from 'react';
import { Compass, Cpu, Zap, CheckCircle2, Sparkles, Shield, Clock, Database, Smartphone, Globe, Terminal } from 'lucide-react';

interface TechRecommendation {
  archetype: string;
  recommendedFrontend: string[];
  recommendedBackend: string[];
  recommendedDatabase: string[];
  recommendedInfra: string[];
  estimatedTimeline: string;
  approxBudgetInr: string;
  rationale: string;
  sovereignAdvantages: string[];
}

export const TechAdvisorSection: React.FC<{ onOpenOrderModal: () => void }> = ({ onOpenOrderModal }) => {
  const [projectCategory, setProjectCategory] = useState<'web' | 'mobile' | 'enterprise' | 'browser' | 'ai'>('web');
  const [userScale, setUserScale] = useState<'mvp' | 'growth' | 'enterprise'>('growth');
  const [performancePriority, setPerformancePriority] = useState<'latency' | 'security' | 'rapid_launch'>('latency');

  const getRecommendation = (): TechRecommendation => {
    if (projectCategory === 'browser') {
      return {
        archetype: 'Deep-Tech Native Microkernel Browser System',
        recommendedFrontend: ['Chromium / Blink C++ Subsystem', 'Rust Micro-Renderer', 'Tailwind Browser Shell'],
        recommendedBackend: ['Native C++20 Toolchain', 'Rust Socket Pipeline', 'Encrypted Cache Allocator'],
        recommendedDatabase: ['SQLite Sovereign VFS', 'Encrypted LevelDB Key-Value'],
        recommendedInfra: ['Custom Bare-Metal CDN', 'Self-Hosted DNS Resolver Nodes'],
        estimatedTimeline: '4-8 Weeks',
        approxBudgetInr: '₹1,50,000 - ₹5,00,000+',
        rationale: 'Engineered for <12MB footprint, zero RAM leak, 16-thread download accelerator, and maximum user privacy.',
        sovereignAdvantages: [
          'No dependency on foreign closed-source telemetry',
          '95% lower RAM usage compared to standard Chrome',
          'Native ad-blocking and tracker shredder at binary level',
        ],
      };
    }

    if (projectCategory === 'mobile') {
      return {
        archetype: 'Native & Cross-Platform Sovereign Mobile App',
        recommendedFrontend: ['React Native / Flutter High-Speed Core', 'Tailwind React Native Styling', 'Native Kotlin / Swift Bridges'],
        recommendedBackend: ['Node.js / Express or Go Microservices', 'JWT + Biometric Hardware Auth'],
        recommendedDatabase: ['PostgreSQL with Supabase / Cloud SQL', 'Redis High-Speed Caching'],
        recommendedInfra: ['Cloud Run / Container Engine', 'Edge Cloudflare CDN'],
        estimatedTimeline: '2-5 Weeks',
        approxBudgetInr: '₹40,000 - ₹1,80,000',
        rationale: 'Instant 60-120fps fluid scrolling, offline sync, sub-second API response time, and verified Play Store compliance.',
        sovereignAdvantages: [
          'Full offline-first database replication',
          'Hardware-accelerated rendering on all Android/iOS hardware',
          'Clean modular codebase with 100% intellectual property ownership',
        ],
      };
    }

    if (projectCategory === 'enterprise' || projectCategory === 'ai') {
      return {
        archetype: 'Mission-Critical Enterprise System & AI Automation Engine',
        recommendedFrontend: ['Next.js 15 / React 18+ Enterprise Architecture', 'Tailwind CSS Modern Design System', 'Lucide Vector System'],
        recommendedBackend: ['Go / Node.js Distributed Microservices', 'Gemini & Local LLM AI Pipelines', 'gRPC High-Throughput Bus'],
        recommendedDatabase: ['PostgreSQL / TimescaleDB', 'Redis Cluster Cache', 'Elasticsearch Vector Store'],
        recommendedInfra: ['Kubernetes / Multi-Region Cloud Containers', 'Zero-Trust SSL & Automated Backups'],
        estimatedTimeline: '4-10 Weeks',
        approxBudgetInr: '₹80,000 - ₹3,50,000',
        rationale: 'Built to handle 500,000+ daily requests, automated workflows, custom AI document analysis, and enterprise SSO.',
        sovereignAdvantages: [
          'Zero vendor lock-in; hostable on Indian data centers',
          'Role-based access control & SOC2 compliant security blueprints',
          'Automated data backup routines with zero data loss guarantee',
        ],
      };
    }

    // Default Web Platform
    return {
      archetype: 'Ultra-Fast Modern Web Application & SaaS Portal',
      recommendedFrontend: ['React 18+ with Vite & TypeScript', 'Tailwind CSS Utility Styling', 'Motion Micro-Interactions'],
      recommendedBackend: ['Express.js / Fastify Sub-second API', 'Secure REST & Webhook Gateway'],
      recommendedDatabase: ['PostgreSQL / Supabase Relational Schema', 'Redis Key-Value Cache'],
      recommendedInfra: ['Cloud Run Sandboxed Containers', 'Nginx High-Speed Reverse Proxy'],
      estimatedTimeline: '1-3 Weeks',
      approxBudgetInr: '₹25,000 - ₹95,000',
      rationale: 'Guaranteed 98+ Google Lighthouse performance score, instantaneous page switching, and SEO-optimized server tags.',
      sovereignAdvantages: [
        'Lightweight bundle (<150KB core JS payload)',
        'Built-in responsive design for 100% mobile and desktop devices',
        'Direct WhatsApp & Payment Gateway automated checkout ready',
      ],
    };
  };

  const rec = getRecommendation();

  return (
    <section id="advisor" className="py-20 border-t border-zinc-200 dark:border-zinc-800 scroll-mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0494f4]/10 border border-[#0494f4]/30 text-[#0494f4] text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Architecture & Stack Intelligence</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Instant Tech Stack <span className="text-[#0494f4]">Advisor</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
            Tell us about your project vision and scale. Our engineering system will recommend the exact optimal architecture, timeline, and sovereign stack.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-5 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#0494f4]" />
              <span>Configure System Parameters</span>
            </h3>

            {/* 1. Project Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                1. Project Archetype
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'web', label: 'Web Platform', icon: Globe },
                  { id: 'mobile', label: 'Mobile App', icon: Smartphone },
                  { id: 'enterprise', label: 'Enterprise SaaS', icon: Database },
                  { id: 'browser', label: 'Browser Engine', icon: Cpu },
                  { id: 'ai', label: 'AI & Automations', icon: Zap },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = projectCategory === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setProjectCategory(item.id as any)}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0494f4] text-white border-[#0494f4] shadow-xs'
                          : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-[#0494f4]/40'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Target Scale */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                2. Target Scale & Traffic
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'mvp', label: 'MVP Stage', helper: '<10k Users' },
                  { id: 'growth', label: 'Growth Scale', helper: '100k Users' },
                  { id: 'enterprise', label: 'High Scale', helper: '1M+ Concurrency' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setUserScale(item.id as any)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      userScale === item.id
                        ? 'bg-[#0494f4]/15 border-[#0494f4] text-[#0494f4]'
                        : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[10px] opacity-75">{item.helper}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Primary Priority */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                3. Key Engineering Priority
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'latency', label: 'Zero Latency' },
                  { id: 'security', label: 'Sovereign NDA' },
                  { id: 'rapid_launch', label: 'Fastest Launch' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPerformancePriority(item.id as any)}
                    className={`p-2 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                      performancePriority === item.id
                        ? 'bg-[#0494f4]/15 border-[#0494f4] text-[#0494f4]'
                        : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Configurator CTA */}
            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800">
              <button
                onClick={onOpenOrderModal}
                className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-[#0494f4] dark:hover:bg-[#0077cd] dark:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>Configure This Stack in Order Form</span>
              </button>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0494f4]/10 text-[#0494f4] text-[11px] font-extrabold uppercase tracking-wider mb-2">
                Optimal Architecture Blueprint
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                {rec.archetype}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-1">
                {rec.rationale}
              </p>
            </div>

            {/* Stack Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                <div className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#0494f4]" />
                  <span>Frontend / Client Core</span>
                </div>
                <div className="space-y-1 text-zinc-600 dark:text-zinc-400 text-[11px]">
                  {rec.recommendedFrontend.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0494f4]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                <div className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#0494f4]" />
                  <span>Backend & Microservices</span>
                </div>
                <div className="space-y-1 text-zinc-600 dark:text-zinc-400 text-[11px]">
                  {rec.recommendedBackend.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0494f4]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                <div className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-[#0494f4]" />
                  <span>Database & Caching Layer</span>
                </div>
                <div className="space-y-1 text-zinc-600 dark:text-zinc-400 text-[11px]">
                  {rec.recommendedDatabase.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0494f4]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                <div className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#0494f4]" />
                  <span>Cloud & Infrastructure</span>
                </div>
                <div className="space-y-1 text-zinc-600 dark:text-zinc-400 text-[11px]">
                  {rec.recommendedInfra.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0494f4]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Estimates & Timelines */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-[#0494f4]/5 border border-[#0494f4]/20">
              <div>
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#0494f4]" />
                  <span>Sprint Delivery Timeline</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white font-mono mt-0.5">
                  {rec.estimatedTimeline}
                </div>
              </div>

              <div>
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Estimated Budget Range
                </div>
                <div className="text-base sm:text-lg font-bold text-[#0494f4] font-mono mt-0.5">
                  {rec.approxBudgetInr}
                </div>
              </div>
            </div>

            {/* Sovereign Advantages */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                Sovereign Engineering Advantages
              </div>
              <div className="space-y-1.5">
                {rec.sovereignAdvantages.map((adv, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{adv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
