import {
  ACCOUNTS_API_ORIGIN,
  ACCOUNTS_WEB_ORIGIN,
  DRIVE_ORIGIN,
  MAIL_ORIGIN,
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

type RawRecord = Record<string, unknown>;

function asRecord(value: unknown): RawRecord {
  return value && typeof value === "object" ? (value as RawRecord) : {};
}

function str(value: unknown): string {
  return typeof value === "string" || typeof value === "number" ? String(value).trim() : "";
}

function normalizeClientUser(rawValue: unknown): GothwadSsoUser | null {
  const raw = asRecord(rawValue);
  const id = str(raw.id ?? raw.userId);
  const rawEmail = str(raw.email).toLowerCase();
  const username = str(raw.username || (rawEmail ? rawEmail.split("@")[0] : "")).toLowerCase();
  if (!id || !username) return null;
  const firstName = str(raw.firstName ?? raw.first_name);
  const lastName = str(raw.lastName ?? raw.last_name);
  const name = str(raw.name) || `${firstName} ${lastName}`.trim() || username;
  const avatar = str(raw.avatarUrl ?? raw.avatar_url) || null;
  return {
    id,
    username,
    email: formatGothwadEmail(str(raw.email) || username),
    firstName,
    lastName,
    name,
    avatarUrl: avatar,
    avatar_url: avatar,
  };
}

function normalizeClientAccount(rawValue: unknown, index: number): GothwadAccountItem {
  const raw = asRecord(rawValue);
  const username = str(raw.username).toLowerCase();
  const firstName = str(raw.firstName ?? raw.first_name);
  const lastName = str(raw.lastName ?? raw.last_name);
  const name = str(raw.name) || `${firstName} ${lastName}`.trim() || username || "Account";
  const authuser = Number.isInteger(raw.authuser) ? Number(raw.authuser) : index;
  const avatar = str(raw.avatarUrl ?? raw.avatar_url) || null;
  return {
    id: str(raw.id ?? raw.slot) || "a",
    authuser,
    username,
    name,
    firstName,
    lastName,
    email: formatGothwadEmail(str(raw.email) || username),
    avatarUrl: avatar,
    avatar_url: avatar,
    accountUrl: str(raw.accountUrl) || `${ACCOUNTS_WEB_ORIGIN}/u/${authuser}/me`,
  };
}

export function getCurrentAuthuser(): number {
  return parseAuthuserFromUrl().authuser;
}
export const slotUrl = buildAccountSlotPath;
export const buildSsoSignInUrl = buildSignInUrl;

/**
 * The authuser hint is only sent same-origin: adding a custom header to a
 * cross-origin request forces a CORS preflight on every session probe.
 */
function buildAuthuserHeaders(authuser?: number, includeSlot = true): Record<string, string> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (includeSlot && Number.isInteger(authuser) && authuser! >= 0 && authuser! <= 5) {
    headers["X-Gothwad-Authuser"] = String(authuser);
  }
  return headers;
}

