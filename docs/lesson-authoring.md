# Buddy Blocks Lesson Authoring Guide

## Where Lessons Live

The editable curriculum source is [src/content/curriculum](/Users/billerickson/Downloads/learn.billplustara.com/src/content/curriculum).

[src/lib/content.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/lib/content.ts) is now a typed loader. It reads the file tree, validates YAML frontmatter, and exports the same normalized `TRACKS`, `getAllLessons()`, `getAllQuestions()`, `getLessonPaths()`, and `getTrackPaths()` helpers used by seeding and static route generation.

At runtime, lessons still live in D1 after seeding:

1. Author content in [src/content/curriculum](/Users/billerickson/Downloads/learn.billplustara.com/src/content/curriculum).
2. Run [scripts/seed.ts](/Users/billerickson/Downloads/learn.billplustara.com/scripts/seed.ts), which writes tracks, units, lessons, and questions into D1.
3. The Worker reads D1 tables and serves lesson APIs to the Preact lesson player.

Do not edit generated files in `dist/` or local D1 files directly. Treat D1 as the deployed copy and `src/content/curriculum` as the curriculum source of truth.

## Folder Shape

Use grade folders, ordered track folders, ordered unit folders, and one Markdown file per lesson:

```text
src/content/curriculum/
  grade-03/
    01-math/
      track.yaml
      01-addition-basics/
        unit.yaml
        01-make-ten.md
        02-word-stacks.md
      03-mad-minute/
        unit.yaml
        01-2s.md
        12-mixed.md
  grade-06/
    01-math/
    02-vocabulary/
    03-spanish/
```

The numeric prefixes control display order. The app uses the `slug` values inside YAML for URLs, not the folder/file prefix.

Current v1 profiles:

- Ada is Grade 3 and sees `grade-03`.
- Reagan is Grade 6 and sees `grade-06`.

## Track Files

Each track folder needs a `track.yaml`:

```yaml
id: track_grade6_math
slug: grade-6-math
subject: math
title: Math
description: Practice Grade 6 ratios, rates, expressions, equations, and fact fluency.
color: "#5b79ff"
accent: "#ffd84d"
```

`subject` drives icons and subject badges. Existing subjects are `math`, `vocabulary`, and `spanish`, but the loader accepts new subject keys for future tracks.

## Unit Files

Each unit folder needs a `unit.yaml`:

```yaml
id: unit_grade6_math_ratios_rates
slug: ratios-rates
title: Ratios And Rates
description: Compare quantities, build tables, and find unit rates.
```

## Standard Lesson Files

Each standard lesson is a Markdown file with YAML frontmatter:

```md
---
id: lesson_grade3_math_fractions_equal_parts
slug: equal-parts
title: Equal Parts
xpBase: 10
questions:
  - type: multiple-choice
    prompt: Which picture sentence means one half?
    choices:
      - 1 out of 2 parts
      - 1 out of 3 parts
      - 2 out of 3 parts
      - 3 out of 4 parts
    correctAnswer: 1 out of 2 parts
  - type: text-input
    prompt: Type the denominator in 1/4.
    acceptedAnswers:
      - "4"
    answerType: number
---
```

Keep lesson IDs stable after seeding. A changed `id` looks like a brand-new lesson to D1 and can orphan old progress.

## Mad Minute Files

Mad Minute lessons use `kind: mad-minute` and do not author fixed questions. The lesson player generates multiplication facts from `config`.

```md
---
id: lesson_grade3_math_mad_minute_6s
slug: 6s
title: 6s Facts
xpBase: 10
kind: mad-minute
config:
  mode: multiplication
  factor: 6
  minFactor: 2
  maxFactor: 12
  minMultiplier: 1
  maxMultiplier: 12
  durationSeconds: 60
  goalCorrect: 40
questions: []
---
```

For a mixed fact lesson, set `factor: mixed` and use `minFactor`/`maxFactor` to control the factor range. The Worker scores Mad Minute submissions server-side and saves `best_score_correct` as the child's record.

## Question Types

### Multiple Choice

```yaml
- type: multiple-choice
  prompt: What is 7 + 5?
  choices:
    - "10"
    - "11"
    - "12"
    - "13"
  correctAnswer: "12"
  explanation: 7 + 5 is the same as 7 + 3 + 2.
```

### Text Input

```yaml
- type: text-input
  prompt: Type a word that means fast.
  acceptedAnswers:
    - quick
    - speedy
    - rapid
  answerType: text
```

Use `answerType: number` for numeric answers. Quote numeric answers, such as `"13"`, so YAML keeps them as strings.

### Fill Blank

```yaml
- type: fill-blank
  prompt: 6 + ___ = 10
  sentenceBefore: 6 +
  sentenceAfter: = 10
  choices:
    - "2"
    - "3"
    - "4"
    - "5"
  correctAnswer: "4"
```

### Match Pairs

```yaml
- type: match-pairs
  prompt: Match each story to its total.
  pairs:
    - left: 2 + 8
      right: "10"
    - left: 5 + 7
      right: "12"
    - left: 9 + 6
      right: "15"
```

### Order Items

```yaml
- type: order-items
  prompt: Tap the totals from smallest to greatest.
  items:
    - 9 + 5
    - 6 + 6
    - 7 + 8
  correctOrder:
    - 6 + 6
    - 9 + 5
    - 7 + 8
```

## Adding Content

To add a lesson:

1. Choose the grade folder, track folder, and unit folder.
2. Add the next numbered Markdown file, such as `03-equal-parts.md`.
3. Use a stable grade-scoped lesson `id`, a URL-safe `slug`, a kid-facing `title`, `xpBase: 10`, and 8-12 questions.
4. Run `npm run test` and `npm run build`.
5. Run `npm run db:seed:local` before checking the local Worker.

To add a new track:

1. Add the next numbered track folder under the grade, such as `04-science`.
2. Add `track.yaml`.
3. Add at least one unit folder with `unit.yaml`.
4. Add at least one available lesson so the child has a starting point.
5. Update tests if the expected v1 shape changes.

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

For remote Cloudflare D1, seed without resetting progress:

```bash
BUDDY_BLOCKS_PARENT_PASSWORD='your-parent-password' npm run db:seed:remote
```

The seed script upserts authored tracks, units, lessons, and questions. It inserts missing child progress rows, but it does not overwrite existing lesson completion rows.

## Curriculum Intake Workflow

When turning school curriculum into Buddy Blocks content:

1. Convert each broad subject into a track.
2. Convert each topic or standard cluster into a unit.
3. Convert each weekly skill into one or more lessons.
4. Keep each lesson focused on one skill and 8-12 questions.
5. Mix question types so lessons do not feel repetitive.
6. Use explanations where a wrong answer is likely to teach a misconception.
7. Prefer kid-facing wording over standard/teacher wording in prompts.

## Authoring Checklist

- IDs are stable, lowercase, and descriptive.
- Slugs are URL-safe.
- Folder and file prefixes reflect the intended order.
- Every standard lesson has 8-12 questions.
- Every multiple-choice and fill-blank correct answer appears in choices.
- Text-input accepted answers include expected variants.
- Match-pair and order-item labels are visually distinct.
- `npm run test` passes.
- `npm run build` passes.
- The lesson is manually playable on an iPad-sized viewport.
