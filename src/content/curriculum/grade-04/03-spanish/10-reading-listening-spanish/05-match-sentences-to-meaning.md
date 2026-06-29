---
id: lesson_grade4_spanish_match_sentences_to_meaning
slug: match-sentences-to-meaning
title: Match Sentences To Meaning
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "escucha" mean?
    choices:
      - listen
      - note
      - message
      - first
    correctAnswer: listen
    explanation: escucha means listen.
  - type: text-input
    prompt: Type the Spanish for "main idea".
    acceptedAnswers:
      - la idea principal
    answerType: text
  - type: fill-blank
    prompt: '"el detalle" means ___.'
    sentenceBefore: '"el detalle" means'
    sentenceAfter: .
    choices:
      - detail
      - note
      - message
      - first
    correctAnswer: detail
  - type: match-pairs
    prompt: Match the match sentences to meaning words.
    pairs:
      - left: escucha
        right: listen
      - left: la idea principal
        right: main idea
      - left: el detalle
        right: detail
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
    passageTitle: Match Sentences To Meaning
    passage: La nota dice "escucha". El mensaje usa "la idea principal". Para
      comprender, escucha y busca "el detalle".
    question: Which word or phrase from the resource means "main idea"?
    choices:
      - la idea principal
      - la nota
      - el mensaje
      - primero
    correctAnswer: la idea principal
  - type: constructed-response
    prompt: Write one short English note explaining when you could use "escucha".
    minWords: 4
    sampleAnswer: I could use escucha during reading and listening in spanish.
    checklist:
      - Name a real situation
      - Show the meaning of the Spanish phrase
---
