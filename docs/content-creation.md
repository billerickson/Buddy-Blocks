# Content Creation

## Purpose

This is the canonical guide for curriculum research, planning, lesson authoring, question authoring, QA, and implementation handoff.

We use a top-down approach to build lesson content:

1. Research the goals of a track level.
2. Define the level blueprint.
3. Build courses and units from that blueprint.
4. Design lessons that advance the unit and level goals.
5. Write individual questions only after the lesson goal is clear.
6. QA each question against research, lesson intent, answer accuracy, and learning value.

The core principle: no lesson or question should exist just because a template produced it.

## Non-Negotiables

- Do not auto-generate final curriculum with scripts.
- Do not create repeated lesson patterns unless the repetition is pedagogically intentional.
- Do not start by writing questions.
- Do not preserve existing generated content for its own sake.
- Do not use random distractors. Distractors should usually represent real misconceptions.
- Do not treat a technically correct answer key as sufficient QA.
- Do not let the source format hide instructional intent inside large YAML arrays.
- Do not fill QA-created question gaps by recreating rejected items or adding generic filler.

## Source Boundaries

For research, planning, and authoring, models may use:

- `docs/content-creation.md`,
- `docs/question-types.md`,
- `research/track-status.json` for workflow status only,
- accepted artifacts in `research/[track-level]/`,
- external primary or high-quality curriculum sources.

When implementation details matter, Codex may also inspect runtime constraints in files such as `src/lib/curriculum.ts`, `src/lib/lesson-engine.ts`, lesson config schemas, and the lesson player.

Do not use these as curriculum evidence while researching, planning, or authoring:

- `src/content/curriculum`,
- legacy curriculum generation scripts,
- generated lesson Markdown files,
- existing generated question arrays,
- existing generated unit sequences.

Existing curriculum can be inspected later for migration logistics, app behavior, or format comparison, but not as source material for deciding what should be taught.

Research artifacts should be reviewed and committed separately from implemented lesson source when possible. That keeps the instructional thinking easy to review before the app content changes.

`research/track-status.json` is a workflow manifest, not curriculum evidence. Keep it current as tracks move through research, authoring, QA, import, and pilot review so ready tracks remain visible after the initial V3 import.

## Research Basis

Each track-level plan should be grounded in primary or high-quality curriculum references. Use current sources where possible.

Recommended source categories:

- Subject standards: Common Core, TEKS, state standards, ACTFL/NCSSFL, C3 Framework, NCSS, or other subject-specific standards.
- Scope and sequence references: Core Knowledge, classical education sequences, reputable curriculum maps, AP/course frameworks where relevant.
- Learning science: IES/What Works Clearinghouse practice guides, retrieval practice, spacing, interleaving, explicit instruction, worked examples, and feedback.
- Developmental fit: grade-level reading demands, prerequisite knowledge, cognitive load, and appropriate production expectations.

Every level blueprint should include a short source note explaining which references shaped the plan.

## Recommended Source Format

Use frontmatter for lesson metadata and compact runtime lesson config. Use Markdown body content for instructional intent and questions.

````md
---
id: lesson_grade3_math_make_ten
slug: make-ten
title: Make Ten
xpBase: 10
config:
  intro:
    - title: Start Here
      body: >
        In this lesson, you will learn how to make 10 as a strategy for adding
        within 20.
    - title: Key Idea
      body: >
        Break one addend into two parts: the part that completes 10, and the
        leftover part you still need to add.
      bullets:
        - 8 needs 2 more to make 10.
        - 5 can be split into 2 and 3.
        - 8 + 5 can be thought of as 10 + 3.
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

Question blocks should remain structured YAML so Codex can validate and seed them, but the lesson should read like authored curriculum.

Every promoted lesson should include a short student-facing `config.intro` in frontmatter unless the QA report explicitly explains why the first question already provides sufficient exposure. The intro is what the child sees before the scored questions, so it must teach or expose the new idea, model, text, phrase set, memory target, or routine. Do not paste teacher-facing notes directly into the intro.

Use `config.intro` especially for:

- every course-opening and unit-opening lesson,
- every lesson that introduces new vocabulary, symbols, representations, language chunks, text selections, memory targets, or procedures,
- any lesson whose first question would otherwise ask the student to recall, classify, order, match, or complete material that has not yet been shown.

