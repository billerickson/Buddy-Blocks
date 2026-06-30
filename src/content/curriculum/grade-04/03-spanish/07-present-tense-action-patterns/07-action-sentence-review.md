---
id: lesson_grade4_spanish_action_sentence_review
slug: action-sentence-review
title: Action Sentence Review
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Action Sentence Review practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "escribo" mean?
    choices:
      - I write
      - I speak
      - I study
      - I need
    correctAnswer: I write
    explanation: escribo means I write.
  - type: text-input
    prompt: Type the Spanish for "we eat".
    acceptedAnswers:
      - comemos
    answerType: text
    explanation: The expected answer is "comemos"; the prompt gives the meaning or pattern to recall.
  - type: fill-blank
    prompt: '"viven" means ___.'
    sentenceBefore: '"viven" means'
    sentenceAfter: .
    choices:
      - they live
      - I speak
      - I study
      - I need
    correctAnswer: they live
    explanation: The sentence clue points to "they live" as the word that best completes the blank.
  - type: match-pairs
    prompt: Match the action sentence review words.
    pairs:
      - left: escribo
        right: I write
      - left: comemos
        right: we eat
      - left: viven
        right: they live
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: order-items
    prompt: Build "yo estudio en clase".
    items:
      - clase
      - en
      - estudio
      - yo
    correctOrder:
      - yo
      - estudio
      - en
      - clase
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Amigo
        line: Que haces en clase?
    choices:
      - Yo estudio en clase.
      - Quisiera frijoles.
      - La tienda esta a la derecha.
    correctAnswer: Yo estudio en clase.
    explanation: The correct response best fits what the speakers have already said.
  - type: passage-question
    prompt: Read the short Spanish resource.
    passageTitle: Action Sentence Review
    passage: Durante la clase yo digo "escribo". Mi companero dice "comemos". Juntos practicamos "viven".
    question: Which word or phrase from the resource means "we eat"?
    choices:
      - comemos
      - hablo
      - estudio
      - necesito
    correctAnswer: comemos
    explanation: The passage gives the clue needed to choose the answer.
  - type: speaking-prompt
    prompt: 'Say the model sentence: "yo estudio en clase".'
    minSeconds: 5
    sampleAnswer: yo estudio en clase
    checklist:
      - Use Spanish
      - Speak clearly
      - Use the target word or phrase
---
