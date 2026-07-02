# French 1 Question Sets

Sources: accepted French 1 blueprint, course map, unit design briefs, and lesson briefs in `research/french-1/`.

## Unit 1: First French For Real Interaction

### Lesson 1: Bonjour, Salut, And Goodbye

Students choose greetings and farewells that fit simple social situations.

```question
key: u01_l01_q01_teacher_greeting
type: multiple-choice
prompt: "You walk into class and greet your French teacher. Which phrase fits best?"
choices:
  - "Bonjour."
  - "Salut."
  - "Au revoir."
  - "À bientôt."
correctAnswer: "Bonjour."
explanation: "Bonjour is a safe, polite greeting for a teacher or adult."
hint: "Think about which greeting is more polite and works with an adult."
questionGoal: "Check whether the student can choose a formal-friendly greeting."
misconception: "Treating salut and bonjour as identical in every situation."
```

```question
key: u01_l01_q02_friend_greeting
type: dialogue-builder
prompt: "Choose the best next line."
turns:
  - speaker: "Maya"
    line: "Salut, Léo!"
choices:
  - "Salut, Maya!"
  - "Au revoir, Maya!"
  - "Merci, Maya!"
  - "Je ne comprends pas, Maya!"
correctAnswer: "Salut, Maya!"
explanation: "Salut is an informal greeting, so another friendly greeting fits."
hint: "Maya is saying hello, not goodbye."
questionGoal: "Recognize an informal greeting exchange."
misconception: "Using a farewell or repair phrase as a greeting."
```

```question
key: u01_l01_q03_match_greetings
type: match-pairs
prompt: "Match each French phrase to its meaning."
pairs:
  - left: "bonjour"
    right: "hello / good day"
  - left: "salut"
    right: "hi"
  - left: "au revoir"
    right: "goodbye"
  - left: "à bientôt"
    right: "see you soon"
explanation: "These are the first phrases that open and close simple exchanges."
hint: "Separate the hello phrases from the goodbye phrases first."
questionGoal: "Build recognition of common greetings and farewells."
misconception: "Mixing up greetings and farewells because they are all social phrases."
```

```question
key: u01_l01_q04_end_exchange
type: multiple-choice
prompt: "Your friend is leaving, but you expect to see them again soon. Which phrase fits?"
choices:
  - "À bientôt!"
  - "Bonjour!"
  - "Comment ça va?"
  - "Je m'appelle."
correctAnswer: "À bientôt!"
explanation: "À bientôt means see you soon, so it fits when someone is leaving and you will meet again."
hint: "Look for the phrase that points to later, not the start of the conversation."
questionGoal: "Choose a farewell that fits a specific situation."
misconception: "Using a greeting when the interaction is ending."
```

```question
key: u01_l01_q05_order_greeting_exchange
type: order-items
prompt: "Maya says hello first, then Léo replies. Maya says goodbye first, then Léo replies. Put the exchange in order."
items:
  - "Au revoir, Léo."
  - "Bonjour, Maya."
  - "Bonjour, Léo."
  - "Au revoir, Maya."
correctOrder:
  - "Bonjour, Léo."
  - "Bonjour, Maya."
  - "Au revoir, Léo."
  - "Au revoir, Maya."
explanation: "A short exchange opens with greetings and closes with farewells. Maya addresses Léo first in both the hello and goodbye lines."
hint: "Start with the hello lines, then end with the goodbye lines."
questionGoal: "Sequence a simple opening and closing exchange."
misconception: "Treating social phrases as interchangeable regardless of order."
```

```question
key: u01_l01_q06_say_greeting
type: text-input
prompt: "Type the French for Hello. Goodbye."
acceptedAnswers:
  - "Bonjour. Au revoir."
  - "Bonjour au revoir"
answerType: text
explanation: "Bonjour opens the exchange, and au revoir closes it."
hint: "Use one hello phrase and one goodbye phrase."
questionGoal: "Produce a constrained greeting and farewell."
misconception: "Thinking beginning communication must be long to count."
```

### Lesson 2: Polite Words And Classroom Survival

Students use politeness, directions, and repair phrases to participate in lessons.

```question
key: u01_l02_q01_please_phrase
type: multiple-choice
prompt: "Which phrase means please?"
choices:
  - "s'il vous plaît"
  - "merci"
  - "pardon"
  - "écoutez"
correctAnswer: "s'il vous plaît"
explanation: "S'il vous plaît is the polite phrase for please."
hint: "This phrase is often added to a request."
questionGoal: "Recognize the main polite request phrase."
misconception: "Confusing polite words that have different jobs."
```

```question
key: u01_l02_q02_match_classroom_phrases
type: match-pairs
prompt: "Match each classroom phrase to what it asks you to do."
pairs:
  - left: "écoutez"
    right: "listen"
  - left: "répétez"
    right: "repeat"
  - left: "regardez"
    right: "look"
  - left: "écrivez"
    right: "write"
explanation: "Classroom phrases are useful because they tell you what action to take."
hint: "Picture the action your teacher wants."
questionGoal: "Connect classroom commands to actions."
misconception: "Treating command phrases as labels rather than directions."
```

```question
key: u01_l02_q03_repair_phrase
type: dialogue-builder
prompt: "Choose the best learner response."
turns:
  - speaker: "Teacher"
    line: "Écrivez la phrase."
  - speaker: "Student"
    line: "?"
choices:
  - "Je ne comprends pas."
  - "À bientôt."
  - "Je m'appelle Léo."
  - "Ça va bien."
correctAnswer: "Je ne comprends pas."
explanation: "Je ne comprends pas means I do not understand, so it helps when a direction is unclear."
hint: "Choose the phrase that asks for help with meaning."
questionGoal: "Use a repair phrase when meaning is unclear."
misconception: "Responding with unrelated memorized French instead of a repair phrase."
```

```question
key: u01_l02_q04_polite_request_order
type: order-items
prompt: "Put the words in order to make a polite request: Repeat, please."
items:
  - "vous"
  - "Répétez,"
  - "plaît."
  - "s'il"
correctOrder:
  - "Répétez,"
  - "s'il"
  - "vous"
  - "plaît."
explanation: "Répétez, s'il vous plaît means Repeat, please."
hint: "Start with the action, then add the polite phrase."
questionGoal: "Build a polite classroom request from familiar chunks."
misconception: "Separating s'il vous plaît so the phrase no longer works."
```

```question
key: u01_l02_q05_excuse_or_thanks
type: fill-blank
prompt: "Complete the sentence for bumping into someone politely."
sentenceBefore: ""
sentenceAfter: ", pardon."
choices:
  - "Excusez-moi"
  - "Merci"
  - "Écoutez"
  - "Au revoir"
correctAnswer: "Excusez-moi"
explanation: "Excusez-moi and pardon are used for polite apologies or getting attention."
hint: "Choose the phrase that sounds like asking to be excused."
questionGoal: "Choose a politeness phrase for a small apology."
misconception: "Using thanks or a command when an apology is needed."
```

```question
key: u01_l02_q06_classroom_survival_speak
type: text-input
prompt: "Type the French classroom phrase for I do not understand."
acceptedAnswers:
  - "Je ne comprends pas."
  - "Je ne comprends pas"
answerType: text
explanation: "Je ne comprends pas is a repair phrase that helps when meaning is unclear."
hint: "Use the repair phrase that starts with Je ne..."
questionGoal: "Produce a constrained classroom survival phrase."
misconception: "Thinking confusion means stopping instead of using a repair phrase."
```

### Lesson 3: Comment Ça Va? First Mini-Dialogue

Students build a short greeting and well-being exchange.

```question
key: u01_l03_q01_meaning_comment_ca_va
type: multiple-choice
prompt: "What does Comment ça va? ask?"
choices:
  - "How are you?"
  - "What is your name?"
  - "How old are you?"
  - "Where do you live?"
correctAnswer: "How are you?"
explanation: "Comment ça va? is the common question How are you?"
hint: "Look for the question about how someone is feeling."
questionGoal: "Recognize the meaning of the well-being question."
misconception: "Confusing common personal questions."
```

```question
key: u01_l03_q02_fit_response
type: dialogue-builder
prompt: "Choose the best next line."
turns:
  - speaker: "Nora"
    line: "Bonjour, Malik. Comment ça va?"
choices:
  - "Ça va bien, merci."
  - "Je m'appelle Nora."
  - "Au revoir, Malik."
  - "Répétez, s'il vous plaît."
correctAnswer: "Ça va bien, merci."
explanation: "The question asks how Malik is, so a well-being answer fits."
hint: "Answer the question comment ça va, not a name question."
questionGoal: "Choose a logical response in a first mini-dialogue."
misconception: "Answering with any memorized phrase instead of matching the question."
```

```question
key: u01_l03_q03_match_feelings
type: match-pairs
prompt: "Match each response to its meaning."
pairs:
  - left: "ça va bien"
    right: "I am doing well"
  - left: "ça va mal"
    right: "I am doing badly"
  - left: "comme ci comme ça"
    right: "so-so"
  - left: "merci"
    right: "thank you"
explanation: "These phrases let you answer a basic well-being question."
hint: "Bien is positive, mal is negative, and comme ci comme ça is in the middle."
questionGoal: "Recognize common well-being responses."
misconception: "Treating all ça va responses as the same."
```

```question
key: u01_l03_q04_dialogue_order
type: order-items
prompt: "Put the mini-dialogue in order."
items:
  - "Et toi?"
  - "Bonjour, Aya."
  - "Ça va bien, merci."
  - "Bonjour, Tom. Comment ça va?"
correctOrder:
  - "Bonjour, Aya."
  - "Bonjour, Tom. Comment ça va?"
  - "Ça va bien, merci."
  - "Et toi?"
explanation: "The exchange starts with greetings, then the question, answer, and return question."
hint: "Find the line that first asks comment ça va."
questionGoal: "Sequence a short well-being exchange."
misconception: "Putting the return question before the first answer."
```

```question
key: u01_l03_q05_complete_phrase
type: fill-blank
prompt: "Complete the response: Ça va ___, merci."
sentenceBefore: "Ça va"
sentenceAfter: ", merci."
choices:
  - "bien"
  - "bonjour"
  - "pardon"
  - "écrivez"
correctAnswer: "bien"
explanation: "Ça va bien, merci means I am doing well, thank you."
hint: "Choose the word that means well."
questionGoal: "Complete a common well-being answer."
misconception: "Substituting a social phrase that does not describe how someone is."
```

```question
key: u01_l03_q06_speaking_dialogue
type: text-input
prompt: "Type the French return question for And you?"
acceptedAnswers:
  - "Et toi?"
  - "Et toi"
answerType: text
explanation: "Et toi? keeps the well-being exchange going by asking the other person."
hint: "This two-word phrase starts with Et."
questionGoal: "Produce the reciprocal prompt in a first mini-dialogue."
misconception: "Omitting the return question after answering comment ça va."
```

### Lesson 4: French Sounds You Notice First

Students notice final silent consonants, accents, ç, and liaison exposure in familiar words.

```question
key: u01_l04_q01_final_silent_letter
type: multiple-choice
prompt: "In the word salut, which letter is usually not pronounced?"
choices:
  - "t"
  - "s"
  - "a"
  - "u"
correctAnswer: "t"
explanation: "In salut, the final t is silent in normal pronunciation."
hint: "Look at the last letter."
questionGoal: "Notice a common final silent consonant in a familiar word."
misconception: "Pronouncing every final consonant because it is written."
```

```question
key: u01_l04_q02_cedilla_sound
type: multiple-choice
prompt: "The ç in ça helps the c sound like:"
choices:
  - "s"
  - "k"
  - "sh"
  - "z"
correctAnswer: "s"
explanation: "The cedilla in ç tells you to say an /s/ sound, as in ça."
hint: "Think of the first sound in ça va."
questionGoal: "Identify the basic sound role of ç in a familiar word."
misconception: "Reading ç as a hard c like cat."
```

