---
id: lesson_grade6_math_u09_l03_mean_median_and_outliers
slug: mean-median-and-outliers
title: Mean, Median, And Outliers
xpBase: 10
---

## Teaching Goal

Compare mean and median as measures of center and interpret outlier effects.

## Student Outcome

The student can compute or identify mean and median for small datasets and choose which better represents a typical value.

## Key Ideas

Mean balances data; median marks the middle; outliers can pull the mean.

## Misconception Checks

Mean is always the best typical value; median is found without ordering; outliers should always be removed.

## Teaching Note

Compare two datasets with the same median but one very large outlier.

## Questions

```question
key: u09_l03_q01_find_median
type: order-items
prompt: "Put the data in order to find the median: 8, 2, 6, 4, 10."
items:
  - "10"
  - "6"
  - "2"
  - "8"
  - "4"
correctOrder:
  - "2"
  - "4"
  - "6"
  - "8"
  - "10"
explanation: After ordering, the middle value is 6.
hint: Median requires data in order.
```

```question
key: u09_l03_q02_mean_small_set
type: text-input
prompt: Type the mean of 4, 6, 8, and 10.
acceptedAnswers:
  - "7"
answerType: number
explanation: The sum is 28, and 28 divided by 4 is 7.
hint: Add the values, then divide by how many values there are.
```

```question
key: u09_l03_q03_outlier_effect
type: multiple-choice
prompt: Data set A is 5, 6, 6, 7, 100. Which measure is pulled upward most by 100?
choices:
  - Mean
  - Median
  - Minimum
  - Number of data values
correctAnswer: Mean
explanation: The very large outlier increases the sum, which pulls the mean upward.
hint: Mean uses every value in the sum.
```

```question
key: u09_l03_q04_choose_center
type: passage-question
prompt: Read the data and answer.
passageTitle: Typing Scores
passage: |
  Words per minute: 22, 24, 25, 26, 90.
question: Which center better represents a typical student score?
choices:
  - Median, because 90 is an outlier
  - Mean, because it is always best
  - Maximum, because it is largest
  - Range, because it is a center
correctAnswer: Median, because 90 is an outlier
explanation: The outlier 90 pulls the mean upward, so the median is more typical here.
hint: Look for a value far from the rest.
```

```question
key: u09_l03_q05_match_center
type: match-pairs
prompt: Match each measure to its description.
pairs:
  - left: mean
    right: balance point found by add and divide
  - left: median
    right: middle value after ordering
  - left: outlier
    right: value far from most others
  - left: center
    right: a typical-value summary
explanation: Mean and median summarize center in different ways.
hint: Median needs order; mean needs a sum.
```

```question
key: u09_l03_q06_explain_center_choice
type: multiple-choice
prompt: For the data 10, 11, 12, 13, 60, which explanation best shows why the median may be a better typical value than the mean?
choices:
  - The value 60 is far from the rest and pulls the mean up, while the median 12 is near most values.
  - The mean is better because it always uses all the data values.
  - The median is better because 60 pulls the median upward more than the mean.
  - The value 60 should be ignored because outliers are never real data.
correctAnswer: The value 60 is far from the rest and pulls the mean up, while the median 12 is near most values.
explanation: Outliers can make the mean less representative of a typical value.
hint: Look at where most values are clustered.
```
