---
id: lesson_grade3_spanish_mastery_challenge
slug: grade-3-spanish-mastery-challenge
title: Grade 3 Spanish Mastery Challenge
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Grade 3 Spanish Mastery Challenge practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: passage-question
    prompt: Read the mini-dialogue.
    passageTitle: Conversacion
    passage: "Ana: Hola. Soy Ana. Voy a la biblioteca. Me gusta leer. Luis: Buenos dias, Ana. Necesito un libro, por favor."
    question: Where is Ana going?
    choices:
      - the library
      - the park
      - the house
      - the cafe
    correctAnswer: the library
    explanation: The passage gives the clue needed to choose the answer.
  - type: multiple-choice
    prompt: Which sentence says "I need a book, please"?
    choices:
      - Necesito un libro, por favor.
      - Me gusta un libro.
      - Voy a un libro.
      - Soy un libro.
    correctAnswer: Necesito un libro, por favor.
    explanation: The best answer is "Necesito un libro, por favor." because it matches the context or definition in the prompt.
  - type: fill-blank
    prompt: '"Me gusta leer porque es divertido" gives a reason with ___.'
    sentenceBefore: '"Me gusta leer porque es divertido" gives a reason with'
    sentenceAfter: .
    choices:
      - porque
      - hoy
      - azul
      - gracias
    correctAnswer: porque
    explanation: The sentence clue points to "porque" as the word that best completes the blank.
  - type: text-input
    prompt: Type the English meaning of "Voy a la escuela."
    acceptedAnswers:
      - I go to school
      - I am going to school
      - I go to the school
    answerType: text
    explanation: The expected answer is "I go to school"; the prompt gives the meaning or pattern to recall.
  - type: match-pairs
    prompt: Match each mastery phrase.
    pairs:
      - left: tengo agua
        right: I have water
      - left: mi familia
        right: my family
      - left: puedo leer
        right: I can read
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: order-items
    prompt: Build "I want bread please".
    items:
      - pan
      - por favor
      - quiero
    correctOrder:
      - quiero
      - pan
      - por favor
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
  - type: dialogue-builder
    prompt: Choose the best next line.
    turns:
      - speaker: Mia
        line: Buenos dias.
      - speaker: Leo
        line: Buenos dias. Como estas?
    choices:
      - Estoy bien, gracias.
      - El bloque es rojo.
      - A las diez.
    correctAnswer: Estoy bien, gracias.
    explanation: The correct response best fits what the speakers have already said.
  - type: constructed-response
    prompt: Write three short Spanish sentences showing readiness for Grade 4 Spanish.
    minWords: 8
    sampleAnswer: Hola. Soy estudiante. Me gusta leer porque es divertido.
    checklist:
      - Use a greeting
      - Use an about-me sentence
      - Use a like, need, want, go, or can sentence
---
