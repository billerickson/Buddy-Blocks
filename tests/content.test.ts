import { describe, expect, it } from 'vitest';
import { CHILDREN, PARENT_USERNAME, TRACKS, getAllLessons, getAllQuestions } from '../src/lib/content';

describe('seed content', () => {
  it('keeps v1 identity fixed', () => {
    expect(PARENT_USERNAME).toBe('bill');
    expect(CHILDREN.map((child) => child.slug)).toEqual(['reagan', 'ada']);
  });

  it('provides the MVP seed shape', () => {
    expect(TRACKS.map((track) => track.slug)).toEqual(['math', 'vocabulary', 'spanish']);
    expect(TRACKS.every((track) => track.units.length === 2)).toBe(true);
    expect(getAllLessons()).toHaveLength(12);
    expect(getAllQuestions()).toHaveLength(96);
  });
});

