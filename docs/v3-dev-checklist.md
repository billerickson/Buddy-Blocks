# V3 Development Checklist

This checklist is the execution ledger for `docs/v3-dev-spec.md`.

Use the spec as the source of truth. Use this file to track implementation, validation, blockers, and handoff notes while working through the V3 build.

Recommended `/goal` prompt:

```text
/goal Build V3 according to docs/v3-dev-spec.md by working through docs/v3-dev-checklist.md. Keep the checklist updated as the execution ledger. Mark an item complete only after implementation, tests, and relevant validation pass. Preserve docs/v3-dev-spec.md as the source of truth; update the checklist with notes or blockers as work proceeds.
```

## Completion Rules

- Check off an item only when the implementation is complete and the listed verification has passed or a note explains why verification is deferred.
- Keep notes brief and factual. Include file paths, test names, migration names, or blocker details when useful.
- If this checklist conflicts with `docs/v3-dev-spec.md`, update the checklist to match the spec or deliberately update the spec first.
- Do not treat temporary bridge work as complete unless the spec explicitly allows the bridge for that phase.
- Prefer small commits or reviewable chunks by phase.

## Phase 0: Baseline And Planning

- [x] Read `docs/v3-dev-spec.md` before implementation.
  - Done when: current V3 goals, cutover rules, deployment expectations, and test plan are understood.
  - Verify: note any spec ambiguity here before coding.
  - Notes: Read 2026-07-01 before implementation. No spec ambiguity identified; V3 is a blank-slate replacement deployment with reviewed promoted curriculum, setup onboarding, retry hints, dynamic child provisioning, and eventual cleanup of MVP assumptions.

- [x] Review related source docs.
  - Done when: `docs/content-creation.md`, `docs/public-release-plan.md` if present, and `docs/hosted-saas-plan.md` are checked for constraints that affect V3.
  - Verify: checklist or spec captures any missing required item.
  - Notes: Read `docs/content-creation.md` and `docs/hosted-saas-plan.md` on 2026-07-01. `docs/public-release-plan.md` is not present. Constraints are already reflected in V3 spec/checklist: research remains authoring-only, `questionGoal`/`misconception` are stripped from runtime output, self-hosted single-parent remains compatible with later tenant scoping.

- [x] Inventory current MVP assumptions.
  - Done when: hardcoded family users, child slugs, generated curriculum scripts, migration history, docs references, and test fixtures are listed or understood.
  - Verify: `rg "bill|reagan|ada|learn\\.billplustara\\.com|generated|seed-family"` has been reviewed.
  - Notes: Reviewed 2026-07-01. Current assumptions include login default username `bill`, `astro.config.mjs` site `learn.billplustara.com`, brand page URL text, `scripts/seed.ts` importing `src/lib/seed-family.ts`, migration `0004` tied to slug `reagan`, tests using `bill`/`reagan` fixtures and routes, and a large generated `src/content/curriculum/` catalog.

- [x] Establish baseline validation status.
  - Done when: current results are recorded for `npm run content:validate`, `npm test`, `npm run check`, and `npm run build`.
  - Verify: failures are documented before V3 changes begin.
  - Notes: Baseline 2026-07-01 passed: `npm run content:validate` (66 tracks, 713 units, 2212 lessons, 17111 questions), `npm test` (14 files / 99 tests), `npm run check` (0 errors/warnings/hints), and `npm run build`.

## Phase 1: Question Hint Runtime Support

- [x] Add `questions.hint TEXT` to the V3 data model.
  - Done when: schema and any active migration/baseline path include nullable `hint`.
  - Verify: fresh database can be initialized with the updated schema.
  - Notes: Clean V3 baseline `migrations/0001_initial.sql` includes nullable `questions.hint`; `tests/worker-api.test.ts` verifies the fresh schema has `hint`. `npm test -- tests/worker-api.test.ts` and `npm run check` passed 2026-07-01.

- [x] Parse authored `hint` from fenced `question` YAML blocks.
  - Done when: optional `hint` is accepted by the lesson content parser and preserved in parsed question objects.
  - Verify: parser test covers a lesson question with `hint`.
  - Notes: `src/lib/curriculum.ts` parses optional `hint`; `tests/curriculum.test.ts` covers fenced question hint parsing. Full validation passed 2026-07-01.

- [x] Store `hint` during curriculum seed.
  - Done when: seed SQL or seed code writes `hint` alongside `explanation`.
  - Verify: seeded database row includes the expected hint text.
  - Notes: `src/lib/seed-sql.ts` writes `hint`; `tests/seed-sql.test.ts` executes the seed statements and asserts the stored hint row. Full validation passed 2026-07-01.

- [x] Return `hint` from lesson APIs.
  - Done when: lesson API response types and serializers include optional `hint`.
  - Verify: API test asserts `hint` appears for a question that has one.
  - Notes: `src/worker.ts` maps `row.hint` into lesson questions; `tests/worker-api.test.ts` asserts `GET /api/children/:child/lessons/:lessonId` returns hint. Full validation passed 2026-07-01.

- [x] Return `hint` from offline-pack APIs.
  - Done when: cached/offline lesson payloads include optional `hint`.
  - Verify: offline-pack test asserts `hint` is present.
  - Notes: Offline pack uses the same lesson serializer; `tests/worker-api.test.ts` asserts track offline pack lesson questions include hint. Full validation passed 2026-07-01.

- [x] Add retry queue behavior for missed non-review questions.
  - Done when: a missed non-review question is appended to the end of the lesson queue.
  - Verify: lesson player test covers missed question retry ordering.
  - Notes: `src/components/lesson/lesson-flow.ts` exposes `nextQueueAfterAnswer`; `LessonPlayer` uses it; `tests/lesson-flow.test.ts` covers missed first-attempt retry ordering. Full validation passed 2026-07-01.

- [x] Show hints only on retry attempts.
  - Done when: first-attempt questions do not render hints and retry queue items render a highlighted hint callout before answer controls.
  - Verify: UI test covers both first-attempt hidden hint and retry visible hint.
  - Notes: `LessonPlayer` renders the highlighted hint callout through `shouldShowRetryHint`; `tests/lesson-flow.test.ts` covers first-attempt hidden, retry visible, and retry without hint hidden. Full validation passed 2026-07-01.

- [x] Keep scoring based on first attempts only.
  - Done when: retry answers do not change submitted first-attempt score.
  - Verify: scoring test covers missed first attempt followed by correct retry.
  - Notes: `LessonPlayer` records attempts through `shouldRecordFirstAttempt` and submits first attempts only; `tests/lesson-flow.test.ts` covers retry attempts not being recorded for scoring. Full validation passed 2026-07-01.

## Phase 2: Authored Question Metadata And Validation

