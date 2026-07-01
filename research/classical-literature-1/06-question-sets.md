# Classical Literature 1 Question Sets

Sources: accepted Classical Literature 1 blueprint, course map, unit design briefs, and lesson briefs in `research/classical-literature-1/`.

## Unit 1: Fables, Morals, And Story Elements

### Lesson 1: Retell The Fable In Order

Students practice retelling the main events of a compact fable in beginning-middle-end order.

```question
key: u01_l01_q01_crow_order
type: order-items
prompt: "Put the events from the fable of the thirsty crow in order."
items:
  - "The crow drops pebbles into the pitcher."
  - "The crow finds a pitcher with water at the bottom."
  - "The water rises high enough to drink."
  - "The crow is thirsty and searches for water."
  - "The crow drinks the water."
correctOrder:
  - "The crow is thirsty and searches for water."
  - "The crow finds a pitcher with water at the bottom."
  - "The crow drops pebbles into the pitcher."
  - "The water rises high enough to drink."
  - "The crow drinks the water."
explanation: "A retell follows the main events in order, from the crow's problem to the solution."
hint: "Start with the problem, then look for the action that solves it."
questionGoal: "Check whether the student can sequence a familiar fable."
misconception: "Remembering isolated details but not the order of events."
```

```question
key: u01_l01_q02_best_retell
type: multiple-choice
prompt: "Which sentence best retells the fable of the crow and the pitcher?"
choices:
  - "A thirsty crow found low water, dropped in pebbles, and drank when the water rose."
  - "A crow liked shiny pebbles and kept them beside a pitcher."
  - "A pitcher broke because a bird pushed too hard."
  - "A crow flew past a farm and saw many animals."
correctAnswer: "A thirsty crow found low water, dropped in pebbles, and drank when the water rose."
explanation: "The best retell includes the problem, the main action, and the outcome."
hint: "Look for the choice that tells what happened from problem to ending."
questionGoal: "Identify a concise complete retell."
misconception: "Choosing a detail or invented event instead of the whole main action."
```

```question
key: u01_l01_q03_hare_tortoise_sequence
type: passage-question
prompt: "Read the short fable and answer."
passageTitle: "The Slow Race"
passage: |
  Hare laughed because Tortoise walked slowly. Tortoise asked for a race. Hare ran far ahead and stopped to rest. Tortoise kept walking. When Hare woke up, Tortoise was already near the finish line.
question: "What happened in the middle of the fable?"
choices:
  - "Hare stopped to rest after running ahead."
  - "Tortoise crossed the finish line first."
  - "Hare and Tortoise became birds."
  - "Tortoise laughed at Hare before the race."
correctAnswer: "Hare stopped to rest after running ahead."
explanation: "The middle event is the action that comes after the race begins and before the ending."
hint: "Ask what changed after the beginning but before the finish."
questionGoal: "Locate a middle event in a short fable."
misconception: "Confusing the ending with the middle event."
```

```question
key: u01_l01_q04_retell_frame
type: fill-blank
prompt: "Complete the retell frame."
sentenceBefore: "A strong retell includes the beginning, middle, and"
sentenceAfter: "."
choices:
  - "title"
  - "ending"
  - "author"
  - "rhyme"
correctAnswer: "ending"
explanation: "A retell should include the main events from beginning through ending."
hint: "What part tells how the story comes out?"
questionGoal: "Recall the three-part retell frame."
misconception: "Treating retell as a list of labels instead of event order."
```

```question
key: u01_l01_q05_retell_parts
type: match-pairs
prompt: "Match each retell part to its job."
pairs:
  - left: "Beginning"
    right: "Introduces the problem or situation"
  - left: "Middle"
    right: "Shows the main action or change"
  - left: "Ending"
    right: "Tells the outcome"
  - left: "Key detail"
    right: "Explains why the outcome makes sense"
explanation: "Each part has a different job in helping a listener follow the fable."
hint: "Think about what a listener needs first, next, and last."
questionGoal: "Connect retell terms to their functions."
misconception: "Using beginning, middle, and ending as empty labels."
```

```question
key: u01_l01_q06_lion_mouse_retell
type: constructed-response
prompt: "Retell this fable in one or two sentences: A lion spared a mouse. Later the lion was caught in a net. The mouse chewed the ropes and freed the lion."
minWords: 12
sampleAnswer: "A lion let a mouse go, and later the mouse helped by chewing the net that trapped the lion."
checklist:
  - "Include the lion sparing the mouse"
  - "Include the lion trapped in the net"
  - "Include the mouse freeing the lion"
explanation: "A good retell keeps the important events in order and leaves out extra invented details."
hint: "Use first, later, and finally to keep the events in order."
questionGoal: "Produce a brief ordered retell from given events."
misconception: "Leaving out the event that makes the ending make sense."
```

### Lesson 2: Characters, Settings, Problems, And Outcomes

```question
key: u01_l02_q01_setting_identify
type: passage-question
prompt: "Read the fable setup and answer."
passageTitle: "The Goat And The Well"
passage: |
  A fox was trapped at the bottom of a deep well. A thirsty goat came to the well and looked down. The fox called, "Come in! The water is sweet."
question: "What is the setting at the beginning of the fable?"
choices:
  - "A deep well"
  - "A mountain cave"
  - "A king's hall"
  - "A busy market"
correctAnswer: "A deep well"
explanation: "The setting is where the story is happening. This fable begins at a well."
hint: "Look for where the characters are."
questionGoal: "Identify setting from a short fable passage."
misconception: "Choosing a character or event instead of the place."
```

```question
key: u01_l02_q02_elements_match
type: match-pairs
prompt: "Match each story element to the question it answers."
pairs:
  - left: "Character"
    right: "Who is in the story?"
  - left: "Setting"
    right: "Where and when does it happen?"
  - left: "Problem"
    right: "What trouble needs to be solved?"
  - left: "Outcome"
    right: "How does it turn out?"
explanation: "Story elements help a reader ask different questions about the same story."
hint: "Use who, where, trouble, and ending as clues."
questionGoal: "Associate story elements with their guiding questions."
misconception: "Mixing up element labels because they all belong to one story."
```

```question
key: u01_l02_q03_complete_story_chart
type: multi-blank-cloze
prompt: "Complete the story chart for this fable: A dog carried meat across a bridge. He saw his reflection in the water and snapped at it. He dropped his own meat."
parts:
  - "Character: "
  - "; Setting: "
  - "; Problem: the dog wants "
  - "."
blanks:
  - correctAnswer: "dog"
    acceptedAnswers:
      - "dog"
      - "the dog"
  - correctAnswer: "bridge"
    acceptedAnswers:
      - "bridge"
      - "a bridge"
      - "near water"
  - correctAnswer: "more meat"
    acceptedAnswers:
      - "more meat"
      - "the other meat"
      - "the reflection's meat"
explanation: "The chart names who is there, where it happens, and what the dog wants."
hint: "Use words from the fable. The dog already has meat but wants what he sees."
questionGoal: "Fill story-element information from a short fable."
misconception: "Confusing the problem with the final outcome."
```

```question
key: u01_l02_q04_problem_or_outcome
type: multiple-choice
prompt: "In the dog-and-reflection fable, which detail is the outcome?"
choices:
  - "The dog drops his own meat."
  - "The dog carries meat across a bridge."
  - "The dog sees water."
  - "The dog is an animal."
correctAnswer: "The dog drops his own meat."
explanation: "The outcome is how the action turns out at the end."
hint: "Ask which choice tells what happens because of the dog's action."
questionGoal: "Distinguish outcome from setup details."
misconception: "Choosing any remembered detail as the outcome."
```

```question
key: u01_l02_q05_element_vocabulary
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "The"
sentenceAfter: "is the trouble or challenge in the story."
choices:
  - "problem"
  - "setting"
  - "title"
  - "rhyme"
correctAnswer: "problem"
explanation: "The problem is the trouble or challenge that drives the story."
hint: "Which word means something needs to be solved?"
questionGoal: "Use the term problem accurately."
misconception: "Treating all story labels as interchangeable."
```

```question
key: u01_l02_q06_story_elements_explain
type: constructed-response
prompt: "In one sentence, name the character and problem in this fable: A mouse chewed a rope to free a trapped lion."
minWords: 8
sampleAnswer: "The characters are the mouse and lion, and the problem is that the lion is trapped."
checklist:
  - "Name the mouse or lion as a character"
  - "Say that the lion is trapped"
explanation: "Characters are who is in the story; the problem is the trouble that must be solved."
hint: "Ask who is in the fable and what trouble they face."
questionGoal: "Produce a brief story-element identification."
misconception: "Naming the helpful action as the problem instead of the trouble."
```

### Lesson 3: Choices Lead To Consequences

```question
key: u01_l03_q01_choice_consequence_match
type: match-pairs
prompt: "Match each fable choice to its consequence."
pairs:
  - left: "The boy cries wolf when there is no wolf."
    right: "People stop believing him."
  - left: "The hare stops to nap during the race."
    right: "The tortoise reaches the finish first."
  - left: "The dog snaps at his reflection."
    right: "He loses the meat he had."
  - left: "The crow drops pebbles in the pitcher."
    right: "The water rises."
explanation: "A consequence is what happens because of a choice or action."
hint: "Use because: because the character did this, what happened next?"
questionGoal: "Connect character actions to consequences."
misconception: "Treating story outcomes as random events."
```

```question
key: u01_l03_q02_boy_who_cried_wolf
type: passage-question
prompt: "Read the fable and answer."
passageTitle: "The False Alarm"
passage: |
  A shepherd boy shouted, "Wolf!" when no wolf was there. The villagers ran to help him, and he laughed. He did the same thing again. Later, a real wolf came, but the villagers did not believe his cry.
question: "Which choice caused the villagers to stop believing the boy?"
choices:
  - "He shouted for help when there was no wolf."
  - "He watched sheep in a field."
  - "He saw a real wolf later."
  - "The villagers ran quickly."
correctAnswer: "He shouted for help when there was no wolf."
explanation: "The villagers stopped trusting him because he used the warning falsely before."
hint: "Find the earlier action that changed how the villagers thought about his cry."
questionGoal: "Identify the choice that causes a later consequence."
misconception: "Choosing the most dramatic event instead of the cause."
```

```question
key: u01_l03_q03_consequence_definition
type: multiple-choice
prompt: "What is a consequence in a story?"
choices:
  - "What happens because of a choice or action"
  - "The place where the story begins"
  - "A list of every character"
  - "A word that rhymes"
correctAnswer: "What happens because of a choice or action"
explanation: "A consequence is a result. It answers, 'What happened because of that choice?'"
hint: "Think of cause and effect."
questionGoal: "Define consequence in story analysis."
misconception: "Confusing consequence with setting or character."
```

```question
key: u01_l03_q04_chain_order
type: order-items
prompt: "Put the choice-consequence chain in order."
items:
  - "The villagers do not come when the real wolf appears."
  - "The boy lies about seeing a wolf."
  - "The villagers believe the warning at first."
  - "The boy laughs at the villagers."
correctOrder:
  - "The boy lies about seeing a wolf."
  - "The villagers believe the warning at first."
  - "The boy laughs at the villagers."
  - "The villagers do not come when the real wolf appears."
explanation: "The later consequence makes sense because of the earlier false warning."
hint: "Start with the boy's first choice."
questionGoal: "Sequence a cause-and-effect chain."
misconception: "Retelling by emotional impact instead of event order."
```

```question
key: u01_l03_q05_because_frame
type: fill-blank
prompt: "Complete the explanation."
sentenceBefore: "The hare lost the race"
sentenceAfter: "he stopped to nap."
choices:
  - "because"
  - "although"
  - "before"
  - "unless"
correctAnswer: "because"
explanation: "Because connects the consequence to the cause."
hint: "Which word tells why something happened?"
questionGoal: "Use because language to connect choice and consequence."
misconception: "Stating events without explaining their cause."
```

