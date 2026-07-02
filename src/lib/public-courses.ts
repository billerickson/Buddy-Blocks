type CourseCopy = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  paragraphs: string[];
  color: string;
  accent: string;
  levelRange: string;
  tracks: ResearchTrack[];
};

export type CourseStats = {
  levels: number;
  units: number;
  lessons: number;
  questions: number;
};

export type QuestionMockup = {
  type: string;
  label: string;
  prompt: string;
  detail?: string;
  choices?: string[];
  correctAnswer?: string;
  inputAnswer?: string;
  pairs?: Array<{ left: string; right: string }>;
  order?: string[];
  passage?: string;
  cloze?: Array<{ label: string; answer: string }>;
  rows?: Array<{ label: string; answers: string[] }>;
  feedback?: string;
};

export type ResearchTrack = {
  slug: string;
  title: string;
  label: string;
  researchPath: string;
  description: string;
  stats: CourseStats;
  unitTitles: string[];
  paragraphs: string[];
  mockups: QuestionMockup[];
};

export type CourseLevel = {
  track: ResearchTrack;
  label: string;
  stats: CourseStats;
  unitTitles: string[];
  paragraphs: string[];
  mockups: QuestionMockup[];
};

export type CourseFamily = CourseCopy & {
  stats: CourseStats;
  mockups: QuestionMockup[];
};

const grade3Math: ResearchTrack = {
  slug: 'grade-3-math',
  title: 'Grade 3 Math',
  label: 'Grade 3',
  researchPath: 'research/grade-03-math',
  description:
    'Grade 3 Math moves from number readiness into multiplication and division meaning, strategy-based fluency, whole-number operations, fractions as numbers, measurement and data, area, perimeter, geometry, and cumulative transfer.',
  stats: { levels: 1, units: 12, lessons: 76, questions: 456 },
  unitTitles: [
    'Grade 3 Number Readiness',
    'Multiplication As Equal Groups And Arrays',
    'Division As Sharing, Grouping, And Unknown Factors',
    'Multiplication And Division Strategies',
    'Place Value, Rounding, And Whole-Number Operations',
    'Four-Operation Word Problems And Equations',
    'Fractions As Equal Parts And Numbers',
    'Equivalent Fractions And Fraction Comparison',
    'Measurement, Data, And Applied Quantitative Reasoning',
    'Area, Arrays, And Multiplication',
    'Perimeter, Geometry, And Shape Attributes',
    'Cumulative Modeling And Grade 3 Mastery',
  ],
  paragraphs: [
    'Students represent multiplication and division with equal groups, arrays, area, sharing, grouping, and unknown-factor situations before fluency practice asks for speed.',
    'Fractions are treated as quantities on number lines and in equal partitions, so students compare size and equivalence by reasoning rather than memorized numerator and denominator tricks.',
    'Students practice representation choice, reasonableness checks, and misconception repair across word problems, measurement, graphing, area, perimeter, geometry, and cumulative modeling.',
  ],
  mockups: [
    {
      type: 'multi-blank-cloze',
      label: 'Multi Blank Cloze',
      prompt: 'Complete the place-value sentence for 735.',
      detail: '735 has ___ hundreds, ___ tens, and ___ ones.',
      cloze: [
        { label: 'hundreds', answer: '7' },
        { label: 'tens', answer: '3' },
        { label: 'ones', answer: '5' },
      ],
      feedback: 'In 735, each digit has a value because of its place.',
    },
    {
      type: 'multiple-choice',
      label: 'Multiple Choice',
      prompt: 'Which statement is true about 525?',
      choices: [
        'The first 5 means 5 hundreds.',
        'Both 5s have the same value.',
        'The last 5 means 5 tens.',
        'The 2 means 2 ones.',
      ],
      correctAnswer: 'The first 5 means 5 hundreds.',
      feedback: 'The same digit can have a different value in a different place.',
    },
  ],
};

const grade6Math: ResearchTrack = {
  slug: 'grade-6-math',
  title: 'Grade 6 Math',
  label: 'Grade 6',
  researchPath: 'research/grade-06-math',
  description:
    'Grade 6 Math orders number readiness, ratios, rates, fraction and decimal operations, rational numbers, algebra, geometry, statistics, and financial/application modeling into a compact middle-school path.',
  stats: { levels: 1, units: 9, lessons: 54, questions: 324 },
  unitTitles: [
    'Operation Readiness And Number Sense',
    'Ratio Language And Equivalent Ratios',
    'Unit Rates, Percents, And Applied Rates',
    'Fraction Division And Decimal Fluency',
    'Rational Numbers And The Coordinate Plane',
    'Expressions, Equivalence, And Algebraic Language',
    'Equations, Inequalities, And Variable Relationships',
    'Geometry, Measurement, And Coordinate Figures',
    'Statistics, Financial Decisions, And Cumulative Modeling',
  ],
  paragraphs: [
    'Students learn ratio language as multiplicative comparison with tape diagrams, double number lines, tables, equations, and verbal descriptions.',
    'Fraction division, decimals, negative numbers, variables, equations, inequalities, geometry, and statistics are assessed through models and contexts before they are treated as isolated procedures.',
    'Financial and applied modeling tasks reinforce rates, decimals, percents, data, units, and reasonableness without turning the course into a separate economics survey.',
  ],
  mockups: [
    {
      type: 'match-pairs',
      label: 'Match Pairs',
      prompt: 'Match each situation to the ratio named.',
      pairs: [
        { left: '2 cups lemon juice and 3 cups water, juice to water', right: '2:3' },
        { left: '6 red beads and 4 white beads, white to red', right: '4:6' },
        { left: '5 wins and 1 loss, wins to losses', right: '5:1' },
      ],
      feedback: 'The ratio order follows the order of the quantities named.',
    },
    {
      type: 'text-input',
      label: 'Text Input',
      prompt: 'A trail mix has 8 peanuts for every 3 raisins. Type the ratio of peanuts to raisins using a colon.',
      inputAnswer: '8:3',
      feedback: 'Peanuts are named first, so the ratio is 8:3.',
    },
  ],
};