```question
key: u01_l04_q03_accent_word_match
type: match-pairs
prompt: "Match each written clue to the familiar word."
pairs:
  - left: "has ç"
    right: "ça"
  - left: "has é"
    right: "répétez"
  - left: "ends with silent t"
    right: "salut"
  - left: "has à"
    right: "à bientôt"
explanation: "French marks such as accents and ç are useful spelling and sound clues."
hint: "Look carefully at the marks above or below letters."
questionGoal: "Connect visible spelling marks to familiar words."
misconception: "Ignoring accents and ç as decorative marks."
```

```question
key: u01_l04_q04_correct_ca
type: error-correction
prompt: "Correct the familiar phrase."
sentence: "ca va"
acceptedAnswers:
  - "ça va"
explanation: "The word ça uses ç, which signals the /s/ sound."
hint: "The first word needs the mark under c."
questionGoal: "Use ç in a high-frequency phrase."
misconception: "Leaving off the cedilla because the meaning seems obvious."
```

```question
key: u01_l04_q05_liaison_exposure
type: multiple-choice
prompt: "In vous avez, the final s in vous may link to the next word. Why?"
choices:
  - "The next word starts with a vowel sound."
  - "Every final s is always pronounced."
  - "Vous is an English word."
  - "Avez means goodbye."
correctAnswer: "The next word starts with a vowel sound."
explanation: "This is liaison exposure: a usually quiet final consonant can link before a vowel sound."
hint: "Look at the first sound of avez."
questionGoal: "Introduce liaison as a context-dependent sound pattern."
misconception: "Thinking all final consonants are either always silent or always pronounced."
```

```question
key: u01_l04_q06_sound_notice_speak
type: multiple-choice
prompt: "Which sound note is correct for these familiar words?"
choices:
  - "In salut, the final t is usually quiet; in ça, ç sounds like s."
  - "In salut, every letter is strongly pronounced."
  - "In ça, ç sounds like k."
  - "Accent marks never help with sound or spelling."
correctAnswer: "In salut, the final t is usually quiet; in ça, ç sounds like s."
explanation: "The final t in salut is usually silent, and ç signals an /s/ sound in ça."
hint: "Check the final letter in salut and the mark under c in ça."
questionGoal: "Apply pronunciation-noticing rules to familiar words."
misconception: "Treating pronunciation as unrelated to spelling clues."
```

## Unit 2: Numbers, Calendar, Weather, And Colors

### Lesson 1: Numbers For Age And Classroom Counts

Students use numbers in age answers and small classroom counts.

```question
key: u02_l01_q01_match_numbers
type: match-pairs
prompt: "Match each French number to the numeral."
pairs:
  - left: "cinq"
    right: "5"
  - left: "douze"
    right: "12"
  - left: "vingt"
    right: "20"
  - left: "trente et un"
    right: "31"
explanation: "Number words need exact recognition because close guesses can change the meaning."
hint: "Start with the number words you already know, then use the longer one for 31."
questionGoal: "Recognize high-use number words for age and dates."
misconception: "Treating close-sounding numbers as interchangeable."
```

```question
key: u02_l01_q02_age_phrase
type: fill-blank
prompt: "Complete the age answer: I am twelve years old."
sentenceBefore: "J'"
sentenceAfter: " douze ans."
choices:
  - "ai"
  - "suis"
  - "est"
  - "aime"
correctAnswer: "ai"
explanation: "French uses j'ai douze ans, literally I have twelve years."
hint: "For age in French, use avoir: j'ai."
questionGoal: "Use j'ai rather than je suis for age."
misconception: "Translating English 'I am twelve' word for word."
```

```question
key: u02_l01_q03_choose_age_answer
type: dialogue-builder
prompt: "Choose the answer that fits the question."
turns:
  - speaker: "Ana"
    line: "Quel âge as-tu?"
choices:
  - "J'ai onze ans."
  - "Je m'appelle Ana."
  - "Il fait froid."
  - "Au revoir."
correctAnswer: "J'ai onze ans."
explanation: "Quel âge as-tu? asks how old you are, so the answer uses j'ai ___ ans."
hint: "Look for the answer with a number and ans."
questionGoal: "Match an age question with an age answer."
misconception: "Answering a personal question with a different memorized phrase."
```

```question
key: u02_l01_q04_type_age_number
type: text-input
prompt: "Type the numeral in this sentence: J'ai quatorze ans."
acceptedAnswers:
  - "14"
answerType: number
explanation: "Quatorze means 14."
hint: "Quatorze is between treize and quinze."
questionGoal: "Interpret a written French number in an age sentence."
misconception: "Confusing teen number words."
```

```question
key: u02_l01_q05_order_age_question
type: order-items
prompt: "Put the age question in order."
items:
  - "as-tu?"
  - "âge"
  - "Quel"
correctOrder:
  - "Quel"
  - "âge"
  - "as-tu?"
explanation: "Quel âge as-tu? asks How old are you?"
hint: "Start with the question word quel."
questionGoal: "Build a memorized age question in correct order."
misconception: "Keeping English word order instead of the learned French phrase."
```

```question
key: u02_l01_q06_classroom_count
type: multi-blank-cloze
prompt: "Complete the classroom count: There are three notebooks and two pens."
parts:
  - "Il y a "
  - " cahiers et "
  - " stylos."
blanks:
  - correctAnswer: "trois"
    choices:
      - "trois"
      - "treize"
      - "trente"
  - correctAnswer: "deux"
    choices:
      - "deux"
      - "douze"
      - "dix"
explanation: "The sentence says there are three notebooks and two pens."
hint: "Check each small number separately."
questionGoal: "Use small numbers in a simple classroom quantity sentence."
misconception: "Mixing up small numbers with similar-looking larger words."
```

### Lesson 2: Dates, Days, And Birthdays

Students interpret days, months, dates, and birthday phrases.

```question
key: u02_l02_q01_match_days
type: match-pairs
prompt: "Match each French day to English."
pairs:
  - left: "lundi"
    right: "Monday"
  - left: "mardi"
    right: "Tuesday"
  - left: "vendredi"
    right: "Friday"
  - left: "dimanche"
    right: "Sunday"
explanation: "Day words are useful for dates, schedules, and routines."
hint: "Look for the day words you have seen in classroom calendar routines."
questionGoal: "Recognize common day names."
misconception: "Guessing days by first letter only."
```

```question
key: u02_l02_q02_complete_today
type: fill-blank
prompt: "Complete the sentence: Today is Tuesday."
sentenceBefore: "Aujourd'hui, c'est"
sentenceAfter: "."
choices:
  - "mardi"
  - "mars"
  - "mai"
  - "matin"
correctAnswer: "mardi"
explanation: "Mardi means Tuesday. Mars and mai are months, not days."
hint: "The sentence asks for a day of the week."
questionGoal: "Distinguish a day word from month and time words."
misconception: "Choosing any familiar m-word instead of the day."
```

```question
key: u02_l02_q03_date_order
type: order-items
prompt: "Put this French date phrase in order: the 5th of May."
items:
  - "mai"
  - "le"
  - "5"
correctOrder:
  - "le"
  - "5"
  - "mai"
explanation: "French date phrases commonly use le + number + month."
hint: "Start with le, then the number."
questionGoal: "Build a simple French date phrase."
misconception: "Using English-style month-first order."
```

```question
key: u02_l02_q04_birthday_month
type: fill-blank
prompt: "Complete the birthday sentence: My birthday is in June."
sentenceBefore: "Mon anniversaire est"
sentenceAfter: " juin."
choices:
  - "en"
  - "à"
  - "le"
  - "et"
correctAnswer: "en"
explanation: "Use en with a month in this birthday sentence: en juin."
hint: "The missing word goes before a month."
questionGoal: "Use a supported birthday-month phrase."
misconception: "Translating English prepositions without a learned French chunk."
```

```question
key: u02_l02_q05_calendar_note
type: passage-question
prompt: "Read the calendar note and answer."
passageTitle: "Calendrier de Lina"
passage: |
  Aujourd'hui, c'est jeudi.
  La date est le 12 octobre.
  Mon anniversaire est en avril.
question: "What day is today?"
choices:
  - "Thursday"
  - "October 12"
  - "April"
  - "Sunday"
correctAnswer: "Thursday"
explanation: "Aujourd'hui, c'est jeudi tells the day. Jeudi means Thursday."
hint: "Look for the sentence with aujourd'hui."
questionGoal: "Find the day in a short calendar text."
misconception: "Confusing the day, date, and birthday month."
```

```question
key: u02_l02_q06_write_birthday
type: text-input
prompt: "Type the French sentence: My birthday is in July."
acceptedAnswers:
  - "Mon anniversaire est en juillet."
  - "Mon anniversaire est en juillet"
answerType: text
explanation: "The frame lets you give a birthday month without a long sentence."
hint: "Use the frame Mon anniversaire est en ___ with the month juillet."
questionGoal: "Produce a constrained birthday-month sentence."
misconception: "Trying to translate a full English birthday sentence beyond the learned frame."
```

### Lesson 3: Weather Windows

Students interpret and produce common weather phrases.

```question
key: u02_l03_q01_match_weather
type: match-pairs
prompt: "Match each weather phrase to its meaning."
pairs:
  - left: "il fait beau"
    right: "the weather is nice"
  - left: "il fait froid"
    right: "it is cold"
  - left: "il pleut"
    right: "it is raining"
  - left: "il neige"
    right: "it is snowing"
explanation: "Weather expressions are learned as useful chunks."
hint: "Froid connects to cold; neige connects to snow."
questionGoal: "Recognize common weather expressions."
misconception: "Trying to translate every weather phrase word for word."
```

```question
key: u02_l03_q02_complete_cold
type: fill-blank
prompt: "Complete the weather sentence: It is cold."
sentenceBefore: "Il fait"
sentenceAfter: "."
choices:
  - "froid"
  - "chaud"
  - "beau"
  - "bleu"
correctAnswer: "froid"
explanation: "Il fait froid means it is cold."
hint: "Choose the word connected to cold."
questionGoal: "Complete a fixed il fait weather phrase."
misconception: "Choosing a familiar adjective that does not match the weather."
```

```question
key: u02_l03_q03_rain_or_snow
type: multiple-choice
prompt: "Which French sentence means It is raining?"
choices:
  - "Il pleut."
  - "Il neige."
  - "Il fait chaud."
  - "Il fait beau."
correctAnswer: "Il pleut."
explanation: "Il pleut means it is raining. Il neige means it is snowing."
hint: "Choose the special rain phrase, not the snow phrase."
questionGoal: "Distinguish rain and snow phrases."
misconception: "Confusing non-il fait weather expressions."
```

```question
key: u02_l03_q04_correct_weather
type: error-correction
prompt: "Correct the weather sentence using the learned chunk for It is cold."
sentence: "Il est froid."
acceptedAnswers:
  - "Il fait froid."
explanation: "For weather, use the chunk il fait froid."
hint: "Weather uses il fait, not il est, in this phrase."
questionGoal: "Avoid English-style translation for a weather expression."
misconception: "Using être because English says 'it is cold.'"
```

```question
key: u02_l03_q05_weather_dialogue
type: dialogue-builder
prompt: "The weather window shows sunshine. Choose the reply that fits."
turns:
  - speaker: "Teacher"
    line: "Quel temps fait-il?"
choices:
  - "Il fait beau."
  - "Il pleut."
  - "Il neige."
  - "Il fait froid."
correctAnswer: "Il fait beau."
explanation: "Quel temps fait-il? asks about the weather, and sunshine fits il fait beau."
hint: "Choose the weather phrase that matches a sunny window."
questionGoal: "Match a weather question with a weather answer."
misconception: "Choosing a weather phrase without checking the scene."
```

```question
key: u02_l03_q06_weather_report
type: text-input
prompt: "Type the French sentence: It is raining."
acceptedAnswers:
  - "Il pleut."
  - "Il pleut"
answerType: text
explanation: "A one-sentence weather report is enough for novice production."
hint: "Use the learned rain phrase."
questionGoal: "Produce a constrained weather sentence."
misconception: "Trying to build a long weather sentence before the basic chunk is secure."
```

### Lesson 4: Colors With Nouns

Students use color words with familiar nouns and notice French adjective order.