```question
key: u01_l03_q06_choice_explain
type: constructed-response
prompt: "Explain the choice and consequence in one sentence: The fox praised the crow's singing, and the crow opened her beak and dropped the cheese."
minWords: 10
sampleAnswer: "The crow chose to sing after the fox praised her, so she dropped the cheese."
checklist:
  - "Name the crow's choice"
  - "Name the consequence"
  - "Use because or so"
explanation: "The crow's choice leads directly to losing the cheese."
hint: "Use this frame: The crow chose to ___, so ___."
questionGoal: "Explain a fable cause-and-effect relationship."
misconception: "Blaming only the fox without noticing the crow's choice."
```

### Lesson 4: Find The Moral With Evidence

```question
key: u01_l04_q01_best_moral
type: passage-question
prompt: "Read the fable and answer."
passageTitle: "The Proud Crow"
passage: |
  A crow held cheese in her beak. A fox praised her beautiful voice. The crow opened her beak to sing, and the cheese fell. The fox took it and ran away.
question: "Which moral best fits the fable?"
choices:
  - "Do not let flattery make you careless."
  - "Always share food with foxes."
  - "Singing is never useful."
  - "Birds should not live in trees."
correctAnswer: "Do not let flattery make you careless."
explanation: "The crow loses the cheese because she lets praise distract her."
hint: "Choose the lesson that matches why the crow lost the cheese."
questionGoal: "Select a moral supported by story events."
misconception: "Choosing a lesson that sounds like advice but is not supported."
```

```question
key: u01_l04_q02_evidence_for_moral
type: multiple-choice
prompt: "Which event is the best evidence for the moral 'Do not let flattery make you careless'?"
choices:
  - "The crow opens her beak after the fox praises her."
  - "The fox has four legs."
  - "The cheese is food."
  - "The tree is tall."
correctAnswer: "The crow opens her beak after the fox praises her."
explanation: "That event shows the crow becoming careless because of praise."
hint: "Find the event that directly connects praise to the loss."
questionGoal: "Choose evidence that supports a moral."
misconception: "Selecting a true but unrelated detail as evidence."
```

```question
key: u01_l04_q03_moral_evidence_match
type: match-pairs
prompt: "Match each moral to the event that supports it."
pairs:
  - left: "Slow and steady effort can win."
    right: "Tortoise keeps moving while Hare naps."
  - left: "Lies can make people stop trusting you."
    right: "The villagers ignore the boy's real warning."
  - left: "Small friends can give great help."
    right: "The mouse frees the lion from the net."
  - left: "Greed can make you lose what you have."
    right: "The dog drops his meat while snapping at a reflection."
explanation: "A moral should connect to a specific event in the fable."
hint: "Look for the event that proves the lesson."
questionGoal: "Connect morals to supporting evidence."
misconception: "Treating morals as detachable sayings."
```

```question
key: u01_l04_q04_moral_not_topic
type: multiple-choice
prompt: "Which choice is a moral, not just a topic?"
choices:
  - "Use what you have wisely."
  - "A crow"
  - "A pitcher"
  - "Pebbles and water"
correctAnswer: "Use what you have wisely."
explanation: "A moral teaches a lesson. The other choices are people or things in a story."
hint: "A moral can guide a person's choices."
questionGoal: "Distinguish moral from topic or object."
misconception: "Naming a story topic instead of a lesson."
```

```question
key: u01_l04_q05_moral_frame
type: fill-blank
prompt: "Complete the evidence sentence."
sentenceBefore: "The moral fits the fable"
sentenceAfter: "the ending shows what happens after the character's choice."
choices:
  - "because"
  - "before"
  - "or"
  - "unless"
correctAnswer: "because"
explanation: "Because introduces the evidence that supports the moral."
hint: "Which word tells why the moral fits?"
questionGoal: "Use evidence language to support a moral."
misconception: "Giving a moral without explaining why it fits."
```

```question
key: u01_l04_q06_write_moral_evidence
type: constructed-response
prompt: "Write one sentence explaining the moral of this fable: A dog saw his reflection, snapped at the 'other' meat, and dropped the meat he already had."
minWords: 12
sampleAnswer: "The moral is that greed can make you lose what you have because the dog lost his own meat."
checklist:
  - "State a moral"
  - "Use evidence from the fable"
  - "Use because or another reason word"
explanation: "The strongest answer connects the lesson to the dog's action and loss."
hint: "Use this frame: The moral is ___ because ___."
questionGoal: "Produce a supported moral explanation."
misconception: "Writing advice that is not tied to the story event."
```

## Unit 2: Folktales, Tricksters, And Story Patterns

### Lesson 1: What Makes A Folktale?

```question
key: u02_l01_q01_folktale_feature
type: multiple-choice
prompt: "Which feature often points to a folktale?"
choices:
  - "It has been retold by many people over time."
  - "It always has exactly one sentence for a moral."
  - "It always has one animal speaker."
  - "It can only happen in one printed book."
correctAnswer: "It has been retold by many people over time."
explanation: "Folktales often come from oral tradition and are retold across time."
hint: "Think about stories passed from teller to listener."
questionGoal: "Recognize oral-tradition features of folktales."
misconception: "Assuming all older stories work exactly like fables."
```

```question
key: u02_l01_q02_genre_features
type: match-pairs
prompt: "Match each genre to a likely feature."
pairs:
  - left: "Fable"
    right: "A compact story with a clear moral"
  - left: "Folktale"
    right: "A tale retold through oral tradition"
  - left: "Trickster tale"
    right: "A story where cleverness disrupts events"
  - left: "Myth"
    right: "A traditional story with cultural meaning"
explanation: "Genre features help readers know what kind of story they are reading."
hint: "Look for moral, oral tradition, clever disruption, or cultural meaning."
questionGoal: "Distinguish introductory genre features."
misconception: "Treating fable, folktale, trickster tale, and myth as the same label."
```

```question
key: u02_l01_q03_oral_tradition_blank
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "A story passed by telling and retelling belongs to an"
sentenceAfter: "tradition."
choices:
  - "oral"
  - "written"
  - "printed"
  - "single-author"
correctAnswer: "oral"
explanation: "Oral tradition means stories are shared aloud and remembered by people."
hint: "Oral has to do with speaking and listening."
questionGoal: "Use the term oral tradition accurately."
misconception: "Thinking tradition only means something written in a book."
```

```question
key: u02_l01_q04_fable_or_folktale
type: passage-question
prompt: "Read the description and answer."
passageTitle: "A Tale Description"
passage: |
  A grandmother tells a story she heard as a child. In the story, a youngest child meets three helpers on the road. Each helper repeats the same warning before the child reaches the forest.
question: "Which feature most strongly points to a folktale?"
choices:
  - "The story is passed from a grandmother and has repeated helpers."
  - "The story gives a one-sentence moral at the end."
  - "The story has only one animal character."
  - "The story names one ordinary setting."
correctAnswer: "The story is passed from a grandmother and has repeated helpers."
explanation: "Retelling across generations and repeated helper scenes are common folktale features."
hint: "Find the clue about how the story travels and the pattern inside it."
questionGoal: "Identify folktale evidence in a description."
misconception: "Classifying only by whether a story seems old."
```

```question
key: u02_l01_q05_not_all_animal_stories
type: multiple-choice
prompt: "Why is it not enough to say, 'This story has an animal, so it must be a fable'?"
choices:
  - "Animals can appear in fables, folktales, myths, and other stories."
  - "Fables never include animals."
  - "Only poems include animals."
  - "Animal characters always mean the story is a myth."
correctAnswer: "Animals can appear in fables, folktales, myths, and other stories."
explanation: "A reader should look at how the story works, not only whether an animal appears."
hint: "One feature by itself may not be enough to name a genre."
questionGoal: "Avoid overgeneralizing from one surface feature."
misconception: "Classifying genre from animals alone."
```

```question
key: u02_l01_q06_respectful_genre_sentence
type: constructed-response
prompt: "Write one respectful sentence about a folktale from another tradition. Use the word 'story' or 'tradition.'"
minWords: 8
sampleAnswer: "This story comes from a tradition where people retold it aloud."
checklist:
  - "Use respectful language"
  - "Avoid saying the story proves everything about a culture"
  - "Use story or tradition"
explanation: "Respectful language treats a tale as part of a tradition without flattening a whole culture."
hint: "Try this start: This story comes from..."
questionGoal: "Practice respectful discussion language for traditional stories."
misconception: "Using one story to make a broad claim about an entire culture."
```

### Lesson 2: Repeated Words And Patterned Events

```question
key: u02_l02_q01_repeated_phrase
type: passage-question
prompt: "Read the folktale excerpt and answer."
passageTitle: "The Three Gates"
passage: |
  At the first gate, the old woman said, "Choose with care." At the second gate, the old woman said, "Choose with care." At the third gate, the old woman said, "Choose with care."
question: "Which phrase is repeated?"
choices:
  - "Choose with care."
  - "At the river."
  - "The silver bird."
  - "Run home quickly."
correctAnswer: "Choose with care."
explanation: "The same warning appears at each gate, helping listeners notice the pattern."
hint: "Look for the words that appear again and again."
questionGoal: "Identify repeated language in a folktale excerpt."
misconception: "Overlooking repeated words as unimportant."
```

```question
key: u02_l02_q02_pattern_sequence
type: order-items
prompt: "Put this patterned folktale sequence in order."
items:
  - "The youngest child listens and succeeds."
  - "The oldest child ignores the warning."
  - "The same warning is spoken again."
  - "The middle child also ignores the warning."
correctOrder:
  - "The oldest child ignores the warning."
  - "The same warning is spoken again."
  - "The middle child also ignores the warning."
  - "The youngest child listens and succeeds."
explanation: "Folktales often repeat a test before the final character responds differently."
hint: "Look for the first failed test, the repeated warning, and the final change."
questionGoal: "Sequence a repeated folktale pattern."
misconception: "Treating repeated tests as unrelated events."
```

```question
key: u02_l02_q03_purpose_repetition
type: multiple-choice
prompt: "Why might a folktale repeat the same warning three times?"
choices:
  - "To help listeners remember the warning and expect a pattern"
  - "To prove the storyteller forgot what came next"
  - "To make the setting disappear"
  - "To show the warning is not important"
correctAnswer: "To help listeners remember the warning and expect a pattern"
explanation: "Repetition can guide memory, prediction, and meaning in oral stories."
hint: "Think about how a listener follows a story told aloud."
questionGoal: "Explain a learning job of repetition in oral tradition."
misconception: "Assuming repetition is accidental filler."
```

```question
key: u02_l02_q04_repetition_vocabulary
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "A"
sentenceAfter: "is a line or event that appears again and again."
choices:
  - "repetition"
  - "setting"
  - "genealogy"
  - "stage direction"
correctAnswer: "repetition"
explanation: "Repetition means something is repeated."
hint: "The word sounds like repeat."
questionGoal: "Use the term repetition accurately."
misconception: "Confusing repeated language with unrelated story labels."
```

```question
key: u02_l02_q05_pattern_jobs
type: match-pairs
prompt: "Match each repeated feature to what it helps the listener notice."
pairs:
  - left: "Same warning"
    right: "A choice is being tested"
  - left: "Same journey stop"
    right: "The tale is building a path"
  - left: "Same answer from a character"
    right: "The character is not changing yet"
  - left: "Changed final response"
    right: "The pattern has turned"
explanation: "Repeated features help listeners track what stays the same and what changes."
hint: "Ask what the repeated part helps you expect."
questionGoal: "Connect folktale pattern features to their functions."
misconception: "Noticing repetition without interpreting its purpose."
```

