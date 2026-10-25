import React from 'react';
import { GraduationCap, Utensils, Store, Building2, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AppLink } from '../components/AppLink';
import type { PageKey } from '../lib/routing';

const ITEMS = [
  {
    icon: GraduationCap,
    title: 'School ERP',
    desc: 'Fees, attendance, results and a parent app',
    price: 'from ₹24,999',
  },
  {
    icon: Utensils,
    title: 'Restaurant POS',
    desc: 'Ordering, QR menus and billing',
    price: 'from ₹19,999',
  },
  {
    icon: Store,
    title: 'Shop billing',
    desc: 'Barcode billing, Khata ledger and a storefront',
    price: 'from ₹14,999',
  },
  {
    icon: Building2,
    title: 'Business CRM',
    desc: 'Leads, invoices and payroll',
    price: 'from ₹29,999',
  },
];

export const SolutionsPage: React.FC<{ onNavigate: (p: PageKey) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <Breadcrumbs items={[{ name: 'Solutions', page: 'solutions' }]} onNavigate={onNavigate} />

      <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">Solutions</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
        Practical software for shops, schools and small businesses, deployed and supported by Gothwad Tech.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shrink-0">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">{item.title}</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{item.desc}</p>
              </div>
              <span className="text-xs font-bold text-[#0494f4] whitespace-nowrap">{item.price}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-sm font-bold text-zinc-900 dark:text-white">Custom and enterprise work</h2>
        <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
          We also take on custom engineering: internal tools, integrations, sovereign browser engines and Android or Android TV
          applications. Tell us the workflow you need and we will scope it with you.
        </p>
      </div>

      <div className="mt-6 text-center">
        <AppLink
          page="contact"
          onNavigate={onNavigate}
          className="inline-flex items-center gap-1 px-5 py-2 rounded-full bg-[#0494f4] text-white text-sm font-medium hover:bg-[#0077cd]"
        >
          Request a demo <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </AppLink>
      </div>
    </div>
  );
};
