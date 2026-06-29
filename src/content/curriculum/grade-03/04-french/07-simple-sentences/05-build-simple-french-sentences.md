---
id: lesson_grade3_french_build_simple_french_sentences
slug: build-simple-french-sentences
title: Build Simple French Sentences
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "il est" mean?
    choices:
      - he is
      - I am
      - I have
      - she is
    correctAnswer: he is
    explanation: il est means he is.
  - type: text-input
    prompt: Type the French for "she is".
    acceptedAnswers:
      - elle est
    answerType: text
  - type: fill-blank
    prompt: "\"c'est\" means ___."
    sentenceBefore: "\"c'est\" means"
    sentenceAfter: .
    choices:
      - it is
      - I am
      - I have
      - he is
    correctAnswer: it is
  - type: match-pairs
    prompt: Match the build simple french sentences words.
    pairs:
      - left: il est
        right: he is
      - left: elle est
        right: she is
      - left: c'est
        right: it is
  - type: order-items
    prompt: Build "je suis avec mon ami".
    items:
      - ami
      - mon
      - avec
      - suis
      - je
    correctOrder:
      - je
      - suis
      - avec
      - mon
      - ami
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Ami
        line: Qui es-tu?
    choices:
      - Je suis un eleve.
      - Le menu est ici.
      - Il est dix.
    correctAnswer: Je suis un eleve.
  - type: passage-question
    prompt: Read the short French resource.
    passageTitle: Build Simple French Sentences
    passage: En francais, on voit "il est" et "elle est". On pratique aussi "c'est"
      dans une phrase courte.
    question: Which word or phrase from the resource means "she is"?
    choices:
      - elle est
      - je suis
      - j'ai
      - il est
    correctAnswer: elle est
  - type: speaking-prompt
    prompt: 'Say the model sentence: "je suis avec mon ami".'
    minSeconds: 5
    sampleAnswer: je suis avec mon ami
    checklist:
      - Use French
      - Speak clearly
      - Use the target word or phrase
---
