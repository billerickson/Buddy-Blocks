import { TRACKS, type QuestionFixture, type TrackFixture } from './curriculum';

type CourseCopy = {
  slug: string;
  subject: string;
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

export type CourseLevel = {
  track: TrackFixture;
  label: string;
  stats: CourseStats;
  unitTitles: string[];
  paragraphs: string[];
  mockups: QuestionMockup[];
};

export type CourseFamily = CourseCopy & {
  tracks: TrackFixture[];
  stats: CourseStats;
  levelRange: string;
  mockups: QuestionMockup[];
};

const courseOrder = [
  'math',
  'vocabulary',
  'spanish',
  'french',
  'latin',
  'grammar',
  'logic',
  'rhetoric',
  'literature',
  'history-civics',
  'memory-work',
];

const gradeBasedSubjects = new Set(['math', 'vocabulary']);

const courseCopy: Record<string, CourseCopy> = {
  math: {
    slug: 'math',
    subject: 'math',
    title: 'Math',
    eyebrow: 'Representations, fluency, and modeling',
    summary:
      'Students move from concrete models to flexible grade-level reasoning across operations, fractions, ratios, algebra, geometry, data, financial decisions, and cumulative modeling.',
    paragraphs: [
      'The V3 math research puts meaning before shortcuts. Students use arrays, equal groups, number lines, strip diagrams, ratio tables, double number lines, equations, graphs, and geometric models before a procedure is treated as independent fluency.',
      'The live course path spans Grade 1 through Grade 12 and keeps review active through mixed problem solving and fact practice. Students do not only calculate; they choose representations, read situations, check reasonableness, and explain why an answer fits.',
      'The sequence is designed to prevent common fragile understandings: multiplication is more than repeated counting, fractions are numbers with magnitude, ratios are multiplicative comparisons, and variables or formulas represent meaningful relationships.',
    ],
    learn: ['models before procedures', 'operations, fractions, ratios, algebra, geometry, and data', 'how to translate situations into equations or diagrams'],
    master: ['fact fluency with meaning', 'strategy choice and reasonableness checks', 'multi-step modeling across old and new skills'],
    complete: ['ordered grade paths', 'short scored lessons and mad-minute reviews', 'cumulative modeling and mastery challenges'],
    why: ['visual models reduce load before symbols', 'spaced fluency follows conceptual work', 'mixed review teaches students to choose the right tool'],
    color: '#5b79ff',
    accent: '#ffd84d',
  },
  vocabulary: {
    slug: 'vocabulary',
    subject: 'vocabulary',
    title: 'Vocabulary',
    eyebrow: 'Context, word parts, and academic language',
    summary:
      'Students build reusable word-solving habits through context clues, reference checks, morphology, word relationships, figurative language, argument words, research language, and revision vocabulary.',
    paragraphs: [
      'The V3 vocabulary research starts with evidence-based meaning making. Students learn to use context, definition, restatement, example, contrast, cause/effect, and reference clues before morphology becomes a shortcut.',
      'Word parts are taught as evidence to test against sentence meaning, not as a guessing game. Later levels add academic discussion terms, disciplinary vocabulary, connotation, media and source language, research words, and revision language.',
      'The result is a vocabulary course that supports reading and writing across subjects. Students practice flash-card retrieval, passage interpretation, matching, cloze, correction, and transfer tasks so words become tools, not one-day lists.',
    ],
    learn: ['context and reference routines', 'morphology with meaning checks', 'academic, source, argument, and revision words'],
    master: ['precise word choice', 'figurative and author-craft language', 'transfer to unfamiliar reading and writing'],
    complete: ['preview and flash-card loops', 'passage and sentence application', 'cumulative word-solving reviews'],
    why: ['students need clues before recall', 'word parts must be checked against context', 'academic words become useful across subjects'],
    color: '#e63e80',
    accent: '#18bca4',
  },
  spanish: {
    slug: 'spanish',
    subject: 'spanish',
    title: 'Spanish',
    eyebrow: 'Novice communication and culture',
    summary:
      'Students build Spanish through exposure-first practice: greetings, classroom survival language, numbers, descriptions, preferences, places, routines, past narration, culture, reading, listening, and short exchanges.',
    paragraphs: [
      'The Spanish research follows novice-language guidance: interpretive listening and reading come before unsupported production. Students first recognize useful words and chunks, then answer predictable questions and build short responses.',
      'Across the live levels, students move from greetings, classroom phrases, numbers, calendars, people, food, and places into present-tense patterns, connected conversations, culture comparisons, past narration, future plans, pronouns, and short paragraph work.',
      'Lessons alternate flash cards, matching, dialogue builders, cloze, passage questions, and typed recall. That rhythm lets students meet language in context before asking them to produce it from memory.',
    ],
    learn: ['high-use words and question patterns', 'short conversations and supported sentences', 'culture in everyday contexts'],
    master: ['interpretive clues before production', 'articles, agreement, verb chunks, and tense patterns', 'accurate recall after preview'],
    complete: ['preview and flash-card study loops', 'dialogue and cloze practice', 'reading, listening, culture, and review lessons'],
    why: ['novice learners need comprehensible input first', 'chunks make grammar meaningful', 'culture stays tied to real language use'],
    color: '#18bca4',
    accent: '#ffd84d',
  },
  french: {
    slug: 'french',
    subject: 'french',
    title: 'French',
    eyebrow: 'Novice communication and culture',
    summary:
      'Students build French through repeated contact with greetings, classroom language, numbers, questions, descriptions, preferences, places, routines, culture, reading, listening, and short presentations.',
    paragraphs: [
      'The French research uses the same exposure-before-production progression as the Spanish track. Students listen, read, and recognize useful forms before they type, choose, or build responses independently.',
      'The live sequence begins with real interaction, numbers, calendar, weather, self-introductions, family, likes, school, places, food, and routines, then grows into regular verbs, high-frequency irregulars, past and future contexts, pronouns, travel, regions, and short paragraph writing.',
      'Practice stays compact and varied: flash cards for retrieval, matching for form-meaning links, dialogue builders for interpersonal routines, and passage questions for reading language in context.',
    ],
    learn: ['core vocabulary and sound-spelling patterns', 'questions, routines, and short conversations', 'Francophone culture in practical contexts'],
    master: ['recognition before production', 'agreement, verb chunks, and connected sentences', 'reviewed long-term recall'],
    complete: ['preview and flash-card loops', 'dialogue, cloze, and passage practice', 'conversation, culture, and presentation tasks'],
    why: ['students need repeated input before recall', 'grammar is introduced as meaning support', 'culture is practiced through language tasks'],
    color: '#5b79ff',
    accent: '#ff7f45',
  },
  latin: {
    slug: 'latin',
    subject: 'latin',
    title: 'Latin',
    eyebrow: 'Roots, grammar, and classical reading',
    summary:
      'Students build Latin vocabulary, roots, forms, grammar clues, Roman culture, sentence order, morphology, and adapted classical reading through exposure-first practice.',
    paragraphs: [
      'The live Latin catalog is built from the promoted course files: students meet greetings, classroom words, noun gender, family descriptions, Roman places, verbs, roots in English, myths, culture, and short adapted passages before later morphology-heavy work.',
      'As the levels advance, students practice cases, verbs, infinitives, participles, relative clauses, subordinate clauses, subjunctive recognition, scansion, rhetorical figures, and adapted classical authors through meaning-first tasks.',
      'The course keeps Latin usable for young learners: match Latin to meaning, build sentence order, read short adapted passages, notice forms in context, and connect Latin roots to English vocabulary.',
    ],
    learn: ['Latin vocabulary, roots, and forms', 'sentence roles, cases, verbs, and morphology clues', 'Roman culture and adapted readings'],
    master: ['grammar-based reading habits', 'sentence order and form recognition', 'Latin-root connections to English'],
    complete: ['preview and flash-card loops', 'adapted passage and sentence-building work', 'culture, roots, and grammar review'],
    why: ['students read forms in context before analysis', 'sentence building makes grammar visible', 'roots support both Latin and English vocabulary'],
    color: '#ff7f45',
    accent: '#5b79ff',
  },
  grammar: {
    slug: 'grammar',
    subject: 'grammar',
    title: 'Grammar',
    eyebrow: 'Sentence structure, conventions, and editing',
    summary:
      'Students learn how sentences work, from complete thoughts and word jobs to clauses, punctuation, verb consistency, modifiers, voice, register, and clear revision.',
    paragraphs: [
      'The grammar research keeps instruction tied to real sentences and writing decisions. Students learn sentence completeness, subjects and predicates, parts of speech as jobs, punctuation as structure, and editing as a targeted choice.',
      'Later levels deepen nouns, pronouns, verb phrases, direct objects, compound parts, prepositional phrases, clauses, verbals, mood and voice, parallel structure, concise modifiers, register, and copyediting habits.',
      'Lessons use recognition and correction before production. Students identify, match, order, fix, and revise short sentences so grammar becomes a tool for clarity rather than a detached labeling exercise.',
    ],
    learn: ['sentence roles and word jobs', 'punctuation and usage patterns', 'diagramming, copyediting, and revision language'],
    master: ['accurate identification in context', 'focused sentence correction', 'clear revision for reader understanding'],
    complete: ['focused grammar units', 'application and error-correction questions', 'cumulative editing reviews'],
    why: ['grammar is learned best in meaningful sentences', 'narrow editing targets reduce guesswork', 'visual sentence structure supports transfer to writing'],
    color: '#ffd84d',
    accent: '#e63e80',
  },
  logic: {
    slug: 'logic',
    subject: 'logic',
    title: 'Logic',
    eyebrow: 'Careful thinking and argument structure',
    summary:
      'Students practice patterns, categories, analogies, claims, reasons, evidence, conclusions, conditionals, symbolic statements, truth tables, and argument structure.',
    paragraphs: [
      'The Logic research begins with ordinary careful-thinking routines: find the claim, find the reason, ask whether support is relevant, and draw only conclusions that follow from the given information.',
      'Students move from patterns, categories, similarities, analogies, sequencing, cause and effect, true/false/not-enough-information, and if-then thinking into claims, evidence, weak reasoning, terms, propositions, validity, soundness, and symbolic logic.',
      'The course avoids turning logic into label memorization. Students sort, match, order, evaluate, and explain so they can improve reasoning in reading, science, math, civics, discussion, and everyday choices.',
    ],
    learn: ['patterns, categories, rules, and analogies', 'claims, reasons, evidence, and conclusions', 'conditionals, propositions, validity, and symbolic statements'],
    master: ['relevance and support checks', 'supported conclusions without overclaiming', 'careful fixes for weak reasoning'],
    complete: ['logic drills and passage checks', 'argument and evidence tasks', 'cumulative reasoning transfer'],
    why: ['plain-language reasoning comes before formal labels', 'students need evidence habits before abstraction', 'mixed contexts show whether reasoning transfers'],
    color: '#18bca4',
    accent: '#5b79ff',
  },
  rhetoric: {
    slug: 'rhetoric',
    subject: 'rhetoric',
    title: 'Rhetoric',
    eyebrow: 'Audience, purpose, and persuasive communication',
    summary:
      'Students build communication moves from narration, summary, description, reasons, paragraphs, and short delivery into thesis, arrangement, refutation, debate, analysis, and researched argument.',
    paragraphs: [
      'The Rhetoric research starts with a simple but durable question: who is this for, and what is it trying to do? Students learn speaker, audience, purpose, message, and effect before longer writing tasks.',
      'Levels grow through narration, main idea, strong sentences, paragraph shape, description, claims, reasons, examples, comparison, revision, delivery, progymnasmata-style exercises, thesis, policy proposal, proof, refutation, and appeals.',
      'Lessons ask students to order ideas, choose stronger support, read short passages, build responses, and revise for audience. The goal is reusable communication judgment, not just longer writing.',
    ],
    learn: ['audience, purpose, narration, and summary', 'claims, reasons, examples, comparison, and revision', 'thesis, arrangement, proof, refutation, and delivery'],
    master: ['clear support for a specific audience', 'organized arguments and short speeches', 'revision that improves meaning and effect'],
    complete: ['short rhetorical tasks', 'speech and paragraph planning', 'argument, revision, and delivery reviews'],
    why: ['communication begins with audience and purpose', 'models give students a form to imitate', 'revision is taught as improving meaning, not just fixing errors'],
    color: '#e63e80',
    accent: '#ffd84d',
  },
  literature: {
    slug: 'literature',
    subject: 'literature',
    title: 'Classical Literature',
    eyebrow: 'Story, genre, evidence, and thoughtful response',
    summary:
      'Students read fables, myths, folktales, poems, legends, quests, allegory, adventure, satire, epic, tragedy, comedy, and classic excerpts with evidence-based response.',
    paragraphs: [
      'The literature research begins with story structure: retell events in order, name story elements, connect choices to consequences, and support a moral or theme with evidence from the text.',
      'Levels then widen into folktales, myths, heroes, quests, poetry, dialogue, legends, allegory, epic, tragedy, comedy, satire, translation awareness, allusion, symbolism, and seminar-style discussion.',
      'Students practice close reading without turning stories into trivia. Passage questions, ordering, matching, and short response prompts help them notice genre, character, image, theme, and form.',
    ],
    learn: ['story structure, genre, and literary terms', 'character, motive, consequence, theme, and image', 'classic forms from fable to epic and drama'],
    master: ['evidence-based comprehension', 'thoughtful moral and thematic response', 'comparison across stories and versions'],
    complete: ['reading and passage lessons', 'sequence and comprehension checks', 'discussion-ready response practice'],
    why: ['short texts build durable reading habits', 'evidence keeps interpretation grounded', 'genre knowledge prepares students for older classics'],
    color: '#5b79ff',
    accent: '#18bca4',
  },
  'history-civics': {
    slug: 'history-civics',
    subject: 'history-civics',
    title: 'History And Civics',
    eyebrow: 'Time, place, sources, and citizenship',
    summary:
      'Students build historical and civic reasoning through timelines, maps, source clues, economics, culture, ancient and world history, American founding, government, rights, and responsibilities.',
    paragraphs: [
      'The History And Civics research starts with the tools students need before big historical claims: time words, timelines, maps, globes, source types, evidence, community rules, rights, responsibilities, needs, wants, work, and trade.',
      'The live levels move through ancient peoples, Greece and Rome, medieval worlds, exploration and encounter, early America, communities and government, founding documents, American Revolution, reform, Civil War, Reconstruction, and broader world-history themes.',
      'Students learn to answer historical and civic questions with context. Passage, map, timeline, source, and classification tasks ask them to connect people, places, documents, and responsibilities with evidence.',
    ],
    learn: ['timeline, map, and source routines', 'history, economics, government, and civic vocabulary', 'founding documents, rights, responsibilities, and evidence claims'],
    master: ['chronology and context', 'source-based answers', 'civic participation and responsibility distinctions'],
    complete: ['history and civics units', 'map, timeline, and source questions', 'cumulative inquiry and civics reviews'],
    why: ['students need tools before sweeping claims', 'sources make history evidential', 'civics connects rights with responsibilities'],
    color: '#ff7f45',
    accent: '#18bca4',
  },
  'memory-work': {
    slug: 'memory-work',
    subject: 'memory-work',
    title: 'Memory Work',
    eyebrow: 'Retrieval, recitation, and durable recall',
    summary:
      'Students learn how to memorize well through poems, sayings, Latin maxims, grammar rules, math facts, measures, geography, history, speeches, civic excerpts, and cumulative recall.',
    paragraphs: [
      'The Memory Work research begins by teaching the routine itself: understand the target, chunk it, recall it, check it, repair the missed part, and return after a delay.',
      'Students start with short sayings, poems, rhythm, recitation, facts, forms, patterns, maps, timelines, and ordered knowledge, then grow into longer poems or speeches, civic documents, Latin passages, advanced terms, and performance practice.',
      'The course treats memorization as meaningful recall, not rereading. Students connect exact words to meaning, use cues that fade over time, and practice confident oral delivery.',
    ],
    learn: ['chunking, cover-recall-check, and error repair', 'poems, sayings, definitions, maps, timelines, and facts', 'recitation, oral delivery, and meaning paraphrase'],
    master: ['accurate recall with fading cues', 'spaced review habits', 'confident performance and mixed retrieval'],
    complete: ['memory sets and review questions', 'recitation and exact-word practice', 'cumulative recall challenges'],
    why: ['active retrieval is stronger than rereading', 'meaning helps exact words stick', 'spaced review protects long-term recall'],
    color: '#ffd84d',
    accent: '#5b79ff',
  },
};

type QuestionSelector = {
  trackSlug?: string;
  unitIncludes?: string;
  lessonIncludes?: string;
  type?: string;
  textIncludes?: string;
};

const familyExampleSelectors: Record<string, QuestionSelector[]> = {
  math: [
    {
      trackSlug: 'grade-3-math',
      unitIncludes: 'Multiplication As Equal Groups',
      type: 'passage-question',
      textIncludes: 'Garden Trays',
    },
    { trackSlug: 'grade-6-math', unitIncludes: 'Ratios And Rates', lessonIncludes: 'Unit Rates', type: 'match-pairs' },
    { trackSlug: 'grade-6-math', unitIncludes: 'Expressions And Equations', type: 'text-input', textIncludes: 'Evaluate' },
  ],
  vocabulary: [
    { trackSlug: 'grade-3-vocabulary', unitIncludes: 'Word-Learning Routine', type: 'passage-question' },
    { trackSlug: 'grade-6-vocabulary', unitIncludes: 'Argument And Media', type: 'match-pairs', textIncludes: 'counterclaim' },
    { trackSlug: 'grade-6-vocabulary', unitIncludes: 'Writing And Revision', type: 'error-correction', textIncludes: 'run-on' },
  ],
  spanish: [
    { trackSlug: 'grade-3-spanish', unitIncludes: 'Classroom Words', type: 'dialogue-builder', textIncludes: 'polite request' },
    { trackSlug: 'grade-3-spanish', unitIncludes: 'People And Family', type: 'multi-blank-cloze' },
    { trackSlug: 'grade-4-spanish', unitIncludes: 'Questions', type: 'passage-question' },
  ],
  french: [
    { trackSlug: 'grade-3-french', unitIncludes: 'Greetings', type: 'passage-question', textIncludes: 'goodbye' },
    { trackSlug: 'grade-3-french', unitIncludes: 'Introducing Myself', type: 'dialogue-builder' },
    { trackSlug: 'grade-4-french', unitIncludes: 'Questions', type: 'passage-question' },
  ],
  latin: [
    { trackSlug: 'grade-3-latin', unitIncludes: 'Nouns', type: 'order-items', textIncludes: 'puella parva est' },
    { trackSlug: 'grade-3-latin', unitIncludes: 'Latin Roots', type: 'match-pairs' },
    { trackSlug: 'grade-6-latin', unitIncludes: 'Adapted Classical Authors', type: 'passage-question', textIncludes: 'videte' },
  ],
  grammar: [
    { trackSlug: 'grade-3-grammar', unitIncludes: 'Subjects And Predicates', type: 'passage-question', textIncludes: 'complete predicate' },
    { trackSlug: 'grade-3-grammar', unitIncludes: 'Capitalization', type: 'error-correction' },
    { trackSlug: 'grade-6-grammar', unitIncludes: 'Parallel Structure', type: 'match-pairs' },
  ],
  logic: [
    { trackSlug: 'grade-3-logic', unitIncludes: 'True, False', type: 'passage-question' },
    { trackSlug: 'grade-3-logic', unitIncludes: 'Claims And Reasons', type: 'match-pairs' },
    { trackSlug: 'grade-6-logic', unitIncludes: 'Conditionals', type: 'match-pairs' },
  ],
  rhetoric: [
    { trackSlug: 'grade-3-rhetoric', unitIncludes: 'Paragraph Shape', type: 'passage-question', textIncludes: 'topic sentence' },
    { trackSlug: 'grade-3-rhetoric', unitIncludes: 'Narration', type: 'order-items' },
    { trackSlug: 'grade-6-rhetoric', unitIncludes: 'Thesis', type: 'passage-question', textIncludes: 'logos' },
  ],
  literature: [
    { trackSlug: 'grade-3-literature', unitIncludes: 'Fables', type: 'passage-question', textIncludes: 'Proud Crow' },
    { trackSlug: 'grade-3-literature', unitIncludes: 'Poetry', type: 'order-items' },
    { trackSlug: 'grade-6-literature', unitIncludes: 'Satire', type: 'passage-question' },
  ],
  'history-civics': [
    { trackSlug: 'grade-3-history-civics', unitIncludes: 'Timelines And Maps', type: 'passage-question', textIncludes: 'west of the library' },
    { trackSlug: 'grade-3-history-civics', unitIncludes: 'Ancient Peoples', type: 'passage-question', textIncludes: 'trade' },
    { trackSlug: 'grade-6-history-civics', unitIncludes: 'American Revolution', type: 'passage-question' },
  ],
  'memory-work': [
    { trackSlug: 'grade-3-memory-work', unitIncludes: 'Latin Sayings', type: 'order-items', textIncludes: 'Carpe' },
    { trackSlug: 'grade-3-memory-work', unitIncludes: 'Math Facts', type: 'text-input', textIncludes: '7 x 8' },
    { trackSlug: 'grade-6-memory-work', unitIncludes: 'Civic Document', type: 'passage-question' },
  ],
};

export function getCourseFamilies() {
  return courseOrder.map((subject) => buildCourseFamily(courseCopy[subject])).filter(Boolean) as CourseFamily[];
}

export function getCourseFamily(slug: string) {
  return getCourseFamilies().find((family) => family.slug === slug);
}

export function getCourseLevels(family: CourseFamily): CourseLevel[] {
  return family.tracks.map((track) => {
    const stats = statsForTracks([track]);
    const unitTitles = track.units.map((unit) => unit.title);
    return {
      track,
      label: levelLabel(track),
      stats,
      unitTitles,
      paragraphs: levelParagraphs(family, track, stats, unitTitles),
      mockups: sampleQuestionMockups(track, 2),
    };
  });
}

export function getTrackStats(track: TrackFixture) {
  return statsForTracks([track]);
}

function buildCourseFamily(copy: CourseCopy): CourseFamily | null {
  const tracks = TRACKS.filter((track) => track.subject === copy.subject).sort((a, b) => a.gradeLevel - b.gradeLevel);
  if (tracks.length === 0) return null;

  return {
    ...copy,
    tracks,
    stats: statsForTracks(tracks),
    levelRange: levelRange(copy.subject, tracks),
    mockups: sampleFamilyMockups(copy.subject, tracks, 3),
  };
}

function statsForTracks(tracks: TrackFixture[]): CourseStats {
  return tracks.reduce(
    (stats, track) => {
      stats.levels += 1;
      stats.units += track.units.length;
      stats.lessons += track.units.reduce((total, unit) => total + unit.lessons.length, 0);
      stats.questions += track.units.reduce(
        (total, unit) => total + unit.lessons.reduce((lessonTotal, lesson) => lessonTotal + lesson.questions.length, 0),
        0,
      );
      return stats;
    },
    { levels: 0, units: 0, lessons: 0, questions: 0 },
  );
}

function levelRange(subject: string, tracks: TrackFixture[]) {
  if (gradeBasedSubjects.has(subject)) {
    const grades = tracks.map((track) => track.gradeLevel);
    const min = Math.min(...grades);
    const max = Math.max(...grades);
    if (min === max) return `Grade ${min}`;
    return `Grades ${min}-${max}`;
  }

  const levels = tracks.map(foundationLevelNumber);
  const min = Math.min(...levels);
  const max = Math.max(...levels);
  if (min === max) return `Level ${min}`;
  return `Levels ${min}-${max}`;
}

function levelLabel(track: TrackFixture) {
  if (gradeBasedSubjects.has(track.subject)) return `Grade ${track.gradeLevel}`;
  return `${track.title} - Level ${foundationLevelNumber(track)}`;
}

function levelParagraphs(family: CourseFamily, track: TrackFixture, stats: CourseStats, unitTitles: string[]) {
  const sampleUnits = toSentenceList(unitTitles.slice(0, 4));
  const laterUnits = unitTitles.length > 4 ? ` Later work includes ${toSentenceList(unitTitles.slice(4, 7))}.` : '';
  const learnedSkills = toSentenceList(family.learn);
  const masteredSkills = toSentenceList(family.master);
  const completedWork = toSentenceList(family.complete);
  return [
    `${track.title} is ${levelPositionLabel(track)} in the ${family.title} track. ${track.description}`,
    `Students move through ${sampleUnits}.${laterUnits} The sequence follows the V3 research pattern for this course: ${family.why[0]}.`,
    `By completion, this level includes ${stats.units} units, ${stats.lessons} lessons, and ${stats.questions} questions. Students learn ${learnedSkills} and build toward ${masteredSkills}. Their work includes ${completedWork}. That repetition matters because ${family.why[1]}.`,
  ];
}

function foundationLevelNumber(track: TrackFixture) {
  return Math.max(1, track.gradeLevel - 2);
}

function levelPositionLabel(track: TrackFixture) {
  if (gradeBasedSubjects.has(track.subject)) return `the Grade ${track.gradeLevel} level`;
  return `Level ${foundationLevelNumber(track)}`;
}

function sampleFamilyMockups(subject: string, tracks: TrackFixture[], limit: number) {
  const candidates = [tracks[0], tracks[Math.floor(tracks.length / 2)], tracks[tracks.length - 1]].filter(Boolean);
  const mockups: QuestionMockup[] = [];
  const seenMockups = new Set<string>();

  for (const selector of familyExampleSelectors[subject] ?? []) {
    const question = findQuestionBySelector(tracks, selector);
    if (!question) continue;
    const mockup = toQuestionMockup(question);
    const key = mockupKey(mockup);
    if (seenMockups.has(key)) continue;
    mockups.push(mockup);
    seenMockups.add(key);
    if (mockups.length >= limit) return mockups;
  }

  for (const track of candidates) {
    for (const mockup of sampleQuestionMockups(track, 2)) {
      const key = mockupKey(mockup);
      if (seenMockups.has(key)) continue;
      mockups.push(mockup);
      seenMockups.add(key);
      if (mockups.length >= limit) return mockups;
    }
  }

  return mockups;
}

function sampleQuestionMockups(track: TrackFixture, limit: number) {
  const allQuestions = track.units.flatMap((unit) => unit.lessons.flatMap((lesson) => lesson.questions));
  const questions = allQuestions.filter(isStrongPublicExample);
  const preferredTypes = [
    'passage-question',
    'multi-blank-cloze',
    'dialogue-builder',
    'match-pairs',
    'order-items',
    'listening-question',
    'error-correction',
    'conjugation-grid',
    'text-input',
    'fill-blank',
    'multiple-choice',
    'flash-card',
  ];
  const selected: QuestionFixture[] = [];
  const usedTypes = new Set<string>();

  for (const type of preferredTypes) {
    const match = questions.find((question) => question.type === type && !usedTypes.has(question.type));
    if (!match) continue;
    selected.push(match);
    usedTypes.add(match.type);
    if (selected.length >= limit) break;
  }

  if (selected.length < limit) {
    for (const question of allQuestions) {
      if (selected.includes(question)) continue;
      selected.push(question);
      if (selected.length >= limit) break;
    }
  }

  return selected.map(toQuestionMockup);
}

function findQuestionBySelector(tracks: TrackFixture[], selector: QuestionSelector) {
  const trackPool = selector.trackSlug ? tracks.filter((track) => track.slug === selector.trackSlug) : tracks;

  for (const track of trackPool) {
    for (const unit of track.units) {
      if (selector.unitIncludes && !includesFolded(unit.title, selector.unitIncludes)) continue;
      for (const lesson of unit.lessons) {
        if (selector.lessonIncludes && !includesFolded(lesson.title, selector.lessonIncludes)) continue;
        for (const question of lesson.questions) {
          if (selector.type && question.type !== selector.type) continue;
          if (selector.textIncludes && !includesFolded(questionSearchText(question), selector.textIncludes)) continue;
          if (!isStrongPublicExample(question)) continue;
          return question;
        }
      }
    }
  }

  return null;
}

function isStrongPublicExample(question: QuestionFixture) {
  if (question.type === 'constructed-response' || question.type === 'speaking-prompt') return false;

  const prompt = question.prompt.toLowerCase();
  if (prompt.includes('which choice best fits')) return false;
  if (prompt.includes('which answer shows more advanced independent work')) return false;
  if (prompt.includes('study this word and meaning')) return false;

  return true;
}

function questionSearchText(question: QuestionFixture) {
  return `${question.prompt} ${JSON.stringify(question.payload)}`;
}

function includesFolded(value: string, search: string) {
  return value.toLowerCase().includes(search.toLowerCase());
}

function mockupKey(mockup: QuestionMockup) {
  return `${mockup.type}:${mockup.prompt}:${mockup.detail ?? ''}:${mockup.passage ?? ''}`;
}

function toQuestionMockup(question: QuestionFixture): QuestionMockup {
  const payload = question.payload as Record<string, any>;
  const base = {
    type: question.type,
    label: questionLabel(question.type),
    prompt: question.prompt,
    feedback: question.explanation ?? 'Immediate feedback helps students connect the answer to the skill.',
  };

  if (question.type === 'multiple-choice' || question.type === 'fill-blank' || question.type === 'passage-question') {
    return {
      ...base,
      detail: payload.question ?? undefined,
      passage: payload.passage ?? undefined,
      choices: payload.choices ?? [],
      correctAnswer: payload.correctAnswer,
    };
  }

  if (question.type === 'text-input' || question.type === 'error-correction') {
    return {
      ...base,
      detail: payload.sentence,
      inputAnswer: payload.acceptedAnswers?.[0] ?? '',
    };
  }

  if (question.type === 'match-pairs') {
    return { ...base, pairs: payload.pairs ?? [] };
  }

  if (question.type === 'order-items') {
    return { ...base, order: payload.correctOrder ?? payload.items ?? [] };
  }

  if (question.type === 'multi-blank-cloze') {
    return {
      ...base,
      cloze: (payload.blanks ?? []).map((blank: any, index: number) => ({
        label: blank.label ?? `Blank ${index + 1}`,
        answer: blank.correctAnswer ?? blank.acceptedAnswers?.[0] ?? '',
      })),
    };
  }

  if (question.type === 'constructed-response' || question.type === 'speaking-prompt') {
    return {
      ...base,
      detail: payload.sampleAnswer ?? 'Students answer with a complete thought and check their work against the prompt.',
    };
  }

  if (question.type === 'dialogue-builder' || question.type === 'listening-question') {
    return {
      ...base,
      detail: payload.transcript,
      choices: payload.choices ?? [],
      correctAnswer: payload.correctAnswer,
    };
  }

  if (question.type === 'conjugation-grid') {
    return {
      ...base,
      rows: (payload.rows ?? []).slice(0, 3).map((row: any) => ({
        label: row.label,
        answers: (row.answers ?? []).map((answer: string | string[]) => (Array.isArray(answer) ? answer[0] : answer)),
      })),
    };
  }

  if (question.type === 'flash-card') {
    return {
      ...base,
      detail: payload.front,
      choices: payload.choices,
      correctAnswer: payload.correctAnswer ?? payload.acceptedAnswers?.[0],
      inputAnswer: payload.acceptedAnswers?.[0],
    };
  }

  return base;
}

function questionLabel(type: string) {
  return type
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function toSentenceList(items: string[]) {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}
