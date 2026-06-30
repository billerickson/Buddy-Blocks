---
id: "lesson_grade3_logic_analogies"
slug: "analogies"
title: "Analogies"
xpBase: 10
config:
  intro:
    - title: "Relationship Clues"
      body: "An analogy compares two pairs. The relationship in the first pair should match the relationship in the second pair."
      bullets:
        - "Bird is to nest as bee is to hive."
        - "Look for the relationship, not just the words."
questions:
  - type: multiple-choice
    prompt: "Bird is to nest as bee is to ___."
    choices:
      - "hive"
      - "water"
      - "leaf"
      - "cloud"
    correctAnswer: "hive"
  - type: multiple-choice
    prompt: "Pencil is to write as scissors are to ___."
    choices:
      - "cut"
      - "sleep"
      - "swim"
      - "melt"
    correctAnswer: "cut"
  - type: fill-blank
    prompt: "Kitten is to cat as puppy is to ___."
    sentenceBefore: "Kitten is to cat as puppy is to"
    sentenceAfter: "."
    choices:
      - "dog"
      - "bird"
      - "calf"
      - "kit"
    correctAnswer: "dog"
  - type: match-pairs
    prompt: "Match each analogy relationship."
    pairs:
      - left: "hand/glove"
        right: "body part and covering"
      - left: "seed/plant"
        right: "young and grown"
      - left: "author/book"
        right: "maker and made thing"
      - left: "key/lock"
        right: "tool and use"
  - type: order-items
    prompt: "Complete the size analogy from small to large."
    items:
      - "tree"
      - "acorn"
      - "sapling"
    correctOrder:
      - "acorn"
      - "sapling"
      - "tree"
  - type: text-input
    prompt: "Type the missing word: wheel is to car as sail is to ___."
    acceptedAnswers:
      - "boat"
      - "ship"
    answerType: "text"
  - type: passage-question
    prompt: "Read the passage and answer."
    passageTitle: "Analogy Clue"
    passage: "A library holds books. A garage holds cars."
    question: "Library is to books as garage is to what?"
    choices:
      - "cars"
      - "pages"
      - "roads"
      - "shelves"
    correctAnswer: "cars"
  - type: constructed-response
    prompt: "Explain the relationship in \"chef is to meal\"."
    sampleAnswer: "A chef makes a meal."
---
