# V1 Hardening and Scaling Plan

This document turns the current architecture review into a sequential improvement plan. The goal is to preserve the working Grade 3 and Grade 6 MVP while making the app easier to scale to full courses, all 12 grades, and temporary weekly school vocabulary practice.

Use this as the backlog for `/goal` work. Each item includes the current problem, recommended solution, implementation notes, and tests that should be built or updated.

## Success Criteria Before V1 Tag

- The app still supports the current fixed family setup for Reagan and Ada.
- Full Grade 3 and Grade 6 curriculum can be added without runtime pages slowing down noticeably.
- The architecture does not assume only Grade 3, Grade 6, math, vocabulary, or Spanish.
- Lesson config and scoring behavior are defined in one shared place.
- Track and lesson APIs avoid N+1 query patterns.
- Temporary student-specific vocabulary practice can be added without polluting permanent curriculum tables.
- Relevant `/docs` documentation is updated as features and architecture change.
- `npm test`, `npm run check`, and `npm run build` pass.
- Local D1 migration and seed flow still works.
- A concise deployment checklist exists for the v1 GitHub tag and Cloudflare deploy.

## Recommended Work Order

1. Add performance indexes and query batching.
2. Extract shared lesson config schemas and defaults.
3. Move Mad Minute domain logic out of `LessonPlayer`.
4. Split production curriculum data from fixed family seed data.
5. Replace static child/lesson route generation with generic route shells.
6. Add subject metadata.
7. Refactor Worker modules around API handlers, data access, and lesson completion services.
8. Add temporary weekly vocabulary practice sets.
9. Expand integration and regression tests.
10. Run the v1 release checklist, tag GitHub, and deploy.

## 1. Performance Indexes and Query Batching

### Problem

The app is currently fast because the dataset is small. As full Grade 3 and Grade 6 courses are added, then all 12 grades, the slow spots will be repeated database queries rather than raw lesson count.

Current examples:

- `apiChildHome` loops through tracks and performs multiple queries for each track.
- `apiChildTrack` loads units, then lessons per unit, then progress per lesson.
- `apiParentDashboard` repeats track/progress/activity queries per child and per track.
- The current schema has some useful indexes, but it is missing a few lookup indexes that will matter when curriculum volume grows.

### Recommended Solution

Add focused D1 indexes and batch the high-traffic read paths.

Recommended indexes:

```sql
CREATE INDEX IF NOT EXISTS idx_tracks_grade_subject_sort
  ON tracks(grade_level, subject, sort_order);

CREATE INDEX IF NOT EXISTS idx_tracks_subject_grade
  ON tracks(subject, grade_level);

CREATE INDEX IF NOT EXISTS idx_lessons_unit_sort
  ON lessons(unit_id, sort_order);

CREATE INDEX IF NOT EXISTS idx_child_lesson_progress_child_lesson
  ON child_lesson_progress(child_profile_id, lesson_id);

CREATE INDEX IF NOT EXISTS idx_child_track_progress_child_track
  ON child_track_progress(child_profile_id, track_id);

CREATE INDEX IF NOT EXISTS idx_child_subject_levels_child_subject
  ON child_subject_levels(child_profile_id, subject);
```

Then reduce N+1 query patterns:

- Fetch all track summaries for a child in one joined or grouped query.
- Fetch all lessons and progress for a track in one query ordered by unit and lesson sort order.
- Fetch parent dashboard child summaries using grouped queries where practical.

### Tests

- Add Worker/data-access tests that verify `apiChildTrack` returns the same response shape after batching.
- Add a fixture with multiple units and many lessons to ensure ordering remains correct.
- Add regression tests for completed, available, and locked lesson status in one track response.
- Add a test that a child with a subject override only sees tracks for that effective grade.
- Run `npm test`, `npm run check`, and local D1 migration tests after adding indexes.

## 2. Shared Lesson Config Schemas and Defaults

### Problem

Lesson config types and Zod schemas are duplicated in multiple places:

- `src/lib/content.ts`
- `src/worker.ts`
- `src/components/islands/LessonPlayer.tsx`

