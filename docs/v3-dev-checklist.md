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

- [ ] Read `docs/v3-dev-spec.md` before implementation.
  - Done when: current V3 goals, cutover rules, deployment expectations, and test plan are understood.
  - Verify: note any spec ambiguity here before coding.
  - Notes:

- [ ] Review related source docs.
  - Done when: `docs/content-creation.md`, `docs/public-release-plan.md` if present, and `docs/hosted-saas-plan.md` are checked for constraints that affect V3.
  - Verify: checklist or spec captures any missing required item.
  - Notes:

- [ ] Inventory current MVP assumptions.
  - Done when: hardcoded family users, child slugs, generated curriculum scripts, migration history, docs references, and test fixtures are listed or understood.
  - Verify: `rg "bill|reagan|ada|learn\\.billplustara\\.com|generated|seed-family"` has been reviewed.
  - Notes:

- [ ] Establish baseline validation status.
  - Done when: current results are recorded for `npm run content:validate`, `npm test`, `npm run check`, and `npm run build`.
  - Verify: failures are documented before V3 changes begin.
  - Notes:

## Phase 1: Question Hint Runtime Support

- [ ] Add `questions.hint TEXT` to the V3 data model.
  - Done when: schema and any active migration/baseline path include nullable `hint`.
  - Verify: fresh database can be initialized with the updated schema.
  - Notes:

- [ ] Parse authored `hint` from fenced `question` YAML blocks.
  - Done when: optional `hint` is accepted by the lesson content parser and preserved in parsed question objects.
  - Verify: parser test covers a lesson question with `hint`.
  - Notes:

- [ ] Store `hint` during curriculum seed.
  - Done when: seed SQL or seed code writes `hint` alongside `explanation`.
  - Verify: seeded database row includes the expected hint text.
  - Notes:

- [ ] Return `hint` from lesson APIs.
  - Done when: lesson API response types and serializers include optional `hint`.
  - Verify: API test asserts `hint` appears for a question that has one.
  - Notes:

- [ ] Return `hint` from offline-pack APIs.
  - Done when: cached/offline lesson payloads include optional `hint`.
  - Verify: offline-pack test asserts `hint` is present.
  - Notes:

- [ ] Add retry queue behavior for missed non-review questions.
  - Done when: a missed non-review question is appended to the end of the lesson queue.
  - Verify: lesson player test covers missed question retry ordering.
  - Notes:

- [ ] Show hints only on retry attempts.
  - Done when: first-attempt questions do not render hints and retry queue items render a highlighted hint callout before answer controls.
  - Verify: UI test covers both first-attempt hidden hint and retry visible hint.
  - Notes:

- [ ] Keep scoring based on first attempts only.
  - Done when: retry answers do not change submitted first-attempt score.
  - Verify: scoring test covers missed first attempt followed by correct retry.
  - Notes:

## Phase 2: Authored Question Metadata And Validation

- [ ] Add optional `key` support to the authored question schema.
  - Done when: fenced question blocks can include `key` without parser errors.
  - Verify: content parser test covers `key`.
  - Notes:

- [ ] Require `key` for promoted V3 content.
  - Done when: promoted lesson validation fails if a runtime question lacks `key`.
  - Verify: validation test covers missing key in promoted content.
  - Notes:

- [ ] Validate question key format.
  - Done when: keys use a conservative slug-like format.
  - Verify: validation test covers valid and invalid keys.
  - Notes:

- [ ] Validate question key uniqueness within each lesson.
  - Done when: duplicate keys in one lesson fail validation.
  - Verify: validation test covers duplicate keys.
  - Notes:

- [ ] Seed stable question IDs from authored keys.
  - Done when: seeded question IDs use the authored key, not the question index, or an equivalent stable mapping.
  - Verify: test confirms question IDs remain stable when questions are reordered.
  - Notes:

- [x] Decide how author-only metadata is preserved.
  - Done when: `questionGoal` and `misconception` are either preserved in comments/QA artifacts or intentionally stripped before runtime output.
  - Verify: decision is documented in code comments, docs, or checklist notes.
  - Notes: Decision made: keep `questionGoal` and `misconception` only in research/QA artifacts. Strip them during promotion so they do not appear in runtime lesson blocks, D1 seed data, lesson APIs, or offline packs.

