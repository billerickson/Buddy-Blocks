# Logic 2 Question Sets

Sources: accepted Logic 2 blueprint, course map, unit design briefs, and lesson briefs in `research/logic-2/`.

## Unit 1: Argument Parts And Evidence

### Lesson 1: Statements, Questions, And Claims

```question
key: u01_l01_q01_which_is_question
type: multiple-choice
prompt: "Which sentence is a question?"
choices:
  - "Should the class plant a garden?"
  - "The class planted a garden."
  - "The class garden has six tomato plants."
  - "The class should plant a garden because it would teach science."
correctAnswer: "Should the class plant a garden?"
explanation: "A question asks for information or an answer."
hint: "Look for the sentence that asks instead of tells."
questionGoal: "Classify a sentence as a question."
misconception: "Treating every sentence about a topic as the same kind of sentence."
```

```question
key: u01_l01_q02_supportable_claim
type: multiple-choice
prompt: "Which sentence is a claim someone could support with reasons?"
choices:
  - "The library closes at 5:00."
  - "Does the library close at 5:00?"
  - "The library should stay open later because students need study time."
  - "Library."
correctAnswer: "The library should stay open later because students need study time."
explanation: "This is a claim because someone could give reasons for or against keeping the library open later."
hint: "A claim is a statement that can be supported or challenged."
questionGoal: "Identify a supportable claim."
misconception: "Thinking only facts, not recommendations, can be claims."
```

```question
key: u01_l01_q03_match_sentence_type
type: match-pairs
prompt: "Match each sentence to what it is doing."
pairs:
  - left: "Can we start the game now?"
    right: "asks a question"
  - left: "The game starts at noon."
    right: "tells a plain statement"
  - left: "This game is fair because everyone gets a turn."
    right: "makes a claim with support"
explanation: "Questions ask, statements tell, and claims can be supported with reasons."
hint: "Ask what job each sentence is doing."
questionGoal: "Distinguish questions, statements, and claims."
misconception: "Classifying by topic instead of sentence function."
```

```question
key: u01_l01_q04_claim_needs_support
type: fill-blank
prompt: "Complete the idea about claims."
sentenceBefore: "A claim is a statement that can be supported with"
sentenceAfter: "."
choices:
  - "reasons"
  - "capital letters"
  - "rhymes"
  - "silence"
correctAnswer: "reasons"
explanation: "A claim can be supported with reasons or evidence."
hint: "Think about what makes a claim stronger in logic."
questionGoal: "Connect claims with reasons."
misconception: "Treating claims as unsupported opinions only."
```

```question
key: u01_l01_q05_find_claim_in_passage
type: passage-question
prompt: "Read the short passage and choose the claim."
passageTitle: "Class Pet"
passage: |
  Maya said, "Should our class get a fish? I think a fish would be a good class pet because it is quiet and easy to care for."
question: "Which sentence is Maya's claim?"
choices:
  - "Should our class get a fish?"
  - "A fish would be a good class pet."
  - "It is quiet and easy to care for."
  - "Maya said."
correctAnswer: "A fish would be a good class pet."
explanation: "Maya wants others to accept the claim that a fish would be a good class pet."
hint: "Find the statement Maya is trying to support."
questionGoal: "Identify a claim inside a short passage."
misconception: "Choosing the question or the reason instead of the claim."
```

```question
key: u01_l01_q06_statement_not_claim
type: multiple-choice
prompt: "Why is 'The field trip is on Friday' a plain statement in this context?"
choices:
  - "It tells information but does not give a point to argue."
  - "It asks the reader a question."
  - "It gives two reasons."
  - "It cannot be written in a sentence."
correctAnswer: "It tells information but does not give a point to argue."
explanation: "A plain statement can simply tell information. A claim in an argument is a statement someone supports or challenges."
hint: "Ask whether the sentence is trying to prove a point."
questionGoal: "Distinguish an ordinary statement from an argumentative claim."
misconception: "Assuming every true-or-false statement is being used as an argument claim."
```

### Lesson 2: Premises And Conclusions

```question
key: u01_l02_q01_identify_conclusion
type: passage-question
prompt: "Read the argument and identify the conclusion."
passageTitle: "Rain Plan"
passage: |
  The playground is soaked, and thunder is still nearby. So recess should be indoors today.
question: "What is the conclusion?"
choices:
  - "The playground is soaked."
  - "Thunder is still nearby."
  - "Recess should be indoors today."
  - "The playground is outside."
correctAnswer: "Recess should be indoors today."
explanation: "The conclusion is the point the argument wants you to accept."
hint: "Look for the statement supported by the other sentences."
questionGoal: "Identify the conclusion in a short argument."
misconception: "Choosing a premise because it appears first."
```

```question
key: u01_l02_q02_identify_premise
type: passage-question
prompt: "Read the argument and identify a premise."
passageTitle: "Lunch Line"
passage: |
  We should open a second lunch line. The current line reaches the hallway almost every day.
question: "Which sentence is a premise?"
choices:
  - "We should open a second lunch line."
  - "The current line reaches the hallway almost every day."
  - "Lunch is food."
  - "Every day is the conclusion."
correctAnswer: "The current line reaches the hallway almost every day."
explanation: "The long line is a reason supporting the conclusion that a second line should open."
hint: "A premise gives support for the point."
questionGoal: "Identify a premise that supports a conclusion."
misconception: "Confusing the claim with the support."
```

```question
key: u01_l02_q03_argument_order
type: order-items
prompt: "Put the parts in a clear premise-to-conclusion order."
items:
  - "Conclusion: The team should bring extra water."
  - "Premise: Practice will be outside in hot weather."
  - "Premise: The last outdoor practice ran out of water."
correctOrder:
  - "Premise: Practice will be outside in hot weather."
  - "Premise: The last outdoor practice ran out of water."
  - "Conclusion: The team should bring extra water."
explanation: "Premises give the support, and the conclusion is the point supported by them."
hint: "Reasons usually come before the point when you build an argument map."
questionGoal: "Sequence premises and conclusion in an argument map."
misconception: "Treating the conclusion as support for itself."
```

```question
key: u01_l02_q04_match_argument_parts
type: match-pairs
prompt: "Match each argument part to its job."
pairs:
  - left: "Conclusion"
    right: "the point the argument wants accepted"
  - left: "Premise"
    right: "a reason offered as support"
  - left: "Argument"
    right: "a claim supported by one or more reasons"
explanation: "Premises support conclusions inside an argument."
hint: "Think of the conclusion as the destination and premises as the support."
questionGoal: "Connect argument-part vocabulary to meaning."
misconception: "Memorizing labels without knowing each part's role."
```

```question
key: u01_l02_q05_conclusion_first
type: multiple-choice
prompt: "In this argument, which part is the conclusion? 'The art club should meet twice a week because many students need more time to finish projects.'"
choices:
  - "The art club should meet twice a week."
  - "Many students need more time to finish projects."
  - "Because many students"
  - "Finish projects"
correctAnswer: "The art club should meet twice a week."
explanation: "The conclusion can come first. The reason after because supports it."
hint: "Do not rely only on sentence order. Ask what point is being supported."
questionGoal: "Identify a conclusion when it appears before the premise."
misconception: "Assuming conclusions always appear at the end."
```

```question
key: u01_l02_q06_complete_part_names
type: multi-blank-cloze
prompt: "Complete the argument-part sentence."
parts:
  - "A "
  - " supports a "
  - "."
blanks:
  - correctAnswer: "premise"
    acceptedAnswers:
      - "premise"
      - "reason"
  - correctAnswer: "conclusion"
    acceptedAnswers:
      - "conclusion"
      - "claim"
explanation: "A premise or reason supports a conclusion or claim."
hint: "The support comes first in the sentence."
questionGoal: "Use premise and conclusion vocabulary accurately."
misconception: "Reversing support and claim roles."
```

### Lesson 3: Evidence, Examples, And Explanations

```question
key: u01_l03_q01_match_support_jobs
type: match-pairs
prompt: "Match each support type to its job."
pairs:
  - left: "Evidence"
    right: "information used to support a claim"
  - left: "Example"
    right: "one case that shows an idea"
  - left: "Explanation"
    right: "how or why something happens"
explanation: "Evidence, examples, and explanations can all help, but they do different jobs."
hint: "Ask whether the support gives information, a case, or a how/why."
questionGoal: "Distinguish support types by role."
misconception: "Treating all supporting details as the same kind of support."
```

```question
key: u01_l03_q02_choose_evidence
type: multiple-choice
prompt: "Claim: 'More students are biking to school this month.' Which sentence is evidence for the claim?"
choices:
  - "The bike rack had 8 bikes last month and 21 bikes this month."
  - "Bikes can be blue, red, or black."
  - "Riding a bike can feel fun."
  - "I wonder who owns the bikes."
correctAnswer: "The bike rack had 8 bikes last month and 21 bikes this month."
explanation: "The bike counts give information that supports the claim about more students biking."
hint: "Look for information that could show whether the claim is true."
questionGoal: "Choose evidence that supports a claim."
misconception: "Choosing an interesting fact instead of evidence for the claim."
```

```question
key: u01_l03_q03_explanation_job
type: passage-question
prompt: "Read the support and decide what job it does."
passageTitle: "Plant Leaves"
passage: |
  The plant leaned toward the window because its leaves were growing toward the sunlight.
question: "What kind of support is the second part giving?"
choices:
  - "an explanation of why the plant leaned"
  - "a counterexample to the plant"
  - "a question about the window"
  - "a conclusion with no support"
correctAnswer: "an explanation of why the plant leaned"
explanation: "It explains why the plant leaned toward the window."
hint: "Look for how or why language."
questionGoal: "Identify explanation as a support role."
misconception: "Calling every because sentence evidence."
```

