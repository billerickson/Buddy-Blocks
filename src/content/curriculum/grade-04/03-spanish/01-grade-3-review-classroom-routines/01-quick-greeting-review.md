---
id: lesson_grade4_spanish_quick_greeting_review
slug: quick-greeting-review
title: Quick Greeting Review
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Quick Greeting Review practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "hola" mean?
    choices:
      - hello
      - goodbye
      - please
      - thank you
    correctAnswer: hello
    explanation: hola means hello.
  - type: text-input
    prompt: Type the Spanish for "goodbye".
    acceptedAnswers:
      - adios
    answerType: text
    explanation: The expected answer is "adios"; the prompt gives the meaning or pattern to recall.
  - type: fill-blank
    prompt: '"por favor" means ___.'
    sentenceBefore: '"por favor" means'
    sentenceAfter: .
    choices:
      - please
      - hello
      - goodbye
      - thank you
    correctAnswer: please
    explanation: The sentence clue points to "please" as the word that best completes the blank.
  - type: match-pairs
    prompt: Match the quick greeting review words.
    pairs:
      - left: hola
        right: hello
      - left: adios
        right: goodbye
      - left: por favor
        right: please
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: order-items
    prompt: Build "escucha por favor".
    items:
      - favor
      - por
      - escucha
    correctOrder:
      - escucha
      - por
      - favor
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Amigo
        line: Como estas?
    choices:
      - Estoy bien, gracias.
      - Tengo una mochila.
      - Voy al parque.
    correctAnswer: Estoy bien, gracias.
    explanation: The correct response best fits what the speakers have already said.
  - type: passage-question
    prompt: Read the short Spanish resource.
    passageTitle: Quick Greeting Review
    passage: En la clase, la maestra dice "hola". Un estudiante responde "adios". La clase tambien practica "por favor".
    question: Which word or phrase from the resource means "goodbye"?
    choices:
      - adios
      - hola
      - por favor
      - gracias
    correctAnswer: adios
    explanation: The passage gives the clue needed to choose the answer.
  - type: speaking-prompt
    prompt: 'Say the model sentence: "escucha por favor".'
    minSeconds: 5
    sampleAnswer: escucha por favor
    checklist:
      - Use Spanish
      - Speak clearly
      - Use the target word or phrase
---
