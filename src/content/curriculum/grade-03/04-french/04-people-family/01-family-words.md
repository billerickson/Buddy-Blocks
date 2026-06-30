---
id: lesson_grade3_french_family_words
slug: family-words
title: Family Words
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Family Words practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "mon pere" mean?
    choices:
      - my father
      - my family
      - my friend
      - my mother
    correctAnswer: my father
    explanation: mon pere means my father.
  - type: text-input
    prompt: Type the French for "my sister".
    acceptedAnswers:
      - ma soeur
    answerType: text
    explanation: The expected answer is "ma soeur"; the prompt gives the meaning or pattern to recall.
  - type: fill-blank
    prompt: '"mon frere" means ___.'
    sentenceBefore: '"mon frere" means'
    sentenceAfter: .
    choices:
      - my brother
      - my family
      - my friend
      - my mother
    correctAnswer: my brother
    explanation: The sentence clue points to "my brother" as the word that best completes the blank.
  - type: match-pairs
    prompt: Match the family words words.
    pairs:
      - left: mon pere
        right: my father
      - left: ma soeur
        right: my sister
      - left: mon frere
        right: my brother
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: order-items
    prompt: Build "voici ma famille".
    items:
      - famille
      - ma
      - voici
    correctOrder:
      - voici
      - ma
      - famille
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Ami
        line: Qui est-ce?
    choices:
      - Voici ma famille.
      - Il est trois.
      - Je vais au marche.
    correctAnswer: Voici ma famille.
    explanation: The correct response best fits what the speakers have already said.
  - type: passage-question
    prompt: Read the short French resource.
    passageTitle: Family Words
    passage: En francais, on voit "mon pere" et "ma soeur". On pratique aussi "mon frere" dans une phrase courte.
    question: Which word or phrase from the resource means "my sister"?
    choices:
      - ma soeur
      - ma famille
      - mon ami
      - ma mere
    correctAnswer: ma soeur
    explanation: The passage gives the clue needed to choose the answer.
  - type: constructed-response
    prompt: Write one short English note explaining when you could use "mon pere".
    minWords: 4
    sampleAnswer: I could use mon pere during people and family.
    checklist:
      - Name a real situation
      - Show the meaning of the French phrase
---
