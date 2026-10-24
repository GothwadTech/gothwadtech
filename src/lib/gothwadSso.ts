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

// Try candidates in order — mirrors Drive/Mail where each app has its own Worker at its subdomain
// Website apex has no Worker yet, so we fall back to Drive/Mail which DO have CORS for gothwadtech.com + e2b.app
const ME_CANDIDATES = [
  "/api/me", // relative — works when website deploys its own Worker (future), same as Drive
  "https://drive.gothwadtech.com/api/me", // Drive Worker — allows gothwadtech.com, *.gothwadtech.com, e2b.app
  "https://mail.gothwadtech.com/api/session?meta=0", // Mail identity — same CORS
  `${ACCOUNTS_API_ORIGIN}/api/me`, // direct Accounts API — last resort
];

async function fetchOneMe(candidate: string, authuser: number): Promise<{ res: Response | null; err?: any }> {
  try {
    const headers = buildAuthuserHeaders(authuser);
    const res = await fetchBounded(candidate, { method: "GET", credentials: "include", headers });
    return { res };
  } catch (e) {
    return { res: null, err: e };
  }
}

export async function fetchGothwadSession(authuser = 0): Promise<FetchMeResult> {
  let lastError: any = null;
  for (const endpoint of ME_CANDIDATES) {
    const { res, err } = await fetchOneMe(endpoint, authuser);
    if (err) {
      lastError = err;
      continue; // try next candidate
    }
    if (!res) continue;
    // Handle redirect / HTML as "try next" — not a real JSON API
    if (res.type === "opaqueredirect" || (res as any).redirected || (res.status >= 300 && res.status < 400)) {
      continue;
    }
    const ct = (res.headers.get("content-type") || "").toLowerCase();
    if (ct.includes("text/html")) continue;
    if (res.status === 429) return { status: "error", authenticated: false, activeId: null, authuser, user: null, accounts: [], errorKind: "rate_limited", errorMessage: "Rate limited" };
    // Some endpoints return 401 JSON with unauthenticated, some 200 with authenticated:false
    let data: any = null;
    try {
      data = await res.clone().json();
    } catch {
      // if not JSON, try next candidate
      continue;
    }
    if (res.ok && data?.authenticated && data?.user) {
      const user = normalizeClientUser(data.user);
      if (!user) continue;
      const accounts: GothwadAccountItem[] = Array.isArray(data.accounts) && data.accounts.length > 0
        ? data.accounts.map((a: any, i: number) => normalizeClientAccount(a, i))
        : [normalizeClientAccount({ ...user, id: data.activeId || "a", authuser: data.authuser ?? authuser }, 0)];
      return { status: "authenticated", authenticated: true, activeId: String(data.activeId || accounts[0]?.id || "a"), authuser: Number.isInteger(data.authuser) ? Number(data.authuser) : authuser, user, accounts, errorKind: "none", errorMessage: null };
    }
    // Anonymous is a valid answer — stop trying candidates
    if (res.status === 200 || res.status === 401) {
      // Mail returns 200 with authenticated:false, Drive returns 401 when no cookie
      if (data && data.authenticated === false) {
        return { status: "anonymous", authenticated: false, activeId: null, authuser, user: null, accounts: [], errorKind: "none", errorMessage: null };
      }
      if (res.status === 401) {
        return { status: "anonymous", authenticated: false, activeId: null, authuser, user: null, accounts: [], errorKind: "none", errorMessage: null };
      }
      // 200 but not authenticated — treat as anonymous if candidates exhausted
      if (res.ok && !data?.authenticated) {
        return { status: "anonymous", authenticated: false, activeId: null, authuser, user: null, accounts: [], errorKind: "none", errorMessage: null };
      }
    }
    if (res.status >= 500) {
      // try next candidate before giving up — one Worker might be down
      lastError = data?.message || `HTTP ${res.status}`;
      continue;
    }
    // Unknown shape — try next
  }
  // All candidates failed
  if (lastError) {
    const msg = String(lastError?.message || lastError);
    if (msg.includes("RequestTimeout") || String(lastError?.name).includes("AbortError")) {
      return { status: "error", authenticated: false, activeId: null, authuser, user: null, accounts: [], errorKind: "timeout", errorMessage: "Timeout" };
    }
    return { status: "error", authenticated: false, activeId: null, authuser, user: null, accounts: [], errorKind: "network", errorMessage: "Network error" };
  }
  return { status: "anonymous", authenticated: false, activeId: null, authuser, user: null, accounts: [], errorKind: "none", errorMessage: null };
}

export const fetchSsoMe = fetchGothwadSession;

// Helpers for switch / signout — try relative then drive fallback
async function postWithFallback(path: string, body: string, authuser: number): Promise<{ ok: boolean; error?: string }> {
  const candidates = [
    path, // relative
    `https://drive.gothwadtech.com${path}`,
    `${ACCOUNTS_API_ORIGIN}${path}`,
  ];
  for (const url of candidates) {
    try {
      const headers: Record<string, string> = { ...buildAuthuserHeaders(authuser), "Content-Type": "application/json" };
      const res = await fetchBounded(url, { method: "POST", credentials: "include", headers, body });
      const ct = (res.headers.get("content-type") || "").toLowerCase();
      if (ct.includes("application/json")) {
        const data: any = await res.json().catch(() => null);
        if (res.ok && data?.ok !== false) return { ok: true };
        // 409 conflict etc — don't fallback, surface error
        if (res.status === 409 || res.status === 401) return { ok: false, error: data?.message || `Switch failed (${res.status})` };
        if (!res.ok) continue; // try next candidate
      } else if (res.ok) return { ok: true };
      if (res.ok) return { ok: true };
    } catch {}
  }
  return { ok: false, error: "Network error" };
}

export async function switchGothwadAccountSlot(slotId: string, authuser: number): Promise<{ ok: boolean; error?: string }> {
  return postWithFallback("/api/auth/switch", JSON.stringify({ id: slotId, authuser }), authuser);
}

export async function signOutGothwadSlot(slotId?: string, authuser = 0): Promise<{ ok: boolean }> {
  const path = slotId ? `/api/auth/accounts/${encodeURIComponent(slotId)}/signout` : "/api/auth/signout";
  const res = await postWithFallback(path, "{}", authuser);
  return { ok: res.ok };
}
export const signOutSsoSlot = (slotId: string, authuser = 0) => signOutGothwadSlot(slotId, authuser);
export const signOutAllSso = (authuser = 0) => signOutGothwadSlot(undefined, authuser);
