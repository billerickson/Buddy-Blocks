# Grade 6 Math Question Sets

Sources: accepted Grade 6 Math blueprint, course map, unit design briefs, and lesson briefs in `research/grade-06-math/`.

## Unit 1: Operation Readiness And Number Sense

### Lesson 1: Estimate Before You Calculate

```question
key: u01_l01_q01_reasonable_product
type: multiple-choice
prompt: "Before calculating 48 x 21, which estimate is most reasonable?"
choices:
  - "About 100"
  - "About 1,000"
  - "About 10,000"
  - "About 20"
correctAnswer: "About 1,000"
explanation: "48 is close to 50 and 21 is close to 20, so 50 x 20 = 1,000."
hint: "Round each factor to a nearby friendly number before multiplying."
questionGoal: "Check whether the student can estimate a product with compatible numbers."
misconception: "Multiplying only visible digits or ignoring place value when estimating."
```

```question
key: u01_l01_q02_quotient_size
type: multiple-choice
prompt: "A student says 392 divided by 8 is 490. Which statement best checks the answer?"
choices:
  - "It is reasonable because 392 is large."
  - "It is too large because 8 x 490 is much more than 392."
  - "It is too small because division always makes a tiny answer."
  - "It is correct because 392 has three digits."
correctAnswer: "It is too large because 8 x 490 is much more than 392."
explanation: "A quotient near 50 is reasonable because 8 x 50 = 400."
hint: "Use multiplication to check the size of a division answer."
questionGoal: "Use inverse reasoning to reject an unreasonable quotient."
misconception: "Accepting a quotient without checking it against the dividend."
```

```question
key: u01_l01_q03_estimation_steps
type: order-items
prompt: "Put the estimation steps for 598 + 203 in a useful order."
items:
  - "Add 600 + 200"
  - "Round 598 to 600"
  - "Round 203 to 200"
  - "Estimate about 800"
correctOrder:
  - "Round 598 to 600"
  - "Round 203 to 200"
  - "Add 600 + 200"
  - "Estimate about 800"
explanation: "Round both addends first, then add the rounded numbers."
hint: "The calculation with rounded numbers comes after the rounding."
questionGoal: "Sequence a simple estimation process."
misconception: "Calculating before choosing useful benchmark numbers."
```

```question
key: u01_l01_q04_estimate_difference
type: fill-blank
prompt: "Complete the estimate."
sentenceBefore: "721 - 394 is close to 700 - 400, so it is about"
sentenceAfter: "."
choices:
  - "100"
  - "300"
  - "500"
  - "1,100"
correctAnswer: "300"
explanation: "700 - 400 = 300, so the exact difference should be close to 300."
hint: "Subtract the rounded numbers."
questionGoal: "Use rounded values to estimate a difference."
misconception: "Choosing an estimate without performing the benchmark operation."
```

```question
key: u01_l01_q05_reasonable_decimal_sum
type: multiple-choice
prompt: "Which answer is reasonable for 19.8 + 4.7?"
choices:
  - "2.45"
  - "24.5"
  - "245"
  - "14.1"
correctAnswer: "24.5"
explanation: "19.8 is about 20 and 4.7 is about 5, so the sum should be about 25."
hint: "Estimate with 20 + 5."
questionGoal: "Use estimation to choose a reasonable decimal sum."
misconception: "Misplacing the decimal point in a sum."
```

```question
key: u01_l01_q06_explain_estimate_use
type: multiple-choice
prompt: "Which explanation best shows how estimating before computing 62 x 39 can help catch a mistake?"
choices:
  - "62 x 39 is close to 60 x 40, or 2,400, so an answer like 240 would be too small."
  - "62 x 39 is close to 60 + 40, so the answer should be about 100."
  - "Estimating after multiplying is faster than checking before multiplying."
  - "Because 62 and 39 are both two-digit numbers, any two-digit answer is reasonable."
correctAnswer: "62 x 39 is close to 60 x 40, or 2,400, so an answer like 240 would be too small."
explanation: "An estimate gives a reasonable range before you do exact work."
hint: "Round 62 and 39 to nearby tens."
questionGoal: "Explain estimation as a reasonableness check."
misconception: "Treating estimation as optional guessing rather than a checking tool."
```

### Lesson 2: Decimal Place Value And Operations

```question
key: u01_l02_q01_place_value_digit
type: multiple-choice
prompt: "In 7.482, what is the value of the digit 8?"
choices:
  - "8"
  - "0.8"
  - "0.08"
  - "0.008"
correctAnswer: "0.08"
explanation: "The 8 is in the hundredths place, so its value is 8 hundredths, or 0.08."
hint: "Read the places to the right of the decimal: tenths, hundredths, thousandths."
questionGoal: "Identify decimal digit value by place."
misconception: "Treating a decimal digit as its face value."
```

```question
key: u01_l02_q02_align_decimals
type: fill-blank
prompt: "Complete the place-value statement."
sentenceBefore: "To add 12.6 + 3.45, line up the"
sentenceAfter: "before adding."
choices:
  - "decimal points"
  - "last digits"
  - "largest digits"
  - "digits farthest right"
correctAnswer: "decimal points"
explanation: "Lining up decimal points lines up ones, tenths, and hundredths."
hint: "You want tenths under tenths and hundredths under hundredths."
questionGoal: "Connect decimal addition to place-value alignment."
misconception: "Aligning decimal numbers by the last digit instead of place value."
```

```question
key: u01_l02_q03_decimal_sum
type: text-input
prompt: "Type the sum: 18.75 + 4.6"
acceptedAnswers:
  - "23.35"
answerType: number
explanation: "4.6 is 4.60, so 18.75 + 4.60 = 23.35."
hint: "Write 4.6 as 4.60 before adding."
questionGoal: "Compute a decimal sum with unlike decimal places."
misconception: "Forgetting that 4.6 has zero hundredths."
```

```question
key: u01_l02_q04_decimal_product_size
type: multiple-choice
prompt: "Which estimate best checks 6.2 x 4?"
choices:
  - "About 2.5"
  - "About 24"
  - "About 240"
  - "About 0.24"
correctAnswer: "About 24"
explanation: "6.2 is close to 6, and 6 x 4 = 24."
hint: "Round 6.2 to a nearby whole number."
questionGoal: "Estimate a decimal product to check magnitude."
misconception: "Misplacing the decimal point in multiplication."
```

```question
key: u01_l02_q05_decimal_division
type: text-input
prompt: "Type the quotient: 14.4 divided by 6"
acceptedAnswers:
  - "2.4"
answerType: number
explanation: "144 tenths divided by 6 is 24 tenths, or 2.4."
hint: "Think of 14.4 as 144 tenths."
questionGoal: "Divide a decimal by a whole number using place value."
misconception: "Losing the decimal unit in the quotient."
```

```question
key: u01_l02_q06_decimal_error
type: error-correction
prompt: "Correct the answer."
sentence: "3.8 + 12.47 = 12.85"
acceptedAnswers:
  - "3.8 + 12.47 = 16.27"
  - "12.47 + 3.8 = 16.27"
explanation: "3.8 is 3.80, and 12.47 + 3.80 = 16.27."
hint: "Line up the decimal points and rewrite 3.8 as 3.80."
questionGoal: "Correct a decimal addition place-value error."
misconception: "Adding decimal digits without aligning place values."
```

### Lesson 3: Fraction Magnitude And Benchmarks

```question
key: u01_l03_q01_less_than_half
type: multiple-choice
prompt: "Which fraction is less than 1/2?"
choices:
  - "3/8"
  - "5/8"
  - "4/6"
  - "6/10"
correctAnswer: "3/8"
explanation: "Half of 8 is 4, and 3/8 is less than 4/8."
hint: "Compare the numerator to half of the denominator."
questionGoal: "Classify a fraction using the 1/2 benchmark."
misconception: "Comparing only denominators or only numerators."
```

```question
key: u01_l03_q02_match_benchmarks
type: match-pairs
prompt: "Match each fraction to the best benchmark description."
pairs:
  - left: "1/9"
    right: "near 0"
  - left: "4/8"
    right: "equal to 1/2"
  - left: "7/8"
    right: "near 1"
  - left: "5/6"
    right: "more than 1/2"
explanation: "Benchmarks help compare fractions before using procedures."
hint: "Ask whether each fraction is close to 0, 1/2, or 1."
questionGoal: "Connect fractions to benchmark regions."
misconception: "Treating all proper fractions as about the same size."
```

```question
key: u01_l03_q03_order_fractions
type: order-items
prompt: "Put the fractions in order from least to greatest."
items:
  - "3/4"
  - "1/5"
  - "5/6"
  - "1/2"
correctOrder:
  - "1/5"
  - "1/2"
  - "3/4"
  - "5/6"
explanation: "1/5 is near 0, 1/2 is the benchmark, 3/4 is greater than 1/2, and 5/6 is closer to 1."
hint: "Place each fraction near 0, 1/2, or 1 before ordering."
questionGoal: "Order fractions using benchmark magnitude."
misconception: "Ordering fractions by denominator size alone."
```

```question
key: u01_l03_q04_fraction_compare
type: multiple-choice
prompt: "Which comparison is true?"
choices:
  - "7/10 < 1/2"
  - "2/3 > 1/2"
  - "5/12 = 1/2"
  - "1/8 > 3/4"
correctAnswer: "2/3 > 1/2"
explanation: "Half of 3 is 1.5, and 2 thirds is more than half."
hint: "Compare each fraction to the 1/2 benchmark."
questionGoal: "Choose a true fraction comparison using benchmarks."
misconception: "Assuming larger denominators always make larger fractions."
```

```question
key: u01_l03_q05_decimal_fraction_benchmark
type: fill-blank
prompt: "Complete the comparison."
sentenceBefore: "0.6 is"
sentenceAfter: "1/2."
choices:
  - "less than"
  - "equal to"
  - "greater than"
  - "unrelated to"
correctAnswer: "greater than"
explanation: "1/2 equals 0.5, and 0.6 is greater than 0.5."
hint: "Use the decimal form of 1/2."
questionGoal: "Compare a decimal to a fraction benchmark."
misconception: "Failing to connect common fractions and decimals."
```

```question
key: u01_l03_q06_explain_fraction
type: multiple-choice
prompt: "Which explanation best shows why 5/12 is less than 1/2?"
choices:
  - "Half of 12 is 6, and 5 parts out of 12 is less than 6 parts out of 12."
  - "5/12 is less than 1/2 because 12 is a larger number than 5."
  - "5/12 is equal to 1/2 because 5 is close to 6."
  - "5/12 is greater than 1/2 because 5 is greater than 1."
correctAnswer: "Half of 12 is 6, and 5 parts out of 12 is less than 6 parts out of 12."
explanation: "Because 1/2 is 6/12, 5/12 is slightly less than half."
hint: "Rewrite 1/2 with denominator 12."
questionGoal: "Explain a benchmark comparison using equivalent fractions."
misconception: "Comparing fractions without identifying the benchmark amount."
```

### Lesson 4: Multiplication, Division, And What The Quotient Means

```question
key: u01_l04_q01_sharing_meaning
type: multiple-choice
prompt: "24 granola bars are shared equally by 6 hikers. What does the quotient mean?"
choices:
  - "The number of hikers"
  - "The number of bars each hiker gets"
  - "The total number of bars"
  - "The number of bars left over"
correctAnswer: "The number of bars each hiker gets"
explanation: "The number of groups is known: 6 hikers. The quotient tells the size of each share."
hint: "Ask what the question is trying to find."
questionGoal: "Interpret a quotient in a sharing division context."
misconception: "Treating the quotient as the number of groups."
```

```question
key: u01_l04_q02_grouping_meaning
type: multiple-choice
prompt: "24 granola bars are packed 6 bars per box. What does 24 divided by 6 mean?"
choices:
  - "4 boxes"
  - "4 bars in each box"
  - "6 boxes"
  - "30 bars"
correctAnswer: "4 boxes"
explanation: "The group size is 6 bars per box, so the quotient tells how many boxes can be made."
hint: "The divisor tells how many bars go in one box."
questionGoal: "Interpret a quotient in a grouping division context."
misconception: "Confusing group size with number of groups."
```

```question
key: u01_l04_q03_match_quotient_labels
type: match-pairs
prompt: "Match each division situation to what the quotient counts."
pairs:
  - left: "36 miles in 3 hours"
    right: "miles per hour"
  - left: "36 stickers, 3 per page"
    right: "pages"
  - left: "36 stickers shared by 3 students"
    right: "stickers per student"
  - left: "$36 for 3 tickets"
    right: "dollars per ticket"
explanation: "The same division can answer different questions depending on the units."
hint: "Look at what one group or one unit is."
questionGoal: "Connect division contexts to quotient labels."
misconception: "Dropping units and treating all quotients as the same kind of number."
```

```question
key: u01_l04_q04_division_not_smaller
type: multiple-choice
prompt: "Which example shows that division does not always make the answer smaller than the number being divided?"
choices:
  - "12 divided by 4 = 3"
  - "12 divided by 2 = 6"
  - "12 divided by 1 = 12"
  - "12 divided by 6 = 2"
correctAnswer: "12 divided by 1 = 12"
explanation: "Dividing by 1 gives the original number, so the quotient is not smaller."
hint: "Look for a quotient that is equal to the starting number."
questionGoal: "Prepare for fraction division by challenging the 'division makes smaller' misconception."
misconception: "Assuming every division quotient must be smaller than the dividend."
```

```question
key: u01_l04_q05_unknown_factor
type: fill-blank
prompt: "Complete the related multiplication fact."
sentenceBefore: "72 divided by 9 asks: 9 x"
sentenceAfter: "= 72."
choices:
  - "6"
  - "7"
  - "8"
  - "9"
correctAnswer: "8"
explanation: "Since 9 x 8 = 72, 72 divided by 9 = 8."
hint: "Use division as a missing-factor question."
questionGoal: "Connect division to unknown-factor reasoning."
misconception: "Recalling division as unrelated to multiplication."
```

```question
key: u01_l04_q06_label_quotient
type: multiple-choice
prompt: "A class reads 180 pages in 5 days. Which interpretation of 180 divided by 5 fits this situation?"
choices:
  - "It means the class read 36 pages per day if the same number was read each day."
  - "It means the class read 36 days per page."
  - "It means the class read 180 pages each day."
  - "It means 5 pages were read in all."
correctAnswer: "It means the class read 36 pages per day if the same number was read each day."
explanation: "The quotient is a rate: 36 pages for each day."
hint: "Ask what one day would have."
questionGoal: "Interpret and label a quotient as a rate-like value."
misconception: "Giving a number without a meaningful unit label."
```

### Lesson 5: Choose Exact, Estimate, Or Explain

```question
key: u01_l05_q01_response_type
type: multiple-choice
prompt: "Which response type best fits the question: About how much will 49 notebooks cost at $1.98 each?"
choices:
  - "Estimate"
  - "Exact calculation"
  - "Definition"
  - "Graph"
correctAnswer: "Estimate"
explanation: "The phrase 'about how much' asks for an estimate, such as 50 x $2."
hint: "Look for the word that tells whether exactness is needed."
questionGoal: "Identify when a prompt asks for estimation."
misconception: "Using exact computation even when an estimate is requested."
```

```question
key: u01_l05_q02_exact_needed
type: multiple-choice
prompt: "Which prompt asks for an exact answer?"
choices:
  - "About how many seats are filled?"
  - "Is 987 a reasonable total?"
  - "How many tickets were sold in all?"
  - "Why does this estimate make sense?"
correctAnswer: "How many tickets were sold in all?"
explanation: "This asks for the exact total, not an estimate or explanation."
hint: "An exact prompt usually asks for the actual number."
questionGoal: "Distinguish exact-answer prompts from estimate or explanation prompts."
misconception: "Treating all numerical prompts as estimate prompts."
```

```question
key: u01_l05_q03_model_choice
type: passage-question
prompt: "Read the situation and answer."
passageTitle: "Field Trip Snacks"
passage: |
  A teacher buys 8 boxes of granola bars. Each box has 18 bars.
  The teacher wants to know whether there are enough for about 150 students.
question: "What kind of response is most useful first?"
choices:
  - "Estimate 8 x 18 and compare it with 150"
  - "Compute 8 x 18 exactly before checking about 150"
  - "Write a percent"
  - "Make a graph of snack boxes over time"
correctAnswer: "Estimate 8 x 18 and compare it with 150"
explanation: "The question asks whether there are enough for about 150 students, so an estimate can answer quickly."
hint: "The word 'about' is a clue."
questionGoal: "Choose estimation for a sufficiency decision."
misconception: "Choosing a recently learned representation even when it does not fit."
```

```question
key: u01_l05_q04_compute_exact
type: text-input
prompt: "A recipe uses 2.5 cups of oats per batch. How many cups are needed for exactly 4 batches?"
acceptedAnswers:
  - "10"
  - "10 cups"
answerType: text
explanation: "2.5 x 4 = 10, so exactly 10 cups are needed."
hint: "Multiply cups per batch by number of batches."
questionGoal: "Compute an exact answer when exact quantity is requested."
misconception: "Estimating when an exact amount is needed."
```

```question
key: u01_l05_q05_explain_reasonable
type: multiple-choice
prompt: "A student says 31 x 19 = 589. Which explanation best checks whether this is reasonable without multiplying exactly?"
choices:
  - "31 is about 30 and 19 is about 20, so the product should be near 600."
  - "31 + 19 is about 50, so 589 is too large."
  - "The answer is reasonable because any three-digit number would work."
  - "The answer is not reasonable because an estimate must equal the exact product."
correctAnswer: "31 is about 30 and 19 is about 20, so the product should be near 600."
explanation: "30 x 20 = 600, and 589 is close to 600."
hint: "Round each factor to the nearest ten."
questionGoal: "Use estimation to explain reasonableness."
misconception: "Thinking reasonableness can only be checked with exact calculation."
```

```question
key: u01_l05_q06_sort_response_types
type: match-pairs
prompt: "Match each prompt to the response it asks for."
pairs:
  - left: "About how far?"
    right: "estimate"
  - left: "Exactly how many?"
    right: "compute"
  - left: "How do you know?"
    right: "explain"
  - left: "Which answer is impossible?"
    right: "reasonableness check"
explanation: "Prompt language tells what kind of mathematical evidence is needed."
hint: "Look for words like about, exactly, explain, or impossible."
questionGoal: "Classify prompt language by response type."
misconception: "Answering every prompt with only a number."
```

## Unit 2: Ratio Language And Equivalent Ratios

### Lesson 1: What A Ratio Compares

```question
key: u02_l01_q01_ratio_statement
type: multiple-choice
prompt: "A basket has 3 apples and 5 oranges. Which statement describes the ratio of apples to oranges?"
choices:
  - "3 to 5"
  - "5 to 3"
  - "3 to 8"
  - "8 to 5"
correctAnswer: "3 to 5"
explanation: "Apples are named first, so the ratio is 3 apples to 5 oranges."
hint: "Keep the quantities in the same order as the words."
questionGoal: "Identify the quantities and order in a ratio."
misconception: "Reversing ratio order or using the total when not asked."
```

```question
key: u02_l01_q02_compare_quantities
type: fill-blank
prompt: "Complete the ratio sentence."
sentenceBefore: "For every 4 blue tiles, there are"
sentenceAfter: "green tiles if the ratio of blue to green is 4:7."
choices:
  - "3"
  - "4"
  - "7"
  - "11"
correctAnswer: "7"
explanation: "The second number in 4:7 tells the number of green tiles for every 4 blue tiles."
hint: "Blue is named first and green is named second."
questionGoal: "Interpret each number in a ratio statement."
misconception: "Treating a ratio as a total instead of a comparison."
```

```question
key: u02_l01_q03_match_ratio_context
type: match-pairs
prompt: "Match each situation to the ratio named."
pairs:
  - left: "2 cups lemon juice and 3 cups water, juice to water"
    right: "2:3"
  - left: "6 red beads and 4 white beads, white to red"
    right: "4:6"
  - left: "5 wins and 1 loss, wins to losses"
    right: "5:1"
  - left: "7 boys and 9 girls, girls to boys"
    right: "9:7"
explanation: "The ratio order follows the order of the quantities named."
hint: "Read the phrase after the comma carefully."
questionGoal: "Match ratio notation to contextual order."
misconception: "Assuming ratios can be reversed without changing meaning."
```

```question
key: u02_l01_q04_total_not_ratio
type: multiple-choice
prompt: "There are 4 violins and 6 cellos. Which question asks for a ratio, not just a total?"
choices:
  - "How many instruments are there altogether?"
  - "How many more cellos than violins are there?"
  - "What is the ratio of violins to cellos?"
  - "How many cellos are there?"
correctAnswer: "What is the ratio of violins to cellos?"
explanation: "A ratio compares two quantities. The other questions ask for a total, difference, or single amount."
hint: "Look for a comparison between two quantities."
questionGoal: "Distinguish ratio questions from total or difference questions."
misconception: "Treating any two-number situation as a ratio task."
```

```question
key: u02_l01_q05_write_ratio
type: text-input
prompt: "A trail mix has 8 peanuts for every 3 raisins. Type the ratio of peanuts to raisins using a colon."
acceptedAnswers:
  - "8:3"
  - "8 to 3"
answerType: text
explanation: "Peanuts are named first, so the ratio is 8:3."
hint: "Use the order peanuts, then raisins."
questionGoal: "Produce ratio notation from a verbal ratio."
misconception: "Reversing the order of the quantities."
```

```question
key: u02_l01_q06_explain_ratio
type: multiple-choice
prompt: "Which explanation matches the ratio 2:5 if it compares red markers to black markers?"
choices:
  - "It means there are 2 red markers for every 5 black markers."
  - "It means there are 5 red markers for every 2 black markers."
  - "It means there are 2 red markers and 5 markers total."
  - "It means 2 markers are red out of every 5 markers."
correctAnswer: "It means there are 2 red markers for every 5 black markers."
explanation: "A ratio statement should name both quantities in order."
hint: "Use the phrase 'for every.'"
questionGoal: "Explain a ratio in contextual language."
misconception: "Describing a ratio as two unrelated numbers."
```

### Lesson 2: Part-To-Part And Part-To-Whole

```question
key: u02_l02_q01_part_to_whole
type: multiple-choice
prompt: "A bowl has 6 strawberries and 4 blueberries. What is the ratio of strawberries to all berries?"
choices:
  - "6:4"
  - "4:6"
  - "6:10"
  - "10:6"
correctAnswer: "6:10"
explanation: "There are 10 berries total, so strawberries to all berries is 6:10."
hint: "Part-to-whole compares one part to the total."
questionGoal: "Identify a part-to-whole ratio."
misconception: "Using the other part instead of the whole."
```

```question
key: u02_l02_q02_ratio_type
type: multiple-choice
prompt: "The ratio of cats to dogs in a shelter is 7:5. What type of comparison is this?"
choices:
  - "part-to-part"
  - "part-to-whole"
  - "whole-to-whole"
  - "unit rate"
correctAnswer: "part-to-part"
explanation: "Cats and dogs are two parts of the shelter animal group."
hint: "Ask whether the comparison includes the total."
questionGoal: "Classify a ratio as part-to-part."
misconception: "Assuming every ratio involving a group is part-to-whole."
```

```question
key: u02_l02_q03_match_ratio_types
type: match-pairs
prompt: "Match each comparison to the ratio description it uses."
pairs:
  - left: "boys to girls"
    right: "two student parts compared"
  - left: "girls to all students"
    right: "one student part compared with the total"
  - left: "red tiles to total tiles"
    right: "one tile part compared with all tiles"
  - left: "blue tiles to green tiles"
    right: "two tile parts compared"
explanation: "A ratio to the total is part-to-whole; a ratio between two parts is part-to-part."
hint: "Look for words like all, total, or whole."
questionGoal: "Distinguish comparison types using language clues."
misconception: "Ignoring total language in a ratio description."
```

