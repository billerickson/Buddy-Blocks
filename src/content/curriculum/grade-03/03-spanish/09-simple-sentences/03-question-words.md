---
id: lesson_grade3_spanish_question_words
slug: question-words
title: Question Words
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Question Words practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "Que" often ask?
    choices:
      - what
      - where
      - who
      - when
    correctAnswer: what
    explanation: The best answer is "what" because it matches the context or definition in the prompt.
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
    explanation: The sentence clue points to "where" as the word that best completes the blank.
  - type: text-input
    prompt: Type the English meaning of "Quien".
    acceptedAnswers:
      - who
    answerType: text
    explanation: The expected answer is "who"; the prompt gives the meaning or pattern to recall.
  - type: match-pairs
    prompt: Match each question word.
    pairs:
      - left: Que
        right: what
      - left: Donde
        right: where
      - left: Quien
        right: who
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: order-items
    prompt: Build "Where are you going?"
    items:
      - vas
      - donde
    correctOrder:
      - donde
      - vas
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
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
    explanation: The correct response best fits what the speakers have already said.
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
    explanation: The passage gives the clue needed to choose the answer.
  - type: constructed-response
    prompt: Write one Spanish question from this lesson.
    minWords: 2
    sampleAnswer: Donde vas?
    checklist:
      - Use que, donde, or quien
      - Write a short question
---
