---
id: lesson_grade3_french_food_words
slug: food-words
title: Food Words
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Food Words practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "j'aime" mean?
    choices:
      - I like
      - I do not like
      - I want
      - I need
    correctAnswer: I like
    explanation: j'aime means I like.
  - type: text-input
    prompt: Type the French for "I do not like".
    acceptedAnswers:
      - je n'aime pas
      - je n aime pas
    answerType: text
    explanation: The expected answer is "je n'aime pas"; the prompt gives the meaning or pattern to recall.
  - type: fill-blank
    prompt: '"je veux" means ___.'
    sentenceBefore: '"je veux" means'
    sentenceAfter: .
    choices:
      - I want
      - I like
      - I do not like
      - I need
    correctAnswer: I want
    explanation: The sentence clue points to "I want" as the word that best completes the blank.
  - type: match-pairs
    prompt: Match the food words words.
    pairs:
      - left: j'aime
        right: I like
      - left: je n'aime pas
        right: I do not like
      - left: je veux
        right: I want
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
    passageTitle: Food Words
    passage: En francais, on voit "j'aime" et "je n'aime pas". On pratique aussi "je veux" dans une phrase courte.
    question: Which word or phrase from the resource means "I do not like"?
    choices:
      - je n'aime pas
      - j'aime
      - je veux
      - j'ai besoin de
    correctAnswer: je n'aime pas
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