- [x] Add optional `key` support to the authored question schema.
  - Done when: fenced question blocks can include `key` without parser errors.
  - Verify: content parser test covers `key`.
  - Notes: `src/lib/curriculum.ts` parses optional `key`; `tests/curriculum.test.ts` covers fenced question keys. Full validation passed 2026-07-01.

- [x] Require `key` for promoted V3 content.
  - Done when: promoted lesson validation fails if a runtime question lacks `key`.
  - Verify: validation test covers missing key in promoted content.
  - Notes: `validateCurriculum(..., { requireQuestionKeys: true })` enforces strict promoted-content keys while the legacy catalog remains in bridge mode. `tests/curriculum.test.ts` covers missing keys in strict mode. Full validation passed 2026-07-01.

- [x] Validate question key format.
  - Done when: keys use a conservative slug-like format.
  - Verify: validation test covers valid and invalid keys.
  - Notes: Question keys must be lowercase letters/digits with hyphens or underscores. Parser and validation tests cover valid and invalid keys. Full validation passed 2026-07-01.

- [x] Validate question key uniqueness within each lesson.
  - Done when: duplicate keys in one lesson fail validation.
  - Verify: validation test covers duplicate keys.
  - Notes: `findCurriculumIssues` and `validateCurriculum` detect duplicate keys within a lesson. `tests/curriculum.test.ts` covers duplicate key rejection. Full validation passed 2026-07-01.

- [x] Seed stable question IDs from authored keys.
  - Done when: seeded question IDs use the authored key, not the question index, or an equivalent stable mapping.
  - Verify: test confirms question IDs remain stable when questions are reordered.
  - Notes: `getAllQuestions()` uses `questionIdForLesson()`, which prefers authored keys and falls back to legacy index IDs. `tests/curriculum.test.ts` verifies IDs remain stable after keyed questions are reordered. Full validation passed 2026-07-01.

- [x] Decide how author-only metadata is preserved.
  - Done when: `questionGoal` and `misconception` are either preserved in comments/QA artifacts or intentionally stripped before runtime output.
  - Verify: decision is documented in code comments, docs, or checklist notes.
  - Notes: Decision made: keep `questionGoal` and `misconception` only in research/QA artifacts. Strip them during promotion so they do not appear in runtime lesson blocks, D1 seed data, lesson APIs, or offline packs.

- [x] Prevent author-only metadata from leaking to lesson APIs.
  - Done when: `questionGoal` and `misconception` do not appear in lesson API output unless a deliberate metadata endpoint exists.
  - Verify: API test covers absence of author-only fields.
  - Notes: `src/lib/curriculum.ts` strips unknown author-only fields from authored blocks, and `src/worker.ts` strips `questionGoal`/`misconception` from question payloads before API serialization. `tests/curriculum.test.ts` and `tests/worker-api.test.ts` cover absence from runtime/API output. Full validation passed 2026-07-01.

- [x] Strengthen fenced YAML validation.
  - Done when: malformed fenced `question` YAML fails `npm run content:validate`.
  - Verify: validation test covers malformed YAML.
  - Notes: Malformed fenced `question` YAML fails during curriculum loading; `tests/curriculum.test.ts` covers the failure path. Full validation passed 2026-07-01.

- [x] Validate supported question types.
  - Done when: unsupported question types fail content validation.
  - Verify: validation test covers unsupported type rejection.
  - Notes: The discriminated question schema rejects unsupported types; `tests/curriculum.test.ts` covers an unsupported fenced type. Full validation passed 2026-07-01.

- [x] Validate duplicate match-pair right-side labels.
  - Done when: duplicate right-side labels fail content validation.
  - Verify: validation test covers duplicate match-pair right labels.
  - Notes: `findCurriculumIssues` rejects duplicate right labels in `match-pairs`; `tests/curriculum.test.ts` covers the failure. Existing duplicate labels were repaired in 12 legacy catalog files so `npm run content:validate` passes with the stricter rule. Full validation passed 2026-07-01.

- [x] Validate standard lessons have questions.
  - Done when: standard lessons with no questions fail content validation.
  - Verify: validation test covers an empty standard lesson.
  - Notes: `loadLesson()` rejects standard lessons with no questions; `tests/curriculum.test.ts` covers an empty standard lesson. Full validation passed 2026-07-01.

## Phase 3: V3 Promotion And Import Tooling

- [x] Identify accepted V3 research artifact sources.
  - Done when: accepted source directories/files are identified from `research/track-status.json`, starting with tracks marked `ready_for_import` and their artifacts such as `03-course-map.md`, `04-unit-design-briefs/`, `05-lesson-briefs.md`, and `06-question-sets.md`.
  - Verify: source list is documented here or in the promotion tool docs, and it matches the manifest entries selected for import.
  - Notes: Verified 2026-07-01. `find research -maxdepth 2 -name '06-question-sets.md'` matches the 12 manifest tracks marked `ready_for_import`: `classical-literature-1`, `french-1`, `grade-03-math`, `grade-03-vocabulary`, `grade-06-math`, `grade-06-vocabulary`, `grammar-1`, `history-and-civics-1`, `logic-1`, `memory-works-1`, `rhetoric-1`, and `spanish-1`. Full validation passed 2026-07-01.

- [x] Maintain research track status manifest.
  - Done when: `research/track-status.json` lists all top-level research tracks, marks tracks with `06-question-sets.md` as `ready_for_import`, and changes tracks to `imported` after successful promotion and validation.
  - Verify: compare `find research -maxdepth 2 -name '06-question-sets.md'` with the manifest before each import, and confirm imported tracks have `readyForImport: false`, `imported: true`, `importBatch`, and `importedAt`.
  - Notes: Live promotion/import completed 2026-07-01 with import batch `v3-20260701T211036Z`. All 12 accepted tracks are now `status: imported`, `readyForImport: false`, `imported: true`, and have `importBatch`/`importedAt`: `classical-literature-1`, `french-1`, `grade-03-math`, `grade-03-vocabulary`, `grade-06-math`, `grade-06-vocabulary`, `grammar-1`, `history-and-civics-1`, `logic-1`, `memory-works-1`, `rhetoric-1`, and `spanish-1`. Full validation passed after import.

- [x] Use `research/track-status.json` as the import queue.
  - Done when: the promotion/import tool imports tracks marked `ready_for_import` by default and skips `research_only` or already `imported` tracks unless an explicit override is provided.
  - Verify: dry-run or unit test shows the selected import queue matches the manifest.
  - Notes: `scripts/research-promotion.ts` selects manifest entries with `status: ready_for_import`, `readyForImport: true`, and `imported: false` by default; `--include-imported` and `--tracks` are explicit overrides. `tests/research-promotion.test.ts` covers queue selection. `npm run content:promote -- --dry-run` selected the 12 ready tracks from the real manifest. Full validation passed 2026-07-01.

