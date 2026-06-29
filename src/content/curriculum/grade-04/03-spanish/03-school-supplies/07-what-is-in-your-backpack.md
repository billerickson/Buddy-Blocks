---
id: lesson_grade4_spanish_what_is_in_your_backpack
slug: what-is-in-your-backpack
title: What Is In Your Backpack
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "la mochila" mean?
    choices:
      - backpack
      - notebook
      - folder
      - pen
    correctAnswer: backpack
    explanation: la mochila means backpack.
  - type: text-input
    prompt: Type the Spanish for "notebook".
    acceptedAnswers:
      - el cuaderno
    answerType: text
  - type: fill-blank
    prompt: '"la carpeta" means ___.'
    sentenceBefore: '"la carpeta" means'
    sentenceAfter: .
    choices:
      - folder
      - backpack
      - notebook
      - pen
    correctAnswer: folder
  - type: match-pairs
    prompt: Match the what is in your backpack words.
    pairs:
      - left: la mochila
        right: backpack
      - left: el cuaderno
        right: notebook
      - left: la carpeta
        right: folder
  - type: order-items
    prompt: Build "necesito el cuaderno".
    items:
      - cuaderno
      - el
      - necesito
    correctOrder:
      - necesito
      - el
      - cuaderno
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Amigo
        line: Que necesitas?
    choices:
      - Necesito el cuaderno.
      - Son las tres.
      - Me gusta el parque.
    correctAnswer: Necesito el cuaderno.
  - type: passage-question
    prompt: Read the short Spanish resource.
    passageTitle: What Is In Your Backpack
    passage: En mi mochila tengo "la mochila" y "el cuaderno". Para la clase tambien
      necesito "la carpeta".
    question: Which word or phrase from the resource means "notebook"?
    choices:
      - el cuaderno
      - la mochila
      - la carpeta
      - la pluma
    correctAnswer: el cuaderno
  - type: speaking-prompt
    prompt: 'Say the model sentence: "necesito el cuaderno".'
    minSeconds: 5
    sampleAnswer: necesito el cuaderno
    checklist:
      - Use Spanish
      - Speak clearly
      - Use the target word or phrase
---