```question
key: u02_l02_q04_total_needed
type: fill-blank
prompt: "A team has 9 sixth graders and 3 fifth graders."
sentenceBefore: "The ratio of fifth graders to all team members is 3:"
sentenceAfter: "."
choices:
  - "6"
  - "9"
  - "12"
  - "3"
correctAnswer: "12"
explanation: "There are 9 + 3 = 12 team members total."
hint: "Find the whole before writing the part-to-whole ratio."
questionGoal: "Use the total in a part-to-whole ratio."
misconception: "Using the other part instead of the whole."
```

```question
key: u02_l02_q05_choose_ratio_question
type: multiple-choice
prompt: "A bag has 5 yellow cubes and 7 green cubes. Which ratio answers 'yellow cubes to green cubes'?"
choices:
  - "5:7"
  - "5:12"
  - "7:5"
  - "12:5"
correctAnswer: "5:7"
explanation: "The question compares one part to another part: yellow to green."
hint: "This question does not ask for all cubes."
questionGoal: "Select a part-to-part ratio from a two-part situation."
misconception: "Using the total when the comparison is part-to-part."
```

```question
key: u02_l02_q06_explain_two_ratios
type: multiple-choice
prompt: "A club has 8 runners and 2 walkers. Which explanation correctly compares the ratios 8:2 and 8:10?"
choices:
  - "8:2 compares runners to walkers, while 8:10 compares runners to all club members."
  - "8:2 and 8:10 both compare runners to walkers."
  - "8:10 compares runners to walkers because 10 is the number of walkers."
  - "8:2 compares all club members to runners."
correctAnswer: "8:2 compares runners to walkers, while 8:10 compares runners to all club members."
explanation: "The same situation can create different ratios depending on the comparison."
hint: "Find what the second number means in each ratio."
questionGoal: "Explain part-to-part versus part-to-whole ratios in one context."
misconception: "Treating different ratios from the same context as interchangeable."
```

### Lesson 3: Tape Diagrams For Ratios

```question
key: u02_l03_q01_tape_units
type: multiple-choice
prompt: "A tape diagram for the ratio red:blue = 2:3 has 10 red marbles. How many marbles does one tape unit represent?"
choices:
  - "2"
  - "3"
  - "5"
  - "10"
correctAnswer: "5"
explanation: "The 2 red tape units represent 10 red marbles, so each unit is 5 marbles."
hint: "Divide the red amount by the number of red tape units."
questionGoal: "Find the value of one tape unit in a ratio diagram."
misconception: "Using the total ratio units instead of the known side."
```

```question
key: u02_l03_q02_missing_tape_amount
type: text-input
prompt: "The ratio of dogs to cats is 3:4. If 3 dog tape units represent 15 dogs, how many cats are represented by 4 cat tape units?"
acceptedAnswers:
  - "20"
  - "20 cats"
answerType: text
explanation: "Each tape unit is 5 animals, so 4 cat units represent 20 cats."
hint: "Find one tape unit first."
questionGoal: "Use a tape diagram unit value to find a missing ratio quantity."
misconception: "Adding 1 to the known amount because 4 is one more than 3."
```

```question
key: u02_l03_q03_total_from_tape
type: fill-blank
prompt: "A ratio tape has 2 parts juice and 5 parts water. Each part is 3 cups."
sentenceBefore: "The total mixture is"
sentenceAfter: "cups."
choices:
  - "7"
  - "10"
  - "15"
  - "21"
correctAnswer: "21"
explanation: "There are 2 + 5 = 7 tape parts, and 7 x 3 = 21 cups."
hint: "Find the total number of equal parts first."
questionGoal: "Use a tape diagram to find a total quantity."
misconception: "Multiplying only one side of the ratio."
```

```question
key: u02_l03_q04_match_tape
type: match-pairs
prompt: "Match each ratio to the number of total tape units."
pairs:
  - left: "1:4"
    right: "5 total units"
  - left: "2:4"
    right: "6 total units"
  - left: "3:5"
    right: "8 total units"
  - left: "4:6"
    right: "10 total units"
explanation: "Total tape units come from adding the parts in the ratio."
hint: "Add the two numbers in the ratio."
questionGoal: "Connect ratio parts to total tape units."
misconception: "Treating one number in the ratio as the total."
```

```question
key: u02_l03_q05_tape_context
type: passage-question
prompt: "Read the situation and answer."
passageTitle: "Paint Mix"
passage: |
  A paint mix uses 3 equal parts blue paint and 2 equal parts white paint.
  One equal part is 4 cups.
question: "How many cups of blue paint are used?"
choices:
  - "4 cups"
  - "8 cups"
  - "12 cups"
  - "20 cups"
correctAnswer: "12 cups"
explanation: "Blue paint has 3 parts, and each part is 4 cups, so 3 x 4 = 12 cups."
hint: "Use only the blue tape units for blue paint."
questionGoal: "Interpret one side of a ratio tape in context."
misconception: "Using total mixture amount when only one quantity is asked."
```

```question
key: u02_l03_q06_explain_tape_unit
type: multiple-choice
prompt: "In a 4:1 ratio, the 4 tape units represent 28 minutes. Which explanation correctly finds the value of one tape unit?"
choices:
  - "Divide 28 minutes by 4 tape units, so one unit is 7 minutes."
  - "Divide 28 minutes by all 5 ratio units because 4 + 1 = 5."
  - "Multiply 28 minutes by 4 because there are 4 tape units."
  - "Use 1 minute for each unit because the second ratio number is 1."
correctAnswer: "Divide 28 minutes by 4 tape units, so one unit is 7 minutes."
explanation: "A tape unit is the equal amount represented by one segment."
hint: "The 28 minutes are spread across 4 equal units."
questionGoal: "Explain how to find one tape unit from a known ratio amount."
misconception: "Using all ratio parts when only one side's amount is given."
```

### Lesson 4: Ratio Tables And Multiplicative Scaling

```question
key: u02_l04_q01_equivalent_ratio
type: multiple-choice
prompt: "Which ratio is equivalent to 3:5?"
choices:
  - "6:10"
  - "4:6"
  - "8:10"
  - "6:8"
correctAnswer: "6:10"
explanation: "3 and 5 are both multiplied by 2 to get 6:10."
hint: "Look for the same multiplication factor on both numbers."
questionGoal: "Identify an equivalent ratio by multiplicative scaling."
misconception: "Adding the same number to both quantities."
```

```question
key: u02_l04_q02_complete_ratio_table
type: multi-blank-cloze
prompt: "Complete the ratio table for 2 cups rice to 5 cups water."
parts:
  - "Rice: 2, 4, "
  - ". Water: 5, "
  - ", 15."
blanks:
  - correctAnswer: "6"
    acceptedAnswers:
      - "6"
  - correctAnswer: "10"
    acceptedAnswers:
      - "10"
explanation: "The rows are multiplied by 1, 2, and 3: 2:5, 4:10, 6:15."
hint: "Scale both quantities by the same factor."
questionGoal: "Complete a ratio table with integer scale factors."
misconception: "Scaling one row without scaling the other."
```

```question
key: u02_l04_q03_scale_factor
type: fill-blank
prompt: "Complete the scaling statement."
sentenceBefore: "To go from 4:9 to 20:45, multiply both quantities by"
sentenceAfter: "."
choices:
  - "4"
  - "5"
  - "9"
  - "16"
correctAnswer: "5"
explanation: "4 x 5 = 20 and 9 x 5 = 45."
hint: "Find what 4 was multiplied by to make 20."
questionGoal: "Identify a scale factor between equivalent ratios."
misconception: "Using the difference between terms instead of the multiplier."
```

```question
key: u02_l04_q04_not_equivalent
type: multiple-choice
prompt: "Which ratio is NOT equivalent to 2:7?"
choices:
  - "4:14"
  - "6:21"
  - "8:28"
  - "10:21"
correctAnswer: "10:21"
explanation: "2 x 5 = 10, but 7 x 5 = 35, not 21."
hint: "Check whether both numbers use the same multiplier."
questionGoal: "Detect a non-equivalent ratio in a set."
misconception: "Checking only one quantity for a scale relationship."
```

```question
key: u02_l04_q05_table_error
type: error-correction
prompt: "Correct the false equivalent ratio."
sentence: "The ratio 3:4 is equivalent to 6:7."
acceptedAnswers:
  - "The ratio 3:4 is equivalent to 6:8."
  - "3:4 is equivalent to 6:8."
explanation: "Multiplying 3 by 2 gives 6, so 4 must also be multiplied by 2 to get 8."
hint: "Use the same scale factor on both parts."
questionGoal: "Correct additive scaling in an equivalent ratio."
misconception: "Adding 3 to both quantities instead of multiplying both by 2."
```

```question
key: u02_l04_q06_explain_scaling
type: multiple-choice
prompt: "Which explanation best shows why 12:18 is equivalent to 2:3?"
choices:
  - "Both numbers in 2:3 are multiplied by 6, so the comparison stays the same."
  - "Both ratios are equivalent because 12 and 18 are even numbers."
  - "The ratios are equivalent because 12 + 18 and 2 + 3 are both totals."
  - "The ratios are equivalent because the same number is added to 2 and 3."
correctAnswer: "Both numbers in 2:3 are multiplied by 6, so the comparison stays the same."
explanation: "Equivalent ratios preserve the same multiplicative relationship."
hint: "Ask what number turns 2 into 12 and 3 into 18."
questionGoal: "Explain equivalent ratios using a common scale factor."
misconception: "Believing equivalent ratios only look similar, not scaled."
```

### Lesson 5: Double Number Lines For Equivalent Ratios

```question
key: u02_l05_q01_aligned_marks
type: fill-blank
prompt: "A double number line shows 3 notebooks cost $12."
sentenceBefore: "At 1 notebook, the aligned cost should be $"
sentenceAfter: "."
choices:
  - "3"
  - "4"
  - "9"
  - "12"
correctAnswer: "4"
explanation: "$12 divided by 3 notebooks is $4 per notebook."
hint: "Move from 3 notebooks to 1 notebook by dividing by 3."
questionGoal: "Use aligned double-number-line marks to find a per-1 value."
misconception: "Treating the total cost as the cost for one item."
```

```question
key: u02_l05_q02_double_line_sequence
type: order-items
prompt: "Put the top number-line marks for equivalent ratios in order: 0, 2, 4, 6."
items:
  - "4"
  - "0"
  - "6"
  - "2"
correctOrder:
  - "0"
  - "2"
  - "4"
  - "6"
explanation: "Marks on a number line increase from left to right."
hint: "Start at zero and move right."
questionGoal: "Order marks on a double number line."
misconception: "Reading number-line values out of sequence."
```

```question
key: u02_l05_q03_missing_aligned_pair
type: text-input
prompt: "A double number line for 2 cups concentrate to 5 cups water has 10 cups water. Type the aligned amount of concentrate."
acceptedAnswers:
  - "4"
  - "4 cups"
answerType: text
explanation: "Water went from 5 to 10, so multiply by 2. Concentrate goes from 2 to 4."
hint: "Use the same scale factor on the concentrate line."
questionGoal: "Complete an aligned pair on a double number line."
misconception: "Adding 5 to both lines instead of scaling."
```

```question
key: u02_l05_q04_match_aligned_pairs
type: match-pairs
prompt: "For the ratio 4 miles to 1 hour, match each miles mark to the aligned hours mark."
pairs:
  - left: "4 miles"
    right: "1 hour"
  - left: "8 miles"
    right: "2 hours"
  - left: "12 miles"
    right: "3 hours"
  - left: "20 miles"
    right: "5 hours"
explanation: "Each aligned pair keeps the rate 4 miles for every 1 hour."
hint: "Divide miles by 4 to find hours."
questionGoal: "Match equivalent rate pairs on a double number line."
misconception: "Matching by nearby numbers instead of the ratio relationship."
```

```question
key: u02_l05_q05_double_line_context
type: multiple-choice
prompt: "A double number line shows 6 laps in 15 minutes. Which aligned pair belongs on the same line?"
choices:
  - "12 laps, 30 minutes"
  - "12 laps, 21 minutes"
  - "7 laps, 16 minutes"
  - "3 laps, 15 minutes"
correctAnswer: "12 laps, 30 minutes"
explanation: "Doubling both 6 laps and 15 minutes gives 12 laps and 30 minutes."
hint: "Equivalent pairs use the same scale factor on both lines."
questionGoal: "Identify an equivalent aligned pair in context."
misconception: "Adding the same amount to both quantities."
```

```question
key: u02_l05_q06_explain_double_line
type: multiple-choice
prompt: "Which explanation best shows how a double number line can show that 3:8 and 9:24 are equivalent?"
choices:
  - "The marks 3 and 8 align, and multiplying both by 3 gives aligned marks 9 and 24."
  - "Any two marks can align if they are placed close together."
  - "3:8 and 9:24 are equivalent because 6 is added to 3 and 16 is added to 8."
  - "They are equivalent because both ratios have two numbers."
correctAnswer: "The marks 3 and 8 align, and multiplying both by 3 gives aligned marks 9 and 24."
explanation: "Double number lines show equivalent ratios as pairs of aligned marks."
hint: "Find the scale factor from 3 to 9 and from 8 to 24."
questionGoal: "Explain equivalent ratios using double-number-line structure."
misconception: "Thinking alignment is arbitrary rather than based on scaling."
```

### Lesson 6: Spot And Fix Additive Ratio Reasoning

```question
key: u02_l06_q01_additive_error
type: multiple-choice
prompt: "Which student used additive reasoning instead of multiplicative scaling?"
choices:
  - "Ari: 2:5 becomes 4:10 because both numbers are doubled."
  - "Bea: 2:5 becomes 6:15 because both numbers are multiplied by 3."
  - "Cam: 2:5 becomes 5:8 because both numbers have 3 added."
  - "Dee: 2:5 becomes 10:25 because both numbers are multiplied by 5."
correctAnswer: "Cam: 2:5 becomes 5:8 because both numbers have 3 added."
explanation: "Adding the same amount does not preserve the ratio; equivalent ratios use the same multiplier."
hint: "Look for adding instead of multiplying."
questionGoal: "Identify additive reasoning in a ratio example."
misconception: "Believing equal additive changes preserve a ratio."
```

```question
key: u02_l06_q02_fix_ratio
type: error-correction
prompt: "Correct the student's equivalent ratio."
sentence: "The ratio 4:7 is equivalent to 8:11."
acceptedAnswers:
  - "The ratio 4:7 is equivalent to 8:14."
  - "4:7 is equivalent to 8:14."
explanation: "If 4 is doubled to 8, then 7 must be doubled to 14."
hint: "Use the same multiplier that turns 4 into 8."
questionGoal: "Repair an additive-ratio error with multiplicative scaling."
misconception: "Adding 4 to both parts instead of multiplying by 2."
```

```question
key: u02_l06_q03_add_or_multiply
type: fill-blank
prompt: "Complete the rule."
sentenceBefore: "To make an equivalent ratio, multiply or divide"
sentenceAfter: "by the same factor."
choices:
  - "only the first number"
  - "only the larger number"
  - "both quantities"
  - "the total only"
correctAnswer: "both quantities"
explanation: "Both quantities must be scaled by the same factor to preserve the ratio."
hint: "Equivalent means the comparison stays the same."
questionGoal: "State the multiplicative rule for equivalent ratios."
misconception: "Changing only one quantity in a ratio."
```

```question
key: u02_l06_q04_diagnostic_choice
type: multiple-choice
prompt: "A recipe uses 3 cups oats for 2 cups nuts. Which mix keeps the same ratio?"
choices:
  - "6 cups oats and 4 cups nuts"
  - "5 cups oats and 4 cups nuts"
  - "4 cups oats and 3 cups nuts"
  - "6 cups oats and 5 cups nuts"
correctAnswer: "6 cups oats and 4 cups nuts"
explanation: "Both quantities are multiplied by 2: 3 to 6 and 2 to 4."
hint: "Check whether the same scale factor works for both quantities."
questionGoal: "Choose a correctly scaled ratio from plausible additive distractors."
misconception: "Choosing a mix that adds the same amount to both ingredients."
```

```question
key: u02_l06_q05_explain_not_equivalent
type: multiple-choice
prompt: "Which explanation best shows why 3:4 is not equivalent to 5:6?"
choices:
  - "The ratio 5:6 adds 2 to both numbers, but equivalent ratios need the same multiplier."
  - "The ratios are equivalent because both numbers increased."
  - "The ratios are equivalent because 5 - 3 and 6 - 4 are both 2."
  - "The ratios are not equivalent because equivalent ratios can never use different numbers."
correctAnswer: "The ratio 5:6 adds 2 to both numbers, but equivalent ratios need the same multiplier."
explanation: "Adding the same amount changes the multiplicative comparison."
hint: "Ask whether one multiplier turns 3 into 5 and 4 into 6."
questionGoal: "Explain why additive changes do not preserve a ratio."
misconception: "Believing same difference means same ratio."
```

```question
key: u02_l06_q06_table_error
type: passage-question
prompt: "Read the student's ratio table and answer."
passageTitle: "Juice Table"
passage: |
  Juice cups: 2, 4, 6
  Water cups: 5, 7, 9
question: "What is wrong with the table if the starting ratio is 2 cups juice to 5 cups water?"
choices:
  - "It adds 2 to each row instead of scaling both quantities."
  - "It doubles the juice amounts but leaves the water amounts unchanged."
  - "It scales the water amounts correctly but not the juice amounts."
  - "It should keep the water amount at 5 cups in every row."
correctAnswer: "It adds 2 to each row instead of scaling both quantities."
explanation: "The row 4:7 is not equivalent to 2:5 because both quantities were increased additively."
hint: "Check whether 2:5 and 4:7 use the same multiplier."
questionGoal: "Diagnose additive reasoning in a ratio table."
misconception: "Thinking repeated addition creates equivalent ratio rows."
```

## Unit 3: Unit Rates, Percents, And Applied Rates

### Lesson 1: Rate Language And Units

```question
key: u03_l01_q01_rate_meaning
type: multiple-choice
prompt: "What does 45 miles per hour mean?"
choices:
  - "45 miles in 1 hour"
  - "45 hours in 1 mile"
  - "45 miles total no matter the time"
  - "1 mile in 45 hours"
correctAnswer: "45 miles in 1 hour"
explanation: "Miles per hour means miles for each 1 hour."
hint: "The word after per names the 1 unit."
questionGoal: "Interpret a common rate statement."
misconception: "Reversing the units in a rate."
```

```question
key: u03_l01_q02_match_rates
type: match-pairs
prompt: "Match each rate to its meaning."
pairs:
  - left: "$3 per pound"
    right: "3 dollars for 1 pound"
  - left: "20 pages per hour"
    right: "20 pages in 1 hour"
  - left: "6 meters per second"
    right: "6 meters in 1 second"
  - left: "4 points per game"
    right: "4 points in 1 game"
explanation: "The quantity after per is the one-unit quantity."
hint: "Read per as 'for each one.'"
questionGoal: "Connect rate notation to verbal meaning."
misconception: "Treating rate labels as optional words."
```

```question
key: u03_l01_q03_rate_or_not
type: multiple-choice
prompt: "Which statement is a rate?"
choices:
  - "12 apples"
  - "12 apples for 3 dollars"
  - "12 apples are red"
  - "12 apples and 3 oranges"
correctAnswer: "12 apples for 3 dollars"
explanation: "A rate compares quantities with different units: apples and dollars."
hint: "Look for two different units being compared."
questionGoal: "Recognize a rate situation."
misconception: "Calling any number statement a rate."
```

```question
key: u03_l01_q04_unit_order
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "If a car uses 3 gallons for 90 miles, then miles per gallon means"
sentenceAfter: "for 1 gallon."
choices:
  - "3 miles"
  - "30 miles"
  - "90 gallons"
  - "270 miles"
correctAnswer: "30 miles"
explanation: "90 miles divided by 3 gallons is 30 miles for 1 gallon."
hint: "Miles per gallon asks how many miles for one gallon."
questionGoal: "Interpret unit order in a rate context."
misconception: "Computing gallons per mile when miles per gallon is asked."
```

```question
key: u03_l01_q05_rate_context
type: passage-question
prompt: "Read the situation and answer."
passageTitle: "Typing Practice"
passage: |
  Nora types 180 words in 6 minutes.
question: "Which rate describes Nora's typing?"
choices:
  - "30 words per minute"
  - "30 minutes per word"
  - "186 words per minute"
  - "6 words per minute"
correctAnswer: "30 words per minute"
explanation: "180 words divided by 6 minutes is 30 words for each minute."
hint: "Words per minute means divide words by minutes."
questionGoal: "Find and label a simple rate from context."
misconception: "Using total words or reversed units as the rate."
```

```question
key: u03_l01_q06_explain_per
type: multiple-choice
prompt: "Which explanation matches '$2.50 per notebook'?"
choices:
  - "It means one notebook costs 2 dollars and 50 cents."
  - "It means all notebooks together cost $2.50."
  - "It means each dollar buys 2.50 notebooks."
  - "It means 250 notebooks cost $1."
correctAnswer: "It means one notebook costs 2 dollars and 50 cents."
explanation: "Per notebook means for each 1 notebook."
hint: "Use the words 'for one.'"
questionGoal: "Explain rate language in a money context."
misconception: "Reading per as a vague comparison instead of per 1."
```

### Lesson 2: Find The Unit Rate

```question
key: u03_l02_q01_unit_rate_basic
type: text-input
prompt: "A runner goes 24 miles in 3 hours. Type the unit rate in miles per hour."
acceptedAnswers:
  - "8"
  - "8 miles per hour"
  - "8 mph"
answerType: text
explanation: "24 miles divided by 3 hours is 8 miles per hour."
hint: "Divide miles by hours because the rate asks for miles per 1 hour."
questionGoal: "Compute a whole-number unit rate."
misconception: "Dividing in the wrong direction."
```

```question
key: u03_l02_q02_correct_division
type: multiple-choice
prompt: "A pack has 48 pencils in 6 boxes. Which division finds pencils per box?"
choices:
  - "48 divided by 6"
  - "6 divided by 48"
  - "48 + 6"
  - "48 x 6"
correctAnswer: "48 divided by 6"
explanation: "Pencils per box means pencils for each 1 box, so divide pencils by boxes."
hint: "The word after per is the group count."
questionGoal: "Choose the correct division setup for a unit rate."
misconception: "Reversing the quantities in a unit-rate division."
```

```question
key: u03_l02_q03_label_unit_rate
type: fill-blank
prompt: "Complete the label."
sentenceBefore: "$18 for 4 tickets is $4.50"
sentenceAfter: "."
choices:
  - "per ticket"
  - "per dollar"
  - "per 4 tickets"
  - "per hour"
correctAnswer: "per ticket"
explanation: "18 dollars divided by 4 tickets gives dollars for each ticket."
hint: "The unit rate is cost for one ticket."
questionGoal: "Label a computed unit rate correctly."
misconception: "Giving a number without the per-unit label."
```

```question
key: u03_l02_q04_match_unit_rates
type: match-pairs
prompt: "Match each situation to its unit rate."
pairs:
  - left: "36 pages in 4 days"
    right: "9 pages per day"
  - left: "$15 for 3 notebooks"
    right: "$5 per notebook"
  - left: "42 miles in 6 hours"
    right: "7 miles per hour"
  - left: "28 points in 7 games"
    right: "4 points per game"
explanation: "Each unit rate divides the first quantity by the number of units named after per."
hint: "Find the amount for one day, notebook, hour, or game."
questionGoal: "Compute and label several unit rates."
misconception: "Matching by surface numbers instead of per-one values."
```

```question
key: u03_l02_q05_decimal_unit_rate
type: text-input
prompt: "A 5-pound bag of rice costs $12.50. Type the cost per pound."
acceptedAnswers:
  - "2.50"
  - "$2.50"
  - "2.5"
  - "$2.5"
  - "$2.50 per pound"
answerType: text
explanation: "$12.50 divided by 5 is $2.50 per pound."
hint: "Divide total cost by number of pounds."
questionGoal: "Compute a decimal unit rate in a money context."
misconception: "Using total cost as unit cost."
```

