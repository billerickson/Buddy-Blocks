# Spanish 1 Question Sets

Sources: accepted Spanish 1 blueprint, course map, unit design briefs, and lesson briefs in `research/spanish-1/`.

## Unit 1: First Spanish Moves

### Lesson 1: Greetings And Polite Openings

```question
key: u01_l01_q01_morning_greeting
type: multiple-choice
prompt: "You see your teacher in the morning. Which greeting fits best?"
choices:
  - "Buenos días"
  - "Buenas noches"
  - "Adiós"
  - "De nada"
correctAnswer: "Buenos días"
explanation: "Buenos días is the usual greeting for the morning."
hint: "Look for the greeting connected to morning."
questionGoal: "Choose a greeting that fits time of day."
misconception: "Using one memorized greeting without checking the context."
```

```question
key: u01_l01_q02_polite_phrases
type: match-pairs
prompt: "Match each Spanish phrase to its meaning."
pairs:
  - left: "hola"
    right: "hello"
  - left: "gracias"
    right: "thank you"
  - left: "de nada"
    right: "you're welcome"
  - left: "por favor"
    right: "please"
explanation: "These short phrases help make a Spanish exchange polite and clear."
hint: "Think about when each phrase is used in a conversation."
questionGoal: "Recognize common greeting and courtesy phrases."
misconception: "Treating polite responses as interchangeable."
```

```question
key: u01_l01_q03_thanks_response
type: dialogue-builder
prompt: "Choose the best next line."
turns:
  - speaker: "Ana"
    line: "Gracias."
choices:
  - "De nada."
  - "Buenos días."
  - "Me llamo Ana."
  - "Adiós."
correctAnswer: "De nada."
explanation: "De nada is the polite response to gracias."
hint: "Ana said thank you. Choose the response to thanks."
questionGoal: "Use a courtesy response in dialogue."
misconception: "Answering a courtesy phrase with an unrelated greeting."
```

```question
key: u01_l01_q04_request_politely
type: fill-blank
prompt: "Complete the polite request."
sentenceBefore: ""
sentenceAfter: ", repite."
choices:
  - "Por favor"
  - "Adiós"
  - "De nada"
  - "Buenas noches"
correctAnswer: "Por favor"
explanation: "Por favor means please, so it makes the request polite."
hint: "Choose the phrase that means please."
questionGoal: "Use a courtesy word in a request."
misconception: "Leaving politeness out of a direct request."
```

```question
key: u01_l01_q05_farewell_context
type: multiple-choice
prompt: "Your friend is leaving after class. Which phrase fits?"
choices:
  - "Hasta luego"
  - "Buenos días"
  - "De nada"
  - "Por favor"
correctAnswer: "Hasta luego"
explanation: "Hasta luego is a farewell, like see you later."
hint: "The person is leaving, so look for a goodbye phrase."
questionGoal: "Choose a farewell for a leaving context."
misconception: "Confusing greetings, farewells, and courtesy phrases."
```

```question
key: u01_l01_q06_say_polite_opening
type: multiple-choice
prompt: "Which short opening includes both a greeting and a polite phrase?"
choices:
  - "Hola. Gracias."
  - "Adiós. Me llamo Ana."
  - "De nada. Hasta luego."
  - "Lee el texto."
correctAnswer: "Hola. Gracias."
explanation: "Hola is a greeting, and gracias is a polite courtesy phrase."
hint: "Look for one line that starts socially and also uses courtesy language."
questionGoal: "Choose a short opening that combines greeting and courtesy language."
misconception: "Recognizing polite words separately but not using them as social moves."
```

### Lesson 2: Names And Simple Introductions

```question
key: u01_l02_q01_name_answer
type: dialogue-builder
prompt: "Choose the best answer."
turns:
  - speaker: "Lucia"
    line: "¿Cómo te llamas?"
choices:
  - "Me llamo Diego."
  - "Estoy bien."
  - "Hace sol."
  - "De nada."
correctAnswer: "Me llamo Diego."
explanation: "¿Cómo te llamas? asks for a name, and Me llamo... answers with a name."
hint: "Look for the answer that gives a name."
questionGoal: "Answer the name question with the correct chunk."
misconception: "Answering a name question with a feeling or courtesy phrase."
```

```question
key: u01_l02_q02_intro_order
type: order-items
prompt: "Put the simple introduction in a logical order."
items:
  - "Me llamo Ana."
  - "Hola."
  - "¿Cómo te llamas?"
  - "¿Cómo estás?"
  - "Estoy bien."
correctOrder:
  - "Hola."
  - "¿Cómo te llamas?"
  - "Me llamo Ana."
  - "¿Cómo estás?"
  - "Estoy bien."
explanation: "A short introduction can begin with a greeting, ask and answer a name question, then ask and answer how someone is."
hint: "Start with the greeting."
questionGoal: "Sequence familiar introductory lines."
misconception: "Treating dialogue lines as isolated translations instead of turns."
```

```question
key: u01_l02_q03_complete_intro
type: multi-blank-cloze
prompt: "Complete the introduction."
parts:
  - "Hola. Me "
  - " Sofia. Estoy "
  - "."
blanks:
  - correctAnswer: "llamo"
    acceptedAnswers:
      - "llamo"
  - correctAnswer: "bien"
    acceptedAnswers:
      - "bien"
explanation: "Me llamo gives a name, and estoy bien gives a simple response to how you are."
hint: "Use the name chunk first, then the feeling word."
questionGoal: "Complete memorized introduction chunks."
misconception: "Mixing courtesy words into name or feeling chunks."
```

```question
key: u01_l02_q04_how_are_you_answer
type: multiple-choice
prompt: "Which answer fits ¿Cómo estás?"
choices:
  - "Estoy bien."
  - "Me llamo Eva."
  - "Buenos días."
  - "Por favor."
correctAnswer: "Estoy bien."
explanation: "¿Cómo estás? asks how you are, so Estoy bien is a fitting answer."
hint: "Find the answer that tells how someone feels."
questionGoal: "Match a well-being question to a fitting answer."
misconception: "Confusing the name question and the how-are-you question."
```

```question
key: u01_l02_q05_fix_name_chunk
type: error-correction
prompt: "Correct the sentence."
sentence: "Me llamo es Ana."
acceptedAnswers:
  - "Me llamo Ana."
explanation: "Me llamo Ana is already a complete name answer. It does not need es."
hint: "Use the whole chunk Me llamo plus the name."
questionGoal: "Avoid adding English-like extra words to the name chunk."
misconception: "Translating word by word from 'my name is.'"
```

```question
key: u01_l02_q06_speak_intro
type: text-input
prompt: "Type a Spanish name answer for Alex using Me llamo."
acceptedAnswers:
  - "Me llamo Alex."
  - "Me llamo Alex"
answerType: text
explanation: "Me llamo Alex is the complete Spanish chunk for giving that name."
hint: "Use Me llamo followed by the name."
questionGoal: "Produce the memorized name-answer chunk in writing."
misconception: "Recognizing Me llamo but not being able to use it with a name."
```

### Lesson 3: Classroom Survival Phrases

```question
key: u01_l03_q01_command_actions
type: match-pairs
prompt: "Match each classroom phrase to the action."
pairs:
  - left: "escucha"
    right: "listen"
  - left: "lee"
    right: "read"
  - left: "repite"
    right: "repeat"
  - left: "escribe"
    right: "write"
explanation: "Classroom phrases tell you what action to take."
hint: "Think of the classroom action each word signals."
questionGoal: "Recognize common classroom commands."
misconception: "Treating classroom commands as vocabulary labels instead of action cues."
```

```question
key: u01_l03_q02_need_help
type: multiple-choice
prompt: "You do not understand. What can you say?"
choices:
  - "No entiendo."
  - "Estoy bien."
  - "Hasta luego."
  - "Me llamo."
correctAnswer: "No entiendo."
explanation: "No entiendo means I do not understand, so it is a useful help phrase."
hint: "Choose the phrase that asks for help with understanding."
questionGoal: "Use a self-advocacy phrase in class."
misconception: "Thinking help phrases are impolite or unrelated to learning."
```

```question
key: u01_l03_q03_repeat_please
type: dialogue-builder
prompt: "Choose the best next line."
turns:
  - speaker: "Maestra"
    line: "Escucha."
  - speaker: "Estudiante"
    line: "No entiendo."
choices:
  - "Otra vez, por favor."
  - "De nada."
  - "Me llamo Carlos."
  - "Buenas noches."
correctAnswer: "Otra vez, por favor."
explanation: "Otra vez, por favor asks to hear it again politely."
hint: "The student needs the teacher to repeat."
questionGoal: "Choose a classroom help phrase that fits the exchange."
misconception: "Responding to confusion with an unrelated social phrase."
```

```question
key: u01_l03_q04_read_command
type: fill-blank
prompt: "Complete the classroom direction."
sentenceBefore: ""
sentenceAfter: " el texto."
choices:
  - "Lee"
  - "Gracias"
  - "Adiós"
  - "Tengo"
correctAnswer: "Lee"
explanation: "Lee means read, so Lee el texto means Read the text."
hint: "Look for the classroom action that matches texto."
questionGoal: "Recognize a command in a short classroom phrase."
misconception: "Choosing a familiar social word instead of an action word."
```

```question
key: u01_l03_q05_listen_action
type: multiple-choice
prompt: "When the teacher says Escucha, what should you do?"
choices:
  - "Listen"
  - "Write"
  - "Say goodbye"
  - "Give your name"
correctAnswer: "Listen"
explanation: "Escucha is the classroom command for listen."
hint: "Escucha looks and sounds like a listening action."
questionGoal: "Connect a Spanish command to the expected classroom action."
misconception: "Translating only familiar-looking words and missing action meaning."
```

```question
key: u01_l03_q06_speak_help_phrase
type: fill-blank
prompt: "Complete the polite classroom help phrase."
sentenceBefore: "Otra vez,"
sentenceAfter: "."
choices:
  - "por favor"
  - "de nada"
  - "adios"
  - "me llamo"
correctAnswer: "por favor"
explanation: "Otra vez, por favor asks for something again politely."
hint: "Choose the courtesy phrase that makes a request polite."
questionGoal: "Complete a classroom self-advocacy phrase."
misconception: "Knowing the help phrase meaning but omitting the polite request word."
```

### Lesson 4: Spanish Sounds And Written Clues

```question
key: u01_l04_q01_silent_h
type: multiple-choice
prompt: "What written clue helps you say hola?"
choices:
  - "The h is silent in hola."
  - "The h sounds like English h."
  - "The o is silent."
  - "The word begins with a j sound."
correctAnswer: "The h is silent in hola."
explanation: "In Spanish, h is usually silent, so hola starts with the vowel sound."
hint: "Think about whether Spanish h is pronounced."
questionGoal: "Recognize silent h in a familiar word."
misconception: "Pronouncing Spanish h like English h."
```

```question
key: u01_l04_q02_written_clues
type: match-pairs
prompt: "Match each written clue to the example."
pairs:
  - left: "ñ"
    right: "señor"
  - left: "opening question mark"
    right: "¿Cómo?"
  - left: "j sound"
    right: "jugo"
  - left: "accent mark"
    right: "adiós"
explanation: "Spanish spelling and punctuation give clues about sound and sentence type."
hint: "Look for the visible mark or letter in each example."
questionGoal: "Identify written Spanish sound and punctuation features."
misconception: "Ignoring marks and letters that do not work like English."
```

```question
key: u01_l04_q03_fix_question_marks
type: error-correction
prompt: "Correct the Spanish question punctuation."
sentence: "Cómo estás?"
acceptedAnswers:
  - "¿Cómo estás?"
explanation: "Spanish questions use an opening question mark and a closing question mark."
hint: "Add the mark that tells the reader a question is starting."
questionGoal: "Use inverted question punctuation in a familiar question."
misconception: "Assuming English question punctuation is enough in Spanish."
```

```question
key: u01_l04_q04_vowel_clue
type: multiple-choice
prompt: "Which statement is a helpful beginner rule for Spanish vowels?"
choices:
  - "Spanish vowels usually keep clear, steady sounds."
  - "Spanish vowels are usually silent."
  - "Spanish vowels change as much as English vowels."
  - "Spanish has no vowel sounds."
correctAnswer: "Spanish vowels usually keep clear, steady sounds."
explanation: "Spanish spelling is more regular than English, so vowels are useful pronunciation clues."
hint: "Think about why Spanish spelling can help pronunciation."
questionGoal: "Notice Spanish vowel regularity at a beginner level."
misconception: "Expecting Spanish vowels to behave like English vowels."
```

