---
id: lesson_grade3_spanish_cumulative_about_me_family_review
slug: about-me-family-review
title: About Me And Family Review
xpBase: 10
questions:
  - type: multiple-choice
    prompt: Which sentence means "I am a student"?
    choices:
      - Soy estudiante.
      - Tengo estudiante.
      - Voy estudiante.
      - Me gusta estudiante.
    correctAnswer: Soy estudiante.
  - type: fill-blank
    prompt: '"Mi hermana es amable" means my sister is ___.'
    sentenceBefore: '"Mi hermana es amable" means my sister is'
    sentenceAfter: .
    choices:
      - kind
      - red
      - today
      - hungry
    correctAnswer: kind
  - type: text-input
    prompt: Type the Spanish phrase for "my family."
    acceptedAnswers:
      - mi familia
    answerType: text
  - type: match-pairs
    prompt: Match each family word.
    pairs:
      - left: mi papa
        right: my dad
      - left: mi amiga
        right: my friend
      - left: yo
        right: I
  - type: multi-blank-cloze
    prompt: Complete the about-me sentence.
    parts:
      - "Soy "
      - ". Tengo una "
      - .
    blanks:
      - correctAnswer: estudiante
        acceptedAnswers:
          - estudiante
        choices:
          - estudiante
          - agua
          - lunes
      - correctAnswer: familia
        acceptedAnswers:
          - familia
        choices:
          - familia
          - puerta
          - manzana
  - type: passage-question
    prompt: Read the profile.
    passageTitle: Perfil
    passage: Soy Ana. Mi familia es grande. Tengo un hermano.
    question: Who has a brother?
    choices:
      - Ana
      - Luis
      - the teacher
      - the friend
    correctAnswer: Ana
  - type: dialogue-builder
    prompt: Choose an answer about family.
    turns:
      - speaker: Luis
        line: Quien es?
    choices:
      - Es mi mama.
      - Voy a la casa.
      - Me gusta pan.
    correctAnswer: Es mi mama.
  - type: constructed-response
    prompt: Write two short Spanish sentences about yourself or family.
    minWords: 5
    sampleAnswer: Soy estudiante. Mi familia es grande.
    checklist:
      - Use soy or tengo
      - Use a family or person word
---
