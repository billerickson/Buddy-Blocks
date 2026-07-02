---
id: lesson_grade5_logic_u06_l02_choose_the_right_logic_tool
slug: choose-the-right-logic-tool
title: Choose The Right Logic Tool
xpBase: 10
---

## Teaching Goal

Help students choose an evaluation tool based on the structure of an argument.

## Student Outcome

The student can decide whether a prompt calls for categorical translation, Venn reasoning, syllogism testing, soundness checking, or conditional rule testing.

## Misconception Checks

Using a Venn diagram for every argument; using truth checks when validity is being asked; using conditional tests for categorical claims.

## Questions

```question
key: u06_l02_q01_tool_match
type: match-pairs
prompt: Match each argument feature to a useful logic tool.
pairs:
  - left: All, no, and some category claims
    right: Venn diagram
  - left: Two categorical premises and a conclusion
    right: syllogism test
  - left: Valid plus true premises?
    right: soundness check
  - left: If-then rule direction
    right: conditional test
explanation: The structure of the argument tells which tool will help.
hint: Look for categories, two-premise form, truth-plus-validity, or if-then language.
```

```question
key: u06_l02_q02_best_tool_categories
type: multiple-choice
prompt: A prompt asks whether a diagram proves 'Some athletes are musicians.' Which tool is most useful?
choices:
  - Venn diagram reading
  - Converse test
  - Soundness check
  - Question-command sorting
correctAnswer: Venn diagram reading
explanation: The prompt is about a categorical some-claim and diagram evidence.
hint: Some, all, and no category claims often fit Venn reasoning.
```

```question
key: u06_l02_q03_best_tool_conditional
type: multiple-choice
prompt: "A prompt says: 'If a card is gold, then it opens Gate G. This card opens Gate G. Does it have to be gold?' Which tool fits best?"
choices:
  - Conditional rule direction test
  - Venn no-overlap test
  - Subject-predicate term labeling only
  - Fact-family check
correctAnswer: Conditional rule direction test
explanation: The prompt asks whether an if-then rule works backward.
hint: Look for if-then language.
```

```question
key: u06_l02_q04_best_tool_soundness
type: multiple-choice
prompt: A prompt asks whether an argument is valid and has true premises. Which tool fits?
choices:
  - Soundness check
  - Venn region naming only
  - Converse identification only
  - Term versus proposition sorting
correctAnswer: Soundness check
explanation: Soundness is the combined test of valid structure and true premises.
hint: Valid plus true premises points to soundness.
```

```question
key: u06_l02_q05_tool_selection_passage
type: passage-question
prompt: Read the task and choose the best first tool.
passageTitle: Task
passage: |
  All library helpers are volunteers.
  All volunteers are school community members.
  Therefore all library helpers are school community members.
question: Which tool is the best first choice?
choices:
  - Syllogism validity test
  - Converse and inverse test
  - Truth of one proposition only
  - Command sorting
correctAnswer: Syllogism validity test
explanation: This is a two-premise categorical argument with a conclusion.
hint: Look for two premises and a therefore conclusion.
```

```question
key: u06_l02_q06_tool_choice_steps
type: order-items
prompt: Put the tool-choice routine in order.
items:
  - Choose the tool that fits that structure.
  - Read the prompt for its main structure.
  - Use the tool to answer only what is asked.
  - Notice whether it uses categories, if-then rules, or truth plus validity.
correctOrder:
  - Read the prompt for its main structure.
  - Notice whether it uses categories, if-then rules, or truth plus validity.
  - Choose the tool that fits that structure.
  - Use the tool to answer only what is asked.
explanation: A careful tool choice starts with structure, not habit.
hint: Read first, classify the structure second.
```