```question
key: u01_l04_q05_n_tilde
type: fill-blank
prompt: "The Spanish letter that often sounds like 'ny' is ___."
sentenceBefore: ""
sentenceAfter: ""
choices:
  - "ñ"
  - "h"
  - "j"
  - "ll"
correctAnswer: "ñ"
explanation: "The letter ñ appears in words such as español and señor."
hint: "Look for the n with a mark over it."
questionGoal: "Recognize the ñ sound-spelling clue."
misconception: "Treating ñ as the same letter as n."
```

```question
key: u01_l04_q06_speak_sound_clues
type: multiple-choice
prompt: "Which word gives a clue that Spanish h is silent?"
choices:
  - "hola"
  - "jugo"
  - "señor"
  - "gracias"
correctAnswer: "hola"
explanation: "Hola begins with h, but Spanish h is usually silent."
hint: "Look for the word that begins with h."
questionGoal: "Identify a familiar written example of silent h."
misconception: "Seeing pronunciation clues but not connecting them to familiar words."
```

### Lesson 5: Cognates And Mini Dialogues

```question
key: u01_l05_q01_cognate_gist
type: passage-question
prompt: "Read the mini dialogue and answer."
passageTitle: "En clase"
passage: |
  Profe: Hola, clase.
  Mateo: Hola, profesora.
  Profe: Clase de música hoy.
question: "Which word is a helpful cognate for understanding the topic?"
choices:
  - "Música"
  - "Hola"
  - "Hoy"
  - "Mateo"
correctAnswer: "Música"
explanation: "Música looks like music and helps you infer the class topic."
hint: "Look for the Spanish word that looks like an English word about a subject."
questionGoal: "Use a cognate to infer gist in a short dialogue."
misconception: "Reading only memorized phrases and missing helpful cognates."
```

```question
key: u01_l05_q02_cognate_strategy
type: multiple-choice
prompt: "What is the best way to use a cognate?"
choices:
  - "Use it as a clue, then check the context."
  - "Assume it always means exactly the English word."
  - "Ignore it because Spanish and English never overlap."
  - "Translate every word before reading the sentence."
correctAnswer: "Use it as a clue, then check the context."
explanation: "Cognates are useful clues, but context helps confirm the meaning."
hint: "A good clue still needs to be checked."
questionGoal: "Apply a careful cognate strategy."
misconception: "Overtrusting or ignoring cognates."
```

```question
key: u01_l05_q03_cognate_pairs
type: match-pairs
prompt: "Match each cognate to its English meaning."
pairs:
  - left: "familia"
    right: "family"
  - left: "color"
    right: "color"
  - left: "animal"
    right: "animal"
  - left: "hospital"
    right: "hospital"
explanation: "These cognates look similar and have related meanings in English and Spanish."
hint: "Look for spelling and sound overlap."
questionGoal: "Recognize reliable beginner cognates."
misconception: "Thinking Spanish vocabulary must always look unfamiliar."
```

```question
key: u01_l05_q04_dialogue_order
type: order-items
prompt: "Put the mini dialogue in order."
items:
  - "Me llamo Maya."
  - "Hola."
  - "¿Cómo te llamas?"
  - "Adiós."
correctOrder:
  - "Hola."
  - "¿Cómo te llamas?"
  - "Me llamo Maya."
  - "Adiós."
explanation: "The exchange starts with a greeting, asks a name, answers the name, and ends with a farewell."
hint: "Start with the greeting, then ask the question."
questionGoal: "Build a short introductory dialogue from familiar chunks."
misconception: "Ordering by memorized word recognition rather than conversation logic."
```

```question
key: u01_l05_q05_read_intro
type: passage-question
prompt: "Read the dialogue and answer."
passageTitle: "Dos estudiantes"
passage: |
  Elena: Buenos días.
  Tomas: Buenos días.
  Elena: ¿Cómo te llamas?
  Tomas: Me llamo Tomas.
question: "What does Elena ask Tomas?"
choices:
  - "his name"
  - "his age"
  - "the weather"
  - "the date"
correctAnswer: "his name"
explanation: "¿Cómo te llamas? asks What is your name?"
hint: "Find the question phrase from introductions."
questionGoal: "Understand a familiar question in a short dialogue."
misconception: "Using one familiar word to guess instead of reading the whole turn."
```

```question
key: u01_l05_q06_explain_cognate
type: text-input
prompt: "Type the English meaning of the Spanish cognate familia."
acceptedAnswers:
  - "family"
  - "the family"
answerType: text
explanation: "Familia is a cognate for family, so the spelling gives a useful clue."
hint: "Use the English word that looks and sounds close to familia."
questionGoal: "Use a cognate clue to produce a meaning."
misconception: "Seeing a look-alike word without using it as a checked clue."
```

## Unit 2: Numbers, Calendar, Weather, And Time

### Lesson 1: Numbers 0-31 In Useful Contexts

```question
key: u02_l01_q01_number_flash
type: flash-card
mode: easy
prompt: "Choose the number."
front: "doce"
choices:
  - "12"
  - "2"
  - "20"
  - "30"
correctAnswer: "12"
explanation: "Doce means 12."
hint: "Doce is not dos."
questionGoal: "Recognize a common number word."
misconception: "Confusing similar number words such as dos and doce."
```

```question
key: u02_l01_q02_number_pairs
type: match-pairs
prompt: "Match each Spanish number to the numeral."
pairs:
  - left: "cinco"
    right: "5"
  - left: "diez"
    right: "10"
  - left: "quince"
    right: "15"
  - left: "veinte"
    right: "20"
explanation: "Number words become easier when you retrieve them in useful groups."
hint: "Say each word slowly and listen for a pattern you know."
questionGoal: "Match number words to numerals."
misconception: "Relying only on counting order instead of recognizing the word."
```

```question
key: u02_l01_q03_quantity_context
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "Hay"
sentenceAfter: "lápices."
choices:
  - "tres"
  - "gracias"
  - "lunes"
  - "frío"
correctAnswer: "tres"
explanation: "Tres is a number, so it fits a quantity of pencils."
hint: "The sentence needs a number."
questionGoal: "Use a number word in a quantity context."
misconception: "Choosing a familiar word without checking what kind of word is needed."
```

```question
key: u02_l01_q04_type_twenty
type: text-input
prompt: "Type the Spanish word for 20."
acceptedAnswers:
  - "veinte"
answerType: text
explanation: "Veinte means 20."
hint: "It starts with vei-."
questionGoal: "Produce a high-frequency number word after recognition practice."
misconception: "Confusing veinte and treinta."
```

```question
key: u02_l01_q05_choose_fifteen
type: multiple-choice
prompt: "Which Spanish number means 15?"
choices:
  - "quince"
  - "cinco"
  - "catorce"
  - "veinticinco"
correctAnswer: "quince"
explanation: "Quince means 15."
hint: "Cinco is 5, so look for the teen number."
questionGoal: "Distinguish a teen number from similar-looking numbers."
misconception: "Choosing a familiar part of the word instead of the whole number."
```

```question
key: u02_l01_q06_numeral_thirty_one
type: text-input
prompt: "Type the numeral for treinta y uno."
acceptedAnswers:
  - "31"
answerType: number
explanation: "Treinta y uno means thirty-one."
hint: "Treinta is 30, and uno adds 1."
questionGoal: "Interpret a compound number phrase."
misconception: "Reading only uno and ignoring treinta."
```

### Lesson 2: Age With Tener

```question
key: u02_l02_q01_age_dialogue
type: dialogue-builder
prompt: "Choose the best answer."
turns:
  - speaker: "Rosa"
    line: "¿Cuántos años tienes?"
choices:
  - "Tengo once años."
  - "Me llamo Rosa."
  - "Hace frío."
  - "Buenos días."
correctAnswer: "Tengo once años."
explanation: "The question asks age, so the answer uses Tengo... años."
hint: "Look for the answer with years."
questionGoal: "Answer the age question with the tener age formula."
misconception: "Answering an age question with a name or greeting."
```

```question
key: u02_l02_q02_complete_age
type: multi-blank-cloze
prompt: "Complete the age sentence."
parts:
  - "Yo "
  - " trece "
  - "."
blanks:
  - correctAnswer: "tengo"
    acceptedAnswers:
      - "tengo"
  - correctAnswer: "años"
    acceptedAnswers:
      - "años"
      - "anos"
explanation: "Spanish uses Tengo... años to say age."
hint: "Use the age chunk, not the English word order."
questionGoal: "Complete the Spanish age formula."
misconception: "Using soy because English says I am."
```

```question
key: u02_l02_q03_fix_age_error
type: error-correction
prompt: "Correct the age sentence."
sentence: "Soy doce años."
acceptedAnswers:
  - "Tengo doce años."
  - "Yo tengo doce años."
explanation: "Spanish uses tener for age: Tengo doce años."
hint: "Replace the English-like I am pattern with the tener age chunk."
questionGoal: "Correct English transfer in age statements."
misconception: "Translating 'I am twelve years old' word for word."
```

```question
key: u02_l02_q04_age_meaning
type: multiple-choice
prompt: "What does Tengo catorce años mean?"
choices:
  - "I am 14 years old."
  - "My name is Catorce."
  - "It is 14 o'clock."
  - "I have 14 pencils."
correctAnswer: "I am 14 years old."
explanation: "In the age formula, Tengo catorce años means I am 14 years old."
hint: "The word años tells you this is about age."
questionGoal: "Interpret the tener age formula."
misconception: "Reading tengo only as literal possession in every context."
```

```question
key: u02_l02_q05_age_question_word
type: fill-blank
prompt: "Complete the age question."
sentenceBefore: "¿Cuántos años"
sentenceAfter: "?"
choices:
  - "tienes"
  - "tengo"
  - "llamas"
  - "gracias"
correctAnswer: "tienes"
explanation: "¿Cuántos años tienes? asks how old you are."
hint: "The question asks you, so it uses tienes."
questionGoal: "Complete the memorized age question."
misconception: "Confusing the question form tienes with the answer form tengo."
```

```question
key: u02_l02_q06_speak_age
type: text-input
prompt: "Type a Spanish age answer for 12 years old."
acceptedAnswers:
  - "Tengo doce años."
  - "Tengo doce años"
  - "Tengo 12 años."
  - "Tengo 12 años"
answerType: text
explanation: "Tengo doce años is the Spanish age formula for I am 12 years old."
hint: "Use Tengo, a number, and años."
questionGoal: "Produce the tener age formula in writing."
misconception: "Recognizing the age formula but not producing the full chunk."
```

### Lesson 3: Days, Months, And Dates

```question
key: u02_l03_q01_days_match
type: match-pairs
prompt: "Match each day to English."
pairs:
  - left: "lunes"
    right: "Monday"
  - left: "martes"
    right: "Tuesday"
  - left: "viernes"
    right: "Friday"
  - left: "domingo"
    right: "Sunday"
explanation: "Days of the week are useful for schedules, dates, and routines."
hint: "Use any sound or spelling pattern you recognize."
questionGoal: "Recognize common day words."
misconception: "Treating days as isolated memorized sounds with no retrieval pattern."
```

```question
key: u02_l03_q02_today_is
type: fill-blank
prompt: "Complete the sentence."
sentenceBefore: "Hoy es"
sentenceAfter: "."
choices:
  - "lunes"
  - "enero"
  - "trece"
  - "hace sol"
correctAnswer: "lunes"
explanation: "Hoy es lunes means Today is Monday."
hint: "Choose a day, not a month, number, or weather phrase."
questionGoal: "Use a day word in a date context."
misconception: "Mixing days, months, numbers, and weather phrases."
```

```question
key: u02_l03_q03_birthday_reading
type: passage-question
prompt: "Read the note and answer."
passageTitle: "Cumpleaños"
passage: |
  Me llamo Isabel.
  Mi cumpleaños es el cinco de mayo.
question: "When is Isabel's birthday?"
choices:
  - "May 5"
  - "March 5"
  - "May 15"
  - "Monday"
correctAnswer: "May 5"
explanation: "El cinco de mayo means the fifth of May."
hint: "Cinco is 5 and mayo is May."
questionGoal: "Interpret a birthday date in a short note."
misconception: "Missing the month or reading only the number."
```

