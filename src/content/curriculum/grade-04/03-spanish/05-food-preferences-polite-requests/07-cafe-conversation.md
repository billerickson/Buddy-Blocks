---
id: lesson_grade4_spanish_cafe_conversation
slug: cafe-conversation
title: Cafe Conversation
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Cafe Conversation practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "los frijoles" mean?
    choices:
      - beans
      - snack
      - rice
      - water
    correctAnswer: beans
    explanation: los frijoles means beans.
  - type: text-input
    prompt: Type the Spanish for "water".
    acceptedAnswers:
      - el agua
    answerType: text
    explanation: The expected answer is "el agua"; the prompt gives the meaning or pattern to recall.
  - type: fill-blank
    prompt: '"quiero" means ___.'
    sentenceBefore: '"quiero" means'
    sentenceAfter: .
    choices:
      - I want
      - snack
      - rice
      - beans
    correctAnswer: I want
    explanation: The sentence clue points to "I want" as the word that best completes the blank.
  - type: match-pairs
    prompt: Match the cafe conversation words.
    pairs:
      - left: los frijoles
        right: beans
      - left: el agua
        right: water
      - left: quiero
        right: I want
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: order-items
    prompt: Build "quisiera agua por favor".
    items:
      - favor
      - por
      - agua
      - quisiera
    correctOrder:
      - quisiera
      - agua
      - por
      - favor
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Amigo
        line: Que quieres?
    choices:
      - Quisiera agua, por favor.
      - Estoy en la clase.
      - La plaza esta cerca.
    correctAnswer: Quisiera agua, por favor.
    explanation: The correct response best fits what the speakers have already said.
  - type: passage-question
    prompt: Read the short Spanish resource.
    passageTitle: Cafe Conversation
    passage: En el cafe, veo "los frijoles" en el menu. Mi amigo pide "el agua" y yo digo "quiero".
    question: Which word or phrase from the resource means "water"?
    choices:
      - el agua
      - la merienda
      - el arroz
      - los frijoles
    correctAnswer: el agua
    explanation: The passage gives the clue needed to choose the answer.
  - type: speaking-prompt
    prompt: 'Say the model sentence: "quisiera agua por favor".'
    minSeconds: 5
    sampleAnswer: quisiera agua por favor
    checklist:
      - Use Spanish
      - Speak clearly
      - Use the target word or phrase
---
