import React from 'react';
import { Github, BookOpen } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const Footer: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-600 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} {COMPANY_INFO.legalName}</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Jaipur, Rajasthan, India</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <a href="https://docs.gothwadtech.com" target="_blank" rel="noreferrer" className="hover:underline inline-flex items-center gap-1"><BookOpen className="w-3 h-3" /> Docs</a>
          <a href="https://github.com/GothwadTech" target="_blank" rel="noreferrer" className="hover:underline inline-flex items-center gap-1"><Github className="w-3 h-3" /> GitHub</a>
          <button onClick={() => onNavigate('company')} className="hover:underline cursor-pointer">About</button>
          <button onClick={() => onNavigate('contact')} className="hover:underline cursor-pointer">Contact</button>
          <a href="https://www.gothwadtech.com" target="_blank" rel="noreferrer" className="hover:underline">www.gothwadtech.com</a>
        </div>
      </div>
    </footer>
  );
};
