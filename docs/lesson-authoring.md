# Buddy Blocks Lesson Authoring Guide

## Where Lessons Live

The source of truth for courses, units, lessons, and questions is [src/lib/content.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/lib/content.ts).

That file exports:

- `TRACKS`: the authored curriculum tree. In the app UI, a "course" is currently called a "track".
- `CHILDREN`: the fixed v1 child profiles, `reagan` and `ada`.
- `getAllLessons()`, `getAllQuestions()`, `getLessonPaths()`, and `getTrackPaths()`: helpers used by seeding and static route generation.

At runtime, lessons are stored in D1 after seeding. The seed path is:

1. Author content in [src/lib/content.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/lib/content.ts).
2. Run [scripts/seed.ts](/Users/billerickson/Downloads/learn.billplustara.com/scripts/seed.ts), which writes tracks, units, lessons, and questions into D1.
3. The Worker reads D1 tables and serves lesson APIs to the Preact lesson player.

Do not edit generated files in `dist/` or local D1 files directly. Treat D1 as the deployed copy and `src/lib/content.ts` as the editable curriculum source.

## Current Content Shape

The hierarchy is:

```text
track/course
  unit
    lesson
      question
```

Current v1 content has:

- 3 tracks: Math, Vocabulary, Spanish
- 2 units per track
- 2 lessons per unit
- 8 questions per lesson

The database schema mirrors this structure in [migrations/0001_initial.sql](/Users/billerickson/Downloads/learn.billplustara.com/migrations/0001_initial.sql): `tracks`, `units`, `lessons`, and `questions`.

## Adding A Lesson To An Existing Course

1. Open [src/lib/content.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/lib/content.ts).
2. Find the track and unit where the lesson belongs.
3. Add a new object to that unit's `lessons` array.
4. Give it a stable `id`, a URL-safe `slug`, a kid-facing `title`, `xpBase: 10`, and 8-12 questions.

Example:

```ts
{
  id: 'lesson_math_fractions_equal_parts',
  slug: 'equal-parts',
  title: 'Equal Parts',
  xpBase: 10,
  questions: [
    mc('Which picture sentence means one half?', ['1 out of 2 parts', '1 out of 3 parts', '2 out of 3 parts', '3 out of 4 parts'], '1 out of 2 parts'),
    text('Type the denominator in 1/4.', ['4'], 'number'),
    fill('A fraction has equal', '.', ['parts', 'colors', 'stories', 'letters'], 'parts'),
    match('Match each fraction word.', [
      { left: 'half', right: '1/2' },
      { left: 'third', right: '1/3' },
      { left: 'fourth', right: '1/4' },
    ]),
    order('Tap the fractions from smallest to greatest.', ['1/2', '1/4', '1/3'], ['1/4', '1/3', '1/2']),
    mc('Which fraction is one whole split into two equal parts?', ['1/2', '1/5', '2/3', '3/4'], '1/2'),
    text('Type the numerator in 3/5.', ['3'], 'number'),
    fill('The top number of a fraction is the', '.', ['numerator', 'denominator', 'sum', 'product'], 'numerator'),
  ],
}
```

Keep lesson IDs stable after seeding. A changed `id` looks like a brand-new lesson to D1 and can orphan old progress.

## Adding A New Course

In the current codebase, a course is a `TrackFixture`.

1. Add a new object to the top-level `TRACKS` array in [src/lib/content.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/lib/content.ts).
2. Include at least one unit and one lesson so each child has an available starting point.
3. Pick `color` and `accent` values from the Buddy Blocks palette or brand guide.
4. Update `TrackFixture.slug` near the top of [src/lib/content.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/lib/content.ts). It currently restricts slugs to `'math' | 'vocabulary' | 'spanish'` for v1.
5. Update [tests/content.test.ts](/Users/billerickson/Downloads/learn.billplustara.com/tests/content.test.ts), because it currently asserts the fixed v1 shape.

Example track shell:

