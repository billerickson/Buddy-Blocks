---
id: lesson_grade5_logic_u06_l03_final_argument_tests
slug: final-argument-tests
title: Final Argument Tests
xpBase: 10
---

## Teaching Goal

Assess flexible Logic 3 transfer across categorical, syllogistic, soundness, and conditional reasoning.

## Student Outcome

The student can evaluate mixed short arguments and diagnose the main reasoning mistake or support.

## Misconception Checks

Jumping to an answer before translating; calling true-sounding conclusions valid; reversing conditionals; overreading Venn information; strengthening some into all.

## Questions

```question
key: u06_l03_q01_final_valid_syllogism
type: passage-question
prompt: Read the argument and classify it.
passageTitle: Argument
passage: |
  All stage managers are crew members.
  All crew members are part of the theater team.
  Therefore all stage managers are part of the theater team.
question: What is the best classification?
choices:
  - Valid
  - Invalid because the conclusion is first
  - Invalid because all is always too strong
  - A converse error
correctAnswer: Valid
explanation: The conclusion follows by an all-chain from stage managers to crew members to theater team.
hint: Track the category chain.
```

```question
key: u06_l03_q02_final_converse
type: passage-question
prompt: Read the rule and conclusion.
passageTitle: Rule And Conclusion
passage: |
  Rule: If a ticket has a silver stripe, then it can enter Lane S.
  Conclusion: This ticket can enter Lane S, so it has a silver stripe.
question: What is the best diagnosis?
choices:
  - Converse error
  - Valid direct inference
  - Sound categorical syllogism
  - No quantifier mistake
correctAnswer: Converse error
explanation: The conclusion reverses the rule. The rule does not say only silver-stripe tickets can enter Lane S.
hint: The fact gives the then-part, not the if-part.
```

```question
key: u06_l03_q03_final_soundness
type: multiple-choice
prompt: All mammals are animals. All dolphins are mammals. Therefore all dolphins are animals. The premises are true. Which classification fits?
choices:
  - Sound
  - Invalid
  - Unsound because a premise is false
  - A command, not an argument
correctAnswer: Sound
explanation: The argument is valid, and the premises are true, so it is sound.
hint: Sound means valid plus true premises.
```

```question
key: u06_l03_q04_error_diagnosis_match
type: match-pairs
prompt: Match each reasoning mistake to its diagnosis.
pairs:
  - left: Some students are artists, so all students are artists.
    right: some changed into all
  - left: If a card is red, it goes in Box R. It is in Box R, so it is red.
    right: conditional reversed
  - left: All cats are mammals. All dogs are mammals. Therefore all cats are dogs.
    right: shared larger category
  - left: A single true sentence is called valid.
    right: truth-validity confusion
explanation: Each diagnosis names the specific logic move that went wrong.
hint: Look for quantifier strength, rule direction, middle-term use, or labels.
```

```question
key: u06_l03_q05_final_test_routine
type: order-items
prompt: Put the final argument-test routine in order.
items:
  - Choose the matching logic tool.
  - Decide what follows and name the reason.
  - Translate or identify the argument structure.
  - Read the prompt carefully.
correctOrder:
  - Read the prompt carefully.
  - Translate or identify the argument structure.
  - Choose the matching logic tool.
  - Decide what follows and name the reason.
explanation: Careful reasoning starts with reading and translation before tool use and final judgment.
hint: Do not choose the tool before identifying the structure.
```

```question
key: u06_l03_q06_final_mixed_argument
type: passage-question
prompt: Read the argument and answer.
passageTitle: Argument
passage: |
  Not all practice puzzles are timed puzzles.
  All timed puzzles are challenge puzzles.
  Therefore all practice puzzles are challenge puzzles.
question: Why does the conclusion not follow?
choices:
  - Not all practice puzzles are timed, so the premises do not put every practice puzzle inside challenge puzzles.
  - The conclusion follows because all timed puzzles are challenge puzzles.
  - Not all means no practice puzzles are timed.
  - The argument is sound because the conclusion sounds useful.
correctAnswer: Not all practice puzzles are timed, so the premises do not put every practice puzzle inside challenge puzzles.
explanation: The first premise says at least one practice puzzle is not timed. The premises do not prove that all practice puzzles are challenge puzzles.
hint: Check the strength of not all before accepting an all conclusion.
```
