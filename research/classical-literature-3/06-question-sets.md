# Level 3 Classical Literature Question Sets

Sources: accepted Level 3 Classical Literature blueprint, course map, unit design briefs, and lesson briefs in `research/classical-literature-3/`.

## Unit 1: Reading Like A Literary Analyst

### Lesson 1: Objective Summary Before Interpretation

Students separate neutral summary from interpretation before making claims.

```question
key: u01_l01_q01_best_objective_summary
type: passage-question
prompt: "Read the passage and choose the best objective summary."
passageTitle: "The Shield At Dawn"
passage: |
  At dawn, Mira lifted the bronze shield from the temple steps. The older guards warned her that the road beyond the gate was watched by raiders. Mira did not answer them. She carried the shield to the western wall, where her younger brother waited with the last of the city's messengers.
question: "Which sentence is the best objective summary?"
choices:
  - "Mira takes a shield to the western wall after being warned about danger."
  - "Mira is foolish because she ignores wise older guards."
  - "The bronze shield on the temple steps is the most important object in the city."
  - "Mira's brother probably wants to become a messenger."
correctAnswer: "Mira takes a shield to the western wall after being warned about danger."
explanation: "The correct answer states the main action neutrally without adding a judgment or guess."
hint: "Choose the sentence that tells what happens, not what it means."
questionGoal: "Identify an objective summary of a short passage."
misconception: "Confusing summary with interpretation or unsupported inference."
```

```question
key: u01_l01_q02_sort_response_types
type: match-pairs
prompt: "Match each response to the kind of response it is."
pairs:
  - left: "Mira carries a shield to the western wall."
    right: "Objective summary"
  - left: "The passage suggests courage can require silence."
    right: "Interpretation"
  - left: "The shield is bronze."
    right: "Minor detail"
  - left: "Mira must hate the older guards."
    right: "Unsupported inference"
explanation: "A summary reports the main action. An interpretation explains meaning. A minor detail may be true but too small, and an unsupported inference goes beyond the passage."
hint: "Ask whether the sentence tells the main event, explains meaning, names a small detail, or guesses beyond the text."
questionGoal: "Distinguish summary, interpretation, detail, and unsupported inference."
misconception: "Treating any true or interesting sentence as a summary."
```

```question
key: u01_l01_q03_sequence_events
type: order-items
prompt: "Put the events from the passage in order."
items:
  - "Mira carries the shield to the western wall."
  - "The older guards warn Mira about raiders."
  - "Mira lifts the shield from the temple steps."
  - "Mira's brother waits with the messengers."
correctOrder:
  - "Mira lifts the shield from the temple steps."
  - "The older guards warn Mira about raiders."
  - "Mira carries the shield to the western wall."
  - "Mira's brother waits with the messengers."
explanation: "An objective summary depends on the passage's actual order of events."
hint: "Look for time and place clues: dawn, warning, western wall."
questionGoal: "Track major events before interpretation."
misconception: "Building a summary from remembered fragments rather than passage order."
```

```question
key: u01_l01_q04_not_objective
type: multiple-choice
prompt: "Why is this sentence not an objective summary? 'Mira proves she is the only brave person in the city.'"
choices:
  - "It adds an interpretation that the passage does not directly state."
  - "It is too short to be a sentence."
  - "It names the wrong setting."
  - "It includes no character name."
correctAnswer: "It adds an interpretation that the passage does not directly state."
explanation: "The passage shows Mira acting, but it does not directly prove she is the only brave person."
hint: "An objective summary avoids judgments such as 'only brave person.'"
questionGoal: "Recognize interpretive language inside a supposed summary."
misconception: "Thinking a strong-sounding judgment counts as summary."
```

```question
key: u01_l01_q05_complete_summary
type: multi-blank-cloze
prompt: "Complete the neutral summary."
parts:
  - "Mira takes the "
  - " from the temple steps and brings it to the "
  - " after the guards warn her about danger."
blanks:
  - correctAnswer: "shield"
    acceptedAnswers:
      - "shield"
    choices:
      - "shield"
      - "crown"
      - "letter"
  - correctAnswer: "western wall"
    acceptedAnswers:
      - "western wall"
    choices:
      - "western wall"
      - "market"
      - "harbor"
explanation: "The summary includes the main object and destination from the passage."
hint: "Look for the repeated object and where Mira goes."
questionGoal: "Complete a summary with major passage details."
misconception: "Substituting invented or less important details into a summary."
```

```question
key: u01_l01_q06_best_detail_for_summary
type: passage-question
prompt: "Read the passage again and choose the detail that belongs in a short summary."
passageTitle: "The Shield At Dawn"
passage: |
  At dawn, Mira lifted the bronze shield from the temple steps. The older guards warned her that the road beyond the gate was watched by raiders. Mira did not answer them. She carried the shield to the western wall, where her younger brother waited with the last of the city's messengers.
question: "Which detail is most important for a short objective summary?"
choices:
  - "Mira carries the shield to the western wall."
  - "The shield is bronze."
  - "The guards are older."
  - "The road is beyond the gate."
correctAnswer: "Mira carries the shield to the western wall."
explanation: "A summary should include major actions, not every descriptive detail."
hint: "Choose the detail that changes what happens."
questionGoal: "Select major events over supporting details."
misconception: "Overloading summaries with small descriptive facts."
```

### Lesson 2: From Plot To Theme

```question
key: u01_l02_q01_plot_topic_theme
type: match-pairs
prompt: "Match each statement to its role."
pairs:
  - left: "Damon ignores the old sailor's warning."
    right: "Plot event"
  - left: "Pride"
    right: "Topic"
  - left: "Pride can make a person reject help."
    right: "Theme statement"
  - left: "The old sailor speaks before the voyage."
    right: "Supporting detail"
explanation: "A theme statement is a full idea about the topic, not just the event or a single word."
hint: "A theme can usually travel to another story."
questionGoal: "Distinguish plot, topic, theme, and detail."
misconception: "Calling a topic word or plot event a theme."
```

```question
key: u01_l02_q02_best_theme
type: passage-question
prompt: "Read the passage and choose the best theme statement."
passageTitle: "The Sailor's Warning"
passage: |
  Damon laughed when the old sailor pointed to the dark line of clouds. "I have crossed rougher water than this," Damon said. He ordered the crew to raise the sail. Before sunset, the wind tore the sail in two, and Damon had to ask the old sailor how to guide the ship home.
question: "Which theme statement best fits the passage?"
choices:
  - "Pride can make people ignore wise advice until consequences teach them."
  - "Ships are difficult to steer in stormy weather."
  - "Old sailors are always smarter than young captains."
  - "Damon crossed rougher water in the past."
correctAnswer: "Pride can make people ignore wise advice until consequences teach them."
explanation: "The passage shows Damon's pride, his rejected warning, and the consequence that makes him need help."
hint: "Look for the idea that connects Damon's choice and what happens afterward."
questionGoal: "Choose a theme that grows from plot and motive."
misconception: "Choosing a fact, overgeneralization, or topic instead of a supported theme."
```

```question
key: u01_l02_q03_topic_to_theme
type: fill-blank
prompt: "Complete the theme frame."
sentenceBefore: "A stronger theme than just 'pride' is:"
sentenceAfter: ""
choices:
  - "Pride can lead people to ignore good advice."
  - "Pride."
  - "Damon sails a ship."
  - "The old sailor is old."
correctAnswer: "Pride can lead people to ignore good advice."
explanation: "A theme statement says a full idea about a topic."
hint: "Choose the answer that makes a claim about pride."
questionGoal: "Convert a topic into a theme statement."
misconception: "Believing one abstract noun is enough for a theme."
```

```question
key: u01_l02_q04_evidence_for_theme
type: passage-question
prompt: "Read the passage and choose the evidence that best supports the theme."
passageTitle: "The Sailor's Warning"
passage: |
  Damon laughed when the old sailor pointed to the dark line of clouds. "I have crossed rougher water than this," Damon said. He ordered the crew to raise the sail. Before sunset, the wind tore the sail in two, and Damon had to ask the old sailor how to guide the ship home.
question: "Which detail best supports the theme that pride can make people ignore wise advice?"
choices:
  - "Damon laughed when the old sailor pointed to the clouds."
  - "The line of clouds was dark."
  - "The wind tore the sail in two."
  - "The ship had a sail."
correctAnswer: "Damon laughed when the old sailor pointed to the clouds."
explanation: "That detail shows Damon dismissing advice before the consequence arrives."
hint: "Look for the moment when Damon responds to the warning."
questionGoal: "Select evidence that supports a theme claim."
misconception: "Choosing a dramatic detail that does not show the claimed motive."
```

```question
key: u01_l02_q05_not_supported_theme
type: multiple-choice
prompt: "Which theme is not supported by the Damon passage?"
choices:
  - "Friendship is more valuable than victory."
  - "Pride can lead people to ignore warnings."
  - "Experience can matter in danger."
  - "Consequences can teach humility."
correctAnswer: "Friendship is more valuable than victory."
explanation: "The passage does not focus on friendship or victory. It focuses on pride, warning, consequence, and help."
hint: "Ask which answer brings in ideas that are not in the passage."
questionGoal: "Reject an unsupported theme claim."
misconception: "Selecting a nice-sounding theme even when the passage does not support it."
```

```question
key: u01_l02_q06_theme_sequence
type: order-items
prompt: "Put the thinking steps for finding a theme in order."
items:
  - "State a full idea that fits the passage."
  - "Notice the main conflict or choice."
  - "Check whether evidence supports the idea."
  - "Name the topic involved."
correctOrder:
  - "Notice the main conflict or choice."
  - "Name the topic involved."
  - "State a full idea that fits the passage."
  - "Check whether evidence supports the idea."
explanation: "Theme work starts with the passage, moves from topic to idea, and then checks evidence."
hint: "Begin with what the passage shows before writing the larger idea."
questionGoal: "Sequence a theme-finding routine."
misconception: "Choosing a theme first and forcing the passage to fit it."
```

### Lesson 3: Claim, Evidence, Explanation

```question
key: u01_l03_q01_match_claim_evidence
type: match-pairs
prompt: "Match each claim to the best evidence."
pairs:
  - left: "Elian values mercy over revenge."
    right: "He gives water to the rival who had mocked him."
  - left: "The rival is ashamed."
    right: "She lowers her eyes and returns his empty cup."
  - left: "The march is dangerous."
    right: "The road is hot, dry, and watched by soldiers."
  - left: "The group must hurry."
    right: "The guide says the gate will close by dusk."
explanation: "Relevant evidence directly supports the claim it is paired with."
hint: "Match the evidence to the exact idea in the claim."
questionGoal: "Pair claims with relevant evidence."
misconception: "Choosing evidence because it is nearby or dramatic instead of relevant."
```

```question
key: u01_l03_q02_best_explanation
type: passage-question
prompt: "Read the passage and choose the best explanation for the evidence."
passageTitle: "The Empty Cup"
passage: |
  Elian had only one cup of water left when he saw Nera stumble in the dust. That morning, Nera had mocked him for walking slowly. Elian paused, then held out the cup. Nera drank, lowered her eyes, and returned it empty.
question: "Claim: Elian values mercy over revenge. Evidence: Elian gives Nera his last water. Which explanation best connects the evidence to the claim?"
choices:
  - "Because Nera mocked him, Elian could have refused to help, but he chooses mercy instead."
  - "Water is important when a road is dusty."
  - "Nera returns the cup after she drinks."
  - "Elian probably wants Nera to praise him later."
correctAnswer: "Because Nera mocked him, Elian could have refused to help, but he chooses mercy instead."
explanation: "The explanation shows how the evidence proves the claim about mercy."
hint: "A good explanation uses the conflict between mockery and help."
questionGoal: "Choose an explanation that connects evidence to a claim."
misconception: "Restating a detail without explaining its support."
```

```question
key: u01_l03_q03_complete_cee_frame
type: multi-blank-cloze
prompt: "Complete the claim-evidence-explanation frame."
parts:
  - "Claim: Elian shows "
  - ". Evidence: He gives Nera "
  - ". Explanation: This matters because Nera had "
  - " him earlier."
blanks:
  - correctAnswer: "mercy"
    acceptedAnswers:
      - "mercy"
    choices:
      - "mercy"
      - "greed"
      - "confusion"
  - correctAnswer: "his last water"
    acceptedAnswers:
      - "his last water"
      - "the last water"
    choices:
      - "his last water"
      - "a bronze shield"
      - "a map"
  - correctAnswer: "mocked"
    acceptedAnswers:
      - "mocked"
    choices:
      - "mocked"
      - "praised"
      - "rescued"
explanation: "The completed frame connects a claim, a detail, and the reason the detail matters."
hint: "Use the detail that creates a contrast between insult and help."
questionGoal: "Build a constrained claim-evidence-explanation response."
misconception: "Leaving one part of the response disconnected from the others."
```

