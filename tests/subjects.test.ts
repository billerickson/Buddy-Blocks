import { describe, expect, it } from 'vitest';
import {
  SUBJECTS,
  UNKNOWN_SUBJECT_ICON_KEY,
  compareSubjectKeys,
  getStarterBadgeForSubject,
  getSubjectMetadata,
} from '../src/lib/subjects';

describe('subject metadata', () => {
  it('loads metadata for production subjects', () => {
    expect(SUBJECTS.map((subject) => subject.key)).toEqual(['math', 'vocabulary', 'spanish', 'french']);
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
  });

  it('orders tracks by metadata sort order with unknown subjects last', () => {
    expect(['science', 'spanish', 'math', 'french', 'vocabulary'].sort(compareSubjectKeys)).toEqual([
      'math',
      'vocabulary',
      'spanish',
      'french',
      'science',
    ]);
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
    expect(getStarterBadgeForSubject('science')).toBeNull();
  });
});
