# Level 3 Grammar Question Sets

Sources: accepted Level 3 Grammar blueprint, course map, unit design briefs, and lesson briefs in `research/grammar-3/`.

## Unit 1: Clause Foundations And Sentence Boundaries

### Lesson 1: Find The Sentence Core

```question
key: u01_l01_q01_find_subject
type: multiple-choice
prompt: "Which word is the subject in this sentence? The quiet turtle crossed the path."
choices:
  - "quiet"
  - "turtle"
  - "crossed"
  - "path"
correctAnswer: "turtle"
explanation: "The sentence is about the turtle. The word quiet describes it, but turtle is the subject."
hint: "Ask who or what crossed the path."
questionGoal: "Identify the subject of a simple sentence."
misconception: "Choosing a describing word or object instead of the subject."
```

```question
key: u01_l01_q02_find_verb_phrase
type: multiple-choice
prompt: "Which words are the main verb phrase in this sentence? Maya and Leo are building a fort."
choices:
  - "Maya and Leo"
  - "are building"
  - "a fort"
  - "building a fort"
correctAnswer: "are building"
explanation: "Are building tells what Maya and Leo are doing, so it is the main verb phrase."
hint: "Find the words that show the action or state of being."
questionGoal: "Identify the main verb phrase in a short sentence."
misconception: "Including the object with the verb phrase or choosing the subject."
```

```question
key: u01_l01_q03_match_core_parts
type: match-pairs
prompt: "Match each subject to its predicate."
pairs:
  - left: "The lantern"
    right: "glowed softly."
  - left: "Our neighbors"
    right: "planted tomatoes."
  - left: "A tiny bell"
    right: "rang in the hall."
  - left: "The old elevator"
    right: "stopped on the third floor."
explanation: "A subject names who or what the sentence is about, and the predicate tells something about it."
hint: "Read each left side with each right side and listen for a complete thought."
questionGoal: "Connect subjects with predicates to form sentence cores."
misconception: "Treating sentence parts as random phrases instead of meaningful core pairs."
```

```question
key: u01_l01_q04_label_core
type: multi-blank-cloze
prompt: "Complete the sentence-core labels for: After lunch, the class read quietly."
parts:
  - "The subject is "
  - ", and the main verb is "
  - "."
blanks:
  - correctAnswer: "class"
    acceptedAnswers:
      - "class"
      - "the class"
  - correctAnswer: "read"
    acceptedAnswers:
      - "read"
explanation: "After lunch tells when. The core is the class read."
hint: "Ignore the opening time phrase first, then find who did the action."
questionGoal: "Identify the core after an introductory phrase."
misconception: "Mistaking an introductory phrase for the sentence core."
```

```question
key: u01_l01_q05_choose_core
type: multiple-choice
prompt: "Which choice shows the sentence core? Under the old bridge, the creek rushed over rocks."
choices:
  - "Under the old bridge"
  - "old bridge rushed"
  - "the creek rushed"
  - "over rocks"
correctAnswer: "the creek rushed"
explanation: "The sentence is about the creek, and rushed is the main verb."
hint: "Remove the where phrases and see what basic sentence remains."
questionGoal: "Separate the core from prepositional details."
misconception: "Choosing a noun inside a prepositional phrase as the subject."
```

```question
key: u01_l01_q06_type_verb_phrase
type: text-input
prompt: "Type the main verb phrase in this sentence: The brothers were laughing at the joke."
acceptedAnswers:
  - "were laughing"
answerType: text
explanation: "Were laughing tells what the brothers were doing."
hint: "Include the helping verb with the action word."
questionGoal: "Produce the main verb phrase from a short sentence."
misconception: "Leaving out the helping verb or typing the object of the action."
```

### Lesson 2: Independent Clauses Stand Alone

```question
key: u01_l02_q01_independent_clause
type: multiple-choice
prompt: "Which word group is an independent clause?"
choices:
  - "Because the gate was locked"
  - "The key was under the mat"
  - "After the last bus"
  - "When the lights flickered"
correctAnswer: "The key was under the mat"
explanation: "The key was under the mat has a subject, a verb, and a complete thought."
hint: "Look for the word group that could stand alone as a sentence."
questionGoal: "Recognize an independent clause among fragments and dependent clauses."
misconception: "Judging completeness by length instead of the complete-thought test."
```

```question
key: u01_l02_q02_complete_thought
type: fill-blank
prompt: "Complete the rule."
sentenceBefore: "An independent clause has a subject, a verb, and a"
sentenceAfter: "thought."
choices:
  - "complete"
  - "missing"
  - "describing"
  - "borrowed"
correctAnswer: "complete"
explanation: "An independent clause can stand alone because it expresses a complete thought."
hint: "Ask whether the idea feels finished."
questionGoal: "State the complete-thought requirement for independent clauses."
misconception: "Thinking subject plus verb is the only requirement."
```

```question
key: u01_l02_q03_match_clause_reason
type: match-pairs
prompt: "Match each word group to the best reason."
pairs:
  - left: "The kite dipped suddenly."
    right: "Independent: it can stand alone."
  - left: "Because the wind changed"
    right: "Dependent: it starts with because."
  - left: "Near the soccer field"
    right: "Fragment: it has no subject-verb core."
  - left: "When Omar opened the box"
    right: "Dependent: it leaves the reader waiting."
explanation: "An independent clause passes both tests. Dependent clauses and fragments need more information."
hint: "Check for a subject, a verb, and a complete thought."
questionGoal: "Connect clause classifications with reasons."
misconception: "Classifying by first impression without naming the missing feature."
```

```question
key: u01_l02_q04_not_independent
type: multiple-choice
prompt: "Why is Although Jada packed lunch not an independent clause?"
choices:
  - "It has no subject."
  - "It has no verb."
  - "Although makes the thought depend on another idea."
  - "It is too short to be a clause."
correctAnswer: "Although makes the thought depend on another idea."
explanation: "Jada packed is a subject and verb, but although makes the reader expect another clause."
hint: "Look at the first word and ask whether the idea feels finished."
questionGoal: "Explain dependency even when a subject and verb are present."
misconception: "Assuming every subject-verb group is independent."
```

```question
key: u01_l02_q05_type_classification
type: text-input
prompt: "Type independent or dependent for this word group: The last candle burned out."
acceptedAnswers:
  - "independent"
answerType: text
explanation: "The last candle burned out can stand alone as a complete sentence."
hint: "Ask whether it has a subject, verb, and complete thought."
questionGoal: "Classify a clear independent clause with a typed response."
misconception: "Thinking a clause must be long or complex to be independent."
```

```question
key: u01_l02_q06_stand_alone_context
type: passage-question
prompt: "Read the word groups and answer the question."
passageTitle: "Stand-Alone Test"
passage: |
  1. While the soup cooled
  2. The bread was ready
  3. On the kitchen counter
question: "Which word group can stand alone as a sentence?"
choices:
  - "1"
  - "2"
  - "3"
  - "None of them"
correctAnswer: "2"
explanation: "The bread was ready has a subject, verb, and complete thought."
hint: "Find the group that does not leave you waiting for more."
questionGoal: "Apply the stand-alone test to a small set of word groups."
misconception: "Mistaking phrases or dependent clauses for complete sentences."
```

### Lesson 3: Dependent Clauses Need A Main Clause

```question
key: u01_l03_q01_dependent_clause
type: multiple-choice
prompt: "Which word group is a dependent clause?"
choices:
  - "The puppy chased the leaf"
  - "If the puppy chased the leaf"
  - "Across the wet grass"
  - "The leaf spun"
correctAnswer: "If the puppy chased the leaf"
explanation: "If makes the clause dependent. It has a subject and verb, but it needs a main clause."
hint: "Look for a starter word that makes the idea unfinished."
questionGoal: "Recognize a dependent clause created by a subordinating word."
misconception: "Treating a subject-verb group as complete even after if."
```

```question
key: u01_l03_q02_match_main_clause
type: match-pairs
prompt: "Match each dependent clause to a main clause that completes it."
pairs:
  - left: "Because the river rose,"
    right: "the trail closed early."
  - left: "When the movie ended,"
    right: "we walked to the lobby."
  - left: "If the printer works,"
    right: "I can make the flyers."
  - left: "Although the puzzle was hard,"
    right: "Nora finished it."
explanation: "Each dependent clause needs a main clause to complete the sentence."
hint: "Choose the ending that makes a logical complete thought."
questionGoal: "Complete dependent clauses with fitting main clauses."
misconception: "Pairing clauses by random topic instead of sentence meaning."
```

```question
key: u01_l03_q03_order_complex_sentence
type: order-items
prompt: "Put the parts in order to make a complete sentence."
items:
  - "we used flashlights"
  - "Because the lights went out"
  - ","
  - "."
correctOrder:
  - "Because the lights went out"
  - ","
  - "we used flashlights"
  - "."
explanation: "Because the lights went out is dependent, so it needs the main clause we used flashlights."
hint: "Start with the because clause, then add the main clause."
questionGoal: "Combine a dependent clause with a main clause in correct order."
misconception: "Leaving a dependent clause alone as a sentence."
```

```question
key: u01_l03_q04_dependency_word
type: fill-blank
prompt: "Choose the word that makes the first clause dependent."
sentenceBefore: ""
sentenceAfter: " the bell rang, the students lined up."
choices:
  - "After"
  - "And"
  - "The"
  - "Students"
correctAnswer: "After"
explanation: "After tells when and makes the first clause depend on the main clause."
hint: "Pick the word that creates a time relationship."
questionGoal: "Identify a dependency word in a sentence frame."
misconception: "Choosing any connector or noun instead of a subordinating word."
```

```question
key: u01_l03_q05_why_not_complete
type: multiple-choice
prompt: "Why does When the snow melted need another clause?"
choices:
  - "It has no subject."
  - "It has no verb."
  - "When makes the reader wait for what happened."
  - "Snow is not a noun."
correctAnswer: "When makes the reader wait for what happened."
explanation: "The clause has a subject and verb, but when makes it dependent."
hint: "Ask what question the clause leaves unanswered."
questionGoal: "Explain why a dependent clause is incomplete."
misconception: "Looking only for subject and verb, not complete thought."
```

```question
key: u01_l03_q06_type_starter
type: text-input
prompt: "Type the starter word that makes this clause dependent: If the creek rises"
acceptedAnswers:
  - "If"
  - "if"
answerType: text
explanation: "If makes the clause depend on a condition and a main clause."
hint: "The starter word is the first word."
questionGoal: "Identify the subordinating starter in a dependent clause."
misconception: "Focusing on the subject or verb instead of the dependency signal."
```

### Lesson 4: Repair Fragments With Complete Thoughts

```question
key: u01_l04_q01_best_fragment_repair
type: multiple-choice
prompt: "Which choice repairs this fragment? Because the trail was muddy."
choices:
  - "Because the trail was muddy, we wore boots."
  - "Because the trail was muddy."
  - "The muddy trail because."
  - "Because muddy."
correctAnswer: "Because the trail was muddy, we wore boots."
explanation: "The repair adds a main clause, we wore boots, to complete the because clause."
hint: "The fragment needs a main clause that tells what happened."
questionGoal: "Choose a complete repair for a dependent-clause fragment."
misconception: "Thinking punctuation alone repairs a fragment."
```

