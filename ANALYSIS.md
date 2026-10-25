# Gothwad Tech — Website Code & Site Audit

**Repo:** `GothwadTech/gothwadtech` · **Branch:** `arena/8329fb61-gothwadtech` · **Commit:** `d516195`
**Date:** 25 Oct 2026 · **Scope:** full repo (26 source files, ~2.6k LOC TS/TSX, `public/` assets)

> **Status (25 Oct 2026): every item below has been fixed.** See [FIXES.md](./FIXES.md) for the
> change-by-change record. This file is kept as the original audit for reference.

**Method:** static read of every source file, `npm install`, `npm run typecheck`, `vite build`,
production preview smoke-test (`vite preview`) with host-header / deep-link / API-path probes,
and cross-check against Cloudflare Pages `_redirects` documentation.

---

## TL;DR scorecard

| Area | Score | One-line verdict |
|---|---|---|
| Architecture | 7.5/10 | Clean, small, well-layered. Route-lazy SPA is the right call. |
| Code quality | 7.0/10 | Readable and consistent; a few `any` casts and dead files. |
| SEO foundation | 6.5/10 | Impressively thorough markup, but **4 real bugs** silently break it. |
| Security / headers | 5.5/10 | Good header baseline; **no CSP** despite third-party script injection. |
| Performance | 7.5/10 | 263 kB / **82 kB gzip** main chunk, code-split routes. Two easy wins missed. |
| Accessibility / UX | 5.0/10 | Mobile nav effectively disappears on home; dead breadcrumb buttons. |
| DevEx / tooling | 5.5/10 | `npm run lint` doesn't run; no CI, no tests. |
| Content consistency | 4.0/10 | Two CEOs, four different product counts, placeholder store links. |

**Build status:** ✅ `tsc --noEmit` clean · ✅ `vite build` succeeds in 4.2 s
**Live status:** ✅ preview serves `/`, `/docs` (SPA fallback), assets, and accepts arbitrary Host headers.

---

## 1. What is genuinely solid

Worth stating first, because the base is better than most marketing sites:

