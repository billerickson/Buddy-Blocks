---
id: lesson_grade5_logic_u03_l01_premises_conclusions_and_standard_form
slug: premises-conclusions-and-standard-form
title: Premises, Conclusions, And Standard Form
xpBase: 10
---

## Teaching Goal

Teach students to arrange two-premise arguments in standard form.

## Student Outcome

The student can identify two premises and a conclusion and place the conclusion after the premises.

## Misconception Checks

Treating every sentence as a premise; putting the most interesting sentence first; confusing explanation order with argument order.

## Questions

```question
key: u03_l01_q01_standard_order
type: order-items
prompt: Put the argument in standard form.
items:
  - Therefore all robins are animals.
  - All birds are animals.
  - All robins are birds.
correctOrder:
  - All robins are birds.
  - All birds are animals.
  - Therefore all robins are animals.
explanation: Standard form lists the premises first and the conclusion last.
hint: The sentence beginning with therefore is the conclusion.
```

```question
key: u03_l01_q02_find_conclusion
type: multiple-choice
prompt: In this argument, which sentence is the conclusion? 'All comics are books. All books are reading materials. Therefore all comics are reading materials.'
choices:
  - All comics are reading materials.
  - All comics are books.
  - All books are reading materials.
  - All reading materials are comics.
correctAnswer: All comics are reading materials.
explanation: The conclusion is the claim after therefore. The other two sentences are premises.
hint: Look for the claim being supported by the other two statements.
```

```question
key: u03_l01_q03_labeled_argument
type: multi-blank-cloze
prompt: Complete the labels for the argument.
parts:
  - "Premise 1: All squares are rectangles. Premise 2: All rectangles are shapes. Conclusion: "
  - .
blanks:
  - correctAnswer: All squares are shapes
    acceptedAnswers:
      - All squares are shapes
      - all squares are shapes
explanation: The conclusion connects squares to shapes using the two premises.
hint: Use the first term from Premise 1 and the last category from Premise 2.
```

```question
key: u03_l01_q04_premise_count
type: passage-question
prompt: Read the short argument and answer.
passageTitle: Argument
passage: |
  All team captains are players.
  Some players are goalkeepers.
  Therefore some team captains are goalkeepers.
question: How many premises are listed before the conclusion?
choices:
  - "2"
  - "1"
  - "3"
  - "0"
correctAnswer: "2"
explanation: This syllogism has two premises before the therefore conclusion.
hint: Count the supporting statements before therefore.
```

```question
key: u03_l01_q05_best_standard_form
type: multiple-choice
prompt: Which choice is written in standard form?
choices:
  - All oak trees are plants. All plants are living things. Therefore all oak trees are living things.
  - Therefore all oak trees are living things. All oak trees are plants. All plants are living things.
  - All oak trees are living things. Therefore all plants are living things. All oak trees are plants.
  - All plants are living things. Therefore all oak trees are plants. All oak trees are living things.
correctAnswer: All oak trees are plants. All plants are living things. Therefore all oak trees are living things.
explanation: Standard form gives premises first and the conclusion after therefore.
hint: Choose the argument where therefore comes before the final claim.
```

```question
key: u03_l01_q06_argument_signals
type: match-pairs
prompt: Match each signal to its usual job in an argument.
pairs:
  - left: therefore
    right: marks the conclusion
  - left: because
    right: introduces a reason
  - left: for example
    right: points to supporting evidence
  - left: so
    right: often leads into what follows
explanation: Signal words can help, but the meaning of the argument still matters.
hint: Premise signals introduce support. Conclusion signals introduce what is supported.
```
