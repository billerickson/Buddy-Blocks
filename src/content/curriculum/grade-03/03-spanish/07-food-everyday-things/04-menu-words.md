---
id: lesson_grade3_spanish_menu_words
slug: menu-words
title: Use A Menu
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "agua" mean?
    choices:
      - water
      - milk
      - bread
      - rice
    correctAnswer: water
  - type: fill-blank
    prompt: '"Quiero pan" means I want ___.'
    sentenceBefore: '"Quiero pan" means I want'
    sentenceAfter: .
    choices:
      - bread
      - water
      - cheese
      - fruit
    correctAnswer: bread
  - type: text-input
    prompt: Type the Spanish word for "milk."
    acceptedAnswers:
      - leche
    answerType: text
  - type: match-pairs
    prompt: Match each food word.
    pairs:
      - left: manzana
        right: apple
      - left: queso
        right: cheese
      - left: arroz
        right: rice
  - type: order-items
    prompt: Build "I want water please".
    items:
      - agua
      - quiero
      - por favor
    correctOrder:
      - quiero
      - agua
      - por favor
  - type: passage-question
    prompt: Read the menu.
    passageTitle: Menu
    passage: "Agua: 1. Pan: 2. Queso: 3. Fruta: 4."
    question: Which item is fruit?
    choices:
      - fruta
      - pan
      - queso
      - agua
    correctAnswer: fruta
  - type: dialogue-builder
    prompt: Choose the polite request.
    turns:
      - speaker: Cafe
        line: Que quieres?
    choices:
      - Quiero agua, por favor.
      - Adios agua.
      - Hoy es martes.
    correctAnswer: Quiero agua, por favor.
  - type: constructed-response
    prompt: Write a polite Spanish food request.
    minWords: 3
    sampleAnswer: Quiero pan, por favor.
    checklist:
      - Use quiero
      - Use por favor
---