- [ ] Prevent author-only metadata from leaking to lesson APIs.
  - Done when: `questionGoal` and `misconception` do not appear in lesson API output unless a deliberate metadata endpoint exists.
  - Verify: API test covers absence of author-only fields.
  - Notes:

- [ ] Strengthen fenced YAML validation.
  - Done when: malformed fenced `question` YAML fails `npm run content:validate`.
  - Verify: validation test covers malformed YAML.
  - Notes:

- [ ] Validate supported question types.
  - Done when: unsupported question types fail content validation.
  - Verify: validation test covers unsupported type rejection.
  - Notes:

- [ ] Validate duplicate match-pair right-side labels.
  - Done when: duplicate right-side labels fail content validation.
  - Verify: validation test covers duplicate match-pair right labels.
  - Notes:

- [ ] Validate standard lessons have questions.
  - Done when: standard lessons with no questions fail content validation.
  - Verify: validation test covers an empty standard lesson.
  - Notes:

## Phase 3: V3 Promotion And Import Tooling

- [ ] Identify accepted V3 research artifact sources.
  - Done when: accepted source directories/files are identified from `research/track-status.json`, starting with tracks marked `ready_for_import` and their artifacts such as `03-course-map.md`, `04-unit-design-briefs/`, `05-lesson-briefs.md`, and `06-question-sets.md`.
  - Verify: source list is documented here or in the promotion tool docs, and it matches the manifest entries selected for import.
  - Notes:

- [ ] Maintain research track status manifest.
  - Done when: `research/track-status.json` lists all top-level research tracks, marks tracks with `06-question-sets.md` as `ready_for_import`, and changes tracks to `imported` after successful promotion and validation.
  - Verify: compare `find research -maxdepth 2 -name '06-question-sets.md'` with the manifest before each import, and confirm imported tracks have `readyForImport: false`, `imported: true`, `importBatch`, and `importedAt`.
  - Notes:

- [ ] Use `research/track-status.json` as the import queue.
  - Done when: the promotion/import tool imports tracks marked `ready_for_import` by default and skips `research_only` or already `imported` tracks unless an explicit override is provided.
  - Verify: dry-run or unit test shows the selected import queue matches the manifest.
  - Notes:

- [ ] Add deterministic promotion/import workflow.
  - Done when: a script or tool can create or update `src/content/curriculum/` from accepted research artifacts selected through `research/track-status.json`.
  - Verify: script can be run repeatedly without unintended churn, and dry-run output lists selected tracks and generated file paths.
  - Notes:

- [ ] Record import batches in the manifest.
  - Done when: each successful import updates `research/track-status.json` with a stable `importBatch`, `importedAt`, `status: imported`, `readyForImport: false`, and `imported: true` for every promoted track.
  - Verify: manifest diff after import clearly shows which tracks moved from `ready_for_import` to `imported`.
  - Notes:

- [ ] Follow `docs/content-creation.md` rules during promotion.
  - Done when: promoted output follows canonical authoring guidance.
  - Verify: `npm run content:validate`.
  - Notes:

- [ ] Generate matching track and unit YAML files.
  - Done when: promoted tracks and units are created or updated from accepted research.
  - Verify: content loader sees expected track and unit records.
  - Notes:

- [ ] Generate matching lesson Markdown files.
  - Done when: lesson files include required frontmatter and recommended teaching sections where source content supports them.
  - Verify: content validation passes.
  - Notes:

- [ ] Emit runtime questions as fenced `question` YAML blocks.
  - Done when: each promoted runtime question is represented as one fenced `question` block.
  - Verify: parser and validation tests pass on promoted content.
  - Notes:

- [ ] Preserve instructional intent in lesson body sections.
  - Done when: teaching goals, student outcomes, key ideas, and misconception checks are represented in Markdown body content when available.
  - Verify: spot check promoted lessons against source research.
  - Notes:

