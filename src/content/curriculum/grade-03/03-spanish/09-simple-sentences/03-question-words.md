---
id: lesson_grade3_spanish_question_words
slug: question-words
title: Question Words
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "Que" often ask?
    choices:
      - what
      - where
      - who
      - when
    correctAnswer: what
  - type: fill-blank
    prompt: '"Donde" asks ___.'
    sentenceBefore: '"Donde" asks'
    sentenceAfter: .
    choices:
      - where
      - what
      - who
      - why
    correctAnswer: where
  - type: text-input
    prompt: Type the English meaning of "Quien".
    acceptedAnswers:
      - who
    answerType: text
  - type: match-pairs
    prompt: Match each question word.
    pairs:
      - left: Que
        right: what
      - left: Donde
        right: where
      - left: Quien
        right: who
  - type: order-items
    prompt: Build "Where are you going?"
    items:
      - vas
      - donde
    correctOrder:
      - donde
      - vas
  - type: dialogue-builder
    prompt: Choose the answer to "Donde vas?"
    turns:
      - speaker: Ana
        line: Donde vas?
    choices:
      - Voy a la escuela.
      - Soy Luis.
      - Es rojo.
    correctAnswer: Voy a la escuela.
  - type: passage-question
    prompt: Read the mini-dialogue.
    passageTitle: Pregunta
    passage: "Ana: Quien es? Luis: Es mi papa."
    question: What did Ana ask?
    choices:
      - who it is
      - where he goes
      - what color it is
      - what he likes
    correctAnswer: who it is
  - type: constructed-response
    prompt: Write one Spanish question from this lesson.
    minWords: 2
    sampleAnswer: Donde vas?
    checklist:
      - Use que, donde, or quien
      - Write a short question
---