Mad Minute defaults are also duplicated, including the fact range, 60-second duration, and goal of 40. This creates drift risk: authoring validation, Worker parsing, and UI fallback behavior could disagree.

### Recommended Solution

Create a shared module, likely `src/lib/lesson-config.ts`, that owns:

- `LessonKind`
- `MadMinuteConfig`
- `StandardLessonConfig`
- `LessonConfig`
- `MadMinuteConfigSchema`
- `StandardLessonConfigSchema`
- `DEFAULT_MAD_MINUTE_CONFIG`
- `parseMadMinuteConfig`
- `parseStandardLessonConfig`
- `isMadMinuteConfig`

Then import those types and helpers from content loading, Worker parsing, UI rendering, and tests.

### Implementation Notes

- Keep the schemas runtime-safe for Worker usage.
- Keep exported TypeScript types inferred from Zod where practical.
- Consider stricter authoring validation than runtime fallback behavior:
  - Content files should fail loudly if invalid.
  - Runtime DB parsing can still fall back defensively if stored config is bad.
- Decide whether defaults should be allowed in authored Markdown or always explicitly written for clarity.

### Tests

- Add unit tests for valid standard config with intro cards and review settings.
- Add unit tests for valid Mad Minute config with fixed factor and mixed factor.
- Add unit tests for invalid Mad Minute config, including `minFactor > maxFactor`.
- Add tests that content validation and Worker runtime parsing use the same defaults.
- Update existing Mad Minute tests to import config defaults from the shared module.

## 3. Move Mad Minute Logic Out of the UI Component

### Problem

`LessonPlayer.tsx` exports `generateMadMinuteFact`, and `tests/mad-minute.test.ts` imports from the UI component. That couples domain behavior to a large Preact file and makes future speed/drill types harder to test independently.

### Recommended Solution

Create `src/lib/mad-minute.ts` for:

- Fact generation.
- Allowed fact validation.
- Score calculation.
- Goal progress helpers if they are domain-specific.

The UI should only manage state, input focus, rendering, and API submission.

The Worker should use the same Mad Minute validation and scoring helpers where possible.

### Tests

- Move existing fact generation tests to import from `src/lib/mad-minute.ts`.
- Add tests for mixed factor range boundaries.
- Add tests for fixed factor drills.
- Add tests that invalid submitted facts are not counted as correct.
- Add tests for score and XP calculation around goal bonus boundaries.

## 4. Split Curriculum Source From Fixed Family Seed Data

### Problem

`src/lib/content.ts` currently owns both curriculum loading and production/demo identity:

- Parent ID, username, and email.
- Child fixtures for Reagan and Ada.
- Grade overrides such as Reagan using Grade 3 Spanish.

That worked for the first family MVP, but it mixes permanent curriculum source with mutable family enrollment data. It also makes static route generation and tests depend on fixed children.

### Recommended Solution

Split into separate modules:

- `src/lib/curriculum.ts`
  - Loads tracks, units, lessons, and questions from `src/content/curriculum`.
  - Exports `TRACKS`, `getTracksForGrade`, `getAllLessons`, `getAllQuestions`.
- `src/lib/seed-family.ts` or `src/lib/dev-fixtures.ts`
  - Exports the current v1 parent and children.
  - Used only by seed scripts and fixture-specific tests.

Update `scripts/seed.ts` so it clearly has two phases:

1. Seed canonical curriculum.
2. Seed the current v1 family/profile data.

Longer term, family/profile creation should move to app workflows or environment-specific seed files.

### Tests

- Add tests proving curriculum can load without importing family fixtures.
- Keep fixture tests for the current v1 parent and children, but move them to a fixture-specific test file.
- Add tests that `getTracksForGrade(3)` and `getTracksForGrade(6)` still return expected subjects.
- Add tests that `getTracksForChild` or its replacement handles subject overrides with fixture data.
- Add a seed SQL generation test if the seed script is refactored into testable pure functions.

## 5. Replace Static Child/Lesson Route Generation With Generic Route Shells

### Problem

