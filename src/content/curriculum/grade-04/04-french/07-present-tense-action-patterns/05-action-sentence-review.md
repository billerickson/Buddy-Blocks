---
id: lesson_grade4_french_action_sentence_review
slug: action-sentence-review
title: Action Sentence Review
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "j'ai besoin de" mean?
    choices:
      - I need
      - I speak
      - I study
      - I read
    correctAnswer: I need
    explanation: j'ai besoin de means I need.
  - type: text-input
    prompt: Type the French for "I read".
    acceptedAnswers:
      - je lis
    answerType: text
  - type: fill-blank
    prompt: "\"j'ecris\" means ___."
    sentenceBefore: "\"j'ecris\" means"
    sentenceAfter: .
    choices:
      - I write
      - I speak
      - I study
      - I need
    correctAnswer: I write
  - type: match-pairs
    prompt: Match the action sentence review words.
    pairs:
      - left: j'ai besoin de
        right: I need
      - left: je lis
        right: I read
      - left: j'ecris
        right: I write
  - type: order-items
    prompt: Build "j'etudie en classe".
    items:
      - classe
      - en
      - j'etudie
    correctOrder:
      - j'etudie
      - en
      - classe
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Ami
        line: Que fais-tu en classe?
    choices:
      - J'etudie en classe.
      - Je voudrais une pomme.
      - La place est a droite.
    correctAnswer: J'etudie en classe.
  - type: passage-question
    prompt: Read the short French resource.
    passageTitle: Action Sentence Review
    passage: En francais, on voit "j'ai besoin de" et "je lis". On pratique aussi
      "j'ecris" dans une phrase courte.
    question: Which word or phrase from the resource means "I read"?
    choices:
      - je lis
      - je parle
      - j'etudie
      - j'ai besoin de
    correctAnswer: je lis
  - type: speaking-prompt
    prompt: "Say the model sentence: \"j'etudie en classe\"."
    minSeconds: 5
    sampleAnswer: j'etudie en classe
    checklist:
      - Use French
      - Speak clearly
      - Use the target word or phrase
---
