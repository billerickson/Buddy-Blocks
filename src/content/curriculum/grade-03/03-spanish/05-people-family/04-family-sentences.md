---
id: lesson_grade3_spanish_family_sentences
slug: family-sentences
title: Family Sentences
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "mi hermana" mean?
    choices:
      - my sister
      - my brother
      - my dad
      - my friend
    correctAnswer: my sister
  - type: fill-blank
    prompt: '"Mi familia" means ___ family.'
    sentenceBefore: '"Mi familia" means'
    sentenceAfter: family.
    choices:
      - my
      - your
      - his
      - red
    correctAnswer: my
  - type: text-input
    prompt: Type the Spanish phrase for "my brother."
    acceptedAnswers:
      - mi hermano
    answerType: text
  - type: match-pairs
    prompt: Match each family phrase.
    pairs:
      - left: mi mama
        right: my mom
      - left: mi papa
        right: my dad
      - left: mi amigo
        right: my friend
  - type: order-items
    prompt: Build "my family is big".
    items:
      - familia
      - grande
      - mi
      - es
    correctOrder:
      - mi
      - familia
      - es
      - grande
  - type: dialogue-builder
    prompt: Choose the best answer.
    turns:
      - speaker: Ana
        line: Quien es?
    choices:
      - Es mi hermano.
      - Es rojo.
      - Son las diez.
    correctAnswer: Es mi hermano.
  - type: passage-question
    prompt: Read the note.
    passageTitle: Mi familia
    passage: Mi familia es grande. Tengo una hermana y un hermano.
    question: Who is in the family?
    choices:
      - a sister and a brother
      - a teacher and a dog
      - a friend and a dad
      - a mom only
    correctAnswer: a sister and a brother
  - type: constructed-response
    prompt: Write one Spanish sentence about family.
    minWords: 3
    sampleAnswer: Mi familia es grande.
    checklist:
      - Use mi familia or mi
      - Use a simple description
---
