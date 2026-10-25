import React, { useMemo, useState } from 'react';
import { Search, ArrowUpRight, BookOpen, Github, LogIn } from 'lucide-react';
import { Logo } from '../components/Logo';
import { AppLink } from '../components/AppLink';
import { ECOSYSTEM_APPS } from '../data/ecosystem';
import type { PageKey } from '../lib/routing';
import { ACCOUNTS_WEB_ORIGIN } from '../config/brand';

const QUICK_LINKS = [
  { label: 'Mail', href: 'https://mail.gothwadtech.com' },
  { label: 'Drive', href: 'https://drive.gothwadtech.com' },
  { label: 'Meet', href: 'https://meet.gothwadtech.com' },
  { label: 'Tube', href: 'https://tube.gothwadtech.com' },
  { label: 'Docs', href: 'https://docs.gothwadtech.com' },
];

export const HomePage: React.FC<{ onNavigate: (p: PageKey) => void }> = ({ onNavigate }) => {
  const [q, setQ] = useState('');

  const featured = useMemo(() => ECOSYSTEM_APPS.filter((app) => app.live !== false).slice(0, 16), []);
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return featured;
    return ECOSYSTEM_APPS.filter((app) =>
      [app.name, app.tagline, app.description, app.host, ...app.platforms]
        .join(' ')
        .toLowerCase()
        .includes(needle)
    );
  }, [q, featured]);

  const openSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const needle = q.trim();
    window.history.pushState({ q: needle }, '', `/ecosystem${needle ? `?q=${encodeURIComponent(needle)}` : ''}`);
    onNavigate('ecosystem');
  };

  return (
    <div className="min-h-[calc(100vh-7rem)] flex flex-col items-center">
      <div className="w-full max-w-[980px] mx-auto px-4 sm:px-6 flex flex-col items-center pt-12 sm:pt-16 pb-8">
        <div className="flex flex-col items-center gap-3">
          <Logo size="xl" imageSrc="/assets/brand/logo.png" />
          <h1 className="sr-only">Gothwad Tech — official website</h1>
          <p className="text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-400 text-center tracking-tight">
            Everything Gothwad, in one place.
          </p>
        </div>

        <form onSubmit={openSearch} role="search" className="w-full max-w-[560px] mt-6">
          <label htmlFor="home-search" className="sr-only">
            Search Gothwad products
          </label>
          <div className="flex items-center gap-3 w-full h-11 sm:h-12 px-4 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm focus-within:shadow-md focus-within:border-[#0494f4]/40 transition-all">
            <Search className="w-5 h-5 text-zinc-400 shrink-0" aria-hidden="true" />
            <input
              id="home-search"
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="Search products — try Mail, Drive, Browser…"
              className="flex-1 h-full bg-transparent outline-none text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400"
              autoComplete="off"
            />
            {q && (
              <button type="button" onClick={() => setQ('')} className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white px-2 cursor-pointer">
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
            <button
              type="submit"
              className="px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-medium border border-zinc-200 dark:border-zinc-700 cursor-pointer"
            >
              Search ecosystem
            </button>
            <AppLink
              page="ecosystem"
              onNavigate={onNavigate}
              className="px-4 py-1.5 rounded-full bg-[#0494f4] hover:bg-[#0077cd] text-white text-xs font-medium"
            >
              Browse all products
            </AppLink>
          </div>
        </form>

        <div className="w-full max-w-[560px] mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {QUICK_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:border-[#0494f4]/40"
            >
              {link.label}
              <ArrowUpRight className="w-3 h-3 text-zinc-400" aria-hidden="true" />
            </a>
          ))}
          <a
            href={`${ACCOUNTS_WEB_ORIGIN}/signin`}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold"
          >
            <span className="inline-flex items-center gap-1.5">
              <LogIn className="w-3 h-3" aria-hidden="true" /> Account
            </span>
            <ArrowUpRight className="w-3 h-3 opacity-70" aria-hidden="true" />
          </a>
        </div>

        <div className="w-full mt-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-zinc-500">Quick access</span>
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" aria-hidden="true" />
            <AppLink page="ecosystem" onNavigate={onNavigate} className="text-xs text-[#0494f4] hover:underline inline-flex items-center gap-1">
              See all <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </AppLink>
          </div>

          <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
            {filtered.map((app) => {
              const Icon = app.icon;
              const isRepoOnly = app.live === false;
              return (
                <li key={app.id}>
                  <a
                    href={isRepoOnly ? app.href : app.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full flex-col items-center gap-2 p-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-colors"
                  >
                    <span className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-sm ${app.iconBg} ${app.iconText}`}>
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </span>
                    <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 text-center leading-tight line-clamp-2 min-h-[28px]">
                      {app.name}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 text-center truncate w-full hidden sm:block">
                      {isRepoOnly ? 'Source' : `${app.host}.gothwadtech.com`}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          {filtered.length === 0 && (
            <div className="text-center py-10">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">No products found for “{q}”</p>
              <button type="button" onClick={() => setQ('')} className="mt-2 text-xs text-[#0494f4] hover:underline cursor-pointer">
                Clear search
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-zinc-500">
          <a href="https://docs.gothwadtech.com" target="_blank" rel="noreferrer" className="hover:underline inline-flex items-center gap-1">
            <BookOpen className="w-3 h-3" aria-hidden="true" /> Documentation
          </a>
          <a href="https://github.com/GothwadTech" target="_blank" rel="noreferrer" className="hover:underline inline-flex items-center gap-1">
            <Github className="w-3 h-3" aria-hidden="true" /> Source on GitHub
          </a>
          <AppLink page="contact" onNavigate={onNavigate} className="hover:underline">Contact</AppLink>
        </div>
      </div>
    </div>
  );
};
