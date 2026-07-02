# Level 3 Logic Question Sets

Sources: accepted Level 3 Logic blueprint, course map, unit design briefs, and lesson briefs in `research/logic-3/`.

## Unit 1: Terms, Propositions, And Categorical Language

### Lesson 1: Terms And Categories

```question
key: u01_l01_q01_term_or_claim
type: multiple-choice
prompt: "Which phrase is a term, not a complete proposition?"
choices:
  - "Puzzle games"
  - "All puzzle games are activities."
  - "Some games are quiet."
  - "No riddles are maps."
correctAnswer: "Puzzle games"
explanation: "A term names a category. It does not make a true-or-false claim by itself."
hint: "Look for the choice that names a group but does not say anything true or false about it."
questionGoal: "Distinguish a category term from a complete proposition."
misconception: "Treating any meaningful phrase as a proposition."
```

```question
key: u01_l01_q02_category_examples
type: match-pairs
prompt: "Match each category to an example that belongs in it."
pairs:
  - left: "Board games"
    right: "chess"
  - left: "Musical instruments"
    right: "flute"
  - left: "Library books"
    right: "dictionary"
  - left: "Outdoor games"
    right: "tag"
explanation: "A category can contain many examples. Each right-side item is one member of its category."
hint: "Ask which group each example belongs to."
questionGoal: "Connect categories to fitting examples."
misconception: "Confusing a category with an unrelated example."
```

```question
key: u01_l01_q03_term_names_category
type: fill-blank
prompt: "Complete the logic sentence."
sentenceBefore: "A term names a"
sentenceAfter: "."
choices:
  - "category"
  - "proof"
  - "conclusion"
  - "counterexample"
correctAnswer: "category"
explanation: "In this level, a term is a word or phrase that names a category or class."
hint: "Think about examples like 'mammals' or 'board games.'"
questionGoal: "Check the core definition of term."
misconception: "Using proof or conclusion vocabulary before identifying the category."
```

```question
key: u01_l01_q04_complete_claim
type: multiple-choice
prompt: "Which choice is a complete proposition?"
choices:
  - "Mystery novels"
  - "All mystery novels are books."
  - "Quiet classroom games"
  - "Red and blue markers"
correctAnswer: "All mystery novels are books."
explanation: "A proposition makes a claim that could be true or false. The other choices only name categories or groups."
hint: "A proposition says something about a category."
questionGoal: "Recognize a proposition among category terms."
misconception: "Mistaking a descriptive phrase for a true-or-false claim."
```

```question
key: u01_l01_q05_find_category_term
type: text-input
prompt: "Type the category term in this proposition: All board games are activities."
acceptedAnswers:
  - "board games"
answerType: text
explanation: "The proposition is talking about the category board games."
hint: "Find the group being discussed before the word 'are.'"
questionGoal: "Identify the category term in a simple proposition."
misconception: "Typing the whole proposition instead of the term."
```

```question
key: u01_l01_q06_category_not_one_object
type: multiple-choice
prompt: "Which statement about a category is best?"
choices:
  - "A category can have many examples."
  - "A category must name exactly one object."
  - "A category is always a conclusion."
  - "A category is true or false by itself."
correctAnswer: "A category can have many examples."
explanation: "A category names a class or group, so it can include many examples."
hint: "Think about the category 'books.' It can include many different books."
questionGoal: "Clarify that categories are classes, not single objects or claims."
misconception: "Treating a category as one object or a complete proposition."
```

### Lesson 2: Propositions And Categorical Form

```question
key: u01_l02_q01_proposition_true_false
type: multiple-choice
prompt: "Which sentence is a proposition?"
choices:
  - "Some library books are mysteries."
  - "Please open the book."
  - "Are those books mysteries?"
  - "Mystery books on the shelf"
correctAnswer: "Some library books are mysteries."
explanation: "A proposition is a statement that can be true or false."
hint: "Questions and commands are not propositions."
questionGoal: "Recognize a true-or-false statement."
misconception: "Treating questions or commands as propositions."
```

```question
key: u01_l02_q02_subject_terms
type: match-pairs
prompt: "Match each proposition to its subject term."
pairs:
  - left: "All robins are birds."
    right: "robins"
  - left: "Some board games are puzzles."
    right: "board games"
  - left: "No triangles are circles."
    right: "triangles"
  - left: "Some poems are songs."
    right: "poems"
explanation: "The subject term is the category the proposition starts by discussing."
hint: "Look after the quantifier word, such as all, some, or no."
questionGoal: "Identify subject terms in categorical propositions."
misconception: "Choosing the predicate term because it comes near the end."
```

```question
key: u01_l02_q03_predicate_term
type: fill-blank
prompt: "In 'No reptiles are mammals,' the predicate term is ___."
sentenceBefore: "Predicate term:"
sentenceAfter: ""
choices:
  - "mammals"
  - "reptiles"
  - "no"
  - "are"
correctAnswer: "mammals"
explanation: "The proposition connects the subject term reptiles to the predicate term mammals."
hint: "The predicate term comes after 'are' in this simple categorical form."
questionGoal: "Identify the predicate term in a categorical proposition."
misconception: "Mistaking the subject term or quantifier for the predicate term."
```

```question
key: u01_l02_q04_categorical_frame
type: multi-blank-cloze
prompt: "Complete the labels for the proposition: Some library books are mysteries."
parts:
  - "Subject term: "
  - ". Predicate term: "
  - "."
blanks:
  - correctAnswer: "library books"
    acceptedAnswers:
      - "library books"
  - correctAnswer: "mysteries"
    acceptedAnswers:
      - "mysteries"
explanation: "The subject term is library books, and the predicate term is mysteries."
hint: "Use the words before and after 'are.'"
questionGoal: "Label both terms in a categorical proposition."
misconception: "Breaking a multi-word term into only one word."
```

```question
key: u01_l02_q05_not_proposition
type: multiple-choice
prompt: "Which choice is not a proposition?"
choices:
  - "Close the logic notebook."
  - "All squares are rectangles."
  - "Some cats are black."
  - "No circles are squares."
correctAnswer: "Close the logic notebook."
explanation: "A command tells someone to do something. It is not true or false."
hint: "Find the choice that gives an instruction."
questionGoal: "Distinguish commands from propositions."
misconception: "Assuming every sentence is a proposition."
```

```question
key: u01_l02_q06_correct_term_label
type: error-correction
prompt: "Correct the logic label."
sentence: "In 'Some riddles are puzzles,' the predicate term is riddles."
acceptedAnswers:
  - "In 'Some riddles are puzzles,' the subject term is riddles."
  - "In 'Some riddles are puzzles,' riddles is the subject term."
explanation: "Riddles is the subject term because it is the category being discussed. Puzzles is the predicate term."
hint: "The predicate term in this sentence is puzzles."
questionGoal: "Correct a swapped subject/predicate label."
misconception: "Labeling the first category as the predicate term."
```

### Lesson 3: All, No, Some, And Not All

```question
key: u01_l03_q01_some_meaning
type: multiple-choice
prompt: "In categorical logic, what does 'Some A are B' mean?"
choices:
  - "At least one A is B."
  - "Most A are B."
  - "All A are B."
  - "No A are B."
correctAnswer: "At least one A is B."
explanation: "Some means at least one. It does not tell whether most or all are included."
hint: "Some is a weaker claim than most or all."
questionGoal: "Interpret the quantifier some precisely."
misconception: "Reading some as most or all."
```

```question
key: u01_l03_q02_everyday_to_standard
type: match-pairs
prompt: "Match each everyday claim to its standard categorical form."
pairs:
  - left: "Every chess set is a game item."
    right: "All chess sets are game items."
  - left: "None of the triangles are circles."
    right: "No triangles are circles."
  - left: "At least one poem is funny."
    right: "Some poems are funny texts."
  - left: "Not every puzzle is easy."
    right: "Not all puzzles are easy tasks."
explanation: "A good translation keeps the strength of the original claim."
hint: "Do not turn 'not every' into 'none.'"
questionGoal: "Translate everyday quantifier wording to standard form."
misconception: "Changing the strength of a claim during translation."
```

```question
key: u01_l03_q03_not_all_meaning
type: fill-blank
prompt: "Complete the meaning of 'Not all club members are singers.'"
sentenceBefore: "At least one club member is"
sentenceAfter: "."
choices:
  - "not a singer"
  - "a singer"
  - "every singer"
  - "no club member"
correctAnswer: "not a singer"
explanation: "Not all means there is at least one exception."
hint: "Look for the exception to the all-claim."
questionGoal: "Interpret not all as at least one exception."
misconception: "Treating not all as none."
```

```question
key: u01_l03_q04_no_claim
type: multiple-choice
prompt: "Which standard form matches 'There are no square circles'?"
choices:
  - "No square circles are real shapes."
  - "Some square circles are real shapes."
  - "Not all square circles are real shapes."
  - "All real shapes are square circles."
correctAnswer: "No square circles are real shapes."
explanation: "The phrase 'there are no' is a no-claim. It says the category has no members in the stated group."
hint: "Choose the form that uses no, not some or not all."
questionGoal: "Translate no-language into categorical form."
misconception: "Weakening no into not all or some are not."
```

```question
key: u01_l03_q05_fix_not_all
type: error-correction
prompt: "Correct the explanation."
sentence: "Not all team members are singers means no team members are singers."
acceptedAnswers:
  - "Not all team members are singers means at least one team member is not a singer."
  - "Not all team members are singers means some team members are not singers."
explanation: "Not all does not mean none. It means at least one exception exists."
hint: "Keep the idea of at least one exception."
questionGoal: "Correct a not all versus none confusion."
misconception: "Treating not all as no."
```

