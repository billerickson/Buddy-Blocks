import { describe, expect, it } from 'vitest';
import {
  SUBJECTS,
  UNKNOWN_SUBJECT_ICON_KEY,
  compareSubjectKeys,
  getStarterBadgeForSubject,
  getSubjectMetadata,
  getTrackGroup,
  isFoundationSubject,
} from '../src/lib/subjects';

describe('subject metadata', () => {
  it('loads metadata for production subjects', () => {
    expect(SUBJECTS.map((subject) => subject.key)).toEqual([
      'math',
      'vocabulary',
      'spanish',
      'french',
      'latin',
      'grammar',
      'logic',
      'rhetoric',
      'literature',
      'history-civics',
      'memory-work',
    ]);
    expect(getSubjectMetadata('math')).toMatchObject({
      label: 'Math',
      sortOrder: 1,
      iconKey: 'plus-block',
      starterBadge: { key: 'math-starter', label: 'Math Starter' },
    });
    expect(getSubjectMetadata('french')).toMatchObject({
      label: 'French',
      sortOrder: 4,
      iconKey: 'speech-bubble',
      starterBadge: { key: 'french-starter', label: 'French Starter' },
    });
    expect(getSubjectMetadata('latin')).toMatchObject({
      label: 'Latin',
      sortOrder: 5,
      iconKey: 'clipboard',
      starterBadge: { key: 'latin-starter', label: 'Latin Starter' },
    });
    expect(getSubjectMetadata('grammar')).toMatchObject({
      label: 'Grammar',
      sortOrder: 6,
      iconKey: 'clipboard',
      starterBadge: { key: 'grammar-starter', label: 'Grammar Starter' },
    });
    expect(getSubjectMetadata('logic')).toMatchObject({
      label: 'Logic',
      sortOrder: 7,
      iconKey: 'generic-block',
      starterBadge: { key: 'logic-starter', label: 'Logic Starter' },
    });
    expect(getSubjectMetadata('rhetoric')).toMatchObject({
      label: 'Rhetoric',
      sortOrder: 8,
      iconKey: 'speech-bubble',
      starterBadge: { key: 'rhetoric-starter', label: 'Rhetoric Starter' },
    });
    expect(getSubjectMetadata('literature')).toMatchObject({
      label: 'Literature',
      sortOrder: 9,
      iconKey: 'clipboard',
      starterBadge: { key: 'literature-starter', label: 'Literature Starter' },
    });
    expect(getSubjectMetadata('history-civics')).toMatchObject({
      label: 'History And Civics',
      sortOrder: 10,
      iconKey: 'clipboard',
      starterBadge: { key: 'history-civics-starter', label: 'History And Civics Starter' },
    });
    expect(getSubjectMetadata('memory-work')).toMatchObject({
      label: 'Memory Work',
      sortOrder: 11,
      iconKey: 'generic-block',
      starterBadge: { key: 'memory-work-starter', label: 'Memory Work Starter' },
    });
  });

  it('orders tracks by metadata sort order with unknown subjects last', () => {
    expect(
      ['logic', 'science', 'spanish', 'math', 'memory-work', 'latin', 'french', 'vocabulary', 'grammar'].sort(
        compareSubjectKeys,
      ),
    ).toEqual(['math', 'vocabulary', 'spanish', 'french', 'latin', 'grammar', 'logic', 'memory-work', 'science']);
  });

  it('provides fallback label and icon metadata for unknown subjects', () => {
    expect(getSubjectMetadata('science')).toMatchObject({
      key: 'science',
      label: 'Science',
      iconKey: UNKNOWN_SUBJECT_ICON_KEY,
    });
    expect(getSubjectMetadata('reading-comprehension')).toMatchObject({
      label: 'Reading Comprehension',
      iconKey: UNKNOWN_SUBJECT_ICON_KEY,
    });
  });

  it('generates starter badges from metadata only', () => {
    expect(getStarterBadgeForSubject('vocabulary')).toEqual({ key: 'word-explorer', label: 'Word Explorer' });
    expect(getStarterBadgeForSubject('french')).toEqual({ key: 'french-starter', label: 'French Starter' });
    expect(getStarterBadgeForSubject('latin')).toEqual({ key: 'latin-starter', label: 'Latin Starter' });
    expect(getStarterBadgeForSubject('grammar')).toEqual({ key: 'grammar-starter', label: 'Grammar Starter' });
    expect(getStarterBadgeForSubject('history-civics')).toEqual({
      key: 'history-civics-starter',
      label: 'History And Civics Starter',
    });
    expect(getStarterBadgeForSubject('science')).toBeNull();
  });

  it('groups scholastic and foundation subjects', () => {
    expect(getTrackGroup('math')).toBe('scholastic');
    expect(getTrackGroup('vocabulary')).toBe('scholastic');
    expect(getTrackGroup('spanish')).toBe('foundation');
    expect(getTrackGroup('french')).toBe('foundation');
    expect(getTrackGroup('latin')).toBe('foundation');
    expect(getTrackGroup('grammar')).toBe('foundation');
    expect(getTrackGroup('logic')).toBe('foundation');
    expect(getTrackGroup('rhetoric')).toBe('foundation');
    expect(getTrackGroup('literature')).toBe('foundation');
    expect(getTrackGroup('history-civics')).toBe('foundation');
    expect(getTrackGroup('memory-work')).toBe('foundation');
    expect(isFoundationSubject('science')).toBe(false);
  });
});
