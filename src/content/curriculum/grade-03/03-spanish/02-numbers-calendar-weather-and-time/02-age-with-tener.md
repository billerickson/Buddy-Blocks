---
id: lesson_grade3_spanish_u02_l02_age_with_tener
slug: age-with-tener
title: Age With Tener
xpBase: 10
---

## Teaching Goal

Teach the Spanish age question and answer as a `tener` formula.

## Student Outcome

The student can ask and answer age with `¿Cuántos años tienes?` and `Tengo... años`.

## Misconception Checks

Saying `Soy doce años`; omitting `años`; confusing `tienes` and `tengo`; answering with only an English-style number.

## Teaching Note

Contrast the English idea "I am 12" with the Spanish chunk `Tengo 12 años` without overexplaining verb grammar.

## Questions

```question
key: u02_l02_q01_age_dialogue
type: dialogue-builder
prompt: Choose the best answer.
turns:
  - speaker: Rosa
    line: ¿Cuántos años tienes?
choices:
  - Tengo once años.
  - Me llamo Rosa.
  - Hace frío.
  - Buenos días.
correctAnswer: Tengo once años.
explanation: The question asks age, so the answer uses Tengo... años.
hint: Look for the answer with years.
```

```question
key: u02_l02_q02_complete_age
type: multi-blank-cloze
prompt: Complete the age sentence.
parts:
  - "Yo "
  - " trece "
  - .
blanks:
  - correctAnswer: tengo
    acceptedAnswers:
      - tengo
  - correctAnswer: años
    acceptedAnswers:
      - años
      - anos
explanation: Spanish uses Tengo... años to say age.
hint: Use the age chunk, not the English word order.
```

```question
key: u02_l02_q03_fix_age_error
type: error-correction
prompt: Correct the age sentence.
sentence: Soy doce años.
acceptedAnswers:
  - Tengo doce años.
  - Yo tengo doce años.
explanation: "Spanish uses tener for age: Tengo doce años."
hint: Replace the English-like I am pattern with the tener age chunk.
```

```question
key: u02_l02_q04_age_meaning
type: multiple-choice
prompt: What does Tengo catorce años mean?
choices:
  - I am 14 years old.
  - My name is Catorce.
  - It is 14 o'clock.
  - I have 14 pencils.
correctAnswer: I am 14 years old.
explanation: In the age formula, Tengo catorce años means I am 14 years old.
hint: The word años tells you this is about age.
```

```question
key: u02_l02_q05_age_question_word
type: fill-blank
prompt: Complete the age question.
sentenceBefore: ¿Cuántos años
sentenceAfter: "?"
choices:
  - tienes
  - tengo
  - llamas
  - gracias
correctAnswer: tienes
explanation: ¿Cuántos años tienes? asks how old you are.
hint: The question asks you, so it uses tienes.
```

```question
key: u02_l02_q06_speak_age
type: text-input
prompt: Type a Spanish age answer for 12 years old.
acceptedAnswers:
  - Tengo doce años.
  - Tengo doce años
  - Tengo 12 años.
  - Tengo 12 años
answerType: text
explanation: Tengo doce años is the Spanish age formula for I am 12 years old.
hint: Use Tengo, a number, and años.
```