```question
key: u02_l03_q04_calendar_capitalization
type: multiple-choice
prompt: "Which Spanish date sentence is written in the usual beginner style?"
choices:
  - "Hoy es martes."
  - "Hoy es Martes."
  - "Hoy martes es."
  - "Hoy es trece."
correctAnswer: "Hoy es martes."
explanation: "Spanish days are normally lowercase, and Hoy es martes is the standard order."
hint: "Spanish days usually do not start with a capital letter."
questionGoal: "Notice lowercase Spanish day names and basic order."
misconception: "Applying English capitalization and word order to Spanish dates."
```

```question
key: u02_l03_q05_birthday_frame
type: multi-blank-cloze
prompt: "Complete the birthday sentence for April 10."
parts:
  - "Mi cumpleaños es el "
  - " de "
  - "."
blanks:
  - correctAnswer: "10"
    acceptedAnswers:
      - "10"
      - "diez"
  - correctAnswer: "abril"
    acceptedAnswers:
      - "abril"
explanation: "The frame for a birthday is el + date number + de + month."
hint: "Use a number first and a month second."
questionGoal: "Complete a supported birthday-date frame."
misconception: "Putting day words or weather phrases into a date frame."
```

```question
key: u02_l03_q06_type_tuesday
type: text-input
prompt: "Type the Spanish word for Tuesday."
acceptedAnswers:
  - "martes"
answerType: text
explanation: "Martes means Tuesday."
hint: "It starts with mar-."
questionGoal: "Produce a common day word after recognition practice."
misconception: "Confusing martes and miercoles."
```

### Lesson 4: Weather And Seasons

```question
key: u02_l04_q01_weather_pairs
type: match-pairs
prompt: "Match each weather phrase to its meaning."
pairs:
  - left: "Hace sol"
    right: "It is sunny"
  - left: "Hace frío"
    right: "It is cold"
  - left: "Llueve"
    right: "It is raining"
  - left: "Nieva"
    right: "It is snowing"
explanation: "Weather phrases often work as chunks, not word-for-word translations."
hint: "Think about the weather condition in each phrase."
questionGoal: "Recognize common weather chunks."
misconception: "Expecting every weather phrase to use the same Spanish word pattern."
```

```question
key: u02_l04_q02_snow_forecast
type: multiple-choice
prompt: "The forecast says snow today. Which Spanish sentence fits?"
choices:
  - "Nieva."
  - "Hace calor."
  - "Me llamo Nieva."
  - "Son las dos."
correctAnswer: "Nieva."
explanation: "Nieva means it is snowing."
hint: "Look for the weather phrase about snow."
questionGoal: "Choose a weather statement from a context."
misconception: "Choosing a familiar sentence pattern that is not about weather."
```

```question
key: u02_l04_q03_sunny_chunk
type: fill-blank
prompt: "Complete the weather phrase."
sentenceBefore: "Hace"
sentenceAfter: "."
choices:
  - "sol"
  - "lunes"
  - "tengo"
  - "gracias"
correctAnswer: "sol"
explanation: "Hace sol means it is sunny."
hint: "Choose the word that completes a weather chunk."
questionGoal: "Complete a fixed weather expression."
misconception: "Filling a chunk with an unrelated familiar word."
```

```question
key: u02_l04_q04_fix_cold_weather
type: error-correction
prompt: "Correct the weather sentence."
sentence: "Es frío hoy."
acceptedAnswers:
  - "Hace frío hoy."
explanation: "For cold weather, use the chunk Hace frío."
hint: "Use the weather chunk with Hace."
questionGoal: "Correct an English-transfer weather expression."
misconception: "Using es for every English 'it is' sentence."
```

```question
key: u02_l04_q05_weather_note
type: passage-question
prompt: "Read the weather note and answer."
passageTitle: "El tiempo"
passage: |
  Hoy es viernes.
  Hace calor.
  Es verano.
question: "What is the weather like?"
choices:
  - "hot"
  - "cold"
  - "raining"
  - "snowing"
correctAnswer: "hot"
explanation: "Hace calor means it is hot."
hint: "Find the sentence that starts with Hace."
questionGoal: "Interpret weather and season context in a short note."
misconception: "Confusing a season statement with a weather statement."
```

```question
key: u02_l04_q06_weather_report
type: text-input
prompt: "Type the Spanish weather sentence for It is sunny."
acceptedAnswers:
  - "Hace sol."
  - "Hace sol"
answerType: text
explanation: "Hace sol is the fixed beginner chunk for It is sunny."
hint: "Use the weather chunk with Hace."
questionGoal: "Produce a common fixed weather expression."
misconception: "Recognizing weather chunks but translating word by word during production."
```

### Lesson 5: Telling Basic Time

```question
key: u02_l05_q01_one_oclock
type: multiple-choice
prompt: "Which Spanish sentence means It is one o'clock?"
choices:
  - "Es la una."
  - "Son las una."
  - "Son las dos."
  - "Hoy es una."
correctAnswer: "Es la una."
explanation: "One o'clock uses the special singular pattern Es la una."
hint: "One o'clock is the special case."
questionGoal: "Recognize the one-o'clock time pattern."
misconception: "Using the plural time pattern for one o'clock."
```

```question
key: u02_l05_q02_time_pairs
type: match-pairs
prompt: "Match each time to Spanish."
pairs:
  - left: "1:00"
    right: "Es la una."
  - left: "2:00"
    right: "Son las dos."
  - left: "4:00"
    right: "Son las cuatro."
  - left: "6:00"
    right: "Son las seis."
explanation: "Use Es la una for 1:00 and Son las for other hours."
hint: "Check whether the hour is one or more than one."
questionGoal: "Match basic clock times to Spanish statements."
misconception: "Treating every time statement as the same pattern."
```

```question
key: u02_l05_q03_complete_time
type: fill-blank
prompt: "Complete the time statement."
sentenceBefore: "Son las"
sentenceAfter: "."
choices:
  - "cinco"
  - "una"
  - "lunes"
  - "años"
correctAnswer: "cinco"
explanation: "Son las cinco means It is five o'clock."
hint: "After Son las, choose an hour greater than one."
questionGoal: "Complete the repeated time pattern."
misconception: "Putting a day, age word, or the singular hour into the plural time pattern."
```

```question
key: u02_l05_q04_half_past
type: multi-blank-cloze
prompt: "Complete the half-hour time for 3:30."
parts:
  - "Son las "
  - " y "
  - "."
blanks:
  - correctAnswer: "tres"
    acceptedAnswers:
      - "tres"
  - correctAnswer: "media"
    acceptedAnswers:
      - "media"
explanation: "Son las tres y media means It is three-thirty."
hint: "Use an hour first, then the half-hour phrase."
questionGoal: "Recognize the beginner half-hour phrase."
misconception: "Mixing time words with date or age words."
```

```question
key: u02_l05_q05_fix_one_time
type: error-correction
prompt: "Correct the time sentence."
sentence: "Son las una."
acceptedAnswers:
  - "Es la una."
explanation: "One o'clock uses Es la una, not Son las una."
hint: "One o'clock is singular."
questionGoal: "Correct the common one-o'clock time error."
misconception: "Overgeneralizing Son las to every hour."
```

```question
key: u02_l05_q06_type_hour
type: text-input
prompt: "Complete the time in Spanish for 3:00: Son las ___."
acceptedAnswers:
  - "tres"
answerType: text
explanation: "Son las tres means It is three o'clock."
hint: "Type the Spanish word for 3."
questionGoal: "Produce a basic hour word inside a time frame."
misconception: "Knowing the number in isolation but not using it in a time phrase."
```

## Unit 3: Classroom Objects And Descriptions

### Lesson 1: Classroom Nouns And Articles

```question
key: u03_l01_q01_libro_flash
type: flash-card
mode: easy
prompt: "Choose the best meaning."
front: "el libro"
choices:
  - "the book"
  - "the table"
  - "the pencil"
  - "the chair"
correctAnswer: "the book"
explanation: "El libro means the book."
hint: "Libro is a classroom object you read."
questionGoal: "Recognize a taught classroom noun with its article."
misconception: "Learning the noun without its article chunk."
```

```question
key: u03_l01_q02_object_pairs
type: match-pairs
prompt: "Match each classroom phrase to English."
pairs:
  - left: "el lápiz"
    right: "the pencil"
  - left: "la mesa"
    right: "the table"
  - left: "la silla"
    right: "the chair"
  - left: "el cuaderno"
    right: "the notebook"
explanation: "Learning classroom nouns with el or la helps you remember the article."
hint: "Match the whole phrase, not just the noun."
questionGoal: "Connect article-noun chunks to meaning."
misconception: "Ignoring articles because the English meaning still seems clear."
```

```question
key: u03_l01_q03_article_mesa
type: multiple-choice
prompt: "Which phrase correctly means the table?"
choices:
  - "la mesa"
  - "el mesa"
  - "los mesa"
  - "mesa el"
correctAnswer: "la mesa"
explanation: "Mesa is taught with la: la mesa."
hint: "Remember the article that belongs with mesa."
questionGoal: "Choose the correct article for a taught feminine noun."
misconception: "Choosing articles by guess or English meaning."
```

```question
key: u03_l01_q04_article_lapiz
type: fill-blank
prompt: "Complete the classroom phrase."
sentenceBefore: ""
sentenceAfter: " lápiz"
choices:
  - "el"
  - "la"
  - "los"
  - "las"
correctAnswer: "el"
explanation: "The taught phrase is el lápiz."
hint: "Use the singular article learned with lápiz."
questionGoal: "Recall the article for a familiar classroom noun."
misconception: "Treating all classroom nouns as if they used la."
```

```question
key: u03_l01_q05_fix_article
type: error-correction
prompt: "Correct the classroom phrase."
sentence: "la libro"
acceptedAnswers:
  - "el libro"
explanation: "Libro uses the article el."
hint: "Use the article that was learned with libro."
questionGoal: "Correct a wrong article on a taught noun."
misconception: "Thinking articles can be chosen randomly."
```

```question
key: u03_l01_q06_explain_article
type: multiple-choice
prompt: "Why is it useful to learn el libro instead of only libro?"
choices:
  - "The article is part of the noun phrase and helps with Spanish patterns."
  - "The article changes the object from a book to a pencil."
  - "Spanish nouns never use articles in sentences."
  - "El means the noun is plural."
correctAnswer: "The article is part of the noun phrase and helps with Spanish patterns."
explanation: "Learning el libro as a phrase helps you remember the article that travels with libro."
hint: "Think about what el adds to the noun phrase."
questionGoal: "Explain why articles should be learned with nouns."
misconception: "Believing articles are optional decoration."
```

### Lesson 2: Singular, Plural, And How Many

```question
key: u03_l02_q01_plural_libro
type: multiple-choice
prompt: "Which phrase means the books?"
choices:
  - "los libros"
  - "el libros"
  - "las libro"
  - "la libros"
correctAnswer: "los libros"
explanation: "El libro becomes los libros when it is plural."
hint: "Both the article and noun need to show plural."
questionGoal: "Form a regular masculine plural noun phrase."
misconception: "Changing only one part of the noun phrase for plural."
```

```question
key: u03_l02_q02_plural_sillas
type: fill-blank
prompt: "Complete the plural phrase."
sentenceBefore: ""
sentenceAfter: " sillas"
choices:
  - "las"
  - "la"
  - "los"
  - "el"
correctAnswer: "las"
explanation: "La silla becomes las sillas when it is plural."
hint: "Sillas is plural and uses the article from la."
questionGoal: "Choose the plural article for a familiar feminine noun."
misconception: "Using singular la with a plural noun."
```

```question
key: u03_l02_q03_quantity_phrase
type: multi-blank-cloze
prompt: "Complete the classroom quantity sentence for two books and three tables."
parts:
  - "Hay "
  - " libros y "
  - " mesas."
blanks:
  - correctAnswer: "dos"
    acceptedAnswers:
      - "dos"
      - "2"
  - correctAnswer: "tres"
    acceptedAnswers:
      - "tres"
      - "3"
explanation: "Dos libros and tres mesas both use numbers with familiar classroom nouns."
hint: "Use the number clue before each noun."
questionGoal: "Use number words with familiar classroom nouns."
misconception: "Mixing calendar or weather words into quantity phrases."
```

