import React from 'react';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { COMPANY_INFO } from '../data/companyData';
import type { PageKey } from '../lib/routing';

const DESKS = [
  { label: 'Business & general enquiries', email: COMPANY_INFO.email },
  { label: 'Support', email: COMPANY_INFO.supportEmail },
  { label: 'Help & documentation', email: COMPANY_INFO.helpEmail },
  { label: 'Security reports', email: COMPANY_INFO.securityEmail },
];

export const ContactPage: React.FC<{ onNavigate: (p: PageKey) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <Breadcrumbs items={[{ name: 'Contact', page: 'contact' }]} onNavigate={onNavigate} />

      <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">Contact</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
        Email is the fastest route. We usually reply within a working day.
      </p>

      <div className="mt-6 space-y-3">
        {DESKS.map((desk) => (
          <a
            key={desk.email}
            href={`mailto:${desk.email}`}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-[#0494f4]/40"
          >
            <span className="flex items-center gap-3 text-sm font-medium text-zinc-900 dark:text-white">
              <Mail className="w-4 h-4 text-zinc-500" aria-hidden="true" />
              {desk.label}
            </span>
            <span className="text-sm font-mono text-[#0494f4] break-all">{desk.email}</span>
          </a>
        ))}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappNumberOnly}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-500"
          >
            <MessageSquare className="w-4 h-4" aria-hidden="true" /> WhatsApp {COMPANY_INFO.phone}
          </a>
          <a
            href={`tel:${COMPANY_INFO.phoneE164}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium"
          >
            <Phone className="w-4 h-4" aria-hidden="true" /> Call
          </a>
        </div>
      </div>

      <div className="mt-8 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
        <p className="font-semibold text-zinc-900 dark:text-white text-sm">Gothwad Tech Private Limited</p>
        <p className="mt-1">{COMPANY_INFO.headquarters}</p>
        <p className="mt-1">Founder: {COMPANY_INFO.founderEmail} · CEO: {COMPANY_INFO.ceoEmail}</p>
      </div>
    </div>
  );
};