```question
key: u02_l04_q01_match_colors
type: match-pairs
prompt: "Match each color to English."
pairs:
  - left: "rouge"
    right: "red"
  - left: "bleu"
    right: "blue"
  - left: "vert"
    right: "green"
  - left: "noir"
    right: "black"
explanation: "Color words help describe objects, people, and choices later."
hint: "Start with any color you already recognize, then match the rest."
questionGoal: "Build recognition of common color words."
misconception: "Guessing colors from English spelling when the forms are not close."
```

```question
key: u02_l04_q02_order_blue_notebook
type: order-items
prompt: "Put the phrase in French order: the blue notebook."
items:
  - "bleu"
  - "le"
  - "cahier"
correctOrder:
  - "le"
  - "cahier"
  - "bleu"
explanation: "Many French color adjectives come after the noun: le cahier bleu."
hint: "Start with the article and noun, then add the color."
questionGoal: "Use French noun-color word order."
misconception: "Keeping English adjective-before-noun order."
```

```question
key: u02_l04_q03_complete_red_pencil_case
type: fill-blank
prompt: "Complete the phrase: the red pencil case."
sentenceBefore: "la trousse"
sentenceAfter: "."
choices:
  - "rouge"
  - "rouges"
  - "bleu"
  - "noir"
correctAnswer: "rouge"
explanation: "La trousse rouge means the red pencil case."
hint: "The color red is rouge."
questionGoal: "Attach a color to a familiar feminine noun phrase."
misconception: "Choosing a color by position but not meaning."
```

```question
key: u02_l04_q04_plural_green_pens
type: multiple-choice
prompt: "Which phrase means the green pens?"
choices:
  - "les stylos verts"
  - "le stylo vert"
  - "les stylos rouge"
  - "vert les stylos"
correctAnswer: "les stylos verts"
explanation: "Les marks plural, stylos is plural, and verts also shows plural in this controlled phrase."
hint: "Look for les, stylos, and the color after the noun."
questionGoal: "Notice plural agreement in a simple color-noun phrase."
misconception: "Ignoring article and ending clues in plural noun phrases."
```

```question
key: u02_l04_q05_correct_word_order
type: error-correction
prompt: "Correct the French word order."
sentence: "bleu le cahier"
acceptedAnswers:
  - "le cahier bleu"
explanation: "In this phrase, French uses article + noun + color: le cahier bleu."
hint: "Move the color after the noun."
questionGoal: "Correct English-style color word order."
misconception: "Placing the adjective before the noun because English does."
```

```question
key: u02_l04_q06_object_description
type: text-input
prompt: "Type the French phrase for the black pen."
acceptedAnswers:
  - "le stylo noir"
answerType: text
explanation: "A short noun phrase can show article, noun, and color order."
hint: "Use article + noun + color."
questionGoal: "Produce a constrained article-noun-color phrase."
misconception: "Leaving out the article or using English word order."
```

## Unit 3: Introducing Myself And Asking Questions

### Lesson 1: My Name, Age, And Student Identity

Students combine name, age, and student identity in a short profile.

```question
key: u03_l01_q01_name_phrase
type: fill-blank
prompt: "Complete the sentence: My name is Lina."
sentenceBefore: "Je"
sentenceAfter: " Lina."
choices:
  - "m'appelle"
  - "suis"
  - "ai"
  - "vais"
correctAnswer: "m'appelle"
explanation: "Je m'appelle Lina means My name is Lina."
hint: "Use the name phrase from this profile lesson."
questionGoal: "Complete the basic name-introduction phrase."
misconception: "Using a general verb chunk instead of the memorized name phrase."
```

```question
key: u03_l01_q02_jai_or_je_suis
type: multiple-choice
prompt: "Which sentence correctly says I am thirteen years old?"
choices:
  - "J'ai treize ans."
  - "Je suis treize ans."
  - "Je m'appelle treize."
  - "J'aime treize ans."
correctAnswer: "J'ai treize ans."
explanation: "French uses j'ai with age: j'ai treize ans."
hint: "For age, French uses the have pattern instead of the am pattern."
questionGoal: "Choose the correct age structure."
misconception: "Translating English 'I am thirteen' with je suis."
```

```question
key: u03_l01_q03_profile_cloze
type: multi-blank-cloze
prompt: "Complete Noah's short profile: Noah is twelve and a student."
parts:
  - "Bonjour. Je m'appelle "
  - ". J'ai "
  - " ans. Je suis "
  - "."
blanks:
  - correctAnswer: "Noah"
    acceptedAnswers:
      - "Noah"
  - correctAnswer: "douze"
    choices:
      - "douze"
      - "deux"
      - "vingt"
  - correctAnswer: "élève"
    choices:
      - "élève"
      - "froid"
      - "bonjour"
explanation: "The profile gives a name, age, and student identity."
hint: "Each blank tells a different kind of information: name, number, role."
questionGoal: "Complete a three-part self-profile using learned chunks."
misconception: "Mixing identity, age, and greeting words in the same slot."
```

```question
key: u03_l01_q04_match_profile_parts
type: match-pairs
prompt: "Match each French sentence to what it tells."
pairs:
  - left: "Je m'appelle Maya."
    right: "name"
  - left: "J'ai onze ans."
    right: "age"
  - left: "Je suis élève."
    right: "student identity"
  - left: "Ça va bien."
    right: "how someone feels"
explanation: "A short profile can combine different kinds of personal information."
hint: "Look for the clue word: m'appelle, ans, élève, or ça va."
questionGoal: "Identify the job of each familiar personal phrase."
misconception: "Treating all personal phrases as interchangeable introductions."
```

```question
key: u03_l01_q05_write_profile
type: text-input
prompt: "Type the French sentence: I am a student."
acceptedAnswers:
  - "Je suis élève."
  - "Je suis élève"
answerType: text
explanation: "A clear novice profile can be short and accurate."
hint: "Use the student identity frame from the lesson."
questionGoal: "Produce a constrained student identity sentence."
misconception: "Writing beyond the learned frames and losing accuracy."
```

```question
key: u03_l01_q06_say_profile
type: order-items
prompt: "Put the short profile in a natural order."
items:
  - "Je suis élève."
  - "Je m'appelle Alex."
  - "J'ai douze ans."
correctOrder:
  - "Je m'appelle Alex."
  - "J'ai douze ans."
  - "Je suis élève."
explanation: "A simple profile usually gives name, age, then student identity."
hint: "Start with the name sentence."
questionGoal: "Sequence a three-part self-profile."
misconception: "Treating profile sentences as disconnected chunks."
```

### Lesson 2: Where I Am From And Where I Live

Students distinguish origin and residence phrases.

```question
key: u03_l02_q01_origin_or_residence_match
type: match-pairs
prompt: "Match each French phrase to its meaning."
pairs:
  - left: "Je viens de Montréal."
    right: "I am from Montreal."
  - left: "J'habite à Dallas."
    right: "I live in Dallas."
  - left: "D'où viens-tu?"
    right: "Where are you from?"
  - left: "Où habites-tu?"
    right: "Where do you live?"
explanation: "Origin and residence are related, but they are not the same question."
hint: "D'où points to from where; habites points to where someone lives."
questionGoal: "Distinguish origin and residence language."
misconception: "Treating je viens de and j'habite à as interchangeable."
```

```question
key: u03_l02_q02_answer_origin
type: dialogue-builder
prompt: "Choose the answer that fits."
turns:
  - speaker: "Nadia"
    line: "D'où viens-tu?"
choices:
  - "Je viens de Québec."
  - "J'habite à Québec."
  - "J'ai douze ans."
  - "Il pleut."
correctAnswer: "Je viens de Québec."
explanation: "D'où viens-tu? asks where someone is from, so je viens de... fits."
hint: "Look for the answer that also uses viens."
questionGoal: "Answer an origin question with an origin phrase."
misconception: "Answering an origin question with residence or unrelated personal information."
```

```question
key: u03_l02_q03_answer_residence
type: fill-blank
prompt: "Complete the sentence: I live in Austin."
sentenceBefore: "J'habite"
sentenceAfter: " Austin."
choices:
  - "à"
  - "de"
  - "et"
  - "en"
correctAnswer: "à"
explanation: "The learned residence chunk is j'habite à + place."
hint: "Use the phrase from the model: j'habite à..."
questionGoal: "Complete a controlled residence phrase."
misconception: "Using de because it appears in origin phrases."
```

```question
key: u03_l02_q04_profile_reading
type: passage-question
prompt: "Read the profile and answer."
passageTitle: "Profil de Karim"
passage: |
  Bonjour. Je m'appelle Karim.
  Je viens de Dakar.
  J'habite à Chicago.
question: "Where does Karim live now?"
choices:
  - "Chicago"
  - "Dakar"
  - "Bonjour"
  - "Karim"
correctAnswer: "Chicago"
explanation: "J'habite à Chicago tells where Karim lives."
hint: "Find the sentence with j'habite."
questionGoal: "Locate residence information in a short profile."
misconception: "Confusing origin with current residence."
```

```question
key: u03_l02_q05_choose_question
type: multiple-choice
prompt: "Which question asks Where do you live?"
choices:
  - "Où habites-tu?"
  - "D'où viens-tu?"
  - "Quel âge as-tu?"
  - "Comment ça va?"
correctAnswer: "Où habites-tu?"
explanation: "Où habites-tu? asks where you live."
hint: "Look for the verb linked to living: habites."
questionGoal: "Recognize the residence question."
misconception: "Confusing où and d'où questions."
```

```question
key: u03_l02_q06_write_place_sentence
type: text-input
prompt: "Type the French sentence: I live in Dallas."
acceptedAnswers:
  - "J'habite à Dallas."
  - "J'habite à Dallas"
answerType: text
explanation: "The chunk j'habite à... lets you give residence information."
hint: "Use the sentence frame J'habite à ___."
questionGoal: "Produce a constrained residence sentence."
misconception: "Mixing origin and residence phrases in production."
```

### Lesson 3: Question Words That Shape Answers

Students use question words to choose the right kind of answer.

```question
key: u03_l03_q01_match_question_words
type: match-pairs
prompt: "Match each question word to the kind of answer it usually asks for here."
pairs:
  - left: "qui"
    right: "a person"
  - left: "où"
    right: "a place"
  - left: "pourquoi"
    right: "a reason"
  - left: "comment ça va?"
    right: "how someone feels"
explanation: "Question words are clues for the answer type."
hint: "Think of the English question word each one connects to."
questionGoal: "Connect common French question words to answer types."
misconception: "Ignoring the question word and choosing any familiar answer."
```

```question
key: u03_l03_q02_where_answer
type: dialogue-builder
prompt: "Choose the reply that fits the question."
turns:
  - speaker: "Léo"
    line: "Où habites-tu?"
choices:
  - "J'habite à Houston."
  - "J'ai treize ans."
  - "Je m'appelle Léo."
  - "Bonjour."
correctAnswer: "J'habite à Houston."
explanation: "Où asks for a place, so a residence answer fits."
hint: "Où points to where."
questionGoal: "Use où to select a place answer."
misconception: "Answering a place question with age or name."
```

```question
key: u03_l03_q03_why_answer
type: multiple-choice
prompt: "Which answer best fits Pourquoi?"
choices:
  - "Because it is fun."
  - "I am twelve."
  - "Hello."
  - "I am from Lyon."
correctAnswer: "Because it is fun."
explanation: "Pourquoi asks why, so it calls for a reason."
hint: "Look for the answer that gives a reason."
questionGoal: "Recognize that pourquoi calls for a reason."
misconception: "Treating pourquoi as a yes/no or identity question."
```

```question
key: u03_l03_q04_ou_dou
type: fill-blank
prompt: "Complete the question that asks Where are you from?"
sentenceBefore: ""
sentenceAfter: " viens-tu?"
choices:
  - "D'où"
  - "Où"
  - "Qui"
  - "Quel"
correctAnswer: "D'où"
explanation: "D'où viens-tu? asks where you are from."
hint: "The from idea is hidden in d'où."
questionGoal: "Distinguish d'où from où."
misconception: "Using où for both residence and origin questions."
```