```question
key: u03_l02_q06_explain_unit_rate
type: multiple-choice
prompt: "A printer makes 72 pages in 8 minutes. Which explanation correctly finds pages per minute?"
choices:
  - "Divide 72 pages by 8 minutes to get 9 pages per minute."
  - "Divide 8 minutes by 72 pages to get minutes per page."
  - "Add 72 and 8 because pages per minute uses both numbers."
  - "Use 72 pages per minute because 72 is the total number of pages."
correctAnswer: "Divide 72 pages by 8 minutes to get 9 pages per minute."
explanation: "Pages per minute asks for how many pages are printed in one minute."
hint: "The per-one unit is one minute."
questionGoal: "Explain the setup and label for a unit rate."
misconception: "Doing arithmetic without explaining the unit relationship."
```

### Lesson 3: Unit Prices And Better Buys

```question
key: u03_l03_q01_better_buy
type: passage-question
prompt: "Read the prices and answer."
passageTitle: "Granola"
passage: |
  Bag A has 10 ounces for $4.00.
  Bag B has 12 ounces for $5.40.
question: "Which bag has the lower price per ounce?"
choices:
  - "Bag A"
  - "Bag B"
  - "They are the same"
  - "Cannot tell because the bags are different sizes"
correctAnswer: "Bag A"
explanation: "Bag A costs $0.40 per ounce. Bag B costs $0.45 per ounce."
hint: "Find dollars per ounce for each bag."
questionGoal: "Compare two unit prices."
misconception: "Choosing based only on total price or package size."
```

```question
key: u03_l03_q02_unit_price
type: text-input
prompt: "A 6-pack of markers costs $9.00. Type the cost per marker."
acceptedAnswers:
  - "1.50"
  - "$1.50"
  - "1.5"
  - "$1.5"
answerType: text
explanation: "$9.00 divided by 6 markers is $1.50 per marker."
hint: "Divide the total cost by the number of markers."
questionGoal: "Compute a unit price."
misconception: "Multiplying cost by quantity instead of dividing."
```

```question
key: u03_l03_q03_lowest_total_trap
type: multiple-choice
prompt: "Which statement is true when comparing unit prices?"
choices:
  - "The lowest total price is always the best buy."
  - "The largest package is always the best buy."
  - "Compare the cost for the same amount."
  - "Ignore units if the prices are close."
correctAnswer: "Compare the cost for the same amount."
explanation: "Unit price lets you compare different package sizes fairly."
hint: "A fair comparison uses the same unit amount."
questionGoal: "State the reasoning behind unit-price comparison."
misconception: "Using total price alone to decide value."
```

```question
key: u03_l03_q04_match_unit_prices
type: match-pairs
prompt: "Match each item to its unit price."
pairs:
  - left: "$6 for 3 pens"
    right: "$2 per pen"
  - left: "$8 for 4 pounds"
    right: "$2 per pound"
  - left: "$15 for 5 notebooks"
    right: "$3 per notebook"
  - left: "$12 for 6 bottles"
    right: "$2 per bottle"
explanation: "Divide total cost by quantity to find each unit price."
hint: "Find the cost for one item or one unit."
questionGoal: "Compute and match unit prices in familiar contexts."
misconception: "Matching by total cost instead of per-unit cost."
```

```question
key: u03_l03_q05_fill_better_buy
type: fill-blank
prompt: "Option A is 4 pounds for $10. Option B is 3 pounds for $9."
sentenceBefore: "Option A costs $"
sentenceAfter: "per pound."
choices:
  - "2.00"
  - "2.50"
  - "3.00"
  - "4.00"
correctAnswer: "2.50"
explanation: "$10 divided by 4 pounds is $2.50 per pound."
hint: "Divide dollars by pounds."
questionGoal: "Find a unit price as part of a better-buy comparison."
misconception: "Dividing pounds by dollars instead of dollars by pounds."
```

```question
key: u03_l03_q06_explain_better_buy
type: multiple-choice
prompt: "Option A is 8 ounces for $3.20. Option B is 10 ounces for $4.50. Which explanation correctly identifies the better buy?"
choices:
  - "Option A is better because it costs $0.40 per ounce, while Option B costs $0.45 per ounce."
  - "Option B is better because it has more ounces."
  - "Option A is better because its total price is lower, so no unit prices are needed."
  - "The options are the same because both prices are between $3 and $5."
correctAnswer: "Option A is better because it costs $0.40 per ounce, while Option B costs $0.45 per ounce."
explanation: "The better buy has the lower price for the same unit."
hint: "Compare dollars per ounce for each option."
questionGoal: "Justify a unit-price decision."
misconception: "Choosing the larger package without comparing equal units."
```

### Lesson 4: Percent Means Per 100

```question
key: u03_l04_q01_percent_meaning
type: multiple-choice
prompt: "What does 37% mean?"
choices:
  - "37 per 100"
  - "100 per 37"
  - "37 per 1"
  - "37 more than 100"
correctAnswer: "37 per 100"
explanation: "Percent means per 100."
hint: "The word percent has the idea of 100 in it."
questionGoal: "Interpret percent as per 100."
misconception: "Treating percent as a count without the per-100 relationship."
```

```question
key: u03_l04_q02_match_percent_forms
type: match-pairs
prompt: "Match each percent to its fraction or decimal form."
pairs:
  - left: "25%"
    right: "0.25"
  - left: "50%"
    right: "1/2"
  - left: "10%"
    right: "0.10"
  - left: "75%"
    right: "3/4"
explanation: "Percents can be written as fractions with denominator 100 or as decimals."
hint: "Use per 100 and common benchmark fractions."
questionGoal: "Connect benchmark percents to fractions and decimals."
misconception: "Treating percent, fraction, and decimal forms as unrelated."
```

```question
key: u03_l04_q03_per_100_blank
type: fill-blank
prompt: "Complete the statement."
sentenceBefore: "62% means"
sentenceAfter: "out of 100."
choices:
  - "6.2"
  - "38"
  - "62"
  - "162"
correctAnswer: "62"
explanation: "62% means 62 per 100."
hint: "The percent number tells how many per 100."
questionGoal: "Translate percent into per-100 language."
misconception: "Changing the percent number before interpreting it."
```

```question
key: u03_l04_q04_percent_decimal
type: text-input
prompt: "Type 8% as a decimal."
acceptedAnswers:
  - "0.08"
answerType: number
explanation: "8% is 8/100, which is 0.08."
hint: "Write 8 hundredths as a decimal."
questionGoal: "Convert a small percent to a decimal."
misconception: "Writing 8% as 0.8 instead of 0.08."
```

```question
key: u03_l04_q05_percent_context
type: passage-question
prompt: "Read the situation and answer."
passageTitle: "Survey"
passage: |
  In a survey, 45% of students chose art club.
question: "Which interpretation matches 45%?"
choices:
  - "45 out of every 100 students"
  - "100 out of every 45 students"
  - "45 students exactly"
  - "45 more students than last year"
correctAnswer: "45 out of every 100 students"
explanation: "45% describes a rate per 100, not necessarily an exact count of 45 students."
hint: "Percent does not require the group to have exactly 100 people."
questionGoal: "Interpret percent in a data context."
misconception: "Assuming percent is always an exact count out of a group of 100."
```

```question
key: u03_l04_q06_explain_percent
type: multiple-choice
prompt: "Which explanation best shows why 0.3 is the same as 30%?"
choices:
  - "0.3 is 30 hundredths, so it is 30 out of 100, or 30%."
  - "0.3 is the same as 3% because it has the digit 3."
  - "0.3 is the same as 300% because moving to percent always adds two zeros."
  - "0.3 cannot be written as a percent because it is a decimal."
correctAnswer: "0.3 is 30 hundredths, so it is 30 out of 100, or 30%."
explanation: "Decimals in the hundredths system connect directly to percent."
hint: "Rewrite 0.3 as 0.30."
questionGoal: "Explain the decimal-percent connection."
misconception: "Thinking 0.3 equals 3% because of the digit 3."
```

### Lesson 5: Benchmark Percents Of A Quantity

```question
key: u03_l05_q01_find_50_percent
type: text-input
prompt: "Type 50% of 86."
acceptedAnswers:
  - "43"
answerType: number
explanation: "50% means one half, and half of 86 is 43."
hint: "50% is the same as 1/2."
questionGoal: "Find 50% using the half benchmark."
misconception: "Multiplying by 50 instead of using the percent relationship."
```

```question
key: u03_l05_q02_find_25_percent
type: multiple-choice
prompt: "What is 25% of 64?"
choices:
  - "8"
  - "16"
  - "25"
  - "32"
correctAnswer: "16"
explanation: "25% is one fourth, and 64 divided by 4 is 16."
hint: "25% means one fourth of the quantity."
questionGoal: "Find 25% using the fourth benchmark."
misconception: "Treating 25% as subtracting 25 or multiplying by 25."
```

```question
key: u03_l05_q03_match_benchmark_percent
type: match-pairs
prompt: "Match each benchmark percent to a useful fraction."
pairs:
  - left: "10%"
    right: "1/10"
  - left: "25%"
    right: "1/4"
  - left: "50%"
    right: "1/2"
  - left: "75%"
    right: "3/4"
explanation: "Benchmark percents connect to familiar fractions."
hint: "Use per 100 to find the fraction."
questionGoal: "Connect benchmark percents to fraction strategies."
misconception: "Memorizing percent facts without fraction meaning."
```

```question
key: u03_l05_q04_ten_percent
type: fill-blank
prompt: "Complete the benchmark calculation."
sentenceBefore: "10% of 230 is"
sentenceAfter: "."
choices:
  - "2.3"
  - "23"
  - "46"
  - "2300"
correctAnswer: "23"
explanation: "10% is one tenth, and one tenth of 230 is 23."
hint: "Divide by 10."
questionGoal: "Find 10% of a quantity."
misconception: "Moving the decimal the wrong direction or multiplying by 10."
```

```question
key: u03_l05_q05_percent_bar_steps
type: order-items
prompt: "Put the steps for finding 75% of 40 in order."
items:
  - "Find 50% of 40 = 20"
  - "Add 20 + 10"
  - "Find 25% of 40 = 10"
  - "Get 75% of 40 = 30"
correctOrder:
  - "Find 50% of 40 = 20"
  - "Find 25% of 40 = 10"
  - "Add 20 + 10"
  - "Get 75% of 40 = 30"
explanation: "75% can be built from 50% plus 25%."
hint: "Break 75% into two benchmark percents."
questionGoal: "Sequence a benchmark percent strategy."
misconception: "Trying to use an unsupported rule instead of benchmark decomposition."
```

```question
key: u03_l05_q06_explain_benchmark
type: multiple-choice
prompt: "Which explanation correctly finds 25% of 120 without a calculator?"
choices:
  - "25% is one fourth, so divide 120 by 4 to get 30."
  - "25% means the answer is 25 because the percent number is 25."
  - "25% means divide 120 by 25 to get 4.8."
  - "25% means subtract 25 from 120 to get 95."
correctAnswer: "25% is one fourth, so divide 120 by 4 to get 30."
explanation: "Benchmark percents can be found with fraction reasoning."
hint: "Use the fraction that matches 25%."
questionGoal: "Explain a benchmark percent strategy."
misconception: "Thinking percent problems require a memorized percent trick."
```

### Lesson 6: Rate And Percent Decision Problems

```question
key: u03_l06_q01_choose_model
type: multiple-choice
prompt: "A scooter travels 18 miles in 3 hours. Which model best answers 'How far in 1 hour?'"
choices:
  - "Unit rate"
  - "Percent bar"
  - "Area formula"
  - "Coordinate plane"
correctAnswer: "Unit rate"
explanation: "The question asks for miles per 1 hour."
hint: "Look for the phrase 'in 1 hour.'"
questionGoal: "Choose a unit-rate model for a per-one question."
misconception: "Choosing a model because it is recent rather than because it fits."
```

```question
key: u03_l06_q02_decision_percent
type: passage-question
prompt: "Read the situation and answer."
passageTitle: "Fundraiser"
passage: |
  A club needs 50 posters. A print shop says 20% of the posters can be printed for free.
question: "How many posters are free?"
choices:
  - "5"
  - "10"
  - "20"
  - "30"
correctAnswer: "10"
explanation: "20% is one fifth, and one fifth of 50 is 10."
hint: "Use 10% or 20% as a benchmark percent."
questionGoal: "Apply percent of a quantity in a concrete context."
misconception: "Treating 20% as 20 posters without considering the total."
```

```question
key: u03_l06_q03_unit_price_decision
type: multiple-choice
prompt: "Which choice is the better buy?"
choices:
  - "5 pounds for $9.00"
  - "4 pounds for $8.00"
  - "They are the same"
  - "Cannot compare pounds and dollars"
correctAnswer: "5 pounds for $9.00"
explanation: "5 pounds for $9 is $1.80 per pound; 4 pounds for $8 is $2.00 per pound."
hint: "Find dollars per pound for each option."
questionGoal: "Use unit prices to make a decision."
misconception: "Choosing by total price instead of price per unit."
```

```question
key: u03_l06_q04_rate_percent_sort
type: match-pairs
prompt: "Match each question to the best tool."
pairs:
  - left: "How many miles in 1 hour?"
    right: "unit rate"
  - left: "What is 25% of the class?"
    right: "benchmark percent"
  - left: "Which bag costs less per ounce?"
    right: "unit price"
  - left: "Which ratios are equivalent?"
    right: "ratio table"
explanation: "Different relationship questions call for different models."
hint: "Look for per 1, percent, per ounce, or equivalent."
questionGoal: "Choose a model for rate, percent, and ratio tasks."
misconception: "Using one procedure for all ratio-related problems."
```

```question
key: u03_l06_q05_compute_decision
type: text-input
prompt: "A bike rental costs $36 for 4 hours. Type the cost per hour."
acceptedAnswers:
  - "9"
  - "$9"
  - "$9 per hour"
answerType: text
explanation: "$36 divided by 4 hours is $9 per hour."
hint: "Divide total dollars by hours."
questionGoal: "Compute a unit rate within a decision context."
misconception: "Leaving the cost as a total rather than per hour."
```

```question
key: u03_l06_q06_explain_decision
type: multiple-choice
prompt: "A student needs 25% of 80 survey responses. Which explanation correctly finds the number of responses?"
choices:
  - "25% is one fourth, and one fourth of 80 is 20 responses."
  - "25% means the student needs 25 responses."
  - "25% of 80 means 80 divided by 25, or 3.2 responses."
  - "25% of 80 means 25 divided by 80, so fewer than 1 response is needed."
correctAnswer: "25% is one fourth, and one fourth of 80 is 20 responses."
explanation: "Benchmark percent reasoning connects the percent to the total quantity."
hint: "25% means one out of every four equal parts."
questionGoal: "Explain a percent decision with a benchmark strategy."
misconception: "Using the percent number as the final count."
```

## Unit 4: Fraction Division And Decimal Fluency

### Lesson 1: Division Situations With Fractions

```question
key: u04_l01_q01_fraction_division_story
type: multiple-choice
prompt: "Which question matches 3/4 divided by 1/4?"
choices:
  - "How many 1/4-cup servings are in 3/4 cup?"
  - "What is 3/4 of 1/4?"
  - "How much is 3/4 plus 1/4?"
  - "What is 1/4 of 3 cups?"
correctAnswer: "How many 1/4-cup servings are in 3/4 cup?"
explanation: "Dividing by 1/4 can ask how many fourth-size groups fit into 3/4."
hint: "The divisor names the size of each group."
questionGoal: "Match a fraction-division expression to a measurement-division story."
misconception: "Confusing fraction division with fraction multiplication."
```

```question
key: u04_l01_q02_quotient_meaning
type: match-pairs
prompt: "Match each fraction-division situation to what the quotient means."
pairs:
  - left: "2 cups split into 1/2-cup jars"
    right: "number of jars"
  - left: "1/2 yard shared by 2 people"
    right: "yards per person"
  - left: "3/4 pound packed in 1/8-pound bags"
    right: "number of bags"
  - left: "2/3 pan shared by 4 friends"
    right: "pan amount per friend"
explanation: "The quotient depends on whether the problem asks for number of groups or size of each share."
hint: "Look for the known group size or known number of groups."
questionGoal: "Interpret quotient meaning in fraction-division contexts."
misconception: "Treating every quotient as the same kind of answer."
```

```question
key: u04_l01_q03_division_makes_larger
type: multiple-choice
prompt: "Which quotient should be greater than 1?"
choices:
  - "1/4 divided by 2"
  - "3 divided by 1/2"
  - "1/3 divided by 4"
  - "2 divided by 5"
correctAnswer: "3 divided by 1/2"
explanation: "There are 6 halves in 3, so the quotient is greater than 1."
hint: "Ask how many half-size groups fit into 3."
questionGoal: "Challenge the idea that division always makes smaller."
misconception: "Applying whole-number division expectations to fraction divisors."
```

```question
key: u04_l01_q04_identify_dividend_divisor
type: multi-blank-cloze
prompt: "Complete the sentence for 5/6 divided by 1/3."
parts:
  - "The dividend is "
  - " and the divisor is "
  - "."
blanks:
  - correctAnswer: "5/6"
    acceptedAnswers:
      - "5/6"
  - correctAnswer: "1/3"
    acceptedAnswers:
      - "1/3"
explanation: "The dividend is the amount being divided; the divisor tells what it is divided by."
hint: "Read the expression from left to right."
questionGoal: "Identify dividend and divisor in a fraction-division expression."
misconception: "Reversing the dividend and divisor."
```

```question
key: u04_l01_q05_context_expression
type: passage-question
prompt: "Read the situation and answer."
passageTitle: "Ribbon Pieces"
passage: |
  Mia has 5/6 yard of ribbon. Each craft uses 1/6 yard.
question: "Which expression finds how many crafts Mia can make?"
choices:
  - "5/6 divided by 1/6"
  - "1/6 divided by 5/6"
  - "5/6 x 1/6"
  - "5/6 + 1/6"
correctAnswer: "5/6 divided by 1/6"
explanation: "The question asks how many 1/6-yard groups fit into 5/6 yard."
hint: "The total amount comes first."
questionGoal: "Write a division expression from a fraction grouping context."
misconception: "Reversing divisor and dividend."
```

```question
key: u04_l01_q06_explain_fraction_division_story
type: multiple-choice
prompt: "Which sharing story could represent 1/2 divided by 4?"
choices:
  - "1/2 of a pizza is shared equally by 4 people."
  - "4 pizzas are shared equally by 1/2 of a person."
  - "1/2 of each of 4 pizzas is eaten."
  - "4 groups are each given 1/2 of a pizza."
correctAnswer: "1/2 of a pizza is shared equally by 4 people."
explanation: "A sharing story knows the number of groups and asks for the size of each share."
hint: "Make 4 the number of equal groups."
questionGoal: "Create a valid sharing interpretation of fraction division."
misconception: "Thinking fraction division cannot describe a real situation."
```

### Lesson 2: How Many Fraction Groups?

```question
key: u04_l02_q01_count_fraction_groups
type: text-input
prompt: "How many 1/4-cup scoops are in 3 cups?"
acceptedAnswers:
  - "12"
answerType: number
explanation: "Each cup has 4 fourth-cup scoops, so 3 cups have 12 scoops."
hint: "Count fourths: 4 fourths in each whole cup."
questionGoal: "Solve a unit-fraction measurement division problem."
misconception: "Expecting the quotient to be smaller than 3."
```

```question
key: u04_l02_q02_number_line_jumps
type: order-items
prompt: "Put the jumps for finding how many 1/3s are in 2 in order."
items:
  - "1"
  - "2/3"
  - "0"
  - "2"
  - "1/3"
  - "5/3"
  - "4/3"
correctOrder:
  - "0"
  - "1/3"
  - "2/3"
  - "1"
  - "4/3"
  - "5/3"
  - "2"
explanation: "Counting by thirds from 0 to 2 gives 6 jumps."
hint: "Move by equal jumps of 1/3."
questionGoal: "Represent measurement division as equal fraction jumps."
misconception: "Counting whole-number jumps instead of fractional groups."
```

```question
key: u04_l02_q03_groups_in_fraction
type: multiple-choice
prompt: "How many 1/8-pound bags can be filled from 3/4 pound of trail mix?"
choices:
  - "3"
  - "4"
  - "6"
  - "8"
correctAnswer: "6"
explanation: "3/4 is 6/8, so six 1/8-pound bags can be filled."
hint: "Rewrite 3/4 in eighths."
questionGoal: "Use equivalent fractions to count fractional groups."
misconception: "Using the denominator 4 as the number of groups."
```

```question
key: u04_l02_q04_fill_groups
type: fill-blank
prompt: "Complete the measurement division sentence."
sentenceBefore: "5 divided by 1/2 asks how many halves are in 5. The answer is"
sentenceAfter: "."
choices:
  - "2.5"
  - "5"
  - "10"
  - "1/10"
correctAnswer: "10"
explanation: "Each whole has 2 halves, so 5 wholes have 10 halves."
hint: "Count two halves for each whole."
questionGoal: "Interpret division by 1/2 as counting half-size groups."
misconception: "Dividing by 2 instead of by one half."
```

```question
key: u04_l02_q05_match_group_counts
type: match-pairs
prompt: "Match each question to the number of groups."
pairs:
  - left: "How many 1/2s are in 3?"
    right: "6 groups"
  - left: "How many 1/4s are in 1?"
    right: "4 groups"
  - left: "How many 1/5s are in 2?"
    right: "10 groups"
  - left: "How many 1/3s are in 1?"
    right: "3 groups"
explanation: "Measurement division counts how many fractional groups fit."
hint: "Find how many unit fractions make one whole, then scale."
questionGoal: "Match simple unit-fraction grouping questions to quotients."
misconception: "Treating the divisor denominator as the final answer in every case."
```

```question
key: u04_l02_q06_explain_grouping
type: multiple-choice
prompt: "Which explanation best shows why 2 divided by 1/4 equals 8?"
choices:
  - "Each whole has four fourths, so two wholes have eight fourth-size groups."
  - "Divide 2 by 4 because the denominator is 4, so the answer is 1/2."
  - "There are only 2 groups because the dividend is 2."
  - "There are 4 groups because the divisor has denominator 4."
correctAnswer: "Each whole has four fourths, so two wholes have eight fourth-size groups."
explanation: "The quotient counts how many 1/4 groups fit into 2."
hint: "Draw or imagine two wholes split into fourths."
questionGoal: "Explain a measurement fraction-division quotient."
misconception: "Believing division by a fraction must make a smaller number."
```

### Lesson 3: Share Fractions Equally

```question
key: u04_l03_q01_share_fraction
type: multiple-choice
prompt: "3/4 of a pan of brownies is shared equally by 3 friends. How much of the pan does each friend get?"
choices:
  - "1/4"
  - "3/7"
  - "1/3"
  - "9/4"
correctAnswer: "1/4"
explanation: "Splitting 3/4 into 3 equal shares gives 1/4 for each friend."
hint: "Think of 3 fourths split into 3 equal groups."
questionGoal: "Solve a simple fraction sharing division problem."
misconception: "Dividing the denominator or adding denominator and group count."
```

```question
key: u04_l03_q02_share_model
type: fill-blank
prompt: "Complete the sharing sentence."
sentenceBefore: "If 1/2 yard of ribbon is shared equally by 2 people, each person gets"
sentenceAfter: "yard."
choices:
  - "1/2"
  - "1/4"
  - "2"
  - "1"
correctAnswer: "1/4"
explanation: "Half of a half-yard is 1/4 yard."
hint: "Split the half-yard into 2 equal pieces."
questionGoal: "Find each share when a fraction is divided by a whole number."
misconception: "Giving each person the original fractional total."
```

