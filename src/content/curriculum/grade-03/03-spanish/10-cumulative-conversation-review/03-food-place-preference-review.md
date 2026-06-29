---
id: lesson_grade3_spanish_cumulative_food_place_preference_review
slug: food-place-preference-review
title: Food And Place Review
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "Me gusta la biblioteca" mean?
    choices:
      - I like the library
      - I need the library
      - I go to bread
      - I have water
    correctAnswer: I like the library
  - type: fill-blank
    prompt: '"Quiero agua, por favor" means I want ___.'
    sentenceBefore: '"Quiero agua, por favor" means I want'
    sentenceAfter: .
    choices:
      - water
      - milk
      - rice
      - fruit
    correctAnswer: water
  - type: text-input
    prompt: Type the Spanish phrase for "I go to school."
    acceptedAnswers:
      - voy a la escuela
    answerType: text
  - type: match-pairs
    prompt: Match each phrase.
    pairs:
      - left: la casa
        right: house
      - left: manzana
        right: apple
      - left: prefiero
        right: I prefer
  - type: order-items
    prompt: Build "I go to the park".
    items:
      - parque
      - voy
      - al
    correctOrder:
      - voy
      - al
      - parque
  - type: passage-question
    prompt: Read the plan.
    passageTitle: Plan
    passage: Hoy voy al parque. Quiero agua y pan. Me gusta jugar.
    question: Where is the speaker going?
    choices:
      - park
      - library
      - house
      - school
    correctAnswer: park
  - type: dialogue-builder
    prompt: Choose the best answer.
    turns:
      - speaker: Ana
        line: Que quieres?
    choices:
      - Quiero agua, por favor.
      - Soy estudiante.
      - Hoy es lunes.
    correctAnswer: Quiero agua, por favor.
  - type: speaking-prompt
    prompt: Say a place or food preference in Spanish.
    minSeconds: 5
    sampleAnswer: Me gusta el parque. Quiero agua.
    checklist:
      - Use me gusta or quiero
      - Use a place or food word
---
