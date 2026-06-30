# Question QA Log

Date: 2026-06-30

## Scope

Canonical curriculum source reviewed: `src/content/curriculum`.

Current inventory:

- 66 tracks
- 714 units
- 2,205 lesson files
- 17,134 authored questions

## QA Decision

The first QA pass found a systemic content-quality issue: many lessons are structurally valid but appear to come from repeated generated patterns in `scripts/generate-planned-curriculum.ts`. These questions are usually answerable, but many are too generic to be considered final lesson content.

Because the product goal is not to ship repeated pattern questions, the right next step is not to mark thousands of generated questions as "unchanged." The right next step is a controlled rewrite of question sets inside the existing lesson files.

Recommended approach:

- Preserve track, unit, lesson IDs, and slugs so seeded progress and URLs stay stable.
- Replace generated question arrays in place with lesson-specific questions.
- Prioritize visible/high-value tracks first.
- Update or retire `scripts/generate-planned-curriculum.ts` before future regeneration can overwrite hand-authored content.
- Use this file as the rewrite QA log once replacement begins.
- Do not use scripts or templates to generate final lesson questions. Scripts may help inventory files, but all final question content should be authored and reviewed by lesson.

No curriculum question files were changed in this pivot pass.

## Replacement Content Plan

The replacement work should follow the learning-science guidance in `docs/lesson-authoring.md`: explicit instruction, contextual exposure before recall, multiple exposures, retrieval practice, spacing/interleaving, and useful feedback.

The goal is not to create a new repeated pattern. Each level, track, unit, and lesson should have a reason to exist, and each question should help the student move toward the lesson and level goal.

### 1. Define The Level Goal

Before rewriting lessons in a track, write or confirm the level goal for that track. This should answer:

- What should a student be able to do by the end of this level?
- What prerequisite ideas does this level assume?
- What later level or subject is this level preparing the student for?
- Which skills require fluency, which require conceptual understanding, and which require application or explanation?

Examples:

- Grade 3 Math should build durable arithmetic, fraction, measurement, data, geometry, and problem-solving foundations.
- Grammar I should help students see sentence structure and use grammar terms in simple analysis.
- Spanish 1 should build confident recognition and production of useful novice phrases in context, not isolated memorization only.

### 2. Define The Unit Purpose

For each unit, write a short purpose statement before authoring questions:

- What concept or skill cluster is this unit teaching?
- How does it advance the level goal?
- What common misconceptions should the unit correct?
- What should be revisited from earlier units?

The unit purpose should guide lesson selection. If two lessons are nearly the same, combine or differentiate them rather than preserving a repeated sequence.

### 3. Write A Lesson Brief Before Questions

Each lesson should have a brief content target before the question set is written. This can live in the QA planning notes first and later be reflected in `config.intro`.

Required lesson brief:

- Teaching goal: the main idea or skill the lesson teaches.
- Student outcome: what the student should be able to do after the lesson.
- Key vocabulary or representations: words, models, diagrams, symbols, or forms the student needs.
- Misconception check: the likely wrong idea the questions should surface.
- Evidence of mastery: what a correct final response should show.

Questions should not be written until this brief is clear.

### 4. Author Smart Questions By Lesson

Question sets should be hand-authored around the lesson brief. Use a variety of question types because the type should match the learning job, not because a template requires it.

Good question variety:

- `multiple-choice` for focused recognition, misconception checks, and choosing between plausible strategies.
- `fill-blank` for precise vocabulary, formulas, sentence parts, and structured recall with support.
- `match-pairs` for distinct relationships only; avoid duplicate right-side labels that make matching ambiguous.
- `order-items` for sequences, rankings, sentence order, proof steps, process steps, and timelines.
- `passage-question` for vocabulary in context, reading comprehension, source use, word problems, and scenario-based reasoning.
- `text-input` for typed production only after enough support or context has been provided.
- `multi-blank-cloze`, `dialogue-builder`, `error-correction`, `conjugation-grid`, `speaking-prompt`, and `constructed-response` when those formats genuinely match the subject goal.

