---
id: lesson_grade3_math_multi_digit_multi_step_stories
slug: multi-step-add-subtract-stories
title: Multi-Step Addition And Subtraction Stories
xpBase: 10
config:
  intro:
    - title: One Step At A Time
      body: Multi-step stories often ask you to add once, subtract once, then check whether the final answer fits the question.
      bullets:
        - Find what changes first.
        - Write an equation for each step.
        - Answer the final question, not only the first step.
questions:
  - type: passage-question
    prompt: Solve the story.
    passageTitle: Book Fair
    passage: The book fair started with 356 books. A teacher added 128 more books. Then students bought 247 books.
    question: How many books were left?
    choices:
      - "237"
      - "247"
      - "484"
      - "731"
    correctAnswer: "237"
    explanation: First add 356 + 128 = 484. Then subtract 484 - 247 = 237.
  - type: text-input
    prompt: A team scored 248 points in the morning and 175 in the afternoon. Then 96 points were removed after a scoring check. Type the final score.
    acceptedAnswers:
      - "327"
    answerType: number
  - type: fill-blank
    prompt: 438 + 126 - 205 = ___.
    sentenceBefore: 438 + 126 - 205 =
    sentenceAfter: .
    choices:
      - "359"
      - "349"
      - "559"
      - "769"
    correctAnswer: "359"
  - type: order-items
    prompt: "Order the steps for this story: 275 stickers, 146 more stickers, then 188 stickers used."
    items:
      - Subtract 188 from the total.
      - Add 275 and 146.
      - Read the final question.
    correctOrder:
      - Read the final question.
      - Add 275 and 146.
      - Subtract 188 from the total.
  - type: multiple-choice
    prompt: Which equation matches "624 cans collected, 185 recycled, then 92 more collected"?
    choices:
      - 624 - 185 + 92
      - 624 + 185 - 92
      - 624 - 185 - 92
      - 185 + 92 - 624
    correctAnswer: 624 - 185 + 92
  - type: match-pairs
    prompt: Match each story step to the operation.
    pairs:
      - left: more were added
        right: add
      - left: some were used
        right: subtract
      - left: find how many in all
        right: add
  - type: text-input
    prompt: The answer to 624 - 185 + 92 is what?
    acceptedAnswers:
      - "531"
    answerType: number
  - type: multiple-choice
    prompt: Which estimate checks 624 - 185 + 92?
    choices:
      - 600 - 200 + 100 = 500
      - 600 + 200 + 100 = 900
      - 600 - 100 - 100 = 400
      - 700 - 200 + 200 = 700
    correctAnswer: 600 - 200 + 100 = 500
    explanation: The exact answer 531 is close to 500.
---
