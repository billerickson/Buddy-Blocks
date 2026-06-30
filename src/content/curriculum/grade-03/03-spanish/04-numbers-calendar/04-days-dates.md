---
id: lesson_grade3_spanish_days_dates
slug: days-dates
title: Days, Months, And Dates
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Days, Months, And Dates practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "lunes" mean?
    choices:
      - Monday
      - Tuesday
      - today
      - ten
    correctAnswer: Monday
    explanation: The best answer is "Monday" because it matches the context or definition in the prompt.
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
    explanation: The sentence clue points to "Tuesday" as the word that best completes the blank.
  - type: text-input
    prompt: Type the English meaning of "hoy".
    acceptedAnswers:
      - today
    answerType: text
    explanation: The expected answer is "today"; the prompt gives the meaning or pattern to recall.
  - type: match-pairs
    prompt: Match each calendar word.
    pairs:
      - left: lunes
        right: Monday
      - left: martes
        right: Tuesday
      - left: hoy
        right: today
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
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
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
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
    explanation: The passage gives the clue needed to choose the answer.
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
    explanation: The correct response best fits what the speakers have already said.
  - type: speaking-prompt
    prompt: Say today is Monday in Spanish.
    minSeconds: 5
    sampleAnswer: Hoy es lunes.
    checklist:
      - Use hoy es
      - Say a day
---
