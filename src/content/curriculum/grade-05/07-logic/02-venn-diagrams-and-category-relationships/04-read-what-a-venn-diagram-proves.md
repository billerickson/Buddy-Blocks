---
id: lesson_grade5_logic_u02_l04_read_what_a_venn_diagram_proves
slug: read-what-a-venn-diagram-proves
title: Read What A Venn Diagram Proves
xpBase: 10
---

## Teaching Goal

Help students infer only what a completed Venn diagram supports.

## Student Outcome

The student can decide whether a Venn diagram supports, contradicts, or does not prove a proposed claim.

## Misconception Checks

Treating unknown as false; assuming a blank-looking region is empty; accepting a claim because it sounds plausible; overreading some as all.

## Questions

```question
key: u02_l04_q01_supported_claim
type: passage-question
prompt: Read the Venn description and answer.
passageTitle: Diagram Description
passage: |
  The Otter circle is completely inside the Mammal circle.
question: Which claim is supported?
choices:
  - All otters are mammals.
  - All mammals are otters.
  - No otters are mammals.
  - Some otters are not mammals.
correctAnswer: All otters are mammals.
explanation: The inside relationship supports all otters are mammals, not the reverse.
hint: Read from the inside subject circle to the outside category.
```

```question
key: u02_l04_q02_status_reasons
type: match-pairs
prompt: Match each diagram fact to the conclusion it allows.
pairs:
  - left: X in the overlap of A and B
    right: At least one A is B
  - left: A circle completely inside B
    right: Every A is B
  - left: A and B have no overlap
    right: No A is B
  - left: X in A outside B
    right: At least one A is not B
explanation: Each diagram feature supports a specific kind of categorical claim.
hint: Translate each mark or region into words.
```

```question
key: u02_l04_q03_blank_not_false
type: multiple-choice
prompt: A Venn diagram does not show any X in the overlap of A and B. What can you conclude?
choices:
  - The diagram has not proven that some A are B.
  - No A are B must be true.
  - All A are B must be true.
  - Some A are not B must be false.
correctAnswer: The diagram has not proven that some A are B.
explanation: A blank-looking region is not automatically an empty region unless the diagram marks it as empty.
hint: Not shown is different from proven false.
```

```question
key: u02_l04_q04_overlap_proves_some
type: passage-question
prompt: Read the Venn description and answer.
passageTitle: Diagram Description
passage: |
  A Venn diagram has an X in the overlap of Volunteers and Gardeners.
question: Which claim is proved by the diagram?
choices:
  - Some volunteers are gardeners.
  - All volunteers are gardeners.
  - No volunteers are gardeners.
  - Not all gardeners are volunteers.
correctAnswer: Some volunteers are gardeners.
explanation: An X in the overlap proves at least one member belongs to both categories.
hint: An X proves existence, not an all-claim.
```

```question
key: u02_l04_q05_contradicted_claim
type: multiple-choice
prompt: A diagram shows the A and B circles with no overlap. Which claim is contradicted?
choices:
  - Some A are B.
  - No A are B.
  - No B are A.
  - All A are not B.
correctAnswer: Some A are B.
explanation: If there is no overlap, the diagram rules out any member being both A and B.
hint: A some-overlap claim needs at least one shared member.
```

```question
key: u02_l04_q06_supported_unknown_contradicted
type: fill-blank
prompt: "A diagram with one X in A outside B proves: Some A are ___."
sentenceBefore: Some A are
sentenceAfter: .
choices:
  - not B
  - all B
  - no A
  - outside A
correctAnswer: not B
explanation: An X in A outside B proves at least one A is not B.
hint: The X is still inside A, but it is outside B.
```
