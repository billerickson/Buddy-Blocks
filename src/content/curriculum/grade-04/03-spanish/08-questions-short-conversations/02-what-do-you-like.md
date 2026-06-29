---
id: lesson_grade4_spanish_what_do_you_like
slug: what-do-you-like
title: What Do You Like
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "como te llamas" mean?
    choices:
      - what is your name
      - what do you like
      - where are you going
      - why
    correctAnswer: what is your name
    explanation: como te llamas means what is your name.
  - type: text-input
    prompt: Type the Spanish for "what do you like".
    acceptedAnswers:
      - que te gusta
    answerType: text
  - type: fill-blank
    prompt: '"adonde vas" means ___.'
    sentenceBefore: '"adonde vas" means'
    sentenceAfter: .
    choices:
      - where are you going
      - what is your name
      - what do you like
      - why
    correctAnswer: where are you going
  - type: match-pairs
    prompt: Match the what do you like words.
    pairs:
      - left: como te llamas
        right: what is your name
      - left: que te gusta
        right: what do you like
      - left: adonde vas
        right: where are you going
  - type: order-items
    prompt: Build "porque me gusta".
    items:
      - gusta
      - me
      - porque
    correctOrder:
      - porque
      - me
      - gusta
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Amigo
        line: Por que quieres ir?
    choices:
      - Porque me gusta.
      - Tengo una regla.
      - Son las ocho.
    correctAnswer: Porque me gusta.
  - type: passage-question
    prompt: Read the short Spanish resource.
    passageTitle: What Do You Like
    passage: En una conversacion corta, una persona pregunta "como te llamas". Otra
      persona responde "que te gusta" y explica "adonde vas".
    question: Which word or phrase from the resource means "what do you like"?
    choices:
      - que te gusta
      - como te llamas
      - adonde vas
      - por que
    correctAnswer: que te gusta
  - type: speaking-prompt
    prompt: 'Say the model sentence: "porque me gusta".'
    minSeconds: 5
    sampleAnswer: porque me gusta
    checklist:
      - Use Spanish
      - Speak clearly
      - Use the target word or phrase
---
