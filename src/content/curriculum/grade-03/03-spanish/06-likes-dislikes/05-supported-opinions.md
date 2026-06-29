---
id: lesson_grade3_spanish_supported_opinions
slug: supported-opinions
title: Supported Opinions
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "porque" mean?
    choices:
      - because
      - please
      - today
      - family
    correctAnswer: because
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
  - type: text-input
    prompt: Type the English meaning of "quiero".
    acceptedAnswers:
      - I want
      - want
    answerType: text
  - type: match-pairs
    prompt: Match each useful chunk.
    pairs:
      - left: quiero agua
        right: I want water
      - left: necesito ayuda
        right: I need help
      - left: puedo leer
        right: I can read
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
  - type: speaking-prompt
    prompt: Say one Spanish opinion with porque.
    minSeconds: 5
    sampleAnswer: Me gusta leer porque es divertido.
    checklist:
      - Use me gusta or prefiero
      - Use porque
---
