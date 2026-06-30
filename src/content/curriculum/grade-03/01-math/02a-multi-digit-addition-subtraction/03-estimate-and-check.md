---
id: lesson_grade3_math_multi_digit_estimate_and_check
slug: estimate-and-check
title: Estimate And Check
xpBase: 10
config:
  intro:
    - title: Estimate First
      body: Estimation helps you predict whether an exact answer makes sense.
      bullets:
        - Round numbers to friendly tens or hundreds.
        - Solve the exact problem.
        - Compare the exact answer to the estimate.
questions:
  - type: multiple-choice
    prompt: Which estimate best checks 396 + 218?
    choices:
      - 400 + 200 = 600
      - 300 + 200 = 500
      - 400 + 300 = 700
      - 900 + 200 = 1100
    correctAnswer: 400 + 200 = 600
  - type: text-input
    prompt: Round 476 to the nearest hundred.
    acceptedAnswers:
      - "500"
    answerType: number
  - type: fill-blank
    prompt: 721 - 286 is close to 700 - 300, so it is close to ___.
    sentenceBefore: 721 - 286 is close to 700 - 300, so it is close to
    sentenceAfter: .
    choices:
      - "400"
      - "500"
      - "300"
      - "1000"
    correctAnswer: "400"
  - type: multiple-choice
    prompt: Maya says 248 + 391 = 839. Which estimate shows her answer is too high?
    choices:
      - 200 + 400 = 600
      - 300 + 400 = 700
      - 200 + 300 = 500
      - 800 + 300 = 1100
    correctAnswer: 200 + 400 = 600
    explanation: The exact answer should be near 600, not near 800.
  - type: match-pairs
    prompt: Match each exact problem to a useful estimate.
    pairs:
      - left: 512 + 189
        right: 500 + 200
      - left: 843 - 376
        right: 800 - 400
      - left: 298 + 416
        right: 300 + 400
  - type: order-items
    prompt: Order a good check routine.
    items:
      - Compare the exact answer to the estimate.
      - Round to friendly numbers.
      - Solve the exact problem.
    correctOrder:
      - Round to friendly numbers.
      - Solve the exact problem.
      - Compare the exact answer to the estimate.
  - type: text-input
    prompt: Type the exact answer for 396 + 218.
    acceptedAnswers:
      - "614"
    answerType: number
  - type: multiple-choice
    prompt: Is 614 reasonable for 396 + 218?
    choices:
      - Yes, because it is close to 600
      - No, because it should be close to 100
      - No, because addition answers always get smaller
      - Yes, because it is close to 900
    correctAnswer: Yes, because it is close to 600
---
