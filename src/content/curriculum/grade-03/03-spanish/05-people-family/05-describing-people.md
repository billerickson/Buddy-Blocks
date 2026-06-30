---
id: lesson_grade3_spanish_describing_people
slug: describing-people
title: Describing People
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Describing People practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "amable" mean?
    choices:
      - kind
      - tall
      - small
      - hungry
    correctAnswer: kind
    explanation: The best answer is "kind" because it matches the context or definition in the prompt.
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
    explanation: The sentence clue points to "funny" as the word that best completes the blank.
  - type: text-input
    prompt: Type the Spanish word for "kind."
    acceptedAnswers:
      - amable
    answerType: text
    explanation: The expected answer is "amable"; the prompt gives the meaning or pattern to recall.
  - type: match-pairs
    prompt: Match each description.
    pairs:
      - left: alto
        right: tall
      - left: bajo
        right: short
      - left: amable
        right: kind
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
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
    explanation: Each blank should fit the meaning and grammar of the full sentence or passage.
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
    explanation: The passage gives the clue needed to choose the answer.
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
    explanation: The correct response best fits what the speakers have already said.
  - type: speaking-prompt
    prompt: Say one Spanish sentence describing a person.
    minSeconds: 5
    sampleAnswer: Mi amigo es amable.
    checklist:
      - Use mi amigo or mi amiga
      - Use a description word
---
