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

const EXPECTED_GRADE_SUBJECTS: Record<number, string[]> = {
  1: ['math', 'vocabulary'],
  2: ['math', 'vocabulary'],
  3: [
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
  ],
  4: [
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
  ],
  5: [
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
  ],
  6: [
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
  ],
  7: ['math', 'vocabulary', 'spanish', 'french', 'latin', 'rhetoric', 'literature', 'history-civics'],
  8: ['math', 'vocabulary'],
  9: ['math', 'vocabulary'],
  10: ['math', 'vocabulary'],
  11: ['math', 'vocabulary'],
  12: ['math', 'vocabulary'],
};

const EXPECTED_SUMMARY_ROWS = [
  { gradeLevel: 1, subject: 'math', tracks: 1, units: 10, lessons: 30, questions: 240 },
  { gradeLevel: 1, subject: 'vocabulary', tracks: 1, units: 11, lessons: 42, questions: 336 },
  { gradeLevel: 2, subject: 'math', tracks: 1, units: 11, lessons: 33, questions: 264 },
  { gradeLevel: 2, subject: 'vocabulary', tracks: 1, units: 12, lessons: 46, questions: 368 },
  { gradeLevel: 3, subject: 'french', tracks: 1, units: 10, lessons: 57, questions: 456 },
  { gradeLevel: 3, subject: 'grammar', tracks: 1, units: 11, lessons: 11, questions: 88 },
  { gradeLevel: 3, subject: 'history-civics', tracks: 1, units: 10, lessons: 10, questions: 80 },
  { gradeLevel: 3, subject: 'latin', tracks: 1, units: 10, lessons: 58, questions: 464 },
  { gradeLevel: 3, subject: 'literature', tracks: 1, units: 10, lessons: 10, questions: 80 },
  { gradeLevel: 3, subject: 'logic', tracks: 1, units: 11, lessons: 11, questions: 88 },
  { gradeLevel: 3, subject: 'math', tracks: 1, units: 13, lessons: 69, questions: 456 },
  { gradeLevel: 3, subject: 'memory-work', tracks: 1, units: 8, lessons: 8, questions: 64 },
  { gradeLevel: 3, subject: 'rhetoric', tracks: 1, units: 11, lessons: 11, questions: 88 },
  { gradeLevel: 3, subject: 'spanish', tracks: 1, units: 10, lessons: 58, questions: 464 },
  { gradeLevel: 3, subject: 'vocabulary', tracks: 1, units: 12, lessons: 55, questions: 440 },
  { gradeLevel: 4, subject: 'french', tracks: 1, units: 11, lessons: 78, questions: 624 },
  { gradeLevel: 4, subject: 'grammar', tracks: 1, units: 11, lessons: 11, questions: 88 },
  { gradeLevel: 4, subject: 'history-civics', tracks: 1, units: 12, lessons: 12, questions: 96 },
  { gradeLevel: 4, subject: 'latin', tracks: 1, units: 10, lessons: 78, questions: 624 },
  { gradeLevel: 4, subject: 'literature', tracks: 1, units: 10, lessons: 10, questions: 80 },
  { gradeLevel: 4, subject: 'logic', tracks: 1, units: 11, lessons: 11, questions: 88 },
  { gradeLevel: 4, subject: 'math', tracks: 1, units: 13, lessons: 48, questions: 288 },
  { gradeLevel: 4, subject: 'memory-work', tracks: 1, units: 8, lessons: 8, questions: 64 },
  { gradeLevel: 4, subject: 'rhetoric', tracks: 1, units: 11, lessons: 11, questions: 88 },
  { gradeLevel: 4, subject: 'spanish', tracks: 1, units: 11, lessons: 78, questions: 624 },
  { gradeLevel: 4, subject: 'vocabulary', tracks: 1, units: 11, lessons: 42, questions: 336 },
  { gradeLevel: 5, subject: 'french', tracks: 1, units: 10, lessons: 50, questions: 400 },
  { gradeLevel: 5, subject: 'grammar', tracks: 1, units: 11, lessons: 11, questions: 88 },
  { gradeLevel: 5, subject: 'history-civics', tracks: 1, units: 12, lessons: 12, questions: 96 },
  { gradeLevel: 5, subject: 'latin', tracks: 1, units: 10, lessons: 50, questions: 400 },
  { gradeLevel: 5, subject: 'literature', tracks: 1, units: 10, lessons: 10, questions: 80 },
  { gradeLevel: 5, subject: 'logic', tracks: 1, units: 11, lessons: 11, questions: 88 },
  { gradeLevel: 5, subject: 'math', tracks: 1, units: 13, lessons: 48, questions: 288 },
  { gradeLevel: 5, subject: 'memory-work', tracks: 1, units: 8, lessons: 8, questions: 64 },
  { gradeLevel: 5, subject: 'rhetoric', tracks: 1, units: 11, lessons: 11, questions: 88 },
  { gradeLevel: 5, subject: 'spanish', tracks: 1, units: 10, lessons: 50, questions: 400 },
  { gradeLevel: 5, subject: 'vocabulary', tracks: 1, units: 12, lessons: 46, questions: 368 },
  { gradeLevel: 6, subject: 'french', tracks: 1, units: 10, lessons: 50, questions: 400 },
  { gradeLevel: 6, subject: 'grammar', tracks: 1, units: 11, lessons: 11, questions: 88 },
  { gradeLevel: 6, subject: 'history-civics', tracks: 1, units: 12, lessons: 12, questions: 96 },
  { gradeLevel: 6, subject: 'latin', tracks: 1, units: 10, lessons: 50, questions: 400 },
  { gradeLevel: 6, subject: 'literature', tracks: 1, units: 10, lessons: 10, questions: 80 },
  { gradeLevel: 6, subject: 'logic', tracks: 1, units: 11, lessons: 11, questions: 88 },
  { gradeLevel: 6, subject: 'math', tracks: 1, units: 12, lessons: 67, questions: 440 },
  { gradeLevel: 6, subject: 'memory-work', tracks: 1, units: 8, lessons: 8, questions: 64 },
  { gradeLevel: 6, subject: 'rhetoric', tracks: 1, units: 11, lessons: 11, questions: 88 },
  { gradeLevel: 6, subject: 'spanish', tracks: 1, units: 10, lessons: 50, questions: 400 },
  { gradeLevel: 6, subject: 'vocabulary', tracks: 1, units: 12, lessons: 61, questions: 558 },
  { gradeLevel: 7, subject: 'french', tracks: 1, units: 10, lessons: 50, questions: 400 },
  { gradeLevel: 7, subject: 'history-civics', tracks: 1, units: 12, lessons: 12, questions: 96 },
  { gradeLevel: 7, subject: 'latin', tracks: 1, units: 10, lessons: 50, questions: 400 },
  { gradeLevel: 7, subject: 'literature', tracks: 1, units: 10, lessons: 10, questions: 80 },
  { gradeLevel: 7, subject: 'math', tracks: 1, units: 13, lessons: 48, questions: 288 },
  { gradeLevel: 7, subject: 'rhetoric', tracks: 1, units: 11, lessons: 11, questions: 88 },
  { gradeLevel: 7, subject: 'spanish', tracks: 1, units: 10, lessons: 50, questions: 400 },
  { gradeLevel: 7, subject: 'vocabulary', tracks: 1, units: 11, lessons: 42, questions: 336 },
  { gradeLevel: 8, subject: 'math', tracks: 1, units: 13, lessons: 48, questions: 288 },
  { gradeLevel: 8, subject: 'vocabulary', tracks: 1, units: 12, lessons: 46, questions: 368 },
  { gradeLevel: 9, subject: 'math', tracks: 1, units: 12, lessons: 36, questions: 288 },
  { gradeLevel: 9, subject: 'vocabulary', tracks: 1, units: 10, lessons: 38, questions: 304 },
  { gradeLevel: 10, subject: 'math', tracks: 1, units: 12, lessons: 36, questions: 288 },
  { gradeLevel: 10, subject: 'vocabulary', tracks: 1, units: 10, lessons: 38, questions: 304 },
  { gradeLevel: 11, subject: 'math', tracks: 1, units: 12, lessons: 36, questions: 288 },
  { gradeLevel: 11, subject: 'vocabulary', tracks: 1, units: 10, lessons: 38, questions: 304 },
  { gradeLevel: 12, subject: 'math', tracks: 1, units: 12, lessons: 36, questions: 288 },
  { gradeLevel: 12, subject: 'vocabulary', tracks: 1, units: 10, lessons: 36, questions: 288 },
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
    expect(getTracksForGrade(1).find((track) => track.subject === 'math')?.units.map((unit) => unit.slug)).toEqual([
      'counting-and-number-sense',
      'addition-within-20',
      'subtraction-within-20',
      'word-problems-and-math-stories',
      'place-value-to-120',
      'measurement-and-data',
      'time-money-and-financial-habits',
      'geometry-and-equal-shares',
      'patterns-mental-math-and-fluency',
      'grade-1-capstone-review',
    ]);
    expect(getTracksForGrade(2).find((track) => track.subject === 'vocabulary')?.units.map((unit) => unit.slug)).toEqual([
      'context-clues-across-sentences',
      'compound-words-base-words-and-endings',
      'prefixes-suffixes-and-word-families',
      'synonyms-antonyms-shades-and-precision',
      'multiple-meaning-words-and-homophones',
      'idioms-and-figurative-readiness',
      'reference-skills',
      'story-poetry-and-author-craft-words',
      'informational-and-content-area-vocabulary',
      'academic-verbs-and-discussion-language',
      'writing-and-revision-vocabulary',
      'cumulative-word-learning-review',
    ]);
    expect(getTracksForGrade(4).find((track) => track.subject === 'math')?.units.map((unit) => unit.slug)).toEqual([
      'multi-digit-addition-and-subtraction-review',
      'multi-digit-multiplication',
      'division-with-remainders',
      'factors-multiples-and-prime-numbers',
      'equivalent-and-comparing-fractions',
      'fraction-operations-and-mixed-numbers',
      'decimals-to-hundredths',
      'measurement-conversions',
      'angles-lines-and-symmetry',
      'area-perimeter-and-data',
      'financial-literacy-and-multi-step-problems',
      'grade-4-capstone-review',
      'mad-minute',
    ]);
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'math')?.units.map((unit) => unit.slug)).toEqual([
      'addition-basics',
      'subtraction-basics',
      'multi-digit-addition-subtraction',
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
      'content-area-vocabulary',
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
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'french')?.units.map((unit) => unit.slug)).toEqual([
      'greetings-polite-phrases',
      'colors-classroom-objects',
      'numbers-calendar',
      'people-family',
      'likes-needs-food',
      'places-actions',
      'simple-sentences',
      'culture-everyday-french',
      'reading-listening-french',
      'cumulative-conversation-review',
    ]);
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'latin')?.units.map((unit) => unit.slug)).toEqual([
      'latin-sounds-classroom-words-roman-greetings',
      'nouns-gender-simple-sentences',
      'family-people-descriptions',
      'verbs-everyday-actions',
      'places-home-school',
      'food-animals-daily-life',
      'mythology-roman-culture',
      'latin-roots-english',
      'reading-short-latin',
      'cumulative-latin-i-review',
    ]);
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'grammar')?.units.map((unit) => unit.slug)).toEqual([
      'parts-of-speech',
      'nouns-pronouns-and-verbs',
      'adjectives-adverbs-and-prepositions',
      'subjects-and-predicates',
      'four-sentence-types',
      'capitalization-and-punctuation',
      'phrases-clauses-and-fragments',
      'sentence-combining',
      'copywork-and-dictation',
      'introduction-to-sentence-diagramming',
      'cumulative-grammar-review',
    ]);
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'logic')?.units.map((unit) => unit.slug)).toEqual([
      'patterns-and-rules',
      'categories-and-classification',
      'same-different-and-opposite',
      'analogies',
      'sequencing-and-order',
      'cause-and-effect',
      'true-false-and-not-enough-information',
      'if-then-thinking',
      'claims-and-reasons',
      'common-reasoning-mistakes',
      'cumulative-logic-review',
    ]);
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'rhetoric')?.units.map((unit) => unit.slug)).toEqual([
      'narration',
      'main-idea-and-summary',
      'strong-sentences',
      'paragraph-shape',
      'description',
      'explanation',
      'opinion-with-reasons',
      'compare-and-contrast',
      'short-speeches',
      'revision-for-clarity',
      'cumulative-rhetoric-review',
    ]);
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'literature')?.units.map((unit) => unit.slug)).toEqual([
      'fables-and-morals',
      'myths-and-heroes',
      'folk-tales-and-legends',
      'poetry-and-recitation',
      'character-and-choice',
      'setting-and-story-world',
      'conflict-and-resolution',
      'beautiful-sentences',
      'literature-connections-to-latin',
      'cumulative-literature-review',
    ]);
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'history-civics')?.units.map((unit) => unit.slug)).toEqual([
      'timelines-and-maps',
      'ancient-peoples-and-places',
      'greece-and-rome',
      'medieval-worlds',
      'explorers-and-encounters',
      'early-america',
      'communities-and-government',
      'rights-and-responsibilities',
      'symbols-documents-and-speeches',
      'cumulative-history-review',
    ]);
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'memory-work')?.units.map((unit) => unit.slug)).toEqual([
      'poetry',
      'latin-sayings',
      'grammar-rules',
      'math-facts-and-measures',
      'geography',
      'history-sentences',
      'famous-lines-and-speeches',
      'cumulative-memory-review',
    ]);
    expect(getTracksForGrade(4).find((track) => track.subject === 'spanish')?.units.map((unit) => unit.slug)).toEqual([
      'grade-3-review-classroom-routines',
      'numbers-dates-time',
      'school-supplies',
      'people-descriptions-feelings',
      'food-preferences-polite-requests',
      'places-directions',
      'present-tense-action-patterns',
      'questions-short-conversations',
      'culture-authentic-resources',
      'reading-listening-spanish',
      'cumulative-conversation-review',
    ]);
    expect(getTracksForGrade(4).find((track) => track.subject === 'french')?.units.map((unit) => unit.slug)).toEqual([
      'french-i-review-classroom-routines',
      'numbers-dates-time',
      'school-supplies',
      'people-descriptions-feelings',
      'food-preferences-polite-requests',
      'places-directions',
      'present-tense-action-patterns',
      'questions-short-conversations',
      'culture-authentic-resources',
      'reading-listening-french',
      'cumulative-conversation-review',
    ]);
    expect(getTracksForGrade(4).find((track) => track.subject === 'latin')?.units.map((unit) => unit.slug)).toEqual([
      'latin-i-review-reading-routines',
      'cases-sentence-roles',
      'verbs-across-time',
      'people-places-descriptions',
      'roman-daily-life-public-spaces',
      'mythology-heroes-stories',
      'latin-roots-phrases-english-connections',
      'reading-adapted-latin-passages',
      'culture-history-through-texts',
      'cumulative-latin-ii-review',
    ]);
    expect(GRADE_6_TRACKS.find((track) => track.subject === 'math')?.units.map((unit) => unit.slug)).toEqual([
      'ratios-rates',
      'rational-number-operations',
      'fractions-decimals-percents',
      'expressions-equations',
      'inequalities-relationships',
      'integers-rational-number-system',
      'coordinate-plane',
      'geometry',
      'statistics-data',
      'personal-financial-literacy',
      'mixed-problem-solving',
      'mad-minute',
    ]);
    expect(getTracksForGrade(6).find((track) => track.subject === 'grammar')?.units.map((unit) => unit.slug)).toEqual([
      'verb-mood-and-voice',
      'parallel-structure',
      'concise-modifiers',
      'punctuation-for-rhythm-and-clarity',
      'usage-and-register',
      'sentence-variety',
      'grammar-in-literary-sentences',
      'latin-and-english-grammar-connections',
      'copyediting-marks',
      'editing-portfolio',
      'grammar-iv-cumulative-review',
    ]);
    expect(GRADE_6_TRACKS.find((track) => track.subject === 'vocabulary')?.units.map((unit) => unit.slug)).toEqual([
      'context-reference-skills',
      'roots-send-write-law',
      'roots-good-hand-empty',
      'morphology-bridge',
      'academic-reading',
      'disciplinary-vocabulary',
      'genre-structure',
      'authors-craft',
      'argument-media',
      'writing-revision',
      'research-inquiry-vocabulary',
      'cumulative-review',
    ]);
    expect(getTracksForGrade(7).find((track) => track.subject === 'spanish')?.units.map((unit) => unit.slug)).toEqual([
      'connected-reading-and-listening',
      'opinions-with-evidence',
      'polite-requests-and-conditional-phrases',
      'commands',
      'present-perfect-exposure',
      'subjunctive-chunks-for-wishes-and-needs',
      'media-and-community-topics',
      'culture-comparisons',
      'project-based-communication',
      'spanish-5-capstone-review',
    ]);
    expect(getTracksForGrade(12).find((track) => track.subject === 'math')?.units.map((unit) => unit.slug)).toEqual([
      'advanced-functions',
      'trigonometric-functions',
      'trigonometric-identities-and-inverses',
      'vectors',
      'polar-and-parametric-representations',
      'conic-sections',
      'limits-preview',
      'discrete-math',
      'data-analysis-and-normal-distributions',
      'financial-mathematics',
      'optimization-and-modeling',
      'quantitative-reasoning-capstone',
    ]);
    expect(getAllLessons()).toHaveLength(2205);
    expect(getAllQuestions()).toHaveLength(17134);
  });

  it('adds mad minute multiplication fact practice per grade', () => {
    for (const gradeLevel of [3, 4, 5, 6, 7, 8]) {
      const madMinute = getTracksForGrade(gradeLevel)
        .find((track) => track.subject === 'math')
        ?.units.find((unit) => unit.slug === 'mad-minute');
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
          (lesson) =>
            lesson.config &&
            'goalCorrect' in lesson.config &&
            lesson.config.goalCorrect === ([4, 5].includes(gradeLevel) ? 35 : 40),
        ),
      ).toBe(true);
    }
  });

  it('uses Preview, Easy, Medium, and Hard Spanish flash-card ladders in Grade 4 vocabulary units', () => {
    const grade4Spanish = getTracksForGrade(4).find((track) => track.subject === 'spanish');
    expect(grade4Spanish).toBeDefined();

    for (const unit of grade4Spanish?.units.slice(0, 7) ?? []) {
      const flashLessons = unit.lessons.filter((lesson) => lesson.slug.includes('flash-cards'));
      expect(unit.lessons[0]?.slug).toBe(`${unit.slug}-preview`);
      expect(unit.lessons[0]?.questions.every((question) => flashCardPayload(question, 'preview'))).toBe(true);
      expect(flashLessons.map((lesson) => lesson.slug)).toEqual([
        expect.stringContaining('easy'),
        expect.stringContaining('medium'),
        expect.stringContaining('hard'),
      ]);
      expect(flashLessons[0].questions.every((question) => flashCardPayload(question, 'easy'))).toBe(true);
      expect(
        flashLessons[1].questions.every(
          (question) => Boolean(flashCardPayload(question, 'medium')?.acceptedAnswers?.length),
        ),
      ).toBe(true);
      expect(
        flashLessons[2].questions.every(
          (question) => Boolean(flashCardPayload(question, 'hard')?.acceptedAnswers?.length),
        ),
      ).toBe(true);
    }
  });

  it('uses Preview, Easy, Medium, and Hard French flash-card ladders in vocabulary units', () => {
    const grade3French = getTracksForGrade(3).find((track) => track.subject === 'french');
    const grade4French = getTracksForGrade(4).find((track) => track.subject === 'french');
    expect(grade3French).toBeDefined();
    expect(grade4French).toBeDefined();

    for (const unit of [...(grade3French?.units.slice(0, 7) ?? []), ...(grade4French?.units.slice(0, 7) ?? [])]) {
      const flashLessons = unit.lessons.filter((lesson) => lesson.slug.includes('flash-cards'));
      expect(unit.lessons[0]?.slug).toBe(`${unit.slug}-preview`);
      expect(unit.lessons[0]?.questions.every((question) => flashCardPayload(question, 'preview'))).toBe(true);
      expect(flashLessons.map((lesson) => lesson.slug)).toEqual([
        `${unit.slug}-flash-cards-easy`,
        `${unit.slug}-flash-cards-medium`,
        `${unit.slug}-flash-cards-hard`,
      ]);
      expect(flashLessons[0].questions.every((question) => flashCardPayload(question, 'easy'))).toBe(true);
      expect(
        flashLessons[1].questions.every(
          (question) => Boolean(flashCardPayload(question, 'medium')?.acceptedAnswers?.length),
        ),
      ).toBe(true);
      expect(
        flashLessons[2].questions.every(
          (question) => Boolean(flashCardPayload(question, 'hard')?.acceptedAnswers?.length),
        ),
      ).toBe(true);
    }
  });

  it('uses Preview, Easy, Medium, and Hard Latin flash-card ladders in vocabulary and roots units', () => {
    const grade3Latin = getTracksForGrade(3).find((track) => track.subject === 'latin');
    const grade4Latin = getTracksForGrade(4).find((track) => track.subject === 'latin');
    expect(grade3Latin).toBeDefined();
    expect(grade4Latin).toBeDefined();

    for (const unit of [...(grade3Latin?.units.slice(0, 8) ?? []), ...(grade4Latin?.units.slice(0, 7) ?? [])]) {
      const flashLessons = unit.lessons.filter((lesson) => lesson.slug.includes('flash-cards'));
      expect(unit.lessons[0]?.slug).toBe(`${unit.slug}-preview`);
      expect(unit.lessons[0]?.questions.every((question) => flashCardPayload(question, 'preview'))).toBe(true);
      expect(flashLessons.map((lesson) => lesson.slug)).toEqual([
        `${unit.slug}-flash-cards-easy`,
        `${unit.slug}-flash-cards-medium`,
        `${unit.slug}-flash-cards-hard`,
      ]);
      expect(flashLessons[0].questions.every((question) => flashCardPayload(question, 'easy'))).toBe(true);
      expect(
        flashLessons[1].questions.every(
          (question) => Boolean(flashCardPayload(question, 'medium')?.acceptedAnswers?.length),
        ),
      ).toBe(true);
      expect(
        flashLessons[2].questions.every(
          (question) => Boolean(flashCardPayload(question, 'hard')?.acceptedAnswers?.length),
        ),
      ).toBe(true);
    }
  });

  it('starts language units with preview and recognition before practice, then ends with hard cards', () => {
    const languageTracks = TRACKS.filter((track) => ['spanish', 'french', 'latin'].includes(track.subject));

    for (const track of languageTracks) {
      for (const unit of track.units) {
        const flashLessons = unit.lessons.filter(isFlashCardLesson);
        if (flashLessons.length === 0) continue;

        expect(unit.lessons[0]?.slug).toBe(`${unit.slug}-preview`);
        expect(unit.lessons[0]?.questions.every((question) => flashCardPayload(question, 'preview'))).toBe(true);
        expect(unit.lessons[1]?.questions.every((question) => flashCardPayload(question, 'easy'))).toBe(true);
        expect(unit.lessons[2]?.questions.every((question) => flashCardPayload(question, 'medium'))).toBe(true);
        expect(unit.lessons.at(-1)?.questions.every((question) => flashCardPayload(question, 'hard'))).toBe(true);
        expect(unit.lessons.slice(3, -1).some((lesson) => !isFlashCardLesson(lesson))).toBe(true);
      }
    }

    const frenchGreetings = getTracksForGrade(3)
      .find((track) => track.subject === 'french')
      ?.units.find((unit) => unit.slug === 'greetings-polite-phrases');
    expect(frenchGreetings?.lessons[0]?.slug).toBe('greetings-polite-phrases-preview');
    expect(frenchGreetings?.lessons[1]?.slug).toBe('greetings-polite-phrases-flash-cards-easy');
  });

  it('starts Vocabulary units with context before cards and ends with hard cards', () => {
    const vocabularyTracks = TRACKS.filter((track) => track.subject === 'vocabulary');

    for (const track of vocabularyTracks) {
      for (const unit of track.units) {
        if (!unit.lessons.some(isFlashCardLesson)) continue;
        expect(unit.lessons[0]?.slug).toBe(`${unit.slug}-preview`);
        expect(unit.lessons[0]?.questions.every((question) => question.type === 'passage-question')).toBe(true);
        expect(unit.lessons[1]?.questions.every((question) => flashCardPayload(question, 'easy'))).toBe(true);
        expect(unit.lessons.at(-1)?.questions.every((question) => flashCardPayload(question, 'hard'))).toBe(true);
        expect(unit.lessons.slice(2, -1).every((lesson) => !isFlashCardLesson(lesson))).toBe(true);
      }
    }
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
      tracks: 66,
      units: 714,
      lessons: 2205,
      questions: 17134,
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

function isFlashCardLesson(lesson: { questions: Array<{ type: string }> }) {
  return lesson.questions.length > 0 && lesson.questions.every((question) => question.type === 'flash-card');
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

function flashCardPayload(question: { type: string; payload: unknown }, mode: 'preview' | 'easy' | 'medium' | 'hard') {
  if (question.type !== 'flash-card' || typeof question.payload !== 'object' || question.payload === null) return null;
  const payload = question.payload as { mode?: string; acceptedAnswers?: string[] };
  return payload.mode === mode ? payload : null;
}
