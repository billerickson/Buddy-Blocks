# Grade 3 Math Question Sets

Sources: accepted Grade 3 Math blueprint, course map, unit design briefs, and lesson briefs in `research/grade-03-math/`.

## Unit 1: Grade 3 Number Readiness

### Lesson 1: Hundreds, Tens, And Ones

```question
key: u01_l01_q01_digit_value
type: multiple-choice
prompt: "In 482, what is the value of the digit 8?"
choices:
  - "8"
  - "80"
  - "800"
  - "400"
correctAnswer: "80"
explanation: "The 8 is in the tens place, so it means 8 tens, or 80."
hint: "Look at the place the digit is in: hundreds, tens, or ones."
questionGoal: "Check whether the student can identify digit value by place."
misconception: "Treating the digit's face value as its place value."
```

```question
key: u01_l01_q02_expanded_form
type: match-pairs
prompt: "Match each number to its expanded form."
pairs:
  - left: "306"
    right: "300 + 6"
  - left: "472"
    right: "400 + 70 + 2"
  - left: "590"
    right: "500 + 90"
  - left: "814"
    right: "800 + 10 + 4"
explanation: "Expanded form shows the value of each nonzero digit."
hint: "Read each digit by its place before matching."
questionGoal: "Connect standard form to expanded form."
misconception: "Ignoring zero as a placeholder or adding digits without place value."
```

```question
key: u01_l01_q03_hundreds_tens_ones
type: multi-blank-cloze
prompt: "Complete the place-value sentence for 735."
parts:
  - "735 has "
  - " hundreds, "
  - " tens, and "
  - " ones."
blanks:
  - correctAnswer: "7"
    acceptedAnswers:
      - "7"
  - correctAnswer: "3"
    acceptedAnswers:
      - "3"
  - correctAnswer: "5"
    acceptedAnswers:
      - "5"
explanation: "In 735, the 7 is hundreds, the 3 is tens, and the 5 is ones."
hint: "Say the number by places from left to right."
questionGoal: "Identify hundreds, tens, and ones in a three-digit number."
misconception: "Reading the number as separate digits without place names."
```

```question
key: u01_l01_q04_build_number
type: text-input
prompt: "Type the number with 6 hundreds, 0 tens, and 9 ones."
acceptedAnswers:
  - "609"
answerType: number
explanation: "6 hundreds is 600, 0 tens means no tens, and 9 ones makes 609."
hint: "The zero holds the tens place."
questionGoal: "Compose a three-digit number from place-value units."
misconception: "Omitting zero when a place has no units."
```

```question
key: u01_l01_q05_compare_values
type: multiple-choice
prompt: "Which statement is true about 525?"
choices:
  - "The first 5 means 5 hundreds."
  - "Both 5s have the same value."
  - "The last 5 means 5 tens."
  - "The 2 means 2 ones."
correctAnswer: "The first 5 means 5 hundreds."
explanation: "In 525, the first 5 is in the hundreds place, and the last 5 is in the ones place."
hint: "Same digit, different place, different value."
questionGoal: "Show that identical digits can have different values by place."
misconception: "Assuming the same digit always has the same value."
```

```question
key: u01_l01_q06_explain_zero
type: constructed-response
prompt: "Explain why 407 needs the 0 in the tens place."
minWords: 6
sampleAnswer: "The 0 shows there are no tens, so the 7 stays in the ones place."
checklist:
  - Mention that there are no tens
  - Explain that the zero holds a place
explanation: "The zero is a placeholder. Without it, 407 would look like 47."
hint: "Think about what place the 7 would move to if the zero were missing."
questionGoal: "Explain zero as a placeholder in a three-digit number."
misconception: "Thinking zero can always be dropped without changing value."
```

### Lesson 2: Numbers On Open Number Lines

```question
key: u01_l02_q01_between_benchmarks
type: multiple-choice
prompt: "368 belongs between which two hundreds on a number line?"
choices:
  - "200 and 300"
  - "300 and 400"
  - "400 and 500"
  - "600 and 700"
correctAnswer: "300 and 400"
explanation: "368 is greater than 300 and less than 400."
hint: "Look at the hundreds digit first."
questionGoal: "Locate a three-digit number between hundred benchmarks."
misconception: "Using the last two digits instead of the full number's size."
```

```question
key: u01_l02_q02_order_numbers
type: order-items
prompt: "Put the numbers in order from least to greatest."
items:
  - "508"
  - "580"
  - "518"
  - "499"
correctOrder:
  - "499"
  - "508"
  - "518"
  - "580"
explanation: "499 is before 500. Then 508, 518, and 580 increase by tens and ones."
hint: "Compare hundreds first, then tens, then ones."
questionGoal: "Order three-digit numbers by magnitude."
misconception: "Comparing numbers digit by digit without considering place order."
```

```question
key: u01_l02_q03_closest_ten
type: multiple-choice
prompt: "On an open number line, 143 is closer to which ten?"
choices:
  - "130"
  - "140"
  - "150"
  - "200"
correctAnswer: "140"
explanation: "143 is 3 away from 140 and 7 away from 150."
hint: "Count the distance from 143 to each nearby ten."
questionGoal: "Use distance on a number line to judge closeness."
misconception: "Choosing the larger nearby benchmark automatically."
```

```question
key: u01_l02_q04_missing_midpoint
type: fill-blank
prompt: "Complete the benchmark sentence."
sentenceBefore: "Halfway between 200 and 300 is"
sentenceAfter: "."
choices:
  - "225"
  - "250"
  - "275"
  - "300"
correctAnswer: "250"
explanation: "250 is 50 more than 200 and 50 less than 300."
hint: "Halfway means the distance to both endpoints is the same."
questionGoal: "Identify a midpoint between hundred benchmarks."
misconception: "Treating halfway as any number between the endpoints."
```

```question
key: u01_l02_q05_place_on_line
type: multiple-choice
prompt: "A number line shows 600 on the left and 700 on the right. Where should 690 go?"
choices:
  - "Very close to 600"
  - "A little after 600"
  - "Near the middle"
  - "Very close to 700"
correctAnswer: "Very close to 700"
explanation: "690 is only 10 away from 700."
hint: "Compare how far 690 is from 600 and from 700."
questionGoal: "Reason about approximate position on an open number line."
misconception: "Placing numbers evenly by appearance instead of distance."
```

```question
key: u01_l02_q06_explain_compare
type: constructed-response
prompt: "Explain why 412 is greater than 398."
minWords: 6
sampleAnswer: "412 is greater because it is past 400, and 398 is before 400."
checklist:
  - Compare the hundreds or benchmark
  - Say which number is greater
explanation: "412 is more than 400, while 398 is less than 400."
hint: "Use 400 as a benchmark to compare the two numbers."
questionGoal: "Explain a comparison using magnitude or benchmarks."
misconception: "Thinking 398 is greater because 98 is greater than 12."
```

### Lesson 3: Addition Strategies That Still Work

```question
key: u01_l03_q01_choose_strategy
type: multiple-choice
prompt: "Which first step is useful for 48 + 25?"
choices:
  - "Add 40 + 20, then 8 + 5"
  - "Subtract 25 from 48"
  - "Ignore the tens"
  - "Add 4 + 2 only"
correctAnswer: "Add 40 + 20, then 8 + 5"
explanation: "Breaking numbers into tens and ones keeps place value clear."
hint: "Separate tens from ones."
questionGoal: "Choose a place-value addition strategy."
misconception: "Adding only visible digits without place value."
```

```question
key: u01_l03_q02_make_ten
type: fill-blank
prompt: "Complete the make-ten step for 27 + 8."
sentenceBefore: "27 needs"
sentenceAfter: "more to make 30."
choices:
  - "1"
  - "2"
  - "3"
  - "8"
correctAnswer: "3"
explanation: "27 + 3 = 30, so 8 can be split into 3 and 5."
hint: "Count up from 27 to the next ten."
questionGoal: "Use make-ten reasoning for addition."
misconception: "Adding the whole second addend before completing a ten."
```

```question
key: u01_l03_q03_number_line_jumps
type: order-items
prompt: "Put the jumps for 56 + 37 in a useful order."
items:
  - "+7"
  - "Start at 56"
  - "+30"
  - "Land on 93"
correctOrder:
  - "Start at 56"
  - "+30"
  - "+7"
  - "Land on 93"
explanation: "Add the tens first, then the ones: 56 + 30 = 86, and 86 + 7 = 93."
hint: "A number-line strategy starts at the first number."
questionGoal: "Sequence an open-number-line addition strategy."
misconception: "Performing jumps without tracking the starting point or total."
```

```question
key: u01_l03_q04_add_sum
type: text-input
prompt: "Type the sum: 328 + 146"
acceptedAnswers:
  - "474"
answerType: number
explanation: "300 + 100 = 400, 20 + 40 = 60, and 8 + 6 = 14, so the total is 474."
hint: "Add hundreds, tens, and ones, then combine."
questionGoal: "Compute a supported three-digit addition problem."
misconception: "Forgetting to regroup ones or tens."
```

```question
key: u01_l03_q05_compensation
type: multiple-choice
prompt: "Which expression has the same value as 39 + 26?"
choices:
  - "40 + 25"
  - "40 + 26"
  - "39 + 25"
  - "30 + 20"
correctAnswer: "40 + 25"
explanation: "If 39 increases by 1, 26 must decrease by 1 to keep the same total."
hint: "Compensation changes both addends but keeps the total the same."
questionGoal: "Recognize compensation in addition."
misconception: "Changing one addend without balancing the other."
```

```question
key: u01_l03_q06_explain_strategy
type: constructed-response
prompt: "Solve 64 + 29 and explain the strategy you used."
minWords: 8
sampleAnswer: "64 + 30 is 94, then subtract 1, so the answer is 93."
checklist:
  - Include the answer
  - Name or describe a strategy
explanation: "A valid strategy shows how the total was found, such as compensation or adding tens and ones."
hint: "You might use 29 as 30 minus 1."
questionGoal: "Produce and explain an efficient addition strategy."
misconception: "Giving only an answer without showing mathematical reasoning."
```

### Lesson 4: Subtraction As Difference And Take-Away

```question
key: u01_l04_q01_subtraction_meaning
type: multiple-choice
prompt: "Which question asks for a difference?"
choices:
  - "Mia had 45 stickers and gave away 12. How many are left?"
  - "Mia has 45 stickers. Leo has 12. How many more does Mia have?"
  - "Mia has 45 stickers and gets 12 more. How many now?"
  - "Mia puts 45 stickers into groups of 5. How many groups?"
correctAnswer: "Mia has 45 stickers. Leo has 12. How many more does Mia have?"
explanation: "A difference compares two amounts to find how far apart they are."
hint: "Look for a comparison, not something being taken away."
questionGoal: "Distinguish comparison subtraction from take-away subtraction."
misconception: "Thinking subtraction only means taking away."
```

```question
key: u01_l04_q02_count_up
type: fill-blank
prompt: "Count up to find 83 - 57. 57 + ___ = 83."
sentenceBefore: "The missing difference is"
sentenceAfter: "."
choices:
  - "24"
  - "26"
  - "36"
  - "40"
correctAnswer: "26"
explanation: "57 + 26 = 83, so 83 - 57 = 26."
hint: "Jump from 57 to 60, then to 80, then to 83."
questionGoal: "Use count-up subtraction for a difference."
misconception: "Subtracting digits separately without regrouping or distance reasoning."
```

```question
key: u01_l04_q03_match_story_expression
type: match-pairs
prompt: "Match each story to the expression that fits."
pairs:
  - left: "72 birds, 18 fly away"
    right: "72 - 18"
  - left: "72 birds and 18 more arrive"
    right: "72 + 18"
  - left: "72 birds compared with 18 birds"
    right: "72 - 18 for the difference"
  - left: "18 groups of 4 birds"
    right: "18 x 4"
explanation: "Subtraction can show take-away or comparison, but the story tells which meaning is used."
hint: "Ask what is happening: joining, leaving, comparing, or grouping."
questionGoal: "Match contexts to operations and expressions."
misconception: "Choosing operations by one number or word instead of structure."
```

```question
key: u01_l04_q04_compute_difference
type: text-input
prompt: "Type the difference: 402 - 175"
acceptedAnswers:
  - "227"
answerType: number
explanation: "175 + 227 = 402, so the difference is 227."
hint: "You can count up from 175 to 402 if regrouping is hard."
questionGoal: "Compute a three-digit subtraction problem with support."
misconception: "Mishandling regrouping across zero."
```

```question
key: u01_l04_q05_inverse_check
type: multiple-choice
prompt: "Which equation checks 91 - 38 = 53?"
choices:
  - "53 + 38 = 91"
  - "91 + 38 = 53"
  - "53 - 38 = 91"
  - "91 - 53 = 38 + 91"
correctAnswer: "53 + 38 = 91"
explanation: "Adding the difference and the amount subtracted should return to the starting number."
hint: "Subtraction can be checked with addition."
questionGoal: "Connect subtraction to inverse addition."
misconception: "Repeating or rearranging numbers without preserving the relationship."
```

```question
key: u01_l04_q06_explain_takeaway_difference
type: constructed-response
prompt: "Explain two ways to think about 65 - 28."
minWords: 10
sampleAnswer: "It can mean 28 taken away from 65, or the difference between 65 and 28."
checklist:
  - Include take-away
  - Include difference or comparison
explanation: "Subtraction can answer both \"how many left?\" and \"how far apart?\""
hint: "Think of one story where something leaves and one story comparing two amounts."
questionGoal: "Articulate two meanings of subtraction."
misconception: "Believing subtraction has only one interpretation."
```

### Lesson 5: Equations, Boxes, And Balance

```question
key: u01_l05_q01_equals_meaning
type: multiple-choice
prompt: "What does the equals sign mean in 18 + 7 = 25?"
choices:
  - "The two sides have the same value."
  - "The answer always comes next."
  - "Add every number you see."
  - "The left side is bigger."
correctAnswer: "The two sides have the same value."
explanation: "The equals sign shows that both sides have the same value."
hint: "Read the equals sign as \"is the same value as.\""
questionGoal: "Check relational understanding of the equals sign."
misconception: "Treating equals as a signal to write the answer next."
```

```question
key: u01_l05_q02_missing_addend
type: fill-blank
prompt: "Complete the equation."
sentenceBefore: "36 +"
sentenceAfter: "= 52"
choices:
  - "14"
  - "16"
  - "18"
  - "26"
correctAnswer: "16"
explanation: "36 + 16 = 52."
hint: "Count up from 36 to 52."
questionGoal: "Solve for an unknown addend."
misconception: "Adding the two visible numbers or guessing the final answer position."
```

```question
key: u01_l05_q03_unknown_start
type: text-input
prompt: "Type the missing number: ___ - 18 = 24"
acceptedAnswers:
  - "42"
answerType: number
explanation: "42 - 18 = 24 because 24 + 18 = 42."
hint: "Use the inverse operation: add 24 and 18."
questionGoal: "Solve an equation with the unknown at the start."
misconception: "Assuming the blank must be the result of the operation."
```

```question
key: u01_l05_q04_true_equation
type: multiple-choice
prompt: "Which equation is true?"
choices:
  - "45 = 30 + 15"
  - "45 = 30 + 5"
  - "45 + 15 = 30"
  - "30 = 45 + 15"
correctAnswer: "45 = 30 + 15"
explanation: "30 + 15 has the same value as 45."
hint: "Check whether both sides have equal value."
questionGoal: "Recognize equations with the answer on the left."
misconception: "Rejecting equations where the result appears before the equals sign."
```

```question
key: u01_l05_q05_match_equations
type: match-pairs
prompt: "Match each equation to the missing value."
pairs:
  - left: "20 + __ = 35"
    right: "15"
  - left: "__ + 9 = 40"
    right: "31"
  - left: "54 - __ = 30"
    right: "24"
  - left: "__ - 12 = 28"
    right: "40"
explanation: "Each missing value makes the two sides of the equation equal."
hint: "Use addition to check subtraction equations."
questionGoal: "Solve unknowns in varied equation positions."
misconception: "Using the same operation for every blank position."
```

```question
key: u01_l05_q06_fix_unbalanced
type: error-correction
prompt: "Correct the equation."
sentence: "27 + 14 = 27"
acceptedAnswers:
  - "27 + 14 = 41"
  - "41 = 27 + 14"
explanation: "27 + 14 equals 41, not 27."
hint: "Find the value of the left side first."
questionGoal: "Correct an equation so both sides balance."
misconception: "Copying one addend as the answer without calculating."
```

### Lesson 6: Skip Counting With Structure

```question
key: u01_l06_q01_jump_size
type: multiple-choice
prompt: "What is the jump size in this sequence? 0, 5, 10, 15, 20"
choices:
  - "+2"
  - "+5"
  - "+10"
  - "+15"
correctAnswer: "+5"
explanation: "Each number is 5 more than the number before it."
hint: "Compare two neighboring numbers."
questionGoal: "Identify the equal jump in a skip-count sequence."
misconception: "Naming a number in the sequence instead of the repeated jump."
```

```question
key: u01_l06_q02_complete_sequence
type: fill-blank
prompt: "Complete the skip-counting sequence."
sentenceBefore: "12, 14, 16,"
sentenceAfter: ", 20"
choices:
  - "17"
  - "18"
  - "19"
  - "22"
correctAnswer: "18"
explanation: "The sequence counts by 2s, so the missing number is 18."
hint: "Add the same jump each time."
questionGoal: "Complete a skip-counting pattern."
misconception: "Switching jump sizes mid-sequence."
```

```question
key: u01_l06_q03_groups_to_sequence
type: multiple-choice
prompt: "There are 4 boxes with 10 pencils in each box. Which sequence counts the pencils by boxes?"
choices:
  - "10, 20, 30, 40"
  - "4, 8, 12, 16"
  - "10, 11, 12, 13"
  - "4, 14, 24, 34"
correctAnswer: "10, 20, 30, 40"
explanation: "Each box adds 10 pencils, so the total counts by 10s."
hint: "The jump size is the number of pencils in one box."
questionGoal: "Connect equal groups to skip-counting totals."
misconception: "Counting the number of groups instead of the items in each group."
```

```question
key: u01_l06_q04_order_jumps
type: order-items
prompt: "Put the totals in order when counting 5 groups of 2."
items:
  - "8"
  - "2"
  - "10"
  - "4"
  - "6"
correctOrder:
  - "2"
  - "4"
  - "6"
  - "8"
  - "10"
explanation: "Five groups of 2 give totals 2, 4, 6, 8, and 10."
hint: "Count by 2s."
questionGoal: "Track equal groups through skip-counted totals."
misconception: "Including the starting zero as a group total or misordering jumps."
```

```question
key: u01_l06_q05_equal_jumps_text
type: text-input
prompt: "If you make 6 jumps of 5, what number do you land on starting at 0?"
acceptedAnswers:
  - "30"
answerType: number
explanation: "Six jumps of 5 are 5, 10, 15, 20, 25, 30."
hint: "Count six totals by 5s."
questionGoal: "Use skip counting to find an equal-jump total."
misconception: "Making five jumps instead of six."
```

```question
key: u01_l06_q06_explain_skip_count
type: constructed-response
prompt: "Explain how skip counting by 10s can help count 7 groups of 10."
minWords: 8
sampleAnswer: "Each group adds 10, so I count 10, 20, 30, 40, 50, 60, 70."
checklist:
  - Mention the jump size is 10
  - Include the total 70
explanation: "Skip counting uses one equal jump for each equal group."
hint: "Say one total for each group of 10."
questionGoal: "Explain skip counting as equal jumps connected to groups."
misconception: "Treating skip counting as a memorized chant without group meaning."
```

### Lesson 7: Rows, Columns, And Arrays

```question
key: u01_l07_q01_row_column
type: multiple-choice
prompt: "An array has 3 rows with 5 dots in each row. How many dots are there?"
choices:
  - "8"
  - "15"
  - "25"
  - "35"
correctAnswer: "15"
explanation: "Three rows of 5 dots make 5 + 5 + 5 = 15 dots."
hint: "Add 5 once for each row."
questionGoal: "Use row structure to find an array total."
misconception: "Adding rows and columns instead of using equal groups."
```

```question
key: u01_l07_q02_identify_rows
type: fill-blank
prompt: "Complete the array description."
sentenceBefore: "An array with 4 horizontal groups has 4"
sentenceAfter: "."
choices:
  - "rows"
  - "columns"
  - "totals"
  - "ones"
correctAnswer: "rows"
explanation: "Rows go across horizontally."
hint: "Rows run side to side."
questionGoal: "Identify row language."
misconception: "Confusing rows and columns."
```

```question
key: u01_l07_q03_match_array_repeated_addition
type: match-pairs
prompt: "Match each array description to repeated addition."
pairs:
  - left: "2 rows of 6"
    right: "6 + 6"
  - left: "4 rows of 3"
    right: "3 + 3 + 3 + 3"
  - left: "3 rows of 5"
    right: "5 + 5 + 5"
  - left: "5 rows of 2"
    right: "2 + 2 + 2 + 2 + 2"
explanation: "Each row contributes the same number of dots."
hint: "The number of rows tells how many addends to use."
questionGoal: "Connect arrays to repeated addition."
misconception: "Using the total number of dots as each addend."
```

```question
key: u01_l07_q04_columns_total
type: text-input
prompt: "An array has 6 columns with 2 dots in each column. Type the total number of dots."
acceptedAnswers:
  - "12"
answerType: number
explanation: "Six columns of 2 dots make 12 dots."
hint: "Count by 2s six times."
questionGoal: "Use column structure to find a total."
misconception: "Counting the number of columns only."
```

```question
key: u01_l07_q05_equal_array
type: multiple-choice
prompt: "Which description is an array?"
choices:
  - "3 rows with 4 dots in each row"
  - "3 rows with 4, 5, and 2 dots"
  - "One long line of 11 uneven spaces"
  - "A group of dots with no rows"
correctAnswer: "3 rows with 4 dots in each row"
explanation: "An array has equal rows and columns."
hint: "Look for equal-size rows."
questionGoal: "Recognize the equal-row structure of an array."
misconception: "Treating any group of dots as an array."
```

```question
key: u01_l07_q06_explain_array
type: constructed-response
prompt: "Explain how an array helps you count 4 rows of 6."
minWords: 8
sampleAnswer: "I can count 6 in each row: 6, 12, 18, 24."
checklist:
  - Mention rows or columns
  - Include the total 24
explanation: "Arrays organize equal groups so you can count by rows or columns."
hint: "Use row language in your explanation."
questionGoal: "Explain how array structure supports efficient counting."
misconception: "Seeing arrays as pictures to count one by one only."
```

### Lesson 8: Choose A Model And Check

```question
key: u01_l08_q01_best_model_compare
type: multiple-choice
prompt: "Which model best fits this problem? Ana has 64 shells. Ben has 27 shells. How many more shells does Ana have?"
choices:
  - "A strip diagram comparing 64 and 27"
  - "An array with equal rows"
  - "A picture graph with a scale"
  - "A fraction strip"
correctAnswer: "A strip diagram comparing 64 and 27"
explanation: "The problem asks for a comparison, so a strip diagram can show the difference."
hint: "Ask whether the story is comparing two amounts or making equal groups."
questionGoal: "Choose a representation for a comparison problem."
misconception: "Choosing the newest or most familiar model instead of the structure."
```

```question
key: u01_l08_q02_model_equal_groups
type: multiple-choice
prompt: "Which model best fits 5 bags with 6 marbles in each bag?"
choices:
  - "Equal groups or an array"
  - "A number line from 500 to 600"
  - "A clock"
  - "A place-value chart only"
correctAnswer: "Equal groups or an array"
explanation: "The story has equal groups: 5 bags, each with 6 marbles."
hint: "Look for the same amount in each group."
questionGoal: "Choose a representation for an equal-groups situation."
misconception: "Missing multiplicative structure in a context."
```

```question
key: u01_l08_q03_match_problem_model
type: match-pairs
prompt: "Match each problem type to a useful model."
pairs:
  - left: "Compare two amounts"
    right: "Strip diagram"
  - left: "Count equal rows"
    right: "Array"
  - left: "Add jumps of tens"
    right: "Open number line"
  - left: "Show hundreds, tens, ones"
    right: "Place-value chart"
explanation: "A useful model shows the structure of the problem."
hint: "Think about what each model is best at showing."
questionGoal: "Connect mathematical structures to representations."
misconception: "Treating representations as interchangeable decorations."
```

```question
key: u01_l08_q04_check_reasonable
type: multiple-choice
prompt: "Jay says 48 + 31 = 19. Which check shows the answer is not reasonable?"
choices:
  - "48 and 31 are both positive, so the sum should be greater than 48."
  - "19 is a two-digit number."
  - "31 has 3 tens."
  - "48 is close to 50."
correctAnswer: "48 and 31 are both positive, so the sum should be greater than 48."
explanation: "Adding a positive number to 48 should make a total bigger than 48, not 19."
hint: "Think about whether adding should make the number larger or smaller."
questionGoal: "Use reasonableness to catch an impossible sum."
misconception: "Accepting any computed number without checking size."
```

```question
key: u01_l08_q05_compute_and_check
type: text-input
prompt: "Use any model or strategy. What is 72 - 39?"
acceptedAnswers:
  - "33"
answerType: number
explanation: "39 + 33 = 72, so 72 - 39 = 33."
hint: "Count up from 39 to 72."
questionGoal: "Apply a chosen strategy to solve and check a subtraction problem."
misconception: "Subtracting digits without regrouping or checking."
```

```question
key: u01_l08_q06_explain_model_choice
type: constructed-response
prompt: "A problem asks for 4 rows of 7 chairs. Name a model you would use and explain why."
minWords: 8
sampleAnswer: "I would use an array because rows of chairs make equal rows."
checklist:
  - Name a useful model
  - Explain why it fits the problem
explanation: "An array fits because the chairs are arranged in equal rows."
hint: "The words \"rows of\" are a clue about the structure."
questionGoal: "Explain a representation choice for an array situation."
misconception: "Choosing a model without connecting it to the problem structure."
```

## Unit 2: Multiplication As Equal Groups And Arrays

### Lesson 1: Equal Groups Or Not?

```question
key: u02_l01_q01_equal_groups
type: multiple-choice
prompt: "Which situation shows equal groups?"
choices:
  - "4 plates with 3 cookies on each plate"
  - "4 plates with 2, 3, 4, and 5 cookies"
  - "One plate with 12 cookies"
  - "3 plates with different numbers of cookies"
correctAnswer: "4 plates with 3 cookies on each plate"
explanation: "Multiplication needs groups with the same number in each group."
hint: "Look for the same amount in every group."
questionGoal: "Identify a valid equal-groups situation."
misconception: "Treating any collection of groups as multiplication-ready."
```

```question
key: u02_l01_q02_not_equal
type: multiple-choice
prompt: "Why is this not a multiplication situation? A basket has groups of 5, 5, 4, and 5 apples."
choices:
  - "One group has a different size."
  - "There are too many apples."
  - "The groups are too small."
  - "There are four groups."
correctAnswer: "One group has a different size."
explanation: "The groups must be equal. One group has 4 apples instead of 5."
hint: "Compare the size of each group."
questionGoal: "Recognize why unequal groups do not fit multiplication."
misconception: "Ignoring one unequal group because most groups match."
```

```question
key: u02_l01_q03_sort_examples
type: match-pairs
prompt: "Match each description to equal groups or not equal groups."
pairs:
  - left: "6 bags with 2 buttons each"
    right: "Equal groups"
  - left: "3 boxes with 4, 4, and 1 pencils"
    right: "Not equal groups"
  - left: "5 rows with 7 chairs each"
    right: "Equal rows"
  - left: "One pile of 20 rocks"
    right: "No groups shown"
explanation: "Equal groups have the same amount in each group."
hint: "Ask whether each group has the same size."
questionGoal: "Classify examples and non-examples of equal groups."
misconception: "Looking only at the total number of objects."
```

```question
key: u02_l01_q04_group_size
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "There are 5 bags with 4 cubes in each bag. The group size is"
sentenceAfter: "."
choices:
  - "4"
  - "5"
  - "9"
  - "20"
correctAnswer: "4"
explanation: "The group size is how many are in each group."
hint: "\"In each bag\" tells the size of one group."
questionGoal: "Identify group size in an equal-groups context."
misconception: "Confusing number of groups with size of each group."
```

```question
key: u02_l01_q05_total_equal_groups
type: text-input
prompt: "There are 3 equal groups with 6 stars in each group. Type the total number of stars."
acceptedAnswers:
  - "18"
answerType: number
explanation: "6 + 6 + 6 = 18."
hint: "Add 6 once for each group."
questionGoal: "Find a total from equal groups before formal multiplication."
misconception: "Adding group count and group size, such as 3 + 6."
```

```question
key: u02_l01_q06_explain_equal_groups
type: constructed-response
prompt: "Explain why 4 teams with 5 players on each team can be a multiplication situation."
minWords: 8
sampleAnswer: "It has 4 equal groups because each team has 5 players."
checklist:
  - Mention equal groups
  - Mention 5 players in each group
explanation: "Equal groups make multiplication possible because each group has the same size."
hint: "Use the phrase \"each team\" in your explanation."
questionGoal: "Explain the equal-groups condition for multiplication."
misconception: "Stating only the total or number of groups without equality."
```

### Lesson 2: Groups Of A Number

```question
key: u02_l02_q01_groups_phrase
type: multiple-choice
prompt: "What does \"6 groups of 4\" mean?"
choices:
  - "6 groups with 4 in each group"
  - "4 groups with 6 in each group only"
  - "6 + 4"
  - "One group of 24"
correctAnswer: "6 groups with 4 in each group"
explanation: "The phrase names the number of groups and the size of each group."
hint: "The first number tells how many groups."
questionGoal: "Interpret \"groups of\" language."
misconception: "Adding the two numbers or reversing without context."
```

```question
key: u02_l02_q02_repeated_addition
type: multiple-choice
prompt: "Which repeated addition matches 4 groups of 7?"
choices:
  - "7 + 7 + 7 + 7"
  - "4 + 7"
  - "4 + 4 + 4 + 4 + 4 + 4 + 4"
  - "7 - 4"
correctAnswer: "7 + 7 + 7 + 7"
explanation: "Four groups of 7 means add 7 four times."
hint: "The group size is the repeated addend."
questionGoal: "Translate a groups-of phrase to repeated addition."
misconception: "Repeating the number of groups instead of the group size."
```

```question
key: u02_l02_q03_match_phrase_addition
type: match-pairs
prompt: "Match each phrase to repeated addition."
pairs:
  - left: "3 groups of 5"
    right: "5 + 5 + 5"
  - left: "2 groups of 8"
    right: "8 + 8"
  - left: "5 groups of 3"
    right: "3 + 3 + 3 + 3 + 3"
  - left: "4 groups of 6"
    right: "6 + 6 + 6 + 6"
explanation: "The group size is repeated once for each group."
hint: "Count how many addends there should be."
questionGoal: "Match group language to repeated-addition structure."
misconception: "Matching by total or surface numbers rather than structure."
```

```question
key: u02_l02_q04_fill_groups
type: fill-blank
prompt: "Complete the sentence for 5 groups of 2."
sentenceBefore: "There are"
sentenceAfter: "groups, and each group has 2."
choices:
  - "2"
  - "5"
  - "7"
  - "10"
correctAnswer: "5"
explanation: "In 5 groups of 2, there are 5 groups."
hint: "The number before \"groups\" tells how many groups."
questionGoal: "Identify the number of groups in groups-of language."
misconception: "Confusing group count with group size."
```

```question
key: u02_l02_q05_total_groups
type: text-input
prompt: "Type the total for 8 groups of 3."
acceptedAnswers:
  - "24"
answerType: number
explanation: "3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 = 24."
hint: "Count by 3s eight times."
questionGoal: "Compute a total from groups-of language."
misconception: "Adding 8 + 3 instead of using equal groups."
```

```question
key: u02_l02_q06_draw_description
type: constructed-response
prompt: "Describe a drawing that would show 3 groups of 4."
minWords: 8
sampleAnswer: "I would draw 3 circles with 4 dots inside each circle."
checklist:
  - Include 3 groups
  - Include 4 in each group
explanation: "A correct drawing shows the number of groups and the same size in each group."
hint: "Say how many groups and how many are in each."
questionGoal: "Produce a verbal model for groups-of language."
misconception: "Describing a total without showing equal groups."
```

### Lesson 3: Skip Counting As Equal Jumps

```question
key: u02_l03_q01_equal_jumps
type: multiple-choice
prompt: "Which number line shows 4 groups of 6 starting at 0?"
choices:
  - "0, 6, 12, 18, 24"
  - "0, 4, 8, 12, 16, 20, 24"
  - "0, 6, 13, 19, 24"
  - "6, 12, 18"
correctAnswer: "0, 6, 12, 18, 24"
explanation: "Four jumps of 6 land on 24."
hint: "There should be 4 equal jumps, each worth 6."
questionGoal: "Match equal groups to skip-counting jumps."
misconception: "Using the number of groups as the jump size."
```

```question
key: u02_l03_q02_land_on
type: text-input
prompt: "Starting at 0, make 5 jumps of 4. What number do you land on?"
acceptedAnswers:
  - "20"
answerType: number
explanation: "4, 8, 12, 16, 20. Five jumps of 4 land on 20."
hint: "Count five totals by 4s."
questionGoal: "Use skip counting to find a multiplication total."
misconception: "Making four jumps instead of five."
```

```question
key: u02_l03_q03_missing_jump
type: fill-blank
prompt: "Complete the equal-jump sentence."
sentenceBefore: "0, 7, 14, 21 shows jumps of"
sentenceAfter: "."
choices:
  - "3"
  - "7"
  - "14"
  - "21"
correctAnswer: "7"
explanation: "Each jump adds 7."
hint: "Compare 0 to 7 and 7 to 14."
questionGoal: "Identify the jump size in a multiplication skip count."
misconception: "Naming the final total instead of the repeated jump."
```

```question
key: u02_l03_q04_match_groups_jumps
type: match-pairs
prompt: "Match each equal-groups situation to the landing number."
pairs:
  - left: "3 jumps of 5"
    right: "15"
  - left: "6 jumps of 2"
    right: "12"
  - left: "4 jumps of 8"
    right: "32"
  - left: "5 jumps of 6"
    right: "30"
explanation: "The landing number is the total after all equal jumps."
hint: "Skip count by the jump size the correct number of times."
questionGoal: "Relate number of jumps and jump size to a total."
misconception: "Multiplying or counting with the wrong factor role."
```

