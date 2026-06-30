# V3 Lesson Authoring Guide

## Status

This is the canonical authoring guide for the V3 curriculum rebuild.

Use this document with `docs/v3-content-rebuild-plan.md`. Do not use `docs/lesson-authoring.md` as the primary prompt context for V3 content creation; that file documents the legacy V1/V2 content system and the current runtime format.

V3 starts from a blank slate. Existing generated lessons and questions should not be preserved, copied, summarized, or treated as curriculum evidence.

## Core Principle

Every lesson should be built from instructional intent:

1. Research the track level.
2. Define the level goal.
3. Design the course and units.
4. Write the unit brief.
5. Write the lesson brief.
6. Write questions from the lesson brief.
7. QA each question against the lesson, unit, level, and research base.

Questions come last. If a question cannot be tied to a specific lesson goal, it does not belong.

## What Codex And ChatGPT May Use

For V3 research and authoring, the model may use:

- `docs/v3-content-rebuild-plan.md`
- `docs/v3-lesson-authoring.md`
- `docs/question-types.md`
- `docs/curriculum-summary.md` only as historical context, not as the final plan
- runtime constraints from `src/lib/curriculum.ts`, `src/lib/lesson-engine.ts`, and the lesson player when implementation details matter
- external primary or high-quality curriculum sources

The model should avoid using:

- `src/content/curriculum`
- `scripts/generate-planned-curriculum.ts`
- generated lesson Markdown files
- existing question arrays
- existing generated unit sequences as a source of truth

The existing curriculum can be inspected later for migration logistics, but not while researching or designing V3 scope.

## Research Folder

Store research artifacts under `research/v3/`.

Recommended structure:

```text
research/v3/
  grade-03-math/
    01-research-brief.md
    02-level-blueprint.md
    03-course-map.md
    sources.md
  grammar-i/
    01-research-brief.md
    02-level-blueprint.md
    03-course-map.md
    sources.md
```

Research artifacts should be committed separately from implemented lesson source when possible. That makes it easier to review the thinking before reviewing the app content.

## Research Standard

Each track-level research brief should use primary or high-quality sources:

- official subject standards,
- respected scope and sequence documents,
- subject organization frameworks,
- learning-science references,
- developmental guidance appropriate to the student age.

The brief should include:

- source list with links,
- end-of-level outcomes,
- prerequisite knowledge,
- major concept clusters,
- recommended progression,
- common misconceptions,
- developmental constraints,
- assessment implications,
- spiral review priorities,
- concepts to avoid until later levels.

The model should cite sources and explain how the sources shaped the level plan. No standards should be invented.

## Level Blueprint

The level blueprint defines what the track level is trying to accomplish.

It should include:

- level mission,
- durable student outcomes,
- concept progression,
- skill progression,
- vocabulary or representation progression,
- fluency expectations,
- conceptual understanding expectations,
- application and transfer expectations,
- review and spacing plan,
- mastery evidence for the end of the level.

The blueprint is the anchor for all later unit and lesson decisions.

## Course And Unit Design

Course maps should be built from the level blueprint, not from a fixed unit template.

Each unit should include:

- unit title,
- unit purpose,
- student outcomes,
- key concepts and vocabulary,
- prerequisites,
- connections to prior and later units,
- misconceptions to address,
- suggested lesson count range,
- review or interleaving notes.

Do not force every unit to have the same number of lessons or the same lesson pattern. Some units may need two lessons; others may need six. The structure should serve the level.

## Lesson Brief

Every lesson needs a brief before questions are written.

Required lesson brief:

- teaching goal,
- student outcome,
- key idea, model, text, representation, form, or procedure,
- prerequisite knowledge,
- likely misconceptions,
- evidence of mastery,
- recommended question types and why each fits,
- suggested intro or teaching note,
- reading-level and cognitive-load constraints.

If the lesson brief is vague, stop and improve it. Vague lesson briefs produce generic questions.

## V3 Lesson Source Format

Use frontmatter for stable metadata only. Put instructional intent and questions in the Markdown body.

````md
---
id: lesson_grade3_math_make_ten
slug: make-ten
title: Make Ten
xpBase: 10
---

## Teaching Goal

Students learn to make 10 as a strategy for adding within 20.

## Student Outcome

The student can break apart one addend to complete a ten, then add the leftover amount.

## Key Ideas

- 8 needs 2 more to make 10.
- 5 can be split into 2 and 3.
- 8 + 5 can be thought of as 10 + 3.

## Misconception Checks

- The student may count all from 1 instead of using structure.
- The student may split the wrong addend without making a ten.

