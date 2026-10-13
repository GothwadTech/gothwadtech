/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Root domain, e.g. "gothwadtech.com" (no protocol, no subdomain). */
  readonly VITE_ROOT_DOMAIN?: string;
  readonly VITE_PORTAL_URL?: string;
  readonly VITE_ACCOUNTS_URL?: string;
  readonly VITE_AUTH_API?: string;
  readonly VITE_OAUTH_CLIENT_ID?: string;
  readonly VITE_OAUTH_REDIRECT_URI?: string;
  readonly VITE_ABOUT_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
