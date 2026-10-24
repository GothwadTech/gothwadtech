import React from 'react';
import {
  Compass,
  MessageSquare,
  Send,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  Building2,
  Mail,
  HardDrive,
  Play,
  Video,
} from 'lucide-react';

const SOVEREIGN = [
  {
    id: 'browser',
    name: 'Gothwad Browser',
    tagline: 'World’s lightest sovereign browser — 11.8 MB',
    description:
      'Rust/C++ microkernel: 180ms cold launch, 75% less RAM than Chrome, TurboShield ad-block, 16-thread downloader, zero telemetry. Built for Android phones & TVs.',
    bullets: ['11.8 MB package (8× lighter than Chrome)', '142 MB for 10 tabs vs 580 MB Chrome', 'TurboShield 99.4% ad-block rate'],
    stats: [
      { k: 'Pkg size', v: '11.8 MB' },
      { k: 'RAM saved', v: '75%' },
      { k: 'Cold launch', v: '0.18s' },
      { k: 'Ad-block', v: '99.4%' },
    ],
    links: [
      { label: 'Open browser.gothwadtech.com', href: 'https://browser.gothwadtech.com' },
      { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=com.gothwad.browser' },
      { label: 'GitHub — browser', href: 'https://github.com/GothwadTech/browser' },
    ],
    color: 'text-[#0494f4]',
    bg: 'bg-[#0494f4]/10 border-[#0494f4]/20',
  },
  {
    id: 'grixchat',
    name: 'GrixChat',
    tagline: 'NextGen real-time messenger — <15ms dispatch',
    description:
      'Instant text, HD voice/video, 2GB file shares, channels, stories & instant web sync. WebSockets backend, adaptive bitrate even on 2G/3G.',
    bullets: ['<15ms delivery latency', '2 GB max file share (4K uncompressed)', 'Multi-device instant sync (phone → web)'],
    stats: [
      { k: 'Latency', v: '<15ms' },
      { k: 'Files', v: '2 GB' },
      { k: 'Call', v: 'HD 60fps' },
      { k: 'Sync', v: 'Instant' },
    ],
    links: [
      { label: 'Open grixchat.gothwadtech.com', href: 'https://grixchat.gothwadtech.com' },
      { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=com.gothwad.grixchat' },
      { label: 'GitHub — grixchat', href: 'https://github.com/GothwadTech/grixchat' },
    ],
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    id: 'indogram',
    name: 'Indogram',
    tagline: 'Sovereign cloud messenger & communities — 200k members',
    description:
      'Telegram-style cloud with infinite storage, 200k-member supergroups, bot runtime, mini-apps & pure multi-device login (no phone needed).',
    bullets: ['200,000+ members per community', 'Unlimited cloud storage & instant search', 'Bots, mini-apps & independent logins'],
    stats: [
      { k: 'Community', v: '200k+' },
      { k: 'Storage', v: '∞' },
      { k: 'Bots', v: 'Runtime' },
      { k: 'Devices', v: 'Pure cloud' },
    ],
    links: [
      { label: 'Open indogram.gothwadtech.com', href: 'https://indogram.gothwadtech.com' },
      { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=com.gothwad.indogram' },
      { label: 'GitHub — Indogram', href: 'https://github.com/GothwadTech/indogramapp' },
    ],
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-500/10 border-sky-500/20',
  },
];

export const ProductsPage: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0494f4]/10 border border-[#0494f4]/20 text-[#0494f4] text-xs font-bold uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5" /> Sovereign Tech
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
          Sovereign apps — <span className="text-[#0494f4]">born in Bharat</span>
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Three flagships built under Aatmanirbhar Bharat. Each is fast on low-end devices, sovereign by design (data in India), and ships with full public source and Play Store builds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {SOVEREIGN.map((p) => (
          <div
            key={p.id}
            className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col"
          >
            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${p.bg} ${p.color} mb-4`}>
              {p.id === 'browser' && <Compass className="w-6 h-6" />}
              {p.id === 'grixchat' && <MessageSquare className="w-6 h-6" />}
              {p.id === 'indogram' && <Send className="w-6 h-6" />}
            </div>
            <h3 className="text-lg font-extrabold text-zinc-900 dark:text-white">{p.name}</h3>
            <div className={`text-xs font-semibold mt-1 ${p.color}`}>{p.tagline}</div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mt-3">{p.description}</p>

            <div className="mt-4 space-y-2">
              {p.bullets.map((b) => (
                <div key={b} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${p.color}`} />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-5 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-center">
              {p.stats.map((s) => (
                <div key={s.k}>
                  <div className="text-[10px] text-zinc-500 dark:text-zinc-500">{s.k}</div>
                  <div className="text-sm font-bold text-zinc-900 dark:text-white font-mono">{s.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-1.5">
              {p.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-[#0494f4]/40 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-[#0494f4] transition-colors"
                >
                  <span>{l.label}</span> <ArrowRight className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <section className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Full Gothwad product catalog</h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              Direct subdomain access for every product. See Ecosystem for all 25+ items with filters.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://accounts.gothwadtech.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-[#0494f4] text-white text-xs font-bold"
            >
              Open Accounts
            </a>
            <a
              href="https://docs.gothwadtech.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
            >
              Read docs
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(
            [
              { Icon: Mail, name: 'Gothwad Mail', href: 'https://mail.gothwadtech.com', desc: 'Inbox on the edge — D1 + Workers + account sync.' },
              {
                Icon: HardDrive,
                name: 'Gothwad Drive',
                href: 'https://drive.gothwadtech.com',
                desc: 'Files, shares and previews. Telegram-backed extension via ClashDrive.',
              },
              { Icon: Play, name: 'Gothwad Tube', href: 'https://tube.gothwadtech.com', desc: 'PlusTube app & web. One login with Gothwad Account.' },
              { Icon: Video, name: 'Gothwad Meet', href: 'https://meet.gothwadtech.com', desc: 'WebRTC P2P video. Share a link and meet.' },
              {
                Icon: Building2,
                name: 'Gothwad Store',
                href: 'https://store.gothwadtech.com',
                desc: 'Kiwi Store — open-source app HUB by Gothwad & Dark Root.',
              },
              {
                Icon: Smartphone,
                name: 'Remote Desktop',
                href: 'https://remotedesk.gothwadtech.com',
                desc: 'Zero-database Pages portal: Win11 + Hyper-V VM, WebRTC P2P.',
              },
            ] as const
          ).map((item) => {
            const Icon = item.Icon;
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-[#0494f4]/40 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-zinc-900 dark:text-white">{item.name}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{item.desc}</div>
                  <div className="text-[11px] font-mono text-[#0494f4] mt-1">{new URL(item.href).hostname}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
};
