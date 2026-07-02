# Level 4 Logic Question Sets

Sources: accepted Level 4 Logic blueprint, course map, unit design briefs, and lesson briefs in `research/logic-4/`.

## Unit 1: Symbolic Statements And Connectives

### Lesson 1: Propositions And Truth Claims

```question
key: u01_l01_q01_truth_claim
type: multiple-choice
prompt: "Which sentence is a proposition?"
choices:
  - "The library opens at 9:00."
  - "Please open the library door."
  - "Did the library open yet?"
  - "Wow, the library!"
correctAnswer: "The library opens at 9:00."
explanation: "A proposition makes a claim that can be true or false."
hint: "Ask which sentence could be checked as true or false."
questionGoal: "Identify a sentence that makes a truth-evaluable claim."
misconception: "Treating every complete sentence as a proposition."
```

```question
key: u01_l01_q02_non_propositions
type: match-pairs
prompt: "Match each sentence to the reason it is or is not a proposition."
pairs:
  - left: "The chess club meets today."
    right: "Makes a claim"
  - left: "Close the window."
    right: "Gives a command"
  - left: "Is the bus late?"
    right: "Asks a question"
  - left: "What a bright poster!"
    right: "Expresses a reaction"
explanation: "Only the claim can be judged true or false."
hint: "Look at what the sentence is doing: claiming, asking, commanding, or reacting."
questionGoal: "Sort propositions from non-propositions by sentence function."
misconception: "Thinking questions or commands can be true or false in the same way claims can."
```

```question
key: u01_l01_q03_unknown_truth
type: multiple-choice
prompt: "A student says, 'There are exactly 512 books on that cart.' You do not know whether this is true. Is it a proposition?"
choices:
  - "Yes, because it still makes a claim that could be true or false."
  - "No, because no one has counted the books yet."
  - "No, because large numbers cannot be propositions."
  - "Yes, but only if the student is confident."
correctAnswer: "Yes, because it still makes a claim that could be true or false."
explanation: "A proposition does not have to be known already. It only has to make a truth-evaluable claim."
hint: "The test is not whether you know the truth. The test is whether the sentence makes a claim."
questionGoal: "Distinguish truth-evaluable from already-known true."
misconception: "Rejecting claims as propositions when the truth is unknown."
```

```question
key: u01_l01_q04_sentence_types
type: fill-blank
prompt: "Complete the rule."
sentenceBefore: "A proposition is a statement that can be"
sentenceAfter: "."
choices:
  - "true or false"
  - "polite or rude"
  - "long or short"
  - "asked or commanded"
correctAnswer: "true or false"
explanation: "Truth value is what makes a statement a proposition."
hint: "Think about the main test from the lesson intro."
questionGoal: "Recall the defining feature of a proposition."
misconception: "Focusing on style or length instead of truth value."
```

```question
key: u01_l01_q05_short_passage
type: passage-question
prompt: "Read the classroom note and answer."
passageTitle: "Classroom Note"
passage: |
  The note on the board says:
  Bring your notebook.
  The quiz starts at 10:15.
  Are your pencils sharpened?
question: "Which sentence from the note is a proposition?"
choices:
  - "Bring your notebook."
  - "The quiz starts at 10:15."
  - "Are your pencils sharpened?"
  - "The note on the board says:"
correctAnswer: "The quiz starts at 10:15."
explanation: "That sentence makes a claim that can be checked as true or false."
hint: "Find the sentence that states something instead of asking or directing."
questionGoal: "Apply proposition sorting in a short context."
misconception: "Choosing a command because it appears in a real note."
```

```question
key: u01_l01_q06_best_reason
type: multiple-choice
prompt: "Why is 'Is the gate locked?' not a proposition?"
choices:
  - "It asks for information instead of making a claim."
  - "It is about a gate."
  - "It has too few words."
  - "It could be answered with yes."
correctAnswer: "It asks for information instead of making a claim."
explanation: "A question can lead to a proposition, but the question itself is not true or false."
hint: "Ask whether the sentence states something or asks something."
questionGoal: "Explain why a question is not a proposition."
misconception: "Thinking any sentence with a possible yes/no answer is itself a proposition."
```

### Lesson 2: Statement Letters For Whole Claims

```question
key: u01_l02_q01_read_key
type: multiple-choice
prompt: "Use the key: P = The trail is open. What does P mean?"
choices:
  - "The whole claim: The trail is open."
  - "Only the word trail"
  - "Only the word open"
  - "A claim about the letter P"
correctAnswer: "The whole claim: The trail is open."
explanation: "A statement letter stands for the complete proposition in the key."
hint: "Read the entire statement after the equals sign."
questionGoal: "Interpret a statement letter as a whole claim."
misconception: "Treating a statement letter as one topic word."
```

```question
key: u01_l02_q02_match_letters
type: match-pairs
prompt: "Use the key to match each letter to its whole claim."
pairs:
  - left: "P"
    right: "The museum is open."
  - left: "Q"
    right: "The tickets are free."
  - left: "R"
    right: "The tour starts at noon."
explanation: "Each letter names one complete statement from the key."
hint: "Do not shorten the claim to just one noun."
questionGoal: "Match statement letters to complete propositions."
misconception: "Changing or trimming the statement when assigning the letter."
```

```question
key: u01_l02_q03_symbol_to_sentence
type: multiple-choice
prompt: "Key: P = The robot moves forward. Q = The robot turns left. Which sentence translates Q?"
choices:
  - "The robot turns left."
  - "The robot moves forward."
  - "The robot moves forward and turns left."
  - "The robot does not turn left."
correctAnswer: "The robot turns left."
explanation: "The key says Q stands for the whole claim about turning left."
hint: "Find the claim paired with Q, not P."
questionGoal: "Translate a single statement letter from a key."
misconception: "Confusing symbols when multiple letters are present."
```

```question
key: u01_l02_q04_complete_key
type: fill-blank
prompt: "Complete the statement key."
sentenceBefore: "If P = 'The lamp is on,' then P stands for the"
sentenceAfter: "."
choices:
  - "whole claim"
  - "letter L"
  - "word lamp only"
  - "opposite claim"
correctAnswer: "whole claim"
explanation: "A statement letter represents the entire proposition assigned to it."
hint: "A statement letter keeps the full meaning of the claim."
questionGoal: "State what a statement letter represents."
misconception: "Reducing the letter to a single word or topic."
```

```question
key: u01_l02_q05_same_letter_rule
type: multiple-choice
prompt: "In one logic problem, why should P not stand for two different claims?"
choices:
  - "The reader would not know which whole claim P means."
  - "The letter P can never be used in logic."
  - "Two claims must always be false."
  - "Only long claims can use letters."
correctAnswer: "The reader would not know which whole claim P means."
explanation: "Within the same key, each statement letter needs one stable meaning."
hint: "A key is useful only if each symbol has a clear meaning."
questionGoal: "Recognize the need for stable symbol assignments."
misconception: "Thinking symbols can change meaning inside one problem."
```

```question
key: u01_l02_q06_order_claims
type: order-items
prompt: "Put the steps for reading a statement-letter key in order."
items:
  - "Use the whole claim in the key"
  - "Find the letter in the expression"
  - "Read the translated sentence"
  - "Check the key"
correctOrder:
  - "Find the letter in the expression"
  - "Check the key"
  - "Use the whole claim in the key"
  - "Read the translated sentence"
explanation: "A symbol is translated by checking its key and keeping the whole claim."
hint: "Start with the symbol you see, then use the key."
questionGoal: "Sequence a safe translation routine for statement letters."
misconception: "Guessing a symbol's meaning from the topic instead of using the key."
```

### Lesson 3: Negation Changes The Claim

```question
key: u01_l03_q01_not_p_translation
type: multiple-choice
prompt: "Key: P = The camera is recording. What does not P mean?"
choices:
  - "The camera is not recording."
  - "The camera is expensive."
  - "The camera is recording loudly."
  - "The camera might record later."
correctAnswer: "The camera is not recording."
explanation: "Negation denies the whole claim P."
hint: "Keep the same claim, then deny it."
questionGoal: "Translate a simple negation from a statement key."
misconception: "Replacing the claim with an unrelated opposite or detail."
```

```question
key: u01_l03_q02_match_negations
type: match-pairs
prompt: "Match each claim to its accurate negation."
pairs:
  - left: "The door is locked."
    right: "The door is not locked."
  - left: "Maya finished the puzzle."
    right: "Maya did not finish the puzzle."
  - left: "The number is even."
    right: "The number is not even."
  - left: "The switch is on."
    right: "The switch is not on."
explanation: "Each negation denies the whole original claim."
hint: "Look for the same claim with not added to deny it."
questionGoal: "Match propositions to whole-claim denials."
misconception: "Choosing a related but not logically exact opposite."
```

```question
key: u01_l03_q03_truth_flip
type: fill-blank
prompt: "If P is true, then not P is ___."
sentenceBefore: "not P is"
sentenceAfter: "."
choices:
  - "true"
  - "false"
  - "both true and false"
  - "not a statement"
correctAnswer: "false"
explanation: "Negation flips the truth value of the whole statement."
hint: "If the claim is true, its denial cannot also be true."
questionGoal: "Apply the truth-value flip for negation."
misconception: "Thinking a claim and its negation can both be true in the same case."
```

```question
key: u01_l03_q04_not_whole_claim
type: multiple-choice
prompt: "Key: P = The blue team won the final game. Which is the best translation of not P?"
choices:
  - "The blue team did not win the final game."
  - "The red team won every game."
  - "The blue team won a practice game."
  - "The final game was exciting."
correctAnswer: "The blue team did not win the final game."
explanation: "The negation denies the exact whole claim, not a different story."
hint: "Keep the same team and same game, then deny the win."
questionGoal: "Avoid changing details when negating a whole proposition."
misconception: "Replacing negation with a stronger or unrelated alternative claim."
```

```question
key: u01_l03_q05_negation_cloze
type: multi-blank-cloze
prompt: "Complete the truth sentence."
parts:
  - "If P is false, then not P is "
  - ". If P is true, then not P is "
  - "."
blanks:
  - correctAnswer: "true"
    acceptedAnswers:
      - "true"
  - correctAnswer: "false"
    acceptedAnswers:
      - "false"
explanation: "Negation reverses the truth value of P."
hint: "Negation flips false to true and true to false."
questionGoal: "Complete both cases for negation truth values."
misconception: "Remembering only one direction of the negation rule."
```

```question
key: u01_l03_q06_short_context
type: passage-question
prompt: "Read the key and answer."
passageTitle: "Weather Key"
passage: |
  P = It is raining after lunch.
  The weather report says P is false.
question: "Which statement must be true?"
choices:
  - "It is not raining after lunch."
  - "It is snowing after lunch."
  - "It rained before lunch."
  - "The weather report is not a proposition."
correctAnswer: "It is not raining after lunch."
explanation: "If P is false, then the negation of P is true."
hint: "Use only the claim in P and its negation."
questionGoal: "Use negation truth values in a short context."
misconception: "Adding information not given by the negation."
```

### Lesson 4: And, Or, And Inclusive Or

```question
key: u01_l04_q01_and_truth
type: multiple-choice
prompt: "P is true and Q is false. What is the truth value of P and Q?"
choices:
  - "True"
  - "False"
  - "It depends on the topic"
  - "Not enough information because P is true"
correctAnswer: "False"
explanation: "`P and Q` is true only when both P and Q are true."
hint: "For and, one false part makes the whole compound false."
questionGoal: "Evaluate a conjunction from truth values."
misconception: "Thinking one true part is enough for an and statement."
```

