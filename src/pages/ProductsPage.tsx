import React from 'react';
import { Compass, MessageSquare, Send, ArrowRight, ExternalLink } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AppLink } from '../components/AppLink';
import type { PageKey } from '../lib/routing';

const PRODUCTS = [
  {
    id: 'browser',
    name: 'Gothwad Browser',
    tagline: 'A lightweight browser with built-in ad blocking',
    description:
      'A small, fast browser for Android phones and Android TV, with TurboShield ad blocking and a remote-friendly interface.',
    icon: Compass,
    color: 'text-[#0494f4]',
    href: 'https://browser.gothwadtech.com',
    source: 'https://github.com/GothwadTech/browser',
    platforms: ['Android', 'Android TV', 'Web'],
  },
  {
    id: 'grixchat',
    name: 'GrixChat',
    tagline: 'Real-time messaging and calling',
    description:
      'Mobile-first messenger with group chat, large file sharing and HD voice and video calls, built on the Gothwad Account.',
    icon: MessageSquare,
    color: 'text-emerald-600',
    href: 'https://grixchat.gothwadtech.com',
    source: 'https://github.com/GothwadTech/grixchat',
    platforms: ['Web', 'Android'],
  },
  {
    id: 'indogram',
    name: 'Indogram',
    tagline: 'Cloud communities and channels',
    description:
      'A Telegram-style cloud messenger for communities, channels and bots, with cloud storage and multi-device sync.',
    icon: Send,
    color: 'text-sky-600',
    href: 'https://indogram.gothwadtech.com',
    source: 'https://github.com/GothwadTech/indogramapp',
    platforms: ['Web', 'Android'],
  },
];

export const ProductsPage: React.FC<{ onNavigate: (p: PageKey) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <Breadcrumbs items={[{ name: 'Products', page: 'products' }]} onNavigate={onNavigate} />

      <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">Sovereign apps</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
        The Gothwad flagships — open them on any device, or read the source.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {PRODUCTS.map((product) => {
          const Icon = product.icon;
          return (
            <article
              key={product.id}
              className="flex flex-col p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center ${product.color}`}>
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-white mt-3">{product.name}</h2>
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{product.tagline}</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed flex-1">{product.description}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {product.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                  >
                    {platform}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-2">
                <a
                  href={product.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white text-xs font-semibold"
                >
                  <span>Open {product.name}</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
                <a
                  href={product.source}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-zinc-500 hover:text-[#0494f4] hover:underline"
                >
                  View source →
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-8 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-zinc-600 dark:text-zinc-400">
          Mail, Drive, Meet, Tube and the rest of the ecosystem are in the directory.
        </span>
        <AppLink page="ecosystem" onNavigate={onNavigate} className="text-xs font-semibold text-[#0494f4] hover:underline inline-flex items-center gap-1">
          Browse ecosystem <ArrowRight className="w-3 h-3" aria-hidden="true" />
        </AppLink>
      </div>
    </div>
  );
};