- [x] Add deterministic promotion/import workflow.
  - Done when: a script or tool can create or update `src/content/curriculum/` from accepted research artifacts selected through `research/track-status.json`.
  - Verify: script can be run repeatedly without unintended churn, and dry-run output lists selected tracks and generated file paths.
  - Notes: Added `scripts/research-promotion.ts` and `npm run content:promote`. The workflow reads `03-course-map.md`, `05-lesson-briefs.md`, and `06-question-sets.md`, then deterministically emits track YAML, unit YAML, and lesson Markdown. Default mode is dry run; `--write` writes files. The real dry run listed selected tracks and generated file paths, then blocked only invalid source tracks. Full validation passed 2026-07-01.

- [x] Record import batches in the manifest.
  - Done when: each successful import updates `research/track-status.json` with a stable `importBatch`, `importedAt`, `status: imported`, `readyForImport: false`, and `imported: true` for every promoted track.
  - Verify: manifest diff after import clearly shows which tracks moved from `ready_for_import` to `imported`.
  - Notes: `scripts/research-promotion.ts --write --mark-imported` updates successful selected tracks with `status: imported`, `readyForImport: false`, `imported: true`, deterministic `importBatch`, and `importedAt`. `tests/research-promotion.test.ts` verifies this against a temp manifest. The real manifest was intentionally not updated during the 2026-07-01 source repair because only dry-run validation was performed. Full validation passed 2026-07-01.

- [x] Follow `docs/content-creation.md` rules during promotion.
  - Done when: promoted output follows canonical authoring guidance.
  - Verify: `npm run content:validate`.
  - Notes: Promotion requires accepted artifacts, requires authored question keys, rejects unsupported scored `constructed-response`/`speaking-prompt`, rejects duplicate `match-pairs` right labels, preserves hints, and strips research-only metadata. Synthetic promoted output validates with `validateCurriculum(..., { requireQuestionKeys: true })`; current app content validates with `npm run content:validate`. Full validation passed 2026-07-01.

- [x] Generate matching track and unit YAML files.
  - Done when: promoted tracks and units are created or updated from accepted research.
  - Verify: content loader sees expected track and unit records.
  - Notes: `scripts/research-promotion.ts` generates `track.yaml` and numbered unit `unit.yaml` files from course-map metadata and unit purpose sections. `tests/research-promotion.test.ts` verifies generated paths and validates the generated curriculum through `loadCurriculumFromRoot()`. Full validation passed 2026-07-01.

- [x] Generate matching lesson Markdown files.
  - Done when: lesson files include required frontmatter and recommended teaching sections where source content supports them.
  - Verify: content validation passes.
  - Notes: The promotion workflow generates lesson Markdown with required frontmatter, teaching goal, student outcome, key ideas, misconception checks, teaching note, and question blocks from accepted lesson briefs/question sets. `tests/research-promotion.test.ts` validates generated lesson output. Full validation passed 2026-07-01.

- [x] Emit runtime questions as fenced `question` YAML blocks.
  - Done when: each promoted runtime question is represented as one fenced `question` block.
  - Verify: parser and validation tests pass on promoted content.
  - Notes: `scripts/research-promotion.ts` serializes each runtime question as its own fenced `question` YAML block. Generated test curriculum is parsed and validated with strict question keys. Full validation passed 2026-07-01.

- [x] Preserve instructional intent in lesson body sections.
  - Done when: teaching goals, student outcomes, key ideas, and misconception checks are represented in Markdown body content when available.
  - Verify: spot check promoted lessons against source research.
  - Notes: Promotion maps lesson-brief fields into Markdown body sections: `Teaching Goal`, `Student Outcome`, `Key Ideas`, `Misconception Checks`, and `Teaching Note`. Synthetic promotion tests compare generated lessons to source fields. Full validation passed 2026-07-01.

- [x] Preserve `hint` in promoted questions.
  - Done when: source hints survive promotion into lesson Markdown and then into seeded/API data.
  - Verify: content parser and seed tests cover a promoted hint.
  - Notes: Promotion preserves `hint` fields in generated lesson Markdown; curriculum parsing, seed SQL, lesson API, and offline-pack coverage assert hints survive runtime paths. `tests/research-promotion.test.ts`, `tests/curriculum.test.ts`, `tests/seed-sql.test.ts`, and `tests/worker-api.test.ts` cover this. Full validation passed 2026-07-01.

- [x] Strip `questionGoal` and `misconception` from promoted runtime content.
  - Done when: `questionGoal` and `misconception` remain in research/QA artifacts but are removed from promoted lesson question blocks before content validation, seeding, and API output.
  - Verify: promoted files, seeded data, lesson APIs, and offline packs do not include `questionGoal` or `misconception`.
  - Notes: `scripts/research-promotion.ts` deletes `questionGoal` and `misconception` before writing promoted question blocks; runtime serializers also strip those fields defensively. Tests cover generated lesson files and API output. Full validation passed 2026-07-01.

- [x] Enforce app-scorable question policy.
  - Done when: scored V3 curriculum does not include `constructed-response` or `speaking-prompt` unless explicitly converted to unscored practice or backed by an evaluation workflow.
  - Verify: validation test or promotion check rejects unsupported scored questions.
  - Notes: `validateResearchTrack()` rejects `constructed-response` and `speaking-prompt` before promotion. `tests/research-promotion.test.ts` covers the blocker. Source repair on 2026-07-01 converted the blocked items in `grade-03-math`, `grammar-1`, and `memory-works-1` to app-scorable alternatives; full `npm run content:promote` dry run and `npm run content:validate` pass. Full validation passed 2026-07-01.

- [x] Document temporary manual-copy bridge if used.
  - Done when: any manual copying is clearly labeled temporary and replaced by the deterministic workflow before production readiness.
  - Verify: checklist notes include owner/status for bridge removal.
  - Notes: No new manual-copy bridge was added. V3 promotion now has deterministic tooling; actual production import remains pending an intentional cutover run. Full validation passed 2026-07-01.

## Phase 4: First-Run Setup And Parent Creation

- [x] Add setup status API.
  - Done when: `GET /api/setup/status` reports whether an active parent exists.
  - Verify: API test covers unconfigured and configured states.
  - Notes: Added public `GET /api/setup/status` returning `configured`, `setupRequired`, and `activeParentCount`. `tests/worker-api.test.ts` covers unconfigured and configured states. Full validation passed 2026-07-01.

- [x] Add setup parent API.
  - Done when: `POST /api/setup/parent` creates the single active parent account from username/password and optional setup-supplied email.
  - Verify: API test covers parent creation.
  - Notes: Added public same-origin `POST /api/setup/parent` with username/password and optional email validation. It hashes the password, inserts the active parent, and returns the created parent plus `/parent/` redirect target. `tests/worker-api.test.ts` covers creation and follow-up login. Full validation passed 2026-07-01.