```question
key: u04_l03_q03_match_sharing
type: match-pairs
prompt: "Match each sharing situation to one share."
pairs:
  - left: "1/2 shared by 2"
    right: "1/4"
  - left: "2/3 shared by 2"
    right: "1/3"
  - left: "3/5 shared by 3"
    right: "1/5"
  - left: "4/7 shared by 4"
    right: "1/7"
explanation: "When the numerator matches the number of equal shares, each share is one unit fraction."
hint: "Imagine splitting the numerator's unit fractions evenly."
questionGoal: "Connect simple sharing fraction divisions to share sizes."
misconception: "Dividing the denominator by the number of shares."
```

```question
key: u04_l03_q04_context_share
type: passage-question
prompt: "Read the situation and answer."
passageTitle: "Juice"
passage: |
  There is 2/3 liter of juice. It is poured equally into 4 cups.
question: "Which expression represents the amount in each cup?"
choices:
  - "2/3 divided by 4"
  - "4 divided by 2/3"
  - "2/3 x 4"
  - "2/3 + 4"
correctAnswer: "2/3 divided by 4"
explanation: "The total 2/3 liter is shared into 4 equal cups."
hint: "The total amount being shared comes first."
questionGoal: "Represent a fraction sharing context with division."
misconception: "Reversing total and number of groups."
```

```question
key: u04_l03_q05_compute_share
type: text-input
prompt: "Type the value of 2/3 divided by 4."
acceptedAnswers:
  - "1/6"
answerType: text
explanation: "2/3 divided by 4 is 2/3 x 1/4 = 2/12 = 1/6."
hint: "Sharing among 4 means each share is one fourth of 2/3."
questionGoal: "Compute a fraction divided by a whole number."
misconception: "Dividing only the denominator or only the numerator without meaning."
```

```question
key: u04_l03_q06_explain_share
type: multiple-choice
prompt: "Which explanation best shows why 4/5 shared equally by 4 people gives each person 1/5?"
choices:
  - "There are four fifth-size pieces, and sharing them among 4 people gives one fifth to each person."
  - "Each person gets 4/5 because that is the amount being shared."
  - "Each person gets 1/9 because 5 and 4 are added."
  - "Each person gets 4/20 because only the denominator is multiplied by 4."
correctAnswer: "There are four fifth-size pieces, and sharing them among 4 people gives one fifth to each person."
explanation: "Sharing 4 equal unit fractions among 4 people gives one unit fraction to each person."
hint: "Think of 4 separate fifths being handed out."
questionGoal: "Explain a fraction sharing quotient with unit fractions."
misconception: "Losing the unit fraction interpretation of the numerator."
```

### Lesson 4: Connect Models To Divide Fractions

```question
key: u04_l04_q01_reciprocal_setup
type: multiple-choice
prompt: "Which expression is equivalent to 2/3 divided by 1/6?"
choices:
  - "2/3 x 6/1"
  - "2/3 x 1/6"
  - "3/2 x 1/6"
  - "2/3 + 6"
correctAnswer: "2/3 x 6/1"
explanation: "Dividing by 1/6 is equivalent to multiplying by its reciprocal, 6/1."
hint: "The reciprocal is used for the divisor."
questionGoal: "Choose the correct reciprocal setup for fraction division."
misconception: "Flipping the dividend or multiplying by the divisor."
```

```question
key: u04_l04_q02_compute_fraction_division
type: text-input
prompt: "Type the quotient: 3/5 divided by 1/10"
acceptedAnswers:
  - "6"
answerType: number
explanation: "3/5 divided by 1/10 = 3/5 x 10 = 30/5 = 6."
hint: "Ask how many tenths fit in 3/5. Rewrite 3/5 as 6/10."
questionGoal: "Compute a fraction division problem and connect to equivalent fractions."
misconception: "Expecting a quotient less than 1 because both numbers are fractions."
```

```question
key: u04_l04_q03_wrong_flip
type: error-correction
prompt: "Correct the setup."
sentence: "4/7 divided by 2/3 = 7/4 x 2/3"
acceptedAnswers:
  - "4/7 divided by 2/3 = 4/7 x 3/2"
explanation: "Keep the dividend 4/7 and multiply by the reciprocal of the divisor, 3/2."
hint: "Only the divisor is flipped."
questionGoal: "Correct a reciprocal procedure error."
misconception: "Flipping the dividend instead of the divisor."
```

```question
key: u04_l04_q04_model_to_expression
type: multiple-choice
prompt: "A model shows 3/4 split into pieces of size 1/8. Which division expression matches?"
choices:
  - "3/4 divided by 1/8"
  - "1/8 divided by 3/4"
  - "3/4 x 1/8"
  - "3/4 - 1/8"
correctAnswer: "3/4 divided by 1/8"
explanation: "The model asks how many 1/8-size pieces fit in 3/4."
hint: "The total amount comes first, and the group size comes second."
questionGoal: "Connect a measurement model to a division expression."
misconception: "Reversing the order of a fraction division expression."
```

```question
key: u04_l04_q05_match_reciprocals
type: match-pairs
prompt: "Match each divisor to its reciprocal."
pairs:
  - left: "1/5"
    right: "5"
  - left: "2/3"
    right: "3/2"
  - left: "4/7"
    right: "7/4"
  - left: "5/6"
    right: "6/5"
explanation: "A reciprocal switches numerator and denominator; a unit fraction's reciprocal is a whole number."
hint: "Ask what number would multiply with the divisor to make 1."
questionGoal: "Identify reciprocals needed for division procedures."
misconception: "Confusing reciprocal with opposite or negative."
```

```question
key: u04_l04_q06_explain_model_procedure
type: multiple-choice
prompt: "Which explanation best connects a model to why 1 divided by 1/4 equals 4?"
choices:
  - "One whole contains four fourth-size pieces, so four groups of 1/4 fit."
  - "One whole contains one fourth-size piece, so the quotient is 1."
  - "Dividing by 1/4 means the answer must be smaller than 1."
  - "The quotient is 1/4 because the divisor is 1/4."
correctAnswer: "One whole contains four fourth-size pieces, so four groups of 1/4 fit."
explanation: "The model and the reciprocal procedure both show four fourths in one whole."
hint: "Imagine a whole divided into fourths."
questionGoal: "Connect a simple model to a fraction-division result."
misconception: "Using the reciprocal procedure without a meaning for the answer."
```

### Lesson 5: Decimal Division With Place Value

```question
key: u04_l05_q01_decimal_quotient
type: text-input
prompt: "Type the quotient: 18.6 divided by 3"
acceptedAnswers:
  - "6.2"
answerType: number
explanation: "186 tenths divided by 3 is 62 tenths, or 6.2."
hint: "Estimate first: 18 divided by 3 is 6."
questionGoal: "Divide a decimal by a whole number."
misconception: "Misplacing the decimal point in the quotient."
```

```question
key: u04_l05_q02_estimate_decimal_division
type: multiple-choice
prompt: "Which estimate best checks 42.8 divided by 4?"
choices:
  - "About 1"
  - "About 10"
  - "About 100"
  - "About 400"
correctAnswer: "About 10"
explanation: "42.8 is close to 40, and 40 divided by 4 = 10."
hint: "Use 40 instead of 42.8."
questionGoal: "Use estimation to check decimal division."
misconception: "Accepting a quotient with the decimal in the wrong place."
```

```question
key: u04_l05_q03_decimal_place_reason
type: fill-blank
prompt: "Complete the place-value statement."
sentenceBefore: "9.6 divided by 8 is 1.2 because 96 tenths divided by 8 is 12"
sentenceAfter: "."
choices:
  - "ones"
  - "tenths"
  - "hundreds"
  - "thousands"
correctAnswer: "tenths"
explanation: "The original amount is measured in tenths, so 12 tenths is 1.2."
hint: "9.6 has tenths."
questionGoal: "Explain decimal division using place-value units."
misconception: "Ignoring the unit represented by decimal places."
```

```question
key: u04_l05_q04_money_division
type: text-input
prompt: "Four friends split a $27.60 bill equally. Type each person's share in dollars."
acceptedAnswers:
  - "6.90"
  - "6.9"
  - "$6.90"
  - "$6.9"
answerType: text
explanation: "$27.60 divided by 4 is $6.90."
hint: "Estimate first: $28 divided by 4 is about $7."
questionGoal: "Apply decimal division in a money context."
misconception: "Producing a quotient that conflicts with a money estimate."
```

```question
key: u04_l05_q05_decimal_error
type: error-correction
prompt: "Correct the quotient."
sentence: "15.5 divided by 5 = 31"
acceptedAnswers:
  - "15.5 divided by 5 = 3.1"
explanation: "15.5 is close to 15, and 15 divided by 5 is 3, so 3.1 is reasonable."
hint: "Use an estimate to place the decimal."
questionGoal: "Correct a decimal-point error in division."
misconception: "Dropping the decimal point in a quotient."
```

```question
key: u04_l05_q06_explain_decimal_estimate
type: multiple-choice
prompt: "Which explanation best shows why 0.82 is not reasonable for 32.8 divided by 4?"
choices:
  - "32.8 is close to 32, and 32 divided by 4 is 8, so the answer should be near 8."
  - "0.82 is reasonable because it uses the same digits as 32.8."
  - "32.8 divided by 4 should be near 0.8 because the dividend has a decimal."
  - "0.82 is not reasonable because any decimal quotient must be greater than 32.8."
correctAnswer: "32.8 is close to 32, and 32 divided by 4 is 8, so the answer should be near 8."
explanation: "Estimation can catch decimal placement errors."
hint: "Round 32.8 to a nearby whole number."
questionGoal: "Use estimation to reject an unreasonable decimal quotient."
misconception: "Accepting a decimal quotient without checking its size."
```

### Lesson 6: Multi-Digit And Decimal Operation Checks

```question
key: u04_l06_q01_valid_check
type: multiple-choice
prompt: "Which equation checks 936 divided by 24 = 39?"
choices:
  - "39 x 24 = 936"
  - "936 x 24 = 39"
  - "936 - 39 = 24"
  - "39 + 24 = 936"
correctAnswer: "39 x 24 = 936"
explanation: "Multiplication checks division: quotient times divisor should equal dividend."
hint: "Use the inverse operation."
questionGoal: "Choose a valid inverse check for division."
misconception: "Using unrelated operations as checks."
```

```question
key: u04_l06_q02_reasonable_operation
type: multiple-choice
prompt: "A student finds 28.4 x 6 = 17.04. Which check catches the mistake?"
choices:
  - "28.4 x 6 should be near 30 x 6 = 180."
  - "28.4 x 6 should be near 30 divided by 6 = 5."
  - "The answer should have no decimal."
  - "Any answer with digits 1, 7, and 4 is reasonable."
correctAnswer: "28.4 x 6 should be near 30 x 6 = 180."
explanation: "17.04 is far too small; the decimal point is misplaced."
hint: "Estimate with 30 x 6."
questionGoal: "Use estimation to detect a decimal product error."
misconception: "Trusting digit patterns without checking magnitude."
```

```question
key: u04_l06_q03_check_decimal_sum
type: error-correction
prompt: "Correct the equation."
sentence: "42.6 + 7.85 = 121.1"
acceptedAnswers:
  - "42.6 + 7.85 = 50.45"
  - "42.60 + 7.85 = 50.45"
explanation: "42.6 is 42.60, and 42.60 + 7.85 = 50.45."
hint: "Line up place values and estimate near 43 + 8."
questionGoal: "Correct a decimal addition error using place value and estimation."
misconception: "Adding digits without preserving decimal places."
```

```question
key: u04_l06_q04_match_checks
type: match-pairs
prompt: "Match each completed computation to a useful check."
pairs:
  - left: "642 - 278 = 364"
    right: "364 + 278 = 642"
  - left: "18.5 x 4 = 74"
    right: "74 divided by 4 = 18.5"
  - left: "96 divided by 12 = 8"
    right: "8 x 12 = 96"
  - left: "27.3 + 5.9 = 33.2"
    right: "33.2 - 5.9 = 27.3"
explanation: "Inverse operations can check whether the original computation is consistent."
hint: "Use the operation that undoes the original one."
questionGoal: "Match computations to inverse-operation checks."
misconception: "Checking by repeating the same possible mistake."
```

```question
key: u04_l06_q05_unit_check
type: fill-blank
prompt: "Complete the reasonableness check."
sentenceBefore: "If 5 notebooks cost $17.50, the quotient $3.50 should be labeled"
sentenceAfter: "."
choices:
  - "per notebook"
  - "per dollar"
  - "per 5 notebooks"
  - "per page"
correctAnswer: "per notebook"
explanation: "The division finds dollars for each one notebook."
hint: "The divisor is the number of notebooks."
questionGoal: "Use units to check a decimal quotient."
misconception: "Omitting or reversing units after division."
```

```question
key: u04_l06_q06_explain_check
type: multiple-choice
prompt: "Which explanation best checks whether 7.2 divided by 0.9 = 8 is reasonable?"
choices:
  - "Since 0.9 is close to 1, 7.2 divided by 0.9 should be a little more than 7.2, so 8 is reasonable."
  - "Since 0.9 is less than 1, the quotient must be less than 7.2."
  - "8 is reasonable because 7.2 + 0.9 is close to 8."
  - "No estimate can check division by a decimal."
correctAnswer: "Since 0.9 is close to 1, 7.2 divided by 0.9 should be a little more than 7.2, so 8 is reasonable."
explanation: "Checking can use an estimate, an inverse operation, or both."
hint: "Compare dividing by 0.9 with dividing by 1."
questionGoal: "Explain a reasonableness check for decimal division."
misconception: "Assuming any division by a decimal must produce a small answer."
```

## Unit 5: Rational Numbers And The Coordinate Plane

### Lesson 1: Positive And Negative Contexts

```question
key: u05_l01_q01_temperature_sign
type: multiple-choice
prompt: "Which number represents 6 degrees below zero?"
choices:
  - "6"
  - "-6"
  - "0.6"
  - "60"
correctAnswer: "-6"
explanation: "Below zero is represented by a negative number."
hint: "Use zero as the reference point."
questionGoal: "Match a negative number to a below-zero context."
misconception: "Dropping the negative sign in a signed context."
```

```question
key: u05_l01_q02_match_signed_context
type: match-pairs
prompt: "Match each context to the signed number."
pairs:
  - left: "A debt of $12"
    right: "-12"
  - left: "A gain of 7 points"
    right: "+7"
  - left: "4 meters above sea level"
    right: "+4"
  - left: "3 floors below ground"
    right: "-3"
explanation: "Positive and negative signs show direction from a reference point."
hint: "Above, gain, and credit are often positive; below, debt, and loss are often negative."
questionGoal: "Connect signed numbers to real-world directions."
misconception: "Treating negative as always bad instead of directional or contextual."
```

```question
key: u05_l01_q03_reference_zero
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "In an elevation problem, sea level is often represented by"
sentenceAfter: "."
choices:
  - "-1"
  - "0"
  - "1"
  - "100"
correctAnswer: "0"
explanation: "Sea level is the reference point, so it is represented by zero."
hint: "A reference point is the starting value."
questionGoal: "Identify zero as a contextual reference point."
misconception: "Thinking zero always means no quantity rather than a reference point."
```

```question
key: u05_l01_q04_signed_statement
type: multiple-choice
prompt: "Which statement matches -15 in an account-balance context?"
choices:
  - "A credit of $15"
  - "A debt of $15"
  - "A balance of exactly $0"
  - "A deposit of $15"
correctAnswer: "A debt of $15"
explanation: "A negative balance can represent money owed."
hint: "In money contexts, negative often means below zero."
questionGoal: "Interpret a negative number in a financial context."
misconception: "Reading the magnitude without the sign."
```

```question
key: u05_l01_q05_type_signed_number
type: text-input
prompt: "A submarine is 80 meters below the surface. Type the signed number for its position if the surface is 0."
acceptedAnswers:
  - "-80"
answerType: number
explanation: "Below the surface is represented by a negative position, so the number is -80."
hint: "Below the reference point uses a negative sign."
questionGoal: "Produce a signed number from a context."
misconception: "Using a positive number for a below-reference position."
```

```question
key: u05_l01_q06_explain_reference
type: multiple-choice
prompt: "Which explanation best shows why +9 and -9 can both be 9 units from zero but mean different things?"
choices:
  - "+9 is 9 units in the positive direction, while -9 is 9 units in the negative direction."
  - "+9 is farther from zero because positive numbers are larger."
  - "-9 is farther from zero because negative numbers are lower."
  - "The signs do not matter because both numbers have the digit 9."
correctAnswer: "+9 is 9 units in the positive direction, while -9 is 9 units in the negative direction."
explanation: "The sign gives direction; the distance from zero gives magnitude."
hint: "Think about a number line with zero in the middle."
questionGoal: "Explain sign as direction from a reference point."
misconception: "Thinking numbers with the same magnitude have the same meaning."
```

### Lesson 2: Opposites On Number Lines

```question
key: u05_l02_q01_opposite_integer
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "The opposite of -14 is"
sentenceAfter: "."
choices:
  - "-14"
  - "0"
  - "14"
  - "1/14"
correctAnswer: "14"
explanation: "Opposites are the same distance from zero on different sides."
hint: "Change the direction from zero, not the distance."
questionGoal: "Identify the opposite of a negative integer."
misconception: "Confusing opposite with reciprocal."
```

```question
key: u05_l02_q02_match_opposites
type: match-pairs
prompt: "Match each number to its opposite."
pairs:
  - left: "8"
    right: "-8"
  - left: "-3"
    right: "3"
  - left: "1/2"
    right: "-1/2"
  - left: "-0.7"
    right: "0.7"
explanation: "Opposites keep the same distance from zero but switch signs."
hint: "Only the sign changes."
questionGoal: "Match integers, fractions, and decimals to opposites."
misconception: "Changing the size of the number instead of the sign."
```

```question
key: u05_l02_q03_number_line_location
type: multiple-choice
prompt: "Which number is the same distance from 0 as 5 but on the other side?"
choices:
  - "-5"
  - "0"
  - "1/5"
  - "10"
correctAnswer: "-5"
explanation: "5 and -5 are both 5 units from zero."
hint: "The other side of zero means the opposite sign."
questionGoal: "Use number-line symmetry to identify an opposite."
misconception: "Choosing reciprocal or doubled values instead of opposite."
```

```question
key: u05_l02_q04_vertical_number_line
type: multiple-choice
prompt: "On a vertical number line, which number is 3 units below 0?"
choices:
  - "3"
  - "-3"
  - "1/3"
  - "-1/3"
correctAnswer: "-3"
explanation: "Below zero on a vertical number line is negative."
hint: "Below the reference point goes in the negative direction."
questionGoal: "Apply opposite/sign reasoning to a vertical number line."
misconception: "Thinking vertical number lines use different sign rules."
```

```question
key: u05_l02_q05_opposite_text
type: text-input
prompt: "Type the opposite of 2.75."
acceptedAnswers:
  - "-2.75"
answerType: number
explanation: "The opposite of a positive number is the same distance on the negative side."
hint: "Keep 2.75 and change the sign."
questionGoal: "Produce the opposite of a positive decimal."
misconception: "Changing decimal digits instead of the sign."
```

```question
key: u05_l02_q06_explain_opposites
type: multiple-choice
prompt: "Which explanation best shows why -4 and 4 are opposites?"
choices:
  - "They are both 4 units from zero, but on different sides of zero."
  - "They are opposites because one number is smaller than the other."
  - "They are opposites because -4 is four units from 4."
  - "They are opposites because 4 is the reciprocal of -4."
correctAnswer: "They are both 4 units from zero, but on different sides of zero."
explanation: "Opposites are symmetric around zero on the number line."
hint: "Use the number line idea."
questionGoal: "Explain the definition of opposites."
misconception: "Defining opposites only as one negative and one positive without distance."
```

### Lesson 3: Absolute Value As Distance

```question
key: u05_l03_q01_absolute_value
type: text-input
prompt: "Type the value of |-9|."
acceptedAnswers:
  - "9"
answerType: number
explanation: "|-9| is the distance from -9 to 0, which is 9 units."
hint: "Absolute value is distance from zero."
questionGoal: "Find the absolute value of a negative integer."
misconception: "Thinking absolute value keeps the negative sign."
```

```question
key: u05_l03_q02_distance_meaning
type: multiple-choice
prompt: "Which statement best describes | -6 |?"
choices:
  - "The number -6"
  - "The opposite of 6 only"
  - "The distance from -6 to 0"
  - "Six units below -6"
correctAnswer: "The distance from -6 to 0"
explanation: "Absolute value measures distance from zero."
hint: "Distance is never negative."
questionGoal: "Interpret absolute value as distance."
misconception: "Treating absolute value as a sign-change command only."
```

```question
key: u05_l03_q03_match_absolute_values
type: match-pairs
prompt: "Match each expression to its value."
pairs:
  - left: "|-2|"
    right: "2"
  - left: "|7|"
    right: "7"
  - left: "|-1/2|"
    right: "1/2"
  - left: "|0|"
    right: "0"
explanation: "Absolute value is the distance from zero."
hint: "Ask how far the number is from zero."
questionGoal: "Evaluate absolute values for different rational numbers."
misconception: "Making every absolute value positive without understanding zero or distance."
```

```question
key: u05_l03_q04_context_distance
type: multiple-choice
prompt: "A diver is at -18 feet. What does |-18| represent?"
choices:
  - "18 feet below the surface as a distance"
  - "18 feet above the surface"
  - "A depth of -36 feet"
  - "No distance"
correctAnswer: "18 feet below the surface as a distance"
explanation: "The absolute value tells the diver is 18 feet from the surface level."
hint: "Absolute value gives distance, not direction."
questionGoal: "Interpret absolute value in context."
misconception: "Losing the difference between distance and direction."
```

```question
key: u05_l03_q05_abs_compare
type: fill-blank
prompt: "Complete the comparison."
sentenceBefore: "|-12| is"
sentenceAfter: "|-7|."
choices:
  - "less than"
  - "equal to"
  - "greater than"
  - "opposite of"
correctAnswer: "greater than"
explanation: "|-12| = 12 and |-7| = 7, and 12 is greater than 7."
hint: "Find each distance from zero first."
questionGoal: "Compare absolute values as distances."
misconception: "Comparing the signed numbers instead of their distances."
```

```question
key: u05_l03_q06_explain_absolute_value
type: multiple-choice
prompt: "Which explanation best shows why absolute value cannot be negative?"
choices:
  - "Absolute value measures distance from zero, and distance is never negative."
  - "Absolute value cannot be negative because negative numbers do not exist on a number line."
  - "Absolute value is always negative when the original number is negative."
  - "Absolute value means changing every number to its opposite."
correctAnswer: "Absolute value measures distance from zero, and distance is never negative."
explanation: "Absolute value reports how far a number is from zero."
hint: "Think about measuring length on a number line."
questionGoal: "Explain the nonnegative nature of absolute value."
misconception: "Thinking absolute value is just the original number."
```

### Lesson 4: Compare And Order Rational Numbers

```question
key: u05_l04_q01_compare_negatives
type: multiple-choice
prompt: "Which comparison is true?"
choices:
  - "-8 > -3"
  - "-8 < -3"
  - "-8 = -3"
  - "8 < -3"
correctAnswer: "-8 < -3"
explanation: "-8 is farther left on the number line than -3, so it is less."
hint: "On a number line, numbers to the right are greater."
questionGoal: "Compare two negative integers by position."
misconception: "Thinking the negative number with the larger numeral is greater."
```

```question
key: u05_l04_q02_order_rationals
type: order-items
prompt: "Put the numbers in order from least to greatest."
items:
  - "0.5"
  - "-1.2"
  - "-0.25"
  - "1"
correctOrder:
  - "-1.2"
  - "-0.25"
  - "0.5"
  - "1"
explanation: "Negative numbers are less than positive numbers; -1.2 is farther left than -0.25."
hint: "Imagine the numbers on a number line."
questionGoal: "Order positive and negative decimals."
misconception: "Ordering by absolute value rather than number-line position."
```