```question
key: u01_l03_q04_example_support
type: multiple-choice
prompt: "Claim: 'Some board games use strategy.' Which sentence is an example?"
choices:
  - "Chess uses planning several moves ahead."
  - "Strategy means making a plan."
  - "Board games can have pieces."
  - "Do you like board games?"
correctAnswer: "Chess uses planning several moves ahead."
explanation: "Chess is one case that shows the claim about some board games."
hint: "An example is one case that fits the idea."
questionGoal: "Identify an example used as support."
misconception: "Confusing a definition or question with an example."
```

```question
key: u01_l03_q05_complete_support_roles
type: multi-blank-cloze
prompt: "Complete the support-role comparison."
parts:
  - "An example shows "
  - " case. An explanation tells "
  - " something happens."
blanks:
  - correctAnswer: "one"
    choices:
      - "one"
      - "zero"
      - "all"
  - correctAnswer: "why"
    choices:
      - "why"
      - "who"
      - "where"
explanation: "An example gives one case, while an explanation tells why or how."
hint: "Think: case versus reason something works."
questionGoal: "Compare example and explanation roles."
misconception: "Treating examples as proof of all cases."
```

```question
key: u01_l03_q06_best_support_type
type: multiple-choice
prompt: "A student wants to support the claim, 'Our class read more pages this week than last week.' What support type would help most?"
choices:
  - "Evidence from the page totals for both weeks"
  - "An explanation of what a page is"
  - "An example of one book cover"
  - "A question about favorite books"
correctAnswer: "Evidence from the page totals for both weeks"
explanation: "The claim compares amounts, so page totals would be useful evidence."
hint: "Ask what information would show whether the comparison is true."
questionGoal: "Choose the support type that fits a claim."
misconception: "Using any related detail instead of the support needed by the claim."
```

### Lesson 4: Objections That Test A Claim

```question
key: u01_l04_q01_best_objection
type: multiple-choice
prompt: "Claim: 'All students will like the new reading corner because it has beanbag chairs.' Which objection best tests the claim?"
choices:
  - "Some students may prefer sitting at desks to read."
  - "Beanbag has seven letters."
  - "The reading corner is in a room."
  - "Students read books."
correctAnswer: "Some students may prefer sitting at desks to read."
explanation: "This objection gives a possible reason the claim may not be true for all students."
hint: "A useful objection stays connected to the claim."
questionGoal: "Choose a relevant objection to a claim."
misconception: "Thinking any related sentence counts as an objection."
```

```question
key: u01_l04_q02_objection_not_rude
type: multiple-choice
prompt: "Why can a fair objection be helpful in logic?"
choices:
  - "It tests whether a claim or support may be weak."
  - "It changes the subject."
  - "It proves the speaker is bad."
  - "It avoids all evidence."
correctAnswer: "It tests whether a claim or support may be weak."
explanation: "A fair objection helps people check the reasoning."
hint: "Think of objection as a logic check, not an insult."
questionGoal: "Understand the purpose of a fair objection."
misconception: "Treating objection as personal disagreement."
```

```question
key: u01_l04_q03_relevant_objection_passage
type: passage-question
prompt: "Read the argument and choose the best objection."
passageTitle: "New Club"
passage: |
  Leo says, "The school should start a chess club because three people in my class want one."
question: "Which objection best tests Leo's support?"
choices:
  - "Is three students enough interest for a school club?"
  - "What color is the chess board?"
  - "Does Leo have math today?"
  - "Are clubs held in buildings?"
correctAnswer: "Is three students enough interest for a school club?"
explanation: "This objection tests whether Leo has enough evidence for a school-wide conclusion."
hint: "Look for the objection that checks the support Leo gave."
questionGoal: "Use an objection to test sufficiency of support."
misconception: "Choosing an off-topic question as an objection."
```

```question
key: u01_l04_q04_fair_check_order
type: order-items
prompt: "Put the fair objection steps in order."
items:
  - "Ask what support was given."
  - "Find the claim."
  - "Choose a question that tests that support."
  - "Avoid attacking the person."
correctOrder:
  - "Find the claim."
  - "Ask what support was given."
  - "Choose a question that tests that support."
  - "Avoid attacking the person."
explanation: "A fair objection starts with the claim and support, then tests the reasoning respectfully."
hint: "You need to know the claim before you can test it."
questionGoal: "Sequence a fair objection routine."
misconception: "Objecting before understanding the argument."
```

```question
key: u01_l04_q05_match_claim_to_objection
type: match-pairs
prompt: "Match each claim to the objection that best tests it."
pairs:
  - left: "All backpacks should have wheels because one student likes them."
    right: "Does one student's preference show what all students need?"
  - left: "The game is easy because I won once."
    right: "Could one win be too little evidence?"
  - left: "The snack is healthy because the package is green."
    right: "Does package color show nutrition?"
explanation: "Each objection checks the support offered for the claim."
hint: "Match by the weakness in the support."
questionGoal: "Connect claims to relevant objections."
misconception: "Matching by shared words rather than reasoning weakness."
```

```question
key: u01_l04_q06_objection_fill
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "A useful objection should stay"
sentenceAfter: "to the claim."
choices:
  - "relevant"
  - "silent"
  - "hidden"
  - "popular"
correctAnswer: "relevant"
explanation: "A useful objection is relevant because it tests the claim or support."
hint: "Use the Logic 1 word for support that fits the claim."
questionGoal: "Recall relevance as a feature of useful objections."
misconception: "Thinking objections can be about any side detail."
```

## Unit 2: Definitions, Classification, And Counterexamples

### Lesson 1: What Makes A Definition Clear?

```question
key: u02_l01_q01_best_definition
type: multiple-choice
prompt: "Which is the clearest definition of a triangle?"
choices:
  - "a closed shape with exactly three straight sides"
  - "a pointy shape"
  - "a shape I draw in math"
  - "a triangle is a triangle"
correctAnswer: "a closed shape with exactly three straight sides"
explanation: "The clearest definition gives important features that decide what belongs."
hint: "A good definition helps you test examples and nonexamples."
questionGoal: "Choose a clear definition with useful boundaries."
misconception: "Accepting vague or circular definitions."
```

```question
key: u02_l01_q02_weak_definition_problem
type: multiple-choice
prompt: "Why is 'A tool is something useful' a weak definition?"
choices:
  - "It is too vague because many useful things are not tools."
  - "It uses too many exact features."
  - "It is a question."
  - "It gives a counterexample."
correctAnswer: "It is too vague because many useful things are not tools."
explanation: "A definition should make a useful boundary, and 'something useful' lets in too many things."
hint: "Ask whether the definition helps decide what belongs."
questionGoal: "Identify why a vague definition is weak."
misconception: "Thinking any nice-sounding description is a clear definition."
```

```question
key: u02_l01_q03_match_definition_terms
type: match-pairs
prompt: "Match each word to its meaning."
pairs:
  - left: "Definition"
    right: "meaning that sets a boundary"
  - left: "Category"
    right: "group of things that belong together"
  - left: "Feature"
    right: "important quality used to decide membership"
explanation: "Definitions use important features to decide what belongs in a category."
hint: "Think about how a definition sorts things."
questionGoal: "Connect definition vocabulary to meaning."
misconception: "Treating categories as lists with no shared feature."
```

```question
key: u02_l01_q04_clear_definition_passage
type: passage-question
prompt: "Read the definitions and choose the clearest one."
passageTitle: "Class Helper"
passage: |
  The teacher asks for a clear definition of class helper. The definition should help students know who has the job today.
question: "Which definition is clearest?"
choices:
  - "the student whose name is on today's helper chart"
  - "a nice person"
  - "someone helpful"
  - "a student in a classroom"
correctAnswer: "the student whose name is on today's helper chart"
explanation: "This definition gives a clear way to decide who the class helper is today."
hint: "Choose the definition that would settle a disagreement."
questionGoal: "Select a definition that fits the purpose and context."
misconception: "Choosing a positive description instead of a useful boundary."
```

```question
key: u02_l01_q05_definition_feature_fill
type: fill-blank
prompt: "Complete the idea about definitions."
sentenceBefore: "A clear definition should help people decide what"
sentenceAfter: "in a category."
choices:
  - "belongs"
  - "rhymes"
  - "hurries"
  - "forgets"
correctAnswer: "belongs"
explanation: "Definitions help decide what belongs and what does not."
hint: "Think about the boundary of a category."
questionGoal: "Recall the purpose of a clear definition."
misconception: "Thinking definitions are mainly decorative wording."
```

```question
key: u02_l01_q06_type_key_word
type: text-input
prompt: "Type the logic word for a meaning that helps set the boundary of a word or category."
acceptedAnswers:
  - "definition"
answerType: text
explanation: "A definition gives the meaning and helps set the boundary of a category."
hint: "The word starts with 'def-'."
questionGoal: "Produce the term definition from its role."
misconception: "Confusing definition with example."
```

### Lesson 2: Too Broad, Too Narrow, Or Just Right

```question
key: u02_l02_q01_too_broad
type: multiple-choice
prompt: "Definition: 'A bird is an animal that can fly.' Why is this definition too broad?"
choices:
  - "It lets in bats and insects, which are not birds."
  - "It leaves out robins."
  - "It has exactly enough features."
  - "It is a question."
correctAnswer: "It lets in bats and insects, which are not birds."
explanation: "Too broad means the definition includes things that should not belong."
hint: "Ask what the definition lets into the category."
questionGoal: "Identify a too-broad definition."
misconception: "Thinking broad means it leaves too many things out."
```

