import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, join, relative } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { z } from 'zod';
import type { ExerciseType, QuestionMedia, QuestionPayload } from './lesson-engine';

export type ChildFixture = {
  id: string;
  slug: 'reagan' | 'ada';
  displayName: string;
  avatarKey: string;
  levelBand: string;
  gradeLevel: number;
  subjectGradeLevels?: Record<string, number>;
};

export type QuestionFixture = {
  type: ExerciseType;
  prompt: string;
  payload: QuestionPayload;
  explanation?: string;
};

export type LessonKind = 'standard' | 'mad-minute';

export type MadMinuteConfig = {
  mode: 'multiplication';
  factor: number | 'mixed';
  minFactor?: number;
  maxFactor?: number;
  minMultiplier: number;
  maxMultiplier: number;
  durationSeconds: number;
  goalCorrect: number;
};

export type StandardLessonConfig = {
  intro?: Array<{
    title: string;
    body: string;
    bullets?: string[];
    media?: QuestionMedia;
  }>;
  review?: {
    mode?: 'deck' | 'spaced';
    label?: string;
    shuffleQuestions?: boolean;
  };
};

export type LessonConfig = MadMinuteConfig | StandardLessonConfig;

export type LessonFixture = {
  id: string;
  slug: string;
  title: string;
  xpBase: number;
  kind?: LessonKind;
  config?: LessonConfig;
  questions: QuestionFixture[];
};

export type UnitFixture = {
  id: string;
  slug: string;
  title: string;
  description: string;
  lessons: LessonFixture[];
};

export type TrackFixture = {
  id: string;
  slug: string;
  subject: string;
  gradeLevel: number;
  title: string;
  description: string;
  color: string;
  accent: string;
  units: UnitFixture[];
};

type LessonWithContext = LessonFixture & {
  track: TrackFixture;
  unit: UnitFixture;
};

export const PARENT_ID = 'parent_bill';
export const PARENT_USERNAME = 'bill';
export const PARENT_EMAIL = 'bill@learn.billplustara.com';

export const CHILDREN: ChildFixture[] = [
  {
    id: 'child_reagan',
    slug: 'reagan',
    displayName: 'Reagan',
    avatarKey: 'berry-builder',
    levelBand: 'Grade 6',
    gradeLevel: 6,
    subjectGradeLevels: {
      spanish: 3,
    },
  },
  {
    id: 'child_ada',
    slug: 'ada',
    displayName: 'Ada',
    avatarKey: 'teal-tinkerer',
    levelBand: 'Grade 3',
    gradeLevel: 3,
  },
];

const curriculumRoot = join(process.cwd(), 'src/content/curriculum');

const slugSchema = z.string().min(1).regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/);
const stringListSchema = z.array(z.coerce.string()).min(1);
const pairSchema = z.object({
  left: z.coerce.string(),
  right: z.coerce.string(),
});

const trackFileSchema = z.object({
  id: z.string().min(1),
  slug: slugSchema,
  subject: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  color: z.string().min(1),
  accent: z.string().min(1),
});

const unitFileSchema = z.object({
  id: z.string().min(1),
  slug: slugSchema,
  title: z.string().min(1),
  description: z.string().min(1),
});

const madMinuteConfigSchema = z.object({
  mode: z.literal('multiplication'),
  factor: z.union([z.number().int(), z.literal('mixed')]),
  minFactor: z.number().int().optional(),
  maxFactor: z.number().int().optional(),
  minMultiplier: z.number().int(),
  maxMultiplier: z.number().int(),
  durationSeconds: z.number().int().positive(),
  goalCorrect: z.number().int().positive(),
});

const mediaSchema = z.object({
  image: z
    .object({
      src: z.string().min(1),
      alt: z.string().min(1),
      caption: z.string().optional(),
    })
    .optional(),
  audio: z
    .object({
      src: z.string().min(1),
      label: z.string().optional(),
      transcript: z.string().optional(),
    })
    .optional(),
  video: z
    .object({
      src: z.string().min(1),
      label: z.string().optional(),
    })
    .optional(),
});

const teachingCardSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  bullets: stringListSchema.optional(),
  media: mediaSchema.optional(),
});

const standardLessonConfigSchema = z.object({
  intro: z.array(teachingCardSchema).min(1).optional(),
  review: z
    .object({
      mode: z.enum(['deck', 'spaced']).default('deck'),
      label: z.string().optional(),
      shuffleQuestions: z.boolean().optional(),
    })
    .optional(),
});

const baseQuestionSchema = z.object({
  prompt: z.string().min(1),
  explanation: z.string().optional(),
  media: mediaSchema.optional(),
});

const multipleChoiceQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('multiple-choice'),
  choices: stringListSchema,
  correctAnswer: z.coerce.string(),
});

const textInputQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('text-input'),
  acceptedAnswers: stringListSchema,
  answerType: z.enum(['text', 'number']).default('text'),
});

const fillBlankQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('fill-blank'),
  sentenceBefore: z.coerce.string(),
  sentenceAfter: z.coerce.string(),
  choices: stringListSchema,
  correctAnswer: z.coerce.string(),
});

const matchPairsQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('match-pairs'),
  pairs: z.array(pairSchema).min(1),
});

const orderItemsQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('order-items'),
  items: stringListSchema,
  correctOrder: stringListSchema,
  unorderedGroupsOf: z.number().int().min(2).optional(),
});

const passageQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('passage-question'),
  passageTitle: z.string().optional(),
  passage: z.string().min(1),
  question: z.string().min(1),
  choices: stringListSchema,
  correctAnswer: z.coerce.string(),
});

const multiBlankClozeQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('multi-blank-cloze'),
  parts: stringListSchema,
  blanks: z
    .array(
      z.object({
        label: z.string().optional(),
        correctAnswer: z.coerce.string(),
        acceptedAnswers: stringListSchema.optional(),
        answerType: z.enum(['text', 'number']).default('text'),
        choices: stringListSchema.optional(),
      }),
    )
    .min(1),
});

const constructedResponseQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('constructed-response'),
  sampleAnswer: z.string().optional(),
  minWords: z.number().int().positive().optional(),
  minCharacters: z.number().int().positive().optional(),
  checklist: stringListSchema.optional(),
});

const dialogueBuilderQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('dialogue-builder'),
  turns: z.array(z.object({ speaker: z.string().min(1), line: z.string().min(1) })).min(1),
  choices: stringListSchema,
  correctAnswer: z.coerce.string(),
});

const listeningQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('listening-question'),
  audioSrc: z.string().min(1),
  audioLabel: z.string().optional(),
  transcript: z.string().optional(),
  choices: stringListSchema,
  correctAnswer: z.coerce.string(),
});

const speakingPromptQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('speaking-prompt'),
  sampleAnswer: z.string().optional(),
  minSeconds: z.number().int().positive().optional(),
  checklist: stringListSchema.optional(),
});

const errorCorrectionQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('error-correction'),
  sentence: z.string().min(1),
  acceptedAnswers: stringListSchema,
});

const conjugationGridQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('conjugation-grid'),
  columns: stringListSchema,
  rows: z
    .array(
      z.object({
        label: z.string().min(1),
        answers: z.array(z.union([z.coerce.string(), stringListSchema])).min(1),
      }),
    )
    .min(1),
});

const flashCardQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('flash-card'),
  mode: z.enum(['easy', 'hard']),
  front: z.coerce.string(),
  choices: stringListSchema.optional(),
  correctAnswer: z.coerce.string().optional(),
  acceptedAnswers: stringListSchema.optional(),
  answerType: z.enum(['text', 'number']).default('text'),
});

