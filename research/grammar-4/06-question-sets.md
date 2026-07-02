# Grammar Level 4 Question Sets

Sources: accepted Grammar Level 4 blueprint, course map, unit design briefs, and lesson briefs in `research/grammar-4/`.

## Unit 1: Sentence Control For Purposeful Revision

### Lesson 1: Clause, Phrase, Or Complete Thought?

```question
key: u01_l01_q01_sort_word_groups
type: match-pairs
prompt: "Match each word group to the best label."
pairs:
  - left: "after the final bell rang"
    right: "dependent clause"
  - left: "under the cracked wooden bench"
    right: "phrase"
  - left: "The class voted before lunch."
    right: "complete sentence"
  - left: "the lantern flickered"
    right: "independent clause that could become a sentence"
explanation: "A phrase has no subject-and-verb pair, a dependent clause leans on another idea, and an independent clause can express a complete thought."
hint: "Look for a subject and verb, then ask whether the idea can stand alone."
questionGoal: "Classify phrases, dependent clauses, independent clauses, and complete sentences."
misconception: "Treating every word group with a verb as a complete sentence."
```

```question
key: u01_l01_q02_stand_alone
type: multiple-choice
prompt: "Which word group can stand alone as a complete sentence?"
choices:
  - "The hikers reached the ridge before sunset."
  - "Because the hikers reached the ridge"
  - "Across the ridge before sunset"
  - "When the trail curved sharply"
correctAnswer: "The hikers reached the ridge before sunset."
explanation: "This word group has a subject, a verb, and a complete thought."
hint: "A complete sentence should not leave you waiting for the rest of the idea."
questionGoal: "Recognize an independent clause written as a complete sentence."
misconception: "Choosing a long dependent clause because it has many words."
```

```question
key: u01_l01_q03_dependent_clause_label
type: fill-blank
prompt: "Choose the best label for this word group: Because the hallway was quiet"
sentenceBefore: "This word group is a"
sentenceAfter: "."
choices:
  - "dependent clause"
  - "complete sentence"
  - "compound sentence"
  - "simple predicate"
correctAnswer: "dependent clause"
explanation: "It has a subject and verb, but the word because makes it depend on another idea."
hint: "Ask whether the word because leaves the thought unfinished."
questionGoal: "Identify a dependent clause introduced by a subordinating word."
misconception: "Ignoring the dependent word and treating the clause as independent."
```

```question
key: u01_l01_q04_phrase_reason
type: multiple-choice
prompt: "Why is 'beside the old fountain' a phrase rather than a clause?"
choices:
  - "It does not have its own subject and verb."
  - "It is too short to be useful."
  - "It starts with a preposition, so it must be a sentence."
  - "It has a complete thought but no punctuation."
correctAnswer: "It does not have its own subject and verb."
explanation: "A phrase can add information, but it does not have the subject-and-verb structure of a clause."
hint: "Find who or what is doing something."
questionGoal: "Explain why a phrase is not a clause."
misconception: "Using length or punctuation instead of structure to classify a word group."
```

```question
key: u01_l01_q05_complete_thought_test
type: order-items
prompt: "Put the steps for testing a word group in a useful order."
items:
  - "Ask whether it gives a complete thought."
  - "Look for a subject."
  - "Decide whether it can stand alone."
  - "Look for a verb."
correctOrder:
  - "Look for a subject."
  - "Look for a verb."
  - "Ask whether it gives a complete thought."
  - "Decide whether it can stand alone."
explanation: "Structure comes first: subject and verb. Then meaning decides whether the word group can stand alone."
hint: "Before judging the whole thought, find the basic clause parts."
questionGoal: "Use a repeatable procedure for identifying complete thoughts."
misconception: "Deciding by how the word group sounds before checking clause structure."
```

```question
key: u01_l01_q06_passage_fragment
type: passage-question
prompt: "Read the short passage and answer."
passageTitle: "After Practice"
passage: |
  The team packed the balls into the cart.
  Before the rain started.
  Coach Rivera locked the gate.
question: "Which line is not a complete sentence?"
choices:
  - "The team packed the balls into the cart."
  - "Before the rain started."
  - "Coach Rivera locked the gate."
  - "All three lines are complete sentences."
correctAnswer: "Before the rain started."
explanation: "Before the rain started is a dependent clause. It leaves the reader waiting for the main idea."
hint: "Look for the line that begins with a word that makes the idea depend on another clause."
questionGoal: "Find a dependent-clause fragment in context."
misconception: "Assuming every capitalized and punctuated line is complete."
```

### Lesson 2: Repair Fragments And Run-Ons

```question
key: u01_l02_q01_identify_fragment
type: multiple-choice
prompt: "Which sentence has a fragment problem?"
choices:
  - "After the museum closed."
  - "The guide turned off the lights."
  - "Visitors waited by the entrance."
  - "The last bus arrived at five."
correctAnswer: "After the museum closed."
explanation: "This dependent clause does not tell what happened after the museum closed."
hint: "Find the choice that leaves you asking, 'What happened?'"
questionGoal: "Recognize a dependent-clause fragment."
misconception: "Judging sentence completeness by capitalization and end punctuation only."
```

```question
key: u01_l02_q02_repair_fragment
type: multiple-choice
prompt: "Choose the best repair: Because the library closed early."
choices:
  - "Because the library closed early, we finished our project at home."
  - "Because the library closed early, and."
  - "The library because closed early."
  - "Because the library closed early, the library."
correctAnswer: "Because the library closed early, we finished our project at home."
explanation: "The repair adds an independent clause that completes the idea."
hint: "Keep the because-clause, then add what happened."
questionGoal: "Repair a dependent-clause fragment by adding an independent clause."
misconception: "Adding extra words without creating a complete thought."
```

```question
key: u01_l02_q03_comma_splice_repair
type: error-correction
prompt: "Correct the comma splice. Keep both ideas."
sentence: "The rain stopped, the team returned to the field."
acceptedAnswers:
  - "The rain stopped, and the team returned to the field."
  - "The rain stopped; the team returned to the field."
  - "The rain stopped. The team returned to the field."
explanation: "Two independent clauses need a stronger boundary than a comma alone."
hint: "Use a period, a semicolon, or a comma plus a joining word."
questionGoal: "Repair a comma splice with a valid sentence boundary."
misconception: "Believing a comma alone can join two complete thoughts."
```

```question
key: u01_l02_q04_run_on_boundary
type: fill-blank
prompt: "Choose the punctuation that best repairs the run-on."
sentenceBefore: "The lights flickered"
sentenceAfter: "the auditorium grew quiet."
choices:
  - "."
  - ","
  - "and"
  - "because"
correctAnswer: "."
explanation: "A period creates a clear boundary between two complete thoughts."
hint: "Both sides can stand alone, so a sentence break works."
questionGoal: "Choose a sentence boundary to repair a run-on."
misconception: "Adding only a comma between independent clauses."
```

```question
key: u01_l02_q05_repair_steps
type: order-items
prompt: "Put these repair steps in order."
items:
  - "Choose a boundary or connector that fits."
  - "Find each complete thought."
  - "Check that the revision keeps the meaning."
  - "Notice whether a comma alone is joining the thoughts."
correctOrder:
  - "Find each complete thought."
  - "Notice whether a comma alone is joining the thoughts."
  - "Choose a boundary or connector that fits."
  - "Check that the revision keeps the meaning."
explanation: "Good repair starts by locating complete thoughts, then choosing a boundary that preserves meaning."
hint: "Before choosing punctuation, find the clauses."
questionGoal: "Sequence a strategy for repairing run-ons and comma splices."
misconception: "Fixing punctuation before understanding the sentence structure."
```

```question
key: u01_l02_q06_passage_best_repair
type: passage-question
prompt: "Read the short passage and choose the best repair."
passageTitle: "Science Fair"
passage: |
  Our model bridge held ten pounds, the judges asked us to test it again.
question: "Which revision fixes the sentence without changing its meaning?"
choices:
  - "Our model bridge held ten pounds, so the judges asked us to test it again."
  - "Our model bridge held ten pounds the judges asked us to test it again."
  - "Our model bridge held, ten pounds, the judges asked us."
  - "Because our model bridge held ten pounds."
correctAnswer: "Our model bridge held ten pounds, so the judges asked us to test it again."
explanation: "The comma plus so correctly connects the two complete thoughts and shows the reason."
hint: "Look for a revision with two complete thoughts and a clear relationship."
questionGoal: "Choose a meaningful repair for a comma splice in context."
misconception: "Picking punctuation that fixes form but weakens or removes the relationship."
```

### Lesson 3: Joining Independent Clauses

```question
key: u01_l03_q01_valid_semicolon
type: multiple-choice
prompt: "Which sentence uses a semicolon correctly?"
choices:
  - "The clouds gathered quickly; the hikers turned back."
  - "After the clouds gathered quickly; the hikers turned back."
  - "The clouds gathered quickly; because the hikers turned back."
  - "The clouds; gathered quickly and darkened."
correctAnswer: "The clouds gathered quickly; the hikers turned back."
explanation: "Both sides of the semicolon are independent clauses that can stand alone."
hint: "Test each side as its own complete sentence."
questionGoal: "Identify correct semicolon use between independent clauses."
misconception: "Using a semicolon after any long opening phrase."
```

```question
key: u01_l03_q02_choose_join
type: fill-blank
prompt: "Choose the best connector for the relationship."
sentenceBefore: "The first design failed,"
sentenceAfter: "the team built a stronger frame."
choices:
  - "so"
  - "or"
  - "yet"
  - "but"
correctAnswer: "so"
explanation: "So shows that the stronger frame was a result of the first design failing."
hint: "Ask which word shows cause and result."
questionGoal: "Choose a coordinating conjunction that matches the idea relationship."
misconception: "Treating coordinating conjunctions as interchangeable."
```

```question
key: u01_l03_q03_semicolon_repair
type: error-correction
prompt: "Correct the comma splice by using a semicolon."
sentence: "The rehearsal ran late, the actors still stayed focused."
acceptedAnswers:
  - "The rehearsal ran late; the actors still stayed focused."
explanation: "A semicolon can join these closely related independent clauses."
hint: "Replace the comma between the two complete thoughts with a semicolon."
questionGoal: "Use a semicolon to repair a comma splice."
misconception: "Keeping the comma because the ideas are related."
```

```question
key: u01_l03_q04_match_join_method
type: match-pairs
prompt: "Match each sentence pair to the best joining method."
pairs:
  - left: "The trail was icy / We walked slowly"
    right: "comma plus so"
  - left: "The doors opened / The crowd entered"
    right: "semicolon for close sequence"
  - left: "We could wait inside / We could meet at the gate"
    right: "comma plus or"
  - left: "The test was difficult / Maya finished calmly"
    right: "comma plus but"
explanation: "The joining method should show the relationship between the two independent clauses."
hint: "Name the relationship: result, sequence, choice, or contrast."
questionGoal: "Connect clause relationships to joining methods."
misconception: "Selecting punctuation without considering meaning."
```

```question
key: u01_l03_q05_related_or_unrelated
type: multiple-choice
prompt: "Which pair of independent clauses is the best fit for a semicolon?"
choices:
  - "The battery was dead; the flashlight would not turn on."
  - "The battery was dead; my favorite sandwich has tomato."
  - "Because the battery was dead; the flashlight."
  - "The battery; was dead and heavy."
correctAnswer: "The battery was dead; the flashlight would not turn on."
explanation: "Both clauses are complete, and the second idea is closely related to the first."
hint: "A semicolon works best when both sides are complete and connected in meaning."
questionGoal: "Choose semicolon use based on both structure and relationship."
misconception: "Thinking any two complete sentences can be joined well with a semicolon."
```

