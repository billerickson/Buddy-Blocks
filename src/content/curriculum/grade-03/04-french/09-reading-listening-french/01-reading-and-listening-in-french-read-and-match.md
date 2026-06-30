---
id: lesson_grade3_french_reading_and_listening_in_french_read_and_match
slug: reading-and-listening-in-french-read-and-match
title: Read And Match
xpBase: 10
config:
  intro:
    - title: Meet The Words In Use
      body: This lesson gives Read And Match practice after the preview cards. Use context, familiar patterns, and the answer choices before typing from memory.
      bullets:
        - Read the whole phrase or sentence first.
        - Connect new words to the preview deck.
        - Use feedback to notice the pattern.
questions:
  - type: multiple-choice
    prompt: What does "la note" mean?
    choices:
      - note
      - sign
      - listen
      - look
    correctAnswer: note
    explanation: la note means note.
  - type: text-input
    prompt: Type the French for "sign".
    acceptedAnswers:
      - le panneau
    answerType: text
    explanation: The expected answer is "le panneau"; the prompt gives the meaning or pattern to recall.
  - type: fill-blank
    prompt: '"ecoutez" means ___.'
    sentenceBefore: '"ecoutez" means'
    sentenceAfter: .
    choices:
      - listen
      - note
      - sign
      - look
    correctAnswer: listen
    explanation: The sentence clue points to "listen" as the word that best completes the blank.
  - type: match-pairs
    prompt: Match the read and match words.
    pairs:
      - left: la note
        right: note
      - left: le panneau
        right: sign
      - left: ecoutez
        right: listen
    explanation: Each pair connects a term, example, or sentence part with the matching meaning or role.
  - type: order-items
    prompt: Build "ecoutez la note".
    items:
      - note
      - la
      - ecoutez
    correctOrder:
      - ecoutez
      - la
      - note
    explanation: The correct order follows the sequence, sentence pattern, or ranking described in the prompt.
  - type: dialogue-builder
    prompt: Choose the best response in the conversation.
    turns:
      - speaker: Ami
        line: Que dois-tu trouver?
    choices:
      - Je trouve la reponse.
      - Je veux du pain.
      - Mon frere est ici.
    correctAnswer: Je trouve la reponse.
    explanation: The correct response best fits what the speakers have already said.
  - type: passage-question
    prompt: Read the short French resource.
    passageTitle: Read And Match
    passage: En francais, on voit "la note" et "le panneau". On pratique aussi "ecoutez" dans une phrase courte.
    question: Which word or phrase from the resource means "sign"?
    choices:
      - le panneau
      - la note
      - ecoutez
      - regardez
    correctAnswer: le panneau
    explanation: The passage gives the clue needed to choose the answer.
  - type: speaking-prompt
    prompt: 'Say the model sentence: "ecoutez la note".'
    minSeconds: 5
    sampleAnswer: ecoutez la note
    checklist:
      - Use French
      - Speak clearly
      - Use the target word or phrase
---
