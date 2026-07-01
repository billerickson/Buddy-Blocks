# Level 1 Logic Question Sets

Sources: accepted Level 1 Logic blueprint, course map, unit design briefs, and lesson briefs in `research/logic-1/`.

## Unit 1: Claims, Reasons, And Tiny Arguments

### Lesson 1: Statements, Questions, And Commands

```question
key: u01_l01_q01_statement_recognition
type: multiple-choice
prompt: "Which sentence is a statement?"
choices:
  - "The library opens at nine."
  - "When does the library open?"
  - "Please open the library door."
  - "What a huge library!"
correctAnswer: "The library opens at nine."
explanation: "A statement tells something that can be true or false."
hint: "Look for the sentence that tells information instead of asking or directing."
questionGoal: "Recognize a statement by its job."
misconception: "Treating every complete sentence as the same kind of sentence."
```

```question
key: u01_l01_q02_sentence_jobs
type: match-pairs
prompt: "Match each sentence to its job."
pairs:
  - left: "Close the notebook."
    right: "command"
  - left: "Did you finish the page?"
    right: "question"
  - left: "The page has ten problems."
    right: "statement"
  - left: "That was surprising!"
    right: "exclamation"
explanation: "Commands direct, questions ask, statements tell, and exclamations show strong feeling."
hint: "Ask what each sentence is trying to do."
questionGoal: "Sort sentences by communicative job."
misconception: "Using punctuation alone without checking sentence meaning."
```

```question
key: u01_l01_q03_question_definition
type: fill-blank
prompt: "Complete the sentence: A question is a sentence that ___."
sentenceBefore: "A question is a sentence that"
sentenceAfter: "."
choices:
  - "asks for information"
  - "tells someone what to do"
  - "gives a reason"
  - "shows a claim"
correctAnswer: "asks for information"
explanation: "A question asks for information or an answer."
hint: "Think about what you expect someone to give back after a question."
questionGoal: "Recall the function of a question."
misconception: "Confusing questions with commands that mention an action."
```

```question
key: u01_l01_q04_command_choice
type: multiple-choice
prompt: "Which sentence is a command?"
choices:
  - "Line up by the door."
  - "The door is open."
  - "Is the door open?"
  - "What a loud door!"
correctAnswer: "Line up by the door."
explanation: "A command tells someone to do something."
hint: "Find the sentence that gives a direction."
questionGoal: "Identify a command in a familiar classroom context."
misconception: "Thinking commands must always sound bossy or include an exclamation mark."
```

```question
key: u01_l01_q05_passage_sentence_job
type: passage-question
prompt: "Read the lines and answer the question."
passageTitle: "Four Lines"
passage: |
  The class planted seeds.
  Did the seeds sprout?
  Water the tray gently.
  What a tall sprout!
question: "Which line is an exclamation?"
choices:
  - "The class planted seeds."
  - "Did the seeds sprout?"
  - "Water the tray gently."
  - "What a tall sprout!"
correctAnswer: "What a tall sprout!"
explanation: "That line shows strong feeling or surprise, so it is an exclamation."
hint: "Look for the line that shows strong feeling."
questionGoal: "Identify an exclamation inside a short set of sentence jobs."
misconception: "Reading every sentence in a passage as a statement."
```

```question
key: u01_l01_q06_explain_sentence_job
type: constructed-response
prompt: "Explain why 'Bring your folder to the table' is a command."
minWords: 6
sampleAnswer: "It tells someone what to do."
checklist:
  - "Say that the sentence tells or directs someone"
  - "Mention the action"
explanation: "A command gives a direction. This sentence directs someone to bring a folder."
hint: "Ask what the sentence wants the listener to do."
questionGoal: "Explain the clue that identifies a command."
misconception: "Identifying sentence jobs without using meaning as evidence."
```

### Lesson 2: Opinion, Claim, Or Feeling?

```question
key: u01_l02_q01_supportable_claim
type: multiple-choice
prompt: "Which sentence is a claim someone could support with reasons or evidence?"
choices:
  - "Our class should read outside today."
  - "I feel tired today."
  - "I like blue notebooks best."
  - "Wow, that is bright!"
correctAnswer: "Our class should read outside today."
explanation: "Someone could give reasons for or against reading outside today."
hint: "Look for the sentence that someone could try to prove or support."
questionGoal: "Distinguish a supportable claim from a feeling or preference."
misconception: "Thinking every personal sentence works like a claim."
```

```question
key: u01_l02_q02_sort_opinion_feeling_claim
type: match-pairs
prompt: "Match each sentence to the best label."
pairs:
  - left: "I feel nervous before the play."
    right: "feeling"
  - left: "Chocolate milk tastes best."
    right: "preference"
  - left: "The play needs more rehearsal time."
    right: "supportable claim"
  - left: "I enjoyed the funny scene."
    right: "personal reaction"
explanation: "Feelings and preferences are personal. A supportable claim can be backed with reasons."
hint: "Ask whether the sentence tells a feeling, a liking, or an idea someone could support."
questionGoal: "Sort personal language and supportable claims."
misconception: "Treating feelings as claims that must be proven true or false."
```

```question
key: u01_l02_q03_feeling_blank
type: fill-blank
prompt: "Complete the idea: A feeling tells how someone ___."
sentenceBefore: "A feeling tells how someone"
sentenceAfter: "."
choices:
  - "feels"
  - "proves a claim"
  - "gives evidence"
  - "sorts facts"
correctAnswer: "feels"
explanation: "A feeling tells a person's inner state, such as excited, worried, or tired."
hint: "The word feeling is your clue."
questionGoal: "Recall the role of feeling statements."
misconception: "Expecting feelings to work like evidence-based claims."
```

```question
key: u01_l02_q04_claim_in_context
type: passage-question
prompt: "Read the short scene and answer."
passageTitle: "Lunch Choice"
passage: |
  Maya said, "I like soup."
  Leo said, "Soup would be a smart lunch today because it is cold outside."
question: "Which sentence is Leo's claim?"
choices:
  - "I like soup."
  - "Soup would be a smart lunch today."
  - "because it is cold outside"
  - "Maya said"
correctAnswer: "Soup would be a smart lunch today."
explanation: "Leo is claiming that soup is a smart lunch choice today."
hint: "Find what Leo wants someone to accept."
questionGoal: "Identify a supportable claim in a short context."
misconception: "Confusing a reason after because with the claim."
```

```question
key: u01_l02_q05_evidence_ready_sentence
type: multiple-choice
prompt: "Which sentence would be easiest to support with evidence?"
choices:
  - "The school garden has more tomato plants than pepper plants."
  - "Tomatoes are my favorite food."
  - "I feel proud of the garden."
  - "Gardens are amazing!"
correctAnswer: "The school garden has more tomato plants than pepper plants."
explanation: "You could count the plants to support that claim."
hint: "Look for a sentence that could be checked with information."
questionGoal: "Recognize a claim that can be checked with evidence."
misconception: "Treating excitement or preference as evidence-ready in the same way as a countable claim."
```

```question
key: u01_l02_q06_write_supportable_claim
type: constructed-response
prompt: "Write one supportable claim about recess, reading, lunch, or a classroom routine."
minWords: 5
sampleAnswer: "Recess should include a quiet game area."
checklist:
  - "Write a complete claim"
  - "Make it something someone could support with a reason"
explanation: "A supportable claim is an idea someone could give reasons for."
hint: "Start with 'Our class should...' or 'It would help if...'"
questionGoal: "Produce a simple supportable claim."
misconception: "Writing only a feeling or preference instead of a claim."
```

### Lesson 3: Reasons With Because

```question
key: u01_l03_q01_reason_after_because
type: multiple-choice
prompt: "In the sentence, 'We should close the window because the rain is coming in,' what is the reason?"
choices:
  - "the rain is coming in"
  - "We should close the window"
  - "because"
  - "the window"
correctAnswer: "the rain is coming in"
explanation: "The reason comes after because and explains why the window should be closed."
hint: "Ask why the speaker thinks the window should be closed."
questionGoal: "Identify the reason in a because sentence."
misconception: "Selecting the claim instead of the reason."
```

```question
key: u01_l03_q02_claim_reason_frame
type: multi-blank-cloze
prompt: "Complete the labels for this tiny argument: 'The team should practice today because the game is tomorrow.'"
parts:
  - "Claim: The team should "
  - ". Reason: the game is "
  - "."
blanks:
  - correctAnswer: "practice today"
    acceptedAnswers:
      - "practice today"
  - correctAnswer: "tomorrow"
    acceptedAnswers:
      - "tomorrow"
explanation: "The claim says what should happen. The reason explains why."
hint: "The claim is before because; the reason is after because."
questionGoal: "Separate claim and reason in a because argument."
misconception: "Treating the full sentence as one undivided idea."
```

```question
key: u01_l03_q03_match_claim_reason
type: match-pairs
prompt: "Match each claim to a reason that could support it."
pairs:
  - left: "We should sharpen the pencils."
    right: "Several pencils have broken tips."
  - left: "The class should bring water bottles."
    right: "The field day will be outside."
  - left: "This shelf needs a label."
    right: "Students cannot tell where the books go."
  - left: "The group should speak more quietly."
    right: "Another group is recording nearby."
explanation: "Each reason explains why the matching claim would make sense."
hint: "Ask which reason answers why the claim should happen."
questionGoal: "Connect claims with relevant because-reasons."
misconception: "Matching by shared classroom topic instead of support."
```

```question
key: u01_l03_q04_because_not_magic
type: multiple-choice
prompt: "Which because sentence gives a reason that really supports the claim?"
choices:
  - "We should bring the books inside because rain could damage them."
  - "We should bring the books inside because my shoes are green."
  - "We should bring the books inside because Tuesday comes after Monday."
  - "We should bring the books inside because I can count to ten."
correctAnswer: "We should bring the books inside because rain could damage them."
explanation: "Rain damaging books is a real reason to bring them inside."
hint: "The word because is not enough. Check whether the reason helps the claim."
questionGoal: "Recognize that because must connect to relevant support."
misconception: "Believing any because-clause makes an argument logical."
```

```question
key: u01_l03_q05_reason_function
type: fill-blank
prompt: "Complete the sentence: A reason tells ___ a claim might be true or worth doing."
sentenceBefore: "A reason tells"
sentenceAfter: "a claim might be true or worth doing."
choices:
  - "why"
  - "when"
  - "where"
  - "who"
correctAnswer: "why"
explanation: "A reason answers why someone should accept the claim."
hint: "A reason usually answers a why question."
questionGoal: "Recall the function of a reason."
misconception: "Treating a reason as any extra detail."
```

```question
key: u01_l03_q06_write_because_reason
type: constructed-response
prompt: "Complete this tiny argument with a reason: 'We should clean the art table because ___.'"
minWords: 5
sampleAnswer: "paint and paper scraps are still on it."
checklist:
  - "Give a reason that fits cleaning the art table"
  - "Do not give a new unrelated claim"
explanation: "A fitting reason explains why cleaning the art table makes sense."
hint: "Think about what problem cleaning the table would solve."
questionGoal: "Produce a relevant reason in a because frame."
misconception: "Adding an unrelated detail after because."
```

### Lesson 4: Find The Claim And Reason

```question
key: u01_l04_q01_claim_in_two_sentence_argument
type: passage-question
prompt: "Read the argument and answer."
passageTitle: "Class Pet"
passage: |
  A fish would be a good class pet.
  It is quiet and needs less space than many other pets.
question: "What is the claim?"
choices:
  - "A fish would be a good class pet."
  - "It is quiet."
  - "It needs less space."
  - "many other pets"
correctAnswer: "A fish would be a good class pet."
explanation: "The claim is what the speaker wants others to accept."
hint: "Find the main idea the reason is supporting."
questionGoal: "Identify the claim in a short argument."
misconception: "Selecting a detail from the reason as the claim."
```

```question
key: u01_l04_q02_reason_in_two_sentence_argument
type: multiple-choice
prompt: "In the argument, 'The soccer field should be closed today. The grass is muddy and slippery,' which sentence gives the reason?"
choices:
  - "The grass is muddy and slippery."
  - "The soccer field should be closed today."
  - "soccer field"
  - "today"
correctAnswer: "The grass is muddy and slippery."
explanation: "Muddy, slippery grass explains why closing the field might make sense."
hint: "Ask which sentence answers why."
questionGoal: "Identify the reason when it appears after the claim."
misconception: "Choosing the claim because it appears first."
```

```question
key: u01_l04_q03_match_argument_to_claim
type: match-pairs
prompt: "Match each short argument to its claim."
pairs:
  - left: "The hallway should be quieter because classes are reading."
    right: "The hallway should be quieter."
  - left: "Because the glue is still wet, the poster needs more drying time."
    right: "The poster needs more drying time."
  - left: "The map belongs near the door because visitors use it."
    right: "The map belongs near the door."
  - left: "Because the puzzle has missing pieces, we should choose a different game."
    right: "We should choose a different game."
explanation: "The claim is the idea being supported, even when the reason comes first."
hint: "Ignore the order and ask what idea the argument is trying to support."
questionGoal: "Find claims when claim and reason appear in varied order."
misconception: "Assuming the first clause is always the claim."
```

```question
key: u01_l04_q04_reasoning_steps
type: order-items
prompt: "Put the steps for finding claim and reason in a useful order."
items:
  - "Find the sentence or part that tells why"
  - "Read the whole argument"
  - "Find what the speaker wants you to accept"
  - "Check that the why-part supports that idea"
correctOrder:
  - "Read the whole argument"
  - "Find what the speaker wants you to accept"
  - "Find the sentence or part that tells why"
  - "Check that the why-part supports that idea"
explanation: "Read first, then identify the claim, reason, and connection."
hint: "You need the whole argument before labeling the parts."
questionGoal: "Sequence a routine for identifying claim and reason."
misconception: "Labeling parts from position or keywords without reading for meaning."
```

```question
key: u01_l04_q05_reason_first_argument
type: multiple-choice
prompt: "Which part is the claim? 'Because the paint is still wet, we should not touch the sign.'"
choices:
  - "we should not touch the sign"
  - "Because the paint is still wet"
  - "the paint"
  - "the sign"
correctAnswer: "we should not touch the sign"
explanation: "The claim is what the speaker says should happen. The wet paint is the reason."
hint: "The reason can come first. Look for the idea being supported."
questionGoal: "Identify the claim when the reason comes first."
misconception: "Assuming because always introduces the claim."
```