```question
key: u01_l04_q02_or_inclusive
type: multiple-choice
prompt: "In logic, P or Q is true when:"
choices:
  - "P is true, Q is true, or both are true."
  - "Exactly one of P and Q is true."
  - "Both P and Q are false."
  - "P and Q are questions."
correctAnswer: "P is true, Q is true, or both are true."
explanation: "Logic usually uses inclusive or: at least one part is true, including the case where both are true."
hint: "Inclusive or includes the both-true case."
questionGoal: "State the truth condition for inclusive disjunction."
misconception: "Reading every or as exactly one option."
```

```question
key: u01_l04_q03_match_connectives
type: match-pairs
prompt: "Match each symbolic form to its translation."
pairs:
  - left: "P and Q"
    right: "P is true and Q is true"
  - left: "P or Q"
    right: "At least one of P or Q is true"
  - left: "not P"
    right: "P is denied"
explanation: "Each connective tells how the parts combine."
hint: "Remember that or means at least one in this lesson."
questionGoal: "Connect symbolic forms to truth-condition language."
misconception: "Mixing up the meanings of not, and, and or."
```

```question
key: u01_l04_q04_compound_translation
type: multiple-choice
prompt: "Key: P = The bus arrives. Q = The doors open. Which sentence translates P and Q?"
choices:
  - "The bus arrives and the doors open."
  - "The bus arrives or the doors open."
  - "The bus does not arrive."
  - "If the bus arrives, the doors open."
correctAnswer: "The bus arrives and the doors open."
explanation: "`P and Q` joins the two whole claims with and."
hint: "Use both claims, and connect them with and."
questionGoal: "Translate a conjunction from a statement key."
misconception: "Changing the connective during translation."
```

```question
key: u01_l04_q05_truth_conditions_cloze
type: multi-blank-cloze
prompt: "Complete the connective rules."
parts:
  - "P and Q is true only when "
  - " parts are true. P or Q is true when "
  - " part is true."
blanks:
  - correctAnswer: "both"
    acceptedAnswers:
      - "both"
  - correctAnswer: "at least one"
    acceptedAnswers:
      - "at least one"
      - "one or both"
explanation: "And needs both parts; inclusive or needs at least one part."
hint: "And is stricter than inclusive or."
questionGoal: "Recall and compare conjunction and disjunction truth conditions."
misconception: "Treating and and or as having the same truth condition."
```

```question
key: u01_l04_q06_inclusive_or_context
type: passage-question
prompt: "Read the sign and answer."
passageTitle: "Club Sign"
passage: |
  To enter the maker room today, a student must have a safety badge or a teacher pass.
  Ava has both a safety badge and a teacher pass.
question: "Does Ava meet the 'badge or pass' condition in inclusive logic?"
choices:
  - "Yes, because inclusive or allows one or both."
  - "No, because or means exactly one."
  - "No, because both items cancel each other."
  - "Yes, but only if she gives one item away."
correctAnswer: "Yes, because inclusive or allows one or both."
explanation: "Inclusive or is true when at least one condition is met, including when both are met."
hint: "The lesson's or includes the both-true case."
questionGoal: "Apply inclusive or to an everyday condition."
misconception: "Excluding the both-true case from or."
```

## Unit 2: Conditionals, Truth Tables, And Validity

### Lesson 1: If Then And Its Parts

```question
key: u02_l01_q01_antecedent
type: multiple-choice
prompt: "In the conditional 'If the alarm rings, then the class lines up,' what is the antecedent?"
choices:
  - "the alarm rings"
  - "the class lines up"
  - "the class does not line up"
  - "the alarm is loud"
correctAnswer: "the alarm rings"
explanation: "The antecedent is the if part of a conditional."
hint: "Look for the part after if."
questionGoal: "Identify the antecedent in a simple conditional."
misconception: "Choosing the result or consequent as the antecedent."
```

```question
key: u02_l01_q02_consequent
type: fill-blank
prompt: "In 'If P, then Q,' Q is the ___."
sentenceBefore: "Q is the"
sentenceAfter: "."
choices:
  - "antecedent"
  - "consequent"
  - "converse"
  - "negation"
correctAnswer: "consequent"
explanation: "The consequent is the then part of the conditional."
hint: "The consequent comes after then."
questionGoal: "Recall the role of Q in if P then Q."
misconception: "Reversing antecedent and consequent labels."
```

```question
key: u02_l01_q03_symbolic_form
type: multiple-choice
prompt: "Key: P = The password is correct. Q = The page opens. Which symbolic form matches 'If the password is correct, then the page opens'?"
choices:
  - "P -> Q"
  - "Q -> P"
  - "P and Q"
  - "not P"
correctAnswer: "P -> Q"
explanation: "The if part is P and the then part is Q, so the form is P -> Q."
hint: "Put the if part before the arrow."
questionGoal: "Translate a direct conditional into symbolic form."
misconception: "Swapping the condition and result."
```

```question
key: u02_l01_q04_match_parts
type: match-pairs
prompt: "Match each term to its role."
pairs:
  - left: "Antecedent"
    right: "The if part"
  - left: "Consequent"
    right: "The then part"
  - left: "Conditional"
    right: "An if-then statement"
  - left: "Arrow form"
    right: "P -> Q"
explanation: "These labels describe the structure of an if-then claim."
hint: "Antecedent begins the condition; consequent follows."
questionGoal: "Connect conditional vocabulary to definitions."
misconception: "Treating conditional terms as interchangeable."
```

```question
key: u02_l01_q05_order_conditional
type: order-items
prompt: "Put the parts of a direct conditional translation in order."
items:
  - "Write the consequent after the arrow"
  - "Find the if part"
  - "Write the antecedent before the arrow"
  - "Find the then part"
correctOrder:
  - "Find the if part"
  - "Write the antecedent before the arrow"
  - "Find the then part"
  - "Write the consequent after the arrow"
explanation: "The if part becomes the antecedent before the arrow; the then part comes after."
hint: "Translate the if part before the then part."
questionGoal: "Sequence the process for translating a conditional."
misconception: "Relying on topic order without identifying roles."
```

```question
key: u02_l01_q06_not_proof_p
type: multiple-choice
prompt: "A rule says, 'If the light is green, then the door is unlocked.' Which statement is correct?"
choices:
  - "The rule does not tell us that the light is green right now."
  - "The rule proves the light is green."
  - "The rule proves the door is locked."
  - "The rule is not a conditional."
correctAnswer: "The rule does not tell us that the light is green right now."
explanation: "A conditional states a relationship. It does not by itself say the antecedent happened."
hint: "A rule can be true even when its if part is not happening right now."
questionGoal: "Avoid reading a conditional as proof of the antecedent."
misconception: "Thinking an if-then statement asserts that the if part is true."
```

### Lesson 2: The Converse Trap

```question
key: u02_l02_q01_converse_form
type: multiple-choice
prompt: "What is the converse of 'If P, then Q'?"
choices:
  - "If Q, then P"
  - "If not P, then not Q"
  - "P and Q"
  - "not P"
correctAnswer: "If Q, then P"
explanation: "The converse switches the antecedent and consequent."
hint: "The converse reverses the direction."
questionGoal: "Identify the general form of a converse."
misconception: "Confusing converse with negation or inverse-like statements."
```

```question
key: u02_l02_q02_square_rectangle
type: passage-question
prompt: "Read the rule and answer."
passageTitle: "Shape Rule"
passage: |
  Rule: If a shape is a square, then it is a rectangle.
question: "Which sentence is the converse?"
choices:
  - "If a shape is a rectangle, then it is a square."
  - "If a shape is a square, then it is not a rectangle."
  - "A square is a kind of rectangle."
  - "If a shape is not a square, then it is not a rectangle."
correctAnswer: "If a shape is a rectangle, then it is a square."
explanation: "The converse switches the if part and the then part."
hint: "Put rectangle in the if part and square in the then part."
questionGoal: "Identify a converse in a familiar category example."
misconception: "Choosing a negated statement instead of the reversed conditional."
```

```question
key: u02_l02_q03_converse_not_guaranteed
type: multiple-choice
prompt: "Rule: If a fruit is an apple, then it grows on a tree. Which example shows why the converse is not guaranteed?"
choices:
  - "A peach grows on a tree but is not an apple."
  - "An apple grows on a tree."
  - "Some apples are red."
  - "A carrot grows underground."
correctAnswer: "A peach grows on a tree but is not an apple."
explanation: "The converse would say anything that grows on a tree is an apple, and the peach example shows that can fail."
hint: "Find something with the then part true but the if part false."
questionGoal: "Use a counterexample to reject an unsupported converse."
misconception: "Assuming a rule automatically works backward."
```

```question
key: u02_l02_q04_match_original_converse
type: match-pairs
prompt: "Match each original conditional to its converse."
pairs:
  - left: "If it is raining, then the ground is wet."
    right: "If the ground is wet, then it is raining."
  - left: "If the code is valid, then the door opens."
    right: "If the door opens, then the code is valid."
  - left: "If a number ends in 0, then it is even."
    right: "If a number is even, then it ends in 0."
explanation: "Each converse switches the if and then parts."
hint: "The same two claims appear, but in the opposite conditional order."
questionGoal: "Match conditionals with their converses."
misconception: "Changing more than the order when forming a converse."
```

```question
key: u02_l02_q05_order_converse_steps
type: order-items
prompt: "Put the steps for forming a converse in order."
items:
  - "Make the old then part the new if part"
  - "Find the if part"
  - "Make the old if part the new then part"
  - "Find the then part"
correctOrder:
  - "Find the if part"
  - "Find the then part"
  - "Make the old then part the new if part"
  - "Make the old if part the new then part"
explanation: "A converse is made by switching the two parts."
hint: "First identify both parts; then swap them."
questionGoal: "Sequence how to form a converse accurately."
misconception: "Negating or rewriting the claims instead of switching them."
```

```question
key: u02_l02_q06_converse_warning
type: fill-blank
prompt: "Complete the warning."
sentenceBefore: "A conditional and its converse are"
sentenceAfter: "."
choices:
  - "always the same claim"
  - "different claims"
  - "never propositions"
  - "both negations"
correctAnswer: "different claims"
explanation: "Switching antecedent and consequent changes the claim."
hint: "The square and rectangle example shows the two directions can differ."
questionGoal: "State why the converse trap matters."
misconception: "Treating a converse as automatically equivalent to the original."
```

### Lesson 3: Truth Tables For Connectives

```question
key: u02_l03_q01_not_row
type: fill-blank
prompt: "Complete the row: If P is false, then not P is ___."
sentenceBefore: "not P is"
sentenceAfter: "."
choices:
  - "true"
  - "false"
  - "both"
  - "unknown"
correctAnswer: "true"
explanation: "Negation flips the truth value."
hint: "False becomes true under not."
questionGoal: "Complete a truth row for negation."
misconception: "Failing to flip the value for not."
```

```question
key: u02_l03_q02_and_or_rows
type: multi-blank-cloze
prompt: "Complete the truth row when P is true and Q is false."
parts:
  - "P and Q is "
  - ". P or Q is "
  - "."
blanks:
  - correctAnswer: "false"
    acceptedAnswers:
      - "false"
  - correctAnswer: "true"
    acceptedAnswers:
      - "true"
explanation: "`And` needs both true, but inclusive `or` needs at least one true."
hint: "One false part breaks and; one true part is enough for inclusive or."
questionGoal: "Compare conjunction and disjunction in the same truth row."
misconception: "Applying the same rule to and and or."
```

```question
key: u02_l03_q03_conditional_false_case
type: multiple-choice
prompt: "When is 'if P then Q' false?"
choices:
  - "P is true and Q is false"
  - "P is true and Q is true"
  - "P is false and Q is true"
  - "P is false and Q is false"
correctAnswer: "P is true and Q is false"
explanation: "A conditional fails only when the if part happens but the then part does not."
hint: "Look for the promise-breaking row."
questionGoal: "Identify the false row for a conditional."
misconception: "Thinking every row with a false antecedent makes the conditional false."
```