Intro cards should be compact: usually one or two cards, one short paragraph per card, and optional bullets only when they give the exact target words, steps, phrase meanings, examples, or model the student needs before answering. Keep the language addressed to the student.

Hints are optional but recommended for questions where a common wrong answer reveals a fixable misconception. A hint should not appear on the first attempt. It should appear only when the student sees the same question again after answering it incorrectly once already. The hint should guide the next attempt without giving away the answer.

`questionGoal` and `misconception` are research/QA-only authoring metadata. Keep them in research question sets and QA notes, but strip them during promotion into `src/content/curriculum/`. They should not appear in promoted lesson question blocks, D1 seed data, lesson APIs, or offline packs.

## Content Artifacts

The process should produce these artifacts in order.

### 1. Track Research Brief

Purpose: understand the subject, level, standards, learning progression, and instructional risks.

Required contents:

- track and level name,
- intended student profile,
- source list,
- end-of-level outcomes,
- prerequisite knowledge,
- major concept clusters,
- developmental constraints,
- common misconceptions,
- recommended assessment types,
- spiral review priorities,
- notes on what not to teach yet.

### 2. Level Blueprint

Purpose: define what the level is trying to accomplish.

Required contents:

- level mission,
- 5-10 durable outcomes,
- concept progression,
- skill progression,
- vocabulary, representation, model, text, or form progression,
- fluency expectations,
- conceptual understanding expectations,
- application/transfer expectations,
- review and spacing plan,
- mastery evidence for the end of the level,
- source and product constraint note.

### 3. Course Or Track Map

Purpose: divide the level into coherent units.

Required contents:

- ordered units,
- unit purpose,
- unit outcomes,
- key concepts and vocabulary,
- prerequisite dependencies,
- connections to prior and later units,
- misconceptions to address,
- review connections,
- estimated lesson count range,
- notes on review, spacing, or interleaving,
- capstone or transfer task if useful.

### 4. Unit Design Brief

Purpose: decide what the unit teaches and how lessons should sequence.

Required contents:

- unit goal,
- why this unit belongs at this point in the level,
- key concepts,
- required vocabulary/representations,
- prerequisite knowledge,
- common misconceptions,
- lesson sequence rationale,
- review connections to earlier units,
- preparation for later units,
- assessment targets,
- recommended lesson titles with a short purpose for each.

### 5. Lesson Brief

Purpose: define a lesson before writing questions.

Required contents:

- teaching goal,
- student outcome,
- key idea, text, model, form, or representation,
- prerequisite knowledge,
- likely misconceptions,
- evidence of mastery,
- recommended question types and why each fits,
- suggested intro or teaching note,
- notes on cognitive load and reading level.

### 6. Question Set

Purpose: assess and deepen the lesson outcome.

Required contents:

- 6-10 questions for most compact lessons,
- varied question types chosen by learning job,
- clear answer keys,
- useful explanations,
- optional second-attempt hints,
- plausible distractors,
- sequence from exposure or support toward mastery,
- at least one application, explanation, transfer, or synthesis item when appropriate,
- metadata for `questionGoal` and `misconception` during authoring.

### 7. QA Report

Purpose: verify that the lesson is accurate, aligned, and worth shipping.

Required contents:

- answer-key verification,
- lesson-goal alignment,
- unit/level alignment,
- question-type variety review,
- distractor quality review,
- explanation quality review,
- reading load review,
- ambiguity and scoring-risk review,
- final decision: accept, revise, or reject.

## Research Track Status Manifest

`research/track-status.json` tracks each top-level research track's import readiness. Update it during every stage that creates, accepts, rejects, imports, or pilots track-level content.

Status rules:

- `research_only`: research or authoring has started, but the track is not ready for promotion.
- `ready_for_import`: `06-question-sets.md` exists, covers the level, and the track has not yet been promoted into `src/content/curriculum/`.
- `imported`: the track has been promoted into `src/content/curriculum/` and validated.

Stage update rules:

- Stage 1: add or update the track entry after `01-research-brief.md` is created. Keep `status` as `research_only`, set `hasQuestionSets` and `readyForImport` to `false`, keep `imported` as `false`, and include `01-research-brief.md` in `acceptedArtifacts`.
- Stages 2-5: update `acceptedArtifacts` as `02-level-blueprint.md`, `03-course-map.md`, `04-unit-design-briefs/`, and `05-lesson-briefs.md` are created or accepted. Keep `status` as `research_only` until the question set exists.
- Stage 6: after `06-question-sets.md` exists and covers every lesson, set `status` to `ready_for_import`, `hasQuestionSets` to `true`, `readyForImport` to `true`, and keep `imported` as `false`.
- Stage 7: record QA acceptance, revision needs, or blockers in `notes`. If QA rejects or blocks the track, return `status` to `research_only` until the accepted question set is repaired.
- Stage 8: after curriculum promotion and validation pass, set `status` to `imported`, `readyForImport` to `false`, `imported` to `true`, and fill `importBatch` and `importedAt`.
- Stage 9: record pilot findings in `notes`; keep `status` as `imported` unless the track must be pulled from the shipped catalog.

When updating the manifest, preserve existing import history and notes unless the stage result deliberately supersedes them.

## Lesson Sequence

A compact lesson should usually move through some version of:

1. Meaningful exposure or teaching.
2. Guided recognition.
3. Misconception check.
4. Supported practice.
5. Application, explanation, transfer, or production.

This is a learning arc, not a fixed template. Some lessons will need a different shape, and repeated lesson shapes should be intentional.

If the lesson brief is vague, stop and improve it before writing questions. Vague lesson briefs produce generic questions.

## Question Quality Bar

A question is acceptable only when:

- it directly supports the lesson goal,
- the correct answer is accurate and unambiguous,
- the question type fits the learning job,
- distractors are plausible and diagnostic,
- the explanation teaches the reasoning or clue,
- hints, when present, support a second attempt without giving away the answer,
- reading load matches the student level,
- it avoids generic filler,
- it does not rely on duplicate match-pair right-side labels,
- it contributes to a sequence from support toward mastery.

For new material, unsupported recall should not come first. Students should encounter the idea through explanation, context, model, example, or guided recognition before production.

Use `docs/question-types.md` as the source of truth for runtime question shapes, scoring behavior, media fields, lesson config, and detailed question-type examples.

## App-Scorable Question Policy

Promoted curriculum should use question types the app can evaluate meaningfully.

Do not use `constructed-response` or `speaking-prompt` for scored promoted curriculum unless the item is explicitly converted to unscored practice or backed by a real evaluation workflow. If a lesson goal depends on work the app cannot evaluate well, leave that work to school, tutoring, discussion, or offline practice rather than pretending Buddy Blocks can assess it.

Prefer app-scorable alternatives:

- `multiple-choice` for choosing the best explanation, strategy, evidence, or misconception diagnosis.
- `fill-blank`, `multi-blank-cloze`, or `text-input` for constrained answers with clear accepted responses.
- `order-items` for reasoning steps, processes, sentence order, and sequence.
- `match-pairs` for distinct relationships.
- `error-correction` only for finite exact fixes where every valid correction can be listed in `acceptedAnswers`; use `multiple-choice` or another constrained type for open-ended revisions.
- `passage-question` for scenario, source, or word-problem interpretation with selected answers.

## QA Gap Repair

Compact promoted lessons should finish QA with at least 6 accepted app-scorable questions unless the lesson brief and QA report explicitly justify a smaller set.

When QA removes questions and a lesson falls below the compact target:

- add only the number of questions needed to restore the accepted target,
- use the accepted lesson brief and the remaining accepted questions as the source of truth,
- complement the remaining sequence instead of rewriting it,
- do not recreate questions that QA removed,
- do not add broad review, trivia, or template filler,
- use the app-scorable type that best serves the missing learning job,
- include `hint`, `questionGoal`, and `misconception`,
- keep keys stable and consistent with the existing lesson key pattern,
- preserve one valid fenced `question` YAML block per new question.

The repair prompt and current gap inventory live in `docs/research-question-gaps.md`. Treat that file as a working tracker; treat this section and `docs/question-types.md` as the durable policy for future content creation runs.

## Stage Prompts

Use Stage 1 first. After the research brief is accepted, use the combined Stage 2-6 `/goal` prompt when you want Codex to complete the remaining design and authoring artifacts for the whole level in one sustained run.

Do not ask the model to produce multiple track levels in one pass. The combined prompt is for one accepted track level at a time.

### Stage 1: Track-Level Deep Research

Use this with ChatGPT or another research-capable model with browsing enabled.