```question
key: u01_l03_q06_passage_join_choice
type: passage-question
prompt: "Read the sentence pair and answer."
passageTitle: "Robotics Club"
passage: |
  The robot rolled forward too quickly.
  The team adjusted the wheel speed.
question: "Which revision joins the ideas clearly?"
choices:
  - "The robot rolled forward too quickly, so the team adjusted the wheel speed."
  - "The robot rolled forward too quickly, the team adjusted the wheel speed."
  - "Because the robot rolled forward too quickly the team."
  - "The robot rolled forward; too quickly the team adjusted the wheel speed."
correctAnswer: "The robot rolled forward too quickly, so the team adjusted the wheel speed."
explanation: "The connector so shows why the team made the adjustment."
hint: "Look for the revision that shows cause and result without a comma splice."
questionGoal: "Join two independent clauses with a meaning-fitting connector."
misconception: "Joining complete thoughts with only a comma."
```

### Lesson 4: Pronouns And Modifiers For Clarity

```question
key: u01_l04_q01_unclear_pronoun
type: multiple-choice
prompt: "Which sentence has an unclear pronoun?"
choices:
  - "When Lina met Sofia after practice, she was carrying two backpacks."
  - "Lina carried two backpacks after practice."
  - "Sofia met Lina near the gym."
  - "After practice, the students walked to the bus."
correctAnswer: "When Lina met Sofia after practice, she was carrying two backpacks."
explanation: "She could refer to Lina or Sofia, so the reader cannot tell who carried the backpacks."
hint: "Look for a pronoun that could point to more than one noun."
questionGoal: "Identify unclear pronoun reference."
misconception: "Assuming the reader knows what the writer meant."
```

```question
key: u01_l04_q02_repair_pronoun
type: error-correction
prompt: "Rewrite the sentence so it clearly means Mia thanked Rosa."
sentence: "When Rosa handed Mia the notebook, she thanked her."
acceptedAnswers:
  - "When Rosa handed Mia the notebook, Mia thanked Rosa."
  - "Mia thanked Rosa when Rosa handed her the notebook."
explanation: "Naming Mia and Rosa removes the unclear she and her."
hint: "Replace the unclear pronouns with the names the reader needs."
questionGoal: "Revise unclear pronouns by naming the antecedents."
misconception: "Changing punctuation while leaving the pronoun reference unclear."
```

```question
key: u01_l04_q03_modifier_meaning
type: multiple-choice
prompt: "In this sentence, what does the opening phrase seem to describe? 'Covered in mud, the coach saw the soccer ball.'"
choices:
  - "the coach"
  - "the soccer ball"
  - "the field"
  - "the game"
correctAnswer: "the coach"
explanation: "An opening modifier usually describes the noun that follows it, so the sentence makes the coach seem covered in mud."
hint: "Look at the noun right after the comma."
questionGoal: "Identify the unintended meaning of a misplaced modifier."
misconception: "Assuming the intended meaning matters more than the modifier's placement."
```

```question
key: u01_l04_q04_repair_modifier
type: error-correction
prompt: "Rewrite the sentence so the bird, not the student, is in the tree."
sentence: "Sitting in the tree, the student watched the bird."
acceptedAnswers:
  - "The student watched the bird sitting in the tree."
  - "The student watched as the bird sat in the tree."
explanation: "The modifier must be placed near bird so readers know what is sitting in the tree."
hint: "Move the describing phrase closer to bird."
questionGoal: "Revise a misplaced modifier for clear meaning."
misconception: "Leaving the modifier near the wrong noun."
```

```question
key: u01_l04_q05_match_reference
type: match-pairs
prompt: "Match each pronoun to its clear antecedent."
pairs:
  - left: "After Jamal fixed the bike, it rolled smoothly."
    right: "bike"
  - left: "Because Imani shared the map, Nora thanked her."
    right: "Imani"
  - left: "The trophy fell from the shelf, but it did not break."
    right: "trophy"
  - left: "After Marcus charged the battery, he packed the camera."
    right: "Marcus"
explanation: "A clear pronoun points to one specific noun."
hint: "Ask which noun the pronoun logically replaces."
questionGoal: "Connect pronouns to clear antecedents."
misconception: "Treating pronoun reference as clear even when grammar and meaning do not align."
```

```question
key: u01_l04_q06_passage_clarity_revision
type: passage-question
prompt: "Read the sentence and choose the clearest revision."
passageTitle: "At The Desk"
passage: |
  Ava placed the folder beside the tablet that was torn.
question: "Which revision makes it clear that the folder was torn?"
choices:
  - "Ava placed the torn folder beside the tablet."
  - "Ava placed the folder beside the torn tablet."
  - "Ava placed the folder beside the tablet, torn."
  - "Ava placed it beside the tablet that was torn."
correctAnswer: "Ava placed the torn folder beside the tablet."
explanation: "Putting torn next to folder makes the description clear."
hint: "Place the describing word right before the noun it describes."
questionGoal: "Choose a modifier revision that removes ambiguity."
misconception: "Leaving a modifier close to the wrong noun."
```

## Unit 2: Sentence Variety, Rhythm, And Emphasis

### Lesson 1: Sentence Length And Rhythm

```question
key: u02_l01_q01_short_sentence_effect
type: passage-question
prompt: "Read the passage and answer."
passageTitle: "Before The Vote"
passage: |
  The room buzzed with whispers as the council counted the final ballots.
  Everyone leaned forward.
  Silence.
question: "What is the effect of the final one-word sentence?"
choices:
  - "It makes the pause feel sharp and important."
  - "It adds extra background details."
  - "It joins two complete thoughts."
  - "It makes the passage more informal."
correctAnswer: "It makes the pause feel sharp and important."
explanation: "The very short sentence slows the moment and emphasizes the silence."
hint: "Think about how the sentence length changes the pace."
questionGoal: "Identify the rhythm and emphasis effect of a short sentence."
misconception: "Thinking short sentences cannot be purposeful."
```

```question
key: u02_l01_q02_best_emphasis_sentence
type: multiple-choice
prompt: "Which ending gives the strongest emphasis after this sentence? 'The debate lasted for two hours, and every speaker had a different solution.'"
choices:
  - "Then Maya stood."
  - "Then Maya stood near the table and waited for the next speaker."
  - "Maya was the next person to stand and begin speaking."
  - "At that point, Maya stood, adjusted her notes, and looked around."
correctAnswer: "Then Maya stood."
explanation: "The short sentence makes Maya's action stand out after the longer setup."
hint: "A concise sentence can create focus."
questionGoal: "Choose sentence length for emphasis."
misconception: "Believing a more wordy sentence is automatically more mature."
```

```question
key: u02_l01_q03_order_for_rhythm
type: order-items
prompt: "Put the sentences in an order that builds to a clear final emphasis."
items:
  - "The hallway emptied."
  - "The clock clicked."
  - "The principal opened the envelope slowly."
  - "The name was announced."
correctOrder:
  - "The hallway emptied."
  - "The clock clicked."
  - "The principal opened the envelope slowly."
  - "The name was announced."
explanation: "The order moves from setting to suspense to the emphasized action."
hint: "Build the scene before the final important event."
questionGoal: "Arrange sentences so rhythm supports emphasis."
misconception: "Ordering sentences only by length without tracking meaning."
```

```question
key: u02_l01_q04_repetitive_length
type: multiple-choice
prompt: "Which revision best fixes the choppy rhythm? 'The team arrived. The team unpacked. The team warmed up. The team waited.'"
choices:
  - "The team arrived, unpacked, warmed up, and waited."
  - "The team arrived. The team arrived. The team arrived."
  - "The team arrived unpacked warmed up waited."
  - "Because the team arrived."
correctAnswer: "The team arrived, unpacked, warmed up, and waited."
explanation: "Combining the repeated subject creates smoother rhythm without losing the sequence."
hint: "Look for a revision that keeps all four actions but reduces repetition."
questionGoal: "Improve rhythm by combining repeated sentence patterns."
misconception: "Assuming every short sentence should remain separate."
```

```question
key: u02_l01_q05_length_choice
type: fill-blank
prompt: "Choose the sentence type that best fits the purpose."
sentenceBefore: "To make one warning stand out after several details, a writer might use a"
sentenceAfter: "."
choices:
  - "short sentence"
  - "long list"
  - "fragment with no purpose"
  - "comma splice"
correctAnswer: "short sentence"
explanation: "A short sentence can focus attention after a longer buildup."
hint: "Think of the sentence length that creates a sharp stop."
questionGoal: "Connect sentence length choice to writing purpose."
misconception: "Separating rhythm from grammar choices."
```

```question
key: u02_l01_q06_passage_rhythm_revision
type: passage-question
prompt: "Read the passage and choose the best revision."
passageTitle: "The Race"
passage: |
  I tied my shoes. I checked the lane. I heard the whistle. I ran.
question: "Which revision keeps the quick pace but reduces dull repetition?"
choices:
  - "I tied my shoes, checked the lane, heard the whistle, and ran."
  - "I tied my shoes and I tied my shoes and I tied my shoes."
  - "Because I tied my shoes, checked."
  - "My shoes were tied by me in a checking lane."
correctAnswer: "I tied my shoes, checked the lane, heard the whistle, and ran."
explanation: "The revision keeps the sequence and quick pace while removing repeated openings."
hint: "Keep the action sequence, but avoid starting every sentence the same way."
questionGoal: "Revise repeated short sentences for smoother rhythm."
misconception: "Treating repetition as effective even when it is accidental and dull."
```

### Lesson 2: Strong Sentence Openings

```question
key: u02_l02_q01_repetitive_opening
type: passage-question
prompt: "Read the passage and answer."
passageTitle: "Morning Work"
passage: |
  I opened my notebook.
  I copied the question.
  I underlined the key words.
question: "What style problem does the passage have?"
choices:
  - "Every sentence begins the same way."
  - "Every sentence is a fragment."
  - "The verbs do not match the subjects."
  - "The punctuation joins unrelated clauses."
correctAnswer: "Every sentence begins the same way."
explanation: "The repeated I opening makes the passage feel flat."
hint: "Look at the first word of each sentence."
questionGoal: "Identify repetitive sentence openings."
misconception: "Thinking repeated openings are invisible if the sentences are correct."
```

```question
key: u02_l02_q02_arrange_opening
type: order-items
prompt: "Arrange the parts into a clear sentence with a varied opening."
items:
  - "we reviewed our notes"
  - "Before the quiz,"
  - "and asked one last question."
correctOrder:
  - "Before the quiz,"
  - "we reviewed our notes"
  - "and asked one last question."
explanation: "The time phrase creates a varied opening, and the main clause completes the sentence."
hint: "The introductory phrase belongs first, but it needs a complete thought after it."
questionGoal: "Build a complete sentence with an introductory phrase."
misconception: "Treating an introductory phrase as a complete sentence by itself."
```

```question
key: u02_l02_q03_transition_opening
type: fill-blank
prompt: "Choose the opening that shows contrast."
sentenceBefore: ""
sentenceAfter: "the first design failed, the second design held firm."
choices:
  - "Although"
  - "Because"
  - "Before"
  - "Under"
correctAnswer: "Although"
explanation: "Although shows a contrast between the failed design and the stronger second design."
hint: "The sentence compares two different outcomes."
questionGoal: "Choose an introductory word that matches the relationship."
misconception: "Using any introductory word for variety without checking meaning."
```

```question
key: u02_l02_q04_best_varied_opening
type: multiple-choice
prompt: "Which revision varies the opening and keeps the sentence complete?"
choices:
  - "After the final bell, students rushed toward the buses."
  - "After the final bell."
  - "Students after the final bell."
  - "Rushed toward the buses after."
correctAnswer: "After the final bell, students rushed toward the buses."
explanation: "The introductory phrase adds variety, and the main clause completes the thought."
hint: "A varied opening still needs a subject and verb in the main clause."
questionGoal: "Choose a complete sentence with a varied opening."
misconception: "Creating a fragment while trying to vary the opening."
```

```question
key: u02_l02_q05_fragment_opener_repair
type: error-correction
prompt: "Correct the fragment by attaching it to the complete thought."
sentence: "After the rehearsal ended. The cast stacked the chairs."
acceptedAnswers:
  - "After the rehearsal ended, the cast stacked the chairs."
explanation: "After the rehearsal ended is an introductory dependent clause, so it needs the main clause after it."
hint: "Use a comma after the opening clause, then continue the sentence."
questionGoal: "Repair a fragment created by a varied opening."
misconception: "Punctuating an introductory dependent clause as a full sentence."
```

