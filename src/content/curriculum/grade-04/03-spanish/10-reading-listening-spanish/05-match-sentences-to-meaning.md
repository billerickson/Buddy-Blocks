---
id: lesson_grade4_spanish_match_sentences_to_meaning
slug: match-sentences-to-meaning
title: Match Sentences To Meaning
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Match Sentences To Meaning practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
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
    explanation: The expected answer is "la idea principal"; the prompt gives the meaning or pattern to recall.
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
    explanation: The sentence clue points to "detail" as the word that best completes the blank.
  - type: match-pairs
    prompt: Match the match sentences to meaning words.
    pairs:
      - left: escucha
        right: listen
      - left: la idea principal
        right: main idea
      - left: el detalle
        right: detail
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
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
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
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
    explanation: The correct response best fits what the speakers have already said.
  - type: passage-question
    prompt: Read the short Spanish resource.
    passageTitle: Match Sentences To Meaning
    passage: La nota dice "escucha". El mensaje usa "la idea principal". Para comprender, escucha y busca "el detalle".
    question: Which word or phrase from the resource means "main idea"?
    choices:
      - la idea principal
      - la nota
      - el mensaje
      - primero
    correctAnswer: la idea principal
    explanation: The passage gives the clue needed to choose the answer.
  - type: constructed-response
    prompt: Write one short English note explaining when you could use "escucha".
    minWords: 4
    sampleAnswer: I could use escucha during reading and listening in spanish.
    checklist:
      - Name a real situation
      - Show the meaning of the Spanish phrase
---
