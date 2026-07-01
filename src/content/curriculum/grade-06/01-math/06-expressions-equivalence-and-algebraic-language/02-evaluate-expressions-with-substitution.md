---
id: lesson_grade6_math_u06_l02_evaluate_expressions_with_substitution
slug: evaluate-expressions-with-substitution
title: Evaluate Expressions With Substitution
xpBase: 10
---

## Teaching Goal

Evaluate expressions by substituting a given value for a variable.

## Student Outcome

The student can replace a variable with a value and compute the expression accurately.

## Key Ideas

Substitution turns an algebraic expression into a numerical expression.

## Misconception Checks

Replace only some occurrences of the variable; treat the variable as a label; ignore parentheses or operation order.

## Teaching Note

Show `3x + 4` with `x = 5`, first rewriting as `3(5) + 4`.

## Questions

```question
key: u06_l02_q01_substitute_basic
type: text-input
prompt: Evaluate 3x + 4 when x = 5.
acceptedAnswers:
  - "19"
answerType: number
explanation: "Substitute 5 for x: 3 x 5 + 4 = 15 + 4 = 19."
hint: Replace x with 5 before calculating.
```

```question
key: u06_l02_q02_correct_substitution
type: multiple-choice
prompt: Which expression shows 2n - 1 after substituting n = 8?
choices:
  - 2(8) - 1
  - 2n - 8
  - 8 - 1
  - 2 + 8 - 1
correctAnswer: 2(8) - 1
explanation: The variable n is replaced by 8 everywhere it appears.
hint: Keep the operations the same and replace only n.
```

```question
key: u06_l02_q03_fill_substitution
type: fill-blank
prompt: Complete the evaluation.
sentenceBefore: If a = 6, then a/3 + 5 =
sentenceAfter: .
choices:
  - "2"
  - "7"
  - "11"
  - "18"
correctAnswer: "7"
explanation: 6 divided by 3 is 2, and 2 + 5 = 7.
hint: Substitute 6 for a first.
```

```question
key: u06_l02_q04_match_values
type: match-pairs
prompt: Match each expression value when y = 4.
pairs:
  - left: y + 9
    right: "13"
  - left: 3y
    right: "12"
  - left: 20 - y
    right: "16"
  - left: y/2
    right: "2"
explanation: Replace y with 4 in each expression.
hint: Use y = 4 every time.
```

```question
key: u06_l02_q05_context_evaluate
type: passage-question
prompt: Read the context and answer.
passageTitle: Movie Tickets
passage: |
  The expression 6t gives the cost in dollars for t student tickets.
question: What is the cost when t = 4?
choices:
  - $10
  - $24
  - $64
  - $2
correctAnswer: $24
explanation: 6 x 4 = 24, so 4 tickets cost $24.
hint: Replace t with 4.
```

```question
key: u06_l02_q06_explain_substitution
type: multiple-choice
prompt: Which explanation correctly evaluates 10 - 2r when r = 3?
choices:
  - Replace r with 3, then compute 10 - 2 times 3, which is 4.
  - "Replace r with 3, then subtract left to right: 10 - 2 - 3 = 5."
  - Replace 2 with 3 to get 10 - 3r.
  - First compute 10 - 2, then multiply by 3 to get 24.
correctAnswer: Replace r with 3, then compute 10 - 2 times 3, which is 4.
explanation: Substitution creates a numerical expression that must still follow operation order.
hint: Write 10 - 2(3).
```
