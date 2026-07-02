# Buddy Blocks

Buddy Blocks is a family learning app where kids build progress one small lesson at a time. It pairs a colorful, kid-friendly practice loop with a parent dashboard, so daily school practice has a clear path without turning into a planning project.

The app is designed for a single family running its own private copy. Parents can create child profiles, see progress, and guide practice while kids move through short lessons with immediate feedback, retry hints, XP, hearts, streaks, and badges.

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

## Course Roadmap

This table reflects the current `/research/` track status. "Research ready" means the level has accepted research artifacts through `06-question-sets.md`. "Coming soon" means the level currently has only `01-research-brief.md`.

| Course | Current | Coming soon |
| --- | --- | --- |
| Math | Grade 3 & 6 | - |
| Vocabulary | Grade 3 & 6 | - |
| Spanish | Level 1 | Level 2, Level 3, Level 4, Level 5 |
| French | Level 1 | Level 2, Level 3, Level 4, Level 5 |
| Grammar | Level 1 | Level 2, Level 3, Level 4 |
| Logic | Level 1 | Level 2, Level 3, Level 4 |
| Rhetoric | Level 1 | Level 2, Level 3, Level 4, Level 5 |
| Classical Literature | Level 1 | Level 2, Level 3, Level 4, Level 5 |
| History and Civics | Level 1 | Level 2, Level 3, Level 4, Level 5 |
| Memory Work | Level 1 | Level 2, Level 3, Level 4 |

## Development

```bash
npm install
npm run content:validate
npm test
npm run check
npm run build
```

For local Cloudflare Worker development and deployment commands, create `wrangler.deploy.jsonc` from `wrangler.jsonc` and follow the self-hosted guide in [AGENTS.md](AGENTS.md).
