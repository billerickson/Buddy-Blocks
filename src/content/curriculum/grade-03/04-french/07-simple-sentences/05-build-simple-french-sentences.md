---
id: lesson_grade3_french_build_simple_french_sentences
slug: build-simple-french-sentences
title: Build Simple French Sentences
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Build Simple French Sentences practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "il est" mean?
    choices:
      - he is
      - I am
      - I have
      - she is
    correctAnswer: he is
    explanation: il est means he is.
  - type: text-input
    prompt: Type the French for "she is".
    acceptedAnswers:
      - elle est
    answerType: text
    explanation: The expected answer is "elle est"; the prompt gives the meaning or pattern to recall.
  - type: fill-blank
    prompt: "\"c'est\" means ___."
    sentenceBefore: "\"c'est\" means"
    sentenceAfter: .
    choices:
      - it is
      - I am
      - I have
      - he is
    correctAnswer: it is
    explanation: The sentence clue points to "it is" as the word that best completes the blank.
  - type: match-pairs
    prompt: Match the build simple french sentences words.
    pairs:
      - left: il est
        right: he is
      - left: elle est
        right: she is
      - left: c'est
        right: it is
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: order-items
    prompt: Build "je suis avec mon ami".
    items:
      - ami
      - mon
      - avec
      - suis
      - je
    correctOrder:
      - je
      - suis
      - avec
      - mon
      - ami
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Ami
        line: Qui es-tu?
    choices:
      - Je suis un eleve.
      - Le menu est ici.
      - Il est dix.
    correctAnswer: Je suis un eleve.
    explanation: The correct response best fits what the speakers have already said.
  - type: passage-question
    prompt: Read the short French resource.
    passageTitle: Build Simple French Sentences
    passage: En francais, on voit "il est" et "elle est". On pratique aussi "c'est" dans une phrase courte.
    question: Which word or phrase from the resource means "she is"?
    choices:
      - elle est
      - je suis
      - j'ai
      - il est
    correctAnswer: elle est
    explanation: The passage gives the clue needed to choose the answer.
  - type: speaking-prompt
    prompt: 'Say the model sentence: "je suis avec mon ami".'
    minSeconds: 5
    sampleAnswer: je suis avec mon ami
    checklist:
      - Use French
      - Speak clearly
      - Use the target word or phrase
---
