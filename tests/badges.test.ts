import { describe, expect, it } from 'vitest';
import { buildBadges } from '../src/lib/badges';

describe('badge policy', () => {
  it('awards the first lesson badge after any attempt', () => {
    expect(
      buildBadges({
        attemptCount: 1,
        perfectAttemptCount: 0,
        streak: 0,
        completedBySubject: [],
      }),
    ).toEqual([{ key: 'first-lesson', label: 'First Lesson' }]);
  });

  it('awards the three-day streak badge at streak threshold', () => {
    expect(
      buildBadges({
        attemptCount: 0,
        perfectAttemptCount: 0,
        streak: 3,
        completedBySubject: [],
      }),
    ).toEqual([{ key: 'three-day-streak', label: 'Three Day Streak' }]);
  });

  it('adds subject starter badges from subject metadata in metadata order', () => {
    expect(
      buildBadges({
        attemptCount: 0,
        perfectAttemptCount: 0,
        streak: 0,
        completedBySubject: [
          { subject: 'spanish', total: 1 },
          { subject: 'math', total: 2 },
          { subject: 'science', total: 5 },
          { subject: 'vocabulary', total: 0 },
        ],
      }),
    ).toEqual([
      { key: 'math-starter', label: 'Math Starter' },
      { key: 'spanish-starter', label: 'Spanish Starter' },
    ]);
  });

  it('can award a new subject starter badge through metadata without Worker changes', () => {
    expect(
      buildBadges(
        {
          attemptCount: 0,
          perfectAttemptCount: 0,
          streak: 0,
          completedBySubject: [{ subject: 'science', total: 1 }],
        },
        {
          starterBadgeForSubject: (subject) => (subject === 'science' ? { key: 'science-starter', label: 'Science Starter' } : null),
          compareSubjects: (a, b) => a.localeCompare(b),
        },
      ),
    ).toEqual([{ key: 'science-starter', label: 'Science Starter' }]);
  });

  it('awards the perfect lesson badge after any perfect attempt', () => {
    expect(
      buildBadges({
        attemptCount: 4,
        perfectAttemptCount: 1,
        streak: 0,
        completedBySubject: [],
      }),
    ).toEqual([
      { key: 'first-lesson', label: 'First Lesson' },
      { key: 'perfect-lesson', label: 'Perfect Lesson' },
    ]);
  });
});