const questionSchema = z.discriminatedUnion('type', [
  multipleChoiceQuestionSchema,
  textInputQuestionSchema,
  fillBlankQuestionSchema,
  matchPairsQuestionSchema,
  orderItemsQuestionSchema,
  passageQuestionSchema,
  multiBlankClozeQuestionSchema,
  constructedResponseQuestionSchema,
  dialogueBuilderQuestionSchema,
  listeningQuestionSchema,
  speakingPromptQuestionSchema,
  errorCorrectionQuestionSchema,
  conjugationGridQuestionSchema,
  flashCardQuestionSchema,
]);

const lessonFileSchema = z.object({
  id: z.string().min(1),
  slug: slugSchema,
  title: z.string().min(1),
  xpBase: z.number().int().positive().default(10),
  kind: z.enum(['standard', 'mad-minute']).default('standard'),
  config: z.union([madMinuteConfigSchema, standardLessonConfigSchema]).optional(),
  questions: z.array(questionSchema).default([]),
});

type AuthoredQuestion = z.infer<typeof questionSchema>;
type AuthoredLesson = z.infer<typeof lessonFileSchema>;

export const TRACKS: TrackFixture[] = loadCurriculum();
export const GRADE_3_TRACKS: TrackFixture[] = getTracksForGrade(3);
export const GRADE_6_TRACKS: TrackFixture[] = getTracksForGrade(6);
const SUBJECT_ORDER = Array.from(new Set(TRACKS.map((track) => track.subject)));

export function getTracksForGrade(gradeLevel: number) {
  return TRACKS.filter((track) => track.gradeLevel === gradeLevel);
}

export function getTracksForChild(child: ChildFixture) {
  return TRACKS.filter((track) => track.gradeLevel === getSubjectGradeLevel(child, track.subject)).sort(compareBySubjectOrder);
}

export function getSubjectGradeLevel(child: ChildFixture, subject: string) {
  return child.subjectGradeLevels?.[subject] ?? child.gradeLevel;
}

export function getChildBySlug(slug: string) {
  return CHILDREN.find((child) => child.slug === slug) ?? null;
}

export function getAllLessons(): LessonWithContext[] {
  return TRACKS.flatMap((track) =>
    track.units.flatMap((unit) =>
      unit.lessons.map((lesson) => ({
        ...lesson,
        track,
        unit,
      })),
    ),
  );
}

export function getAllQuestions() {
  return getAllLessons().flatMap((lesson) =>
    lesson.questions.map((question, index) => ({
      ...question,
      id: `${lesson.id}_q${String(index + 1).padStart(2, '0')}`,
      lessonId: lesson.id,
      sortOrder: index + 1,
    })),
  );
}

export function getLessonPaths() {
  return CHILDREN.flatMap((child) =>
    getTracksForChild(child).flatMap((track) =>
      track.units.flatMap((unit) =>
        unit.lessons.map((lesson) => ({
          childSlug: child.slug,
          lessonId: lesson.id,
        })),
      ),
    ),
  );
}

export function getTrackPaths() {
  return CHILDREN.flatMap((child) =>
    getTracksForChild(child).map((track) => ({
      childSlug: child.slug,
      trackSlug: track.slug,
    })),
  );
}

function loadCurriculum() {
  if (!existsSync(curriculumRoot)) throw new Error(`Curriculum root not found: ${curriculumRoot}`);

  return childDirectories(curriculumRoot).flatMap((gradeDir) => {
    const gradeLevel = parseGradeLevel(gradeDir.name);
    return childDirectories(gradeDir.path).map((trackDir) => loadTrack(trackDir.path, gradeLevel));
  });
}

function loadTrack(trackDir: string, gradeLevel: number): TrackFixture {
  const track = readYaml(trackFileSchema, join(trackDir, 'track.yaml'));
  return {
    ...track,
    gradeLevel,
    units: childDirectories(trackDir).map((unitDir) => loadUnit(unitDir.path)),
  };
}

function loadUnit(unitDir: string): UnitFixture {
  const unit = readYaml(unitFileSchema, join(unitDir, 'unit.yaml'));
  return {
    ...unit,
    lessons: markdownFiles(unitDir).map((lessonPath) => loadLesson(lessonPath)),
  };
}

