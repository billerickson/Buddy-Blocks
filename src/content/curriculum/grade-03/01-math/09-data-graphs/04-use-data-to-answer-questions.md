---
id: lesson_grade3_math_data_use_data_questions
slug: use-data-to-answer-questions
title: Use Data To Answer Questions
xpBase: 10
questions:
  - type: passage-question
    prompt: Read the data and answer.
    passageTitle: Class Pets
    passage: "Votes: hamster 9, turtle 6, fish 12, rabbit 9."
    question: Which pet got the most votes?
    choices:
      - hamster
      - turtle
      - fish
      - rabbit
    correctAnswer: fish
  - type: multiple-choice
    prompt: Using the class pet data, how many more votes did fish get than turtle?
    choices:
      - "3"
      - "6"
      - "12"
      - "18"
    correctAnswer: "6"
  - type: text-input
    prompt: Using the class pet data, type the total votes for hamster and rabbit.
    acceptedAnswers:
      - "18"
    answerType: number
  - type: fill-blank
    prompt: To find how many more, ___ the smaller value from the larger value.
    sentenceBefore: To find how many more,
    sentenceAfter: the smaller value from the larger value.
    choices:
      - subtract
      - multiply
      - round
      - rename
    correctAnswer: subtract
  - type: match-pairs
    prompt: Match each data question to the operation.
    pairs:
      - left: How many in all?
        right: add
      - left: How many more?
        right: subtract
      - left: Each picture equals 2, with 5 pictures
        right: multiply
  - type: order-items
    prompt: Order the values from least to greatest.
    items:
      - "12"
      - "6"
      - "9"
    correctOrder:
      - "6"
      - "9"
      - "12"
  - type: text-input
    prompt: A survey has 7 yes votes and 11 no votes. Type the total votes.
    acceptedAnswers:
      - "18"
    answerType: number
  - type: multiple-choice
    prompt: Which answer explains data clearly?
    choices:
      - More students chose fish than turtle because 12 is greater than 6.
      - Fish is blue.
      - The graph has numbers.
      - Turtle comes after fish.
    correctAnswer: More students chose fish than turtle because 12 is greater than 6.
---
