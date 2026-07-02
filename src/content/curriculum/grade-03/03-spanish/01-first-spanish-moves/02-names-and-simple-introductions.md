---
id: lesson_grade3_spanish_u01_l02_names_and_simple_introductions
slug: names-and-simple-introductions
title: Names And Simple Introductions
xpBase: 10
config:
  intro:
    - title: Listen For The Chunks
      body: >
        In this lesson, you will ask and answer ¿Cómo te llamas?, use Me llamo..., and
        respond to ¿Cómo estás? with a short feeling phrase. Read each new phrase once
        before you answer.
    - title: Useful Chunks
      body: >
        Keep these meanings nearby as you practice.
      bullets:
        - >
          ¿Cómo te llamas? asks for a name, and Me llamo... answers with a name.
        - >
          ¿Cómo estás? asks how you are, so Estoy bien is a fitting answer.
---

## Teaching Goal

Teach the name question and simple well-being exchange as reusable introductory chunks.

## Student Outcome

The student can ask and answer `¿Cómo te llamas?`, use `Me llamo...`, and respond to `¿Cómo estás?` with a short feeling phrase.

## Misconception Checks

Translating `Me llamo` word by word; answering `¿Cómo te llamas?` with a feeling; using `soy` before it is taught as a comparison.

## Teaching Note

Model two students meeting and point out that `Me llamo...` is the expected name-answer chunk.

## Questions

```question
key: u01_l02_q01_name_answer
type: dialogue-builder
prompt: Choose the best answer.
turns:
  - speaker: Lucia
    line: ¿Cómo te llamas?
choices:
  - Me llamo Diego.
  - Estoy bien.
  - Hace sol.
  - De nada.
correctAnswer: Me llamo Diego.
explanation: ¿Cómo te llamas? asks for a name, and Me llamo... answers with a name.
hint: Look for the answer that gives a name.
```

```question
key: u01_l02_q02_intro_order
type: order-items
prompt: Put the simple introduction in a logical order.
items:
  - Me llamo Ana.
  - Hola.
  - ¿Cómo te llamas?
  - ¿Cómo estás?
  - Estoy bien.
correctOrder:
  - Hola.
  - ¿Cómo te llamas?
  - Me llamo Ana.
  - ¿Cómo estás?
  - Estoy bien.
explanation: A short introduction can begin with a greeting, ask and answer a name question, then ask and answer how someone is.
hint: Start with the greeting.
```

```question
key: u01_l02_q03_complete_intro
type: multi-blank-cloze
prompt: Complete the introduction.
parts:
  - "Hola. Me "
  - " Sofia. Estoy "
  - .
blanks:
  - correctAnswer: llamo
    acceptedAnswers:
      - llamo
  - correctAnswer: bien
    acceptedAnswers:
      - bien
explanation: Me llamo gives a name, and estoy bien gives a simple response to how you are.
hint: Use the name chunk first, then the feeling word.
```

```question
key: u01_l02_q04_how_are_you_answer
type: multiple-choice
prompt: Which answer fits ¿Cómo estás?
choices:
  - Estoy bien.
  - Me llamo Eva.
  - Buenos días.
  - Por favor.
correctAnswer: Estoy bien.
explanation: ¿Cómo estás? asks how you are, so Estoy bien is a fitting answer.
hint: Find the answer that tells how someone feels.
```

```question
key: u01_l02_q05_fix_name_chunk
type: error-correction
prompt: Correct the sentence.
sentence: Me llamo es Ana.
acceptedAnswers:
  - Me llamo Ana.
explanation: Me llamo Ana is already a complete name answer. It does not need es.
hint: Use the whole chunk Me llamo plus the name.
```

```question
key: u01_l02_q06_speak_intro
type: text-input
prompt: Type a Spanish name answer for Alex using Me llamo.
acceptedAnswers:
  - Me llamo Alex.
  - Me llamo Alex
answerType: text
explanation: Me llamo Alex is the complete Spanish chunk for giving that name.
hint: Use Me llamo followed by the name.
```
