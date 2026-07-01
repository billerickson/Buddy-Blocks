# V3 Content Rebuild Plan

## Purpose

V3 should rebuild curriculum from a blank slate. The existing generated curriculum is useful as evidence of what not to do, but it should not be treated as source content to preserve.

The rebuild should be top-down:

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

## Research Basis

Each track-level plan should be grounded in primary or high-quality curriculum references. Use current sources where possible.

Recommended source categories:

- Subject standards: Common Core, TEKS, state standards, ACTFL/NCSSFL, C3 Framework, NCSS, or other subject-specific standards.
- Scope and sequence references: Core Knowledge, classical education sequences, reputable curriculum maps, AP/course frameworks where relevant.
- Learning science: IES/What Works Clearinghouse practice guides, retrieval practice, spacing, interleaving, explicit instruction, worked examples, and feedback.
- Developmental fit: grade-level reading demands, prerequisite knowledge, cognitive load, and appropriate production expectations.

Every level blueprint should include a short source note explaining which references shaped the plan.

## Recommended Source Format

Use frontmatter for metadata and Markdown body content for instructional intent and questions.

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

Question blocks should remain structured YAML so Codex can validate and seed them, but the lesson should read like authored curriculum.

Hints are optional but recommended for questions where a common wrong answer reveals a fixable misconception. A hint should not appear on the first attempt. It should appear only when the student sees the same question again after answering it incorrectly once already. The hint should guide the next attempt without giving away the answer.

## Content Artifacts

The rebuild should produce these artifacts in order.

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
- skill progression,
- vocabulary and representation progression,
- mastery expectations,
- fluency expectations,
- application/transfer expectations,
- review and spacing plan.

### 3. Course Or Track Map

Purpose: divide the level into coherent units.

Required contents:

- ordered units,
- unit purpose,
- unit outcomes,
- prerequisite dependencies,
- review connections,
- estimated lesson count range,
- capstone or transfer task if useful.

### 4. Unit Design Brief

Purpose: decide what the unit teaches and how lessons should sequence.

Required contents:

- unit goal,
- key concepts,
- required vocabulary/representations,
- common misconceptions,
- lesson sequence rationale,
- assessment targets,
- connections to earlier and later units.

### 5. Lesson Brief

Purpose: define a lesson before writing questions.

Required contents:

- teaching goal,
- student outcome,
- key idea, text, model, form, or representation,
- prerequisite knowledge,
- misconception check,
- evidence of mastery,
- recommended question types,
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

## Stage Prompts

Use these prompts one stage at a time. Do not ask the model to produce the entire curriculum in one pass.

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
- docs/v3-content-rebuild-plan.md
- docs/v3-lesson-authoring.md
- docs/question-types.md
- docs/curriculum-summary.md

Do not read or use:
- src/content/curriculum
- scripts/generate-planned-curriculum.ts
- existing generated lesson/question files

Save findings to:
research/[track-level]/01-research-brief.md
```

### Stage 2: Level Blueprint

Use this after the research brief is accepted.

```text
You are a curriculum architect.

Using only the accepted research brief below, create a level blueprint for Grade 3 Math.

Research brief: /research/grade-03-math/01-research-brief.md

Blueprint will go here: /research/grade-03-math/02-level-blueprint.md


Create a blueprint with:
1. A one-paragraph level mission.
2. 5-10 durable student outcomes.
3. A concept and skill progression from beginning to end of the level.
4. Vocabulary, representation, model, text, or form progression.
5. Fluency expectations.
6. Conceptual understanding expectations.
7. Application and transfer expectations.
8. Review and spacing plan.
9. Mastery evidence for the end of the level.

Keep this top-down. Do not write units, lessons, or questions yet.

Use this repo only for product constraints.

You may read:
- docs/v3-content-rebuild-plan.md
- docs/v3-lesson-authoring.md
- docs/question-types.md
- docs/curriculum-summary.md

