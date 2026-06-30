---
id: lesson_grade3_spanish_i_am_i_have
slug: i-am-and-i-have
title: I Am And I Have
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives I Am And I Have practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "Soy estudiante" mean?
    choices:
      - I am a student
      - I have a student
      - I go to school
      - I like school
    correctAnswer: I am a student
    explanation: The best answer is "I am a student" because it matches the context or definition in the prompt.
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
    explanation: The sentence clue points to "have" as the word that best completes the blank.
  - type: text-input
    prompt: Type the Spanish word for "I have."
    acceptedAnswers:
      - tengo
    answerType: text
    explanation: The expected answer is "tengo"; the prompt gives the meaning or pattern to recall.
  - type: match-pairs
    prompt: Match each sentence chunk.
    pairs:
      - left: soy
        right: I am
      - left: tengo
        right: I have
      - left: estoy
        right: I am feeling or located
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
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
    explanation: Each blank should fit the meaning and grammar of the full sentence or passage.
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
    explanation: The correct response best fits what the speakers have already said.
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
    explanation: The passage gives the clue needed to choose the answer.
  - type: constructed-response
    prompt: Write one Spanish sentence with soy or tengo.
    minWords: 3
    sampleAnswer: Tengo un libro.
    checklist:
      - Use soy or tengo
      - Make a simple sentence
---
