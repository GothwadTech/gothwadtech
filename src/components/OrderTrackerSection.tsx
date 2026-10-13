import React, { useState, useEffect } from 'react';
import { Search, CheckCircle2, Clock, RefreshCw, Phone, Mail } from 'lucide-react';
import { safeStorage } from '../utils/safeStorage';
import { COMPANY_INFO } from '../data/companyData';

interface Milestone {
  title: string;
  desc: string;
  status: 'completed' | 'in_progress' | 'pending';
  date: string;
}

interface MockOrder {
  orderId: string;
  clientName: string;
  projectType: string;
  tier: string;
  progress: number;
  status: 'In Development' | 'Architecture Finalized' | 'QA & Testing' | 'Live & Deployed';
  startDate: string;
  estimatedDelivery: string;
  leadArchitect: string;
  milestones: Milestone[];
}

const SAMPLE_ORDERS: Record<string, MockOrder> = {
  'GT-ORD-2026-0814': {
    orderId: 'GT-ORD-2026-0814',
    clientName: 'Sovereign Fintech Corp',
    projectType: 'Ultra-Fast Enterprise Web Platform',
    tier: 'Enterprise Sovereign',
    progress: 75,
    status: 'QA & Testing',
    startDate: '2026-08-01',
    estimatedDelivery: '2026-08-20',
    leadArchitect: 'Pawan Gothwad (Chief Architect)',
    milestones: [
      {
        title: 'Requirement Audit & Architecture Blueprint',
        desc: 'Zero-latency system design, schema setup & technical specifications locked.',
        status: 'completed',
        date: 'Aug 03, 2026',
      },
      {
        title: 'UI/UX Design Heuristics & Component Library',
        desc: 'Tailwind + React high-conversion interfaces finalized with responsive testing.',
        status: 'completed',
        date: 'Aug 07, 2026',
      },
      {
        title: 'Core Engine Coding & API Microservices',
        desc: 'Sub-second API routing, secure authentication, and database caching pipeline.',
        status: 'completed',
        date: 'Aug 12, 2026',
      },
      {
        title: 'Stress Testing, Security Audits & SLA Guarantee',
        desc: 'Conducting automated security vulnerability scan & 100k user load tests.',
        status: 'in_progress',
        date: 'Aug 16, 2026',
      },
      {
        title: 'Cloud Run / Bare-Metal Production Deployment',
        desc: 'Final DNS cutover, custom domain SSL verification, and team handover.',
        status: 'pending',
        date: 'Aug 20, 2026',
      },
    ],
  },
  'GT-ORD-BROWSER-99': {
    orderId: 'GT-ORD-BROWSER-99',
    clientName: 'Bharat DeepTech Lab',
    projectType: 'Custom Microkernel Browser Fork & Extension Suite',
    tier: 'Deep-Tech Custom Engine',
    progress: 95,
    status: 'Live & Deployed',
    startDate: '2026-07-15',
    estimatedDelivery: '2026-08-10',
    leadArchitect: 'Vishnu Meena (Co-Founder & CTO)',
    milestones: [
      {
        title: 'Kernel Customization & Ad-Block Engine',
        desc: 'Integrated TurboShield native memory allocator and DNS protection.',
        status: 'completed',
        date: 'July 20, 2026',
      },
      {
        title: '16-Thread Downloader Acceleration Build',
        desc: 'Multi-stream chunk socket pipeline compiled with native Rust binaries.',
        status: 'completed',
        date: 'July 28, 2026',
      },
      {
        title: 'APK & Desktop Bundle Signing',
        desc: 'Cryptographic SHA-256 release builds produced and benchmarked under 12MB.',
        status: 'completed',
        date: 'Aug 05, 2026',
      },
      {
        title: 'Production Release & Play Store Deployment',
        desc: 'App deployed with 99.9% crash-free sessions SLA.',
        status: 'completed',
        date: 'Aug 10, 2026',
      },
    ],
  },
};