```question
key: u03_l03_q05_question_answer_match
type: match-pairs
prompt: "Match each question to the answer that fits."
pairs:
  - left: "Quel âge as-tu?"
    right: "J'ai douze ans."
  - left: "Comment tu t'appelles?"
    right: "Je m'appelle Nora."
  - left: "Qui est-ce?"
    right: "C'est mon frère."
  - left: "Où habites-tu?"
    right: "J'habite à Austin."
explanation: "The question word and familiar verb chunk tell you what kind of answer fits."
hint: "Match âge with age, comment t'appelles with name, qui with a person, and où with place."
questionGoal: "Choose answers that align with familiar question forms."
misconception: "Matching by one familiar word instead of the question's purpose."
```

```question
key: u03_l03_q06_explain_question_clue
type: multiple-choice
prompt: "In the question Où habites-tu?, what clue tells you the answer should be a place?"
choices:
  - "Où means where."
  - "Tu means teacher."
  - "Habites means goodbye."
  - "The question has no place clue."
correctAnswer: "Où means where."
explanation: "Naming the clue helps you avoid answering with the wrong kind of information."
hint: "Focus on the first word of the question."
questionGoal: "Explain how a question word guides the answer."
misconception: "Skipping the question word and translating only familiar pieces."
```

### Lesson 4: Tu Or Vous In Simple Exchanges

Students choose familiar or polite address in clear situations.

```question
key: u03_l04_q01_friend_tu
type: multiple-choice
prompt: "You ask a close friend, What is your name? Which question fits best?"
choices:
  - "Comment tu t'appelles?"
  - "Comment vous appelez-vous?"
  - "Au revoir?"
  - "Quel temps fait-il?"
correctAnswer: "Comment tu t'appelles?"
explanation: "Tu fits a clear informal friend situation."
hint: "Use the relationship clue: familiar or polite?"
questionGoal: "Choose tu in a familiar peer exchange."
misconception: "Avoiding tu even when the situation is clearly informal."
```

```question
key: u03_l04_q02_teacher_vous
type: multiple-choice
prompt: "You ask a teacher, What is your name? Which question is more polite?"
choices:
  - "Comment vous appelez-vous?"
  - "Comment tu t'appelles?"
  - "Salut?"
  - "Ça va mal?"
correctAnswer: "Comment vous appelez-vous?"
explanation: "Vous is the polite choice for a teacher or adult in this clear situation."
hint: "Use the relationship clue: familiar or polite?"
questionGoal: "Choose vous in a polite adult exchange."
misconception: "Using tu with everyone because it is shorter or familiar."
```

```question
key: u03_l04_q03_match_address
type: match-pairs
prompt: "Match the situation to the better address choice."
pairs:
  - left: "talking to a close friend"
    right: "tu for a close friend"
  - left: "talking to a teacher"
    right: "vous for a teacher"
  - left: "talking politely to one adult"
    right: "vous for a polite adult"
  - left: "talking to your sibling"
    right: "tu for a sibling"
explanation: "Tu often fits familiar relationships; vous fits polite or group situations. The right-side labels are distinct so each match has one clear target."
hint: "Sort by familiar versus polite."
questionGoal: "Connect social context to tu/vous choice."
misconception: "Thinking tu and vous are random spelling variants."
```

```question
key: u03_l04_q04_dialogue_polite
type: dialogue-builder
prompt: "Choose the best next line for a polite exchange."
turns:
  - speaker: "Student"
    line: "Bonjour, Madame."
choices:
  - "Comment vous appelez-vous?"
  - "Comment tu t'appelles?"
  - "Salut, mon frère!"
  - "Je n'aime pas danser."
correctAnswer: "Comment vous appelez-vous?"
explanation: "Bonjour, Madame signals a polite adult exchange, so vous fits."
hint: "Madame is the clue."
questionGoal: "Use context clues inside a dialogue to choose vous."
misconception: "Choosing the shortest known question without checking the relationship."
```

```question
key: u03_l04_q05_correct_address
type: error-correction
prompt: "Correct the address choice for speaking politely to Monsieur Durand."
sentence: "Comment tu t'appelles, Monsieur Durand?"
acceptedAnswers:
  - "Comment vous appelez-vous, Monsieur Durand?"
  - "Comment vous appelez-vous?"
explanation: "Monsieur Durand is a polite adult context, so vous is the expected choice."
hint: "Replace the tu question with the vous question."
questionGoal: "Correct a tu/vous mismatch in a clear polite situation."
misconception: "Using tu with a teacher or adult because the meaning is similar in English."
```

```question
key: u03_l04_q06_explain_tu_vous
type: multiple-choice
prompt: "Which note best explains when tu or vous fits?"
choices:
  - "Use tu with a close friend; use vous with a teacher or polite adult."
  - "Use tu only for weather; use vous only for food."
  - "Use vous with close friends because it is shorter."
  - "Tu and vous mean exactly the same thing in every situation."
correctAnswer: "Use tu with a close friend; use vous with a teacher or polite adult."
explanation: "The relationship helps you choose the form."
hint: "Sort the choices by familiar versus polite relationships."
questionGoal: "Explain the social meaning of tu/vous at a novice level."
misconception: "Thinking tu/vous is only a grammar choice, not a social one."
```

## Unit 4: Family, People, And Descriptions

### Lesson 1: Family Words Need Articles

Students learn family nouns with articles as part of the phrase.

```question
key: u04_l01_q01_match_family
type: match-pairs
prompt: "Match each family word to English."
pairs:
  - left: "la mère"
    right: "mother"
  - left: "le père"
    right: "father"
  - left: "la soeur"
    right: "sister"
  - left: "le frère"
    right: "brother"
explanation: "Family words are learned with articles because articles carry useful noun information."
hint: "Use the article and the familiar family word together."
questionGoal: "Recognize immediate family nouns with articles."
misconception: "Learning nouns without their articles."
```

```question
key: u04_l01_q02_article_sister
type: fill-blank
prompt: "Complete the phrase for the sister."
sentenceBefore: ""
sentenceAfter: " soeur"
choices:
  - "la"
  - "le"
  - "les"
  - "un"
correctAnswer: "la"
explanation: "The phrase is la soeur."
hint: "Soeur is learned with la."
questionGoal: "Choose the article for a familiar family noun."
misconception: "Choosing articles randomly because English uses one word, the."
```

```question
key: u04_l01_q03_plural_parents
type: multiple-choice
prompt: "Which phrase means the parents?"
choices:
  - "les parents"
  - "le parent"
  - "la parents"
  - "un parents"
correctAnswer: "les parents"
explanation: "Les marks a plural noun phrase: les parents."
hint: "Look for the plural article."
questionGoal: "Recognize a plural family noun phrase."
misconception: "Ignoring the article and plural ending."
```

```question
key: u04_l01_q04_flash_family
type: flash-card
mode: easy
prompt: "Choose the best meaning."
front: "le grand-père"
choices:
  - "grandfather"
  - "grandmother"
  - "brother"
  - "parents"
correctAnswer: "grandfather"
explanation: "Le grand-père means grandfather."
hint: "Père is father; grand-père is grandfather."
questionGoal: "Retrieve a family word from a familiar word part."
misconception: "Confusing grand-père and grand-mère."
```

```question
key: u04_l01_q05_family_tree_note
type: passage-question
prompt: "Read the family note and answer."
passageTitle: "La famille de Zoé"
passage: |
  Dans la famille de Zoé, il y a une mère, un père et un frère.
question: "Who is in Zoé's family note?"
choices:
  - "mother, father, and a brother"
  - "teacher, friend, and sister"
  - "mother, grandmother, and dog"
  - "father, cousin, and friend"
correctAnswer: "mother, father, and a brother"
explanation: "Une mère, un père, et un frère means a mother, a father, and a brother."
hint: "Look for mère, père, and frère."
questionGoal: "Interpret familiar family nouns in a short text."
misconception: "Skipping articles and missing the noun meanings."
```

```question
key: u04_l01_q06_family_phrase
type: text-input
prompt: "Type the French phrase for the brother."
acceptedAnswers:
  - "le frère"
answerType: text
explanation: "For French 1, learn the article and noun together."
hint: "Use the article that travels with frère."
questionGoal: "Produce a constrained article-family noun phrase."
misconception: "Writing the noun alone without its article."
```

### Lesson 2: Il Y A In My Family And World

Students use il y a to say who or what is present.

```question
key: u04_l02_q01_meaning_il_y_a
type: multiple-choice
prompt: "What does il y a mean in a sentence like Il y a un frère?"
choices:
  - "there is / there are"
  - "he likes"
  - "I have"
  - "it is cold"
correctAnswer: "there is / there are"
explanation: "Il y a is a useful chunk meaning there is or there are."
hint: "Think of a sentence that tells what exists in a picture or family."
questionGoal: "Recognize il y a as an existence phrase."
misconception: "Translating il y a word by word as 'he has.'"
```

```question
key: u04_l02_q02_complete_inventory
type: fill-blank
prompt: "Complete the sentence: There are three people."
sentenceBefore: "Il y a"
sentenceAfter: " personnes."
choices:
  - "trois"
  - "treize"
  - "un"
  - "bonjour"
correctAnswer: "trois"
explanation: "Il y a trois personnes means there are three people."
hint: "Choose the number that means three."
questionGoal: "Use il y a with a number in a simple inventory sentence."
misconception: "Confusing small number words in a descriptive sentence."
```

```question
key: u04_l02_q03_il_y_a_cloze
type: multi-blank-cloze
prompt: "Complete the family sentence."
parts:
  - "Dans ma famille, il y a "
  - " soeur et "
  - " frère."
blanks:
  - correctAnswer: "une"
    choices:
      - "une"
      - "un"
      - "les"
  - correctAnswer: "un"
    choices:
      - "un"
      - "une"
      - "la"
explanation: "Use une soeur and un frère in this sentence."
hint: "Soeur is learned with feminine articles; frère with masculine articles."
questionGoal: "Use articles after il y a with familiar family nouns."
misconception: "Omitting or swapping articles after il y a."
```

```question
key: u04_l02_q04_match_il_y_a
type: match-pairs
prompt: "Match each French sentence to its meaning."
pairs:
  - left: "Il y a un livre."
    right: "There is a book."
  - left: "Il y a deux frères."
    right: "There are two brothers."
  - left: "Il y a une trousse."
    right: "There is a pencil case."
  - left: "Il y a deux parents."
    right: "There are two parents."
explanation: "Il y a can describe what is present in a family, bag, room, or picture."
hint: "After il y a, look for the number or article and noun."
questionGoal: "Interpret il y a sentences across familiar noun domains."
misconception: "Expecting a separate French form for there is versus there are."
```

```question
key: u04_l02_q05_correct_il_y_a
type: error-correction
prompt: "Correct the sentence so it says There is a sister."
sentence: "Il y a soeur."
acceptedAnswers:
  - "Il y a une soeur."
explanation: "A French noun usually needs an article. Une soeur means a sister."
hint: "Add an article before soeur."
questionGoal: "Repair a missing article after il y a."
misconception: "Dropping the article because English can say 'there is sister' only in fragments."
```

```question
key: u04_l02_q06_describe_picture
type: text-input
prompt: "Type the French sentence: There is a book."
acceptedAnswers:
  - "Il y a un livre."
  - "Il y a un livre"
answerType: text
explanation: "Il y a helps you describe what is present."
hint: "Start with Il y a, then add the article and noun."
questionGoal: "Produce a constrained existence sentence."
misconception: "Using j'ai or il est when the goal is to say what exists."
```

### Lesson 3: Describing People With Matching Adjectives

Students describe people with simple matching adjectives.

```question
key: u04_l03_q01_match_adjectives
type: match-pairs
prompt: "Match each adjective to English."
pairs:
  - left: "grand"
    right: "tall / big"
  - left: "petit"
    right: "small / short"
  - left: "drôle"
    right: "funny"
  - left: "sympa"
    right: "nice"
explanation: "These adjectives help you describe people in short sentences."
hint: "Drôle and sympa often describe personality."
questionGoal: "Recognize simple people-description adjectives."
misconception: "Treating every adjective as a color or physical trait."
```

