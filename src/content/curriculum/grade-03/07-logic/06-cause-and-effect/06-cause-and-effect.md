---
id: "lesson_grade3_logic_cause_and_effect"
slug: "cause-and-effect"
title: "Cause And Effect"
xpBase: 10
config:
  intro:
    - title: "Why It Happened"
      body: "A cause is why something happened. An effect is what happened because of the cause."
      bullets:
        - "Because often points to a cause."
        - "So often points to an effect."
questions:
  - type: multiple-choice
    prompt: "The floor got wet because the cup spilled. What is the cause?"
    choices:
      - "the floor got wet"
      - "the cup spilled"
      - "the floor was clean"
      - "the cup was blue"
    correctAnswer: "the cup spilled"
  - type: multiple-choice
    prompt: "The wind blew, so the kite rose. What is the effect?"
    choices:
      - "the wind blew"
      - "the kite rose"
      - "the string was long"
      - "the field was open"
    correctAnswer: "the kite rose"
  - type: fill-blank
    prompt: "A ___ tells why something happened."
    sentenceBefore: "A"
    sentenceAfter: "tells why something happened."
    choices:
      - "cause"
      - "category"
      - "question"
      - "shape"
    correctAnswer: "cause"
  - type: match-pairs
    prompt: "Match cause to likely effect."
    pairs:
      - left: "Rain fell"
        right: "The ground got wet"
      - left: "The bell rang"
        right: "Class began"
      - left: "The oven was hot"
        right: "The bread baked"
      - left: "The lamp turned on"
        right: "The room got brighter"
  - type: order-items
    prompt: "Put the cause before the effect."
    items:
      - "The plant wilted."
      - "No one watered the plant."
    correctOrder:
      - "No one watered the plant."
      - "The plant wilted."
  - type: text-input
    prompt: "Type the signal word in \"I wore a coat because it was cold.\""
    acceptedAnswers:
      - "because"
    answerType: "text"
  - type: passage-question
    prompt: "Read the passage and answer."
    passageTitle: "Cause Clue"
    passage: "Sam forgot his lunch, so he called home."
    question: "Why did Sam call home?"
    choices:
      - "He forgot his lunch."
      - "He wanted a book."
      - "It was raining."
      - "He finished math."
    correctAnswer: "He forgot his lunch."
  - type: constructed-response
    prompt: "Write one possible effect of leaving ice in the sun."
    sampleAnswer: "The ice will melt."
---
