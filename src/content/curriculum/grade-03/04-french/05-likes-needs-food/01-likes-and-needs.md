---
id: lesson_grade3_french_likes_and_needs
slug: likes-and-needs
title: Likes And Needs
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Likes And Needs practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "l'eau" mean?
    choices:
      - water
      - I like
      - I do not like
      - I want
    correctAnswer: water
    explanation: l'eau means water.
  - type: text-input
    prompt: Type the French for "bread".
    acceptedAnswers:
      - le pain
    answerType: text
    explanation: The expected answer is "le pain"; the prompt gives the meaning or pattern to recall.
  - type: fill-blank
    prompt: '"la pomme" means ___.'
    sentenceBefore: '"la pomme" means'
    sentenceAfter: .
    choices:
      - apple
      - I like
      - I do not like
      - I want
    correctAnswer: apple
    explanation: The sentence clue points to "apple" as the word that best completes the blank.
  - type: match-pairs
    prompt: Match the likes and needs words.
    pairs:
      - left: l'eau
        right: water
      - left: le pain
        right: bread
      - left: la pomme
        right: apple
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: order-items
    prompt: Build "j'aime la pomme".
    items:
      - pomme
      - la
      - j'aime
    correctOrder:
      - j'aime
      - la
      - pomme
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Ami
        line: Qu est-ce que tu aimes?
    choices:
      - J'aime la pomme.
      - Je suis professeur.
      - Le crayon est vert.
    correctAnswer: J'aime la pomme.
    explanation: The correct response best fits what the speakers have already said.
  - type: passage-question
    prompt: Read the short French resource.
    passageTitle: Likes And Needs
    passage: En francais, on voit "l'eau" et "le pain". On pratique aussi "la pomme" dans une phrase courte.
    question: Which word or phrase from the resource means "bread"?
    choices:
      - le pain
      - j'aime
      - je n'aime pas
      - je veux
    correctAnswer: le pain
    explanation: The passage gives the clue needed to choose the answer.
  - type: speaking-prompt
    prompt: "Say the model sentence: \"j'aime la pomme\"."
    minSeconds: 5
    sampleAnswer: j'aime la pomme
    checklist:
      - Use French
      - Speak clearly
      - Use the target word or phrase
---