const grade3Vocabulary: ResearchTrack = {
  slug: 'grade-3-vocabulary',
  title: 'Grade 3 Vocabulary',
  label: 'Grade 3',
  researchPath: 'research/grade-03-vocabulary',
  description:
    'Grade 3 Vocabulary treats vocabulary as a word-learning and academic-language course, not a spelling list or broad ELA replacement.',
  stats: { levels: 1, units: 8, lessons: 36, questions: 216 },
  unitTitles: [
    'Word-Learning Routine And Context Clues',
    'Reference Tools And Meaning Fit',
    'Word Relationships And Precision',
    'Word Parts And Word Families',
    'Multiple Meanings, Homophones, And Homographs',
    'Literal, Nonliteral, And Author-Craft Language',
    'Academic And Content-Area Vocabulary',
    'Cumulative Word-Solving Transfer',
  ],
  paragraphs: [
    'Students learn a repeatable routine: pause, reread, find clues, try a meaning, and check whether the meaning fits the sentence or passage.',
    'Reference tools, morphology, word relationships, multiple meanings, figurative language, and academic vocabulary are taught as evidence for meaning rather than as isolated definition recall.',
    'The final transfer work asks students to choose among context, word parts, reference checks, and precision strategies in unfamiliar reading and writing situations.',
  ],
  mockups: [
    {
      type: 'order-items',
      label: 'Order Items',
      prompt: 'Put the word-learning routine in a useful order.',
      order: [
        'Pause at the unknown word',
        'Reread the sentence',
        'Look for clues',
        'Try a meaning',
        'Check if the meaning fits',
      ],
      feedback: 'A strong reader slows down, finds evidence, tries a meaning, and checks it.',
    },
    {
      type: 'passage-question',
      label: 'Passage Question',
      prompt: 'Read the sentence and answer.',
      passage: "After the rainstorm, Ava's drenched socks dripped water onto the floor.",
      detail: 'What does drenched most likely mean?',
      choices: ['Very wet', 'Very clean', 'Full of holes', 'Brightly colored'],
      correctAnswer: 'Very wet',
      feedback: 'The socks dripped water, so drenched means very wet.',
    },
  ],
};

const grade6Vocabulary: ResearchTrack = {
  slug: 'grade-6-vocabulary',
  title: 'Grade 6 Vocabulary',
  label: 'Grade 6',
  researchPath: 'research/grade-06-vocabulary',
  description:
    'Practice middle-school word learning through context, morphology, academic words, disciplinary language, word choice, figurative language, argument, media, research, and revision.',
  stats: { levels: 1, units: 8, lessons: 32, questions: 192 },
  unitTitles: [
    'Strategic Word Learning In Context',
    'Morphology And Word Families',
    'Academic Vocabulary For Reading, Tasks, And Discussion',
    'Disciplinary Vocabulary Across Subjects',
    'Connotation, Denotation, And Precise Word Choice',
    'Figurative Language And Author Craft',
    'Argument, Media, And Source Vocabulary',
    'Research, Revision, And Cumulative Transfer',
  ],
  paragraphs: [
    'Students analyze context, break words into meaningful parts, connect to known words, test meanings in sentences, and verify with references when useful.',
    'Greek and Latin roots, general academic vocabulary, domain terms, connotation, denotation, source language, and discussion stems are practiced in real text and task contexts.',
    'Assessment emphasizes transfer: students must infer, justify, choose precise language, and apply word-learning habits to new passages rather than only recall studied definitions.',
  ],
  mockups: [
    {
      type: 'match-pairs',
      label: 'Match Pairs',
      prompt: 'Match each argument term to its role.',
      pairs: [
        { left: 'claim', right: 'the main point someone wants to prove' },
        { left: 'reason', right: 'why the claim makes sense' },
        { left: 'evidence', right: 'facts, examples, or details that support the claim' },
      ],
      feedback: 'Argument words work together, but each one has a different job.',
    },
    {
      type: 'passage-question',
      label: 'Passage Question',
      prompt: 'Identify the claim.',
      passage:
        'Our school should add a small vegetable garden. Gardening would help students learn science outdoors. Last year, a nearby school reported that its garden improved science participation.',
      detail: 'Which sentence is the claim?',
      choices: [
        'Our school should add a small vegetable garden.',
        'Gardening would help students learn science outdoors.',
        'Last year, a nearby school reported that its garden improved science participation.',
        'nearby school',
      ],
      correctAnswer: 'Our school should add a small vegetable garden.',
      feedback: 'The claim is the main point the rest of the argument supports.',
    },
  ],
};

const spanish1: ResearchTrack = {
  slug: 'spanish-1',
  title: 'Spanish 1',
  label: 'Level 1',
  researchPath: 'research/spanish-1',
  description:
    'Learn novice communication functions through useful phrases and contexts instead of a grammar survey.',
  stats: { levels: 1, units: 6, lessons: 30, questions: 180 },
  unitTitles: [
    'First Spanish Moves',
    'Numbers, Calendar, Weather, And Time',
    'Classroom Objects And Descriptions',
    'People, Family, And Personal Identity',
    'Likes, Activities, And School Life',
    'Food, Places, Routines, And Novice Capstone',
  ],
  paragraphs: [
    'Students begin with usable social and classroom language: greetings, politeness, names, well-being, survival phrases, sound-spelling clues, and cognates checked against context.',
    'The sequence then adds numbers, age, dates, weather, time, classroom nouns, articles, colors, location, identity, family, likes, school, food, places, and routines.',
    'Every unit keeps interpretive input ahead of production, with short exchanges, dialogue choices, matching, cloze, typed answers, and cumulative retrieval.',
  ],
  mockups: [
    {
      type: 'dialogue-builder',
      label: 'Dialogue Builder',
      prompt: 'Choose the best answer.',
      detail: 'Lucia: "Como te llamas?"',
      choices: ['Me llamo Diego.', 'Estoy bien.', 'Hace sol.', 'De nada.'],
      correctAnswer: 'Me llamo Diego.',
      feedback: 'Como te llamas? asks for a name, and Me llamo... answers with a name.',
    },
    {
      type: 'match-pairs',
      label: 'Match Pairs',
      prompt: 'Match each Spanish phrase to its meaning.',
      pairs: [
        { left: 'hola', right: 'hello' },
        { left: 'gracias', right: 'thank you' },
        { left: 'de nada', right: "you're welcome" },
      ],
      feedback: 'These short phrases help make a Spanish exchange polite and clear.',
    },
  ],
};