```question
key: u03_l02_q04_singular_plural_pairs
type: match-pairs
prompt: "Match each singular phrase to its plural phrase."
pairs:
  - left: "el libro"
    right: "los libros"
  - left: "la silla"
    right: "las sillas"
  - left: "el cuaderno"
    right: "los cuadernos"
  - left: "la carpeta"
    right: "las carpetas"
explanation: "Plural phrases change the article and usually add s to the noun."
hint: "Track el to los and la to las."
questionGoal: "Connect singular and plural article-noun phrases."
misconception: "Changing the noun ending without changing the article."
```

```question
key: u03_l02_q05_fix_plural
type: error-correction
prompt: "Correct the plural phrase."
sentence: "las libro"
acceptedAnswers:
  - "los libros"
explanation: "Libro uses el in the singular and los libros in the plural."
hint: "Make both the article and noun fit the plural of el libro."
questionGoal: "Correct a plural article and noun mismatch."
misconception: "Mixing feminine plural article with a masculine singular noun."
```

```question
key: u03_l02_q06_three_pencils
type: text-input
prompt: "Type the Spanish phrase for three pencils."
acceptedAnswers:
  - "tres lápices"
answerType: text
explanation: "Three pencils is tres lápices. The accent may appear in the preferred spelling: lápices."
hint: "Start with the number word for 3, then the plural of lápiz."
questionGoal: "Produce a quantity phrase with a familiar classroom noun."
misconception: "Using a singular noun after a number greater than one."
```

### Lesson 3: Colors And Adjective Agreement

```question
key: u03_l03_q01_carpeta_roja
type: multiple-choice
prompt: "Choose the phrase that means the red folder."
choices:
  - "la carpeta roja"
  - "la carpeta rojo"
  - "roja la carpeta"
  - "el carpeta rojo"
correctAnswer: "la carpeta roja"
explanation: "Carpeta is feminine, so the color form is roja, and the adjective follows the noun."
hint: "Check both word order and the adjective ending."
questionGoal: "Choose a noun-color phrase with correct order and agreement."
misconception: "Using English adjective order or masculine color form by default."
```

```question
key: u03_l03_q02_order_book_red
type: order-items
prompt: "Put the Spanish phrase in order: the red book."
items:
  - "rojo"
  - "libro"
  - "el"
correctOrder:
  - "el"
  - "libro"
  - "rojo"
explanation: "Many Spanish color adjectives follow the noun: el libro rojo."
hint: "Start with the article and noun, then the color."
questionGoal: "Build a Spanish noun-adjective phrase in correct order."
misconception: "Putting the color before the noun because English does."
```

```question
key: u03_l03_q03_plural_color
type: multi-blank-cloze
prompt: "Complete the object description for the red pencils."
parts:
  - "Los lápices "
  - "."
blanks:
  - correctAnswer: "rojos"
    acceptedAnswers:
      - "rojos"
explanation: "Los lápices is masculine plural, so the color form is rojos."
hint: "Match the color ending to a masculine plural noun."
questionGoal: "Apply plural adjective agreement in a familiar phrase."
misconception: "Using one color form for every noun."
```

```question
key: u03_l03_q04_fix_color
type: error-correction
prompt: "Correct the color agreement."
sentence: "la mesa rojo"
acceptedAnswers:
  - "la mesa roja"
explanation: "Mesa is feminine, so rojo changes to roja."
hint: "Make the color fit la mesa."
questionGoal: "Correct adjective agreement for a feminine noun."
misconception: "Keeping masculine singular adjective form for all nouns."
```

```question
key: u03_l03_q05_color_phrases
type: match-pairs
prompt: "Match each Spanish phrase to English."
pairs:
  - left: "el libro rojo"
    right: "the red book"
  - left: "la silla azul"
    right: "the blue chair"
  - left: "los lápices negros"
    right: "the black pencils"
  - left: "las carpetas verdes"
    right: "the green folders"
explanation: "The adjective follows the noun and fits the noun phrase when the adjective changes."
hint: "Use article, noun, and color together."
questionGoal: "Interpret complete classroom object descriptions."
misconception: "Reading only the noun and ignoring adjective cues."
```

```question
key: u03_l03_q06_describe_object
type: order-items
prompt: "Put the Spanish phrase in order: the blue chair."
items:
  - "azul"
  - "la"
  - "silla"
correctOrder:
  - "la"
  - "silla"
  - "azul"
explanation: "A Spanish color description usually uses article + noun + color: la silla azul."
hint: "Start with the article and noun, then add the color."
questionGoal: "Build a short noun-color description in Spanish order."
misconception: "Using English adjective order for Spanish color phrases."
```

### Lesson 4: Hay And Object Locations

```question
key: u03_l04_q01_there_is_book
type: multiple-choice
prompt: "Which sentence means There is a book?"
choices:
  - "Hay un libro."
  - "Está un libro."
  - "Soy un libro."
  - "Me gusta un libro."
correctAnswer: "Hay un libro."
explanation: "Hay introduces what exists: Hay un libro."
hint: "Look for the word that means there is or there are."
questionGoal: "Use hay for existence in a classroom scene."
misconception: "Using estar or ser when introducing what exists."
```

```question
key: u03_l04_q02_book_location
type: fill-blank
prompt: "Complete the location sentence."
sentenceBefore: "El libro"
sentenceAfter: "en la mesa."
choices:
  - "está"
  - "hay"
  - "soy"
  - "tengo"
correctAnswer: "está"
explanation: "El libro está en la mesa tells where the known book is."
hint: "Use the form that locates a known object."
questionGoal: "Choose estar for object location."
misconception: "Using hay and está interchangeably."
```

```question
key: u03_l04_q03_location_words
type: match-pairs
prompt: "Match each location phrase to English."
pairs:
  - left: "en"
    right: "in or on"
  - left: "cerca de"
    right: "near"
  - left: "al lado de"
    right: "next to"
  - left: "debajo de"
    right: "under"
explanation: "Location words help describe where classroom objects are."
hint: "Think of a simple classroom scene."
questionGoal: "Recognize common location phrases."
misconception: "Treating all prepositions as the same because they are short."
```

```question
key: u03_l04_q04_scene_reading
type: passage-question
prompt: "Read the scene and answer."
passageTitle: "La clase"
passage: |
  Hay una mesa.
  El lápiz está en la mesa.
  La mochila está debajo de la mesa.
question: "Where is the pencil?"
choices:
  - "on the table"
  - "under the table"
  - "near the backpack"
  - "in the backpack"
correctAnswer: "on the table"
explanation: "El lápiz está en la mesa means the pencil is on the table in this scene."
hint: "Find the sentence with lápiz."
questionGoal: "Interpret a simple classroom location description."
misconception: "Mixing up object names or location phrases in a short text."
```

```question
key: u03_l04_q05_fix_location
type: error-correction
prompt: "Correct the sentence."
sentence: "Hay en la mesa el libro."
acceptedAnswers:
  - "El libro está en la mesa."
explanation: "Use está to locate a known object: El libro está en la mesa."
hint: "Start with the object, then use está en."
questionGoal: "Correct hay/estar confusion in a location sentence."
misconception: "Using hay for every classroom-scene sentence."
```

```question
key: u03_l04_q06_scene_description
type: multi-blank-cloze
prompt: "Complete the classroom scene sentences."
parts:
  - "Hay "
  - " libro. El libro "
  - " en la mesa."
blanks:
  - correctAnswer: "un"
    choices:
      - "un"
      - "el"
      - "los"
      - "hay"
  - correctAnswer: "está"
    acceptedAnswers:
      - "está"
explanation: "Hay un libro introduces the book. El libro está en la mesa tells where the known book is."
hint: "Use hay to introduce the object, then use estar to locate it."
questionGoal: "Complete an existence statement and a location statement."
misconception: "Writing two existence statements without locating the object."
```

## Unit 4: People, Family, And Personal Identity

### Lesson 1: Soy, Eres, Es For Identity

```question
key: u04_l01_q01_ser_cloze
type: multi-blank-cloze
prompt: "Complete the identity sentences."
parts:
  - "Yo "
  - " Ana. Ella "
  - " estudiante."
blanks:
  - correctAnswer: "soy"
    acceptedAnswers:
      - "soy"
  - correctAnswer: "es"
    acceptedAnswers:
      - "es"
explanation: "Yo uses soy, and ella uses es for identity."
hint: "Use ser forms for who someone is."
questionGoal: "Use soy and es in simple identity contexts."
misconception: "Using estar or tener for identity."
```

```question
key: u04_l01_q02_who_are_you
type: multiple-choice
prompt: "Which answer fits ¿Quién eres?"
choices:
  - "Soy Luis."
  - "Estoy en la clase."
  - "Tengo hambre."
  - "Hace frío."
correctAnswer: "Soy Luis."
explanation: "¿Quién eres? asks who you are, so Soy Luis fits."
hint: "Choose the answer that identifies the person."
questionGoal: "Answer an identity question with soy."
misconception: "Responding to an identity question with location or condition."
```

```question
key: u04_l01_q03_origin_dialogue
type: dialogue-builder
prompt: "Choose the best answer."
turns:
  - speaker: "Marta"
    line: "¿De dónde eres?"
choices:
  - "Soy de Texas."
  - "Estoy bien."
  - "Son las tres."
  - "Hay un libro."
correctAnswer: "Soy de Texas."
explanation: "Soy de... tells where someone is from."
hint: "The question de dónde asks about origin."
questionGoal: "Use ser in a simple origin exchange."
misconception: "Confusing origin with current location or time."
```

```question
key: u04_l01_q04_fix_ser_identity
type: error-correction
prompt: "Correct the identity sentence."
sentence: "Yo es estudiante."
acceptedAnswers:
  - "Yo soy estudiante."
  - "Soy estudiante."
explanation: "Yo uses soy. Spanish can also leave yo out because soy already shows the subject."
hint: "Use the ser form that goes with yo."
questionGoal: "Correct subject-form mismatch with ser."
misconception: "Using one form of ser for every subject."
```

```question
key: u04_l01_q05_ser_meanings
type: match-pairs
prompt: "Match each Spanish chunk to English."
pairs:
  - left: "soy"
    right: "I am"
  - left: "eres"
    right: "you are"
  - left: "es"
    right: "he, she, or it is"
  - left: "de"
    right: "from or of"
explanation: "These chunks help identify people and origin."
hint: "Match the whole form to its meaning."
questionGoal: "Recognize key ser and origin chunks."
misconception: "Treating all forms of 'to be' as the same word."
```

```question
key: u04_l01_q06_identity_sentences
type: text-input
prompt: "Type the Spanish sentence for I am a student."
acceptedAnswers:
  - "Soy estudiante."
  - "Soy estudiante"
  - "Yo soy estudiante."
  - "Yo soy estudiante"
answerType: text
explanation: "Soy estudiante is the familiar ser chunk for I am a student."
hint: "Use the ser form that goes with yo."
questionGoal: "Produce a compact identity sentence with soy."
misconception: "Trying to translate identity sentences word by word instead of using learned frames."
```

### Lesson 2: Feelings And Location With Estar

```question
key: u04_l02_q01_how_feel
type: multiple-choice
prompt: "Which answer fits ¿Cómo estás?"
choices:
  - "Estoy bien."
  - "Soy estudiante."
  - "Tengo doce años."
  - "Hay una mesa."
correctAnswer: "Estoy bien."
explanation: "Estoy bien uses estar to tell how you are."
hint: "The question asks about how someone feels."
questionGoal: "Use estar for a familiar feeling response."
misconception: "Answering a feeling question with identity or age."
```

```question
key: u04_l02_q02_ana_location
type: fill-blank
prompt: "Complete the location sentence."
sentenceBefore: "Ana"
sentenceAfter: "en la clase."
choices:
  - "está"
  - "es"
  - "tiene"
  - "hay"
correctAnswer: "está"
explanation: "Ana está en la clase tells where Ana is."
hint: "Use estar for location."
questionGoal: "Choose estar for a person's location."
misconception: "Using ser for every English 'is.'"
```

