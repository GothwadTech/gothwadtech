import React, { useState } from 'react';
import { Search, ArrowUpRight, Grid2X2, Github, BookOpen } from 'lucide-react';
import { Logo } from '../components/Logo';
import { ECOSYSTEM_APPS } from '../data/ecosystem';

export const HomePage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const [q, setQ] = useState('');

  const filtered = ECOSYSTEM_APPS.filter((app) => {
    if (!q.trim()) return true;
    const s = q.toLowerCase();
    return (
      app.name.toLowerCase().includes(s) ||
      app.tagline.toLowerCase().includes(s) ||
      app.host.toLowerCase().includes(s) ||
      app.description.toLowerCase().includes(s)
    );
  });

  return (
    <div className="min-h-[calc(100vh-7rem)] flex flex-col items-center">
      {/* Google-like centered hero */}
      <div className="w-full max-w-[980px] mx-auto px-4 sm:px-6 flex flex-col items-center pt-12 sm:pt-16 pb-6">
        {/* Big logo — like Google doodle */}
        <div className="flex flex-col items-center gap-3">
          <Logo size="xl" imageSrc="/assets/brand/logo.png" className="scale-[1.08]" />
          <h1 className="sr-only">Gothwad Tech — Official Website</h1>
          <p className="text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-400 text-center tracking-tight">
            Everything Gothwad, in one place.
          </p>
        </div>

        {/* Search bar — Google rounded-full */}
        <div className="w-full max-w-[560px] mt-6 relative group">
          <div className="flex items-center gap-3 w-full h-11 sm:h-12 px-4 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm group-focus-within:shadow-md group-hover:shadow-md group-focus-within:border-[#0494f4]/30 transition-all">
            <Search className="w-5 h-5 text-zinc-400 shrink-0" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products — try Mail, Drive, Browser..."
              className="flex-1 h-full bg-transparent outline-none text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400"
              autoFocus
            />
            {q && (
              <button
                onClick={() => setQ('')}
                className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white px-2 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex items-center justify-center gap-2 mt-3">
            <button
              onClick={() => setQ('')}
              className="px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-medium border border-zinc-200 dark:border-zinc-700 cursor-pointer"
            >
              I’m feeling lucky
            </button>
            <button
              onClick={() => onNavigate('ecosystem')}
              className="px-4 py-1.5 rounded-full bg-[#0494f4] hover:bg-[#0077cd] text-white text-xs font-medium cursor-pointer"
            >
              Browse ecosystem
            </button>
          </div>
        </div>

        {/* Product grid — like Google apps / Chrome shortcuts */}
        <div className="w-full mt-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-zinc-500 dark:text-zinc-500">QUICK ACCESS</span>
            <span className="h-px flex-1 max-w-24 bg-zinc-200 dark:bg-zinc-800" />
            <button
              onClick={() => onNavigate('ecosystem')}
              className="text-xs text-[#0494f4] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              See all <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
            {filtered.map((app) => {
              const Icon = app.icon;
              return (
                <a
                  key={app.id}
                  href={app.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-sm ${app.iconBg} ${app.iconText}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 text-center leading-tight line-clamp-2 min-h-[28px]">
                    {app.name}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 text-center truncate w-full hidden sm:block">
                    {app.host}.gothwadtech.com
                  </span>
                </a>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-10">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">No products found for “{q}”</p>
              <button onClick={() => setQ('')} className="mt-2 text-xs text-[#0494f4] hover:underline cursor-pointer">Clear search</button>
            </div>
          )}
        </div>

        {/* Minimal language + India */}
        <div className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-500">
          Offered by Gothwad Tech in: <span className="text-[#0494f4]">English • हिन्दी</span>
        </div>
      </div>

      {/* Google-like footer */}
      <footer className="mt-auto w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-600 dark:text-zinc-400">
          <div>India • Jaipur, Rajasthan • Aatmanirbhar Bharat</div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <a href="https://docs.gothwadtech.com" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> Docs
            </a>
            <a href="https://github.com/GothwadTech" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
              <Github className="w-3 h-3" /> GitHub
            </a>
            <a href="https://ceo.gothwadtech.com" target="_blank" rel="noreferrer" className="hover:underline">
              CEO
            </a>
            <button onClick={() => onNavigate('company')} className="hover:underline cursor-pointer">About</button>
            <button onClick={() => onNavigate('contact')} className="hover:underline cursor-pointer">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