```text
You are a senior curriculum researcher and learning scientist.

Research the top-level goals, concept progression, and instructional priorities for this track level:

Track: [SUBJECT/TRACK]
Level or grade: [LEVEL/GRADE]
Student profile: [AGE/GRADE/PRIOR EXPERIENCE]
Program context: Buddy Blocks is a compact, mastery-oriented learning app. Lessons are short but should be instructionally serious. We prefer explicit instruction, contextual exposure before recall, retrieval practice, spacing, interleaving, misconception checks, and useful feedback.

Use primary or high-quality sources where possible: official standards, respected scope-and-sequence documents, subject organizations, and learning-science references. Do not invent standards. Cite your sources with links.

Produce a research brief with:
1. End-of-level outcomes.
2. Prerequisite knowledge.
3. Major concept clusters.
4. Recommended progression.
5. Common misconceptions.
6. Developmental constraints and reading/load concerns.
7. Assessment implications.
8. Spiral review priorities.
9. Concepts that should not be taught yet.
10. Source notes explaining how the references shaped the plan.

Do not write units, lessons, or questions yet.

Use this repo only for product constraints.

You may read:
- docs/content-creation.md
- docs/question-types.md
- research/track-status.json

Do not read or use:
- src/content/curriculum
- legacy curriculum generation scripts
- existing generated lesson/question files

Save findings to:
research/[track-level]/01-research-brief.md

Update `research/track-status.json`:
- Add or update the track entry.
- Set `status` to `research_only`.
- Include `01-research-brief.md` in `acceptedArtifacts`.
- Keep `hasQuestionSets`, `readyForImport`, and `imported` false.

When complete, commit your changes and push to origin/master
```

### Stages 2-6: Level Blueprint Through Question Sets

Use this after the research brief is accepted. This prompt intentionally combines the level blueprint, course map, unit design briefs, lesson briefs, and lesson question sets for one track level.

````text
/goal Complete Stages 2-6 for one accepted track level: level blueprint, course map, unit design briefs, lesson briefs, and hand-authored question sets for every lesson in the level.

You are a senior curriculum architect, lesson designer, and assessment item writer. Work top-down from the accepted research brief and write the full set of planning and authoring artifacts for one level. Do not implement anything under `src/content/curriculum` yet.

Track: [SUBJECT/TRACK]
Level or grade: [LEVEL/GRADE]
Track-level slug: [track-level, e.g. grade-03-math]
Accepted research brief: research/[track-level]/01-research-brief.md

Use this repo only for product constraints.

You may read:
- docs/content-creation.md
- docs/question-types.md
- research/track-status.json
- research/[track-level]/01-research-brief.md
- research/grade-03-math/02-level-blueprint.md as a format reference only; do not copy its scope or sequence
- research/grade-03-math/03-course-map.md as a format reference only; do not copy its scope or sequence
- research/grade-03-math/04-unit-design-briefs/ as format references only; do not copy their scope or sequence
- research/grade-03-math/05-lesson-briefs.md as a format reference only; do not copy its lesson plan
- research/grade-03-math/06-question-sets.md as a format reference only; do not copy its questions

Do not read or use:
- src/content/curriculum
- legacy curriculum generation scripts
- existing generated lesson/question files

Create or update these files:
1. `research/[track-level]/02-level-blueprint.md`
2. `research/[track-level]/03-course-map.md`
3. `research/[track-level]/04-unit-design-briefs/[two-digit-unit-slug].md` for every unit
4. `research/[track-level]/05-lesson-briefs.md`
5. `research/[track-level]/06-question-sets.md`
6. `research/track-status.json`

Stage 2: Level Blueprint

Using only the accepted research brief and product constraints, create a level blueprint with:
1. A one-paragraph level mission.
2. 5-10 durable student outcomes.
3. A concept and skill progression from beginning to end of the level.
4. Vocabulary, representation, model, text, or form progression.
5. Fluency expectations, if applicable.
6. Conceptual understanding expectations.
7. Application and transfer expectations.
8. Review and spacing plan.
9. Mastery evidence for the end of the level.
10. Source and product constraint note.

Save it to `research/[track-level]/02-level-blueprint.md`.

Update `research/track-status.json` so the track entry includes `02-level-blueprint.md` in `acceptedArtifacts` and remains `research_only`.

Stage 3: Course Or Track Map

Using the accepted research brief and the level blueprint you just wrote, create an ordered course map. For each unit, include:
1. Unit title.
2. Unit purpose.
3. Student outcomes.
4. Key concepts and vocabulary.
5. Prerequisites.
6. Connections to prior and later units.
7. Misconceptions to address.
8. Suggested lesson count range.
9. Notes on review, spacing, or interleaving.

