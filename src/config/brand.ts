export const DEFAULT_APP_DOMAIN = "gothwadtech.com";

type ViteEnv = Record<string, string | undefined>;

function readViteEnv(key: string): string {
  try {
    const env = (import.meta as ImportMeta & { env?: ViteEnv }).env;
    if (env) {
      const val = env[key];
      if (typeof val === "string" && val.trim()) return val.trim();
    }
  } catch {
    /* import.meta.env is unavailable outside Vite — fall back to the default */
  }
  return "";
}

function origin(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/+$/, "");
}

export const APP_DOMAIN = origin(readViteEnv("VITE_APP_DOMAIN") || DEFAULT_APP_DOMAIN);

export const ACCOUNTS_WEB_ORIGIN = (
  readViteEnv("VITE_ACCOUNTS_WEB_URL") || `https://accounts.${APP_DOMAIN}`
).replace(/\/+$/, "");

export const ACCOUNTS_API_ORIGIN = (
  readViteEnv("VITE_ACCOUNTS_API_URL") || `https://api.${APP_DOMAIN}`
).replace(/\/+$/, "");

/** Session fallbacks. Same as Mail/Drive — each app has its own Worker. */
export const DRIVE_ORIGIN = (
  readViteEnv("VITE_DRIVE_URL") || `https://drive.${APP_DOMAIN}`
).replace(/\/+$/, "");

export const MAIL_ORIGIN = (
  readViteEnv("VITE_MAIL_URL") || `https://mail.${APP_DOMAIN}`
).replace(/\/+$/, "");

export const ECOSYSTEM_NAME = "Gothwad";

export function formatGothwadEmail(username: string, domain = APP_DOMAIN): string {
  const clean = String(username || "").trim().toLowerCase();
  if (!clean) return "";
  return clean.includes("@") ? clean : `${clean}@${domain}`;
}

export function buildAccountSlotPath(authuser: number): string {
  const slot = Number.isInteger(authuser) && authuser >= 0 && authuser <= 5 ? authuser : 0;
  return `/u/${slot}/`;
}

export function parseAuthuserFromUrl(
  pathname = typeof window !== "undefined" ? window.location.pathname : "/",
  search = typeof window !== "undefined" ? window.location.search : ""
): { authuser: number; hasExplicitSlot: boolean } {
  const pathMatch = pathname.match(/^\/u\/([0-5])(?:\/|$)/);
  if (pathMatch) return { authuser: Number.parseInt(pathMatch[1], 10), hasExplicitSlot: true };
  try {
    const params = new URLSearchParams(search);
    const q = params.get("authuser")?.trim() || params.get("u")?.trim();
    if (q && /^[0-5]$/.test(q)) return { authuser: Number.parseInt(q, 10), hasExplicitSlot: true };
  } catch {
    /* malformed query string — treat as no slot */
  }
  return { authuser: 0, hasExplicitSlot: false };
}

export function buildSignInUrl(
  nextUrl = typeof window !== "undefined" ? window.location.href : `https://${APP_DOMAIN}`,
  opts: { choose?: boolean; add?: boolean } = {}
): string {
  const params = new URLSearchParams();
  if (opts.choose) params.set("choose", "1");
  if (opts.add) params.set("add", "1");
  params.set("next", nextUrl);
  return `${ACCOUNTS_WEB_ORIGIN}/signin?${params.toString()}`;
}

export function buildManageAccountUrl(authuser = 0): string {
  const slot = Number.isInteger(authuser) && authuser >= 0 && authuser <= 5 ? authuser : 0;
  return `${ACCOUNTS_WEB_ORIGIN}/u/${slot}/me`;
}

// strip /u/<n>/ prefix for SPA routing
export function stripAuthuserPath(pathname: string): string {
  if (/^\/u\/[0-5](?:\/|$)/.test(pathname)) {
    const rest = pathname.replace(/^\/u\/[0-5]/, "") || "/";
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return pathname;
}
