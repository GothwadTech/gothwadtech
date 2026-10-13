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
- [x] `src/components/portal/PortalBar.tsx` — app launcher (9-dot) + theme + Sign in
- [x] `src/pages/PortalHome.tsx` — wordmark + product shortcuts + footer
- [x] Routing: `/` portal, `/legacy` (corporate home preserved)
- [x] Global Navbar/Footer/WhatsApp sirf corporate pages pe (portal pe apne hain)
- [x] `AGENTS.md` + `TASK.md` (accounts/mail wala convention)

### Session 2b — Search HATA DIYA (2026-10-13)
Pawan ne clear kiya: **search chahiye hi nahi.** Jo search system banaya tha
wo sab revert kar diya:
- [x] `src/components/portal/SearchBox.tsx` delete
- [x] `src/pages/SearchPage.tsx` delete
- [x] `src/services/searchApi.ts` + `src/types/search.ts` delete
- [x] `worker/` (OpenRouter, KV cache, rate limit) delete — poora folder
- [x] App.tsx se `/search` route, `searchQuery`, `handleSearch` hataaye
- [x] `portalConfig.ts` se `SEARCH_API`, `vite-env.d.ts` se `VITE_SEARCH_API`
- [x] `package.json` se `worker:*` scripts, `tsconfig.json` se worker exclude
- [x] AGENTS.md + TASK.md update (search ka koi zikr nahi)

⚠️ **Yaad rakho: is project mein search system NAHI hai.** Dobara mat banana
bina poochhe. (Agar kabhi chahiye: commit `2246bc4` se pehle history mein hai.)

---

## 🔜 NEXT (priority order)

### 1. OAuth account chip (Sign in → avatar)
- [ ] Accounts repo: `ecosystem_apps` mein client register karo —
      `client_id = gothwad-portal`,
      `redirect_uri = https://gothwadtech.com/auth/callback`
- [ ] PKCE flow implement (`/auth/callback` route)
- [ ] `PortalBar` mein avatar + name + "Manage your Gothwad Account" + Sign out
- [ ] Token storage decide: memory vs httpOnly cookie (cookie ke liye Worker chahiye)

### 2. Corporate content → `about.gothwadtech.com`
- [ ] Naya Cloudflare Pages project `about.gothwadtech.com` ke liye
- [ ] Corporate pages (`/solutions`, `/products`, `/portfolio`, `/about`,
      `/contact`, `/legacy`) wahan deploy
- [ ] Is repo se corporate pages + `/legacy` delete
- [ ] Portal footer ka "About" link check

### 3. Baad mein
- [ ] `gothwad.in` domain pe switch (AGENTS.md mein future domain likha hai)

---

## ⚠️ JANI-PEHCHANI PROBLEMS (baar baar aati hain)

1. **Cloudflare Pages SPA fallback** — `_redirects` zaroori hai. Workers pe
   jaoge toh wo kaam nahi karega (`not_found_handling` chahiye).
2. **KOI SEARCH NAHI** — Pawan ko search system chahiye hi nahi. Search bar,
   `/search` route, search API kuch nahi. Product shortcuts hi hain.
3. **Domain hardcode** — `src/data/portalConfig.ts` ke alawa kahin nahi
   (Rule #1, accounts repo se).
4. **Sandbox reset** — kabhi kabhi git objects lost ho jate hain aur commits
   gayab ho jate hain (working tree + node_modules bhi chala jata hai).
   Baar baar push karte raho, aur verify se pehle `npm install` check karo.

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

### 2026-10-13 (Session 2b) — CORRECTION
- maine Pawan ka message galat padha tha: unhone pehle hi kaha tha
  "search bar ki jagah product shortcuts". Maine "search bhi rakhna" ko
  "keep search too" samajh liya — galat.
- Pawan ne clear kiya: **"mujhe search system chahiye hi nahi"**.
- Poora search system revert kar diya (SearchBox, SearchPage, searchApi,
  types, worker/ folder, /search route).
- Seekh: Hinglish mein "X ki jagah Y" ka matlab hai X HATAO, Y lagao —
  "bhi rakhna" wale hisse par confirm zaroor kar lo.
