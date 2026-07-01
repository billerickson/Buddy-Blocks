# Research Question Gaps

This document tracks research question sets that currently fall below the preferred 6-question compact lesson target.

These gaps appear to come from QA removals. Do not recreate removed questions or add filler. Add only app-scorable questions that serve the accepted lesson brief and complement the remaining accepted questions.

## App-Scorable Policy

For v3 promoted curriculum, avoid question types the app cannot meaningfully evaluate.

Do not generate:

- `constructed-response`
- `speaking-prompt`

Prefer app-scorable replacements:

- `multiple-choice` for strategy choice, misconception checks, and choosing the best explanation.
- `fill-blank` or `multi-blank-cloze` for constrained recall.
- `text-input` for exact numeric, word, phrase, or formula answers.
- `match-pairs` for distinct relationships.
- `order-items` for process steps, sequences, and reasoning order.
- `error-correction` for fixing a specific incorrect step, sentence, or expression.
- `passage-question` for scenario or word-problem interpretation with a selected answer.

## Question Sets Needing Additions

No current research question-set gaps are known.

Resolved 2026-07-01: filled the tracked Grade 3 Math gaps in `research/grade-03-math/06-question-sets.md` with targeted app-scorable items. A post-repair count check found all lessons in `grade-03-math`, `grammar-1`, and `memory-works-1` have 6-10 questions.

## Prompt For Filling A Single Lesson Gap

Use this prompt once per lesson. Paste the relevant lesson brief from `research/grade-03-math/05-lesson-briefs.md` and the existing lesson question set from `research/grade-03-math/06-question-sets.md`.

````text
You are a strict Buddy Blocks curriculum item writer.

Task: Add [NUMBER] new app-scorable question(s) to this Grade 3 Math lesson so the lesson has 6 total accepted questions.

Lesson:
[UNIT TITLE]
[LESSON TITLE]

Accepted lesson brief:
[PASTE THE LESSON BRIEF]

Existing accepted questions:
[PASTE THE CURRENT QUESTION BLOCKS FOR THIS LESSON]

Use these references only for product constraints:
- docs/content-creation.md
- docs/question-types.md

Requirements:
- Add exactly [NUMBER] new question(s).
- Do not rewrite the existing accepted questions.
- Do not recreate questions that may have been removed during QA.
- Do not add generic filler.
- Do not use `constructed-response` or `speaking-prompt`.
- Use only app-scorable question types that fit the lesson goal.
- Prefer the type that best fills the learning gap left by the current accepted questions.
- Keep the sequence moving from support toward mastery.
- Use plausible diagnostic distractors.
- Include a second-attempt `hint` that guides without giving away the answer.
- Include `questionGoal` and `misconception`.
- Use stable keys that continue the existing lesson key pattern.
- Preserve valid YAML inside one fenced `question` block per new question.

Return only the new fenced question block(s), plus a one-sentence note explaining where they should be inserted in the lesson sequence.

Question block shape:

```question
key: [stable-question-key]
type: [app-scorable-question-type]
prompt: [student-facing prompt]
[all answer data required for the question type]
explanation: [useful feedback]
hint: [second-attempt support]
questionGoal: [what this item checks]
misconception: [misconception this item targets]
```
````

## QA Checklist For Added Questions

Before accepting an added question, check:

- The lesson now has exactly 6 accepted questions.
- The new question serves the lesson brief.
- The type is app-scorable and appropriate.
- The answer key is accurate and unambiguous.
- Distractors are plausible.
- The explanation teaches reasoning.
- The hint supports a second attempt without revealing the answer.
- The key is unique in the lesson.
- YAML parses cleanly.
