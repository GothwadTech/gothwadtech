import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Github, Linkedin, Mail, Award, MapPin, Calendar, Building2, Users, ExternalLink, ArrowRight } from 'lucide-react';

const leadership = [
  {
    name: 'Pawan Gothwad',
    role: 'Founder & Chief Visionary Officer',
    badge: 'Creator of Gothwad Browser — Chief Architect',
    initials: 'PG',
    gradient: 'from-[#0494f4] to-cyan-500',
    bio: 'Founding force behind Gothwad Tech and creator of Gothwad Browser. Passionate about sovereign deep tech and Aatmanirbhar Bharat — building infrastructure that beats Silicon Valley from Jaipur, Rajasthan.',
    focus: 'Product vision, browser engine, sovereign systems',
    email: 'pawan@gothwadtech.com',
    github: 'https://github.com/GothwadTech',
  },
  {
    name: 'Yuvkesh Meena',
    role: 'Chief Executive Officer (CEO)',
    badge: 'CEO — Dausa, Rajasthan • Leadership profile live',
    initials: 'YM',
    gradient: 'from-violet-600 to-indigo-600',
    bio: 'Leads Gothwad Tech’s full portfolio: communication, media, education, developer tools and enterprise platforms. Profile and bio published at ceo.gothwadtech.com.',
    focus: 'Company operations, institutional partnerships, growth',
    email: 'nishant@gothwadtech.com',
    github: 'https://ceo.gothwadtech.com',
    featured: true,
  },
  {
    name: 'Vishnu Meena',
    role: 'Co-Founder & CTO',
    badge: 'Core engineering & toolchain',
    initials: 'VM',
    gradient: 'from-emerald-600 to-teal-600',
    bio: 'Heads engineering toolchain and software infrastructure — compilers, bundlers, edge deployments and the core systems behind Mail, Drive and Meet.',
    focus: 'Infrastructure, edge, system toolchain',
    email: 'vishnu@gothwadtech.com',
    github: 'https://github.com/GothwadTech',
  },
  {
    name: 'Nishant',
    role: 'Chief Executive Officer',
    badge: 'Institutional partnerships & enterprise sales',
    initials: 'NS',
    gradient: 'from-orange-500 to-red-500',
    bio: 'Drives enterprise outreach and delivery oversight for school, retail and custom business systems — ensuring 4.95/5 client satisfaction and zero-downtime launches.',
    focus: 'Sales, delivery, SLA',
    email: 'nishant@gothwadtech.com',
    github: 'https://github.com/GothwadTech',
  },
];

const values = [
  { title: 'Aatmanirbhar Bharat, in code', desc: 'Source-available, edge-deployed, India-resident. Docs link directly to repos so you can audit and build.' },
  { title: 'A connected ecosystem', desc: 'Accounts → OAuth 2.0/PKCE → Mail, Drive, Meet, Store, Tube, GrixChat, Indogram, Browser — one sign-in, many apps.' },
  { title: 'Web & mobile, side by side', desc: 'Cloudflare Pages web apps + native Android for phones, tablets & Android TV launcher/manager.' },
  { title: 'Quality you can verify', desc: '≥85% line coverage on core logic, pipeline scanners, OWASP Top-10 and open issues/PRs.' },
];