```question
key: u02_l03_q05_order_skip_count
type: order-items
prompt: "Put the totals in order for 6 groups of 5."
items:
  - "25"
  - "10"
  - "30"
  - "5"
  - "20"
  - "15"
correctOrder:
  - "5"
  - "10"
  - "15"
  - "20"
  - "25"
  - "30"
explanation: "Six groups of 5 give totals 5, 10, 15, 20, 25, 30."
hint: "Count by 5s."
questionGoal: "Sequence skip-counted totals for equal groups."
misconception: "Misordering or skipping equal jumps."
```

```question
key: u02_l03_q06_explain_jumps
type: constructed-response
prompt: "Explain how a number line can show 3 groups of 8."
minWords: 8
sampleAnswer: "It can show 3 equal jumps of 8 from 0 to 24."
checklist:
  - Mention 3 jumps
  - Mention jump size 8
  - Include total 24
explanation: "Each jump represents one equal group of 8."
hint: "Think of one jump for each group."
questionGoal: "Explain equal-jump representation of multiplication."
misconception: "Treating the number line as a list instead of a model of groups."
```

### Lesson 4: From Repeated Addition To Multiplication

```question
key: u02_l04_q01_addition_to_multiplication
type: multiple-choice
prompt: "Which multiplication equation matches 9 + 9 + 9 + 9?"
choices:
  - "4 x 9 = 36"
  - "9 x 9 = 81"
  - "4 + 9 = 13"
  - "9 x 3 = 27"
correctAnswer: "4 x 9 = 36"
explanation: "There are 4 equal addends of 9."
hint: "Count how many 9s are being added."
questionGoal: "Translate repeated addition into multiplication."
misconception: "Using the addend as both factors or counting addends incorrectly."
```

```question
key: u02_l04_q02_multiplication_to_addition
type: multiple-choice
prompt: "Which repeated addition matches 5 x 6?"
choices:
  - "6 + 6 + 6 + 6 + 6"
  - "5 + 6"
  - "5 + 5 + 5 + 5 + 5 + 5"
  - "6 - 5"
correctAnswer: "6 + 6 + 6 + 6 + 6"
explanation: "5 x 6 can mean 5 groups of 6."
hint: "Repeat the group size once for each group."
questionGoal: "Translate multiplication to repeated addition."
misconception: "Adding the two factors instead of representing equal groups."
```

```question
key: u02_l04_q03_match_equations
type: match-pairs
prompt: "Match each repeated addition to a multiplication equation."
pairs:
  - left: "4 + 4 + 4"
    right: "3 x 4"
  - left: "2 + 2 + 2 + 2 + 2"
    right: "5 x 2"
  - left: "8 + 8"
    right: "2 x 8"
  - left: "7 + 7 + 7 + 7"
    right: "4 x 7"
explanation: "Multiplication names how many equal addends there are and the size of each addend."
hint: "Count the number of addends first."
questionGoal: "Match repeated addition and multiplication forms."
misconception: "Matching by total or by one number only."
```

```question
key: u02_l04_q04_not_multiplication
type: multiple-choice
prompt: "Which addition expression should not be written as one multiplication fact?"
choices:
  - "5 + 5 + 5"
  - "3 + 3 + 3 + 3"
  - "4 + 6 + 4"
  - "9 + 9"
correctAnswer: "4 + 6 + 4"
explanation: "The addends are not all equal, so it is not one equal-groups multiplication fact."
hint: "Multiplication here needs equal addends."
questionGoal: "Identify a non-example of repeated equal addition."
misconception: "Writing multiplication for any addition expression."
```

```question
key: u02_l04_q05_product
type: text-input
prompt: "Type the product: 6 x 7"
acceptedAnswers:
  - "42"
answerType: number
explanation: "6 x 7 can mean 6 groups of 7, which totals 42."
hint: "Count by 7s six times or use a known fact."
questionGoal: "Produce a product from a multiplication equation."
misconception: "Adding 6 + 7 instead of multiplying."
```

```question
key: u02_l04_q06_explain_factors
type: constructed-response
prompt: "In 3 x 8 = 24, explain what the 3 and 8 can mean."
minWords: 8
sampleAnswer: "The 3 can mean 3 groups, and the 8 can mean 8 in each group."
checklist:
  - Explain the 3
  - Explain the 8
explanation: "Factors can name the number of groups and the size of each group."
hint: "Use the words \"groups\" and \"in each group.\""
questionGoal: "Interpret factors in a multiplication equation."
misconception: "Saying factors are only numbers to calculate with."
```

### Lesson 5: Rows And Columns In Arrays

```question
key: u02_l05_q01_array_equation
type: multiple-choice
prompt: "An array has 4 rows and 6 columns. Which equation matches it?"
choices:
  - "4 x 6 = 24"
  - "4 + 6 = 10"
  - "6 - 4 = 2"
  - "24 x 6 = 144"
correctAnswer: "4 x 6 = 24"
explanation: "Four rows of 6 columns make 24 total."
hint: "Rows times columns gives the total in an array."
questionGoal: "Match an array description to a multiplication equation."
misconception: "Adding rows and columns instead of multiplying equal rows."
```

```question
key: u02_l05_q02_rows_columns_fill
type: fill-blank
prompt: "Complete the statement."
sentenceBefore: "A 5 by 3 array has 5 rows and"
sentenceAfter: "columns."
choices:
  - "3"
  - "5"
  - "8"
  - "15"
correctAnswer: "3"
explanation: "A 5 by 3 array has 5 rows with 3 in each row."
hint: "The second number tells the number in each row or columns."
questionGoal: "Interpret dimensions in array language."
misconception: "Treating the product as a dimension."
```

```question
key: u02_l05_q03_match_array_total
type: match-pairs
prompt: "Match each array to its total."
pairs:
  - left: "2 rows of 9"
    right: "18"
  - left: "3 rows of 7"
    right: "21"
  - left: "4 rows of 8"
    right: "32"
  - left: "6 rows of 6"
    right: "36"
explanation: "Multiply or skip count by the number in each row."
hint: "Use rows as equal groups."
questionGoal: "Find totals from array descriptions."
misconception: "Adding rows and columns."
```

```question
key: u02_l05_q04_turn_array
type: multiple-choice
prompt: "A 3 x 8 array is turned sideways. Which equation has the same total?"
choices:
  - "8 x 3 = 24"
  - "8 + 3 = 11"
  - "3 x 3 = 9"
  - "8 x 8 = 64"
correctAnswer: "8 x 3 = 24"
explanation: "Turning the array changes rows and columns, but the total stays 24."
hint: "The same dots are still there."
questionGoal: "Prepare for commutativity through array rotation."
misconception: "Thinking row/column order changes the total."
```

```question
key: u02_l05_q05_array_product
type: text-input
prompt: "Type the total in an array with 7 rows and 4 dots in each row."
acceptedAnswers:
  - "28"
answerType: number
explanation: "7 x 4 = 28."
hint: "Count by 4s seven times."
questionGoal: "Compute a product from row structure."
misconception: "Counting rows only or adding 7 + 4."
```

```question
key: u02_l05_q06_explain_array_equation
type: constructed-response
prompt: "Explain why a 2-row, 9-column array matches 2 x 9."
minWords: 8
sampleAnswer: "It has 2 rows, and each row has 9 dots, so it is 2 x 9."
checklist:
  - Mention 2 rows
  - Mention 9 in each row
explanation: "The equation names the row groups and the number in each row."
hint: "Describe the rows first."
questionGoal: "Explain how an array maps to factors."
misconception: "Writing the equation without interpreting the factors."
```

### Lesson 6: Match Stories, Arrays, And Equations

```question
key: u02_l06_q01_story_equation
type: multiple-choice
prompt: "There are 6 tables with 4 seats at each table. Which equation matches?"
choices:
  - "6 x 4 = 24"
  - "6 + 4 = 10"
  - "24 x 4 = 96"
  - "6 - 4 = 2"
correctAnswer: "6 x 4 = 24"
explanation: "There are 6 equal groups of 4 seats."
hint: "Find the number of groups and the size of each group."
questionGoal: "Match an equal-groups story to a multiplication equation."
misconception: "Adding the two numbers from the story."
```

```question
key: u02_l06_q02_array_story
type: multiple-choice
prompt: "Which story matches a 3 by 5 array?"
choices:
  - "3 rows with 5 chairs in each row"
  - "3 chairs and 5 more chairs"
  - "5 chairs taken from 3 rows"
  - "One row with 8 chairs"
correctAnswer: "3 rows with 5 chairs in each row"
explanation: "A 3 by 5 array has 3 equal rows of 5."
hint: "Look for rows and the same number in each row."
questionGoal: "Match an array to a story context."
misconception: "Matching by the numbers 3 and 5 without equal-row meaning."
```

```question
key: u02_l06_q03_match_representations
type: match-pairs
prompt: "Match each story to the multiplication equation."
pairs:
  - left: "4 boxes with 6 markers each"
    right: "4 x 6 = 24"
  - left: "7 rows with 3 plants each"
    right: "7 x 3 = 21"
  - left: "5 teams with 5 players each"
    right: "5 x 5 = 25"
  - left: "2 shelves with 9 books each"
    right: "2 x 9 = 18"
explanation: "Each equation shows groups times number in each group."
hint: "Use \"groups of\" language for each story."
questionGoal: "Translate multiple contexts into equations."
misconception: "Choosing equations by totals alone."
```

```question
key: u02_l06_q04_equation_to_story
type: multiple-choice
prompt: "Which story matches 8 x 2 = 16?"
choices:
  - "8 bags with 2 apples in each bag"
  - "8 apples plus 2 apples"
  - "16 apples taken from 8 bags"
  - "2 apples split into 8 bags"
correctAnswer: "8 bags with 2 apples in each bag"
explanation: "8 x 2 can mean 8 equal groups of 2."
hint: "Look for 8 groups of 2."
questionGoal: "Translate from equation to context."
misconception: "Treating multiplication as ordinary addition."
```

```question
key: u02_l06_q05_total_from_context
type: text-input
prompt: "A theater has 4 rows with 9 seats in each row. Type the total number of seats."
acceptedAnswers:
  - "36"
answerType: number
explanation: "4 x 9 = 36 seats."
hint: "Use rows as equal groups."
questionGoal: "Solve a multiplication story with an array context."
misconception: "Adding rows and seats per row."
```

```question
key: u02_l06_q06_explain_match
type: constructed-response
prompt: "Explain why 5 x 6 matches 5 bags with 6 oranges in each bag."
minWords: 8
sampleAnswer: "There are 5 groups, and each group has 6 oranges."
checklist:
  - Mention 5 groups
  - Mention 6 in each group
explanation: "The equation matches because it shows 5 equal groups of 6."
hint: "Use the words \"groups\" and \"each.\""
questionGoal: "Explain representation matching between story and equation."
misconception: "Matching by answer only without factor meaning."
```

### Lesson 7: Explain The Factors

```question
key: u02_l07_q01_factor_meaning
type: multiple-choice
prompt: "In 7 x 4 for 7 boxes with 4 crayons each, what does the 7 mean?"
choices:
  - "The number of boxes"
  - "The number of crayons in each box"
  - "The total number of crayons"
  - "The number of colors"
correctAnswer: "The number of boxes"
explanation: "The first factor names the 7 equal groups in this story."
hint: "Look at the number before \"boxes.\""
questionGoal: "Interpret a factor as number of groups."
misconception: "Confusing a factor with the product."
```

```question
key: u02_l07_q02_second_factor
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "In 3 x 8 for 3 rows of 8, the 8 means"
sentenceAfter: "."
choices:
  - "8 in each row"
  - "8 rows"
  - "8 total"
  - "8 fewer"
correctAnswer: "8 in each row"
explanation: "The 8 tells how many are in each of the 3 rows."
hint: "Read \"3 rows of 8.\""
questionGoal: "Interpret a factor as group size."
misconception: "Confusing group count and group size."
```

```question
key: u02_l07_q03_match_factor_role
type: match-pairs
prompt: "Match each part of the story to its role in 4 x 9 = 36."
pairs:
  - left: "4 shelves"
    right: "number of groups"
  - left: "9 books on each shelf"
    right: "size of each group"
  - left: "36 books total"
    right: "product"
  - left: "4 x 9"
    right: "multiplication expression"
explanation: "Factors describe the groups; the product is the total."
hint: "Ask what each number counts."
questionGoal: "Distinguish factors, product, group count, and group size."
misconception: "Treating all numbers in an equation as the same kind of quantity."
```

```question
key: u02_l07_q04_product_or_factor
type: multiple-choice
prompt: "Which number is the product in 6 x 5 = 30?"
choices:
  - "6"
  - "5"
  - "30"
  - "11"
correctAnswer: "30"
explanation: "The product is the answer to a multiplication equation."
hint: "The product is the total."
questionGoal: "Identify the product in a multiplication equation."
misconception: "Calling either factor the product."
```

```question
key: u02_l07_q05_write_product
type: text-input
prompt: "A story has 9 groups of 3. Type the product."
acceptedAnswers:
  - "27"
answerType: number
explanation: "9 groups of 3 make 27."
hint: "Count by 3s nine times."
questionGoal: "Use factor meanings to calculate a product."
misconception: "Adding 9 + 3."
```

```question
key: u02_l07_q06_explain_both_factors
type: constructed-response
prompt: "In 4 x 6 = 24 for 4 packs of 6 pencils, explain both factors."
minWords: 10
sampleAnswer: "The 4 means 4 packs, and the 6 means 6 pencils in each pack."
checklist:
  - Explain 4
  - Explain 6
explanation: "Each factor has a meaning in the context."
hint: "Use the story words \"packs\" and \"pencils.\""
questionGoal: "Explain both factor roles in context."
misconception: "Describing only the product or answer."
```

### Lesson 8: Multiplication In New Contexts

```question
key: u02_l08_q01_new_context
type: passage-question
prompt: "Read the story and choose the equation."
passageTitle: "Garden Trays"
passage: "Nora plants 6 trays. Each tray has 8 seedlings."
question: "Which equation finds the total seedlings?"
choices:
  - "6 x 8 = 48"
  - "6 + 8 = 14"
  - "8 - 6 = 2"
  - "48 x 8 = 384"
correctAnswer: "6 x 8 = 48"
explanation: "There are 6 equal groups of 8 seedlings."
hint: "\"Each tray\" tells the group size."
questionGoal: "Apply multiplication to a garden context."
misconception: "Adding the two numbers instead of multiplying equal groups."
```

```question
key: u02_l08_q02_not_multiply_context
type: multiple-choice
prompt: "Which story should not be solved with one multiplication fact?"
choices:
  - "3 jars have 5, 6, and 7 marbles."
  - "3 jars have 5 marbles each."
  - "5 rows have 3 chairs each."
  - "7 bags have 2 apples each."
correctAnswer: "3 jars have 5, 6, and 7 marbles."
explanation: "The jars do not have equal numbers of marbles."
hint: "Check whether each group has the same amount."
questionGoal: "Transfer equal-groups criteria to new contexts."
misconception: "Multiplying whenever a story has groups."
```

```question
key: u02_l08_q03_match_contexts
type: match-pairs
prompt: "Match each context to the equation."
pairs:
  - left: "8 packs with 4 cards each"
    right: "8 x 4 = 32"
  - left: "6 days with 5 pages each day"
    right: "6 x 5 = 30"
  - left: "3 rows with 9 tiles each"
    right: "3 x 9 = 27"
  - left: "7 teams with 6 players each"
    right: "7 x 6 = 42"
explanation: "Each context has equal groups."
hint: "Find groups and how many are in each group."
questionGoal: "Match varied contexts to multiplication equations."
misconception: "Matching by one number rather than the whole relationship."
```

```question
key: u02_l08_q04_total_context
type: text-input
prompt: "A baker makes 5 trays with 9 muffins on each tray. Type the total muffins."
acceptedAnswers:
  - "45"
answerType: number
explanation: "5 x 9 = 45 muffins."
hint: "There are 5 equal groups of 9."
questionGoal: "Solve multiplication in an unfamiliar context."
misconception: "Adding group count and group size."
```

```question
key: u02_l08_q05_choose_model
type: multiple-choice
prompt: "A classroom has 4 rows with 6 desks in each row. Which model would fit best?"
choices:
  - "An array"
  - "A clock"
  - "A fraction strip"
  - "A place-value chart"
correctAnswer: "An array"
explanation: "Rows of desks can be shown as an array."
hint: "Rows and columns are array language."
questionGoal: "Choose a representation for a multiplication context."
misconception: "Choosing a model unrelated to the story structure."
```

```question
key: u02_l08_q06_explain_new_context
type: constructed-response
prompt: "Explain why 6 pages each day for 7 days can be multiplication."
minWords: 8
sampleAnswer: "It is 7 equal groups because each day has 6 pages."
checklist:
  - Mention equal groups
  - Mention 7 days and 6 pages each day
explanation: "The same number of pages is read each day, so the groups are equal."
hint: "Each day is one group."
questionGoal: "Explain multiplication transfer to a time-based context."
misconception: "Failing to identify equal groups outside arrays or objects."
```

## Unit 3: Division As Sharing, Grouping, And Unknown Factors

### Lesson 1: Sharing Into Equal Groups

```question
key: u03_l01_q01_sharing_model
type: multiple-choice
prompt: "12 counters are shared equally onto 3 plates. How many counters go on each plate?"
choices: ["3", "4", "9", "15"]
correctAnswer: "4"
explanation: "12 shared into 3 equal groups gives 4 in each group."
hint: "Put one counter on each plate until all 12 are used."
questionGoal: "Interpret division as finding group size."
misconception: "Giving the number of groups instead of the size of each group."
```

```question
key: u03_l01_q02_equal_share_equation
type: multiple-choice
prompt: "Which equation matches 20 apples shared equally among 5 baskets?"
choices: ["20 / 5 = 4", "20 x 5 = 100", "20 - 5 = 15", "5 / 20 = 4"]
correctAnswer: "20 / 5 = 4"
explanation: "The total 20 is divided into 5 equal groups."
hint: "Start with the total amount, then divide by the number of groups."
questionGoal: "Match a sharing story to a division equation."
misconception: "Reversing dividend and divisor."
```

```question
key: u03_l01_q03_share_or_not
type: multiple-choice
prompt: "Which picture description shows equal sharing?"
choices: ["3 bags with 6 marbles each", "3 bags with 6, 5, and 7 marbles", "1 bag with 18 marbles", "3 empty bags and 18 loose marbles"]
correctAnswer: "3 bags with 6 marbles each"
explanation: "Equal sharing means each group ends with the same amount."
hint: "Check the amount in each group."
questionGoal: "Recognize equal shares."
misconception: "Thinking any distribution into groups is equal sharing."
```

```question
key: u03_l01_q04_match_sharing
type: match-pairs
prompt: "Match each sharing situation to how many are in each group."
pairs:
  - left: "16 shared into 4 groups"
    right: "4 each"
  - left: "18 shared into 3 groups"
    right: "6 each"
  - left: "24 shared into 6 groups"
    right: "4 each in a different story"
  - left: "15 shared into 5 groups"
    right: "3 each"
explanation: "Sharing division finds the size of each equal group."
hint: "Think of passing out the total equally."
questionGoal: "Solve several equal-sharing cases."
misconception: "Confusing the divisor with the quotient."
```

```question
key: u03_l01_q05_type_share
type: text-input
prompt: "30 stickers are shared equally by 5 students. Type how many stickers each student gets."
acceptedAnswers: ["6"]
answerType: number
explanation: "30 divided by 5 is 6."
hint: "Ask, 5 groups of what number make 30?"
questionGoal: "Produce a quotient in a sharing context."
misconception: "Adding or subtracting the two numbers in the story."
```

```question
key: u03_l01_q06_explain_share
type: constructed-response
prompt: "Explain what the answer means in 28 crayons shared equally among 4 boxes."
minWords: 8
sampleAnswer: "The answer is 7, which means 7 crayons go in each box."
checklist: ["Name the quotient", "Say what one group gets"]
explanation: "In sharing division, the quotient tells the size of each group."
hint: "Use the words \"in each box.\""
questionGoal: "Interpret the quotient in a sharing division situation."
misconception: "Reporting a number without saying what it represents."
```

### Lesson 2: Making Equal Groups

```question
key: u03_l02_q01_grouping_model
type: multiple-choice
prompt: "18 pencils are packed 3 in each box. How many boxes are needed?"
choices: ["3", "6", "15", "21"]
correctAnswer: "6"
explanation: "18 divided into groups of 3 makes 6 groups."
hint: "Count groups of 3 until you reach 18."
questionGoal: "Interpret division as finding number of groups."
misconception: "Giving the group size instead of the number of groups."
```

```question
key: u03_l02_q02_grouping_equation
type: multiple-choice
prompt: "Which equation matches 24 cards put into stacks of 6?"
choices: ["24 / 6 = 4", "24 / 4 = 6", "24 + 6 = 30", "6 x 24 = 144"]
correctAnswer: "24 / 6 = 4"
explanation: "The total is 24, each group has 6, so there are 4 groups."
hint: "The divisor is the size of each stack."
questionGoal: "Match a grouping story to a division equation."
misconception: "Swapping group size and number of groups."
```

```question
key: u03_l02_q03_make_groups
type: fill-blank
prompt: "Complete the grouping sentence."
sentenceBefore: "20 cubes in groups of 5 makes"
sentenceAfter: "groups."
choices: ["4", "5", "15", "25"]
correctAnswer: "4"
explanation: "5, 10, 15, 20 is 4 groups of 5."
hint: "Skip count by 5 to 20."
questionGoal: "Find number of groups from a total and group size."
misconception: "Selecting the group size as the quotient."
```

```question
key: u03_l02_q04_match_grouping
type: match-pairs
prompt: "Match each grouping situation to the number of groups."
pairs:
  - left: "21 in groups of 7"
    right: "3 groups"
  - left: "32 in groups of 8"
    right: "4 groups"
  - left: "36 in groups of 6"
    right: "6 groups"
  - left: "27 in groups of 9"
    right: "3 groups in another fact"
explanation: "Grouping division counts how many equal groups can be made."
hint: "Use related multiplication facts."
questionGoal: "Solve grouping division cases."
misconception: "Treating the quotient as items per group."
```

```question
key: u03_l02_q05_type_groups
type: text-input
prompt: "42 beads are put into bracelets with 7 beads each. Type the number of bracelets."
acceptedAnswers: ["6"]
answerType: number
explanation: "42 divided by 7 is 6, so there are 6 bracelets."
hint: "Ask, how many groups of 7 make 42?"
questionGoal: "Produce a quotient in a grouping context."
misconception: "Adding total and group size."
```

```question
key: u03_l02_q06_explain_grouping
type: constructed-response
prompt: "Explain what 35 / 5 answers in this story: 35 books are packed 5 books per box."
minWords: 8
sampleAnswer: "It answers how many boxes are needed; 7 boxes are needed."
checklist: ["Say it finds number of boxes", "Include 7"]
explanation: "The group size is 5 books, so the quotient tells how many groups."
hint: "The story says 5 books per box."
questionGoal: "Interpret the quotient in a grouping situation."
misconception: "Saying the quotient is books in each box."
```

### Lesson 3: What Does The Quotient Mean?

```question
key: u03_l03_q01_quotient_label_share
type: multiple-choice
prompt: "24 snacks are shared equally among 6 kids. The quotient is 4. What does 4 mean?"
choices: ["4 snacks for each kid", "4 kids", "4 snacks total", "4 groups of 24"]
correctAnswer: "4 snacks for each kid"
explanation: "In this sharing problem, the quotient tells how many each kid gets."
hint: "The number of kids is already known."
questionGoal: "Interpret quotient as group size."
misconception: "Labeling the quotient as number of groups."
```

```question
key: u03_l03_q02_quotient_label_grouping
type: multiple-choice
prompt: "24 snacks are packed 6 snacks per bag. The quotient is 4. What does 4 mean?"
choices: ["4 bags", "4 snacks per bag", "4 snacks total", "4 people"]
correctAnswer: "4 bags"
explanation: "In this grouping problem, the quotient tells how many bags can be made."
hint: "The size of each bag is already known."
questionGoal: "Interpret quotient as number of groups."
misconception: "Assuming every quotient means items in each group."
```

```question
key: u03_l03_q03_match_quotient_meaning
type: match-pairs
prompt: "Match each story to what the quotient tells."
pairs:
  - left: "18 shared among 3 tables"
    right: "items at each table"
  - left: "18 packed 3 per box"
    right: "number of boxes"
  - left: "30 divided among 5 teams"
    right: "players on each team"
  - left: "30 arranged 5 per row"
    right: "number of rows"
explanation: "The question in the story tells what the quotient means."
hint: "Decide which part is unknown: group size or number of groups."
questionGoal: "Distinguish quotient meanings across sharing and grouping."
misconception: "Treating all division answers as the same kind of quantity."
```

```question
key: u03_l03_q04_label_answer
type: fill-blank
prompt: "Complete the answer label."
sentenceBefore: "40 flowers are put 8 in each vase. 40 / 8 = 5, so the answer is 5"
sentenceAfter: "."
choices: ["vases", "flowers in each vase", "flowers total", "groups of 40"]
correctAnswer: "vases"
explanation: "Since each vase gets 8 flowers, the quotient is the number of vases."
hint: "The group size is 8 flowers per vase."
questionGoal: "Choose the correct unit label for a quotient."
misconception: "Using the divisor's label for the quotient."
```

```question
key: u03_l03_q05_type_with_context
type: text-input
prompt: "36 markers are shared equally among 4 boxes. Type how many markers go in each box."
acceptedAnswers: ["9"]
answerType: number
explanation: "36 / 4 = 9, and the 9 means markers in each box."
hint: "Ask, 4 groups of what number make 36?"
questionGoal: "Solve and interpret a sharing quotient."
misconception: "Solving without tracking the quotient's meaning."
```

```question
key: u03_l03_q06_explain_quotient
type: constructed-response
prompt: "In 32 / 4 = 8, explain why the 8 could mean groups in one story and items in each group in another."
minWords: 12
sampleAnswer: "If 4 is the group size, 8 means groups. If 4 is the number of groups, 8 means items in each group."
checklist: ["Mention group size", "Mention number of groups"]
explanation: "The story decides what the quotient represents."
hint: "Compare sharing with grouping."
questionGoal: "Explain context-dependent quotient meaning."
misconception: "Believing the equation alone gives the answer label."
```

### Lesson 4: Arrays With A Missing Side

```question
key: u03_l04_q01_missing_columns
type: multiple-choice
prompt: "An array has 24 dots and 4 rows. How many columns are in each row?"
choices: ["4", "6", "20", "28"]
correctAnswer: "6"
explanation: "4 rows of 6 dots make 24."
hint: "Ask, 4 times what equals 24?"
questionGoal: "Use an array to find a missing dimension."
misconception: "Using the known row count as the missing side."
```

```question
key: u03_l04_q02_missing_rows
type: fill-blank
prompt: "Complete the equation for an array with 35 dots and 5 columns."
sentenceBefore: "__ x 5 = 35, so there are"
sentenceAfter: "rows."
choices: ["5", "7", "30", "40"]
correctAnswer: "7"
explanation: "7 x 5 = 35, so the missing number of rows is 7."
hint: "Use the related multiplication fact."
questionGoal: "Connect missing array side to unknown factor."
misconception: "Treating the product as a side length."
```

```question
key: u03_l04_q03_match_arrays
type: match-pairs
prompt: "Match each array fact to the missing side."
pairs:
  - left: "3 x __ = 21"
    right: "7"
  - left: "__ x 8 = 32"
    right: "4"
  - left: "6 x __ = 30"
    right: "5"
  - left: "__ x 9 = 54"
    right: "6"
explanation: "Each missing side is the factor that makes the product."
hint: "Say the related multiplication fact aloud."
questionGoal: "Solve missing-factor array equations."
misconception: "Adding or subtracting factors instead of using multiplication."
```

```question
key: u03_l04_q04_related_division
type: multiple-choice
prompt: "Which division equation matches __ x 7 = 42?"
choices: ["42 / 7 = 6", "42 / 6 = 7", "7 / 42 = 6", "42 + 7 = 49"]
correctAnswer: "42 / 7 = 6"
explanation: "If 6 x 7 = 42, then 42 divided by 7 is 6."
hint: "The missing factor is the quotient."
questionGoal: "Relate missing-factor multiplication to division."
misconception: "Reversing the division equation."
```

```question
key: u03_l04_q05_type_missing_side
type: text-input
prompt: "An array has 48 dots and 6 rows. Type the number of columns."
acceptedAnswers: ["8"]
answerType: number
explanation: "6 x 8 = 48."
hint: "Ask, 6 times what is 48?"
questionGoal: "Produce a missing array dimension."
misconception: "Counting by the wrong factor."
```

```question
key: u03_l04_q06_explain_array_division
type: constructed-response
prompt: "Explain how an array can help solve 36 / 4."
minWords: 8
sampleAnswer: "Make 4 rows with 36 dots total. There are 9 dots in each row."
checklist: ["Mention 4 rows or groups", "Include 9"]
explanation: "A division problem can be seen as an array with one missing side."
hint: "Think of 4 times what equals 36."
questionGoal: "Explain division using a missing-side array model."
misconception: "Seeing division as disconnected from arrays."
```

### Lesson 5: Division As An Unknown Factor

```question
key: u03_l05_q01_unknown_factor
type: fill-blank
prompt: "Complete the related fact for 32 / 4."
sentenceBefore: "4 x"
sentenceAfter: "= 32"
choices: ["4", "6", "8", "28"]
correctAnswer: "8"
explanation: "4 x 8 = 32, so 32 / 4 = 8."
hint: "Ask what factor with 4 makes 32."
questionGoal: "Use unknown-factor reasoning for division."
misconception: "Guessing quotient without connecting to multiplication."
```

```question
key: u03_l05_q02_choose_related
type: multiple-choice
prompt: "Which multiplication fact helps solve 45 / 9?"
choices: ["9 x 5 = 45", "45 x 9 = 405", "9 + 5 = 14", "45 - 9 = 36"]
correctAnswer: "9 x 5 = 45"
explanation: "45 divided by 9 asks, 9 times what equals 45?"
hint: "Look for a fact with product 45 and factor 9."
questionGoal: "Select a related multiplication fact for division."
misconception: "Choosing an operation that uses the same numbers but wrong relationship."
```

```question
key: u03_l05_q03_match_related_facts
type: match-pairs
prompt: "Match each division fact to a related multiplication fact."
pairs:
  - left: "28 / 7"
    right: "7 x 4 = 28"
  - left: "54 / 6"
    right: "6 x 9 = 54"
  - left: "40 / 8"
    right: "8 x 5 = 40"
  - left: "63 / 9"
    right: "9 x 7 = 63"
explanation: "A division fact can be solved by finding the missing factor."
hint: "The product in the multiplication fact is the dividend."
questionGoal: "Match division to related multiplication."
misconception: "Treating division facts as isolated memorization."
```

```question
key: u03_l05_q04_type_quotient
type: text-input
prompt: "Type the quotient: 56 / 8"
acceptedAnswers: ["7"]
answerType: number
explanation: "8 x 7 = 56."
hint: "Ask, 8 times what equals 56?"
questionGoal: "Solve a division fact by unknown factor."
misconception: "Dividing by repeated subtraction without tracking groups."
```

```question
key: u03_l05_q05_error_related
type: error-correction
prompt: "Correct the related fact."
sentence: "To solve 36 / 6, use 6 x 5 = 36."
acceptedAnswers:
  - "To solve 36 / 6, use 6 x 6 = 36."
  - "6 x 6 = 36"
explanation: "6 x 6 = 36, so 36 / 6 = 6."
hint: "Check whether 6 x 5 really equals 36."
questionGoal: "Correct an incorrect related multiplication fact."
misconception: "Accepting a nearby fact as exact."
```

```question
key: u03_l05_q06_explain_unknown_factor
type: constructed-response
prompt: "Explain how to solve 48 / 6 using multiplication."
minWords: 8
sampleAnswer: "Ask 6 times what equals 48. Since 6 x 8 = 48, the answer is 8."
checklist: ["Write or say the related multiplication fact", "Include the quotient"]
explanation: "Division can be solved as a missing-factor problem."
hint: "Start with \"6 times what...\""
questionGoal: "Explain division through unknown-factor reasoning."
misconception: "Giving quotient without explaining the multiplicative relationship."
```

### Lesson 6: Fact Families For Multiplication And Division

```question
key: u03_l06_q01_fact_family_member
type: multiple-choice
prompt: "Which equation belongs to the fact family for 5, 8, and 40?"
choices: ["5 x 8 = 40", "5 + 8 = 13", "40 x 8 = 320", "8 - 5 = 3"]
correctAnswer: "5 x 8 = 40"
explanation: "A multiplication/division fact family uses the two factors and their product."
hint: "Look for an equation using 5, 8, and 40 in a multiplication or division relationship."
questionGoal: "Identify a valid fact-family equation."
misconception: "Including any equation with the same numbers."
```

```question
key: u03_l06_q02_complete_family
type: multi-blank-cloze
prompt: "Complete the fact family for 6, 7, and 42."
parts: ["6 x 7 = ", "; 42 / 6 = ", "; 42 / 7 = ", "."]
blanks:
  - correctAnswer: "42"
    acceptedAnswers: ["42"]
  - correctAnswer: "7"
    acceptedAnswers: ["7"]
  - correctAnswer: "6"
    acceptedAnswers: ["6"]
explanation: "6 and 7 are factors of 42, so the related division facts undo the multiplication."
hint: "Use the same three numbers in every fact."
questionGoal: "Complete multiplication/division fact-family equations."
misconception: "Changing one of the three numbers in the family."
```

```question
key: u03_l06_q03_match_fact_family
type: match-pairs
prompt: "Match each number set to a fact in its family."
pairs:
  - left: "4, 9, 36"
    right: "36 / 9 = 4"
  - left: "3, 8, 24"
    right: "3 x 8 = 24"
  - left: "7, 5, 35"
    right: "35 / 5 = 7"
  - left: "6, 4, 24"
    right: "4 x 6 = 24"
explanation: "Each right-side equation uses the two factors and product from the set."
hint: "Check that all three numbers match the set."
questionGoal: "Connect number triples to related equations."
misconception: "Matching by one shared number only."
```

