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

All current gaps are in `research/grade-03-math/06-question-sets.md`.

| Unit | Lesson | Current Count | Add | Start Line |
| --- | --- | ---: | ---: | ---: |
| Unit 1: Grade 3 Number Readiness | Equations, Boxes, And Balance | 5 | 1 | 312 |
| Unit 3: Division As Sharing, Grouping, And Unknown Factors | Division As An Unknown Factor | 5 | 1 | 1440 |
| Unit 4: Multiplication And Division Strategies | Doubles And Near Doubles | 5 | 1 | 1770 |
| Unit 4: Multiplication And Division Strategies | Break Apart A Factor | 5 | 1 | 1928 |
| Unit 4: Multiplication And Division Strategies | Nines And Neighbor Facts | 5 | 1 | 2004 |
| Unit 4: Multiplication And Division Strategies | Division From Related Multiplication | 5 | 1 | 2080 |
| Unit 4: Multiplication And Division Strategies | Choose The Most Useful Strategy | 5 | 1 | 2152 |
| Unit 5: Place Value, Rounding, And Whole-Number Operations | Nearest Ten On A Number Line | 5 | 1 | 2306 |
| Unit 5: Place Value, Rounding, And Whole-Number Operations | Multiply By Multiples Of 10 | 5 | 1 | 2718 |
| Unit 5: Place Value, Rounding, And Whole-Number Operations | Estimate, Compute, Or Check? | 5 | 1 | 2790 |
| Unit 6: Four-Operation Word Problems And Equations | Check Units And Reasonableness | 5 | 1 | 3364 |
| Unit 7: Fractions As Equal Parts And Numbers | Explain The Same Whole | 5 | 1 | 4025 |
| Unit 8: Equivalent Fractions And Fraction Comparison | Compare Same Denominators | 5 | 1 | 4181 |
| Unit 8: Equivalent Fractions And Fraction Comparison | Compare Same Numerators | 5 | 1 | 4253 |
| Unit 8: Equivalent Fractions And Fraction Comparison | Same Whole Or Not? | 5 | 1 | 4409 |
| Unit 8: Equivalent Fractions And Fraction Comparison | Choose The Comparison Reason | 5 | 1 | 4481 |
| Unit 9: Measurement, Data, And Applied Quantitative Reasoning | Mixed Measurement And Data Decisions | 5 | 1 | 5050 |
| Unit 10: Area, Arrays, And Multiplication | Use Side Lengths For Area | 5 | 1 | 5209 |
| Unit 11: Perimeter, Geometry, And Shape Attributes | Add Side Lengths Carefully | 5 | 1 | 5449 |
| Unit 12: Cumulative Modeling And Grade 3 Mastery | Measurement And Data Review Cycle | 5 | 1 | 6024 |
| Unit 12: Cumulative Modeling And Grade 3 Mastery | Find And Fix The Error | 3 | 3 | 6176 |

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
