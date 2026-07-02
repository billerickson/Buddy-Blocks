---
id: lesson_grade3_french_u03_l01_my_name_age_and_student_identity
slug: my-name-age-and-student-identity
title: My Name, Age, And Student Identity
xpBase: 10
config:
  intro:
    - title: Listen For The Chunks
      body: >
        In this lesson, you will say or write je m'appelle, j'ai ___ ans, and je suis
        élève in a supported self-introduction. Read each new phrase once before you
        answer.
    - title: Useful Chunks
      body: >
        Keep these meanings nearby as you practice.
      bullets:
        - >
          French uses j'ai with age: j'ai treize ans.
        - >
          Je m'appelle Maya. = name.
        - >
          J'ai onze ans. = age.
        - >
          Je suis élève. = student identity.
        - >
          Ça va bien. = how someone feels.
---

## Teaching Goal

Students combine name, age, and student identity into a short profile.

## Student Outcome

The student can say or write je m'appelle, j'ai ___ ans, and je suis élève in a supported self-introduction.

## Misconception Checks

Using je suis for age; leaving out ans; using only a name when the prompt asks for identity too.

## Teaching Note

Model a tiny profile and mark what each sentence tells: name, age, role.

## Questions

```question
key: u03_l01_q01_name_phrase
type: fill-blank
prompt: "Complete the sentence: My name is Lina."
sentenceBefore: Je
sentenceAfter: " Lina."
choices:
  - m'appelle
  - suis
  - ai
  - vais
correctAnswer: m'appelle
explanation: Je m'appelle Lina means My name is Lina.
hint: Use the name phrase from this profile lesson.
```

```question
key: u03_l01_q02_jai_or_je_suis
type: multiple-choice
prompt: Which sentence correctly says I am thirteen years old?
choices:
  - J'ai treize ans.
  - Je suis treize ans.
  - Je m'appelle treize.
  - J'aime treize ans.
correctAnswer: J'ai treize ans.
explanation: "French uses j'ai with age: j'ai treize ans."
hint: For age, French uses the have pattern instead of the am pattern.
```

```question
key: u03_l01_q03_profile_cloze
type: multi-blank-cloze
prompt: "Complete Noah's short profile: Noah is twelve and a student."
parts:
  - "Bonjour. Je m'appelle "
  - ". J'ai "
  - " ans. Je suis "
  - .
blanks:
  - correctAnswer: Noah
    acceptedAnswers:
      - Noah
  - correctAnswer: douze
    choices:
      - douze
      - deux
      - vingt
  - correctAnswer: élève
    choices:
      - élève
      - froid
      - bonjour
explanation: The profile gives a name, age, and student identity.
hint: "Each blank tells a different kind of information: name, number, role."
```

```question
key: u03_l01_q04_match_profile_parts
type: match-pairs
prompt: Match each French sentence to what it tells.
pairs:
  - left: Je m'appelle Maya.
    right: name
  - left: J'ai onze ans.
    right: age
  - left: Je suis élève.
    right: student identity
  - left: Ça va bien.
    right: how someone feels
explanation: A short profile can combine different kinds of personal information.
hint: "Look for the clue word: m'appelle, ans, élève, or ça va."
```

```question
key: u03_l01_q05_write_profile
type: text-input
prompt: "Type the French sentence: I am a student."
acceptedAnswers:
  - Je suis élève.
  - Je suis élève
answerType: text
explanation: A clear novice profile can be short and accurate.
hint: Use the student identity frame from the lesson.
```

```question
key: u03_l01_q06_say_profile
type: order-items
prompt: Put the short profile in a natural order.
items:
  - Je suis élève.
  - Je m'appelle Alex.
  - J'ai douze ans.
correctOrder:
  - Je m'appelle Alex.
  - J'ai douze ans.
  - Je suis élève.
explanation: A simple profile usually gives name, age, then student identity.
hint: Start with the name sentence.
```