```question
key: u01_l03_q04_evidence_not_enough
type: multiple-choice
prompt: "What is missing from this response? 'Elian is merciful. The passage says, \"Elian paused, then held out the cup.\"'"
choices:
  - "An explanation of how the evidence supports the claim"
  - "A longer quote from the passage"
  - "A second character name"
  - "A new plot event"
correctAnswer: "An explanation of how the evidence supports the claim"
explanation: "The quote is relevant, but the response still needs to explain why offering the cup shows mercy."
hint: "A claim and quote are not the whole response."
questionGoal: "Identify the missing explanation in a literary response."
misconception: "Thinking evidence proves the claim without explanation."
```

```question
key: u01_l03_q05_fix_weak_response
type: error-correction
prompt: "Revise the weak response so the final sentence explains how the evidence supports mercy."
sentence: "Elian is merciful. He gives Nera his last water. This shows that water is wet."
acceptedAnswers:
  - "Elian is merciful. He gives Nera his last water. This shows mercy because he helps someone who had mocked him."
  - "Elian is merciful. He gives Nera his last water. This shows mercy because he helps Nera even though she mocked him."
explanation: "The corrected explanation connects the evidence to mercy instead of stating an irrelevant fact."
hint: "Keep the claim and evidence, but make the explanation tell why the action shows mercy."
questionGoal: "Repair a finite weak claim-evidence-explanation response."
misconception: "Adding an explanation that is true but irrelevant to the claim."
```

```question
key: u01_l03_q06_best_claim_for_evidence
type: multiple-choice
prompt: "Evidence: 'Nera drank, lowered her eyes, and returned it empty.' Which claim does this evidence best support?"
choices:
  - "Nera feels ashamed after accepting Elian's help."
  - "Elian wants to travel alone."
  - "The guide is angry about the closing gate."
  - "The road is near the sea."
correctAnswer: "Nera feels ashamed after accepting Elian's help."
explanation: "Lowering her eyes after drinking suggests shame or humility."
hint: "Focus on Nera's action after she drinks."
questionGoal: "Choose a claim that fits a specific evidence detail."
misconception: "Forcing evidence to support an unrelated claim."
```

### Lesson 4: Context As A Reading Tool

```question
key: u01_l04_q01_useful_context
type: passage-question
prompt: "Read the passage and context note, then choose the best answer."
passageTitle: "The Stranger At The Door"
passage: |
  A stranger arrived after sunset and stood outside the hall. Though the family had little bread, Lysa opened the door and set the first piece before him. Her uncle frowned, but Lysa said, "No house is strong if it turns away the helpless."
question: "Context note: In many ancient stories, hospitality to strangers is treated as a serious duty. How does the note help the reader?"
choices:
  - "It explains why Lysa's choice matters even though the family has little food."
  - "It proves the stranger is secretly a god."
  - "It shows that the uncle is not part of the family."
  - "It means the bread is more important than Lysa."
correctAnswer: "It explains why Lysa's choice matters even though the family has little food."
explanation: "The context note clarifies the cultural importance of welcoming a stranger, but the passage still supplies the evidence."
hint: "Use the context to explain the duty, not to invent a new plot."
questionGoal: "Apply a context note without overreaching."
misconception: "Using context to add unsupported story claims."
```

```question
key: u01_l04_q02_context_or_text
type: match-pairs
prompt: "Match each detail to whether it comes from the passage or the context note."
pairs:
  - left: "Hospitality to strangers can be a serious duty."
    right: "Context note"
  - left: "Lysa gives the stranger the first piece of bread."
    right: "Passage evidence"
  - left: "The family has little bread."
    right: "Passage detail"
  - left: "Ancient stories may treat guests with special importance."
    right: "Background idea"
explanation: "Good interpretation keeps track of what comes from the passage and what comes from context."
hint: "Ask whether the words appear in the story or in the background note."
questionGoal: "Distinguish context from textual evidence."
misconception: "Blending background and passage details without source awareness."
```

```question
key: u01_l04_q03_helpful_not_distracting
type: multiple-choice
prompt: "Which context note would best help with the Lysa passage?"
choices:
  - "In some ancient stories, turning away a guest can reveal a failure of duty."
  - "Ancient halls were sometimes built with wooden beams."
  - "Bread can be made from several kinds of grain."
  - "Some stories include long sea voyages."
correctAnswer: "In some ancient stories, turning away a guest can reveal a failure of duty."
explanation: "This note helps interpret Lysa's choice and her uncle's frown."
hint: "Choose the note that connects to the passage's central choice."
questionGoal: "Choose a context note that clarifies interpretation."
misconception: "Treating any historical fact as useful context."
```

```question
key: u01_l04_q04_reading_process_context
type: order-items
prompt: "Put the context-reading process in a useful order."
items:
  - "Use the context note to clarify a detail."
  - "Read the passage for what happens."
  - "Make a claim supported by the passage."
  - "Check that the claim does not go beyond the evidence."
correctOrder:
  - "Read the passage for what happens."
  - "Use the context note to clarify a detail."
  - "Make a claim supported by the passage."
  - "Check that the claim does not go beyond the evidence."
explanation: "Context helps after you understand the passage; it does not replace reading the passage."
hint: "Start with the passage itself."
questionGoal: "Sequence careful use of context."
misconception: "Starting with background and forcing the passage to fit it."
```

```question
key: u01_l04_q05_context_overreach
type: multiple-choice
prompt: "Which interpretation overreaches beyond the passage and context note?"
choices:
  - "The stranger must be a disguised god testing the family."
  - "Lysa treats hospitality as a serious duty."
  - "The family has little food but still faces a choice."
  - "The uncle may be worried about sharing bread."
correctAnswer: "The stranger must be a disguised god testing the family."
explanation: "The passage and note make hospitality important, but they do not prove the stranger is a god."
hint: "Watch for the answer that invents a hidden fact."
questionGoal: "Reject context-based overreach."
misconception: "Assuming a familiar classical pattern must be present without evidence."
```

```question
key: u01_l04_q06_context_plus_evidence
type: multi-blank-cloze
prompt: "Complete the supported interpretation."
parts:
  - "The context note helps show that Lysa's welcome is an act of "
  - ". The passage supports this because she gives the stranger bread even though the family has "
  - "."
blanks:
  - correctAnswer: "duty"
    acceptedAnswers:
      - "duty"
      - "hospitality"
    choices:
      - "duty"
      - "revenge"
      - "confusion"
  - correctAnswer: "little bread"
    acceptedAnswers:
      - "little bread"
      - "little food"
    choices:
      - "little bread"
      - "many soldiers"
      - "no house"
explanation: "The interpretation combines context with a passage detail."
hint: "Use one idea from the note and one detail from the passage."
questionGoal: "Combine context and textual evidence in a constrained interpretation."
misconception: "Using only context or only text when both are needed."
```

## Unit 2: Heroes, Journeys, And Epic Signals

### Lesson 1: Journey Episodes And Trials

```question
key: u02_l01_q01_journey_sequence
type: order-items
prompt: "Put the journey episode in order."
items:
  - "A shepherd shows Iro a hidden spring."
  - "Iro leaves the harbor to seek the lost banner."
  - "Iro refuses to sleep beside the safe road."
  - "Iro returns with the banner but loses his sandals in the marsh."
correctOrder:
  - "Iro leaves the harbor to seek the lost banner."
  - "Iro refuses to sleep beside the safe road."
  - "A shepherd shows Iro a hidden spring."
  - "Iro returns with the banner but loses his sandals in the marsh."
explanation: "The sequence moves from departure to trial, help, and return with a cost."
hint: "Look for departure first and return last."
questionGoal: "Sequence a heroic journey episode."
misconception: "Treating journey details as interchangeable adventure moments."
```

```question
key: u02_l01_q02_trial_not_travel
type: passage-question
prompt: "Read the passage and identify the trial."
passageTitle: "The Marsh Road"
passage: |
  Iro could reach the lost banner by the safe road after sunrise, but the enemy would see him there. He chose the marsh road in darkness. Each step pulled at his sandals, and twice he nearly turned back. At dawn he found the banner hanging from a broken spear.
question: "Which detail is the main trial in this episode?"
choices:
  - "Iro must choose the dangerous marsh road to avoid being seen."
  - "The banner hangs from a spear."
  - "The sun rises at dawn."
  - "Iro owns sandals."
correctAnswer: "Iro must choose the dangerous marsh road to avoid being seen."
explanation: "The trial is the test that pressures Iro's choice and effort."
hint: "Find the obstacle that makes the journey difficult."
questionGoal: "Identify a journey trial rather than a small detail."
misconception: "Calling any travel detail the trial."
```

```question
key: u02_l01_q03_journey_terms
type: match-pairs
prompt: "Match each journey term to the best example."
pairs:
  - left: "Departure"
    right: "Iro leaves the harbor."
  - left: "Trial"
    right: "The marsh pulls at every step."
  - left: "Helper"
    right: "A shepherd points toward a spring."
  - left: "Cost"
    right: "Iro returns barefoot and exhausted."
explanation: "Journey episodes often reveal meaning through the sequence of departure, testing, help, and cost."
hint: "Think about the job each moment does in the episode."
questionGoal: "Connect journey vocabulary to story examples."
misconception: "Memorizing terms without applying them to passage details."
```

```question
key: u02_l01_q04_trial_reveals_character
type: multiple-choice
prompt: "Which claim best explains what the marsh trial reveals about Iro?"
choices:
  - "Iro is willing to accept hardship to complete his mission."
  - "Iro dislikes sandals."
  - "Iro knows every road perfectly."
  - "Iro is never afraid."
correctAnswer: "Iro is willing to accept hardship to complete his mission."
explanation: "The passage shows Iro nearly turning back but continuing through difficulty."
hint: "Choose the claim that includes both difficulty and choice."
questionGoal: "Interpret a journey trial as character evidence."
misconception: "Reading the trial as action only, not as a test of character."
```

```question
key: u02_l01_q05_cost_of_success
type: fill-blank
prompt: "Complete the sentence about journey cost."
sentenceBefore: "Iro succeeds because he finds the banner, but the cost is that he returns"
sentenceAfter: "."
choices:
  - "barefoot and exhausted"
  - "with a golden crown"
  - "before he leaves"
  - "without seeing the marsh"
correctAnswer: "barefoot and exhausted"
explanation: "Heroic success often has a cost, and this passage names Iro's physical loss and exhaustion."
hint: "Look for what Iro loses or suffers by the end."
questionGoal: "Identify the cost within a successful journey episode."
misconception: "Assuming success means there is no cost."
```

```question
key: u02_l01_q06_best_summary_journey
type: multiple-choice
prompt: "Which summary best captures the journey structure?"
choices:
  - "Iro leaves on a mission, faces the marsh road, receives help, and returns with the banner at a cost."
  - "Iro walks near water and sees a broken spear."
  - "Iro's sandals are the main problem in the story."
  - "A shepherd is the true hero because he knows where water is."
correctAnswer: "Iro leaves on a mission, faces the marsh road, receives help, and returns with the banner at a cost."
explanation: "The correct summary names the major journey stages rather than isolated details."
hint: "Choose the answer that includes the whole episode arc."
questionGoal: "Summarize a journey episode through its major stages."
misconception: "Reducing a journey to small adventure details."
```

### Lesson 2: Heroic Code: Honor, Loyalty, And Cost

```question
key: u02_l02_q01_code_value
type: passage-question
prompt: "Read the passage and identify the value shaping the choice."
passageTitle: "The Last Watch"
passage: |
  The gate captain told Sera to leave before the enemy arrived. Sera shook her head. "My oath was to guard the gate until the children crossed the bridge," she said. Only after the last child reached the far bank did she lower her spear and run.
question: "Which value most clearly shapes Sera's choice?"
choices:
  - "Loyalty to her oath and duty to protect others"
  - "Desire for praise from the enemy"
  - "Fear of crossing bridges"
  - "Interest in owning the gate"
correctAnswer: "Loyalty to her oath and duty to protect others"
explanation: "Sera stays because of her oath and the children, even when leaving would be safer."
hint: "Look at the reason Sera gives for staying."
questionGoal: "Identify the heroic-code value behind a choice."
misconception: "Explaining heroic action as random bravery without values."
```

```question
key: u02_l02_q02_choice_consequence_frame
type: multi-blank-cloze
prompt: "Complete the choice-consequence frame."
parts:
  - "Sera chooses to "
  - " because of her oath. The cost is that she faces "
  - " before she can escape."
blanks:
  - correctAnswer: "guard the gate"
    acceptedAnswers:
      - "guard the gate"
      - "stay at the gate"
    choices:
      - "guard the gate"
      - "hide on the bridge"
      - "ask for a crown"
  - correctAnswer: "the enemy"
    acceptedAnswers:
      - "the enemy"
      - "danger"
    choices:
      - "the enemy"
      - "a feast"
      - "a storm at sea"
explanation: "A heroic-code choice often includes a value and a cost."
hint: "Use Sera's oath and the danger named in the passage."
questionGoal: "Connect heroic value, choice, and cost."
misconception: "Naming the heroic choice but ignoring its consequence."
```

