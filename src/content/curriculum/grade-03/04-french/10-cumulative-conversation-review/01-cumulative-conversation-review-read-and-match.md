---
id: lesson_grade3_french_cumulative_conversation_review_read_and_match
slug: cumulative-conversation-review-read-and-match
title: Read And Match
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Read And Match practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "ma classe" mean?
    choices:
      - my class
      - hello
      - my family
      - I like to read
    correctAnswer: my class
    explanation: ma classe means my class.
  - type: text-input
    prompt: Type the French for "my family".
    acceptedAnswers:
      - ma famille
    answerType: text
    explanation: The expected answer is "ma famille"; the prompt gives the meaning or pattern to recall.
  - type: fill-blank
    prompt: "\"j'aime lire\" means ___."
    sentenceBefore: "\"j'aime lire\" means"
    sentenceAfter: .
    choices:
      - I like to read
      - hello
      - my class
      - my family
    correctAnswer: I like to read
    explanation: The sentence clue points to "I like to read" as the word that best completes the blank.
  - type: match-pairs
    prompt: Match the read and match words.
    pairs:
      - left: ma classe
        right: my class
      - left: ma famille
        right: my family
      - left: j'aime lire
        right: I like to read
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: order-items
    prompt: Build "je vais au parc".
    items:
      - parc
      - au
      - vais
      - je
    correctOrder:
      - je
      - vais
      - au
      - parc
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Ami
        line: Que peux-tu dire en francais?
    choices:
      - Je vais au parc.
      - Thirty is trente.
      - The map is large.
    correctAnswer: Je vais au parc.
    explanation: The correct response best fits what the speakers have already said.
  - type: passage-question
    prompt: Read the short French resource.
    passageTitle: Read And Match
    passage: En francais, on voit "ma classe" et "ma famille". On pratique aussi "j'aime lire" dans une phrase courte.
    question: Which word or phrase from the resource means "my family"?
    choices:
      - ma famille
      - bonjour
      - ma classe
      - j'aime lire
    correctAnswer: ma famille
    explanation: The passage gives the clue needed to choose the answer.
  - type: constructed-response
    prompt: Write one short English note explaining when you could use "ma classe".
    minWords: 4
    sampleAnswer: I could use ma classe during cumulative conversation review.
    checklist:
      - Name a real situation
      - Show the meaning of the French phrase
---
