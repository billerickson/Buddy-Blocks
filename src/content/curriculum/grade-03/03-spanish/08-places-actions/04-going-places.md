---
id: lesson_grade3_spanish_going_places
slug: going-places
title: Going Places
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "Voy a la escuela" mean?
    choices:
      - I go to school
      - I read at home
      - I want water
      - I like bread
    correctAnswer: I go to school
  - type: fill-blank
    prompt: '"Voy al parque" means I go to the ___.'
    sentenceBefore: '"Voy al parque" means I go to the'
    sentenceAfter: .
    choices:
      - park
      - library
      - house
      - class
    correctAnswer: park
  - type: text-input
    prompt: Type the Spanish phrase for "I go."
    acceptedAnswers:
      - voy
    answerType: text
  - type: match-pairs
    prompt: Match each place phrase.
    pairs:
      - left: la escuela
        right: school
      - left: la casa
        right: house
      - left: la biblioteca
        right: library
  - type: order-items
    prompt: Build "I go to the library".
    items:
      - la
      - voy
      - biblioteca
      - a
    correctOrder:
      - voy
      - a
      - la
      - biblioteca
  - type: dialogue-builder
    prompt: Choose the best answer.
    turns:
      - speaker: Mia
        line: Adonde vas?
    choices:
      - Voy al parque.
      - Me gusta arroz.
      - Es mi hermano.
    correctAnswer: Voy al parque.
  - type: passage-question
    prompt: Read the plan.
    passageTitle: Plan
    passage: Hoy voy a la biblioteca. Leo un libro.
    question: Where is the speaker going?
    choices:
      - library
      - park
      - house
      - school
    correctAnswer: library
  - type: constructed-response
    prompt: Write one Spanish sentence about where you go.
    minWords: 4
    sampleAnswer: Voy a la escuela.
    checklist:
      - Use voy a
      - Name a place
---
