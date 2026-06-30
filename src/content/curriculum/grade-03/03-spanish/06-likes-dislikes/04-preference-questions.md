---
id: lesson_grade3_spanish_preference_questions
slug: preference-questions
title: Preference Questions
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Preference Questions practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "Me gusta leer" mean?
    choices:
      - I like to read
      - I need to read
      - I go to read
      - I can count
    correctAnswer: I like to read
    explanation: The best answer is "I like to read" because it matches the context or definition in the prompt.
  - type: fill-blank
    prompt: '"No me gusta" means I ___ like.'
    sentenceBefore: '"No me gusta" means I'
    sentenceAfter: like.
    choices:
      - do not
      - always
      - can
      - need
    correctAnswer: do not
    explanation: The sentence clue points to "do not" as the word that best completes the blank.
  - type: text-input
    prompt: Type the Spanish phrase for "I like."
    acceptedAnswers:
      - me gusta
    answerType: text
    explanation: The expected answer is "me gusta"; the prompt gives the meaning or pattern to recall.
  - type: match-pairs
    prompt: Match each preference phrase.
    pairs:
      - left: me gusta
        right: I like
      - left: no me gusta
        right: I do not like
      - left: prefiero
        right: I prefer
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: order-items
    prompt: Build "I like to play".
    items:
      - jugar
      - me
      - gusta
    correctOrder:
      - me
      - gusta
      - jugar
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
  - type: dialogue-builder
    prompt: Choose the best answer.
    turns:
      - speaker: Leo
        line: Te gusta leer?
    choices:
      - Si, me gusta leer.
      - Hoy es lunes.
      - Es mi papa.
    correctAnswer: Si, me gusta leer.
    explanation: The correct response best fits what the speakers have already said.
  - type: passage-question
    prompt: Read the opinion.
    passageTitle: Gustos
    passage: Me gusta jugar. No me gusta correr.
    question: What does the speaker like?
    choices:
      - playing
      - running
      - reading
      - cooking
    correctAnswer: playing
    explanation: The passage gives the clue needed to choose the answer.
  - type: constructed-response
    prompt: Write a Spanish like or dislike sentence.
    minWords: 3
    sampleAnswer: Me gusta jugar.
    checklist:
      - Use me gusta or no me gusta
      - Name an activity
---