```question
key: u02_l02_q06_predict_pattern
type: constructed-response
prompt: "A folktale says, 'At the first door, he heard a riddle. At the second door, he heard a riddle.' What might you expect at the third door? Answer in one sentence."
minWords: 8
sampleAnswer: "I would expect another riddle at the third door because the events are repeating."
checklist:
  - "Predict another patterned event"
  - "Use because"
  - "Mention the repeating pattern"
explanation: "A pattern can help a listener predict what may come next."
hint: "Use this frame: I expect ___ because ___."
questionGoal: "Use a repeated pattern to make a reasonable prediction."
misconception: "Predicting without using the tale's pattern."
```

### Lesson 3: The Trickster's Choice

```question
key: u02_l03_q01_trickster_definition
type: multiple-choice
prompt: "Which description best fits a trickster in a tale?"
choices:
  - "A clever character whose tricks change the story"
  - "A perfect hero who never causes trouble"
  - "A setting where a story happens"
  - "A poem with two stanzas"
correctAnswer: "A clever character whose tricks change the story"
explanation: "A trickster uses cleverness or tricks, and the results may help, harm, reveal, or correct something."
hint: "Look for clever action that disrupts events."
questionGoal: "Recognize the role of a trickster."
misconception: "Thinking trickster means only villain or only hero."
```

```question
key: u02_l03_q02_trickster_goal
type: passage-question
prompt: "Read the trickster tale excerpt and answer."
passageTitle: "The Shared Feast"
passage: |
  Spider wanted the whole bowl of stew. He told each guest, "The feast begins later," but he whispered a different time to himself. When he reached the bowl alone, he found that Turtle had already invited everyone early.
question: "What did Spider want?"
choices:
  - "To keep the whole bowl of stew for himself"
  - "To teach everyone a song"
  - "To build a new house"
  - "To leave before the feast"
correctAnswer: "To keep the whole bowl of stew for himself"
explanation: "Spider's trick begins with wanting the stew for himself."
hint: "Find the reason Spider gives different times."
questionGoal: "Identify a trickster's goal from story evidence."
misconception: "Focusing on the funny ending without noticing motive."
```

```question
key: u02_l03_q03_goal_trick_result
type: match-pairs
prompt: "Match each part of the trickster chart to its example."
pairs:
  - left: "Goal"
    right: "Spider wants the stew for himself"
  - left: "Trick"
    right: "Spider tells guests the wrong time"
  - left: "Consequence"
    right: "The guests arrive before Spider can eat alone"
  - left: "Effect on others"
    right: "The guests learn Spider was unfair"
explanation: "The chart separates what the trickster wants, does, and causes."
hint: "Goal is want; trick is action; consequence is what happens because of it."
questionGoal: "Analyze trickster action using goal, trick, and result."
misconception: "Blending motive, action, and consequence into one vague idea."
```

```question
key: u02_l03_q04_trickster_not_simple
type: multiple-choice
prompt: "Why should we avoid saying, 'The trickster is just bad'?"
choices:
  - "A trickster's cleverness may reveal a problem, teach a lesson, or cause trouble."
  - "Tricksters never make choices."
  - "All trickster tales end the same way."
  - "A trickster is the same thing as a setting."
correctAnswer: "A trickster's cleverness may reveal a problem, teach a lesson, or cause trouble."
explanation: "Tricksters are often complicated. The story's events show what their cleverness does."
hint: "Think about what the trick changes or reveals."
questionGoal: "Encourage careful character judgment in trickster tales."
misconception: "Reducing a trickster to a single moral label."
```

```question
key: u02_l03_q05_trickster_next_line
type: dialogue-builder
prompt: "Choose the line that best fits Turtle after Turtle discovers Spider's unfair trick."
turns:
  - speaker: "Spider"
    line: "The feast begins later. Come when the moon is high."
  - speaker: "Turtle"
    line: "But you told yourself to come now."
choices:
  - "I will invite the others now so everyone has a fair share."
  - "I forgot what food is."
  - "I will come at the wrong time too."
  - "Let us stop speaking forever."
correctAnswer: "I will invite the others now so everyone has a fair share."
explanation: "This line responds to Spider's unfair trick and moves the tale toward a consequence."
hint: "Choose the line that answers the problem in the scene."
questionGoal: "Choose dialogue that fits trickster conflict and consequence."
misconception: "Choosing a random funny line instead of one tied to the story problem."
```

```question
key: u02_l03_q06_balanced_trickster_explain
type: constructed-response
prompt: "In one sentence, explain how Spider's trick is clever but unfair."
minWords: 10
sampleAnswer: "Spider is clever because he changes the feast time, but it is unfair because he wants all the stew."
checklist:
  - "Name what is clever"
  - "Name why it is unfair"
  - "Use evidence from the tale"
explanation: "A balanced answer notices both the clever action and its effect on others."
hint: "Use this frame: Spider is clever because ___, but unfair because ___."
questionGoal: "Produce a balanced explanation of a trickster choice."
misconception: "Praising cleverness without considering consequence."
```

### Lesson 4: Compare Two Tale Patterns

```question
key: u02_l04_q01_comparison_criteria
type: match-pairs
prompt: "Match each comparison criterion to the evidence it asks for."
pairs:
  - left: "Warning"
    right: "What advice or command appears in both tales?"
  - left: "Trick"
    right: "How does cleverness change each tale?"
  - left: "Ending"
    right: "How does each tale turn out?"
  - left: "Repeated phrase"
    right: "Which words come back again?"
explanation: "A criterion is the one feature you use to compare two stories."
hint: "Each criterion asks one kind of question."
questionGoal: "Understand comparison criteria."
misconception: "Comparing without choosing a shared feature."
```

```question
key: u02_l04_q02_paired_warning_compare
type: passage-question
prompt: "Read the paired tale moments and answer."
passageTitle: "Two Warnings"
passage: |
  Tale A: An old woman says, "Do not open the red door." The child opens it and finds a storm.

  Tale B: A talking fish says, "Do not take more than one pearl." The fisherman takes three, and the pearls turn to stones.
question: "What criterion would help compare these two tale moments?"
choices:
  - "How characters respond to a warning"
  - "How many stanzas each poem has"
  - "Which character is older"
  - "Which tale uses a talking table"
correctAnswer: "How characters respond to a warning"
explanation: "Both tale moments include a warning and a character's response to it."
hint: "Look for the feature that appears in both tales."
questionGoal: "Choose a shared criterion for comparing paired tale moments."
misconception: "Choosing a feature that is absent from one or both tales."
```

```question
key: u02_l04_q03_best_comparison_sentence
type: multiple-choice
prompt: "Which sentence is the strongest comparison?"
choices:
  - "Both tales include a warning, but the red-door child opens the door while the fisherman takes too many pearls."
  - "The first tale has a red door. The second tale has a fisherman."
  - "I like the fish tale better."
  - "Both stories are exactly the same in every way."
correctAnswer: "Both tales include a warning, but the red-door child opens the door while the fisherman takes too many pearls."
explanation: "The strongest comparison uses one shared feature and evidence from both tales."
hint: "Look for both, but, and details from each tale."
questionGoal: "Identify a one-criterion comparison with evidence."
misconception: "Writing two summaries instead of a comparison."
```

```question
key: u02_l04_q04_comparison_frame
type: multi-blank-cloze
prompt: "Complete the comparison sentence."
parts:
  - "Both tales include a "
  - ", but the first character "
  - " while the second character "
  - "."
blanks:
  - correctAnswer: "warning"
    choices:
      - "warning"
      - "stanza"
      - "castle"
  - correctAnswer: "opens the red door"
    choices:
      - "opens the red door"
      - "counts the rhymes"
      - "writes a play"
  - correctAnswer: "takes too many pearls"
    choices:
      - "takes too many pearls"
      - "sings to a crow"
      - "draws a map"
explanation: "The sentence compares one pattern: warning and response."
hint: "Use the feature and evidence that appear in the paired tale moments."
questionGoal: "Build a scaffolded comparison sentence."
misconception: "Mixing unrelated details into a comparison frame."
```

```question
key: u02_l04_q05_compare_steps
type: order-items
prompt: "Put the comparison steps in order."
items:
  - "Name evidence from each tale."
  - "Choose one shared feature."
  - "Write how the tales are alike or different."
  - "Read both tales carefully."
correctOrder:
  - "Read both tales carefully."
  - "Choose one shared feature."
  - "Name evidence from each tale."
  - "Write how the tales are alike or different."
explanation: "Comparison works best when you choose one criterion before writing."
hint: "You need to read before you choose evidence."
questionGoal: "Sequence the process for evidence-based comparison."
misconception: "Starting with an opinion before selecting a comparison feature."
```

```question
key: u02_l04_q06_write_comparison
type: constructed-response
prompt: "Write one comparison sentence about Tale A and Tale B using the warning criterion."
minWords: 14
sampleAnswer: "Both tales include a warning, but one character opens a forbidden door while the other takes too many pearls."
checklist:
  - "Use both or alike"
  - "Use but, while, or different"
  - "Include evidence from each tale"
explanation: "A strong comparison uses the same criterion and details from both tales."
hint: "Use this frame: Both tales include ___, but ___."
questionGoal: "Produce a brief one-criterion comparison."
misconception: "Summarizing only one tale or giving an unsupported opinion."
```

## Unit 3: Myths, Names, And Cultural Meaning

### Lesson 1: Myth Is A Traditional Story

```question
key: u03_l01_q01_myth_definition
type: multiple-choice
prompt: "In literature class, what is a myth?"
choices:
  - "A traditional story with cultural meaning"
  - "A story that must be called a lie"
  - "Any story with magic but no tradition"
  - "A list of names to memorize"
correctAnswer: "A traditional story with cultural meaning"
explanation: "In literature, myth means a traditional story that carries meaning for a culture or tradition."
hint: "Use the literature meaning of myth, not the everyday insult."
questionGoal: "Define myth accurately for Level 1 study."
misconception: "Thinking myth only means false."
```

```question
key: u03_l01_q02_myth_features
type: match-pairs
prompt: "Match each myth feature to an example."
pairs:
  - left: "Traditional story"
    right: "A tale remembered and retold over time"
  - left: "Cultural meaning"
    right: "A story that helps a people explore an important question"
  - left: "Origin pattern"
    right: "A tale about how something began"
  - left: "Extraordinary being"
    right: "A god, goddess, messenger, or magical creature"
explanation: "These features help readers recognize myths without reducing them to one simple rule."
hint: "Look for tradition, meaning, beginning, and extraordinary characters."
questionGoal: "Connect myth features to concrete examples."
misconception: "Treating myths as ordinary fantasy stories with no cultural setting."
```

```question
key: u03_l01_q03_traditional_story_blank
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "A myth is a"
sentenceAfter: "story, retold with meaning in a culture or tradition."
choices:
  - "traditional"
  - "modern"
  - "written"
  - "single"
correctAnswer: "traditional"
explanation: "Traditional means handed down or remembered within a group over time."
hint: "Which word connects to tradition?"
questionGoal: "Use the phrase traditional story accurately."
misconception: "Forgetting that myth is a genre of inherited story."
```

```question
key: u03_l01_q04_myth_or_fable
type: passage-question
prompt: "Read the story description and answer."
passageTitle: "A Story Description"
passage: |
  In an ancient story, a divine messenger carries news from the mountain of the gods to a city by the sea. The story explains why the city honors safe travelers.
question: "Which feature most clearly points to myth?"
choices:
  - "It connects gods, an ancient place, and a cultural custom."
  - "It is any story with an animal helper."
  - "It names a place but gives no tradition or meaning."
  - "It gives a direct moral about sharing cheese."
correctAnswer: "It connects gods, an ancient place, and a cultural custom."
explanation: "The description includes extraordinary beings, ancient setting, and cultural meaning."
hint: "Look for clues about tradition and cultural meaning."
questionGoal: "Identify myth features in a short description."
misconception: "Assuming any old story with a lesson is a fable."
```

