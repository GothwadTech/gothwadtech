import React from 'react';
import { ShieldCheck, ArrowUp, Sparkles, Phone, Cpu } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenOrderModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenOrderModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLink = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 relative z-10 transition-colors duration-200">
      {/* Top CTA Banner */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
              Transform your school, restaurant, or business operations today
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Get an instant itemized estimate and partner directly with Gothwad Tech.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenOrderModal}
              className="px-5 py-2.5 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white font-bold text-xs sm:text-sm shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span>Get Free Quotation</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <Logo size="md" />

            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
              Empowering Indian businesses with specialized digital management systems (School ERP, Restaurant POS, Local Shop billing software) & sovereign consumer platforms (Gothwad Browser, GrixChat, Indogram).
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                <ShieldCheck className="w-3 h-3" />
                Aatmanirbhar Bharat
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                100% IP Handover
              </span>
            </div>
          </div>

          {/* Digital Solutions Links */}
          <div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-3">
              Digital Solutions
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => handleLink('solutions')}
                  className="hover:text-[#0494f4] transition-colors text-left cursor-pointer"
                >
                  School Management Suite
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('solutions')}
                  className="hover:text-[#0494f4] transition-colors text-left cursor-pointer"
                >
                  Restaurant POS & Ordering
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('solutions')}
                  className="hover:text-[#0494f4] transition-colors text-left cursor-pointer"
                >
                  Local Shop Barcode Billing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('solutions')}
                  className="hover:text-[#0494f4] transition-colors text-left cursor-pointer"
                >
                  Business Management ERP
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('solutions')}
                  className="hover:text-[#0494f4] transition-colors text-left cursor-pointer"
                >
                  Custom Mobile & Web Apps
                </button>
              </li>
            </ul>
          </div>

          {/* Sovereign Indian Tech */}
          <div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-3">
              Sovereign Indian Apps
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => handleLink('products')}
                  className="hover:text-[#0494f4] transition-colors text-left cursor-pointer flex items-center gap-1"
                >
                  <Cpu className="w-3 h-3 text-[#0494f4]" />
                  <span>Gothwad Browser (&lt;12MB)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('products')}
                  className="hover:text-[#0494f4] transition-colors text-left cursor-pointer"
                >
                  GrixChat (Instant Messenger)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('products')}
                  className="hover:text-[#0494f4] transition-colors text-left cursor-pointer"
                >
                  Indogram (Cloud Messenger)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('portfolio')}
                  className="hover:text-[#0494f4] transition-colors text-left cursor-pointer"
                >
                  Case Studies & Portfolio
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-3">
              Company & Contact
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => handleLink('about')}
                  className="hover:text-[#0494f4] transition-colors text-left cursor-pointer"
                >
                  Founder & Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('contact')}
                  className="hover:text-[#0494f4] transition-colors text-left cursor-pointer"
                >
                  Official Contact Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('contact')}
                  className="hover:text-[#0494f4] transition-colors text-left cursor-pointer"
                >
                  Live Order Tracker
                </button>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="hover:text-[#0494f4] transition-colors flex items-center gap-1 font-mono"
                >
                  <Phone className="w-3 h-3 text-emerald-500" />
                  <span>{COMPANY_INFO.phone}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 mt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.legalName}. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>HQ: Rajasthan, India</span>
            <span>•</span>
            <span>Aatmanirbhar Bharat Initiative</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
