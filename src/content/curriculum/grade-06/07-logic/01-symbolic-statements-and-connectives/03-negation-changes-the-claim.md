---
id: lesson_grade6_logic_u01_l03_negation_changes_the_claim
slug: negation-changes-the-claim
title: Negation Changes The Claim
xpBase: 10
---

## Teaching Goal

Introduce negation as denial of the whole proposition.

## Student Outcome

The student can translate `not P` and identify which complete claim is being denied.

## Key Ideas

Negation changes the truth value of the whole statement: if `P` is true, `not P` is false; if `P` is false, `not P` is true.

## Misconception Checks

Negating only one word; replacing a claim with an unrelated opposite; thinking `not P` means "I dislike P."

## Questions

```question
key: u01_l03_q01_not_p_translation
type: multiple-choice
prompt: "Key: P = The camera is recording. What does not P mean?"
choices:
  - The camera is not recording.
  - The camera is expensive.
  - The camera is recording loudly.
  - The camera might record later.
correctAnswer: The camera is not recording.
explanation: Negation denies the whole claim P.
hint: Keep the same claim, then deny it.
```

```question
key: u01_l03_q02_match_negations
type: match-pairs
prompt: Match each claim to its accurate negation.
pairs:
  - left: The door is locked.
    right: The door is not locked.
  - left: Maya finished the puzzle.
    right: Maya did not finish the puzzle.
  - left: The number is even.
    right: The number is not even.
  - left: The switch is on.
    right: The switch is not on.
explanation: Each negation denies the whole original claim.
hint: Look for the same claim with not added to deny it.
```

```question
key: u01_l03_q03_truth_flip
type: fill-blank
prompt: If P is true, then not P is ___.
sentenceBefore: not P is
sentenceAfter: .
choices:
  - "true"
  - "false"
  - both true and false
  - not a statement
correctAnswer: "false"
explanation: Negation flips the truth value of the whole statement.
hint: If the claim is true, its denial cannot also be true.
```

```question
key: u01_l03_q04_not_whole_claim
type: multiple-choice
prompt: "Key: P = The blue team won the final game. Which is the best translation of not P?"
choices:
  - The blue team did not win the final game.
  - The red team won every game.
  - The blue team won a practice game.
  - The final game was exciting.
correctAnswer: The blue team did not win the final game.
explanation: The negation denies the exact whole claim, not a different story.
hint: Keep the same team and same game, then deny the win.
```

```question
key: u01_l03_q05_negation_cloze
type: multi-blank-cloze
prompt: Complete the truth sentence.
parts:
  - "If P is false, then not P is "
  - ". If P is true, then not P is "
  - .
blanks:
  - correctAnswer: "true"
    acceptedAnswers:
      - "true"
  - correctAnswer: "false"
    acceptedAnswers:
      - "false"
explanation: Negation reverses the truth value of P.
hint: Negation flips false to true and true to false.
```

```question
key: u01_l03_q06_short_context
type: passage-question
prompt: Read the key and answer.
passageTitle: Weather Key
passage: |
  P = It is raining after lunch.
  The weather report says P is false.
question: Which statement must be true?
choices:
  - It is not raining after lunch.
  - It is snowing after lunch.
  - It rained before lunch.
  - The weather report is not a proposition.
correctAnswer: It is not raining after lunch.
explanation: If P is false, then the negation of P is true.
hint: Use only the claim in P and its negation.
```