```question
key: u01_l04_q06_label_claim_reason
type: constructed-response
prompt: "In this argument, name the claim and the reason: 'We should save the boxes because they can hold art supplies.'"
minWords: 8
sampleAnswer: "Claim: We should save the boxes. Reason: They can hold art supplies."
checklist:
  - "Name the claim"
  - "Name the reason"
explanation: "The claim says what should happen. The reason explains why saving the boxes is useful."
hint: "Use the frame: Claim: ___. Reason: ___."
questionGoal: "Produce claim and reason labels for a short argument."
misconception: "Repeating the whole sentence without separating the reasoning parts."
```

### Lesson 5: Build A Tiny Argument

```question
key: u01_l05_q01_best_reason
type: multiple-choice
prompt: "Choose the best reason to complete this tiny argument: 'The class should label the supply bins because ___.'"
choices:
  - "students could find materials faster"
  - "the bins are made of plastic"
  - "there are windows in the room"
  - "math class starts after lunch"
correctAnswer: "students could find materials faster"
explanation: "Finding materials faster explains why labels would help."
hint: "Ask which reason tells why labels would be useful."
questionGoal: "Choose a relevant reason for a given claim."
misconception: "Choosing a true detail that does not support the claim."
```

```question
key: u01_l05_q02_tiny_argument_frame
type: multi-blank-cloze
prompt: "Complete the tiny argument."
parts:
  - "Claim: The reading corner should stay tidy. Reason: "
  - " can find books more easily."
blanks:
  - correctAnswer: "students"
    acceptedAnswers:
      - "students"
      - "readers"
      - "kids"
explanation: "The reason explains the benefit of keeping the reading corner tidy."
hint: "Who uses the reading corner?"
questionGoal: "Complete a claim-reason frame with a fitting support idea."
misconception: "Completing the frame with an unrelated word or new claim."
```

```question
key: u01_l05_q03_fix_unrelated_reason
type: error-correction
prompt: "Fix the weak reason so it supports the claim."
sentence: "The library should stay open longer because I like pizza."
acceptedAnswers:
  - "The library should stay open longer because students need more time to choose books."
  - "The library should stay open longer because some students can only visit after class."
  - "The library should stay open longer because readers need more time to borrow books."
explanation: "A good fix gives a reason about the library staying open, not an unrelated food preference."
hint: "Keep the same claim, but replace the reason after because."
questionGoal: "Revise a tiny argument by replacing unrelated support."
misconception: "Adding any because-clause instead of a relevant reason."
```

```question
key: u01_l05_q04_match_claim_to_reason
type: match-pairs
prompt: "Match each claim to a reason that supports it."
pairs:
  - left: "The class should recycle paper."
    right: "It can reduce waste."
  - left: "We should practice the song again."
    right: "Some singers missed the ending."
  - left: "The game needs clearer rules."
    right: "Players keep arguing about turns."
  - left: "The plants need water."
    right: "The soil feels dry."
explanation: "Each reason answers why its claim makes sense."
hint: "Match by support, not by a repeated word."
questionGoal: "Build tiny arguments by pairing claims and reasons."
misconception: "Matching claim and reason by topic words without checking the why connection."
```

```question
key: u01_l05_q05_dialogue_tiny_argument
type: dialogue-builder
prompt: "Choose the best next line to make a tiny argument."
turns:
  - speaker: "Nora"
    line: "I think we should move the paint brushes to a lower shelf."
choices:
  - "because younger students could reach them safely."
  - "because yesterday was Wednesday."
  - "because I have a blue backpack."
  - "because paint brushes are called brushes."
correctAnswer: "because younger students could reach them safely."
explanation: "That line gives a reason that supports moving the brushes."
hint: "Choose the line that answers why the shelf should change."
questionGoal: "Complete a spoken tiny argument with relevant support."
misconception: "Choosing a grammatically possible but unrelated response."
```

```question
key: u01_l05_q06_write_tiny_argument
type: constructed-response
prompt: "Write a tiny argument about a classroom routine. Include one claim and one reason."
minWords: 8
sampleAnswer: "We should return tablets to the cart because they are easier to find there."
checklist:
  - "Include a claim"
  - "Include one reason that supports the claim"
explanation: "A tiny argument has an idea someone should accept and a reason that supports it."
hint: "Use the frame: We should ___ because ___."
questionGoal: "Produce a complete tiny argument with relevant support."
misconception: "Writing a claim without a reason or a reason that does not fit."
```

## Unit 2: Support, Evidence, And Relevance

### Lesson 1: Reasons, Examples, And Evidence

```question
key: u02_l01_q01_reason_example_evidence
type: multiple-choice
prompt: "Which sentence is an example that could support the claim 'The garden attracts insects'?"
choices:
  - "Yesterday three bees landed on the flowers."
  - "The garden should be watered."
  - "because insects can help plants"
  - "Gardens are peaceful places."
correctAnswer: "Yesterday three bees landed on the flowers."
explanation: "That sentence gives one case, or example, of insects visiting the garden."
hint: "An example shows a specific case."
questionGoal: "Recognize an example as a support type."
misconception: "Confusing a general reason with a specific example."
```

```question
key: u02_l01_q02_support_type_match
type: match-pairs
prompt: "Match each support type to what it does."
pairs:
  - left: "reason"
    right: "explains why a claim may be true"
  - left: "example"
    right: "shows one specific case"
  - left: "evidence"
    right: "gives information that can support a claim"
  - left: "claim"
    right: "states the idea being supported"
explanation: "Each part has a different job in reasoning."
hint: "Ask whether the part says the idea, explains why, shows a case, or gives information."
questionGoal: "Connect core support vocabulary to meaning."
misconception: "Using claim, reason, example, and evidence as interchangeable words."
```

```question
key: u02_l01_q03_evidence_in_argument
type: passage-question
prompt: "Read the argument and answer."
passageTitle: "Reading Minutes"
passage: |
  Our class read more this month than last month.
  Last month we read 320 minutes. This month we read 410 minutes.
question: "Which part is evidence?"
choices:
  - "Last month we read 320 minutes. This month we read 410 minutes."
  - "Our class read more this month than last month."
  - "Reading is important."
  - "this month"
correctAnswer: "Last month we read 320 minutes. This month we read 410 minutes."
explanation: "The numbers are information that support the claim about reading more."
hint: "Evidence is the information that helps prove the claim."
questionGoal: "Identify evidence in a short data-based argument."
misconception: "Selecting the claim instead of the evidence."
```

```question
key: u02_l01_q04_support_sentence_type
type: multiple-choice
prompt: "Claim: 'This backpack is too heavy for a short walk.' Support: 'It weighs 18 pounds.' What kind of support is this?"
choices:
  - "evidence"
  - "question"
  - "command"
  - "feeling"
correctAnswer: "evidence"
explanation: "The weight is information that can support the claim."
hint: "A measurement is information, not just an opinion."
questionGoal: "Classify measured information as evidence."
misconception: "Thinking evidence must be a long report or adult source."
```

```question
key: u02_l01_q05_complete_support_type
type: fill-blank
prompt: "Complete the sentence: An example shows ___ case."
sentenceBefore: "An example shows"
sentenceAfter: "case."
choices:
  - "one specific"
  - "every possible"
  - "no"
  - "an unrelated"
correctAnswer: "one specific"
explanation: "An example is a specific case, not proof of every possible case."
hint: "Think of an example as one case you can point to."
questionGoal: "Recall the meaning of example as support."
misconception: "Treating one example as proof of every case."
```

```question
key: u02_l01_q06_explain_support_type
type: constructed-response
prompt: "Claim: 'The hallway is crowded after lunch.' Support: 'Students from three classes leave at the same time.' Explain whether the support is a reason, example, or evidence."
minWords: 8
sampleAnswer: "It is evidence because it gives information about why the hallway is crowded."
checklist:
  - "Choose reason, example, or evidence"
  - "Explain the clue in the support"
explanation: "The support gives information about classes leaving at the same time, which can support the claim."
hint: "Ask whether the support explains why, shows one case, or gives information."
questionGoal: "Justify a support-type classification."
misconception: "Labeling support without explaining how it works."
```

### Lesson 2: Support That Fits The Claim

```question
key: u02_l02_q01_best_support_exact_claim
type: multiple-choice
prompt: "Claim: 'The classroom needs another pencil sharpener.' Which support fits best?"
choices:
  - "Students wait in a long line to sharpen pencils."
  - "The classroom has blue chairs."
  - "Some students use markers."
  - "The door is near the pencil sharpener."
correctAnswer: "Students wait in a long line to sharpen pencils."
explanation: "A long line supports the need for another pencil sharpener."
hint: "Choose the support that answers why another sharpener is needed."
questionGoal: "Select support that fits a specific claim."
misconception: "Choosing a classroom detail that is true but not supportive."
```

```question
key: u02_l02_q02_claim_support_match
type: match-pairs
prompt: "Match each claim to the support that fits it."
pairs:
  - left: "The book bin is too full."
    right: "Books fall out when students pull one out."
  - left: "The class needs quieter transitions."
    right: "Two groups could not hear directions yesterday."
  - left: "The lunch line should start earlier."
    right: "Several students run out of eating time."
  - left: "The art paper should be sorted by size."
    right: "Students keep choosing paper that is too small."
explanation: "Each support sentence gives a reason or evidence for its matching claim."
hint: "Do not match by any school word; match by what the support proves."
questionGoal: "Pair claims with directly relevant support."
misconception: "Matching by shared setting instead of exact reasoning connection."
```

```question
key: u02_l02_q03_support_fit_passage
type: passage-question
prompt: "Read the claim and supports."
passageTitle: "Quiet Reading"
passage: |
  Claim: The class should have five quiet minutes after recess.
  Support A: Students often return from recess excited and loud.
  Support B: The playground has two basketball hoops.
question: "Which support fits the claim better?"
choices:
  - "Support A"
  - "Support B"
  - "Both support it equally"
  - "Neither support says anything"
correctAnswer: "Support A"
explanation: "Excited, loud students explain why quiet minutes after recess might help."
hint: "Ask which support explains the need for quiet minutes."
questionGoal: "Choose relevant support in a short passage format."
misconception: "Choosing a true playground detail because it appears in the same setting."
```

```question
key: u02_l02_q04_relevant_or_not
type: fill-blank
prompt: "Complete the sentence: Support is relevant when it ___ the exact claim."
sentenceBefore: "Support is relevant when it"
sentenceAfter: "the exact claim."
choices:
  - "helps prove"
  - "uses longer words than"
  - "changes the topic from"
  - "sounds exciting near"
correctAnswer: "helps prove"
explanation: "Relevant support helps prove or explain the exact claim."
hint: "Relevant support should point at the claim."
questionGoal: "Recall the meaning of relevance."
misconception: "Thinking support quality depends on length or excitement."
```

```question
key: u02_l02_q05_best_support_explanation
type: multiple-choice
prompt: "Claim: 'The map should be moved lower on the wall.' Which explanation best shows why this support fits: 'Many students cannot read the top labels'?"
choices:
  - "It explains why the map's height is a problem."
  - "It proves maps are colorful."
  - "It tells who made the map."
  - "It shows that labels are always confusing."
correctAnswer: "It explains why the map's height is a problem."
explanation: "The support fits because unreadable top labels connect directly to moving the map lower."
hint: "Look for the explanation that connects the support to map height."
questionGoal: "Explain why a support sentence is relevant."
misconception: "Choosing an explanation that adds a new unsupported claim."
```

```question
key: u02_l02_q06_why_support_fits
type: constructed-response
prompt: "Claim: 'The class should keep extra tissues near the door.' Support: 'Students often need one as they come in from cold weather.' Explain why the support fits."
minWords: 8
sampleAnswer: "It fits because students need tissues right when they enter."
checklist:
  - "Mention the claim or door location"
  - "Explain how the support helps"
explanation: "The support explains why tissues near the door would be useful."
hint: "Use the frame: It fits because ___."
questionGoal: "Give a brief relevance explanation."
misconception: "Repeating the support without connecting it to the claim."
```

### Lesson 3: True But Unrelated

```question
key: u02_l03_q01_true_unrelated_detail
type: multiple-choice
prompt: "Claim: 'The fish tank needs to be cleaned.' Which true detail would NOT support the claim?"
choices:
  - "The fish tank is beside the window."
  - "The water looks cloudy."
  - "There is algae on the glass."
  - "The filter is making a grinding sound."
correctAnswer: "The fish tank is beside the window."
explanation: "Being beside the window may be true, but it does not show that the tank needs cleaning."
hint: "Find the detail that does not point to a cleaning problem."
questionGoal: "Identify a true but unrelated detail."
misconception: "Assuming true information about the topic always supports the claim."
```

```question
key: u02_l03_q02_related_topic_not_support
type: passage-question
prompt: "Read the claim and details."
passageTitle: "Backpack"
passage: |
  Claim: Eli's backpack is too heavy today.
  Detail A: It has three textbooks and a full water bottle.
  Detail B: It is bright green with black straps.
question: "Which detail is true but unrelated to the backpack being too heavy?"
choices:
  - "Detail A"
  - "Detail B"
  - "Both details"
  - "Neither detail"
correctAnswer: "Detail B"
explanation: "Color and straps do not show that the backpack is too heavy."
hint: "The claim is about weight, not appearance."
questionGoal: "Separate a topic detail from relevant support."
misconception: "Treating any backpack detail as support for a backpack claim."
```

```question
key: u02_l03_q03_unrelated_reason_match
type: match-pairs
prompt: "Match each claim to the unrelated support sentence."
pairs:
  - left: "The room is too warm."
    right: "The clock has black numbers."
  - left: "The team needs more practice."
    right: "The jerseys have stripes."
  - left: "The plant needs water."
    right: "The pot is round."
  - left: "The story needs a clearer ending."
    right: "The title has five words."
explanation: "Each right-side detail may be true, but it does not support the claim."
hint: "Pick the detail that is about the same object but not the same issue."
questionGoal: "Identify unrelated details across several claims."
misconception: "Confusing same object with relevant support."
```

