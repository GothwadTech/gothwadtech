import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

const DOCS = [
  { title: 'Quickstart', desc: 'Run your first Gothwad app', href: 'https://docs.gothwadtech.com/docs/quickstart' },
  { title: 'Accounts OAuth', desc: 'PKCE flow + user info', href: 'https://docs.gothwadtech.com/docs/oauth' },
  { title: 'Mail setup', desc: 'Deploy inbox on Cloudflare', href: 'https://docs.gothwadtech.com/docs/mail-setup' },
  { title: 'API reference', desc: 'Accounts + Mail REST', href: 'https://docs.gothwadtech.com/docs/api' },
  { title: 'Ecosystem', desc: 'How apps connect', href: 'https://docs.gothwadtech.com/docs/architecture' },
  { title: 'Browser', desc: 'Android TV & mobile', href: 'https://docs.gothwadtech.com/docs/browser' },
];

export const DocsPage: React.FC = () => {
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <Breadcrumbs items={[{ name: 'Docs', path: '/docs' }]} />
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2"><BookOpen className="w-5 h-5 text-[#0494f4]" /> Docs</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Source-based docs for Gothwad ecosystem.</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {DOCS.map((d) => (
          <a key={d.title} href={d.href} target="_blank" rel="noreferrer" className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-[#0494f4]/30 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-white">{d.title}</div>
              <div className="text-xs text-zinc-500">{d.desc}</div>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-400" />
          </a>
        ))}
      </div>

      <div className="mt-6 text-center">
        <a href="https://docs.gothwadtech.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium">
          Open full docs <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