```question
key: u02_l03_q04_match_connective_rules
type: match-pairs
prompt: "Match each form to its truth rule."
pairs:
  - left: "not P"
    right: "True when P is false"
  - left: "P and Q"
    right: "True when both parts are true"
  - left: "P or Q"
    right: "True when at least one part is true"
  - left: "P -> Q"
    right: "False only when P is true and Q is false"
explanation: "Truth tables apply these rules row by row."
hint: "Each connective has its own test."
questionGoal: "Recall truth rules for all basic connectives."
misconception: "Blending conditional, and, and or rules."
```

```question
key: u02_l03_q05_truth_table_row
type: passage-question
prompt: "Read the truth row and answer."
passageTitle: "One Truth Row"
passage: |
  P = true
  Q = true
question: "Which compound statement is false in this row?"
choices:
  - "not P"
  - "P and Q"
  - "P or Q"
  - "P -> Q"
correctAnswer: "not P"
explanation: "If P is true, then not P is false. The other listed statements are true in this row."
hint: "Start by flipping P for not P."
questionGoal: "Evaluate multiple connectives in a single truth row."
misconception: "Forgetting that not depends only on P."
```

```question
key: u02_l03_q06_table_purpose
type: multiple-choice
prompt: "What is a truth table mainly used for in this unit?"
choices:
  - "Checking possible truth-value cases for a statement form"
  - "Finding out what happened in the real world"
  - "Making a statement sound more official"
  - "Replacing every sentence with a number"
correctAnswer: "Checking possible truth-value cases for a statement form"
explanation: "A truth table tests logical form across possible true/false rows."
hint: "Truth tables test structure, not real-world reporting."
questionGoal: "State the purpose of truth tables."
misconception: "Treating a truth table as a real-world fact checker."
```

### Lesson 4: Valid Or Invalid By Truth Table

```question
key: u02_l04_q01_counterexample_row
type: multiple-choice
prompt: "Which truth-table row shows that an argument form is invalid?"
choices:
  - "All premises true and the conclusion false"
  - "All premises true and the conclusion true"
  - "One premise false and the conclusion false"
  - "All statements false"
correctAnswer: "All premises true and the conclusion false"
explanation: "That row is a counterexample to the claim that the conclusion must follow."
hint: "Invalidity needs true premises with a false conclusion."
questionGoal: "Identify the row that disproves validity."
misconception: "Thinking any false row makes an argument invalid."
```

```question
key: u02_l04_q02_validity_rule
type: fill-blank
prompt: "Complete the validity rule."
sentenceBefore: "A valid argument has no row where the premises are true and the conclusion is"
sentenceAfter: "."
choices:
  - "false"
  - "true"
  - "a question"
  - "a premise"
correctAnswer: "false"
explanation: "Validity means the conclusion cannot be false when the premises are true."
hint: "Look for the conclusion value that would break the argument."
questionGoal: "Recall the truth-table criterion for validity."
misconception: "Defining validity as having a believable conclusion."
```

```question
key: u02_l04_q03_marked_row
type: passage-question
prompt: "Read the row and answer."
passageTitle: "Argument Row"
passage: |
  Premise 1: true
  Premise 2: true
  Conclusion: false
question: "What does this row show?"
choices:
  - "The argument form is invalid."
  - "The argument form is automatically sound."
  - "The conclusion is true in every row."
  - "The premises are not propositions."
correctAnswer: "The argument form is invalid."
explanation: "True premises with a false conclusion show that the conclusion does not have to follow."
hint: "This is the exact counterexample row."
questionGoal: "Interpret a marked truth-table counterexample."
misconception: "Ignoring the combination of premise and conclusion values."
```

```question
key: u02_l04_q04_match_evidence
type: match-pairs
prompt: "Match each row description to what it can show."
pairs:
  - left: "Premises true, conclusion false"
    right: "Invalid form"
  - left: "Premises true, conclusion true"
    right: "One successful row"
  - left: "Premise false, conclusion false"
    right: "Not enough to show invalidity"
  - left: "No true-premise false-conclusion row"
    right: "Valid form"
explanation: "Only the true-premise false-conclusion row breaks validity."
hint: "Validity focuses on whether the conclusion can be false while the premises are true."
questionGoal: "Connect truth-table evidence to validity judgments."
misconception: "Using rows with false premises as counterexamples to validity."
```

```question
key: u02_l04_q05_order_validity_check
type: order-items
prompt: "Put the truth-table validity check in order."
items:
  - "Check whether the conclusion is false in that row"
  - "Look for rows where all premises are true"
  - "Call the form invalid if such a row exists"
  - "Read the premises and conclusion"
correctOrder:
  - "Read the premises and conclusion"
  - "Look for rows where all premises are true"
  - "Check whether the conclusion is false in that row"
  - "Call the form invalid if such a row exists"
explanation: "Validity checks whether true premises can go with a false conclusion."
hint: "First know what the premises and conclusion are."
questionGoal: "Sequence a truth-table validity routine."
misconception: "Checking the conclusion before finding true-premise rows."
```

```question
key: u02_l04_q06_believable_not_valid
type: multiple-choice
prompt: "Why is 'the conclusion sounds true' not enough to prove an argument form is valid?"
choices:
  - "Validity asks whether the conclusion must follow from the premises."
  - "True-sounding conclusions are never propositions."
  - "Only false conclusions can be valid."
  - "Validity depends on how long the argument is."
correctAnswer: "Validity asks whether the conclusion must follow from the premises."
explanation: "A conclusion can sound true even when the premises do not force it."
hint: "Validity is about support structure, not whether you like the conclusion."
questionGoal: "Separate validity from conclusion believability."
misconception: "Judging logical validity by topic plausibility."
```

## Unit 3: Deductive, Inductive, And Abductive Reasoning

### Lesson 1: Deduction And Must-Follow Support

```question
key: u03_l01_q01_must_follow
type: passage-question
prompt: "Read the argument and answer."
passageTitle: "Badge Rule"
passage: |
  All students with a lab badge may enter the lab.
  Lina has a lab badge.
question: "Which conclusion must follow if the premises are true?"
choices:
  - "Lina may enter the lab."
  - "Lina owns the lab."
  - "Everyone in the lab is Lina's friend."
  - "Lina does not need a badge."
correctAnswer: "Lina may enter the lab."
explanation: "The rule applies to all students with a lab badge, and Lina has one."
hint: "Use only what the premises say must be true."
questionGoal: "Identify a deductive conclusion that follows from two premises."
misconception: "Adding extra facts beyond the premises."
```

```question
key: u03_l01_q02_deduction_question
type: multiple-choice
prompt: "Which question best tests deductive support?"
choices:
  - "Could the premises be true while the conclusion is false?"
  - "Is the conclusion interesting?"
  - "Did the speaker use a graph?"
  - "How many people agree with the conclusion?"
correctAnswer: "Could the premises be true while the conclusion is false?"
explanation: "Deduction asks whether the conclusion must follow from the premises."
hint: "Deduction is about must-follow support."
questionGoal: "Recall the central test for deductive validity."
misconception: "Testing deduction by popularity, topic, or presentation."
```

```question
key: u03_l01_q03_match_deductive_terms
type: match-pairs
prompt: "Match each term to its meaning in deductive reasoning."
pairs:
  - left: "Premise"
    right: "A supporting statement"
  - left: "Conclusion"
    right: "The claim being supported"
  - left: "Valid"
    right: "The conclusion must follow if premises are true"
  - left: "Counterexample"
    right: "A case with true premises and false conclusion"
explanation: "These terms help judge must-follow support."
hint: "Validity is about the relationship between support and conclusion."
questionGoal: "Connect deductive vocabulary to meanings."
misconception: "Treating validity, truth, and counterexample as the same idea."
```

```question
key: u03_l01_q04_counterexample_possible
type: multiple-choice
prompt: "Argument: Some team members play chess. Nora is a team member. Therefore, Nora plays chess. Which statement is true?"
choices:
  - "The conclusion does not have to follow; Nora could be a team member who does not play chess."
  - "The conclusion must follow because Nora is on the team."
  - "The argument is valid because chess is mentioned."
  - "The premises are not propositions."
correctAnswer: "The conclusion does not have to follow; Nora could be a team member who does not play chess."
explanation: "'Some team members' does not mean every team member."
hint: "Look for a possible case where the premises are true and the conclusion is false."
questionGoal: "Recognize when a deductive conclusion is not forced."
misconception: "Treating some as all."
```

```question
key: u03_l01_q05_reasoning_steps
type: order-items
prompt: "Put the deductive validity check in order."
items:
  - "Ask whether a counterexample is possible"
  - "Find the conclusion"
  - "Find the premises"
  - "Decide whether the conclusion must follow"
correctOrder:
  - "Find the premises"
  - "Find the conclusion"
  - "Ask whether a counterexample is possible"
  - "Decide whether the conclusion must follow"
explanation: "Deductive checking starts with the argument parts and then tests whether a counterexample can exist."
hint: "You need to know what is being supported before testing it."
questionGoal: "Sequence a deductive validity routine."
misconception: "Jumping to a verdict before identifying premises and conclusion."
```

```question
key: u03_l01_q06_truth_vs_validity
type: multiple-choice
prompt: "A conclusion is true in real life, but it does not follow from the listed premises. What should you say about the deductive support?"
choices:
  - "The argument is not deductively valid from those premises."
  - "The argument is valid because the conclusion is true."
  - "The premises are automatically false."
  - "The argument is abductive, so no test is needed."
correctAnswer: "The argument is not deductively valid from those premises."
explanation: "Deductive validity depends on whether the premises force the conclusion, not whether the conclusion happens to be true."
hint: "Ask whether the support does the work."
questionGoal: "Separate true conclusions from valid support."
misconception: "Treating factual truth as proof of deductive validity."
```

### Lesson 2: Induction And Strong Patterns

```question
key: u03_l02_q01_induction_definition
type: multiple-choice
prompt: "Which description best fits inductive reasoning?"
choices:
  - "Using observations or patterns to support a likely conclusion"
  - "Showing a conclusion must follow in every possible case"
  - "Choosing the first explanation that comes to mind"
  - "Denying a whole proposition"
correctAnswer: "Using observations or patterns to support a likely conclusion"
explanation: "Induction supports likely conclusions, but it does not guarantee them."
hint: "Induction often uses evidence from examples or patterns."
questionGoal: "Identify the core meaning of inductive reasoning."
misconception: "Confusing induction with deduction or unsupported guessing."
```

```question
key: u03_l02_q02_stronger_evidence
type: multiple-choice
prompt: "Which evidence gives stronger inductive support for the claim 'Most students at the school prefer morning clubs'?"
choices:
  - "A survey of 300 students chosen from every grade"
  - "A survey of 4 students in one morning club"
  - "One teacher's guess"
  - "A poster that says morning clubs are fun"
correctAnswer: "A survey of 300 students chosen from every grade"
explanation: "A larger, more representative sample gives stronger inductive support."
hint: "Look for evidence that includes more of the group the claim is about."
questionGoal: "Choose stronger evidence for an inductive generalization."
misconception: "Treating any example or opinion as equally strong evidence."
```

```question
key: u03_l02_q03_match_evidence_strength
type: match-pairs
prompt: "Match each evidence set to the best label."
pairs:
  - left: "One example from a friend"
    right: "Very weak pattern evidence"
  - left: "Many examples from several groups"
    right: "Stronger pattern evidence"
  - left: "A conclusion with no observations"
    right: "Unsupported claim"
  - left: "A broad claim from one small club"
    right: "Overgeneralized evidence"
explanation: "Inductive strength depends on the quality and fit of the evidence."
hint: "Ask how much the evidence represents the claim."
questionGoal: "Relate evidence quality to inductive strength."
misconception: "Ignoring sample size and representativeness."
```

