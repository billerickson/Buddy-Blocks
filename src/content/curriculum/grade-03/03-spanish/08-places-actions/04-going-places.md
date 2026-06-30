---
id: lesson_grade3_spanish_going_places
slug: going-places
title: Going Places
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Going Places practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "Voy a la escuela" mean?
    choices:
      - I go to school
      - I read at home
      - I want water
      - I like bread
    correctAnswer: I go to school
    explanation: The best answer is "I go to school" because it matches the context or definition in the prompt.
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
    explanation: The sentence clue points to "park" as the word that best completes the blank.
  - type: text-input
    prompt: Type the Spanish phrase for "I go."
    acceptedAnswers:
      - voy
    answerType: text
    explanation: The expected answer is "voy"; the prompt gives the meaning or pattern to recall.
  - type: match-pairs
    prompt: Match each place phrase.
    pairs:
      - left: la escuela
        right: school
      - left: la casa
        right: house
      - left: la biblioteca
        right: library
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
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
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
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
    explanation: The correct response best fits what the speakers have already said.
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
    explanation: The passage gives the clue needed to choose the answer.
  - type: constructed-response
    prompt: Write one Spanish sentence about where you go.
    minWords: 4
    sampleAnswer: Voy a la escuela.
    checklist:
      - Use voy a
      - Name a place
---
