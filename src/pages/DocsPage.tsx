import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  Rocket,
  Layers,
  Fingerprint,
  Mail,
  KeyRound,
  Cloud,
  Code2,
  ShieldCheck,
  BookOpen,
  Play,
  Globe2,
  MessageCircle,
  Video,
  Monitor,
  GraduationCap,
  FolderOpen,
  Braces,
  Building2,
  Search,
  HardDrive,
  ArrowRight,
  Github,
  ExternalLink,
} from 'lucide-react';

type Doc = {
  slug: string;
  title: string;
  desc: string;
  section: string;
  icon: any;
  repo?: string;
  time: string;
};

const docs: Doc[] = [
  { slug: 'quickstart', title: 'Start building with Gothwad', desc: 'Choose a product, prepare your environment, and run your first project.', section: 'Getting started', icon: Rocket, time: '5 min' },
  { slug: 'architecture', title: 'The Gothwad ecosystem', desc: 'Understand how identity, Workers, web apps, and native products fit together.', section: 'Getting started', icon: Layers, time: '6 min' },
  { slug: 'accounts', title: 'Gothwad Accounts', desc: 'One identity for your ecosystem. Authentication, sessions, and OAuth 2.0.', section: 'Products', icon: Fingerprint, repo: 'accounts', time: '5 min' },
  { slug: 'mail', title: 'Gothwad Mail', desc: 'Your inbox, connected. Send, receive, and manage email on the edge.', section: 'Products', icon: Mail, repo: 'mail', time: '5 min' },
  { slug: 'tube', title: 'Gothwad Tube', desc: 'A better way to watch. Explore the PlusTube app and its web platform.', section: 'Products', icon: Play, repo: 'tubeweb', time: '5 min' },
  { slug: 'browser', title: 'Gothwad Browser', desc: 'Built for the bigger screen. Browsing for Android TVs, tablets, and more.', section: 'Products', icon: Globe2, repo: 'browser', time: '5 min' },
  { slug: 'grixchat', title: 'GrixChat', desc: 'Bring conversations together with real-time messaging and private calls.', section: 'Products', icon: MessageCircle, repo: 'grixchat', time: '5 min' },
  { slug: 'meet', title: 'Gothwad Meet', desc: 'Connect face to face. Peer-to-peer video meetings, powered by WebRTC.', section: 'Products', icon: Video, repo: 'meet', time: '5 min' },
  { slug: 'launcher', title: 'Gothwad Launcher', desc: 'A native Android TV home screen with remote-first navigation.', section: 'Products', icon: Monitor, repo: 'launcher', time: '5 min' },
  { slug: 'manager', title: 'Gothwad Manager', desc: 'File management and archive tools for Android devices.', section: 'Products', icon: FolderOpen, repo: 'manager', time: '5 min' },
  { slug: 'education', title: 'Gothwad Education', desc: 'School administration and learning for teachers, students, and parents.', section: 'Products', icon: GraduationCap, repo: 'education', time: '5 min' },
  { slug: 'clashdrive', title: 'Clash Drive', desc: 'Turn Telegram forum topics into a browser-based storage workspace.', section: 'Products', icon: HardDrive, repo: 'Clashdrive', time: '5 min' },
  { slug: 'ai', title: 'Gothwad AI', desc: 'Get oriented with the AI Studio application and local development setup.', section: 'Products', icon: Braces, repo: 'ai', time: '5 min' },
  { slug: 'gothwadtech', title: 'Gothwad Tech website', desc: 'Explore the corporate web platform, components, and developer entry points.', section: 'Products', icon: Building2, repo: 'gothwadtech', time: '5 min' },
  { slug: 'accounts-setup', title: 'Set up Gothwad Accounts', desc: 'Configure Supabase, deploy the auth Worker, and publish the Accounts frontend.', section: 'Guides', icon: Fingerprint, repo: 'accounts', time: '12 min' },
  { slug: 'oauth', title: 'Integrate Sign in with Gothwad', desc: 'Implement the authorization-code flow with PKCE, state validation, and user info.', section: 'Guides', icon: KeyRound, repo: 'accounts', time: '10 min' },
  { slug: 'mail-setup', title: 'Deploy Gothwad Mail', desc: 'Connect Accounts, configure the Mail database and Worker, and enable email routing.', section: 'Guides', icon: Mail, repo: 'mail', time: '12 min' },
  { slug: 'cloudflare', title: 'Deploy to Cloudflare Pages', desc: 'Build and publish this documentation site, with working deep links and a custom domain.', section: 'Guides', icon: Cloud, time: '6 min' },
  { slug: 'api', title: 'API reference', desc: 'Explore the documented Accounts OAuth and Mail REST endpoints.', section: 'Resources', icon: Code2, time: '8 min' },
  { slug: 'security', title: 'Security & configuration', desc: 'Handle secrets, sessions, public variables, and production configuration safely.', section: 'Resources', icon: ShieldCheck, time: '5 min' },
  { slug: 'contributing', title: 'Contribute to the docs', desc: 'Add an MDX guide, cite its source, and validate changes locally.', section: 'Resources', icon: BookOpen, time: '4 min' },
];