```question
key: u02_l02_q03_honor_or_pride
type: multiple-choice
prompt: "Which statement best shows careful thinking about honor in the passage?"
choices:
  - "Sera's honor is tied to keeping an oath, not showing off."
  - "Sera stays only because she wants people to call her brave."
  - "Honor means never running, so Sera is dishonorable when she leaves."
  - "Honor has no cost in heroic stories."
correctAnswer: "Sera's honor is tied to keeping an oath, not showing off."
explanation: "The passage connects Sera's action to her oath and the children's safety."
hint: "Separate duty from empty pride."
questionGoal: "Distinguish heroic honor from simple pride or performance."
misconception: "Treating honor as showing off or refusing all retreat."
```

```question
key: u02_l02_q04_values_to_details
type: match-pairs
prompt: "Match each value to the detail that best shows it."
pairs:
  - left: "Loyalty"
    right: "Sera keeps the oath she made."
  - left: "Protection"
    right: "She waits until the children cross."
  - left: "Courage"
    right: "She stays as the enemy approaches."
  - left: "Prudence"
    right: "She runs after her duty is complete."
explanation: "A heroic code can include more than bravery; it may include duty, protection, and wise timing."
hint: "Find the action that expresses each value."
questionGoal: "Match heroic-code values to passage evidence."
misconception: "Assuming heroic code means only courage."
```

```question
key: u02_l02_q05_best_theme_code
type: passage-question
prompt: "Read the passage and choose the best theme."
passageTitle: "The Last Watch"
passage: |
  The gate captain told Sera to leave before the enemy arrived. Sera shook her head. "My oath was to guard the gate until the children crossed the bridge," she said. Only after the last child reached the far bank did she lower her spear and run.
question: "Which theme best fits Sera's choice?"
choices:
  - "Duty can require courage, but it does not always require needless sacrifice."
  - "A hero should never listen to a captain."
  - "Children always cross bridges slowly."
  - "Running away is always dishonorable."
correctAnswer: "Duty can require courage, but it does not always require needless sacrifice."
explanation: "Sera keeps her oath, protects the children, and leaves after the duty is complete."
hint: "Notice both her staying and her leaving."
questionGoal: "Interpret a heroic-code passage with nuance."
misconception: "Flattening heroic duty into absolute sacrifice."
```

```question
key: u02_l02_q06_unsupported_code_claim
type: multiple-choice
prompt: "Which claim about Sera is unsupported?"
choices:
  - "Sera wants the enemy to praise her name."
  - "Sera feels bound by her oath."
  - "Sera protects the children at risk to herself."
  - "Sera leaves only after the last child crosses."
correctAnswer: "Sera wants the enemy to praise her name."
explanation: "The passage gives no evidence that Sera wants enemy praise."
hint: "Choose the claim that adds a motive the passage never gives."
questionGoal: "Reject an unsupported motive claim."
misconception: "Inventing motives for heroic actions."
```

### Lesson 3: Epic Signals: Invocation, In Medias Res, And Epithets

```question
key: u02_l03_q01_match_epic_signals
type: match-pairs
prompt: "Match each epic signal to its example."
pairs:
  - left: "Invocation exposure"
    right: "Sing to me of the shield that crossed the sea."
  - left: "In medias res exposure"
    right: "The battle had already burned three gates when the tale begins."
  - left: "Repeated epithet"
    right: "Sera, keeper of oaths, lifted her spear."
  - left: "Catalog or list"
    right: "They brought bronze cups, woven cloaks, white horses, and cedar bows."
explanation: "These signals announce a large traditional story and guide the reader's expectations."
hint: "Look for calling on song, starting in action, repeated title, or a formal list."
questionGoal: "Recognize common epic signals in brief examples."
misconception: "Treating epic features as random old-fashioned wording."
```

```question
key: u02_l03_q02_invocation_purpose
type: multiple-choice
prompt: "What is the likely purpose of this opening? 'Sing to me of the sailor who longed for home.'"
choices:
  - "It presents the story as an important tale being called into song."
  - "It proves the sailor is singing alone."
  - "It shows the story is a private diary."
  - "It tells the ending before the story starts."
correctAnswer: "It presents the story as an important tale being called into song."
explanation: "An invocation-like opening asks for the story to be sung or told with weight."
hint: "Notice the command to 'Sing to me.'"
questionGoal: "Explain the function of invocation exposure."
misconception: "Taking the invocation literally as ordinary conversation."
```

```question
key: u02_l03_q03_in_medias_res
type: passage-question
prompt: "Read the opening and choose the best description."
passageTitle: "After The Gate Fell"
passage: |
  The third gate had already fallen when Karo found his brother's helmet beneath the ash tree. Behind him, the city bells still rang, and before him the enemy fires shone along the road.
question: "Which epic signal does this opening most clearly show?"
choices:
  - "In medias res exposure, because the story begins after major action has started"
  - "A catalog, because it lists every warrior"
  - "A comic misunderstanding, because the helmet is funny"
  - "A wisdom saying, because it gives direct advice"
correctAnswer: "In medias res exposure, because the story begins after major action has started"
explanation: "The opening begins in the middle of conflict, after the third gate has already fallen."
hint: "Ask whether the story starts before or after action is already underway."
questionGoal: "Identify in medias res exposure from a passage."
misconception: "Missing time clues that show the story begins mid-action."
```

```question
key: u02_l03_q04_epithet_effect
type: fill-blank
prompt: "Complete the explanation."
sentenceBefore: "Calling Sera 'keeper of oaths' is an epithet because it repeats a title that highlights her"
sentenceAfter: "."
choices:
  - "loyal duty"
  - "favorite color"
  - "secret map"
  - "comic disguise"
correctAnswer: "loyal duty"
explanation: "The epithet names a quality the story wants readers to remember."
hint: "What value does 'keeper of oaths' point to?"
questionGoal: "Explain how an epithet emphasizes character."
misconception: "Treating an epithet as a decorative nickname only."
```

```question
key: u02_l03_q05_catalog_or_random_list
type: multiple-choice
prompt: "Which list is most like an epic catalog?"
choices:
  - "The allies came from hill towns, island harbors, river farms, and the northern road."
  - "The hero was hungry, tired, thirsty, and sleepy."
  - "The cup was old, cracked, dusty, and small."
  - "The child counted one, two, three, and four stones."
correctAnswer: "The allies came from hill towns, island harbors, river farms, and the northern road."
explanation: "An epic catalog often creates a sense of public scale by listing peoples, places, gifts, or warriors."
hint: "Choose the list that makes the story feel large and public."
questionGoal: "Recognize the purpose of catalog-like listing."
misconception: "Assuming every list has the same literary effect."
```

```question
key: u02_l03_q06_feature_to_meaning
type: passage-question
prompt: "Read the excerpt and choose the best explanation of the epic signal."
passageTitle: "The Oath Keeper"
passage: |
  Tell now of Sera, keeper of oaths, who stood where three roads met. From the north came the bronze riders; from the east came the dust of fleeing carts; from the west came the children she had sworn to guard.
question: "How do the epic-like signals shape the passage?"
choices:
  - "They make Sera's choice feel public, serious, and connected to a larger story."
  - "They make the passage seem like a private joke."
  - "They show that Sera is not important to the action."
  - "They prove the passage is mainly about road building."
correctAnswer: "They make Sera's choice feel public, serious, and connected to a larger story."
explanation: "The call to tell, repeated epithet, and formal listing raise the stakes of Sera's choice."
hint: "Notice how the wording makes the scene feel larger than an ordinary moment."
questionGoal: "Connect epic signals to meaning and tone."
misconception: "Identifying a feature without explaining its effect."
```

### Lesson 4: Hospitality, Homecoming, Fate, And Choice

```question
key: u02_l04_q01_motif_match
type: match-pairs
prompt: "Match each motif to the example."
pairs:
  - left: "Hospitality"
    right: "A poor family gives bread to a stranger."
  - left: "Homecoming"
    right: "A wanderer reaches the gate he dreamed of for ten years."
  - left: "Exile"
    right: "A prince lives far from the city that banished him."
  - left: "Fate and choice"
    right: "A prophecy names danger, but the hero still chooses the road."
explanation: "Motifs are recurring patterns that must be interpreted in context."
hint: "Match the recurring idea to the story situation."
questionGoal: "Recognize key heroic motifs."
misconception: "Memorizing motif labels without linking them to examples."
```

```question
key: u02_l04_q02_fate_choice
type: passage-question
prompt: "Read the passage and choose the best interpretation."
passageTitle: "The Forked Road"
passage: |
  The oracle warned, "On the lower road, you will lose what you carry." Tavin looked at the upper road, where smoke rose from the farms, and at the lower road, where the river bridge still stood. He took the lower road and left his gold behind so he could carry children across the bridge.
question: "How does the passage treat fate and choice?"
choices:
  - "The warning names a cost, but Tavin still chooses how to act."
  - "The warning removes every choice Tavin has."
  - "Tavin chooses the lower road because he wants more gold."
  - "The oracle is ignored because nothing is lost."
correctAnswer: "The warning names a cost, but Tavin still chooses how to act."
explanation: "Tavin cannot avoid loss, but he chooses to lose gold while saving children."
hint: "Look for both the prophecy and Tavin's decision."
questionGoal: "Interpret fate and free choice together."
misconception: "Assuming fate cancels responsibility or action."
```

```question
key: u02_l04_q03_hospitality_interpretation
type: multiple-choice
prompt: "Which interpretation uses the hospitality motif carefully?"
choices:
  - "The host's welcome matters because the passage shows the stranger is helpless and the house has little food."
  - "Every stranger in a classical story must secretly be a god."
  - "Hospitality always means the host will be rewarded immediately."
  - "The meal matters only because food appears in the scene."
correctAnswer: "The host's welcome matters because the passage shows the stranger is helpless and the house has little food."
explanation: "The careful interpretation uses passage details instead of assuming a fixed hidden meaning."
hint: "Choose the answer that stays tied to evidence."
questionGoal: "Apply a motif without overgeneralizing it."
misconception: "Treating a motif as having the same secret meaning in every story."
```

```question
key: u02_l04_q04_homecoming_not_simple
type: passage-question
prompt: "Read the passage and choose the best claim."
passageTitle: "At The Old Gate"
passage: |
  After years away, Niko touched the gate of his father's house. No one opened it. The vines had covered the lion carved above the door, and the neighbors spoke his name softly, as if it belonged to a ghost.
question: "Which claim best interprets homecoming in this passage?"
choices:
  - "Homecoming is complicated because return brings loss as well as arrival."
  - "Homecoming is always joyful once the traveler reaches the gate."
  - "The passage is mainly about gardening."
  - "Niko has never seen the house before."
correctAnswer: "Homecoming is complicated because return brings loss as well as arrival."
explanation: "Niko reaches home, but the closed door, vines, and neighbors' whispers make the return painful."
hint: "Notice the difference between arriving and being welcomed."
questionGoal: "Interpret homecoming as a motif with tension."
misconception: "Assuming homecoming is automatically simple or happy."
```

```question
key: u02_l04_q05_correct_motif_overreach
type: error-correction
prompt: "Revise the overbroad claim so it stays tied to this passage's evidence about arrival and loss."
sentence: "Homecoming always means happiness because Niko reaches his old house."
acceptedAnswers:
  - "Homecoming is complicated here because Niko arrives at his old house, but the closed door and covered carving show loss."
  - "Homecoming is complicated in this passage because Niko reaches his old house, but the closed door and covered carving suggest loss."
explanation: "The corrected claim keeps the motif tied to this passage's evidence."
hint: "Use both arrival and loss in the corrected claim."
questionGoal: "Repair an overgeneralized motif claim."
misconception: "Forcing a motif to mean the same thing in every passage."
```

```question
key: u02_l04_q06_motif_to_theme
type: multi-blank-cloze
prompt: "Complete the motif-to-theme statement."
parts:
  - "In the Tavin passage, the fate-and-choice motif suggests that a person may not control every "
  - ", but can still choose a "
  - " action."
blanks:
  - correctAnswer: "cost"
    acceptedAnswers:
      - "cost"
      - "loss"
    choices:
      - "cost"
      - "song"
      - "door"
  - correctAnswer: "generous"
    acceptedAnswers:
      - "generous"
      - "selfless"
      - "brave"
    choices:
      - "generous"
      - "careless"
      - "silent"
explanation: "Tavin cannot avoid loss, but he chooses a selfless response."
hint: "Use the prophecy's cost and Tavin's rescue choice."
questionGoal: "Connect a motif to a supported theme idea."
misconception: "Naming a motif without explaining its thematic meaning."
```

## Unit 3: Tragic Conflict And Comic Correction

