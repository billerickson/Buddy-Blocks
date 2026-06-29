---
id: lesson_grade4_spanish_school_day_conversation
slug: school-day-conversation
title: School Day Conversation
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "quiero ir" mean?
    choices:
      - I want to go
      - my class
      - my schedule
      - because I like it
    correctAnswer: I want to go
    explanation: quiero ir means I want to go.
  - type: text-input
    prompt: Type the Spanish for "because I like it".
    acceptedAnswers:
      - porque me gusta
    answerType: text
  - type: fill-blank
    prompt: '"necesito ayuda" means ___.'
    sentenceBefore: '"necesito ayuda" means'
    sentenceAfter: .
    choices:
      - I need help
      - my class
      - my schedule
      - I want to go
    correctAnswer: I need help
  - type: match-pairs
    prompt: Match the school day conversation words.
    pairs:
      - left: quiero ir
        right: I want to go
      - left: porque me gusta
        right: because I like it
      - left: necesito ayuda
        right: I need help
  - type: order-items
    prompt: Build "quiero ir al parque".
    items:
      - parque
      - al
      - ir
      - quiero
    correctOrder:
      - quiero
      - ir
      - al
      - parque
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Amigo
        line: Que quieres hacer?
    choices:
      - Quiero ir al parque.
      - El horario dice treinta.
      - La carpeta es roja.
    correctAnswer: Quiero ir al parque.
  - type: passage-question
    prompt: Read the short Spanish resource.
    passageTitle: School Day Conversation
    passage: En el repaso, digo "quiero ir". Despues explico "porque me gusta" y
      pido "necesito ayuda" si lo necesito.
    question: Which word or phrase from the resource means "because I like it"?
    choices:
      - porque me gusta
      - mi clase
      - mi horario
      - quiero ir
    correctAnswer: porque me gusta
  - type: speaking-prompt
    prompt: 'Say the model sentence: "quiero ir al parque".'
    minSeconds: 5
    sampleAnswer: quiero ir al parque
    checklist:
      - Use Spanish
      - Speak clearly
      - Use the target word or phrase
---
