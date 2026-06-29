# Buddy Blocks MVP Spec

## Goal Prompt

Build Buddy Blocks, an MVP web app for kids to use on iPads that feels similar to Duolingo, with separate learning tracks for Math, Vocabulary, and Spanish. The app should be installable as a PWA, support multiple child profiles under one parent account, and include short lesson sessions, XP, streaks, progress tracking, and mistake review.

The first version should be useful for a family, not a public marketplace product. Prioritize a polished, reliable, iPad-friendly learning loop over broad content volume.

For v1, identity is intentionally fixed and simple:

- Parent account: `bill`
- Child accounts/profiles: `reagan` and `ada`

Do not build self-serve onboarding in v1. Seed these accounts/profiles and focus the product work on the learning loop, progress persistence, and parent dashboard.

Buddy Blocks will live at learn.billplustara.com

## Target Users

- Children using iPads in Safari or as an installed PWA.
- A parent who reviews progress and optionally assigns focus tracks.

## Product Principles

- The first screen after choosing a child should be the learning experience, not marketing.
- Lessons should be short, visual, and touch-friendly.
- Kids should always know what to do next.
- Use reward mechanics to encourage practice, but do not make the UI cluttered.
- Parent controls should be simple and separate from the kid experience.
- Avoid collecting unnecessary personal information about children.

## Recommended Stack

Use the stack that best fits the existing repository if one exists. If starting from scratch, use:

- Astro
- TypeScript
- Tailwind CSS
- React or Preact islands for the interactive lesson player
- Cloudflare Workers runtime
- Cloudflare D1 for relational data
- Custom Cloudflare Worker auth gate, modeled after the Cultivate Arc project
- Wrangler for local D1 migrations, preview, and deployment
- PWA support with manifest and service worker
- Zod for validation where useful

The preferred architecture is a static Astro app fronted by a Cloudflare Worker. The Worker should handle login, logout, session validation, protected route checks, parent-only API routes, child/profile/progress API routes, and D1 access. Astro should own layouts, static pages, styling, and hydrated islands. Interactive lesson state should live in React or Preact islands and persist through Worker API endpoints.

If Cloudflare credentials are not available during local implementation, implement the app against local D1 through Wrangler where possible. If Wrangler/D1 is unavailable, keep the data access layer isolated and provide a local seed/mock data path so the UI and learning loop can still be built and tested immediately.

## Auth And Runtime Architecture

Use the same general pattern as Cultivate Arc:

- Astro builds the public app shell and route pages.
- Cloudflare Worker runs before protected routes and API routes.
- D1 stores parent accounts, password hashes, sessions, child profiles, lessons, attempts, progress, and daily activity.
- Login posts to `/login/`.
- The Worker validates the parent email/password against D1.
- Passwords are hashed with PBKDF2 and per-user salt using Web Crypto in the Worker.
- Successful login creates a random session ID, stores it in D1, and sets an `HttpOnly; Secure; SameSite=Lax` session cookie.
- Logout deletes the D1 session and clears the cookie.
- Protected kid and parent routes redirect to `/login/` when unauthenticated.
- Parent-only API routes require an authenticated parent session and same-origin mutation checks.
- No public signup is required in MVP. The parent and child profiles should be seeded as fixed v1 users: parent `bill`, children `reagan` and `ada`.

Recommended protected route groups:

- `/profiles`
- `/kid/*`
- `/parent`
- `/parent/*`
- `/api/*`

Recommended public route groups:

- `/login`
- `/logout`
- PWA assets
- static icons and public images

Unlike Cultivate Arc, do not rely on Worker `HTMLRewriter` as the main way to personalize the application. This app has richer client interaction, so use API endpoints plus hydrated islands for parent/profile/progress/lesson state.

Recommended API routes handled by the Worker:

- `GET /api/me`
- `GET /api/children`
- `GET /api/children/:childId/home`
- `GET /api/children/:childId/tracks/:trackSlug`
- `GET /api/children/:childId/lessons/:lessonId`
- `POST /api/children/:childId/lessons/:lessonId/attempts`
- `GET /api/parent/dashboard`

## MVP Feature Scope

### Included

- Parent sign in
- Child profile selection
- Seeded child profiles for `reagan` and `ada`
- Three learning tracks:
  - Math
  - Vocabulary
  - Spanish
- Track overview screen with units and progress
- Lesson player with 8-12 questions per lesson
- XP reward after each lesson
- Daily streak tracking
- Hearts or lives during lessons
- Mistake review within the same lesson
- Basic parent dashboard
- Seed content for all three tracks
- iPad-first responsive design
- PWA install metadata

### Not Included In MVP