```question
key: u01_l03_q06_quantifier_reading
type: passage-question
prompt: "Read the claim and choose what it proves."
passageTitle: "Claim"
passage: |
  Some students in the art club are painters.
question: "What does this claim prove?"
choices:
  - "At least one art club student is a painter."
  - "Most art club students are painters."
  - "All art club students are painters."
  - "No art club students are painters."
correctAnswer: "At least one art club student is a painter."
explanation: "Some proves at least one. It does not prove most or all."
hint: "Stay with the exact strength of the word some."
questionGoal: "Use precise quantifier meaning in a short context."
misconception: "Adding extra meaning to a some-claim."
```

## Unit 2: Venn Diagrams And Category Relationships

### Lesson 1: Venn Basics: Inside, Outside, Overlap

```question
key: u02_l01_q01_overlap_meaning
type: multiple-choice
prompt: "In a Venn diagram with circles for Musicians and Athletes, what does the overlap mean?"
choices:
  - "People who are both musicians and athletes"
  - "People who are musicians but not athletes"
  - "People who are athletes but not musicians"
  - "People who are neither musicians nor athletes"
correctAnswer: "People who are both musicians and athletes"
explanation: "The overlap is the region shared by both circles, so it means membership in both categories."
hint: "Overlap means inside both circles at the same time."
questionGoal: "Interpret the overlap region in a two-circle Venn diagram."
misconception: "Thinking the overlap belongs to only one category."
```

```question
key: u02_l01_q02_region_meanings
type: match-pairs
prompt: "Match each Venn region to its meaning."
pairs:
  - left: "Inside circle A only"
    right: "A but not B"
  - left: "Inside circle B only"
    right: "B but not A"
  - left: "In the overlap"
    right: "both A and B"
  - left: "Outside both circles"
    right: "neither A nor B"
explanation: "Each region tells which categories an item belongs to and does not belong to."
hint: "Ask whether the region is inside A, inside B, inside both, or outside both."
questionGoal: "Map Venn regions to category-membership meanings."
misconception: "Reading outside one circle as outside every category."
```

```question
key: u02_l01_q03_inside_circle
type: fill-blank
prompt: "An item inside the Games circle belongs to the category ___."
sentenceBefore: "Category:"
sentenceAfter: ""
choices:
  - "games"
  - "not games"
  - "both circles"
  - "unknown"
correctAnswer: "games"
explanation: "Being inside a category circle means the item belongs to that category."
hint: "The circle label names the category."
questionGoal: "Interpret membership inside one category circle."
misconception: "Treating the circle label as decoration instead of information."
```

```question
key: u02_l01_q04_item_in_overlap
type: passage-question
prompt: "Read the Venn description and answer."
passageTitle: "Diagram Description"
passage: |
  A Venn diagram has one circle labeled Readers and one circle labeled Artists.
  Mina's X is in the overlap of the two circles.
question: "Which statement must be true about Mina?"
choices:
  - "Mina is a reader and an artist."
  - "Mina is a reader but not an artist."
  - "Mina is an artist but not a reader."
  - "Mina is neither a reader nor an artist."
correctAnswer: "Mina is a reader and an artist."
explanation: "An X in the overlap belongs to both categories."
hint: "The overlap is inside both circles."
questionGoal: "Use an X location to infer category membership."
misconception: "Reading overlap as either-or instead of both."
```

```question
key: u02_l01_q05_outside_both
type: multiple-choice
prompt: "A token is outside both the Pets circle and the Robots circle. What does that location mean?"
choices:
  - "The token is neither a pet nor a robot."
  - "The token is both a pet and a robot."
  - "The token is a pet but not a robot."
  - "The token is a robot but not a pet."
correctAnswer: "The token is neither a pet nor a robot."
explanation: "Outside both circles means outside both categories."
hint: "Outside a circle means not in that category."
questionGoal: "Interpret the outside-both region."
misconception: "Ignoring that the token is outside both categories."
```

```question
key: u02_l01_q06_reading_order
type: order-items
prompt: "Put the Venn-reading steps in a useful order."
items:
  - "Check whether the mark is inside the first circle."
  - "Read the circle labels."
  - "State which categories the mark belongs to."
  - "Check whether the mark is inside the second circle."
correctOrder:
  - "Read the circle labels."
  - "Check whether the mark is inside the first circle."
  - "Check whether the mark is inside the second circle."
  - "State which categories the mark belongs to."
explanation: "The labels tell the categories, and the mark's location tells membership."
hint: "Start by knowing what the circles mean."
questionGoal: "Sequence a careful Venn-region reading process."
misconception: "Guessing category membership before reading the labels and location."
```

### Lesson 2: Diagram All And No Claims

```question
key: u02_l02_q01_all_claim_diagram
type: multiple-choice
prompt: "Which Venn description represents 'All robins are birds'?"
choices:
  - "The Robin circle is completely inside the Bird circle."
  - "The Robin circle and Bird circle do not overlap."
  - "An X is outside the Bird circle but inside the Robin circle."
  - "The Bird circle is completely inside the Robin circle."
correctAnswer: "The Robin circle is completely inside the Bird circle."
explanation: "All robins are birds means every member of the subject category Robin is inside the predicate category Bird."
hint: "For 'All A are B,' the A circle belongs inside B."
questionGoal: "Represent an all-claim as category inclusion."
misconception: "Reversing the subject and predicate categories."
```

```question
key: u02_l02_q02_no_claim_diagram
type: multiple-choice
prompt: "Which Venn description represents 'No squares are circles'?"
choices:
  - "The Square circle and Circle circle have no overlap."
  - "The Square circle is completely inside the Circle circle."
  - "An X is in the overlap of the two circles."
  - "The Circle circle is completely inside the Square circle."
correctAnswer: "The Square circle and Circle circle have no overlap."
explanation: "No squares are circles means the two categories do not share any members."
hint: "A no-claim rules out the overlap."
questionGoal: "Represent a no-claim as exclusion."
misconception: "Confusing no with all or some."
```

```question
key: u02_l02_q03_claim_to_diagram
type: match-pairs
prompt: "Match each claim to the Venn description that fits."
pairs:
  - left: "All tulips are flowers."
    right: "Tulip circle inside Flower circle"
  - left: "No cats are bicycles."
    right: "Cat and Bicycle circles separated"
  - left: "All mystery novels are books."
    right: "Mystery Novel circle inside Book circle"
  - left: "No triangles are rectangles."
    right: "Triangle and Rectangle circles non-overlapping"
explanation: "All claims show inclusion. No claims show exclusion."
hint: "Use inside for all and no overlap for no."
questionGoal: "Match universal and negative claims to Venn relationships."
misconception: "Using the same diagram relationship for all and no claims."
```

```question
key: u02_l02_q04_diagram_all_steps
type: order-items
prompt: "Put the steps for diagramming 'All A are B' in order."
items:
  - "Put the A category inside the B category."
  - "Identify A as the subject term."
  - "Read the quantifier all."
  - "Identify B as the predicate term."
correctOrder:
  - "Read the quantifier all."
  - "Identify A as the subject term."
  - "Identify B as the predicate term."
  - "Put the A category inside the B category."
explanation: "The quantifier and terms tell how the categories should be arranged."
hint: "First read the claim, then place the subject category."
questionGoal: "Sequence the translation from all-claim to Venn inclusion."
misconception: "Placing circles before identifying the terms and quantifier."
```

```question
key: u02_l02_q05_no_overlap
type: fill-blank
prompt: "Complete the diagram meaning: 'No A are B' means the A and B circles have ___."
sentenceBefore: "The circles have"
sentenceAfter: "."
choices:
  - "no overlap"
  - "complete overlap"
  - "one X in the overlap"
  - "unknown labels"
correctAnswer: "no overlap"
explanation: "A no-claim says no member belongs to both categories."
hint: "No A are B rules out the shared region."
questionGoal: "State the Venn meaning of a no-claim."
misconception: "Thinking no still allows an overlap."
```

```question
key: u02_l02_q06_read_universal_diagram
type: passage-question
prompt: "Read the Venn description and choose the claim it represents."
passageTitle: "Diagram Description"
passage: |
  The Skateboard circle is completely inside the Sports Equipment circle.
question: "Which claim does this diagram represent?"
choices:
  - "All skateboards are sports equipment."
  - "No skateboards are sports equipment."
  - "Some sports equipment is not a skateboard."
  - "All sports equipment is skateboards."
correctAnswer: "All skateboards are sports equipment."
explanation: "If the Skateboard circle is inside Sports Equipment, every skateboard is sports equipment."
hint: "The smaller inside circle is the subject of the all-claim."
questionGoal: "Read a universal inclusion diagram as a categorical claim."
misconception: "Reversing all A are B into all B are A."
```

### Lesson 3: Diagram Some And Not All Claims

```question
key: u02_l03_q01_some_overlap_x
type: multiple-choice
prompt: "Where should an X go for 'Some poets are singers'?"
choices:
  - "In the overlap of Poet and Singer"
  - "Inside Poet but outside Singer"
  - "Inside Singer but outside Poet"
  - "Outside both circles"
correctAnswer: "In the overlap of Poet and Singer"
explanation: "Some poets are singers means at least one member belongs to both categories."
hint: "Some A are B needs an example that is both A and B."
questionGoal: "Place an X for a some-overlap claim."
misconception: "Putting the X in only one category."
```

```question
key: u02_l03_q02_not_all_region
type: fill-blank
prompt: "For 'Not all puzzles are easy things,' the X belongs in the part of ___ outside Easy Things."
sentenceBefore: "The X belongs in"
sentenceAfter: "outside Easy Things."
choices:
  - "Puzzles"
  - "Easy Things"
  - "both circles"
  - "neither circle"
correctAnswer: "Puzzles"
explanation: "Not all puzzles are easy means at least one puzzle is not easy."
hint: "The exception is still a puzzle."
questionGoal: "Locate the exception region for a not all claim."
misconception: "Treating not all as no overlap between the categories."
```

