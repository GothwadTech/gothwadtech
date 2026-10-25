import pageMeta from '../data/pageMeta.json';
import { buildAccountSlotPath, parseAuthuserFromUrl, stripAuthuserPath } from '../config/brand';

export type PageKey = keyof typeof pageMeta;

export const PAGE_KEYS = Object.keys(pageMeta) as PageKey[];

export const HOME: PageKey = 'home';

/** Legacy URLs / hash routes kept alive. */
const ROUTE_ALIASES: Record<string, string> = {
  about: 'company',
  portfolio: 'ecosystem',
  browser: 'products',
  leadership: 'company',
  legacy: 'ecosystem',
};

export function isPageKey(value: string): value is PageKey {
  return (PAGE_KEYS as string[]).includes(value);
}

/** `/u/2/docs` → 'docs'; unknown paths → null (so we can render a real 404). */
export function pageFromPathname(pathname: string): PageKey | null {
  const segment = stripAuthuserPath(pathname).split('/').filter(Boolean)[0]?.toLowerCase() ?? '';
  if (!segment) return HOME;
  const target = ROUTE_ALIASES[segment] ?? segment;
  return isPageKey(target) ? target : null;
}

export function pageFromHash(hash: string): PageKey | null {
  const raw = hash.replace(/^#/, '').toLowerCase().trim();
  if (!raw) return null;
  const target = ROUTE_ALIASES[raw] ?? raw;
  return isPageKey(target) ? target : null;
}

export function pathForPage(page: PageKey): string {
  return pageMeta[page].path;
}

/** Canonical/base path with any `/u/<n>/` account slot removed. */
export function canonicalPathForPage(page: PageKey): string {
  return pathForPage(page);
}

/** Real `href` for a route, preserving the `/u/<n>/` slot when one is in the URL. */
export function hrefForPage(page: PageKey, authuser?: number, hasSlot?: boolean): string {
  const base = pathForPage(page);
  const resolved = authuser ?? parseAuthuserFromUrl().authuser;
  const useSlot = hasSlot ?? parseAuthuserFromUrl().hasExplicitSlot;
  if (!useSlot) return base;
  return `${buildAccountSlotPath(resolved)}${base === '/' ? '' : base.slice(1)}`;
}

/** Primary navigation, in display order. */
export const NAV_PAGES: PageKey[] = ['ecosystem', 'products', 'solutions', 'docs', 'company'];
