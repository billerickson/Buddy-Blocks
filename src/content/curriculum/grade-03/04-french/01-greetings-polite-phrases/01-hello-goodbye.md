---
id: lesson_grade3_french_hello_goodbye
slug: hello-goodbye
title: Hello And Goodbye
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Hello And Goodbye practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
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
    explanation: The expected answer is "au revoir"; the prompt gives the meaning or pattern to recall.
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
    explanation: The sentence clue points to "please" as the word that best completes the blank.
  - type: match-pairs
    prompt: Match the hello and goodbye words.
    pairs:
      - left: bonjour
        right: hello
      - left: au revoir
        right: goodbye
      - left: s'il vous plait
        right: please
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: order-items
    prompt: Build "ecoute s il vous plait".
    items:
      - s il vous plait
      - ecoute
    correctOrder:
      - ecoute
      - s il vous plait
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
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
    explanation: The correct response best fits what the speakers have already said.
  - type: passage-question
    prompt: Read the short French resource.
    passageTitle: Hello And Goodbye
    passage: En francais, on voit "bonjour" et "au revoir". On pratique aussi "s'il vous plait" dans une phrase courte.
    question: Which word or phrase from the resource means "goodbye"?
    choices:
      - au revoir
      - bonjour
      - s'il vous plait
      - merci
    correctAnswer: au revoir
    explanation: The passage gives the clue needed to choose the answer.
  - type: speaking-prompt
    prompt: 'Say the model sentence: "ecoute s il vous plait".'
    minSeconds: 5
    sampleAnswer: ecoute s il vous plait
    checklist:
      - Use French
      - Speak clearly
      - Use the target word or phrase
---