```question
key: u02_l03_q03_quantifier_marks
type: match-pairs
prompt: "Match each claim type to the Venn action it needs."
pairs:
  - left: "Some A are B"
    right: "X in the shared A-and-B region"
  - left: "Some A are not B"
    right: "X in A outside B"
  - left: "All A are B"
    right: "A-only region shown empty"
  - left: "No A are B"
    right: "A-and-B overlap shown empty"
explanation: "Different quantifiers require different diagram information."
hint: "Some uses an X. All and no rule out regions."
questionGoal: "Connect quantifier forms to Venn actions."
misconception: "Using one diagram mark for every quantifier."
```

```question
key: u02_l03_q04_some_unknown
type: multiple-choice
prompt: "A diagram has an X in the overlap of Cats and Black Things. What is still unknown?"
choices:
  - "Whether all cats are black things"
  - "Whether at least one cat is black"
  - "Whether the X is a cat"
  - "Whether the X is black"
correctAnswer: "Whether all cats are black things"
explanation: "The X proves at least one cat is black, but it does not prove all cats are black."
hint: "A single X proves some, not all."
questionGoal: "Recognize the limited strength of a some diagram."
misconception: "Overreading some as all."
```

```question
key: u02_l03_q05_fix_x_location
type: error-correction
prompt: "Correct the Venn description."
sentence: "For 'Some games are not team activities,' put an X in the overlap of Games and Team Activities."
acceptedAnswers:
  - "For 'Some games are not team activities,' put an X in Games outside Team Activities."
  - "For 'Some games are not team activities,' put an X in the part of Games outside Team Activities."
explanation: "The claim says at least one game is not a team activity, so the X is in Games but outside Team Activities."
hint: "The word not sends the X outside the predicate category."
questionGoal: "Correct an X placement for a some-are-not claim."
misconception: "Ignoring the not in some are not."
```

```question
key: u02_l03_q06_not_all_translation
type: passage-question
prompt: "Read the claim and choose the matching Venn description."
passageTitle: "Claim"
passage: |
  Not all club projects are group projects.
question: "Which diagram description fits?"
choices:
  - "An X is in Club Projects outside Group Projects."
  - "The Club Projects circle is inside Group Projects."
  - "The Club Projects and Group Projects circles have no overlap."
  - "An X is outside both circles."
correctAnswer: "An X is in Club Projects outside Group Projects."
explanation: "Not all means at least one club project is not a group project."
hint: "Find the exception to the all-claim."
questionGoal: "Translate not all into an exception-region Venn description."
misconception: "Treating not all as no overlap."
```

### Lesson 4: Read What A Venn Diagram Proves

```question
key: u02_l04_q01_supported_claim
type: passage-question
prompt: "Read the Venn description and answer."
passageTitle: "Diagram Description"
passage: |
  The Otter circle is completely inside the Mammal circle.
question: "Which claim is supported?"
choices:
  - "All otters are mammals."
  - "All mammals are otters."
  - "No otters are mammals."
  - "Some otters are not mammals."
correctAnswer: "All otters are mammals."
explanation: "The inside relationship supports all otters are mammals, not the reverse."
hint: "Read from the inside subject circle to the outside category."
questionGoal: "Identify a supported all-claim from a completed diagram."
misconception: "Reversing the direction of inclusion."
```

```question
key: u02_l04_q02_status_reasons
type: match-pairs
prompt: "Match each diagram fact to the conclusion it allows."
pairs:
  - left: "X in the overlap of A and B"
    right: "At least one A is B"
  - left: "A circle completely inside B"
    right: "Every A is B"
  - left: "A and B have no overlap"
    right: "No A is B"
  - left: "X in A outside B"
    right: "At least one A is not B"
explanation: "Each diagram feature supports a specific kind of categorical claim."
hint: "Translate each mark or region into words."
questionGoal: "Connect diagram evidence to supported conclusions."
misconception: "Treating different diagram facts as interchangeable."
```

```question
key: u02_l04_q03_blank_not_false
type: multiple-choice
prompt: "A Venn diagram does not show any X in the overlap of A and B. What can you conclude?"
choices:
  - "The diagram has not proven that some A are B."
  - "No A are B must be true."
  - "All A are B must be true."
  - "Some A are not B must be false."
correctAnswer: "The diagram has not proven that some A are B."
explanation: "A blank-looking region is not automatically an empty region unless the diagram marks it as empty."
hint: "Not shown is different from proven false."
questionGoal: "Distinguish unknown from contradicted in Venn reading."
misconception: "Treating missing information as a no-claim."
```

```question
key: u02_l04_q04_overlap_proves_some
type: passage-question
prompt: "Read the Venn description and answer."
passageTitle: "Diagram Description"
passage: |
  A Venn diagram has an X in the overlap of Volunteers and Gardeners.
question: "Which claim is proved by the diagram?"
choices:
  - "Some volunteers are gardeners."
  - "All volunteers are gardeners."
  - "No volunteers are gardeners."
  - "Not all gardeners are volunteers."
correctAnswer: "Some volunteers are gardeners."
explanation: "An X in the overlap proves at least one member belongs to both categories."
hint: "An X proves existence, not an all-claim."
questionGoal: "Read an overlap X as a some-claim."
misconception: "Overclaiming from one X."
```

```question
key: u02_l04_q05_contradicted_claim
type: multiple-choice
prompt: "A diagram shows the A and B circles with no overlap. Which claim is contradicted?"
choices:
  - "Some A are B."
  - "No A are B."
  - "No B are A."
  - "All A are not B."
correctAnswer: "Some A are B."
explanation: "If there is no overlap, the diagram rules out any member being both A and B."
hint: "A some-overlap claim needs at least one shared member."
questionGoal: "Identify a claim contradicted by an exclusion diagram."
misconception: "Thinking no-overlap diagrams leave overlap claims possible."
```

```question
key: u02_l04_q06_supported_unknown_contradicted
type: fill-blank
prompt: "A diagram with one X in A outside B proves: Some A are ___."
sentenceBefore: "Some A are"
sentenceAfter: "."
choices:
  - "not B"
  - "all B"
  - "no A"
  - "outside A"
correctAnswer: "not B"
explanation: "An X in A outside B proves at least one A is not B."
hint: "The X is still inside A, but it is outside B."
questionGoal: "State the supported claim from an exception-region X."
misconception: "Forgetting the X remains a member of the subject category."
```

## Unit 3: Standard-Form Syllogisms

### Lesson 1: Premises, Conclusions, And Standard Form

```question
key: u03_l01_q01_standard_order
type: order-items
prompt: "Put the argument in standard form."
items:
  - "Therefore all robins are animals."
  - "All birds are animals."
  - "All robins are birds."
correctOrder:
  - "All robins are birds."
  - "All birds are animals."
  - "Therefore all robins are animals."
explanation: "Standard form lists the premises first and the conclusion last."
hint: "The sentence beginning with therefore is the conclusion."
questionGoal: "Order a simple syllogism into standard form."
misconception: "Putting the conclusion before the supporting premises."
```

```question
key: u03_l01_q02_find_conclusion
type: multiple-choice
prompt: "In this argument, which sentence is the conclusion? 'All comics are books. All books are reading materials. Therefore all comics are reading materials.'"
choices:
  - "All comics are reading materials."
  - "All comics are books."
  - "All books are reading materials."
  - "All reading materials are comics."
correctAnswer: "All comics are reading materials."
explanation: "The conclusion is the claim after therefore. The other two sentences are premises."
hint: "Look for the claim being supported by the other two statements."
questionGoal: "Identify the conclusion in a standard-form syllogism."
misconception: "Choosing a premise because it appears first."
```

```question
key: u03_l01_q03_labeled_argument
type: multi-blank-cloze
prompt: "Complete the labels for the argument."
parts:
  - "Premise 1: All squares are rectangles. Premise 2: All rectangles are shapes. Conclusion: "
  - "."
blanks:
  - correctAnswer: "All squares are shapes"
    acceptedAnswers:
      - "All squares are shapes"
      - "all squares are shapes"
explanation: "The conclusion connects squares to shapes using the two premises."
hint: "Use the first term from Premise 1 and the last category from Premise 2."
questionGoal: "Complete a standard-form syllogism conclusion."
misconception: "Repeating a premise instead of stating the supported conclusion."
```

```question
key: u03_l01_q04_premise_count
type: passage-question
prompt: "Read the short argument and answer."
passageTitle: "Argument"
passage: |
  All team captains are players.
  Some players are goalkeepers.
  Therefore some team captains are goalkeepers.
question: "How many premises are listed before the conclusion?"
choices:
  - "2"
  - "1"
  - "3"
  - "0"
correctAnswer: "2"
explanation: "This syllogism has two premises before the therefore conclusion."
hint: "Count the supporting statements before therefore."
questionGoal: "Recognize the two-premise structure of a syllogism."
misconception: "Counting the conclusion as a premise."
```

```question
key: u03_l01_q05_best_standard_form
type: multiple-choice
prompt: "Which choice is written in standard form?"
choices:
  - "All oak trees are plants. All plants are living things. Therefore all oak trees are living things."
  - "Therefore all oak trees are living things. All oak trees are plants. All plants are living things."
  - "All oak trees are living things. Therefore all plants are living things. All oak trees are plants."
  - "All plants are living things. Therefore all oak trees are plants. All oak trees are living things."
correctAnswer: "All oak trees are plants. All plants are living things. Therefore all oak trees are living things."
explanation: "Standard form gives premises first and the conclusion after therefore."
hint: "Choose the argument where therefore comes before the final claim."
questionGoal: "Recognize correct standard-form arrangement."
misconception: "Treating any three related sentences as standard form."
```