```question
key: u02_l02_q02_too_narrow
type: multiple-choice
prompt: "Definition: 'A bird is an animal with feathers that sings.' Why is this definition too narrow?"
choices:
  - "It leaves out birds that do not sing, such as some penguins."
  - "It includes dogs."
  - "It includes all animals."
  - "It gives no features at all."
correctAnswer: "It leaves out birds that do not sing, such as some penguins."
explanation: "Too narrow means the definition leaves out things that should belong."
hint: "Ask what real members the definition leaves outside."
questionGoal: "Identify a too-narrow definition."
misconception: "Thinking narrow means it includes too many things."
```

```question
key: u02_l02_q03_match_boundary_problem
type: match-pairs
prompt: "Match each definition problem to its description."
pairs:
  - left: "Too broad"
    right: "lets in things that should stay out"
  - left: "Too narrow"
    right: "leaves out things that should belong"
  - left: "Just right"
    right: "uses features that fit the category well"
explanation: "Broad and narrow describe which direction the boundary problem goes."
hint: "Broad means too wide; narrow means too small."
questionGoal: "Distinguish too-broad and too-narrow errors."
misconception: "Using broad and narrow as general labels for any weak definition."
```

```question
key: u02_l02_q04_just_right_definition
type: multiple-choice
prompt: "Which definition is just right for 'weekday'?"
choices:
  - "one of the days from Monday through Friday"
  - "any day when someone is busy"
  - "Monday only"
  - "a day with daylight"
correctAnswer: "one of the days from Monday through Friday"
explanation: "This definition includes the weekdays and leaves out Saturday and Sunday."
hint: "Choose the boundary that includes all and only weekdays."
questionGoal: "Choose a definition with an accurate boundary."
misconception: "Choosing a definition based on personal routine instead of category features."
```

```question
key: u02_l02_q05_definition_diagnosis_passage
type: passage-question
prompt: "Read the definition and diagnose it."
passageTitle: "Museum"
passage: |
  Jordan defines a museum as "a building with old things." His friend says some museums have new science exhibits, and some stores are buildings with old things.
question: "What is the main problem with Jordan's definition?"
choices:
  - "It is both too narrow and too broad."
  - "It is a perfect definition."
  - "It is only too narrow."
  - "It is only too broad."
correctAnswer: "It is both too narrow and too broad."
explanation: "It leaves out some museums and lets in some stores, so the boundary fails in both directions."
hint: "Check what it leaves out and what it lets in."
questionGoal: "Diagnose a definition with multiple boundary problems."
misconception: "Assuming every weak definition has only one kind of problem."
```

```question
key: u02_l02_q06_boundary_fill
type: fill-blank
prompt: "Complete the definition check."
sentenceBefore: "A too narrow definition leaves out things that should"
sentenceAfter: "."
choices:
  - "belong"
  - "disagree"
  - "rhyme"
  - "vanish"
correctAnswer: "belong"
explanation: "Too narrow means the boundary is too small."
hint: "Narrow is the one that leaves members outside."
questionGoal: "Recall too-narrow boundary meaning."
misconception: "Confusing too narrow with too broad."
```

### Lesson 3: Examples And Nonexamples

```question
key: u02_l03_q01_example_of_mammal
type: multiple-choice
prompt: "Definition: A mammal is an animal that has hair or fur and feeds milk to its babies. Which is an example?"
choices:
  - "a rabbit"
  - "a frog"
  - "a lizard"
  - "a goldfish"
correctAnswer: "a rabbit"
explanation: "A rabbit fits the definition of mammal."
hint: "Use the definition, not just whether the animal is familiar."
questionGoal: "Use a definition to choose an example."
misconception: "Choosing by familiarity instead of category features."
```

```question
key: u02_l03_q02_nonexample_of_tool
type: multiple-choice
prompt: "Definition: A tool is an object used to help do a job. Which is a nonexample?"
choices:
  - "a screwdriver used to turn screws"
  - "a spoon used to stir soup"
  - "a hammer used to drive nails"
  - "a rainbow seen after rain"
correctAnswer: "a rainbow seen after rain"
explanation: "A rainbow is not an object used to help do a job, so it is a nonexample."
hint: "A nonexample does not fit the definition."
questionGoal: "Use a definition to choose a nonexample."
misconception: "Thinking a nonexample must be completely unrelated to the topic."
```

```question
key: u02_l03_q03_match_example_terms
type: match-pairs
prompt: "Match each term to its meaning."
pairs:
  - left: "Example"
    right: "a case that fits the definition"
  - left: "Nonexample"
    right: "a case that does not fit the definition"
  - left: "Boundary"
    right: "the line between belongs and does not belong"
explanation: "Examples and nonexamples help test the boundary of a category."
hint: "Think about what belongs and what stays out."
questionGoal: "Connect example/nonexample vocabulary to definition testing."
misconception: "Treating nonexamples as useless side information."
```

```question
key: u02_l03_q04_complete_example_nonexample
type: multi-blank-cloze
prompt: "Complete the category-testing sentence."
parts:
  - "An "
  - " fits the definition. A "
  - " does not fit it."
blanks:
  - correctAnswer: "example"
    choices:
      - "example"
      - "objection"
      - "cause"
  - correctAnswer: "nonexample"
    choices:
      - "nonexample"
      - "premise"
      - "source"
explanation: "Examples fit; nonexamples do not fit."
hint: "The prefix 'non-' means not."
questionGoal: "Use example and nonexample terms accurately."
misconception: "Reversing example and nonexample roles."
```

```question
key: u02_l03_q05_game_category_passage
type: passage-question
prompt: "Read the definition and classify the case."
passageTitle: "Game Definition"
passage: |
  Definition: A game is an activity with rules and a goal. Sam says, "Soccer is a game because players follow rules and try to score."
question: "How is Sam using soccer?"
choices:
  - "as an example"
  - "as a nonexample"
  - "as a conclusion with no support"
  - "as a red herring"
correctAnswer: "as an example"
explanation: "Soccer fits the definition, so it is being used as an example."
hint: "Ask whether the case fits the definition."
questionGoal: "Identify a case used as an example in context."
misconception: "Confusing example with conclusion."
```

```question
key: u02_l03_q06_best_feature
type: multiple-choice
prompt: "Definition: A school supply is something a student uses for schoolwork. Which feature matters most for deciding if a notebook belongs?"
choices:
  - "It is used for schoolwork."
  - "It has a blue cover."
  - "It was bought on a Saturday."
  - "It fits in a backpack."
correctAnswer: "It is used for schoolwork."
explanation: "The definition makes use for schoolwork the important feature."
hint: "Look back at the definition's boundary."
questionGoal: "Identify the feature that makes a case fit a definition."
misconception: "Using surface details instead of the defining feature."
```

### Lesson 4: Counterexamples That Change The Rule

```question
key: u02_l04_q01_bird_counterexample
type: multiple-choice
prompt: "Claim: 'All birds can fly.' Which is a counterexample?"
choices:
  - "An ostrich is a bird that cannot fly."
  - "A robin is a bird that can fly."
  - "A bat can fly but is not a bird."
  - "A kite can fly but is not alive."
correctAnswer: "An ostrich is a bird that cannot fly."
explanation: "A counterexample must fit the group in the claim and make the claim false."
hint: "Look for a bird that does not do what the claim says all birds do."
questionGoal: "Choose a valid counterexample to a universal claim."
misconception: "Choosing any related exception, even outside the claimed group."
```

```question
key: u02_l04_q02_not_counterexample
type: multiple-choice
prompt: "Claim: 'All school buses are yellow.' Which choice is NOT a counterexample?"
choices:
  - "A yellow school bus parked outside."
  - "A white school bus used by a camp."
  - "A blue school bus in another city."
  - "A green school bus in a parade."
correctAnswer: "A yellow school bus parked outside."
explanation: "A yellow school bus fits the claim instead of showing it false."
hint: "A counterexample has to make the claim false."
questionGoal: "Recognize when a case is not a counterexample."
misconception: "Thinking any example from the same topic is a counterexample."
```

```question
key: u02_l04_q03_revise_all_claim
type: multiple-choice
prompt: "Evidence: One quiet dog and one loud dog live on the same street. Which claim is most careful?"
choices:
  - "Some dogs are quiet, and some dogs are loud."
  - "All dogs are quiet."
  - "No dogs are loud."
  - "Every animal on the street is a dog."
correctAnswer: "Some dogs are quiet, and some dogs are loud."
explanation: "The evidence supports a careful claim about some dogs, not an all-or-none rule."
hint: "Use a word that matches limited evidence."
questionGoal: "Revise an overstrong rule after counterevidence."
misconception: "Keeping all-or-none wording after seeing a counterexample."
```

```question
key: u02_l04_q04_test_rule_order
type: order-items
prompt: "Put the steps for testing an 'all' claim in order."
items:
  - "If yes, revise the claim."
  - "Find the group named in the claim."
  - "Ask whether any case in that group breaks the rule."
  - "Read what the claim says all members do."
correctOrder:
  - "Find the group named in the claim."
  - "Read what the claim says all members do."
  - "Ask whether any case in that group breaks the rule."
  - "If yes, revise the claim."
explanation: "A counterexample test checks the group and rule before deciding whether the claim must change."
hint: "Start by finding who or what the claim is about."
questionGoal: "Sequence a counterexample-testing routine."
misconception: "Looking for exceptions before understanding the claim."
```

```question
key: u02_l04_q05_counterexample_passage
type: passage-question
prompt: "Read the claim and choose the best counterexample."
passageTitle: "Library Rule"
passage: |
  Nina says, "Every book in the classroom library is fiction."
question: "Which case would disprove Nina's claim?"
choices:
  - "A classroom library book about volcanoes"
  - "A fiction book about a dragon"
  - "A book with a red cover"
  - "A student reading quietly"
correctAnswer: "A classroom library book about volcanoes"
explanation: "A nonfiction classroom library book would show that not every book there is fiction."
hint: "Find a classroom library book that is not fiction."
questionGoal: "Apply counterexample reasoning in context."
misconception: "Choosing a detail that does not affect the universal claim."
```

