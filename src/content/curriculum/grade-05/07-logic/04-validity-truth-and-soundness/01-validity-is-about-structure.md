---
id: lesson_grade5_logic_u04_l01_validity_is_about_structure
slug: validity-is-about-structure
title: Validity Is About Structure
xpBase: 10
---

## Teaching Goal

Stabilize validity as a structure test, not a factual truth test.

## Student Outcome

The student can classify arguments as valid or invalid while setting aside whether the content is actually true.

## Misconception Checks

Valid means true; false content always makes an argument invalid; a true conclusion proves the reasoning was valid.

## Questions

```question
key: u04_l01_q01_structure_test
type: multiple-choice
prompt: Which question tests validity?
choices:
  - If the premises were true, would the conclusion have to be true?
  - Do I like the conclusion?
  - Are all the words familiar?
  - Is the argument about a real animal?
correctAnswer: If the premises were true, would the conclusion have to be true?
explanation: "Validity is the structure test: the conclusion must follow from the premises."
hint: Validity is about what follows, not what sounds familiar.
```

```question
key: u04_l01_q02_valid_invented
type: passage-question
prompt: Read the argument and answer.
passageTitle: Argument
passage: |
  All glimbers are zorps.
  All zorps are flerns.
  Therefore all glimbers are flerns.
question: How should the structure be classified?
choices:
  - Valid, because the conclusion follows from the all-chain.
  - Invalid, because the words are invented.
  - Invalid, because the conclusion is unfamiliar.
  - Sound, because invented words are always true.
correctAnswer: Valid, because the conclusion follows from the all-chain.
explanation: Invented content can still have valid structure. If all glimbers are zorps and all zorps are flerns, all glimbers must be flerns.
hint: Pretend the premises are true and track the categories.
```

```question
key: u04_l01_q03_valid_not_true
type: multiple-choice
prompt: All dragons are reptiles. All reptiles are animals. Therefore all dragons are animals. What is the best validity judgment?
choices:
  - Valid structure, even if the first premise is not a real-world fact.
  - Invalid structure because dragons are not real.
  - Valid only if dragons are pets.
  - Invalid because the conclusion has animals.
correctAnswer: Valid structure, even if the first premise is not a real-world fact.
explanation: The conclusion follows from the premises. Validity does not first ask whether dragons exist.
hint: For validity, temporarily accept the premises and test what follows.
```

```question
key: u04_l01_q04_terms_validity_truth
type: match-pairs
prompt: Match each word to the question it answers.
pairs:
  - left: valid
    right: Does the conclusion have to follow?
  - left: invalid
    right: Could the premises be true and conclusion false?
  - left: "true"
    right: Does this proposition match the facts?
  - left: premise
    right: What reason is being used?
explanation: Truth belongs to propositions. Validity belongs to argument structure.
hint: Valid and invalid ask about the connection between premises and conclusion.
```

```question
key: u04_l01_q05_true_conclusion_invalid
type: multiple-choice
prompt: All cats are mammals. All dogs are mammals. Therefore all cats are dogs. The conclusion is false, but what is the structure problem?
choices:
  - The premises do not force the conclusion.
  - The argument has no middle term at all.
  - The argument is valid because cats and dogs are mammals.
  - The argument is sound because both premises are true.
correctAnswer: The premises do not force the conclusion.
explanation: Two groups can both be mammals without one group being the other.
hint: Ask whether the conclusion must follow, not whether some words are related.
```

```question
key: u04_l01_q06_structure_first
type: order-items
prompt: Put the structure-first checking routine in order.
items:
  - Then consider whether the premises are true if soundness is being asked.
  - Identify premises and conclusion.
  - Ask whether the conclusion must follow.
  - Temporarily treat the premises as true.
correctOrder:
  - Identify premises and conclusion.
  - Temporarily treat the premises as true.
  - Ask whether the conclusion must follow.
  - Then consider whether the premises are true if soundness is being asked.
explanation: Validity comes before truth checking when you are testing argument structure.
hint: Do the structure test before the soundness test.
```
