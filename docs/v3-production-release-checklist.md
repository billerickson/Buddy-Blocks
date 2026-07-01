# V3 Production Release Checklist

This file records the production cutover evidence for the V3 self-hosted launch while `docs/v3-dev-spec.md` remains the source of truth.

## 2026-07-01 Production Smoke

- [x] Create a fresh V3 D1 database named `buddy_blocks_v3`.
- [x] Configure the ignored local `wrangler.deploy.jsonc` for the V3 deployment target.
  - Notes: V3 uses Worker `buddy-blocks-v3`, D1 binding `DB`, database `buddy_blocks_v3`, and custom domain `buddyblocks.net`.
- [x] Run preflight validation before remote changes.
  - Evidence: `npm run content:validate`, `npm test`, `npm run build`, and `npm run deploy:dry-run` passed on 2026-07-01.
- [x] Apply remote V3 migrations.
  - Evidence: `npm run db:migrate:remote` applied `0001_initial.sql` and `0002_hosted_interest_emails.sql`.
- [x] Seed remote V3 curriculum.
  - Evidence: `npm run db:seed:remote` seeded 12 tracks, 90 units, 412 lessons, and 2472 questions into `buddy_blocks_v3`.
- [x] Confirm blank-slate remote data before first-run smoke.
  - Evidence: remote D1 query returned 12 tracks, 90 units, 412 lessons, 2472 questions, 0 parents, and 0 children.
- [x] Deploy V3 to the new public domain.
  - Evidence: `npm run deploy` published Worker `buddy-blocks-v3` version `1b6e68d7-82ce-4ce5-bf2f-9bf1166ab1f5` with the `buddyblocks.net` custom domain.
- [x] Confirm the old MVP site remains live.
  - Evidence: restored old Worker `buddy-blocks` to version `6e8d3052-0f6c-436c-af8e-d39bed8c4401`, bound to the prior MVP D1 database, and reattached route `learn.billplustara.com/*`. `GET https://learn.billplustara.com/` returned HTTP 200 with the old catalog page.
- [x] Smoke first-run setup on production.
  - Evidence: temporary parent `v3_prod_smoke` was created through `POST /api/setup/parent`, returning a parent session and `/parent/` redirect.
- [x] Smoke child creation and dynamic provisioning on production.
  - Evidence: temporary grade 3 child `prod-smoke` was created through `POST /api/parent/children`; child home returned 10 available tracks and recommended `lesson_grade3_math_u01_l01_hundreds_tens_and_ones`.
- [x] Smoke lesson play and progress saving on production.
  - Evidence: submitted all six live lesson questions from the production lesson payload; result returned 6/6, 21 XP, streak 1, and next lesson `lesson_grade3_math_u01_l03_addition_strategies_that_still_work`.
- [x] Smoke child edit, archive, and unarchive on production.
  - Evidence: edited the child display name, archived the child, confirmed kid home returned `403 child_locked`, unarchived the child, and confirmed progress remained with 21 XP.
- [x] Remove temporary smoke family rows after production smoke.
  - Evidence: remote D1 cleanup removed the temporary parent, child, sessions, attempts, and child progress rows. Follow-up query returned 12 tracks, 90 units, 412 lessons, 2472 questions, 0 parents, 0 children, 0 lesson attempts, and 0 child lesson progress rows.
- [x] Confirm production first-run setup is ready for the real owner.
  - Evidence: `GET /api/setup/status` on `buddyblocks.net` returned `configured: false`, `setupRequired: true`, and `activeParentCount: 0`; `GET /` redirected to `/setup/`.

## Dual-Site Hold

- [x] Keep `learn.billplustara.com` live during the V3 smoke period.
  - Notes: Do not remove the `learn.billplustara.com/*` route, delete Worker `buddy-blocks`, or delete the old MVP D1 database until the owner explicitly authorizes old-site retirement after the dual-site period.
- Deferred: retire `learn.billplustara.com`.
  - Notes: Not performed during V3 launch smoke. This is a later owner-authorized operational decision, not required for V3 production readiness.

## DNS Note

Public resolvers returned Cloudflare A records for `buddyblocks.net` during smoke, but the local system resolver intermittently lagged immediately after moving the custom domain. Production smoke requests used `curl --resolve buddyblocks.net:443:104.21.75.5` to verify the deployed Worker through Cloudflare while DNS propagation settled.
