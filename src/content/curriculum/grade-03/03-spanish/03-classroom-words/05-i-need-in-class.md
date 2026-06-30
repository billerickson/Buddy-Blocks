---
id: lesson_grade3_spanish_i_need_in_class
slug: i-need-in-class
title: I Need In Class
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives I Need In Class practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "Necesito un lapiz" mean?
    choices:
      - I need a pencil
      - I like a pencil
      - I have a door
      - I go to class
    correctAnswer: I need a pencil
    explanation: The best answer is "I need a pencil" because it matches the context or definition in the prompt.
  - type: fill-blank
    prompt: To say "I need a book," say necesito un ___.
    sentenceBefore: To say "I need a book," say necesito un
    sentenceAfter: .
    choices:
      - libro
      - lapiz
      - mesa
      - silla
    correctAnswer: libro
    explanation: The sentence clue points to "libro" as the word that best completes the blank.
  - type: text-input
    prompt: Type the Spanish phrase for "I need help."
    acceptedAnswers:
      - necesito ayuda
    answerType: text
    explanation: The expected answer is "necesito ayuda"; the prompt gives the meaning or pattern to recall.
  - type: match-pairs
    prompt: Match each need phrase.
    pairs:
      - left: necesito un libro
        right: I need a book
      - left: necesito un lapiz
        right: I need a pencil
      - left: necesito ayuda
        right: I need help
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: multi-blank-cloze
    prompt: Complete the classroom sentence.
    parts:
      - "Yo "
      - " un "
      - .
    blanks:
      - correctAnswer: necesito
        acceptedAnswers:
          - necesito
        choices:
          - necesito
          - hola
          - azul
      - correctAnswer: libro
        acceptedAnswers:
          - libro
        choices:
          - libro
          - rojo
          - gracias
    explanation: Each blank should fit the meaning and grammar of the full sentence or passage.
  - type: dialogue-builder
    prompt: Pick the polite request.
    turns:
      - speaker: Ana
        line: No tengo lapiz.
    choices:
      - Necesito un lapiz, por favor.
      - El lapiz es rojo.
      - Adios, lapiz.
    correctAnswer: Necesito un lapiz, por favor.
    explanation: The correct response best fits what the speakers have already said.
  - type: passage-question
    prompt: Read the note.
    passageTitle: Nota
    passage: Hoy necesito un libro y un lapiz.
    question: Which two things are needed?
    choices:
      - a book and a pencil
      - a chair and a table
      - water and bread
      - a park and a house
    correctAnswer: a book and a pencil
    explanation: The passage gives the clue needed to choose the answer.
  - type: constructed-response
    prompt: Write a short Spanish class request.
    minWords: 3
    sampleAnswer: Necesito ayuda, por favor.
    checklist:
      - Use necesito
      - Use a classroom word or ayuda
---
