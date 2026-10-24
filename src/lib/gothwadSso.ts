import {
  ACCOUNTS_API_ORIGIN,
  ACCOUNTS_WEB_ORIGIN,
  buildAccountSlotPath,
  buildSignInUrl,
  formatGothwadEmail,
  parseAuthuserFromUrl,
} from "../config/brand";

export const DEFAULT_API_TIMEOUT_MS = 8000;

export interface GothwadSsoUser {
  id: string;
  username?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  name: string;
  avatarUrl?: string | null;
  avatar_url?: string | null;
}

export interface GothwadAccountItem {
  id: string;
  authuser: number;
  username?: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  avatarUrl?: string | null;
  avatar_url?: string | null;
  accountUrl?: string | null;
}

export type ServiceErrorKind = "none" | "routing_html" | "http_5xx" | "rate_limited" | "network" | "timeout" | "redirect";

export interface FetchMeResult {
  status: "authenticated" | "anonymous" | "error";
  authenticated: boolean;
  activeId: string | null;
  authuser: number;
  user: GothwadSsoUser | null;
  accounts: GothwadAccountItem[];
  errorKind: ServiceErrorKind;
  errorMessage: string | null;
}

function normalizeClientUser(raw: any): GothwadSsoUser | null {
  if (!raw || typeof raw !== "object") return null;
  const id = String(raw.id || raw.userId || "").trim();
  const rawEmail = String(raw.email || "").trim().toLowerCase();
  const username = String(raw.username || (rawEmail ? rawEmail.split("@")[0] : "")).trim().toLowerCase();
  if (!id || !username) return null;
  const firstName = String(raw.firstName ?? raw.first_name ?? "").trim();
  const lastName = String(raw.lastName ?? raw.last_name ?? "").trim();
  const name = String(raw.name || `${firstName} ${lastName}`.trim() || username).trim();
  const avatarUrl = raw.avatarUrl ?? raw.avatar_url ?? null;
  return { id, username, email: formatGothwadEmail(raw.email || username), firstName, lastName, name, avatarUrl: avatarUrl ? String(avatarUrl) : null, avatar_url: avatarUrl ? String(avatarUrl) : null };
}

function normalizeClientAccount(raw: any, idx: number): GothwadAccountItem {
  const username = String(raw?.username || "").trim().toLowerCase();
  const firstName = String(raw?.firstName ?? raw?.first_name ?? "").trim();
  const lastName = String(raw?.lastName ?? raw?.last_name ?? "").trim();
  const name = String(raw?.name || `${firstName} ${lastName}`.trim() || username || "Account").trim();
  const authuser = Number.isInteger(raw?.authuser) ? Number(raw.authuser) : idx;
  const avatarUrl = raw?.avatarUrl ?? raw?.avatar_url ?? null;
  return {
    id: String(raw?.id || raw?.slot || "a"),
    authuser,
    username,
    name,
    firstName,
    lastName,
    email: formatGothwadEmail(raw?.email || username),
    avatarUrl: avatarUrl ? String(avatarUrl) : null,
    avatar_url: avatarUrl ? String(avatarUrl) : null,
    accountUrl: raw?.accountUrl || `${ACCOUNTS_WEB_ORIGIN}/u/${authuser}/me`,
  };
}

export function getCurrentAuthuser(): number {
  return parseAuthuserFromUrl().authuser;
}
export const slotUrl = buildAccountSlotPath;
export const buildSsoSignInUrl = buildSignInUrl;

function buildAuthuserHeaders(authuser?: number): Record<string, string> {
  const h: Record<string, string> = { Accept: "application/json" };
  if (Number.isInteger(authuser) && authuser! >= 0 && authuser! <= 5) h["X-Gothwad-Authuser"] = String(authuser);
  return h;
}

