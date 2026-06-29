---
id: lesson_grade3_spanish_build_simple_sentences
slug: build-simple-sentences
title: Build Simple Sentences
xpBase: 10
questions:
  - type: multiple-choice
    prompt: Which sentence means "I like bread"?
    choices:
      - Me gusta pan.
      - Voy a pan.
      - Soy pan.
      - Tengo lunes.
    correctAnswer: Me gusta pan.
  - type: fill-blank
    prompt: '"Voy a la casa" means I go to the ___.'
    sentenceBefore: '"Voy a la casa" means I go to the'
    sentenceAfter: .
    choices:
      - house
      - park
      - school
      - library
    correctAnswer: house
  - type: text-input
    prompt: Type the Spanish sentence for "I have water."
    acceptedAnswers:
      - tengo agua
    answerType: text
  - type: match-pairs
    prompt: Match each sentence.
    pairs:
      - left: Soy estudiante.
        right: I am a student.
      - left: Tengo leche.
        right: I have milk.
      - left: Voy al parque.
        right: I go to the park.
  - type: order-items
    prompt: Build "I need a pencil".
    items:
      - un
      - necesito
      - lapiz
    correctOrder:
      - necesito
      - un
      - lapiz
  - type: multi-blank-cloze
    prompt: Complete the sentence.
    parts:
      - "Me "
      - " la "
      - .
    blanks:
      - correctAnswer: gusta
        acceptedAnswers:
          - gusta
        choices:
          - gusta
          - tengo
          - voy
      - correctAnswer: biblioteca
        acceptedAnswers:
          - biblioteca
        choices:
          - biblioteca
          - leche
          - martes
  - type: dialogue-builder
    prompt: Choose the sentence that fits.
    turns:
      - speaker: Teacher
        line: Necesitas algo?
    choices:
      - Necesito un libro.
      - Soy un parque.
      - Hoy es rojo.
    correctAnswer: Necesito un libro.
  - type: speaking-prompt
    prompt: Say one simple Spanish sentence.
    minSeconds: 5
    sampleAnswer: Voy a la escuela.
    checklist:
      - Use a learned chunk
      - Use a familiar word
---