```question
key: u03_l01_q06_argument_signals
type: match-pairs
prompt: "Match each signal to its usual job in an argument."
pairs:
  - left: "therefore"
    right: "marks the conclusion"
  - left: "because"
    right: "introduces a reason"
  - left: "for example"
    right: "points to supporting evidence"
  - left: "so"
    right: "often leads into what follows"
explanation: "Signal words can help, but the meaning of the argument still matters."
hint: "Premise signals introduce support. Conclusion signals introduce what is supported."
questionGoal: "Use common signal words to locate premises and conclusions."
misconception: "Depending on sentence order alone instead of argument role."
```

### Lesson 2: Find The Middle Term

```question
key: u03_l02_q01_middle_term_basic
type: multiple-choice
prompt: "Find the middle term: All robins are birds. All birds are animals. Therefore all robins are animals."
choices:
  - "birds"
  - "robins"
  - "animals"
  - "all"
correctAnswer: "birds"
explanation: "Birds appears in both premises and connects robins to animals."
hint: "Look for the term that appears in the premises but not in the conclusion."
questionGoal: "Identify the middle term in a simple syllogism."
misconception: "Choosing one of the conclusion terms as the middle term."
```

```question
key: u03_l02_q02_term_roles
type: match-pairs
prompt: "Match each term from the argument to its role."
pairs:
  - left: "robins"
    right: "conclusion subject"
  - left: "animals"
    right: "conclusion predicate"
  - left: "birds"
    right: "middle connector"
  - left: "all"
    right: "quantifier word"
explanation: "The middle term connects the conclusion's subject and predicate through the premises."
hint: "The conclusion is all robins are animals."
questionGoal: "Distinguish middle term, endpoint terms, and quantifier."
misconception: "Treating the quantifier or conclusion terms as the connector."
```

```question
key: u03_l02_q03_middle_not_conclusion
type: fill-blank
prompt: "In many simple syllogisms, the middle term appears in the premises but not in the ___."
sentenceBefore: "The middle term is usually not in the"
sentenceAfter: "."
choices:
  - "conclusion"
  - "first premise"
  - "second premise"
  - "argument"
correctAnswer: "conclusion"
explanation: "The middle term helps connect the two terms that appear in the conclusion."
hint: "The conclusion contains the two endpoint terms."
questionGoal: "State a common middle-term pattern."
misconception: "Expecting the middle term to be repeated in the conclusion."
```

```question
key: u03_l02_q04_middle_multiword
type: multiple-choice
prompt: "Find the middle term: All science club members are students. All students are school community members. Therefore all science club members are school community members."
choices:
  - "students"
  - "science club members"
  - "school community members"
  - "community"
correctAnswer: "students"
explanation: "Students appears in both premises and links the two conclusion terms."
hint: "Look for the repeated category in the premises."
questionGoal: "Find the middle term when other terms are multi-word phrases."
misconception: "Choosing the longest term instead of the connecting term."
```

```question
key: u03_l02_q05_middle_role
type: multiple-choice
prompt: "What is the job of the middle term?"
choices:
  - "It connects the two terms in the conclusion through the premises."
  - "It tells whether the argument is emotionally persuasive."
  - "It always becomes the final conclusion."
  - "It changes a false premise into a true one."
correctAnswer: "It connects the two terms in the conclusion through the premises."
explanation: "The middle term is the bridge that lets the conclusion terms be related."
hint: "Middle means connector, not final answer."
questionGoal: "Explain the role of the middle term."
misconception: "Treating the middle term as a decorative repeated word."
```

```question
key: u03_l02_q06_type_middle
type: text-input
prompt: "Type the middle term: No reptiles are mammals. All snakes are reptiles. Therefore no snakes are mammals."
acceptedAnswers:
  - "reptiles"
answerType: text
explanation: "Reptiles appears in both premises and connects snakes to mammals."
hint: "Find the repeated category in the premises."
questionGoal: "Produce the middle term from a negative syllogism."
misconception: "Choosing a conclusion term instead of the repeated premise term."
```

### Lesson 3: Test Valid Syllogisms

```question
key: u03_l03_q01_valid_definition
type: multiple-choice
prompt: "What does it mean for a syllogism to be valid?"
choices:
  - "If the premises were true, the conclusion would have to be true."
  - "The conclusion sounds believable."
  - "Every premise is a fact from real life."
  - "The argument uses difficult words."
correctAnswer: "If the premises were true, the conclusion would have to be true."
explanation: "Validity is a must-follow structure test."
hint: "Validity asks what follows from the premises."
questionGoal: "Define validity for a syllogism."
misconception: "Confusing validity with truth or impressiveness."
```

```question
key: u03_l03_q02_choose_valid_conclusion
type: multiple-choice
prompt: "Premises: All lanterns are light sources. All light sources are useful in the dark. Which conclusion follows?"
choices:
  - "All lanterns are useful in the dark."
  - "All useful things in the dark are lanterns."
  - "No lanterns are light sources."
  - "Some light sources are not lanterns."
correctAnswer: "All lanterns are useful in the dark."
explanation: "Lanterns are inside Light Sources, and Light Sources are inside Useful In The Dark, so lanterns are inside that larger category."
hint: "Track the all-chain from lanterns to the final category."
questionGoal: "Select the conclusion that follows from a valid all-chain."
misconception: "Reversing an all-chain."
```

```question
key: u03_l03_q03_valid_test_steps
type: order-items
prompt: "Put the validity-test steps in order."
items:
  - "Ask whether the conclusion must follow."
  - "Identify the premises."
  - "Find the conclusion."
  - "Pretend the premises are true."
correctOrder:
  - "Identify the premises."
  - "Find the conclusion."
  - "Pretend the premises are true."
  - "Ask whether the conclusion must follow."
explanation: "Validity is tested by seeing whether the conclusion must follow from the premises."
hint: "First know the parts of the argument."
questionGoal: "Sequence a structure-first validity test."
misconception: "Checking real-world truth before identifying argument structure."
```

```question
key: u03_l03_q04_negative_valid
type: passage-question
prompt: "Read the argument and answer."
passageTitle: "Syllogism"
passage: |
  No reptiles are mammals.
  All snakes are reptiles.
  Therefore no snakes are mammals.
question: "Is the argument valid?"
choices:
  - "Valid, because snakes are placed inside a category excluded from mammals."
  - "Invalid, because snakes and mammals are both animals."
  - "Invalid, because the conclusion has the word no."
  - "Valid, because every sentence is true in real life."
correctAnswer: "Valid, because snakes are placed inside a category excluded from mammals."
explanation: "If all snakes are reptiles and no reptiles are mammals, then no snakes can be mammals."
hint: "Use the category relationships from the premises."
questionGoal: "Test a valid no-plus-all syllogism."
misconception: "Letting outside knowledge replace the structure test."
```

```question
key: u03_l03_q05_some_valid
type: multiple-choice
prompt: "Premises: Some club members are singers. All singers are performers. Which conclusion follows?"
choices:
  - "Some club members are performers."
  - "All club members are performers."
  - "No club members are performers."
  - "All performers are club members."
correctAnswer: "Some club members are performers."
explanation: "The club members who are singers must also be performers because all singers are performers."
hint: "A some-claim usually supports a some conclusion, not an all conclusion."
questionGoal: "Recognize a valid some-plus-all syllogism."
misconception: "Strengthening some into all."
```

```question
key: u03_l03_q06_valid_or_invalid
type: multiple-choice
prompt: "All roses are flowers. All flowers are plants. Therefore all roses are plants. How should this argument be classified?"
choices:
  - "Valid"
  - "Invalid"
  - "Not a proposition"
  - "A command"
correctAnswer: "Valid"
explanation: "The premises form an all-chain from roses to flowers to plants, so the conclusion must follow."
hint: "Trace the category chain."
questionGoal: "Classify a basic valid syllogism."
misconception: "Missing the transitive all-chain."
```

### Lesson 4: Spot Invalid Syllogisms

```question
key: u03_l04_q01_invalid_shared_predicate
type: multiple-choice
prompt: "All cats are mammals. All dogs are mammals. Therefore all cats are dogs. What is wrong?"
choices:
  - "Sharing the category mammals does not prove cats are dogs."
  - "The conclusion follows because cats and dogs are both mammals."
  - "The argument is valid because all sentences use all."
  - "The problem is only that cats are not real."
correctAnswer: "Sharing the category mammals does not prove cats are dogs."
explanation: "Two categories can both be inside mammals without being the same category."
hint: "Two groups can share a larger group without being each other."
questionGoal: "Diagnose an invalid shared-predicate syllogism."
misconception: "Assuming a shared middle category proves equality."
```

```question
key: u03_l04_q02_invalid_some_chain
type: passage-question
prompt: "Read the argument and answer."
passageTitle: "Syllogism"
passage: |
  Some musicians are students.
  Some students are athletes.
  Therefore some musicians are athletes.
question: "Why is this invalid?"
choices:
  - "The two some-claims might be about different students."
  - "Every some-claim always proves an all-claim."
  - "The conclusion is invalid only because musicians are not real."
  - "The argument has too many premises."
correctAnswer: "The two some-claims might be about different students."
explanation: "One group of students could be musicians, while a different group of students could be athletes."
hint: "Some does not guarantee that the same person is in both groups."
questionGoal: "Identify why two some-premises do not force an overlap conclusion."
misconception: "Assuming repeated middle terms always connect the same members."
```

```question
key: u03_l04_q03_invalid_pattern_match
type: match-pairs
prompt: "Match each invalid pattern to the likely mistake."
pairs:
  - left: "All A are C. All B are C. Therefore all A are B."
    right: "shared larger category"
  - left: "Some A are C. Some C are B. Therefore some A are B."
    right: "two different some groups"
  - left: "All A are B. Some B are C. Therefore some A are C."
    right: "predicate group overreach"
  - left: "No A are C. No B are C. Therefore no A are B."
    right: "shared excluded category"
explanation: "Invalid syllogisms often overclaim what the middle term proves."
hint: "Ask what the middle term actually connects."
questionGoal: "Connect invalid forms to diagnostic mistakes."
misconception: "Treating all formal-looking patterns as valid."
```

