---
id: lesson_grade4_spanish_read_a_simple_schedule
slug: read-a-simple-schedule
title: Read A Simple Schedule
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "el horario" mean?
    choices:
      - schedule
      - menu
      - map
      - announcement
    correctAnswer: schedule
    explanation: el horario means schedule.
  - type: text-input
    prompt: Type the Spanish for "menu".
    acceptedAnswers:
      - el menu
    answerType: text
  - type: fill-blank
    prompt: '"el mapa" means ___.'
    sentenceBefore: '"el mapa" means'
    sentenceAfter: .
    choices:
      - map
      - schedule
      - menu
      - announcement
    correctAnswer: map
  - type: match-pairs
    prompt: Match the read a simple schedule words.
    pairs:
      - left: el horario
        right: schedule
      - left: el menu
        right: menu
      - left: el mapa
        right: map
  - type: order-items
    prompt: Build "leo el horario".
    items:
      - horario
      - el
      - leo
    correctOrder:
      - leo
      - el
      - horario
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Amigo
        line: Que ves en el mapa?
    choices:
      - Veo la plaza.
      - Necesito tijeras.
      - Estoy cansado.
    correctAnswer: Veo la plaza.
  - type: passage-question
    prompt: Read the short Spanish resource.
    passageTitle: Read A Simple Schedule
    passage: Un recurso de la comunidad muestra "el horario", "el menu" y "el mapa".
      Es informacion para visitantes.
    question: Which word or phrase from the resource means "menu"?
    choices:
      - el menu
      - el horario
      - el mapa
      - el anuncio
    correctAnswer: el menu
  - type: speaking-prompt
    prompt: 'Say the model sentence: "leo el horario".'
    minSeconds: 5
    sampleAnswer: leo el horario
    checklist:
      - Use Spanish
      - Speak clearly
      - Use the target word or phrase
---
