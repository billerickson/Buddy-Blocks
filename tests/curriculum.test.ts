import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import * as curriculum from '../src/lib/curriculum';
import {
  GRADE_3_TRACKS,
  GRADE_6_TRACKS,
  TRACKS,
  findDuplicateCurriculumIds,
  getAllLessons,
  getAllQuestions,
  getTracksForGrade,
  loadCurriculumFromRoot,
  summarizeCurriculum,
  validateCurriculum,
  type TrackFixture,
} from '../src/lib/curriculum';

describe('curriculum content', () => {
  it('loads curriculum without exporting fixed family fixtures', () => {
    expect('CHILDREN' in curriculum).toBe(false);
    expect('PARENT_USERNAME' in curriculum).toBe(false);
  });

  it('provides grade-specific curriculum tracks', () => {
    expect(getTracksForGrade(3).map((track) => track.subject)).toEqual(['math', 'vocabulary', 'spanish']);
    expect(getTracksForGrade(6).map((track) => track.subject)).toEqual(['math', 'vocabulary']);
  });

  it('provides the current curriculum shape', () => {
    expect(TRACKS).toHaveLength(5);
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'math')?.units.map((unit) => unit.slug)).toEqual([
      'addition-basics',
      'subtraction-basics',
      'place-value-rounding',
      'multiplication-concepts',
      'division-concepts',
      'multiplication-division-word-problems',
      'fractions',
      'measurement-time-money',
      'data-graphs',
      'geometry-area-perimeter',
      'mixed-problem-solving',
      'mad-minute',
    ]);
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'vocabulary')?.units.map((unit) => unit.slug)).toEqual([
      'word-meanings',
      'context-clues',
      'synonyms-antonyms',
      'multiple-meaning-words',
      'prefixes-suffixes',
      'roots-word-families',
      'reference-skills',
      'figurative-language',
      'academic-reading-words',
      'writing-revision-words',
      'cumulative-review',
    ]);
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'spanish')?.units.map((unit) => unit.slug)).toEqual([
      'greetings',
      'colors',
      'classroom-words',
      'numbers-calendar',
      'people-family',
      'likes-dislikes',
      'food-everyday-things',
      'places-actions',
      'simple-sentences',
      'cumulative-conversation-review',
    ]);
    expect(GRADE_6_TRACKS.find((track) => track.subject === 'math')?.units.map((unit) => unit.slug)).toEqual([
      'ratios-rates',
      'rational-number-operations',
      'fractions-decimals-percents',
      'expressions-equations',
      'inequalities-relationships',
      'coordinate-plane',
      'geometry',
      'statistics-data',
      'mixed-problem-solving',
      'mad-minute',
    ]);
    expect(GRADE_6_TRACKS.find((track) => track.subject === 'vocabulary')?.units.map((unit) => unit.slug)).toEqual([
      'context-reference-skills',
      'roots-send-write-law',
      'roots-good-hand-empty',
      'academic-reading',
      'genre-structure',
      'authors-craft',
      'argument-media',
      'writing-revision',
      'research-inquiry-vocabulary',
      'cumulative-review',
    ]);
    expect(getAllLessons()).toHaveLength(256);
    expect(getAllQuestions()).toHaveLength(1934);
  });

  it('adds mad minute multiplication fact practice per grade', () => {
    for (const tracks of [GRADE_3_TRACKS, GRADE_6_TRACKS]) {
      const madMinute = tracks.find((track) => track.subject === 'math')?.units.find((unit) => unit.slug === 'mad-minute');
      expect(madMinute?.lessons.map((lesson) => lesson.slug)).toEqual([
        '2s',
        '3s',
        '4s',
        '5s',
        '6s',
        '7s',
        '8s',
        '9s',
        '10s',
        '11s',
        '12s',
        'mixed',
      ]);
      expect(madMinute?.lessons.every((lesson) => lesson.kind === 'mad-minute')).toBe(true);
      expect(
        madMinute?.lessons.every(
          (lesson) => lesson.config && 'durationSeconds' in lesson.config && lesson.config.durationSeconds === 60,
        ),
      ).toBe(true);
      expect(
        madMinute?.lessons.every(
          (lesson) => lesson.config && 'goalCorrect' in lesson.config && lesson.config.goalCorrect === 40,
        ),
      ).toBe(true);
    }
  });

  it('loads grade folders dynamically and preserves numeric folder order', () => {
    const root = createTempCurriculumRoot();
    writeTrack(root, 'grade-07', '02-vocabulary', {
      id: 'track_grade7_vocabulary',
      slug: 'grade-7-vocabulary',
      subject: 'vocabulary',
      title: 'Vocabulary',
    });
    writeUnit(root, 'grade-07', '02-vocabulary', '02-context', {
      id: 'unit_grade7_vocabulary_context',
      slug: 'context',
      title: 'Context',
    });
    writeLesson(root, 'grade-07', '02-vocabulary', '02-context', '02-second.md', {
      id: 'lesson_grade7_vocabulary_second',
      slug: 'second',
      title: 'Second',
    });
    writeLesson(root, 'grade-07', '02-vocabulary', '02-context', '01-first.md', {
      id: 'lesson_grade7_vocabulary_first',
      slug: 'first',
      title: 'First',
    });
    writeUnit(root, 'grade-07', '02-vocabulary', '01-roots', {
      id: 'unit_grade7_vocabulary_roots',
      slug: 'roots',
      title: 'Roots',
    });
    writeLesson(root, 'grade-07', '02-vocabulary', '01-roots', '01-roots.md', {
      id: 'lesson_grade7_vocabulary_roots',
      slug: 'roots',
      title: 'Roots',
    });
    writeTrack(root, 'grade-07', '01-science', {
      id: 'track_grade7_science',
      slug: 'grade-7-science',
      subject: 'science',
      title: 'Science',
    });
    writeUnit(root, 'grade-07', '01-science', '01-cells', {
      id: 'unit_grade7_science_cells',
      slug: 'cells',
      title: 'Cells',
    });
    writeLesson(root, 'grade-07', '01-science', '01-cells', '01-cell-parts.md', {
      id: 'lesson_grade7_science_cell_parts',
      slug: 'cell-parts',
      title: 'Cell Parts',
    });

    const tracks = loadCurriculumFromRoot(root);

    expect(tracks.map((track) => [track.gradeLevel, track.subject])).toEqual([
      [7, 'science'],
      [7, 'vocabulary'],
    ]);
    const vocabulary = tracks.find((track) => track.subject === 'vocabulary');
    expect(vocabulary?.units.map((unit) => unit.slug)).toEqual(['roots', 'context']);
    expect(vocabulary?.units.find((unit) => unit.slug === 'context')?.lessons.map((lesson) => lesson.slug)).toEqual([
      'first',
      'second',
    ]);
  });

  it('detects duplicate track, unit, lesson, and generated question IDs', () => {
    const duplicateTracks: TrackFixture[] = [
      duplicateFixtureTrack('track_dup', 'one', 'unit_dup', 'lesson_dup'),
      duplicateFixtureTrack('track_dup', 'two', 'unit_dup', 'lesson_dup'),
    ];

    expect(findDuplicateCurriculumIds(duplicateTracks).map((duplicate) => [duplicate.kind, duplicate.id])).toEqual([
      ['track', 'track_dup'],
      ['unit', 'unit_dup'],
      ['lesson', 'lesson_dup'],
      ['question', 'lesson_dup_q01'],
    ]);
    expect(() => validateCurriculum(duplicateTracks)).toThrow(/Duplicate curriculum IDs found/);
  });

  it('summarizes curriculum by grade and subject for validation and seed output', () => {
    const summary = summarizeCurriculum(TRACKS);

    expect(summary.totals).toEqual({
      tracks: 5,
      units: 53,
      lessons: 256,
      questions: 1934,
    });
    expect(summary.rows.find((row) => row.gradeLevel === 3 && row.subject === 'math')).toMatchObject({
      tracks: 1,
      units: 12,
      lessons: 60,
      questions: 384,
    });
    expect(summary.rows.find((row) => row.gradeLevel === 3 && row.subject === 'vocabulary')).toMatchObject({
      tracks: 1,
      units: 11,
      lessons: 49,
      questions: 392,
    });
    expect(summary.rows.find((row) => row.gradeLevel === 3 && row.subject === 'spanish')).toMatchObject({
      tracks: 1,
      units: 10,
      lessons: 50,
      questions: 400,
    });
    expect(summary.rows.find((row) => row.gradeLevel === 6 && row.subject === 'math')).toMatchObject({
      tracks: 1,
      units: 10,
      lessons: 57,
      questions: 360,
    });
    expect(summary.rows.find((row) => row.gradeLevel === 6 && row.subject === 'vocabulary')).toMatchObject({
      tracks: 1,
      units: 10,
      lessons: 40,
      questions: 398,
    });
    expect(summary.rows.find((row) => row.gradeLevel === 6 && row.subject === 'spanish')).toBeUndefined();
  });
});

