---
id: lesson_grade3_spanish_menu_words
slug: menu-words
title: Use A Menu
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Use A Menu practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "agua" mean?
    choices:
      - water
      - milk
      - bread
      - rice
    correctAnswer: water
    explanation: The best answer is "water" because it matches the context or definition in the prompt.
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
    explanation: The sentence clue points to "bread" as the word that best completes the blank.
  - type: text-input
    prompt: Type the Spanish word for "milk."
    acceptedAnswers:
      - leche
    answerType: text
    explanation: The expected answer is "leche"; the prompt gives the meaning or pattern to recall.
  - type: match-pairs
    prompt: Match each food word.
    pairs:
      - left: manzana
        right: apple
      - left: queso
        right: cheese
      - left: arroz
        right: rice
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
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
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
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
    explanation: The passage gives the clue needed to choose the answer.
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
    explanation: The correct response best fits what the speakers have already said.
  - type: constructed-response
    prompt: Write a polite Spanish food request.
    minWords: 3
    sampleAnswer: Quiero pan, por favor.
    checklist:
      - Use quiero
      - Use por favor
---
