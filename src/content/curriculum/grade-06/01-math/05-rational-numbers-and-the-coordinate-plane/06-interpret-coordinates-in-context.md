---
id: lesson_grade6_math_u05_l06_interpret_coordinates_in_context
slug: interpret-coordinates-in-context
title: Interpret Coordinates In Context
xpBase: 10
---

## Teaching Goal

Use coordinate pairs to answer contextual questions about maps, movement, and distance parallel to axes.

## Student Outcome

The student can interpret what coordinates mean and use them to answer simple context questions.

## Key Ideas

Coordinates describe location from a reference point; horizontal and vertical distances can be read from coordinate differences.

## Misconception Checks

Coordinates are labels with no units; distance can be negative; diagonal movement is the same as horizontal/vertical distance.

## Teaching Note

Use a simple coordinate map with home at the origin and points east/west/north/south.

## Questions

```question
key: u05_l06_q01_map_point
type: passage-question
prompt: Read the map description and answer.
passageTitle: Park Map
passage: |
  The fountain is at the origin. The library kiosk is at (3, -2).
question: What does (3, -2) mean?
choices:
  - 3 units east and 2 units south of the fountain
  - 3 units west and 2 units north of the fountain
  - 2 units east and 3 units south of the fountain
  - 3 units south and 2 units east of the fountain
correctAnswer: 3 units east and 2 units south of the fountain
explanation: Positive x means east/right; negative y means south/down.
hint: Interpret x first, then y.
```

```question
key: u05_l06_q02_axis_distance
type: text-input
prompt: Point A is at (-4, 2) and Point B is at (3, 2). Type the horizontal distance between them.
acceptedAnswers:
  - "7"
  - 7 units
answerType: text
explanation: The points have the same y-coordinate, and the distance from -4 to 3 is 7 units.
hint: Count from -4 to 0, then from 0 to 3.
```

```question
key: u05_l06_q03_context_signs
type: multiple-choice
prompt: A drone moves from (0, 0) to (-5, 6). Which description fits?
choices:
  - 5 units west and 6 units north
  - 5 units east and 6 units south
  - 6 units west and 5 units north
  - 5 units south and 6 units west
correctAnswer: 5 units west and 6 units north
explanation: Negative x means west/left and positive y means north/up.
hint: Read the first coordinate as horizontal movement.
```

```question
key: u05_l06_q04_match_coordinate_descriptions
type: match-pairs
prompt: Match each point to its map description.
pairs:
  - left: (2, 3)
    right: 2 east, 3 north
  - left: (-2, 3)
    right: 2 west, 3 north
  - left: (-2, -3)
    right: 2 west, 3 south
  - left: (2, -3)
    right: 2 east, 3 south
explanation: The signs of x and y show directions from the origin.
hint: Positive x is east; positive y is north.
```

```question
key: u05_l06_q05_vertical_distance
type: fill-blank
prompt: Point C is at (2, -3) and Point D is at (2, 5).
sentenceBefore: The vertical distance between them is
sentenceAfter: units.
choices:
  - "2"
  - "5"
  - "8"
  - "-8"
correctAnswer: "8"
explanation: The y-values are -3 and 5, which are 8 units apart.
hint: Distance is not negative; count from -3 to 5.
```

```question
key: u05_l06_q06_explain_coordinate_distance
type: multiple-choice
prompt: Which explanation best shows why the distance from (-6, 1) to (-2, 1) is 4 units?
choices:
  - The y-values are the same, so count horizontally from x = -6 to x = -2, which is 4 units.
  - Add -6 and -2 because distance uses both x-values.
  - Use the y-values only, so the distance is 1 unit.
  - The distance is negative because both x-values are negative.
correctAnswer: The y-values are the same, so count horizontally from x = -6 to x = -2, which is 4 units.
explanation: Horizontal distance comes from the difference between x-values when y is the same.
hint: Count on the x-axis only.
```
