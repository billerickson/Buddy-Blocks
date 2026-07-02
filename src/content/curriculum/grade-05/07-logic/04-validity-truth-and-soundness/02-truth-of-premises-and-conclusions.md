---
id: lesson_grade5_logic_u04_l02_truth_of_premises_and_conclusions
slug: truth-of-premises-and-conclusions
title: Truth Of Premises And Conclusions
xpBase: 10
---

## Teaching Goal

Separate truth values of individual propositions from validity of arguments.

## Student Outcome

The student can identify whether a claim is true or false in simple cases and explain that this is different from argument validity.

## Misconception Checks

Calling a single statement valid; using truth of one sentence to judge an entire argument's structure; assuming a false conclusion always means invalid reasoning.

## Questions

```question
key: u04_l02_q01_truth_belongs_to
type: fill-blank
prompt: Truth and falsehood belong to individual ___.
sentenceBefore: Truth belongs to
sentenceAfter: .
choices:
  - propositions
  - validity
  - middle terms
  - Venn circles
correctAnswer: propositions
explanation: A proposition is a statement that can be true or false.
hint: Think back to statements that can be true or false.
```

```question
key: u04_l02_q02_single_statement_label
type: multiple-choice
prompt: A triangle has three sides. Which label fits this one sentence?
choices:
  - True proposition
  - Valid argument
  - Invalid argument
  - Syllogism
correctAnswer: True proposition
explanation: This is one statement, so it can be true or false. It is not an argument by itself.
hint: Validity needs a premise-conclusion relationship.
```

```question
key: u04_l02_q03_truth_vs_validity_prompts
type: match-pairs
prompt: Match each question to the kind of judgment it asks for.
pairs:
  - left: Is this premise factually correct?
    right: truth judgment
  - left: Does the conclusion follow from the premises?
    right: validity judgment
  - left: Are the premises true and the argument valid?
    right: soundness judgment
  - left: Which sentence is being supported?
    right: conclusion identification
explanation: Different logic questions ask for different kinds of answers.
hint: Look for facts, follows, both checks, or argument parts.
```

```question
key: u04_l02_q04_false_proposition
type: multiple-choice
prompt: Which sentence is a false proposition?
choices:
  - A week has eight days.
  - A square has four sides.
  - Some books have pages.
  - No triangles have four equal sides.
correctAnswer: A week has eight days.
explanation: A week has seven days, so the statement is false.
hint: Choose the statement that does not match an ordinary fact.
```

```question
key: u04_l02_q05_not_valid_single_claim
type: error-correction
prompt: Correct the logic label.
sentence: The sentence 'All squares are rectangles' is a valid statement.
acceptedAnswers:
  - The sentence 'All squares are rectangles' is a true proposition.
  - "'All squares are rectangles' is a true proposition."
explanation: A single statement can be true or false. Validity applies to arguments.
hint: Replace valid statement with the label for one true-or-false claim.
```

```question
key: u04_l02_q06_truth_or_structure
type: passage-question
prompt: Read the task and choose what kind of question it is.
passageTitle: Task
passage: |
  Decide whether the premise 'All birds are mammals' matches real-world facts.
question: What kind of judgment is being requested?
choices:
  - Truth judgment
  - Validity judgment
  - Middle-term search
  - Venn region location
correctAnswer: Truth judgment
explanation: The task asks whether one premise matches facts, so it is about truth.
hint: The task does not ask whether a conclusion follows.
```