```question
key: u01_l04_q02_add_given_main_clause
type: error-correction
prompt: "Repair the fragment by adding this main clause: we checked the oven."
sentence: "When the timer beeped."
acceptedAnswers:
  - "When the timer beeped, we checked the oven."
explanation: "When the timer beeped is dependent, so it needs the main clause we checked the oven."
hint: "Put the main clause after the when clause and use a comma."
questionGoal: "Repair a dependent fragment with a specified main clause."
misconception: "Leaving the dependent clause as a sentence."
```

```question
key: u01_l04_q03_match_fragment_problem
type: match-pairs
prompt: "Match each fragment to the problem it has."
pairs:
  - left: "Because the door stuck"
    right: "Needs a main clause."
  - left: "Ran through the sprinkler"
    right: "Needs a subject."
  - left: "The blue notebook on the desk"
    right: "Needs a verb."
  - left: "After the final question"
    right: "Needs a subject-verb core."
explanation: "Fragments can be incomplete in different ways. Name the missing part before repairing."
hint: "Ask whether each group has a subject, a verb, and a complete thought."
questionGoal: "Diagnose different fragment types."
misconception: "Treating all fragments as if they have the same missing part."
```

```question
key: u01_l04_q04_complete_under_umbrella
type: multiple-choice
prompt: "Which sentence is a complete repair for the fragment Under the bright umbrella?"
choices:
  - "Under the bright umbrella."
  - "We waited under the bright umbrella."
  - "Bright umbrella waiting."
  - "Because under the bright umbrella."
correctAnswer: "We waited under the bright umbrella."
explanation: "We waited gives the fragment a subject and verb, making a complete thought."
hint: "The repair needs someone or something doing or being something."
questionGoal: "Repair a phrase fragment by adding a sentence core."
misconception: "Adding words without creating a complete subject-verb core."
```

```question
key: u01_l04_q05_complete_after_clause
type: fill-blank
prompt: "Choose the ending that completes the sentence."
sentenceBefore: "After the game ended,"
sentenceAfter: "."
choices:
  - "the team packed the bats"
  - "under the benches"
  - "because everyone cheered"
  - "with muddy shoes"
correctAnswer: "the team packed the bats"
explanation: "The team packed the bats is a main clause that completes the introductory dependent clause."
hint: "Choose an ending with a subject and a verb."
questionGoal: "Complete an introductory dependent clause with a main clause."
misconception: "Adding another fragment after a dependent clause."
```

```question
key: u01_l04_q06_order_fragment_repair
type: order-items
prompt: "Put the parts in order to repair the fragment."
items:
  - "."
  - "Nina taped the pieces together"
  - "Because the map tore"
  - ","
correctOrder:
  - "Because the map tore"
  - ","
  - "Nina taped the pieces together"
  - "."
explanation: "The because clause becomes complete when it is connected to the main clause."
hint: "A dependent clause at the start needs a comma before the main clause."
questionGoal: "Sequence a repaired sentence from a dependent fragment and main clause."
misconception: "Keeping the dependent clause separate from the complete idea."
```

## Unit 2: Coordination And Compound Sentences

### Lesson 1: Two Independent Clauses, One Compound Sentence

```question
key: u02_l01_q01_identify_compound
type: multiple-choice
prompt: "Which sentence is a compound sentence?"
choices:
  - "The clock ticked loudly, and the room grew quiet."
  - "After the clock ticked loudly, the room grew quiet."
  - "The clock on the shelf."
  - "The room with the quiet clock."
correctAnswer: "The clock ticked loudly, and the room grew quiet."
explanation: "Both sides are independent clauses joined with comma plus and."
hint: "Look for two complete thoughts joined correctly."
questionGoal: "Recognize a compound sentence with two independent clauses."
misconception: "Confusing complex sentences or fragments with compound sentences."
```

```question
key: u02_l01_q02_compound_rule
type: fill-blank
prompt: "Complete the rule."
sentenceBefore: "A compound sentence joins two"
sentenceAfter: "clauses."
choices:
  - "independent"
  - "dependent"
  - "missing"
  - "describing"
correctAnswer: "independent"
explanation: "A compound sentence joins two clauses that could each stand alone."
hint: "Each side of a compound sentence can be its own sentence."
questionGoal: "State the clause requirement for compound sentences."
misconception: "Thinking any two word groups can form a compound sentence."
```

```question
key: u02_l01_q03_order_compound
type: order-items
prompt: "Put the parts in order to make a compound sentence."
items:
  - "and"
  - "."
  - "The sun came out"
  - "The storm passed"
  - ","
correctOrder:
  - "The storm passed"
  - ","
  - "and"
  - "The sun came out"
  - "."
explanation: "The sentence joins two independent clauses with comma plus and."
hint: "The comma comes before the coordinating conjunction."
questionGoal: "Build a compound sentence from ordered parts."
misconception: "Misplacing the comma or conjunction in a compound sentence."
```

```question
key: u02_l01_q04_two_independent_sides
type: multiple-choice
prompt: "In the sentence The dog barked, and the gate swung open, which statement is true?"
choices:
  - "Only The dog barked is independent."
  - "Only the gate swung open is independent."
  - "Both sides are independent clauses."
  - "Neither side has a verb."
correctAnswer: "Both sides are independent clauses."
explanation: "The dog barked and the gate swung open can each stand alone."
hint: "Test each side without the joining word."
questionGoal: "Identify independent clauses on both sides of a compound sentence."
misconception: "Failing to test both sides of a joined sentence."
```

```question
key: u02_l01_q05_match_related_clauses
type: match-pairs
prompt: "Match each first clause to a related second clause."
pairs:
  - left: "The soup was hot,"
    right: "so I waited before tasting it."
  - left: "The library opened early,"
    right: "and we found a quiet table."
  - left: "I wanted the blue marker,"
    right: "but Sam was using it."
  - left: "You may read the poem,"
    right: "or you may listen to it."
explanation: "Compound sentences should join related complete ideas."
hint: "Choose the ending that makes logical sense with the first clause."
questionGoal: "Pair related independent clauses for compound sentences."
misconception: "Joining unrelated ideas just because both are complete."
```

```question
key: u02_l01_q06_best_compound_revision
type: passage-question
prompt: "Read the two sentences and choose the best compound revision."
passageTitle: "Two Related Ideas"
passage: |
  The path was icy.
  We walked slowly.
question: "Which revision correctly joins the ideas as a compound sentence?"
choices:
  - "The path was icy, so we walked slowly."
  - "Because the path was icy."
  - "The path was icy we walked slowly."
  - "The path was icy, we walked slowly."
correctAnswer: "The path was icy, so we walked slowly."
explanation: "The revision joins two independent clauses with comma plus so."
hint: "A compound sentence needs a correct join between two complete clauses."
questionGoal: "Choose a correct compound revision for two related sentences."
misconception: "Creating a run-on or comma splice when combining ideas."
```

### Lesson 2: Choose The Best Coordinator

```question
key: u02_l02_q01_but_contrast
type: fill-blank
prompt: "Choose the coordinator that best fits the meaning."
sentenceBefore: "I wanted to skate,"
sentenceAfter: "the pond was not frozen."
choices:
  - "and"
  - "but"
  - "or"
  - "so"
correctAnswer: "but"
explanation: "But shows contrast between wanting to skate and the pond not being ready."
hint: "The second clause goes against what the first clause makes you expect."
questionGoal: "Choose a coordinating conjunction for contrast."
misconception: "Using and for every compound sentence."
```

```question
key: u02_l02_q02_match_relationship
type: match-pairs
prompt: "Match each relationship to a coordinating conjunction."
pairs:
  - left: "addition"
    right: "and"
  - left: "contrast"
    right: "but"
  - left: "choice"
    right: "or"
  - left: "result"
    right: "so"
explanation: "Coordinators signal the relationship between two independent clauses."
hint: "Think about what each small word tells the reader."
questionGoal: "Connect common coordinating conjunctions with meaning relationships."
misconception: "Treating coordinators as interchangeable."
```

```question
key: u02_l02_q03_so_result
type: multiple-choice
prompt: "Which coordinator best completes the sentence? Ava studied the map, ___ she found the trail."
choices:
  - "or"
  - "so"
  - "but"
  - "yet"
correctAnswer: "so"
explanation: "So shows a result: studying the map helped Ava find the trail."
hint: "Ask whether the second idea is a result of the first."
questionGoal: "Choose so for a cause-result relationship."
misconception: "Choosing a contrast or choice word for a result."
```

```question
key: u02_l02_q04_or_choice
type: fill-blank
prompt: "Choose the coordinator that shows a choice."
sentenceBefore: "You can revise tonight,"
sentenceAfter: "you can finish in the morning."
choices:
  - "but"
  - "or"
  - "so"
  - "and"
correctAnswer: "or"
explanation: "Or shows that the writer is giving two choices."
hint: "Look for the word that offers an option."
questionGoal: "Choose or for a choice relationship."
misconception: "Missing the choice relationship between clauses."
```

```question
key: u02_l02_q05_explain_but
type: multiple-choice
prompt: "In The suitcase was small, but everything fit, what does but show?"
choices:
  - "The second idea contrasts with the first."
  - "The second idea is just another item in a list."
  - "The second idea gives a choice."
  - "The second idea repeats the first."
correctAnswer: "The second idea contrasts with the first."
explanation: "A small suitcase might not fit everything, so but signals a contrast."
hint: "Think about what the first idea makes you expect."
questionGoal: "Explain the meaning relationship signaled by but."
misconception: "Reading coordinating conjunctions as decoration instead of meaning signals."
```

```question
key: u02_l02_q06_two_coordinators
type: multi-blank-cloze
prompt: "Complete each compound sentence with a fitting coordinator."
parts:
  - "The sky darkened, "
  - " we packed the picnic. You may bring a pencil, "
  - " you may use a pen."
blanks:
  - correctAnswer: "so"
    choices:
      - "so"
      - "or"
      - "but"
  - correctAnswer: "or"
    choices:
      - "and"
      - "or"
      - "so"
explanation: "So shows a result in the first sentence. Or shows a choice in the second."
hint: "Ask what relationship each pair of clauses has."
questionGoal: "Choose different coordinators based on two different relationships."
misconception: "Using the same connector for unlike relationships."
```

### Lesson 3: Comma Plus Conjunction Or Semicolon

```question
key: u02_l03_q01_semicolon_choice
type: multiple-choice
prompt: "Which sentence correctly uses a semicolon?"
choices:
  - "The museum closed early; the storm knocked out power."
  - "The museum closed early; because the storm arrived."
  - "The museum; closed early because of the storm."
  - "Because the museum closed; the storm arrived."
correctAnswer: "The museum closed early; the storm knocked out power."
explanation: "Both sides of the semicolon are independent clauses and the ideas are related."
hint: "A semicolon needs a complete sentence on both sides."
questionGoal: "Identify correct semicolon use between related independent clauses."
misconception: "Using a semicolon between any two sentence parts."
```

