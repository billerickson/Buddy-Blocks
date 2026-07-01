# Buddy Blocks Public Self-Hosted Release

> Merged implementation target: see `docs/v3-dev-spec.md`, which combines this public-release plan with the V3 curriculum, hint, onboarding, and seed-data removal work.

## Summary

- Convert Buddy Blocks from a personal seeded-family app into a single-family, self-hosted Cloudflare Workers + D1 template.
- Deploy this new version to `buddyblocks.billerickson.net`; keep the existing `learn.billplustara.com` site live for now while building out the new Buddy Blocks app on the new subdomain.
- Treat `learn.billplustara.com` as the old MVP. The new site starts from a blank slate with no migrated parent accounts, child profiles, learner progress, attempts, or practice data.
- First-run onboarding creates the only active parent account; public registration closes once that parent exists.
- Parents can create, edit, archive, and unarchive child profiles, with grade level stored per child and progress preserved.
- Keep the provisioning model compatible with a later hosted SaaS version that uses one multi-tenant install instead of one Cloudflare deployment per family.

## Key Changes

- Remove Bill/Reagan/Ada assumptions from seeding, UI copy, docs, tests, brand guide, and curriculum examples. The V3 seed should create curriculum only, never hardcoded parents or kids.
- Replace fixed family seeding in `src/lib/seed-family.ts` with generic provisioning: seed curriculum only, then ensure missing track/lesson progress for dynamic children.
- Add first-run routes and APIs:
  - `GET /api/setup/status`
  - `POST /api/setup/parent`
  - `GET/POST /api/parent/children`
  - `PATCH /api/parent/children/:childId`
- Build a clean V3 schema or migration baseline with `child_profiles.status`, one-active-parent enforcement, and optional parent email support. Child slugs are generated once at creation and remain stable.
- Remove MVP-only data migrations, compatibility code, generated curriculum scripts, fixtures, and unsupported features once V3 replacements exist.
- Update login, parent gate, profile selector, and parent dashboard for generic onboarding and child management.

## Documentation

- Add `README.md`, `AGENTS.md`, `.env.example`, and `LICENSE` with MIT as the default assumption.
- AI-assisted setup docs: tell Codex/Claude to collect domain, time zone, create a fresh D1 database, update Wrangler config, initialize schema, seed curriculum, build/deploy, and verify onboarding.
- Human setup docs: beginner-friendly Cloudflare steps, including `npm install`, `npx wrangler login`, `npx wrangler d1 create buddy_blocks`, schema initialization, curriculum seed, deploy, and custom domain setup.
- Content authoring docs: relative paths only, sample track/unit/lesson YAML, question types, subject metadata, scholastic vs foundation rules, stable IDs, validation, and reseeding.
- Use official Cloudflare references for setup accuracy: [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/), [D1 Getting Started](https://developers.cloudflare.com/d1/get-started/), [D1 Migrations](https://developers.cloudflare.com/d1/reference/migrations/), [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), and [D1 Limits](https://developers.cloudflare.com/d1/platform/limits/).

## Hosted SaaS Direction

- The paid hosted version should be one multi-tenant Buddy Blocks install at `app.buddyblocks.io` or `buddyblocks.io`, not one separate Worker/D1 deployment per customer.
- Parent login should determine the tenant/family from the authenticated session. Subdomains such as `smith.buddyblocks.io` can be added later as optional aliases, but they should not be required for the first hosted release.
- Shared curriculum should remain global and seeded once. Family-owned data should be tenant-scoped: parents, children, sessions, progress, attempts, practice sets, and billing records all need `tenant_id` or `family_id`.
- Self-hosted single-family mode and hosted multi-tenant mode should share the same child provisioning and progress initialization helpers so bug fixes and curriculum seeding behavior stay aligned.
- The hosted SaaS scope is tracked separately in [hosted-saas-plan.md](hosted-saas-plan.md).

## Test Plan

- Add worker tests for first-run setup, duplicate parent prevention, session creation, child create/edit/archive, archived-child access blocking, and cross-origin mutation rejection.
- Replace fixed-family tests with generic fixtures and dynamic provisioning tests.
- Verify a fresh schema plus curriculum seed leaves zero parent and child rows, then onboarding creates the first parent and children.
- Verify future V3 curriculum reseeding repairs dynamic child progress without overwriting completed work created on the new site.
- Run `npm test`, `npm run content:validate`, `npm run check`, and `npm run build`.
- Manual smoke: fresh local DB -> onboarding -> add child -> complete lesson -> archive/unarchive child -> deploy-path checklist.

## Assumptions

- Single-family app, create/edit/archive child management, and beginner-friendly docs are locked in.
- No multi-family hosting, invite system, email password recovery, or migration of MVP family data in this release.
- Cloudflare config is sanitized for public distribution; each user supplies their own domain, D1 database ID, and time zone.
- Hosted SaaS is a follow-on product track, not part of the first free self-hosted release.
