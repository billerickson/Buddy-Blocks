---
id: lesson_grade3_french_u02_l03_weather_windows
slug: weather-windows
title: Weather Windows
xpBase: 10
config:
  intro:
    - title: Listen For The Chunks
      body: >
        In this lesson, you will match weather expressions to meanings and complete short
        weather statements. Read each new phrase once before you answer.
    - title: Useful Chunks
      body: >
        Keep these meanings nearby as you practice.
      bullets:
        - >
          il fait beau = the weather is nice.
        - >
          il fait froid = it is cold.
        - >
          il pleut = it is raining.
        - >
          il neige = it is snowing.
        - >
          Il pleut means it is raining. Il neige means it is snowing.
        - >
          Quel temps fait-il? asks about the weather, and sunshine fits il fait beau.
---

## Teaching Goal

Students understand and produce common weather expressions as fixed novice phrases.

## Student Outcome

The student can match weather expressions to meanings and complete short weather statements.

## Misconception Checks

Translating "it is cold" as il est froid for weather; confusing il pleut and il neige; treating fait as a stand-alone weather word.

## Teaching Note

Present weather as chunks: il fait beau, il fait froid, il pleut. Do not unpack full verb grammar.

## Questions

```question
key: u02_l03_q01_match_weather
type: match-pairs
prompt: Match each weather phrase to its meaning.
pairs:
  - left: il fait beau
    right: the weather is nice
  - left: il fait froid
    right: it is cold
  - left: il pleut
    right: it is raining
  - left: il neige
    right: it is snowing
explanation: Weather expressions are learned as useful chunks.
hint: Froid connects to cold; neige connects to snow.
```

```question
key: u02_l03_q02_complete_cold
type: fill-blank
prompt: "Complete the weather sentence: It is cold."
sentenceBefore: Il fait
sentenceAfter: .
choices:
  - froid
  - chaud
  - beau
  - bleu
correctAnswer: froid
explanation: Il fait froid means it is cold.
hint: Choose the word connected to cold.
```

```question
key: u02_l03_q03_rain_or_snow
type: multiple-choice
prompt: Which French sentence means It is raining?
choices:
  - Il pleut.
  - Il neige.
  - Il fait chaud.
  - Il fait beau.
correctAnswer: Il pleut.
explanation: Il pleut means it is raining. Il neige means it is snowing.
hint: Choose the special rain phrase, not the snow phrase.
```

```question
key: u02_l03_q04_correct_weather
type: error-correction
prompt: Correct the weather sentence using the learned chunk for It is cold.
sentence: Il est froid.
acceptedAnswers:
  - Il fait froid.
explanation: For weather, use the chunk il fait froid.
hint: Weather uses il fait, not il est, in this phrase.
```

```question
key: u02_l03_q05_weather_dialogue
type: dialogue-builder
prompt: The weather window shows sunshine. Choose the reply that fits.
turns:
  - speaker: Teacher
    line: Quel temps fait-il?
choices:
  - Il fait beau.
  - Il pleut.
  - Il neige.
  - Il fait froid.
correctAnswer: Il fait beau.
explanation: Quel temps fait-il? asks about the weather, and sunshine fits il fait beau.
hint: Choose the weather phrase that matches a sunny window.
```

```question
key: u02_l03_q06_weather_report
type: text-input
prompt: "Type the French sentence: It is raining."
acceptedAnswers:
  - Il pleut.
  - Il pleut
answerType: text
explanation: A one-sentence weather report is enough for novice production.
hint: Use the learned rain phrase.
```
