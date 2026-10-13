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

**Portal homepage = product shortcuts hi main content hain.**
⚠️ **Is site par KOI SEARCH SYSTEM NAHI HAI.** Search bar nahi, `/search` route
nahi, koi search API nahi. Pawan ne explicitly kaha (2026-10-13): search nahi
chahiye, sirf product shortcuts. Dobara search add mat karna bina poochhe.

### Routes (sab real paths, hash nahi)

| Path | Kya hai |
|---|---|
| `/` | Portal home — wordmark, product shortcuts, footer |
| `/auth/callback` | OAuth return from Accounts (🔜 TODO) |
| `/legacy` | Purani corporate homepage — **temporary**, delete after about. site is live |
| `/solutions`, `/products`, `/portfolio`, `/about`, `/contact` | Corporate pages — inhe bhi `about.` pe move karna hai |

## 3. 🛠️ TECH STACK (100% FREE TIER — ZERO BUDGET!)

| Layer | Tech |
|---|---|
| Frontend | React 19 + Vite + Tailwind v4 → Cloudflare **Pages** |
| Auth | Gothwad Accounts (OAuth 2.0 + PKCE) |
| DNS/CDN/SSL | Cloudflare |

**Koi backend/API nahi hai** — yeh ek static SPA hai. (Agar OAuth ke liye
httpOnly cookie chahiye toh baad mein ek chhota Worker add ho sakta hai.)

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

## 5. 🚦 CURRENT STATUS (last updated: 2026-10-13)

| Step | Kya | Status |
|------|-----|--------|
| 1 | Repo cleanup (dead code, ESLint, path routing, CI) | ✅ DONE (PR #1) |
| 2 | Portal home: product shortcuts + app launcher + account chip | ✅ DONE |
| 3 | OAuth account chip (Sign in → avatar) | 🔜 NEXT |
| 4 | Corporate content → `about.gothwadtech.com` | 📋 Planned |

> Ek AI-search version (OpenRouter + Cloudflare Worker) banaya gaya tha aur
> phir **hata diya gaya** — Pawan ko search chahiye hi nahi tha. History mein
> commit `2246bc4` se pehle mil jayega agar kabhi dobara chahiye.

## 6. ▶️ LOCAL DEV

```bash
npm install
npm run dev              # portal on :3000
```

`npm run verify` = typecheck + lint + build (CI bhi yahi chalta hai).

**Live status + task board: `TASK.md`** (woh fresh rahta hai, yahan stale ho
sakta hai).
