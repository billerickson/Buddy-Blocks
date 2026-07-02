---
id: lesson_grade3_french_u02_l01_numbers_for_age_and_classroom_counts
slug: numbers-for-age-and-classroom-counts
title: Numbers For Age And Classroom Counts
xpBase: 10
config:
  intro:
    - title: Listen For The Chunks
      body: >
        In this lesson, you will match number words to numerals, answer Quel âge as-tu?
        with j'ai ___ ans, and understand controlled counts. Read each new phrase once
        before you answer.
    - title: Useful Chunks
      body: >
        Keep these meanings nearby as you practice.
      bullets:
        - >
          cinq = 5.
        - >
          douze = 12.
        - >
          vingt = 20.
        - >
          trente et un = 31.
        - >
          Quel âge as-tu? asks how old you are, so the answer uses j'ai ___ ans.
---

## Teaching Goal

Students recognize and use numbers for age and small classroom quantities.

## Student Outcome

The student can match number words to numerals, answer Quel âge as-tu? with j'ai ___ ans, and understand controlled counts.

## Misconception Checks

Using je suis for age; confusing close-sounding numbers; typing a numeral when the prompt asks for a French word or vice versa.

## Teaching Note

Teach age as a whole phrase first: In French, you "have" years. Use j'ai douze ans, not je suis douze.

## Questions

```question
key: u02_l01_q01_match_numbers
type: match-pairs
prompt: Match each French number to the numeral.
pairs:
  - left: cinq
    right: "5"
  - left: douze
    right: "12"
  - left: vingt
    right: "20"
  - left: trente et un
    right: "31"
explanation: Number words need exact recognition because close guesses can change the meaning.
hint: Start with the number words you already know, then use the longer one for 31.
```

```question
key: u02_l01_q02_age_phrase
type: fill-blank
prompt: "Complete the age answer: I am twelve years old."
sentenceBefore: J'
sentenceAfter: " douze ans."
choices:
  - ai
  - suis
  - est
  - aime
correctAnswer: ai
explanation: French uses j'ai douze ans, literally I have twelve years.
hint: "For age in French, use avoir: j'ai."
```

```question
key: u02_l01_q03_choose_age_answer
type: dialogue-builder
prompt: Choose the answer that fits the question.
turns:
  - speaker: Ana
    line: Quel âge as-tu?
choices:
  - J'ai onze ans.
  - Je m'appelle Ana.
  - Il fait froid.
  - Au revoir.
correctAnswer: J'ai onze ans.
explanation: Quel âge as-tu? asks how old you are, so the answer uses j'ai ___ ans.
hint: Look for the answer with a number and ans.
```

```question
key: u02_l01_q04_type_age_number
type: text-input
prompt: "Type the numeral in this sentence: J'ai quatorze ans."
acceptedAnswers:
  - "14"
answerType: number
explanation: Quatorze means 14.
hint: Quatorze is between treize and quinze.
```

```question
key: u02_l01_q05_order_age_question
type: order-items
prompt: Put the age question in order.
items:
  - as-tu?
  - âge
  - Quel
correctOrder:
  - Quel
  - âge
  - as-tu?
explanation: Quel âge as-tu? asks How old are you?
hint: Start with the question word quel.
```

```question
key: u02_l01_q06_classroom_count
type: multi-blank-cloze
prompt: "Complete the classroom count: There are three notebooks and two pens."
parts:
  - "Il y a "
  - " cahiers et "
  - " stylos."
blanks:
  - correctAnswer: trois
    choices:
      - trois
      - treize
      - trente
  - correctAnswer: deux
    choices:
      - deux
      - douze
      - dix
explanation: The sentence says there are three notebooks and two pens.
hint: Check each small number separately.
```
