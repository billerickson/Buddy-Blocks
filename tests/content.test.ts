import { describe, expect, it } from 'vitest';
import { CHILDREN, PARENT_USERNAME, TRACKS, getAllLessons, getAllQuestions } from '../src/lib/content';

describe('seed content', () => {
  it('keeps v1 identity fixed', () => {
    expect(PARENT_USERNAME).toBe('bill');
    expect(CHILDREN.map((child) => child.slug)).toEqual(['reagan', 'ada']);
  });

  it('provides the MVP seed shape', () => {
    expect(TRACKS.map((track) => track.slug)).toEqual(['math', 'vocabulary', 'spanish']);
    expect(TRACKS.find((track) => track.slug === 'math')?.units.map((unit) => unit.slug)).toEqual([
      'addition-basics',
      'subtraction-basics',
      'mad-minute',
    ]);
    expect(getAllLessons()).toHaveLength(24);
    expect(getAllQuestions()).toHaveLength(96);
  });

  it('adds mad minute multiplication fact practice', () => {
    const madMinute = TRACKS.find((track) => track.slug === 'math')?.units.find((unit) => unit.slug === 'mad-minute');
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
  });
});