```question
key: u02_l03_q04_accuracy_and_relevance
type: fill-blank
prompt: "Complete the sentence: Good support should be accurate and ___."
sentenceBefore: "Good support should be accurate and"
sentenceAfter: "."
choices:
  - "relevant"
  - "random"
  - "long"
  - "surprising"
correctAnswer: "relevant"
explanation: "Support needs to be true or accurate, and it also needs to fit the claim."
hint: "The support must help prove the claim."
questionGoal: "Recall the two-part standard for useful support."
misconception: "Thinking truth alone is enough for good support."
```

```question
key: u02_l03_q05_replace_unrelated_support
type: error-correction
prompt: "Replace the unrelated support with a reason that fits."
sentence: "The class should use larger print on the poster because the poster has a yellow border."
acceptedAnswers:
  - "The class should use larger print on the poster because people in the back cannot read it."
  - "The class should use larger print on the poster because the words are hard to see from far away."
  - "The class should use larger print on the poster because small print is difficult for visitors to read."
explanation: "A fitting reason should explain why larger print is needed."
hint: "Keep the claim about larger print and change the reason."
questionGoal: "Revise true-but-unrelated support into relevant support."
misconception: "Keeping a true detail even when it does not support the claim."
```

```question
key: u02_l03_q06_explain_unrelated
type: constructed-response
prompt: "Claim: 'The class should replace the dull markers.' Detail: 'The marker box is square.' Explain why the detail is unrelated."
minWords: 8
sampleAnswer: "The box shape does not show that the markers are dull."
checklist:
  - "Mention the claim about dull markers"
  - "Explain why the box detail does not help"
explanation: "A square box may be true, but it gives no support for replacing dull markers."
hint: "Ask what the detail proves about marker quality."
questionGoal: "Explain why a true detail fails as support."
misconception: "Rejecting unrelated support without naming the missing connection."
```

### Lesson 4: One Example Is Not Always Enough

```question
key: u02_l04_q01_careful_claim_from_example
type: multiple-choice
prompt: "Evidence: 'One apple from the basket was sour.' Which claim is careful?"
choices:
  - "At least one apple from the basket was sour."
  - "All apples in the basket are sour."
  - "Apples are always sour."
  - "No apples in the basket are sweet."
correctAnswer: "At least one apple from the basket was sour."
explanation: "One sour apple proves at least one apple was sour, not that all apples were sour."
hint: "One example supports a small claim."
questionGoal: "Choose a claim that matches limited evidence."
misconception: "Using one example to prove an all or always claim."
```

```question
key: u02_l04_q02_quantifier_choice
type: fill-blank
prompt: "A class saw two birds at the feeder. Complete the careful claim: ___ birds visited the feeder."
sentenceBefore: ""
sentenceAfter: "birds visited the feeder."
choices:
  - "Some"
  - "All"
  - "No"
  - "Never"
correctAnswer: "Some"
explanation: "Two birds show that some birds visited. They do not show all birds visited."
hint: "Use the word that means at least one."
questionGoal: "Use a careful quantifier for limited evidence."
misconception: "Choosing broad words when evidence is small."
```

```question
key: u02_l04_q03_example_claim_passage
type: passage-question
prompt: "Read the evidence and answer."
passageTitle: "Game Survey"
passage: |
  Four students tried a new math game.
  Three of them said they wanted to play it again.
question: "Which claim is best supported?"
choices:
  - "Some students wanted to play the game again."
  - "Every student in school loves the game."
  - "No one disliked the game."
  - "The game is always easy."
correctAnswer: "Some students wanted to play the game again."
explanation: "The evidence is about four students, so the careful claim uses some."
hint: "Do not make the claim bigger than the evidence."
questionGoal: "Draw a careful claim from a small sample."
misconception: "Turning a few examples into a schoolwide claim."
```

```question
key: u02_l04_q04_too_broad_match
type: match-pairs
prompt: "Match each small piece of evidence to the careful claim it supports."
pairs:
  - left: "One page in the book has a map."
    right: "At least one page has a map."
  - left: "Two students brought umbrellas."
    right: "Some students brought umbrellas."
  - left: "No pencils in this cup are sharp."
    right: "This cup has no sharp pencils."
  - left: "Three chairs at this table wobble."
    right: "Some chairs at this table wobble."
explanation: "Careful claims stay close to the evidence given."
hint: "Avoid all or always unless the evidence covers every case."
questionGoal: "Match limited evidence to appropriately narrow claims."
misconception: "Overgeneralizing from limited examples."
```

```question
key: u02_l04_q05_spot_overreach
type: multiple-choice
prompt: "Evidence: 'Two students said the instructions were confusing.' Which claim goes too far?"
choices:
  - "Everyone thought the instructions were confusing."
  - "Some students thought the instructions were confusing."
  - "At least two students were confused by the instructions."
  - "The instructions confused two students."
correctAnswer: "Everyone thought the instructions were confusing."
explanation: "Two students do not prove what everyone thought."
hint: "Watch for a claim that is much bigger than the evidence."
questionGoal: "Identify an overbroad claim from limited evidence."
misconception: "Treating everyone/all language as safe emphasis."
```

```question
key: u02_l04_q06_write_careful_claim
type: constructed-response
prompt: "Evidence: 'One student finished the puzzle in five minutes.' Write a careful claim that this evidence supports."
minWords: 6
sampleAnswer: "At least one student finished the puzzle quickly."
checklist:
  - "Do not use all, always, or everyone"
  - "Keep the claim close to the evidence"
explanation: "One example supports a careful claim about one student or at least one student."
hint: "Start with 'At least one student...'"
questionGoal: "Produce a careful claim from limited evidence."
misconception: "Writing a broad claim from one example."
```

### Lesson 5: Make The Support Stronger

```question
key: u02_l05_q01_stronger_support
type: multiple-choice
prompt: "Claim: 'The class should add a second recycling bin.' Which support makes the claim strongest?"
choices:
  - "The current bin overflows by lunchtime most days."
  - "The current bin is blue."
  - "The classroom has many desks."
  - "Recycling is a long word."
correctAnswer: "The current bin overflows by lunchtime most days."
explanation: "An overflowing bin directly supports the need for a second bin."
hint: "Choose support that shows the problem the claim would solve."
questionGoal: "Select stronger support for a claim."
misconception: "Choosing a detail that is true or topic-related but weak."
```

```question
key: u02_l05_q02_revision_choice
type: multiple-choice
prompt: "Weak claim: 'All students hate silent reading.' Evidence: 'Two students said silent reading is hard.' Which revision is more careful?"
choices:
  - "Some students find silent reading hard."
  - "All students hate every kind of reading."
  - "Silent reading is never useful."
  - "No student should read silently."
correctAnswer: "Some students find silent reading hard."
explanation: "The revision matches the evidence from two students without overclaiming."
hint: "Make the claim smaller so it fits the evidence."
questionGoal: "Revise a broad claim into a careful claim."
misconception: "Keeping all/never language after limited evidence."
```

```question
key: u02_l05_q03_fix_weak_support
type: error-correction
prompt: "Fix the weak support."
sentence: "The playground needs more shade because my favorite color is green."
acceptedAnswers:
  - "The playground needs more shade because students get too hot at midday."
  - "The playground needs more shade because there are few trees near the benches."
  - "The playground needs more shade because sunny areas become too hot during recess."
explanation: "A stronger reason explains a shade problem, not a personal color preference."
hint: "Keep the claim and replace the reason with something about shade."
questionGoal: "Improve weak support by replacing an unrelated reason."
misconception: "Adding personal preference instead of relevant support."
```

```question
key: u02_l05_q04_match_problem_to_fix
type: match-pairs
prompt: "Match each support problem to a good fix."
pairs:
  - left: "The reason is unrelated."
    right: "Choose a reason that fits the claim."
  - left: "The claim says always from one example."
    right: "Make the claim more careful."
  - left: "The support is only a topic detail."
    right: "Add evidence that proves the exact claim."
  - left: "The reason repeats the claim."
    right: "Give a new why, not the same idea again."
explanation: "Different support problems need different fixes."
hint: "Ask what is wrong before choosing how to repair it."
questionGoal: "Connect support problems with appropriate revisions."
misconception: "Using the same fix for every weak argument."
```

```question
key: u02_l05_q05_best_improved_argument
type: passage-question
prompt: "Choose the strongest improved argument."
passageTitle: "Class Jobs"
passage: |
  Weak argument: The class should rotate jobs because the job chart is orange.
question: "Which revision improves the support?"
choices:
  - "The class should rotate jobs because more students would get a turn."
  - "The class should rotate jobs because orange is bright."
  - "The class should rotate jobs because jobs are jobs."
  - "The class should rotate jobs because I said so."
correctAnswer: "The class should rotate jobs because more students would get a turn."
explanation: "More students getting a turn is a relevant reason for rotating jobs."
hint: "Choose the reason that explains why rotation would help."
questionGoal: "Choose the best revised argument in context."
misconception: "Confusing a more polished sentence with stronger reasoning."
```

```question
key: u02_l05_q06_write_stronger_support
type: constructed-response
prompt: "Claim: 'The school should add more bike racks.' Write one strong support sentence for this claim."
minWords: 7
sampleAnswer: "Many bikes are locked to the fence because the racks are full."
checklist:
  - "Support the need for more bike racks"
  - "Use a reason or evidence, not an unrelated detail"
explanation: "Strong support should show why more bike racks are needed."
hint: "Think about what problem more bike racks would solve."
questionGoal: "Produce relevant support for a claim."
misconception: "Writing a detail about bikes without supporting the need for racks."
```

## Unit 3: Conclusions From Clues

### Lesson 1: What Information Is Given?

```question
key: u03_l01_q01_given_information
type: passage-question
prompt: "Read the scenario and answer."
passageTitle: "Morning Desk"
passage: |
  Lena put a library book and a red folder on her desk.
  She walked to the pencil sharpener.
question: "What information is given?"
choices:
  - "Lena put a library book on her desk."
  - "Lena forgot her homework."
  - "Lena likes red best."
  - "Lena is late for class."
correctAnswer: "Lena put a library book on her desk."
explanation: "The passage says she put a library book on her desk. The other choices add guesses."
hint: "Choose only what the passage actually says."
questionGoal: "Identify stated information in a short scenario."
misconception: "Adding unstated details that might be possible."
```

```question
key: u03_l01_q02_given_not_given_match
type: match-pairs
prompt: "Match each statement to whether it is given or not given by the scenario: 'Three students sat at the art table. One opened a box of crayons.'"
pairs:
  - left: "Three students sat at the art table."
    right: "given"
  - left: "One student opened crayons."
    right: "given detail"
  - left: "The students drew animals."
    right: "not given"
  - left: "The crayon box was new."
    right: "not stated"
explanation: "Given information is stated in the scenario. Not-given information may be possible, but it is not stated."
hint: "Do not add what the students might do next."
questionGoal: "Sort stated facts from unstated ideas."
misconception: "Treating likely next events as given facts."
```

```question
key: u03_l01_q03_not_given_choice
type: multiple-choice
prompt: "Scenario: 'The lights flickered once. Then the classroom clock stopped.' Which statement is NOT given?"
choices:
  - "The lights flickered once."
  - "The clock stopped."
  - "The power went out in the whole school."
  - "The clock was in the classroom."
correctAnswer: "The power went out in the whole school."
explanation: "The scenario does not say the whole school lost power."
hint: "A possible explanation is not the same as given information."
questionGoal: "Identify an unstated inference or guess."
misconception: "Filling in a cause from background knowledge."
```

```question
key: u03_l01_q04_given_info_definition
type: fill-blank
prompt: "Complete the sentence: Given information is what the prompt ___ tells us."
sentenceBefore: "Given information is what the prompt"
sentenceAfter: "tells us."
choices:
  - "actually"
  - "probably"
  - "never"
  - "secretly"
correctAnswer: "actually"
explanation: "Given information is the information that is actually stated."
hint: "Look for the word that means it is really stated."
questionGoal: "Recall the meaning of given information."
misconception: "Blending stated information with guesses."
```

```question
key: u03_l01_q05_order_given_info_routine
type: order-items
prompt: "Put the routine for finding given information in order."
items:
  - "Read the prompt carefully"
  - "Underline or remember what is stated"
  - "Check whether each answer is actually stated"
  - "Reject answers that add new information"
correctOrder:
  - "Read the prompt carefully"
  - "Underline or remember what is stated"
  - "Check whether each answer is actually stated"
  - "Reject answers that add new information"
explanation: "A careful routine helps separate facts from guesses."
hint: "Start by reading before deciding."
questionGoal: "Sequence a routine for identifying given information."
misconception: "Answering from memory or imagination before checking the prompt."
```

```question
key: u03_l01_q06_explain_not_given
type: constructed-response
prompt: "Scenario: 'A tray of muffins sat on the counter. Two muffins were gone by noon.' Explain why 'the teacher ate the muffins' is not given information."
minWords: 8
sampleAnswer: "The scenario says muffins were gone, but it does not say who ate them."
checklist:
  - "Mention what the scenario says"
  - "Mention what it does not say"
explanation: "The missing muffins are given, but the person who ate them is not stated."
hint: "Use the frame: It says ___, but it does not say ___."
questionGoal: "Explain the difference between stated information and added guess."
misconception: "Treating one possible explanation as a stated fact."
```

### Lesson 2: Supported Conclusion Or Guess?

```question
key: u03_l02_q01_supported_conclusion
type: multiple-choice
prompt: "Scenario: 'The sidewalk is wet, and students are carrying umbrellas.' Which conclusion is supported?"
choices:
  - "It may have rained recently."
  - "The sprinklers are broken for sure."
  - "The students dislike sunshine."
  - "It will rain every day this week."
correctAnswer: "It may have rained recently."
explanation: "The wet sidewalk and umbrellas support the cautious conclusion that it may have rained."
hint: "Choose the conclusion that stays close to the clues."
questionGoal: "Choose a supported conclusion from given clues."
misconception: "Selecting a certain or broad guess from limited clues."
```

```question
key: u03_l02_q02_conclusion_or_guess_match
type: match-pairs
prompt: "Match each answer to the best label based on the clue: 'The class fish food container is empty.'"
pairs:
  - left: "The container has no food in it now."
    right: "supported conclusion"
  - left: "Someone should check whether more food is stored elsewhere."
    right: "reasonable next step"
  - left: "The fish have not eaten for a week."
    right: "unsupported guess"
  - left: "The fish are angry."
    right: "not supported"
explanation: "The empty container supports only careful conclusions and next steps."
hint: "Do not add a long story that the clue does not show."
questionGoal: "Separate supported conclusions from unsupported guesses."
misconception: "Turning a clue into a detailed story."
```