The Astro pages currently use `getStaticPaths()` based on fixture children and available lessons. That means route generation is tied to seed-time children and specific curriculum paths.

As soon as children are added dynamically, or weekly vocabulary lessons are generated in D1, static route generation becomes a mismatch. The Worker can authenticate and API-fetch dynamic data, but the Astro asset may not exist for the new route.

### Recommended Solution

Use generic route shells for kid, track, and lesson pages.

Options:

- Use Astro server/hybrid output if appropriate for the deployment model.
- Or create catch-all/static shells that can serve dynamic paths behind the Worker.
- Or route all kid app pages to a small number of static app shells and let the client fetch by URL params.

The Worker already handles protected pages and asset serving, so the simplest direction may be generic static shells for:

- `/kid/[childSlug]/`
- `/kid/[childSlug]/track/[trackSlug]/`
- `/kid/[childSlug]/lesson/[lessonId]/`

without enumerating every child/track/lesson combination at build time.

### Tests

- Add a test or build check proving pages are available for a child/lesson not listed in fixtures.
- Add Worker route tests for unknown child, unauthorized child, locked lesson, and valid dynamic lesson.
- Add an integration test for a temporary weekly practice lesson URL once practice sets exist.
- Run `npm run build` and inspect that route generation does not grow with content volume.

## 6. Add Subject Metadata

### Problem

The app accepts arbitrary subject strings in curriculum, but multiple layers still hardcode subject-specific behavior:

- Sort order for `math`, `vocabulary`, `spanish`.
- Subject labels.
- Subject icons.
- Starter badges by subject.

This will get awkward when adding science, history, reading, writing, or other tracks.

### Recommended Solution

Add subject metadata as data, not conditionals.

Possible file:

```yaml
# src/content/subjects.yaml
subjects:
  - key: math
    label: Math
    sortOrder: 1
    iconKey: plus-block
    starterBadge:
      key: math-starter
      label: Math Starter
  - key: vocabulary
    label: Vocabulary
    sortOrder: 2
    iconKey: clipboard
    starterBadge:
      key: word-explorer
      label: Word Explorer
  - key: spanish
    label: Spanish
    sortOrder: 3
    iconKey: speech-bubble
    starterBadge:
      key: spanish-starter
      label: Spanish Starter
```

Then use metadata for:

- Track ordering.
- Parent dashboard subject labels.
- Track icons.
- Subject starter badge creation.

Unknown subjects should still have a fallback label and generic icon.

### Tests

- Add subject metadata loader tests.
- Add tests that track ordering follows metadata sort order.
- Add tests that an unknown subject still renders with fallback label/icon.
- Add tests that starter badges are generated from metadata rather than hardcoded subject names.
- Add a fixture subject such as `science` in tests without needing production curriculum.

## 7. Refactor Worker Modules

### Problem

`src/worker.ts` is doing too much:

- Fetch entrypoint and asset routing.
- Auth and parent gate behavior.
- API routing.
- SQL data access.
- Response shaping.
- Lesson submission, scoring, progress updates, activity updates, and badge logic.

This makes every feature touch the same file and increases regression risk.

### Recommended Solution

Split the Worker into focused modules without changing behavior.

Suggested structure:

```text
src/worker.ts
src/worker/router.ts
src/worker/auth-handlers.ts
src/worker/api-handlers.ts
src/worker/data.ts
src/worker/responses.ts
src/worker/lesson-completion.ts
src/worker/badges.ts
src/worker/types.ts
```

Start with pure moves and no behavior changes. Then extract duplicate lesson completion logic into a shared service:

- Save lesson attempt.
- Save question attempts when present.
- Update lesson progress.
- Unlock next lesson.
- Update track progress.
- Update daily activity.
- Update hearts.
- Return completion result.

### Tests

- Keep existing tests passing after each extraction.
- Add unit tests for `lesson-completion` using mocked data-access functions if direct Worker/D1 testing is heavy.
- Add tests for repeat lesson completion:
  - XP total behavior.
  - Best score behavior.
  - `completed_at` stays the first completion time.
  - Next lesson unlock remains idempotent.
- Add tests for Mad Minute completion using the same completion service.

