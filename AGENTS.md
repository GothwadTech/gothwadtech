# 🤖 AGENTS.md — AI Working Guide (READ THIS FIRST!)

> **Agar tum ek AI agent ho jo is repo mein kaam karne aaya ho:** sabse pehle
> yeh file padho, phir `TASK.md`. Har session ke END mein `TASK.md` update
> karna zaroori hai. **Yeh file delete/move mat karna.**
>
> Isi tarah ki files `GothwadTech/accounts` aur `GothwadTech/mail` mein hain —
> wahan se context mil sakta hai.

---

## 1. 👤 CLIENT KON HAI

- **Pawan** (solo founder, "Gothwad Tech") + chhoti team (dost, beginners).
- Baat-cheet: **simple English / Hinglish**. Technical jargon use karo, par
  hamesha **explain** karo ki kya ho raha hai aur kyun.
- Team beginners hain → code **simple, well-commented**. Har comment "why"
  bataye, sirf "kya" nahi.

## 2. 🔥 YEH REPO KYA HAI

**gothwadtech.com = GOTHWAD portal** — google.com jaisa front door for the
whole Gothwad ecosystem.

| Property | Kya hai |
|---|---|
| `gothwadtech.com` (yeh repo) | Portal: search + product shortcuts + account chip |
| `accounts.gothwadtech.com` | Central auth hub, OAuth 2.0 provider (`GothwadTech/accounts`) |
| `mail.`, `drive.`, `meet.`, `tube.`, `store.`, `notes.`, `calendar.`, `contacts.` | Ecosystem apps |
| `about.gothwadtech.com` | Company / agency site (corporate content) |

**Portal homepage = search bar UPAR + product shortcuts NICHE (main body).**
Sirf search bar nahi — product tiles hi main content hain.

### Routes (sab real paths, hash nahi)

| Path | Kya hai |
|---|---|
| `/` | Portal home — wordmark, search bar, product shortcuts, footer |
| `/search?q=...` | Results: AI answer card upar, cited sources niche |
| `/auth/callback` | OAuth return from Accounts (🔜 TODO) |
| `/legacy` | Purani corporate homepage — **temporary**, delete after about. site is live |
| `/solutions`, `/products`, `/portfolio`, `/about`, `/contact` | Corporate pages — inhe bhi `about.` pe move karna hai |

## 3. 🛠️ TECH STACK (100% FREE TIER — ZERO BUDGET!)

| Layer | Tech |
|---|---|
| Frontend | React 19 + Vite + Tailwind v4 → Cloudflare **Pages** |
| Search API | Cloudflare **Worker** (`worker/`) + OpenRouter |
| KV | Cloudflare KV — search cache + rate limit |
| Auth | Gothwad Accounts (OAuth 2.0 + PKCE) |
| DNS/CDN/SSL | Cloudflare |

**Paid service kabhi suggest mat karo** — sab free tier mein fit hona chahiye.

## 4. 📏 HARD RULES (KABHI MAT TODO!)

1. **Domain-agnostic code (RULE #1, accounts repo se):** kahin bhi
   `gothwadtech.com` hardcode mat karo. Sirf ek jagah:
   `src/data/portalConfig.ts` (frontend) aur `worker/wrangler.toml` (Worker).
   Dono `VITE_*` / `[vars]` se override ho sakte hain.
2. **Secrets sirf Worker mein.** `OPENROUTER_API_KEY` kabhi frontend mein
   nahi, kabhi git mein nahi. `.dev.vars` gitignored hai.
3. **Design system: apna brand, Google ka nahi.** Brand color **`#0494f4`**,
   icons **lucide-react**, font stack Tailwind default. Accounts/Mail Google
   palette use karte hain — **yeh repo nahi**. Deliberate decision (2026-10-13).
4. **SPA fallback:** Cloudflare Pages ko `public/_redirects` chahiye
   (`/* /index.html 200`). Isse mat hatana — warna deep links 404.
   (Workers pe move karoge toh `_redirects` kaam nahi karta —
   `assets.not_found_handling = "single-page-application"` chahiye.)
5. **Naye product add karo** toh `src/data/gothwadApps.ts` mein add karo AUR
   `accounts/web/js/gothwad-apps.js` mein bhi — dono sync mein rakhne hain.

## 5. 🔍 SEARCH — KAISE KAAM KARTA HAI

```
Browser ──POST /api/search {q}──► Worker ──► OpenRouter ──► answer + sources
                                    │
                                    └─ KV cache (repeat query = free)
```

**Fake URLs ka khatra:** model se direct "10 links do" mat mangwana — wo URLs
ghadh deta hai. Isliye OpenRouter ka web search use karte hain, jo
`url_citation` annotations mein **REAL** URLs deta hai. Model sirf upar ka
answer likhta hai. `extractSources()` in worker/src/index.ts dekho.

**Cost (ZERO-BUDGET ke liye important):**
- Model `:free` hai, par **web search alag se billed hai** (~$4/1000 results).
- `SEARCH_MAX_RESULTS = 10` → ~$0.04 per query.
- Isliye KV cache (`CACHE_TTL_SECONDS`) + `DAILY_QUERY_LIMIT` zaroori hain.
- Agar cost badhe toh pehle `SEARCH_MAX_RESULTS` ghatao, cache badhao.

## 6. 🚦 CURRENT STATUS (last updated: 2026-10-13)

| Step | Kya | Status |
|------|-----|--------|
| 1 | Repo cleanup (dead code, ESLint, path routing, CI) | ✅ DONE (PR #1) |
| 2 | Portal home: search + product shortcuts | ✅ DONE |
| 3 | `/search` results page (AI answer + sources) | ✅ DONE (UI) |
| 4 | Search Worker (`worker/`) | ✅ DONE — **API key set karni baaki** |
| 5 | OAuth account chip (Sign in / avatar) | 🔜 NEXT |
| 6 | Corporate content → `about.gothwadtech.com` | 📋 Planned |

**Live status + task board: `TASK.md`** (woh fresh rahta hai, yahan stale ho
sakta hai).

## 7. ▶️ LOCAL DEV

```bash
npm install
npm run dev              # portal on :3000

# Search Worker (alag terminal) — pehle worker/ mein install karna padega
cd worker && npm install
cp .dev.vars.example .dev.vars    # OPENROUTER_API_KEY daalo
npm run worker:dev                # Worker on :8787
```

Bina API key ke search page dikhega par "AI search is not enabled yet" bolega.
Key set karte hi kaam shuru.

`npm run verify` = typecheck + lint + build (CI bhi yahi chalta hai).
