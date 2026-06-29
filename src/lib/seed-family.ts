import { TRACKS, type TrackFixture } from './curriculum';
import { compareSubjectKeys } from './subjects';

export type ChildFixture = {
  id: string;
  slug: 'reagan' | 'ada';
  displayName: string;
  avatarKey: string;
  levelBand: string;
  gradeLevel: number;
  subjectGradeLevels?: Record<string, number>;
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
    subjectGradeLevels: {
      spanish: 3,
    },
  },
  {
    id: 'child_ada',
    slug: 'ada',
    displayName: 'Ada',
    avatarKey: 'teal-tinkerer',
    levelBand: 'Grade 3',
    gradeLevel: 3,
  },
];

export function getTracksForChild(child: ChildFixture) {
  return TRACKS.filter((track) => track.gradeLevel === getSubjectGradeLevel(child, track.subject)).sort(compareBySubjectOrder);
}

export function getSubjectGradeLevel(child: ChildFixture, subject: string) {
  return child.subjectGradeLevels?.[subject] ?? child.gradeLevel;
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
