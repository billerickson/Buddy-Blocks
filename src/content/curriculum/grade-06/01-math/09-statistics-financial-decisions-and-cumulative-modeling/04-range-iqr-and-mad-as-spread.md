---
id: lesson_grade6_math_u09_l04_range_iqr_and_mad_as_spread
slug: range-iqr-and-mad-as-spread
title: Range, IQR, And MAD As Spread
xpBase: 10
---

## Teaching Goal

Use spread measures to describe variability in a distribution.

## Student Outcome

The student can interpret range, interquartile range, and mean absolute deviation at a Grade 6 level.

## Key Ideas

Spread describes how far data values are from each other or from the center.

## Misconception Checks

Center fully describes a dataset; larger center means larger spread; absolute deviations can be negative.

## Teaching Note

Show two datasets with the same median but different spread and ask which is more consistent.

## Questions

```question
key: u09_l04_q01_range
type: text-input
prompt: Type the range of 3, 5, 8, 11.
acceptedAnswers:
  - "8"
answerType: number
explanation: "Range is maximum minus minimum: 11 - 3 = 8."
hint: Subtract the smallest value from the largest value.
```

```question
key: u09_l04_q02_spread_meaning
type: multiple-choice
prompt: What does spread describe in a dataset?
choices:
  - How much the data values vary
  - Only the largest value
  - Only the most common value
  - The title of the graph
correctAnswer: How much the data values vary
explanation: Spread describes how close together or far apart data values are.
hint: Spread is about variability.
```

```question
key: u09_l04_q03_iqr
type: fill-blank
prompt: A dataset has Q1 = 12 and Q3 = 20.
sentenceBefore: The interquartile range is
sentenceAfter: .
choices:
  - "8"
  - "12"
  - "20"
  - "32"
correctAnswer: "8"
explanation: IQR = Q3 - Q1 = 20 - 12 = 8.
hint: Subtract the first quartile from the third quartile.
```

```question
key: u09_l04_q04_match_spread
type: match-pairs
prompt: Match each spread measure to its description.
pairs:
  - left: range
    right: maximum minus minimum
  - left: IQR
    right: Q3 minus Q1
  - left: MAD
    right: average distance from the mean
  - left: low spread
    right: values close together
explanation: Spread measures summarize variability in different ways.
hint: Look for difference, quartiles, or distance from mean.
```

```question
key: u09_l04_q05_compare_spread
type: multiple-choice
prompt: Two datasets have the same median. Set A has range 4 and Set B has range 20. Which has more spread?
choices:
  - Set A
  - Set B
  - They have the same spread
  - Cannot tell anything about spread from range
correctAnswer: Set B
explanation: A larger range means the maximum and minimum are farther apart.
hint: Compare the two range values.
```

```question
key: u09_l04_q06_explain_spread
type: multiple-choice
prompt: Which explanation best shows why two datasets can have the same mean but different spread?
choices:
  - The values can balance to the same mean while one set is tightly grouped and the other is far apart.
  - If two datasets have the same mean, their values must be spread out the same way.
  - Spread and mean both describe only the largest value.
  - Different spread means the means must be different.
correctAnswer: The values can balance to the same mean while one set is tightly grouped and the other is far apart.
explanation: Center and spread describe different features of a distribution.
hint: Think about 4, 5, 6 and 0, 5, 10.
```
