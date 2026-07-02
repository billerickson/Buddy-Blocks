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
  findCurriculumIssues,
  getAllLessons,
  getAllQuestions,
  getTracksForGrade,
  loadCurriculumFromRoot,
  questionIdForLesson,
  summarizeCurriculum,
  validateCurriculum,
  type TrackFixture,
} from '../src/lib/curriculum';

const EXPECTED_GRADE_SUBJECTS: Record<number, string[]> = {
  3: [
    'math',
    'vocabulary',
    'spanish',
    'french',
    'grammar',
    'logic',
    'rhetoric',
    'literature',
    'history-civics',
    'memory-work',
  ],
  4: ['grammar', 'literature'],
  5: ['grammar', 'literature'],
  6: ['math', 'vocabulary', 'grammar', 'literature'],
  7: ['literature'],
};

const EXPECTED_SUMMARY_ROWS = [
  { gradeLevel: 3, subject: 'french', tracks: 1, units: 7, lessons: 28, questions: 168 },
  { gradeLevel: 3, subject: 'grammar', tracks: 1, units: 7, lessons: 26, questions: 156 },
  { gradeLevel: 3, subject: 'history-civics', tracks: 1, units: 8, lessons: 24, questions: 144 },
  { gradeLevel: 3, subject: 'literature', tracks: 1, units: 6, lessons: 24, questions: 144 },
  { gradeLevel: 3, subject: 'logic', tracks: 1, units: 6, lessons: 30, questions: 180 },
  { gradeLevel: 3, subject: 'math', tracks: 1, units: 12, lessons: 76, questions: 456 },
  { gradeLevel: 3, subject: 'memory-work', tracks: 1, units: 6, lessons: 22, questions: 132 },
  { gradeLevel: 3, subject: 'rhetoric', tracks: 1, units: 7, lessons: 30, questions: 180 },
  { gradeLevel: 3, subject: 'spanish', tracks: 1, units: 6, lessons: 30, questions: 180 },
  { gradeLevel: 3, subject: 'vocabulary', tracks: 1, units: 8, lessons: 36, questions: 216 },
  { gradeLevel: 4, subject: 'grammar', tracks: 1, units: 6, lessons: 25, questions: 150 },
  { gradeLevel: 4, subject: 'literature', tracks: 1, units: 6, lessons: 27, questions: 162 },
  { gradeLevel: 5, subject: 'grammar', tracks: 1, units: 6, lessons: 24, questions: 144 },
  { gradeLevel: 5, subject: 'literature', tracks: 1, units: 6, lessons: 22, questions: 132 },
  { gradeLevel: 6, subject: 'grammar', tracks: 1, units: 6, lessons: 24, questions: 144 },
  { gradeLevel: 6, subject: 'literature', tracks: 1, units: 6, lessons: 23, questions: 138 },
  { gradeLevel: 6, subject: 'math', tracks: 1, units: 9, lessons: 54, questions: 324 },
  { gradeLevel: 6, subject: 'vocabulary', tracks: 1, units: 8, lessons: 32, questions: 192 },
  { gradeLevel: 7, subject: 'literature', tracks: 1, units: 6, lessons: 26, questions: 156 },
];

