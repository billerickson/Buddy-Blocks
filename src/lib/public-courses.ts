type CourseCopy = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  paragraphs: string[];
  learn: string[];
  master: string[];
  complete: string[];
  why: string[];
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
    'The accepted Grade 3 Math research moves from prerequisite number readiness into multiplication and division meaning, strategy-based fluency, whole-number operations, fractions as numbers, measurement and data, area, perimeter, geometry, and cumulative transfer.',
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
    'The research emphasizes representation choice, reasonableness checks, and misconception repair across word problems, measurement, graphing, area, perimeter, geometry, and cumulative modeling.',
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
    'The accepted Grade 6 Math research orders number readiness, ratios, rates, fraction and decimal operations, rational numbers, algebra, geometry, statistics, and financial/application modeling into a compact middle-school path.',
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
    'The accepted Grade 3 Vocabulary research treats vocabulary as a word-learning and academic-language course, not a spelling list or broad ELA replacement.',
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
    'The accepted Grade 6 Vocabulary research builds a middle-school word-learning course around context, morphology, academic words, disciplinary language, word choice, figurative language, argument, media, research, and revision.',
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
    'The accepted Spanish 1 research is organized around novice communication functions instead of a grammar survey.',
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
    'The accepted French 1 research moves from immediate classroom interaction into personal identity, family, descriptions, preferences, school, places, food, choices, and cumulative novice communication.',
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
    'The accepted Grammar 1 research moves from sentence awareness into word jobs, word forms, mechanics, sentence expansion, and cumulative revision.',
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

const logic1: ResearchTrack = {
  slug: 'logic-1',
  title: 'Logic 1',
  label: 'Level 1',
  researchPath: 'research/logic-1',
  description:
    'The accepted Logic 1 research builds careful-thinking habits before formal symbolic logic.',
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
    'The accepted Rhetoric 1 research moves from noticing purpose in communication to producing short, clear, supported responses.',
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
    'The course builds narration, fable retelling, useful detail, claim-reason-example support, comparison by criteria, fair evaluation, revision, and short delivery.',
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
    'The accepted Classical Literature 1 research builds a compact shared story foundation through fables, folktales, myths, heroic journeys, poetry, dialogue, comparison, and transfer.',
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

const historyAndCivics1: ResearchTrack = {
  slug: 'history-and-civics-1',
  title: 'History And Civics 1',
  label: 'Level 1',
  researchPath: 'research/history-and-civics-1',
  description:
    'The accepted History And Civics 1 research begins with the tools students need before large historical claims: time, place, source, evidence, community, economics, culture, symbols, and civic responsibility.',
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
    'The accepted Memory Works 1 research teaches the memory routine directly, then applies it to sayings, poems, facts, forms, maps, timelines, and mixed review.',
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
    'Students distinguish study, recognition, cued recall, and independent recall, then practice look/listen, chunk, cover, recall, check, correct, and space.',
    'The course uses meaningful targets: sayings, short poems, fact families, measure equivalences, grammar definitions, maps, compass directions, and history pegs.',
    'The research treats memory as active retrieval with fading cues and delayed review, not rereading or same-day recognition.',
  ],
  mockups: [
    {
      type: 'multiple-choice',
      label: 'Multiple Choice',
      prompt: 'Which task asks you to use recall?',
      choices: [
        'Look at the saying again.',
        'Choose the saying from four choices.',
        'Say the saying without looking at it.',
        'Underline the first word of the saying.',
      ],
      correctAnswer: 'Say the saying without looking at it.',
      feedback: 'Recall means you pull the words from memory instead of looking at the model.',
    },
    {
      type: 'match-pairs',
      label: 'Match Pairs',
      prompt: 'Match each memory word to its meaning.',
      pairs: [
        { left: 'study', right: 'look at or listen to the model' },
        { left: 'recognition', right: 'choose what looks familiar' },
        { left: 'independent recall', right: 'remember without the model' },
      ],
      feedback: 'Each step gives a different amount of support.',
    },
  ],
};

