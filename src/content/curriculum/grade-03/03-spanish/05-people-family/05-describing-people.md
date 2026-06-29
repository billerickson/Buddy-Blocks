---
id: lesson_grade3_spanish_describing_people
slug: describing-people
title: Describing People
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "amable" mean?
    choices:
      - kind
      - tall
      - small
      - hungry
    correctAnswer: kind
  - type: fill-blank
    prompt: '"Mi amigo es divertido" means my friend is ___.'
    sentenceBefore: '"Mi amigo es divertido" means my friend is'
    sentenceAfter: .
    choices:
      - funny
      - tired
      - blue
      - late
    correctAnswer: funny
  - type: text-input
    prompt: Type the Spanish word for "kind."
    acceptedAnswers:
      - amable
    answerType: text
  - type: match-pairs
    prompt: Match each description.
    pairs:
      - left: alto
        right: tall
      - left: bajo
        right: short
      - left: amable
        right: kind
  - type: multi-blank-cloze
    prompt: Complete the description.
    parts:
      - "Mi "
      - " es "
      - .
    blanks:
      - correctAnswer: amigo
        acceptedAnswers:
          - amigo
          - amiga
        choices:
          - amigo
          - pan
          - rojo
      - correctAnswer: amable
        acceptedAnswers:
          - amable
        choices:
          - amable
          - lunes
          - agua
  - type: passage-question
    prompt: Read the description.
    passageTitle: Un amigo
    passage: Mi amigo Luis es amable y divertido.
    question: Which two words describe Luis?
    choices:
      - kind and funny
      - tall and short
      - hungry and thirsty
      - red and blue
    correctAnswer: kind and funny
  - type: dialogue-builder
    prompt: Choose a fitting reply.
    turns:
      - speaker: Mia
        line: Como es tu amiga?
    choices:
      - Mi amiga es amable.
      - Hoy es martes.
      - Necesito pan.
    correctAnswer: Mi amiga es amable.
  - type: speaking-prompt
    prompt: Say one Spanish sentence describing a person.
    minSeconds: 5
    sampleAnswer: Mi amigo es amable.
    checklist:
      - Use mi amigo or mi amiga
      - Use a description word
---