```question
key: u03_l01_q05_respectful_myth_language
type: multiple-choice
prompt: "Which sentence discusses a myth most respectfully?"
choices:
  - "This myth is a traditional story from an ancient culture, so we should read it carefully."
  - "This myth is just wrong science, so it has no meaning."
  - "All ancient people believed exactly the same thing."
  - "Myths are silly, so details do not matter."
correctAnswer: "This myth is a traditional story from an ancient culture, so we should read it carefully."
explanation: "Respectful language treats the story as meaningful within a tradition."
hint: "Choose the sentence that avoids mocking or flattening a culture."
questionGoal: "Practice respectful language for myth study."
misconception: "Reducing myths to errors or stereotypes."
```

```question
key: u03_l01_q06_myth_explain
type: constructed-response
prompt: "In one sentence, explain why 'myth' does not simply mean 'false story' in literature class."
minWords: 10
sampleAnswer: "In literature, a myth is a traditional story with cultural meaning, not just a false statement."
checklist:
  - "Say myth is a traditional story"
  - "Mention meaning, culture, or tradition"
  - "Avoid mocking language"
explanation: "The literary meaning of myth is about tradition and meaning, not insult."
hint: "Use the words traditional story in your answer."
questionGoal: "Produce a respectful explanation of myth as a genre."
misconception: "Using only the everyday meaning of myth as false."
```

### Lesson 2: Names, Places, And Relationships

```question
key: u03_l02_q01_name_role_match
type: match-pairs
prompt: "Match each Greek or Roman name to its story role."
pairs:
  - left: "Zeus"
    right: "King of the Greek gods in many myths"
  - left: "Hermes"
    right: "Messenger who travels quickly"
  - left: "Athena"
    right: "Goddess often linked with wisdom"
  - left: "Poseidon"
    right: "God often linked with the sea"
explanation: "A few role clues help readers follow a myth without memorizing a long list."
hint: "Use the role words: king, messenger, wisdom, sea."
questionGoal: "Connect selected mythic names to useful story roles."
misconception: "Treating unfamiliar names as interchangeable."
```

```question
key: u03_l02_q02_pronunciation_support
type: fill-blank
prompt: "Complete the name support."
sentenceBefore: "Athena (uh-THEE-nuh) is a"
sentenceAfter: "often linked with wisdom."
choices:
  - "goddess"
  - "river"
  - "stanza"
  - "riddle"
correctAnswer: "goddess"
explanation: "The sentence gives both pronunciation help and Athena's role."
hint: "Use the role clue after the name."
questionGoal: "Use pronunciation and role support for an unfamiliar name."
misconception: "Skipping role clues because the name feels hard."
```

```question
key: u03_l02_q03_hermes_context
type: passage-question
prompt: "Read the myth setup and answer."
passageTitle: "A Message From Olympus"
passage: |
  Hermes, the swift messenger, flew down from Mount Olympus. He carried a warning from Zeus to a sailor who was about to leave harbor during a storm.
question: "What role does Hermes have in this passage?"
choices:
  - "He is the messenger carrying a warning."
  - "He is the sailor leaving harbor."
  - "He is the storm itself."
  - "He is the city by the sea."
correctAnswer: "He is the messenger carrying a warning."
explanation: "The passage names Hermes as the swift messenger and shows him carrying a warning."
hint: "Look right after the name for an appositive clue."
questionGoal: "Use context to identify a mythic character's role."
misconception: "Guessing from unfamiliar names instead of reading the role clue."
```

```question
key: u03_l02_q04_no_long_lists
type: multiple-choice
prompt: "Why should Level 1 myth lessons avoid long lists of gods and family trees?"
choices:
  - "Students need names as story clues, not detached memory lists."
  - "Names never matter in myths."
  - "A name list by itself explains every myth."
  - "A long list is the same as understanding a story."
correctAnswer: "Students need names as story clues, not detached memory lists."
explanation: "Names matter when they help us understand the story, relationship, or choice."
hint: "Think about using names inside the story."
questionGoal: "Reinforce purposeful use of mythic names."
misconception: "Equating memorization of names with comprehension."
```

```question
key: u03_l02_q05_relationship_map
type: multi-blank-cloze
prompt: "Complete the relationship map from the setup: Zeus sends Hermes with a warning to a sailor."
parts:
  - "Zeus sends the message; "
  - " carries it; the "
  - " receives the warning."
blanks:
  - correctAnswer: "Hermes"
    choices:
      - "Hermes"
      - "Poseidon"
      - "Aesop"
  - correctAnswer: "sailor"
    choices:
      - "sailor"
      - "stanza"
      - "tortoise"
explanation: "The map shows who sends, who carries, and who receives the warning."
hint: "Follow the action in the setup: sends, carries, receives."
questionGoal: "Track relationships among a small myth cast."
misconception: "Losing the story action because of unfamiliar names."
```

```question
key: u03_l02_q06_name_context_explain
type: constructed-response
prompt: "In one sentence, explain how a role clue can help you read a myth with unfamiliar names."
minWords: 10
sampleAnswer: "A role clue tells who the character is, such as messenger or sea god, so I can follow the story."
checklist:
  - "Mention a role clue"
  - "Explain how it helps comprehension"
  - "Use one example if possible"
explanation: "Role clues reduce memory load and keep attention on the story."
hint: "Use this frame: A role clue helps because ___."
questionGoal: "Explain a strategy for managing unfamiliar mythic names."
misconception: "Believing difficult names make the story impossible to understand."
```

### Lesson 3: Origins And Transformations

```question
key: u03_l03_q01_transformation_order
type: order-items
prompt: "Put the transformation pattern in order."
items:
  - "The character changes into something new."
  - "The character ignores a warning."
  - "The story shows why the change matters."
  - "The character begins in an ordinary form."
correctOrder:
  - "The character begins in an ordinary form."
  - "The character ignores a warning."
  - "The character changes into something new."
  - "The story shows why the change matters."
explanation: "A transformation myth usually tracks before, cause, change, and meaning."
hint: "Start with what the character was before the change."
questionGoal: "Sequence an origin or transformation pattern."
misconception: "Treating transformation as random magic."
```

```question
key: u03_l03_q02_weaver_change
type: passage-question
prompt: "Read the adapted myth episode and answer."
passageTitle: "The Proud Weaver"
passage: |
  A young weaver boasted that no one, not even a goddess, could teach her. A wise goddess warned her to be humble. The weaver mocked the warning. By the end of the tale, she was changed into a tiny spider, weaving forever.
question: "What caused the transformation in this episode?"
choices:
  - "The weaver mocked the warning."
  - "The spider built a quiet web."
  - "The goddess forgot her name."
  - "The loom was made of gold."
correctAnswer: "The weaver mocked the warning."
explanation: "The change follows the weaver's proud response to the warning."
hint: "Look for the choice that comes before the change."
questionGoal: "Connect a transformation to its story cause."
misconception: "Not linking the change to the character's choice."
```

```question
key: u03_l03_q03_origin_story
type: multiple-choice
prompt: "Which description sounds most like an origin story?"
choices:
  - "A myth explains why a flower blooms after winter."
  - "A tale describes one ordinary afternoon with no beginning question."
  - "A character says hello and then goodbye."
  - "A poem counts syllables without a story."
correctAnswer: "A myth explains why a flower blooms after winter."
explanation: "An origin story tells or dramatizes how something began or why something is the way it is."
hint: "Look for the story about how or why something began."
questionGoal: "Recognize the origin-story pattern."
misconception: "Confusing origin with any event in a story."
```

```question
key: u03_l03_q04_before_cause_after
type: match-pairs
prompt: "Match each transformation chart part to the adapted weaver episode."
pairs:
  - left: "Before"
    right: "The character is a young weaver"
  - left: "Warning"
    right: "A goddess tells her to be humble"
  - left: "Cause"
    right: "The weaver mocks the warning"
  - left: "After"
    right: "The character becomes a spider"
explanation: "The chart helps show that the change has a story reason."
hint: "Find what happens before the change, what warning appears, and what changes."
questionGoal: "Map a transformation episode into before-cause-after parts."
misconception: "Remembering only the final magical change."
```

```question
key: u03_l03_q05_transformation_blank
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "A"
sentenceAfter: "is a change from one form or state to another."
choices:
  - "transformation"
  - "setting"
  - "dialogue"
  - "criterion"
correctAnswer: "transformation"
explanation: "Transformation means a change in form or state."
hint: "The word starts like transform."
questionGoal: "Use the term transformation accurately."
misconception: "Confusing transformation with other story vocabulary."
```

```question
key: u03_l03_q06_change_meaning
type: constructed-response
prompt: "In one sentence, explain what the weaver's transformation shows about the story."
minWords: 10
sampleAnswer: "The transformation shows the consequence of mocking a warning and being too proud."
checklist:
  - "Mention the transformation"
  - "Connect it to pride or the ignored warning"
  - "Use consequence or shows"
explanation: "The change matters because it is connected to the character's choice."
hint: "Use this frame: The change shows ___."
questionGoal: "Explain the meaning of a transformation in context."
misconception: "Seeing transformation as only a surprising event."
```

### Lesson 4: Warnings, Gifts, And Consequences

```question
key: u03_l04_q01_warning_gift_match
type: match-pairs
prompt: "Match each mythic pattern to its story job."
pairs:
  - left: "Warning"
    right: "Tells a character what not to do"
  - left: "Gift"
    right: "Gives a character power, help, or responsibility"
  - left: "Choice"
    right: "Shows how the character responds"
  - left: "Consequence"
    right: "Shows the result of the response"
explanation: "Warnings and gifts matter because characters must respond to them."
hint: "Follow the chain: warning or gift, response, result."
questionGoal: "Connect warning/gift vocabulary to story functions."
misconception: "Treating warnings and gifts as background details."
```

```question
key: u03_l04_q02_sealed_jar_warning
type: passage-question
prompt: "Read the adapted myth episode and answer."
passageTitle: "The Sealed Jar"
passage: |
  A young woman received a beautiful sealed jar and a warning not to open it. For many days she left it closed. At last she lifted the lid, and dark troubles rushed out. One small bright thing, Hope, remained inside.
question: "What warning shapes the story?"
choices:
  - "Do not open the sealed jar."
  - "Do not walk near the sea."
  - "Do not speak to Hermes."
  - "Do not weave a cloak."
correctAnswer: "Do not open the sealed jar."
explanation: "The warning about the jar drives the choice and consequence."
hint: "Find the sentence that tells the character what not to do."
questionGoal: "Identify a warning in an adapted myth episode."
misconception: "Missing the warning that controls the outcome."
```

```question
key: u03_l04_q03_gift_not_always_simple
type: multiple-choice
prompt: "Why is a mythic gift not always simply helpful?"
choices:
  - "A gift may also bring responsibility, danger, or a test."
  - "A gift can never matter in a myth."
  - "A gift is always the same as a moral."
  - "A gift removes all choices from the story."
correctAnswer: "A gift may also bring responsibility, danger, or a test."
explanation: "In myths, gifts often create choices and consequences."
hint: "Think about what a character must do after receiving the gift."
questionGoal: "Understand gifts as meaningful story devices."
misconception: "Assuming gift always means uncomplicated help."
```

```question
key: u03_l04_q04_jar_chain_order
type: order-items
prompt: "Put the warning-consequence chain in order."
items:
  - "Troubles rush out, but Hope remains."
  - "The young woman receives a sealed jar."
  - "She hears a warning not to open it."
  - "She lifts the lid."
correctOrder:
  - "The young woman receives a sealed jar."
  - "She hears a warning not to open it."
  - "She lifts the lid."
  - "Troubles rush out, but Hope remains."
explanation: "The consequence follows the warning and the character's choice."
hint: "Start with the gift, then the warning, then the response."
questionGoal: "Sequence a warning/gift/consequence chain."
misconception: "Remembering the ending without the warning and choice that caused it."
```

```question
key: u03_l04_q05_consequence_blank
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "A consequence is the"
sentenceAfter: "of a choice or action."
choices:
  - "result"
  - "rhyme"
  - "speaker"
  - "title"
correctAnswer: "result"
explanation: "A consequence is the result that follows a choice or action."
hint: "Think cause and effect."
questionGoal: "Review consequence vocabulary in a myth context."
misconception: "Disconnecting consequences from choices."
```