```question
key: u04_l03_q02_choose_feminine_grande
type: fill-blank
prompt: "Complete the sentence: My sister is tall."
sentenceBefore: "Ma soeur est"
sentenceAfter: "."
choices:
  - "grande"
  - "grand"
  - "grands"
  - "grand-père"
correctAnswer: "grande"
explanation: "Soeur is feminine, so the controlled adjective form is grande."
hint: "Ma soeur gives the clue for the adjective ending."
questionGoal: "Choose a basic adjective form that matches a feminine noun."
misconception: "Using one adjective form for every person noun."
```

```question
key: u04_l03_q03_choose_masculine_brun
type: multiple-choice
prompt: "Which sentence means My brother is brown-haired?"
choices:
  - "Mon frère est brun."
  - "Ma frère est brune."
  - "Mon frère est brune."
  - "Mes frère est brun."
correctAnswer: "Mon frère est brun."
explanation: "Frère is masculine singular, so mon frère and brun fit."
hint: "Look for mon frère and the matching adjective form."
questionGoal: "Use article/possessive and adjective clues in a masculine description."
misconception: "Mixing feminine adjective endings with masculine nouns."
```

```question
key: u04_l03_q04_correct_adjective
type: error-correction
prompt: "Correct the adjective form."
sentence: "Ma mère est grand."
acceptedAnswers:
  - "Ma mère est grande."
explanation: "Mère is feminine, so the controlled form is grande."
hint: "Add the feminine ending to the adjective."
questionGoal: "Correct a simple adjective agreement error."
misconception: "Assuming the adjective never changes form."
```

```question
key: u04_l03_q05_description_reading
type: passage-question
prompt: "Read the description and answer."
passageTitle: "Mon ami"
passage: |
  Mon ami s'appelle Hugo.
  Il est petit et sympa.
question: "Which words describe Hugo?"
choices:
  - "small and nice"
  - "tall and funny"
  - "cold and blue"
  - "old and polite"
correctAnswer: "small and nice"
explanation: "Petit means small or short, and sympa means nice."
hint: "Look at the two adjectives after Il est."
questionGoal: "Interpret adjectives in a short people description."
misconception: "Reading familiar sentence frames but skipping description words."
```

```question
key: u04_l03_q06_write_person_description
type: multiple-choice
prompt: "Which sentence correctly says My sister is funny?"
choices:
  - "Ma soeur est drôle."
  - "Mon soeur est drôle."
  - "Ma soeur est brun."
  - "Soeur drôle ma."
correctAnswer: "Ma soeur est drôle."
explanation: "A clear description can use short sentences and familiar adjective forms."
hint: "Look for ma soeur and a complete est + adjective sentence."
questionGoal: "Choose a complete, controlled people description."
misconception: "Writing a list of adjectives without a person and verb chunk."
```

### Lesson 4: My, Your? Mon, Ma, Mes In Context

Students use mon, ma, and mes with familiar people nouns.

```question
key: u04_l04_q01_match_possessive_phrases
type: match-pairs
prompt: "Match each phrase to English."
pairs:
  - left: "mon frère"
    right: "my brother"
  - left: "ma soeur"
    right: "my sister"
  - left: "mes parents"
    right: "my parents"
  - left: "mon ami"
    right: "my friend"
explanation: "Mon, ma, and mes are useful possession chunks with familiar nouns."
hint: "Use the noun after mon, ma, or mes to guide the meaning."
questionGoal: "Recognize common possession phrases."
misconception: "Focusing on the possessive word and ignoring the noun."
```

```question
key: u04_l04_q02_choose_ma_soeur
type: fill-blank
prompt: "Complete the phrase: my sister."
sentenceBefore: ""
sentenceAfter: " soeur"
choices:
  - "ma"
  - "mon"
  - "mes"
  - "le"
correctAnswer: "ma"
explanation: "Use ma with soeur in the phrase ma soeur."
hint: "Use the article pattern you learned for soeur."
questionGoal: "Choose ma with a familiar feminine noun."
misconception: "Choosing mon or ma based on the speaker instead of the noun."
```

```question
key: u04_l04_q03_choose_mes_parents
type: multiple-choice
prompt: "Which phrase means my parents?"
choices:
  - "mes parents"
  - "mon parents"
  - "ma parents"
  - "le parents"
correctAnswer: "mes parents"
explanation: "Parents is plural, so mes is the controlled possessive chunk."
hint: "Plural people need mes in this phrase."
questionGoal: "Use mes with a plural family noun."
misconception: "Using singular possessives with plural nouns."
```

```question
key: u04_l04_q04_correct_possessive
type: error-correction
prompt: "Correct the possessive phrase."
sentence: "mon soeur"
acceptedAnswers:
  - "ma soeur"
explanation: "Soeur uses the ma phrase: ma soeur."
hint: "Think la soeur -> ma soeur."
questionGoal: "Correct a mon/ma mismatch with a familiar noun."
misconception: "Using mon as a default for every 'my' phrase."
```

```question
key: u04_l04_q05_family_possession_note
type: passage-question
prompt: "Read the note and answer."
passageTitle: "Ma famille"
passage: |
  Ma soeur s'appelle Inès.
  Mon frère s'appelle Paul.
  Mes parents sont sympas.
question: "Who is named Paul?"
choices:
  - "my brother"
  - "my sister"
  - "my parents"
  - "my teacher"
correctAnswer: "my brother"
explanation: "Mon frère s'appelle Paul means my brother is named Paul."
hint: "Find Paul, then look at the family noun before it."
questionGoal: "Read possession chunks in a short family text."
misconception: "Skipping mon/ma/mes and guessing from names only."
```

```question
key: u04_l04_q06_write_possession
type: multiple-choice
prompt: "Which sentence uses a possessive chunk correctly?"
choices:
  - "Ma soeur est sympa."
  - "Mon soeur est sympa."
  - "Mes soeur est sympa."
  - "La ma soeur est sympa."
correctAnswer: "Ma soeur est sympa."
explanation: "Possession chunks help you talk about people in your world."
hint: "Check the possessive word before soeur."
questionGoal: "Choose a controlled sentence with a possessive chunk."
misconception: "Choosing possessives without checking the noun that follows."
```

## Unit 5: Likes, Activities, And Opinions

### Lesson 1: J'aime And J'adore Activity Chunks

Students state positive preferences with common activity chunks.

```question
key: u05_l01_q01_match_activities
type: match-pairs
prompt: "Match each activity chunk to English."
pairs:
  - left: "jouer au foot"
    right: "to play soccer"
  - left: "écouter de la musique"
    right: "to listen to music"
  - left: "regarder un film"
    right: "to watch a movie"
  - left: "parler français"
    right: "to speak French"
explanation: "Activity chunks can follow j'aime or j'adore."
hint: "Look for cognates like musique, film, and français."
questionGoal: "Recognize common activity chunks."
misconception: "Trying to translate each word separately before recognizing the chunk."
```

```question
key: u05_l01_q02_positive_preference
type: fill-blank
prompt: "Complete the sentence: I like to read."
sentenceBefore: "J'aime"
sentenceAfter: "."
choices:
  - "lire"
  - "froid"
  - "douze"
  - "bonjour"
correctAnswer: "lire"
explanation: "J'aime lire means I like to read."
hint: "Choose the activity word."
questionGoal: "Complete a positive preference statement with an activity chunk."
misconception: "Putting a non-activity word after j'aime."
```

```question
key: u05_l01_q03_jadore_intensity
type: multiple-choice
prompt: "Which sentence shows a stronger positive feeling?"
choices:
  - "J'adore danser."
  - "J'aime danser."
  - "Je n'aime pas danser."
  - "J'ai douze ans."
correctAnswer: "J'adore danser."
explanation: "J'adore is stronger than j'aime."
hint: "Look for the phrase that means I love."
questionGoal: "Distinguish intensity in positive preference chunks."
misconception: "Treating all preference phrases as the same strength."
```

```question
key: u05_l01_q04_activity_flash
type: flash-card
mode: easy
prompt: "Choose the best meaning."
front: "chanter"
choices:
  - "to sing"
  - "to dance"
  - "to study"
  - "to watch"
correctAnswer: "to sing"
explanation: "Chanter means to sing."
hint: "Think of a choir or chant connection."
questionGoal: "Retrieve a high-use activity verb meaning."
misconception: "Confusing activity chunks with similar classroom verbs."
```

```question
key: u05_l01_q05_preference_cloze
type: multi-blank-cloze
prompt: "Complete the positive preference sentence: I like listening to music and I love playing soccer."
parts:
  - "J'"
  - " écouter de la musique et j'"
  - " jouer au foot."
blanks:
  - correctAnswer: "aime"
    choices:
      - "aime"
      - "ai"
      - "suis"
  - correctAnswer: "adore"
    choices:
      - "adore"
      - "habite"
      - "pleut"
explanation: "The sentence says I like listening to music and I love playing soccer."
hint: "Both blanks need preference chunks."
questionGoal: "Use j'aime and j'adore with activity chunks."
misconception: "Choosing familiar verbs that do not express preference."
```

```question
key: u05_l01_q06_say_preference
type: text-input
prompt: "Type the French sentence: I like to read."
acceptedAnswers:
  - "J'aime lire."
  - "J'aime lire"
answerType: text
explanation: "A short preference sentence lets you communicate something personal."
hint: "Use J'aime plus the activity word lire."
questionGoal: "Produce a constrained positive preference."
misconception: "Trying to conjugate the activity chunk instead of using the learned phrase."
```

### Lesson 2: Je N'aime Pas: Negation As A Frame

Students use ne...pas around aime in controlled negative preference statements.

```question
key: u05_l02_q01_meaning_negative
type: multiple-choice
prompt: "What does Je n'aime pas chanter mean?"
choices:
  - "I do not like to sing."
  - "I love to sing."
  - "I am singing."
  - "I want to sing."
correctAnswer: "I do not like to sing."
explanation: "Je n'aime pas means I do not like."
hint: "The pas is part of the negative frame."
questionGoal: "Recognize the meaning of a negative preference statement."
misconception: "Ignoring pas and reading the sentence as positive."
```

```question
key: u05_l02_q02_complete_negation
type: multi-blank-cloze
prompt: "Complete the negative sentence: I do not like to dance."
parts:
  - "Je "
  - "aime "
  - " danser."
blanks:
  - correctAnswer: "n'"
    choices:
      - "n'"
      - "j'"
      - "m'"
  - correctAnswer: "pas"
    choices:
      - "pas"
      - "très"
      - "bien"
explanation: "Before aime, ne becomes n', and pas comes after aime."
hint: "The frame goes around aime: n' ... pas."
questionGoal: "Place both parts of the negation frame around aime."
misconception: "Using pas alone or putting both negative pieces together."
```

```question
key: u05_l02_q03_order_negative_sentence
type: order-items
prompt: "Put the negative preference sentence in order."
items:
  - "aime"
  - "Je"
  - "pas"
  - "lire."
  - "n'"
correctOrder:
  - "Je"
  - "n'"
  - "aime"
  - "pas"
  - "lire."
explanation: "The negative frame is je n'aime pas + activity."
hint: "Start with Je, then place n' before aime and pas after aime."
questionGoal: "Sequence a controlled negative preference sentence."
misconception: "Placing pas after the activity instead of after aime."
```

```question
key: u05_l02_q04_correct_negation
type: error-correction
prompt: "Correct the negative sentence."
sentence: "Je aime pas étudier."
acceptedAnswers:
  - "Je n'aime pas étudier."
explanation: "The controlled negative frame is Je n'aime pas..."
hint: "Add n' before aime."
questionGoal: "Repair a missing first part of the negation frame."
misconception: "Using only pas for negation in controlled writing."
```

```question
key: u05_l02_q05_positive_or_negative
type: match-pairs
prompt: "Match each sentence to its meaning."
pairs:
  - left: "J'aime lire."
    right: "I like to read."
  - left: "Je n'aime pas lire."
    right: "I do not like to read."
  - left: "J'adore lire."
    right: "I love to read."
  - left: "J'aime danser."
    right: "I like to dance."
explanation: "Preference words and the negative frame change the meaning."
hint: "Sort the positive sentences from the negative sentence, then check the activity."
questionGoal: "Distinguish positive, negative, and strong preference meanings."
misconception: "Treating every sentence with lire as having the same meaning."
```

