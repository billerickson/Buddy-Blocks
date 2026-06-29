import { describe, expect, it } from 'vitest';
import {
  DEFAULT_MAD_MINUTE_CONFIG,
  MadMinuteConfigSchema,
  StandardLessonConfigSchema,
  isMadMinuteConfig,
  parseMadMinuteConfig,
  parseStandardLessonConfig,
} from '../src/lib/lesson-config';

describe('lesson config schemas', () => {
  it('validates standard config with intro cards and review settings', () => {
    const config = StandardLessonConfigSchema.parse({
      intro: [
        {
          title: 'Warm up',
          body: 'Read these cards before the quiz.',
          bullets: ['Look for context clues'],
          media: { image: { src: '/images/context.png', alt: 'Context clues' } },
        },
      ],
      review: {
        label: 'Review deck',
        shuffleQuestions: true,
      },
    });

    expect(config.review?.mode).toBe('deck');
    expect(config.intro?.[0].media?.image?.alt).toBe('Context clues');
  });

  it('validates fixed-factor Mad Minute config', () => {
    const config = MadMinuteConfigSchema.parse({
      mode: 'multiplication',
      factor: 7,
      minMultiplier: 1,
      maxMultiplier: 12,
      durationSeconds: 60,
      goalCorrect: 40,
    });

    expect(isMadMinuteConfig(config)).toBe(true);
    expect(parseMadMinuteConfig(JSON.stringify(config))).toMatchObject({
      factor: 7,
      minFactor: 7,
      maxFactor: 7,
    });
  });

  it('validates mixed-factor Mad Minute config', () => {
    const config = MadMinuteConfigSchema.parse({
      mode: 'multiplication',
      factor: 'mixed',
      minFactor: 3,
      maxFactor: 8,
      minMultiplier: 2,
      maxMultiplier: 10,
      durationSeconds: 45,
      goalCorrect: 32,
    });

    expect(parseMadMinuteConfig(JSON.stringify(config))).toEqual({
      mode: 'multiplication',
      factor: 'mixed',
      minFactor: 3,
      maxFactor: 8,
      minMultiplier: 2,
      maxMultiplier: 10,
      durationSeconds: 45,
      goalCorrect: 32,
    });
  });

  it('rejects invalid Mad Minute ranges', () => {
    expect(() =>
      MadMinuteConfigSchema.parse({
        mode: 'multiplication',
        factor: 'mixed',
        minFactor: 10,
        maxFactor: 3,
        minMultiplier: 1,
        maxMultiplier: 12,
        durationSeconds: 60,
        goalCorrect: 40,
      }),
    ).toThrow(/minFactor/);

    expect(parseMadMinuteConfig(JSON.stringify({ ...DEFAULT_MAD_MINUTE_CONFIG, minFactor: 10, maxFactor: 3 }))).toEqual(
      DEFAULT_MAD_MINUTE_CONFIG,
    );
  });

  it('uses shared runtime defaults when stored config is missing or malformed', () => {
    expect(parseMadMinuteConfig(null)).toEqual(DEFAULT_MAD_MINUTE_CONFIG);
    expect(parseMadMinuteConfig('{nope')).toEqual(DEFAULT_MAD_MINUTE_CONFIG);
    expect(parseStandardLessonConfig(null)).toBeNull();
    expect(parseStandardLessonConfig(JSON.stringify({ review: { label: 'Quick review' } }))).toEqual({
      review: { mode: 'deck', label: 'Quick review' },
    });
  });
});
