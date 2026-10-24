import React from 'react';
import { Compass, MessageSquare, Send, ArrowRight, ExternalLink } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

const PRODUCTS = [
  { id: 'browser', name: 'Gothwad Browser', desc: '11.8 MB • 75% less RAM • TurboShield', icon: Compass, color: 'text-[#0494f4]', href: 'https://browser.gothwadtech.com', play: 'https://play.google.com/store/apps/details?id=com.gothwad.browser' },
  { id: 'grixchat', name: 'GrixChat', desc: '<15ms • 2GB files • HD calling', icon: MessageSquare, color: 'text-emerald-600', href: 'https://grixchat.gothwadtech.com', play: 'https://play.google.com/store/apps/details?id=com.gothwad.grixchat' },
  { id: 'indogram', name: 'Indogram', desc: '200k members • unlimited cloud', icon: Send, color: 'text-sky-600', href: 'https://indogram.gothwadtech.com', play: 'https://play.google.com/store/apps/details?id=com.gothwad.indogram' },
];

export const ProductsPage: React.FC = () => {
  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <Breadcrumbs items={[{ name: 'Products', path: '/products' }]} />
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Sovereign apps</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Three flagships — open on any device.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {PRODUCTS.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.id} className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <div className={`w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center ${p.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white mt-3">{p.name}</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">{p.desc}</p>
              <div className="mt-3 flex flex-col gap-2">
                <a href={p.href} target="_blank" rel="noreferrer" className="flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs font-medium hover:border-[#0494f4]/40">
                  <span>Open</span> <ExternalLink className="w-3 h-3" />
                </a>
                <a href={p.play} target="_blank" rel="noreferrer" className="text-xs text-zinc-500 hover:text-[#0494f4] hover:underline">Play Store →</a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <span className="text-xs text-zinc-600 dark:text-zinc-400">Want all products? Try the ecosystem hub.</span>
        <a href="/ecosystem" className="text-xs font-semibold text-[#0494f4] hover:underline inline-flex items-center gap-1">Ecosystem <ArrowRight className="w-3 h-3" /></a>
      </div>
    </div>
  );
};