```question
key: u02_l03_q02_repair_with_semicolon
type: error-correction
prompt: "Repair the comma splice by using a semicolon."
sentence: "The garden needed water, the soil was dry."
acceptedAnswers:
  - "The garden needed water; the soil was dry."
explanation: "The semicolon correctly joins two related independent clauses."
hint: "Replace the comma between the two complete thoughts with a semicolon."
questionGoal: "Use a semicolon to repair a comma splice."
misconception: "Leaving a comma alone between independent clauses."
```

```question
key: u02_l03_q03_match_join_pattern
type: match-pairs
prompt: "Match each joining pattern to its example."
pairs:
  - left: "comma plus conjunction"
    right: "The bell rang, and the doors opened."
  - left: "semicolon"
    right: "The bell rang; the doors opened."
  - left: "period between clauses"
    right: "The bell rang. The doors opened."
  - left: "not a complete join"
    right: "The bell rang, the doors opened."
explanation: "Different punctuation patterns show different ways to handle two independent clauses."
hint: "Look at the mark between the two complete thoughts."
questionGoal: "Distinguish correct and incorrect independent-clause joins."
misconception: "Treating a comma splice as a correct compound sentence."
```

```question
key: u02_l03_q04_semicolon_not_allowed
type: multiple-choice
prompt: "Which sentence should not use a semicolon where the blank appears?"
choices:
  - "The window was open ___ the room felt cold."
  - "Mira found the note ___ she read it twice."
  - "Because the train was late ___ we waited inside."
  - "The team practiced daily ___ the game improved."
correctAnswer: "Because the train was late ___ we waited inside."
explanation: "Because the train was late is a dependent clause, so a semicolon should not follow it."
hint: "A semicolon needs an independent clause before it."
questionGoal: "Reject semicolon use after a dependent clause."
misconception: "Thinking semicolons can follow any long opening."
```

```question
key: u02_l03_q05_choose_join_mark
type: fill-blank
prompt: "Choose the punctuation mark that correctly joins two related independent clauses."
sentenceBefore: "The recipe looked simple"
sentenceAfter: "the sauce still took an hour."
choices:
  - ";"
  - ","
  - ":"
  - "?"
correctAnswer: ";"
explanation: "A semicolon can join the two related independent clauses."
hint: "A comma alone is not strong enough between two complete clauses."
questionGoal: "Choose a semicolon rather than a comma splice."
misconception: "Using a comma alone to join independent clauses."
```

```question
key: u02_l03_q06_best_join_revision
type: passage-question
prompt: "Read the two independent clauses and choose the best join."
passageTitle: "Closely Related Clauses"
passage: |
  The rehearsal ended late.
  Everyone hurried to the buses.
question: "Which revision correctly joins the clauses?"
choices:
  - "The rehearsal ended late; everyone hurried to the buses."
  - "The rehearsal ended late, everyone hurried to the buses."
  - "The rehearsal ended late; because everyone hurried to the buses."
  - "The rehearsal ended late everyone hurried to the buses."
correctAnswer: "The rehearsal ended late; everyone hurried to the buses."
explanation: "The semicolon joins two related independent clauses."
hint: "Choose the option with a complete sentence on both sides of the semicolon."
questionGoal: "Apply semicolon joining to a short context."
misconception: "Choosing a comma splice or run-on as a correct join."
```

### Lesson 4: Fix Comma Splices And Run-Ons

```question
key: u02_l04_q01_name_comma_splice
type: multiple-choice
prompt: "What is the error in this sentence? The buses arrived, the students cheered."
choices:
  - "comma splice"
  - "fragment"
  - "missing subject"
  - "correct compound sentence"
correctAnswer: "comma splice"
explanation: "Two independent clauses are joined with only a comma."
hint: "Test both sides of the comma. Can each side stand alone?"
questionGoal: "Identify a comma splice between independent clauses."
misconception: "Believing a comma alone can join complete sentences."
```

```question
key: u02_l04_q02_fix_runon_with_and
type: error-correction
prompt: "Fix the run-on by adding comma plus and."
sentence: "The bell rang the class stood."
acceptedAnswers:
  - "The bell rang, and the class stood."
explanation: "Comma plus and correctly joins the two independent clauses."
hint: "Put the comma and and between the two complete thoughts."
questionGoal: "Repair a run-on with comma plus coordinating conjunction."
misconception: "Adding a conjunction without the comma in a compound sentence."
```

```question
key: u02_l04_q03_best_repair_steep_trail
type: multiple-choice
prompt: "Which choice correctly repairs the run-on? The trail was steep we climbed slowly."
choices:
  - "The trail was steep, so we climbed slowly."
  - "The trail was steep, we climbed slowly."
  - "The trail was steep so climbed slowly."
  - "The trail was steep we, climbed slowly."
correctAnswer: "The trail was steep, so we climbed slowly."
explanation: "Comma plus so joins the two complete ideas and shows a result."
hint: "Choose the repair that has two complete clauses and a correct join."
questionGoal: "Choose a meaningful compound repair for a run-on."
misconception: "Choosing a comma splice or incomplete repair."
```

```question
key: u02_l04_q04_match_error_repair
type: match-pairs
prompt: "Match each sentence-boundary problem to a repair strategy."
pairs:
  - left: "The rain stopped, the game resumed."
    right: "Replace the comma with a semicolon."
  - left: "The door opened the cat escaped."
    right: "Add comma plus and between the clauses."
  - left: "Because the road flooded."
    right: "Add a main clause after the dependent clause."
  - left: "The lights dimmed. The play began."
    right: "Leave as two correct sentences."
explanation: "Different boundary problems need different repairs."
hint: "First decide whether the problem is a comma splice, run-on, fragment, or already correct."
questionGoal: "Select repair strategies for different boundary situations."
misconception: "Using the same repair for every sentence-boundary issue."
```

```question
key: u02_l04_q05_correct_boundary_choice
type: passage-question
prompt: "Read the sentence pair and choose the correct boundary."
passageTitle: "Editing Choice"
passage: |
  The robot stopped.
  Its battery was empty.
question: "Which sentence joins the ideas correctly?"
choices:
  - "The robot stopped; its battery was empty."
  - "The robot stopped, its battery was empty."
  - "The robot stopped its battery was empty."
  - "The robot; stopped its battery was empty."
correctAnswer: "The robot stopped; its battery was empty."
explanation: "The semicolon joins two closely related independent clauses."
hint: "Avoid the comma splice and the run-on."
questionGoal: "Choose a correct join for two related independent clauses."
misconception: "Mistaking comma splices and run-ons for acceptable sentence variety."
```

```question
key: u02_l04_q06_order_semicolon_repair
type: order-items
prompt: "Put the parts in order to make a correct semicolon repair."
items:
  - "its battery was empty"
  - "."
  - ";"
  - "The robot stopped"
correctOrder:
  - "The robot stopped"
  - ";"
  - "its battery was empty"
  - "."
explanation: "A semicolon can join two independent clauses that are closely related."
hint: "Place the semicolon between the two complete thoughts."
questionGoal: "Build a semicolon repair from sentence parts."
misconception: "Placing punctuation inside a clause instead of between clauses."
```

## Unit 3: Subordination And Complex Sentences

### Lesson 1: Subordinating Words Make Clauses Dependent

```question
key: u03_l01_q01_find_subordinator
type: multiple-choice
prompt: "Which word makes this clause dependent? Although the hike was long"
choices:
  - "Although"
  - "hike"
  - "was"
  - "long"
correctAnswer: "Although"
explanation: "Although is the subordinating word. It makes the clause depend on a main clause."
hint: "Look for the starter word that changes the whole clause."
questionGoal: "Identify a subordinating word at the start of a clause."
misconception: "Choosing the subject, verb, or adjective instead of the dependency signal."
```

```question
key: u03_l01_q02_dependency_after_when
type: multiple-choice
prompt: "What happens when when is added to The bus arrived?"
choices:
  - "The clause becomes dependent: When the bus arrived."
  - "The clause becomes a compound sentence."
  - "The clause loses its subject."
  - "The clause no longer has a verb."
correctAnswer: "The clause becomes dependent: When the bus arrived."
explanation: "When turns the complete idea into a dependent clause that needs a main clause."
hint: "The subject and verb stay, but the thought no longer feels finished."
questionGoal: "Explain how a subordinating word changes clause independence."
misconception: "Thinking dependency means the subject or verb disappeared."
```

```question
key: u03_l01_q03_match_subordinator_clause
type: match-pairs
prompt: "Match each subordinating word to a dependent clause."
pairs:
  - left: "because"
    right: "because the tire was flat"
  - left: "when"
    right: "when the concert began"
  - left: "if"
    right: "if the library is open"
  - left: "although"
    right: "although the water was cold"
explanation: "Each subordinating word begins a clause that needs a main clause."
hint: "Match by the first word of each clause."
questionGoal: "Recognize common subordinating words in dependent clauses."
misconception: "Not noticing the starter word as part of the clause."
```

```question
key: u03_l01_q04_independent_or_dependent
type: fill-blank
prompt: "Classify the word group."
sentenceBefore: "Before the guests arrived is a"
sentenceAfter: "clause."
choices:
  - "dependent"
  - "independent"
  - "compound"
  - "complete"
correctAnswer: "dependent"
explanation: "Before the guests arrived has a subject and verb, but before makes it dependent."
hint: "Ask whether the word group can stand alone."
questionGoal: "Classify a before clause as dependent."
misconception: "Assuming subject plus verb always makes an independent clause."
```

```question
key: u03_l01_q05_choose_main_clause
type: multiple-choice
prompt: "Which main clause best completes this dependent clause? If the lights go out,"
choices:
  - "we will use the lantern."
  - "because the room is dark."
  - "when the storm arrives."
  - "under the table."
correctAnswer: "we will use the lantern."
explanation: "We will use the lantern is an independent clause that completes the condition."
hint: "Choose the ending that could stand alone as a sentence."
questionGoal: "Complete a dependent clause with a main clause."
misconception: "Adding another dependent clause or phrase instead of a main clause."
```

```question
key: u03_l01_q06_type_subordinator
type: text-input
prompt: "Type the subordinating word in this clause: Because the road was closed"
acceptedAnswers:
  - "Because"
  - "because"
answerType: text
explanation: "Because is the word that makes the clause dependent."
hint: "The subordinating word is the first word in this clause."
questionGoal: "Produce the subordinating word from a dependent clause."
misconception: "Typing the subject or verb instead of the dependency word."
```

### Lesson 2: Show Time, Cause, Condition, And Contrast

```question
key: u03_l02_q01_when_time
type: fill-blank
prompt: "Choose the subordinating word that shows time."
sentenceBefore: ""
sentenceAfter: " the timer rang, we took out the bread."
choices:
  - "When"
  - "Because"
  - "If"
  - "Although"
correctAnswer: "When"
explanation: "When tells the time that we took out the bread."
hint: "Choose the word that answers when."
questionGoal: "Choose when for a time relationship."
misconception: "Choosing a cause or condition word when the relationship is time."
```

