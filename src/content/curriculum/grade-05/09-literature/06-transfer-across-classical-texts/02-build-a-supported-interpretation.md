---
id: lesson_grade5_literature_u06_l02_build_a_supported_interpretation
slug: build-a-supported-interpretation
title: Build A Supported Interpretation
xpBase: 10
---

## Teaching Goal

Combine summary, claim, evidence, and explanation on a new passage.

## Student Outcome

The student can build a concise supported interpretation without relying on plot retell or unsupported opinion.

## Misconception Checks

A broad theme word is enough; evidence can be loosely related; explanation should repeat the claim.

## Questions

```question
key: u06_l02_q01_best_supported_claim
type: passage-question
prompt: Read the passage and choose the best supported claim.
passageTitle: The Broken Oath
passage: |
  Kella promised to carry the treaty before moonrise. On the road, she found her old enemy wounded under a cedar tree. She stopped, tore her cloak for a bandage, and watched the moon climb above the hills.
question: Which claim is best supported?
choices:
  - Kella's mercy conflicts with her duty to deliver the treaty on time.
  - Kella never cared about the treaty.
  - The cedar tree controls Kella's choices.
  - Kella wants her enemy to suffer.
correctAnswer: Kella's mercy conflicts with her duty to deliver the treaty on time.
explanation: The passage shows her promise, the wounded enemy, her act of mercy, and the rising moon.
hint: Choose the claim that includes both the oath and the rescue.
```

```question
key: u06_l02_q02_best_evidence
type: passage-question
prompt: Read the passage and choose the best evidence.
passageTitle: The Broken Oath
passage: |
  Kella promised to carry the treaty before moonrise. On the road, she found her old enemy wounded under a cedar tree. She stopped, tore her cloak for a bandage, and watched the moon climb above the hills.
question: Which evidence best supports the claim that Kella risks failing her duty?
choices:
  - watched the moon climb above the hills
  - under a cedar tree
  - tore her cloak
  - old enemy
correctAnswer: watched the moon climb above the hills
explanation: The rising moon matters because Kella promised to deliver the treaty before moonrise.
hint: Find the detail connected to the deadline.
```

```question
key: u06_l02_q03_complete_interpretation
type: multi-blank-cloze
prompt: Complete the supported interpretation.
parts:
  - "Claim: Kella faces a conflict between "
  - " and duty. Evidence: she helps her old enemy while the "
  - " rises. Explanation: the rising moon matters because she promised to deliver the treaty before moonrise."
blanks:
  - correctAnswer: mercy
    acceptedAnswers:
      - mercy
      - compassion
    choices:
      - mercy
      - boasting
      - translation
  - correctAnswer: moon
    acceptedAnswers:
      - moon
    choices:
      - moon
      - gate
      - lyre
explanation: The frame combines claim, evidence, and explanation.
hint: Use the value behind helping and the detail tied to the deadline.
```

```question
key: u06_l02_q04_explanation_choice
type: multiple-choice
prompt: "Claim: Kella's mercy has a cost. Evidence: She tears her cloak for a bandage while the moon rises. Which explanation is strongest?"
choices:
  - The bandage helps her enemy, but the rising moon shows she may miss the treaty deadline.
  - Cloaks are useful pieces of clothing.
  - The moon is bright at night.
  - Kella probably dislikes treaties.
correctAnswer: The bandage helps her enemy, but the rising moon shows she may miss the treaty deadline.
explanation: The explanation connects both the merciful act and the cost.
hint: Explain both details, not just one.
```

```question
key: u06_l02_q05_weak_part
type: multiple-choice
prompt: What is weak about this response? 'Kella is kind. The passage has a cedar tree.'
choices:
  - The evidence does not support the claim about kindness.
  - The claim is too long.
  - The response uses too much evidence.
  - The cedar tree proves the whole theme.
correctAnswer: The evidence does not support the claim about kindness.
explanation: A better evidence choice would mention helping the wounded enemy.
hint: Ask whether the evidence proves the claim.
```

```question
key: u06_l02_q06_repair_weak_response
type: error-correction
prompt: Revise the weak response so the evidence directly supports the claim about mercy.
sentence: Kella is merciful because the cedar tree is under the enemy.
acceptedAnswers:
  - Kella is merciful because she tears her cloak to bandage her wounded enemy.
  - Kella shows mercy because she tears her cloak to bandage her wounded enemy.
explanation: The corrected response uses evidence that directly supports mercy.
hint: Use the action Kella takes for the enemy.
```