- Public user registration flow for schools
- Self-serve parent onboarding
- Create/edit child profiles
- Payments
- Classrooms
- Leaderboards
- AI-generated lessons
- Full offline mode
- Email reports
- Voice recognition
- Native iOS app
- Complex adaptive learning engine

## Core User Flows

### Parent Sign In

1. Parent opens the app.
2. Parent signs in as `bill`.
3. App redirects to the child profile selector.
4. The profile selector shows the two seeded child profiles: `reagan` and `ada`.

### Child Profile Selection

1. App displays child profiles as large avatar buttons.
2. Child selects `reagan` or `ada`.
3. App opens the child home screen.
4. Parent area remains accessible through a protected parent button or PIN-style gate.

### Child Home

The child home screen should show:

- Current child name/avatar
- XP total
- Current streak
- Hearts/lives
- Three track cards:
  - Math
  - Vocabulary
  - Spanish
- Recommended next lesson
- Recent badge or progress celebration

Primary action should be obvious: continue the next recommended lesson.

### Track Overview

Each track has:

- Units arranged in a simple path or list
- Locked, available, and completed lesson states
- Unit titles
- Lesson progress
- A clear Continue button

MVP can use linear progression per track.

### Lesson Session

1. Child starts a lesson.
2. Lesson presents 8-12 questions.
3. Child answers each question.
4. App gives immediate feedback.
5. Incorrect answers are saved for repeat review later in the same session.
6. Lesson ends when all regular questions and review questions are complete.
7. Completion screen shows:
   - XP earned
   - Correct answer count
   - Streak status
   - Progress unlocked
8. Child can continue to the next lesson or return home.

## Tracks And Content

### Math Track

Initial units:

1. Addition Basics
2. Subtraction Basics
3. Multiplication Basics
4. Division Basics
5. Fractions Intro

MVP question types:

- Multiple choice numeric answer
- Type numeric answer
- Order numbers
- Simple word problem

Sample questions:

- What is 7 + 5?
- What is 14 - 6?
- Which number is greatest?
- Mia has 3 bags with 4 apples each. How many apples does she have?

### Vocabulary Track

Initial units:

1. Word Meanings
2. Synonyms
3. Antonyms
4. Spelling
5. Fill In The Sentence

MVP question types:

- Choose the definition
- Choose the synonym
- Choose the antonym
- Fill in the blank
- Spell the word

Sample questions:

- What does "enormous" mean?
- Which word means the same as "quick"?
- Which word means the opposite of "ancient"?
- The puppy was very ____ after running outside.

### Spanish Track

Initial units:

1. Greetings
2. Colors
3. Animals
4. Food
5. Family

MVP question types:

- English to Spanish multiple choice
- Spanish to English multiple choice
- Match pairs
- Build simple phrase from word tiles
- Fill in missing word

Sample questions:

- What does "hola" mean?
- Which word means "red"?
- Match "perro" to its English meaning.
- Build the phrase "I like apples."

## Exercise Types

Implement a generic lesson engine that can render different exercise types from structured question data.

### Multiple Choice

Fields:

- prompt
- choices
- correctAnswer
- explanation optional

Behavior:

- Large touch targets
- One answer selectable
- Submit or immediate answer behavior is acceptable, but be consistent
- Correct state and incorrect state after answer

### Text Input

Fields:

- prompt
- acceptedAnswers
- answerType: text or number
- explanation optional

Behavior:

- Normalize case and whitespace
- For number answers, compare numeric value
- Keep keyboard-friendly layout for iPad

### Match Pairs

Fields:

- prompt
- pairs: left/right values

Behavior:

- Child taps one item from each column
- Correct pairs lock in place
- Incorrect pair briefly shows feedback and resets

### Order Items

Fields:

- prompt
- items
- correctOrder

Behavior:

- Touch-friendly reordering or tap-to-build answer
- MVP may implement tap-to-build because it is simpler on iPad

### Fill Blank

Fields:

- sentenceBefore
- sentenceAfter
- choices or acceptedAnswers

Behavior:

- Can be rendered as multiple choice for MVP

## Gamification

### XP

- Each completed lesson awards base XP.
- Suggested scoring:
  - 10 XP for lesson completion
  - 1 bonus XP per correct first attempt
  - 5 bonus XP for perfect lesson

### Streaks

- Track daily activity per child.
- Completing at least one lesson on a calendar day counts for streak.
- Show current streak on child home and completion screen.
- Use local timezone.

### Hearts

- Child starts lesson with 5 hearts.
- Each incorrect answer loses 1 heart.
- If hearts reach 0, allow the child to finish the current lesson in MVP rather than hard-blocking. Show "practice mode" styling or reduced XP.

### Badges

MVP badges:

- First Lesson
- Three Day Streak
- Math Starter
- Word Explorer
- Spanish Starter
- Perfect Lesson

