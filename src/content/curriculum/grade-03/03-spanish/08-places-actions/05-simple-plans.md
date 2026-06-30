---
id: lesson_grade3_spanish_simple_plans
slug: simple-plans
title: Simple Plans
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Simple Plans practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "Puedo leer" mean?
    choices:
      - I can read
      - I need rice
      - I am red
      - I go home
    correctAnswer: I can read
    explanation: The best answer is "I can read" because it matches the context or definition in the prompt.
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
    explanation: The sentence clue points to "park" as the word that best completes the blank.
  - type: text-input
    prompt: Type the English meaning of "leo".
    acceptedAnswers:
      - I read
      - read
    answerType: text
    explanation: The expected answer is "I read"; the prompt gives the meaning or pattern to recall.
  - type: match-pairs
    prompt: Match each action.
    pairs:
      - left: camino
        right: I walk
      - left: leo
        right: I read
      - left: vengo
        right: I come
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
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
    explanation: Each blank should fit the meaning and grammar of the full sentence or passage.
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
    explanation: The passage gives the clue needed to choose the answer.
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
    explanation: The correct response best fits what the speakers have already said.
  - type: speaking-prompt
    prompt: Say a simple Spanish plan.
    minSeconds: 5
    sampleAnswer: Hoy voy al parque. Quiero jugar.
    checklist:
      - Use voy
      - Use quiero or puedo
---