Do not force every unit into the same number of lessons. The sequence should serve the level goal.

Save it to `research/[track-level]/03-course-map.md`.

Update `research/track-status.json` so the track entry includes `03-course-map.md` in `acceptedArtifacts` and remains `research_only`.

Stage 4: Unit Design Briefs

Create a separate unit design brief for every unit listed in the course map, in exact course-map order. Preserve unit titles and do not add, remove, rename, or reorder units after the course map is written unless you discover a contradiction that must be fixed consistently across the artifacts.

For each unit, include:
1. Unit goal.
2. Why this unit belongs at this point in the level.
3. Key concepts, vocabulary, representations, texts, forms, or models.
4. Prerequisite knowledge.
5. Common misconceptions.
6. Lesson sequence rationale.
7. Review connections to earlier units.
8. Preparation for later units.
9. Assessment targets.
10. Recommended lesson titles with a short purpose for each.

Requirements:
- Make each unit feel distinct in purpose, pacing, and instructional role.
- Avoid a repeated lesson formula across units.
- Each proposed lesson should have a clear instructional job.
- Use cumulative sequencing: earlier units should prepare later ones, and later units should review earlier ones.

Save each brief as `research/[track-level]/04-unit-design-briefs/[two-digit-unit-slug].md`, following the file naming pattern in `research/grade-03-math/04-unit-design-briefs/`.

Update `research/track-status.json` so the track entry includes `04-unit-design-briefs/` in `acceptedArtifacts` and remains `research_only`.

Stage 5: Lesson Briefs

Create a separate lesson brief for every recommended lesson in every unit design brief, preserving unit order and lesson order exactly.

For each lesson, include:
1. Teaching goal.
2. Student outcome.
3. Key idea, model, text, representation, form, or procedure.
4. Prerequisite knowledge.
5. Likely misconceptions.
6. Evidence of mastery.
7. Recommended question types and why each fits.
8. Student-facing intro content for `config.intro`, plus any teacher-facing teaching note separately if needed.
9. Reading-level and cognitive-load constraints.

Requirements:
- Make each lesson target specific enough that question writing can proceed without guessing.
- Avoid generic repetition across lessons.
- Each lesson should have a distinct instructional job within its unit.
- Use cumulative sequencing: lessons should build from exposure to supported practice to application and review.
- Do not leave the first scored question to introduce essential new content by surprise; plan the intro or an exposure-first question deliberately.

Save the level-wide lesson briefs to `research/[track-level]/05-lesson-briefs.md`, following the format in `research/grade-03-math/05-lesson-briefs.md`.

Update `research/track-status.json` so the track entry includes `05-lesson-briefs.md` in `acceptedArtifacts` and remains `research_only`.

Stage 6: Question Authoring

Write a hand-authored question set for every lesson. Do not use a repeated template. Each question must serve the lesson goal from `05-lesson-briefs.md`.

Preferred app-scorable Buddy Blocks question types for promoted curriculum:
- multiple-choice
- text-input
- fill-blank
- match-pairs
- order-items
- passage-question
- multi-blank-cloze
- dialogue-builder
- listening-question
- error-correction
- conjugation-grid
- flash-card

Write 6-10 app-scorable questions per lesson unless the lesson brief gives a stronger reason for a different compact count. For each question, include:
1. key
2. type
3. prompt
4. all required answer data for that type
5. explanation
6. hint, when a second-attempt clue would help
7. questionGoal
8. misconception

Requirements:
- Start with exposure, recognition, or guided reasoning if the concept is new.
- Assume the lesson will have a student-facing `config.intro`; make the first scored question build from that intro instead of asking unsupported recall.
- Move toward application, explanation, transfer, or production when appropriate.
- Use varied question types only when the type fits the learning job.
- Make distractors plausible and diagnostic.
- Write hints that appear only on a second attempt after the student has already missed that question once.
- Hints should point to a strategy, clue, model, rule, or next step without revealing the answer.
- Do not use `constructed-response` or `speaking-prompt` as scored promoted curriculum items.
- Do not use duplicate right-side answers in match-pairs.
- Keep language appropriate for the student level.
- Do not include generic filler questions.
- Do not hide instructional intent inside large YAML arrays; keep a Markdown unit and lesson heading structure and use one fenced `question` YAML block per question.

