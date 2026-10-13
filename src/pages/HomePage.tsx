import React from 'react';
import { GraduationCap, Utensils, Store, Building2, Smartphone, ShieldCheck, Compass, MessageSquare, Send, Zap, CheckCircle2, ArrowRight, Sparkles, Phone, ChevronRight } from 'lucide-react';
import { COMPANY_INFO, SOVEREIGN_PRODUCTS, SERVICES } from '../data/companyData';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenOrderModal: (service?: string) => void;
  onOpenBrowserSimulator: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenOrderModal,
  onOpenBrowserSimulator,
}) => {
  return (
    <div className="space-y-16 sm:space-y-20 pb-16">
      {/* 1. Hero Section: Dual Mission Focused */}
      <section className="relative pt-8 sm:pt-12 md:pt-16 overflow-hidden">
        {/* Subtle Background Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#0494f4]/10 via-transparent to-transparent pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto space-y-5">
            {/* Top Mission Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-[#0494f4] animate-pulse" />
              <span>Digital Solutions for Bharat • Sovereign Indian Tech Suite</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tight leading-[1.15]">
              Empowering Indian Businesses with{' '}
              <span className="text-[#0494f4]">Digital Solutions</span> &{' '}
              <span className="text-[#0494f4]">Sovereign Tech</span>
            </h1>

            {/* Sub-headline / Mission statement */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl mx-auto">
              We engineer complete digital management systems for <strong>Schools & Colleges</strong>, <strong>Restaurants & Cafés</strong>, <strong>Local Retail Shops</strong>, and <strong>Enterprises</strong> — alongside building indigenous, high-speed sovereign consumer apps (Gothwad Browser, GrixChat, Indogram) to make India self-reliant.
            </p>

            {/* Main CTAs */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('solutions')}
                className="px-6 py-3 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white font-bold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <span>Explore Digital Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('products')}
                className="px-6 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-850 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-sm border border-zinc-200 dark:border-zinc-700 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-[#0494f4]" />
                <span>Sovereign Indian Apps</span>
              </button>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumberOnly}?text=Hello%20Gothwad%20Tech,%20I%20want%20a%20digital%20solution%20for%20my%20business/school!`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Instant Desk</span>
              </a>
            </div>

            {/* Quick Stat Bar */}
            <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
                <div className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white font-mono">65+</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">Schools & Businesses Digitized</div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
                <div className="text-xl sm:text-2xl font-black text-[#0494f4] font-mono">3 Apps</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">Sovereign Flagships on Play Store</div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
                <div className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white font-mono">12 Architects</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">In-House Dedicated Engineers</div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
                <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">4.95 ★</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">Verified Client Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Dual Core Pillars Showcase (The 2 Arms of Gothwad Tech) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
            Our Two Core Engineering Pillars
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Dedicated to solving grassroots business challenges and architecting sovereign consumer platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1: Digital Solutions for Local Businesses */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-[#0494f4]/60 transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0494f4]/10 text-[#0494f4] flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-[#0494f4]">
                Pillar 1: Business Digitization
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mt-1 mb-3">
                Digital Management Solutions
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                Custom software, mobile apps, and cloud portals designed to automate daily operations, save operational costs, and boost revenues for Indian businesses.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                  <GraduationCap className="w-4 h-4 text-[#0494f4] shrink-0 mt-0.5" />
                  <span><strong>School & College ERP</strong>: Automated fees, WhatsApp attendance & Parent App</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                  <Utensils className="w-4 h-4 text-[#0494f4] shrink-0 mt-0.5" />
                  <span><strong>Restaurant & Café POS</strong>: Zero-commission direct online ordering & QR menu</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                  <Store className="w-4 h-4 text-[#0494f4] shrink-0 mt-0.5" />
                  <span><strong>Local Shop Management</strong>: Barcode billing, inventory, WhatsApp bills & Khata</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                  <Smartphone className="w-4 h-4 text-[#0494f4] shrink-0 mt-0.5" />
                  <span><strong>Custom Software & Apps</strong>: Android/iOS applications & enterprise web portals</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('solutions')}
              className="w-full py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-[#0494f4] hover:text-white text-zinc-900 dark:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Explore All Digital Solutions</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Pillar 2: Sovereign Indian Consumer Tech */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-emerald-500/60 transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Pillar 2: Aatmanirbhar Bharat
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mt-1 mb-3">
                Sovereign Consumer Tech Suite
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                Indigenous, world-class mobile and web platforms built to provide fast, privacy-respecting alternatives to foreign tech applications.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                  <Compass className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Gothwad Browser</strong>: Ultra-fast &lt;12MB browser with 75% less RAM usage</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                  <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>GrixChat</strong>: Instant messenger, HD voice/video calls & 2GB media sharing</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                  <Send className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Indogram</strong>: Cloud messenger with 200k+ group channels & unlimited storage</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>100% Indian Data Residency</strong>: Zero foreign data harvesting and tracking</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('products')}
              className="w-full py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-emerald-600 hover:text-white text-zinc-900 dark:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Explore Sovereign Indian Apps</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Featured Solutions Snapshot */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-[#0494f4] uppercase tracking-wider font-mono">
              Ready-to-Deploy Systems
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white mt-1">
              Popular Digital Management Solutions
            </h2>
          </div>
          <button
            onClick={() => onNavigate('solutions')}
            className="text-xs sm:text-sm font-bold text-[#0494f4] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>View All 6 Solutions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICES.slice(0, 3).map((service) => {
            const isSchool = service.id === 'school-management-systems';
            const isRestaurant = service.id === 'restaurant-management-systems';
            const isShop = service.id === 'local-shop-retail-tools';

            return (
              <div
                key={service.id}
                className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#0494f4]/10 text-[#0494f4] flex items-center justify-center mb-3">
                    {isSchool && <GraduationCap className="w-5 h-5" />}
                    {isRestaurant && <Utensils className="w-5 h-5" />}
                    {isShop && <Store className="w-5 h-5" />}
                  </div>

                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
                    {service.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#0494f4] mb-3">
                    {service.subtitle}
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                    {service.description}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    {service.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-400">Starting from</span>
                    <div className="text-sm font-bold text-zinc-900 dark:text-white font-mono">
                      {service.startingPriceInr}
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenOrderModal(service.title)}
                    className="px-3 py-1.5 rounded-lg bg-[#0494f4] hover:bg-[#0077cd] text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Get Quotation
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Sovereign Indian Tech Showcase Snapshot */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 dark:bg-zinc-900/90 text-white border border-zinc-800 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Made in India For Bharat</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                Our Sovereign Consumer Apps are Live on Google Play Store
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Experience high-performance Indian alternatives engineered with zero tracking, lower memory usage, and lightning-fast speeds: <strong>Gothwad Browser</strong>, <strong>GrixChat</strong>, and <strong>Indogram</strong>.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('products')}
                className="px-5 py-3 rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>View Full Tech Specs & APKs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenBrowserSimulator}
                className="px-5 py-3 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Launch Browser Simulator</span>
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-800">
            {SOVEREIGN_PRODUCTS.map((prod) => (
              <div key={prod.id} className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-white">{prod.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                    {prod.apkSize}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2 mb-2">{prod.tagline}</p>
                <div className="text-[11px] text-[#0494f4] font-semibold">{prod.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Trust & Direct Leadership Callout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
              Ready to Digitally Transform Your School, Restaurant, or Store?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Speak directly with Founder <strong>Pawan Gothwad</strong>, CEO <strong>Nishant</strong>, or CTO <strong>Vishnu Meena</strong> for a custom system demo.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:07339904665"
              className="px-5 py-3 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 text-white dark:text-zinc-900 font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#0494f4]" />
              <span>Call: +91 73399 04665</span>
            </a>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-3 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Official Inquiry Desk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