```question
key: u03_l02_q04_likely_not_certain
type: passage-question
prompt: "Read the evidence and answer."
passageTitle: "Plant Trial"
passage: |
  In five classroom trials, bean plants near the window grew taller than bean plants in the closet.
question: "Which conclusion best matches the inductive evidence?"
choices:
  - "Light likely helped the bean plants grow taller in these trials."
  - "Light always makes every plant grow taller."
  - "Closets destroy all plants."
  - "The trials prove every future bean plant result."
correctAnswer: "Light likely helped the bean plants grow taller in these trials."
explanation: "The evidence supports a likely conclusion about these trials, not an unlimited guarantee."
hint: "Choose the conclusion that keeps the right level of confidence."
questionGoal: "Choose a careful inductive conclusion from observations."
misconception: "Turning repeated observations into an overbroad certainty claim."
```

```question
key: u03_l02_q05_induction_cloze
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "Inductive reasoning can be strong, but it usually does not"
sentenceAfter: "the conclusion."
choices:
  - "guarantee"
  - "mention"
  - "translate"
  - "negate"
correctAnswer: "guarantee"
explanation: "Induction supports likely conclusions rather than guaranteed conclusions."
hint: "Deduction aims at must-follow support; induction does not."
questionGoal: "Recall the limit of inductive support."
misconception: "Expecting induction to provide deductive certainty."
```

```question
key: u03_l02_q06_revise_overclaim
type: multiple-choice
prompt: "Evidence: Seven of ten students in one art class chose blue paint. Which claim is most careful?"
choices:
  - "In this art class, blue was chosen most often."
  - "All students everywhere prefer blue."
  - "Blue is always the best color."
  - "No one likes any other color."
correctAnswer: "In this art class, blue was chosen most often."
explanation: "The evidence is about one class, so the careful claim stays within that scope."
hint: "Do not make the claim broader than the evidence."
questionGoal: "Revise an inductive conclusion to match the evidence scope."
misconception: "Overgeneralizing from a small local pattern."
```

### Lesson 3: Abduction And Best Explanations

```question
key: u03_l03_q01_abduction_definition
type: multiple-choice
prompt: "Which question best fits abductive reasoning?"
choices:
  - "Which explanation best fits the evidence?"
  - "Can the premises be true and the conclusion false?"
  - "How many examples are in the sample?"
  - "Which sentence is a command?"
correctAnswer: "Which explanation best fits the evidence?"
explanation: "Abduction looks for the best current explanation of clues or evidence."
hint: "Abduction is best-explanation reasoning."
questionGoal: "Identify the evaluation question for abduction."
misconception: "Using deductive or inductive tests for every argument."
```

```question
key: u03_l03_q02_best_explanation
type: passage-question
prompt: "Read the clues and answer."
passageTitle: "Wet Hallway"
passage: |
  The hallway floor is wet near the door.
  Several umbrellas are dripping in the rack.
  Students just came in from outside.
question: "Which explanation best fits all the clues?"
choices:
  - "Rainwater dripped from the umbrellas."
  - "A science experiment exploded in another room."
  - "The hallway was painted blue."
  - "The floor is not actually wet."
correctAnswer: "Rainwater dripped from the umbrellas."
explanation: "That explanation fits the wet floor, umbrellas, and students coming from outside."
hint: "Choose the explanation that accounts for all listed clues."
questionGoal: "Choose the best explanation in an abductive scenario."
misconception: "Choosing a dramatic or unrelated explanation over the one that fits the evidence."
```

```question
key: u03_l03_q03_match_clues
type: match-pairs
prompt: "Match each clue to the explanation it most directly supports."
pairs:
  - left: "Fresh crumbs on the desk"
    right: "Someone ate a snack there"
  - left: "A book returned with a library stamp"
    right: "The book was checked in"
  - left: "A muddy shoe print by the door"
    right: "Someone stepped in mud before entering"
  - left: "A low battery warning"
    right: "The device needs charging"
explanation: "Abductive reasoning connects clues to explanations that fit them."
hint: "Pick the explanation that accounts for the clue without adding too much."
questionGoal: "Connect evidence clues to plausible explanations."
misconception: "Pairing clues with explanations that do not account for them."
```

```question
key: u03_l03_q04_alternative_possible
type: multiple-choice
prompt: "A good abductive explanation is useful, but why should we stay open to alternatives?"
choices:
  - "New evidence might fit a different explanation better."
  - "Explanations can never be compared."
  - "The first explanation is always false."
  - "Alternatives make evidence disappear."
correctAnswer: "New evidence might fit a different explanation better."
explanation: "Abductive conclusions are revisable when better evidence appears."
hint: "Best current explanation does not mean final proof."
questionGoal: "Recognize that abductive reasoning remains revisable."
misconception: "Treating best explanation as guaranteed truth."
```

```question
key: u03_l03_q05_abduction_cloze
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "Abductive reasoning chooses the"
sentenceAfter: "explanation for the available evidence."
choices:
  - "best fitting"
  - "first suggested"
  - "most dramatic"
  - "easiest to imagine"
correctAnswer: "best fitting"
explanation: "The explanation should fit the available clues better than the alternatives."
hint: "Think about the explanation that accounts for the evidence."
questionGoal: "Recall the core standard for abductive explanation."
misconception: "Using confidence, length, or drama as the standard."
```

```question
key: u03_l03_q06_not_enough_clues
type: multiple-choice
prompt: "You see one clue: a classroom window is open. Which conclusion is most careful?"
choices:
  - "Someone may have opened it, but more evidence is needed."
  - "The principal definitely opened it."
  - "A storm definitely broke it."
  - "No explanation is possible because there is one clue."
correctAnswer: "Someone may have opened it, but more evidence is needed."
explanation: "One clue may suggest explanations, but it does not prove a specific one."
hint: "Choose the answer that stays open to more evidence."
questionGoal: "Avoid overclaiming from limited abductive evidence."
misconception: "Jumping from one clue to a definite explanation."
```

### Lesson 4: Choosing The Right Support Test

```question
key: u03_l04_q01_match_type_test
type: match-pairs
prompt: "Match each reasoning type to its best test question."
pairs:
  - left: "Deductive"
    right: "Must the conclusion follow?"
  - left: "Inductive"
    right: "How strong is the pattern or evidence?"
  - left: "Abductive"
    right: "What best explains the evidence?"
explanation: "Each support type uses a different evaluation question."
hint: "Must, likely, and best explanation are the three signals."
questionGoal: "Match reasoning types to evaluation tests."
misconception: "Using one support test for all reasoning."
```

```question
key: u03_l04_q02_classify_support
type: passage-question
prompt: "Read the argument and answer."
passageTitle: "Bus Pattern"
passage: |
  The bus has arrived before 8:00 on nine of the last ten school days.
  It will probably arrive before 8:00 tomorrow.
question: "Which type of reasoning is this?"
choices:
  - "Inductive"
  - "Deductive"
  - "Abductive"
  - "Negation"
correctAnswer: "Inductive"
explanation: "The argument uses a pattern to support a likely prediction."
hint: "A pattern from past examples supports a likely conclusion."
questionGoal: "Classify a pattern-based prediction as inductive."
misconception: "Calling any confident prediction deductive."
```

```question
key: u03_l04_q03_revise_strength
type: multiple-choice
prompt: "Evidence: The team won the first three games. Which conclusion best matches the support?"
choices:
  - "The team has started strongly and may keep doing well."
  - "The team is guaranteed to win every game."
  - "The team won because of one secret cause."
  - "The team cannot lose."
correctAnswer: "The team has started strongly and may keep doing well."
explanation: "Three wins support a positive prediction, not a guarantee or proven cause."
hint: "Use likely language, not certain language."
questionGoal: "Revise an overstrong conclusion to match inductive support."
misconception: "Turning a short pattern into certainty."
```

```question
key: u03_l04_q04_best_test_for_explanation
type: multiple-choice
prompt: "A student says, 'The plants wilted because they did not get enough water.' Which support test fits best?"
choices:
  - "Does this explanation fit the evidence better than alternatives?"
  - "Does the conclusion have to follow from two premises?"
  - "How large and representative is the sample?"
  - "Which symbol stands for the whole claim?"
correctAnswer: "Does this explanation fit the evidence better than alternatives?"
explanation: "The claim offers an explanation, so abductive testing fits best."
hint: "Cause explanations often need comparison with alternatives."
questionGoal: "Choose an abductive support test for an explanatory claim."
misconception: "Applying a formal validity test when the argument is explanatory."
```

```question
key: u03_l04_q05_support_type_cloze
type: multi-blank-cloze
prompt: "Complete the support summary."
parts:
  - "Deduction aims for "
  - ". Induction supports what is "
  - ". Abduction chooses the best "
  - "."
blanks:
  - correctAnswer: "certainty"
    acceptedAnswers:
      - "certainty"
      - "guarantee"
  - correctAnswer: "likely"
    acceptedAnswers:
      - "likely"
      - "probable"
  - correctAnswer: "explanation"
    acceptedAnswers:
      - "explanation"
explanation: "The three support types differ in what kind of support they offer."
hint: "Think: must follow, likely pattern, best explanation."
questionGoal: "Summarize the distinct goals of three reasoning types."
misconception: "Blurring certainty, likelihood, and explanation."
```

```question
key: u03_l04_q06_mixed_passage
type: passage-question
prompt: "Read the claim and answer."
passageTitle: "Locker Clue"
passage: |
  The hallway camera shows Jamal near locker 12 at 8:05.
  Locker 12 was found open at 8:10.
  A student says, "Jamal must have opened it."
question: "What is the best critique?"
choices:
  - "The evidence may suggest a possibility, but it does not guarantee Jamal opened the locker."
  - "The evidence proves Jamal opened every locker."
  - "The claim is a valid deduction."
  - "No explanation can be considered."
correctAnswer: "The evidence may suggest a possibility, but it does not guarantee Jamal opened the locker."
explanation: "The evidence is not enough to force the conclusion; other explanations are possible."
hint: "Ask whether the support is guaranteed or only suggestive."
questionGoal: "Apply support-type caution to a short explanatory claim."
misconception: "Treating suggestive evidence as deductive proof."
```

## Unit 4: Data, Probability, And Cause Claims

### Lesson 1: Samples And Scope

```question
key: u04_l01_q01_sample_scope
type: passage-question
prompt: "Read the survey and answer."
passageTitle: "Lunch Survey"
passage: |
  Ten students from the chess club were asked which lunch they prefer.
  Seven chose tacos.
question: "Which claim best matches the sample?"
choices:
  - "Most students surveyed from the chess club chose tacos."
  - "Most students in the whole school prefer tacos."
  - "All students prefer tacos."
  - "No one likes any lunch except tacos."
correctAnswer: "Most students surveyed from the chess club chose tacos."
explanation: "The sample is only ten chess club students, so the claim should stay within that scope."
hint: "Ask who was actually surveyed."
questionGoal: "Choose a claim whose scope matches the sample."
misconception: "Generalizing from a narrow sample to a broad population."
```

```question
key: u04_l01_q02_match_sample_population
type: match-pairs
prompt: "Match each sample to the fairest population claim."
pairs:
  - left: "25 fourth graders in one school"
    right: "Those fourth graders"
  - left: "500 voters from every region of a city"
    right: "City voters"
  - left: "12 members of the drama club"
    right: "Drama club members"
  - left: "8 people in one family"
    right: "That family"
explanation: "A fair claim stays close to the group the sample represents."
hint: "Bigger and more varied samples can support broader claims."
questionGoal: "Relate sample source to reasonable population scope."
misconception: "Assuming every sample supports a claim about everyone."
```

