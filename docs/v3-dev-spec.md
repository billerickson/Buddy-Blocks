# V3 Development Spec

## Purpose

V3 moves Buddy Blocks from a personal seeded-family app with copied/generated curriculum into a self-hosted, single-family learning app with reviewed curriculum source, first-run onboarding, and runtime support for second-attempt hints.

## Goals

- Keep research artifacts in `research/` as planning and authoring inputs, not as runtime app data.
- Make reviewed lesson Markdown under `src/content/curriculum/` the canonical app source for shippable curriculum.
- Drop the existing generated track catalog during the V3 cutover.
- Source all replacement V3 track, unit, lesson, and question content only from accepted artifacts in `research/`.
- Use `docs/content-creation.md` as the single canonical content creation and authoring guide.
- Remove manual question copying by adding a promotion/import workflow from accepted research artifacts into app-ready lesson files.
- Preserve V3 question metadata that affects runtime behavior, starting with `hint`.
- Show hints only on the retry pass after a student misses a question.
- Launch the new site as a blank slate with no migrated parents, children, attempts, or learner progress from the MVP.
- Convert first install into a parent-led setup flow instead of seeding Bill/Reagan/Ada.
- Remove legacy MVP code, data migrations, and unsupported features once their replacement paths exist.
- Keep the model compatible with a later hosted SaaS release.

## Content Source Model

`research/` should remain the thinking workspace:

- research briefs,
- level blueprints,
- course maps,
- unit design briefs,
- lesson briefs,
- accepted question sets,
- QA notes.

`src/content/curriculum/` should remain the app source:

- track YAML,
- unit YAML,
- lesson Markdown,
- fenced `question` blocks,
- stable metadata needed by the runtime.

For V3, `src/content/curriculum/` is a promoted runtime mirror of accepted research work. It should not be hand-expanded from the old generated catalog, and it should not preserve existing track/unit/lesson/question content unless that content has been re-authored and accepted through the V3 research flow.

The app should not read arbitrary `research/` files at runtime. Research files contain planning context, author-facing rationale, and broad artifacts that are useful for review but too loose for the lesson API. The promotion/import workflow turns accepted research into runtime-ready files.

## V3 Content Cutover

The V3 cutover should intentionally replace the existing track catalog.

Cutover requirements:

- Remove the current generated `src/content/curriculum/` track content from the shipped catalog.
- Rebuild tracks only from accepted V3 research directories.
- Do not migrate, summarize, copy, or preserve legacy generated questions as curriculum evidence.
- Do not recreate or use legacy curriculum generation scripts as a V3 source.
- Keep only runtime infrastructure that V3 still needs: loaders, validators, question types, lesson player behavior, seeding, and progress/provisioning helpers.
- Do not map old lesson IDs, attempts, progress, parents, or children into V3.
- Seed the V3 catalog into a fresh database with no legacy curriculum rows to prune.
- After the V3 catalog is promoted, delete legacy curriculum source files and any generator scripts that are no longer supported.

## Blank-Slate Deployment

The current app should be treated as an MVP that will be totally replaced by the new deployment.

Blank-slate requirements:

- Create a new production deployment at `buddyblocks.billerickson.net`.
- Use a new or reset D1 database for V3.
- Run the V3 schema and curriculum seed into an empty database.
- Do not seed hardcoded parent or child rows.
- Do not migrate parent accounts, children, sessions, progress, attempts, practice sets, or other family-owned data from `learn.billplustara.com`.
- Create the first parent account through the onboarding wizard.
- Create the child accounts through the onboarding wizard.
- Keep `learn.billplustara.com` live temporarily as the old MVP deployment, then retire it only after the new site is production ready.

## Promotion Workflow

Accepted V3 research should be promoted into `src/content/curriculum/` with a deterministic tool or script.

The promotion workflow should:

- follow the source boundaries and quality rules in `docs/content-creation.md`,
- read accepted artifacts such as `research/grammar-1/03-course-map.md`, `05-lesson-briefs.md`, and `06-question-sets.md`,
- create or update matching track/unit/lesson files,
- preserve instructional intent in Markdown body sections,
- emit each runtime question as one fenced `question` YAML block,
- validate stable authored question keys,
- preserve `hint` when present,
- preserve author-facing fields such as `questionGoal` and `misconception` either in body comments/QA artifacts or in a future non-runtime metadata path,
- validate the result with `npm run content:validate`.

Manual copying should be treated as a temporary bridge only.

## Authored Question Metadata

`docs/content-creation.md` asks authors to include `key`, `questionGoal`, and `misconception` in question blocks during authoring.

Implementation requirements:

- Add optional `key` support to the authored question schema, and require it for promoted content.
- Validate that question keys are unique within a lesson and use a conservative slug-like format.
- Use the authored question key, not the question index, as the stable basis for seeded question IDs for promoted content, or store an equivalent stable mapping.
- Keep `hint` as runtime metadata stored in D1 and returned by lesson APIs.
- Treat `questionGoal` and `misconception` as authoring/QA metadata unless a deliberate runtime metadata table is added.
- Ensure author-only metadata is either preserved in Markdown comments/QA artifacts or intentionally stripped before D1/API output.
- Make `npm run content:validate` fail on duplicate question keys, malformed fenced YAML, unsupported question types, duplicate match-pair right-side labels, and standard lessons with no questions.

## App-Scorable Question Policy

V3 promoted curriculum should prioritize question types the app can evaluate meaningfully.

Default promotion rule:

- Do not promote `constructed-response` or `speaking-prompt` into the scored v3 curriculum unless they are explicitly converted to unscored practice or backed by a real evaluation workflow.
- Convert existing `constructed-response` and `speaking-prompt` research questions into app-scorable alternatives when possible.
- If a lesson goal depends on work the app cannot evaluate well, omit that work from Buddy Blocks rather than pretending the app can assess it.

Suggested replacements:

- Use `multiple-choice` for choosing the best explanation, strategy, evidence, or misconception diagnosis.
- Use `fill-blank`, `multi-blank-cloze`, or `text-input` for constrained answers with clear accepted responses.
- Use `order-items` for reasoning steps, processes, sentence order, and sequence.
- Use `error-correction` for fixing a specific flawed step or sentence.
- Use `passage-question` for scenario, source, or word-problem interpretation with selected answers.

## Lesson File Format

V3 lesson files should use frontmatter for stable runtime metadata and body Markdown for teaching intent and questions.

Required frontmatter:

- `id`
- `slug`
- `title`
- `xpBase`
- optional `kind`
- optional `config`

Recommended body sections:

- `Teaching Goal`
- `Student Outcome`
- `Key Ideas`
- `Misconception Checks`
- `Questions`

Questions should be fenced YAML:

````md
```question
type: multiple-choice
prompt: Which word group is a complete sentence?
choices:
  - The lantern on the porch.
  - The lantern glowed on the porch.
correctAnswer: The lantern glowed on the porch.
explanation: This tells a complete thought.
hint: Ask whether the words tell a whole idea.
```
````

## Question Hints

Hints are second-attempt support.

Runtime behavior:

- First time a question appears: do not show the hint.
- If the student misses a non-review question: append that question to the end of the lesson queue.
- When the student sees the appended retry question: show the hint in a highlighted callout before the answer controls.
- Do not count retry answers toward the submitted first-attempt score; scoring remains based on first attempts.

Storage/API behavior:

- `hint` is an optional authored question field.
- `hint` is stored on the `questions` table alongside `explanation`.
- Lesson API responses include `hint` for clients that can render retry support.
- Offline packs include `hint` so cached lessons behave the same way.

Authoring rule:

- A hint should point to a strategy, clue, representation, or next step.
- A hint should not give away the answer.
- Do not use hints as first-attempt instruction.

## First-Run Onboarding

The public self-hosted release should remove hardcoded family seeding and replace it with setup.

First install flow:

1. App checks setup status.
2. If no active parent exists, redirect to setup.
3. Parent enters desired username and password.
4. App creates the single active parent account.
5. Parent registers one or more children.
6. For each child, parent enters display name and grade level.
7. App creates child profiles, generates stable slugs, assigns avatars/defaults, and initializes available tracks and lesson progress.
8. Parent lands on profile selection or parent dashboard.

Setup routes/APIs:

- `GET /api/setup/status`
- `POST /api/setup/parent`
- `GET /api/parent/children`
- `POST /api/parent/children`
- `PATCH /api/parent/children/:childId`

Child management requirements:

- Parents can create, edit, archive, and unarchive children.
- Child grade level is stored per child.
- Child slugs are generated once and remain stable.
- Archived children should not be accessible in kid mode.
- Progress should be preserved when a child is archived.

## Seed Data Removal

The seed script should seed curriculum only.

Remove these assumptions from app code, tests, docs, and seed scripts:

- parent username `bill`,
- parent email tied to `learn.billplustara.com`,
- child profiles `reagan`, `ada`, and `bill`,
- route generation based on fixed children,
- progress initialization that only runs for fixed fixtures.

Replace `src/lib/seed-family.ts` with generic provisioning helpers:

- compute tracks available to a child grade level,
- initialize missing child track progress,
- initialize missing child lesson progress,
- repair progress for dynamic children after future V3 curriculum reseeds,
- avoid overwriting completed progress created inside the new V3 site.

## Data Model Changes

Required:

- Add `questions.hint TEXT`.
- Add `child_profiles.status` with active/archive states.
- Allow parent email to be optional or setup-supplied.
- Enforce single-active-parent behavior for self-hosted mode.
- Replace the MVP migration chain with a clean V3 baseline schema when practical.
- Remove migrations and compatibility code that only exist to upgrade prior MVP database versions.

