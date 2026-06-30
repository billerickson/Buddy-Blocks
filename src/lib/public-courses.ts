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

const courseCopy: Record<string, CourseCopy> = {
  math: {
    slug: 'math',
    subject: 'math',
    title: 'Math',
    eyebrow: 'Numeracy, reasoning, and problem solving',
    summary:
      'Students build number sense, computation, modeling, geometry, data, financial literacy, algebra readiness, and multi-step reasoning through compact lessons.',
    paragraphs: [
      'The Math track is built as a steady climb from concrete models to fluent, flexible problem solving. Students see ideas with blocks, tables, number lines, diagrams, and story contexts before they are asked to work independently.',
      'Each level mixes computation, vocabulary, modeling, and applied problems so math does not become a bag of isolated tricks. Lessons ask students to choose operations, explain patterns, order steps, type answers, and return to older material in cumulative review.',
      'By the end of a level, students have completed a full grade path with unit reviews and capstone-style practice. The goal is not just speed; it is durable confidence with the representations and language behind the procedures.',
    ],
    learn: ['models and math vocabulary', 'grade-level procedures', 'how to read and represent story problems'],
    master: ['fact fluency and accuracy', 'multi-step reasoning', 'checking work with models and estimates'],
    complete: ['ordered units', '8-12 question lessons', 'cumulative review and mastery challenges'],
    color: '#5b79ff',
    accent: '#ffd84d',
  },
  vocabulary: {
    slug: 'vocabulary',
    subject: 'vocabulary',
    title: 'Vocabulary',
    eyebrow: 'Meaning, word parts, and academic language',
    summary:
      'Students grow precise language through context clues, morphology, reference skills, figurative language, academic talk, research words, and revision vocabulary.',
    paragraphs: [
      'The Vocabulary track starts with exposure before recall. Students meet words in context, connect meanings to examples, and practice recognizing clues before they move into harder retrieval.',
      'Lessons include flash cards, sentence work, passage questions, word-part analysis, matching, and short application prompts. Older words return so students practice using language with accuracy instead of simply memorizing a list for one day.',
      'Each level helps students complete a grade-appropriate vocabulary path that supports reading, writing, speaking, and school discussion. The track is especially useful for building the academic words that appear across subjects.',
    ],
    learn: ['word meanings in context', 'roots, prefixes, and suffixes', 'reference and research language'],
    master: ['precise word choice', 'figurative and academic language', 'retention through spaced review'],
    complete: ['preview lessons', 'flash-card study loops', 'practice and application lessons'],
    color: '#e63e80',
    accent: '#18bca4',
  },
  spanish: {
    slug: 'spanish',
    subject: 'spanish',
    title: 'Spanish',
    eyebrow: 'Modern language communication',
    summary:
      'Students build Spanish through greetings, classroom language, numbers, family, preferences, places, actions, culture, reading, listening, and short conversations.',
    paragraphs: [
      'The Spanish track is exposure-first: students hear and see new words before they are asked to produce them. Early lessons keep the language useful, concrete, and connected to everyday conversations.',
      'As levels advance, students move from single words and simple phrases into connected sentences, short readings, listening prompts, culture notes, and presentations. Practice alternates recognition, matching, dialogue building, and written recall.',
      'Completing a level gives students a structured language portfolio: vocabulary, conversation patterns, reading practice, and repeated retrieval that prepares them for the next step.',
    ],
    learn: ['high-use words and phrases', 'simple conversations', 'culture and everyday contexts'],
    master: ['listening and reading cues', 'sentence patterns', 'confident recall after preview'],
    complete: ['preview cards', 'conversation practice', 'reading and listening lessons'],
    color: '#18bca4',
    accent: '#ffd84d',
  },
  french: {
    slug: 'french',
    subject: 'french',
    title: 'French',
    eyebrow: 'Modern language communication',
    summary:
      'Students build French through greetings, classroom words, numbers, family, preferences, places, culture, practical reading, listening, and short presentations.',
    paragraphs: [
      'The French track gives students repeated contact with useful language before expecting independent recall. Each unit starts with approachable words, phrases, and models that students can recognize and reuse.',
      'Students practice with flash cards, matching, dialogue work, listening-style prompts, and short reading contexts. Later levels add connected sentences, plans, culture, and presentations so the language feels usable.',
      'A completed level leaves students with a clear set of vocabulary, structures, and communication routines, plus cumulative review that keeps earlier language active.',
    ],
    learn: ['core vocabulary and phrases', 'conversation routines', 'culture and practical reading'],
    master: ['recognition before production', 'connected sentences', 'reviewed long-term recall'],
    complete: ['study loops', 'practice lessons', 'conversation and presentation tasks'],
    color: '#5b79ff',
    accent: '#ff7f45',
  },
  latin: {
    slug: 'latin',
    subject: 'latin',
    title: 'Latin',
    eyebrow: 'Roots, grammar, and classical reading',
    summary:
      'Students build Latin vocabulary, roots, grammar, morphology, Roman culture, and adapted classical reading through exposure-first language practice.',
    paragraphs: [
      'The Latin track connects vocabulary and grammar to meaning from the beginning. Students meet roots, forms, and sentence roles through short examples before moving into recall or analysis.',
      'Lessons use flash cards, matching, text input, adapted passages, culture questions, and morphology practice. The sequence grows from beginner words into grammar patterns and short classical-style readings.',
      'Completing a level gives students a stronger command of Latin roots, grammar language, and reading habits that support both classical study and English vocabulary.',
    ],
    learn: ['Latin roots and vocabulary', 'sentence roles and forms', 'Roman culture and adapted readings'],
    master: ['morphology patterns', 'grammar-based reading', 'root connections to English'],
    complete: ['preview and recall lessons', 'adapted passage work', 'culture and grammar review'],
    color: '#ff7f45',
    accent: '#5b79ff',
  },
  grammar: {
    slug: 'grammar',
    subject: 'grammar',
    title: 'Grammar',
    eyebrow: 'Parts, clauses, punctuation, and sentence craft',
    summary:
      'Students learn how sentences work, from parts of speech and punctuation to clauses, verb consistency, modifiers, voice, and clarity.',
    paragraphs: [
      'The Grammar track is direct and cumulative. Students name the parts of language, identify how words work inside sentences, and practice applying rules to real writing decisions.',
      'Each level adds a manageable layer: sentence structure, nouns and pronouns, verbs, clauses, conjunctions, punctuation, modifiers, and revision. Lessons keep the work brief but precise.',
      'Completing a grammar level gives students shared language for editing, copywork, diagramming, and stronger writing across the rest of the curriculum.',
    ],
    learn: ['parts of speech and sentence roles', 'punctuation patterns', 'copywork and diagramming habits'],
    master: ['accurate identification', 'clear sentence revision', 'cumulative grammar language'],
    complete: ['focused grammar units', 'application questions', 'review lessons'],
    color: '#ffd84d',
    accent: '#e63e80',
  },
  logic: {
    slug: 'logic',
    subject: 'logic',
    title: 'Logic',
    eyebrow: 'Clear thinking and argument structure',
    summary:
      'Students practice patterns, categories, analogies, definitions, evidence, claims, propositions, conditionals, and argument structure.',
    paragraphs: [
      'The Logic track helps students slow down and notice structure. Early levels work with patterns, categories, analogies, and evidence before moving into claims, premises, propositions, and symbolic statements.',
      'Lessons ask students to sort, match, order, evaluate, and explain. The goal is to make clear thinking visible and repeatable, not to rush students into abstract labels too soon.',
      'A completed level strengthens habits of definition, evidence, inference, and careful language that support math, reading, debate, and writing.',
    ],
    learn: ['patterns and categories', 'claims and evidence', 'statements and argument structure'],
    master: ['valid comparisons', 'clear definitions', 'careful reasoning steps'],
    complete: ['logic drills', 'argument checks', 'cumulative reasoning practice'],
    color: '#18bca4',
    accent: '#5b79ff',
  },
  rhetoric: {
    slug: 'rhetoric',
    subject: 'rhetoric',
    title: 'Rhetoric',
    eyebrow: 'Clear communication and persuasive writing',
    summary:
      'Students build narration, summary, strong sentences, paragraphs, reasons, speeches, refutation, confirmation, analysis, debate, and research-supported argument.',
    paragraphs: [
      'The Rhetoric track turns thinking into communication. Students practice retelling, summarizing, arranging reasons, revising sentences, and shaping ideas for an audience.',
      'The levels grow from narration and short speeches into classical progymnasmata-style exercises, refutation, confirmation, analysis, debate, and researched argument. Students work with both structure and voice.',
      'Completing a level gives students a portfolio of communication moves they can reuse in essays, discussions, speeches, and parent-created practice.',
    ],
    learn: ['narration and summary', 'paragraph and speech structure', 'audience-aware revision'],
    master: ['clear reasons', 'organized arguments', 'polished communication'],
    complete: ['short writing tasks', 'speech planning', 'revision and argument practice'],
    color: '#e63e80',
    accent: '#ffd84d',
  },
  literature: {
    slug: 'literature',
    subject: 'literature',
    title: 'Classical Literature',
    eyebrow: 'Reading, comprehension, and thoughtful response',
    summary:
      'Students read fables, myths, folk tales, poetry, epic, legend, allegory, adventure, satire, tragedy, comedy, and classic excerpts.',
    paragraphs: [
      'The Classical Literature track gives students short, approachable encounters with enduring stories and forms. They practice comprehension, inference, theme, character, and response without turning reading into busywork.',
      'Levels move from fables and myths into legends, allegory, adventure, satire, epic, tragedy, comedy, and novel excerpts. Questions help students notice structure, moral choices, imagery, and meaning.',
      'Completing a level builds a shared store of stories and literary habits that support writing, history, rhetoric, and family discussion.',
    ],
    learn: ['story patterns and genres', 'theme and character', 'poetry and classic excerpts'],
    master: ['close reading habits', 'thoughtful response', 'connections across texts'],
    complete: ['reading lessons', 'comprehension checks', 'discussion-ready responses'],
    color: '#5b79ff',
    accent: '#18bca4',
  },
  'history-civics': {
    slug: 'history-civics',
    subject: 'history-civics',
    title: 'History And Civics',
    eyebrow: 'Timeline thinking, geography, sources, and citizenship',
    summary:
      'Students build timelines, maps, source skills, ancient and American history, world history, government, rights, responsibilities, and civic vocabulary.',
    paragraphs: [
      'The History And Civics track helps students place people and events in context. Students work with timelines, maps, sources, civic terms, and cause-and-effect patterns.',
      'Levels move from foundational map and timeline work into historical inquiry, ancient worlds, medieval worlds, American history, industrialization, immigration, imperialism, and world events.',
      'Completing a level gives students more than facts: they practice reading evidence, naming civic responsibilities, and connecting history to place, time, and community.',
    ],
    learn: ['timelines and maps', 'historical sources', 'government and civic language'],
    master: ['context and chronology', 'evidence-based answers', 'rights and responsibilities'],
    complete: ['history units', 'map and source questions', 'cumulative civics review'],
    color: '#ff7f45',
    accent: '#18bca4',
  },
  'memory-work': {
    slug: 'memory-work',
    subject: 'memory-work',
    title: 'Memory Work',
    eyebrow: 'Poetry, maxims, speeches, facts, and durable recall',
    summary:
      'Students practice short daily memory work with poems, Latin sayings, grammar rules, math measures, geography, history, speeches, and civic excerpts.',
    paragraphs: [
      'The Memory Work track gives students a gentle structure for committing worthwhile language and facts to long-term memory. Items are short, repeated, and reviewed in small sessions.',
      'Levels grow from poems and sayings into longer selections, grammar definitions, geography lists, logic terms, speech excerpts, civic documents, and Latin passages.',
      'Completing a level creates a personal storehouse of recitations, definitions, maxims, and reference facts that students can carry into later reading, writing, and discussion.',
    ],
    learn: ['short recitations', 'definitions and lists', 'poems, maxims, and speeches'],
    master: ['accurate recall', 'spaced review habits', 'confident oral practice'],
    complete: ['memory sets', 'review questions', 'cumulative recitation practice'],
    color: '#ffd84d',
    accent: '#5b79ff',
  },
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
    levelRange: levelRange(tracks),
    mockups: sampleFamilyMockups(tracks, 3),
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

function levelRange(tracks: TrackFixture[]) {
  const grades = tracks.map((track) => track.gradeLevel);
  const min = Math.min(...grades);
  const max = Math.max(...grades);
  if (min === max) return `Grade ${min}`;
  return `Grades ${min}-${max}`;
}

function levelLabel(track: TrackFixture) {
  if (track.subject === 'math' || track.subject === 'vocabulary') return `Grade ${track.gradeLevel}`;
  return `${track.title} - Grade ${track.gradeLevel}`;
}

function levelParagraphs(family: CourseFamily, track: TrackFixture, stats: CourseStats, unitTitles: string[]) {
  const sampleUnits = toSentenceList(unitTitles.slice(0, 4));
  const laterUnits = unitTitles.length > 4 ? ` Later work includes ${toSentenceList(unitTitles.slice(4, 7))}.` : '';
  return [
    `${track.title} is the ${levelLabel(track).toLowerCase()} level in the ${family.title} track. ${track.description}`,
    `Students move through ${sampleUnits}.${laterUnits} Lessons are ordered so students meet new ideas, practice with support, and return to older material as review.`,
    `By completion, this level includes ${stats.units} units, ${stats.lessons} lessons, and ${stats.questions} questions. Students learn ${toSentenceList(family.learn)}, master ${toSentenceList(family.master)}, and complete a full path of ${toSentenceList(family.complete)}.`,
  ];
}

function sampleFamilyMockups(tracks: TrackFixture[], limit: number) {
  const candidates = [tracks[0], tracks[Math.floor(tracks.length / 2)], tracks[tracks.length - 1]].filter(Boolean);
  const mockups: QuestionMockup[] = [];
  const seenPrompts = new Set<string>();

  for (const track of candidates) {
    for (const mockup of sampleQuestionMockups(track, 2)) {
      if (seenPrompts.has(mockup.prompt)) continue;
      mockups.push(mockup);
      seenPrompts.add(mockup.prompt);
      if (mockups.length >= limit) return mockups;
    }
  }

  return mockups;
}

function sampleQuestionMockups(track: TrackFixture, limit: number) {
  const questions = track.units.flatMap((unit) => unit.lessons.flatMap((lesson) => lesson.questions));
  const preferredTypes = [
    'multiple-choice',
    'fill-blank',
    'text-input',
    'match-pairs',
    'order-items',
    'passage-question',
    'flash-card',
    'multi-blank-cloze',
    'constructed-response',
    'dialogue-builder',
    'listening-question',
    'error-correction',
    'conjugation-grid',
    'speaking-prompt',
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
    for (const question of questions) {
      if (selected.includes(question)) continue;
      selected.push(question);
      if (selected.length >= limit) break;
    }
  }

  return selected.map(toQuestionMockup);
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