```question
key: u03_l06_q04_invalid_family
type: multiple-choice
prompt: "Which equation does not belong with 3, 9, and 27?"
choices: ["3 x 9 = 27", "27 / 3 = 9", "27 / 9 = 3", "9 / 3 = 27"]
correctAnswer: "9 / 3 = 27"
explanation: "9 divided by 3 is 3, not 27."
hint: "Check the value of each equation."
questionGoal: "Identify an invalid division equation in a fact family."
misconception: "Assuming any order of the three numbers is valid."
```

```question
key: u03_l06_q05_type_missing_fact
type: text-input
prompt: "In the fact family for 8, 6, and 48, type the quotient for 48 / 8."
acceptedAnswers: ["6"]
answerType: number
explanation: "8 x 6 = 48, so 48 / 8 = 6."
hint: "Use the related multiplication fact."
questionGoal: "Produce a quotient from a fact family."
misconception: "Confusing which factor is the quotient."
```

```question
key: u03_l06_q06_explain_family
type: constructed-response
prompt: "Explain why 4 x 7 = 28 and 28 / 7 = 4 are related."
minWords: 8
sampleAnswer: "They use the same factors and product. Division undoes the multiplication."
checklist: ["Mention same numbers", "Mention division undoes multiplication"]
explanation: "Fact families show inverse relationships between multiplication and division."
hint: "Use the words \"factors\" and \"product.\""
questionGoal: "Explain the inverse relationship in a fact family."
misconception: "Seeing multiplication and division as unrelated facts."
```

### Lesson 7: Choose Sharing Or Grouping

```question
key: u03_l07_q01_choose_sharing
type: multiple-choice
prompt: "Which problem asks \"how many in each group?\""
choices: ["24 stickers shared equally among 6 friends", "24 stickers packed 6 per page", "6 stickers plus 24 stickers", "24 stickers in 6 unequal piles"]
correctAnswer: "24 stickers shared equally among 6 friends"
explanation: "The number of friends is known, so the unknown is how many each friend gets."
hint: "Look for sharing among a known number of groups."
questionGoal: "Identify a sharing division context."
misconception: "Treating all division contexts as grouping."
```

```question
key: u03_l07_q02_choose_grouping
type: multiple-choice
prompt: "Which problem asks \"how many groups?\""
choices: ["30 cards put 5 cards in each pack", "30 cards shared among 5 friends", "30 cards plus 5 cards", "5 cards taken from 30 once"]
correctAnswer: "30 cards put 5 cards in each pack"
explanation: "The size of each group is known, so the unknown is the number of groups."
hint: "Look for \"in each pack\" or \"per group.\""
questionGoal: "Identify a grouping division context."
misconception: "Treating all division contexts as sharing."
```

```question
key: u03_l07_q03_match_division_type
type: match-pairs
prompt: "Match each story to the division type."
pairs:
  - left: "18 shared among 3 kids"
    right: "sharing"
  - left: "18 packed 3 per bag"
    right: "grouping"
  - left: "40 divided onto 5 plates"
    right: "sharing with plates"
  - left: "40 arranged 5 per row"
    right: "grouping into rows"
explanation: "Sharing finds group size; grouping finds the number of groups."
hint: "Decide which quantity is missing."
questionGoal: "Classify division contexts by meaning."
misconception: "Using the same interpretation for every division story."
```

```question
key: u03_l07_q04_label_quotient
type: fill-blank
prompt: "Complete the label."
sentenceBefore: "36 pencils packed 6 per box gives 6"
sentenceAfter: "."
choices: ["boxes", "pencils per box", "pencils total", "groups per pencil"]
correctAnswer: "boxes"
explanation: "The problem asks how many boxes can be made."
hint: "The group size is 6 pencils per box."
questionGoal: "Label a quotient in a grouping problem."
misconception: "Labeling the quotient with the divisor's meaning."
```

```question
key: u03_l07_q05_solve_mixed_division
type: text-input
prompt: "45 beads are shared equally among 9 students. Type how many beads each student gets."
acceptedAnswers: ["5"]
answerType: number
explanation: "45 / 9 = 5, and the 5 means beads for each student."
hint: "Ask, 9 groups of what number make 45?"
questionGoal: "Solve a sharing problem after choosing the interpretation."
misconception: "Finding number of groups when group count is already known."
```

```question
key: u03_l07_q06_explain_choice
type: constructed-response
prompt: "For 32 photos placed 8 on each page, explain whether this is sharing or grouping."
minWords: 8
sampleAnswer: "It is grouping because each page has 8 photos, and we need the number of pages."
checklist: ["Say grouping", "Explain that 8 is the group size"]
explanation: "The group size is known, so division finds the number of groups."
hint: "Ask what is unknown: photos per page or number of pages."
questionGoal: "Explain why a division context is grouping."
misconception: "Classifying by the division symbol instead of the story meaning."
```

## Unit 4: Multiplication And Division Strategies

### Lesson 1: Anchor Facts: Twos, Fives, And Tens

```question
key: u04_l01_q01_twos_fact
type: multiple-choice
prompt: "Which fact helps solve 2 x 9?"
choices: ["Double 9", "Add 2 + 9 only", "Count by 10s", "Subtract 2 from 9"]
correctAnswer: "Double 9"
explanation: "Multiplying by 2 means doubling the other factor, so 2 x 9 = 18."
hint: "A 2s fact makes two equal groups."
questionGoal: "Connect 2s facts to doubles."
misconception: "Adding the two factors."
```

```question
key: u04_l01_q02_fives_pattern
type: fill-blank
prompt: "Complete the 5s fact."
sentenceBefore: "5 x 7 ="
sentenceAfter: "."
choices: ["12", "25", "35", "57"]
correctAnswer: "35"
explanation: "Count by 5s seven times: 5, 10, 15, 20, 25, 30, 35."
hint: "Use the 5s skip-count pattern."
questionGoal: "Retrieve or derive a 5s multiplication fact."
misconception: "Concatenating digits or adding factors."
```

```question
key: u04_l01_q03_match_anchor
type: match-pairs
prompt: "Match each anchor fact to its product."
pairs:
  - left: "2 x 8"
    right: "16"
  - left: "5 x 6"
    right: "30"
  - left: "10 x 7"
    right: "70"
  - left: "5 x 9"
    right: "45"
explanation: "Anchor facts use familiar doubles, fives, and tens patterns."
hint: "Skip count by 2, 5, or 10."
questionGoal: "Practice anchor fact products."
misconception: "Mixing up anchor family patterns."
```

```question
key: u04_l01_q04_related_division_anchor
type: multiple-choice
prompt: "Which fact helps solve 50 / 10?"
choices: ["10 x 5 = 50", "10 + 5 = 15", "50 x 10 = 500", "50 - 10 = 40"]
correctAnswer: "10 x 5 = 50"
explanation: "50 divided by 10 asks, 10 times what equals 50?"
hint: "Use a related multiplication fact."
questionGoal: "Use anchor multiplication facts for division."
misconception: "Treating division anchor facts as unrelated to multiplication."
```

```question
key: u04_l01_q05_type_anchor
type: text-input
prompt: "Type the quotient: 40 / 5"
acceptedAnswers: ["8"]
answerType: number
explanation: "5 x 8 = 40."
hint: "Count by 5s until you reach 40."
questionGoal: "Retrieve a division fact from the 5s anchor family."
misconception: "Counting by the wrong factor."
```

```question
key: u04_l01_q06_explain_tens
type: constructed-response
prompt: "Explain why 10 x 6 is easy to know."
minWords: 6
sampleAnswer: "Ten groups of 6 is 60, or 6 tens is 60."
checklist: ["Include 60", "Mention tens or groups"]
explanation: "Tens facts connect to place value and skip counting by 10."
hint: "Think about 6 tens."
questionGoal: "Explain an anchor tens fact using structure."
misconception: "Seeing tens facts as memorized strings only."
```

### Lesson 2: Doubles And Near Doubles

```question
key: u04_l02_q01_double_fact
type: multiple-choice
prompt: "Which fact is a double that helps with 3 x 7?"
choices: ["2 x 7", "3 + 7", "7 x 7", "10 x 3"]
correctAnswer: "2 x 7"
explanation: "3 x 7 can be 2 x 7 plus one more 7."
hint: "A near double uses a nearby 2s fact."
questionGoal: "Choose a double fact to derive a nearby fact."
misconception: "Choosing unrelated larger facts."
```

```question
key: u04_l02_q02_near_double_blank
type: multi-blank-cloze
prompt: "Complete the near-double strategy for 3 x 8."
parts: ["2 x 8 = ", ", then add ", ", so 3 x 8 = ", "."]
blanks:
  - correctAnswer: "16"
    acceptedAnswers: ["16"]
  - correctAnswer: "8"
    acceptedAnswers: ["8"]
  - correctAnswer: "24"
    acceptedAnswers: ["24"]
explanation: "3 groups of 8 is 2 groups of 8 plus one more group of 8."
hint: "Start with the double, then add one more group."
questionGoal: "Apply near-double decomposition."
misconception: "Adding one instead of one whole group."
```

```question
key: u04_l02_q03_match_near_doubles
type: match-pairs
prompt: "Match each fact to a helpful near-double."
pairs:
  - left: "3 x 6"
    right: "2 x 6 + 6"
  - left: "4 x 7"
    right: "2 x 7 + 2 x 7"
  - left: "3 x 9"
    right: "2 x 9 + 9"
  - left: "6 x 4"
    right: "3 x 4 + 3 x 4"
explanation: "Doubles and near doubles break facts into known equal groups."
hint: "Split the number of groups into easier parts."
questionGoal: "Match facts to double-based strategies."
misconception: "Splitting without preserving all groups."
```

```question
key: u04_l02_q04_type_near_double
type: text-input
prompt: "Use a near double to solve 3 x 6. Type the product."
acceptedAnswers: ["18"]
answerType: number
explanation: "2 x 6 = 12, and one more 6 makes 18."
hint: "Double 6, then add another 6."
questionGoal: "Compute a product with near-double reasoning."
misconception: "Doubling and stopping too soon."
```

```question
key: u04_l02_q05_error_near_double
type: error-correction
prompt: "Correct the strategy."
sentence: "3 x 5 = 2 x 5 + 1, so 3 x 5 = 11."
acceptedAnswers:
  - "3 x 5 = 2 x 5 + 5, so 3 x 5 = 15."
  - "3 x 5 = 15"
explanation: "One more group of 5 is 5, not 1."
hint: "Add one more group, not one more object."
questionGoal: "Correct a common near-double error."
misconception: "Adding 1 instead of adding one group."
```

```question
key: u04_l02_q06_explain_double
type: constructed-response
prompt: "Explain how doubles help solve 4 x 6."
minWords: 8
sampleAnswer: "I can double 6 to get 12, then double 12 to get 24."
checklist: ["Use double", "Include 24"]
explanation: "4 groups can be thought of as double a double."
hint: "Think of 4 groups as 2 groups plus 2 groups."
questionGoal: "Explain a double-based multiplication strategy."
misconception: "Treating doubles as unrelated to multiplication groups."
```

### Lesson 3: Turnaround Facts In Multiplication

```question
key: u04_l03_q01_turnaround
type: multiple-choice
prompt: "Which fact has the same product as 4 x 9?"
choices: ["9 x 4", "9 / 4", "4 + 9", "9 - 4"]
correctAnswer: "9 x 4"
explanation: "Multiplication is commutative, so 4 x 9 and 9 x 4 have the same product."
hint: "Turn the factors around but keep multiplication."
questionGoal: "Recognize a multiplication turnaround fact."
misconception: "Applying turnaround reasoning to any operation."
```

```question
key: u04_l03_q02_not_division_turnaround
type: multiple-choice
prompt: "Which statement is true?"
choices: ["6 x 8 = 8 x 6", "48 / 6 = 6 / 48", "6 - 8 = 8 - 6", "6 + 8 = 6 x 8"]
correctAnswer: "6 x 8 = 8 x 6"
explanation: "Turnaround facts work for multiplication, not division or subtraction."
hint: "Look for multiplication with the same two factors."
questionGoal: "Limit commutativity to multiplication in this context."
misconception: "Assuming division is commutative."
```

```question
key: u04_l03_q03_match_turnaround
type: match-pairs
prompt: "Match each fact to its turnaround fact."
pairs:
  - left: "3 x 7"
    right: "7 x 3"
  - left: "6 x 5"
    right: "5 x 6"
  - left: "2 x 9"
    right: "9 x 2"
  - left: "8 x 4"
    right: "4 x 8"
explanation: "Turnaround facts use the same factors in the other order."
hint: "Keep the same two factors."
questionGoal: "Pair multiplication facts by commutativity."
misconception: "Changing one factor while turning the fact around."
```

```question
key: u04_l03_q04_type_product_turnaround
type: text-input
prompt: "If 7 x 8 = 56, type the product of 8 x 7."
acceptedAnswers: ["56"]
answerType: number
explanation: "8 x 7 has the same product as 7 x 8."
hint: "Turnaround multiplication facts have equal products."
questionGoal: "Use a known fact to solve its turnaround."
misconception: "Recalculating incorrectly or thinking order changes product."
```

```question
key: u04_l03_q05_context_difference
type: multiple-choice
prompt: "Which sentence is true about 3 boxes of 5 and 5 boxes of 3?"
choices: ["They have the same total, but the stories describe different groups.", "They must be the exact same story.", "They have different totals.", "Neither can be multiplication."]
correctAnswer: "They have the same total, but the stories describe different groups."
explanation: "Both products are 15, but the group count and group size are described differently."
hint: "Compare the total and the story meaning separately."
questionGoal: "Distinguish commutative products from contextual meaning."
misconception: "Thinking turnaround facts make contexts identical."
```

```question
key: u04_l03_q06_explain_turnaround
type: constructed-response
prompt: "Explain why 5 x 6 and 6 x 5 have the same product."
minWords: 8
sampleAnswer: "They use the same factors. An array can be turned and still has 30 dots."
checklist: ["Mention same factors or array", "Include product 30"]
explanation: "Turning an array changes rows and columns, but not the total."
hint: "Picture an array being turned sideways."
questionGoal: "Explain multiplication commutativity with a model."
misconception: "Memorizing a rule without understanding why it works."
```

### Lesson 4: Break Apart A Factor

```question
key: u04_l04_q01_valid_break_apart
type: multiple-choice
prompt: "Which break-apart strategy works for 7 x 6?"
choices: ["5 x 6 + 2 x 6", "7 x 5 + 2", "7 + 6", "5 x 2 x 6"]
correctAnswer: "5 x 6 + 2 x 6"
explanation: "Breaking 7 into 5 + 2 keeps all 7 groups of 6."
hint: "Split one factor, then multiply each part by the other factor."
questionGoal: "Identify a valid distributive decomposition."
misconception: "Splitting without preserving both partial products."
```

```question
key: u04_l04_q02_partial_products
type: multi-blank-cloze
prompt: "Complete the break-apart strategy for 8 x 4."
parts: ["8 x 4 = (5 x 4) + (3 x 4) = ", " + ", " = ", "."]
blanks:
  - correctAnswer: "20"
    acceptedAnswers: ["20"]
  - correctAnswer: "12"
    acceptedAnswers: ["12"]
  - correctAnswer: "32"
    acceptedAnswers: ["32"]
explanation: "5 groups of 4 and 3 groups of 4 make 8 groups of 4."
hint: "Find each smaller product first."
questionGoal: "Compute using partial products."
misconception: "Adding factors instead of products."
```

```question
key: u04_l04_q03_match_decomp
type: match-pairs
prompt: "Match each fact to a useful break-apart expression."
pairs:
  - left: "6 x 7"
    right: "5 x 7 + 1 x 7"
  - left: "9 x 4"
    right: "10 x 4 - 1 x 4"
  - left: "8 x 6"
    right: "4 x 6 + 4 x 6"
  - left: "7 x 8"
    right: "5 x 8 + 2 x 8"
explanation: "Each expression keeps the same total groups."
hint: "Check that the split parts add back to the original factor."
questionGoal: "Match facts to valid decomposition strategies."
misconception: "Using unrelated known facts."
```

```question
key: u04_l04_q04_type_break_apart
type: text-input
prompt: "Use 5 x 7 + 3 x 7 to solve 8 x 7. Type the product."
acceptedAnswers: ["56"]
answerType: number
explanation: "5 x 7 = 35 and 3 x 7 = 21, so 35 + 21 = 56."
hint: "Add the two partial products."
questionGoal: "Produce a product from a decomposed factor."
misconception: "Stopping after one partial product."
```

```question
key: u04_l04_q05_error_decomp
type: error-correction
prompt: "Correct the strategy."
sentence: "6 x 8 = 5 x 8 + 1, so 6 x 8 = 41."
acceptedAnswers:
  - "6 x 8 = 5 x 8 + 1 x 8, so 6 x 8 = 48."
  - "6 x 8 = 48"
explanation: "The extra group is one group of 8, not 1."
hint: "When you split 6 into 5 and 1, the 1 still means 1 group of 8."
questionGoal: "Correct a distributive reasoning error."
misconception: "Adding the split number instead of its product."
```

```question
key: u04_l04_q06_explain_split_array
type: constructed-response
prompt: "Explain how splitting an array can help solve 9 x 6."
minWords: 10
sampleAnswer: "I can split 9 rows into 5 rows and 4 rows, then add 30 and 24 to get 54."
checklist: ["Split one factor", "Add partial products"]
explanation: "A split array shows the same total as smaller, easier products."
hint: "Try splitting 9 into 5 and 4."
questionGoal: "Explain distributive reasoning with an array."
misconception: "Treating break-apart as a symbol trick without model meaning."
```

### Lesson 5: Nines And Neighbor Facts

```question
key: u04_l05_q01_nine_from_ten
type: multiple-choice
prompt: "Which strategy helps solve 9 x 7?"
choices: ["10 x 7 minus 7", "10 x 7 plus 9", "9 + 7", "7 x 7 minus 1"]
correctAnswer: "10 x 7 minus 7"
explanation: "9 groups of 7 is one group of 7 less than 10 groups of 7."
hint: "Start with 10 groups, then remove one group."
questionGoal: "Derive a nines fact from a tens fact."
misconception: "Subtracting 1 instead of one group."
```

```question
key: u04_l05_q02_complete_nines
type: multi-blank-cloze
prompt: "Complete the strategy for 9 x 6."
parts: ["10 x 6 = ", ". Subtract one group of 6: ", " - 6 = ", "."]
blanks:
  - correctAnswer: "60"
    acceptedAnswers: ["60"]
  - correctAnswer: "60"
    acceptedAnswers: ["60"]
  - correctAnswer: "54"
    acceptedAnswers: ["54"]
explanation: "9 x 6 is 6 less than 10 x 6."
hint: "One group of 6 is removed."
questionGoal: "Carry out a nines-from-tens strategy."
misconception: "Subtracting 9 or 1 instead of the other factor."
```

```question
key: u04_l05_q03_neighbor_match
type: match-pairs
prompt: "Match each fact to a neighbor strategy."
pairs:
  - left: "9 x 8"
    right: "10 x 8 - 8"
  - left: "6 x 7"
    right: "5 x 7 + 7"
  - left: "8 x 4"
    right: "10 x 4 - 2 x 4"
  - left: "7 x 6"
    right: "6 x 6 + 6"
explanation: "Neighbor facts use a close known fact and adjust by whole groups."
hint: "Check what group is added or removed."
questionGoal: "Match products to neighbor-fact strategies."
misconception: "Adjusting by a single one instead of a group."
```

```question
key: u04_l05_q04_type_nines
type: text-input
prompt: "Use 10 x 4 minus 4 to solve 9 x 4. Type the product."
acceptedAnswers: ["36"]
answerType: number
explanation: "10 x 4 = 40, and 40 - 4 = 36."
hint: "Remove one group of 4 from 10 groups of 4."
questionGoal: "Compute a nines fact using a neighbor fact."
misconception: "Removing the wrong amount."
```

```question
key: u04_l05_q05_error_neighbor
type: error-correction
prompt: "Correct the strategy."
sentence: "9 x 5 = 10 x 5 - 1, so 9 x 5 = 49."
acceptedAnswers:
  - "9 x 5 = 10 x 5 - 5, so 9 x 5 = 45."
  - "9 x 5 = 45"
explanation: "Remove one group of 5, not 1."
hint: "The missing group has 5 in it."
questionGoal: "Correct a neighbor-fact adjustment error."
misconception: "Subtracting one instead of one group."
```

```question
key: u04_l05_q06_explain_neighbor
type: constructed-response
prompt: "Explain how to use a tens fact to find 9 x 8."
minWords: 8
sampleAnswer: "10 x 8 is 80. Subtract one group of 8 to get 72."
checklist: ["Start with 10 x 8", "Subtract 8"]
explanation: "9 groups of 8 is one group less than 10 groups of 8."
hint: "Think 10 groups, then take away one group."
questionGoal: "Explain a nines strategy."
misconception: "Memorizing nines patterns without group reasoning."
```

### Lesson 6: Division From Related Multiplication

```question
key: u04_l06_q01_related_fact_choice
type: multiple-choice
prompt: "Which fact helps solve 72 / 8?"
choices: ["8 x 9 = 72", "8 + 9 = 17", "72 x 8 = 576", "9 - 8 = 1"]
correctAnswer: "8 x 9 = 72"
explanation: "72 divided by 8 asks, 8 times what equals 72?"
hint: "Look for a multiplication fact with product 72."
questionGoal: "Select related multiplication for division."
misconception: "Choosing an expression with the same numbers but wrong operation."
```

```question
key: u04_l06_q02_fill_related_division
type: fill-blank
prompt: "Complete the related multiplication fact for 63 / 7."
sentenceBefore: "7 x"
sentenceAfter: "= 63"
choices: ["6", "7", "8", "9"]
correctAnswer: "9"
explanation: "7 x 9 = 63, so 63 / 7 = 9."
hint: "Count by 7s to 63."
questionGoal: "Solve division as unknown factor."
misconception: "Guessing a nearby quotient."
```

```question
key: u04_l06_q03_match_division_products
type: match-pairs
prompt: "Match each division fact to the quotient."
pairs:
  - left: "81 / 9"
    right: "9"
  - left: "64 / 8"
    right: "8"
  - left: "42 / 7"
    right: "6"
  - left: "35 / 5"
    right: "7"
explanation: "Each quotient is the missing factor in a related multiplication fact."
hint: "Ask what number times the divisor equals the dividend."
questionGoal: "Practice related multiplication for division facts."
misconception: "Treating quotient as divisor or dividend."
```

```question
key: u04_l06_q04_type_quotient
type: text-input
prompt: "Type the quotient: 56 / 7"
acceptedAnswers: ["8"]
answerType: number
explanation: "7 x 8 = 56."
hint: "Use the related multiplication fact."
questionGoal: "Produce a division fact quotient."
misconception: "Recalling an incorrect nearby fact."
```

```question
key: u04_l06_q05_error_division_fact
type: error-correction
prompt: "Correct the statement."
sentence: "48 / 6 = 7 because 6 x 7 = 48."
acceptedAnswers:
  - "48 / 6 = 8 because 6 x 8 = 48."
  - "48 / 6 = 8"
explanation: "6 x 7 = 42, but 6 x 8 = 48."
hint: "Check the multiplication fact."
questionGoal: "Correct an incorrect division fact using multiplication."
misconception: "Accepting a near fact as the exact fact."
```

```question
key: u04_l06_q06_explain_related
type: constructed-response
prompt: "Explain how multiplication helps solve 54 / 9."
minWords: 8
sampleAnswer: "Ask 9 times what equals 54. Since 9 x 6 = 54, the answer is 6."
checklist: ["Use related multiplication", "Include quotient 6"]
explanation: "Division can be solved by finding the missing factor."
hint: "Start with \"9 times what...\""
questionGoal: "Explain division through related multiplication."
misconception: "Treating division as a separate memorized list."
```

### Lesson 7: Choose The Most Useful Strategy

```question
key: u04_l07_q01_best_strategy
type: multiple-choice
prompt: "Which strategy is useful for 9 x 6?"
choices: ["10 x 6 minus 6", "6 + 9", "6 x 6 minus 1", "9 x 1 plus 6"]
correctAnswer: "10 x 6 minus 6"
explanation: "9 groups of 6 is one group of 6 less than 10 groups of 6."
hint: "Use a nearby tens fact."
questionGoal: "Choose an efficient strategy for a nines fact."
misconception: "Choosing an operation that uses the numbers but not the structure."
```

```question
key: u04_l07_q02_strategy_for_division
type: multiple-choice
prompt: "Which strategy fits 42 / 6?"
choices: ["Think 6 x ? = 42", "Add 42 + 6", "Double 42", "Subtract 6 once"]
correctAnswer: "Think 6 x ? = 42"
explanation: "Division facts can be solved with unknown-factor thinking."
hint: "Use related multiplication."
questionGoal: "Choose a division strategy."
misconception: "Using repeated subtraction once or unrelated operations."
```

```question
key: u04_l07_q03_match_fact_strategy
type: match-pairs
prompt: "Match each fact to a useful strategy."
pairs:
  - left: "5 x 8"
    right: "count by 5s or use half of 10 x 8"
  - left: "3 x 7"
    right: "2 x 7 plus one more 7"
  - left: "9 x 4"
    right: "10 x 4 minus 4"
  - left: "48 / 6"
    right: "6 x ? = 48"
explanation: "Strategy choice depends on the numbers in the fact."
hint: "Look for anchor facts, near doubles, nines, or related multiplication."
questionGoal: "Match facts to efficient strategies."
misconception: "Applying one strategy to every fact."
```

```question
key: u04_l07_q04_type_product_strategy
type: text-input
prompt: "Use any useful strategy. Type the product: 8 x 7"
acceptedAnswers: ["56"]
answerType: number
explanation: "One strategy is 4 x 7 + 4 x 7 = 28 + 28 = 56."
hint: "Try doubling 4 groups of 7."
questionGoal: "Solve a fact after choosing a strategy."
misconception: "Guessing without a strategy or using addition only."
```

```question
key: u04_l07_q05_strategy_reason
type: constructed-response
prompt: "Choose a strategy for 6 x 8 and explain the first step."
minWords: 8
sampleAnswer: "I can break 6 into 3 and 3. Then I find 3 x 8 twice."
checklist: ["Name a strategy", "Explain the first step"]
explanation: "A useful strategy should fit the numbers and preserve the same product."
hint: "You might use doubles or break apart 6."
questionGoal: "Justify a multiplication strategy choice."
misconception: "Naming a strategy without showing how it starts."
```

```question
key: u04_l07_q06_error_strategy_choice
type: error-correction
prompt: "Correct the reasoning."
sentence: "For 7 x 5, I use 7 + 5, so the answer is 12."
acceptedAnswers:
  - "For 7 x 5, count 7 groups of 5 or 5 groups of 7, so the answer is 35."
  - "7 x 5 = 35"
explanation: "Multiplication finds equal groups, not the sum of the factors."
hint: "Use groups of 5 or groups of 7."
questionGoal: "Correct additive reasoning for a multiplication fact."
misconception: "Adding factors instead of multiplying."
```

### Lesson 8: Mixed Fact Retrieval With Meaning

```question
key: u04_l08_q01_mixed_fact
type: text-input
prompt: "Type the product: 7 x 6"
acceptedAnswers: ["42"]
answerType: number
explanation: "7 x 6 = 42. One strategy is 5 x 6 + 2 x 6."
hint: "Break 7 into 5 and 2."
questionGoal: "Retrieve or derive a mixed multiplication fact."
misconception: "Confusing nearby products."
```

```question
key: u04_l08_q02_mixed_division
type: text-input
prompt: "Type the quotient: 72 / 9"
acceptedAnswers: ["8"]
answerType: number
explanation: "9 x 8 = 72."
hint: "Use the related multiplication fact."
questionGoal: "Retrieve or derive a mixed division fact."
misconception: "Treating division facts as unrelated to multiplication."
```

```question
key: u04_l08_q03_related_fact_mc
type: multiple-choice
prompt: "Which related fact supports 64 / 8 = 8?"
choices: ["8 x 8 = 64", "8 + 8 = 16", "64 - 8 = 56", "64 x 8 = 512"]
correctAnswer: "8 x 8 = 64"
explanation: "The related multiplication fact shows the quotient."
hint: "Division asks for a missing factor."
questionGoal: "Connect mixed division retrieval to multiplication."
misconception: "Selecting a fact with correct numbers but wrong relationship."
```

```question
key: u04_l08_q04_match_mixed
type: match-pairs
prompt: "Match each fact to its answer."
pairs:
  - left: "8 x 9"
    right: "72"
  - left: "63 / 7"
    right: "9"
  - left: "6 x 8"
    right: "48"
  - left: "56 / 8"
    right: "7"
explanation: "Mixed practice asks you to decide whether to multiply or divide."
hint: "For division, find the missing factor."
questionGoal: "Practice mixed fact retrieval across operations."
misconception: "Using one operation for every fact."
```

```question
key: u04_l08_q05_reasonable_fact
type: multiple-choice
prompt: "Which answer is reasonable for 9 x 7?"
choices: ["63", "16", "97", "72"]
correctAnswer: "63"
explanation: "9 x 7 is 10 x 7 minus 7, which is 70 - 7 = 63."
hint: "Use the 10s neighbor fact."
questionGoal: "Use strategy to choose a product from plausible distractors."
misconception: "Choosing a nearby nines or tens product."
```

```question
key: u04_l08_q06_explain_fact
type: constructed-response
prompt: "Pick one way to solve 48 / 6 and explain it."
minWords: 8
sampleAnswer: "I know 6 x 8 = 48, so 48 divided by 6 is 8."
checklist: ["Include the answer", "Use a strategy or related fact"]
explanation: "Mixed fact fluency includes being able to reason when a fact is not automatic."
hint: "Use a related multiplication fact."
questionGoal: "Explain a mixed division fact strategy."
misconception: "Giving answers without retained or explainable reasoning."
```

## Unit 5: Place Value, Rounding, And Whole-Number Operations

### Lesson 1: Nearest Ten On A Number Line

```question
key: u05_l01_q01_round_nearest_ten
type: multiple-choice
prompt: "Round 47 to the nearest ten."
choices: ["40", "50", "45", "60"]
correctAnswer: "50"
explanation: "47 is 3 away from 50 and 7 away from 40."
hint: "Compare the distance to 40 and 50."
questionGoal: "Round a two-digit number to the nearest ten."
misconception: "Choosing the lower ten automatically."
```

```question
key: u05_l01_q02_benchmark_tens
type: fill-blank
prompt: "Complete the benchmark sentence."
sentenceBefore: "83 is between"
sentenceAfter: "and 90."
choices: ["70", "80", "85", "100"]
correctAnswer: "80"
explanation: "83 is greater than 80 and less than 90."
hint: "Find the tens before 83."
questionGoal: "Identify neighboring tens for rounding."
misconception: "Choosing the midpoint instead of the lower benchmark."
```

```question
key: u05_l01_q03_match_round_tens
type: match-pairs
prompt: "Match each number to the nearest ten."
pairs:
  - left: "32"
    right: "30"
  - left: "58"
    right: "60"
  - left: "75"
    right: "80"
  - left: "91"
    right: "90"
explanation: "Round to the ten that is closest; halfway goes to the next ten."
hint: "Use a number line between the two tens."
questionGoal: "Practice nearest-ten rounding across cases."
misconception: "Rounding by the tens digit only."
```

```question
key: u05_l01_q04_type_round
type: text-input
prompt: "Type 126 rounded to the nearest ten."
acceptedAnswers: ["130"]
answerType: number
explanation: "126 is closer to 130 than to 120."
hint: "126 is 4 away from 130."
questionGoal: "Produce a nearest-ten rounded number."
misconception: "Rounding to 100 because it is a three-digit number."
```

```question
key: u05_l01_q05_round_error
type: error-correction
prompt: "Correct the sentence."
sentence: "64 rounds to 70 because it is greater than 60."
acceptedAnswers:
  - "64 rounds to 60 because it is closer to 60 than to 70."
  - "64 rounds to 60"
explanation: "64 is 4 away from 60 and 6 away from 70."
hint: "Compare both distances."
questionGoal: "Correct a rounding-by-direction error."
misconception: "Rounding up whenever a number is greater than the lower ten."
```

```question
key: u05_l01_q06_explain_round_ten
type: constructed-response
prompt: "Explain why 38 rounds to 40."
minWords: 8
sampleAnswer: "38 is closer to 40 than to 30 because it is only 2 away from 40."
checklist: ["Compare 30 and 40", "Mention closeness or distance"]
explanation: "Rounding uses the nearest benchmark."
hint: "Count how far 38 is from 30 and 40."
questionGoal: "Explain nearest-ten rounding with distance."
misconception: "Using a memorized digit rule without magnitude reasoning."
```

### Lesson 2: Nearest Hundred And Reasonableness

```question
key: u05_l02_q01_round_hundred
type: multiple-choice
prompt: "Round 362 to the nearest hundred."
choices: ["300", "360", "400", "500"]
correctAnswer: "400"
explanation: "362 is past the halfway point 350, so it is closer to 400."
hint: "Compare 362 to 350."
questionGoal: "Round a three-digit number to the nearest hundred."
misconception: "Rounding to the nearest ten instead of hundred."
```

```question
key: u05_l02_q02_midpoint_hundred
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "Halfway between 500 and 600 is"
sentenceAfter: "."
choices: ["525", "550", "575", "650"]
correctAnswer: "550"
explanation: "550 is 50 away from both 500 and 600."
hint: "Find the middle of the two hundreds."
questionGoal: "Identify hundred midpoint for rounding."
misconception: "Choosing any number between the hundreds."
```

```question
key: u05_l02_q03_match_round_hundreds
type: match-pairs
prompt: "Match each number to the nearest hundred."
pairs:
  - left: "241"
    right: "200"
  - left: "578"
    right: "600"
  - left: "650"
    right: "700"
  - left: "811"
    right: "800"
explanation: "Use the closest hundred benchmark."
hint: "Compare each number to the halfway point between hundreds."
questionGoal: "Practice nearest-hundred rounding."
misconception: "Rounding from the ones digit only."
```

