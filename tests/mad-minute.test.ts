import { afterEach, describe, expect, it, vi } from 'vitest';
import { generateMadMinuteFact } from '../src/components/islands/LessonPlayer';
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
});