```question
key: u02_l04_q06_counterexample_fill
type: fill-blank
prompt: "Complete the counterexample idea."
sentenceBefore: "One real counterexample can show that an 'all' claim is not"
sentenceAfter: "."
choices:
  - "always true"
  - "written down"
  - "about anything"
  - "a sentence"
correctAnswer: "always true"
explanation: "A counterexample shows that a universal claim is not true in every case."
hint: "The key word in an all claim is about every case."
questionGoal: "State the effect of a counterexample on a universal claim."
misconception: "Thinking counterexamples are too small to affect universal claims."
```

## Unit 3: Testing Reasons, Examples, And Analogies

### Lesson 1: Relevant Reasons

```question
key: u03_l01_q01_choose_relevant_reason
type: multiple-choice
prompt: "Claim: 'The class should water the garden today.' Which reason is most relevant?"
choices:
  - "The soil is dry and the plants are wilting."
  - "The garden has a wooden sign."
  - "Some students like carrots."
  - "The classroom clock is round."
correctAnswer: "The soil is dry and the plants are wilting."
explanation: "Dry soil and wilting plants directly support the claim that the garden needs water."
hint: "Ask which reason connects to watering today."
questionGoal: "Choose a relevant reason for a claim."
misconception: "Choosing a topic-related detail instead of support for the exact claim."
```

```question
key: u03_l01_q02_true_but_irrelevant
type: multiple-choice
prompt: "Claim: 'This backpack is too heavy for the hike.' Which reason is true but irrelevant?"
choices:
  - "The backpack weighs 22 pounds."
  - "The hiker is supposed to carry only 10 pounds."
  - "The backpack is bright purple."
  - "The trail is five miles long."
correctAnswer: "The backpack is bright purple."
explanation: "The color may be true, but it does not support the claim about weight."
hint: "A reason can be true and still not answer the claim."
questionGoal: "Identify a true but irrelevant reason."
misconception: "Treating true details as automatically relevant."
```

```question
key: u03_l01_q03_match_claim_relevant_reason
type: match-pairs
prompt: "Match each claim to the reason that best supports it."
pairs:
  - left: "The hallway is crowded after lunch."
    right: "Students from three grades leave the cafeteria at the same time."
  - left: "The team should practice passing."
    right: "Most missed plays happened when players tried to pass."
  - left: "The poster needs larger letters."
    right: "People across the room cannot read it."
explanation: "A relevant reason connects directly to the exact claim."
hint: "Match by the problem each claim is about."
questionGoal: "Connect claims with relevant support."
misconception: "Matching by repeated words instead of logical fit."
```

```question
key: u03_l01_q04_relevance_passage
type: passage-question
prompt: "Read the argument and evaluate the reason."
passageTitle: "Class Song"
passage: |
  Ava says, "We should choose this song for the concert because it has only a few hard notes."
question: "Why is Ava's reason relevant?"
choices:
  - "It connects to whether the class can perform the song well."
  - "It tells the song's color."
  - "It changes the topic to lunch."
  - "It proves every song is easy."
correctAnswer: "It connects to whether the class can perform the song well."
explanation: "The difficulty of the notes matters to choosing a song for a concert."
hint: "Ask what the claim is about: choosing a song to perform."
questionGoal: "Explain why a reason is relevant in context."
misconception: "Thinking relevance means the reason proves the claim completely."
```

```question
key: u03_l01_q05_relevant_fill
type: fill-blank
prompt: "Complete the relevance rule."
sentenceBefore: "A relevant reason connects directly to the"
sentenceAfter: "."
choices:
  - "claim"
  - "weather"
  - "speaker's name"
  - "font"
correctAnswer: "claim"
explanation: "Relevant reasons support the claim being made."
hint: "Relevant support must fit what someone is trying to prove."
questionGoal: "Recall the meaning of relevant support."
misconception: "Treating relevance as a general topic match only."
```

```question
key: u03_l01_q06_relevance_check_order
type: order-items
prompt: "Put the relevance-check steps in order."
items:
  - "Ask whether the reason supports that exact claim."
  - "Find the claim."
  - "Find the reason."
  - "Reject reasons that answer a different question."
correctOrder:
  - "Find the claim."
  - "Find the reason."
  - "Ask whether the reason supports that exact claim."
  - "Reject reasons that answer a different question."
explanation: "You need the claim and reason before you can judge relevance."
hint: "Start with what the argument wants you to accept."
questionGoal: "Sequence a relevance-check routine."
misconception: "Judging a reason before identifying the claim."
```

### Lesson 2: Enough Evidence?

```question
key: u03_l02_q01_one_example_not_all
type: multiple-choice
prompt: "A student says, 'I saw one fast turtle, so all turtles are fast.' What is the main evidence problem?"
choices:
  - "One example is not enough to prove a claim about all turtles."
  - "The claim has no animal in it."
  - "The example is about a plant."
  - "The student used too many examples."
correctAnswer: "One example is not enough to prove a claim about all turtles."
explanation: "One example can support a small claim, but not an all claim about a whole group."
hint: "Compare the amount of evidence with the size of the claim."
questionGoal: "Recognize insufficient evidence for a universal claim."
misconception: "Thinking one example proves all cases."
```

```question
key: u03_l02_q02_cautious_conclusion
type: multiple-choice
prompt: "Evidence: In a survey of 10 classmates, 7 chose art as their favorite special. Which conclusion fits best?"
choices:
  - "In this survey, more classmates chose art than any other special."
  - "Every student in the school likes art best."
  - "No one likes music."
  - "Art is always better than every other special."
correctAnswer: "In this survey, more classmates chose art than any other special."
explanation: "The evidence supports a careful conclusion about this survey, not the whole school or all specials."
hint: "Keep the conclusion inside the evidence you have."
questionGoal: "Choose a conclusion that matches limited evidence."
misconception: "Overgeneralizing from a small sample."
```

```question
key: u03_l02_q03_sufficiency_passage
type: passage-question
prompt: "Read the argument and judge the evidence."
passageTitle: "Pencil Test"
passage: |
  One pencil from a new box broke on the first day. Luis says, "Every pencil in that box is weak."
question: "What is the best evaluation?"
choices:
  - "The evidence supports checking more pencils before making that claim."
  - "One pencil proves every pencil is weak."
  - "The claim is about lunch, not pencils."
  - "The evidence is too much for the claim."
correctAnswer: "The evidence supports checking more pencils before making that claim."
explanation: "One broken pencil is a clue, but more evidence is needed for a claim about every pencil."
hint: "Ask whether the evidence is enough for the word 'every.'"
questionGoal: "Judge whether evidence is sufficient for a broad conclusion."
misconception: "Treating a clue as proof."
```

```question
key: u03_l02_q04_enough_evidence_order
type: order-items
prompt: "Put the evidence-strength check in order."
items:
  - "Choose a conclusion that matches the evidence."
  - "Ask how much and what kind of evidence there is."
  - "Find the strength of the claim."
  - "Watch for words like all, always, most, or some."
correctOrder:
  - "Find the strength of the claim."
  - "Watch for words like all, always, most, or some."
  - "Ask how much and what kind of evidence there is."
  - "Choose a conclusion that matches the evidence."
explanation: "Strong claims need stronger support than small, careful claims."
hint: "Start by noticing how big the claim is."
questionGoal: "Sequence a sufficiency-check routine."
misconception: "Checking evidence amount without noticing claim strength."
```

```question
key: u03_l02_q05_sufficient_fill
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "Sufficient evidence means there is"
sentenceAfter: "support for the conclusion."
choices:
  - "enough"
  - "purple"
  - "hidden"
  - "unrelated"
correctAnswer: "enough"
explanation: "Sufficient means enough for the conclusion being made."
hint: "Think of sufficient as 'enough.'"
questionGoal: "Recall the meaning of sufficient evidence."
misconception: "Treating sufficient as a label for any evidence."
```

```question
key: u03_l02_q06_stronger_evidence
type: multiple-choice
prompt: "Claim: 'Most students in the school want a longer recess.' Which evidence would be strongest?"
choices:
  - "A school-wide anonymous survey with many responses"
  - "One friend saying recess is too short"
  - "A teacher liking recess duty"
  - "A drawing of the playground"
correctAnswer: "A school-wide anonymous survey with many responses"
explanation: "A claim about most students needs evidence from many students, not one person."
hint: "Match the evidence to the size of the group in the claim."
questionGoal: "Select sufficient evidence for a broad claim."
misconception: "Using a single familiar example for a claim about a large group."
```

### Lesson 3: Strong And Weak Analogies

```question
key: u03_l03_q01_strong_analogy
type: multiple-choice
prompt: "Claim: 'The class should rehearse the play before opening night.' Which analogy gives the strongest support?"
choices:
  - "A soccer team practices before a game so the players know what to do."
  - "A play has words, and a dictionary has words."
  - "The stage is made of wood, and pencils are made of wood."
  - "Opening night is at night, and owls are awake at night."
correctAnswer: "A soccer team practices before a game so the players know what to do."
explanation: "The soccer analogy is strong because both situations need practice before a performance."
hint: "Look for the similarity that matters to the claim."
questionGoal: "Choose a strong analogy based on an important similarity."
misconception: "Choosing a surface similarity instead of a relevant one."
```