```question
key: u04_l01_q03_representative
type: multiple-choice
prompt: "Which sample would best support a claim about all students at a school?"
choices:
  - "Students chosen from different grades, clubs, and schedules"
  - "Only students on one basketball team"
  - "Only students who arrived early today"
  - "One student who likes surveys"
correctAnswer: "Students chosen from different grades, clubs, and schedules"
explanation: "A more representative sample includes different parts of the group the claim is about."
hint: "Look for the sample that resembles the whole school."
questionGoal: "Identify a more representative sample."
misconception: "Treating convenience samples as representative."
```

```question
key: u04_l01_q04_scope_cloze
type: fill-blank
prompt: "Complete the rule."
sentenceBefore: "A careful data claim should match the"
sentenceAfter: "of the sample."
choices:
  - "scope"
  - "color"
  - "volume"
  - "rhyme"
correctAnswer: "scope"
explanation: "Scope means the group or range the evidence can reasonably speak about."
hint: "The claim should not reach farther than the evidence."
questionGoal: "Recall the scope principle for samples."
misconception: "Ignoring the boundary of what a sample can show."
```

```question
key: u04_l01_q05_biased_sample
type: multiple-choice
prompt: "A survey about favorite sports is given only to students leaving soccer practice. What is the main concern?"
choices:
  - "The sample may be biased toward soccer players."
  - "The survey has too many grades."
  - "Sports cannot be surveyed."
  - "Every answer must be false."
correctAnswer: "The sample may be biased toward soccer players."
explanation: "Students leaving soccer practice may not represent all students' sports preferences."
hint: "Ask who was easiest to ask and who was left out."
questionGoal: "Identify a likely sample bias."
misconception: "Ignoring how the sample was selected."
```

```question
key: u04_l01_q06_order_data_claim
type: order-items
prompt: "Put the steps for checking a sample claim in order."
items:
  - "Compare the claim's scope to the sample"
  - "Identify who was sampled"
  - "Decide whether the claim is careful or too broad"
  - "Read the conclusion"
correctOrder:
  - "Read the conclusion"
  - "Identify who was sampled"
  - "Compare the claim's scope to the sample"
  - "Decide whether the claim is careful or too broad"
explanation: "Sample checking asks whether the evidence matches the claim's reach."
hint: "You need both the conclusion and the sample before judging."
questionGoal: "Sequence a scope check for data claims."
misconception: "Judging a survey claim before identifying the sampled group."
```

### Lesson 2: Graphs, Trends, And Scale

```question
key: u04_l02_q01_supported_trend
type: passage-question
prompt: "Read the graph description and answer."
passageTitle: "Reading Minutes"
passage: |
  A line graph shows average reading minutes:
  Monday: 18
  Tuesday: 20
  Wednesday: 21
  Thursday: 23
question: "Which claim is supported?"
choices:
  - "Average reading minutes increased during these four days."
  - "Every student read more each day."
  - "Reading minutes will increase forever."
  - "The graph proves why reading increased."
correctAnswer: "Average reading minutes increased during these four days."
explanation: "The data show an upward trend for the average over those days, not every student or every future day."
hint: "Stay with what the graph description actually reports."
questionGoal: "Choose a graph claim that fits the described trend."
misconception: "Overclaiming from a simple trend."
```

```question
key: u04_l02_q02_scale_effect
type: multiple-choice
prompt: "A bar graph starts its vertical scale at 90 instead of 0, making a change from 96 to 98 look huge. What should a careful reader check?"
choices:
  - "The scale and actual numbers"
  - "Only the tallest bar's color"
  - "Whether the caption sounds excited"
  - "The order of the alphabet"
correctAnswer: "The scale and actual numbers"
explanation: "A shortened scale can make a small difference look larger than it is."
hint: "Look at the axis labels, not only bar height."
questionGoal: "Notice how graph scale can affect interpretation."
misconception: "Judging graph size by visual height alone."
```

```question
key: u04_l02_q03_match_graph_terms
type: match-pairs
prompt: "Match each graph term to its role."
pairs:
  - left: "Scale"
    right: "The number intervals on an axis"
  - left: "Trend"
    right: "A pattern of increase, decrease, or change"
  - left: "Label"
    right: "Text that tells what data are shown"
  - left: "Caption"
    right: "A sentence describing or interpreting the graph"
explanation: "Checking these parts helps avoid accepting an overclaim."
hint: "Scale is about number spacing; trend is about pattern."
questionGoal: "Connect graph vocabulary to reading tasks."
misconception: "Treating captions and data as the same thing."
```

```question
key: u04_l02_q04_caption_check
type: passage-question
prompt: "Read the graph description and answer."
passageTitle: "Snack Sales"
passage: |
  A bar graph shows snack sales:
  Apples: 48
  Granola bars: 50
  Crackers: 49
  Caption: Granola bars are wildly more popular than every other snack.
question: "What is the best evaluation?"
choices:
  - "The caption overstates a small difference."
  - "The data prove granola bars are wildly more popular."
  - "The graph has no data."
  - "Apples and crackers were not sold."
correctAnswer: "The caption overstates a small difference."
explanation: "Granola bars are only slightly higher than the other snacks."
hint: "Compare the actual numbers, not just the caption's wording."
questionGoal: "Evaluate whether a graph caption overclaims."
misconception: "Accepting a strong caption without checking data."
```

```question
key: u04_l02_q05_trend_cloze
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "A trend is a"
sentenceAfter: "in data over categories or time."
choices:
  - "pattern"
  - "guarantee"
  - "command"
  - "converse"
correctAnswer: "pattern"
explanation: "A trend is a pattern such as increasing, decreasing, or staying about the same."
hint: "Trend describes what the data are doing."
questionGoal: "Recall the meaning of trend."
misconception: "Treating trend as a guarantee or cause."
```

```question
key: u04_l02_q06_graph_check_order
type: order-items
prompt: "Put the graph-reading checks in a useful order."
items:
  - "Compare the claim with the actual data"
  - "Read the labels and scale"
  - "Notice the pattern or trend"
  - "Read the claim or caption"
correctOrder:
  - "Read the claim or caption"
  - "Read the labels and scale"
  - "Notice the pattern or trend"
  - "Compare the claim with the actual data"
explanation: "A careful reader checks the graph before accepting the claim."
hint: "Do not judge the caption before checking labels, scale, and pattern."
questionGoal: "Sequence a graph-evidence check."
misconception: "Trusting visual impression before reading scale and data."
```

### Lesson 3: Probability Words And Careful Predictions

```question
key: u04_l03_q01_match_probability_words
type: match-pairs
prompt: "Match each probability word to its meaning."
pairs:
  - left: "Certain"
    right: "Must happen"
  - left: "Impossible"
    right: "Cannot happen"
  - left: "Likely"
    right: "Expected but not guaranteed"
  - left: "Possible"
    right: "Can happen"
explanation: "Probability words describe different levels of likelihood."
hint: "Likely is weaker than certain."
questionGoal: "Connect probability vocabulary to meanings."
misconception: "Treating likely, possible, and certain as interchangeable."
```

```question
key: u04_l03_q02_likely_not_certain
type: multiple-choice
prompt: "A weather report says rain is likely tomorrow. Which interpretation is most careful?"
choices:
  - "Rain is expected, but it is not guaranteed."
  - "Rain is impossible."
  - "Rain must happen."
  - "The report is not a claim."
correctAnswer: "Rain is expected, but it is not guaranteed."
explanation: "Likely means more expected than not, but not certain."
hint: "Likely is not the same as certain."
questionGoal: "Interpret likely as non-guaranteed probability language."
misconception: "Reading likely as must happen."
```

```question
key: u04_l03_q03_impossible_case
type: multiple-choice
prompt: "A bag contains only red blocks and blue blocks. Which outcome is impossible?"
choices:
  - "Drawing a green block"
  - "Drawing a red block"
  - "Drawing a blue block"
  - "Drawing a block"
correctAnswer: "Drawing a green block"
explanation: "A green block cannot be drawn if the bag has only red and blue blocks."
hint: "Impossible means it cannot happen under the given conditions."
questionGoal: "Apply impossible to a simple chance scenario."
misconception: "Confusing unlikely with impossible."
```

```question
key: u04_l03_q04_possible_vs_likely
type: passage-question
prompt: "Read the chance setup and answer."
passageTitle: "Spinner"
passage: |
  A spinner has 8 equal spaces.
  7 spaces are yellow.
  1 space is purple.
question: "Which statement is most accurate?"
choices:
  - "Purple is possible, but yellow is more likely."
  - "Purple is impossible."
  - "Yellow is guaranteed."
  - "Purple and yellow are equally likely."
correctAnswer: "Purple is possible, but yellow is more likely."
explanation: "Purple can happen because it has a space, but yellow has more spaces."
hint: "Possible means can happen; likely compares how expected it is."
questionGoal: "Distinguish possible from likely in a simple probability model."
misconception: "Treating a less likely outcome as impossible."
```

```question
key: u04_l03_q05_prediction_cloze
type: fill-blank
prompt: "Complete the careful prediction."
sentenceBefore: "A likely event can still"
sentenceAfter: "to happen once."
choices:
  - "fail"
  - "promise"
  - "need"
  - "prove"
correctAnswer: "fail"
explanation: "Likely events are not guaranteed in a single trial."
hint: "Likely is strong, but not certain."
questionGoal: "Recall that likelihood does not guarantee one outcome."
misconception: "Thinking a likely prediction is wrong if it fails once."
```

```question
key: u04_l03_q06_certain_or_not
type: multiple-choice
prompt: "A box has 5 cards, and every card is labeled A. What is certain if one card is drawn?"
choices:
  - "The card will be labeled A."
  - "The card will be labeled B."
  - "No card will be drawn."
  - "The card will be purple."
correctAnswer: "The card will be labeled A."
explanation: "If every card has A, then drawing an A is certain."
hint: "Certain means it must happen under the setup."
questionGoal: "Identify a certain outcome from a simple setup."
misconception: "Avoiding certainty even when the conditions guarantee it."
```

### Lesson 4: Correlation, Cause, And Overclaim

```question
key: u04_l04_q01_correlation_definition
type: multiple-choice
prompt: "What does correlation mean?"
choices:
  - "Two things are related in the data."
  - "One thing has been proven to cause the other."
  - "A claim is deductively valid."
  - "A sample represents everyone."
correctAnswer: "Two things are related in the data."
explanation: "Correlation shows a relationship or pattern, not proof of cause by itself."
hint: "Correlation is weaker than proven causation."
questionGoal: "Define correlation without overclaiming causation."
misconception: "Equating correlation with cause."
```

```question
key: u04_l04_q02_careful_cause_claim
type: passage-question
prompt: "Read the study summary and answer."
passageTitle: "Screen Time Study"
passage: |
  In one class, students who slept less also reported more screen time.
  The survey did not test whether screen time caused less sleep.
question: "Which conclusion is most careful?"
choices:
  - "In this class, more screen time was related to less sleep."
  - "Screen time definitely caused less sleep for every student."
  - "Less sleep definitely caused screen time."
  - "The survey proves no relationship exists."
correctAnswer: "In this class, more screen time was related to less sleep."
explanation: "The data show a relationship in one class, not a tested cause."
hint: "Use correlation language and keep the scope limited."
questionGoal: "Choose a correlation conclusion instead of a causal overclaim."
misconception: "Turning a relationship into proven causation."
```

```question
key: u04_l04_q03_match_claim_type
type: match-pairs
prompt: "Match each claim to its type."
pairs:
  - left: "Students with more practice tended to score higher."
    right: "Correlation claim"
  - left: "Extra practice caused the higher scores in this experiment."
    right: "Causal claim"
  - left: "The survey asked 20 students in one class."
    right: "Sample description"
  - left: "The conclusion says all students everywhere improved."
    right: "Overbroad claim"
explanation: "Different claim types need different kinds of evidence."
hint: "Cause language says one thing made another happen."
questionGoal: "Classify correlation, cause, sample, and overclaim language."
misconception: "Missing the difference between related-to and caused-by wording."
```

