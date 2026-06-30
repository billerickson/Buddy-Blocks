---
id: lesson_grade3_spanish_cumulative_about_me_family_review
slug: about-me-family-review
title: About Me And Family Review
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives About Me And Family Review practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: Which sentence means "I am a student"?
    choices:
      - Soy estudiante.
      - Tengo estudiante.
      - Voy estudiante.
      - Me gusta estudiante.
    correctAnswer: Soy estudiante.
    explanation: The best answer is "Soy estudiante." because it matches the context or definition in the prompt.
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
    explanation: The sentence clue points to "kind" as the word that best completes the blank.
  - type: text-input
    prompt: Type the Spanish phrase for "my family."
    acceptedAnswers:
      - mi familia
    answerType: text
    explanation: The expected answer is "mi familia"; the prompt gives the meaning or pattern to recall.
  - type: match-pairs
    prompt: Match each family word.
    pairs:
      - left: mi papa
        right: my dad
      - left: mi amiga
        right: my friend
      - left: yo
        right: I
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
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
    explanation: Each blank should fit the meaning and grammar of the full sentence or passage.
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
    explanation: The passage gives the clue needed to choose the answer.
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
    explanation: The correct response best fits what the speakers have already said.
  - type: constructed-response
    prompt: Write two short Spanish sentences about yourself or family.
    minWords: 5
    sampleAnswer: Soy estudiante. Mi familia es grande.
    checklist:
      - Use soy or tengo
      - Use a family or person word
---