```question
key: u03_l04_q04_possible_counterexample
type: multiple-choice
prompt: "All squares are rectangles. Some rectangles are blue shapes. Therefore some squares are blue shapes. Why does the conclusion not have to follow?"
choices:
  - "The blue rectangles might be rectangles that are not squares."
  - "No squares are rectangles."
  - "All rectangles must be squares."
  - "The word some always means none."
correctAnswer: "The blue rectangles might be rectangles that are not squares."
explanation: "The premise about some rectangles does not prove that any of those rectangles are squares."
hint: "Some rectangles can be outside the square category."
questionGoal: "Use a possible counterexample to reject an overclaim."
misconception: "Assuming a some-predicate claim reaches back into the subject category."
```

```question
key: u03_l04_q05_invalid_classification
type: fill-blank
prompt: "If the premises could be true while the conclusion is false, the argument is ___."
sentenceBefore: "The argument is"
sentenceAfter: "."
choices:
  - "invalid"
  - "valid"
  - "sound"
  - "a term"
correctAnswer: "invalid"
explanation: "Invalid means the conclusion does not have to follow from the premises."
hint: "Validity is about must-follow structure."
questionGoal: "State the definition of invalidity."
misconception: "Thinking invalid means only factually false."
```

```question
key: u03_l04_q06_spot_invalid
type: multiple-choice
prompt: "Which argument is invalid?"
choices:
  - "All painters are artists. All sculptors are artists. Therefore all painters are sculptors."
  - "All painters are artists. All artists are creators. Therefore all painters are creators."
  - "No robots are mammals. All helper bots are robots. Therefore no helper bots are mammals."
  - "Some runners are students. All students are learners. Therefore some runners are learners."
correctAnswer: "All painters are artists. All sculptors are artists. Therefore all painters are sculptors."
explanation: "Painters and sculptors can both be artists without all painters being sculptors."
hint: "Look for two groups placed inside the same larger group."
questionGoal: "Identify an invalid syllogism among valid-looking options."
misconception: "Assuming a shared predicate proves one group is the other."
```

## Unit 4: Validity, Truth, And Soundness

### Lesson 1: Validity Is About Structure

```question
key: u04_l01_q01_structure_test
type: multiple-choice
prompt: "Which question tests validity?"
choices:
  - "If the premises were true, would the conclusion have to be true?"
  - "Do I like the conclusion?"
  - "Are all the words familiar?"
  - "Is the argument about a real animal?"
correctAnswer: "If the premises were true, would the conclusion have to be true?"
explanation: "Validity is the structure test: the conclusion must follow from the premises."
hint: "Validity is about what follows, not what sounds familiar."
questionGoal: "Identify the structure-first validity question."
misconception: "Using preference or topic familiarity to judge validity."
```

```question
key: u04_l01_q02_valid_invented
type: passage-question
prompt: "Read the argument and answer."
passageTitle: "Argument"
passage: |
  All glimbers are zorps.
  All zorps are flerns.
  Therefore all glimbers are flerns.
question: "How should the structure be classified?"
choices:
  - "Valid, because the conclusion follows from the all-chain."
  - "Invalid, because the words are invented."
  - "Invalid, because the conclusion is unfamiliar."
  - "Sound, because invented words are always true."
correctAnswer: "Valid, because the conclusion follows from the all-chain."
explanation: "Invented content can still have valid structure. If all glimbers are zorps and all zorps are flerns, all glimbers must be flerns."
hint: "Pretend the premises are true and track the categories."
questionGoal: "Classify valid structure apart from real-world content."
misconception: "Thinking unfamiliar or invented content makes an argument invalid."
```

```question
key: u04_l01_q03_valid_not_true
type: multiple-choice
prompt: "All dragons are reptiles. All reptiles are animals. Therefore all dragons are animals. What is the best validity judgment?"
choices:
  - "Valid structure, even if the first premise is not a real-world fact."
  - "Invalid structure because dragons are not real."
  - "Valid only if dragons are pets."
  - "Invalid because the conclusion has animals."
correctAnswer: "Valid structure, even if the first premise is not a real-world fact."
explanation: "The conclusion follows from the premises. Validity does not first ask whether dragons exist."
hint: "For validity, temporarily accept the premises and test what follows."
questionGoal: "Separate valid form from factual truth of content."
misconception: "Using a false or fictional premise to call the structure invalid."
```

```question
key: u04_l01_q04_terms_validity_truth
type: match-pairs
prompt: "Match each word to the question it answers."
pairs:
  - left: "valid"
    right: "Does the conclusion have to follow?"
  - left: "invalid"
    right: "Could the premises be true and conclusion false?"
  - left: "true"
    right: "Does this proposition match the facts?"
  - left: "premise"
    right: "What reason is being used?"
explanation: "Truth belongs to propositions. Validity belongs to argument structure."
hint: "Valid and invalid ask about the connection between premises and conclusion."
questionGoal: "Differentiate validity vocabulary from truth and premise vocabulary."
misconception: "Using valid and true as the same label."
```

```question
key: u04_l01_q05_true_conclusion_invalid
type: multiple-choice
prompt: "All cats are mammals. All dogs are mammals. Therefore all cats are dogs. The conclusion is false, but what is the structure problem?"
choices:
  - "The premises do not force the conclusion."
  - "The argument has no middle term at all."
  - "The argument is valid because cats and dogs are mammals."
  - "The argument is sound because both premises are true."
correctAnswer: "The premises do not force the conclusion."
explanation: "Two groups can both be mammals without one group being the other."
hint: "Ask whether the conclusion must follow, not whether some words are related."
questionGoal: "Identify invalid structure apart from the factual status of the conclusion."
misconception: "Assuming shared category membership forces a conclusion."
```

```question
key: u04_l01_q06_structure_first
type: order-items
prompt: "Put the structure-first checking routine in order."
items:
  - "Then consider whether the premises are true if soundness is being asked."
  - "Identify premises and conclusion."
  - "Ask whether the conclusion must follow."
  - "Temporarily treat the premises as true."
correctOrder:
  - "Identify premises and conclusion."
  - "Temporarily treat the premises as true."
  - "Ask whether the conclusion must follow."
  - "Then consider whether the premises are true if soundness is being asked."
explanation: "Validity comes before truth checking when you are testing argument structure."
hint: "Do the structure test before the soundness test."
questionGoal: "Sequence validity checking before truth checking."
misconception: "Starting with factual debate before testing structure."
```

### Lesson 2: Truth Of Premises And Conclusions

```question
key: u04_l02_q01_truth_belongs_to
type: fill-blank
prompt: "Truth and falsehood belong to individual ___."
sentenceBefore: "Truth belongs to"
sentenceAfter: "."
choices:
  - "propositions"
  - "validity"
  - "middle terms"
  - "Venn circles"
correctAnswer: "propositions"
explanation: "A proposition is a statement that can be true or false."
hint: "Think back to statements that can be true or false."
questionGoal: "Connect truth value to propositions."
misconception: "Saying an argument structure itself is true or false."
```

```question
key: u04_l02_q02_single_statement_label
type: multiple-choice
prompt: "A triangle has three sides. Which label fits this one sentence?"
choices:
  - "True proposition"
  - "Valid argument"
  - "Invalid argument"
  - "Syllogism"
correctAnswer: "True proposition"
explanation: "This is one statement, so it can be true or false. It is not an argument by itself."
hint: "Validity needs a premise-conclusion relationship."
questionGoal: "Avoid calling a single true statement valid."
misconception: "Using valid for one proposition."
```

```question
key: u04_l02_q03_truth_vs_validity_prompts
type: match-pairs
prompt: "Match each question to the kind of judgment it asks for."
pairs:
  - left: "Is this premise factually correct?"
    right: "truth judgment"
  - left: "Does the conclusion follow from the premises?"
    right: "validity judgment"
  - left: "Are the premises true and the argument valid?"
    right: "soundness judgment"
  - left: "Which sentence is being supported?"
    right: "conclusion identification"
explanation: "Different logic questions ask for different kinds of answers."
hint: "Look for facts, follows, both checks, or argument parts."
questionGoal: "Sort truth, validity, soundness, and conclusion-identification tasks."
misconception: "Answering every logic prompt with true or false."
```

```question
key: u04_l02_q04_false_proposition
type: multiple-choice
prompt: "Which sentence is a false proposition?"
choices:
  - "A week has eight days."
  - "A square has four sides."
  - "Some books have pages."
  - "No triangles have four equal sides."
correctAnswer: "A week has eight days."
explanation: "A week has seven days, so the statement is false."
hint: "Choose the statement that does not match an ordinary fact."
questionGoal: "Classify a simple proposition by truth value."
misconception: "Treating false proposition as invalid argument."
```

```question
key: u04_l02_q05_not_valid_single_claim
type: error-correction
prompt: "Correct the logic label."
sentence: "The sentence 'All squares are rectangles' is a valid statement."
acceptedAnswers:
  - "The sentence 'All squares are rectangles' is a true proposition."
  - "'All squares are rectangles' is a true proposition."
explanation: "A single statement can be true or false. Validity applies to arguments."
hint: "Replace valid statement with the label for one true-or-false claim."
questionGoal: "Correct misuse of valid for a single proposition."
misconception: "Calling individual statements valid."
```