```question
key: u02_l02_q06_passage_opening_revision
type: passage-question
prompt: "Read the passage and choose the best revision for the second sentence."
passageTitle: "The Garden"
passage: |
  The volunteers weeded the garden.
  The volunteers watered the new seedlings.
  The volunteers labeled each row.
question: "Which revision varies the second sentence without changing its meaning?"
choices:
  - "After weeding, the volunteers watered the new seedlings."
  - "After weeding, the new seedlings watered the volunteers."
  - "The volunteers, after weeding the new seedlings, watered."
  - "Watered after weeding, the volunteers labeled each row."
correctAnswer: "After weeding, the volunteers watered the new seedlings."
explanation: "The phrase After weeding varies the opening and preserves the action."
hint: "The revision should still say who watered the seedlings."
questionGoal: "Revise a repetitive opening while preserving meaning."
misconception: "Moving words in a way that creates unclear or dangling modifiers."
```

### Lesson 3: Combine Without Crowding

```question
key: u02_l03_q01_best_combination
type: multiple-choice
prompt: "Which sentence best combines these ideas? 'The river rose overnight. The bridge remained open.'"
choices:
  - "Although the river rose overnight, the bridge remained open."
  - "The river rose overnight, the bridge remained open."
  - "Because the river rose overnight, but the bridge remained open."
  - "The river rose overnight although the bridge."
correctAnswer: "Although the river rose overnight, the bridge remained open."
explanation: "Although shows the contrast between the rising river and the open bridge."
hint: "The combined sentence should show contrast and stay complete."
questionGoal: "Combine two related sentences with a meaning-fitting connector."
misconception: "Combining by placing clauses side by side without a clear relationship."
```

```question
key: u02_l03_q02_order_combined_sentence
type: order-items
prompt: "Arrange the parts into one clear combined sentence."
items:
  - "the class moved inside."
  - "the wind grew stronger,"
  - "When"
correctOrder:
  - "When"
  - "the wind grew stronger,"
  - "the class moved inside."
explanation: "The when-clause gives the time, and the main clause tells what happened."
hint: "Start with the dependent word, then finish with a complete thought."
questionGoal: "Build a combined complex sentence."
misconception: "Leaving a dependent clause without a main clause."
```

```question
key: u02_l03_q03_when_not_to_combine
type: multiple-choice
prompt: "Which revision keeps the main warning clearest?"
choices:
  - "The gate is broken. Do not enter."
  - "The gate, which is broken and located near the path by the shed, should maybe not be entered by anyone."
  - "The gate is broken and do not and enter."
  - "Because the gate is broken."
correctAnswer: "The gate is broken. Do not enter."
explanation: "The separate warning is clear and direct. Combining would weaken the urgent message."
hint: "Sometimes a short separate sentence gives the reader a clear warning."
questionGoal: "Recognize when separate sentences are better than combining."
misconception: "Believing every combined sentence is stronger."
```

```question
key: u02_l03_q04_repair_overcombined
type: error-correction
prompt: "Correct the over-combined run-on."
sentence: "The drummer counted the beat the singers began softly."
acceptedAnswers:
  - "The drummer counted the beat, and the singers began softly."
  - "The drummer counted the beat. The singers began softly."
  - "After the drummer counted the beat, the singers began softly."
explanation: "The original sentence crowds two ideas together without a clear boundary or connector."
hint: "Add a boundary or connector that shows how the actions relate."
questionGoal: "Repair a crowded combined sentence."
misconception: "Thinking removing punctuation makes a sentence flow better."
```

```question
key: u02_l03_q05_connector_reason
type: fill-blank
prompt: "Choose the connector that shows cause and result."
sentenceBefore: "The microphone stopped working,"
sentenceAfter: "the speaker raised her voice."
choices:
  - "so"
  - "or"
  - "but"
  - "nor"
correctAnswer: "so"
explanation: "So shows that the speaker raised her voice because the microphone stopped working."
hint: "Ask which word means 'as a result.'"
questionGoal: "Select a connector that preserves meaning in a combined sentence."
misconception: "Choosing connectors for sound rather than relationship."
```

```question
key: u02_l03_q06_passage_combine_choice
type: passage-question
prompt: "Read the sentence pair and choose the best revision."
passageTitle: "A Clearer Report"
passage: |
  The data came from three surveys.
  The surveys asked the same question.
question: "Which combined sentence is clearest?"
choices:
  - "The data came from three surveys that asked the same question."
  - "The data came from three surveys, the surveys asked the same question."
  - "Asking the same question, the data came from surveys."
  - "The data came from three surveys, asking the same question."
correctAnswer: "The data came from three surveys that asked the same question."
explanation: "The revision combines related ideas and keeps the meaning clear."
hint: "The surveys, not the data, asked the question."
questionGoal: "Choose a combined sentence that preserves logical meaning."
misconception: "Creating a dangling or illogical modifier while combining."
```

### Lesson 4: Appositives, Interrupters, And Emphasis

```question
key: u02_l04_q01_match_appositives
type: match-pairs
prompt: "Match each appositive to the noun it renames."
pairs:
  - left: "A skilled pianist, Jun opened the recital."
    right: "Jun"
  - left: "The rover, a six-wheeled robot, crossed the crater."
    right: "rover"
  - left: "Our destination, Cedar Lake, appeared below."
    right: "destination"
  - left: "Dr. Patel, the team adviser, checked the design."
    right: "Dr. Patel"
explanation: "An appositive is a noun phrase that renames a nearby noun."
hint: "Ask which noun the extra phrase identifies or renames."
questionGoal: "Connect appositives to the nouns they rename."
misconception: "Treating any extra phrase as an appositive even when it does not rename a noun."
```

```question
key: u02_l04_q02_punctuate_appositive
type: fill-blank
prompt: "Choose the punctuation that correctly sets off the appositive."
sentenceBefore: "Ms. Ortega"
sentenceAfter: "our debate coach, reviewed the opening statement."
choices:
  - ","
  - ";"
  - ":"
  - "?"
correctAnswer: ","
explanation: "Commas can set off a short appositive that renames a noun."
hint: "The phrase our debate coach renames Ms. Ortega."
questionGoal: "Use commas to set off a nonessential appositive."
misconception: "Using stronger punctuation when simple commas are enough."
```

```question
key: u02_l04_q03_interrupter_effect
type: multiple-choice
prompt: "What effect do the dashes create? 'The solution - if it worked - would save the team hours.'"
choices:
  - "They emphasize the uncertain side comment."
  - "They show two unrelated complete sentences."
  - "They make a list of supplies."
  - "They turn the sentence into a question."
correctAnswer: "They emphasize the uncertain side comment."
explanation: "The dashes set off an interruption and make the condition stand out."
hint: "Read the words between the dashes as an interruption."
questionGoal: "Identify the effect of a dashed interrupter."
misconception: "Thinking all punctuation only marks correctness, not emphasis."
```

```question
key: u02_l04_q04_order_appositive_sentence
type: order-items
prompt: "Arrange the parts into a clear sentence with an appositive."
items:
  - "the school newspaper,"
  - "published the interview."
  - "The Falcon,"
correctOrder:
  - "The Falcon,"
  - "the school newspaper,"
  - "published the interview."
explanation: "The appositive the school newspaper renames The Falcon and is set off with commas."
hint: "Place the renaming phrase right after the noun it renames."
questionGoal: "Build a sentence with a correctly placed appositive."
misconception: "Separating the appositive from the noun it renames."
```

```question
key: u02_l04_q05_passage_interrupter
type: passage-question
prompt: "Read the sentence and answer."
passageTitle: "The Announcement"
passage: |
  The mayor, after a long pause, announced the new park plan.
question: "What is the interrupter?"
choices:
  - "after a long pause"
  - "The mayor"
  - "announced"
  - "the new park plan"
correctAnswer: "after a long pause"
explanation: "The phrase interrupts the main sentence to add timing and suspense."
hint: "Find the phrase set off by commas."
questionGoal: "Identify an interrupter in a sentence."
misconception: "Confusing the main subject or verb with the interrupting phrase."
```

```question
key: u02_l04_q06_repair_appositive_punctuation
type: error-correction
prompt: "Add commas to set off the appositive."
sentence: "My cousin a volunteer firefighter led the safety talk."
acceptedAnswers:
  - "My cousin, a volunteer firefighter, led the safety talk."
explanation: "The appositive a volunteer firefighter renames my cousin and should be set off with commas."
hint: "Put commas around the noun phrase that renames my cousin."
questionGoal: "Punctuate an appositive in a finite sentence."
misconception: "Leaving a renaming phrase unmarked so the sentence reads unevenly."
```

## Unit 3: Parallelism, Modifiers, And Concision

### Lesson 1: Lists That Stay Parallel

```question
key: u03_l01_q01_parallel_list
type: multiple-choice
prompt: "Which sentence uses parallel structure?"
choices:
  - "The hikers packed water, snacks, and maps."
  - "The hikers packed water, bringing snacks, and to carry maps."
  - "The hikers packed water, snacks, and were mapping."
  - "The hikers packed water, to snack, and maps."
correctAnswer: "The hikers packed water, snacks, and maps."
explanation: "Water, snacks, and maps are all nouns in the same list pattern."
hint: "Check whether every list item has the same grammatical shape."
questionGoal: "Recognize a parallel list."
misconception: "Assuming list items are parallel because they share a topic."
```

```question
key: u03_l01_q02_complete_parallel_verbs
type: multi-blank-cloze
prompt: "Complete the sentence with parallel verbs."
parts:
  - "The club plans to "
  - ", "
  - ", and "
  - " the garden beds."
blanks:
  - correctAnswer: "paint"
    choices:
      - "paint"
      - "painting"
      - "to painting"
  - correctAnswer: "plant"
    choices:
      - "plant"
      - "planting"
      - "planted"
  - correctAnswer: "repair"
    choices:
      - "repair"
      - "repairing"
      - "repairs"
explanation: "After plans to, the list should use matching base verbs: paint, plant, and repair."
hint: "Use the same verb form for each item."
questionGoal: "Complete a parallel verb list."
misconception: "Mixing verb forms inside a series."
```

```question
key: u03_l01_q03_repair_faulty_list
type: error-correction
prompt: "Correct the faulty parallelism."
sentence: "Maya likes hiking, swimming, and to bike."
acceptedAnswers:
  - "Maya likes hiking, swimming, and biking."
  - "Maya likes to hike, to swim, and to bike."
  - "Maya likes to hike, swim, and bike."
explanation: "The items should use matching forms, such as all -ing words or all base verbs after to."
hint: "Make the third item match the first two, or make all three match a new pattern."
questionGoal: "Repair a nonparallel list."
misconception: "Leaving one item in a different form because the meaning is understandable."
```

```question
key: u03_l01_q04_diagnose_parallel_problem
type: multiple-choice
prompt: "What is wrong with this sentence? 'The speech was clear, thoughtful, and it persuaded the audience.'"
choices:
  - "The third list item does not match the first two forms."
  - "The sentence has no subject."
  - "The sentence uses passive voice."
  - "The adjectives are all spelled incorrectly."
correctAnswer: "The third list item does not match the first two forms."
explanation: "Clear and thoughtful are adjectives, but it persuaded the audience is a full clause."
hint: "Compare the grammatical form of each item after was."
questionGoal: "Identify the source of faulty parallelism."
misconception: "Seeing shared positive meaning as enough for parallel structure."
```

```question
key: u03_l01_q05_match_pattern
type: match-pairs
prompt: "Match each sentence starter to a parallel completion."
pairs:
  - left: "The job requires patience, focus,"
    right: "and honesty."
  - left: "We came to listen, learn,"
    right: "and ask questions."
  - left: "The poster was bright, simple,"
    right: "and memorable."
  - left: "Their goal was to measure the room, sketch the layout,"
    right: "and compare costs."
explanation: "The completion should match the pattern already started."
hint: "Name the form before choosing the ending: noun, verb, adjective, or phrase."
questionGoal: "Choose endings that preserve a parallel pattern."
misconception: "Matching by topic instead of grammatical form."
```