- [x] Enforce single-active-parent behavior for self-hosted mode.
  - Done when: duplicate parent creation is blocked once setup is complete.
  - Verify: API test covers duplicate prevention.
  - Notes: Single-parent self-hosted behavior is enforced by checking active parent count before setup creation; duplicate setup returns `409 setup_complete`. Add a hosted/SaaS multi-parent flag only when multi-parent SaaS work begins. Full validation passed 2026-07-01.

- [x] Create a parent session after setup.
  - Done when: successful parent setup logs the parent in.
  - Verify: test confirms session/cookie behavior after setup.
  - Notes: Successful setup creates a session row, sets `buddy_blocks_session`, clears child mode, and allows immediate authenticated login/session behavior. `tests/worker-api.test.ts` covers session row and `Set-Cookie`. Full validation passed 2026-07-01.

- [x] Route unconfigured installs to setup.
  - Done when: login or parent-gated routes detect no active parent and redirect to setup.
  - Verify: route test covers unconfigured install.
  - Notes: Unconfigured root, login, parent-gate, and protected parent/kid/profile routes now redirect to `/setup/`; `/setup/` serves the setup asset. `tests/worker-api.test.ts` covers unconfigured routing. Full validation passed 2026-07-01.

- [x] Close public registration after first active parent exists.
  - Done when: setup cannot be reused as open registration after initial setup.
  - Verify: duplicate setup test passes.
  - Notes: Once an active parent exists, `POST /api/setup/parent` returns `409 setup_complete`; `/setup/` redirects logged-out users to `/login/` and logged-in users to `/profiles/`. Full validation passed 2026-07-01.

- [x] Build parent-led setup UI.
  - Done when: parent can enter username/password and proceed to child creation.
  - Verify: browser or component test covers setup flow.
  - Notes: Parent account setup screen at `src/pages/setup.astro` submits username, optional email, and password to `/api/setup/parent`, creates a session, and redirects to `/parent/`. Browser validation against an isolated fresh local D1 on 2026-07-01 created parent `morgan_parent`, reached the parent dashboard, created child `Mira`, and reached profile selection. `npm run build` passed 2026-07-01.

## Phase 5: Seed Data Removal And Dynamic Provisioning

- [x] Remove hardcoded family seeding from seed scripts.
  - Done when: seed scripts seed curriculum only and no longer create Bill/Reagan/Ada or any parent/child rows.
  - Verify: fresh seed leaves zero parents and zero children.
  - Notes: `scripts/seed.ts` now builds curriculum seed SQL only and no longer imports parent/child fixtures, password hashing, or `src/lib/seed-family.ts`. `tests/seed-sql.test.ts` executes the curriculum seed SQL on a fresh database and verifies zero `parents` and zero `child_profiles`. Wrangler D1 seed was not run during this pass; SQL-builder validation plus full app validation passed 2026-07-01.

- [x] Replace `src/lib/seed-family.ts` with generic provisioning helpers.
  - Done when: fixed-family helper code is removed or replaced with dynamic child provisioning.
  - Verify: tests no longer import fixed family fixtures.
  - Notes: Removed `src/lib/seed-family.ts` and `tests/seed-family.test.ts`. Added generic child provisioning in `src/lib/provisioning.ts` with tests in `tests/provisioning.test.ts`. `rg "seed-family|CHILDREN|PARENT_USERNAME|getLessonPaths|getTrackPaths|getChildBySlug" src scripts tests` now only finds legacy guard assertions in `tests/curriculum.test.ts`. Full validation passed 2026-07-01.

- [x] Compute tracks available to a child grade level.
  - Done when: provisioning can determine available tracks for arbitrary child grade levels.
  - Verify: unit test covers multiple grade levels.
  - Notes: `getTracksForGradeLevel()` computes scholastic tracks for the child grade and initial foundation tracks by subject. `tests/provisioning.test.ts` covers grade 3 and grade 6 outputs without fixed child identities. Full validation passed 2026-07-01.

- [x] Initialize missing child track progress dynamically.
  - Done when: newly created children receive required track progress without fixed slugs.
  - Verify: unit/API test covers new child creation.
  - Notes: `buildChildProgressProvisioningStatements()` inserts missing `child_track_progress` for any `{ id, gradeLevel }` child and available tracks. `tests/provisioning.test.ts` covers an arbitrary `child_mira` record receiving track progress. Phase 6 still needs to call this helper from the child-create API. Full validation passed 2026-07-01.

- [x] Initialize missing child lesson progress dynamically.
  - Done when: lesson progress is provisioned for dynamic children and available curriculum.
  - Verify: unit/API test covers missing lesson progress repair.
  - Notes: `buildChildProgressProvisioningStatements()` inserts missing `child_lesson_progress` rows for all lessons in available tracks, with first lessons and mad-minute lessons available and the rest locked, then runs repair statements. `tests/provisioning.test.ts` covers dynamic lesson progress initialization. Phase 6 still needs to invoke this from child profile creation/update flows. Full validation passed 2026-07-01.

- [x] Repair progress after future V3 curriculum reseeds.
  - Done when: provisioning can add missing progress for new curriculum without overwriting completed work.
  - Verify: test covers reseed repair preserving completed progress.
  - Notes: Provisioning reuses `buildChildTrackRepairStatements()` after insert-ignore progress creation. `tests/provisioning.test.ts` simulates a reseed that adds a new lesson and verifies completed progress, best score, XP, and completed count are preserved while the next incomplete lesson becomes current/available. Full validation passed 2026-07-01.

- [x] Remove fixed parent and child assumptions from route generation.
  - Done when: routes resolve database parents/children dynamically.
  - Verify: `rg "bill|reagan|ada"` has no unsupported runtime assumptions.
  - Notes: Removed fixture-derived `getLessonPaths()`/`getTrackPaths()` route helpers with `src/lib/seed-family.ts`. Existing Worker route tests cover database-backed child slugs outside the MVP fixtures (`/kid/mira/`). `rg -n "\\b(bill|reagan|ada)\\b" src --glob '!src/content/**' scripts` returns no runtime/script matches; remaining test fixture matches are tracked for later cleanup. Full validation passed 2026-07-01.

## Phase 6: Child Profiles And Parent Management

- [x] Add `child_profiles.status`.
  - Done when: child profile model supports active and archived states.
  - Verify: migration/schema test covers default active state.
  - Notes: Clean V3 baseline `migrations/0001_initial.sql` includes `status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived'))`. `tests/worker-api.test.ts` verifies the default. `npm test -- tests/worker-api.test.ts` and `npm run check` passed 2026-07-01.

