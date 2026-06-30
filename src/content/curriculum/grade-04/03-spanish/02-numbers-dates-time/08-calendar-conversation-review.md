---
id: lesson_grade4_spanish_calendar_conversation_review
slug: calendar-conversation-review
title: Calendar Conversation Review
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Calendar Conversation Review practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "veinte" mean?
    choices:
      - twenty
      - thirty
      - forty
      - fifty
    correctAnswer: twenty
    explanation: veinte means twenty.
  - type: text-input
    prompt: Type the Spanish for "thirty".
    acceptedAnswers:
      - treinta
    answerType: text
    explanation: The expected answer is "treinta"; the prompt gives the meaning or pattern to recall.
  - type: fill-blank
    prompt: '"cuarenta" means ___.'
    sentenceBefore: '"cuarenta" means'
    sentenceAfter: .
    choices:
      - forty
      - twenty
      - thirty
      - fifty
    correctAnswer: forty
    explanation: The sentence clue points to "forty" as the word that best completes the blank.
  - type: match-pairs
    prompt: Match the calendar conversation review words.
    pairs:
      - left: veinte
        right: twenty
      - left: treinta
        right: thirty
      - left: cuarenta
        right: forty
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: order-items
    prompt: Build "hoy es lunes".
    items:
      - lunes
      - es
      - hoy
    correctOrder:
      - hoy
      - es
      - lunes
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Amigo
        line: Que dia es?
    choices:
      - Hoy es lunes.
      - Me llamo Ana.
      - Voy a la biblioteca.
    correctAnswer: Hoy es lunes.
    explanation: The correct response best fits what the speakers have already said.
  - type: passage-question
    prompt: Read the short Spanish resource.
    passageTitle: Calendar Conversation Review
    passage: El horario dice "veinte" minutos de lectura. Despues hay "treinta" minutos de matematicas y "cuarenta" minutos de arte.
    question: Which word or phrase from the resource means "thirty"?
    choices:
      - treinta
      - veinte
      - cuarenta
      - cincuenta
    correctAnswer: treinta
    explanation: The passage gives the clue needed to choose the answer.
  - type: speaking-prompt
    prompt: 'Say the model sentence: "hoy es lunes".'
    minSeconds: 5
    sampleAnswer: hoy es lunes
    checklist:
      - Use Spanish
      - Speak clearly
      - Use the target word or phrase
---