## 8. Temporary Weekly School Vocabulary Practice Sets

### Problem

Weekly school vocabulary is child-specific, temporary, and tied to a real-world school test date. It should not live as normal permanent curriculum, because:

- It is not grade-wide canonical content.
- It should be pinned above regular coursework.
- It may expire or be archived after the school test.
- It may need different lifecycle rules than normal lessons.

Hard-deleting it immediately after the test could break progress/history or remove useful review data.

### Recommended Solution

Add a child-specific practice set model separate from canonical curriculum.

Suggested tables:

```sql
CREATE TABLE IF NOT EXISTS practice_sets (
  id TEXT PRIMARY KEY,
  child_profile_id TEXT NOT NULL,
  subject TEXT NOT NULL DEFAULT 'vocabulary',
  title TEXT NOT NULL,
  source TEXT,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('draft', 'active', 'archived')),
  pinned INTEGER NOT NULL DEFAULT 0,
  starts_at TEXT,
  expires_at TEXT,
  archived_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (child_profile_id) REFERENCES child_profiles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS practice_set_cards (
  id TEXT PRIMARY KEY,
  practice_set_id TEXT NOT NULL,
  term TEXT NOT NULL,
  definition TEXT,
  example TEXT,
  accepted_answers_json TEXT,
  sort_order INTEGER NOT NULL,
  FOREIGN KEY (practice_set_id) REFERENCES practice_sets(id) ON DELETE CASCADE
);
```

Possible additional tables:

- `practice_set_attempts`
- `practice_card_attempts`
- Or reuse `lesson_attempts` only if practice sets are represented as generated lessons.

Recommended behavior:

- Parent creates weekly vocabulary for a child.
- Active pinned sets appear at the top of Kid Home.
- Practice set can render as flashcard easy/hard lessons.
- After the school test, archive the set instead of deleting it.
- Archived sets do not appear on Kid Home by default.
- A later cleanup job can hard-delete old archived sets if desired.

### Documentation Updates

- Update `docs/lesson-authoring.md` if practice sets reuse lesson authoring concepts or generated flashcard lesson behavior.
- Update `docs/question-types.md` if practice cards introduce new flashcard behavior, answer rules, or review modes.
- Add a dedicated practice-set parent workflow doc if the feature includes parent-created weekly vocabulary lists.
- Update `docs/run-locally.md` if new migrations, seed modes, or local testing steps are added.

### Tests

- Add migration tests or schema validation for practice set tables.
- Add API tests for creating, updating, pinning, archiving, and listing practice sets.
- Add tests that pinned active practice sets appear above normal recommended lessons.
- Add tests that expired or archived sets do not appear on Kid Home.
- Add tests that practice cards generate valid flashcard questions.
- Add tests that archiving does not delete historical attempts.
- Add tests for child-mode access control so one child cannot access another child's practice set.

## 9. Content Scale and Seed Strategy

### Problem

The content loader reads all curriculum Markdown from disk, and the seed script upserts every track, unit, lesson, and question. This is fine now. With all 12 grades and many lessons per grade, build and seed time will grow.

Runtime APIs are D1-backed, so the production app does not read Markdown per request. The main concern is developer workflow speed and seed safety.

### Recommended Solution

Keep Markdown as the source of truth for canonical curriculum, but make seed behavior more intentional.

Recommended improvements:

- Keep IDs stable forever once seeded.
- Add a content validation command that does not require seeding.
- Make seed output summarize counts by grade and subject.
- Consider seed modes later:
  - `--all`
  - `--grade=3`
  - `--grade=6`
  - `--curriculum-only`
  - `--fixtures-only`
- Avoid deleting progress when content changes.
- Add duplicate ID detection before generating SQL.

### Tests

- Add tests for duplicate track, unit, lesson, and question IDs.
- Add tests that folder order controls sort order.
- Add tests for loading all available grade folders dynamically.
- Add tests that adding `grade-07` does not require changing exports or tests.
- Add tests that seed SQL uses stable IDs and does not overwrite completion rows.

## 10. LessonPlayer Component Split

### Problem

