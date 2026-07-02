---
id: lesson_grade5_logic_u03_l04_spot_invalid_syllogisms
slug: spot-invalid-syllogisms
title: Spot Invalid Syllogisms
xpBase: 10
---

## Teaching Goal

Teach students to identify unsupported conclusions in formal-looking arguments.

## Student Outcome

The student can decide when a syllogism is invalid and name the main reason, such as overclaiming or a weak middle-term connection.

## Misconception Checks

Believing formal wording guarantees validity; treating shared terms as enough; turning some into all; overlooking possible counterexamples.

## Questions

```question
key: u03_l04_q01_invalid_shared_predicate
type: multiple-choice
prompt: All cats are mammals. All dogs are mammals. Therefore all cats are dogs. What is wrong?
choices:
  - Sharing the category mammals does not prove cats are dogs.
  - The conclusion follows because cats and dogs are both mammals.
  - The argument is valid because all sentences use all.
  - The problem is only that cats are not real.
correctAnswer: Sharing the category mammals does not prove cats are dogs.
explanation: Two categories can both be inside mammals without being the same category.
hint: Two groups can share a larger group without being each other.
```

```question
key: u03_l04_q02_invalid_some_chain
type: passage-question
prompt: Read the argument and answer.
passageTitle: Syllogism
passage: |
  Some musicians are students.
  Some students are athletes.
  Therefore some musicians are athletes.
question: Why is this invalid?
choices:
  - The two some-claims might be about different students.
  - Every some-claim always proves an all-claim.
  - The conclusion is invalid only because musicians are not real.
  - The argument has too many premises.
correctAnswer: The two some-claims might be about different students.
explanation: One group of students could be musicians, while a different group of students could be athletes.
hint: Some does not guarantee that the same person is in both groups.
```

```question
key: u03_l04_q03_invalid_pattern_match
type: match-pairs
prompt: Match each invalid pattern to the likely mistake.
pairs:
  - left: All A are C. All B are C. Therefore all A are B.
    right: shared larger category
  - left: Some A are C. Some C are B. Therefore some A are B.
    right: two different some groups
  - left: All A are B. Some B are C. Therefore some A are C.
    right: predicate group overreach
  - left: No A are C. No B are C. Therefore no A are B.
    right: shared excluded category
explanation: Invalid syllogisms often overclaim what the middle term proves.
hint: Ask what the middle term actually connects.
```

```question
key: u03_l04_q04_possible_counterexample
type: multiple-choice
prompt: All squares are rectangles. Some rectangles are blue shapes. Therefore some squares are blue shapes. Why does the conclusion not have to follow?
choices:
  - The blue rectangles might be rectangles that are not squares.
  - No squares are rectangles.
  - All rectangles must be squares.
  - The word some always means none.
correctAnswer: The blue rectangles might be rectangles that are not squares.
explanation: The premise about some rectangles does not prove that any of those rectangles are squares.
hint: Some rectangles can be outside the square category.
```

```question
key: u03_l04_q05_invalid_classification
type: fill-blank
prompt: If the premises could be true while the conclusion is false, the argument is ___.
sentenceBefore: The argument is
sentenceAfter: .
choices:
  - invalid
  - valid
  - sound
  - a term
correctAnswer: invalid
explanation: Invalid means the conclusion does not have to follow from the premises.
hint: Validity is about must-follow structure.
```

```question
key: u03_l04_q06_spot_invalid
type: multiple-choice
prompt: Which argument is invalid?
choices:
  - All painters are artists. All sculptors are artists. Therefore all painters are sculptors.
  - All painters are artists. All artists are creators. Therefore all painters are creators.
  - No robots are mammals. All helper bots are robots. Therefore no helper bots are mammals.
  - Some runners are students. All students are learners. Therefore some runners are learners.
correctAnswer: All painters are artists. All sculptors are artists. Therefore all painters are sculptors.
explanation: Painters and sculptors can both be artists without all painters being sculptors.
hint: Look for two groups placed inside the same larger group.
```
