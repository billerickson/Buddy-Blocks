---
id: lesson_grade6_logic_u02_l04_valid_or_invalid_by_truth_table
slug: valid-or-invalid-by-truth-table
title: Valid Or Invalid By Truth Table
xpBase: 10
---

## Teaching Goal

Use truth-table rows to test simple argument validity.

## Student Outcome

The student can decide whether an argument form is invalid by finding a row with true premises and a false conclusion.

## Key Ideas

A valid argument has no possible row where all premises are true and the conclusion is false.

## Misconception Checks

Judging validity by topic believability; checking only the conclusion column; thinking one true row proves validity.

## Questions

```question
key: u02_l04_q01_counterexample_row
type: multiple-choice
prompt: Which truth-table row shows that an argument form is invalid?
choices:
  - All premises true and the conclusion false
  - All premises true and the conclusion true
  - One premise false and the conclusion false
  - All statements false
correctAnswer: All premises true and the conclusion false
explanation: That row is a counterexample to the claim that the conclusion must follow.
hint: Invalidity needs true premises with a false conclusion.
```

```question
key: u02_l04_q02_validity_rule
type: fill-blank
prompt: Complete the validity rule.
sentenceBefore: A valid argument has no row where the premises are true and the conclusion is
sentenceAfter: .
choices:
  - "false"
  - "true"
  - a question
  - a premise
correctAnswer: "false"
explanation: Validity means the conclusion cannot be false when the premises are true.
hint: Look for the conclusion value that would break the argument.
```

```question
key: u02_l04_q03_marked_row
type: passage-question
prompt: Read the row and answer.
passageTitle: Argument Row
passage: |
  Premise 1: true
  Premise 2: true
  Conclusion: false
question: What does this row show?
choices:
  - The argument form is invalid.
  - The argument form is automatically sound.
  - The conclusion is true in every row.
  - The premises are not propositions.
correctAnswer: The argument form is invalid.
explanation: True premises with a false conclusion show that the conclusion does not have to follow.
hint: This is the exact counterexample row.
```

```question
key: u02_l04_q04_match_evidence
type: match-pairs
prompt: Match each row description to what it can show.
pairs:
  - left: Premises true, conclusion false
    right: Invalid form
  - left: Premises true, conclusion true
    right: One successful row
  - left: Premise false, conclusion false
    right: Not enough to show invalidity
  - left: No true-premise false-conclusion row
    right: Valid form
explanation: Only the true-premise false-conclusion row breaks validity.
hint: Validity focuses on whether the conclusion can be false while the premises are true.
```

```question
key: u02_l04_q05_order_validity_check
type: order-items
prompt: Put the truth-table validity check in order.
items:
  - Check whether the conclusion is false in that row
  - Look for rows where all premises are true
  - Call the form invalid if such a row exists
  - Read the premises and conclusion
correctOrder:
  - Read the premises and conclusion
  - Look for rows where all premises are true
  - Check whether the conclusion is false in that row
  - Call the form invalid if such a row exists
explanation: Validity checks whether true premises can go with a false conclusion.
hint: First know what the premises and conclusion are.
```

```question
key: u02_l04_q06_believable_not_valid
type: multiple-choice
prompt: Why is 'the conclusion sounds true' not enough to prove an argument form is valid?
choices:
  - Validity asks whether the conclusion must follow from the premises.
  - True-sounding conclusions are never propositions.
  - Only false conclusions can be valid.
  - Validity depends on how long the argument is.
correctAnswer: Validity asks whether the conclusion must follow from the premises.
explanation: A conclusion can sound true even when the premises do not force it.
hint: Validity is about support structure, not whether you like the conclusion.
```
