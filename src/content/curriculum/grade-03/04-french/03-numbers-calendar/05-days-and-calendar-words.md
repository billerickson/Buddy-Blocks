---
id: lesson_grade3_french_days_and_calendar_words
slug: days-and-calendar-words
title: Days And Calendar Words
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "aujourd'hui" mean?
    choices:
      - today
      - one
      - two
      - three
    correctAnswer: today
    explanation: aujourd'hui means today.
  - type: text-input
    prompt: Type the French for "tomorrow".
    acceptedAnswers:
      - demain
    answerType: text
  - type: fill-blank
    prompt: '"un" means ___.'
    sentenceBefore: '"un" means'
    sentenceAfter: .
    choices:
      - one
      - two
      - three
      - ten
    correctAnswer: one
  - type: match-pairs
    prompt: Match the days and calendar words words.
    pairs:
      - left: aujourd'hui
        right: today
      - left: demain
        right: tomorrow
      - left: un
        right: one
  - type: order-items
    prompt: Build "aujourd'hui est lundi".
    items:
      - lundi
      - est
      - aujourd'hui
    correctOrder:
      - aujourd'hui
      - est
      - lundi
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Ami
        line: Quel jour est-ce?
    choices:
      - Aujourd'hui est lundi.
      - Je suis content.
      - Le livre est rouge.
    correctAnswer: Aujourd'hui est lundi.
  - type: passage-question
    prompt: Read the short French resource.
    passageTitle: Days And Calendar Words
    passage: En francais, on voit "aujourd'hui" et "demain". On pratique aussi "un"
      dans une phrase courte.
    question: Which word or phrase from the resource means "tomorrow"?
    choices:
      - demain
      - un
      - deux
      - trois
    correctAnswer: demain
  - type: speaking-prompt
    prompt: "Say the model sentence: \"aujourd'hui est lundi\"."
    minSeconds: 5
    sampleAnswer: aujourd'hui est lundi
    checklist:
      - Use French
      - Speak clearly
      - Use the target word or phrase
---