```question
key: u04_l04_q04_revise_overclaim
type: multiple-choice
prompt: "Students who ate breakfast scored higher, so breakfast definitely caused the higher scores. Which revision avoids claiming proven cause?"
choices:
  - "Students who ate breakfast scored higher, but this does not prove breakfast caused the higher scores."
  - "Students who ate breakfast scored higher, so breakfast definitely caused the higher scores."
  - "Students who skipped breakfast could never score higher."
  - "Breakfast was unrelated to scores because the study did not prove cause."
correctAnswer: "Students who ate breakfast scored higher, but this does not prove breakfast caused the higher scores."
explanation: "A correlation or pattern does not by itself prove causation."
hint: "Keep the pattern, but remove the definite cause claim."
questionGoal: "Revise a causal overclaim into a careful data claim."
misconception: "Using definite cause language from correlational evidence."
```

```question
key: u04_l04_q05_alternative_explanation
type: multiple-choice
prompt: "A study finds that students who carry umbrellas are more likely to have wet shoes. Which alternative explanation should a careful thinker consider?"
choices:
  - "Rain may cause both umbrella carrying and wet shoes."
  - "Umbrellas must cause wet shoes."
  - "Wet shoes prove there was no rain."
  - "Umbrellas are not related to weather."
correctAnswer: "Rain may cause both umbrella carrying and wet shoes."
explanation: "A third factor can explain a correlation between two things."
hint: "Ask whether something else could cause both patterns."
questionGoal: "Identify a plausible alternative explanation for a correlation."
misconception: "Assuming one correlated factor must cause the other."
```

```question
key: u04_l04_q06_overclaim_sequence
type: order-items
prompt: "Put the careful cause-check sequence in order."
items:
  - "Ask whether other explanations are possible"
  - "Notice the relationship in the data"
  - "Decide whether cause has been tested"
  - "State a careful conclusion"
correctOrder:
  - "Notice the relationship in the data"
  - "Ask whether other explanations are possible"
  - "Decide whether cause has been tested"
  - "State a careful conclusion"
explanation: "A cause claim needs more than a relationship; it needs evidence that tests alternatives."
hint: "Start with what the data show, then ask what they do not yet prove."
questionGoal: "Sequence a correlation-to-cause evaluation routine."
misconception: "Jumping directly from relationship to cause."
```

## Unit 5: Scientific Reasoning And Competing Explanations

### Lesson 1: Hypotheses, Evidence, And Conclusions

```question
key: u05_l01_q01_hypothesis_definition
type: multiple-choice
prompt: "Which sentence best describes a hypothesis?"
choices:
  - "A testable explanation for observations"
  - "A conclusion after all evidence has been judged"
  - "A measurement recorded during a test"
  - "A question that cannot be checked"
correctAnswer: "A testable explanation for observations"
explanation: "A hypothesis proposes an explanation that can be checked with evidence."
hint: "A hypothesis should explain and be testable."
questionGoal: "Define hypothesis in scientific reasoning."
misconception: "Treating a hypothesis as an unchangeable final conclusion."
```

```question
key: u05_l01_q02_sort_science_parts
type: match-pairs
prompt: "Match each part of a science scenario to its role."
pairs:
  - left: "The plant near the window grew 4 cm."
    right: "Observation"
  - left: "More light helps this plant grow faster."
    right: "Hypothesis"
  - left: "The measured growth in both locations"
    right: "Evidence"
  - left: "The window plant grew more in this trial."
    right: "Conclusion"
explanation: "The hypothesis explains, the evidence is measured, and the conclusion says what the evidence supports."
hint: "Ask which part is proposed, which part is measured, and which part is decided."
questionGoal: "Distinguish hypothesis, observation, evidence, and conclusion."
misconception: "Confusing the proposed explanation with the measured result."
```

```question
key: u05_l01_q03_supported_conclusion
type: passage-question
prompt: "Read the experiment summary and answer."
passageTitle: "Two Seeds"
passage: |
  A class planted two seeds of the same kind.
  Seed A received water every day.
  Seed B received no water.
  After one week, Seed A sprouted and Seed B did not.
question: "Which conclusion best fits the evidence?"
choices:
  - "In this trial, the watered seed sprouted and the unwatered seed did not."
  - "Water is the only thing any plant ever needs."
  - "No seed can sprout without exactly one week of water."
  - "The unwatered seed was not a real seed."
correctAnswer: "In this trial, the watered seed sprouted and the unwatered seed did not."
explanation: "The careful conclusion stays close to the actual trial."
hint: "Avoid claims about every plant or every seed."
questionGoal: "Choose a scientific conclusion that matches evidence scope."
misconception: "Turning one small experiment into a universal rule."
```

```question
key: u05_l01_q04_evidence_or_conclusion
type: multiple-choice
prompt: "In a science report, which sentence is evidence?"
choices:
  - "The magnet picked up 12 paper clips."
  - "Magnets are useful."
  - "The magnetism hypothesis is probably right."
  - "Therefore, metal type matters."
correctAnswer: "The magnet picked up 12 paper clips."
explanation: "Evidence reports what was observed or measured."
hint: "Look for the measured result, not the interpretation."
questionGoal: "Identify evidence as observation or measurement."
misconception: "Calling opinions or conclusions evidence."
```

```question
key: u05_l01_q05_science_cloze
type: multi-blank-cloze
prompt: "Complete the science reasoning summary."
parts:
  - "A hypothesis is a testable "
  - ". Evidence is what was "
  - " or measured."
blanks:
  - correctAnswer: "explanation"
    acceptedAnswers:
      - "explanation"
  - correctAnswer: "observed"
    acceptedAnswers:
      - "observed"
      - "seen"
explanation: "Scientific reasoning keeps proposed explanations separate from observations."
hint: "The hypothesis explains; evidence is what you notice or measure."
questionGoal: "Recall the roles of hypothesis and evidence."
misconception: "Blending explanation and observation into one category."
```

```question
key: u05_l01_q06_order_report
type: order-items
prompt: "Put the parts of a careful science explanation in order."
items:
  - "State what the evidence supports"
  - "Collect or read the evidence"
  - "Name the hypothesis"
  - "Identify the observation or question"
correctOrder:
  - "Identify the observation or question"
  - "Name the hypothesis"
  - "Collect or read the evidence"
  - "State what the evidence supports"
explanation: "Scientific reasoning starts with a question or observation, then tests an explanation with evidence."
hint: "The conclusion should come after the evidence."
questionGoal: "Sequence hypothesis-evidence-conclusion reasoning."
misconception: "Starting with a final conclusion before evidence is considered."
```

### Lesson 2: Alternative Explanations In Science

```question
key: u05_l02_q01_alternative_reason
type: multiple-choice
prompt: "Why do scientists consider alternative explanations?"
choices:
  - "The same evidence might fit more than one explanation."
  - "Alternatives make all evidence useless."
  - "The first hypothesis is always false."
  - "Science avoids explanations."
correctAnswer: "The same evidence might fit more than one explanation."
explanation: "Alternatives help test whether the chosen explanation is really the best supported."
hint: "An alternative is another possible explanation for the same evidence."
questionGoal: "Explain why alternatives matter in scientific reasoning."
misconception: "Thinking alternatives automatically destroy or replace the first hypothesis."
```

```question
key: u05_l02_q02_choose_alternative
type: passage-question
prompt: "Read the scenario and answer."
passageTitle: "Slow Phones"
passage: |
  Several phones in the classroom were slow after lunch.
  A student says, "The school website caused every phone to slow down."
question: "Which alternative explanation should be considered?"
choices:
  - "The classroom Wi-Fi connection may have been weak."
  - "Phones cannot ever be slow."
  - "The website caused all slow phones everywhere."
  - "The phones were not in a classroom."
correctAnswer: "The classroom Wi-Fi connection may have been weak."
explanation: "A weak Wi-Fi connection could fit the same evidence."
hint: "Look for another explanation that could cause several phones to be slow at once."
questionGoal: "Choose a plausible alternative explanation for a scientific-style claim."
misconception: "Accepting a first cause claim without considering other causes."
```

```question
key: u05_l02_q03_match_evidence_limit
type: match-pairs
prompt: "Match each evidence situation to the caution it raises."
pairs:
  - left: "One trial supports the hypothesis"
    right: "Needs more checking"
  - left: "Two explanations fit the same result"
    right: "Compare alternatives"
  - left: "A related change appears in data"
    right: "Do not assume cause yet"
  - left: "Only one group was tested"
    right: "Scope may be limited"
explanation: "Scientific claims get stronger when these cautions are addressed."
hint: "Each caution asks what the evidence has not shown yet."
questionGoal: "Connect evidence limits to scientific reasoning cautions."
misconception: "Treating any support as complete proof."
```

```question
key: u05_l02_q04_best_next_test
type: multiple-choice
prompt: "A class thinks a plant grew taller because it received music each day. Which next test would best check an alternative explanation?"
choices:
  - "Compare similar plants with the same light and water, with music for one group and no music for another."
  - "Play louder music to the same plant only."
  - "Ask which music students like best."
  - "Stop measuring the plant."
correctAnswer: "Compare similar plants with the same light and water, with music for one group and no music for another."
explanation: "The comparison controls other factors better and tests whether music matters."
hint: "A better test changes the suspected cause while keeping other conditions similar."
questionGoal: "Choose a test that helps rule out alternatives."
misconception: "Thinking more of the same observation tests a cause by itself."
```

```question
key: u05_l02_q05_alternative_cloze
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "An alternative explanation is another possible cause that could"
sentenceAfter: "the same evidence."
choices:
  - "fit"
  - "erase"
  - "command"
  - "translate"
correctAnswer: "fit"
explanation: "An alternative matters when it can account for the same evidence."
hint: "The alternative should explain the clues too."
questionGoal: "Recall what makes an alternative explanation relevant."
misconception: "Treating any random different idea as a serious alternative."
```

```question
key: u05_l02_q06_not_random_alternative
type: passage-question
prompt: "Read the scenario and answer."
passageTitle: "Melting Ice"
passage: |
  Ice cubes on a sunny windowsill melted faster than ice cubes in a shaded corner.
  A student says sunlight warmed the ice.
question: "Which alternative is most relevant to check?"
choices:
  - "The windowsill may also have been warmer because of a heater below it."
  - "The ice cubes may secretly be made of paper."
  - "The shade may be a proposition."
  - "Sunlight is spelled with eight letters."
correctAnswer: "The windowsill may also have been warmer because of a heater below it."
explanation: "A heater could also explain faster melting, so it is relevant to the cause claim."
hint: "Choose another explanation that could fit the melting evidence."
questionGoal: "Distinguish relevant alternatives from random distractions."
misconception: "Thinking any unrelated possibility counts as a useful alternative."
```

### Lesson 3: Replication And Careful Conclusions

```question
key: u05_l03_q01_replication_definition
type: multiple-choice
prompt: "What does replication mean in scientific reasoning?"
choices:
  - "Checking whether a result happens again"
  - "Changing the conclusion before testing"
  - "Ignoring the first trial"
  - "Using a longer word for evidence"
correctAnswer: "Checking whether a result happens again"
explanation: "Replication helps show whether a result is stable beyond one trial."
hint: "Replication is about repeating or checking again."
questionGoal: "Define replication in accessible terms."
misconception: "Treating replication as needless repetition."
```

```question
key: u05_l03_q02_confidence_comparison
type: multiple-choice
prompt: "Which evidence usually gives more confidence?"
choices:
  - "The same pattern appears in several well-run trials."
  - "The pattern appears once and is never checked again."
  - "The pattern appears in a rumor."
  - "No one records the results."
correctAnswer: "The same pattern appears in several well-run trials."
explanation: "Repeated support makes a conclusion stronger than one unchecked result."
hint: "Look for repeated, careful checks."
questionGoal: "Compare single-trial and repeated-trial evidence."
misconception: "Thinking one trial is always as strong as repeated checks."
```

