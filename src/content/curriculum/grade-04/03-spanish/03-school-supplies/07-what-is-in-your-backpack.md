---
id: lesson_grade4_spanish_what_is_in_your_backpack
slug: what-is-in-your-backpack
title: What Is In Your Backpack
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives What Is In Your Backpack practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
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
    explanation: The expected answer is "el cuaderno"; the prompt gives the meaning or pattern to recall.
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
    explanation: The sentence clue points to "folder" as the word that best completes the blank.
  - type: match-pairs
    prompt: Match the what is in your backpack words.
    pairs:
      - left: la mochila
        right: backpack
      - left: el cuaderno
        right: notebook
      - left: la carpeta
        right: folder
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
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
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
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
    explanation: The correct response best fits what the speakers have already said.
  - type: passage-question
    prompt: Read the short Spanish resource.
    passageTitle: What Is In Your Backpack
    passage: En mi mochila tengo "la mochila" y "el cuaderno". Para la clase tambien necesito "la carpeta".
    question: Which word or phrase from the resource means "notebook"?
    choices:
      - el cuaderno
      - la mochila
      - la carpeta
      - la pluma
    correctAnswer: el cuaderno
    explanation: The passage gives the clue needed to choose the answer.
  - type: speaking-prompt
    prompt: 'Say the model sentence: "necesito el cuaderno".'
    minSeconds: 5
    sampleAnswer: necesito el cuaderno
    checklist:
      - Use Spanish
      - Speak clearly
      - Use the target word or phrase
---
