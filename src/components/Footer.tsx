import React from 'react';
import { Github, BookOpen } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { AppLink } from './AppLink';
import type { PageKey } from '../lib/routing';

export const Footer: React.FC<{ onNavigate: (page: PageKey) => void }> = ({ onNavigate }) => {
  return (
    <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-600 dark:text-zinc-400">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span>© {new Date().getFullYear()} {COMPANY_INFO.legalName}</span>
          <span className="hidden sm:inline" aria-hidden="true">•</span>
          <span>{COMPANY_INFO.headquarters}</span>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <AppLink page="ecosystem" onNavigate={onNavigate} className="hover:underline">Ecosystem</AppLink>
          <AppLink page="products" onNavigate={onNavigate} className="hover:underline">Products</AppLink>
          <a href="https://docs.gothwadtech.com" target="_blank" rel="noreferrer" className="hover:underline inline-flex items-center gap-1">
            <BookOpen className="w-3 h-3" aria-hidden="true" /> Docs
          </a>
          <a href="https://github.com/GothwadTech" target="_blank" rel="noreferrer" className="hover:underline inline-flex items-center gap-1">
            <Github className="w-3 h-3" aria-hidden="true" /> GitHub
          </a>
          <AppLink page="company" onNavigate={onNavigate} className="hover:underline">About</AppLink>
          <AppLink page="contact" onNavigate={onNavigate} className="hover:underline">Contact</AppLink>
        </nav>
      </div>
    </footer>
  );
};