- [x] Store child grade level per child.
  - Done when: child profile creation and update persist grade level.
  - Verify: API test covers grade level.
  - Notes: `POST /api/parent/children` and `PATCH /api/parent/children/:childId` persist `gradeLevel` and update `levelBand`. `tests/worker-api.test.ts` covers create and edit. Full validation passed 2026-07-01.

- [x] Generate stable child slugs once.
  - Done when: child slugs are created at profile creation and remain stable across edits.
  - Verify: API test covers display-name edit without slug change.
  - Notes: Child slugs are generated on create from display name with parent-local suffixes for duplicates, and update does not change the slug. `tests/worker-api.test.ts` covers duplicate slug generation and display-name edit stability. Full validation passed 2026-07-01.

- [x] Add parent children list API.
  - Done when: `GET /api/parent/children` returns children for the active parent.
  - Verify: API test covers active and archived children as intended.
  - Notes: Added `GET /api/parent/children` returning active and archived children for parent management, while `/api/children` remains active-only for profile selection. `tests/worker-api.test.ts` covers both active and archived list behavior. Full validation passed 2026-07-01.

- [x] Add child create API.
  - Done when: `POST /api/parent/children` creates child profiles with display name, grade level, slug, avatar/defaults, and progress initialization.
  - Verify: API test covers child creation and progress provisioning.
  - Notes: Added `POST /api/parent/children`; it creates active child profiles with generated slug, avatar default, grade/level band, hearts, and DB-backed track/lesson progress initialization. `tests/worker-api.test.ts` covers profile defaults and provisioned progress. Full validation passed 2026-07-01.

- [x] Add child update API.
  - Done when: `PATCH /api/parent/children/:childId` updates display name, grade level, archive state, and unarchive state as allowed.
  - Verify: API test covers edit/archive/unarchive.
  - Notes: Added `PATCH /api/parent/children/:childId`; it updates display name, grade level, `levelBand`, and `status`, and provisions newly available progress when an active child grade changes. `tests/worker-api.test.ts` covers edit, archive, and unarchive. Full validation passed 2026-07-01.

- [x] Preserve progress when archiving children.
  - Done when: archive hides access but does not delete progress.
  - Verify: test covers archive followed by unarchive with progress intact.
  - Notes: Archived children are excluded from `/api/children`, blocked from kid APIs/routes, and retained in parent management; archiving does not delete progress rows. `tests/worker-api.test.ts` covers archive, kid-route/API blocking, preserved progress count, and unarchive. Full validation passed 2026-07-01.

- [x] Add parent dashboard child management UI.
  - Done when: parents can create, edit, archive, and unarchive children from the dashboard.
  - Verify: browser/component test covers child management.
  - Notes: `src/components/islands/ParentDashboard.tsx` includes create/edit/archive/unarchive controls wired to child APIs. Browser validation against an isolated fresh local D1 on 2026-07-01 created `Mira`, edited it to `Mira Sky` / grade 5, archived it, unarchived it, and confirmed it appeared in profile selection. `npm run build` passed 2026-07-01.

- [x] Show grade level and active/archive state in parent UI.
  - Done when: dashboard makes child grade and status visible.
  - Verify: UI test or manual screenshot check.
  - Notes: Dashboard renders grade and active/archive status chips for each child. Browser validation on 2026-07-01 confirmed visible `Grade 4` / `Active` after creation, `Grade 5` / `Active` after edit, `Grade 5` / `Archived` after archive, and `Grade 5` / `Active` after unarchive. `npm run build` passed 2026-07-01.

## Phase 7: Login, Profile Selector, And Kid Route Guards

- [x] Update login flow for setup detection.
  - Done when: login routes unconfigured installs to setup and configured installs to normal login.
  - Verify: route tests cover both states.
  - Notes: Login and root routing now check setup status; unconfigured installs redirect to `/setup/`, configured logged-out users reach `/login/`, and configured logged-in users route into the app. `tests/worker-api.test.ts` covers these states. Full validation passed 2026-07-01.

- [x] Replace fixed child assumptions in parent dashboard.
  - Done when: dashboard queries dynamic children rather than fixture slugs.
  - Verify: tests pass without MVP child fixtures.
  - Notes: Parent dashboard uses `/api/parent/dashboard` and child-management APIs, not fixed child slugs. The fixed-profile copy was removed from `src/components/islands/ParentDashboard.tsx`; Worker tests cover database-backed children outside the MVP fixtures. Full validation passed 2026-07-01.

- [x] Update profile selector to list active children dynamically.
  - Done when: selector displays active children from the database.
  - Verify: selector test covers multiple dynamic children.
  - Notes: `/api/children` now returns active database children only, and `ProfileSelector` continues to render that API response dynamically. `tests/worker-api.test.ts` covers active-only behavior through archive/unarchive flow; full validation passed 2026-07-01.

- [x] Hide archived children from kid mode profile selection.
  - Done when: archived children are not selectable in kid mode.
  - Verify: selector test covers archived child exclusion.
  - Notes: Archived children are excluded from `/api/children`, while remaining visible to `/api/parent/children` for parent management. `tests/worker-api.test.ts` covers archived exclusion and unarchive restoration. Full validation passed 2026-07-01.

- [x] Validate child-mode cookie ownership.
  - Done when: selected child must belong to the active parent.
  - Verify: guard test covers mismatched parent/child.
  - Notes: Existing child-mode guards require the cookie slug to match the requested child and require the child to belong to the active parent. `tests/worker-api.test.ts` covers mismatched child-mode cookie access and parent reauth. Full validation passed 2026-07-01.

- [x] Block archived-child access in kid routes.
  - Done when: archived children cannot access kid mode routes even with an old cookie or direct URL.
  - Verify: route guard test covers archived child.
  - Notes: Archived children are blocked from kid APIs with `child_locked`; direct kid pages redirect to `/profiles/` and clear child mode. `tests/worker-api.test.ts` covers API and route blocking. Full validation passed 2026-07-01.

- [x] Resolve kid routes by database slug.
  - Done when: kid routes use persisted child slugs and no fixed child route list.
  - Verify: dynamic child route test passes.
  - Notes: Kid shell routes resolve child slugs from `child_profiles`, including non-fixture database children. `tests/worker-api.test.ts` covers `/kid/mira/`, `/kid/mira/track/...`, and `/kid/mira/lesson/...`. Full validation passed 2026-07-01.

- [x] Provision progress for newly created children in kid flows.
  - Done when: kid routes repair missing progress for dynamic children as needed.
  - Verify: test covers new child entering kid mode.
  - Notes: Kid home/track/offline-pack/lesson APIs run idempotent progress provisioning before reading progress. `tests/worker-api.test.ts` covers a dynamic child created without progress rows entering kid home and receiving track/lesson progress. Full validation passed 2026-07-01.

## Phase 8: V3 Curriculum Cutover