- [ ] Preserve `hint` in promoted questions.
  - Done when: source hints survive promotion into lesson Markdown and then into seeded/API data.
  - Verify: content parser and seed tests cover a promoted hint.
  - Notes:

- [ ] Strip `questionGoal` and `misconception` from promoted runtime content.
  - Done when: `questionGoal` and `misconception` remain in research/QA artifacts but are removed from promoted lesson question blocks before content validation, seeding, and API output.
  - Verify: promoted files, seeded data, lesson APIs, and offline packs do not include `questionGoal` or `misconception`.
  - Notes:

- [ ] Enforce app-scorable question policy.
  - Done when: scored V3 curriculum does not include `constructed-response` or `speaking-prompt` unless explicitly converted to unscored practice or backed by an evaluation workflow.
  - Verify: validation test or promotion check rejects unsupported scored questions.
  - Notes:

- [ ] Document temporary manual-copy bridge if used.
  - Done when: any manual copying is clearly labeled temporary and replaced by the deterministic workflow before production readiness.
  - Verify: checklist notes include owner/status for bridge removal.
  - Notes:

## Phase 4: First-Run Setup And Parent Creation

- [ ] Add setup status API.
  - Done when: `GET /api/setup/status` reports whether an active parent exists.
  - Verify: API test covers unconfigured and configured states.
  - Notes:

- [ ] Add setup parent API.
  - Done when: `POST /api/setup/parent` creates the single active parent account from username/password and optional setup-supplied email.
  - Verify: API test covers parent creation.
  - Notes:

- [ ] Enforce single-active-parent behavior for self-hosted mode.
  - Done when: duplicate parent creation is blocked once setup is complete.
  - Verify: API test covers duplicate prevention.
  - Notes: Single-parent self-hosted behavior is the default. Add a hosted/SaaS multi-parent flag only when multi-parent SaaS work begins.

- [ ] Create a parent session after setup.
  - Done when: successful parent setup logs the parent in.
  - Verify: test confirms session/cookie behavior after setup.
  - Notes:

- [ ] Route unconfigured installs to setup.
  - Done when: login or parent-gated routes detect no active parent and redirect to setup.
  - Verify: route test covers unconfigured install.
  - Notes:

- [ ] Close public registration after first active parent exists.
  - Done when: setup cannot be reused as open registration after initial setup.
  - Verify: duplicate setup test passes.
  - Notes:

- [ ] Build parent-led setup UI.
  - Done when: parent can enter username/password and proceed to child creation.
  - Verify: browser or component test covers setup flow.
  - Notes:

## Phase 5: Seed Data Removal And Dynamic Provisioning

- [ ] Remove hardcoded family seeding from seed scripts.
  - Done when: seed scripts seed curriculum only and no longer create Bill/Reagan/Ada or any parent/child rows.
  - Verify: fresh seed leaves zero parents and zero children.
  - Notes:

- [ ] Replace `src/lib/seed-family.ts` with generic provisioning helpers.
  - Done when: fixed-family helper code is removed or replaced with dynamic child provisioning.
  - Verify: tests no longer import fixed family fixtures.
  - Notes:

- [ ] Compute tracks available to a child grade level.
  - Done when: provisioning can determine available tracks for arbitrary child grade levels.
  - Verify: unit test covers multiple grade levels.
  - Notes:

- [ ] Initialize missing child track progress dynamically.
  - Done when: newly created children receive required track progress without fixed slugs.
  - Verify: unit/API test covers new child creation.
  - Notes:

- [ ] Initialize missing child lesson progress dynamically.
  - Done when: lesson progress is provisioned for dynamic children and available curriculum.
  - Verify: unit/API test covers missing lesson progress repair.
  - Notes:

- [ ] Repair progress after future V3 curriculum reseeds.
  - Done when: provisioning can add missing progress for new curriculum without overwriting completed work.
  - Verify: test covers reseed repair preserving completed progress.
  - Notes:

- [ ] Remove fixed parent and child assumptions from route generation.
  - Done when: routes resolve database parents/children dynamically.
  - Verify: `rg "bill|reagan|ada"` has no unsupported runtime assumptions.
  - Notes:

