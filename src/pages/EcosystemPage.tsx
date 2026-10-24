import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Github, Search, ExternalLink, Fingerprint, Mail, HardDrive, Video } from 'lucide-react';
import { ECOSYSTEM_APPS, CATEGORIES } from '../data/ecosystem';
import type { CategoryId } from '../data/ecosystem';
import { COMPANY_INFO } from '../data/companyData';

export const EcosystemPage: React.FC = () => {
  const [category, setCategory] = useState<CategoryId>('all');
  const [query, setQuery] = useState('');

  const apps = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ECOSYSTEM_APPS.filter((app) => {
      const catOk = category === 'all' ? true : app.category === category;
      if (!catOk) return false;
      if (!q) return true;
      return (
        app.name.toLowerCase().includes(q) ||
        app.tagline.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q) ||
        app.host.toLowerCase().includes(q) ||
        (app.githubRepo ?? '').toLowerCase().includes(q)
      );
    });
  }, [category, query]);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div className="space-y-2 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0494f4]/10 border border-[#0494f4]/20 text-[#0494f4] text-xs font-bold uppercase tracking-wider">
          Ecosystem Directory
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
          All Gothwad products — <span className="text-[#0494f4]">direct links</span>
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          Every Gothwad product in one place. Each card shows the live subdomain (<code className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs">{'{host}.gothwadtech.com'}</code>), a short description, GitHub repo and one-click access. Connected apps use your Gothwad Account; standalone apps use “Sign in with Gothwad”.
        </p>
      </div>

      <div className="mt-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id as CategoryId)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${category === c.id ? 'bg-[#0494f4] text-white border-[#0494f4]' : 'bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search: Mail, Drive, Tube, Browser…"
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0494f4] focus:ring-2 focus:ring-[#0494f4]/20"
          />
        </div>
      </div>

      <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-500 text-center">
        Showing {apps.length} {apps.length === 1 ? 'product' : 'products'} • Core = Gothwad Account connected (cannot be revoked) • Others = “Sign in with Gothwad” (revocable)
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {apps.map((app) => {
          const Icon = app.icon;
          return (
            <div key={app.id} className="flex flex-col p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-[#0494f4]/40 transition-colors shadow-xs">
              <div className="flex items-start justify-between gap-2">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${app.iconBg} ${app.iconText}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                    {app.badge}
                  </span>
                  {app.core && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0494f4]/10 text-[#0494f4] border border-[#0494f4]/20">Core</span>}
                </div>
              </div>

              <h3 className="mt-3 text-sm font-bold text-zinc-900 dark:text-white">{app.name}</h3>
              <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{app.tagline}</div>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{app.description}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {app.platforms.map((p) => (
                  <span key={p} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                    {p}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                <a href={app.href} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white text-xs font-bold transition-colors">
                  <span>Open</span> <ExternalLink className="w-3.5 h-3.5" />
                </a>
                {app.githubUrl && (
                  <a href={app.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800">
                    <Github className="w-3.5 h-3.5" /> <span>Source</span>
                  </a>
                )}
              </div>
              <div className="mt-2 text-[11px] font-mono text-zinc-500 dark:text-zinc-500 text-center truncate">{app.host}.gothwadtech.com</div>
            </div>
          );
        })}
      </div>

      {/* Bottom helper — mirrors docs “leadership themes” but as product CTA */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white">A connected ecosystem</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">Accounts, Mail, Drive, Meet and Store live alongside standalone products in the same Gothwad Account directory — same as our docs portal.</p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Web & mobile, side by side</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">From Cloudflare Pages web apps to native Android apps for phones, tablets & Android TVs — one portfolio, many platforms.</p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Public record of the work</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">Every card links to its GitHub repo and documentation boundary. Read the source, not just the marketing copy.</p>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-500">
        Need OAuth integration? <a href="https://docs.gothwadtech.com/docs/oauth" target="_blank" rel="noreferrer" className="text-[#0494f4] hover:underline">Read Sign in with Gothwad (PKCE)</a> • Deploy your own <a href="https://docs.gothwadtech.com/docs/cloudflare" target="_blank" rel="noreferrer" className="text-[#0494f4] hover:underline">to Cloudflare Pages</a>
      </div>
    </div>
  );
};