```question
key: u03_l02_q03_possible_not_supported
type: passage-question
prompt: "Read the scenario and answer."
passageTitle: "Missing Marker"
passage: |
  The green marker was not in the marker cup.
  It was later found on the reading table.
question: "Which answer is a guess, not a supported conclusion?"
choices:
  - "The marker was on the reading table."
  - "The marker was not in the marker cup."
  - "Someone used the marker for a secret project."
  - "The marker was green."
correctAnswer: "Someone used the marker for a secret project."
explanation: "The passage does not tell why the marker moved or who used it."
hint: "Look for the choice that adds a reason not given."
questionGoal: "Identify an unsupported guess in a short passage."
misconception: "Choosing an interesting explanation over a supported conclusion."
```

```question
key: u03_l02_q04_cannot_know_yet
type: multiple-choice
prompt: "A student sees muddy footprints near the door. What is the most careful conclusion?"
choices:
  - "Someone with muddy shoes came near the door."
  - "The principal made the footprints."
  - "It rained all morning."
  - "Everyone went outside."
correctAnswer: "Someone with muddy shoes came near the door."
explanation: "The footprints support a careful conclusion about muddy shoes, not who made them or why."
hint: "Choose what the clue shows without adding extra facts."
questionGoal: "Make a cautious conclusion from physical evidence."
misconception: "Adding identity or cause without support."
```

```question
key: u03_l02_q05_conclusion_definition
type: fill-blank
prompt: "Complete the sentence: A supported conclusion must follow from the ___."
sentenceBefore: "A supported conclusion must follow from the"
sentenceAfter: "."
choices:
  - "clues"
  - "wildest guess"
  - "longest answer"
  - "student's favorite idea"
correctAnswer: "clues"
explanation: "A supported conclusion follows from clues or information."
hint: "What should the conclusion be based on?"
questionGoal: "Recall the source of supported conclusions."
misconception: "Thinking the most detailed answer is best."
```

```question
key: u03_l02_q06_explain_guess
type: constructed-response
prompt: "Scenario: 'The playground is empty during recess time.' Explain why 'everyone is on a field trip' is a guess."
minWords: 8
sampleAnswer: "The empty playground does not tell where everyone went."
checklist:
  - "Mention the clue"
  - "Explain what the clue does not prove"
explanation: "An empty playground shows no one is there, but it does not prove a field trip."
hint: "Use: The clue shows ___, but not ___."
questionGoal: "Explain why a possible conclusion is not supported."
misconception: "Treating a possible explanation as the only explanation."
```

### Lesson 3: Conclusions From Short Passages

```question
key: u03_l03_q01_passage_conclusion
type: passage-question
prompt: "Read the passage and answer."
passageTitle: "The Wet Painting"
passage: |
  Omar placed his painting on the drying rack.
  He put a sign beside it that said, "Please do not touch."
  The blue paint still looked shiny.
question: "Which conclusion is best supported?"
choices:
  - "The painting is probably still wet."
  - "Omar dislikes blue paint."
  - "The drying rack is broken."
  - "Everyone touched the painting."
correctAnswer: "The painting is probably still wet."
explanation: "The sign and shiny paint support the conclusion that the painting is still wet."
hint: "Use the sign and the shiny paint as clues."
questionGoal: "Infer a supported conclusion from a short passage."
misconception: "Adding unsupported feelings or events to the passage."
```

```question
key: u03_l03_q02_best_clue_for_conclusion
type: multiple-choice
prompt: "Conclusion: 'The class is preparing for visitors.' Which clue best supports it?"
choices:
  - "Students arranged chairs in rows and put name tags on a table."
  - "The classroom clock is round."
  - "The windows have curtains."
  - "A pencil fell on the floor."
correctAnswer: "Students arranged chairs in rows and put name tags on a table."
explanation: "Arranged chairs and name tags are clues that visitors may be coming."
hint: "Choose the clue that points to visitors."
questionGoal: "Select passage-like evidence for an inference."
misconception: "Choosing any classroom detail as a clue."
```

```question
key: u03_l03_q03_inference_passage
type: passage-question
prompt: "Read the passage and answer."
passageTitle: "After Practice"
passage: |
  The team walked slowly off the field.
  Their coach smiled and said, "That was our best passing yet."
  Several players high-fived each other.
question: "What conclusion is supported?"
choices:
  - "The team improved at passing."
  - "The team lost every game."
  - "The coach was angry."
  - "The players never practice."
correctAnswer: "The team improved at passing."
explanation: "The coach's comment and the players' reaction support that conclusion."
hint: "Look at what the coach says."
questionGoal: "Use text clues to infer a reasonable conclusion."
misconception: "Ignoring direct passage evidence and choosing an opposite emotion."
```

```question
key: u03_l03_q04_passage_detail_to_conclusion
type: match-pairs
prompt: "Match each clue to the conclusion it supports."
pairs:
  - left: "The floor sign says 'Caution: Wet.'"
    right: "The floor may be slippery."
  - left: "Three desks are pushed together with poster paper on top."
    right: "A group project may be happening."
  - left: "The thermometer reads 32 degrees."
    right: "The temperature is freezing."
  - left: "A note says the bus leaves at 8:00."
    right: "Students need to be ready before 8:00."
explanation: "Each conclusion follows from the clue without adding a big guess."
hint: "Match the clue to the conclusion it most directly supports."
questionGoal: "Connect clues to supported conclusions."
misconception: "Drawing conclusions that are possible but not tied to the clue."
```

```question
key: u03_l03_q05_reject_outside_knowledge
type: multiple-choice
prompt: "A passage says, 'The class hamster slept all afternoon.' Which conclusion stays closest to the passage?"
choices:
  - "The hamster slept during the afternoon."
  - "The hamster is sick."
  - "All hamsters sleep during class."
  - "The class forgot to feed the hamster."
correctAnswer: "The hamster slept during the afternoon."
explanation: "The passage only tells us that the hamster slept all afternoon."
hint: "Choose what the passage supports, not what might be true in another situation."
questionGoal: "Avoid outside knowledge and overclaiming in passage inference."
misconception: "Using background assumptions as evidence."
```

```question
key: u03_l03_q06_passage_explanation
type: constructed-response
prompt: "Passage: 'A long line formed at the water fountain after gym. Several students were fanning themselves.' What conclusion is supported, and what clue supports it?"
minWords: 10
sampleAnswer: "The students were probably hot or thirsty because they lined up for water after gym."
checklist:
  - "State a supported conclusion"
  - "Name a clue from the passage"
explanation: "The water-fountain line after gym and fanning are clues about being hot or thirsty."
hint: "Use the frame: I think ___ because the passage says ___."
questionGoal: "Produce a supported conclusion with text evidence."
misconception: "Giving a conclusion without naming a passage clue."
```

### Lesson 4: Explain The Clue

```question
key: u03_l04_q01_best_explanation
type: multiple-choice
prompt: "Scenario: 'The class calendar says Field Day is Friday. Today the teacher put cones and jump ropes by the door.' Which explanation best supports the conclusion that the class may be getting ready for Field Day?"
choices:
  - "The cones and jump ropes are equipment often used for Field Day."
  - "Friday is the last school day of the week."
  - "The door is part of the classroom."
  - "Calendars can have many dates."
correctAnswer: "The cones and jump ropes are equipment often used for Field Day."
explanation: "That explanation connects the clue to the conclusion."
hint: "Choose the explanation that uses the equipment clue."
questionGoal: "Choose an explanation that links clue and conclusion."
misconception: "Choosing a true but weak explanation that does not connect the clue."
```

```question
key: u03_l04_q02_explanation_frame
type: multi-blank-cloze
prompt: "Complete the explanation: 'I know the class may have art soon because ___.'"
parts:
  - "I know the class may have art soon because "
  - " are on every table."
blanks:
  - correctAnswer: "paintbrushes"
    acceptedAnswers:
      - "paintbrushes"
      - "brushes"
      - "art supplies"
explanation: "Paintbrushes or art supplies on every table are clues for art."
hint: "Use a clue that would point to art class."
questionGoal: "Complete a clue-based explanation sentence."
misconception: "Filling the reason with a detail unrelated to the conclusion."
```

```question
key: u03_l04_q03_claim_clue_match
type: match-pairs
prompt: "Match each conclusion to the clue that supports it."
pairs:
  - left: "The cookies may be fresh."
    right: "They are still warm."
  - left: "The class may go outside."
    right: "Students are putting on jackets."
  - left: "The library may be closed."
    right: "A sign says 'Back at 1:00.'"
  - left: "The plant may need water."
    right: "Its soil is dry."
explanation: "Each clue gives a reason for the matching conclusion."
hint: "Ask which clue would make someone think the conclusion."
questionGoal: "Pair conclusions with supporting clues."
misconception: "Matching by general topic instead of evidence."
```

```question
key: u03_l04_q04_weak_explanation
type: multiple-choice
prompt: "Which explanation is weak for the conclusion 'The class may be having a spelling test today'?"
choices:
  - "because the teacher wrote spelling words on the board"
  - "because students have blank test paper on their desks"
  - "because the word 'quiz' is written on the schedule"
  - "because the classroom rug is blue"
correctAnswer: "because the classroom rug is blue"
explanation: "The rug color does not support the conclusion about a spelling test."
hint: "Find the explanation that does not use a clue about spelling or testing."
questionGoal: "Identify an explanation that does not support the conclusion."
misconception: "Accepting any because statement as an explanation."
```

```question
key: u03_l04_q05_explanation_order
type: order-items
prompt: "Put the explanation in a clear order."
items:
  - "because"
  - "the hallway lights are off"
  - "The hallway may be closed"
correctOrder:
  - "The hallway may be closed"
  - "because"
  - "the hallway lights are off"
explanation: "A clear explanation names the conclusion and then the clue."
hint: "Start with the conclusion, then add because and the clue."
questionGoal: "Construct a simple conclusion-because-clue explanation."
misconception: "Providing a clue without tying it to the conclusion."
```

```question
key: u03_l04_q06_write_clue_explanation
type: constructed-response
prompt: "Scenario: 'The science table has magnets, paper clips, and a recording sheet.' Explain a supported conclusion using a clue."
minWords: 10
sampleAnswer: "The class may study magnets because magnets and paper clips are on the science table."
checklist:
  - "State a supported conclusion"
  - "Use a clue from the scenario"
explanation: "A strong explanation connects the conclusion to a clue in the scenario."
hint: "Use the frame: The class may ___ because ___."
questionGoal: "Write a clue-based explanation for a supported conclusion."
misconception: "Making an unsupported guess without pointing to a clue."
```

## Unit 4: Rules, Causes, And Categories

### Lesson 1: If-Then Rules

```question
key: u04_l01_q01_condition_result
type: multiple-choice
prompt: "Rule: 'If the timer rings, then groups switch stations.' What is the condition?"
choices:
  - "the timer rings"
  - "groups switch stations"
  - "stations"
  - "groups"
correctAnswer: "the timer rings"
explanation: "The condition is the if-part: the timer rings."
hint: "Look at the part after if."
questionGoal: "Identify the condition in an if-then rule."
misconception: "Selecting the result instead of the condition."
```

```question
key: u04_l01_q02_rule_parts_match
type: match-pairs
prompt: "Match each rule part to its label."
pairs:
  - left: "if the bell rings"
    right: "condition"
  - left: "then line up"
    right: "result"
  - left: "if the soil is dry"
    right: "condition in a plant rule"
  - left: "then water the plant"
    right: "result in a plant rule"
explanation: "The if-part names the condition. The then-part names the result."
hint: "If tells when; then tells what follows."
questionGoal: "Distinguish condition and result across simple rules."
misconception: "Treating if and then clauses as unlabeled sentence parts."
```

```question
key: u04_l01_q03_result_choice
type: multiple-choice
prompt: "Rule: 'If a book has a red sticker, then it goes in the return bin.' What is the result?"
choices:
  - "it goes in the return bin"
  - "a book has a red sticker"
  - "red"
  - "a book"
correctAnswer: "it goes in the return bin"
explanation: "The result is what follows when the condition happens."
hint: "Look at the part after then."
questionGoal: "Identify the result in an if-then rule."
misconception: "Thinking the first important noun is the result."
```

```question
key: u04_l01_q04_if_then_vocabulary
type: fill-blank
prompt: "Complete the sentence: In an if-then rule, the if-part is the ___."
sentenceBefore: "In an if-then rule, the if-part is the"
sentenceAfter: "."
choices:
  - "condition"
  - "result"
  - "evidence"
  - "example"
correctAnswer: "condition"
explanation: "The condition tells what must happen for the result to follow."
hint: "The if-part tells when the rule starts."
questionGoal: "Recall condition vocabulary."
misconception: "Confusing condition with result."
```

```question
key: u04_l01_q05_rule_passage
type: passage-question
prompt: "Read the rule and answer."
passageTitle: "Game Rule"
passage: |
  If a player lands on a star space, then the player draws a card.
question: "Which part tells what happens after the condition?"
choices:
  - "the player draws a card"
  - "a player lands on a star space"
  - "If"
  - "a star space"
correctAnswer: "the player draws a card"
explanation: "Drawing a card is the result of landing on a star space."
hint: "Find the then-part."
questionGoal: "Identify the result in a game-rule context."
misconception: "Focusing on the condition because it appears first."
```

```question
key: u04_l01_q06_label_if_then_rule
type: constructed-response
prompt: "Rule: 'If a folder is finished, then put it in the basket.' Name the condition and the result."
minWords: 8
sampleAnswer: "Condition: a folder is finished. Result: put it in the basket."
checklist:
  - "Name the condition"
  - "Name the result"
explanation: "The condition is the if-part; the result is the then-part."
hint: "Use the frame: Condition: ___. Result: ___."
questionGoal: "Produce condition/result labels for a simple rule."
misconception: "Repeating the rule without separating its parts."
```

### Lesson 2: What Follows From A Rule?

