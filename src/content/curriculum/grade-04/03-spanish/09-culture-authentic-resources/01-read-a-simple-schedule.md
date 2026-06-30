---
id: lesson_grade4_spanish_read_a_simple_schedule
slug: read-a-simple-schedule
title: Read A Simple Schedule
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Read A Simple Schedule practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
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
    explanation: The expected answer is "el menu"; the prompt gives the meaning or pattern to recall.
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
    explanation: The sentence clue points to "map" as the word that best completes the blank.
  - type: match-pairs
    prompt: Match the read a simple schedule words.
    pairs:
      - left: el horario
        right: schedule
      - left: el menu
        right: menu
      - left: el mapa
        right: map
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
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
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
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
    explanation: The correct response best fits what the speakers have already said.
  - type: passage-question
    prompt: Read the short Spanish resource.
    passageTitle: Read A Simple Schedule
    passage: Un recurso de la comunidad muestra "el horario", "el menu" y "el mapa". Es informacion para visitantes.
    question: Which word or phrase from the resource means "menu"?
    choices:
      - el menu
      - el horario
      - el mapa
      - el anuncio
    correctAnswer: el menu
    explanation: The passage gives the clue needed to choose the answer.
  - type: speaking-prompt
    prompt: 'Say the model sentence: "leo el horario".'
    minSeconds: 5
    sampleAnswer: leo el horario
    checklist:
      - Use Spanish
      - Speak clearly
      - Use the target word or phrase
---