### Lesson 1: Tragic Conflict And Hubris

```question
key: u03_l01_q01_conflict_pressure
type: passage-question
prompt: "Read the passage and identify the tragic conflict."
passageTitle: "The Narrow Bridge"
passage: |
  Prince Ardon was told to lower the bridge so the hill villages could enter the city before the flood. "If I lower it for them," he said, "they will think the city needs their friendship." He waited until the river reached the outer stones. By then the villagers had turned back toward the hills.
question: "What is the central conflict in the passage?"
choices:
  - "Ardon must choose between prideful independence and helping the villages."
  - "Ardon must decide what color to paint the bridge."
  - "The villagers want to become princes."
  - "The city has too many bridges."
correctAnswer: "Ardon must choose between prideful independence and helping the villages."
explanation: "The serious pressure is Ardon's choice between protecting pride and acting for others."
hint: "Look for the decision that affects people outside Ardon."
questionGoal: "Identify tragic conflict as a serious pressure on choice."
misconception: "Treating conflict as any problem in the setting rather than a meaningful choice."
```

```question
key: u03_l01_q02_hubris_detail
type: multiple-choice
prompt: "Which detail best shows hubris in the Ardon passage?"
choices:
  - "He refuses help because he does not want the villages to think the city needs them."
  - "The river reaches the outer stones."
  - "The villagers live in the hills."
  - "The city has a bridge."
correctAnswer: "He refuses help because he does not want the villages to think the city needs them."
explanation: "Hubris is dangerous pride or overconfidence. Ardon's pride keeps him from acting wisely."
hint: "Find the detail where pride affects the choice."
questionGoal: "Recognize hubris from textual evidence."
misconception: "Confusing ordinary confidence or background detail with hubris."
```

```question
key: u03_l01_q03_hubris_or_courage
type: match-pairs
prompt: "Match each description to the best label."
pairs:
  - left: "Refusing help because accepting it feels shameful"
    right: "Hubris"
  - left: "Facing danger to protect someone vulnerable"
    right: "Courage"
  - left: "Knowing a danger but pretending it cannot matter"
    right: "Blindness"
  - left: "Choosing after weighing risk and duty"
    right: "Judgment"
explanation: "Tragic readiness depends on noticing the difference between brave risk and prideful blindness."
hint: "Ask whether the action serves duty or protects pride."
questionGoal: "Distinguish hubris from related character traits."
misconception: "Treating all bold action as heroic courage."
```

```question
key: u03_l01_q04_tragic_risk_frame
type: multi-blank-cloze
prompt: "Complete the tragic-risk frame."
parts:
  - "Ardon's "
  - " makes him delay lowering the bridge, and the consequence is that the villagers "
  - "."
blanks:
  - correctAnswer: "pride"
    acceptedAnswers:
      - "pride"
      - "hubris"
    choices:
      - "pride"
      - "hospitality"
      - "patience"
  - correctAnswer: "turn back"
    acceptedAnswers:
      - "turn back"
      - "turn back toward the hills"
    choices:
      - "turn back"
      - "enter safely"
      - "sing to him"
explanation: "The frame connects the flawed choice to its consequence."
hint: "Use the value Ardon protects and what the villagers do at the end."
questionGoal: "Connect hubris, action, and consequence."
misconception: "Naming a flaw without tracing its effect."
```

```question
key: u03_l01_q05_not_tragic_claim
type: multiple-choice
prompt: "Which claim misunderstands tragic conflict?"
choices:
  - "This is tragic only because water appears in the scene."
  - "Ardon's pride turns a decision into a serious consequence."
  - "The passage shows a choice under pressure."
  - "The villagers' safety is part of what makes the conflict serious."
correctAnswer: "This is tragic only because water appears in the scene."
explanation: "The tragic-ready conflict comes from the pressure, pride, choice, and consequence, not merely from the setting."
hint: "A setting detail is not enough to create tragic conflict."
questionGoal: "Reject a superficial tragic-conflict claim."
misconception: "Identifying tragedy by scenery or sadness rather than conflict structure."
```

```question
key: u03_l01_q06_best_theme_hubris
type: passage-question
prompt: "Read the passage and choose the best theme."
passageTitle: "The Narrow Bridge"
passage: |
  Prince Ardon was told to lower the bridge so the hill villages could enter the city before the flood. "If I lower it for them," he said, "they will think the city needs their friendship." He waited until the river reached the outer stones. By then the villagers had turned back toward the hills.
question: "Which theme best fits the passage?"
choices:
  - "Pride can turn a chance to help into a lasting loss."
  - "Bridges should never be lowered during floods."
  - "Friendship is useless in cities."
  - "Villagers should not walk near rivers."
correctAnswer: "Pride can turn a chance to help into a lasting loss."
explanation: "Ardon's pride delays help until the opportunity is gone."
hint: "Choose the idea that connects pride, delay, and consequence."
questionGoal: "Interpret hubris as part of theme."
misconception: "Choosing a practical rule or overgeneralization instead of a theme."
```

### Lesson 2: Reversal, Recognition, And Consequence

```question
key: u03_l02_q01_sequence_reversal
type: order-items
prompt: "Put the scene moments in order."
items:
  - "The sealed tablet is opened."
  - "Liora realizes the warning was about her own order."
  - "Liora sends the messenger away unread."
  - "The city loses the chance to send help."
correctOrder:
  - "Liora sends the messenger away unread."
  - "The sealed tablet is opened."
  - "Liora realizes the warning was about her own order."
  - "The city loses the chance to send help."
explanation: "The scene moves from mistaken action to revealed truth, recognition, and consequence."
hint: "Find the mistake first and the consequence last."
questionGoal: "Sequence action, reversal, recognition, and consequence."
misconception: "Treating recognition as if it prevents all consequences."
```

```question
key: u03_l02_q02_identify_reversal
type: passage-question
prompt: "Read the passage and identify the reversal."
passageTitle: "The Sealed Tablet"
passage: |
  Liora sent away a dusty messenger, saying no stranger could interrupt the council. Later, her brother broke the seal on the messenger's tablet. The message warned that the council chamber itself was unsafe. Liora stared at the empty doorway and whispered, "I dismissed the warning I most needed."
question: "Which moment is the reversal?"
choices:
  - "The tablet reveals that the warning was about the council chamber."
  - "The messenger is dusty."
  - "Liora has a brother."
  - "The council meets indoors."
correctAnswer: "The tablet reveals that the warning was about the council chamber."
explanation: "A reversal changes the situation: the dismissed message becomes urgently important."
hint: "Look for the moment when the meaning of earlier action changes."
questionGoal: "Identify reversal in a tragic-ready scene."
misconception: "Calling any new detail a reversal."
```

```question
key: u03_l02_q03_recognition_line
type: multiple-choice
prompt: "Which line shows recognition?"
choices:
  - "I dismissed the warning I most needed."
  - "No stranger could interrupt the council."
  - "The messenger was dusty."
  - "Her brother broke the seal."
correctAnswer: "I dismissed the warning I most needed."
explanation: "Recognition is the moment when Liora understands the meaning of her mistake."
hint: "Find the line where Liora understands what she did."
questionGoal: "Recognize a character's moment of understanding."
misconception: "Confusing recognition with any spoken line."
```

```question
key: u03_l02_q04_terms_to_moments
type: match-pairs
prompt: "Match each tragic-ready term to its moment."
pairs:
  - left: "Mistaken action"
    right: "Liora sends the messenger away."
  - left: "Reversal"
    right: "The message proves to be about the council chamber."
  - left: "Recognition"
    right: "Liora understands that she dismissed the needed warning."
  - left: "Consequence"
    right: "The city loses time to send help."
explanation: "These terms name different jobs in the scene's structure."
hint: "Do not use the same scene moment for every term."
questionGoal: "Apply tragedy-readiness vocabulary to a passage."
misconception: "Blending reversal, recognition, and consequence into one vague idea."
```

```question
key: u03_l02_q05_consequence_not_punishment
type: multiple-choice
prompt: "Which statement best explains consequence in the Liora scene?"
choices:
  - "The consequence is the cost that follows from dismissing the warning."
  - "The consequence must be a punishment given by another character."
  - "There is no consequence because Liora says she was wrong."
  - "The consequence is that the messenger was dusty."
correctAnswer: "The consequence is the cost that follows from dismissing the warning."
explanation: "Consequence means what follows from the choice; it is not only formal punishment."
hint: "Look for what the mistake causes."
questionGoal: "Explain consequence as a result of action."
misconception: "Thinking recognition erases consequence or that consequence only means punishment."
```

```question
key: u03_l02_q06_complete_structure
type: multi-blank-cloze
prompt: "Complete the structure sentence."
parts:
  - "The reversal occurs when the tablet's message shows the danger is in the "
  - ". Liora's recognition is that she "
  - " the warning she needed."
blanks:
  - correctAnswer: "council chamber"
    acceptedAnswers:
      - "council chamber"
      - "council"
    choices:
      - "council chamber"
      - "harbor"
      - "market"
  - correctAnswer: "dismissed"
    acceptedAnswers:
      - "dismissed"
      - "sent away"
    choices:
      - "dismissed"
      - "followed"
      - "invented"
explanation: "The sentence names both the changed situation and Liora's new understanding."
hint: "Use the tablet's message and Liora's final words."
questionGoal: "Complete a reversal-recognition explanation."
misconception: "Identifying a turn without naming what the character understands."
```

### Lesson 3: Comic Misunderstanding And Exaggeration

```question
key: u03_l03_q01_comic_device
type: passage-question
prompt: "Read the passage and identify the comic device."
passageTitle: "The Inspector's Seal"
passage: |
  The market inspector wore a seal the size of a dinner plate and announced, "No loaf may be sold unless I approve its shadow." Bakers dragged their bread into the sun while customers laughed. By noon, the inspector had approved only three shadows and no bread.
question: "Which comic device is most important?"
choices:
  - "Exaggeration, because the inspector's rule is absurdly overdone"
  - "Epic invocation, because the inspector asks a muse for help"
  - "Tragic recognition, because the bakers all die"
  - "Homecoming, because bread returns home"
correctAnswer: "Exaggeration, because the inspector's rule is absurdly overdone"
explanation: "The oversized seal and impossible shadow rule exaggerate official importance."
hint: "Look for what is made absurdly large or unreasonable."
questionGoal: "Identify comic exaggeration in a short passage."
misconception: "Thinking comedy is just anything with laughter, not a device with a purpose."
```

```question
key: u03_l03_q02_social_problem
type: multiple-choice
prompt: "What social problem does the inspector passage expose?"
choices:
  - "Officials can become foolish when rules matter more than people."
  - "Bread should never be sold outdoors."
  - "Customers should not laugh in markets."
  - "Dinner plates are too large for seals."
correctAnswer: "Officials can become foolish when rules matter more than people."
explanation: "The passage uses absurd rules to criticize empty authority."
hint: "Ask what behavior the exaggeration makes look foolish."
questionGoal: "Connect comic exaggeration to social correction."
misconception: "Missing the serious criticism behind a comic scene."
```

```question
key: u03_l03_q03_dialogue_builder_misunderstanding
type: dialogue-builder
prompt: "Choose the line that best continues the comic misunderstanding."
turns:
  - speaker: "Inspector"
    line: "This loaf's shadow is too proud for public sale."
  - speaker: "Baker"
    line: "Sir, people came to buy bread, not shadows."
choices:
  - "Then sell the shadow first and the bread may learn humility."
  - "You are right; I will stop making rules."
  - "The bridge must be lowered before sunset."
  - "Let us sing of the sailor who longed for home."
correctAnswer: "Then sell the shadow first and the bread may learn humility."
explanation: "The chosen line extends the absurd misunderstanding about approving shadows."
hint: "Keep the inspector's foolish rule going."
questionGoal: "Use dialogue logic to continue a comic misunderstanding."
misconception: "Choosing a line from another genre or ending the misunderstanding too soon."
```

```question
key: u03_l03_q04_device_examples
type: match-pairs
prompt: "Match each comic device to the example."
pairs:
  - left: "Misunderstanding"
    right: "A judge thinks 'light bread' means bread without a shadow."
  - left: "Exaggeration"
    right: "The seal is described as the size of a dinner plate."
  - left: "Status conflict"
    right: "A small official acts more important than the whole city."
  - left: "Social correction"
    right: "The crowd's laughter exposes the rule as foolish."
explanation: "Comic scenes often use devices to reveal or correct social behavior."
hint: "Ask what kind of comic work each example is doing."
questionGoal: "Connect comedy-readiness terms to examples."
misconception: "Treating all comic details as the same kind of joke."
```

