# 📋 TASK.md — gothwadtech.com (Portal) live task board

> Har session ke END mein yeh file update karo. Rules: `AGENTS.md`

**Last updated:** 2026-10-13

---

## ✅ DONE

### Session 1 — Repo cleanup (PR #1, open)
Dead code, housekeeping, tooling, routing, CI.

- [x] Dev server 403 fix (`server.allowedHosts`) + mojibake comment fix
- [x] `.gitignore` add (pehle tha hi nahi — `node_modules/`, `dist/` khatre mein)
- [x] `package-lock.json` sync (stale tha: `react-router-dom` abhi bhi listed)
- [x] Dead code delete: root `components/` (24) + `screens/` (8), ~2,250 LOC
      → tsc 13 errors → **0**
- [x] `web.zip` (388 KB) git se hataaya
- [x] `package.json` name `react-example` → `gothwadtech`
- [x] `public/` icon dedupe (5 copies → 1; md5 se confirm)
- [x] Browser simulator benchmarks ko "illustrative" label kiya (ASCI risk)
- [x] ESLint 10 + react-hooks + 131 unused imports remove (140 → 25 warnings)
- [x] Hash routing → real paths (`#products` → `/products`) + legacy redirect
- [x] Per-route SEO meta + sitemap.xml real paths
- [x] Code splitting (386 → 275 kB initial; gzip 104.6 → 85.8)
- [x] GitHub Actions CI (typecheck + lint + build)
- [x] `public/_redirects` — Cloudflare Pages SPA fallback (warna `/products` 404)
- [x] `vercel.json` delete (Vercel pe kuch nahi hai; Cloudflare Pages hai)
- [x] **Regression fix:** `Logo.tsx` `/icon-512.png` → `/assets/icons/icon-512.png`
      (dedupe mein wo file delete ho gayi thi)

### Session 2 — Portal (2026-10-13)
- [x] `src/data/gothwadApps.ts` — ecosystem catalog (13 apps, accounts se port)
- [x] `src/data/portalConfig.ts` — **Rule #1**, saare domains ek jagah
- [x] `src/components/portal/AppShortcuts.tsx` — product tiles (main body)
- [x] `src/components/portal/SearchBox.tsx` — hero + bar variants
- [x] `src/components/portal/PortalBar.tsx` — app launcher (9-dot) + theme + Sign in
- [x] `src/pages/PortalHome.tsx` — wordmark + search + shortcuts + footer
- [x] `src/pages/SearchPage.tsx` — AI answer card + cited sources + loading/error
- [x] `src/types/search.ts`, `src/services/searchApi.ts`
- [x] Routing: `/` portal, `/search?q=`, `/legacy` (corporate home preserved)
- [x] Global Navbar/Footer/WhatsApp sirf corporate pages pe (portal pe apne hain)
- [x] `worker/` — Cloudflare Worker (OpenRouter, KV cache, rate limit, CORS)
- [x] `AGENTS.md` + `TASK.md` (accounts/mail wala convention)
- [x] `tsconfig.json` exclude `worker/` (uska apna tsconfig hai)

---

## 🔜 NEXT (priority order)

### 1. Search Worker ko zinda karo
- [ ] `worker/wrangler.toml` mein `[[kv_namespaces]] id` apna KV namespace ID daalo
      (`npx wrangler kv namespace create SEARCH_CACHE`)
- [ ] `npm run worker:secrets:set` → `OPENROUTER_API_KEY` daalo
- [ ] `npm run worker:deploy`
- [ ] Cloudflare dashboard: route `gothwadtech.com/api/*` → Worker `gothwad-portal`
- [ ] `/api/health` check karo → `{ ok: true, configured: true }`
- [ ] Ek real query try karo; agar `SEARCH_MODE = online` fail ho toh
      `server_tool` try karo (OpenRouter ka naya tareeka)

### 2. OAuth account chip (Sign in → avatar)
- [ ] Accounts repo: `ecosystem_apps` mein client register karo —
      `client_id = gothwad-portal`,
      `redirect_uri = https://gothwadtech.com/auth/callback`
- [ ] PKCE flow implement (`/auth/callback` route)
- [ ] `PortalBar` mein avatar + name + "Manage your Gothwad Account" + Sign out
- [ ] Token storage decide: memory vs httpOnly cookie (cookie ke liye Worker chahiye)

### 3. Corporate content → `about.gothwadtech.com`
- [ ] Naya Cloudflare Pages project `about.gothwadtech.com` ke liye
- [ ] Corporate pages (`/solutions`, `/products`, `/portfolio`, `/about`,
      `/contact`, `/legacy`) wahan deploy
- [ ] Is repo se corporate pages + `/legacy` delete
- [ ] Portal footer ka "About" link check

### 4. Baad mein
- [ ] Search suggestions / autocomplete
- [ ] Recent searches (localStorage)
- [ ] `gothwad.in` domain pe switch (AGENTS.md mein future domain likha hai)

---

## ⚠️ JANI-PEHCHANI PROBLEMS (baar baar aati hain)

1. **Cloudflare Pages SPA fallback** — `_redirects` zaroori hai. Workers pe
   jaoge toh wo kaam nahi karega (`not_found_handling` chahiye).
2. **Fake URLs** — model se links mat mangwana, OpenRouter ke
   `url_citation` annotations use karo.
3. **Search cost** — free model par bhi web search billed hai ($4/1000 results).
   Cache + daily limit hatao mat.
4. **Domain hardcode** — `portalConfig.ts` / `wrangler.toml` ke alawa kahin nahi.
5. **Sandbox reset** — kabhi kabhi git objects lost ho jate hain aur commits
   gayab ho jate hain (working tree rehta hai). Push karte raho.

---

## 📝 SESSION LOG

### 2026-10-13 (Session 2)
- Pawan ne bataya: pura website ka moto alag hai — Google jaisa ecosystem
  banana hai. `GothwadTech/accounts` + `GothwadTech/mail` padh ke samjha.
- Decision (Pawan):
  - `gothwadtech.com` = portal (root pe)
  - Corporate content → `about.gothwadtech.com`
  - Search = OpenRouter AI, upar AI answer + niche 10 real links
  - Homepage: **product shortcuts main body**, search bar bhi rahega
  - Design: **apna brand** (`#0494f4` + lucide), Google palette NAHI
- Workers pe deploy baad mein karna hai (mail repo jaisa).