```question
key: u03_l02_q02_because_cause
type: multiple-choice
prompt: "Which sentence uses a subordinating word to show cause?"
choices:
  - "Because the bridge was closed, we took the ferry."
  - "When the bridge was closed, we took the ferry."
  - "Although the bridge was closed, we took the ferry."
  - "If the bridge was closed, we took the ferry."
correctAnswer: "Because the bridge was closed, we took the ferry."
explanation: "Because explains the cause or reason for taking the ferry."
hint: "Look for the word that means for this reason."
questionGoal: "Identify because as a cause signal."
misconception: "Treating time, cause, condition, and contrast words as interchangeable."
```

```question
key: u03_l02_q03_match_relationships
type: match-pairs
prompt: "Match each relationship to a subordinating word."
pairs:
  - left: "time"
    right: "when"
  - left: "cause"
    right: "because"
  - left: "condition"
    right: "if"
  - left: "contrast"
    right: "although"
explanation: "The subordinating word tells the reader how the dependent clause relates to the main clause."
hint: "Think about the job each word does."
questionGoal: "Connect subordinators with meaning relationships."
misconception: "Choosing subordinators by sound rather than relationship."
```

```question
key: u03_l02_q04_if_condition
type: fill-blank
prompt: "Choose the word that shows a condition."
sentenceBefore: ""
sentenceAfter: " the store is open, we can buy batteries."
choices:
  - "If"
  - "When"
  - "Because"
  - "Although"
correctAnswer: "If"
explanation: "If shows a condition: buying batteries depends on the store being open."
hint: "Choose the word that means only in this case."
questionGoal: "Choose if for a condition relationship."
misconception: "Confusing condition with time or cause."
```

```question
key: u03_l02_q05_although_contrast
type: multiple-choice
prompt: "Which subordinating word best completes the sentence? ___ the backpack was heavy, Lina carried it home."
choices:
  - "Although"
  - "Because"
  - "When"
  - "If"
correctAnswer: "Although"
explanation: "Although shows contrast: the backpack was heavy, but Lina still carried it."
hint: "The second idea goes against what the first idea might make you expect."
questionGoal: "Choose although for contrast or concession."
misconception: "Using because when the relationship is contrast, not reason."
```

```question
key: u03_l02_q06_two_relationships
type: multi-blank-cloze
prompt: "Complete each complex sentence with the best subordinating word."
parts:
  - ""
  - " the alarm sounded, everyone lined up. "
  - " the hallway was crowded, the line moved quickly."
blanks:
  - correctAnswer: "When"
    choices:
      - "When"
      - "Although"
      - "If"
  - correctAnswer: "Although"
    choices:
      - "Because"
      - "Although"
      - "When"
explanation: "When shows time in the first sentence. Although shows contrast in the second."
hint: "Name the relationship before choosing the word."
questionGoal: "Select subordinators for two different meaning relationships."
misconception: "Repeating a familiar subordinator without checking meaning."
```

### Lesson 3: Build Complex Sentences Around A Main Clause

```question
key: u03_l03_q01_identify_main_clause
type: multiple-choice
prompt: "In Because the trail was icy, we walked slowly, which part is the main clause?"
choices:
  - "Because the trail was icy"
  - "we walked slowly"
  - "Because the trail"
  - "icy, we walked"
correctAnswer: "we walked slowly"
explanation: "We walked slowly can stand alone, so it is the main clause."
hint: "Find the part that could be its own sentence."
questionGoal: "Identify the main clause in a complex sentence."
misconception: "Choosing the first clause even when it is dependent."
```

```question
key: u03_l03_q02_order_main_first
type: order-items
prompt: "Put the parts in order to make a complex sentence with the main clause first."
items:
  - "because the trail was icy"
  - "."
  - "We walked slowly"
correctOrder:
  - "We walked slowly"
  - "because the trail was icy"
  - "."
explanation: "The main clause comes first, and the because clause explains the reason."
hint: "Start with the part that can stand alone."
questionGoal: "Build a main-clause-first complex sentence."
misconception: "Thinking a dependent clause must always come first."
```

```question
key: u03_l03_q03_order_dependent_first
type: order-items
prompt: "Put the parts in order to make a complex sentence with the dependent clause first."
items:
  - "the players stretched"
  - "Before practice began"
  - "."
  - ","
correctOrder:
  - "Before practice began"
  - ","
  - "the players stretched"
  - "."
explanation: "Before practice began is dependent, so a comma separates it from the main clause that follows."
hint: "Begin with the before clause, then add a comma and the main clause."
questionGoal: "Build a dependent-clause-first complex sentence."
misconception: "Leaving out the main clause or comma after the opening dependent clause."
```

```question
key: u03_l03_q04_complete_frame
type: multi-blank-cloze
prompt: "Complete the complex sentence labels."
parts:
  - "In If the rain stops, the game will begin, the dependent clause is "
  - " and the main clause is "
  - "."
blanks:
  - correctAnswer: "If the rain stops"
    acceptedAnswers:
      - "If the rain stops"
      - "if the rain stops"
  - correctAnswer: "the game will begin"
    acceptedAnswers:
      - "the game will begin"
      - "The game will begin"
explanation: "The if clause gives the condition, and the main clause tells what will happen."
hint: "The dependent clause starts with if."
questionGoal: "Label dependent and main clauses in a complex sentence."
misconception: "Confusing the condition with the independent main idea."
```

```question
key: u03_l03_q05_best_complex_combination
type: multiple-choice
prompt: "Which sentence best combines these ideas into a complex sentence? The power returned. The clocks started blinking."
choices:
  - "When the power returned, the clocks started blinking."
  - "The power returned, and the clocks started blinking."
  - "The power returned; the clocks started blinking."
  - "The power returned the clocks started blinking."
correctAnswer: "When the power returned, the clocks started blinking."
explanation: "When makes the first idea a dependent clause that shows time."
hint: "A complex sentence has one dependent clause and one main clause."
questionGoal: "Choose a complex sentence revision from two ideas."
misconception: "Choosing coordination or a run-on when subordination is requested."
```

```question
key: u03_l03_q06_main_clause_stands
type: multiple-choice
prompt: "Which part can stand alone from this sentence? Although the song was new, the choir learned it quickly."
choices:
  - "Although the song was new"
  - "the choir learned it quickly"
  - "Although the song"
  - "new, the choir"
correctAnswer: "the choir learned it quickly"
explanation: "The choir learned it quickly is the main clause and can stand alone."
hint: "Remove although and test which idea is complete by itself."
questionGoal: "Identify the independent main clause after an introductory dependent clause."
misconception: "Treating the dependent clause as complete because it has a subject and verb."
```

### Lesson 4: Punctuate Introductory Dependent Clauses

```question
key: u03_l04_q01_intro_comma_choice
type: multiple-choice
prompt: "Which sentence is punctuated correctly?"
choices:
  - "After the lights dimmed, the play began."
  - "After the lights dimmed the play, began."
  - "After, the lights dimmed the play began."
  - "After the lights dimmed the play began."
correctAnswer: "After the lights dimmed, the play began."
explanation: "The dependent clause comes first, so a comma goes before the main clause."
hint: "Find where the introductory dependent clause ends."
questionGoal: "Choose correct comma placement after an introductory dependent clause."
misconception: "Omitting or misplacing the comma after the dependent clause."
```

```question
key: u03_l04_q02_add_intro_comma
type: error-correction
prompt: "Add the missing comma after the introductory dependent clause."
sentence: "Because the sidewalk was wet we stepped carefully."
acceptedAnswers:
  - "Because the sidewalk was wet, we stepped carefully."
explanation: "The comma comes after the opening because clause."
hint: "Place the comma before the main clause we stepped carefully."
questionGoal: "Repair a missing comma after an introductory dependent clause."
misconception: "Not marking the boundary between dependent and main clause."
```

```question
key: u03_l04_q03_no_comma_needed_common
type: multiple-choice
prompt: "Which sentence uses comma placement correctly?"
choices:
  - "We stepped carefully because the sidewalk was wet."
  - "We stepped carefully, because the sidewalk was wet."
  - "We stepped, carefully because the sidewalk was wet."
  - "We, stepped carefully because the sidewalk was wet."
correctAnswer: "We stepped carefully because the sidewalk was wet."
explanation: "When the main clause comes first, a common because clause usually does not need a comma."
hint: "Ask which clause comes first."
questionGoal: "Avoid adding an unnecessary comma before a following because clause."
misconception: "Putting a comma before every subordinating conjunction."
```

```question
key: u03_l04_q04_order_punctuated_complex
type: order-items
prompt: "Put the parts in order with correct punctuation."
items:
  - "the buses waited"
  - "Although the road was icy"
  - "."
  - ","
correctOrder:
  - "Although the road was icy"
  - ","
  - "the buses waited"
  - "."
explanation: "The introductory although clause is followed by a comma and then the main clause."
hint: "Start with the dependent clause, then mark its end."
questionGoal: "Sequence a punctuated introductory dependent clause sentence."
misconception: "Using the comma in the wrong place or omitting the main clause."
```

```question
key: u03_l04_q05_choose_comma_reason
type: multiple-choice
prompt: "Why does this sentence need a comma? If the alarm rings, leave the building."
choices:
  - "The dependent clause comes before the main clause."
  - "Every sentence with if needs a comma."
  - "Leave is a noun."
  - "The sentence is compound."
correctAnswer: "The dependent clause comes before the main clause."
explanation: "If the alarm rings is introductory, so a comma marks the boundary."
hint: "Name the structure before naming the punctuation."
questionGoal: "Explain comma use after an introductory dependent clause."
misconception: "Memorizing a surface rule instead of connecting comma to clause order."
```

```question
key: u03_l04_q06_fix_extra_comma
type: error-correction
prompt: "Remove the extra comma."
sentence: "The team cheered, when the final point landed."
acceptedAnswers:
  - "The team cheered when the final point landed."
explanation: "The main clause comes first, so this when clause does not need a comma in this clear sentence."
hint: "Check whether the dependent clause comes before or after the main clause."
questionGoal: "Correct an unnecessary comma before a following dependent clause."
misconception: "Adding a comma before every dependent clause regardless of order."
```

## Unit 4: Modifiers, Appositives, And Sentence Detail

### Lesson 1: Keep The Core, Add The Detail

```question
key: u04_l01_q01_find_core_with_detail
type: multiple-choice
prompt: "Which choice shows the core of this sentence? During the thunderstorm, the small dog slept under the desk."
choices:
  - "During the thunderstorm"
  - "the small dog slept"
  - "under the desk"
  - "the thunderstorm slept"
correctAnswer: "the small dog slept"
explanation: "The sentence is mainly about the dog sleeping. The other phrases add when and where."
hint: "Find the subject and main verb before looking at details."
questionGoal: "Identify the sentence core inside a sentence with added details."
misconception: "Treating introductory or ending phrases as the core."
```

