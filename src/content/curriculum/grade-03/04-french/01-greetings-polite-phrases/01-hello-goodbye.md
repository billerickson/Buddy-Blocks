---
id: lesson_grade3_french_hello_goodbye
slug: hello-goodbye
title: Hello And Goodbye
xpBase: 10
questions:
  - type: multiple-choice
    prompt: What does "bonjour" mean?
    choices:
      - hello
      - goodbye
      - please
      - thank you
    correctAnswer: hello
    explanation: bonjour means hello.
  - type: text-input
    prompt: Type the French for "goodbye".
    acceptedAnswers:
      - au revoir
    answerType: text
  - type: fill-blank
    prompt: "\"s'il vous plait\" means ___."
    sentenceBefore: "\"s'il vous plait\" means"
    sentenceAfter: .
    choices:
      - please
      - hello
      - goodbye
      - thank you
    correctAnswer: please
  - type: match-pairs
    prompt: Match the hello and goodbye words.
    pairs:
      - left: bonjour
        right: hello
      - left: au revoir
        right: goodbye
      - left: s'il vous plait
        right: please
  - type: order-items
    prompt: Build "ecoute s il vous plait".
    items:
      - s il vous plait
      - ecoute
    correctOrder:
      - ecoute
      - s il vous plait
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Ami
        line: Comment ca va?
    choices:
      - Ca va bien, merci.
      - Je vais au parc.
      - J ai un crayon.
    correctAnswer: Ca va bien, merci.
  - type: passage-question
    prompt: Read the short French resource.
    passageTitle: Hello And Goodbye
    passage: En francais, on voit "bonjour" et "au revoir". On pratique aussi "s'il
      vous plait" dans une phrase courte.
    question: Which word or phrase from the resource means "goodbye"?
    choices:
      - au revoir
      - bonjour
      - s'il vous plait
      - merci
    correctAnswer: au revoir
  - type: speaking-prompt
    prompt: 'Say the model sentence: "ecoute s il vous plait".'
    minSeconds: 5
    sampleAnswer: ecoute s il vous plait
    checklist:
      - Use French
      - Speak clearly
      - Use the target word or phrase
---
