# Self-Hosted Deployment for Your Own Domain

This repository can be deployed as a single-family, self-hosted Buddy Blocks site on Cloudflare Workers, Workers Static Assets, and D1.

The recommended hostname for outside deployers is `buddyblocks.yoursite.com`, where `yoursite.com` is your own domain and its DNS is managed by Cloudflare.

Do not deploy your copy to `buddyblocks.net` or `learn.billplustara.com`. Those hostnames belong to the project owner's public/legacy deployments.

## 1. Clone and Install

Clone the repository, install dependencies, and sign in to the Cloudflare account that owns `yoursite.com`:

```bash
git clone <repo-url>
cd learn.billplustara.com
npm install
npx wrangler login
```

Confirm that `yoursite.com` is an active Cloudflare DNS zone before continuing. The Worker will use `buddyblocks.yoursite.com` as a Cloudflare Custom Domain, so keep that hostname free of conflicting DNS records.

## 2. Configure Your Hostname

Update `astro.config.mjs` so generated site URLs use your subdomain:

```js
export default defineConfig({
  integrations: [preact(), tailwind({ applyBaseStyles: false })],
  site: 'https://buddyblocks.yoursite.com',
});
```

Update the Custom Domain route in `wrangler.jsonc`:

```json
{
  "routes": [
    {
      "pattern": "buddyblocks.yoursite.com",
      "custom_domain": true
    }
  ]
}
```

Leave the static asset binding named `ASSETS` and the D1 binding named `DB`; `src/worker.ts` expects those binding names. If the Worker name `buddy-blocks` already exists in your Cloudflare account, choose another `name` in `wrangler.jsonc`.

Keep personal Cloudflare IDs and hostname changes in your own fork or deployment branch. Do not open an upstream pull request that replaces the project owner's deployment target with your private account values.

## 3. Create a Fresh D1 Database

Create a new D1 database in your Cloudflare account:

```bash
npx wrangler d1 create buddy_blocks
```

Copy the returned database UUID into `wrangler.jsonc`:

```json
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "buddy_blocks",
      "database_id": "<your-d1-database-uuid>"
    }
  ]
}
```

The npm migration and seed scripts target the database name `buddy_blocks`. Keep that name unless you also update every package script that references it.

## 4. Validate Locally

Run the local validation suite before changing remote Cloudflare resources:

```bash
npm run content:validate
npm test
npm run check
npm run build
npx wrangler deploy --dry-run
```

The dry run verifies the Worker bundle, static asset binding, D1 binding, and custom-domain route without publishing the Worker.

Optional local database setup:

```bash
npm run db:migrate:local
npm run db:seed:local
```

## 5. Prepare the Remote Database

After `wrangler.jsonc` points at your own fresh D1 database, apply migrations and seed the curriculum data:

```bash
npm run db:migrate:remote
npm run db:seed:remote
```

Confirm that curriculum rows exist and no family-owned rows were created by the seed:

```bash
npx wrangler d1 execute buddy_blocks --remote --command "SELECT COUNT(*) AS tracks FROM tracks;"
npx wrangler d1 execute buddy_blocks --remote --command "SELECT COUNT(*) AS parents FROM parents;"
npx wrangler d1 execute buddy_blocks --remote --command "SELECT COUNT(*) AS children FROM child_profiles;"
```

The `parents` and `children` counts should both be `0` immediately after the curriculum seed.

## 6. Deploy

Deploy only after `astro.config.mjs`, `wrangler.jsonc`, and the D1 database ID all point to your own Cloudflare account and `buddyblocks.yoursite.com` hostname:

```bash
npm run build
npm run deploy
```

Open your first-run setup screen:

```text
https://buddyblocks.yoursite.com/setup/
```

Create the first parent account, then create at least one child profile from the parent dashboard. After the first active parent exists, public setup is closed for that self-hosted installation.

## 7. Smoke Test

Before treating the deployment as ready, verify:

- `GET /api/setup/status` reports the site as configured after first-run setup.
- Parent logout and login work.
- The parent dashboard can create, edit, archive, and unarchive a child.
- Active children appear in kid profile selection; archived children do not.
- A child can open the kid home, open a track, start a lesson, answer questions, see retry hints after a missed first attempt, and save progress.
- An archived child is blocked from kid routes and APIs, then regains access after unarchive with progress preserved.
- Remote D1 parent and child rows reflect only the family you created during setup.

This deployment path is for a personal self-hosted site. It is not the hosted SaaS onboarding, billing, or multi-family tenant flow.
