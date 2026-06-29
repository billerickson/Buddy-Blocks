---
id: lesson_grade3_spanish_days_dates
slug: days-dates
title: Days, Months, And Dates
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "lunes" mean?
    choices:
      - Monday
      - Tuesday
      - today
      - ten
    correctAnswer: Monday
  - type: fill-blank
    prompt: '"Hoy es martes" means today is ___.'
    sentenceBefore: '"Hoy es martes" means today is'
    sentenceAfter: .
    choices:
      - Tuesday
      - Monday
      - one
      - twenty
    correctAnswer: Tuesday
  - type: text-input
    prompt: Type the English meaning of "hoy".
    acceptedAnswers:
      - today
    answerType: text
  - type: match-pairs
    prompt: Match each calendar word.
    pairs:
      - left: lunes
        right: Monday
      - left: martes
        right: Tuesday
      - left: hoy
        right: today
  - type: order-items
    prompt: Build "today is Monday".
    items:
      - lunes
      - hoy
      - es
    correctOrder:
      - hoy
      - es
      - lunes
  - type: passage-question
    prompt: Read the calendar.
    passageTitle: Calendario
    passage: Hoy es lunes. Manana es martes.
    question: What day is today?
    choices:
      - Monday
      - Tuesday
      - Friday
      - Sunday
    correctAnswer: Monday
  - type: dialogue-builder
    prompt: Choose the best answer.
    turns:
      - speaker: Luz
        line: Que dia es hoy?
    choices:
      - Hoy es lunes.
      - Me gusta pan.
      - Tengo un libro.
    correctAnswer: Hoy es lunes.
  - type: speaking-prompt
    prompt: Say today is Monday in Spanish.
    minSeconds: 5
    sampleAnswer: Hoy es lunes.
    checklist:
      - Use hoy es
      - Say a day
---
