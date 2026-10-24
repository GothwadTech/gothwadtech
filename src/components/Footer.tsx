import React from 'react';
import { ArrowUp, ShieldCheck, Mail, Phone, Github, Globe, BookOpen, FileText } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { ECOSYSTEM_APPS } from '../data/ecosystem';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const handleLink = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
      {/* CTA strip */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
              Everything Gothwad, in one place — one account for all products
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Accounts, Mail, Drive, Meet, Store, Tube, GrixChat, Indogram, Browser, Education, AI, Docs & CEO. Direct links below.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://accounts.gothwadtech.com"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white font-bold text-xs sm:text-sm shadow-xs"
            >
              Go to Accounts
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2 space-y-3">
            <Logo size="md" imageSrc="/assets/logo.png" />
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
              Gothwad Tech is India’s sovereign software collective. We build Mail, Drive, Meet, Store, Tube, GrixChat, Indogram, Browser and education platforms — all connected by Gothwad Accounts, documented publicly and shipped as open source.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                <ShieldCheck className="w-3 h-3" /> Aatmanirbhar Bharat
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                100% docs & source
              </span>
            </div>
            <div className="flex items-center gap-3 pt-2 text-xs">
              <a href="https://github.com/GothwadTech" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-[#0494f4]">
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
              <a href="https://docs.gothwadtech.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-[#0494f4]">
                <BookOpen className="w-3.5 h-3.5" /> Docs
              </a>
              <a href="https://gothwadtech.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-[#0494f4]">
                <Globe className="w-3.5 h-3.5" /> Website
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-3">Identity & Core</h4>
            <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
              {ECOSYSTEM_APPS.filter((a) => a.category === 'identity' || (a.core && ['productivity'].includes(a.category))).slice(0, 6).map((app) => (
                <li key={app.id}>
                  <a href={app.href} target="_blank" rel="noreferrer" className="hover:text-[#0494f4] flex items-center gap-1">
                    <span>{app.name}</span>
                  </a>
                </li>
              ))}
              <li><a href="https://mail.gothwadtech.com" target="_blank" rel="noreferrer" className="hover:text-[#0494f4]">Mail — Inbox</a></li>
              <li><a href="https://drive.gothwadtech.com" target="_blank" rel="noreferrer" className="hover:text-[#0494f4]">Drive — Files</a></li>
              <li><a href="https://meet.gothwadtech.com" target="_blank" rel="noreferrer" className="hover:text-[#0494f4]">Meet — Video</a></li>
              <li><a href="https://store.gothwadtech.com" target="_blank" rel="noreferrer" className="hover:text-[#0494f4]">Store — Apps</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-3">Consumer Apps</h4>
            <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li><a href="https://tube.gothwadtech.com" target="_blank" rel="noreferrer" className="hover:text-[#0494f4]">Tube — Video</a></li>
              <li><a href="https://grixchat.gothwadtech.com" target="_blank" rel="noreferrer" className="hover:text-[#0494f4]">GrixChat — Messenger</a></li>
              <li><a href="https://indogram.gothwadtech.com" target="_blank" rel="noreferrer" className="hover:text-[#0494f4]">Indogram — Cloud</a></li>
              <li><a href="https://browser.gothwadtech.com" target="_blank" rel="noreferrer" className="hover:text-[#0494f4]">Browser — Sovereign</a></li>
              <li><button onClick={() => handleLink('products')} className="hover:text-[#0494f4] text-left cursor-pointer">All products (13+)</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-3">Solutions</h4>
            <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li><button onClick={() => handleLink('solutions')} className="hover:text-[#0494f4] text-left cursor-pointer">School & Education ERP</button></li>
              <li><button onClick={() => handleLink('solutions')} className="hover:text-[#0494f4] text-left cursor-pointer">Restaurant POS & Ordering</button></li>
              <li><button onClick={() => handleLink('solutions')} className="hover:text-[#0494f4] text-left cursor-pointer">Local Shop Billing & Khata</button></li>
              <li><button onClick={() => handleLink('solutions')} className="hover:text-[#0494f4] text-left cursor-pointer">Business ERP & CRM</button></li>
              <li><button onClick={() => handleLink('solutions')} className="hover:text-[#0494f4] text-left cursor-pointer">Custom Browser / Engine</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-3">Company</h4>
            <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li><button onClick={() => handleLink('company')} className="hover:text-[#0494f4] text-left cursor-pointer">Leadership — Pawan, Yuvkesh</button></li>
              <li><button onClick={() => handleLink('docs')} className="hover:text-[#0494f4] text-left cursor-pointer">Docs — Overview</button></li>
              <li><button onClick={() => handleLink('contact')} className="hover:text-[#0494f4] text-left cursor-pointer">Contact Desk</button></li>
              <li><a href="https://ceo.gothwadtech.com" target="_blank" rel="noreferrer" className="hover:text-[#0494f4] inline-flex items-center gap-1">CEO — Yuvkesh Meena</a></li>
              <li><a href="tel:07339904665" className="hover:text-[#0494f4] flex items-center gap-1"><Phone className="w-3 h-3 text-emerald-500" /> {COMPANY_INFO.phone}</a></li>
              <li><a href="mailto:contact@gothwadtech.com" className="hover:text-[#0494f4] flex items-center gap-1"><Mail className="w-3 h-3" /> contact@gothwadtech.com</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} {COMPANY_INFO.legalName}. All rights reserved. <span className="hidden sm:inline">• Jaipur, Rajasthan, India</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <a href="/sitemap.xml" className="hover:text-[#0494f4] inline-flex items-center gap-1"><FileText className="w-3 h-3" /> Sitemap</a>
            <span>•</span>
            <span>Aatmanirbhar Bharat</span>
            <span>•</span>
            <a href="https://github.com/GothwadTech/website" target="_blank" rel="noreferrer" className="hover:text-[#0494f4] inline-flex items-center gap-1"><Github className="w-3 h-3" /> Source</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