```question
key: u05_l04_q03_fraction_decimal_compare
type: multiple-choice
prompt: "Which number is greatest?"
choices:
  - "-3/4"
  - "-0.2"
  - "0"
  - "-1"
correctAnswer: "0"
explanation: "Zero is greater than all the negative numbers listed."
hint: "All negative numbers are to the left of zero."
questionGoal: "Compare zero with negative rational numbers."
misconception: "Thinking a negative with small absolute value is greater than zero."
```

```question
key: u05_l04_q04_fill_compare
type: fill-blank
prompt: "Complete the comparison."
sentenceBefore: "-1/2 is"
sentenceAfter: "-3/4."
choices:
  - "less than"
  - "equal to"
  - "greater than"
  - "the opposite of"
correctAnswer: "greater than"
explanation: "-1/2 is -0.5 and -3/4 is -0.75; -0.5 is farther right."
hint: "Place both numbers between -1 and 0."
questionGoal: "Compare negative fractions using magnitude and number-line position."
misconception: "Applying positive fraction comparisons without considering sign."
```

```question
key: u05_l04_q05_match_positions
type: match-pairs
prompt: "Match each description to the number."
pairs:
  - left: "one half below zero"
    right: "-1/2"
  - left: "three tenths above zero"
    right: "0.3"
  - left: "one and two tenths below zero"
    right: "-1.2"
  - left: "exactly at the reference point"
    right: "0"
explanation: "Descriptions with below zero are negative; above zero is positive."
hint: "Use the reference point zero."
questionGoal: "Connect rational numbers to number-line descriptions."
misconception: "Ignoring direction words when interpreting rational numbers."
```

```question
key: u05_l04_q06_explain_order
type: multiple-choice
prompt: "Which explanation best shows why -0.4 is greater than -0.9?"
choices:
  - "-0.4 is closer to zero and farther right on the number line than -0.9."
  - "-0.9 is greater because 9 tenths is more than 4 tenths."
  - "-0.4 is less because it is closer to zero."
  - "Negative decimals cannot be compared unless they are whole numbers."
correctAnswer: "-0.4 is closer to zero and farther right on the number line than -0.9."
explanation: "For negative numbers, the number closer to zero is greater."
hint: "Picture both numbers between -1 and 0."
questionGoal: "Explain comparison of negative decimals."
misconception: "Thinking 9 tenths makes -0.9 greater than -0.4."
```

### Lesson 5: Plot Points In All Four Quadrants

```question
key: u05_l05_q01_quadrant_signs
type: multiple-choice
prompt: "Point A is at (-3, 4). Which quadrant is it in?"
choices:
  - "Quadrant I"
  - "Quadrant II"
  - "Quadrant III"
  - "Quadrant IV"
correctAnswer: "Quadrant II"
explanation: "A negative x-coordinate and positive y-coordinate place the point in Quadrant II."
hint: "Move left for negative x and up for positive y."
questionGoal: "Identify quadrant from coordinate signs."
misconception: "Reversing x and y or ignoring signs."
```

```question
key: u05_l05_q02_match_quadrants
type: match-pairs
prompt: "Match each point to its quadrant."
pairs:
  - left: "(2, 5)"
    right: "Quadrant I"
  - left: "(-2, 5)"
    right: "Quadrant II"
  - left: "(-2, -5)"
    right: "Quadrant III"
  - left: "(2, -5)"
    right: "Quadrant IV"
explanation: "Quadrants are determined by the signs of x and y."
hint: "x moves left/right; y moves up/down."
questionGoal: "Associate coordinate sign pairs with quadrants."
misconception: "Using only one coordinate to determine the quadrant."
```

```question
key: u05_l05_q03_coordinate_movement
type: fill-blank
prompt: "Complete the movement description for (5, -2)."
sentenceBefore: "From the origin, move 5 units right and 2 units"
sentenceAfter: "."
choices:
  - "up"
  - "down"
  - "left"
  - "right"
correctAnswer: "down"
explanation: "The y-coordinate is negative, so move down."
hint: "The second coordinate controls vertical movement."
questionGoal: "Interpret ordered pair movement."
misconception: "Treating the second coordinate as horizontal movement."
```

```question
key: u05_l05_q04_point_on_axis
type: multiple-choice
prompt: "Where is the point (0, -6)?"
choices:
  - "On the x-axis"
  - "On the y-axis below the origin"
  - "In Quadrant IV"
  - "In Quadrant III"
correctAnswer: "On the y-axis below the origin"
explanation: "An x-coordinate of 0 means the point is on the y-axis."
hint: "If x is 0, there is no left or right movement."
questionGoal: "Interpret points that lie on an axis."
misconception: "Putting every point with a negative coordinate into a quadrant."
```

```question
key: u05_l05_q05_type_coordinate
type: text-input
prompt: "A point is 4 units left and 3 units down from the origin. Type its ordered pair."
acceptedAnswers:
  - "(-4,-3)"
  - "(-4, -3)"
answerType: text
explanation: "Left gives x = -4 and down gives y = -3."
hint: "Write x first, then y."
questionGoal: "Produce an ordered pair from movement directions."
misconception: "Reversing coordinate order."
```

```question
key: u05_l05_q06_explain_ordered_pair
type: multiple-choice
prompt: "Which explanation correctly plots (-2, -5) from the origin?"
choices:
  - "Move 2 units left for x = -2, then 5 units down for y = -5."
  - "Move 2 units down first, then 5 units left."
  - "Move 2 units right and 5 units up because distances are positive."
  - "Move 5 units left for x = -5, then 2 units down for y = -2."
correctAnswer: "Move 2 units left for x = -2, then 5 units down for y = -5."
explanation: "The first coordinate is horizontal; the second coordinate is vertical."
hint: "Use x first, then y."
questionGoal: "Explain ordered-pair plotting with negative coordinates."
misconception: "Plotting y before x."
```

### Lesson 6: Interpret Coordinates In Context

```question
key: u05_l06_q01_map_point
type: passage-question
prompt: "Read the map description and answer."
passageTitle: "Park Map"
passage: |
  The fountain is at the origin. The library kiosk is at (3, -2).
question: "What does (3, -2) mean?"
choices:
  - "3 units east and 2 units south of the fountain"
  - "3 units west and 2 units north of the fountain"
  - "2 units east and 3 units south of the fountain"
  - "3 units south and 2 units east of the fountain"
correctAnswer: "3 units east and 2 units south of the fountain"
explanation: "Positive x means east/right; negative y means south/down."
hint: "Interpret x first, then y."
questionGoal: "Interpret coordinates on a contextual map."
misconception: "Reversing coordinate order or sign direction."
```

```question
key: u05_l06_q02_axis_distance
type: text-input
prompt: "Point A is at (-4, 2) and Point B is at (3, 2). Type the horizontal distance between them."
acceptedAnswers:
  - "7"
  - "7 units"
answerType: text
explanation: "The points have the same y-coordinate, and the distance from -4 to 3 is 7 units."
hint: "Count from -4 to 0, then from 0 to 3."
questionGoal: "Find horizontal distance between coordinate points."
misconception: "Adding coordinates without considering distance."
```

```question
key: u05_l06_q03_context_signs
type: multiple-choice
prompt: "A drone moves from (0, 0) to (-5, 6). Which description fits?"
choices:
  - "5 units west and 6 units north"
  - "5 units east and 6 units south"
  - "6 units west and 5 units north"
  - "5 units south and 6 units west"
correctAnswer: "5 units west and 6 units north"
explanation: "Negative x means west/left and positive y means north/up."
hint: "Read the first coordinate as horizontal movement."
questionGoal: "Interpret signs in a coordinate movement context."
misconception: "Swapping x and y directions."
```

```question
key: u05_l06_q04_match_coordinate_descriptions
type: match-pairs
prompt: "Match each point to its map description."
pairs:
  - left: "(2, 3)"
    right: "2 east, 3 north"
  - left: "(-2, 3)"
    right: "2 west, 3 north"
  - left: "(-2, -3)"
    right: "2 west, 3 south"
  - left: "(2, -3)"
    right: "2 east, 3 south"
explanation: "The signs of x and y show directions from the origin."
hint: "Positive x is east; positive y is north."
questionGoal: "Translate ordered pairs into contextual directions."
misconception: "Ignoring negative signs in coordinate contexts."
```

```question
key: u05_l06_q05_vertical_distance
type: fill-blank
prompt: "Point C is at (2, -3) and Point D is at (2, 5)."
sentenceBefore: "The vertical distance between them is"
sentenceAfter: "units."
choices:
  - "2"
  - "5"
  - "8"
  - "-8"
correctAnswer: "8"
explanation: "The y-values are -3 and 5, which are 8 units apart."
hint: "Distance is not negative; count from -3 to 5."
questionGoal: "Find vertical distance between coordinate points."
misconception: "Reporting a signed difference as a negative distance."
```

```question
key: u05_l06_q06_explain_coordinate_distance
type: multiple-choice
prompt: "Which explanation best shows why the distance from (-6, 1) to (-2, 1) is 4 units?"
choices:
  - "The y-values are the same, so count horizontally from x = -6 to x = -2, which is 4 units."
  - "Add -6 and -2 because distance uses both x-values."
  - "Use the y-values only, so the distance is 1 unit."
  - "The distance is negative because both x-values are negative."
correctAnswer: "The y-values are the same, so count horizontally from x = -6 to x = -2, which is 4 units."
explanation: "Horizontal distance comes from the difference between x-values when y is the same."
hint: "Count on the x-axis only."
questionGoal: "Explain axis-aligned coordinate distance."
misconception: "Combining both coordinates when only horizontal distance is needed."
```

## Unit 6: Expressions, Equivalence, And Algebraic Language

### Lesson 1: Variables As Quantities

```question
key: u06_l01_q01_variable_meaning
type: multiple-choice
prompt: "In the expression 5m, what can m represent?"
choices:
  - "A number of minutes, muffins, or another quantity"
  - "Only the unit meters"
  - "Always the number 5"
  - "The answer after the equals sign"
correctAnswer: "A number of minutes, muffins, or another quantity"
explanation: "A variable can represent a quantity. In 5m, 5 multiplies that quantity."
hint: "A letter in algebra can stand for a number."
questionGoal: "Interpret a variable as a quantity rather than a label."
misconception: "Reading variables only as unit labels."
```

```question
key: u06_l01_q02_expression_context
type: fill-blank
prompt: "Complete the meaning."
sentenceBefore: "If n is the number of notebooks, then 3n means 3 dollars for each"
sentenceAfter: "."
choices:
  - "notebook"
  - "dollar"
  - "student"
  - "equation"
correctAnswer: "notebook"
explanation: "3n means 3 times the number of notebooks, or $3 for each notebook."
hint: "Use what n represents."
questionGoal: "Interpret multiplication by a variable in context."
misconception: "Ignoring the quantity the variable represents."
```

```question
key: u06_l01_q03_match_variable_context
type: match-pairs
prompt: "Match each expression to its meaning if b is the number of boxes."
pairs:
  - left: "b + 4"
    right: "4 more than the number of boxes"
  - left: "4b"
    right: "4 times the number of boxes"
  - left: "b - 4"
    right: "4 fewer than the number of boxes"
  - left: "b/4"
    right: "the number of boxes split into 4 equal groups"
explanation: "Each operation describes a different relationship with b."
hint: "Read b as 'the number of boxes.'"
questionGoal: "Connect expressions involving a variable to verbal meanings."
misconception: "Treating all expressions with the same variable as equivalent."
```

```question
key: u06_l01_q04_variable_statement
type: multiple-choice
prompt: "Which statement correctly describes x + 7?"
choices:
  - "7 more than x"
  - "7 times x"
  - "x divided by 7"
  - "7 less than x"
correctAnswer: "7 more than x"
explanation: "The plus sign shows addition, so x + 7 is 7 more than x."
hint: "Read the operation symbol."
questionGoal: "Interpret a simple variable expression."
misconception: "Confusing addition with multiplication or subtraction language."
```

```question
key: u06_l01_q05_type_meaning
type: multiple-choice
prompt: "If p is the number of pages read each day, which interpretation of 7p is correct?"
choices:
  - "It means the total pages read in 7 days if p pages are read each day."
  - "It means 7 pages read each day for p days."
  - "It means 7 plus the number of pages read each day."
  - "It means p pages split into 7 equal groups."
correctAnswer: "It means the total pages read in 7 days if p pages are read each day."
explanation: "7p means 7 times the quantity p."
hint: "Use multiplication language."
questionGoal: "Explain a coefficient-variable expression in context."
misconception: "Reading 7p as a two-character label."
```

```question
key: u06_l01_q06_variable_or_label
type: multiple-choice
prompt: "A poster says '5m = 5 meters.' Why might that be wrong in algebra?"
choices:
  - "Because m could be a variable and 5m could mean 5 times m."
  - "Because m can never stand for meters."
  - "Because 5m must always equal 5."
  - "Because variables cannot use letters."
correctAnswer: "Because m could be a variable and 5m could mean 5 times m."
explanation: "In algebra, a letter next to a number usually means multiplication by the variable."
hint: "Think about the difference between a unit abbreviation and a variable."
questionGoal: "Distinguish unit labels from algebraic variables."
misconception: "Assuming every letter after a number is a unit."
```

### Lesson 2: Evaluate Expressions With Substitution

```question
key: u06_l02_q01_substitute_basic
type: text-input
prompt: "Evaluate 3x + 4 when x = 5."
acceptedAnswers:
  - "19"
answerType: number
explanation: "Substitute 5 for x: 3 x 5 + 4 = 15 + 4 = 19."
hint: "Replace x with 5 before calculating."
questionGoal: "Evaluate a one-variable expression by substitution."
misconception: "Adding 3 and 5 instead of multiplying 3 by x."
```

```question
key: u06_l02_q02_correct_substitution
type: multiple-choice
prompt: "Which expression shows 2n - 1 after substituting n = 8?"
choices:
  - "2(8) - 1"
  - "2n - 8"
  - "8 - 1"
  - "2 + 8 - 1"
correctAnswer: "2(8) - 1"
explanation: "The variable n is replaced by 8 everywhere it appears."
hint: "Keep the operations the same and replace only n."
questionGoal: "Choose a correct substitution step."
misconception: "Replacing the wrong part of the expression."
```

```question
key: u06_l02_q03_fill_substitution
type: fill-blank
prompt: "Complete the evaluation."
sentenceBefore: "If a = 6, then a/3 + 5 ="
sentenceAfter: "."
choices:
  - "2"
  - "7"
  - "11"
  - "18"
correctAnswer: "7"
explanation: "6 divided by 3 is 2, and 2 + 5 = 7."
hint: "Substitute 6 for a first."
questionGoal: "Evaluate an expression involving division and addition."
misconception: "Adding before substituting or ignoring division."
```

```question
key: u06_l02_q04_match_values
type: match-pairs
prompt: "Match each expression value when y = 4."
pairs:
  - left: "y + 9"
    right: "13"
  - left: "3y"
    right: "12"
  - left: "20 - y"
    right: "16"
  - left: "y/2"
    right: "2"
explanation: "Replace y with 4 in each expression."
hint: "Use y = 4 every time."
questionGoal: "Evaluate several simple expressions for one variable value."
misconception: "Using different values for the same variable."
```

```question
key: u06_l02_q05_context_evaluate
type: passage-question
prompt: "Read the context and answer."
passageTitle: "Movie Tickets"
passage: |
  The expression 6t gives the cost in dollars for t student tickets.
question: "What is the cost when t = 4?"
choices:
  - "$10"
  - "$24"
  - "$64"
  - "$2"
correctAnswer: "$24"
explanation: "6 x 4 = 24, so 4 tickets cost $24."
hint: "Replace t with 4."
questionGoal: "Evaluate an expression in context."
misconception: "Concatenating 6 and 4 or adding instead of multiplying."
```

```question
key: u06_l02_q06_explain_substitution
type: multiple-choice
prompt: "Which explanation correctly evaluates 10 - 2r when r = 3?"
choices:
  - "Replace r with 3, then compute 10 - 2 times 3, which is 4."
  - "Replace r with 3, then subtract left to right: 10 - 2 - 3 = 5."
  - "Replace 2 with 3 to get 10 - 3r."
  - "First compute 10 - 2, then multiply by 3 to get 24."
correctAnswer: "Replace r with 3, then compute 10 - 2 times 3, which is 4."
explanation: "Substitution creates a numerical expression that must still follow operation order."
hint: "Write 10 - 2(3)."
questionGoal: "Explain substitution and operation order."
misconception: "Subtracting before multiplying."
```

### Lesson 3: Exponents And Order Of Operations

```question
key: u06_l03_q01_exponent_meaning
type: multiple-choice
prompt: "What does 5^3 mean?"
choices:
  - "5 x 3"
  - "5 + 5 + 5"
  - "5 x 5 x 5"
  - "3 x 3 x 3 x 3 x 3"
correctAnswer: "5 x 5 x 5"
explanation: "The exponent 3 means use 5 as a factor three times."
hint: "The base is the repeated factor."
questionGoal: "Interpret exponent notation as repeated multiplication."
misconception: "Multiplying the base by the exponent."
```

```question
key: u06_l03_q02_match_exponents
type: match-pairs
prompt: "Match each expression to its expanded form."
pairs:
  - left: "2^4"
    right: "2 x 2 x 2 x 2"
  - left: "3^2"
    right: "3 x 3"
  - left: "4^3"
    right: "4 x 4 x 4"
  - left: "6^1"
    right: "6"
explanation: "The exponent tells how many times the base appears as a factor."
hint: "Do not multiply the base by the exponent."
questionGoal: "Connect exponent notation to expanded multiplication."
misconception: "Reading exponents as repeated addition."
```

```question
key: u06_l03_q03_order_steps
type: order-items
prompt: "Put the steps for evaluating 4 + 3^2 x 2 in order."
items:
  - "Add 4 + 18"
  - "Compute 3^2 = 9"
  - "Multiply 9 x 2 = 18"
  - "Get 22"
correctOrder:
  - "Compute 3^2 = 9"
  - "Multiply 9 x 2 = 18"
  - "Add 4 + 18"
  - "Get 22"
explanation: "Exponents come before multiplication, and multiplication comes before addition."
hint: "Use standard order of operations."
questionGoal: "Sequence order-of-operations steps with an exponent."
misconception: "Working strictly left to right."
```

```question
key: u06_l03_q04_evaluate_expression
type: text-input
prompt: "Evaluate 2^3 + 5."
acceptedAnswers:
  - "13"
answerType: number
explanation: "2^3 = 8, and 8 + 5 = 13."
hint: "Compute the exponent before adding."
questionGoal: "Evaluate a simple expression with an exponent."
misconception: "Computing 2 x 3 + 5 instead of 2^3 + 5."
```

```question
key: u06_l03_q05_parentheses
type: multiple-choice
prompt: "Which expression equals 30?"
choices:
  - "2 + 4 x 7"
  - "(2 + 4) x 5"
  - "2^3 x 5"
  - "20 - 5 x 3"
correctAnswer: "(2 + 4) x 5"
explanation: "Parentheses first: 2 + 4 = 6, and 6 x 5 = 30."
hint: "Evaluate the grouped part first."
questionGoal: "Use parentheses and order of operations to evaluate expressions."
misconception: "Ignoring grouping symbols."
```

```question
key: u06_l03_q06_explain_exponent_error
type: multiple-choice
prompt: "A student says 4^2 = 8. Which explanation correctly identifies the mistake?"
choices:
  - "The student multiplied 4 by 2, but 4^2 means 4 x 4, which is 16."
  - "The student added 4 and 2, but 4^2 means 4 + 4 + 4 + 4."
  - "The student should have squared 2 instead, so the answer is 4."
  - "The student is correct because an exponent means multiply the base by the exponent."
correctAnswer: "The student multiplied 4 by 2, but 4^2 means 4 x 4, which is 16."
explanation: "An exponent tells how many times to use the base as a factor."
hint: "Expand 4^2 before finding its value."
questionGoal: "Correct the common exponent-as-multiplication misconception."
misconception: "Thinking a^b means a times b."
```

### Lesson 4: Write Expressions From Words

```question
key: u06_l04_q01_expression_choice
type: multiple-choice
prompt: "Which expression means '7 more than n'?"
choices:
  - "7n"
  - "n + 7"
  - "7 - n"
  - "n/7"
correctAnswer: "n + 7"
explanation: "7 more than n means add 7 to n."
hint: "More than usually means addition."
questionGoal: "Translate an addition phrase into an expression."
misconception: "Confusing addition with multiplication when a number is next to a variable."
```

```question
key: u06_l04_q02_reverse_subtraction
type: multiple-choice
prompt: "Which expression means '6 less than x'?"
choices:
  - "6 - x"
  - "x - 6"
  - "6x"
  - "x + 6"
correctAnswer: "x - 6"
explanation: "6 less than x means start with x and subtract 6."
hint: "Ask what quantity is being reduced."
questionGoal: "Translate a subtraction phrase where order matters."
misconception: "Writing subtraction in the order words appear."
```

```question
key: u06_l04_q03_type_expression
type: text-input
prompt: "Type an expression for 'the product of 9 and p' using p."
acceptedAnswers:
  - "9p"
  - "9*p"
  - "9 x p"
  - "p x 9"
  - "p*9"
answerType: text
explanation: "The product of 9 and p means 9 multiplied by p."
hint: "Product means multiplication."
questionGoal: "Produce a multiplication expression from words."
misconception: "Using addition for product language."
```

```question
key: u06_l04_q04_match_word_phrases
type: match-pairs
prompt: "Match each phrase to an expression."
pairs:
  - left: "m increased by 4"
    right: "m + 4"
  - left: "4 times m"
    right: "4m"
  - left: "m divided by 4"
    right: "m/4"
  - left: "4 less than m"
    right: "m - 4"
explanation: "Operation words determine the expression structure."
hint: "Watch the order for subtraction and division."
questionGoal: "Translate common verbal phrases into expressions."
misconception: "Assuming word order always matches symbol order."
```

```question
key: u06_l04_q05_error_expression
type: error-correction
prompt: "Correct the expression for '12 less than y.'"
sentence: "12 less than y = 12 - y"
acceptedAnswers:
  - "12 less than y = y - 12"
  - "y - 12"
explanation: "12 less than y means y is reduced by 12."
hint: "Start with the quantity y."
questionGoal: "Correct a reversed subtraction expression."
misconception: "Writing subtraction in the phrase order."
```

```question
key: u06_l04_q06_explain_expression
type: multiple-choice
prompt: "Which explanation best shows why c/5 represents 'c split into 5 equal groups'?"
choices:
  - "Dividing c by 5 means separating the quantity c into 5 equal parts."
  - "Dividing c by 5 means making 5 groups with c items in each group."
  - "c/5 means subtracting 5 from c."
  - "c/5 means multiplying c by 5."
correctAnswer: "Dividing c by 5 means separating the quantity c into 5 equal parts."
explanation: "Division expressions can represent equal sharing."
hint: "Use the meaning of division."
questionGoal: "Explain a division expression from words."
misconception: "Treating slash notation as a symbol without meaning."
```

### Lesson 5: Properties And Equivalent Expressions

```question
key: u06_l05_q01_equivalent_choice
type: multiple-choice
prompt: "Which expression is equivalent to x + 9?"
choices:
  - "9 + x"
  - "9x"
  - "x - 9"
  - "x + x"
correctAnswer: "9 + x"
explanation: "Addition is commutative, so x + 9 and 9 + x have the same value."
hint: "Which operation can change order without changing the value?"
questionGoal: "Identify equivalent expressions using the commutative property of addition."
misconception: "Treating any expression with the same symbols as equivalent."
```

```question
key: u06_l05_q02_non_equivalent
type: multiple-choice
prompt: "Which expression is NOT equivalent to 4(n + 2)?"
choices:
  - "4n + 8"
  - "(n + 2)4"
  - "4n + 2"
  - "4 x (n + 2)"
correctAnswer: "4n + 2"
explanation: "The 4 must multiply both n and 2, so the expanded form is 4n + 8."
hint: "Check whether the 2 was also multiplied by 4."
questionGoal: "Detect a non-equivalent expression involving distribution."
misconception: "Multiplying only the variable term in a grouped expression."
```

