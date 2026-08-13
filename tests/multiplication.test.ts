import { describe, expect, it } from 'vitest';
import {
  buildMultiplicationDeck,
  buildMultiplicationFactPool,
  calculateMultiplicationXp,
  multiplicationFactKey,
  multiplicationMasteryLevel,
  multiplicationSelectionKey,
  normalizeSelectedFactors,
  parseSpokenMultiplicationAnswer,
  parseSpokenNumber,
  requeueMissedMultiplicationFact,
  scoreMultiplicationAttempts,
  type MultiplicationMasteryStats,
} from '../src/lib/multiplication';

describe('multiplication fact selection', () => {
  it('normalizes arbitrary factor subsets from 1 through 12', () => {
    expect(normalizeSelectedFactors([6, 2, 6, 13, 0, 4.5, 3])).toEqual([2, 3, 6]);
  });

  it('builds twelve ordered facts for every selected table', () => {
    const pool = buildMultiplicationFactPool([2, 6]);
    expect(pool).toHaveLength(24);
    expect(pool[0]).toEqual({ factor: 2, multiplier: 1 });
    expect(pool.at(-1)).toEqual({ factor: 6, multiplier: 12 });
  });

  it('builds a shuffled deck without leading with the previous fact', () => {
    const deck = buildMultiplicationDeck([2], {
      previousFact: { factor: 2, multiplier: 1 },
      random: () => 0,
    });
    expect(deck).toHaveLength(12);
    expect(deck[0]).not.toEqual({ factor: 2, multiplier: 1 });
  });

  it('weights new and weak facts more heavily in adaptive practice', () => {
    const fluent: MultiplicationMasteryStats = {
      attempts: 5,
      correct: 5,
      correctStreak: 5,
      bestKeyboardResponseMs: 2_000,
    };
    const mastery = new Map([[multiplicationFactKey({ factor: 2, multiplier: 1 }), fluent]]);
    const deck = buildMultiplicationDeck([2], { adaptive: true, mastery, random: () => 0.5 });
    const fluentCopies = deck.filter((fact) => fact.factor === 2 && fact.multiplier === 1).length;
    const newCopies = deck.filter((fact) => fact.factor === 2 && fact.multiplier === 2).length;
    expect(fluentCopies).toBe(1);
    expect(newCopies).toBe(2);
  });

  it('returns a missed fact after the configured spacing', () => {
    const deck = [
      { factor: 3, multiplier: 2 },
      { factor: 3, multiplier: 3 },
      { factor: 3, multiplier: 4 },
      { factor: 3, multiplier: 5 },
    ];
    expect(requeueMissedMultiplicationFact(deck, { factor: 3, multiplier: 9 }, 3)[3]).toEqual({
      factor: 3,
      multiplier: 9,
    });
  });
});

describe('multiplication scoring and mastery', () => {
  const config = { mode: 'practice' as const, selectedFactors: [2, 6], durationSeconds: null };

  it('scores only facts from the selected tables and multiplier range', () => {
    const result = scoreMultiplicationAttempts(config, [
      { factor: 6, multiplier: 7, answer: '42' },
      { factor: 3, multiplier: 7, answer: 21 },
      { factor: 2, multiplier: 13, answer: 26 },
    ]);
    expect(result.scoreCorrect).toBe(1);
    expect(result.scored.map((attempt) => attempt.isCorrect)).toEqual([true, false, false]);
  });

  it('requires a meaningful session before awarding capped XP', () => {
    expect(calculateMultiplicationXp(9, 9)).toBe(0);
    expect(calculateMultiplicationXp(18, 20)).toBe(13);
    expect(calculateMultiplicationXp(500, 500)).toBe(30);
  });

  it('marks accurate, repeated, reasonably fast recall as fluent', () => {
    expect(
      multiplicationMasteryLevel({ attempts: 5, correct: 4, correctStreak: 3, bestKeyboardResponseMs: 4_500 }),
    ).toBe('fluent');
    expect(
      multiplicationMasteryLevel({ attempts: 5, correct: 4, correctStreak: 2, bestKeyboardResponseMs: 4_500 }),
    ).toBe('learning');
    expect(multiplicationMasteryLevel(null)).toBe('new');
  });

  it('builds comparable record keys from normalized selections', () => {
    expect(multiplicationSelectionKey([6, 2, 3], 60, 'keyboard')).toBe('2,3,6|60|keyboard');
  });
});

describe('spoken multiplication answers', () => {
  it.each([
    ['42', 42],
    ['forty-two', 42],
    ['the answer is one hundred and forty four', 144],
    ['won', 1],
    ['for', 4],
    ['ate', 8],
  ])('parses %s as %i', (value, expected) => {
    expect(parseSpokenNumber(value)).toBe(expected);
  });

  it('uses the first valid recognition alternative within the fact range', () => {
    expect(parseSpokenMultiplicationAnswer(['not a number', 'one hundred twenty one', 'eleven'])).toBe(121);
    expect(parseSpokenMultiplicationAnswer(['one hundred forty five'])).toBeNull();
  });
});