const french1: ResearchTrack = {
  slug: 'french-1',
  title: 'French 1',
  label: 'Level 1',
  researchPath: 'research/french-1',
  description:
    'Learn immediate classroom interaction, personal identity, family, descriptions, preferences, school, places, food, choices, and cumulative novice communication.',
  stats: { levels: 1, units: 7, lessons: 28, questions: 168 },
  unitTitles: [
    'First French For Real Interaction',
    'Numbers, Calendar, Weather, And Colors',
    'Introducing Myself And Asking Questions',
    'Family, People, And Descriptions',
    'Likes, Activities, And Opinions',
    'School, Objects, And Everyday Places',
    'Food, Choices, Routines, And Novice Capstone',
  ],
  paragraphs: [
    'Students learn greetings, polite classroom phrases, name and well-being exchanges, and early sound-spelling patterns such as final silent consonants, accents, and c-cedilla.',
    'Grammar appears when it helps meaning: articles, gender, adjective agreement, question words, ne...pas, il y a, etre, avoir, aller, faire, vouloir, and high-frequency chunks.',
    'Culture is tied to language tasks and respectful comparison, while assessment uses familiar listening, reading, dialogue, cloze, and short presentational prompts.',
  ],
  mockups: [
    {
      type: 'dialogue-builder',
      label: 'Dialogue Builder',
      prompt: 'Choose the best next line.',
      detail: 'Ana: "Merci."',
      choices: ['De rien.', 'Bonjour.', "Je m'appelle Ana.", 'Au revoir.'],
      correctAnswer: 'De rien.',
      feedback: 'A courtesy phrase calls for the matching polite response.',
    },
    {
      type: 'fill-blank',
      label: 'Fill Blank',
      prompt: 'Complete the age sentence.',
      detail: "J'___ onze ans.",
      choices: ['ai', 'suis', 'vais', 'aime'],
      correctAnswer: 'ai',
      feedback: 'French uses avoir in the age formula: J\'ai onze ans.',
    },
  ],
};

const grammar1: ResearchTrack = {
  slug: 'grammar-1',
  title: 'Grammar 1',
  label: 'Level 1',
  researchPath: 'research/grammar-1',
  description:
    'Practice sentence awareness, word jobs, word forms, mechanics, sentence expansion, and cumulative revision.',
  stats: { levels: 1, units: 7, lessons: 26, questions: 156 },
  unitTitles: [
    'Sentences, Subjects, And Predicates',
    'Nouns, Articles, Pronouns, And Ownership',
    'Verbs, Time, And Agreement',
    'Adjectives, Adverbs, And Precise Description',
    'Prepositions, Conjunctions, And Sentence Expansion',
    'Capitalization, Commas, And Dialogue Signals',
    'Cumulative Editing And Grammar For Writing',
  ],
  paragraphs: [
    'Students build a stable sense of complete thoughts, subjects, predicates, and word jobs before being asked to edit larger passages.',
    'Parts of speech are taught by what words do in sentences, while punctuation and capitalization are tied to meaning, grouping, ownership, dialogue, and clarity.',
    'Practice moves from recognition to focused correction, sentence combining, expansion, and cumulative editing so grammar transfers into writing.',
  ],
  mockups: [
    {
      type: 'multiple-choice',
      label: 'Multiple Choice',
      prompt: 'Which word group is a complete sentence?',
      choices: [
        'The lantern on the porch.',
        'After the rain stopped.',
        'The lantern glowed on the porch.',
        'Bright yellow and warm.',
      ],
      correctAnswer: 'The lantern glowed on the porch.',
      feedback: 'A sentence must tell a complete thought.',
    },
    {
      type: 'error-correction',
      label: 'Error Correction',
      prompt: 'Make this fragment into a complete sentence.',
      detail: 'Under the old bridge.',
      inputAnswer: 'The fox hid under the old bridge.',
      feedback: 'The correction adds a subject and predicate.',
    },
  ],
};

const grammar2: ResearchTrack = {
  slug: 'grammar-2',
  title: 'Grammar 2',
  label: 'Level 2',
  researchPath: 'research/grammar-2',
  description:
    'Practice clearer naming, pronoun reference, verb phrases, sentence expansion, punctuation structure, sentence diagrams, and mixed editing.',
  stats: { levels: 1, units: 6, lessons: 25, questions: 150 },
  unitTitles: [
    'Sentences And Nouns That Name Clearly',
    'Pronouns And Clear Reference',
    'Verb Phrases And Time',
    'Expanding Sentences With Purpose',
    'Punctuation That Shows Structure',
    'Visual Grammar And Cumulative Editing',
  ],
  paragraphs: [
    'Students revisit complete sentences with stronger attention to precise nouns, clear ownership, and pronouns that point back to the right antecedent.',
    'Verb phrases, helping verbs, linking verbs, tense consistency, direct objects, compound subjects, compound predicates, and prepositional phrases help students expand sentences with purpose.',
    'The level connects punctuation and diagramming to editing, so students can see sentence structure before choosing the right grammar tool in mixed review.',
  ],
  mockups: [
    {
      type: 'multiple-choice',
      label: 'Multiple Choice',
      prompt: 'Which group of words is a complete sentence?',
      choices: [
        'The bright kite.',
        'Flew above the park.',
        'The bright kite flew above the park.',
        'Above the park on a windy day.',
      ],
      correctAnswer: 'The bright kite flew above the park.',
      feedback: 'A complete sentence has both a subject and a predicate.',
    },
    {
      type: 'match-pairs',
      label: 'Match Pairs',
      prompt: 'Match each sentence part to its job.',
      pairs: [
        { left: 'subject', right: 'names who or what the sentence is about' },
        { left: 'predicate', right: 'tells something about the subject' },
        { left: 'fragment', right: 'is missing a complete sentence part' },
        { left: 'complete sentence', right: 'has a subject and predicate' },
      ],
      feedback: 'Subjects and predicates work together to make complete sentences.',
    },
  ],
};

const grammar3: ResearchTrack = {
  slug: 'grammar-3',
  title: 'Grammar 3',
  label: 'Level 3',
  researchPath: 'research/grammar-3',
  description:
    'Practice clauses, coordination, subordination, modifiers, appositives, agreement, voice, punctuation, and cumulative sentence craft.',
  stats: { levels: 1, units: 6, lessons: 24, questions: 144 },
  unitTitles: [
    'Clause Foundations And Sentence Boundaries',
    'Coordination And Compound Sentences',
    'Subordination And Complex Sentences',
    'Modifiers, Appositives, And Sentence Detail',
    'Agreement, Voice, And Modifier Clarity',
    'Punctuation And Cumulative Sentence Craft',
  ],
  paragraphs: [
    'Students learn how independent and dependent clauses behave, then use coordination and subordination to show the relationship between ideas.',
    'Appositives, introductory elements, modifier placement, pronoun-antecedent agreement, clear reference, and active or passive voice are taught as choices that affect reader understanding.',
    'Punctuation lessons focus on structure: commas, semicolons, colons, sentence combinations, and cumulative editing all point back to meaning.',
  ],
  mockups: [
    {
      type: 'multiple-choice',
      label: 'Multiple Choice',
      prompt: 'Which word makes this clause dependent? Although the hike was long',
      choices: ['Although', 'hike', 'was', 'long'],
      correctAnswer: 'Although',
      feedback: 'Although is the subordinating word that makes the clause depend on a main clause.',
    },
    {
      type: 'fill-blank',
      label: 'Fill Blank',
      prompt: 'Classify the word group.',
      detail: 'Before the guests arrived is a ___ clause.',
      choices: ['dependent', 'independent', 'compound', 'complete'],
      correctAnswer: 'dependent',
      feedback: 'Before the guests arrived has a subject and verb, but before makes it dependent.',
    },
  ],
};

