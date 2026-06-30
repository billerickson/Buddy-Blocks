import { describe, expect, it } from 'vitest';
import { clearMatchForLeft } from '../src/components/lesson/match-pairs';

describe('match-pairs helpers', () => {
  it('clears one matched left value without mutating the existing answer', () => {
    const answer = {
      tiny: 'very small',
      huge: 'very large',
    };

    const updated = clearMatchForLeft(answer, 'tiny');

    expect(updated).toEqual({ huge: 'very large' });
    expect(answer).toEqual({ tiny: 'very small', huge: 'very large' });
  });

  it('returns the existing answer when the left value is not matched', () => {
    const answer = {
      huge: 'very large',
    };

    expect(clearMatchForLeft(answer, 'tiny')).toBe(answer);
  });
});