```question
key: u05_l02_q04_reasonable_estimate
type: multiple-choice
prompt: "About how much is 389 + 212?"
choices: ["About 100", "About 300", "About 600", "About 900"]
correctAnswer: "About 600"
explanation: "389 rounds to 400 and 212 rounds to 200, so the sum is about 600."
hint: "Round each number to the nearest hundred."
questionGoal: "Use rounding to estimate a sum."
misconception: "Choosing exact-looking or unreasonable estimates."
```

```question
key: u05_l02_q05_type_round_hundred
type: text-input
prompt: "Type 749 rounded to the nearest hundred."
acceptedAnswers: ["700"]
answerType: number
explanation: "749 is just below halfway to 800, so it rounds to 700."
hint: "Halfway between 700 and 800 is 750."
questionGoal: "Produce a rounded hundred using midpoint reasoning."
misconception: "Rounding up because 49 feels large."
```

```question
key: u05_l02_q06_explain_estimate
type: constructed-response
prompt: "Explain why 198 + 402 should be about 600."
minWords: 8
sampleAnswer: "198 is about 200 and 402 is about 400, so the sum is about 600."
checklist: ["Round both numbers", "Include about 600"]
explanation: "Rounding helps predict a reasonable size before exact computation."
hint: "Round each number to the nearest hundred."
questionGoal: "Explain estimation with rounded hundreds."
misconception: "Treating estimation as random guessing."
```

### Lesson 3: Add Within 1,000 With Place Value

```question
key: u05_l03_q01_add_place_value
type: text-input
prompt: "Type the sum: 246 + 178"
acceptedAnswers: ["424"]
answerType: number
explanation: "200 + 100 = 300, 40 + 70 = 110, and 6 + 8 = 14, for 424."
hint: "Add hundreds, tens, and ones, then regroup."
questionGoal: "Add within 1,000 with regrouping."
misconception: "Forgetting to regroup tens or ones."
```

```question
key: u05_l03_q02_choose_addition_step
type: multiple-choice
prompt: "In 365 + 247, what happens to the ones?"
choices: ["5 + 7 = 12, so regroup 10 ones as 1 ten", "5 + 7 = 57", "5 + 7 = 2", "Ignore the ones"]
correctAnswer: "5 + 7 = 12, so regroup 10 ones as 1 ten"
explanation: "12 ones is 1 ten and 2 ones."
hint: "Ones can be regrouped into tens."
questionGoal: "Understand regrouping in addition."
misconception: "Treating two ones digits as a two-digit string."
```

```question
key: u05_l03_q03_match_sums
type: match-pairs
prompt: "Match each addition problem to its sum."
pairs:
  - left: "123 + 245"
    right: "368"
  - left: "409 + 136"
    right: "545"
  - left: "275 + 318"
    right: "593"
  - left: "642 + 189"
    right: "831"
explanation: "Add like place values and regroup when needed."
hint: "Align hundreds, tens, and ones."
questionGoal: "Practice multi-digit addition sums."
misconception: "Misaligning place values."
```

```question
key: u05_l03_q04_fill_expanded
type: multi-blank-cloze
prompt: "Complete the expanded addition for 352 + 218."
parts: ["300 + 200 = ", "; 50 + 10 = ", "; 2 + 8 = ", "."]
blanks:
  - correctAnswer: "500"
    acceptedAnswers: ["500"]
  - correctAnswer: "60"
    acceptedAnswers: ["60"]
  - correctAnswer: "10"
    acceptedAnswers: ["10"]
explanation: "Expanded form helps keep place values separate."
hint: "Add each place-value part."
questionGoal: "Use expanded form to support addition."
misconception: "Combining digits without place values."
```

```question
key: u05_l03_q05_reasonable_sum
type: multiple-choice
prompt: "Which answer is reasonable for 298 + 401?"
choices: ["699", "199", "2,401", "543"]
correctAnswer: "699"
explanation: "298 is about 300 and 401 is about 400, so the sum should be about 700."
hint: "Estimate before choosing."
questionGoal: "Use estimation to check an addition result."
misconception: "Accepting an answer without checking magnitude."
```

```question
key: u05_l03_q06_explain_add
type: constructed-response
prompt: "Explain one way to add 438 + 126."
minWords: 8
sampleAnswer: "Add 400 + 100, 30 + 20, and 8 + 6, then combine to get 564."
checklist: ["Use place value", "Include the sum 564"]
explanation: "Place-value addition keeps hundreds, tens, and ones organized."
hint: "Break both numbers into hundreds, tens, and ones."
questionGoal: "Explain a place-value addition method."
misconception: "Reporting an answer without a method."
```

### Lesson 4: Subtract Within 1,000 With Regrouping

```question
key: u05_l04_q01_subtract_regroup
type: text-input
prompt: "Type the difference: 302 - 158"
acceptedAnswers: ["144"]
answerType: number
explanation: "Regroup 302 as 2 hundreds, 9 tens, and 12 ones, then subtract to get 144."
hint: "You need to regroup across the zero."
questionGoal: "Subtract within 1,000 with regrouping across zero."
misconception: "Mishandling zeros during regrouping."
```

```question
key: u05_l04_q02_regroup_step
type: multiple-choice
prompt: "To solve 421 - 176, why do you regroup?"
choices: ["You cannot subtract 6 ones from 1 one without trading a ten.", "You always regroup first.", "The answer must be bigger.", "Hundreds cannot be subtracted."]
correctAnswer: "You cannot subtract 6 ones from 1 one without trading a ten."
explanation: "One ten can be traded for 10 ones."
hint: "Look at the ones place first."
questionGoal: "Explain why regrouping is needed."
misconception: "Seeing regrouping as a rote step instead of a unit trade."
```

```question
key: u05_l04_q03_match_differences
type: match-pairs
prompt: "Match each subtraction problem to its difference."
pairs:
  - left: "500 - 236"
    right: "264"
  - left: "742 - 318"
    right: "424"
  - left: "631 - 249"
    right: "382"
  - left: "804 - 475"
    right: "329"
explanation: "Regroup hundreds and tens as needed before subtracting."
hint: "Check with addition if you are unsure."
questionGoal: "Practice multi-digit subtraction with regrouping."
misconception: "Subtracting smaller digits from larger digits regardless of place."
```

```question
key: u05_l04_q04_fill_trade
type: fill-blank
prompt: "Complete the regrouping sentence."
sentenceBefore: "In subtraction, 1 ten can be traded for"
sentenceAfter: "ones."
choices: ["1", "5", "10", "100"]
correctAnswer: "10"
explanation: "One ten is the same value as 10 ones."
hint: "Think about place-value units."
questionGoal: "Understand regrouping as trading units."
misconception: "Treating regrouping as moving digits without value."
```

```question
key: u05_l04_q05_check_difference
type: multiple-choice
prompt: "Which equation checks 613 - 287 = 326?"
choices: ["326 + 287 = 613", "613 + 287 = 326", "326 - 287 = 613", "613 - 326 = 287 + 613"]
correctAnswer: "326 + 287 = 613"
explanation: "Difference plus subtracted amount should equal the starting number."
hint: "Use addition to check subtraction."
questionGoal: "Check subtraction with inverse addition."
misconception: "Choosing a check that reuses numbers but is not equivalent."
```

```question
key: u05_l04_q06_explain_subtract
type: constructed-response
prompt: "Explain why regrouping is needed for 402 - 175."
minWords: 8
sampleAnswer: "There are not enough ones or tens, so a hundred must be traded into tens and ones."
checklist: ["Mention not enough ones or tens", "Mention trading or regrouping"]
explanation: "Regrouping keeps the value the same while making subtraction possible."
hint: "Look at the zeros in 402."
questionGoal: "Explain regrouping across zero."
misconception: "Borrowing mechanically without place-value meaning."
```

### Lesson 5: Use Inverse Operations To Check

```question
key: u05_l05_q01_check_addition
type: multiple-choice
prompt: "Which equation checks 285 + 149 = 434?"
choices: ["434 - 149 = 285", "434 + 149 = 285", "285 - 149 = 434", "149 - 285 = 434"]
correctAnswer: "434 - 149 = 285"
explanation: "Subtraction can undo addition."
hint: "Start with the sum and subtract one addend."
questionGoal: "Check addition with inverse subtraction."
misconception: "Repeating numbers in a non-inverse equation."
```

```question
key: u05_l05_q02_check_subtraction
type: multiple-choice
prompt: "Which equation checks 700 - 268 = 432?"
choices: ["432 + 268 = 700", "700 + 268 = 432", "432 - 268 = 700", "268 - 432 = 700"]
correctAnswer: "432 + 268 = 700"
explanation: "Difference plus the amount subtracted should return to 700."
hint: "Use addition to undo subtraction."
questionGoal: "Check subtraction with inverse addition."
misconception: "Thinking a check is just doing another random operation."
```

```question
key: u05_l05_q03_match_checks
type: match-pairs
prompt: "Match each problem to a valid inverse check."
pairs:
  - left: "348 + 127 = 475"
    right: "475 - 127 = 348"
  - left: "621 - 304 = 317"
    right: "317 + 304 = 621"
  - left: "256 + 239 = 495"
    right: "495 - 256 = 239"
  - left: "900 - 455 = 445"
    right: "445 + 455 = 900"
explanation: "Inverse operations undo each other."
hint: "Addition and subtraction are inverse operations."
questionGoal: "Match computations to valid checks."
misconception: "Choosing equations with right numbers but wrong relationship."
```

```question
key: u05_l05_q04_missing_check
type: fill-blank
prompt: "Complete the check: 538 - 219 = 319, so 319 + ___ = 538."
sentenceBefore: "The missing number is"
sentenceAfter: "."
choices: ["219", "319", "538", "857"]
correctAnswer: "219"
explanation: "Add the difference and the subtracted number to get the starting number."
hint: "Use the number that was subtracted."
questionGoal: "Complete an inverse-operation check."
misconception: "Using the result twice."
```

```question
key: u05_l05_q05_type_checked_sum
type: text-input
prompt: "376 + 288 = 664. Type the missing number in the check: 664 - ___ = 376."
acceptedAnswers: ["288"]
answerType: number
explanation: "Subtracting 288 from the sum returns to 376."
hint: "Subtract the other addend."
questionGoal: "Produce a missing value in an addition check."
misconception: "Confusing which addend should be subtracted."
```

```question
key: u05_l05_q06_explain_inverse
type: constructed-response
prompt: "Explain why 241 + 359 can be checked with subtraction."
minWords: 8
sampleAnswer: "Addition and subtraction undo each other, so the sum minus one addend should give the other addend."
checklist: ["Mention undo or inverse", "Mention subtracting one addend"]
explanation: "Inverse operations help verify whether a result is correct."
hint: "Think about how to get back from the sum to an addend."
questionGoal: "Explain inverse-operation checking."
misconception: "Treating checks as separate calculations without meaning."
```

### Lesson 6: Multiply By Multiples Of 10

```question
key: u05_l06_q01_multiple_ten
type: multiple-choice
prompt: "What is 4 x 30?"
choices: ["12", "34", "120", "300"]
correctAnswer: "120"
explanation: "4 x 3 tens = 12 tens, or 120."
hint: "First think 4 x 3, then make the answer tens."
questionGoal: "Multiply a one-digit number by a multiple of 10."
misconception: "Ignoring the tens unit or adding factors."
```

```question
key: u05_l06_q02_tens_language
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "6 x 40 means 6 groups of 4 tens, which is"
sentenceAfter: "tens."
choices: ["10", "24", "40", "240"]
correctAnswer: "24"
explanation: "6 x 4 tens is 24 tens, or 240."
hint: "Multiply 6 x 4 first."
questionGoal: "Use tens language before writing the full product."
misconception: "Confusing tens count with standard form."
```

```question
key: u05_l06_q03_match_multiples
type: match-pairs
prompt: "Match each expression to its product."
pairs:
  - left: "3 x 20"
    right: "60"
  - left: "7 x 40"
    right: "280"
  - left: "5 x 90"
    right: "450"
  - left: "8 x 30"
    right: "240"
explanation: "Multiply the basic fact, then use tens."
hint: "Think of each multiple of 10 as a number of tens."
questionGoal: "Practice multiplying by multiples of 10."
misconception: "Appending zero without checking the basic fact."
```

```question
key: u05_l06_q04_type_multiple
type: text-input
prompt: "Type the product: 9 x 60"
acceptedAnswers: ["540"]
answerType: number
explanation: "9 x 6 tens = 54 tens, or 540."
hint: "Use 9 x 6 first."
questionGoal: "Produce a product with a multiple of 10."
misconception: "Writing 5400 or 96 by mishandling place value."
```

```question
key: u05_l06_q05_error_multiple_ten
type: error-correction
prompt: "Correct the statement."
sentence: "5 x 70 = 35 because 5 x 7 = 35."
acceptedAnswers:
  - "5 x 70 = 350 because 5 x 7 tens = 35 tens."
  - "5 x 70 = 350"
explanation: "The 70 means 7 tens, so the product is 35 tens, or 350."
hint: "Do not drop the tens unit."
questionGoal: "Correct a place-value error in multiplying by tens."
misconception: "Treating 70 as 7 without converting back to tens."
```

```question
key: u05_l06_q06_explain_tens_product
type: constructed-response
prompt: "Explain why 8 x 50 = 400."
minWords: 8
sampleAnswer: "50 is 5 tens. 8 x 5 tens is 40 tens, which is 400."
checklist: ["Mention 5 tens", "Include 400"]
explanation: "Multiplying by multiples of 10 uses both multiplication facts and place value."
hint: "Think of 50 as 5 tens."
questionGoal: "Explain the place-value reasoning for multiples of 10."
misconception: "Using a zero trick without understanding."
```

### Lesson 7: Estimate, Compute, Or Check?

```question
key: u05_l07_q01_choose_estimate
type: multiple-choice
prompt: "Which task asks for an estimate?"
choices: ["About how many people are there?", "Exactly how many pencils are left?", "What is the missing addend?", "Which equation checks the answer?"]
correctAnswer: "About how many people are there?"
explanation: "The word \"about\" usually asks for an estimate."
hint: "Estimate means an answer close to the exact amount."
questionGoal: "Identify when estimation is appropriate."
misconception: "Thinking every math question needs an exact answer."
```

```question
key: u05_l07_q02_tool_choice
type: match-pairs
prompt: "Match each purpose to the best tool."
pairs:
  - left: "Find the exact total"
    right: "Compute"
  - left: "Predict the size"
    right: "Estimate"
  - left: "Verify subtraction"
    right: "Use addition to check"
  - left: "Make a hard number easier"
    right: "Round"
explanation: "Different tools do different jobs in problem solving."
hint: "Ask what the problem wants you to do."
questionGoal: "Distinguish estimating, computing, checking, and rounding."
misconception: "Treating all tools as the same operation."
```

```question
key: u05_l07_q03_compute_exact
type: text-input
prompt: "The problem asks for the exact value of 438 + 127. Type the exact sum."
acceptedAnswers: ["565"]
answerType: number
explanation: "438 + 127 = 565."
hint: "Add hundreds, tens, and ones."
questionGoal: "Compute when an exact answer is required."
misconception: "Giving an estimate when exact computation is requested."
```

```question
key: u05_l07_q04_reasonable_choice
type: multiple-choice
prompt: "Which is the best estimate for 612 - 289?"
choices: ["About 100", "About 300", "About 600", "About 900"]
correctAnswer: "About 300"
explanation: "612 is about 600 and 289 is about 300, so the difference is about 300."
hint: "Round to hundreds first."
questionGoal: "Estimate a difference for reasonableness."
misconception: "Adding rounded numbers when the operation is subtraction."
```

```question
key: u05_l07_q05_error_tool
type: error-correction
prompt: "Correct the decision."
sentence: "The question asks exactly how many. I will round and stop."
acceptedAnswers:
  - "The question asks exactly how many, so I need to compute the exact answer."
  - "I need to compute the exact answer."
explanation: "Rounding can help check, but exact questions need exact computation."
hint: "Look at the word \"exactly.\""
questionGoal: "Correct misuse of estimation as a final exact answer."
misconception: "Treating estimates as interchangeable with exact answers."
```

```question
key: u05_l07_q06_explain_tool_choice
type: constructed-response
prompt: "A student found 299 + 402 = 701. Explain one way to check if it is reasonable."
minWords: 8
sampleAnswer: "Round 299 to 300 and 402 to 400. The sum should be about 700, so 701 is reasonable."
checklist: ["Use rounding or estimation", "Say whether 701 is reasonable"]
explanation: "Estimation can check whether an exact answer is close to the expected size."
hint: "Round both addends to hundreds."
questionGoal: "Explain reasonableness checking after computation."
misconception: "Checking only by redoing the exact same work."
```

## Unit 6: Four-Operation Word Problems And Equations

### Lesson 1: Read For Structure, Not Key Words

```question
key: u06_l01_q01_more_not_add
type: multiple-choice
prompt: "Which operation fits? Kim has 24 shells. Lee has 9 more shells than Kim. How many shells does Lee have?"
choices: ["addition", "subtraction", "multiplication", "division"]
correctAnswer: "addition"
explanation: "Lee has Kim's 24 shells plus 9 more."
hint: "Ask what Lee's amount is made from."
questionGoal: "Choose an operation from structure, not just key words."
misconception: "Treating every comparison word as subtraction."
```

```question
key: u06_l01_q02_more_difference
type: multiple-choice
prompt: "Which operation fits? Kim has 24 shells. Lee has 33 shells. How many more shells does Lee have?"
choices: ["addition", "subtraction", "multiplication", "division"]
correctAnswer: "subtraction"
explanation: "The problem asks for the difference between 33 and 24."
hint: "\"How many more\" can ask for a comparison difference."
questionGoal: "Distinguish additive comparison from joining."
misconception: "Thinking the word \"more\" always means add."
```

```question
key: u06_l01_q03_match_structure
type: match-pairs
prompt: "Match each story structure to an operation."
pairs:
  - left: "Find a total after joining"
    right: "addition"
  - left: "Find how far apart two amounts are"
    right: "subtraction"
  - left: "Find total equal groups"
    right: "multiplication"
  - left: "Find group size or number of groups"
    right: "division"
explanation: "The relationship in the story tells which operation fits."
hint: "Ask what is unknown in each story."
questionGoal: "Connect operation meanings to story structures."
misconception: "Choosing operations by isolated words."
```

```question
key: u06_l01_q04_equal_groups_structure
type: multiple-choice
prompt: "Which structure is in this story? There are 6 bags with 4 apples in each bag."
choices: ["equal groups", "difference", "take away", "fraction comparison"]
correctAnswer: "equal groups"
explanation: "The story has 6 groups, each with the same size."
hint: "Look for \"each.\""
questionGoal: "Identify multiplicative structure in a word problem."
misconception: "Treating equal groups as ordinary addition only."
```

```question
key: u06_l01_q05_operation_from_story
type: text-input
prompt: "Type the operation name that fits: 45 pencils are put into boxes with 5 pencils in each box. How many boxes?"
acceptedAnswers: ["division", "divide"]
answerType: text
explanation: "The total and group size are known, so division finds the number of groups."
hint: "Ask whether you know the total and the size of each group."
questionGoal: "Produce the operation name for a grouping problem."
misconception: "Using multiplication because the story has equal groups but the total is already known."
```

```question
key: u06_l01_q06_explain_no_key_words
type: constructed-response
prompt: "Explain why key words alone can be tricky in word problems."
minWords: 10
sampleAnswer: "The same word can appear in different structures, so I need to understand what is unknown."
checklist: ["Mention structure or what is unknown", "Explain that words can be tricky"]
explanation: "Operation choice depends on the relationship among quantities."
hint: "Think about the word \"more\" in two different problems."
questionGoal: "Explain why structure matters more than key words."
misconception: "Believing a single word always determines the operation."
```

### Lesson 2: One-Step Problems With All Four Operations

```question
key: u06_l02_q01_add_story
type: passage-question
prompt: "Read the story and answer."
passageTitle: "Class Books"
passage: "A class has 128 fiction books and 76 nonfiction books."
question: "How many books are there in all?"
choices: ["52", "194", "204", "864"]
correctAnswer: "204"
explanation: "\"In all\" asks for the total, so add 128 + 76 = 204."
hint: "The two kinds of books are being joined."
questionGoal: "Solve a one-step addition word problem."
misconception: "Subtracting because there are two categories."
```

```question
key: u06_l02_q02_subtract_story
type: passage-question
prompt: "Read the story and answer."
passageTitle: "Tickets"
passage: "There were 315 tickets. The class used 128 tickets."
question: "How many tickets were left?"
choices: ["187", "197", "443", "128"]
correctAnswer: "187"
explanation: "\"Left\" means some tickets were used, so subtract 315 - 128 = 187."
hint: "Start with the total tickets."
questionGoal: "Solve a one-step subtraction word problem."
misconception: "Adding used tickets to the starting amount."
```

```question
key: u06_l02_q03_multiply_story
type: passage-question
prompt: "Read the story and answer."
passageTitle: "Chair Rows"
passage: "There are 7 rows with 6 chairs in each row."
question: "How many chairs are there?"
choices: ["13", "36", "42", "76"]
correctAnswer: "42"
explanation: "There are 7 equal groups of 6, so 7 x 6 = 42."
hint: "Rows with the same number in each row are equal groups."
questionGoal: "Solve a one-step multiplication word problem."
misconception: "Adding 7 + 6."
```

```question
key: u06_l02_q04_divide_story
type: passage-question
prompt: "Read the story and answer."
passageTitle: "Team Packs"
passage: "A coach has 48 cones. She puts 8 cones in each bag."
question: "How many bags does she fill?"
choices: ["6", "8", "40", "56"]
correctAnswer: "6"
explanation: "48 divided into groups of 8 makes 6 bags."
hint: "Ask how many groups of 8 make 48."
questionGoal: "Solve a one-step grouping division problem."
misconception: "Choosing the group size as the answer."
```

```question
key: u06_l02_q05_match_operation
type: match-pairs
prompt: "Match each question to the operation."
pairs:
  - left: "How many in all?"
    right: "add"
  - left: "How many are left?"
    right: "subtract"
  - left: "How many equal-group total?"
    right: "multiply"
  - left: "How many groups?"
    right: "divide"
explanation: "The question points to the relationship and operation."
hint: "Decide what is unknown."
questionGoal: "Match one-step problem questions to operations."
misconception: "Using surface words without meaning."
```

```question
key: u06_l02_q06_explain_operation
type: constructed-response
prompt: "A box has 9 packs with 4 pencils in each pack. Explain the operation you would use."
minWords: 8
sampleAnswer: "I would multiply because there are 9 equal groups of 4 pencils."
checklist: ["Name multiplication", "Mention equal groups"]
explanation: "Multiplication finds the total in equal groups."
hint: "Use the words \"each pack.\""
questionGoal: "Explain operation choice for a one-step problem."
misconception: "Solving without naming the structure."
```

### Lesson 3: Unknowns In Different Places

```question
key: u06_l03_q01_missing_result
type: fill-blank
prompt: "Complete the equation."
sentenceBefore: "28 + 17 ="
sentenceAfter: "."
choices: ["35", "45", "55", "2817"]
correctAnswer: "45"
explanation: "28 + 17 = 45."
hint: "Add 28 + 10, then +7."
questionGoal: "Solve an equation with the unknown as result."
misconception: "Concatenating numbers instead of adding."
```

```question
key: u06_l03_q02_missing_addend
type: fill-blank
prompt: "Complete the equation."
sentenceBefore: "28 +"
sentenceAfter: "= 45"
choices: ["7", "17", "27", "73"]
correctAnswer: "17"
explanation: "28 + 17 = 45."
hint: "Count up from 28 to 45."
questionGoal: "Solve for a missing addend."
misconception: "Assuming the blank must be the total."
```

```question
key: u06_l03_q03_missing_start
type: text-input
prompt: "Type the missing number: ___ - 26 = 39"
acceptedAnswers: ["65"]
answerType: number
explanation: "65 - 26 = 39 because 39 + 26 = 65."
hint: "Use addition to undo subtraction."
questionGoal: "Solve an equation with the unknown start."
misconception: "Subtracting the visible numbers instead of using inverse reasoning."
```

```question
key: u06_l03_q04_unknown_factor
type: multiple-choice
prompt: "What missing number makes __ x 7 = 42 true?"
choices: ["5", "6", "7", "49"]
correctAnswer: "6"
explanation: "6 x 7 = 42."
hint: "Ask, what times 7 equals 42?"
questionGoal: "Solve a multiplication equation with unknown factor."
misconception: "Choosing the product or visible factor."
```

```question
key: u06_l03_q05_match_unknowns
type: match-pairs
prompt: "Match each equation to the missing value."
pairs:
  - left: "__ + 14 = 50"
    right: "36"
  - left: "72 - __ = 45"
    right: "27"
  - left: "__ x 8 = 32"
    right: "4"
  - left: "54 / __ = 9"
    right: "6"
explanation: "The unknown can be in different positions."
hint: "Use inverse operations or related facts."
questionGoal: "Solve unknowns in varied operations and positions."
misconception: "Applying one operation pattern to all blanks."
```

```question
key: u06_l03_q06_explain_unknown
type: constructed-response
prompt: "Explain how to find the missing number in 63 / ___ = 7."
minWords: 8
sampleAnswer: "I ask what number times 7 equals 63. Since 9 x 7 = 63, the missing number is 9."
checklist: ["Use related multiplication", "Include 9"]
explanation: "Division equations can be solved with related multiplication facts."
hint: "Think of the divisor as a missing factor."
questionGoal: "Explain solving an unknown in a division equation."
misconception: "Treating the blank as the quotient automatically."
```

### Lesson 4: Represent Compare Problems

```question
key: u06_l04_q01_additive_compare
type: multiple-choice
prompt: "Maya has 36 cards. Leo has 14 more cards than Maya. What equation finds Leo's cards?"
choices: ["36 + 14 = 50", "36 - 14 = 22", "36 x 14 = 504", "36 / 14 = 2"]
correctAnswer: "36 + 14 = 50"
explanation: "Leo has Maya's amount plus 14 more."
hint: "The unknown is the larger amount."
questionGoal: "Represent an additive comparison with an equation."
misconception: "Treating every \"more\" comparison as subtraction."
```

```question
key: u06_l04_q02_difference_compare
type: multiple-choice
prompt: "Maya has 50 cards. Leo has 36 cards. What equation finds how many more Maya has?"
choices: ["50 - 36 = 14", "50 + 36 = 86", "50 x 36", "36 - 50"]
correctAnswer: "50 - 36 = 14"
explanation: "The problem asks for the difference between the two amounts."
hint: "Compare the two bar lengths."
questionGoal: "Represent a difference comparison."
misconception: "Adding two compared amounts."
```

```question
key: u06_l04_q03_times_as_many
type: multiple-choice
prompt: "A red ribbon is 4 inches long. A blue ribbon is 3 times as long. How long is the blue ribbon?"
choices: ["7 inches", "12 inches", "1 inch", "34 inches"]
correctAnswer: "12 inches"
explanation: "3 times as long means 3 groups of 4 inches."
hint: "This is multiplicative comparison, not \"3 more.\""
questionGoal: "Represent a multiplicative comparison."
misconception: "Adding 3 instead of multiplying by 3."
```

```question
key: u06_l04_q04_match_compare
type: match-pairs
prompt: "Match each comparison phrase to a model idea."
pairs:
  - left: "8 more than"
    right: "add 8 to the smaller amount"
  - left: "8 fewer than"
    right: "subtract 8 from the larger amount"
  - left: "8 times as many"
    right: "make 8 equal copies"
  - left: "how many more"
    right: "find the difference"
explanation: "Compare phrases can mean different structures."
hint: "Decide whether the comparison is additive or multiplicative."
questionGoal: "Distinguish comparison language and structures."
misconception: "Treating all comparison words as one operation."
```

```question
key: u06_l04_q05_type_compare
type: text-input
prompt: "Tia has 18 stickers. Sam has 3 times as many. Type how many stickers Sam has."
acceptedAnswers: ["54"]
answerType: number
explanation: "3 x 18 = 54."
hint: "Make 3 equal groups of 18."
questionGoal: "Solve a multiplicative comparison problem."
misconception: "Adding 18 + 3."
```

```question
key: u06_l04_q06_explain_strip
type: constructed-response
prompt: "Explain how a strip diagram could show 42 compared with 29."
minWords: 8
sampleAnswer: "It can show one bar for 42 and one shorter bar for 29, with the extra part as the difference."
checklist: ["Mention two bars", "Mention the difference"]
explanation: "Strip diagrams make comparison differences visible."
hint: "Think of two bars lined up at the start."
questionGoal: "Explain representation of additive comparison."
misconception: "Drawing unrelated totals without showing the comparison."
```

### Lesson 5: Find The Hidden First Step

```question
key: u06_l05_q01_first_step_total
type: multiple-choice
prompt: "Lina has 24 red beads and 18 blue beads. She uses 15 beads. What should you find first?"
choices: ["Total beads Lina has", "How many colors there are", "15 + 18 only", "24 - 18"]
correctAnswer: "Total beads Lina has"
explanation: "First find 24 + 18, then subtract the 15 used beads."
hint: "You need to know how many beads she had before she used some."
questionGoal: "Identify the intermediate quantity in a two-step problem."
misconception: "Using the final action without first finding the starting total."
```

```question
key: u06_l05_q02_order_steps
type: order-items
prompt: "Put the steps in order: 5 boxes have 6 pencils each. Then 8 pencils are given away."
items: ["Subtract 8", "Find 5 x 6", "Answer how many are left"]
correctOrder: ["Find 5 x 6", "Subtract 8", "Answer how many are left"]
explanation: "First find the total pencils, then subtract the pencils given away."
hint: "You cannot subtract from the total until you know the total."
questionGoal: "Sequence steps in a two-step equal-groups problem."
misconception: "Performing the second operation first."
```

```question
key: u06_l05_q03_hidden_quantity_label
type: fill-blank
prompt: "Complete the label. First find 7 x 4 in a story about 7 bags with 4 shells each."
sentenceBefore: "The hidden first quantity is the total number of"
sentenceAfter: "."
choices: ["shells", "bags", "groups", "students"]
correctAnswer: "shells"
explanation: "7 x 4 finds the total shells."
hint: "Ask what the product counts."
questionGoal: "Label an intermediate quantity."
misconception: "Calculating a number without knowing what it means."
```

```question
key: u06_l05_q04_compute_two_step
type: text-input
prompt: "There are 4 packs of 8 cards. Then 5 cards are lost. Type how many cards remain."
acceptedAnswers: ["27"]
answerType: number
explanation: "4 x 8 = 32, and 32 - 5 = 27."
hint: "Find the total cards first."
questionGoal: "Solve a two-step problem with an intermediate total."
misconception: "Adding or subtracting before finding equal-group total."
```

```question
key: u06_l05_q05_first_step_choice
type: multiple-choice
prompt: "A class has 3 boxes with 9 markers each and 12 loose markers. What is the first step to find all markers?"
choices: ["Find 3 x 9", "Add 3 + 12", "Subtract 12 - 9", "Divide 12 by 3"]
correctAnswer: "Find 3 x 9"
explanation: "First find the markers in the boxes, then add the loose markers."
hint: "The boxes are equal groups."
questionGoal: "Identify first step in a mixed equal-groups and addition problem."
misconception: "Combining unrelated numbers first."
```

```question
key: u06_l05_q06_explain_first_step
type: constructed-response
prompt: "A student solves 6 rows of 7 chairs, then 10 chairs are removed. Explain the hidden first step."
minWords: 8
sampleAnswer: "First find the total chairs in the rows: 6 x 7 = 42."
checklist: ["Mention 6 x 7", "Say it finds total chairs"]
explanation: "The hidden first step finds the amount that will be used in the second step."
hint: "Ask what number the 10 chairs are removed from."
questionGoal: "Explain an intermediate quantity in a two-step problem."
misconception: "Not naming the first result's meaning."
```

### Lesson 6: Write Equations For Two-Step Problems

```question
key: u06_l06_q01_equation_pair
type: multiple-choice
prompt: "There are 3 bags with 8 apples each. Then 5 more apples are added. Which equations fit?"
choices: ["3 x 8 = 24; 24 + 5 = 29", "3 + 8 = 11; 11 - 5 = 6", "8 - 3 = 5; 5 + 5 = 10", "3 x 5 = 15; 15 + 8 = 23"]
correctAnswer: "3 x 8 = 24; 24 + 5 = 29"
explanation: "First find apples in bags, then add 5 more."
hint: "Use one equation for each step."
questionGoal: "Select equations for a two-step problem."
misconception: "Writing one unrelated equation with all numbers."
```

```question
key: u06_l06_q02_order_equations
type: order-items
prompt: "Put the equations in order for: 6 teams have 5 players each. 4 players leave."
items: ["30 - 4 = 26", "6 x 5 = 30"]
correctOrder: ["6 x 5 = 30", "30 - 4 = 26"]
explanation: "First find total players, then subtract the players who leave."
hint: "Find the total before subtracting."
questionGoal: "Sequence equations for a two-step problem."
misconception: "Reversing the steps."
```

```question
key: u06_l06_q03_multi_blank_equations
type: multi-blank-cloze
prompt: "Complete the equations: 4 rows have 7 chairs each. Then 9 chairs are added."
parts: ["4 x 7 = ", "; ", " + 9 = ", "."]
blanks:
  - correctAnswer: "28"
    acceptedAnswers: ["28"]
  - correctAnswer: "28"
    acceptedAnswers: ["28"]
  - correctAnswer: "37"
    acceptedAnswers: ["37"]
explanation: "The first equation finds chairs in rows; the second adds 9."
hint: "Use the first answer in the second equation."
questionGoal: "Complete linked equations for a two-step problem."
misconception: "Not carrying the intermediate value into step two."
```

```question
key: u06_l06_q04_bad_equation_set
type: multiple-choice
prompt: "Which equation set is wrong for 5 boxes of 6 books, then 8 books are sold?"
choices: ["5 + 6 = 11; 11 - 8 = 3", "5 x 6 = 30; 30 - 8 = 22", "6 x 5 = 30; 30 - 8 = 22", "30 - 8 = 22 after finding 5 x 6"]
correctAnswer: "5 + 6 = 11; 11 - 8 = 3"
explanation: "The boxes are equal groups, so the first step should be multiplication."
hint: "\"5 boxes of 6\" is not 5 + 6."
questionGoal: "Identify an incorrect equation set."
misconception: "Adding factors in an equal-groups first step."
```

