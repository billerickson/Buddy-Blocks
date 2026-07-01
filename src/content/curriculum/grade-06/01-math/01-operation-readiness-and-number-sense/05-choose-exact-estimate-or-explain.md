---
id: lesson_grade6_math_u01_l05_choose_exact_estimate_or_explain
slug: choose-exact-estimate-or-explain
title: Choose Exact, Estimate, Or Explain
xpBase: 10
---

## Teaching Goal

Build judgment about the mathematical response a task requires.

## Student Outcome

The student can decide whether a prompt calls for an exact answer, an estimate, or a written explanation and complete the response.

## Key Ideas

Different tasks ask for different kinds of mathematical evidence.

## Misconception Checks

Every math question expects a single exact number; explanations can ignore computation; estimates are acceptable when exactness is requested.

## Teaching Note

Present three prompts that use similar numbers but ask "about how many," "exactly how many," and "how do you know?"

## Questions

```question
key: u01_l05_q01_response_type
type: multiple-choice
prompt: "Which response type best fits the question: About how much will 49 notebooks cost at $1.98 each?"
choices:
  - Estimate
  - Exact calculation
  - Definition
  - Graph
correctAnswer: Estimate
explanation: The phrase 'about how much' asks for an estimate, such as 50 x $2.
hint: Look for the word that tells whether exactness is needed.
```

```question
key: u01_l05_q02_exact_needed
type: multiple-choice
prompt: Which prompt asks for an exact answer?
choices:
  - About how many seats are filled?
  - Is 987 a reasonable total?
  - How many tickets were sold in all?
  - Why does this estimate make sense?
correctAnswer: How many tickets were sold in all?
explanation: This asks for the exact total, not an estimate or explanation.
hint: An exact prompt usually asks for the actual number.
```

```question
key: u01_l05_q03_model_choice
type: passage-question
prompt: Read the situation and answer.
passageTitle: Field Trip Snacks
passage: |
  A teacher buys 8 boxes of granola bars. Each box has 18 bars.
  The teacher wants to know whether there are enough for about 150 students.
question: What kind of response is most useful first?
choices:
  - Estimate 8 x 18 and compare it with 150
  - Compute 8 x 18 exactly before checking about 150
  - Write a percent
  - Make a graph of snack boxes over time
correctAnswer: Estimate 8 x 18 and compare it with 150
explanation: The question asks whether there are enough for about 150 students, so an estimate can answer quickly.
hint: The word 'about' is a clue.
```

```question
key: u01_l05_q04_compute_exact
type: text-input
prompt: A recipe uses 2.5 cups of oats per batch. How many cups are needed for exactly 4 batches?
acceptedAnswers:
  - "10"
  - 10 cups
answerType: text
explanation: 2.5 x 4 = 10, so exactly 10 cups are needed.
hint: Multiply cups per batch by number of batches.
```

```question
key: u01_l05_q05_explain_reasonable
type: multiple-choice
prompt: A student says 31 x 19 = 589. Which explanation best checks whether this is reasonable without multiplying exactly?
choices:
  - 31 is about 30 and 19 is about 20, so the product should be near 600.
  - 31 + 19 is about 50, so 589 is too large.
  - The answer is reasonable because any three-digit number would work.
  - The answer is not reasonable because an estimate must equal the exact product.
correctAnswer: 31 is about 30 and 19 is about 20, so the product should be near 600.
explanation: 30 x 20 = 600, and 589 is close to 600.
hint: Round each factor to the nearest ten.
```

```question
key: u01_l05_q06_sort_response_types
type: match-pairs
prompt: Match each prompt to the response it asks for.
pairs:
  - left: About how far?
    right: estimate
  - left: Exactly how many?
    right: compute
  - left: How do you know?
    right: explain
  - left: Which answer is impossible?
    right: reasonableness check
explanation: Prompt language tells what kind of mathematical evidence is needed.
hint: Look for words like about, exactly, explain, or impossible.
```