```ts
{
  id: 'track_science',
  slug: 'science',
  title: 'Science',
  description: 'Build observation, nature, and experiment skills.',
  color: '#18bca4',
  accent: '#ffd84d',
  units: [
    {
      id: 'unit_science_observation',
      slug: 'observation',
      title: 'Observation',
      description: 'Notice details and compare what changed.',
      lessons: [
        {
          id: 'lesson_science_observation_senses',
          slug: 'senses',
          title: 'Use Your Senses',
          xpBase: 10,
          questions: [
            // 8-12 questions here
          ],
        },
      ],
    },
  ],
}
```

## Question Types

Use the helper functions at the top of [src/lib/content.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/lib/content.ts). They keep question payloads aligned with [src/lib/lesson-engine.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/lib/lesson-engine.ts).

### Multiple Choice

```ts
mc('What is 7 + 5?', ['10', '11', '12', '13'], '12', 'Optional explanation.')
```

- `choices` should include the correct answer.
- Keep choices short enough for iPad buttons.

### Text Input

```ts
text('Type the answer: 9 + 4', ['13'], 'number')
text('Type a word that means "fast".', ['quick', 'speedy', 'rapid'], 'text')
```

- Number answers compare numerically.
- Text answers ignore case and repeated spaces.
- Include reasonable accepted synonyms when the curriculum allows them.

### Fill Blank

```ts
fill('6 +', '= 10', ['2', '3', '4', '5'], '4')
```

- The UI displays `sentenceBefore ___ sentenceAfter`.
- Keep choices concise.

### Match Pairs

```ts
match('Match each story to its total.', [
  { left: '2 + 8', right: '10' },
  { left: '5 + 7', right: '12' },
  { left: '9 + 6', right: '15' },
])
```

- The right column is shuffled by the lesson player.
- Matched pairs are shown visually after selection.
- Avoid duplicate `left` values within one question.

### Order Items

```ts
order('Tap the totals from smallest to greatest.', ['9 + 5', '6 + 6', '7 + 8'], ['6 + 6', '9 + 5', '7 + 8'])
```

- `items` are the tappable choices.
- `correctOrder` is the exact target sequence.
- Avoid duplicate item labels unless the engine is updated to track unique IDs per item.

## Seeding And Testing Locally

After changing content:

```bash
npm run test
npm run build
npm run db:seed:local
npm run dev:worker
```

Then open the local Worker URL, usually `http://localhost:8787`.

If you need to wipe local progress and start from fresh seed data:

```bash
npm run db:reset:local
```

Use reset carefully. It deletes local parents, child profiles, lesson attempts, progress, tracks, units, lessons, and questions before reseeding.

For remote Cloudflare D1, seed without resetting progress:

```bash
BUDDY_BLOCKS_PARENT_PASSWORD='your-parent-password' npm run db:seed:remote
```

The seed script upserts authored tracks, units, lessons, and questions. It inserts missing child progress rows, but it does not overwrite existing lesson completion rows.

## Curriculum Intake Workflow

When turning school curriculum into Buddy Blocks content, use this shape:

1. Convert each broad subject into a track/course.
2. Convert each school topic or standard cluster into a unit.
3. Convert each weekly skill into one or more lessons.
4. Keep each lesson focused on one skill and 8-12 questions.
5. Mix question types so lessons do not feel repetitive.
6. Use explanations for questions where a wrong answer is likely to teach a misconception.
7. Prefer kid-facing wording over standard/teacher wording in prompts.

Good lesson prompts should be short, concrete, and easy to read aloud. For math, include a mix of symbolic facts and story problems. For vocabulary or language, include both recognition and production questions. For Spanish, include accepted answers with and without accents only if the curriculum expects typing accents inconsistently.

## Authoring Checklist

Before shipping a content change:

- IDs are stable, lowercase, and descriptive.
- Slugs are URL-safe.
- Every lesson has 8-12 questions.
- Every multiple-choice and fill-blank correct answer appears in choices.
- Text-input accepted answers include expected variants.
- Match-pair and order-item labels are visually distinct.
- `npm run test` passes.
- `npm run build` passes.
- The lesson is manually playable on an iPad-sized viewport.
