import React from 'react';
import { Github, MapPin, Mail } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AppLink } from '../components/AppLink';
import { COMPANY_INFO, LEADERSHIP } from '../data/companyData';
import type { PageKey } from '../lib/routing';

export const CompanyPage: React.FC<{ onNavigate: (p: PageKey) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <Breadcrumbs items={[{ name: 'Company', page: 'company' }]} onNavigate={onNavigate} />

      <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">{COMPANY_INFO.name}</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed max-w-2xl">
        {COMPANY_INFO.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" aria-hidden="true" /> {COMPANY_INFO.headquarters}
        </span>
        <span>Founded {COMPANY_INFO.foundedYear}</span>
        <a href="https://github.com/GothwadTech" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#0494f4] hover:underline">
          <Github className="w-3.5 h-3.5" aria-hidden="true" /> github.com/GothwadTech
        </a>
      </div>

      <h2 className="mt-10 text-lg font-bold text-zinc-900 dark:text-white">Leadership</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {LEADERSHIP.map((person) => {
          const initials = person.name
            .split(' ')
            .map((part) => part[0])
            .join('');
          return (
            <a
              key={person.name}
              href={`mailto:${person.email}`}
              className={`p-4 rounded-2xl border text-center transition-colors ${
                person.highlight
                  ? 'bg-[#0494f4] text-white border-[#0494f4]'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-[#0494f4]/40'
              }`}
            >
              <div
                className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-bold ${
                  person.highlight ? 'bg-white text-[#0494f4]' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                }`}
                aria-hidden="true"
              >
                {initials}
              </div>
              <div className={`text-sm font-semibold mt-2 ${person.highlight ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>
                {person.name}
              </div>
              <div className={`text-xs ${person.highlight ? 'text-white/80' : 'text-zinc-500 dark:text-zinc-400'}`}>{person.role}</div>
              <div className={`text-xs ${person.highlight ? 'text-white/70' : 'text-zinc-500 dark:text-zinc-400'}`}>{person.location}</div>
              <div className={`text-xs mt-1 font-mono break-all ${person.highlight ? 'text-white/90' : 'text-[#0494f4]'}`}>
                {person.email}
              </div>
            </a>
          );
        })}
      </div>

      <div className="mt-10 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-sm font-bold text-zinc-900 dark:text-white">What we are building</h2>
        <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          A single Gothwad Account connecting everyday tools — mail, storage, meetings, video, messaging and a browser — plus
          business systems for Indian schools, shops and restaurants. Most of it is developed in the open on GitHub.
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs">
          <AppLink page="ecosystem" onNavigate={onNavigate} className="font-semibold text-[#0494f4] hover:underline">
            Browse the ecosystem
          </AppLink>
          <AppLink page="docs" onNavigate={onNavigate} className="font-semibold text-[#0494f4] hover:underline">
            Read the docs
          </AppLink>
          <a href={`mailto:${COMPANY_INFO.email}`} className="font-semibold text-[#0494f4] hover:underline inline-flex items-center gap-1">
            <Mail className="w-3 h-3" aria-hidden="true" /> {COMPANY_INFO.email}
          </a>
        </div>
      </div>
    </div>
  );
};
