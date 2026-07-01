---
id: lesson_grade3_french_u03_l02_where_i_am_from_and_where_i_live
slug: where-i-am-from-and-where-i-live
title: Where I Am From And Where I Live
xpBase: 10
---

## Teaching Goal

Students distinguish origin and residence phrases in simple personal information.

## Student Outcome

The student can understand and use je viens de... and j'habite à... with familiar place names.

## Misconception Checks

Treating je viens de and j'habite à as identical; translating place prepositions word by word; answering d'où with a current location when the prompt asks origin.

## Teaching Note

Use one fictional student who is from Montréal but lives in Dallas. Keep the contrast visible.

## Questions

```question
key: u03_l02_q01_origin_or_residence_match
type: match-pairs
prompt: Match each French phrase to its meaning.
pairs:
  - left: Je viens de Montréal.
    right: I am from Montreal.
  - left: J'habite à Dallas.
    right: I live in Dallas.
  - left: D'où viens-tu?
    right: Where are you from?
  - left: Où habites-tu?
    right: Where do you live?
explanation: Origin and residence are related, but they are not the same question.
hint: D'où points to from where; habites points to where someone lives.
```

```question
key: u03_l02_q02_answer_origin
type: dialogue-builder
prompt: Choose the answer that fits.
turns:
  - speaker: Nadia
    line: D'où viens-tu?
choices:
  - Je viens de Québec.
  - J'habite à Québec.
  - J'ai douze ans.
  - Il pleut.
correctAnswer: Je viens de Québec.
explanation: D'où viens-tu? asks where someone is from, so je viens de... fits.
hint: Look for the answer that also uses viens.
```

```question
key: u03_l02_q03_answer_residence
type: fill-blank
prompt: "Complete the sentence: I live in Austin."
sentenceBefore: J'habite
sentenceAfter: " Austin."
choices:
  - à
  - de
  - et
  - en
correctAnswer: à
explanation: The learned residence chunk is j'habite à + place.
hint: "Use the phrase from the model: j'habite à..."
```

```question
key: u03_l02_q04_profile_reading
type: passage-question
prompt: Read the profile and answer.
passageTitle: Profil de Karim
passage: |
  Bonjour. Je m'appelle Karim.
  Je viens de Dakar.
  J'habite à Chicago.
question: Where does Karim live now?
choices:
  - Chicago
  - Dakar
  - Bonjour
  - Karim
correctAnswer: Chicago
explanation: J'habite à Chicago tells where Karim lives.
hint: Find the sentence with j'habite.
```

```question
key: u03_l02_q05_choose_question
type: multiple-choice
prompt: Which question asks Where do you live?
choices:
  - Où habites-tu?
  - D'où viens-tu?
  - Quel âge as-tu?
  - Comment ça va?
correctAnswer: Où habites-tu?
explanation: Où habites-tu? asks where you live.
hint: "Look for the verb linked to living: habites."
```

```question
key: u03_l02_q06_write_place_sentence
type: text-input
prompt: "Type the French sentence: I live in Dallas."
acceptedAnswers:
  - J'habite à Dallas.
  - J'habite à Dallas
answerType: text
explanation: The chunk j'habite à... lets you give residence information.
hint: Use the sentence frame J'habite à ___.
```