Badges can be computed from progress rather than stored as complex entities if simpler.

## Parent Dashboard

Parent dashboard should include:

- Child profile list
- Per-child XP total
- Current streak
- Lessons completed by track
- Recent activity
- Track progress summaries
- Basic profile edit

MVP does not need detailed analytics charts. Use compact progress cards or tables.

## Data Model

Design the schema around reusable structured content.

### parents

- id
- username
- email
- password_hash
- password_salt
- status: active, archived
- created_at
- updated_at

### sessions

- id
- parent_id
- expires_at
- created_at

### child_profiles

- id
- parent_id
- slug: reagan or ada
- display_name
- avatar_key
- level_band optional
- created_at
- updated_at

### tracks

- id
- slug
- title
- description
- sort_order

Seed values:

- math
- vocabulary
- spanish

### units

- id
- track_id
- slug
- title
- description
- sort_order

### lessons

- id
- unit_id
- slug
- title
- sort_order
- xp_base

### questions

- id
- lesson_id
- type
- prompt
- payload_json
- explanation
- sort_order

`payload_json` should contain the shape needed for each exercise type.

### lesson_attempts

- id
- child_profile_id
- lesson_id
- started_at
- completed_at
- score_correct
- score_total
- xp_awarded
- hearts_remaining

### question_attempts

- id
- lesson_attempt_id
- question_id
- is_correct
- answer_json
- attempted_at

### child_lesson_progress

- id
- child_profile_id
- lesson_id
- status: locked, available, completed
- completed_at
- best_score_correct
- best_score_total

### child_track_progress

- id
- child_profile_id
- track_id
- current_unit_id
- current_lesson_id
- lessons_completed
- xp_total
- updated_at

### child_daily_activity

- id
- child_profile_id
- activity_date
- lessons_completed
- xp_earned

## Seed Content Requirement

Create enough seed content for the MVP to feel real:

- 3 tracks
- 5 units per track
- 2 lessons per unit
- 8 questions per lesson

That totals:

- 15 units
- 30 lessons
- 240 questions

If that content volume is too much for the first implementation pass, create the schema and seed:

- 3 tracks
- 2 units per track
- 2 lessons per unit
- 8 questions per lesson

Then leave a clear script or fixture pattern for expanding content.

Also provide scripts for local setup:

- Run D1 migrations locally
- Seed tracks, units, lessons, and questions
- Seed parent account `bill`
- Seed child profiles `reagan` and `ada`
- Reset local development data if needed

For v1, hard-code or seed only these identities. Do not build UI for adding more parents or children unless the rest of the MVP is complete.

## UI Requirements

### Visual Style

- Kid-friendly but not childish in a cluttered way
- Bright, varied palette across tracks
- Large touch targets
- Clear progress states
- Rounded cards are acceptable, but keep them purposeful and not nested
- Avoid tiny controls
- Avoid text-heavy instructions
- Use icons where they clarify actions

### iPad Layout

Support:

- iPad portrait
- iPad landscape
- Desktop browser
- Mobile browser as a secondary target

Touch targets should generally be at least 44px.

### Navigation

Primary routes:

- `/`
- `/login`
- `/profiles`
- `/kid/[childId]`
- `/kid/[childId]/track/[trackSlug]`
- `/kid/[childId]/lesson/[lessonId]`
- `/kid/[childId]/lesson/[lessonId]/complete`
- `/parent`
- `/parent/children/[childId]`

Use route protection so kid routes require a signed-in parent account and a valid child profile.

In Astro, bracket route syntax may be implemented as file-based dynamic routes such as `src/pages/kid/[childId]/index.astro`, with the Worker handling auth and data APIs.

## Accessibility

- Keyboard navigation for core flows
- Sufficient color contrast
- Do not rely on color alone for correct/incorrect feedback
- Button labels should be clear
- Form inputs need labels
- Feedback should be visible and readable

## PWA Requirements

- Web app manifest
- App icon placeholders
- Theme color
- iPad-friendly viewport settings
- Installable from Safari home screen as much as iOS allows
- Basic service worker or Astro-compatible PWA integration

Full offline lesson sync is not required in MVP.

## Implementation Milestones

### Milestone 1: App Foundation

- Create Astro app if needed
- Add TypeScript, Tailwind, linting/checking
- Add React or Preact integration for interactive islands
- Add Cloudflare Worker entrypoint
- Add Wrangler config
- Add shared layout
- Add theme tokens
- Add PWA manifest
- Create seed/mock data path

Acceptance:

- App runs locally
- Home/login/profile routes render
- Worker can serve static Astro assets
- Styling system is in place

### Milestone 2: Data And Auth