```question
key: u04_l02_q06_truth_or_structure
type: passage-question
prompt: "Read the task and choose what kind of question it is."
passageTitle: "Task"
passage: |
  Decide whether the premise 'All birds are mammals' matches real-world facts.
question: "What kind of judgment is being requested?"
choices:
  - "Truth judgment"
  - "Validity judgment"
  - "Middle-term search"
  - "Venn region location"
correctAnswer: "Truth judgment"
explanation: "The task asks whether one premise matches facts, so it is about truth."
hint: "The task does not ask whether a conclusion follows."
questionGoal: "Identify when a prompt asks about truth rather than validity."
misconception: "Treating every premise check as an argument-validity check."
```

### Lesson 3: Sound Or Unsound?

```question
key: u04_l03_q01_sound_definition
type: multiple-choice
prompt: "What makes an argument sound?"
choices:
  - "It is valid and all its premises are true."
  - "Its conclusion sounds interesting."
  - "It has at least one true sentence."
  - "It uses a Venn diagram."
correctAnswer: "It is valid and all its premises are true."
explanation: "Soundness requires both valid structure and true premises."
hint: "Soundness is a two-part test."
questionGoal: "Define soundness accurately."
misconception: "Using sound to mean persuasive or pleasant."
```

```question
key: u04_l03_q02_sound_steps
type: order-items
prompt: "Put the soundness test in order."
items:
  - "If both checks pass, call the argument sound."
  - "Check whether the premises are true."
  - "Check whether the argument is valid."
  - "Identify the premises and conclusion."
correctOrder:
  - "Identify the premises and conclusion."
  - "Check whether the argument is valid."
  - "Check whether the premises are true."
  - "If both checks pass, call the argument sound."
explanation: "Soundness combines argument structure with true premises."
hint: "You cannot test soundness until you know the argument's parts."
questionGoal: "Sequence a two-check soundness routine."
misconception: "Skipping validity and checking only factual truth."
```

```question
key: u04_l03_q03_sound_argument
type: passage-question
prompt: "Read the argument and answer."
passageTitle: "Argument"
passage: |
  All squares are rectangles.
  All rectangles are shapes.
  Therefore all squares are shapes.
question: "How should this argument be classified?"
choices:
  - "Sound"
  - "Invalid"
  - "Unsound because a premise is false"
  - "Not an argument"
correctAnswer: "Sound"
explanation: "The structure is valid, and both premises are true."
hint: "Check both structure and premise truth."
questionGoal: "Identify a simple sound argument."
misconception: "Treating soundness as a different test from validity plus truth."
```

```question
key: u04_l03_q04_unsound_false_premise
type: multiple-choice
prompt: "All birds are mammals. All robins are birds. Therefore all robins are mammals. What is the best classification?"
choices:
  - "Unsound because the structure is valid but a premise is false."
  - "Sound because the conclusion follows from the premises."
  - "Invalid because one premise is false."
  - "Not a proposition because robins are animals."
correctAnswer: "Unsound because the structure is valid but a premise is false."
explanation: "The argument form is valid, but 'All birds are mammals' is false, so the argument is unsound."
hint: "False premise affects soundness, not necessarily validity."
questionGoal: "Distinguish valid-but-unsound from invalid."
misconception: "Calling valid structure invalid because a premise is false."
```

```question
key: u04_l03_q05_unsound_invalid
type: multiple-choice
prompt: "All cats are mammals. All dogs are mammals. Therefore all cats are dogs. Why is this unsound?"
choices:
  - "It is invalid, even though the premises are true."
  - "It is valid and all premises are true."
  - "It has no conclusion."
  - "It is unsound only because dogs are not real."
correctAnswer: "It is invalid, even though the premises are true."
explanation: "A sound argument must be valid. This argument's premises do not force the conclusion."
hint: "True premises are not enough for soundness."
questionGoal: "Identify unsoundness caused by invalid structure."
misconception: "Thinking true premises automatically make an argument sound."
```

```question
key: u04_l03_q06_soundness_classification
type: match-pairs
prompt: "Match each case to the best classification."
pairs:
  - left: "Valid structure plus true premises"
    right: "sound"
  - left: "Valid structure plus one false premise"
    right: "unsound from false premise"
  - left: "Invalid structure plus true premises"
    right: "unsound from invalid form"
  - left: "One sentence with no premise-conclusion link"
    right: "not an argument"
explanation: "Soundness requires both valid structure and true premises."
hint: "Ask whether there is an argument, whether it is valid, and whether the premises are true."
questionGoal: "Classify common soundness cases."
misconception: "Using sound for any believable statement."
```

## Unit 5: If-Then Reasoning

### Lesson 1: If-Then Rules

```question
key: u05_l01_q01_if_part
type: multiple-choice
prompt: "In the rule 'If a card is red, then it goes in Box R,' what is the if-part?"
choices:
  - "A card is red"
  - "It goes in Box R"
  - "Box R is red"
  - "The card is not red"
correctAnswer: "A card is red"
explanation: "The if-part gives the condition that triggers the rule."
hint: "Look right after the word if."
questionGoal: "Identify the if-part of a conditional."
misconception: "Choosing the result instead of the condition."
```

```question
key: u05_l01_q02_then_part
type: fill-blank
prompt: "Complete the label: In 'If a player finishes Level 1, then the player unlocks Level 2,' the then-part is ___."
sentenceBefore: "Then-part:"
sentenceAfter: ""
choices:
  - "the player unlocks Level 2"
  - "a player finishes Level 1"
  - "the player starts Level 1"
  - "Level 2 finishes the player"
correctAnswer: "the player unlocks Level 2"
explanation: "The then-part says what follows when the if-part is met."
hint: "Look after the word then."
questionGoal: "Identify the result part of a conditional."
misconception: "Confusing condition with result."
```

```question
key: u05_l01_q03_translate_rule
type: match-pairs
prompt: "Match each ordinary rule to its if-then form."
pairs:
  - left: "Red cards go in Box R."
    right: "If a card is red, then it goes in Box R."
  - left: "Members may use the club room."
    right: "If someone is a member, then that person may use the club room."
  - left: "Finished assignments get a star."
    right: "If an assignment is finished, then it gets a star."
  - left: "Quiet machines stay on the shelf."
    right: "If a machine is quiet, then it stays on the shelf."
explanation: "Each if-then form keeps the same rule and makes its condition visible."
hint: "Use if for the condition and then for what follows."
questionGoal: "Translate ordinary rule wording into if-then form."
misconception: "Changing the rule's direction during translation."
```

```question
key: u05_l01_q04_direct_inference
type: passage-question
prompt: "Read the rule and fact, then choose what follows."
passageTitle: "Rule And Fact"
passage: |
  Rule: If a robot has a blue chip, then it can open Door B.
  Fact: Robot Nia has a blue chip.
question: "What follows?"
choices:
  - "Robot Nia can open Door B."
  - "Every robot that opens Door B has a blue chip."
  - "Robot Nia cannot open Door B."
  - "No robots have blue chips."
correctAnswer: "Robot Nia can open Door B."
explanation: "The if-part is met, so the then-part follows."
hint: "Check whether the fact matches the if-part of the rule."
questionGoal: "Apply a direct conditional inference."
misconception: "Missing the direct result when the condition is met."
```

```question
key: u05_l01_q05_conditional_steps
type: order-items
prompt: "Put the conditional reasoning steps in order."
items:
  - "State the then-part if the if-part is met."
  - "Read the if-part."
  - "Check whether the fact matches the if-part."
  - "Read the then-part."
correctOrder:
  - "Read the if-part."
  - "Read the then-part."
  - "Check whether the fact matches the if-part."
  - "State the then-part if the if-part is met."
explanation: "A direct conditional test follows the rule's direction."
hint: "First identify both parts of the rule."
questionGoal: "Sequence a direct if-then test."
misconception: "Jumping to the result without checking the condition."
```

```question
key: u05_l01_q06_direction_matters
type: multiple-choice
prompt: "Why does the direction of an if-then rule matter?"
choices:
  - "Because if P then Q does not automatically mean if Q then P."
  - "Because the then-part always comes first."
  - "Because every if-then rule is false."
  - "Because the if-part and then-part mean the same thing."
correctAnswer: "Because if P then Q does not automatically mean if Q then P."
explanation: "A conditional gives a one-way rule unless another rule says it also works backward."
hint: "Think about reversing the rule."
questionGoal: "State why conditionals must be read in order."
misconception: "Assuming conditionals automatically work backward."
```

### Lesson 2: Necessary And Sufficient Conditions

```question
key: u05_l02_q01_sufficient_meaning
type: multiple-choice
prompt: "What does sufficient mean in conditional reasoning?"
choices:
  - "Enough to guarantee the result"
  - "Required but never enough"
  - "The opposite of a rule"
  - "A conclusion that is always false"
correctAnswer: "Enough to guarantee the result"
explanation: "A sufficient condition is enough for the then-part to follow."
hint: "Sufficient sounds like enough."
questionGoal: "Define sufficient condition."
misconception: "Confusing sufficient with necessary."
```

```question
key: u05_l02_q02_necessary_meaning
type: fill-blank
prompt: "A necessary condition is something that is ___."
sentenceBefore: "Necessary means"
sentenceAfter: "."
choices:
  - "required"
  - "extra"
  - "impossible"
  - "unrelated"
correctAnswer: "required"
explanation: "A necessary condition must be present for the result or status to hold."
hint: "Necessary means you need it."
questionGoal: "Define necessary condition."
misconception: "Treating necessary as optional or merely helpful."
```

```question
key: u05_l02_q03_chess_team_conditions
type: passage-question
prompt: "Read the rule and answer."
passageTitle: "Rule"
passage: |
  If a student is on the chess team, then the student is a club member.
question: "Which condition is sufficient for being a club member?"
choices:
  - "Being on the chess team"
  - "Being any club member"
  - "Not being on the chess team"
  - "Being a student in the school"
correctAnswer: "Being on the chess team"
explanation: "The rule says being on the chess team is enough to guarantee club membership."
hint: "The if-part is sufficient for the then-part."
questionGoal: "Identify a sufficient condition from an if-then rule."
misconception: "Choosing the then-part as sufficient for the if-part."
```