```question
key: u04_l01_q02_detail_job
type: multiple-choice
prompt: "In With a wide grin, Malik opened the card, what job does With a wide grin have?"
choices:
  - "It adds detail about how Malik opened the card."
  - "It is the subject of the sentence."
  - "It is the main verb."
  - "It is a complete independent clause."
correctAnswer: "It adds detail about how Malik opened the card."
explanation: "With a wide grin is added detail. The core is Malik opened."
hint: "Ask whether the words can stand alone or whether they describe the action."
questionGoal: "Identify the role of an introductory detail phrase."
misconception: "Mistaking a phrase for a clause or sentence core."
```

```question
key: u04_l01_q03_match_core_detail
type: match-pairs
prompt: "Match each sentence part to its role."
pairs:
  - left: "The goalie"
    right: "subject"
  - left: "blocked the shot"
    right: "predicate"
  - left: "with one hand"
    right: "detail about how"
  - left: "during overtime"
    right: "detail about when"
explanation: "The subject and predicate form the core. The other phrases add details."
hint: "Ask which parts are needed for the basic sentence."
questionGoal: "Distinguish core parts from added detail."
misconception: "Flattening all sentence parts into the same role."
```

```question
key: u04_l01_q04_core_multi_blank
type: multi-blank-cloze
prompt: "Complete the core sentence from: Near the window, the plants grew quickly."
parts:
  - "The core is "
  - " "
  - "."
blanks:
  - correctAnswer: "the plants"
    acceptedAnswers:
      - "the plants"
      - "plants"
  - correctAnswer: "grew"
    acceptedAnswers:
      - "grew"
explanation: "Near the window tells where. Quickly adds how. The core is the plants grew."
hint: "Remove the where and how details first."
questionGoal: "Produce the subject and verb core from a sentence with modifiers."
misconception: "Including optional detail as if it were required for the core."
```

```question
key: u04_l01_q05_keep_or_remove_detail
type: multiple-choice
prompt: "Which sentence keeps the same core as Under the stage, the cables crossed neatly?"
choices:
  - "The cables crossed."
  - "The stage crossed."
  - "Under the stage."
  - "The cables under neatly."
correctAnswer: "The cables crossed."
explanation: "The core is the cables crossed. The other words add where and how."
hint: "A core should still have a subject and verb."
questionGoal: "Reduce a detailed sentence to its core."
misconception: "Deleting the main subject or verb while removing details."
```

```question
key: u04_l01_q06_not_core
type: multiple-choice
prompt: "Which word group is added detail, not the sentence core? In the bright kitchen, Aunt Jo stirred the soup slowly."
choices:
  - "In the bright kitchen"
  - "Aunt Jo stirred"
  - "Aunt Jo"
  - "stirred the soup"
correctAnswer: "In the bright kitchen"
explanation: "In the bright kitchen tells where. It is not the main subject or verb."
hint: "Look for the phrase that gives setting information."
questionGoal: "Identify added detail apart from the sentence core."
misconception: "Treating an introductory phrase as the main clause."
```

### Lesson 2: Adjective And Adverb Phrases Modify Meaning

```question
key: u04_l02_q01_modifier_target
type: multiple-choice
prompt: "What does the phrase with silver stripes describe? The kitten with silver stripes hid in the basket."
choices:
  - "kitten"
  - "hid"
  - "basket"
  - "The"
correctAnswer: "kitten"
explanation: "With silver stripes tells which kitten."
hint: "Ask which word the phrase helps identify."
questionGoal: "Identify the noun described by an adjective phrase."
misconception: "Attaching a modifier to a nearby but incorrect noun."
```

```question
key: u04_l02_q02_adverb_phrase_job
type: multiple-choice
prompt: "What does the phrase after sunset tell in this sentence? We walked home after sunset."
choices:
  - "when we walked"
  - "which home"
  - "who walked"
  - "what sunset did"
correctAnswer: "when we walked"
explanation: "After sunset modifies walked by telling when the walking happened."
hint: "Ask whether the phrase tells when, where, how, or which one."
questionGoal: "Identify the meaning added by an adverb phrase."
misconception: "Assuming every phrase after a noun describes that noun."
```

```question
key: u04_l02_q03_match_modifier_target
type: match-pairs
prompt: "Match each modifier to what it describes."
pairs:
  - left: "with a cracked screen"
    right: "tablet"
  - left: "during the parade"
    right: "waved"
  - left: "near the fountain"
    right: "bench"
  - left: "with careful steps"
    right: "crossed"
explanation: "Modifiers connect to the noun or action they describe."
hint: "Ask which word each phrase gives more information about."
questionGoal: "Match modifier phrases to the words they modify."
misconception: "Matching by position only without checking meaning."
```

```question
key: u04_l02_q04_choose_clear_modifier
type: fill-blank
prompt: "Choose the phrase that clearly describes the bird."
sentenceBefore: "The bird"
sentenceAfter: "sang from the branch."
choices:
  - "with blue wings"
  - "after breakfast"
  - "under the branch"
  - "very loudly"
correctAnswer: "with blue wings"
explanation: "With blue wings describes which bird."
hint: "Choose the phrase that tells what kind of bird."
questionGoal: "Choose an adjective phrase that modifies a noun."
misconception: "Choosing an adverb detail when the prompt asks for noun description."
```

```question
key: u04_l02_q05_phrase_or_clause
type: multiple-choice
prompt: "Why is under the wooden bridge a phrase, not a clause?"
choices:
  - "It does not have a subject and verb."
  - "It has two independent clauses."
  - "It expresses a complete thought."
  - "It starts with a capital letter."
correctAnswer: "It does not have a subject and verb."
explanation: "A clause needs a subject and verb. Under the wooden bridge is a phrase."
hint: "Check for a subject doing or being something."
questionGoal: "Distinguish a modifier phrase from a clause."
misconception: "Calling any group of words a clause."
```

```question
key: u04_l02_q06_modifier_meaning
type: passage-question
prompt: "Read the sentence and answer the question."
passageTitle: "Modifier Meaning"
passage: "The hikers rested beside the waterfall after the long climb."
question: "Which phrase tells where the hikers rested?"
choices:
  - "beside the waterfall"
  - "after the long climb"
  - "The hikers"
  - "rested"
correctAnswer: "beside the waterfall"
explanation: "Beside the waterfall tells the place where the hikers rested."
hint: "Where phrases often name a place."
questionGoal: "Identify an adverb phrase that tells where."
misconception: "Confusing where and when details."
```

### Lesson 3: Introductory Elements Lead Into The Main Clause

```question
key: u04_l03_q01_intro_element
type: multiple-choice
prompt: "Which words are the introductory element? After the final whistle, the players shook hands."
choices:
  - "After the final whistle"
  - "the players"
  - "shook hands"
  - "the players shook hands"
correctAnswer: "After the final whistle"
explanation: "After the final whistle comes before the main clause and sets up when it happened."
hint: "Find the words before the comma."
questionGoal: "Identify an introductory element before the main clause."
misconception: "Choosing the main clause instead of the introduction."
```

```question
key: u04_l03_q02_comma_after_intro_phrase
type: multiple-choice
prompt: "Which sentence correctly marks the introductory phrase?"
choices:
  - "In the quiet hallway, we heard the clock."
  - "In the quiet hallway we, heard the clock."
  - "In, the quiet hallway we heard the clock."
  - "In the quiet hallway we heard, the clock."
correctAnswer: "In the quiet hallway, we heard the clock."
explanation: "The comma comes after the introductory phrase."
hint: "Place the comma where the setup ends and the main clause begins."
questionGoal: "Choose comma placement after an introductory phrase."
misconception: "Placing the comma inside the phrase or inside the main clause."
```

```question
key: u04_l03_q03_phrase_or_dependent_intro
type: match-pairs
prompt: "Match each introductory element to its type."
pairs:
  - left: "After the concert ended,"
    right: "dependent clause"
  - left: "Near the front door,"
    right: "phrase"
  - left: "Because the floor was wet,"
    right: "reason clause"
  - left: "With a steady hand,"
    right: "how phrase"
explanation: "Introductory elements can be phrases or dependent clauses."
hint: "Look for a subject and verb to tell whether the introduction is a clause."
questionGoal: "Differentiate introductory phrases and dependent clauses."
misconception: "Treating all introductory elements as the same structure."
```

```question
key: u04_l03_q04_order_intro_sentence
type: order-items
prompt: "Put the parts in order with correct punctuation."
items:
  - "the class entered quietly"
  - "Before the speaker began"
  - "."
  - ","
correctOrder:
  - "Before the speaker began"
  - ","
  - "the class entered quietly"
  - "."
explanation: "The dependent introductory clause comes before the main clause and is followed by a comma."
hint: "Start with the before clause, then mark the boundary."
questionGoal: "Build a sentence with an introductory clause and main clause."
misconception: "Omitting punctuation between the introduction and main clause."
```

```question
key: u04_l03_q05_fix_intro_comma
type: error-correction
prompt: "Add the comma after the introductory element."
sentence: "With a bright flashlight Dana searched the closet."
acceptedAnswers:
  - "With a bright flashlight, Dana searched the closet."
explanation: "With a bright flashlight is an introductory phrase, so the comma marks where the main clause begins."
hint: "Place the comma just before Dana."
questionGoal: "Repair missing comma after an introductory phrase."
misconception: "Letting the introduction run into the main clause."
```

```question
key: u04_l03_q06_main_clause_after_intro
type: multiple-choice
prompt: "In During the storm, the campers stayed inside, which part is the main clause?"
choices:
  - "During the storm"
  - "the campers stayed inside"
  - "During the storm, the campers"
  - "inside"
correctAnswer: "the campers stayed inside"
explanation: "The campers stayed inside can stand alone as the main clause."
hint: "Remove the introductory phrase and see what complete sentence remains."
questionGoal: "Identify the main clause after an introductory element."
misconception: "Treating the introduction as part of the core clause."
```

### Lesson 4: Appositives Rename Nouns

```question
key: u04_l04_q01_identify_appositive
type: multiple-choice
prompt: "Which words are the appositive? Mr. Chen, our science teacher, showed us the telescope."
choices:
  - "our science teacher"
  - "Mr. Chen"
  - "showed us"
  - "the telescope"
correctAnswer: "our science teacher"
explanation: "Our science teacher renames Mr. Chen."
hint: "Look for the noun phrase that identifies another noun."
questionGoal: "Identify a nonessential appositive in a sentence."
misconception: "Choosing the noun being renamed instead of the appositive."
```

```question
key: u04_l04_q02_match_noun_appositive
type: match-pairs
prompt: "Match each noun to an appositive that could rename it."
pairs:
  - left: "Maya"
    right: "the team captain"
  - left: "the cello"
    right: "a large string instrument"
  - left: "Denver"
    right: "the capital of Colorado"
  - left: "Orion"
    right: "a winter constellation"
explanation: "An appositive is a noun or noun phrase that renames another noun."
hint: "Each right side should identify the left side in another way."
questionGoal: "Match nouns with logical appositive noun phrases."
misconception: "Confusing descriptive modifiers with renaming noun phrases."
```

