---
id: lesson_grade5_logic_u05_l03_converse_and_inverse_traps
slug: converse-and-inverse-traps
title: Converse And Inverse Traps
xpBase: 10
---

## Teaching Goal

Teach students to recognize and avoid invalid reversals and negations of conditional rules.

## Student Outcome

The student can identify whether a proposed conclusion is the original rule, the converse, the inverse, or a valid direct inference.

## Misconception Checks

Assuming the converse is always true; assuming the inverse is always true; rejecting a valid direct inference because it sounds too simple.

## Questions

```question
key: u05_l03_q01_converse_form
type: multiple-choice
prompt: "Original rule: If an animal is a dog, then it is a mammal. Which statement is the converse?"
choices:
  - If an animal is a mammal, then it is a dog.
  - If an animal is a dog, then it is a mammal.
  - If an animal is not a dog, then it is not a mammal.
  - If an animal is not a mammal, then it is not a dog.
correctAnswer: If an animal is a mammal, then it is a dog.
explanation: The converse reverses the if-part and then-part.
hint: Converse means the direction is flipped.
```

```question
key: u05_l03_q02_inverse_form
type: multiple-choice
prompt: "Original rule: If a shape is a square, then it has four sides. Which statement is the inverse?"
choices:
  - If a shape is not a square, then it does not have four sides.
  - If a shape has four sides, then it is a square.
  - If a shape is a square, then it has four sides.
  - If a shape does not have four sides, then it is not a square.
correctAnswer: If a shape is not a square, then it does not have four sides.
explanation: The inverse negates both the if-part and the then-part.
hint: Inverse starts with not P and ends with not Q.
```

```question
key: u05_l03_q03_trap_match
type: match-pairs
prompt: Match each form for 'If P, then Q' to its name.
pairs:
  - left: If P, then Q
    right: original rule
  - left: If Q, then P
    right: converse reversal
  - left: If not P, then not Q
    right: inverse negation
  - left: P is true, so Q follows
    right: direct inference
explanation: The converse reverses the rule. The inverse negates both parts. A direct inference uses the original direction.
hint: Look for reversed order or added not.
```

```question
key: u05_l03_q04_converse_error
type: passage-question
prompt: Read the rule and conclusion.
passageTitle: Rule And Conclusion
passage: |
  Rule: If a badge is gold, then it opens Gate G.
  Conclusion: This badge opens Gate G, so it must be gold.
question: What is the problem?
choices:
  - The conclusion reverses the rule.
  - The conclusion follows directly from the if-part.
  - The conclusion is a no-claim.
  - The rule has no then-part.
correctAnswer: The conclusion reverses the rule.
explanation: The rule says gold badges open Gate G. It does not say only gold badges open Gate G.
hint: Opening Gate G is the then-part, not the if-part.
```

```question
key: u05_l03_q05_inverse_error
type: passage-question
prompt: Read the rule and conclusion.
passageTitle: Rule And Conclusion
passage: |
  Rule: If a book is a mystery, then it has clues.
  Conclusion: This book is not a mystery, so it has no clues.
question: What is the problem?
choices:
  - The conclusion uses an inverse that does not automatically follow.
  - The conclusion follows because all non-mystery books have no clues.
  - The rule says no books have clues.
  - The rule is about Venn diagrams, not conditionals.
correctAnswer: The conclusion uses an inverse that does not automatically follow.
explanation: A non-mystery book might still have clues. The original rule only tells what follows for mystery books.
hint: Not P does not automatically prove not Q.
```

```question
key: u05_l03_q06_valid_direct_not_trap
type: multiple-choice
prompt: "Rule: If a number is a multiple of 10, then it ends in 0. Fact: 40 is a multiple of 10. What follows?"
choices:
  - 40 ends in 0.
  - Every number that ends in 0 is 40.
  - If a number is not 40, it does not end in 0.
  - No multiples of 10 end in 0.
correctAnswer: 40 ends in 0.
explanation: The fact matches the if-part, so the then-part follows directly.
hint: Use the original rule direction.
```