const grouped = docs.reduce((acc, d) => {
  acc[d.section] = acc[d.section] || [];
  acc[d.section].push(d);
  return acc;
}, {} as Record<string, Doc[]>);

export const DocsPage: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      <Breadcrumbs items={[{ name: 'Docs', path: '/docs' }]} />
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0494f4]/10 border border-[#0494f4]/20 text-[#0494f4] text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" /> Developer Documentation
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
          Gothwad Tech — <span className="text-[#0494f4]">Developer Documentation</span>
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          A central, source-based documentation portal for the Gothwad Tech ecosystem. Browse product docs, OAuth/PKCE integration, Mail setup & REST reference, PlusTube web, Meet, GrixChat and more. Every guide cites its source repo and file.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <a href="https://docs.gothwadtech.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0494f4] text-white text-xs font-bold">
            Open docs.gothwadtech.com <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a href="https://github.com/GothwadTech/docs" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold">
            <Github className="w-3.5 h-3.5" /> Source: docs repo
          </a>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-500 px-2">
            Also on GitHub: <a href="https://github.com/GothwadTech/docs/blob/main/SOURCES.md" target="_blank" rel="noreferrer" className="text-[#0494f4] hover:underline">SOURCES.md</a>
          </span>
        </div>
      </div>

      {/* Search look-alike */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <Search className="w-4 h-4 text-zinc-400" />
        <div className="text-xs text-zinc-600 dark:text-zinc-400">
          In the real docs site you can press <kbd className="px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-[10px]">Ctrl</kbd> +{' '}
          <kbd className="px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-[10px]">K</kbd> to search all guides. Below is the full index as of today.
        </div>
        <a href="https://docs.gothwadtech.com" target="_blank" rel="noreferrer" className="ml-auto hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold">
          Try it <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      {Object.entries(grouped).map(([section, items]) => (
        <section key={section} className="space-y-3">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <span className="w-1 h-5 rounded-full bg-[#0494f4]" /> {section}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((d) => {
              const Icon = d.icon;
              const url = d.repo ? `https://docs.gothwadtech.com/docs/${d.slug}` : `https://docs.gothwadtech.com/docs/${d.slug}`;
              const githubUrl = d.repo ? `https://github.com/GothwadTech/${d.repo}` : undefined;
              return (
                <div
                  key={d.slug}
                  className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-[#0494f4]/30 transition-colors flex flex-col"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                      {d.time}
                    </span>
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-zinc-900 dark:text-white">{d.title}</h3>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1">{d.desc}</p>
                  {d.repo && (
                    <div className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-500">
                      Source: <code>{d.repo}/{d.slug === 'accounts-setup' || d.slug === 'oauth' ? (d.slug === 'oauth' ? 'docs/OAUTH.md' : 'docs/SETUP.md') : 'README.md'}</code>
                    </div>
                  )}
                  <div className="mt-3 flex items-center gap-2">
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white text-xs font-semibold"
                    >
                      Read <ArrowRight className="w-3 h-3" />
                    </a>
                    {githubUrl && (
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold inline-flex items-center gap-1"
                      >
                        <Github className="w-3.5 h-3.5" /> Repo
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
        <div className="text-sm font-bold text-zinc-900 dark:text-white">Documentation boundary</div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
          Docs cover what you need to integrate and deploy: setup flows, OAuth/PKCE, REST endpoints, and per-product orientations. Private credentials, worker secrets and non-public deployment variables are never documented here — see each repo’s <code>docs/SETUP.md</code> + <code>wrangler.toml</code> for the safe boundary.
        </p>
      </div>
    </div>
  );
};
