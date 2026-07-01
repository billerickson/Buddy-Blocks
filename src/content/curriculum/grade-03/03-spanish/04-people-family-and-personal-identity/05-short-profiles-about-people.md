---
id: lesson_grade3_spanish_u04_l05_short_profiles_about_people
slug: short-profiles-about-people
title: Short Profiles About People
xpBase: 10
---

## Teaching Goal

Combine identity, age, family, origin, feeling, and description language in compact profiles.

## Student Outcome

The student can interpret and produce a short profile about self or another familiar person.

## Misconception Checks

Adding unsupported forms to sound more advanced; mixing `ser`, `estar`, and `tener`; ignoring agreement when combining sentences.

## Teaching Note

Show a five-sentence model profile and label what each sentence does: name, age, origin, family, description.

## Questions

```question
key: u04_l05_q01_profile_read
type: passage-question
prompt: Read the profile and answer.
passageTitle: Perfil
passage: |
  Me llamo Camila.
  Tengo doce años.
  Soy de Texas.
  Mi hermano es cómico.
question: Where is Camila from?
choices:
  - Texas
  - México
  - the classroom
  - her family
correctAnswer: Texas
explanation: Soy de Texas means I am from Texas.
hint: Look for the sentence with de.
```

```question
key: u04_l05_q02_profile_cloze
type: multi-blank-cloze
prompt: Complete the short profile.
parts:
  - "Me llamo Nina. "
  - " once años. Mi madre "
  - " inteligente."
blanks:
  - correctAnswer: Tengo
    acceptedAnswers:
      - Tengo
      - tengo
  - correctAnswer: es
    acceptedAnswers:
      - es
explanation: Use Tengo for age and es for a trait.
hint: Age uses tener; a trait uses ser.
```

```question
key: u04_l05_q03_age_reply
type: dialogue-builder
prompt: Choose the answer that fits the question.
turns:
  - speaker: Leo
    line: ¿Cuántos años tiene Sara?
choices:
  - Sara tiene trece años.
  - Sara es de Perú.
  - Sara está en casa.
  - Sara tiene una mesa.
correctAnswer: Sara tiene trece años.
explanation: The question asks Sara's age, so the answer uses tiene... años.
hint: Look for años in the answer.
```

```question
key: u04_l05_q04_fix_origin
type: error-correction
prompt: Correct the origin sentence.
sentence: María estoy de Perú.
acceptedAnswers:
  - María es de Perú.
explanation: "Origin uses ser in this lesson: María es de Perú."
hint: Use es de for where someone is from.
```

```question
key: u04_l05_q05_sentence_job
type: multiple-choice
prompt: In the sentence Mi hermana es simpática, what job does the sentence do in a profile?
choices:
  - It describes a family member.
  - It tells the date.
  - It gives the weather.
  - It asks a name.
correctAnswer: It describes a family member.
explanation: The sentence names a family member and gives a trait.
hint: Look at hermana and simpática.
```

```question
key: u04_l05_q06_write_profile
type: order-items
prompt: Put the short profile in a logical order.
items:
  - Tengo doce años.
  - Hola.
  - Me llamo Daniel.
  - Soy estudiante.
correctOrder:
  - Hola.
  - Me llamo Daniel.
  - Tengo doce años.
  - Soy estudiante.
explanation: A compact profile can open politely, give a name, add age, and then give an identity detail.
hint: Start with the opening, then move from name to personal details.
```