```question
key: u04_l02_q03_fix_feeling
type: error-correction
prompt: "Correct the feeling sentence."
sentence: "Soy bien."
acceptedAnswers:
  - "Estoy bien."
explanation: "Estoy bien is the familiar chunk for I am well."
hint: "Use estar for how someone feels."
questionGoal: "Correct ser/estar confusion in a feeling phrase."
misconception: "Translating English 'I am' with ser in every context."
```

```question
key: u04_l02_q04_ser_or_estar
type: multiple-choice
prompt: "Which sentence correctly says I am a student?"
choices:
  - "Soy estudiante."
  - "Estoy estudiante."
  - "Tengo estudiante."
  - "Hay estudiante."
correctAnswer: "Soy estudiante."
explanation: "Use ser for identity: Soy estudiante."
hint: "Being a student is an identity role in this lesson."
questionGoal: "Distinguish identity with ser from condition/location with estar."
misconception: "Overusing estar after learning it for feelings and location."
```

```question
key: u04_l02_q05_where_dialogue
type: dialogue-builder
prompt: "Choose the best answer."
turns:
  - speaker: "Sofia"
    line: "¿Dónde está Luis?"
choices:
  - "Está en la clase."
  - "Es Luis."
  - "Tiene trece años."
  - "Hace sol."
correctAnswer: "Está en la clase."
explanation: "¿Dónde está...? asks where someone is, so a location answer with está fits."
hint: "Dónde asks for a place."
questionGoal: "Answer a location question with estar."
misconception: "Answering a where question with identity or age."
```

```question
key: u04_l02_q06_estar_pairs
type: match-pairs
prompt: "Match each phrase to English."
pairs:
  - left: "estoy bien"
    right: "I am well"
  - left: "estoy mal"
    right: "I am not well"
  - left: "estoy en la clase"
    right: "I am in class"
  - left: "está en la clase"
    right: "he or she is in class"
explanation: "These estar chunks tell condition or location."
hint: "Look for whether the phrase tells how someone is or where someone is."
questionGoal: "Interpret limited estar phrases."
misconception: "Treating estar phrases as unrelated memorized sentences."
```

### Lesson 3: Family And Tener

```question
key: u04_l03_q01_family_terms
type: match-pairs
prompt: "Match each family word to English."
pairs:
  - left: "madre"
    right: "mother"
  - left: "padre"
    right: "father"
  - left: "hermana"
    right: "sister"
  - left: "hermano"
    right: "brother"
explanation: "Family words let you describe familiar people."
hint: "Look for word parts that may remind you of related words."
questionGoal: "Recognize core family vocabulary."
misconception: "Relying only on English-looking cognates for family vocabulary."
```

```question
key: u04_l03_q02_tener_family
type: multi-blank-cloze
prompt: "Complete the family sentences."
parts:
  - "Yo "
  - " una hermana. Ella "
  - " trece años."
blanks:
  - correctAnswer: "tengo"
    acceptedAnswers:
      - "tengo"
  - correctAnswer: "tiene"
    acceptedAnswers:
      - "tiene"
explanation: "Yo uses tengo. Ella uses tiene."
hint: "Use tener forms for having a sister and for age."
questionGoal: "Use tengo/tiene for family and age contexts."
misconception: "Using one tener form for every subject."
```

```question
key: u04_l03_q03_family_note
type: passage-question
prompt: "Read the family note and answer."
passageTitle: "Mi familia"
passage: |
  Me llamo Marco.
  Tengo un hermano y una hermana.
  Mi hermana tiene diez años.
question: "Who is ten years old?"
choices:
  - "Marco's sister"
  - "Marco"
  - "Marco's brother"
  - "Marco's mother"
correctAnswer: "Marco's sister"
explanation: "Mi hermana tiene diez años says my sister is ten years old."
hint: "Find the sentence with diez años."
questionGoal: "Interpret a short family description with tener."
misconception: "Missing the subject of a tener age sentence."
```

```question
key: u04_l03_q04_fix_age_family
type: error-correction
prompt: "Correct the age sentence."
sentence: "Soy trece años."
acceptedAnswers:
  - "Tengo trece años."
  - "Yo tengo trece años."
explanation: "Use tener for age: Tengo trece años."
hint: "This is the same age chunk from Unit 2."
questionGoal: "Review tener for age inside family language."
misconception: "Returning to English-like ser for age after learning new identity language."
```

```question
key: u04_l03_q05_mi_meaning
type: multiple-choice
prompt: "What does mi mean in mi hermana?"
choices:
  - "my"
  - "I"
  - "me"
  - "the"
correctAnswer: "my"
explanation: "Mi hermana means my sister."
hint: "Think of possession: whose sister?"
questionGoal: "Interpret the possessive chunk mi."
misconception: "Confusing mi with yo or me."
```

```question
key: u04_l03_q06_family_sentence
type: text-input
prompt: "Type the Spanish sentence for I have a sister."
acceptedAnswers:
  - "Tengo una hermana."
  - "Tengo una hermana"
answerType: text
explanation: "Tengo una hermana uses tener to say you have a sister."
hint: "Use Tengo plus the family noun phrase."
questionGoal: "Produce a supported family sentence with tener."
misconception: "Listing family vocabulary without using the tener sentence frame."
```

### Lesson 4: Describing People With Agreement

```question
key: u04_l04_q01_sister_kind
type: multiple-choice
prompt: "Choose the sentence that means My sister is nice."
choices:
  - "Mi hermana es simpática."
  - "Mi hermana es simpático."
  - "Mi hermano es simpática."
  - "Mi hermana está simpática."
correctAnswer: "Mi hermana es simpática."
explanation: "Hermana is feminine, so the adjective is simpática, and es describes a trait."
hint: "Match the adjective ending to hermana."
questionGoal: "Choose an adjective that agrees with a feminine person noun."
misconception: "Using masculine singular adjective form as the default."
```

```question
key: u04_l04_q02_friends_intelligent
type: fill-blank
prompt: "Complete the description."
sentenceBefore: "Mis amigos son"
sentenceAfter: "."
choices:
  - "inteligentes"
  - "inteligente"
  - "inteligenta"
  - "inteligentas"
correctAnswer: "inteligentes"
explanation: "Mis amigos is plural, so inteligente becomes inteligentes."
hint: "Make the adjective plural."
questionGoal: "Apply plural adjective agreement with a person noun."
misconception: "Forgetting plural agreement on adjectives."
```

```question
key: u04_l04_q03_fix_person_adjective
type: error-correction
prompt: "Correct the person description."
sentence: "Mi hermano es simpática."
acceptedAnswers:
  - "Mi hermano es simpático."
explanation: "Hermano is masculine, so the adjective is simpático."
hint: "Make the adjective fit hermano."
questionGoal: "Correct gender agreement in a people description."
misconception: "Copying an adjective form from a different noun."
```

```question
key: u04_l04_q04_adjective_pairs
type: match-pairs
prompt: "Match each adjective to English."
pairs:
  - left: "alto"
    right: "tall"
  - left: "trabajador"
    right: "hardworking"
  - left: "serio"
    right: "serious"
  - left: "cómico"
    right: "funny"
explanation: "These adjectives help describe people respectfully and simply."
hint: "Look for cognates such as serio and cómico."
questionGoal: "Recognize common descriptive adjectives for people."
misconception: "Depending only on physical adjectives or only on English-looking words."
```

```question
key: u04_l04_q05_two_people
type: multi-blank-cloze
prompt: "Complete the descriptions for a hardworking girl and boy."
parts:
  - "Ella es "
  - ". Él es "
  - "."
blanks:
  - correctAnswer: "trabajadora"
    acceptedAnswers:
      - "trabajadora"
  - correctAnswer: "trabajador"
    acceptedAnswers:
      - "trabajador"
explanation: "Ella takes trabajadora, and él takes trabajador."
hint: "Match each adjective to the person described."
questionGoal: "Contrast masculine and feminine adjective forms."
misconception: "Using one adjective form for both people."
```

```question
key: u04_l04_q06_speak_person
type: fill-blank
prompt: "Complete the person description."
sentenceBefore: "Mi amiga es"
sentenceAfter: "."
choices:
  - "inteligente"
  - "inteligentes"
  - "trabajador"
  - "altos"
correctAnswer: "inteligente"
explanation: "Mi amiga is singular, and inteligente keeps the same gender form but adds s only for plural."
hint: "Choose the singular adjective form that can describe a female friend."
questionGoal: "Choose an adjective form that fits a singular person noun."
misconception: "Changing every adjective to an -a form or making singular nouns plural."
```

### Lesson 5: Short Profiles About People

```question
key: u04_l05_q01_profile_read
type: passage-question
prompt: "Read the profile and answer."
passageTitle: "Perfil"
passage: |
  Me llamo Camila.
  Tengo doce años.
  Soy de Texas.
  Mi hermano es cómico.
question: "Where is Camila from?"
choices:
  - "Texas"
  - "México"
  - "the classroom"
  - "her family"
correctAnswer: "Texas"
explanation: "Soy de Texas means I am from Texas."
hint: "Look for the sentence with de."
questionGoal: "Find origin information in a short profile."
misconception: "Confusing origin with location or family information."
```

```question
key: u04_l05_q02_profile_cloze
type: multi-blank-cloze
prompt: "Complete the short profile."
parts:
  - "Me llamo Nina. "
  - " once años. Mi madre "
  - " inteligente."
blanks:
  - correctAnswer: "Tengo"
    acceptedAnswers:
      - "Tengo"
      - "tengo"
  - correctAnswer: "es"
    acceptedAnswers:
      - "es"
explanation: "Use Tengo for age and es for a trait."
hint: "Age uses tener; a trait uses ser."
questionGoal: "Choose forms based on the job of each profile sentence."
misconception: "Mixing ser, estar, tener, and hay in profile writing."
```

```question
key: u04_l05_q03_age_reply
type: dialogue-builder
prompt: "Choose the answer that fits the question."
turns:
  - speaker: "Leo"
    line: "¿Cuántos años tiene Sara?"
choices:
  - "Sara tiene trece años."
  - "Sara es de Perú."
  - "Sara está en casa."
  - "Sara tiene una mesa."
correctAnswer: "Sara tiene trece años."
explanation: "The question asks Sara's age, so the answer uses tiene... años."
hint: "Look for años in the answer."
questionGoal: "Answer a third-person age question in a profile context."
misconception: "Choosing any sentence about the person instead of answering the question."
```

```question
key: u04_l05_q04_fix_origin
type: error-correction
prompt: "Correct the origin sentence."
sentence: "María estoy de Perú."
acceptedAnswers:
  - "María es de Perú."
explanation: "Origin uses ser in this lesson: María es de Perú."
hint: "Use es de for where someone is from."
questionGoal: "Correct ser/estar confusion in origin statements."
misconception: "Using estoy because English says 'is from' or because estar was recently learned."
```

```question
key: u04_l05_q05_sentence_job
type: multiple-choice
prompt: "In the sentence Mi hermana es simpática, what job does the sentence do in a profile?"
choices:
  - "It describes a family member."
  - "It tells the date."
  - "It gives the weather."
  - "It asks a name."
correctAnswer: "It describes a family member."
explanation: "The sentence names a family member and gives a trait."
hint: "Look at hermana and simpática."
questionGoal: "Identify the purpose of a profile sentence."
misconception: "Reading sentence parts without understanding their role in a profile."
```

```question
key: u04_l05_q06_write_profile
type: order-items
prompt: "Put the short profile in a logical order."
items:
  - "Tengo doce años."
  - "Hola."
  - "Me llamo Daniel."
  - "Soy estudiante."
correctOrder:
  - "Hola."
  - "Me llamo Daniel."
  - "Tengo doce años."
  - "Soy estudiante."
explanation: "A compact profile can open politely, give a name, add age, and then give an identity detail."
hint: "Start with the opening, then move from name to personal details."
questionGoal: "Sequence familiar chunks into a compact supported profile."
misconception: "Treating profile sentences as unrelated facts rather than an organized message."
```

## Unit 5: Likes, Activities, And School Life

### Lesson 1: Me Gusta For One Like

```question
key: u05_l01_q01_activity_flash
type: flash-card
mode: easy
prompt: "Choose the best meaning."
front: "leer"
choices:
  - "to read"
  - "to write"
  - "to eat"
  - "to go"
correctAnswer: "to read"
explanation: "Leer means to read."
hint: "Think of a school or free-time activity with books."
questionGoal: "Recognize a common activity infinitive."
misconception: "Treating all activity words as unrelated vocabulary instead of reusable actions."
```