```question
key: u03_l01_q06_passage_parallel_revision
type: passage-question
prompt: "Read the sentence and choose the best revision."
passageTitle: "A Strong Application"
passage: |
  The application showed leadership, creativity, and that the student was responsible.
question: "Which revision makes the list parallel?"
choices:
  - "The application showed leadership, creativity, and responsibility."
  - "The application showed leadership, creativity, and that the student was responsible."
  - "The application showed leading, creativity, and responsibility."
  - "The application showed leadership, being creative, and responsibility."
correctAnswer: "The application showed leadership, creativity, and responsibility."
explanation: "Leadership, creativity, and responsibility are all nouns in a matching list."
hint: "Make all three items the same kind of word."
questionGoal: "Revise a mixed-form list into a parallel noun list."
misconception: "Keeping a clause in a list of nouns because the meaning is related."
```

### Lesson 2: Paired Ideas And Comparisons

```question
key: u03_l02_q01_either_or_balance
type: fill-blank
prompt: "Choose the phrase that keeps the paired structure balanced."
sentenceBefore: "The committee will either delay the vote or"
sentenceAfter: "."
choices:
  - "schedule a special meeting"
  - "a special meeting"
  - "to schedule a special meeting"
  - "scheduling a special meeting"
correctAnswer: "schedule a special meeting"
explanation: "Delay the vote and schedule a special meeting are matching verb phrases."
hint: "After either and or, the two choices should have similar forms."
questionGoal: "Complete an either/or construction with parallel form."
misconception: "Finishing a paired construction with a mismatched noun phrase."
```

```question
key: u03_l02_q02_not_only_but_also
type: multiple-choice
prompt: "Which sentence keeps the not only/but also pair parallel?"
choices:
  - "The plan not only saves time but also reduces waste."
  - "The plan not only saves time but also the waste."
  - "The plan not only time but also reduces waste."
  - "The plan not only saving time but also reduces."
correctAnswer: "The plan not only saves time but also reduces waste."
explanation: "Saves time and reduces waste are matching verb phrases."
hint: "Compare the words after not only and but also."
questionGoal: "Choose a balanced paired construction."
misconception: "Treating the paired signals as enough even when the forms do not match."
```

```question
key: u03_l02_q03_repair_comparison
type: error-correction
prompt: "Correct the faulty comparison."
sentence: "Reading the article was easier than to summarize it."
acceptedAnswers:
  - "Reading the article was easier than summarizing it."
  - "To read the article was easier than to summarize it."
explanation: "Both sides of the comparison should use matching forms."
hint: "Make the action after than match the action before was."
questionGoal: "Repair a comparison with mismatched forms."
misconception: "Comparing related ideas without matching their grammatical shape."
```

```question
key: u03_l02_q04_match_pairs_signals
type: match-pairs
prompt: "Match each paired signal to its partner."
pairs:
  - left: "either"
    right: "or"
  - left: "neither"
    right: "nor"
  - left: "not only"
    right: "but also"
  - left: "both"
    right: "and"
explanation: "Paired signals help readers track balanced choices or additions."
hint: "Think of common paired words that travel together."
questionGoal: "Recognize paired construction signals."
misconception: "Mixing paired signals, such as either/nor or neither/or."
```

```question
key: u03_l02_q05_like_with_like
type: multiple-choice
prompt: "Which revision compares like with like?"
choices:
  - "The climate of Maine is colder than the climate of Florida."
  - "The climate of Maine is colder than Florida."
  - "Maine's climate is colder than visiting Florida."
  - "The climate of Maine is colder than Florida's beaches."
correctAnswer: "The climate of Maine is colder than the climate of Florida."
explanation: "The revision compares one climate with another climate."
hint: "Ask whether both sides name the same kind of thing."
questionGoal: "Choose a logical, parallel comparison."
misconception: "Comparing a quality of one place with an entire place."
```

```question
key: u03_l02_q06_passage_paired_revision
type: passage-question
prompt: "Read the sentence and choose the best revision."
passageTitle: "Community Project"
passage: |
  The volunteers wanted both to clean the park and a safer playground.
question: "Which revision keeps both ideas parallel?"
choices:
  - "The volunteers wanted both to clean the park and to build a safer playground."
  - "The volunteers wanted both clean the park and a safer playground."
  - "The volunteers wanted both cleaning the park and to build a safer playground."
  - "The volunteers wanted both to clean the park and a safer playground."
correctAnswer: "The volunteers wanted both to clean the park and to build a safer playground."
explanation: "Both parts use to plus a verb phrase: to clean and to build."
hint: "Make the words after both and and match."
questionGoal: "Revise a both/and construction for parallel form."
misconception: "Pairing a verb phrase with a noun phrase."
```

### Lesson 3: Modifiers Near What They Describe

```question
key: u03_l03_q01_modifier_target
type: multiple-choice
prompt: "In this sentence, what does the opening phrase seem to describe? 'Covered with notes, Priya opened the binder.'"
choices:
  - "Priya"
  - "the binder"
  - "the notes"
  - "the classroom"
correctAnswer: "Priya"
explanation: "Because the phrase comes before Priya, it makes Priya seem covered with notes."
hint: "Opening modifiers usually point to the noun that follows them."
questionGoal: "Identify the grammatical target of an opening modifier."
misconception: "Assuming the intended noun is clear even when placement points elsewhere."
```

```question
key: u03_l03_q02_repair_dangling_modifier
type: error-correction
prompt: "Rewrite the sentence so Devin, not the rain, is walking to school."
sentence: "Walking to school, the rain soaked Devin."
acceptedAnswers:
  - "As Devin walked to school, the rain soaked him."
  - "While Devin walked to school, the rain soaked him."
  - "Walking to school, Devin was soaked by the rain."
explanation: "The revision supplies Devin as the person doing the walking."
hint: "Name the person who is doing the action in the opening phrase."
questionGoal: "Repair a dangling modifier by naming the doer."
misconception: "Leaving the opening phrase attached to a noun that cannot logically do the action."
```

```question
key: u03_l03_q03_order_clear_modifier
type: order-items
prompt: "Arrange the parts so Rafael is the one carrying the binder."
items:
  - "Rafael"
  - "walked into class."
  - "Carrying the heavy binder,"
correctOrder:
  - "Carrying the heavy binder,"
  - "Rafael"
  - "walked into class."
explanation: "The opening modifier sits next to Rafael, so readers know Rafael is carrying the binder."
hint: "Put the describing phrase right before the noun it describes."
questionGoal: "Arrange a sentence so an opening modifier clearly describes the intended noun."
misconception: "Separating a modifier from the noun it describes."
```

```question
key: u03_l03_q04_best_modifier_revision
type: multiple-choice
prompt: "Which revision is clearest?"
choices:
  - "The cyclist wearing the striped scarf waved to the crowd."
  - "Wearing the striped scarf, the crowd waved to the cyclist."
  - "The cyclist waved to the crowd wearing the striped scarf."
  - "With the crowd, the striped scarf waved to the cyclist."
correctAnswer: "The cyclist wearing the striped scarf waved to the crowd."
explanation: "The modifier wearing the striped scarf is placed next to cyclist."
hint: "Put the describing words near the noun they describe."
questionGoal: "Choose the clearest modifier placement."
misconception: "Letting a trailing modifier attach to the wrong noun."
```

```question
key: u03_l03_q05_modifier_near_noun
type: fill-blank
prompt: "Choose the phrase placement that makes the tablet have the cracked screen."
sentenceBefore: "The student returned"
sentenceAfter: "to the media desk."
choices:
  - "the tablet with a cracked screen"
  - "with a cracked screen the student"
  - "to the cracked screen tablet"
  - "with the media desk cracked"
correctAnswer: "the tablet with a cracked screen"
explanation: "The phrase with a cracked screen sits next to tablet, so the meaning is clear."
hint: "Keep the description beside the thing being described."
questionGoal: "Place a modifier near the correct noun."
misconception: "Moving a describing phrase away from its noun."
```

```question
key: u03_l03_q06_passage_modifier_choice
type: passage-question
prompt: "Read the sentence and choose the clearest revision."
passageTitle: "The Poster"
passage: |
  Taped to the window, Amir read the poster.
question: "Which revision makes it clear that the poster was taped to the window?"
choices:
  - "Amir read the poster taped to the window."
  - "Taped to the window, Amir read carefully."
  - "Amir, taped to the window, read the poster."
  - "The window read the poster taped to Amir."
correctAnswer: "Amir read the poster taped to the window."
explanation: "The modifier taped to the window now describes poster."
hint: "Move the describing phrase closer to poster."
questionGoal: "Revise a misplaced opening modifier."
misconception: "Allowing an opening modifier to describe the wrong noun."
```

### Lesson 4: Concision Without Losing Meaning

```question
key: u03_l04_q01_concise_revision
type: multiple-choice
prompt: "Which revision is concise and keeps the meaning? 'The reason we canceled the trip was because of the fact that the road was flooded.'"
choices:
  - "We canceled the trip because the road was flooded."
  - "The road was flooded, so we canceled the trip because of that."
  - "We canceled the flooded trip."
  - "Because the road was flooded."
correctAnswer: "We canceled the trip because the road was flooded."
explanation: "The revision removes wordy phrases but keeps the cause and action."
hint: "Cut filler such as the reason was and the fact that."
questionGoal: "Choose a concise revision that preserves meaning."
misconception: "Cutting so much that important meaning disappears."
```

```question
key: u03_l04_q02_wordy_phrase_repair
type: error-correction
prompt: "Revise the sentence to remove the wordy phrase 'due to the fact that.'"
sentence: "Due to the fact that the bus was late, the team missed warmups."
acceptedAnswers:
  - "Because the bus was late, the team missed warmups."
  - "The team missed warmups because the bus was late."
explanation: "Because is a concise replacement for due to the fact that."
hint: "Replace the wordy phrase with one clear word."
questionGoal: "Replace a wordy phrase with a concise connector."
misconception: "Keeping inflated phrases because they sound formal."
```

```question
key: u03_l04_q03_passage_keep_meaning
type: passage-question
prompt: "Read the sentence and choose the best concise revision."
passageTitle: "The Report"
passage: |
  The report gives a brief summary of the results that is short.
question: "Which revision removes redundancy without losing meaning?"
choices:
  - "The report gives a brief summary of the results."
  - "The report gives a brief and short summary of the results."
  - "The report gives a summary of the results that is brief and short."
  - "The report gives results and summarizes them in a way that is brief."
correctAnswer: "The report gives a brief summary of the results."
explanation: "Brief already means short, so the final phrase is redundant."
hint: "Look for two words that repeat the same idea."
questionGoal: "Remove redundant wording while preserving meaning."
misconception: "Assuming repeated words add emphasis in an informational sentence."
```

```question
key: u03_l04_q04_match_wordy_concise
type: match-pairs
prompt: "Match each wordy phrase to a concise replacement."
pairs:
  - left: "at this point in time"
    right: "now"
  - left: "in order to"
    right: "to"
  - left: "because of the fact that"
    right: "because"
  - left: "make a decision"
    right: "decide"
explanation: "Concise replacements remove extra words without changing the basic meaning."
hint: "Choose the shorter phrase that says the same thing."
questionGoal: "Recognize concise replacements for common wordy phrases."
misconception: "Thinking longer phrases are more academic."
```

```question
key: u03_l04_q05_keep_useful_detail
type: multiple-choice
prompt: "Which revision is concise but keeps the important detail?"
choices:
  - "The red emergency lever opens the west gate."
  - "The lever opens the gate."
  - "The red lever opens a gate."
  - "The red emergency lever, which is red and emergency, opens the west gate."
correctAnswer: "The red emergency lever opens the west gate."
explanation: "Red, emergency, and west help identify the exact lever and gate, so they are useful details."
hint: "Concision cuts filler, not details the reader needs."
questionGoal: "Distinguish useful detail from wordiness."
misconception: "Believing the shortest sentence is always best."
```

