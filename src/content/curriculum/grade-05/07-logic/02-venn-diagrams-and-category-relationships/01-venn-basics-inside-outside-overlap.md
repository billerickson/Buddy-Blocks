---
id: lesson_grade5_logic_u02_l01_venn_basics_inside_outside_overlap
slug: venn-basics-inside-outside-overlap
title: "Venn Basics: Inside, Outside, Overlap"
xpBase: 10
---

## Teaching Goal

Introduce the regions of a two-circle Venn diagram as category-membership information.

## Student Outcome

The student can describe what inside, outside, and overlap regions mean in a two-category Venn diagram.

## Misconception Checks

Thinking the circles are just labels; assuming every region must contain something; confusing outside one circle with outside both circles.

## Questions

```question
key: u02_l01_q01_overlap_meaning
type: multiple-choice
prompt: In a Venn diagram with circles for Musicians and Athletes, what does the overlap mean?
choices:
  - People who are both musicians and athletes
  - People who are musicians but not athletes
  - People who are athletes but not musicians
  - People who are neither musicians nor athletes
correctAnswer: People who are both musicians and athletes
explanation: The overlap is the region shared by both circles, so it means membership in both categories.
hint: Overlap means inside both circles at the same time.
```

```question
key: u02_l01_q02_region_meanings
type: match-pairs
prompt: Match each Venn region to its meaning.
pairs:
  - left: Inside circle A only
    right: A but not B
  - left: Inside circle B only
    right: B but not A
  - left: In the overlap
    right: both A and B
  - left: Outside both circles
    right: neither A nor B
explanation: Each region tells which categories an item belongs to and does not belong to.
hint: Ask whether the region is inside A, inside B, inside both, or outside both.
```

```question
key: u02_l01_q03_inside_circle
type: fill-blank
prompt: An item inside the Games circle belongs to the category ___.
sentenceBefore: "Category:"
sentenceAfter: ""
choices:
  - games
  - not games
  - both circles
  - unknown
correctAnswer: games
explanation: Being inside a category circle means the item belongs to that category.
hint: The circle label names the category.
```

```question
key: u02_l01_q04_item_in_overlap
type: passage-question
prompt: Read the Venn description and answer.
passageTitle: Diagram Description
passage: |
  A Venn diagram has one circle labeled Readers and one circle labeled Artists.
  Mina's X is in the overlap of the two circles.
question: Which statement must be true about Mina?
choices:
  - Mina is a reader and an artist.
  - Mina is a reader but not an artist.
  - Mina is an artist but not a reader.
  - Mina is neither a reader nor an artist.
correctAnswer: Mina is a reader and an artist.
explanation: An X in the overlap belongs to both categories.
hint: The overlap is inside both circles.
```

```question
key: u02_l01_q05_outside_both
type: multiple-choice
prompt: A token is outside both the Pets circle and the Robots circle. What does that location mean?
choices:
  - The token is neither a pet nor a robot.
  - The token is both a pet and a robot.
  - The token is a pet but not a robot.
  - The token is a robot but not a pet.
correctAnswer: The token is neither a pet nor a robot.
explanation: Outside both circles means outside both categories.
hint: Outside a circle means not in that category.
```

```question
key: u02_l01_q06_reading_order
type: order-items
prompt: Put the Venn-reading steps in a useful order.
items:
  - Check whether the mark is inside the first circle.
  - Read the circle labels.
  - State which categories the mark belongs to.
  - Check whether the mark is inside the second circle.
correctOrder:
  - Read the circle labels.
  - Check whether the mark is inside the first circle.
  - Check whether the mark is inside the second circle.
  - State which categories the mark belongs to.
explanation: The labels tell the categories, and the mark's location tells membership.
hint: Start by knowing what the circles mean.
```