describe('curriculum content', () => {
  it('loads curriculum without exporting fixed family fixtures', () => {
    expect('CHILDREN' in curriculum).toBe(false);
    expect('PARENT_USERNAME' in curriculum).toBe(false);
  });

  it('provides grade-specific curriculum tracks', () => {
    for (const [gradeLevel, subjects] of Object.entries(EXPECTED_GRADE_SUBJECTS)) {
      expect(getTracksForGrade(Number(gradeLevel)).map((track) => track.subject)).toEqual(subjects);
    }
  });

  it('provides the current curriculum shape', () => {
    expect(TRACKS).toHaveLength(EXPECTED_SUMMARY_ROWS.length);
    expect(TRACKS.map((track) => track.slug)).toEqual([
      'grade-3-math',
      'grade-3-vocabulary',
      'spanish-1',
      'french-1',
      'grammar-1',
      'logic-1',
      'rhetoric-1',
      'classical-literature-1',
      'history-and-civics-1',
      'memory-works-1',
      'grammar-2',
      'classical-literature-2',
      'grammar-3',
      'classical-literature-3',
      'grade-6-math',
      'grade-6-vocabulary',
      'grammar-4',
      'classical-literature-4',
      'classical-literature-5',
    ]);
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'math')?.units.map((unit) => unit.slug)).toEqual([
      'grade-3-number-readiness',
      'multiplication-as-equal-groups-and-arrays',
      'division-as-sharing-grouping-and-unknown-factors',
      'multiplication-and-division-strategies',
      'place-value-rounding-and-whole-number-operations',
      'four-operation-word-problems-and-equations',
      'fractions-as-equal-parts-and-numbers',
      'equivalent-fractions-and-fraction-comparison',
      'measurement-data-and-applied-quantitative-reasoning',
      'area-arrays-and-multiplication',
      'perimeter-geometry-and-shape-attributes',
      'cumulative-modeling-and-grade-3-mastery',
    ]);
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'vocabulary')?.units.map((unit) => unit.slug)).toEqual([
      'word-learning-routine-and-context-clues',
      'reference-tools-and-meaning-fit',
      'word-relationships-and-precision',
      'word-parts-and-word-families',
      'multiple-meanings-homophones-and-homographs',
      'literal-nonliteral-and-author-craft-language',
      'academic-and-content-area-vocabulary',
      'cumulative-word-solving-transfer',
    ]);
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'spanish')?.units.map((unit) => unit.slug)).toEqual([
      'first-spanish-moves',
      'numbers-calendar-weather-and-time',
      'classroom-objects-and-descriptions',
      'people-family-and-personal-identity',
      'likes-activities-and-school-life',
      'food-places-routines-and-novice-capstone',
    ]);
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'french')?.units.map((unit) => unit.slug)).toEqual([
      'first-french-for-real-interaction',
      'numbers-calendar-weather-and-colors',
      'introducing-myself-and-asking-questions',
      'family-people-and-descriptions',
      'likes-activities-and-opinions',
      'school-objects-and-everyday-places',
      'food-choices-routines-and-novice-capstone',
    ]);
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'grammar')?.units.map((unit) => unit.slug)).toEqual([
      'sentences-subjects-and-predicates',
      'nouns-articles-pronouns-and-ownership',
      'verbs-time-and-agreement',
      'adjectives-adverbs-and-precise-description',
      'prepositions-conjunctions-and-sentence-expansion',
      'capitalization-commas-and-dialogue-signals',
      'cumulative-editing-and-grammar-for-writing',
    ]);
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'logic')?.units.map((unit) => unit.slug)).toEqual([
      'claims-reasons-and-tiny-arguments',
      'support-evidence-and-relevance',
      'conclusions-from-clues',
      'rules-causes-and-categories',
      'weak-reasoning-and-careful-fixes',
      'careful-thinking-across-subjects',
    ]);
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'rhetoric')?.units.map((unit) => unit.slug)).toEqual([
      'purposeful-communication',
      'stories-that-make-a-point',
      'description-and-amplification',
      'claims-reasons-and-examples',
      'comparison-and-fair-evaluation',
      'revision-and-short-delivery',
      'cumulative-rhetoric-studio',
    ]);
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'literature')?.units.map((unit) => unit.slug)).toEqual([
      'fables-morals-and-story-elements',
      'folktales-tricksters-and-story-patterns',
      'myths-names-and-cultural-meaning',
      'heroes-quests-and-consequences',
      'poetry-sound-and-image',
      'dialogue-comparison-and-final-transfer',
    ]);
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'literature')?.units[0]?.lessons[0]?.questions[0]).toMatchObject({
      type: 'order-items',
      payload: {
        passageTitle: 'The Crow And The Pitcher',
        passage: expect.stringContaining('A thirsty crow searched for water'),
      },
    });
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'history-civics')?.units.map((unit) => unit.slug)).toEqual([
      'time-sequence-and-change',
      'maps-globes-and-places',
      'sources-clues-and-evidence',
      'communities-rules-and-civic-life',
      'needs-wants-work-and-trade',
      'culture-daily-life-and-historical-stories',
      'symbols-documents-and-shared-ideals',
      'inquiry-capstone-claims-with-evidence',
    ]);
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'memory-work')?.units.map((unit) => unit.slug)).toEqual([
      'memory-practice-habits',
      'sayings-meaning-and-exact-words',
      'poems-rhythm-and-recitation',
      'facts-forms-and-patterns',
      'maps-timelines-and-ordered-knowledge',
      'cumulative-recall-and-confident-performance',
    ]);
    expect(GRADE_6_TRACKS.find((track) => track.subject === 'math')?.units.map((unit) => unit.slug)).toEqual([
      'operation-readiness-and-number-sense',
      'ratio-language-and-equivalent-ratios',
      'unit-rates-percents-and-applied-rates',
      'fraction-division-and-decimal-fluency',
      'rational-numbers-and-the-coordinate-plane',
      'expressions-equivalence-and-algebraic-language',
      'equations-inequalities-and-variable-relationships',
      'geometry-measurement-and-coordinate-figures',
      'statistics-financial-decisions-and-cumulative-modeling',
    ]);
    expect(GRADE_6_TRACKS.find((track) => track.subject === 'vocabulary')?.units.map((unit) => unit.slug)).toEqual([
      'strategic-word-learning-in-context',
      'morphology-and-word-families',
      'academic-vocabulary-for-reading-tasks-and-discussion',
      'disciplinary-vocabulary-across-subjects',
      'connotation-denotation-and-precise-word-choice',
      'figurative-language-and-author-craft',
      'argument-media-and-source-vocabulary',
      'research-revision-and-cumulative-transfer',
    ]);
    expect(getTracksForGrade(4).find((track) => track.subject === 'literature')?.units.map((unit) => unit.slug)).toEqual([
      'story-tools-for-longer-tales',
      'fables-folktales-motives-and-morals',
      'myth-cycles-names-places-and-patterns',
      'quests-tests-and-heroic-choices',
      'poetry-sound-and-image',
      'versions-drama-and-transfer',
    ]);
    expect(getTracksForGrade(4).find((track) => track.subject === 'grammar')?.units.map((unit) => unit.slug)).toEqual([
      'sentences-and-nouns-that-name-clearly',
      'pronouns-and-clear-reference',
      'verb-phrases-and-time',
      'expanding-sentences-with-purpose',
      'punctuation-that-shows-structure',
      'visual-grammar-and-cumulative-editing',
    ]);
    expect(getTracksForGrade(5).find((track) => track.subject === 'literature')?.units.map((unit) => unit.slug)).toEqual([
      'reading-like-a-literary-analyst',
      'heroes-journeys-and-epic-signals',
      'tragic-conflict-and-comic-correction',
      'versions-translations-and-point-of-view',
      'imagery-allusion-wisdom-and-dialogue',
      'transfer-across-classical-texts',
    ]);
    expect(getTracksForGrade(5).find((track) => track.subject === 'grammar')?.units.map((unit) => unit.slug)).toEqual([
      'clause-foundations-and-sentence-boundaries',
      'coordination-and-compound-sentences',
      'subordination-and-complex-sentences',
      'modifiers-appositives-and-sentence-detail',
      'agreement-voice-and-modifier-clarity',
      'punctuation-and-cumulative-sentence-craft',
    ]);
    expect(GRADE_6_TRACKS.find((track) => track.subject === 'literature')?.units.map((unit) => unit.slug)).toEqual([
      'close-reading-groundwork-for-older-texts',
      'epic-scale-heroic-values-and-motif',
      'tragedy-choice-and-dramatic-irony',
      'comedy-inversion-and-satire-readiness',
      'dialogue-wisdom-lyric-and-public-ideas',
      'allusion-transformation-translation-and-transfer',
    ]);
    expect(GRADE_6_TRACKS.find((track) => track.subject === 'grammar')?.units.map((unit) => unit.slug)).toEqual([
      'sentence-control-for-purposeful-revision',
      'sentence-variety-rhythm-and-emphasis',
      'parallelism-modifiers-and-concision',
      'mood-voice-and-register',
      'punctuation-as-craft',
      'editing-systems-and-grammar-in-context',
    ]);
    expect(getTracksForGrade(7).find((track) => track.subject === 'literature')?.units.map((unit) => unit.slug)).toEqual([
      'seminar-tools-for-difficult-classics',
      'ancient-questions-of-justice-virtue-and-the-city',
      'scripture-confession-and-the-inner-life',
      'renaissance-self-state-satire-and-stage',
      'liberty-democracy-economy-and-critique',
      'modern-drama-science-and-capstone-synthesis',
    ]);
    expect(getAllLessons()).toHaveLength(583);
    expect(getAllQuestions()).toHaveLength(3498);
  });

  it('requires the shipped V3 catalog to use stable authored question keys', () => {
    for (const question of getAllQuestions()) {
      expect(question.key).toMatch(/^[a-z0-9](?:[a-z0-9_-]*[a-z0-9])?$/);
    }
    expect(() => validateCurriculum(TRACKS, { requireQuestionKeys: true })).not.toThrow();
  });

  it('does not use the malformed generated sentence-use template in vocabulary questions', () => {
    const malformedSentenceUseQuestions = getAllQuestions()
      .filter((question) => /^Which sentence uses ".+" correctly\?$/.test(question.prompt))
      .filter((question) => {
        const choices = 'choices' in question.payload ? question.payload.choices : undefined;
        if (!Array.isArray(choices)) return false;
        const choiceText = choices.join('\n');
        return (
          /She poured the .+ into a cup\./.test(choiceText) &&
          /The .+ barked loudly\./.test(choiceText) &&
          /We measured the .+ with a ruler\./.test(choiceText)
        );
      })
      .map((question) => `${question.id}: ${question.prompt}`);

    expect(malformedSentenceUseQuestions).toEqual([]);
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

  it('preserves V3 question hints from fenced question blocks', () => {
    const root = createTempCurriculumRoot();
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
    writeFileSync(
      join(root, 'grade-07', '01-science', '01-cells', '01-cell-parts.md'),
      `---
id: lesson_grade7_science_cell_parts
slug: cell-parts
title: Cell Parts
---

## Questions

\`\`\`question
type: text-input
prompt: Type cell.
acceptedAnswers:
  - cell
hint: Think about the smallest living unit.
\`\`\`
`,
      'utf8',
    );

    const tracks = loadCurriculumFromRoot(root);
    const question = tracks[0]?.units[0]?.lessons[0]?.questions[0];

    expect(question?.hint).toBe('Think about the smallest living unit.');
  });

  it('parses authored question keys and uses them for stable question IDs', () => {
    const root = createTempCurriculumRoot();
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
    const lessonPath = join(root, 'grade-07', '01-science', '01-cells', '01-cell-parts.md');
    writeFileSync(
      lessonPath,
      lessonMarkdownWithQuestions([
        `key: cell-part-name
type: text-input
prompt: Type cell.
acceptedAnswers:
  - cell`,
        `key: cell-part-choice
type: multiple-choice
prompt: Which is a cell part?
choices:
  - Nucleus
  - Sidewalk
correctAnswer: Nucleus`,
      ]),
      'utf8',
    );

    const tracks = loadCurriculumFromRoot(root);
    const lesson = tracks[0]!.units[0]!.lessons[0]!;

    expect(lesson.questions.map((question) => question.key)).toEqual(['cell-part-name', 'cell-part-choice']);
    expect(questionIdForLesson(lesson, 0)).toBe('lesson_grade7_science_cell_parts_cell-part-name');
    expect(getAllQuestions(tracks).map((question) => question.id)).toEqual([
      'lesson_grade7_science_cell_parts_cell-part-name',
      'lesson_grade7_science_cell_parts_cell-part-choice',
    ]);

    writeFileSync(
      lessonPath,
      lessonMarkdownWithQuestions([
        `key: cell-part-choice
type: multiple-choice
prompt: Which is a cell part?
choices:
  - Nucleus
  - Sidewalk
correctAnswer: Nucleus`,
        `key: cell-part-name
type: text-input
prompt: Type cell.
acceptedAnswers:
  - cell`,
      ]),
      'utf8',
    );

    expect(new Set(getAllQuestions(loadCurriculumFromRoot(root)).map((question) => question.id))).toEqual(
      new Set(['lesson_grade7_science_cell_parts_cell-part-choice', 'lesson_grade7_science_cell_parts_cell-part-name']),
    );
  });

  it('strips author-only question metadata from runtime questions', () => {
    const root = createTempCurriculumRoot();
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
    writeFileSync(
      join(root, 'grade-07', '01-science', '01-cells', '01-cell-parts.md'),
      lessonMarkdownWithQuestions([
        `key: cell-part-name
type: text-input
prompt: Type cell.
acceptedAnswers:
  - cell
questionGoal: Check whether the student knows the term.
misconception: Confusing cells with atoms.`,
      ]),
      'utf8',
    );

    const question = loadCurriculumFromRoot(root)[0]!.units[0]!.lessons[0]!.questions[0] as Record<string, unknown>;

    expect(question.key).toBe('cell-part-name');
    expect(question.questionGoal).toBeUndefined();
    expect(question.misconception).toBeUndefined();
    expect(question.payload).not.toHaveProperty('questionGoal');
    expect(question.payload).not.toHaveProperty('misconception');
  });

  it('validates required promoted question keys in strict mode', () => {
    const track = duplicateFixtureTrack('track_promoted', 'science', 'unit_promoted', 'lesson_promoted');

    expect(() => validateCurriculum([track], { requireQuestionKeys: true })).toThrow(/missing key/);
  });

  it('validates question key format and uniqueness within a lesson', () => {
    const invalidKeyTrack = duplicateFixtureTrack('track_bad_key', 'science', 'unit_bad_key', 'lesson_bad_key');
    invalidKeyTrack.units[0]!.lessons[0]!.questions[0]!.key = 'Bad Key';

    expect(() => validateCurriculum([invalidKeyTrack])).toThrow(/must be lowercase/);

    const duplicateKeyTrack = duplicateFixtureTrack('track_duplicate_key', 'science', 'unit_duplicate_key', 'lesson_duplicate_key');
    duplicateKeyTrack.units[0]!.lessons[0]!.questions = [
      {
        key: 'same-key',
        type: 'text-input',
        prompt: 'Type yes.',
        payload: { acceptedAnswers: ['yes'], answerType: 'text' },
      },
      {
        key: 'same-key',
        type: 'text-input',
        prompt: 'Type no.',
        payload: { acceptedAnswers: ['no'], answerType: 'text' },
      },
    ];

    expect(findCurriculumIssues([duplicateKeyTrack]).map((issue) => issue.message)).toContain(
      'Duplicate question key "same-key" in lesson lesson_duplicate_key',
    );
    expect(() => validateCurriculum([duplicateKeyTrack])).toThrow(/Duplicate question key/);
  });

  it('fails validation for malformed fenced question YAML and unsupported question types', () => {
    const malformedRoot = createTempCurriculumRoot();
    writeTrack(malformedRoot, 'grade-07', '01-science', {
      id: 'track_grade7_science',
      slug: 'grade-7-science',
      subject: 'science',
      title: 'Science',
    });
    writeUnit(malformedRoot, 'grade-07', '01-science', '01-cells', {
      id: 'unit_grade7_science_cells',
      slug: 'cells',
      title: 'Cells',
    });
    writeFileSync(
      join(malformedRoot, 'grade-07', '01-science', '01-cells', '01-cell-parts.md'),
      lessonMarkdownWithQuestions([
        `key: malformed
type: text-input
prompt: [unterminated
acceptedAnswers:
  - cell`,
      ]),
      'utf8',
    );

    expect(() => loadCurriculumFromRoot(malformedRoot)).toThrow();

    const unsupportedRoot = createTempCurriculumRoot();
    writeTrack(unsupportedRoot, 'grade-07', '01-science', {
      id: 'track_grade7_science',
      slug: 'grade-7-science',
      subject: 'science',
      title: 'Science',
    });
    writeUnit(unsupportedRoot, 'grade-07', '01-science', '01-cells', {
      id: 'unit_grade7_science_cells',
      slug: 'cells',
      title: 'Cells',
    });
    writeFileSync(
      join(unsupportedRoot, 'grade-07', '01-science', '01-cells', '01-cell-parts.md'),
      lessonMarkdownWithQuestions([
        `key: unsupported
type: mystery-question
prompt: What is this?`,
      ]),
      'utf8',
    );

    expect(() => loadCurriculumFromRoot(unsupportedRoot)).toThrow(/Invalid discriminator value/);
  });

  it('fails validation for duplicate match-pair right-side labels', () => {
    const root = createTempCurriculumRoot();
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
    writeFileSync(
      join(root, 'grade-07', '01-science', '01-cells', '01-cell-parts.md'),
      lessonMarkdownWithQuestions([
        `key: duplicate-right
type: match-pairs
prompt: Match each part.
pairs:
  - left: nucleus
    right: control center
  - left: DNA
    right: control center`,
      ]),
      'utf8',
    );

    expect(() => loadCurriculumFromRoot(root)).toThrow(/Duplicate match-pair right-side label "control center"/);
  });

  it('fails validation for standard lessons with no questions', () => {
    const root = createTempCurriculumRoot();
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
    writeFileSync(
      join(root, 'grade-07', '01-science', '01-cells', '01-cell-parts.md'),
      `---
id: lesson_grade7_science_cell_parts
slug: cell-parts
title: Cell Parts
---

## Teaching Goal

Students learn cell parts.
`,
      'utf8',
    );

    expect(() => loadCurriculumFromRoot(root)).toThrow(/Standard lesson has no questions/);
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
      tracks: 19,
      units: 132,
      lessons: 583,
      questions: 3498,
    });
    expect(summary.rows).toHaveLength(EXPECTED_SUMMARY_ROWS.length);
    for (const expected of EXPECTED_SUMMARY_ROWS) {
      expect(summary.rows.find((row) => row.gradeLevel === expected.gradeLevel && row.subject === expected.subject)).toMatchObject(
        expected,
      );
    }
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

function lessonMarkdownWithQuestions(questionBlocks: string[]) {
  return `---
id: lesson_grade7_science_cell_parts
slug: cell-parts
title: Cell Parts
---

## Questions

${questionBlocks.map((block) => `\`\`\`question\n${block}\n\`\`\``).join('\n\n')}
`;
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