```question
key: u03_l04_q06_warning_explain
type: constructed-response
prompt: "Explain in one sentence how the warning affects the sealed jar story."
minWords: 10
sampleAnswer: "The warning matters because opening the jar leads to the troubles rushing out."
checklist:
  - "Mention the warning"
  - "Mention the choice to open the jar"
  - "Mention the consequence"
explanation: "The warning shapes the story because the character's response leads to the outcome."
hint: "Use this frame: The warning matters because ___."
questionGoal: "Explain how a warning shapes a mythic outcome."
misconception: "Treating the warning as a minor detail."
```

## Unit 4: Heroes, Quests, And Consequences

### Lesson 1: A Quest Has A Goal

```question
key: u04_l01_q01_quest_order
type: order-items
prompt: "Put the quest path in order."
items:
  - "The hero faces an obstacle."
  - "The hero returns with news or help."
  - "The hero receives a goal."
  - "The hero begins the journey."
correctOrder:
  - "The hero receives a goal."
  - "The hero begins the journey."
  - "The hero faces an obstacle."
  - "The hero returns with news or help."
explanation: "A quest is shaped by a goal, journey, obstacle, and meaningful outcome."
hint: "Start with what the hero is trying to do."
questionGoal: "Sequence basic quest structure."
misconception: "Thinking a quest is only movement from place to place."
```

```question
key: u04_l01_q02_goal_identify
type: passage-question
prompt: "Read the quest setup and answer."
passageTitle: "The Lost Laurel"
passage: |
  The city gates would not open until the lost laurel branch was brought back from the hill shrine. Maia took a small lamp and started up the rocky path before sunset.
question: "What is Maia's quest goal?"
choices:
  - "Bring back the lost laurel branch"
  - "Count every stone on the path"
  - "Hide the city gates"
  - "Put out the lamp"
correctAnswer: "Bring back the lost laurel branch"
explanation: "The goal is what Maia must bring back for the city gates to open."
hint: "Ask what Maia is trying to accomplish."
questionGoal: "Identify the goal in a short quest setup."
misconception: "Choosing a detail from the journey instead of the quest goal."
```

```question
key: u04_l01_q03_quest_not_trip
type: multiple-choice
prompt: "Which sentence best explains why a quest is more than an ordinary trip?"
choices:
  - "A quest has a goal, obstacles, and an outcome that matters."
  - "A quest is any walk across a room."
  - "A quest never has a problem."
  - "A quest is only a trip with a famous character."
correctAnswer: "A quest has a goal, obstacles, and an outcome that matters."
explanation: "A journey becomes a quest when the trip is tied to a meaningful goal and challenge."
hint: "Look for goal and obstacle."
questionGoal: "Distinguish quest from ordinary travel."
misconception: "Treating all travel as quest structure."
```

```question
key: u04_l01_q04_quest_parts_match
type: match-pairs
prompt: "Match each quest part to the example from Maia's story."
pairs:
  - left: "Goal"
    right: "Bring back the laurel branch"
  - left: "Path"
    right: "The rocky way to the hill shrine"
  - left: "Tool"
    right: "A small lamp"
  - left: "Outcome needed"
    right: "The city gates will open"
explanation: "Quest parts help readers track why the journey matters."
hint: "Use what Maia wants, where she goes, what she carries, and what will change."
questionGoal: "Map details from a quest setup to quest parts."
misconception: "Not distinguishing goal, path, tool, and outcome."
```

```question
key: u04_l01_q05_quest_blank
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "A quest begins with a"
sentenceAfter: "that gives the journey purpose."
choices:
  - "goal"
  - "rhyme"
  - "stanza"
  - "paragraph"
correctAnswer: "goal"
explanation: "The goal explains why the journey matters."
hint: "What is the hero trying to do?"
questionGoal: "Use quest vocabulary accurately."
misconception: "Focusing on movement while ignoring purpose."
```

```question
key: u04_l01_q06_quest_explain
type: constructed-response
prompt: "In one sentence, explain why Maia's trip to the hill shrine is a quest."
minWords: 12
sampleAnswer: "Maia's trip is a quest because she has the goal of bringing back the laurel branch."
checklist:
  - "Mention the goal"
  - "Mention the journey or shrine"
  - "Use because"
explanation: "The trip is a quest because it has a goal that matters to the city."
hint: "Use this frame: It is a quest because ___."
questionGoal: "Explain quest structure using evidence."
misconception: "Calling it a quest only because someone travels."
```

### Lesson 2: Obstacles, Helpers, And Tests

```question
key: u04_l02_q01_roles_match
type: match-pairs
prompt: "Match each quest role to its job."
pairs:
  - left: "Obstacle"
    right: "Blocks or slows the hero"
  - left: "Helper"
    right: "Gives aid, advice, or a tool"
  - left: "Test"
    right: "Shows what the hero must choose or prove"
  - left: "Task"
    right: "The work the hero must complete"
explanation: "These roles help readers understand how a quest is built."
hint: "Ask whether the detail blocks, aids, tests, or names the work."
questionGoal: "Distinguish obstacle, helper, test, and task."
misconception: "Treating every exciting event as the same quest part."
```

```question
key: u04_l02_q02_helper_evidence
type: passage-question
prompt: "Read the quest episode and answer."
passageTitle: "The Hill Shrine"
passage: |
  Maia climbed until fog covered the path. An old shepherd handed her a bell and said, "Ring this when you cannot see." When Maia rang it, the sound led her safely to the shrine.
question: "How does the shepherd act as a helper?"
choices:
  - "He gives Maia a bell that helps her through the fog."
  - "He blocks the path with stones."
  - "He takes the laurel branch away."
  - "He tells Maia to forget the city."
correctAnswer: "He gives Maia a bell that helps her through the fog."
explanation: "A helper gives aid, advice, or a tool. The shepherd's bell helps Maia continue."
hint: "Find what the shepherd gives and how Maia uses it."
questionGoal: "Identify helper function from evidence."
misconception: "Assuming a helper must finish the task for the hero."
```

```question
key: u04_l02_q03_obstacle_or_helper
type: multiple-choice
prompt: "In Maia's quest, what is the fog?"
choices:
  - "An obstacle because it makes the path hard to see"
  - "A helper because it gives advice"
  - "The reward because it opens the gates"
  - "The narrator because it tells the story"
correctAnswer: "An obstacle because it makes the path hard to see"
explanation: "The fog blocks Maia by making the path difficult."
hint: "Ask whether the fog helps or blocks the quest."
questionGoal: "Classify a concrete obstacle in a quest."
misconception: "Labeling every story detail as helper or reward."
```

```question
key: u04_l02_q04_test_choice
type: dialogue-builder
prompt: "Choose the line that best shows Maia passing the test of the fog."
turns:
  - speaker: "Shepherd"
    line: "Ring this bell when you cannot see."
  - speaker: "Maia"
    line: "The fog is thick, and the path is gone."
choices:
  - "I will use the bell and keep listening for the path."
  - "I will throw the bell into the fog."
  - "I will pretend the city never needed help."
  - "I will wait here and never try the bell."
correctAnswer: "I will use the bell and keep listening for the path."
explanation: "This line shows Maia using the helper's tool wisely when tested."
hint: "Choose the line that uses the help to face the obstacle."
questionGoal: "Connect helper, obstacle, and test through dialogue."
misconception: "Choosing an action unrelated to the quest task."
```

```question
key: u04_l02_q05_helper_blank
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "A helper does not have to finish the quest; a helper may give advice, courage, or a"
sentenceAfter: "."
choices:
  - "tool"
  - "rhyme"
  - "villain"
  - "title"
correctAnswer: "tool"
explanation: "Helpers often give tools or advice, but the hero still must act."
hint: "The shepherd gave Maia a bell."
questionGoal: "Clarify helper function in a quest."
misconception: "Thinking help removes the hero's responsibility."
```

```question
key: u04_l02_q06_obstacle_helper_explain
type: constructed-response
prompt: "Explain in one sentence how the fog and the bell work differently in Maia's quest."
minWords: 12
sampleAnswer: "The fog is an obstacle because it blocks Maia, but the bell is a helper because it guides her."
checklist:
  - "Identify fog as obstacle"
  - "Identify bell as helper"
  - "Explain how each affects Maia"
explanation: "The obstacle blocks the path, while the helper's tool helps Maia continue."
hint: "Use this frame: The fog ___, but the bell ___."
questionGoal: "Compare obstacle and helper functions."
misconception: "Not distinguishing blocking details from aiding details."
```

### Lesson 3: Heroes Can Have Flaws

```question
key: u04_l03_q01_trait_flaw
type: multiple-choice
prompt: "Which sentence shows that a hero can have both a strength and a flaw?"
choices:
  - "The hero is brave in danger but too proud to ask for help."
  - "The hero is brave in every event and never struggles."
  - "The hero's name is the only thing we need to know."
  - "The hero's flaw means the story cannot show courage."
correctAnswer: "The hero is brave in danger but too proud to ask for help."
explanation: "A character can have an admirable trait and a risky flaw at the same time."
hint: "Look for one strength and one weakness."
questionGoal: "Recognize balanced hero characterization."
misconception: "Believing heroes must be perfect."
```

```question
key: u04_l03_q02_trait_evidence_match
type: match-pairs
prompt: "Match each character detail to the trait or flaw it suggests."
pairs:
  - left: "Walks into the dark cave to rescue a friend"
    right: "Courage"
  - left: "Refuses a wise warning"
    right: "Pride"
  - left: "Thanks the helper and listens"
    right: "Humility"
  - left: "Runs ahead without checking the map"
    right: "Rashness"
explanation: "Traits and flaws should be based on evidence from what a character does."
hint: "Ask what the action shows about the character."
questionGoal: "Infer traits and flaws from actions."
misconception: "Choosing trait labels without evidence."
```

```question
key: u04_l03_q03_flawed_hero_passage
type: passage-question
prompt: "Read the heroic episode and answer."
passageTitle: "The Bronze Gate"
passage: |
  Dorian was strong enough to lift the bronze gate. When his sister warned him to wait for the moonlight, he laughed and pushed ahead. In the dark, he missed the carved sign and had to turn back.
question: "Which flaw affects Dorian's choice?"
choices:
  - "Pride, because he ignores the warning"
  - "Kindness, because he shares food"
  - "Patience, because he waits quietly"
  - "Wisdom, because he reads the sign first"
correctAnswer: "Pride, because he ignores the warning"
explanation: "Dorian laughs at the warning and pushes ahead, so pride affects his choice."
hint: "Look at how Dorian responds to advice."
questionGoal: "Connect a hero's flaw to textual evidence."
misconception: "Assuming strength means every choice is wise."
```

```question
key: u04_l03_q04_hero_perfection
type: multiple-choice
prompt: "Why is 'heroes are always perfect' a weak idea?"
choices:
  - "Many heroic stories show courage along with mistakes, limits, or flaws."
  - "Heroes never make choices in stories."
  - "A hero cannot be part of a quest."
  - "Only villains can learn from consequences."
correctAnswer: "Many heroic stories show courage along with mistakes, limits, or flaws."
explanation: "Classical and traditional heroes are often admirable and imperfect."
hint: "Think about heroes who need warnings, helpers, or tests."
questionGoal: "Correct the misconception that heroes are flawless."
misconception: "Equating heroism with perfection."
```

```question
key: u04_l03_q05_flaw_blank
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "A"
sentenceAfter: "is a weakness or risky habit that can affect a character's choices."
choices:
  - "flaw"
  - "stanza"
  - "rhyme"
  - "setting"
correctAnswer: "flaw"
explanation: "A flaw is a weakness or risky habit in a character."
hint: "The word is often paired with trait."
questionGoal: "Use flaw vocabulary accurately."
misconception: "Confusing character vocabulary with form vocabulary."
```

