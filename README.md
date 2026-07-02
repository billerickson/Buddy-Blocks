# Buddy Blocks

Buddy Blocks is a family learning app where kids build progress one small lesson at a time. It pairs a colorful, kid-friendly practice loop with a parent dashboard, so daily school practice has a clear path without turning into a planning project.

The app is designed for a single family running its own private copy. Parents can create child profiles, see progress, and guide practice while kids move through short lessons with immediate feedback, retry hints, XP, hearts, streaks, and badges.

![screenshot](https://buddyblocks.net/og/buddy-blocks-option-2.png)

## Features

- Multi-profile family setup with a first-run parent account.
- Kid profile selection and a touch-friendly learner dashboard.
- Research-backed course tracks across math, vocabulary, grammar, logic, rhetoric, languages, literature, history/civics, and memory work.
- Compact lesson sessions with multiple question types, feedback, hints after missed attempts, and saved progress.
- Parent dashboard for tracking recent work, managing child profiles, and creating targeted practice.
- Offline-ready kid workflows with downloadable course packs so lessons can keep working when the connection drops.
- Archive and unarchive support for child profiles with progress preserved.
- PWA-friendly interface for repeat use on tablets and home screens.
- Cloudflare Workers, Workers Static Assets, and D1 deployment path for a self-hosted family site.

## Self-Hosted Setup

Buddy Blocks can be deployed as a personal, self-hosted site on your own Cloudflare-managed domain, typically at `buddyblocks.yoursite.com`. The deployment uses Cloudflare Workers for the app, Workers Static Assets for the built site, and D1 for curriculum and family progress data. For the full step-by-step guide, including local validation, D1 setup, remote seeding, deployment, and smoke testing, see [AGENTS.md](AGENTS.md).

## Course Catalog

This table reflects the current shipped curriculum. "Research ready" means the level has accepted research artifacts through `06-question-sets.md` but has not yet been promoted into the app. "Brief only" means the level currently has only `01-research-brief.md`.

| Course | Available now | Research pipeline |
| --- | --- | --- |
| Math | Grade 3, Grade 6 | Brief only: Grades 1, 2, 4, 5, 7-12 |
| Vocabulary | Grade 3, Grade 6 | - |
| Spanish | Level 1 | Brief only: Levels 2-5 |
| French | Level 1 | Brief only: Levels 2-5 |
| Grammar | Levels 1-4 | - |
| Logic | Level 1 | Research ready: Levels 2-4 |
| Rhetoric | Level 1 | Brief only: Levels 2-5 |
| Classical Literature | Levels 1-5 | - |
| History and Civics | Level 1 | Brief only: Levels 2-5 |
| Memory Work | Level 1 | Brief only: Levels 2-4 |

## Development

```bash
npm install
npm run content:validate
npm test
npm run check
npm run build
```

For local Cloudflare Worker development and deployment commands, create `wrangler.deploy.jsonc` from `wrangler.jsonc` and follow the self-hosted guide in [AGENTS.md](AGENTS.md).