```question
key: u03_l04_q06_redundancy_label
type: fill-blank
prompt: "Choose the best label for the problem in this phrase: 'final outcome at the end.'"
sentenceBefore: "The phrase is"
sentenceAfter: "."
choices:
  - "redundant"
  - "parallel"
  - "passive"
  - "subjunctive"
correctAnswer: "redundant"
explanation: "Final, outcome, and at the end repeat overlapping meaning."
hint: "Look for repeated meaning."
questionGoal: "Identify redundancy as a concision problem."
misconception: "Mistaking repeated meaning for emphasis or precision."
```

## Unit 4: Mood, Voice, And Register

### Lesson 1: What Mood Means In A Sentence

```question
key: u04_l01_q01_match_mood_meaning
type: match-pairs
prompt: "Match each sentence to the meaning it shows."
pairs:
  - left: "The meeting begins at four."
    right: "statement of fact"
  - left: "Please bring your notes."
    right: "command or request"
  - left: "If the bus arrives early, we will leave sooner."
    right: "condition"
  - left: "I wish the room were quieter."
    right: "wish"
explanation: "Mood shows how the sentence presents the action or idea."
hint: "Ask whether the sentence states, commands, imagines, or depends on something."
questionGoal: "Connect sentence examples to mood meanings."
misconception: "Thinking mood only means emotion."
```

```question
key: u04_l01_q02_mood_not_emotion
type: multiple-choice
prompt: "In grammar, what does mood describe?"
choices:
  - "How a sentence presents an action or idea"
  - "Only whether the writer feels happy or sad"
  - "The number of adjectives in a sentence"
  - "The punctuation at the end of a paragraph"
correctAnswer: "How a sentence presents an action or idea"
explanation: "Grammar mood can show a fact, command, condition, wish, or suggestion."
hint: "Think about the job the sentence is doing."
questionGoal: "Define grammatical mood in functional terms."
misconception: "Confusing grammatical mood with emotional mood only."
```

```question
key: u04_l01_q03_imperative_form
type: fill-blank
prompt: "Choose the verb form that completes the command."
sentenceBefore: "Please"
sentenceAfter: "the door quietly."
choices:
  - "close"
  - "closes"
  - "closed"
  - "closing"
correctAnswer: "close"
explanation: "A command or request usually uses the base verb form."
hint: "After please, use the direct action word."
questionGoal: "Complete an imperative sentence with a base verb."
misconception: "Adding subject-agreement endings to a command."
```

```question
key: u04_l01_q04_conditional_meaning
type: multiple-choice
prompt: "Which sentence shows a condition?"
choices:
  - "If the power returns, the lights will turn on."
  - "The lights are on."
  - "Turn on the lights."
  - "The lights are bright."
correctAnswer: "If the power returns, the lights will turn on."
explanation: "The result depends on the condition introduced by if."
hint: "Look for a sentence where one thing depends on another."
questionGoal: "Recognize conditional meaning."
misconception: "Treating all future-looking sentences as conditional."
```

```question
key: u04_l01_q05_passage_suggestion
type: passage-question
prompt: "Read the sentence and answer."
passageTitle: "Team Advice"
passage: |
  I suggest that each speaker practice with the timer before the debate.
question: "What mood meaning does the sentence show?"
choices:
  - "suggestion"
  - "past fact"
  - "question"
  - "command"
correctAnswer: "suggestion"
explanation: "The phrase I suggest that introduces a recommendation."
hint: "Look for wording that recommends an action."
questionGoal: "Identify suggestion meaning in a sentence."
misconception: "Reading a recommendation as a simple statement of fact."
```

```question
key: u04_l01_q06_mood_label_cloze
type: multi-blank-cloze
prompt: "Complete the labels for the two sentences."
parts:
  - "'Walk carefully' is a "
  - ". 'If the floor is wet, walk carefully' includes a "
  - "."
blanks:
  - correctAnswer: "command"
    choices:
      - "command"
      - "wish"
      - "comparison"
  - correctAnswer: "condition"
    choices:
      - "condition"
      - "noun phrase"
      - "series"
explanation: "Walk carefully gives a command. The if-clause gives a condition."
hint: "One tells someone what to do; the other depends on if."
questionGoal: "Differentiate command and condition meanings."
misconception: "Using one mood label for every non-statement sentence."
```

### Lesson 2: Conditions, Wishes, And Suggestions

```question
key: u04_l02_q01_if_i_were
type: fill-blank
prompt: "Choose the standard academic form for a wish or imagined situation."
sentenceBefore: "If I"
sentenceAfter: "the team captain, I would ask for more practice time."
choices:
  - "were"
  - "was"
  - "am"
  - "be"
correctAnswer: "were"
explanation: "In standard academic English, if I were often marks an imagined situation."
hint: "Use the form often used for wishes or hypotheticals."
questionGoal: "Choose were in a common hypothetical pattern."
misconception: "Treating all uses of was and were as interchangeable in formal contexts."
```

```question
key: u04_l02_q02_condition_would
type: multi-blank-cloze
prompt: "Complete the conditional sentence."
parts:
  - "If the schedule "
  - ", we "
  - " the announcement."
blanks:
  - correctAnswer: "changed"
    choices:
      - "changed"
      - "changes"
      - "changing"
  - correctAnswer: "would revise"
    choices:
      - "would revise"
      - "revised"
      - "revising"
explanation: "Changed and would revise work together to show an imagined condition and result."
hint: "The sentence imagines what would happen, not what is happening now."
questionGoal: "Complete a controlled conditional sentence."
misconception: "Mixing verb forms that do not fit the hypothetical pattern."
```

```question
key: u04_l02_q03_suggestion_base_verb
type: multiple-choice
prompt: "Which sentence uses the standard form after a suggestion?"
choices:
  - "I recommend that the committee review the plan."
  - "I recommend that the committee reviews the plan."
  - "I recommend that the committee reviewing the plan."
  - "I recommend that the committee to review the plan."
correctAnswer: "I recommend that the committee review the plan."
explanation: "After recommend that, standard academic English often uses the base verb review."
hint: "Look for the plain verb form after the subject committee."
questionGoal: "Choose a common subjunctive-style form after a recommendation."
misconception: "Adding -s because committee is singular in every context."
```

```question
key: u04_l02_q04_wish_or_fact
type: multiple-choice
prompt: "What does this sentence mean? 'I wish the answer were clearer.'"
choices:
  - "The answer is not clear enough right now."
  - "The answer is already perfectly clear."
  - "The speaker is giving a command."
  - "The speaker is listing two answers."
correctAnswer: "The answer is not clear enough right now."
explanation: "A wish often points to something that is not true or not true enough."
hint: "Ask what the speaker wants to be different."
questionGoal: "Interpret a wish sentence."
misconception: "Reading a wish as a statement that the thing is already true."
```

```question
key: u04_l02_q05_repair_suggestion
type: error-correction
prompt: "Revise the sentence for standard academic English."
sentence: "I suggest that she reviews the draft before Friday."
acceptedAnswers:
  - "I suggest that she review the draft before Friday."
explanation: "After I suggest that, the base verb review is the standard formal choice."
hint: "Use the plain verb form after she."
questionGoal: "Edit a recommendation sentence for standard academic form."
misconception: "Using the usual present-tense -s form after a suggestion trigger."
```

```question
key: u04_l02_q06_passage_condition_form
type: passage-question
prompt: "Read the sentence and choose the best completion."
passageTitle: "A Hypothetical Plan"
passage: |
  If the hallway were wider, the display tables _____ easier to arrange.
question: "Which phrase completes the hypothetical sentence?"
choices:
  - "would be"
  - "are being"
  - "was"
  - "be"
correctAnswer: "would be"
explanation: "Would be completes the imagined result of the if-clause."
hint: "The first part imagines a different situation, so the second part needs would."
questionGoal: "Complete a hypothetical condition/result pattern."
misconception: "Using a present or past form that does not match the hypothetical meaning."
```

### Lesson 3: Active Or Passive For A Reason

```question
key: u04_l03_q01_match_voice_feature
type: match-pairs
prompt: "Match each sentence to the best description."
pairs:
  - left: "The editor corrected the headline."
    right: "active voice with actor first"
  - left: "The headline was corrected by the editor."
    right: "passive voice with receiver first"
  - left: "The window was cracked during the storm."
    right: "passive voice without named actor"
  - left: "The storm cracked the window."
    right: "active voice naming the cause"
explanation: "Active voice usually puts the actor or cause first; passive voice puts the receiver first."
hint: "Ask who or what performs the action and where that noun appears."
questionGoal: "Connect active/passive sentences to actor and receiver roles."
misconception: "Assuming the subject always performs the action."
```

```question
key: u04_l03_q02_identify_passive
type: multiple-choice
prompt: "Which sentence is in passive voice?"
choices:
  - "The mural was painted by the art club."
  - "The art club painted the mural."
  - "The mural brightened the hallway."
  - "The art club planned carefully."
correctAnswer: "The mural was painted by the art club."
explanation: "The mural receives the action, and the actor appears after by."
hint: "Look for a receiver of the action before the verb."
questionGoal: "Identify passive voice in a clear sentence."
misconception: "Thinking any sentence with was is passive."
```

```question
key: u04_l03_q03_passive_to_active
type: error-correction
prompt: "Rewrite the sentence in active voice."
sentence: "The final design was approved by the council."
acceptedAnswers:
  - "The council approved the final design."
explanation: "The active revision puts the actor, the council, before the action."
hint: "Move the by phrase to the front as the actor."
questionGoal: "Transform a clear passive sentence into active voice."
misconception: "Changing verb tense or meaning while trying to make the sentence active."
```

```question
key: u04_l03_q04_choose_passive_reason
type: multiple-choice
prompt: "Which situation gives a good reason to use passive voice?"
choices:
  - "The writer wants to emphasize that the missing files were found, not who found them."
  - "The writer wants to hide responsibility for a mistake in a public apology."
  - "The writer thinks passive voice is always more formal."
  - "The writer wants every sentence to sound longer."
correctAnswer: "The writer wants to emphasize that the missing files were found, not who found them."
explanation: "Passive voice can be useful when the receiver or result matters more than the actor."
hint: "Passive voice is a choice of focus, not always an error."
questionGoal: "Choose passive voice for a defensible purpose."
misconception: "Treating passive voice as either always wrong or always formal."
```

```question
key: u04_l03_q05_actor_in_passive
type: fill-blank
prompt: "Identify the actor in the passive sentence."
sentenceBefore: "In 'The schedule was changed by the principal,' the actor is"
sentenceAfter: "."
choices:
  - "the principal"
  - "the schedule"
  - "was changed"
  - "by"
correctAnswer: "the principal"
explanation: "The principal performs the action, even though the schedule is the subject."
hint: "Look after by for the doer of the action."
questionGoal: "Identify the actor in a passive sentence."
misconception: "Assuming the grammatical subject is always the actor."
```

```question
key: u04_l03_q06_passage_voice_choice
type: passage-question
prompt: "Read the situation and choose the best revision."
passageTitle: "Lab Report"
passage: |
  A science report needs to focus on the result, not on the student who measured it.
question: "Which sentence best fits that purpose?"
choices:
  - "The temperature was recorded every five minutes."
  - "I recorded the temperature every five minutes."
  - "My partner and I carefully recorded the temperature."
  - "The temperature recorded every five minutes by me."
correctAnswer: "The temperature was recorded every five minutes."
explanation: "The passive sentence keeps the focus on the measurement process and result."
hint: "Choose the sentence that emphasizes what happened rather than who did it."
questionGoal: "Choose active or passive voice based on purpose."
misconception: "Rejecting passive voice even when it fits a formal reporting purpose."
```

### Lesson 4: Register For Audience And Purpose