const grammar4: ResearchTrack = {
  slug: 'grammar-4',
  title: 'Grammar 4',
  label: 'Level 4',
  researchPath: 'research/grammar-4',
  description:
    'Practice purposeful revision with sentence control, variety, rhythm, parallelism, concision, mood, voice, register, craft punctuation, and editing systems.',
  stats: { levels: 1, units: 6, lessons: 24, questions: 144 },
  unitTitles: [
    'Sentence Control For Purposeful Revision',
    'Sentence Variety, Rhythm, And Emphasis',
    'Parallelism, Modifiers, And Concision',
    'Mood, Voice, And Register',
    'Punctuation As Craft',
    'Editing Systems And Grammar In Context',
  ],
  paragraphs: [
    'Students use grammar as a revision toolkit, repairing fragments and run-ons, joining independent clauses, and improving pronoun and modifier clarity.',
    'Sentence variety, rhythm, emphasis, parallelism, concision, mood, voice, and register move the work beyond correctness into deliberate style.',
    'The level closes with punctuation effects, copyediting passes, literary sentence analysis, and portfolio-style revision justifications.',
  ],
  mockups: [
    {
      type: 'multiple-choice',
      label: 'Multiple Choice',
      prompt: 'Which sentence uses parallel structure?',
      choices: [
        'The hikers packed water, snacks, and maps.',
        'The hikers packed water, bringing snacks, and to carry maps.',
        'The hikers packed water, snacks, and were mapping.',
        'The hikers packed water, to snack, and maps.',
      ],
      correctAnswer: 'The hikers packed water, snacks, and maps.',
      feedback: 'Water, snacks, and maps are all nouns in the same list pattern.',
    },
    {
      type: 'error-correction',
      label: 'Error Correction',
      prompt: 'Correct the faulty parallelism.',
      detail: 'Maya likes hiking, swimming, and to bike.',
      inputAnswer: 'Maya likes hiking, swimming, and biking.',
      feedback: 'The items should use matching forms, such as all -ing words.',
    },
  ],
};

const logic1: ResearchTrack = {
  slug: 'logic-1',
  title: 'Logic 1',
  label: 'Level 1',
  researchPath: 'research/logic-1',
  description:
    'Practice careful-thinking habits before formal symbolic logic.',
  stats: { levels: 1, units: 6, lessons: 30, questions: 180 },
  unitTitles: [
    'Claims, Reasons, And Tiny Arguments',
    'Support, Evidence, And Relevance',
    'Conclusions From Clues',
    'Rules, Causes, And Categories',
    'Weak Reasoning And Careful Fixes',
    'Careful Thinking Across Subjects',
  ],
  paragraphs: [
    'Students first distinguish statements, questions, commands, opinions, claims, reasons, examples, evidence, and conclusions in ordinary contexts.',
    'They then check whether support is relevant, draw only conclusions that follow, interpret if-then and cause/effect language, and use concrete categories and quantifiers.',
    'Weak reasoning is treated as fixable thinking: unrelated reasons, too little evidence, circular explanations, either/or traps, personal attacks, and overbroad claims.',
  ],
  mockups: [
    {
      type: 'match-pairs',
      label: 'Match Pairs',
      prompt: 'Match each sentence to its job.',
      pairs: [
        { left: 'Close the notebook.', right: 'command' },
        { left: 'Did you finish the page?', right: 'question' },
        { left: 'The page has ten problems.', right: 'statement' },
      ],
      feedback: 'Commands direct, questions ask, and statements tell.',
    },
    {
      type: 'passage-question',
      label: 'Passage Question',
      prompt: 'Read the lines and answer the question.',
      passage: 'The class planted seeds.\nDid the seeds sprout?\nWater the tray gently.\nWhat a tall sprout!',
      detail: 'Which line is an exclamation?',
      choices: [
        'The class planted seeds.',
        'Did the seeds sprout?',
        'Water the tray gently.',
        'What a tall sprout!',
      ],
      correctAnswer: 'What a tall sprout!',
      feedback: 'That line shows strong feeling or surprise.',
    },
  ],
};

const rhetoric1: ResearchTrack = {
  slug: 'rhetoric-1',
  title: 'Rhetoric 1',
  label: 'Level 1',
  researchPath: 'research/rhetoric-1',
  description:
    'Practice noticing purpose in communication, then producing short, clear, supported responses.',
  stats: { levels: 1, units: 7, lessons: 30, questions: 180 },
  unitTitles: [
    'Purposeful Communication',
    'Stories That Make A Point',
    'Description And Amplification',
    'Claims, Reasons, And Examples',
    'Comparison And Fair Evaluation',
    'Revision And Short Delivery',
    'Cumulative Rhetoric Studio',
  ],
  paragraphs: [
    'Students ask who is speaking, who the audience is, and what the communication is trying to do before they are asked to write longer responses.',
    'Students practice narration, fable retelling, useful detail, claim-reason-example support, comparison by criteria, fair evaluation, revision, and short delivery.',
    'The research treats rhetoric as practical judgment: choose the move that fits the audience and purpose, then revise so the message becomes clearer.',
  ],
  mockups: [
    {
      type: 'multiple-choice',
      label: 'Multiple Choice',
      prompt: 'Which example best shows rhetoric as purposeful communication?',
      choices: [
        "A student writes, 'Please close the gate so the dog stays safe.'",
        'A student lists five long words with no sentence.',
        'A student shouts louder each time someone disagrees.',
        'A student copies a page without knowing what it says.',
      ],
      correctAnswer: "A student writes, 'Please close the gate so the dog stays safe.'",
      feedback: 'The sentence has an audience, a clear request, and a reason.',
    },
    {
      type: 'passage-question',
      label: 'Passage Question',
      prompt: 'Read the sign and answer.',
      passage: 'Please stay on the path.\nTiny seeds are growing beside it.',
      detail: 'What is the sign trying to do?',
      choices: [
        'Help visitors protect the seeds',
        'Tell a story about a gardener',
        'Make the path sound scary',
        'List every plant in the garden',
      ],
      correctAnswer: 'Help visitors protect the seeds',
      feedback: 'The request and reason show the purpose.',
    },
  ],
};

