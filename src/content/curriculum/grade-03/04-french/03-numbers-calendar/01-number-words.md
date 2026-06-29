---
id: lesson_grade3_french_number_words
slug: number-words
title: Number Words
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "trois" mean?
    choices:
      - three
      - one
      - two
      - ten
    correctAnswer: three
    explanation: trois means three.
  - type: text-input
    prompt: Type the French for "ten".
    acceptedAnswers:
      - dix
    answerType: text
  - type: fill-blank
    prompt: '"lundi" means ___.'
    sentenceBefore: '"lundi" means'
    sentenceAfter: .
    choices:
      - Monday
      - one
      - two
      - three
    correctAnswer: Monday
  - type: match-pairs
    prompt: Match the number words words.
    pairs:
      - left: trois
        right: three
      - left: dix
        right: ten
      - left: lundi
        right: Monday
  - type: order-items
    prompt: Build "aujourd'hui est lundi".
    items:
      - lundi
      - est
      - aujourd'hui
    correctOrder:
      - aujourd'hui
      - est
      - lundi
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Ami
        line: Quel jour est-ce?
    choices:
      - Aujourd'hui est lundi.
      - Je suis content.
      - Le livre est rouge.
    correctAnswer: Aujourd'hui est lundi.
  - type: passage-question
    prompt: Read the short French resource.
    passageTitle: Number Words
    passage: En francais, on voit "trois" et "dix". On pratique aussi "lundi" dans
      une phrase courte.
    question: Which word or phrase from the resource means "ten"?
    choices:
      - dix
      - un
      - deux
      - trois
    correctAnswer: dix
  - type: speaking-prompt
    prompt: "Say the model sentence: \"aujourd'hui est lundi\"."
    minSeconds: 5
    sampleAnswer: aujourd'hui est lundi
    checklist:
      - Use French
      - Speak clearly
      - Use the target word or phrase
---
