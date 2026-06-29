---
id: lesson_grade4_spanish_read_a_simple_dialogue
slug: read-a-simple-dialogue
title: Read A Simple Dialogue
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "primero" mean?
    choices:
      - first
      - note
      - message
      - after
    correctAnswer: first
    explanation: primero means first.
  - type: text-input
    prompt: Type the Spanish for "after".
    acceptedAnswers:
      - despues
    answerType: text
  - type: fill-blank
    prompt: '"busca" means ___.'
    sentenceBefore: '"busca" means'
    sentenceAfter: .
    choices:
      - look for
      - note
      - message
      - first
    correctAnswer: look for
  - type: match-pairs
    prompt: Match the read a simple dialogue words.
    pairs:
      - left: primero
        right: first
      - left: despues
        right: after
      - left: busca
        right: look for
  - type: order-items
    prompt: Build "busca la idea principal".
    items:
      - principal
      - idea
      - la
      - busca
    correctOrder:
      - busca
      - la
      - idea
      - principal
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Amigo
        line: Que buscas primero?
    choices:
      - Busco la idea principal.
      - Quisiera arroz.
      - Voy a la tienda.
    correctAnswer: Busco la idea principal.
  - type: passage-question
    prompt: Read the short Spanish resource.
    passageTitle: Read A Simple Dialogue
    passage: La nota dice "primero". El mensaje usa "despues". Para comprender,
      escucha y busca "busca".
    question: Which word or phrase from the resource means "after"?
    choices:
      - despues
      - la nota
      - el mensaje
      - primero
    correctAnswer: despues
  - type: speaking-prompt
    prompt: 'Say the model sentence: "busca la idea principal".'
    minSeconds: 5
    sampleAnswer: busca la idea principal
    checklist:
      - Use Spanish
      - Speak clearly
      - Use the target word or phrase
---