```question
key: u05_l03_q03_repeated_trials_passage
type: passage-question
prompt: "Read the summary and answer."
passageTitle: "Paper Airplanes"
passage: |
  A class tested two paper airplane designs.
  Design A flew farther in one trial.
  In five more trials, Design B flew farther four times.
question: "Which conclusion is most careful?"
choices:
  - "The repeated trials give stronger support that Design B may fly farther in this setup."
  - "Design A is proven best because it won the first trial."
  - "No trial matters after the first one."
  - "Design B must fly farther in every place forever."
correctAnswer: "The repeated trials give stronger support that Design B may fly farther in this setup."
explanation: "More trials changed the evidence picture, but the conclusion should stay within the setup."
hint: "Consider all trials, not only the first one."
questionGoal: "Use repeated-check evidence to choose a careful conclusion."
misconception: "Overvaluing the first result or overgeneralizing from repeated local results."
```

```question
key: u05_l03_q04_match_replication_cautions
type: match-pairs
prompt: "Match each situation to the best interpretation."
pairs:
  - left: "One surprising result"
    right: "Interesting but needs checking"
  - left: "Similar result in several trials"
    right: "Stronger support"
  - left: "Different result in a repeat trial"
    right: "Reason to investigate"
  - left: "No recorded method"
    right: "Hard to replicate"
explanation: "Replication helps judge whether evidence is stable and checkable."
hint: "Repeated, recorded methods make evidence easier to trust."
questionGoal: "Interpret outcomes related to replication."
misconception: "Assuming repeated checks either prove everything or mean nothing."
```

```question
key: u05_l03_q05_order_replication_reasoning
type: order-items
prompt: "Put the careful replication reasoning in order."
items:
  - "Compare the repeated results"
  - "State a conclusion that matches the evidence"
  - "Record the first result"
  - "Check whether the result happens again"
correctOrder:
  - "Record the first result"
  - "Check whether the result happens again"
  - "Compare the repeated results"
  - "State a conclusion that matches the evidence"
explanation: "Replication uses repeated checks before increasing confidence."
hint: "The conclusion comes after comparing results."
questionGoal: "Sequence reasoning from first result to careful conclusion."
misconception: "Making a final claim before repeated evidence is considered."
```

```question
key: u05_l03_q06_careful_wording
type: multiple-choice
prompt: "After three similar trials, which conclusion is best worded?"
choices:
  - "The evidence supports the hypothesis in these trials."
  - "The hypothesis can never be revised."
  - "The hypothesis is true for every possible case."
  - "No more evidence could ever matter."
correctAnswer: "The evidence supports the hypothesis in these trials."
explanation: "Repeated trials strengthen support, but careful scientific conclusions remain tied to evidence."
hint: "Use support language, not forever-proof language."
questionGoal: "Choose appropriately cautious wording after repeated evidence."
misconception: "Treating repeated support as unlimited certainty."
```

## Unit 6: Argument Maps, Debate Cases, And Applied Analysis

### Lesson 1: Claims, Reasons, And Evidence In Maps

```question
key: u06_l01_q01_main_claim
type: passage-question
prompt: "Read the argument and answer."
passageTitle: "Garden Club"
passage: |
  The school should start a garden club.
  Students could learn how plants grow.
  The science teacher said the courtyard has enough space.
question: "What is the main claim?"
choices:
  - "The school should start a garden club."
  - "Students could learn how plants grow."
  - "The science teacher said the courtyard has enough space."
  - "The courtyard has enough space."
correctAnswer: "The school should start a garden club."
explanation: "The main claim is the position the reasons are trying to support."
hint: "Find the statement the other sentences are supporting."
questionGoal: "Identify the main claim in a short argument."
misconception: "Confusing a supporting reason or evidence detail with the main claim."
```

```question
key: u06_l01_q02_match_map_parts
type: match-pairs
prompt: "Match each map part to its role."
pairs:
  - left: "Main claim"
    right: "The position being supported"
  - left: "Reason"
    right: "A statement that tells why"
  - left: "Evidence"
    right: "Information used as support"
  - left: "Argument map"
    right: "A visual or text structure of support"
explanation: "Argument maps make the support relationship visible."
hint: "The claim is supported; reasons and evidence do the supporting."
questionGoal: "Connect basic argument-map vocabulary to roles."
misconception: "Treating all map parts as interchangeable."
```

```question
key: u06_l01_q03_reason_or_evidence
type: multiple-choice
prompt: "In the argument 'The library should stay open later because many students need quiet study time. Last month, 80 students signed a request,' which sentence is evidence?"
choices:
  - "Last month, 80 students signed a request."
  - "The library should stay open later."
  - "because many students need quiet study time"
  - "The library is usually quiet after school."
correctAnswer: "Last month, 80 students signed a request."
explanation: "The number of signatures is information used to support the reason or claim."
hint: "Evidence often gives data, observations, or source information."
questionGoal: "Distinguish evidence from claim and reason."
misconception: "Calling the main claim or general reason evidence."
```

```question
key: u06_l01_q04_map_order
type: order-items
prompt: "Put a simple argument map from top to bottom."
items:
  - "Evidence"
  - "Main claim"
  - "Reason"
correctOrder:
  - "Main claim"
  - "Reason"
  - "Evidence"
explanation: "A simple map often places the main claim at the top, with reasons and evidence underneath."
hint: "The supported claim goes above its support."
questionGoal: "Order basic argument-map parts."
misconception: "Mapping in sentence order instead of support order."
```

```question
key: u06_l01_q05_choose_matching_map
type: multiple-choice
prompt: "Argument: 'We should use reusable bottles. They create less trash. Our class threw away 90 plastic bottles last week.' Which map is best?"
choices:
  - "Claim: Use reusable bottles; Reason: They create less trash; Evidence: 90 bottles were thrown away"
  - "Claim: 90 bottles were thrown away; Reason: Use reusable bottles; Evidence: They create less trash"
  - "Claim: Use reusable bottles; Reason: 90 bottles were thrown away; Evidence: They create less trash"
  - "Claim: They create less trash; Reason: Use reusable bottles; Evidence: 90 bottles were thrown away"
correctAnswer: "Claim: Use reusable bottles; Reason: They create less trash; Evidence: 90 bottles were thrown away"
explanation: "The map should show the recommendation as the claim, the trash point as the reason, and the number as evidence."
hint: "Ask which statement is being supported by the others."
questionGoal: "Choose the argument map that preserves support structure."
misconception: "Putting evidence or a detail in the main-claim position."
```

```question
key: u06_l01_q06_map_purpose
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "An argument map helps show how reasons and evidence"
sentenceAfter: "a main claim."
choices:
  - "support"
  - "repeat"
  - "hide"
  - "replace"
correctAnswer: "support"
explanation: "The map is a reasoning check: it shows what is supposed to support what."
hint: "Reasons and evidence do something for the claim."
questionGoal: "State the purpose of an argument map."
misconception: "Treating maps as decorative outlines rather than support checks."
```

### Lesson 2: Linked Reasons And Missing Assumptions

```question
key: u06_l02_q01_linked_reasons
type: multiple-choice
prompt: "What are linked reasons?"
choices:
  - "Reasons that work together to support a claim"
  - "Reasons that support separate claims independently"
  - "Reasons that only repeat the conclusion"
  - "Unrelated facts placed near the claim"
correctAnswer: "Reasons that work together to support a claim"
explanation: "Linked reasons often need each other to provide the intended support."
hint: "Linked means connected in how they support the claim."
questionGoal: "Define linked reasons."
misconception: "Treating linked reasons as merely similar-looking statements."
```

```question
key: u06_l02_q02_missing_assumption
type: passage-question
prompt: "Read the argument and answer."
passageTitle: "Bike Rack"
passage: |
  The school should add a bike rack.
  Many students bike to school.
  Bikes are currently locked to trees.
question: "Which missing assumption helps connect the reasons to the claim?"
choices:
  - "Students need a safe, proper place to lock bikes."
  - "Many students bike to school."
  - "The school should add a bike rack."
  - "The rack should be placed near the gym."
correctAnswer: "Students need a safe, proper place to lock bikes."
explanation: "That assumption connects the evidence about bikes to the recommendation for a bike rack."
hint: "Find the bridge between the current problem and the proposed solution."
questionGoal: "Choose a missing assumption that supports an argument link."
misconception: "Choosing a random related fact instead of the needed bridge."
```

```question
key: u06_l02_q03_match_reason_type
type: match-pairs
prompt: "Match each description to the support type."
pairs:
  - left: "Two reasons need each other to support the claim"
    right: "Linked reasons"
  - left: "One reason can support the claim by itself"
    right: "Independent reason"
  - left: "An unstated bridge the argument needs"
    right: "Missing assumption"
  - left: "The position being supported"
    right: "Main claim"
explanation: "These labels show how argument-map support is structured."
hint: "Linked reasons work together; assumptions bridge a gap."
questionGoal: "Distinguish linked reasons, independent reasons, assumptions, and claims."
misconception: "Calling every unstated idea an independent reason."
```

```question
key: u06_l02_q04_assumption_not_repeat
type: multiple-choice
prompt: "Which sentence is a useful missing assumption, not just a repeat of the claim?"
choices:
  - "If students need quiet work time, then a quiet study room would help."
  - "We need a study room because we need a study room."
  - "Some students already finish homework at home."
  - "Quiet work time is the same phrase as quiet study room."
correctAnswer: "If students need quiet work time, then a quiet study room would help."
explanation: "A useful assumption connects support to the claim instead of merely restating the claim."
hint: "Look for a bridge idea, not a copy of the conclusion."
questionGoal: "Identify an assumption that adds a needed support bridge."
misconception: "Thinking a repeated claim counts as an assumption."
```

```question
key: u06_l02_q05_assumption_cloze
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "A missing assumption is an unstated"
sentenceAfter: "between support and claim."
choices:
  - "bridge"
  - "topic"
  - "conclusion"
  - "example"
correctAnswer: "bridge"
explanation: "The assumption connects the reasons to the conclusion."
hint: "An assumption helps the support reach the claim."
questionGoal: "Recall the bridge role of missing assumptions."
misconception: "Treating assumptions as extra unrelated details."
```

```question
key: u06_l02_q06_order_assumption_check
type: order-items
prompt: "Put the missing-assumption check in order."
items:
  - "Ask what bridge idea is needed"
  - "Find the claim"
  - "Check whether the reasons reach the claim"
  - "Find the reasons"
correctOrder:
  - "Find the claim"
  - "Find the reasons"
  - "Check whether the reasons reach the claim"
  - "Ask what bridge idea is needed"
explanation: "You find assumptions by seeing where the support needs a bridge."
hint: "Start with the argument parts before looking for a gap."
questionGoal: "Sequence an assumption-finding routine."
misconception: "Guessing assumptions before reading the claim and reasons."
```

### Lesson 3: Objections And Rebuttals

```question
key: u06_l03_q01_objection_definition
type: multiple-choice
prompt: "What makes an objection strong?"
choices:
  - "It targets a specific reason, evidence, or assumption."
  - "It repeats the main claim."
  - "It changes the subject completely."
  - "It attacks the speaker instead of the support."
correctAnswer: "It targets a specific reason, evidence, or assumption."
explanation: "A strong objection challenges a support link in the argument."
hint: "An objection should aim at part of the argument."
questionGoal: "Define a targeted objection."
misconception: "Treating any disagreement or topic change as a useful objection."
```

