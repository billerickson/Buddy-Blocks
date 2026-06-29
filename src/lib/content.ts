import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, join, relative } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { z } from 'zod';
import type { ExerciseType, QuestionPayload } from './lesson-engine';

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

export type LessonFixture = {
  id: string;
  slug: string;
  title: string;
  xpBase: number;
  kind?: LessonKind;
  config?: MadMinuteConfig;
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

const baseQuestionSchema = z.object({
  prompt: z.string().min(1),
  explanation: z.string().optional(),
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

const questionSchema = z.discriminatedUnion('type', [
  multipleChoiceQuestionSchema,
  textInputQuestionSchema,
  fillBlankQuestionSchema,
  matchPairsQuestionSchema,
  orderItemsQuestionSchema,
]);

const lessonFileSchema = z.object({
  id: z.string().min(1),
  slug: slugSchema,
  title: z.string().min(1),
  xpBase: z.number().int().positive().default(10),
  kind: z.enum(['standard', 'mad-minute']).default('standard'),
  config: madMinuteConfigSchema.optional(),
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

  if (kind === 'mad-minute' && !lesson.config) {
    throw new Error(`Mad Minute lesson missing config: ${displayPath(lessonPath)}`);
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
      payload: { choices: question.choices, correctAnswer: question.correctAnswer },
      explanation: question.explanation,
    };
  }

  if (question.type === 'text-input') {
    return {
      type: question.type,
      prompt: question.prompt,
      payload: { acceptedAnswers: question.acceptedAnswers, answerType: question.answerType },
      explanation: question.explanation,
    };
  }

  if (question.type === 'fill-blank') {
    return {
      type: question.type,
      prompt: question.prompt,
      payload: {
        sentenceBefore: question.sentenceBefore,
        sentenceAfter: question.sentenceAfter,
        choices: question.choices,
        correctAnswer: question.correctAnswer,
      },
      explanation: question.explanation,
    };
  }

  if (question.type === 'match-pairs') {
    return {
      type: question.type,
      prompt: question.prompt,
      payload: { pairs: question.pairs },
      explanation: question.explanation,
    };
  }

  return {
    type: question.type,
    prompt: question.prompt,
    payload: {
      items: question.items,
      correctOrder: question.correctOrder,
      unorderedGroupsOf: question.unorderedGroupsOf,
    },
    explanation: question.explanation,
  };
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
