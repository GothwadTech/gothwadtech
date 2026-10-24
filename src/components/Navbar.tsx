import React, { useEffect, useState } from 'react';
import { Menu, X, Sparkles, Sun, Moon, Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { useTheme } from '../context/ThemeContext';
import { Logo } from './Logo';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDrawerOpen(false);
    };
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isDrawerOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'ecosystem', label: 'Ecosystem' },
    { id: 'products', label: 'Products' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'docs', label: 'Docs' },
    { id: 'company', label: 'Company' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleClick = (pageId: string) => {
    setIsDrawerOpen(false);
    onNavigate(pageId);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 w-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200/90 dark:border-zinc-800/90 shadow-xs">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between h-[56px]">
            <button
              onClick={() => handleClick('home')}
              className="group focus:outline-none focus:ring-2 focus:ring-[#0494f4] rounded-xl p-0.5 transition-transform active:scale-95 shrink-0 cursor-pointer"
              aria-label="Gothwad Tech Home"
            >
              <Logo size="sm" imageSrc="/assets/logo.png" />
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const active = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleClick(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-[12.5px] font-semibold transition-all cursor-pointer ${
                      active
                        ? 'text-white bg-[#0494f4] shadow-xs'
                        : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <a
                href="https://github.com/GothwadTech"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <button
                onClick={() => handleClick('ecosystem')}
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#0494f4] hover:bg-[#0077cd] text-white transition-colors shadow-xs cursor-pointer active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explore Apps</span>
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                title={isDark ? 'Light mode' : 'Dark mode'}
                aria-label={isDark ? 'Switch to Light' : 'Switch to Dark'}
                className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 transition-colors cursor-pointer active:scale-95"
              >
                {isDark ? <Sun className="w-4 h-4 text-[#0494f4]" /> : <Moon className="w-4 h-4 text-zinc-800" />}
              </button>

              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-800/80 transition-colors cursor-pointer"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs" onClick={() => setIsDrawerOpen(false)} />
      )}

      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 sm:w-80 max-w-[86vw] h-full bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col transition-transform duration-200 ease-out will-change-transform ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-label="Side menu"
      >
        <div className="h-14 px-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
          <Logo size="sm" imageSrc="/assets/logo.png" />
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 overflow-y-auto flex-1 space-y-4">
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 px-2 mb-1">Navigate</div>
            {navItems.map((item) => {
              const active = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${active ? 'bg-[#0494f4] text-white' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <div className="text-xs font-bold text-zinc-900 dark:text-white">Official quick links</div>
            <a href="https://accounts.gothwadtech.com" target="_blank" rel="noreferrer" className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 hover:text-[#0494f4]">
              <span>Accounts — Sign in</span> <ArrowUpRight className="w-3 h-3" />
            </a>
            <a href="https://docs.gothwadtech.com" target="_blank" rel="noreferrer" className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 hover:text-[#0494f4]">
              <span>Docs — Developer Portal</span> <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://ceo.gothwadtech.com" target="_blank" rel="noreferrer" className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 hover:text-[#0494f4]">
              <span>CEO — Yuvkesh Meena</span> <ArrowUpRight className="w-3 h-3" />
            </a>
            <div className="pt-2 flex gap-2">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumberOnly}?text=Hello%20Gothwad%20Tech%20Team!`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex-1 text-center px-3 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-800 text-white font-semibold text-xs cursor-pointer"
              >
                Email
              </a>
            </div>
          </div>

          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 px-2 leading-relaxed">
            © {new Date().getFullYear()} {COMPANY_INFO.legalName}. Aatmanirbhar Bharat. All products accessible via your Gothwad Account.
          </div>
        </div>
      </aside>
    </>
  );
};