Save all lesson question sets to `research/[track-level]/06-question-sets.md`, following the format in `research/grade-03-math/06-question-sets.md`.

Update `research/track-status.json` so the track entry includes `06-question-sets.md`, sets `status` to `ready_for_import`, sets `hasQuestionSets` and `readyForImport` to `true`, and keeps `imported` as `false`.

Question set file format:

# [LEVEL/GRADE] [TRACK] Question Sets

Sources: accepted [LEVEL/GRADE] [TRACK] blueprint, course map, unit design briefs, and lesson briefs in `research/[track-level]/`.

## Unit 1: [UNIT TITLE]

### Lesson 1: [LESSON TITLE]

[Optional one-sentence lesson target if it helps preserve intent.]

```question
key: [stable-question-key]
type: [question-type]
prompt: [student-facing prompt]
[all answer data required for the question type]
explanation: [useful feedback]
hint: [optional second-attempt hint]
questionGoal: [what this item checks]
misconception: [misconception this item targets]
```

Workflow requirements:
- Work in order: blueprint, course map, unit design briefs, lesson briefs, then question sets.
- After writing each stage artifact, use it as source material for the next stage.
- Keep files readable as authored curriculum planning documents.
- Use stable slugs and file names.
- Complete every unit and every lesson in the level.
- Do not stop after the first unit or first lesson.
- Do not implement final curriculum files yet.
- Do not modify unrelated files.

Before finishing, verify:
- `02-level-blueprint.md` exists.
- `03-course-map.md` exists.
- every course-map unit has one unit design brief file.
- `05-lesson-briefs.md` covers every recommended lesson from every unit design brief.
- `06-question-sets.md` covers every lesson brief in unit and lesson order.
- every question set has 6-10 app-scorable questions unless explicitly justified.
- no scored promoted question uses `constructed-response` or `speaking-prompt`.
- no question set uses generic random distractors or repeated template filler.
- `research/track-status.json` marks the track `ready_for_import`.
- no files under `src/content/curriculum` were read or modified.

End with a concise completion report listing:
- track and level,
- blueprint path,
- course map path,
- number of unit design briefs,
- number of lesson briefs,
- total question sets and total authored questions,
- any assumptions or risks for Stage 7 QA.

Then commit your changes and push to origin/master
````

### Stage 7: Question QA Review

Use this with a separate model pass, or as a second pass after a pause.

```text
You are a strict curriculum QA reviewer.

Review this lesson brief and question set. Prioritize bugs, weak alignment, ambiguity, wrong answers, poor distractors, unsupported recall, cognitive overload, and generic content.

Lesson brief: [PASTE LESSON BRIEF]

Question set: [PASTE QUESTIONS]

Also read docs/research-question-gaps.md and use its guidance when doing QA.

Also read `research/track-status.json` and update the track `notes` with QA acceptance, revision needs, or blockers. If QA rejects or blocks the question set, set the track back to `research_only` until repaired.

Check:
1. Does every question align with the lesson teaching goal?
2. Are all correct answers accurate?
3. Are prompts unambiguous?
4. Are distractors plausible and useful?
5. Are question types varied for a reason?
6. Does the sequence move from support toward mastery?
7. Are explanations useful for learning?
8. Are hints useful second-attempt supports without giving away the answer?
9. Is the reading/cognitive load appropriate?
10. Does anything feel generic or template-driven?
11. Does the set retain at least 6 accepted app-scorable questions unless explicitly justified?
12. Are any `constructed-response` or `speaking-prompt` items being counted as scored promoted questions?
13. What should be revised before implementation?

Return:
- findings ordered by severity,
- exact question keys affected,
- recommended edits,
- if removals create a count gap, the number of targeted app-scorable replacements needed and where they should fit in the sequence,
- accept/revise/reject decision,
- the `research/track-status.json` status and note update applied.
```

### Stage 8: Codex Implementation Prompt

Use this after a lesson or unit has passed QA.