function createTempCurriculumRoot() {
  return mkdtempSync(join(tmpdir(), 'buddy-blocks-curriculum-'));
}

function writeTrack(
  root: string,
  gradeFolder: string,
  trackFolder: string,
  track: { id: string; slug: string; subject: string; title: string },
) {
  const trackDir = join(root, gradeFolder, trackFolder);
  mkdirSync(trackDir, { recursive: true });
  writeFileSync(
    join(trackDir, 'track.yaml'),
    `id: ${track.id}
slug: ${track.slug}
subject: ${track.subject}
title: ${track.title}
description: ${track.title} description
color: "#5b79ff"
accent: "#ffd84d"
`,
    'utf8',
  );
}

function writeUnit(
  root: string,
  gradeFolder: string,
  trackFolder: string,
  unitFolder: string,
  unit: { id: string; slug: string; title: string },
) {
  const unitDir = join(root, gradeFolder, trackFolder, unitFolder);
  mkdirSync(unitDir, { recursive: true });
  writeFileSync(
    join(unitDir, 'unit.yaml'),
    `id: ${unit.id}
slug: ${unit.slug}
title: ${unit.title}
description: ${unit.title} description
`,
    'utf8',
  );
}

function writeLesson(
  root: string,
  gradeFolder: string,
  trackFolder: string,
  unitFolder: string,
  fileName: string,
  lesson: { id: string; slug: string; title: string },
) {
  writeFileSync(
    join(root, gradeFolder, trackFolder, unitFolder, fileName),
    `---
id: ${lesson.id}
slug: ${lesson.slug}
title: ${lesson.title}
questions:
  - type: text-input
    prompt: Type yes.
    acceptedAnswers:
      - yes
---
`,
    'utf8',
  );
}

function duplicateFixtureTrack(id: string, slug: string, unitId: string, lessonId: string): TrackFixture {
  return {
    id,
    slug,
    subject: 'science',
    gradeLevel: 7,
    title: slug,
    description: slug,
    color: '#000',
    accent: '#fff',
    units: [
      {
        id: unitId,
        slug,
        title: slug,
        description: slug,
        lessons: [
          {
            id: lessonId,
            slug,
            title: slug,
            xpBase: 10,
            questions: [
              {
                type: 'text-input',
                prompt: 'Type yes.',
                payload: { acceptedAnswers: ['yes'], answerType: 'text' },
              },
            ],
          },
        ],
      },
    ],
  };
}