- [x] Remove generated MVP curriculum from shipped catalog.
  - Done when: existing generated `src/content/curriculum/` track content is no longer shipped unless re-authored and accepted through V3 research.
  - Verify: content inventory confirms only accepted V3 curriculum remains.
  - Notes: Replaced the bridge catalog on 2026-07-01 with `npm run content:promote -- --output src/content/curriculum --clean-output --write --mark-imported`. Inventory now shows 514 files, 412 lesson Markdown files, and only accepted V3 track directories under `grade-03` and `grade-06`. `npm run content:validate`, `npm test`, `npm run check`, and `npm run build` passed.

- [x] Promote accepted V3 research into `src/content/curriculum/`.
  - Done when: V3 track, unit, lesson, and question files are generated from accepted research artifacts.
  - Verify: `npm run content:validate`.
  - Notes: Promoted accepted research into `src/content/curriculum/` on 2026-07-01. Before live write, a strict isolated validation of temp output passed with `validateCurriculum(..., { requireQuestionKeys: true })`: 12 tracks, 90 units, 412 lessons, 2472 questions. Source repairs converted empty-turn `dialogue-builder` items in `research/grammar-1/06-question-sets.md` and `research/rhetoric-1/06-question-sets.md` into app-scorable multiple-choice items. Live `npm run content:validate` passed with the same totals.

- [x] Avoid preserving legacy generated questions as evidence.
  - Done when: no legacy generated questions are migrated, summarized, copied, or used as curriculum evidence.
  - Verify: spot check promoted curriculum against accepted research sources.
  - Notes: The live promotion tool reads accepted research artifacts only and deletes the previous output directory before writing. Spot checks and generated path inventory confirm the shipped catalog is generated from accepted research paths. `rg -n "^\\s*(questionGoal|misconception):|type:\\s*(constructed-response|speaking-prompt)" src/content/curriculum` returns no matches, so author-only fields and unsupported scored source types are not in runtime files.

- [x] Keep research files out of runtime reads.
  - Done when: app runtime reads only `src/content/curriculum/` and not arbitrary `research/` files.
  - Verify: `rg "research/" src scripts` confirms only authoring/promotion paths use research files.
  - Notes: `rg "research/" src scripts` shows no `src/` runtime reads and only `scripts/research-promotion.ts` using `research/track-status.json`. Full validation passed 2026-07-01.

- [x] Seed V3 catalog into fresh database without legacy curriculum rows.
  - Done when: fresh seed contains only V3 curriculum.
  - Verify: fresh database seed inspection.
  - Notes: Fresh local D1 smoke on 2026-07-01 applied migrations to `/tmp/buddyblocks-v3-final.dPAjqF`, ran `npx tsx scripts/seed.ts --config wrangler.deploy.jsonc --local --persist-to /tmp/buddyblocks-v3-final.dPAjqF`, and queried 12 tracks, 90 units, 412 lessons, 2472 questions, 0 parents, and 0 children. No legacy catalog rows were present.

- [x] Delete unsupported legacy curriculum generators.
  - Done when: scripts that can recreate legacy content are removed or clearly replaced by V3 promotion tooling.
  - Verify: `rg "generate|generator|legacy" scripts src docs` reviewed.
  - Notes: `find scripts -maxdepth 2 -type f` now shows only `research-promotion.ts`, `reset-local.sql`, `seed.ts`, and `validate-content.ts`. `rg "generate|generator|legacy" scripts src docs --glob '!src/content/**'` shows no legacy curriculum generator script; remaining generator matches are V3 promotion, runtime mad-minute fact generation, docs, or Astro content IDs. Full validation passed 2026-07-01.

## Phase 9: Clean V3 Data Model And Legacy Cleanup

- [x] Allow parent email to be optional or setup-supplied.
  - Done when: parent model/schema no longer requires the old hardcoded email assumption.
  - Verify: setup parent test without email passes if email is optional.
  - Notes: Clean V3 baseline `migrations/0001_initial.sql` makes `parents.email` nullable, and `POST /api/setup/parent` stores `NULL` when email is omitted. `tests/worker-api.test.ts` covers parent setup without email. `npm test -- tests/worker-api.test.ts` and `npm run check` passed 2026-07-01.

- [x] Replace MVP migration chain with clean V3 baseline schema when practical.
  - Done when: fresh V3 database setup does not require unsupported MVP compatibility migrations.
  - Verify: fresh migration run succeeds.
  - Notes: Collapsed the migration chain into clean V3 baseline `migrations/0001_initial.sql` and removed old incremental migration files `0002` through `0009`, including the MVP-only `child_subject_levels` backfill. Fresh in-memory migration tests passed through `tests/worker-api.test.ts`, `tests/lesson-completion.test.ts`, `tests/provisioning.test.ts`, and `tests/seed-sql.test.ts`; `npm run check` passed 2026-07-01. Do not delete or alter the existing Cloudflare MVP site/database for `learn.billplustara.com`.

- [x] Remove prior-MVP database compatibility code.
  - Done when: code only needed to upgrade old MVP database versions is gone or documented as still supported.
  - Verify: dead-code audit completed.
  - Notes: Removed the old `child_subject_levels` table/migration/index/reset references and deleted the removed subject-level override API shim. `rg -n "child_subject_levels|subject-levels|subject_levels_removed|000[2-9]_" migrations src scripts tests docs/v3-dev-checklist.md` now only found stale checklist notes before this update. Targeted worker and migration-backed tests plus `npm run check` passed 2026-07-01.

- [x] Remove hardcoded family fixtures from code.
  - Done when: runtime code has no unsupported dependency on `bill`, `reagan`, or `ada`.
  - Verify: `rg "bill|reagan|ada" src scripts tests docs` reviewed and remaining matches are intentional.
  - Notes: Runtime source/scripts no longer have whole-word `bill`, `reagan`, or `ada` matches outside intentional spec/checklist historical references and `src/content/` vocabulary content. Tests now use neutral local fixtures (`morgan`, `mira`, `nico`, `luca`). `npm test` passed 2026-07-01.

- [x] Remove tests that rely on MVP users or slugs.
  - Done when: tests use dynamic setup/children or explicit local fixtures unrelated to MVP family data.
  - Verify: `npm test`.
  - Notes: Replaced old MVP test fixtures with neutral local identities in `tests/worker-api.test.ts`, `tests/lesson-completion.test.ts`, `tests/offline-api.test.ts`, and `tests/seed-sql.test.ts`; host security tests now use `buddyblocks.net`. `rg -n "\\b(bill|reagan|ada)\\b|learn\\.billplustara\\.com" tests` returns no matches. `npm test` passed 2026-07-01.

