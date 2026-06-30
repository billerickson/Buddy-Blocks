import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { stringify } from 'yaml';

type Question = Record<string, unknown>;

type LessonSpec = {
  slug: string;
  title: string;
  questions: Question[];
  xpBase?: number;
  config?: Record<string, unknown>;
  kind?: 'mad-minute';
};

type UnitSpec = {
  slug: string;
  title: string;
  description: string;
  lessons: LessonSpec[];
};

type TrackSpec = {
  grade: number;
  folder: string;
  subject: string;
  title: string;
  description: string;
  color: string;
  accent: string;
  units: UnitSpec[];
};

type Word = {
  term: string;
  meaning: string;
  variants?: string[];
};

const curriculumRoot = join(process.cwd(), 'src/content/curriculum');

const colors: Record<string, { color: string; accent: string }> = {
  math: { color: '#5b79ff', accent: '#ffd84d' },
  vocabulary: { color: '#ffd84d', accent: '#18bca4' },
  spanish: { color: '#18bca4', accent: '#ff7f45' },
  french: { color: '#3b82f6', accent: '#facc15' },
  latin: { color: '#b91c1c', accent: '#facc15' },
  grammar: { color: '#7c3aed', accent: '#22c55e' },
  logic: { color: '#0f766e', accent: '#f97316' },
  rhetoric: { color: '#2563eb', accent: '#f59e0b' },
  literature: { color: '#a16207', accent: '#14b8a6' },
  'history-civics': { color: '#475569', accent: '#ef4444' },
  'memory-work': { color: '#be123c', accent: '#38bdf8' },
};

const generatedTracks: TrackSpec[] = [
  ...mathTracks(),
  ...vocabularyTracks(),
  ...languageTracks('spanish'),
  ...languageTracks('french'),
  ...languageTracks('latin'),
  ...foundationTracks(),
];

for (const track of generatedTracks) {
  writeTrack(track);
}

console.log(`Generated ${generatedTracks.length} planned curriculum tracks.`);

function writeTrack(track: TrackSpec) {
  const gradeFolder = `grade-${String(track.grade).padStart(2, '0')}`;
  const trackDir = join(curriculumRoot, gradeFolder, track.folder);
  rmSync(trackDir, { recursive: true, force: true });
  mkdirSync(trackDir, { recursive: true });
  writeYaml(join(trackDir, 'track.yaml'), {
    id: trackId(track.grade, track.subject),
    slug: `grade-${track.grade}-${track.subject}`,
    subject: track.subject,
    title: track.title,
    description: track.description,
    color: track.color,
    accent: track.accent,
  });

  track.units.forEach((unit, unitIndex) => {
    const unitDir = join(trackDir, `${String(unitIndex + 1).padStart(2, '0')}-${unit.slug}`);
    mkdirSync(unitDir, { recursive: true });
    writeYaml(join(unitDir, 'unit.yaml'), {
      id: unitId(track.grade, track.subject, unit.slug),
      slug: unit.slug,
      title: unit.title,
      description: unit.description,
    });
    unit.lessons.forEach((lesson, lessonIndex) => {
      const prefix = lesson.slug.endsWith('-preview') ? '00' : String(lessonIndex + 1).padStart(2, '0');
      const lessonPath = join(unitDir, `${prefix}-${lesson.slug}.md`);
      writeLesson(lessonPath, track, unit, lesson);
    });
  });
}

function writeLesson(path: string, track: TrackSpec, unit: UnitSpec, lesson: LessonSpec) {
  const frontmatter: Record<string, unknown> = {
    id: lessonId(track.grade, track.subject, unit.slug, lesson.slug),
    slug: lesson.slug,
    title: lesson.title,
    xpBase: lesson.xpBase ?? 10,
  };
  if (lesson.kind) frontmatter.kind = lesson.kind;
  if (lesson.config) frontmatter.config = lesson.config;
  frontmatter.questions = lesson.questions;
  writeFileSync(path, `---\n${stringify(frontmatter, { lineWidth: 0 })}---\n`);
}

function writeYaml(path: string, value: Record<string, unknown>) {
  writeFileSync(path, stringify(value, { lineWidth: 0 }));
}

function trackId(grade: number, subject: string) {
  return `track_grade${grade}_${idPart(subject)}`;
}

function unitId(grade: number, subject: string, unitSlug: string) {
  return `unit_grade${grade}_${idPart(subject)}_${idPart(unitSlug)}`;
}

function lessonId(grade: number, subject: string, unitSlug: string, lessonSlug: string) {
  return `lesson_grade${grade}_${idPart(subject)}_${idPart(unitSlug)}_${idPart(lessonSlug)}`;
}

