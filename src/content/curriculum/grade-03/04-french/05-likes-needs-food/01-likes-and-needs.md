---
id: lesson_grade3_french_likes_and_needs
slug: likes-and-needs
title: Likes And Needs
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "l'eau" mean?
    choices:
      - water
      - I like
      - I do not like
      - I want
    correctAnswer: water
    explanation: l'eau means water.
  - type: text-input
    prompt: Type the French for "bread".
    acceptedAnswers:
      - le pain
    answerType: text
  - type: fill-blank
    prompt: '"la pomme" means ___.'
    sentenceBefore: '"la pomme" means'
    sentenceAfter: .
    choices:
      - apple
      - I like
      - I do not like
      - I want
    correctAnswer: apple
  - type: match-pairs
    prompt: Match the likes and needs words.
    pairs:
      - left: l'eau
        right: water
      - left: le pain
        right: bread
      - left: la pomme
        right: apple
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
    passageTitle: Likes And Needs
    passage: En francais, on voit "l'eau" et "le pain". On pratique aussi "la pomme"
      dans une phrase courte.
    question: Which word or phrase from the resource means "bread"?
    choices:
      - le pain
      - j'aime
      - je n'aime pas
      - je veux
    correctAnswer: le pain
  - type: speaking-prompt
    prompt: "Say the model sentence: \"j'aime la pomme\"."
    minSeconds: 5
    sampleAnswer: j'aime la pomme
    checklist:
      - Use French
      - Speak clearly
      - Use the target word or phrase
---
