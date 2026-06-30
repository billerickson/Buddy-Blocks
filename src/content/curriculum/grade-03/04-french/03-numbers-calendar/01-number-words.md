---
id: lesson_grade3_french_number_words
slug: number-words
title: Number Words
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Number Words practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "trois" mean?
    choices:
      - three
      - one
      - two
      - ten
    correctAnswer: three
    explanation: trois means three.
  - type: text-input
    prompt: Type the French for "ten".
    acceptedAnswers:
      - dix
    answerType: text
    explanation: The expected answer is "dix"; the prompt gives the meaning or pattern to recall.
  - type: fill-blank
    prompt: '"lundi" means ___.'
    sentenceBefore: '"lundi" means'
    sentenceAfter: .
    choices:
      - Monday
      - one
      - two
      - three
    correctAnswer: Monday
    explanation: The sentence clue points to "Monday" as the word that best completes the blank.
  - type: match-pairs
    prompt: Match the number words words.
    pairs:
      - left: trois
        right: three
      - left: dix
        right: ten
      - left: lundi
        right: Monday
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
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
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
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
    explanation: The correct response best fits what the speakers have already said.
  - type: passage-question
    prompt: Read the short French resource.
    passageTitle: Number Words
    passage: En francais, on voit "trois" et "dix". On pratique aussi "lundi" dans une phrase courte.
    question: Which word or phrase from the resource means "ten"?
    choices:
      - dix
      - un
      - deux
      - trois
    correctAnswer: dix
    explanation: The passage gives the clue needed to choose the answer.
  - type: speaking-prompt
    prompt: "Say the model sentence: \"aujourd'hui est lundi\"."
    minSeconds: 5
    sampleAnswer: aujourd'hui est lundi
    checklist:
      - Use French
      - Speak clearly
      - Use the target word or phrase
---
