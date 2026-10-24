import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const CompanyPage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <Breadcrumbs items={[{ name: 'Company', path: '/company' }]} onNavigate={onNavigate} />
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Gothwad Tech</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed max-w-2xl">
        Sovereign software from Jaipur, Rajasthan — founder <b>Pawan Gothwad</b>, CEO <b>Yuvkesh Meena</b>. We build browsers, messaging and business tools for Bharat. Open-source on GitHub.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { name: 'Pawan Gothwad', role: 'Founder', email: 'pawan@gothwadtech.com' },
          { name: 'Yuvkesh Meena', role: 'CEO', email: 'ceo@gothwadtech.com', highlight: true },
          { name: 'Vishnu Meena', role: 'CTO', email: 'vishnu@gothwadtech.com' },
        ].map((p) => (
          <a key={p.name} href={`mailto:${p.email}`} className={`p-4 rounded-2xl border text-center ${p.highlight ? 'bg-[#0494f4] text-white border-[#0494f4]' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'}`}>
            <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-bold ${p.highlight ? 'bg-white text-[#0494f4]' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'}`}>{p.name.split(' ').map(n=>n[0]).join('')}</div>
            <div className={`text-sm font-semibold mt-2 ${p.highlight ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>{p.name}</div>
            <div className={`text-xs ${p.highlight ? 'text-white/80' : 'text-zinc-500'}`}>{p.role}</div>
            <div className={`text-xs mt-1 font-mono ${p.highlight ? 'text-white/90' : 'text-[#0494f4]'}`}>{p.email}</div>
          </a>
        ))}
      </div>

      <div className="mt-8 text-xs text-zinc-500 dark:text-zinc-500 text-center">
        12 specialists • founded 2023 • Aatmanirbhar Bharat • <a href="https://github.com/GothwadTech" target="_blank" rel="noreferrer" className="text-[#0494f4] hover:underline">GitHub</a>
      </div>
    </div>
  );
};
