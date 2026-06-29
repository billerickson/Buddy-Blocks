# Buddy Blocks Question Types Reference

This document describes the question types supported by Buddy Blocks lessons, how they are scored, and the shared authoring features that apply across subjects.

For the broader curriculum file structure, see [lesson-authoring.md](/Users/billerickson/Downloads/learn.billplustara.com/docs/lesson-authoring.md).

## How Questions Work

Standard lesson files are Markdown files with YAML frontmatter. Each item in `questions` becomes a row in D1, with:

- `type` saved as the question type.
- `prompt` saved as the visible question prompt.
- Type-specific fields saved inside `payload_json`.
- `explanation`, when present, shown after submission.

The relevant implementation files are:

- [src/lib/content.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/lib/content.ts): validates lesson YAML and normalizes question payloads.
- [src/lib/lesson-engine.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/lib/lesson-engine.ts): defines question payload types and scoring.
- [src/components/islands/LessonPlayer.tsx](/Users/billerickson/Downloads/learn.billplustara.com/src/components/islands/LessonPlayer.tsx): renders question controls.
- [src/worker.ts](/Users/billerickson/Downloads/learn.billplustara.com/src/worker.ts): returns lesson config/questions and saves attempts.

All standard question types use the same lesson flow: hearts, XP, review queue, completion, unlocks, and attempt history.

## Shared Fields

Every standard question supports these fields:

```yaml
- type: multiple-choice
  prompt: What should the student do?
  explanation: Optional feedback after the answer is checked.
```

Every question type can also include optional media:

```yaml
media:
  image:
    src: /assets/spanish/classroom.jpg
    alt: Classroom with desks and a whiteboard
    caption: la clase
  audio:
    src: /audio/spanish/classroom.mp3
    label: Listen
    transcript: Optional transcript
  video:
    src: /video/spanish/dialogue.mp4
    label: Watch
```

Use media paths under `public/`, referenced from the site root, such as `/audio/spanish/file.mp3`.

## Text Scoring

Text answers are normalized before scoring:

- Leading/trailing spaces are ignored.
- Repeated spaces collapse to one space.
- Case is ignored.
- Common punctuation and inverted Spanish punctuation are ignored.
- Accent marks are ignored for correctness.

For example, `esta en la escuela` can match an accepted answer of `está en la escuela`. When the answer is otherwise correct but missing accents, the lesson player can show an accent note with the preferred spelling.

Use `answerType: number` only for numeric answers. Quote numeric accepted answers in YAML:

```yaml
acceptedAnswers:
  - "13"
answerType: number
```

## Lesson Config

Standard lessons can include optional teaching cards and deck-style review behavior:

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

`intro` cards appear before the scored questions. `review.shuffleQuestions: true` shuffles the authored question order for deck-style practice.

Mad Minute lessons are a separate lesson kind:

```yaml
kind: mad-minute
config:
  mode: multiplication
  factor: mixed
  minFactor: 2
  maxFactor: 12
  minMultiplier: 1
  maxMultiplier: 12
  durationSeconds: 60
  goalCorrect: 40
questions: []
```

The schemas and runtime parsers for standard lesson config and Mad Minute config are defined in `src/lib/lesson-config.ts`, with UI-safe defaults and type guards in `src/lib/lesson-config-core.ts`. Use those shared files as the source of truth for validation rules, runtime fallback behavior, and the default Mad Minute values.

## Question Type Summary

| Type | Best For | Answer Shape | Scoring |
| --- | --- | --- | --- |
| `multiple-choice` | Recognition, quick checks | string | selected choice equals `correctAnswer` |
| `text-input` | Typed words, phrases, numbers | string | matches any `acceptedAnswers` |
| `fill-blank` | One blank with choices | string | selected choice equals `correctAnswer` |
| `match-pairs` | Vocabulary pairs, equivalent facts | object map | every left item matched to correct right item |
| `order-items` | Word order, sequencing, ranking | string array | exact order, or grouped order when configured |
| `flash-card` | Word learning, easy/hard card practice | string | easy uses choices; hard uses typed accepted answers |
| `passage-question` | Reading comprehension | string | selected choice equals `correctAnswer` |
| `multi-blank-cloze` | Multi-blank grammar and paragraph completion | string array | every blank matches |
| `constructed-response` | Short written production | string | non-empty and meets optional length gates |
| `dialogue-builder` | Conversation turns | string | selected line equals `correctAnswer` |
| `listening-question` | Audio comprehension | string | selected choice equals `correctAnswer` |
| `speaking-prompt` | Oral practice | object/string | recorded flag, note, or transcript present |
| `error-correction` | Editing grammar/spelling | string | matches any `acceptedAnswers` |
| `conjugation-grid` | Verb/form transformations | row-to-array object | every grid cell matches |

