---
id: lesson_grade3_french_color_words
slug: color-words
title: Color Words
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Color Words practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "bleu" mean?
    choices:
      - blue
      - red
      - green
      - yellow
    correctAnswer: blue
    explanation: bleu means blue.
  - type: text-input
    prompt: Type the French for "green".
    acceptedAnswers:
      - vert
    answerType: text
    explanation: The expected answer is "vert"; the prompt gives the meaning or pattern to recall.
  - type: fill-blank
    prompt: '"jaune" means ___.'
    sentenceBefore: '"jaune" means'
    sentenceAfter: .
    choices:
      - yellow
      - red
      - blue
      - green
    correctAnswer: yellow
    explanation: The sentence clue points to "yellow" as the word that best completes the blank.
  - type: match-pairs
    prompt: Match the color words words.
    pairs:
      - left: bleu
        right: blue
      - left: vert
        right: green
      - left: jaune
        right: yellow
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: order-items
    prompt: Build "le crayon est bleu".
    items:
      - bleu
      - est
      - crayon
      - le
    correctOrder:
      - le
      - crayon
      - est
      - bleu
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Ami
        line: Quelle couleur est le crayon?
    choices:
      - Le crayon est bleu.
      - Bonjour, madame.
      - Je veux une pomme.
    correctAnswer: Le crayon est bleu.
    explanation: The correct response best fits what the speakers have already said.
  - type: passage-question
    prompt: Read the short French resource.
    passageTitle: Color Words
    passage: En francais, on voit "bleu" et "vert". On pratique aussi "jaune" dans une phrase courte.
    question: Which word or phrase from the resource means "green"?
    choices:
      - vert
      - rouge
      - bleu
      - jaune
    correctAnswer: vert
    explanation: The passage gives the clue needed to choose the answer.
  - type: constructed-response
    prompt: Write one short English note explaining when you could use "bleu".
    minWords: 4
    sampleAnswer: I could use bleu during colors and classroom objects.
    checklist:
      - Name a real situation
      - Show the meaning of the French phrase
---
