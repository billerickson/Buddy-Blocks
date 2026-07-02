---
id: lesson_grade6_literature_u05_l01_dialogue_as_structured_inquiry
slug: dialogue-as-structured-inquiry
title: Dialogue As Structured Inquiry
xpBase: 10
---

## Teaching Goal

Teach students to read dialogue as an inquiry organized by question, answer, claim, reason, and example.

## Student Outcome

The student can map a short dialogue and identify how a reason or example supports a claim.

## Misconception Checks

Dialogue is random conversation; the last speaker is automatically correct; disagreement means one speaker is foolish.

## Questions

```question
key: cl4_u05_l01_q01_dialogue_question
type: passage-question
prompt: Read the dialogue and identify the central question.
passageTitle: What Is Courage?
passage: |
  Teacher: You say courage is never feeling fear.
  Student: Yes, the fearless person is brave.
  Teacher: Then is the sailor who knows the storm and still rows to rescue a child less brave because he is afraid?
  Student: Perhaps courage is not the lack of fear, but right action while fearing.
question: What question is the dialogue investigating?
choices:
  - What is courage?
  - How are boats built?
  - Why are storms always harmless?
  - Who owns the school?
correctAnswer: What is courage?
explanation: The speakers test and refine a definition of courage.
hint: Look for the idea being defined and questioned.
```

```question
key: cl4_u05_l01_q02_best_next_line
type: dialogue-builder
prompt: Choose the best next line in the inquiry.
turns:
  - speaker: Teacher
    line: If courage were never feeling fear, could a stone be courageous?
  - speaker: Student
    line: No, a stone feels nothing.
choices:
  - Then courage must involve fear and a choice about what is right.
  - Then stones should command ships.
  - Then fear is always shameful.
  - Then the question is finished before we define courage.
correctAnswer: Then courage must involve fear and a choice about what is right.
explanation: The best next line uses the example to refine the definition.
hint: Choose the line that follows the reasoning, not the silliest response.
```

```question
key: cl4_u05_l01_q03_inquiry_sequence
type: order-items
prompt: Put the inquiry moves in order.
items:
  - The student refines the definition
  - The teacher offers a counterexample
  - The student gives an initial definition
  - The teacher names the topic
correctOrder:
  - The teacher names the topic
  - The student gives an initial definition
  - The teacher offers a counterexample
  - The student refines the definition
explanation: A dialogue can move from question to definition, test, and refinement.
hint: Start with the topic before the first answer.
```

```question
key: cl4_u05_l01_q04_claim_reason_match
type: match-pairs
prompt: Match each claim to the reason or example that supports it.
pairs:
  - left: Courage is not simply fearlessness.
    right: A stone feels no fear but cannot be brave.
  - left: A fearful person can act bravely.
    right: The sailor rows into the storm to rescue a child.
  - left: Definitions can be tested.
    right: The teacher uses examples to challenge the first answer.
  - left: The student's idea changes.
    right: The final answer includes right action while fearing.
explanation: In dialogue, reasons and examples test claims.
hint: Match each claim to the detail that proves or develops it.
```

```question
key: cl4_u05_l01_q05_refined_claim
type: passage-question
prompt: Read the dialogue and choose the refined claim.
passageTitle: What Is Courage?
passage: |
  Teacher: You say courage is never feeling fear.
  Student: Yes, the fearless person is brave.
  Teacher: Then is the sailor who knows the storm and still rows to rescue a child less brave because he is afraid?
  Student: Perhaps courage is not the lack of fear, but right action while fearing.
question: Which claim is the student's refined view?
choices:
  - Courage is right action even when fear is present.
  - Courage is never feeling fear.
  - Courage belongs only to sailors.
  - Courage means refusing to rescue anyone.
correctAnswer: Courage is right action even when fear is present.
explanation: The final line changes the first definition by including fear and right action.
hint: The refined claim appears after the teacher's counterexample.
```

```question
key: cl4_u05_l01_q06_dialogue_sentence
type: multi-blank-cloze
prompt: Complete the dialogue analysis.
parts:
  - "The teacher tests the student's first "
  - " with a sailor example, so the student changes the "
  - " of courage."
blanks:
  - correctAnswer: definition
    choices:
      - definition
      - weather
      - stage
  - correctAnswer: meaning
    choices:
      - meaning
      - setting
      - costume
explanation: The dialogue is structured by testing and refining a definition.
hint: Use words that describe thinking, not scenery.
```