export const OrderTrackerSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOrder, setActiveOrder] = useState<MockOrder | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Load from local storage if client recently made an inquiry
  useEffect(() => {
    try {
      const orders = safeStorage.getItem<any[]>('gt_client_orders', []);
      if (orders && orders.length > 0) {
        const latest = orders[0];
        // If not already in sample orders, synthesize a tracker
        if (!SAMPLE_ORDERS[latest.id]) {
          SAMPLE_ORDERS[latest.id] = {
            orderId: latest.id,
            clientName: latest.clientName || 'Valued Client',
            projectType: latest.projectType || 'Custom Sovereign Software',
            tier: latest.tier || 'Enterprise Project',
            progress: 35,
            status: 'Architecture Finalized',
            startDate: new Date(latest.timestamp || Date.now()).toLocaleDateString(),
            estimatedDelivery: 'Within 2-3 Weeks',
            leadArchitect: 'Pawan Gothwad & Technical Core',
            milestones: [
              {
                title: 'Order Received & Verified',
                desc: 'Project scope logged into Gothwad Tech engineering pipeline.',
                status: 'completed',
                date: 'Completed',
              },
              {
                title: 'Technical Requirement Analysis',
                desc: 'System architect reviewing modules, SLA and tech stack.',
                status: 'in_progress',
                date: 'In Progress',
              },
              {
                title: 'Prototype Sprint & UI Heuristics',
                desc: 'Building responsive interfaces and interactive prototype.',
                status: 'pending',
                date: 'Scheduled',
              },
              {
                title: 'Core Development & Integration',
                desc: 'Backend APIs, database, and business logic execution.',
                status: 'pending',
                date: 'Scheduled',
              },
              {
                title: 'Final Quality Assurance & Launch',
                desc: 'Security scan, speed audits, and live cloud release.',
                status: 'pending',
                date: 'Scheduled',
              },
            ],
          };
        }
      }
    } catch {
      // safe fallback
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    setErrorMsg('');

    const cleanQuery = searchQuery.trim().toUpperCase();
    if (!cleanQuery) {
      setErrorMsg('Please enter a valid Order ID (e.g. GT-ORD-2026-0814)');
      setActiveOrder(null);
      return;
    }

    if (SAMPLE_ORDERS[cleanQuery]) {
      setActiveOrder(SAMPLE_ORDERS[cleanQuery]);
    } else {
      setActiveOrder(null);
      setErrorMsg(`No active project found with ID "${cleanQuery}". Try checking the sample ID: GT-ORD-2026-0814 or contact our desk.`);
    }
  };

  const handleTrySample = (id: string) => {
    setSearchQuery(id);
    setActiveOrder(SAMPLE_ORDERS[id]);
    setHasSearched(true);
    setErrorMsg('');
  };

  return (
    <section id="tracker" className="py-20 border-t border-zinc-200 dark:border-zinc-800 scroll-mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0494f4]/10 border border-[#0494f4]/30 text-[#0494f4] text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Real-Time Client Transparency</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Live Project <span className="text-[#0494f4]">Order Tracker</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
            Track your custom software, browser build, or web platform development milestones in real time. Enter your Gothwad Tech Order ID below.
          </p>
        </div>

        {/* Search Bar Box */}
        <div className="max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. GT-ORD-2026-0814)"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0494f4] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Track Project</span>
            </button>
          </form>

          {/* Quick Sample Suggestions */}
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            <span>Quick Live Samples:</span>
            <button
              type="button"
              onClick={() => handleTrySample('GT-ORD-2026-0814')}
              className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-[#0494f4]/10 hover:text-[#0494f4] font-mono cursor-pointer transition-colors"
            >
              GT-ORD-2026-0814 (Web Platform)
            </button>
            <button
              type="button"
              onClick={() => handleTrySample('GT-ORD-BROWSER-99')}
              className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-[#0494f4]/10 hover:text-[#0494f4] font-mono cursor-pointer transition-colors"
            >
              GT-ORD-BROWSER-99 (Browser Build)
            </button>
          </div>

          {errorMsg && (
            <div className="mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-xs text-red-700 dark:text-red-300">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Results Card */}
        {activeOrder && (
          <div className="max-w-4xl mx-auto rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm space-y-6">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded-lg bg-[#0494f4]/10 text-[#0494f4] border border-[#0494f4]/30">
                    {activeOrder.orderId}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-500/30">
                    {activeOrder.status}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mt-2">
                  {activeOrder.projectType}
                </h3>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Client: <strong className="text-zinc-900 dark:text-white">{activeOrder.clientName}</strong> • Lead Architect: {activeOrder.leadArchitect}
                </div>
              </div>

              <div className="text-left sm:text-right space-y-1">
                <div className="text-xs text-zinc-400">Overall Build Progress</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0494f4] font-mono">
                  {activeOrder.progress}%
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-3 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#0494f4] to-[#0077cd] rounded-full transition-all duration-700"
                  style={{ width: `${activeOrder.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
                <span>Start: {activeOrder.startDate}</span>
                <span>Est. Delivery: {activeOrder.estimatedDelivery}</span>
              </div>
            </div>

            {/* Milestones Stepper */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Live Development Milestones
              </h4>

              <div className="space-y-3">
                {activeOrder.milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex items-start gap-3 transition-colors ${
                      m.status === 'completed'
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40'
                        : m.status === 'in_progress'
                        ? 'bg-[#0494f4]/5 dark:bg-[#0494f4]/10 border-[#0494f4]/40 shadow-xs'
                        : 'bg-zinc-50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 opacity-60'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {m.status === 'completed' ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      ) : m.status === 'in_progress' ? (
                        <div className="w-6 h-6 rounded-full bg-[#0494f4] text-white flex items-center justify-center animate-pulse">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="text-sm font-bold text-zinc-900 dark:text-white">
                          {m.title}
                        </div>
                        <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 shrink-0">
                          {m.date}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Architect Contact */}
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-zinc-500 dark:text-zinc-400">
                Need milestone adjustments or sprint priority changes?
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="mailto:support@gothwadtech.com"
                  className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-[#0494f4] font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>support@gothwadtech.com</span>
                </a>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumberOnly}?text=Hello%20Gothwad%20Tech,%20inquiring%20about%20Order%20${activeOrder.orderId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp Architect</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
