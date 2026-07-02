---
id: lesson_grade5_logic_u06_l01_translate_short_arguments
slug: translate-short-arguments
title: Translate Short Arguments
xpBase: 10
---

## Teaching Goal

Teach students to turn compact natural-language arguments into standard form while preserving meaning.

## Student Outcome

The student can identify premises and conclusion in a short paragraph and rewrite them as a standard-form argument.

## Misconception Checks

Treating every sentence as a premise; strengthening the argument while translating; dropping important quantifiers; mistaking background information for a reason.

## Questions

```question
key: u06_l01_q01_find_paragraph_conclusion
type: passage-question
prompt: Read the argument and choose the conclusion.
passageTitle: Argument
passage: |
  Every robotics club member is a student. Some students are programmers. So, some robotics club members are programmers.
question: Which sentence is the conclusion?
choices:
  - Some robotics club members are programmers.
  - Every robotics club member is a student.
  - Some students are programmers.
  - Every programmer is a robotics club member.
correctAnswer: Some robotics club members are programmers.
explanation: The word so introduces the conclusion the argument is trying to support.
hint: Look for the claim that follows from the reasons.
```

```question
key: u06_l01_q02_standard_form_order
type: order-items
prompt: Put the translated argument in standard form.
items:
  - Therefore some club projects are art projects.
  - Some club projects are poster projects.
  - All poster projects are art projects.
correctOrder:
  - Some club projects are poster projects.
  - All poster projects are art projects.
  - Therefore some club projects are art projects.
explanation: Standard form places the premises first and the conclusion last.
hint: Put the therefore sentence last.
```

```question
key: u06_l01_q03_preserve_not_all
type: error-correction
prompt: Correct the translation.
sentence: "Original: Not every puzzle is easy. Translation: No puzzles are easy."
acceptedAnswers:
  - "Original: Not every puzzle is easy. Translation: Not all puzzles are easy."
  - "Original: Not every puzzle is easy. Translation: Some puzzles are not easy."
explanation: Not every means not all, or some are not. It does not mean no.
hint: Keep the exception idea without turning it into a no-claim.
```

```question
key: u06_l01_q04_best_translation
type: multiple-choice
prompt: Which standard-form translation best keeps the meaning of 'All chess team members belong to the school club. Tara is a chess team member. Therefore Tara belongs to the school club'?
choices:
  - All chess team members are school club members. Tara is a chess team member. Therefore Tara is a school club member.
  - All school club members are chess team members. Tara is a school club member. Therefore Tara is a chess team member.
  - Some chess team members are school club members. Tara is not a chess team member. Therefore Tara is a school club member.
  - No chess team members are school club members. Tara is a chess team member. Therefore Tara is not in the school club.
correctAnswer: All chess team members are school club members. Tara is a chess team member. Therefore Tara is a school club member.
explanation: The correct translation keeps the all direction and the Tara fact.
hint: Do not reverse the all-claim.
```

```question
key: u06_l01_q05_argument_parts
type: match-pairs
prompt: Match each paragraph feature to its standard-form role.
pairs:
  - left: Because all badges with stars are entry badges
    right: premise about a category rule
  - left: Milo's badge has a star
    right: premise about a specific case
  - left: Milo's badge is an entry badge
    right: conclusion about that case
  - left: therefore
    right: conclusion signal
explanation: Translation means preserving which statements are reasons and which claim is supported.
hint: Premises give support. The conclusion is what they support.
```

```question
key: u06_l01_q06_some_translation
type: passage-question
prompt: Read the sentence and choose the best standard-form claim.
passageTitle: Sentence
passage: |
  At least one member of the garden club is a photographer.
question: Which translation preserves the meaning?
choices:
  - Some garden club members are photographers.
  - All garden club members are photographers.
  - No garden club members are photographers.
  - Not all photographers are garden club members.
correctAnswer: Some garden club members are photographers.
explanation: At least one translates to some.
hint: Do not make the claim stronger than at least one.
```