```question
key: u04_l04_q01_dialogue_register
type: dialogue-builder
prompt: "Choose the best next line for a student speaking at a school board meeting."
turns:
  - speaker: "Board Chair"
    line: "Why are you asking for a safer crosswalk?"
choices:
  - "Several students cross this road each morning, and clearer signs would help drivers see us."
  - "That corner feels unsafe, and people at school talk about it a lot."
  - "You should fix it because students are upset."
  - "The crosswalk needs more signs because it is bad right now."
correctAnswer: "Several students cross this road each morning, and clearer signs would help drivers see us."
explanation: "The answer fits a formal public setting while staying clear and direct."
hint: "Choose language that fits a public request to adults making a decision."
questionGoal: "Select register appropriate to a formal civic audience."
misconception: "Thinking formal register must be stiff or that informal wording fits every audience."
```

```question
key: u04_l04_q02_audience_register
type: multiple-choice
prompt: "Which sentence best fits an academic science report?"
choices:
  - "The solution changed color after two minutes."
  - "The liquid got kind of strange after a little while."
  - "The solution changed in a cool way after two minutes."
  - "The solution performed a chromatic transformation."
correctAnswer: "The solution changed color after two minutes."
explanation: "It is precise, clear, and appropriately formal without being inflated."
hint: "Academic register values clear and specific language."
questionGoal: "Choose academic register for a report."
misconception: "Confusing formal academic language with fancy or vague wording."
```

```question
key: u04_l04_q03_passage_register_revision
type: passage-question
prompt: "Read the sentence and choose the best formal revision."
passageTitle: "Email To A Principal"
passage: |
  We wanna use the gym after school because our club needs a place to practice.
question: "Which revision fits an email to a principal?"
choices:
  - "We would like to use the gym after school because our club needs a place to practice."
  - "We wanna use the gym after school cuz we need it."
  - "Give us the gym after school."
  - "Our club needs gym after school for practice."
correctAnswer: "We would like to use the gym after school because our club needs a place to practice."
explanation: "The revision is polite, clear, and appropriate for the audience."
hint: "Keep the meaning but adjust the language for a formal school request."
questionGoal: "Revise informal wording for a formal audience."
misconception: "Changing register by becoming demanding or unclear."
```

```question
key: u04_l04_q04_academic_register_repair
type: error-correction
prompt: "Replace the informal phrase with difficult to interpret."
sentence: "The experiment was kinda hard to figure out."
acceptedAnswers:
  - "The experiment was difficult to interpret."
explanation: "Difficult to interpret is more precise and academic than kinda hard to figure out."
hint: "Keep the subject and replace the informal wording after was."
questionGoal: "Edit informal phrasing into academic register."
misconception: "Making the sentence more formal by adding vague or inflated language."
```

```question
key: u04_l04_q05_match_register_context
type: match-pairs
prompt: "Match each context to the best register label."
pairs:
  - left: "Texting a friend about practice time"
    right: "friendly text"
  - left: "Writing a lab conclusion"
    right: "academic report"
  - left: "Speaking to city council"
    right: "formal public request"
  - left: "Making quick notes for yourself"
    right: "private planning note"
explanation: "Register depends on audience, purpose, and situation."
hint: "Ask who will read or hear the language."
questionGoal: "Match contexts to appropriate register choices."
misconception: "Using one register for every situation."
```

```question
key: u04_l04_q06_respect_register
type: multiple-choice
prompt: "Which statement about register and dialect is most respectful and accurate?"
choices:
  - "Standard academic English is useful in formal school contexts, and other language varieties can be valuable in other contexts."
  - "Informal language proves the speaker does not know grammar."
  - "Everyone should speak the same way in every setting."
  - "Dialect should be corrected because it has no rules."
correctAnswer: "Standard academic English is useful in formal school contexts, and other language varieties can be valuable in other contexts."
explanation: "Grammar instruction can teach context-fit without treating home language as inferior."
hint: "Look for the answer that connects language to context without judging people."
questionGoal: "Apply a respectful view of register and language variation."
misconception: "Equating standard academic English with personal worth or intelligence."
```

## Unit 5: Punctuation As Craft

### Lesson 1: Semicolons For Close Connections

```question
key: u05_l01_q01_valid_semicolon
type: multiple-choice
prompt: "Which sentence uses a semicolon correctly?"
choices:
  - "The debate ended late; the judges announced results the next morning."
  - "After the debate ended late; the judges announced results."
  - "The debate ended; because the judges announced results."
  - "The debate ended late; and the judges announced results."
correctAnswer: "The debate ended late; the judges announced results the next morning."
explanation: "Both sides of the semicolon are independent clauses, and the ideas are closely related."
hint: "Test each side of the semicolon as its own sentence."
questionGoal: "Recognize valid semicolon use between independent clauses."
misconception: "Using a semicolon after any long opening group of words."
```

```question
key: u05_l01_q02_punctuation_choice
type: fill-blank
prompt: "Choose the punctuation that can join these closely related independent clauses."
sentenceBefore: "The lights dimmed"
sentenceAfter: "the orchestra grew quiet."
choices:
  - ";"
  - ","
  - ":"
  - "?"
correctAnswer: ";"
explanation: "A semicolon can join two closely related independent clauses."
hint: "Both sides could stand alone as complete sentences."
questionGoal: "Select a semicolon to connect independent clauses."
misconception: "Choosing a comma alone between complete thoughts."
```

```question
key: u05_l01_q03_repair_invalid_semicolon
type: error-correction
prompt: "Correct the punctuation error."
sentence: "After the storm passed; the crew inspected the bridge."
acceptedAnswers:
  - "After the storm passed, the crew inspected the bridge."
explanation: "After the storm passed is a dependent clause, so a comma after the opening clause is clearer than a semicolon."
hint: "A semicolon needs an independent clause on both sides."
questionGoal: "Repair an invalid semicolon after a dependent clause."
misconception: "Thinking semicolons can follow any introductory clause."
```

```question
key: u05_l01_q04_match_boundary
type: match-pairs
prompt: "Match each situation to the best boundary choice."
pairs:
  - left: "Two closely related independent clauses"
    right: "semicolon"
  - left: "Dependent opening plus main clause"
    right: "comma after opener"
  - left: "Two complete thoughts with a cause/result word"
    right: "comma plus so"
  - left: "Unrelated complete thoughts"
    right: "period and new sentence"
explanation: "The boundary should fit both the grammar and the relationship."
hint: "First ask whether both parts can stand alone."
questionGoal: "Match sentence structures to punctuation choices."
misconception: "Choosing punctuation by how fancy it looks instead of how the clauses work."
```

```question
key: u05_l01_q05_passage_semicolon_effect
type: passage-question
prompt: "Read the sentence and answer."
passageTitle: "A Close Connection"
passage: |
  The hallway lights failed; the emergency lamps glowed red.
question: "Why does the semicolon work here?"
choices:
  - "It links two complete, closely related thoughts."
  - "It introduces a list of lamps."
  - "It separates a subject from its verb."
  - "It turns the sentence into a question."
correctAnswer: "It links two complete, closely related thoughts."
explanation: "Both clauses are complete, and the second event follows closely from the first."
hint: "Read each side of the semicolon by itself."
questionGoal: "Explain the grammar and meaning behind semicolon use."
misconception: "Treating semicolons as decorative pauses."
```

```question
key: u05_l01_q06_no_semicolon
type: multiple-choice
prompt: "Which sentence should not use a semicolon as written?"
choices:
  - "Because the trail was flooded; we turned back."
  - "The trail was flooded; we turned back."
  - "The trail was flooded; our boots sank into the mud."
  - "The rain continued; the map grew damp."
correctAnswer: "Because the trail was flooded; we turned back."
explanation: "The first part begins with because, so it is dependent and should not stand before a semicolon."
hint: "Look for the choice where the first part cannot stand alone."
questionGoal: "Reject semicolon use with a dependent clause."
misconception: "Ignoring dependent words when checking semicolon use."
```

### Lesson 2: Colons That Point Forward

```question
key: u05_l02_q01_valid_colon
type: multiple-choice
prompt: "Which sentence uses a colon correctly?"
choices:
  - "Bring three supplies: tape, markers, and string."
  - "Bring: tape, markers, and string."
  - "The supplies are: tape, markers, and string."
  - "Because we need: tape, markers, and string."
correctAnswer: "Bring three supplies: tape, markers, and string."
explanation: "Bring three supplies is a complete setup that points forward to the list."
hint: "The words before the colon should make sense as a complete setup."
questionGoal: "Recognize correct colon use before a list."
misconception: "Putting a colon after any word that comes before a list."
```

```question
key: u05_l02_q02_colon_choice
type: fill-blank
prompt: "Choose the punctuation that points forward to the explanation."
sentenceBefore: "The rule is simple"
sentenceAfter: "save your work before closing the file."
choices:
  - ":"
  - ";"
  - ","
  - "?"
correctAnswer: ":"
explanation: "The colon points forward to the explanation of the rule."
hint: "The second part explains what the first part announces."
questionGoal: "Use a colon before an explanation."
misconception: "Using a semicolon when the second part explains or renames the first."
```

```question
key: u05_l02_q03_repair_colon_error
type: error-correction
prompt: "Correct the colon error without changing the list."
sentence: "The supplies are: tape, markers, and string."
acceptedAnswers:
  - "The supplies are tape, markers, and string."
explanation: "Do not put a colon between a verb and its complement in this simple pattern."
hint: "Remove the colon after are."
questionGoal: "Repair an unnecessary colon after a verb."
misconception: "Believing every list must have a colon."
```

```question
key: u05_l02_q04_match_colon_job
type: match-pairs
prompt: "Match each colon sentence to what the colon introduces."
pairs:
  - left: "We packed the essentials: water, maps, and flashlights."
    right: "list"
  - left: "The problem was clear: the lock had frozen."
    right: "explanation"
  - left: "One choice remained: wait for help."
    right: "single example"
  - left: "The sign gave a warning: Bridge Closed."
    right: "announced words"
explanation: "A colon points forward to material promised by the first part."
hint: "Ask what comes after the colon."
questionGoal: "Identify different jobs a colon can perform."
misconception: "Thinking colons only introduce lists."
```

```question
key: u05_l02_q05_passage_colon_revision
type: passage-question
prompt: "Read the sentence and choose the best revision."
passageTitle: "Workshop Plan"
passage: |
  The workshop has one goal teach students to revise with focus.
question: "Which revision uses a colon correctly?"
choices:
  - "The workshop has one goal: to teach students to revise with focus."
  - "The workshop has: one goal teach students to revise with focus."
  - "The workshop: has one goal teach students to revise with focus."
  - "Because the workshop has one goal: teach students."
correctAnswer: "The workshop has one goal: to teach students to revise with focus."
explanation: "The first part is a complete setup, and the second part explains the goal."
hint: "Place the colon after the complete setup."
questionGoal: "Use a colon to introduce an explanation in context."
misconception: "Putting the colon too early before the setup is complete."
```

```question
key: u05_l02_q06_colon_not_semicolon
type: multiple-choice
prompt: "Why is a colon better than a semicolon in this sentence? 'The message was urgent: evacuate the building.'"
choices:
  - "The second part explains the urgent message."
  - "The second part is an unrelated independent clause."
  - "A colon always replaces a period."
  - "The first part is a dependent clause."
correctAnswer: "The second part explains the urgent message."
explanation: "A colon points forward to the content of the urgent message."
hint: "Ask whether the second part explains what the first part announces."
questionGoal: "Distinguish colon use from semicolon use."
misconception: "Treating semicolons and colons as interchangeable formal punctuation."
```

### Lesson 3: Commas, Dashes, And Parentheses

```question
key: u05_l03_q01_commas_for_smooth_aside
type: multiple-choice
prompt: "Which sentence uses commas to set off a smooth aside?"
choices:
  - "The old bridge, repaired last spring, reopened today."
  - "The old bridge - repaired last spring - reopened today."
  - "The old bridge (repaired last spring) reopened today."
  - "The old bridge repaired last spring reopened today?"
correctAnswer: "The old bridge, repaired last spring, reopened today."
explanation: "Commas set off the extra information smoothly without strong interruption."
hint: "Choose the punctuation that feels least dramatic."
questionGoal: "Recognize commas as a smooth way to set off extra information."
misconception: "Thinking every aside needs dramatic punctuation."
```