```question
key: u06_l06_q05_type_final
type: text-input
prompt: "Use two steps: 7 packs have 4 cards each. Then 6 cards are added. Type the final number of cards."
acceptedAnswers: ["34"]
answerType: number
explanation: "7 x 4 = 28, and 28 + 6 = 34."
hint: "First find the cards in the packs."
questionGoal: "Solve a two-step problem from equations."
misconception: "Skipping one step."
```

```question
key: u06_l06_q06_explain_equations
type: constructed-response
prompt: "Explain why a two-step word problem often needs two equations."
minWords: 10
sampleAnswer: "Each equation answers one part. The first answer is used in the second step."
checklist: ["Mention one equation per step", "Mention first answer used later"]
explanation: "Two-step problems have an intermediate quantity and a final answer."
hint: "Think about the hidden first step."
questionGoal: "Explain the role of equations in two-step modeling."
misconception: "Trying to force all quantities into one equation."
```

### Lesson 7: Check Units And Reasonableness

```question
key: u06_l07_q01_unit_label
type: multiple-choice
prompt: "A problem asks how many boxes are needed. Which answer label fits?"
choices: ["boxes", "pencils", "minutes", "square units"]
correctAnswer: "boxes"
explanation: "The answer should use the unit asked for in the question."
hint: "Look at what the question asks to find."
questionGoal: "Choose the correct answer unit."
misconception: "Using a unit from a number in the problem rather than the question."
```

```question
key: u06_l07_q02_reasonable_operation
type: multiple-choice
prompt: "A student says 9 rows of 8 seats is 17 seats. Why is that not reasonable?"
choices: ["9 groups of 8 should be much more than 17.", "17 is an odd number.", "Rows cannot have seats.", "8 is smaller than 9."]
correctAnswer: "9 groups of 8 should be much more than 17."
explanation: "9 x 8 is 72, so 17 is too small."
hint: "Compare with 10 groups of 8."
questionGoal: "Use magnitude to reject an unreasonable answer."
misconception: "Accepting 9 + 8 for an equal-groups problem."
```

```question
key: u06_l07_q03_match_check
type: match-pairs
prompt: "Match each answer problem to a useful check."
pairs:
  - left: "Addition answer"
    right: "Subtract one addend"
  - left: "Subtraction answer"
    right: "Add the difference back"
  - left: "Multiplication answer"
    right: "Compare with equal groups"
  - left: "Division answer"
    right: "Use related multiplication"
explanation: "Checks should fit the operation and context."
hint: "Think about how to undo or verify each operation."
questionGoal: "Match operations to checking methods."
misconception: "Using the same check for every operation."
```

```question
key: u06_l07_q04_error_unit
type: error-correction
prompt: "Correct the answer label."
sentence: "There are 24 students put into teams of 4. The answer is 6 students."
acceptedAnswers:
  - "There are 24 students put into teams of 4. The answer is 6 teams."
  - "The answer is 6 teams."
explanation: "The quotient tells how many teams, not how many students."
hint: "Ask what the problem wants to find."
questionGoal: "Correct a quotient label error."
misconception: "Labeling the answer with the total's unit."
```

```question
key: u06_l07_q05_type_reasonable
type: text-input
prompt: "A student says 312 + 209 = 421. Type a better estimate for the sum rounded to the nearest hundred."
acceptedAnswers: ["500"]
answerType: number
explanation: "312 is about 300 and 209 is about 200, so the sum is about 500."
hint: "Round both addends to hundreds."
questionGoal: "Use estimation to evaluate an addition answer."
misconception: "Accepting an exact-looking but too-small sum."
```

```question
key: u06_l07_q06_explain_reasonable
type: constructed-response
prompt: "Explain why 48 / 6 = 80 is not reasonable."
minWords: 8
sampleAnswer: "80 is bigger than the total 48, but sharing 48 into groups should make a smaller number."
checklist: ["Mention 80 is too large", "Use the total 48"]
explanation: "A quotient for 48 divided into 6 equal groups should be 8, not 80."
hint: "Compare the answer to the total being divided."
questionGoal: "Explain reasonableness in division."
misconception: "Ignoring magnitude of quotient relative to total."
```

### Lesson 8: Mixed Modeling Practice

```question
key: u06_l08_q01_choose_model
type: multiple-choice
prompt: "Which model best fits 6 bags with 7 apples in each bag?"
choices: ["Equal groups or array", "Fraction strip", "Clock", "Line plot"]
correctAnswer: "Equal groups or array"
explanation: "The situation has equal groups."
hint: "Look for the word \"each.\""
questionGoal: "Choose a model for a multiplication context."
misconception: "Choosing a model by topic familiarity rather than structure."
```

```question
key: u06_l08_q02_mixed_problem
type: passage-question
prompt: "Read the story and answer."
passageTitle: "Art Supplies"
passage: "There are 5 boxes with 8 markers each. Then 6 markers dry out."
question: "How many usable markers remain?"
choices: ["34", "40", "46", "58"]
correctAnswer: "34"
explanation: "5 x 8 = 40 markers, and 40 - 6 = 34."
hint: "Find the total markers first."
questionGoal: "Solve a mixed two-step problem."
misconception: "Adding all numbers or stopping after the first step."
```

```question
key: u06_l08_q03_match_model
type: match-pairs
prompt: "Match each situation to a model."
pairs:
  - left: "Find how many more"
    right: "strip diagram"
  - left: "Equal rows of desks"
    right: "array"
  - left: "Jumps of 10"
    right: "number line"
  - left: "Unknown in an equation"
    right: "box or blank"
explanation: "A model should show the problem's structure."
hint: "Choose the representation that makes the relationship visible."
questionGoal: "Match mixed problem structures to representations."
misconception: "Treating models as interchangeable."
```

```question
key: u06_l08_q04_type_final
type: text-input
prompt: "A farmer has 36 eggs. She packs 6 eggs in each carton. Type the number of cartons."
acceptedAnswers: ["6"]
answerType: number
explanation: "36 / 6 = 6 cartons."
hint: "Ask how many groups of 6 make 36."
questionGoal: "Solve a mixed division modeling problem."
misconception: "Reporting eggs per carton instead of cartons."
```

```question
key: u06_l08_q05_bad_model
type: multiple-choice
prompt: "Which model is least helpful for comparing 72 and 49?"
choices: ["fraction strip", "strip diagram", "open number line", "subtraction equation"]
correctAnswer: "fraction strip"
explanation: "A fraction strip is for fractions, not comparing two whole-number amounts here."
hint: "Choose a model that shows whole-number difference."
questionGoal: "Reject an unhelpful model for a structure."
misconception: "Selecting models based on recent lessons rather than fit."
```

```question
key: u06_l08_q06_explain_model
type: constructed-response
prompt: "Choose a model for this problem and explain why: 84 stickers are shared equally among 7 pages."
minWords: 8
sampleAnswer: "I would use division or equal groups because the stickers are shared equally among 7 pages."
checklist: ["Name a model or operation", "Explain equal sharing"]
explanation: "The problem asks how many stickers go on each page."
hint: "Ask what is being shared and into how many groups."
questionGoal: "Explain model choice in a division context."
misconception: "Solving without recognizing sharing structure."
```

## Unit 7: Fractions As Equal Parts And Numbers

### Lesson 1: Equal Parts Make Fractions

```question
key: u07_l01_q01_equal_parts
type: multiple-choice
prompt: "Which shape can show fourths?"
choices: ["A rectangle split into 4 equal parts", "A rectangle split into 4 unequal parts", "A circle split into 3 equal parts", "A square with one large part and three tiny parts"]
correctAnswer: "A rectangle split into 4 equal parts"
explanation: "Fourths are 4 equal parts of the same whole."
hint: "Check both the number of parts and whether they are equal."
questionGoal: "Identify a valid equal-part fraction model."
misconception: "Thinking any four parts make fourths."
```

```question
key: u07_l01_q02_not_fraction
type: multiple-choice
prompt: "A pizza is cut into 3 pieces, but one piece is much larger than the others. Why is this not thirds?"
choices: ["The pieces are not equal.", "There are too many pieces.", "Pizza cannot show fractions.", "Thirds must always be rectangles."]
correctAnswer: "The pieces are not equal."
explanation: "Thirds must be 3 equal parts."
hint: "Fraction parts must be the same size."
questionGoal: "Recognize unequal parts as invalid fraction naming."
misconception: "Naming fractions only by number of pieces."
```

```question
key: u07_l01_q03_match_parts
type: match-pairs
prompt: "Match each partition to its fraction name."
pairs:
  - left: "2 equal parts"
    right: "halves"
  - left: "3 equal parts"
    right: "thirds"
  - left: "4 equal parts"
    right: "fourths"
  - left: "6 equal parts"
    right: "sixths"
explanation: "The name comes from how many equal parts make the whole."
hint: "Equal parts are the key."
questionGoal: "Connect equal partition counts to fraction language."
misconception: "Using fraction names without equal-size parts."
```

```question
key: u07_l01_q04_equal_or_unequal
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "A fraction model must have"
sentenceAfter: "parts."
choices: ["equal", "different-sized", "random", "hidden"]
correctAnswer: "equal"
explanation: "Fractions name equal parts of a whole."
hint: "Fair shares are the same size."
questionGoal: "State the equal-part requirement."
misconception: "Believing unequal parts can still be named as standard fractions."
```

```question
key: u07_l01_q05_count_parts
type: text-input
prompt: "A rectangle is split into 5 equal parts. Type the denominator for one part."
acceptedAnswers: ["5"]
answerType: number
explanation: "The denominator tells how many equal parts are in the whole."
hint: "Count the equal parts in the whole."
questionGoal: "Connect equal partition count to denominator."
misconception: "Counting shaded parts instead of total equal parts."
```

```question
key: u07_l01_q06_explain_equal_parts
type: constructed-response
prompt: "Explain why equal parts matter when naming fractions."
minWords: 8
sampleAnswer: "Equal parts matter because a fraction names same-size parts of one whole."
checklist: ["Mention equal or same-size parts", "Mention the whole"]
explanation: "Without equal parts, the fraction name does not tell a fair or exact amount."
hint: "Think about fair shares."
questionGoal: "Explain the equal-part condition."
misconception: "Treating visual cuts as fractions regardless of size."
```

### Lesson 2: Unit Fractions And The Denominator

```question
key: u07_l02_q01_unit_fraction
type: multiple-choice
prompt: "A whole is split into 6 equal parts. What fraction names one part?"
choices: ["1/6", "6/1", "1/5", "6/6"]
correctAnswer: "1/6"
explanation: "One equal part out of 6 equal parts is 1/6."
hint: "Unit fractions have numerator 1."
questionGoal: "Name a unit fraction from a partition."
misconception: "Reversing numerator and denominator."
```

```question
key: u07_l02_q02_denominator_meaning
type: multiple-choice
prompt: "In 1/8, what does the 8 tell?"
choices: ["The whole has 8 equal parts.", "8 parts are shaded.", "There are 8 wholes.", "The part is 8 times bigger."]
correctAnswer: "The whole has 8 equal parts."
explanation: "The denominator names the number of equal parts in the whole."
hint: "Look at the bottom number."
questionGoal: "Interpret denominator meaning."
misconception: "Thinking the denominator counts shaded parts."
```

```question
key: u07_l02_q03_match_unit_fraction
type: match-pairs
prompt: "Match each whole partition to the unit fraction for one part."
pairs:
  - left: "2 equal parts"
    right: "1/2"
  - left: "4 equal parts"
    right: "1/4"
  - left: "5 equal parts"
    right: "1/5"
  - left: "8 equal parts"
    right: "1/8"
explanation: "A unit fraction names one of the equal parts."
hint: "The denominator matches the number of equal parts."
questionGoal: "Connect partition count to unit fraction notation."
misconception: "Matching by numerator only."
```

```question
key: u07_l02_q04_fill_unit
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "One equal part of a whole split into 3 equal parts is"
sentenceAfter: "."
choices: ["1/3", "3/1", "2/3", "3/3"]
correctAnswer: "1/3"
explanation: "One of 3 equal parts is 1/3."
hint: "The numerator is 1 because only one part is named."
questionGoal: "Identify unit fraction notation from words."
misconception: "Confusing one part with the whole."
```

```question
key: u07_l02_q05_type_denominator
type: text-input
prompt: "A strip is split into 9 equal parts. Type the denominator for one part."
acceptedAnswers: ["9"]
answerType: number
explanation: "The denominator is 9 because the whole has 9 equal parts."
hint: "Count all equal parts in the whole."
questionGoal: "Produce the denominator from equal parts."
misconception: "Counting only a selected part."
```

```question
key: u07_l02_q06_explain_unit_fraction
type: constructed-response
prompt: "Explain what 1/5 means."
minWords: 8
sampleAnswer: "It means one equal part when the whole is split into 5 equal parts."
checklist: ["Mention one part", "Mention 5 equal parts in the whole"]
explanation: "A unit fraction names exactly one equal part of a whole."
hint: "Use the words \"one\" and \"equal parts.\""
questionGoal: "Explain unit fraction meaning."
misconception: "Reading numerator and denominator as unrelated numbers."
```

### Lesson 3: Numerators Count Equal Parts

```question
key: u07_l03_q01_numerator_meaning
type: multiple-choice
prompt: "In 3/4, what does the 3 tell?"
choices: ["3 equal parts are being counted.", "The whole has 3 equal parts.", "There are 3 wholes.", "The parts are unequal."]
correctAnswer: "3 equal parts are being counted."
explanation: "The numerator counts how many equal parts are named."
hint: "The numerator is the top number."
questionGoal: "Interpret numerator meaning."
misconception: "Thinking numerator counts total parts in the whole."
```

```question
key: u07_l03_q02_shaded_fraction
type: multiple-choice
prompt: "A rectangle is split into 5 equal parts, and 2 parts are shaded. What fraction is shaded?"
choices: ["2/5", "5/2", "1/5", "5/5"]
correctAnswer: "2/5"
explanation: "2 of the 5 equal parts are shaded."
hint: "Shaded parts go on top; total equal parts go on bottom."
questionGoal: "Name a non-unit fraction from a model."
misconception: "Reversing numerator and denominator."
```

```question
key: u07_l03_q03_match_nonunit
type: match-pairs
prompt: "Match each description to a fraction."
pairs:
  - left: "3 of 6 equal parts"
    right: "3/6"
  - left: "4 of 8 equal parts"
    right: "4/8"
  - left: "2 of 3 equal parts"
    right: "2/3"
  - left: "5 of 7 equal parts"
    right: "5/7"
explanation: "The numerator counts named parts; the denominator counts equal parts in the whole."
hint: "Use \"of\" to separate top and bottom numbers."
questionGoal: "Translate part-whole descriptions to fractions."
misconception: "Treating denominator as shaded count."
```

```question
key: u07_l03_q04_repeated_unit
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "4/6 is four copies of"
sentenceAfter: "."
choices: ["1/6", "1/4", "6/4", "4/1"]
correctAnswer: "1/6"
explanation: "4/6 means 1/6 + 1/6 + 1/6 + 1/6 conceptually."
hint: "The unit fraction has the same denominator."
questionGoal: "Relate non-unit fractions to repeated unit fractions."
misconception: "Thinking 4/6 is built from fourths."
```

```question
key: u07_l03_q05_type_fraction
type: text-input
prompt: "A whole is split into 8 equal parts. 5 parts are named. Type the fraction."
acceptedAnswers: ["5/8"]
answerType: text
explanation: "5 named parts out of 8 equal parts is 5/8."
hint: "Put named parts over total equal parts."
questionGoal: "Produce fraction notation from words."
misconception: "Reversing numerator and denominator."
```

```question
key: u07_l03_q06_explain_nonunit
type: constructed-response
prompt: "Explain what 3/7 means."
minWords: 8
sampleAnswer: "It means 3 equal parts when the whole is split into 7 equal parts."
checklist: ["Mention 3 parts", "Mention 7 equal parts in the whole"]
explanation: "The numerator counts parts; the denominator names the size of the parts."
hint: "Use numerator and denominator meanings."
questionGoal: "Explain non-unit fraction notation."
misconception: "Reading the fraction as two unrelated whole numbers."
```

### Lesson 4: Fractions On A Number Line

```question
key: u07_l04_q01_count_intervals
type: multiple-choice
prompt: "A number line from 0 to 1 is split into 4 equal intervals. What is the first tick after 0?"
choices: ["1/4", "1/3", "4/1", "4/4"]
correctAnswer: "1/4"
explanation: "One interval out of 4 equal intervals is 1/4."
hint: "Count intervals, not tick marks."
questionGoal: "Locate a unit fraction on a number line."
misconception: "Counting tick marks instead of intervals."
```

```question
key: u07_l04_q02_label_point
type: multiple-choice
prompt: "A number line from 0 to 1 is split into 6 equal intervals. The third tick after 0 is what fraction?"
choices: ["3/6", "6/3", "1/3 only", "3/3"]
correctAnswer: "3/6"
explanation: "Three intervals of size 1/6 make 3/6."
hint: "Count equal intervals from 0."
questionGoal: "Locate a non-unit fraction on a number line."
misconception: "Using the tick count as denominator."
```

```question
key: u07_l04_q03_order_number_line
type: order-items
prompt: "Put these fractions in order from left to right on a number line."
items: ["3/4", "1/4", "4/4", "2/4"]
correctOrder: ["1/4", "2/4", "3/4", "4/4"]
explanation: "With the same denominator, each step is one more fourth."
hint: "Count fourths from 0."
questionGoal: "Order same-denominator fractions on a number line."
misconception: "Treating fractions as unordered labels."
```

```question
key: u07_l04_q04_match_points
type: match-pairs
prompt: "Match each location to a fraction on a line from 0 to 1 split into 5 equal parts."
pairs:
  - left: "first tick after 0"
    right: "1/5"
  - left: "second tick after 0"
    right: "2/5"
  - left: "fourth tick after 0"
    right: "4/5"
  - left: "endpoint at 1"
    right: "5/5"
explanation: "Each equal interval is one fifth."
hint: "Count intervals from 0."
questionGoal: "Match number-line positions to fraction labels."
misconception: "Counting ticks including 0 as the first fraction."
```

```question
key: u07_l04_q05_type_point
type: text-input
prompt: "A number line from 0 to 1 is split into 8 equal intervals. Type the fraction at the fifth tick after 0."
acceptedAnswers: ["5/8"]
answerType: text
explanation: "Five intervals of size 1/8 make 5/8."
hint: "The denominator is the number of equal intervals."
questionGoal: "Produce a fraction label for a number-line point."
misconception: "Using 5 as denominator or counting tick marks incorrectly."
```

```question
key: u07_l04_q06_explain_intervals
type: constructed-response
prompt: "Explain why you count intervals, not tick marks, when naming fractions on a number line."
minWords: 10
sampleAnswer: "Fractions show distance from 0, so each interval is one equal part of the whole."
checklist: ["Mention distance from 0", "Mention equal intervals"]
explanation: "The intervals show equal parts of the distance from 0 to 1."
hint: "Think about the space between marks."
questionGoal: "Explain interval reasoning on fraction number lines."
misconception: "Counting tick marks as parts."
```

### Lesson 5: Fractions Greater Than One Whole

```question
key: u07_l05_q01_beyond_one
type: multiple-choice
prompt: "A number line counts fourths: 0/4, 1/4, 2/4, 3/4, 4/4, 5/4. Which point is just past 1?"
choices: ["3/4", "4/4", "5/4", "1/5"]
correctAnswer: "5/4"
explanation: "4/4 is 1 whole, so 5/4 is one fourth past 1."
hint: "First find 4/4."
questionGoal: "Identify a fraction just greater than one whole."
misconception: "Thinking all fractions are less than 1."
```

```question
key: u07_l05_q02_whole_fraction
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "On a line split into sixths, 1 whole is"
sentenceAfter: "."
choices: ["1/6", "5/6", "6/6", "7/6"]
correctAnswer: "6/6"
explanation: "Six sixths make one whole."
hint: "The numerator equals the denominator at 1 whole."
questionGoal: "Locate one whole using fraction notation."
misconception: "Thinking 1/6 is one whole because numerator is 1."
```

```question
key: u07_l05_q03_order_past_one
type: order-items
prompt: "Put the fractions in order on a number line."
items: ["6/4", "3/4", "5/4", "4/4"]
correctOrder: ["3/4", "4/4", "5/4", "6/4"]
explanation: "Fourths continue past 1 after 4/4."
hint: "Count fourths from 0."
questionGoal: "Order fractions around and beyond 1."
misconception: "Restarting the fraction count after 1."
```

```question
key: u07_l05_q04_match_beyond
type: match-pairs
prompt: "Match each statement to a fraction."
pairs:
  - left: "one whole in thirds"
    right: "3/3"
  - left: "one third past 1"
    right: "4/3"
  - left: "two fourths past 1"
    right: "6/4"
  - left: "one fifth before 1"
    right: "4/5"
explanation: "Fraction intervals continue before and after 1."
hint: "Find the fraction that equals 1 first."
questionGoal: "Connect descriptions around 1 to fraction notation."
misconception: "Believing fraction notation stops at the whole."
```

```question
key: u07_l05_q05_type_past_one
type: text-input
prompt: "A number line is split into fifths. Type the fraction that is one fifth past 1."
acceptedAnswers: ["6/5"]
answerType: text
explanation: "5/5 is 1 whole, so one fifth past that is 6/5."
hint: "Start at 5/5."
questionGoal: "Produce a fraction greater than 1 on a number line."
misconception: "Writing 1/5 for one fifth past 1."
```

```question
key: u07_l05_q06_explain_greater_one
type: constructed-response
prompt: "Explain why 5/4 is greater than 1."
minWords: 8
sampleAnswer: "Four fourths make 1 whole, and 5/4 is one more fourth than that."
checklist: ["Mention 4/4 is 1", "Mention one more fourth"]
explanation: "A fraction can be greater than 1 when it counts more than all the parts in one whole."
hint: "Compare 5/4 to 4/4."
questionGoal: "Explain a fraction greater than one whole."
misconception: "Thinking the fraction bar means the number must be less than 1."
```

### Lesson 6: Whole Numbers As Fractions

```question
key: u07_l06_q01_one_as_fraction
type: multiple-choice
prompt: "Which fraction equals 1 whole?"
choices: ["3/3", "1/3", "2/3", "3/1"]
correctAnswer: "3/3"
explanation: "Three thirds make one whole."
hint: "The numerator and denominator are the same when all parts of one whole are counted."
questionGoal: "Recognize a fraction equal to 1."
misconception: "Thinking any fraction with 1 equals one whole."
```

```question
key: u07_l06_q02_fill_whole
type: fill-blank
prompt: "Complete the equation."
sentenceBefore: "1 whole ="
sentenceAfter: "fifths."
choices: ["1/5", "4/5", "5/5", "6/5"]
correctAnswer: "5/5"
explanation: "Five fifths make one whole."
hint: "All 5 equal parts are counted."
questionGoal: "Name one whole using fifths."
misconception: "Confusing one part with one whole."
```

```question
key: u07_l06_q03_match_wholes
type: match-pairs
prompt: "Match each whole to a fraction name."
pairs:
  - left: "1 whole split into 2 equal parts"
    right: "2/2"
  - left: "1 whole split into 4 equal parts"
    right: "4/4"
  - left: "1 whole split into 6 equal parts"
    right: "6/6"
  - left: "1 whole split into 8 equal parts"
    right: "8/8"
explanation: "Counting all equal parts of one whole gives a fraction equal to 1."
hint: "The numerator and denominator match."
questionGoal: "Match whole partitions to whole fractions."
misconception: "Thinking denominator alone names the whole."
```

```question
key: u07_l06_q04_not_one
type: multiple-choice
prompt: "Which fraction is not equal to 1 whole?"
choices: ["2/2", "4/4", "5/6", "8/8"]
correctAnswer: "5/6"
explanation: "5/6 is missing one sixth, so it is less than 1."
hint: "A whole has all equal parts counted."
questionGoal: "Distinguish whole fractions from less-than-one fractions."
misconception: "Thinking any large numerator makes a whole."
```

```question
key: u07_l06_q05_type_missing_numerator
type: text-input
prompt: "Type the missing numerator: ___/9 = 1 whole."
acceptedAnswers: ["9"]
answerType: number
explanation: "Nine ninths make 1 whole."
hint: "The numerator must match the denominator for one whole."
questionGoal: "Produce numerator for a fraction equal to 1."
misconception: "Writing 1 as numerator for every whole."
```

```question
key: u07_l06_q06_explain_whole_fraction
type: constructed-response
prompt: "Explain why 7/7 equals 1 whole."
minWords: 8
sampleAnswer: "The whole is split into 7 equal parts, and 7 of the 7 parts are counted."
checklist: ["Mention 7 equal parts", "Mention all 7 are counted"]
explanation: "A fraction names the whole when it counts every equal part in that whole."
hint: "Think of shading all the parts."
questionGoal: "Explain whole numbers as fractions."
misconception: "Believing fractions and whole numbers cannot be equal."
```

### Lesson 7: Connect Shapes, Strips, And Lines

```question
key: u07_l07_q01_same_fraction_models
type: multiple-choice
prompt: "Which model can also show 3/4?"
choices: ["A number line point three fourths from 0 to 1", "A shape with 3 unequal parts", "A strip split into 3 parts with 4 shaded", "A point at 4/3"]
correctAnswer: "A number line point three fourths from 0 to 1"
explanation: "3/4 can be shown as a distance on a number line or as 3 of 4 equal parts."
hint: "Look for 3 equal fourths."
questionGoal: "Recognize the same fraction across model types."
misconception: "Thinking fractions only appear in shaded shapes."
```

```question
key: u07_l07_q02_match_model_fraction
type: match-pairs
prompt: "Match each model description to a fraction."
pairs:
  - left: "3 of 5 equal parts shaded"
    right: "3/5"
  - left: "third tick on fourths line"
    right: "3/4"
  - left: "one part of 6 equal parts"
    right: "1/6"
  - left: "all 8 eighths counted"
    right: "8/8"
explanation: "Shapes, strips, and number lines can all name fractions."
hint: "Identify the whole and equal parts first."
questionGoal: "Translate model descriptions to fraction notation."
misconception: "Using different rules for different representations."
```

```question
key: u07_l07_q03_model_type
type: multiple-choice
prompt: "A point is halfway from 0 to 1 on a number line. Which fraction can it show?"
choices: ["1/2", "2/1", "1/3", "2/3"]
correctAnswer: "1/2"
explanation: "Halfway from 0 to 1 is one half."
hint: "Halfway means two equal intervals, and the point is one interval from 0."
questionGoal: "Connect benchmark location to fraction notation."
misconception: "Counting endpoints as equal parts."
```

```question
key: u07_l07_q04_fill_same_fraction
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "A shape with 2 of 4 equal parts shaded and a number-line point at 2/4 show the"
sentenceAfter: "fraction."
choices: ["same", "opposite", "larger", "unequal"]
correctAnswer: "same"
explanation: "Both models show 2/4."
hint: "Compare the fraction name in each model."
questionGoal: "Recognize equivalent representation of the same fraction name."
misconception: "Treating model type as changing the fraction."
```

```question
key: u07_l07_q05_type_fraction_from_line
type: text-input
prompt: "A line from 0 to 1 is split into 6 equal intervals. Type the fraction at the fourth tick after 0."
acceptedAnswers: ["4/6"]
answerType: text
explanation: "Four intervals of size one sixth make 4/6."
hint: "Count intervals from 0."
questionGoal: "Produce a number-line fraction label."
misconception: "Using the tick count as denominator."
```

```question
key: u07_l07_q06_explain_models
type: constructed-response
prompt: "Explain how a strip and a number line can both show 2/3."
minWords: 10
sampleAnswer: "A strip can shade 2 of 3 equal parts, and a number line can mark 2 equal thirds from 0."
checklist: ["Mention 2 of 3 equal parts", "Mention distance or intervals on a number line"]
explanation: "Both representations use the same equal-part structure."
hint: "Use the word \"thirds\" in both models."
questionGoal: "Explain cross-representation fraction meaning."
misconception: "Thinking number-line fractions are unrelated to area models."
```

### Lesson 8: Explain The Same Whole

```question
key: u07_l08_q01_same_whole_needed
type: multiple-choice
prompt: "Why can comparing 1/2 of a small cookie and 1/2 of a large cookie be tricky?"
choices: ["The wholes are different sizes.", "Halves are never equal.", "1/2 is always bigger than 1.", "Cookies cannot show fractions."]
correctAnswer: "The wholes are different sizes."
explanation: "A fraction depends on the size of the whole."
hint: "Compare the size of the whole cookie first."
questionGoal: "Recognize the same-whole issue."
misconception: "Assuming same fraction symbol always means same physical size."
```

```question
key: u07_l08_q02_valid_compare
type: multiple-choice
prompt: "Which comparison is valid?"
choices: ["1/3 and 2/3 of the same-size rectangle", "1/3 of a tiny rectangle and 1/3 of a huge rectangle", "2/4 of one pizza and 2/4 of a pizza twice as big", "One shaded part from two different wholes"]
correctAnswer: "1/3 and 2/3 of the same-size rectangle"
explanation: "Fractions can be compared when they refer to the same whole."
hint: "Look for same-size whole."
questionGoal: "Identify a valid same-whole comparison."
misconception: "Comparing fractions without checking wholes."
```

```question
key: u07_l08_q03_match_compare_status
type: match-pairs
prompt: "Match each situation to whether it can be compared fairly."
pairs:
  - left: "2/5 and 3/5 of the same strip"
    right: "can compare"
  - left: "1/2 of a small cake and 1/2 of a large cake"
    right: "need same whole"
  - left: "3/4 and 1/4 of one rectangle"
    right: "can compare in one whole"
  - left: "one part from unequal partitions"
    right: "not a valid fraction model"
explanation: "Same-whole and equal-part checks come before comparing."
hint: "Ask whether the wholes and parts are fair."
questionGoal: "Sort comparison situations by same-whole validity."
misconception: "Comparing based only on numerators and denominators."
```

```question
key: u07_l08_q04_same_whole_blank
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "To compare two fractions fairly, they should refer to the same"
sentenceAfter: "."
choices: ["whole", "color", "page number", "digit"]
correctAnswer: "whole"
explanation: "The whole sets the size of the fraction parts."
hint: "Think of the object being partitioned."
questionGoal: "State same-whole requirement."
misconception: "Ignoring the whole in fraction comparisons."
```

```question
key: u07_l08_q05_error_same_whole
type: error-correction
prompt: "Correct the reasoning."
sentence: "1/2 of a tiny bar is the same amount as 1/2 of a huge bar because both are 1/2."
acceptedAnswers:
  - "They are both 1/2 of their own whole, but the amounts may be different because the wholes are different sizes."
  - "The amounts may be different because the wholes are different sizes."
explanation: "Same fraction names can describe different physical sizes if the wholes differ."
hint: "Compare the size of each whole bar."
questionGoal: "Correct a same-whole misconception."
misconception: "Assuming equal fraction notation guarantees equal physical amount."
```

```question
key: u07_l08_q06_explain_same_whole
type: constructed-response
prompt: "Explain why the whole matters when naming a fraction."
minWords: 10
sampleAnswer: "The whole matters because the same fraction can be different sizes if the wholes are different sizes."
checklist: ["Mention whole size", "Mention fraction size"]
explanation: "Fractions name parts relative to a whole."
hint: "Think about half of a small object and half of a large object."
questionGoal: "Explain same-whole reasoning."
misconception: "Treating fraction size as independent from the whole."
```

## Unit 8: Equivalent Fractions And Fraction Comparison

### Lesson 1: Equivalent Means Same Amount

```question
key: u08_l01_q01_equivalent_meaning
type: multiple-choice
prompt: "What does it mean if two fractions are equivalent?"
choices: ["They name the same amount.", "They use the same numbers.", "They always look identical.", "They are both less than 1/2."]
correctAnswer: "They name the same amount."
explanation: "Equivalent fractions can have different numbers but represent the same quantity."
hint: "Equivalent means equal in value."
questionGoal: "Define equivalent fractions conceptually."
misconception: "Thinking different numerals always mean different amounts."
```

```question
key: u08_l01_q02_simple_equiv
type: multiple-choice
prompt: "Which fraction is equivalent to 1/2 in a same-size model?"
choices: ["2/4", "1/3", "3/4", "2/3"]
correctAnswer: "2/4"
explanation: "Two fourths cover the same amount as one half."
hint: "Think of splitting each half into two equal parts."
questionGoal: "Identify a common equivalent fraction."
misconception: "Comparing denominators as whole-number sizes."
```

```question
key: u08_l01_q03_match_equiv_models
type: match-pairs
prompt: "Match each fraction to an equivalent fraction."
pairs:
  - left: "1/2"
    right: "2/4"
  - left: "2/3"
    right: "4/6"
  - left: "3/4"
    right: "6/8"
  - left: "1/3"
    right: "2/6"
explanation: "Each pair can show the same amount with more equal parts."
hint: "Imagine splitting each part into two equal pieces."
questionGoal: "Recognize simple equivalent fractions."
misconception: "Thinking equivalent fractions require identical numerators or denominators."
```

```question
key: u08_l01_q04_not_equiv
type: multiple-choice
prompt: "Which pair is not equivalent?"
choices: ["1/2 and 2/4", "1/3 and 2/6", "2/4 and 3/4", "3/3 and 6/6"]
correctAnswer: "2/4 and 3/4"
explanation: "3/4 is larger than 2/4 because it has one more fourth."
hint: "Same denominator means compare numerators."
questionGoal: "Distinguish equivalent from non-equivalent fractions."
misconception: "Assuming same denominator pairs are equivalent."
```

```question
key: u08_l01_q05_type_equiv
type: text-input
prompt: "Type a fraction equivalent to 1/2 using fourths."
acceptedAnswers: ["2/4"]
answerType: text
explanation: "Two fourths is the same amount as one half."
hint: "A half has two fourth-size parts."
questionGoal: "Produce a simple equivalent fraction."
misconception: "Writing 1/4 because the denominator changed to fourths."
```

```question
key: u08_l01_q06_explain_equivalent
type: constructed-response
prompt: "Explain why 1/2 and 2/4 are equivalent."
minWords: 8
sampleAnswer: "They cover the same amount of the same whole; 2 fourths make one half."
checklist: ["Mention same amount", "Mention same whole or model"]
explanation: "Equivalent fractions name the same quantity."
hint: "Picture one rectangle split into halves, then into fourths."
questionGoal: "Explain equivalence with a model idea."
misconception: "Relying on symbols without quantity meaning."
```