- [x] Remove docs and assets that describe `learn.billplustara.com` as the product destination.
  - Done when: public docs and brand assets use `buddyblocks.net` except when explicitly documenting the old private deployment.
  - Verify: `rg "learn\\.billplustara\\.com|buddyblocks\\.net" docs public src`.
  - Notes: `public/brand/index.html` uses `buddyblocks.net`, while `astro.config.mjs` reads the deployment site from ignored `.env` and `wrangler.jsonc` is a public template copied to ignored `wrangler.deploy.jsonc` for account-specific Cloudflare values. `rg "learn\\.billplustara\\.com|buddyblocks\\.net" docs public src astro.config.mjs wrangler.jsonc` shows remaining `learn.billplustara.com` matches only in V3 spec/checklist old-deployment notes or local absolute paths in `docs/question-types.md`. `npm run check`, `npm run build`, and `npm run deploy:dry-run` passed 2026-07-01.

- [x] Audit unsupported MVP features.
  - Done when: dead MVP code is deleted or explicitly documented as still supported.
  - Verify: audit notes captured here.
  - Notes: Audit completed 2026-07-01. Removed fixed family seeding, `src/lib/seed-family.ts`, legacy curriculum generators, old fixed child route helpers, MVP test fixture names, the MVP-only migration chain, `child_subject_levels`, and the old subject-level override API path. Remaining MVP generated curriculum catalog is not considered production-ready V3 and stays under Phase 8 until the intentional accepted-research promotion/import replaces it; the promotion dry run now succeeds. Old-domain references are limited to intentional spec/checklist/deployment-hold notes and local absolute doc paths.

- [x] Keep future hosted SaaS compatibility visible.
  - Done when: shared curriculum remains global and family-owned table changes do not block future `family_id` or `tenant_id` scoping.
  - Verify: data model review references `docs/hosted-saas-plan.md`.
  - Notes: Data model review completed 2026-07-01. Curriculum tables (`tracks`, `units`, `lessons`, `questions`) remain global; family-owned tables remain rooted through parent/child ownership and can receive future `family_id`/`tenant_id` scoping before hosted launch. Child provisioning helpers are generic and not self-hosted-family-specific. Hosted SaaS scope remains in `docs/hosted-saas-plan.md`, and self-hosted docs link back there.

## Phase 10: Deployment And Public Self-Hosted Docs

- [x] Update public self-hosted setup docs.
  - Done when: docs cover environment setup, D1 creation, migrations, curriculum seed, deploy, custom domain setup, first-run onboarding, and smoke testing.
  - Verify: docs review against V3 deployment requirements.
  - Notes: Added `docs/self-hosted-deployment.md` covering environment setup, D1 creation, local/remote migrations, curriculum seed, deploy, custom-domain setup, first-run onboarding, smoke testing, D1 operating notes, and the temporary old-site hold. Docs review passed 2026-07-01.

- [x] Cite current official Cloudflare references where required.
  - Done when: Workers, D1 migrations, static assets, custom domains, and D1 limits docs cite current official references.
  - Verify: links checked during docs update.
  - Notes: `docs/self-hosted-deployment.md` cites official Cloudflare docs checked 2026-07-01 for Wrangler configuration, Workers Static Assets, Workers Custom Domains, D1 getting started, D1 Wrangler commands, D1 migrations, Workers local data, and D1 limits.

- [x] Configure deployment target for `buddyblocks.net`.
  - Done when: V3 docs/config use the new public deployment target.
  - Verify: deployment config/docs review.
  - Notes: Ignored local files `.env` and `wrangler.deploy.jsonc` hold the `buddyblocks.net` deployment target and Cloudflare D1 database name/id; tracked `wrangler.jsonc` remains a public template. Brand asset example also uses the new domain. The `buddyblocks.net` Cloudflare zone has been added and currently has no DNS records. `docs/self-hosted-deployment.md` resolves the D1 decision: use a fresh V3 D1 database named `buddy_blocks_v3`, keep the binding named `DB`, and leave the old MVP database/site in place until the new-domain smoke passes. `npm run deploy:dry-run` passed 2026-07-01.

- [x] Keep `learn.billplustara.com` live during V3 testing.
  - Done when: old MVP deployment is not retired until V3 production smoke testing passes.
  - Verify: release notes or deployment checklist confirms temporary dual-site period.
  - Notes: Production dual-site smoke passed 2026-07-01 and is recorded in `docs/v3-production-release-checklist.md`. V3 now runs on Worker `buddy-blocks-v3` at `buddyblocks.net` with fresh D1 database `buddy_blocks_v3`; remote migrations, remote seed, setup, child create/edit/archive/unarchive, lesson submission, and cleanup validation passed. The old MVP site was kept live by restoring Worker `buddy-blocks` to version `6e8d3052-0f6c-436c-af8e-d39bed8c4401`, bound to the prior MVP D1 database, and reattaching route `learn.billplustara.com/*`; `GET https://learn.billplustara.com/` returned HTTP 200 with the old catalog. Old-site retirement was not performed and remains a later owner-authorized operational decision.

- [x] Keep hosted SaaS work in `docs/hosted-saas-plan.md`.
  - Done when: V3 self-hosted docs do not absorb hosted SaaS scope beyond compatibility notes.
  - Verify: docs review.
  - Notes: `docs/self-hosted-deployment.md` explicitly excludes hosted SaaS billing, tenants, Stripe, and multi-family onboarding, and points that work back to `docs/hosted-saas-plan.md`. Docs review passed 2026-07-01.

## Phase 11: Final Fresh-Database Smoke Test

- [x] Initialize fresh V3 schema.
  - Done when: clean D1 database can be created and migrated from scratch.
  - Verify: migration command succeeds.
  - Notes: Final local fresh-D1 smoke on 2026-07-01 applied migrations from scratch to `/tmp/buddyblocks-v3-final.dPAjqF` with `npx wrangler d1 migrations apply DB --config wrangler.deploy.jsonc --local --persist-to /tmp/buddyblocks-v3-final.dPAjqF`. Wrangler applied `0001_initial.sql` and `0002_hosted_interest_emails.sql` successfully.

- [x] Seed curriculum into empty database.
  - Done when: curriculum seed succeeds with V3 catalog.
  - Verify: seed command succeeds and curriculum rows are present.
  - Notes: Final local seed on 2026-07-01 succeeded against the promoted V3 catalog with `npx tsx scripts/seed.ts --config wrangler.deploy.jsonc --local --persist-to /tmp/buddyblocks-v3-final.dPAjqF`, producing 12 tracks, 90 units, 412 lessons, and 2472 questions.

- [x] Confirm zero parents and zero children after curriculum seed.
  - Done when: fresh seeded database has no parent or child rows.
  - Verify: database query confirms zero parents and children.
  - Notes: Fresh-D1 query after final V3 seed on 2026-07-01 returned `parents: 0` and `children: 0` alongside 12 tracks, 90 units, 412 lessons, and 2472 questions.