```question
key: u05_l03_q02_dash_for_emphasis
type: multiple-choice
prompt: "Which sentence uses dashes to create the strongest interruption?"
choices:
  - "The answer - if we could find it - would change the whole plan."
  - "The answer, if we could find it, would change the whole plan."
  - "The answer (if we could find it) would change the whole plan."
  - "The answer if we could find it would change the whole plan."
correctAnswer: "The answer - if we could find it - would change the whole plan."
explanation: "Dashes create a stronger interruption than commas or parentheses."
hint: "Choose the mark that makes the aside stand out most."
questionGoal: "Select dashes for strong interruption or emphasis."
misconception: "Treating all interrupter punctuation as having the same effect."
```

```question
key: u05_l03_q03_parentheses_effect
type: passage-question
prompt: "Read the sentence and answer."
passageTitle: "Quiet Aside"
passage: |
  The trail reopened on Saturday (two weeks later than planned).
question: "What effect do the parentheses create?"
choices:
  - "They make the timing feel like a quiet aside."
  - "They create the strongest possible interruption."
  - "They join two independent clauses."
  - "They introduce a list."
correctAnswer: "They make the timing feel like a quiet aside."
explanation: "Parentheses often make extra information feel less central."
hint: "Read the words inside the parentheses as a side note."
questionGoal: "Identify the effect of parenthetical information."
misconception: "Thinking parentheses and dashes create identical emphasis."
```

```question
key: u05_l03_q04_match_mark_effect
type: match-pairs
prompt: "Match each punctuation choice to its usual effect."
pairs:
  - left: "commas around an aside"
    right: "smooth extra information"
  - left: "dashes around an aside"
    right: "strong interruption"
  - left: "parentheses around an aside"
    right: "quiet side note"
  - left: "no added punctuation"
    right: "main sentence only"
explanation: "Different marks shape how strongly the extra information stands out."
hint: "Think about the volume of the aside: smooth, strong, quiet, or absent."
questionGoal: "Connect punctuation marks to rhetorical effects."
misconception: "Choosing punctuation marks as interchangeable decorations."
```

```question
key: u05_l03_q05_comma_appositive_repair
type: error-correction
prompt: "Add punctuation to set off the extra information smoothly."
sentence: "The old telescope an heirloom from my grandfather still works."
acceptedAnswers:
  - "The old telescope, an heirloom from my grandfather, still works."
explanation: "The phrase an heirloom from my grandfather adds extra information and can be set off with commas."
hint: "Put commas around the phrase that interrupts the main sentence."
questionGoal: "Use commas to set off an interrupter or appositive."
misconception: "Leaving extra information unmarked so the sentence is hard to read."
```

```question
key: u05_l03_q06_no_extra_punctuation
type: multiple-choice
prompt: "Which sentence is clearest without added interrupter punctuation?"
choices:
  - "The student with the blue folder will present first."
  - "The student, with the blue folder, will present first."
  - "The student - with the blue folder - will present first."
  - "The student (with the blue folder) will present first."
correctAnswer: "The student with the blue folder will present first."
explanation: "The phrase with the blue folder identifies which student, so it should stay integrated into the sentence."
hint: "If the phrase identifies the noun, do not set it off as a side note."
questionGoal: "Avoid unnecessary punctuation around essential information."
misconception: "Adding punctuation around every descriptive phrase."
```

### Lesson 4: Punctuation Effects In Author Sentences

```question
key: u05_l04_q01_semicolon_effect_author
type: passage-question
prompt: "Read the sentence and answer."
passageTitle: "At The Harbor"
passage: |
  The boats rocked in the dark; the lighthouse kept its steady watch.
question: "What does the semicolon help show?"
choices:
  - "The two images are separate but closely connected."
  - "The second part is a list."
  - "The first part is incomplete."
  - "The sentence is a command."
correctAnswer: "The two images are separate but closely connected."
explanation: "The semicolon holds two complete, related images together."
hint: "Ask how the two sides relate."
questionGoal: "Analyze semicolon effect in an author-style sentence."
misconception: "Seeing the semicolon only as a correctness mark."
```

```question
key: u05_l04_q02_match_punctuation_effect
type: match-pairs
prompt: "Match each punctuation mark to a likely reading effect."
pairs:
  - left: "colon"
    right: "announces what comes next"
  - left: "semicolon"
    right: "holds related complete thoughts together"
  - left: "dash"
    right: "creates a sharp interruption"
  - left: "parentheses"
    right: "adds a quiet aside"
explanation: "Punctuation choices guide rhythm and relationships among ideas."
hint: "Think about what the mark tells the reader to expect."
questionGoal: "Connect punctuation marks to common craft effects."
misconception: "Treating punctuation choices as random or purely personal."
```

```question
key: u05_l04_q03_colon_effect
type: multiple-choice
prompt: "In the sentence 'The town needed one thing: rain,' what does the colon do?"
choices:
  - "It points forward to the one thing the town needed."
  - "It joins two unrelated sentences."
  - "It marks a question."
  - "It hides the main idea."
correctAnswer: "It points forward to the one thing the town needed."
explanation: "The colon creates a small pause and then reveals the answer."
hint: "Read the words before the colon as a setup."
questionGoal: "Explain a colon's reveal or explanation effect."
misconception: "Confusing colon effect with semicolon connection."
```

```question
key: u05_l04_q04_dash_effect_passage
type: passage-question
prompt: "Read the sentence and answer."
passageTitle: "Unexpected Turn"
passage: |
  The committee expected a quiet meeting - until the students arrived with petitions.
question: "What effect does the dash create?"
choices:
  - "It makes the turn in the sentence feel sudden."
  - "It introduces a list of petitions."
  - "It shows two equal independent clauses."
  - "It makes the sentence more formal and distant."
correctAnswer: "It makes the turn in the sentence feel sudden."
explanation: "The dash creates a strong break before the unexpected change."
hint: "Notice how the sentence shifts after the dash."
questionGoal: "Analyze dash effect as interruption or turn."
misconception: "Assuming a dash and comma would create the same force."
```

```question
key: u05_l04_q05_analysis_steps
type: order-items
prompt: "Put the steps for analyzing punctuation effect in order."
items:
  - "Name the mark."
  - "Explain how the mark changes rhythm or meaning."
  - "Read the ideas on both sides of the mark."
  - "Identify the relationship the mark signals."
correctOrder:
  - "Name the mark."
  - "Read the ideas on both sides of the mark."
  - "Identify the relationship the mark signals."
  - "Explain how the mark changes rhythm or meaning."
explanation: "Good analysis moves from noticing the mark to explaining its effect."
hint: "Before explaining effect, know what ideas the mark connects or sets off."
questionGoal: "Sequence a strategy for punctuation analysis."
misconception: "Jumping to a vague effect without reading the sentence relationship."
```

```question
key: u05_l04_q06_punctuation_overuse
type: multiple-choice
prompt: "Which revision avoids overusing punctuation?"
choices:
  - "The hikers checked the map and continued north."
  - "The hikers - checked - the map - and continued - north."
  - "The hikers: checked the map: and continued north."
  - "The hikers (checked) the map (and) continued north."
correctAnswer: "The hikers checked the map and continued north."
explanation: "No special punctuation is needed because the sentence is already clear."
hint: "If the sentence has no interruption, list, or clause boundary problem, simpler may be better."
questionGoal: "Choose restraint when punctuation adds no clarity or effect."
misconception: "Thinking more punctuation makes writing more advanced."
```

## Unit 6: Editing Systems And Grammar In Context

### Lesson 1: Copyediting Marks And Focused Passes

```question
key: u06_l01_q01_match_editing_actions
type: match-pairs
prompt: "Match each editing instruction to its action."
pairs:
  - left: "delete"
    right: "remove text"
  - left: "insert"
    right: "add text"
  - left: "transpose"
    right: "switch order"
  - left: "capitalize"
    right: "make uppercase"
explanation: "Copyediting marks are short instructions for specific changes."
hint: "Think of what the editor wants the writer to do."
questionGoal: "Connect common copyediting instructions to actions."
misconception: "Treating editing marks as labels rather than directions."
```

```question
key: u06_l01_q02_first_focused_pass
type: multiple-choice
prompt: "A paragraph has fragments and unclear sentence boundaries. Which focused pass should come first?"
choices:
  - "Sentence-boundary pass"
  - "Fancy-word pass"
  - "Final title-design pass"
  - "Random punctuation pass"
correctAnswer: "Sentence-boundary pass"
explanation: "Sentence boundaries are a foundation. Fix them before polishing style."
hint: "Start with the issue that affects whether the sentences are complete."
questionGoal: "Choose an appropriate first focused edit pass."
misconception: "Polishing style before fixing basic clarity."
```

```question
key: u06_l01_q03_order_revision_passes
type: order-items
prompt: "Put these edit passes in a sensible order for a messy paragraph."
items:
  - "Check punctuation and capitalization."
  - "Fix fragments and run-ons."
  - "Revise wordiness and awkward style."
  - "Check pronouns and modifiers for clarity."
correctOrder:
  - "Fix fragments and run-ons."
  - "Check pronouns and modifiers for clarity."
  - "Revise wordiness and awkward style."
  - "Check punctuation and capitalization."
explanation: "Foundation and clarity come before style polishing and final proofreading."
hint: "Fix complete sentences and meaning before final surface checks."
questionGoal: "Sequence focused edit passes."
misconception: "Assuming editing order does not affect revision quality."
```

```question
key: u06_l01_q04_editing_action
type: fill-blank
prompt: "Choose the action for an editor's insert mark."
sentenceBefore: "An insert mark tells the writer to"
sentenceAfter: "."
choices:
  - "add missing text"
  - "remove the sentence"
  - "switch two words"
  - "make a word lowercase"
correctAnswer: "add missing text"
explanation: "Insert means to add something that is missing."
hint: "The word insert means put in."
questionGoal: "Identify the action of an insert mark."
misconception: "Confusing insert and delete marks."
```

```question
key: u06_l01_q05_passage_choose_pass
type: passage-question
prompt: "Read the passage and choose the best focused pass."
passageTitle: "Draft Note"
passage: |
  The robot moved forward. It turned left. It stopped. It beeped.
question: "The sentences are correct but choppy. Which pass would help most?"
choices:
  - "Sentence variety pass"
  - "Fragment repair pass"
  - "Pronoun agreement pass"
  - "Capitalization-only pass"
correctAnswer: "Sentence variety pass"
explanation: "The passage has correct sentences, but the repeated short pattern needs style revision."
hint: "The problem is rhythm, not sentence completeness."
questionGoal: "Choose a focused pass based on the passage problem."
misconception: "Using the same edit pass for every passage."
```

```question
key: u06_l01_q06_proofread_or_revise
type: multiple-choice
prompt: "Which statement best distinguishes proofreading from revision?"
choices:
  - "Proofreading checks surface errors; revision improves meaning, structure, and style."
  - "Proofreading means rewriting every sentence from scratch."
  - "Revision only checks spelling."
  - "Proofreading and revision are always the same task."
correctAnswer: "Proofreading checks surface errors; revision improves meaning, structure, and style."
explanation: "Both matter, but they focus on different kinds of improvement."
hint: "One is final checking; the other can reshape the writing."
questionGoal: "Distinguish proofreading from revision."
misconception: "Treating all editing as one undifferentiated task."
```

### Lesson 2: Literary Sentences Under The Grammar Lens

```question
key: u06_l02_q01_short_sentence_literary
type: passage-question
prompt: "Read the sentence pair and answer."
passageTitle: "At The Door"
passage: |
  The footsteps crossed the porch, paused at the mat, and stopped outside the door.
  Then silence.
question: "What does the short final sentence do?"
choices:
  - "It slows the moment and builds suspense."
  - "It adds a list of actions."
  - "It explains a scientific process."
  - "It removes all emotion from the passage."
correctAnswer: "It slows the moment and builds suspense."
explanation: "The short fragment-like sentence is used deliberately for effect in this author-style passage."
hint: "Notice how the rhythm changes at the end."
questionGoal: "Analyze sentence length as literary effect."
misconception: "Assuming every fragment-like sentence in literature is accidental."
```

