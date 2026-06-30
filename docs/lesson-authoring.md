# Buddy Blocks Lesson Authoring Guide

## Where Lessons Live

The editable curriculum source is [src/content/curriculum](/Users/billerickson/Downloads/learn.billplustara.com/src/content/curriculum).

[src/lib/curriculum.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/lib/curriculum.ts) is the typed curriculum loader. It reads the file tree, validates YAML frontmatter, and exports normalized `TRACKS`, `getTracksForGrade()`, `getAllLessons()`, and `getAllQuestions()` helpers used by seeding.

[src/lib/seed-family.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/lib/seed-family.ts) owns the fixed parent/child fixtures and child-specific route helpers for Reagan, Ada, and Bill. [src/lib/content.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/lib/content.ts) remains as a compatibility barrel only.

At runtime, lessons still live in D1 after seeding:

1. Author content in [src/content/curriculum](/Users/billerickson/Downloads/learn.billplustara.com/src/content/curriculum).
2. Run [scripts/seed.ts](/Users/billerickson/Downloads/learn.billplustara.com/scripts/seed.ts), which writes canonical curriculum into D1, prunes retired curriculum rows that no longer exist in Markdown, then seeds the fixed v1 family/profile data.
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

The numeric prefixes control display order for most units. The app uses the `slug` values inside YAML for URLs, not the folder/file prefix.

Vocabulary, Spanish, French, and Latin units with flash-card ladders get one extra ordering rule at load time: Preview/context lessons come first, Easy and Medium cards come before practice, and Hard cards come after the practice lessons. This preserves old lesson IDs and filenames while keeping the in-app sequence aligned to the exposure-first learning pattern.

Current v1 profiles:

- Ada is Grade 3 and sees Grade 3 scholastic tracks plus foundation level 1 tracks.
- Bill is a Grade 6 test profile and sees Grade 6 scholastic tracks plus foundation level 1 tracks.
- Reagan is Grade 6 overall and sees Grade 6 scholastic tracks plus foundation level 1 tracks.

Scholastic subjects use the student's global grade level. Foundation subjects, such as Spanish, French, Latin, Grammar, Logic, Rhetoric, Literature, History And Civics, and Memory Work, start every student at level 1 and unlock the next level after the previous one is complete.

The v1 enrollment model is documented in [docs/enrollment-model.md](/Users/billerickson/Downloads/learn.billplustara.com/docs/enrollment-model.md). It intentionally uses track groups instead of explicit track assignment tables.

Kid app pages are generic static shells. The Worker maps authenticated dynamic URLs such as `/kid/:childSlug/`, `/kid/:childSlug/track/:trackSlug/`, and `/kid/:childSlug/lesson/:lessonId/` to fixed shell assets, then the browser fetches child/track/lesson data from the API using the URL path. Adding children or temporary lessons should not increase the number of generated Astro pages.

Temporary school vocabulary belongs in child-specific practice sets, not canonical curriculum Markdown. See [docs/practice-sets.md](/Users/billerickson/Downloads/learn.billplustara.com/docs/practice-sets.md) for the parent API workflow, archive behavior, and generated context/card lesson shape.

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

`subject` is matched against [src/lib/subjects.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/lib/subjects.ts) for labels, track ordering, icons, and starter badges. Existing subjects are `math`, `vocabulary`, `spanish`, `french`, `latin`, `grammar`, `logic`, `rhetoric`, `literature`, `history-civics`, and `memory-work`. Unknown subject keys still load with a fallback label and generic icon, but add metadata when the subject should have a specific order, icon, or starter badge.

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

Keep lesson IDs stable after seeding. A changed `id` looks like a brand-new lesson to D1 and the old row will be retired on the next seed. Retired lesson attempts and progress are pruned with that row, while child track pointers are repaired to the next available canonical lesson.

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

## Learning Science And Lesson Sequence

Author lessons so students encounter meaning before they are asked to recall it. Flash cards are useful retrieval practice, but they should not be the first substantial exposure to unfamiliar words, facts, or forms.

Use this general sequence for new material:

1. Introduce the concept with a short `config.intro` card or a brief contextual prompt.
2. Let students meet the target material in context through a passage, example, model, or worked item.
3. Ask guided recognition questions that help students notice the clue, pattern, or definition.
4. Move into varied retrieval practice with multiple question types.
5. Finish with harder production only after students have seen and used the material several times.
6. Bring the material back later in mixed review so practice is spaced and interleaved.