```question
key: u05_l02_q06_write_negative
type: text-input
prompt: "Type the French sentence: I do not like to dance."
acceptedAnswers:
  - "Je n'aime pas danser."
  - "Je n'aime pas danser"
answerType: text
explanation: "The frame Je n'aime pas + activity makes a clear negative preference."
hint: "Keep the frame together: Je n'aime pas ___."
questionGoal: "Produce a constrained negative preference sentence."
misconception: "Leaving out ne/n' or placing pas after the activity."
```

### Lesson 3: Asking About Preferences

Students ask and answer simple questions about likes.

```question
key: u05_l03_q01_open_question
type: multiple-choice
prompt: "What kind of answer does Qu'est-ce que tu aimes? ask for?"
choices:
  - "An activity or thing you like"
  - "Your age"
  - "The weather"
  - "Where you live"
correctAnswer: "An activity or thing you like"
explanation: "Qu'est-ce que tu aimes? asks what you like."
hint: "Look for aimes in the question."
questionGoal: "Recognize the purpose of an open preference question."
misconception: "Treating qu'est-ce que as a name or age question."
```

```question
key: u05_l03_q02_yes_no_preference
type: dialogue-builder
prompt: "Choose the answer that fits the yes/no question."
turns:
  - speaker: "Nora"
    line: "Est-ce que tu aimes jouer au foot?"
choices:
  - "Oui, j'aime jouer au foot."
  - "J'ai douze ans."
  - "Je viens de Paris."
  - "Il fait froid."
correctAnswer: "Oui, j'aime jouer au foot."
explanation: "The question asks whether you like playing soccer, so oui plus a preference answer fits."
hint: "The answer should mention liking the same activity."
questionGoal: "Answer an est-ce que preference question appropriately."
misconception: "Answering a yes/no preference question with unrelated personal information."
```

```question
key: u05_l03_q03_match_questions_answers
type: match-pairs
prompt: "Match each preference question to the best answer."
pairs:
  - left: "Qu'est-ce que tu aimes?"
    right: "J'aime lire."
  - left: "Est-ce que tu aimes danser?"
    right: "Oui, j'aime danser."
  - left: "Est-ce que tu aimes étudier?"
    right: "Non, je n'aime pas étudier."
  - left: "Est-ce que tu aimes la musique?"
    right: "Oui, j'aime la musique."
explanation: "Different question forms call for different response types."
hint: "Open question, yes answer, and no answer each have a different shape."
questionGoal: "Match preference question types to fitting replies."
misconception: "Ignoring whether the question is open or yes/no."
```

```question
key: u05_l03_q04_order_preference_dialogue
type: order-items
prompt: "Omar greets Inès first, then Inès replies. Put the preference exchange in order."
items:
  - "Oui, j'aime lire."
  - "Salut, Inès."
  - "Est-ce que tu aimes lire?"
  - "Salut, Omar."
correctOrder:
  - "Salut, Inès."
  - "Salut, Omar."
  - "Est-ce que tu aimes lire?"
  - "Oui, j'aime lire."
explanation: "The exchange opens with greetings, then asks and answers the preference question."
hint: "Greetings come before the question and answer."
questionGoal: "Sequence a short preference dialogue."
misconception: "Putting the answer before the question or skipping the greeting context."
```

```question
key: u05_l03_q05_build_preference_question
type: fill-blank
prompt: "Complete the yes/no preference question: Do you like music?"
sentenceBefore: "Est-ce que tu"
sentenceAfter: " la musique?"
choices:
  - "aimes"
  - "as"
  - "es"
  - "vas"
correctAnswer: "aimes"
explanation: "Est-ce que tu aimes...? asks Do you like...?"
hint: "The question is about liking."
questionGoal: "Complete a memorized preference question frame."
misconception: "Choosing a familiar tu verb that does not fit preference."
```

```question
key: u05_l03_q06_write_question_answer
type: text-input
prompt: "Type the French yes/no question: Do you like to read?"
acceptedAnswers:
  - "Est-ce que tu aimes lire?"
  - "Est-ce que tu aimes lire"
answerType: text
explanation: "A good novice exchange keeps the question and answer connected."
hint: "Use Est-ce que tu aimes plus the activity word lire."
questionGoal: "Produce a constrained preference question."
misconception: "Writing a question and answer that do not match."
```

### Lesson 4: Simple Reasons With Parce Que

Students add brief reasons and connectors to preferences.

```question
key: u05_l04_q01_meaning_parce_que
type: multiple-choice
prompt: "What does parce que usually introduce?"
choices:
  - "a reason"
  - "a name"
  - "a number"
  - "a goodbye"
correctAnswer: "a reason"
explanation: "Parce que means because, so it introduces a reason."
hint: "Think of why something is true."
questionGoal: "Recognize the purpose of parce que."
misconception: "Treating parce que as a general connector with no meaning."
```

```question
key: u05_l04_q02_logical_reason
type: multiple-choice
prompt: "Which reason best fits: J'aime danser parce que..."
choices:
  - "c'est amusant."
  - "c'est difficile."
  - "je n'aime pas danser."
  - "c'est lundi."
correctAnswer: "c'est amusant."
explanation: "C'est amusant gives a simple positive reason for liking dancing."
hint: "The reason should explain the preference."
questionGoal: "Choose a logical reason for a preference statement."
misconception: "Adding an unrelated familiar sentence after parce que."
```

```question
key: u05_l04_q03_preference_reason_cloze
type: multi-blank-cloze
prompt: "Complete the opinion sentence."
parts:
  - "J'aime lire "
  - " c'est "
  - "."
blanks:
  - correctAnswer: "parce que"
    choices:
      - "parce que"
      - "mais"
      - "et"
  - correctAnswer: "intéressant"
    choices:
      - "intéressant"
      - "douze"
      - "froid"
explanation: "J'aime lire parce que c'est intéressant gives a preference and reason."
hint: "Use because before the reason."
questionGoal: "Build a short preference-plus-reason sentence."
misconception: "Using a connector that does not introduce a reason."
```

```question
key: u05_l04_q04_et_or_mais
type: fill-blank
prompt: "Complete the contrast: I like music, but I do not like singing."
sentenceBefore: "J'aime la musique"
sentenceAfter: " je n'aime pas chanter."
choices:
  - "mais"
  - "et"
  - "parce que"
  - "où"
correctAnswer: "mais"
explanation: "Mais means but and shows a contrast."
hint: "The two ideas go in different directions."
questionGoal: "Choose a connector that fits the relationship between ideas."
misconception: "Using et for every connection, even a contrast."
```

```question
key: u05_l04_q05_read_opinion
type: passage-question
prompt: "Read the opinion and answer."
passageTitle: "L'opinion de Sam"
passage: |
  J'adore le français parce que c'est intéressant.
  Mais je n'aime pas chanter.
question: "Why does Sam love French?"
choices:
  - "because it is interesting"
  - "because it is cold"
  - "because Sam likes singing"
  - "because Sam is twelve"
correctAnswer: "because it is interesting"
explanation: "Parce que c'est intéressant gives the reason."
hint: "Look right after parce que."
questionGoal: "Use parce que to find the reason in a short text."
misconception: "Reading only the preference and skipping the reason."
```

```question
key: u05_l04_q06_write_reason
type: text-input
prompt: "Type the French sentence: I like music because it is fun."
acceptedAnswers:
  - "J'aime la musique parce que c'est amusant."
  - "J'aime la musique parce que c'est amusant"
answerType: text
explanation: "A reason can be short and still communicate an opinion."
hint: "Use J'aime la musique + parce que + c'est amusant."
questionGoal: "Produce a constrained preference statement with a reason."
misconception: "Trying to write a long explanation instead of a clear novice reason."
```

## Unit 6: School, Objects, And Everyday Places

### Lesson 1: Classroom Objects And School Subjects

Students identify school objects and subjects with articles and state school preferences.

```question
key: u06_l01_q01_match_school_objects
type: match-pairs
prompt: "Match each school object to English."
pairs:
  - left: "le stylo"
    right: "the pen"
  - left: "le cahier"
    right: "the notebook"
  - left: "le livre"
    right: "the book"
  - left: "la trousse"
    right: "the pencil case"
explanation: "School objects should be learned with their articles."
hint: "Look for cognates or classroom words you have seen in color phrases."
questionGoal: "Recognize common classroom-object nouns with articles."
misconception: "Learning object nouns without article clues."
```

```question
key: u06_l01_q02_flash_subject
type: flash-card
mode: easy
prompt: "Choose the best meaning."
front: "les sciences"
choices:
  - "science"
  - "history"
  - "music"
  - "art"
correctAnswer: "science"
explanation: "Les sciences means science as a school subject."
hint: "This is a close cognate."
questionGoal: "Recognize a school subject cognate."
misconception: "Distrusting useful cognates even when context supports them."
```

```question
key: u06_l01_q03_article_trousse
type: fill-blank
prompt: "Complete the phrase: the pencil case."
sentenceBefore: ""
sentenceAfter: " trousse"
choices:
  - "la"
  - "le"
  - "les"
  - "un"
correctAnswer: "la"
explanation: "The phrase is la trousse."
hint: "Trousse is learned with la."
questionGoal: "Choose the article for a familiar school object."
misconception: "Assuming all school objects use le."
```

```question
key: u06_l01_q04_subject_preference
type: fill-blank
prompt: "Complete the school preference: I like French."
sentenceBefore: "J'aime"
sentenceAfter: "."
choices:
  - "le français"
  - "le stylo"
  - "la trousse"
  - "il pleut"
correctAnswer: "le français"
explanation: "Le français is the school subject French."
hint: "Choose the school subject, not an object or weather phrase."
questionGoal: "Use preference language with a school subject."
misconception: "Mixing school objects, subjects, and unrelated familiar phrases."
```

```question
key: u06_l01_q05_sort_objects_subjects
type: match-pairs
prompt: "Match each school word to English."
pairs:
  - left: "le crayon"
    right: "the pencil"
  - left: "les maths"
    right: "math"
  - left: "l'histoire"
    right: "history"
  - left: "le sac"
    right: "the bag"
explanation: "School words can name things you use or classes you take."
hint: "Use the article and the school word together when you match."
questionGoal: "Recognize additional school object and subject nouns."
misconception: "Treating all school vocabulary as interchangeable."
```

```question
key: u06_l01_q06_write_school_preference
type: text-input
prompt: "Type the French sentence: I like science."
acceptedAnswers:
  - "J'aime les sciences."
  - "J'aime les sciences"
answerType: text
explanation: "Preference language transfers from activities to school subjects."
hint: "Use J'aime plus the school subject les sciences."
questionGoal: "Produce a constrained school preference sentence."
misconception: "Forgetting earlier preference chunks in a new school context."
```

### Lesson 2: Il Y A And Where Things Are

Students distinguish what exists from where something is located.

```question
key: u06_l02_q01_existence_or_location
type: multiple-choice
prompt: "Which sentence tells what is in the backpack?"
choices:
  - "Il y a un livre."
  - "Le livre est sur la table."
  - "J'aime le livre."
  - "Je vais à la bibliothèque."
correctAnswer: "Il y a un livre."
explanation: "Il y a tells what exists or what is present."
hint: "Look for the phrase that means there is."
questionGoal: "Distinguish existence from location, preference, and going."
misconception: "Using the newest or most familiar sentence frame for every school prompt."
```

```question
key: u06_l02_q02_match_prepositions
type: match-pairs
prompt: "Match each preposition to English."
pairs:
  - left: "dans"
    right: "in"
  - left: "sur"
    right: "on"
  - left: "sous"
    right: "under"
  - left: "à côté de"
    right: "next to"
explanation: "Prepositions tell where an object is located."
hint: "Picture a pencil in, on, under, or next to a bag."
questionGoal: "Recognize basic location prepositions."
misconception: "Ignoring the preposition because the object noun is familiar."
```