```question
key: u03_l03_q02_weak_analogy
type: multiple-choice
prompt: "Why is this analogy weak? 'Our class rules should change every day because the weather changes every day.'"
choices:
  - "Weather and class rules are not alike in the part that matters."
  - "Weather is never different."
  - "Class rules cannot be written."
  - "Every analogy with weather is strong."
correctAnswer: "Weather and class rules are not alike in the part that matters."
explanation: "The fact that weather changes does not show that class rules should change daily."
hint: "Ask whether the comparison supports the claim about rules."
questionGoal: "Explain why an analogy is weak."
misconception: "Assuming any shared idea, such as change, makes an analogy strong."
```

```question
key: u03_l03_q03_match_analogy_features
type: match-pairs
prompt: "Match each analogy question to the feature that matters most."
pairs:
  - left: "Should bike riders wear helmets like skaters do?"
    right: "risk of head injury"
  - left: "Should a recipe be followed like science lab steps?"
    right: "need for order and exact actions"
  - left: "Should a library book be handled like borrowed sports gear?"
    right: "care for something that belongs to others"
explanation: "A strong analogy depends on the important shared feature."
hint: "Ignore surface details and find the reason the comparison matters."
questionGoal: "Identify relevant comparison features in analogies."
misconception: "Focusing on unimportant similarities."
```

```question
key: u03_l03_q04_analogy_passage
type: passage-question
prompt: "Read the analogy and evaluate it."
passageTitle: "Practice Journal"
passage: |
  Nina says, "Keeping a reading journal is like keeping a soccer practice log. Both help you notice what you tried and what to improve next."
question: "Why is Nina's analogy fairly strong?"
choices:
  - "Both logs help track practice and improvement."
  - "Books and soccer balls are the same shape."
  - "Reading and soccer always happen outside."
  - "Journals prove every reader is an athlete."
correctAnswer: "Both logs help track practice and improvement."
explanation: "The shared feature matters to the claim about why a journal helps."
hint: "Find the similarity connected to the purpose of the journal."
questionGoal: "Evaluate analogy strength in context."
misconception: "Missing the relevant similarity in an analogy."
```

```question
key: u03_l03_q05_analogy_fill
type: fill-blank
prompt: "Complete the analogy rule."
sentenceBefore: "A strong analogy compares things that are alike in the part that"
sentenceAfter: "."
choices:
  - "matters"
  - "sparkles"
  - "rhymes"
  - "moves"
correctAnswer: "matters"
explanation: "The important similarity must connect to the claim."
hint: "Not every similarity helps the argument."
questionGoal: "Recall the key criterion for a strong analogy."
misconception: "Treating any similarity as enough."
```

```question
key: u03_l03_q06_difference_matters
type: multiple-choice
prompt: "Claim: 'Kids should be allowed to drive cars because they can drive bumper cars.' Which difference matters most?"
choices:
  - "Real cars move on roads with traffic and higher danger."
  - "Bumper cars can be different colors."
  - "Both kinds of cars have seats."
  - "Some bumper cars play music."
correctAnswer: "Real cars move on roads with traffic and higher danger."
explanation: "That difference matters to the safety claim, so the analogy is weak."
hint: "Look for the difference connected to risk and responsibility."
questionGoal: "Identify a relevant difference that weakens an analogy."
misconception: "Ignoring important differences because one similarity exists."
```

### Lesson 4: Generalizations That Need Care

```question
key: u03_l04_q01_fair_generalization
type: multiple-choice
prompt: "Evidence: Three students in one class said they like mystery books. Which claim is fairest?"
choices:
  - "Some students in that class like mystery books."
  - "All students love mystery books."
  - "No students like nonfiction."
  - "Every class prefers mystery books."
correctAnswer: "Some students in that class like mystery books."
explanation: "The evidence supports a careful claim about some students in that class."
hint: "Use wording that fits the small amount of evidence."
questionGoal: "Choose a cautious generalization from limited evidence."
misconception: "Turning a few examples into an all-or-every claim."
```

```question
key: u03_l04_q02_overgeneralization
type: multiple-choice
prompt: "Which sentence is an overgeneralization?"
choices:
  - "One rainy field trip proves field trips are always rainy."
  - "This field trip was rainy."
  - "Some field trips may have bad weather."
  - "Weather can affect outdoor plans."
correctAnswer: "One rainy field trip proves field trips are always rainy."
explanation: "It uses one example to make a claim about all field trips."
hint: "Watch for a very broad claim from very little evidence."
questionGoal: "Identify an overgeneralized claim."
misconception: "Thinking dramatic wording is stronger logic."
```

```question
key: u03_l04_q03_cautious_word_fill
type: fill-blank
prompt: "Complete the careful claim."
sentenceBefore: "Based on two examples,"
sentenceAfter: "games in this set may be quick to learn."
choices:
  - "some"
  - "all"
  - "never"
  - "none"
correctAnswer: "some"
explanation: "Two examples can support 'some,' but not 'all' or 'never.'"
hint: "Choose the word that keeps the claim limited."
questionGoal: "Use cautious quantifier language."
misconception: "Using universal words with limited evidence."
```

```question
key: u03_l04_q04_sample_passage
type: passage-question
prompt: "Read the evidence and choose the best conclusion."
passageTitle: "Garden Survey"
passage: |
  A class asked 12 students whether they wanted more flowers in the school garden. Nine students said yes.
question: "Which conclusion fits the evidence best?"
choices:
  - "In this survey, most of the 12 students wanted more flowers."
  - "Every student in the school wants more flowers."
  - "No one likes vegetables."
  - "The garden must have roses."
correctAnswer: "In this survey, most of the 12 students wanted more flowers."
explanation: "The conclusion should stay with the survey group and the question asked."
hint: "Do not stretch the evidence beyond the 12 students surveyed."
questionGoal: "Choose a generalization that fits a sample."
misconception: "Applying a sample result to a larger group without support."
```

```question
key: u03_l04_q05_match_quantifiers
type: match-pairs
prompt: "Match each word to the size of claim it usually makes."
pairs:
  - left: "all"
    right: "every case in the group"
  - left: "some"
    right: "at least one but not necessarily most"
  - left: "many"
    right: "a large number, but not automatically every case"
explanation: "Careful generalizations use words that match the evidence."
hint: "Think about how much each word promises."
questionGoal: "Connect quantifier words to claim strength."
misconception: "Treating some, many, and all as interchangeable."
```

```question
key: u03_l04_q06_revision_choice
type: multiple-choice
prompt: "Original claim: 'This one hard puzzle means all puzzles in the book are impossible.' Which revision is most logical?"
choices:
  - "This puzzle was hard, so I should try more before judging the whole book."
  - "All puzzles everywhere are impossible."
  - "The book has no puzzles."
  - "A hard puzzle proves the author is wrong about everything."
correctAnswer: "This puzzle was hard, so I should try more before judging the whole book."
explanation: "The revision keeps the evidence limited and asks for more support before a broad claim."
hint: "A good revision avoids stretching one example too far."
questionGoal: "Revise an overgeneralization into a cautious conclusion."
misconception: "Keeping a broad conclusion after limited evidence."
```

## Unit 4: Cause, Correlation, And Source Reliability

### Lesson 1: Cause, Sequence, And Coincidence

```question
key: u04_l01_q01_cause_or_sequence
type: multiple-choice
prompt: "Mia put ice cubes in warm lemonade. A few minutes later, the lemonade was colder. What is the best description?"
choices:
  - "The ice cubes helped cause the lemonade to get colder."
  - "The ice cubes only happened before the cold lemonade by coincidence."
  - "The lemonade caused the ice cubes to appear."
  - "There is no possible connection."
correctAnswer: "The ice cubes helped cause the lemonade to get colder."
explanation: "Ice can lower the temperature of a drink, so this is a reasonable cause claim."
hint: "Ask whether the first event can help make the second event happen."
questionGoal: "Identify a reasonable cause relationship."
misconception: "Avoiding all cause claims even when a clear mechanism is present."
```

```question
key: u04_l01_q02_after_not_cause
type: multiple-choice
prompt: "A student wore green socks, and then the class won a spelling game. What is the fairest conclusion?"
choices:
  - "The socks came before the win, but that does not show they caused it."
  - "The socks definitely caused the win."
  - "The spelling game caused the socks."
  - "Green socks prove all games are easy."
correctAnswer: "The socks came before the win, but that does not show they caused it."
explanation: "Coming before something is not enough evidence for cause."
hint: "Sequence means one thing happened after another."
questionGoal: "Distinguish sequence from proven cause."
misconception: "Assuming earlier events caused later events."
```

```question
key: u04_l01_q03_match_cause_terms
type: match-pairs
prompt: "Match each term to its meaning."
pairs:
  - left: "Cause"
    right: "something that helps make an effect happen"
  - left: "Sequence"
    right: "events happening in order"
  - left: "Coincidence"
    right: "events happening together without shown cause"
explanation: "Cause is stronger than sequence or coincidence."
hint: "Only one term means making something happen."
questionGoal: "Connect cause vocabulary to meaning."
misconception: "Treating every ordered event as a cause."
```

```question
key: u04_l01_q04_cause_passage
type: passage-question
prompt: "Read the scenario and choose the best conclusion."
passageTitle: "Wet Sidewalk"
passage: |
  The sprinklers ran for 20 minutes. Right afterward, the sidewalk beside the sprinklers was wet.
question: "Which conclusion is best supported?"
choices:
  - "The sprinklers probably helped make the sidewalk wet."
  - "The sidewalk caused the sprinklers to run."
  - "The sprinklers prove tomorrow will be rainy."
  - "The wet sidewalk has no possible cause."
correctAnswer: "The sprinklers probably helped make the sidewalk wet."
explanation: "The sprinklers are a plausible cause for the nearby wet sidewalk."
hint: "Look for a connection between the event and the effect."
questionGoal: "Choose a supported cause conclusion in context."
misconception: "Missing a plausible cause when evidence and mechanism are clear."
```

