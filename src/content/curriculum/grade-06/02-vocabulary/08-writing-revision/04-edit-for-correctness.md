---
id: lesson_grade6_vocabulary_edit_for_correctness
slug: edit-for-correctness
title: Edit For Correctness
xpBase: 10
questions:
  - type: error-correction
    prompt: Correct the sentence fragment.
    sentence: Because the rain stopped.
    acceptedAnswers:
      - The game continued because the rain stopped.
      - Because the rain stopped, the game continued.
      - The rain stopped.
  - type: error-correction
    prompt: Correct the run-on sentence.
    sentence: I packed lunch I left for school.
    acceptedAnswers:
      - I packed lunch, and I left for school.
      - I packed lunch. I left for school.
      - After I packed lunch, I left for school.
  - type: multi-blank-cloze
    prompt: Complete the editing vocabulary sentence.
    parts:
      - "A "
      - " is incomplete, a "
      - " joins sentences incorrectly, and "
      - " repeats an idea needlessly."
    blanks:
      - correctAnswer: fragment
        acceptedAnswers:
          - fragment
        choices:
          - fragment
          - transition
          - claim
      - correctAnswer: run-on
        acceptedAnswers:
          - run-on
          - run on
        choices:
          - run-on
          - theme
          - tone
      - correctAnswer: redundancy
        acceptedAnswers:
          - redundancy
        choices:
          - redundancy
          - purpose
          - origin
  - type: multiple-choice
    prompt: Which wording removes redundancy?
    choices:
      - final result
      - final end result
      - the final final result
      - the final result result
    correctAnswer: final result
  - type: text-input
    prompt: Type the word that means to correct grammar, spelling, punctuation, or
      usage.
    acceptedAnswers:
      - edit
    answerType: text
  - type: match-pairs
    prompt: Match each editing word.
    pairs:
      - left: fragment
        right: incomplete sentence
      - left: run-on
        right: joined incorrectly
      - left: redundancy
        right: needless repetition
      - left: edit
        right: correct errors
  - type: fill-blank
    prompt: A school email should usually use a ___ tone.
    sentenceBefore: A school email should usually use a
    sentenceAfter: tone.
    choices:
      - formal
      - vacant
      - biased
      - implicit
    correctAnswer: formal
  - type: constructed-response
    prompt: Write one sentence explaining the difference between revising and editing.
    minWords: 8
    sampleAnswer: Revising improves ideas and organization, while editing corrects
      grammar and punctuation.
    checklist:
      - Use revising or revise
      - Use editing or edit
      - Explain how they differ
---
