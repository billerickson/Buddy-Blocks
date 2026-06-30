---
id: lesson_grade4_spanish_community_places
slug: community-places
title: Community Places
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Community Places practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "la biblioteca" mean?
    choices:
      - library
      - school
      - park
      - store
    correctAnswer: library
    explanation: la biblioteca means library.
  - type: text-input
    prompt: Type the Spanish for "park".
    acceptedAnswers:
      - el parque
    answerType: text
    explanation: The expected answer is "el parque"; the prompt gives the meaning or pattern to recall.
  - type: fill-blank
    prompt: '"la tienda" means ___.'
    sentenceBefore: '"la tienda" means'
    sentenceAfter: .
    choices:
      - store
      - school
      - library
      - park
    correctAnswer: store
    explanation: The sentence clue points to "store" as the word that best completes the blank.
  - type: match-pairs
    prompt: Match the community places words.
    pairs:
      - left: la biblioteca
        right: library
      - left: el parque
        right: park
      - left: la tienda
        right: store
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: order-items
    prompt: Build "voy a la biblioteca".
    items:
      - biblioteca
      - la
      - a
      - voy
    correctOrder:
      - voy
      - a
      - la
      - biblioteca
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Amigo
        line: Adonde vas?
    choices:
      - Voy a la biblioteca.
      - Tengo treinta lapices.
      - Mi amigo esta triste.
    correctAnswer: Voy a la biblioteca.
    explanation: The correct response best fits what the speakers have already said.
  - type: passage-question
    prompt: Read the short Spanish resource.
    passageTitle: Community Places
    passage: El mapa muestra "la biblioteca" cerca de "el parque". La flecha apunta "la tienda".
    question: Which word or phrase from the resource means "park"?
    choices:
      - el parque
      - la escuela
      - la biblioteca
      - la tienda
    correctAnswer: el parque
    explanation: The passage gives the clue needed to choose the answer.
  - type: constructed-response
    prompt: Write one short English note explaining when you could use "la biblioteca".
    minWords: 4
    sampleAnswer: I could use la biblioteca during places and directions.
    checklist:
      - Name a real situation
      - Show the meaning of the Spanish phrase
---
