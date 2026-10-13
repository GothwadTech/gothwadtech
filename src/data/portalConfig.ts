/**
 * GOTHWAD PORTAL CONFIG — THE ONLY FILE TO EDIT WHEN A DOMAIN CHANGES.
 *
 * Rule #1 from the Accounts repo: never hardcode a domain anywhere else in
 * the codebase. Everything that needs one reads it from here.
 *
 * Vite bakes `VITE_*` env vars in at build time, so these can be overridden
 * per deploy (root domain vs. a Pages preview URL) without touching code.
 */

const env = import.meta.env;

/** Root domain, e.g. "gothwadtech.com" (no protocol, no subdomain). */
export const ROOT_DOMAIN: string = env.VITE_ROOT_DOMAIN || 'gothwadtech.com';

/** This portal. */
export const PORTAL_URL: string = env.VITE_PORTAL_URL || `https://${ROOT_DOMAIN}`;

/** Gothwad Accounts — the auth hub (OAuth 2.0 provider). */
export const ACCOUNTS_URL: string =
  env.VITE_ACCOUNTS_URL || `https://accounts.${ROOT_DOMAIN}`;

/**
 * Browser-facing Accounts API base.
 * The Accounts Worker is routed at `accounts.<domain>/api/*`, so the OAuth
 * endpoints live under /api. Using `accounts.<domain>/oauth/...` (without
 * /api) would hit the Pages HTML instead of the Worker.
 */
export const AUTH_API: string = env.VITE_AUTH_API || `${ACCOUNTS_URL}/api`;

/** OAuth client id for this portal. Must be registered in Accounts'
 *  `ecosystem_apps` table with this exact redirect_uri. */
export const OAUTH_CLIENT_ID: string = env.VITE_OAUTH_CLIENT_ID || 'gothwad-portal';

/** Where Accounts sends the user back after sign-in. */
export const OAUTH_REDIRECT_URI: string =
  env.VITE_OAUTH_REDIRECT_URI || `${PORTAL_URL}/auth/callback`;

/** Scopes the portal needs — just enough to show the account chip. */
export const OAUTH_SCOPES: string = 'profile email';

/** Corporate / company site (agency content). */
export const ABOUT_URL: string = env.VITE_ABOUT_URL || `https://about.${ROOT_DOMAIN}`;

export const PORTAL_CONFIG = {
  ROOT_DOMAIN,
  PORTAL_URL,
  ACCOUNTS_URL,
  AUTH_API,
  OAUTH_CLIENT_ID,
  OAUTH_REDIRECT_URI,
  OAUTH_SCOPES,
  ABOUT_URL,
};