```question
key: u03_l03_q05_not_just_funny
type: multiple-choice
prompt: "Which claim best avoids the misconception that comedy means only 'funny'?"
choices:
  - "The scene is comic because its absurd rule exposes foolish authority."
  - "The scene is comic because someone laughed."
  - "The scene is comic because bread is mentioned."
  - "The scene is comic because nothing serious can happen in a market."
correctAnswer: "The scene is comic because its absurd rule exposes foolish authority."
explanation: "The correct claim names both the humorous device and its social meaning."
hint: "Choose the answer that explains what the humor reveals."
questionGoal: "Explain comedy as social critique or correction."
misconception: "Reducing comedy to laughter alone."
```

```question
key: u03_l03_q06_complete_comic_analysis
type: multi-blank-cloze
prompt: "Complete the comic analysis."
parts:
  - "The passage exaggerates the inspector's "
  - " to show how rules can become "
  - " when they ignore real needs."
blanks:
  - correctAnswer: "authority"
    acceptedAnswers:
      - "authority"
      - "power"
    choices:
      - "authority"
      - "hospitality"
      - "homecoming"
  - correctAnswer: "foolish"
    acceptedAnswers:
      - "foolish"
      - "absurd"
    choices:
      - "foolish"
      - "heroic"
      - "silent"
explanation: "The analysis connects exaggeration to the problem being exposed."
hint: "Use what the inspector has too much of and what the rule becomes."
questionGoal: "Complete a comedy-readiness interpretation."
misconception: "Naming a device without explaining its corrective purpose."
```

### Lesson 4: Genre Contrast: Tragic And Comic Conflict

```question
key: u03_l04_q01_tragic_or_comic_signal
type: match-pairs
prompt: "Match each signal to the genre frame it most strongly suggests."
pairs:
  - left: "A ruler's pride causes a city to lose its chance for help."
    right: "Tragic conflict"
  - left: "An official makes everyone measure the shadows of bread."
    right: "Comic exaggeration"
  - left: "A character realizes too late that she dismissed a warning."
    right: "Recognition and consequence"
  - left: "A crowd laughs at a rule that exposes foolish authority."
    right: "Social correction"
explanation: "Both genres use conflict, but their structures and effects differ."
hint: "Look for serious consequence or corrective absurdity."
questionGoal: "Sort tragic-ready and comic-ready signals."
misconception: "Using one genre label for every kind of conflict."
```

```question
key: u03_l04_q02_best_genre_claim
type: passage-question
prompt: "Read the passage and choose the best genre claim."
passageTitle: "The Crown's Echo"
passage: |
  The king ordered that no one speak until his bronze crown had been polished enough to reflect the sun. All morning, messengers waited with reports of broken wells. At noon, the crown flashed brightly, but the wells had run dry.
question: "Which genre frame best fits the passage?"
choices:
  - "Tragic-ready, because pride and delay bring serious consequence."
  - "Comic-ready, because the crown is made of bronze."
  - "Epic, because the passage lists many warriors."
  - "Wisdom literature, because it gives a proverb."
correctAnswer: "Tragic-ready, because pride and delay bring serious consequence."
explanation: "The king's pride delays needed action until harm occurs."
hint: "Focus on the result of the king's pride."
questionGoal: "Choose a genre frame from evidence."
misconception: "Selecting genre from a surface object rather than structure."
```

```question
key: u03_l04_q03_comic_frame_evidence
type: passage-question
prompt: "Read the passage and choose the best evidence for a comic-ready claim."
passageTitle: "The Official Of Dust"
passage: |
  The new official declared that dust could not enter the council hall without a permit. Servants swept all morning, but each broom raised more dust. By sunset, the official had written seven permits for dust and none for the people waiting outside.
question: "Which evidence best supports the claim that the passage is comic-ready?"
choices:
  - "The official writes permits for dust instead of helping people."
  - "The council hall exists."
  - "Servants swept in the morning."
  - "Sunset arrives."
correctAnswer: "The official writes permits for dust instead of helping people."
explanation: "The absurd rule exposes foolish authority, a comic social correction signal."
hint: "Look for the detail that makes a rule absurd."
questionGoal: "Use evidence to support a comic genre claim."
misconception: "Choosing neutral setting details as genre evidence."
```

```question
key: u03_l04_q04_repair_genre_claim
type: error-correction
prompt: "Revise the weak genre claim so it explains what the absurd dust permits reveal."
sentence: "The passage is comic-ready because dust is funny."
acceptedAnswers:
  - "The passage is comic-ready because the absurd dust permits expose foolish rule-making."
  - "The passage is comic-ready because the official's dust permits reveal foolish rule-making."
explanation: "The corrected claim explains the comic device and what it reveals."
hint: "Name the absurd rule and the behavior it exposes."
questionGoal: "Repair a superficial comedy claim."
misconception: "Calling something comic because an object seems funny."
```

```question
key: u03_l04_q05_contrast_genres
type: multiple-choice
prompt: "Which statement best contrasts tragic-ready and comic-ready conflict?"
choices:
  - "Tragic-ready conflict often stresses serious consequence; comic-ready conflict often uses absurdity to expose or correct behavior."
  - "Tragic-ready conflict always has no choices; comic-ready conflict never has a theme."
  - "Tragic-ready passages cannot include irony; comic-ready passages cannot include problems."
  - "The only difference is whether the passage has a happy ending."
correctAnswer: "Tragic-ready conflict often stresses serious consequence; comic-ready conflict often uses absurdity to expose or correct behavior."
explanation: "The contrast focuses on structure and effect, not a simple happy-or-sad label."
hint: "Choose the answer that describes how each genre handles conflict."
questionGoal: "State a nuanced contrast between tragic and comic readiness."
misconception: "Reducing genre contrast to ending or mood alone."
```

```question
key: u03_l04_q06_choose_evidence_for_contrast
type: match-pairs
prompt: "Match each claim to the evidence that best supports it."
pairs:
  - left: "The king passage is tragic-ready."
    right: "Reports of broken wells wait until the wells run dry."
  - left: "The dust passage is comic-ready."
    right: "The official writes permits for dust."
  - left: "The king's conflict involves pride."
    right: "He waits for the crown to reflect the sun."
  - left: "The dust passage exposes rule-making."
    right: "Permits matter more than people waiting outside."
explanation: "Genre contrast should be supported by details that show structure and meaning."
hint: "Match each claim to the detail that directly proves it."
questionGoal: "Support genre contrast with specific evidence."
misconception: "Matching by shared nouns rather than interpretive support."
```

## Unit 4: Versions, Translations, And Point Of View

### Lesson 1: Compare Versions By One Criterion

```question
key: u04_l01_q01_choose_criterion
type: multiple-choice
prompt: "Which comparison criterion is clearest for two versions of the same rescue scene?"
choices:
  - "Compare how each version describes the rescuer's motive."
  - "Compare every word in both passages at once."
  - "Decide which version you like better without evidence."
  - "Count how many letters are in the hero's name."
correctAnswer: "Compare how each version describes the rescuer's motive."
explanation: "A clear criterion focuses the comparison on one meaningful feature."
hint: "Choose a focus that can affect interpretation."
questionGoal: "Identify a useful comparison criterion."
misconception: "Thinking comparison means listing every difference or giving a preference."
```

```question
key: u04_l01_q02_paired_comparison
type: passage-question
prompt: "Read both versions and choose the best comparison."
passageTitle: "Two Versions Of The Torch"
passage: |
  Version A: Mara ran into the smoke because she heard a child calling from the hall.

  Version B: Mara ran into the smoke, eager to prove that no one in the city was braver.
question: "Which comparison uses one clear criterion?"
choices:
  - "Version A emphasizes compassion, while Version B emphasizes desire for glory."
  - "Version A is shorter, so it is automatically better."
  - "Both versions have smoke, so they mean exactly the same thing."
  - "Version B is wrong because heroes never want glory."
correctAnswer: "Version A emphasizes compassion, while Version B emphasizes desire for glory."
explanation: "The answer compares motive, using a specific difference in wording."
hint: "Ask what reason each version gives for Mara's action."
questionGoal: "Compare versions by a focused criterion."
misconception: "Treating shared plot as identical meaning or different wording as wrong."
```

```question
key: u04_l01_q03_criterion_to_question
type: match-pairs
prompt: "Match each comparison criterion to a question it asks."
pairs:
  - left: "Wording"
    right: "Which words describe the action?"
  - left: "Emphasis"
    right: "What does this version make most important?"
  - left: "Point of view"
    right: "Who tells or sees the event?"
  - left: "Omission"
    right: "What detail is left out?"
explanation: "A comparison criterion helps you know what to look for."
hint: "Each criterion asks a different kind of question."
questionGoal: "Connect comparison criteria to reading questions."
misconception: "Using comparison terms without knowing what they guide."
```

```question
key: u04_l01_q04_evidence_from_both
type: multi-blank-cloze
prompt: "Complete the comparison sentence."
parts:
  - "Version A suggests Mara acts from "
  - " because she hears a child calling. Version B suggests she acts from "
  - " because she wants to prove bravery."
blanks:
  - correctAnswer: "compassion"
    acceptedAnswers:
      - "compassion"
      - "care"
    choices:
      - "compassion"
      - "revenge"
      - "confusion"
  - correctAnswer: "glory"
    acceptedAnswers:
      - "glory"
      - "pride"
    choices:
      - "glory"
      - "hospitality"
      - "silence"
explanation: "The sentence uses evidence from both versions to compare motive."
hint: "Use the reason each version gives for the same action."
questionGoal: "Use evidence from both versions in a comparison."
misconception: "Comparing one version while ignoring the other."
```

```question
key: u04_l01_q05_bad_comparison
type: multiple-choice
prompt: "Which comparison is weakest?"
choices:
  - "Version A is better because I like it more."
  - "Version A emphasizes compassion because Mara hears a child."
  - "Version B emphasizes glory because Mara wants to prove bravery."
  - "The versions differ in motive even though the action is similar."
correctAnswer: "Version A is better because I like it more."
explanation: "A literary comparison needs a criterion and evidence, not just preference."
hint: "Look for the answer with no textual reason."
questionGoal: "Reject preference-only comparison."
misconception: "Confusing personal preference with literary comparison."
```

```question
key: u04_l01_q06_order_comparison_steps
type: order-items
prompt: "Put the comparison steps in order."
items:
  - "Explain why the difference matters."
  - "Choose one comparison criterion."
  - "Find evidence in both versions."
  - "State a focused comparison claim."
correctOrder:
  - "Choose one comparison criterion."
  - "Find evidence in both versions."
  - "State a focused comparison claim."
  - "Explain why the difference matters."
explanation: "A focused comparison moves from criterion to evidence to claim and explanation."
hint: "Start by deciding what feature you are comparing."
questionGoal: "Sequence a disciplined version-comparison process."
misconception: "Jumping to judgment before choosing a criterion or evidence."
```

### Lesson 2: Translation Wording, Tone, And Emphasis

```question
key: u04_l02_q01_tone_words
type: match-pairs
prompt: "Match each speech word to the tone it most strongly suggests."
pairs:
  - left: "commanded"
    right: "Forceful"
  - left: "pleaded"
    right: "Urgent and vulnerable"
  - left: "murmured"
    right: "Quiet"
  - left: "boasted"
    right: "Proud"
explanation: "Wording can shift the reader's sense of tone even when the basic action is similar."
hint: "Think about how each word makes the speaker sound."
questionGoal: "Connect diction to tone."
misconception: "Treating similar actions as if word choice does not matter."
```

```question
key: u04_l02_q02_translation_tone
type: passage-question
prompt: "Read the paired lines and choose the best tone comparison."
passageTitle: "Two Renderings Of A Request"
passage: |
  Rendering A: "Open the gate," the captain commanded.

  Rendering B: "Open the gate," the captain pleaded.
question: "How does the wording change the captain's tone?"
choices:
  - "A makes the captain sound forceful; B makes the captain sound desperate or vulnerable."
  - "A and B make the captain sound exactly the same."
  - "B makes the captain sound bored."
  - "A proves the captain is not really a captain."
correctAnswer: "A makes the captain sound forceful; B makes the captain sound desperate or vulnerable."
explanation: "Commanded and pleaded both describe speech, but they create different tones."
hint: "Focus on the verbs after the spoken words."
questionGoal: "Compare tone created by translation-like wording."
misconception: "Ignoring diction when interpreting tone."
```

```question
key: u04_l02_q03_emphasis_difference
type: passage-question
prompt: "Read the paired lines and identify the emphasis."
passageTitle: "Two Renderings Of Return"
passage: |
  Rendering A: The wanderer finally saw his own roof beyond the olive trees.

  Rendering B: The wanderer finally saw the roof that no longer knew his name.
question: "What does Rendering B emphasize more than Rendering A?"
choices:
  - "The pain and estrangement of return"
  - "The exact kind of tree near the roof"
  - "The wanderer's skill at building houses"
  - "The speed of the journey"
correctAnswer: "The pain and estrangement of return"
explanation: "The phrase 'no longer knew his name' makes homecoming feel painful and uncertain."
hint: "Look at what B adds to the roof image."
questionGoal: "Identify a shift in emphasis from wording."
misconception: "Not noticing how a phrase changes the meaning of a shared event."
```