## Phase 6: Child Profiles And Parent Management

- [ ] Add `child_profiles.status`.
  - Done when: child profile model supports active and archived states.
  - Verify: migration/schema test covers default active state.
  - Notes:

- [ ] Store child grade level per child.
  - Done when: child profile creation and update persist grade level.
  - Verify: API test covers grade level.
  - Notes:

- [ ] Generate stable child slugs once.
  - Done when: child slugs are created at profile creation and remain stable across edits.
  - Verify: API test covers display-name edit without slug change.
  - Notes:

- [ ] Add parent children list API.
  - Done when: `GET /api/parent/children` returns children for the active parent.
  - Verify: API test covers active and archived children as intended.
  - Notes:

- [ ] Add child create API.
  - Done when: `POST /api/parent/children` creates child profiles with display name, grade level, slug, avatar/defaults, and progress initialization.
  - Verify: API test covers child creation and progress provisioning.
  - Notes:

- [ ] Add child update API.
  - Done when: `PATCH /api/parent/children/:childId` updates display name, grade level, archive state, and unarchive state as allowed.
  - Verify: API test covers edit/archive/unarchive.
  - Notes:

- [ ] Preserve progress when archiving children.
  - Done when: archive hides access but does not delete progress.
  - Verify: test covers archive followed by unarchive with progress intact.
  - Notes:

- [ ] Add parent dashboard child management UI.
  - Done when: parents can create, edit, archive, and unarchive children from the dashboard.
  - Verify: browser/component test covers child management.
  - Notes:

- [ ] Show grade level and active/archive state in parent UI.
  - Done when: dashboard makes child grade and status visible.
  - Verify: UI test or manual screenshot check.
  - Notes:

## Phase 7: Login, Profile Selector, And Kid Route Guards

- [ ] Update login flow for setup detection.
  - Done when: login routes unconfigured installs to setup and configured installs to normal login.
  - Verify: route tests cover both states.
  - Notes:

- [ ] Replace fixed child assumptions in parent dashboard.
  - Done when: dashboard queries dynamic children rather than fixture slugs.
  - Verify: tests pass without MVP child fixtures.
  - Notes:

- [ ] Update profile selector to list active children dynamically.
  - Done when: selector displays active children from the database.
  - Verify: selector test covers multiple dynamic children.
  - Notes:

- [ ] Hide archived children from kid mode profile selection.
  - Done when: archived children are not selectable in kid mode.
  - Verify: selector test covers archived child exclusion.
  - Notes:

- [ ] Validate child-mode cookie ownership.
  - Done when: selected child must belong to the active parent.
  - Verify: guard test covers mismatched parent/child.
  - Notes:

- [ ] Block archived-child access in kid routes.
  - Done when: archived children cannot access kid mode routes even with an old cookie or direct URL.
  - Verify: route guard test covers archived child.
  - Notes:

- [ ] Resolve kid routes by database slug.
  - Done when: kid routes use persisted child slugs and no fixed child route list.
  - Verify: dynamic child route test passes.
  - Notes:

- [ ] Provision progress for newly created children in kid flows.
  - Done when: kid routes repair missing progress for dynamic children as needed.
  - Verify: test covers new child entering kid mode.
  - Notes:

## Phase 8: V3 Curriculum Cutover

- [ ] Remove generated MVP curriculum from shipped catalog.
  - Done when: existing generated `src/content/curriculum/` track content is no longer shipped unless re-authored and accepted through V3 research.
  - Verify: content inventory confirms only accepted V3 curriculum remains.
  - Notes:

- [ ] Promote accepted V3 research into `src/content/curriculum/`.
  - Done when: V3 track, unit, lesson, and question files are generated from accepted research artifacts.
  - Verify: `npm run content:validate`.
  - Notes:

- [ ] Avoid preserving legacy generated questions as evidence.
  - Done when: no legacy generated questions are migrated, summarized, copied, or used as curriculum evidence.
  - Verify: spot check promoted curriculum against accepted research sources.
  - Notes:

