---
id: lesson_grade3_logic_patterns_and_rules
slug: patterns-and-rules
title: Patterns And Rules
xpBase: 10
config:
  intro:
    - title: Patterns Follow Rules
      body: A pattern repeats or changes in a way you can describe.
      bullets:
        - Look at what changes.
        - Name the rule.
        - Use the rule to find what comes next.
questions:
  - type: multiple-choice
    prompt: "What comes next: red, blue, red, blue, ___?"
    choices:
      - red
      - blue
      - green
      - yellow
    correctAnswer: red
    explanation: The best answer is "red" because it matches the context or definition in the prompt.
  - type: multiple-choice
    prompt: "What is the rule: 2, 4, 6, 8?"
    choices:
      - add 1
      - add 2
      - subtract 2
      - double each time
    correctAnswer: add 2
    explanation: The best answer is "add 2" because it matches the context or definition in the prompt.
  - type: fill-blank
    prompt: The pattern A, B, A, B repeats every ___ items.
    sentenceBefore: The pattern A, B, A, B repeats every
    sentenceAfter: items.
    choices:
      - "1"
      - "2"
      - "3"
      - "4"
    correctAnswer: "2"
    explanation: The sentence clue points to "2" as the word that best completes the blank.
  - type: match-pairs
    prompt: Match each pattern to its rule.
    pairs:
      - left: 5, 10, 15
        right: add 5
      - left: circle, square, circle
        right: repeat two shapes
      - left: 9, 8, 7
        right: subtract 1
      - left: small, medium, large
        right: grow by size
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: order-items
    prompt: Continue the growing pattern.
    items:
      - "4"
      - "2"
      - "6"
    correctOrder:
      - "2"
      - "4"
      - "6"
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
  - type: text-input
    prompt: "Type the next number: 3, 6, 9, 12, ___"
    acceptedAnswers:
      - "15"
    answerType: number
    explanation: The expected answer is "15"; the prompt gives the meaning or pattern to recall.
  - type: passage-question
    prompt: Read the passage and answer.
    passageTitle: Pattern Hunt
    passage: Milo clapped twice, stomped once, clapped twice, stomped once.
    question: What should Milo do next?
    choices:
      - clap twice
      - stomp twice
      - sit down
      - snap once
    correctAnswer: clap twice
    explanation: The passage gives the clue needed to choose the answer.
  - type: constructed-response
    prompt: "Describe the rule for this pattern: star, star, moon, star, star, moon."
    sampleAnswer: Two stars, then one moon, repeating.
---
