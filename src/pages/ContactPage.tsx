import React from 'react';
import { Mail, Phone, MessageSquare, Clock, MapPin, Send, ArrowRight, LifeBuoy, Building2, HelpCircle, Info } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const ContactPage: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0494f4]/10 border border-[#0494f4]/20 text-[#0494f4] text-xs font-bold uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5" /> Contact Desk
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
          Start a conversation with <span className="text-[#0494f4]">Gothwad Tech</span>
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Sales, support, help or general info — pick the right inbox and get a reply in 2–4 business hours (WhatsApp or email). All product access links remain available from the Ecosystem page.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'Business Inquiries & Solutions',
            category: 'Official Desk',
            email: COMPANY_INFO.email,
            desc: 'Primary channel for school apps, restaurant systems, shop billing tools, and custom development.',
            icon: Building2,
            color: 'bg-[#0494f4]/10 text-[#0494f4] border-[#0494f4]/20',
            action: 'Contact Desk',
          },
          {
            title: 'Client Support & SLA',
            category: 'Customer Care',
            email: COMPANY_INFO.supportEmail,
            desc: '24/7 technical support, live system maintenance, and project SLA support.',
            icon: LifeBuoy,
            color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
            action: 'Support Desk',
          },
          {
            title: 'Help & Onboarding',
            category: 'Assistance',
            email: COMPANY_INFO.helpEmail,
            desc: 'Staff training, portal onboarding, user guides, and integration assistance.',
            icon: HelpCircle,
            color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
            action: 'Get Help',
          },
          {
            title: 'General & Media',
            category: 'Information',
            email: COMPANY_INFO.infoEmail,
            desc: 'Media inquiries, sovereign consumer app inquiries, and general corporate communications.',
            icon: Info,
            color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
            action: 'Info Desk',
          },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.email} className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${card.color} mb-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">{card.category}</div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white mt-1">{card.title}</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2 flex-1">{card.desc}</p>
              <a
                href={`mailto:${card.email}`}
                className="mt-4 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold"
              >
                <Mail className="w-3.5 h-3.5" /> {card.email}
              </a>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-500 mt-2 text-center">{card.action}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 lg:col-span-2">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-white">Direct founder & leadership</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">For partnership and architecture discussions, contact directly (documented in the corporate site as well).</p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { role: 'Founder & Product Architect', name: 'Pawan Gothwad', email: COMPANY_INFO.founderEmail },
              { role: 'CEO', name: 'Yuvkesh Meena / Nishant', email: COMPANY_INFO.ceoEmail },
              { role: 'Co-Founder & CTO', name: 'Vishnu Meena', email: COMPANY_INFO.coFounderEmail },
            ].map((p) => (
              <a
                key={p.email}
                href={`mailto:${p.email}`}
                className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-[#0494f4]/40 text-center"
              >
                <div className="text-xs font-bold text-zinc-900 dark:text-white">{p.name}</div>
                <div className="text-[11px] text-[#0494f4] font-semibold">{p.role}</div>
                <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-1">{p.email}</div>
              </a>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-white">Chat & call</h2>
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappNumberOnly}?text=Hello%20Gothwad%20Tech%20Team,%20I%20want%20to%20discuss%20a%20project!`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white"
          >
            <MessageSquare className="w-5 h-5" />
            <div>
              <div className="text-xs font-bold">WhatsApp Desk</div>
              <div className="text-xs opacity-90">+91 73399 04665 — fastest replies</div>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </a>
          <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
            <Phone className="w-5 h-5 text-[#0494f4]" />
            <div>
              <div className="text-xs font-bold">{COMPANY_INFO.phone}</div>
              <div className="text-xs opacity-70 flex items-center gap-1">
                <Clock className="w-3 h-3" /> 10am – 7pm IST
              </div>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto text-zinc-500" />
          </a>
          <div className="text-xs text-zinc-500 dark:text-zinc-500 flex items-center gap-1.5">
            <MapPin className="w-3 h-3" /> {COMPANY_INFO.headquarters} • Jaipur, Rajasthan
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-500">
            Accounts help? See{' '}
            <a href="https://docs.gothwadtech.com/docs/accounts" target="_blank" rel="noreferrer" className="text-[#0494f4] hover:underline">
              Gothwad Accounts docs
            </a>{' '}
            and{' '}
            <a href="https://accounts.gothwadtech.com" target="_blank" rel="noreferrer" className="text-[#0494f4] hover:underline">
              accounts.gothwadtech.com
            </a>
            .
          </div>
        </div>
      </div>

      <section className="rounded-2xl p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-sm font-bold text-zinc-900 dark:text-white">Quick-product access links (always available)</h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">Bookmark these — they are the same everywhere (portal, docs header, and this footer).</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            ['Mail', 'https://mail.gothwadtech.com'],
            ['Drive', 'https://drive.gothwadtech.com'],
            ['Meet', 'https://meet.gothwadtech.com'],
            ['Tube', 'https://tube.gothwadtech.com'],
            ['GrixChat', 'https://grixchat.gothwadtech.com'],
            ['Indogram', 'https://indogram.gothwadtech.com'],
            ['Browser', 'https://browser.gothwadtech.com'],
            ['Education', 'https://education.gothwadtech.com'],
            ['Store', 'https://store.gothwadtech.com'],
            ['AI', 'https://ai.gothwadtech.com'],
            ['Accounts', 'https://accounts.gothwadtech.com'],
            ['Docs', 'https://docs.gothwadtech.com'],
            ['CEO', 'https://ceo.gothwadtech.com'],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            >
              {label} <Send className="w-3 h-3 text-[#0494f4]" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