async function fetchBounded(url: string, init: RequestInit, timeoutMs = DEFAULT_API_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new Error("RequestTimeout")), timeoutMs);
  try {
    return await fetch(url, { ...init, cache: "no-store", redirect: "manual", signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchGothwadSession(authuser = 0): Promise<FetchMeResult> {
  const headers = buildAuthuserHeaders(authuser);
  const endpoint = `${ACCOUNTS_API_ORIGIN}/api/me`;
  try {
    const res = await fetchBounded(endpoint, { method: "GET", credentials: "include", headers });
    if (res.type === "opaqueredirect" || (res as any).redirected || (res.status >= 300 && res.status < 400)) {
      return { status: "error", authenticated: false, activeId: null, authuser, user: null, accounts: [], errorKind: "redirect", errorMessage: "Identity redirect" };
    }
    const ct = (res.headers.get("content-type") || "").toLowerCase();
    if (ct.includes("text/html")) {
      return { status: "error", authenticated: false, activeId: null, authuser, user: null, accounts: [], errorKind: "routing_html", errorMessage: "HTML response" };
    }
    if (res.status === 429) return { status: "error", authenticated: false, activeId: null, authuser, user: null, accounts: [], errorKind: "rate_limited", errorMessage: "Rate limited" };
    const data: any = await res.json().catch(() => null);
    if (res.ok && data?.authenticated && data?.user) {
      const user = normalizeClientUser(data.user);
      if (!user) return { status: "error", authenticated: false, activeId: null, authuser, user: null, accounts: [], errorKind: "http_5xx", errorMessage: "Bad payload" };
      const accounts: GothwadAccountItem[] = Array.isArray(data.accounts) && data.accounts.length > 0
        ? data.accounts.map((a: any, i: number) => normalizeClientAccount(a, i))
        : [normalizeClientAccount({ ...user, id: data.activeId || "a", authuser: data.authuser ?? authuser }, 0)];
      return { status: "authenticated", authenticated: true, activeId: String(data.activeId || accounts[0]?.id || "a"), authuser: Number.isInteger(data.authuser) ? Number(data.authuser) : authuser, user, accounts, errorKind: "none", errorMessage: null };
    }
    if (res.status === 200 || res.status === 401) {
      return { status: "anonymous", authenticated: false, activeId: null, authuser, user: null, accounts: [], errorKind: "none", errorMessage: null };
    }
    if (res.status >= 500) return { status: "error", authenticated: false, activeId: null, authuser, user: null, accounts: [], errorKind: "http_5xx", errorMessage: data?.message || `HTTP ${res.status}` };
    return { status: "anonymous", authenticated: false, activeId: null, authuser, user: null, accounts: [], errorKind: "none", errorMessage: null };
  } catch (err: any) {
    const msg = err?.message || String(err);
    if (msg.includes("RequestTimeout") || err?.name === "AbortError") {
      return { status: "error", authenticated: false, activeId: null, authuser, user: null, accounts: [], errorKind: "timeout", errorMessage: "Timeout" };
    }
    return { status: "error", authenticated: false, activeId: null, authuser, user: null, accounts: [], errorKind: "network", errorMessage: "Network error" };
  }
}

export const fetchSsoMe = fetchGothwadSession;

// Helpers for switch / signout — mirrored from drive
export async function switchGothwadAccountSlot(slotId: string, authuser: number): Promise<{ ok: boolean; error?: string }> {
  const headers: Record<string, string> = { ...buildAuthuserHeaders(authuser), "Content-Type": "application/json" };
  try {
    const res = await fetchBounded(`${ACCOUNTS_API_ORIGIN}/api/auth/switch`, { method: "POST", credentials: "include", headers, body: JSON.stringify({ id: slotId, authuser }) });
    const ct = (res.headers.get("content-type") || "").toLowerCase();
    if (ct.includes("application/json")) {
      const data: any = await res.json().catch(() => null);
      if (res.ok && data?.ok !== false) return { ok: true };
      return { ok: false, error: data?.message || `Switch failed (${res.status})` };
    }
    return { ok: res.ok };
  } catch { return { ok: false, error: "Network error" }; }
}

export async function signOutGothwadSlot(slotId?: string, authuser = 0): Promise<{ ok: boolean }> {
  const path = slotId ? `/api/auth/accounts/${encodeURIComponent(slotId)}/signout` : "/api/auth/signout";
  const headers: Record<string, string> = { ...buildAuthuserHeaders(authuser), "Content-Type": "application/json" };
  try {
    const res = await fetchBounded(`${ACCOUNTS_API_ORIGIN}${path}`, { method: "POST", credentials: "include", headers, body: "{}" });
    return { ok: res.ok };
  } catch { return { ok: false }; }
}
export const signOutSsoSlot = (slotId: string, authuser = 0) => signOutGothwadSlot(slotId, authuser);
export const signOutAllSso = (authuser = 0) => signOutGothwadSlot(undefined, authuser);
