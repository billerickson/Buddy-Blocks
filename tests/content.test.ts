import { describe, expect, it } from 'vitest';
import {
  CHILDREN,
  GRADE_3_TRACKS,
  GRADE_6_TRACKS,
  PARENT_USERNAME,
  TRACKS,
  getAllLessons,
  getAllQuestions,
  getTrackPaths,
  getTracksForChild,
} from '../src/lib/content';

describe('seed content', () => {
  it('keeps v1 identity fixed', () => {
    expect(PARENT_USERNAME).toBe('bill');
    expect(CHILDREN.map((child) => child.slug)).toEqual(['reagan', 'ada']);
    expect(CHILDREN.map((child) => [child.slug, child.gradeLevel])).toEqual([
      ['reagan', 6],
      ['ada', 3],
    ]);
  });

  it('provides grade-specific tracks for each child', () => {
    expect(GRADE_3_TRACKS.map((track) => track.subject)).toEqual(['math', 'vocabulary', 'spanish']);
    expect(GRADE_6_TRACKS.map((track) => track.subject)).toEqual(['math', 'vocabulary', 'spanish']);
    expect(getTracksForChild(CHILDREN[0]).map((track) => track.slug)).toEqual([
      'grade-6-math',
      'grade-6-vocabulary',
      'grade-6-spanish',
    ]);
    expect(getTracksForChild(CHILDREN[1]).map((track) => track.slug)).toEqual([
      'grade-3-math',
      'grade-3-vocabulary',
      'grade-3-spanish',
    ]);
    expect(getTrackPaths()).toEqual([
      { childSlug: 'reagan', trackSlug: 'grade-6-math' },
      { childSlug: 'reagan', trackSlug: 'grade-6-vocabulary' },
      { childSlug: 'reagan', trackSlug: 'grade-6-spanish' },
      { childSlug: 'ada', trackSlug: 'grade-3-math' },
      { childSlug: 'ada', trackSlug: 'grade-3-vocabulary' },
      { childSlug: 'ada', trackSlug: 'grade-3-spanish' },
    ]);
  });

  it('provides the MVP seed shape', () => {
    expect(TRACKS).toHaveLength(6);
    expect(GRADE_3_TRACKS.find((track) => track.subject === 'math')?.units.map((unit) => unit.slug)).toEqual([
      'addition-basics',
      'subtraction-basics',
      'mad-minute',
    ]);
    expect(GRADE_6_TRACKS.find((track) => track.subject === 'math')?.units.map((unit) => unit.slug)).toEqual([
      'ratios-rates',
      'expressions-equations',
      'mad-minute',
    ]);
    expect(getAllLessons()).toHaveLength(48);
    expect(getAllQuestions()).toHaveLength(192);
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
      expect(madMinute?.lessons.every((lesson) => lesson.config?.durationSeconds === 60)).toBe(true);
      expect(madMinute?.lessons.every((lesson) => lesson.config?.goalCorrect === 40)).toBe(true);
    }
  });
});
