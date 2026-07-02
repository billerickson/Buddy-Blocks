---
id: lesson_grade6_logic_u01_l04_and_or_and_inclusive_or
slug: and-or-and-inclusive-or
title: And, Or, And Inclusive Or
xpBase: 10
---

## Teaching Goal

Teach conjunction and inclusive disjunction truth conditions.

## Student Outcome

The student can translate `P and Q` and `P or Q`, and identify when each compound statement is true.

## Key Ideas

`P and Q` is true only when both parts are true; inclusive `P or Q` is true when at least one part is true, including both.

## Misconception Checks

Thinking `or` always means exactly one; treating `and` as true when only one part is true; ignoring the statement key.

## Questions

```question
key: u01_l04_q01_and_truth
type: multiple-choice
prompt: P is true and Q is false. What is the truth value of P and Q?
choices:
  - "True"
  - "False"
  - It depends on the topic
  - Not enough information because P is true
correctAnswer: "False"
explanation: "`P and Q` is true only when both P and Q are true."
hint: For and, one false part makes the whole compound false.
```

```question
key: u01_l04_q02_or_inclusive
type: multiple-choice
prompt: "In logic, P or Q is true when:"
choices:
  - P is true, Q is true, or both are true.
  - Exactly one of P and Q is true.
  - Both P and Q are false.
  - P and Q are questions.
correctAnswer: P is true, Q is true, or both are true.
explanation: "Logic usually uses inclusive or: at least one part is true, including the case where both are true."
hint: Inclusive or includes the both-true case.
```

```question
key: u01_l04_q03_match_connectives
type: match-pairs
prompt: Match each symbolic form to its translation.
pairs:
  - left: P and Q
    right: P is true and Q is true
  - left: P or Q
    right: At least one of P or Q is true
  - left: not P
    right: P is denied
explanation: Each connective tells how the parts combine.
hint: Remember that or means at least one in this lesson.
```

```question
key: u01_l04_q04_compound_translation
type: multiple-choice
prompt: "Key: P = The bus arrives. Q = The doors open. Which sentence translates P and Q?"
choices:
  - The bus arrives and the doors open.
  - The bus arrives or the doors open.
  - The bus does not arrive.
  - If the bus arrives, the doors open.
correctAnswer: The bus arrives and the doors open.
explanation: "`P and Q` joins the two whole claims with and."
hint: Use both claims, and connect them with and.
```

```question
key: u01_l04_q05_truth_conditions_cloze
type: multi-blank-cloze
prompt: Complete the connective rules.
parts:
  - "P and Q is true only when "
  - " parts are true. P or Q is true when "
  - " part is true."
blanks:
  - correctAnswer: both
    acceptedAnswers:
      - both
  - correctAnswer: at least one
    acceptedAnswers:
      - at least one
      - one or both
explanation: And needs both parts; inclusive or needs at least one part.
hint: And is stricter than inclusive or.
```

```question
key: u01_l04_q06_inclusive_or_context
type: passage-question
prompt: Read the sign and answer.
passageTitle: Club Sign
passage: |
  To enter the maker room today, a student must have a safety badge or a teacher pass.
  Ava has both a safety badge and a teacher pass.
question: Does Ava meet the 'badge or pass' condition in inclusive logic?
choices:
  - Yes, because inclusive or allows one or both.
  - No, because or means exactly one.
  - No, because both items cancel each other.
  - Yes, but only if she gives one item away.
correctAnswer: Yes, because inclusive or allows one or both.
explanation: Inclusive or is true when at least one condition is met, including when both are met.
hint: The lesson's or includes the both-true case.
```