## Multiple Choice

Use for quick recognition and simple checks.

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

## Text Input

Use for typed production of a word, phrase, or number.

```yaml
- type: text-input
  prompt: Type the Spanish word for school.
  acceptedAnswers:
    - la escuela
    - escuela
  answerType: text
```

For numbers:

```yaml
- type: text-input
  prompt: Type the value of 6 + 7.
  acceptedAnswers:
    - "13"
  answerType: number
```

## Fill Blank

Use for one choice-based blank inside a sentence.

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

## Match Pairs

Use for matching vocabulary, definitions, translations, equivalent expressions, or cause/effect pairs.

```yaml
- type: match-pairs
  prompt: Match each Spanish word to English.
  pairs:
    - left: hola
      right: hello
    - left: adios
      right: goodbye
    - left: gracias
      right: thank you
```

The UI shuffles right-side values. Scoring requires every `left` value to be matched with its authored `right` value.

## Order Items

Use for sequence, sentence order, least-to-greatest, steps in a process, or word order.

```yaml
- type: order-items
  prompt: Put the Spanish sentence in order.
  items:
    - gusta
    - Me
    - leer
  correctOrder:
    - Me
    - gusta
    - leer
```

Use `unorderedGroupsOf` when each group can be internally unordered but the groups must stay in sequence:

```yaml
- type: order-items
  prompt: Group the synonyms, then antonyms.
  items:
    - cold
    - small
    - chilly
    - little
  correctOrder:
    - cold
    - chilly
    - small
    - little
  unorderedGroupsOf: 2
```

## Flash Card

Use for word learning in Spanish, Vocabulary, or any subject that needs term practice.

Easy flash cards show a large card and multiple-choice answers:

```yaml
- type: flash-card
  mode: easy
  prompt: Choose the best meaning.
  front: la escuela
  choices:
    - school
    - house
    - family
    - food
  correctAnswer: school
```

Hard flash cards show the card and ask the student to type:

```yaml
- type: flash-card
  mode: hard
  prompt: Type the Spanish word.
  front: school
  acceptedAnswers:
    - la escuela
    - escuela
  answerType: text
```

Recommended pattern: author Easy and Hard as separate lessons using the same deck concept.

## Passage Question

Use for reading comprehension. Repeat the same passage across several questions when a lesson needs a shared passage set.

```yaml
- type: passage-question
  prompt: Read the paragraph and answer.
  passageTitle: Una tarde ocupada
  passage: |
    Despues de la escuela, Elena va a la biblioteca.
    Ella estudia espanol y luego practica futbol.
  question: Where does Elena go after school?
  choices:
    - the library
    - the store
    - the park
    - the kitchen
  correctAnswer: the library
```

## Multi-Blank Cloze

Use for sentences or paragraphs with multiple blanks.

```yaml
- type: multi-blank-cloze
  prompt: Complete the sentence.
  parts:
    - "Yo "
    - " en Texas y "
    - " espanol."
  blanks:
    - correctAnswer: vivo
      acceptedAnswers:
        - vivo
    - correctAnswer: estudio
      acceptedAnswers:
        - estudio
```

For choice-based blanks, add `choices` to the blank:

```yaml
- type: multi-blank-cloze
  prompt: Complete the sentence.
  parts:
    - "Ella "
    - " cansada pero "
    - " en la escuela."
  blanks:
    - correctAnswer: esta
      choices:
        - es
        - esta
        - soy
    - correctAnswer: esta
      choices:
        - esta
        - tiene
        - va
```

`parts` should have one more item than `blanks` when the sentence ends after the final blank. If the sentence ends with the final blank, the last part can be an empty string.