function loadLesson(lessonPath: string): LessonFixture {
  const lesson = readLesson(lessonPath);
  const kind = lesson.kind ?? 'standard';

  if (kind === 'mad-minute' && (!lesson.config || !isMadMinuteConfig(lesson.config))) {
    throw new Error(`Mad Minute lesson missing config: ${displayPath(lessonPath)}`);
  }
  if (kind === 'standard' && lesson.config && isMadMinuteConfig(lesson.config)) {
    throw new Error(`Standard lesson cannot use Mad Minute config: ${displayPath(lessonPath)}`);
  }
  if (kind === 'standard' && lesson.questions.length === 0) {
    throw new Error(`Standard lesson has no questions: ${displayPath(lessonPath)}`);
  }

  return {
    id: lesson.id,
    slug: lesson.slug,
    title: lesson.title,
    xpBase: lesson.xpBase,
    ...(kind === 'standard' ? {} : { kind }),
    ...(lesson.config ? { config: lesson.config } : {}),
    questions: lesson.questions.map(normalizeQuestion),
  };
}

function normalizeQuestion(question: AuthoredQuestion): QuestionFixture {
  if (question.type === 'multiple-choice') {
    return {
      type: question.type,
      prompt: question.prompt,
      payload: withMedia({ choices: question.choices, correctAnswer: question.correctAnswer }, question),
      explanation: question.explanation,
    };
  }

  if (question.type === 'text-input') {
    return {
      type: question.type,
      prompt: question.prompt,
      payload: withMedia({ acceptedAnswers: question.acceptedAnswers, answerType: question.answerType }, question),
      explanation: question.explanation,
    };
  }

  if (question.type === 'fill-blank') {
    return {
      type: question.type,
      prompt: question.prompt,
      payload: withMedia({
        sentenceBefore: question.sentenceBefore,
        sentenceAfter: question.sentenceAfter,
        choices: question.choices,
        correctAnswer: question.correctAnswer,
      }, question),
      explanation: question.explanation,
    };
  }

  if (question.type === 'match-pairs') {
    return {
      type: question.type,
      prompt: question.prompt,
      payload: withMedia({ pairs: question.pairs }, question),
      explanation: question.explanation,
    };
  }

  if (question.type === 'order-items') {
    return {
      type: question.type,
      prompt: question.prompt,
      payload: withMedia({
        items: question.items,
        correctOrder: question.correctOrder,
        unorderedGroupsOf: question.unorderedGroupsOf,
      }, question),
      explanation: question.explanation,
    };
  }

  if (question.type === 'passage-question') {
    return {
      type: question.type,
      prompt: question.prompt,
      payload: withMedia({
        passageTitle: question.passageTitle,
        passage: question.passage,
        question: question.question,
        choices: question.choices,
        correctAnswer: question.correctAnswer,
      }, question),
      explanation: question.explanation,
    };
  }

  if (question.type === 'multi-blank-cloze') {
    return {
      type: question.type,
      prompt: question.prompt,
      payload: withMedia({ parts: question.parts, blanks: question.blanks }, question),
      explanation: question.explanation,
    };
  }

  if (question.type === 'constructed-response') {
    return {
      type: question.type,
      prompt: question.prompt,
      payload: withMedia({
        sampleAnswer: question.sampleAnswer,
        minWords: question.minWords,
        minCharacters: question.minCharacters,
        checklist: question.checklist,
      }, question),
      explanation: question.explanation,
    };
  }

  if (question.type === 'dialogue-builder') {
    return {
      type: question.type,
      prompt: question.prompt,
      payload: withMedia({
        turns: question.turns,
        choices: question.choices,
        correctAnswer: question.correctAnswer,
      }, question),
      explanation: question.explanation,
    };
  }

  if (question.type === 'listening-question') {
    return {
      type: question.type,
      prompt: question.prompt,
      payload: withMedia({
        audioSrc: question.audioSrc,
        audioLabel: question.audioLabel,
        transcript: question.transcript,
        choices: question.choices,
        correctAnswer: question.correctAnswer,
      }, question),
      explanation: question.explanation,
    };
  }

  if (question.type === 'speaking-prompt') {
    return {
      type: question.type,
      prompt: question.prompt,
      payload: withMedia({
        sampleAnswer: question.sampleAnswer,
        minSeconds: question.minSeconds,
        checklist: question.checklist,
      }, question),
      explanation: question.explanation,
    };
  }

  if (question.type === 'error-correction') {
    return {
      type: question.type,
      prompt: question.prompt,
      payload: withMedia({
        sentence: question.sentence,
        acceptedAnswers: question.acceptedAnswers,
      }, question),
      explanation: question.explanation,
    };
  }

  if (question.type === 'flash-card') {
    return {
      type: question.type,
      prompt: question.prompt,
      payload: withMedia({
        mode: question.mode,
        front: question.front,
        choices: question.choices,
        correctAnswer: question.correctAnswer,
        acceptedAnswers: question.acceptedAnswers,
        answerType: question.answerType,
      }, question),
      explanation: question.explanation,
    };
  }

  return {
    type: question.type,
    prompt: question.prompt,
    payload: withMedia({
      columns: question.columns,
      rows: question.rows,
    }, question),
    explanation: question.explanation,
  };
}