Do not read or use:
- src/content/curriculum
- scripts/generate-planned-curriculum.ts
- existing generated lesson/question files
```

### Stage 3: Course Or Track Map

Use this to convert a level blueprint into units.

```text
You are designing the course map for [Grade - Subject] using the blueprint you just created.

Create an ordered course map. For each unit, include:
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
Do not write individual lessons or questions yet.
```

### Stage 4: Unit Design Brief

Use this one unit at a time.

```text
/goal Complete Stage 4 unit design briefs for every unit in this accepted level map.

You are designing all units for one accepted course level, not just one unit.

Track: [SUBJECT/TRACK]
Level or grade: [LEVEL/GRADE]

Accepted level blueprint:
[PASTE BLUEPRINT]

Accepted course map:
[PASTE COURSE MAP]

Create a separate unit design brief for every unit listed in the accepted course map, in the exact course-map order. Preserve the accepted unit titles and do not add, remove, rename, or reorder units unless the course map contains an obvious contradiction that must be flagged.

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
- Complete every unit in the level in one pass.
- Make each unit feel distinct in purpose, pacing, and instructional role.
- Avoid a repeated lesson formula across units.
- Each proposed lesson should have a clear instructional job.
- Use cumulative sequencing: earlier units should prepare later ones, and later units should review earlier ones.
- Keep the level blueprint and course map as the source of truth.
- Do not write question sets yet.
- Do not stop after the first unit.

Output format:

# [TRACK] - [LEVEL/GRADE] Unit Design Briefs

```

### Stage 5: Lesson Brief

Use this one lesson at a time.

```text
/goal Complete Stage 5 lesson briefs for every recommended lesson in every unit of this accepted level.

You are preparing to write compact, high-quality lesson briefs for an entire accepted course level, not just one lesson.

Track: [SUBJECT/TRACK]
Level or grade: [LEVEL/GRADE]

Accepted level blueprint:
[PASTE BLUEPRINT]

Accepted course map:
[PASTE COURSE MAP]

Accepted unit design briefs:
[PASTE ALL UNIT DESIGN BRIEFS]

Create a separate lesson brief for every recommended lesson listed in the accepted unit design briefs, preserving the unit order and lesson order exactly.

For each lesson, include:
1. Teaching goal.
2. Student outcome.
3. Key idea, model, text, representation, form, or procedure.
4. Prerequisite knowledge.
5. Likely misconceptions.
6. Evidence of mastery.
7. Recommended question types and why each fits.
8. Suggested intro/teaching note for the lesson.
9. Reading-level and cognitive-load constraints.

Requirements:
- Complete every lesson brief for every unit in one pass.
- Preserve accepted unit titles and lesson titles.
- Do not add, remove, rename, or reorder lessons unless there is an obvious contradiction that must be flagged.
- Make each lesson target specific enough that final item writing can proceed without guessing.
- Avoid generic repetition across lessons.
- Each lesson should have a distinct instructional job within its unit.
- Use cumulative sequencing: lessons should build from exposure to supported practice to application and review.
- Keep the accepted level blueprint, course map, and unit design briefs as the source of truth.
- Do not write final question sets yet.
- Do not stop after the first lesson or first unit.

Output format:

# [TRACK] - [LEVEL/GRADE] Lesson Briefs

## Unit 1: [UNIT TITLE]

### Lesson 1: [LESSON TITLE]
[brief]

### Lesson 2: [LESSON TITLE]
[brief]

Continue through every lesson in the unit.

## Unit 2: [UNIT TITLE]

Continue until every lesson in every accepted unit has a complete brief.

At the end, include a short completion checklist confirming:
- total units covered,
- total lessons briefed,
- unit order preserved,
- lesson order preserved,
- no final question sets written.
```

### Stage 6: Question Authoring

Use this only after the lesson brief is accepted.

```text
You are an expert assessment item writer.

Write a hand-authored question set for one lesson. Do not use a repeated template. Each question must serve the lesson goal.

Track: [SUBJECT/TRACK]
Level or grade: [LEVEL/GRADE]
Unit: [UNIT TITLE]
Lesson: [LESSON TITLE]