```question
key: u04_l04_q03_appositive_commas
type: multiple-choice
prompt: "Which sentence correctly punctuates the appositive?"
choices:
  - "My brother, a careful baker, measured the flour."
  - "My brother a careful baker, measured the flour."
  - "My brother, a careful baker measured the flour."
  - "My brother a careful baker measured, the flour."
correctAnswer: "My brother, a careful baker, measured the flour."
explanation: "The nonessential appositive a careful baker is set off with comma pairs."
hint: "Use one comma before and one comma after the renaming phrase."
questionGoal: "Punctuate a middle-position nonessential appositive."
misconception: "Using only one comma around an appositive in the middle of a sentence."
```

```question
key: u04_l04_q04_not_appositive
type: multiple-choice
prompt: "Which phrase is not an appositive?"
choices:
  - "with a red cover"
  - "my favorite novel"
  - "the school nurse"
  - "a famous inventor"
correctAnswer: "with a red cover"
explanation: "With a red cover describes something, but it does not rename a noun as another noun phrase."
hint: "An appositive should be a noun or noun phrase."
questionGoal: "Distinguish an appositive from a descriptive phrase."
misconception: "Calling every added detail an appositive."
```

```question
key: u04_l04_q05_fix_appositive_commas
type: error-correction
prompt: "Add commas around the appositive."
sentence: "Tara my oldest cousin taught me to knit."
acceptedAnswers:
  - "Tara, my oldest cousin, taught me to knit."
explanation: "My oldest cousin renames Tara, so comma pairs set off the appositive."
hint: "Place one comma before and one comma after the renaming phrase."
questionGoal: "Repair missing commas around a nonessential appositive."
misconception: "Leaving a renaming phrase unmarked in the middle of a sentence."
```

```question
key: u04_l04_q06_appositive_function
type: fill-blank
prompt: "Complete the idea."
sentenceBefore: "An appositive"
sentenceAfter: "a noun beside it."
choices:
  - "renames"
  - "subtracts"
  - "hides"
  - "questions"
correctAnswer: "renames"
explanation: "An appositive is a noun or noun phrase that renames another noun."
hint: "Think of an appositive as another name."
questionGoal: "State the function of an appositive."
misconception: "Thinking appositives are only general descriptions, not renamings."
```

## Unit 5: Agreement, Voice, And Modifier Clarity

### Lesson 1: Pronouns Must Match Their Antecedents

```question
key: u05_l01_q01_singular_pronoun
type: fill-blank
prompt: "Choose the pronoun that agrees with the antecedent."
sentenceBefore: "The violin is in"
sentenceAfter: "case."
choices:
  - "its"
  - "their"
  - "our"
  - "his"
correctAnswer: "its"
explanation: "The violin is singular, so its agrees with it."
hint: "Find the noun the pronoun points back to."
questionGoal: "Choose a singular pronoun for a singular antecedent."
misconception: "Using a plural pronoun for a singular antecedent."
```

```question
key: u05_l01_q02_plural_pronoun
type: multiple-choice
prompt: "Which sentence has correct pronoun-antecedent agreement?"
choices:
  - "The players packed their uniforms."
  - "The players packed his uniforms."
  - "The players packed its uniforms."
  - "The players packed her uniforms."
correctAnswer: "The players packed their uniforms."
explanation: "Players is plural, so their agrees with it."
hint: "Ask whether the antecedent names one person or more than one."
questionGoal: "Recognize plural pronoun agreement."
misconception: "Matching pronouns by habit instead of antecedent number."
```

```question
key: u05_l01_q03_match_antecedent_pronoun
type: match-pairs
prompt: "Match each antecedent to a pronoun that agrees in number."
pairs:
  - left: "the bicycle"
    right: "it"
  - left: "the cousins"
    right: "they"
  - left: "Jamal and Priya"
    right: "their"
  - left: "one notebook"
    right: "its"
explanation: "Pronouns should match whether the antecedent is singular or plural."
hint: "One thing takes a singular pronoun. More than one takes a plural pronoun."
questionGoal: "Pair antecedents with number-agreeing pronouns."
misconception: "Ignoring compound or plural antecedents."
```

```question
key: u05_l01_q04_find_antecedent
type: multiple-choice
prompt: "In The birds returned to their nest, what is the antecedent of their?"
choices:
  - "birds"
  - "returned"
  - "nest"
  - "The"
correctAnswer: "birds"
explanation: "Their points back to birds."
hint: "Ask whose nest it is."
questionGoal: "Identify the antecedent a pronoun refers to."
misconception: "Choosing a nearby noun instead of the noun the pronoun replaces."
```

```question
key: u05_l01_q05_correct_agreement
type: error-correction
prompt: "Fix the pronoun agreement error by changing only the pronoun."
sentence: "The folders were missing its labels."
acceptedAnswers:
  - "The folders were missing their labels."
explanation: "Folders is plural, so the pronoun should be their."
hint: "Find the plural antecedent before choosing the pronoun."
questionGoal: "Repair a plural pronoun agreement error."
misconception: "Using singular its for a plural antecedent."
```

```question
key: u05_l01_q06_agreement_explanation
type: multiple-choice
prompt: "Why is this sentence incorrect? The team carried their banner."
choices:
  - "In this sentence, team is treated as singular, so its would agree."
  - "Banner should be plural."
  - "The sentence has no verb."
  - "Their is always wrong."
correctAnswer: "In this sentence, team is treated as singular, so its would agree."
explanation: "Team can name a group, but here it is treated as one unit, so a singular pronoun is expected in this controlled sentence."
hint: "Ask whether the antecedent is one unit or many separate people."
questionGoal: "Reason about a collective noun as a singular antecedent in a controlled case."
misconception: "Assuming group nouns always take plural pronouns."
```

### Lesson 2: Make Pronoun References Clear

```question
key: u05_l02_q01_unclear_reference
type: multiple-choice
prompt: "Why is this sentence unclear? Lena told Sofia that she had won the prize."
choices:
  - "She could mean Lena or Sofia."
  - "The sentence has no pronoun."
  - "Prize is plural."
  - "Told is not a verb."
correctAnswer: "She could mean Lena or Sofia."
explanation: "The pronoun she has two possible antecedents, so the reader may be unsure."
hint: "Look for more than one noun that the pronoun could refer to."
questionGoal: "Identify an ambiguous pronoun reference."
misconception: "Assuming the reader automatically knows the writer's intended antecedent."
```

```question
key: u05_l02_q02_clear_revision
type: multiple-choice
prompt: "Which revision makes the pronoun reference clear? Marco helped Eli after he missed practice."
choices:
  - "Marco helped Eli after Eli missed practice."
  - "Marco helped Eli after he missed practice."
  - "He helped Eli after Marco missed practice."
  - "Marco helped him after he missed practice."
correctAnswer: "Marco helped Eli after Eli missed practice."
explanation: "Naming Eli makes it clear who missed practice."
hint: "Choose the revision that names the person instead of using an unclear pronoun."
questionGoal: "Choose a revision that clarifies pronoun reference."
misconception: "Keeping the ambiguous pronoun in the revision."
```

```question
key: u05_l02_q03_match_unclear_clear
type: match-pairs
prompt: "Match each unclear sentence to a clearer revision."
pairs:
  - left: "Mia thanked Rose because she shared notes."
    right: "Mia thanked Rose because Rose shared notes."
  - left: "The bowl sat on the plate before it cracked."
    right: "The bowl cracked after it sat on the plate."
  - left: "Noah called Ben when he arrived."
    right: "Noah called Ben when Ben arrived."
  - left: "The jacket covered the backpack because it was wet."
    right: "The jacket covered the wet backpack."
explanation: "Clear revisions remove the reader's doubt about what the pronoun names."
hint: "Look for the noun each pronoun should point to."
questionGoal: "Connect unclear pronoun references to clearer revisions."
misconception: "Leaving multiple possible antecedents in place."
```

```question
key: u05_l02_q04_context_pronoun
type: passage-question
prompt: "Read the sentence and answer the question."
passageTitle: "Pronoun Reference"
passage: "The trophy would not fit in the cabinet because it was too small."
question: "What is unclear about it?"
choices:
  - "It could refer to the trophy or the cabinet."
  - "It clearly refers only to trophy."
  - "It clearly refers only to cabinet."
  - "It has no possible antecedent."
correctAnswer: "It could refer to the trophy or the cabinet."
explanation: "The reader cannot tell whether the trophy or the cabinet was too small."
hint: "Ask which noun could logically be too small."
questionGoal: "Explain ambiguity caused by a pronoun with two possible antecedents."
misconception: "Not noticing that more than one noun could fit the pronoun."
```

```question
key: u05_l02_q05_error_correction_reference
type: error-correction
prompt: "Make the pronoun clear by replacing it with the cabinet."
sentence: "The trophy would not fit in the cabinet because it was too small."
acceptedAnswers:
  - "The trophy would not fit in the cabinet because the cabinet was too small."
explanation: "Replacing it with the cabinet tells the reader exactly what was too small."
hint: "Use the exact noun named in the prompt."
questionGoal: "Repair an unclear pronoun by replacing it with a noun."
misconception: "Keeping the unclear pronoun or changing the wrong noun."
```

```question
key: u05_l02_q06_clear_or_unclear
type: multiple-choice
prompt: "Which sentence has the clearest pronoun reference?"
choices:
  - "After Nora spoke to Grace, Nora packed the posters."
  - "After Nora spoke to Grace, she packed the posters."
  - "Nora spoke to Grace after she packed them."
  - "She spoke to Grace after Nora packed the posters."
correctAnswer: "After Nora spoke to Grace, Nora packed the posters."
explanation: "Repeating Nora removes the doubt about who packed the posters."
hint: "Choose the sentence where the reader does not have to guess who she means."
questionGoal: "Select the clearest revision among pronoun-reference options."
misconception: "Preferring shorter wording even when it is ambiguous."
```

### Lesson 3: Active And Passive Voice Show Action Differently

```question
key: u05_l03_q01_active_voice
type: multiple-choice
prompt: "Which sentence is in active voice?"
choices:
  - "The chef sliced the apples."
  - "The apples were sliced by the chef."
  - "The apples were on the counter."
  - "By the chef, the apples."
correctAnswer: "The chef sliced the apples."
explanation: "The subject, the chef, does the action."
hint: "Find the subject and ask whether it does the verb."
questionGoal: "Recognize clear active voice."
misconception: "Choosing passive voice because it contains the same actor and action."
```

```question
key: u05_l03_q02_passive_voice
type: multiple-choice
prompt: "Which sentence is in passive voice?"
choices:
  - "The window was opened by the custodian."
  - "The custodian opened the window."
  - "The window rattled loudly."
  - "The custodian waved."
correctAnswer: "The window was opened by the custodian."
explanation: "The subject, the window, receives the action."
hint: "In passive voice, the subject receives the action instead of doing it."
questionGoal: "Recognize clear passive voice."
misconception: "Treating every sentence with was as passive or missing the receiver."
```

