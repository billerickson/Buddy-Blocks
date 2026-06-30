---
id: "lesson_grade3_logic_true_false_and_not_enough_information"
slug: "true-false-and-not-enough-information"
title: "True, False, And Not Enough Information"
xpBase: 10
config:
  intro:
    - title: "Use The Evidence"
      body: "A statement is true if the evidence proves it, false if the evidence disproves it, and unknown if the evidence does not say."
      bullets:
        - "Do not guess beyond the evidence."
        - "Unknown means not enough information."
questions:
  - type: multiple-choice
    prompt: "Evidence: \"The box is empty.\" Statement: \"The box has no toys.\" Best answer?"
    choices:
      - "true"
      - "false"
      - "not enough information"
      - "opposite"
    correctAnswer: "true"
  - type: multiple-choice
    prompt: "Evidence: \"Nina has a red hat.\" Statement: \"Nina has a blue hat.\" Best answer?"
    choices:
      - "true"
      - "false"
      - "not enough information"
      - "same"
    correctAnswer: "false"
  - type: fill-blank
    prompt: "When evidence does not prove or disprove a claim, choose ___."
    sentenceBefore: "When evidence does not prove or disprove a claim, choose"
    sentenceAfter: "."
    choices:
      - "true"
      - "false"
      - "not enough information"
      - "always"
    correctAnswer: "not enough information"
  - type: match-pairs
    prompt: "Match each evidence judgment."
    pairs:
      - left: "Proved by evidence"
        right: "true"
      - left: "Disproved by evidence"
        right: "false"
      - left: "Not stated"
        right: "not enough information"
      - left: "A guess"
        right: "not evidence"
  - type: order-items
    prompt: "Read evidence before judgment."
    items:
      - "decide true, false, or unknown"
      - "read the evidence"
    correctOrder:
      - "read the evidence"
      - "decide true, false, or unknown"
  - type: text-input
    prompt: "Type the judgment: Evidence says \"The dog barked.\" Statement: \"The dog made noise.\""
    acceptedAnswers:
      - "true"
    answerType: "text"
  - type: passage-question
    prompt: "Read the passage and answer."
    passageTitle: "Evidence Box"
    passage: "Three apples are on the table. Two are green."
    question: "Statement: One apple is red."
    choices:
      - "true"
      - "false"
      - "not enough information"
      - "cause"
    correctAnswer: "not enough information"
  - type: constructed-response
    prompt: "Why should you avoid guessing when the evidence is missing?"
    sampleAnswer: "A guess may be wrong because the evidence does not prove it."
---