const classicalLiterature1: ResearchTrack = {
  slug: 'classical-literature-1',
  title: 'Classical Literature 1',
  label: 'Level 1',
  researchPath: 'research/classical-literature-1',
  description:
    'Explore a compact shared story foundation through fables, folktales, myths, heroic journeys, poetry, dialogue, comparison, and transfer.',
  stats: { levels: 1, units: 6, lessons: 24, questions: 144 },
  unitTitles: [
    'Fables, Morals, And Story Elements',
    'Folktales, Tricksters, And Story Patterns',
    'Myths, Names, And Cultural Meaning',
    'Heroes, Quests, And Consequences',
    'Poetry, Sound, And Image',
    'Dialogue, Comparison, And Final Transfer',
  ],
  paragraphs: [
    'Students retell short fables, myths, folktales, legends, poems, drama excerpts, and adapted classical stories with beginning, middle, end, and evidence.',
    'They learn story elements, genre expectations, character choice and consequence, quest and trickster patterns, poetic sound and image, narrator, dialogue, speaker, and comparison.',
    'The research emphasizes respectful cultural framing and text evidence so classical names, patterns, and inherited stories become reading tools rather than trivia.',
  ],
  mockups: [
    {
      type: 'order-items',
      label: 'Order Items',
      prompt: 'Put the events from the fable of the thirsty crow in order.',
      order: [
        'The crow is thirsty and searches for water.',
        'The crow finds a pitcher with water at the bottom.',
        'The crow drops pebbles into the pitcher.',
        'The water rises high enough to drink.',
        'The crow drinks the water.',
      ],
      feedback: 'A retell follows the main events from problem to solution.',
    },
    {
      type: 'passage-question',
      label: 'Passage Question',
      prompt: 'Read the short fable and answer.',
      passage:
        'Hare laughed because Tortoise walked slowly. Tortoise asked for a race. Hare ran far ahead and stopped to rest. Tortoise kept walking. When Hare woke up, Tortoise was already near the finish line.',
      detail: 'What happened in the middle of the fable?',
      choices: [
        'Hare stopped to rest after running ahead.',
        'Tortoise crossed the finish line first.',
        'Hare and Tortoise became birds.',
        'Tortoise laughed at Hare before the race.',
      ],
      correctAnswer: 'Hare stopped to rest after running ahead.',
      feedback: 'The middle event comes after the race begins and before the ending.',
    },
  ],
};

const classicalLiterature2: ResearchTrack = {
  slug: 'classical-literature-2',
  title: 'Classical Literature 2',
  label: 'Level 2',
  researchPath: 'research/classical-literature-2',
  description:
    'Extend the story foundation into longer tales, motive, theme evidence, myth patterns, heroic choices, poetry, drama, and focused comparison.',
  stats: { levels: 1, units: 6, lessons: 27, questions: 162 },
  unitTitles: [
    'Story Tools For Longer Tales',
    'Fables, Folktales, Motives, And Morals',
    'Myth Cycles, Names, Places, And Patterns',
    'Quests, Tests, And Heroic Choices',
    'Poetry, Sound, And Image',
    'Versions, Drama, And Transfer',
  ],
  paragraphs: [
    'Students move from simple retelling into cause and effect, turning points, motive, trait, choice, consequence, and evidence for themes or morals.',
    'They compare fables, folktales, myths, and heroic episodes with one clear focus instead of collecting random similarities and differences.',
    'Poetry, drama, narrator, speaker, version awareness, and motif transfer give students a steadier bridge from supported reading toward independent interpretation.',
  ],
  mockups: [
    {
      type: 'passage-question',
      label: 'Passage Question',
      prompt: 'Read two versions and answer.',
      passage:
        'Version A: A girl shares water with an old traveler. The traveler shows her the hidden spring. Version B: A boy shares bread with an old traveler. The traveler shows him the hidden spring.',
      detail: 'What stays the same in both versions?',
      choices: [
        'A child helps an old traveler and is shown the hidden spring.',
        'The child always shares water.',
        'The helper is a bird.',
        'The spring is never found.',
      ],
      correctAnswer: 'A child helps an old traveler and is shown the hidden spring.',
      feedback: 'A focused comparison names the pattern that appears in both versions.',
    },
    {
      type: 'multi-blank-cloze',
      label: 'Multi Blank Cloze',
      prompt: 'Complete the quest map from the summary.',
      detail: 'The task is ___; the obstacle is ___; the return is ___.',
      cloze: [
        { label: 'task', answer: 'find the healing spring' },
        { label: 'obstacle', answer: 'the road guarded by stone lions' },
        { label: 'return', answer: 'bring water back to the city' },
      ],
      feedback: 'Quest maps separate the goal, the challenge, and the return.',
    },
  ],
};

const classicalLiterature3: ResearchTrack = {
  slug: 'classical-literature-3',
  title: 'Classical Literature 3',
  label: 'Level 3',
  researchPath: 'research/classical-literature-3',
  description:
    'Build literary analysis habits through summary, claim-evidence-explanation, genre contrast, point of view, imagery, allusion, dialogue, and transfer.',
  stats: { levels: 1, units: 6, lessons: 22, questions: 132 },
  unitTitles: [
    'Reading Like A Literary Analyst',
    'Heroes, Journeys, And Epic Signals',
    'Tragic Conflict And Comic Correction',
    'Versions, Translations, And Point Of View',
    'Imagery, Allusion, Wisdom, And Dialogue',
    'Transfer Across Classical Texts',
  ],
  paragraphs: [
    'Students learn to summarize before interpreting, then build claims that connect evidence to explanation instead of stopping at a quote.',
    'Epic, tragic, comic, version, translation, and point-of-view lessons help students notice how form and genre shape meaning.',
    'The course ends with transfer work that asks students to choose a reading move, correct weak reasoning, and support an interpretation in unfamiliar passages.',
  ],
  mockups: [
    {
      type: 'multiple-choice',
      label: 'Multiple Choice',
      prompt: "What is missing from this response? 'Elian is merciful. The passage says, \"Elian paused, then held out the cup.\"'",
      choices: [
        'An explanation of how the evidence supports the claim',
        'A longer quote from the passage',
        'A second character name',
        'A new plot event',
      ],
      correctAnswer: 'An explanation of how the evidence supports the claim',
      feedback: 'A strong literary response explains how the evidence proves the claim.',
    },
    {
      type: 'match-pairs',
      label: 'Match Pairs',
      prompt: 'Match each image-in-context to the idea it most likely suggests.',
      pairs: [
        { left: 'A lamp shaking after a threat in a windless room', right: 'Hidden fear' },
        { left: 'A gate opening at dawn after a long night', right: 'New possibility' },
        { left: 'A crown too heavy for the young ruler to lift', right: 'The burden of rule' },
      ],
      feedback: 'Images suggest ideas through context, not through a fixed code.',
    },
  ],
};