### Lesson 2: Equivalent Fractions On Number Lines

```question
key: u08_l02_q01_same_point
type: multiple-choice
prompt: "On aligned number lines, which fraction lands at the same point as 1/2?"
choices: ["2/4", "1/4", "3/4", "4/2"]
correctAnswer: "2/4"
explanation: "1/2 and 2/4 are the same distance from 0."
hint: "Split the half into two fourths."
questionGoal: "Identify equivalent fractions as same number-line point."
misconception: "Thinking different labels must be different points."
```

```question
key: u08_l02_q02_fill_line_equiv
type: fill-blank
prompt: "Complete the number-line equivalence."
sentenceBefore: "3/6 is at the same point as"
sentenceAfter: "."
choices: ["1/2", "1/3", "2/6", "6/3"]
correctAnswer: "1/2"
explanation: "Three sixths is half of six sixths."
hint: "3 is half of 6."
questionGoal: "Connect sixths to halves on a number line."
misconception: "Comparing only denominators."
```

```question
key: u08_l02_q03_match_same_point
type: match-pairs
prompt: "Match fractions that land at the same point."
pairs:
  - left: "1/2"
    right: "3/6"
  - left: "1/4"
    right: "2/8"
  - left: "2/3"
    right: "4/6"
  - left: "3/4"
    right: "6/8"
explanation: "Equivalent fractions have the same number-line location."
hint: "Think about the distance from 0."
questionGoal: "Match equivalent fractions using number-line meaning."
misconception: "Treating equivalent fractions as different because tick marks differ."
```

```question
key: u08_l02_q04_order_with_equiv
type: order-items
prompt: "Put these points in order from left to right."
items: ["1/4", "2/4", "3/4", "4/4"]
correctOrder: ["1/4", "2/4", "3/4", "4/4"]
explanation: "Fourths increase by equal intervals from 0 to 1."
hint: "Count fourths from 0."
questionGoal: "Reinforce number-line order before equivalence."
misconception: "Treating denominator as making all fourths the same point."
```

```question
key: u08_l02_q05_type_same_point
type: text-input
prompt: "Type the fraction in fourths at the same point as 1/2."
acceptedAnswers: ["2/4"]
answerType: text
explanation: "2/4 is halfway from 0 to 1, just like 1/2."
hint: "How many fourths make half of the whole?"
questionGoal: "Produce an equivalent number-line fraction."
misconception: "Writing 1/4 because the point is a fraction."
```

```question
key: u08_l02_q06_explain_same_point
type: constructed-response
prompt: "Explain why equivalent fractions are at the same point on a number line."
minWords: 10
sampleAnswer: "They name the same distance from 0, even if the interval names are different."
checklist: ["Mention same distance from 0", "Mention different names or intervals"]
explanation: "A number line shows fraction magnitude as location."
hint: "Think about distance, not just labels."
questionGoal: "Explain equivalence as same number-line magnitude."
misconception: "Treating tick labels as unrelated locations."
```

### Lesson 3: Compare Same Denominators

```question
key: u08_l03_q01_compare_same_den
type: multiple-choice
prompt: "Which fraction is greater, 5/8 or 3/8?"
choices: ["5/8", "3/8", "They are equal", "Cannot compare"]
correctAnswer: "5/8"
explanation: "Both fractions use eighths, and 5 eighths is more than 3 eighths."
hint: "Same denominator means same-size parts."
questionGoal: "Compare same-denominator fractions."
misconception: "Comparing denominators even when equal."
```

```question
key: u08_l03_q02_symbol_same_den
type: fill-blank
prompt: "Choose the symbol: 2/6 ___ 5/6"
sentenceBefore: "2/6"
sentenceAfter: "5/6"
choices: ["<", ">", "="]
correctAnswer: "<"
explanation: "Both are sixths, and 2 sixths is less than 5 sixths."
hint: "Compare the numerators because the parts are the same size."
questionGoal: "Use comparison symbols for same-denominator fractions."
misconception: "Thinking smaller numerator means bigger because denominator is larger."
```

```question
key: u08_l03_q03_match_greater_same_den
type: match-pairs
prompt: "Match each pair to the greater fraction."
pairs:
  - left: "1/4 or 3/4"
    right: "3/4"
  - left: "6/8 or 4/8"
    right: "6/8"
  - left: "2/5 or 5/5"
    right: "5/5"
  - left: "7/10 or 3/10"
    right: "7/10"
explanation: "Same denominators mean the parts are same size, so more parts is greater."
hint: "Look at the numerator."
questionGoal: "Practice identifying greater same-denominator fractions."
misconception: "Ignoring numerator count."
```

```question
key: u08_l03_q04_type_compare
type: text-input
prompt: "Type the greater fraction: 4/7 or 6/7"
acceptedAnswers: ["6/7"]
answerType: text
explanation: "Six sevenths is greater than four sevenths."
hint: "Both are sevenths; compare 4 and 6."
questionGoal: "Produce the greater same-denominator fraction."
misconception: "Comparing fraction symbols as whole numbers incorrectly."
```

```question
key: u08_l03_q05_error_same_den
type: error-correction
prompt: "Correct the comparison."
sentence: "2/9 > 7/9 because 2 is smaller."
acceptedAnswers:
  - "2/9 < 7/9 because 7 ninths is more than 2 ninths."
  - "2/9 < 7/9"
explanation: "With the same denominator, the larger numerator means more same-size parts."
hint: "Both fractions are ninths."
questionGoal: "Correct same-denominator comparison reasoning."
misconception: "Reversing comparison of numerators."
```

```question
key: u08_l03_q06_explain_same_den
type: constructed-response
prompt: "Explain why 6/10 is greater than 4/10."
minWords: 8
sampleAnswer: "Both fractions count tenths, and 6 tenths is more than 4 tenths."
checklist: ["Mention same-size tenths", "Compare 6 and 4"]
explanation: "Same denominator means each part is the same size."
hint: "Use the word \"tenths.\""
questionGoal: "Explain same-denominator comparison."
misconception: "Giving an answer without reasoning about same-size parts."
```

### Lesson 4: Compare Same Numerators

```question
key: u08_l04_q01_compare_same_num
type: multiple-choice
prompt: "Which fraction is greater, 3/4 or 3/8?"
choices: ["3/4", "3/8", "They are equal", "Cannot compare"]
correctAnswer: "3/4"
explanation: "Fourths are larger parts than eighths, so 3 fourths is greater than 3 eighths."
hint: "Same numerator means compare the size of each part."
questionGoal: "Compare same-numerator fractions by unit size."
misconception: "Larger denominator means larger fraction."
```

```question
key: u08_l04_q02_unit_size
type: multiple-choice
prompt: "Which unit fraction is larger?"
choices: ["1/3", "1/6", "They are equal", "Cannot tell"]
correctAnswer: "1/3"
explanation: "Thirds are larger pieces than sixths when the whole is the same."
hint: "Fewer equal parts means each part is larger."
questionGoal: "Compare unit fraction sizes."
misconception: "Treating denominator as whole-number size."
```

```question
key: u08_l04_q03_match_same_num
type: match-pairs
prompt: "Match each pair to the greater fraction."
pairs:
  - left: "2/3 or 2/5"
    right: "2/3"
  - left: "4/6 or 4/8"
    right: "4/6"
  - left: "1/4 or 1/2"
    right: "1/2"
  - left: "3/10 or 3/5"
    right: "3/5"
explanation: "With the same numerator, larger unit parts make the greater fraction."
hint: "The smaller denominator means larger parts."
questionGoal: "Practice same-numerator comparisons."
misconception: "Choosing the larger denominator automatically."
```

```question
key: u08_l04_q04_symbol_same_num
type: fill-blank
prompt: "Choose the symbol: 5/6 ___ 5/9"
sentenceBefore: "5/6"
sentenceAfter: "5/9"
choices: [">", "<", "="]
correctAnswer: ">"
explanation: "Sixths are larger than ninths, so 5/6 is greater than 5/9."
hint: "Both count 5 parts; compare part size."
questionGoal: "Use comparison symbols for same-numerator fractions."
misconception: "Larger denominator means larger amount."
```

```question
key: u08_l04_q05_error_same_num
type: error-correction
prompt: "Correct the reasoning."
sentence: "2/8 > 2/4 because 8 is greater than 4."
acceptedAnswers:
  - "2/8 < 2/4 because eighths are smaller than fourths."
  - "2/8 < 2/4"
explanation: "If the numerator is the same, the fraction with larger parts is greater."
hint: "Compare one eighth to one fourth."
questionGoal: "Correct denominator-as-size misconception."
misconception: "Comparing denominators as whole numbers."
```

```question
key: u08_l04_q06_explain_same_num
type: constructed-response
prompt: "Explain why 3/5 is greater than 3/10."
minWords: 8
sampleAnswer: "Both count 3 parts, but fifths are larger than tenths."
checklist: ["Mention same numerator", "Compare fifths and tenths"]
explanation: "Same numerator comparisons depend on unit fraction size."
hint: "Think about cutting the same whole into 5 parts or 10 parts."
questionGoal: "Explain same-numerator comparison."
misconception: "Giving a rule without unit-size reasoning."
```

### Lesson 5: Use Benchmarks To Compare

```question
key: u08_l05_q01_half_benchmark
type: multiple-choice
prompt: "Which fraction is greater than 1/2?"
choices: ["3/4", "1/4", "2/5", "1/3"]
correctAnswer: "3/4"
explanation: "Three fourths is more than half of the whole."
hint: "Half of fourths is 2/4."
questionGoal: "Compare a fraction to the benchmark 1/2."
misconception: "Ignoring benchmark size."
```

```question
key: u08_l05_q02_less_than_half
type: fill-blank
prompt: "Complete the comparison."
sentenceBefore: "2/6 is"
sentenceAfter: "1/2."
choices: ["less than", "equal to", "greater than"]
correctAnswer: "less than"
explanation: "Half of sixths is 3/6, and 2/6 is less than 3/6."
hint: "Find the fraction equal to half first."
questionGoal: "Use a benchmark to compare with sixths."
misconception: "Thinking any numerator 2 means near half."
```

```question
key: u08_l05_q03_match_benchmark
type: match-pairs
prompt: "Match each fraction to its benchmark relationship."
pairs:
  - left: "1/8"
    right: "near 0"
  - left: "4/8"
    right: "equal to 1/2"
  - left: "7/8"
    right: "near 1"
  - left: "5/8"
    right: "greater than 1/2"
explanation: "Benchmarks help estimate fraction size."
hint: "Compare each numerator to half or all of the denominator."
questionGoal: "Relate fractions to 0, 1/2, and 1."
misconception: "Treating benchmark labels as memorized without magnitude."
```

```question
key: u08_l05_q04_order_by_benchmark
type: order-items
prompt: "Put the fractions in order from least to greatest."
items: ["6/6", "1/6", "3/6", "5/6"]
correctOrder: ["1/6", "3/6", "5/6", "6/6"]
explanation: "1/6 is near 0, 3/6 is 1/2, 5/6 is near 1, and 6/6 is 1."
hint: "Use 0, 1/2, and 1 as landmarks."
questionGoal: "Order fractions using benchmarks."
misconception: "Ignoring fraction magnitude."
```

```question
key: u08_l05_q05_type_half_equiv
type: text-input
prompt: "Type the fraction in tenths that is equal to 1/2."
acceptedAnswers: ["5/10"]
answerType: text
explanation: "Five tenths is half of ten tenths."
hint: "Half of 10 is 5."
questionGoal: "Produce a benchmark equivalent to 1/2."
misconception: "Writing 1/10 because numerator in 1/2 is 1."
```

```question
key: u08_l05_q06_explain_benchmark
type: constructed-response
prompt: "Explain how you know 7/8 is close to 1."
minWords: 8
sampleAnswer: "One whole is 8/8, and 7/8 is only one eighth away from that."
checklist: ["Mention 8/8 is 1", "Mention one eighth away"]
explanation: "Benchmarks help judge how close a fraction is to a familiar amount."
hint: "Compare 7/8 to 8/8."
questionGoal: "Explain benchmark reasoning near 1."
misconception: "Comparing only the numerator to 1."
```

### Lesson 6: Same Whole Or Not?

```question
key: u08_l06_q01_same_whole_valid
type: multiple-choice
prompt: "Which comparison is fair?"
choices: ["2/3 and 1/3 of the same rectangle", "1/2 of a tiny circle and 1/2 of a huge circle", "3/4 of two different-size bars", "one shaded part from unequal pieces"]
correctAnswer: "2/3 and 1/3 of the same rectangle"
explanation: "A fair comparison uses the same whole."
hint: "Look for the same object or same-size whole."
questionGoal: "Identify a same-whole comparison."
misconception: "Comparing fractions across different-size wholes."
```

```question
key: u08_l06_q02_not_enough_info
type: multiple-choice
prompt: "Two pictures show 1/2 shaded, but one whole is much larger. What can you say?"
choices: ["They are each half of their own whole, but not the same physical amount.", "They must be the same physical amount.", "The smaller picture is greater.", "Fractions cannot be shaded."]
correctAnswer: "They are each half of their own whole, but not the same physical amount."
explanation: "The wholes are different sizes."
hint: "Same fraction name does not always mean same physical size."
questionGoal: "Reason about different-size wholes."
misconception: "Assuming equal symbols mean equal physical amounts."
```

```question
key: u08_l06_q03_match_same_whole
type: match-pairs
prompt: "Match each situation to the best judgment."
pairs:
  - left: "same-size wholes, equal parts"
    right: "fair to compare"
  - left: "different-size wholes"
    right: "not a fair physical comparison"
  - left: "unequal parts"
    right: "not a valid fraction model"
  - left: "same whole, same denominator"
    right: "compare numerators"
explanation: "Same-whole and equal-part checks protect fraction comparisons."
hint: "First check the whole, then the parts."
questionGoal: "Classify comparison conditions."
misconception: "Skipping model validity checks."
```

```question
key: u08_l06_q04_fill_same_whole
type: fill-blank
prompt: "Complete the rule."
sentenceBefore: "Before comparing fractions in pictures, check that the wholes are the same"
sentenceAfter: "."
choices: ["size", "color", "name", "number"]
correctAnswer: "size"
explanation: "The whole's size affects the size of the fraction parts."
hint: "Think about a small pizza and a large pizza."
questionGoal: "State the same-size whole requirement."
misconception: "Thinking color or shape matters more than whole size."
```

```question
key: u08_l06_q05_error_whole
type: error-correction
prompt: "Correct the reasoning."
sentence: "1/3 of any cake is always the same amount."
acceptedAnswers:
  - "1/3 of cakes can be different amounts if the cakes are different sizes."
  - "1/3 depends on the size of the whole cake."
explanation: "One third depends on the size of the whole being split."
hint: "Compare one third of a small cake and one third of a large cake."
questionGoal: "Correct same-whole misconception."
misconception: "Treating fraction amount as independent of whole size."
```

```question
key: u08_l06_q06_explain_valid_compare
type: constructed-response
prompt: "Explain why 2/5 and 4/5 of the same strip can be compared."
minWords: 8
sampleAnswer: "They use the same whole and same-size fifths, so I can compare the numerators."
checklist: ["Mention same whole", "Mention same-size fifths"]
explanation: "Same whole and equal parts make the comparison meaningful."
hint: "Use the words \"same strip.\""
questionGoal: "Explain why a comparison is valid."
misconception: "Comparing without naming same-whole support."
```

### Lesson 7: Choose The Comparison Reason

```question
key: u08_l07_q01_reason_same_den
type: multiple-choice
prompt: "What is the best reason for comparing 3/8 and 5/8?"
choices: ["Same denominator: compare numerators.", "Same numerator: compare denominators.", "Different wholes, cannot compare.", "Use addition."]
correctAnswer: "Same denominator: compare numerators."
explanation: "Both fractions count eighths."
hint: "Look at the denominators."
questionGoal: "Choose reasoning for same-denominator comparison."
misconception: "Using the wrong comparison rule."
```

```question
key: u08_l07_q02_reason_same_num
type: multiple-choice
prompt: "What is the best reason for comparing 2/3 and 2/7?"
choices: ["Same numerator: compare unit size.", "Same denominator: compare numerators.", "They are equivalent.", "Add the denominators."]
correctAnswer: "Same numerator: compare unit size."
explanation: "Both count 2 parts, but thirds are larger than sevenths."
hint: "Same numerator means part size matters."
questionGoal: "Choose reasoning for same-numerator comparison."
misconception: "Comparing denominator as larger whole number."
```

```question
key: u08_l07_q03_match_reason
type: match-pairs
prompt: "Match each comparison to the best reason."
pairs:
  - left: "4/6 vs 5/6"
    right: "same denominator"
  - left: "3/4 vs 3/8"
    right: "same numerator"
  - left: "2/4 vs 1/2"
    right: "equivalent fractions"
  - left: "5/8 vs 1/2"
    right: "benchmark"
explanation: "Different fraction pairs call for different reasoning."
hint: "Look for what is the same or familiar."
questionGoal: "Match fraction pairs to reasoning types."
misconception: "Applying one comparison rule to every pair."
```

```question
key: u08_l07_q04_choose_symbol_reason
type: fill-blank
prompt: "Choose the symbol using the best reason: 2/5 ___ 2/9"
sentenceBefore: "2/5"
sentenceAfter: "2/9"
choices: [">", "<", "="]
correctAnswer: ">"
explanation: "Same numerator: fifths are larger than ninths, so 2/5 is greater."
hint: "Compare the size of one fifth and one ninth."
questionGoal: "Apply chosen same-numerator reasoning."
misconception: "Larger denominator means larger fraction."
```

```question
key: u08_l07_q05_error_reason
type: error-correction
prompt: "Correct the reasoning."
sentence: "4/7 < 2/7 because 2 is smaller."
acceptedAnswers:
  - "4/7 > 2/7 because both are sevenths and 4 sevenths is more than 2 sevenths."
  - "4/7 > 2/7"
explanation: "With the same denominator, compare numerators."
hint: "Both fractions count sevenths."
questionGoal: "Correct a mismatched comparison reason."
misconception: "Reversing or misapplying comparison reasoning."
```

```question
key: u08_l07_q06_explain_reason_choice
type: constructed-response
prompt: "Compare 3/6 and 1/2, and explain what reason you used."
minWords: 8
sampleAnswer: "They are equal because 3/6 and 1/2 are equivalent fractions at the same point."
checklist: ["State the comparison", "Name equivalence or same point"]
explanation: "3/6 is equivalent to 1/2."
hint: "Think about a number line split into sixths."
questionGoal: "Choose and explain equivalence reasoning."
misconception: "Comparing only visible numerators and denominators."
```

## Unit 9: Measurement, Data, And Applied Quantitative Reasoning

### Lesson 1: Choose The Attribute And Unit

```question
key: u09_l01_q01_attribute_length
type: multiple-choice
prompt: "Which attribute would you measure to find how long a pencil is?"
choices: ["length", "mass", "liquid volume", "elapsed time"]
correctAnswer: "length"
explanation: "How long something is describes length."
hint: "Think about what a ruler measures."
questionGoal: "Identify length as a measurement attribute."
misconception: "Treating all measurement words as interchangeable."
```

```question
key: u09_l01_q02_best_unit
type: multiple-choice
prompt: "Which unit is reasonable for the mass of a backpack?"
choices: ["kilograms", "liters", "minutes", "inches"]
correctAnswer: "kilograms"
explanation: "Mass can be measured in grams or kilograms."
hint: "Mass tells how heavy something is."
questionGoal: "Choose a reasonable unit for mass."
misconception: "Choosing units by familiar word instead of attribute."
```

```question
key: u09_l01_q03_match_unit_attribute
type: match-pairs
prompt: "Match each attribute to a useful unit."
pairs:
  - left: "length of a desk"
    right: "centimeters"
  - left: "mass of a dog"
    right: "kilograms"
  - left: "water in a bottle"
    right: "milliliters"
  - left: "time for recess"
    right: "minutes"
explanation: "Units must match the attribute being measured."
hint: "Ask what is being measured: length, mass, volume, or time."
questionGoal: "Match attributes to units."
misconception: "Attaching units without considering the attribute."
```

```question
key: u09_l01_q04_fill_attribute
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "Liters measure"
sentenceAfter: "."
choices: ["liquid volume", "length", "mass", "area"]
correctAnswer: "liquid volume"
explanation: "Liters measure how much liquid a container can hold."
hint: "Think about bottles and jugs."
questionGoal: "Identify liquid-volume unit meaning."
misconception: "Confusing liters with kilograms or meters."
```

```question
key: u09_l01_q05_type_unit
type: text-input
prompt: "Type a reasonable unit for the length of a classroom door: inches or kilograms?"
acceptedAnswers: ["inches"]
answerType: text
explanation: "Inches measure length; kilograms measure mass."
hint: "A door's height or width is a length."
questionGoal: "Produce an appropriate length unit from a choice."
misconception: "Choosing a mass unit for a length measurement."
```

```question
key: u09_l01_q06_explain_unit
type: constructed-response
prompt: "Explain why liters would not be used to measure how heavy a book is."
minWords: 8
sampleAnswer: "Liters measure liquid volume, but how heavy a book is needs a mass unit."
checklist: ["Mention liters measure volume", "Mention mass or weight"]
explanation: "The unit must match the attribute being measured."
hint: "Ask what liters measure."
questionGoal: "Explain attribute-unit matching."
misconception: "Thinking any measurement unit can describe any object."
```

### Lesson 2: Elapsed Time On A Timeline

```question
key: u09_l02_q01_elapsed_simple
type: multiple-choice
prompt: "A movie starts at 2:00 and ends at 2:45. How much time passes?"
choices: ["30 minutes", "45 minutes", "60 minutes", "2 hours"]
correctAnswer: "45 minutes"
explanation: "From 2:00 to 2:45 is 45 minutes."
hint: "Count by 5s or 15s from 2:00 to 2:45."
questionGoal: "Find elapsed time within one hour."
misconception: "Reading the end minutes as the answer without checking start time in harder cases."
```

```question
key: u09_l02_q02_cross_hour
type: multiple-choice
prompt: "Practice starts at 3:40 and ends at 4:10. How long is practice?"
choices: ["20 minutes", "30 minutes", "50 minutes", "70 minutes"]
correctAnswer: "30 minutes"
explanation: "3:40 to 4:00 is 20 minutes, then 10 more minutes makes 30."
hint: "Jump to the next hour first."
questionGoal: "Solve elapsed time across an hour."
misconception: "Subtracting minutes as base-ten numbers."
```

```question
key: u09_l02_q03_order_times
type: order-items
prompt: "Put the timeline jumps in order from 1:35 to 2:15."
items: ["2:00 to 2:15", "1:35 to 2:00", "total 40 minutes"]
correctOrder: ["1:35 to 2:00", "2:00 to 2:15", "total 40 minutes"]
explanation: "Jump to the hour first, then add the remaining minutes."
hint: "Timelines move forward in time."
questionGoal: "Sequence elapsed-time jumps."
misconception: "Combining times without a timeline path."
```

```question
key: u09_l02_q04_fill_elapsed
type: fill-blank
prompt: "Complete the elapsed time."
sentenceBefore: "From 8:20 to 8:55 is"
sentenceAfter: "minutes."
choices: ["25", "30", "35", "75"]
correctAnswer: "35"
explanation: "8:20 to 8:55 is 35 minutes."
hint: "Count up from 20 minutes to 55 minutes."
questionGoal: "Find elapsed minutes within an hour."
misconception: "Subtracting hour numbers or choosing a nearby multiple."
```

```question
key: u09_l02_q05_type_end_time
type: text-input
prompt: "A game starts at 5:15 and lasts 30 minutes. Type the end time."
acceptedAnswers: ["5:45", "5 45"]
answerType: text
explanation: "30 minutes after 5:15 is 5:45."
hint: "Add 30 minutes to the minute part."
questionGoal: "Find an end time from start and elapsed time."
misconception: "Adding 30 to the hour instead of minutes."
```

```question
key: u09_l02_q06_explain_elapsed
type: constructed-response
prompt: "Explain how to find the time from 9:50 to 10:20."
minWords: 8
sampleAnswer: "Jump 10 minutes to 10:00, then 20 more minutes to 10:20, for 30 minutes."
checklist: ["Jump to 10:00", "Include total 30 minutes"]
explanation: "A timeline helps when elapsed time crosses an hour."
hint: "Break the time at 10:00."
questionGoal: "Explain elapsed-time reasoning across an hour."
misconception: "Treating time like ordinary base-ten subtraction."
```

### Lesson 3: Measure And Estimate Length

```question
key: u09_l03_q01_best_length_unit
type: multiple-choice
prompt: "Which unit is best for the length of a pencil?"
choices: ["centimeters", "kilograms", "liters", "hours"]
correctAnswer: "centimeters"
explanation: "Centimeters measure shorter lengths."
hint: "A ruler measures length."
questionGoal: "Choose a length unit."
misconception: "Confusing length with mass or volume."
```

```question
key: u09_l03_q02_reasonable_length
type: multiple-choice
prompt: "Which measurement is most reasonable for the length of a classroom?"
choices: ["8 meters", "8 milliliters", "8 grams", "8 minutes"]
correctAnswer: "8 meters"
explanation: "Meters are reasonable for room length."
hint: "A classroom length is a distance."
questionGoal: "Judge a reasonable length measurement."
misconception: "Ignoring units and focusing only on the number."
```

```question
key: u09_l03_q03_match_length_units
type: match-pairs
prompt: "Match each object to a reasonable length unit."
pairs:
  - left: "paperclip"
    right: "centimeters"
  - left: "soccer field"
    right: "meters"
  - left: "book width"
    right: "inches"
  - left: "hallway length"
    right: "yards"
explanation: "Choose a unit that fits the size and attribute."
hint: "Smaller objects use smaller length units."
questionGoal: "Match objects to reasonable length units."
misconception: "Choosing units randomly or by familiarity."
```

```question
key: u09_l03_q04_fill_ruler_start
type: fill-blank
prompt: "Complete the ruler rule."
sentenceBefore: "When measuring with a ruler, start at"
sentenceAfter: "."
choices: ["0", "1", "the middle", "the largest number"]
correctAnswer: "0"
explanation: "Length is measured from the zero mark."
hint: "The distance starts before the 1 mark."
questionGoal: "Reinforce ruler starting point."
misconception: "Starting measurement at 1."
```

```question
key: u09_l03_q05_type_difference_length
type: text-input
prompt: "A ribbon is 42 centimeters long. You cut off 18 centimeters. Type how many centimeters remain."
acceptedAnswers: ["24"]
answerType: number
explanation: "42 - 18 = 24 centimeters."
hint: "This is a take-away length problem."
questionGoal: "Solve a length subtraction problem."
misconception: "Dropping the unit or adding lengths."
```

```question
key: u09_l03_q06_explain_estimate_length
type: constructed-response
prompt: "Explain why 2 centimeters is not reasonable for the length of a classroom door."
minWords: 8
sampleAnswer: "2 centimeters is very short, and a door is much taller than that."
checklist: ["Mention centimeters are too small", "Mention door length or height"]
explanation: "Estimation helps judge whether a measurement makes sense."
hint: "Compare 2 centimeters to your finger width."
questionGoal: "Explain reasonableness of length measurement."
misconception: "Accepting any number-unit pair without real-world sense."
```

### Lesson 4: Mass And Liquid Volume Problems

```question
key: u09_l04_q01_mass_unit
type: multiple-choice
prompt: "Which unit measures mass?"
choices: ["grams", "liters", "minutes", "centimeters"]
correctAnswer: "grams"
explanation: "Grams measure mass."
hint: "Mass tells how heavy something is."
questionGoal: "Identify a mass unit."
misconception: "Confusing mass and volume units."
```

```question
key: u09_l04_q02_volume_unit
type: multiple-choice
prompt: "Which unit measures liquid volume?"
choices: ["liters", "kilograms", "meters", "inches"]
correctAnswer: "liters"
explanation: "Liters measure how much liquid a container holds."
hint: "Think of a water bottle or jug."
questionGoal: "Identify a liquid-volume unit."
misconception: "Confusing liquid volume with mass."
```

```question
key: u09_l04_q03_match_mass_volume
type: match-pairs
prompt: "Match each item to a likely measurement."
pairs:
  - left: "mass of an apple"
    right: "grams"
  - left: "mass of a child"
    right: "kilograms"
  - left: "water in a cup"
    right: "milliliters"
  - left: "water in a bucket"
    right: "liters"
explanation: "Larger amounts use larger units; mass and volume use different units."
hint: "First decide mass or liquid volume."
questionGoal: "Match contexts to mass and volume units."
misconception: "Choosing based on object size alone."
```

```question
key: u09_l04_q04_compute_mass
type: text-input
prompt: "A bag has 350 grams of rice. Another bag has 275 grams. Type the total grams."
acceptedAnswers: ["625"]
answerType: number
explanation: "350 + 275 = 625 grams."
hint: "Add the two masses."
questionGoal: "Solve an addition problem with mass units."
misconception: "Omitting or changing the unit."
```

```question
key: u09_l04_q05_fill_volume
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "A bottle with 500 milliliters and another with 300 milliliters have"
sentenceAfter: "milliliters in all."
choices: ["200", "500", "800", "1500"]
correctAnswer: "800"
explanation: "500 + 300 = 800 milliliters."
hint: "\"In all\" means add."
questionGoal: "Solve a liquid-volume addition problem."
misconception: "Subtracting because there are two quantities."
```

```question
key: u09_l04_q06_explain_attribute
type: constructed-response
prompt: "Explain the difference between measuring mass and measuring liquid volume."
minWords: 10
sampleAnswer: "Mass tells how heavy something is, and liquid volume tells how much liquid a container holds."
checklist: ["Define mass", "Define liquid volume"]
explanation: "These are different attributes, so they use different units."
hint: "Think \"heavy\" for mass and \"holds liquid\" for volume."
questionGoal: "Explain distinction between mass and liquid volume."
misconception: "Treating grams and liters as interchangeable."
```

### Lesson 5: Scaled Picture Graphs

```question
key: u09_l05_q01_read_key
type: multiple-choice
prompt: "A picture graph key says each star = 5 votes. A row has 4 stars. How many votes is that?"
choices: ["4", "5", "9", "20"]
correctAnswer: "20"
explanation: "Four stars at 5 votes each is 4 x 5 = 20."
hint: "Use the key for every star."
questionGoal: "Read a scaled picture graph key."
misconception: "Counting each picture as 1."
```

```question
key: u09_l05_q02_picture_total
type: text-input
prompt: "Each picture stands for 2 books. A row has 7 pictures. Type the number of books."
acceptedAnswers: ["14"]
answerType: number
explanation: "7 pictures times 2 books each is 14 books."
hint: "Count by 2s for each picture."
questionGoal: "Compute a total from a scaled picture graph."
misconception: "Ignoring the scale."
```

```question
key: u09_l05_q03_match_scale
type: match-pairs
prompt: "Match each graph row to its total."
pairs:
  - left: "3 pictures, each = 4"
    right: "12"
  - left: "5 pictures, each = 2"
    right: "10"
  - left: "4 pictures, each = 5"
    right: "20"
  - left: "6 pictures, each = 3"
    right: "18"
explanation: "Multiply the number of pictures by the value of each picture."
hint: "The key tells the value of one picture."
questionGoal: "Interpret several scaled picture graph rows."
misconception: "Counting pictures by ones regardless of key."
```

```question
key: u09_l05_q04_compare_rows
type: multiple-choice
prompt: "Each symbol = 10 cans. Class A has 3 symbols. Class B has 5 symbols. How many more cans does Class B have?"
choices: ["2", "10", "20", "80"]
correctAnswer: "20"
explanation: "Class B has 50 cans and Class A has 30 cans; the difference is 20."
hint: "Find each total using the scale before subtracting."
questionGoal: "Compare scaled picture graph values."
misconception: "Subtracting symbols without applying the scale."
```

```question
key: u09_l05_q05_fill_scale
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "If each picture means 5, then 6 pictures mean"
sentenceAfter: "."
choices: ["6", "11", "30", "56"]
correctAnswer: "30"
explanation: "6 x 5 = 30."
hint: "Count by 5s six times."
questionGoal: "Apply graph scale to picture count."
misconception: "Adding pictures and scale."
```

```question
key: u09_l05_q06_explain_scale
type: constructed-response
prompt: "Explain why you must read the key before answering a picture graph question."
minWords: 8
sampleAnswer: "The key tells what each picture is worth, so a picture may mean more than 1."
checklist: ["Mention key", "Mention value of each picture"]
explanation: "Scaled graphs use symbols to represent a set amount."
hint: "Think about one picture meaning 2, 5, or 10."
questionGoal: "Explain why scale matters in picture graphs."
misconception: "Treating every symbol as one item."
```

### Lesson 6: Scaled Bar Graphs And Tables

```question
key: u09_l06_q01_bar_scale
type: multiple-choice
prompt: "A bar graph scale counts by 5s. A bar reaches the third mark after 0. What value does it show?"
choices: ["3", "5", "15", "30"]
correctAnswer: "15"
explanation: "The marks are 5, 10, 15."
hint: "Count by the scale, not by ones."
questionGoal: "Read a scaled bar graph value."
misconception: "Counting marks as ones."
```

```question
key: u09_l06_q02_table_total
type: text-input
prompt: "A table shows 24 apples, 18 oranges, and 30 bananas. Type the total fruit."
acceptedAnswers: ["72"]
answerType: number
explanation: "24 + 18 + 30 = 72."
hint: "Add all three table values."
questionGoal: "Use a table to find a total."
misconception: "Comparing values when total is asked."
```

```question
key: u09_l06_q03_match_graph_values
type: match-pairs
prompt: "Match each scaled bar description to its value."
pairs:
  - left: "scale by 2, bar at 6th mark"
    right: "12"
  - left: "scale by 5, bar at 4th mark"
    right: "20"
  - left: "scale by 10, bar at 7th mark"
    right: "70"
  - left: "scale by 3, bar at 5th mark"
    right: "15"
explanation: "Multiply the mark count by the scale interval."
hint: "The first mark after 0 equals one scale jump."
questionGoal: "Interpret bar graph scale intervals."
misconception: "Treating each grid mark as 1."
```

