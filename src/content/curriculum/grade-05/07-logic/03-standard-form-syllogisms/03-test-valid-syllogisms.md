---
id: lesson_grade5_logic_u03_l03_test_valid_syllogisms
slug: test-valid-syllogisms
title: Test Valid Syllogisms
xpBase: 10
---

## Teaching Goal

Teach students to test whether a syllogism's conclusion must follow from its premises.

## Student Outcome

The student can recognize simple valid categorical syllogisms using term tracking or Venn support.

## Misconception Checks

Judging validity by factual truth; ignoring quantifiers; thinking the conclusion follows because it uses familiar words.

## Questions

```question
key: u03_l03_q01_valid_definition
type: multiple-choice
prompt: What does it mean for a syllogism to be valid?
choices:
  - If the premises were true, the conclusion would have to be true.
  - The conclusion sounds believable.
  - Every premise is a fact from real life.
  - The argument uses difficult words.
correctAnswer: If the premises were true, the conclusion would have to be true.
explanation: Validity is a must-follow structure test.
hint: Validity asks what follows from the premises.
```

```question
key: u03_l03_q02_choose_valid_conclusion
type: multiple-choice
prompt: "Premises: All lanterns are light sources. All light sources are useful in the dark. Which conclusion follows?"
choices:
  - All lanterns are useful in the dark.
  - All useful things in the dark are lanterns.
  - No lanterns are light sources.
  - Some light sources are not lanterns.
correctAnswer: All lanterns are useful in the dark.
explanation: Lanterns are inside Light Sources, and Light Sources are inside Useful In The Dark, so lanterns are inside that larger category.
hint: Track the all-chain from lanterns to the final category.
```

```question
key: u03_l03_q03_valid_test_steps
type: order-items
prompt: Put the validity-test steps in order.
items:
  - Ask whether the conclusion must follow.
  - Identify the premises.
  - Find the conclusion.
  - Pretend the premises are true.
correctOrder:
  - Identify the premises.
  - Find the conclusion.
  - Pretend the premises are true.
  - Ask whether the conclusion must follow.
explanation: Validity is tested by seeing whether the conclusion must follow from the premises.
hint: First know the parts of the argument.
```

```question
key: u03_l03_q04_negative_valid
type: passage-question
prompt: Read the argument and answer.
passageTitle: Syllogism
passage: |
  No reptiles are mammals.
  All snakes are reptiles.
  Therefore no snakes are mammals.
question: Is the argument valid?
choices:
  - Valid, because snakes are placed inside a category excluded from mammals.
  - Invalid, because snakes and mammals are both animals.
  - Invalid, because the conclusion has the word no.
  - Valid, because every sentence is true in real life.
correctAnswer: Valid, because snakes are placed inside a category excluded from mammals.
explanation: If all snakes are reptiles and no reptiles are mammals, then no snakes can be mammals.
hint: Use the category relationships from the premises.
```

```question
key: u03_l03_q05_some_valid
type: multiple-choice
prompt: "Premises: Some club members are singers. All singers are performers. Which conclusion follows?"
choices:
  - Some club members are performers.
  - All club members are performers.
  - No club members are performers.
  - All performers are club members.
correctAnswer: Some club members are performers.
explanation: The club members who are singers must also be performers because all singers are performers.
hint: A some-claim usually supports a some conclusion, not an all conclusion.
```

```question
key: u03_l03_q06_valid_or_invalid
type: multiple-choice
prompt: All roses are flowers. All flowers are plants. Therefore all roses are plants. How should this argument be classified?
choices:
  - Valid
  - Invalid
  - Not a proposition
  - A command
correctAnswer: Valid
explanation: The premises form an all-chain from roses to flowers to plants, so the conclusion must follow.
hint: Trace the category chain.
```
