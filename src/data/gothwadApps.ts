/**
 * GOTHWAD ECOSYSTEM — product catalog
 *
 * Ported from the Accounts repo (accounts/web/js/gothwad-apps.js) so the two
 * stay in sync. If you add a product there, add it here too.
 *
 * `core: true`  = a Gothwad Service: connected to the account automatically,
 *                 cannot be revoked by the user (Mail, Drive, Meet, ...).
 * `core: false` = "Sign in with Gothwad" app: the user can disconnect it
 *                 (Tube, GrixChat, Indogram, ...).
 *
 * NOTE: account domain is intentionally NOT hardcoded here — see
 * src/data/portalConfig.ts (Rule #1 from the Accounts repo).
 */

import type { LucideIcon } from 'lucide-react';
import {
  Mail,
  HardDrive,
  Video,
  Play,
  ShoppingBag,
  FileText,
  CalendarDays,
  Users,
  MessageCircle,
  Send,
  Globe,
  GraduationCap,
  Sparkles,
  FolderTree,
} from 'lucide-react';

export interface GothwadApp {
  id: string;
  name: string;
  /** Subdomain only — the full URL is built with the configured root domain. */
  host: string;
  icon: LucideIcon;
  description: string;
  core: boolean;
  /** Tailwind classes for the tile icon chip. */
  accent: string;
}

export const GOTHWAD_SERVICES: GothwadApp[] = [
  {
    id: 'gothwad-mail',
    name: 'Mail',
    host: 'mail',
    icon: Mail,
    description: 'Your Gothwad inbox',
    core: true,
    accent: 'bg-[#0494f4]',
  },
  {
    id: 'gothwad-drive',
    name: 'Drive',
    host: 'drive',
    icon: HardDrive,
    description: 'Files and folders',
    core: true,
    accent: 'bg-emerald-500',
  },
  {
    id: 'gothwad-meet',
    name: 'Meet',
    host: 'meet',
    icon: Video,
    description: 'Video meetings',
    core: true,
    accent: 'bg-amber-500',
  },
  {
    id: 'gothwad-notes',
    name: 'Notes',
    host: 'notes',
    icon: FileText,
    description: 'Notes and lists, synced',
    core: true,
    accent: 'bg-rose-500',
  },
  {
    id: 'gothwad-calendar',
    name: 'Calendar',
    host: 'calender', // NB: DNS record really is spelled "calender"
    icon: CalendarDays,
    description: 'Events and reminders',
    core: true,
    accent: 'bg-violet-500',
  },
  {
    id: 'gothwad-contacts',
    name: 'Contacts',
    host: 'contacts',
    icon: Users,
    description: 'People and addresses',
    core: true,
    accent: 'bg-cyan-500',
  },
  {
    id: 'gothwad-store',
    name: 'Store',
    host: 'store',
    icon: ShoppingBag,
    description: 'Apps and add-ons',
    core: true,
    accent: 'bg-orange-500',
  },
];

export const GOTHWAD_PRODUCTS: GothwadApp[] = [
  {
    id: 'gothwad-tube',
    name: 'Tube',
    host: 'tube',
    icon: Play,
    description: 'Video, PlusTube',
    core: false,
    accent: 'bg-red-600',
  },
  {
    id: 'gothwad-chat',
    name: 'GrixChat',
    host: 'grixchat',
    icon: MessageCircle,
    description: 'Messaging',
    core: false,
    accent: 'bg-teal-500',
  },
  {
    id: 'gothwad-indogram',
    name: 'Indogram',
    host: 'indogram',
    icon: Send,
    description: 'Telegram-style chat',
    core: false,
    accent: 'bg-sky-500',
  },
  {
    id: 'gothwad-education',
    name: 'Education',
    host: 'education',
    icon: GraduationCap,
    description: 'School & learning platform',
    core: false,
    accent: 'bg-indigo-500',
  },
  {
    id: 'gothwad-ai',
    name: 'AI Studio',
    host: 'ai',
    icon: Sparkles,
    description: 'Developer workspace',
    core: false,
    accent: 'bg-fuchsia-500',
  },
  {
    id: 'gothwad-clashdrive',
    name: 'ClashDrive',
    host: 'clashdrive',
    icon: FolderTree,
    description: 'Telegram-backed storage',
    core: false,
    accent: 'bg-lime-600',
  },
];

export const GOTHWAD_APPS: GothwadApp[] = [...GOTHWAD_SERVICES, ...GOTHWAD_PRODUCTS];

/** Services first (account-connected), then the rest. */
export function appUrl(app: GothwadApp, rootDomain: string): string {
  return `https://${app.host}.${rootDomain}`;
}

/** Mechanical turk for the launcher grid — keeps icon lookup type-safe. */
export function findApp(id: string): GothwadApp | undefined {
  return GOTHWAD_APPS.find((a) => a.id === id);
}

export const Company: { icon: LucideIcon; id: string } = {
  id: 'gothwad-company',
  icon: Globe,
};