```question
key: u04_l03_q06_balanced_hero_response
type: constructed-response
prompt: "Write one sentence explaining how Dorian is both strong and flawed."
minWords: 12
sampleAnswer: "Dorian is strong because he can lift the gate, but he is flawed because he proudly ignores the warning."
checklist:
  - "Mention his strength"
  - "Mention his flaw"
  - "Use evidence from the episode"
explanation: "A balanced answer uses evidence for both the admirable trait and the flaw."
hint: "Use this frame: Dorian is ___ because ___, but ___."
questionGoal: "Produce a balanced character explanation."
misconception: "Letting one trait erase the rest of the character."
```

### Lesson 4: Cost, Reward, And Return

```question
key: u04_l04_q01_cost_reward_match
type: match-pairs
prompt: "Match each ending idea to its meaning in a heroic journey."
pairs:
  - left: "Reward"
    right: "What is gained"
  - left: "Cost"
    right: "What is lost, risked, or learned the hard way"
  - left: "Return"
    right: "The hero comes back with change or news"
  - left: "Community change"
    right: "How others are affected by the journey"
explanation: "A journey ending may include more than winning a prize."
hint: "Ask what is gained, what is hard, and who is changed."
questionGoal: "Distinguish cost, reward, return, and community change."
misconception: "Thinking only treasure matters at the end of a quest."
```

```question
key: u04_l04_q02_reward_and_cost
type: passage-question
prompt: "Read the journey ending and answer."
passageTitle: "Maia Returns"
passage: |
  Maia brought the laurel branch back before dawn, and the city gates opened. Her lamp was cracked, and her hands were scratched from the rocky path, but the people could leave safely.
question: "What is the reward or good result of Maia's journey?"
choices:
  - "The city gates open and the people can leave safely."
  - "Maia's lamp is cracked."
  - "The path is rocky."
  - "The fog returns."
correctAnswer: "The city gates open and the people can leave safely."
explanation: "The good result is that Maia's quest helps the city."
hint: "Look for what is gained because Maia completes the quest."
questionGoal: "Identify the reward or positive outcome in a journey ending."
misconception: "Confusing cost with reward."
```

```question
key: u04_l04_q03_reward_not_treasure
type: multiple-choice
prompt: "Which choice best explains reward in a quest?"
choices:
  - "A reward can be safety, knowledge, help for others, or treasure."
  - "A reward is only gold."
  - "A reward means nothing hard happened."
  - "A reward must be something the hero keeps alone."
correctAnswer: "A reward can be safety, knowledge, help for others, or treasure."
explanation: "Rewards in heroic tales are often meaningful results, not only objects."
hint: "Think about what Maia gained for the city."
questionGoal: "Expand understanding of quest reward."
misconception: "Reducing reward to treasure."
```

```question
key: u04_l04_q04_return_order
type: order-items
prompt: "Put Maia's ending in order."
items:
  - "The city gates open."
  - "Maia brings back the laurel branch."
  - "The people can leave safely."
  - "Maia travels the rocky path before dawn."
correctOrder:
  - "Maia travels the rocky path before dawn."
  - "Maia brings back the laurel branch."
  - "The city gates open."
  - "The people can leave safely."
explanation: "The return matters because Maia brings back what the city needs."
hint: "Start with the journey, then the return, then the result."
questionGoal: "Sequence cost, return, and community outcome."
misconception: "Treating the return as just a location change."
```

```question
key: u04_l04_q05_cost_blank
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "A"
sentenceAfter: "is what a character loses, risks, or learns the hard way."
choices:
  - "cost"
  - "rhyme"
  - "title"
  - "speaker"
correctAnswer: "cost"
explanation: "A cost is what is hard, risky, or lost in the journey."
hint: "Think about Maia's cracked lamp and scratched hands."
questionGoal: "Use cost vocabulary accurately."
misconception: "Assuming a successful quest has no cost."
```

```question
key: u04_l04_q06_cost_reward_explain
type: constructed-response
prompt: "Explain in one sentence one reward and one cost in Maia's journey."
minWords: 12
sampleAnswer: "The reward is that the city gates open, and the cost is Maia's cracked lamp and scratched hands."
checklist:
  - "Name one reward"
  - "Name one cost"
  - "Use evidence from the passage"
explanation: "A strong ending explanation notices both what is gained and what is difficult."
hint: "Use this frame: The reward is ___, and the cost is ___."
questionGoal: "Produce a cost-and-reward explanation."
misconception: "Naming only the happy result or only the hardship."
```

## Unit 5: Poetry, Sound, And Image

### Lesson 1: Lines, Stanzas, And Sound

```question
key: u05_l01_q01_line_identify
type: passage-question
prompt: "Read the short poem and answer."
passageTitle: "Morning Bell"
passage: |
  The morning bell is ringing,
  Its silver voice is clear.
  The sleepy streets are waking,
  And daylight gathers near.
question: "How many lines are in the poem?"
choices:
  - "4"
  - "2"
  - "1"
  - "8"
correctAnswer: "4"
explanation: "Each row of words is one line, so this poem has four lines."
hint: "Count each row of poem words."
questionGoal: "Identify lines in a short poem."
misconception: "Counting sentences or punctuation instead of lines."
```

```question
key: u05_l01_q02_stanza_definition
type: multiple-choice
prompt: "What is a stanza?"
choices:
  - "A group of lines in a poem"
  - "The problem in a fable"
  - "A character's flaw"
  - "A quest reward"
correctAnswer: "A group of lines in a poem"
explanation: "A stanza is a group of poem lines, like a paragraph is a group of prose sentences."
hint: "Think about how a poem is arranged on the page."
questionGoal: "Define stanza at an introductory level."
misconception: "Confusing poem-form vocabulary with story vocabulary."
```

```question
key: u05_l01_q03_poetry_terms
type: match-pairs
prompt: "Match each poetry term to its meaning."
pairs:
  - left: "Line"
    right: "One row of words in a poem"
  - left: "Stanza"
    right: "A group of poem lines"
  - left: "Sound"
    right: "What the words are like when heard"
  - left: "Poem"
    right: "Concentrated language arranged for sound and meaning"
explanation: "These terms help readers talk about the visible and audible shape of poetry."
hint: "Line and stanza are about arrangement; sound is about hearing."
questionGoal: "Connect basic poetry terms to definitions."
misconception: "Treating all poetry terms as interchangeable labels."
```

```question
key: u05_l01_q04_sound_feature
type: multiple-choice
prompt: "Which words from 'The morning bell is ringing' help you hear sound?"
choices:
  - '"bell" and "ringing"'
  - '"morning" and "daylight"'
  - '"streets" and "near"'
  - '"sleepy" and "clear"'
correctAnswer: '"bell" and "ringing"'
explanation: "Bell and ringing directly suggest a sound the reader can imagine hearing."
hint: "Choose the words that name something heard."
questionGoal: "Notice an audible detail in a poem line."
misconception: "Looking only for visual details when asked about sound."
```

```question
key: u05_l01_q05_poem_arrangement_blank
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "A poem is often arranged in lines so readers can see and"
sentenceAfter: "the language carefully."
choices:
  - "hear"
  - "hide"
  - "divide"
  - "erase"
correctAnswer: "hear"
explanation: "Poetry is often meant to be heard as well as seen."
hint: "Poetry uses sound."
questionGoal: "Connect poem arrangement to oral language."
misconception: "Thinking poetry is only page decoration."
```

```question
key: u05_l01_q06_poem_shape_explain
type: constructed-response
prompt: "Explain in one sentence how lines help a reader notice a poem."
minWords: 10
sampleAnswer: "Lines help a reader slow down and hear the poem's words and sounds."
checklist:
  - "Mention lines"
  - "Mention seeing, hearing, or slowing down"
  - "Connect to the poem"
explanation: "Lines shape how a poem is seen and heard."
hint: "Use this frame: Lines help readers ___."
questionGoal: "Explain the purpose of poetic line arrangement."
misconception: "Seeing lines as random breaks."
```

### Lesson 2: Repetition And Rhyme Help Memory

```question
key: u05_l02_q01_rhyme_match
type: match-pairs
prompt: "Match each word to a rhyming word."
pairs:
  - left: "clear"
    right: "near"
  - left: "light"
    right: "bright"
  - left: "stone"
    right: "alone"
  - left: "sing"
    right: "ring"
explanation: "Rhyming words have ending sounds that match or nearly match."
hint: "Say the words aloud and listen to the ending sounds."
questionGoal: "Recognize simple rhyme pairs."
misconception: "Matching words by meaning instead of sound."
```

```question
key: u05_l02_q02_repeated_line
type: passage-question
prompt: "Read the chant and answer."
passageTitle: "Road Chant"
passage: |
  Step by step, the road is long.
  Step by step, we sing our song.
  Step by step, the hill grows near.
question: "Which words are repeated?"
choices:
  - "Step by step"
  - "hill grows"
  - "sing our"
  - "road is"
correctAnswer: "Step by step"
explanation: "The repeated words make the chant steady and memorable."
hint: "Look at the beginning of each line."
questionGoal: "Identify repeated words in an oral-language passage."
misconception: "Missing repeated words because they appear in different lines."
```

```question
key: u05_l02_q03_repetition_purpose_poem
type: multiple-choice
prompt: "How can repetition help a poem or chant?"
choices:
  - "It can make a word or idea easier to remember."
  - "It always means the writer made a mistake."
  - "It removes all meaning from the line."
  - "It turns every poem into a fable."
correctAnswer: "It can make a word or idea easier to remember."
explanation: "Repeated words can create emphasis, rhythm, and memory."
hint: "Think about why a chant repeats words."
questionGoal: "Explain one purpose of repetition in oral language."
misconception: "Treating repetition as accidental filler."
```

```question
key: u05_l02_q04_rhyme_blank
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "Words that have matching ending sounds"
sentenceAfter: "."
choices:
  - "rhyme"
  - "argue"
  - "transform"
  - "compare"
correctAnswer: "rhyme"
explanation: "Rhyme is based on sound, especially ending sound."
hint: "Say the words aloud and listen."
questionGoal: "Use rhyme vocabulary accurately."
misconception: "Defining rhyme by spelling or meaning alone."
```

```question
key: u05_l02_q05_repetition_effect
type: passage-question
prompt: "Read the chant again and answer."
passageTitle: "Road Chant"
passage: |
  Step by step, the road is long.
  Step by step, we sing our song.
  Step by step, the hill grows near.
question: "What feeling does the repeated phrase most help create?"
choices:
  - "Steady movement"
  - "Sudden silence"
  - "A broken jar"
  - "A secret trick"
correctAnswer: "Steady movement"
explanation: "Step by step repeats like feet moving along a road."
hint: "Think about what the repeated words sound like."
questionGoal: "Connect repetition to mood or movement."
misconception: "Identifying repetition without thinking about its effect."
```

```question
key: u05_l02_q06_repetition_explain
type: constructed-response
prompt: "In one sentence, explain why 'Step by step' is repeated in the chant."
minWords: 10
sampleAnswer: "Step by step is repeated to make the chant feel steady and easy to remember."
checklist:
  - "Mention the repeated phrase"
  - "Explain memory, rhythm, emphasis, or steady movement"
  - "Use evidence from the chant"
explanation: "The repeated phrase shapes how the chant sounds and feels."
hint: "Use this frame: The phrase is repeated to ___."
questionGoal: "Explain the effect of repeated words."
misconception: "Calling repetition decorative without meaning."
```

### Lesson 3: Images, Similes, And Personification