This pattern is based on these research-backed practices:

- Explicit instruction: name the target idea, give a student-friendly meaning, and show an example before independent recall. IES recommends explicit vocabulary instruction for adolescent literacy.
- Contextual exposure: anchor vocabulary in brief, engaging text so students can infer meaning from surrounding ideas, not only memorize isolated pairs.
- Multiple exposures: repeat important words across oral, written, recognition, and production tasks instead of treating one card as enough.
- Retrieval practice: ask students to recall or choose answers, because low-stakes testing improves long-term retention when it follows meaningful study.
- Spacing and interleaving: revisit older words and skills in later lessons and cumulative reviews instead of clustering all practice in one sitting.
- Feedback: include concise `explanation` text when a wrong answer would reveal a misconception, and explain the clue or reasoning rather than only naming the answer.

Research sources:

- [IES: Improving Adolescent Literacy](https://ies.ed.gov/ncee/wwc/practiceguide/8)
- [IES: Teaching Academic Content and Literacy to English Learners](https://ies.ed.gov/ncee/wwc/practiceguide/19)
- [IES: Organizing Instruction and Study to Improve Student Learning](https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/20072004.pdf)
- [Roediger and Karpicke, 2006: Test-Enhanced Learning](https://doi.org/10.1111/j.1467-9280.2006.01693.x)
- [Dunlosky et al., 2013: Improving Students' Learning With Effective Learning Techniques](https://doi.org/10.1177/1529100612453266)

### Vocabulary Lesson Ladder

For canonical Vocabulary units, use this order unless the unit is purely cumulative review:

1. `00-...-preview.md` or `01-...-context.md`: a short reading or scenario with 5-8 target words. Use `passage-question`, `multiple-choice`, and explanations to help students infer each meaning from context. Include direct definitions when inference alone would be unfair.
2. Easy flash cards: term on the card, student chooses the meaning. This is recognition practice after exposure, not the first lesson.
3. Varied practice: use `multiple-choice`, `fill-blank`, `match-pairs`, `order-items`, `passage-question`, and occasional `text-input` to use the same words in new contexts.
4. Hard flash cards: definition, clue, or context sentence on the card; student types the word. This is production practice and should come after varied practice.
5. Later mixed review: pull selected words into cumulative lessons with older vocabulary so retrieval is spaced.

Good Vocabulary passages are short enough to read comfortably in the lesson player, contain several target words naturally, and include enough surrounding detail for students to reason toward meaning. Avoid passage text that simply lists "word means definition"; use a real classroom, reading, science, history, or writing situation where the word does useful work.

Use a small word set for each ladder. Five to eight words is ideal for deep instruction; up to twelve can work when the words are tightly related roots or review terms. If a unit currently has twelve words, split the initial context work into two passages or two context lessons so each word gets a real encounter.

Design the practice mix this way:

- Multiple choice should ask about meaning in context, not only "What does X mean?"
- Fill blanks should use sentence clues that make the correct word meaningful.
- Match pairs should be limited to 4-6 pairs at a time so it stays readable.
- Text input should appear after recognition practice unless the answer is strongly cued.
- Hard flash cards should accept common variants, plurals, or phrases when they are truly equivalent.
- Explanations should point to the clue, word part, or example that reveals the answer.

For world-language and classical-language units, keep the same principle: students should see and hear the target words in a preview, intro, or contextual lesson before being asked to produce them. The language ladder can still use Preview, Easy, Medium, and Hard flash cards, but production should come after exposure and recognition.

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

Use Preview flash cards for study-only word exposure before recall. Use Easy flash cards for recognition with multiple-choice answers below the card. Use Hard flash cards for production with a typed answer.

```yaml
- type: flash-card
  mode: preview
  prompt: Study this word and meaning.
  front: contexto
  correctAnswer: context
```

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

For world-language and classical-language vocabulary ladders, place Medium between Easy and Hard:

```yaml
- type: flash-card
  mode: medium
  prompt: Type the English meaning.
  front: contexto
  acceptedAnswers:
    - context
  answerType: text
```

Use Preview for target-language-to-English exposure, Easy for target-language-to-English multiple choice, Medium for target-language-to-English typed meaning, and Hard for English-to-target-language typed production.

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