const classicalLiterature4: ResearchTrack = {
  slug: 'classical-literature-4',
  title: 'Classical Literature 4',
  label: 'Level 4',
  researchPath: 'research/classical-literature-4',
  description:
    'Prepare older readers for classical texts through close reading, epic scale, tragic choice, dramatic irony, comedy, satire readiness, dialogue, allusion, and translation.',
  stats: { levels: 1, units: 6, lessons: 23, questions: 138 },
  unitTitles: [
    'Close Reading Groundwork For Older Texts',
    'Epic Scale, Heroic Values, And Motif',
    'Tragedy, Choice, And Dramatic Irony',
    'Comedy, Inversion, And Satire Readiness',
    'Dialogue, Wisdom, Lyric, And Public Ideas',
    'Allusion, Transformation, Translation, And Transfer',
  ],
  paragraphs: [
    'Students practice orienting to speaker, situation, form, context, and evidence before they make interpretive claims about older or more difficult texts.',
    'Epic, tragedy, comedy, satire, dialogue, lyric, biography, allusion, adaptation, and translation are taught as reading lenses tied to textual proof.',
    'The final transfer work asks students to handle unfamiliar passages with context-aware but evidence-led interpretation.',
  ],
  mockups: [
    {
      type: 'passage-question',
      label: 'Passage Question',
      prompt: 'Read the scene and identify the main conflict.',
      passage:
        'Nera: The law is posted, but my brother still lies beyond the wall. Guard: The ruler forbids burial. I am ordered to watch the gate.',
      detail: 'What conflict drives the scene?',
      choices: [
        "Nera's family duty clashes with the ruler's law.",
        'The guard wants to become ruler of the city.',
        'Nera cannot remember where the wall is.',
        'The ruler asks Nera to write a new law.',
      ],
      correctAnswer: "Nera's family duty clashes with the ruler's law.",
      feedback: 'Drama becomes clearer when readers track pressure, motive, and obstacle.',
    },
    {
      type: 'passage-question',
      label: 'Passage Question',
      prompt: 'Read the satire-ready passage and identify the target.',
      passage:
        'Three officials arrived to measure whether the village bridge was straight. They spent the day arguing about the measuring ruler\'s golden case, but no one used the ruler.',
      detail: 'What behavior is the passage criticizing?',
      choices: [
        'Caring more about impressive tools and status than doing the actual work',
        'Building bridges over water',
        'Using rulers to measure straight lines',
        'Working carefully all day and checking results',
      ],
      correctAnswer: 'Caring more about impressive tools and status than doing the actual work',
      feedback: 'Satire readiness asks what behavior the passage exposes.',
    },
  ],
};

const classicalLiterature5: ResearchTrack = {
  slug: 'classical-literature-5',
  title: 'Classical Literature 5',
  label: 'Level 5',
  researchPath: 'research/classical-literature-5',
  description:
    'Use seminar-style reading tools across ancient, scriptural, renaissance, political, economic, scientific, dramatic, and modern classical texts.',
  stats: { levels: 1, units: 6, lessons: 26, questions: 156 },
  unitTitles: [
    'Seminar Tools For Difficult Classics',
    'Ancient Questions Of Justice, Virtue, And The City',
    'Scripture, Confession, And The Inner Life',
    'Renaissance Self, State, Satire, And Stage',
    'Liberty, Democracy, Economy, And Critique',
    'Modern Drama, Science, And Capstone Synthesis',
  ],
  paragraphs: [
    'Students practice orienting difficult texts by speaker, genre, form, claim, evidence, context, and evaluative question before they judge the argument.',
    'The reading path moves across Plato, Aristotle, Plutarch, Stoicism, scripture, Augustine, Machiavelli, Montaigne, Rabelais, Shakespeare, Locke, Rousseau, Tocqueville, Smith, Marx, Ibsen, and scientific reflection.',
    'The capstone asks students to compare across eras and defend a reading with evidence, scope, and intellectual humility.',
  ],
  mockups: [
    {
      type: 'match-pairs',
      label: 'Match Pairs',
      prompt: 'Match each seminar move to its purpose.',
      pairs: [
        { left: 'Orient the text', right: 'identify speaker, genre, and situation' },
        { left: 'Summarize', right: 'state what the passage says before judging it' },
        { left: 'Evaluate', right: 'weigh the claim after understanding the evidence' },
      ],
      feedback: 'Difficult classics become more manageable when students slow the reading process down.',
    },
    {
      type: 'passage-question',
      label: 'Passage Question',
      prompt: 'Read the comparison claim and choose the best support.',
      passage:
        'One passage praises self-command as private discipline. Another asks how public laws shape citizens over time.',
      detail: 'Which comparison is most defensible?',
      choices: [
        'Both ask how character is formed, but one begins inside the self and the other begins with the city.',
        'Both passages say laws do not matter.',
        'Only one passage has any idea about character.',
        'The passages cannot be compared because they use different words.',
      ],
      correctAnswer: 'Both ask how character is formed, but one begins inside the self and the other begins with the city.',
      feedback: 'A strong cross-era comparison names both the shared question and the meaningful difference.',
    },
  ],
};