function isMadMinuteConfig(config: LessonConfig): config is MadMinuteConfig {
  return 'mode' in config && config.mode === 'multiplication';
}

function withMedia<T extends QuestionPayload>(payload: T, question: { media?: QuestionMedia }) {
  return question.media ? ({ ...payload, media: question.media } as T) : payload;
}

function readLesson(lessonPath: string): AuthoredLesson {
  const contents = readFileSync(lessonPath, 'utf8');
  const match = contents.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n[\s\S]*)?$/);
  if (!match) throw new Error(`Lesson is missing YAML frontmatter: ${displayPath(lessonPath)}`);
  return parseWithSchema(lessonFileSchema, parseYaml(match[1]), lessonPath);
}

function readYaml<T extends z.ZodTypeAny>(schema: T, path: string): z.infer<T> {
  return parseWithSchema(schema, parseYaml(readFileSync(path, 'utf8')), path);
}

function parseWithSchema<T extends z.ZodTypeAny>(schema: T, value: unknown, path: string): z.infer<T> {
  const parsed = schema.safeParse(value);
  if (parsed.success) return parsed.data;

  const issues = parsed.error.issues.map((issue) => `${issue.path.join('.') || '(root)'}: ${issue.message}`).join('; ');
  throw new Error(`Invalid curriculum file ${displayPath(path)}: ${issues}`);
}

function childDirectories(path: string) {
  return readdirSync(path, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({ name: entry.name, path: join(path, entry.name) }))
    .sort(compareByName);
}

function markdownFiles(path: string) {
  return readdirSync(path, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => join(path, entry.name))
    .sort((a, b) => basename(a).localeCompare(basename(b), undefined, { numeric: true }));
}

function compareByName(a: { name: string }, b: { name: string }) {
  return a.name.localeCompare(b.name, undefined, { numeric: true });
}

function compareBySubjectOrder(a: TrackFixture, b: TrackFixture) {
  const subjectOrder = SUBJECT_ORDER.indexOf(a.subject) - SUBJECT_ORDER.indexOf(b.subject);
  if (subjectOrder !== 0) return subjectOrder;
  return a.gradeLevel - b.gradeLevel;
}

function parseGradeLevel(name: string) {
  const match = name.match(/^grade-(\d{2})$/);
  if (!match) throw new Error(`Grade folder must look like grade-03: ${name}`);

  const gradeLevel = Number(match[1]);
  if (!Number.isInteger(gradeLevel) || gradeLevel < 1 || gradeLevel > 12) {
    throw new Error(`Grade folder must be between grade-01 and grade-12: ${name}`);
  }
  return gradeLevel;
}

function displayPath(path: string) {
  return relative(process.cwd(), path);
}
