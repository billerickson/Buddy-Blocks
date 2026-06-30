---
id: lesson_grade3_spanish_supported_opinions
slug: supported-opinions
title: Supported Opinions
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Supported Opinions practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "porque" mean?
    choices:
      - because
      - please
      - today
      - family
    correctAnswer: because
    explanation: The best answer is "because" because it matches the context or definition in the prompt.
  - type: fill-blank
    prompt: '"Me gusta leer porque es divertido" gives a reason with ___.'
    sentenceBefore: '"Me gusta leer porque es divertido" gives a reason with'
    sentenceAfter: .
    choices:
      - porque
      - hola
      - lunes
      - azul
    correctAnswer: porque
    explanation: The sentence clue points to "porque" as the word that best completes the blank.
  - type: text-input
    prompt: Type the English meaning of "quiero".
    acceptedAnswers:
      - I want
      - want
    answerType: text
    explanation: The expected answer is "I want"; the prompt gives the meaning or pattern to recall.
  - type: match-pairs
    prompt: Match each useful chunk.
    pairs:
      - left: quiero agua
        right: I want water
      - left: necesito ayuda
        right: I need help
      - left: puedo leer
        right: I can read
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: multi-blank-cloze
    prompt: Complete the opinion.
    parts:
      - "Me "
      - " jugar "
      - " es divertido."
    blanks:
      - correctAnswer: gusta
        acceptedAnswers:
          - gusta
        choices:
          - gusta
          - voy
          - tengo
      - correctAnswer: porque
        acceptedAnswers:
          - porque
        choices:
          - porque
          - pero
          - hola
    explanation: Each blank should fit the meaning and grammar of the full sentence or passage.
  - type: dialogue-builder
    prompt: Choose the answer with a reason.
    turns:
      - speaker: Ana
        line: Que prefieres?
    choices:
      - Prefiero leer porque es divertido.
      - Leer.
      - Buenos dias.
    correctAnswer: Prefiero leer porque es divertido.
    explanation: The correct response best fits what the speakers have already said.
  - type: passage-question
    prompt: Read the opinion.
    passageTitle: Opinion
    passage: No me gusta correr porque es dificil. Prefiero caminar.
    question: What does the speaker prefer?
    choices:
      - walking
      - running
      - reading
      - eating
    correctAnswer: walking
    explanation: The passage gives the clue needed to choose the answer.
  - type: speaking-prompt
    prompt: Say one Spanish opinion with porque.
    minSeconds: 5
    sampleAnswer: Me gusta leer porque es divertido.
    checklist:
      - Use me gusta or prefiero
      - Use porque
---