```text
Implement the accepted content for:

Track: [SUBJECT/TRACK]
Level or grade: [LEVEL/GRADE]
Unit: [UNIT TITLE]
Lesson(s): [LESSON TITLES]

Content to implement:
[PASTE ACCEPTED MARKDOWN LESSON CONTENT OR QUESTION BLOCKS]

Requirements:
- Use the lesson Markdown format.
- Keep frontmatter limited to lesson metadata and runtime lesson config such as `config.intro`.
- Include the accepted student-facing `config.intro` for each promoted lesson unless QA explicitly waived it.
- Put teaching goal, student outcome, key ideas, misconceptions, and questions in the Markdown body.
- Use one `question` fenced YAML block per question.
- Preserve valid YAML inside question blocks.
- Include `hint` only when it would help after one incorrect attempt; do not use hints as first-attempt instruction.
- Strip research/QA-only question metadata such as `questionGoal` and `misconception` from promoted lesson question blocks.
- Do not generate extra lessons or questions.
- Do not modify unrelated files.
- Run available content validation after implementation.
- Update the QA/content log with lesson path, goal, outcome, question count, question types, and QA status.
- After promotion and validation pass, update `research/track-status.json` for the track: set `status` to `imported`, set `readyForImport` to `false`, set `imported` to `true`, and fill `importBatch` and `importedAt`.
```

### Stage 9: Pilot Review Prompt

Use this after a small set of lessons is implemented.

```text
You are reviewing a curriculum pilot.

Pilot scope:
[TRACK/LEVEL/UNITS/LESSONS]

Review the implemented lesson files and summarize:
1. Whether the level goal is visible across the lessons.
2. Whether unit sequencing is coherent.
3. Whether lessons avoid repeated patterns.
4. Whether question types are used appropriately.
5. Whether question difficulty progresses well.
6. Whether explanations teach, not just confirm.
7. Whether hints are well targeted for second attempts.
8. Whether any lessons should be split, combined, reordered, or rewritten.
9. Whether the source format is working for authors and QA.

Update `research/track-status.json` notes for the track with pilot findings or follow-up needs. Keep the track `imported` unless the pilot shows it must be pulled from the shipped catalog.

Return a concise pilot report with recommended changes before scaling content creation and the manifest note update applied.
```

## Suggested Build Order

Start with one high-value pilot rather than all tracks.

Recommended pilot:

1. Grade 3 Math, because it is central, concrete, and exposes whether the format works for procedural, conceptual, and word-problem content.
2. Grammar 1, because it tests foundation-track design and non-math question types.
3. Spanish 1 or Vocabulary Grade 3, because it tests exposure-before-recall and language/vocabulary ladders.

After the pilot is accepted, scale one track level at a time.

## Human Review Gates

Human approval should happen at these points:

1. Research brief accepted.
2. Level blueprint accepted.
3. Course map accepted.
4. Unit brief accepted.
5. Lesson brief accepted.
6. Question set accepted.
7. Implemented lesson accepted in the app.

Skipping these gates will recreate the original problem: lots of valid-looking content with weak instructional intent.

## Codex Responsibilities

Codex should own:

- source format migration,
- `research/track-status.json` updates during implementation and promotion,
- content parser updates,
- schema validation,
- QA reporting tools,
- implementation of accepted content,
- content inventory,
- app/runtime integration,
- seed and validation workflows.

Codex should not be asked to invent final curriculum in bulk without accepted research briefs and lesson briefs.

## ChatGPT Or Research Model Responsibilities

ChatGPT or a research-enabled model should own:

- standards and source research,
- level blueprints,
- course maps,
- unit briefs,
- first-pass lesson briefs,
- first-pass item writing,
- `research/track-status.json` updates during research and authoring stages when working in-repo,
- independent QA review.

The best workflow is collaborative: research model drafts and critiques the curriculum plan; Codex turns accepted content into validated app source.

## Definition Of Done For A Lesson

A lesson is done when:

- The lesson has explicit teaching goal and student outcome sections.
- The lesson has a compact student-facing `config.intro`, or the QA report explicitly explains why it is unnecessary.
- The lesson advances the accepted unit and level blueprint.
- The question set was authored from the lesson brief.
- The accepted question set has at least 6 app-scorable questions unless the QA report explicitly justifies fewer.
- Each question has a clear learning job.
- Correct answers are accurate and unambiguous.
- Explanations help the student understand the reasoning.
- Hints, when present, support a second attempt without revealing the answer.
- Scored promoted questions do not use completion-scored `constructed-response` or `speaking-prompt` types.
- The lesson avoids generic repeated patterns.
- Content validates and renders in the app.
- QA/content log records the lesson goal, outcome, question count, question types, and acceptance decision.
- `research/track-status.json` reflects the track's current status and notes.