```question
key: u04_l02_q01_rule_applies
type: multiple-choice
prompt: "Rule: 'If the card is blue, then place it in Box A.' The card is blue. What follows?"
choices:
  - "Place it in Box A."
  - "Place it in Box B."
  - "The card must be large."
  - "Nothing follows from the rule."
correctAnswer: "Place it in Box A."
explanation: "The condition is met, so the result follows."
hint: "Check whether the if-part happened."
questionGoal: "Apply an if-then rule when the condition is met."
misconception: "Missing that the result follows when the condition is true."
```

```question
key: u04_l02_q02_rule_not_enough_info
type: multiple-choice
prompt: "Rule: 'If a student brings a permission slip, then the student may ride the bus.' Jay may ride the bus. What can we know for sure?"
choices:
  - "Jay may ride the bus."
  - "Jay definitely brought a permission slip."
  - "Jay walked to school."
  - "No one else may ride the bus."
correctAnswer: "Jay may ride the bus."
explanation: "The result is given, but the rule alone does not prove the condition happened."
hint: "Do not reverse the rule."
questionGoal: "Avoid reversing an if-then rule."
misconception: "Assuming the result proves the condition."
```

```question
key: u04_l02_q03_follow_rule_passage
type: passage-question
prompt: "Read the rule and scenario."
passageTitle: "Library Rule"
passage: |
  Rule: If a book has a yellow tag, then it stays on the library cart.
  This book has a yellow tag.
question: "What follows from the rule?"
choices:
  - "This book stays on the library cart."
  - "This book is the only book on the cart."
  - "Every cart book has a yellow tag."
  - "This book is about animals."
correctAnswer: "This book stays on the library cart."
explanation: "The condition is met, so the result follows."
hint: "Use the yellow tag condition."
questionGoal: "Draw a supported conclusion from a stated rule."
misconception: "Adding extra category conclusions not stated by the rule."
```

```question
key: u04_l02_q04_what_follows_match
type: match-pairs
prompt: "Match each rule situation to what follows."
pairs:
  - left: "If the cup is cracked, recycle it. The cup is cracked."
    right: "Recycle the cup."
  - left: "If the light is green, walk. The light is red."
    right: "The rule does not say to walk."
  - left: "If a folder is signed, turn it in. The folder is signed."
    right: "Turn in the folder."
  - left: "If the tag says 'wet paint,' do not touch. The tag says 'wet paint.'"
    right: "Do not touch."
explanation: "When the condition is met, the result follows. When it is not met, that rule does not give the result."
hint: "Check each if-part before choosing the result."
questionGoal: "Apply simple rules across varied contexts."
misconception: "Applying the result even when the condition is not shown."
```

```question
key: u04_l02_q05_rule_explanation_choice
type: multiple-choice
prompt: "Rule: 'If the soil is dry, then water the plant.' The soil is dry. Which explanation is best?"
choices:
  - "The condition is met, so the plant should be watered."
  - "The result happened, so the soil must be dry."
  - "The rule is about all plants everywhere."
  - "The plant should never be watered."
correctAnswer: "The condition is met, so the plant should be watered."
explanation: "The dry soil satisfies the if-part, so the then-part follows."
hint: "A good explanation mentions condition and result."
questionGoal: "Explain why a rule result follows."
misconception: "Reversing the rule or making it broader than stated."
```

```question
key: u04_l02_q06_write_rule_conclusion
type: constructed-response
prompt: "Rule: 'If the answer is not clear, then ask a follow-up question.' The answer is not clear. What follows, and why?"
minWords: 8
sampleAnswer: "Ask a follow-up question because the condition is met."
checklist:
  - "State what follows"
  - "Mention that the condition is met"
explanation: "The rule says to ask a follow-up question when the answer is not clear."
hint: "Use the frame: ___ follows because ___."
questionGoal: "Apply and explain an if-then rule in words."
misconception: "Giving a response without connecting it to the rule."
```

### Lesson 3: Cause Or Just Happened First?

```question
key: u04_l03_q01_cause_or_sequence
type: multiple-choice
prompt: "Which sentence shows a clear cause and effect?"
choices:
  - "The ice melted because it was left in the sun."
  - "I wore red socks, and then the bell rang."
  - "The pencil rolled, and then the clock ticked."
  - "I opened my book, and then a bird sang outside."
correctAnswer: "The ice melted because it was left in the sun."
explanation: "Sun warming ice can cause it to melt. The other choices only put events in order."
hint: "Look for one event that makes the other happen."
questionGoal: "Distinguish cause/effect from mere sequence."
misconception: "Assuming earlier events cause later events."
```

```question
key: u04_l03_q02_happened_first_not_cause
type: passage-question
prompt: "Read the scenario and answer."
passageTitle: "Socks And Rain"
passage: |
  Mina wore striped socks to school.
  Later that morning, it started to rain.
question: "What is the most careful conclusion?"
choices:
  - "Mina wore striped socks before it rained."
  - "Mina's socks caused the rain."
  - "Striped socks always bring rain."
  - "It rained because Mina came to school."
correctAnswer: "Mina wore striped socks before it rained."
explanation: "The scenario shows sequence, not cause."
hint: "Happening before is not the same as causing."
questionGoal: "Avoid a false cause conclusion from sequence."
misconception: "Treating any prior event as a cause."
```

```question
key: u04_l03_q03_cause_sequence_match
type: match-pairs
prompt: "Match each scenario to the best label."
pairs:
  - left: "The paper got wet because water spilled on it."
    right: "cause and effect"
  - left: "The music stopped, and then the lights blinked."
    right: "sequence only"
  - left: "The balloon popped because it touched a sharp pin."
    right: "clear cause"
  - left: "A dog barked, and then the bus arrived."
    right: "before and after"
explanation: "Some scenarios show a cause; others only show one thing happening before another."
hint: "Ask whether the first event made the second happen."
questionGoal: "Classify examples of cause/effect and sequence."
misconception: "Overusing cause labels for any event order."
```

```question
key: u04_l03_q04_cause_vocabulary
type: fill-blank
prompt: "Complete the sentence: A cause is something that helps make an ___ happen."
sentenceBefore: "A cause is something that helps make an"
sentenceAfter: "happen."
choices:
  - "effect"
  - "opinion"
  - "unrelated detail"
  - "example"
correctAnswer: "effect"
explanation: "A cause helps make an effect happen."
hint: "Cause and effect go together."
questionGoal: "Recall basic cause/effect vocabulary."
misconception: "Using cause as a general word for any earlier event."
```

```question
key: u04_l03_q05_best_causal_claim
type: multiple-choice
prompt: "Observation: 'The plant was not watered for two weeks. Its leaves turned brown and dry.' Which claim is most supported?"
choices:
  - "Not watering may have caused the leaves to dry."
  - "The pot color caused the leaves to dry."
  - "All plants die in two weeks."
  - "The plant was pretending."
correctAnswer: "Not watering may have caused the leaves to dry."
explanation: "The lack of water connects to dry leaves and supports a cautious cause claim."
hint: "Choose the cause connected to the effect."
questionGoal: "Choose a supported cause claim from relevant evidence."
misconception: "Choosing an unrelated detail or overbroad conclusion."
```

```question
key: u04_l03_q06_explain_sequence_not_cause
type: constructed-response
prompt: "Scenario: 'Noah sharpened a pencil. A minute later, the fire drill started.' Explain why this does not prove the pencil caused the fire drill."
minWords: 9
sampleAnswer: "The pencil happened first, but there is no clue that it made the drill start."
checklist:
  - "Mention that one event happened first"
  - "Say there is no cause clue"
explanation: "Sequence alone does not prove cause."
hint: "Use: It happened before, but ___."
questionGoal: "Explain why sequence is not enough for cause."
misconception: "Confusing before/after with cause/effect."
```

### Lesson 4: Evidence For Cause Claims

```question
key: u04_l04_q01_best_cause_evidence
type: multiple-choice
prompt: "Claim: 'The fan made the papers blow off the desk.' Which evidence supports the claim best?"
choices:
  - "The papers blew off right after the fan was turned toward them."
  - "The desk is brown."
  - "The papers had writing on them."
  - "The fan has three buttons."
correctAnswer: "The papers blew off right after the fan was turned toward them."
explanation: "That evidence connects the fan to the papers moving."
hint: "Choose the evidence that links cause and effect."
questionGoal: "Select evidence that supports a cause claim."
misconception: "Choosing a detail about the objects rather than a cause link."
```

```question
key: u04_l04_q02_observation_support
type: passage-question
prompt: "Read the observations and answer."
passageTitle: "Two Plants"
passage: |
  Plant A was watered every day and stayed green.
  Plant B was not watered for many days and became dry.
question: "Which cause claim is best supported?"
choices:
  - "Lack of water may have caused Plant B to dry out."
  - "Plant B dried out because its pot was round."
  - "All plants need the same amount of water every day."
  - "Plant A caused Plant B to dry out."
correctAnswer: "Lack of water may have caused Plant B to dry out."
explanation: "The difference in watering connects to the difference in plant health."
hint: "Look for the difference that matches the effect."
questionGoal: "Use paired observations to support a simple cause claim."
misconception: "Choosing an unrelated feature or an all claim."
```

```question
key: u04_l04_q03_cause_evidence_match
type: match-pairs
prompt: "Match each cause claim to evidence that would support it."
pairs:
  - left: "The open window made the room cold."
    right: "Cold air was blowing in from the window."
  - left: "The magnet pulled the paper clip."
    right: "The paper clip moved when the magnet came close."
  - left: "The loud noise startled the cat."
    right: "The cat jumped right after the noise."
  - left: "The missing label confused students."
    right: "Students put supplies in the wrong bins."
explanation: "Each evidence sentence connects the possible cause to the effect."
hint: "Match by the connection, not just by repeated words."
questionGoal: "Connect cause claims with relevant evidence."
misconception: "Accepting evidence that mentions the topic but not the cause-effect link."
```

```question
key: u04_l04_q04_weak_cause_evidence
type: multiple-choice
prompt: "Claim: 'The new seating chart helped students work quietly.' Which evidence is weakest?"
choices:
  - "The seating chart is printed on white paper."
  - "The room was quieter after students moved seats."
  - "Students who talked often were seated apart."
  - "The teacher reminded students of the new chart."
correctAnswer: "The seating chart is printed on white paper."
explanation: "Paper color does not show that the seating chart caused quieter work."
hint: "Find the detail that does not connect to quiet work."
questionGoal: "Identify weak evidence for a cause claim."
misconception: "Treating any detail about the cause as causal evidence."
```

```question
key: u04_l04_q05_need_more_evidence
type: fill-blank
prompt: "Complete the sentence: A strong cause claim needs evidence that connects the cause to the ___."
sentenceBefore: "A strong cause claim needs evidence that connects the cause to the"
sentenceAfter: "."
choices:
  - "effect"
  - "speaker"
  - "color"
  - "question mark"
correctAnswer: "effect"
explanation: "Cause evidence should show how the cause is connected to the effect."
hint: "Cause and effect are the two linked parts."
questionGoal: "Recall what cause evidence must connect."
misconception: "Thinking any extra fact strengthens a cause claim."
```

```question
key: u04_l04_q06_next_evidence_needed
type: constructed-response
prompt: "Claim: 'The new lunch line signs made the line move faster.' What evidence would help test or support this claim?"
minWords: 9
sampleAnswer: "We could compare how long the line took before and after the signs."
checklist:
  - "Name evidence about the signs and line speed"
  - "Do not give an unrelated detail"
explanation: "Useful evidence would connect the signs to a change in line speed."
hint: "Think about what you could observe or compare."
questionGoal: "Propose relevant evidence for a cause claim."
misconception: "Suggesting evidence about the signs that does not test the effect."
```

### Lesson 5: All, Some, And None

```question
key: u04_l05_q01_all_some_none_meaning
type: match-pairs
prompt: "Match each word to its meaning."
pairs:
  - left: "all"
    right: "every one"
  - left: "some"
    right: "at least one"
  - left: "none"
    right: "zero"
  - left: "always"
    right: "every time"
explanation: "These words make claims broader or narrower."
hint: "Think about how many cases each word includes."
questionGoal: "Recall meanings of key quantifier words."
misconception: "Reading some as all or none as not many."
```

```question
key: u04_l05_q02_quantifier_from_set
type: multiple-choice
prompt: "A box has 5 crayons: 3 red and 2 blue. Which statement is true?"
choices:
  - "Some crayons are red."
  - "All crayons are red."
  - "No crayons are blue."
  - "None of the crayons have color."
correctAnswer: "Some crayons are red."
explanation: "There are red crayons, but not every crayon is red."
hint: "Some means at least one, not necessarily all."
questionGoal: "Interpret some in a concrete set."
misconception: "Assuming some must mean only one or almost all."
```

```question
key: u04_l05_q03_none_statement
type: multiple-choice
prompt: "A tray has only apples and oranges. Which statement is true?"
choices:
  - "None of the fruits are bananas."
  - "All of the fruits are bananas."
  - "Some fruits are bananas."
  - "No fruits are apples."
correctAnswer: "None of the fruits are bananas."
explanation: "The tray has apples and oranges only, so it has zero bananas."
hint: "None means zero."
questionGoal: "Use none accurately in a category statement."
misconception: "Confusing none with not many."
```

```question
key: u04_l05_q04_complete_quantifier
type: fill-blank
prompt: "A shelf has 8 books. All 8 books are mysteries. Complete the true statement: ___ books on the shelf are mysteries."
sentenceBefore: ""
sentenceAfter: "books on the shelf are mysteries."
choices:
  - "All"
  - "Some but not all"
  - "No"
  - "None"
correctAnswer: "All"
explanation: "All 8 books are mysteries, so every book on the shelf is a mystery."
hint: "All means every one in the group."
questionGoal: "Choose all when every item fits."
misconception: "Avoiding all even when the evidence covers every case."
```

```question
key: u04_l05_q05_some_not_all
type: passage-question
prompt: "Read the group description."
passageTitle: "Clubs"
passage: |
  In a group of six students, four are in chess club and two are in art club.
question: "Which statement is true?"
choices:
  - "Some students are in chess club."
  - "All students are in chess club."
  - "No students are in art club."
  - "None of the students are in a club."
correctAnswer: "Some students are in chess club."
explanation: "Four students in chess club means some are in chess club, but not all six."
hint: "Check whether the statement includes every student or only at least one."
questionGoal: "Interpret some and all in a small group."
misconception: "Overreading some as all."
```

