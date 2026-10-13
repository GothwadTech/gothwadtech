import React, { useState } from 'react';
import { GraduationCap, Utensils, Store, Building2, Smartphone, Cpu, CheckCircle2, ArrowRight, MessageSquare, FileText } from 'lucide-react';
import { SERVICES, COMPANY_INFO } from '../data/companyData';

interface SolutionsPageProps {
  onOpenOrderModal: (serviceTitle?: string) => void;
  onNavigate: (page: string) => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({
  onOpenOrderModal,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeAccordion, setActiveAccordion] = useState<string | null>('school-management-systems');

  const categories = [
    'All',
    'Schools & Education',
    'Restaurants & Food',
    'Retail & Local Shops',
    'Business & Enterprise',
    'Custom Development',
  ];

  const filteredServices =
    selectedCategory === 'All'
      ? SERVICES
      : SERVICES.filter((s) => s.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0494f4]/10 border border-[#0494f4]/30 text-[#0494f4] text-xs font-bold uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5" />
          <span>Tailored Business Systems & Apps</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
          Digital Solutions for <span className="text-[#0494f4]">Bharat's Businesses</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
          From full-featured School ERPs to zero-commission Restaurant POS systems and Local Shop barcode billing software, we build robust software that streamlines operations and grows your revenue.
        </p>

        {/* Filter Pills */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0494f4] text-white shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-850 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Solutions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredServices.map((service) => {
          const isSchool = service.id === 'school-management-systems';
          const isRestaurant = service.id === 'restaurant-management-systems';
          const isShop = service.id === 'local-shop-retail-tools';
          const isErp = service.id === 'business-management-erp';
          const isApp = service.id === 'custom-web-mobile-apps';
          const isSovereign = service.id === 'sovereign-browser-tech';

          return (
            <div
              key={service.id}
              className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-[#0494f4] transition-all flex flex-col justify-between shadow-xs"
            >
              <div>
                {/* Card Top */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0494f4]/10 text-[#0494f4] flex items-center justify-center shrink-0">
                    {isSchool && <GraduationCap className="w-6 h-6" />}
                    {isRestaurant && <Utensils className="w-6 h-6" />}
                    {isShop && <Store className="w-6 h-6" />}
                    {isErp && <Building2 className="w-6 h-6" />}
                    {isApp && <Smartphone className="w-6 h-6" />}
                    {isSovereign && <Cpu className="w-6 h-6" />}
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-semibold">
                      {service.category}
                    </span>
                    <div className="text-xs text-zinc-400 mt-1">
                      Est. Timeline: <span className="font-semibold text-zinc-700 dark:text-zinc-200">{service.estimatedTimeline}</span>
                    </div>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-1">
                  {service.title}
                </h2>
                <div className="text-xs sm:text-sm font-semibold text-[#0494f4] mb-3">
                  {service.subtitle}
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Key Features Bullet List */}
                <div className="space-y-2 mb-5">
                  <div className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                    Core Capabilities Included:
                  </div>
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Deliverables */}
                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 mb-5">
                  <div className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#0494f4]" />
                    <span>What You Receive:</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                    {service.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#0494f4]" />
                        <span className="line-clamp-1">{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer & Action */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase font-mono">Commercial Starting Rate</div>
                  <div className="text-lg font-black text-zinc-900 dark:text-white font-mono text-[#0494f4]">
                    {service.startingPriceInr}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappNumberOnly}?text=Hello%20Gothwad%20Tech,%20I%20am%20interested%20in%20the%20${encodeURIComponent(service.title)}!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                    title="Inquire via WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                  </a>

                  <button
                    onClick={() => onOpenOrderModal(service.title)}
                    className="px-4 py-2.5 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <span>Request Custom Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct Transformation Impact FAQs / Highlights */}
      <div className="p-6 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
            Why Indian Businesses Build With Gothwad Tech
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500">
            Real business advantages without hidden lock-ins or recurring commission cuts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-sm">
              0%
            </div>
            <div className="font-bold text-sm text-zinc-900 dark:text-white">Zero Commission Food Ordering</div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Stop paying 30% aggregator commission. Your restaurant gets its own branded ordering website with direct UPI payouts to your bank account.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#0494f4]/10 text-[#0494f4] flex items-center justify-center font-bold text-sm">
              100%
            </div>
            <div className="font-bold text-sm text-zinc-900 dark:text-white">Automated School Fee Receipts</div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Parents pay fees securely via UPI, NetBanking, or QR. Instant digital receipts and ledger updates are automatically synced to the accountant portal.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold text-sm">
              1-Click
            </div>
            <div className="font-bold text-sm text-zinc-900 dark:text-white">WhatsApp Bills & Khata Reminders</div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Local shops send thermal bills directly on WhatsApp with polite payment reminders for credit customers, saving paper and recovering dues faster.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="text-center sm:text-left">
            <div className="text-sm font-bold text-zinc-900 dark:text-white">Need a customized software system?</div>
            <div className="text-xs text-zinc-500">We build tailored workflows for your unique operational requirements.</div>
          </div>
          <button
            onClick={() => onOpenOrderModal()}
            className="px-5 py-2.5 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Configure Custom Project
          </button>
        </div>
      </div>
    </div>
  );
};
