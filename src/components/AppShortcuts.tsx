import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { ECOSYSTEM_APPS, CATEGORIES } from '../data/ecosystem';
import type { CategoryId } from '../data/ecosystem';

function filterApps(category: CategoryId, query: string) {
  const q = query.trim().toLowerCase();
  return ECOSYSTEM_APPS.filter((app) => {
    const byCat = category === 'all' ? true : app.category === category;
    if (!byCat) return false;
    if (!q) return true;
    return (
      app.name.toLowerCase().includes(q) ||
      app.tagline.toLowerCase().includes(q) ||
      app.description.toLowerCase().includes(q) ||
      app.host.toLowerCase().includes(q)
    );
  });
}

export const AppShortcuts: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const [category, setCategory] = useState<CategoryId>('all');
  const [query, setQuery] = useState('');

  const apps = useMemo(() => filterApps(category, query), [category, query]);

  return (
    <div className="w-full space-y-4">
      {/* Controls: category pills + search — matches docs/portal aesthetic */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id as CategoryId)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border cursor-pointer ${
                category === c.id
                  ? 'bg-[#0494f4] text-white border-[#0494f4] shadow-xs'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72 shrink-0">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, e.g. Mail, Tube…"
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0494f4] focus:ring-2 focus:ring-[#0494f4]/20"
          />
        </div>
      </div>

      {/* Grid — 2→3→4 cols, card design like gothwadtech/portal */}
      <div className={`grid gap-3 sm:gap-4 ${compact ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
        {apps.map((app) => {
          const Icon = app.icon;
          return (
            <a
              key={app.id}
              href={app.href}
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col gap-3 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-[#0494f4]/40 dark:hover:border-[#0494f4]/40 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${app.iconBg} ${app.iconText}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/50">
                  {app.badge}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-[13.5px] font-bold text-zinc-900 dark:text-white leading-tight flex items-center gap-1">
                  {app.name}
                  <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-[#0494f4] transition-colors" />
                </h3>
                <div className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">{app.tagline}</div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">{app.description}</p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="text-[10px] font-mono text-zinc-500 dark:text-zinc-500 truncate">
                  {app.host}.gothwadtech.com
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#0494f4]/10 text-[#0494f4] border border-[#0494f4]/20">
                  Open
                </span>
              </div>
            </a>
          );
        })}
      </div>

      {apps.length === 0 && (
        <div className="py-16 text-center">
          <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">No products found</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">Try a different keyword or category.</div>
          <button onClick={() => { setQuery(''); setCategory('all'); }} className="mt-4 px-4 py-2 rounded-xl bg-[#0494f4] text-white text-xs font-bold cursor-pointer">
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
};