```question
key: u04_l01_q05_cause_fill
type: fill-blank
prompt: "Complete the cause rule."
sentenceBefore: "A cause helps make an"
sentenceAfter: "happen."
choices:
  - "effect"
  - "example"
  - "objection"
  - "opinion"
correctAnswer: "effect"
explanation: "A cause helps produce an effect."
hint: "Cause and effect go together."
questionGoal: "Recall cause/effect vocabulary."
misconception: "Confusing cause with evidence or example."
```

```question
key: u04_l01_q06_causal_caution_order
type: order-items
prompt: "Put the cause-check steps in order."
items:
  - "Ask whether there is a believable connection."
  - "Notice what happened first and second."
  - "Choose a careful conclusion."
  - "Look for other possible causes."
correctOrder:
  - "Notice what happened first and second."
  - "Ask whether there is a believable connection."
  - "Look for other possible causes."
  - "Choose a careful conclusion."
explanation: "Cause reasoning needs more than order; it also checks connection and alternatives."
hint: "Start with the sequence, but do not stop there."
questionGoal: "Sequence a cautious cause-check routine."
misconception: "Stopping at event order instead of checking support."
```

### Lesson 2: Correlation Is A Clue, Not Proof

```question
key: u04_l02_q01_correlation_meaning
type: multiple-choice
prompt: "What does correlation mean?"
choices:
  - "Two things show a pattern together."
  - "One thing has been proven to cause another."
  - "No pattern exists."
  - "A source is always reliable."
correctAnswer: "Two things show a pattern together."
explanation: "Correlation means a pattern or connection appears, but it does not prove cause by itself."
hint: "Correlation is a clue, not proof."
questionGoal: "Define correlation in plain language."
misconception: "Equating correlation with proven cause."
```

```question
key: u04_l02_q02_pattern_not_proof
type: multiple-choice
prompt: "A shop sells more umbrellas on days when more people wear raincoats. What is the fairest conclusion?"
choices:
  - "Umbrella sales and raincoat use are connected, but rain may explain both."
  - "Buying umbrellas causes people to wear raincoats."
  - "Raincoats prove umbrellas are broken."
  - "There is no pattern at all."
correctAnswer: "Umbrella sales and raincoat use are connected, but rain may explain both."
explanation: "The pattern is real, but another factor, rain, may explain both things."
hint: "Ask what else could explain the pattern."
questionGoal: "Treat correlation as a clue that needs explanation."
misconception: "Assuming one correlated event caused the other."
```

```question
key: u04_l02_q03_correlation_passage
type: passage-question
prompt: "Read the observation and choose the best next question."
passageTitle: "Reading Chart"
passage: |
  On weeks when the class reads more pages, the class also earns more vocabulary points.
question: "What is the best next question before claiming reading causes the points?"
choices:
  - "Were there also vocabulary review lessons during those weeks?"
  - "Are pages made of paper?"
  - "Can a chart use blue ink?"
  - "Do points have corners?"
correctAnswer: "Were there also vocabulary review lessons during those weeks?"
explanation: "Review lessons could be another explanation for the higher vocabulary points."
hint: "Look for another factor that could affect the result."
questionGoal: "Choose a next investigation question for a correlation."
misconception: "Accepting a cause claim without checking other factors."
```

```question
key: u04_l02_q04_correlation_check_order
type: order-items
prompt: "Put the correlation-check steps in order."
items:
  - "Ask what else could explain the pattern."
  - "Notice the pattern."
  - "Do not call it proof of cause yet."
  - "Look for more evidence."
correctOrder:
  - "Notice the pattern."
  - "Do not call it proof of cause yet."
  - "Ask what else could explain the pattern."
  - "Look for more evidence."
explanation: "A correlation can start an investigation, but it should not end the reasoning."
hint: "First see the pattern, then stay cautious."
questionGoal: "Sequence a correlation reasoning routine."
misconception: "Jumping straight from pattern to cause."
```

```question
key: u04_l02_q05_clue_not_proof_fill
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "Correlation can be a clue, but it is not"
sentenceAfter: "of cause by itself."
choices:
  - "proof"
  - "paper"
  - "a question"
  - "a definition"
correctAnswer: "proof"
explanation: "A pattern alone does not prove what caused it."
hint: "The missing word means strong evidence that settles a claim."
questionGoal: "Recall that correlation alone does not prove cause."
misconception: "Treating a pattern as enough evidence for causation."
```

```question
key: u04_l02_q06_fair_correlation_conclusion
type: multiple-choice
prompt: "A class notices that students who sleep more often score higher on Friday quizzes. Which conclusion is most careful?"
choices:
  - "More sleep may be connected to higher quiz scores, but we need more evidence about cause."
  - "Sleep always causes perfect quiz scores."
  - "Quiz scores cause students to sleep."
  - "Friday causes sleep."
correctAnswer: "More sleep may be connected to higher quiz scores, but we need more evidence about cause."
explanation: "The cautious conclusion notices the pattern without overclaiming cause."
hint: "Use 'may be connected' when cause is not proven."
questionGoal: "Choose a cautious conclusion from correlational evidence."
misconception: "Turning correlation into a certain cause claim."
```

### Lesson 3: Alternative Explanations

```question
key: u04_l03_q01_alternative_explanation
type: multiple-choice
prompt: "Claim: 'The new pencils made everyone write faster.' Evidence: The class wrote faster on the same day they started using new pencils. Which alternative explanation is plausible?"
choices:
  - "The class had already practiced the writing routine for two weeks."
  - "Pencils are longer than erasers."
  - "The floor has tiles."
  - "Everyone wrote with letters."
correctAnswer: "The class had already practiced the writing routine for two weeks."
explanation: "Practice could also explain why the class wrote faster."
hint: "Look for another cause that could affect writing speed."
questionGoal: "Choose a plausible alternative explanation."
misconception: "Accepting the first cause offered without checking other causes."
```

```question
key: u04_l03_q02_not_any_wild_possibility
type: multiple-choice
prompt: "Which alternative explanation is most reasonable for why the grass was wet in the morning?"
choices:
  - "It rained overnight."
  - "A dragon breathed on it."
  - "The grass learned to swim."
  - "The number seven is lucky."
correctAnswer: "It rained overnight."
explanation: "A good alternative explanation should be plausible and connected to the observation."
hint: "Choose the explanation that could realistically cause wet grass."
questionGoal: "Distinguish plausible alternatives from wild possibilities."
misconception: "Thinking any imaginable possibility counts as a good alternative explanation."
```

```question
key: u04_l03_q03_match_claim_alternative
type: match-pairs
prompt: "Match each cause claim to a plausible alternative explanation."
pairs:
  - left: "The poster worked because it was blue."
    right: "People may have noticed its large letters."
  - left: "The team won because of lucky socks."
    right: "The team may have improved through practice."
  - left: "The plant grew because music played nearby."
    right: "The plant may have received more sunlight and water."
explanation: "Alternative explanations offer other plausible causes for the same result."
hint: "Match by what else could explain the effect."
questionGoal: "Connect cause claims to plausible alternative explanations."
misconception: "Rejecting alternatives that challenge a favorite cause."
```

```question
key: u04_l03_q04_alternative_passage
type: passage-question
prompt: "Read the scenario and choose the best alternative explanation."
passageTitle: "Math Scores"
passage: |
  A class used a new math app for one week. At the end of the week, quiz scores were higher. The teacher wonders whether the app caused the higher scores.
question: "Which alternative explanation should the teacher consider?"
choices:
  - "The class also reviewed the same skills every morning."
  - "The app was new, so it must have caused the higher scores."
  - "The quiz was about math, so no other factor could matter."
  - "The app was popular with students, so the scores prove it worked."
correctAnswer: "The class also reviewed the same skills every morning."
explanation: "Morning review could also explain the higher quiz scores."
hint: "Find another factor that could affect quiz scores."
questionGoal: "Use alternative explanations to evaluate a cause claim."
misconception: "Ignoring other changes that happened at the same time."
```

```question
key: u04_l03_q05_alternative_fill
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "An alternative explanation is another possible"
sentenceAfter: "for what happened."
choices:
  - "reason"
  - "proof"
  - "topic"
  - "opinion"
correctAnswer: "reason"
explanation: "An alternative explanation gives another possible reason for the observation."
hint: "It is another possible cause or reason."
questionGoal: "Recall alternative explanation meaning."
misconception: "Thinking alternatives are unrelated distractions."
```

```question
key: u04_l03_q06_alternative_does_not_disprove
type: multiple-choice
prompt: "Why should we consider alternative explanations?"
choices:
  - "They help us stay cautious before accepting a cause claim."
  - "They automatically prove the first cause is false."
  - "They let us ignore all evidence."
  - "They change every claim into a question."
correctAnswer: "They help us stay cautious before accepting a cause claim."
explanation: "An alternative explanation may show that more evidence is needed. It does not automatically settle the issue."
hint: "Alternatives are checks, not automatic disproof."
questionGoal: "Understand the role of alternative explanations."
misconception: "Thinking one alternative possibility fully disproves a cause claim."
```

### Lesson 4: Trustworthy Sources And Fair Use Of Sources

```question
key: u04_l04_q01_best_source
type: multiple-choice
prompt: "Which source is most reliable for the claim, 'The school garden was planted in April'?"
choices:
  - "The garden club's dated planting log"
  - "A student guessing because April sounds nice"
  - "A poster about a different garden"
  - "A popular song about spring"
correctAnswer: "The garden club's dated planting log"
explanation: "A dated planting log is direct evidence for when the garden was planted."
hint: "Choose the source with direct evidence for this claim."
questionGoal: "Choose a source that fits a factual claim."
misconception: "Choosing a source because it sounds related rather than evidential."
```

