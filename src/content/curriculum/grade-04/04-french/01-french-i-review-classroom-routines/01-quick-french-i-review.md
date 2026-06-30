---
id: lesson_grade4_french_quick_french_i_review
slug: quick-french-i-review
title: Quick French I Review
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Quick French I Review practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "bonjour" mean?
    choices:
      - hello
      - thank you
      - class
      - listen
    correctAnswer: hello
    explanation: bonjour means hello.
  - type: text-input
    prompt: Type the French for "thank you".
    acceptedAnswers:
      - merci
    answerType: text
    explanation: The expected answer is "merci"; the prompt gives the meaning or pattern to recall.
  - type: fill-blank
    prompt: '"la classe" means ___.'
    sentenceBefore: '"la classe" means'
    sentenceAfter: .
    choices:
      - class
      - hello
      - thank you
      - listen
    correctAnswer: class
    explanation: The sentence clue points to "class" as the word that best completes the blank.
  - type: match-pairs
    prompt: Match the quick french i review words.
    pairs:
      - left: bonjour
        right: hello
      - left: merci
        right: thank you
      - left: la classe
        right: class
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: order-items
    prompt: Build "ouvrez le livre".
    items:
      - livre
      - le
      - ouvrez
    correctOrder:
      - ouvrez
      - le
      - livre
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Ami
        line: Que dit le professeur?
    choices:
      - Ouvrez le livre.
      - Je voudrais de l eau.
      - Ma famille est grande.
    correctAnswer: Ouvrez le livre.
    explanation: The correct response best fits what the speakers have already said.
  - type: passage-question
    prompt: Read the short French resource.
    passageTitle: Quick French I Review
    passage: En francais, on voit "bonjour" et "merci". On pratique aussi "la classe" dans une phrase courte.
    question: Which word or phrase from the resource means "thank you"?
    choices:
      - merci
      - bonjour
      - la classe
      - ecoutez
    correctAnswer: merci
    explanation: The passage gives the clue needed to choose the answer.
  - type: speaking-prompt
    prompt: 'Say the model sentence: "ouvrez le livre".'
    minSeconds: 5
    sampleAnswer: ouvrez le livre
    checklist:
      - Use French
      - Speak clearly
      - Use the target word or phrase
---
