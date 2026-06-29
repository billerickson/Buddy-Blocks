import { compareSubjectKeys, getStarterBadgeForSubject } from './subjects';

export type Badge = {
  key: string;
  label: string;
};

export type CompletedSubject = {
  subject: string;
  total: number;
};

export type BadgeInput = {
  attemptCount: number;
  perfectAttemptCount: number;
  streak: number;
  completedBySubject: CompletedSubject[];
};

export type BadgeMetadataProvider = {
  starterBadgeForSubject: (subject: string) => Badge | null;
  compareSubjects: (a: string, b: string) => number;
};

const defaultMetadataProvider: BadgeMetadataProvider = {
  starterBadgeForSubject: getStarterBadgeForSubject,
  compareSubjects: compareSubjectKeys,
};

export function buildBadges(input: BadgeInput, metadataProvider: BadgeMetadataProvider = defaultMetadataProvider): Badge[] {
  const badges: Badge[] = [];

  if (input.attemptCount > 0) badges.push({ key: 'first-lesson', label: 'First Lesson' });
  if (input.streak >= 3) badges.push({ key: 'three-day-streak', label: 'Three Day Streak' });

  for (const { subject, total } of [...input.completedBySubject].sort((a, b) => metadataProvider.compareSubjects(a.subject, b.subject))) {
    const starterBadge = metadataProvider.starterBadgeForSubject(subject);
    if (total > 0 && starterBadge) badges.push(starterBadge);
  }

  if (input.perfectAttemptCount > 0) badges.push({ key: 'perfect-lesson', label: 'Perfect Lesson' });

  return badges;
}