```question
key: u05_l03_q01_feature_match
type: match-pairs
prompt: "Match each feature to an example."
pairs:
  - left: "Image"
    right: "gold leaves shining in the sun"
  - left: "Simile"
    right: "quiet as a sleeping lake"
  - left: "Personification"
    right: "the moon watched the road"
  - left: "Literal statement"
    right: "the road was made of stone"
explanation: "Images help readers picture; similes compare with like or as; personification gives human action to something nonhuman."
hint: "Look for picture words, like/as, and human action."
questionGoal: "Distinguish image, simile, personification, and literal statement."
misconception: "Reading every vivid line as the same kind of feature."
```

```question
key: u05_l03_q02_simile_meaning
type: multiple-choice
prompt: "What does 'quiet as a sleeping lake' help the reader imagine?"
choices:
  - "Deep stillness"
  - "A loud thunderstorm"
  - "A running race"
  - "A broken gate"
correctAnswer: "Deep stillness"
explanation: "The simile compares quietness to a lake that seems asleep and still."
hint: "Ask what quality the comparison shares."
questionGoal: "Interpret a simple simile without taking it literally."
misconception: "Thinking a simile means the thing literally becomes something else."
```

```question
key: u05_l03_q03_personification_line
type: passage-question
prompt: "Read the lines and answer."
passageTitle: "Night Road"
passage: |
  The moon watched over the road.
  The wind whispered through the pine trees.
question: "Which line gives a human action to something nonhuman?"
choices:
  - "The moon watched over the road."
  - "The road was made of dirt."
  - "A traveler carried a lamp."
  - "The hill stood near the town."
correctAnswer: "The moon watched over the road."
explanation: "The moon cannot literally watch, so the line uses personification."
hint: "Find the nonhuman thing doing a human action."
questionGoal: "Identify personification in a short poetic line."
misconception: "Reading personification as literal fact."
```

```question
key: u05_l03_q04_image_blank
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "An"
sentenceAfter: "uses words that help the reader picture, hear, or sense something."
choices:
  - "image"
  - "outcome"
  - "criterion"
  - "dialogue"
correctAnswer: "image"
explanation: "An image is language that creates a sensory picture or impression."
hint: "Think of a word picture."
questionGoal: "Use image vocabulary accurately."
misconception: "Thinking image only means a printed illustration."
```

```question
key: u05_l03_q05_simile_parts
type: multi-blank-cloze
prompt: "Complete the simile explanation."
parts:
  - "In 'brave like a lion,' the word "
  - " shows a comparison, and the shared quality is "
  - "."
blanks:
  - correctAnswer: "like"
    choices:
      - "like"
      - "because"
      - "under"
  - correctAnswer: "bravery"
    choices:
      - "bravery"
      - "rhyming"
      - "setting"
explanation: "A simile often uses like or as to compare one quality."
hint: "Find the comparison word and ask what trait is shared."
questionGoal: "Identify the comparison marker and shared quality in a simile."
misconception: "Spotting like without understanding the comparison."
```

```question
key: u05_l03_q06_image_explain
type: constructed-response
prompt: "Explain the image in this line: 'Gold leaves flickered like little torches.'"
minWords: 10
sampleAnswer: "The line helps me picture bright yellow leaves moving like small flames."
checklist:
  - "Mention what you picture"
  - "Explain the comparison to torches"
  - "Avoid saying the leaves are literally fire"
explanation: "The line uses image and simile to create a bright, moving picture."
hint: "Use this frame: I picture ___ because ___."
questionGoal: "Explain a vivid image and simile in age-appropriate language."
misconception: "Literalizing figurative language."
```

### Lesson 4: Speaker, Mood, And Recitation

```question
key: u05_l04_q01_speaker_identify
type: passage-question
prompt: "Read the short poem and answer."
passageTitle: "At The Gate"
passage: |
  I hold the lamp and wait tonight,
  I hear the city call.
  Though shadows lean across the path,
  I will not let it fall.
question: "Who is the speaker most likely to be?"
choices:
  - "A character holding a lamp near the city"
  - "The author speaking directly as a teacher"
  - "A fox stealing cheese"
  - "The author explaining vocabulary"
correctAnswer: "A character holding a lamp near the city"
explanation: "The speaker says 'I hold the lamp' and describes waiting near the city."
hint: "Look at what the speaker says I do."
questionGoal: "Infer speaker from first-person poem evidence."
misconception: "Assuming the speaker is always the author."
```

```question
key: u05_l04_q02_mood_choice
type: multiple-choice
prompt: "Which mood best fits the poem 'At The Gate'?"
choices:
  - "Brave and watchful"
  - "Silly and careless"
  - "Sleepy and bored"
  - "Cruel and mocking"
correctAnswer: "Brave and watchful"
explanation: "The speaker waits with a lamp and says, 'I will not let it fall,' which sounds brave and watchful."
hint: "Use the speaker's words as evidence."
questionGoal: "Infer mood from word choice and speaker action."
misconception: "Choosing mood from personal preference instead of text evidence."
```

```question
key: u05_l04_q03_mood_evidence_match
type: match-pairs
prompt: "Match each mood to the best evidence."
pairs:
  - left: "Brave"
    right: "I will not let it fall"
  - left: "Quiet"
    right: "soft snow covered the road"
  - left: "Joyful"
    right: "we laughed and sang at dawn"
  - left: "Lonely"
    right: "no footsteps answered mine"
explanation: "Mood should be supported by words or images in the text."
hint: "Ask which words create each feeling."
questionGoal: "Connect mood labels to textual evidence."
misconception: "Treating mood as a guess without evidence."
```

```question
key: u05_l04_q04_speaker_blank
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "The"
sentenceAfter: "is the voice that says the words in a poem."
choices:
  - "speaker"
  - "setting"
  - "outcome"
  - "moral"
correctAnswer: "speaker"
explanation: "The speaker is the voice of the poem, which may or may not be the author."
hint: "Who is saying the poem's words?"
questionGoal: "Use speaker vocabulary accurately."
misconception: "Confusing speaker with author or narrator in every case."
```

```question
key: u05_l04_q05_recitation_choice
type: multiple-choice
prompt: "Which recitation choice best fits the line 'I will not let it fall'?"
choices:
  - "Say it steadily and firmly."
  - "Mumble it as fast as possible."
  - "Whisper it like a joke."
  - "Skip the line because it is repeated."
correctAnswer: "Say it steadily and firmly."
explanation: "The line shows resolve, so a steady, firm voice fits the meaning."
hint: "Match the voice to the speaker's feeling."
questionGoal: "Connect oral reading choice to mood and meaning."
misconception: "Thinking recitation means speed rather than sense."
```

```question
key: u05_l04_q06_speaker_mood_explain
type: constructed-response
prompt: "Explain in one sentence why 'brave and watchful' fits the speaker of 'At The Gate.'"
minWords: 12
sampleAnswer: "Brave and watchful fits because the speaker holds a lamp in the dark and will not let it fall."
checklist:
  - "Name the mood"
  - "Use evidence from the poem"
  - "Mention the speaker"
explanation: "A mood answer is strongest when it points to words from the poem."
hint: "Use this frame: The mood fits because ___."
questionGoal: "Produce an evidence-based mood explanation."
misconception: "Explaining mood without citing a word or action."
```

## Unit 6: Dialogue, Comparison, And Final Transfer

### Lesson 1: Narrator, Speaker, And Dialogue

```question
key: u06_l01_q01_narrator_identify
type: passage-question
prompt: "Read the passage and answer."
passageTitle: "At The Well"
passage: |
  The goat peered into the well. "Is the water sweet?" she asked. The fox smiled from below and said, "Sweeter than summer rain."
question: "Which words are narration rather than dialogue?"
choices:
  - "The goat peered into the well."
  - "Is the water sweet?"
  - "Sweeter than summer rain."
  - "The quoted words only"
correctAnswer: "The goat peered into the well."
explanation: "Narration tells what happens. Dialogue is what a character says."
hint: "Look for the words outside quotation marks."
questionGoal: "Distinguish narration from dialogue."
misconception: "Thinking every sentence in a passage is dialogue."
```

```question
key: u06_l01_q02_line_to_speaker
type: match-pairs
prompt: "Match each line to who says or tells it."
pairs:
  - left: "Is the water sweet?"
    right: "Goat"
  - left: "Sweeter than summer rain."
    right: "Fox"
  - left: "The goat peered into the well."
    right: "Narrator"
  - left: "The fox smiled from below."
    right: "Narrator describing action"
explanation: "Dialogue belongs to characters; narration tells the action."
hint: "Use quotation marks and speaker tags."
questionGoal: "Track speaker and narrator roles in a short passage."
misconception: "Confusing narrator action with a character's spoken line."
```

```question
key: u06_l01_q03_dialogue_blank
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "Words spoken by characters are called"
sentenceAfter: "."
choices:
  - "dialogue"
  - "setting"
  - "moral"
  - "stanza"
correctAnswer: "dialogue"
explanation: "Dialogue is character speech."
hint: "Think of characters talking."
questionGoal: "Use dialogue vocabulary accurately."
misconception: "Confusing dialogue with narration or poem form."
```

```question
key: u06_l01_q04_narrator_not_speaker
type: multiple-choice
prompt: "Why is the narrator not always the same as a character speaker?"
choices:
  - "The narrator can tell the action while characters speak separate lines."
  - "The narrator is always the villain."
  - "Characters never speak in stories."
  - "Quotation marks always name the author."
correctAnswer: "The narrator can tell the action while characters speak separate lines."
explanation: "A story can have a narrating voice plus different character voices."
hint: "Think about the difference between telling and talking."
questionGoal: "Clarify narrator versus character speaker."
misconception: "Merging all voices in a passage into one speaker."
```

```question
key: u06_l01_q05_voice_labels
type: multi-blank-cloze
prompt: "Complete the labels."
parts:
  - "\"Is the water sweet?\" is spoken by the "
  - ". \"The fox smiled from below\" is told by the "
  - "."
blanks:
  - correctAnswer: "goat"
    choices:
      - "goat"
      - "narrator"
      - "stanza"
  - correctAnswer: "narrator"
    choices:
      - "narrator"
      - "moral"
      - "rhyme"
explanation: "The quoted question is character speech; the action sentence is narration."
hint: "Use quotation marks for the first blank and action-telling for the second."
questionGoal: "Apply speaker/narrator labels to passage lines."
misconception: "Labeling quoted and unquoted language the same way."
```

```question
key: u06_l01_q06_voice_explain
type: constructed-response
prompt: "In one sentence, explain how quotation marks help you find dialogue."
minWords: 10
sampleAnswer: "Quotation marks often show the exact words a character says, which helps me find dialogue."
checklist:
  - "Mention quotation marks"
  - "Mention character words or speech"
  - "Use dialogue"
explanation: "Quotation marks are a clue, but readers still use speaker tags and context."
hint: "Use this frame: Quotation marks help because ___."
questionGoal: "Explain a strategy for finding dialogue."
misconception: "Using punctuation without checking who speaks."
```

### Lesson 2: Dialogue Shows Character

```question
key: u06_l02_q01_dialogue_reveals
type: passage-question
prompt: "Read the passage and answer."
passageTitle: "The Lantern"
passage: |
  Livia held out the lantern. "Take it," she said. "The path is dark, and I know you are afraid." Tomas looked at the ground and whispered, "I will bring it back before dawn."
question: "What does Livia's dialogue show?"
choices:
  - "She notices Tomas's fear and wants to help."
  - "She wants to hide the lantern forever."
  - "She has forgotten who Tomas is."
  - "She is describing a stanza."
correctAnswer: "She notices Tomas's fear and wants to help."
explanation: "Livia offers the lantern because the path is dark and she knows Tomas is afraid."
hint: "Ask what her spoken words reveal about her choice."
questionGoal: "Use dialogue as evidence for character action."
misconception: "Treating dialogue as filler instead of evidence."
```

