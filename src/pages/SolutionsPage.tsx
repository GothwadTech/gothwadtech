import React from 'react';
import { GraduationCap, Utensils, Store, Building2, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

const ITEMS = [
  { icon: GraduationCap, title: 'School ERP', desc: 'Fees, attendance, parent app', price: '₹24,999' },
  { icon: Utensils, title: 'Restaurant POS', desc: 'Ordering + QR + billing', price: '₹19,999' },
  { icon: Store, title: 'Shop billing', desc: 'Barcode + Khata + storefront', price: '₹14,999' },
  { icon: Building2, title: 'Business CRM', desc: 'Leads, invoices, payroll', price: '₹29,999' },
];

export const SolutionsPage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <Breadcrumbs items={[{ name: 'Solutions', path: '/solutions' }]} onNavigate={onNavigate} />
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Solutions</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Simple tools for shops, schools and startups.</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ITEMS.map((it) => {
          const Icon = it.icon;
          return (
            <div key={it.title} className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-zinc-900 dark:text-white">{it.title}</div>
                <div className="text-xs text-zinc-500">{it.desc}</div>
              </div>
              <span className="text-xs font-bold text-[#0494f4]">{it.price}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <button onClick={() => onNavigate('contact')} className="px-5 py-2 rounded-full bg-[#0494f4] text-white text-sm font-medium hover:bg-[#0077cd] cursor-pointer">
          Contact for demo <ArrowRight className="w-4 h-4 inline ml-1" />
        </button>
      </div>
    </div>
  );
};