const historyAndCivics1: ResearchTrack = {
  slug: 'history-and-civics-1',
  title: 'History And Civics 1',
  label: 'Level 1',
  researchPath: 'research/history-and-civics-1',
  description:
    'Begin with the tools students need before large historical claims: time, place, source, evidence, community, economics, culture, symbols, and civic responsibility.',
  stats: { levels: 1, units: 8, lessons: 24, questions: 144 },
  unitTitles: [
    'Time, Sequence, And Change',
    'Maps, Globes, And Places',
    'Sources, Clues, And Evidence',
    'Communities, Rules, And Civic Life',
    'Needs, Wants, Work, And Trade',
    'Culture, Daily Life, And Historical Stories',
    'Symbols, Documents, And Shared Ideals',
    'Inquiry Capstone: Claims With Evidence',
  ],
  paragraphs: [
    'Students use sequence, timelines, maps, globes, directions, symbols, source types, and evidence before they make claims about history or civics.',
    'The course connects community rules, leaders, rights, responsibilities, needs, wants, goods, services, producers, consumers, trade, culture, and daily life.',
    'The final inquiry work asks students to support a simple claim with evidence from a short text, image, map, artifact, or timeline.',
  ],
  mockups: [
    {
      type: 'match-pairs',
      label: 'Match Pairs',
      prompt: 'Match each source type to a clue it might provide.',
      pairs: [
        { left: 'photograph', right: 'what people or places looked like' },
        { left: 'artifact', right: 'what tool or object people used' },
        { left: 'map', right: 'where places were located' },
      ],
      feedback: 'Different sources answer different kinds of questions.',
    },
    {
      type: 'passage-question',
      label: 'Passage Question',
      prompt: 'Read the source description and answer.',
      passage: 'A museum label says: This iron cooking pot was used by a family about 150 years ago.',
      detail: 'What kind of source is the cooking pot?',
      choices: ['artifact', 'document', 'photograph', 'secondary source'],
      correctAnswer: 'artifact',
      feedback: 'An artifact is an object people made or used.',
    },
  ],
};

const memoryWorks1: ResearchTrack = {
  slug: 'memory-works-1',
  title: 'Memory Works 1',
  label: 'Level 1',
  researchPath: 'research/memory-works-1',
  description:
    'Learn how to memorize and recite short, meaningful material through look-cover-say-check practice.',
  stats: { levels: 1, units: 6, lessons: 22, questions: 132 },
  unitTitles: [
    'Memory Practice Habits',
    'Sayings, Meaning, And Exact Words',
    'Poems, Rhythm, And Recitation',
    'Facts, Forms, And Patterns',
    'Maps, Timelines, And Ordered Knowledge',
    'Cumulative Recall And Confident Performance',
  ],
  paragraphs: [
    'Students begin with simple memory moves: look at a short line, break it into parts, cover it, say it, check it, and fix the part they missed.',
    'The course uses meaningful material: sayings, short poems, fact families, measure equivalences, grammar definitions, maps, compass directions, and history pegs.',
    'Review returns to older material after a delay so students practice remembering, not just rereading.',
  ],
  mockups: [
    {
      type: 'multiple-choice',
      label: 'Multiple Choice',
      prompt: 'Which step comes after you look at the line?',
      choices: [
        'Cover it and try to say it.',
        'Throw it away.',
        'Change all the words.',
        'Race to a new lesson.',
      ],
      correctAnswer: 'Cover it and try to say it.',
      feedback: 'Memory practice starts simply: look, cover, say, check.',
    },
    {
      type: 'match-pairs',
      label: 'Match Pairs',
      prompt: 'Match each memory step to what it means.',
      pairs: [
        { left: 'Look', right: 'read the line' },
        { left: 'Cover', right: 'hide the words' },
        { left: 'Say', right: 'try it from memory' },
      ],
      feedback: 'The first routine is ordinary on purpose: look, cover, say, check.',
    },
  ],
};