- [ ] Keep research files out of runtime reads.
  - Done when: app runtime reads only `src/content/curriculum/` and not arbitrary `research/` files.
  - Verify: `rg "research/" src scripts` confirms only authoring/promotion paths use research files.
  - Notes:

- [ ] Seed V3 catalog into fresh database without legacy curriculum rows.
  - Done when: fresh seed contains only V3 curriculum.
  - Verify: fresh database seed inspection.
  - Notes:

- [ ] Delete unsupported legacy curriculum generators.
  - Done when: scripts that can recreate legacy content are removed or clearly replaced by V3 promotion tooling.
  - Verify: `rg "generate|generator|legacy" scripts src docs` reviewed.
  - Notes:

## Phase 9: Clean V3 Data Model And Legacy Cleanup

- [ ] Allow parent email to be optional or setup-supplied.
  - Done when: parent model/schema no longer requires the old hardcoded email assumption.
  - Verify: setup parent test without email passes if email is optional.
  - Notes:

- [ ] Replace MVP migration chain with clean V3 baseline schema when practical.
  - Done when: fresh V3 database setup does not require unsupported MVP compatibility migrations.
  - Verify: fresh migration run succeeds.
  - Notes: Decision made: V3 is a replacement deployment, so remove MVP migration/code compatibility now. Do not delete or alter the existing Cloudflare MVP site/database for `learn.billplustara.com`.

- [ ] Remove prior-MVP database compatibility code.
  - Done when: code only needed to upgrade old MVP database versions is gone or documented as still supported.
  - Verify: dead-code audit completed.
  - Notes:

- [ ] Remove hardcoded family fixtures from code.
  - Done when: runtime code has no unsupported dependency on `bill`, `reagan`, or `ada`.
  - Verify: `rg "bill|reagan|ada" src scripts tests docs` reviewed and remaining matches are intentional.
  - Notes:

- [ ] Remove tests that rely on MVP users or slugs.
  - Done when: tests use dynamic setup/children or explicit local fixtures unrelated to MVP family data.
  - Verify: `npm test`.
  - Notes:

- [ ] Remove docs and assets that describe `learn.billplustara.com` as the product destination.
  - Done when: public docs and brand assets use `buddyblocks.billerickson.net` except when explicitly documenting the old private deployment.
  - Verify: `rg "learn\\.billplustara\\.com|buddyblocks\\.billerickson\\.net" docs public src`.
  - Notes:

- [ ] Audit unsupported MVP features.
  - Done when: dead MVP code is deleted or explicitly documented as still supported.
  - Verify: audit notes captured here.
  - Notes:

- [ ] Keep future hosted SaaS compatibility visible.
  - Done when: shared curriculum remains global and family-owned table changes do not block future `family_id` or `tenant_id` scoping.
  - Verify: data model review references `docs/hosted-saas-plan.md`.
  - Notes:

## Phase 10: Deployment And Public Self-Hosted Docs

- [ ] Update public self-hosted setup docs.
  - Done when: docs cover environment setup, D1 creation, migrations, curriculum seed, deploy, custom domain setup, first-run onboarding, and smoke testing.
  - Verify: docs review against V3 deployment requirements.
  - Notes:

- [ ] Cite current official Cloudflare references where required.
  - Done when: Workers, D1 migrations, static assets, custom domains, and D1 limits docs cite current official references.
  - Verify: links checked during docs update.
  - Notes:

- [ ] Configure deployment target for `buddyblocks.billerickson.net`.
  - Done when: V3 docs/config use the new public deployment target.
  - Verify: deployment config/docs review.
  - Notes:

- [ ] Keep `learn.billplustara.com` live during V3 testing.
  - Done when: old MVP deployment is not retired until V3 production smoke testing passes.
  - Verify: release notes or deployment checklist confirms temporary dual-site period.
  - Notes:

- [ ] Keep hosted SaaS work in `docs/hosted-saas-plan.md`.
  - Done when: V3 self-hosted docs do not absorb hosted SaaS scope beyond compatibility notes.
  - Verify: docs review.
  - Notes:

## Phase 11: Final Fresh-Database Smoke Test

