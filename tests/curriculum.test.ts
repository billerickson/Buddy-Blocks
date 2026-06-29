import { describe, expect, it } from 'vitest';
import * as curriculum from '../src/lib/curriculum';
import {
  GRADE_3_TRACKS,
  GRADE_6_TRACKS,
  TRACKS,
  getAllLessons,
  getAllQuestions,
  getTracksForGrade,
} from '../src/lib/curriculum';

describe('curriculum content', () => {
  it('loads curriculum without exporting fixed family fixtures', () => {
    expect('CHILDREN' in curriculum).toBe(false);
    expect('PARENT_USERNAME' in curriculum).toBe(false);
  });

  it('provides grade-specific curriculum tracks', () => {
    expect(getTracksForGrade(3).map((track) => track.subject)).toEqual(['math', 'vocabulary', 'spanish']);
    expect(getTracksForGrade(6).map((track) => track.subject)).toEqual(['math', 'vocabulary', 'spanish']);
  });

  it('provides the MVP curriculum shape', () => {
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
    expect(getAllLessons()).toHaveLength(80);
    expect(getAllQuestions()).toHaveLength(518);
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
});
