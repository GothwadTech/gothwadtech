import React from 'react';
import { BookOpen, ArrowRight, ExternalLink } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import type { PageKey } from '../lib/routing';

const DOCS = [
  { title: 'Quickstart', desc: 'Run your first Gothwad app', href: 'https://docs.gothwadtech.com/docs/quickstart' },
  { title: 'Accounts OAuth', desc: 'PKCE flow and user info', href: 'https://docs.gothwadtech.com/docs/oauth' },
  { title: 'Mail setup', desc: 'Deploy an inbox on Cloudflare', href: 'https://docs.gothwadtech.com/docs/mail-setup' },
  { title: 'API reference', desc: 'Accounts and Mail REST', href: 'https://docs.gothwadtech.com/docs/api' },
  { title: 'Ecosystem architecture', desc: 'How the apps connect', href: 'https://docs.gothwadtech.com/docs/architecture' },
  { title: 'Browser', desc: 'Android and Android TV builds', href: 'https://docs.gothwadtech.com/docs/browser' },
];

export const DocsPage: React.FC<{ onNavigate: (p: PageKey) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <Breadcrumbs items={[{ name: 'Docs', page: 'docs' }]} onNavigate={onNavigate} />

      <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-[#0494f4]" aria-hidden="true" /> Docs
      </h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
        Source-based documentation for the Gothwad ecosystem. The full site lives at docs.gothwadtech.com.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {DOCS.map((doc) => (
          <a
            key={doc.title}
            href={doc.href}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-[#0494f4]/30 flex items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <div className="text-sm font-semibold text-zinc-900 dark:text-white">{doc.title}</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">{doc.desc}</div>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-400 shrink-0" aria-hidden="true" />
          </a>
        ))}
      </div>

      <div className="mt-6 text-center">
        <a
          href="https://docs.gothwadtech.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium"
        >
          Open full docs <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};