- [ ] Initialize fresh V3 schema.
  - Done when: clean D1 database can be created and migrated from scratch.
  - Verify: migration command succeeds.
  - Notes:

- [ ] Seed curriculum into empty database.
  - Done when: curriculum seed succeeds with V3 catalog.
  - Verify: seed command succeeds and curriculum rows are present.
  - Notes:

- [ ] Confirm zero parents and zero children after curriculum seed.
  - Done when: fresh seeded database has no parent or child rows.
  - Verify: database query confirms zero parents and children.
  - Notes:

- [ ] Complete first-run parent setup.
  - Done when: parent can be created through onboarding and receives a session.
  - Verify: manual smoke test or browser test.
  - Notes:

- [ ] Create one or more children through onboarding.
  - Done when: children are created with display names, grade levels, stable slugs, defaults, and initialized progress.
  - Verify: manual smoke test or browser test.
  - Notes:

- [ ] Complete a lesson as a child.
  - Done when: child can select profile, play a lesson, answer questions, see retry hints when appropriate, and save progress.
  - Verify: manual smoke test or browser test.
  - Notes:

- [ ] Archive and unarchive a child.
  - Done when: archived child is hidden/blocked, unarchived child regains access, and progress is preserved.
  - Verify: manual smoke test or browser test.
  - Notes:

- [ ] Run final validation commands.
  - Done when: all required validation commands pass or deferred failures are documented with reasons.
  - Verify:
    - `npm run content:validate`
    - `npm test`
    - `npm run check`
    - `npm run build`
  - Notes:

## Test Coverage Ledger

- [ ] V3 question hints parse from fenced question blocks.
- [ ] Curriculum seed SQL stores `hint`.
- [ ] Lesson APIs return `hint`.
- [ ] Offline-pack APIs return `hint`.
- [ ] Lesson player shows hints only on retry queue items.
- [ ] Setup status works before and after parent creation.
- [ ] Duplicate parent creation is prevented after setup.
- [ ] Parent session is created during setup.
- [ ] Child create/edit/archive/unarchive flows work.
- [ ] Archived child access is blocked.
- [ ] Dynamic progress initialization works for newly created children.
- [ ] Seed script no longer creates fixed Bill/Reagan/Ada rows.
- [ ] Fresh migrations plus curriculum seed leave the database with zero parents and zero children.
- [ ] No tests require fixed MVP slugs or users such as `bill`, `reagan`, or `ada`.
- [ ] Future V3 curriculum reseeding repairs dynamic child progress without overwriting completed work.
- [ ] Authored question keys parse.
- [ ] Duplicate question keys fail validation.
- [ ] Seeded question IDs remain stable when questions are reordered.
- [ ] Author-only metadata does not leak to lesson APIs unless a deliberate metadata endpoint is added.
- [ ] Content validation fails on malformed fenced `question` YAML.
- [ ] Content validation fails on duplicate match-pair right-side labels.
- [ ] Promoted V3 curriculum excludes scored `constructed-response` and `speaking-prompt` questions unless explicitly supported.

## Resolved Decisions

- [x] Decide which V3 research directories are accepted for initial production curriculum.
  - Notes: Resolved by `research/track-status.json`. Tracks marked `ready_for_import` are accepted for the initial production curriculum queue.

- [x] Decide when to replace the MVP migration chain with a clean V3 baseline.
  - Notes: Replace the MVP migration chain during V3 cleanup now. This repo can remove MVP compatibility paths, but do not delete or alter the existing Cloudflare MVP site/database.

- [x] Decide whether self-hosted mode needs an explicit config flag for single-parent behavior before hosted SaaS work begins.
  - Notes: No self-hosted config flag is needed. Single-parent behavior is the default. Add a hosted/SaaS multi-parent flag later only when hosted mode is implemented.

- [x] Decide whether `questionGoal` and `misconception` should live in comments, QA artifacts, or a future non-runtime metadata path.
  - Notes: Keep them only in research/QA artifacts for V3. Do not promote them into runtime lesson files, D1 seed data, APIs, or offline packs.

## Open Blockers And Decisions

No planning blockers are currently identified.
