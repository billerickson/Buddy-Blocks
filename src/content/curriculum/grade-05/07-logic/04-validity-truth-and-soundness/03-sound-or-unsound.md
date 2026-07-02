---
id: lesson_grade5_logic_u04_l03_sound_or_unsound
slug: sound-or-unsound
title: Sound Or Unsound?
xpBase: 10
---

## Teaching Goal

Teach soundness as valid structure plus true premises.

## Student Outcome

The student can decide whether a simple argument is sound, unsound because invalid, or unsound because at least one premise is false.

## Misconception Checks

Sound means persuasive; soundness depends only on the conclusion; false premises make an argument invalid instead of unsound.

## Questions

```question
key: u04_l03_q01_sound_definition
type: multiple-choice
prompt: What makes an argument sound?
choices:
  - It is valid and all its premises are true.
  - Its conclusion sounds interesting.
  - It has at least one true sentence.
  - It uses a Venn diagram.
correctAnswer: It is valid and all its premises are true.
explanation: Soundness requires both valid structure and true premises.
hint: Soundness is a two-part test.
```

```question
key: u04_l03_q02_sound_steps
type: order-items
prompt: Put the soundness test in order.
items:
  - If both checks pass, call the argument sound.
  - Check whether the premises are true.
  - Check whether the argument is valid.
  - Identify the premises and conclusion.
correctOrder:
  - Identify the premises and conclusion.
  - Check whether the argument is valid.
  - Check whether the premises are true.
  - If both checks pass, call the argument sound.
explanation: Soundness combines argument structure with true premises.
hint: You cannot test soundness until you know the argument's parts.
```

```question
key: u04_l03_q03_sound_argument
type: passage-question
prompt: Read the argument and answer.
passageTitle: Argument
passage: |
  All squares are rectangles.
  All rectangles are shapes.
  Therefore all squares are shapes.
question: How should this argument be classified?
choices:
  - Sound
  - Invalid
  - Unsound because a premise is false
  - Not an argument
correctAnswer: Sound
explanation: The structure is valid, and both premises are true.
hint: Check both structure and premise truth.
```

```question
key: u04_l03_q04_unsound_false_premise
type: multiple-choice
prompt: All birds are mammals. All robins are birds. Therefore all robins are mammals. What is the best classification?
choices:
  - Unsound because the structure is valid but a premise is false.
  - Sound because the conclusion follows from the premises.
  - Invalid because one premise is false.
  - Not a proposition because robins are animals.
correctAnswer: Unsound because the structure is valid but a premise is false.
explanation: The argument form is valid, but 'All birds are mammals' is false, so the argument is unsound.
hint: False premise affects soundness, not necessarily validity.
```

```question
key: u04_l03_q05_unsound_invalid
type: multiple-choice
prompt: All cats are mammals. All dogs are mammals. Therefore all cats are dogs. Why is this unsound?
choices:
  - It is invalid, even though the premises are true.
  - It is valid and all premises are true.
  - It has no conclusion.
  - It is unsound only because dogs are not real.
correctAnswer: It is invalid, even though the premises are true.
explanation: A sound argument must be valid. This argument's premises do not force the conclusion.
hint: True premises are not enough for soundness.
```

```question
key: u04_l03_q06_soundness_classification
type: match-pairs
prompt: Match each case to the best classification.
pairs:
  - left: Valid structure plus true premises
    right: sound
  - left: Valid structure plus one false premise
    right: unsound from false premise
  - left: Invalid structure plus true premises
    right: unsound from invalid form
  - left: One sentence with no premise-conclusion link
    right: not an argument
explanation: Soundness requires both valid structure and true premises.
hint: Ask whether there is an argument, whether it is valid, and whether the premises are true.
```
