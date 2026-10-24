import React from 'react';
import { ArrowUpRight, Github, BookOpen, Mail } from 'lucide-react';

export const PortalBar: React.FC = () => {
  return (
    <div className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur sticky top-[56px] z-30">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-6 h-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0494f4]/10 border border-[#0494f4]/20 text-[#0494f4] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#0494f4] animate-pulse" /> Official Portal
          </span>
          <span className="text-zinc-600 dark:text-zinc-400 hidden md:inline">One Account for Mail, Drive, Meet, Tube, GrixChat, Browser & more</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <a href="https://accounts.gothwadtech.com" target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors">
            <span>Sign in</span> <ArrowUpRight className="w-3 h-3" />
          </a>
          <a href="https://mail.gothwadtech.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800">
            <Mail className="w-3 h-3" /> <span className="hidden sm:inline">Open Mail</span><span className="sm:hidden">Mail</span>
          </a>
          <a href="https://docs.gothwadtech.com" target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800">
            <BookOpen className="w-3 h-3" /> Docs
          </a>
          <a href="https://github.com/GothwadTech" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800">
            <Github className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