```question
key: u05_l01_q02_like_activity
type: multiple-choice
prompt: "Which sentence correctly says I like to read?"
choices:
  - "Me gusta leer."
  - "Yo gusto leer."
  - "Me gustan leer."
  - "Soy leer."
correctAnswer: "Me gusta leer."
explanation: "Me gusta leer is the Level 1 chunk for I like to read."
hint: "Use the whole me gusta chunk before the activity."
questionGoal: "Use me gusta with an activity."
misconception: "Translating 'I like' word for word as yo gusto."
```

```question
key: u05_l01_q03_music_like
type: fill-blank
prompt: "Complete the like sentence."
sentenceBefore: "Me"
sentenceAfter: "la música."
choices:
  - "gusta"
  - "gustan"
  - "soy"
  - "tengo"
correctAnswer: "gusta"
explanation: "Me gusta la música means I like music."
hint: "La música is one singular thing in this sentence."
questionGoal: "Complete me gusta with a singular liked thing."
misconception: "Choosing gustan without checking the liked noun."
```

```question
key: u05_l01_q04_order_like_sentence
type: order-items
prompt: "Put the sentence in order."
items:
  - "jugar"
  - "Me"
  - "gusta"
  - "al futbol"
correctOrder:
  - "Me"
  - "gusta"
  - "jugar"
  - "al futbol"
explanation: "Me gusta comes before the activity: Me gusta jugar al futbol."
hint: "Start with Me gusta."
questionGoal: "Build a simple like sentence with an activity."
misconception: "Using English word order or separating the me gusta chunk."
```

```question
key: u05_l01_q05_like_dialogue
type: dialogue-builder
prompt: "Choose the best answer."
turns:
  - speaker: "Eva"
    line: "¿Qué te gusta?"
choices:
  - "Me gusta dibujar."
  - "Tengo doce años."
  - "Hace frío."
  - "Soy de Texas."
correctAnswer: "Me gusta dibujar."
explanation: "¿Qué te gusta? asks what you like, so a me gusta answer fits."
hint: "Look for the preference answer."
questionGoal: "Answer a preference question with me gusta."
misconception: "Answering a familiar question word with unrelated personal information."
```

```question
key: u05_l01_q06_speak_like
type: text-input
prompt: "Type the Spanish sentence for I like to draw."
acceptedAnswers:
  - "Me gusta dibujar."
  - "Me gusta dibujar"
answerType: text
explanation: "Me gusta dibujar uses the whole preference chunk before the activity."
hint: "Start with Me gusta, then add the activity."
questionGoal: "Produce a simple preference sentence with me gusta."
misconception: "Recognizing me gusta but not producing it with an activity."
```

### Lesson 2: Me Gustan And No Me Gusta

```question
key: u05_l02_q01_plural_likes
type: fill-blank
prompt: "Complete the plural like sentence."
sentenceBefore: "Me"
sentenceAfter: "los deportes."
choices:
  - "gustan"
  - "gusta"
  - "soy"
  - "tengo"
correctAnswer: "gustan"
explanation: "Los deportes is plural, so the sentence uses Me gustan."
hint: "Look at los before deportes."
questionGoal: "Choose gustan for a plural liked thing."
misconception: "Using me gusta for every preference."
```

```question
key: u05_l02_q02_dislike_sentence
type: multiple-choice
prompt: "Which sentence means I do not like homework?"
choices:
  - "No me gusta la tarea."
  - "Me no gusta la tarea."
  - "No me gustan la tarea."
  - "Soy la tarea."
correctAnswer: "No me gusta la tarea."
explanation: "No goes before the me gusta chunk to make a dislike."
hint: "Place no before me gusta."
questionGoal: "Express a dislike with no me gusta."
misconception: "Placing no inside the chunk or using plural without a plural noun."
```

```question
key: u05_l02_q03_fix_plural_like
type: error-correction
prompt: "Correct the preference sentence."
sentence: "Me gusta los libros."
acceptedAnswers:
  - "Me gustan los libros."
explanation: "Los libros is plural, so use Me gustan."
hint: "Check whether the liked thing is singular or plural."
questionGoal: "Correct gusta/gustan based on plural cues."
misconception: "Ignoring the article and noun number after me gusta."
```

```question
key: u05_l02_q04_like_dislike_cloze
type: multi-blank-cloze
prompt: "Complete the preference sentence."
parts:
  - "No "
  - " gusta la música, pero me "
  - " las ciencias."
blanks:
  - correctAnswer: "me"
    acceptedAnswers:
      - "me"
  - correctAnswer: "gustan"
    acceptedAnswers:
      - "gustan"
explanation: "No me gusta makes a dislike. Las ciencias is plural, so me gustan fits."
hint: "Use the dislike chunk first, then check the plural noun."
questionGoal: "Combine dislike and plural like patterns."
misconception: "Treating no and plural agreement as separate from the preference chunk."
```

```question
key: u05_l02_q05_plural_cue
type: multiple-choice
prompt: "Which cue tells you to use Me gustan?"
choices:
  - "las clases"
  - "la clase"
  - "leer"
  - "la música"
correctAnswer: "las clases"
explanation: "Las clases is plural, so Me gustan las clases is the fitting pattern."
hint: "Look for a plural article and noun."
questionGoal: "Identify the plural cue for gustan."
misconception: "Choosing gusta/gustan by memorized sound instead of noun number."
```

```question
key: u05_l02_q06_like_dislike_write
type: text-input
prompt: "Type the Spanish sentence for I do not like homework."
acceptedAnswers:
  - "No me gusta la tarea."
  - "No me gusta la tarea"
answerType: text
explanation: "No me gusta la tarea uses no before the me gusta chunk."
hint: "Put no before me gusta."
questionGoal: "Produce a supported dislike statement."
misconception: "Putting no inside the preference chunk or translating word by word."
```

### Lesson 3: Activities And Opinions

```question
key: u05_l03_q01_activity_pairs
type: match-pairs
prompt: "Match each activity to English."
pairs:
  - left: "dibujar"
    right: "to draw"
  - left: "cantar"
    right: "to sing"
  - left: "bailar"
    right: "to dance"
  - left: "estudiar"
    right: "to study"
explanation: "Activity words often appear after me gusta or in short routine sentences."
hint: "Look for cognate clues in cantar, bailar, and estudiar."
questionGoal: "Recognize common activity vocabulary."
misconception: "Missing helpful cognates in activity words."
```

```question
key: u05_l03_q02_opinion_order
type: order-items
prompt: "Put the sentence in order."
items:
  - "es difícil"
  - "dibujar,"
  - "Me gusta"
  - "pero"
correctOrder:
  - "Me gusta"
  - "dibujar,"
  - "pero"
  - "es difícil"
explanation: "The sentence says I like to draw, but it is difficult."
hint: "Start with the like statement, then use pero to contrast."
questionGoal: "Build a two-part preference and opinion sentence."
misconception: "Using connectors without understanding their meaning."
```

```question
key: u05_l03_q03_connector_choice
type: fill-blank
prompt: "Choose the connector that shows contrast."
sentenceBefore: "Me gusta cantar,"
sentenceAfter: "es difícil."
choices:
  - "pero"
  - "y"
  - "también"
  - "hola"
correctAnswer: "pero"
explanation: "Pero means but, so it shows a contrast."
hint: "The sentence changes from liking something to saying it is hard."
questionGoal: "Choose a connector based on meaning."
misconception: "Treating y, pero, and también as interchangeable connectors."
```

```question
key: u05_l03_q04_opinion_cloze
type: multi-blank-cloze
prompt: "Complete the opinion sentence with and interesting."
parts:
  - "Me gusta la ciencia "
  - " es "
  - "."
blanks:
  - correctAnswer: "y"
    acceptedAnswers:
      - "y"
  - correctAnswer: "interesante"
    acceptedAnswers:
      - "interesante"
explanation: "Y connects the like statement to a simple opinion, and interesante is an opinion adjective."
hint: "Use the connector that means and before the opinion."
questionGoal: "Connect a preference to a simple opinion."
misconception: "Adding opinion words without a clear connector."
```

```question
key: u05_l03_q05_agree_response
type: dialogue-builder
prompt: "Choose the best response."
turns:
  - speaker: "Luis"
    line: "Me gusta la música."
choices:
  - "A mí también."
  - "Son las tres."
  - "Estoy en la clase."
  - "Hace frío."
correctAnswer: "A mí también."
explanation: "A mí también means me too, so it fits an agreement response."
hint: "Choose the line that responds to a preference."
questionGoal: "Use a simple interpersonal response to a preference."
misconception: "Answering a preference statement with unrelated memorized facts."
```

```question
key: u05_l03_q06_short_opinion
type: order-items
prompt: "Put the Spanish opinion sentence in order."
items:
  - "leer"
  - "porque"
  - "Me gusta"
  - "es interesante."
correctOrder:
  - "Me gusta"
  - "leer"
  - "porque"
  - "es interesante."
explanation: "The sentence gives a preference first, then a reason: Me gusta leer porque es interesante."
hint: "Start with the preference chunk, then add the reason."
questionGoal: "Build a preference sentence with a simple opinion reason."
misconception: "Adding opinion words without connecting them to the preference."
```

### Lesson 4: School Subjects And Schedules

```question
key: u05_l04_q01_schedule_read
type: passage-question
prompt: "Read the schedule and answer."
passageTitle: "Horario"
passage: |
  Lunes:
  8:00 - matemáticas
  9:00 - arte
  10:00 - música
question: "What class is at 9:00?"
choices:
  - "art"
  - "math"
  - "music"
  - "science"
correctAnswer: "art"
explanation: "The schedule shows 9:00 - arte."
hint: "Find the line with 9:00."
questionGoal: "Read a simple class schedule for time and subject."
misconception: "Reading the first class without checking the time."
```

```question
key: u05_l04_q02_subject_pairs
type: match-pairs
prompt: "Match each school subject to English."
pairs:
  - left: "matemáticas"
    right: "math"
  - left: "ciencias"
    right: "science"
  - left: "historia"
    right: "history"
  - left: "arte"
    right: "art"
explanation: "Many school subjects are useful cognates."
hint: "Look for Spanish-English similarities."
questionGoal: "Recognize common school-subject words."
misconception: "Overlooking cognate support in school vocabulary."
```

```question
key: u05_l04_q03_class_time_choice
type: multiple-choice
prompt: "Which sentence means I have science class at two o'clock?"
choices:
  - "Tengo clase de ciencias a las dos."
  - "Tengo dos ciencias a la clase."
  - "Son las ciencias."
  - "Me gustan a las dos."
correctAnswer: "Tengo clase de ciencias a las dos."
explanation: "Tengo clase de ciencias names the class, and a las dos gives the time."
hint: "Look for the sentence with class, subject, and time in a clear order."
questionGoal: "Interpret and choose a basic class-time statement."
misconception: "Putting Spanish words in English order without a sentence frame."
```

```question
key: u05_l04_q04_schedule_cloze
type: multi-blank-cloze
prompt: "Complete the schedule sentence for math first and art after."
parts:
  - "El lunes a las ocho tengo clase de "
  - " y después tengo "
  - "."
blanks:
  - correctAnswer: "matemáticas"
    acceptedAnswers:
      - "matemáticas"
  - correctAnswer: "arte"
    acceptedAnswers:
      - "arte"
explanation: "Matemáticas and arte are school subjects; frío and años do not fit a schedule."
hint: "Choose class subjects for both blanks."
questionGoal: "Complete a short school schedule statement."
misconception: "Mixing weather or age vocabulary into a school context."
```

```question
key: u05_l04_q05_type_art
type: text-input
prompt: "Type the Spanish word for art class."
acceptedAnswers:
  - "arte"
answerType: text
explanation: "Arte means art."
hint: "It is a close cognate."
questionGoal: "Produce a common school-subject cognate."
misconception: "Assuming cognates do not count as Spanish vocabulary."
```