```question
key: u05_l02_q04_required_condition
type: passage-question
prompt: "Read the rule and answer."
passageTitle: "Rule"
passage: |
  A player may enter the final round only if the player solved the puzzle.
question: "What is required for entering the final round?"
choices:
  - "Solving the puzzle"
  - "Owning a red card"
  - "Being first in line"
  - "Skipping the puzzle"
correctAnswer: "Solving the puzzle"
explanation: "Only if marks a necessary condition. Solving the puzzle is required for entering the final round."
hint: "Only if often points to what is required."
questionGoal: "Identify a necessary condition in an only-if rule."
misconception: "Reading only if as if it guaranteed entry by itself."
```

```question
key: u05_l02_q05_condition_roles
type: match-pairs
prompt: "Match each condition role to its plain-language clue."
pairs:
  - left: "sufficient condition"
    right: "enough to make the result follow"
  - left: "necessary condition"
    right: "required for the result"
  - left: "missing necessary condition"
    right: "blocks the result"
  - left: "met sufficient condition"
    right: "triggers the then-part"
explanation: "Enough and required are the key clues for sufficient and necessary."
hint: "Sufficient is enough. Necessary is required."
questionGoal: "Match condition roles to meaning clues."
misconception: "Collapsing sufficient and necessary into one idea."
```

```question
key: u05_l02_q06_enough_required_frame
type: multi-blank-cloze
prompt: "Complete the condition frames for this rule: If a card is a diamond, then it is red."
parts:
  - "Being a diamond is "
  - " for being red. Being red is "
  - " for being a diamond in this rule."
blanks:
  - correctAnswer: "sufficient"
    acceptedAnswers:
      - "sufficient"
    choices:
      - "sufficient"
      - "necessary"
  - correctAnswer: "necessary"
    acceptedAnswers:
      - "necessary"
    choices:
      - "necessary"
      - "sufficient"
explanation: "Diamond is enough for red. Red is required for diamond because all diamonds are red."
hint: "In if P then Q, P is sufficient for Q, and Q is necessary for P."
questionGoal: "Apply sufficient and necessary roles to a concrete conditional."
misconception: "Reversing the two condition roles."
```

### Lesson 3: Converse And Inverse Traps

```question
key: u05_l03_q01_converse_form
type: multiple-choice
prompt: "Original rule: If an animal is a dog, then it is a mammal. Which statement is the converse?"
choices:
  - "If an animal is a mammal, then it is a dog."
  - "If an animal is a dog, then it is a mammal."
  - "If an animal is not a dog, then it is not a mammal."
  - "If an animal is not a mammal, then it is not a dog."
correctAnswer: "If an animal is a mammal, then it is a dog."
explanation: "The converse reverses the if-part and then-part."
hint: "Converse means the direction is flipped."
questionGoal: "Identify the converse of a conditional."
misconception: "Confusing converse with the original rule or inverse."
```

```question
key: u05_l03_q02_inverse_form
type: multiple-choice
prompt: "Original rule: If a shape is a square, then it has four sides. Which statement is the inverse?"
choices:
  - "If a shape is not a square, then it does not have four sides."
  - "If a shape has four sides, then it is a square."
  - "If a shape is a square, then it has four sides."
  - "If a shape does not have four sides, then it is not a square."
correctAnswer: "If a shape is not a square, then it does not have four sides."
explanation: "The inverse negates both the if-part and the then-part."
hint: "Inverse starts with not P and ends with not Q."
questionGoal: "Identify the inverse of a conditional."
misconception: "Confusing inverse with converse or a valid direct use."
```

```question
key: u05_l03_q03_trap_match
type: match-pairs
prompt: "Match each form for 'If P, then Q' to its name."
pairs:
  - left: "If P, then Q"
    right: "original rule"
  - left: "If Q, then P"
    right: "converse reversal"
  - left: "If not P, then not Q"
    right: "inverse negation"
  - left: "P is true, so Q follows"
    right: "direct inference"
explanation: "The converse reverses the rule. The inverse negates both parts. A direct inference uses the original direction."
hint: "Look for reversed order or added not."
questionGoal: "Classify original, converse, inverse, and direct inference forms."
misconception: "Treating all related conditionals as equivalent."
```

```question
key: u05_l03_q04_converse_error
type: passage-question
prompt: "Read the rule and conclusion."
passageTitle: "Rule And Conclusion"
passage: |
  Rule: If a badge is gold, then it opens Gate G.
  Conclusion: This badge opens Gate G, so it must be gold.
question: "What is the problem?"
choices:
  - "The conclusion reverses the rule."
  - "The conclusion follows directly from the if-part."
  - "The conclusion is a no-claim."
  - "The rule has no then-part."
correctAnswer: "The conclusion reverses the rule."
explanation: "The rule says gold badges open Gate G. It does not say only gold badges open Gate G."
hint: "Opening Gate G is the then-part, not the if-part."
questionGoal: "Identify a converse error in context."
misconception: "Assuming the result proves the condition."
```

```question
key: u05_l03_q05_inverse_error
type: passage-question
prompt: "Read the rule and conclusion."
passageTitle: "Rule And Conclusion"
passage: |
  Rule: If a book is a mystery, then it has clues.
  Conclusion: This book is not a mystery, so it has no clues.
question: "What is the problem?"
choices:
  - "The conclusion uses an inverse that does not automatically follow."
  - "The conclusion follows because all non-mystery books have no clues."
  - "The rule says no books have clues."
  - "The rule is about Venn diagrams, not conditionals."
correctAnswer: "The conclusion uses an inverse that does not automatically follow."
explanation: "A non-mystery book might still have clues. The original rule only tells what follows for mystery books."
hint: "Not P does not automatically prove not Q."
questionGoal: "Identify an inverse error in context."
misconception: "Assuming negating the if-part negates the then-part."
```

```question
key: u05_l03_q06_valid_direct_not_trap
type: multiple-choice
prompt: "Rule: If a number is a multiple of 10, then it ends in 0. Fact: 40 is a multiple of 10. What follows?"
choices:
  - "40 ends in 0."
  - "Every number that ends in 0 is 40."
  - "If a number is not 40, it does not end in 0."
  - "No multiples of 10 end in 0."
correctAnswer: "40 ends in 0."
explanation: "The fact matches the if-part, so the then-part follows directly."
hint: "Use the original rule direction."
questionGoal: "Choose a valid direct inference over converse or inverse traps."
misconception: "Rejecting direct inference or choosing an overclaim."
```

## Unit 6: Translation And Argument Testing

### Lesson 1: Translate Short Arguments

```question
key: u06_l01_q01_find_paragraph_conclusion
type: passage-question
prompt: "Read the argument and choose the conclusion."
passageTitle: "Argument"
passage: |
  Every robotics club member is a student. Some students are programmers. So, some robotics club members are programmers.
question: "Which sentence is the conclusion?"
choices:
  - "Some robotics club members are programmers."
  - "Every robotics club member is a student."
  - "Some students are programmers."
  - "Every programmer is a robotics club member."
correctAnswer: "Some robotics club members are programmers."
explanation: "The word so introduces the conclusion the argument is trying to support."
hint: "Look for the claim that follows from the reasons."
questionGoal: "Identify the conclusion in a compact natural-language argument."
misconception: "Choosing the first premise instead of the supported claim."
```

```question
key: u06_l01_q02_standard_form_order
type: order-items
prompt: "Put the translated argument in standard form."
items:
  - "Therefore some club projects are art projects."
  - "Some club projects are poster projects."
  - "All poster projects are art projects."
correctOrder:
  - "Some club projects are poster projects."
  - "All poster projects are art projects."
  - "Therefore some club projects are art projects."
explanation: "Standard form places the premises first and the conclusion last."
hint: "Put the therefore sentence last."
questionGoal: "Order a translated argument into standard form."
misconception: "Leaving the argument in paragraph order without identifying roles."
```

```question
key: u06_l01_q03_preserve_not_all
type: error-correction
prompt: "Correct the translation."
sentence: "Original: Not every puzzle is easy. Translation: No puzzles are easy."
acceptedAnswers:
  - "Original: Not every puzzle is easy. Translation: Not all puzzles are easy."
  - "Original: Not every puzzle is easy. Translation: Some puzzles are not easy."
explanation: "Not every means not all, or some are not. It does not mean no."
hint: "Keep the exception idea without turning it into a no-claim."
questionGoal: "Preserve quantifier strength during translation."
misconception: "Changing not all into no during translation."
```

```question
key: u06_l01_q04_best_translation
type: multiple-choice
prompt: "Which standard-form translation best keeps the meaning of 'All chess team members belong to the school club. Tara is a chess team member. Therefore Tara belongs to the school club'?"
choices:
  - "All chess team members are school club members. Tara is a chess team member. Therefore Tara is a school club member."
  - "All school club members are chess team members. Tara is a school club member. Therefore Tara is a chess team member."
  - "Some chess team members are school club members. Tara is not a chess team member. Therefore Tara is a school club member."
  - "No chess team members are school club members. Tara is a chess team member. Therefore Tara is not in the school club."
correctAnswer: "All chess team members are school club members. Tara is a chess team member. Therefore Tara is a school club member."
explanation: "The correct translation keeps the all direction and the Tara fact."
hint: "Do not reverse the all-claim."
questionGoal: "Choose a meaning-preserving standard-form translation."
misconception: "Reversing the direction of a universal claim."
```