```question
key: u05_l03_q03_match_voice
type: match-pairs
prompt: "Match each sentence to its voice."
pairs:
  - left: "The artist painted the mural."
    right: "active voice"
  - left: "The mural was painted by the artist."
    right: "passive voice"
  - left: "The coach called the timeout."
    right: "subject does the action"
  - left: "The timeout was called by the coach."
    right: "subject receives the action"
explanation: "Active voice makes the subject the actor. Passive voice makes the subject the receiver."
hint: "Ask who or what is the subject and what role it has."
questionGoal: "Connect active/passive labels with actor and receiver roles."
misconception: "Labeling by word order alone instead of action role."
```

```question
key: u05_l03_q04_actor_receiver
type: order-items
prompt: "Put the active-voice parts in the usual order."
items:
  - "the clay"
  - "shaped"
  - "The potter"
  - "."
correctOrder:
  - "The potter"
  - "shaped"
  - "the clay"
  - "."
explanation: "Active voice usually places the actor first, then the action, then the receiver."
hint: "Start with the doer of the action."
questionGoal: "Build a clear active-voice sentence from actor, action, and receiver."
misconception: "Putting the receiver in subject position when active voice is requested."
```

```question
key: u05_l03_q05_passive_not_always_wrong
type: multiple-choice
prompt: "Which statement about passive voice is true?"
choices:
  - "Passive voice can be useful when the receiver matters most."
  - "Passive voice is always wrong."
  - "Passive voice never has a verb."
  - "Passive voice always means the sentence is a fragment."
correctAnswer: "Passive voice can be useful when the receiver matters most."
explanation: "Passive voice is a choice. It can be useful, but writers should know what it emphasizes."
hint: "Think about whether passive voice is a tool or an automatic error."
questionGoal: "Understand that passive voice is not always incorrect."
misconception: "Treating passive voice as a banned structure instead of a meaning choice."
```

```question
key: u05_l03_q06_choose_voice_for_clarity
type: multiple-choice
prompt: "The writer wants to emphasize who solved the mystery. Which sentence is clearest?"
choices:
  - "Detective Ruiz solved the mystery."
  - "The mystery was solved by Detective Ruiz."
  - "The mystery was solved."
  - "Solved was the mystery."
correctAnswer: "Detective Ruiz solved the mystery."
explanation: "Active voice puts Detective Ruiz, the actor, in the subject position."
hint: "If the doer matters most, place the doer first."
questionGoal: "Choose active voice when the actor should be emphasized."
misconception: "Choosing passive voice even when the actor is the main focus."
```

### Lesson 4: Place Modifiers Where They Belong

```question
key: u05_l04_q01_misplaced_modifier
type: multiple-choice
prompt: "Which sentence has a misplaced modifier?"
choices:
  - "Covered in mud, the dog shook beside the porch."
  - "The dog shook beside the porch, covered in mud."
  - "Beside the porch, the dog shook."
  - "The muddy dog shook beside the porch."
correctAnswer: "The dog shook beside the porch, covered in mud."
explanation: "Covered in mud appears to describe the porch, but the dog is muddy."
hint: "Ask what the modifier is closest to and what it should describe."
questionGoal: "Identify a clear misplaced modifier."
misconception: "Assuming the reader will infer the intended target despite placement."
```

```question
key: u05_l04_q02_best_modifier_repair
type: multiple-choice
prompt: "Which revision fixes the misplaced modifier? I saw a hawk hiking on the ridge."
choices:
  - "Hiking on the ridge, I saw a hawk."
  - "I saw hiking a hawk on the ridge."
  - "I hiking saw a hawk on the ridge."
  - "A hawk saw me hiking on the ridge."
correctAnswer: "Hiking on the ridge, I saw a hawk."
explanation: "The revision places hiking on the ridge next to I, the person hiking."
hint: "Move the modifier close to the person it describes."
questionGoal: "Choose a clear repair for a misplaced modifier."
misconception: "Leaving the modifier next to the wrong noun."
```

```question
key: u05_l04_q03_match_modifier_target_clarity
type: match-pairs
prompt: "Match each modifier to what it should describe."
pairs:
  - left: "wearing a red helmet"
    right: "the cyclist"
  - left: "fresh from the oven"
    right: "the muffins"
  - left: "with a cracked lens"
    right: "the camera"
  - left: "covered in frost"
    right: "the windshield"
explanation: "A modifier should be placed near the word it describes."
hint: "Ask which noun logically has the detail."
questionGoal: "Identify intended modifier targets before revising placement."
misconception: "Matching modifiers to the nearest noun even when meaning is illogical."
```

```question
key: u05_l04_q04_error_correction_modifier
type: error-correction
prompt: "Move the modifier to make the meaning clear."
sentence: "The teacher handed the paper to Sam with the gold star."
acceptedAnswers:
  - "The teacher handed the paper with the gold star to Sam."
explanation: "With the gold star describes the paper, so it should sit next to paper."
hint: "Place with the gold star next to the thing that has the star."
questionGoal: "Repair a misplaced prepositional phrase with a finite correction."
misconception: "Letting the phrase appear to describe Sam instead of the paper."
```

```question
key: u05_l04_q05_which_meaning
type: passage-question
prompt: "Read the sentence and answer the question."
passageTitle: "Modifier Placement"
passage: "Sofia watched the seals with binoculars."
question: "What is unclear in the sentence?"
choices:
  - "It could mean Sofia had binoculars or the seals had binoculars."
  - "It has no subject."
  - "It has no verb."
  - "It is a comma splice."
correctAnswer: "It could mean Sofia had binoculars or the seals had binoculars."
explanation: "With binoculars is placed so it could describe either Sofia's watching or the seals."
hint: "Ask what the phrase with binoculars is closest to."
questionGoal: "Explain ambiguity caused by modifier placement."
misconception: "Missing how modifier position can change meaning."
```

```question
key: u05_l04_q06_clear_modifier_sentence
type: multiple-choice
prompt: "Which sentence is clearest?"
choices:
  - "Wearing a green scarf, the singer stepped onstage."
  - "The singer stepped onstage wearing a green scarf on the stage."
  - "The stage wearing a green scarf held the singer."
  - "The singer wearing stepped onstage a green scarf."
correctAnswer: "Wearing a green scarf, the singer stepped onstage."
explanation: "The modifier is placed next to the singer, the person wearing the scarf."
hint: "Choose the sentence where the modifier clearly describes the right noun."
questionGoal: "Select a sentence with clear modifier placement."
misconception: "Accepting awkward or ambiguous modifier placement."
```

## Unit 6: Punctuation And Cumulative Sentence Craft

### Lesson 1: Commas Mark Introductions And Appositives

```question
key: u06_l01_q01_intro_comma_review
type: multiple-choice
prompt: "Which sentence uses the comma correctly?"
choices:
  - "After the final bell, students filled the hallway."
  - "After, the final bell students filled the hallway."
  - "After the final bell students, filled the hallway."
  - "After the final bell students filled, the hallway."
correctAnswer: "After the final bell, students filled the hallway."
explanation: "The comma marks the end of the introductory phrase."
hint: "Find where the setup ends and the main clause begins."
questionGoal: "Use a comma after an introductory phrase."
misconception: "Placing commas by pause rather than structure."
```

```question
key: u06_l01_q02_appositive_comma_pair
type: multiple-choice
prompt: "Which sentence uses comma pairs around the appositive?"
choices:
  - "The Nile, a long river in Africa, flows north."
  - "The Nile a long river in Africa, flows north."
  - "The Nile, a long river in Africa flows north."
  - "The Nile a long river, in Africa flows north."
correctAnswer: "The Nile, a long river in Africa, flows north."
explanation: "A long river in Africa renames The Nile and is set off with comma pairs."
hint: "Use one comma before and one comma after the renaming phrase."
questionGoal: "Punctuate a nonessential appositive with comma pairs."
misconception: "Using only one comma around a middle appositive."
```

```question
key: u06_l01_q03_match_comma_job
type: match-pairs
prompt: "Match each comma job to its example."
pairs:
  - left: "after introductory phrase"
    right: "During the eclipse, the sky darkened."
  - left: "after introductory dependent clause"
    right: "When the eclipse began, the birds quieted."
  - left: "around appositive"
    right: "Lena, our guide, carried the map."
  - left: "between compound clauses"
    right: "The sky darkened, and the birds quieted."
explanation: "Commas mark different structures, so first identify the structure."
hint: "Name what the comma is separating or setting off."
questionGoal: "Connect comma placement to structural jobs."
misconception: "Using commas as general pauses without naming their function."
```

```question
key: u06_l01_q04_fix_appositive_review
type: error-correction
prompt: "Add commas around the appositive."
sentence: "The guitar a gift from my aunt needs new strings."
acceptedAnswers:
  - "The guitar, a gift from my aunt, needs new strings."
explanation: "A gift from my aunt renames the guitar, so comma pairs set it off."
hint: "Place commas before and after the renaming phrase."
questionGoal: "Repair missing appositive commas in a cumulative review sentence."
misconception: "Not recognizing a renaming phrase as an appositive."
```

```question
key: u06_l01_q05_fix_intro_review
type: error-correction
prompt: "Add the comma after the introductory element."
sentence: "Before the doors opened the audience waited quietly."
acceptedAnswers:
  - "Before the doors opened, the audience waited quietly."
explanation: "Before the doors opened is an introductory dependent clause."
hint: "Place the comma before the main clause the audience waited quietly."
questionGoal: "Repair missing comma after an introductory dependent clause."
misconception: "Letting introductory clauses run into main clauses."
```

```question
key: u06_l01_q06_no_subject_verb_comma
type: multiple-choice
prompt: "Which sentence avoids an incorrect comma between subject and verb?"
choices:
  - "The tall oak behind the school dropped its leaves."
  - "The tall oak behind the school, dropped its leaves."
  - "The tall oak, behind the school dropped its leaves."
  - "The tall, oak behind the school dropped its leaves."
correctAnswer: "The tall oak behind the school dropped its leaves."
explanation: "Do not put a comma between the subject and its verb."
hint: "Find the subject and verb before adding commas."
questionGoal: "Avoid separating subject and verb with a comma."
misconception: "Adding a comma wherever a phrase feels long."
```

### Lesson 2: Semicolons And Colons Have Specific Jobs

```question
key: u06_l02_q01_semicolon_or_colon
type: fill-blank
prompt: "Choose the punctuation mark that best fits."
sentenceBefore: "The night was clear"
sentenceAfter: "the stars looked close enough to touch."
choices:
  - ";"
  - ":"
  - ","
  - "!"
correctAnswer: ";"
explanation: "A semicolon joins two closely related independent clauses."
hint: "Both sides are complete sentences."
questionGoal: "Choose a semicolon between related independent clauses."
misconception: "Using a colon or comma where a semicolon is needed."
```

