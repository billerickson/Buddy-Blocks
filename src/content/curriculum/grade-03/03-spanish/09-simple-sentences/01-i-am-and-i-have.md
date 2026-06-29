---
id: lesson_grade3_spanish_i_am_i_have
slug: i-am-and-i-have
title: I Am And I Have
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "Soy estudiante" mean?
    choices:
      - I am a student
      - I have a student
      - I go to school
      - I like school
    correctAnswer: I am a student
  - type: fill-blank
    prompt: '"Tengo un libro" means I ___ a book.'
    sentenceBefore: '"Tengo un libro" means I'
    sentenceAfter: a book.
    choices:
      - have
      - am
      - go
      - like
    correctAnswer: have
  - type: text-input
    prompt: Type the Spanish word for "I have."
    acceptedAnswers:
      - tengo
    answerType: text
  - type: match-pairs
    prompt: Match each sentence chunk.
    pairs:
      - left: soy
        right: I am
      - left: tengo
        right: I have
      - left: estoy
        right: I am feeling or located
  - type: multi-blank-cloze
    prompt: Complete the sentence.
    parts:
      - "Yo "
      - " un "
      - .
    blanks:
      - correctAnswer: tengo
        acceptedAnswers:
          - tengo
        choices:
          - tengo
          - soy
          - voy
      - correctAnswer: libro
        acceptedAnswers:
          - libro
        choices:
          - libro
          - lunes
          - rojo
  - type: dialogue-builder
    prompt: Choose the answer about identity.
    turns:
      - speaker: Ana
        line: Quien eres?
    choices:
      - Soy estudiante.
      - Tengo agua.
      - Voy al parque.
    correctAnswer: Soy estudiante.
  - type: passage-question
    prompt: Read the card.
    passageTitle: Tarjeta
    passage: Soy Luis. Tengo un libro azul.
    question: What does Luis have?
    choices:
      - a blue book
      - water
      - a red chair
      - bread
    correctAnswer: a blue book
  - type: constructed-response
    prompt: Write one Spanish sentence with soy or tengo.
    minWords: 3
    sampleAnswer: Tengo un libro.
    checklist:
      - Use soy or tengo
      - Make a simple sentence
---