- [x] Complete first-run parent setup.
  - Done when: parent can be created through onboarding and receives a session.
  - Verify: manual smoke test or browser test.
  - Notes: Browser smoke on 2026-07-01 against the final local V3 D1 opened `/setup/`, created parent `v3_parent`, and landed on `/parent/` with a live session showing `Parent account: v3_parent`.

- [x] Create one or more children through onboarding.
  - Done when: children are created with display names, grade levels, stable slugs, defaults, and initialized progress.
  - Verify: manual smoke test or browser test.
  - Notes: Browser smoke on 2026-07-01 created child `Vera Smoke` from `/parent/` with grade 3. Dashboard showed slug-backed active child state, 5 hearts, 0 XP, and promoted V3 grade 3 scholastic/foundation progress initialized, including Math 0/76 and Vocabulary 0/36.

- [x] Complete a lesson as a child.
  - Done when: child can select profile, play a lesson, answer questions, see retry hints when appropriate, and save progress.
  - Verify: manual smoke test or browser test.
  - Notes: Browser/API smoke on 2026-07-01 completed promoted V3 math lessons for `vera-smoke`. API smoke completed `lesson_grade3_math_u01_l01_hundreds_tens_and_ones` at 6/6 and verified recent activity. Browser lesson-player smoke then opened `/kid/vera-smoke/`, continued `Addition Strategies That Still Work`, answered all 6 questions through multiple-choice, fill-blank, order-items, and text-input controls, and reached the result screen with `Perfect stack!`, 21 XP, 6/6, and next lesson `Subtraction As Difference And Take-Away`. Retry-hint rendering remains covered by `tests/lesson-flow.test.ts`.

- [x] Archive and unarchive a child.
  - Done when: archived child is hidden/blocked, unarchived child regains access, and progress is preserved.
  - Verify: manual smoke test or browser test.
  - Notes: Final local API smoke on 2026-07-01 archived `vera-smoke`, verified `/api/children/vera-smoke/home` returned `child_locked` and `/api/children` omitted the child, then unarchived it and verified it returned to active children. Follow-up DB query after browser lesson completion showed `active_children: 1`, `archived_children: 0`, `lesson_attempts: 2`, and Math progress preserved with `math_lessons_completed: 2`.

- [x] Run final validation commands.
  - Done when: all required validation commands pass or deferred failures are documented with reasons.
  - Verify:
    - `npm run content:validate`
    - `npm test`
    - `npm run check`
    - `npm run build`
  - Notes: Final post-cutover validation passed 2026-07-01: `npm run content:validate` (12 tracks, 90 units, 412 lessons, 2472 questions), `npm test` (15 files / 127 tests), `npm run check` (0 errors/warnings/hints after clearing ignored `.astro/` cache), `npm run build`, and `npm run deploy:dry-run`.

## Test Coverage Ledger

- [x] V3 question hints parse from fenced question blocks.
- [x] Curriculum seed SQL stores `hint`.
- [x] Lesson APIs return `hint`.
- [x] Offline-pack APIs return `hint`.
- [x] Lesson player shows hints only on retry queue items.
- [x] Setup status works before and after parent creation.
- [x] Duplicate parent creation is prevented after setup.
- [x] Parent session is created during setup.
- [x] Child create/edit/archive/unarchive flows work.
- [x] Archived child access is blocked.
- [x] Dynamic progress initialization works for newly created children.
- [x] Seed script no longer creates fixed Bill/Reagan/Ada rows.
- [x] Fresh migrations plus curriculum seed leave the database with zero parents and zero children.
- [x] No tests require fixed MVP slugs or users such as `bill`, `reagan`, or `ada`.
- [x] Future V3 curriculum reseeding repairs dynamic child progress without overwriting completed work.
- [x] Authored question keys parse.
- [x] Duplicate question keys fail validation.
- [x] Seeded question IDs remain stable when questions are reordered.
- [x] Author-only metadata does not leak to lesson APIs unless a deliberate metadata endpoint is added.
- [x] Content validation fails on malformed fenced `question` YAML.
- [x] Content validation fails on duplicate match-pair right-side labels.
- [x] Promoted V3 curriculum excludes scored `constructed-response` and `speaking-prompt` questions unless explicitly supported.

## Resolved Decisions

- [x] Decide which V3 research directories are accepted for initial production curriculum.
  - Notes: Resolved by `research/track-status.json`. Tracks marked `ready_for_import` are accepted for the initial production curriculum queue.

- [x] Decide when to replace the MVP migration chain with a clean V3 baseline.
  - Notes: Replace the MVP migration chain during V3 cleanup now. This repo can remove MVP compatibility paths, but do not delete or alter the existing Cloudflare MVP site/database.

- [x] Decide whether self-hosted mode needs an explicit config flag for single-parent behavior before hosted SaaS work begins.
  - Notes: No self-hosted config flag is needed. Single-parent behavior is the default. Add a hosted/SaaS multi-parent flag later only when hosted mode is implemented.

- [x] Decide whether `questionGoal` and `misconception` should live in comments, QA artifacts, or a future non-runtime metadata path.
  - Notes: Keep them only in research/QA artifacts for V3. Do not promote them into runtime lesson files, D1 seed data, APIs, or offline packs.

- [x] Decide the Cloudflare D1 database approach for the V3 self-hosted deployment.
  - Notes: Resolved in `docs/self-hosted-deployment.md`. Use a fresh V3 D1 database named `buddy_blocks_v3` in the ignored `wrangler.deploy.jsonc`, keep the Worker binding as `DB`, do not reuse the old private MVP database, and keep `learn.billplustara.com` live until `buddyblocks.net` passes production smoke.

- [x] Resolve unsupported scored V3 curriculum source items before promotion.
  - Notes: Source repair is complete for the unsupported scored `constructed-response` and `speaking-prompt` items in `grade-03-math`, `grammar-1`, and `memory-works-1`. A full `npm run content:promote` dry run now completes without source blockers.

## Current Restart State

- No unresolved V3 build blockers or unchecked checklist items are known as of 2026-07-01.
- The accepted V3 catalog cutover is complete locally and in production: `src/content/curriculum/` is the promoted runtime mirror of the 12 imported research tracks, local and remote D1 seed/smoke passed, final validation commands passed, and `buddyblocks.net` is deployed as Worker `buddy-blocks-v3`.
- `buddyblocks.net` is intentionally reset to first-run setup after production smoke: remote D1 still has 12 tracks, 90 units, 412 lessons, and 2472 questions, with 0 parents, 0 children, 0 lesson attempts, and 0 child lesson progress rows.
- `learn.billplustara.com` remains live on the old MVP Worker/database for the temporary dual-site period. Do not retire it until the owner explicitly authorizes old-site retirement.
