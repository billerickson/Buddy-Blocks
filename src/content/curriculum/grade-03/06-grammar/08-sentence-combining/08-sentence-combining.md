---
id: "lesson_grade3_grammar_sentence_combining"
slug: "sentence-combining"
title: "Sentence Combining"
xpBase: 10
config:
  intro:
    - title: "Make Sentences Stronger"
      body: "Sentence combining joins related ideas so writing sounds smoother."
      bullets:
        - "Use and to join similar ideas."
        - "Use but to show a contrast."
        - "Do not repeat words you do not need."
questions:
  - type: multiple-choice
    prompt: "Best combination: \"Nora drew a map. Nora labeled the map.\""
    choices:
      - "Nora drew a map and labeled it."
      - "Nora drew a map but Nora."
      - "Nora labeled drew a map."
      - "A map Nora labeled drew."
    correctAnswer: "Nora drew a map and labeled it."
  - type: fill-blank
    prompt: "Use ___ to join two similar actions."
    sentenceBefore: "Use"
    sentenceAfter: "to join two similar actions."
    choices:
      - "and"
      - "but"
      - "because"
      - "under"
    correctAnswer: "and"
  - type: match-pairs
    prompt: "Match each joining word to its job."
    pairs:
      - left: "and"
        right: "adds a similar idea"
      - left: "but"
        right: "shows contrast"
      - left: "because"
        right: "gives a reason"
      - left: "or"
        right: "shows a choice"
  - type: text-input
    prompt: "Type the joining word in \"We wanted to play, but it rained.\""
    acceptedAnswers:
      - "but"
    answerType: "text"
  - type: multiple-choice
    prompt: "Which combined sentence avoids repeated words?"
    choices:
      - "The dog barked and the dog ran."
      - "The dog barked and ran."
      - "The dog barked dog ran."
      - "The dog and barked ran."
    correctAnswer: "The dog barked and ran."
  - type: error-correction
    prompt: "Combine the sentences: I opened the box. I found a note."
    sentence: "I opened the box. I found a note."
    acceptedAnswers:
      - "I opened the box and found a note."
  - type: order-items
    prompt: "Put the combined sentence parts in order."
    items:
      - "and carried it home"
      - "Lena found a shell"
    correctOrder:
      - "Lena found a shell"
      - "and carried it home"
  - type: passage-question
    prompt: "Read the passage and answer."
    passageTitle: "Two Ideas"
    passage: "The trail was steep. The hikers kept climbing."
    question: "Which word best combines the ideas?"
    choices:
      - "but"
      - "or"
      - "under"
      - "sofa"
    correctAnswer: "but"
---
