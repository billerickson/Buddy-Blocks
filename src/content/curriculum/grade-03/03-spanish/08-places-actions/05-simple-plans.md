---
id: lesson_grade3_spanish_simple_plans
slug: simple-plans
title: Simple Plans
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "Puedo leer" mean?
    choices:
      - I can read
      - I need rice
      - I am red
      - I go home
    correctAnswer: I can read
  - type: fill-blank
    prompt: '"Quiero jugar en el parque" means I want to play in the ___.'
    sentenceBefore: '"Quiero jugar en el parque" means I want to play in the'
    sentenceAfter: .
    choices:
      - park
      - school
      - library
      - house
    correctAnswer: park
  - type: text-input
    prompt: Type the English meaning of "leo".
    acceptedAnswers:
      - I read
      - read
    answerType: text
  - type: match-pairs
    prompt: Match each action.
    pairs:
      - left: camino
        right: I walk
      - left: leo
        right: I read
      - left: vengo
        right: I come
  - type: multi-blank-cloze
    prompt: Complete the simple plan.
    parts:
      - "Hoy "
      - " al parque y "
      - .
    blanks:
      - correctAnswer: voy
        acceptedAnswers:
          - voy
        choices:
          - voy
          - soy
          - tengo
      - correctAnswer: juego
        acceptedAnswers:
          - juego
          - quiero jugar
        choices:
          - juego
          - agua
          - lunes
  - type: passage-question
    prompt: Read the plan.
    passageTitle: Despues de clase
    passage: Hoy voy a casa. Quiero leer y jugar.
    question: What are two planned actions?
    choices:
      - read and play
      - eat and drink
      - walk and come
      - listen and open
    correctAnswer: read and play
  - type: dialogue-builder
    prompt: Choose the plan.
    turns:
      - speaker: Leo
        line: Que quieres hacer?
    choices:
      - Quiero jugar.
      - Es martes.
      - Mi mama.
    correctAnswer: Quiero jugar.
  - type: speaking-prompt
    prompt: Say a simple Spanish plan.
    minSeconds: 5
    sampleAnswer: Hoy voy al parque. Quiero jugar.
    checklist:
      - Use voy
      - Use quiero or puedo
---
