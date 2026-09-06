# Adii link page

Next.js recreation of the supplied Linktree-style UI.

## Run

```bash
bun install
bun dev
```

Open http://localhost:3000

Edit `app/links.js` to replace the links and images.

## Link click analytics

Each link click is recorded server-side via Supabase. The `/stats` page shows
totals, clicks per link, and a daily breakdown. No IPs, fingerprints, or other
personal data are stored — only the link id, timestamp, and optional referrer.

### 1. Set up Supabase

1. Create a project at https://supabase.com
2. Open **SQL Editor** and run the migration in
   `supabase/migrations/0001_link_click.sql`
3. Go to **Project Settings → API** and copy:
   - Project URL → `SUPABASE_URL`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`
     (NOT the anon key — the anon key cannot read or write this table)

### 2. Configure env vars

```bash
cp .env.example .env
```

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
# Optional: require `?token=<value>` to open /stats
STATS_TOKEN=
```

Restart the dev server after adding them.

### 3. View stats

Open `http://localhost:3000/stats` (with `?token=...` if `STATS_TOKEN` is set).

The analytics endpoint (`POST /api/click`) fires from the client and is
fire-and-forget — a failed or slow insert never blocks or breaks the link
navigation.