```question
key: u04_l02_q04_complete_tone_comparison
type: fill-blank
prompt: "Complete the comparison."
sentenceBefore: "Changing 'commanded' to 'pleaded' makes the captain seem more"
sentenceAfter: "."
choices:
  - "desperate"
  - "careless"
  - "invisible"
  - "comic"
correctAnswer: "desperate"
explanation: "Pleaded suggests urgent need or vulnerability."
hint: "Think about how a person sounds when pleading."
questionGoal: "Describe tone shift from word choice."
misconception: "Choosing tone words unrelated to the diction."
```

```question
key: u04_l02_q05_not_accuracy_judgment
type: multiple-choice
prompt: "Which statement shows good translation awareness?"
choices:
  - "Different wording can shift tone without making one rendering automatically wrong."
  - "If two renderings use different words, one must be fake."
  - "Tone cannot change unless the plot changes."
  - "A translation never involves choices."
correctAnswer: "Different wording can shift tone without making one rendering automatically wrong."
explanation: "Translation-like wording choices can affect tone and emphasis; comparison does not have to declare one wrong."
hint: "Avoid the answer that treats difference as automatic error."
questionGoal: "Avoid correct-versus-wrong thinking about translation comparison."
misconception: "Assuming translation choices have no interpretive effect or must be errors."
```

```question
key: u04_l02_q06_word_to_effect
type: multi-blank-cloze
prompt: "Complete the wording-effect sentence."
parts:
  - "The phrase 'his own roof' emphasizes "
  - ", while 'the roof that no longer knew his name' emphasizes "
  - "."
blanks:
  - correctAnswer: "belonging"
    acceptedAnswers:
      - "belonging"
      - "home"
    choices:
      - "belonging"
      - "boasting"
      - "law"
  - correctAnswer: "estrangement"
    acceptedAnswers:
      - "estrangement"
      - "distance"
      - "loss"
    choices:
      - "estrangement"
      - "victory"
      - "speed"
explanation: "Both lines describe seeing a roof, but the wording changes the feeling of homecoming."
hint: "Ask whether the roof feels welcoming or distant in each phrase."
questionGoal: "Connect paired wording to different emphases."
misconception: "Treating shared objects as if they always carry the same meaning."
```

### Lesson 3: Point Of View And Adaptation Choices

```question
key: u04_l03_q01_point_of_view_effect
type: passage-question
prompt: "Read both versions and choose the best explanation."
passageTitle: "The Cup At The Feast"
passage: |
  Version A, told by the guest: I waited at the door until the host remembered me. By then the cup had passed twice around the room.

  Version B, told by the host: The hall was crowded, and I did not see the guest until the cup had passed twice around the room.
question: "How does point of view affect interpretation?"
choices:
  - "Version A emphasizes the guest's neglect; Version B emphasizes the host's crowded hall and possible mistake."
  - "Both versions prove the guest was never at the feast."
  - "Version B has no point of view because it mentions a hall."
  - "Point of view does not matter when the cup appears in both versions."
correctAnswer: "Version A emphasizes the guest's neglect; Version B emphasizes the host's crowded hall and possible mistake."
explanation: "Each version gives access to a different speaker's perspective and excuse or complaint."
hint: "Ask whose experience each version centers."
questionGoal: "Explain how speaker point of view shifts interpretation."
misconception: "Thinking shared events have identical meaning regardless of speaker."
```

```question
key: u04_l03_q02_omission_effect
type: multiple-choice
prompt: "An adaptation leaves out the line 'the hall was crowded.' What effect might that omission have?"
choices:
  - "The host may seem more careless because the excuse is removed."
  - "The guest must disappear from the story."
  - "The cup becomes the narrator."
  - "The feast must become a battle."
correctAnswer: "The host may seem more careless because the excuse is removed."
explanation: "Leaving out a detail can change how readers judge a character's action."
hint: "Ask what the missing detail helped explain."
questionGoal: "Interpret the effect of an omitted detail."
misconception: "Assuming omissions never affect interpretation."
```

```question
key: u04_l03_q03_adaptation_choices
type: match-pairs
prompt: "Match each adaptation choice to its likely effect."
pairs:
  - left: "Tell the scene from the guest's view"
    right: "Emphasizes being ignored"
  - left: "Add the crowded hall detail"
    right: "Makes the host's mistake more understandable"
  - left: "Remove the guest's waiting"
    right: "Reduces the sense of neglect"
  - left: "Add the host's private apology"
    right: "Makes the host seem more remorseful"
explanation: "Adaptation choices guide what the reader notices and how characters are judged."
hint: "Think about what each choice makes stronger or weaker."
questionGoal: "Connect adaptation choices to interpretive effects."
misconception: "Treating additions and omissions as neutral."
```

```question
key: u04_l03_q04_pov_not_just_pronouns
type: multiple-choice
prompt: "Which statement best shows point-of-view awareness?"
choices:
  - "Point of view includes who tells the event and what that teller notices or excuses."
  - "Point of view only means counting how many times 'I' appears."
  - "Point of view has no effect if the plot stays similar."
  - "Point of view is the same as the setting."
correctAnswer: "Point of view includes who tells the event and what that teller notices or excuses."
explanation: "Point of view shapes emphasis, knowledge, and judgment."
hint: "Choose the answer that goes beyond pronoun counting."
questionGoal: "Define point of view as an interpretive feature."
misconception: "Reducing point of view to first-person or third-person labels only."
```

```question
key: u04_l03_q05_fix_version_claim
type: error-correction
prompt: "Revise the unsupported claim so it names a point-of-view effect and supports it with evidence from Version A."
sentence: "Version A is better because the guest is right."
acceptedAnswers:
  - "Version A emphasizes the guest's feeling of neglect because it says the guest waited while the cup passed twice."
  - "Version A emphasizes the guest's neglect because the guest waits while the cup passes twice."
explanation: "The corrected claim names the effect and supports it with evidence."
hint: "Replace preference with a point-of-view effect and evidence."
questionGoal: "Repair an unsupported version-comparison claim."
misconception: "Turning comparison into personal judgment without evidence."
```

```question
key: u04_l03_q06_best_added_detail
type: passage-question
prompt: "Read the adaptation goal and choose the best added detail."
passageTitle: "Adaptation Goal"
passage: |
  Goal: Make the host seem more aware of the guest's hurt without changing the main event.
question: "Which added detail best serves this goal?"
choices:
  - "The host saw the guest's lowered eyes and quietly set aside the next cup for him."
  - "The roof of the hall was made of cedar."
  - "The guest had once crossed a river."
  - "The cup was heavier than a dinner plate."
correctAnswer: "The host saw the guest's lowered eyes and quietly set aside the next cup for him."
explanation: "This detail keeps the event but changes how aware and responsive the host seems."
hint: "Choose the detail that changes character interpretation, not scenery."
questionGoal: "Choose an adaptation detail that fits an interpretive goal."
misconception: "Adding random description instead of purposeful adaptation."
```

## Unit 5: Imagery, Allusion, Wisdom, And Dialogue

### Lesson 1: Imagery And Metaphor In Short Passages

```question
key: u05_l01_q01_image_meaning
type: passage-question
prompt: "Read the passage and choose the best interpretation of the image."
passageTitle: "The Cracked Lyre"
passage: |
  After the quarrel, the hall stood silent. The old lyre hung on the wall with one string snapped, and every footstep seemed to strike the broken note again.
question: "What idea does the image of the cracked lyre help suggest?"
choices:
  - "The quarrel has left the household feeling damaged and out of harmony."
  - "The hall needs a better musician."
  - "The lyre is more important than the people."
  - "Footsteps are a kind of song."
correctAnswer: "The quarrel has left the household feeling damaged and out of harmony."
explanation: "The snapped string and broken note create an image of damaged harmony after conflict."
hint: "Ask what a broken musical instrument might make you notice about the hall."
questionGoal: "Interpret imagery as connected to passage meaning."
misconception: "Treating imagery as decoration or literal object description only."
```

```question
key: u05_l01_q02_metaphor_or_literal
type: multiple-choice
prompt: "Which sentence uses metaphor?"
choices:
  - "His promise was a thin bridge over a deep river."
  - "He crossed the bridge before sunset."
  - "The river ran below the stones."
  - "The bridge had three arches."
correctAnswer: "His promise was a thin bridge over a deep river."
explanation: "The promise is described as a bridge to suggest it is risky but connects two sides."
hint: "Look for one thing being described as another thing."
questionGoal: "Recognize metaphor in a short literary sentence."
misconception: "Confusing literal description with figurative comparison."
```

```question
key: u05_l01_q03_image_to_idea
type: match-pairs
prompt: "Match each image-in-context to the idea it most likely suggests."
pairs:
  - left: "A lamp shaking after a threat in a windless room"
    right: "Hidden fear"
  - left: "A gate opening at dawn after a long night"
    right: "New possibility"
  - left: "A cup passed from enemy to enemy after a battle"
    right: "Unexpected reconciliation"
  - left: "A crown too heavy for the young ruler to lift"
    right: "The burden of rule"
explanation: "Images suggest ideas through the context around them, not through a fixed code."
hint: "Use the situation around each image, not just the object by itself."
questionGoal: "Connect concrete images to interpretive ideas."
misconception: "Assuming images have no meaning beyond literal objects."
```

```question
key: u05_l01_q04_best_evidence_for_image
type: passage-question
prompt: "Read the passage and choose the evidence that best supports the interpretation."
passageTitle: "The Cracked Lyre"
passage: |
  After the quarrel, the hall stood silent. The old lyre hung on the wall with one string snapped, and every footstep seemed to strike the broken note again.
question: "Interpretation: The quarrel leaves a feeling of damaged harmony. Which evidence best supports this?"
choices:
  - "one string snapped"
  - "the wall"
  - "old"
  - "every footstep"
correctAnswer: "one string snapped"
explanation: "The snapped string is the clearest image of broken harmony."
hint: "Choose the image that directly suggests damage to music."
questionGoal: "Select evidence for an imagery interpretation."
misconception: "Choosing any nearby word instead of the image that supports the claim."
```

```question
key: u05_l01_q05_complete_image_frame
type: multi-blank-cloze
prompt: "Complete the imagery interpretation."
parts:
  - "The snapped string creates an image of "
  - ". This supports the idea that the household's peace has been "
  - "."
blanks:
  - correctAnswer: "broken harmony"
    acceptedAnswers:
      - "broken harmony"
      - "damage"
    choices:
      - "broken harmony"
      - "easy travel"
      - "comic disguise"
  - correctAnswer: "damaged"
    acceptedAnswers:
      - "damaged"
      - "broken"
    choices:
      - "damaged"
      - "polished"
      - "hidden"
explanation: "The frame connects the image to the passage's emotional meaning."
hint: "Use the musical image and the effect of the quarrel."
questionGoal: "Explain how imagery supports an idea."
misconception: "Naming an image without explaining its effect."
```

```question
key: u05_l01_q06_overfixed_image
type: multiple-choice
prompt: "Which interpretation is too fixed or unsupported?"
choices:
  - "A snapped lyre string always means a family will go to war."
  - "The snapped string suggests broken harmony in this passage."
  - "The hall's silence helps create a tense mood."
  - "The image connects sound and conflict."
correctAnswer: "A snapped lyre string always means a family will go to war."
explanation: "Images get meaning from context; they do not have one automatic meaning in every passage."
hint: "Watch for words like 'always' when the passage only supports this case."
questionGoal: "Reject overfixed imagery interpretation."
misconception: "Treating figurative language as a code with one universal answer."
```

### Lesson 2: Allusion And Symbol Readiness

```question
key: u05_l02_q01_allusion_clue
type: passage-question
prompt: "Read the passage and background note, then choose the best answer."
passageTitle: "The Thread"
passage: |
  Background note: Some classical stories use a guiding thread to suggest a path through confusion.

  When the council began arguing in circles, Tessa placed a red thread across the table. "Follow one question at a time," she said, "or we will lose ourselves before sunset."
question: "How does the thread allusion work in this passage?"
choices:
  - "It suggests a way through confusion by focusing the council's thinking."
  - "It proves the council is inside a real maze."
  - "It shows Tessa wants to sew a cloak."
  - "It means all red objects are magical."
correctAnswer: "It suggests a way through confusion by focusing the council's thinking."
explanation: "The background note and Tessa's words connect the thread to finding a path through confusion."
hint: "Use both the note and what Tessa says."
questionGoal: "Use context clues to interpret an allusion."
misconception: "Taking an allusion literally or treating it as decorative."
```

