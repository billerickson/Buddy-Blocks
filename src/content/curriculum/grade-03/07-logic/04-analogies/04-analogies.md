---
id: lesson_grade3_logic_analogies
slug: analogies
title: Analogies
xpBase: 10
config:
  intro:
    - title: Relationship Clues
      body: An analogy compares two pairs. The relationship in the first pair should match the relationship in the second pair.
      bullets:
        - Bird is to nest as bee is to hive.
        - Look for the relationship, not just the words.
questions:
  - type: multiple-choice
    prompt: Bird is to nest as bee is to ___.
    choices:
      - hive
      - water
      - leaf
      - cloud
    correctAnswer: hive
    explanation: The best answer is "hive" because it matches the context or definition in the prompt.
  - type: multiple-choice
    prompt: Pencil is to write as scissors are to ___.
    choices:
      - cut
      - sleep
      - swim
      - melt
    correctAnswer: cut
    explanation: The best answer is "cut" because it matches the context or definition in the prompt.
  - type: fill-blank
    prompt: Kitten is to cat as puppy is to ___.
    sentenceBefore: Kitten is to cat as puppy is to
    sentenceAfter: .
    choices:
      - dog
      - bird
      - calf
      - kit
    correctAnswer: dog
    explanation: The sentence clue points to "dog" as the word that best completes the blank.
  - type: match-pairs
    prompt: Match each analogy relationship.
    pairs:
      - left: hand/glove
        right: body part and covering
      - left: seed/plant
        right: young and grown
      - left: author/book
        right: maker and made thing
      - left: key/lock
        right: tool and use
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: order-items
    prompt: Complete the size analogy from small to large.
    items:
      - tree
      - acorn
      - sapling
    correctOrder:
      - acorn
      - sapling
      - tree
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
  - type: text-input
    prompt: "Type the missing word: wheel is to car as sail is to ___."
    acceptedAnswers:
      - boat
      - ship
    answerType: text
    explanation: The expected answer is "boat"; the prompt gives the meaning or pattern to recall.
  - type: passage-question
    prompt: Read the passage and answer.
    passageTitle: Analogy Clue
    passage: A library holds books. A garage holds cars.
    question: Library is to books as garage is to what?
    choices:
      - cars
      - pages
      - roads
      - shelves
    correctAnswer: cars
    explanation: The passage gives the clue needed to choose the answer.
  - type: constructed-response
    prompt: Explain the relationship in "chef is to meal".
    sampleAnswer: A chef makes a meal.
---
