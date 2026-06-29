import { afterEach, describe, expect, it, vi } from 'vitest';
import { generateMadMinuteFact } from '../src/components/islands/LessonPlayer';

describe('mad minute fact generation', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does not repeat the previous fact when another fact is available', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    const fact = generateMadMinuteFact(
      {
        mode: 'multiplication',
        factor: 2,
        minMultiplier: 1,
        maxMultiplier: 3,
        durationSeconds: 60,
        goalCorrect: 40,
      },
      { factor: 2, multiplier: 1 },
    );

    expect(fact).toEqual({ factor: 2, multiplier: 2 });
  });

  it('allows a repeat only when the config has one possible fact', () => {
    const fact = generateMadMinuteFact(
      {
        mode: 'multiplication',
        factor: 2,
        minMultiplier: 5,
        maxMultiplier: 5,
        durationSeconds: 60,
        goalCorrect: 40,
      },
      { factor: 2, multiplier: 5 },
    );

    expect(fact).toEqual({ factor: 2, multiplier: 5 });
  });
});