function idPart(value: string) {
  return value.replace(/-/g, '_');
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function titleCase(value: string) {
  return value
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function rotate<T>(items: T[], offset: number) {
  return [...items.slice(offset), ...items.slice(0, offset)];
}

function introCard(title: string, body: string, bullets: string[]) {
  return {
    intro: [
      {
        title,
        body,
        bullets,
      },
    ],
  };
}

function mathTracks(): TrackSpec[] {
  const gradePlans: Record<number, string[]> = {
    1: [
      'Counting And Number Sense',
      'Addition Within 20',
      'Subtraction Within 20',
      'Word Problems And Math Stories',
      'Place Value To 120',
      'Measurement And Data',
      'Time, Money, And Financial Habits',
      'Geometry And Equal Shares',
      'Patterns, Mental Math, And Fluency',
      'Grade 1 Capstone Review',
    ],
    2: [
      'Place Value To 1,200',
      'Addition And Subtraction Within 100',
      'Addition And Subtraction To 1,000',
      'Word Problems And Equations',
      'Arrays, Equal Groups, And Skip Counting',
      'Fractions And Equal Shares',
      'Measurement, Time, And Money',
      'Data And Graphs',
      'Geometry',
      'Personal Financial Literacy',
      'Grade 2 Capstone Review',
    ],
    4: [
      'Multi-Digit Addition And Subtraction Review',
      'Multi-Digit Multiplication',
      'Division With Remainders',
      'Factors, Multiples, And Prime Numbers',
      'Equivalent And Comparing Fractions',
      'Fraction Operations And Mixed Numbers',
      'Decimals To Hundredths',
      'Measurement Conversions',
      'Angles, Lines, And Symmetry',
      'Area, Perimeter, And Data',
      'Financial Literacy And Multi-Step Problems',
      'Grade 4 Capstone Review',
    ],
    5: [
      'Place Value, Powers Of Ten, And Decimals',
      'Decimal Operations',
      'Fraction Addition And Subtraction',
      'Multiplying Fractions',
      'Dividing Unit Fractions And Whole Numbers',
      'Volume And Measurement Conversions',
      'Coordinate Planes',
      'Numerical Expressions',
      'Input-Output Patterns',
      'Data Interpretation',
      'Financial Literacy And Multi-Step Problems',
      'Grade 5 Capstone Review',
    ],
    7: [
      'Integer And Rational Number Operations',
      'Proportional Relationships',
      'Unit Rates With Fractions',
      'Percent Applications',
      'Scale Drawings',
      'Circles And Composite Area',
      'Surface Area And Volume',
      'Multi-Step Equations And Inequalities',
      'Probability',
      'Random Samples And Comparative Inferences',
      'Financial Applications',
      'Grade 7 Capstone Review',
    ],
    8: [
      'Real Numbers And Irrational Numbers',
      'Exponents And Scientific Notation',
      'Linear Relationships',
      'Slope And Y-Intercept',
      'Functions',
      'Systems Of Linear Equations',
      'Transformations And Congruence',
      'Similarity And Pythagorean Theorem',
      'Angle Relationships',
      'Volume Of Cylinders Cones And Spheres',
      'Scatter Plots And Bivariate Data',
      'Grade 8 Algebra Bridge Review',
    ],
    9: [
      'Linear Functions',
      'Equations And Inequalities',
      'Systems Of Equations',
      'Quadratic Functions',
      'Polynomials And Factoring',
      'Exponential Functions',
      'Function Notation, Domain, And Range',
      'Sequences',
      'Radicals And Rational Expressions',
      'Scatter Plots And Regression',
      'Modeling With Functions',
      'Algebra I Capstone Review',
    ],
    10: [
      'Logic, Definitions, And Proof',
      'Constructions And Transformations',
      'Congruence',
      'Similarity',
      'Triangle Relationships',
      'Right Triangle Trigonometry',
      'Circles',
      'Coordinate Geometry',
      'Area And Volume',
      'Geometric Probability',
      'Modeling With Diagrams And Formulas',
      'Geometry Capstone Review',
    ],
    11: [
      'Function Families Review',
      'Advanced Quadratics And Polynomials',
      'Rational And Radical Functions',
      'Exponential And Logarithmic Functions',
      'Absolute Value And Piecewise Functions',
      'Transformations, Inverses, And Composition',
      'Complex Numbers',
      'Systems And Matrices',
      'Conic Sections',
      'Sequences And Series',
      'Probability, Statistics, And Modeling',
      'Algebra II Capstone Review',
    ],
    12: [
      'Advanced Functions',
      'Trigonometric Functions',
      'Trigonometric Identities And Inverses',
      'Vectors',
      'Polar And Parametric Representations',
      'Conic Sections',
      'Limits Preview',
      'Discrete Math',
      'Data Analysis And Normal Distributions',
      'Financial Mathematics',
      'Optimization And Modeling',
      'Quantitative Reasoning Capstone',
    ],
  };

  return Object.entries(gradePlans).map(([gradeText, unitTitles]) => {
    const grade = Number(gradeText);
    const units = unitTitles.map((title) => mathUnit(grade, title));
    if (grade >= 3 && grade <= 8) units.push(madMinuteUnit(grade));
    return {
      grade,
      folder: '01-math',
      subject: 'math',
      title: 'Math',
      description: `Build Grade ${grade} math through models, vocabulary, computation, word problems, data, financial literacy, and cumulative review.`,
      ...colors.math,
      units,
    };
  });
}

function mathUnit(grade: number, title: string): UnitSpec {
  const slug = slugify(title);
  const lessonTitles = mathLessonTitles(grade, title);
  return {
    slug,
    title,
    description: `Use models, vocabulary, computation, and applications for ${title.toLowerCase()}.`,
    lessons: lessonTitles.map((lessonTitle) => ({
      slug: slugify(lessonTitle),
      title: lessonTitle,
      config: introCard(lessonTitle, `This lesson introduces ${lessonTitle.toLowerCase()} with a model first, then asks for practice and explanation.`, [
        'Read the situation and name the math idea.',
        'Choose or build a model before computing.',
        'Check the answer with units and a short explanation.',
      ]),
    questions: mathQuestions(grade, title, lessonTitle),
    })),
  };
}

function mathLessonTitles(grade: number, unitTitle: string) {
  if (/capstone|review/i.test(unitTitle)) return ['Mixed Skills Warmup', 'Applied Review', 'Mastery Challenge'];
  if (grade <= 2) return ['Concrete Models', 'Strategy Practice', 'Story Problems'];
  if (grade <= 5) return ['Concept Models', 'Computation Practice', 'Applications And Review'];
  if (grade <= 8) return ['Concept Connections', 'Fluency Practice', 'Modeling And Review'];
  return ['Representations', 'Algebraic Practice', 'Modeling And Interpretation'];
}

function mathQuestions(grade: number, unitTitle: string, lessonTitle: string): Question[] {
  const sample = mathSample(grade, unitTitle);
  return [
    {
      type: 'multiple-choice',
      prompt: `Which model is most helpful for ${lessonTitle.toLowerCase()} in ${unitTitle}?`,
      choices: sample.models,
      correctAnswer: sample.models[0],
      explanation: `${sample.models[0]} keeps the quantities visible before the calculation.`,
    },
    {
      type: 'multiple-choice',
      prompt: sample.conceptPrompt,
      choices: sample.conceptChoices,
      correctAnswer: sample.conceptChoices[0],
      explanation: sample.conceptExplanation,
    },
    {
      type: 'fill-blank',
      prompt: sample.fillPrompt,
      sentenceBefore: sample.fillBefore,
      sentenceAfter: sample.fillAfter,
      choices: sample.fillChoices,
      correctAnswer: sample.fillAnswer,
      explanation: sample.fillExplanation,
    },
    {
      type: 'match-pairs',
      prompt: `Match each ${unitTitle.toLowerCase()} idea to its meaning.`,
      pairs: sample.pairs,
      explanation: 'Matching words to examples builds the math language needed for problem solving.',
    },
    {
      type: 'order-items',
      prompt: 'Put the problem-solving steps in a sensible order.',
      items: ['solve or reason', 'read the question', 'check units', 'choose a model'],
      correctOrder: ['read the question', 'choose a model', 'solve or reason', 'check units'],
      explanation: 'A steady routine keeps multi-step work organized.',
    },
    {
      type: 'multiple-choice',
      prompt: sample.wordPrompt,
      choices: sample.wordChoices,
      correctAnswer: sample.wordAnswer,
      explanation: sample.wordExplanation,
    },
    {
      type: 'text-input',
      prompt: sample.inputPrompt,
      acceptedAnswers: [sample.inputAnswer],
      answerType: 'number',
      explanation: sample.inputExplanation,
    },
    {
      type: 'constructed-response',
      prompt: `Explain in one or two sentences how you would check a ${unitTitle.toLowerCase()} answer.`,
      minWords: 6,
      sampleAnswer: sample.sampleExplanation,
      checklist: ['Name the operation or relationship', 'Mention a model, estimate, or inverse check'],
    },
  ];
}

function mathSample(grade: number, _unitTitle: string) {
  if (grade <= 1) {
    return {
      models: ['ten frame', 'protractor', 'coordinate plane', 'scatter plot'],
      conceptPrompt: 'Which sentence compares two groups correctly?',
      conceptChoices: ['7 is more than 5', '7 is fewer than 5', '5 is the same as 7', '5 is more than 9'],
      conceptExplanation: 'Seven names a larger count than five.',
      fillPrompt: 'A teen number has 1 ten and some ___ .',
      fillBefore: 'A teen number has 1 ten and some',
      fillAfter: '.',
      fillChoices: ['ones', 'hundreds', 'angles', 'quarters'],
      fillAnswer: 'ones',
      fillExplanation: 'Teen numbers are built from one ten and extra ones.',
      pairs: [
        { left: 'join', right: 'put groups together' },
        { left: 'take away', right: 'remove part of a group' },
        { left: 'equal shares', right: 'parts with the same size' },
        { left: 'graph', right: 'picture of data' },
      ],
      wordPrompt: 'Mia has 6 shells and finds 3 more. How many shells does she have now?',
      wordChoices: ['9', '8', '6', '3'],
      wordAnswer: '9',
      wordExplanation: 'Joining 6 and 3 gives 9.',
      inputPrompt: 'Type the total: 8 + 5.',
      inputAnswer: '13',
      inputExplanation: '8 + 5 = 13.',
      sampleExplanation: 'I can check by counting the model again or by using the opposite operation.',
    };
  }
  if (grade <= 2) {
    return {
      models: ['open number line', 'quadratic graph', 'truth table', 'unit circle'],
      conceptPrompt: 'Which expanded form matches 463?',
      conceptChoices: ['400 + 60 + 3', '40 + 60 + 3', '400 + 6 + 30', '4 + 6 + 3'],
      conceptExplanation: 'The digits show 4 hundreds, 6 tens, and 3 ones.',
      fillPrompt: 'An array has rows and ___ .',
      fillBefore: 'An array has rows and',
      fillAfter: '.',
      fillChoices: ['columns', 'quarters', 'dollars', 'minutes'],
      fillAnswer: 'columns',
      fillExplanation: 'Rows and columns describe equal groups in an array.',
      pairs: [
        { left: 'estimate', right: 'find a reasonable close answer' },
        { left: 'regroup', right: 'trade ones, tens, or hundreds' },
        { left: 'even', right: 'can be paired with none left over' },
        { left: 'line plot', right: 'data shown along a number line' },
      ],
      wordPrompt: 'A class reads 27 pages on Monday and 35 pages on Tuesday. How many pages is that?',
      wordChoices: ['62', '52', '58', '72'],
      wordAnswer: '62',
      wordExplanation: '27 + 35 = 62.',
      inputPrompt: 'Type the difference: 90 - 47.',
      inputAnswer: '43',
      inputExplanation: '90 - 47 = 43.',
      sampleExplanation: 'I can check addition with subtraction and make sure the units match the story.',
    };
  }
  if (grade <= 5) {
    return {
      models: ['area model or place-value chart', 'sound wave', 'food web', 'paragraph outline'],
      conceptPrompt: 'Which statement describes equivalent fractions?',
      conceptChoices: ['They name the same amount', 'They always have the same denominator', 'They must be whole numbers', 'They cannot be drawn'],
      conceptExplanation: 'Equivalent fractions can look different but name the same value.',
      fillPrompt: 'A product is the answer to a ___ problem.',
      fillBefore: 'A product is the answer to a',
      fillAfter: 'problem.',
      fillChoices: ['multiplication', 'subtraction', 'comparison', 'measurement'],
      fillAnswer: 'multiplication',
      fillExplanation: 'Multiplication produces a product.',
      pairs: [
        { left: 'factor', right: 'number multiplied' },
        { left: 'decimal', right: 'number with place values less than one' },
        { left: 'volume', right: 'space inside a solid figure' },
        { left: 'coordinate', right: 'ordered location on a grid' },
      ],
      wordPrompt: 'A garden has 6 rows with 14 plants in each row. How many plants are there?',
      wordChoices: ['84', '74', '80', '68'],
      wordAnswer: '84',
      wordExplanation: '6 x 14 = 84.',
      inputPrompt: 'Type the value of 3/10 + 4/10 as a numerator over 10. What is the numerator?',
      inputAnswer: '7',
      inputExplanation: '3 tenths plus 4 tenths equals 7 tenths.',
      sampleExplanation: 'I can check with an estimate, a model, or the inverse operation.',
    };
  }
  if (grade <= 8) {
    return {
      models: ['table, graph, or equation', 'spelling list', 'timeline only', 'sentence diagram only'],
      conceptPrompt: 'Which statement describes a proportional relationship?',
      conceptChoices: ['Equivalent ratios connect the quantities', 'The quantities are never compared', 'The graph must curve', 'The unit rate changes every row'],
      conceptExplanation: 'In a proportional relationship, equivalent ratios share one constant unit rate.',
      fillPrompt: 'A variable is a symbol for an unknown or changing ___ .',
      fillBefore: 'A variable is a symbol for an unknown or changing',
      fillAfter: '.',
      fillChoices: ['quantity', 'paragraph', 'organism', 'continent'],
      fillAnswer: 'quantity',
      fillExplanation: 'Variables represent quantities in expressions, equations, and functions.',
      pairs: [
        { left: 'unit rate', right: 'amount for one unit' },
        { left: 'slope', right: 'rate of change on a line' },
        { left: 'sample', right: 'part of a population' },
        { left: 'solution', right: 'value that makes an equation true' },
      ],
      wordPrompt: 'A bike travels 45 miles in 3 hours at a steady rate. What is the unit rate?',
      wordChoices: ['15 miles per hour', '42 miles per hour', '48 miles per hour', '135 miles per hour'],
      wordAnswer: '15 miles per hour',
      wordExplanation: '45 divided by 3 is 15.',
      inputPrompt: 'Type the solution to x + 9 = 24.',
      inputAnswer: '15',
      inputExplanation: 'Subtract 9 from both sides to get x = 15.',
      sampleExplanation: 'I can substitute the answer back into the equation or compare it with a graph or table.',
    };
  }
  return {
    models: ['table, graph, symbolic rule, and verbal interpretation', 'single flash card only', 'alphabet chart', 'map legend only'],
    conceptPrompt: 'Which representation helps compare a function rule with real data?',
    conceptChoices: ['a table and graph with units', 'a list of unrelated numbers', 'a picture without labels', 'a sentence with no quantities'],
    conceptExplanation: 'Tables and graphs make patterns, units, and outliers easier to inspect.',
    fillPrompt: 'A function assigns each input exactly one ___ .',
    fillBefore: 'A function assigns each input exactly one',
    fillAfter: '.',
    fillChoices: ['output', 'paragraph', 'triangle', 'source'],
    fillAnswer: 'output',
    fillExplanation: 'One input cannot have two different outputs in a function.',
    pairs: [
      { left: 'domain', right: 'input values' },
      { left: 'range', right: 'output values' },
      { left: 'model', right: 'math representation of a situation' },
      { left: 'residual', right: 'difference between actual and predicted value' },
    ],
    wordPrompt: 'For f(x) = 2x + 5, what is f(7)?',
    wordChoices: ['19', '14', '12', '24'],
    wordAnswer: '19',
    wordExplanation: '2(7) + 5 = 19.',
    inputPrompt: 'Type the solution to 3x - 6 = 18.',
    inputAnswer: '8',
    inputExplanation: 'Add 6 to get 3x = 24, then divide by 3.',
    sampleExplanation: 'I can substitute the answer, inspect the graph, and state whether the result makes sense in context.',
  };
}

function madMinuteUnit(grade: number): UnitSpec {
  const lessons = [...Array.from({ length: 11 }, (_, index) => String(index + 2)), 'mixed'].map((factor) => ({
    slug: factor === 'mixed' ? 'mixed' : `${factor}s`,
    title: factor === 'mixed' ? 'Mixed Facts' : `${factor}s Facts`,
    kind: 'mad-minute' as const,
    config: {
      mode: 'multiplication',
      factor: factor === 'mixed' ? factor : Number(factor),
      minFactor: 2,
      maxFactor: 12,
      minMultiplier: 1,
      maxMultiplier: 12,
      durationSeconds: 60,
      goalCorrect: grade <= 5 ? 35 : 40,
    },
    questions: [],
  }));
  return {
    slug: 'mad-minute',
    title: 'Mad Minute',
    description: 'Practice multiplication facts with short timed fluency rounds.',
    lessons,
  };
}

function vocabularyTracks(): TrackSpec[] {
  const gradePlans: Record<number, string[]> = {
    1: [
      'Oral Vocabulary And Naming',
      'Categories And Attributes',
      'Synonyms, Antonyms, And Shades',
      'Multiple-Meaning And Compound Words',
      'Word Parts Readiness',
      'Context Clues In Sentences',
      'Story And Character Words',
      'Content-Area Words',
      'Academic Talk And Sentence Stems',
      'Reference And Print Tools',
      'Writing And Review Words',
    ],
    2: [
      'Context Clues Across Sentences',
      'Compound Words, Base Words, And Endings',
      'Prefixes, Suffixes, And Word Families',
      'Synonyms, Antonyms, Shades, And Precision',
      'Multiple-Meaning Words And Homophones',
      'Idioms And Figurative Readiness',
      'Reference Skills',
      'Story, Poetry, And Author-Craft Words',
      'Informational And Content-Area Vocabulary',
      'Academic Verbs And Discussion Language',
      'Writing And Revision Vocabulary',
      'Cumulative Word-Learning Review',
    ],
    4: [
      'Context Clues Across Paragraphs',
      'Greek And Latin Affixes',
      'Base Words And Inflectional Endings',
      'Homophones And Homographs',
      'Idioms, Adages, And Proverbs',
      'Similes And Metaphors',
      'Dictionary, Thesaurus, And Glossary Skills',
      'Content-Area Words',
      'Precise Verbs And Adjectives',
      'Evidence Discussion Words',
      'Grade 4 Vocabulary Review',
    ],
    5: [
      'Greek And Latin Roots',
      'Prefixes, Suffixes, And Word Families',
      'Analogies',
      'Connotation And Denotation',
      'Figurative Language',
      'Domain-Specific Vocabulary',
      'Literary Terms',
      'Informational Text Signal Words',
      'Reference Tools',
      'Academic Verbs For Prompts',
      'Revision Words For Clarity And Transitions',
      'Grade 5 Vocabulary Review',
    ],
    7: [
      'Advanced Context Clues',
      'Greek And Latin Root Families',
      'Affix Shifts And Word Origins',
      'Connotation, Denotation, Tone, And Mood',
      'Figurative Language',
      'Literary And Informational Structures',
      'Argument Terms',
      'Credibility, Bias, Audience, And Source Vocabulary',
      'Transition Language',
      'Discipline-Specific Words',
      'Grade 7 Vocabulary Review',
    ],
    8: [
      'Abstract Academic Words',
      'Morphology For Technical Terms',
      'Rhetorical Verbs',
      'Author Craft',
      'Theme And Central Idea Language',
      'Claim Evidence Reasoning Vocabulary',
      'Counterclaim And Rebuttal Terms',
      'Media Literacy',
      'Source Evaluation',
      'Test-Ready Context Analysis',
      'Precision In Summaries And Responses',
      'Grade 8 Vocabulary Review',
    ],
    9: [
      'Literary Genre And Craft Terms',
      'Informational And Argumentative Text Vocabulary',
      'Rhetoric Basics',
      'Diction, Syntax, Tone, And Imagery',
      'Symbolism And Theme Language',
      'Etymology, Roots, And Cognates',
      'Research And Citation Terms',
      'Grammar And Style Vocabulary',
      'Comparison And Evidence Verbs',
      'English I Vocabulary Portfolio',
    ],
    10: [
      'Global And Historical Context Words',
      'Complex Morphology',
      'Satire, Allegory, Irony, Archetype, And Motif',
      'Allusion',
      'Rhetoric And Persuasion Terms',
      'Technical And Domain-Specific Vocabulary',
      'Media Framing And Bias',
      'Synthesis Language',
      'Cross-Cultural Literary Analysis',
      'English II Vocabulary Portfolio',
    ],
    11: [
      'Civic, Legal, Political, And Historical Terms',
      'American Literary Movement Vocabulary',
      'Rhetorical Analysis Terms',
      'Argument Structure',
      'Nuanced Connotation',
      'Etymology And Advanced Roots',
      'Research Synthesis',
      'Source Credibility',
      'Primary Source And Speech Style',
      'English III Vocabulary Portfolio',
    ],
    12: [
      'Advanced Abstract And Disciplinary Vocabulary',
      'British And World Literature Terms',
      'Philosophy And Ethics Terms',
      'Rhetoric And Style Vocabulary',
      'Scholarly Research Language',
      'College And Career Pathway Words',
      'Synthesis And Critique Verbs',
      'Independent Word-Learning Strategies',
      'Vocabulary Commonplace Portfolio',
      'College Readiness Vocabulary Capstone',
    ],
  };

  return Object.entries(gradePlans).map(([gradeText, unitTitles]) => {
    const grade = Number(gradeText);
    return {
      grade,
      folder: '02-vocabulary',
      subject: 'vocabulary',
      title: 'Vocabulary',
      description: `Build Grade ${grade} vocabulary through context, morphology, academic language, author craft, research, and revision words.`,
      ...colors.vocabulary,
      units: unitTitles.map((title, index) => vocabularyUnit(grade, title, index)),
    };
  });
}

function vocabularyUnit(grade: number, title: string, offset: number): UnitSpec {
  const slug = slugify(title);
  const words = vocabularyWords(grade, title, offset);
  const cumulative = /review|portfolio|capstone/i.test(title);
  const lessons = cumulative
    ? [
        {
          slug: `${slug}-mixed-review`,
          title: `${title} Mixed Review`,
          config: introCard(title, 'Review older words by using context, word parts, examples, and precise sentences.', [
            'Read the clue before choosing.',
            'Use word parts when they help.',
            'Explain how the word fits the sentence.',
          ]),
          questions: vocabularyPracticeQuestions(title, words, grade),
        },
        {
          slug: `${slug}-application`,
          title: `${title} Application`,
          config: introCard(title, 'Apply vocabulary in reading, speaking, and writing tasks.', [
            'Connect words to short texts.',
            'Choose precise words for the situation.',
            'Use academic sentence frames.',
          ]),
          questions: vocabularyApplicationQuestions(title, words, grade),
        },
      ]
    : [
        {
          slug: `${slug}-preview`,
          title: `${title} Preview`,
          xpBase: 5,
          config: introCard('Read Before Recall', `Meet the ${title.toLowerCase()} words in context before using flash cards.`, [
            'Use the passage and clue words.',
            'Choose the meaning that fits the sentence.',
            'Save typing from memory for later lessons.',
          ]),
          questions: vocabularyPreviewQuestions(title, words),
        },
        {
          slug: `${slug}-flash-cards-easy`,
          title: `${title} Flash Cards Easy`,
          xpBase: 5,
          questions: easyFlashCards(words, 'Choose the best meaning.'),
        },
        {
          slug: `${slug}-practice`,
          title: `${title} Practice`,
          config: introCard(title, 'Use the same words in new sentences, examples, and short reading tasks.', [
            'Look for context clues.',
            'Use word parts when they are useful.',
            'Choose precise words, not just familiar words.',
          ]),
          questions: vocabularyPracticeQuestions(title, words, grade),
        },
        {
          slug: `${slug}-flash-cards-hard`,
          title: `${title} Flash Cards Hard`,
          xpBase: 10,
          questions: hardFlashCards(words, 'Type the vocabulary word.'),
        },
      ];
  return {
    slug,
    title,
    description: `Learn and apply ${title.toLowerCase()} with exposure-first practice and cumulative retrieval.`,
    lessons,
  };
}

function vocabularyWords(grade: number, title: string, offset: number): Word[] {
  const lower = title.toLowerCase();
  const bank: Word[] = [
    { term: 'context', meaning: 'the words and ideas around an unfamiliar word' },
    { term: 'category', meaning: 'a group of things that belong together' },
    { term: 'attribute', meaning: 'a quality or feature used to describe something' },
    { term: 'synonym', meaning: 'a word with a similar meaning' },
    { term: 'antonym', meaning: 'a word with the opposite meaning' },
    { term: 'precise', meaning: 'exact and carefully chosen' },
    { term: 'compound', meaning: 'a word made from two smaller words' },
    { term: 'prefix', meaning: 'a word part added to the beginning' },
    { term: 'suffix', meaning: 'a word part added to the end' },
    { term: 'base word', meaning: 'the main word that can take prefixes or suffixes' },
    { term: 'root', meaning: 'a word part that carries core meaning' },
    { term: 'homophone', meaning: 'a word that sounds like another word but has a different meaning' },
    { term: 'homograph', meaning: 'a word spelled the same as another word but with a different meaning' },
    { term: 'idiom', meaning: 'a phrase whose meaning is not literal' },
    { term: 'proverb', meaning: 'a short saying that teaches a lesson' },
    { term: 'metaphor', meaning: 'a comparison that says one thing is another' },
    { term: 'simile', meaning: 'a comparison using like or as' },
    { term: 'connotation', meaning: 'the feeling or association a word carries' },
    { term: 'denotation', meaning: 'the direct dictionary meaning of a word' },
    { term: 'tone', meaning: "an author's attitude toward a subject" },
    { term: 'mood', meaning: 'the feeling created for a reader' },
    { term: 'claim', meaning: 'a statement that an argument tries to prove' },
    { term: 'evidence', meaning: 'information that supports an idea' },
    { term: 'rebuttal', meaning: 'a response to an opposing argument' },
    { term: 'credible', meaning: 'trustworthy and believable' },
    { term: 'bias', meaning: 'a leaning that may make information less fair' },
    { term: 'synthesize', meaning: 'combine ideas from more than one source' },
    { term: 'analyze', meaning: 'study parts carefully to understand the whole' },
    { term: 'evaluate', meaning: 'judge quality or value using criteria' },
    { term: 'revise', meaning: 'change writing to make ideas clearer' },
    { term: 'transition', meaning: 'a word or phrase that connects ideas' },
    { term: 'citation', meaning: 'a note that tells where information came from' },
    { term: 'theme', meaning: 'a big idea or message in a text' },
    { term: 'symbolism', meaning: 'using an object or image to stand for an idea' },
    { term: 'diction', meaning: "an author's word choice" },
    { term: 'syntax', meaning: 'the arrangement of words in a sentence' },
    { term: 'allusion', meaning: 'a reference to another story, person, or event' },
    { term: 'satire', meaning: 'writing that uses humor or criticism to expose a problem' },
    { term: 'ethics', meaning: 'ideas about right action and responsibility' },
    { term: 'critique', meaning: 'a careful judgment with reasons' },
  ];
  if (lower.includes('math')) bank.unshift({ term: 'estimate', meaning: 'a reasonable close answer' });
  if (lower.includes('science')) bank.unshift({ term: 'observe', meaning: 'look closely to gather information' });
  if (lower.includes('story') || lower.includes('literary')) bank.unshift({ term: 'character trait', meaning: 'a quality shown by a character' });
  if (grade <= 2) bank.unshift({ term: 'describe', meaning: 'tell details about something' }, { term: 'explain', meaning: 'tell how or why' });
  if (grade >= 9) bank.unshift({ term: 'rhetoric', meaning: 'the art of using language effectively' }, { term: 'scholarly', meaning: 'careful, academic, and source-based' });
  return rotate(bank, offset).slice(0, 8);
}

function vocabularyPreviewQuestions(title: string, words: Word[]): Question[] {
  const passage = `${title} study page: ${words
    .map((word) => `The word "${word.term}" means ${word.meaning}.`)
    .join(' ')} Students read the page, talked about examples, and then practiced retrieval.`;
  return words.map((word, index) => ({
    type: 'passage-question',
    prompt: 'Read the study page and choose the meaning.',
    passageTitle: `${title} Study Page`,
    passage,
    question: `In the passage, what does "${word.term}" mean?`,
    choices: rotate(words.map((choice) => choice.meaning), index).slice(0, 4),
    correctAnswer: word.meaning,
    explanation: `The passage defines "${word.term}" as ${word.meaning}.`,
  }));
}

function vocabularyPracticeQuestions(title: string, words: Word[], grade: number): Question[] {
  return [
    {
      type: 'multiple-choice',
      prompt: `Which sentence uses "${words[0].term}" correctly?`,
      choices: [
        `The ${words[0].term} helped the reader understand the idea.`,
        `She poured the ${words[0].term} into a cup.`,
        `The ${words[0].term} barked loudly.`,
        `We measured the ${words[0].term} with a ruler.`,
      ],
      correctAnswer: `The ${words[0].term} helped the reader understand the idea.`,
      explanation: `The correct sentence uses the word in a vocabulary or reading situation.`,
    },
    {
      type: 'fill-blank',
      prompt: `${words[1].meaning} is called ___.`,
      sentenceBefore: `${words[1].meaning} is called`,
      sentenceAfter: '.',
      choices: rotate(words.map((word) => word.term), 1).slice(0, 4),
      correctAnswer: words[1].term,
      explanation: `The clue gives the meaning of "${words[1].term}".`,
    },
    {
      type: 'match-pairs',
      prompt: `Match the ${title.toLowerCase()} words to meanings.`,
      pairs: words.slice(2, 6).map((word) => ({ left: word.term, right: word.meaning })),
      explanation: 'Each pair connects a word with its meaning.',
    },
    {
      type: 'order-items',
      prompt: 'Put the word-learning routine in order.',
      items: ['use the word in a sentence', 'read the full context', 'check a word part', 'choose a meaning'],
      correctOrder: ['read the full context', 'check a word part', 'choose a meaning', 'use the word in a sentence'],
      explanation: 'Good word solving starts with context before production.',
    },
    {
      type: 'passage-question',
      prompt: 'Read the paragraph and answer.',
      passageTitle: `${title} In Use`,
      passage: `During discussion, Noor chose the word "${words[6].term}" because it means ${words[6].meaning}. Then she used "${words[7].term}" to make her explanation more exact.`,
      question: `Which word in the paragraph means "${words[6].meaning}"?`,
      choices: [words[6].term, words[7].term, words[0].term, words[1].term],
      correctAnswer: words[6].term,
      explanation: 'The sentence gives the definition right after the target word.',
    },
    {
      type: 'text-input',
      prompt: `Type the word that means "${words[7].meaning}".`,
      acceptedAnswers: [words[7].term, ...(words[7].variants ?? [])],
      answerType: 'text',
      explanation: `The word is "${words[7].term}".`,
    },
    {
      type: 'multiple-choice',
      prompt: grade <= 2 ? 'Which sentence frame explains a clue?' : 'Which response best explains a word clue?',
      choices: ['I think ___ because the clue says ___.', 'I am done.', 'The word is long.', 'I picked the first answer.'],
      correctAnswer: 'I think ___ because the clue says ___.',
      explanation: 'A strong response names the clue and the reasoning.',
    },
    {
      type: 'constructed-response',
      prompt: `Write one sentence using "${words[0].term}" in a reading, writing, or discussion situation.`,
      minWords: grade <= 2 ? 4 : 6,
      sampleAnswer: `The context helped me understand the word in the paragraph.`,
      checklist: ['Use the word accurately', 'Show its meaning through the sentence'],
    },
  ];
}

function vocabularyApplicationQuestions(title: string, words: Word[], grade: number): Question[] {
  return [
    ...vocabularyPracticeQuestions(title, words, grade).slice(0, 6),
    {
      type: 'constructed-response',
      prompt: 'Write a short word-learning note with a word, meaning, clue, and example.',
      minWords: 10,
      sampleAnswer: `${words[0].term}: ${words[0].meaning}. My clue is the example sentence. I can use it in class.`,
      checklist: ['Name the word', 'Give a meaning', 'Include a clue or example'],
    },
    {
      type: 'constructed-response',
      prompt: 'Choose two review words and explain how they are connected.',
      minWords: 10,
      sampleAnswer: `${words[0].term} and ${words[1].term} are connected because both help readers solve meaning.`,
      checklist: ['Use two vocabulary words', 'Explain the connection'],
    },
  ];
}

function easyFlashCards(words: Word[], prompt: string): Question[] {
  return words.map((word, index) => ({
    type: 'flash-card',
    mode: 'easy',
    prompt,
    front: word.term,
    choices: rotate(words.map((choice) => choice.meaning), index).slice(0, 4),
    correctAnswer: word.meaning,
  }));
}

function hardFlashCards(words: Word[], prompt: string): Question[] {
  return words.map((word) => ({
    type: 'flash-card',
    mode: 'hard',
    prompt,
    front: word.meaning,
    acceptedAnswers: [word.term, ...(word.variants ?? [])],
    answerType: 'text',
  }));
}

function previewFlashCards(words: Word[]): Question[] {
  return words.map((word) => ({
    type: 'flash-card',
    mode: 'preview',
    prompt: 'Study this word and meaning.',
    front: word.term,
    correctAnswer: word.meaning,
  }));
}

function mediumFlashCards(words: Word[]): Question[] {
  return words.map((word) => ({
    type: 'flash-card',
    mode: 'medium',
    prompt: 'Type the English meaning.',
    front: word.term,
    acceptedAnswers: [word.meaning],
    answerType: 'text',
  }));
}

function languageTracks(subject: 'spanish' | 'french' | 'latin'): TrackSpec[] {
  const folderBySubject = { spanish: '03-spanish', french: '04-french', latin: '05-latin' };
  const levels = subject === 'spanish' || subject === 'french' || subject === 'latin' ? [3, 4, 5] : [];
  return levels.map((level) => {
    const grade = level + 2;
    return {
      grade,
      folder: folderBySubject[subject],
      subject,
      title: `${titleCase(subject)} ${level}`,
      description: languageDescription(subject, level),
      ...colors[subject],
      units: languageUnitTitles(subject, level).map((title, index) =>
        languageUnit(subject, level, title, languageWords(subject, level, index)),
      ),
    };
  });
}

function languageDescription(subject: 'spanish' | 'french' | 'latin', level: number) {
  if (subject === 'latin') return `Build Latin ${level} reading through grammar, morphology, roots, Roman culture, and adapted classical passages.`;
  return `Build ${titleCase(subject)} ${level} communication through connected sentences, culture, reading, listening, conversation, and short presentations.`;
}

function languageUnitTitles(subject: 'spanish' | 'french' | 'latin', level: number) {
  if (subject === 'spanish') {
    return {
      3: [
        'Pronouns And Present-Tense Patterns',
        'Ser, Estar, Tener, Hay, And Ir',
        'Adjective Agreement And Articles',
        'Questions And Short Conversations',
        'Daily Routines And Weather',
        'Hobbies And Preferences',
        'Community Places And Maps',
        'Schedules, Notes, Menus, And Messages',
        'Connected Conversation Practice',
        'Spanish 3 Cumulative Review',
      ],
      4: [
        'Past-Tense Narration',
        'Preterite And Imperfect In Context',
        'Near Future And Simple Future',
        'Direct Object Pronouns',
        'Comparisons',
        'Chores And Responsibilities',
        'Travel And Shopping',
        'Health And Celebrations',
        'Regional Culture And Paragraphs',
        'Spanish 4 Cumulative Review',
      ],
      5: [
        'Connected Reading And Listening',
        'Opinions With Evidence',
        'Polite Requests And Conditional Phrases',
        'Commands',
        'Present Perfect Exposure',
        'Subjunctive Chunks For Wishes And Needs',
        'Media And Community Topics',
        'Culture Comparisons',
        'Project-Based Communication',
        'Spanish 5 Capstone Review',
      ],
    }[level]!;
  }
  if (subject === 'french') {
    return {
      3: [
        'Etre, Avoir, Aller, And Faire',
        'Regular Er Ir And Re Verbs',
        'Adjective Agreement',
        'Articles And Partitives',
        'Negation And Questions',
        'Daily Routines And Weather',
        'Hobbies And Preferences',
        'Community Places And Dialogues',
        'Connected Sentence Practice',
        'French 3 Cumulative Review',
      ],
      4: [
        'Passe Compose And Imparfait In Context',
        'Past-Tense Narration',
        'Near Future And Simple Future',
        'Object Pronouns',
        'Commands And Comparisons',
        'Travel And Shopping',
        'Health And Celebrations',
        'Francophone Regions',
        'Short Paragraph Writing',
        'French 4 Cumulative Review',
      ],
      5: [
        'Connected Reading And Listening',
        'Presentations With Evidence',
        'Conditional Politeness',
        'Subjunctive Chunks',
        'Media And Community Topics',
        'Culture Comparisons',
        'Authentic Resource Reading',
        'Familiar Topic Discussions',
        'Project-Based Communication',
        'French 5 Capstone Review',
      ],
    }[level]!;
  }
  return {
    3: [
      'Five Declensions Recognition',
      'Case Functions',
      'Adjective Agreement',
      'Present Imperfect Future And Perfect Verbs',
      'Infinitives And Imperatives',
      'Personal And Relative Pronouns',
      'Prepositional Phrases',
      'Roman History Readings',
      'Myth Adapted Readings',
      'Latin 3 Cumulative Review',
    ],
    4: [
      'Passive Voice',
      'Participles',
      'Relative Clauses',
      'Indirect Statement',
      'Comparative And Superlative Forms',
      'Subjunctive Recognition',
      'Purpose Result And Cum Clauses',
      'Scansion And Rhetorical Figures',
      'Adapted Classical Authors',
      'Latin 4 Cumulative Review',
    ],
    5: [
      'Authentic Author Passages',
      'Translation Commentary',
      'Syntax Review',
      'Morphology Mastery Checks',
      'Meter And Style',
      'Latin Composition',
      'Roman History And Reception',
      'Classical Roots In Academic English',
      'Translation Portfolio',
      'Latin 5 Capstone Review',
    ],
  }[level]!;
}

function languageUnit(subject: 'spanish' | 'french' | 'latin', level: number, title: string, words: Word[]): UnitSpec {
  const slug = slugify(title);
  return {
    slug,
    title,
    description: `Practice ${title.toLowerCase()} with preview, recognition, typed recall, application, and cumulative production.`,
    lessons: [
      {
        slug: `${slug}-preview`,
        title: `${title} Preview`,
        xpBase: 5,
        questions: previewFlashCards(words),
      },
      {
        slug: `${slug}-flash-cards-easy`,
        title: `${title} Flash Cards Easy`,
        xpBase: 5,
        questions: easyFlashCards(words, 'Choose the English meaning.'),
      },
      {
        slug: `${slug}-flash-cards-medium`,
        title: `${title} Flash Cards Medium`,
        xpBase: 10,
        questions: mediumFlashCards(words),
      },
      {
        slug: `${slug}-practice`,
        title: `${title} Practice`,
        config: introCard(title, `Use ${subject === 'latin' ? 'Latin reading clues' : 'language in context'} before producing from memory.`, [
          'Read the whole sentence or exchange.',
          'Use familiar forms and word order.',
          'Check meaning before typing or speaking.',
        ]),
        questions: languagePracticeQuestions(subject, level, title, words),
      },
      {
        slug: `${slug}-flash-cards-hard`,
        title: `${title} Flash Cards Hard`,
        xpBase: 10,
        questions: hardFlashCards(words, subject === 'latin' ? 'Type the Latin word or phrase.' : `Type the ${titleCase(subject)} word or phrase.`),
      },
    ],
  };
}

function languageWords(subject: 'spanish' | 'french' | 'latin', level: number, offset: number): Word[] {
  const banks: Record<'spanish' | 'french' | 'latin', Word[]> = {
    spanish: [
      { term: 'yo hablo', meaning: 'I speak' },
      { term: 'nosotros vamos', meaning: 'we go' },
      { term: 'ella tiene', meaning: 'she has' },
      { term: 'hay', meaning: 'there is or there are' },
      { term: 'estoy cansado', meaning: 'I am tired' },
      { term: 'soy estudiante', meaning: 'I am a student' },
      { term: 'porque', meaning: 'because' },
      { term: 'que tiempo hace', meaning: 'what is the weather like' },
      { term: 'ayer fui', meaning: 'yesterday I went' },
      { term: 'cuando era pequeno', meaning: 'when I was little' },
      { term: 'voy a visitar', meaning: 'I am going to visit' },
      { term: 'lo compro', meaning: 'I buy it' },
      { term: 'mejor que', meaning: 'better than' },
      { term: 'tengo que ayudar', meaning: 'I have to help' },
      { term: 'me gustaria', meaning: 'I would like' },
      { term: 'he visto', meaning: 'I have seen' },
      { term: 'quiero que', meaning: 'I want that' },
      { term: 'la comunidad', meaning: 'the community' },
      { term: 'segun el articulo', meaning: 'according to the article' },
      { term: 'mi opinion es', meaning: 'my opinion is' },
    ],
    french: [
      { term: 'je suis', meaning: 'I am' },
      { term: 'nous avons', meaning: 'we have' },
      { term: 'elle va', meaning: 'she goes' },
      { term: 'il fait', meaning: 'he does or it makes' },
      { term: 'je parle', meaning: 'I speak' },
      { term: 'je finis', meaning: 'I finish' },
      { term: 'je vends', meaning: 'I sell' },
      { term: 'ne pas', meaning: 'not' },
      { term: 'hier je suis alle', meaning: 'yesterday I went' },
      { term: "quand j'etais petit", meaning: 'when I was little' },
      { term: 'je vais visiter', meaning: 'I am going to visit' },
      { term: 'je le vois', meaning: 'I see it' },
      { term: 'meilleur que', meaning: 'better than' },
      { term: 'je voudrais', meaning: 'I would like' },
      { term: 'il faut que', meaning: 'it is necessary that' },
      { term: 'la communaute', meaning: 'the community' },
      { term: "selon l'article", meaning: 'according to the article' },
      { term: 'mon opinion est', meaning: 'my opinion is' },
      { term: 'une ressource authentique', meaning: 'an authentic resource' },
      { term: 'je presente', meaning: 'I present' },
    ],
    latin: [
      { term: 'puella', meaning: 'girl' },
      { term: 'servus', meaning: 'servant' },
      { term: 'rex', meaning: 'king' },
      { term: 'manus', meaning: 'hand' },
      { term: 'res publica', meaning: 'public matter or republic' },
      { term: 'puellae', meaning: 'of the girl or girls' },
      { term: 'puellam', meaning: 'girl as direct object' },
      { term: 'in villa', meaning: 'in the house' },
      { term: 'amabat', meaning: 'was loving' },
      { term: 'amavit', meaning: 'loved' },
      { term: 'amabit', meaning: 'will love' },
      { term: 'videre', meaning: 'to see' },
      { term: 'videte', meaning: 'see, plural command' },
      { term: 'qui', meaning: 'who or which' },
      { term: 'laudatur', meaning: 'is praised' },
      { term: 'portans', meaning: 'carrying' },
      { term: 'dixit se venire', meaning: 'said that he or she was coming' },
      { term: 'fortior', meaning: 'braver' },
      { term: 'ut discat', meaning: 'so that he or she may learn' },
      { term: 'arma virumque', meaning: 'arms and the man' },
    ],
  };
  const levelOffset = (level - 3) * 4 + offset;
  return rotate(banks[subject], levelOffset).slice(0, 8);
}

function languagePracticeQuestions(subject: 'spanish' | 'french' | 'latin', level: number, title: string, words: Word[]): Question[] {
  const targetLabel = titleCase(subject);
  const passage =
    subject === 'latin'
      ? `In an adapted Latin note, the class saw "${words[0].term}" and used grammar clues to read it as "${words[0].meaning}". Later, "${words[1].term}" helped them translate a second sentence.`
      : `In a short ${targetLabel} exchange, a student says "${words[0].term}" to mean "${words[0].meaning}". A second student answers with "${words[1].term}" during ${title.toLowerCase()} practice.`;
  return [
    {
      type: 'multiple-choice',
      prompt: `What does "${words[0].term}" mean?`,
      choices: rotate(words.map((word) => word.meaning), 0).slice(0, 4),
      correctAnswer: words[0].meaning,
      explanation: `${words[0].term} means ${words[0].meaning}.`,
    },
    {
      type: 'text-input',
      prompt: `Type the English meaning of "${words[1].term}".`,
      acceptedAnswers: [words[1].meaning],
      answerType: 'text',
      explanation: `${words[1].term} means ${words[1].meaning}.`,
    },
    {
      type: 'fill-blank',
      prompt: `"${words[2].term}" means ___.`,
      sentenceBefore: `"${words[2].term}" means`,
      sentenceAfter: '.',
      choices: rotate(words.map((word) => word.meaning), 2).slice(0, 4),
      correctAnswer: words[2].meaning,
      explanation: 'The blank asks for the meaning from the preview deck.',
    },
    {
      type: 'match-pairs',
      prompt: `Match the ${targetLabel} or Latin forms to meanings.`,
      pairs: words.slice(3, 7).map((word) => ({ left: word.term, right: word.meaning })),
      explanation: 'Each pair connects a form with its meaning.',
    },
    {
      type: 'passage-question',
      prompt: 'Read the short resource and answer.',
      passageTitle: title,
      passage,
      question: `Which form in the passage means "${words[0].meaning}"?`,
      choices: [words[0].term, words[1].term, words[2].term, words[3].term],
      correctAnswer: words[0].term,
      explanation: 'The passage gives the meaning beside the target form.',
    },
    subject === 'latin'
      ? {
          type: 'multiple-choice',
          prompt: 'Which habit helps most when reading a new Latin sentence?',
          choices: ['Find the verb and case clues', 'Ignore endings', 'Translate every word randomly', 'Skip the context'],
          correctAnswer: 'Find the verb and case clues',
          explanation: 'Latin endings and verb forms carry sentence meaning.',
        }
      : {
          type: 'dialogue-builder',
          prompt: 'Choose the best next line.',
          turns: [{ speaker: 'Teacher', line: subject === 'spanish' ? 'Que puedes decir?' : 'Que peux-tu dire?' }],
          choices: [words[7].term, 'The triangle is blue.', 'I solved the equation.'],
          correctAnswer: words[7].term,
          explanation: 'The answer stays in the target language and fits a conversation.',
        },
    {
      type: 'constructed-response',
      prompt: subject === 'latin' ? 'Write a short English translation note for one form from this lesson.' : `Write one short English note explaining when you could use "${words[0].term}".`,
      minWords: level >= 5 ? 8 : 5,
      sampleAnswer: subject === 'latin' ? `${words[0].term} means ${words[0].meaning}, and I would check its ending in a sentence.` : `I could use ${words[0].term} when I want to say ${words[0].meaning}.`,
      checklist: ['Use one target form', 'Show the meaning in context'],
    },
    {
      type: 'constructed-response',
      prompt: subject === 'latin' ? 'Explain one grammar or context clue that helps translation.' : `Write a modeled ${targetLabel} sentence or phrase from this lesson.`,
      minWords: subject === 'latin' ? 6 : 2,
      sampleAnswer: subject === 'latin' ? 'I check endings and nearby words before choosing a translation.' : words[1].term,
      checklist: ['Use lesson language', 'Keep the meaning connected to the unit'],
    },
  ];
}

function foundationTracks(): TrackSpec[] {
  const plans: Array<{
    subject: keyof typeof colors;
    folder: string;
    titleBase: string;
    startLevel: number;
    endLevel: number;
    unitsByLevel: Record<number, string[]>;
  }> = [
    {
      subject: 'grammar',
      folder: '06-grammar',
      titleBase: 'Grammar',
      startLevel: 2,
      endLevel: 4,
      unitsByLevel: {
        2: [
          'Common Proper And Possessive Nouns',
          'Personal Possessive And Reflexive Pronouns',
          'Verb Tense Consistency',
          'Helping And Linking Verbs',
          'Direct Objects',
          'Compound Subjects And Predicates',
          'Prepositional Phrases',
          'Commas In Series And Quotations',
          'Dialogue Punctuation',
          'Diagramming Expanded Sentences',
          'Grammar II Cumulative Review',
        ],
        3: [
          'Independent And Dependent Clauses',
          'Coordinating And Subordinating Conjunctions',
          'Compound And Complex Sentences',
          'Appositives',
          'Adjective And Adverb Phrases',
          'Adjective And Adverb Clauses',
          'Pronoun Antecedent Agreement',
          'Active And Passive Voice',
          'Misplaced Modifiers',
          'Semicolons And Colons',
          'Grammar III Diagramming Review',
        ],
        4: [
          'Verb Mood And Voice',
          'Parallel Structure',
          'Concise Modifiers',
          'Punctuation For Rhythm And Clarity',
          'Usage And Register',
          'Sentence Variety',
          'Grammar In Literary Sentences',
          'Latin And English Grammar Connections',
          'Copyediting Marks',
          'Editing Portfolio',
          'Grammar IV Cumulative Review',
        ],
      },
    },
    {
      subject: 'logic',
      folder: '07-logic',
      titleBase: 'Logic',
      startLevel: 2,
      endLevel: 4,
      unitsByLevel: {
        2: [
          'Statements, Questions, And Claims',
          'Claims And Evidence',
          'Premises And Conclusions',
          'Good Definitions',
          'Examples And Counterexamples',
          'Analogy Strength',
          'Generalizations',
          'Cause And Correlation',
          'Source Reliability',
          'Relevant And Irrelevant Reasons',
          'Informal Fallacies Review',
        ],
        3: [
          'Terms And Propositions',
          'Categorical Statements',
          'Square Of Opposition Awareness',
          'Venn Diagrams',
          'Syllogisms',
          'Validity And Truth',
          'Soundness',
          'Conditionals',
          'Necessary And Sufficient Conditions',
          'Arguments In Standard Form',
          'Formal Logic I Review',
        ],
        4: [
          'Symbolic Statements',
          'Negation',
          'Conjunction And Disjunction',
          'Conditionals And Biconditionals',
          'Truth Tables',
          'Deductive Inductive And Abductive Reasoning',
          'Probability And Data Claims',
          'Scientific Reasoning',
          'Argument Maps',
          'Debate Case Structure',
          'Formal Logic II Review',
        ],
      },
    },
    {
      subject: 'rhetoric',
      folder: '08-rhetoric',
      titleBase: 'Rhetoric',
      startLevel: 2,
      endLevel: 5,
      unitsByLevel: {
        2: ['Fable', 'Narrative', 'Anecdote', 'Chreia', 'Proverb', 'Moral', 'Paraphrase', 'Imitation', 'Amplification', 'Reduction', 'Rhetoric II Review'],
        3: ['Refutation', 'Confirmation', 'Commonplace', 'Praise And Blame', 'Encomium', 'Vituperation', 'Comparison', 'Evidence Selection', 'Audience Awareness', 'Transitions', 'Rhetoric III Review'],
        4: ['Impersonation', 'Description And Ekphrasis', 'Thesis', 'Law Or Policy Proposal', 'Arrangement Of An Argument', 'Introduction And Narration', 'Proof And Refutation', 'Conclusion', 'Ethos Pathos And Logos', 'Delivery', 'Rhetoric IV Review'],
        5: ['Rhetorical Analysis', 'Speech Planning', 'Debate', 'Research-Supported Argument', 'Literary Speeches', 'Civic Speeches', 'Style Imitation', 'Revision Cycles', 'Visual And Oral Presentation', 'Final Oration Portfolio', 'Rhetoric V Review'],
      },
    },
    {
      subject: 'literature',
      folder: '09-literature',
      titleBase: 'Classical Literature',
      startLevel: 2,
      endLevel: 5,
      unitsByLevel: {
        2: ['Aesop Review', 'Greek Mythology', 'Roman Mythology', 'Homeric Epic Adapted', 'Hero Patterns', 'Gods And Mortals', 'Fate And Choice', 'Classical Monsters', 'Origin Stories', 'Ancient Drama And Lyric Poetry'],
        3: ['Quests', 'Arthurian Legend', 'Medieval Saints And Heroes', 'Allegory', 'Dante Adapted Excerpts', 'Chaucer Adapted Excerpts', 'Shakespeare Scenes', 'Sonnets', 'Comedy And Tragedy', 'Oral Tale To Literary Text'],
        4: ['Robinsonade And Adventure', 'Moral Tales', 'Satire', 'Gothic And Romantic Elements', 'American Poetry', 'British Poetry', 'Speeches And Essays As Literature', 'Point Of View', 'Symbolism And Theme Development', 'Literary Influence'],
        5: ['Epic Seminar', 'Tragedy Seminar', 'Comedy Seminar', 'Novel Excerpts', 'Essays And Speeches', 'Poetry Across Eras', 'Translation And Adaptation Comparison', 'Moral And Civic Questions', 'Literary Response Writing', 'Commonplace Portfolio'],
      },
    },
    {
      subject: 'history-civics',
      folder: '10-history-civics',
      titleBase: 'History And Civics',
      startLevel: 2,
      endLevel: 5,
      unitsByLevel: {
        2: ['Historical Inquiry', 'Primary And Secondary Sources', 'Geography Tools', 'Mesopotamia', 'Egypt', 'Israel', 'India', 'China', 'Greece', 'Rome', 'Early Christianity In Historical Context', 'Classical Contributions Review'],
        3: ['Byzantine World', 'Islamic Worlds', 'African Medieval Worlds', 'Asian Medieval Worlds', 'European Medieval Worlds', 'Feudalism And Towns', 'Medieval Learning', 'Renaissance', 'Reformation', 'Exploration And Exchange', 'Early Nation States', 'Law Representation And Pluralism'],
        4: ['Indigenous North America', 'Colonial Regions', 'Atlantic World', 'American Revolution', 'Founding Documents', 'Constitution And Bill Of Rights', 'Branches Of Government', 'Federalism', 'Westward Expansion', 'Reform Movements', 'Civil War', 'Reconstruction And Civic Responsibilities'],
        5: ['Industrialization', 'Immigration', 'Imperialism', 'World War I', 'Totalitarianism And Democracy', 'World War II', 'Civil Rights', 'Cold War', 'Globalization', 'Economics Basics', 'Media Literacy And Public Policy', 'Civic Action Inquiry Project'],
      },
    },
    {
      subject: 'memory-work',
      folder: '11-memory-work',
      titleBase: 'Memory Work',
      startLevel: 2,
      endLevel: 4,
      unitsByLevel: {
        2: ['Longer Poems', 'Additional Latin Maxims', 'Grammar Definitions', 'Geography Lists And Map Pegs', 'Timeline Anchors', 'Civic Terms', 'Science And Math Formulas', 'Expressive Oral Delivery'],
        3: ['Multi-Stanza Poems', 'Speech Excerpts', 'Latin Paradigms And Mottoes', 'Logic Definitions', 'History Chronology', 'Geography Regions', 'Literary Quotations', 'Cumulative Mixed Retrieval'],
        4: ['Polished Poem Or Speech', 'Civic Document Excerpts', 'Latin Passage And Motto Selections', 'Advanced Grammar Logic And Rhetoric Terms', 'Timeline Synthesis', 'Final Recitation Portfolio', 'Public Performance Practice', 'Capstone Memory Review'],
      },
    },
  ];

  return plans.flatMap((plan) =>
    Array.from({ length: plan.endLevel - plan.startLevel + 1 }, (_, index) => plan.startLevel + index).map((level) => {
      const grade = level + 2;
      return {
        grade,
        folder: plan.folder,
        subject: plan.subject,
        title: `${plan.titleBase} ${roman(level)}`,
        description: `${plan.titleBase} ${roman(level)} builds ${plan.unitsByLevel[level].map((title) => title.toLowerCase()).slice(0, 4).join(', ')}, and cumulative application.`,
        ...colors[plan.subject],
        units: plan.unitsByLevel[level].map((title) => foundationUnit(plan.subject, level, title)),
      };
    }),
  );
}

function foundationUnit(subject: keyof typeof colors, level: number, title: string): UnitSpec {
  const slug = slugify(title);
  return {
    slug,
    title,
    description: `Practice ${title.toLowerCase()} through direct teaching, guided recognition, application, and cumulative review.`,
    lessons: [
      {
        slug,
        title,
        config: introCard(title, `This lesson introduces ${title.toLowerCase()} and connects it to earlier foundation work.`, [
          'Name the key idea.',
          'Recognize it in a short example.',
          'Apply it in a brief response.',
        ]),
        questions: foundationQuestions(subject, level, title),
      },
    ],
  };
}

function foundationQuestions(subject: keyof typeof colors, level: number, title: string): Question[] {
  const terms = foundationTerms(subject, title);
  return [
    {
      type: 'multiple-choice',
      prompt: `Which choice best fits ${title}?`,
      choices: [terms[0].meaning, terms[1].meaning, terms[2].meaning, terms[3].meaning],
      correctAnswer: terms[0].meaning,
      explanation: `${title} focuses first on ${terms[0].meaning}.`,
    },
    {
      type: 'fill-blank',
      prompt: `${terms[1].meaning} is called ___.`,
      sentenceBefore: `${terms[1].meaning} is called`,
      sentenceAfter: '.',
      choices: terms.slice(0, 4).map((term) => term.term),
      correctAnswer: terms[1].term,
      explanation: `The clue gives the meaning of ${terms[1].term}.`,
    },
    {
      type: 'match-pairs',
      prompt: `Match each ${subjectLabel(subject).toLowerCase()} term to its meaning.`,
      pairs: terms.slice(0, 4).map((term) => ({ left: term.term, right: term.meaning })),
      explanation: 'These terms give students the language for the skill.',
    },
    {
      type: 'order-items',
      prompt: 'Put the learning routine in order.',
      items: ['try a short application', 'name the idea', 'review an older skill', 'study an example'],
      correctOrder: ['review an older skill', 'name the idea', 'study an example', 'try a short application'],
      explanation: 'The sequence keeps new work connected to prior knowledge.',
    },
    {
      type: 'passage-question',
      prompt: 'Read the short passage and answer.',
      passageTitle: title,
      passage: `${subjectLabel(subject)} students studied ${title}. They noticed that "${terms[4].term}" means ${terms[4].meaning}. Then they used the idea in a short discussion, written note, or oral response.`,
      question: `Which term means "${terms[4].meaning}"?`,
      choices: [terms[4].term, terms[5].term, terms[0].term, terms[1].term],
      correctAnswer: terms[4].term,
      explanation: 'The passage states the meaning of the target term.',
    },
    {
      type: 'multiple-choice',
      prompt: level >= 4 ? 'Which answer shows more advanced independent work?' : 'Which answer shows careful practice?',
      choices: ['Use a model or source and explain the reason', 'Guess without reading', 'Copy a word without meaning', 'Skip the example'],
      correctAnswer: 'Use a model or source and explain the reason',
      explanation: 'Foundation tracks emphasize clear thinking, sources, models, and explanation.',
    },
    {
      type: 'text-input',
      prompt: `Type the term that means "${terms[5].meaning}".`,
      acceptedAnswers: [terms[5].term],
      answerType: 'text',
      explanation: `The term is ${terms[5].term}.`,
    },
    {
      type: 'constructed-response',
      prompt: `Write one short response applying ${title.toLowerCase()} to a reading, sentence, source, speech, or recitation.`,
      minWords: level >= 4 ? 10 : 6,
      sampleAnswer: `I can use ${terms[0].term} by studying the example and explaining the reason in my own words.`,
      checklist: ['Use a lesson term', 'Explain your reasoning or performance choice'],
    },
  ];
}

function foundationTerms(subject: keyof typeof colors, title: string): Word[] {
  const common: Word[] = [
    { term: 'model', meaning: 'an example that shows how a skill works' },
    { term: 'evidence', meaning: 'details that support an answer' },
    { term: 'context', meaning: 'the surrounding information that helps meaning' },
    { term: 'review', meaning: 'practice that brings older skills back' },
    { term: 'application', meaning: 'using a skill in a real task' },
    { term: 'explanation', meaning: 'a statement that tells how or why' },
  ];
  const subjectBanks: Record<string, Word[]> = {
    grammar: [
      { term: 'phrase', meaning: 'a group of words without both subject and verb' },
      { term: 'clause', meaning: 'a group of words with a subject and verb' },
      { term: 'modifier', meaning: 'a word or group of words that describes' },
      { term: 'agreement', meaning: 'matching forms that belong together' },
      { term: 'diagram', meaning: 'a visual map of a sentence' },
      { term: 'register', meaning: 'language style that fits the situation' },
    ],
    logic: [
      { term: 'claim', meaning: 'a statement someone tries to prove' },
      { term: 'premise', meaning: 'a reason used to support a conclusion' },
      { term: 'conclusion', meaning: 'the point an argument tries to show' },
      { term: 'validity', meaning: 'whether the reasoning form works' },
      { term: 'counterexample', meaning: 'an example that disproves a general claim' },
      { term: 'truth table', meaning: 'a table that tests symbolic statements' },
    ],
    rhetoric: [
      { term: 'audience', meaning: 'the people a speaker or writer addresses' },
      { term: 'arrangement', meaning: 'the order of parts in a speech or essay' },
      { term: 'ethos', meaning: 'appeal based on character or credibility' },
      { term: 'pathos', meaning: 'appeal to emotion' },
      { term: 'logos', meaning: 'appeal to reason and evidence' },
      { term: 'delivery', meaning: 'how words are spoken or presented' },
    ],
    literature: [
      { term: 'theme', meaning: 'a central idea in a work' },
      { term: 'genre', meaning: 'a kind of literature' },
      { term: 'adaptation', meaning: 'a retelling or changed version of a work' },
      { term: 'motif', meaning: 'a repeated image, idea, or pattern' },
      { term: 'allusion', meaning: 'a reference to another story or event' },
      { term: 'commonplace', meaning: 'a collected quotation or idea for later reflection' },
    ],
    'history-civics': [
      { term: 'inquiry', meaning: 'an investigation guided by questions' },
      { term: 'primary source', meaning: 'evidence from the time being studied' },
      { term: 'secondary source', meaning: 'later explanation of an event or period' },
      { term: 'chronology', meaning: 'events in time order' },
      { term: 'civic responsibility', meaning: 'a duty people have in a community' },
      { term: 'policy', meaning: 'a plan or rule for public action' },
    ],
    'memory-work': [
      { term: 'recitation', meaning: 'speaking memorized words aloud' },
      { term: 'retrieval', meaning: 'bringing knowledge back from memory' },
      { term: 'stanza', meaning: 'a group of lines in a poem' },
      { term: 'motto', meaning: 'a short phrase that expresses an idea' },
      { term: 'timeline anchor', meaning: 'a remembered point that organizes history' },
      { term: 'portfolio', meaning: 'a collection of polished work' },
    ],
  };
  return rotate([...(subjectBanks[subject] ?? []), ...common], title.length % 6).slice(0, 6);
}

function subjectLabel(subject: keyof typeof colors) {
  return titleCase(subject.replace('-', ' '));
}

function roman(value: number) {
  return ['I', 'II', 'III', 'IV', 'V'][value - 1] ?? String(value);
}