- Add D1 migrations
- Add parent auth using PBKDF2 password hashes and D1-backed sessions
- Add secure session cookie helpers
- Add login/logout routes in the Worker
- Add seed script for parent `bill`
- Add seed script for child profiles `reagan` and `ada`
- Add seed data for tracks, units, lessons, questions

Acceptance:

- Parent can sign in locally as `bill`
- Session persists with an HTTP-only cookie
- Logout clears the session
- Parent can select `reagan` or `ada`
- `reagan` and `ada` have independent progress
- Seed tracks appear for selected child

### Milestone 3: Kid Home And Track Progress

- Build child home
- Build track overview
- Implement lesson availability and completion state
- Show XP and streak summary

Acceptance:

- Child can pick Math, Vocabulary, or Spanish
- Track progress persists
- Completed lessons are visibly marked

### Milestone 4: Lesson Engine

- Implement generic lesson player
- Implement multiple choice
- Implement text input
- Implement match pairs
- Implement order/tap-to-build
- Implement fill blank
- Add immediate feedback
- Add hearts
- Add repeat missed questions

Acceptance:

- Child can complete a lesson end to end
- Incorrect questions reappear before completion
- XP and progress are awarded after completion

### Milestone 5: Parent Dashboard

- Add parent overview
- Show child progress by track
- Show recent lesson attempts
- Show separate summaries for `reagan` and `ada`

Acceptance:

- Parent can see each child’s progress
- Parent can identify what each child practiced recently

### Milestone 6: Polish And Verification

- Improve iPad portrait and landscape layouts
- Add loading and empty states
- Add badge display
- Verify accessibility basics
- Run tests/build
- Manually test lesson flows

Acceptance:

- App is usable on iPad-sized viewport
- No obvious layout overlap
- Build passes
- Core flows verified manually

## Testing Requirements

Add tests where they provide practical coverage:

- XP calculation
- Streak calculation
- Answer validation
- Lesson completion logic
- Progress unlock logic
- Question payload parsing

Manual verification should cover:

- Sign in as `bill`
- Select child
- Confirm `reagan` and `ada` have separate progress
- Complete one lesson in each track
- Answer questions correctly and incorrectly
- Confirm missed questions repeat
- Confirm XP/streak/progress update
- View parent dashboard

## Suggested Acceptance Criteria For MVP

The MVP is complete when:

- Parent `bill` can sign in.
- Seeded child profiles `reagan` and `ada` are available.
- Each child has independent progress.
- A child can complete lessons in Math, Vocabulary, and Spanish.
- Lessons include at least three distinct exercise types.
- Incorrect answers are reviewed before lesson completion.
- XP, streaks, hearts, and lesson completion are visible and persist.
- Parent dashboard shows useful per-child progress.
- App works well at iPad portrait and landscape dimensions.
- The production build succeeds.

## Design Notes

Use the Buddy Blocks brand guide in `/brand` as the visual foundation. The app should feel tactile, colorful, and character driven, with Moxie as the block mascot and a playful building metaphor for lessons, XP, streaks, and progress.

Use track-specific visual identities:

- Math: energetic blue/green with number and shape motifs
- Vocabulary: warm yellow/red with book or word motifs
- Spanish: coral/teal with conversational motifs

Do not make Buddy Blocks monochrome or dominated by one color family. Use a restrained base UI with brighter track accents.

## Engineering Notes

- Keep lesson content data-driven.
- Avoid hardcoding question behavior per lesson.
- Use a discriminated union in TypeScript for question payloads.
- Keep scoring and progress calculations in pure functions so they are easy to test.
- Keep parent-only and child-facing screens visually distinct.
- Keep Worker route handlers small and delegate database/scoring/progress logic to testable modules.
- Keep the D1 schema in migrations.
- Use prepared statements for all D1 queries.
- Keep auth helpers separate from route handlers.
- Create a local seed script rather than requiring manual database edits.
- Avoid storing child email addresses or other unnecessary child personal data.

## Initial Codex Build Instruction

When using this with `/goal`, use this objective:

```text
Build Buddy Blocks using this MVP spec. Start by inspecting the workspace and choosing the simplest stack consistent with the spec. If no app exists, create an Astro TypeScript Tailwind PWA deployed through Cloudflare Workers. Use D1 migrations for data, a custom Worker auth gate modeled after the Cultivate Arc project, HTTP-only D1-backed sessions, seed scripts, fixed v1 parent account `bill`, fixed child profiles `reagan` and `ada`, three tracks, a reusable lesson engine, XP/streak/hearts/progress persistence, Buddy Blocks branding from `/brand`, and a parent dashboard. Do not build self-serve onboarding or child profile creation in v1. Use React or Preact islands for the interactive lesson player. Verify with build/tests and a manual iPad-sized browser check.
```
