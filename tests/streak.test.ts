import { describe, expect, it } from 'vitest';
import { calculateCurrentStreak } from '../src/lib/streak';

describe('streak calculation', () => {
  it('counts consecutive activity through today', () => {
    expect(calculateCurrentStreak(['2026-06-29', '2026-06-28', '2026-06-27'], '2026-06-29')).toBe(3);
  });

  it('keeps a streak alive when yesterday was active and today is not yet active', () => {
    expect(calculateCurrentStreak(['2026-06-28', '2026-06-27'], '2026-06-29')).toBe(2);
  });

  it('stops at a missed day', () => {
    expect(calculateCurrentStreak(['2026-06-26', '2026-06-25'], '2026-06-29')).toBe(0);
  });
});