- **Zero type errors** under `strict: true`, and the build is reproducible.
- **Route-level code splitting** via `React.lazy` — home 5.9 kB, ecosystem 7.7 kB, docs 2.1 kB; only the 262 kB React+lucide core is shared.
- **A real design system**: Tailwind v4 `@theme` tokens, brand `#0494f4`, a deliberately Google-flavoured zinc ramp, dark mode via `@custom-variant`.
- **SEO scaffolding is far above average**: per-route title/description/OG/Twitter, canonical, BreadcrumbList, Organization + WebSite + SearchAction JSON-LD, sitemap with image extensions, `llms.txt`, `humans.txt`, `security.txt` (both root and `.well-known`), `opensearch.xml`, `browserconfig.xml`, a full icon matrix, `_headers` with HSTS/CORP/COOP, and a `noscript` link block.
- **Sensible SSO design intent**: multi-candidate `/api/me` fallback chain, 8 s `AbortController` timeouts, `redirect: "manual"` + `text/html` rejection (so an SPA fallback can't be mistaken for JSON), and a shadow-DOM fallback account menu if the hosted widget fails.
- **`_redirects` SPA fallback (`/* /index.html 200`)** is correct and verified working for deep links.
- Only **1.7 MB** of `public/` assets total, MIT licensed, no tracking or third-party analytics.

---

## 2. P0 — ship-blockers (these are actively costing you)

### 2.1 The www → apex redirect cannot work on Cloudflare Pages
`public/_redirects:10-11,23`

```
https://www.gothwadtech.com/*  https://gothwadtech.com/:splat  301!
www.gothwadtech.com/*          https://gothwadtech.com/:splat  301!
```

Cloudflare's own docs mark **"Domain-level redirects" as ❌ not supported** in `_redirects` — the
source must be a *file path*. Both the scheme-prefixed and host-only forms are ignored. So the
comment in `_redirects:3-5`, in `index.html:7`, and in `README.md` ("fixes Google showing
www.gothwadtech.com") is describing a redirect that never happens.

**Impact:** `www.gothwadtech.com` may still serve 200 and compete as a duplicate host — the exact
problem the file claims to fix. The footer even links to `https://www.gothwadtech.com` (`Footer.tsx`),
feeding the duplicate.

**Fix:** delete those three lines; add a **Redirect Rule** in the Cloudflare zone
(`host eq www.gothwadtech.com → https://gothwadtech.com/${path}`, 301) or a Bulk Redirect.
Then change the footer link to the apex.

---

### 2.2 A site-wide HTTP canonical header points every page at the homepage
`public/_headers:11`

```
Link: <https://gothwadtech.com/>; rel="canonical"
```

`_headers` `/*` applies to **every** response. So `/docs`, `/ecosystem`, `/company` … all ship an
HTTP `Link: rel=canonical` saying "the canonical version of me is `/`". That directly contradicts
the in-document `<link rel="canonical">` that `App.tsx:257` sets correctly. Google treats the two
as competing signals; the header can win and collapse all subpages into the homepage.

**Fix:** remove the header entirely and rely on the per-route `<link rel="canonical">` — or scope it
to `/index.html` only.

---

### 2.3 Sign-out / account-switch silently reports success without doing anything
`src/lib/gothwadSso.ts:200-212`

```ts
const ct = (res.headers.get("content-type") || "").toLowerCase();
if (ct.includes("application/json")) { ... }
else if (res.ok) return { ok: true };   // ← line 208
if (res.ok) return { ok: true };         // ← line 209 (duplicate, unreachable)
```

On the apex there is no Worker for `/api/*`, so Cloudflare's SPA rewrite returns
**`200 text/html` (index.html)**. I reproduced this against the production build:
`GET /api/me → 200 text/html`. `postWithFallback` sees `res.ok === true`, content-type isn't JSON,
and returns `{ ok: true }` — a **false positive**. The UI then calls `window.location.reload()` and
the user stays signed in. Same path affects `switchGothwadAccountSlot`.

**Fix:** treat `text/html` as a hard failure and jump to the next candidate (mirror the
`fetchGothwadSession` logic); drop the duplicate `if (res.ok)` on line 209. Better: give the apex its
own tiny Worker so `/api/*` never falls through to the SPA.

---

### 2.4 Canonical URL leaks the `/u/<n>/` account slot
`src/App.tsx:257` + `pathForPage()` (`App.tsx:52-60`)

`pathForPage()` deliberately preserves `/u/2/`, so `canonical` becomes
`https://gothwadtech.com/u/2/ecosystem`. That URL is per-account, so the same page has up to six
canonical variants — textbook duplicate content. It also lands in `og:url`, `twitter:url` and the
`WebPage` JSON-LD `@id`.

**Fix:** strip the slot before building canonical (`stripAuthuserPath(pathForPage(page))`).

---

### 2.5 The theme system destroys the user's "system" preference on first paint
`src/context/ThemeContext.tsx:19-27, 38, 55-57`

```ts
function applyTheme(isDark) {
  root.classList.toggle(...);
  localStorage.setItem('gothwad-theme', isDark ? 'dark' : 'light');  // always writes
}
const [isDark, setIsDark] = useState(false);                          // line 38
useEffect(() => { applyTheme(isDark); }, [isDark]);                   // line 55
```

First render has `isDark === false`, so the effect persists **`'light'`** — even for a user whose
OS is dark. On the next visit, `themeMode` initialises from that stored value (`line 31-35`), so it's
no longer `'system'` and the site is **pinned to light forever**. A `system` user loses system
tracking after one page view.

Two related problems:
- **No FOUC guard**: theme is applied in an effect, after paint. Dark-mode users see a white flash on every load.
- **There is no theme toggle anywhere in the UI** — `toggleTheme` is exported but never rendered. Dark mode is reachable only via OS preference (which the bug above breaks).

**Fix:** only persist inside `setThemeMode()`, never in `applyTheme()`; add an inline
`<script>` in `index.html` that sets `documentElement.className` from `localStorage`/`matchMedia`
before first paint; render a sun/moon button in the Navbar.

---

## 3. P1 — high impact

| # | Issue | Where | Why it matters |
|---|---|---|---|
| 3.1 | **All internal navigation is `<button onClick>` + `history.pushState`** | `Navbar.tsx:89-90`, `HomePage.tsx:61,75,135-136`, `Breadcrumbs.tsx`, `Footer.tsx` | No `<a href>`, so: crawlers can't discover `/ecosystem`, `/docs`, `/solutions` from the HTML; users can't ⌘/middle-click or open in a new tab; "copy link" is impossible. Only `ProductsPage.tsx:41` uses a real `<a href="/ecosystem">`. Use `<a href>` + `onClick` that calls `preventDefault()`. |
| 3.2 | **Breadcrumb "Home" is a dead button on 4 of 7 pages** | `App.tsx:352-359` passes `onNavigate` only to Home/Solutions/Company | `EcosystemPage`, `ProductsPage`, `DocsPage`, `ContactPage` render `<Breadcrumbs>` without `onNavigate`, so `onNavigate?.()` is a no-op (`Breadcrumbs.tsx:28`). `EcosystemPage` even declares the prop and ignores it (`EcosystemPage.tsx:8`). |
| 3.3 | **Advertised search endpoint does nothing** | `index.html` WebSite `SearchAction` → `/ecosystem?q=`, `opensearch.xml`, manifest shortcut | No code path ever reads `?q=`. `EcosystemPage` keeps `query` in local state only. Anyone (Google sitelinks, browser search engines) using it lands on the unfiltered page. Read `new URLSearchParams(location.search).get('q')` as the initial state. |
| 3.4 | **Ecosystem `ItemList` is wrong three ways** | `App.tsx:296-322` | (a) `numberOfItems: 25` but the array has **22** entries and the data has **26** apps; (b) URLs point at `#accounts`, `#gothwad-mail`… anchors that **don't exist** — cards have `key={app.id}` but no `id` attribute; (c) list items omit `item` objects, so each `ListItem` has a name + URL but no entity. Generate the whole block from `ECOSYSTEM_APPS` and add `id={app.id}` to the cards. |
| 3.5 | **Static fallback WebPage JSON-LD is never removed** | `index.html:231` vs `App.tsx:283` | Crawlers see `ld-webpage-fallback` (`@id: …/#webpage`, url `/`, home title) **plus** `ld-webpage-dynamic` (`@id: …/docs#webpage`). On `/docs` that's two WebPage entities, one claiming to be the homepage. Remove the fallback on mount, or key it to the same `@id`. |
| 3.6 | **hreflang goes stale on every route** | `App.tsx:268-269` | Only `x-default` and `en-IN` are rewritten; `hreflang="en"` and `hreflang="hi-IN"` (`index.html:62-63`) keep pointing at `/` on every page. Also, `hi-IN` is declared but the site has no Hindi version — remove it or ship it. |
| 3.7 | **Mobile nav is empty on the homepage** | `Navbar.tsx:77-95` | The logo button is rendered only `!isHome`; About/Store/Ecosystem/Docs/GitHub are all `hidden sm:*`. Below 640 px on `/`, a user's only control is **Sign in**. Add a hamburger/menu sheet and always render the logo. |
| 3.8 | **Two footers on the homepage** | `App.tsx:376` + `HomePage.tsx:122` | The global `Footer` renders on every route *and* `HomePage` ships its own `<footer>`, so home shows a duplicated footer bar. |
| 3.9 | **Social preview image is a 460×460 logo** | `index.html:101-104`, `public/assets/brand/og-image.png` | `og-image.png` is byte-identical to `logo.png` (md5 `ac791b6b…`), actually **460×460** but declared `512×512`, while `twitter:card` is `summary_large_image` (needs ~1200×630). WhatsApp/X/LinkedIn will crop or letterbox it. Ship a real 1200×630 card. |
| 3.10 | **Per-route meta is JS-only** | `App.tsx:250-330` | Google renders JS; **WhatsApp, Facebook, LinkedIn, Slack, Telegram, Discord do not**. Every shared subpage unfurls with the homepage title/description/image. For a company whose traffic is largely WhatsApp-shared, this matters. Fix with `vite-plugin-ssg`/`react-snap` prerender or a Pages Function that injects meta per path. |

---

## 4. P2 — medium

**Headers / security**
- **No `Content-Security-Policy`** — yet `accountMenuWidget.ts:229` injects a remote ES module from `accounts.gothwadtech.com`. If that host is compromised, arbitrary code runs on your apex domain. Add a CSP with `script-src 'self' https://accounts.gothwadtech.com` and consider removing the remote widget in favour of the (already-written) local fallback.
- `_headers:22-23` sets `Content-Type: image/png` on `/assets/*` — which also matches `/assets/README.txt`, so a text file is served as a PNG. Scope to `/assets/brand/*` and `/assets/icons/*` only.
- `X-Frame-Options: DENY` + `Cross-Origin-Opener-Policy: same-origin` (`_headers:5,9`) mean the site can never be embedded (Notion, docs, partner pages) **and** COOP breaks any popup-based OAuth flow against `accounts.gothwadtech.com`. If SSO ever uses popups, this is a latent outage.
- `_headers:12` `Cache-Control: no-cache` on `/*` is fine, but `/*.js` → `immutable, 1 year` also matches any future un-hashed script (e.g. a Worker or the account widget if proxied).

**Auth / SSO robustness**
- `ME_CANDIDATES` (`gothwadSso.ts:107-112`) hard-codes `drive.` and `mail.` hosts instead of reading `brand.ts` env, so a domain change needs code edits. Worst case is 4 sequential 8 s timeouts = **32 s** of spinner.
- `X-Gothwad-Authuser` is a custom header on a cross-origin GET (`gothwadSso.ts:93-97`) → forced CORS preflight on every session probe. Verify the Workers' `Access-Control-Allow-Headers`.
- The chain depends on third-party cookies from `drive.`/`mail.` — already blocked by default in Safari and Chrome's incognito. A same-site `/api` Worker (see 2.3) fixes both problems at once.
- `Navbar.tsx:48-55`: after a successful switch it sets `window.location.href` **and** schedules `window.location.reload()` 300 ms later — redundant navigation, occasional double-load. The path assembly (`.replace('//','/')` chains) is also fragile; build it from `buildAccountSlotPath()` + `stripAuthuserPath()`.

**Performance**
- `index.html:74` preloads `/assets/brand/og-image.png` — **92 kB** fetched at `high` priority on every page load for an image browsers never display. Remove it (keep the logo preload).
- Google Fonts (`index.html:77`) is render-blocking and a third-party GDPR call. Self-host the two families and subset to Latin + Devanagari.
- 1.7 MB in `public/` with heavy duplication: `logo.png`/`og-image.png` are the same file in two paths, `icon-512.png` exists in three places, `apple-touch-icon.png` twice. De-duplicate to ~10 unique files.
- No `manualChunks`; `lucide-react` icons shared across pages sit in the 262 kB main chunk. A `vendor` chunk split would improve repeat-visit caching.

**Accessibility**
- `HomePage.tsx:34` `autoFocus` on the search field — pops the mobile keyboard on every visit and steals focus from screen readers.
- No "skip to content" link; `<main>` has no `id`.
- "I'm feeling lucky" (`HomePage.tsx:50-55`) just clears the search box — a control that does nothing a user expects.
- Breadcrumb dead buttons (3.2) are keyboard-focusable no-ops.
- Nav landmarks have no `aria-label`, so two `<nav>` elements are indistinguishable to assistive tech.
- Account switcher has good `aria-modal`/`aria-label` handling — that part is well done.

**Robustness**
- No `ErrorBoundary` around the `Suspense` routes. A chunk 404 (deploy happens while a tab is open) yields a permanently blank page. Add an error boundary that offers a reload.
- React 19 StrictMode double-invokes the session effect in dev → duplicate `/api/me` probes; harmless but noisy.

---

## 5. Content & data consistency (highest embarrassment-per-line ratio)

| Claim | Where | Reality |
|---|---|---|
| Product count | `README` "25+", `llms.txt` "25+", `App.tsx:301` `numberOfItems: 25` / 22 items, `companyData.ts` "13+ Products" | `ecosystem.ts` has **26** entries |
| CEO | `CompanyPage.tsx:20` **Yuvkesh Meena**, `humans.txt` **Yuvkesh Meena** *and* **Nishant**, `companyData.ts` `ceoEmail: 'nishant@…'` | Two people listed as CEO |
| CEO email | `CompanyPage.tsx:20` `ceo@gothwadtech.com` vs `companyData.ts` `nishant@…` | Pick one mailbox |
| Play Store links | `ProductsPage.tsx:7-9` (`com.gothwad.browser`, `com.gothwad.grixchat`, `com.gothwad.indogram`) | Unverified — likely 404 placeholders. Ship only what exists. |
| Phone link | `ContactPage.tsx:35` `tel:${phoneRaw}` → `tel:07339904665` | Leading `0` is not valid E.164; should be `+917339904665` |
| Reviews | `companyData.ts` "4.95 / 5 — Verified client reviews" | No review source or link; risky testimonial claim |
| Metrics | "200k members", "<15ms dispatch", "75% less RAM", "11.8 MB" | Unverifiable in-repo; keep a source link or soften the copy |
| Website repo | `llms.txt` → `github.com/GothwadTech/website` | Actual repo is `GothwadTech/gothwadtech` |
| Apple touch icon | `index.html:88` `sizes="152x152"` → `icon-144.png` | Size mismatch; iOS ignores or rescales |
| Manifest screenshot | `manifest.json` `512x512` + `form_factor: "wide"` | File is 460×460; install prompt needs 1280×720 for `wide` |
| `_redirects` comments | `README`, `index.html:7` | Describe a redirect that cannot run (2.1) |

---

## 6. P3 — hygiene / DevEx

- **`npm run lint` is broken** → `sh: eslint: not found`. `package.json` declares the script but has no `eslint`, no `eslint.config.js`. Either add `typescript-eslint` + `eslint-plugin-react-hooks` or drop the script.
- **No CI** (`.github/` absent). `verify` exists but nothing runs it; add a GitHub Action on `push`/`pull_request` running `npm ci && npm run typecheck && npm run build`.
- **No tests.** Fine for a brochure site, but `brand.ts` (`parseAuthuserFromUrl`, `stripAuthuserPath`, `buildSignInUrl`) is pure logic with tricky regexes and deserves Vitest.
- **Dead code**: `components/PortalBar.tsx` (31 lines) and `components/AppShortcuts.tsx` (112 lines) are never imported; the `motion` dependency is never imported; `PORTAL_FAVORITES`, `EcosystemApp.available`, `.accent`, `useGothwadSession().refresh`, `ROUTE_ALIASES['']` are all unused. Typecheck won't catch it because `noUnusedLocals: false`.
- **Type safety escape hatches**: `as any` in `Navbar.tsx:22-46`, `normalizeClientUser(raw: any)`, `normalizeClientAccount(raw: any)`, `raw?.authuser`. Define a `GothwadApiUser` interface and validate once at the boundary.
- **No `engines`, no `.nvmrc`, no `.env.example`** — yet `VITE_APP_DOMAIN`, `VITE_ACCOUNTS_WEB_URL`, `VITE_ACCOUNTS_API_URL`, `DISABLE_HMR` are read in code and undocumented.
- `vite.config.ts` `allowedHosts: true` is convenient for previews but should be `process.env.NODE_ENV !== 'production'`-gated or an explicit allowlist.
- `README.md` doesn't mention the `/u/<n>/` account-slot routing, the SSO chain, or the env vars — the three things a new maintainer most needs.
- Repo metadata on GitHub: **description empty, homepage URL empty, topics absent.** Free discoverability, unclaimed.
- `public/.well-known/robots.txt` is a byte-identical duplicate of `public/robots.txt` (harmless, but confusing).
- `tsconfig` `noUnusedLocals/Parameters: false` under `strict` — flip both on; the codebase is already clean enough to survive it.

---

## 7. Verified evidence

```
$ npm run typecheck      → exit 0, 0 errors
$ vite build             → ✓ 1692 modules, 4.17s
    dist/index.html                    16.35 kB │ gzip  4.28 kB
    dist/assets/index-*.css            42.25 kB │ gzip  7.97 kB
    dist/assets/index-*.js            263.66 kB │ gzip 82.46 kB
    (6 lazy route chunks, 0.3–7.7 kB each)

$ vite preview smoke test
    GET /                 → 200
    GET /docs             → 200   (SPA fallback OK)
    GET / with Host: *.e2b.app → 200  (host allowlist OK)
    GET /api/me           → 200 text/html   ← evidence for 2.3
    GET /assets/README.txt→ 200 text/plain  (local; CF _headers would override to image/png — 4)

$ public/ total: 1.7 MB   src/ total: 173 kB
```

---

## 8. Recommended fix order

**Sprint 1 — same day, all low-risk (kills the SEO/auth damage)**
1. Delete `_redirects` domain rules + `Link: rel=canonical` header; add a Cloudflare Redirect Rule for www.
2. Strip `/u/<n>/` from canonical; fix the false-positive in `postWithFallback`; run `/api/me` same-origin.
3. Fix theme persistence; add inline pre-paint theme script + Navbar toggle.
4. Remove the fallback WebPage JSON-LD on mount; generate `ItemList` from data and add `id` to cards.
5. Remove the `og-image` preload; ship a real 1200×630 OG card.

**Sprint 2 — one focused day (UX + correctness)**
6. Convert internal nav/breadcrumbs to real `<a href>` + `preventDefault`; pass `onNavigate` to all pages; delete the double footer; add a mobile menu.
7. Read `?q=` in `EcosystemPage`; wire "I'm feeling lucky" to a random product.
8. Add `ErrorBoundary`; fix `tel:`; unify CEO/email/product-count facts into `companyData.ts` as the single source of truth.
9. Add CSP; scope `/assets/*` headers; add a CI workflow; fix or remove `lint`.

**Sprint 3 — one week (growth)**
10. Prerender static HTML per route (or Pages Function meta injection) so WhatsApp/LinkedIn unfurls are per-page.
11. Self-host + subset fonts; de-duplicate the icon set; `manualChunks` vendor split.
12. Vitest coverage on `brand.ts`; turn on `noUnusedLocals`; delete dead components and the `motion` dep.
13. Fill GitHub repo description/homepage/topics; update `README` (env vars, SSO, slot routing, accurate counts).

---

## 9. Bottom line

The engineering craft here is good — clean structure, honest typing, thoughtful SEO markup, and a
genuinely small bundle. The problems are **not** sloppiness of code; they're four or five small
things that each silently disable something the project already invested in: a redirect that can't
run, a canonical header that contradicts itself, an auth handler that lies about success, a theme
store that overwrites the user's choice, and a per-route SEO layer that only reaches JS-capable bots.

Fix those five and this moves from "nice-looking site with good intentions" to "site that actually
does what its markup promises."