```question
key: u06_l03_q02_choose_objection
type: passage-question
prompt: "Read the argument and answer."
passageTitle: "Club Meeting"
passage: |
  The robotics club should meet before school because every member is free then.
question: "Which objection targets the reason?"
choices:
  - "Some members ride buses that arrive after the morning bell."
  - "The club built a robot last semester."
  - "The club should meet before school because robotics is important."
  - "The meeting room has several posters."
correctAnswer: "Some members ride buses that arrive after the morning bell."
explanation: "That objection challenges the reason that every member is free before school."
hint: "Look for the answer that directly questions the reason."
questionGoal: "Choose an objection that targets the support."
misconception: "Choosing a related but non-challenging comment."
```

```question
key: u06_l03_q03_match_objection_target
type: match-pairs
prompt: "Match each objection to what it targets."
pairs:
  - left: "The survey asked only five people."
    right: "Evidence quality"
  - left: "That reason does not show the plan will help."
    right: "Support link"
  - left: "The claim assumes students can stay late."
    right: "Missing assumption"
  - left: "The graph uses a confusing scale."
    right: "Data presentation"
explanation: "Objections are stronger when they name the part of the argument they challenge."
hint: "Ask what each objection is pointing at."
questionGoal: "Identify the target of different objections."
misconception: "Seeing objections as general disagreement instead of targeted critique."
```

```question
key: u06_l03_q04_dialogue_rebuttal
type: dialogue-builder
prompt: "Choose the best rebuttal."
turns:
  - speaker: "Ari"
    line: "The school should add a homework club because many students need a quiet place to work."
  - speaker: "Bea"
    line: "But some students cannot stay after school because they ride the bus."
choices:
  - "The club could also meet during lunch twice a week."
  - "After-school time is quieter than lunch."
  - "Students who ride the bus should just miss the club."
  - "Homework clubs are useful, so the original plan is already enough."
correctAnswer: "The club could also meet during lunch twice a week."
explanation: "This rebuttal answers the bus objection by adjusting the plan."
hint: "A rebuttal should answer the specific problem raised."
questionGoal: "Choose a rebuttal that responds to an objection."
misconception: "Repeating the original claim or dismissing the objection."
```

```question
key: u06_l03_q05_rebuttal_cloze
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "A rebuttal should"
sentenceAfter: "the objection."
choices:
  - "answer"
  - "ignore"
  - "repeat"
  - "change"
correctAnswer: "answer"
explanation: "A rebuttal responds to the objection's target."
hint: "A good rebuttal deals with the challenge."
questionGoal: "Recall the job of a rebuttal."
misconception: "Thinking rebuttal means restating the original claim louder."
```

```question
key: u06_l03_q06_order_response
type: order-items
prompt: "Put the fair response process in order."
items:
  - "Choose a rebuttal that answers that target"
  - "Identify the argument's claim and support"
  - "Find what the objection targets"
  - "Read the objection"
correctOrder:
  - "Identify the argument's claim and support"
  - "Read the objection"
  - "Find what the objection targets"
  - "Choose a rebuttal that answers that target"
explanation: "A fair rebuttal depends on understanding both the original support and the objection."
hint: "Do not choose a rebuttal before knowing what the objection challenges."
questionGoal: "Sequence targeted objection and rebuttal reasoning."
misconception: "Answering objections without identifying their target."
```

### Lesson 4: Debate Case Structure

```question
key: u06_l04_q01_debate_parts
type: match-pairs
prompt: "Match each debate case part to its role."
pairs:
  - left: "Claim"
    right: "The side's position"
  - left: "Reason"
    right: "Why the claim should be accepted"
  - left: "Evidence"
    right: "Support such as data or examples"
  - left: "Impact"
    right: "Why the issue matters"
  - left: "Rebuttal"
    right: "Response to an objection"
explanation: "A debate case organizes a position and its support."
hint: "Impact is about importance; rebuttal answers the other side."
questionGoal: "Connect debate-case vocabulary to roles."
misconception: "Treating debate parts as interchangeable opinion statements."
```

```question
key: u06_l04_q02_identify_impact
type: passage-question
prompt: "Read the mini case and answer."
passageTitle: "Recycling Bins"
passage: |
  Claim: The school should add recycling bins near the cafeteria.
  Reason: Many recyclable bottles are thrown away there.
  Evidence: A class counted 60 recyclable bottles in cafeteria trash last week.
  Impact: This would reduce waste from the busiest lunch area.
question: "Which sentence gives the impact?"
choices:
  - "This would reduce waste from the busiest lunch area."
  - "The school should add recycling bins near the cafeteria."
  - "Many recyclable bottles are thrown away there."
  - "A class counted 60 recyclable bottles."
correctAnswer: "This would reduce waste from the busiest lunch area."
explanation: "The impact explains why the issue matters."
hint: "Look for the sentence that explains importance or effect."
questionGoal: "Identify impact in a debate case."
misconception: "Confusing evidence or claim with impact."
```

```question
key: u06_l04_q03_case_order
type: order-items
prompt: "Put a simple debate case in a common order."
items:
  - "Evidence"
  - "Claim"
  - "Impact"
  - "Reason"
correctOrder:
  - "Claim"
  - "Reason"
  - "Evidence"
  - "Impact"
explanation: "A compact case often states the position, gives a reason, supports it with evidence, and explains why it matters."
hint: "Start with the side's position."
questionGoal: "Sequence the core parts of a debate case."
misconception: "Starting with impact or evidence before the position is clear."
```

```question
key: u06_l04_q04_rebuttal_to_case
type: passage-question
prompt: "Read the debate exchange and answer."
passageTitle: "Study Hall"
passage: |
  Case: Our class should have a quiet study hall because students need a place to finish work.
  Objection: Some students need help, not just quiet.
question: "Which rebuttal best answers the objection?"
choices:
  - "The study hall could include one teacher who answers questions quietly."
  - "Quiet study hall is good because quiet is good."
  - "Students have work."
  - "The objection uses the word students."
correctAnswer: "The study hall could include one teacher who answers questions quietly."
explanation: "This response addresses the need for help while preserving the quiet-study idea."
hint: "Answer the objection's concern directly."
questionGoal: "Choose a rebuttal that fits a debate objection."
misconception: "Repeating the case without addressing the opposing point."
```

```question
key: u06_l04_q05_evidence_quality
type: multiple-choice
prompt: "Which evidence would best support a debate reason about students needing more library hours?"
choices:
  - "A sign-in count showing many students leave when the library closes"
  - "A student's unrelated favorite book"
  - "The word library has seven letters"
  - "A claim that libraries are nice with no support"
correctAnswer: "A sign-in count showing many students leave when the library closes"
explanation: "Relevant evidence should support the debate reason directly."
hint: "Choose evidence about the need for library hours."
questionGoal: "Select relevant evidence for a debate case."
misconception: "Using related topic details that do not support the reason."
```

```question
key: u06_l04_q06_case_structure_warning
type: multiple-choice
prompt: "Why is confidence alone not enough for a strong debate case?"
choices:
  - "A case needs reasons and evidence that support the claim."
  - "Confident speakers are always wrong."
  - "Evidence is never used in debate."
  - "A debate case should avoid claims."
correctAnswer: "A case needs reasons and evidence that support the claim."
explanation: "A strong debate case depends on support, not only delivery."
hint: "Ask what support the case gives."
questionGoal: "Distinguish case strength from speaker confidence."
misconception: "Treating confident presentation as enough proof."
```

### Lesson 5: Applied Argument Analysis

```question
key: u06_l05_q01_choose_tool
type: multiple-choice
prompt: "A passage says, 'If the app is updated, then the icon changes. The icon changed, so the app was updated.' Which Logic 4 tool best checks the mistake?"
choices:
  - "Converse check"
  - "Probability word ladder"
  - "Replication check"
  - "Statement versus command sort"
correctAnswer: "Converse check"
explanation: "The argument reverses the conditional: icon changed does not prove the app was updated."
hint: "Look at whether the if and then parts were switched."
questionGoal: "Choose the relevant tool for a conditional reversal."
misconception: "Missing a converse error in an applied argument."
```

```question
key: u06_l05_q02_data_tool
type: passage-question
prompt: "Read the claim and answer."
passageTitle: "Survey Claim"
passage: |
  Twelve students in the art club voted for a mural design.
  Ten chose Design A.
  A poster says, "The whole school wants Design A."
question: "Which issue should be checked first?"
choices:
  - "Sample scope"
  - "Negation truth value"
  - "Deductive proof form"
  - "Debate impact order"
correctAnswer: "Sample scope"
explanation: "The evidence comes from art club students, but the claim is about the whole school."
hint: "Ask who was actually sampled."
questionGoal: "Choose sample-scope analysis for an overbroad survey claim."
misconception: "Accepting a broad claim from a narrow sample."
```

```question
key: u06_l05_q03_match_issue_question
type: match-pairs
prompt: "Match each issue to the diagnostic question."
pairs:
  - left: "Conditional reversal"
    right: "Did the argument switch if and then?"
  - left: "Correlation claim"
    right: "Has cause been tested?"
  - left: "Missing assumption"
    right: "What bridge connects support to claim?"
  - left: "Abductive explanation"
    right: "What best fits the evidence?"
explanation: "Choosing the right diagnostic question keeps analysis focused."
hint: "Match each tool to the problem it was designed to catch."
questionGoal: "Connect Logic 4 tools to applied diagnostic questions."
misconception: "Using the same critique for every argument."
```

```question
key: u06_l05_q04_science_transfer
type: passage-question
prompt: "Read the argument and answer."
passageTitle: "Classroom Plants"
passage: |
  One plant near the speaker grew taller than one plant across the room.
  A student claims, "Music definitely caused the plant to grow taller."
question: "Which response is most careful?"
choices:
  - "The evidence is too limited to prove music caused the growth; other explanations should be checked."
  - "The claim is guaranteed because one plant grew taller."
  - "Music can never affect plants, so no evidence matters."
  - "The plant is not a proposition."
correctAnswer: "The evidence is too limited to prove music caused the growth; other explanations should be checked."
explanation: "The claim overstates cause from a very small science scenario."
hint: "Use science and cause-claim cautions together."
questionGoal: "Apply scientific alternative-explanation caution to an overclaim."
misconception: "Treating one observation as proof of a cause."
```

```question
key: u06_l05_q05_final_argument_map
type: passage-question
prompt: "Read the argument and answer."
passageTitle: "Outdoor Reading"
passage: |
  Our class should sometimes read outside.
  Fresh air can help students feel alert.
  Last week, students reported feeling more awake after outdoor science time.
question: "What is the best missing assumption to check?"
choices:
  - "Feeling more alert would help students during reading time."
  - "Outdoor science time happened last week."
  - "The class exists."
  - "Reading is spelled differently from science."
correctAnswer: "Feeling more alert would help students during reading time."
explanation: "The argument needs a bridge from alertness after outdoor science to the value of outdoor reading."
hint: "Find the idea that connects the evidence to the recommendation."
questionGoal: "Identify a missing assumption in an applied argument."
misconception: "Selecting a repeated detail instead of the support bridge."
```

```question
key: u06_l05_q06_careful_final_revision
type: multiple-choice
prompt: "Evidence: A graph shows bike rack use rose from 20 to 24 bikes after a new sign was posted. Which conclusion is most careful?"
choices:
  - "Bike rack use increased after the sign, but more evidence is needed to know whether the sign caused the increase."
  - "The sign definitely caused every extra bike."
  - "The graph proves all students bike to school."
  - "The sign made bike racks impossible."
correctAnswer: "Bike rack use increased after the sign, but more evidence is needed to know whether the sign caused the increase."
explanation: "The graph shows a trend after the sign, but cause needs more evidence."
hint: "Use both graph and cause-claim caution."
questionGoal: "Revise an applied data claim to fit the evidence."
misconception: "Treating before-after graph change as proven causation."
```
