import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, join, relative } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { z } from 'zod';
import {
  isMadMinuteConfig,
  LessonKindSchema,
  MadMinuteConfigSchema,
  MediaSchema,
  StandardLessonConfigSchema,
  type LessonConfig,
  type LessonKind,
} from './lesson-config';
import type { ExerciseType, QuestionMedia, QuestionPayload } from './lesson-engine';

export type QuestionFixture = {
  type: ExerciseType;
  prompt: string;
  payload: QuestionPayload;
  explanation?: string;
};

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

export type CurriculumDuplicate = {
  kind: 'track' | 'unit' | 'lesson' | 'question';
  id: string;
  paths: string[];
};

export type CurriculumSummaryRow = {
  gradeLevel: number;
  subject: string;
  tracks: number;
  units: number;
  lessons: number;
  questions: number;
};

export type CurriculumSummary = {
  rows: CurriculumSummaryRow[];
  totals: {
    tracks: number;
    units: number;
    lessons: number;
    questions: number;
  };
};

type LessonWithContext = LessonFixture & {
  track: TrackFixture;
  unit: UnitFixture;
};

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

const baseQuestionSchema = z.object({
  prompt: z.string().min(1),
  explanation: z.string().optional(),
  media: MediaSchema.optional(),
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
  kind: LessonKindSchema.default('standard'),
  config: z.union([MadMinuteConfigSchema, StandardLessonConfigSchema]).optional(),
  questions: z.array(questionSchema).default([]),
});

type AuthoredQuestion = z.infer<typeof questionSchema>;
type AuthoredLesson = z.infer<typeof lessonFileSchema>;

export const TRACKS: TrackFixture[] = loadCurriculumFromRoot();
export const GRADE_3_TRACKS: TrackFixture[] = getTracksForGrade(3);
export const GRADE_6_TRACKS: TrackFixture[] = getTracksForGrade(6);

export function getTracksForGrade(gradeLevel: number) {
  return TRACKS.filter((track) => track.gradeLevel === gradeLevel);
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

export function loadCurriculumFromRoot(root = curriculumRoot) {
  if (!existsSync(root)) throw new Error(`Curriculum root not found: ${root}`);

  const tracks = childDirectories(root).flatMap((gradeDir) => {
    const gradeLevel = parseGradeLevel(gradeDir.name);
    return childDirectories(gradeDir.path).map((trackDir) => loadTrack(trackDir.path, gradeLevel));
  });
  validateCurriculum(tracks);
  return tracks;
}

export function validateCurriculum(tracks: TrackFixture[] = TRACKS) {
  const duplicates = findDuplicateCurriculumIds(tracks);
  if (duplicates.length === 0) return;

  const details = duplicates
    .map((duplicate) => `${duplicate.kind} id "${duplicate.id}" used by ${duplicate.paths.join(', ')}`)
    .join('; ');
  throw new Error(`Duplicate curriculum IDs found: ${details}`);
}

export function findDuplicateCurriculumIds(tracks: TrackFixture[]): CurriculumDuplicate[] {
  const seen = new Map<string, string[]>();

  for (const track of tracks) {
    addId(seen, 'track', track.id, `grade-${String(track.gradeLevel).padStart(2, '0')}/${track.slug}`);
    for (const unit of track.units) {
      const unitPath = `${track.slug}/${unit.slug}`;
      addId(seen, 'unit', unit.id, unitPath);
      for (const lesson of unit.lessons) {
        const lessonPath = `${unitPath}/${lesson.slug}`;
        addId(seen, 'lesson', lesson.id, lessonPath);
        lesson.questions.forEach((_, index) => {
          addId(seen, 'question', `${lesson.id}_q${String(index + 1).padStart(2, '0')}`, `${lessonPath}#q${index + 1}`);
        });
      }
    }
  }

  return Array.from(seen.entries())
    .filter(([, paths]) => paths.length > 1)
    .map(([key, paths]) => {
      const [kind, id] = key.split(':', 2) as [CurriculumDuplicate['kind'], string];
      return { kind, id, paths };
    });
}

export function summarizeCurriculum(tracks: TrackFixture[] = TRACKS): CurriculumSummary {
  const rowsByGradeSubject = new Map<string, CurriculumSummaryRow>();

  for (const track of tracks) {
    const key = `${track.gradeLevel}:${track.subject}`;
    const row =
      rowsByGradeSubject.get(key) ??
      {
        gradeLevel: track.gradeLevel,
        subject: track.subject,
        tracks: 0,
        units: 0,
        lessons: 0,
        questions: 0,
      };
    row.tracks += 1;
    row.units += track.units.length;
    row.lessons += track.units.reduce((total, unit) => total + unit.lessons.length, 0);
    row.questions += track.units.reduce(
      (total, unit) => total + unit.lessons.reduce((lessonTotal, lesson) => lessonTotal + lesson.questions.length, 0),
      0,
    );
    rowsByGradeSubject.set(key, row);
  }

  const rows = Array.from(rowsByGradeSubject.values()).sort((a, b) => a.gradeLevel - b.gradeLevel || a.subject.localeCompare(b.subject));
  return {
    rows,
    totals: rows.reduce(
      (totals, row) => ({
        tracks: totals.tracks + row.tracks,
        units: totals.units + row.units,
        lessons: totals.lessons + row.lessons,
        questions: totals.questions + row.questions,
      }),
      { tracks: 0, units: 0, lessons: 0, questions: 0 },
    ),
  };
}

export function formatCurriculumSummary(summary: CurriculumSummary) {
  const rows = summary.rows.map(
    (row) =>
      `Grade ${row.gradeLevel} ${row.subject}: ${row.tracks} track(s), ${row.units} unit(s), ${row.lessons} lesson(s), ${row.questions} question(s)`,
  );
  rows.push(
    `Totals: ${summary.totals.tracks} track(s), ${summary.totals.units} unit(s), ${summary.totals.lessons} lesson(s), ${summary.totals.questions} question(s)`,
  );
  return rows.join('\n');
}

function addId(seen: Map<string, string[]>, kind: CurriculumDuplicate['kind'], id: string, path: string) {
  const key = `${kind}:${id}`;
  seen.set(key, [...(seen.get(key) ?? []), path]);
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