```question
key: u05_l02_q02_symbol_ready_object
type: multiple-choice
prompt: "Which detail makes the red thread symbol-ready in the passage?"
choices:
  - "Tessa uses it while telling the council to follow one question at a time."
  - "The thread is red."
  - "The council meets at a table."
  - "Sunset is mentioned."
correctAnswer: "Tessa uses it while telling the council to follow one question at a time."
explanation: "The object gains meaning because the passage connects it to guidance through confusion."
hint: "Choose the detail that links the object to an idea."
questionGoal: "Identify contextual support for symbol readiness."
misconception: "Assuming any object is symbolic just because it appears."
```

```question
key: u05_l02_q03_allusion_symbol_terms
type: match-pairs
prompt: "Match each term to the best description."
pairs:
  - left: "Allusion"
    right: "A meaningful reference to another story or idea"
  - left: "Symbol readiness"
    right: "An object gains meaning through context and repetition"
  - left: "Context clue"
    right: "A passage detail that helps interpretation"
  - left: "Overreach"
    right: "A claim that goes beyond the evidence"
explanation: "Allusion and symbol readiness both require clues from the passage or provided background."
hint: "Match each term to its reading job."
questionGoal: "Clarify allusion and symbol-readiness vocabulary."
misconception: "Using literary terms without understanding how they are supported."
```

```question
key: u05_l02_q04_symbol_overreach
type: multiple-choice
prompt: "Which claim overreaches about the thread?"
choices:
  - "The thread proves Tessa has magical power over the council."
  - "The thread suggests guidance through a confusing debate."
  - "The thread works with Tessa's advice to follow one question."
  - "The thread alludes to finding a path through confusion."
correctAnswer: "The thread proves Tessa has magical power over the council."
explanation: "The passage does not show magic; it shows an object used to focus thought."
hint: "Reject the claim that invents a power the passage never gives."
questionGoal: "Reject unsupported symbol or allusion overreach."
misconception: "Turning a meaningful object into an unsupported magical explanation."
```

```question
key: u05_l02_q05_complete_allusion_frame
type: multi-blank-cloze
prompt: "Complete the allusion frame."
parts:
  - "The thread alludes to finding a path through "
  - ". In the passage, Tessa uses it to help the council follow one "
  - " at a time."
blanks:
  - correctAnswer: "confusion"
    acceptedAnswers:
      - "confusion"
    choices:
      - "confusion"
      - "victory"
      - "hospitality"
  - correctAnswer: "question"
    acceptedAnswers:
      - "question"
    choices:
      - "question"
      - "horse"
      - "song"
explanation: "The allusion connects the background idea to the council's problem."
hint: "Use the background note and Tessa's words."
questionGoal: "Connect allusion background to passage meaning."
misconception: "Leaving the allusion disconnected from the actual passage."
```

```question
key: u05_l02_q06_best_context_needed
type: multiple-choice
prompt: "What context is enough to understand the thread allusion in this lesson?"
choices:
  - "A guiding thread can suggest a path through confusion."
  - "The complete history of every maze story in Greek literature."
  - "The exact dye used to make ancient red thread."
  - "A full biography of Tessa's family."
correctAnswer: "A guiding thread can suggest a path through confusion."
explanation: "Just-in-time context should be enough to interpret the passage without becoming a lecture."
hint: "Choose the context that directly helps with the passage."
questionGoal: "Identify useful, limited context for allusion."
misconception: "Believing allusion work requires a large background dump."
```

### Lesson 3: Lyric Speaker, Repetition, And Structure

```question
key: u05_l03_q01_identify_speaker
type: passage-question
prompt: "Read the lyric-like passage and identify the speaker."
passageTitle: "At The Harbor"
passage: |
  I counted the oars at dawn.
  I counted them again at dusk.
  Still the one I love
  has not crossed the harbor.
question: "Who is the speaker most likely to be?"
choices:
  - "Someone waiting for a loved person to return by boat"
  - "The author explaining how to build oars"
  - "The harbor itself counting ships"
  - "A soldier giving orders to rowers"
correctAnswer: "Someone waiting for a loved person to return by boat"
explanation: "The speaker says 'I' and speaks of the one loved who has not returned."
hint: "Use the words 'I' and 'the one I love.'"
questionGoal: "Distinguish the speaker in a lyric-like passage."
misconception: "Assuming the speaker is automatically the author or an object."
```

```question
key: u05_l03_q02_repetition_effect
type: multiple-choice
prompt: "What is the effect of repeating 'I counted'?"
choices:
  - "It shows the speaker's waiting and anxious attention."
  - "It proves the speaker dislikes numbers."
  - "It makes the passage a comedy."
  - "It shows the loved person has already returned."
correctAnswer: "It shows the speaker's waiting and anxious attention."
explanation: "The repeated counting at dawn and dusk shows ongoing waiting."
hint: "Ask what the repeated action reveals about the speaker."
questionGoal: "Explain the effect of repetition."
misconception: "Treating repetition as accidental or meaningless."
```

```question
key: u05_l03_q03_structure_sequence
type: order-items
prompt: "Put the passage's movement in order."
items:
  - "The speaker says the loved person has not crossed the harbor."
  - "The speaker counts at dawn."
  - "The speaker counts again at dusk."
  - "The speaker reveals the waiting is personal."
correctOrder:
  - "The speaker counts at dawn."
  - "The speaker counts again at dusk."
  - "The speaker reveals the waiting is personal."
  - "The speaker says the loved person has not crossed the harbor."
explanation: "The structure moves from repeated action to personal loss or longing."
hint: "Follow the order of the lines."
questionGoal: "Track how line order shapes meaning."
misconception: "Ignoring the structure of a compact passage."
```

```question
key: u05_l03_q04_speaker_author_distinction
type: fill-blank
prompt: "Complete the distinction."
sentenceBefore: "In a lyric-like passage, the"
sentenceAfter: "is the voice inside the poem-like text, not automatically the author."
choices:
  - "speaker"
  - "catalog"
  - "bridge"
  - "translation"
correctAnswer: "speaker"
explanation: "The speaker is the voice we hear in the passage."
hint: "Choose the term for the voice inside the text."
questionGoal: "Name the speaker/author distinction."
misconception: "Equating speaker and author automatically."
```

```question
key: u05_l03_q05_best_theme_lyric
type: passage-question
prompt: "Read the passage and choose the best theme statement."
passageTitle: "At The Harbor"
passage: |
  I counted the oars at dawn.
  I counted them again at dusk.
  Still the one I love
  has not crossed the harbor.
question: "Which theme statement best fits?"
choices:
  - "Waiting can make ordinary details feel painfully important."
  - "Oars are always counted twice a day."
  - "Harbors are safer at dusk than dawn."
  - "Love makes people forget numbers."
correctAnswer: "Waiting can make ordinary details feel painfully important."
explanation: "The repeated counting shows how waiting gives emotional weight to ordinary oars."
hint: "Connect the repeated action to the speaker's feeling."
questionGoal: "Infer theme from speaker, repetition, and structure."
misconception: "Choosing a literal fact instead of an idea supported by form."
```

```question
key: u05_l03_q06_match_form_features
type: match-pairs
prompt: "Match each feature to what it helps reveal."
pairs:
  - left: "First-person 'I'"
    right: "The speaker's personal point of view"
  - left: "Repeating 'I counted'"
    right: "Anxious waiting"
  - left: "Dawn and dusk"
    right: "Time passing"
  - left: "The final line"
    right: "The reason for the speaker's longing"
explanation: "In compact passages, small form choices carry meaning."
hint: "Ask what each feature makes you notice."
questionGoal: "Connect lyric-like form features to meaning."
misconception: "Reading compact form as if line choices do not matter."
```

### Lesson 4: Wisdom Sayings, Speeches, And Dialogues

```question
key: u05_l04_q01_wisdom_question
type: passage-question
prompt: "Read the saying and choose the ethical question it raises."
passageTitle: "A Saying At The Gate"
passage: |
  The elder said, "A city with high walls but no just judges is already open to its enemies."
question: "What ethical question does the saying raise?"
choices:
  - "What truly protects a community: strength alone or justice?"
  - "How tall should city walls be?"
  - "Which enemy will arrive first?"
  - "What color are judges' robes?"
correctAnswer: "What truly protects a community: strength alone or justice?"
explanation: "The saying contrasts physical walls with justice as a source of protection."
hint: "Look for the contrast between walls and judges."
questionGoal: "Identify the ethical question in a wisdom saying."
misconception: "Reading a wisdom saying only as literal advice."
```

```question
key: u05_l04_q02_speech_claim
type: multiple-choice
prompt: "Which claim best interprets the saying?"
choices:
  - "The elder suggests that justice is part of a city's real defense."
  - "The elder says walls are never useful."
  - "The elder thinks judges should fight on the walls."
  - "The elder is only describing architecture."
correctAnswer: "The elder suggests that justice is part of a city's real defense."
explanation: "The saying uses walls to make a point about justice."
hint: "Do not take the wall image only literally."
questionGoal: "Interpret a compact wisdom saying."
misconception: "Missing the figurative or ethical force of a short statement."
```

```question
key: u05_l04_q03_dialogue_positions
type: match-pairs
prompt: "Match each speaker to the position shown."
pairs:
  - left: "Elder: 'The law must protect the weak first.'"
    right: "Justice should guard vulnerable people."
  - left: "Captain: 'The law must keep order first.'"
    right: "Stability is the first duty."
  - left: "Child: 'What is order worth if no one is safe?'"
    right: "Order without protection is questioned."
  - left: "Judge: 'A law that no one trusts will not stand.'"
    right: "Trust matters for rule."
explanation: "Dialogue can present different positions in an ethical debate."
hint: "Read each line as a claim about what matters most."
questionGoal: "Identify positions in a dialogue."
misconception: "Treating dialogue as conversation without argument."
```

```question
key: u05_l04_q04_dialogue_builder_reasoning
type: dialogue-builder
prompt: "Choose the response that best continues the ethical dialogue."
turns:
  - speaker: "Captain"
    line: "High walls keep enemies away."
  - speaker: "Elder"
    line: "Only if justice keeps anger from growing inside them."
choices:
  - "So a city must guard both its gates and its fairness."
  - "Then walls should be painted red."
  - "No one should ever build a wall."
  - "The harbor has counted the oars twice."
correctAnswer: "So a city must guard both its gates and its fairness."
explanation: "The response follows the dialogue's reasoning about strength and justice."
hint: "Choose the line that combines physical defense and justice."
questionGoal: "Continue a dialogue according to its ethical reasoning."
misconception: "Choosing a line that matches a word but not the argument."
```

```question
key: u05_l04_q05_compact_form
type: multiple-choice
prompt: "Why can a short saying still be complex?"
choices:
  - "It can compress a debate about values into a few memorable words."
  - "It is always easier than a long passage."
  - "It never needs evidence."
  - "It has no speaker or audience."
correctAnswer: "It can compress a debate about values into a few memorable words."
explanation: "Short forms can carry large questions through contrast, image, and implication."
hint: "Think about what the wall-and-justice saying does in one sentence."
questionGoal: "Understand compact forms as meaningful literary forms."
misconception: "Assuming short texts are automatically simple."
```

```question
key: u05_l04_q06_complete_wisdom_frame
type: multi-blank-cloze
prompt: "Complete the interpretation frame."
parts:
  - "The saying contrasts high "
  - " with just "
  - " to argue that protection requires more than strength."
blanks:
  - correctAnswer: "walls"
    acceptedAnswers:
      - "walls"
    choices:
      - "walls"
      - "lyres"
      - "threads"
  - correctAnswer: "judges"
    acceptedAnswers:
      - "judges"
    choices:
      - "judges"
      - "sailors"
      - "shadows"
explanation: "The frame names the contrast that makes the saying meaningful."
hint: "Use the two images in the elder's saying."
questionGoal: "Explain the structure of a wisdom saying."
misconception: "Missing the contrast that carries the ethical claim."
```

## Unit 6: Transfer Across Classical Texts

### Lesson 1: Choose The Reading Move

```question
key: u06_l01_q01_reading_move_match
type: match-pairs
prompt: "Match each passage feature to the best first reading move."
pairs:
  - left: "A passage with two different versions of the same event"
    right: "Compare by one criterion"
  - left: "A passage with an unfamiliar custom explained in a note"
    right: "Use context carefully"
  - left: "A passage with a repeated image"
    right: "Analyze imagery or symbol readiness"
  - left: "A passage with a serious choice and consequence"
    right: "Consider tragic conflict"
explanation: "Transfer begins by choosing a reading move that fits the passage."
hint: "Ask what feature the passage is asking you to notice first."
questionGoal: "Match passage features to analytical routines."
misconception: "Using the newest routine for every passage."
```