const courseCatalog: CourseCopy[] = [
  {
    slug: 'math',
    title: 'Math',
    eyebrow: 'Number sense, models, and problem solving',
    summary:
      'Students learn math by building meaning first, then practicing until skills become flexible, accurate, and useful in real problems.',
    paragraphs: [
      'Buddy Blocks teaches math with models students can see and explain: arrays, number lines, tables, diagrams, equations, area models, graphs, and real-world situations.',
      'Practice moves from understanding to fluency. Students learn what an operation, fraction, ratio, equation, or measurement means before they are asked to rely on shortcuts.',
      'Review is mixed and cumulative, so students learn to choose the right tool, check whether an answer makes sense, and transfer old skills into new problems.',
    ],
    color: '#5b79ff',
    accent: '#ffd84d',
    levelRange: 'Grades 3 and 6',
    tracks: [grade3Math, grade6Math],
  },
  {
    slug: 'vocabulary',
    title: 'Vocabulary',
    eyebrow: 'Word solving for every subject',
    summary:
      'Students learn how words work, how meanings shift in context, and how to use vocabulary with precision across reading, writing, and discussion.',
    paragraphs: [
      'Buddy Blocks teaches vocabulary as a repeatable routine: pause, reread, look for clues, try a meaning, check the fit, and use word parts or references when they help.',
      'Students practice context clues, roots and affixes, multiple meanings, precise word choice, figurative language, academic terms, and subject-area words in short, manageable tasks.',
      'The goal is transfer. Students are not just memorizing definitions; they are learning how to figure out unfamiliar words and use better words of their own.',
    ],
    color: '#e63e80',
    accent: '#18bca4',
    levelRange: 'Grades 3 and 6',
    tracks: [grade3Vocabulary, grade6Vocabulary],
  },
  {
    slug: 'spanish',
    title: 'Spanish',
    eyebrow: 'Useful language from the first lesson',
    summary:
      'Students start Spanish with language they can understand and use right away: greetings, classroom phrases, questions, descriptions, preferences, food, places, and routines.',
    paragraphs: [
      'Buddy Blocks teaches Spanish through short communication moves. Students listen and read first, then choose, match, build, type, and speak familiar phrases with support.',
      'Grammar is introduced as a tool for meaning: articles, agreement, question words, ser, estar, tener, hay, gustar-like patterns, and everyday verb chunks appear in context.',
      'Culture stays connected to real language use through names, places, greetings, foods, school life, maps, music, art, and simple comparisons.',
    ],
    color: '#18bca4',
    accent: '#ffd84d',
    levelRange: 'Level 1',
    tracks: [spanish1],
  },
  {
    slug: 'french',
    title: 'French',
    eyebrow: 'Communication, sound, and culture',
    summary:
      'Students start French with practical language for greetings, classroom interactions, questions, identity, family, school, places, food, choices, and routines.',
    paragraphs: [
      'Buddy Blocks teaches French by giving students repeated contact with useful words and phrases before asking them to produce language independently.',
      'Students notice sound-spelling patterns, articles, agreement, negation, question words, and high-frequency verb chunks as they help students understand and answer real prompts.',
      'Francophone culture appears through everyday contexts, places, foods, school routines, polite language, and respectful comparisons.',
    ],
    color: '#5b79ff',
    accent: '#ff7f45',
    levelRange: 'Level 1',
    tracks: [french1],
  },
  {
    slug: 'grammar',
    title: 'Grammar',
    eyebrow: 'Clear sentences and better writing',
    summary:
      'Students move through four grammar levels that turn sentence structure, punctuation, usage, and revision into tools for clearer writing.',
    paragraphs: [
      'Buddy Blocks starts with sentence sense: complete thoughts, subjects, predicates, and the jobs words do inside a sentence, then grows into pronoun clarity, verb phrases, sentence expansion, punctuation, and diagramming.',
      'Later levels teach clauses, coordination, subordination, appositives, modifiers, agreement, voice, sentence variety, rhythm, parallelism, concision, mood, register, and punctuation as craft.',
      'Grammar work always leads back to writing through sentence expansion, combining, correction, focused editing, and revision that makes meaning clearer for a reader.',
    ],
    color: '#ffd84d',
    accent: '#e63e80',
    levelRange: 'Levels 1-4',
    tracks: [grammar1, grammar2, grammar3, grammar4],
  },
  {
    slug: 'logic',
    title: 'Logic',
    eyebrow: 'Careful thinking made concrete',
    summary:
      'Students learn to slow down, find the claim, check the support, and draw only the conclusions the evidence allows.',
    paragraphs: [
      'Buddy Blocks teaches logic in plain language before formal symbols. Students sort statements, questions, commands, opinions, claims, reasons, evidence, examples, and conclusions.',
      'Practice asks students to decide whether a reason is relevant, whether a conclusion follows, and whether a cause or rule has enough support.',
      'Weak reasoning becomes something students can notice and improve: unrelated reasons, too little evidence, either-or traps, personal attacks, and claims that are too broad.',
    ],
    color: '#18bca4',
    accent: '#5b79ff',
    levelRange: 'Level 1',
    tracks: [logic1],
  },
  {
    slug: 'rhetoric',
    title: 'Rhetoric',
    eyebrow: 'Purposeful communication',
    summary:
      'Students learn how to communicate with purpose: who they are speaking to, what they want to say, and what kind of support will make the message stronger.',
    paragraphs: [
      'Buddy Blocks starts rhetoric with audience and purpose, then builds toward short, clear responses that inform, explain, describe, persuade, compare, and evaluate.',
      'Students practice story order, useful detail, precise examples, claim-reason-example support, fair comparison, and respectful feedback.',
      'Revision is treated as a real communication skill: improving order, word choice, detail, reasons, examples, conclusions, voice, and audience fit.',
    ],
    color: '#e63e80',
    accent: '#ffd84d',
    levelRange: 'Level 1',
    tracks: [rhetoric1],
  },
  {
    slug: 'classical-literature',
    title: 'Classical Literature',
    eyebrow: 'Stories, poems, and inherited wisdom',
    summary:
      'Students move through five levels of classical literature, from fables and myths to seminar-style reading across major inherited texts and ideas.',
    paragraphs: [
      'Buddy Blocks now carries Classical Literature from early story foundations through comparison, analysis, genre, context, and capstone interpretation.',
      'Students meet fables, folktales, myths, heroic journeys, poems, dialogue, drama, epic signals, tragedy, comedy, satire readiness, allusion, translation, public argument, and modern reflection.',
      'The emphasis is not trivia. Students learn to notice structure, moral meaning, character choices, poetic language, genre patterns, evidence, and respectful cultural context as texts become more demanding.',
    ],
    color: '#5b79ff',
    accent: '#18bca4',
    levelRange: 'Levels 1-5',
    tracks: [classicalLiterature1, classicalLiterature2, classicalLiterature3, classicalLiterature4, classicalLiterature5],
  },
  {
    slug: 'history-and-civics',
    title: 'History And Civics',
    eyebrow: 'Time, place, sources, and citizenship',
    summary:
      'Students learn how people, places, sources, communities, rules, responsibilities, and shared ideals fit into a meaningful civic and historical story.',
    paragraphs: [
      'Buddy Blocks begins with the tools students need for history: time words, timelines, maps, globes, directions, symbols, sources, artifacts, images, and evidence.',
      'Students connect those tools to community life, rules, leaders, rights, responsibilities, needs, wants, work, trade, culture, symbols, and documents.',
      'The goal is thoughtful inquiry. Students learn to answer simple history and civics questions with clues from maps, timelines, texts, objects, and images.',
    ],
    color: '#ff7f45',
    accent: '#18bca4',
    levelRange: 'Level 1',
    tracks: [historyAndCivics1],
  },
  {
    slug: 'memory-works',
    title: 'Memory Works',
    eyebrow: 'Recall, recitation, and confidence',
    summary:
      'Students learn how to memorize and recite well by using meaning, small parts, clues, checking, correction, review, and clear delivery.',
    paragraphs: [
      'Buddy Blocks treats memory as a learnable skill. Students practice looking, breaking a line into parts, covering it, saying it, checking it, fixing missed parts, and returning after a delay.',
      'Memory targets include sayings, poems, fact families, measure equivalences, grammar definitions, map knowledge, compass directions, and history pegs.',
      'Students move from seeing the words, to saying them with light clues, to saying them independently, with review that helps knowledge last beyond the day it was introduced.',
    ],
    color: '#ffd84d',
    accent: '#5b79ff',
    levelRange: 'Level 1',
    tracks: [memoryWorks1],
  },
];

const courseFamilies: CourseFamily[] = courseCatalog.map((course) => ({
  ...course,
  stats: statsForTracks(course.tracks),
  mockups: course.tracks.flatMap((track) => track.mockups).slice(0, 2),
}));

export function getCourseFamilies() {
  return courseFamilies;
}

export function getCourseFamily(slug: string) {
  return getCourseFamilies().find((family) => family.slug === slug);
}

export function getCourseLevels(family: CourseFamily): CourseLevel[] {
  return family.tracks.map((track) => ({
    track,
    label: track.label,
    stats: track.stats,
    unitTitles: track.unitTitles,
    paragraphs: track.paragraphs,
    mockups: track.mockups,
  }));
}

function statsForTracks(tracks: ResearchTrack[]): CourseStats {
  return tracks.reduce(
    (stats, track) => ({
      levels: stats.levels + 1,
      units: stats.units + track.stats.units,
      lessons: stats.lessons + track.stats.lessons,
      questions: stats.questions + track.stats.questions,
    }),
    { levels: 0, units: 0, lessons: 0, questions: 0 },
  );
}
