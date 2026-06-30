import { describe, expect, it } from 'vitest';
import {
  CHILDREN,
  PARENT_USERNAME,
  getTrackPaths,
  getTracksForChild,
} from '../src/lib/seed-family';

describe('fixed v1 seed family', () => {
  it('keeps v1 identity fixed', () => {
    expect(PARENT_USERNAME).toBe('bill');
    expect(CHILDREN.map((child) => child.slug)).toEqual(['reagan', 'ada']);
    expect(CHILDREN.map((child) => [child.slug, child.gradeLevel])).toEqual([
      ['reagan', 6],
      ['ada', 3],
    ]);
  });

  it('uses child grade for scholastic tracks and level 1 for foundation tracks', () => {
    expect(getTracksForChild(CHILDREN[0]).map((track) => track.slug)).toEqual([
      'grade-6-math',
      'grade-6-vocabulary',
      'grade-3-spanish',
      'grade-3-french',
      'grade-3-latin',
      'grade-3-grammar',
      'grade-3-logic',
      'grade-3-rhetoric',
      'grade-3-literature',
    ]);
    expect(getTracksForChild(CHILDREN[1]).map((track) => track.slug)).toEqual([
      'grade-3-math',
      'grade-3-vocabulary',
      'grade-3-spanish',
      'grade-3-french',
      'grade-3-latin',
      'grade-3-grammar',
      'grade-3-logic',
      'grade-3-rhetoric',
      'grade-3-literature',
    ]);
  });

  it('keeps fixture-specific track paths stable', () => {
    expect(getTrackPaths()).toEqual([
      { childSlug: 'reagan', trackSlug: 'grade-6-math' },
      { childSlug: 'reagan', trackSlug: 'grade-6-vocabulary' },
      { childSlug: 'reagan', trackSlug: 'grade-3-spanish' },
      { childSlug: 'reagan', trackSlug: 'grade-3-french' },
      { childSlug: 'reagan', trackSlug: 'grade-3-latin' },
      { childSlug: 'reagan', trackSlug: 'grade-3-grammar' },
      { childSlug: 'reagan', trackSlug: 'grade-3-logic' },
      { childSlug: 'reagan', trackSlug: 'grade-3-rhetoric' },
      { childSlug: 'reagan', trackSlug: 'grade-3-literature' },
      { childSlug: 'ada', trackSlug: 'grade-3-math' },
      { childSlug: 'ada', trackSlug: 'grade-3-vocabulary' },
      { childSlug: 'ada', trackSlug: 'grade-3-spanish' },
      { childSlug: 'ada', trackSlug: 'grade-3-french' },
      { childSlug: 'ada', trackSlug: 'grade-3-latin' },
      { childSlug: 'ada', trackSlug: 'grade-3-grammar' },
      { childSlug: 'ada', trackSlug: 'grade-3-logic' },
      { childSlug: 'ada', trackSlug: 'grade-3-rhetoric' },
      { childSlug: 'ada', trackSlug: 'grade-3-literature' },
    ]);
  });
});
