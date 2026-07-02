---
id: lesson_grade6_logic_u02_l03_truth_tables_for_connectives
slug: truth-tables-for-connectives
title: Truth Tables For Connectives
xpBase: 10
---

## Teaching Goal

Teach truth rows for `not`, `and`, `or`, and `if...then`.

## Student Outcome

The student can complete simple truth-table values for basic connectives.

## Key Ideas

A truth table checks every possible combination of truth values for the statement letters.

## Misconception Checks

Treating `or` as exclusive; making `and` true with one true part; making every conditional with a false antecedent false.

## Questions

```question
key: u02_l03_q01_not_row
type: fill-blank
prompt: "Complete the row: If P is false, then not P is ___."
sentenceBefore: not P is
sentenceAfter: .
choices:
  - "true"
  - "false"
  - both
  - unknown
correctAnswer: "true"
explanation: Negation flips the truth value.
hint: False becomes true under not.
```

```question
key: u02_l03_q02_and_or_rows
type: multi-blank-cloze
prompt: Complete the truth row when P is true and Q is false.
parts:
  - "P and Q is "
  - ". P or Q is "
  - .
blanks:
  - correctAnswer: "false"
    acceptedAnswers:
      - "false"
  - correctAnswer: "true"
    acceptedAnswers:
      - "true"
explanation: "`And` needs both true, but inclusive `or` needs at least one true."
hint: One false part breaks and; one true part is enough for inclusive or.
```

```question
key: u02_l03_q03_conditional_false_case
type: multiple-choice
prompt: When is 'if P then Q' false?
choices:
  - P is true and Q is false
  - P is true and Q is true
  - P is false and Q is true
  - P is false and Q is false
correctAnswer: P is true and Q is false
explanation: A conditional fails only when the if part happens but the then part does not.
hint: Look for the promise-breaking row.
```

```question
key: u02_l03_q04_match_connective_rules
type: match-pairs
prompt: Match each form to its truth rule.
pairs:
  - left: not P
    right: True when P is false
  - left: P and Q
    right: True when both parts are true
  - left: P or Q
    right: True when at least one part is true
  - left: P -> Q
    right: False only when P is true and Q is false
explanation: Truth tables apply these rules row by row.
hint: Each connective has its own test.
```

```question
key: u02_l03_q05_truth_table_row
type: passage-question
prompt: Read the truth row and answer.
passageTitle: One Truth Row
passage: |
  P = true
  Q = true
question: Which compound statement is false in this row?
choices:
  - not P
  - P and Q
  - P or Q
  - P -> Q
correctAnswer: not P
explanation: If P is true, then not P is false. The other listed statements are true in this row.
hint: Start by flipping P for not P.
```

```question
key: u02_l03_q06_table_purpose
type: multiple-choice
prompt: What is a truth table mainly used for in this unit?
choices:
  - Checking possible truth-value cases for a statement form
  - Finding out what happened in the real world
  - Making a statement sound more official
  - Replacing every sentence with a number
correctAnswer: Checking possible truth-value cases for a statement form
explanation: A truth table tests logical form across possible true/false rows.
hint: Truth tables test structure, not real-world reporting.
```