```question
key: u05_l04_q06_fix_schedule
type: error-correction
prompt: "Correct the schedule sentence."
sentence: "A las una tengo ciencias."
acceptedAnswers:
  - "A la una tengo ciencias."
  - "Tengo ciencias a la una."
explanation: "One o'clock uses la una, not las una."
hint: "Remember the special time pattern for one o'clock."
questionGoal: "Apply the one-o'clock time pattern in a school schedule."
misconception: "Overgeneralizing a las to one o'clock."
```

### Lesson 5: Asking About School And Free Time

```question
key: u05_l05_q01_class_question
type: dialogue-builder
prompt: "Choose the best answer."
turns:
  - speaker: "Ana"
    line: "¿Qué clase tienes?"
choices:
  - "Tengo clase de arte."
  - "Me gusta bailar."
  - "Estoy bien."
  - "Hace calor."
correctAnswer: "Tengo clase de arte."
explanation: "¿Qué clase tienes? asks what class you have."
hint: "Look for an answer with clase."
questionGoal: "Answer a school-class question."
misconception: "Answering with any school or personal phrase instead of the requested class."
```

```question
key: u05_l05_q02_question_answer_types
type: match-pairs
prompt: "Match each question to the kind of answer it needs."
pairs:
  - left: "¿Qué te gusta?"
    right: "a preference"
  - left: "¿Qué clase tienes?"
    right: "a class"
  - left: "¿Cuándo?"
    right: "a time or date"
  - left: "¿Cómo estás?"
    right: "a feeling"
explanation: "The question clue tells you what kind of answer fits."
hint: "Focus on the question word or phrase."
questionGoal: "Identify answer type from familiar questions."
misconception: "Recognizing a word but missing what the question asks."
```

```question
key: u05_l05_q03_school_dialogue_order
type: order-items
prompt: "Put the dialogue in order."
items:
  - "Me gusta leer."
  - "Hola."
  - "¿Qué te gusta hacer?"
  - "A mí también."
correctOrder:
  - "Hola."
  - "¿Qué te gusta hacer?"
  - "Me gusta leer."
  - "A mí también."
explanation: "The dialogue opens, asks a preference, answers it, and then agrees."
hint: "Start with the greeting, then ask the question."
questionGoal: "Sequence a short preference dialogue."
misconception: "Treating agreement responses as opening lines."
```

```question
key: u05_l05_q04_after_school_answer
type: dialogue-builder
prompt: "Choose the best answer."
turns:
  - speaker: "Ana"
    line: "¿Qué te gusta hacer después de la escuela?"
choices:
  - "Me gusta jugar."
  - "Tengo clase de arte."
  - "Son las dos."
  - "Estoy bien."
correctAnswer: "Me gusta jugar."
explanation: "The question asks what you like to do, so an activity answer with Me gusta fits."
hint: "Choose the answer that names a liked activity."
questionGoal: "Answer a free-time preference question."
misconception: "Answering with a school fact when the question asks what you like to do."
```

```question
key: u05_l05_q05_speak_school
type: text-input
prompt: "Type the Spanish sentence for I like art class."
acceptedAnswers:
  - "Me gusta la clase de arte."
  - "Me gusta la clase de arte"
answerType: text
explanation: "Me gusta la clase de arte gives a simple school preference."
hint: "Use Me gusta followed by la clase de arte."
questionGoal: "Produce a school preference sentence."
misconception: "Recognizing school preference language but not producing the sentence frame."
```

```question
key: u05_l05_q06_fix_question_punctuation
type: error-correction
prompt: "Correct the question punctuation."
sentence: "Qué te gusta?"
acceptedAnswers:
  - "¿Qué te gusta?"
explanation: "Spanish questions use an opening question mark and a closing question mark."
hint: "Add the mark at the beginning of the question."
questionGoal: "Maintain Spanish question punctuation in a familiar school question."
misconception: "Dropping inverted punctuation once sentences become longer."
```

## Unit 6: Food, Places, Routines, And Novice Capstone

### Lesson 1: Food, Drinks, And Polite Wants

```question
key: u06_l01_q01_food_flash
type: flash-card
mode: easy
prompt: "Choose the best meaning."
front: "la manzana"
choices:
  - "the apple"
  - "the water"
  - "the bread"
  - "the cheese"
correctAnswer: "the apple"
explanation: "La manzana means the apple."
hint: "Manzana is a food noun learned with la."
questionGoal: "Recognize a common food noun with article."
misconception: "Learning food nouns without their articles."
```

```question
key: u06_l01_q02_food_drink_pairs
type: match-pairs
prompt: "Match each food or drink to English."
pairs:
  - left: "el agua"
    right: "water"
  - left: "el pan"
    right: "bread"
  - left: "el queso"
    right: "cheese"
  - left: "la fruta"
    right: "fruit"
explanation: "Food and drink words are useful for likes and polite requests."
hint: "Look for cognates and article-noun chunks."
questionGoal: "Recognize common food and drink vocabulary."
misconception: "Assuming every food word will look like English."
```

```question
key: u06_l01_q03_ordering_dialogue
type: dialogue-builder
prompt: "Choose the best next line."
turns:
  - speaker: "Mesero"
    line: "Hola. ¿Qué quieres?"
choices:
  - "Quiero agua, por favor."
  - "Estoy en la biblioteca."
  - "Son las cuatro."
  - "Me llamo agua."
correctAnswer: "Quiero agua, por favor."
explanation: "Quiero agua, por favor is a simple polite request for water."
hint: "Choose the answer that asks for food or drink politely."
questionGoal: "Use a polite request in a food context."
misconception: "Answering a request question with unrelated learned sentences."
```

```question
key: u06_l01_q04_polite_request_blank
type: fill-blank
prompt: "Complete the polite request."
sentenceBefore: "Quiero agua,"
sentenceAfter: "."
choices:
  - "por favor"
  - "de nada"
  - "hasta luego"
  - "hace sol"
correctAnswer: "por favor"
explanation: "Por favor makes the request polite."
hint: "Choose the phrase that means please."
questionGoal: "Add politeness to a request."
misconception: "Treating quiero alone as always polite enough."
```

```question
key: u06_l01_q05_polite_option
type: multiple-choice
prompt: "Which request is the most polite?"
choices:
  - "Quisiera pan, por favor."
  - "Pan."
  - "Dame pan."
  - "Soy pan."
correctAnswer: "Quisiera pan, por favor."
explanation: "Quisiera... por favor is a polite request chunk."
hint: "Look for the request with please and a polite form."
questionGoal: "Recognize a polite ordering option."
misconception: "Assuming any short food word is an appropriate request."
```

```question
key: u06_l01_q06_speak_order
type: text-input
prompt: "Type the Spanish request for I want water, please."
acceptedAnswers:
  - "Quiero agua, por favor."
  - "Quiero agua, por favor"
answerType: text
explanation: "Quiero agua, por favor is a simple polite request for a drink."
hint: "Use Quiero, the drink, and por favor."
questionGoal: "Produce a polite food or drink request."
misconception: "Recognizing food vocabulary without using it in a request."
```

### Lesson 2: Meals, Hunger, And Thirst

```question
key: u06_l02_q01_thirsty_expression
type: multiple-choice
prompt: "You are thirsty. Which Spanish phrase fits?"
choices:
  - "Tengo sed."
  - "Tengo hambre."
  - "Soy sed."
  - "Hace sed."
correctAnswer: "Tengo sed."
explanation: "Tengo sed means I am thirsty."
hint: "Sed is thirst."
questionGoal: "Choose the correct tener physical-state chunk."
misconception: "Using ser or hacer for physical states because English says I am."
```

```question
key: u06_l02_q02_meal_pairs
type: match-pairs
prompt: "Match each meal or item to the likely meaning."
pairs:
  - left: "el desayuno"
    right: "breakfast"
  - left: "el almuerzo"
    right: "lunch"
  - left: "la cena"
    right: "dinner"
  - left: "la leche"
    right: "milk"
explanation: "Meal words help you connect foods to daily routines."
hint: "Use any cognate or context clue you know."
questionGoal: "Recognize meal and drink vocabulary."
misconception: "Treating food vocabulary as disconnected from routine contexts."
```

```question
key: u06_l02_q03_fix_hunger
type: error-correction
prompt: "Correct the sentence."
sentence: "Soy hambre."
acceptedAnswers:
  - "Tengo hambre."
explanation: "Spanish uses tener for hunger: Tengo hambre."
hint: "Use the same verb family as Tengo doce años."
questionGoal: "Correct English-transfer hunger phrasing."
misconception: "Using ser for every English 'I am' sentence."
```

```question
key: u06_l02_q04_meal_note
type: passage-question
prompt: "Read the note and answer."
passageTitle: "Tengo hambre"
passage: |
  Es la una.
  Tengo hambre.
  Quiero pan y agua.
question: "What does the speaker want?"
choices:
  - "bread and water"
  - "music and art"
  - "a pencil and book"
  - "snow and cold"
correctAnswer: "bread and water"
explanation: "Quiero pan y agua says the speaker wants bread and water."
hint: "Find the sentence that starts with Quiero."
questionGoal: "Interpret a short food request in a routine context."
misconception: "Ignoring the food request after recognizing the time."
```

```question
key: u06_l02_q05_hungry_sentence
type: text-input
prompt: "Type the Spanish sentence for I am hungry."
acceptedAnswers:
  - "Tengo hambre."
  - "Tengo hambre"
answerType: text
explanation: "Tengo hambre is the tener chunk for I am hungry."
hint: "Use Tengo with the word for hunger."
questionGoal: "Produce a tener physical-state sentence."
misconception: "Trying to translate I am hungry word by word."
```

```question
key: u06_l02_q06_hunger_thirst_blank
type: fill-blank
prompt: "Complete the sentence for someone who is thirsty."
sentenceBefore: "Tengo"
sentenceAfter: "."
choices:
  - "sed"
  - "hambre"
  - "lunes"
  - "rojo"
correctAnswer: "sed"
explanation: "Tengo sed is the Spanish chunk for I am thirsty."
hint: "Choose the word connected to thirst."
questionGoal: "Select hunger or thirst based on context."
misconception: "Confusing food and drink needs."
```

### Lesson 3: Places With Estar And Ir A

```question
key: u06_l03_q01_place_pairs
type: match-pairs
prompt: "Match each place to English."
pairs:
  - left: "la escuela"
    right: "the school"
  - left: "la casa"
    right: "the house"
  - left: "el parque"
    right: "the park"
  - left: "la biblioteca"
    right: "the library"
explanation: "Place words are needed for location and destination sentences."
hint: "Look for cognates such as parque and biblioteca."
questionGoal: "Recognize common place nouns."
misconception: "Missing cognate clues in place vocabulary."
```

```question
key: u06_l03_q02_location_or_destination
type: multiple-choice
prompt: "Which sentence tells where someone is now?"
choices:
  - "Estoy en la biblioteca."
  - "Voy a la biblioteca."
  - "Quiero la biblioteca."
  - "Me gusta a la biblioteca."
correctAnswer: "Estoy en la biblioteca."
explanation: "Estoy en tells current location. Voy a tells where someone is going."
hint: "Look for estoy en."
questionGoal: "Distinguish location from destination."
misconception: "Treating estoy en and voy a as interchangeable."
```

```question
key: u06_l03_q03_going_to_school
type: fill-blank
prompt: "Complete the destination sentence."
sentenceBefore: "Voy"
sentenceAfter: "la escuela."
choices:
  - "a"
  - "en"
  - "de"
  - "soy"
correctAnswer: "a"
explanation: "Voy a la escuela means I am going to school."
hint: "Voy uses a before the destination."
questionGoal: "Use a after voy for destination."
misconception: "Omitting the destination marker because English can feel shorter."
```

```question
key: u06_l03_q04_fix_place_sentence
type: error-correction
prompt: "Correct the location sentence."
sentence: "Estoy a el parque."
acceptedAnswers:
  - "Estoy en el parque."
explanation: "Use estoy en for where someone is now."
hint: "Current location uses en."
questionGoal: "Correct confusion between a and en in place statements."
misconception: "Using destination language for current location."
```

```question
key: u06_l03_q05_map_note
type: passage-question
prompt: "Read the map note and answer."
passageTitle: "Después de clase"
passage: |
  Sofia está en la escuela.
  Después, Sofia va a la biblioteca.
question: "Where is Sofia going after class?"
choices:
  - "the library"
  - "the school"
  - "the park"
  - "the house"
correctAnswer: "the library"
explanation: "Va a la biblioteca tells where Sofia is going."
hint: "Find the sentence with va a."
questionGoal: "Interpret a destination in a short place note."
misconception: "Confusing current location with destination."
```