```question
key: u06_l05_q03_match_equivalent
type: match-pairs
prompt: "Match each expression to an equivalent expression."
pairs:
  - left: "a + 6"
    right: "6 + a"
  - left: "3(b + 2)"
    right: "3b + 6"
  - left: "5c + 5d"
    right: "5(c + d)"
  - left: "2 x 7 x n"
    right: "14n"
explanation: "Equivalent expressions keep the same value by using properties of operations."
hint: "Use commutative, associative, and distributive reasoning."
questionGoal: "Match equivalent expressions across several properties."
misconception: "Matching by appearance instead of value."
```

```question
key: u06_l05_q04_test_value
type: fill-blank
prompt: "Complete the check."
sentenceBefore: "If x = 3, then 2x + 5 has value"
sentenceAfter: "."
choices:
  - "10"
  - "11"
  - "13"
  - "25"
correctAnswer: "11"
explanation: "2 x 3 + 5 = 6 + 5 = 11."
hint: "Substitute 3 for x."
questionGoal: "Use substitution to test expression values."
misconception: "Concatenating 2 and 3 or ignoring multiplication."
```

```question
key: u06_l05_q05_expression_error
type: error-correction
prompt: "Correct the false equivalence."
sentence: "2(x + 5) = 2x + 5"
acceptedAnswers:
  - "2(x + 5) = 2x + 10"
  - "2(x+5)=2x+10"
explanation: "The 2 multiplies both x and 5, giving 2x + 10."
hint: "Multiply each term inside the parentheses by 2."
questionGoal: "Correct a distribution-related equivalence error."
misconception: "Multiplying only the variable term."
```

```question
key: u06_l05_q06_explain_equivalent
type: multiple-choice
prompt: "Which explanation best shows why 6 + t and t + 6 are equivalent?"
choices:
  - "They add the same two quantities, and addition can change order without changing the sum."
  - "They are equivalent only when t equals 6."
  - "They are not equivalent because the variable must come first."
  - "They are equivalent because addition and multiplication are the same operation."
correctAnswer: "They add the same two quantities, and addition can change order without changing the sum."
explanation: "The commutative property of addition makes the two expressions equivalent."
hint: "Try a value for t and compare."
questionGoal: "Explain equivalence using an operation property."
misconception: "Thinking different order always means different expression value."
```

### Lesson 6: Distribute To Show Equivalent Forms

```question
key: u06_l06_q01_distribute_basic
type: multiple-choice
prompt: "Which expression is equivalent to 5(x + 4)?"
choices:
  - "5x + 4"
  - "5x + 20"
  - "x + 20"
  - "9x"
correctAnswer: "5x + 20"
explanation: "The 5 multiplies both x and 4, so 5(x + 4) = 5x + 20."
hint: "Distribute 5 to each term inside the parentheses."
questionGoal: "Expand a simple grouped expression using distribution."
misconception: "Multiplying only the variable term."
```

```question
key: u06_l06_q02_area_model
type: fill-blank
prompt: "A rectangle has height 3 and width x + 6."
sentenceBefore: "The total area expression is 3x +"
sentenceAfter: "."
choices:
  - "3"
  - "6"
  - "9"
  - "18"
correctAnswer: "18"
explanation: "3(x + 6) = 3x + 18 because 3 x 6 = 18."
hint: "Multiply the height by both parts of the width."
questionGoal: "Connect distribution to an area model."
misconception: "Forgetting to multiply the constant part by the outside factor."
```

```question
key: u06_l06_q03_match_distribution
type: match-pairs
prompt: "Match each grouped expression to its distributed form."
pairs:
  - left: "2(a + 5)"
    right: "2a + 10"
  - left: "4(b + 3)"
    right: "4b + 12"
  - left: "6(c + 1)"
    right: "6c + 6"
  - left: "3(d + 7)"
    right: "3d + 21"
explanation: "Multiply the outside factor by each term inside the parentheses."
hint: "Use two smaller products."
questionGoal: "Match distributed forms of simple expressions."
misconception: "Adding the outside number instead of multiplying."
```

```question
key: u06_l06_q04_distribution_error
type: error-correction
prompt: "Correct the distributed form."
sentence: "7(y + 2) = 7y + 2"
acceptedAnswers:
  - "7(y + 2) = 7y + 14"
  - "7(y+2)=7y+14"
explanation: "The 7 multiplies both y and 2."
hint: "What is 7 x 2?"
questionGoal: "Correct a one-sided distribution error."
misconception: "Distributing only to the variable term."
```

```question
key: u06_l06_q05_factor_form
type: multiple-choice
prompt: "Which grouped expression is equivalent to 4n + 12?"
choices:
  - "4(n + 3)"
  - "4(n + 12)"
  - "n(4 + 12)"
  - "12(n + 4)"
correctAnswer: "4(n + 3)"
explanation: "4(n + 3) distributes to 4n + 12."
hint: "Look for a common factor of 4n and 12."
questionGoal: "Recognize a factored form as equivalent to a distributed expression."
misconception: "Putting the constant inside parentheses without dividing by the common factor."
```

```question
key: u06_l06_q06_explain_distribution
type: multiple-choice
prompt: "Which explanation best shows why 3(x + 5) equals 3x + 15?"
choices:
  - "There are 3 groups of x and 3 groups of 5, so the total is 3x + 15."
  - "The 3 only multiplies x, so the expression becomes 3x + 5."
  - "Add 3 to each term inside the parentheses to get x + 8."
  - "Combine 3 and 5 first to get 8x."
correctAnswer: "There are 3 groups of x and 3 groups of 5, so the total is 3x + 15."
explanation: "Distribution multiplies each part of the group by the outside factor."
hint: "Think of 3 copies of the whole group x + 5."
questionGoal: "Explain distribution conceptually."
misconception: "Seeing distribution as a symbol trick without group meaning."
```

## Unit 7: Equations, Inequalities, And Variable Relationships

### Lesson 1: Equations As Balanced Statements

```question
key: u07_l01_q01_true_equation
type: multiple-choice
prompt: "Which equation is true?"
choices:
  - "8 + 5 = 12"
  - "7 + 6 = 10 + 3"
  - "4 x 3 = 4 + 3"
  - "20 - 9 = 20 + 9"
correctAnswer: "7 + 6 = 10 + 3"
explanation: "Both sides equal 13, so the equation is true."
hint: "Evaluate both sides of the equals sign."
questionGoal: "Interpret equality as both sides having the same value."
misconception: "Reading the equals sign as 'the answer comes next.'"
```

```question
key: u07_l01_q02_balance_blank
type: fill-blank
prompt: "Complete the balanced equation."
sentenceBefore: "14 + 9 ="
sentenceAfter: "+ 10"
choices:
  - "11"
  - "12"
  - "13"
  - "23"
correctAnswer: "13"
explanation: "14 + 9 = 23, and 13 + 10 = 23."
hint: "Both sides must have the same value."
questionGoal: "Find a missing value that preserves equality."
misconception: "Putting the total on the right side without reading the whole equation."
```

```question
key: u07_l01_q03_match_equal_values
type: match-pairs
prompt: "Match each expression to an expression with the same value."
pairs:
  - left: "6 + 9"
    right: "20 - 5"
  - left: "4 x 7"
    right: "14 x 2"
  - left: "36 divided by 6"
    right: "3 + 3"
  - left: "5^2"
    right: "30 - 5"
explanation: "Each pair has the same value, so it can form a true equation."
hint: "Evaluate each expression."
questionGoal: "Match equivalent numerical expressions."
misconception: "Matching by appearance instead of value."
```

```question
key: u07_l01_q04_equal_sign_meaning
type: multiple-choice
prompt: "What does the equals sign mean in 4x + 2 = 18?"
choices:
  - "The left side has the same value as the right side"
  - "Add all the numbers"
  - "The answer is always on the right"
  - "The equation is already solved"
correctAnswer: "The left side has the same value as the right side"
explanation: "An equation states that two expressions are equal."
hint: "Think of a balance scale."
questionGoal: "State the meaning of equality in an algebraic equation."
misconception: "Treating equals as a command to compute."
```

```question
key: u07_l01_q05_equation_truth
type: text-input
prompt: "Type the value of x that makes x + 6 = 15 true."
acceptedAnswers:
  - "9"
answerType: number
explanation: "9 + 6 = 15, so x = 9 makes the equation true."
hint: "Ask what plus 6 equals 15."
questionGoal: "Find a value that balances a simple equation."
misconception: "Combining visible numbers instead of finding the missing value."
```

```question
key: u07_l01_q06_explain_balance
type: multiple-choice
prompt: "Which explanation best shows why 5 + 7 = 8 + 4 is true?"
choices:
  - "Both sides have the same value because 5 + 7 = 12 and 8 + 4 = 12."
  - "The equation is true because 8 + 4 is on the right side."
  - "The equation is true because both sides use addition."
  - "The equation is false because the numbers on each side look different."
correctAnswer: "Both sides have the same value because 5 + 7 = 12 and 8 + 4 = 12."
explanation: "An equation is true when both sides have the same value."
hint: "Find the value of each side."
questionGoal: "Explain equality by comparing both sides."
misconception: "Looking only at the right side as the answer."
```

### Lesson 2: Solve One-Step Equations

```question
key: u07_l02_q01_solve_addition
type: text-input
prompt: "Solve x + 8 = 21. Type x."
acceptedAnswers:
  - "13"
answerType: number
explanation: "Subtract 8 from both sides: x = 13."
hint: "Use the inverse of adding 8."
questionGoal: "Solve a one-step addition equation."
misconception: "Adding 8 again instead of undoing addition."
```

```question
key: u07_l02_q02_inverse_choice
type: multiple-choice
prompt: "Which inverse operation solves y - 9 = 14?"
choices:
  - "Add 9 to both sides"
  - "Subtract 9 from both sides"
  - "Multiply both sides by 9"
  - "Divide both sides by 9"
correctAnswer: "Add 9 to both sides"
explanation: "Adding 9 undoes subtracting 9, so y = 23."
hint: "Choose the operation that undoes -9."
questionGoal: "Choose the inverse operation for a subtraction equation."
misconception: "Applying the same operation instead of the inverse."
```

```question
key: u07_l02_q03_solve_multiplication
type: fill-blank
prompt: "Solve 6n = 42."
sentenceBefore: "n ="
sentenceAfter: "."
choices:
  - "6"
  - "7"
  - "36"
  - "48"
correctAnswer: "7"
explanation: "Divide both sides by 6: n = 7."
hint: "6n means 6 times n."
questionGoal: "Solve a one-step multiplication equation."
misconception: "Subtracting 6 instead of dividing by 6."
```

```question
key: u07_l02_q04_solve_division
type: text-input
prompt: "Solve a/5 = 9. Type a."
acceptedAnswers:
  - "45"
answerType: number
explanation: "Multiply both sides by 5: a = 45."
hint: "Undo division by 5."
questionGoal: "Solve a one-step division equation."
misconception: "Dividing by 5 again instead of multiplying."
```

```question
key: u07_l02_q05_match_equation_solution
type: match-pairs
prompt: "Match each equation to its solution."
pairs:
  - left: "m + 4 = 17"
    right: "m = 13"
  - left: "p - 6 = 11"
    right: "p = 17"
  - left: "3q = 24"
    right: "q = 8"
  - left: "r/2 = 15"
    right: "r = 30"
explanation: "Each solution makes its equation true."
hint: "Use the inverse operation."
questionGoal: "Solve several one-step equations."
misconception: "Using one inverse operation for all equation types."
```

```question
key: u07_l02_q06_explain_solving
type: multiple-choice
prompt: "Which explanation correctly solves z - 12 = 30?"
choices:
  - "Add 12 to both sides to undo subtracting 12, so z = 42."
  - "Subtract 12 from both sides because the equation already subtracts 12, so z = 18."
  - "Add 12 only to the left side so the z is alone."
  - "Divide both sides by 12 because 12 is next to z."
correctAnswer: "Add 12 to both sides to undo subtracting 12, so z = 42."
explanation: "Solving preserves equality by doing the same inverse operation to both sides."
hint: "What operation undoes subtracting 12?"
questionGoal: "Explain solving a one-step equation."
misconception: "Changing one side of the equation without preserving equality."
```

### Lesson 3: Check A Solution In Context

```question
key: u07_l03_q01_check_solution
type: multiple-choice
prompt: "Does x = 6 solve 4x + 3 = 27?"
choices:
  - "Yes, because 4(6) + 3 = 27"
  - "Yes, because 6 + 3 = 9"
  - "No, because 4 + 6 + 3 = 13"
  - "No, because x must be 27"
correctAnswer: "Yes, because 4(6) + 3 = 27"
explanation: "Substituting 6 gives 24 + 3 = 27, so it is a solution."
hint: "Replace x with 6 and evaluate."
questionGoal: "Check a proposed equation solution by substitution."
misconception: "Checking by combining numbers without respecting expression structure."
```

```question
key: u07_l03_q02_context_solution
type: passage-question
prompt: "Read the context and answer."
passageTitle: "Tickets"
passage: |
  Tickets cost $8 each. The equation 8t = 48 represents the total cost.
question: "What does t = 6 mean?"
choices:
  - "6 tickets cost $48"
  - "6 dollars per ticket"
  - "48 tickets cost $8"
  - "The ticket price is $6"
correctAnswer: "6 tickets cost $48"
explanation: "The variable t represents the number of tickets."
hint: "Use what t represents in the context."
questionGoal: "Interpret a solution in context."
misconception: "Treating the solution as any number in the story."
```

```question
key: u07_l03_q03_valid_context
type: multiple-choice
prompt: "An equation gives s = -3 for the number of students in a group. What should you conclude?"
choices:
  - "The solution may solve the equation but does not fit the context."
  - "The group has negative 3 students."
  - "The answer must be rounded to 3."
  - "Negative students are always allowed."
correctAnswer: "The solution may solve the equation but does not fit the context."
explanation: "A number of students cannot be negative, so context matters."
hint: "Ask whether the value makes sense for what the variable represents."
questionGoal: "Check solution reasonableness in context."
misconception: "Accepting a symbolic solution without checking context."
```

```question
key: u07_l03_q04_check_error
type: error-correction
prompt: "Correct the check."
sentence: "For n + 5 = 18, n = 12 because 12 + 5 = 18."
acceptedAnswers:
  - "For n + 5 = 18, n = 13 because 13 + 5 = 18."
  - "n = 13 because 13 + 5 = 18."
explanation: "12 + 5 = 17, not 18. The correct solution is 13."
hint: "Substitute the proposed value and evaluate."
questionGoal: "Correct an invalid solution check."
misconception: "Claiming a solution without performing the substitution accurately."
```

```question
key: u07_l03_q05_solution_check_value
type: fill-blank
prompt: "Complete the check for 5p = 40."
sentenceBefore: "If p = 8, then 5p ="
sentenceAfter: "."
choices:
  - "5"
  - "8"
  - "13"
  - "40"
correctAnswer: "40"
explanation: "5 x 8 = 40, so p = 8 is a solution."
hint: "Substitute 8 for p."
questionGoal: "Evaluate an expression to check a solution."
misconception: "Reading 5p as 5 + p."
```

```question
key: u07_l03_q06_explain_context_check
type: multiple-choice
prompt: "Which explanation best shows why checking a solution in the original story can matter?"
choices:
  - "A value might make the equation true but still not make sense for the real quantity, like negative tickets."
  - "The story does not matter once an equation has a solution."
  - "Any negative solution is correct in every context."
  - "Checking the story replaces the need to check the equation."
correctAnswer: "A value might make the equation true but still not make sense for the real quantity, like negative tickets."
explanation: "A complete check asks whether the value works mathematically and in context."
hint: "Think about variables that count people, tickets, or objects."
questionGoal: "Explain the purpose of context checks."
misconception: "Treating symbolic correctness as sufficient in all cases."
```

### Lesson 4: Inequalities And Solution Sets

```question
key: u07_l04_q01_inequality_meaning
type: multiple-choice
prompt: "Which value makes x > 6 true?"
choices:
  - "4"
  - "6"
  - "7"
  - "0"
correctAnswer: "7"
explanation: "x must be greater than 6, and 7 is greater than 6."
hint: "The boundary 6 is not included for >."
questionGoal: "Test a value in a simple inequality."
misconception: "Including the boundary value when the symbol is >."
```

```question
key: u07_l04_q02_at_least
type: fill-blank
prompt: "Complete the inequality."
sentenceBefore: "At least 12 means x"
sentenceAfter: "12."
choices:
  - ">"
  - "<"
  - ">="
  - "<="
correctAnswer: ">="
explanation: "At least 12 means 12 or more."
hint: "At least includes the boundary value."
questionGoal: "Translate 'at least' into an inequality symbol."
misconception: "Confusing at least with greater than only."
```

```question
key: u07_l04_q03_solution_set
type: multiple-choice
prompt: "Which list contains only solutions to y <= 3?"
choices:
  - "1, 2, 3"
  - "3, 4, 5"
  - "4, 5, 6"
  - "-1, 3, 5"
correctAnswer: "1, 2, 3"
explanation: "All of 1, 2, and 3 are less than or equal to 3."
hint: "Every value in the list must work."
questionGoal: "Identify a set of values satisfying an inequality."
misconception: "Thinking one matching value makes the whole list valid."
```

```question
key: u07_l04_q04_match_phrases
type: match-pairs
prompt: "Match each phrase to an inequality."
pairs:
  - left: "more than 5"
    right: "x > 5"
  - left: "less than 5"
    right: "x < 5"
  - left: "at least 5"
    right: "x >= 5"
  - left: "at most 5"
    right: "x <= 5"
explanation: "At least and at most include the boundary; more than and less than do not."
hint: "Listen for whether the boundary value is allowed."
questionGoal: "Translate common inequality phrases."
misconception: "Reversing at least and at most."
```

```question
key: u07_l04_q05_context_inequality
type: passage-question
prompt: "Read the context and answer."
passageTitle: "Ride Height"
passage: |
  A sign says riders must be at least 48 inches tall.
question: "Which inequality represents allowed heights h?"
choices:
  - "h > 48"
  - "h >= 48"
  - "h < 48"
  - "h <= 48"
correctAnswer: "h >= 48"
explanation: "At least 48 means 48 inches or taller."
hint: "Does exactly 48 inches qualify?"
questionGoal: "Represent a real constraint with an inequality."
misconception: "Using > when the boundary is included."
```

```question
key: u07_l04_q06_explain_many_solutions
type: multiple-choice
prompt: "Which explanation best shows why x < 10 has more than one solution?"
choices:
  - "Any number less than 10 works, such as 9, 0, or -4."
  - "Only 9 works because it is the closest whole number less than 10."
  - "Only 10 works because it is the boundary value."
  - "No negative numbers can be solutions to an inequality."
correctAnswer: "Any number less than 10 works, such as 9, 0, or -4."
explanation: "An inequality can describe a whole set of possible values."
hint: "Try listing values that make the statement true."
questionGoal: "Explain solution sets for inequalities."
misconception: "Thinking inequalities have one exact answer like many equations."
```

### Lesson 5: Graph Inequalities On A Number Line

```question
key: u07_l05_q01_closed_circle
type: multiple-choice
prompt: "Which graph description matches x >= 4?"
choices:
  - "Closed circle at 4, shade right"
  - "Open circle at 4, shade right"
  - "Closed circle at 4, shade left"
  - "Open circle at 4, shade left"
correctAnswer: "Closed circle at 4, shade right"
explanation: "The symbol >= includes 4 and all greater values."
hint: "Greater values are to the right, and equal means closed circle."
questionGoal: "Graph an inequality with included boundary."
misconception: "Using an open circle for an inclusive inequality."
```

```question
key: u07_l05_q02_open_circle
type: multiple-choice
prompt: "Which graph description matches y < -2?"
choices:
  - "Open circle at -2, shade left"
  - "Closed circle at -2, shade left"
  - "Open circle at -2, shade right"
  - "Closed circle at -2, shade right"
correctAnswer: "Open circle at -2, shade left"
explanation: "The symbol < does not include -2 and points to smaller values on the left."
hint: "Test y = -3 to see which side works."
questionGoal: "Graph a strict inequality with a negative boundary."
misconception: "Shading right because the boundary is negative."
```

```question
key: u07_l05_q03_match_graphs
type: match-pairs
prompt: "Match each inequality to its graph description."
pairs:
  - left: "x > 1"
    right: "open at 1, shade right"
  - left: "x < 1"
    right: "open at 1, shade left"
  - left: "x >= 1"
    right: "closed at 1, shade right"
  - left: "x <= 1"
    right: "closed at 1, shade left"
explanation: "Open circles exclude the boundary; closed circles include it."
hint: "Use symbol direction for shading and the line under the symbol for closed circles."
questionGoal: "Connect inequality symbols to graph features."
misconception: "Choosing circle type and direction independently of the symbol."
```

```question
key: u07_l05_q04_graph_error
type: error-correction
prompt: "Correct the graph description for n <= 6."
sentence: "n <= 6 is graphed with an open circle at 6 and shading right."
acceptedAnswers:
  - "n <= 6 is graphed with a closed circle at 6 and shading left."
  - "closed circle at 6 and shade left"
explanation: "The <= symbol includes 6 and uses values less than 6."
hint: "The line under < means the boundary is included."
questionGoal: "Correct both endpoint and direction errors in an inequality graph."
misconception: "Using open circles for all inequalities and shading the wrong direction."
```

```question
key: u07_l05_q05_read_graph_description
type: fill-blank
prompt: "A graph has an open circle at 9 and shading to the right."
sentenceBefore: "The inequality is x"
sentenceAfter: "9."
choices:
  - ">"
  - "<"
  - ">="
  - "<="
correctAnswer: ">"
explanation: "Open means 9 is not included, and shading right means values greater than 9."
hint: "Open circle means no equal sign."
questionGoal: "Write an inequality from a graph description."
misconception: "Using >= because the shading goes right."
```

```question
key: u07_l05_q06_explain_graph
type: multiple-choice
prompt: "Which explanation correctly graphs x < 2?"
choices:
  - "Put an open circle at 2 because 2 is not included, then shade left for numbers less than 2."
  - "Put a closed circle at 2 because 2 is the boundary, then shade left."
  - "Put an open circle at 2, then shade right for numbers greater than 2."
  - "Put a point at 0 because all inequalities start at zero."
correctAnswer: "Put an open circle at 2 because 2 is not included, then shade left for numbers less than 2."
explanation: "The graph shows all values that make the inequality true."
hint: "Ask whether 2 itself works and where smaller numbers are."
questionGoal: "Explain number-line graphing for a strict inequality."
misconception: "Including the boundary in a strict inequality."
```

### Lesson 6: Tables, Graphs, And Variable Relationships

```question
key: u07_l06_q01_dependent_variable
type: multiple-choice
prompt: "The cost c of notebooks is c = 3n, where n is the number of notebooks. Which variable depends on the other?"
choices:
  - "c depends on n"
  - "n depends on c only"
  - "3 depends on c"
  - "No variable depends on another"
correctAnswer: "c depends on n"
explanation: "The total cost changes when the number of notebooks changes."
hint: "Ask which quantity is determined by the other."
questionGoal: "Identify dependent and independent variables in context."
misconception: "Swapping dependent and independent variables."
```

```question
key: u07_l06_q02_complete_table
type: multi-blank-cloze
prompt: "Complete the table for c = 4n."
parts:
  - "n: 1, 2, 3. c: 4, "
  - ", "
  - "."
blanks:
  - correctAnswer: "8"
    acceptedAnswers:
      - "8"
  - correctAnswer: "12"
    acceptedAnswers:
      - "12"
explanation: "Multiply each n-value by 4 to get c."
hint: "Use c = 4n for each input."
questionGoal: "Complete a table from a simple equation."
misconception: "Adding 4 once instead of applying the rule to each input."
```