function isSameOrigin(url: string): boolean {
  return url.startsWith("/");
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

/**
 * Session probes, in order. The relative `/api/me` is first so the site can host its
 * own tiny Worker later; Drive/Mail exist today and expose CORS to the apex.
 * Apex has no Worker yet, so `/api/me` currently resolves to index.html — which we
 * detect (text/html) and skip instead of mistaking for a session.
 */
function meCandidates(): string[] {
  return [
    "/api/me",
    `${DRIVE_ORIGIN}/api/me`,
    `${MAIL_ORIGIN}/api/session?meta=0`,
    `${ACCOUNTS_API_ORIGIN}/api/me`,
  ];
}

function anonymous(authuser: number): FetchMeResult {
  return { status: "anonymous", authenticated: false, activeId: null, authuser, user: null, accounts: [], errorKind: "none", errorMessage: null };
}

function failure(authuser: number, kind: ServiceErrorKind, message: string): FetchMeResult {
  return { status: "error", authenticated: false, activeId: null, authuser, user: null, accounts: [], errorKind: kind, errorMessage: message };
}

export async function fetchGothwadSession(authuser = 0): Promise<FetchMeResult> {
  let lastKind: ServiceErrorKind = "none";
  let lastMessage = "";

  for (const endpoint of meCandidates()) {
    let res: Response;
    try {
      res = await fetchBounded(endpoint, {
        method: "GET",
        credentials: "include",
        headers: buildAuthuserHeaders(authuser, isSameOrigin(endpoint)),
      });
    } catch (error) {
      const err = error as { name?: string; message?: string };
      if (String(err?.name).includes("AbortError") || String(err?.message).includes("RequestTimeout")) {
        lastKind = "timeout";
        lastMessage = "Timeout";
      } else {
        lastKind = "network";
        lastMessage = "Network error";
      }
      continue;
    }

    // Redirects / SPA fallbacks are not API responses.
    if (res.type === "opaqueredirect" || res.redirected || (res.status >= 300 && res.status < 400)) {
      lastKind = "redirect";
      continue;
    }
    if (res.status === 429) return failure(authuser, "rate_limited", "Rate limited");
    if (res.status >= 500) {
      lastKind = "http_5xx";
      lastMessage = `HTTP ${res.status}`;
      continue;
    }

    const contentType = (res.headers.get("content-type") || "").toLowerCase();
    if (contentType.includes("text/html")) {
      lastKind = "routing_html";
      lastMessage = "Received HTML instead of JSON";
      continue;
    }
    if (!contentType.includes("json")) continue;

    let data: RawRecord;
    try {
      data = asRecord(await res.clone().json());
    } catch {
      continue;
    }

    const user = normalizeClientUser(data.user);
    if (res.ok && data.authenticated === true && user) {
      const rawAccounts = Array.isArray(data.accounts) ? data.accounts : [];
      const accounts = rawAccounts.length
        ? rawAccounts.map((account, index) => normalizeClientAccount(account, index))
        : [normalizeClientAccount({ ...user, id: data.activeId || "a", authuser: data.authuser ?? authuser }, 0)];
      return {
        status: "authenticated",
        authenticated: true,
        activeId: str(data.activeId) || accounts[0]?.id || "a",
        authuser: Number.isInteger(data.authuser) ? Number(data.authuser) : authuser,
        user,
        accounts,
        errorKind: "none",
        errorMessage: null,
      };
    }

    // A well-formed "not signed in" answer — stop probing.
    if (data.authenticated === false || res.status === 401) return anonymous(authuser);
  }

  if (lastKind === "none" || lastKind === "routing_html" || lastKind === "redirect") return anonymous(authuser);
  return failure(authuser, lastKind, lastMessage || "Service unavailable");
}

export const fetchSsoMe = fetchGothwadSession;

type PostOutcome = { ok: true } | { ok: false; retry: boolean; error?: string };

/** One POST attempt. A 2xx with a non-JSON body means we hit the SPA fallback — never a success. */
async function postOnce(url: string, body: string, authuser: number): Promise<PostOutcome> {
  try {
    const res = await fetchBounded(url, {
      method: "POST",
      credentials: "include",
      headers: { ...buildAuthuserHeaders(authuser, isSameOrigin(url)), "Content-Type": "application/json" },
      body,
    });
    if (res.status === 401 || res.status === 409) {
      const data = asRecord(await res.json().catch(() => null));
      return { ok: false, retry: false, error: str(data.message) || `Request failed (${res.status})` };
    }
    const contentType = (res.headers.get("content-type") || "").toLowerCase();
    if (!res.ok || !contentType.includes("json")) return { ok: false, retry: true };
    const data = asRecord(await res.json().catch(() => null));
    if (data.ok === false) return { ok: false, retry: false, error: str(data.message) || "Request rejected" };
    return { ok: true };
  } catch {
    return { ok: false, retry: true };
  }
}

async function postWithFallback(path: string, body: string, authuser: number): Promise<{ ok: boolean; error?: string }> {
  const candidates = [path, `${DRIVE_ORIGIN}${path}`, `${ACCOUNTS_API_ORIGIN}${path}`];
  for (const url of candidates) {
    const outcome = await postOnce(url, body, authuser);
    if (outcome.ok) return { ok: true };
    if (!outcome.retry) return { ok: false, error: outcome.error };
  }
  return { ok: false, error: "Network error" };
}

export async function switchGothwadAccountSlot(slotId: string, authuser: number): Promise<{ ok: boolean; error?: string }> {
  return postWithFallback("/api/auth/switch", JSON.stringify({ id: slotId, authuser }), authuser);
}

export async function signOutGothwadSlot(slotId?: string, authuser = 0): Promise<{ ok: boolean; error?: string }> {
  const path = slotId ? `/api/auth/accounts/${encodeURIComponent(slotId)}/signout` : "/api/auth/signout";
  return postWithFallback(path, "{}", authuser);
}

export const signOutSsoSlot = (slotId: string, authuser = 0) => signOutGothwadSlot(slotId, authuser);
export const signOutAllSso = (authuser = 0) => signOutGothwadSlot(undefined, authuser);