```question
key: u06_l01_q02_best_first_move_summary
type: passage-question
prompt: "Read the passage and choose the best first move."
passageTitle: "The Broken Oath"
passage: |
  Kella promised to carry the treaty before moonrise. On the road, she found her old enemy wounded under a cedar tree. She stopped, tore her cloak for a bandage, and watched the moon climb above the hills.
question: "What is the best first reading move?"
choices:
  - "Summarize the choice and consequence before deciding on a theme."
  - "Assume the cloak is a secret symbol of betrayal."
  - "Compare this to another version that is not provided."
  - "Ignore Kella's promise because the tree is more interesting."
correctAnswer: "Summarize the choice and consequence before deciding on a theme."
explanation: "The passage centers on a choice under pressure, so summary and consequence should come before interpretation."
hint: "Start by making sure you know what Kella chooses."
questionGoal: "Choose a useful first reading move for a new passage."
misconception: "Jumping to symbolism or comparison before understanding the passage."
```

```question
key: u06_l01_q03_reading_process_order
type: order-items
prompt: "Put the transfer reading process in a useful order."
items:
  - "Choose the reading move the task needs."
  - "Read for the gist of what happens or is said."
  - "Use evidence to support the answer."
  - "Check for overreach or unsupported claims."
correctOrder:
  - "Read for the gist of what happens or is said."
  - "Choose the reading move the task needs."
  - "Use evidence to support the answer."
  - "Check for overreach or unsupported claims."
explanation: "You need the gist before choosing and applying a reading move."
hint: "Begin with basic comprehension, end with checking."
questionGoal: "Sequence a general transfer routine."
misconception: "Applying terms before understanding the passage."
```

```question
key: u06_l01_q04_best_move_for_pair
type: multiple-choice
prompt: "A task gives two short translations of the same speech and asks how the word 'begged' changes the speaker. Which reading move fits best?"
choices:
  - "Compare wording, tone, and emphasis"
  - "Identify a journey departure"
  - "Count the number of lines only"
  - "Treat the word as a fixed symbol"
correctAnswer: "Compare wording, tone, and emphasis"
explanation: "The task asks about a word change across translations, so version comparison and tone fit best."
hint: "Look for the clue that there are two translations."
questionGoal: "Choose comparison routine for paired translation wording."
misconception: "Choosing a familiar but irrelevant routine."
```

```question
key: u06_l01_q05_context_move
type: multiple-choice
prompt: "A passage includes this note: 'Guest-friendship was treated as a serious duty in many ancient stories.' What should you do with it?"
choices:
  - "Use it to clarify hospitality details, then check the passage evidence."
  - "Assume every guest is secretly divine."
  - "Ignore the passage because the note explains everything."
  - "Use it to prove the story is a comedy."
correctAnswer: "Use it to clarify hospitality details, then check the passage evidence."
explanation: "Context should help interpret the passage, not replace it or create unsupported claims."
hint: "Use the note like a guide, not as the whole answer."
questionGoal: "Choose careful context use in a transfer setting."
misconception: "Overusing or ignoring context."
```

```question
key: u06_l01_q06_best_move_for_language
type: passage-question
prompt: "Read the passage and choose the best reading move."
passageTitle: "Ashes"
passage: |
  The queen held the treaty like a coal that still remembered fire.
question: "Which reading move fits best first?"
choices:
  - "Analyze the metaphor and what it suggests about the treaty."
  - "Identify a comic disguise."
  - "Compare two versions of the line."
  - "List every event in the plot."
correctAnswer: "Analyze the metaphor and what it suggests about the treaty."
explanation: "The sentence uses metaphor: the treaty is described as a coal that still carries danger or heat."
hint: "Notice one thing being described as another."
questionGoal: "Choose close reading of metaphor for a language-heavy passage."
misconception: "Missing figurative language and applying an unrelated routine."
```

### Lesson 2: Build A Supported Interpretation

```question
key: u06_l02_q01_best_supported_claim
type: passage-question
prompt: "Read the passage and choose the best supported claim."
passageTitle: "The Broken Oath"
passage: |
  Kella promised to carry the treaty before moonrise. On the road, she found her old enemy wounded under a cedar tree. She stopped, tore her cloak for a bandage, and watched the moon climb above the hills.
question: "Which claim is best supported?"
choices:
  - "Kella's mercy conflicts with her duty to deliver the treaty on time."
  - "Kella never cared about the treaty."
  - "The cedar tree controls Kella's choices."
  - "Kella wants her enemy to suffer."
correctAnswer: "Kella's mercy conflicts with her duty to deliver the treaty on time."
explanation: "The passage shows her promise, the wounded enemy, her act of mercy, and the rising moon."
hint: "Choose the claim that includes both the oath and the rescue."
questionGoal: "Choose a supported interpretation of a new passage."
misconception: "Ignoring one side of a conflict or inventing motive."
```

```question
key: u06_l02_q02_best_evidence
type: passage-question
prompt: "Read the passage and choose the best evidence."
passageTitle: "The Broken Oath"
passage: |
  Kella promised to carry the treaty before moonrise. On the road, she found her old enemy wounded under a cedar tree. She stopped, tore her cloak for a bandage, and watched the moon climb above the hills.
question: "Which evidence best supports the claim that Kella risks failing her duty?"
choices:
  - "watched the moon climb above the hills"
  - "under a cedar tree"
  - "tore her cloak"
  - "old enemy"
correctAnswer: "watched the moon climb above the hills"
explanation: "The rising moon matters because Kella promised to deliver the treaty before moonrise."
hint: "Find the detail connected to the deadline."
questionGoal: "Select evidence that supports a duty-and-delay claim."
misconception: "Choosing dramatic evidence that supports a different part of the passage."
```

```question
key: u06_l02_q03_complete_interpretation
type: multi-blank-cloze
prompt: "Complete the supported interpretation."
parts:
  - "Claim: Kella faces a conflict between "
  - " and duty. Evidence: she helps her old enemy while the "
  - " rises. Explanation: the rising moon matters because she promised to deliver the treaty before moonrise."
blanks:
  - correctAnswer: "mercy"
    acceptedAnswers:
      - "mercy"
      - "compassion"
    choices:
      - "mercy"
      - "boasting"
      - "translation"
  - correctAnswer: "moon"
    acceptedAnswers:
      - "moon"
    choices:
      - "moon"
      - "gate"
      - "lyre"
explanation: "The frame combines claim, evidence, and explanation."
hint: "Use the value behind helping and the detail tied to the deadline."
questionGoal: "Build a constrained supported interpretation."
misconception: "Leaving evidence or explanation disconnected from the claim."
```

```question
key: u06_l02_q04_explanation_choice
type: multiple-choice
prompt: "Claim: Kella's mercy has a cost. Evidence: She tears her cloak for a bandage while the moon rises. Which explanation is strongest?"
choices:
  - "The bandage helps her enemy, but the rising moon shows she may miss the treaty deadline."
  - "Cloaks are useful pieces of clothing."
  - "The moon is bright at night."
  - "Kella probably dislikes treaties."
correctAnswer: "The bandage helps her enemy, but the rising moon shows she may miss the treaty deadline."
explanation: "The explanation connects both the merciful act and the cost."
hint: "Explain both details, not just one."
questionGoal: "Choose an explanation that connects evidence to a claim."
misconception: "Explaining a detail literally without connecting it to interpretation."
```

```question
key: u06_l02_q05_weak_part
type: multiple-choice
prompt: "What is weak about this response? 'Kella is kind. The passage has a cedar tree.'"
choices:
  - "The evidence does not support the claim about kindness."
  - "The claim is too long."
  - "The response uses too much evidence."
  - "The cedar tree proves the whole theme."
correctAnswer: "The evidence does not support the claim about kindness."
explanation: "A better evidence choice would mention helping the wounded enemy."
hint: "Ask whether the evidence proves the claim."
questionGoal: "Identify weak evidence in a sample interpretation."
misconception: "Believing any passage detail can support any claim."
```

```question
key: u06_l02_q06_repair_weak_response
type: error-correction
prompt: "Revise the weak response so the evidence directly supports the claim about mercy."
sentence: "Kella is merciful because the cedar tree is under the enemy."
acceptedAnswers:
  - "Kella is merciful because she tears her cloak to bandage her wounded enemy."
  - "Kella shows mercy because she tears her cloak to bandage her wounded enemy."
explanation: "The corrected response uses evidence that directly supports mercy."
hint: "Use the action Kella takes for the enemy."
questionGoal: "Repair a weak evidence explanation."
misconception: "Using irrelevant details as support."
```

### Lesson 3: Compare, Correct, And Transfer

```question
key: u06_l03_q01_mistake_type_match
type: match-pairs
prompt: "Match each weak response to the mistake type."
pairs:
  - left: "This passage is about loyalty."
    right: "Topic word only"
  - left: "The cloak means Kella will become queen because cloaks always mean power."
    right: "Symbol overreach"
  - left: "Kella is merciful. Evidence: cedar tree."
    right: "Weak evidence"
  - left: "The context note proves everything, so the passage details do not matter."
    right: "Context overreach"
explanation: "Final transfer includes recognizing common analytical mistakes."
hint: "Ask what is missing or unsupported in each weak response."
questionGoal: "Classify common interpretation errors."
misconception: "Mistaking literary vocabulary for strong analysis."
```

```question
key: u06_l03_q02_compare_interpretations
type: passage-question
prompt: "Read the passage and choose the stronger interpretation."
passageTitle: "The Broken Oath"
passage: |
  Kella promised to carry the treaty before moonrise. On the road, she found her old enemy wounded under a cedar tree. She stopped, tore her cloak for a bandage, and watched the moon climb above the hills.
question: "Which interpretation is stronger?"
choices:
  - "Kella's act of mercy is costly because helping her enemy may make her miss the deadline."
  - "Kella is near a cedar tree, so the passage is about trees."
  - "Kella breaks every promise because she is evil."
  - "The treaty is unimportant because the passage mentions a cloak."
correctAnswer: "Kella's act of mercy is costly because helping her enemy may make her miss the deadline."
explanation: "The strong interpretation uses the central conflict and evidence."
hint: "Choose the answer that explains the oath, the mercy, and the moonrise."
questionGoal: "Select a supported transfer interpretation."
misconception: "Choosing literal or exaggerated interpretations over supported analysis."
```

```question
key: u06_l03_q03_paired_transfer
type: passage-question
prompt: "Read two versions and choose the best comparison."
passageTitle: "Two Versions Of Kella"
passage: |
  Version A: Kella stopped because even an enemy's pain was still pain.

  Version B: Kella stopped because the watching soldiers would praise her mercy.
question: "Which comparison is best supported?"
choices:
  - "Version A emphasizes compassion; Version B emphasizes reputation."
  - "Both versions give Kella the same motive."
  - "Version B proves Kella is in a comedy."
  - "Version A is wrong because enemies cannot feel pain."
correctAnswer: "Version A emphasizes compassion; Version B emphasizes reputation."
explanation: "The versions share the same action but give different motives."
hint: "Compare why Kella stops in each version."
questionGoal: "Transfer version-comparison skills to a new pair."
misconception: "Treating same action as same interpretation."
```

```question
key: u06_l03_q04_correct_context_overreach
type: error-correction
prompt: "Revise the context-overreach so the context note helps interpretation but passage evidence remains central."
sentence: "The context note says enemies mattered in ancient stories, so we do not need evidence from the passage."
acceptedAnswers:
  - "The context note helps explain why helping an enemy may be surprising, but Kella's torn cloak and the rising moon provide the evidence."
  - "The context note helps explain why helping an enemy is surprising, but Kella's torn cloak and the rising moon are the passage evidence."
explanation: "The corrected response uses context as support while keeping passage evidence central."
hint: "Keep both context and passage evidence in the corrected sentence."
questionGoal: "Repair context overreach in a transfer response."
misconception: "Letting context replace textual evidence."
```

```question
key: u06_l03_q05_best_final_evidence
type: multiple-choice
prompt: "Claim: Kella's choice creates a conflict between mercy and duty. Which pair of details best supports the claim?"
choices:
  - "She helps her wounded enemy, and the moon rises after her treaty deadline was named."
  - "There is a cedar tree, and Kella has a cloak."
  - "The road exists, and the treaty is a document."
  - "The enemy is old, and the hills are far away."
correctAnswer: "She helps her wounded enemy, and the moon rises after her treaty deadline was named."
explanation: "The first detail supports mercy; the second supports the duty deadline."
hint: "Choose one detail for each side of the conflict."
questionGoal: "Select paired evidence for a complex claim."
misconception: "Choosing two details that are true but not connected to the claim."
```

```question
key: u06_l03_q06_final_transfer_process
type: order-items
prompt: "Put the final transfer response in order."
items:
  - "Explain how the evidence supports the claim."
  - "Summarize the central choice."
  - "Choose evidence for both sides of the conflict."
  - "State a focused interpretation."
correctOrder:
  - "Summarize the central choice."
  - "State a focused interpretation."
  - "Choose evidence for both sides of the conflict."
  - "Explain how the evidence supports the claim."
explanation: "A strong transfer response moves from understanding to claim, evidence, and explanation."
hint: "Start with what happens before making the interpretation."
questionGoal: "Sequence a complete supported transfer response."
misconception: "Skipping summary or explanation in final transfer tasks."
```
