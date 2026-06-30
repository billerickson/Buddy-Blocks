---
id: lesson_grade6_math_mixed_ratio_data_modeling_capstone
slug: ratio-data-modeling-capstone
title: Ratio And Data Modeling Capstone
xpBase: 10
config:
  intro:
    - title: Choose A Model
      body: A good model can be a table, graph, equation, or explanation. Choose the model that makes the relationship easiest to understand.
questions:
  - type: passage-question
    prompt: Choose a model.
    passageTitle: Trail Mix
    passage: A recipe uses 2 cups of raisins for every 5 cups of cereal. A class wants to compare batches with 5, 10, 15, and 20 cups of cereal.
    question: Which model would best show the equivalent ratios?
    choices:
      - a ratio table
      - a spelling list
      - a clock
      - a shape net
    correctAnswer: a ratio table
  - type: text-input
    prompt: If the ratio is 2 cups raisins for 5 cups cereal, type the cups of raisins for 20 cups cereal.
    acceptedAnswers:
      - "8"
    answerType: number
  - type: fill-blank
    prompt: A unit rate of $3 per notebook means 6 notebooks cost ___ dollars.
    sentenceBefore: A unit rate of $3 per notebook means 6 notebooks cost
    sentenceAfter: dollars.
    choices:
      - "18"
      - "9"
      - "6"
      - "3"
    correctAnswer: "18"
  - type: multiple-choice
    prompt: Which equation models "y is 4 times x"?
    choices:
      - y = 4x
      - y = x + 4
      - y = x - 4
      - y = x/4
    correctAnswer: y = 4x
  - type: match-pairs
    prompt: Match each situation to a useful model.
    pairs:
      - left: compare equivalent ratios
        right: table
      - left: show a data distribution
        right: dot plot
      - left: find a total from a unit rate
        right: equation
  - type: order-items
    prompt: Order the modeling steps.
    items:
      - Check whether the answer makes sense.
      - Choose a table, graph, equation, or explanation.
      - Identify the quantities.
    correctOrder:
      - Identify the quantities.
      - Choose a table, graph, equation, or explanation.
      - Check whether the answer makes sense.
  - type: passage-question
    prompt: Interpret the data.
    passageTitle: Practice Times
    passage: Five students practiced 20, 25, 25, 30, and 40 minutes. The center is around 25 to 30 minutes, but 40 is higher than the rest.
    question: Which sentence best describes the data?
    choices:
      - Most times are near 25 to 30 minutes.
      - Every time is exactly 40 minutes.
      - The data cannot be described.
      - All times are below 20 minutes.
    correctAnswer: Most times are near 25 to 30 minutes.
  - type: constructed-response
    prompt: A drink mix uses 3 scoops for 2 bottles of water. Explain one model you could use to find the scoops for 8 bottles.
    sampleAnswer: I could use a ratio table. Since 2 bottles need 3 scoops, 4 bottles need 6 scoops, 6 bottles need 9 scoops, and 8 bottles need 12 scoops.
    minWords: 12
    checklist:
      - Names a model
      - Uses the 3 to 2 ratio
      - Gives or explains 12 scoops
---
