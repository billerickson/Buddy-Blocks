---
id: lesson_grade3_spanish_like_need_want_can
slug: like-need-want-can
title: Like, Need, Want, Can
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Like, Need, Want, Can practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "Puedo leer" mean?
    choices:
      - I can read
      - I need to read
      - I want bread
      - I like water
    correctAnswer: I can read
    explanation: The best answer is "I can read" because it matches the context or definition in the prompt.
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
    explanation: The sentence clue points to "want" as the word that best completes the blank.
  - type: text-input
    prompt: Type the Spanish phrase for "I need."
    acceptedAnswers:
      - necesito
    answerType: text
    explanation: The expected answer is "necesito"; the prompt gives the meaning or pattern to recall.
  - type: match-pairs
    prompt: Match each chunk.
    pairs:
      - left: me gusta
        right: I like
      - left: necesito
        right: I need
      - left: puedo
        right: I can
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: order-items
    prompt: Build "I can read".
    items:
      - leer
      - puedo
    correctOrder:
      - puedo
      - leer
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
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
    explanation: The passage gives the clue needed to choose the answer.
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
    explanation: The correct response best fits what the speakers have already said.
  - type: speaking-prompt
    prompt: Say one can-do or need sentence.
    minSeconds: 5
    sampleAnswer: Puedo leer.
    checklist:
      - Use puedo or necesito
      - Use a familiar action or object
---
