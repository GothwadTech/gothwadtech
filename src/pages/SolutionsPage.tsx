import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  GraduationCap,
  Utensils,
  Store,
  Building2,
  Smartphone,
  Cpu,
  Check,
  ArrowRight,
  ShieldCheck,
  Clock,
  IndianRupee,
} from 'lucide-react';

const SERVICES = [
  {
    id: 'school',
    title: 'School & College Management Suite',
    subtitle: 'ERP + Mobile apps + Fees + Bus GPS',
    category: 'Schools & Education',
    icon: GraduationCap,
    desc: 'Digital management for schools, coaching institutes and colleges: fees with UPI auto-receipts, RFID/biometric attendance with WhatsApp alerts, report cards, exams and parent app.',
    bullets: [
      'Online fee collection + instant digital receipts',
      'Attendance with auto WhatsApp to parents',
      'Parent-teacher app + notices & timetable',
      'CBSE/ICSE report card & exam engine',
    ],
    timeline: '2–4 Weeks',
    price: '₹24,999',
    stack: ['React', 'Node.js', 'Kotlin', 'PostgreSQL', 'Razorpay'],
    href: 'https://education.gothwadtech.com',
  },
  {
    id: 'restaurant',
    title: 'Restaurant & Café Ecosystem',
    subtitle: 'Zero-commission ordering + POS + KDS',
    category: 'Restaurants & Food',
    icon: Utensils,
    desc: 'Direct ordering website, QR table menu, fast touch POS, KDS, captain app, inventory and loyalty — replace Zomato/Swiggy commissions.',
    bullets: [
      'Zero-commission direct ordering website',
      'QR table ordering + live status',
      'Thermal POS + GST invoice',
      'KDS & inventory with low-stock alerts',
    ],
    timeline: '1–3 Weeks',
    price: '₹19,999',
    stack: ['Next.js', 'React Native', 'WebSockets', 'UPI'],
    href: 'https://gothwadtech.com/solutions',
  },
  {
    id: 'shop',
    title: 'Local Shop & Retail Suite',
    subtitle: 'Barcode billing + Khata + storefront',
    category: 'Retail & Local Shops',
    icon: Store,
    desc: 'For kirana, electronics, apparel, wholesalers: fast barcode billing, stock, WhatsApp invoice + Khata reminders, plus a customer storefront.',
    bullets: [
      'Fast barcode billing + GST receipts',
      'Live stock + expiry & reorder alerts',
      'WhatsApp invoice + UPI link',
      'Digital Khata + auto reminders',
    ],
    timeline: '1–2 Weeks',
    price: '₹14,999',
    stack: ['Electron', 'SQLite', 'WhatsApp API', 'UPI'],
    href: 'https://gothwadtech.com/solutions',
  },
  {
    id: 'erp',
    title: 'Business ERP & CRM',
    subtitle: 'Lead pipeline + attendance + invoices',
    category: 'Business & Enterprise',
    icon: Building2,
    desc: 'Custom dashboards for 120+ employee ops: lead CRM with auto follow-ups, quotation engine (90s vs 3h), geo-fenced attendance, revenue analytics.',
    bullets: [
      'Lead CRM + WhatsApp/Email follow-ups',
      '1-click quotation & invoice engine',
      'Geo-fenced attendance + payroll',
      'Role-based access + daily WhatsApp report',
    ],
    timeline: '2–5 Weeks',
    price: '₹29,999',
    stack: ['React', 'Next.js', 'PostgreSQL', 'Cloudflare'],
    href: 'https://gothwadtech.com/solutions',
  },
  {
    id: 'custom',
    title: 'Custom Web & Mobile Apps',
    subtitle: 'Consumer apps, SaaS & high-scale web',
    category: 'Custom Development',
    icon: Smartphone,
    desc: 'From consumer apps to high-converting web: native Android/iOS + cross-platform, 100/100 Lighthouse, Play Store handling, UPI gateways.',
    bullets: [
      '100/100 Lighthouse & sub-second loads',
      'Kotlin/Swift + Flutter/React Native',
      '100% IP & source handover',
      '6 months free maintenance',
    ],
    timeline: '3–6 Weeks',
    price: '₹34,999',
    stack: ['React 19', 'Next.js', 'Kotlin', 'Flutter'],
    href: 'https://gothwadtech.com/solutions',
  },
  {
    id: 'deep',
    title: 'Sovereign Systems & Engines',
    subtitle: 'Custom browser / kiosk / real-time infra',
    category: 'Sovereign Tech',
    icon: Cpu,
    desc: 'Reuse our Browser/GrixChat/Indogram breakthroughs: whitelabel browsers, kiosk, WebSocket backends, Rust microkernels, strict data residency.',
    bullets: [
      'Whitelabel browser + TurboShield',
      'Real-time WebSocket + WebRTC backends',
      'Kiosk & enterprise safe browsing',
      'Zero telemetry, India data residency',
    ],
    timeline: '4–8 Weeks',
    price: '₹49,999',
    stack: ['Rust', 'C++', 'Android NDK', 'WebSockets'],
    href: 'https://browser.gothwadtech.com',
  },
];

export const SolutionsPage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">
      <Breadcrumbs items={[{ name: 'Solutions', path: '/solutions' }]} onNavigate={onNavigate} />
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0494f4]/10 border border-[#0494f4]/30 text-[#0494f4] text-xs font-bold uppercase tracking-wider">
          Digital Solutions
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
          Software that runs <span className="text-[#0494f4]">Bharat’s shops & schools</span>
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          We build more than websites. We digitize operations — from a single kirana to a 120-employee enterprise — plus the sovereign engines behind Browser, GrixChat and Indogram.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px]">
          <span className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
            <ShieldCheck className="w-3 h-3 inline mr-1" /> IP handover
          </span>
          <span className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
            3 months warranty
          </span>
          <span className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
            Edge-ready: Cloudflare Pages
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.id}
              className="rounded-2xl p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-[#0494f4]/30 transition-colors flex flex-col"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#0494f4]/10 border border-[#0494f4]/20 flex items-center justify-center text-[#0494f4]">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#0494f4]/10 text-[#0494f4] border border-[#0494f4]/20">
                  {s.category}
                </span>
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{s.title}</h3>
              <div className="text-xs font-semibold text-[#0494f4] mt-1">{s.subtitle}</div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mt-3">{s.desc}</p>

              <div className="mt-4 space-y-1.5">
                {s.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                    <span className="mt-0.5 w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.stack.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <div className="text-[10px] text-zinc-500 flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3" /> Timeline
                  </div>
                  <div className="text-xs font-bold text-zinc-900 dark:text-white">{s.timeline}</div>
                </div>
                <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <div className="text-[10px] text-zinc-500 flex items-center justify-center gap-1">
                    <IndianRupee className="w-3 h-3" /> Starts at
                  </div>
                  <div className="text-xs font-bold text-[#0494f4]">{s.price}</div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white text-xs font-bold"
                >
                  Learn more <ArrowRight className="w-3 h-3" />
                </a>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  Contact
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl p-6 bg-[#0494f4] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold">Get a live estimate in 2 minutes</div>
          <div className="text-xs opacity-90 mt-0.5">Use our estimator on the Contact page — pick platform → features → instant cost & timeline. Founder or ops team replies in 2–4 hours via WhatsApp/Email.</div>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="shrink-0 px-5 py-2.5 rounded-xl bg-white text-[#0494f4] font-bold text-sm flex items-center gap-1 cursor-pointer"
        >
          Go to Contact <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
