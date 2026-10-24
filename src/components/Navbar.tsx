import React from 'react';
import { Github, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const isHome = activePage === 'home';

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white dark:bg-zinc-950 border-b border-zinc-200/0 dark:border-zinc-800/0">
      {/* Google-like top bar: left “About” links, right actions */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left — only show logo on inner pages, not on home (like Google search vs homepage) */}
        <div className="flex items-center gap-4">
          {!isHome && (
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2 cursor-pointer" aria-label="Gothwad Tech home">
              <Logo size="sm" imageSrc="/assets/brand/logo.png" />
            </button>
          )}
          {/* Google left links style */}
          <nav className="hidden sm:flex items-center gap-4 text-[13px] text-zinc-600 dark:text-zinc-400">
            <button onClick={() => onNavigate('company')} className="hover:underline cursor-pointer">About</button>
            <a href="https://store.gothwadtech.com" target="_blank" rel="noreferrer" className="hover:underline">Store</a>
          </nav>
        </div>

        {/* Right — like Gmail • Images • Apps • Profile */}
        <nav className="flex items-center gap-1 sm:gap-3 text-[13px]">
          <button onClick={() => onNavigate('ecosystem')} className="hidden sm:inline hover:underline cursor-pointer text-zinc-700 dark:text-zinc-300">Ecosystem</button>
          <button onClick={() => onNavigate('docs')} className="hidden sm:inline hover:underline cursor-pointer text-zinc-700 dark:text-zinc-300">Docs</button>
          <a href="https://github.com/GothwadTech" target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center gap-1 hover:underline text-zinc-700 dark:text-zinc-300">
            GitHub
          </a>
          <a
            href="https://accounts.gothwadtech.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0494f4] hover:bg-[#0077cd] text-white text-xs sm:text-sm font-medium transition-colors"
          >
            Sign in
          </a>
          {/* Profile dot like Google */}
          <a
            href="https://accounts.gothwadtech.com"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0494f4] to-violet-600 flex items-center justify-center text-white text-xs font-bold"
            aria-label="Gothwad Account"
          >
            G
          </a>
        </nav>
      </div>
    </header>
  );
};