```question
key: u07_l06_q03_match_representations
type: match-pairs
prompt: "Match each representation to the same relationship."
pairs:
  - left: "c = 5n"
    right: "$5 per item"
  - left: "d = 60t"
    right: "60 miles per hour"
  - left: "p = 2s"
    right: "2 points for each star"
  - left: "w = 7d"
    right: "7 dollars per day"
explanation: "Each equation multiplies the independent variable by a constant rate."
hint: "Read the coefficient as 'per one.'"
questionGoal: "Connect equations to verbal rules."
misconception: "Treating coefficients as unrelated numbers."
```

```question
key: u07_l06_q04_graph_point
type: multiple-choice
prompt: "For the rule y = 2x, which point belongs on the graph?"
choices:
  - "(3, 6)"
  - "(3, 5)"
  - "(6, 3)"
  - "(2, 3)"
correctAnswer: "(3, 6)"
explanation: "When x = 3, y = 2 x 3 = 6."
hint: "Substitute the x-value into the rule."
questionGoal: "Connect an equation to a coordinate point."
misconception: "Reversing x and y or not using the rule."
```

```question
key: u07_l06_q05_relationship_context
type: passage-question
prompt: "Read the situation and answer."
passageTitle: "Saving"
passage: |
  Lena saves $6 each week. Let w be weeks and s be total dollars saved.
question: "Which equation represents the relationship?"
choices:
  - "s = 6w"
  - "w = 6s"
  - "s = w + 6"
  - "s = w - 6"
correctAnswer: "s = 6w"
explanation: "Total savings equals 6 dollars times the number of weeks."
hint: "One week adds $6."
questionGoal: "Write an equation for a simple dependent relationship."
misconception: "Using addition instead of repeated equal amounts."
```

```question
key: u07_l06_q06_explain_variables
type: multiple-choice
prompt: "In d = 12h, where d is distance and h is hours, which explanation correctly identifies the independent variable?"
choices:
  - "Hours h is independent because the distance depends on how many hours have passed."
  - "Distance d is independent because it appears first in the equation."
  - "The number 12 is independent because it is not a variable."
  - "Hours h depends on distance because h is written after d."
correctAnswer: "Hours h is independent because the distance depends on how many hours have passed."
explanation: "The input hours determines the output distance."
hint: "Ask which quantity you choose first."
questionGoal: "Explain dependent and independent variables in a rate relationship."
misconception: "Choosing the variable that appears first in the equation rather than using meaning."
```

## Unit 8: Geometry, Measurement, And Coordinate Figures

### Lesson 1: Area Of Parallelograms And Triangles

```question
key: u08_l01_q01_parallelogram_area
type: text-input
prompt: "A parallelogram has base 9 cm and height 4 cm. Type its area in square centimeters."
acceptedAnswers:
  - "36"
  - "36 square centimeters"
  - "36 sq cm"
answerType: text
explanation: "Area of a parallelogram is base x height, so 9 x 4 = 36 square centimeters."
hint: "Use the perpendicular height, not a slanted side."
questionGoal: "Find parallelogram area from base and height."
misconception: "Confusing base-height area with perimeter."
```

```question
key: u08_l01_q02_triangle_area
type: multiple-choice
prompt: "A triangle has base 10 units and height 6 units. What is its area?"
choices:
  - "16 square units"
  - "30 square units"
  - "60 square units"
  - "100 square units"
correctAnswer: "30 square units"
explanation: "Triangle area is 1/2 x base x height, so 1/2 x 10 x 6 = 30."
hint: "A triangle is half of a related parallelogram or rectangle."
questionGoal: "Find triangle area using base and height."
misconception: "Forgetting the one-half factor."
```

```question
key: u08_l01_q03_base_height_choice
type: fill-blank
prompt: "Complete the statement."
sentenceBefore: "In an area formula, the height must be"
sentenceAfter: "to the base."
choices:
  - "parallel"
  - "perpendicular"
  - "longer"
  - "slanted"
correctAnswer: "perpendicular"
explanation: "Height measures straight up from the base at a right angle."
hint: "Look for a right angle to the base."
questionGoal: "Identify the correct meaning of height in area formulas."
misconception: "Using any side length as height."
```

```question
key: u08_l01_q04_match_area_formulas
type: match-pairs
prompt: "Match each shape to a Grade 6 area formula."
pairs:
  - left: "rectangle"
    right: "length x width"
  - left: "parallelogram"
    right: "base x perpendicular height"
  - left: "triangle"
    right: "1/2 x b x h"
  - left: "square with side s"
    right: "s x s"
explanation: "Each formula measures the surface covered by the shape."
hint: "Triangles use half of a related parallelogram."
questionGoal: "Connect shapes to area formulas."
misconception: "Using one formula for every polygon."
```

```question
key: u08_l01_q05_formula_reason
type: multiple-choice
prompt: "Why does a triangle with base 8 and height 5 have area 20, not 40?"
choices:
  - "A triangle is half of the related parallelogram"
  - "The height should be ignored"
  - "Area always means add base and height"
  - "The units are cubic"
correctAnswer: "A triangle is half of the related parallelogram"
explanation: "The related parallelogram area is 8 x 5 = 40, and the triangle is half of it."
hint: "Compare the triangle to a matching parallelogram."
questionGoal: "Explain the one-half factor in triangle area."
misconception: "Multiplying base and height without halving for triangles."
```

```question
key: u08_l01_q06_explain_triangle_area
type: multiple-choice
prompt: "Which explanation correctly finds the area of a triangle with base 12 and height 3?"
choices:
  - "Multiply 12 by 3 to get 36, then take half, so the area is 18 square units."
  - "Add 12 and 3 to get 15 square units."
  - "Multiply 12 by 3 and keep 36 because triangles use base times height."
  - "Take half of 12 and add the height to get 9 square units."
correctAnswer: "Multiply 12 by 3 to get 36, then take half, so the area is 18 square units."
explanation: "Triangle area is half the area of a related parallelogram."
hint: "Use 1/2 x base x height."
questionGoal: "Explain a triangle-area calculation."
misconception: "Leaving out the unit or the one-half step."
```

### Lesson 2: Decompose Polygons For Area

```question
key: u08_l02_q01_decompose_l_shape
type: multiple-choice
prompt: "An L-shaped figure can be split into two non-overlapping rectangles. What should you do with the two rectangle areas?"
choices:
  - "Add them"
  - "Subtract both from the perimeter"
  - "Multiply them together"
  - "Ignore the smaller rectangle"
correctAnswer: "Add them"
explanation: "The total area is the sum of the areas of the non-overlapping parts."
hint: "Area covers all pieces of the figure."
questionGoal: "Choose how to combine decomposed area parts."
misconception: "Using perimeter or multiplication instead of adding part areas."
```

```question
key: u08_l02_q02_part_areas
type: multi-blank-cloze
prompt: "A polygon is split into a rectangle with area 24 and a triangle with area 9."
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
hint: "Use each part area once."
questionGoal: "Set up total area from decomposed parts."
misconception: "Dropping one part or double-counting a part."
```

```question
key: u08_l02_q03_total_area
type: text-input
prompt: "A shape is decomposed into rectangles with areas 18, 12, and 6 square units. Type the total area."
acceptedAnswers:
  - "36"
  - "36 square units"
answerType: text
explanation: "18 + 12 + 6 = 36 square units."
hint: "Add all non-overlapping pieces."
questionGoal: "Compute total area from multiple parts."
misconception: "Multiplying part areas or omitting one piece."
```

```question
key: u08_l02_q04_valid_decomposition
type: multiple-choice
prompt: "Which decomposition is valid for finding a polygon's area?"
choices:
  - "Split it into non-overlapping rectangles and triangles"
  - "Split it into overlapping shapes and add all areas"
  - "Use only the longest side"
  - "Add all side lengths"
correctAnswer: "Split it into non-overlapping rectangles and triangles"
explanation: "Non-overlapping familiar shapes can be measured and added without double-counting."
hint: "A good decomposition covers the whole figure exactly once."
questionGoal: "Identify a valid area decomposition strategy."
misconception: "Confusing decomposition for area with perimeter addition."
```

```question
key: u08_l02_q05_match_parts
type: match-pairs
prompt: "Match each part to its area."
pairs:
  - left: "Rectangle: 6 by 4"
    right: "24 square units"
  - left: "Triangle: base 8, height 3"
    right: "12 square units"
  - left: "Rectangle: 5 by 5"
    right: "25 square units"
  - left: "Triangle: base 10, height 4"
    right: "20 square units"
explanation: "Rectangles use base x height; triangles use half of base x height."
hint: "Remember the half for triangle parts."
questionGoal: "Find areas of component shapes in a decomposition."
misconception: "Using rectangle area for triangular parts."
```

```question
key: u08_l02_q06_explain_decomposition
type: multiple-choice
prompt: "Which explanation best shows why decomposing a polygon can make its area easier to find?"
choices:
  - "A complicated polygon can be split into shapes like rectangles and triangles with known area formulas."
  - "A polygon's area is always found by adding all side lengths."
  - "Decomposing means overlapping shapes and adding every area, even the overlap."
  - "Decomposing avoids using area formulas."
correctAnswer: "A complicated polygon can be split into shapes like rectangles and triangles with known area formulas."
explanation: "Decomposition turns an unfamiliar area problem into familiar part areas."
hint: "Think about shapes whose formulas you already know."
questionGoal: "Explain the purpose of decomposition for area."
misconception: "Thinking a polygon must have one memorized formula."
```

### Lesson 3: Volume With Fractional Edge Lengths

```question
key: u08_l03_q01_fraction_volume
type: text-input
prompt: "A rectangular prism has length 4, width 3, and height 1/2. Type its volume."
acceptedAnswers:
  - "6"
  - "6 cubic units"
answerType: text
explanation: "4 x 3 x 1/2 = 12 x 1/2 = 6 cubic units."
hint: "Multiply the three edge lengths."
questionGoal: "Compute volume with a fractional dimension."
misconception: "Thinking fractional edge lengths cannot give volume."
```

```question
key: u08_l03_q02_volume_units
type: multiple-choice
prompt: "Which unit should label the volume of a prism?"
choices:
  - "centimeters"
  - "square centimeters"
  - "cubic centimeters"
  - "centimeters per hour"
correctAnswer: "cubic centimeters"
explanation: "Volume measures three-dimensional space, so it uses cubic units."
hint: "Volume fills space, not just length or surface."
questionGoal: "Choose correct units for volume."
misconception: "Confusing linear, square, and cubic units."
```

```question
key: u08_l03_q03_volume_formula
type: fill-blank
prompt: "Complete the volume formula for a rectangular prism."
sentenceBefore: "V = length x width x"
sentenceAfter: "."
choices:
  - "height"
  - "area"
  - "perimeter"
  - "surface"
correctAnswer: "height"
explanation: "Rectangular prism volume multiplies the three edge dimensions."
hint: "A prism has three dimensions."
questionGoal: "Recall the volume formula meaningfully."
misconception: "Using only two dimensions for volume."
```

```question
key: u08_l03_q04_match_volume
type: match-pairs
prompt: "Match each prism dimension set to its volume."
pairs:
  - left: "2 by 3 by 4"
    right: "24 cubic units"
  - left: "5 by 2 by 1/2"
    right: "5 cubic units"
  - left: "6 by 1/3 by 3"
    right: "6 cubic units"
  - left: "1.5 by 2 by 4"
    right: "12 cubic units"
explanation: "Multiply length, width, and height for each prism."
hint: "Use all three dimensions."
questionGoal: "Compute volume with whole, fractional, and decimal dimensions."
misconception: "Adding edge lengths instead of multiplying them."
```

```question
key: u08_l03_q05_volume_context
type: passage-question
prompt: "Read the situation and answer."
passageTitle: "Storage Box"
passage: |
  A box is 2 feet long, 1.5 feet wide, and 1 foot tall.
question: "What is the volume?"
choices:
  - "3 cubic feet"
  - "4.5 cubic feet"
  - "2.5 square feet"
  - "6 feet"
correctAnswer: "3 cubic feet"
explanation: "2 x 1.5 x 1 = 3 cubic feet."
hint: "Multiply length, width, and height."
questionGoal: "Apply volume with a decimal dimension in context."
misconception: "Using area or perimeter units for a volume context."
```

```question
key: u08_l03_q06_explain_cubic_units
type: multiple-choice
prompt: "Which explanation best shows why volume is labeled with cubic units?"
choices:
  - "Volume measures how much space fills a solid, using length, width, and height units together."
  - "Volume measures only the distance around a shape, so it uses cubic units."
  - "Volume covers a flat surface, so cubic units and square units mean the same thing."
  - "The unit label depends only on the largest edge length."
correctAnswer: "Volume measures how much space fills a solid, using length, width, and height units together."
explanation: "Cubic units count three-dimensional unit cubes."
hint: "Think of unit cubes filling a box."
questionGoal: "Explain cubic units as a volume label."
misconception: "Treating all measurement labels as interchangeable."
```

### Lesson 4: Nets And Surface Area

```question
key: u08_l04_q01_surface_area_meaning
type: multiple-choice
prompt: "What does surface area measure?"
choices:
  - "The total area of all outside faces"
  - "The distance around one face"
  - "The space inside a solid"
  - "The height only"
correctAnswer: "The total area of all outside faces"
explanation: "Surface area adds the areas of every face of a solid."
hint: "Think about how much paper would wrap the outside."
questionGoal: "Define surface area conceptually."
misconception: "Confusing surface area with volume or perimeter."
```

```question
key: u08_l04_q02_box_surface_area
type: text-input
prompt: "A rectangular prism has dimensions 2, 3, and 4. Type its surface area."
acceptedAnswers:
  - "52"
  - "52 square units"
answerType: text
explanation: "Face pairs: 2(2 x 3) + 2(2 x 4) + 2(3 x 4) = 12 + 16 + 24 = 52."
hint: "Find the area of each pair of matching faces."
questionGoal: "Compute surface area of a rectangular prism."
misconception: "Computing volume instead of surface area."
```

```question
key: u08_l04_q03_face_areas
type: multi-blank-cloze
prompt: "A prism has side lengths 2, 5, and 6."
parts:
  - "The three different face areas are "
  - ", "
  - ", and "
  - "."
blanks:
  - correctAnswer: "10"
    acceptedAnswers:
      - "10"
  - correctAnswer: "12"
    acceptedAnswers:
      - "12"
  - correctAnswer: "30"
    acceptedAnswers:
      - "30"
explanation: "The face areas are 2 x 5 = 10, 2 x 6 = 12, and 5 x 6 = 30."
hint: "Pair the dimensions two at a time."
questionGoal: "Find the face areas needed for surface area."
misconception: "Using all three dimensions for each face."
```

```question
key: u08_l04_q04_match_faces
type: match-pairs
prompt: "For a 3 by 4 by 5 prism, match each face description to its area fact."
pairs:
  - left: "one 3 by 4 face"
    right: "12 square units"
  - left: "one 3 by 5 face"
    right: "15 square units"
  - left: "one 4 by 5 face"
    right: "20 square units"
  - left: "a pair of matching 3 by 4 faces"
    right: "24 square units total"
explanation: "A face area uses two dimensions, and matching opposite faces have the same area."
hint: "A face area uses two dimensions."
questionGoal: "Identify face dimensions and areas in a rectangular-prism net."
misconception: "Counting only visible or front faces."
```

```question
key: u08_l04_q05_surface_area_not_volume
type: multiple-choice
prompt: "A box is 6 cm by 2 cm by 3 cm. Which calculation finds volume, not surface area?"
choices:
  - "6 x 2 x 3"
  - "2(6 x 2) + 2(6 x 3) + 2(2 x 3)"
  - "12 + 36 + 12"
  - "area of all faces added"
correctAnswer: "6 x 2 x 3"
explanation: "Multiplying all three dimensions gives volume."
hint: "Volume uses length x width x height."
questionGoal: "Distinguish volume calculation from surface-area calculation."
misconception: "Using volume when asked for wrapping or surface area."
```

```question
key: u08_l04_q06_explain_net
type: multiple-choice
prompt: "Which explanation best shows how a net helps find surface area?"
choices:
  - "A net shows every face flat, so you can find each face area and add them."
  - "A net shows only the front face, so one face area is enough."
  - "A net helps find volume by multiplying all edges shown."
  - "A net changes the solid into a line, so add all edge lengths."
correctAnswer: "A net shows every face flat, so you can find each face area and add them."
explanation: "A net organizes all outside surfaces of a solid."
hint: "Imagine unfolding a box."
questionGoal: "Explain why nets support surface-area reasoning."
misconception: "Thinking a net is decorative rather than a measurement model."
```

### Lesson 5: Coordinate Plane Polygon Problems

```question
key: u08_l05_q01_horizontal_distance
type: text-input
prompt: "Points A(-2, 3) and B(5, 3) are endpoints of a horizontal side. Type the side length."
acceptedAnswers:
  - "7"
  - "7 units"
answerType: text
explanation: "The x-values -2 and 5 are 7 units apart, and the y-values are the same."
hint: "Count from -2 to 5 on the x-axis."
questionGoal: "Find horizontal side length from coordinates."
misconception: "Adding coordinates or using signed distance."
```

```question
key: u08_l05_q02_vertical_distance
type: multiple-choice
prompt: "Points C(4, -1) and D(4, 6) form a vertical side. What is the side length?"
choices:
  - "5 units"
  - "7 units"
  - "-7 units"
  - "10 units"
correctAnswer: "7 units"
explanation: "The y-values -1 and 6 are 7 units apart."
hint: "Distance is never negative."
questionGoal: "Find vertical side length from coordinates."
misconception: "Reporting a negative difference as a distance."
```

```question
key: u08_l05_q03_rectangle_area_coordinates
type: text-input
prompt: "A rectangle has vertices (-1, 1), (5, 1), (5, 4), and (-1, 4). Type its area."
acceptedAnswers:
  - "18"
  - "18 square units"
answerType: text
explanation: "The width is 6 units and the height is 3 units, so area = 18 square units."
hint: "Find horizontal and vertical side lengths first."
questionGoal: "Find coordinate rectangle area."
misconception: "Multiplying coordinates instead of side lengths."
```

```question
key: u08_l05_q04_match_coordinate_tasks
type: match-pairs
prompt: "Match each coordinate task to the needed idea."
pairs:
  - left: "Same y-values"
    right: "horizontal distance"
  - left: "Same x-values"
    right: "vertical distance"
  - left: "Rectangle on grid"
    right: "area from side lengths"
  - left: "Boundary length"
    right: "perimeter from sides"
explanation: "Coordinate geometry uses distances between aligned points."
hint: "Look at which coordinate stays the same."
questionGoal: "Connect coordinate features to geometry tasks."
misconception: "Using the same operation for all coordinate questions."
```

```question
key: u08_l05_q05_coordinate_error
type: error-correction
prompt: "Correct the distance statement."
sentence: "The distance from (-3, 2) to (4, 2) is 1 unit because -3 + 4 = 1."
acceptedAnswers:
  - "The distance from (-3, 2) to (4, 2) is 7 units."
  - "The distance is 7 units."
explanation: "Distance from -3 to 4 on the x-axis is 7 units, not the sum of the coordinates."
hint: "Count from -3 to 0 and then to 4."
questionGoal: "Correct coordinate distance reasoning."
misconception: "Adding coordinate values instead of finding distance."
```

```question
key: u08_l05_q06_explain_coordinate_area
type: multiple-choice
prompt: "Which explanation correctly finds the area of an axis-aligned rectangle from its coordinates?"
choices:
  - "Find the horizontal distance for width and vertical distance for height, then multiply width by height."
  - "Multiply all coordinate numbers together to get the area."
  - "Add the x- and y-values of one vertex to get the area."
  - "Count the four vertices and use 4 as the area."
correctAnswer: "Find the horizontal distance for width and vertical distance for height, then multiply width by height."
explanation: "Coordinates provide side lengths when the sides are parallel to the axes."
hint: "Use coordinate differences, not coordinate products."
questionGoal: "Explain coordinate-plane area strategy."
misconception: "Using coordinate numbers directly as dimensions."
```

### Lesson 6: Choose The Right Measure And Unit

```question
key: u08_l06_q01_measure_choice
type: multiple-choice
prompt: "You want to know how much wrapping paper covers a box. Which measure do you need?"
choices:
  - "Perimeter"
  - "Area of one face only"
  - "Surface area"
  - "Volume"
correctAnswer: "Surface area"
explanation: "Wrapping covers all outside faces, so it uses surface area."
hint: "Wrapping is about the outside surfaces."
questionGoal: "Choose surface area for a wrapping context."
misconception: "Choosing volume for any box problem."
```

```question
key: u08_l06_q02_unit_sort
type: match-pairs
prompt: "Match each measure to a correct unit type."
pairs:
  - left: "Perimeter"
    right: "feet"
  - left: "Area"
    right: "square feet"
  - left: "Volume"
    right: "cubic feet"
  - left: "Unit rate"
    right: "feet per second"
explanation: "The unit type shows whether you measure length, surface, space, or rate."
hint: "Square units cover; cubic units fill."
questionGoal: "Match measures to unit dimensions."
misconception: "Using square units for every geometry measure."
```

```question
key: u08_l06_q03_cover_or_fill
type: fill-blank
prompt: "Complete the statement."
sentenceBefore: "If a problem asks how much sand fills a rectangular sandbox, use"
sentenceAfter: "."
choices:
  - "perimeter"
  - "area"
  - "surface area"
  - "volume"
correctAnswer: "volume"
explanation: "Filling a three-dimensional space requires volume."
hint: "Fill means inside space."
questionGoal: "Choose volume from context language."
misconception: "Using area for a filling context."
```

```question
key: u08_l06_q04_unit_error
type: error-correction
prompt: "Correct the unit label."
sentence: "The volume of the prism is 48 square centimeters."
acceptedAnswers:
  - "The volume of the prism is 48 cubic centimeters."
  - "48 cubic centimeters"
explanation: "Volume uses cubic units, not square units."
hint: "Volume measures three-dimensional space."
questionGoal: "Correct a volume unit error."
misconception: "Confusing area and volume units."
```

```question
key: u08_l06_q05_measure_context
type: passage-question
prompt: "Read the situation and answer."
passageTitle: "Garden Border"
passage: |
  A gardener wants to put a fence around a rectangular garden.
question: "Which measure is needed?"
choices:
  - "Perimeter"
  - "Area"
  - "Surface area"
  - "Volume"
correctAnswer: "Perimeter"
explanation: "A fence goes around the boundary, so perimeter is needed."
hint: "Around the edge means boundary length."
questionGoal: "Choose perimeter for a boundary context."
misconception: "Choosing area whenever a rectangle appears."
```

```question
key: u08_l06_q06_explain_measure_choice
type: multiple-choice
prompt: "Which explanation best describes the difference between area and volume?"
choices:
  - "Area measures how much surface is covered in square units; volume measures how much space is filled in cubic units."
  - "Area and volume both measure the same thing, but volume uses larger numbers."
  - "Area fills a solid with cubic units; volume covers a flat surface with square units."
  - "Area uses linear units and volume uses square units."
correctAnswer: "Area measures how much surface is covered in square units; volume measures how much space is filled in cubic units."
explanation: "The measure and unit dimension must match the attribute being measured."
hint: "Think cover versus fill."
questionGoal: "Explain dimensional reasoning for common measures."
misconception: "Treating area and volume as interchangeable formulas."
```

## Unit 9: Statistics, Financial Decisions, And Cumulative Modeling

### Lesson 1: Statistical Questions And Variability

```question
key: u09_l01_q01_statistical_question
type: multiple-choice
prompt: "Which question is statistical?"
choices:
  - "How old is my teacher?"
  - "How many minutes do students in our class read each day?"
  - "What is 6 x 7?"
  - "What is the room number?"
correctAnswer: "How many minutes do students in our class read each day?"
explanation: "This question expects data that vary from student to student."
hint: "A statistical question expects more than one possible data value."
questionGoal: "Identify a statistical question based on variability."
misconception: "Thinking any question with a number is statistical."
```