```question
key: u09_l06_q04_more_fewer
type: multiple-choice
prompt: "A table shows 36 soccer votes and 24 basketball votes. How many more votes did soccer get?"
choices: ["12", "24", "36", "60"]
correctAnswer: "12"
explanation: "36 - 24 = 12."
hint: "\"How many more\" asks for the difference."
questionGoal: "Answer a data comparison question."
misconception: "Adding compared categories."
```

```question
key: u09_l06_q05_fill_interval
type: fill-blank
prompt: "Complete the scale: 0, 10, 20, ___, 40."
sentenceBefore: "The missing scale label is"
sentenceAfter: "."
choices: ["25", "30", "35", "50"]
correctAnswer: "30"
explanation: "The scale counts by 10s."
hint: "Add the same interval each time."
questionGoal: "Identify a missing graph scale label."
misconception: "Using uneven scale intervals."
```

```question
key: u09_l06_q06_explain_bar_scale
type: constructed-response
prompt: "Explain how to read a bar graph with a scale that counts by 5."
minWords: 8
sampleAnswer: "I count each mark by 5, so the marks are 5, 10, 15, and so on."
checklist: ["Mention count by 5", "Mention marks or intervals"]
explanation: "The scale tells the value of each step on the graph."
hint: "Do not count each line as 1."
questionGoal: "Explain scaled bar graph reading."
misconception: "Ignoring the scale."
```

### Lesson 7: Line Plots And Fractional Lengths

```question
key: u09_l07_q01_line_plot_count
type: multiple-choice
prompt: "A line plot has 4 Xs above 3 inches. How many objects measured 3 inches?"
choices: ["3", "4", "7", "12"]
correctAnswer: "4"
explanation: "Each X represents one measurement."
hint: "Count the Xs above the value."
questionGoal: "Read frequency from a line plot."
misconception: "Reading the label as the count."
```

```question
key: u09_l07_q02_fraction_tick
type: multiple-choice
prompt: "A line plot scale goes 0, 1/4, 2/4, 3/4, 1. Which label is halfway?"
choices: ["1/4", "2/4", "3/4", "4/4 only"]
correctAnswer: "2/4"
explanation: "2/4 is the same as 1/2, halfway from 0 to 1."
hint: "Half of 4 fourths is 2 fourths."
questionGoal: "Read fractional marks on a line plot scale."
misconception: "Treating fraction labels as whole-number counts."
```

```question
key: u09_l07_q03_match_frequency
type: match-pairs
prompt: "Match each line-plot description to the count."
pairs:
  - left: "2 Xs above 1/2 inch"
    right: "2 measurements"
  - left: "5 Xs above 3 inches"
    right: "5 measurements"
  - left: "1 X above 4 inches"
    right: "1 measurement"
  - left: "0 Xs above 2 inches"
    right: "0 measurements"
explanation: "The number of Xs tells how many data values are at that mark."
hint: "Count Xs, not the number label."
questionGoal: "Interpret line plot frequencies."
misconception: "Confusing measurement value with frequency."
```

```question
key: u09_l07_q04_total_xs
type: text-input
prompt: "A line plot has 3 Xs over 2 inches, 4 Xs over 3 inches, and 1 X over 4 inches. Type the total number of measurements."
acceptedAnswers: ["8"]
answerType: number
explanation: "3 + 4 + 1 = 8 measurements."
hint: "Add the Xs, not the inch labels."
questionGoal: "Find total data count from a line plot."
misconception: "Adding measurement labels instead of frequencies."
```

```question
key: u09_l07_q05_compare_frequency
type: multiple-choice
prompt: "A line plot has 6 Xs above 1/4 inch and 2 Xs above 3/4 inch. How many more measurements are 1/4 inch?"
choices: ["2", "4", "6", "8"]
correctAnswer: "4"
explanation: "6 - 2 = 4 more measurements."
hint: "Compare the number of Xs."
questionGoal: "Compare frequencies on a line plot."
misconception: "Comparing fraction sizes instead of counts."
```

```question
key: u09_l07_q06_explain_line_plot
type: constructed-response
prompt: "Explain what an X means on a line plot."
minWords: 8
sampleAnswer: "Each X means one measurement with the value shown below it."
checklist: ["Mention one measurement", "Mention the value below"]
explanation: "Line plots show frequency by stacking Xs over values."
hint: "Look at the label under the X."
questionGoal: "Explain line plot notation."
misconception: "Thinking an X changes the measurement value."
```

### Lesson 8: Money Choices With A Goal

```question
key: u09_l08_q01_afford
type: multiple-choice
prompt: "Sam has $12. A game costs $9. Can Sam buy it and still have money left?"
choices: ["Yes, $3 left", "Yes, $21 left", "No, he needs $3 more", "No, he needs $9 more"]
correctAnswer: "Yes, $3 left"
explanation: "12 - 9 = 3 dollars left."
hint: "Subtract the cost from the money he has."
questionGoal: "Solve a simple spending decision."
misconception: "Adding cost and money instead of subtracting."
```

```question
key: u09_l08_q02_savings_goal
type: multiple-choice
prompt: "Ava is saving for a $20 book. She has $14. How much more does she need?"
choices: ["$6", "$14", "$20", "$34"]
correctAnswer: "$6"
explanation: "20 - 14 = 6 dollars."
hint: "Find the difference between the goal and what she has."
questionGoal: "Find amount needed for a savings goal."
misconception: "Adding saved amount and goal."
```

```question
key: u09_l08_q03_match_money_words
type: match-pairs
prompt: "Match each word to its meaning in a simple money choice."
pairs:
  - left: "earn"
    right: "get money for work"
  - left: "save"
    right: "keep money for later"
  - left: "spend"
    right: "use money to buy"
  - left: "cost"
    right: "price of an item"
explanation: "Money words describe different actions and amounts."
hint: "Think about what happens to the money."
questionGoal: "Build financial vocabulary for applied reasoning."
misconception: "Confusing saving and spending."
```

```question
key: u09_l08_q04_best_choice_goal
type: multiple-choice
prompt: "Leo has $15 and wants to save $10. Which purchase helps him keep at least $10?"
choices: ["Buy a $4 snack", "Buy a $7 toy", "Buy a $10 game", "Buy a $15 shirt"]
correctAnswer: "Buy a $4 snack"
explanation: "15 - 4 = 11, so he still has at least $10."
hint: "Subtract each cost and check the goal."
questionGoal: "Choose a spending option based on a savings goal."
misconception: "Choosing the largest or most appealing item without checking the goal."
```

```question
key: u09_l08_q05_type_total_cost
type: text-input
prompt: "A notebook costs $3 and a pencil pack costs $4. Type the total cost in dollars."
acceptedAnswers: ["7", "$7"]
answerType: text
explanation: "3 + 4 = 7 dollars."
hint: "Total cost means add the prices."
questionGoal: "Compute total cost."
misconception: "Subtracting prices when finding total."
```

```question
key: u09_l08_q06_explain_money_choice
type: constructed-response
prompt: "Mia has $18 and wants to save $5. Can she buy a $12 art kit? Explain."
minWords: 8
sampleAnswer: "Yes. 18 - 12 = 6, so she still saves at least $5."
checklist: ["Subtract 12 from 18", "Compare with $5 goal"]
explanation: "A money choice should fit the goal, not just the price."
hint: "Find how much money is left after buying."
questionGoal: "Explain a financial decision with arithmetic and goal."
misconception: "Checking affordability but ignoring the savings goal."
```

### Lesson 9: Mixed Measurement And Data Decisions

```question
key: u09_l09_q01_choose_display_operation
type: multiple-choice
prompt: "A graph key says each picture = 4 students. A row has 6 pictures. What should you do?"
choices: ["Multiply 6 x 4", "Add 6 + 4 only", "Subtract 4 from 6", "Ignore the key"]
correctAnswer: "Multiply 6 x 4"
explanation: "Each picture counts for 4 students, so use the scale."
hint: "The key tells the value of one picture."
questionGoal: "Choose operation from scaled graph context."
misconception: "Counting pictures as one or adding picture count and scale."
```

```question
key: u09_l09_q02_mixed_units
type: multiple-choice
prompt: "Which answer uses the correct unit? A bottle holds 750 milliliters. You pour out 200 milliliters."
choices: ["550 milliliters left", "550 grams left", "950 milliliters left", "550 meters left"]
correctAnswer: "550 milliliters left"
explanation: "750 - 200 = 550, and liquid volume stays in milliliters."
hint: "Keep the same liquid-volume unit."
questionGoal: "Solve and label a volume problem."
misconception: "Dropping or switching units."
```

```question
key: u09_l09_q03_match_decision
type: match-pairs
prompt: "Match each task to the first thing to check."
pairs:
  - left: "scaled graph"
    right: "the key or scale"
  - left: "elapsed time"
    right: "start and end time"
  - left: "measurement problem"
    right: "the unit"
  - left: "money goal"
    right: "money left after cost"
explanation: "Applied problems require checking context before calculating."
hint: "Ask what information controls the meaning of the numbers."
questionGoal: "Choose the key information in mixed applied tasks."
misconception: "Calculating with numbers before reading labels or scales."
```

```question
key: u09_l09_q04_type_elapsed_mixed
type: text-input
prompt: "A class starts reading at 1:20 and stops at 1:50. Type the number of minutes they read."
acceptedAnswers: ["30"]
answerType: number
explanation: "From 1:20 to 1:50 is 30 minutes."
hint: "Count minutes from 20 to 50."
questionGoal: "Solve elapsed time in a mixed review setting."
misconception: "Subtracting hour labels or misreading minutes."
```

```question
key: u09_l09_q05_error_scale_unit
type: error-correction
prompt: "Correct the answer."
sentence: "Each picture means 5 cans. There are 3 pictures, so there are 3 cans."
acceptedAnswers:
  - "Each picture means 5 cans. There are 3 pictures, so there are 15 cans."
  - "There are 15 cans."
explanation: "3 pictures at 5 cans each means 3 x 5 = 15 cans."
hint: "Use the graph key for each picture."
questionGoal: "Correct a scaled graph interpretation error."
misconception: "Counting each symbol as 1."
```

```question
key: u09_l09_q06_explain_mixed_decision
type: constructed-response
prompt: "Explain why you should read units and scales before solving a measurement or graph problem."
minWords: 10
sampleAnswer: "Units and scales tell what the numbers mean, so they help me choose the correct operation and label."
checklist: ["Mention units or scale", "Mention meaning of numbers"]
explanation: "In applied math, labels and scales are part of the quantity."
hint: "Think about how one picture can mean 5, not 1."
questionGoal: "Explain the decision routine for applied quantitative problems."
misconception: "Treating numbers as enough without context."
```

## Unit 10: Area, Arrays, And Multiplication

### Lesson 1: Cover A Region With Square Units

```question
key: u10_l01_q01_area_definition
type: multiple-choice
prompt: "What does area measure?"
choices: ["how many square units cover a region", "distance around a shape", "how heavy a shape is", "how many corners a shape has"]
correctAnswer: "how many square units cover a region"
explanation: "Area measures the inside covering of a region."
hint: "Think about covering the inside with unit squares."
questionGoal: "Identify area as square-unit covering."
misconception: "Confusing area with perimeter or attributes."
```

```question
key: u10_l01_q02_valid_tiling
type: multiple-choice
prompt: "Which tiling can measure area?"
choices: ["equal squares with no gaps or overlaps", "circles with gaps between them", "squares that overlap", "different-size tiles mixed together"]
correctAnswer: "equal squares with no gaps or overlaps"
explanation: "Area units must cover the region exactly without gaps or overlaps."
hint: "A good tiling covers all the space once."
questionGoal: "Recognize valid square-unit tiling."
misconception: "Counting any tiles as area units."
```

```question
key: u10_l01_q03_match_area_words
type: match-pairs
prompt: "Match each word to its area meaning."
pairs:
  - left: "area"
    right: "inside covering"
  - left: "unit square"
    right: "one square area unit"
  - left: "gap"
    right: "uncovered space"
  - left: "overlap"
    right: "space counted twice"
explanation: "Area measurement depends on equal units covering the region once."
hint: "Think about tiling a floor."
questionGoal: "Build area vocabulary."
misconception: "Missing why gaps and overlaps matter."
```

```question
key: u10_l01_q04_count_squares
type: text-input
prompt: "A rectangle is covered by 12 unit squares. Type its area in square units."
acceptedAnswers: ["12"]
answerType: number
explanation: "The area is the number of unit squares covering the rectangle."
hint: "Count the square units."
questionGoal: "Count square units as area."
misconception: "Counting side marks or corners."
```

```question
key: u10_l01_q05_fill_square_units
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "Area is measured in"
sentenceAfter: "."
choices: ["square units", "minutes", "kilograms", "plain side lengths"]
correctAnswer: "square units"
explanation: "Area counts unit squares."
hint: "The units cover a flat region."
questionGoal: "Use correct area unit language."
misconception: "Reporting area with length units only."
```

```question
key: u10_l01_q06_explain_tiling
type: constructed-response
prompt: "Explain why gaps are a problem when measuring area with tiles."
minWords: 8
sampleAnswer: "Gaps leave part of the region uncovered, so the tile count is too small."
checklist: ["Mention uncovered space", "Mention area count"]
explanation: "To measure area, tiles must cover the entire region."
hint: "Think about a floor that is not fully covered."
questionGoal: "Explain the no-gaps requirement for area."
misconception: "Counting visible tiles without considering uncovered space."
```

### Lesson 2: Count Squares Efficiently

```question
key: u10_l02_q01_rows_squares
type: multiple-choice
prompt: "A tiled rectangle has 3 rows of 8 squares. What is its area?"
choices: ["11 square units", "24 square units", "38 square units", "64 square units"]
correctAnswer: "24 square units"
explanation: "3 rows of 8 squares make 24 square units."
hint: "Use rows as equal groups."
questionGoal: "Use row structure to count area squares efficiently."
misconception: "Adding rows and columns."
```

```question
key: u10_l02_q02_count_by_rows
type: order-items
prompt: "Put the row totals in order for 4 rows of 5 squares."
items: ["20", "5", "15", "10"]
correctOrder: ["5", "10", "15", "20"]
explanation: "Counting by rows of 5 gives 5, 10, 15, 20."
hint: "Count by 5s."
questionGoal: "Use skip counting to count square units."
misconception: "Counting squares one by one without structure."
```

```question
key: u10_l02_q03_match_rows_area
type: match-pairs
prompt: "Match each tiled rectangle to its area."
pairs:
  - left: "2 rows of 7 squares"
    right: "14 square units"
  - left: "4 rows of 6 squares"
    right: "24 square units"
  - left: "5 rows of 5 squares"
    right: "25 square units"
  - left: "3 rows of 9 squares"
    right: "27 square units"
explanation: "Area is the total count of unit squares."
hint: "Multiply rows by squares in each row."
questionGoal: "Match row structures to area totals."
misconception: "Counting rows only."
```

```question
key: u10_l02_q04_type_area
type: text-input
prompt: "A rectangle has 6 rows of 4 unit squares. Type its area."
acceptedAnswers: ["24"]
answerType: number
explanation: "6 x 4 = 24 square units."
hint: "Count by 4s six times."
questionGoal: "Compute area by row counting."
misconception: "Adding 6 + 4."
```

```question
key: u10_l02_q05_grid_lines_error
type: multiple-choice
prompt: "A student counts the grid lines around a rectangle to find area. What should they count instead?"
choices: ["unit squares inside", "corners only", "the longest side", "the title of the graph"]
correctAnswer: "unit squares inside"
explanation: "Area counts the square units that cover the inside."
hint: "Area is inside covering."
questionGoal: "Correct boundary-counting for area."
misconception: "Confusing area with perimeter."
```

```question
key: u10_l02_q06_explain_efficient
type: constructed-response
prompt: "Explain a faster way than counting one by one for a 5 by 6 tiled rectangle."
minWords: 8
sampleAnswer: "I can count 5 rows of 6 or multiply 5 x 6 to get 30."
checklist: ["Mention rows or columns", "Include 30"]
explanation: "Rows and columns show equal groups of square units."
hint: "Use the array structure."
questionGoal: "Explain efficient square counting."
misconception: "Believing area must always be counted one square at a time."
```

### Lesson 3: Arrays Inside Rectangles

```question
key: u10_l03_q01_area_equation
type: multiple-choice
prompt: "A rectangle has 4 rows and 7 columns of unit squares. Which equation finds area?"
choices: ["4 x 7 = 28", "4 + 7 = 11", "28 + 7 = 35", "7 - 4 = 3"]
correctAnswer: "4 x 7 = 28"
explanation: "The unit squares form an array."
hint: "Rows times columns."
questionGoal: "Connect rectangular area to multiplication."
misconception: "Adding side counts instead of multiplying."
```

```question
key: u10_l03_q02_units_area
type: fill-blank
prompt: "Complete the area statement."
sentenceBefore: "A 3 by 9 rectangle has area 27"
sentenceAfter: "."
choices: ["square units", "units around", "minutes", "rows"]
correctAnswer: "square units"
explanation: "Area is measured in square units."
hint: "The rectangle is covered by unit squares."
questionGoal: "Use correct area unit language with multiplication."
misconception: "Omitting square units."
```

```question
key: u10_l03_q03_match_rectangle_equation
type: match-pairs
prompt: "Match each rectangle to an area equation."
pairs:
  - left: "5 rows, 6 columns"
    right: "5 x 6 = 30"
  - left: "8 rows, 4 columns"
    right: "8 x 4 = 32"
  - left: "7 rows, 7 columns"
    right: "7 x 7 = 49"
  - left: "2 rows, 9 columns"
    right: "2 x 9 = 18"
explanation: "A tiled rectangle is an array of square units."
hint: "Use rows and columns as factors."
questionGoal: "Match rectangular arrays to area equations."
misconception: "Confusing dimensions with total area."
```

```question
key: u10_l03_q04_type_area_product
type: text-input
prompt: "Type the area of a rectangle with 9 rows and 5 columns of unit squares."
acceptedAnswers: ["45"]
answerType: number
explanation: "9 x 5 = 45 square units."
hint: "Multiply rows by columns."
questionGoal: "Produce area from array dimensions."
misconception: "Adding dimensions."
```

```question
key: u10_l03_q05_array_context
type: passage-question
prompt: "Read the area situation."
passageTitle: "Tile Floor"
passage: "A small floor has 6 rows of square tiles. Each row has 8 tiles."
question: "What is the area in square tiles?"
choices: ["14", "28", "48", "68"]
correctAnswer: "48"
explanation: "6 x 8 = 48 square tiles."
hint: "Treat the tiles like an array."
questionGoal: "Apply array multiplication to an area context."
misconception: "Adding rows and tiles per row."
```

```question
key: u10_l03_q06_explain_array_area
type: constructed-response
prompt: "Explain why a tiled rectangle can be solved like an array."
minWords: 8
sampleAnswer: "The square units are in equal rows and columns, so rows times columns gives the area."
checklist: ["Mention rows and columns", "Mention area or square units"]
explanation: "Rectangular area uses the same structure as arrays."
hint: "Think of each tile as one array item."
questionGoal: "Explain array-area connection."
misconception: "Treating area and arrays as separate ideas."
```

### Lesson 4: Use Side Lengths For Area

```question
key: u10_l04_q01_side_lengths_area
type: multiple-choice
prompt: "A rectangle is 6 units long and 4 units wide. What is its area?"
choices: ["10 square units", "20 square units", "24 square units", "64 square units"]
correctAnswer: "24 square units"
explanation: "The side lengths mean 6 by 4 unit squares, so 6 x 4 = 24."
hint: "Imagine the rectangle filled with rows and columns."
questionGoal: "Find area from side lengths."
misconception: "Adding length and width."
```

```question
key: u10_l04_q02_area_operation
type: multiple-choice
prompt: "Which operation usually finds the area of a rectangle from whole-number side lengths?"
choices: ["multiplication", "subtraction", "telling time", "alphabetizing"]
correctAnswer: "multiplication"
explanation: "Side lengths show rows and columns of square units."
hint: "Think rows times columns."
questionGoal: "Choose operation for rectangular area."
misconception: "Confusing area method with perimeter addition."
```

```question
key: u10_l04_q03_match_sides_area
type: match-pairs
prompt: "Match each rectangle to its area."
pairs:
  - left: "3 by 8"
    right: "24 square units"
  - left: "5 by 7"
    right: "35 square units"
  - left: "9 by 4"
    right: "36 square units"
  - left: "6 by 6"
    right: "36 square units in a square"
explanation: "Multiply the side lengths to get area."
hint: "Use the two side lengths as factors."
questionGoal: "Match side lengths to area values."
misconception: "Treating side lengths as the answer."
```

```question
key: u10_l04_q04_type_side_area
type: text-input
prompt: "Type the area of a 7 by 8 rectangle."
acceptedAnswers: ["56"]
answerType: number
explanation: "7 x 8 = 56 square units."
hint: "Use the side lengths as factors."
questionGoal: "Compute rectangular area from side lengths."
misconception: "Adding 7 + 8."
```

```question
key: u10_l04_q05_error_side_area
type: error-correction
prompt: "Correct the statement."
sentence: "A 5 by 9 rectangle has area 14 square units because 5 + 9 = 14."
acceptedAnswers:
  - "A 5 by 9 rectangle has area 45 square units because 5 x 9 = 45."
  - "A 5 by 9 rectangle has area 45 square units."
explanation: "Area of a rectangle uses multiplication of side lengths."
hint: "Side lengths show rows and columns."
questionGoal: "Correct additive reasoning for area."
misconception: "Adding side lengths to find area."
```

```question
key: u10_l04_q06_explain_side_area
type: constructed-response
prompt: "Explain why 4 by 8 gives an area of 32 square units."
minWords: 8
sampleAnswer: "A 4 by 8 rectangle has 4 rows of 8 unit squares, so 4 x 8 = 32."
checklist: ["Mention rows or columns", "Include 32 square units"]
explanation: "Side lengths describe the implied array of square units."
hint: "Imagine filling the rectangle with unit squares."
questionGoal: "Explain side-length area reasoning."
misconception: "Treating side lengths as disconnected from square units."
```

### Lesson 5: Unknown Side Or Area In A Rectangle

```question
key: u10_l05_q01_missing_side
type: multiple-choice
prompt: "A rectangle has area 36 square units and one side length 6. What is the other side length?"
choices: ["6", "12", "30", "42"]
correctAnswer: "6"
explanation: "6 x 6 = 36."
hint: "Ask, 6 times what equals 36?"
questionGoal: "Find missing side from area and one side."
misconception: "Adding area and side or subtracting only."
```

```question
key: u10_l05_q02_missing_area
type: fill-blank
prompt: "Complete the area equation."
sentenceBefore: "8 x 5 ="
sentenceAfter: "square units."
choices: ["13", "35", "40", "85"]
correctAnswer: "40"
explanation: "8 rows of 5 square units make area 40."
hint: "Multiply the side lengths."
questionGoal: "Find missing area in a rectangle equation."
misconception: "Adding factors instead of multiplying."
```

```question
key: u10_l05_q03_match_missing_side
type: match-pairs
prompt: "Match each area fact to the missing side."
pairs:
  - left: "Area 24, side 6"
    right: "4"
  - left: "Area 45, side 5"
    right: "9"
  - left: "Area 32, side 8"
    right: "4 in another rectangle"
  - left: "Area 54, side 9"
    right: "6"
explanation: "The missing side is the unknown factor."
hint: "Use related multiplication or division."
questionGoal: "Solve missing-side area cases."
misconception: "Treating area as perimeter."
```

```question
key: u10_l05_q04_type_missing_side
type: text-input
prompt: "A rectangle has area 48 square units and one side is 8 units. Type the other side length."
acceptedAnswers: ["6"]
answerType: number
explanation: "8 x 6 = 48."
hint: "Use 48 divided by 8."
questionGoal: "Produce a missing side length."
misconception: "Reporting the area again as a side."
```

```question
key: u10_l05_q05_related_equation
type: multiple-choice
prompt: "Which equation helps find the missing side? __ x 7 = 28"
choices: ["28 / 7 = 4", "28 + 7 = 35", "7 - 4 = 3", "28 x 7 = 196"]
correctAnswer: "28 / 7 = 4"
explanation: "Division can find the unknown factor."
hint: "The product is 28 and one factor is 7."
questionGoal: "Connect missing side to division."
misconception: "Choosing unrelated operations with same numbers."
```

```question
key: u10_l05_q06_explain_unknown_area
type: constructed-response
prompt: "Explain how to find the missing side if a rectangle has area 30 and one side is 5."
minWords: 8
sampleAnswer: "I ask 5 times what equals 30. The missing side is 6."
checklist: ["Use unknown factor", "Include 6"]
explanation: "Area, side length, and the other side form a multiplication relationship."
hint: "Use 30 divided by 5."
questionGoal: "Explain missing-side area reasoning."
misconception: "Not connecting area to multiplication."
```

### Lesson 6: Decompose Figures Into Rectangles

```question
key: u10_l06_q01_decompose_reason
type: multiple-choice
prompt: "Why might you split an L-shaped figure into rectangles?"
choices: ["To find each rectangle's area and add them", "To find its color", "To count corners only", "To avoid using units"]
correctAnswer: "To find each rectangle's area and add them"
explanation: "Decomposing makes a complex area easier to find."
hint: "Area parts can be added if they do not overlap."
questionGoal: "Identify purpose of decomposing area figures."
misconception: "Splitting shapes without preserving area."
```

```question
key: u10_l06_q02_add_component_areas
type: text-input
prompt: "A shape is split into rectangles with areas 18 and 12 square units. Type the total area."
acceptedAnswers: ["30"]
answerType: number
explanation: "18 + 12 = 30 square units."
hint: "Add the area parts."
questionGoal: "Add component areas."
misconception: "Multiplying component areas or adding side lengths."
```

```question
key: u10_l06_q03_match_parts_total
type: match-pairs
prompt: "Match component areas to total area."
pairs:
  - left: "10 and 8"
    right: "18 square units"
  - left: "15 and 12"
    right: "27 square units"
  - left: "24 and 6"
    right: "30 square units"
  - left: "16 and 14"
    right: "30 square units in another shape"
explanation: "Total area is the sum of non-overlapping parts."
hint: "Add the two component areas."
questionGoal: "Combine decomposed area parts."
misconception: "Losing or double-counting part of a shape."
```

```question
key: u10_l06_q04_valid_split
type: multiple-choice
prompt: "Which split is valid for finding area?"
choices: ["Two non-overlapping rectangles that cover the whole shape", "Two rectangles that overlap", "One rectangle that leaves a gap", "Lines outside the shape only"]
correctAnswer: "Two non-overlapping rectangles that cover the whole shape"
explanation: "A valid split covers every part exactly once."
hint: "No gaps and no overlaps."
questionGoal: "Recognize valid decomposition."
misconception: "Accepting overlaps or missing regions."
```

```question
key: u10_l06_q05_multi_step_area
type: multi-blank-cloze
prompt: "Complete the decomposed area calculation."
parts: ["Rectangle A is 4 x 5 = ", ". Rectangle B is 3 x 6 = ", ". Total area is ", "."]
blanks:
  - correctAnswer: "20"
    acceptedAnswers: ["20"]
  - correctAnswer: "18"
    acceptedAnswers: ["18"]
  - correctAnswer: "38"
    acceptedAnswers: ["38"]
explanation: "Find each rectangle's area, then add 20 + 18 = 38."
hint: "Multiply first, then add the area parts."
questionGoal: "Complete a decomposed area process."
misconception: "Adding all side lengths or skipping component products."
```

```question
key: u10_l06_q06_explain_decompose
type: constructed-response
prompt: "Explain how decomposing helps find the area of a shape that is not one rectangle."
minWords: 10
sampleAnswer: "I can split the shape into rectangles, find each rectangle's area, and add the areas."
checklist: ["Mention splitting into rectangles", "Mention adding areas"]
explanation: "Area is additive when the parts cover the shape without overlap."
hint: "Think of covering every square unit exactly once."
questionGoal: "Explain area decomposition."
misconception: "Treating composite shapes as unsolvable or using perimeter."
```

## Unit 11: Perimeter, Geometry, And Shape Attributes

### Lesson 1: Perimeter Is Distance Around

```question
key: u11_l01_q01_perimeter_definition
type: multiple-choice
prompt: "What does perimeter measure?"
choices: ["distance around a shape", "square units inside a shape", "mass of a shape", "number of equal parts"]
correctAnswer: "distance around a shape"
explanation: "Perimeter is the length around the boundary."
hint: "Think about walking around the outside."
questionGoal: "Define perimeter."
misconception: "Confusing perimeter with area."
```

```question
key: u11_l01_q02_rectangle_perimeter
type: text-input
prompt: "A rectangle has sides 5, 3, 5, and 3 units. Type its perimeter."
acceptedAnswers: ["16"]
answerType: number
explanation: "5 + 3 + 5 + 3 = 16 units."
hint: "Add every side around the shape."
questionGoal: "Find perimeter from all side lengths."
misconception: "Multiplying side lengths as if finding area."
```

```question
key: u11_l01_q03_boundary_or_inside
type: multiple-choice
prompt: "Which phrase points to perimeter?"
choices: ["fence around the garden", "tiles covering the floor", "water in a bottle", "parts of a sandwich"]
correctAnswer: "fence around the garden"
explanation: "A fence goes around the boundary."
hint: "Look for around or outside."
questionGoal: "Recognize perimeter contexts."
misconception: "Using area for every shape context."
```

```question
key: u11_l01_q04_match_measure
type: match-pairs
prompt: "Match each phrase to area or perimeter."
pairs:
  - left: "distance around"
    right: "perimeter"
  - left: "cover inside"
    right: "area"
  - left: "square units"
    right: "area units"
  - left: "side lengths added"
    right: "perimeter method"
explanation: "Area and perimeter measure different attributes."
hint: "Around means perimeter; covering means area."
questionGoal: "Distinguish perimeter from area language."
misconception: "Treating area and perimeter as the same measurement."
```

```question
key: u11_l01_q05_fill_perimeter_unit
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "Perimeter is measured in"
sentenceAfter: "."
choices: ["length units", "square units", "liters", "grams"]
correctAnswer: "length units"
explanation: "Perimeter is a length around a boundary."
hint: "Side lengths are length units."
questionGoal: "Use correct perimeter units."
misconception: "Reporting perimeter in square units."
```

```question
key: u11_l01_q06_explain_perimeter
type: constructed-response
prompt: "Explain how to find the perimeter of a polygon with labeled sides."
minWords: 8
sampleAnswer: "Add all the side lengths around the outside of the polygon."
checklist: ["Mention add side lengths", "Mention around or outside"]
explanation: "Perimeter is the total boundary length."
hint: "Trace the shape once around."
questionGoal: "Explain perimeter procedure."
misconception: "Counting inside squares or only two sides."
```

### Lesson 2: Add Side Lengths Carefully

```question
key: u11_l02_q01_add_all_sides
type: multiple-choice
prompt: "A triangle has side lengths 6, 7, and 8 units. What is the perimeter?"
choices: ["13", "15", "21", "56"]
correctAnswer: "21"
explanation: "Add all three sides: 6 + 7 + 8 = 21."
hint: "Perimeter uses every side."
questionGoal: "Find perimeter of a polygon by adding sides."
misconception: "Adding only two sides."
```

```question
key: u11_l02_q02_rectangle_shortcut
type: text-input
prompt: "A rectangle has length 9 and width 4. Type its perimeter."
acceptedAnswers: ["26"]
answerType: number
explanation: "The sides are 9, 4, 9, and 4; their sum is 26."
hint: "A rectangle has two lengths and two widths."
questionGoal: "Find rectangle perimeter from length and width."
misconception: "Multiplying length and width for perimeter."
```

```question
key: u11_l02_q03_missing_side_perimeter
type: fill-blank
prompt: "A rectangle has sides 8, 5, 8, and __. Complete the missing side."
sentenceBefore: "The missing side is"
sentenceAfter: "."
choices: ["5", "8", "13", "40"]
correctAnswer: "5"
explanation: "Opposite sides of a rectangle have the same length."
hint: "Match the opposite side."
questionGoal: "Use rectangle side relationships for perimeter."
misconception: "Adding known sides to get a missing side."
```

```question
key: u11_l02_q04_match_perimeter
type: match-pairs
prompt: "Match each side list to its perimeter."
pairs:
  - left: "4, 4, 4, 4"
    right: "16"
  - left: "6, 3, 6, 3"
    right: "18"
  - left: "5, 5, 7"
    right: "17"
  - left: "2, 8, 2, 8"
    right: "20"
explanation: "Perimeter is the sum of side lengths."
hint: "Add every number in the list."
questionGoal: "Practice perimeter sums from side lists."
misconception: "Skipping repeated sides."
```

```question
key: u11_l02_q05_error_perimeter
type: error-correction
prompt: "Correct the statement."
sentence: "A 6 by 4 rectangle has perimeter 24 because 6 x 4 = 24."
acceptedAnswers:
  - "A 6 by 4 rectangle has perimeter 20 because 6 + 4 + 6 + 4 = 20."
  - "The perimeter is 20."
explanation: "6 x 4 finds area, not perimeter."
hint: "Add all four side lengths."
questionGoal: "Correct area/perimeter operation confusion."
misconception: "Multiplying side lengths for perimeter."
```

```question
key: u11_l02_q06_explain_side_tracking
type: constructed-response
prompt: "Explain why checking off each side can help find perimeter."
minWords: 8
sampleAnswer: "It helps me make sure I add every side once and do not skip any side."
checklist: ["Mention every side", "Mention not skipping or double-counting"]
explanation: "Perimeter requires the full boundary exactly once."
hint: "Think of tracing around the shape."
questionGoal: "Explain careful perimeter counting."
misconception: "Omitting or double-counting sides."
```

### Lesson 3: Area Or Perimeter?

```question
key: u11_l03_q01_area_or_perimeter
type: multiple-choice
prompt: "Which measure is needed to know how much carpet covers a room?"
choices: ["area", "perimeter", "mass", "time"]
correctAnswer: "area"
explanation: "Carpet covers the inside surface, so it uses area."
hint: "Covering inside means area."
questionGoal: "Choose area for covering contexts."
misconception: "Choosing perimeter for any shape problem."
```