```question
key: u04_l04_q02_source_fit
type: match-pairs
prompt: "Match each claim to the source that best fits it."
pairs:
  - left: "What time does the library open?"
    right: "the library's posted schedule"
  - left: "How did the science demo work?"
    right: "the teacher who ran the demo"
  - left: "What did the soccer team score?"
    right: "the official game record"
explanation: "Reliable sources fit the question being asked."
hint: "Match each question with the source most likely to know that information."
questionGoal: "Match sources to claims by reliability and fit."
misconception: "Assuming one source is best for every claim."
```

```question
key: u04_l04_q03_reliability_passage
type: passage-question
prompt: "Read the source description and evaluate it."
passageTitle: "Bike Claim"
passage: |
  A bike shop says, "This helmet passed the safety test." The shop links to the testing lab report with the helmet's model number and date.
question: "Why is the linked lab report useful?"
choices:
  - "It gives specific evidence from a source that tested the helmet."
  - "It is useful only because the shop likes bikes."
  - "It proves every helmet is the same."
  - "It changes the topic from safety to color."
correctAnswer: "It gives specific evidence from a source that tested the helmet."
explanation: "The lab report is relevant evidence for that helmet's safety claim."
hint: "Look for expertise and evidence connected to the claim."
questionGoal: "Evaluate source reliability using evidence and expertise."
misconception: "Trusting or rejecting a source without checking the evidence it provides."
```

```question
key: u04_l04_q04_bias_limit
type: multiple-choice
prompt: "A student reviews her own team's project and says it is the best. What should a careful thinker notice?"
choices:
  - "She may know the project well, but she may also be biased."
  - "Her opinion must be false because she is on the team."
  - "Her opinion must be true because she is confident."
  - "Bias means no one can ever judge anything."
correctAnswer: "She may know the project well, but she may also be biased."
explanation: "Bias is a factor to consider, not an automatic reason to accept or reject everything."
hint: "A source can have strengths and limits."
questionGoal: "Understand bias as a reliability factor."
misconception: "Treating bias as automatic proof or automatic disproof."
```

```question
key: u04_l04_q05_source_checks_fill
type: multi-blank-cloze
prompt: "Complete two source checks."
parts:
  - "Ask whether the source has "
  - " about the topic and whether the source gives "
  - "."
blanks:
  - correctAnswer: "knowledge"
    choices:
      - "knowledge"
      - "paint"
      - "weather"
  - correctAnswer: "evidence"
    choices:
      - "evidence"
      - "volume"
      - "decorations"
explanation: "A reliable source should have relevant knowledge and evidence."
hint: "Think about what makes a source useful for a claim."
questionGoal: "Recall key source reliability checks."
misconception: "Judging reliability by confidence or popularity alone."
```

```question
key: u04_l04_q06_current_source
type: multiple-choice
prompt: "Which source is best for the claim, 'The pool is open today'?"
choices:
  - "Today's update on the pool's official website"
  - "A schedule from five years ago"
  - "A friend's memory from last summer"
  - "A review of a different pool"
correctAnswer: "Today's update on the pool's official website"
explanation: "A current official update is the best fit for whether the pool is open today."
hint: "For a today claim, the date of the source matters."
questionGoal: "Use currency and source fit to judge reliability."
misconception: "Ignoring date when a claim can change over time."
```

## Unit 5: Informal Fallacies And Mixed Argument Analysis

### Lesson 1: Fallacies As Reasoning Errors

```question
key: u05_l01_q01_fallacy_meaning
type: multiple-choice
prompt: "What is a fallacy in logic?"
choices:
  - "a common reasoning error"
  - "a label that proves the opposite claim is true"
  - "a person who disagrees with your claim"
  - "a claim that has weak support but might still be true"
correctAnswer: "a common reasoning error"
explanation: "A fallacy is a common error in reasoning or support."
hint: "A fallacy is about the reasoning, not about insulting a person."
questionGoal: "Define fallacy as a reasoning error."
misconception: "Thinking fallacy means a person or a claim is automatically bad."
```

```question
key: u05_l01_q02_label_not_enough
type: multiple-choice
prompt: "Why is saying only 'That's a fallacy!' not enough?"
choices:
  - "It names a problem without explaining what went wrong in the support."
  - "It gives too much evidence."
  - "It proves the opposite claim."
  - "It is always a question."
correctAnswer: "It names a problem without explaining what went wrong in the support."
explanation: "Good logic explains the reasoning error, not just the label."
hint: "A label should point to an explanation."
questionGoal: "Explain why fallacy labels need reasoning."
misconception: "Treating fallacy names as automatic argument winners."
```

```question
key: u05_l01_q03_match_fallacy_errors
type: match-pairs
prompt: "Match each fallacy label to the reasoning error."
pairs:
  - left: "Hasty generalization"
    right: "jumps from too little evidence"
  - left: "Circular reasoning"
    right: "uses the claim as its own support"
  - left: "Red herring"
    right: "changes to a distracting topic"
explanation: "Each fallacy name points to a specific kind of reasoning problem."
hint: "Match the label to what goes wrong."
questionGoal: "Connect fallacy labels to plain-language errors."
misconception: "Memorizing fallacy names without understanding the error."
```

```question
key: u05_l01_q04_fallacy_fill
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "A fallacy label should help us explain the"
sentenceAfter: "error."
choices:
  - "reasoning"
  - "spelling"
  - "drawing"
  - "volume"
correctAnswer: "reasoning"
explanation: "Fallacies are reasoning errors."
hint: "Logic checks how support works."
questionGoal: "Use the phrase reasoning error accurately."
misconception: "Thinking fallacies are mainly grammar or spelling mistakes."
```

```question
key: u05_l01_q05_fallacy_passage
type: passage-question
prompt: "Read the response and choose the best evaluation."
passageTitle: "Label Only"
passage: |
  Omar says, "The school should add another water fountain because the current line is long." Jen answers, "Fallacy!"
question: "What is missing from Jen's response?"
choices:
  - "an explanation of what reasoning error Omar made, if any"
  - "a louder voice"
  - "a different topic"
  - "a personal attack"
correctAnswer: "an explanation of what reasoning error Omar made, if any"
explanation: "A fallacy label is useful only when it explains a real problem in the reasoning."
hint: "Ask whether Jen explained the support problem."
questionGoal: "Evaluate a label-only fallacy response."
misconception: "Assuming the word fallacy is enough to answer an argument."
```

```question
key: u05_l01_q06_fallacy_check_order
type: order-items
prompt: "Put the fallacy-check steps in order."
items:
  - "Name the fallacy if a label fits."
  - "Find the claim and support."
  - "Explain the reasoning error."
  - "Check what goes wrong with the support."
correctOrder:
  - "Find the claim and support."
  - "Check what goes wrong with the support."
  - "Explain the reasoning error."
  - "Name the fallacy if a label fits."
explanation: "Analysis comes before the label."
hint: "Do the logic work before naming the fallacy."
questionGoal: "Sequence a responsible fallacy-analysis routine."
misconception: "Starting with labels before understanding the argument."
```

### Lesson 2: Spot Hasty, Circular, And False-Choice Reasoning

```question
key: u05_l02_q01_hasty_generalization
type: multiple-choice
prompt: "Which argument is a hasty generalization?"
choices:
  - "One sandwich from that shop was stale, so all food from that shop is bad."
  - "The sandwich was stale because the bread was dry and hard."
  - "Some sandwiches from that shop may be stale."
  - "The shop sells sandwiches and soup."
correctAnswer: "One sandwich from that shop was stale, so all food from that shop is bad."
explanation: "It jumps from one example to a broad claim about all food from the shop."
hint: "Look for too little evidence supporting a big claim."
questionGoal: "Identify hasty generalization."
misconception: "Thinking one example can prove a broad all claim."
```

```question
key: u05_l02_q02_circular_reasoning
type: multiple-choice
prompt: "Which argument uses circular reasoning?"
choices:
  - "This rule is the best because no rule is better than this rule."
  - "This rule is clear because it tells exactly when phones may be used."
  - "This rule may need revision because two parts conflict."
  - "This rule is posted on the wall."
correctAnswer: "This rule is the best because no rule is better than this rule."
explanation: "The support just repeats the claim in different words."
hint: "Ask whether the reason gives new support or just restates the claim."
questionGoal: "Identify circular reasoning."
misconception: "Accepting repeated wording as evidence."
```

```question
key: u05_l02_q03_false_choice
type: multiple-choice
prompt: "Which argument uses a false choice?"
choices:
  - "Either we spend all recess indoors, or no one cares about safety."
  - "We should check the weather before deciding recess plans."
  - "Indoor recess may be safer during lightning."
  - "Some students prefer outdoor recess."
correctAnswer: "Either we spend all recess indoors, or no one cares about safety."
explanation: "It pretends there are only two extreme options when other reasonable choices may exist."
hint: "Watch for an either/or that hides other options."
questionGoal: "Identify false-choice reasoning."
misconception: "Thinking every either/or statement gives all possible choices."
```

```question
key: u05_l02_q04_match_three_fallacies
type: match-pairs
prompt: "Match each fallacy to its error."
pairs:
  - left: "Hasty generalization"
    right: "too little evidence for a broad claim"
  - left: "Circular reasoning"
    right: "the reason repeats the conclusion"
  - left: "False choice"
    right: "other reasonable options are hidden"
explanation: "These fallacies fail in different ways."
hint: "Think: too little evidence, repeated claim, or missing options."
questionGoal: "Distinguish hasty, circular, and false-choice errors."
misconception: "Using one fallacy label for all weak arguments."
```

