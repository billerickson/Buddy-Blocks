import { describe, expect, it } from 'vitest';
import vectors from './fixtures/esp32-p4-domain-vectors.json';
import {
  buildMultiplicationDeck,
  buildMultiplicationFactPool,
  calculateMultiplicationXp,
  multiplicationFactKey,
  multiplicationMasteryLevel,
  normalizeSelectedFactors,
  requeueMissedMultiplicationFact,
} from '../src/lib/multiplication';

function fact(value: string) {
  const [factor, multiplier] = value.split('x').map(Number);
  return { factor, multiplier };
}

function xorshift64Star(seed: bigint) {
  const mask = (1n << 64n) - 1n;
  let state = seed === 0n ? 0x9e3779b97f4a7c15n : seed;
  return () => {
    let value = state;
    value = (value ^ (value >> 12n)) & mask;
    value = (value ^ (value << 25n)) & mask;
    value = (value ^ (value >> 27n)) & mask;
    state = value;
    const next = ((state * 0x2545f4914f6cdd1dn) & mask) >> 32n;
    return Number(next) / 2 ** 32;
  };
}

describe('ESP32-P4 shared multiplication vectors', () => {
  it('matches normalization and fact-pool cases', () => {
    expect(normalizeSelectedFactors(vectors.selectedFactorNormalization.input)).toEqual(
      vectors.selectedFactorNormalization.expected,
    );
    const pool = buildMultiplicationFactPool(vectors.factPool.selectedFactors);
    expect(pool).toHaveLength(vectors.factPool.expectedCount);
    expect(multiplicationFactKey(pool[0])).toBe(vectors.factPool.expectedFirst);
    expect(multiplicationFactKey(pool.at(-1)!)).toBe(vectors.factPool.expectedLast);
  });

  it('matches the firmware seeded shuffle and missed-fact spacing', () => {
    const deck = buildMultiplicationDeck(vectors.deterministicDeck.selectedFactors, {
      adaptive: true,
      random: xorshift64Star(BigInt(vectors.deterministicDeck.seed)),
    });
    expect(deck.map(multiplicationFactKey)).toEqual(vectors.deterministicDeck.expected);
    expect(
      requeueMissedMultiplicationFact(
        vectors.missedFactSpacing.deck.map(fact),
        fact(vectors.missedFactSpacing.missed),
        vectors.missedFactSpacing.spacing,
      ).map(multiplicationFactKey),
    ).toEqual(vectors.missedFactSpacing.expected);
  });

  it('matches XP, mastery, and adaptive weight cases', () => {
    for (const entry of vectors.xp) {
      expect(calculateMultiplicationXp(entry.correct, entry.total)).toBe(entry.expected);
    }
    for (const entry of vectors.mastery) {
      expect(multiplicationMasteryLevel(entry.stats)).toBe(entry.expected);
      const deck = buildMultiplicationDeck([1], {
        adaptive: true,
        mastery: new Map([['1x1', entry.stats]]),
        random: () => 0.5,
      });
      expect(deck.filter((item) => multiplicationFactKey(item) === '1x1')).toHaveLength(entry.weight);
    }
  });
});
