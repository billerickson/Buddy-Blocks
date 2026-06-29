# Buddy Blocks Lesson Authoring Guide

## Where Lessons Live

The editable curriculum source is [src/content/curriculum](/Users/billerickson/Downloads/learn.billplustara.com/src/content/curriculum).

[src/lib/curriculum.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/lib/curriculum.ts) is the typed curriculum loader. It reads the file tree, validates YAML frontmatter, and exports normalized `TRACKS`, `getTracksForGrade()`, `getAllLessons()`, and `getAllQuestions()` helpers used by seeding.

[src/lib/seed-family.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/lib/seed-family.ts) owns the fixed v1 parent/child fixtures and child-specific route helpers for Reagan and Ada. [src/lib/content.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/lib/content.ts) remains as a compatibility barrel only.

At runtime, lessons still live in D1 after seeding:

1. Author content in [src/content/curriculum](/Users/billerickson/Downloads/learn.billplustara.com/src/content/curriculum).
2. Run [scripts/seed.ts](/Users/billerickson/Downloads/learn.billplustara.com/scripts/seed.ts), which writes canonical curriculum into D1, then seeds the fixed v1 family/profile data.
3. The Worker reads D1 tables and serves lesson APIs to the Preact lesson player.

Do not edit generated files in `dist/` or local D1 files directly. Treat D1 as the deployed copy and `src/content/curriculum` as the curriculum source of truth.

Lesson `config` validation and runtime defaults live in [src/lib/lesson-config.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/lib/lesson-config.ts), backed by the UI-safe defaults and type guards in [src/lib/lesson-config-core.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/lib/lesson-config-core.ts). Content loading, Worker API parsing, and the lesson player all use those shared exports so authored Markdown, stored D1 JSON, and UI fallback behavior stay aligned.

Lesson submission side effects live in [src/worker/lesson-completion.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/worker/lesson-completion.ts). Standard lessons and Mad Minute lessons still score differently, but they share the same completion service for lesson attempts, progress updates, next-lesson unlocks, track XP, daily activity, hearts, and streak results.

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
```

The numeric prefixes control display order. The app uses the `slug` values inside YAML for URLs, not the folder/file prefix.

Current v1 profiles:

- Ada is Grade 3 and sees `grade-03` unless a parent overrides one subject.
- Reagan is Grade 6 overall, with Spanish overridden to Grade 3.

Parents can adjust a student's grade level per subject from the parent dashboard. If a subject is left on the default option, the app uses the student's global grade level.

The v1 enrollment model is documented in [docs/enrollment-model.md](/Users/billerickson/Downloads/learn.billplustara.com/docs/enrollment-model.md). It intentionally uses global grade plus subject overrides instead of explicit track assignment tables.

Kid app pages are generic static shells. The Worker maps authenticated dynamic URLs such as `/kid/:childSlug/`, `/kid/:childSlug/track/:trackSlug/`, and `/kid/:childSlug/lesson/:lessonId/` to fixed shell assets, then the browser fetches child/track/lesson data from the API using the URL path. Adding children or temporary lessons should not increase the number of generated Astro pages.

Temporary school vocabulary belongs in child-specific practice sets, not canonical curriculum Markdown. See [docs/practice-sets.md](/Users/billerickson/Downloads/learn.billplustara.com/docs/practice-sets.md) for the parent API workflow, archive behavior, and generated flash-card lesson shape.

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

`subject` is matched against [src/lib/subjects.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/lib/subjects.ts) for labels, track ordering, icons, and starter badges. Existing subjects are `math`, `vocabulary`, and `spanish`. Unknown subject keys still load with a fallback label and generic icon, but add metadata when the subject should have a specific order, icon, or starter badge.

Badge rules live in [src/lib/badges.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/lib/badges.ts). Subject starter badges are read from subject metadata, so adding a starter badge for a new subject should not require Worker reward logic changes.

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

### Standard Lesson Config

Standard lessons can include optional teaching cards and review/deck behavior in `config`.

```yaml
config:
  intro:
    - title: Ser And Estar
      body: Use ser for identity and traits. Use estar for location and changing states.
      bullets:
        - soy, eres, es, somos, son
        - estoy, estas, esta, estamos, estan
  review:
    mode: spaced
    label: Verb review
    shuffleQuestions: true
```

`intro` cards appear before the scored questions. `review.shuffleQuestions: true` turns the lesson into deck-style practice by shuffling the authored question order.

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

Mad Minute defaults are centralized as `DEFAULT_MAD_MINUTE_CONFIG`: mixed 2s-12s multiplication facts, multipliers 1-12, 60 seconds, and a goal of 40 correct. Authored Mad Minute Markdown should still specify the config explicitly for readability.

Fact generation, allowed-fact validation, scoring, and Mad Minute XP rules live in [src/lib/mad-minute.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/lib/mad-minute.ts) so the lesson player and Worker use the same domain behavior.

## Question Types

Every question type can include optional question-level media:

```yaml
media:
  image:
    src: /assets/spanish/classroom.jpg
    alt: Classroom with desks and a whiteboard
    caption: la clase
  audio:
    src: /audio/spanish/classroom.mp3
    label: Listen
