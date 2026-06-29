# V1 Release Checklist Run

Run date: 2026-06-29

This document records the local release gate run for the v1 hardening and scaling plan. It does not mark production released.

## Completed Local Gates

- `git status --short`: clean before Item 14 documentation edits.
- `npm test`: passed, 12 files and 69 tests.
- `npm run check`: passed, 0 errors, 0 warnings, 0 hints.
- `npm run build`: passed, including 8 generated static pages.
- `npm run db:migrate:local`: passed, with no pending migrations.
- `npm run db:seed:local`: passed, 716 local D1 commands executed successfully.
- `npm run dev:worker`: started successfully and reported ready on `http://localhost:8787`; the server was stopped after verification.

Local seed summary:

- 6 tracks.
- 21 units.
- 80 lessons.
- 518 questions.
- Parent `bill` and 2 child profiles.

## Blocked Or Not Run

- A follow-up localhost HTTP probe was blocked by the desktop approval usage limit after the Worker had already reported ready.
- Manual browser QA was not completed in this run. Before a production release, verify login, profile selection, child track visibility, standard lesson completion, Mad Minute completion, parent dashboard progress, subject-level overrides, parent gate behavior, and logout.
- Release tagging was not performed because manual QA was not complete.
- Remote push, remote migrations, remote seed, deploy, production smoke verification, and Cloudflare log review were not performed because they require intentional live-release access and should happen only after manual QA approval.

## Release Operator Checklist

Before tagging or deploying production:

1. Confirm `git status --short` is clean.
2. Complete the manual product QA gate from `docs/v1-hardening-and-scaling-plan.md`.
3. Tag the final release commit only after the manual gate passes.
4. Push the branch and release tag.
5. Apply remote migrations only when targeting production intentionally.
6. Seed remote only when intentionally replacing or refreshing remote seed content.
7. Deploy.
8. Smoke test `https://learn.billplustara.com/login/`.
9. Check Cloudflare Worker logs for release-time errors.