```question
key: u06_l03_q06_place_cloze
type: multi-blank-cloze
prompt: "Complete the place sentences."
parts:
  - "Ana "
  - " en casa. Luis "
  - " a la biblioteca."
blanks:
  - correctAnswer: "está"
    acceptedAnswers:
      - "está"
  - correctAnswer: "va"
    acceptedAnswers:
      - "va"
explanation: "Ana is at home, so está en casa. Luis is going, so va a la biblioteca."
hint: "Use location for the first sentence and going for the second."
questionGoal: "Contrast estar en and ir a in adjacent sentences."
misconception: "Using one place verb for both location and movement."
```

### Lesson 4: Simple Daily Routines

```question
key: u06_l04_q01_routine_order
type: order-items
prompt: "Put the routine in a logical order."
items:
  - "Después, voy a la escuela."
  - "Primero, desayuno."
  - "Por la tarde, estudio."
  - "Por la noche, leo."
correctOrder:
  - "Primero, desayuno."
  - "Después, voy a la escuela."
  - "Por la tarde, estudio."
  - "Por la noche, leo."
explanation: "The sequence moves from first, to after, to afternoon, to night."
hint: "Use the time and sequence words."
questionGoal: "Sequence routine events using connector and time clues."
misconception: "Ordering by familiar verbs without reading time phrases."
```

```question
key: u06_l04_q02_routine_reading
type: passage-question
prompt: "Read the routine and answer."
passageTitle: "Mi día"
passage: |
  Por la mañana, voy a la escuela.
  A las tres, practico futbol.
  Por la noche, estudio.
question: "What happens at three o'clock?"
choices:
  - "practice soccer"
  - "go to school"
  - "study"
  - "eat breakfast"
correctAnswer: "practice soccer"
explanation: "A las tres, practico futbol means at three, I practice soccer."
hint: "Find the sentence with a las tres."
questionGoal: "Find a routine action tied to a time phrase."
misconception: "Reading routine events without tracking time."
```

```question
key: u06_l04_q03_routine_cloze
type: multi-blank-cloze
prompt: "Complete the routine: First I go to school. Then I study music."
parts:
  - "Primero "
  - " a la escuela. Después "
  - " música."
blanks:
  - correctAnswer: "voy"
    acceptedAnswers:
      - "voy"
  - correctAnswer: "estudio"
    acceptedAnswers:
      - "estudio"
explanation: "Voy a la escuela means I go to school. Estudio música means I study music."
hint: "Use action words, not nouns or adjectives."
questionGoal: "Complete a simple routine with familiar action chunks."
misconception: "Choosing any familiar word without checking the sentence job."
```

```question
key: u06_l04_q04_sequence_connector
type: fill-blank
prompt: "Choose the word that means after."
sentenceBefore: "Primero desayuno."
sentenceAfter: ", voy a la escuela."
choices:
  - "Después"
  - "Hola"
  - "Rojo"
  - "Sed"
correctAnswer: "Después"
explanation: "Después means after, so it connects the next routine step."
hint: "Look for the sequence word."
questionGoal: "Choose a connector based on routine sequence."
misconception: "Using a familiar word as a connector even when it has no sequence meaning."
```

```question
key: u06_l04_q05_write_routine
type: order-items
prompt: "Put the routine in a logical order."
items:
  - "Por la noche, leo."
  - "Primero, desayuno."
  - "Después, voy a la escuela."
correctOrder:
  - "Primero, desayuno."
  - "Después, voy a la escuela."
  - "Por la noche, leo."
explanation: "The sequence moves from first, to after, to night."
hint: "Use the sequence and time words to decide the order."
questionGoal: "Sequence a compact routine built from familiar chunks."
misconception: "Writing or ordering routine events without using sequence clues."
```

```question
key: u06_l04_q06_speak_routine
type: text-input
prompt: "Type the Spanish sentence for I go to school."
acceptedAnswers:
  - "Voy a la escuela."
  - "Voy a la escuela"
answerType: text
explanation: "Voy a la escuela is a familiar routine sentence for going to school."
hint: "Use voy a before the place."
questionGoal: "Produce a familiar routine action sentence."
misconception: "Recognizing routine verbs but not using the destination frame."
```

### Lesson 5: Mixed Questions In Conversation

```question
key: u06_l05_q01_question_answer_pairs
type: match-pairs
prompt: "Match each question to a fitting answer."
pairs:
  - left: "¿Cómo te llamas?"
    right: "Me llamo Nora."
  - left: "¿Cuántos años tienes?"
    right: "Tengo doce años."
  - left: "¿Dónde estás?"
    right: "Estoy en casa."
  - left: "¿Qué te gusta?"
    right: "Me gusta leer."
explanation: "Each question needs a different kind of answer."
hint: "Use the question phrase to predict the answer type."
questionGoal: "Match mixed familiar questions to fitting answers."
misconception: "Answering based on one familiar word instead of the whole question."
```

```question
key: u06_l05_q02_mixed_dialogue_reply
type: dialogue-builder
prompt: "Choose the best answer."
turns:
  - speaker: "Diego"
    line: "¿Dónde está tu hermana?"
choices:
  - "Está en la escuela."
  - "Me gusta la escuela."
  - "Tengo una hermana."
  - "Hace sol."
correctAnswer: "Está en la escuela."
explanation: "¿Dónde está...? asks where someone is."
hint: "Dónde asks for a place."
questionGoal: "Choose a fitting answer to a mixed family/location question."
misconception: "Responding with a related family sentence that does not answer where."
```

```question
key: u06_l05_q03_question_word_clue
type: multiple-choice
prompt: "Which question word usually asks for a place?"
choices:
  - "¿Dónde?"
  - "¿Cuándo?"
  - "¿Cuántos?"
  - "¿Cómo?"
correctAnswer: "¿Dónde?"
explanation: "¿Dónde? asks where, so it asks for a place."
hint: "Think of dónde está..."
questionGoal: "Identify the answer type signaled by a question word."
misconception: "Confusing common question words after mixed practice begins."
```

```question
key: u06_l05_q04_age_question_blank
type: fill-blank
prompt: "Complete the age question."
sentenceBefore: "¿"
sentenceAfter: " años tienes?"
choices:
  - "Cuántos"
  - "Dónde"
  - "Qué"
  - "Cuándo"
correctAnswer: "Cuántos"
explanation: "¿Cuántos años tienes? asks how old you are."
hint: "The word años tells you the question asks how many years."
questionGoal: "Choose the question word that fits an age question."
misconception: "Choosing question words by memorized familiarity rather than meaning."
```

```question
key: u06_l05_q05_mixed_dialogue_order
type: order-items
prompt: "Put the conversation in order."
items:
  - "Tengo doce años."
  - "Hola."
  - "¿Cuántos años tienes?"
  - "Me gusta la música."
  - "¿Qué te gusta?"
correctOrder:
  - "Hola."
  - "¿Cuántos años tienes?"
  - "Tengo doce años."
  - "¿Qué te gusta?"
  - "Me gusta la música."
explanation: "The answers should immediately follow the questions they answer."
hint: "Pair each question with its answer."
questionGoal: "Sequence a mixed novice conversation."
misconception: "Grouping all questions or all answers instead of building turns."
```

```question
key: u06_l05_q06_speak_mixed_answers
type: multi-blank-cloze
prompt: "Complete the two answers using the clues: name = Sofia, like = reading."
parts:
  - "Me llamo "
  - ". Me gusta "
  - "."
blanks:
  - correctAnswer: "Sofia"
    acceptedAnswers:
      - "Sofia"
      - "Sofía"
  - correctAnswer: "leer"
    acceptedAnswers:
      - "leer"
explanation: "The first answer gives a name, and the second answer gives a preference."
hint: "Use the name clue in the first blank and the activity clue in the second."
questionGoal: "Switch between mixed novice answer frames."
misconception: "Using one memorized answer frame for every question type."
```

### Lesson 6: Novice Capstone Presentation

```question
key: u06_l06_q01_model_capstone
type: passage-question
prompt: "Read the model capstone and answer."
passageTitle: "Mi presentación"
passage: |
  Hola. Me llamo Elena.
  Tengo doce años.
  Mi hermana es simpática.
  Me gusta la música.
  Después de la escuela, voy a la biblioteca.
question: "What does Elena like?"
choices:
  - "music"
  - "the library"
  - "her sister"
  - "Spanish class"
correctAnswer: "music"
explanation: "Me gusta la música tells what Elena likes."
hint: "Find the sentence with Me gusta."
questionGoal: "Read a model capstone for a preference detail."
misconception: "Confusing a place someone goes with a thing someone likes."
```

```question
key: u06_l06_q02_capstone_frames
type: multi-blank-cloze
prompt: "Complete the capstone frames using the clues: name = Alex, age = 12, like = reading."
parts:
  - "Me llamo "
  - ". Tengo "
  - " años. Me gusta "
  - "."
blanks:
  - correctAnswer: "Alex"
    acceptedAnswers:
      - "Alex"
  - correctAnswer: "doce"
    acceptedAnswers:
      - "doce"
      - "12"
  - correctAnswer: "leer"
    acceptedAnswers:
      - "leer"
explanation: "A capstone can combine name, age, and preference frames."
hint: "Use a name first, an age number second, and an activity third."
questionGoal: "Complete core capstone sentence frames."
misconception: "Putting unrelated vocabulary into familiar presentation frames."
```

```question
key: u06_l06_q03_best_capstone_sentence
type: multiple-choice
prompt: "Which sentence is a clear Level 1 capstone sentence?"
choices:
  - "Me gusta la clase de arte."
  - "Yo gusto arte clase."
  - "Soy doce años."
  - "La clase gusto me."
correctAnswer: "Me gusta la clase de arte."
explanation: "This sentence uses the learned me gusta chunk with a school phrase."
hint: "Choose the sentence built from a familiar accurate frame."
questionGoal: "Select an accurate familiar sentence for capstone use."
misconception: "Valuing word-for-word translation over learned Spanish frames."
```

```question
key: u06_l06_q04_fix_capstone
type: error-correction
prompt: "Correct the capstone sentence."
sentence: "Yo soy doce años y gusto música."
acceptedAnswers:
  - "Tengo doce años y me gusta la música."
explanation: "Use Tengo... años for age and me gusta for liking."
hint: "Fix the age chunk first, then the liking chunk."
questionGoal: "Correct two high-priority beginner transfer errors in a capstone sentence."
misconception: "Translating 'I am twelve and I like music' word for word."
```

```question
key: u06_l06_q05_write_capstone
type: multiple-choice
prompt: "Which option is the strongest short Level 1 capstone presentation?"
choices:
  - "Hola. Me llamo Mateo. Tengo doce años. Mi hermana es simpática. Me gusta leer. Después de la escuela, voy a casa."
  - "Tengo doce años. Tengo doce años. Tengo doce años."
  - "La clase rojo biblioteca gusto porque."
  - "Hola. Gracias. De nada. Adiós."
correctAnswer: "Hola. Me llamo Mateo. Tengo doce años. Mi hermana es simpática. Me gusta leer. Después de la escuela, voy a casa."
explanation: "The strongest capstone combines several learned sentence jobs: greeting, name, age, family description, preference, and routine/place."
hint: "Look for the option that combines different learned frames accurately."
questionGoal: "Select an integrated novice presentation built from familiar chunks."
misconception: "Thinking a capstone can be only repeated facts or isolated memorized phrases."
```

```question
key: u06_l06_q06_speak_capstone
type: order-items
prompt: "Put the capstone presentation in a logical order."
items:
  - "Tengo once años."
  - "Hola."
  - "Me gusta la música."
  - "Me llamo Ana."
  - "Voy a la escuela."
correctOrder:
  - "Hola."
  - "Me llamo Ana."
  - "Tengo once años."
  - "Me gusta la música."
  - "Voy a la escuela."
explanation: "A clear capstone opens, gives identity details, then adds preference and routine information."
hint: "Start with the greeting and name before adding details."
questionGoal: "Sequence familiar capstone sentences into a coherent presentation."
misconception: "Treating capstone sentences as isolated facts instead of a short organized presentation."
```
