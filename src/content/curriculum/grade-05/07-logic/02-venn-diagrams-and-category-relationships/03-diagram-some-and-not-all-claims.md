---
id: lesson_grade5_logic_u02_l03_diagram_some_and_not_all_claims
slug: diagram-some-and-not-all-claims
title: Diagram Some And Not All Claims
xpBase: 10
---

## Teaching Goal

Teach students to represent particular and exception claims without overclaiming.

## Student Outcome

The student can use X-mark descriptions for "Some A are B," "Some A are not B," and "Not all A are B."

## Misconception Checks

Treating some as all; treating not all as none; placing an X in the wrong region; assuming a particular claim proves a whole category relationship.

## Questions

```question
key: u02_l03_q01_some_overlap_x
type: multiple-choice
prompt: Where should an X go for 'Some poets are singers'?
choices:
  - In the overlap of Poet and Singer
  - Inside Poet but outside Singer
  - Inside Singer but outside Poet
  - Outside both circles
correctAnswer: In the overlap of Poet and Singer
explanation: Some poets are singers means at least one member belongs to both categories.
hint: Some A are B needs an example that is both A and B.
```

```question
key: u02_l03_q02_not_all_region
type: fill-blank
prompt: For 'Not all puzzles are easy things,' the X belongs in the part of ___ outside Easy Things.
sentenceBefore: The X belongs in
sentenceAfter: outside Easy Things.
choices:
  - Puzzles
  - Easy Things
  - both circles
  - neither circle
correctAnswer: Puzzles
explanation: Not all puzzles are easy means at least one puzzle is not easy.
hint: The exception is still a puzzle.
```

```question
key: u02_l03_q03_quantifier_marks
type: match-pairs
prompt: Match each claim type to the Venn action it needs.
pairs:
  - left: Some A are B
    right: X in the shared A-and-B region
  - left: Some A are not B
    right: X in A outside B
  - left: All A are B
    right: A-only region shown empty
  - left: No A are B
    right: A-and-B overlap shown empty
explanation: Different quantifiers require different diagram information.
hint: Some uses an X. All and no rule out regions.
```

```question
key: u02_l03_q04_some_unknown
type: multiple-choice
prompt: A diagram has an X in the overlap of Cats and Black Things. What is still unknown?
choices:
  - Whether all cats are black things
  - Whether at least one cat is black
  - Whether the X is a cat
  - Whether the X is black
correctAnswer: Whether all cats are black things
explanation: The X proves at least one cat is black, but it does not prove all cats are black.
hint: A single X proves some, not all.
```

```question
key: u02_l03_q05_fix_x_location
type: error-correction
prompt: Correct the Venn description.
sentence: For 'Some games are not team activities,' put an X in the overlap of Games and Team Activities.
acceptedAnswers:
  - For 'Some games are not team activities,' put an X in Games outside Team Activities.
  - For 'Some games are not team activities,' put an X in the part of Games outside Team Activities.
explanation: The claim says at least one game is not a team activity, so the X is in Games but outside Team Activities.
hint: The word not sends the X outside the predicate category.
```

```question
key: u02_l03_q06_not_all_translation
type: passage-question
prompt: Read the claim and choose the matching Venn description.
passageTitle: Claim
passage: |
  Not all club projects are group projects.
question: Which diagram description fits?
choices:
  - An X is in Club Projects outside Group Projects.
  - The Club Projects circle is inside Group Projects.
  - The Club Projects and Group Projects circles have no overlap.
  - An X is outside both circles.
correctAnswer: An X is in Club Projects outside Group Projects.
explanation: Not all means at least one club project is not a group project.
hint: Find the exception to the all-claim.
```
