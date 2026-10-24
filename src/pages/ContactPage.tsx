import React from 'react';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { COMPANY_INFO } from '../data/companyData';

export const ContactPage: React.FC = () => {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <Breadcrumbs items={[{ name: 'Contact', path: '/contact' }]} />
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Contact</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">We reply in 2–4 hours.</p>

      <div className="mt-6 space-y-3">
        {[
          { label: 'Business', email: COMPANY_INFO.email },
          { label: 'Support', email: COMPANY_INFO.supportEmail },
          { label: 'Help', email: COMPANY_INFO.helpEmail },
        ].map((it) => (
          <a key={it.email} href={`mailto:${it.email}`} className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300">
            <span className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-zinc-500" />
              <span className="text-sm font-medium text-zinc-900 dark:text-white">{it.label}</span>
            </span>
            <span className="text-sm font-mono text-[#0494f4]">{it.email}</span>
          </a>
        ))}
        <div className="flex gap-3 pt-2">
          <a href={`https://wa.me/${COMPANY_INFO.whatsappNumberOnly}`} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-500">
            <MessageSquare className="w-4 h-4" /> WhatsApp
          </a>
          <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium">
            <Phone className="w-4 h-4" /> Call
          </a>
        </div>
      </div>
    </div>
  );
};
