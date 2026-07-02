---
id: lesson_grade3_spanish_u05_l04_school_subjects_and_schedules
slug: school-subjects-and-schedules
title: School Subjects And Schedules
xpBase: 10
config:
  intro:
    - title: Listen For The Chunks
      body: >
        In this lesson, you will read a simple schedule and say what class someone has or
        likes at a given time. Read each new phrase once before you answer.
    - title: Useful Chunks
      body: >
        Keep these meanings nearby as you practice.
      bullets:
        - >
          matemáticas = math.
        - >
          ciencias = science.
        - >
          historia = history.
        - >
          arte = art.
        - >
          Tengo clase de ciencias names the class, and a las dos gives the time.
---

## Teaching Goal

Teach students to interpret and discuss school subjects, days, and basic class times.

## Student Outcome

The student can read a simple schedule and say what class someone has or likes at a given time.

## Misconception Checks

Reading schedules left to right without checking day/time labels; confusing `tengo clase` with age `tengo`; using English subject names when Spanish cognates are available.

## Teaching Note

Use a small weekly schedule and model how to find day, time, and class before answering.

## Questions

```question
key: u05_l04_q01_schedule_read
type: passage-question
prompt: Read the schedule and answer.
passageTitle: Horario
passage: |
  Lunes:
  8:00 - matemáticas
  9:00 - arte
  10:00 - música
question: What class is at 9:00?
choices:
  - art
  - math
  - music
  - science
correctAnswer: art
explanation: The schedule shows 9:00 - arte.
hint: Find the line with 9:00.
```

```question
key: u05_l04_q02_subject_pairs
type: match-pairs
prompt: Match each school subject to English.
pairs:
  - left: matemáticas
    right: math
  - left: ciencias
    right: science
  - left: historia
    right: history
  - left: arte
    right: art
explanation: Many school subjects are useful cognates.
hint: Look for Spanish-English similarities.
```

```question
key: u05_l04_q03_class_time_choice
type: multiple-choice
prompt: Which sentence means I have science class at two o'clock?
choices:
  - Tengo clase de ciencias a las dos.
  - Tengo dos ciencias a la clase.
  - Son las ciencias.
  - Me gustan a las dos.
correctAnswer: Tengo clase de ciencias a las dos.
explanation: Tengo clase de ciencias names the class, and a las dos gives the time.
hint: Look for the sentence with class, subject, and time in a clear order.
```

```question
key: u05_l04_q04_schedule_cloze
type: multi-blank-cloze
prompt: Complete the schedule sentence for math first and art after.
parts:
  - "El lunes a las ocho tengo clase de "
  - " y después tengo "
  - .
blanks:
  - correctAnswer: matemáticas
    acceptedAnswers:
      - matemáticas
  - correctAnswer: arte
    acceptedAnswers:
      - arte
explanation: Matemáticas and arte are school subjects; frío and años do not fit a schedule.
hint: Choose class subjects for both blanks.
```

```question
key: u05_l04_q05_type_art
type: text-input
prompt: Type the Spanish word for art class.
acceptedAnswers:
  - arte
answerType: text
explanation: Arte means art.
hint: It is a close cognate.
```

```question
key: u05_l04_q06_fix_schedule
type: error-correction
prompt: Correct the schedule sentence.
sentence: A las una tengo ciencias.
acceptedAnswers:
  - A la una tengo ciencias.
  - Tengo ciencias a la una.
explanation: One o'clock uses la una, not las una.
hint: Remember the special time pattern for one o'clock.
```
