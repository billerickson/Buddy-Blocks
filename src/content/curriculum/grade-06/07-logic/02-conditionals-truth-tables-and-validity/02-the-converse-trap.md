---
id: lesson_grade6_logic_u02_l02_the_converse_trap
slug: the-converse-trap
title: The Converse Trap
xpBase: 10
---

## Teaching Goal

Help students avoid reversing a conditional.

## Student Outcome

The student can distinguish `if P then Q` from the converse `if Q then P`.

## Key Ideas

The converse switches the antecedent and consequent, and it may be false even when the original conditional is true.

## Misconception Checks

Assuming a rule works backward; treating evidence for `Q` as proof of `P`; thinking swapped statements always have the same truth value.

## Questions

```question
key: u02_l02_q01_converse_form
type: multiple-choice
prompt: What is the converse of 'If P, then Q'?
choices:
  - If Q, then P
  - If not P, then not Q
  - P and Q
  - not P
correctAnswer: If Q, then P
explanation: The converse switches the antecedent and consequent.
hint: The converse reverses the direction.
```

```question
key: u02_l02_q02_square_rectangle
type: passage-question
prompt: Read the rule and answer.
passageTitle: Shape Rule
passage: |
  Rule: If a shape is a square, then it is a rectangle.
question: Which sentence is the converse?
choices:
  - If a shape is a rectangle, then it is a square.
  - If a shape is a square, then it is not a rectangle.
  - A square is a kind of rectangle.
  - If a shape is not a square, then it is not a rectangle.
correctAnswer: If a shape is a rectangle, then it is a square.
explanation: The converse switches the if part and the then part.
hint: Put rectangle in the if part and square in the then part.
```

```question
key: u02_l02_q03_converse_not_guaranteed
type: multiple-choice
prompt: "Rule: If a fruit is an apple, then it grows on a tree. Which example shows why the converse is not guaranteed?"
choices:
  - A peach grows on a tree but is not an apple.
  - An apple grows on a tree.
  - Some apples are red.
  - A carrot grows underground.
correctAnswer: A peach grows on a tree but is not an apple.
explanation: The converse would say anything that grows on a tree is an apple, and the peach example shows that can fail.
hint: Find something with the then part true but the if part false.
```

```question
key: u02_l02_q04_match_original_converse
type: match-pairs
prompt: Match each original conditional to its converse.
pairs:
  - left: If it is raining, then the ground is wet.
    right: If the ground is wet, then it is raining.
  - left: If the code is valid, then the door opens.
    right: If the door opens, then the code is valid.
  - left: If a number ends in 0, then it is even.
    right: If a number is even, then it ends in 0.
explanation: Each converse switches the if and then parts.
hint: The same two claims appear, but in the opposite conditional order.
```

```question
key: u02_l02_q05_order_converse_steps
type: order-items
prompt: Put the steps for forming a converse in order.
items:
  - Make the old then part the new if part
  - Find the if part
  - Make the old if part the new then part
  - Find the then part
correctOrder:
  - Find the if part
  - Find the then part
  - Make the old then part the new if part
  - Make the old if part the new then part
explanation: A converse is made by switching the two parts.
hint: First identify both parts; then swap them.
```

```question
key: u02_l02_q06_converse_warning
type: fill-blank
prompt: Complete the warning.
sentenceBefore: A conditional and its converse are
sentenceAfter: .
choices:
  - always the same claim
  - different claims
  - never propositions
  - both negations
correctAnswer: different claims
explanation: Switching antecedent and consequent changes the claim.
hint: The square and rectangle example shows the two directions can differ.
```