export const CompanyPage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">
      <Breadcrumbs items={[{ name: 'Company', path: '/company' }]} onNavigate={onNavigate} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0494f4]/10 border border-[#0494f4]/20 text-[#0494f4] text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" /> About Gothwad Tech
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
            A sovereign software <span className="text-[#0494f4]">collective from India</span>
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Gothwad Tech engineers high-performance browsers, video & messaging platforms, education suites and enterprise web systems — from Jaipur, Rajasthan. We’re open by default: 30+ public repos, a source-cited docs portal, and a single Gothwad Account that powers the entire product catalog.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <a href="https://github.com/GothwadTech" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold">
              <Github className="w-4 h-4" /> Explore on GitHub
            </a>
            <a href="https://ceo.gothwadtech.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold">
              CEO profile <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a href="https://docs.gothwadtech.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0494f4] text-white text-xs font-bold">
              Read docs <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="flex flex-wrap gap-3 pt-2 text-xs text-zinc-600 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Jaipur, Rajasthan, India
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Founded 2023
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="w-3 h-3" /> 12 specialists
            </span>
            <span className="inline-flex items-center gap-1">
              <Award className="w-3 h-3" /> 4.95/5 satisfaction
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-3">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
              alt="Gothwad office"
              className="w-full h-36 object-cover rounded-2xl border border-zinc-200 dark:border-zinc-800"
            />
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="text-xs font-bold text-zinc-900 dark:text-white">12 specialists</div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">Web, Mobile, AI, Cloud & Security — one roster, many products.</div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-[#0494f4] text-white">
              <div className="text-xs font-bold">Mission</div>
              <div className="text-xs opacity-90 mt-1 leading-relaxed">Empower Aatmanirbhar Bharat in deep tech — sovereign browsers, messaging, education & enterprise platforms that outperform foreign systems.</div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80"
              alt="Team collaboration"
              className="w-full h-36 object-cover rounded-2xl border border-zinc-200 dark:border-zinc-800"
            />
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Leadership</h2>
          <a href="https://ceo.gothwadtech.com" target="_blank" rel="noreferrer" className="text-xs font-semibold text-[#0494f4] hover:underline inline-flex items-center gap-1">
            Full CEO site <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {leadership.map((m) => (
            <div key={m.name} className={`p-5 rounded-2xl bg-white dark:bg-zinc-900 border flex flex-col ${m.featured ? 'border-[#0494f4] ring-1 ring-[#0494f4]/20' : 'border-zinc-200 dark:border-zinc-800'}`}>
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${m.gradient} flex items-center justify-center text-white font-black text-sm shrink-0`}>
                  {m.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-zinc-900 dark:text-white">{m.name}</div>
                  <div className="text-xs font-semibold text-[#0494f4]">{m.role}</div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">{m.badge}</div>
                </div>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mt-3 flex-1">{m.bio}</p>
              <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
                Focus: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{m.focus}</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold">
                  <Mail className="w-3 h-3" /> Email
                </a>
                <a href={m.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold">
                  <Github className="w-3 h-3" /> Profile
                </a>
                {m.featured && (
                  <a href="https://ceo.gothwadtech.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0494f4] text-white text-xs font-bold ml-auto">
                    CEO site <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {values.map((v) => (
          <div key={v.title} className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="text-sm font-bold text-zinc-900 dark:text-white">{v.title}</div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-base font-bold text-zinc-900 dark:text-white">Where to go next</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <button onClick={() => onNavigate('ecosystem')} className="text-left p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-[#0494f4]/40 cursor-pointer">
            <div className="font-bold text-zinc-900 dark:text-white">Ecosystem</div>
            <div className="text-zinc-600 dark:text-zinc-400 mt-1">Every product tile with live links & GitHub sources.</div>
          </button>
          <button onClick={() => onNavigate('products')} className="text-left p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-[#0494f4]/40 cursor-pointer">
            <div className="font-bold text-zinc-900 dark:text-white">Sovereign apps</div>
            <div className="text-zinc-600 dark:text-zinc-400 mt-1">Deep dive on Browser, GrixChat & Indogram.</div>
          </button>
          <button onClick={() => onNavigate('docs')} className="text-left p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-[#0494f4]/40 cursor-pointer">
            <div className="font-bold text-zinc-900 dark:text-white">Docs</div>
            <div className="text-zinc-600 dark:text-zinc-400 mt-1">Setup guides, OAuth/PKCE & API reference.</div>
          </button>
          <button onClick={() => onNavigate('contact')} className="text-left p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-[#0494f4]/40 cursor-pointer">
            <div className="font-bold text-zinc-900 dark:text-white">Contact</div>
            <div className="text-zinc-600 dark:text-zinc-400 mt-1">Business, support, help — email & WhatsApp.</div>
          </button>
        </div>
      </section>
    </div>
  );
};