```question
key: u05_l02_q05_best_fix_passage
type: passage-question
prompt: "Read the argument and choose the best fix."
passageTitle: "Two Options"
passage: |
  A student says, "Either we choose my poster design, or the hallway display will look terrible."
question: "What is the best way to improve the reasoning?"
choices:
  - "Consider other poster designs or ways the display could look good."
  - "Repeat that the student's design is the only good one."
  - "Attack the student who disagrees."
  - "Change the topic to lunch."
correctAnswer: "Consider other poster designs or ways the display could look good."
explanation: "The original argument creates a false choice, so the fix is to consider more reasonable options."
hint: "Ask what option the argument hides."
questionGoal: "Choose a repair for false-choice reasoning."
misconception: "Accepting an either/or frame without checking for alternatives."
```

```question
key: u05_l02_q06_circular_fill
type: fill-blank
prompt: "Complete the circular reasoning description."
sentenceBefore: "Circular reasoning uses the"
sentenceAfter: "as its own support."
choices:
  - "claim"
  - "weather"
  - "source date"
  - "counterexample"
correctAnswer: "claim"
explanation: "Circular reasoning repeats the claim instead of giving real support."
hint: "The support goes in a circle back to the same point."
questionGoal: "Recall the structure of circular reasoning."
misconception: "Thinking repeated claims become stronger support."
```

### Lesson 3: Popularity, Personal Attack, And Red Herring

```question
key: u05_l03_q01_appeal_to_popularity
type: multiple-choice
prompt: "Which argument uses appeal to popularity?"
choices:
  - "This rumor must be true because everyone in the hallway is repeating it."
  - "This rumor is doubtful because no one knows where it started."
  - "This claim needs a reliable source."
  - "Many people heard the rumor, but that does not prove it."
correctAnswer: "This rumor must be true because everyone in the hallway is repeating it."
explanation: "Appeal to popularity treats many people believing or repeating something as proof."
hint: "Look for popularity being used as the main support."
questionGoal: "Identify appeal to popularity."
misconception: "Thinking many believers automatically make a claim true."
```

```question
key: u05_l03_q02_personal_attack
type: multiple-choice
prompt: "Which response is a personal attack instead of a reason about the claim?"
choices:
  - "You are messy, so your recycling idea is wrong."
  - "Your recycling idea needs a plan for emptying the bins."
  - "Your recycling idea could save paper."
  - "Your recycling idea asks for three bins."
correctAnswer: "You are messy, so your recycling idea is wrong."
explanation: "The response attacks the person instead of evaluating the recycling idea."
hint: "Ask whether the response answers the claim or goes after the person."
questionGoal: "Identify personal attack reasoning."
misconception: "Thinking a person's flaw disproves their claim."
```

```question
key: u05_l03_q03_red_herring
type: multiple-choice
prompt: "Which response is a red herring?"
choices:
  - "We are discussing whether homework should be shorter, but let me talk about cafeteria pizza instead."
  - "Homework should be shorter because students need time to read."
  - "Homework should not be shorter until we know how long it takes."
  - "A survey could help answer the homework question."
correctAnswer: "We are discussing whether homework should be shorter, but let me talk about cafeteria pizza instead."
explanation: "A red herring distracts by changing the subject."
hint: "Look for a tempting but off-topic shift."
questionGoal: "Identify red herring reasoning."
misconception: "Treating interesting side topics as relevant support."
```

```question
key: u05_l03_q04_match_distraction_fallacies
type: match-pairs
prompt: "Match each fallacy to its support problem."
pairs:
  - left: "Appeal to popularity"
    right: "uses how many people believe it as proof"
  - left: "Personal attack"
    right: "attacks the person instead of the claim"
  - left: "Red herring"
    right: "distracts with a different topic"
explanation: "These fallacies distract from relevant support in different ways."
hint: "Ask what the response uses instead of evidence for the claim."
questionGoal: "Distinguish popularity, personal attack, and red herring."
misconception: "Blending all relevance failures into one label."
```

```question
key: u05_l03_q05_popularity_passage
type: passage-question
prompt: "Read the argument and choose the best evaluation."
passageTitle: "New Game"
passage: |
  Eli says, "This game must be the best game because it has the most downloads."
question: "What is the reasoning problem?"
choices:
  - "Popularity is being used as proof of quality."
  - "The argument gives too many careful sources."
  - "The argument explains the rules clearly."
  - "The argument gives a counterexample."
correctAnswer: "Popularity is being used as proof of quality."
explanation: "Downloads may be interesting evidence, but popularity alone does not prove best quality."
hint: "Ask whether many people choosing something proves it is best."
questionGoal: "Evaluate appeal to popularity in context."
misconception: "Confusing popularity with reliable evidence."
```

```question
key: u05_l03_q06_relevant_replacement
type: multiple-choice
prompt: "Claim: 'The science display explains magnets clearly.' Which support would be relevant?"
choices:
  - "Three students said the labels helped them understand attraction and repulsion."
  - "The student who made it wears old shoes."
  - "Everyone likes displays with blue borders."
  - "The cafeteria served soup today."
correctAnswer: "Three students said the labels helped them understand attraction and repulsion."
explanation: "This support is about whether the display explains magnets clearly."
hint: "Pick support about the claim, not popularity, person, or side topic."
questionGoal: "Choose relevant support instead of distraction fallacies."
misconception: "Using irrelevant popularity or personal details as support."
```

### Lesson 4: Mixed Argument Clinic

```question
key: u05_l04_q01_best_check_definition
type: multiple-choice
prompt: "Argument: 'All outdoor activities are sports because they happen outside.' Which logic check matters most?"
choices:
  - "Test the definition of sport with examples and nonexamples."
  - "Check whether the source is current."
  - "Ask whether two events are correlated."
  - "Count how many words are in the sentence."
correctAnswer: "Test the definition of sport with examples and nonexamples."
explanation: "The weakness is a definition boundary problem: happening outside is too broad for sport."
hint: "Ask what the argument assumes the word sport means."
questionGoal: "Choose definition testing as the right reasoning check."
misconception: "Applying a recent fallacy label instead of the most fitting logic tool."
```

```question
key: u05_l04_q02_best_check_cause
type: multiple-choice
prompt: "Argument: 'I used a blue pencil and got a good quiz score, so the pencil caused the score.' Which check matters most?"
choices:
  - "Cause and alternative explanations"
  - "Too narrow definition"
  - "Premise spelling"
  - "Question punctuation"
correctAnswer: "Cause and alternative explanations"
explanation: "The argument jumps from sequence to cause and ignores other possible explanations."
hint: "Ask whether the pencil really caused the quiz score."
questionGoal: "Choose causal reasoning as the right check."
misconception: "Treating sequence as proof of cause."
```

```question
key: u05_l04_q03_best_check_source
type: passage-question
prompt: "Read the claim and choose the best check."
passageTitle: "Weather Claim"
passage: |
  A student says, "The picnic will definitely be sunny next month because my cousin guessed it."
question: "Which check is most useful?"
choices:
  - "Ask for a more reliable weather source and a cautious conclusion."
  - "Accept the claim because the cousin sounds confident."
  - "Check whether last month's picnic was sunny and stop there."
  - "Change the topic to whether picnics are fun."
correctAnswer: "Ask for a more reliable weather source and a cautious conclusion."
explanation: "The claim needs a source that fits weather predictions and wording that does not overstate certainty."
hint: "Check both the source and the strength of the claim."
questionGoal: "Choose source reliability and cautious wording for a weak claim."
misconception: "Accepting a weak source because it comes from someone familiar."
```

```question
key: u05_l04_q04_match_weakness_to_fix
type: match-pairs
prompt: "Match each weakness to the best fix."
pairs:
  - left: "One example is used to prove all cases."
    right: "Use a cautious generalization or gather more examples."
  - left: "The reason attacks the speaker."
    right: "Answer the claim with relevant evidence."
  - left: "Two events happened together, so one is called the cause."
    right: "Check for alternative explanations."
explanation: "Different reasoning weaknesses need different fixes."
hint: "Match by what went wrong with the support."
questionGoal: "Select appropriate fixes for mixed reasoning errors."
misconception: "Using the same repair for every weak argument."
```

```question
key: u05_l04_q05_mixed_check_order
type: order-items
prompt: "Put the mixed argument-check routine in order."
items:
  - "Choose the check that fits the weakness."
  - "Find the claim."
  - "Find the support."
  - "Choose a fairer conclusion or better support."
correctOrder:
  - "Find the claim."
  - "Find the support."
  - "Choose the check that fits the weakness."
  - "Choose a fairer conclusion or better support."
explanation: "Mixed analysis starts with argument parts and then chooses the best reasoning check."
hint: "Start with the claim before deciding what is weak."
questionGoal: "Sequence a cumulative Logic 2 argument-check routine."
misconception: "Jumping to a fix before identifying claim and support."
```

```question
key: u05_l04_q06_cumulative_passage
type: passage-question
prompt: "Read the argument and choose the best analysis."
passageTitle: "School Store"
passage: |
  A student says, "The school store should sell only grape snacks. I asked two friends, and they both like grape snacks."
question: "What is the best analysis?"
choices:
  - "The support is too small for an only-grape rule; a broader survey or a cautious claim would be better."
  - "The argument proves every student wants grape snacks."
  - "The argument is mainly about cause and effect."
  - "The best objection is that grapes can be purple."
correctAnswer: "The support is too small for an only-grape rule; a broader survey or a cautious claim would be better."
explanation: "Two friends are not enough evidence for a rule about the whole school store."
hint: "Compare the evidence size with the size of the proposed rule."
questionGoal: "Apply mixed relevance, sufficiency, and generalization checks."
misconception: "Accepting a broad rule from a tiny sample."
```
