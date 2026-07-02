---
id: lesson_grade5_logic_u02_l02_diagram_all_and_no_claims
slug: diagram-all-and-no-claims
title: Diagram All And No Claims
xpBase: 10
---

## Teaching Goal

Teach students to represent universal inclusion and exclusion claims.

## Student Outcome

The student can choose or describe a Venn diagram for "All A are B" and "No A are B" statements.

## Misconception Checks

Reversing all claims into "All B are A"; treating no as not all; assuming no overlap from an unmarked diagram.

## Questions

```question
key: u02_l02_q01_all_claim_diagram
type: multiple-choice
prompt: Which Venn description represents 'All robins are birds'?
choices:
  - The Robin circle is completely inside the Bird circle.
  - The Robin circle and Bird circle do not overlap.
  - An X is outside the Bird circle but inside the Robin circle.
  - The Bird circle is completely inside the Robin circle.
correctAnswer: The Robin circle is completely inside the Bird circle.
explanation: All robins are birds means every member of the subject category Robin is inside the predicate category Bird.
hint: For 'All A are B,' the A circle belongs inside B.
```

```question
key: u02_l02_q02_no_claim_diagram
type: multiple-choice
prompt: Which Venn description represents 'No squares are circles'?
choices:
  - The Square circle and Circle circle have no overlap.
  - The Square circle is completely inside the Circle circle.
  - An X is in the overlap of the two circles.
  - The Circle circle is completely inside the Square circle.
correctAnswer: The Square circle and Circle circle have no overlap.
explanation: No squares are circles means the two categories do not share any members.
hint: A no-claim rules out the overlap.
```

```question
key: u02_l02_q03_claim_to_diagram
type: match-pairs
prompt: Match each claim to the Venn description that fits.
pairs:
  - left: All tulips are flowers.
    right: Tulip circle inside Flower circle
  - left: No cats are bicycles.
    right: Cat and Bicycle circles separated
  - left: All mystery novels are books.
    right: Mystery Novel circle inside Book circle
  - left: No triangles are rectangles.
    right: Triangle and Rectangle circles non-overlapping
explanation: All claims show inclusion. No claims show exclusion.
hint: Use inside for all and no overlap for no.
```

```question
key: u02_l02_q04_diagram_all_steps
type: order-items
prompt: Put the steps for diagramming 'All A are B' in order.
items:
  - Put the A category inside the B category.
  - Identify A as the subject term.
  - Read the quantifier all.
  - Identify B as the predicate term.
correctOrder:
  - Read the quantifier all.
  - Identify A as the subject term.
  - Identify B as the predicate term.
  - Put the A category inside the B category.
explanation: The quantifier and terms tell how the categories should be arranged.
hint: First read the claim, then place the subject category.
```

```question
key: u02_l02_q05_no_overlap
type: fill-blank
prompt: "Complete the diagram meaning: 'No A are B' means the A and B circles have ___."
sentenceBefore: The circles have
sentenceAfter: .
choices:
  - no overlap
  - complete overlap
  - one X in the overlap
  - unknown labels
correctAnswer: no overlap
explanation: A no-claim says no member belongs to both categories.
hint: No A are B rules out the shared region.
```

```question
key: u02_l02_q06_read_universal_diagram
type: passage-question
prompt: Read the Venn description and choose the claim it represents.
passageTitle: Diagram Description
passage: |
  The Skateboard circle is completely inside the Sports Equipment circle.
question: Which claim does this diagram represent?
choices:
  - All skateboards are sports equipment.
  - No skateboards are sports equipment.
  - Some sports equipment is not a skateboard.
  - All sports equipment is skateboards.
correctAnswer: All skateboards are sports equipment.
explanation: If the Skateboard circle is inside Sports Equipment, every skateboard is sports equipment.
hint: The smaller inside circle is the subject of the all-claim.
```
