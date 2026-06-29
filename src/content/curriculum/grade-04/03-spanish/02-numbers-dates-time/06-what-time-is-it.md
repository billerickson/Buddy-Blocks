---
id: lesson_grade4_spanish_what_time_is_it
slug: what-time-is-it
title: What Time Is It
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "ochenta" mean?
    choices:
      - eighty
      - twenty
      - thirty
      - forty
    correctAnswer: eighty
    explanation: ochenta means eighty.
  - type: text-input
    prompt: Type the Spanish for "one hundred".
    acceptedAnswers:
      - cien
    answerType: text
  - type: fill-blank
    prompt: '"veinte" means ___.'
    sentenceBefore: '"veinte" means'
    sentenceAfter: .
    choices:
      - twenty
      - thirty
      - forty
      - fifty
    correctAnswer: twenty
  - type: match-pairs
    prompt: Match the what time is it words.
    pairs:
      - left: ochenta
        right: eighty
      - left: cien
        right: one hundred
      - left: veinte
        right: twenty
  - type: order-items
    prompt: Build "hoy es lunes".
    items:
      - lunes
      - es
      - hoy
    correctOrder:
      - hoy
      - es
      - lunes
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Amigo
        line: Que dia es?
    choices:
      - Hoy es lunes.
      - Me llamo Ana.
      - Voy a la biblioteca.
    correctAnswer: Hoy es lunes.
  - type: passage-question
    prompt: Read the short Spanish resource.
    passageTitle: What Time Is It
    passage: El horario dice "ochenta" minutos de lectura. Despues hay "cien"
      minutos de matematicas y "veinte" minutos de arte.
    question: Which word or phrase from the resource means "one hundred"?
    choices:
      - cien
      - veinte
      - treinta
      - cuarenta
    correctAnswer: cien
  - type: speaking-prompt
    prompt: 'Say the model sentence: "hoy es lunes".'
    minSeconds: 5
    sampleAnswer: hoy es lunes
    checklist:
      - Use Spanish
      - Speak clearly
      - Use the target word or phrase
---