```question
key: u04_l05_q06_explain_quantifier
type: constructed-response
prompt: "A basket has 2 green apples and 3 red apples. Explain why 'All apples in the basket are green' is false."
minWords: 8
sampleAnswer: "It is false because three apples are red, so not all are green."
checklist:
  - "Mention the red apples"
  - "Use all correctly"
explanation: "All means every apple. Red apples in the basket make the all-green claim false."
hint: "One apple that is not green is enough to make an all claim false."
questionGoal: "Explain why an all statement is false using counterevidence."
misconception: "Thinking all can still be true when most or some items fit."
```

### Lesson 6: Sort The Category Carefully

```question
key: u04_l06_q01_category_sort
type: match-pairs
prompt: "Match each item to the category it belongs in."
pairs:
  - left: "triangle"
    right: "shape"
  - left: "violin"
    right: "instrument"
  - left: "oak"
    right: "tree"
  - left: "soccer"
    right: "sport"
explanation: "Each item belongs in a category based on what it is."
hint: "Ask what group each item is part of."
questionGoal: "Sort familiar items into categories."
misconception: "Sorting by a surface word or personal association instead of category membership."
```

```question
key: u04_l06_q02_category_rule
type: multiple-choice
prompt: "Category rule: 'Things that people use to measure length.' Which item belongs?"
choices:
  - "ruler"
  - "paintbrush"
  - "sandwich"
  - "drum"
correctAnswer: "ruler"
explanation: "A ruler is used to measure length."
hint: "Use the category rule, not what object you like."
questionGoal: "Use a category rule to decide membership."
misconception: "Ignoring the rule and sorting by familiarity."
```

```question
key: u04_l06_q03_careful_category_claim
type: passage-question
prompt: "Read the category evidence."
passageTitle: "Class Pets"
passage: |
  The class listed pets they had at home.
  The list included dogs, cats, fish, and one turtle.
question: "Which claim is careful?"
choices:
  - "Some class pets are fish."
  - "All class pets are fish."
  - "No one has a turtle."
  - "Every pet on the list is a dog."
correctAnswer: "Some class pets are fish."
explanation: "The list includes fish, but it also includes other pets."
hint: "Use a claim that matches the whole list."
questionGoal: "Make a careful category statement from examples."
misconception: "Overclaiming all from one category example."
```

```question
key: u04_l06_q04_does_not_belong
type: multiple-choice
prompt: "Category: 'Things that can be read.' Which item does NOT belong?"
choices:
  - "a sandwich"
  - "a book"
  - "a sign"
  - "a letter"
correctAnswer: "a sandwich"
explanation: "Books, signs, and letters can be read. A sandwich does not fit the category."
hint: "Use the category rule: can be read."
questionGoal: "Identify a non-example for a category."
misconception: "Including an item because it is familiar rather than because it fits the rule."
```

```question
key: u04_l06_q05_category_overclaim
type: multiple-choice
prompt: "A student sees three birds in the park. Two are robins and one is a blue jay. Which claim goes too far?"
choices:
  - "All birds in the park are robins."
  - "Some birds in the park are robins."
  - "At least one bird is a blue jay."
  - "The student saw three birds."
correctAnswer: "All birds in the park are robins."
explanation: "The student saw a blue jay too, and only saw three birds. The all claim goes too far."
hint: "Watch for all when the evidence does not cover all birds."
questionGoal: "Spot an overbroad category claim."
misconception: "Making all claims from a small observed group."
```

```question
key: u04_l06_q06_explain_category_rule
type: constructed-response
prompt: "Category rule: 'Objects that help people tell time.' Explain why a clock belongs but a pillow does not."
minWords: 10
sampleAnswer: "A clock belongs because it tells time, but a pillow does not help tell time."
checklist:
  - "Use the category rule"
  - "Explain both the example and non-example"
explanation: "Category sorting depends on the rule for belonging."
hint: "Use: ___ belongs because ___. ___ does not because ___."
questionGoal: "Explain category membership using the rule."
misconception: "Sorting by personal association instead of the stated category rule."
```

## Unit 5: Weak Reasoning And Careful Fixes

### Lesson 1: Unrelated Reasons

```question
key: u05_l01_q01_unrelated_reason
type: multiple-choice
prompt: "Claim: 'The class should replace the broken stapler.' Which reason is unrelated?"
choices:
  - "The stapler is gray."
  - "It jams every time someone uses it."
  - "It cannot attach more than one page."
  - "Students waste time trying to fix it."
correctAnswer: "The stapler is gray."
explanation: "The stapler's color does not support replacing it."
hint: "Find the reason that does not show a problem with the stapler."
questionGoal: "Identify an unrelated reason."
misconception: "Treating any detail about the object as support."
```

```question
key: u05_l01_q02_replace_unrelated
type: error-correction
prompt: "Replace the unrelated reason with a relevant one."
sentence: "The class should take water bottles to field day because my backpack has a zipper."
acceptedAnswers:
  - "The class should take water bottles to field day because students will be active outside."
  - "The class should take water bottles to field day because people may get thirsty outside."
  - "The class should take water bottles to field day because field day activities can make students thirsty."
explanation: "A relevant reason explains why water bottles are useful at field day."
hint: "Keep the claim and choose a reason about field day and water."
questionGoal: "Fix an unrelated reason by replacing it with relevant support."
misconception: "Keeping a personal or object detail that does not support the claim."
```

```question
key: u05_l01_q03_reason_fit_match
type: match-pairs
prompt: "Match each claim to the reason that fits."
pairs:
  - left: "The hall sign should be larger."
    right: "Visitors have trouble reading it from far away."
  - left: "The class needs a new glue bottle."
    right: "The old bottle is empty."
  - left: "The computer should be charged."
    right: "Its battery is almost out."
  - left: "The door should stay closed."
    right: "Cold air is coming in."
explanation: "Each reason directly supports the matching claim."
hint: "Ask which reason answers why the claim should happen."
questionGoal: "Choose relevant reasons instead of unrelated ones."
misconception: "Matching by a repeated school topic rather than support."
```

```question
key: u05_l01_q04_unrelated_reason_passage
type: passage-question
prompt: "Read the argument."
passageTitle: "New Markers"
passage: |
  We should buy new markers because the marker box is purple.
question: "What is the reasoning problem?"
choices:
  - "The reason is unrelated to needing new markers."
  - "The claim has no words."
  - "The reason proves the markers are dry."
  - "The argument uses too much evidence."
correctAnswer: "The reason is unrelated to needing new markers."
explanation: "The box color does not show that new markers are needed."
hint: "Ask whether purple box color supports buying new markers."
questionGoal: "Diagnose an unrelated reason in a short argument."
misconception: "Mistaking a neat or true detail for support."
```

```question
key: u05_l01_q05_unrelated_definition
type: fill-blank
prompt: "Complete the sentence: An unrelated reason does not ___ the claim."
sentenceBefore: "An unrelated reason does not"
sentenceAfter: "the claim."
choices:
  - "support"
  - "spell"
  - "repeat"
  - "punctuate"
correctAnswer: "support"
explanation: "Unrelated reasons fail because they do not support the claim."
hint: "A good reason should help the claim."
questionGoal: "Recall the meaning of unrelated reason."
misconception: "Thinking unrelated means false rather than not supportive."
```

```question
key: u05_l01_q06_explain_unrelated_reason
type: constructed-response
prompt: "Claim: 'The class should move the recycling bin closer to the door.' Reason: 'The bin is made of plastic.' Explain why the reason is unrelated."
minWords: 9
sampleAnswer: "The bin being plastic does not explain why it should be near the door."
checklist:
  - "Mention the claim"
  - "Explain why the reason does not support it"
explanation: "The material of the bin does not show that the door is a better location."
hint: "Ask what the reason proves about the bin's location."
questionGoal: "Explain the support problem in an unrelated reason."
misconception: "Rejecting a reason without naming the missing connection."
```

### Lesson 2: Too Little Evidence

```question
key: u05_l02_q01_too_little_evidence
type: multiple-choice
prompt: "Evidence: 'One student liked the new schedule.' Which claim has too little evidence?"
choices:
  - "Everyone likes the new schedule."
  - "At least one student liked the new schedule."
  - "Somebody liked the new schedule."
  - "One student had a positive opinion."
correctAnswer: "Everyone likes the new schedule."
explanation: "One student is too little evidence to prove everyone likes the schedule."
hint: "Watch for everyone, all, always, or never."
questionGoal: "Identify an overbroad claim from small evidence."
misconception: "Using one example to prove everyone."
```

```question
key: u05_l02_q02_careful_revision
type: multiple-choice
prompt: "Claim: 'All class jobs are easy.' Evidence: 'Line leader was easy today.' Which revision is careful?"
choices:
  - "The line leader job was easy today."
  - "Every class job is always easy."
  - "No class job is hard."
  - "All students love class jobs."
correctAnswer: "The line leader job was easy today."
explanation: "The evidence is only about one job on one day."
hint: "Make the claim fit the exact evidence."
questionGoal: "Revise a broad claim to match limited evidence."
misconception: "Keeping all/always language after one example."
```

```question
key: u05_l02_q03_evidence_claim_match
type: match-pairs
prompt: "Match each limited evidence statement to a careful claim."
pairs:
  - left: "Two students chose the science book."
    right: "Some students chose the science book."
  - left: "One table finished early."
    right: "At least one table finished early."
  - left: "Three pencils in this cup are dull."
    right: "Some pencils in this cup are dull."
  - left: "No folders in this stack are signed."
    right: "This stack has no signed folders."
explanation: "Careful claims do not grow beyond the evidence."
hint: "Use some, at least one, or this group when the evidence is limited."
questionGoal: "Pair small evidence with appropriately cautious claims."
misconception: "Making evidence broader than the observed group."
```

```question
key: u05_l02_q04_too_broad_passage
type: passage-question
prompt: "Read the evidence and claim."
passageTitle: "Pencil Survey"
passage: |
  Five students tried a new pencil grip.
  Four said it helped them write neatly.
  Claim: The grip helps every student write neatly.
question: "What is weak about the claim?"
choices:
  - "Five students are too little evidence for every student."
  - "The claim is about pencils, not writing."
  - "The evidence says no one liked it."
  - "The claim has no conclusion."
correctAnswer: "Five students are too little evidence for every student."
explanation: "The evidence supports a claim about some students, not every student."
hint: "Compare the size of the evidence to the word every."
questionGoal: "Diagnose too little evidence for a broad claim."
misconception: "Treating a small survey as proof about everyone."
```

```question
key: u05_l02_q05_broad_words_warning
type: fill-blank
prompt: "Complete the warning: Words like all, always, never, and everyone need ___ evidence."
sentenceBefore: "Words like all, always, never, and everyone need"
sentenceAfter: "evidence."
choices:
  - "strong"
  - "no"
  - "unrelated"
  - "secret"
correctAnswer: "strong"
explanation: "Broad words make broad claims, so they need strong evidence."
hint: "Big claims need more support."
questionGoal: "Recall why broad quantifier words require caution."
misconception: "Using broad words as harmless emphasis."
```

```question
key: u05_l02_q06_write_narrow_claim
type: constructed-response
prompt: "Evidence: 'Two students said the math game was fun.' Write a careful claim that does not overreach."
minWords: 6
sampleAnswer: "Some students thought the math game was fun."
checklist:
  - "Use a careful word such as some or two"
  - "Do not claim everyone liked it"
explanation: "Two students support a claim about some students, not everyone."
hint: "Start with 'Some students...'"
questionGoal: "Produce a careful claim from limited evidence."
misconception: "Writing an all/everyone claim from two examples."
```

### Lesson 3: Circular Reasons

```question
key: u05_l03_q01_circular_reason
type: multiple-choice
prompt: "Which argument has a circular reason?"
choices:
  - "This rule is fair because it is the fairest rule."
  - "This rule is fair because everyone gets a turn."
  - "This rule is fair because it uses the same time limit for each group."
  - "This rule is fair because names are drawn randomly."
correctAnswer: "This rule is fair because it is the fairest rule."
explanation: "The reason repeats the claim instead of adding new support."
hint: "Look for the reason that goes in a loop."
questionGoal: "Recognize a circular reason."
misconception: "Thinking repeated wording counts as support."
```

```question
key: u05_l03_q02_non_circular_reason
type: multiple-choice
prompt: "Claim: 'The directions are clear.' Which reason is NOT circular?"
choices:
  - "They list each step in order."
  - "They are clear because they are clear."
  - "They make sense because they make sense."
  - "They are good directions because they are good."
correctAnswer: "They list each step in order."
explanation: "Listing steps in order gives new support for the claim."
hint: "Choose the reason that adds information."
questionGoal: "Choose a non-circular reason."
misconception: "Accepting restated claims as reasons."
```

```question
key: u05_l03_q03_claim_to_new_reason
type: match-pairs
prompt: "Match each claim to a reason that adds new support."
pairs:
  - left: "The game is easy to learn."
    right: "The rules fit on one page."
  - left: "The shelf is organized."
    right: "Books are sorted by topic."
  - left: "The path is safer."
    right: "It has a crossing guard."
  - left: "The poster is readable."
    right: "The letters are large and dark."
explanation: "Each reason gives new information instead of repeating the claim."
hint: "A good reason answers why with a new detail."
questionGoal: "Pair claims with non-circular support."
misconception: "Using synonyms of the claim as support."
```

```question
key: u05_l03_q04_circular_passage
type: passage-question
prompt: "Read the argument."
passageTitle: "Best Plan"
passage: |
  Our cleanup plan is the best plan because no other plan is better.
question: "What is the reasoning problem?"
choices:
  - "The reason repeats the claim instead of proving it."
  - "The reason gives too much evidence."
  - "The claim is a question."
  - "The argument has a strong example."
correctAnswer: "The reason repeats the claim instead of proving it."
explanation: "Saying no other plan is better does not explain why this plan is best."
hint: "Ask whether the reason adds new support."
questionGoal: "Diagnose circular reasoning in a short argument."
misconception: "Confusing a confident restatement with evidence."
```

```question
key: u05_l03_q05_circular_definition
type: fill-blank
prompt: "Complete the sentence: A circular reason mostly ___ the claim."
sentenceBefore: "A circular reason mostly"
sentenceAfter: "the claim."
choices:
  - "repeats"
  - "measures"
  - "questions"
  - "sorts"
correctAnswer: "repeats"
explanation: "A circular reason repeats the claim instead of supporting it with a new idea."
hint: "Think of a circle going back to the same place."
questionGoal: "Recall circular-reason vocabulary."
misconception: "Thinking circular means the argument is about round objects."
```