Future hosted SaaS compatibility:

- Shared curriculum remains global.
- Family-owned tables should be scoped by `family_id` or `tenant_id` before hosted SaaS launch.
- Self-hosted and hosted modes should share child provisioning helpers.

## Legacy Cleanup

V3 is a replacement deployment, not an in-place upgrade of the MVP. When a V3 replacement exists, remove the old code path instead of keeping compatibility layers.

Cleanup targets:

- MVP-only database migrations and schema upgrade paths.
- Hardcoded family fixtures, route generation, and tests for fixed parents or children.
- Generated curriculum files that are not promoted from accepted V3 research.
- Any remaining generator that can recreate legacy content.
- Docs and brand assets that describe `learn.billplustara.com` as the product destination.
- Tests that rely on MVP users, slugs, legacy curriculum shape, or migration history.
- Unsupported features that are not part of the V3 product surface.

Before V3 is considered production ready, the repo should be audited for dead MVP code and either deleted or explicitly documented as still supported.

## App Flow Changes

Login/setup:

- Login should detect an unconfigured install and route to setup.
- Public registration closes once the first active parent exists.
- Setup should create a session after successful parent creation.

Parent dashboard:

- Replace fixed child assumptions with dynamic child queries.
- Add child create/edit/archive/unarchive flows.
- Show grade level and active/archive state.

Profile selector:

- List active children dynamically.
- Hide archived children.
- Keep child-mode cookie behavior, but validate that the selected child belongs to the active parent and is not archived.

Kid routes:

- Resolve children by database slug.
- Enforce archived-child blocking.
- Use dynamic progress provisioning for newly created children.

## Deployment And Docs

Deployment target:

- Build and launch V3 at `buddyblocks.billerickson.net`.
- Keep the existing `learn.billplustara.com` deployment live for a few days while the new site is tested and made production ready.
- Do not cut over or retire `learn.billplustara.com` until onboarding, curriculum seed, child setup, lesson play, progress saving, and parent flows have passed production smoke testing on the new domain.

Public self-hosted docs should include:

- environment setup,
- D1 creation,
- migrations,
- curriculum seed,
- deploy,
- custom domain setup,
- first-run onboarding,
- smoke test checklist.

Cloudflare-specific docs should cite current official references for Workers, D1 migrations, static assets, custom domains, and D1 limits.

Brand/config cleanup:

- Remove `learn.billplustara.com` from public docs and brand assets unless explicitly documenting the old private deployment.
- Use `buddyblocks.billerickson.net` only as the example public deployment target.
- Keep hosted SaaS work in `docs/hosted-saas-plan.md`.

## Test Plan

Automated tests should cover:

- V3 question hints parse from fenced question blocks.
- Curriculum seed SQL stores `hint`.
- Lesson and offline-pack APIs return `hint`.
- Lesson player shows hints only on retry queue items.
- Setup status before and after parent creation.
- Duplicate parent prevention after setup.
- Parent session creation during setup.
- Child create/edit/archive/unarchive.
- Archived child access blocking.
- Dynamic progress initialization for newly created children.
- Seed script no longer creates fixed Bill/Reagan/Ada rows.
- Fresh migrations plus curriculum seed leave the database with zero parents and zero children.
- No tests require fixed MVP slugs or users such as `bill`, `reagan`, or `ada`.
- Future V3 curriculum reseeding repairs dynamic child progress without overwriting completed work created on the new site.
- Authored question keys parse, duplicate keys fail validation, and seeded question IDs remain stable when questions are reordered.
- Author-only metadata such as `questionGoal` and `misconception` does not leak to lesson APIs unless a deliberate metadata endpoint is added.
- Content validation fails on malformed fenced `question` YAML and duplicate match-pair right-side labels.
- Promoted v3 curriculum does not include scored `constructed-response` or `speaking-prompt` questions without an explicit unscored-practice or evaluation path.

Validation commands:

- `npm run content:validate`
- `npm test`
- `npm run check`
- `npm run build`

## Implementation Order

1. Add hint schema, storage, API, offline-pack, and retry UI support.
2. Add authored question metadata handling, stable question keys, and stricter content validation.
3. Add V3 promotion/import tooling for accepted research artifacts.
4. Add first-run setup status and parent creation APIs.
5. Replace fixed family seed data with dynamic provisioning helpers.
6. Add child management APIs and parent UI.
7. Update login, parent gate, profile selector, and kid route guards.
8. Replace the current generated curriculum catalog with V3 content promoted from `research/`.
9. Remove obsolete MVP migrations, generator scripts, fixtures, docs, brand examples, tests, and unsupported features.
10. Run fresh-database smoke test: initialize schema, seed curriculum, verify zero parents/children, setup parent, create children, complete lesson, archive/unarchive child.