## Questions

```question
key: make-ten-split-5
type: multiple-choice
prompt: What is the best first step for 8 + 5?
choices:
  - Break 5 into 2 and 3
  - Count backward from 8
  - Double 5
  - Add 8 + 8
correctAnswer: Break 5 into 2 and 3
explanation: 8 needs 2 more to make 10, so split 5 into 2 and 3.
hint: Ask yourself, "How many more does 8 need to reach 10?"
questionGoal: Check whether the student can choose a split that completes a ten.
misconception: Treating make-ten as ordinary counting instead of decomposing an addend.
```
````

The V3 source format may require parser updates before it is runtime-ready. Until then, this is the target authoring format.

## Question Blocks

Each question should be one fenced `question` block containing valid YAML.

Recommended fields:

- `key`: stable question key within the lesson.
- `type`: supported Buddy Blocks question type.
- `prompt`: student-facing prompt.
- answer data required by the question type.
- `explanation`: feedback after answer submission.
- `hint`: optional second-attempt support after one wrong answer.
- `questionGoal`: author-facing reason this question exists.
- `misconception`: likely wrong idea the question can reveal, when applicable.

Hints should not appear on the first attempt. They should appear only when the student sees the same question again after answering it incorrectly once already. A good hint points to a strategy, clue, representation, or next step without giving away the answer.

## Question Quality Bar

A question is acceptable only when:

- it directly supports the lesson goal,
- the correct answer is accurate and unambiguous,
- the question type fits the learning job,
- distractors are plausible and diagnostic,
- the explanation teaches the reasoning or clue,
- reading load matches the student level,
- it avoids generic filler,
- it does not rely on duplicate match-pair right-side labels,
- it contributes to a sequence from support toward mastery.

For new material, unsupported recall should not come first. Students should encounter the idea through explanation, context, model, example, or guided recognition before production.

## Question Type Selection

Use question types by learning job:

- `multiple-choice`: recognition, misconception checks, strategy choice, source evidence choice.
- `fill-blank`: precise vocabulary, formulas, forms, sentence parts, supported recall.
- `match-pairs`: distinct relationships, translations, terms to meanings, examples to categories.
- `order-items`: sequences, rankings, process steps, proof steps, sentence order, timelines.
- `passage-question`: reading context, source use, word problems, scenarios, evidence.
- `text-input`: typed production after enough support or strong cueing.
- `multi-blank-cloze`: grammar, sentence completion, paragraph completion, multi-step forms.
- `constructed-response`: explanation, transfer, short written production.
- `dialogue-builder`: conversational response and pragmatic fit.
- `listening-question`: audio comprehension.
- `speaking-prompt`: oral production and rehearsal.
- `error-correction`: editing, grammar, spelling, usage.
- `conjugation-grid`: systematic form changes.
- `flash-card`: targeted retrieval after meaningful exposure.

Do not include a type merely for variety. Variety is useful only when it reflects a real learning purpose.

## Lesson Sequence

A compact lesson should usually move through some version of:

1. Meaningful exposure or teaching.
2. Guided recognition.
3. Misconception check.
4. Supported practice.
5. Application, explanation, transfer, or production.

This is not a mandatory fixed pattern. It is a learning arc. Some lessons will need a different shape.

## QA Before Implementation

Before a lesson is implemented, run a strict QA pass.

Check:

- Does the lesson have a clear teaching goal?
- Does every question align with that goal?
- Does the lesson advance the unit and level blueprint?
- Are answer keys correct?
- Are prompts unambiguous?
- Are distractors useful?
- Are explanations and hints helpful?
- Is the sequence developmentally appropriate?
- Does anything feel generated or formulaic?
- Should the lesson be split, combined, reordered, or rewritten?

Reject lessons that are merely valid. V3 needs lessons that are worth doing.

## Implementation Notes

Codex should implement only accepted content.

Implementation responsibilities:

- create or update lesson Markdown,
- preserve valid frontmatter metadata,
- preserve valid YAML in question blocks,
- update parser/schema support when needed,
- run content validation,
- run tests/build when appropriate,
- update the QA or rebuild log.

Codex should not invent final curriculum in bulk without accepted research briefs and lesson briefs.

## Definition Of Done

A V3 lesson is done when:

- the lesson has a clear teaching goal,
- the student outcome is observable,
- the lesson aligns to the accepted unit and level plans,
- questions were written from the lesson brief,
- every question has a clear learning job,
- explanations and hints are useful,
- the source format is readable as curriculum,
- the lesson validates and renders in the app,
- QA marks the lesson accepted.
