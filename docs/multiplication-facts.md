# Multiplication Facts Lab

Facts Lab is a grade-independent multiplication practice area at `/kid/:childSlug/facts/`. Students can select any combination of the 1s through 12s, including a single table, and use either untimed practice or a 60/120-second test.

## Practice behavior

- Endless Practice continues until the student chooses Finish.
- Missed facts are placed back into the deck after three other questions.
- Adaptive decks weight new, inaccurate, and not-yet-fluent facts more heavily.
- Time Test records personal bests separately for table selection, duration, and actual input method.
- XP begins at 10 answered facts so very short sessions cannot be farmed for rewards.

## Mastery

Mastery is stored for each ordered fact from 1 × 1 through 12 × 12. A fact is fluent after at least four correct answers, an active streak of three correct answers, at least 80% lifetime accuracy, and a best keyboard response time of five seconds or less. Voice-only facts do not use speech-service latency as a fluency penalty.

Students see table-level progress and a Needs Practice preset. Parents see the complete 12 × 12 mastery grid, session totals, XP, timed bests, and recent Facts Lab activity.

## Voice answers and privacy

Voice input uses the browser's Web Speech API when available. It is tap-to-speak for one answer at a time, accepts recognition alternatives, and parses number words and common homophones from 0 through 144. The number pad remains available as a fallback.

Speech recognition may be processed by the browser vendor's online speech service. Buddy Blocks does not store audio or transcripts; it stores only the parsed numeric answer, input method, correctness, and response time. Browsers without speech recognition show the option as unavailable.

## Persistence and offline retry

The D1 tables `multiplication_sessions`, `multiplication_fact_attempts`, and `child_multiplication_mastery` store session summaries, each attempt, and mastery rollups. A completed session also updates daily activity, streak eligibility, and XP totals.

Session submissions use a client attempt ID for idempotency. When a connection fails, the app queues the complete session in IndexedDB, shows Waiting to sync, and retries through the normal offline sync workflow. Server-side scoring and selected-table validation run when the queued session reaches D1.

The Facts Lab card has the same offline download control as course cards. Saving it stores the student's current mastery overview in IndexedDB and preloads both Facts Lab page shells plus their complete same-origin Astro JavaScript, CSS, and image dependency graph. Opening Facts Lab online also prepares the same offline pack automatically. Practice and typed-answer sessions work offline; browser speech recognition may still require an internet connection.

## API

```text
GET  /api/children/:childSlug/multiplication
POST /api/children/:childSlug/multiplication/sessions
```

Both endpoints use the existing parent session and child-mode scoping rules. Facts Lab is available to active students in every grade.