Question quality rules:

- Every question should be specific to the lesson's concept, context, or representation.
- Distractors should represent realistic misconceptions, not random unrelated answers.
- Explanations should name the clue, operation, rule, source evidence, or reasoning step.
- A lesson should move from exposure and recognition toward application or production when appropriate.
- The final question or two should reveal whether the student can transfer the idea, explain it, or use it in context.
- Avoid repeating the same question skeleton across lessons unless the repeated structure is pedagogically useful and the content changes meaningfully.

### 5. Build Lesson Sequences, Not Repeated Lesson Patterns

Within a unit, lessons should form a purposeful sequence. A unit might need:

- a concrete model lesson,
- a vocabulary/representation lesson,
- a guided practice lesson,
- an application or word-problem lesson,
- a cumulative review lesson,
- or a production/performance lesson.

But not every unit needs the same sequence. Some units may need two deep lessons; others may need five short lessons. The structure should serve the level goal.

### 6. QA Acceptance Criteria

A rewritten lesson is acceptable only when all of these are true:

- The lesson has a clear teaching goal and student outcome.
- The questions align with that goal and with the unit/level purpose.
- The correct answers are accurate and unambiguous.
- The question types are varied for a reason, not mechanically repeated.
- Contextual exposure comes before unsupported recall when students are learning new terms, forms, or concepts.
- Distractors are plausible and instructionally useful.
- Explanations provide feedback that would help a student learn from a mistake.
- No match-pairs item has duplicate right-side answers unless the UI can disambiguate them.
- The lesson includes at least one item that checks application, explanation, transfer, or real understanding.

### 7. QA Log Requirements During Rewrite

For each lesson rewritten, record:

- lesson path,
- lesson teaching goal,
- student outcome,
- number of original questions,
- number of unchanged questions,
- number of rewritten questions,
- question types used,
- why questions were changed,
- any remaining concerns.

The count of unchanged questions should be low when the old content is generic. Keeping an old question requires a positive reason, not just the absence of an answer-key error.

## Question Data Storage Recommendation

The current format stores all lesson questions as a large YAML array in frontmatter. That is convenient for parsing, validation, and seeding, but it makes lessons feel like data records instead of authored instructional content. It also made it too easy to generate repeated question patterns.

Recommended change: keep frontmatter for lesson metadata only, and move lesson goals, teaching notes, and question blocks into the Markdown body.

### Recommended Source Format

Use frontmatter for stable lesson metadata:

```md
---
id: lesson_grade3_math_addition_make_ten
slug: make-ten
title: Make Ten
xpBase: 10
---
```

Use Markdown body sections for instructional intent:

```md
## Teaching Goal

Students learn to make 10 as a strategy for adding within 20.

## Student Outcome

The student can break apart one addend to complete a ten, then add the leftover amount.

## Key Ideas

- 8 needs 2 more to make 10.
- 5 can be split into 2 and 3.
- 8 + 5 can be thought of as 10 + 3.
```

Store each interactive question as its own structured block in the Markdown body:

````md
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
```

```question
key: make-ten-explain
type: constructed-response
prompt: Explain how making 10 helps solve 7 + 6.
minWords: 8
sampleAnswer: 7 needs 3 more to make 10, so I split 6 into 3 and 3. Then 10 + 3 = 13.
checklist:
  - Splits 6 into 3 and 3
  - Shows 7 + 3 = 10
  - Gives the final total
