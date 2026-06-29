---
id: lesson_grade3_spanish_preference_questions
slug: preference-questions
title: Preference Questions
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "Me gusta leer" mean?
    choices:
      - I like to read
      - I need to read
      - I go to read
      - I can count
    correctAnswer: I like to read
  - type: fill-blank
    prompt: '"No me gusta" means I ___ like.'
    sentenceBefore: '"No me gusta" means I'
    sentenceAfter: like.
    choices:
      - do not
      - always
      - can
      - need
    correctAnswer: do not
  - type: text-input
    prompt: Type the Spanish phrase for "I like."
    acceptedAnswers:
      - me gusta
    answerType: text
  - type: match-pairs
    prompt: Match each preference phrase.
    pairs:
      - left: me gusta
        right: I like
      - left: no me gusta
        right: I do not like
      - left: prefiero
        right: I prefer
  - type: order-items
    prompt: Build "I like to play".
    items:
      - jugar
      - me
      - gusta
    correctOrder:
      - me
      - gusta
      - jugar
  - type: dialogue-builder
    prompt: Choose the best answer.
    turns:
      - speaker: Leo
        line: Te gusta leer?
    choices:
      - Si, me gusta leer.
      - Hoy es lunes.
      - Es mi papa.
    correctAnswer: Si, me gusta leer.
  - type: passage-question
    prompt: Read the opinion.
    passageTitle: Gustos
    passage: Me gusta jugar. No me gusta correr.
    question: What does the speaker like?
    choices:
      - playing
      - running
      - reading
      - cooking
    correctAnswer: playing
  - type: constructed-response
    prompt: Write a Spanish like or dislike sentence.
    minWords: 3
    sampleAnswer: Me gusta jugar.
    checklist:
      - Use me gusta or no me gusta
      - Name an activity
---