`LessonPlayer.tsx` is a large component that mixes:

- Lesson flow state.
- Answer state for every question type.
- Question rendering.
- Mad Minute gameplay.
- Completion animation and reward UI.
- Media display.
- Speaking prompt recording.

This is understandable for the MVP, but adding more question types will keep increasing complexity.

### Recommended Solution

Split into focused files after the shared config and Mad Minute extraction are done.

Suggested structure:

```text
src/components/islands/LessonPlayer.tsx
src/components/lesson/LessonIntro.tsx
src/components/lesson/LessonCompletion.tsx
src/components/lesson/MadMinuteLesson.tsx
src/components/lesson/QuestionControl.tsx
src/components/lesson/question-controls/ChoiceGrid.tsx
src/components/lesson/question-controls/FlashCardControl.tsx
src/components/lesson/question-controls/MatchPairsControl.tsx
src/components/lesson/question-controls/OrderItemsControl.tsx
src/components/lesson/question-controls/TextInputControl.tsx
src/components/lesson/question-controls/SpeakingPromptControl.tsx
src/components/lesson/media.tsx
src/components/lesson/lesson-flow.ts
```

Use the split to make adding new question types mostly additive.

### Tests

- Keep lesson engine unit tests in `tests/lesson-engine.test.ts`.
- Add tests for `prepareLessonQueue` and shuffle behavior if moved to a pure module.
- Add component smoke tests if a browser/component testing setup is added later.
- Add regression tests for all existing question types through scoring and answer payload shape.
- Add a manual QA checklist for one lesson of each question type until component tests exist.

## 11. Badges and Rewards Policy

### Problem

Badge behavior is currently embedded in `getBadges`. It includes generic badges and subject-specific starter badges. This is fine for three subjects, but will become brittle with more subjects and temporary practice sets.

### Recommended Solution

Move badge rules into a dedicated module and make subject starter badges data-driven through subject metadata.

Consider future badge rule shape:

```ts
type BadgeRule =
  | { kind: 'first-lesson'; key: string; label: string }
  | { kind: 'streak'; days: number; key: string; label: string }
  | { kind: 'subject-started'; subject: string; key: string; label: string }
  | { kind: 'perfect-lesson'; key: string; label: string };
```

### Tests

- Add unit tests for first lesson badge.
- Add unit tests for three-day streak badge.
- Add unit tests for subject starter badges generated from metadata.
- Add tests that a new subject can add a starter badge without Worker code changes.
- Add tests for perfect lesson badge.

## 12. Grade and Enrollment Model

### Problem

Children currently have a global `grade_level` plus subject-level overrides. This is a good start, but future all-grade support raises product questions:

- Should a child see only one track per subject?
- Can a child be assigned multiple tracks in the same subject?
- Should a parent be able to pin a lower-grade review track while the main level stays higher?
- Should school vocabulary be a separate practice area or part of vocabulary subject progression?

### Recommended Solution

Keep the current model for v1. Before broader rollout, consider an explicit assignment/enrollment layer:

```sql
CREATE TABLE child_track_assignments (
  id TEXT PRIMARY KEY,
  child_profile_id TEXT NOT NULL,
  track_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  pinned INTEGER NOT NULL DEFAULT 0,
  assigned_at TEXT NOT NULL,
  UNIQUE(child_profile_id, track_id)
);
```

This would let grade-level defaults create assignments while still allowing custom overrides, review tracks, or special courses.

### Tests

- For v1, test current effective-grade behavior thoroughly.
- If assignments are added, test default assignment generation from grade level.
- Test subject override behavior.
- Test parent assignment/unassignment behavior.
- Test that historical progress remains visible after a track is no longer active.

## 13. Security and Access Control Regression Tests

### Problem

The current app has child-mode restrictions, parent reauth, same-origin checks, and protected routes. These become more important once parent-created practice content exists.

### Recommended Solution

Create a small Worker/API test harness for access control behavior.

Important cases:

- Unauthenticated API requests return 401.
- Parent pages redirect to parent gate when child mode is active.
- Child mode cannot access another child.
- Parent APIs require parent reauth when child mode is active.
- Mutating APIs reject invalid origins.
- Temporary practice sets are scoped to the owning child.

