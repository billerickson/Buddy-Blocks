---
id: lesson_grade3_french_place_words
slug: place-words
title: Place Words
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Place Words practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "la classe" mean?
    choices:
      - class
      - I go
      - I can
      - school
    correctAnswer: class
    explanation: la classe means class.
  - type: text-input
    prompt: Type the French for "to read".
    acceptedAnswers:
      - lire
    answerType: text
    explanation: The expected answer is "lire"; the prompt gives the meaning or pattern to recall.
  - type: fill-blank
    prompt: '"ecrire" means ___.'
    sentenceBefore: '"ecrire" means'
    sentenceAfter: .
    choices:
      - to write
      - I go
      - I can
      - school
    correctAnswer: to write
    explanation: The sentence clue points to "to write" as the word that best completes the blank.
  - type: match-pairs
    prompt: Match the place words words.
    pairs:
      - left: la classe
        right: class
      - left: lire
        right: to read
      - left: ecrire
        right: to write
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: order-items
    prompt: Build "je vais a la classe".
    items:
      - classe
      - la
      - a
      - vais
      - je
    correctOrder:
      - je
      - vais
      - a
      - la
      - classe
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Ami
        line: Ou vas-tu?
    choices:
      - Je vais a la classe.
      - Merci beaucoup.
      - La pomme est rouge.
    correctAnswer: Je vais a la classe.
    explanation: The correct response best fits what the speakers have already said.
  - type: passage-question
    prompt: Read the short French resource.
    passageTitle: Place Words
    passage: En francais, on voit "la classe" et "lire". On pratique aussi "ecrire" dans une phrase courte.
    question: Which word or phrase from the resource means "to read"?
    choices:
      - lire
      - je vais
      - je peux
      - l'ecole
    correctAnswer: lire
    explanation: The passage gives the clue needed to choose the answer.
  - type: constructed-response
    prompt: Write one short English note explaining when you could use "la classe".
    minWords: 4
    sampleAnswer: I could use la classe during places and actions.
    checklist:
      - Name a real situation
      - Show the meaning of the French phrase
---