```question
key: u09_l01_q02_variability_source
type: fill-blank
prompt: "Complete the statement."
sentenceBefore: "A statistical question expects"
sentenceAfter: "in the data."
choices:
  - "variability"
  - "one fixed answer"
  - "no units"
  - "only multiplication"
correctAnswer: "variability"
explanation: "Statistical questions are designed for answers that vary."
hint: "Think about collecting data from many people or objects."
questionGoal: "State the role of variability in statistical questions."
misconception: "Believing a statistical question has one exact known answer."
```

```question
key: u09_l01_q03_match_questions
type: match-pairs
prompt: "Match each question to its type."
pairs:
  - left: "How tall are the plants in this garden?"
    right: "statistical: many plant heights"
  - left: "How tall is this one plant?"
    right: "fixed answer: one plant"
  - left: "How many books did each student read?"
    right: "statistical: many student counts"
  - left: "How many pages are in this book?"
    right: "fixed answer: one book"
explanation: "Questions about a group usually expect variability; questions about one fixed object often do not."
hint: "Ask whether you would collect several data values."
questionGoal: "Classify statistical and nonstatistical questions."
misconception: "Using the presence of numbers instead of variability to classify."
```

```question
key: u09_l01_q04_revise_question
type: error-correction
prompt: "Revise the question to make it statistical."
sentence: "How many pets does Amir have?"
acceptedAnswers:
  - "How many pets do students in our class have?"
  - "How many pets do families in our neighborhood have?"
  - "How many pets does each student in our class have?"
explanation: "A statistical version asks about a group so the answers can vary."
hint: "Change one person to a group of people."
questionGoal: "Revise a fixed-answer question into a statistical question."
misconception: "Thinking a one-person question is statistical because it has a number."
```

```question
key: u09_l01_q05_variability_context
type: passage-question
prompt: "Read the situation and answer."
passageTitle: "Lunch Survey"
passage: |
  A student wants to collect data about how long students wait in the lunch line.
question: "Why is this a statistical question?"
choices:
  - "Different students may wait different amounts of time"
  - "There is only one possible answer"
  - "It does not use numbers"
  - "It asks about a calculator"
correctAnswer: "Different students may wait different amounts of time"
explanation: "Waiting times can vary across students and days."
hint: "Think about whether every student must have the same answer."
questionGoal: "Explain variability in a data-collection context."
misconception: "Missing the variability that makes a question statistical."
```

```question
key: u09_l01_q06_explain_statistical
type: multiple-choice
prompt: "Which explanation best shows why 'How much water do sixth graders drink in a day?' is statistical?"
choices:
  - "It asks about many sixth graders, and their amounts of water will vary."
  - "It is statistical because it asks for one exact answer about one student."
  - "It is not statistical because water amounts can never vary."
  - "It is statistical because every question with a number is statistical."
correctAnswer: "It asks about many sixth graders, and their amounts of water will vary."
explanation: "A statistical question anticipates variability in collected data."
hint: "Use the word vary or different."
questionGoal: "Explain statistical-question status using variability."
misconception: "Defining statistical only as a question with numbers."
```

### Lesson 2: Dot Plots, Histograms, And Shape

```question
key: u09_l02_q01_dot_plot_peak
type: multiple-choice
prompt: "A dot plot has the most dots above 7. What does that tell you?"
choices:
  - "7 is the most frequent value"
  - "7 is impossible"
  - "The mean must be 7"
  - "There are 7 data values total"
correctAnswer: "7 is the most frequent value"
explanation: "The tallest stack on a dot plot shows the value that occurs most often."
hint: "Dots above a value count how often that value appears."
questionGoal: "Interpret a peak in a dot plot."
misconception: "Confusing most frequent value with mean or total count."
```

```question
key: u09_l02_q02_histogram_bins
type: multiple-choice
prompt: "In a histogram, what does a bar usually represent?"
choices:
  - "A range of data values"
  - "One named category only"
  - "A coordinate point"
  - "The exact mean"
correctAnswer: "A range of data values"
explanation: "Histogram bars group numerical data into intervals."
hint: "Histograms are for numerical data ranges."
questionGoal: "Interpret histogram bars as intervals."
misconception: "Treating histograms like category bar graphs."
```

```question
key: u09_l02_q03_shape_words
type: match-pairs
prompt: "Match each display feature to its meaning."
pairs:
  - left: "cluster"
    right: "many data values close together"
  - left: "gap"
    right: "an interval with no data values"
  - left: "peak"
    right: "a high point in frequency"
  - left: "outlier"
    right: "a value far from most data"
explanation: "Shape words describe how data values are distributed."
hint: "Think about where data are crowded, missing, or far away."
questionGoal: "Connect distribution vocabulary to meanings."
misconception: "Using data-display words interchangeably."
```

```question
key: u09_l02_q04_display_statement
type: passage-question
prompt: "Read the dot plot description and answer."
passageTitle: "Practice Times"
passage: |
  Practice times in minutes: 10, 10, 12, 12, 12, 15, 18.
question: "Which statement describes the distribution?"
choices:
  - "There is a peak at 12 minutes"
  - "There is no variability"
  - "Every value occurs once"
  - "18 is the smallest value"
correctAnswer: "There is a peak at 12 minutes"
explanation: "The value 12 occurs three times, more than any other value."
hint: "Count how often each value appears."
questionGoal: "Describe distribution shape from a small dataset."
misconception: "Ignoring frequency and focusing only on endpoints."
```

```question
key: u09_l02_q05_count_frequency
type: text-input
prompt: "In the data 4, 5, 5, 5, 6, 8, how many data values are 5?"
acceptedAnswers:
  - "3"
answerType: number
explanation: "The value 5 appears three times."
hint: "Count each 5 in the list."
questionGoal: "Read frequency from a small dataset."
misconception: "Reporting the value instead of its frequency."
```

```question
key: u09_l02_q06_explain_shape
type: multiple-choice
prompt: "The data are 2, 2, 3, 3, 3, 4, 9. Which description correctly identifies a cluster or outlier?"
choices:
  - "The values 2, 3, and 4 form a cluster, and 9 is far from the rest."
  - "The value 9 is part of the main cluster because it is the largest value."
  - "There is no variability because several values repeat."
  - "The value 3 is an outlier because it appears most often."
correctAnswer: "The values 2, 3, and 4 form a cluster, and 9 is far from the rest."
explanation: "A distribution can have both a cluster and a possible outlier."
hint: "Look for values close together and values far away."
questionGoal: "Describe distribution shape using vocabulary."
misconception: "Summarizing data only with a single center value."
```

### Lesson 3: Mean, Median, And Outliers

```question
key: u09_l03_q01_find_median
type: order-items
prompt: "Put the data in order to find the median: 8, 2, 6, 4, 10."
items:
  - "10"
  - "6"
  - "2"
  - "8"
  - "4"
correctOrder:
  - "2"
  - "4"
  - "6"
  - "8"
  - "10"
explanation: "After ordering, the middle value is 6."
hint: "Median requires data in order."
questionGoal: "Order data as the first step for finding median."
misconception: "Finding median without ordering data."
```

```question
key: u09_l03_q02_mean_small_set
type: text-input
prompt: "Type the mean of 4, 6, 8, and 10."
acceptedAnswers:
  - "7"
answerType: number
explanation: "The sum is 28, and 28 divided by 4 is 7."
hint: "Add the values, then divide by how many values there are."
questionGoal: "Compute the mean of a small dataset."
misconception: "Using the middle value instead of the balance point."
```

```question
key: u09_l03_q03_outlier_effect
type: multiple-choice
prompt: "Data set A is 5, 6, 6, 7, 100. Which measure is pulled upward most by 100?"
choices:
  - "Mean"
  - "Median"
  - "Minimum"
  - "Number of data values"
correctAnswer: "Mean"
explanation: "The very large outlier increases the sum, which pulls the mean upward."
hint: "Mean uses every value in the sum."
questionGoal: "Identify how an outlier affects mean."
misconception: "Assuming mean and median are affected the same way by outliers."
```

```question
key: u09_l03_q04_choose_center
type: passage-question
prompt: "Read the data and answer."
passageTitle: "Typing Scores"
passage: |
  Words per minute: 22, 24, 25, 26, 90.
question: "Which center better represents a typical student score?"
choices:
  - "Median, because 90 is an outlier"
  - "Mean, because it is always best"
  - "Maximum, because it is largest"
  - "Range, because it is a center"
correctAnswer: "Median, because 90 is an outlier"
explanation: "The outlier 90 pulls the mean upward, so the median is more typical here."
hint: "Look for a value far from the rest."
questionGoal: "Choose mean or median based on outliers."
misconception: "Using mean as the typical value in every situation."
```

```question
key: u09_l03_q05_match_center
type: match-pairs
prompt: "Match each measure to its description."
pairs:
  - left: "mean"
    right: "balance point found by add and divide"
  - left: "median"
    right: "middle value after ordering"
  - left: "outlier"
    right: "value far from most others"
  - left: "center"
    right: "a typical-value summary"
explanation: "Mean and median summarize center in different ways."
hint: "Median needs order; mean needs a sum."
questionGoal: "Connect center and outlier vocabulary to meanings."
misconception: "Confusing mean and median procedures."
```

```question
key: u09_l03_q06_explain_center_choice
type: multiple-choice
prompt: "For the data 10, 11, 12, 13, 60, which explanation best shows why the median may be a better typical value than the mean?"
choices:
  - "The value 60 is far from the rest and pulls the mean up, while the median 12 is near most values."
  - "The mean is better because it always uses all the data values."
  - "The median is better because 60 pulls the median upward more than the mean."
  - "The value 60 should be ignored because outliers are never real data."
correctAnswer: "The value 60 is far from the rest and pulls the mean up, while the median 12 is near most values."
explanation: "Outliers can make the mean less representative of a typical value."
hint: "Look at where most values are clustered."
questionGoal: "Explain center choice in presence of an outlier."
misconception: "Believing one measure of center is always best."
```

### Lesson 4: Range, IQR, And MAD As Spread

```question
key: u09_l04_q01_range
type: text-input
prompt: "Type the range of 3, 5, 8, 11."
acceptedAnswers:
  - "8"
answerType: number
explanation: "Range is maximum minus minimum: 11 - 3 = 8."
hint: "Subtract the smallest value from the largest value."
questionGoal: "Compute range as a measure of spread."
misconception: "Adding endpoints instead of subtracting."
```

```question
key: u09_l04_q02_spread_meaning
type: multiple-choice
prompt: "What does spread describe in a dataset?"
choices:
  - "How much the data values vary"
  - "Only the largest value"
  - "Only the most common value"
  - "The title of the graph"
correctAnswer: "How much the data values vary"
explanation: "Spread describes how close together or far apart data values are."
hint: "Spread is about variability."
questionGoal: "Interpret spread as variability."
misconception: "Thinking center fully describes a dataset."
```

```question
key: u09_l04_q03_iqr
type: fill-blank
prompt: "A dataset has Q1 = 12 and Q3 = 20."
sentenceBefore: "The interquartile range is"
sentenceAfter: "."
choices:
  - "8"
  - "12"
  - "20"
  - "32"
correctAnswer: "8"
explanation: "IQR = Q3 - Q1 = 20 - 12 = 8."
hint: "Subtract the first quartile from the third quartile."
questionGoal: "Compute IQR from quartiles."
misconception: "Adding quartiles instead of finding their difference."
```

```question
key: u09_l04_q04_match_spread
type: match-pairs
prompt: "Match each spread measure to its description."
pairs:
  - left: "range"
    right: "maximum minus minimum"
  - left: "IQR"
    right: "Q3 minus Q1"
  - left: "MAD"
    right: "average distance from the mean"
  - left: "low spread"
    right: "values close together"
explanation: "Spread measures summarize variability in different ways."
hint: "Look for difference, quartiles, or distance from mean."
questionGoal: "Connect spread measures to definitions."
misconception: "Using spread terms interchangeably."
```

```question
key: u09_l04_q05_compare_spread
type: multiple-choice
prompt: "Two datasets have the same median. Set A has range 4 and Set B has range 20. Which has more spread?"
choices:
  - "Set A"
  - "Set B"
  - "They have the same spread"
  - "Cannot tell anything about spread from range"
correctAnswer: "Set B"
explanation: "A larger range means the maximum and minimum are farther apart."
hint: "Compare the two range values."
questionGoal: "Compare variability using range."
misconception: "Assuming same center means same spread."
```

```question
key: u09_l04_q06_explain_spread
type: multiple-choice
prompt: "Which explanation best shows why two datasets can have the same mean but different spread?"
choices:
  - "The values can balance to the same mean while one set is tightly grouped and the other is far apart."
  - "If two datasets have the same mean, their values must be spread out the same way."
  - "Spread and mean both describe only the largest value."
  - "Different spread means the means must be different."
correctAnswer: "The values can balance to the same mean while one set is tightly grouped and the other is far apart."
explanation: "Center and spread describe different features of a distribution."
hint: "Think about 4, 5, 6 and 0, 5, 10."
questionGoal: "Explain the distinction between center and variability."
misconception: "Believing center alone describes the whole distribution."
```

### Lesson 5: Budgets, Unit Prices, And Choices

```question
key: u09_l05_q01_budget_total
type: text-input
prompt: "A student has $30. They spend $12 on lunch and $9 on supplies. Type how many dollars remain."
acceptedAnswers:
  - "9"
  - "$9"
answerType: text
explanation: "$12 + $9 = $21 spent, and $30 - $21 = $9 remaining."
hint: "Find total expenses, then subtract from income."
questionGoal: "Track income, expenses, and remaining budget."
misconception: "Subtracting only one expense."
```

```question
key: u09_l05_q02_fits_budget
type: multiple-choice
prompt: "A club has $45 left. Which purchase fits the budget?"
choices:
  - "3 shirts at $16 each"
  - "4 signs at $11 each"
  - "5 hats at $10 each"
  - "2 banners at $24 each"
correctAnswer: "4 signs at $11 each"
explanation: "4 x $11 = $44, which is within the $45 budget."
hint: "Multiply each unit price by the quantity and compare with $45."
questionGoal: "Use multiplication and inequality reasoning in a budget decision."
misconception: "Checking unit price only instead of total cost."
```

```question
key: u09_l05_q03_unit_price_finance
type: passage-question
prompt: "Read the options and answer."
passageTitle: "Snack Choice"
passage: |
  Option A: 6 bars for $7.20.
  Option B: 8 bars for $10.40.
question: "Which has the lower cost per bar?"
choices:
  - "Option A"
  - "Option B"
  - "They are equal"
  - "Cannot compare because the packages have different numbers of bars"
correctAnswer: "Option A"
explanation: "Option A costs $1.20 per bar. Option B costs $1.30 per bar."
hint: "Divide cost by number of bars for each option."
questionGoal: "Use unit prices in a financial decision."
misconception: "Choosing the larger package without comparing per-item cost."
```

```question
key: u09_l05_q04_match_finance_terms
type: match-pairs
prompt: "Match each financial term to its meaning."
pairs:
  - left: "income"
    right: "money coming in"
  - left: "expense"
    right: "money going out"
  - left: "budget"
    right: "plan for money"
  - left: "savings goal"
    right: "amount set aside for later"
explanation: "Financial models use terms for money in, money out, planning, and saving."
hint: "Think about the direction or purpose of the money."
questionGoal: "Connect financial vocabulary to meanings."
misconception: "Treating financial terms as interchangeable labels."
```

```question
key: u09_l05_q05_percent_savings
type: fill-blank
prompt: "A student earns $40 and saves 25%."
sentenceBefore: "The student saves $"
sentenceAfter: "."
choices:
  - "4"
  - "10"
  - "15"
  - "25"
correctAnswer: "10"
explanation: "25% is one fourth, and one fourth of $40 is $10."
hint: "Use the benchmark percent 25% = 1/4."
questionGoal: "Apply benchmark percent in a savings context."
misconception: "Using the percent number as the dollar amount."
```

```question
key: u09_l05_q06_explain_budget_choice
type: multiple-choice
prompt: "A student has $18. A book costs $11.50 and a notebook costs $6.25. Which explanation correctly decides whether the student can buy both?"
choices:
  - "Yes. The total cost is $17.75, which is less than the $18 budget."
  - "No. The total cost is $18.25, which is more than the budget."
  - "Yes. Each item costs less than $18, so the total does not matter."
  - "No. The book alone uses more than half the budget."
correctAnswer: "Yes. The total cost is $17.75, which is less than the $18 budget."
explanation: "A budget decision compares total expenses with available money."
hint: "Find the total cost first."
questionGoal: "Justify a budget decision with decimal addition and comparison."
misconception: "Comparing each item separately but not the total."
```

### Lesson 6: Mixed Modeling With Data And Finance

```question
key: u09_l06_q01_choose_model_data_money
type: multiple-choice
prompt: "A class wants to compare the typical weekly spending of students, but one student spent much more than everyone else. Which measure may be better?"
choices:
  - "Median"
  - "Maximum only"
  - "Perimeter"
  - "Volume"
correctAnswer: "Median"
explanation: "The median is less affected by a large outlier."
hint: "Look for the effect of the outlier."
questionGoal: "Choose a data summary for a financial dataset with an outlier."
misconception: "Using mean as the typical value in every data context."
```

```question
key: u09_l06_q02_table_or_percent
type: passage-question
prompt: "Read the situation and answer."
passageTitle: "Club Budget"
passage: |
  A club has $120. It plans to spend 50% on supplies and the rest on snacks.
question: "How much is planned for supplies?"
choices:
  - "$30"
  - "$50"
  - "$60"
  - "$120"
correctAnswer: "$60"
explanation: "50% is one half, and half of $120 is $60."
hint: "Use the benchmark percent 50%."
questionGoal: "Apply percent reasoning in a budget model."
misconception: "Treating 50% as $50."
```

```question
key: u09_l06_q03_model_sort
type: match-pairs
prompt: "Match each task to a useful model."
pairs:
  - left: "Compare costs per ounce"
    right: "unit price"
  - left: "Show spending for weeks 1 through 5"
    right: "table"
  - left: "Describe data variability"
    right: "spread measure"
  - left: "Limit spending to $40 or less"
    right: "inequality"
explanation: "The structure of the task determines the model."
hint: "Look for per, over time, variability, or a limit."
questionGoal: "Select models for mixed data and finance tasks."
misconception: "Using the most recent model for every problem."
```

```question
key: u09_l06_q04_compute_mixed
type: text-input
prompt: "A student saves $8 each week for 6 weeks, then spends $15. Type the amount left."
acceptedAnswers:
  - "33"
  - "$33"
answerType: text
explanation: "$8 x 6 = $48 saved, and $48 - $15 = $33 left."
hint: "Find total saved before subtracting the expense."
questionGoal: "Solve a two-step financial model."
misconception: "Subtracting before finding total savings."
```

```question
key: u09_l06_q05_reasonable_mixed
type: multiple-choice
prompt: "A 9-ounce bag costs $4.41. Which unit price is reasonable?"
choices:
  - "$0.49 per ounce"
  - "$4.41 per ounce"
  - "$9.00 per ounce"
  - "$39.69 per ounce"
correctAnswer: "$0.49 per ounce"
explanation: "$4.41 divided by 9 is $0.49 per ounce."
hint: "The unit price should be less than the total price because there are 9 ounces."
questionGoal: "Use reasonableness and division in a unit-price context."
misconception: "Using total price or multiplication as unit price."
```

```question
key: u09_l06_q06_explain_model_choice
type: multiple-choice
prompt: "A question asks whether weekly savings will reach at least $75. Which explanation best shows why an inequality could be useful?"
choices:
  - "An inequality can represent all savings amounts that meet or exceed the goal, such as s >= 75."
  - "An equation is better because exactly one savings amount can meet the goal."
  - "An inequality should be s < 75 because at least means below the goal."
  - "An inequality is useful only when no numbers are known."
correctAnswer: "An inequality can represent all savings amounts that meet or exceed the goal, such as s >= 75."
explanation: "Inequalities represent limits, minimums, maximums, and solution sets."
hint: "At least means the goal amount is included."
questionGoal: "Explain model choice for a financial constraint."
misconception: "Using only an exact equation when a range of values can work."
```

### Lesson 7: Grade 6 Math Mastery Task

```question
key: u09_l07_q01_capstone_model
type: multiple-choice
prompt: "A recipe uses 3 cups oats for every 2 cups raisins. Which tool best keeps the relationship when making more batches?"
choices:
  - "Ratio table"
  - "Absolute value"
  - "Surface area net"
  - "Median"
correctAnswer: "Ratio table"
explanation: "A ratio table can scale both ingredients by the same factor."
hint: "The situation is about keeping a ratio equivalent."
questionGoal: "Choose a representation for a ratio scaling task."
misconception: "Choosing an unrelated tool from a different domain."
```

```question
key: u09_l07_q02_capstone_compute
type: passage-question
prompt: "Read the situation and answer."
passageTitle: "School Event"
passage: |
  Tickets cost $6 each. The club sells 35 tickets and spends $48 on supplies.
question: "How much money is left after supplies?"
choices:
  - "$162"
  - "$210"
  - "$258"
  - "$48"
correctAnswer: "$162"
explanation: "Ticket income is 35 x $6 = $210. After $48 in expenses, $210 - $48 = $162."
hint: "Find income first, then subtract the expense."
questionGoal: "Solve a cumulative money problem with multiplication and subtraction."
misconception: "Subtracting before calculating total income."
```

```question
key: u09_l07_q03_capstone_rational
type: multiple-choice
prompt: "Which number is greatest?"
choices:
  - "-2.5"
  - "-1/2"
  - "0.25"
  - "-0.1"
correctAnswer: "0.25"
explanation: "0.25 is positive, so it is greater than the negative numbers."
hint: "Positive numbers are to the right of zero."
questionGoal: "Compare rational numbers in a mixed review item."
misconception: "Choosing the negative number closest to zero over a positive number."
```

```question
key: u09_l07_q04_capstone_geometry
type: text-input
prompt: "A rectangular prism is 5 cm by 4 cm by 3 cm. Type its volume."
acceptedAnswers:
  - "60"
  - "60 cubic centimeters"
answerType: text
explanation: "Volume = 5 x 4 x 3 = 60 cubic centimeters."
hint: "Use length x width x height."
questionGoal: "Apply volume formula with correct units in cumulative review."
misconception: "Using surface area or square units instead of volume."
```

```question
key: u09_l07_q05_capstone_error
type: error-correction
prompt: "Correct the student's statement."
sentence: "The ratio 4:6 is equivalent to 7:9 because both numbers increased by 3."
acceptedAnswers:
  - "The ratio 4:6 is equivalent to 8:12 because both numbers are multiplied by 2."
  - "4:6 is equivalent to 8:12, not 7:9."
  - "4:6 is not equivalent to 7:9 because equivalent ratios use multiplication, not adding 3."
explanation: "Equivalent ratios use the same multiplier on both quantities, not the same amount added."
hint: "Check whether one scale factor changes 4 to 7 and 6 to 9."
questionGoal: "Correct a core ratio misconception in cumulative review."
misconception: "Using additive reasoning for equivalent ratios."
```

```question
key: u09_l07_q06_capstone_explain
type: multiple-choice
prompt: "A data set is 12, 13, 14, 15, 80. Which explanation best decides whether mean or median better represents a typical value?"
choices:
  - "The median is better because 80 is an outlier that pulls the mean above most values."
  - "The mean is better because it is always the typical value."
  - "The median is 80 because 80 is the largest value."
  - "There is no outlier because all values belong to the data set."
correctAnswer: "The median is better because 80 is an outlier that pulls the mean above most values."
explanation: "A typical-value choice should account for outliers and distribution shape."
hint: "Look at where most values are clustered."
questionGoal: "Use data reasoning in a cumulative explanation item."
misconception: "Assuming mean is always the best measure of center."
```
