---
id: lesson_grade3_math_multi_digit_add_with_regrouping
slug: add-with-regrouping
title: Add With Regrouping
xpBase: 10
config:
  intro:
    - title: Regroup Tens And Ones
      body: When ones make 10 or more, trade 10 ones for 1 ten. When tens make 10 or more, trade 10 tens for 1 hundred.
      bullets:
        - Line up ones, tens, and hundreds.
        - Add from right to left.
        - Regroup when a place value has 10 or more.
questions:
  - type: multiple-choice
    prompt: What is 248 + 137?
    choices:
      - "375"
      - "385"
      - "395"
      - "485"
    correctAnswer: "385"
    explanation: 8 + 7 = 15, so write 5 ones and regroup 1 ten. Then 4 tens + 3 tens + 1 ten = 8 tens.
  - type: text-input
    prompt: Type the sum of 326 + 219.
    acceptedAnswers:
      - "545"
    answerType: number
  - type: fill-blank
    prompt: 458 + 263 = ___.
    sentenceBefore: 458 + 263 =
    sentenceAfter: .
    choices:
      - "711"
      - "721"
      - "821"
      - "621"
    correctAnswer: "721"
  - type: match-pairs
    prompt: Match each addition problem to its sum.
    pairs:
      - left: 134 + 256
        right: "390"
      - left: 275 + 118
        right: "393"
      - left: 409 + 182
        right: "591"
  - type: order-items
    prompt: Order the steps for adding 287 + 146.
    items:
      - Add the ones and regroup 13 ones.
      - Add the hundreds.
      - Line up the place values.
      - Add the tens, including the regrouped ten.
    correctOrder:
      - Line up the place values.
      - Add the ones and regroup 13 ones.
      - Add the tens, including the regrouped ten.
      - Add the hundreds.
  - type: multiple-choice
    prompt: Which problem needs regrouping in the ones place?
    choices:
      - 213 + 142
      - 325 + 264
      - 417 + 236
      - 502 + 104
    correctAnswer: 417 + 236
    explanation: "5 ones + 4 ones = 9, so this one does not regroup. Check again: 417 + 236 has 7 + 6 = 13, so it needs regrouping."
  - type: text-input
    prompt: A library has 385 fiction books and 247 nonfiction books. Type the total number of books.
    acceptedAnswers:
      - "632"
    answerType: number
  - type: multiple-choice
    prompt: Which estimate best checks 385 + 247?
    choices:
      - 400 + 200 = 600
      - 300 + 200 = 500
      - 400 + 300 = 700
      - 800 + 200 = 1000
    correctAnswer: 400 + 200 = 600
    explanation: 632 is close to 600, so the exact answer is reasonable.
---