```question
key: u06_l02_q02_colon_list
type: multiple-choice
prompt: "Which sentence uses a colon correctly?"
choices:
  - "Bring these supplies: pencils, paper, and glue."
  - "Bring: pencils, paper, and glue."
  - "Bring these: supplies pencils, paper, and glue."
  - "Bring these supplies; pencils, paper, and glue."
correctAnswer: "Bring these supplies: pencils, paper, and glue."
explanation: "Bring these supplies is a complete setup that points forward to the list."
hint: "A colon should follow a complete setup."
questionGoal: "Use a colon after a complete introduction to a list."
misconception: "Putting a colon immediately after a verb before its object."
```

```question
key: u06_l02_q03_match_mark_job
type: match-pairs
prompt: "Match each punctuation mark to its job in this level."
pairs:
  - left: "semicolon"
    right: "joins related independent clauses"
  - left: "colon"
    right: "introduces a list or explanation"
  - left: "comma after introduction"
    right: "marks the end of setup"
  - left: "comma pair"
    right: "sets off a nonessential appositive"
explanation: "Each punctuation mark has a specific structural job."
hint: "Do not choose by how long the pause sounds."
questionGoal: "Connect punctuation marks to their structural purposes."
misconception: "Treating semicolons, colons, and commas as interchangeable pauses."
```

```question
key: u06_l02_q04_fix_colon
type: error-correction
prompt: "Move the colon so it follows the complete setup."
sentence: "We packed: water, snacks, and sunscreen."
acceptedAnswers:
  - "We packed these supplies: water, snacks, and sunscreen."
explanation: "We packed is not a complete setup for the list. We packed these supplies is complete and can introduce the list."
hint: "The words before a colon should make a complete setup."
questionGoal: "Repair a colon placed after an incomplete setup."
misconception: "Placing a colon right after any verb before a list."
```

```question
key: u06_l02_q05_semicolon_not_colon
type: multiple-choice
prompt: "Which mark best completes the sentence? The instructions were simple ___ we followed them exactly."
choices:
  - ";"
  - ":"
  - ","
  - "-"
correctAnswer: ";"
explanation: "Both sides are independent clauses, so a semicolon is the best choice here."
hint: "A colon points forward to a list or explanation; this sentence links two complete clauses."
questionGoal: "Distinguish semicolon use from colon use."
misconception: "Using a colon between two related independent clauses when no list or explanation follows."
```

```question
key: u06_l02_q06_colon_explanation
type: multiple-choice
prompt: "Which sentence uses a colon to introduce an explanation?"
choices:
  - "I knew the answer: the compass was pointing south."
  - "I knew: the answer was the compass."
  - "I knew the answer; the compass was pointing south."
  - "I knew, the answer the compass was pointing south."
correctAnswer: "I knew the answer: the compass was pointing south."
explanation: "The colon points forward to an explanation of the answer."
hint: "Look for a complete setup before the colon."
questionGoal: "Recognize colon use before an explanation."
misconception: "Confusing colon use with semicolon use or comma splices."
```

### Lesson 3: Choose The Best Sentence Combination

```question
key: u06_l03_q01_best_subordination
type: multiple-choice
prompt: "The writer wants to show a reason. Which combination is best? The sidewalk was icy. We walked slowly."
choices:
  - "Because the sidewalk was icy, we walked slowly."
  - "The sidewalk was icy, and we walked slowly."
  - "The sidewalk was icy; we walked slowly."
  - "The sidewalk was icy we walked slowly."
correctAnswer: "Because the sidewalk was icy, we walked slowly."
explanation: "Because shows the reason for walking slowly."
hint: "The prompt asks for a reason relationship."
questionGoal: "Choose subordination when one idea explains the reason for another."
misconception: "Using coordination when the relationship is dependent."
```

```question
key: u06_l03_q02_best_coordination
type: multiple-choice
prompt: "The writer wants to show two equal related actions. Which combination is best? The bell rang. The doors opened."
choices:
  - "The bell rang, and the doors opened."
  - "Because the bell rang, the doors opened."
  - "The bell, a door, rang opened."
  - "When the bell rang."
correctAnswer: "The bell rang, and the doors opened."
explanation: "Comma plus and joins two equal independent clauses."
hint: "Equal complete ideas can be coordinated."
questionGoal: "Choose coordination for two equal independent clauses."
misconception: "Subordinating or fragmenting one idea when equal coordination is intended."
```

```question
key: u06_l03_q03_best_appositive_combination
type: multiple-choice
prompt: "Which revision uses an appositive correctly? Zara won the race. Zara is our fastest runner."
choices:
  - "Zara, our fastest runner, won the race."
  - "Zara won the race, and our fastest runner."
  - "Because Zara is our fastest runner."
  - "Our fastest runner won, Zara the race."
correctAnswer: "Zara, our fastest runner, won the race."
explanation: "Our fastest runner renames Zara, so it works as an appositive."
hint: "Use the renaming detail beside the noun it renames."
questionGoal: "Choose an appositive sentence combination."
misconception: "Treating renaming detail as a separate clause or fragment."
```

```question
key: u06_l03_q04_order_sentence_combination
type: order-items
prompt: "Put the parts in order to show contrast with a complex sentence."
items:
  - "the team kept practicing"
  - ","
  - "Although the gym was hot"
  - "."
correctOrder:
  - "Although the gym was hot"
  - ","
  - "the team kept practicing"
  - "."
explanation: "Although creates a dependent clause that shows contrast."
hint: "Start with the contrast clause and add the main clause after the comma."
questionGoal: "Build a complex sentence that shows contrast."
misconception: "Using a contrast word without completing the sentence."
```

```question
key: u06_l03_q05_keep_separate
type: multiple-choice
prompt: "Which choice is best if the writer wants two short, clear statements instead of a combined sentence?"
choices:
  - "The alarm sounded. Everyone left the room."
  - "The alarm sounded, everyone left the room."
  - "Because the alarm sounded."
  - "The alarm sounded everyone left the room."
correctAnswer: "The alarm sounded. Everyone left the room."
explanation: "Keeping the ideas as two sentences is clear and avoids a comma splice or run-on."
hint: "Combining is not always required."
questionGoal: "Recognize that separate sentences can be the best clear choice."
misconception: "Thinking every revision must make a longer sentence."
```

```question
key: u06_l03_q06_revision_context
type: passage-question
prompt: "Read the sentence pair and choose the best revision for the stated purpose."
passageTitle: "Revision Purpose"
passage: |
  The telescope was powerful.
  We could see Jupiter's moons.
question: "The writer wants to show result. Which revision is best?"
choices:
  - "The telescope was powerful, so we could see Jupiter's moons."
  - "Although the telescope was powerful, we could see Jupiter's moons."
  - "The telescope, Jupiter's moons, was powerful."
  - "The telescope was powerful we could see Jupiter's moons."
correctAnswer: "The telescope was powerful, so we could see Jupiter's moons."
explanation: "So shows the result of the telescope being powerful."
hint: "Choose the connector that means as a result."
questionGoal: "Choose a sentence combination that matches a stated meaning relationship."
misconception: "Choosing a grammatically fancy option that does not match the intended meaning."
```

### Lesson 4: Edit A Short Passage With Grammar 3 Tools

```question
key: u06_l04_q01_passage_comma_splice
type: passage-question
prompt: "Read the short passage and answer the question."
passageTitle: "Target: Sentence Boundary"
passage: |
  The rain stopped, the players returned to the field.
question: "Which edit fixes the comma splice?"
choices:
  - "The rain stopped, and the players returned to the field."
  - "The rain stopped, the players returned to the field."
  - "Because the rain stopped."
  - "The rain stopped the players returned to the field."
correctAnswer: "The rain stopped, and the players returned to the field."
explanation: "Comma plus and correctly joins the two independent clauses."
hint: "The target is a sentence-boundary error between two complete thoughts."
questionGoal: "Edit a comma splice in a short cumulative context."
misconception: "Leaving a comma alone between independent clauses."
```

```question
key: u06_l04_q02_passage_pronoun
type: passage-question
prompt: "Read the short passage and answer the question."
passageTitle: "Target: Pronoun Reference"
passage: |
  Emma handed Riley the notebook because she needed the notes.
question: "Which edit makes the pronoun reference clear if Riley needed the notes?"
choices:
  - "Emma handed Riley the notebook because Riley needed the notes."
  - "Emma handed Riley the notebook because she needed the notes."
  - "She handed Riley the notebook because Emma needed the notes."
  - "Emma handed her the notebook because she needed them."
correctAnswer: "Emma handed Riley the notebook because Riley needed the notes."
explanation: "Naming Riley removes the unclear pronoun."
hint: "Replace the unclear pronoun with the intended noun."
questionGoal: "Edit unclear pronoun reference in context."
misconception: "Assuming she is clear when two female names could fit."
```

```question
key: u06_l04_q03_passage_modifier
type: multiple-choice
prompt: "Which edit fixes the misplaced modifier? Carrying a tray of muffins, the door swung open."
choices:
  - "Carrying a tray of muffins, Dad swung the door open."
  - "The door carrying a tray of muffins swung open."
  - "The door swung open carrying a tray of muffins."
  - "Carrying a tray of muffins, the door was open."
correctAnswer: "Carrying a tray of muffins, Dad swung the door open."
explanation: "Dad is the one carrying the tray, so the modifier belongs next to Dad."
hint: "Ask who is carrying the tray."
questionGoal: "Edit a misplaced modifier in a cumulative sentence."
misconception: "Leaving the modifier next to a noun it cannot logically describe."
```

```question
key: u06_l04_q04_passage_intro_comma
type: error-correction
prompt: "Add the missing comma after the introductory dependent clause."
sentence: "When the last question ended the team submitted its answers."
acceptedAnswers:
  - "When the last question ended, the team submitted its answers."
explanation: "The comma marks the end of the introductory when clause."
hint: "Place the comma before the main clause the team submitted its answers."
questionGoal: "Apply introductory dependent clause punctuation in cumulative editing."
misconception: "Omitting the comma between introductory clause and main clause."
```

```question
key: u06_l04_q05_passage_voice
type: multiple-choice
prompt: "The writer wants to emphasize the actor. Which edit is clearest? The mural was painted by the students."
choices:
  - "The students painted the mural."
  - "The mural was painted by the students."
  - "The mural was painted."
  - "Painted by the students was the mural."
correctAnswer: "The students painted the mural."
explanation: "Active voice puts the actor, the students, first."
hint: "If the actor matters most, make the actor the subject."
questionGoal: "Choose active voice for actor emphasis in a cumulative edit."
misconception: "Keeping passive voice when the purpose is to highlight the actor."
```

```question
key: u06_l04_q06_passage_colon
type: multiple-choice
prompt: "Which edit uses the colon correctly?"
choices:
  - "Mina packed three tools: a ruler, scissors, and tape."
  - "Mina packed: a ruler, scissors, and tape."
  - "Mina: packed three tools a ruler, scissors, and tape."
  - "Mina packed three tools; a ruler, scissors, and tape."
correctAnswer: "Mina packed three tools: a ruler, scissors, and tape."
explanation: "Mina packed three tools is a complete setup before the list."
hint: "The words before a colon should form a complete setup."
questionGoal: "Apply colon use for a list in cumulative editing."
misconception: "Placing a colon after a verb instead of after a complete setup."
```
