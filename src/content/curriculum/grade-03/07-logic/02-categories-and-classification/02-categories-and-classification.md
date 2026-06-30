---
id: lesson_grade3_logic_categories_and_classification
slug: categories-and-classification
title: Categories And Classification
xpBase: 10
config:
  intro:
    - title: Sort By Traits
      body: A category groups things that share a trait.
      bullets:
        - Decide the trait.
        - Test each item.
        - Use the most exact category that fits.
questions:
  - type: multiple-choice
    prompt: Which item belongs with apple, peach, and banana?
    choices:
      - carrot
      - grape
      - bread
      - spoon
    correctAnswer: grape
    explanation: The best answer is "grape" because it matches the context or definition in the prompt.
  - type: multiple-choice
    prompt: Which category fits oak, pine, and maple?
    choices:
      - trees
      - tools
      - rivers
      - colors
    correctAnswer: trees
    explanation: The best answer is "trees" because it matches the context or definition in the prompt.
  - type: fill-blank
    prompt: A category groups things with a shared ___.
    sentenceBefore: A category groups things with a shared
    sentenceAfter: .
    choices:
      - trait
      - sound
      - name only
      - mistake
    correctAnswer: trait
    explanation: The sentence clue points to "trait" as the word that best completes the blank.
  - type: match-pairs
    prompt: Match each item to the best category.
    pairs:
      - left: hammer
        right: tool
      - left: sparrow
        right: bird
      - left: triangle
        right: shape
      - left: violin
        right: instrument
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: order-items
    prompt: Order the categories from broad to specific.
    items:
      - golden retriever
      - animal
      - dog
    correctOrder:
      - animal
      - dog
      - golden retriever
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
  - type: text-input
    prompt: Type the category for red, blue, and green.
    acceptedAnswers:
      - colors
      - color
    answerType: text
    explanation: The expected answer is "colors"; the prompt gives the meaning or pattern to recall.
  - type: passage-question
    prompt: Read the passage and answer.
    passageTitle: Sorting Shelf
    passage: A shelf has forks, spoons, and knives together.
    question: What category do they share?
    choices:
      - utensils
      - animals
      - games
      - plants
    correctAnswer: utensils
    explanation: The passage gives the clue needed to choose the answer.
  - type: constructed-response
    prompt: Name one trait shared by bicycles, scooters, and skateboards.
    sampleAnswer: They are used for transportation.
---