```question
key: u06_l02_q02_repetition_effect
type: multiple-choice
prompt: "What is the likely effect of the repetition? 'We waited for the call, waited for the door, waited for the sky to change.'"
choices:
  - "It emphasizes the long, anxious waiting."
  - "It accidentally repeats a word with no possible purpose."
  - "It shows a list that is not parallel."
  - "It hides the subject of the sentence."
correctAnswer: "It emphasizes the long, anxious waiting."
explanation: "The repeated waited creates rhythm and reinforces the feeling of delay."
hint: "Ask what feeling the repeated word creates."
questionGoal: "Identify purposeful repetition as a grammar/style choice."
misconception: "Treating all repetition as an error."
```

```question
key: u06_l02_q03_match_feature_effect
type: match-pairs
prompt: "Match each grammar feature to a likely effect."
pairs:
  - left: "short sentence after a long buildup"
    right: "sharp emphasis"
  - left: "parallel repeated phrases"
    right: "pattern and rhythm"
  - left: "passive voice without an actor"
    right: "focus on result"
  - left: "dash before a surprise"
    right: "sudden turn"
explanation: "Grammar features can shape what readers notice and how a sentence moves."
hint: "Think about attention, rhythm, focus, and surprise."
questionGoal: "Connect grammar choices to reading effects."
misconception: "Seeing grammar features as labels with no interpretive value."
```

```question
key: u06_l02_q04_passive_author_effect
type: passage-question
prompt: "Read the sentence and answer."
passageTitle: "A Hidden Actor"
passage: |
  By morning, the statue had been removed from the square.
question: "What effect does the passive voice have?"
choices:
  - "It focuses on the missing statue while leaving the remover unnamed."
  - "It clearly names who removed the statue."
  - "It makes the sentence a command."
  - "It creates a list of actions."
correctAnswer: "It focuses on the missing statue while leaving the remover unnamed."
explanation: "Passive voice puts the statue first and does not name the actor."
hint: "Ask what the sentence emphasizes and what it leaves out."
questionGoal: "Analyze passive voice as an author choice."
misconception: "Calling passive voice wrong without considering its effect."
```

```question
key: u06_l02_q05_feature_label
type: fill-blank
prompt: "Choose the grammar feature in this phrase: 'to listen, to learn, and to lead.'"
sentenceBefore: "The phrase uses"
sentenceAfter: "."
choices:
  - "parallel structure"
  - "passive voice"
  - "comma splice"
  - "dangling modifier"
correctAnswer: "parallel structure"
explanation: "Each item follows the same to plus verb pattern."
hint: "Look for matching forms in a series."
questionGoal: "Identify a grammar feature used for rhythm and balance."
misconception: "Missing parallel structure when it appears in a polished sentence."
```

```question
key: u06_l02_q06_literary_rules
type: multiple-choice
prompt: "Which statement is most accurate about grammar in literary sentences?"
choices:
  - "Authors may bend patterns for effect, but their choices still shape meaning."
  - "Literary sentences have no grammar."
  - "Punctuation in literature never affects meaning."
  - "Every unusual sentence in literature is a mistake."
correctAnswer: "Authors may bend patterns for effect, but their choices still shape meaning."
explanation: "Literary grammar can be flexible, but choices such as repetition, fragments, and punctuation still create effects."
hint: "Look for the answer that allows craft without saying grammar disappears."
questionGoal: "Apply a balanced view of grammar in literary reading."
misconception: "Believing grammar either has no role in literature or every departure is an error."
```

### Lesson 3: Revise A Passage In Passes

```question
key: u06_l03_q01_pass_sequence
type: order-items
prompt: "Put the revision passes in a strong order."
items:
  - "Polish punctuation."
  - "Fix sentence boundaries."
  - "Tighten wordiness."
  - "Clarify pronouns and modifiers."
correctOrder:
  - "Fix sentence boundaries."
  - "Clarify pronouns and modifiers."
  - "Tighten wordiness."
  - "Polish punctuation."
explanation: "Complete sentences and clear meaning should come before style and final punctuation."
hint: "Start with the foundation before polishing."
questionGoal: "Sequence cumulative revision passes."
misconception: "Trying to polish punctuation before the sentence meaning is stable."
```

```question
key: u06_l03_q02_first_boundary_fix
type: passage-question
prompt: "Read the draft and choose the first correction."
passageTitle: "Draft Paragraph"
passage: |
  The mural covered the whole wall. Because every student added one tile. The design looked like a river.
question: "Which issue should be fixed first?"
choices:
  - "The fragment 'Because every student added one tile.'"
  - "The word mural should sound fancier."
  - "The paragraph needs passive voice."
  - "The sentence 'The design looked like a river' is too clear."
correctAnswer: "The fragment 'Because every student added one tile.'"
explanation: "A dependent-clause fragment is a foundation problem."
hint: "Look for a sentence that does not express a complete thought."
questionGoal: "Identify the first sentence-boundary issue in a passage."
misconception: "Starting with style changes before fixing a fragment."
```

```question
key: u06_l03_q03_repair_fragment_in_passage
type: error-correction
prompt: "Repair the fragment by joining it to the sentence before it."
sentence: "The mural covered the whole wall. Because every student added one tile."
acceptedAnswers:
  - "The mural covered the whole wall because every student added one tile."
  - "Because every student added one tile, the mural covered the whole wall."
explanation: "The because-clause needs to attach to an independent clause."
hint: "Join the reason to the complete sentence it explains."
questionGoal: "Complete a sentence-boundary repair during passage revision."
misconception: "Leaving a dependent clause as its own sentence."
```

```question
key: u06_l03_q04_style_pass_revision
type: multiple-choice
prompt: "After sentence boundaries are fixed, which revision best tightens style? 'The reason the design looked bright was because many tiles had bright colors.'"
choices:
  - "The design looked bright because many tiles had vivid colors."
  - "The design reason was bright because bright."
  - "The design looked in a manner of brightness due to bright colors."
  - "The bright colors were, the design."
correctAnswer: "The design looked bright because many tiles had vivid colors."
explanation: "The revision removes wordiness and keeps the reason."
hint: "Cut filler while preserving the cause."
questionGoal: "Choose a concise style revision after foundational fixes."
misconception: "Adding inflated wording during a style pass."
```

```question
key: u06_l03_q05_pass_category
type: fill-blank
prompt: "Choose the focused pass for this problem: 'When Eli spoke to Omar, he sounded nervous.'"
sentenceBefore: "This sentence needs a"
sentenceAfter: "."
choices:
  - "pronoun clarity pass"
  - "colon list pass"
  - "capitalization pass"
  - "parallelism pass"
correctAnswer: "pronoun clarity pass"
explanation: "The pronoun he could refer to Eli or Omar."
hint: "Ask whether the reader can tell who he means."
questionGoal: "Choose a focused pass based on an unclear pronoun."
misconception: "Treating every revision problem as punctuation."
```

```question
key: u06_l03_q06_passage_preserve_meaning
type: passage-question
prompt: "Read the sentence and choose the best revision."
passageTitle: "Meaning Matters"
passage: |
  The student council postponed the vote because two members were absent.
question: "Which revision improves concision without changing the meaning?"
choices:
  - "The student council postponed the vote because two members were absent."
  - "The student council canceled the vote because everyone was absent."
  - "The student council canceled the vote because two members were absent."
  - "The student council postponed the vote after two absent members arrived."
correctAnswer: "The student council postponed the vote because two members were absent."
explanation: "The original is already concise and clear; changing postponed to canceled would change meaning."
hint: "A revision is not better if it changes the facts."
questionGoal: "Recognize when preserving a clear sentence is the best revision choice."
misconception: "Assuming every sentence must be changed during revision."
```

### Lesson 4: Portfolio Check: Justify The Revision

```question
key: u06_l04_q01_justify_revision
type: passage-question
prompt: "Read the before and after revision."
passageTitle: "Before And After"
passage: |
  Before: The reason we stayed inside was because the path was icy.
  After: We stayed inside because the path was icy.
question: "Which justification best explains the revision?"
choices:
  - "It removes wordiness while keeping the reason for staying inside."
  - "It changes the meaning from inside to outside."
  - "It adds passive voice to hide the actor."
  - "It makes the sentence less clear."
correctAnswer: "It removes wordiness while keeping the reason for staying inside."
explanation: "The revision cuts filler but preserves the cause."
hint: "Ask what changed and what stayed the same."
questionGoal: "Choose a precise justification for a concision revision."
misconception: "Giving vague praise instead of naming the revision target."
```

```question
key: u06_l04_q02_preserve_meaning_revision
type: multiple-choice
prompt: "Which revision improves the sentence without changing its meaning? 'The committee rejected the plan for the exhibit because it was too expensive.'"
choices:
  - "The committee rejected the plan for the exhibit because the plan was too expensive."
  - "The committee accepted the plan because the exhibit was affordable."
  - "The exhibit rejected the committee."
  - "Because it was too expensive, the committee was a proposal."
correctAnswer: "The committee rejected the plan for the exhibit because the plan was too expensive."
explanation: "Naming the plan clarifies what was too expensive while preserving the action and reason."
hint: "Keep the same action and reason, but remove possible pronoun confusion."
questionGoal: "Select a revision that improves clarity and preserves meaning."
misconception: "Choosing a smoother sentence that reverses or changes the facts."
```

```question
key: u06_l04_q03_match_revision_purpose
type: match-pairs
prompt: "Match each revision to its main purpose."
pairs:
  - left: "Maya likes hiking, swimming, and biking."
    right: "repair parallelism"
  - left: "The plan was approved by the board."
    right: "focus on result"
  - left: "The answer - at last - was clear."
    right: "add emphasis"
  - left: "Because the road flooded, we turned back."
    right: "repair fragment"
explanation: "A strong justification names the grammar target or effect."
hint: "Ask what problem or purpose the revision addresses."
questionGoal: "Connect revisions to specific grammar purposes."
misconception: "Using broad comments such as 'sounds better' without naming the target."
```

```question
key: u06_l04_q04_passage_best_reason
type: passage-question
prompt: "Read the revision and choose the best reason."
passageTitle: "Voice Choice"
passage: |
  Before: Someone moved the meeting to Friday.
  After: The meeting was moved to Friday.
question: "When would the after version be the better choice?"
choices:
  - "When the schedule change matters more than who made it"
  - "When the writer must clearly name who made the change"
  - "When the writer wants a more casual text to a friend"
  - "When the writer wants to repair a list"
correctAnswer: "When the schedule change matters more than who made it"
explanation: "The passive revision focuses on the meeting and the new date."
hint: "Passive voice can focus attention on the receiver or result."
questionGoal: "Justify a passive-voice revision by purpose."
misconception: "Saying passive voice is always wrong or always better."
```

```question
key: u06_l04_q05_overformal_risk
type: multiple-choice
prompt: "Which revision is too formal and less clear?"
choices:
  - "We need more time to test the bridge."
  - "Additional temporal resources are necessitated for bridge-testing operations."
  - "We need two more days to test the bridge."
  - "The bridge needs more testing time."
correctAnswer: "Additional temporal resources are necessitated for bridge-testing operations."
explanation: "The sentence sounds inflated and is less clear than the direct versions."
hint: "Formal writing should still be clear."
questionGoal: "Reject overformal revision that reduces clarity."
misconception: "Equating formal register with inflated vocabulary."
```

```question
key: u06_l04_q06_final_portfolio_check
type: fill-blank
prompt: "Choose the best final check for a portfolio revision."
sentenceBefore: "A strong final revision should improve a target and"
sentenceAfter: "."
choices:
  - "preserve the intended meaning"
  - "change as many words as possible"
  - "sound more complicated"
  - "hide the main idea"
correctAnswer: "preserve the intended meaning"
explanation: "A revision should improve clarity, style, register, or correctness without distorting the writer's idea."
hint: "Ask whether the after version still says what the writer meant."
questionGoal: "State the final criterion for justified revision."
misconception: "Thinking a revision is stronger simply because it changes more words."
```