```
````

This keeps questions machine-readable while making the lesson file readable as curriculum.

### Storage Rules

- Keep `id`, `slug`, `title`, `xpBase`, `kind`, and high-level config in frontmatter.
- Move teaching goal, student outcome, key ideas, examples, misconceptions, and mastery evidence into Markdown body sections.
- Move final question data out of frontmatter and into one `question` fenced block per item.
- Keep each question block valid YAML so the existing schema can still validate it after extraction.
- Add a stable `key` to each question block. Current generated question IDs depend on lesson order; stable keys would make future reordering less disruptive.
- Allow authored prose between question blocks only for teacher-facing notes or future lesson display, not for hidden answer data.
- Keep runtime D1 storage unchanged if useful. Markdown remains the source of truth; D1 remains the seeded delivery format.

### Parser And Migration Plan

The curriculum loader should eventually support both formats during migration:

- Current format: `questions` array in YAML frontmatter.
- New format: `question` fenced YAML blocks in Markdown body.

Migration should happen in phases:

1. Add parser support for Markdown-body question blocks while keeping frontmatter questions working.
2. Add validation that a lesson cannot mix frontmatter questions and body question blocks.
3. Add schema support for stable question `key` values.
4. Convert one pilot track to the new format.
5. Review the authoring experience and lesson player output.
6. Convert remaining tracks as they are rewritten.
7. Remove or discourage frontmatter question arrays after the rewrite is complete.

### Why This Is Better

- Authors can read the lesson's purpose and questions in one coherent document.
- QA reviewers can judge whether questions align with the teaching goal without mentally reconstructing intent from YAML.
- Question blocks stay structured enough for validation, seeding, scoring, and future tooling.
- Stable question keys reduce accidental churn when questions are reordered.
- The format discourages generic generated arrays because every lesson asks for explicit instructional intent before questions.

## Why The Generated Questions Are Not Enough

Repeated patterns found in the generator include:

- Math lessons reuse broad prompts such as choosing a generic model, matching general vocabulary, ordering a generic problem-solving routine, and answering the same sample computation type across many unrelated units.
- Vocabulary preview lessons often define each word directly in a study-page passage, which checks lookup/recall more than contextual word learning.
- Vocabulary practice lessons reuse broad sentence frames that are not specific to the unit's actual concept.
- Foundation subjects reuse the same eight-question structure with small term-bank substitutions, so Grammar, Logic, Rhetoric, Literature, History/Civics, and Memory Work can feel formulaic.
- Language lessons are more coherent as flash-card ladders, but practice lessons still rely heavily on repeated recognition/translation patterns.

These are content-design issues, not just answer-key issues. A question can be technically correct and still fail QA because it does not align tightly enough with the lesson goal.

## Lessons Manually Checked In This Pass

| Track Area | Lesson | Questions Changed | QA Summary |
| --- | --- | ---: | --- |
| Grade 3 Math | Make Ten | 0 | Questions are mostly sensible for addition practice, but this older hand-authored lesson is more concrete than many generated lessons. |
| Grade 3 Math | Multi-Step Addition And Subtraction Stories | 0 | Good lesson-specific story prompts, but one match-pairs item has duplicate right-side labels. Should be fixed during rewrite. |
| Grade 3 Math | Compare Bigger Numbers | 0 | Core comparisons are accurate, but one true/false match item uses duplicate right-side labels. |
| Grade 3 Math | Compare Fractions With The Same Denominator | 0 | Concept is accurate and aligned, but one true/false match item uses duplicate right-side labels. |
| Grade 3 Math | Compare Fractions With The Same Numerator | 0 | Concept is accurate and aligned, but one true/false match item uses duplicate right-side labels. |
| Grade 3 Math | Quadrilaterals | 0 | Mostly aligned; one match-pairs item duplicates "4 equal sides" for square and rhombus, which is ambiguous in the UI. |
| Grade 3 Math | Area And Perimeter Word Problems | 0 | Lesson-specific area/perimeter prompts are useful; one match-pairs item duplicates "area." |
| Grade 3 Vocabulary | Synonym And Antonym Review | 0 | Correct overall, but one match-pairs item duplicates "synonyms." |
| Grade 3 Vocabulary | Literal Or Figurative | 0 | Correct overall, but one match-pairs item duplicates "figurative." |
| Grade 3 Grammar | Nouns, Pronouns, And Verbs | 0 | Accurate, but one match-pairs item duplicates "noun." |
| Grade 3 Grammar | Subjects And Predicates | 0 | Accurate, but one match-pairs item duplicates both "subject" and "predicate." |
| Grade 3 Logic | Same, Different, And Opposite | 0 | Accurate, but one match-pairs item duplicates "opposites." |
| Grade 3 Logic | If-Then Thinking | 0 | Accurate, but one match-pairs item duplicates "condition" and "result." |

## Objective Issues Found Before The Pivot

These were found with a structural consistency pass, then manually spot-checked as examples of ambiguous UI/scoring risk. They should be fixed when each lesson is rewritten.

| Lesson File | Question | Issue |
| --- | ---: | --- |
| `grade-03/01-math/02a-multi-digit-addition-subtraction/04-multi-step-add-subtract-stories.md` | 6 | Duplicate match right answer: `add`. |
| `grade-03/01-math/03-place-value-rounding/02-compare-bigger-numbers.md` | 6 | Duplicate match right answer: `true`. |
| `grade-03/01-math/07-fractions/05-compare-fractions-same-denominator.md` | 4 | Duplicate match right answer: `true`. |
| `grade-03/01-math/07-fractions/06-compare-fractions-same-numerator.md` | 4 | Duplicate match right answer: `true`. |
| `grade-03/01-math/10-geometry-area-perimeter/02-quadrilaterals.md` | 4 | Duplicate match right answer: `4 equal sides`. |
| `grade-03/01-math/10-geometry-area-perimeter/05-area-perimeter-word-problems.md` | 5 | Duplicate match right answer: `area`. |
| `grade-03/02-vocabulary/03-synonyms-antonyms/06-synonym-antonym-review.md` | 5 | Duplicate match right answer: `synonyms`. |
| `grade-03/02-vocabulary/08-figurative-language/04-literal-or-figurative.md` | 4 | Duplicate match right answer: `figurative`. |
| `grade-03/06-grammar/02-nouns-pronouns-and-verbs/02-nouns-pronouns-and-verbs.md` | 3 | Duplicate match right answer: `noun`. |
| `grade-03/06-grammar/04-subjects-and-predicates/04-subjects-and-predicates.md` | 4 | Duplicate match right answers: `subject`, `predicate`. |
| `grade-03/07-logic/03-same-different-and-opposite/03-same-different-and-opposite.md` | 4 | Duplicate match right answer: `opposites`. |
| `grade-03/07-logic/08-if-then-thinking/08-if-then-thinking.md` | 4 | Duplicate match right answers: `condition`, `result`. |
| `grade-03/08-rhetoric/08-compare-and-contrast/08-compare-and-contrast.md` | 4 | Duplicate match right answers: `compare`, `contrast`. |
| `grade-03/09-literature/06-setting-and-story-world/06-setting-and-story-world.md` | 4 | Duplicate match right answer: `place`. |
| `grade-03/10-history-civics/08-rights-and-responsibilities/08-rights-and-responsibilities.md` | 4 | Duplicate match right answers: `responsibility`, `right`. |
| `grade-06/01-math/03-fractions-decimals-percents/03-compare-rational-numbers.md` | 4 | Duplicate match right answer: `true`. |
| `grade-06/01-math/05a-integers-rational-number-system/03-order-rational-numbers.md` | 5 | Duplicate match right answer: `true`. |
| `grade-06/01-math/07-geometry/04-nets-surface-area.md` | 4 | Duplicate match right answer: `6`. |

## Rewrite QA Log Template

Use this format when rewriting starts:

| Track | Unit | Lesson | Original Questions | Unchanged | Rewritten | Reason |
| --- | --- | --- | ---: | ---: | ---: | --- |
| Grade X Subject | Unit Title | Lesson Title | 8 | 0 | 8 | Replaced generated pattern questions with lesson-specific concept, application, and explanation items. |