```question
key: u05_l03_q06_fix_circular_reason
type: constructed-response
prompt: "Fix this circular argument with a real reason: 'The instructions are helpful because they help.'"
minWords: 8
sampleAnswer: "The instructions are helpful because they show each step with a picture."
checklist:
  - "Keep the claim about helpful instructions"
  - "Add a new reason"
explanation: "A real reason adds new support, such as steps, examples, or pictures."
hint: "What do the instructions do that makes them helpful?"
questionGoal: "Replace a circular reason with new support."
misconception: "Rewording the same idea instead of adding support."
```

### Lesson 4: Either-Or Traps

```question
key: u05_l04_q01_either_or_trap
type: multiple-choice
prompt: "Which statement may be an either-or trap?"
choices:
  - "We must play soccer at recess or do nothing active."
  - "The door is either open or closed."
  - "A number is either even or odd."
  - "The light is either on or off."
correctAnswer: "We must play soccer at recess or do nothing active."
explanation: "There may be other active choices besides soccer or nothing."
hint: "Look for a choice that leaves out other possible options."
questionGoal: "Identify an unfair either-or choice."
misconception: "Assuming two named choices are always the only choices."
```

```question
key: u05_l04_q02_real_two_choice
type: multiple-choice
prompt: "Which choice is probably a real two-choice situation?"
choices:
  - "The class light switch is on or off."
  - "We must read mystery books or stop reading."
  - "We must eat carrots or no vegetables."
  - "The class can play tag or never exercise."
correctAnswer: "The class light switch is on or off."
explanation: "A simple light switch usually has two states, on or off."
hint: "Some situations really have only two options."
questionGoal: "Distinguish real two-choice cases from traps."
misconception: "Treating every either-or statement as weak reasoning."
```

```question
key: u05_l04_q03_more_options_match
type: match-pairs
prompt: "Match each either-or trap to another possible option."
pairs:
  - left: "We must play soccer or sit still."
    right: "Play jump rope."
  - left: "We must use markers or make no poster."
    right: "Use colored pencils."
  - left: "We must read aloud or not read."
    right: "Read silently."
  - left: "We must work alone or not work."
    right: "Work with a partner."
explanation: "Each trap leaves out a reasonable third option."
hint: "Think of an option between or outside the two choices."
questionGoal: "Generate alternatives to false either-or choices."
misconception: "Believing unnamed choices do not exist."
```

```question
key: u05_l04_q04_either_or_passage
type: passage-question
prompt: "Read the argument."
passageTitle: "Fundraiser"
passage: |
  We can sell candy or we can have no fundraiser at all.
question: "What is the reasoning problem?"
choices:
  - "It may leave out other fundraiser options."
  - "It gives strong evidence for candy."
  - "It proves no one likes fundraisers."
  - "It is a supported conclusion from data."
correctAnswer: "It may leave out other fundraiser options."
explanation: "There may be other ways to raise money besides selling candy."
hint: "Ask whether the two options are really the only options."
questionGoal: "Diagnose an either-or trap in context."
misconception: "Accepting a limited choice without checking for other options."
```

```question
key: u05_l04_q05_either_or_fix
type: error-correction
prompt: "Fix the either-or trap by making it more careful."
sentence: "We must choose the blue cover for the report, or the report will look terrible."
acceptedAnswers:
  - "The blue cover is one option, but we could compare other covers too."
  - "The blue cover might look good, but other covers could also work."
  - "We should compare the blue cover with other choices before deciding."
explanation: "A careful fix allows more than two possibilities."
hint: "Keep the idea of choosing a cover, but do not pretend only one choice can work."
questionGoal: "Revise an either-or trap into a fairer statement."
misconception: "Replacing one extreme choice with another."
```

```question
key: u05_l04_q06_name_another_option
type: constructed-response
prompt: "Argument: 'We either have a loud game at indoor recess or no fun at all.' Name another possible option and explain why it matters."
minWords: 9
sampleAnswer: "Students could play a quiet board game, so loud or no fun are not the only choices."
checklist:
  - "Name another option"
  - "Explain that the original two choices were not the only choices"
explanation: "Another option shows why the either-or reasoning is too narrow."
hint: "Think of a fun indoor activity that is not loud."
questionGoal: "Produce an alternative to an either-or trap."
misconception: "Accepting the two choices as complete."
```

### Lesson 5: Personal Attacks Are Not Reasons

```question
key: u05_l05_q01_personal_attack
type: multiple-choice
prompt: "Which response is a personal attack instead of a reason about the claim?"
choices:
  - "Your idea is wrong because you are bad at planning."
  - "Your idea may not work because it costs more than our budget."
  - "Your idea needs a schedule so we know who goes first."
  - "Your idea would take too long before lunch."
correctAnswer: "Your idea is wrong because you are bad at planning."
explanation: "That response attacks the person instead of giving evidence about the idea."
hint: "Look for the response aimed at the person, not the claim."
questionGoal: "Recognize a personal attack."
misconception: "Thinking a mean comment counts as evidence."
```

```question
key: u05_l05_q02_fair_response_dialogue
type: dialogue-builder
prompt: "Choose the fairest response."
turns:
  - speaker: "Ari"
    line: "I think we should keep the class plants near the window."
choices:
  - "That might help because the plants need light."
  - "You only say that because you are weird."
  - "Your shoes are ugly."
  - "No one should listen to you."
correctAnswer: "That might help because the plants need light."
explanation: "The fair response gives a reason about the claim."
hint: "Choose the line that discusses the idea, not the person."
questionGoal: "Select a fair claim-focused response in dialogue."
misconception: "Responding to the speaker instead of the reasoning."
```

```question
key: u05_l05_q03_attack_or_reason_match
type: match-pairs
prompt: "Match each response to the best label."
pairs:
  - left: "That plan may be unsafe because the floor is wet."
    right: "reason about the claim"
  - left: "That plan is bad because you are silly."
    right: "personal attack"
  - left: "The claim needs evidence from the survey."
    right: "fair critique"
  - left: "Nobody should listen to Max."
    right: "attack on speaker"
explanation: "Fair reasoning addresses the claim or evidence, not the person's worth."
hint: "Ask whether the response talks about the idea or the person."
questionGoal: "Distinguish personal attacks from fair critique."
misconception: "Treating criticism of a person as criticism of an idea."
```

```question
key: u05_l05_q04_personal_attack_passage
type: passage-question
prompt: "Read the response."
passageTitle: "Class Suggestion"
passage: |
  Lee said, "We should put labels on the shelves."
  Sam said, "That is wrong because Lee always forgets things."
question: "What is weak about Sam's response?"
choices:
  - "It attacks Lee instead of addressing shelf labels."
  - "It gives strong evidence about labels."
  - "It proves shelves never need labels."
  - "It is a careful claim."
correctAnswer: "It attacks Lee instead of addressing shelf labels."
explanation: "Lee's forgetfulness does not show whether shelf labels are useful."
hint: "Ask whether the response is about the claim or the person."
questionGoal: "Diagnose a personal attack in context."
misconception: "Believing a speaker's flaw disproves the claim."
```

```question
key: u05_l05_q05_fix_personal_attack
type: error-correction
prompt: "Replace the personal attack with a fair reason."
sentence: "We should not try Nina's idea because Nina is annoying."
acceptedAnswers:
  - "We should not try Nina's idea because it would take more time than we have."
  - "We should not try Nina's idea because it does not fit the assignment rules."
  - "We should not try Nina's idea because we do not have the supplies for it."
explanation: "A fair reason explains a problem with the idea, not the person."
hint: "Keep the disagreement, but make the reason about the idea."
questionGoal: "Revise a personal attack into a claim-focused reason."
misconception: "Thinking disagreement requires attacking the speaker."
```

```question
key: u05_l05_q06_explain_attack_problem
type: constructed-response
prompt: "Explain why 'Your answer is wrong because nobody likes you' is not a good reason."
minWords: 9
sampleAnswer: "It attacks the person and gives no evidence about the answer."
checklist:
  - "Mention that it attacks the person"
  - "Mention that it does not address the answer"
explanation: "A good reason should show what is wrong with the answer, not insult the person."
hint: "Use the words person and answer in your explanation."
questionGoal: "Explain why personal attacks fail as reasons."
misconception: "Confusing hurtful disagreement with logical support."
```

### Lesson 6: Fix The Weak Reasoning

```question
key: u05_l06_q01_mixed_pattern
type: multiple-choice
prompt: "Argument: 'This worksheet is useful because it is useful.' What is the weak reasoning pattern?"
choices:
  - "circular reason"
  - "personal attack"
  - "either-or trap"
  - "strong evidence"
correctAnswer: "circular reason"
explanation: "The reason repeats the claim instead of adding support."
hint: "The reason goes back to the same idea."
questionGoal: "Identify a weak pattern in mixed review."
misconception: "Mistaking repeated wording for support."
```

```question
key: u05_l06_q02_problem_to_fix_match
type: match-pairs
prompt: "Match each weak pattern to a good fix."
pairs:
  - left: "unrelated reason"
    right: "Choose support that fits the claim."
  - left: "too little evidence"
    right: "Make the claim narrower."
  - left: "circular reason"
    right: "Add a new reason."
  - left: "personal attack"
    right: "Respond to the idea, not the person."
explanation: "The fix should match the reasoning problem."
hint: "First name what went wrong; then repair that exact problem."
questionGoal: "Connect weak reasoning patterns to fixes."
misconception: "Using one generic fix for every weak argument."
```

```question
key: u05_l06_q03_best_fix_choice
type: multiple-choice
prompt: "Weak argument: 'All library books are boring because one book was boring.' Which fix is best?"
choices:
  - "Some library books may be boring to some readers."
  - "All books everywhere are boring."
  - "Books are boring because they are boring."
  - "Anyone who likes books is wrong."
correctAnswer: "Some library books may be boring to some readers."
explanation: "The fix narrows the claim to match limited evidence and avoids attacks."
hint: "One example supports a careful claim, not an all claim."
questionGoal: "Choose a careful fix for overbroad reasoning."
misconception: "Replacing one weak pattern with another."
```

```question
key: u05_l06_q04_mixed_weak_passage
type: passage-question
prompt: "Read the argument."
passageTitle: "Art Club"
passage: |
  We should cancel art club because the sign-up sheet is yellow.
question: "Which fix best improves the reasoning?"
choices:
  - "We should cancel art club only if there are not enough students signed up."
  - "We should cancel art club because yellow is a color."
  - "We should cancel art club because art club should be canceled."
  - "We should cancel art club because the students are silly."
correctAnswer: "We should cancel art club only if there are not enough students signed up."
explanation: "The fix uses relevant evidence about participation instead of an unrelated sign color."
hint: "Choose a fix that gives support about whether club should happen."
questionGoal: "Select a relevant revision for an unrelated reason."
misconception: "Choosing a new weak reason that still does not support the claim."
```

```question
key: u05_l06_q05_fix_order
type: order-items
prompt: "Put the steps for fixing weak reasoning in order."
items:
  - "Name what is weak"
  - "Read the claim and support"
  - "Choose a fix that matches the problem"
  - "Check that the new support fits the claim"
correctOrder:
  - "Read the claim and support"
  - "Name what is weak"
  - "Choose a fix that matches the problem"
  - "Check that the new support fits the claim"
explanation: "A good fix starts by understanding the argument and the specific problem."
hint: "You cannot fix the argument before reading it."
questionGoal: "Sequence a repair routine for weak reasoning."
misconception: "Jumping to a revision before diagnosing the problem."
```

```question
key: u05_l06_q06_write_better_argument
type: constructed-response
prompt: "Fix this weak argument: 'We should use my poster because my poster is the best.'"
minWords: 10
sampleAnswer: "We should use my poster because the letters are large and the information is clear."
checklist:
  - "Keep or revise the claim"
  - "Add a reason that gives new support"
explanation: "A better argument gives a real reason, such as readable letters or clear information."
hint: "Avoid saying best again. Explain what makes the poster useful."
questionGoal: "Produce a revised argument that fixes circular support."
misconception: "Repeating the claim with stronger-sounding words."
```

## Unit 6: Careful Thinking Across Subjects

### Lesson 1: Logic In Reading

```question
key: u06_l01_q01_reading_evidence
type: passage-question
prompt: "Read the passage and answer."
passageTitle: "Mia's Choice"
passage: |
  Mia wanted a book she could finish before Friday.
  She chose a short mystery with large print and only six chapters.
question: "Which claim is best supported by the passage?"
choices:
  - "Mia chose a book that may be quick to read."
  - "Mia hates long books."
  - "Mia has read every mystery book."
  - "Mia will finish before Friday for sure."
correctAnswer: "Mia chose a book that may be quick to read."
explanation: "A short book with large print and six chapters supports the careful claim that it may be quick to read."
hint: "Use only the passage clues."
questionGoal: "Draw a supported reading conclusion from text evidence."
misconception: "Turning text clues into an unsupported certainty."
```

```question
key: u06_l01_q02_best_text_evidence
type: multiple-choice
prompt: "Claim: 'The character is careful with borrowed things.' Which evidence best supports the claim?"
choices:
  - "She put the borrowed compass back in its case after using it."
  - "She walked past a tall tree."
  - "The story has three pages."
  - "Her backpack was green."
correctAnswer: "She put the borrowed compass back in its case after using it."
explanation: "Returning the compass to its case shows care with a borrowed object."
hint: "Choose evidence about how the character treats borrowed things."
questionGoal: "Choose relevant text evidence for a character claim."
misconception: "Choosing an interesting story detail instead of evidence."
```

```question
key: u06_l01_q03_claim_evidence_match
type: match-pairs
prompt: "Match each reading claim to the evidence that supports it."
pairs:
  - left: "The trail was hard to follow."
    right: "The markers were faded and far apart."
  - left: "The narrator felt surprised."
    right: "She gasped when the door opened."
  - left: "The recipe was simple."
    right: "It had only three steps."
  - left: "The team worked together."
    right: "Each person carried one part of the project."
explanation: "Each evidence sentence supports its matching claim."
hint: "Match by what the evidence shows about the claim."
questionGoal: "Connect text claims with relevant evidence."
misconception: "Matching by repeated words instead of meaning."
```

