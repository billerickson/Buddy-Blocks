---
id: lesson_grade6_logic_u03_l04_choosing_the_right_support_test
slug: choosing-the-right-support-test
title: Choosing The Right Support Test
xpBase: 10
---

## Teaching Goal

Help students select the right evaluation question for deductive, inductive, or abductive reasoning.

## Student Outcome

The student can match a claim to its support type and revise overstrong wording.

## Key Ideas

Different reasoning types need different tests: must follow, likely from evidence, or best explanation.

## Misconception Checks

Using "prove" for every kind of support; calling weak evidence deductive; rejecting a claim instead of revising its strength.

## Questions

```question
key: u03_l04_q01_match_type_test
type: match-pairs
prompt: Match each reasoning type to its best test question.
pairs:
  - left: Deductive
    right: Must the conclusion follow?
  - left: Inductive
    right: How strong is the pattern or evidence?
  - left: Abductive
    right: What best explains the evidence?
explanation: Each support type uses a different evaluation question.
hint: Must, likely, and best explanation are the three signals.
```

```question
key: u03_l04_q02_classify_support
type: passage-question
prompt: Read the argument and answer.
passageTitle: Bus Pattern
passage: |
  The bus has arrived before 8:00 on nine of the last ten school days.
  It will probably arrive before 8:00 tomorrow.
question: Which type of reasoning is this?
choices:
  - Inductive
  - Deductive
  - Abductive
  - Negation
correctAnswer: Inductive
explanation: The argument uses a pattern to support a likely prediction.
hint: A pattern from past examples supports a likely conclusion.
```

```question
key: u03_l04_q03_revise_strength
type: multiple-choice
prompt: "Evidence: The team won the first three games. Which conclusion best matches the support?"
choices:
  - The team has started strongly and may keep doing well.
  - The team is guaranteed to win every game.
  - The team won because of one secret cause.
  - The team cannot lose.
correctAnswer: The team has started strongly and may keep doing well.
explanation: Three wins support a positive prediction, not a guarantee or proven cause.
hint: Use likely language, not certain language.
```

```question
key: u03_l04_q04_best_test_for_explanation
type: multiple-choice
prompt: A student says, 'The plants wilted because they did not get enough water.' Which support test fits best?
choices:
  - Does this explanation fit the evidence better than alternatives?
  - Does the conclusion have to follow from two premises?
  - How large and representative is the sample?
  - Which symbol stands for the whole claim?
correctAnswer: Does this explanation fit the evidence better than alternatives?
explanation: The claim offers an explanation, so abductive testing fits best.
hint: Cause explanations often need comparison with alternatives.
```

```question
key: u03_l04_q05_support_type_cloze
type: multi-blank-cloze
prompt: Complete the support summary.
parts:
  - "Deduction aims for "
  - ". Induction supports what is "
  - ". Abduction chooses the best "
  - .
blanks:
  - correctAnswer: certainty
    acceptedAnswers:
      - certainty
      - guarantee
  - correctAnswer: likely
    acceptedAnswers:
      - likely
      - probable
  - correctAnswer: explanation
    acceptedAnswers:
      - explanation
explanation: The three support types differ in what kind of support they offer.
hint: "Think: must follow, likely pattern, best explanation."
```

```question
key: u03_l04_q06_mixed_passage
type: passage-question
prompt: Read the claim and answer.
passageTitle: Locker Clue
passage: |
  The hallway camera shows Jamal near locker 12 at 8:05.
  Locker 12 was found open at 8:10.
  A student says, "Jamal must have opened it."
question: What is the best critique?
choices:
  - The evidence may suggest a possibility, but it does not guarantee Jamal opened the locker.
  - The evidence proves Jamal opened every locker.
  - The claim is a valid deduction.
  - No explanation can be considered.
correctAnswer: The evidence may suggest a possibility, but it does not guarantee Jamal opened the locker.
explanation: The evidence is not enough to force the conclusion; other explanations are possible.
hint: Ask whether the support is guaranteed or only suggestive.
```
