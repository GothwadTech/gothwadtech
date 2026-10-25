# Gothwad Tech — Official Website

Official website for **Gothwad Tech** — sovereign software from Jaipur, India.

**Live:** https://gothwadtech.com

## ✨ What this site is

- **Official portal:** everything Gothwad in one place. One Gothwad Account unlocks Mail, Drive, Meet, Store, Tube, GrixChat, Indogram, Browser, Education, AI Studio, Docs and more.
- **Ecosystem directory:** 26 products with direct subdomain links (`{host}.gothwadtech.com`), category filters, search and GitHub source links.
- **Product access hub:** every card has a live “Open” button and, where public, a “Source” link.
- **Design language:** zinc + `#0494f4` brand, light/dark theme, responsive, keyboard accessible.

## 🗺️ Routes

| Path | Description |
|------|-------------|
| `/` | Home — quick access, product search, shortcuts |
| `/ecosystem` | Product directory. Supports `?q=` and `?category=` deep links |
| `/products` | Flagships: Browser, GrixChat, Indogram |
| `/solutions` | School ERP, restaurant POS, shop billing, CRM, custom engineering |
| `/docs` | Developer documentation index |
| `/company` | About + leadership |
| `/contact` | Business, support, help and security inboxes |
| `/u/<n>/…` | Account slot (Mail/Drive-compatible). `n` is 0–5 |

Unknown paths render an in-app 404 with `noindex`.

## 🛠 Stack

- Vite 6 + React 19 + TypeScript 5 (strict)
- Tailwind CSS 4 via `@tailwindcss/vite`
- `lucide-react` icons
- Vitest + Testing Library for unit/behaviour tests
- ESLint (flat config) + `typescript-eslint`
- Cloudflare Pages hosting

## 🚀 Run

```bash
npm install
cp .env.example .env.local   # optional — defaults point at production
npm run dev                  # http://localhost:3000
npm run build                # → dist/ (includes per-route prerender)
npm run preview              # serve the built site
npm run verify               # typecheck + lint + test + build
```

Node 20+ is required (`engines` + `.nvmrc`).

## ⚙️ Environment variables

All optional; defaults are production values. See `.env.example`.

| Variable | Default | Used for |
|---|---|---|
| `VITE_APP_DOMAIN` | `gothwadtech.com` | Email addresses, subdomain links |
| `VITE_ACCOUNTS_WEB_URL` | `https://accounts.gothwadtech.com` | Sign-in, manage account |
| `VITE_ACCOUNTS_API_URL` | `https://api.gothwadtech.com` | Account switch / sign-out |
| `VITE_DRIVE_URL` | `https://drive.gothwadtech.com` | Session fallback |
| `VITE_MAIL_URL` | `https://mail.gothwadtech.com` | Session fallback |
| `DISABLE_HMR` | unset | Set `true` in sandboxed previews |

## 🔐 Sessions & the account menu

`src/lib/gothwadSso.ts` probes, in order: `/api/me` (same origin), Drive, Mail, then the
Accounts API. Rules that matter when changing it:

- A **2xx `text/html`** response is the SPA fallback, not a session — it is skipped, never treated as success.
- Any 2xx JSON without `authenticated: true` is treated as anonymous and stops the probe.
- The custom `X-Gothwad-Authuser` header is only sent same-origin, to avoid a CORS preflight on every probe.
- Every request is bounded by an 8 s `AbortController` timeout.

The account switcher is **bundled locally** (`src/lib/accountMenuWidget.ts`, shadow DOM). We intentionally
do not load `accounts.gothwadtech.com/widget/account-menu.js` on the apex: a remote script on the primary
domain is a supply-chain risk and would need a CSP exception.

## 🎨 Theming

`public/theme-init.js` runs **before first paint** (external file so the CSP needs no inline-script
exception) and applies the stored or system theme. `ThemeContext` only persists a preference when the user
clicks the toggle — the `system` setting is never overwritten. Do not write to `localStorage` from a paint effect.

## 🔎 SEO

- Per-route title, description, canonical, hreflang, OG/Twitter and JSON-LD are declared once in
  `src/data/pageMeta.json` and applied by `src/App.tsx`.
- `scripts/prerender.mjs` (runs after `vite build`) writes one real HTML file per route, so social
  scrapers that do not execute JS still get the right preview. Full SSG/SSR would additionally give
  no-JS crawlers the body content — a reasonable next step.
- Canonical URLs never include the `/u/<n>/` slot.
- `sitemap.xml`, `robots.txt`, `llms.txt`, `humans.txt`, `security.txt` and `manifest.json` live in `public/`.

## ☁️ Cloudflare Pages notes

- **www → apex is not possible in `_redirects`** (Pages only matches file paths). Create a Redirect Rule
  in the zone: if `host` equals `www.gothwadtech.com`, redirect to `https://gothwadtech.com/${path}` (301).
- **Do not add a top-level `dist/404.html`** — that disables Pages' SPA fallback and deep links start 404ing.
- `_headers` sets CSP, HSTS, COOP/CORP, `X-Frame-Options: DENY` and long-lived caching for `/assets/*`.
  `X-Frame-Options: DENY` + `Cross-Origin-Opener-Policy: same-origin` mean the site cannot be embedded and
  cannot use popup-based OAuth. SSO here is redirect-based; change both before introducing popups.

## 🧪 Tests

```bash
npm run test
```

- `tests/routing.test.ts` — slot parsing, legacy aliases, canonical/href building
- `tests/theme.test.tsx` — system preference is never overwritten; toggle persists
- `tests/app.test.tsx` — routing, real `href`s, single footer, 404, per-route meta, `?q=` deep links

CI (`.github/workflows/ci.yml`) runs typecheck, lint, tests and build on every PR.

## 🎨 Assets

- `public/assets/brand/` — `logo.png` (460×460), `og-image.png` (1200×630 social card)
- `public/assets/icons/` — PWA icon set (48 → 512, plus maskable)
- Root: `favicon*.png`, `favicon.ico`, `apple-touch-icon.png`, `logo.svg`
- Regenerate the social card: `python3 -m venv .venv-og && .venv-og/bin/pip install pillow && .venv-og/bin/python scripts/make-og-image.py`

## 🔗 Ecosystem quick links

- Accounts: https://accounts.gothwadtech.com
- Mail: https://mail.gothwadtech.com
- Drive: https://drive.gothwadtech.com
- Meet: https://meet.gothwadtech.com
- Tube: https://tube.gothwadtech.com
- GrixChat: https://grixchat.gothwadtech.com
- Indogram: https://indogram.gothwadtech.com
- Browser: https://browser.gothwadtech.com
- Docs: https://docs.gothwadtech.com
- GitHub: https://github.com/GothwadTech

© 2026 Gothwad Tech Private Limited.