```question
key: u06_l02_q03_complete_location
type: fill-blank
prompt: "Complete the sentence: The pen is in the bag."
sentenceBefore: "Le stylo est"
sentenceAfter: " le sac."
choices:
  - "dans"
  - "sur"
  - "sous"
  - "devant"
correctAnswer: "dans"
explanation: "Dans means in, so le stylo est dans le sac means the pen is in the bag."
hint: "Choose the word that means in."
questionGoal: "Use a preposition in a simple location sentence."
misconception: "Treating all location words as interchangeable."
```

```question
key: u06_l02_q04_correct_location_frame
type: error-correction
prompt: "Correct the sentence so it tells where the book is."
sentence: "Il y a sur la table le livre."
acceptedAnswers:
  - "Le livre est sur la table."
explanation: "Use Le livre est sur la table to tell where the book is."
hint: "Start with the object, then use est plus the location phrase."
questionGoal: "Correct misuse of il y a for a location sentence."
misconception: "Using il y a for both existence and location."
```

```question
key: u06_l02_q05_location_reading
type: passage-question
prompt: "Read the classroom note and answer."
passageTitle: "Dans la classe"
passage: |
  Il y a un sac.
  Le cahier est dans le sac.
  Le stylo est sur la table.
question: "Where is the notebook?"
choices:
  - "in the bag"
  - "on the table"
  - "under the chair"
  - "next to the book"
correctAnswer: "in the bag"
explanation: "Le cahier est dans le sac means the notebook is in the bag."
hint: "Find le cahier, then read the preposition after est."
questionGoal: "Interpret a location sentence in a short classroom text."
misconception: "Matching by object words without reading the preposition."
```

```question
key: u06_l02_q06_write_location
type: text-input
prompt: "Type the French sentence: The book is on the table."
acceptedAnswers:
  - "Le livre est sur la table."
  - "Le livre est sur la table"
answerType: text
explanation: "A location sentence tells where the object is, not just that it exists."
hint: "Start with Le livre est, then add the on-the-table phrase."
questionGoal: "Produce a constrained school-object location sentence."
misconception: "Writing an il y a sentence when asked for location."
```

### Lesson 3: Going Places With Je Vais

Students use je vais à... with school and town destinations.

```question
key: u06_l03_q01_match_places
type: match-pairs
prompt: "Match each place to English."
pairs:
  - left: "la bibliothèque"
    right: "the library"
  - left: "le parc"
    right: "the park"
  - left: "le cinéma"
    right: "the movie theater"
  - left: "le musée"
    right: "the museum"
explanation: "Place words help you answer where someone is going."
hint: "Several of these are helpful cognates."
questionGoal: "Recognize everyday place nouns."
misconception: "Overlooking cognates in a place context."
```

```question
key: u06_l03_q02_complete_going
type: fill-blank
prompt: "Complete the sentence: I am going to the library."
sentenceBefore: "Je vais"
sentenceAfter: " la bibliothèque."
choices:
  - "à"
  - "de"
  - "et"
  - "dans"
correctAnswer: "à"
explanation: "The learned chunk is je vais à + place."
hint: "Use the going-to phrase from the lesson."
questionGoal: "Complete a controlled je vais à destination phrase."
misconception: "Using a preposition from another context instead of the learned chunk."
```

```question
key: u06_l03_q03_destination_question
type: dialogue-builder
prompt: "Choose the answer that fits."
turns:
  - speaker: "Amir"
    line: "Où vas-tu?"
choices:
  - "Je vais au parc."
  - "J'aime le français."
  - "Le stylo est rouge."
  - "Il y a un livre."
correctAnswer: "Je vais au parc."
explanation: "Où vas-tu? asks where you are going."
hint: "Look for je vais plus a place."
questionGoal: "Answer a destination question with a going phrase."
misconception: "Answering a place question with an object, preference, or inventory sentence."
```

```question
key: u06_l03_q04_going_or_liking
type: multiple-choice
prompt: "Which sentence says I am going to the cinema?"
choices:
  - "Je vais au cinéma."
  - "J'aime le cinéma."
  - "Il y a un cinéma."
  - "Le cinéma est grand."
correctAnswer: "Je vais au cinéma."
explanation: "Je vais au cinéma tells where someone is going."
hint: "Do not confuse going with liking."
questionGoal: "Distinguish je vais from j'aime and il y a in place contexts."
misconception: "Matching only the place word cinéma and ignoring the verb chunk."
```

```question
key: u06_l03_q05_order_destination
type: order-items
prompt: "Put the destination sentence in order."
items:
  - "à"
  - "Je"
  - "l'école."
  - "vais"
correctOrder:
  - "Je"
  - "vais"
  - "à"
  - "l'école."
explanation: "Je vais à l'école means I am going to school."
hint: "Start with Je vais."
questionGoal: "Build a memorized going-to-place sentence."
misconception: "Using English word order or leaving out à."
```

```question
key: u06_l03_q06_write_destination
type: text-input
prompt: "Type the French sentence: I am going to the library."
acceptedAnswers:
  - "Je vais à la bibliothèque."
  - "Je vais à la bibliothèque"
answerType: text
explanation: "The je vais à... chunk lets you talk about a destination."
hint: "Use Je vais plus the à la bibliothèque place phrase."
questionGoal: "Produce a constrained destination sentence."
misconception: "Writing je vais without a destination."
```

### Lesson 4: School Mini-Dialogues

Students combine school vocabulary, preferences, places, and polite exchanges.

```question
key: u06_l04_q01_best_school_reply
type: dialogue-builder
prompt: "Choose the best next line."
turns:
  - speaker: "Élise"
    line: "Est-ce que tu aimes les maths?"
choices:
  - "Oui, j'aime les maths."
  - "Je vais au parc."
  - "Le cahier est bleu."
  - "Il pleut."
correctAnswer: "Oui, j'aime les maths."
explanation: "The question asks whether you like math, so the answer should be a preference."
hint: "Look for a yes/no answer about the same subject."
questionGoal: "Choose a reply that matches a school preference question."
misconception: "Choosing a sentence with school vocabulary but the wrong communication job."
```

```question
key: u06_l04_q02_polite_request_school
type: dialogue-builder
prompt: "You did not hear the classroom direction clearly. Choose the best polite reply."
turns:
  - speaker: "Teacher"
    line: "Regardez le tableau."
  - speaker: "Student"
    line: "?"
choices:
  - "Répétez, s'il vous plaît."
  - "J'adore le parc."
  - "Je vais au café."
  - "Mon frère est grand."
correctAnswer: "Répétez, s'il vous plaît."
explanation: "If the student did not hear or understand a direction, asking to repeat fits."
hint: "Choose the reply that asks for help with the direction."
questionGoal: "Reuse classroom repair language in a school dialogue."
misconception: "Forgetting early survival phrases in later units."
```

```question
key: u06_l04_q03_order_school_dialogue
type: order-items
prompt: "Marc greets Zoé first, then Zoé replies. Put the school dialogue in order."
items:
  - "Oui, j'aime l'art."
  - "Salut, Zoé."
  - "Est-ce que tu aimes l'art?"
  - "Salut, Marc."
correctOrder:
  - "Salut, Zoé."
  - "Salut, Marc."
  - "Est-ce que tu aimes l'art?"
  - "Oui, j'aime l'art."
explanation: "A short dialogue opens with greetings, then the question and answer."
hint: "Start with the greeting pair."
questionGoal: "Sequence a school preference exchange."
misconception: "Putting memorized lines in an illogical dialogue order."
```

```question
key: u06_l04_q04_school_note_reading
type: passage-question
prompt: "Read the school note and answer."
passageTitle: "Après l'école"
passage: |
  Bonjour! Je vais à la bibliothèque.
  J'aime lire, mais je n'aime pas les maths.
question: "Where is the speaker going?"
choices:
  - "to the library"
  - "to the park"
  - "to math class"
  - "to the café"
correctAnswer: "to the library"
explanation: "Je vais à la bibliothèque tells the destination."
hint: "Find the sentence with je vais."
questionGoal: "Interpret destination information in a mixed school note."
misconception: "Choosing an answer from a familiar subject word instead of the going phrase."
```

```question
key: u06_l04_q05_match_dialogue_jobs
type: match-pairs
prompt: "Match each French line to its communication job."
pairs:
  - left: "J'aime les sciences."
    right: "state a school preference"
  - left: "Je vais à la bibliothèque."
    right: "say a destination"
  - left: "Le livre est sur la table."
    right: "tell where an object is"
  - left: "Il y a un cahier."
    right: "say what is present"
explanation: "The verb chunk tells whether the sentence is about liking, going, location, or existence."
hint: "Look at j'aime, je vais, est, and il y a."
questionGoal: "Classify common school sentence frames by purpose."
misconception: "Matching by nouns while ignoring the sentence frame."
```

```question
key: u06_l04_q06_write_school_exchange
type: text-input
prompt: "Type the French question: Do you like French?"
acceptedAnswers:
  - "Est-ce que tu aimes le français?"
  - "Est-ce que tu aimes le français"
answerType: text
explanation: "A compact school exchange can combine greetings, questions, and school words."
hint: "Use Est-ce que tu aimes plus the school subject le français."
questionGoal: "Produce a constrained school question."
misconception: "Writing disconnected school phrases instead of an exchange."
```

## Unit 7: Food, Choices, Routines, And Novice Capstone

### Lesson 1: Foods, Drinks, And Polite Requests

Students identify common foods and drinks and request them politely.

```question
key: u07_l01_q01_match_foods
type: match-pairs
prompt: "Match each food or drink to English."
pairs:
  - left: "le pain"
    right: "bread"
  - left: "le fromage"
    right: "cheese"
  - left: "la pomme"
    right: "apple"
  - left: "l'eau"
    right: "water"
explanation: "Food words should be learned with their articles when possible."
hint: "Look for cognates and familiar menu words."
questionGoal: "Recognize common food and drink words with articles."
misconception: "Dropping articles or guessing only from English-looking words."
```

```question
key: u07_l01_q02_polite_request
type: fill-blank
prompt: "Complete the polite request: I would like a sandwich, please."
sentenceBefore: "Je voudrais un sandwich,"
sentenceAfter: "."
choices:
  - "s'il vous plaît"
  - "au revoir"
  - "merci"
  - "il pleut"
correctAnswer: "s'il vous plaît"
explanation: "S'il vous plaît makes the request polite."
hint: "Choose the polite phrase used with requests."
questionGoal: "Use politeness in a food request."
misconception: "Treating polite language as optional or unrelated to food exchanges."
```

```question
key: u07_l01_q03_je_voudrais_meaning
type: multiple-choice
prompt: "What does Je voudrais un croissant mean in a café exchange?"
choices:
  - "I would like a croissant."
  - "I do not like croissants."
  - "I am going to a croissant."
  - "There is a croissant."
correctAnswer: "I would like a croissant."
explanation: "Je voudrais is a polite way to say I would like."
hint: "Think of ordering or requesting."
questionGoal: "Recognize je voudrais as a polite request chunk."
misconception: "Confusing wanting/requesting with liking, going, or existence."
```

```question
key: u07_l01_q04_order_cafe_request
type: order-items
prompt: "Put the polite request in order."
items:
  - "un jus,"
  - "s'il vous plaît."
  - "Je voudrais"
correctOrder:
  - "Je voudrais"
  - "un jus,"
  - "s'il vous plaît."
explanation: "Je voudrais un jus, s'il vous plaît means I would like a juice, please."
hint: "Start with the request chunk, then the item, then please."
questionGoal: "Build a polite food or drink request."
misconception: "Separating request, item, and politeness into an unnatural order."
```

```question
key: u07_l01_q05_cafe_dialogue
type: dialogue-builder
prompt: "Choose the best customer line."
turns:
  - speaker: "Serveur"
    line: "Bonjour!"
  - speaker: "Client"
    line: "?"
choices:
  - "Bonjour. Je voudrais une salade, s'il vous plaît."
  - "Salut. Le stylo est sous le sac."
  - "Il neige et je vais au parc."
  - "Comment tu t'appelles, le croissant?"
correctAnswer: "Bonjour. Je voudrais une salade, s'il vous plaît."
explanation: "A café exchange needs a greeting and a polite request."
hint: "Choose the line that orders food politely."
questionGoal: "Choose a fitting food-service request in dialogue."
misconception: "Using unrelated memorized sentences in a service exchange."
```

