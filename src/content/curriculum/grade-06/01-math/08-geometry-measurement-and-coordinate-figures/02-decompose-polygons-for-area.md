---
id: lesson_grade6_math_u08_l02_decompose_polygons_for_area
slug: decompose-polygons-for-area
title: Decompose Polygons For Area
xpBase: 10
---

## Teaching Goal

Find polygon area by decomposing into known shapes.

## Student Outcome

The student can choose a decomposition, compute part areas, and combine them.

## Key Ideas

Complex polygons can be split into rectangles, triangles, or parallelograms with known area formulas.

## Misconception Checks

Count boundary length instead of area; overlap or miss pieces; use a single formula for every polygon.

## Teaching Note

Show two different valid decompositions of the same polygon and compare totals.

## Questions

```question
key: u08_l02_q01_decompose_l_shape
type: multiple-choice
prompt: An L-shaped figure can be split into two non-overlapping rectangles. What should you do with the two rectangle areas?
choices:
  - Add them
  - Subtract both from the perimeter
  - Multiply them together
  - Ignore the smaller rectangle
correctAnswer: Add them
explanation: The total area is the sum of the areas of the non-overlapping parts.
hint: Area covers all pieces of the figure.
```

```question
key: u08_l02_q02_part_areas
type: multi-blank-cloze
prompt: A polygon is split into a rectangle with area 24 and a triangle with area 9.
parts:
  - "Total area = "
  - " + "
  - " = 33 square units."
blanks:
  - correctAnswer: "24"
    acceptedAnswers:
      - "24"
  - correctAnswer: "9"
    acceptedAnswers:
      - "9"
explanation: "Add the non-overlapping part areas: 24 + 9 = 33."
hint: Use each part area once.
```

```question
key: u08_l02_q03_total_area
type: text-input
prompt: A shape is decomposed into rectangles with areas 18, 12, and 6 square units. Type the total area.
acceptedAnswers:
  - "36"
  - 36 square units
answerType: text
explanation: 18 + 12 + 6 = 36 square units.
hint: Add all non-overlapping pieces.
```

```question
key: u08_l02_q04_valid_decomposition
type: multiple-choice
prompt: Which decomposition is valid for finding a polygon's area?
choices:
  - Split it into non-overlapping rectangles and triangles
  - Split it into overlapping shapes and add all areas
  - Use only the longest side
  - Add all side lengths
correctAnswer: Split it into non-overlapping rectangles and triangles
explanation: Non-overlapping familiar shapes can be measured and added without double-counting.
hint: A good decomposition covers the whole figure exactly once.
```

```question
key: u08_l02_q05_match_parts
type: match-pairs
prompt: Match each part to its area.
pairs:
  - left: "Rectangle: 6 by 4"
    right: 24 square units
  - left: "Triangle: base 8, height 3"
    right: 12 square units
  - left: "Rectangle: 5 by 5"
    right: 25 square units
  - left: "Triangle: base 10, height 4"
    right: 20 square units
explanation: Rectangles use base x height; triangles use half of base x height.
hint: Remember the half for triangle parts.
```

```question
key: u08_l02_q06_explain_decomposition
type: multiple-choice
prompt: Which explanation best shows why decomposing a polygon can make its area easier to find?
choices:
  - A complicated polygon can be split into shapes like rectangles and triangles with known area formulas.
  - A polygon's area is always found by adding all side lengths.
  - Decomposing means overlapping shapes and adding every area, even the overlap.
  - Decomposing avoids using area formulas.
correctAnswer: A complicated polygon can be split into shapes like rectangles and triangles with known area formulas.
explanation: Decomposition turns an unfamiliar area problem into familiar part areas.
hint: Think about shapes whose formulas you already know.
```