## Constructed Response

Use for short written production, summaries, explanations, or Spanish sentence writing.

```yaml
- type: constructed-response
  prompt: Write four or more words about what you like to do.
  minWords: 4
  sampleAnswer: Me gusta jugar al futbol.
  checklist:
    - Include me gusta
    - Include an activity
```

Scoring is automatic: the response must be non-empty and meet optional `minWords` and/or `minCharacters`. The sample answer is shown after submission. This is not teacher-reviewed.

## Dialogue Builder

Use for conversation logic and choosing the most appropriate response.

```yaml
- type: dialogue-builder
  prompt: Choose the best next line.
  turns:
    - speaker: Ana
      line: Como estas?
    - speaker: Luis
      line: Estoy bien.
  choices:
    - Y tu?
    - Son las tres.
    - Tengo trece anos.
  correctAnswer: Y tu?
```

## Listening Question

Use when the lesson has an audio asset. The answer is multiple choice.

```yaml
- type: listening-question
  prompt: Listen and choose the day you hear.
  audioSrc: /audio/spanish/days-martes.mp3
  audioLabel: Days
  transcript: martes
  choices:
    - lunes
    - martes
    - jueves
  correctAnswer: martes
```

`transcript` is optional. Use it when showing a transcript after, or when accessibility requires it.

## Speaking Prompt

Use for oral practice. The browser can record locally for playback, but Buddy Blocks stores only the submitted practice flag or typed note, not the audio file.

```yaml
- type: speaking-prompt
  prompt: Say two sentences about your family.
  minSeconds: 8
  sampleAnswer: Mi familia es grande. Tengo una hermana.
  checklist:
    - Use tener or ser
    - Say at least two sentences
```

Scoring is automatic: the prompt is marked answered when the student records, types a note, or submits a transcript-like response.

## Error Correction

Use for grammar, spelling, punctuation, or sentence editing.

```yaml
- type: error-correction
  prompt: Correct the sentence.
  sentence: Yo tiene hambre.
  acceptedAnswers:
    - Yo tengo hambre.
    - Tengo hambre.
```

Add reasonable variants to `acceptedAnswers`, especially when a sentence can be corrected in more than one valid way.

## Conjugation Grid

Use for verb forms and transformations across pronouns, tenses, or sentence patterns.

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

A cell can accept multiple answers:

```yaml
- type: conjugation-grid
  prompt: Complete the forms.
  columns:
    - presente
    - preterito
  rows:
    - label: ella vivir
      answers:
        - vive
        - - vivio
          - vivio ella
```

The number of `answers` in each row should match the number of `columns`.

## Choosing The Right Type

Use this quick guide when authoring lessons:

- Vocabulary recognition: `flash-card` easy, `multiple-choice`, `match-pairs`.
- Vocabulary production: `flash-card` hard, `text-input`.
- Spanish sentence building: `order-items`, `multi-blank-cloze`, `error-correction`.
- Spanish communication: `dialogue-builder`, `constructed-response`, `speaking-prompt`.
- Grammar transformations: `conjugation-grid`, `multi-blank-cloze`, `error-correction`.
- Reading comprehension: `passage-question`, `constructed-response`.
- Listening comprehension: `listening-question`.
- Visual/audio support: add `media` to any question type.
- Lesson teaching before practice: add `config.intro`.
- Review decks: add `config.review.shuffleQuestions: true`.

## Authoring Notes

- Keep lesson IDs stable after seeding. Changing an `id` creates a new lesson from the app's point of view.
- Prefer 8-12 scored questions per standard lesson.
- Quote numeric answers in YAML.
- For Spanish, include unaccented variants only when the variant is truly acceptable; accent tolerance already handles missing accent marks for scoring.
- For constructed response and speaking prompts, remember that scoring is completion-based, not quality-based.
- For listening and media questions, commit the asset under `public/` and reference it with a root-relative path.
- For passage sets, repeat the passage in each `passage-question` until the app has a dedicated shared-passage grouping model.

## Verification

After adding or changing question authoring:

```bash
npm run test
npm run build
npm run db:seed:local
npm run dev:worker
```

Then open the local Worker URL and complete at least one lesson that uses the changed question type.