```question
key: u11_l03_q02_fence_context
type: multiple-choice
prompt: "Which measure is needed to know how much fence goes around a yard?"
choices: ["perimeter", "area", "liquid volume", "fraction"]
correctAnswer: "perimeter"
explanation: "A fence goes around the boundary."
hint: "Around means perimeter."
questionGoal: "Choose perimeter for boundary contexts."
misconception: "Choosing area for every rectangle context."
```

```question
key: u11_l03_q03_match_area_perim
type: match-pairs
prompt: "Match each task to area or perimeter."
pairs:
  - left: "tiles for a floor"
    right: "area"
  - left: "ribbon around a poster"
    right: "perimeter"
  - left: "paint to cover a wall"
    right: "area for covering"
  - left: "border around a garden"
    right: "perimeter for boundary"
explanation: "Area covers inside; perimeter goes around."
hint: "Look for covering or around."
questionGoal: "Sort area and perimeter contexts."
misconception: "Treating the words as interchangeable."
```

```question
key: u11_l03_q04_units_decision
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "An answer in square units is an"
sentenceAfter: "answer."
choices: ["area", "perimeter", "time", "mass"]
correctAnswer: "area"
explanation: "Square units measure area."
hint: "Square units cover a flat region."
questionGoal: "Use units to distinguish area from perimeter."
misconception: "Reporting perimeter in square units."
```

```question
key: u11_l03_q05_compute_correct_measure
type: text-input
prompt: "A rectangle is 8 units by 3 units. The question asks for area. Type the answer."
acceptedAnswers: ["24"]
answerType: number
explanation: "Area is 8 x 3 = 24 square units."
hint: "The question asks for covering, not around."
questionGoal: "Compute the requested measure after choosing area."
misconception: "Giving perimeter 22."
```

```question
key: u11_l03_q06_explain_area_perim
type: constructed-response
prompt: "Explain the difference between area and perimeter."
minWords: 10
sampleAnswer: "Area measures the inside covering in square units, and perimeter measures the distance around in length units."
checklist: ["Define area", "Define perimeter"]
explanation: "They are different measurements of a shape."
hint: "Use the words \"inside\" and \"around.\""
questionGoal: "Explain area/perimeter distinction."
misconception: "Thinking area and perimeter are the same kind of measure."
```

### Lesson 4: Attributes That Define Shapes

```question
key: u11_l04_q01_defining_attribute
type: multiple-choice
prompt: "Which is a defining attribute of a triangle?"
choices: ["3 sides", "blue color", "large size", "tilted position"]
correctAnswer: "3 sides"
explanation: "A triangle is defined by having 3 sides."
hint: "Defining attributes do not change with color or size."
questionGoal: "Identify a defining shape attribute."
misconception: "Classifying by non-defining visual features."
```

```question
key: u11_l04_q02_nondefining
type: multiple-choice
prompt: "Which attribute does not decide whether a shape is a rectangle?"
choices: ["color", "4 sides", "square corners", "opposite sides"]
correctAnswer: "color"
explanation: "Color does not change the shape category."
hint: "A red rectangle and a blue rectangle are both rectangles."
questionGoal: "Distinguish non-defining attributes."
misconception: "Treating appearance as category-defining."
```

```question
key: u11_l04_q03_match_shape_attribute
type: match-pairs
prompt: "Match each shape to a defining attribute."
pairs:
  - left: "triangle"
    right: "3 sides"
  - left: "quadrilateral"
    right: "4 sides"
  - left: "polygon"
    right: "straight sides"
  - left: "rectangle"
    right: "4 square corners"
explanation: "Defining attributes help classify shapes."
hint: "Ignore color, size, and direction."
questionGoal: "Match shapes to attributes."
misconception: "Relying on memorized pictures only."
```

```question
key: u11_l04_q04_fill_attribute
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "Changing a shape's size usually"
sentenceAfter: "change its category."
choices: ["does not", "always does", "must", "cannot ever"]
correctAnswer: "does not"
explanation: "A small triangle and a large triangle are both triangles."
hint: "Size is not usually a defining attribute."
questionGoal: "Recognize invariance under size changes."
misconception: "Thinking larger versions are different shape types."
```

```question
key: u11_l04_q05_shape_category
type: multiple-choice
prompt: "A shape has 4 straight sides. What broad category does it fit?"
choices: ["quadrilateral", "triangle", "circle", "line plot"]
correctAnswer: "quadrilateral"
explanation: "A quadrilateral is a polygon with 4 sides."
hint: "Quad means four."
questionGoal: "Classify by side count."
misconception: "Calling every four-sided shape a rectangle."
```

```question
key: u11_l04_q06_explain_attribute
type: constructed-response
prompt: "Explain why a triangle is still a triangle if it is turned sideways."
minWords: 8
sampleAnswer: "Turning it does not change that it has 3 sides and 3 vertices."
checklist: ["Mention 3 sides or vertices", "Say turning does not change them"]
explanation: "Orientation is not a defining attribute."
hint: "Count the sides after turning."
questionGoal: "Explain shape classification by attributes."
misconception: "Classifying by orientation."
```

### Lesson 5: Quadrilateral Categories

```question
key: u11_l05_q01_quadrilateral
type: multiple-choice
prompt: "Which shape is a quadrilateral?"
choices: ["a shape with 4 sides", "a shape with 3 sides", "a circle", "a shape with 5 sides"]
correctAnswer: "a shape with 4 sides"
explanation: "A quadrilateral has 4 sides."
hint: "Quad means four."
questionGoal: "Define quadrilateral by side count."
misconception: "Thinking only rectangles are quadrilaterals."
```

```question
key: u11_l05_q02_square_rectangle
type: multiple-choice
prompt: "Why can a square be called a rectangle?"
choices: ["It has 4 square corners and opposite sides like a rectangle.", "It is always blue.", "It has 3 sides.", "It has no corners."]
correctAnswer: "It has 4 square corners and opposite sides like a rectangle."
explanation: "A square has the defining attributes of a rectangle, plus all sides equal."
hint: "Think about the rectangle attributes."
questionGoal: "Recognize category/subcategory relationship."
misconception: "Believing a square cannot also be a rectangle."
```

```question
key: u11_l05_q03_match_quads
type: match-pairs
prompt: "Match each term to an attribute."
pairs:
  - left: "quadrilateral"
    right: "4 sides"
  - left: "rectangle"
    right: "4 square corners"
  - left: "square"
    right: "4 equal sides and 4 square corners"
  - left: "rhombus"
    right: "4 equal sides"
explanation: "Quadrilaterals can be sorted by more specific attributes."
hint: "Start with four sides, then add more attributes."
questionGoal: "Connect quadrilateral terms to attributes."
misconception: "Sorting by name only without properties."
```

```question
key: u11_l05_q04_not_quad
type: multiple-choice
prompt: "Which shape is not a quadrilateral?"
choices: ["triangle", "square", "rectangle", "rhombus"]
correctAnswer: "triangle"
explanation: "A triangle has 3 sides, not 4."
hint: "Count the sides."
questionGoal: "Exclude non-quadrilaterals by side count."
misconception: "Grouping all polygons together without side count."
```

```question
key: u11_l05_q05_fill_category
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "All squares are"
sentenceAfter: "because they have 4 sides."
choices: ["quadrilaterals", "triangles", "circles", "line plots"]
correctAnswer: "quadrilaterals"
explanation: "A square is a four-sided shape."
hint: "Four-sided shapes are quadrilaterals."
questionGoal: "Recognize broad category membership."
misconception: "Thinking specific names exclude broader categories."
```

```question
key: u11_l05_q06_explain_square_rectangle
type: constructed-response
prompt: "Explain why a square can belong to more than one shape category."
minWords: 10
sampleAnswer: "A square has 4 sides, so it is a quadrilateral, and it has rectangle attributes too."
checklist: ["Mention 4 sides", "Mention another category such as rectangle"]
explanation: "Shapes can belong to broad and specific categories when they share attributes."
hint: "Use attributes, not just shape names."
questionGoal: "Explain subcategory reasoning."
misconception: "Treating shape categories as mutually exclusive."
```

### Lesson 6: Equal-Area Partitions

```question
key: u11_l06_q01_equal_area_partition
type: multiple-choice
prompt: "Which partition can show halves?"
choices: ["2 equal-area parts", "2 parts with one much larger", "3 equal parts", "4 unequal parts"]
correctAnswer: "2 equal-area parts"
explanation: "Halves are 2 equal parts of the same whole."
hint: "Check both number of parts and equal area."
questionGoal: "Identify equal-area halves."
misconception: "Naming halves by number of pieces only."
```

```question
key: u11_l06_q02_equal_shapes_needed
type: multiple-choice
prompt: "Do equal-area parts always have to be the exact same shape?"
choices: ["No, they need equal area.", "Yes, they must look identical.", "No, they can be any size.", "Only in circles."]
correctAnswer: "No, they need equal area."
explanation: "Fraction parts must have equal area, but they do not always need the same shape."
hint: "Equal area matters most."
questionGoal: "Distinguish equal area from identical shape."
misconception: "Believing equal parts must be congruent or symmetric."
```

```question
key: u11_l06_q03_match_partition_fraction
type: match-pairs
prompt: "Match each equal-area partition to the unit fraction for one part."
pairs:
  - left: "2 equal-area parts"
    right: "1/2"
  - left: "3 equal-area parts"
    right: "1/3"
  - left: "4 equal-area parts"
    right: "1/4"
  - left: "8 equal-area parts"
    right: "1/8"
explanation: "One part is named by the number of equal-area parts in the whole."
hint: "Count equal-area parts in the whole."
questionGoal: "Connect equal-area partitions to unit fractions."
misconception: "Counting only shaded or selected parts."
```

```question
key: u11_l06_q04_fill_equal_area
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "A rectangle split into 4 equal-area parts has parts called"
sentenceAfter: "."
choices: ["fourths", "halves", "thirds", "ones"]
correctAnswer: "fourths"
explanation: "Four equal parts of a whole are fourths."
hint: "The name comes from the number of equal parts."
questionGoal: "Name equal-area partitions."
misconception: "Using fraction names without part count."
```

```question
key: u11_l06_q05_error_partition
type: error-correction
prompt: "Correct the reasoning."
sentence: "This shape has 3 parts, so each part is 1/3, even though one part is much larger."
acceptedAnswers:
  - "The parts are not thirds because they are not equal in area."
  - "They are not thirds because the parts are unequal."
explanation: "Thirds must be 3 equal-area parts."
hint: "Check whether the parts are equal."
questionGoal: "Correct unequal-part fraction naming."
misconception: "Naming fractions by part count only."
```

```question
key: u11_l06_q06_explain_equal_area
type: constructed-response
prompt: "Explain what makes a shape partition show fourths."
minWords: 8
sampleAnswer: "The whole must be split into 4 parts with equal area."
checklist: ["Mention 4 parts", "Mention equal area"]
explanation: "Equal-area parts are required for fraction names in shapes."
hint: "Use the words \"equal area.\""
questionGoal: "Explain equal-area partition criteria."
misconception: "Focusing on shape appearance instead of area."
```

### Lesson 7: Geometry And Measurement Mix

```question
key: u11_l07_q01_choose_concept
type: multiple-choice
prompt: "A problem asks for the distance around a garden. Which concept is needed?"
choices: ["perimeter", "area", "fraction equivalence", "mass"]
correctAnswer: "perimeter"
explanation: "Distance around is perimeter."
hint: "Around means boundary length."
questionGoal: "Choose concept in a mixed geometry task."
misconception: "Using area for all shape problems."
```

```question
key: u11_l07_q02_area_perimeter_compute
type: multiple-choice
prompt: "A rectangle is 6 by 3. The question asks for perimeter. Which answer is correct?"
choices: ["18 units", "18 square units", "9 units", "54 units"]
correctAnswer: "18 units"
explanation: "Perimeter is 6 + 3 + 6 + 3 = 18 units."
hint: "The question asks for around, not covering."
questionGoal: "Compute perimeter when area is a plausible distractor."
misconception: "Giving area instead of perimeter."
```

```question
key: u11_l07_q03_match_geometry_task
type: match-pairs
prompt: "Match each task to the concept."
pairs:
  - left: "cover a rectangle with tiles"
    right: "area"
  - left: "add all side lengths"
    right: "perimeter"
  - left: "sort by number of sides"
    right: "attributes"
  - left: "split into equal-area parts"
    right: "fractions"
explanation: "Geometry tasks ask for different attributes or properties."
hint: "Identify what the question wants."
questionGoal: "Sort mixed geometry tasks by concept."
misconception: "Applying one method to every shape prompt."
```

```question
key: u11_l07_q04_type_area_mix
type: text-input
prompt: "A 5 by 5 square is covered with unit squares. Type its area."
acceptedAnswers: ["25"]
answerType: number
explanation: "5 x 5 = 25 square units."
hint: "Area uses square-unit covering."
questionGoal: "Solve area in mixed geometry review."
misconception: "Giving perimeter 20."
```

```question
key: u11_l07_q05_attribute_mixed
type: multiple-choice
prompt: "A shape has 4 sides. Which broad category must it fit?"
choices: ["quadrilateral", "triangle", "circle", "unit square only"]
correctAnswer: "quadrilateral"
explanation: "Four-sided shapes are quadrilaterals."
hint: "Count sides."
questionGoal: "Apply attribute classification in mixed review."
misconception: "Requiring a shape to look like a rectangle to be a quadrilateral."
```

```question
key: u11_l07_q06_explain_concept_choice
type: constructed-response
prompt: "Explain how you decide whether a shape problem asks for area or perimeter."
minWords: 10
sampleAnswer: "If it asks to cover the inside, I use area. If it asks around the outside, I use perimeter."
checklist: ["Mention inside or covering", "Mention around or boundary"]
explanation: "The words and units in the question tell which measurement is needed."
hint: "Use the clues \"cover\" and \"around.\""
questionGoal: "Explain area/perimeter decision-making."
misconception: "Choosing a method by shape type instead of question meaning."
```

## Unit 12: Cumulative Modeling And Grade 3 Mastery

### Lesson 1: Choose The Representation

```question
key: u12_l01_q01_model_menu
type: multiple-choice
prompt: "Which representation best fits comparing 156 and 98?"
choices: ["strip diagram", "fraction strip", "clock", "array only"]
correctAnswer: "strip diagram"
explanation: "A strip diagram can show the difference between two amounts."
hint: "The problem compares two whole-number amounts."
questionGoal: "Choose a model for comparison."
misconception: "Choosing a representation unrelated to structure."
```

```question
key: u12_l01_q02_model_equal_groups
type: multiple-choice
prompt: "Which representation best fits 8 rows of 7 chairs?"
choices: ["array", "line plot", "clock", "fraction benchmark"]
correctAnswer: "array"
explanation: "Rows of equal size form an array."
hint: "Rows and columns are array clues."
questionGoal: "Choose a model for equal groups."
misconception: "Treating all word problems as strip diagrams."
```

```question
key: u12_l01_q03_match_representation
type: match-pairs
prompt: "Match each task to a useful representation."
pairs:
  - left: "elapsed time"
    right: "timeline"
  - left: "fraction location"
    right: "number line"
  - left: "scaled data"
    right: "graph"
  - left: "rectangular area"
    right: "array or grid"
explanation: "Representation choice should match the mathematical structure."
hint: "Ask what the model needs to show."
questionGoal: "Match mixed tasks to representations."
misconception: "Using the same model for all tasks."
```

```question
key: u12_l01_q04_reject_model
type: multiple-choice
prompt: "Which model is least useful for finding the area of a rectangle?"
choices: ["clock", "grid", "array", "side-length diagram"]
correctAnswer: "clock"
explanation: "A clock measures time, not rectangular area."
hint: "Area needs square units or side lengths."
questionGoal: "Reject an inappropriate representation."
misconception: "Selecting familiar tools without purpose."
```

```question
key: u12_l01_q05_type_operation_model
type: text-input
prompt: "Type a useful model for 36 markers shared equally among 6 boxes."
acceptedAnswers: ["equal groups", "division", "array", "bar diagram", "strip diagram"]
answerType: text
explanation: "Equal groups or a division model can show sharing into 6 boxes."
hint: "The markers are shared equally."
questionGoal: "Produce a representation for division."
misconception: "Naming an unrelated model."
```

```question
key: u12_l01_q06_explain_representation
type: constructed-response
prompt: "Choose a representation for 3/4 and explain why it fits."
minWords: 8
sampleAnswer: "A number line fits because 3/4 is a number three fourths from 0."
checklist: ["Name a representation", "Explain how it shows 3/4"]
explanation: "Fractions can be represented as equal parts, strips, or number-line points."
hint: "Think of shapes, strips, or number lines."
questionGoal: "Explain model choice for a fraction."
misconception: "Thinking only shaded shapes can show fractions."
```

### Lesson 2: Mixed Operations With Reasonableness

```question
key: u12_l02_q01_mixed_add
type: text-input
prompt: "Type the sum: 438 + 267"
acceptedAnswers: ["705"]
answerType: number
explanation: "438 + 267 = 705."
hint: "Add hundreds, tens, and ones; regroup as needed."
questionGoal: "Demonstrate retained addition within 1,000."
misconception: "Regrouping incorrectly."
```

```question
key: u12_l02_q02_mixed_multiply
type: text-input
prompt: "Type the product: 9 x 8"
acceptedAnswers: ["72"]
answerType: number
explanation: "9 x 8 = 72; one strategy is 10 x 8 minus 8."
hint: "Use a tens neighbor fact."
questionGoal: "Demonstrate retained multiplication fact fluency."
misconception: "Confusing nearby products such as 64 or 81."
```

```question
key: u12_l02_q03_reasonable_answer
type: multiple-choice
prompt: "Which answer is reasonable for 602 - 298?"
choices: ["304", "900", "104", "2980"]
correctAnswer: "304"
explanation: "602 is about 600 and 298 is about 300, so the difference is about 300."
hint: "Estimate before choosing."
questionGoal: "Use estimation to choose a reasonable difference."
misconception: "Accepting answers with unreasonable magnitude."
```

```question
key: u12_l02_q04_match_operation_review
type: match-pairs
prompt: "Match each expression to its value."
pairs:
  - left: "56 / 7"
    right: "8"
  - left: "6 x 9"
    right: "54"
  - left: "500 - 175"
    right: "325"
  - left: "240 + 160"
    right: "400"
explanation: "Mixed review requires choosing the operation first."
hint: "Notice whether the expression multiplies, divides, adds, or subtracts."
questionGoal: "Practice mixed operation fluency."
misconception: "Using the same operation for every expression."
```

```question
key: u12_l02_q05_two_step_reasonable
type: passage-question
prompt: "Read the story and answer."
passageTitle: "Supply Boxes"
passage: "There are 6 boxes with 8 glue sticks each. The class uses 9 glue sticks."
question: "How many glue sticks are left?"
choices: ["39", "48", "57", "69"]
correctAnswer: "39"
explanation: "6 x 8 = 48, and 48 - 9 = 39."
hint: "Find the total first."
questionGoal: "Solve a mixed two-step operation problem."
misconception: "Stopping after the first step or adding all numbers."
```

```question
key: u12_l02_q06_explain_reasonableness
type: constructed-response
prompt: "Explain why 7 x 6 = 76 is not reasonable."
minWords: 8
sampleAnswer: "7 x 6 should be near 7 x 5 = 35 or 7 x 10 = 70, and the exact answer is 42."
checklist: ["Say 76 is too large", "Include or support 42"]
explanation: "Estimation and known facts can catch unreasonable products."
hint: "Compare with 7 x 10."
questionGoal: "Explain reasonableness for multiplication facts."
misconception: "Accepting a digit-combination error as a product."
```

### Lesson 3: Fractions In New Diagrams

```question
key: u12_l03_q01_new_fraction_model
type: multiple-choice
prompt: "A hexagon is split into 6 equal-area parts, and 4 parts are shaded. What fraction is shaded?"
choices: ["4/6", "6/4", "1/6", "4/4"]
correctAnswer: "4/6"
explanation: "Four of the 6 equal parts are shaded."
hint: "Shaded parts go on top; total equal parts go on bottom."
questionGoal: "Transfer fraction naming to an unfamiliar shape."
misconception: "Reversing numerator and denominator."
```

```question
key: u12_l03_q02_new_equivalence
type: multiple-choice
prompt: "A number line shows 2/4 at the same point as another fraction. Which fraction could it be?"
choices: ["1/2", "1/4", "3/4", "4/2"]
correctAnswer: "1/2"
explanation: "2/4 and 1/2 are equivalent."
hint: "2 fourths is half of 4 fourths."
questionGoal: "Transfer equivalence to number-line context."
misconception: "Different labels must be different amounts."
```

```question
key: u12_l03_q03_match_fraction_transfer
type: match-pairs
prompt: "Match each new diagram description to the fraction idea."
pairs:
  - left: "all 5 fifths shaded"
    right: "one whole"
  - left: "same point as 3/6"
    right: "1/2"
  - left: "2 of 8 equal parts"
    right: "2/8"
  - left: "larger parts with same numerator"
    right: "greater fraction"
explanation: "Fraction ideas transfer across shapes, strips, and lines."
hint: "Use equal parts, same whole, and number-line location."
questionGoal: "Review fraction concepts in unfamiliar descriptions."
misconception: "Memorizing only familiar diagrams."
```

```question
key: u12_l03_q04_compare_transfer
type: fill-blank
prompt: "Choose the symbol: 3/5 ___ 3/8"
sentenceBefore: "3/5"
sentenceAfter: "3/8"
choices: [">", "<", "="]
correctAnswer: ">"
explanation: "Same numerator: fifths are larger than eighths."
hint: "Compare the size of one fifth and one eighth."
questionGoal: "Apply same-numerator comparison in review."
misconception: "Larger denominator means larger fraction."
```

```question
key: u12_l03_q05_type_whole_fraction
type: text-input
prompt: "Type the fraction that names one whole split into 8 equal parts."
acceptedAnswers: ["8/8"]
answerType: text
explanation: "Eight eighths make one whole."
hint: "Count all 8 equal parts."
questionGoal: "Produce a whole fraction in review."
misconception: "Writing 1/8 for one whole."
```

```question
key: u12_l03_q06_explain_new_diagram
type: constructed-response
prompt: "A new diagram looks different from ones you practiced. What should you check before naming its fraction?"
minWords: 10
sampleAnswer: "I should identify the whole, check that parts are equal, then count shaded and total parts."
checklist: ["Identify the whole", "Check equal parts", "Count parts"]
explanation: "Fraction reasoning transfers when you use the structure, not the picture's appearance."
hint: "Start with the whole and equal parts."
questionGoal: "Explain transfer routine for unfamiliar fraction diagrams."
misconception: "Relying on memorized images instead of fraction structure."
```

### Lesson 4: Measurement And Data Review Cycle

```question
key: u12_l04_q01_scaled_review
type: multiple-choice
prompt: "A graph scale counts by 4. A bar reaches the fifth mark. What value is shown?"
choices: ["5", "9", "20", "45"]
correctAnswer: "20"
explanation: "Five jumps of 4 is 20."
hint: "Count by the scale interval."
questionGoal: "Review scaled graph reading."
misconception: "Counting marks as ones."
```

```question
key: u12_l04_q02_elapsed_review
type: text-input
prompt: "Type the elapsed minutes from 10:45 to 11:15."
acceptedAnswers: ["30"]
answerType: number
explanation: "10:45 to 11:00 is 15 minutes, then 15 more minutes to 11:15."
hint: "Jump to 11:00 first."
questionGoal: "Review elapsed time across an hour."
misconception: "Treating time as base-ten subtraction."
```

```question
key: u12_l04_q03_match_units_review
type: match-pairs
prompt: "Match each context to a unit."
pairs:
  - left: "length of a table"
    right: "centimeters"
  - left: "mass of a backpack"
    right: "kilograms"
  - left: "water in a bottle"
    right: "milliliters"
  - left: "time for lunch"
    right: "minutes"
explanation: "Units must match the attribute."
hint: "Decide what is being measured first."
questionGoal: "Review measurement unit selection."
misconception: "Ignoring attributes."
```

```question
key: u12_l04_q04_line_plot_review
type: multiple-choice
prompt: "A line plot has 7 Xs above 1/2 inch and 3 Xs above 1 inch. How many more are at 1/2 inch?"
choices: ["3", "4", "7", "10"]
correctAnswer: "4"
explanation: "7 - 3 = 4 more measurements."
hint: "Compare the number of Xs."
questionGoal: "Review line plot comparison."
misconception: "Comparing measurement labels instead of frequencies."
```

```question
key: u12_l04_q05_error_unit_review
type: error-correction
prompt: "Correct the unit."
sentence: "The bottle holds 600 grams of water."
acceptedAnswers:
  - "The bottle holds 600 milliliters of water."
  - "The bottle holds 600 milliliters."
explanation: "How much liquid a bottle holds is liquid volume, measured in milliliters or liters."
hint: "Grams measure mass."
questionGoal: "Correct unit mismatch in measurement review."
misconception: "Confusing mass and liquid volume."
```

```question
key: u12_l04_q06_explain_data_check
type: constructed-response
prompt: "Explain what to check first when answering a graph question."
minWords: 8
sampleAnswer: "I should check the title, labels, and scale so I know what the numbers mean."
checklist: ["Mention scale", "Mention labels or title"]
explanation: "Graph features tell how to interpret the data."
hint: "A bar or picture may not count by ones."
questionGoal: "Explain data-display reading routine."
misconception: "Calculating from a graph before reading scale and labels."
```

### Lesson 5: Area, Perimeter, And Shape Decisions

```question
key: u12_l05_q01_area_or_perim_review
type: multiple-choice
prompt: "Which measure is needed for a border around a poster?"
choices: ["perimeter", "area", "mass", "elapsed time"]
correctAnswer: "perimeter"
explanation: "A border goes around the poster."
hint: "Around means perimeter."
questionGoal: "Review geometric measurement choice."
misconception: "Choosing area for all rectangle tasks."
```

```question
key: u12_l05_q02_area_review
type: text-input
prompt: "Type the area of a rectangle that is 6 units by 7 units."
acceptedAnswers: ["42"]
answerType: number
explanation: "6 x 7 = 42 square units."
hint: "Area uses rows times columns."
questionGoal: "Review rectangular area calculation."
misconception: "Giving perimeter 26."
```

```question
key: u12_l05_q03_perimeter_review
type: text-input
prompt: "Type the perimeter of a rectangle with sides 6, 7, 6, and 7 units."
acceptedAnswers: ["26"]
answerType: number
explanation: "6 + 7 + 6 + 7 = 26 units."
hint: "Add all side lengths."
questionGoal: "Review perimeter calculation."
misconception: "Giving area 42."
```

```question
key: u12_l05_q04_match_geo_review
type: match-pairs
prompt: "Match each clue to the concept."
pairs:
  - left: "square units"
    right: "area"
  - left: "distance around"
    right: "perimeter"
  - left: "4 sides"
    right: "quadrilateral"
  - left: "equal parts of a shape"
    right: "fraction partition"
explanation: "Units and words reveal the geometry idea."
hint: "Look for covering, around, attributes, or equal parts."
questionGoal: "Review geometry concept identification."
misconception: "Using one geometry method for all prompts."
```

```question
key: u12_l05_q05_shape_review
type: multiple-choice
prompt: "A shape has 4 sides and 4 square corners. Which name fits?"
choices: ["rectangle", "triangle", "circle", "line segment"]
correctAnswer: "rectangle"
explanation: "A rectangle has 4 sides and 4 square corners."
hint: "Use defining attributes."
questionGoal: "Review shape classification by attributes."
misconception: "Classifying by appearance rather than attributes."
```

```question
key: u12_l05_q06_explain_geo_decision
type: constructed-response
prompt: "Explain how units can help you tell area and perimeter apart."
minWords: 8
sampleAnswer: "Area uses square units for covering, while perimeter uses length units around the edge."
checklist: ["Mention square units for area", "Mention length units for perimeter"]
explanation: "The unit tells which attribute is being measured."
hint: "Square units cover; length units go around."
questionGoal: "Explain unit-based area/perimeter distinction."
misconception: "Ignoring units in geometry answers."
```

### Lesson 6: Find And Fix The Error

```question
key: u12_l06_q01_error_multiply_add
type: error-correction
prompt: "Correct the mistake."
sentence: "6 x 8 = 14 because 6 + 8 = 14."
acceptedAnswers:
  - "6 x 8 = 48 because it means 6 groups of 8."
  - "6 x 8 = 48"
explanation: "Multiplication is equal groups, not addition of factors."
hint: "Think 6 groups of 8."
questionGoal: "Correct additive reasoning for multiplication."
misconception: "Adding factors instead of multiplying."
```

```question
key: u12_l06_q02_error_fraction_denominator
type: error-correction
prompt: "Correct the mistake."
sentence: "1/8 is greater than 1/4 because 8 is greater than 4."
acceptedAnswers:
  - "1/8 is less than 1/4 because eighths are smaller than fourths."
  - "1/8 < 1/4"
explanation: "More equal parts make each unit fraction smaller."
hint: "Compare the size of one eighth and one fourth."
questionGoal: "Correct denominator-as-size misconception."
misconception: "Comparing denominators as whole numbers."
```

```question
key: u12_l06_q03_error_area_perim
type: error-correction
prompt: "Correct the mistake."
sentence: "A 4 by 7 rectangle has perimeter 28 because 4 x 7 = 28."
acceptedAnswers:
  - "A 4 by 7 rectangle has perimeter 22 because 4 + 7 + 4 + 7 = 22."
  - "The perimeter is 22."
explanation: "4 x 7 finds area. Perimeter adds all sides."
hint: "Perimeter means around."
questionGoal: "Correct area/perimeter confusion."
misconception: "Using area formula for perimeter."
```

```question
key: u12_l06_q04_identify_error_type
type: multiple-choice
prompt: "A student reads each picture in a graph as 1, but the key says each picture = 5. What is the error?"
choices: ["ignored the scale", "used the wrong fraction", "found perimeter", "rounded to a hundred"]
correctAnswer: "ignored the scale"
explanation: "The key changes the value of each picture."
hint: "Look at what each picture stands for."
questionGoal: "Identify a scaled graph error."
misconception: "Counting symbols by ones."
```

```question
key: u12_l06_q05_match_error_fix
type: match-pairs
prompt: "Match each error to a fix."
pairs:
  - left: "Adds factors"
    right: "Use equal groups"
  - left: "Ignores graph key"
    right: "Use the scale"
  - left: "Counts tick marks for fractions"
    right: "Count intervals"
  - left: "Uses square units for perimeter"
    right: "Use length units"
explanation: "Each fix names the mathematical structure that was missed."
hint: "Identify what the student forgot to check."
questionGoal: "Connect common errors to corrective strategies."
misconception: "Fixing arithmetic only without addressing the idea."
```

```question
key: u12_l06_q06_explain_error_fix
type: constructed-response
prompt: "Pick one error: adding factors, ignoring scale, or mixing area and perimeter. Explain how to fix it."
minWords: 10
sampleAnswer: "To fix adding factors, I check for equal groups and multiply groups by the size of each group."
checklist: ["Name the error", "Explain a mathematical fix"]
explanation: "Good error correction names the mistaken idea and the correct structure."
hint: "Choose one error and state the strategy that prevents it."
questionGoal: "Explain a misconception-based correction."
misconception: "Correcting only the final answer without reasoning."
```

### Lesson 7: Grade 3 Math Mastery Task

```question
key: u12_l07_q01_capstone_operations
type: passage-question
prompt: "Read the story and answer."
passageTitle: "Field Trip Packs"
passage: "There are 8 bags with 6 snacks in each bag. Students eat 14 snacks."
question: "How many snacks are left?"
choices: ["34", "48", "62", "86"]
correctAnswer: "34"
explanation: "8 x 6 = 48 snacks, and 48 - 14 = 34."
hint: "Find the total snacks first."
questionGoal: "Assess mixed two-step operation mastery."
misconception: "Adding all numbers or stopping after multiplication."
```

```question
key: u12_l07_q02_capstone_fraction
type: multiple-choice
prompt: "Which statement is true?"
choices: ["3/4 is greater than 3/8 because fourths are larger than eighths.", "3/8 is greater because 8 is greater than 4.", "3/4 equals 3/8 because both start with 3.", "Fractions cannot be compared."]
correctAnswer: "3/4 is greater than 3/8 because fourths are larger than eighths."
explanation: "Same numerator means compare the size of the parts."
hint: "Compare one fourth and one eighth."
questionGoal: "Assess fraction comparison reasoning."
misconception: "Larger denominator means larger fraction."
```

```question
key: u12_l07_q03_capstone_measurement
type: multiple-choice
prompt: "A picture graph key says each symbol = 4 books. A row has 9 symbols. How many books?"
choices: ["13", "36", "49", "94"]
correctAnswer: "36"
explanation: "9 x 4 = 36 books."
hint: "Use the key for each symbol."
questionGoal: "Assess scaled graph interpretation."
misconception: "Counting each symbol as one."
```

```question
key: u12_l07_q04_capstone_geometry
type: text-input
prompt: "Type the area of a rectangle that is 7 units by 5 units."
acceptedAnswers: ["35"]
answerType: number
explanation: "7 x 5 = 35 square units."
hint: "Area is rows times columns."
questionGoal: "Assess rectangular area fluency."
misconception: "Giving perimeter 24."
```

```question
key: u12_l07_q05_capstone_match
type: match-pairs
prompt: "Match each task to the best first move."
pairs:
  - left: "Compare 2/6 and 5/6"
    right: "compare numerators"
  - left: "Find 72 / 8"
    right: "use 8 x ? = 72"
  - left: "Find perimeter"
    right: "add side lengths"
  - left: "Round 386 to nearest hundred"
    right: "compare to 350"
explanation: "Mastery includes choosing the right first move."
hint: "Identify the structure before calculating."
questionGoal: "Assess strategy selection across domains."
misconception: "Applying the most recent procedure to every problem."
```

```question
key: u12_l07_q06_capstone_explain
type: constructed-response
prompt: "A student says 5 x 40 = 200. Explain why this answer makes sense."
minWords: 10
sampleAnswer: "40 is 4 tens. 5 x 4 tens is 20 tens, which equals 200."
checklist: ["Mention 4 tens or 20 tens", "Explain place value"]
explanation: "Multiplying by a multiple of 10 uses facts and place value."
hint: "Think of 40 as 4 tens."
questionGoal: "Assess explanation of whole-number place-value multiplication."
misconception: "Using a zero trick without understanding."
```