```question
key: u07_l01_q06_say_request
type: text-input
prompt: "Type the French sentence: I would like a croissant, please."
acceptedAnswers:
  - "Je voudrais un croissant, s'il vous plaît."
  - "Je voudrais un croissant s'il vous plaît"
answerType: text
explanation: "A short polite request is useful real-world novice language."
hint: "Use Je voudrais, the food item, and s'il vous plaît."
questionGoal: "Produce a constrained polite food request."
misconception: "Using a direct want phrase without politeness in a service context."
```

### Lesson 2: Je Voudrais, Prices, And Choices

Students combine wanting, numbers, prices, and choices in short exchanges.

```question
key: u07_l02_q01_cest_combien
type: multiple-choice
prompt: "What does C'est combien? ask in a café or shop?"
choices:
  - "How much is it?"
  - "What is your name?"
  - "Where are you going?"
  - "How is the weather?"
correctAnswer: "How much is it?"
explanation: "C'est combien? asks the price."
hint: "Combien points to how much or how many."
questionGoal: "Recognize the price question."
misconception: "Confusing combien with other familiar question words."
```

```question
key: u07_l02_q02_price_answer
type: dialogue-builder
prompt: "Choose the answer that fits."
turns:
  - speaker: "Client"
    line: "C'est combien?"
choices:
  - "C'est trois euros."
  - "J'ai trois ans."
  - "Je voudrais trois euros."
  - "C'est un sandwich."
correctAnswer: "C'est trois euros."
explanation: "A price answer can be C'est + number + euros."
hint: "Look for the line with euros."
questionGoal: "Match a price question to a price answer."
misconception: "Recognizing the number but missing the price frame."
```

```question
key: u07_l02_q03_menu_reading
type: passage-question
prompt: "Read the mini-menu and answer."
passageTitle: "Menu"
passage: |
  Un croissant: deux euros
  Un sandwich: cinq euros
  Un jus: trois euros
question: "How much is un sandwich?"
choices:
  - "five euros"
  - "two euros"
  - "three euros"
  - "one euro"
correctAnswer: "five euros"
explanation: "The menu says Un sandwich: cinq euros."
hint: "Find sandwich, then read the number beside it."
questionGoal: "Read a simple price on a menu."
misconception: "Choosing a familiar food or number without matching the item."
```

```question
key: u07_l02_q04_type_price_number
type: text-input
prompt: "Type the numeral in this price: C'est sept euros."
acceptedAnswers:
  - "7"
answerType: number
explanation: "Sept means 7."
hint: "Sept sounds and looks close to seven."
questionGoal: "Interpret a number in a price phrase."
misconception: "Losing number meaning when it appears inside a service exchange."
```

```question
key: u07_l02_q05_polite_or_direct
type: multiple-choice
prompt: "In a café, which line is more polite?"
choices:
  - "Je voudrais un chocolat chaud, s'il vous plaît."
  - "Je veux un chocolat chaud."
  - "Donne un chocolat chaud."
  - "J'aime le chocolat chaud."
correctAnswer: "Je voudrais un chocolat chaud, s'il vous plaît."
explanation: "Je voudrais plus s'il vous plaît is the polite request form practiced here."
hint: "Look for both I would like and please."
questionGoal: "Choose the more polite request in a service context."
misconception: "Treating je veux and je voudrais as pragmatically identical."
```

```question
key: u07_l02_q06_write_price_exchange
type: text-input
prompt: "Type the French price question: How much is it?"
acceptedAnswers:
  - "C'est combien?"
  - "C'est combien"
answerType: text
explanation: "A price exchange can be very short and still complete."
hint: "Use the c'est question with combien."
questionGoal: "Produce a constrained price question."
misconception: "Answering c'est combien with a food preference instead of a price."
```

### Lesson 3: Simple Routines With Familiar Chunks

Students describe a daily routine with time-of-day phrases and known chunks.

```question
key: u07_l03_q01_match_time_phrases
type: match-pairs
prompt: "Match each time phrase to English."
pairs:
  - left: "le matin"
    right: "in the morning"
  - left: "l'après-midi"
    right: "in the afternoon"
  - left: "le soir"
    right: "in the evening"
  - left: "aujourd'hui"
    right: "today"
explanation: "Time phrases help organize a simple routine."
hint: "Matin connects to morning; soir connects to evening."
questionGoal: "Recognize simple time-of-day routine phrases."
misconception: "Treating time phrases as interchangeable labels."
```

```question
key: u07_l03_q02_order_routine
type: order-items
prompt: "Put the routine in a natural day order."
items:
  - "Le soir, je fais mes devoirs."
  - "Le matin, je vais à l'école."
  - "L'après-midi, je fais du sport."
correctOrder:
  - "Le matin, je vais à l'école."
  - "L'après-midi, je fais du sport."
  - "Le soir, je fais mes devoirs."
explanation: "Morning comes first, then afternoon, then evening."
hint: "Use the time phrases to order the routine."
questionGoal: "Use time phrases to organize a simple routine."
misconception: "Ordering by familiar verbs instead of time clues."
```

```question
key: u07_l03_q03_complete_routine
type: multi-blank-cloze
prompt: "Complete the routine sentences."
parts:
  - "Le matin, je "
  - " à l'école. Le soir, je "
  - " mes devoirs."
blanks:
  - correctAnswer: "vais"
    choices:
      - "vais"
      - "suis"
      - "pleut"
  - correctAnswer: "fais"
    choices:
      - "fais"
      - "aime"
      - "ai"
explanation: "Je vais à l'école and je fais mes devoirs are familiar routine chunks."
hint: "Going uses je vais; homework uses je fais."
questionGoal: "Use familiar verb chunks in a routine context."
misconception: "Choosing a familiar verb chunk without checking the routine phrase."
```

```question
key: u07_l03_q04_routine_reading
type: passage-question
prompt: "Read the routine and answer."
passageTitle: "La journée de Mina"
passage: |
  Le matin, je mange une pomme.
  L'après-midi, je vais au parc.
  Le soir, j'écoute de la musique.
question: "What do I do in the evening?"
choices:
  - "listens to music"
  - "goes to the park"
  - "eats an apple"
  - "studies math"
correctAnswer: "listens to music"
explanation: "Le soir, j'écoute de la musique tells the evening action."
hint: "Find le soir, then read the action after it."
questionGoal: "Interpret a short routine text using time clues."
misconception: "Choosing an action from the text without matching the time phrase."
```

```question
key: u07_l03_q05_present_chunk_not_past
type: multiple-choice
prompt: "Which sentence gives a simple morning routine?"
choices:
  - "Le matin, je vais à l'école."
  - "Le soir, je fais mes devoirs."
  - "J'aime le français."
  - "Je voudrais un sandwich."
correctAnswer: "Le matin, je vais à l'école."
explanation: "Le matin marks a morning routine, and je vais à l'école is a learned routine chunk."
hint: "Look for le matin and je vais."
questionGoal: "Keep routine production within French 1 scope."
misconception: "Choosing a familiar sentence that does not match the time-of-day prompt."
```

```question
key: u07_l03_q06_write_routine
type: text-input
prompt: "Type the French sentence: In the evening, I do my homework."
acceptedAnswers:
  - "Le soir, je fais mes devoirs."
  - "Le soir, je fais mes devoirs"
answerType: text
explanation: "A simple routine can be accurate with two short present-tense chunks."
hint: "Use le soir plus the homework chunk je fais mes devoirs."
questionGoal: "Produce a constrained routine sentence."
misconception: "Writing a disconnected word list instead of routine sentences."
```

### Lesson 4: French 1 Capstone Exchange

Students recombine familiar French 1 language in mixed novice tasks.

```question
key: u07_l04_q01_capstone_profile_reading
type: passage-question
prompt: "Read the profile and answer."
passageTitle: "Profil de Clara"
passage: |
  Bonjour! Je m'appelle Clara.
  J'ai douze ans et j'habite à Montréal.
  J'aime la musique, mais je n'aime pas les maths.
question: "Which statement is true?"
choices:
  - "Clara lives in Montreal and likes music."
  - "Clara is twenty and likes math."
  - "Clara lives in Paris and likes rain."
  - "Clara is a teacher and dislikes music."
correctAnswer: "Clara lives in Montreal and likes music."
explanation: "The profile says j'habite à Montréal and j'aime la musique."
hint: "Find the residence sentence and the preference sentence."
questionGoal: "Interpret identity, residence, and preference information in a mixed profile."
misconception: "Reading one familiar phrase but missing the combined meaning."
```

```question
key: u07_l04_q02_capstone_dialogue_reply
type: dialogue-builder
prompt: "Choose the best next line."
turns:
  - speaker: "Amina"
    line: "Bonjour! Comment tu t'appelles?"
choices:
  - "Je m'appelle Jules."
  - "Il fait froid."
  - "C'est trois euros."
  - "Le livre est sur la table."
correctAnswer: "Je m'appelle Jules."
explanation: "Comment tu t'appelles? asks for a name."
hint: "Answer the name question, not weather, price, or location."
questionGoal: "Use a question word and familiar phrase to choose a fitting reply."
misconception: "Choosing any familiar sentence instead of answering the question asked."
```

```question
key: u07_l04_q03_capstone_mixed_cloze
type: multi-blank-cloze
prompt: "Complete the mixed French 1 profile."
parts:
  - "Je m'appelle Sami. J'"
  - " treize ans. Dans ma famille, il y a "
  - " soeur. J'"
  - " écouter de la musique."
blanks:
  - correctAnswer: "ai"
    choices:
      - "ai"
      - "suis"
      - "vais"
  - correctAnswer: "une"
    choices:
      - "une"
      - "un"
      - "les"
  - correctAnswer: "aime"
    choices:
      - "aime"
      - "habite"
      - "fais"
explanation: "The profile combines age, family articles, and preference language."
hint: "Age uses j'ai; soeur uses une; preferences use j'aime."
questionGoal: "Recombine age, article, and preference chunks in one profile."
misconception: "Forgetting earlier form clues when topics are mixed."
```

```question
key: u07_l04_q04_capstone_choose_function
type: match-pairs
prompt: "Match each French line to its function."
pairs:
  - left: "Je voudrais un sandwich."
    right: "make a polite food request"
  - left: "Où habites-tu?"
    right: "ask where someone lives"
  - left: "Il fait beau."
    right: "describe the weather"
  - left: "Le stylo est dans le sac."
    right: "tell where an object is"
explanation: "Capstone tasks ask you to recognize what each familiar chunk is doing."
hint: "Look at the verb or question word first."
questionGoal: "Classify familiar language by communication purpose."
misconception: "Translating isolated words without identifying the sentence's job."
```

```question
key: u07_l04_q05_capstone_short_profile
type: multiple-choice
prompt: "Which short profile uses familiar French 1 chunks accurately?"
choices:
  - "Bonjour. Je m'appelle Alex. J'ai douze ans. J'aime le français."
  - "Bonjour. Je suis douze ans. J'ai Alex. J'aime le français."
  - "Au revoir. Il pleut Alex. C'est trois ans."
  - "Je voudrais Alex. Le français est dans le sac."
correctAnswer: "Bonjour. Je m'appelle Alex. J'ai douze ans. J'aime le français."
explanation: "A strong French 1 profile recombines familiar chunks accurately."
hint: "Look for correct name, age, and preference chunks."
questionGoal: "Choose a compact presentational profile using cumulative language."
misconception: "Trying to write beyond novice control instead of recombining known chunks."
```

```question
key: u07_l04_q06_capstone_speaking
type: order-items
prompt: "Put the capstone profile in a natural order."
items:
  - "J'aime la musique."
  - "Bonjour."
  - "J'ai douze ans."
  - "Je m'appelle Alex."
correctOrder:
  - "Bonjour."
  - "Je m'appelle Alex."
  - "J'ai douze ans."
  - "J'aime la musique."
explanation: "The capstone sequence uses short familiar chunks for greeting, name, age, and preference."
hint: "Start with the greeting, then give name, age, and preference."
questionGoal: "Sequence cumulative presentational chunks."
misconception: "Equating mastery with long speech instead of clear familiar sentences."
```