```

Text scoring is accent-tolerant. For example, `esta` can match an accepted answer of `está`; the player can still show an accent note after a correct answer.

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

### Flash Card

Use Easy flash cards for recognition with multiple-choice answers below the card. Use Hard flash cards for production with a typed answer.

```yaml
- type: flash-card
  mode: easy
  prompt: Choose the best meaning.
  front: contexto
  choices:
    - context
    - classroom
    - lunch
    - weather
  correctAnswer: context
```

```yaml
- type: flash-card
  mode: hard
  prompt: Type the Spanish word.
  front: context
  acceptedAnswers:
    - contexto
  answerType: text
```

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

### Passage Question

Use this for reading comprehension. Repeat the same passage across several questions when a lesson needs a shared reading set.

```yaml
- type: passage-question
  prompt: Read the paragraph and answer.
  passageTitle: Una tarde ocupada
  passage: |
    Después de la escuela, Elena va a la biblioteca.
    Ella estudia español y luego practica fútbol.
  question: Where does Elena go after school?
  choices:
    - the library
    - the store
    - the park
    - the kitchen
  correctAnswer: the library
```

### Multi Blank Cloze

Use this for sentence-level grammar, verb forms, and short paragraphs with several blanks.

```yaml
- type: multi-blank-cloze
  prompt: Complete the sentence.
  parts:
    - "Yo "
    - " en Texas y "
    - " español."
  blanks:
    - correctAnswer: vivo
      acceptedAnswers:
        - vivo
    - correctAnswer: estudio
      acceptedAnswers:
        - estudio
```

For choice-based blanks, add `choices` to a blank.

### Constructed Response

Use this for short written production. Scoring checks that the answer is not empty and meets optional length gates; the sample answer appears after submission.

```yaml
- type: constructed-response
  prompt: Write four or more words about what you like to do.
  minWords: 4
  sampleAnswer: Me gusta jugar al fútbol.
  checklist:
    - Include me gusta
    - Include an activity
```

### Dialogue Builder

Use this for conversation turns and appropriate responses.

```yaml
- type: dialogue-builder
  prompt: Choose the best next line.
  turns:
    - speaker: Ana
      line: ¿Cómo estás?
  choices:
    - Estoy bien, gracias.
    - Son las tres.
    - Tengo trece años.
  correctAnswer: Estoy bien, gracias.
```

### Listening Question

Use this when the lesson has an audio asset. The answer is multiple choice.

```yaml
- type: listening-question
  prompt: Listen and choose the day you hear.
  audioSrc: /audio/spanish/days-martes.mp3
  audioLabel: Days
  choices:
    - lunes
    - martes
    - jueves
  correctAnswer: martes
```

### Speaking Prompt

Use this for oral practice. The browser can record locally for playback; Buddy Blocks stores only the submitted practice flag or note.

```yaml
- type: speaking-prompt
  prompt: Say two sentences about your family.
  minSeconds: 8
  sampleAnswer: Mi familia es grande. Tengo una hermana.
  checklist:
    - Use tener or ser
    - Say at least two sentences
```

### Error Correction

Use this for editing grammar and spelling in context.

```yaml
- type: error-correction
  prompt: Correct the sentence.
  sentence: Yo tiene hambre.
  acceptedAnswers:
    - Yo tengo hambre.
    - Tengo hambre.
```

### Conjugation Grid

Use this for verb transformation practice. Each row supplies one answer per column; a cell can accept either one string or a list of strings.

```yaml
- type: conjugation-grid
  prompt: Complete the present-tense forms.
  columns:
    - yo
    - ella
  rows:
    - label: hablar
      answers:
        - hablo
        - habla
    - label: vivir
      answers:
        - vivo
        - vive
```

## Adding Content

Use TEKS (Texas Essential Knowledge and Skills) as a guide for what should be covered in each subject level. The lessons can stay playful and compact, but the topic progression should map back to the expectations for that level.

To add a lesson:

1. Choose the grade folder, track folder, and unit folder.
2. Add the next numbered Markdown file, such as `03-equal-parts.md`.
3. Use a stable grade-scoped lesson `id`, a URL-safe `slug`, a kid-facing `title`, `xpBase: 10`, and 8-12 questions.
4. Run `npm run content:validate`, `npm run test`, and `npm run build`.
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
npm run content:validate
npm run test
npm run build
npm run db:seed:local
npm run dev:worker
```

Then open the local Worker URL, usually `http://localhost:8787`.

After changing lesson-player rendering or question controls, also use [docs/lesson-player-qa.md](/Users/billerickson/Downloads/learn.billplustara.com/docs/lesson-player-qa.md) for the manual smoke pass.

If you need to wipe local progress and start from fresh seed data:

```bash
npm run db:reset:local
```

For remote Cloudflare D1, seed without resetting progress:

```bash
BUDDY_BLOCKS_PARENT_PASSWORD='your-parent-password' npm run db:seed:remote
```

The seed script upserts authored tracks, units, lessons, and questions. It inserts missing child progress rows, but it does not overwrite existing lesson completion rows. Seed output includes a grade/subject summary so large content changes are easier to scan before QA.

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