```question
key: u06_l01_q05_argument_parts
type: match-pairs
prompt: "Match each paragraph feature to its standard-form role."
pairs:
  - left: "Because all badges with stars are entry badges"
    right: "premise about a category rule"
  - left: "Milo's badge has a star"
    right: "premise about a specific case"
  - left: "Milo's badge is an entry badge"
    right: "conclusion about that case"
  - left: "therefore"
    right: "conclusion signal"
explanation: "Translation means preserving which statements are reasons and which claim is supported."
hint: "Premises give support. The conclusion is what they support."
questionGoal: "Map natural-language argument features to standard-form roles."
misconception: "Treating signal words or facts as interchangeable."
```

```question
key: u06_l01_q06_some_translation
type: passage-question
prompt: "Read the sentence and choose the best standard-form claim."
passageTitle: "Sentence"
passage: |
  At least one member of the garden club is a photographer.
question: "Which translation preserves the meaning?"
choices:
  - "Some garden club members are photographers."
  - "All garden club members are photographers."
  - "No garden club members are photographers."
  - "Not all photographers are garden club members."
correctAnswer: "Some garden club members are photographers."
explanation: "At least one translates to some."
hint: "Do not make the claim stronger than at least one."
questionGoal: "Translate at-least-one wording into a some-claim."
misconception: "Strengthening some into all."
```

### Lesson 2: Choose The Right Logic Tool

```question
key: u06_l02_q01_tool_match
type: match-pairs
prompt: "Match each argument feature to a useful logic tool."
pairs:
  - left: "All, no, and some category claims"
    right: "Venn diagram"
  - left: "Two categorical premises and a conclusion"
    right: "syllogism test"
  - left: "Valid plus true premises?"
    right: "soundness check"
  - left: "If-then rule direction"
    right: "conditional test"
explanation: "The structure of the argument tells which tool will help."
hint: "Look for categories, two-premise form, truth-plus-validity, or if-then language."
questionGoal: "Match reasoning structures to appropriate tools."
misconception: "Using the same tool for every argument."
```

```question
key: u06_l02_q02_best_tool_categories
type: multiple-choice
prompt: "A prompt asks whether a diagram proves 'Some athletes are musicians.' Which tool is most useful?"
choices:
  - "Venn diagram reading"
  - "Converse test"
  - "Soundness check"
  - "Question-command sorting"
correctAnswer: "Venn diagram reading"
explanation: "The prompt is about a categorical some-claim and diagram evidence."
hint: "Some, all, and no category claims often fit Venn reasoning."
questionGoal: "Choose a Venn tool for categorical diagram evidence."
misconception: "Using conditional tools for category-relationship claims."
```

```question
key: u06_l02_q03_best_tool_conditional
type: multiple-choice
prompt: "A prompt says: 'If a card is gold, then it opens Gate G. This card opens Gate G. Does it have to be gold?' Which tool fits best?"
choices:
  - "Conditional rule direction test"
  - "Venn no-overlap test"
  - "Subject-predicate term labeling only"
  - "Fact-family check"
correctAnswer: "Conditional rule direction test"
explanation: "The prompt asks whether an if-then rule works backward."
hint: "Look for if-then language."
questionGoal: "Choose a conditional test for a rule-direction problem."
misconception: "Treating conditional arguments as categorical diagrams."
```

```question
key: u06_l02_q04_best_tool_soundness
type: multiple-choice
prompt: "A prompt asks whether an argument is valid and has true premises. Which tool fits?"
choices:
  - "Soundness check"
  - "Venn region naming only"
  - "Converse identification only"
  - "Term versus proposition sorting"
correctAnswer: "Soundness check"
explanation: "Soundness is the combined test of valid structure and true premises."
hint: "Valid plus true premises points to soundness."
questionGoal: "Choose a soundness tool when both validity and premise truth are requested."
misconception: "Checking only validity when soundness is asked."
```

```question
key: u06_l02_q05_tool_selection_passage
type: passage-question
prompt: "Read the task and choose the best first tool."
passageTitle: "Task"
passage: |
  All library helpers are volunteers.
  All volunteers are school community members.
  Therefore all library helpers are school community members.
question: "Which tool is the best first choice?"
choices:
  - "Syllogism validity test"
  - "Converse and inverse test"
  - "Truth of one proposition only"
  - "Command sorting"
correctAnswer: "Syllogism validity test"
explanation: "This is a two-premise categorical argument with a conclusion."
hint: "Look for two premises and a therefore conclusion."
questionGoal: "Choose a syllogism test for a standard-form categorical argument."
misconception: "Choosing a tool based on recent topic instead of argument structure."
```

```question
key: u06_l02_q06_tool_choice_steps
type: order-items
prompt: "Put the tool-choice routine in order."
items:
  - "Choose the tool that fits that structure."
  - "Read the prompt for its main structure."
  - "Use the tool to answer only what is asked."
  - "Notice whether it uses categories, if-then rules, or truth plus validity."
correctOrder:
  - "Read the prompt for its main structure."
  - "Notice whether it uses categories, if-then rules, or truth plus validity."
  - "Choose the tool that fits that structure."
  - "Use the tool to answer only what is asked."
explanation: "A careful tool choice starts with structure, not habit."
hint: "Read first, classify the structure second."
questionGoal: "Sequence a deliberate logic-tool selection process."
misconception: "Using the most recent tool automatically."
```

### Lesson 3: Final Argument Tests

```question
key: u06_l03_q01_final_valid_syllogism
type: passage-question
prompt: "Read the argument and classify it."
passageTitle: "Argument"
passage: |
  All stage managers are crew members.
  All crew members are part of the theater team.
  Therefore all stage managers are part of the theater team.
question: "What is the best classification?"
choices:
  - "Valid"
  - "Invalid because the conclusion is first"
  - "Invalid because all is always too strong"
  - "A converse error"
correctAnswer: "Valid"
explanation: "The conclusion follows by an all-chain from stage managers to crew members to theater team."
hint: "Track the category chain."
questionGoal: "Apply syllogism validity testing in a cumulative context."
misconception: "Distrusting a valid all-chain because the conclusion uses all."
```

```question
key: u06_l03_q02_final_converse
type: passage-question
prompt: "Read the rule and conclusion."
passageTitle: "Rule And Conclusion"
passage: |
  Rule: If a ticket has a silver stripe, then it can enter Lane S.
  Conclusion: This ticket can enter Lane S, so it has a silver stripe.
question: "What is the best diagnosis?"
choices:
  - "Converse error"
  - "Valid direct inference"
  - "Sound categorical syllogism"
  - "No quantifier mistake"
correctAnswer: "Converse error"
explanation: "The conclusion reverses the rule. The rule does not say only silver-stripe tickets can enter Lane S."
hint: "The fact gives the then-part, not the if-part."
questionGoal: "Diagnose a conditional reversal in a final mixed set."
misconception: "Assuming the result proves the condition."
```

```question
key: u06_l03_q03_final_soundness
type: multiple-choice
prompt: "All mammals are animals. All dolphins are mammals. Therefore all dolphins are animals. The premises are true. Which classification fits?"
choices:
  - "Sound"
  - "Invalid"
  - "Unsound because a premise is false"
  - "A command, not an argument"
correctAnswer: "Sound"
explanation: "The argument is valid, and the premises are true, so it is sound."
hint: "Sound means valid plus true premises."
questionGoal: "Apply soundness after checking validity and premise truth."
misconception: "Stopping at valid when soundness is requested."
```

```question
key: u06_l03_q04_error_diagnosis_match
type: match-pairs
prompt: "Match each reasoning mistake to its diagnosis."
pairs:
  - left: "Some students are artists, so all students are artists."
    right: "some changed into all"
  - left: "If a card is red, it goes in Box R. It is in Box R, so it is red."
    right: "conditional reversed"
  - left: "All cats are mammals. All dogs are mammals. Therefore all cats are dogs."
    right: "shared larger category"
  - left: "A single true sentence is called valid."
    right: "truth-validity confusion"
explanation: "Each diagnosis names the specific logic move that went wrong."
hint: "Look for quantifier strength, rule direction, middle-term use, or labels."
questionGoal: "Diagnose common Logic 3 reasoning errors."
misconception: "Calling every wrong argument simply invalid without naming why."
```

```question
key: u06_l03_q05_final_test_routine
type: order-items
prompt: "Put the final argument-test routine in order."
items:
  - "Choose the matching logic tool."
  - "Decide what follows and name the reason."
  - "Translate or identify the argument structure."
  - "Read the prompt carefully."
correctOrder:
  - "Read the prompt carefully."
  - "Translate or identify the argument structure."
  - "Choose the matching logic tool."
  - "Decide what follows and name the reason."
explanation: "Careful reasoning starts with reading and translation before tool use and final judgment."
hint: "Do not choose the tool before identifying the structure."
questionGoal: "Sequence the cumulative Logic 3 evaluation routine."
misconception: "Jumping straight to an answer from surface wording."
```

```question
key: u06_l03_q06_final_mixed_argument
type: passage-question
prompt: "Read the argument and answer."
passageTitle: "Argument"
passage: |
  Not all practice puzzles are timed puzzles.
  All timed puzzles are challenge puzzles.
  Therefore all practice puzzles are challenge puzzles.
question: "Why does the conclusion not follow?"
choices:
  - "Not all practice puzzles are timed, so the premises do not put every practice puzzle inside challenge puzzles."
  - "The conclusion follows because all timed puzzles are challenge puzzles."
  - "Not all means no practice puzzles are timed."
  - "The argument is sound because the conclusion sounds useful."
correctAnswer: "Not all practice puzzles are timed, so the premises do not put every practice puzzle inside challenge puzzles."
explanation: "The first premise says at least one practice puzzle is not timed. The premises do not prove that all practice puzzles are challenge puzzles."
hint: "Check the strength of not all before accepting an all conclusion."
questionGoal: "Evaluate a mixed quantifier syllogism and avoid overclaiming."
misconception: "Using one all-premise to overrule a not-all premise."
```
