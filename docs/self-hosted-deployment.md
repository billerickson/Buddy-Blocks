# Self-Hosted Deployment

This guide is for the public self-hosted Buddy Blocks V3 deployment at `buddyblocks.net`.

It intentionally does not cover hosted SaaS billing, tenants, Stripe, or multi-family onboarding. Keep that scope in `docs/hosted-saas-plan.md`.

## Cloudflare References

These links were checked on 2026-07-01:

- [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/)
- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Workers Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
- [D1 getting started](https://developers.cloudflare.com/d1/get-started/)
- [D1 Wrangler commands](https://developers.cloudflare.com/d1/wrangler-commands/)
- [D1 migrations](https://developers.cloudflare.com/d1/reference/migrations/)
- [Workers local data](https://developers.cloudflare.com/workers/local-development/local-data/)
- [D1 limits](https://developers.cloudflare.com/d1/platform/limits/)

## Prerequisites

Use Node.js and npm from this repository's normal development environment, and sign in to the target Cloudflare account:

```bash
npm install
npx wrangler login
```

Confirm that `buddyblocks.net` is available in the Cloudflare account. The `buddyblocks.net` zone has been added and currently has no DNS records. The V3 Worker uses a Custom Domain route in `wrangler.jsonc`, so keep the hostname free of conflicting DNS records and do not point this repo at `learn.billplustara.com`.

Before any remote deploy, create or choose the fresh V3 D1 database and update `wrangler.jsonc` with its `database_id`. Do not reuse the old private MVP database unless it has intentionally been reset for V3.

## Preflight Validation

Run the full local validation suite before changing Cloudflare resources:

```bash
npm run content:validate
npm test
npm run check
npm run build
npx wrangler deploy --dry-run
```

The dry run verifies the Worker bundle, asset binding, D1 binding, and custom-domain route shape without publishing the Worker.

## D1 Setup

Create a fresh V3 database:

```bash
npx wrangler d1 create buddy_blocks
```

Copy the returned database UUID into `wrangler.jsonc` under `d1_databases[0].database_id`. Keep the binding name as `DB`, because `src/worker.ts` expects `env.DB`.

Apply migrations locally when testing the setup on this machine:

```bash
npm run db:migrate:local
npm run db:seed:local
```

Apply migrations and seed the remote production database only after the config points to the fresh V3 database:

```bash
npm run db:migrate:remote
npm run db:seed:remote
```

After the remote seed, confirm that curriculum rows exist and family-owned rows are empty:

```bash
npx wrangler d1 execute buddy_blocks --remote --command "SELECT COUNT(*) AS tracks FROM tracks;"
npx wrangler d1 execute buddy_blocks --remote --command "SELECT COUNT(*) AS parents FROM parents;"
npx wrangler d1 execute buddy_blocks --remote --command "SELECT COUNT(*) AS children FROM child_profiles;"
```

The parent and child counts must both be `0` immediately after curriculum seed. First-run setup creates the first parent later through the app.

## Deploy

The production route is configured in `wrangler.jsonc`:

```json
{
  "routes": [
    {
      "pattern": "buddyblocks.net",
      "custom_domain": true
    }
  ]
}
```

Cloudflare Custom Domains require an active Cloudflare zone and a hostname without a conflicting DNS record. Deploy only after the fresh D1 database id and custom domain are ready:

```bash
npm run deploy
```

Workers Static Assets are served from `dist/` through the `ASSETS` binding. The deploy command should be run after `npm run build` so `dist/` reflects the current app.

## First-Run Onboarding

Open `https://buddyblocks.net/setup/`.

1. Create the single self-hosted parent account with username, optional email, and password.
2. Confirm the app creates a parent session and redirects to the parent area.
3. Create at least one child from the parent dashboard with display name and grade level.
4. Confirm the child appears in profile selection.

After the first active parent exists, setup is closed as public registration. Future hosted SaaS signup should be implemented separately from this self-hosted first-run flow.

## Smoke Test Checklist

Run this smoke test before treating the deployment as production ready:

- `GET /api/setup/status` reports configured after first-run setup.
- Parent login works after logout.
- Parent dashboard can create, edit, archive, and unarchive a child.
- Active children appear in kid profile selection; archived children do not.
- A child can open the kid home, open a track, start a lesson, answer questions, see retry hints only after a missed first attempt, and save progress.
- An archived child is blocked from kid routes and APIs, then regains access after unarchive with progress preserved.
- Remote D1 parent and child rows reflect only the setup-created family.
- `learn.billplustara.com` remains live as the old MVP deployment during this smoke period.

Do not retire `learn.billplustara.com` until the new-domain smoke test passes and the release checklist explicitly authorizes retirement.

## D1 Operating Notes

D1 has per-database storage and throughput limits. Keep migrations small and batch any large data changes; V3 curriculum seed should be a normal SQL import, not a family-data migration from the old site.

Monitor D1 reads, writes, latency, and storage after launch. If the future hosted SaaS version needs tenant scale beyond a single self-hosted family, follow `docs/hosted-saas-plan.md` instead of expanding this self-hosted deployment guide.