### Tests

- Add route-level tests for existing auth behavior before refactoring Worker modules.
- Add tests for same-origin rejection on POST/PATCH.
- Add practice-set access tests when that feature is implemented.

## 14. V1 Release Checklist

### Code Quality Gate

- `git status --short` is clean except intended changes.
- `npm test` passes.
- `npm run check` passes.
- `npm run build` passes.
- Local migrations apply successfully:

```sh
npm run db:migrate:local
```

- Local seed succeeds:

```sh
npm run db:seed:local
```

- Local Worker runs:

```sh
npm run dev:worker
```

### Product QA Gate

Manually verify:

- Login works.
- Profile selection works.
- Reagan sees Grade 6 Math and Vocabulary plus Grade 3 Spanish.
- Ada sees Grade 3 tracks.
- A standard lesson can be completed.
- A Mad Minute lesson can be completed.
- Parent dashboard loads progress.
- Parent subject-level override works.
- Parent gate blocks parent pages from child mode.
- Logout clears session and child mode.

### Release Steps

1. Commit all v1 hardening changes.
2. Tag the release:

```sh
git tag v1.0.0
```

3. Push branch and tag:

```sh
git push
git push origin v1.0.0
```

4. Apply remote migrations if needed:

```sh
npm run db:migrate:remote
```

5. Seed remote only when intentional:

```sh
npm run db:seed:remote
```

6. Deploy:

```sh
npm run deploy
```

7. Verify production:

- `https://learn.billplustara.com/login/`
- Login.
- Complete one safe smoke-test flow.
- Check Cloudflare Worker logs for errors.

## Notes for `/goal` Execution

When using `/goal`, work one item at a time. Prefer small, behavior-preserving refactors first:

- Add tests before changing behavior when practical.
- Move code before changing code.
- Keep old exports temporarily if that makes migration safer.
- Update relevant `/docs` files in the same goal as the behavior or architecture change.
- Run `npm test` and `npm run check` after each item.
- Run `npm run build` after route, Astro, or Worker entry changes.
- Do not combine temporary vocabulary practice with unrelated Worker splitting in the same goal.

## Execution Notes

### Item 1: Performance Indexes and Query Batching

- Changed: added migration `0005_performance_indexes.sql` with the planned lookup indexes; batched child home and parent dashboard track summary reads; replaced `apiChildTrack` unit/lesson/progress N+1 loading with one ordered joined query.
- Tests/docs: added Worker API regression tests for batched `apiChildTrack` response shape, multi-unit lesson ordering, completed/available/locked status handling, subject override access, and index migration coverage.
- Verification: `npm test`, `npm run check`, `npm run build`, and `npm run db:migrate:local` passed.
- Risks: the Worker API test uses Node's experimental built-in SQLite adapter as a D1-shaped harness; it exercises real SQL but is not a perfect D1 runtime.
- Future improvements: batch parent dashboard activity, subject-level, and badge reads across all children when the family model grows beyond the fixed v1 profiles.

### Item 2: Shared Lesson Config Schemas and Defaults

- Changed: added shared lesson config schemas, parsers, defaults, and type guards; moved content validation and Worker runtime parsing onto the shared module; moved the lesson player to shared Mad Minute defaults through a UI-safe core module.
- Tests/docs: added lesson config schema/parser tests; updated Mad Minute tests to use shared defaults; documented the config source of truth in lesson authoring and question type docs.
- Verification: `npm test`, `npm run check`, and `npm run build` passed.
- Risks: importing schema exports directly into browser islands pulls Zod into the client bundle, so browser code should import `lesson-config-core.ts` for defaults/types/type guards.
- Future improvements: add a dedicated content validation script that exercises the shared schemas without running the seed process.

### Item 3: Move Mad Minute Logic Out of the UI Component