Accepted lesson brief:
[PASTE LESSON BRIEF]

Supported Buddy Blocks question types:
- multiple-choice
- text-input
- fill-blank
- match-pairs
- order-items
- passage-question
- multi-blank-cloze
- constructed-response
- dialogue-builder
- listening-question
- speaking-prompt
- error-correction
- conjugation-grid
- flash-card

Write [6-10] questions. For each question, include:
1. key
2. type
3. prompt
4. all required answer data for that type
5. explanation
6. hint, when a second-attempt clue would help
7. questionGoal
8. misconception, if applicable

Requirements:
- Start with exposure, recognition, or guided reasoning if the concept is new.
- Move toward application, explanation, transfer, or production when appropriate.
- Use varied question types only when the type fits the learning job.
- Make distractors plausible and diagnostic.
- Write hints that appear only on a second attempt after the student has already missed that question once.
- Hints should point to a strategy, clue, model, rule, or next step without revealing the answer.
- Do not use duplicate right-side answers in match-pairs.
- Keep language appropriate for the student level.
- Do not include generic filler questions.

Return the questions as YAML fenced blocks using the `question` code fence format.
```

### Stage 7: Question QA Review

Use this with a separate model pass, or as a second pass after a pause.

```text
You are a strict curriculum QA reviewer.

Review this lesson brief and question set. Prioritize bugs, weak alignment, ambiguity, wrong answers, poor distractors, unsupported recall, cognitive overload, and generic content.

Lesson brief:
[PASTE LESSON BRIEF]

Question set:
[PASTE QUESTIONS]

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
11. What should be revised before implementation?

Return:
- findings ordered by severity,
- exact question keys affected,
- recommended edits,
- accept/revise/reject decision.
```

### Stage 8: Codex Implementation Prompt

Use this after a lesson or unit has passed QA.

```text
Implement the accepted V3 content for:

Track: [SUBJECT/TRACK]
Level or grade: [LEVEL/GRADE]
Unit: [UNIT TITLE]
Lesson(s): [LESSON TITLES]

Content to implement:
[PASTE ACCEPTED MARKDOWN LESSON CONTENT OR QUESTION BLOCKS]

Requirements:
- Use the V3 lesson Markdown format.
- Keep frontmatter limited to metadata.
- Put teaching goal, student outcome, key ideas, misconceptions, and questions in the Markdown body.
- Use one `question` fenced YAML block per question.
- Preserve valid YAML inside question blocks.
- Include `hint` only when it would help after one incorrect attempt; do not use hints as first-attempt instruction.
- Do not generate extra lessons or questions.
- Do not modify unrelated files.
- Run available content validation after implementation.
- Update the QA/rebuild log with lesson path, goal, outcome, question count, question types, and QA status.
```

### Stage 9: Pilot Review Prompt

Use this after a small set of lessons is implemented.

```text
You are reviewing a V3 curriculum pilot.

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

Return a concise pilot report with recommended changes before scaling the rebuild.
```

## Suggested Build Order

Start with one high-value pilot rather than all tracks.

Recommended pilot:

1. Grade 3 Math, because it is central, concrete, and exposes whether the format works for procedural, conceptual, and word-problem content.
2. Grammar I, because it tests foundation-track design and non-math question types.
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
- independent QA review.

The best workflow is collaborative: research model drafts and critiques the curriculum plan; Codex turns accepted content into validated app source.

## Definition Of Done For A V3 Lesson

A V3 lesson is done when:

- The lesson has explicit teaching goal and student outcome sections.
- The lesson advances the accepted unit and level blueprint.
- The question set was authored from the lesson brief.
- Each question has a clear learning job.
- Correct answers are accurate and unambiguous.
- Explanations help the student understand the reasoning.
- Hints, when present, support a second attempt without revealing the answer.
- The lesson avoids generic repeated patterns.
- Content validates and renders in the app.
- QA log records the lesson goal, outcome, question count, question types, and acceptance decision.
