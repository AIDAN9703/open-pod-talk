# Open Pod Talk

Next.js marketing site + caller intake form + authenticated admin (Supabase Auth, submissions, Riverside links).

Tagline on the marketing site: **all views, just bring it!**

## Prerequisites

- Node 20+
- A [Supabase](https://supabase.com/) project (free tier is fine)
- Optional: [Resend](https://resend.com/) for notifications, Cloudflare Turnstile for CAPTCHA, Upstash for rate limiting

---

## Create the Supabase project

1. In the Supabase dashboard: **New project** → note the generated **database password**.
2. **Project Settings → API**
   - Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy the **anon** JWT or the newer **publishable** key (`sb_publishable_…`) → set either **`NEXT_PUBLIC_SUPABASE_ANON_KEY`** or **`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`** (the app accepts both — same role as legacy “anon”).
   - Copy **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (server only; never commit or expose in client bundles)

---

## Apply database migrations

In the dashboard: **SQL Editor → New query**, then run **both** files **in filename order**:

1. `supabase/migrations/20260430160300_hosts_submissions.sql`  
   Creates `submissions` and Row Level Security so **any authenticated user** can read/update submissions. Public callers do **not** insert via the anon key; the app uses the **service role** on the server for inserts.

2. `supabase/migrations/20260430160400_broadcast_status.sql`  
   Creates `broadcast_status` for the green/red **On air / Off air** website flag.

If you use the [Supabase CLI](https://supabase.com/docs/guides/cli): link the project and run `supabase db push`.

---

## Auth: email + password (host signup/login)

Admins use **`/admin/login`** with Supabase’s browser client:

- **Sign up** calls `supabase.auth.signUp({ email, password })`.
- **Log in** calls `supabase.auth.signInWithPassword({ email, password })`.
- Any signed-in Supabase user can access the admin dashboard.

### Supabase dashboard setup

1. **Authentication → Providers → Email** — keep **Email** enabled.

2. For easiest local dev, disable mandatory email confirmation. If confirmation stays enabled, sign-up will say “check your email,” and you must confirm before logging in.

3. **Redirect URLs** — used by email confirmation / future OAuth. Match your dev origin (`localhost` vs `127.0.0.1`):

   - `http://localhost:3000/auth/callback`
   - `http://127.0.0.1:3000/auth/callback`
   - `https://YOUR-DOMAIN/auth/callback`

4. **`NEXT_PUBLIC_SITE_URL` in `.env.local`** — should match the origin you actually use (`http://localhost:3000` etc.). Caller emails and redirects still use this.

5. **`SUPABASE_SERVICE_ROLE_KEY` is still required** for public caller submissions, because the public form inserts rows server-side while RLS blocks anonymous database writes. Never expose it as `NEXT_PUBLIC_*`.

The app exposes:

- **`GET /auth/callback`** — finishes OAuth/email-confirmation `?code=` flows (password login rarely needs it).
- **`POST /auth/signout`** — ends the session (admin header).

## Env locally

Copy `.env.example` to `.env.local` and fill values. Minimal for local hacking:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...   # or NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Caller submissions need the **service role** key installed; without it inserts will fail.

Optional:

- Turnstile + Upstash vars from `.env.example` as you enable those features.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Troubleshooting: admin login / redirects

`/admin/login` shows an **environment check** (red box) when URL or keys look wrong — fix `.env.local` and **restart** the dev server.

1. **Sign-up/log-in fails in the form** — this uses Supabase’s browser client directly, so the visible message should be the Supabase Auth error. Verify **Authentication → Providers → Email** is on and that email/password signups are allowed.

2. **Try the legacy anon JWT** — In Supabase **Project Settings → API**, copy the long **`anon`** `eyJ…` token into **`NEXT_PUBLIC_SUPABASE_ANON_KEY`** (leave publishable unset for a minute). Older stacks sometimes behave more reliably than `sb_publishable_…`.

3. **Can log in but admin data fails** — run both migrations. Admin data is readable/updatable by any authenticated user through RLS.

4. Debug in Chrome **Network**: open `/admin/login` — responses should mostly be **200**. Chains of **307** hint at redirects; compare **`Location`** headers.

---

## On-air / off-air behaviour

Hosts toggle **Site → On air / Off air** in the admin chrome. Stored in **`broadcast_status`**. Visitors see green **On air** and a banner when live, red **Off air** otherwise.

Apple / Spotify feeds do **not** read Supabase automatically; those apps only change if you add separate automation.

---

## Production notes

- Set **NEXT_PUBLIC_SITE_URL** to your canonical HTTPS URL for email links from the submission flow and other redirects.
- Store **SUPABASE_SERVICE_ROLE_KEY** only in server env (e.g. Vercel **Environment Variables**, not `NEXT_PUBLIC_*`).

## Scripts

```bash
npm run dev       # Turbopack dev server
npm run build    # Production build
npm run start    # Serve production locally
npm run lint
```
