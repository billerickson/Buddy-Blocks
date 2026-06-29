---
id: lesson_grade4_french_questions_and_short_conversations_sentence_meaning
slug: questions-and-short-conversations-sentence-meaning
title: Sentence Meaning
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "ou vas-tu" mean?
    choices:
      - where are you going
      - what is your name
      - what do you like
      - why
    correctAnswer: where are you going
    explanation: ou vas-tu means where are you going.
  - type: text-input
    prompt: Type the French for "why".
    acceptedAnswers:
      - pourquoi
    answerType: text
  - type: fill-blank
    prompt: '"parce que" means ___.'
    sentenceBefore: '"parce que" means'
    sentenceAfter: .
    choices:
      - because
      - what is your name
      - what do you like
      - where are you going
    correctAnswer: because
  - type: match-pairs
    prompt: Match the sentence meaning words.
    pairs:
      - left: ou vas-tu
        right: where are you going
      - left: pourquoi
        right: why
      - left: parce que
        right: because
  - type: order-items
    prompt: Build "parce que j aime".
    items:
      - j aime
      - que
      - parce
    correctOrder:
      - parce
      - que
      - j aime
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Ami
        line: Pourquoi veux-tu lire?
    choices:
      - Parce que j'aime lire.
      - Il est quarante.
      - La regle est bleue.
    correctAnswer: Parce que j'aime lire.
  - type: passage-question
    prompt: Read the short French resource.
    passageTitle: Sentence Meaning
    passage: En francais, on voit "ou vas-tu" et "pourquoi". On pratique aussi
      "parce que" dans une phrase courte.
    question: Which word or phrase from the resource means "why"?
    choices:
      - pourquoi
      - comment tu t'appelles
      - qu'est-ce que tu aimes
      - ou vas-tu
    correctAnswer: pourquoi
  - type: speaking-prompt
    prompt: 'Say the model sentence: "parce que j aime".'
    minSeconds: 5
    sampleAnswer: parce que j aime
    checklist:
      - Use French
      - Speak clearly
      - Use the target word or phrase
---