```question
key: u06_l01_q04_not_text_evidence
type: passage-question
prompt: "Read the passage."
passageTitle: "The New Student"
passage: |
  A new student stood by the classroom door.
  Jada smiled and moved her backpack so there was an empty chair.
question: "Which answer is NOT supported by the passage?"
choices:
  - "Jada made space for the new student."
  - "Jada smiled."
  - "The new student stood by the door."
  - "Jada and the new student were already best friends."
correctAnswer: "Jada and the new student were already best friends."
explanation: "The passage shows a kind action, but it does not say they were already best friends."
hint: "Find the answer that adds a relationship not stated."
questionGoal: "Reject unsupported reading conclusions."
misconception: "Adding a larger story from a kind action."
```

```question
key: u06_l01_q05_reading_explanation_frame
type: multi-blank-cloze
prompt: "Complete the evidence explanation."
parts:
  - "The claim is supported because the passage says "
  - "."
blanks:
  - correctAnswer: "Jada moved her backpack"
    acceptedAnswers:
      - "Jada moved her backpack"
      - "Jada made space"
      - "Jada moved her backpack so there was an empty chair"
explanation: "A good explanation names a passage clue."
hint: "Use a phrase from the passage as evidence."
questionGoal: "Complete a text-evidence explanation."
misconception: "Explaining from opinion instead of passage evidence."
```

```question
key: u06_l01_q06_write_text_evidence_explanation
type: constructed-response
prompt: "Passage: 'The sky grew dark. Thunder rumbled. The team packed up the picnic quickly.' What conclusion is supported, and what evidence supports it?"
minWords: 12
sampleAnswer: "A storm may be coming because the sky grew dark and thunder rumbled."
checklist:
  - "State a careful conclusion"
  - "Use evidence from the passage"
explanation: "Dark sky and thunder are clues that a storm may be coming."
hint: "Use the frame: ___ may be true because the passage says ___."
questionGoal: "Explain a reading conclusion with relevant text evidence."
misconception: "Stating a conclusion without evidence or making it too certain."
```

### Lesson 2: Logic In Science

```question
key: u06_l02_q01_science_careful_conclusion
type: passage-question
prompt: "Read the observations."
passageTitle: "Shadow Test"
passage: |
  At 9:00, the class measured a long shadow.
  At noon, they measured a shorter shadow.
question: "Which conclusion is most careful?"
choices:
  - "The shadow length changed between 9:00 and noon."
  - "Shadows are always short at noon everywhere."
  - "The ruler caused the shadow to shrink."
  - "The class measured every shadow in the school."
correctAnswer: "The shadow length changed between 9:00 and noon."
explanation: "The observations support a change in shadow length for this test."
hint: "Stay close to the observations."
questionGoal: "Draw a careful science conclusion from observations."
misconception: "Making universal or causal claims from limited data."
```

```question
key: u06_l02_q02_science_cause_evidence
type: multiple-choice
prompt: "Claim: 'More sunlight helped the bean plant grow taller.' Which evidence would best support the claim?"
choices:
  - "A plant in sunlight grew taller than a similar plant kept in shade."
  - "The sunny plant's pot was red."
  - "The bean seed was small."
  - "The ruler was plastic."
correctAnswer: "A plant in sunlight grew taller than a similar plant kept in shade."
explanation: "That evidence compares sunlight and growth, which fits the cause claim."
hint: "Choose evidence connecting sunlight to growth."
questionGoal: "Select relevant evidence for a science cause claim."
misconception: "Choosing a science detail that does not test the cause."
```

```question
key: u06_l02_q03_observation_claim_match
type: match-pairs
prompt: "Match each observation to the careful conclusion."
pairs:
  - left: "The ice cube in the sun melted faster than the ice cube in shade."
    right: "Sunlight may have helped the ice melt faster."
  - left: "The magnet moved the paper clip but not the wooden block."
    right: "The magnet affected the paper clip differently from the wood."
  - left: "The dry sponge absorbed more water than the wet sponge."
    right: "Starting condition may affect how much water a sponge absorbs."
  - left: "The covered cup stayed warmer than the uncovered cup."
    right: "The cover may have helped hold in heat."
explanation: "Each conclusion is careful and tied to the observation."
hint: "Match the conclusion that uses the observed difference."
questionGoal: "Connect science observations with careful conclusions."
misconception: "Making stronger claims than the observation supports."
```

```question
key: u06_l02_q04_sequence_not_science_cause
type: multiple-choice
prompt: "Observation: 'A student watered the plant. Later, the class bell rang.' What conclusion is most careful?"
choices:
  - "The watering happened before the bell rang."
  - "Watering the plant caused the bell to ring."
  - "Plants control bells."
  - "The bell rings whenever plants get water."
correctAnswer: "The watering happened before the bell rang."
explanation: "The observation gives sequence, not a cause connection."
hint: "Happened before does not mean caused."
questionGoal: "Avoid false cause in a science-like observation."
misconception: "Treating sequence as cause."
```

```question
key: u06_l02_q05_science_need_more
type: fill-blank
prompt: "Complete the sentence: A science claim is stronger when observations are relevant and ___."
sentenceBefore: "A science claim is stronger when observations are relevant and"
sentenceAfter: "."
choices:
  - "careful"
  - "unrelated"
  - "secret"
  - "always funny"
correctAnswer: "careful"
explanation: "Science reasoning should use relevant observations and careful conclusions."
hint: "Think of not claiming more than the evidence shows."
questionGoal: "Recall the careful stance for science reasoning."
misconception: "Thinking science-sounding claims do not need careful support."
```

```question
key: u06_l02_q06_next_science_evidence
type: constructed-response
prompt: "Claim: 'The paper towel brand A absorbs more water than brand B.' What evidence would help support this claim?"
minWords: 10
sampleAnswer: "Measure how much water the same size piece of each brand absorbs."
checklist:
  - "Compare brand A and brand B"
  - "Use evidence about water absorbed"
explanation: "Useful evidence would compare absorption for both brands."
hint: "Think about what you could measure."
questionGoal: "Propose relevant evidence for a simple science claim."
misconception: "Suggesting unrelated product details instead of evidence tied to the claim."
```

### Lesson 3: Logic In Fair Decisions

```question
key: u06_l03_q01_fair_relevant_reason
type: multiple-choice
prompt: "Class decision: where to keep shared headphones. Which reason is fair and relevant?"
choices:
  - "Keep them near the tablets because students use them with tablets."
  - "Keep them on my desk because I like being first."
  - "Keep them by the window because windows are nice."
  - "Keep them away from Sam because Sam is annoying."
correctAnswer: "Keep them near the tablets because students use them with tablets."
explanation: "That reason fits the decision and considers how the headphones are used."
hint: "Choose a reason about the shared need, not a person or random detail."
questionGoal: "Choose fair, relevant support for a classroom decision."
misconception: "Using personal preference or personal attack as decision support."
```

```question
key: u06_l03_q02_fair_response_dialogue
type: dialogue-builder
prompt: "Choose the best response in a fair discussion."
turns:
  - speaker: "Rae"
    line: "I think the class should vote on which review game to play."
choices:
  - "That could be fair because everyone gets a voice."
  - "No, because your handwriting is messy."
  - "Only my favorite game should count."
  - "If you like voting, you are wrong."
correctAnswer: "That could be fair because everyone gets a voice."
explanation: "The response gives a relevant reason about fairness."
hint: "Pick the response that addresses the idea respectfully."
questionGoal: "Select a fair discussion response."
misconception: "Confusing personal attack or preference with reasoning."
```

```question
key: u06_l03_q03_decision_reason_match
type: match-pairs
prompt: "Match each decision question to a relevant reason."
pairs:
  - left: "Where should wet umbrellas go?"
    right: "Near the door so water stays off the floor."
  - left: "How should groups choose turns?"
    right: "Use a rotating order so each group gets a chance."
  - left: "When should tablets be charged?"
    right: "After use so they are ready for the next class."
  - left: "Which poster should be displayed?"
    right: "The one with readable letters and correct information."
explanation: "Each reason fits the decision and gives fair support."
hint: "Match the reason to the problem the decision is solving."
questionGoal: "Connect fair decisions with relevant reasons."
misconception: "Choosing reasons based on personal preference alone."
```

```question
key: u06_l03_q04_unfair_reason
type: passage-question
prompt: "Read the class discussion."
passageTitle: "Choosing A Helper"
passage: |
  The class needs one helper to pass out papers.
  Jay says, "I should choose because I am the oldest."
question: "What is weak about Jay's reason?"
choices:
  - "Being oldest may not be relevant to choosing fairly."
  - "It gives evidence that Jay passes papers well."
  - "It proves no one else can help."
  - "It is a supported conclusion from data."
correctAnswer: "Being oldest may not be relevant to choosing fairly."
explanation: "A fair reason should connect to the helper job or selection process."
hint: "Ask whether age answers the decision question."
questionGoal: "Evaluate relevance and fairness in a decision reason."
misconception: "Treating status or personal advantage as fair support."
```

```question
key: u06_l03_q05_fix_unfair_reason
type: error-correction
prompt: "Replace the unfair reason with a fair one."
sentence: "We should play my game because I am the best."
acceptedAnswers:
  - "We should play this game because it lets the whole class join."
  - "We should play this game because it uses the materials we already have."
  - "We should play this game because it fits the time we have."
explanation: "A fair reason should support the game choice, not praise the speaker."
hint: "Make the reason about the game and the class."
questionGoal: "Revise an unfair personal reason into a relevant decision reason."
misconception: "Treating personal status as evidence."
```

```question
key: u06_l03_q06_explain_fair_reason
type: constructed-response
prompt: "Decision: 'Which table should use the sink first after painting?' Write a fair reason for a choice or process."
minWords: 10
sampleAnswer: "The table with wet brushes could go first because their supplies may drip."
checklist:
  - "Give a reason connected to the decision"
  - "Avoid personal attacks or 'because I want to'"
explanation: "A fair reason should fit the decision and respect the people involved."
hint: "Think about need, safety, time, or taking turns."
questionGoal: "Produce a fair and relevant reason for a classroom decision."
misconception: "Using preference instead of relevant fairness criteria."
```

### Lesson 4: Choose, Check, Explain

```question
key: u06_l04_q01_choose_reasoning_check
type: multiple-choice
prompt: "Prompt: 'The class saw one butterfly and claimed all insects on the playground are butterflies.' Which reasoning check fits best?"
choices:
  - "Check whether the evidence is too little for the broad claim."
  - "Check whether a command has punctuation."
  - "Check whether the speaker used a personal attack."
  - "Check whether a rule has a then-part only."
correctAnswer: "Check whether the evidence is too little for the broad claim."
explanation: "One butterfly is too little evidence for a claim about all insects."
hint: "Watch the word all."
questionGoal: "Choose the appropriate reasoning tool for overgeneralization."
misconception: "Using an unrelated logic tool because it is familiar."
```

```question
key: u06_l04_q02_problem_tool_match
type: match-pairs
prompt: "Match each problem to the reasoning check that fits."
pairs:
  - left: "A reason talks about shoe color instead of the claim."
    right: "relevance check"
  - left: "A conclusion adds a fact not in the passage."
    right: "supported conclusion check"
  - left: "A rule says if wet paint, then do not touch."
    right: "if-then rule check"
  - left: "A response insults the speaker."
    right: "personal attack check"
explanation: "Different reasoning problems call for different checks."
hint: "Name what kind of thinking the problem uses."
questionGoal: "Select the correct Logic 1 routine for mixed problems."
misconception: "Treating every problem as only a claim-and-reason task."
```

```question
key: u06_l04_q03_mixed_passage_check
type: passage-question
prompt: "Read the argument."
passageTitle: "Lunch Claim"
passage: |
  The new lunch line is faster because the trays are blue.
question: "Which check should you use first?"
choices:
  - "Does the reason support the claim?"
  - "Is this a real two-choice situation?"
  - "Does all mean every one?"
  - "What is the result of an if-then rule?"
correctAnswer: "Does the reason support the claim?"
explanation: "The argument has a claim and a reason, so first check relevance."
hint: "Ask whether blue trays prove the line is faster."
questionGoal: "Choose relevance as the first check for a weak claim/reason pair."
misconception: "Missing the claim-support structure in a mixed prompt."
```

```question
key: u06_l04_q04_final_careful_conclusion
type: multiple-choice
prompt: "Evidence: 'A class tested two paper airplanes. Plane A flew farther than Plane B in one test.' Which conclusion is most careful?"
choices:
  - "Plane A flew farther than Plane B in this test."
  - "Plane A will always fly farther."
  - "Plane B can never fly."
  - "All paper airplanes are the same."
correctAnswer: "Plane A flew farther than Plane B in this test."
explanation: "One test supports a conclusion about that test, not always."
hint: "Keep the conclusion close to the evidence."
questionGoal: "Apply careful evidence-to-conclusion reasoning in a mixed context."
misconception: "Making always/never claims from one trial."
```

```question
key: u06_l04_q05_final_explanation_frame
type: multi-blank-cloze
prompt: "Complete the careful explanation."
parts:
  - "The reason is weak because it is "
  - " to the claim."
blanks:
  - correctAnswer: "unrelated"
    acceptedAnswers:
      - "unrelated"
      - "not related"
      - "not relevant"
explanation: "A reason is weak when it does not support the claim."
hint: "Use the logic word for support that does not fit."
questionGoal: "Use Logic 1 vocabulary in an explanation frame."
misconception: "Describing weak reasoning vaguely without naming the problem."
```

```question
key: u06_l04_q06_final_choose_check_explain
type: constructed-response
prompt: "Argument: 'We should cancel the nature walk because one student saw a cloud.' Choose the best reasoning check and explain a careful fix."
minWords: 14
sampleAnswer: "I would check whether there is enough evidence. One cloud is too little; we should check the weather forecast."
checklist:
  - "Name a reasoning check"
  - "Explain why the support is weak"
  - "Suggest a careful fix or next evidence"
explanation: "The argument may use too little evidence for canceling a walk. A careful fix asks for better weather evidence."
hint: "Ask whether one cloud is enough evidence for the big decision."
questionGoal: "Synthesize Logic 1 routines in a final mixed explanation."
misconception: "Accepting a big decision from a small clue without checking evidence."
```
