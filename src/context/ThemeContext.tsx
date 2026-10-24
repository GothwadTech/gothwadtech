import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  themeMode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystemIsDark(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(isDark: boolean) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(isDark ? 'dark' : 'light');
  root.style.colorScheme = isDark ? 'dark' : 'light';
  try {
    localStorage.setItem('gothwad-theme', isDark ? 'dark' : 'light');
  } catch {}
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    try {
      const stored = localStorage.getItem('gothwad-theme') as 'light' | 'dark' | null;
      if (stored === 'dark' || stored === 'light') return stored;
    } catch {}
    return 'system';
  });

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const compute = () => {
      if (themeMode === 'system') return getSystemIsDark();
      return themeMode === 'dark';
    };
    setIsDark(compute());

    if (themeMode === 'system') {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => setIsDark(getSystemIsDark());
      mql.addEventListener('change', handler);
      return () => mql.removeEventListener('change', handler);
    }
  }, [themeMode]);

  useEffect(() => {
    applyTheme(isDark);
  }, [isDark]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    if (mode === 'system') {
      try {
        localStorage.removeItem('gothwad-theme');
      } catch {}
    } else {
      try {
        localStorage.setItem('gothwad-theme', mode);
      } catch {}
    }
  };

  const toggleTheme = () => {
    // Toggle between light/dark directly for one-click UX, like gothwadtech site
    const next = isDark ? 'light' : 'dark';
    setThemeMode(next as ThemeMode);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, isDark, setThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