const courseCatalog: CourseCopy[] = [
  {
    slug: 'math',
    title: 'Math',
    eyebrow: 'Research-ready grades 3 and 6',
    summary:
      'Students build mathematical meaning through models, representations, reasonableness checks, fluency, and cumulative problem solving in the Grade 3 and Grade 6 V3 research tracks.',
    paragraphs: [
      'Only the Grade 3 and Grade 6 math research folders are included here because those are the math tracks with accepted blueprints, course maps, lesson briefs, and question sets.',
      'Grade 3 establishes multiplication, division, fractions, measurement, data, area, perimeter, and geometry with concrete and visual models. Grade 6 extends that representational habit into ratios, rates, fraction division, rational numbers, algebra, geometry, statistics, and applied modeling.',
      'Across both grades, the research asks students to choose diagrams, equations, tables, number lines, and explanations that match the situation, then check whether the answer makes sense.',
    ],
    learn: ['Grade 3 operations, fractions, measurement, area, perimeter, and geometry', 'Grade 6 ratios, rates, rational numbers, algebra, geometry, and statistics', 'how to connect stories, diagrams, equations, units, and reasonableness checks'],
    master: ['meaning-based fluency', 'representation choice', 'transfer to unfamiliar word problems and modeling tasks'],
    complete: ['2 research-ready grade tracks', '21 units', '130 lesson briefs', '780 research question prompts'],
    why: ['models protect meaning before procedures', 'spaced mixed retrieval builds durable fluency', 'misconception-based distractors reveal the structure students are using'],
    color: '#5b79ff',
    accent: '#ffd84d',
    levelRange: 'Grades 3 and 6',
    tracks: [grade3Math, grade6Math],
  },
  {
    slug: 'vocabulary',
    title: 'Vocabulary',
    eyebrow: 'Research-ready grades 3 and 6',
    summary:
      'Students learn transferable word-solving routines through context, morphology, reference tools, semantic precision, figurative language, academic vocabulary, source language, argument terms, and revision language.',
    paragraphs: [
      'Only Grade 3 and Grade 6 Vocabulary are included because those are the vocabulary research folders with accepted course maps, lesson briefs, and question sets.',
      'Grade 3 builds the flexible routine: pause, reread, find clues, try a meaning, check the fit, and verify with a reference when needed. Grade 6 deepens that routine with Greek and Latin roots, connotation, disciplinary terms, argument, media, research, discussion, and revision vocabulary.',
      'The research rejects definition-only practice. Students must use clues, word parts, context, reference entries, and precision tests in new reading and writing situations.',
    ],
    learn: ['context and reference routines', 'morphology and word families', 'academic, disciplinary, argument, media, research, and revision language'],
    master: ['meaning fit in new contexts', 'precise word choice', 'strategy selection rather than one-trick guessing'],
    complete: ['2 research-ready grade tracks', '16 units', '68 lesson briefs', '408 research question prompts'],
    why: ['unknown words require evidence, not guesses', 'word parts must be tested against context', 'academic vocabulary becomes useful when students apply it across subjects'],
    color: '#e63e80',
    accent: '#18bca4',
    levelRange: 'Grades 3 and 6',
    tracks: [grade3Vocabulary, grade6Vocabulary],
  },
  {
    slug: 'spanish',
    title: 'Spanish',
    eyebrow: 'Research-ready Level 1',
    summary:
      'Students start Spanish through novice communication: greetings, classroom language, numbers, calendar, weather, classroom objects, identity, family, likes, school, food, places, routines, and a controlled novice capstone.',
    paragraphs: [
      'Spanish currently includes only Level 1 because the Level 2 through Level 5 research folders do not yet have accepted question sets.',
      'The Level 1 research is organized by what students can do with Spanish, not by a grammar checklist. Students hear, read, recognize, match, and choose language before they produce short answers.',
      'Grammar and culture support communication: articles, gender, agreement, ser, estar, tener, hay, gustar-like chunks, ir, querer, sound-spelling patterns, cognates, names, places, foods, school practices, and everyday routines.',
    ],
    learn: ['novice social and classroom exchanges', 'personal, school, family, food, place, and routine language', 'sound-spelling, cognate, article, agreement, and question-word clues'],
    master: ['interpretive input before production', 'short familiar questions and answers', 'respectful culture comparisons tied to language tasks'],
    complete: ['1 research-ready level', '6 units', '30 lesson briefs', '180 research question prompts'],
    why: ['novice learners need comprehensible input first', 'short chunks make grammar meaningful', 'cumulative retrieval prevents one-unit cramming'],
    color: '#18bca4',
    accent: '#ffd84d',
    levelRange: 'Level 1',
    tracks: [spanish1],
  },
  {
    slug: 'french',
    title: 'French',
    eyebrow: 'Research-ready Level 1',
    summary:
      'Students start French through novice communication: greetings, politeness, classroom survival phrases, numbers, calendar, weather, colors, identity, family, likes, school, places, food, choices, and routines.',
    paragraphs: [
      'French currently includes only Level 1 because the Level 2 through Level 5 research folders do not yet have accepted question sets.',
      'The Level 1 research starts with real interaction and keeps interpretive listening and reading ahead of production. Students answer and build short exchanges after they have seen the useful language in context.',
      'Pronunciation, grammar, and culture appear as supports for meaning: final silent consonants, nasal vowels, accents, c-cedilla, articles, agreement, il y a, etre, avoir, ne...pas, question words, Francophone places, and respectful comparison.',
    ],
    learn: ['novice greetings, classroom language, questions, and short exchanges', 'numbers, calendar, weather, family, likes, school, places, food, and routines', 'French sound-spelling, articles, agreement, and high-frequency verb chunks'],
    master: ['recognition before production', 'short familiar conversation patterns', 'culture comparisons without stereotyping'],
    complete: ['1 research-ready level', '7 units', '28 lesson briefs', '168 research question prompts'],
    why: ['students need repeated input before recall', 'grammar is introduced when it clarifies meaning', 'feedback names the clue students should use next time'],
    color: '#5b79ff',
    accent: '#ff7f45',
    levelRange: 'Level 1',
    tracks: [french1],
  },
  {
    slug: 'grammar',
    title: 'Grammar',
    eyebrow: 'Research-ready Level 1',
    summary:
      'Students learn grammar as sentence meaning and writing control: complete thoughts, subjects, predicates, word jobs, punctuation, capitalization, word forms, sentence expansion, and focused editing.',
    paragraphs: [
      'Grammar currently includes only Level 1 because the Level 2 through Level 4 research folders do not yet have accepted question sets.',
      'The Level 1 research starts with complete thoughts and sentence cores before asking students to label or fix conventions. Parts of speech are taught as jobs words do in sentences.',
      'Students practice one clear editing target at a time, then transfer grammar into sentence combining, expansion, revision, and cumulative writing-focused editing.',
    ],
    learn: ['complete sentences, subjects, predicates, and parts of speech as jobs', 'punctuation, capitalization, plurals, possession, pronouns, verbs, adjectives, and adverbs', 'sentence expansion, combining, and focused editing'],
    master: ['grammar choices in meaningful sentences', 'targeted correction without losing meaning', 'clearer writing through revision'],
    complete: ['1 research-ready level', '7 units', '26 lesson briefs', '156 research question prompts'],
    why: ['sentence meaning comes before labels', 'focused editing lowers cognitive load', 'grammar transfers when students use it to improve writing'],
    color: '#ffd84d',
    accent: '#e63e80',
    levelRange: 'Level 1',
    tracks: [grammar1],
  },
  {
    slug: 'logic',
    title: 'Logic',
    eyebrow: 'Research-ready Level 1',
    summary:
      'Students build careful-thinking habits through sentence jobs, claims, reasons, evidence, relevance, conclusions, rules, causes, categories, weak reasoning, and cross-subject transfer.',
    paragraphs: [
      'Logic currently includes only Level 1 because the Level 2 through Level 4 research folders do not yet have accepted question sets.',
      'The Level 1 research stays in familiar language before formal logic. Students learn to identify claims, reasons, examples, evidence, conclusions, and support in short everyday and academic contexts.',
      'Rather than memorizing labels, students judge whether reasons are relevant, whether conclusions follow, and how a weak reasoning move can be repaired.',
    ],
    learn: ['statements, questions, commands, claims, reasons, evidence, and conclusions', 'relevance, if-then language, causes, categories, all/some/none, and supported conclusions', 'common weak reasoning patterns in student-friendly language'],
    master: ['checking support before accepting a claim', 'drawing only what follows from the clues', 'repairing weak reasoning with better evidence or narrower claims'],
    complete: ['1 research-ready level', '6 units', '30 lesson briefs', '180 research question prompts'],
    why: ['plain-language reasoning should come before formal symbols', 'relevance is the first accessible quality check', 'transfer across subjects shows whether the habit is real'],
    color: '#18bca4',
    accent: '#5b79ff',
    levelRange: 'Level 1',
    tracks: [logic1],
  },
  {
    slug: 'rhetoric',
    title: 'Rhetoric',
    eyebrow: 'Research-ready Level 1',
    summary:
      'Students learn rhetoric as purposeful communication: audience, speaker, purpose, message, narration, description, claims, reasons, examples, comparison, fair evaluation, revision, and short delivery.',
    paragraphs: [
      'Rhetoric currently includes only Level 1 because the Level 2 through Level 5 research folders do not yet have accepted question sets.',
      'The Level 1 research starts with who the message is for and what it is trying to do. Students then practice story order, useful details, claim-reason-example support, and comparison by criteria.',
      'Revision and oral delivery stay short and purposeful: improve word choice, order, detail, reason, example, conclusion, voice, and audience fit.',
    ],
    learn: ['speaker, audience, purpose, message, and effect', 'narration, fable retelling, description, amplification, claims, reasons, examples, and comparison', 'revision and short oral delivery for a real audience'],
    master: ['supporting a point with relevant reasons and examples', 'evaluating fairly by a criterion', 'choosing a rhetorical move that fits the task'],
    complete: ['1 research-ready level', '7 units', '30 lesson briefs', '180 research question prompts'],
    why: ['communication begins with audience and purpose', 'models make short rhetorical moves imitable', 'revision is taught as improving meaning and effect'],
    color: '#e63e80',
    accent: '#ffd84d',
    levelRange: 'Level 1',
    tracks: [rhetoric1],
  },
  {
    slug: 'classical-literature',
    title: 'Classical Literature',
    eyebrow: 'Research-ready Level 1',
    summary:
      'Students build a story foundation through fables, folktales, myths, heroic journeys, poetry, dialogue, drama excerpts, comparison, and evidence-based response.',
    paragraphs: [
      'Classical Literature currently includes only Level 1 because the Level 2 through Level 5 research folders do not yet have accepted question sets.',
      'The Level 1 research starts with retelling and story elements, then broadens into genre, pattern, character choice, consequence, moral, mythic meaning, poetry, narrator, dialogue, and comparison.',
      'The course is not a trivia survey of classical names. Students use inherited stories respectfully and support interpretations with events, details, language, and genre clues.',
    ],
    learn: ['retelling, character, setting, problem, action, outcome, moral, and evidence', 'fable, folktale, myth, hero journey, poem, dialogue, and drama excerpt patterns', 'poetic sound, image, speaker, comparison, and respectful cultural framing'],
    master: ['evidence-based story comprehension', 'genre and pattern recognition', 'comparison using one clear criterion'],
    complete: ['1 research-ready level', '6 units', '24 lesson briefs', '144 research question prompts'],
    why: ['short texts build durable reading habits', 'evidence keeps interpretation grounded', 'genre knowledge prepares students for older classical works'],
    color: '#5b79ff',
    accent: '#18bca4',
    levelRange: 'Level 1',
    tracks: [classicalLiterature1],
  },
  {
    slug: 'history-and-civics',
    title: 'History And Civics',
    eyebrow: 'Research-ready Level 1',
    summary:
      'Students learn the tools of history and civic reasoning: time, timelines, maps, globes, sources, evidence, community rules, rights, responsibilities, economics, culture, symbols, and inquiry.',
    paragraphs: [
      'History And Civics currently includes only Level 1 because the Level 2 through Level 5 research folders do not yet have accepted question sets.',
      'The Level 1 research teaches students to think with time and place, then use sources, maps, timelines, artifacts, images, and short texts as evidence.',
      'Civics and economics are woven into concrete community contexts: needs, wants, goods, services, producers, consumers, rules, leaders, rights, responsibilities, symbols, documents, and shared ideals.',
    ],
    learn: ['time language, timelines, maps, globes, directions, symbols, and place relationships', 'primary and secondary sources, artifacts, photographs, maps, and evidence claims', 'community rules, leaders, rights, responsibilities, needs, wants, goods, services, and trade'],
    master: ['source-based answers', 'chronology and spatial reasoning', 'simple claims supported by one piece of evidence'],
    complete: ['1 research-ready level', '8 units', '24 lesson briefs', '144 research question prompts'],
    why: ['students need tools before sweeping historical claims', 'sources make history evidential', 'civics connects rights with responsibilities'],
    color: '#ff7f45',
    accent: '#18bca4',
    levelRange: 'Level 1',
    tracks: [historyAndCivics1],
  },
  {
    slug: 'memory-works',
    title: 'Memory Works',
    eyebrow: 'Research-ready Level 1',
    summary:
      'Students learn how memory works through active retrieval, chunking, cues, spacing, exact wording, meaning, poems, facts, maps, timelines, and confident recitation.',
    paragraphs: [
      'Memory Works currently includes only Level 1 because the Level 2 through Level 4 research folders do not yet have accepted question sets.',
      'The Level 1 research explicitly teaches the practice routine before applying it to sayings, poems, fact families, measure equivalences, grammar definitions, geography categories, compass directions, and history pegs.',
      'Students move from recognition and cued recall toward independent recall with fading cues, delayed review, error repair, meaning checks, and low-stakes cumulative performance.',
    ],
    learn: ['study, recognition, cued recall, independent recall, retrieval, spacing, chunking, and cues', 'sayings, poems, facts, forms, maps, compass directions, and timeline pegs', 'meaning checks and clear recitation'],
    master: ['active recall instead of rereading', 'fading cues toward independent memory', 'repairing missed chunks after delayed review'],
    complete: ['1 research-ready level', '6 units', '22 lesson briefs', '132 research question prompts'],
    why: ['retrieval strengthens memory better than rereading', 'meaning and chunks make exact recall less fragile', 'spaced review protects long-term retention'],
    color: '#ffd84d',
    accent: '#5b79ff',
    levelRange: 'Level 1',
    tracks: [memoryWorks1],
  },
];

const courseFamilies: CourseFamily[] = courseCatalog.map((course) => ({
  ...course,
  stats: statsForTracks(course.tracks),
  mockups: course.tracks.flatMap((track) => track.mockups).slice(0, 3),
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