```question
key: u06_l02_q02_best_next_line
type: dialogue-builder
prompt: "Choose the line that best fits Tomas after Livia gives him the lantern."
turns:
  - speaker: "Livia"
    line: "Take it. The path is dark, and I know you are afraid."
  - speaker: "Tomas"
    line: "I will bring it back before dawn."
choices:
  - "Thank you. I will use it carefully."
  - "I will keep it and never bring it back."
  - "Let us forget the path and count rhymes."
  - "I never heard you speak."
correctAnswer: "Thank you. I will use it carefully."
explanation: "This line fits Tomas's promise and shows a careful response to help."
hint: "Choose the line that responds to the lantern and the promise."
questionGoal: "Select dialogue that fits character and situation."
misconception: "Choosing a line for randomness rather than story fit."
```

```question
key: u06_l02_q03_character_inference
type: multiple-choice
prompt: "What can Tomas's words 'I will bring it back before dawn' suggest?"
choices:
  - "He intends to be responsible with the lantern."
  - "He thinks the lantern is a bird."
  - "He does not know what dawn means."
  - "He is telling a fable moral."
correctAnswer: "He intends to be responsible with the lantern."
explanation: "Tomas promises to return the lantern, which suggests responsibility."
hint: "Look at what he promises to do."
questionGoal: "Infer a trait or intention from dialogue."
misconception: "Ignoring the meaning of a character's spoken promise."
```

```question
key: u06_l02_q04_line_trait_match
type: match-pairs
prompt: "Match each line of dialogue to what it may show."
pairs:
  - left: "\"Take it; the path is dark.\""
    right: "Helpful"
  - left: "\"I will bring it back before dawn.\""
    right: "Responsible"
  - left: "\"I can do it alone; I need no map.\""
    right: "Proud"
  - left: "\"Please show me the safe road.\""
    right: "Willing to learn"
explanation: "Dialogue can reveal traits, choices, or conflicts."
hint: "Ask what each speaker's words show about the speaker."
questionGoal: "Connect dialogue lines to character traits."
misconception: "Matching traits without using words as evidence."
```

```question
key: u06_l02_q05_dialogue_as_action_blank
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "Dialogue can show a character's"
sentenceAfter: ", conflict, or choice."
choices:
  - "trait"
  - "page margin"
  - "chapter number"
  - "cover color"
correctAnswer: "trait"
explanation: "Dialogue often reveals what a character is like."
hint: "A character can be helpful, proud, brave, or careful."
questionGoal: "Use dialogue-analysis vocabulary."
misconception: "Thinking dialogue only reports sound."
```

```question
key: u06_l02_q06_dialogue_evidence_explain
type: constructed-response
prompt: "Explain in one sentence how Livia's words show she is helpful."
minWords: 12
sampleAnswer: "Livia is helpful because she offers Tomas the lantern when the path is dark."
checklist:
  - "Name Livia as helpful"
  - "Use her dialogue as evidence"
  - "Use because"
explanation: "The spoken words are evidence because they show Livia choosing to help."
hint: "Use this frame: Livia is helpful because she says ___."
questionGoal: "Produce an evidence-based dialogue inference."
misconception: "Stating a trait without evidence from the line."
```

### Lesson 3: A Drama Excerpt Is A Scene

```question
key: u06_l03_q01_scene_parts_match
type: match-pairs
prompt: "Match each drama term to its meaning."
pairs:
  - left: "Character name"
    right: "Shows who speaks a line"
  - left: "Stage direction"
    right: "Tells an action or how something is done"
  - left: "Scene"
    right: "A small part of a play's action"
  - left: "Line"
    right: "Words a character speaks"
explanation: "A drama excerpt is built from character names, lines, and stage directions."
hint: "Think about what helps actors know who speaks and what to do."
questionGoal: "Identify basic drama-part vocabulary."
misconception: "Thinking drama is just prose with quotation marks."
```

```question
key: u06_l03_q02_stage_direction
type: passage-question
prompt: "Read the short scene and answer."
passageTitle: "At The Shrine"
passage: |
  MAIA: The fog is too thick.
  SHEPHERD: Ring the bell and listen.
  [Maia rings the bell. A clear note echoes.]
  MAIA: I hear the path now.
question: "Which part is a stage direction?"
choices:
  - "[Maia rings the bell. A clear note echoes.]"
  - "MAIA: The fog is too thick."
  - "SHEPHERD: Ring the bell and listen."
  - "MAIA: I hear the path now."
correctAnswer: "[Maia rings the bell. A clear note echoes.]"
explanation: "The bracketed words tell action and sound instead of giving a spoken line."
hint: "Look for the part that tells what happens onstage."
questionGoal: "Identify a stage direction in a brief drama excerpt."
misconception: "Treating every line in a scene as spoken dialogue."
```

```question
key: u06_l03_q03_scene_next_line
type: dialogue-builder
prompt: "Choose the line that best continues the scene."
turns:
  - speaker: "MAIA"
    line: "The fog is too thick."
  - speaker: "SHEPHERD"
    line: "Ring the bell and listen."
  - speaker: "MAIA"
    line: "I hear the path now."
choices:
  - "Then I will follow the sound carefully."
  - "Then I will stand still and stop listening."
  - "Then I will tell the shepherd the bell is useless."
  - "I will ignore the path forever."
correctAnswer: "Then I will follow the sound carefully."
explanation: "The line fits Maia hearing the path and choosing to continue."
hint: "Choose the line that follows from the stage direction and Maia's discovery."
questionGoal: "Select dialogue that fits dramatic action."
misconception: "Choosing a line unrelated to the scene conflict."
```

```question
key: u06_l03_q04_stage_direction_matters
type: multiple-choice
prompt: "Why does the stage direction '[Maia rings the bell. A clear note echoes.]' matter?"
choices:
  - "It shows the action that helps Maia find the path."
  - "It gives a fable moral about foxes."
  - "It repeats a character name but adds no action."
  - "It removes all conflict from the scene before it begins."
correctAnswer: "It shows the action that helps Maia find the path."
explanation: "The stage direction explains what Maia does and what she hears."
hint: "Ask what changes after the direction."
questionGoal: "Explain how a stage direction contributes to dramatic meaning."
misconception: "Skipping stage directions as unimportant."
```

```question
key: u06_l03_q05_scene_blank
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "A short part of dramatic action is a"
sentenceAfter: "."
choices:
  - "scene"
  - "moral"
  - "simile"
  - "quest reward"
correctAnswer: "scene"
explanation: "A scene is a small part of a play or drama excerpt."
hint: "Drama is made of scenes."
questionGoal: "Use scene vocabulary accurately."
misconception: "Confusing drama structure with story lesson vocabulary."
```

```question
key: u06_l03_q06_scene_explain
type: constructed-response
prompt: "Explain in one sentence how the stage direction changes your understanding of Maia's scene."
minWords: 12
sampleAnswer: "The stage direction shows Maia rings the bell, so I understand how she finds the path."
checklist:
  - "Mention the stage direction"
  - "Explain the action"
  - "Connect it to understanding the scene"
explanation: "Stage directions are part of the meaning because they show actions, sounds, and movement."
hint: "Use this frame: The stage direction helps because ___."
questionGoal: "Produce an explanation of stage-direction meaning."
misconception: "Reading only spoken lines and missing action."
```

### Lesson 4: Compare, Then Transfer

```question
key: u06_l04_q01_transfer_sequence
type: order-items
prompt: "Read the new passage summary and put the main events in order: A child carries a lamp to a bridge. Wind blows the lamp out. The child remembers a song and follows the river sound home."
items:
  - "The child follows the river sound home."
  - "The wind blows the lamp out."
  - "The child carries a lamp to a bridge."
  - "The child remembers a song."
correctOrder:
  - "The child carries a lamp to a bridge."
  - "The wind blows the lamp out."
  - "The child remembers a song."
  - "The child follows the river sound home."
explanation: "A transfer retell still begins with the setup, follows the problem, and ends with the outcome."
hint: "Start with the journey, then the problem, then the remembered help."
questionGoal: "Apply retelling sequence to a new short passage."
misconception: "Forgetting sequence skills in a mixed final task."
```

```question
key: u06_l04_q02_transfer_pattern
type: passage-question
prompt: "Read the new passage and answer."
passageTitle: "The River Song"
passage: |
  Nera carried a lamp to the old bridge. The wind blew out the flame, and the road disappeared in darkness. Then Nera remembered the river song her grandmother had taught her: "Follow the water, steady and clear." She listened, followed the sound, and found her way home.
question: "Which Level 1 pattern best helps explain this passage?"
choices:
  - "A journey with an obstacle and remembered help"
  - "A poem pattern where rhyme matters more than events"
  - "A fable about a fox and cheese"
  - "A name list that should be memorized before reading"
correctAnswer: "A journey with an obstacle and remembered help"
explanation: "Nera travels, faces darkness as an obstacle, remembers the song, and returns home."
hint: "Look for goal, obstacle, help, and outcome."
questionGoal: "Select a useful Level 1 pattern for a new passage."
misconception: "Choosing a familiar old unit label instead of the pattern that fits."
```

```question
key: u06_l04_q03_character_choice
type: passage-question
prompt: "Read the new passage and answer."
passageTitle: "The River Song"
passage: |
  Nera carried a lamp to the old bridge. The wind blew out the flame, and the road disappeared in darkness. Then Nera remembered the river song her grandmother had taught her: "Follow the water, steady and clear." She listened, followed the sound, and found her way home.
question: "What choice helps Nera solve the problem?"
choices:
  - "She listens for the river and follows the sound."
  - "She throws the lamp into the river."
  - "She mocks the song."
  - "She opens a sealed jar."
correctAnswer: "She listens for the river and follows the sound."
explanation: "Nera uses the remembered song as help when the lamp goes out."
hint: "Find the action after she remembers the song."
questionGoal: "Connect character choice to outcome in a new passage."
misconception: "Choosing a dramatic but unsupported action."
```

```question
key: u06_l04_q04_comparison_criterion_final
type: multiple-choice
prompt: "You want to compare Nera's passage with Maia's quest. Which criterion would work best?"
choices:
  - "How each character finds help when the path is difficult"
  - "Which passage uses more lines of dialogue"
  - "Which story includes a fox stealing cheese"
  - "Whether both passages have exactly the same setting"
correctAnswer: "How each character finds help when the path is difficult"
explanation: "Both passages include a difficult path and a form of help: a bell for Maia and a song for Nera."
hint: "Choose a feature that appears in both passages."
questionGoal: "Choose a meaningful comparison criterion for transfer."
misconception: "Selecting a criterion that is absent or trivial."
```

```question
key: u06_l04_q05_toolkit_match
type: match-pairs
prompt: "Match each reader's-toolkit move to evidence from Nera's passage."
pairs:
  - left: "Retell key event"
    right: "The wind blows out the lamp"
  - left: "Find a helper"
    right: "The remembered river song guides Nera"
  - left: "Notice repeated language"
    right: "Follow the water, steady and clear"
  - left: "Name the outcome"
    right: "Nera finds her way home"
explanation: "The final transfer task asks students to choose useful tools from across the level."
hint: "Match each reading move to the detail that best supports it."
questionGoal: "Apply multiple Level 1 reading moves to one new passage."
misconception: "Using only one familiar skill for every final question."
```

```question
key: u06_l04_q06_final_transfer_response
type: constructed-response
prompt: "Write two sentences: first compare Nera and Maia using the help-on-the-path criterion; then explain what Nera's passage shows about listening carefully."
minWords: 22
sampleAnswer: "Both Nera and Maia find help when the path is difficult: Maia uses a bell, and Nera follows a remembered song. Nera's passage shows that listening carefully can help someone choose the safe way."
checklist:
  - "Compare Nera and Maia with one criterion"
  - "Include evidence from both passages"
  - "Explain a lesson or idea from Nera's passage"
explanation: "This response uses comparison, evidence, character choice, and lesson reasoning together."
hint: "Use this frame: Both characters ___; Maia ___, while Nera ___. Nera's passage shows ___."
questionGoal: "Demonstrate cumulative transfer with comparison and interpretation."
misconception: "Writing two summaries without a criterion or evidence."
```
