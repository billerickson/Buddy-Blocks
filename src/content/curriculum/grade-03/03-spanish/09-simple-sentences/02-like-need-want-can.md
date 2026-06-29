---
id: lesson_grade3_spanish_like_need_want_can
slug: like-need-want-can
title: Like, Need, Want, Can
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "Puedo leer" mean?
    choices:
      - I can read
      - I need to read
      - I want bread
      - I like water
    correctAnswer: I can read
  - type: fill-blank
    prompt: '"Quiero agua" means I ___ water.'
    sentenceBefore: '"Quiero agua" means I'
    sentenceAfter: water.
    choices:
      - want
      - can
      - am
      - go
    correctAnswer: want
  - type: text-input
    prompt: Type the Spanish phrase for "I need."
    acceptedAnswers:
      - necesito
    answerType: text
  - type: match-pairs
    prompt: Match each chunk.
    pairs:
      - left: me gusta
        right: I like
      - left: necesito
        right: I need
      - left: puedo
        right: I can
  - type: order-items
    prompt: Build "I can read".
    items:
      - leer
      - puedo
    correctOrder:
      - puedo
      - leer
  - type: passage-question
    prompt: Read the note.
    passageTitle: Nota
    passage: Necesito ayuda. Puedo leer, pero no puedo escribir.
    question: What does the speaker need?
    choices:
      - help
      - water
      - bread
      - a park
    correctAnswer: help
  - type: dialogue-builder
    prompt: Choose the sentence that answers "What do you want?"
    turns:
      - speaker: Mia
        line: Que quieres?
    choices:
      - Quiero agua.
      - Puedo leer.
      - Soy estudiante.
    correctAnswer: Quiero agua.
  - type: speaking-prompt
    prompt: Say one can-do or need sentence.
    minSeconds: 5
    sampleAnswer: Puedo leer.
    checklist:
      - Use puedo or necesito
      - Use a familiar action or object
---
