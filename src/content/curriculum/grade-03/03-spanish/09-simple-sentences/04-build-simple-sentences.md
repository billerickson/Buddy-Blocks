---
id: lesson_grade3_spanish_build_simple_sentences
slug: build-simple-sentences
title: Build Simple Sentences
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Build Simple Sentences practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: Which sentence means "I like bread"?
    choices:
      - Me gusta pan.
      - Voy a pan.
      - Soy pan.
      - Tengo lunes.
    correctAnswer: Me gusta pan.
    explanation: The best answer is "Me gusta pan." because it matches the context or definition in the prompt.
  - type: fill-blank
    prompt: '"Voy a la casa" means I go to the ___.'
    sentenceBefore: '"Voy a la casa" means I go to the'
    sentenceAfter: .
    choices:
      - house
      - park
      - school
      - library
    correctAnswer: house
    explanation: The sentence clue points to "house" as the word that best completes the blank.
  - type: text-input
    prompt: Type the Spanish sentence for "I have water."
    acceptedAnswers:
      - tengo agua
    answerType: text
    explanation: The expected answer is "tengo agua"; the prompt gives the meaning or pattern to recall.
  - type: match-pairs
    prompt: Match each sentence.
    pairs:
      - left: Soy estudiante.
        right: I am a student.
      - left: Tengo leche.
        right: I have milk.
      - left: Voy al parque.
        right: I go to the park.
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: order-items
    prompt: Build "I need a pencil".
    items:
      - un
      - necesito
      - lapiz
    correctOrder:
      - necesito
      - un
      - lapiz
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
  - type: multi-blank-cloze
    prompt: Complete the sentence.
    parts:
      - "Me "
      - " la "
      - .
    blanks:
      - correctAnswer: gusta
        acceptedAnswers:
          - gusta
        choices:
          - gusta
          - tengo
          - voy
      - correctAnswer: biblioteca
        acceptedAnswers:
          - biblioteca
        choices:
          - biblioteca
          - leche
          - martes
    explanation: Each blank should fit the meaning and grammar of the full sentence or passage.
  - type: dialogue-builder
    prompt: Choose the sentence that fits.
    turns:
      - speaker: Teacher
        line: Necesitas algo?
    choices:
      - Necesito un libro.
      - Soy un parque.
      - Hoy es rojo.
    correctAnswer: Necesito un libro.
    explanation: The correct response best fits what the speakers have already said.
  - type: speaking-prompt
    prompt: Say one simple Spanish sentence.
    minSeconds: 5
    sampleAnswer: Voy a la escuela.
    checklist:
      - Use a learned chunk
      - Use a familiar word
---
