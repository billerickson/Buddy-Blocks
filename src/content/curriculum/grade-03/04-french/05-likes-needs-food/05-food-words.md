---
id: lesson_grade3_french_food_words
slug: food-words
title: Food Words
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "j'aime" mean?
    choices:
      - I like
      - I do not like
      - I want
      - I need
    correctAnswer: I like
    explanation: j'aime means I like.
  - type: text-input
    prompt: Type the French for "I do not like".
    acceptedAnswers:
      - je n'aime pas
      - je n aime pas
    answerType: text
  - type: fill-blank
    prompt: '"je veux" means ___.'
    sentenceBefore: '"je veux" means'
    sentenceAfter: .
    choices:
      - I want
      - I like
      - I do not like
      - I need
    correctAnswer: I want
  - type: match-pairs
    prompt: Match the food words words.
    pairs:
      - left: j'aime
        right: I like
      - left: je n'aime pas
        right: I do not like
      - left: je veux
        right: I want
  - type: order-items
    prompt: Build "j'aime la pomme".
    items:
      - pomme
      - la
      - j'aime
    correctOrder:
      - j'aime
      - la
      - pomme
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Ami
        line: Qu est-ce que tu aimes?
    choices:
      - J'aime la pomme.
      - Je suis professeur.
      - Le crayon est vert.
    correctAnswer: J'aime la pomme.
  - type: passage-question
    prompt: Read the short French resource.
    passageTitle: Food Words
    passage: En francais, on voit "j'aime" et "je n'aime pas". On pratique aussi "je
      veux" dans une phrase courte.
    question: Which word or phrase from the resource means "I do not like"?
    choices:
      - je n'aime pas
      - j'aime
      - je veux
      - j'ai besoin de
    correctAnswer: je n'aime pas
  - type: speaking-prompt
    prompt: "Say the model sentence: \"j'aime la pomme\"."
    minSeconds: 5
    sampleAnswer: j'aime la pomme
    checklist:
      - Use French
      - Speak clearly
      - Use the target word or phrase
---
