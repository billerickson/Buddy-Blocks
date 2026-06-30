import { TRACKS, type TrackFixture } from './curriculum';
import { compareSubjectKeys, isFoundationSubject } from './subjects';

export type ChildFixture = {
  id: string;
  slug: 'reagan' | 'ada' | 'bill';
  displayName: string;
  avatarKey: string;
  levelBand: string;
  gradeLevel: number;
};

export const PARENT_ID = 'parent_bill';
export const PARENT_USERNAME = 'bill';
export const PARENT_EMAIL = 'bill@learn.billplustara.com';

export const CHILDREN: ChildFixture[] = [
  {
    id: 'child_reagan',
    slug: 'reagan',
    displayName: 'Reagan',
    avatarKey: 'berry-builder',
    levelBand: 'Grade 6',
    gradeLevel: 6,
  },
  {
    id: 'child_ada',
    slug: 'ada',
    displayName: 'Ada',
    avatarKey: 'teal-tinkerer',
    levelBand: 'Grade 3',
    gradeLevel: 3,
  },
  {
    id: 'child_bill',
    slug: 'bill',
    displayName: 'Bill',
    avatarKey: 'gold-builder',
    levelBand: 'Grade 6',
    gradeLevel: 6,
  },
];

export function getTracksForChild(child: ChildFixture) {
  return TRACKS.filter((track) => {
    if (!isFoundationSubject(track.subject)) return track.gradeLevel === child.gradeLevel;
    return track.gradeLevel === firstFoundationGradeLevel(track.subject);
  }).sort(compareBySubjectOrder);
}

export function getChildBySlug(slug: string) {
  return CHILDREN.find((child) => child.slug === slug) ?? null;
}

export function getLessonPaths() {
  return CHILDREN.flatMap((child) =>
    getTracksForChild(child).flatMap((track) =>
      track.units.flatMap((unit) =>
        unit.lessons.map((lesson) => ({
          childSlug: child.slug,
          lessonId: lesson.id,
        })),
      ),
    ),
  );
}

export function getTrackPaths() {
  return CHILDREN.flatMap((child) =>
    getTracksForChild(child).map((track) => ({
      childSlug: child.slug,
      trackSlug: track.slug,
    })),
  );
}

function compareBySubjectOrder(a: TrackFixture, b: TrackFixture) {
  const subjectOrder = compareSubjectKeys(a.subject, b.subject);
  if (subjectOrder !== 0) return subjectOrder;
  return a.gradeLevel - b.gradeLevel;
}

function firstFoundationGradeLevel(subject: string) {
  return Math.min(...TRACKS.filter((track) => track.subject === subject).map((track) => track.gradeLevel));
}
