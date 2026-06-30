# Offline Mode Plan

## Goal

Add a kid-focused offline mode that lets a child complete a small set of cached, currently available lessons without internet access, then sync those completions back to the Cloudflare Worker/D1 backend once connectivity returns.

Offline mode should work in a normal browser tab after the app has been loaded online at least once. Installing the app as a PWA should remain recommended for the best iPad experience, but it should not be required for the core offline lesson flow.

## Current State

- The app is an Astro + Preact frontend served through a Cloudflare Worker with D1 persistence.
- `public/service-worker.js` already exists, but it only caches static assets such as `/_astro/*`, icons, and the web manifest.
- `src/layouts/AppLayout.astro` registers the service worker for all app pages.
- Kid-facing data flows through centralized `fetchApi()` in `src/components/islands/api.ts`.
- Kid routes use generic static shells:
  - `/kid/shell/`
  - `/kid/track-shell/`
  - `/kid/lesson-shell/`
- The Worker maps real kid URLs onto those shells in `kidShellAssetPath()`, which is useful for offline navigation.
- Lesson reads are API GETs:
  - `/api/children/:child/home`
  - `/api/children/:child/tracks/:track`
  - `/api/children/:child/lessons/:lesson`
- Lesson completions are API POSTs:
  - `/api/children/:child/lessons/:lesson`
- Completion currently mutates D1 immediately: attempts, progress, XP, streaks, hearts, daily activity, and next-lesson unlocks.

## Product Scope

### Include

- A visible offline status indicator for kid pages.
- A way to cache a small lesson pack while online.
- Cached access to the child dashboard, relevant track views, and selected lesson screens.
- Offline play for cached standard lessons, Mad Minute lessons, and practice-set lessons when their lesson JSON is cached.
- A durable queue of completed offline lesson attempts.
- Automatic sync when the app comes back online.
- Clear UI states for:
  - cached and ready offline
  - saved offline and waiting to sync
  - syncing
  - synced
  - sync failed and will retry

### Exclude For First Pass

- Offline login.
- Offline parent dashboard.
- Offline creation or editing of practice sets.
- Caching the full curriculum.
- Cross-device conflict resolution beyond idempotent server submission and normal server-authoritative reconciliation.
- Depending on Background Sync as the only sync path, because iOS/Safari support is not reliable enough.

## Recommended Architecture

### 1. Offline Storage

Add a small client-side offline data layer, likely under `src/components/islands/offline/` or `src/lib/offline/`.

Use IndexedDB for structured data:

- `apiResponses`
  - key: request path
  - value: JSON response, savedAt, childSlug, type
- `lessonPacks`
  - key: childSlug
  - value: cached lesson IDs, track slugs, savedAt, version
- `pendingCompletions`
  - key: clientAttemptId
  - value: childSlug, lessonId, startedAt, attempts, lessonKind, createdAt, status, retryCount, lastError
- `syncEvents`
  - optional short history for debugging and UI display

Use Cache Storage for static and document assets:

- app shell routes
- generated Astro assets
- manifest and icons
- any future media assets used by lessons

### 2. Service Worker Strategy

Expand `public/service-worker.js` beyond static asset caching.

Recommended strategies:

- Static assets: stale-while-revalidate.
- Kid shell documents: cache-first with network refresh.
- API GETs for kid routes: network-first, cached fallback.
- API POSTs: let the app handle queueing in IndexedDB rather than hiding queued writes inside the service worker.

Cache these shell/document routes:

- `/profiles/`
- `/kid/shell/`
- `/kid/track-shell/`
- `/kid/lesson-shell/`
- real visited kid URLs when fetched online, if practical

For API GETs, only cache authenticated child-safe endpoints:

- `/api/children`
- `/api/children/:child/home`
- `/api/children/:child/tracks/:track`
- `/api/children/:child/lessons/:lesson`

Do not cache parent APIs by default.

### 3. Lesson Pack Creation

Add an explicit "Save offline" control on kid pages.

Current track-pack behavior:

- From the kid dashboard, each track card has its own icon-only "Save Offline" action.
- Saving a track calls `/api/children/:child/tracks/:track/offline-pack`.
- That intentional API path returns every lesson payload in the selected track, including lessons that are currently locked in the normal lesson flow.
- The client stores each lesson under its normal `/api/children/:child/lessons/:lesson` cache key so the existing lesson page can open it offline.
- The dashboard icon switches to the completed state only after all lesson payloads in that track are cached.
- Offline completions update cached home, track, and lesson progress locally so the next cached lesson unlocks on-device.
- Pending completions sync in creation order when connectivity returns. If one completion cannot sync, later completions wait for the next sync pass so server unlock order is preserved.

First-pass behavior:

- From the child dashboard, cache:
  - child home JSON
  - the next recommended lesson
  - the first few available incomplete lessons across visible tracks
  - relevant track JSON for those lessons
- Limit the pack to a small number, for example 3 to 5 lessons per child.
- Include only lessons that the server currently reports as available, not locked.

Possible implementation:

- Add a helper that reads `/api/children/:child/home`.
- For selected tracks, read `/api/children/:child/tracks/:track`.
- Find lessons with `status === 'available'`.
- Fetch each selected `/api/children/:child/lessons/:lesson`.
- Persist responses in IndexedDB and optionally ask the service worker to cache the matching route shells.

### 4. Offline Reads

Update the API client layer so kid-facing GETs can fall back to IndexedDB when the network fails.

Recommended shape:

- Keep `fetchApi()` as the online-first primitive.
- Add offline-aware wrappers such as:
  - `fetchKidHome()`
  - `fetchKidTrack()`
  - `fetchKidLesson()`
  - `submitLessonCompletion()`
- Convert kid components gradually to use the wrappers.

When returning cached data, include metadata so the UI can show that it is offline/cached.

### 5. Offline Completion Queue

When a cached lesson is completed offline:

- Score locally exactly as the lesson player already does.
- Save the original completion payload to `pendingCompletions`.
- Generate a stable `clientAttemptId`.
- Show a completion screen immediately with local score details.
- Mark the lesson as "completed locally, pending sync" in local IndexedDB state.

Do not try to permanently calculate server-authoritative XP, streak, hearts, or unlocks offline. Show estimated/local completion feedback, then reconcile with the server response after sync.

### 6. Server Idempotency

Before enabling queued retries, make lesson submissions idempotent.

Add `clientAttemptId` to:

- standard lesson completion payloads
- Mad Minute completion payloads
- practice-set lesson completion payloads

Persist it server-side.

Suggested schema additions:

- `lesson_attempts.client_attempt_id`
- `practice_set_attempts.client_attempt_id`
- unique index for `(child_profile_id, client_attempt_id)`

On duplicate submission:

- return the existing completion result or a normalized duplicate-safe response
- do not award XP twice
- do not increment daily activity twice
- do not insert duplicate question/card attempts

This is the most important correctness requirement in the whole offline plan.

### 7. Sync Flow

Run sync from the foreground app:

- on app load
- when `window` receives an `online` event
- when the page becomes visible
- after a successful online API call
- after a manual "Sync now" button

Optional enhancement:

- Register Background Sync when available, but treat it as a bonus path.

Sync algorithm:

1. Read pending completions from IndexedDB oldest first.
2. POST each payload with its `clientAttemptId`.
3. On success, mark the pending item as synced and store the server result.
4. Refresh affected cached API responses:
   - child home
   - current track
   - completed lesson
   - next lesson if returned
5. On transient failure, increment retry count and keep the item queued.
6. On permanent failure, mark the item as blocked and show a clear UI message.

### 8. Conflict And Reconciliation Rules

Use the server as authoritative.

Expected cases:

- If a lesson was already completed online elsewhere, the idempotent or duplicate-safe server path should avoid double rewards.
- If a lesson became locked or inaccessible before sync, keep the pending item and show a "needs internet/parent help" state.
- If a cached practice set expires before sync, still consider syncing the attempt if the child completed it while it was cached and previously visible. If the server should reject expired practice attempts, make that product decision explicit before implementation.

### 9. UI Changes

Add small, kid-friendly status surfaces:

- global online/offline pill in kid pages
- dashboard "Save offline" action
- cached lesson badges
- pending sync count
- sync status in completion screen

Keep parent-facing controls online-only in the first pass.

### 10. Security And Privacy

- Do not cache login pages as an offline login solution.
- Do not cache parent dashboard or parent APIs by default.
- Clear offline data on logout.
- Scope cached data by child slug and, if available, parent/session identity.
- Avoid storing parent credentials or sensitive session data in IndexedDB.
- Remember that lesson content and child progress will exist on-device while offline mode is enabled.

## Implementation Sequence

1. Add server idempotency for lesson and practice-set submissions.
2. Add IndexedDB helpers and unit tests around pending completion storage.
3. Expand service worker caching for shells and safe kid GET endpoints.
4. Add offline-aware kid API wrappers.
5. Add lesson pack caching from the kid dashboard.
6. Add offline status and cached/pending UI states.
7. Queue offline completions from `LessonPlayer`.
8. Add foreground sync and reconciliation.
9. Add logout cache/data cleanup.
10. Add tests and manual QA.

## Testing Plan

Automated:

- unit tests for IndexedDB wrapper behavior, using a fake IndexedDB implementation if needed
- unit tests for idempotent server completion
- Worker API tests for duplicate `clientAttemptId`
- service worker tests where practical, or integration tests around cacheable request behavior
- existing lesson engine, lesson completion, and worker API tests

Manual:

- build and run the Cloudflare Worker locally
- log in online
- open a child dashboard
- save offline lessons
- use browser devtools to simulate offline mode
- refresh the child dashboard while offline
- open a cached lesson while offline
- complete it offline
- confirm it is shown as pending sync
- restore network
- confirm the completion syncs once
- confirm XP/progress/streak/hearts update from the server
- repeat a sync request and confirm no duplicate XP or activity is awarded
- test logout clears local offline data
- test on iPad Safari or installed PWA when possible

## Browser/PWA Notes

Offline mode should work in a regular browser tab after a successful online visit because service workers and IndexedDB are browser features, not PWA-install-only features.

Installing as a PWA is still recommended for iPad use because it gives the family a stable home-screen launch experience and makes the app feel less like a web page. However, do not make installation a functional requirement for completing cached lessons offline.

Browser storage can be evicted under pressure. Keep lesson packs small and make the UI honest about what is actually cached.

## Rollout Recommendation

Ship behind a small internal feature flag or conservative UI entry point first.

Suggested first release:

- one child
- 3 cached lessons
- kid dashboard and lesson player only
- standard lessons plus Mad Minute
- practice-set lessons only if already cached from the dashboard
- parent dashboard remains online-only

After the first release is stable, expand pack controls, add better sync history, and consider parent-facing controls for managing offline packs.