- Changed: added `src/lib/mad-minute.ts` for fact generation, allowed-fact validation, submitted attempt scoring, and Mad Minute XP; updated the lesson player and Worker to use the shared helpers.
- Tests/docs: moved fact generation tests to the domain module import and added mixed-range, fixed-factor, invalid submitted fact, and XP goal-boundary coverage; documented the shared Mad Minute domain module.
- Verification: `npm test`, `npm run check`, and `npm run build` passed.
- Risks: Mad Minute submission attempts are still stored only as aggregate lesson attempts, so per-fact audit/debug history is unavailable.
- Future improvements: add Worker route tests for Mad Minute submissions once the Worker API harness covers authenticated POST flows.

### Item 4: Split Curriculum Source From Fixed Family Seed Data

- Changed: moved canonical Markdown curriculum loading to `src/lib/curriculum.ts`; moved fixed v1 parent/child fixtures and child-specific helpers to `src/lib/seed-family.ts`; kept `src/lib/content.ts` as a compatibility barrel; reordered seed generation into curriculum first, then family/profile data.
- Tests/docs: split content tests into curriculum and seed-family suites, including a check that curriculum exports no family fixtures; updated lesson authoring, question type, and local run docs.
- Verification: `npm test`, `npm run check`, `npm run build`, and `npm run db:seed:local` passed.
- Risks: static route generation still depends on `seed-family.ts` until Item 5 replaces fixture-based routes with generic route shells.
- Future improvements: refactor seed SQL generation into pure functions so seed ordering and stable-ID behavior can be tested without invoking Wrangler.

### Item 5: Replace Static Child/Lesson Route Generation With Generic Route Shells

- Changed: replaced fixture-enumerated kid home, track, and lesson Astro routes with three fixed static shells; updated the Worker to map authenticated dynamic kid URLs to those shells; updated islands to derive route params from `window.location` when shell props are absent.
- Tests/docs: added Worker protected-page tests for dynamic DB-backed child shells, unknown child redirects, and child-mode mismatch redirects; documented generic route shell behavior.
- Verification: `npm test`, `npm run check`, and `npm run build` passed. Build output now generates 8 static pages, including `/kid/shell/`, `/kid/track-shell/`, and `/kid/lesson-shell/`.
- Risks: the shell asset paths are implementation details under `/kid/`; direct visits to those shell URLs are still protected by child lookup and redirect to profiles unless a matching child slug exists.
- Future improvements: once temporary practice lessons exist, add a route test for a generated practice lesson URL that resolves through `/kid/lesson-shell/`.

### Item 6: Add Subject Metadata

- Changed: added `src/lib/subjects.ts` for subject labels, sort order, icon keys, and starter badges; replaced Worker subject ordering/labels/badge conditionals and UI track icon subject checks with metadata helpers.
- Tests/docs: added subject metadata tests for production metadata, fallback `science` behavior, metadata sorting, and starter badge lookup; documented subject metadata in the lesson authoring guide.
- Verification: `npm test`, `npm run check`, and `npm run build` passed.
- Risks: subject metadata is currently TypeScript data rather than editable YAML so it can be imported safely by the Worker and browser; non-developer authoring of subjects would need a later build-time loader.
- Future improvements: expose `iconKey` and `subjectLabel` directly from track APIs if future clients should avoid importing subject metadata.

### Item 7: Refactor Worker Modules

- Changed: added `src/worker/lesson-completion.ts` and moved the duplicated standard/Mad Minute completion side effects into one shared service while leaving each API's request validation, scoring, and response shape in `src/worker.ts`.
- Tests/docs: added SQLite-backed `lesson-completion` service tests for repeat completion XP accumulation, best-score behavior, first `completed_at` preservation, idempotent next-lesson unlocks, question attempt writes, and Mad Minute best-attempt score totals; documented the shared completion service in the lesson authoring guide.
- Verification: focused `npm test -- --run tests/lesson-completion.test.ts`, `npm test`, `npm run check`, and `npm run build` passed.
- Risks: the Worker is still mostly a large single file around routing, auth, data access, and response shaping; only the highest-risk duplicate write flow was extracted in this pass.
- Future improvements: continue the Worker split by moving route handlers, data access helpers, response mappers, and badge rules into focused modules after the completion service has settled.
