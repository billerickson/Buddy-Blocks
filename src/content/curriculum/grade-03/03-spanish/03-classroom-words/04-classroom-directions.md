---
id: lesson_grade3_spanish_classroom_directions
slug: classroom-directions
title: Classroom Directions
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Classroom Directions practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "escucha" mean?
    choices:
      - listen
      - write
      - open
      - sit
    correctAnswer: listen
    explanation: The best answer is "listen" because it matches the context or definition in the prompt.
  - type: fill-blank
    prompt: '"Abre el libro" means ___ the book.'
    sentenceBefore: '"Abre el libro" means'
    sentenceAfter: the book.
    choices:
      - open
      - close
      - read silently
      - draw
    correctAnswer: open
    explanation: The sentence clue points to "open" as the word that best completes the blank.
  - type: text-input
    prompt: Type the English meaning of "necesito ayuda".
    acceptedAnswers:
      - I need help
      - need help
    answerType: text
    explanation: The expected answer is "I need help"; the prompt gives the meaning or pattern to recall.
  - type: match-pairs
    prompt: Match each classroom phrase.
    pairs:
      - left: abre el libro
        right: open the book
      - left: cierra la puerta
        right: close the door
      - left: levanta la mano
        right: raise your hand
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: order-items
    prompt: Build "open the book".
    items:
      - libro
      - abre
      - el
    correctOrder:
      - abre
      - el
      - libro
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
  - type: dialogue-builder
    prompt: Choose the best response.
    turns:
      - speaker: Maestra
        line: Necesitas ayuda?
    choices:
      - Si, necesito ayuda.
      - Adios.
      - Es rojo.
    correctAnswer: Si, necesito ayuda.
    explanation: The correct response best fits what the speakers have already said.
  - type: passage-question
    prompt: Read the classroom sign.
    passageTitle: La clase
    passage: Silencio. Escucha. Abre el libro.
    question: What should students do first with their voices?
    choices:
      - be quiet
      - say goodbye
      - ask for food
      - count to ten
    correctAnswer: be quiet
    explanation: The passage gives the clue needed to choose the answer.
  - type: speaking-prompt
    prompt: Say one classroom phrase in Spanish.
    minSeconds: 5
    sampleAnswer: Necesito ayuda.
    checklist:
      - Use a classroom phrase
      - Speak clearly
---
