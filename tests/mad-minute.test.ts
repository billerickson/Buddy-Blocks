import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  calculateMadMinuteXp,
  generateMadMinuteFact,
  isAllowedMadMinuteFact,
  scoreMadMinuteAttempts,
} from '../src/lib/mad-minute';
import { DEFAULT_MAD_MINUTE_CONFIG } from '../src/lib/lesson-config';

describe('mad minute fact generation', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does not repeat the previous fact when another fact is available', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    const fact = generateMadMinuteFact(
      {
        ...DEFAULT_MAD_MINUTE_CONFIG,
        factor: 2,
        minMultiplier: 1,
        maxMultiplier: 3,
      },
      { factor: 2, multiplier: 1 },
    );

    expect(fact).toEqual({ factor: 2, multiplier: 2 });
  });

  it('allows a repeat only when the config has one possible fact', () => {
    const fact = generateMadMinuteFact(
      {
        ...DEFAULT_MAD_MINUTE_CONFIG,
        factor: 2,
        minMultiplier: 5,
        maxMultiplier: 5,
      },
      { factor: 2, multiplier: 5 },
    );

    expect(fact).toEqual({ factor: 2, multiplier: 5 });
  });

  it('generates mixed-factor facts at configured boundaries', () => {
    const config = {
      ...DEFAULT_MAD_MINUTE_CONFIG,
      factor: 'mixed' as const,
      minFactor: 3,
      maxFactor: 4,
      minMultiplier: 5,
      maxMultiplier: 6,
    };

    vi.spyOn(Math, 'random').mockReturnValueOnce(0).mockReturnValueOnce(0.999);

    expect(generateMadMinuteFact(config)).toEqual({ factor: 3, multiplier: 5 });
    expect(generateMadMinuteFact(config)).toEqual({ factor: 4, multiplier: 6 });
  });

  it('keeps fixed-factor drills on the configured factor', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.999);

    const fact = generateMadMinuteFact({
      ...DEFAULT_MAD_MINUTE_CONFIG,
      factor: 9,
      minMultiplier: 1,
      maxMultiplier: 2,
    });

    expect(fact).toEqual({ factor: 9, multiplier: 2 });
  });

  it('does not count submitted facts outside the configured range', () => {
    const config = {
      ...DEFAULT_MAD_MINUTE_CONFIG,
      factor: 4,
      minMultiplier: 1,
      maxMultiplier: 12,
    };

    expect(isAllowedMadMinuteFact(config, 5, 5)).toBe(false);

    const result = scoreMadMinuteAttempts(config, [
      { factor: 5, multiplier: 5, answer: 25 },
      { factor: 4, multiplier: 5, answer: '20' },
    ]);

    expect(result.scoreCorrect).toBe(1);
    expect(result.scoreTotal).toBe(2);
    expect(result.scored.map((attempt) => attempt.isCorrect)).toEqual([false, true]);
  });

  it('calculates XP around goal bonus boundaries', () => {
    expect(calculateMadMinuteXp(10, 0, 0, 40)).toBe(0);
    expect(calculateMadMinuteXp(10, 39, 39, 40)).toBe(49);
    expect(calculateMadMinuteXp(10, 40, 40, 40)).toBe(60);
    expect(calculateMadMinuteXp(10, 80, 80, 40)).toBe(75);
  });
});
